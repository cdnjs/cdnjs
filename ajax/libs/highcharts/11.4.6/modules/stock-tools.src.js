/**
 * @license Highstock JS v11.4.6 (2024-07-08)
 *
 * Advanced Highcharts Stock tools
 *
 * (c) 2010-2024 Highsoft AS
 * Author: Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/modules/stock-tools', ['highcharts', 'highcharts/modules/stock'], function (Highcharts) {
            factory(Highcharts);
            factory.Highcharts = Highcharts;
            return factory;
        });
    } else {
        factory(typeof Highcharts !== 'undefined' ? Highcharts : undefined);
    }
}(function (Highcharts) {
    'use strict';
    var _modules = Highcharts ? Highcharts._modules : {};
    function _registerModule(obj, path, args, fn) {
        if (!obj.hasOwnProperty(path)) {
            obj[path] = fn.apply(null, args);

            if (typeof CustomEvent === 'function') {
                Highcharts.win.dispatchEvent(new CustomEvent(
                    'HighchartsModuleLoaded',
                    { detail: { path: path, module: obj[path] } }
                ));
            }
        }
    }
    _registerModule(_modules, 'Core/Chart/ChartNavigationComposition.js', [], function () {
        /**
         *
         *  (c) 2010-2024 Paweł Fus
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /* *
         *
         *  Composition
         *
         * */
        var ChartNavigationComposition;
        (function (ChartNavigationComposition) {
            /* *
             *
             *  Declarations
             *
             * */
            /* *
             *
             *  Functions
             *
             * */
            /* eslint-disable valid-jsdoc */
            /**
             * @private
             */
            function compose(chart) {
                if (!chart.navigation) {
                    chart.navigation = new Additions(chart);
                }
                return chart;
            }
            ChartNavigationComposition.compose = compose;
            /* *
             *
             *  Class
             *
             * */
            /**
             * Initializes `chart.navigation` object which delegates `update()` methods
             * to all other common classes (used in exporting and navigationBindings).
             * @private
             */
            class Additions {
                /* *
                 *
                 *  Constructor
                 *
                 * */
                constructor(chart) {
                    this.updates = [];
                    this.chart = chart;
                }
                /* *
                 *
                 *  Functions
                 *
                 * */
                /**
                 * Registers an `update()` method in the `chart.navigation` object.
                 *
                 * @private
                 * @param {UpdateFunction} updateFn
                 * The `update()` method that will be called in `chart.update()`.
                 */
                addUpdate(updateFn) {
                    this.chart.navigation.updates.push(updateFn);
                }
                /**
                 * @private
                 */
                update(options, redraw) {
                    this.updates.forEach((updateFn) => {
                        updateFn.call(this.chart, options, redraw);
                    });
                }
            }
            ChartNavigationComposition.Additions = Additions;
        })(ChartNavigationComposition || (ChartNavigationComposition = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return ChartNavigationComposition;
    });
    _registerModule(_modules, 'Extensions/Annotations/NavigationBindingsDefaults.js', [_modules['Extensions/Annotations/NavigationBindingsUtilities.js'], _modules['Core/Utilities.js']], function (NBU, U) {
        /* *
         *
         *  (c) 2009-2024 Highsoft, Black Label
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { getAssignedAxis } = NBU;
        const { isNumber, merge } = U;
        /* *
         *
         *  Constants
         *
         * */
        /**
         * @optionparent lang
         */
        const lang = {
            /**
             * Configure the Popup strings in the chart. Requires the
             * `annotations.js` or `annotations-advanced.src.js` module to be
             * loaded.
             * @since   7.0.0
             * @product highcharts highstock
             */
            navigation: {
                /**
                 * Translations for all field names used in popup.
                 *
                 * @product highcharts highstock
                 */
                popup: {
                    simpleShapes: 'Simple shapes',
                    lines: 'Lines',
                    circle: 'Circle',
                    ellipse: 'Ellipse',
                    rectangle: 'Rectangle',
                    label: 'Label',
                    shapeOptions: 'Shape options',
                    typeOptions: 'Details',
                    fill: 'Fill',
                    format: 'Text',
                    strokeWidth: 'Line width',
                    stroke: 'Line color',
                    title: 'Title',
                    name: 'Name',
                    labelOptions: 'Label options',
                    labels: 'Labels',
                    backgroundColor: 'Background color',
                    backgroundColors: 'Background colors',
                    borderColor: 'Border color',
                    borderRadius: 'Border radius',
                    borderWidth: 'Border width',
                    style: 'Style',
                    padding: 'Padding',
                    fontSize: 'Font size',
                    color: 'Color',
                    height: 'Height',
                    shapes: 'Shape options'
                }
            }
        };
        /**
         * @optionparent navigation
         * @product      highcharts highstock
         */
        const navigation = {
            /**
             * A CSS class name where all bindings will be attached to. Multiple
             * charts on the same page should have separate class names to prevent
             * duplicating events.
             *
             * Default value of versions < 7.0.4 `highcharts-bindings-wrapper`
             *
             * @since     7.0.0
             * @type      {string}
             */
            bindingsClassName: 'highcharts-bindings-container',
            /**
             * Bindings definitions for custom HTML buttons. Each binding implements
             * simple event-driven interface:
             *
             * - `className`: classname used to bind event to
             *
             * - `init`: initial event, fired on button click
             *
             * - `start`: fired on first click on a chart
             *
             * - `steps`: array of sequential events fired one after another on each
             *   of users clicks
             *
             * - `end`: last event to be called after last step event
             *
             * @type         {Highcharts.Dictionary<Highcharts.NavigationBindingsOptionsObject>|*}
             *
             * @sample {highstock} stock/stocktools/stocktools-thresholds
             *               Custom bindings
             * @sample {highcharts} highcharts/annotations/bindings/
             *               Simple binding
             * @sample {highcharts} highcharts/annotations/bindings-custom-annotation/
             *               Custom annotation binding
             *
             * @since        7.0.0
             * @requires     modules/annotations
             * @product      highcharts highstock
             */
            bindings: {
                /**
                 * A circle annotation bindings. Includes `start` and one event in
                 * `steps` array.
                 *
                 * @type    {Highcharts.NavigationBindingsOptionsObject}
                 * @default {"className": "highcharts-circle-annotation", "start": function() {}, "steps": [function() {}], "annotationsOptions": {}}
                 */
                circleAnnotation: {
                    /** @ignore-option */
                    className: 'highcharts-circle-annotation',
                    /** @ignore-option */
                    start: function (e) {
                        const coords = this.chart.pointer?.getCoordinates(e), coordsX = coords && getAssignedAxis(coords.xAxis), coordsY = coords && getAssignedAxis(coords.yAxis), navigation = this.chart.options.navigation;
                        // Exit if clicked out of axes area
                        if (!coordsX || !coordsY) {
                            return;
                        }
                        return this.chart.addAnnotation(merge({
                            langKey: 'circle',
                            type: 'basicAnnotation',
                            shapes: [{
                                    type: 'circle',
                                    point: {
                                        x: coordsX.value,
                                        y: coordsY.value,
                                        xAxis: coordsX.axis.index,
                                        yAxis: coordsY.axis.index
                                    },
                                    r: 5
                                }]
                        }, navigation.annotationsOptions, navigation.bindings.circleAnnotation
                            .annotationsOptions));
                    },
                    /** @ignore-option */
                    steps: [
                        function (e, annotation) {
                            const shapes = annotation.options.shapes, mockPointOpts = ((shapes && shapes[0] && shapes[0].point) ||
                                {});
                            let distance;
                            if (isNumber(mockPointOpts.xAxis) &&
                                isNumber(mockPointOpts.yAxis)) {
                                const inverted = this.chart.inverted, x = this.chart.xAxis[mockPointOpts.xAxis]
                                    .toPixels(mockPointOpts.x), y = this.chart.yAxis[mockPointOpts.yAxis]
                                    .toPixels(mockPointOpts.y);
                                distance = Math.max(Math.sqrt(Math.pow(inverted ? y - e.chartX : x - e.chartX, 2) +
                                    Math.pow(inverted ? x - e.chartY : y - e.chartY, 2)), 5);
                            }
                            annotation.update({
                                shapes: [{
                                        r: distance
                                    }]
                            });
                        }
                    ]
                },
                /**
                 * A ellipse annotation bindings. Includes `start` and two events in
                 * `steps` array. First updates the second point, responsible for a
                 * rx width, and second updates the ry width.
                 *
                 * @type    {Highcharts.NavigationBindingsOptionsObject}
                 * @default {"className": "highcharts-ellipse-annotation", "start": function() {}, "steps": [function() {}], "annotationsOptions": {}}
                 */
                ellipseAnnotation: {
                    className: 'highcharts-ellipse-annotation',
                    start: function (e) {
                        const coords = this.chart.pointer?.getCoordinates(e), coordsX = coords && getAssignedAxis(coords.xAxis), coordsY = coords && getAssignedAxis(coords.yAxis), navigation = this.chart.options.navigation;
                        if (!coordsX || !coordsY) {
                            return;
                        }
                        return this.chart.addAnnotation(merge({
                            langKey: 'ellipse',
                            type: 'basicAnnotation',
                            shapes: [
                                {
                                    type: 'ellipse',
                                    xAxis: coordsX.axis.index,
                                    yAxis: coordsY.axis.index,
                                    points: [{
                                            x: coordsX.value,
                                            y: coordsY.value
                                        }, {
                                            x: coordsX.value,
                                            y: coordsY.value
                                        }],
                                    ry: 1
                                }
                            ]
                        }, navigation.annotationsOptions, navigation.bindings.ellipseAnnotation
                            .annotationOptions));
                    },
                    steps: [
                        function (e, annotation) {
                            const target = annotation.shapes[0], position = target.getAbsolutePosition(target.points[1]);
                            target.translatePoint(e.chartX - position.x, e.chartY - position.y, 1);
                            target.redraw(false);
                        },
                        function (e, annotation) {
                            const target = annotation.shapes[0], position = target.getAbsolutePosition(target.points[0]), position2 = target.getAbsolutePosition(target.points[1]), newR = target.getDistanceFromLine(position, position2, e.chartX, e.chartY), yAxis = target.getYAxis(), newRY = Math.abs(yAxis.toValue(0) - yAxis.toValue(newR));
                            target.setYRadius(newRY);
                            target.redraw(false);
                        }
                    ]
                },
                /**
                 * A rectangle annotation bindings. Includes `start` and one event
                 * in `steps` array.
                 *
                 * @type    {Highcharts.NavigationBindingsOptionsObject}
                 * @default {"className": "highcharts-rectangle-annotation", "start": function() {}, "steps": [function() {}], "annotationsOptions": {}}
                 */
                rectangleAnnotation: {
                    /** @ignore-option */
                    className: 'highcharts-rectangle-annotation',
                    /** @ignore-option */
                    start: function (e) {
                        const coords = this.chart.pointer?.getCoordinates(e), coordsX = coords && getAssignedAxis(coords.xAxis), coordsY = coords && getAssignedAxis(coords.yAxis);
                        // Exit if clicked out of axes area
                        if (!coordsX || !coordsY) {
                            return;
                        }
                        const x = coordsX.value, y = coordsY.value, xAxis = coordsX.axis.index, yAxis = coordsY.axis.index, navigation = this.chart.options.navigation;
                        return this.chart.addAnnotation(merge({
                            langKey: 'rectangle',
                            type: 'basicAnnotation',
                            shapes: [{
                                    type: 'path',
                                    points: [
                                        { xAxis, yAxis, x, y },
                                        { xAxis, yAxis, x, y },
                                        { xAxis, yAxis, x, y },
                                        { xAxis, yAxis, x, y },
                                        { command: 'Z' }
                                    ]
                                }]
                        }, navigation
                            .annotationsOptions, navigation
                            .bindings
                            .rectangleAnnotation
                            .annotationsOptions));
                    },
                    /** @ignore-option */
                    steps: [
                        function (e, annotation) {
                            const shapes = annotation.options.shapes, points = ((shapes && shapes[0] && shapes[0].points) ||
                                []), coords = this.chart.pointer?.getCoordinates(e), coordsX = coords && getAssignedAxis(coords.xAxis), coordsY = coords && getAssignedAxis(coords.yAxis);
                            if (coordsX && coordsY) {
                                const x = coordsX.value, y = coordsY.value;
                                // Top right point
                                points[1].x = x;
                                // Bottom right point (cursor position)
                                points[2].x = x;
                                points[2].y = y;
                                // Bottom left
                                points[3].y = y;
                                annotation.update({
                                    shapes: [{
                                            points: points
                                        }]
                                });
                            }
                        }
                    ]
                },
                /**
                 * A label annotation bindings. Includes `start` event only.
                 *
                 * @type    {Highcharts.NavigationBindingsOptionsObject}
                 * @default {"className": "highcharts-label-annotation", "start": function() {}, "steps": [function() {}], "annotationsOptions": {}}
                 */
                labelAnnotation: {
                    /** @ignore-option */
                    className: 'highcharts-label-annotation',
                    /** @ignore-option */
                    start: function (e) {
                        const coords = this.chart.pointer?.getCoordinates(e), coordsX = coords && getAssignedAxis(coords.xAxis), coordsY = coords && getAssignedAxis(coords.yAxis), navigation = this.chart.options.navigation;
                        // Exit if clicked out of axes area
                        if (!coordsX || !coordsY) {
                            return;
                        }
                        return this.chart.addAnnotation(merge({
                            langKey: 'label',
                            type: 'basicAnnotation',
                            labelOptions: {
                                format: '{y:.2f}',
                                overflow: 'none',
                                crop: true
                            },
                            labels: [{
                                    point: {
                                        xAxis: coordsX.axis.index,
                                        yAxis: coordsY.axis.index,
                                        x: coordsX.value,
                                        y: coordsY.value
                                    }
                                }]
                        }, navigation
                            .annotationsOptions, navigation
                            .bindings
                            .labelAnnotation
                            .annotationsOptions));
                    }
                }
            },
            /**
             * Path where Highcharts will look for icons. Change this to use icons
             * from a different server.
             *
             * @type      {string}
             * @default   https://code.highcharts.com/11.4.6/gfx/stock-icons/
             * @since     7.1.3
             * @apioption navigation.iconsURL
             */
            /**
             * A `showPopup` event. Fired when selecting for example an annotation.
             *
             * @type      {Function}
             * @apioption navigation.events.showPopup
             */
            /**
             * A `closePopup` event. Fired when Popup should be hidden, for example
             * when clicking on an annotation again.
             *
             * @type      {Function}
             * @apioption navigation.events.closePopup
             */
            /**
             * Event fired on a button click.
             *
             * @type      {Function}
             * @sample    highcharts/annotations/gui/
             *            Change icon in a dropddown on event
             * @sample    highcharts/annotations/gui-buttons/
             *            Change button class on event
             * @apioption navigation.events.selectButton
             */
            /**
             * Event fired when button state should change, for example after
             * adding an annotation.
             *
             * @type      {Function}
             * @sample    highcharts/annotations/gui/
             *            Change icon in a dropddown on event
             * @sample    highcharts/annotations/gui-buttons/
             *            Change button class on event
             * @apioption navigation.events.deselectButton
             */
            /**
             * Events to communicate between Stock Tools and custom GUI.
             *
             * @since        7.0.0
             * @product      highcharts highstock
             * @optionparent navigation.events
             */
            events: {},
            /**
             * Additional options to be merged into all annotations.
             *
             * @sample stock/stocktools/navigation-annotation-options
             *         Set red color of all line annotations
             *
             * @type      {Highcharts.AnnotationsOptions}
             * @extends   annotations
             * @exclude   crookedLine, elliottWave, fibonacci, infinityLine,
             *            measure, pitchfork, tunnel, verticalLine, basicAnnotation
             * @requires     modules/annotations
             * @apioption navigation.annotationsOptions
             */
            annotationsOptions: {
                animation: {
                    defer: 0
                }
            }
        };
        /* *
         *
         *  Default Export
         *
         * */
        const NavigationBindingDefaults = {
            lang,
            navigation
        };

        return NavigationBindingDefaults;
    });
    _registerModule(_modules, 'Extensions/Annotations/NavigationBindings.js', [_modules['Core/Chart/ChartNavigationComposition.js'], _modules['Core/Defaults.js'], _modules['Core/Templating.js'], _modules['Core/Globals.js'], _modules['Extensions/Annotations/NavigationBindingsDefaults.js'], _modules['Extensions/Annotations/NavigationBindingsUtilities.js'], _modules['Core/Utilities.js']], function (ChartNavigationComposition, D, F, H, NavigationBindingDefaults, NBU, U) {
        /* *
         *
         *  (c) 2009-2024 Highsoft, Black Label
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { setOptions } = D;
        const { format } = F;
        const { composed, doc, win } = H;
        const { getAssignedAxis, getFieldType } = NBU;
        const { addEvent, attr, defined, fireEvent, isArray, isFunction, isNumber, isObject, merge, objectEach, pick, pushUnique } = U;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * IE 9-11 polyfill for Element.closest():
         * @private
         */
        function closestPolyfill(el, s) {
            const ElementProto = win.Element.prototype, elementMatches = ElementProto.matches ||
                ElementProto.msMatchesSelector ||
                ElementProto.webkitMatchesSelector;
            let ret = null;
            if (ElementProto.closest) {
                ret = ElementProto.closest.call(el, s);
            }
            else {
                do {
                    if (elementMatches.call(el, s)) {
                        return el;
                    }
                    el = el.parentElement || el.parentNode;
                } while (el !== null && el.nodeType === 1);
            }
            return ret;
        }
        /**
         * @private
         */
        function onAnnotationRemove() {
            if (this.chart.navigationBindings) {
                this.chart.navigationBindings.deselectAnnotation();
            }
        }
        /**
         * @private
         */
        function onChartDestroy() {
            if (this.navigationBindings) {
                this.navigationBindings.destroy();
            }
        }
        /**
         * @private
         */
        function onChartLoad() {
            const options = this.options;
            if (options && options.navigation && options.navigation.bindings) {
                this.navigationBindings = new NavigationBindings(this, options.navigation);
                this.navigationBindings.initEvents();
                this.navigationBindings.initUpdate();
            }
        }
        /**
         * @private
         */
        function onChartRender() {
            const navigationBindings = this.navigationBindings, disabledClassName = 'highcharts-disabled-btn';
            if (this && navigationBindings) {
                // Check if the buttons should be enabled/disabled based on
                // visible series.
                let buttonsEnabled = false;
                this.series.forEach((series) => {
                    if (!series.options.isInternal && series.visible) {
                        buttonsEnabled = true;
                    }
                });
                if (this.navigationBindings &&
                    this.navigationBindings.container &&
                    this.navigationBindings.container[0]) {
                    const container = this.navigationBindings.container[0];
                    objectEach(navigationBindings.boundClassNames, (value, key) => {
                        // Get the HTML element corresponding to the className taken
                        // from StockToolsBindings.
                        const buttonNode = container.querySelectorAll('.' + key);
                        if (buttonNode) {
                            for (let i = 0; i < buttonNode.length; i++) {
                                const button = buttonNode[i], cls = button.className;
                                if (value.noDataState === 'normal') {
                                    // If button has noDataState: 'normal', and has
                                    // disabledClassName, remove this className.
                                    if (cls.indexOf(disabledClassName) !== -1) {
                                        button.classList.remove(disabledClassName);
                                    }
                                }
                                else if (!buttonsEnabled) {
                                    if (cls.indexOf(disabledClassName) === -1) {
                                        button.className += ' ' + disabledClassName;
                                    }
                                }
                                else {
                                    // Enable all buttons by deleting the className.
                                    if (cls.indexOf(disabledClassName) !== -1) {
                                        button.classList.remove(disabledClassName);
                                    }
                                }
                            }
                        }
                    });
                }
            }
        }
        /**
         * @private
         */
        function onNavigationBindingsClosePopup() {
            this.deselectAnnotation();
        }
        /**
         * @private
         */
        function onNavigationBindingsDeselectButton() {
            this.selectedButtonElement = null;
        }
        /**
         * Show edit-annotation form:
         * @private
         */
        function selectableAnnotation(annotationType) {
            const originalClick = annotationType.prototype.defaultOptions.events &&
                annotationType.prototype.defaultOptions.events.click;
            /**
             * Select and show popup
             * @private
             */
            function selectAndShowPopup(eventArguments) {
                const annotation = this, navigation = annotation.chart.navigationBindings, prevAnnotation = navigation.activeAnnotation;
                if (originalClick) {
                    originalClick.call(annotation, eventArguments);
                }
                if (prevAnnotation !== annotation) {
                    // Select current:
                    navigation.deselectAnnotation();
                    navigation.activeAnnotation = annotation;
                    annotation.setControlPointsVisibility(true);
                    fireEvent(navigation, 'showPopup', {
                        annotation: annotation,
                        formType: 'annotation-toolbar',
                        options: navigation.annotationToFields(annotation),
                        onSubmit: function (data) {
                            if (data.actionType === 'remove') {
                                navigation.activeAnnotation = false;
                                navigation.chart.removeAnnotation(annotation);
                            }
                            else {
                                const config = {};
                                navigation.fieldsToOptions(data.fields, config);
                                navigation.deselectAnnotation();
                                const typeOptions = config.typeOptions;
                                if (annotation.options.type === 'measure') {
                                    // Manually disable crooshars according to
                                    // stroke width of the shape:
                                    typeOptions.crosshairY.enabled = (typeOptions.crosshairY
                                        .strokeWidth !== 0);
                                    typeOptions.crosshairX.enabled = (typeOptions.crosshairX
                                        .strokeWidth !== 0);
                                }
                                annotation.update(config);
                            }
                        }
                    });
                }
                else {
                    // Deselect current:
                    fireEvent(navigation, 'closePopup');
                }
                // Let bubble event to chart.click:
                eventArguments.activeAnnotation = true;
            }
            // #18276, show popup on touchend, but not on touchmove
            let touchStartX, touchStartY;
            /**
             *
             */
            function saveCoords(e) {
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
            }
            /**
             *
             */
            function checkForTouchmove(e) {
                const hasMoved = touchStartX ? Math.sqrt(Math.pow(touchStartX - e.changedTouches[0].clientX, 2) +
                    Math.pow(touchStartY - e.changedTouches[0].clientY, 2)) >= 4 : false;
                if (!hasMoved) {
                    selectAndShowPopup.call(this, e);
                }
            }
            merge(true, annotationType.prototype.defaultOptions.events, {
                click: selectAndShowPopup,
                touchstart: saveCoords,
                touchend: checkForTouchmove
            });
        }
        /* *
         *
         *  Class
         *
         * */
        /**
         * @private
         */
        class NavigationBindings {
            /* *
             *
             *  Static Functions
             *
             * */
            static compose(AnnotationClass, ChartClass) {
                if (pushUnique(composed, 'NavigationBindings')) {
                    addEvent(AnnotationClass, 'remove', onAnnotationRemove);
                    // Basic shapes:
                    selectableAnnotation(AnnotationClass);
                    // Advanced annotations:
                    objectEach(AnnotationClass.types, (annotationType) => {
                        selectableAnnotation(annotationType);
                    });
                    addEvent(ChartClass, 'destroy', onChartDestroy);
                    addEvent(ChartClass, 'load', onChartLoad);
                    addEvent(ChartClass, 'render', onChartRender);
                    addEvent(NavigationBindings, 'closePopup', onNavigationBindingsClosePopup);
                    addEvent(NavigationBindings, 'deselectButton', onNavigationBindingsDeselectButton);
                    setOptions(NavigationBindingDefaults);
                }
            }
            /* *
             *
             *  Constructor
             *
             * */
            constructor(chart, options) {
                this.boundClassNames = void 0;
                this.chart = chart;
                this.options = options;
                this.eventsToUnbind = [];
                this.container =
                    this.chart.container.getElementsByClassName(this.options.bindingsClassName || '');
                if (!this.container.length) {
                    this.container = doc.getElementsByClassName(this.options.bindingsClassName || '');
                }
            }
            /* *
             *
             *  Functions
             *
             * */
            getCoords(e) {
                const coords = this.chart.pointer?.getCoordinates(e);
                return [
                    coords && getAssignedAxis(coords.xAxis),
                    coords && getAssignedAxis(coords.yAxis)
                ];
            }
            /**
             * Init all events connected to NavigationBindings.
             *
             * @private
             * @function Highcharts.NavigationBindings#initEvents
             */
            initEvents() {
                const navigation = this, chart = navigation.chart, bindingsContainer = navigation.container, options = navigation.options;
                // Shorthand object for getting events for buttons:
                navigation.boundClassNames = {};
                objectEach((options.bindings || {}), (value) => {
                    navigation.boundClassNames[value.className] = value;
                });
                // Handle multiple containers with the same class names:
                [].forEach.call(bindingsContainer, (subContainer) => {
                    navigation.eventsToUnbind.push(addEvent(subContainer, 'click', (event) => {
                        const bindings = navigation.getButtonEvents(subContainer, event);
                        if (bindings &&
                            (!bindings.button.classList
                                .contains('highcharts-disabled-btn'))) {
                            navigation.bindingsButtonClick(bindings.button, bindings.events, event);
                        }
                    }));
                });
                objectEach((options.events || {}), (callback, eventName) => {
                    if (isFunction(callback)) {
                        navigation.eventsToUnbind.push(addEvent(navigation, eventName, callback, { passive: false }));
                    }
                });
                navigation.eventsToUnbind.push(addEvent(chart.container, 'click', function (e) {
                    if (!chart.cancelClick &&
                        chart.isInsidePlot(e.chartX - chart.plotLeft, e.chartY - chart.plotTop, {
                            visiblePlotOnly: true
                        })) {
                        navigation.bindingsChartClick(this, e);
                    }
                }));
                navigation.eventsToUnbind.push(addEvent(chart.container, H.isTouchDevice ? 'touchmove' : 'mousemove', function (e) {
                    navigation.bindingsContainerMouseMove(this, e);
                }, H.isTouchDevice ? { passive: false } : void 0));
            }
            /**
             * Common chart.update() delegation, shared between bindings and exporting.
             *
             * @private
             * @function Highcharts.NavigationBindings#initUpdate
             */
            initUpdate() {
                const navigation = this;
                ChartNavigationComposition
                    .compose(this.chart).navigation
                    .addUpdate((options) => {
                    navigation.update(options);
                });
            }
            /**
             * Hook for click on a button, method selects/unselects buttons,
             * then calls `bindings.init` callback.
             *
             * @private
             * @function Highcharts.NavigationBindings#bindingsButtonClick
             *
             * @param {Highcharts.HTMLDOMElement} [button]
             *        Clicked button
             *
             * @param {Object} events
             *        Events passed down from bindings (`init`, `start`, `step`, `end`)
             *
             * @param {Highcharts.PointerEventObject} clickEvent
             *        Browser's click event
             */
            bindingsButtonClick(button, events, clickEvent) {
                const navigation = this, chart = navigation.chart, svgContainer = chart.renderer.boxWrapper;
                let shouldEventBeFired = true;
                if (navigation.selectedButtonElement) {
                    if (navigation.selectedButtonElement.classList === button.classList) {
                        shouldEventBeFired = false;
                    }
                    fireEvent(navigation, 'deselectButton', { button: navigation.selectedButtonElement });
                    if (navigation.nextEvent) {
                        // Remove in-progress annotations adders:
                        if (navigation.currentUserDetails &&
                            navigation.currentUserDetails.coll === 'annotations') {
                            chart.removeAnnotation(navigation.currentUserDetails);
                        }
                        navigation.mouseMoveEvent = navigation.nextEvent = false;
                    }
                }
                if (shouldEventBeFired) {
                    navigation.selectedButton = events;
                    navigation.selectedButtonElement = button;
                    fireEvent(navigation, 'selectButton', { button: button });
                    // Call "init" event, for example to open modal window
                    if (events.init) {
                        events.init.call(navigation, button, clickEvent);
                    }
                    if (events.start || events.steps) {
                        chart.renderer.boxWrapper.addClass('highcharts-draw-mode');
                    }
                }
                else {
                    chart.stockTools && button.classList.remove('highcharts-active');
                    svgContainer.removeClass('highcharts-draw-mode');
                    navigation.nextEvent = false;
                    navigation.mouseMoveEvent = false;
                    navigation.selectedButton = null;
                }
            }
            /**
             * Hook for click on a chart, first click on a chart calls `start` event,
             * then on all subsequent clicks iterate over `steps` array.
             * When finished, calls `end` event.
             *
             * @private
             * @function Highcharts.NavigationBindings#bindingsChartClick
             *
             * @param {Highcharts.Chart} chart
             *        Chart that click was performed on.
             *
             * @param {Highcharts.PointerEventObject} clickEvent
             *        Browser's click event.
             */
            bindingsChartClick(chart, clickEvent) {
                chart = this.chart;
                const navigation = this, activeAnnotation = navigation.activeAnnotation, selectedButton = navigation.selectedButton, svgContainer = chart.renderer.boxWrapper;
                if (activeAnnotation) {
                    // Click outside popups, should close them and deselect the
                    // annotation
                    if (!activeAnnotation.cancelClick && // #15729
                        !clickEvent.activeAnnotation &&
                        // Element could be removed in the child action, e.g. button
                        clickEvent.target.parentNode &&
                        // TO DO: Polyfill for IE11?
                        !closestPolyfill(clickEvent.target, '.highcharts-popup')) {
                        fireEvent(navigation, 'closePopup');
                    }
                    else if (activeAnnotation.cancelClick) {
                        // Reset cancelClick after the other event handlers have run
                        setTimeout(() => {
                            activeAnnotation.cancelClick = false;
                        }, 0);
                    }
                }
                if (!selectedButton || !selectedButton.start) {
                    return;
                }
                if (!navigation.nextEvent) {
                    // Call init method:
                    navigation.currentUserDetails = selectedButton.start.call(navigation, clickEvent);
                    // If steps exists (e.g. Annotations), bind them:
                    if (navigation.currentUserDetails && selectedButton.steps) {
                        navigation.stepIndex = 0;
                        navigation.steps = true;
                        navigation.mouseMoveEvent = navigation.nextEvent =
                            selectedButton.steps[navigation.stepIndex];
                    }
                    else {
                        fireEvent(navigation, 'deselectButton', { button: navigation.selectedButtonElement });
                        svgContainer.removeClass('highcharts-draw-mode');
                        navigation.steps = false;
                        navigation.selectedButton = null;
                        // First click is also the last one:
                        if (selectedButton.end) {
                            selectedButton.end.call(navigation, clickEvent, navigation.currentUserDetails);
                        }
                    }
                }
                else {
                    navigation.nextEvent(clickEvent, navigation.currentUserDetails);
                    if (navigation.steps) {
                        navigation.stepIndex++;
                        if (selectedButton.steps[navigation.stepIndex]) {
                            // If we have more steps, bind them one by one:
                            navigation.mouseMoveEvent = navigation.nextEvent = selectedButton.steps[navigation.stepIndex];
                        }
                        else {
                            fireEvent(navigation, 'deselectButton', { button: navigation.selectedButtonElement });
                            svgContainer.removeClass('highcharts-draw-mode');
                            // That was the last step, call end():
                            if (selectedButton.end) {
                                selectedButton.end.call(navigation, clickEvent, navigation.currentUserDetails);
                            }
                            navigation.nextEvent = false;
                            navigation.mouseMoveEvent = false;
                            navigation.selectedButton = null;
                        }
                    }
                }
            }
            /**
             * Hook for mouse move on a chart's container. It calls current step.
             *
             * @private
             * @function Highcharts.NavigationBindings#bindingsContainerMouseMove
             *
             * @param {Highcharts.HTMLDOMElement} container
             *        Chart's container.
             *
             * @param {global.Event} moveEvent
             *        Browser's move event.
             */
            bindingsContainerMouseMove(_container, moveEvent) {
                if (this.mouseMoveEvent) {
                    this.mouseMoveEvent(moveEvent, this.currentUserDetails);
                }
            }
            /**
             * Translate fields (e.g. `params.period` or `marker.styles.color`) to
             * Highcharts options object (e.g. `{ params: { period } }`).
             *
             * @private
             * @function Highcharts.NavigationBindings#fieldsToOptions<T>
             *
             * @param {Highcharts.Dictionary<string>} fields
             *        Fields from popup form.
             *
             * @param {T} config
             *        Default config to be modified.
             *
             * @return {T}
             *         Modified config
             */
            fieldsToOptions(fields, config) {
                objectEach(fields, (value, field) => {
                    const parsedValue = parseFloat(value), path = field.split('.'), pathLength = path.length - 1;
                    // If it's a number (not "format" options), parse it:
                    if (isNumber(parsedValue) &&
                        !value.match(/px|em/g) &&
                        !field.match(/format/g)) {
                        value = parsedValue;
                    }
                    // Remove values like 0
                    if (value !== 'undefined') {
                        let parent = config;
                        path.forEach((name, index) => {
                            if (name !== '__proto__' && name !== 'constructor') {
                                const nextName = pick(path[index + 1], '');
                                if (pathLength === index) {
                                    // Last index, put value:
                                    parent[name] = value;
                                }
                                else if (!parent[name]) {
                                    // Create middle property:
                                    parent[name] = nextName.match(/\d/g) ?
                                        [] :
                                        {};
                                    parent = parent[name];
                                }
                                else {
                                    // Jump into next property
                                    parent = parent[name];
                                }
                            }
                        });
                    }
                });
                return config;
            }
            /**
             * Shorthand method to deselect an annotation.
             *
             * @function Highcharts.NavigationBindings#deselectAnnotation
             */
            deselectAnnotation() {
                if (this.activeAnnotation) {
                    this.activeAnnotation.setControlPointsVisibility(false);
                    this.activeAnnotation = false;
                }
            }
            /**
             * Generates API config for popup in the same format as options for
             * Annotation object.
             *
             * @function Highcharts.NavigationBindings#annotationToFields
             *
             * @param {Highcharts.Annotation} annotation
             *        Annotations object
             *
             * @return {Highcharts.Dictionary<string>}
             *         Annotation options to be displayed in popup box
             */
            annotationToFields(annotation) {
                const options = annotation.options, editables = NavigationBindings.annotationsEditable, nestedEditables = editables.nestedOptions, type = pick(options.type, options.shapes && options.shapes[0] &&
                    options.shapes[0].type, options.labels && options.labels[0] &&
                    options.labels[0].type, 'label'), nonEditables = NavigationBindings.annotationsNonEditable[options.langKey] || [], visualOptions = {
                    langKey: options.langKey,
                    type: type
                };
                /**
                 * Nested options traversing. Method goes down to the options and copies
                 * allowed options (with values) to new object, which is last parameter:
                 * "parent".
                 *
                 * @private
                 *
                 * @param {*} option
                 *        Atomic type or object/array
                 *
                 * @param {string} key
                 *        Option name, for example "visible" or "x", "y"
                 *
                 * @param {Object} parentEditables
                 *        Editables from NavigationBindings.annotationsEditable
                 *
                 * @param {Object} parent
                 *        Where new options will be assigned
                 */
                function traverse(option, key, parentEditables, parent, parentKey) {
                    let nextParent;
                    if (parentEditables &&
                        defined(option) &&
                        nonEditables.indexOf(key) === -1 &&
                        ((parentEditables.indexOf &&
                            parentEditables.indexOf(key)) >= 0 ||
                            parentEditables[key] || // Nested array
                            parentEditables === true // Simple array
                        )) {
                        // Roots:
                        if (isArray(option)) {
                            parent[key] = [];
                            option.forEach((arrayOption, i) => {
                                if (!isObject(arrayOption)) {
                                    // Simple arrays, e.g. [String, Number, Boolean]
                                    traverse(arrayOption, 0, nestedEditables[key], parent[key], key);
                                }
                                else {
                                    // Advanced arrays, e.g. [Object, Object]
                                    parent[key][i] = {};
                                    objectEach(arrayOption, (nestedOption, nestedKey) => {
                                        traverse(nestedOption, nestedKey, nestedEditables[key], parent[key][i], key);
                                    });
                                }
                            });
                        }
                        else if (isObject(option)) {
                            nextParent = {};
                            if (isArray(parent)) {
                                parent.push(nextParent);
                                nextParent[key] = {};
                                nextParent = nextParent[key];
                            }
                            else {
                                parent[key] = nextParent;
                            }
                            objectEach(option, (nestedOption, nestedKey) => {
                                traverse(nestedOption, nestedKey, key === 0 ?
                                    parentEditables :
                                    nestedEditables[key], nextParent, key);
                            });
                        }
                        else {
                            // Leaf:
                            if (key === 'format') {
                                parent[key] = [
                                    format(option, annotation.labels[0].points[0]).toString(),
                                    'text'
                                ];
                            }
                            else if (isArray(parent)) {
                                parent.push([option, getFieldType(parentKey, option)]);
                            }
                            else {
                                parent[key] = [option, getFieldType(key, option)];
                            }
                        }
                    }
                }
                objectEach(options, (option, key) => {
                    if (key === 'typeOptions') {
                        visualOptions[key] = {};
                        objectEach(options[key], (typeOption, typeKey) => {
                            traverse(typeOption, typeKey, nestedEditables, visualOptions[key], typeKey);
                        });
                    }
                    else {
                        traverse(option, key, editables[type], visualOptions, key);
                    }
                });
                return visualOptions;
            }
            /**
             * Get all class names for all parents in the element. Iterates until finds
             * main container.
             *
             * @private
             * @function Highcharts.NavigationBindings#getClickedClassNames
             *
             * @param {Highcharts.HTMLDOMElement} container
             * Container that event is bound to.
             *
             * @param {global.Event} event
             * Browser's event.
             *
             * @return {Array<Array<string, Highcharts.HTMLDOMElement>>}
             * Array of class names with corresponding elements
             */
            getClickedClassNames(container, event) {
                let element = event.target, classNames = [], elemClassName;
                while (element && element.tagName) {
                    elemClassName = attr(element, 'class');
                    if (elemClassName) {
                        classNames = classNames.concat(elemClassName
                            .split(' ')
                            // eslint-disable-next-line no-loop-func
                            .map((name) => ([name, element])));
                    }
                    element = element.parentNode;
                    if (element === container) {
                        return classNames;
                    }
                }
                return classNames;
            }
            /**
             * Get events bound to a button. It's a custom event delegation to find all
             * events connected to the element.
             *
             * @private
             * @function Highcharts.NavigationBindings#getButtonEvents
             *
             * @param {Highcharts.HTMLDOMElement} container
             *        Container that event is bound to.
             *
             * @param {global.Event} event
             *        Browser's event.
             *
             * @return {Object}
             *         Object with events (init, start, steps, and end)
             */
            getButtonEvents(container, event) {
                const navigation = this, classNames = this.getClickedClassNames(container, event);
                let bindings;
                classNames.forEach((className) => {
                    if (navigation.boundClassNames[className[0]] && !bindings) {
                        bindings = {
                            events: navigation.boundClassNames[className[0]],
                            button: className[1]
                        };
                    }
                });
                return bindings;
            }
            /**
             * Bindings are just events, so the whole update process is simply
             * removing old events and adding new ones.
             *
             * @private
             * @function Highcharts.NavigationBindings#update
             */
            update(options) {
                this.options = merge(true, this.options, options);
                this.removeEvents();
                this.initEvents();
            }
            /**
             * Remove all events created in the navigation.
             *
             * @private
             * @function Highcharts.NavigationBindings#removeEvents
             */
            removeEvents() {
                this.eventsToUnbind.forEach((unbinder) => unbinder());
            }
            /**
             * @private
             * @function Highcharts.NavigationBindings#destroy
             */
            destroy() {
                this.removeEvents();
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        // Define which options from annotations should show up in edit box:
        NavigationBindings.annotationsEditable = {
            // `typeOptions` are always available
            // Nested and shared options:
            nestedOptions: {
                labelOptions: ['style', 'format', 'backgroundColor'],
                labels: ['style'],
                label: ['style'],
                style: ['fontSize', 'color'],
                background: ['fill', 'strokeWidth', 'stroke'],
                innerBackground: ['fill', 'strokeWidth', 'stroke'],
                outerBackground: ['fill', 'strokeWidth', 'stroke'],
                shapeOptions: ['fill', 'strokeWidth', 'stroke'],
                shapes: ['fill', 'strokeWidth', 'stroke'],
                line: ['strokeWidth', 'stroke'],
                backgroundColors: [true],
                connector: ['fill', 'strokeWidth', 'stroke'],
                crosshairX: ['strokeWidth', 'stroke'],
                crosshairY: ['strokeWidth', 'stroke']
            },
            // Simple shapes:
            circle: ['shapes'],
            ellipse: ['shapes'],
            verticalLine: [],
            label: ['labelOptions'],
            // Measure
            measure: ['background', 'crosshairY', 'crosshairX'],
            // Others:
            fibonacci: [],
            tunnel: ['background', 'line', 'height'],
            pitchfork: ['innerBackground', 'outerBackground'],
            rect: ['shapes'],
            // Crooked lines, elliots, arrows etc:
            crookedLine: [],
            basicAnnotation: ['shapes', 'labelOptions']
        };
        // Define non editable fields per annotation, for example Rectangle inherits
        // options from Measure, but crosshairs are not available
        NavigationBindings.annotationsNonEditable = {
            rectangle: ['crosshairX', 'crosshairY', 'labelOptions'],
            ellipse: ['labelOptions'],
            circle: ['labelOptions']
        };
        /* *
         *
         *  Default Export
         *
         * */
        /* *
         *
         *  API Declarations
         *
         * */
        /**
         * A config object for navigation bindings in annotations.
         *
         * @interface Highcharts.NavigationBindingsOptionsObject
         */ /**
        * ClassName of the element for a binding.
        * @name Highcharts.NavigationBindingsOptionsObject#className
        * @type {string|undefined}
        */ /**
        * Last event to be fired after last step event.
        * @name Highcharts.NavigationBindingsOptionsObject#end
        * @type {Function|undefined}
        */ /**
        * Initial event, fired on a button click.
        * @name Highcharts.NavigationBindingsOptionsObject#init
        * @type {Function|undefined}
        */ /**
        * Event fired on first click on a chart.
        * @name Highcharts.NavigationBindingsOptionsObject#start
        * @type {Function|undefined}
        */ /**
        * Last event to be fired after last step event. Array of step events to be
        * called sequentially after each user click.
        * @name Highcharts.NavigationBindingsOptionsObject#steps
        * @type {Array<Function>|undefined}
        */
        (''); // Keeps doclets above in JS file

        return NavigationBindings;
    });
    _registerModule(_modules, 'Stock/StockTools/StockToolsUtilities.js', [_modules['Core/Defaults.js'], _modules['Extensions/Annotations/NavigationBindingsUtilities.js'], _modules['Core/Series/Series.js'], _modules['Core/Utilities.js']], function (D, NBU, Series, U) {
        /**
         *
         *  Events generator for Stock tools
         *
         *  (c) 2009-2024 Paweł Fus
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { getOptions } = D;
        const { getAssignedAxis, getFieldType } = NBU;
        const { defined, fireEvent, isNumber, uniqueKey } = U;
        /* *
         *
         *  Constants
         *
         * */
        /**
         * @private
         */
        const indicatorsWithAxes = [
            'apo',
            'ad',
            'aroon',
            'aroonoscillator',
            'atr',
            'ao',
            'cci',
            'chaikin',
            'cmf',
            'cmo',
            'disparityindex',
            'dmi',
            'dpo',
            'linearRegressionAngle',
            'linearRegressionIntercept',
            'linearRegressionSlope',
            'klinger',
            'macd',
            'mfi',
            'momentum',
            'natr',
            'obv',
            'ppo',
            'roc',
            'rsi',
            'slowstochastic',
            'stochastic',
            'trix',
            'williamsr'
        ];
        /**
         * @private
         */
        const indicatorsWithVolume = [
            'ad',
            'cmf',
            'klinger',
            'mfi',
            'obv',
            'vbp',
            'vwap'
        ];
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Generates function which will add a flag series using modal in GUI.
         * Method fires an event "showPopup" with config:
         * `{type, options, callback}`.
         *
         * Example: NavigationBindings.utils.addFlagFromForm('url(...)') - will
         * generate function that shows modal in GUI.
         *
         * @private
         * @function bindingsUtils.addFlagFromForm
         *
         * @param {Highcharts.FlagsShapeValue} type
         *        Type of flag series, e.g. "squarepin"
         *
         * @return {Function}
         *         Callback to be used in `start` callback
         */
        function addFlagFromForm(type) {
            return function (e) {
                const navigation = this, chart = navigation.chart, toolbar = chart.stockTools, point = attractToPoint(e, chart);
                if (!point) {
                    return;
                }
                const pointConfig = {
                    x: point.x,
                    y: point.y
                };
                const seriesOptions = {
                    type: 'flags',
                    onSeries: point.series.id,
                    shape: type,
                    data: [pointConfig],
                    xAxis: point.xAxis,
                    yAxis: point.yAxis,
                    point: {
                        events: {
                            click: function () {
                                const point = this, options = point.options;
                                fireEvent(navigation, 'showPopup', {
                                    point: point,
                                    formType: 'annotation-toolbar',
                                    options: {
                                        langKey: 'flags',
                                        type: 'flags',
                                        title: [
                                            options.title,
                                            getFieldType('title', options.title)
                                        ],
                                        name: [
                                            options.name,
                                            getFieldType('name', options.name)
                                        ]
                                    },
                                    onSubmit: function (updated) {
                                        if (updated.actionType === 'remove') {
                                            point.remove();
                                        }
                                        else {
                                            point.update(navigation.fieldsToOptions(updated.fields, {}));
                                        }
                                    }
                                });
                            }
                        }
                    }
                };
                if (!toolbar || !toolbar.guiEnabled) {
                    chart.addSeries(seriesOptions);
                }
                fireEvent(navigation, 'showPopup', {
                    formType: 'flag',
                    // Enabled options:
                    options: {
                        langKey: 'flags',
                        type: 'flags',
                        title: ['A', getFieldType('label', 'A')],
                        name: ['Flag A', getFieldType('label', 'Flag A')]
                    },
                    // Callback on submit:
                    onSubmit: function (data) {
                        navigation.fieldsToOptions(data.fields, seriesOptions.data[0]);
                        chart.addSeries(seriesOptions);
                    }
                });
            };
        }
        /**
         * @private
         * @todo
         * Consider using getHoverData(), but always kdTree (columns?)
         */
        function attractToPoint(e, chart) {
            const coords = chart.pointer?.getCoordinates(e);
            let coordsX, coordsY, distX = Number.MAX_VALUE, closestPoint;
            if (chart.navigationBindings && coords) {
                coordsX = getAssignedAxis(coords.xAxis);
                coordsY = getAssignedAxis(coords.yAxis);
            }
            // Exit if clicked out of axes area.
            if (!coordsX || !coordsY) {
                return;
            }
            const x = coordsX.value;
            const y = coordsY.value;
            // Search by 'x' but only in yAxis' series.
            coordsY.axis.series.forEach((series) => {
                if (series.points) {
                    const point = series.searchPoint(e, true);
                    if (point && distX > Math.abs(point.x - x)) {
                        distX = Math.abs(point.x - x);
                        closestPoint = point;
                    }
                }
            });
            if (closestPoint && closestPoint.x && closestPoint.y) {
                return {
                    x: closestPoint.x,
                    y: closestPoint.y,
                    below: y < closestPoint.y,
                    series: closestPoint.series,
                    xAxis: closestPoint.series.xAxis.index || 0,
                    yAxis: closestPoint.series.yAxis.index || 0
                };
            }
        }
        /**
         * Shorthand to check if given yAxis comes from navigator.
         *
         * @private
         * @function bindingsUtils.isNotNavigatorYAxis
         *
         * @param {Highcharts.Axis} axis
         * Axis to check.
         *
         * @return {boolean}
         * True, if axis comes from navigator.
         */
        function isNotNavigatorYAxis(axis) {
            return axis.userOptions.className !== 'highcharts-navigator-yaxis';
        }
        /**
         * Check if any of the price indicators are enabled.
         * @private
         * @function bindingsUtils.isLastPriceEnabled
         *
         * @param {Array} series
         *        Array of series.
         *
         * @return {boolean}
         *         Tells which indicator is enabled.
         */
        function isPriceIndicatorEnabled(series) {
            return series.some((s) => s.lastVisiblePrice || s.lastPrice);
        }
        /**
         * @private
         */
        function manageIndicators(data) {
            const chart = this.chart, seriesConfig = {
                linkedTo: data.linkedTo,
                type: data.type
            };
            let yAxis, parentSeries, defaultOptions, series;
            if (data.actionType === 'edit') {
                this.fieldsToOptions(data.fields, seriesConfig);
                series = chart.get(data.seriesId);
                if (series) {
                    series.update(seriesConfig, false);
                }
            }
            else if (data.actionType === 'remove') {
                series = chart.get(data.seriesId);
                if (series) {
                    yAxis = series.yAxis;
                    if (series.linkedSeries) {
                        series.linkedSeries.forEach((linkedSeries) => {
                            linkedSeries.remove(false);
                        });
                    }
                    series.remove(false);
                    if (indicatorsWithAxes.indexOf(series.type) >= 0) {
                        const removedYAxisProps = {
                            height: yAxis.options.height,
                            top: yAxis.options.top
                        };
                        yAxis.remove(false);
                        this.resizeYAxes(removedYAxisProps);
                    }
                }
            }
            else {
                seriesConfig.id = uniqueKey();
                this.fieldsToOptions(data.fields, seriesConfig);
                parentSeries = chart.get(seriesConfig.linkedTo);
                defaultOptions = getOptions().plotOptions;
                // Make sure that indicator uses the SUM approx if SUM approx is used
                // by parent series (#13950).
                if (typeof parentSeries !== 'undefined' &&
                    parentSeries instanceof Series &&
                    parentSeries.getDGApproximation() === 'sum' &&
                    // If indicator has defined approx type, use it (e.g. "ranges")
                    !defined(defaultOptions && defaultOptions[seriesConfig.type] &&
                        defaultOptions.dataGrouping &&
                        defaultOptions.dataGrouping.approximation)) {
                    seriesConfig.dataGrouping = {
                        approximation: 'sum'
                    };
                }
                if (indicatorsWithAxes.indexOf(data.type) >= 0) {
                    yAxis = chart.addAxis({
                        id: uniqueKey(),
                        offset: 0,
                        opposite: true,
                        title: {
                            text: ''
                        },
                        tickPixelInterval: 40,
                        showLastLabel: false,
                        labels: {
                            align: 'left',
                            y: -2
                        }
                    }, false, false);
                    seriesConfig.yAxis = yAxis.options.id;
                    this.resizeYAxes();
                }
                else {
                    seriesConfig.yAxis = chart.get(data.linkedTo).options.yAxis;
                }
                if (indicatorsWithVolume.indexOf(data.type) >= 0) {
                    seriesConfig.params.volumeSeriesID = chart.series.filter(function (series) {
                        return series.options.type === 'column';
                    })[0].options.id;
                }
                chart.addSeries(seriesConfig, false);
            }
            fireEvent(this, 'deselectButton', {
                button: this.selectedButtonElement
            });
            chart.redraw();
        }
        /**
         * Update height for an annotation. Height is calculated as a difference
         * between last point in `typeOptions` and current position. It's a value,
         * not pixels height.
         *
         * @private
         * @function bindingsUtils.updateHeight
         *
         * @param {Highcharts.PointerEventObject} e
         *        normalized browser event
         *
         * @param {Highcharts.Annotation} annotation
         *        Annotation to be updated
         */
        function updateHeight(e, annotation) {
            const options = annotation.options.typeOptions, yAxis = isNumber(options.yAxis) && this.chart.yAxis[options.yAxis];
            if (yAxis && options.points) {
                annotation.update({
                    typeOptions: {
                        height: yAxis.toValue(e[yAxis.horiz ? 'chartX' : 'chartY']) -
                            (options.points[1].y || 0)
                    }
                });
            }
        }
        /**
         * Update each point after specified index, most of the annotations use
         * this. For example crooked line: logic behind updating each point is the
         * same, only index changes when adding an annotation.
         *
         * Example: NavigationBindings.utils.updateNthPoint(1) - will generate
         * function that updates all consecutive points except point with index=0.
         *
         * @private
         * @function bindingsUtils.updateNthPoint
         *
         * @param {number} startIndex
         *        Index from which point should update
         *
         * @return {Function}
         *         Callback to be used in steps array
         */
        function updateNthPoint(startIndex) {
            return function (e, annotation) {
                const options = annotation.options.typeOptions, xAxis = isNumber(options.xAxis) && this.chart.xAxis[options.xAxis], yAxis = isNumber(options.yAxis) && this.chart.yAxis[options.yAxis];
                if (xAxis && yAxis) {
                    options.points.forEach((point, index) => {
                        if (index >= startIndex) {
                            point.x = xAxis.toValue(e[xAxis.horiz ? 'chartX' : 'chartY']);
                            point.y = yAxis.toValue(e[yAxis.horiz ? 'chartX' : 'chartY']);
                        }
                    });
                    annotation.update({
                        typeOptions: {
                            points: options.points
                        }
                    });
                }
            };
        }
        /**
         * Update size of background (rect) in some annotations: Measure, Simple
         * Rect.
         *
         * @private
         * @function Highcharts.NavigationBindingsUtilsObject.updateRectSize
         *
         * @param {Highcharts.PointerEventObject} event
         * Normalized browser event
         *
         * @param {Highcharts.Annotation} annotation
         * Annotation to be updated
         */
        function updateRectSize(event, annotation) {
            const chart = annotation.chart, options = annotation.options.typeOptions, xAxis = isNumber(options.xAxis) && chart.xAxis[options.xAxis], yAxis = isNumber(options.yAxis) && chart.yAxis[options.yAxis];
            if (xAxis && yAxis) {
                const x = xAxis.toValue(event[xAxis.horiz ? 'chartX' : 'chartY']), y = yAxis.toValue(event[yAxis.horiz ? 'chartX' : 'chartY']), width = x - options.point.x, height = options.point.y - y;
                annotation.update({
                    typeOptions: {
                        background: {
                            width: chart.inverted ? height : width,
                            height: chart.inverted ? width : height
                        }
                    }
                });
            }
        }
        /**
         * Compares two arrays of strings, checking their length and if corresponding
         * elements are equal.
         *
         * @param {string[]} a
         *        The first array to compare.
         * @param {string[]} b
         *        The second array to compare.
         * @return {boolean}
         *          Return `true` if the arrays are equal, otherwise `false`.
         */
        function shallowArraysEqual(a, b) {
            if (!defined(a) || !defined(b)) {
                return false;
            }
            if (a.length !== b.length) {
                return false;
            }
            for (let i = 0; i < a.length; i++) {
                if (a[i] !== b[i]) {
                    return false;
                }
            }
            return true;
        }
        /* *
         *
         *  Default Export
         *
         * */
        const StockToolsUtilities = {
            indicatorsWithAxes,
            indicatorsWithVolume,
            addFlagFromForm,
            attractToPoint,
            getAssignedAxis,
            isNotNavigatorYAxis,
            isPriceIndicatorEnabled,
            manageIndicators,
            shallowArraysEqual,
            updateHeight,
            updateNthPoint,
            updateRectSize
        };

        return StockToolsUtilities;
    });
    _registerModule(_modules, 'Stock/StockTools/StockToolsBindings.js', [_modules['Core/Globals.js'], _modules['Stock/StockTools/StockToolsUtilities.js'], _modules['Core/Utilities.js']], function (H, STU, U) {
        /**
         *
         *  Events generator for Stock tools
         *
         *  (c) 2009-2024 Paweł Fus
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { addFlagFromForm, attractToPoint, isNotNavigatorYAxis, isPriceIndicatorEnabled, manageIndicators, updateHeight, updateNthPoint, updateRectSize } = STU;
        const { fireEvent, merge } = U;
        /* *
         *
         *  Constants
         *
         * */
        /**
         * @sample {highstock} stock/stocktools/custom-stock-tools-bindings
         *         Custom stock tools bindings
         *
         * @type         {Highcharts.Dictionary<Highcharts.NavigationBindingsOptionsObject>}
         * @since        7.0.0
         * @optionparent navigation.bindings
         */
        const StockToolsBindings = {
            // Line type annotations:
            /**
             * A segment annotation bindings. Includes `start` and one event in `steps`
             * array.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-segment", "start": function() {}, "steps": [function() {}], "annotationsOptions": {}}
             */
            segment: {
                /** @ignore-option */
                className: 'highcharts-segment',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                start: function (e) {
                    const [coordsX, coordsY] = this.getCoords(e);
                    // Exit if clicked out of axes area
                    if (!coordsX || !coordsY) {
                        return;
                    }
                    const navigation = this.chart.options.navigation, options = merge({
                        langKey: 'segment',
                        type: 'crookedLine',
                        typeOptions: {
                            xAxis: coordsX.axis.index,
                            yAxis: coordsY.axis.index,
                            points: [{
                                    x: coordsX.value,
                                    y: coordsY.value
                                }, {
                                    x: coordsX.value,
                                    y: coordsY.value
                                }]
                        }
                    }, navigation.annotationsOptions, navigation.bindings.segment.annotationsOptions);
                    return this.chart.addAnnotation(options);
                },
                /** @ignore-option */
                steps: [
                    updateNthPoint(1)
                ]
            },
            /**
             * A segment with an arrow annotation bindings. Includes `start` and one
             * event in `steps` array.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-arrow-segment", "start": function() {}, "steps": [function() {}], "annotationsOptions": {}}
             */
            arrowSegment: {
                /** @ignore-option */
                className: 'highcharts-arrow-segment',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                start: function (e) {
                    const [coordsX, coordsY] = this.getCoords(e);
                    // Exit if clicked out of axes area
                    if (!coordsX || !coordsY) {
                        return;
                    }
                    const navigation = this.chart.options.navigation, options = merge({
                        langKey: 'arrowSegment',
                        type: 'crookedLine',
                        typeOptions: {
                            line: {
                                markerEnd: 'arrow'
                            },
                            xAxis: coordsX.axis.index,
                            yAxis: coordsY.axis.index,
                            points: [{
                                    x: coordsX.value,
                                    y: coordsY.value
                                }, {
                                    x: coordsX.value,
                                    y: coordsY.value
                                }]
                        }
                    }, navigation.annotationsOptions, navigation.bindings.arrowSegment.annotationsOptions);
                    return this.chart.addAnnotation(options);
                },
                /** @ignore-option */
                steps: [
                    updateNthPoint(1)
                ]
            },
            /**
             * A ray annotation bindings. Includes `start` and one event in `steps`
             * array.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-ray", "start": function() {}, "steps": [function() {}], "annotationsOptions": {}}
             */
            ray: {
                /** @ignore-option */
                className: 'highcharts-ray',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                start: function (e) {
                    const [coordsX, coordsY] = this.getCoords(e);
                    // Exit if clicked out of axes area
                    if (!coordsX || !coordsY) {
                        return;
                    }
                    const navigation = this.chart.options.navigation, options = merge({
                        langKey: 'ray',
                        type: 'infinityLine',
                        typeOptions: {
                            type: 'ray',
                            xAxis: coordsX.axis.index,
                            yAxis: coordsY.axis.index,
                            points: [{
                                    x: coordsX.value,
                                    y: coordsY.value
                                }, {
                                    x: coordsX.value,
                                    y: coordsY.value
                                }]
                        }
                    }, navigation.annotationsOptions, navigation.bindings.ray.annotationsOptions);
                    return this.chart.addAnnotation(options);
                },
                /** @ignore-option */
                steps: [
                    updateNthPoint(1)
                ]
            },
            /**
             * A ray with an arrow annotation bindings. Includes `start` and one event
             * in `steps` array.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-arrow-ray", "start": function() {}, "steps": [function() {}], "annotationsOptions": {}}
             */
            arrowRay: {
                /** @ignore-option */
                className: 'highcharts-arrow-ray',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                start: function (e) {
                    const [coordsX, coordsY] = this.getCoords(e);
                    // Exit if clicked out of axes area
                    if (!coordsX || !coordsY) {
                        return;
                    }
                    const navigation = this.chart.options.navigation, options = merge({
                        langKey: 'arrowRay',
                        type: 'infinityLine',
                        typeOptions: {
                            type: 'ray',
                            line: {
                                markerEnd: 'arrow'
                            },
                            xAxis: coordsX.axis.index,
                            yAxis: coordsY.axis.index,
                            points: [{
                                    x: coordsX.value,
                                    y: coordsY.value
                                }, {
                                    x: coordsX.value,
                                    y: coordsY.value
                                }]
                        }
                    }, navigation.annotationsOptions, navigation.bindings.arrowRay.annotationsOptions);
                    return this.chart.addAnnotation(options);
                },
                /** @ignore-option */
                steps: [
                    updateNthPoint(1)
                ]
            },
            /**
             * A line annotation. Includes `start` and one event in `steps` array.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-infinity-line", "start": function() {}, "steps": [function() {}], "annotationsOptions": {}}
             */
            infinityLine: {
                /** @ignore-option */
                className: 'highcharts-infinity-line',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                start: function (e) {
                    const [coordsX, coordsY] = this.getCoords(e);
                    // Exit if clicked out of axes area
                    if (!coordsX || !coordsY) {
                        return;
                    }
                    const navigation = this.chart.options.navigation, options = merge({
                        langKey: 'infinityLine',
                        type: 'infinityLine',
                        typeOptions: {
                            type: 'line',
                            xAxis: coordsX.axis.index,
                            yAxis: coordsY.axis.index,
                            points: [{
                                    x: coordsX.value,
                                    y: coordsY.value
                                }, {
                                    x: coordsX.value,
                                    y: coordsY.value
                                }]
                        }
                    }, navigation.annotationsOptions, navigation.bindings.infinityLine.annotationsOptions);
                    return this.chart.addAnnotation(options);
                },
                /** @ignore-option */
                steps: [
                    updateNthPoint(1)
                ]
            },
            /**
             * A line with arrow annotation. Includes `start` and one event in `steps`
             * array.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-arrow-infinity-line", "start": function() {}, "steps": [function() {}], "annotationsOptions": {}}
             */
            arrowInfinityLine: {
                /** @ignore-option */
                className: 'highcharts-arrow-infinity-line',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                start: function (e) {
                    const [coordsX, coordsY] = this.getCoords(e);
                    // Exit if clicked out of axes area
                    if (!coordsX || !coordsY) {
                        return;
                    }
                    const navigation = this.chart.options.navigation, options = merge({
                        langKey: 'arrowInfinityLine',
                        type: 'infinityLine',
                        typeOptions: {
                            type: 'line',
                            line: {
                                markerEnd: 'arrow'
                            },
                            xAxis: coordsX.axis.index,
                            yAxis: coordsY.axis.index,
                            points: [{
                                    x: coordsX.value,
                                    y: coordsY.value
                                }, {
                                    x: coordsX.value,
                                    y: coordsY.value
                                }]
                        }
                    }, navigation.annotationsOptions, navigation.bindings.arrowInfinityLine
                        .annotationsOptions);
                    return this.chart.addAnnotation(options);
                },
                /** @ignore-option */
                steps: [
                    updateNthPoint(1)
                ]
            },
            /**
             * A horizontal line annotation. Includes `start` event.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-horizontal-line", "start": function() {}, "annotationsOptions": {}}
             */
            horizontalLine: {
                /** @ignore-option */
                className: 'highcharts-horizontal-line',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                start: function (e) {
                    const [coordsX, coordsY] = this.getCoords(e);
                    // Exit if clicked out of axes area
                    if (!coordsX || !coordsY) {
                        return;
                    }
                    const navigation = this.chart.options.navigation, options = merge({
                        langKey: 'horizontalLine',
                        type: 'infinityLine',
                        draggable: 'y',
                        typeOptions: {
                            type: 'horizontalLine',
                            xAxis: coordsX.axis.index,
                            yAxis: coordsY.axis.index,
                            points: [{
                                    x: coordsX.value,
                                    y: coordsY.value
                                }]
                        }
                    }, navigation.annotationsOptions, navigation.bindings
                        .horizontalLine.annotationsOptions);
                    this.chart.addAnnotation(options);
                }
            },
            /**
             * A vertical line annotation. Includes `start` event.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-vertical-line", "start": function() {}, "annotationsOptions": {}}
             */
            verticalLine: {
                /** @ignore-option */
                className: 'highcharts-vertical-line',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                start: function (e) {
                    const [coordsX, coordsY] = this.getCoords(e);
                    // Exit if clicked out of axes area
                    if (!coordsX || !coordsY) {
                        return;
                    }
                    const navigation = this.chart.options.navigation, options = merge({
                        langKey: 'verticalLine',
                        type: 'infinityLine',
                        draggable: 'x',
                        typeOptions: {
                            type: 'verticalLine',
                            xAxis: coordsX.axis.index,
                            yAxis: coordsY.axis.index,
                            points: [{
                                    x: coordsX.value,
                                    y: coordsY.value
                                }]
                        }
                    }, navigation.annotationsOptions, navigation.bindings.verticalLine.annotationsOptions);
                    this.chart.addAnnotation(options);
                }
            },
            /**
             * Crooked line (three points) annotation bindings. Includes `start` and two
             * events in `steps` (for second and third points in crooked line) array.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-crooked3", "start": function() {}, "steps": [function() {}, function() {}], "annotationsOptions": {}}
             */
            // Crooked Line type annotations:
            crooked3: {
                /** @ignore-option */
                className: 'highcharts-crooked3',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                start: function (e) {
                    const [coordsX, coordsY] = this.getCoords(e);
                    // Exit if clicked out of axes area
                    if (!coordsX || !coordsY) {
                        return;
                    }
                    const x = coordsX.value, y = coordsY.value, navigation = this.chart.options.navigation, options = merge({
                        langKey: 'crooked3',
                        type: 'crookedLine',
                        typeOptions: {
                            xAxis: coordsX.axis.index,
                            yAxis: coordsY.axis.index,
                            points: [
                                { x, y },
                                { x, y },
                                { x, y }
                            ]
                        }
                    }, navigation.annotationsOptions, navigation.bindings.crooked3.annotationsOptions);
                    return this.chart.addAnnotation(options);
                },
                /** @ignore-option */
                steps: [
                    updateNthPoint(1),
                    updateNthPoint(2)
                ]
            },
            /**
             * Crooked line (five points) annotation bindings. Includes `start` and four
             * events in `steps` (for all consequent points in crooked line) array.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-crooked5", "start": function() {}, "steps": [function() {}, function() {}, function() {}, function() {}], "annotationsOptions": {}}
             */
            crooked5: {
                /** @ignore-option */
                className: 'highcharts-crooked5',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                start: function (e) {
                    const [coordsX, coordsY] = this.getCoords(e);
                    // Exit if clicked out of axes area
                    if (!coordsX || !coordsY) {
                        return;
                    }
                    const x = coordsX.value, y = coordsY.value, navigation = this.chart.options.navigation, options = merge({
                        langKey: 'crooked5',
                        type: 'crookedLine',
                        typeOptions: {
                            xAxis: coordsX.axis.index,
                            yAxis: coordsY.axis.index,
                            points: [
                                { x, y },
                                { x, y },
                                { x, y },
                                { x, y },
                                { x, y }
                            ]
                        }
                    }, navigation.annotationsOptions, navigation.bindings.crooked5.annotationsOptions);
                    return this.chart.addAnnotation(options);
                },
                /** @ignore-option */
                steps: [
                    updateNthPoint(1),
                    updateNthPoint(2),
                    updateNthPoint(3),
                    updateNthPoint(4)
                ]
            },
            /**
             * Elliott wave (three points) annotation bindings. Includes `start` and two
             * events in `steps` (for second and third points) array.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-elliott3", "start": function() {}, "steps": [function() {}, function() {}], "annotationsOptions": {}}
             */
            elliott3: {
                /** @ignore-option */
                className: 'highcharts-elliott3',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                start: function (e) {
                    const [coordsX, coordsY] = this.getCoords(e);
                    // Exit if clicked out of axes area
                    if (!coordsX || !coordsY) {
                        return;
                    }
                    const x = coordsX.value, y = coordsY.value, navigation = this.chart.options.navigation, options = merge({
                        langKey: 'elliott3',
                        type: 'elliottWave',
                        typeOptions: {
                            xAxis: coordsX.axis.index,
                            yAxis: coordsY.axis.index,
                            points: [
                                { x, y },
                                { x, y },
                                { x, y },
                                { x, y }
                            ]
                        },
                        labelOptions: {
                            style: {
                                color: "#666666" /* Palette.neutralColor60 */
                            }
                        }
                    }, navigation.annotationsOptions, navigation.bindings.elliott3.annotationsOptions);
                    return this.chart.addAnnotation(options);
                },
                /** @ignore-option */
                steps: [
                    updateNthPoint(1),
                    updateNthPoint(2),
                    updateNthPoint(3)
                ]
            },
            /**
             * Elliott wave (five points) annotation bindings. Includes `start` and four
             * event in `steps` (for all consequent points in Elliott wave) array.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-elliott3", "start": function() {}, "steps": [function() {}, function() {}, function() {}, function() {}], "annotationsOptions": {}}
             */
            elliott5: {
                /** @ignore-option */
                className: 'highcharts-elliott5',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                start: function (e) {
                    const [coordsX, coordsY] = this.getCoords(e);
                    // Exit if clicked out of axes area
                    if (!coordsX || !coordsY) {
                        return;
                    }
                    const x = coordsX.value, y = coordsY.value, navigation = this.chart.options.navigation, options = merge({
                        langKey: 'elliott5',
                        type: 'elliottWave',
                        typeOptions: {
                            xAxis: coordsX.axis.index,
                            yAxis: coordsY.axis.index,
                            points: [
                                { x, y },
                                { x, y },
                                { x, y },
                                { x, y },
                                { x, y },
                                { x, y }
                            ]
                        },
                        labelOptions: {
                            style: {
                                color: "#666666" /* Palette.neutralColor60 */
                            }
                        }
                    }, navigation.annotationsOptions, navigation.bindings.elliott5.annotationsOptions);
                    return this.chart.addAnnotation(options);
                },
                /** @ignore-option */
                steps: [
                    updateNthPoint(1),
                    updateNthPoint(2),
                    updateNthPoint(3),
                    updateNthPoint(4),
                    updateNthPoint(5)
                ]
            },
            /**
             * A measure (x-dimension) annotation bindings. Includes `start` and one
             * event in `steps` array.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-measure-x", "start": function() {}, "steps": [function() {}], "annotationsOptions": {}}
             */
            measureX: {
                /** @ignore-option */
                className: 'highcharts-measure-x',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                start: function (e) {
                    const [coordsX, coordsY] = this.getCoords(e);
                    // Exit if clicked out of axes area
                    if (!coordsX || !coordsY) {
                        return;
                    }
                    const x = coordsX.value, y = coordsY.value, navigation = this.chart.options.navigation, options = merge({
                        langKey: 'measure',
                        type: 'measure',
                        typeOptions: {
                            selectType: 'x',
                            xAxis: coordsX.axis.index,
                            yAxis: coordsY.axis.index,
                            point: { x, y },
                            crosshairX: {
                                strokeWidth: 1,
                                stroke: "#000000" /* Palette.neutralColor100 */
                            },
                            crosshairY: {
                                enabled: false,
                                strokeWidth: 0,
                                stroke: "#000000" /* Palette.neutralColor100 */
                            },
                            background: {
                                width: 0,
                                height: 0,
                                strokeWidth: 0,
                                stroke: "#ffffff" /* Palette.backgroundColor */
                            }
                        },
                        labelOptions: {
                            style: {
                                color: "#666666" /* Palette.neutralColor60 */
                            }
                        }
                    }, navigation.annotationsOptions, navigation.bindings.measureX.annotationsOptions);
                    return this.chart.addAnnotation(options);
                },
                /** @ignore-option */
                steps: [
                    updateRectSize
                ]
            },
            /**
             * A measure (y-dimension) annotation bindings. Includes `start` and one
             * event in `steps` array.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-measure-y", "start": function() {}, "steps": [function() {}], "annotationsOptions": {}}
             */
            measureY: {
                /** @ignore-option */
                className: 'highcharts-measure-y',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                start: function (e) {
                    const [coordsX, coordsY] = this.getCoords(e);
                    // Exit if clicked out of axes area
                    if (!coordsX || !coordsY) {
                        return;
                    }
                    const x = coordsX.value, y = coordsY.value, navigation = this.chart.options.navigation, options = merge({
                        langKey: 'measure',
                        type: 'measure',
                        typeOptions: {
                            selectType: 'y',
                            xAxis: coordsX.axis.index,
                            yAxis: coordsY.axis.index,
                            point: { x, y },
                            crosshairX: {
                                enabled: false,
                                strokeWidth: 0,
                                stroke: "#000000" /* Palette.neutralColor100 */
                            },
                            crosshairY: {
                                strokeWidth: 1,
                                stroke: "#000000" /* Palette.neutralColor100 */
                            },
                            background: {
                                width: 0,
                                height: 0,
                                strokeWidth: 0,
                                stroke: "#ffffff" /* Palette.backgroundColor */
                            }
                        },
                        labelOptions: {
                            style: {
                                color: "#666666" /* Palette.neutralColor60 */
                            }
                        }
                    }, navigation.annotationsOptions, navigation.bindings.measureY.annotationsOptions);
                    return this.chart.addAnnotation(options);
                },
                /** @ignore-option */
                steps: [
                    updateRectSize
                ]
            },
            /**
             * A measure (xy-dimension) annotation bindings. Includes `start` and one
             * event in `steps` array.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-measure-xy", "start": function() {}, "steps": [function() {}], "annotationsOptions": {}}
             */
            measureXY: {
                /** @ignore-option */
                className: 'highcharts-measure-xy',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                start: function (e) {
                    const [coordsX, coordsY] = this.getCoords(e);
                    // Exit if clicked out of axes area
                    if (!coordsX || !coordsY) {
                        return;
                    }
                    const x = coordsX.value, y = coordsY.value, navigation = this.chart.options.navigation, options = merge({
                        langKey: 'measure',
                        type: 'measure',
                        typeOptions: {
                            selectType: 'xy',
                            xAxis: coordsX.axis.index,
                            yAxis: coordsY.axis.index,
                            point: { x, y },
                            background: {
                                width: 0,
                                height: 0,
                                strokeWidth: 10
                            },
                            crosshairX: {
                                strokeWidth: 1,
                                stroke: "#000000" /* Palette.neutralColor100 */
                            },
                            crosshairY: {
                                strokeWidth: 1,
                                stroke: "#000000" /* Palette.neutralColor100 */
                            }
                        },
                        labelOptions: {
                            style: {
                                color: "#666666" /* Palette.neutralColor60 */
                            }
                        }
                    }, navigation.annotationsOptions, navigation.bindings.measureXY.annotationsOptions);
                    return this.chart.addAnnotation(options);
                },
                /** @ignore-option */
                steps: [
                    updateRectSize
                ]
            },
            // Advanced type annotations:
            /**
             * A fibonacci annotation bindings. Includes `start` and two events in
             * `steps` array (updates second point, then height).
             *
             *   @sample {highstock} stock/stocktools/custom-stock-tools-bindings
             *     Custom stock tools bindings
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-fibonacci", "start": function() {}, "steps": [function() {}, function() {}], "annotationsOptions": { "typeOptions": { "reversed": false }}}
             */
            fibonacci: {
                className: 'highcharts-fibonacci',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                start: function (e) {
                    const [coordsX, coordsY] = this.getCoords(e);
                    // Exit if clicked out of axes area
                    if (!coordsX || !coordsY) {
                        return;
                    }
                    const x = coordsX.value, y = coordsY.value, navigation = this.chart.options.navigation, options = merge({
                        langKey: 'fibonacci',
                        type: 'fibonacci',
                        typeOptions: {
                            xAxis: coordsX.axis.index,
                            yAxis: coordsY.axis.index,
                            points: [
                                { x, y },
                                { x, y }
                            ]
                        },
                        labelOptions: {
                            style: {
                                color: "#666666" /* Palette.neutralColor60 */
                            }
                        }
                    }, navigation.annotationsOptions, navigation.bindings.fibonacci.annotationsOptions);
                    return this.chart.addAnnotation(options);
                },
                /** @ignore-option */
                steps: [
                    updateNthPoint(1),
                    updateHeight
                ]
            },
            /**
             * A parallel channel (tunnel) annotation bindings. Includes `start` and
             * two events in `steps` array (updates second point, then height).
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-parallel-channel", "start": function() {}, "steps": [function() {}, function() {}], "annotationsOptions": {}}
             */
            parallelChannel: {
                /** @ignore-option */
                className: 'highcharts-parallel-channel',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                start: function (e) {
                    const [coordsX, coordsY] = this.getCoords(e);
                    // Exit if clicked out of axes area
                    if (!coordsX || !coordsY) {
                        return;
                    }
                    const x = coordsX.value, y = coordsY.value, navigation = this.chart.options.navigation, options = merge({
                        langKey: 'parallelChannel',
                        type: 'tunnel',
                        typeOptions: {
                            xAxis: coordsX.axis.index,
                            yAxis: coordsY.axis.index,
                            points: [
                                { x, y },
                                { x, y }
                            ]
                        }
                    }, navigation.annotationsOptions, navigation.bindings.parallelChannel
                        .annotationsOptions);
                    return this.chart.addAnnotation(options);
                },
                /** @ignore-option */
                steps: [
                    updateNthPoint(1),
                    updateHeight
                ]
            },
            /**
             * An Andrew's pitchfork annotation bindings. Includes `start` and two
             * events in `steps` array (sets second and third control points).
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-pitchfork", "start": function() {}, "steps": [function() {}, function() {}], "annotationsOptions": {}}
             */
            pitchfork: {
                /** @ignore-option */
                className: 'highcharts-pitchfork',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                start: function (e) {
                    const [coordsX, coordsY] = this.getCoords(e);
                    // Exit if clicked out of axes area
                    if (!coordsX || !coordsY) {
                        return;
                    }
                    const x = coordsX.value, y = coordsY.value, navigation = this.chart.options.navigation, options = merge({
                        langKey: 'pitchfork',
                        type: 'pitchfork',
                        typeOptions: {
                            xAxis: coordsX.axis.index,
                            yAxis: coordsY.axis.index,
                            points: [{
                                    x: coordsX.value,
                                    y: coordsY.value,
                                    controlPoint: {
                                        style: {
                                            fill: "#f21313" /* Palette.negativeColor */
                                        }
                                    }
                                },
                                { x, y },
                                { x, y }
                            ],
                            innerBackground: {
                                fill: 'rgba(100, 170, 255, 0.8)'
                            }
                        },
                        shapeOptions: {
                            strokeWidth: 2
                        }
                    }, navigation.annotationsOptions, navigation.bindings.pitchfork.annotationsOptions);
                    return this.chart.addAnnotation(options);
                },
                /** @ignore-option */
                steps: [
                    updateNthPoint(1),
                    updateNthPoint(2)
                ]
            },
            // Labels with arrow and auto increments
            /**
             * A vertical counter annotation bindings. Includes `start` event. On click,
             * finds the closest point and marks it with a numeric annotation -
             * incrementing counter on each add.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-vertical-counter", "start": function() {}, "annotationsOptions": {}}
             */
            verticalCounter: {
                /** @ignore-option */
                className: 'highcharts-vertical-counter',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                start: function (e) {
                    const closestPoint = attractToPoint(e, this.chart);
                    // Exit if clicked out of axes area
                    if (!closestPoint) {
                        return;
                    }
                    this.verticalCounter = this.verticalCounter || 0;
                    const navigation = this.chart.options.navigation, options = merge({
                        langKey: 'verticalCounter',
                        type: 'verticalLine',
                        typeOptions: {
                            point: {
                                x: closestPoint.x,
                                y: closestPoint.y,
                                xAxis: closestPoint.xAxis,
                                yAxis: closestPoint.yAxis
                            },
                            label: {
                                offset: closestPoint.below ? 40 : -40,
                                text: this.verticalCounter.toString()
                            }
                        },
                        labelOptions: {
                            style: {
                                color: "#666666" /* Palette.neutralColor60 */,
                                fontSize: '0.7em'
                            }
                        },
                        shapeOptions: {
                            stroke: 'rgba(0, 0, 0, 0.75)',
                            strokeWidth: 1
                        }
                    }, navigation.annotationsOptions, navigation.bindings
                        .verticalCounter.annotationsOptions), annotation = this.chart.addAnnotation(options);
                    this.verticalCounter++;
                    annotation.options.events.click.call(annotation, {});
                }
            },
            /**
             * A time cycles annotation bindings. Includes `start` event and 1 `step`
             * event. first click marks the beginning of the circle, and the second one
             * sets its diameter.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-time-cycles", "start": function() {}, "steps": [function (){}] "annotationsOptions": {}}
             */
            timeCycles: {
                className: 'highcharts-time-cycles',
                start: function (e) {
                    const closestPoint = attractToPoint(e, this.chart);
                    // Exit if clicked out of axes area
                    if (!closestPoint) {
                        return;
                    }
                    const navigation = this.chart.options.navigation, options = merge({
                        langKey: 'timeCycles',
                        type: 'timeCycles',
                        typeOptions: {
                            xAxis: closestPoint.xAxis,
                            yAxis: closestPoint.yAxis,
                            points: [{
                                    x: closestPoint.x
                                }, {
                                    x: closestPoint.x
                                }],
                            line: {
                                stroke: 'rgba(0, 0, 0, 0.75)',
                                fill: 'transparent',
                                strokeWidth: 2
                            }
                        }
                    }, navigation.annotationsOptions, navigation.bindings.timeCycles.annotationsOptions), annotation = this.chart.addAnnotation(options);
                    annotation.options.events.click.call(annotation, {});
                    return annotation;
                },
                steps: [
                    updateNthPoint(1)
                ]
            },
            verticalLabel: {
                /** @ignore-option */
                className: 'highcharts-vertical-label',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                start: function (e) {
                    const closestPoint = attractToPoint(e, this.chart);
                    // Exit if clicked out of axes area
                    if (!closestPoint) {
                        return;
                    }
                    const navigation = this.chart.options.navigation, options = merge({
                        langKey: 'verticalLabel',
                        type: 'verticalLine',
                        typeOptions: {
                            point: {
                                x: closestPoint.x,
                                y: closestPoint.y,
                                xAxis: closestPoint.xAxis,
                                yAxis: closestPoint.yAxis
                            },
                            label: {
                                offset: closestPoint.below ? 40 : -40
                            }
                        },
                        labelOptions: {
                            style: {
                                color: "#666666" /* Palette.neutralColor60 */,
                                fontSize: '0.7em'
                            }
                        },
                        shapeOptions: {
                            stroke: 'rgba(0, 0, 0, 0.75)',
                            strokeWidth: 1
                        }
                    }, navigation.annotationsOptions, navigation.bindings
                        .verticalLabel.annotationsOptions), annotation = this.chart.addAnnotation(options);
                    annotation.options.events.click.call(annotation, {});
                }
            },
            /**
             * A vertical arrow annotation bindings. Includes `start` event. On click,
             * finds the closest point and marks it with an arrow.
             * `#06b535` is the color of the arrow when
             * pointing from above and `#f21313`
             * when pointing from below the point.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-vertical-arrow", "start": function() {}, "annotationsOptions": {}}
             */
            verticalArrow: {
                /** @ignore-option */
                className: 'highcharts-vertical-arrow',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                start: function (e) {
                    const closestPoint = attractToPoint(e, this.chart);
                    // Exit if clicked out of axes area
                    if (!closestPoint) {
                        return;
                    }
                    const navigation = this.chart.options.navigation, options = merge({
                        langKey: 'verticalArrow',
                        type: 'verticalLine',
                        typeOptions: {
                            point: {
                                x: closestPoint.x,
                                y: closestPoint.y,
                                xAxis: closestPoint.xAxis,
                                yAxis: closestPoint.yAxis
                            },
                            label: {
                                offset: closestPoint.below ? 40 : -40,
                                format: ' '
                            },
                            connector: {
                                fill: 'none',
                                stroke: closestPoint.below ?
                                    "#f21313" /* Palette.negativeColor */ :
                                    "#06b535" /* Palette.positiveColor */
                            }
                        },
                        shapeOptions: {
                            stroke: 'rgba(0, 0, 0, 0.75)',
                            strokeWidth: 1
                        }
                    }, navigation.annotationsOptions, navigation.bindings
                        .verticalArrow.annotationsOptions), annotation = this.chart.addAnnotation(options);
                    annotation.options.events.click.call(annotation, {});
                }
            },
            /**
             * The Fibonacci Time Zones annotation bindings. Includes `start` and one
             * event in `steps` array.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-fibonacci-time-zones", "start": function() {}, "steps": [function() {}], "annotationsOptions": {}}
             */
            fibonacciTimeZones: {
                /** @ignore-option */
                className: 'highcharts-fibonacci-time-zones',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                start: function (e) {
                    const [coordsX, coordsY] = this.getCoords(e);
                    // Exit if clicked out of axes area
                    if (!coordsX || !coordsY) {
                        return;
                    }
                    const navigation = this.chart.options.navigation, options = merge({
                        type: 'fibonacciTimeZones',
                        langKey: 'fibonacciTimeZones',
                        typeOptions: {
                            xAxis: coordsX.axis.index,
                            yAxis: coordsY.axis.index,
                            points: [{
                                    x: coordsX.value
                                }]
                        }
                    }, navigation.annotationsOptions, navigation.bindings.fibonacciTimeZones
                        .annotationsOptions);
                    return this.chart.addAnnotation(options);
                },
                /** @ignore-option */
                // eslint-disable-next-line valid-jsdoc
                steps: [
                    function (e, annotation) {
                        const mockPointOpts = annotation.options.typeOptions.points, x = mockPointOpts && mockPointOpts[0].x, [coordsX, coordsY] = this.getCoords(e);
                        if (coordsX && coordsY) {
                            annotation.update({
                                typeOptions: {
                                    xAxis: coordsX.axis.index,
                                    yAxis: coordsY.axis.index,
                                    points: [{
                                            x: x
                                        }, {
                                            x: coordsX.value
                                        }]
                                }
                            });
                        }
                    }
                ]
            },
            // Flag types:
            /**
             * A flag series bindings. Includes `start` event. On click, finds the
             * closest point and marks it with a flag with `'circlepin'` shape.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-flag-circlepin", "start": function() {}}
             */
            flagCirclepin: {
                /** @ignore-option */
                className: 'highcharts-flag-circlepin',
                /** @ignore-option */
                start: addFlagFromForm('circlepin')
            },
            /**
             * A flag series bindings. Includes `start` event. On click, finds the
             * closest point and marks it with a flag with `'diamondpin'` shape.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-flag-diamondpin", "start": function() {}}
             */
            flagDiamondpin: {
                /** @ignore-option */
                className: 'highcharts-flag-diamondpin',
                /** @ignore-option */
                start: addFlagFromForm('flag')
            },
            /**
             * A flag series bindings. Includes `start` event.
             * On click, finds the closest point and marks it with a flag with
             * `'squarepin'` shape.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-flag-squarepin", "start": function() {}}
             */
            flagSquarepin: {
                /** @ignore-option */
                className: 'highcharts-flag-squarepin',
                /** @ignore-option */
                start: addFlagFromForm('squarepin')
            },
            /**
             * A flag series bindings. Includes `start` event.
             * On click, finds the closest point and marks it with a flag without pin
             * shape.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-flag-simplepin", "start": function() {}}
             */
            flagSimplepin: {
                /** @ignore-option */
                className: 'highcharts-flag-simplepin',
                /** @ignore-option */
                start: addFlagFromForm('nopin')
            },
            // Other tools:
            /**
             * Enables zooming in xAxis on a chart. Includes `start` event which
             * changes [chart.zoomType](#chart.zoomType).
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-zoom-x", "init": function() {}}
             */
            zoomX: {
                /** @ignore-option */
                className: 'highcharts-zoom-x',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                init: function (button) {
                    this.chart.update({
                        chart: {
                            zooming: {
                                type: 'x'
                            }
                        }
                    });
                    fireEvent(this, 'deselectButton', { button: button });
                }
            },
            /**
             * Enables zooming in yAxis on a chart. Includes `start` event which
             * changes [chart.zoomType](#chart.zoomType).
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-zoom-y", "init": function() {}}
             */
            zoomY: {
                /** @ignore-option */
                className: 'highcharts-zoom-y',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                init: function (button) {
                    this.chart.update({
                        chart: {
                            zooming: {
                                type: 'y'
                            }
                        }
                    });
                    fireEvent(this, 'deselectButton', { button: button });
                }
            },
            /**
             * Enables zooming in xAxis and yAxis on a chart. Includes `start` event
             * which changes [chart.zoomType](#chart.zoomType).
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-zoom-xy", "init": function() {}}
             */
            zoomXY: {
                /** @ignore-option */
                className: 'highcharts-zoom-xy',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                init: function (button) {
                    this.chart.update({
                        chart: {
                            zooming: {
                                type: 'xy'
                            }
                        }
                    });
                    fireEvent(this, 'deselectButton', { button: button });
                }
            },
            /**
             * Changes main series to `'line'` type.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-series-type-line", "init": function() {}}
             */
            seriesTypeLine: {
                /** @ignore-option */
                className: 'highcharts-series-type-line',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                init: function (button) {
                    this.chart.series[0].update({
                        type: 'line',
                        useOhlcData: true
                    });
                    fireEvent(this, 'deselectButton', { button: button });
                }
            },
            /**
             * Changes main series to `'ohlc'` type.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-series-type-ohlc", "init": function() {}}
             */
            seriesTypeOhlc: {
                /** @ignore-option */
                className: 'highcharts-series-type-ohlc',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                init: function (button) {
                    this.chart.series[0].update({
                        type: 'ohlc'
                    });
                    fireEvent(this, 'deselectButton', { button: button });
                }
            },
            /**
             * Changes main series to `'candlestick'` type.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-series-type-candlestick", "init": function() {}}
             */
            seriesTypeCandlestick: {
                /** @ignore-option */
                className: 'highcharts-series-type-candlestick',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                init: function (button) {
                    this.chart.series[0].update({
                        type: 'candlestick'
                    });
                    fireEvent(this, 'deselectButton', { button: button });
                }
            },
            /**
             * Changes main series to `'heikinashi'` type.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-series-type-heikinashi", "init": function() {}}
             */
            seriesTypeHeikinAshi: {
                /** @ignore-option */
                className: 'highcharts-series-type-heikinashi',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                init: function (button) {
                    this.chart.series[0].update({
                        type: 'heikinashi'
                    });
                    fireEvent(this, 'deselectButton', { button: button });
                }
            },
            /**
             * Change main series to `'hlc'` type.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-series-type-hlc", "init": function () {}}
             */
            seriesTypeHLC: {
                className: 'highcharts-series-type-hlc',
                init: function (button) {
                    this.chart.series[0].update({
                        type: 'hlc',
                        useOhlcData: true
                    });
                    fireEvent(this, 'deselectButton', { button });
                }
            },
            /**
             * Changes main series to `'hollowcandlestick'` type.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-series-type-hollowcandlestick", "init": function() {}}
             */
            seriesTypeHollowCandlestick: {
                /** @ignore-option */
                className: 'highcharts-series-type-hollowcandlestick',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                init: function (button) {
                    this.chart.series[0].update({
                        type: 'hollowcandlestick'
                    });
                    fireEvent(this, 'deselectButton', { button: button });
                }
            },
            /**
             * Displays chart in fullscreen.
             *
             * **Note**: Fullscreen is not supported on iPhone due to iOS limitations.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "noDataState": "normal", "highcharts-full-screen", "init": function() {}}
             */
            fullScreen: {
                /** @ignore-option */
                className: 'highcharts-full-screen',
                noDataState: 'normal',
                /** @ignore-option */
                init: function (button) {
                    if (this.chart.fullscreen) {
                        this.chart.fullscreen.toggle();
                    }
                    fireEvent(this, 'deselectButton', { button: button });
                }
            },
            /**
             * Hides/shows two price indicators:
             * - last price in the dataset
             * - last price in the selected range
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-current-price-indicator", "init": function() {}}
             */
            currentPriceIndicator: {
                /** @ignore-option */
                className: 'highcharts-current-price-indicator',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                init: function (button) {
                    const chart = this.chart, series = chart.series, gui = chart.stockTools, priceIndicatorEnabled = isPriceIndicatorEnabled(chart.series);
                    if (gui && gui.guiEnabled) {
                        series.forEach(function (series) {
                            series.update({
                                lastPrice: { enabled: !priceIndicatorEnabled },
                                lastVisiblePrice: {
                                    enabled: !priceIndicatorEnabled,
                                    label: { enabled: true }
                                }
                            }, false);
                        });
                        chart.redraw();
                    }
                    fireEvent(this, 'deselectButton', { button: button });
                }
            },
            /**
             * Indicators bindings. Includes `init` event to show a popup.
             *
             * Note: In order to show base series from the chart in the popup's
             * dropdown each series requires
             * [series.id](https://api.highcharts.com/highstock/series.line.id) to be
             * defined.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-indicators", "init": function() {}}
             */
            indicators: {
                /** @ignore-option */
                className: 'highcharts-indicators',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                init: function () {
                    const navigation = this;
                    fireEvent(navigation, 'showPopup', {
                        formType: 'indicators',
                        options: {},
                        // Callback on submit:
                        onSubmit: function (data) {
                            manageIndicators.call(navigation, data);
                        }
                    });
                }
            },
            /**
             * Hides/shows all annotations on a chart.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-toggle-annotations", "init": function() {}}
             */
            toggleAnnotations: {
                /** @ignore-option */
                className: 'highcharts-toggle-annotations',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                init: function (button) {
                    const chart = this.chart, gui = chart.stockTools, iconsURL = gui.getIconsURL();
                    this.toggledAnnotations = !this.toggledAnnotations;
                    (chart.annotations || []).forEach(function (annotation) {
                        annotation.setVisibility(!this.toggledAnnotations);
                    }, this);
                    if (gui && gui.guiEnabled) {
                        if (this.toggledAnnotations) {
                            button.firstChild.style['background-image'] =
                                'url("' + iconsURL +
                                    'annotations-hidden.svg")';
                        }
                        else {
                            button.firstChild.style['background-image'] =
                                'url("' + iconsURL +
                                    'annotations-visible.svg")';
                        }
                    }
                    fireEvent(this, 'deselectButton', { button: button });
                }
            },
            /**
             * Save a chart in localStorage under `highcharts-chart` key.
             * Stored items:
             * - annotations
             * - indicators (with yAxes)
             * - flags
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-save-chart", "noDataState": "normal", "init": function() {}}
             */
            saveChart: {
                /** @ignore-option */
                className: 'highcharts-save-chart',
                noDataState: 'normal',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                init: function (button) {
                    const navigation = this, chart = navigation.chart, annotations = [], indicators = [], flags = [], yAxes = [];
                    chart.annotations.forEach(function (annotation, index) {
                        annotations[index] = annotation.userOptions;
                    });
                    chart.series.forEach(function (series) {
                        if (series.is('sma')) {
                            indicators.push(series.userOptions);
                        }
                        else if (series.type === 'flags') {
                            flags.push(series.userOptions);
                        }
                    });
                    chart.yAxis.forEach(function (yAxis) {
                        if (isNotNavigatorYAxis(yAxis)) {
                            yAxes.push(yAxis.options);
                        }
                    });
                    H.win.localStorage.setItem('highcharts-chart', JSON.stringify({
                        annotations: annotations,
                        indicators: indicators,
                        flags: flags,
                        yAxes: yAxes
                    }));
                    fireEvent(this, 'deselectButton', { button: button });
                }
            }
        };
        /* *
         *
         *  Default Export
         *
         * */

        return StockToolsBindings;
    });
    _registerModule(_modules, 'Stock/StockTools/StockToolsDefaults.js', [], function () {
        /* *
         *
         *  GUI generator for Stock tools
         *
         *  (c) 2009-2024 Sebastian Bochan
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /* *
         *
         *  Constants
         *
         * */
        /**
         * @optionparent lang
         */
        const lang = {
            /**
             * Configure the stockTools GUI titles(hints) in the chart. Requires
             * the `stock-tools.js` module to be loaded.
             *
             * @product highstock
             * @since   7.0.0
             */
            stockTools: {
                gui: {
                    // Main buttons:
                    simpleShapes: 'Simple shapes',
                    lines: 'Lines',
                    crookedLines: 'Crooked lines',
                    measure: 'Measure',
                    advanced: 'Advanced',
                    toggleAnnotations: 'Toggle annotations',
                    verticalLabels: 'Vertical labels',
                    flags: 'Flags',
                    zoomChange: 'Zoom change',
                    typeChange: 'Type change',
                    saveChart: 'Save chart',
                    indicators: 'Indicators',
                    currentPriceIndicator: 'Current Price Indicators',
                    // Other features:
                    zoomX: 'Zoom X',
                    zoomY: 'Zoom Y',
                    zoomXY: 'Zooom XY',
                    fullScreen: 'Fullscreen',
                    typeOHLC: 'OHLC',
                    typeLine: 'Line',
                    typeCandlestick: 'Candlestick',
                    typeHLC: 'HLC',
                    typeHollowCandlestick: 'Hollow Candlestick',
                    typeHeikinAshi: 'Heikin Ashi',
                    // Basic shapes:
                    circle: 'Circle',
                    ellipse: 'Ellipse',
                    label: 'Label',
                    rectangle: 'Rectangle',
                    // Flags:
                    flagCirclepin: 'Flag circle',
                    flagDiamondpin: 'Flag diamond',
                    flagSquarepin: 'Flag square',
                    flagSimplepin: 'Flag simple',
                    // Measures:
                    measureXY: 'Measure XY',
                    measureX: 'Measure X',
                    measureY: 'Measure Y',
                    // Segment, ray and line:
                    segment: 'Segment',
                    arrowSegment: 'Arrow segment',
                    ray: 'Ray',
                    arrowRay: 'Arrow ray',
                    line: 'Line',
                    arrowInfinityLine: 'Arrow line',
                    horizontalLine: 'Horizontal line',
                    verticalLine: 'Vertical line',
                    infinityLine: 'Infinity line',
                    // Crooked lines:
                    crooked3: 'Crooked 3 line',
                    crooked5: 'Crooked 5 line',
                    elliott3: 'Elliott 3 line',
                    elliott5: 'Elliott 5 line',
                    // Counters:
                    verticalCounter: 'Vertical counter',
                    verticalLabel: 'Vertical label',
                    verticalArrow: 'Vertical arrow',
                    // Advanced:
                    fibonacci: 'Fibonacci',
                    fibonacciTimeZones: 'Fibonacci Time Zones',
                    pitchfork: 'Pitchfork',
                    parallelChannel: 'Parallel channel',
                    timeCycles: 'Time Cycles'
                }
            },
            navigation: {
                popup: {
                    // Annotations:
                    circle: 'Circle',
                    ellipse: 'Ellipse',
                    rectangle: 'Rectangle',
                    label: 'Label',
                    segment: 'Segment',
                    arrowSegment: 'Arrow segment',
                    ray: 'Ray',
                    arrowRay: 'Arrow ray',
                    line: 'Line',
                    arrowInfinityLine: 'Arrow line',
                    horizontalLine: 'Horizontal line',
                    verticalLine: 'Vertical line',
                    crooked3: 'Crooked 3 line',
                    crooked5: 'Crooked 5 line',
                    elliott3: 'Elliott 3 line',
                    elliott5: 'Elliott 5 line',
                    verticalCounter: 'Vertical counter',
                    verticalLabel: 'Vertical label',
                    verticalArrow: 'Vertical arrow',
                    fibonacci: 'Fibonacci',
                    fibonacciTimeZones: 'Fibonacci Time Zones',
                    pitchfork: 'Pitchfork',
                    parallelChannel: 'Parallel channel',
                    infinityLine: 'Infinity line',
                    measure: 'Measure',
                    measureXY: 'Measure XY',
                    measureX: 'Measure X',
                    measureY: 'Measure Y',
                    timeCycles: 'Time Cycles',
                    // Flags:
                    flags: 'Flags',
                    // GUI elements:
                    addButton: 'Add',
                    saveButton: 'Save',
                    editButton: 'Edit',
                    removeButton: 'Remove',
                    series: 'Series',
                    volume: 'Volume',
                    connector: 'Connector',
                    // Field names:
                    innerBackground: 'Inner background',
                    outerBackground: 'Outer background',
                    crosshairX: 'Crosshair X',
                    crosshairY: 'Crosshair Y',
                    tunnel: 'Tunnel',
                    background: 'Background',
                    // Indicators' searchbox (#16019):
                    noFilterMatch: 'No match',
                    // Indicators' params (#15170):
                    searchIndicators: 'Search Indicators',
                    clearFilter: '\u2715 clear filter',
                    index: 'Index',
                    period: 'Period',
                    periods: 'Periods',
                    standardDeviation: 'Standard deviation',
                    periodTenkan: 'Tenkan period',
                    periodSenkouSpanB: 'Senkou Span B period',
                    periodATR: 'ATR period',
                    multiplierATR: 'ATR multiplier',
                    shortPeriod: 'Short period',
                    longPeriod: 'Long period',
                    signalPeriod: 'Signal period',
                    decimals: 'Decimals',
                    algorithm: 'Algorithm',
                    topBand: 'Top band',
                    bottomBand: 'Bottom band',
                    initialAccelerationFactor: 'Initial acceleration factor',
                    maxAccelerationFactor: 'Max acceleration factor',
                    increment: 'Increment',
                    multiplier: 'Multiplier',
                    ranges: 'Ranges',
                    highIndex: 'High index',
                    lowIndex: 'Low index',
                    deviation: 'Deviation',
                    xAxisUnit: 'x-axis unit',
                    factor: 'Factor',
                    fastAvgPeriod: 'Fast average period',
                    slowAvgPeriod: 'Slow average period',
                    average: 'Average',
                    /**
                     * Configure the aliases for indicator names.
                     *
                     * @product highstock
                     * @since 9.3.0
                     */
                    indicatorAliases: {
                        // Overlays
                        /**
                         * Acceleration Bands alias.
                         *
                         * @default ['Acceleration Bands']
                         * @type    {Array<string>}
                         */
                        abands: ['Acceleration Bands'],
                        /**
                         * Bollinger Bands alias.
                         *
                         * @default ['Bollinger Bands']
                         * @type    {Array<string>}
                         */
                        bb: ['Bollinger Bands'],
                        /**
                         * Double Exponential Moving Average alias.
                         *
                         * @default ['Double Exponential Moving Average']
                         * @type    {Array<string>}
                         */
                        dema: ['Double Exponential Moving Average'],
                        /**
                         *  Exponential Moving Average alias.
                         *
                         * @default ['Exponential Moving Average']
                         * @type    {Array<string>}
                         */
                        ema: ['Exponential Moving Average'],
                        /**
                         *  Ichimoku Kinko Hyo alias.
                         *
                         * @default ['Ichimoku Kinko Hyo']
                         * @type    {Array<string>}
                         */
                        ikh: ['Ichimoku Kinko Hyo'],
                        /**
                         *  Keltner Channels alias.
                         *
                         * @default ['Keltner Channels']
                         * @type    {Array<string>}
                         */
                        keltnerchannels: ['Keltner Channels'],
                        /**
                         *  Linear Regression alias.
                         *
                         * @default ['Linear Regression']
                         * @type    {Array<string>}
                         */
                        linearRegression: ['Linear Regression'],
                        /**
                         *  Pivot Points alias.
                         *
                         * @default ['Pivot Points']
                         * @type    {Array<string>}
                         */
                        pivotpoints: ['Pivot Points'],
                        /**
                         *  Price Channel alias.
                         *
                         * @default ['Price Channel']
                         * @type    {Array<string>}
                         */
                        pc: ['Price Channel'],
                        /**
                         *  Price Envelopes alias.
                         *
                         * @default ['Price Envelopes']
                         * @type    {Array<string>}
                         */
                        priceenvelopes: ['Price Envelopes'],
                        /**
                         *  Parabolic SAR alias.
                         *
                         * @default ['Parabolic SAR']
                         * @type    {Array<string>}
                         */
                        psar: ['Parabolic SAR'],
                        /**
                         *  Simple Moving Average alias.
                         *
                         * @default ['Simple Moving Average']
                         * @type    {Array<string>}
                         */
                        sma: ['Simple Moving Average'],
                        /**
                         *  Super Trend alias.
                         *
                         * @default ['Super Trend']
                         * @type    {Array<string>}
                         */
                        supertrend: ['Super Trend'],
                        /**
                         *  Triple Exponential Moving Average alias.
                         *
                         * @default ['Triple Exponential Moving Average']
                         * @type    {Array<string>}
                         */
                        tema: ['Triple Exponential Moving Average'],
                        /**
                         *  Volume by Price alias.
                         *
                         * @default ['Volume by Price']
                         * @type    {Array<string>}
                         */
                        vbp: ['Volume by Price'],
                        /**
                         *  Volume Weighted Moving Average alias.
                         *
                         * @default ['Volume Weighted Moving Average']
                         * @type    {Array<string>}
                         */
                        vwap: ['Volume Weighted Moving Average'],
                        /**
                         *  Weighted Moving Average alias.
                         *
                         * @default ['Weighted Moving Average']
                         * @type    {Array<string>}
                         */
                        wma: ['Weighted Moving Average'],
                        /**
                         *  Zig Zagalias.
                         *
                         * @default ['Zig Zag']
                         * @type    {Array<string>}
                         */
                        zigzag: ['Zig Zag'],
                        // Oscilators
                        /**
                         *  Absolute price indicator alias.
                         *
                         * @default ['Absolute price indicator']
                         * @type    {Array<string>}
                         */
                        apo: ['Absolute price indicator'],
                        /**
                         * Accumulation/Distribution alias.
                         *
                         * @default ['Accumulation/Distribution’]
                         * @type    {Array<string>}
                         */
                        ad: ['Accumulation/Distribution'],
                        /**
                         *  Aroon alias.
                         *
                         * @default ['Aroon']
                         * @type    {Array<string>}
                         */
                        aroon: ['Aroon'],
                        /**
                         *  Aroon oscillator alias.
                         *
                         * @default ['Aroon oscillator']
                         * @type    {Array<string>}
                         */
                        aroonoscillator: ['Aroon oscillator'],
                        /**
                         *  Average True Range alias.
                         *
                         * @default ['Average True Range’]
                         * @type    {Array<string>}
                         */
                        atr: ['Average True Range'],
                        /**
                         *  Awesome oscillator alias.
                         *
                         * @default ['Awesome oscillator’]
                         * @type    {Array<string>}
                         */
                        ao: ['Awesome oscillator'],
                        /**
                         *  Commodity Channel Index alias.
                         *
                         * @default ['Commodity Channel Index’]
                         * @type    {Array<string>}
                         */
                        cci: ['Commodity Channel Index'],
                        /**
                         *  Chaikin alias.
                         *
                         * @default ['Chaikin’]
                         * @type    {Array<string>}
                         */
                        chaikin: ['Chaikin'],
                        /**
                         *  Chaikin Money Flow alias.
                         *
                         * @default ['Chaikin Money Flow’]
                         * @type    {Array<string>}
                         */
                        cmf: ['Chaikin Money Flow'],
                        /**
                         *  Chande Momentum Oscillator alias.
                         *
                         * @default ['Chande Momentum Oscillator’]
                         * @type    {Array<string>}
                         */
                        cmo: ['Chande Momentum Oscillator'],
                        /**
                         *  Disparity Index alias.
                         *
                         * @default ['Disparity Index’]
                         * @type    {Array<string>}
                         */
                        disparityindex: ['Disparity Index'],
                        /**
                         *  Directional Movement Index alias.
                         *
                         * @default ['Directional Movement Index’]
                         * @type    {Array<string>}
                         */
                        dmi: ['Directional Movement Index'],
                        /**
                         *  Detrended price oscillator alias.
                         *
                         * @default ['Detrended price oscillator’]
                         * @type    {Array<string>}
                         */
                        dpo: ['Detrended price oscillator'],
                        /**
                         *  Klinger Oscillator alias.
                         *
                         * @default [‘Klinger Oscillator’]
                         * @type    {Array<string>}
                         */
                        klinger: ['Klinger Oscillator'],
                        /**
                         *  Linear Regression Angle alias.
                         *
                         * @default [‘Linear Regression Angle’]
                         * @type    {Array<string>}
                         */
                        linearRegressionAngle: ['Linear Regression Angle'],
                        /**
                         *  Linear Regression Intercept alias.
                         *
                         * @default [‘Linear Regression Intercept’]
                         * @type    {Array<string>}
                         */
                        linearRegressionIntercept: ['Linear Regression Intercept'],
                        /**
                         *  Linear Regression Slope alias.
                         *
                         * @default [‘Linear Regression Slope’]
                         * @type    {Array<string>}
                         */
                        linearRegressionSlope: ['Linear Regression Slope'],
                        /**
                         *  Moving Average Convergence Divergence alias.
                         *
                         * @default ['Moving Average Convergence Divergence’]
                         * @type    {Array<string>}
                         */
                        macd: ['Moving Average Convergence Divergence'],
                        /**
                         *  Money Flow Index alias.
                         *
                         * @default ['Money Flow Index’]
                         * @type    {Array<string>}
                         */
                        mfi: ['Money Flow Index'],
                        /**
                         *  Momentum alias.
                         *
                         * @default [‘Momentum’]
                         * @type    {Array<string>}
                         */
                        momentum: ['Momentum'],
                        /**
                         *  Normalized Average True Range alias.
                         *
                         * @default ['Normalized Average True Range’]
                         * @type    {Array<string>}
                         */
                        natr: ['Normalized Average True Range'],
                        /**
                         *  On-Balance Volume alias.
                         *
                         * @default ['On-Balance Volume’]
                         * @type    {Array<string>}
                         */
                        obv: ['On-Balance Volume'],
                        /**
                         * Percentage Price oscillator alias.
                         *
                         * @default ['Percentage Price oscillator’]
                         * @type    {Array<string>}
                         */
                        ppo: ['Percentage Price oscillator'],
                        /**
                         *  Rate of Change alias.
                         *
                         * @default ['Rate of Change’]
                         * @type    {Array<string>}
                         */
                        roc: ['Rate of Change'],
                        /**
                         *  Relative Strength Index alias.
                         *
                         * @default ['Relative Strength Index’]
                         * @type    {Array<string>}
                         */
                        rsi: ['Relative Strength Index'],
                        /**
                         *  Slow Stochastic alias.
                         *
                         * @default [‘Slow Stochastic’]
                         * @type    {Array<string>}
                         */
                        slowstochastic: ['Slow Stochastic'],
                        /**
                         *  Stochastic alias.
                         *
                         * @default [‘Stochastic’]
                         * @type    {Array<string>}
                         */
                        stochastic: ['Stochastic'],
                        /**
                         *  TRIX alias.
                         *
                         * @default [‘TRIX’]
                         * @type    {Array<string>}
                         */
                        trix: ['TRIX'],
                        /**
                         *  Williams %R alias.
                         *
                         * @default [‘Williams %R’]
                         * @type    {Array<string>}
                         */
                        williamsr: ['Williams %R']
                    }
                }
            }
        };
        /**
         * Configure the stockTools gui strings in the chart. Requires the
         * [stockTools module]() to be loaded. For a description of the module
         * and information on its features, see [Highcharts StockTools]().
         *
         * @product highstock
         *
         * @sample stock/demo/stock-tools-gui Stock Tools GUI
         *
         * @sample stock/demo/stock-tools-custom-gui Stock Tools customized GUI
         *
         * @since        7.0.0
         * @optionparent stockTools
         */
        const stockTools = {
            /**
             * Definitions of buttons in Stock Tools GUI.
             */
            gui: {
                /**
                 * Path where Highcharts will look for icons. Change this to use
                 * icons from a different server.
                 *
                 * Since 7.1.3 use [iconsURL](#navigation.iconsURL) for popup and
                 * stock tools.
                 *
                 * @deprecated
                 * @apioption stockTools.gui.iconsURL
                 *
                 */
                /**
                 * Enable or disable the stockTools gui.
                 */
                enabled: true,
                /**
                 * A CSS class name to apply to the stocktools' div,
                 * allowing unique CSS styling for each chart.
                 */
                className: 'highcharts-bindings-wrapper',
                /**
                 * A CSS class name to apply to the container of buttons,
                 * allowing unique CSS styling for each chart.
                 */
                toolbarClassName: 'stocktools-toolbar',
                /**
                 * A collection of strings pointing to config options for the
                 * toolbar items. Each name refers to a unique key from the
                 * definitions object.
                 *
                 * @type    {Array<string>}
                 * @default [
                 *   'indicators',
                 *   'separator',
                 *   'simpleShapes',
                 *   'lines',
                 *   'crookedLines',
                 *   'measure',
                 *   'advanced',
                 *   'toggleAnnotations',
                 *   'separator',
                 *   'verticalLabels',
                 *   'flags',
                 *   'separator',
                 *   'zoomChange',
                 *   'fullScreen',
                 *   'typeChange',
                 *   'separator',
                 *   'currentPriceIndicator',
                 *   'saveChart'
                 * ]
                 */
                buttons: [
                    'indicators',
                    'separator',
                    'simpleShapes',
                    'lines',
                    'crookedLines',
                    'measure',
                    'advanced',
                    'toggleAnnotations',
                    'separator',
                    'verticalLabels',
                    'flags',
                    'separator',
                    'zoomChange',
                    'fullScreen',
                    'typeChange',
                    'separator',
                    'currentPriceIndicator',
                    'saveChart'
                ],
                /**
                 * An options object of the buttons definitions. Each name refers to
                 * unique key from buttons array.
                 */
                definitions: {
                    separator: {
                        elementType: 'span',
                        /**
                         * A predefined background symbol for the button.
                         */
                        symbol: 'separator.svg'
                    },
                    simpleShapes: {
                        /**
                         * A collection of strings pointing to config options for
                         * the items.
                         *
                         * @type {Array}
                         * @default [
                         *   'label',
                         *   'circle',
                         *   'ellipse',
                         *   'rectangle'
                         * ]
                         *
                         */
                        items: [
                            'label',
                            'circle',
                            'ellipse',
                            'rectangle'
                        ],
                        circle: {
                            /**
                             * A predefined background symbol for the button.
                             *
                             * @type   {string}
                             *
                             */
                            symbol: 'circle.svg'
                        },
                        ellipse: {
                            /**
                             * A predefined background symbol for the button.
                             *
                             * @type   {string}
                             *
                             */
                            symbol: 'ellipse.svg'
                        },
                        rectangle: {
                            /**
                             * A predefined background symbol for the button.
                             *
                             * @type   {string}
                             *
                             */
                            symbol: 'rectangle.svg'
                        },
                        label: {
                            /**
                             * A predefined background symbol for the button.
                             *
                             * @type   {string}
                             *
                             */
                            symbol: 'label.svg'
                        }
                    },
                    flags: {
                        /**
                         * A collection of strings pointing to config options for
                         * the items.
                         *
                         * @type {Array}
                         * @default [
                         *   'flagCirclepin',
                         *   'flagDiamondpin',
                         *   'flagSquarepin',
                         *   'flagSimplepin'
                         * ]
                         *
                         */
                        items: [
                            'flagCirclepin',
                            'flagDiamondpin',
                            'flagSquarepin',
                            'flagSimplepin'
                        ],
                        flagSimplepin: {
                            /**
                             * A predefined background symbol for the button.
                             *
                             * @type   {string}
                             *
                             */
                            symbol: 'flag-basic.svg'
                        },
                        flagDiamondpin: {
                            /**
                             * A predefined background symbol for the button.
                             *
                             * @type   {string}
                             *
                             */
                            symbol: 'flag-diamond.svg'
                        },
                        flagSquarepin: {
                            /**
                             * A predefined background symbol for the button.
                             *
                             * @type   {string}
                             */
                            symbol: 'flag-trapeze.svg'
                        },
                        flagCirclepin: {
                            /**
                             * A predefined background symbol for the button.
                             *
                             * @type   {string}
                             */
                            symbol: 'flag-elipse.svg'
                        }
                    },
                    lines: {
                        /**
                         * A collection of strings pointing to config options for
                         * the items.
                         *
                         * @type {Array}
                         * @default [
                         *   'segment',
                         *   'arrowSegment',
                         *   'ray',
                         *   'arrowRay',
                         *   'line',
                         *   'arrowInfinityLine',
                         *   'horizontalLine',
                         *   'verticalLine'
                         * ]
                         */
                        items: [
                            'segment',
                            'arrowSegment',
                            'ray',
                            'arrowRay',
                            'line',
                            'arrowInfinityLine',
                            'horizontalLine',
                            'verticalLine'
                        ],
                        segment: {
                            /**
                             * A predefined background symbol for the button.
                             *
                             * @type   {string}
                             */
                            symbol: 'segment.svg'
                        },
                        arrowSegment: {
                            /**
                             * A predefined background symbol for the button.
                             *
                             * @type   {string}
                             */
                            symbol: 'arrow-segment.svg'
                        },
                        ray: {
                            /**
                             * A predefined background symbol for the button.
                             *
                             * @type   {string}
                             */
                            symbol: 'ray.svg'
                        },
                        arrowRay: {
                            /**
                             * A predefined background symbol for the button.
                             *
                             * @type   {string}
                             */
                            symbol: 'arrow-ray.svg'
                        },
                        line: {
                            /**
                             * A predefined background symbol for the button.
                             *
                             * @type   {string}
                             */
                            symbol: 'line.svg'
                        },
                        arrowInfinityLine: {
                            /**
                             * A predefined background symbol for the button.
                             *
                             * @type   {string}
                             */
                            symbol: 'arrow-line.svg'
                        },
                        verticalLine: {
                            /**
                             * A predefined background symbol for the button.
                             *
                             * @type   {string}
                             */
                            symbol: 'vertical-line.svg'
                        },
                        horizontalLine: {
                            /**
                             * A predefined background symbol for the button.
                             *
                             * @type   {string}
                             */
                            symbol: 'horizontal-line.svg'
                        }
                    },
                    crookedLines: {
                        /**
                         * A collection of strings pointing to config options for
                         * the items.
                         *
                         * @type {Array}
                         * @default [
                         *   'elliott3',
                         *   'elliott5',
                         *   'crooked3',
                         *   'crooked5'
                         * ]
                         *
                         */
                        items: [
                            'elliott3',
                            'elliott5',
                            'crooked3',
                            'crooked5'
                        ],
                        crooked3: {
                            /**
                             * A predefined background symbol for the button.
                             *
                             * @type   {string}
                             */
                            symbol: 'crooked-3.svg'
                        },
                        crooked5: {
                            /**
                             * A predefined background symbol for the button.
                             *
                             * @type   {string}
                             */
                            symbol: 'crooked-5.svg'
                        },
                        elliott3: {
                            /**
                             * A predefined background symbol for the button.
                             *
                             * @type   {string}
                             */
                            symbol: 'elliott-3.svg'
                        },
                        elliott5: {
                            /**
                             * A predefined background symbol for the button.
                             *
                             * @type   {string}
                             */
                            symbol: 'elliott-5.svg'
                        }
                    },
                    verticalLabels: {
                        /**
                         * A collection of strings pointing to config options for
                         * the items.
                         *
                         * @type {Array}
                         * @default [
                         *   'verticalCounter',
                         *   'verticalLabel',
                         *   'verticalArrow'
                         * ]
                         */
                        items: [
                            'verticalCounter',
                            'verticalLabel',
                            'verticalArrow'
                        ],
                        verticalCounter: {
                            /**
                             * A predefined background symbol for the button.
                             *
                             * @type   {string}
                             */
                            symbol: 'vertical-counter.svg'
                        },
                        verticalLabel: {
                            /**
                             * A predefined background symbol for the button.
                             *
                             * @type   {string}
                             */
                            symbol: 'vertical-label.svg'
                        },
                        verticalArrow: {
                            /**
                             * A predefined background symbol for the button.
                             *
                             * @type   {string}
                             */
                            symbol: 'vertical-arrow.svg'
                        }
                    },
                    advanced: {
                        /**
                         * A collection of strings pointing to config options for
                         * the items.
                         *
                         * @type {Array}
                         * @default [
                         *   'fibonacci',
                         *   'fibonacciTimeZones',
                         *   'pitchfork',
                         *   'parallelChannel',
                         *   'timeCycles'
                         * ]
                         */
                        items: [
                            'fibonacci',
                            'fibonacciTimeZones',
                            'pitchfork',
                            'parallelChannel',
                            'timeCycles'
                        ],
                        pitchfork: {
                            /**
                             * A predefined background symbol for the button.
                             *
                             * @type   {string}
                             */
                            symbol: 'pitchfork.svg'
                        },
                        fibonacci: {
                            /**
                             * A predefined background symbol for the button.
                             *
                             * @type   {string}
                             */
                            symbol: 'fibonacci.svg'
                        },
                        fibonacciTimeZones: {
                            /**
                             * A predefined background symbol for the button.
                             *
                             * @type   {string}
                             */
                            symbol: 'fibonacci-timezone.svg'
                        },
                        parallelChannel: {
                            /**
                             * A predefined background symbol for the button.
                             *
                             * @type   {string}
                             */
                            symbol: 'parallel-channel.svg'
                        },
                        timeCycles: {
                            /**
                             * A predefined background symbol for the button.
                             *
                             * @type {string}
                             */
                            symbol: 'time-cycles.svg'
                        }
                    },
                    measure: {
                        /**
                         * A collection of strings pointing to config options for
                         * the items.
                         *
                         * @type {Array}
                         * @default [
                         *   'measureXY',
                         *   'measureX',
                         *   'measureY'
                         * ]
                         */
                        items: [
                            'measureXY',
                            'measureX',
                            'measureY'
                        ],
                        measureX: {
                            /**
                             * A predefined background symbol for the button.
                             *
                             * @type   {string}
                             */
                            symbol: 'measure-x.svg'
                        },
                        measureY: {
                            /**
                             * A predefined background symbol for the button.
                             *
                             * @type   {string}
                             */
                            symbol: 'measure-y.svg'
                        },
                        measureXY: {
                            /**
                             * A predefined background symbol for the button.
                             *
                             * @type   {string}
                             */
                            symbol: 'measure-xy.svg'
                        }
                    },
                    toggleAnnotations: {
                        /**
                         * A predefined background symbol for the button.
                         *
                         * @type   {string}
                         */
                        symbol: 'annotations-visible.svg'
                    },
                    currentPriceIndicator: {
                        /**
                         * A predefined background symbol for the button.
                         *
                         * @type   {string}
                         */
                        symbol: 'current-price-show.svg'
                    },
                    indicators: {
                        /**
                         * A predefined background symbol for the button.
                         *
                         * @type   {string}
                         */
                        symbol: 'indicators.svg'
                    },
                    zoomChange: {
                        /**
                         * A collection of strings pointing to config options for
                         * the items.
                         *
                         * @type {Array}
                         * @default [
                         *   'zoomX',
                         *   'zoomY',
                         *   'zoomXY'
                         * ]
                         */
                        items: [
                            'zoomX',
                            'zoomY',
                            'zoomXY'
                        ],
                        zoomX: {
                            /**
                             * A predefined background symbol for the button.
                             *
                             * @type   {string}
                             */
                            symbol: 'zoom-x.svg'
                        },
                        zoomY: {
                            /**
                             * A predefined background symbol for the button.
                             *
                             * @type   {string}
                             */
                            symbol: 'zoom-y.svg'
                        },
                        zoomXY: {
                            /**
                             * A predefined background symbol for the button.
                             *
                             * @type   {string}
                             */
                            symbol: 'zoom-xy.svg'
                        }
                    },
                    typeChange: {
                        /**
                         * A collection of strings pointing to config options for
                         * the items.
                         *
                         * @type {Array}
                         * @default [
                         *   'typeOHLC',
                         *   'typeLine',
                         *   'typeCandlestick'
                         *   'typeHollowCandlestick'
                         * ]
                         */
                        items: [
                            'typeOHLC',
                            'typeLine',
                            'typeCandlestick',
                            'typeHollowCandlestick',
                            'typeHLC',
                            'typeHeikinAshi'
                        ],
                        typeOHLC: {
                            /**
                             * A predefined background symbol for the button.
                             *
                             * @type   {string}
                             */
                            symbol: 'series-ohlc.svg'
                        },
                        typeLine: {
                            /**
                             * A predefined background symbol for the button.
                             *
                             * @type   {string}
                             */
                            symbol: 'series-line.svg'
                        },
                        typeCandlestick: {
                            /**
                             * A predefined background symbol for the button.
                             *
                             * @type   {string}
                             */
                            symbol: 'series-candlestick.svg'
                        },
                        typeHLC: {
                            /**
                             * A predefined background symbol for the button.
                             *
                             * @type   {string}
                             */
                            symbol: 'series-hlc.svg'
                        },
                        typeHeikinAshi: {
                            /**
                             * A predefined background symbol for the button.
                             *
                             * @type   {string}
                             */
                            symbol: 'series-heikin-ashi.svg'
                        },
                        typeHollowCandlestick: {
                            /**
                             * A predefined background symbol for the button.
                             *
                             * @type   {string}
                             */
                            symbol: 'series-hollow-candlestick.svg'
                        }
                    },
                    fullScreen: {
                        /**
                         * A predefined background symbol for the button.
                         *
                         * @type   {string}
                         */
                        symbol: 'fullscreen.svg'
                    },
                    saveChart: {
                        /**
                         * A predefined background symbol for the button.
                         *
                         * @type   {string}
                         */
                        symbol: 'save-chart.svg'
                    }
                },
                /**
                 * Whether the stock tools toolbar is visible.
                 *
                 * @since 11.4.4
                 */
                visible: true
            }
        };
        /* *
         *
         *  Default Exports
         *
         * */
        const StockToolsDefaults = {
            lang,
            stockTools
        };

        return StockToolsDefaults;
    });
    _registerModule(_modules, 'Stock/StockTools/StockTools.js', [_modules['Core/Defaults.js'], _modules['Extensions/Annotations/NavigationBindingsUtilities.js'], _modules['Stock/StockTools/StockToolsBindings.js'], _modules['Stock/StockTools/StockToolsDefaults.js'], _modules['Stock/StockTools/StockToolsUtilities.js'], _modules['Core/Utilities.js']], function (D, NBU, StockToolsBindings, StockToolsDefaults, STU, U) {
        /**
         *
         *  Events generator for Stock tools
         *
         *  (c) 2009-2024 Paweł Fus
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { setOptions } = D;
        const { getAssignedAxis } = NBU;
        const { isNotNavigatorYAxis, isPriceIndicatorEnabled } = STU;
        const { correctFloat, defined, isNumber, pick } = U;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * @private
         */
        function compose(NavigationBindingsClass) {
            const navigationProto = NavigationBindingsClass.prototype;
            if (!navigationProto.utils?.manageIndicators) {
                // Extends NavigationBindings to support indicators and resizers:
                navigationProto.getYAxisPositions = navigationGetYAxisPositions;
                navigationProto.getYAxisResizers = navigationGetYAxisResizers;
                navigationProto.recalculateYAxisPositions =
                    navigationRecalculateYAxisPositions;
                navigationProto.resizeYAxes = navigationResizeYAxes;
                navigationProto.utils = navigationProto.utils || {};
                navigationProto.utils.indicatorsWithAxes = STU.indicatorsWithAxes;
                navigationProto.utils.indicatorsWithVolume = STU.indicatorsWithVolume;
                navigationProto.utils.getAssignedAxis = getAssignedAxis;
                navigationProto.utils.isPriceIndicatorEnabled = isPriceIndicatorEnabled;
                navigationProto.utils.manageIndicators = STU.manageIndicators;
                setOptions(StockToolsDefaults);
                setOptions({
                    navigation: {
                        bindings: StockToolsBindings
                    }
                });
            }
        }
        /**
         * Get current positions for all yAxes. If new axis does not have position,
         * returned is default height and last available top place.
         *
         * @private
         * @function Highcharts.NavigationBindings#getYAxisPositions
         *
         * @param {Array<Highcharts.Axis>} yAxes
         *        Array of yAxes available in the chart.
         *
         * @param {number} plotHeight
         *        Available height in the chart.
         *
         * @param {number} defaultHeight
         *        Default height in percents.
         *
         * @param {Highcharts.AxisPositions} removedYAxisProps
         *        Height and top value of the removed yAxis in percents.
         *
         * @return {Highcharts.YAxisPositions}
         *         An object containing an array of calculated positions
         *         in percentages. Format: `{top: Number, height: Number}`
         *         and maximum value of top + height of axes.
         */
        function navigationGetYAxisPositions(yAxes, plotHeight, defaultHeight, removedYAxisProps) {
            let allAxesHeight = 0, previousAxisHeight, removedHeight, removedTop;
            /** @private */
            function isPercentage(prop) {
                return defined(prop) && !isNumber(prop) && prop.match('%');
            }
            if (removedYAxisProps) {
                removedTop = correctFloat((parseFloat(removedYAxisProps.top) / 100));
                removedHeight = correctFloat((parseFloat(removedYAxisProps.height) / 100));
            }
            const positions = yAxes.map((yAxis, index) => {
                let height = correctFloat(isPercentage(yAxis.options.height) ?
                    parseFloat(yAxis.options.height) / 100 :
                    yAxis.height / plotHeight), top = correctFloat(isPercentage(yAxis.options.top) ?
                    parseFloat(yAxis.options.top) / 100 :
                    (yAxis.top - yAxis.chart.plotTop) / plotHeight);
                if (!removedHeight) {
                    // New axis' height is NaN so we can check if
                    // the axis is newly created this way
                    if (!isNumber(height)) {
                        // Check if the previous axis is the
                        // indicator axis (every indicator inherits from sma)
                        height = yAxes[index - 1].series
                            .every((s) => s.is('sma')) ?
                            previousAxisHeight : defaultHeight / 100;
                    }
                    if (!isNumber(top)) {
                        top = allAxesHeight;
                    }
                    previousAxisHeight = height;
                    allAxesHeight = correctFloat(Math.max(allAxesHeight, (top || 0) + (height || 0)));
                }
                else {
                    // Move all axes which were below the removed axis up.
                    if (top > removedTop) {
                        top -= removedHeight;
                    }
                    allAxesHeight = Math.max(allAxesHeight, (top || 0) + (height || 0));
                }
                return {
                    height: height * 100,
                    top: top * 100
                };
            });
            return { positions, allAxesHeight };
        }
        /**
         * Get current resize options for each yAxis. Note that each resize is
         * linked to the next axis, except the last one which shouldn't affect
         * axes in the navigator. Because indicator can be removed with it's yAxis
         * in the middle of yAxis array, we need to bind closest yAxes back.
         *
         * @private
         * @function Highcharts.NavigationBindings#getYAxisResizers
         *
         * @param {Array<Highcharts.Axis>} yAxes
         *        Array of yAxes available in the chart
         *
         * @return {Array<object>}
         *         An array of resizer options.
         *         Format: `{enabled: Boolean, controlledAxis: { next: [String]}}`
         */
        function navigationGetYAxisResizers(yAxes) {
            const resizers = [];
            yAxes.forEach(function (_yAxis, index) {
                const nextYAxis = yAxes[index + 1];
                // We have next axis, bind them:
                if (nextYAxis) {
                    resizers[index] = {
                        enabled: true,
                        controlledAxis: {
                            next: [
                                pick(nextYAxis.options.id, nextYAxis.index)
                            ]
                        }
                    };
                }
                else {
                    // Remove binding:
                    resizers[index] = {
                        enabled: false
                    };
                }
            });
            return resizers;
        }
        /**
         * Utility to modify calculated positions according to the remaining/needed
         * space. Later, these positions are used in `yAxis.update({ top, height })`
         *
         * @private
         * @function Highcharts.NavigationBindings#recalculateYAxisPositions
         * @param {Array<Highcharts.Dictionary<number>>} positions
         * Default positions of all yAxes.
         * @param {number} changedSpace
         * How much space should be added or removed.
         * @param {boolean} modifyHeight
         * Update only `top` or both `top` and `height`.
         * @param {number} adder
         * `-1` or `1`, to determine whether we should add or remove space.
         *
         * @return {Array<object>}
         *         Modified positions,
         */
        function navigationRecalculateYAxisPositions(positions, changedSpace, modifyHeight, adder) {
            positions.forEach(function (position, index) {
                const prevPosition = positions[index - 1];
                position.top = !prevPosition ? 0 :
                    correctFloat(prevPosition.height + prevPosition.top);
                if (modifyHeight) {
                    position.height = correctFloat(position.height + adder * changedSpace);
                }
            });
            return positions;
        }
        /**
         * Resize all yAxes (except navigator) to fit the plotting height. Method
         * checks if new axis is added, if the new axis will fit under previous
         * axes it is placed there. If not, current plot area is scaled
         * to make room for new axis.
         *
         * If axis is removed, the current plot area stretches to fit into 100%
         * of the plot area.
         *
         * @private
         */
        function navigationResizeYAxes(removedYAxisProps) {
            // The height of the new axis before rescalling. In %, but as a number.
            const defaultHeight = 20;
            const chart = this.chart, 
            // Only non-navigator axes
            yAxes = chart.yAxis.filter(isNotNavigatorYAxis), plotHeight = chart.plotHeight, 
            // Gather current heights (in %)
            { positions, allAxesHeight } = this.getYAxisPositions(yAxes, plotHeight, defaultHeight, removedYAxisProps), resizers = this.getYAxisResizers(yAxes);
            // Check if the axis is being either added or removed and
            // if the new indicator axis will fit under existing axes.
            // if so, there is no need to scale them.
            if (!removedYAxisProps &&
                allAxesHeight <= correctFloat(0.8 + defaultHeight / 100)) {
                positions[positions.length - 1] = {
                    height: defaultHeight,
                    top: correctFloat(allAxesHeight * 100 - defaultHeight)
                };
            }
            else {
                positions.forEach(function (position) {
                    position.height = (position.height / (allAxesHeight * 100)) * 100;
                    position.top = (position.top / (allAxesHeight * 100)) * 100;
                });
            }
            positions.forEach(function (position, index) {
                yAxes[index].update({
                    height: position.height + '%',
                    top: position.top + '%',
                    resize: resizers[index],
                    offset: 0
                }, false);
            });
        }
        /* *
         *
         *  Default Export
         *
         * */
        const StockTools = {
            compose
        };

        return StockTools;
    });
    _registerModule(_modules, 'Stock/StockTools/StockToolbar.js', [_modules['Core/Utilities.js'], _modules['Core/Renderer/HTML/AST.js'], _modules['Stock/StockTools/StockToolsUtilities.js']], function (U, AST, StockToolsUtilities) {
        /* *
         *
         *  GUI generator for Stock tools
         *
         *  (c) 2009-2024 Sebastian Bochan
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { addEvent, createElement, css, defined, fireEvent, getStyle, isArray, merge, pick } = U;
        const { shallowArraysEqual } = StockToolsUtilities;
        /* *
         *
         *  Classes
         *
         * */
        /**
         * Toolbar Class
         *
         * @private
         * @class
         *
         * @param {object} options
         *        Options of toolbar
         *
         * @param {Highcharts.Dictionary<string>|undefined} langOptions
         *        Language options
         *
         * @param {Highcharts.Chart} chart
         *        Reference to chart
         */
        class Toolbar {
            /* *
             *
             *  Constructor
             *
             * */
            constructor(options, langOptions, chart) {
                this.width = 0;
                this.isDirty = false;
                this.chart = chart;
                this.options = options;
                this.lang = langOptions;
                // Set url for icons.
                this.iconsURL = this.getIconsURL();
                this.guiEnabled = options.enabled;
                this.visible = pick(options.visible, true);
                this.guiClassName = options.className;
                this.toolbarClassName = options.toolbarClassName;
                // General events collection which should be removed upon
                // destroy/update:
                this.eventsToUnbind = [];
                if (this.guiEnabled) {
                    this.createContainer();
                    this.createButtons();
                    this.showHideNavigation();
                }
                fireEvent(this, 'afterInit');
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Create and set up stockTools buttons with their events and submenus.
             * @private
             */
            createButtons() {
                const lang = this.lang, guiOptions = this.options, toolbar = this.toolbar, buttons = guiOptions.buttons, defs = guiOptions.definitions, allButtons = toolbar.childNodes;
                this.buttonList = buttons;
                // Create buttons
                buttons.forEach((btnName) => {
                    const button = this.addButton(toolbar, defs, btnName, lang);
                    this.eventsToUnbind.push(addEvent(button.buttonWrapper, 'click', () => this.eraseActiveButtons(allButtons, button.buttonWrapper)));
                    if (isArray(defs[btnName].items)) {
                        // Create submenu buttons
                        this.addSubmenu(button, defs[btnName]);
                    }
                });
            }
            /**
             * Create submenu (list of buttons) for the option. In example main button
             * is Line, in submenu will be buttons with types of lines.
             *
             * @private
             *
             * @param {Highcharts.Dictionary<Highcharts.HTMLDOMElement>} parentBtn
             *        Button which has submenu
             *
             * @param {Highcharts.StockToolsGuiDefinitionsButtonsOptions} button
             *        List of all buttons
             */
            addSubmenu(parentBtn, button) {
                const submenuArrow = parentBtn.submenuArrow, buttonWrapper = parentBtn.buttonWrapper, buttonWidth = getStyle(buttonWrapper, 'width'), wrapper = this.wrapper, menuWrapper = this.listWrapper, allButtons = this.toolbar.childNodes, 
                // Create submenu container
                submenuWrapper = this.submenu = createElement('ul', {
                    className: 'highcharts-submenu-wrapper'
                }, void 0, buttonWrapper);
                // Create submenu buttons and select the first one
                this.addSubmenuItems(buttonWrapper, button);
                // Show / hide submenu
                this.eventsToUnbind.push(addEvent(submenuArrow, 'click', (e) => {
                    e.stopPropagation();
                    // Erase active class on all other buttons
                    this.eraseActiveButtons(allButtons, buttonWrapper);
                    // Hide menu
                    if (buttonWrapper.className
                        .indexOf('highcharts-current') >= 0) {
                        menuWrapper.style.width =
                            menuWrapper.startWidth + 'px';
                        buttonWrapper.classList.remove('highcharts-current');
                        submenuWrapper.style.display = 'none';
                    }
                    else {
                        // Show menu
                        // to calculate height of element
                        submenuWrapper.style.display = 'block';
                        let topMargin = submenuWrapper.offsetHeight -
                            buttonWrapper.offsetHeight - 3;
                        // Calculate position of submenu in the box
                        // if submenu is inside, reset top margin
                        if (
                        // Cut on the bottom
                        !(submenuWrapper.offsetHeight +
                            buttonWrapper.offsetTop >
                            wrapper.offsetHeight &&
                            // Cut on the top
                            buttonWrapper.offsetTop > topMargin)) {
                            topMargin = 0;
                        }
                        // Apply calculated styles
                        css(submenuWrapper, {
                            top: -topMargin + 'px',
                            left: buttonWidth + 3 + 'px'
                        });
                        buttonWrapper.className += ' highcharts-current';
                        menuWrapper.startWidth = wrapper.offsetWidth;
                        menuWrapper.style.width = menuWrapper.startWidth +
                            getStyle(menuWrapper, 'padding-left') +
                            submenuWrapper.offsetWidth + 3 + 'px';
                    }
                }));
            }
            /**
             * Create buttons in submenu
             *
             * @private
             *
             * @param {Highcharts.HTMLDOMElement} buttonWrapper
             *        Button where submenu is placed
             *
             * @param {Highcharts.StockToolsGuiDefinitionsButtonsOptions} button
             *        List of all buttons options
             */
            addSubmenuItems(buttonWrapper, button) {
                const _self = this, submenuWrapper = this.submenu, lang = this.lang, menuWrapper = this.listWrapper, items = button.items;
                let submenuBtn;
                // Add items to submenu
                items.forEach((btnName) => {
                    // Add buttons to submenu
                    submenuBtn = this.addButton(submenuWrapper, button, btnName, lang);
                    this.eventsToUnbind.push(addEvent(submenuBtn.mainButton, 'click', function () {
                        _self.switchSymbol(this, buttonWrapper, true);
                        menuWrapper.style.width =
                            menuWrapper.startWidth + 'px';
                        submenuWrapper.style.display = 'none';
                    }));
                });
                // Select first submenu item
                const firstSubmenuItem = submenuWrapper.querySelectorAll('li > .highcharts-menu-item-btn')[0];
                // Replace current symbol, in main button, with submenu's button style
                this.switchSymbol(firstSubmenuItem, false);
            }
            /**
             * Erase active class on all other buttons.
             * @private
             */
            eraseActiveButtons(buttons, currentButton, submenuItems) {
                [].forEach.call(buttons, (btn) => {
                    if (btn !== currentButton) {
                        btn.classList.remove('highcharts-current');
                        btn.classList.remove('highcharts-active');
                        submenuItems =
                            btn.querySelectorAll('.highcharts-submenu-wrapper');
                        // Hide submenu
                        if (submenuItems.length > 0) {
                            submenuItems[0].style.display = 'none';
                        }
                    }
                });
            }
            /**
             * Create single button. Consist of HTML elements `li`, `button`, and (if
             * exists) submenu container.
             *
             * @private
             *
             * @param {Highcharts.HTMLDOMElement} target
             *        HTML reference, where button should be added
             *
             * @param {object} options
             *        All options, by btnName refer to particular button
             *
             * @param {string} btnName
             *        Button name of functionality mapped for specific class
             *
             * @param {Highcharts.Dictionary<string>} lang
             *        All titles, by btnName refer to particular button
             *
             * @return {object}
             *         References to all created HTML elements
             */
            addButton(target, options, btnName, lang = {}) {
                const btnOptions = options[btnName], items = btnOptions.items, classMapping = Toolbar.prototype.classMapping, userClassName = btnOptions.className || '';
                // Main button wrapper
                const buttonWrapper = createElement('li', {
                    className: pick(classMapping[btnName], '') + ' ' + userClassName,
                    title: lang[btnName] || btnName
                }, void 0, target);
                // Single button
                const elementType = (btnOptions.elementType || 'button');
                const mainButton = createElement(elementType, {
                    className: 'highcharts-menu-item-btn'
                }, void 0, buttonWrapper);
                // Submenu
                if (items && items.length) {
                    // Arrow is a hook to show / hide submenu
                    const submenuArrow = createElement('button', {
                        className: 'highcharts-submenu-item-arrow ' +
                            'highcharts-arrow-right'
                    }, void 0, buttonWrapper);
                    submenuArrow.style.backgroundImage = 'url(' +
                        this.iconsURL + 'arrow-bottom.svg)';
                    return {
                        buttonWrapper,
                        mainButton,
                        submenuArrow
                    };
                }
                mainButton.style.backgroundImage = 'url(' +
                    this.iconsURL + btnOptions.symbol + ')';
                return {
                    buttonWrapper,
                    mainButton
                };
            }
            /**
             * Create navigation's HTML elements: container and arrows.
             * @private
             */
            addNavigation() {
                const wrapper = this.wrapper;
                // Arrow wrapper
                this.arrowWrapper = createElement('div', {
                    className: 'highcharts-arrow-wrapper'
                });
                this.arrowUp = createElement('div', {
                    className: 'highcharts-arrow-up'
                }, void 0, this.arrowWrapper);
                this.arrowUp.style.backgroundImage =
                    'url(' + this.iconsURL + 'arrow-right.svg)';
                this.arrowDown = createElement('div', {
                    className: 'highcharts-arrow-down'
                }, void 0, this.arrowWrapper);
                this.arrowDown.style.backgroundImage =
                    'url(' + this.iconsURL + 'arrow-right.svg)';
                wrapper.insertBefore(this.arrowWrapper, wrapper.childNodes[0]);
                // Attach scroll events
                this.scrollButtons();
            }
            /**
             * Add events to navigation (two arrows) which allows user to scroll
             * top/down GUI buttons, if container's height is not enough.
             * @private
             */
            scrollButtons() {
                const wrapper = this.wrapper, toolbar = this.toolbar, step = 0.1 * wrapper.offsetHeight; // 0.1 = 10%
                let targetY = 0;
                this.eventsToUnbind.push(addEvent(this.arrowUp, 'click', () => {
                    if (targetY > 0) {
                        targetY -= step;
                        toolbar.style.marginTop = -targetY + 'px';
                    }
                }));
                this.eventsToUnbind.push(addEvent(this.arrowDown, 'click', () => {
                    if (wrapper.offsetHeight + targetY <=
                        toolbar.offsetHeight + step) {
                        targetY += step;
                        toolbar.style.marginTop = -targetY + 'px';
                    }
                }));
            }
            /*
             * Create the stockTools container and sets up event bindings.
             *
             */
            createContainer() {
                const chart = this.chart, guiOptions = this.options, container = chart.container, navigation = chart.options.navigation, bindingsClassName = navigation?.bindingsClassName, self = this;
                let listWrapper, toolbar;
                // Create main container
                const wrapper = this.wrapper = createElement('div', {
                    className: 'highcharts-stocktools-wrapper ' +
                        guiOptions.className + ' ' + bindingsClassName
                });
                container.appendChild(wrapper);
                this.showHideBtn = createElement('div', {
                    className: 'highcharts-toggle-toolbar highcharts-arrow-left'
                }, void 0, wrapper);
                // Toggle menu
                this.eventsToUnbind.push(addEvent(this.showHideBtn, 'click', () => {
                    this.update({
                        gui: {
                            visible: !self.visible
                        }
                    });
                }));
                // Mimic event behaviour of being outside chart.container
                [
                    'mousedown',
                    'mousemove',
                    'click',
                    'touchstart'
                ].forEach((eventType) => {
                    addEvent(wrapper, eventType, (e) => e.stopPropagation());
                });
                addEvent(wrapper, 'mouseover', (e) => chart.pointer?.onContainerMouseLeave(e));
                // Toolbar
                this.toolbar = toolbar = createElement('ul', {
                    className: 'highcharts-stocktools-toolbar ' +
                        guiOptions.toolbarClassName
                });
                // Add container for list of buttons
                this.listWrapper = listWrapper = createElement('div', {
                    className: 'highcharts-menu-wrapper'
                });
                wrapper.insertBefore(listWrapper, wrapper.childNodes[0]);
                listWrapper.insertBefore(toolbar, listWrapper.childNodes[0]);
                this.showHideToolbar();
                // Add navigation which allows user to scroll down / top GUI buttons
                this.addNavigation();
            }
            /**
             * Function called in redraw verifies if the navigation should be visible.
             * @private
             */
            showHideNavigation() {
                // Arrows
                // 50px space for arrows
                if (this.visible &&
                    this.toolbar.offsetHeight > (this.wrapper.offsetHeight - 50)) {
                    this.arrowWrapper.style.display = 'block';
                }
                else {
                    // Reset margin if whole toolbar is visible
                    this.toolbar.style.marginTop = '0px';
                    // Hide arrows
                    this.arrowWrapper.style.display = 'none';
                }
            }
            /**
             * Create button which shows or hides GUI toolbar.
             * @private
             */
            showHideToolbar() {
                const wrapper = this.wrapper, toolbar = this.listWrapper, submenu = this.submenu, 
                // Show hide toolbar
                showHideBtn = this.showHideBtn;
                let visible = this.visible;
                showHideBtn.style.backgroundImage =
                    'url(' + this.iconsURL + 'arrow-right.svg)';
                if (!visible) {
                    // Hide
                    if (submenu) {
                        submenu.style.display = 'none';
                    }
                    showHideBtn.style.left = '0px';
                    visible = this.visible = false;
                    toolbar.classList.add('highcharts-hide');
                    showHideBtn.classList.add('highcharts-arrow-right');
                    wrapper.style.height = showHideBtn.offsetHeight + 'px';
                }
                else {
                    wrapper.style.height = '100%';
                    toolbar.classList.remove('highcharts-hide');
                    showHideBtn.classList.remove('highcharts-arrow-right');
                    showHideBtn.style.top = getStyle(toolbar, 'padding-top') + 'px';
                    showHideBtn.style.left = (wrapper.offsetWidth +
                        getStyle(toolbar, 'padding-left')) + 'px';
                }
            }
            /*
             * In main GUI button, replace icon and class with submenu button's
             * class / symbol.
             *
             * @param {HTMLDOMElement} - submenu button
             * @param {Boolean} - true or false
             *
             */
            switchSymbol(button, redraw) {
                const buttonWrapper = button.parentNode, buttonWrapperClass = buttonWrapper.className, 
                // Main button in first level og GUI
                mainNavButton = buttonWrapper.parentNode.parentNode;
                // If the button is disabled, don't do anything
                if (buttonWrapperClass.indexOf('highcharts-disabled-btn') > -1) {
                    return;
                }
                // Set class
                mainNavButton.className = '';
                if (buttonWrapperClass) {
                    mainNavButton.classList.add(buttonWrapperClass.trim());
                }
                // Set icon
                mainNavButton
                    .querySelectorAll('.highcharts-menu-item-btn')[0]
                    .style.backgroundImage =
                    button.style.backgroundImage;
                // Set active class
                if (redraw) {
                    this.toggleButtonActiveClass(mainNavButton);
                }
            }
            /**
             * Set select state (active class) on button.
             * @private
             */
            toggleButtonActiveClass(button) {
                const classList = button.classList;
                if (classList.contains('highcharts-active')) {
                    classList.remove('highcharts-active');
                }
                else {
                    classList.add('highcharts-active');
                }
            }
            /**
             * Remove active class from all buttons except defined.
             * @private
             */
            unselectAllButtons(button) {
                const activeBtns = button.parentNode
                    .querySelectorAll('.highcharts-active');
                [].forEach.call(activeBtns, (activeBtn) => {
                    if (activeBtn !== button) {
                        activeBtn.classList.remove('highcharts-active');
                    }
                });
            }
            /**
             * Update GUI with given options.
             * @private
             */
            update(options, redraw) {
                this.isDirty = !!options.gui.definitions;
                merge(true, this.chart.options.stockTools, options);
                merge(true, this.options, options.gui);
                this.visible = pick(this.options.visible && this.options.enabled, true);
                // If Stock Tools are updated, then bindings should be updated too:
                if (this.chart.navigationBindings) {
                    this.chart.navigationBindings.update();
                }
                this.chart.isDirtyBox = true;
                if (pick(redraw, true)) {
                    this.chart.redraw();
                }
            }
            /**
             * Destroy all HTML GUI elements.
             * @private
             */
            destroy() {
                const stockToolsDiv = this.wrapper, parent = stockToolsDiv && stockToolsDiv.parentNode;
                this.eventsToUnbind.forEach((unbinder) => unbinder());
                // Remove the empty element
                if (parent) {
                    parent.removeChild(stockToolsDiv);
                }
            }
            /**
             * Redraws the toolbar based on the current state of the options.
             * @private
             */
            redraw() {
                if (this.options.enabled !== this.guiEnabled) {
                    this.handleGuiEnabledChange();
                }
                else {
                    if (!this.guiEnabled) {
                        return;
                    }
                    this.updateClassNames();
                    this.updateButtons();
                    this.updateVisibility();
                    this.showHideNavigation();
                    this.showHideToolbar();
                }
            }
            /**
             * Hadles the change of the `enabled` option.
             * @private
             */
            handleGuiEnabledChange() {
                if (this.options.enabled === false) {
                    this.destroy();
                    this.visible = false;
                }
                if (this.options.enabled === true) {
                    this.createContainer();
                    this.createButtons();
                }
                this.guiEnabled = this.options.enabled;
            }
            /**
             * Updates the class names of the GUI and toolbar elements.
             * @private
             */
            updateClassNames() {
                if (this.options.className !== this.guiClassName) {
                    if (this.guiClassName) {
                        this.wrapper.classList.remove(this.guiClassName);
                    }
                    if (this.options.className) {
                        this.wrapper.classList.add(this.options.className);
                    }
                    this.guiClassName = this.options.className;
                }
                if (this.options.toolbarClassName !== this.toolbarClassName) {
                    if (this.toolbarClassName) {
                        this.toolbar.classList.remove(this.toolbarClassName);
                    }
                    if (this.options.toolbarClassName) {
                        this.toolbar.classList.add(this.options.toolbarClassName);
                    }
                    this.toolbarClassName = this.options.toolbarClassName;
                }
            }
            /**
             * Updates the buttons in the toolbar if the button options have changed.
             * @private
             */
            updateButtons() {
                if (!shallowArraysEqual(this.options.buttons, this.buttonList) ||
                    this.isDirty) {
                    this.toolbar.innerHTML = AST.emptyHTML;
                    this.createButtons();
                }
            }
            /**
             * Updates visibility based on current options.
             * @private
             */
            updateVisibility() {
                if (defined(this.options.visible)) {
                    this.visible = this.options.visible;
                }
            }
            /**
             * @private
             */
            getIconsURL() {
                return this.chart.options.navigation.iconsURL ||
                    this.options.iconsURL ||
                    'https://code.highcharts.com/11.4.6/gfx/stock-icons/';
            }
        }
        Toolbar.prototype.classMapping = {
            circle: 'highcharts-circle-annotation',
            ellipse: 'highcharts-ellipse-annotation',
            rectangle: 'highcharts-rectangle-annotation',
            label: 'highcharts-label-annotation',
            segment: 'highcharts-segment',
            arrowSegment: 'highcharts-arrow-segment',
            ray: 'highcharts-ray',
            arrowRay: 'highcharts-arrow-ray',
            line: 'highcharts-infinity-line',
            arrowInfinityLine: 'highcharts-arrow-infinity-line',
            verticalLine: 'highcharts-vertical-line',
            horizontalLine: 'highcharts-horizontal-line',
            crooked3: 'highcharts-crooked3',
            crooked5: 'highcharts-crooked5',
            elliott3: 'highcharts-elliott3',
            elliott5: 'highcharts-elliott5',
            pitchfork: 'highcharts-pitchfork',
            fibonacci: 'highcharts-fibonacci',
            fibonacciTimeZones: 'highcharts-fibonacci-time-zones',
            parallelChannel: 'highcharts-parallel-channel',
            measureX: 'highcharts-measure-x',
            measureY: 'highcharts-measure-y',
            measureXY: 'highcharts-measure-xy',
            timeCycles: 'highcharts-time-cycles',
            verticalCounter: 'highcharts-vertical-counter',
            verticalLabel: 'highcharts-vertical-label',
            verticalArrow: 'highcharts-vertical-arrow',
            currentPriceIndicator: 'highcharts-current-price-indicator',
            indicators: 'highcharts-indicators',
            flagCirclepin: 'highcharts-flag-circlepin',
            flagDiamondpin: 'highcharts-flag-diamondpin',
            flagSquarepin: 'highcharts-flag-squarepin',
            flagSimplepin: 'highcharts-flag-simplepin',
            zoomX: 'highcharts-zoom-x',
            zoomY: 'highcharts-zoom-y',
            zoomXY: 'highcharts-zoom-xy',
            typeLine: 'highcharts-series-type-line',
            typeOHLC: 'highcharts-series-type-ohlc',
            typeHLC: 'highcharts-series-type-hlc',
            typeCandlestick: 'highcharts-series-type-candlestick',
            typeHollowCandlestick: 'highcharts-series-type-hollowcandlestick',
            typeHeikinAshi: 'highcharts-series-type-heikinashi',
            fullScreen: 'highcharts-full-screen',
            toggleAnnotations: 'highcharts-toggle-annotations',
            saveChart: 'highcharts-save-chart',
            separator: 'highcharts-separator'
        };
        /* *
         *
         *  Default Export
         *
         * */

        return Toolbar;
    });
    _registerModule(_modules, 'Stock/StockTools/StockToolsGui.js', [_modules['Core/Defaults.js'], _modules['Stock/StockTools/StockToolsDefaults.js'], _modules['Stock/StockTools/StockToolbar.js'], _modules['Core/Utilities.js']], function (D, StockToolsDefaults, Toolbar, U) {
        /* *
         *
         *  GUI generator for Stock tools
         *
         *  (c) 2009-2024 Sebastian Bochan
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { setOptions } = D;
        const { addEvent, getStyle, merge, pick } = U;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Verify if Toolbar should be added.
         * @private
         */
        function chartSetStockTools(options) {
            const chartOptions = this.options, lang = chartOptions.lang, guiOptions = merge(chartOptions.stockTools && chartOptions.stockTools.gui, options && options.gui), langOptions = lang && lang.stockTools && lang.stockTools.gui;
            this.stockTools = new Toolbar(guiOptions, langOptions, this);
            if (this.stockTools.guiEnabled) {
                this.isDirtyBox = true;
            }
        }
        /**
         * @private
         */
        function compose(ChartClass, NavigationBindingsClass) {
            const chartProto = ChartClass.prototype;
            if (!chartProto.setStockTools) {
                addEvent(ChartClass, 'afterGetContainer', onChartAfterGetContainer);
                addEvent(ChartClass, 'beforeRedraw', onChartBeforeRedraw);
                addEvent(ChartClass, 'beforeRender', onChartBeforeRedraw);
                addEvent(ChartClass, 'destroy', onChartDestroy);
                addEvent(ChartClass, 'getMargins', onChartGetMargins, { order: 0 });
                addEvent(ChartClass, 'render', onChartRender);
                chartProto.setStockTools = chartSetStockTools;
                addEvent(NavigationBindingsClass, 'deselectButton', onNavigationBindingsDeselectButton);
                addEvent(NavigationBindingsClass, 'selectButton', onNavigationBindingsSelectButton);
                setOptions(StockToolsDefaults);
            }
        }
        /**
         * Run HTML generator
         * @private
         */
        function onChartAfterGetContainer() {
            this.setStockTools();
        }
        /**
         * Handle beforeRedraw and beforeRender
         * @private
         */
        function onChartBeforeRedraw() {
            if (this.stockTools) {
                this.stockTools.redraw();
                setOffset(this);
            }
        }
        /**
         * Function to calculate and set the offset width for stock tools.
         * @private
         */
        function setOffset(chart) {
            if (chart.stockTools?.guiEnabled) {
                const optionsChart = chart.options.chart;
                const listWrapper = chart.stockTools.listWrapper;
                const offsetWidth = listWrapper && ((listWrapper.startWidth +
                    getStyle(listWrapper, 'padding-left') +
                    getStyle(listWrapper, 'padding-right')) || listWrapper.offsetWidth);
                chart.stockTools.width = offsetWidth;
                let dirty = false;
                if (offsetWidth < chart.plotWidth) {
                    const nextX = pick(optionsChart.spacingLeft, optionsChart.spacing && optionsChart.spacing[3], 0) + offsetWidth;
                    const diff = nextX - chart.spacingBox.x;
                    chart.spacingBox.x = nextX;
                    chart.spacingBox.width -= diff;
                    dirty = true;
                }
                else if (offsetWidth === 0) {
                    dirty = true;
                }
                if (offsetWidth !== chart.stockTools.prevOffsetWidth) {
                    chart.stockTools.prevOffsetWidth = offsetWidth;
                    if (dirty) {
                        chart.isDirtyLegend = true;
                    }
                }
            }
        }
        /**
         * @private
         */
        function onChartDestroy() {
            if (this.stockTools) {
                this.stockTools.destroy();
            }
        }
        /**
         * @private
         */
        function onChartGetMargins() {
            const offsetWidth = this.stockTools?.visible && this.stockTools.guiEnabled ?
                this.stockTools.width : 0;
            if (offsetWidth && offsetWidth < this.plotWidth) {
                this.plotLeft += offsetWidth;
                this.spacing[3] += offsetWidth;
            }
        }
        /**
         * Check if the correct price indicator button is displayed, #15029.
         * @private
         */
        function onChartRender() {
            const stockTools = this.stockTools, button = stockTools &&
                stockTools.toolbar &&
                stockTools.toolbar.querySelector('.highcharts-current-price-indicator');
            // Change the initial button background.
            if (stockTools &&
                this.navigationBindings &&
                this.options.series &&
                button) {
                if (this.navigationBindings.utils
                    ?.isPriceIndicatorEnabled?.(this.series)) {
                    button.firstChild.style['background-image'] =
                        'url("' + stockTools.getIconsURL() + 'current-price-hide.svg")';
                }
                else {
                    button.firstChild.style['background-image'] =
                        'url("' + stockTools.getIconsURL() + 'current-price-show.svg")';
                }
            }
        }
        /**
         * @private
         */
        function onNavigationBindingsDeselectButton(event) {
            const className = 'highcharts-submenu-wrapper', gui = this.chart.stockTools;
            if (gui && gui.guiEnabled) {
                let button = event.button;
                // If deselecting a button from a submenu, select state for it's parent
                if (button.parentNode.className.indexOf(className) >= 0) {
                    button = button.parentNode.parentNode;
                }
                button.classList.remove('highcharts-active');
            }
        }
        /**
         * Communication with bindings
         * @private
         */
        function onNavigationBindingsSelectButton(event) {
            const className = 'highcharts-submenu-wrapper', gui = this.chart.stockTools;
            if (gui && gui.guiEnabled) {
                let button = event.button;
                // Unselect other active buttons
                gui.unselectAllButtons(event.button);
                // If clicked on a submenu, select state for it's parent
                if (button.parentNode.className.indexOf(className) >= 0) {
                    button = button.parentNode.parentNode;
                }
                // Set active class on the current button
                gui.toggleButtonActiveClass(button);
            }
        }
        /* *
         *
         *  Default Export
         *
         * */
        const StockToolsGui = {
            compose
        };

        return StockToolsGui;
    });
    _registerModule(_modules, 'masters/modules/stock-tools.src.js', [_modules['Core/Globals.js'], _modules['Extensions/Annotations/NavigationBindings.js'], _modules['Stock/StockTools/StockTools.js'], _modules['Stock/StockTools/StockToolsGui.js'], _modules['Stock/StockTools/StockToolbar.js']], function (Highcharts, NavigationBindings, StockTools, StockToolsGui, Toolbar) {

        const G = Highcharts;
        G.NavigationBindings = G.NavigationBindings || NavigationBindings;
        G.Toolbar = Toolbar;
        StockTools.compose(G.NavigationBindings);
        StockToolsGui.compose(G.Chart, G.NavigationBindings);

        return Highcharts;
    });
}));
