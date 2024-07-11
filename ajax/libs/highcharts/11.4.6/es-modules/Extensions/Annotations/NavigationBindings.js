/* *
 *
 *  (c) 2009-2024 Highsoft, Black Label
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import ChartNavigationComposition from '../../Core/Chart/ChartNavigationComposition.js';
import D from '../../Core/Defaults.js';
const { setOptions } = D;
import F from '../../Core/Templating.js';
const { format } = F;
import H from '../../Core/Globals.js';
const { composed, doc, win } = H;
import NavigationBindingDefaults from './NavigationBindingsDefaults.js';
import NBU from './NavigationBindingsUtilities.js';
const { getAssignedAxis, getFieldType } = NBU;
import U from '../../Core/Utilities.js';
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
export default NavigationBindings;
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
