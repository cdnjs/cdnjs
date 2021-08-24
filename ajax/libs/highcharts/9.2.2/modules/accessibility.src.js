/**
 * @license Highcharts JS v9.2.2 (2021-08-24)
 *
 * Accessibility module
 *
 * (c) 2010-2021 Highsoft AS
 * Author: Oystein Moseng
 *
 * License: www.highcharts.com/license
 */
'use strict';
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/modules/accessibility', ['highcharts'], function (Highcharts) {
            factory(Highcharts);
            factory.Highcharts = Highcharts;
            return factory;
        });
    } else {
        factory(typeof Highcharts !== 'undefined' ? Highcharts : undefined);
    }
}(function (Highcharts) {
    var _modules = Highcharts ? Highcharts._modules : {};
    function _registerModule(obj, path, args, fn) {
        if (!obj.hasOwnProperty(path)) {
            obj[path] = fn.apply(null, args);
        }
    }
    _registerModule(_modules, 'Accessibility/Utils/HTMLUtilities.js', [_modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (H, U) {
        /* *
         *
         *  (c) 2009-2021 Øystein Moseng
         *
         *  Utility functions for accessibility module.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var doc = H.doc,
            win = H.win;
        var merge = U.merge;
        /* eslint-disable valid-jsdoc */
        /**
         * @private
         * @param {Highcharts.HTMLDOMElement} el
         * @param {string} className
         * @return {void}
         */
        function addClass(el, className) {
            if (el.classList) {
                el.classList.add(className);
            }
            else if (el.className.indexOf(className) < 0) {
                // Note: Dumb check for class name exists, should be fine for practical
                // use cases, but will return false positives if the element has a class
                // that contains the className.
                el.className += className;
            }
        }
        /**
         * @private
         * @param {string} str
         * @return {string}
         */
        function escapeStringForHTML(str) {
            return str
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#x27;')
                .replace(/\//g, '&#x2F;');
        }
        /**
         * Get an element by ID
         * @param {string} id
         * @private
         * @return {Highcharts.HTMLDOMElement|Highcharts.SVGDOMElement|null}
         */
        function getElement(id) {
            return doc.getElementById(id);
        }
        /**
         * Get a fake mouse event of a given type
         * @param {string} type
         * @private
         * @return {global.MouseEvent}
         */
        function getFakeMouseEvent(type) {
            if (typeof win.MouseEvent === 'function') {
                return new win.MouseEvent(type);
            }
            // No MouseEvent support, try using initMouseEvent
            if (doc.createEvent) {
                var evt = doc.createEvent('MouseEvent');
                if (evt.initMouseEvent) {
                    evt.initMouseEvent(type, true, // Bubble
                    true, // Cancel
                    win, // View
                    type === 'click' ? 1 : 0, // Detail
                    // Coords
                    0, 0, 0, 0, 
                    // Pressed keys
                    false, false, false, false, 0, // button
                    null // related target
                    );
                    return evt;
                }
            }
            return { type: type };
        }
        /**
         * Get an appropriate heading level for an element. Corresponds to the
         * heading level below the previous heading in the DOM.
         *
         * Note: Only detects previous headings in the DOM that are siblings,
         * ancestors, or previous siblings of ancestors. Headings that are nested below
         * siblings of ancestors (cousins et.al) are not picked up. This is because it
         * is ambiguous whether or not the nesting is for layout purposes or indicates a
         * separate section.
         *
         * @private
         * @param {Highcharts.HTMLDOMElement} [element]
         * @return {string} The heading tag name (h1, h2 etc).
         * If no nearest heading is found, "p" is returned.
         */
        function getHeadingTagNameForElement(element) {
            var getIncreasedHeadingLevel = function (tagName) {
                    var headingLevel = parseInt(tagName.slice(1), 10);
                var newLevel = Math.min(6,
                    headingLevel + 1);
                return 'h' + newLevel;
            };
            var isHeading = function (tagName) { return /H[1-6]/.test(tagName); };
            var getPreviousSiblingsHeading = function (el) {
                    var sibling = el;
                while (sibling = sibling.previousSibling) { // eslint-disable-line
                    var tagName = sibling.tagName || '';
                    if (isHeading(tagName)) {
                        return tagName;
                    }
                }
                return '';
            };
            var getHeadingRecursive = function (el) {
                    var prevSiblingsHeading = getPreviousSiblingsHeading(el);
                if (prevSiblingsHeading) {
                    return getIncreasedHeadingLevel(prevSiblingsHeading);
                }
                // No previous siblings are headings, try parent node
                var parent = el.parentElement;
                if (!parent) {
                    return 'p';
                }
                var parentTagName = parent.tagName;
                if (isHeading(parentTagName)) {
                    return getIncreasedHeadingLevel(parentTagName);
                }
                return getHeadingRecursive(parent);
            };
            return getHeadingRecursive(element);
        }
        /**
         * Remove an element from the DOM.
         * @private
         * @param {Highcharts.HTMLDOMElement|Highcharts.SVGDOMElement} [element]
         * @return {void}
         */
        function removeElement(element) {
            if (element && element.parentNode) {
                element.parentNode.removeChild(element);
            }
        }
        /**
         * Utility function. Reverses child nodes of a DOM element.
         * @private
         * @param {Highcharts.HTMLDOMElement|Highcharts.SVGDOMElement} node
         * @return {void}
         */
        function reverseChildNodes(node) {
            var i = node.childNodes.length;
            while (i--) {
                node.appendChild(node.childNodes[i]);
            }
        }
        /**
         * Set attributes on element. Set to null to remove attribute.
         * @private
         * @param {Highcharts.HTMLDOMElement|Highcharts.SVGDOMElement} el
         * @param {Highcharts.HTMLAttributes|Highcharts.SVGAttributes} attrs
         * @return {void}
         */
        function setElAttrs(el, attrs) {
            Object.keys(attrs).forEach(function (attr) {
                var val = attrs[attr];
                if (val === null) {
                    el.removeAttribute(attr);
                }
                else {
                    el.setAttribute(attr, val);
                }
            });
        }
        /**
         * Used for aria-label attributes, painting on a canvas will fail if the
         * text contains tags.
         * @private
         * @param {string} str
         * @return {string}
         */
        function stripHTMLTagsFromString(str) {
            return typeof str === 'string' ?
                str.replace(/<\/?[^>]+(>|$)/g, '') : str;
        }
        /**
         * Utility function for hiding an element visually, but still keeping it
         * available to screen reader users.
         * @private
         * @param {Highcharts.HTMLDOMElement} element
         * @return {void}
         */
        function visuallyHideElement(element) {
            var hiddenStyle = {
                    position: 'absolute',
                    width: '1px',
                    height: '1px',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    clip: 'rect(1px, 1px, 1px, 1px)',
                    marginTop: '-3px',
                    '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=1)',
                    filter: 'alpha(opacity=1)',
                    opacity: '0.01'
                };
            merge(true, element.style, hiddenStyle);
        }
        var HTMLUtilities = {
                addClass: addClass,
                escapeStringForHTML: escapeStringForHTML,
                getElement: getElement,
                getFakeMouseEvent: getFakeMouseEvent,
                getHeadingTagNameForElement: getHeadingTagNameForElement,
                removeElement: removeElement,
                reverseChildNodes: reverseChildNodes,
                setElAttrs: setElAttrs,
                stripHTMLTagsFromString: stripHTMLTagsFromString,
                visuallyHideElement: visuallyHideElement
            };

        return HTMLUtilities;
    });
    _registerModule(_modules, 'Accessibility/Utils/ChartUtilities.js', [_modules['Accessibility/Utils/HTMLUtilities.js'], _modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (HTMLUtilities, H, U) {
        /* *
         *
         *  (c) 2009-2021 Øystein Moseng
         *
         *  Utils for dealing with charts.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var stripHTMLTags = HTMLUtilities.stripHTMLTagsFromString;
        var doc = H.doc;
        var defined = U.defined,
            find = U.find,
            fireEvent = U.fireEvent;
        /* eslint-disable valid-jsdoc */
        /**
         * @return {string}
         */
        function getChartTitle(chart) {
            return stripHTMLTags(chart.options.title.text ||
                chart.langFormat('accessibility.defaultChartTitle', { chart: chart }));
        }
        /**
         * Return string with the axis name/title.
         * @param {Highcharts.Axis} axis
         * @return {string}
         */
        function getAxisDescription(axis) {
            return axis && (axis.userOptions && axis.userOptions.accessibility &&
                axis.userOptions.accessibility.description ||
                axis.axisTitle && axis.axisTitle.textStr ||
                axis.options.id ||
                axis.categories && 'categories' ||
                axis.dateTime && 'Time' ||
                'values');
        }
        /**
         * Return string with text description of the axis range.
         * @param {Highcharts.Axis} axis The axis to get range desc of.
         * @return {string} A string with the range description for the axis.
         */
        function getAxisRangeDescription(axis) {
            var axisOptions = axis.options || {};
            // Handle overridden range description
            if (axisOptions.accessibility &&
                typeof axisOptions.accessibility.rangeDescription !== 'undefined') {
                return axisOptions.accessibility.rangeDescription;
            }
            // Handle category axes
            if (axis.categories) {
                return getCategoryAxisRangeDesc(axis);
            }
            // Use time range, not from-to?
            if (axis.dateTime && (axis.min === 0 || axis.dataMin === 0)) {
                return getAxisTimeLengthDesc(axis);
            }
            // Just use from and to.
            // We have the range and the unit to use, find the desc format
            return getAxisFromToDescription(axis);
        }
        /**
         * Describe the range of a category axis.
         * @param {Highcharts.Axis} axis
         * @return {string}
         */
        function getCategoryAxisRangeDesc(axis) {
            var chart = axis.chart;
            if (axis.dataMax && axis.dataMin) {
                return chart.langFormat('accessibility.axis.rangeCategories', {
                    chart: chart,
                    axis: axis,
                    numCategories: axis.dataMax - axis.dataMin + 1
                });
            }
            return '';
        }
        /**
         * Describe the length of the time window shown on an axis.
         * @param {Highcharts.Axis} axis
         * @return {string}
         */
        function getAxisTimeLengthDesc(axis) {
            var chart = axis.chart;
            var range = {};
            var rangeUnit = 'Seconds';
            range.Seconds = ((axis.max || 0) - (axis.min || 0)) / 1000;
            range.Minutes = range.Seconds / 60;
            range.Hours = range.Minutes / 60;
            range.Days = range.Hours / 24;
            ['Minutes', 'Hours', 'Days'].forEach(function (unit) {
                if (range[unit] > 2) {
                    rangeUnit = unit;
                }
            });
            var rangeValue = range[rangeUnit].toFixed(rangeUnit !== 'Seconds' &&
                    rangeUnit !== 'Minutes' ? 1 : 0 // Use decimals for days/hours
                );
            // We have the range and the unit to use, find the desc format
            return chart.langFormat('accessibility.axis.timeRange' + rangeUnit, {
                chart: chart,
                axis: axis,
                range: rangeValue.replace('.0', '')
            });
        }
        /**
         * Describe an axis from-to range.
         * @param {Highcharts.Axis} axis
         * @return {string}
         */
        function getAxisFromToDescription(axis) {
            var chart = axis.chart;
            var dateRangeFormat = (chart.options &&
                    chart.options.accessibility &&
                    chart.options.accessibility.screenReaderSection.axisRangeDateFormat ||
                    '');
            var format = function (axisKey) {
                    return axis.dateTime ? chart.time.dateFormat(dateRangeFormat,
                axis[axisKey]) : axis[axisKey];
            };
            return chart.langFormat('accessibility.axis.rangeFromTo', {
                chart: chart,
                axis: axis,
                rangeFrom: format('min'),
                rangeTo: format('max')
            });
        }
        /**
         * Get the DOM element for the first point in the series.
         * @private
         * @param {Highcharts.Series} series
         * The series to get element for.
         * @return {Highcharts.HTMLDOMElement|Highcharts.SVGDOMElement|undefined}
         * The DOM element for the point.
         */
        function getSeriesFirstPointElement(series) {
            if (series.points && series.points.length) {
                var firstPointWithGraphic = find(series.points,
                    function (p) { return !!p.graphic; });
                return (firstPointWithGraphic &&
                    firstPointWithGraphic.graphic &&
                    firstPointWithGraphic.graphic.element);
            }
        }
        /**
         * Get the DOM element for the series that we put accessibility info on.
         * @private
         * @param {Highcharts.Series} series
         * The series to get element for.
         * @return {Highcharts.HTMLDOMElement|Highcharts.SVGDOMElement|undefined}
         * The DOM element for the series
         */
        function getSeriesA11yElement(series) {
            var firstPointEl = getSeriesFirstPointElement(series);
            return (firstPointEl &&
                firstPointEl.parentNode || series.graph &&
                series.graph.element || series.group &&
                series.group.element); // Could be tracker series depending on series type
        }
        /**
         * Remove aria-hidden from element. Also unhides parents of the element, and
         * hides siblings that are not explicitly unhidden.
         * @private
         * @param {Highcharts.Chart} chart
         * @param {Highcharts.HTMLDOMElement|Highcharts.SVGDOMElement} element
         */
        function unhideChartElementFromAT(chart, element) {
            element.setAttribute('aria-hidden', false);
            if (element === chart.renderTo ||
                !element.parentNode ||
                element.parentNode === doc.body // #16126: Full screen printing
            ) {
                return;
            }
            // Hide siblings unless their hidden state is already explicitly set
            Array.prototype.forEach.call(element.parentNode.childNodes, function (node) {
                if (!node.hasAttribute('aria-hidden')) {
                    node.setAttribute('aria-hidden', true);
                }
            });
            // Repeat for parent
            unhideChartElementFromAT(chart, element.parentNode);
        }
        /**
         * Hide series from screen readers.
         * @private
         * @param {Highcharts.Series} series
         * The series to hide
         * @return {void}
         */
        function hideSeriesFromAT(series) {
            var seriesEl = getSeriesA11yElement(series);
            if (seriesEl) {
                seriesEl.setAttribute('aria-hidden', true);
            }
        }
        /**
         * Get series objects by series name.
         * @private
         * @param {Highcharts.Chart} chart
         * @param {string} name
         * @return {Array<Highcharts.Series>}
         */
        function getSeriesFromName(chart, name) {
            if (!name) {
                return chart.series;
            }
            return (chart.series || []).filter(function (s) {
                return s.name === name;
            });
        }
        /**
         * Get point in a series from x/y values.
         * @private
         * @param {Array<Highcharts.Series>} series
         * @param {number} x
         * @param {number} y
         * @return {Highcharts.Point|undefined}
         */
        function getPointFromXY(series, x, y) {
            var i = series.length,
                res;
            while (i--) {
                res = find(series[i].points || [], function (p) {
                    return p.x === x && p.y === y;
                });
                if (res) {
                    return res;
                }
            }
        }
        /**
         * Get relative position of point on an x/y axis from 0 to 1.
         * @private
         * @param {Highcharts.Axis} axis
         * @param {Highcharts.Point} point
         * @return {number}
         */
        function getRelativePointAxisPosition(axis, point) {
            if (!defined(axis.dataMin) || !defined(axis.dataMax)) {
                return 0;
            }
            var axisStart = axis.toPixels(axis.dataMin);
            var axisEnd = axis.toPixels(axis.dataMax);
            // We have to use pixel position because of axis breaks, log axis etc.
            var positionProp = axis.coll === 'xAxis' ? 'x' : 'y';
            var pointPos = axis.toPixels(point[positionProp] || 0);
            return (pointPos - axisStart) / (axisEnd - axisStart);
        }
        /**
         * Get relative position of point on an x/y axis from 0 to 1.
         * @private
         * @param {Highcharts.Point} point
         */
        function scrollToPoint(point) {
            var xAxis = point.series.xAxis;
            var yAxis = point.series.yAxis;
            var axis = (xAxis && xAxis.scrollbar ? xAxis : yAxis);
            var scrollbar = (axis && axis.scrollbar);
            if (scrollbar && defined(scrollbar.to) && defined(scrollbar.from)) {
                var range = scrollbar.to - scrollbar.from;
                var pos = getRelativePointAxisPosition(axis,
                    point);
                scrollbar.updatePosition(pos - range / 2, pos + range / 2);
                fireEvent(scrollbar, 'changed', {
                    from: scrollbar.from,
                    to: scrollbar.to,
                    trigger: 'scrollbar',
                    DOMEvent: null
                });
            }
        }
        var ChartUtilities = {
                getChartTitle: getChartTitle,
                getAxisDescription: getAxisDescription,
                getAxisRangeDescription: getAxisRangeDescription,
                getPointFromXY: getPointFromXY,
                getSeriesFirstPointElement: getSeriesFirstPointElement,
                getSeriesFromName: getSeriesFromName,
                getSeriesA11yElement: getSeriesA11yElement,
                unhideChartElementFromAT: unhideChartElementFromAT,
                hideSeriesFromAT: hideSeriesFromAT,
                scrollToPoint: scrollToPoint
            };

        return ChartUtilities;
    });
    _registerModule(_modules, 'Accessibility/KeyboardNavigationHandler.js', [_modules['Core/Utilities.js']], function (U) {
        /* *
         *
         *  (c) 2009-2021 Øystein Moseng
         *
         *  Keyboard navigation handler base class definition
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var find = U.find;
        /**
         * Options for the keyboard navigation handler.
         *
         * @interface Highcharts.KeyboardNavigationHandlerOptionsObject
         */ /**
        * An array containing pairs of an array of keycodes, mapped to a handler
        * function. When the keycode is received, the handler is called with the
        * keycode as parameter.
        * @name Highcharts.KeyboardNavigationHandlerOptionsObject#keyCodeMap
        * @type {Array<Array<Array<number>, Function>>}
        */ /**
        * Function to run on initialization of module.
        * @name Highcharts.KeyboardNavigationHandlerOptionsObject#init
        * @type {Function}
        */ /**
        * Function to run before moving to next/prev module. Receives moving direction
        * as parameter: +1 for next, -1 for previous.
        * @name Highcharts.KeyboardNavigationHandlerOptionsObject#terminate
        * @type {Function|undefined}
        */ /**
        * Function to run to validate module. Should return false if module should not
        * run, true otherwise. Receives chart as parameter.
        * @name Highcharts.KeyboardNavigationHandlerOptionsObject#validate
        * @type {Function|undefined}
        */
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /**
         * Define a keyboard navigation handler for use with a
         * Highcharts.AccessibilityComponent instance. This functions as an abstraction
         * layer for keyboard navigation, and defines a map of keyCodes to handler
         * functions.
         *
         * @requires module:modules/accessibility
         *
         * @sample highcharts/accessibility/custom-component
         *         Custom accessibility component
         *
         * @class
         * @name Highcharts.KeyboardNavigationHandler
         *
         * @param {Highcharts.Chart} chart
         * The chart this module should act on.
         *
         * @param {Highcharts.KeyboardNavigationHandlerOptionsObject} options
         * Options for the keyboard navigation handler.
         */
        function KeyboardNavigationHandler(chart, options) {
            this.chart = chart;
            this.keyCodeMap = options.keyCodeMap || [];
            this.validate = options.validate;
            this.init = options.init;
            this.terminate = options.terminate;
            // Response enum
            this.response = {
                success: 1,
                prev: 2,
                next: 3,
                noHandler: 4,
                fail: 5 // Handler failed
            };
        }
        KeyboardNavigationHandler.prototype = {
            /**
             * Find handler function(s) for key code in the keyCodeMap and run it.
             *
             * @function KeyboardNavigationHandler#run
             * @param {global.KeyboardEvent} e
             * @return {number} Returns a response code indicating whether the run was
             *      a success/fail/unhandled, or if we should move to next/prev module.
             */
            run: function (e) {
                var keyCode = e.which || e.keyCode;
                var response = this.response.noHandler;
                var handlerCodeSet = find(this.keyCodeMap,
                    function (codeSet) {
                        return codeSet[0].indexOf(keyCode) > -1;
                });
                if (handlerCodeSet) {
                    response = handlerCodeSet[1].call(this, keyCode, e);
                }
                else if (keyCode === 9) {
                    // Default tab handler, move to next/prev module
                    response = this.response[e.shiftKey ? 'prev' : 'next'];
                }
                return response;
            }
        };

        return KeyboardNavigationHandler;
    });
    _registerModule(_modules, 'Accessibility/Utils/DOMElementProvider.js', [_modules['Core/Globals.js'], _modules['Accessibility/Utils/HTMLUtilities.js'], _modules['Core/Utilities.js']], function (H, HTMLUtilities, U) {
        /* *
         *
         *  (c) 2009-2021 Øystein Moseng
         *
         *  Class that can keep track of elements added to DOM and clean them up on
         *  destroy.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var doc = H.doc;
        var removeElement = HTMLUtilities.removeElement;
        var extend = U.extend;
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /**
         * @private
         * @class
         */
        var DOMElementProvider = function () {
                this.elements = [];
        };
        extend(DOMElementProvider.prototype, {
            /**
             * Create an element and keep track of it for later removal.
             * Same args as document.createElement
             * @private
             */
            createElement: function () {
                var el = doc.createElement.apply(doc,
                    arguments);
                this.elements.push(el);
                return el;
            },
            /**
             * Destroy all created elements, removing them from the DOM.
             * @private
             */
            destroyCreatedElements: function () {
                this.elements.forEach(function (element) {
                    removeElement(element);
                });
                this.elements = [];
            }
        });

        return DOMElementProvider;
    });
    _registerModule(_modules, 'Accessibility/Utils/EventProvider.js', [_modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (H, U) {
        /* *
         *
         *  (c) 2009-2021 Øystein Moseng
         *
         *  Class that can keep track of events added, and clean them up on destroy.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var addEvent = U.addEvent,
            extend = U.extend;
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /**
         * @private
         * @class
         */
        var EventProvider = function () {
                this.eventRemovers = [];
        };
        extend(EventProvider.prototype, {
            /**
             * Add an event to an element and keep track of it for later removal.
             * Same args as Highcharts.addEvent.
             * @private
             * @return {Function}
             */
            addEvent: function () {
                var remover = addEvent.apply(H,
                    arguments);
                this.eventRemovers.push(remover);
                return remover;
            },
            /**
             * Remove all added events.
             * @private
             * @return {void}
             */
            removeAddedEvents: function () {
                this.eventRemovers.forEach(function (remover) {
                    remover();
                });
                this.eventRemovers = [];
            }
        });

        return EventProvider;
    });
    _registerModule(_modules, 'Accessibility/AccessibilityComponent.js', [_modules['Accessibility/Utils/ChartUtilities.js'], _modules['Accessibility/Utils/DOMElementProvider.js'], _modules['Accessibility/Utils/EventProvider.js'], _modules['Core/Globals.js'], _modules['Accessibility/Utils/HTMLUtilities.js'], _modules['Core/Utilities.js']], function (ChartUtilities, DOMElementProvider, EventProvider, H, HTMLUtilities, U) {
        /* *
         *
         *  (c) 2009-2021 Øystein Moseng
         *
         *  Accessibility component class definition
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var unhideChartElementFromAT = ChartUtilities.unhideChartElementFromAT;
        var doc = H.doc,
            win = H.win;
        var removeElement = HTMLUtilities.removeElement,
            getFakeMouseEvent = HTMLUtilities.getFakeMouseEvent;
        var extend = U.extend,
            fireEvent = U.fireEvent,
            merge = U.merge;
        /* eslint-disable valid-jsdoc */
        /** @lends Highcharts.AccessibilityComponent */
        var functionsToOverrideByDerivedClasses = {
                /**
                 * Called on component initialization.
                 */
                init: function () { },
                /**
                 * Get keyboard navigation handler for this component.
                 * @return {Highcharts.KeyboardNavigationHandler}
                 */
                getKeyboardNavigation: function () { },
                /**
                 * Called on updates to the chart,
            including options changes.
                 * Note that this is also called on first render of chart.
                 */
                onChartUpdate: function () { },
                /**
                 * Called on every chart render.
                 */
                onChartRender: function () { },
                /**
                 * Called when accessibility is disabled or chart is destroyed.
                 */
                destroy: function () { }
            };
        /**
         * The AccessibilityComponent base class, representing a part of the chart that
         * has accessibility logic connected to it. This class can be inherited from to
         * create a custom accessibility component for a chart.
         *
         * Components should take care to destroy added elements and unregister event
         * handlers on destroy. This is handled automatically if using this.addEvent and
         * this.createElement.
         *
         * @sample highcharts/accessibility/custom-component
         *         Custom accessibility component
         *
         * @requires module:modules/accessibility
         * @class
         * @name Highcharts.AccessibilityComponent
         */
        function AccessibilityComponent() { }
        /**
         * @lends Highcharts.AccessibilityComponent
         */
        AccessibilityComponent.prototype = {
            /**
             * Initialize the class
             * @private
             * @param {Highcharts.Chart} chart
             *        Chart object
             */
            initBase: function (chart) {
                this.chart = chart;
                this.eventProvider = new EventProvider();
                this.domElementProvider = new DOMElementProvider();
                // Key code enum for common keys
                this.keyCodes = {
                    left: 37,
                    right: 39,
                    up: 38,
                    down: 40,
                    enter: 13,
                    space: 32,
                    esc: 27,
                    tab: 9
                };
            },
            /**
             * Add an event to an element and keep track of it for later removal.
             * See EventProvider for details.
             * @private
             */
            addEvent: function () {
                return this.eventProvider.addEvent
                    .apply(this.eventProvider, arguments);
            },
            /**
             * Create an element and keep track of it for later removal.
             * See DOMElementProvider for details.
             * @private
             */
            createElement: function () {
                return this.domElementProvider.createElement.apply(this.domElementProvider, arguments);
            },
            /**
             * Fire an event on an element that is either wrapped by Highcharts,
             * or a DOM element
             * @private
             * @param {Highcharts.HTMLElement|Highcharts.HTMLDOMElement|
             *  Highcharts.SVGDOMElement|Highcharts.SVGElement} el
             * @param {Event} eventObject
             */
            fireEventOnWrappedOrUnwrappedElement: function (el, eventObject) {
                var type = eventObject.type;
                if (doc.createEvent && (el.dispatchEvent || el.fireEvent)) {
                    if (el.dispatchEvent) {
                        el.dispatchEvent(eventObject);
                    }
                    else {
                        el.fireEvent(type, eventObject);
                    }
                }
                else {
                    fireEvent(el, type, eventObject);
                }
            },
            /**
             * Utility function to attempt to fake a click event on an element.
             * @private
             * @param {Highcharts.HTMLDOMElement|Highcharts.SVGDOMElement} element
             */
            fakeClickEvent: function (element) {
                if (element) {
                    var fakeEventObject = getFakeMouseEvent('click');
                    this.fireEventOnWrappedOrUnwrappedElement(element, fakeEventObject);
                }
            },
            /**
             * Add a new proxy group to the proxy container. Creates the proxy container
             * if it does not exist.
             * @private
             * @param {Highcharts.HTMLAttributes} [attrs]
             * The attributes to set on the new group div.
             * @return {Highcharts.HTMLDOMElement}
             * The new proxy group element.
             */
            addProxyGroup: function (attrs) {
                this.createOrUpdateProxyContainer();
                var groupDiv = this.createElement('div');
                Object.keys(attrs || {}).forEach(function (prop) {
                    if (attrs[prop] !== null) {
                        groupDiv.setAttribute(prop, attrs[prop]);
                    }
                });
                this.chart.a11yProxyContainer.appendChild(groupDiv);
                return groupDiv;
            },
            /**
             * Creates and updates DOM position of proxy container
             * @private
             */
            createOrUpdateProxyContainer: function () {
                var chart = this.chart,
                    rendererSVGEl = chart.renderer.box;
                chart.a11yProxyContainer = chart.a11yProxyContainer ||
                    this.createProxyContainerElement();
                if (rendererSVGEl.nextSibling !== chart.a11yProxyContainer) {
                    chart.container.insertBefore(chart.a11yProxyContainer, rendererSVGEl.nextSibling);
                }
            },
            /**
             * @private
             * @return {Highcharts.HTMLDOMElement} element
             */
            createProxyContainerElement: function () {
                var pc = doc.createElement('div');
                pc.className = 'highcharts-a11y-proxy-container';
                return pc;
            },
            /**
             * Create an invisible proxy HTML button in the same position as an SVG
             * element
             * @private
             * @param {Highcharts.SVGElement} svgElement
             * The wrapped svg el to proxy.
             * @param {Highcharts.HTMLDOMElement} parentGroup
             * The proxy group element in the proxy container to add this button to.
             * @param {Highcharts.SVGAttributes} [attributes]
             * Additional attributes to set.
             * @param {Highcharts.SVGElement} [posElement]
             * Element to use for positioning instead of svgElement.
             * @param {Function} [preClickEvent]
             * Function to call before click event fires.
             *
             * @return {Highcharts.HTMLDOMElement} The proxy button.
             */
            createProxyButton: function (svgElement, parentGroup, attributes, posElement, preClickEvent) {
                var svgEl = svgElement.element,
                    proxy = this.createElement('button'),
                    attrs = merge({
                        'aria-label': svgEl.getAttribute('aria-label')
                    },
                    attributes);
                Object.keys(attrs).forEach(function (prop) {
                    if (attrs[prop] !== null) {
                        proxy.setAttribute(prop, attrs[prop]);
                    }
                });
                proxy.className = 'highcharts-a11y-proxy-button';
                if (svgElement.hasClass('highcharts-no-tooltip')) {
                    proxy.className += ' highcharts-no-tooltip';
                }
                if (preClickEvent) {
                    this.addEvent(proxy, 'click', preClickEvent);
                }
                this.setProxyButtonStyle(proxy);
                this.updateProxyButtonPosition(proxy, posElement || svgElement);
                this.proxyMouseEventsForButton(svgEl, proxy);
                // Add to chart div and unhide from screen readers
                parentGroup.appendChild(proxy);
                if (!attrs['aria-hidden']) {
                    unhideChartElementFromAT(this.chart, proxy);
                }
                return proxy;
            },
            /**
             * Get the position relative to chart container for a wrapped SVG element.
             * @private
             * @param {Highcharts.SVGElement} element
             * The element to calculate position for.
             * @return {Highcharts.BBoxObject}
             * Object with x and y props for the position.
             */
            getElementPosition: function (element) {
                var el = element.element,
                    div = this.chart.renderTo;
                if (div && el && el.getBoundingClientRect) {
                    var rectEl = el.getBoundingClientRect(),
                        rectDiv = div.getBoundingClientRect();
                    return {
                        x: rectEl.left - rectDiv.left,
                        y: rectEl.top - rectDiv.top,
                        width: rectEl.right - rectEl.left,
                        height: rectEl.bottom - rectEl.top
                    };
                }
                return { x: 0, y: 0, width: 1, height: 1 };
            },
            /**
             * @private
             * @param {Highcharts.HTMLElement} button The proxy element.
             */
            setProxyButtonStyle: function (button) {
                merge(true, button.style, {
                    borderWidth: '0',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    outline: 'none',
                    opacity: '0.001',
                    filter: 'alpha(opacity=1)',
                    zIndex: '999',
                    overflow: 'hidden',
                    padding: '0',
                    margin: '0',
                    display: 'block',
                    position: 'absolute'
                });
                button.style['-ms-filter'] =
                    'progid:DXImageTransform.Microsoft.Alpha(Opacity=1)';
            },
            /**
             * @private
             * @param {Highcharts.HTMLElement} proxy The proxy to update position of.
             * @param {Highcharts.SVGElement} posElement The element to overlay and take position from.
             */
            updateProxyButtonPosition: function (proxy, posElement) {
                var bBox = this.getElementPosition(posElement);
                merge(true, proxy.style, {
                    width: (bBox.width || 1) + 'px',
                    height: (bBox.height || 1) + 'px',
                    left: (Math.round(bBox.x) || 0) + 'px',
                    top: (Math.round(bBox.y) || 0) + 'px'
                });
            },
            /**
             * @private
             * @param {Highcharts.HTMLElement|Highcharts.HTMLDOMElement|
             *  Highcharts.SVGDOMElement|Highcharts.SVGElement} source
             * @param {Highcharts.HTMLElement} button
             */
            proxyMouseEventsForButton: function (source, button) {
                var component = this;
                [
                    'click', 'touchstart', 'touchend', 'touchcancel', 'touchmove',
                    'mouseover', 'mouseenter', 'mouseleave', 'mouseout'
                ].forEach(function (evtType) {
                    var isTouchEvent = evtType.indexOf('touch') === 0;
                    component.addEvent(button, evtType, function (e) {
                        var clonedEvent = isTouchEvent ?
                                component.cloneTouchEvent(e) :
                                component.cloneMouseEvent(e);
                        if (source) {
                            component.fireEventOnWrappedOrUnwrappedElement(source, clonedEvent);
                        }
                        e.stopPropagation();
                        // #9682, #15318: Touch scrolling didnt work when touching a
                        // component
                        if (evtType !== 'touchstart' && evtType !== 'touchmove' && evtType !== 'touchend') {
                            e.preventDefault();
                        }
                    }, { passive: false });
                });
            },
            /**
             * Utility function to clone a mouse event for re-dispatching.
             * @private
             * @param {global.MouseEvent} e The event to clone.
             * @return {global.MouseEvent} The cloned event
             */
            cloneMouseEvent: function (e) {
                if (typeof win.MouseEvent === 'function') {
                    return new win.MouseEvent(e.type, e);
                }
                // No MouseEvent support, try using initMouseEvent
                if (doc.createEvent) {
                    var evt = doc.createEvent('MouseEvent');
                    if (evt.initMouseEvent) {
                        evt.initMouseEvent(e.type, e.bubbles, // #10561, #12161
                        e.cancelable, e.view || win, e.detail, e.screenX, e.screenY, e.clientX, e.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, e.button, e.relatedTarget);
                        return evt;
                    }
                }
                return getFakeMouseEvent(e.type);
            },
            /**
             * Utility function to clone a touch event for re-dispatching.
             * @private
             * @param {global.TouchEvent} e The event to clone.
             * @return {global.TouchEvent} The cloned event
             */
            cloneTouchEvent: function (e) {
                var touchListToTouchArray = function (l) {
                        var touchArray = [];
                    for (var i = 0; i < l.length; ++i) {
                        var item = l.item(i);
                        if (item) {
                            touchArray.push(item);
                        }
                    }
                    return touchArray;
                };
                if (typeof win.TouchEvent === 'function') {
                    var newEvent = new win.TouchEvent(e.type, {
                            touches: touchListToTouchArray(e.touches),
                            targetTouches: touchListToTouchArray(e.targetTouches),
                            changedTouches: touchListToTouchArray(e.changedTouches),
                            ctrlKey: e.ctrlKey,
                            shiftKey: e.shiftKey,
                            altKey: e.altKey,
                            metaKey: e.metaKey,
                            bubbles: e.bubbles,
                            cancelable: e.cancelable,
                            composed: e.composed,
                            detail: e.detail,
                            view: e.view
                        });
                    if (e.defaultPrevented) {
                        newEvent.preventDefault();
                    }
                    return newEvent;
                }
                // Fallback to mouse event
                var fakeEvt = this.cloneMouseEvent(e);
                fakeEvt.touches = e.touches;
                fakeEvt.changedTouches = e.changedTouches;
                fakeEvt.targetTouches = e.targetTouches;
                return fakeEvt;
            },
            /**
             * Remove traces of the component.
             * @private
             */
            destroyBase: function () {
                removeElement(this.chart.a11yProxyContainer);
                this.domElementProvider.destroyCreatedElements();
                this.eventProvider.removeAddedEvents();
            }
        };
        extend(AccessibilityComponent.prototype, functionsToOverrideByDerivedClasses);

        return AccessibilityComponent;
    });
    _registerModule(_modules, 'Accessibility/KeyboardNavigation.js', [_modules['Core/Chart/Chart.js'], _modules['Core/Globals.js'], _modules['Core/Utilities.js'], _modules['Accessibility/Utils/HTMLUtilities.js'], _modules['Accessibility/Utils/EventProvider.js']], function (Chart, H, U, HTMLUtilities, EventProvider) {
        /* *
         *
         *  (c) 2009-2021 Øystein Moseng
         *
         *  Main keyboard navigation handling.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var doc = H.doc,
            win = H.win;
        var addEvent = U.addEvent,
            fireEvent = U.fireEvent;
        var getElement = HTMLUtilities.getElement;
        /* eslint-disable valid-jsdoc */
        // Add event listener to document to detect ESC key press and dismiss
        // hover/popup content.
        addEvent(doc, 'keydown', function (e) {
            var keycode = e.which || e.keyCode;
            var esc = 27;
            if (keycode === esc && H.charts) {
                H.charts.forEach(function (chart) {
                    if (chart && chart.dismissPopupContent) {
                        chart.dismissPopupContent();
                    }
                });
            }
        });
        /**
         * Dismiss popup content in chart, including export menu and tooltip.
         */
        Chart.prototype.dismissPopupContent = function () {
            var chart = this;
            fireEvent(this, 'dismissPopupContent', {}, function () {
                if (chart.tooltip) {
                    chart.tooltip.hide(0);
                }
                chart.hideExportMenu();
            });
        };
        /**
         * The KeyboardNavigation class, containing the overall keyboard navigation
         * logic for the chart.
         *
         * @requires module:modules/accessibility
         *
         * @private
         * @class
         * @param {Highcharts.Chart} chart
         *        Chart object
         * @param {object} components
         *        Map of component names to AccessibilityComponent objects.
         * @name Highcharts.KeyboardNavigation
         */
        function KeyboardNavigation(chart, components) {
            this.init(chart, components);
        }
        KeyboardNavigation.prototype = {
            /**
             * Initialize the class
             * @private
             * @param {Highcharts.Chart} chart
             *        Chart object
             * @param {object} components
             *        Map of component names to AccessibilityComponent objects.
             */
            init: function (chart, components) {
                var _this = this;
                var ep = this.eventProvider = new EventProvider();
                this.chart = chart;
                this.components = components;
                this.modules = [];
                this.currentModuleIx = 0;
                // Run an update to get all modules
                this.update();
                ep.addEvent(this.tabindexContainer, 'keydown', function (e) { return _this.onKeydown(e); });
                ep.addEvent(this.tabindexContainer, 'focus', function (e) { return _this.onFocus(e); });
                ['mouseup', 'touchend'].forEach(function (eventName) {
                    return ep.addEvent(doc, eventName, function () { return _this.onMouseUp(); });
                });
                ['mousedown', 'touchstart'].forEach(function (eventName) {
                    return ep.addEvent(chart.renderTo, eventName, function () {
                        _this.isClickingChart = true;
                    });
                });
                ep.addEvent(chart.renderTo, 'mouseover', function () {
                    _this.pointerIsOverChart = true;
                });
                ep.addEvent(chart.renderTo, 'mouseout', function () {
                    _this.pointerIsOverChart = false;
                });
                // Init first module
                if (this.modules.length) {
                    this.modules[0].init(1);
                }
            },
            /**
             * Update the modules for the keyboard navigation.
             * @param {Array<string>} [order]
             *        Array specifying the tab order of the components.
             */
            update: function (order) {
                var a11yOptions = this.chart.options.accessibility,
                    keyboardOptions = a11yOptions && a11yOptions.keyboardNavigation,
                    components = this.components;
                this.updateContainerTabindex();
                if (keyboardOptions &&
                    keyboardOptions.enabled &&
                    order &&
                    order.length) {
                    // We (still) have keyboard navigation. Update module list
                    this.modules = order.reduce(function (modules, componentName) {
                        var navModules = components[componentName].getKeyboardNavigation();
                        return modules.concat(navModules);
                    }, []);
                    this.updateExitAnchor();
                }
                else {
                    this.modules = [];
                    this.currentModuleIx = 0;
                    this.removeExitAnchor();
                }
            },
            /**
             * Function to run on container focus
             * @private
             * @param {global.FocusEvent} e Browser focus event.
             */
            onFocus: function (e) {
                var chart = this.chart;
                var focusComesFromChart = (e.relatedTarget &&
                        chart.container.contains(e.relatedTarget));
                // Init keyboard nav if tabbing into chart
                if (!this.exiting &&
                    !this.tabbingInBackwards &&
                    !this.isClickingChart &&
                    !focusComesFromChart &&
                    this.modules[0]) {
                    this.modules[0].init(1);
                }
                this.exiting = false;
            },
            /**
             * Reset chart navigation state if we click outside the chart and it's
             * not already reset.
             * @private
             */
            onMouseUp: function () {
                delete this.isClickingChart;
                if (!this.keyboardReset && !this.pointerIsOverChart) {
                    var chart = this.chart,
                        curMod = this.modules &&
                            this.modules[this.currentModuleIx || 0];
                    if (curMod && curMod.terminate) {
                        curMod.terminate();
                    }
                    if (chart.focusElement) {
                        chart.focusElement.removeFocusBorder();
                    }
                    this.currentModuleIx = 0;
                    this.keyboardReset = true;
                }
            },
            /**
             * Function to run on keydown
             * @private
             * @param {global.KeyboardEvent} ev Browser keydown event.
             */
            onKeydown: function (ev) {
                var e = ev || win.event,
                    preventDefault,
                    curNavModule = this.modules && this.modules.length &&
                        this.modules[this.currentModuleIx];
                // Used for resetting nav state when clicking outside chart
                this.keyboardReset = false;
                // Used for sending focus out of the chart by the modules.
                this.exiting = false;
                // If there is a nav module for the current index, run it.
                // Otherwise, we are outside of the chart in some direction.
                if (curNavModule) {
                    var response = curNavModule.run(e);
                    if (response === curNavModule.response.success) {
                        preventDefault = true;
                    }
                    else if (response === curNavModule.response.prev) {
                        preventDefault = this.prev();
                    }
                    else if (response === curNavModule.response.next) {
                        preventDefault = this.next();
                    }
                    if (preventDefault) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }
            },
            /**
             * Go to previous module.
             * @private
             */
            prev: function () {
                return this.move(-1);
            },
            /**
             * Go to next module.
             * @private
             */
            next: function () {
                return this.move(1);
            },
            /**
             * Move to prev/next module.
             * @private
             * @param {number} direction
             * Direction to move. +1 for next, -1 for prev.
             * @return {boolean}
             * True if there was a valid module in direction.
             */
            move: function (direction) {
                var curModule = this.modules && this.modules[this.currentModuleIx];
                if (curModule && curModule.terminate) {
                    curModule.terminate(direction);
                }
                // Remove existing focus border if any
                if (this.chart.focusElement) {
                    this.chart.focusElement.removeFocusBorder();
                }
                this.currentModuleIx += direction;
                var newModule = this.modules && this.modules[this.currentModuleIx];
                if (newModule) {
                    if (newModule.validate && !newModule.validate()) {
                        return this.move(direction); // Invalid module, recurse
                    }
                    if (newModule.init) {
                        newModule.init(direction); // Valid module, init it
                        return true;
                    }
                }
                // No module
                this.currentModuleIx = 0; // Reset counter
                // Set focus to chart or exit anchor depending on direction
                this.exiting = true;
                if (direction > 0) {
                    this.exitAnchor.focus();
                }
                else {
                    this.tabindexContainer.focus();
                }
                return false;
            },
            /**
             * We use an exit anchor to move focus out of chart whenever we want, by
             * setting focus to this div and not preventing the default tab action. We
             * also use this when users come back into the chart by tabbing back, in
             * order to navigate from the end of the chart.
             * @private
             */
            updateExitAnchor: function () {
                var endMarkerId = 'highcharts-end-of-chart-marker-' + this.chart.index,
                    endMarker = getElement(endMarkerId);
                this.removeExitAnchor();
                if (endMarker) {
                    this.makeElementAnExitAnchor(endMarker);
                    this.exitAnchor = endMarker;
                }
                else {
                    this.createExitAnchor();
                }
            },
            /**
             * Chart container should have tabindex if navigation is enabled.
             * @private
             */
            updateContainerTabindex: function () {
                var a11yOptions = this.chart.options.accessibility,
                    keyboardOptions = a11yOptions && a11yOptions.keyboardNavigation,
                    shouldHaveTabindex = !(keyboardOptions && keyboardOptions.enabled === false),
                    chart = this.chart,
                    container = chart.container;
                var tabindexContainer;
                if (chart.renderTo.hasAttribute('tabindex')) {
                    container.removeAttribute('tabindex');
                    tabindexContainer = chart.renderTo;
                }
                else {
                    tabindexContainer = container;
                }
                this.tabindexContainer = tabindexContainer;
                var curTabindex = tabindexContainer.getAttribute('tabindex');
                if (shouldHaveTabindex && !curTabindex) {
                    tabindexContainer.setAttribute('tabindex', '0');
                }
                else if (!shouldHaveTabindex) {
                    chart.container.removeAttribute('tabindex');
                }
            },
            /**
             * @private
             */
            makeElementAnExitAnchor: function (el) {
                var chartTabindex = this.tabindexContainer.getAttribute('tabindex') || 0;
                el.setAttribute('class', 'highcharts-exit-anchor');
                el.setAttribute('tabindex', chartTabindex);
                el.setAttribute('aria-hidden', false);
                // Handle focus
                this.addExitAnchorEventsToEl(el);
            },
            /**
             * Add new exit anchor to the chart.
             *
             * @private
             */
            createExitAnchor: function () {
                var chart = this.chart,
                    exitAnchor = this.exitAnchor = doc.createElement('div');
                chart.renderTo.appendChild(exitAnchor);
                this.makeElementAnExitAnchor(exitAnchor);
            },
            /**
             * @private
             */
            removeExitAnchor: function () {
                if (this.exitAnchor && this.exitAnchor.parentNode) {
                    this.exitAnchor.parentNode
                        .removeChild(this.exitAnchor);
                    delete this.exitAnchor;
                }
            },
            /**
             * @private
             */
            addExitAnchorEventsToEl: function (element) {
                var chart = this.chart,
                    keyboardNavigation = this;
                this.eventProvider.addEvent(element, 'focus', function (ev) {
                    var e = ev || win.event,
                        curModule,
                        focusComesFromChart = (e.relatedTarget &&
                            chart.container.contains(e.relatedTarget)),
                        comingInBackwards = !(focusComesFromChart || keyboardNavigation.exiting);
                    if (comingInBackwards) {
                        // Focus the container instead
                        keyboardNavigation.tabbingInBackwards = true;
                        keyboardNavigation.tabindexContainer.focus();
                        delete keyboardNavigation.tabbingInBackwards;
                        e.preventDefault();
                        // Move to last valid keyboard nav module
                        // Note the we don't run it, just set the index
                        if (keyboardNavigation.modules &&
                            keyboardNavigation.modules.length) {
                            keyboardNavigation.currentModuleIx =
                                keyboardNavigation.modules.length - 1;
                            curModule = keyboardNavigation.modules[keyboardNavigation.currentModuleIx];
                            // Validate the module
                            if (curModule &&
                                curModule.validate && !curModule.validate()) {
                                // Invalid. Try moving backwards to find next valid.
                                keyboardNavigation.prev();
                            }
                            else if (curModule) {
                                // We have a valid module, init it
                                curModule.init(-1);
                            }
                        }
                    }
                    else {
                        // Don't skip the next focus, we only skip once.
                        keyboardNavigation.exiting = false;
                    }
                });
            },
            /**
             * Remove all traces of keyboard navigation.
             * @private
             */
            destroy: function () {
                this.removeExitAnchor();
                this.eventProvider.removeAddedEvents();
                this.chart.container.removeAttribute('tabindex');
            }
        };

        return KeyboardNavigation;
    });
    _registerModule(_modules, 'Accessibility/Components/LegendComponent.js', [_modules['Core/Animation/AnimationUtilities.js'], _modules['Core/Chart/Chart.js'], _modules['Core/Globals.js'], _modules['Core/Legend/Legend.js'], _modules['Core/Utilities.js'], _modules['Accessibility/AccessibilityComponent.js'], _modules['Accessibility/KeyboardNavigationHandler.js'], _modules['Accessibility/Utils/HTMLUtilities.js'], _modules['Accessibility/Utils/ChartUtilities.js']], function (A, Chart, H, Legend, U, AccessibilityComponent, KeyboardNavigationHandler, HTMLUtilities, ChartUtils) {
        /* *
         *
         *  (c) 2009-2021 Øystein Moseng
         *
         *  Accessibility component for chart legend.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var animObject = A.animObject;
        var addEvent = U.addEvent,
            extend = U.extend,
            find = U.find,
            fireEvent = U.fireEvent,
            isNumber = U.isNumber,
            pick = U.pick,
            syncTimeout = U.syncTimeout;
        var removeElement = HTMLUtilities.removeElement,
            stripHTMLTags = HTMLUtilities.stripHTMLTagsFromString;
        var getChartTitle = ChartUtils.getChartTitle;
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /**
         * @private
         */
        function scrollLegendToItem(legend, itemIx) {
            var itemPage = legend.allItems[itemIx].pageIx,
                curPage = legend.currentPage;
            if (typeof itemPage !== 'undefined' && itemPage + 1 !== curPage) {
                legend.scroll(1 + itemPage - curPage);
            }
        }
        /**
         * @private
         */
        function shouldDoLegendA11y(chart) {
            var items = chart.legend && chart.legend.allItems,
                legendA11yOptions = (chart.options.legend.accessibility || {});
            return !!(items && items.length &&
                !(chart.colorAxis && chart.colorAxis.length) &&
                legendA11yOptions.enabled !== false);
        }
        /**
         * Highlight legend item by index.
         *
         * @private
         * @function Highcharts.Chart#highlightLegendItem
         *
         * @param {number} ix
         *
         * @return {boolean}
         */
        Chart.prototype.highlightLegendItem = function (ix) {
            var items = this.legend.allItems,
                oldIx = this.accessibility &&
                    this.accessibility.components.legend.highlightedLegendItemIx;
            if (items[ix]) {
                if (isNumber(oldIx) && items[oldIx]) {
                    fireEvent(items[oldIx].legendGroup.element, 'mouseout');
                }
                scrollLegendToItem(this.legend, ix);
                this.setFocusToElement(items[ix].legendItem, items[ix].a11yProxyElement);
                fireEvent(items[ix].legendGroup.element, 'mouseover');
                return true;
            }
            return false;
        };
        // Keep track of pressed state for legend items
        addEvent(Legend, 'afterColorizeItem', function (e) {
            var chart = this.chart,
                a11yOptions = chart.options.accessibility,
                legendItem = e.item;
            if (a11yOptions.enabled && legendItem && legendItem.a11yProxyElement) {
                legendItem.a11yProxyElement.setAttribute('aria-pressed', e.visible ? 'true' : 'false');
            }
        });
        /**
         * The LegendComponent class
         *
         * @private
         * @class
         * @name Highcharts.LegendComponent
         */
        var LegendComponent = function () { };
        LegendComponent.prototype = new AccessibilityComponent();
        extend(LegendComponent.prototype, /** @lends Highcharts.LegendComponent */ {
            /**
             * Init the component
             * @private
             */
            init: function () {
                var component = this;
                this.proxyElementsList = [];
                this.recreateProxies();
                // Note: Chart could create legend dynamically, so events can not be
                // tied to the component's chart's current legend.
                this.addEvent(Legend, 'afterScroll', function () {
                    if (this.chart === component.chart) {
                        component.updateProxiesPositions();
                        component.updateLegendItemProxyVisibility();
                        this.chart.highlightLegendItem(component.highlightedLegendItemIx);
                    }
                });
                this.addEvent(Legend, 'afterPositionItem', function (e) {
                    if (this.chart === component.chart && this.chart.renderer) {
                        component.updateProxyPositionForItem(e.item);
                    }
                });
                this.addEvent(Legend, 'afterRender', function () {
                    if (this.chart === component.chart &&
                        this.chart.renderer &&
                        component.recreateProxies()) {
                        syncTimeout(function () { return component.updateProxiesPositions(); }, animObject(pick(this.chart.renderer.globalAnimation, true)).duration);
                    }
                });
            },
            /**
             * @private
             */
            updateLegendItemProxyVisibility: function () {
                var legend = this.chart.legend,
                    items = legend.allItems || [],
                    curPage = legend.currentPage || 1,
                    clipHeight = legend.clipHeight || 0;
                items.forEach(function (item) {
                    var itemPage = item.pageIx || 0,
                        y = item._legendItemPos ? item._legendItemPos[1] : 0,
                        h = item.legendItem ? Math.round(item.legendItem.getBBox().height) : 0,
                        hide = y + h - legend.pages[itemPage] > clipHeight || itemPage !== curPage - 1;
                    if (item.a11yProxyElement) {
                        item.a11yProxyElement.style.visibility = hide ?
                            'hidden' : 'visible';
                    }
                });
            },
            /**
             * The legend needs updates on every render, in order to update positioning
             * of the proxy overlays.
             */
            onChartRender: function () {
                if (!shouldDoLegendA11y(this.chart)) {
                    this.removeProxies();
                }
            },
            /**
             * @private
             */
            onChartUpdate: function () {
                this.updateLegendTitle();
            },
            /**
             * @private
             */
            updateProxiesPositions: function () {
                for (var _i = 0, _a = this.proxyElementsList; _i < _a.length; _i++) {
                    var _b = _a[_i],
                        element = _b.element,
                        posElement = _b.posElement;
                    this.updateProxyButtonPosition(element, posElement);
                }
            },
            /**
             * @private
             */
            updateProxyPositionForItem: function (item) {
                var proxyRef = find(this.proxyElementsList,
                    function (ref) { return ref.item === item; });
                if (proxyRef) {
                    this.updateProxyButtonPosition(proxyRef.element, proxyRef.posElement);
                }
            },
            /**
             * @private
             */
            recreateProxies: function () {
                this.removeProxies();
                if (shouldDoLegendA11y(this.chart)) {
                    this.addLegendProxyGroup();
                    this.addLegendListContainer();
                    this.proxyLegendItems();
                    this.updateLegendItemProxyVisibility();
                    return true;
                }
                return false;
            },
            /**
             * @private
             */
            removeProxies: function () {
                removeElement(this.legendProxyGroup);
                this.proxyElementsList = [];
            },
            /**
             * @private
             */
            updateLegendTitle: function () {
                var chart = this.chart;
                var legendTitle = stripHTMLTags((chart.legend &&
                        chart.legend.options.title &&
                        chart.legend.options.title.text ||
                        '').replace(/<br ?\/?>/g, ' '));
                var legendLabel = chart.langFormat('accessibility.legend.legendLabel' + (legendTitle ? '' : 'NoTitle'), {
                        chart: chart,
                        legendTitle: legendTitle,
                        chartTitle: getChartTitle(chart)
                    });
                if (this.legendProxyGroup) {
                    this.legendProxyGroup.setAttribute('aria-label', legendLabel);
                }
            },
            /**
             * @private
             */
            addLegendProxyGroup: function () {
                var a11yOptions = this.chart.options.accessibility,
                    groupRole = a11yOptions.landmarkVerbosity === 'all' ?
                        'region' : null;
                this.legendProxyGroup = this.addProxyGroup({
                    'aria-label': '_placeholder_',
                    role: groupRole
                });
            },
            /**
             * @private
             */
            addLegendListContainer: function () {
                if (this.legendProxyGroup) {
                    var container = this.legendListContainer = this.createElement('ul');
                    container.style.listStyle = 'none';
                    this.legendProxyGroup.appendChild(container);
                }
            },
            /**
             * @private
             */
            proxyLegendItems: function () {
                var component = this,
                    items = (this.chart.legend &&
                        this.chart.legend.allItems || []);
                items.forEach(function (item) {
                    if (item.legendItem && item.legendItem.element) {
                        component.proxyLegendItem(item);
                    }
                });
            },
            /**
             * @private
             * @param {Highcharts.BubbleLegendItem|Point|Highcharts.Series} item
             */
            proxyLegendItem: function (item) {
                if (!item.legendItem || !item.legendGroup || !this.legendListContainer) {
                    return;
                }
                var itemLabel = this.chart.langFormat('accessibility.legend.legendItem', {
                        chart: this.chart,
                        itemName: stripHTMLTags(item.name),
                        item: item
                    }),
                    attribs = {
                        tabindex: -1,
                        'aria-pressed': item.visible,
                        'aria-label': itemLabel
                    }, 
                    // Considers useHTML
                    proxyPositioningElement = item.legendGroup.div ?
                        item.legendItem : item.legendGroup;
                var listItem = this.createElement('li');
                this.legendListContainer.appendChild(listItem);
                item.a11yProxyElement = this.createProxyButton(item.legendItem, listItem, attribs, proxyPositioningElement);
                this.proxyElementsList.push({
                    item: item,
                    element: item.a11yProxyElement,
                    posElement: proxyPositioningElement
                });
            },
            /**
             * Get keyboard navigation handler for this component.
             * @return {Highcharts.KeyboardNavigationHandler}
             */
            getKeyboardNavigation: function () {
                var keys = this.keyCodes,
                    component = this,
                    chart = this.chart;
                return new KeyboardNavigationHandler(chart, {
                    keyCodeMap: [
                        [
                            [keys.left, keys.right, keys.up, keys.down],
                            function (keyCode) {
                                return component.onKbdArrowKey(this, keyCode);
                            }
                        ],
                        [
                            [keys.enter, keys.space],
                            function (keyCode) {
                                if (H.isFirefox && keyCode === keys.space) { // #15520
                                    return this.response.success;
                                }
                                return component.onKbdClick(this);
                            }
                        ]
                    ],
                    validate: function () {
                        return component.shouldHaveLegendNavigation();
                    },
                    init: function (direction) {
                        return component.onKbdNavigationInit(direction);
                    },
                    terminate: function () {
                        chart.legend.allItems.forEach(function (item) { return item.setState('', true); });
                    }
                });
            },
            /**
             * @private
             * @param {Highcharts.KeyboardNavigationHandler} keyboardNavigationHandler
             * @param {number} keyCode
             * @return {number}
             * Response code
             */
            onKbdArrowKey: function (keyboardNavigationHandler, keyCode) {
                var keys = this.keyCodes,
                    response = keyboardNavigationHandler.response,
                    chart = this.chart,
                    a11yOptions = chart.options.accessibility,
                    numItems = chart.legend.allItems.length,
                    direction = (keyCode === keys.left || keyCode === keys.up) ? -1 : 1;
                var res = chart.highlightLegendItem(this.highlightedLegendItemIx + direction);
                if (res) {
                    this.highlightedLegendItemIx += direction;
                    return response.success;
                }
                if (numItems > 1 &&
                    a11yOptions.keyboardNavigation.wrapAround) {
                    keyboardNavigationHandler.init(direction);
                    return response.success;
                }
                // No wrap, move
                return response[direction > 0 ? 'next' : 'prev'];
            },
            /**
             * @private
             * @param {Highcharts.KeyboardNavigationHandler} keyboardNavigationHandler
             * @return {number}
             * Response code
             */
            onKbdClick: function (keyboardNavigationHandler) {
                var legendItem = this.chart.legend.allItems[this.highlightedLegendItemIx];
                if (legendItem && legendItem.a11yProxyElement) {
                    fireEvent(legendItem.a11yProxyElement, 'click');
                }
                return keyboardNavigationHandler.response.success;
            },
            /**
             * @private
             * @return {boolean|undefined}
             */
            shouldHaveLegendNavigation: function () {
                var chart = this.chart,
                    legendOptions = chart.options.legend || {},
                    hasLegend = chart.legend && chart.legend.allItems,
                    hasColorAxis = chart.colorAxis && chart.colorAxis.length,
                    legendA11yOptions = (legendOptions.accessibility || {});
                return !!(hasLegend &&
                    chart.legend.display &&
                    !hasColorAxis &&
                    legendA11yOptions.enabled &&
                    legendA11yOptions.keyboardNavigation &&
                    legendA11yOptions.keyboardNavigation.enabled);
            },
            /**
             * @private
             * @param {number} direction
             */
            onKbdNavigationInit: function (direction) {
                var chart = this.chart,
                    lastIx = chart.legend.allItems.length - 1,
                    ixToHighlight = direction > 0 ? 0 : lastIx;
                chart.highlightLegendItem(ixToHighlight);
                this.highlightedLegendItemIx = ixToHighlight;
            }
        });

        return LegendComponent;
    });
    _registerModule(_modules, 'Accessibility/Components/MenuComponent.js', [_modules['Core/Chart/Chart.js'], _modules['Core/Utilities.js'], _modules['Accessibility/AccessibilityComponent.js'], _modules['Accessibility/KeyboardNavigationHandler.js'], _modules['Accessibility/Utils/ChartUtilities.js'], _modules['Accessibility/Utils/HTMLUtilities.js']], function (Chart, U, AccessibilityComponent, KeyboardNavigationHandler, ChartUtilities, HTMLUtilities) {
        /* *
         *
         *  (c) 2009-2021 Øystein Moseng
         *
         *  Accessibility component for exporting menu.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var extend = U.extend;
        var getChartTitle = ChartUtilities.getChartTitle,
            unhideChartElementFromAT = ChartUtilities.unhideChartElementFromAT;
        var removeElement = HTMLUtilities.removeElement,
            getFakeMouseEvent = HTMLUtilities.getFakeMouseEvent;
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /**
         * Get the wrapped export button element of a chart.
         *
         * @private
         * @param {Highcharts.Chart} chart
         * @returns {Highcharts.SVGElement}
         */
        function getExportMenuButtonElement(chart) {
            return chart.exportSVGElements && chart.exportSVGElements[0];
        }
        /**
         * Show the export menu and focus the first item (if exists).
         *
         * @private
         * @function Highcharts.Chart#showExportMenu
         */
        Chart.prototype.showExportMenu = function () {
            var exportButton = getExportMenuButtonElement(this);
            if (exportButton) {
                var el = exportButton.element;
                if (el.onclick) {
                    el.onclick(getFakeMouseEvent('click'));
                }
            }
        };
        /**
         * @private
         * @function Highcharts.Chart#hideExportMenu
         */
        Chart.prototype.hideExportMenu = function () {
            var chart = this,
                exportList = chart.exportDivElements;
            if (exportList && chart.exportContextMenu) {
                // Reset hover states etc.
                exportList.forEach(function (el) {
                    if (el &&
                        el.className === 'highcharts-menu-item' &&
                        el.onmouseout) {
                        el.onmouseout(getFakeMouseEvent('mouseout'));
                    }
                });
                chart.highlightedExportItemIx = 0;
                // Hide the menu div
                chart.exportContextMenu.hideMenu();
                // Make sure the chart has focus and can capture keyboard events
                chart.container.focus();
            }
        };
        /**
         * Highlight export menu item by index.
         *
         * @private
         * @function Highcharts.Chart#highlightExportItem
         *
         * @param {number} ix
         *
         * @return {boolean}
         */
        Chart.prototype.highlightExportItem = function (ix) {
            var listItem = this.exportDivElements && this.exportDivElements[ix],
                curHighlighted = this.exportDivElements &&
                    this.exportDivElements[this.highlightedExportItemIx],
                hasSVGFocusSupport;
            if (listItem &&
                listItem.tagName === 'LI' &&
                !(listItem.children && listItem.children.length)) {
                // Test if we have focus support for SVG elements
                hasSVGFocusSupport = !!(this.renderTo.getElementsByTagName('g')[0] || {}).focus;
                // Only focus if we can set focus back to the elements after
                // destroying the menu (#7422)
                if (listItem.focus && hasSVGFocusSupport) {
                    listItem.focus();
                }
                if (curHighlighted && curHighlighted.onmouseout) {
                    curHighlighted.onmouseout(getFakeMouseEvent('mouseout'));
                }
                if (listItem.onmouseover) {
                    listItem.onmouseover(getFakeMouseEvent('mouseover'));
                }
                this.highlightedExportItemIx = ix;
                return true;
            }
            return false;
        };
        /**
         * Try to highlight the last valid export menu item.
         *
         * @private
         * @function Highcharts.Chart#highlightLastExportItem
         * @return {boolean}
         */
        Chart.prototype.highlightLastExportItem = function () {
            var chart = this,
                i;
            if (chart.exportDivElements) {
                i = chart.exportDivElements.length;
                while (i--) {
                    if (chart.highlightExportItem(i)) {
                        return true;
                    }
                }
            }
            return false;
        };
        /**
         * @private
         * @param {Highcharts.Chart} chart
         */
        function exportingShouldHaveA11y(chart) {
            var exportingOpts = chart.options.exporting,
                exportButton = getExportMenuButtonElement(chart);
            return !!(exportingOpts &&
                exportingOpts.enabled !== false &&
                exportingOpts.accessibility &&
                exportingOpts.accessibility.enabled &&
                exportButton &&
                exportButton.element);
        }
        /**
         * The MenuComponent class
         *
         * @private
         * @class
         * @name Highcharts.MenuComponent
         */
        var MenuComponent = function () { };
        MenuComponent.prototype = new AccessibilityComponent();
        extend(MenuComponent.prototype, /** @lends Highcharts.MenuComponent */ {
            /**
             * Init the component
             */
            init: function () {
                var chart = this.chart,
                    component = this;
                this.addEvent(chart, 'exportMenuShown', function () {
                    component.onMenuShown();
                });
                this.addEvent(chart, 'exportMenuHidden', function () {
                    component.onMenuHidden();
                });
            },
            /**
             * @private
             */
            onMenuHidden: function () {
                var menu = this.chart.exportContextMenu;
                if (menu) {
                    menu.setAttribute('aria-hidden', 'true');
                }
                this.isExportMenuShown = false;
                this.setExportButtonExpandedState('false');
            },
            /**
             * @private
             */
            onMenuShown: function () {
                var chart = this.chart,
                    menu = chart.exportContextMenu;
                if (menu) {
                    this.addAccessibleContextMenuAttribs();
                    unhideChartElementFromAT(chart, menu);
                }
                this.isExportMenuShown = true;
                this.setExportButtonExpandedState('true');
            },
            /**
             * @private
             * @param {string} stateStr
             */
            setExportButtonExpandedState: function (stateStr) {
                var button = this.exportButtonProxy;
                if (button) {
                    button.setAttribute('aria-expanded', stateStr);
                }
            },
            /**
             * Called on each render of the chart. We need to update positioning of the
             * proxy overlay.
             */
            onChartRender: function () {
                var chart = this.chart,
                    a11yOptions = chart.options.accessibility;
                // Always start with a clean slate
                removeElement(this.exportProxyGroup);
                // Set screen reader properties on export menu
                if (exportingShouldHaveA11y(chart)) {
                    // Proxy button and group
                    this.exportProxyGroup = this.addProxyGroup(
                    // Wrap in a region div if verbosity is high
                    a11yOptions.landmarkVerbosity === 'all' ? {
                        'aria-label': chart.langFormat('accessibility.exporting.exportRegionLabel', { chart: chart, chartTitle: getChartTitle(chart) }),
                        'role': 'region'
                    } : {});
                    var button = getExportMenuButtonElement(this.chart);
                    this.exportButtonProxy = this.createProxyButton(button, this.exportProxyGroup, {
                        'aria-label': chart.langFormat('accessibility.exporting.menuButtonLabel', { chart: chart }),
                        'aria-expanded': false
                    });
                }
            },
            /**
             * @private
             */
            addAccessibleContextMenuAttribs: function () {
                var chart = this.chart,
                    exportList = chart.exportDivElements;
                if (exportList && exportList.length) {
                    // Set tabindex on the menu items to allow focusing by script
                    // Set role to give screen readers a chance to pick up the contents
                    exportList.forEach(function (item) {
                        if (item) {
                            if (item.tagName === 'LI' &&
                                !(item.children && item.children.length)) {
                                item.setAttribute('tabindex', -1);
                            }
                            else {
                                item.setAttribute('aria-hidden', 'true');
                            }
                        }
                    });
                    // Set accessibility properties on parent div
                    var parentDiv = (exportList[0] && exportList[0].parentNode);
                    if (parentDiv) {
                        parentDiv.removeAttribute('aria-hidden');
                        parentDiv.setAttribute('aria-label', chart.langFormat('accessibility.exporting.chartMenuLabel', { chart: chart }));
                    }
                }
            },
            /**
             * Get keyboard navigation handler for this component.
             * @return {Highcharts.KeyboardNavigationHandler}
             */
            getKeyboardNavigation: function () {
                var keys = this.keyCodes,
                    chart = this.chart,
                    component = this;
                return new KeyboardNavigationHandler(chart, {
                    keyCodeMap: [
                        // Arrow prev handler
                        [
                            [keys.left, keys.up],
                            function () {
                                return component.onKbdPrevious(this);
                            }
                        ],
                        // Arrow next handler
                        [
                            [keys.right, keys.down],
                            function () {
                                return component.onKbdNext(this);
                            }
                        ],
                        // Click handler
                        [
                            [keys.enter, keys.space],
                            function () {
                                return component.onKbdClick(this);
                            }
                        ]
                    ],
                    // Only run exporting navigation if exporting support exists and is
                    // enabled on chart
                    validate: function () {
                        return !!chart.exporting &&
                            chart.options.exporting.enabled !== false &&
                            chart.options.exporting.accessibility.enabled !==
                                false;
                    },
                    // Focus export menu button
                    init: function () {
                        var exportBtn = component.exportButtonProxy,
                            exportGroup = chart.exportingGroup;
                        if (exportGroup && exportBtn) {
                            chart.setFocusToElement(exportGroup, exportBtn);
                        }
                    },
                    // Hide the menu
                    terminate: function () {
                        chart.hideExportMenu();
                    }
                });
            },
            /**
             * @private
             * @param {Highcharts.KeyboardNavigationHandler} keyboardNavigationHandler
             * @return {number}
             * Response code
             */
            onKbdPrevious: function (keyboardNavigationHandler) {
                var chart = this.chart,
                    a11yOptions = chart.options.accessibility,
                    response = keyboardNavigationHandler.response,
                    i = chart.highlightedExportItemIx || 0;
                // Try to highlight prev item in list. Highlighting e.g.
                // separators will fail.
                while (i--) {
                    if (chart.highlightExportItem(i)) {
                        return response.success;
                    }
                }
                // We failed, so wrap around or move to prev module
                if (a11yOptions.keyboardNavigation.wrapAround) {
                    chart.highlightLastExportItem();
                    return response.success;
                }
                return response.prev;
            },
            /**
             * @private
             * @param {Highcharts.KeyboardNavigationHandler} keyboardNavigationHandler
             * @return {number}
             * Response code
             */
            onKbdNext: function (keyboardNavigationHandler) {
                var chart = this.chart,
                    a11yOptions = chart.options.accessibility,
                    response = keyboardNavigationHandler.response,
                    i = (chart.highlightedExportItemIx || 0) + 1;
                // Try to highlight next item in list. Highlighting e.g.
                // separators will fail.
                for (; i < chart.exportDivElements.length; ++i) {
                    if (chart.highlightExportItem(i)) {
                        return response.success;
                    }
                }
                // We failed, so wrap around or move to next module
                if (a11yOptions.keyboardNavigation.wrapAround) {
                    chart.highlightExportItem(0);
                    return response.success;
                }
                return response.next;
            },
            /**
             * @private
             * @param {Highcharts.KeyboardNavigationHandler} keyboardNavigationHandler
             * @return {number}
             * Response code
             */
            onKbdClick: function (keyboardNavigationHandler) {
                var chart = this.chart,
                    curHighlightedItem = chart.exportDivElements[chart.highlightedExportItemIx],
                    exportButtonElement = getExportMenuButtonElement(chart).element;
                if (this.isExportMenuShown) {
                    this.fakeClickEvent(curHighlightedItem);
                }
                else {
                    this.fakeClickEvent(exportButtonElement);
                    chart.highlightExportItem(0);
                }
                return keyboardNavigationHandler.response.success;
            }
        });

        return MenuComponent;
    });
    _registerModule(_modules, 'Accessibility/Components/SeriesComponent/SeriesKeyboardNavigation.js', [_modules['Core/Chart/Chart.js'], _modules['Core/Series/Point.js'], _modules['Core/Series/Series.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Globals.js'], _modules['Core/Utilities.js'], _modules['Accessibility/KeyboardNavigationHandler.js'], _modules['Accessibility/Utils/EventProvider.js'], _modules['Accessibility/Utils/ChartUtilities.js']], function (Chart, Point, Series, SeriesRegistry, H, U, KeyboardNavigationHandler, EventProvider, ChartUtilities) {
        /* *
         *
         *  (c) 2009-2021 Øystein Moseng
         *
         *  Handle keyboard navigation for series.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var seriesTypes = SeriesRegistry.seriesTypes;
        var doc = H.doc;
        var defined = U.defined,
            extend = U.extend,
            fireEvent = U.fireEvent;
        var getPointFromXY = ChartUtilities.getPointFromXY,
            getSeriesFromName = ChartUtilities.getSeriesFromName,
            scrollToPoint = ChartUtilities.scrollToPoint;
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /*
         * Set for which series types it makes sense to move to the closest point with
         * up/down arrows, and which series types should just move to next series.
         */
        Series.prototype.keyboardMoveVertical = true;
        ['column', 'pie'].forEach(function (type) {
            if (seriesTypes[type]) {
                seriesTypes[type].prototype.keyboardMoveVertical = false;
            }
        });
        /**
         * Get the index of a point in a series. This is needed when using e.g. data
         * grouping.
         *
         * @private
         * @function getPointIndex
         *
         * @param {Highcharts.AccessibilityPoint} point
         *        The point to find index of.
         *
         * @return {number|undefined}
         *         The index in the series.points array of the point.
         */
        function getPointIndex(point) {
            var index = point.index,
                points = point.series.points;
            var i = points.length;
            if (points[index] !== point) {
                while (i--) {
                    if (points[i] === point) {
                        return i;
                    }
                }
            }
            else {
                return index;
            }
        }
        /**
         * Determine if series navigation should be skipped
         *
         * @private
         * @function isSkipSeries
         *
         * @param {Highcharts.Series} series
         *
         * @return {boolean|number|undefined}
         */
        function isSkipSeries(series) {
            var a11yOptions = series.chart.options.accessibility,
                seriesNavOptions = a11yOptions.keyboardNavigation.seriesNavigation,
                seriesA11yOptions = series.options.accessibility || {},
                seriesKbdNavOptions = seriesA11yOptions.keyboardNavigation;
            return seriesKbdNavOptions && seriesKbdNavOptions.enabled === false ||
                seriesA11yOptions.enabled === false ||
                series.options.enableMouseTracking === false || // #8440
                !series.visible ||
                // Skip all points in a series where pointNavigationEnabledThreshold is
                // reached
                (seriesNavOptions.pointNavigationEnabledThreshold &&
                    seriesNavOptions.pointNavigationEnabledThreshold <=
                        series.points.length);
        }
        /**
         * Determine if navigation for a point should be skipped
         *
         * @private
         * @function isSkipPoint
         *
         * @param {Highcharts.Point} point
         *
         * @return {boolean|number|undefined}
         */
        function isSkipPoint(point) {
            var a11yOptions = point.series.chart.options.accessibility;
            var pointA11yDisabled = (point.options.accessibility &&
                    point.options.accessibility.enabled === false);
            return point.isNull &&
                a11yOptions.keyboardNavigation.seriesNavigation.skipNullPoints ||
                point.visible === false ||
                point.isInside === false ||
                pointA11yDisabled ||
                isSkipSeries(point.series);
        }
        /**
         * Get the point in a series that is closest (in pixel distance) to a reference
         * point. Optionally supply weight factors for x and y directions.
         *
         * @private
         * @function getClosestPoint
         *
         * @param {Highcharts.Point} point
         * @param {Highcharts.Series} series
         * @param {number} [xWeight]
         * @param {number} [yWeight]
         *
         * @return {Highcharts.Point|undefined}
         */
        function getClosestPoint(point, series, xWeight, yWeight) {
            var minDistance = Infinity,
                dPoint,
                minIx,
                distance,
                i = series.points.length;
            var hasUndefinedPosition = function (point) {
                    return !(defined(point.plotX) && defined(point.plotY));
            };
            if (hasUndefinedPosition(point)) {
                return;
            }
            while (i--) {
                dPoint = series.points[i];
                if (hasUndefinedPosition(dPoint)) {
                    continue;
                }
                distance = (point.plotX - dPoint.plotX) *
                    (point.plotX - dPoint.plotX) *
                    (xWeight || 1) +
                    (point.plotY - dPoint.plotY) *
                        (point.plotY - dPoint.plotY) *
                        (yWeight || 1);
                if (distance < minDistance) {
                    minDistance = distance;
                    minIx = i;
                }
            }
            return defined(minIx) ? series.points[minIx] : void 0;
        }
        /**
         * Highlights a point (show tooltip and display hover state).
         *
         * @private
         * @function Highcharts.Point#highlight
         *
         * @return {Highcharts.Point}
         *         This highlighted point.
         */
        Point.prototype.highlight = function () {
            var chart = this.series.chart;
            if (!this.isNull) {
                this.onMouseOver(); // Show the hover marker and tooltip
            }
            else {
                if (chart.tooltip) {
                    chart.tooltip.hide(0);
                }
                // Don't call blur on the element, as it messes up the chart div's focus
            }
            scrollToPoint(this);
            // We focus only after calling onMouseOver because the state change can
            // change z-index and mess up the element.
            if (this.graphic) {
                chart.setFocusToElement(this.graphic);
            }
            chart.highlightedPoint = this;
            return this;
        };
        /**
         * Function to highlight next/previous point in chart.
         *
         * @private
         * @function Highcharts.Chart#highlightAdjacentPoint
         *
         * @param {boolean} next
         *        Flag for the direction.
         *
         * @return {Highcharts.Point|boolean}
         *         Returns highlighted point on success, false on failure (no adjacent
         *         point to highlight in chosen direction).
         */
        Chart.prototype.highlightAdjacentPoint = function (next) {
            var chart = this,
                series = chart.series,
                curPoint = chart.highlightedPoint,
                curPointIndex = curPoint && getPointIndex(curPoint) || 0,
                curPoints = (curPoint && curPoint.series.points),
                lastSeries = chart.series && chart.series[chart.series.length - 1],
                lastPoint = lastSeries && lastSeries.points &&
                    lastSeries.points[lastSeries.points.length - 1];
            var newSeries,
                newPoint;
            // If no points, return false
            if (!series[0] || !series[0].points) {
                return false;
            }
            if (!curPoint) {
                // No point is highlighted yet. Try first/last point depending on move
                // direction
                newPoint = next ? series[0].points[0] : lastPoint;
            }
            else {
                // We have a highlighted point.
                // Grab next/prev point & series
                newSeries = series[curPoint.series.index + (next ? 1 : -1)];
                newPoint = curPoints[curPointIndex + (next ? 1 : -1)];
                if (!newPoint && newSeries) {
                    // Done with this series, try next one
                    newPoint = newSeries.points[next ? 0 : newSeries.points.length - 1];
                }
                // If there is no adjacent point, we return false
                if (!newPoint) {
                    return false;
                }
            }
            // Recursively skip points
            if (isSkipPoint(newPoint)) {
                // If we skip this whole series, move to the end of the series before we
                // recurse, just to optimize
                newSeries = newPoint.series;
                if (isSkipSeries(newSeries)) {
                    chart.highlightedPoint = next ?
                        newSeries.points[newSeries.points.length - 1] :
                        newSeries.points[0];
                }
                else {
                    // Otherwise, just move one point
                    chart.highlightedPoint = newPoint;
                }
                // Retry
                return chart.highlightAdjacentPoint(next);
            }
            // There is an adjacent point, highlight it
            return newPoint.highlight();
        };
        /**
         * Highlight first valid point in a series. Returns the point if successfully
         * highlighted, otherwise false. If there is a highlighted point in the series,
         * use that as starting point.
         *
         * @private
         * @function Highcharts.Series#highlightFirstValidPoint
         *
         * @return {boolean|Highcharts.Point}
         */
        Series.prototype.highlightFirstValidPoint = function () {
            var curPoint = this.chart.highlightedPoint,
                start = (curPoint && curPoint.series) === this ?
                    getPointIndex(curPoint) :
                    0,
                points = this.points,
                len = points.length;
            if (points && len) {
                for (var i = start; i < len; ++i) {
                    if (!isSkipPoint(points[i])) {
                        return points[i].highlight();
                    }
                }
                for (var j = start; j >= 0; --j) {
                    if (!isSkipPoint(points[j])) {
                        return points[j].highlight();
                    }
                }
            }
            return false;
        };
        /**
         * Highlight next/previous series in chart. Returns false if no adjacent series
         * in the direction, otherwise returns new highlighted point.
         *
         * @private
         * @function Highcharts.Chart#highlightAdjacentSeries
         *
         * @param {boolean} down
         *
         * @return {Highcharts.Point|boolean}
         */
        Chart.prototype.highlightAdjacentSeries = function (down) {
            var chart = this,
                curPoint = chart.highlightedPoint,
                lastSeries = chart.series && chart.series[chart.series.length - 1],
                lastPoint = lastSeries && lastSeries.points &&
                    lastSeries.points[lastSeries.points.length - 1];
            var newSeries,
                newPoint,
                adjacentNewPoint;
            // If no point is highlighted, highlight the first/last point
            if (!chart.highlightedPoint) {
                newSeries = down ? (chart.series && chart.series[0]) : lastSeries;
                newPoint = down ?
                    (newSeries && newSeries.points && newSeries.points[0]) : lastPoint;
                return newPoint ? newPoint.highlight() : false;
            }
            newSeries = chart.series[curPoint.series.index + (down ? -1 : 1)];
            if (!newSeries) {
                return false;
            }
            // We have a new series in this direction, find the right point
            // Weigh xDistance as counting much higher than Y distance
            newPoint = getClosestPoint(curPoint, newSeries, 4);
            if (!newPoint) {
                return false;
            }
            // New series and point exists, but we might want to skip it
            if (isSkipSeries(newSeries)) {
                // Skip the series
                newPoint.highlight();
                adjacentNewPoint = chart.highlightAdjacentSeries(down); // Try recurse
                if (!adjacentNewPoint) {
                    // Recurse failed
                    curPoint.highlight();
                    return false;
                }
                // Recurse succeeded
                return adjacentNewPoint;
            }
            // Highlight the new point or any first valid point back or forwards from it
            newPoint.highlight();
            return newPoint.series.highlightFirstValidPoint();
        };
        /**
         * Highlight the closest point vertically.
         *
         * @private
         * @function Highcharts.Chart#highlightAdjacentPointVertical
         *
         * @param {boolean} down
         *
         * @return {Highcharts.Point|boolean}
         */
        Chart.prototype.highlightAdjacentPointVertical = function (down) {
            var curPoint = this.highlightedPoint;
            var minDistance = Infinity,
                bestPoint;
            if (!defined(curPoint.plotX) || !defined(curPoint.plotY)) {
                return false;
            }
            this.series.forEach(function (series) {
                if (isSkipSeries(series)) {
                    return;
                }
                series.points.forEach(function (point) {
                    if (!defined(point.plotY) || !defined(point.plotX) ||
                        point === curPoint) {
                        return;
                    }
                    var yDistance = point.plotY - curPoint.plotY;
                    var width = Math.abs(point.plotX - curPoint.plotX),
                        distance = Math.abs(yDistance) * Math.abs(yDistance) +
                            width * width * 4; // Weigh horizontal distance highly
                        // Reverse distance number if axis is reversed
                        if (series.yAxis && series.yAxis.reversed) {
                            yDistance *= -1;
                    }
                    if (yDistance <= 0 && down || yDistance >= 0 && !down || // Chk dir
                        distance < 5 || // Points in same spot => infinite loop
                        isSkipPoint(point)) {
                        return;
                    }
                    if (distance < minDistance) {
                        minDistance = distance;
                        bestPoint = point;
                    }
                });
            });
            return bestPoint ? bestPoint.highlight() : false;
        };
        /**
         * @private
         * @param {Highcharts.Chart} chart
         * @return {Highcharts.Point|boolean}
         */
        function highlightFirstValidPointInChart(chart) {
            var res = false;
            delete chart.highlightedPoint;
            res = chart.series.reduce(function (acc, cur) {
                return acc || cur.highlightFirstValidPoint();
            }, false);
            return res;
        }
        /**
         * @private
         * @param {Highcharts.Chart} chart
         * @return {Highcharts.Point|boolean}
         */
        function highlightLastValidPointInChart(chart) {
            var numSeries = chart.series.length;
            var i = numSeries,
                res = false;
            while (i--) {
                chart.highlightedPoint = chart.series[i].points[chart.series[i].points.length - 1];
                // Highlight first valid point in the series will also
                // look backwards. It always starts from currently
                // highlighted point.
                res = chart.series[i].highlightFirstValidPoint();
                if (res) {
                    break;
                }
            }
            return res;
        }
        /**
         * @private
         * @param {Highcharts.Chart} chart
         */
        function updateChartFocusAfterDrilling(chart) {
            highlightFirstValidPointInChart(chart);
            if (chart.focusElement) {
                chart.focusElement.removeFocusBorder();
            }
        }
        /**
         * @private
         * @class
         * @name Highcharts.SeriesKeyboardNavigation
         */
        function SeriesKeyboardNavigation(chart, keyCodes) {
            this.keyCodes = keyCodes;
            this.chart = chart;
        }
        extend(SeriesKeyboardNavigation.prototype, /** @lends Highcharts.SeriesKeyboardNavigation */ {
            /**
             * Init the keyboard navigation
             */
            init: function () {
                var keyboardNavigation = this,
                    chart = this.chart,
                    e = this.eventProvider = new EventProvider();
                e.addEvent(Series, 'destroy', function () {
                    return keyboardNavigation.onSeriesDestroy(this);
                });
                e.addEvent(chart, 'afterDrilldown', function () {
                    updateChartFocusAfterDrilling(this);
                });
                e.addEvent(chart, 'drilldown', function (e) {
                    var point = e.point,
                        series = point.series;
                    keyboardNavigation.lastDrilledDownPoint = {
                        x: point.x,
                        y: point.y,
                        seriesName: series ? series.name : ''
                    };
                });
                e.addEvent(chart, 'drillupall', function () {
                    setTimeout(function () {
                        keyboardNavigation.onDrillupAll();
                    }, 10);
                });
                // Heatmaps et al. alter z-index in setState, causing elements
                // to lose focus
                e.addEvent(Point, 'afterSetState', function () {
                    var point = this;
                    var pointEl = point.graphic && point.graphic.element;
                    if (chart.highlightedPoint === point &&
                        doc.activeElement !== pointEl &&
                        pointEl &&
                        pointEl.focus) {
                        pointEl.focus();
                    }
                });
            },
            onDrillupAll: function () {
                // After drillup we want to find the point that was drilled down to and
                // highlight it.
                var last = this.lastDrilledDownPoint,
                    chart = this.chart,
                    series = last && getSeriesFromName(chart,
                    last.seriesName);
                var point;
                if (last && series && defined(last.x) && defined(last.y)) {
                    point = getPointFromXY(series, last.x, last.y);
                }
                // Container focus can be lost on drillup due to deleted elements.
                if (chart.container) {
                    chart.container.focus();
                }
                if (point && point.highlight) {
                    point.highlight();
                }
                if (chart.focusElement) {
                    chart.focusElement.removeFocusBorder();
                }
            },
            /**
             * @return {Highcharts.KeyboardNavigationHandler}
             */
            getKeyboardNavigationHandler: function () {
                var keyboardNavigation = this,
                    keys = this.keyCodes,
                    chart = this.chart,
                    inverted = chart.inverted;
                return new KeyboardNavigationHandler(chart, {
                    keyCodeMap: [
                        [inverted ? [keys.up, keys.down] : [keys.left, keys.right], function (keyCode) {
                                return keyboardNavigation.onKbdSideways(this, keyCode);
                            }],
                        [inverted ? [keys.left, keys.right] : [keys.up, keys.down], function (keyCode) {
                                return keyboardNavigation.onKbdVertical(this, keyCode);
                            }],
                        [[keys.enter, keys.space], function (keyCode, event) {
                                var point = chart.highlightedPoint;
                                if (point) {
                                    event.point = point;
                                    fireEvent(point.series, 'click', event);
                                    point.firePointEvent('click');
                                }
                                return this.response.success;
                            }]
                    ],
                    init: function (dir) {
                        return keyboardNavigation.onHandlerInit(this, dir);
                    },
                    terminate: function () {
                        return keyboardNavigation.onHandlerTerminate();
                    }
                });
            },
            /**
             * @private
             * @param {Highcharts.KeyboardNavigationHandler} handler
             * @param {number} keyCode
             * @return {number}
             * response
             */
            onKbdSideways: function (handler, keyCode) {
                var keys = this.keyCodes,
                    isNext = keyCode === keys.right || keyCode === keys.down;
                return this.attemptHighlightAdjacentPoint(handler, isNext);
            },
            /**
             * @private
             * @param {Highcharts.KeyboardNavigationHandler} handler
             * @param {number} keyCode
             * @return {number}
             * response
             */
            onKbdVertical: function (handler, keyCode) {
                var chart = this.chart,
                    keys = this.keyCodes,
                    isNext = keyCode === keys.down || keyCode === keys.right,
                    navOptions = chart.options.accessibility.keyboardNavigation
                        .seriesNavigation;
                // Handle serialized mode, act like left/right
                if (navOptions.mode && navOptions.mode === 'serialize') {
                    return this.attemptHighlightAdjacentPoint(handler, isNext);
                }
                // Normal mode, move between series
                var highlightMethod = (chart.highlightedPoint &&
                        chart.highlightedPoint.series.keyboardMoveVertical) ?
                        'highlightAdjacentPointVertical' :
                        'highlightAdjacentSeries';
                chart[highlightMethod](isNext);
                return handler.response.success;
            },
            /**
             * @private
             * @param {Highcharts.KeyboardNavigationHandler} handler
             * @param {number} initDirection
             * @return {number}
             * response
             */
            onHandlerInit: function (handler, initDirection) {
                var chart = this.chart;
                if (initDirection > 0) {
                    highlightFirstValidPointInChart(chart);
                }
                else {
                    highlightLastValidPointInChart(chart);
                }
                return handler.response.success;
            },
            /**
             * @private
             */
            onHandlerTerminate: function () {
                var chart = this.chart;
                if (chart.tooltip) {
                    chart.tooltip.hide(0);
                }
                var hoverSeries = chart.highlightedPoint && chart.highlightedPoint.series;
                if (hoverSeries && hoverSeries.onMouseOut) {
                    hoverSeries.onMouseOut();
                }
                if (chart.highlightedPoint && chart.highlightedPoint.onMouseOut) {
                    chart.highlightedPoint.onMouseOut();
                }
                delete chart.highlightedPoint;
            },
            /**
             * Function that attempts to highlight next/prev point. Handles wrap around.
             * @private
             * @param {Highcharts.KeyboardNavigationHandler} handler
             * @param {boolean} directionIsNext
             * @return {number}
             * response
             */
            attemptHighlightAdjacentPoint: function (handler, directionIsNext) {
                var chart = this.chart,
                    wrapAround = chart.options.accessibility.keyboardNavigation
                        .wrapAround,
                    highlightSuccessful = chart.highlightAdjacentPoint(directionIsNext);
                if (!highlightSuccessful) {
                    if (wrapAround) {
                        return handler.init(directionIsNext ? 1 : -1);
                    }
                    return handler.response[directionIsNext ? 'next' : 'prev'];
                }
                return handler.response.success;
            },
            /**
             * @private
             */
            onSeriesDestroy: function (series) {
                var chart = this.chart,
                    currentHighlightedPointDestroyed = chart.highlightedPoint &&
                        chart.highlightedPoint.series === series;
                if (currentHighlightedPointDestroyed) {
                    delete chart.highlightedPoint;
                    if (chart.focusElement) {
                        chart.focusElement.removeFocusBorder();
                    }
                }
            },
            /**
             * @private
             */
            destroy: function () {
                this.eventProvider.removeAddedEvents();
            }
        });

        return SeriesKeyboardNavigation;
    });
    _registerModule(_modules, 'Accessibility/Components/AnnotationsA11y.js', [_modules['Accessibility/Utils/HTMLUtilities.js']], function (HTMLUtilities) {
        /* *
         *
         *  (c) 2009-2021 Øystein Moseng
         *
         *  Annotations accessibility code.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var escapeStringForHTML = HTMLUtilities.escapeStringForHTML,
            stripHTMLTagsFromString = HTMLUtilities.stripHTMLTagsFromString;
        /**
         * Get list of all annotation labels in the chart.
         *
         * @private
         * @param {Highcharts.Chart} chart The chart to get annotation info on.
         * @return {Array<object>} The labels, or empty array if none.
         */
        function getChartAnnotationLabels(chart) {
            var annotations = chart.annotations || [];
            return annotations.reduce(function (acc, cur) {
                if (cur.options &&
                    cur.options.visible !== false) {
                    acc = acc.concat(cur.labels);
                }
                return acc;
            }, []);
        }
        /**
         * Get the text of an annotation label.
         *
         * @private
         * @param {object} label The annotation label object
         * @return {string} The text in the label.
         */
        function getLabelText(label) {
            return ((label.options &&
                label.options.accessibility &&
                label.options.accessibility.description) ||
                (label.graphic &&
                    label.graphic.text &&
                    label.graphic.text.textStr) ||
                '');
        }
        /**
         * Describe an annotation label.
         *
         * @private
         * @param {object} label The annotation label object to describe
         * @return {string} The description for the label.
         */
        function getAnnotationLabelDescription(label) {
            var a11yDesc = (label.options &&
                    label.options.accessibility &&
                    label.options.accessibility.description);
            if (a11yDesc) {
                return a11yDesc;
            }
            var chart = label.chart;
            var labelText = getLabelText(label);
            var points = label.points;
            var getAriaLabel = function (point) { return (point.graphic &&
                    point.graphic.element &&
                    point.graphic.element.getAttribute('aria-label') ||
                    ''); };
            var getValueDesc = function (point) {
                    var valDesc = (point.accessibility &&
                        point.accessibility.valueDescription ||
                        getAriaLabel(point));
                var seriesName = (point &&
                        point.series.name ||
                        '');
                return (seriesName ? seriesName + ', ' : '') + 'data point ' + valDesc;
            };
            var pointValueDescriptions = points
                    .filter(function (p) { return !!p.graphic; }) // Filter out mock points
                    .map(getValueDesc)
                    .filter(function (desc) { return !!desc; }); // Filter out points we can't describe
                var numPoints = pointValueDescriptions.length;
            var pointsSelector = numPoints > 1 ? 'MultiplePoints' : numPoints ? 'SinglePoint' : 'NoPoints';
            var langFormatStr = 'accessibility.screenReaderSection.annotations.description' + pointsSelector;
            var context = {
                    annotationText: labelText,
                    annotation: label,
                    numPoints: numPoints,
                    annotationPoint: pointValueDescriptions[0],
                    additionalAnnotationPoints: pointValueDescriptions.slice(1)
                };
            return chart.langFormat(langFormatStr, context);
        }
        /**
         * Return array of HTML strings for each annotation label in the chart.
         *
         * @private
         * @param {Highcharts.Chart} chart The chart to get annotation info on.
         * @return {Array<string>} Array of strings with HTML content for each annotation label.
         */
        function getAnnotationListItems(chart) {
            var labels = getChartAnnotationLabels(chart);
            return labels.map(function (label) {
                var desc = escapeStringForHTML(stripHTMLTagsFromString(getAnnotationLabelDescription(label)));
                return desc ? "<li>" + desc + "</li>" : '';
            });
        }
        /**
         * Return the annotation info for a chart as string.
         *
         * @private
         * @param {Highcharts.Chart} chart The chart to get annotation info on.
         * @return {string} String with HTML content or empty string if no annotations.
         */
        function getAnnotationsInfoHTML(chart) {
            var annotations = chart.annotations;
            if (!(annotations && annotations.length)) {
                return '';
            }
            var annotationItems = getAnnotationListItems(chart);
            return "<ul style=\"list-style-type: none\">" + annotationItems.join(' ') + "</ul>";
        }
        /**
         * Return the texts for the annotation(s) connected to a point, or empty array
         * if none.
         *
         * @private
         * @param {Highcharts.Point} point The data point to get the annotation info from.
         * @return {Array<string>} Annotation texts
         */
        function getPointAnnotationTexts(point) {
            var labels = getChartAnnotationLabels(point.series.chart);
            var pointLabels = labels
                    .filter(function (label) { return label.points.indexOf(point) > -1; });
            if (!pointLabels.length) {
                return [];
            }
            return pointLabels.map(function (label) { return "" + getLabelText(label); });
        }
        var AnnotationsA11y = {
                getAnnotationsInfoHTML: getAnnotationsInfoHTML,
                getAnnotationLabelDescription: getAnnotationLabelDescription,
                getAnnotationListItems: getAnnotationListItems,
                getPointAnnotationTexts: getPointAnnotationTexts
            };

        return AnnotationsA11y;
    });
    _registerModule(_modules, 'Accessibility/Components/SeriesComponent/SeriesDescriber.js', [_modules['Accessibility/Components/AnnotationsA11y.js'], _modules['Accessibility/Utils/ChartUtilities.js'], _modules['Core/FormatUtilities.js'], _modules['Accessibility/Utils/HTMLUtilities.js'], _modules['Core/Utilities.js']], function (AnnotationsA11y, ChartUtilities, F, HTMLUtilities, U) {
        /* *
         *
         *  (c) 2009-2021 Øystein Moseng
         *
         *  Place desriptions on a series and its points.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var getPointAnnotationTexts = AnnotationsA11y.getPointAnnotationTexts;
        var getAxisDescription = ChartUtilities.getAxisDescription,
            getSeriesFirstPointElement = ChartUtilities.getSeriesFirstPointElement,
            getSeriesA11yElement = ChartUtilities.getSeriesA11yElement,
            unhideChartElementFromAT = ChartUtilities.unhideChartElementFromAT;
        var format = F.format,
            numberFormat = F.numberFormat;
        var reverseChildNodes = HTMLUtilities.reverseChildNodes,
            stripHTMLTags = HTMLUtilities.stripHTMLTagsFromString;
        var find = U.find,
            isNumber = U.isNumber,
            pick = U.pick,
            defined = U.defined;
        /* eslint-disable valid-jsdoc */
        /**
         * @private
         */
        function findFirstPointWithGraphic(point) {
            var sourcePointIndex = point.index;
            if (!point.series || !point.series.data || !defined(sourcePointIndex)) {
                return null;
            }
            return find(point.series.data, function (p) {
                return !!(p &&
                    typeof p.index !== 'undefined' &&
                    p.index > sourcePointIndex &&
                    p.graphic &&
                    p.graphic.element);
            }) || null;
        }
        /**
         * @private
         */
        function shouldAddDummyPoint(point) {
            // Note: Sunburst series use isNull for hidden points on drilldown.
            // Ignore these.
            var isSunburst = point.series && point.series.is('sunburst'),
                isNull = point.isNull;
            return isNull && !isSunburst;
        }
        /**
         * @private
         */
        function makeDummyElement(point, pos) {
            var renderer = point.series.chart.renderer,
                dummy = renderer.rect(pos.x,
                pos.y, 1, 1);
            dummy.attr({
                'class': 'highcharts-a11y-dummy-point',
                fill: 'none',
                opacity: 0,
                'fill-opacity': 0,
                'stroke-opacity': 0
            });
            return dummy;
        }
        /**
         * @private
         * @param {Highcharts.Point} point
         * @return {Highcharts.HTMLDOMElement|Highcharts.SVGDOMElement|undefined}
         */
        function addDummyPointElement(point) {
            var series = point.series,
                firstPointWithGraphic = findFirstPointWithGraphic(point),
                firstGraphic = firstPointWithGraphic && firstPointWithGraphic.graphic,
                parentGroup = firstGraphic ?
                    firstGraphic.parentGroup :
                    series.graph || series.group,
                dummyPos = firstPointWithGraphic ? {
                    x: pick(point.plotX,
                firstPointWithGraphic.plotX, 0),
                    y: pick(point.plotY,
                firstPointWithGraphic.plotY, 0)
                } : {
                    x: pick(point.plotX, 0),
                    y: pick(point.plotY, 0)
                },
                dummyElement = makeDummyElement(point,
                dummyPos);
            if (parentGroup && parentGroup.element) {
                point.graphic = dummyElement;
                point.hasDummyGraphic = true;
                dummyElement.add(parentGroup);
                // Move to correct pos in DOM
                parentGroup.element.insertBefore(dummyElement.element, firstGraphic ? firstGraphic.element : null);
                return dummyElement.element;
            }
        }
        /**
         * @private
         * @param {Highcharts.Series} series
         * @return {boolean}
         */
        function hasMorePointsThanDescriptionThreshold(series) {
            var chartA11yOptions = series.chart.options.accessibility,
                threshold = (chartA11yOptions.series.pointDescriptionEnabledThreshold);
            return !!(threshold !== false &&
                series.points &&
                series.points.length >= threshold);
        }
        /**
         * @private
         * @param {Highcharts.Series} series
         * @return {boolean}
         */
        function shouldSetScreenReaderPropsOnPoints(series) {
            var seriesA11yOptions = series.options.accessibility || {};
            return !hasMorePointsThanDescriptionThreshold(series) &&
                !seriesA11yOptions.exposeAsGroupOnly;
        }
        /**
         * @private
         * @param {Highcharts.Series} series
         * @return {boolean}
         */
        function shouldSetKeyboardNavPropsOnPoints(series) {
            var chartA11yOptions = series.chart.options.accessibility,
                seriesNavOptions = chartA11yOptions.keyboardNavigation.seriesNavigation;
            return !!(series.points && (series.points.length <
                seriesNavOptions.pointNavigationEnabledThreshold ||
                seriesNavOptions.pointNavigationEnabledThreshold === false));
        }
        /**
         * @private
         * @param {Highcharts.Series} series
         * @return {boolean}
         */
        function shouldDescribeSeriesElement(series) {
            var chart = series.chart,
                chartOptions = chart.options.chart,
                chartHas3d = chartOptions.options3d && chartOptions.options3d.enabled,
                hasMultipleSeries = chart.series.length > 1,
                describeSingleSeriesOption = chart.options.accessibility.series.describeSingleSeries,
                exposeAsGroupOnlyOption = (series.options.accessibility || {}).exposeAsGroupOnly,
                noDescribe3D = chartHas3d && hasMultipleSeries;
            return !noDescribe3D && (hasMultipleSeries || describeSingleSeriesOption ||
                exposeAsGroupOnlyOption || hasMorePointsThanDescriptionThreshold(series));
        }
        /**
         * @private
         * @param {Highcharts.Point} point
         * @param {number} value
         * @return {string}
         */
        function pointNumberToString(point, value) {
            var chart = point.series.chart,
                a11yPointOptions = chart.options.accessibility.point || {},
                tooltipOptions = point.series.tooltipOptions || {},
                lang = chart.options.lang;
            if (isNumber(value)) {
                return numberFormat(value, a11yPointOptions.valueDecimals ||
                    tooltipOptions.valueDecimals ||
                    -1, lang.decimalPoint, lang.accessibility.thousandsSep || lang.thousandsSep);
            }
            return value;
        }
        /**
         * @private
         * @param {Highcharts.Series} series
         * @return {string}
         */
        function getSeriesDescriptionText(series) {
            var seriesA11yOptions = series.options.accessibility || {},
                descOpt = seriesA11yOptions.description;
            return descOpt && series.chart.langFormat('accessibility.series.description', {
                description: descOpt,
                series: series
            }) || '';
        }
        /**
         * @private
         * @param {Highcharts.series} series
         * @param {string} axisCollection
         * @return {string}
         */
        function getSeriesAxisDescriptionText(series, axisCollection) {
            var axis = series[axisCollection];
            return series.chart.langFormat('accessibility.series.' + axisCollection + 'Description', {
                name: getAxisDescription(axis),
                series: series
            });
        }
        /**
         * Get accessible time description for a point on a datetime axis.
         *
         * @private
         * @function Highcharts.Point#getTimeDescription
         * @param {Highcharts.Point} point
         * @return {string|undefined}
         * The description as string.
         */
        function getPointA11yTimeDescription(point) {
            var series = point.series,
                chart = series.chart,
                a11yOptions = chart.options.accessibility.point || {},
                dateXAxis = series.xAxis && series.xAxis.dateTime;
            if (dateXAxis) {
                var tooltipDateFormat = dateXAxis.getXDateFormat(point.x || 0,
                    chart.options.tooltip.dateTimeLabelFormats),
                    dateFormat = a11yOptions.dateFormatter &&
                        a11yOptions.dateFormatter(point) ||
                        a11yOptions.dateFormat ||
                        tooltipDateFormat;
                return chart.time.dateFormat(dateFormat, point.x || 0, void 0);
            }
        }
        /**
         * @private
         * @param {Highcharts.Point} point
         * @return {string}
         */
        function getPointXDescription(point) {
            var timeDesc = getPointA11yTimeDescription(point), xAxis = point.series.xAxis || {}, pointCategory = xAxis.categories && defined(point.category) &&
                    ('' + point.category).replace('<br/>', ' '), canUseId = point.id && point.id.indexOf('highcharts-') < 0, fallback = 'x, ' + point.x;
            return point.name || timeDesc || pointCategory ||
                (canUseId ? point.id : fallback);
        }
        /**
         * @private
         * @param {Highcharts.Point} point
         * @param {string} prefix
         * @param {string} suffix
         * @return {string}
         */
        function getPointArrayMapValueDescription(point, prefix, suffix) {
            var pre = prefix || '', suf = suffix || '', keyToValStr = function (key) {
                    var num = pointNumberToString(point, pick(point[key], point.options[key]));
                return key + ': ' + pre + num + suf;
            }, pointArrayMap = point.series.pointArrayMap;
            return pointArrayMap.reduce(function (desc, key) {
                return desc + (desc.length ? ', ' : '') + keyToValStr(key);
            }, '');
        }
        /**
         * @private
         * @param {Highcharts.Point} point
         * @return {string}
         */
        function getPointValue(point) {
            var series = point.series,
                a11yPointOpts = series.chart.options.accessibility.point || {},
                tooltipOptions = series.tooltipOptions || {},
                valuePrefix = a11yPointOpts.valuePrefix ||
                    tooltipOptions.valuePrefix || '',
                valueSuffix = a11yPointOpts.valueSuffix ||
                    tooltipOptions.valueSuffix || '',
                fallbackKey = (typeof point.value !==
                    'undefined' ?
                    'value' : 'y'),
                fallbackDesc = pointNumberToString(point,
                point[fallbackKey]);
            if (point.isNull) {
                return series.chart.langFormat('accessibility.series.nullPointValue', {
                    point: point
                });
            }
            if (series.pointArrayMap) {
                return getPointArrayMapValueDescription(point, valuePrefix, valueSuffix);
            }
            return valuePrefix + fallbackDesc + valueSuffix;
        }
        /**
         * Return the description for the annotation(s) connected to a point, or empty
         * string if none.
         *
         * @private
         * @param {Highcharts.Point} point The data point to get the annotation info from.
         * @return {string} Annotation description
         */
        function getPointAnnotationDescription(point) {
            var chart = point.series.chart;
            var langKey = 'accessibility.series.pointAnnotationsDescription';
            var annotations = getPointAnnotationTexts(point);
            var context = { point: point,
                annotations: annotations };
            return annotations.length ? chart.langFormat(langKey, context) : '';
        }
        /**
         * Return string with information about point.
         * @private
         * @return {string}
         */
        function getPointValueDescription(point) {
            var series = point.series, chart = series.chart, pointValueDescriptionFormat = chart.options.accessibility
                    .point.valueDescriptionFormat, showXDescription = pick(series.xAxis &&
                    series.xAxis.options.accessibility &&
                    series.xAxis.options.accessibility.enabled, !chart.angular), xDesc = showXDescription ? getPointXDescription(point) : '', context = {
                    point: point,
                    index: defined(point.index) ? (point.index + 1) : '',
                    xDescription: xDesc,
                    value: getPointValue(point),
                    separator: showXDescription ? ', ' : ''
                };
            return format(pointValueDescriptionFormat, context, chart);
        }
        /**
         * Return string with information about point.
         * @private
         * @return {string}
         */
        function defaultPointDescriptionFormatter(point) {
            var series = point.series, chart = series.chart, valText = getPointValueDescription(point), description = point.options && point.options.accessibility &&
                    point.options.accessibility.description, userDescText = description ? ' ' + description : '', seriesNameText = chart.series.length > 1 && series.name ?
                    ' ' + series.name + '.' : '', annotationsDesc = getPointAnnotationDescription(point), pointAnnotationsText = annotationsDesc ? ' ' + annotationsDesc : '';
            point.accessibility = point.accessibility || {};
            point.accessibility.valueDescription = valText;
            return valText + userDescText + seriesNameText + pointAnnotationsText;
        }
        /**
         * Set a11y props on a point element
         * @private
         * @param {Highcharts.Point} point
         * @param {Highcharts.HTMLDOMElement|Highcharts.SVGDOMElement} pointElement
         */
        function setPointScreenReaderAttribs(point, pointElement) {
            var series = point.series,
                a11yPointOptions = series.chart.options.accessibility.point || {},
                seriesA11yOptions = series.options.accessibility || {},
                label = stripHTMLTags(seriesA11yOptions.pointDescriptionFormatter &&
                    seriesA11yOptions.pointDescriptionFormatter(point) ||
                    a11yPointOptions.descriptionFormatter &&
                        a11yPointOptions.descriptionFormatter(point) ||
                    defaultPointDescriptionFormatter(point));
            pointElement.setAttribute('role', 'img');
            pointElement.setAttribute('aria-label', label);
        }
        /**
         * Add accessible info to individual point elements of a series
         * @private
         * @param {Highcharts.Series} series
         */
        function describePointsInSeries(series) {
            var setScreenReaderProps = shouldSetScreenReaderPropsOnPoints(series),
                setKeyboardProps = shouldSetKeyboardNavPropsOnPoints(series);
            if (setScreenReaderProps || setKeyboardProps) {
                series.points.forEach(function (point) {
                    var pointEl = point.graphic && point.graphic.element ||
                            shouldAddDummyPoint(point) && addDummyPointElement(point);
                    var pointA11yDisabled = (point.options &&
                            point.options.accessibility &&
                            point.options.accessibility.enabled === false);
                    if (pointEl) {
                        // We always set tabindex, as long as we are setting props.
                        // When setting tabindex, also remove default outline to
                        // avoid ugly border on click.
                        pointEl.setAttribute('tabindex', '-1');
                        pointEl.style.outline = '0';
                        if (setScreenReaderProps && !pointA11yDisabled) {
                            setPointScreenReaderAttribs(point, pointEl);
                        }
                        else {
                            pointEl.setAttribute('aria-hidden', true);
                        }
                    }
                });
            }
        }
        /**
         * Return string with information about series.
         * @private
         * @return {string}
         */
        function defaultSeriesDescriptionFormatter(series) {
            var chart = series.chart,
                chartTypes = chart.types || [],
                description = getSeriesDescriptionText(series),
                shouldDescribeAxis = function (coll) {
                    return chart[coll] && chart[coll].length > 1 && series[coll];
            }, xAxisInfo = getSeriesAxisDescriptionText(series, 'xAxis'), yAxisInfo = getSeriesAxisDescriptionText(series, 'yAxis'), summaryContext = {
                name: series.name || '',
                ix: series.index + 1,
                numSeries: chart.series && chart.series.length,
                numPoints: series.points && series.points.length,
                series: series
            }, combinationSuffix = chartTypes.length > 1 ? 'Combination' : '', summary = chart.langFormat('accessibility.series.summary.' + series.type + combinationSuffix, summaryContext) || chart.langFormat('accessibility.series.summary.default' + combinationSuffix, summaryContext);
            return summary + (description ? ' ' + description : '') + (shouldDescribeAxis('yAxis') ? ' ' + yAxisInfo : '') + (shouldDescribeAxis('xAxis') ? ' ' + xAxisInfo : '');
        }
        /**
         * Set a11y props on a series element
         * @private
         * @param {Highcharts.Series} series
         * @param {Highcharts.HTMLDOMElement|Highcharts.SVGDOMElement} seriesElement
         */
        function describeSeriesElement(series, seriesElement) {
            var seriesA11yOptions = series.options.accessibility || {},
                a11yOptions = series.chart.options.accessibility,
                landmarkVerbosity = a11yOptions.landmarkVerbosity;
            // Handle role attribute
            if (seriesA11yOptions.exposeAsGroupOnly) {
                seriesElement.setAttribute('role', 'img');
            }
            else if (landmarkVerbosity === 'all') {
                seriesElement.setAttribute('role', 'region');
            } /* else do not add role */
            seriesElement.setAttribute('tabindex', '-1');
            seriesElement.style.outline = '0'; // Don't show browser outline on click, despite tabindex
            seriesElement.setAttribute('aria-label', stripHTMLTags(a11yOptions.series.descriptionFormatter &&
                a11yOptions.series.descriptionFormatter(series) ||
                defaultSeriesDescriptionFormatter(series)));
        }
        /**
         * Put accessible info on series and points of a series.
         * @param {Highcharts.Series} series The series to add info on.
         */
        function describeSeries(series) {
            var chart = series.chart,
                firstPointEl = getSeriesFirstPointElement(series),
                seriesEl = getSeriesA11yElement(series),
                is3d = chart.is3d && chart.is3d();
            if (seriesEl) {
                // For some series types the order of elements do not match the
                // order of points in series. In that case we have to reverse them
                // in order for AT to read them out in an understandable order.
                // Due to z-index issues we can not do this for 3D charts.
                if (seriesEl.lastChild === firstPointEl && !is3d) {
                    reverseChildNodes(seriesEl);
                }
                describePointsInSeries(series);
                unhideChartElementFromAT(chart, seriesEl);
                if (shouldDescribeSeriesElement(series)) {
                    describeSeriesElement(series, seriesEl);
                }
                else {
                    seriesEl.setAttribute('aria-label', '');
                }
            }
        }
        var SeriesDescriber = {
                describeSeries: describeSeries,
                defaultPointDescriptionFormatter: defaultPointDescriptionFormatter,
                defaultSeriesDescriptionFormatter: defaultSeriesDescriptionFormatter,
                getPointA11yTimeDescription: getPointA11yTimeDescription,
                getPointXDescription: getPointXDescription,
                getPointValue: getPointValue,
                getPointValueDescription: getPointValueDescription
            };

        return SeriesDescriber;
    });
    _registerModule(_modules, 'Accessibility/Utils/Announcer.js', [_modules['Core/Globals.js'], _modules['Core/Renderer/HTML/AST.js'], _modules['Accessibility/Utils/DOMElementProvider.js'], _modules['Accessibility/Utils/HTMLUtilities.js']], function (H, AST, DOMElementProvider, HTMLUtilities) {
        /* *
         *
         *  (c) 2009-2021 Øystein Moseng
         *
         *  Create announcer to speak messages to screen readers and other AT.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var doc = H.doc;
        var setElAttrs = HTMLUtilities.setElAttrs,
            visuallyHideElement = HTMLUtilities.visuallyHideElement;
        /* *
         *
         *  Class
         *
         * */
        var Announcer = /** @class */ (function () {
                /* *
                 *
                 *  Constructor
                 *
                 * */
                function Announcer(chart, type) {
                    this.chart = chart;
                this.domElementProvider = new DOMElementProvider();
                this.announceRegion = this.addAnnounceRegion(type);
            }
            /* *
             *
             *  Functions
             *
             * */
            Announcer.prototype.destroy = function () {
                this.domElementProvider.destroyCreatedElements();
            };
            Announcer.prototype.announce = function (message) {
                var _this = this;
                AST.setElementHTML(this.announceRegion, message);
                // Delete contents after a little while to avoid user finding the live
                // region in the DOM.
                if (this.clearAnnouncementRegionTimer) {
                    clearTimeout(this.clearAnnouncementRegionTimer);
                }
                this.clearAnnouncementRegionTimer = setTimeout(function () {
                    _this.announceRegion.innerHTML = '';
                    delete _this.clearAnnouncementRegionTimer;
                }, 1000);
            };
            Announcer.prototype.addAnnounceRegion = function (type) {
                var chartContainer = this.chart.announcerContainer || this.createAnnouncerContainer(),
                    div = this.domElementProvider.createElement('div');
                setElAttrs(div, {
                    'aria-hidden': false,
                    'aria-live': type
                });
                visuallyHideElement(div);
                chartContainer.appendChild(div);
                return div;
            };
            Announcer.prototype.createAnnouncerContainer = function () {
                var chart = this.chart,
                    container = doc.createElement('div');
                setElAttrs(container, {
                    'aria-hidden': false,
                    style: 'position:relative',
                    'class': 'highcharts-announcer-container'
                });
                chart.renderTo.insertBefore(container, chart.renderTo.firstChild);
                chart.announcerContainer = container;
                return container;
            };
            return Announcer;
        }());
        /* *
         *
         *  Default Export
         *
         * */

        return Announcer;
    });
    _registerModule(_modules, 'Accessibility/Components/SeriesComponent/NewDataAnnouncer.js', [_modules['Core/Globals.js'], _modules['Core/Series/Series.js'], _modules['Core/Utilities.js'], _modules['Accessibility/Utils/ChartUtilities.js'], _modules['Accessibility/Components/SeriesComponent/SeriesDescriber.js'], _modules['Accessibility/Utils/Announcer.js'], _modules['Accessibility/Utils/EventProvider.js']], function (H, Series, U, ChartUtilities, SeriesDescriber, Announcer, EventProvider) {
        /* *
         *
         *  (c) 2009-2021 Øystein Moseng
         *
         *  Handle announcing new data for a chart.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var extend = U.extend,
            defined = U.defined;
        var getChartTitle = ChartUtilities.getChartTitle;
        var defaultPointDescriptionFormatter = SeriesDescriber
                .defaultPointDescriptionFormatter,
            defaultSeriesDescriptionFormatter = SeriesDescriber
                .defaultSeriesDescriptionFormatter;
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /**
         * @private
         */
        function chartHasAnnounceEnabled(chart) {
            return !!chart.options.accessibility.announceNewData.enabled;
        }
        /**
         * @private
         */
        function findPointInDataArray(point) {
            var candidates = point.series.data.filter(function (candidate) {
                    return point.x === candidate.x && point.y === candidate.y;
            });
            return candidates.length === 1 ? candidates[0] : point;
        }
        /**
         * Get array of unique series from two arrays
         * @private
         */
        function getUniqueSeries(arrayA, arrayB) {
            var uniqueSeries = (arrayA || []).concat(arrayB || [])
                    .reduce(function (acc,
                cur) {
                    acc[cur.name + cur.index] = cur;
                return acc;
            }, {});
            return Object.keys(uniqueSeries).map(function (ix) {
                return uniqueSeries[ix];
            });
        }
        /**
         * @private
         * @class
         */
        var NewDataAnnouncer = function (chart) {
                this.chart = chart;
        };
        extend(NewDataAnnouncer.prototype, {
            /**
             * Initialize the new data announcer.
             * @private
             */
            init: function () {
                var chart = this.chart;
                var announceOptions = chart.options.accessibility.announceNewData;
                var announceType = announceOptions.interruptUser ? 'assertive' : 'polite';
                this.lastAnnouncementTime = 0;
                this.dirty = {
                    allSeries: {}
                };
                this.eventProvider = new EventProvider();
                this.announcer = new Announcer(chart, announceType);
                this.addEventListeners();
            },
            /**
             * Remove traces of announcer.
             * @private
             */
            destroy: function () {
                this.eventProvider.removeAddedEvents();
                this.announcer.destroy();
            },
            /**
             * Add event listeners for the announcer
             * @private
             */
            addEventListeners: function () {
                var announcer = this,
                    chart = this.chart,
                    e = this.eventProvider;
                e.addEvent(chart, 'afterDrilldown', function () {
                    announcer.lastAnnouncementTime = 0;
                });
                e.addEvent(Series, 'updatedData', function () {
                    announcer.onSeriesUpdatedData(this);
                });
                e.addEvent(chart, 'afterAddSeries', function (e) {
                    announcer.onSeriesAdded(e.series);
                });
                e.addEvent(Series, 'addPoint', function (e) {
                    announcer.onPointAdded(e.point);
                });
                e.addEvent(chart, 'redraw', function () {
                    announcer.announceDirtyData();
                });
            },
            /**
             * On new data in the series, make sure we add it to the dirty list.
             * @private
             * @param {Highcharts.Series} series
             */
            onSeriesUpdatedData: function (series) {
                var chart = this.chart;
                if (series.chart === chart && chartHasAnnounceEnabled(chart)) {
                    this.dirty.hasDirty = true;
                    this.dirty.allSeries[series.name + series.index] = series;
                }
            },
            /**
             * On new data series added, update dirty list.
             * @private
             * @param {Highcharts.Series} series
             */
            onSeriesAdded: function (series) {
                if (chartHasAnnounceEnabled(this.chart)) {
                    this.dirty.hasDirty = true;
                    this.dirty.allSeries[series.name + series.index] = series;
                    // Add it to newSeries storage unless we already have one
                    this.dirty.newSeries = defined(this.dirty.newSeries) ?
                        void 0 : series;
                }
            },
            /**
             * On new point added, update dirty list.
             * @private
             * @param {Highcharts.Point} point
             */
            onPointAdded: function (point) {
                var chart = point.series.chart;
                if (this.chart === chart && chartHasAnnounceEnabled(chart)) {
                    // Add it to newPoint storage unless we already have one
                    this.dirty.newPoint = defined(this.dirty.newPoint) ?
                        void 0 : point;
                }
            },
            /**
             * Gather what we know and announce the data to user.
             * @private
             */
            announceDirtyData: function () {
                var chart = this.chart,
                    announcer = this;
                if (chart.options.accessibility.announceNewData &&
                    this.dirty.hasDirty) {
                    var newPoint = this.dirty.newPoint;
                    // If we have a single new point, see if we can find it in the
                    // data array. Otherwise we can only pass through options to
                    // the description builder, and it is a bit sparse in info.
                    if (newPoint) {
                        newPoint = findPointInDataArray(newPoint);
                    }
                    this.queueAnnouncement(Object.keys(this.dirty.allSeries).map(function (ix) {
                        return announcer.dirty.allSeries[ix];
                    }), this.dirty.newSeries, newPoint);
                    // Reset
                    this.dirty = {
                        allSeries: {}
                    };
                }
            },
            /**
             * Announce to user that there is new data.
             * @private
             * @param {Array<Highcharts.Series>} dirtySeries
             *          Array of series with new data.
             * @param {Highcharts.Series} [newSeries]
             *          If a single new series was added, a reference to this series.
             * @param {Highcharts.Point} [newPoint]
             *          If a single point was added, a reference to this point.
             */
            queueAnnouncement: function (dirtySeries, newSeries, newPoint) {
                var _this = this;
                var chart = this.chart;
                var annOptions = chart.options.accessibility.announceNewData;
                if (annOptions.enabled) {
                    var now = +new Date();
                    var dTime = now - this.lastAnnouncementTime;
                    var time = Math.max(0,
                        annOptions.minAnnounceInterval - dTime);
                    // Add series from previously queued announcement.
                    var allSeries = getUniqueSeries(this.queuedAnnouncement && this.queuedAnnouncement.series,
                        dirtySeries);
                    // Build message and announce
                    var message = this.buildAnnouncementMessage(allSeries,
                        newSeries,
                        newPoint);
                    if (message) {
                        // Is there already one queued?
                        if (this.queuedAnnouncement) {
                            clearTimeout(this.queuedAnnouncementTimer);
                        }
                        // Build the announcement
                        this.queuedAnnouncement = {
                            time: now,
                            message: message,
                            series: allSeries
                        };
                        // Queue the announcement
                        this.queuedAnnouncementTimer = setTimeout(function () {
                            if (_this && _this.announcer) {
                                _this.lastAnnouncementTime = +new Date();
                                _this.announcer.announce(_this.queuedAnnouncement.message);
                                delete _this.queuedAnnouncement;
                                delete _this.queuedAnnouncementTimer;
                            }
                        }, time);
                    }
                }
            },
            /**
             * Get announcement message for new data.
             * @private
             * @param {Array<Highcharts.Series>} dirtySeries
             *          Array of series with new data.
             * @param {Highcharts.Series} [newSeries]
             *          If a single new series was added, a reference to this series.
             * @param {Highcharts.Point} [newPoint]
             *          If a single point was added, a reference to this point.
             *
             * @return {string|null}
             * The announcement message to give to user.
             */
            buildAnnouncementMessage: function (dirtySeries, newSeries, newPoint) {
                var chart = this.chart,
                    annOptions = chart.options.accessibility.announceNewData;
                // User supplied formatter?
                if (annOptions.announcementFormatter) {
                    var formatterRes = annOptions.announcementFormatter(dirtySeries,
                        newSeries,
                        newPoint);
                    if (formatterRes !== false) {
                        return formatterRes.length ? formatterRes : null;
                    }
                }
                // Default formatter - use lang options
                var multiple = H.charts && H.charts.length > 1 ? 'Multiple' : 'Single', langKey = newSeries ? 'newSeriesAnnounce' + multiple :
                        newPoint ? 'newPointAnnounce' + multiple : 'newDataAnnounce', chartTitle = getChartTitle(chart);
                return chart.langFormat('accessibility.announceNewData.' + langKey, {
                    chartTitle: chartTitle,
                    seriesDesc: newSeries ?
                        defaultSeriesDescriptionFormatter(newSeries) :
                        null,
                    pointDesc: newPoint ?
                        defaultPointDescriptionFormatter(newPoint) :
                        null,
                    point: newPoint,
                    series: newSeries
                });
            }
        });

        return NewDataAnnouncer;
    });
    _registerModule(_modules, 'Accessibility/Components/SeriesComponent/ForcedMarkers.js', [_modules['Core/Series/Series.js'], _modules['Core/Utilities.js']], function (Series, U) {
        /* *
         *
         *  (c) 2009-2021 Øystein Moseng
         *
         *  Handle forcing series markers.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var addEvent = U.addEvent,
            merge = U.merge;
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /**
         * @private
         */
        function isWithinDescriptionThreshold(series) {
            var a11yOptions = series.chart.options.accessibility;
            return series.points.length <
                a11yOptions.series.pointDescriptionEnabledThreshold ||
                a11yOptions.series.pointDescriptionEnabledThreshold === false;
        }
        /**
         * @private
         */
        function shouldForceMarkers(series) {
            var chart = series.chart,
                chartA11yEnabled = chart.options.accessibility.enabled,
                seriesA11yEnabled = (series.options.accessibility &&
                    series.options.accessibility.enabled) !== false;
            return chartA11yEnabled && seriesA11yEnabled && isWithinDescriptionThreshold(series);
        }
        /**
         * @private
         */
        function hasIndividualPointMarkerOptions(series) {
            return !!(series._hasPointMarkers && series.points && series.points.length);
        }
        /**
         * @private
         */
        function unforceSeriesMarkerOptions(series) {
            var resetMarkerOptions = series.resetA11yMarkerOptions;
            if (resetMarkerOptions) {
                merge(true, series.options, {
                    marker: {
                        enabled: resetMarkerOptions.enabled,
                        states: {
                            normal: {
                                opacity: resetMarkerOptions.states &&
                                    resetMarkerOptions.states.normal &&
                                    resetMarkerOptions.states.normal.opacity
                            }
                        }
                    }
                });
            }
        }
        /**
         * @private
         */
        function forceZeroOpacityMarkerOptions(options) {
            merge(true, options, {
                marker: {
                    enabled: true,
                    states: {
                        normal: {
                            opacity: 0
                        }
                    }
                }
            });
        }
        /**
         * @private
         */
        function getPointMarkerOpacity(pointOptions) {
            return pointOptions.marker.states &&
                pointOptions.marker.states.normal &&
                pointOptions.marker.states.normal.opacity || 1;
        }
        /**
         * @private
         */
        function unforcePointMarkerOptions(pointOptions) {
            merge(true, pointOptions.marker, {
                states: {
                    normal: {
                        opacity: getPointMarkerOpacity(pointOptions)
                    }
                }
            });
        }
        /**
         * @private
         */
        function handleForcePointMarkers(series) {
            var i = series.points.length;
            while (i--) {
                var point = series.points[i];
                var pointOptions = point.options;
                delete point.hasForcedA11yMarker;
                if (pointOptions.marker) {
                    if (pointOptions.marker.enabled) {
                        unforcePointMarkerOptions(pointOptions);
                        point.hasForcedA11yMarker = false;
                    }
                    else {
                        forceZeroOpacityMarkerOptions(pointOptions);
                        point.hasForcedA11yMarker = true;
                    }
                }
            }
        }
        /**
         * @private
         */
        function addForceMarkersEvents() {
            /**
             * Keep track of forcing markers.
             * @private
             */
            addEvent(Series, 'render', function () {
                var series = this,
                    options = series.options;
                if (shouldForceMarkers(series)) {
                    if (options.marker && options.marker.enabled === false) {
                        series.a11yMarkersForced = true;
                        forceZeroOpacityMarkerOptions(series.options);
                    }
                    if (hasIndividualPointMarkerOptions(series)) {
                        handleForcePointMarkers(series);
                    }
                }
                else if (series.a11yMarkersForced) {
                    delete series.a11yMarkersForced;
                    unforceSeriesMarkerOptions(series);
                }
            });
            /**
             * Keep track of options to reset markers to if no longer forced.
             * @private
             */
            addEvent(Series, 'afterSetOptions', function (e) {
                this.resetA11yMarkerOptions = merge(e.options.marker || {}, this.userOptions.marker || {});
            });
            /**
             * Process marker graphics after render
             * @private
             */
            addEvent(Series, 'afterRender', function () {
                var series = this;
                // For styled mode the rendered graphic does not reflect the style
                // options, and we need to add/remove classes to achieve the same.
                if (series.chart.styledMode) {
                    if (series.markerGroup) {
                        series.markerGroup[series.a11yMarkersForced ? 'addClass' : 'removeClass']('highcharts-a11y-markers-hidden');
                    }
                    // Do we need to handle individual points?
                    if (hasIndividualPointMarkerOptions(series)) {
                        series.points.forEach(function (point) {
                            if (point.graphic) {
                                point.graphic[point.hasForcedA11yMarker ? 'addClass' : 'removeClass']('highcharts-a11y-marker-hidden');
                                point.graphic[point.hasForcedA11yMarker === false ? 'addClass' : 'removeClass']('highcharts-a11y-marker-visible');
                            }
                        });
                    }
                }
            });
        }

        return addForceMarkersEvents;
    });
    _registerModule(_modules, 'Accessibility/Components/SeriesComponent/SeriesComponent.js', [_modules['Core/Globals.js'], _modules['Core/Utilities.js'], _modules['Accessibility/AccessibilityComponent.js'], _modules['Accessibility/Components/SeriesComponent/SeriesKeyboardNavigation.js'], _modules['Accessibility/Components/SeriesComponent/NewDataAnnouncer.js'], _modules['Accessibility/Components/SeriesComponent/ForcedMarkers.js'], _modules['Accessibility/Utils/ChartUtilities.js'], _modules['Accessibility/Components/SeriesComponent/SeriesDescriber.js'], _modules['Core/Tooltip.js']], function (H, U, AccessibilityComponent, SeriesKeyboardNavigation, NewDataAnnouncer, addForceMarkersEvents, ChartUtilities, SeriesDescriber, Tooltip) {
        /* *
         *
         *  (c) 2009-2021 Øystein Moseng
         *
         *  Accessibility component for series and points.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var extend = U.extend;
        var hideSeriesFromAT = ChartUtilities.hideSeriesFromAT;
        var describeSeries = SeriesDescriber.describeSeries;
        // Expose functionality to users
        H.SeriesAccessibilityDescriber = SeriesDescriber;
        // Handle forcing markers
        addForceMarkersEvents();
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /**
         * The SeriesComponent class
         *
         * @private
         * @class
         * @name Highcharts.SeriesComponent
         */
        var SeriesComponent = function () { };
        SeriesComponent.prototype = new AccessibilityComponent();
        extend(SeriesComponent.prototype, /** @lends Highcharts.SeriesComponent */ {
            /**
             * Init the component.
             */
            init: function () {
                this.newDataAnnouncer = new NewDataAnnouncer(this.chart);
                this.newDataAnnouncer.init();
                this.keyboardNavigation = new SeriesKeyboardNavigation(this.chart, this.keyCodes);
                this.keyboardNavigation.init();
                this.hideTooltipFromATWhenShown();
                this.hideSeriesLabelsFromATWhenShown();
            },
            /**
             * @private
             */
            hideTooltipFromATWhenShown: function () {
                var component = this;
                this.addEvent(Tooltip, 'refresh', function () {
                    if (this.chart === component.chart &&
                        this.label &&
                        this.label.element) {
                        this.label.element.setAttribute('aria-hidden', true);
                    }
                });
            },
            /**
             * @private
             */
            hideSeriesLabelsFromATWhenShown: function () {
                this.addEvent(this.chart, 'afterDrawSeriesLabels', function () {
                    this.series.forEach(function (series) {
                        if (series.labelBySeries) {
                            series.labelBySeries.attr('aria-hidden', true);
                        }
                    });
                });
            },
            /**
             * Called on chart render. It is necessary to do this for render in case
             * markers change on zoom/pixel density.
             */
            onChartRender: function () {
                var chart = this.chart;
                chart.series.forEach(function (series) {
                    var shouldDescribeSeries = (series.options.accessibility &&
                            series.options.accessibility.enabled) !== false &&
                            series.visible;
                    if (shouldDescribeSeries) {
                        describeSeries(series);
                    }
                    else {
                        hideSeriesFromAT(series);
                    }
                });
            },
            /**
             * Get keyboard navigation handler for this component.
             * @return {Highcharts.KeyboardNavigationHandler}
             */
            getKeyboardNavigation: function () {
                return this.keyboardNavigation.getKeyboardNavigationHandler();
            },
            /**
             * Remove traces
             */
            destroy: function () {
                this.newDataAnnouncer.destroy();
                this.keyboardNavigation.destroy();
            }
        });

        return SeriesComponent;
    });
    _registerModule(_modules, 'Accessibility/Components/ZoomComponent.js', [_modules['Accessibility/AccessibilityComponent.js'], _modules['Accessibility/Utils/ChartUtilities.js'], _modules['Core/Globals.js'], _modules['Accessibility/Utils/HTMLUtilities.js'], _modules['Accessibility/KeyboardNavigationHandler.js'], _modules['Core/Utilities.js']], function (AccessibilityComponent, ChartUtilities, H, HTMLUtilities, KeyboardNavigationHandler, U) {
        /* *
         *
         *  (c) 2009-2021 Øystein Moseng
         *
         *  Accessibility component for chart zoom.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var unhideChartElementFromAT = ChartUtilities.unhideChartElementFromAT;
        var noop = H.noop;
        var removeElement = HTMLUtilities.removeElement,
            setElAttrs = HTMLUtilities.setElAttrs;
        var extend = U.extend,
            pick = U.pick;
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /**
         * @private
         */
        function chartHasMapZoom(chart) {
            return !!(chart.mapZoom &&
                chart.mapNavButtons &&
                chart.mapNavButtons.length);
        }
        /**
         * Pan along axis in a direction (1 or -1), optionally with a defined
         * granularity (number of steps it takes to walk across current view)
         *
         * @private
         * @function Highcharts.Axis#panStep
         *
         * @param {number} direction
         * @param {number} [granularity]
         */
        H.Axis.prototype.panStep = function (direction, granularity) {
            var gran = granularity || 3,
                extremes = this.getExtremes(),
                step = (extremes.max - extremes.min) / gran * direction,
                newMax = extremes.max + step,
                newMin = extremes.min + step,
                size = newMax - newMin;
            if (direction < 0 && newMin < extremes.dataMin) {
                newMin = extremes.dataMin;
                newMax = newMin + size;
            }
            else if (direction > 0 && newMax > extremes.dataMax) {
                newMax = extremes.dataMax;
                newMin = newMax - size;
            }
            this.setExtremes(newMin, newMax);
        };
        /**
         * The ZoomComponent class
         *
         * @private
         * @class
         * @name Highcharts.ZoomComponent
         */
        var ZoomComponent = noop;
        ZoomComponent.prototype = new AccessibilityComponent();
        extend(ZoomComponent.prototype, /** @lends Highcharts.ZoomComponent */ {
            /**
             * Initialize the component
             */
            init: function () {
                var component = this,
                    chart = this.chart;
                [
                    'afterShowResetZoom', 'afterDrilldown', 'drillupall'
                ].forEach(function (eventType) {
                    component.addEvent(chart, eventType, function () {
                        component.updateProxyOverlays();
                    });
                });
            },
            /**
             * Called when chart is updated
             */
            onChartUpdate: function () {
                var chart = this.chart,
                    component = this;
                // Make map zoom buttons accessible
                if (chart.mapNavButtons) {
                    chart.mapNavButtons.forEach(function (button, i) {
                        unhideChartElementFromAT(chart, button.element);
                        component.setMapNavButtonAttrs(button.element, 'accessibility.zoom.mapZoom' + (i ? 'Out' : 'In'));
                    });
                }
            },
            /**
             * @private
             * @param {Highcharts.HTMLDOMElement|Highcharts.SVGDOMElement} button
             * @param {string} labelFormatKey
             */
            setMapNavButtonAttrs: function (button, labelFormatKey) {
                var chart = this.chart,
                    label = chart.langFormat(labelFormatKey, { chart: chart });
                setElAttrs(button, {
                    tabindex: -1,
                    role: 'button',
                    'aria-label': label
                });
            },
            /**
             * Update the proxy overlays on every new render to ensure positions are
             * correct.
             */
            onChartRender: function () {
                this.updateProxyOverlays();
            },
            /**
             * Update proxy overlays, recreating the buttons.
             */
            updateProxyOverlays: function () {
                var chart = this.chart;
                // Always start with a clean slate
                removeElement(this.drillUpProxyGroup);
                removeElement(this.resetZoomProxyGroup);
                if (chart.resetZoomButton) {
                    this.recreateProxyButtonAndGroup(chart.resetZoomButton, 'resetZoomProxyButton', 'resetZoomProxyGroup', chart.langFormat('accessibility.zoom.resetZoomButton', { chart: chart }));
                }
                if (chart.drillUpButton) {
                    this.recreateProxyButtonAndGroup(chart.drillUpButton, 'drillUpProxyButton', 'drillUpProxyGroup', chart.langFormat('accessibility.drillUpButton', {
                        chart: chart,
                        buttonText: chart.getDrilldownBackText()
                    }));
                }
            },
            /**
             * @private
             * @param {Highcharts.SVGElement} buttonEl
             * @param {string} buttonProp
             * @param {string} groupProp
             * @param {string} label
             */
            recreateProxyButtonAndGroup: function (buttonEl, buttonProp, groupProp, label) {
                removeElement(this[groupProp]);
                this[groupProp] = this.addProxyGroup();
                this[buttonProp] = this.createProxyButton(buttonEl, this[groupProp], { 'aria-label': label, tabindex: -1 });
            },
            /**
             * Get keyboard navigation handler for map zoom.
             * @private
             * @return {Highcharts.KeyboardNavigationHandler} The module object
             */
            getMapZoomNavigation: function () {
                var keys = this.keyCodes,
                    chart = this.chart,
                    component = this;
                return new KeyboardNavigationHandler(chart, {
                    keyCodeMap: [
                        [
                            [keys.up, keys.down, keys.left, keys.right],
                            function (keyCode) {
                                return component.onMapKbdArrow(this, keyCode);
                            }
                        ],
                        [
                            [keys.tab],
                            function (_keyCode, e) {
                                return component.onMapKbdTab(this, e);
                            }
                        ],
                        [
                            [keys.space, keys.enter],
                            function () {
                                return component.onMapKbdClick(this);
                            }
                        ]
                    ],
                    validate: function () {
                        return chartHasMapZoom(chart);
                    },
                    init: function (direction) {
                        return component.onMapNavInit(direction);
                    }
                });
            },
            /**
             * @private
             * @param {Highcharts.KeyboardNavigationHandler} keyboardNavigationHandler
             * @param {number} keyCode
             * @return {number} Response code
             */
            onMapKbdArrow: function (keyboardNavigationHandler, keyCode) {
                var keys = this.keyCodes,
                    panAxis = (keyCode === keys.up || keyCode === keys.down) ?
                        'yAxis' : 'xAxis',
                    stepDirection = (keyCode === keys.left || keyCode === keys.up) ?
                        -1 : 1;
                this.chart[panAxis][0].panStep(stepDirection);
                return keyboardNavigationHandler.response.success;
            },
            /**
             * @private
             * @param {Highcharts.KeyboardNavigationHandler} keyboardNavigationHandler
             * @param {global.KeyboardEvent} event
             * @return {number} Response code
             */
            onMapKbdTab: function (keyboardNavigationHandler, event) {
                var button,
                    chart = this.chart,
                    response = keyboardNavigationHandler.response,
                    isBackwards = event.shiftKey,
                    isMoveOutOfRange = isBackwards && !this.focusedMapNavButtonIx ||
                        !isBackwards && this.focusedMapNavButtonIx;
                // Deselect old
                chart.mapNavButtons[this.focusedMapNavButtonIx].setState(0);
                if (isMoveOutOfRange) {
                    chart.mapZoom(); // Reset zoom
                    return response[isBackwards ? 'prev' : 'next'];
                }
                // Select other button
                this.focusedMapNavButtonIx += isBackwards ? -1 : 1;
                button = chart.mapNavButtons[this.focusedMapNavButtonIx];
                chart.setFocusToElement(button.box, button.element);
                button.setState(2);
                return response.success;
            },
            /**
             * @private
             * @param {Highcharts.KeyboardNavigationHandler} keyboardNavigationHandler
             * @return {number} Response code
             */
            onMapKbdClick: function (keyboardNavigationHandler) {
                this.fakeClickEvent(this.chart.mapNavButtons[this.focusedMapNavButtonIx]
                    .element);
                return keyboardNavigationHandler.response.success;
            },
            /**
             * @private
             * @param {number} direction
             */
            onMapNavInit: function (direction) {
                var chart = this.chart,
                    zoomIn = chart.mapNavButtons[0],
                    zoomOut = chart.mapNavButtons[1],
                    initialButton = direction > 0 ? zoomIn : zoomOut;
                chart.setFocusToElement(initialButton.box, initialButton.element);
                initialButton.setState(2);
                this.focusedMapNavButtonIx = direction > 0 ? 0 : 1;
            },
            /**
             * Get keyboard navigation handler for a simple chart button. Provide the
             * button reference for the chart, and a function to call on click.
             *
             * @private
             * @param {string} buttonProp The property on chart referencing the button.
             * @return {Highcharts.KeyboardNavigationHandler} The module object
             */
            simpleButtonNavigation: function (buttonProp, proxyProp, onClick) {
                var keys = this.keyCodes,
                    component = this,
                    chart = this.chart;
                return new KeyboardNavigationHandler(chart, {
                    keyCodeMap: [
                        [
                            [keys.tab, keys.up, keys.down, keys.left, keys.right],
                            function (keyCode, e) {
                                var isBackwards = keyCode === keys.tab && e.shiftKey ||
                                        keyCode === keys.left || keyCode === keys.up;
                                // Arrow/tab => just move
                                return this.response[isBackwards ? 'prev' : 'next'];
                            }
                        ],
                        [
                            [keys.space, keys.enter],
                            function () {
                                var res = onClick(this,
                                    chart);
                                return pick(res, this.response.success);
                            }
                        ]
                    ],
                    validate: function () {
                        var hasButton = (chart[buttonProp] &&
                                chart[buttonProp].box &&
                                component[proxyProp]);
                        return hasButton;
                    },
                    init: function () {
                        chart.setFocusToElement(chart[buttonProp].box, component[proxyProp]);
                    }
                });
            },
            /**
             * Get keyboard navigation handlers for this component.
             * @return {Array<Highcharts.KeyboardNavigationHandler>}
             *         List of module objects
             */
            getKeyboardNavigation: function () {
                return [
                    this.simpleButtonNavigation('resetZoomButton', 'resetZoomProxyButton', function (_handler, chart) {
                        chart.zoomOut();
                    }),
                    this.simpleButtonNavigation('drillUpButton', 'drillUpProxyButton', function (handler, chart) {
                        chart.drillUp();
                        return handler.response.prev;
                    }),
                    this.getMapZoomNavigation()
                ];
            }
        });

        return ZoomComponent;
    });
    _registerModule(_modules, 'Extensions/RangeSelector.js', [_modules['Core/Axis/Axis.js'], _modules['Core/Chart/Chart.js'], _modules['Core/Globals.js'], _modules['Core/DefaultOptions.js'], _modules['Core/Color/Palette.js'], _modules['Core/Renderer/SVG/SVGElement.js'], _modules['Core/Utilities.js']], function (Axis, Chart, H, D, palette, SVGElement, U) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var defaultOptions = D.defaultOptions;
        var addEvent = U.addEvent,
            createElement = U.createElement,
            css = U.css,
            defined = U.defined,
            destroyObjectProperties = U.destroyObjectProperties,
            discardElement = U.discardElement,
            extend = U.extend,
            find = U.find,
            fireEvent = U.fireEvent,
            isNumber = U.isNumber,
            merge = U.merge,
            objectEach = U.objectEach,
            pad = U.pad,
            pick = U.pick,
            pInt = U.pInt,
            splat = U.splat;
        /**
         * Define the time span for the button
         *
         * @typedef {"all"|"day"|"hour"|"millisecond"|"minute"|"month"|"second"|"week"|"year"|"ytd"} Highcharts.RangeSelectorButtonTypeValue
         */
        /**
         * Callback function to react on button clicks.
         *
         * @callback Highcharts.RangeSelectorClickCallbackFunction
         *
         * @param {global.Event} e
         *        Event arguments.
         *
         * @param {boolean|undefined}
         *        Return false to cancel the default button event.
         */
        /**
         * Callback function to parse values entered in the input boxes and return a
         * valid JavaScript time as milliseconds since 1970.
         *
         * @callback Highcharts.RangeSelectorParseCallbackFunction
         *
         * @param {string} value
         *        Input value to parse.
         *
         * @return {number}
         *         Parsed JavaScript time value.
         */
        /* ************************************************************************** *
         * Start Range Selector code                                                  *
         * ************************************************************************** */
        extend(defaultOptions, {
            /**
             * The range selector is a tool for selecting ranges to display within
             * the chart. It provides buttons to select preconfigured ranges in
             * the chart, like 1 day, 1 week, 1 month etc. It also provides input
             * boxes where min and max dates can be manually input.
             *
             * @product      highstock gantt
             * @optionparent rangeSelector
             */
            rangeSelector: {
                /**
                 * Whether to enable all buttons from the start. By default buttons are
                 * only enabled if the corresponding time range exists on the X axis,
                 * but enabling all buttons allows for dynamically loading different
                 * time ranges.
                 *
                 * @sample {highstock} stock/rangeselector/allbuttonsenabled-true/
                 *         All buttons enabled
                 *
                 * @since     2.0.3
                 */
                allButtonsEnabled: false,
                /**
                 * An array of configuration objects for the buttons.
                 *
                 * Defaults to:
                 * ```js
                 * buttons: [{
                 *     type: 'month',
                 *     count: 1,
                 *     text: '1m',
                 *     title: 'View 1 month'
                 * }, {
                 *     type: 'month',
                 *     count: 3,
                 *     text: '3m',
                 *     title: 'View 3 months'
                 * }, {
                 *     type: 'month',
                 *     count: 6,
                 *     text: '6m',
                 *     title: 'View 6 months'
                 * }, {
                 *     type: 'ytd',
                 *     text: 'YTD',
                 *     title: 'View year to date'
                 * }, {
                 *     type: 'year',
                 *     count: 1,
                 *     text: '1y',
                 *     title: 'View 1 year'
                 * }, {
                 *     type: 'all',
                 *     text: 'All',
                 *     title: 'View all'
                 * }]
                 * ```
                 *
                 * @sample {highstock} stock/rangeselector/datagrouping/
                 *         Data grouping by buttons
                 *
                 * @type      {Array<*>}
                 */
                buttons: void 0,
                /**
                 * How many units of the defined type the button should span. If `type`
                 * is "month" and `count` is 3, the button spans three months.
                 *
                 * @type      {number}
                 * @default   1
                 * @apioption rangeSelector.buttons.count
                 */
                /**
                 * Fires when clicking on the rangeSelector button. One parameter,
                 * event, is passed to the function, containing common event
                 * information.
                 *
                 * ```js
                 * click: function(e) {
                 *   console.log(this);
                 * }
                 * ```
                 *
                 * Return false to stop default button's click action.
                 *
                 * @sample {highstock} stock/rangeselector/button-click/
                 *         Click event on the button
                 *
                 * @type      {Highcharts.RangeSelectorClickCallbackFunction}
                 * @apioption rangeSelector.buttons.events.click
                 */
                /**
                 * Additional range (in milliseconds) added to the end of the calculated
                 * time span.
                 *
                 * @sample {highstock} stock/rangeselector/min-max-offsets/
                 *         Button offsets
                 *
                 * @type      {number}
                 * @default   0
                 * @since     6.0.0
                 * @apioption rangeSelector.buttons.offsetMax
                 */
                /**
                 * Additional range (in milliseconds) added to the start of the
                 * calculated time span.
                 *
                 * @sample {highstock} stock/rangeselector/min-max-offsets/
                 *         Button offsets
                 *
                 * @type      {number}
                 * @default   0
                 * @since     6.0.0
                 * @apioption rangeSelector.buttons.offsetMin
                 */
                /**
                 * When buttons apply dataGrouping on a series, by default zooming
                 * in/out will deselect buttons and unset dataGrouping. Enable this
                 * option to keep buttons selected when extremes change.
                 *
                 * @sample {highstock} stock/rangeselector/preserve-datagrouping/
                 *         Different preserveDataGrouping settings
                 *
                 * @type      {boolean}
                 * @default   false
                 * @since     6.1.2
                 * @apioption rangeSelector.buttons.preserveDataGrouping
                 */
                /**
                 * A custom data grouping object for each button.
                 *
                 * @see [series.dataGrouping](#plotOptions.series.dataGrouping)
                 *
                 * @sample {highstock} stock/rangeselector/datagrouping/
                 *         Data grouping by range selector buttons
                 *
                 * @type      {*}
                 * @extends   plotOptions.series.dataGrouping
                 * @apioption rangeSelector.buttons.dataGrouping
                 */
                /**
                 * The text for the button itself.
                 *
                 * @type      {string}
                 * @apioption rangeSelector.buttons.text
                 */
                /**
                 * Explanation for the button, shown as a tooltip on hover, and used by
                 * assistive technology.
                 *
                 * @type      {string}
                 * @apioption rangeSelector.buttons.title
                 */
                /**
                 * Defined the time span for the button. Can be one of `millisecond`,
                 * `second`, `minute`, `hour`, `day`, `week`, `month`, `year`, `ytd`,
                 * and `all`.
                 *
                 * @type       {Highcharts.RangeSelectorButtonTypeValue}
                 * @apioption  rangeSelector.buttons.type
                 */
                /**
                 * The space in pixels between the buttons in the range selector.
                 */
                buttonSpacing: 5,
                /**
                 * Whether to collapse the range selector buttons into a dropdown when
                 * there is not enough room to show everything in a single row, instead
                 * of dividing the range selector into multiple rows.
                 * Can be one of the following:
                 *  - `always`: Always collapse
                 *  - `responsive`: Only collapse when there is not enough room
                 *  - `never`: Never collapse
                 *
                 * @sample {highstock} stock/rangeselector/dropdown/
                 *         Dropdown option
                 *
                 * @validvalue ["always", "responsive", "never"]
                 * @since 9.0.0
                 */
                dropdown: 'responsive',
                /**
                 * Enable or disable the range selector. Default to `true` for stock
                 * charts, using the `stockChart` factory.
                 *
                 * @sample {highstock} stock/rangeselector/enabled/
                 *         Disable the range selector
                 *
                 * @type {boolean|undefined}
                 * @default {highstock} true
                 */
                enabled: void 0,
                /**
                 * The vertical alignment of the rangeselector box. Allowed properties
                 * are `top`, `middle`, `bottom`.
                 *
                 * @sample {highstock} stock/rangeselector/vertical-align-middle/
                 *         Middle
                 * @sample {highstock} stock/rangeselector/vertical-align-bottom/
                 *         Bottom
                 *
                 * @type  {Highcharts.VerticalAlignValue}
                 * @since 6.0.0
                 */
                verticalAlign: 'top',
                /**
                 * A collection of attributes for the buttons. The object takes SVG
                 * attributes like `fill`, `stroke`, `stroke-width`, as well as `style`,
                 * a collection of CSS properties for the text.
                 *
                 * The object can also be extended with states, so you can set
                 * presentational options for `hover`, `select` or `disabled` button
                 * states.
                 *
                 * CSS styles for the text label.
                 *
                 * In styled mode, the buttons are styled by the
                 * `.highcharts-range-selector-buttons .highcharts-button` rule with its
                 * different states.
                 *
                 * @sample {highstock} stock/rangeselector/styling/
                 *         Styling the buttons and inputs
                 *
                 * @type {Highcharts.SVGAttributes}
                 */
                buttonTheme: {
                    /** @ignore */
                    width: 28,
                    /** @ignore */
                    height: 18,
                    /** @ignore */
                    padding: 2,
                    /** @ignore */
                    zIndex: 7 // #484, #852
                },
                /**
                 * When the rangeselector is floating, the plot area does not reserve
                 * space for it. This opens for positioning anywhere on the chart.
                 *
                 * @sample {highstock} stock/rangeselector/floating/
                 *         Placing the range selector between the plot area and the
                 *         navigator
                 *
                 * @since 6.0.0
                 */
                floating: false,
                /**
                 * The x offset of the range selector relative to its horizontal
                 * alignment within `chart.spacingLeft` and `chart.spacingRight`.
                 *
                 * @since 6.0.0
                 */
                x: 0,
                /**
                 * The y offset of the range selector relative to its horizontal
                 * alignment within `chart.spacingLeft` and `chart.spacingRight`.
                 *
                 * @since 6.0.0
                 */
                y: 0,
                /**
                 * Deprecated. The height of the range selector. Currently it is
                 * calculated dynamically.
                 *
                 * @deprecated
                 * @type  {number|undefined}
                 * @since 2.1.9
                 */
                height: void 0,
                /**
                 * The border color of the date input boxes.
                 *
                 * @sample {highstock} stock/rangeselector/styling/
                 *         Styling the buttons and inputs
                 *
                 * @type      {Highcharts.ColorString}
                 * @since     1.3.7
                 */
                inputBoxBorderColor: 'none',
                /**
                 * The pixel height of the date input boxes.
                 *
                 * @sample {highstock} stock/rangeselector/styling/
                 *         Styling the buttons and inputs
                 *
                 * @since     1.3.7
                 */
                inputBoxHeight: 17,
                /**
                 * The pixel width of the date input boxes. When `undefined`, the width
                 * is fitted to the rendered content.
                 *
                 * @sample {highstock} stock/rangeselector/styling/
                 *         Styling the buttons and inputs
                 *
                 * @type   {number|undefined}
                 * @since  1.3.7
                 */
                inputBoxWidth: void 0,
                /**
                 * The date format in the input boxes when not selected for editing.
                 * Defaults to `%b %e, %Y`.
                 *
                 * This is used to determine which type of input to show,
                 * `datetime-local`, `date` or `time` and falling back to `text` when
                 * the browser does not support the input type or the format contains
                 * milliseconds.
                 *
                 * @sample {highstock} stock/rangeselector/input-type/
                 *         Input types
                 * @sample {highstock} stock/rangeselector/input-format/
                 *         Milliseconds in the range selector
                 *
                 */
                inputDateFormat: '%b %e, %Y',
                /**
                 * A custom callback function to parse values entered in the input boxes
                 * and return a valid JavaScript time as milliseconds since 1970.
                 * The first argument passed is a value to parse,
                 * second is a boolean indicating use of the UTC time.
                 *
                 * This will only get called for inputs of type `text`. Since v8.2.3,
                 * the input type is dynamically determined based on the granularity
                 * of the `inputDateFormat` and the browser support.
                 *
                 * @sample {highstock} stock/rangeselector/input-format/
                 *         Milliseconds in the range selector
                 *
                 * @type      {Highcharts.RangeSelectorParseCallbackFunction}
                 * @since     1.3.3
                 */
                inputDateParser: void 0,
                /**
                 * The date format in the input boxes when they are selected for
                 * editing. This must be a format that is recognized by JavaScript
                 * Date.parse.
                 *
                 * This will only be used for inputs of type `text`. Since v8.2.3,
                 * the input type is dynamically determined based on the granularity
                 * of the `inputDateFormat` and the browser support.
                 *
                 * @sample {highstock} stock/rangeselector/input-format/
                 *         Milliseconds in the range selector
                 *
                 */
                inputEditDateFormat: '%Y-%m-%d',
                /**
                 * Enable or disable the date input boxes.
                 */
                inputEnabled: true,
                /**
                 * Positioning for the input boxes. Allowed properties are `align`,
                 *  `x` and `y`.
                 *
                 * @since 1.2.4
                 */
                inputPosition: {
                    /**
                     * The alignment of the input box. Allowed properties are `left`,
                     * `center`, `right`.
                     *
                     * @sample {highstock} stock/rangeselector/input-button-position/
                     *         Alignment
                     *
                     * @type  {Highcharts.AlignValue}
                     * @since 6.0.0
                     */
                    align: 'right',
                    /**
                     * X offset of the input row.
                     */
                    x: 0,
                    /**
                     * Y offset of the input row.
                     */
                    y: 0
                },
                /**
                 * The space in pixels between the labels and the date input boxes in
                 * the range selector.
                 *
                 * @since 9.0.0
                 */
                inputSpacing: 5,
                /**
                 * The index of the button to appear pre-selected.
                 *
                 * @type      {number}
                 */
                selected: void 0,
                /**
                 * Positioning for the button row.
                 *
                 * @since 1.2.4
                 */
                buttonPosition: {
                    /**
                     * The alignment of the input box. Allowed properties are `left`,
                     * `center`, `right`.
                     *
                     * @sample {highstock} stock/rangeselector/input-button-position/
                     *         Alignment
                     *
                     * @type  {Highcharts.AlignValue}
                     * @since 6.0.0
                     */
                    align: 'left',
                    /**
                     * X offset of the button row.
                     */
                    x: 0,
                    /**
                     * Y offset of the button row.
                     */
                    y: 0
                },
                /**
                 * CSS for the HTML inputs in the range selector.
                 *
                 * In styled mode, the inputs are styled by the
                 * `.highcharts-range-input text` rule in SVG mode, and
                 * `input.highcharts-range-selector` when active.
                 *
                 * @sample {highstock} stock/rangeselector/styling/
                 *         Styling the buttons and inputs
                 *
                 * @type      {Highcharts.CSSObject}
                 * @apioption rangeSelector.inputStyle
                 */
                inputStyle: {
                    /** @ignore */
                    color: palette.highlightColor80,
                    /** @ignore */
                    cursor: 'pointer'
                },
                /**
                 * CSS styles for the labels - the Zoom, From and To texts.
                 *
                 * In styled mode, the labels are styled by the
                 * `.highcharts-range-label` class.
                 *
                 * @sample {highstock} stock/rangeselector/styling/
                 *         Styling the buttons and inputs
                 *
                 * @type {Highcharts.CSSObject}
                 */
                labelStyle: {
                    /** @ignore */
                    color: palette.neutralColor60
                }
            }
        });
        extend(defaultOptions.lang, 
        /**
         * Language object. The language object is global and it can't be set
         * on each chart initialization. Instead, use `Highcharts.setOptions` to
         * set it before any chart is initialized.
         *
         * ```js
         * Highcharts.setOptions({
         *     lang: {
         *         months: [
         *             'Janvier', 'Février', 'Mars', 'Avril',
         *             'Mai', 'Juin', 'Juillet', 'Août',
         *             'Septembre', 'Octobre', 'Novembre', 'Décembre'
         *         ],
         *         weekdays: [
         *             'Dimanche', 'Lundi', 'Mardi', 'Mercredi',
         *             'Jeudi', 'Vendredi', 'Samedi'
         *         ]
         *     }
         * });
         * ```
         *
         * @optionparent lang
         */
        {
            /**
             * The text for the label for the range selector buttons.
             *
             * @product highstock gantt
             */
            rangeSelectorZoom: 'Zoom',
            /**
             * The text for the label for the "from" input box in the range
             * selector. Since v9.0, this string is empty as the label is not
             * rendered by default.
             *
             * @product highstock gantt
             */
            rangeSelectorFrom: '',
            /**
             * The text for the label for the "to" input box in the range selector.
             *
             * @product highstock gantt
             */
            rangeSelectorTo: '→'
        });
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /**
         * The range selector.
         *
         * @private
         * @class
         * @name Highcharts.RangeSelector
         * @param {Highcharts.Chart} chart
         */
        var RangeSelector = /** @class */ (function () {
                function RangeSelector(chart) {
                    /* *
                     *
                     * Properties
                     *
                     * */
                    this.buttons = void 0;
                this.buttonOptions = RangeSelector.prototype.defaultButtons;
                this.initialButtonGroupWidth = 0;
                this.options = void 0;
                this.chart = chart;
                // Run RangeSelector
                this.init(chart);
            }
            /**
             * The method to run when one of the buttons in the range selectors is
             * clicked
             *
             * @private
             * @function Highcharts.RangeSelector#clickButton
             * @param {number} i
             *        The index of the button
             * @param {boolean} [redraw]
             * @return {void}
             */
            RangeSelector.prototype.clickButton = function (i, redraw) {
                var rangeSelector = this,
                    chart = rangeSelector.chart,
                    rangeOptions = rangeSelector.buttonOptions[i],
                    baseAxis = chart.xAxis[0],
                    unionExtremes = (chart.scroller && chart.scroller.getUnionExtremes()) || baseAxis || {},
                    dataMin = unionExtremes.dataMin,
                    dataMax = unionExtremes.dataMax,
                    newMin,
                    newMax = baseAxis && Math.round(Math.min(baseAxis.max,
                    pick(dataMax,
                    baseAxis.max))), // #1568
                    type = rangeOptions.type,
                    baseXAxisOptions,
                    range = rangeOptions._range,
                    rangeMin,
                    minSetting,
                    rangeSetting,
                    ctx,
                    ytdExtremes,
                    dataGrouping = rangeOptions.dataGrouping;
                // chart has no data, base series is removed
                if (dataMin === null || dataMax === null) {
                    return;
                }
                // Set the fixed range before range is altered
                chart.fixedRange = range;
                rangeSelector.setSelected(i);
                // Apply dataGrouping associated to button
                if (dataGrouping) {
                    this.forcedDataGrouping = true;
                    Axis.prototype.setDataGrouping.call(baseAxis || { chart: this.chart }, dataGrouping, false);
                    this.frozenStates = rangeOptions.preserveDataGrouping;
                }
                // Apply range
                if (type === 'month' || type === 'year') {
                    if (!baseAxis) {
                        // This is set to the user options and picked up later when the
                        // axis is instantiated so that we know the min and max.
                        range = rangeOptions;
                    }
                    else {
                        ctx = {
                            range: rangeOptions,
                            max: newMax,
                            chart: chart,
                            dataMin: dataMin,
                            dataMax: dataMax
                        };
                        newMin = baseAxis.minFromRange.call(ctx);
                        if (isNumber(ctx.newMax)) {
                            newMax = ctx.newMax;
                        }
                    }
                    // Fixed times like minutes, hours, days
                }
                else if (range) {
                    newMin = Math.max(newMax - range, dataMin);
                    newMax = Math.min(newMin + range, dataMax);
                }
                else if (type === 'ytd') {
                    // On user clicks on the buttons, or a delayed action running from
                    // the beforeRender event (below), the baseAxis is defined.
                    if (baseAxis) {
                        // When "ytd" is the pre-selected button for the initial view,
                        // its calculation is delayed and rerun in the beforeRender
                        // event (below). When the series are initialized, but before
                        // the chart is rendered, we have access to the xData array
                        // (#942).
                        if (typeof dataMax === 'undefined') {
                            dataMin = Number.MAX_VALUE;
                            dataMax = Number.MIN_VALUE;
                            chart.series.forEach(function (series) {
                                // reassign it to the last item
                                var xData = series.xData;
                                dataMin = Math.min(xData[0], dataMin);
                                dataMax = Math.max(xData[xData.length - 1], dataMax);
                            });
                            redraw = false;
                        }
                        ytdExtremes = rangeSelector.getYTDExtremes(dataMax, dataMin, chart.time.useUTC);
                        newMin = rangeMin = ytdExtremes.min;
                        newMax = ytdExtremes.max;
                        // "ytd" is pre-selected. We don't yet have access to processed
                        // point and extremes data (things like pointStart and pointInterval
                        // are missing), so we delay the process (#942)
                    }
                    else {
                        rangeSelector.deferredYTDClick = i;
                        return;
                    }
                }
                else if (type === 'all' && baseAxis) {
                    // If the navigator exist and the axis range is declared reset that
                    // range and from now on only use the range set by a user, #14742.
                    if (chart.navigator && chart.navigator.baseSeries[0]) {
                        chart.navigator.baseSeries[0].xAxis.options.range = void 0;
                    }
                    newMin = dataMin;
                    newMax = dataMax;
                }
                if (defined(newMin)) {
                    newMin += rangeOptions._offsetMin;
                }
                if (defined(newMax)) {
                    newMax += rangeOptions._offsetMax;
                }
                if (this.dropdown) {
                    this.dropdown.selectedIndex = i + 1;
                }
                // Update the chart
                if (!baseAxis) {
                    // Axis not yet instanciated. Temporarily set min and range
                    // options and remove them on chart load (#4317).
                    baseXAxisOptions = splat(chart.options.xAxis)[0];
                    rangeSetting = baseXAxisOptions.range;
                    baseXAxisOptions.range = range;
                    minSetting = baseXAxisOptions.min;
                    baseXAxisOptions.min = rangeMin;
                    addEvent(chart, 'load', function resetMinAndRange() {
                        baseXAxisOptions.range = rangeSetting;
                        baseXAxisOptions.min = minSetting;
                    });
                }
                else {
                    // Existing axis object. Set extremes after render time.
                    baseAxis.setExtremes(newMin, newMax, pick(redraw, true), void 0, // auto animation
                    {
                        trigger: 'rangeSelectorButton',
                        rangeSelectorButton: rangeOptions
                    });
                }
                fireEvent(this, 'afterBtnClick');
            };
            /**
             * Set the selected option. This method only sets the internal flag, it
             * doesn't update the buttons or the actual zoomed range.
             *
             * @private
             * @function Highcharts.RangeSelector#setSelected
             * @param {number} [selected]
             * @return {void}
             */
            RangeSelector.prototype.setSelected = function (selected) {
                this.selected = this.options.selected = selected;
            };
            /**
             * Initialize the range selector
             *
             * @private
             * @function Highcharts.RangeSelector#init
             * @param {Highcharts.Chart} chart
             * @return {void}
             */
            RangeSelector.prototype.init = function (chart) {
                var rangeSelector = this,
                    options = chart.options.rangeSelector,
                    buttonOptions = options.buttons || rangeSelector.defaultButtons.slice(),
                    selectedOption = options.selected,
                    blurInputs = function () {
                        var minInput = rangeSelector.minInput,
                    maxInput = rangeSelector.maxInput;
                    // #3274 in some case blur is not defined
                    if (minInput && minInput.blur) {
                        fireEvent(minInput, 'blur');
                    }
                    if (maxInput && maxInput.blur) {
                        fireEvent(maxInput, 'blur');
                    }
                };
                rangeSelector.chart = chart;
                rangeSelector.options = options;
                rangeSelector.buttons = [];
                rangeSelector.buttonOptions = buttonOptions;
                this.eventsToUnbind = [];
                this.eventsToUnbind.push(addEvent(chart.container, 'mousedown', blurInputs));
                this.eventsToUnbind.push(addEvent(chart, 'resize', blurInputs));
                // Extend the buttonOptions with actual range
                buttonOptions.forEach(rangeSelector.computeButtonRange);
                // zoomed range based on a pre-selected button index
                if (typeof selectedOption !== 'undefined' &&
                    buttonOptions[selectedOption]) {
                    this.clickButton(selectedOption, false);
                }
                this.eventsToUnbind.push(addEvent(chart, 'load', function () {
                    // If a data grouping is applied to the current button, release it
                    // when extremes change
                    if (chart.xAxis && chart.xAxis[0]) {
                        addEvent(chart.xAxis[0], 'setExtremes', function (e) {
                            if (this.max - this.min !==
                                chart.fixedRange &&
                                e.trigger !== 'rangeSelectorButton' &&
                                e.trigger !== 'updatedData' &&
                                rangeSelector.forcedDataGrouping &&
                                !rangeSelector.frozenStates) {
                                this.setDataGrouping(false, false);
                            }
                        });
                    }
                }));
            };
            /**
             * Dynamically update the range selector buttons after a new range has been
             * set
             *
             * @private
             * @function Highcharts.RangeSelector#updateButtonStates
             * @return {void}
             */
            RangeSelector.prototype.updateButtonStates = function () {
                var rangeSelector = this,
                    chart = this.chart,
                    dropdown = this.dropdown,
                    baseAxis = chart.xAxis[0],
                    actualRange = Math.round(baseAxis.max - baseAxis.min),
                    hasNoData = !baseAxis.hasVisibleSeries,
                    day = 24 * 36e5, // A single day in milliseconds
                    unionExtremes = (chart.scroller &&
                        chart.scroller.getUnionExtremes()) || baseAxis,
                    dataMin = unionExtremes.dataMin,
                    dataMax = unionExtremes.dataMax,
                    ytdExtremes = rangeSelector.getYTDExtremes(dataMax,
                    dataMin,
                    chart.time.useUTC),
                    ytdMin = ytdExtremes.min,
                    ytdMax = ytdExtremes.max,
                    selected = rangeSelector.selected,
                    selectedExists = isNumber(selected),
                    allButtonsEnabled = rangeSelector.options.allButtonsEnabled,
                    buttons = rangeSelector.buttons;
                rangeSelector.buttonOptions.forEach(function (rangeOptions, i) {
                    var range = rangeOptions._range,
                        type = rangeOptions.type,
                        count = rangeOptions.count || 1,
                        button = buttons[i],
                        state = 0,
                        disable,
                        select,
                        offsetRange = rangeOptions._offsetMax -
                            rangeOptions._offsetMin,
                        isSelected = i === selected, 
                        // Disable buttons where the range exceeds what is allowed in
                        // the current view
                        isTooGreatRange = range >
                            dataMax - dataMin, 
                        // Disable buttons where the range is smaller than the minimum
                        // range
                        isTooSmallRange = range < baseAxis.minRange, 
                        // Do not select the YTD button if not explicitly told so
                        isYTDButNotSelected = false, 
                        // Disable the All button if we're already showing all
                        isAllButAlreadyShowingAll = false,
                        isSameRange = range === actualRange;
                    // Months and years have a variable range so we check the extremes
                    if ((type === 'month' || type === 'year') &&
                        (actualRange + 36e5 >=
                            { month: 28, year: 365 }[type] * day * count - offsetRange) &&
                        (actualRange - 36e5 <=
                            { month: 31, year: 366 }[type] * day * count + offsetRange)) {
                        isSameRange = true;
                    }
                    else if (type === 'ytd') {
                        isSameRange = (ytdMax - ytdMin + offsetRange) === actualRange;
                        isYTDButNotSelected = !isSelected;
                    }
                    else if (type === 'all') {
                        isSameRange = (baseAxis.max - baseAxis.min >=
                            dataMax - dataMin);
                        isAllButAlreadyShowingAll = (!isSelected &&
                            selectedExists &&
                            isSameRange);
                    }
                    // The new zoom area happens to match the range for a button - mark
                    // it selected. This happens when scrolling across an ordinal gap.
                    // It can be seen in the intraday demos when selecting 1h and scroll
                    // across the night gap.
                    disable = (!allButtonsEnabled &&
                        (isTooGreatRange ||
                            isTooSmallRange ||
                            isAllButAlreadyShowingAll ||
                            hasNoData));
                    select = ((isSelected && isSameRange) ||
                        (isSameRange && !selectedExists && !isYTDButNotSelected) ||
                        (isSelected && rangeSelector.frozenStates));
                    if (disable) {
                        state = 3;
                    }
                    else if (select) {
                        selectedExists = true; // Only one button can be selected
                        state = 2;
                    }
                    // If state has changed, update the button
                    if (button.state !== state) {
                        button.setState(state);
                        if (dropdown) {
                            dropdown.options[i + 1].disabled = disable;
                            if (state === 2) {
                                dropdown.selectedIndex = i + 1;
                            }
                        }
                        // Reset (#9209)
                        if (state === 0 && selected === i) {
                            rangeSelector.setSelected();
                        }
                    }
                });
            };
            /**
             * Compute and cache the range for an individual button
             *
             * @private
             * @function Highcharts.RangeSelector#computeButtonRange
             * @param {Highcharts.RangeSelectorButtonsOptions} rangeOptions
             * @return {void}
             */
            RangeSelector.prototype.computeButtonRange = function (rangeOptions) {
                var type = rangeOptions.type,
                    count = rangeOptions.count || 1, 
                    // these time intervals have a fixed number of milliseconds, as
                    // opposed to month, ytd and year
                    fixedTimes = {
                        millisecond: 1,
                        second: 1000,
                        minute: 60 * 1000,
                        hour: 3600 * 1000,
                        day: 24 * 3600 * 1000,
                        week: 7 * 24 * 3600 * 1000
                    };
                // Store the range on the button object
                if (fixedTimes[type]) {
                    rangeOptions._range = fixedTimes[type] * count;
                }
                else if (type === 'month' || type === 'year') {
                    rangeOptions._range = {
                        month: 30,
                        year: 365
                    }[type] * 24 * 36e5 * count;
                }
                rangeOptions._offsetMin = pick(rangeOptions.offsetMin, 0);
                rangeOptions._offsetMax = pick(rangeOptions.offsetMax, 0);
                rangeOptions._range +=
                    rangeOptions._offsetMax - rangeOptions._offsetMin;
            };
            /**
             * Get the unix timestamp of a HTML input for the dates
             *
             * @private
             * @function Highcharts.RangeSelector#getInputValue
             * @param {string} name
             * @return {number}
             */
            RangeSelector.prototype.getInputValue = function (name) {
                var input = name === 'min' ? this.minInput : this.maxInput;
                var options = this.chart.options.rangeSelector;
                var time = this.chart.time;
                if (input) {
                    return ((input.type === 'text' && options.inputDateParser) ||
                        this.defaultInputDateParser)(input.value, time.useUTC, time);
                }
                return 0;
            };
            /**
             * Set the internal and displayed value of a HTML input for the dates
             *
             * @private
             * @function Highcharts.RangeSelector#setInputValue
             * @param {string} name
             * @param {number} [inputTime]
             * @return {void}
             */
            RangeSelector.prototype.setInputValue = function (name, inputTime) {
                var options = this.options, time = this.chart.time, input = name === 'min' ? this.minInput : this.maxInput, dateBox = name === 'min' ? this.minDateBox : this.maxDateBox;
                if (input) {
                    var hcTimeAttr = input.getAttribute('data-hc-time');
                    var updatedTime = defined(hcTimeAttr) ? Number(hcTimeAttr) : void 0;
                    if (defined(inputTime)) {
                        var previousTime = updatedTime;
                        if (defined(previousTime)) {
                            input.setAttribute('data-hc-time-previous', previousTime);
                        }
                        input.setAttribute('data-hc-time', inputTime);
                        updatedTime = inputTime;
                    }
                    input.value = time.dateFormat(this.inputTypeFormats[input.type] || options.inputEditDateFormat, updatedTime);
                    if (dateBox) {
                        dateBox.attr({
                            text: time.dateFormat(options.inputDateFormat, updatedTime)
                        });
                    }
                }
            };
            /**
             * Set the min and max value of a HTML input for the dates
             *
             * @private
             * @function Highcharts.RangeSelector#setInputExtremes
             * @param {string} name
             * @param {number} min
             * @param {number} max
             * @return {void}
             */
            RangeSelector.prototype.setInputExtremes = function (name, min, max) {
                var input = name === 'min' ? this.minInput : this.maxInput;
                if (input) {
                    var format = this.inputTypeFormats[input.type];
                    var time = this.chart.time;
                    if (format) {
                        var newMin = time.dateFormat(format,
                            min);
                        if (input.min !== newMin) {
                            input.min = newMin;
                        }
                        var newMax = time.dateFormat(format,
                            max);
                        if (input.max !== newMax) {
                            input.max = newMax;
                        }
                    }
                }
            };
            /**
             * @private
             * @function Highcharts.RangeSelector#showInput
             * @param {string} name
             * @return {void}
             */
            RangeSelector.prototype.showInput = function (name) {
                var dateBox = name === 'min' ? this.minDateBox : this.maxDateBox;
                var input = name === 'min' ? this.minInput : this.maxInput;
                if (input && dateBox && this.inputGroup) {
                    var isTextInput = input.type === 'text';
                    var _a = this.inputGroup,
                        translateX = _a.translateX,
                        translateY = _a.translateY;
                    var inputBoxWidth = this.options.inputBoxWidth;
                    css(input, {
                        width: isTextInput ? ((dateBox.width + (inputBoxWidth ? -2 : 20)) + 'px') : 'auto',
                        height: isTextInput ? ((dateBox.height - 2) + 'px') : 'auto',
                        border: '2px solid silver'
                    });
                    if (isTextInput && inputBoxWidth) {
                        css(input, {
                            left: (translateX + dateBox.x) + 'px',
                            top: translateY + 'px'
                        });
                        // Inputs of types date, time or datetime-local should be centered
                        // on top of the dateBox
                    }
                    else {
                        css(input, {
                            left: Math.min(Math.round(dateBox.x +
                                translateX -
                                (input.offsetWidth - dateBox.width) / 2), this.chart.chartWidth - input.offsetWidth) + 'px',
                            top: (translateY - (input.offsetHeight - dateBox.height) / 2) + 'px'
                        });
                    }
                }
            };
            /**
             * @private
             * @function Highcharts.RangeSelector#hideInput
             * @param {string} name
             * @return {void}
             */
            RangeSelector.prototype.hideInput = function (name) {
                var input = name === 'min' ? this.minInput : this.maxInput;
                if (input) {
                    css(input, {
                        top: '-9999em',
                        border: 0,
                        width: '1px',
                        height: '1px'
                    });
                }
            };
            /**
             * @private
             * @function Highcharts.RangeSelector#defaultInputDateParser
             */
            RangeSelector.prototype.defaultInputDateParser = function (inputDate, useUTC, time) {
                var hasTimezone = function (str) {
                        return str.length > 6 &&
                            (str.lastIndexOf('-') === str.length - 6 ||
                                str.lastIndexOf('+') === str.length - 6);
                };
                var input = inputDate.split('/').join('-').split(' ').join('T');
                if (input.indexOf('T') === -1) {
                    input += 'T00:00';
                }
                if (useUTC) {
                    input += 'Z';
                }
                else if (H.isSafari && !hasTimezone(input)) {
                    var offset = new Date(input).getTimezoneOffset() / 60;
                    input += offset <= 0 ? "+" + pad(-offset) + ":00" : "-" + pad(offset) + ":00";
                }
                var date = Date.parse(input);
                // If the value isn't parsed directly to a value by the
                // browser's Date.parse method, like YYYY-MM-DD in IE8, try
                // parsing it a different way
                if (!isNumber(date)) {
                    var parts = inputDate.split('-');
                    date = Date.UTC(pInt(parts[0]), pInt(parts[1]) - 1, pInt(parts[2]));
                }
                if (time && useUTC && isNumber(date)) {
                    date += time.getTimezoneOffset(date);
                }
                return date;
            };
            /**
             * Draw either the 'from' or the 'to' HTML input box of the range selector
             *
             * @private
             * @function Highcharts.RangeSelector#drawInput
             * @param {string} name
             * @return {RangeSelectorInputElements}
             */
            RangeSelector.prototype.drawInput = function (name) {
                var _a = this,
                    chart = _a.chart,
                    div = _a.div,
                    inputGroup = _a.inputGroup;
                var rangeSelector = this,
                    chartStyle = chart.renderer.style || {},
                    renderer = chart.renderer,
                    options = chart.options.rangeSelector,
                    lang = defaultOptions.lang,
                    isMin = name === 'min';
                /**
                 * @private
                 */
                function updateExtremes() {
                    var value = rangeSelector.getInputValue(name),
                        chartAxis = chart.xAxis[0],
                        dataAxis = chart.scroller && chart.scroller.xAxis ?
                            chart.scroller.xAxis :
                            chartAxis,
                        dataMin = dataAxis.dataMin,
                        dataMax = dataAxis.dataMax;
                    var maxInput = rangeSelector.maxInput,
                        minInput = rangeSelector.minInput;
                    if (value !== Number(input.getAttribute('data-hc-time-previous')) &&
                        isNumber(value)) {
                        input.setAttribute('data-hc-time-previous', value);
                        // Validate the extremes. If it goes beyound the data min or
                        // max, use the actual data extreme (#2438).
                        if (isMin && maxInput && isNumber(dataMin)) {
                            if (value > Number(maxInput.getAttribute('data-hc-time'))) {
                                value = void 0;
                            }
                            else if (value < dataMin) {
                                value = dataMin;
                            }
                        }
                        else if (minInput && isNumber(dataMax)) {
                            if (value < Number(minInput.getAttribute('data-hc-time'))) {
                                value = void 0;
                            }
                            else if (value > dataMax) {
                                value = dataMax;
                            }
                        }
                        // Set the extremes
                        if (typeof value !== 'undefined') { // @todo typof undefined
                            chartAxis.setExtremes(isMin ? value : chartAxis.min, isMin ? chartAxis.max : value, void 0, void 0, { trigger: 'rangeSelectorInput' });
                        }
                    }
                }
                // Create the text label
                var text = lang[isMin ? 'rangeSelectorFrom' : 'rangeSelectorTo'] || '';
                var label = renderer
                        .label(text, 0)
                        .addClass('highcharts-range-label')
                        .attr({
                        padding: text ? 2 : 0,
                        height: text ? options.inputBoxHeight : 0
                    })
                        .add(inputGroup);
                // Create an SVG label that shows updated date ranges and and records
                // click events that bring in the HTML input.
                var dateBox = renderer
                        .label('', 0)
                        .addClass('highcharts-range-input')
                        .attr({
                        padding: 2,
                        width: options.inputBoxWidth,
                        height: options.inputBoxHeight,
                        'text-align': 'center'
                    })
                        .on('click',
                    function () {
                        // If it is already focused, the onfocus event doesn't fire
                        // (#3713)
                        rangeSelector.showInput(name);
                    rangeSelector[name + 'Input'].focus();
                });
                if (!chart.styledMode) {
                    dateBox.attr({
                        stroke: options.inputBoxBorderColor,
                        'stroke-width': 1
                    });
                }
                dateBox.add(inputGroup);
                // Create the HTML input element. This is rendered as 1x1 pixel then set
                // to the right size when focused.
                var input = createElement('input', {
                        name: name,
                        className: 'highcharts-range-selector'
                    },
                    void 0,
                    div);
                // #14788: Setting input.type to an unsupported type throws in IE, so
                // we need to use setAttribute instead
                input.setAttribute('type', preferredInputType(options.inputDateFormat || '%b %e, %Y'));
                if (!chart.styledMode) {
                    // Styles
                    label.css(merge(chartStyle, options.labelStyle));
                    dateBox.css(merge({
                        color: palette.neutralColor80
                    }, chartStyle, options.inputStyle));
                    css(input, extend({
                        position: 'absolute',
                        border: 0,
                        boxShadow: '0 0 15px rgba(0,0,0,0.3)',
                        width: '1px',
                        height: '1px',
                        padding: 0,
                        textAlign: 'center',
                        fontSize: chartStyle.fontSize,
                        fontFamily: chartStyle.fontFamily,
                        top: '-9999em' // #4798
                    }, options.inputStyle));
                }
                // Blow up the input box
                input.onfocus = function () {
                    rangeSelector.showInput(name);
                };
                // Hide away the input box
                input.onblur = function () {
                    // update extermes only when inputs are active
                    if (input === H.doc.activeElement) { // Only when focused
                        // Update also when no `change` event is triggered, like when
                        // clicking inside the SVG (#4710)
                        updateExtremes();
                    }
                    // #10404 - move hide and blur outside focus
                    rangeSelector.hideInput(name);
                    rangeSelector.setInputValue(name);
                    input.blur(); // #4606
                };
                var keyDown = false;
                // handle changes in the input boxes
                input.onchange = function () {
                    // Update extremes and blur input when clicking date input calendar
                    if (!keyDown) {
                        updateExtremes();
                        rangeSelector.hideInput(name);
                        input.blur();
                    }
                };
                input.onkeypress = function (event) {
                    // IE does not fire onchange on enter
                    if (event.keyCode === 13) {
                        updateExtremes();
                    }
                };
                input.onkeydown = function (event) {
                    keyDown = true;
                    // Arrow keys
                    if (event.keyCode === 38 || event.keyCode === 40) {
                        updateExtremes();
                    }
                };
                input.onkeyup = function () {
                    keyDown = false;
                };
                return { dateBox: dateBox, input: input, label: label };
            };
            /**
             * Get the position of the range selector buttons and inputs. This can be
             * overridden from outside for custom positioning.
             *
             * @private
             * @function Highcharts.RangeSelector#getPosition
             *
             * @return {Highcharts.Dictionary<number>}
             */
            RangeSelector.prototype.getPosition = function () {
                var chart = this.chart,
                    options = chart.options.rangeSelector,
                    top = options.verticalAlign === 'top' ?
                        chart.plotTop - chart.axisOffset[0] :
                        0; // set offset only for varticalAlign top
                    return {
                        buttonTop: top + options.buttonPosition.y,
                        inputTop: top + options.inputPosition.y - 10
                    };
            };
            /**
             * Get the extremes of YTD. Will choose dataMax if its value is lower than
             * the current timestamp. Will choose dataMin if its value is higher than
             * the timestamp for the start of current year.
             *
             * @private
             * @function Highcharts.RangeSelector#getYTDExtremes
             *
             * @param {number} dataMax
             *
             * @param {number} dataMin
             *
             * @return {*}
             *         Returns min and max for the YTD
             */
            RangeSelector.prototype.getYTDExtremes = function (dataMax, dataMin, useUTC) {
                var time = this.chart.time,
                    min,
                    now = new time.Date(dataMax),
                    year = time.get('FullYear',
                    now),
                    startOfYear = useUTC ?
                        time.Date.UTC(year, 0, 1) : // eslint-disable-line new-cap
                        +new time.Date(year, 0, 1);
                min = Math.max(dataMin, startOfYear);
                var ts = now.getTime();
                return {
                    max: Math.min(dataMax || ts, ts),
                    min: min
                };
            };
            /**
             * Render the range selector including the buttons and the inputs. The first
             * time render is called, the elements are created and positioned. On
             * subsequent calls, they are moved and updated.
             *
             * @private
             * @function Highcharts.RangeSelector#render
             * @param {number} [min]
             *        X axis minimum
             * @param {number} [max]
             *        X axis maximum
             * @return {void}
             */
            RangeSelector.prototype.render = function (min, max) {
                var chart = this.chart,
                    renderer = chart.renderer,
                    container = chart.container,
                    chartOptions = chart.options,
                    options = chartOptions.rangeSelector, 
                    // Place inputs above the container
                    inputsZIndex = pick(chartOptions.chart.style &&
                        chartOptions.chart.style.zIndex, 0) + 1,
                    inputEnabled = options.inputEnabled,
                    rendered = this.rendered;
                if (options.enabled === false) {
                    return;
                }
                // create the elements
                if (!rendered) {
                    this.group = renderer.g('range-selector-group')
                        .attr({
                        zIndex: 7
                    })
                        .add();
                    this.div = createElement('div', void 0, {
                        position: 'relative',
                        height: 0,
                        zIndex: inputsZIndex
                    });
                    if (this.buttonOptions.length) {
                        this.renderButtons();
                    }
                    // First create a wrapper outside the container in order to make
                    // the inputs work and make export correct
                    if (container.parentNode) {
                        container.parentNode.insertBefore(this.div, container);
                    }
                    if (inputEnabled) {
                        // Create the group to keep the inputs
                        this.inputGroup = renderer.g('input-group').add(this.group);
                        var minElems = this.drawInput('min');
                        this.minDateBox = minElems.dateBox;
                        this.minLabel = minElems.label;
                        this.minInput = minElems.input;
                        var maxElems = this.drawInput('max');
                        this.maxDateBox = maxElems.dateBox;
                        this.maxLabel = maxElems.label;
                        this.maxInput = maxElems.input;
                    }
                }
                if (inputEnabled) {
                    // Set or reset the input values
                    this.setInputValue('min', min);
                    this.setInputValue('max', max);
                    var unionExtremes = (chart.scroller && chart.scroller.getUnionExtremes()) || chart.xAxis[0] || {};
                    if (defined(unionExtremes.dataMin) && defined(unionExtremes.dataMax)) {
                        var minRange = chart.xAxis[0].minRange || 0;
                        this.setInputExtremes('min', unionExtremes.dataMin, Math.min(unionExtremes.dataMax, this.getInputValue('max')) - minRange);
                        this.setInputExtremes('max', Math.max(unionExtremes.dataMin, this.getInputValue('min')) + minRange, unionExtremes.dataMax);
                    }
                    // Reflow
                    if (this.inputGroup) {
                        var x_1 = 0;
                        [
                            this.minLabel,
                            this.minDateBox,
                            this.maxLabel,
                            this.maxDateBox
                        ].forEach(function (label) {
                            if (label) {
                                var width = label.getBBox().width;
                                if (width) {
                                    label.attr({ x: x_1 });
                                    x_1 += width + options.inputSpacing;
                                }
                            }
                        });
                    }
                }
                this.alignElements();
                this.rendered = true;
            };
            /**
             * Render the range buttons. This only runs the first time, later the
             * positioning is laid out in alignElements.
             *
             * @private
             * @function Highcharts.RangeSelector#renderButtons
             * @return {void}
             */
            RangeSelector.prototype.renderButtons = function () {
                var _this = this;
                var _a = this,
                    buttons = _a.buttons,
                    chart = _a.chart,
                    options = _a.options;
                var lang = defaultOptions.lang;
                var renderer = chart.renderer;
                var buttonTheme = merge(options.buttonTheme);
                var states = buttonTheme && buttonTheme.states;
                // Prevent the button from resetting the width when the button state
                // changes since we need more control over the width when collapsing
                // the buttons
                var width = buttonTheme.width || 28;
                delete buttonTheme.width;
                delete buttonTheme.states;
                this.buttonGroup = renderer.g('range-selector-buttons').add(this.group);
                var dropdown = this.dropdown = createElement('select',
                    void 0, {
                        position: 'absolute',
                        width: '1px',
                        height: '1px',
                        padding: 0,
                        border: 0,
                        top: '-9999em',
                        cursor: 'pointer',
                        opacity: 0.0001
                    },
                    this.div);
                // Prevent page zoom on iPhone
                addEvent(dropdown, 'touchstart', function () {
                    dropdown.style.fontSize = '16px';
                });
                // Forward events from select to button
                [
                    [H.isMS ? 'mouseover' : 'mouseenter'],
                    [H.isMS ? 'mouseout' : 'mouseleave'],
                    ['change', 'click']
                ].forEach(function (_a) {
                    var from = _a[0],
                        to = _a[1];
                    addEvent(dropdown, from, function () {
                        var button = buttons[_this.currentButtonIndex()];
                        if (button) {
                            fireEvent(button.element, to || from);
                        }
                    });
                });
                this.zoomText = renderer
                    .label((lang && lang.rangeSelectorZoom) || '', 0)
                    .attr({
                    padding: options.buttonTheme.padding,
                    height: options.buttonTheme.height,
                    paddingLeft: 0,
                    paddingRight: 0
                })
                    .add(this.buttonGroup);
                if (!this.chart.styledMode) {
                    this.zoomText.css(options.labelStyle);
                    buttonTheme['stroke-width'] = pick(buttonTheme['stroke-width'], 0);
                }
                createElement('option', {
                    textContent: this.zoomText.textStr,
                    disabled: true
                }, void 0, dropdown);
                this.buttonOptions.forEach(function (rangeOptions, i) {
                    createElement('option', {
                        textContent: rangeOptions.title || rangeOptions.text
                    }, void 0, dropdown);
                    buttons[i] = renderer
                        .button(rangeOptions.text, 0, 0, function (e) {
                        // extract events from button object and call
                        var buttonEvents = (rangeOptions.events &&
                                rangeOptions.events.click),
                            callDefaultEvent;
                        if (buttonEvents) {
                            callDefaultEvent =
                                buttonEvents.call(rangeOptions, e);
                        }
                        if (callDefaultEvent !== false) {
                            _this.clickButton(i);
                        }
                        _this.isActive = true;
                    }, buttonTheme, states && states.hover, states && states.select, states && states.disabled)
                        .attr({
                        'text-align': 'center',
                        width: width
                    })
                        .add(_this.buttonGroup);
                    if (rangeOptions.title) {
                        buttons[i].attr('title', rangeOptions.title);
                    }
                });
            };
            /**
             * Align the elements horizontally and vertically.
             *
             * @private
             * @function Highcharts.RangeSelector#alignElements
             * @return {void}
             */
            RangeSelector.prototype.alignElements = function () {
                var _this = this;
                var _a = this,
                    buttonGroup = _a.buttonGroup,
                    buttons = _a.buttons,
                    chart = _a.chart,
                    group = _a.group,
                    inputGroup = _a.inputGroup,
                    options = _a.options,
                    zoomText = _a.zoomText;
                var chartOptions = chart.options;
                var navButtonOptions = (chartOptions.exporting &&
                        chartOptions.exporting.enabled !== false &&
                        chartOptions.navigation &&
                        chartOptions.navigation.buttonOptions);
                var buttonPosition = options.buttonPosition,
                    inputPosition = options.inputPosition,
                    verticalAlign = options.verticalAlign;
                // Get the X offset required to avoid overlapping with the exporting
                // button. This is is used both by the buttonGroup and the inputGroup.
                var getXOffsetForExportButton = function (group,
                    position) {
                        if (navButtonOptions &&
                            _this.titleCollision(chart) &&
                            verticalAlign === 'top' &&
                            position.align === 'right' && ((position.y -
                            group.getBBox().height - 12) <
                            ((navButtonOptions.y || 0) +
                                (navButtonOptions.height || 0) +
                                chart.spacing[0]))) {
                            return -40;
                    }
                    return 0;
                };
                var plotLeft = chart.plotLeft;
                if (group && buttonPosition && inputPosition) {
                    var translateX = buttonPosition.x - chart.spacing[3];
                    if (buttonGroup) {
                        this.positionButtons();
                        if (!this.initialButtonGroupWidth) {
                            var width_1 = 0;
                            if (zoomText) {
                                width_1 += zoomText.getBBox().width + 5;
                            }
                            buttons.forEach(function (button, i) {
                                width_1 += button.width;
                                if (i !== buttons.length - 1) {
                                    width_1 += options.buttonSpacing;
                                }
                            });
                            this.initialButtonGroupWidth = width_1;
                        }
                        plotLeft -= chart.spacing[3];
                        this.updateButtonStates();
                        // Detect collision between button group and exporting
                        var xOffsetForExportButton_1 = getXOffsetForExportButton(buttonGroup,
                            buttonPosition);
                        this.alignButtonGroup(xOffsetForExportButton_1);
                        // Skip animation
                        group.placed = buttonGroup.placed = chart.hasLoaded;
                    }
                    var xOffsetForExportButton = 0;
                    if (inputGroup) {
                        // Detect collision between the input group and exporting button
                        xOffsetForExportButton = getXOffsetForExportButton(inputGroup, inputPosition);
                        if (inputPosition.align === 'left') {
                            translateX = plotLeft;
                        }
                        else if (inputPosition.align === 'right') {
                            translateX = -Math.max(chart.axisOffset[1], -xOffsetForExportButton);
                        }
                        // Update the alignment to the updated spacing box
                        inputGroup.align({
                            y: inputPosition.y,
                            width: inputGroup.getBBox().width,
                            align: inputPosition.align,
                            // fix wrong getBBox() value on right align
                            x: inputPosition.x + translateX - 2
                        }, true, chart.spacingBox);
                        // Skip animation
                        inputGroup.placed = chart.hasLoaded;
                    }
                    this.handleCollision(xOffsetForExportButton);
                    // Vertical align
                    group.align({
                        verticalAlign: verticalAlign
                    }, true, chart.spacingBox);
                    var alignTranslateY = group.alignAttr.translateY;
                    // Set position
                    var groupHeight = group.getBBox().height + 20; // # 20 padding
                        var translateY = 0;
                    // Calculate bottom position
                    if (verticalAlign === 'bottom') {
                        var legendOptions = chart.legend && chart.legend.options;
                        var legendHeight = (legendOptions &&
                                legendOptions.verticalAlign === 'bottom' &&
                                legendOptions.enabled &&
                                !legendOptions.floating ?
                                (chart.legend.legendHeight +
                                    pick(legendOptions.margin, 10)) :
                                0);
                        groupHeight = groupHeight + legendHeight - 20;
                        translateY = (alignTranslateY -
                            groupHeight -
                            (options.floating ? 0 : options.y) -
                            (chart.titleOffset ? chart.titleOffset[2] : 0) -
                            10 // 10 spacing
                        );
                    }
                    if (verticalAlign === 'top') {
                        if (options.floating) {
                            translateY = 0;
                        }
                        if (chart.titleOffset && chart.titleOffset[0]) {
                            translateY = chart.titleOffset[0];
                        }
                        translateY += ((chart.margin[0] - chart.spacing[0]) || 0);
                    }
                    else if (verticalAlign === 'middle') {
                        if (inputPosition.y === buttonPosition.y) {
                            translateY = alignTranslateY;
                        }
                        else if (inputPosition.y || buttonPosition.y) {
                            if (inputPosition.y < 0 ||
                                buttonPosition.y < 0) {
                                translateY -= Math.min(inputPosition.y, buttonPosition.y);
                            }
                            else {
                                translateY = alignTranslateY - groupHeight;
                            }
                        }
                    }
                    group.translate(options.x, options.y + Math.floor(translateY));
                    // Translate HTML inputs
                    var _b = this,
                        minInput = _b.minInput,
                        maxInput = _b.maxInput,
                        dropdown = _b.dropdown;
                    if (options.inputEnabled && minInput && maxInput) {
                        minInput.style.marginTop = group.translateY + 'px';
                        maxInput.style.marginTop = group.translateY + 'px';
                    }
                    if (dropdown) {
                        dropdown.style.marginTop = group.translateY + 'px';
                    }
                }
            };
            /**
             * Align the button group horizontally and vertically.
             *
             * @private
             * @function Highcharts.RangeSelector#alignButtonGroup
             * @param {number} xOffsetForExportButton
             * @param {number} [width]
             * @return {void}
             */
            RangeSelector.prototype.alignButtonGroup = function (xOffsetForExportButton, width) {
                var _a = this,
                    chart = _a.chart,
                    options = _a.options,
                    buttonGroup = _a.buttonGroup,
                    buttons = _a.buttons;
                var buttonPosition = options.buttonPosition;
                var plotLeft = chart.plotLeft - chart.spacing[3];
                var translateX = buttonPosition.x - chart.spacing[3];
                if (buttonPosition.align === 'right') {
                    translateX += xOffsetForExportButton - plotLeft; // #13014
                }
                else if (buttonPosition.align === 'center') {
                    translateX -= plotLeft / 2;
                }
                if (buttonGroup) {
                    // Align button group
                    buttonGroup.align({
                        y: buttonPosition.y,
                        width: pick(width, this.initialButtonGroupWidth),
                        align: buttonPosition.align,
                        x: translateX
                    }, true, chart.spacingBox);
                }
            };
            /**
             * @private
             * @function Highcharts.RangeSelector#positionButtons
             * @return {void}
             */
            RangeSelector.prototype.positionButtons = function () {
                var _a = this,
                    buttons = _a.buttons,
                    chart = _a.chart,
                    options = _a.options,
                    zoomText = _a.zoomText;
                var verb = chart.hasLoaded ? 'animate' : 'attr';
                var buttonPosition = options.buttonPosition;
                var plotLeft = chart.plotLeft;
                var buttonLeft = plotLeft;
                if (zoomText && zoomText.visibility !== 'hidden') {
                    // #8769, allow dynamically updating margins
                    zoomText[verb]({
                        x: pick(plotLeft + buttonPosition.x, plotLeft)
                    });
                    // Button start position
                    buttonLeft += buttonPosition.x +
                        zoomText.getBBox().width + 5;
                }
                this.buttonOptions.forEach(function (rangeOptions, i) {
                    if (buttons[i].visibility !== 'hidden') {
                        buttons[i][verb]({ x: buttonLeft });
                        // increase button position for the next button
                        buttonLeft += buttons[i].width + options.buttonSpacing;
                    }
                    else {
                        buttons[i][verb]({ x: plotLeft });
                    }
                });
            };
            /**
             * Handle collision between the button group and the input group
             *
             * @private
             * @function Highcharts.RangeSelector#handleCollision
             *
             * @param  {number} xOffsetForExportButton
             *                  The X offset of the group required to make room for the
             *                  exporting button
             * @return {void}
             */
            RangeSelector.prototype.handleCollision = function (xOffsetForExportButton) {
                var _this = this;
                var _a = this,
                    chart = _a.chart,
                    buttonGroup = _a.buttonGroup,
                    inputGroup = _a.inputGroup;
                var _b = this.options,
                    buttonPosition = _b.buttonPosition,
                    dropdown = _b.dropdown,
                    inputPosition = _b.inputPosition;
                var maxButtonWidth = function () {
                        var buttonWidth = 0;
                    _this.buttons.forEach(function (button) {
                        var bBox = button.getBBox();
                        if (bBox.width > buttonWidth) {
                            buttonWidth = bBox.width;
                        }
                    });
                    return buttonWidth;
                };
                var groupsOverlap = function (buttonGroupWidth) {
                        if (inputGroup && buttonGroup) {
                            var inputGroupX = (inputGroup.alignAttr.translateX +
                                inputGroup.alignOptions.x -
                                xOffsetForExportButton +
                                // getBBox for detecing left margin
                                inputGroup.getBBox().x +
                                // 2px padding to not overlap input and label
                                2);
                        var inputGroupWidth = inputGroup.alignOptions.width;
                        var buttonGroupX = buttonGroup.alignAttr.translateX +
                                buttonGroup.getBBox().x;
                        return (buttonGroupX + buttonGroupWidth > inputGroupX) &&
                            (inputGroupX + inputGroupWidth > buttonGroupX) &&
                            (buttonPosition.y <
                                (inputPosition.y +
                                    inputGroup.getBBox().height));
                    }
                    return false;
                };
                var moveInputsDown = function () {
                        if (inputGroup && buttonGroup) {
                            inputGroup.attr({
                                translateX: inputGroup.alignAttr.translateX + (chart.axisOffset[1] >= -xOffsetForExportButton ?
                                    0 :
                                    -xOffsetForExportButton),
                                translateY: inputGroup.alignAttr.translateY +
                                    buttonGroup.getBBox().height + 10
                            });
                    }
                };
                if (buttonGroup) {
                    if (dropdown === 'always') {
                        this.collapseButtons(xOffsetForExportButton);
                        if (groupsOverlap(maxButtonWidth())) {
                            // Move the inputs down if there is still a collision
                            // after collapsing the buttons
                            moveInputsDown();
                        }
                        return;
                    }
                    if (dropdown === 'never') {
                        this.expandButtons();
                    }
                }
                // Detect collision
                if (inputGroup && buttonGroup) {
                    if ((inputPosition.align === buttonPosition.align) ||
                        // 20 is minimal spacing between elements
                        groupsOverlap(this.initialButtonGroupWidth + 20)) {
                        if (dropdown === 'responsive') {
                            this.collapseButtons(xOffsetForExportButton);
                            if (groupsOverlap(maxButtonWidth())) {
                                moveInputsDown();
                            }
                        }
                        else {
                            moveInputsDown();
                        }
                    }
                    else if (dropdown === 'responsive') {
                        this.expandButtons();
                    }
                }
                else if (buttonGroup && dropdown === 'responsive') {
                    if (this.initialButtonGroupWidth > chart.plotWidth) {
                        this.collapseButtons(xOffsetForExportButton);
                    }
                    else {
                        this.expandButtons();
                    }
                }
            };
            /**
             * Collapse the buttons and put the select element on top.
             *
             * @private
             * @function Highcharts.RangeSelector#collapseButtons
             * @param {number} xOffsetForExportButton
             * @return {void}
             */
            RangeSelector.prototype.collapseButtons = function (xOffsetForExportButton) {
                var _a = this,
                    buttons = _a.buttons,
                    buttonOptions = _a.buttonOptions,
                    chart = _a.chart,
                    dropdown = _a.dropdown,
                    options = _a.options,
                    zoomText = _a.zoomText;
                var userButtonTheme = (chart.userOptions.rangeSelector &&
                        chart.userOptions.rangeSelector.buttonTheme) || {};
                var getAttribs = function (text) { return ({
                        text: text ? text + " \u25BE" : '▾',
                        width: 'auto',
                        paddingLeft: pick(options.buttonTheme.paddingLeft,
                    userButtonTheme.padding, 8),
                        paddingRight: pick(options.buttonTheme.paddingRight,
                    userButtonTheme.padding, 8)
                    }); };
                if (zoomText) {
                    zoomText.hide();
                }
                var hasActiveButton = false;
                buttonOptions.forEach(function (rangeOptions, i) {
                    var button = buttons[i];
                    if (button.state !== 2) {
                        button.hide();
                    }
                    else {
                        button.show();
                        button.attr(getAttribs(rangeOptions.text));
                        hasActiveButton = true;
                    }
                });
                if (!hasActiveButton) {
                    if (dropdown) {
                        dropdown.selectedIndex = 0;
                    }
                    buttons[0].show();
                    buttons[0].attr(getAttribs(this.zoomText && this.zoomText.textStr));
                }
                var align = options.buttonPosition.align;
                this.positionButtons();
                if (align === 'right' || align === 'center') {
                    this.alignButtonGroup(xOffsetForExportButton, buttons[this.currentButtonIndex()].getBBox().width);
                }
                this.showDropdown();
            };
            /**
             * Show all the buttons and hide the select element.
             *
             * @private
             * @function Highcharts.RangeSelector#expandButtons
             * @return {void}
             */
            RangeSelector.prototype.expandButtons = function () {
                var _a = this,
                    buttons = _a.buttons,
                    buttonOptions = _a.buttonOptions,
                    options = _a.options,
                    zoomText = _a.zoomText;
                this.hideDropdown();
                if (zoomText) {
                    zoomText.show();
                }
                buttonOptions.forEach(function (rangeOptions, i) {
                    var button = buttons[i];
                    button.show();
                    button.attr({
                        text: rangeOptions.text,
                        width: options.buttonTheme.width || 28,
                        paddingLeft: pick(options.buttonTheme.paddingLeft, 'unset'),
                        paddingRight: pick(options.buttonTheme.paddingRight, 'unset')
                    });
                    if (button.state < 2) {
                        button.setState(0);
                    }
                });
                this.positionButtons();
            };
            /**
             * Get the index of the visible button when the buttons are collapsed.
             *
             * @private
             * @function Highcharts.RangeSelector#currentButtonIndex
             * @return {number}
             */
            RangeSelector.prototype.currentButtonIndex = function () {
                var dropdown = this.dropdown;
                if (dropdown && dropdown.selectedIndex > 0) {
                    return dropdown.selectedIndex - 1;
                }
                return 0;
            };
            /**
             * Position the select element on top of the button.
             *
             * @private
             * @function Highcharts.RangeSelector#showDropdown
             * @return {void}
             */
            RangeSelector.prototype.showDropdown = function () {
                var _a = this,
                    buttonGroup = _a.buttonGroup,
                    buttons = _a.buttons,
                    chart = _a.chart,
                    dropdown = _a.dropdown;
                if (buttonGroup && dropdown) {
                    var translateX = buttonGroup.translateX,
                        translateY = buttonGroup.translateY;
                    var bBox = buttons[this.currentButtonIndex()].getBBox();
                    css(dropdown, {
                        left: (chart.plotLeft + translateX) + 'px',
                        top: (translateY + 0.5) + 'px',
                        width: bBox.width + 'px',
                        height: bBox.height + 'px'
                    });
                    this.hasVisibleDropdown = true;
                }
            };
            /**
             * @private
             * @function Highcharts.RangeSelector#hideDropdown
             * @return {void}
             */
            RangeSelector.prototype.hideDropdown = function () {
                var dropdown = this.dropdown;
                if (dropdown) {
                    css(dropdown, {
                        top: '-9999em',
                        width: '1px',
                        height: '1px'
                    });
                    this.hasVisibleDropdown = false;
                }
            };
            /**
             * Extracts height of range selector
             *
             * @private
             * @function Highcharts.RangeSelector#getHeight
             * @return {number}
             *         Returns rangeSelector height
             */
            RangeSelector.prototype.getHeight = function () {
                var rangeSelector = this,
                    options = rangeSelector.options,
                    rangeSelectorGroup = rangeSelector.group,
                    inputPosition = options.inputPosition,
                    buttonPosition = options.buttonPosition,
                    yPosition = options.y,
                    buttonPositionY = buttonPosition.y,
                    inputPositionY = inputPosition.y,
                    rangeSelectorHeight = 0,
                    minPosition;
                if (options.height) {
                    return options.height;
                }
                // Align the elements before we read the height in case we're switching
                // between wrapped and non-wrapped layout
                this.alignElements();
                rangeSelectorHeight = rangeSelectorGroup ?
                    // 13px to keep back compatibility
                    (rangeSelectorGroup.getBBox(true).height) + 13 +
                        yPosition :
                    0;
                minPosition = Math.min(inputPositionY, buttonPositionY);
                if ((inputPositionY < 0 && buttonPositionY < 0) ||
                    (inputPositionY > 0 && buttonPositionY > 0)) {
                    rangeSelectorHeight += Math.abs(minPosition);
                }
                return rangeSelectorHeight;
            };
            /**
             * Detect collision with title or subtitle
             *
             * @private
             * @function Highcharts.RangeSelector#titleCollision
             *
             * @param {Highcharts.Chart} chart
             *
             * @return {boolean}
             *         Returns collision status
             */
            RangeSelector.prototype.titleCollision = function (chart) {
                return !(chart.options.title.text ||
                    chart.options.subtitle.text);
            };
            /**
             * Update the range selector with new options
             *
             * @private
             * @function Highcharts.RangeSelector#update
             * @param {Highcharts.RangeSelectorOptions} options
             * @return {void}
             */
            RangeSelector.prototype.update = function (options) {
                var chart = this.chart;
                merge(true, chart.options.rangeSelector, options);
                this.destroy();
                this.init(chart);
                this.render();
            };
            /**
             * Destroys allocated elements.
             *
             * @private
             * @function Highcharts.RangeSelector#destroy
             */
            RangeSelector.prototype.destroy = function () {
                var rSelector = this,
                    minInput = rSelector.minInput,
                    maxInput = rSelector.maxInput;
                if (rSelector.eventsToUnbind) {
                    rSelector.eventsToUnbind.forEach(function (unbind) { return unbind(); });
                    rSelector.eventsToUnbind = void 0;
                }
                // Destroy elements in collections
                destroyObjectProperties(rSelector.buttons);
                // Clear input element events
                if (minInput) {
                    minInput.onfocus = minInput.onblur = minInput.onchange = null;
                }
                if (maxInput) {
                    maxInput.onfocus = maxInput.onblur = maxInput.onchange = null;
                }
                // Destroy HTML and SVG elements
                objectEach(rSelector, function (val, key) {
                    if (val && key !== 'chart') {
                        if (val instanceof SVGElement) {
                            // SVGElement
                            val.destroy();
                        }
                        else if (val instanceof window.HTMLElement) {
                            // HTML element
                            discardElement(val);
                        }
                    }
                    if (val !== RangeSelector.prototype[key]) {
                        rSelector[key] = null;
                    }
                }, this);
            };
            return RangeSelector;
        }());
        /**
         * The default buttons for pre-selecting time frames
         */
        RangeSelector.prototype.defaultButtons = [{
                type: 'month',
                count: 1,
                text: '1m',
                title: 'View 1 month'
            }, {
                type: 'month',
                count: 3,
                text: '3m',
                title: 'View 3 months'
            }, {
                type: 'month',
                count: 6,
                text: '6m',
                title: 'View 6 months'
            }, {
                type: 'ytd',
                text: 'YTD',
                title: 'View year to date'
            }, {
                type: 'year',
                count: 1,
                text: '1y',
                title: 'View 1 year'
            }, {
                type: 'all',
                text: 'All',
                title: 'View all'
            }];
        /**
         * The date formats to use when setting min, max and value on date inputs
         */
        RangeSelector.prototype.inputTypeFormats = {
            'datetime-local': '%Y-%m-%dT%H:%M:%S',
            'date': '%Y-%m-%d',
            'time': '%H:%M:%S'
        };
        /**
         * Get the preferred input type based on a date format string.
         *
         * @private
         * @function preferredInputType
         * @param {string} format
         * @return {string}
         */
        function preferredInputType(format) {
            var ms = format.indexOf('%L') !== -1;
            if (ms) {
                return 'text';
            }
            var date = ['a', 'A', 'd', 'e', 'w', 'b', 'B', 'm', 'o', 'y', 'Y'].some(function (char) {
                    return format.indexOf('%' + char) !== -1;
            });
            var time = ['H', 'k', 'I', 'l', 'M', 'S'].some(function (char) {
                    return format.indexOf('%' + char) !== -1;
            });
            if (date && time) {
                return 'datetime-local';
            }
            if (date) {
                return 'date';
            }
            if (time) {
                return 'time';
            }
            return 'text';
        }
        /**
         * Get the axis min value based on the range option and the current max. For
         * stock charts this is extended via the {@link RangeSelector} so that if the
         * selected range is a multiple of months or years, it is compensated for
         * various month lengths.
         *
         * @private
         * @function Highcharts.Axis#minFromRange
         * @return {number|undefined}
         *         The new minimum value.
         */
        Axis.prototype.minFromRange = function () {
            var rangeOptions = this.range,
                type = rangeOptions.type,
                min,
                max = this.max,
                dataMin,
                range,
                time = this.chart.time, 
                // Get the true range from a start date
                getTrueRange = function (base,
                count) {
                    var timeName = type === 'year' ? 'FullYear' : 'Month';
                var date = new time.Date(base);
                var basePeriod = time.get(timeName,
                    date);
                time.set(timeName, date, basePeriod + count);
                if (basePeriod === time.get(timeName, date)) {
                    time.set('Date', date, 0); // #6537
                }
                return date.getTime() - base;
            };
            if (isNumber(rangeOptions)) {
                min = max - rangeOptions;
                range = rangeOptions;
            }
            else {
                min = max + getTrueRange(max, -rangeOptions.count);
                // Let the fixedRange reflect initial settings (#5930)
                if (this.chart) {
                    this.chart.fixedRange = max - min;
                }
            }
            dataMin = pick(this.dataMin, Number.MIN_VALUE);
            if (!isNumber(min)) {
                min = dataMin;
            }
            if (min <= dataMin) {
                min = dataMin;
                if (typeof range === 'undefined') { // #4501
                    range = getTrueRange(min, rangeOptions.count);
                }
                this.newMax = Math.min(min + range, this.dataMax);
            }
            if (!isNumber(max)) {
                min = void 0;
            }
            return min;
        };
        if (!H.RangeSelector) {
            var chartDestroyEvents_1 = [];
            var initRangeSelector_1 = function (chart) {
                    var extremes,
                rangeSelector = chart.rangeSelector,
                legend,
                alignTo,
                verticalAlign;
                /**
                 * @private
                 */
                function render() {
                    if (rangeSelector) {
                        extremes = chart.xAxis[0].getExtremes();
                        legend = chart.legend;
                        verticalAlign = (rangeSelector &&
                            rangeSelector.options.verticalAlign);
                        if (isNumber(extremes.min)) {
                            rangeSelector.render(extremes.min, extremes.max);
                        }
                        // Re-align the legend so that it's below the rangeselector
                        if (legend.display &&
                            verticalAlign === 'top' &&
                            verticalAlign === legend.options.verticalAlign) {
                            // Create a new alignment box for the legend.
                            alignTo = merge(chart.spacingBox);
                            if (legend.options.layout === 'vertical') {
                                alignTo.y = chart.plotTop;
                            }
                            else {
                                alignTo.y += rangeSelector.getHeight();
                            }
                            legend.group.placed = false; // Don't animate the alignment.
                            legend.align(alignTo);
                        }
                    }
                }
                if (rangeSelector) {
                    var events = find(chartDestroyEvents_1,
                        function (e) { return e[0] === chart; });
                    if (!events) {
                        chartDestroyEvents_1.push([chart, [
                                // redraw the scroller on setExtremes
                                addEvent(chart.xAxis[0], 'afterSetExtremes', function (e) {
                                    if (rangeSelector) {
                                        rangeSelector.render(e.min, e.max);
                                    }
                                }),
                                // redraw the scroller chart resize
                                addEvent(chart, 'redraw', render)
                            ]]);
                    }
                    // do it now
                    render();
                }
            };
            // Initialize rangeselector for stock charts
            addEvent(Chart, 'afterGetContainer', function () {
                if (this.options.rangeSelector &&
                    this.options.rangeSelector.enabled) {
                    this.rangeSelector = new RangeSelector(this);
                }
            });
            addEvent(Chart, 'beforeRender', function () {
                var chart = this,
                    axes = chart.axes,
                    rangeSelector = chart.rangeSelector,
                    verticalAlign;
                if (rangeSelector) {
                    if (isNumber(rangeSelector.deferredYTDClick)) {
                        rangeSelector.clickButton(rangeSelector.deferredYTDClick);
                        delete rangeSelector.deferredYTDClick;
                    }
                    axes.forEach(function (axis) {
                        axis.updateNames();
                        axis.setScale();
                    });
                    chart.getAxisMargins();
                    rangeSelector.render();
                    verticalAlign = rangeSelector.options.verticalAlign;
                    if (!rangeSelector.options.floating) {
                        if (verticalAlign === 'bottom') {
                            this.extraBottomMargin = true;
                        }
                        else if (verticalAlign !== 'middle') {
                            this.extraTopMargin = true;
                        }
                    }
                }
            });
            addEvent(Chart, 'update', function (e) {
                var chart = this,
                    options = e.options,
                    optionsRangeSelector = options.rangeSelector,
                    rangeSelector = chart.rangeSelector,
                    verticalAlign,
                    extraBottomMarginWas = this.extraBottomMargin,
                    extraTopMarginWas = this.extraTopMargin;
                if (optionsRangeSelector &&
                    optionsRangeSelector.enabled &&
                    !defined(rangeSelector) &&
                    this.options.rangeSelector) {
                    this.options.rangeSelector.enabled = true;
                    this.rangeSelector = rangeSelector = new RangeSelector(this);
                }
                this.extraBottomMargin = false;
                this.extraTopMargin = false;
                if (rangeSelector) {
                    initRangeSelector_1(this);
                    verticalAlign = (optionsRangeSelector &&
                        optionsRangeSelector.verticalAlign) || (rangeSelector.options && rangeSelector.options.verticalAlign);
                    if (!rangeSelector.options.floating) {
                        if (verticalAlign === 'bottom') {
                            this.extraBottomMargin = true;
                        }
                        else if (verticalAlign !== 'middle') {
                            this.extraTopMargin = true;
                        }
                    }
                    if (this.extraBottomMargin !== extraBottomMarginWas ||
                        this.extraTopMargin !== extraTopMarginWas) {
                        this.isDirtyBox = true;
                    }
                }
            });
            addEvent(Chart, 'render', function () {
                var chart = this,
                    rangeSelector = chart.rangeSelector,
                    verticalAlign;
                if (rangeSelector && !rangeSelector.options.floating) {
                    rangeSelector.render();
                    verticalAlign = rangeSelector.options.verticalAlign;
                    if (verticalAlign === 'bottom') {
                        this.extraBottomMargin = true;
                    }
                    else if (verticalAlign !== 'middle') {
                        this.extraTopMargin = true;
                    }
                }
            });
            addEvent(Chart, 'getMargins', function () {
                var rangeSelector = this.rangeSelector,
                    rangeSelectorHeight;
                if (rangeSelector) {
                    rangeSelectorHeight = rangeSelector.getHeight();
                    if (this.extraTopMargin) {
                        this.plotTop += rangeSelectorHeight;
                    }
                    if (this.extraBottomMargin) {
                        this.marginBottom += rangeSelectorHeight;
                    }
                }
            });
            Chart.prototype.callbacks.push(initRangeSelector_1);
            // Remove resize/afterSetExtremes at chart destroy
            addEvent(Chart, 'destroy', function destroyEvents() {
                for (var i = 0; i < chartDestroyEvents_1.length; i++) {
                    var events = chartDestroyEvents_1[i];
                    if (events[0] === this) {
                        events[1].forEach(function (unbind) { return unbind(); });
                        chartDestroyEvents_1.splice(i, 1);
                        return;
                    }
                }
            });
            H.RangeSelector = RangeSelector;
        }

        return RangeSelector;
    });
    _registerModule(_modules, 'Accessibility/Components/RangeSelectorComponent.js', [_modules['Accessibility/AccessibilityComponent.js'], _modules['Accessibility/Utils/ChartUtilities.js'], _modules['Accessibility/Utils/Announcer.js'], _modules['Core/Chart/Chart.js'], _modules['Accessibility/Utils/HTMLUtilities.js'], _modules['Accessibility/KeyboardNavigationHandler.js'], _modules['Core/Utilities.js'], _modules['Extensions/RangeSelector.js']], function (AccessibilityComponent, ChartUtilities, Announcer, Chart, HTMLUtilities, KeyboardNavigationHandler, U, RangeSelector) {
        /* *
         *
         *  (c) 2009-2021 Øystein Moseng
         *
         *  Accessibility component for the range selector.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var unhideChartElementFromAT = ChartUtilities.unhideChartElementFromAT,
            getAxisRangeDescription = ChartUtilities.getAxisRangeDescription;
        var setElAttrs = HTMLUtilities.setElAttrs;
        var addEvent = U.addEvent,
            extend = U.extend;
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /**
         * @private
         */
        function shouldRunInputNavigation(chart) {
            return Boolean(chart.rangeSelector &&
                chart.rangeSelector.inputGroup &&
                chart.rangeSelector.inputGroup.element
                    .getAttribute('visibility') !== 'hidden' &&
                chart.options.rangeSelector.inputEnabled !== false &&
                chart.rangeSelector.minInput &&
                chart.rangeSelector.maxInput);
        }
        /**
         * Highlight range selector button by index.
         *
         * @private
         * @function Highcharts.Chart#highlightRangeSelectorButton
         *
         * @param {number} ix
         *
         * @return {boolean}
         */
        Chart.prototype.highlightRangeSelectorButton = function (ix) {
            var buttons = (this.rangeSelector &&
                    this.rangeSelector.buttons ||
                    []);
            var curHighlightedIx = this.highlightedRangeSelectorItemIx;
            var curSelectedIx = (this.rangeSelector &&
                    this.rangeSelector.selected);
            // Deselect old
            if (typeof curHighlightedIx !== 'undefined' &&
                buttons[curHighlightedIx] &&
                curHighlightedIx !== curSelectedIx) {
                buttons[curHighlightedIx].setState(this.oldRangeSelectorItemState || 0);
            }
            // Select new
            this.highlightedRangeSelectorItemIx = ix;
            if (buttons[ix]) {
                this.setFocusToElement(buttons[ix].box, buttons[ix].element);
                if (ix !== curSelectedIx) {
                    this.oldRangeSelectorItemState = buttons[ix].state;
                    buttons[ix].setState(1);
                }
                return true;
            }
            return false;
        };
        // Range selector does not have destroy-setup for class instance events - so
        // we set it on the class and call the component from here.
        addEvent(RangeSelector, 'afterBtnClick', function () {
            if (this.chart.accessibility &&
                this.chart.accessibility.components.rangeSelector) {
                return this.chart.accessibility.components.rangeSelector.onAfterBtnClick();
            }
        });
        /**
         * The RangeSelectorComponent class
         *
         * @private
         * @class
         * @name Highcharts.RangeSelectorComponent
         */
        var RangeSelectorComponent = function () { };
        RangeSelectorComponent.prototype = new AccessibilityComponent();
        extend(RangeSelectorComponent.prototype, /** @lends Highcharts.RangeSelectorComponent */ {
            /**
             * Init the component
             * @private
             */
            init: function () {
                var chart = this.chart;
                this.announcer = new Announcer(chart, 'polite');
            },
            /**
             * Called on first render/updates to the chart, including options changes.
             */
            onChartUpdate: function () {
                var chart = this.chart,
                    component = this,
                    rangeSelector = chart.rangeSelector;
                if (!rangeSelector) {
                    return;
                }
                this.updateSelectorVisibility();
                this.setDropdownAttrs();
                if (rangeSelector.buttons &&
                    rangeSelector.buttons.length) {
                    rangeSelector.buttons.forEach(function (button) {
                        component.setRangeButtonAttrs(button);
                    });
                }
                // Make sure input boxes are accessible and focusable
                if (rangeSelector.maxInput && rangeSelector.minInput) {
                    ['minInput', 'maxInput'].forEach(function (key, i) {
                        var input = rangeSelector[key];
                        if (input) {
                            unhideChartElementFromAT(chart, input);
                            component.setRangeInputAttrs(input, 'accessibility.rangeSelector.' + (i ? 'max' : 'min') +
                                'InputLabel');
                        }
                    });
                }
            },
            /**
             * Hide buttons from AT when showing dropdown, and vice versa.
             * @private
             */
            updateSelectorVisibility: function () {
                var chart = this.chart;
                var rangeSelector = chart.rangeSelector;
                var dropdown = (rangeSelector &&
                        rangeSelector.dropdown);
                var buttons = (rangeSelector &&
                        rangeSelector.buttons ||
                        []);
                var hideFromAT = function (el) { return el.setAttribute('aria-hidden',
                    true); };
                if (rangeSelector &&
                    rangeSelector.hasVisibleDropdown &&
                    dropdown) {
                    unhideChartElementFromAT(chart, dropdown);
                    buttons.forEach(function (btn) { return hideFromAT(btn.element); });
                }
                else {
                    if (dropdown) {
                        hideFromAT(dropdown);
                    }
                    buttons.forEach(function (btn) { return unhideChartElementFromAT(chart, btn.element); });
                }
            },
            /**
             * Set accessibility related attributes on dropdown element.
             * @private
             */
            setDropdownAttrs: function () {
                var chart = this.chart;
                var dropdown = (chart.rangeSelector &&
                        chart.rangeSelector.dropdown);
                if (dropdown) {
                    var label = chart.langFormat('accessibility.rangeSelector.dropdownLabel', { rangeTitle: chart.options.lang.rangeSelectorZoom });
                    dropdown.setAttribute('aria-label', label);
                    dropdown.setAttribute('tabindex', -1);
                }
            },
            /**
             * @private
             * @param {Highcharts.SVGElement} button
             */
            setRangeButtonAttrs: function (button) {
                setElAttrs(button.element, {
                    tabindex: -1,
                    role: 'button'
                });
            },
            /**
             * @private
             */
            setRangeInputAttrs: function (input, langKey) {
                var chart = this.chart;
                setElAttrs(input, {
                    tabindex: -1,
                    'aria-label': chart.langFormat(langKey, { chart: chart })
                });
            },
            /**
             * @private
             * @param {Highcharts.KeyboardNavigationHandler} keyboardNavigationHandler
             * @param {number} keyCode
             * @return {number} Response code
             */
            onButtonNavKbdArrowKey: function (keyboardNavigationHandler, keyCode) {
                var response = keyboardNavigationHandler.response,
                    keys = this.keyCodes,
                    chart = this.chart,
                    wrapAround = chart.options.accessibility
                        .keyboardNavigation.wrapAround,
                    direction = (keyCode === keys.left || keyCode === keys.up) ? -1 : 1,
                    didHighlight = chart.highlightRangeSelectorButton(chart.highlightedRangeSelectorItemIx + direction);
                if (!didHighlight) {
                    if (wrapAround) {
                        keyboardNavigationHandler.init(direction);
                        return response.success;
                    }
                    return response[direction > 0 ? 'next' : 'prev'];
                }
                return response.success;
            },
            /**
             * @private
             */
            onButtonNavKbdClick: function (keyboardNavigationHandler) {
                var response = keyboardNavigationHandler.response,
                    chart = this.chart,
                    wasDisabled = chart.oldRangeSelectorItemState === 3;
                if (!wasDisabled) {
                    this.fakeClickEvent(chart.rangeSelector.buttons[chart.highlightedRangeSelectorItemIx].element);
                }
                return response.success;
            },
            /**
             * Called whenever a range selector button has been clicked, either by
             * mouse, touch, or kbd/voice/other.
             * @private
             */
            onAfterBtnClick: function () {
                var chart = this.chart;
                var axisRangeDescription = getAxisRangeDescription(chart.xAxis[0]);
                var announcement = chart.langFormat('accessibility.rangeSelector.clickButtonAnnouncement', { chart: chart,
                    axisRangeDescription: axisRangeDescription });
                if (announcement) {
                    this.announcer.announce(announcement);
                }
            },
            /**
             * @private
             */
            onInputKbdMove: function (direction) {
                var chart = this.chart;
                var rangeSel = chart.rangeSelector;
                var newIx = chart.highlightedInputRangeIx = (chart.highlightedInputRangeIx || 0) + direction;
                var newIxOutOfRange = newIx > 1 || newIx < 0;
                if (newIxOutOfRange) {
                    if (chart.accessibility) {
                        chart.accessibility.keyboardNavigation.tabindexContainer.focus();
                        chart.accessibility.keyboardNavigation[direction < 0 ? 'prev' : 'next']();
                    }
                }
                else if (rangeSel) {
                    var svgEl = rangeSel[newIx ? 'maxDateBox' : 'minDateBox'];
                    var inputEl = rangeSel[newIx ? 'maxInput' : 'minInput'];
                    if (svgEl && inputEl) {
                        chart.setFocusToElement(svgEl, inputEl);
                    }
                }
            },
            /**
             * @private
             * @param {number} direction
             */
            onInputNavInit: function (direction) {
                var _this = this;
                var component = this;
                var chart = this.chart;
                var buttonIxToHighlight = direction > 0 ? 0 : 1;
                var rangeSel = chart.rangeSelector;
                var svgEl = (rangeSel &&
                        rangeSel[buttonIxToHighlight ? 'maxDateBox' : 'minDateBox']);
                var minInput = (rangeSel && rangeSel.minInput);
                var maxInput = (rangeSel && rangeSel.maxInput);
                var inputEl = buttonIxToHighlight ? maxInput : minInput;
                chart.highlightedInputRangeIx = buttonIxToHighlight;
                if (svgEl && minInput && maxInput) {
                    chart.setFocusToElement(svgEl, inputEl);
                    // Tab-press with the input focused does not propagate to chart
                    // automatically, so we manually catch and handle it when relevant.
                    if (this.removeInputKeydownHandler) {
                        this.removeInputKeydownHandler();
                    }
                    var keydownHandler = function (e) {
                            var isTab = (e.which || e.keyCode) === _this.keyCodes.tab;
                        if (isTab) {
                            e.preventDefault();
                            e.stopPropagation();
                            component.onInputKbdMove(e.shiftKey ? -1 : 1);
                        }
                    };
                    var minRemover_1 = addEvent(minInput, 'keydown',
                        keydownHandler);
                    var maxRemover_1 = addEvent(maxInput, 'keydown',
                        keydownHandler);
                    this.removeInputKeydownHandler = function () {
                        minRemover_1();
                        maxRemover_1();
                    };
                }
            },
            /**
             * @private
             */
            onInputNavTerminate: function () {
                var rangeSel = (this.chart.rangeSelector || {});
                if (rangeSel.maxInput) {
                    rangeSel.hideInput('max');
                }
                if (rangeSel.minInput) {
                    rangeSel.hideInput('min');
                }
                if (this.removeInputKeydownHandler) {
                    this.removeInputKeydownHandler();
                    delete this.removeInputKeydownHandler;
                }
            },
            /**
             * @private
             */
            initDropdownNav: function () {
                var _this = this;
                var chart = this.chart;
                var rangeSelector = chart.rangeSelector;
                var dropdown = (rangeSelector && rangeSelector.dropdown);
                if (rangeSelector && dropdown) {
                    chart.setFocusToElement(rangeSelector.buttonGroup, dropdown);
                    if (this.removeDropdownKeydownHandler) {
                        this.removeDropdownKeydownHandler();
                    }
                    // Tab-press with dropdown focused does not propagate to chart
                    // automatically, so we manually catch and handle it when relevant.
                    this.removeDropdownKeydownHandler = addEvent(dropdown, 'keydown', function (e) {
                        var isTab = (e.which || e.keyCode) === _this.keyCodes.tab;
                        if (isTab) {
                            e.preventDefault();
                            e.stopPropagation();
                            if (chart.accessibility) {
                                chart.accessibility.keyboardNavigation.tabindexContainer.focus();
                                chart.accessibility.keyboardNavigation[e.shiftKey ? 'prev' : 'next']();
                            }
                        }
                    });
                }
            },
            /**
             * Get navigation for the range selector buttons.
             * @private
             * @return {Highcharts.KeyboardNavigationHandler} The module object.
             */
            getRangeSelectorButtonNavigation: function () {
                var chart = this.chart;
                var keys = this.keyCodes;
                var component = this;
                return new KeyboardNavigationHandler(chart, {
                    keyCodeMap: [
                        [
                            [keys.left, keys.right, keys.up, keys.down],
                            function (keyCode) {
                                return component.onButtonNavKbdArrowKey(this, keyCode);
                            }
                        ],
                        [
                            [keys.enter, keys.space],
                            function () {
                                return component.onButtonNavKbdClick(this);
                            }
                        ]
                    ],
                    validate: function () {
                        return !!(chart.rangeSelector &&
                            chart.rangeSelector.buttons &&
                            chart.rangeSelector.buttons.length);
                    },
                    init: function (direction) {
                        var rangeSelector = chart.rangeSelector;
                        if (rangeSelector && rangeSelector.hasVisibleDropdown) {
                            component.initDropdownNav();
                        }
                        else if (rangeSelector) {
                            var lastButtonIx = rangeSelector.buttons.length - 1;
                            chart.highlightRangeSelectorButton(direction > 0 ? 0 : lastButtonIx);
                        }
                    },
                    terminate: function () {
                        if (component.removeDropdownKeydownHandler) {
                            component.removeDropdownKeydownHandler();
                            delete component.removeDropdownKeydownHandler;
                        }
                    }
                });
            },
            /**
             * Get navigation for the range selector input boxes.
             * @private
             * @return {Highcharts.KeyboardNavigationHandler}
             *         The module object.
             */
            getRangeSelectorInputNavigation: function () {
                var chart = this.chart;
                var component = this;
                return new KeyboardNavigationHandler(chart, {
                    keyCodeMap: [],
                    validate: function () {
                        return shouldRunInputNavigation(chart);
                    },
                    init: function (direction) {
                        component.onInputNavInit(direction);
                    },
                    terminate: function () {
                        component.onInputNavTerminate();
                    }
                });
            },
            /**
             * Get keyboard navigation handlers for this component.
             * @return {Array<Highcharts.KeyboardNavigationHandler>}
             *         List of module objects.
             */
            getKeyboardNavigation: function () {
                return [
                    this.getRangeSelectorButtonNavigation(),
                    this.getRangeSelectorInputNavigation()
                ];
            },
            /**
             * Remove component traces
             */
            destroy: function () {
                if (this.removeDropdownKeydownHandler) {
                    this.removeDropdownKeydownHandler();
                }
                if (this.removeInputKeydownHandler) {
                    this.removeInputKeydownHandler();
                }
                if (this.announcer) {
                    this.announcer.destroy();
                }
            }
        });

        return RangeSelectorComponent;
    });
    _registerModule(_modules, 'Accessibility/Components/InfoRegionsComponent.js', [_modules['Core/Renderer/HTML/AST.js'], _modules['Core/Chart/Chart.js'], _modules['Core/FormatUtilities.js'], _modules['Core/Globals.js'], _modules['Core/Utilities.js'], _modules['Accessibility/AccessibilityComponent.js'], _modules['Accessibility/Utils/Announcer.js'], _modules['Accessibility/Components/AnnotationsA11y.js'], _modules['Accessibility/Utils/ChartUtilities.js'], _modules['Accessibility/Utils/HTMLUtilities.js']], function (AST, Chart, F, H, U, AccessibilityComponent, Announcer, AnnotationsA11y, ChartUtilities, HTMLUtilities) {
        /* *
         *
         *  (c) 2009-2021 Øystein Moseng
         *
         *  Accessibility component for chart info region and table.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var format = F.format;
        var doc = H.doc;
        var extend = U.extend,
            pick = U.pick;
        var getAnnotationsInfoHTML = AnnotationsA11y.getAnnotationsInfoHTML;
        var getAxisDescription = ChartUtilities.getAxisDescription,
            getAxisRangeDescription = ChartUtilities.getAxisRangeDescription,
            getChartTitle = ChartUtilities.getChartTitle,
            unhideChartElementFromAT = ChartUtilities.unhideChartElementFromAT;
        var addClass = HTMLUtilities.addClass,
            getElement = HTMLUtilities.getElement,
            getHeadingTagNameForElement = HTMLUtilities.getHeadingTagNameForElement,
            setElAttrs = HTMLUtilities.setElAttrs,
            stripHTMLTagsFromString = HTMLUtilities.stripHTMLTagsFromString,
            visuallyHideElement = HTMLUtilities.visuallyHideElement;
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /**
         * @private
         */
        function stripEmptyHTMLTags(str) {
            return str.replace(/<(\w+)[^>]*?>\s*<\/\1>/g, '');
        }
        /**
         * @private
         */
        function getTypeDescForMapChart(chart, formatContext) {
            return formatContext.mapTitle ?
                chart.langFormat('accessibility.chartTypes.mapTypeDescription', formatContext) :
                chart.langFormat('accessibility.chartTypes.unknownMap', formatContext);
        }
        /**
         * @private
         */
        function getTypeDescForCombinationChart(chart, formatContext) {
            return chart.langFormat('accessibility.chartTypes.combinationChart', formatContext);
        }
        /**
         * @private
         */
        function getTypeDescForEmptyChart(chart, formatContext) {
            return chart.langFormat('accessibility.chartTypes.emptyChart', formatContext);
        }
        /**
         * @private
         */
        function buildTypeDescriptionFromSeries(chart, types, context) {
            var firstType = types[0], typeExplaination = chart.langFormat('accessibility.seriesTypeDescriptions.' + firstType, context), multi = chart.series && chart.series.length < 2 ? 'Single' : 'Multiple';
            return (chart.langFormat('accessibility.chartTypes.' + firstType + multi, context) ||
                chart.langFormat('accessibility.chartTypes.default' + multi, context)) + (typeExplaination ? ' ' + typeExplaination : '');
        }
        /**
         * @private
         */
        function getTableSummary(chart) {
            return chart.langFormat('accessibility.table.tableSummary', { chart: chart });
        }
        /**
         * Return simplified explaination of chart type. Some types will not be familiar
         * to most users, but in those cases we try to add an explaination of the type.
         *
         * @private
         * @function Highcharts.Chart#getTypeDescription
         * @param {Array<string>} types The series types in this chart.
         * @return {string} The text description of the chart type.
         */
        Chart.prototype.getTypeDescription = function (types) {
            var firstType = types[0],
                firstSeries = this.series && this.series[0] || {},
                formatContext = {
                    numSeries: this.series.length,
                    numPoints: firstSeries.points && firstSeries.points.length,
                    chart: this,
                    mapTitle: firstSeries.mapTitle
                };
            if (!firstType) {
                return getTypeDescForEmptyChart(this, formatContext);
            }
            if (firstType === 'map') {
                return getTypeDescForMapChart(this, formatContext);
            }
            if (this.types.length > 1) {
                return getTypeDescForCombinationChart(this, formatContext);
            }
            return buildTypeDescriptionFromSeries(this, types, formatContext);
        };
        /**
         * The InfoRegionsComponent class
         *
         * @private
         * @class
         * @name Highcharts.InfoRegionsComponent
         */
        var InfoRegionsComponent = function () { };
        InfoRegionsComponent.prototype = new AccessibilityComponent();
        extend(InfoRegionsComponent.prototype, /** @lends Highcharts.InfoRegionsComponent */ {
            /**
             * Init the component
             * @private
             */
            init: function () {
                var chart = this.chart;
                var component = this;
                this.initRegionsDefinitions();
                this.addEvent(chart, 'aftergetTableAST', function (e) {
                    component.onDataTableCreated(e);
                });
                this.addEvent(chart, 'afterViewData', function (tableDiv) {
                    component.dataTableDiv = tableDiv;
                    // Use small delay to give browsers & AT time to register new table
                    setTimeout(function () {
                        component.focusDataTable();
                    }, 300);
                });
                this.announcer = new Announcer(chart, 'assertive');
            },
            /**
             * @private
             */
            initRegionsDefinitions: function () {
                var component = this;
                this.screenReaderSections = {
                    before: {
                        element: null,
                        buildContent: function (chart) {
                            var formatter = chart.options.accessibility
                                    .screenReaderSection.beforeChartFormatter;
                            return formatter ? formatter(chart) :
                                component.defaultBeforeChartFormatter(chart);
                        },
                        insertIntoDOM: function (el, chart) {
                            chart.renderTo.insertBefore(el, chart.renderTo.firstChild);
                        },
                        afterInserted: function () {
                            if (typeof component.sonifyButtonId !== 'undefined') {
                                component.initSonifyButton(component.sonifyButtonId);
                            }
                            if (typeof component.dataTableButtonId !== 'undefined') {
                                component.initDataTableButton(component.dataTableButtonId);
                            }
                        }
                    },
                    after: {
                        element: null,
                        buildContent: function (chart) {
                            var formatter = chart.options.accessibility.screenReaderSection
                                    .afterChartFormatter;
                            return formatter ? formatter(chart) :
                                component.defaultAfterChartFormatter();
                        },
                        insertIntoDOM: function (el, chart) {
                            chart.renderTo.insertBefore(el, chart.container.nextSibling);
                        },
                        afterInserted: function () {
                            if (component.chart.accessibility) {
                                component.chart.accessibility
                                    .keyboardNavigation.updateExitAnchor(); // #15986
                            }
                        }
                    }
                };
            },
            /**
             * Called on chart render. Have to update the sections on render, in order
             * to get a11y info from series.
             */
            onChartRender: function () {
                var component = this;
                this.linkedDescriptionElement = this.getLinkedDescriptionElement();
                this.setLinkedDescriptionAttrs();
                Object.keys(this.screenReaderSections).forEach(function (regionKey) {
                    component.updateScreenReaderSection(regionKey);
                });
            },
            /**
             * @private
             */
            getLinkedDescriptionElement: function () {
                var chartOptions = this.chart.options,
                    linkedDescOption = chartOptions.accessibility.linkedDescription;
                if (!linkedDescOption) {
                    return;
                }
                if (typeof linkedDescOption !== 'string') {
                    return linkedDescOption;
                }
                var query = format(linkedDescOption,
                    this.chart),
                    queryMatch = doc.querySelectorAll(query);
                if (queryMatch.length === 1) {
                    return queryMatch[0];
                }
            },
            /**
             * @private
             */
            setLinkedDescriptionAttrs: function () {
                var el = this.linkedDescriptionElement;
                if (el) {
                    el.setAttribute('aria-hidden', 'true');
                    addClass(el, 'highcharts-linked-description');
                }
            },
            /**
             * @private
             * @param {string} regionKey The name/key of the region to update
             */
            updateScreenReaderSection: function (regionKey) {
                var chart = this.chart, region = this.screenReaderSections[regionKey], content = region.buildContent(chart), sectionDiv = region.element = (region.element || this.createElement('div')), hiddenDiv = (sectionDiv.firstChild || this.createElement('div'));
                this.setScreenReaderSectionAttribs(sectionDiv, regionKey);
                AST.setElementHTML(hiddenDiv, content);
                sectionDiv.appendChild(hiddenDiv);
                region.insertIntoDOM(sectionDiv, chart);
                visuallyHideElement(hiddenDiv);
                unhideChartElementFromAT(chart, hiddenDiv);
                if (region.afterInserted) {
                    region.afterInserted();
                }
            },
            /**
             * @private
             * @param {Highcharts.HTMLDOMElement} sectionDiv The section element
             * @param {string} regionKey Name/key of the region we are setting attrs for
             */
            setScreenReaderSectionAttribs: function (sectionDiv, regionKey) {
                var labelLangKey = ('accessibility.screenReaderSection.' + regionKey + 'RegionLabel'), chart = this.chart, labelText = chart.langFormat(labelLangKey, { chart: chart, chartTitle: getChartTitle(chart) }), sectionId = 'highcharts-screen-reader-region-' + regionKey + '-' +
                        chart.index;
                setElAttrs(sectionDiv, {
                    id: sectionId,
                    'aria-label': labelText
                });
                // Sections are wrapped to be positioned relatively to chart in case
                // elements inside are tabbed to.
                sectionDiv.style.position = 'relative';
                if (chart.options.accessibility.landmarkVerbosity === 'all' &&
                    labelText) {
                    sectionDiv.setAttribute('role', 'region');
                }
            },
            /**
             * @private
             * @return {string}
             */
            defaultBeforeChartFormatter: function () {
                var chart = this.chart,
                    format = chart.options.accessibility
                        .screenReaderSection.beforeChartFormat,
                    axesDesc = this.getAxesDescription(),
                    shouldHaveSonifyBtn = (chart.sonify &&
                        chart.options.sonification &&
                        chart.options.sonification.enabled),
                    sonifyButtonId = 'highcharts-a11y-sonify-data-btn-' +
                        chart.index,
                    dataTableButtonId = 'hc-linkto-highcharts-data-table-' +
                        chart.index,
                    annotationsList = getAnnotationsInfoHTML(chart),
                    annotationsTitleStr = chart.langFormat('accessibility.screenReaderSection.annotations.heading', { chart: chart }),
                    context = {
                        headingTagName: getHeadingTagNameForElement(chart.renderTo),
                        chartTitle: getChartTitle(chart),
                        typeDescription: this.getTypeDescriptionText(),
                        chartSubtitle: this.getSubtitleText(),
                        chartLongdesc: this.getLongdescText(),
                        xAxisDescription: axesDesc.xAxis,
                        yAxisDescription: axesDesc.yAxis,
                        playAsSoundButton: shouldHaveSonifyBtn ?
                            this.getSonifyButtonText(sonifyButtonId) : '',
                        viewTableButton: chart.getCSV ?
                            this.getDataTableButtonText(dataTableButtonId) : '',
                        annotationsTitle: annotationsList ? annotationsTitleStr : '',
                        annotationsList: annotationsList
                    },
                    formattedString = H.i18nFormat(format,
                    context,
                    chart);
                this.dataTableButtonId = dataTableButtonId;
                this.sonifyButtonId = sonifyButtonId;
                return stripEmptyHTMLTags(formattedString);
            },
            /**
             * @private
             * @return {string}
             */
            defaultAfterChartFormatter: function () {
                var chart = this.chart,
                    format = chart.options.accessibility
                        .screenReaderSection.afterChartFormat,
                    context = {
                        endOfChartMarker: this.getEndOfChartMarkerText()
                    },
                    formattedString = H.i18nFormat(format,
                    context,
                    chart);
                return stripEmptyHTMLTags(formattedString);
            },
            /**
             * @private
             * @return {string}
             */
            getLinkedDescription: function () {
                var el = this.linkedDescriptionElement,
                    content = el && el.innerHTML || '';
                return stripHTMLTagsFromString(content);
            },
            /**
             * @private
             * @return {string}
             */
            getLongdescText: function () {
                var chartOptions = this.chart.options,
                    captionOptions = chartOptions.caption,
                    captionText = captionOptions && captionOptions.text,
                    linkedDescription = this.getLinkedDescription();
                return (chartOptions.accessibility.description ||
                    linkedDescription ||
                    captionText ||
                    '');
            },
            /**
             * @private
             * @return {string}
             */
            getTypeDescriptionText: function () {
                var chart = this.chart;
                return chart.types ?
                    chart.options.accessibility.typeDescription ||
                        chart.getTypeDescription(chart.types) : '';
            },
            /**
             * @private
             * @param {string} buttonId
             * @return {string}
             */
            getDataTableButtonText: function (buttonId) {
                var chart = this.chart,
                    buttonText = chart.langFormat('accessibility.table.viewAsDataTableButtonText', { chart: chart,
                    chartTitle: getChartTitle(chart) });
                return '<button id="' + buttonId + '">' + buttonText + '</button>';
            },
            /**
             * @private
             * @param {string} buttonId
             * @return {string}
             */
            getSonifyButtonText: function (buttonId) {
                var chart = this.chart;
                if (chart.options.sonification &&
                    chart.options.sonification.enabled === false) {
                    return '';
                }
                var buttonText = chart.langFormat('accessibility.sonification.playAsSoundButtonText', { chart: chart,
                    chartTitle: getChartTitle(chart) });
                return '<button id="' + buttonId + '">' + buttonText + '</button>';
            },
            /**
             * @private
             * @return {string}
             */
            getSubtitleText: function () {
                var subtitle = (this.chart.options.subtitle);
                return stripHTMLTagsFromString(subtitle && subtitle.text || '');
            },
            /**
             * @private
             * @return {string}
             */
            getEndOfChartMarkerText: function () {
                var chart = this.chart, markerText = chart.langFormat('accessibility.screenReaderSection.endOfChartMarker', { chart: chart }), id = 'highcharts-end-of-chart-marker-' + chart.index;
                return '<div id="' + id + '">' + markerText + '</div>';
            },
            /**
             * @private
             * @param {Highcharts.Dictionary<string>} e
             */
            onDataTableCreated: function (e) {
                var chart = this.chart;
                if (chart.options.accessibility.enabled) {
                    if (this.viewDataTableButton) {
                        this.viewDataTableButton.setAttribute('aria-expanded', 'true');
                    }
                    var attributes = e.tree.attributes || {};
                    attributes.tabindex = -1;
                    attributes.summary = getTableSummary(chart);
                    e.tree.attributes = attributes;
                }
            },
            /**
             * @private
             */
            focusDataTable: function () {
                var tableDiv = this.dataTableDiv,
                    table = tableDiv && tableDiv.getElementsByTagName('table')[0];
                if (table && table.focus) {
                    table.focus();
                }
            },
            /**
             * @private
             * @param {string} sonifyButtonId
             */
            initSonifyButton: function (sonifyButtonId) {
                var _this = this;
                var el = this.sonifyButton = getElement(sonifyButtonId);
                var chart = this.chart;
                var defaultHandler = function (e) {
                        if (el) {
                            el.setAttribute('aria-hidden', 'true');
                        el.setAttribute('aria-label', '');
                    }
                    e.preventDefault();
                    e.stopPropagation();
                    var announceMsg = chart.langFormat('accessibility.sonification.playAsSoundClickAnnouncement', { chart: chart });
                    _this.announcer.announce(announceMsg);
                    setTimeout(function () {
                        if (el) {
                            el.removeAttribute('aria-hidden');
                            el.removeAttribute('aria-label');
                        }
                        if (chart.sonify) {
                            chart.sonify();
                        }
                    }, 1000); // Delay to let screen reader speak the button press
                };
                if (el && chart) {
                    setElAttrs(el, {
                        tabindex: -1
                    });
                    el.onclick = function (e) {
                        var onPlayAsSoundClick = (chart.options.accessibility &&
                                chart.options.accessibility.screenReaderSection.onPlayAsSoundClick);
                        (onPlayAsSoundClick || defaultHandler).call(this, e, chart);
                    };
                }
            },
            /**
             * Set attribs and handlers for default viewAsDataTable button if exists.
             * @private
             * @param {string} tableButtonId
             */
            initDataTableButton: function (tableButtonId) {
                var el = this.viewDataTableButton = getElement(tableButtonId), chart = this.chart, tableId = tableButtonId.replace('hc-linkto-', '');
                if (el) {
                    setElAttrs(el, {
                        tabindex: -1,
                        'aria-expanded': !!getElement(tableId)
                    });
                    el.onclick = chart.options.accessibility
                        .screenReaderSection.onViewDataTableClick ||
                        function () {
                            chart.viewData();
                        };
                }
            },
            /**
             * Return object with text description of each of the chart's axes.
             * @private
             * @return {Highcharts.Dictionary<string>}
             */
            getAxesDescription: function () {
                var chart = this.chart,
                    shouldDescribeColl = function (collectionKey,
                    defaultCondition) {
                        var axes = chart[collectionKey];
                    return axes.length > 1 || axes[0] &&
                        pick(axes[0].options.accessibility &&
                            axes[0].options.accessibility.enabled, defaultCondition);
                }, hasNoMap = !!chart.types && chart.types.indexOf('map') < 0, hasCartesian = !!chart.hasCartesianSeries, showXAxes = shouldDescribeColl('xAxis', !chart.angular && hasCartesian && hasNoMap), showYAxes = shouldDescribeColl('yAxis', hasCartesian && hasNoMap), desc = {};
                if (showXAxes) {
                    desc.xAxis = this.getAxisDescriptionText('xAxis');
                }
                if (showYAxes) {
                    desc.yAxis = this.getAxisDescriptionText('yAxis');
                }
                return desc;
            },
            /**
             * @private
             * @param {string} collectionKey
             * @return {string}
             */
            getAxisDescriptionText: function (collectionKey) {
                var chart = this.chart;
                var axes = chart[collectionKey];
                return chart.langFormat('accessibility.axis.' + collectionKey + 'Description' + (axes.length > 1 ? 'Plural' : 'Singular'), {
                    chart: chart,
                    names: axes.map(function (axis) {
                        return getAxisDescription(axis);
                    }),
                    ranges: axes.map(function (axis) {
                        return getAxisRangeDescription(axis);
                    }),
                    numAxes: axes.length
                });
            },
            /**
             * Remove component traces
             */
            destroy: function () {
                if (this.announcer) {
                    this.announcer.destroy();
                }
            }
        });

        return InfoRegionsComponent;
    });
    _registerModule(_modules, 'Accessibility/Components/ContainerComponent.js', [_modules['Accessibility/AccessibilityComponent.js'], _modules['Accessibility/KeyboardNavigationHandler.js'], _modules['Accessibility/Utils/ChartUtilities.js'], _modules['Core/Globals.js'], _modules['Accessibility/Utils/HTMLUtilities.js'], _modules['Core/Utilities.js']], function (AccessibilityComponent, KeyboardNavigationHandler, ChartUtilities, H, HTMLUtilities, U) {
        /* *
         *
         *  (c) 2009-2021 Øystein Moseng
         *
         *  Accessibility component for chart container.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var unhideChartElementFromAT = ChartUtilities.unhideChartElementFromAT,
            getChartTitle = ChartUtilities.getChartTitle;
        var doc = H.doc;
        var stripHTMLTags = HTMLUtilities.stripHTMLTagsFromString;
        var extend = U.extend;
        /* eslint-disable valid-jsdoc */
        /**
         * The ContainerComponent class
         *
         * @private
         * @class
         * @name Highcharts.ContainerComponent
         */
        var ContainerComponent = function () { };
        ContainerComponent.prototype = new AccessibilityComponent();
        extend(ContainerComponent.prototype, /** @lends Highcharts.ContainerComponent */ {
            /**
             * Called on first render/updates to the chart, including options changes.
             */
            onChartUpdate: function () {
                this.handleSVGTitleElement();
                this.setSVGContainerLabel();
                this.setGraphicContainerAttrs();
                this.setRenderToAttrs();
                this.makeCreditsAccessible();
            },
            /**
             * @private
             */
            handleSVGTitleElement: function () {
                var chart = this.chart, titleId = 'highcharts-title-' + chart.index, titleContents = stripHTMLTags(chart.langFormat('accessibility.svgContainerTitle', {
                        chartTitle: getChartTitle(chart)
                    }));
                if (titleContents.length) {
                    var titleElement = this.svgTitleElement =
                            this.svgTitleElement || doc.createElementNS('http://www.w3.org/2000/svg', 'title');
                    titleElement.textContent = titleContents;
                    titleElement.id = titleId;
                    chart.renderTo.insertBefore(titleElement, chart.renderTo.firstChild);
                }
            },
            /**
             * @private
             */
            setSVGContainerLabel: function () {
                var chart = this.chart,
                    svgContainerLabel = chart.langFormat('accessibility.svgContainerLabel', {
                        chartTitle: getChartTitle(chart)
                    });
                if (chart.renderer.box && svgContainerLabel.length) {
                    chart.renderer.box.setAttribute('aria-label', svgContainerLabel);
                }
            },
            /**
             * @private
             */
            setGraphicContainerAttrs: function () {
                var chart = this.chart,
                    label = chart.langFormat('accessibility.graphicContainerLabel', {
                        chartTitle: getChartTitle(chart)
                    });
                if (label.length) {
                    chart.container.setAttribute('aria-label', label);
                }
            },
            /**
             * @private
             */
            setRenderToAttrs: function () {
                var chart = this.chart;
                if (chart.options.accessibility.landmarkVerbosity !== 'disabled') {
                    chart.renderTo.setAttribute('role', 'region');
                }
                else {
                    chart.renderTo.removeAttribute('role');
                }
                chart.renderTo.setAttribute('aria-label', chart.langFormat('accessibility.chartContainerLabel', {
                    title: getChartTitle(chart),
                    chart: chart
                }));
            },
            /**
             * @private
             */
            makeCreditsAccessible: function () {
                var chart = this.chart,
                    credits = chart.credits;
                if (credits) {
                    if (credits.textStr) {
                        credits.element.setAttribute('aria-label', chart.langFormat('accessibility.credits', { creditsStr: stripHTMLTags(credits.textStr) }));
                    }
                    unhideChartElementFromAT(chart, credits.element);
                }
            },
            /**
             * Empty handler to just set focus on chart
             * @return {Highcharts.KeyboardNavigationHandler}
             */
            getKeyboardNavigation: function () {
                var chart = this.chart;
                return new KeyboardNavigationHandler(chart, {
                    keyCodeMap: [],
                    validate: function () {
                        return true;
                    },
                    init: function () {
                        var a11y = chart.accessibility;
                        if (a11y) {
                            a11y.keyboardNavigation.tabindexContainer.focus();
                        }
                    }
                });
            },
            /**
             * Accessibility disabled/chart destroyed.
             */
            destroy: function () {
                this.chart.renderTo.setAttribute('aria-hidden', true);
            }
        });

        return ContainerComponent;
    });
    _registerModule(_modules, 'Accessibility/HighContrastMode.js', [_modules['Core/Globals.js']], function (H) {
        /* *
         *
         *  (c) 2009-2021 Øystein Moseng
         *
         *  Handling for Windows High Contrast Mode.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var doc = H.doc,
            isMS = H.isMS,
            win = H.win;
        var whcm = {
                /**
                 * Detect WHCM in the browser.
                 *
                 * @function Highcharts#isHighContrastModeActive
                 * @private
                 * @return {boolean} Returns true if the browser is in High Contrast mode.
                 */
                isHighContrastModeActive: function () {
                    // Use media query on Edge, but not on IE
                    var isEdge = /(Edg)/.test(win.navigator.userAgent);
                if (win.matchMedia && isEdge) {
                    return win.matchMedia('(-ms-high-contrast: active)').matches;
                }
                // Test BG image for IE
                if (isMS && win.getComputedStyle) {
                    var testDiv = doc.createElement('div');
                    var imageSrc = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
                    testDiv.style.backgroundImage = "url(" + imageSrc + ")"; // #13071
                    doc.body.appendChild(testDiv);
                    var bi = (testDiv.currentStyle ||
                            win.getComputedStyle(testDiv)).backgroundImage;
                    doc.body.removeChild(testDiv);
                    return bi === 'none';
                }
                // Not used for other browsers
                return false;
            },
            /**
             * Force high contrast theme for the chart. The default theme is defined in
             * a separate file.
             *
             * @function Highcharts#setHighContrastTheme
             * @private
             * @param {Highcharts.AccessibilityChart} chart The chart to set the theme of.
             * @return {void}
             */
            setHighContrastTheme: function (chart) {
                // We might want to add additional functionality here in the future for
                // storing the old state so that we can reset the theme if HC mode is
                // disabled. For now, the user will have to reload the page.
                chart.highContrastModeActive = true;
                // Apply theme to chart
                var theme = (chart.options.accessibility.highContrastTheme);
                chart.update(theme, false);
                // Force series colors (plotOptions is not enough)
                chart.series.forEach(function (s) {
                    var plotOpts = theme.plotOptions[s.type] || {};
                    s.update({
                        color: plotOpts.color || 'windowText',
                        colors: [plotOpts.color || 'windowText'],
                        borderColor: plotOpts.borderColor || 'window'
                    });
                    // Force point colors if existing
                    s.points.forEach(function (p) {
                        if (p.options && p.options.color) {
                            p.update({
                                color: plotOpts.color || 'windowText',
                                borderColor: plotOpts.borderColor || 'window'
                            }, false);
                        }
                    });
                });
                // The redraw for each series and after is required for 3D pie
                // (workaround)
                chart.redraw();
            }
        };

        return whcm;
    });
    _registerModule(_modules, 'Accessibility/HighContrastTheme.js', [], function () {
        /* *
         *
         *  (c) 2009-2021 Øystein Moseng
         *
         *  Default theme for Windows High Contrast Mode.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var theme = {
                chart: {
                    backgroundColor: 'window'
                },
                title: {
                    style: {
                        color: 'windowText'
                    }
                },
                subtitle: {
                    style: {
                        color: 'windowText'
                    }
                },
                colorAxis: {
                    minColor: 'windowText',
                    maxColor: 'windowText',
                    stops: []
                },
                colors: ['windowText'],
                xAxis: {
                    gridLineColor: 'windowText',
                    labels: {
                        style: {
                            color: 'windowText'
                        }
                    },
                    lineColor: 'windowText',
                    minorGridLineColor: 'windowText',
                    tickColor: 'windowText',
                    title: {
                        style: {
                            color: 'windowText'
                        }
                    }
                },
                yAxis: {
                    gridLineColor: 'windowText',
                    labels: {
                        style: {
                            color: 'windowText'
                        }
                    },
                    lineColor: 'windowText',
                    minorGridLineColor: 'windowText',
                    tickColor: 'windowText',
                    title: {
                        style: {
                            color: 'windowText'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'window',
                    borderColor: 'windowText',
                    style: {
                        color: 'windowText'
                    }
                },
                plotOptions: {
                    series: {
                        lineColor: 'windowText',
                        fillColor: 'window',
                        borderColor: 'windowText',
                        edgeColor: 'windowText',
                        borderWidth: 1,
                        dataLabels: {
                            connectorColor: 'windowText',
                            color: 'windowText',
                            style: {
                                color: 'windowText',
                                textOutline: 'none'
                            }
                        },
                        marker: {
                            lineColor: 'windowText',
                            fillColor: 'windowText'
                        }
                    },
                    pie: {
                        color: 'window',
                        colors: ['window'],
                        borderColor: 'windowText',
                        borderWidth: 1
                    },
                    boxplot: {
                        fillColor: 'window'
                    },
                    candlestick: {
                        lineColor: 'windowText',
                        fillColor: 'window'
                    },
                    errorbar: {
                        fillColor: 'window'
                    }
                },
                legend: {
                    backgroundColor: 'window',
                    itemStyle: {
                        color: 'windowText'
                    },
                    itemHoverStyle: {
                        color: 'windowText'
                    },
                    itemHiddenStyle: {
                        color: '#555'
                    },
                    title: {
                        style: {
                            color: 'windowText'
                        }
                    }
                },
                credits: {
                    style: {
                        color: 'windowText'
                    }
                },
                labels: {
                    style: {
                        color: 'windowText'
                    }
                },
                drilldown: {
                    activeAxisLabelStyle: {
                        color: 'windowText'
                    },
                    activeDataLabelStyle: {
                        color: 'windowText'
                    }
                },
                navigation: {
                    buttonOptions: {
                        symbolStroke: 'windowText',
                        theme: {
                            fill: 'window'
                        }
                    }
                },
                rangeSelector: {
                    buttonTheme: {
                        fill: 'window',
                        stroke: 'windowText',
                        style: {
                            color: 'windowText'
                        },
                        states: {
                            hover: {
                                fill: 'window',
                                stroke: 'windowText',
                                style: {
                                    color: 'windowText'
                                }
                            },
                            select: {
                                fill: '#444',
                                stroke: 'windowText',
                                style: {
                                    color: 'windowText'
                                }
                            }
                        }
                    },
                    inputBoxBorderColor: 'windowText',
                    inputStyle: {
                        backgroundColor: 'window',
                        color: 'windowText'
                    },
                    labelStyle: {
                        color: 'windowText'
                    }
                },
                navigator: {
                    handles: {
                        backgroundColor: 'window',
                        borderColor: 'windowText'
                    },
                    outlineColor: 'windowText',
                    maskFill: 'transparent',
                    series: {
                        color: 'windowText',
                        lineColor: 'windowText'
                    },
                    xAxis: {
                        gridLineColor: 'windowText'
                    }
                },
                scrollbar: {
                    barBackgroundColor: '#444',
                    barBorderColor: 'windowText',
                    buttonArrowColor: 'windowText',
                    buttonBackgroundColor: 'window',
                    buttonBorderColor: 'windowText',
                    rifleColor: 'windowText',
                    trackBackgroundColor: 'window',
                    trackBorderColor: 'windowText'
                }
            };

        return theme;
    });
    _registerModule(_modules, 'Accessibility/Options/Options.js', [_modules['Core/Color/Palette.js']], function (palette) {
        /* *
         *
         *  (c) 2009-2021 Øystein Moseng
         *
         *  Default options for accessibility.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /**
         * Formatter callback for the accessibility announcement.
         *
         * @callback Highcharts.AccessibilityAnnouncementFormatter
         *
         * @param {Array<Highcharts.Series>} updatedSeries
         * Array of all series that received updates. If an announcement is already
         * queued, the series that received updates for that announcement are also
         * included in this array.
         *
         * @param {Highcharts.Series} [addedSeries]
         * This is provided if {@link Highcharts.Chart#addSeries} was called, and there
         * is a new series. In that case, this argument is a reference to the new
         * series.
         *
         * @param {Highcharts.Point} [addedPoint]
         * This is provided if {@link Highcharts.Series#addPoint} was called, and there
         * is a new point. In that case, this argument is a reference to the new point.
         *
         * @return {false|string}
         * The function should return a string with the text to announce to the user.
         * Return empty string to not announce anything. Return `false` to use the
         * default announcement format.
         */
        /**
         * @interface Highcharts.PointAccessibilityOptionsObject
         */ /**
        * Provide a description of the data point, announced to screen readers.
        * @name Highcharts.PointAccessibilityOptionsObject#description
        * @type {string|undefined}
        * @requires modules/accessibility
        * @since 7.1.0
        */ /**
        * Enable or disable exposing the point to assistive technology
        * @name Highcharts.PointAccessibilityOptionsObject#enabled
        * @type {boolean|undefined}
        * @requires modules/accessibility
        * @since 9.0.1
        */
        /* *
         * @interface Highcharts.PointOptionsObject in parts/Point.ts
         */ /**
        * @name Highcharts.PointOptionsObject#accessibility
        * @type {Highcharts.PointAccessibilityOptionsObject|undefined}
        * @requires modules/accessibility
        * @since 7.1.0
        */
        /**
         * @callback Highcharts.ScreenReaderClickCallbackFunction
         *
         * @param {global.MouseEvent} evt
         *        Mouse click event
         *
         * @return {void}
         */
        /**
         * Creates a formatted string for the screen reader module.
         *
         * @callback Highcharts.ScreenReaderFormatterCallbackFunction<T>
         *
         * @param {T} context
         *        Context to format
         *
         * @return {string}
         *         Formatted string for the screen reader module.
         */
        var Options = {
                /**
                 * Options for configuring accessibility for the chart. Requires the
                 * [accessibility module](https://code.highcharts.com/modules/accessibility.js)
                 * to be loaded. For a description of the module and information
                 * on its features, see
                 * [Highcharts Accessibility](https://www.highcharts.com/docs/accessibility/accessibility-module).
                 *
                 * @since        5.0.0
                 * @requires     modules/accessibility
                 * @optionparent accessibility
                 */
                accessibility: {
                    /**
                     * Enable accessibility functionality for the chart.
                     *
                     * @since 5.0.0
                     */
                    enabled: true,
                    /**
                     * Accessibility options for the screen reader information sections
                     * added before and after the chart.
                     *
                     * @since 8.0.0
                     */
                    screenReaderSection: {
                        /**
                         * Function to run upon clicking the "View as Data Table" link in
                         * the screen reader region.
                         *
                         * By default Highcharts will insert and set focus to a data table
                         * representation of the chart.
                         *
                         * @type      {Highcharts.ScreenReaderClickCallbackFunction}
                         * @since 8.0.0
                         * @apioption accessibility.screenReaderSection.onViewDataTableClick
                         */
                        /**
                         * Function to run upon clicking the "Play as sound" button in
                         * the screen reader region.
                         *
                         * By default Highcharts will call the `chart.sonify` function.
                         *
                         * @type      {Highcharts.ScreenReaderClickCallbackFunction}
                         * @since 8.0.1
                         * @apioption accessibility.screenReaderSection.onPlayAsSoundClick
                         */
                        /**
                         * A formatter function to create the HTML contents of the hidden
                         * screen reader information region before the chart. Receives one
                         * argument, `chart`, referring to the chart object. Should return a
                         * string with the HTML content of the region. By default this
                         * returns an automatic description of the chart based on
                         * [beforeChartFormat](#accessibility.screenReaderSection.beforeChartFormat).
                         *
                         * @type      {Highcharts.ScreenReaderFormatterCallbackFunction<Highcharts.Chart>}
                         * @since 8.0.0
                         * @apioption accessibility.screenReaderSection.beforeChartFormatter
                         */
                        /**
                         * Format for the screen reader information region before the chart.
                         * Supported HTML tags are `<h1-6>`, `<p>`, `<div>`, `<a>`, `<ul>`,
                         * `<ol>`, `<li>`, and `<button>`. Attributes are not supported,
                         * except for id on `<div>`, `<a>`, and `<button>`. Id is required
                         * on `<a>` and `<button>` in the format `<tag id="abcd">`. Numbers,
                         * lower- and uppercase letters, "-" and "#" are valid characters in
                         * IDs.
                         *
                         * The headingTagName is an auto-detected heading (h1-h6) that
                         * corresponds to the heading level below the previous heading in
                         * the DOM.
                         *
                         * @since 8.0.0
                         */
                        beforeChartFormat: '<{headingTagName}>{chartTitle}</{headingTagName}>' +
                            '<div>{typeDescription}</div>' +
                            '<div>{chartSubtitle}</div>' +
                            '<div>{chartLongdesc}</div>' +
                            '<div>{playAsSoundButton}</div>' +
                            '<div>{viewTableButton}</div>' +
                            '<div>{xAxisDescription}</div>' +
                            '<div>{yAxisDescription}</div>' +
                            '<div>{annotationsTitle}{annotationsList}</div>',
                        /**
                         * A formatter function to create the HTML contents of the hidden
                         * screen reader information region after the chart. Analogous to
                         * [beforeChartFormatter](#accessibility.screenReaderSection.beforeChartFormatter).
                         *
                         * @type      {Highcharts.ScreenReaderFormatterCallbackFunction<Highcharts.Chart>}
                         * @since 8.0.0
                         * @apioption accessibility.screenReaderSection.afterChartFormatter
                         */
                        /**
                         * Format for the screen reader information region after the chart.
                         * Analogous to [beforeChartFormat](#accessibility.screenReaderSection.beforeChartFormat).
                         *
                         * @since 8.0.0
                         */
                        afterChartFormat: '{endOfChartMarker}',
                        /**
                         * Date format to use to describe range of datetime axes.
                         *
                         * For an overview of the replacement codes, see
                         * [dateFormat](/class-reference/Highcharts#.dateFormat).
                         *
                         * @see [point.dateFormat](#accessibility.point.dateFormat)
                         *
                         * @since 8.0.0
                         */
                        axisRangeDateFormat: '%Y-%m-%d %H:%M:%S'
                    },
                    /**
                     * Accessibility options global to all data series. Individual series
                     * can also have specific [accessibility options](#plotOptions.series.accessibility)
                     * set.
                     *
                     * @since 8.0.0
                     */
                    series: {
                        /**
                         * Formatter function to use instead of the default for series
                         * descriptions. Receives one argument, `series`, referring to the
                         * series to describe. Should return a string with the description
                         * of the series for a screen reader user. If `false` is returned,
                         * the default formatter will be used for that series.
                         *
                         * @see [series.description](#plotOptions.series.description)
                         *
                         * @type      {Highcharts.ScreenReaderFormatterCallbackFunction<Highcharts.Series>}
                         * @since 8.0.0
                         * @apioption accessibility.series.descriptionFormatter
                         */
                        /**
                         * Whether or not to add series descriptions to charts with a single
                         * series.
                         *
                         * @since 8.0.0
                         */
                        describeSingleSeries: false,
                        /**
                         * When a series contains more points than this, we no longer expose
                         * information about individual points to screen readers.
                         *
                         * Set to `false` to disable.
                         *
                         * @type  {boolean|number}
                         * @since 8.0.0
                         */
                        pointDescriptionEnabledThreshold: 200
                    },
                    /**
                     * Options for descriptions of individual data points.
                     *
                     * @since 8.0.0
                     */
                    point: {
                        /**
                         * Date format to use for points on datetime axes when describing
                         * them to screen reader users.
                         *
                         * Defaults to the same format as in tooltip.
                         *
                         * For an overview of the replacement codes, see
                         * [dateFormat](/class-reference/Highcharts#.dateFormat).
                         *
                         * @see [dateFormatter](#accessibility.point.dateFormatter)
                         *
                         * @type      {string}
                         * @since 8.0.0
                         * @apioption accessibility.point.dateFormat
                         */
                        /**
                         * Formatter function to determine the date/time format used with
                         * points on datetime axes when describing them to screen reader
                         * users. Receives one argument, `point`, referring to the point
                         * to describe. Should return a date format string compatible with
                         * [dateFormat](/class-reference/Highcharts#.dateFormat).
                         *
                         * @see [dateFormat](#accessibility.point.dateFormat)
                         *
                         * @type      {Highcharts.ScreenReaderFormatterCallbackFunction<Highcharts.Point>}
                         * @since 8.0.0
                         * @apioption accessibility.point.dateFormatter
                         */
                        /**
                         * Prefix to add to the values in the point descriptions. Uses
                         * [tooltip.valuePrefix](#tooltip.valuePrefix) if not defined.
                         *
                         * @type        {string}
                         * @since 8.0.0
                         * @apioption   accessibility.point.valuePrefix
                         */
                        /**
                         * Suffix to add to the values in the point descriptions. Uses
                         * [tooltip.valueSuffix](#tooltip.valueSuffix) if not defined.
                         *
                         * @type        {string}
                         * @since 8.0.0
                         * @apioption   accessibility.point.valueSuffix
                         */
                        /**
                         * Decimals to use for the values in the point descriptions. Uses
                         * [tooltip.valueDecimals](#tooltip.valueDecimals) if not defined.
                         *
                         * @type        {number}
                         * @since 8.0.0
                         * @apioption   accessibility.point.valueDecimals
                         */
                        /**
                         * Formatter function to use instead of the default for point
                         * descriptions.
                         *
                         * Receives one argument, `point`, referring to the point to
                         * describe. Should return a string with the description of the
                         * point for a screen reader user. If `false` is returned, the
                         * default formatter will be used for that point.
                         *
                         * Note: Prefer using [accessibility.point.valueDescriptionFormat](#accessibility.point.valueDescriptionFormat)
                         * instead if possible, as default functionality such as describing
                         * annotations will be preserved.
                         *
                         * @see [accessibility.point.valueDescriptionFormat](#accessibility.point.valueDescriptionFormat)
                         * @see [point.accessibility.description](#series.line.data.accessibility.description)
                         *
                         * @type      {Highcharts.ScreenReaderFormatterCallbackFunction<Highcharts.Point>}
                         * @since 8.0.0
                         * @apioption accessibility.point.descriptionFormatter
                         */
                        /**
                         * Format to use for describing the values of data points
                         * to assistive technology - including screen readers.
                         * The point context is available as `{point}`.
                         *
                         * Additionally, the series name, annotation info, and
                         * description added in `point.accessibility.description`
                         * is added by default if relevant. To override this, use the
                         * [accessibility.point.descriptionFormatter](#accessibility.point.descriptionFormatter)
                         * option.
                         *
                         * @see [point.accessibility.description](#series.line.data.accessibility.description)
                         * @see [accessibility.point.descriptionFormatter](#accessibility.point.descriptionFormatter)
                         *
                         * @type      {string}
                         * @since 8.0.1
                         */
                        valueDescriptionFormat: '{index}. {xDescription}{separator}{value}.'
                    },
                    /**
                     * Amount of landmarks/regions to create for screen reader users. More
                     * landmarks can make navigation with screen readers easier, but can
                     * be distracting if there are lots of charts on the page. Three modes
                     * are available:
                     *  - `all`: Adds regions for all series, legend, menu, information
                     *      region.
                     *  - `one`: Adds a single landmark per chart.
                     *  - `disabled`: No landmarks are added.
                     *
                     * @since 7.1.0
                     * @validvalue ["all", "one", "disabled"]
                     */
                    landmarkVerbosity: 'all',
                    /**
                     * Link the chart to an HTML element describing the contents of the
                     * chart.
                     *
                     * It is always recommended to describe charts using visible text, to
                     * improve SEO as well as accessibility for users with disabilities.
                     * This option lets an HTML element with a description be linked to the
                     * chart, so that screen reader users can connect the two.
                     *
                     * By setting this option to a string, Highcharts runs the string as an
                     * HTML selector query on the entire document. If there is only a single
                     * match, this element is linked to the chart. The content of the linked
                     * element will be included in the chart description for screen reader
                     * users.
                     *
                     * By default, the chart looks for an adjacent sibling element with the
                     * `highcharts-description` class.
                     *
                     * The feature can be disabled by setting the option to an empty string,
                     * or overridden by providing the
                     * [accessibility.description](#accessibility.description) option.
                     * Alternatively, the HTML element to link can be passed in directly as
                     * an HTML node.
                     *
                     * If you need the description to be part of the exported image,
                     * consider using the [caption](#caption) feature.
                     *
                     * If you need the description to be hidden visually, use the
                     * [accessibility.description](#accessibility.description) option.
                     *
                     * @see [caption](#caption)
                     * @see [description](#accessibility.description)
                     * @see [typeDescription](#accessibility.typeDescription)
                     *
                     * @sample highcharts/accessibility/accessible-line
                     *         Accessible line chart
                     *
                     * @type  {string|Highcharts.HTMLDOMElement}
                     * @since 8.0.0
                     */
                    linkedDescription: '*[data-highcharts-chart="{index}"] + .highcharts-description',
                    /**
                     * A hook for adding custom components to the accessibility module.
                     * Should be an object mapping component names to instances of classes
                     * inheriting from the Highcharts.AccessibilityComponent base class.
                     * Remember to add the component to the
                     * [keyboardNavigation.order](#accessibility.keyboardNavigation.order)
                     * for the keyboard navigation to be usable.
                     *
                     * @sample highcharts/accessibility/custom-component
                     *         Custom accessibility component
                     *
                     * @type      {*}
                     * @since     7.1.0
                     * @apioption accessibility.customComponents
                     */
                    /**
                     * Theme to apply to the chart when Windows High Contrast Mode is
                     * detected. By default, a high contrast theme matching the high
                     * contrast system system colors is used.
                     *
                     * @type      {*}
                     * @since     7.1.3
                     * @apioption accessibility.highContrastTheme
                     */
                    /**
                     * A text description of the chart.
                     *
                     * **Note: Prefer using [linkedDescription](#accessibility.linkedDescription)
                     * or [caption](#caption.text) instead.**
                     *
                     * If the Accessibility module is loaded, this option is included by
                     * default as a long description of the chart in the hidden screen
                     * reader information region.
                     *
                     * Note: Since Highcharts now supports captions and linked descriptions,
                     * it is preferred to define the description using those methods, as a
                     * visible caption/description benefits all users. If the
                     * `accessibility.description` option is defined, the linked description
                     * is ignored, and the caption is hidden from screen reader users.
                     *
                     * @see [linkedDescription](#accessibility.linkedDescription)
                     * @see [caption](#caption)
                     * @see [typeDescription](#accessibility.typeDescription)
                     *
                     * @type      {string}
                     * @since     5.0.0
                     * @apioption accessibility.description
                     */
                    /**
                     * A text description of the chart type.
                     *
                     * If the Accessibility module is loaded, this will be included in the
                     * description of the chart in the screen reader information region.
                     *
                     * Highcharts will by default attempt to guess the chart type, but for
                     * more complex charts it is recommended to specify this property for
                     * clarity.
                     *
                     * @type      {string}
                     * @since     5.0.0
                     * @apioption accessibility.typeDescription
                     */
                    /**
                     * Options for keyboard navigation.
                     *
                     * @declare Highcharts.KeyboardNavigationOptionsObject
                     * @since   5.0.0
                     */
                    keyboardNavigation: {
                        /**
                         * Enable keyboard navigation for the chart.
                         *
                         * @since 5.0.0
                         */
                        enabled: true,
                        /**
                         * Options for the focus border drawn around elements while
                         * navigating through them.
                         *
                         * @sample highcharts/accessibility/custom-focus
                         *         Custom focus ring
                         *
                         * @declare Highcharts.KeyboardNavigationFocusBorderOptionsObject
                         * @since   6.0.3
                         */
                        focusBorder: {
                            /**
                             * Enable/disable focus border for chart.
                             *
                             * @since 6.0.3
                             */
                            enabled: true,
                            /**
                             * Hide the browser's default focus indicator.
                             *
                             * @since 6.0.4
                             */
                            hideBrowserFocusOutline: true,
                            /**
                             * Style options for the focus border drawn around elements
                             * while navigating through them. Note that some browsers in
                             * addition draw their own borders for focused elements. These
                             * automatic borders can not be styled by Highcharts.
                             *
                             * In styled mode, the border is given the
                             * `.highcharts-focus-border` class.
                             *
                             * @type    {Highcharts.CSSObject}
                             * @since   6.0.3
                             */
                            style: {
                                /** @internal */
                                color: palette.highlightColor80,
                                /** @internal */
                                lineWidth: 2,
                                /** @internal */
                                borderRadius: 3
                            },
                            /**
                             * Focus border margin around the elements.
                             *
                             * @since 6.0.3
                             */
                            margin: 2
                        },
                        /**
                         * Order of tab navigation in the chart. Determines which elements
                         * are tabbed to first. Available elements are: `series`, `zoom`,
                         * `rangeSelector`, `chartMenu`, `legend` and `container`. In
                         * addition, any custom components can be added here. Adding
                         * `container` first in order will make the keyboard focus stop on
                         * the chart container first, requiring the user to tab again to
                         * enter the chart.
                         *
                         * @type  {Array<string>}
                         * @since 7.1.0
                         */
                        order: ['series', 'zoom', 'rangeSelector', 'legend', 'chartMenu'],
                        /**
                         * Whether or not to wrap around when reaching the end of arrow-key
                         * navigation for an element in the chart.
                         * @since 7.1.0
                         */
                        wrapAround: true,
                        /**
                         * Options for the keyboard navigation of data points and series.
                         *
                         * @declare Highcharts.KeyboardNavigationSeriesNavigationOptionsObject
                         * @since 8.0.0
                         */
                        seriesNavigation: {
                            /**
                             * Set the keyboard navigation mode for the chart. Can be
                             * "normal" or "serialize". In normal mode, left/right arrow
                             * keys move between points in a series, while up/down arrow
                             * keys move between series. Up/down navigation acts
                             * intelligently to figure out which series makes sense to move
                             * to from any given point.
                             *
                             * In "serialize" mode, points are instead navigated as a single
                             * list. Left/right behaves as in "normal" mode. Up/down arrow
                             * keys will behave like left/right. This can be useful for
                             * unifying navigation behavior with/without screen readers
                             * enabled.
                             *
                             * @type       {string}
                             * @default    normal
                             * @since 8.0.0
                             * @validvalue ["normal", "serialize"]
                             * @apioption  accessibility.keyboardNavigation.seriesNavigation.mode
                             */
                            /**
                             * Skip null points when navigating through points with the
                             * keyboard.
                             *
                             * @since 8.0.0
                             */
                            skipNullPoints: true,
                            /**
                             * When a series contains more points than this, we no longer
                             * allow keyboard navigation for it.
                             *
                             * Set to `false` to disable.
                             *
                             * @type  {boolean|number}
                             * @since 8.0.0
                             */
                            pointNavigationEnabledThreshold: false
                        }
                    },
                    /**
                     * Options for announcing new data to screen reader users. Useful
                     * for dynamic data applications and drilldown.
                     *
                     * Keep in mind that frequent announcements will not be useful to
                     * users, as they won't have time to explore the new data. For these
                     * applications, consider making snapshots of the data accessible, and
                     * do the announcements in batches.
                     *
                     * @declare Highcharts.AccessibilityAnnounceNewDataOptionsObject
                     * @since   7.1.0
                     */
                    announceNewData: {
                        /**
                         * Optional formatter callback for the announcement. Receives
                         * up to three arguments. The first argument is always an array
                         * of all series that received updates. If an announcement is
                         * already queued, the series that received updates for that
                         * announcement are also included in this array. The second
                         * argument is provided if `chart.addSeries` was called, and
                         * there is a new series. In that case, this argument is a
                         * reference to the new series. The third argument, similarly,
                         * is provided if `series.addPoint` was called, and there is a
                         * new point. In that case, this argument is a reference to the
                         * new point.
                         *
                         * The function should return a string with the text to announce
                         * to the user. Return empty string to not announce anything.
                         * Return `false` to use the default announcement format.
                         *
                         * @sample highcharts/accessibility/custom-dynamic
                         *         High priority live alerts
                         *
                         * @type      {Highcharts.AccessibilityAnnouncementFormatter}
                         * @apioption accessibility.announceNewData.announcementFormatter
                         */
                        /**
                         * Enable announcing new data to screen reader users
                         * @sample highcharts/accessibility/accessible-dynamic
                         *         Dynamic data accessible
                         */
                        enabled: false,
                        /**
                         * Minimum interval between announcements in milliseconds. If
                         * new data arrives before this amount of time has passed, it is
                         * queued for announcement. If another new data event happens
                         * while an announcement is queued, the queued announcement is
                         * dropped, and the latest announcement is queued instead. Set
                         * to 0 to allow all announcements, but be warned that frequent
                         * announcements are disturbing to users.
                         */
                        minAnnounceInterval: 5000,
                        /**
                         * Choose whether or not the announcements should interrupt the
                         * screen reader. If not enabled, the user will be notified once
                         * idle. It is recommended not to enable this setting unless
                         * there is a specific reason to do so.
                         */
                        interruptUser: false
                    }
                },
                /**
                 * Accessibility options for a data point.
                 *
                 * @declare   Highcharts.PointAccessibilityOptionsObject
                 * @since     7.1.0
                 * @apioption series.line.data.accessibility
                 */
                /**
                 * Provide a description of the data point, announced to screen readers.
                 *
                 * @type      {string}
                 * @since     7.1.0
                 * @apioption series.line.data.accessibility.description
                 */
                /**
                 * Set to false to disable accessibility functionality for a specific point.
                 * The point will not be included in keyboard navigation, and will not be
                 * exposed to assistive technology.
                 *
                 * @type      {boolean}
                 * @since 9.0.1
                 * @apioption series.line.data.accessibility.enabled
                 */
                /**
                 * Accessibility options for a series.
                 *
                 * @declare    Highcharts.SeriesAccessibilityOptionsObject
                 * @since      7.1.0
                 * @requires   modules/accessibility
                 * @apioption  plotOptions.series.accessibility
                 */
                /**
                 * Enable/disable accessibility functionality for a specific series.
                 *
                 * @type       {boolean}
                 * @since      7.1.0
                 * @apioption  plotOptions.series.accessibility.enabled
                 */
                /**
                 * Provide a description of the series, announced to screen readers.
                 *
                 * @type       {string}
                 * @since      7.1.0
                 * @apioption  plotOptions.series.accessibility.description
                 */
                /**
                 * Formatter function to use instead of the default for point
                 * descriptions. Same as `accessibility.point.descriptionFormatter`, but for
                 * a single series.
                 *
                 * @see [accessibility.point.descriptionFormatter](#accessibility.point.descriptionFormatter)
                 *
                 * @type      {Highcharts.ScreenReaderFormatterCallbackFunction<Highcharts.Point>}
                 * @since     7.1.0
                 * @apioption plotOptions.series.accessibility.pointDescriptionFormatter
                 */
                /**
                 * Expose only the series element to screen readers, not its points.
                 *
                 * @type       {boolean}
                 * @since      7.1.0
                 * @apioption  plotOptions.series.accessibility.exposeAsGroupOnly
                 */
                /**
                 * Keyboard navigation for a series
                 *
                 * @declare    Highcharts.SeriesAccessibilityKeyboardNavigationOptionsObject
                 * @since      7.1.0
                 * @apioption  plotOptions.series.accessibility.keyboardNavigation
                 */
                /**
                 * Enable/disable keyboard navigation support for a specific series.
                 *
                 * @type       {boolean}
                 * @since      7.1.0
                 * @apioption  plotOptions.series.accessibility.keyboardNavigation.enabled
                 */
                /**
                 * Accessibility options for an annotation label.
                 *
                 * @declare    Highcharts.AnnotationLabelAccessibilityOptionsObject
                 * @since 8.0.1
                 * @requires   modules/accessibility
                 * @apioption  annotations.labelOptions.accessibility
                 */
                /**
                 * Description of an annotation label for screen readers and other assistive
                 * technology.
                 *
                 * @type       {string}
                 * @since 8.0.1
                 * @apioption  annotations.labelOptions.accessibility.description
                 */
                /**
                 * Accessibility options for an axis. Requires the accessibility module.
                 *
                 * @declare    Highcharts.AxisAccessibilityOptionsObject
                 * @since      7.1.0
                 * @requires   modules/accessibility
                 * @apioption  xAxis.accessibility
                 */
                /**
                 * Enable axis accessibility features, including axis information in the
                 * screen reader information region. If this is disabled on the xAxis, the
                 * x values are not exposed to screen readers for the individual data points
                 * by default.
                 *
                 * @type       {boolean}
                 * @since      7.1.0
                 * @apioption  xAxis.accessibility.enabled
                 */
                /**
                 * Description for an axis to expose to screen reader users.
                 *
                 * @type       {string}
                 * @since      7.1.0
                 * @apioption  xAxis.accessibility.description
                 */
                /**
                 * Range description for an axis. Overrides the default range description.
                 * Set to empty to disable range description for this axis.
                 *
                 * @type       {string}
                 * @since      7.1.0
                 * @apioption  xAxis.accessibility.rangeDescription
                 */
                /**
                 * @optionparent legend
                 */
                legend: {
                    /**
                     * Accessibility options for the legend. Requires the Accessibility
                     * module.
                     *
                     * @since     7.1.0
                     * @requires  modules/accessibility
                     */
                    accessibility: {
                        /**
                         * Enable accessibility support for the legend.
                         *
                         * @since  7.1.0
                         */
                        enabled: true,
                        /**
                         * Options for keyboard navigation for the legend.
                         *
                         * @since     7.1.0
                         * @requires  modules/accessibility
                         */
                        keyboardNavigation: {
                            /**
                             * Enable keyboard navigation for the legend.
                             *
                             * @see [accessibility.keyboardNavigation](#accessibility.keyboardNavigation.enabled)
                             *
                             * @since  7.1.0
                             */
                            enabled: true
                        }
                    }
                },
                /**
                 * @optionparent exporting
                 */
                exporting: {
                    /**
                     * Accessibility options for the exporting menu. Requires the
                     * Accessibility module.
                     *
                     * @since    7.1.0
                     * @requires modules/accessibility
                     */
                    accessibility: {
                        /**
                         * Enable accessibility support for the export menu.
                         *
                         * @since 7.1.0
                         */
                        enabled: true
                    }
                }
            };

        return Options;
    });
    _registerModule(_modules, 'Accessibility/Options/LangOptions.js', [], function () {
        /* *
         *
         *  (c) 2009-2021 Øystein Moseng
         *
         *  Default lang/i18n options for accessibility.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var langOptions = {
                /**
                 * Configure the accessibility strings in the chart. Requires the
                 * [accessibility module](https://code.highcharts.com/modules/accessibility.js)
                 * to be loaded. For a description of the module and information on its
                 * features, see
                 * [Highcharts Accessibility](https://www.highcharts.com/docs/chart-concepts/accessibility).
                 *
                 * For more dynamic control over the accessibility functionality, see
                 * [accessibility.point.descriptionFormatter](#accessibility.point.descriptionFormatter),
                 * [accessibility.series.descriptionFormatter](#accessibility.series.descriptionFormatter),
                 * and
                 * [accessibility.screenReaderSection.beforeChartFormatter](#accessibility.screenReaderSection.beforeChartFormatter).
                 *
                 * @since        6.0.6
                 * @optionparent lang.accessibility
                 */
                accessibility: {
                    defaultChartTitle: 'Chart',
                    chartContainerLabel: '{title}. Highcharts interactive chart.',
                    svgContainerLabel: 'Interactive chart',
                    drillUpButton: '{buttonText}',
                    credits: 'Chart credits: {creditsStr}',
                    /**
                     * Thousands separator to use when formatting numbers for screen
                     * readers. Note that many screen readers will not handle space as a
                     * thousands separator, and will consider "11 700" as two numbers.
                     *
                     * Set to `null` to use the separator defined in
                     * [lang.thousandsSep](lang.thousandsSep).
                     *
                     * @since 7.1.0
                     */
                    thousandsSep: ',',
                    /**
                     * Title element text for the chart SVG element. Leave this
                     * empty to disable adding the title element. Browsers will display
                     * this content when hovering over elements in the chart. Assistive
                     * technology may use this element to label the chart.
                     *
                     * @since 6.0.8
                     */
                    svgContainerTitle: '',
                    /**
                     * Set a label on the container wrapping the SVG.
                     *
                     * @see [chartContainerLabel](#lang.accessibility.chartContainerLabel)
                     *
                     * @since 8.0.0
                     */
                    graphicContainerLabel: '',
                    /**
                     * Language options for the screen reader information sections added
                     * before and after the charts.
                     *
                     * @since 8.0.0
                     */
                    screenReaderSection: {
                        beforeRegionLabel: 'Chart screen reader information, {chartTitle}.',
                        afterRegionLabel: '',
                        /**
                         * Language options for annotation descriptions.
                         *
                         * @since 8.0.1
                         */
                        annotations: {
                            heading: 'Chart annotations summary',
                            descriptionSinglePoint: '{annotationText}. Related to {annotationPoint}',
                            descriptionMultiplePoints: '{annotationText}. Related to {annotationPoint}' +
                                '{ Also related to, #each(additionalAnnotationPoints)}',
                            descriptionNoPoints: '{annotationText}'
                        },
                        /**
                         * Label for the end of the chart. Announced by screen readers.
                         *
                         * @since 8.0.0
                         */
                        endOfChartMarker: 'End of interactive chart.'
                    },
                    /**
                     * Language options for sonification.
                     *
                     * @since 8.0.1
                     */
                    sonification: {
                        playAsSoundButtonText: 'Play as sound, {chartTitle}',
                        playAsSoundClickAnnouncement: 'Play'
                    },
                    /**
                     * Language options for accessibility of the legend.
                     *
                     * @since 8.0.0
                     */
                    legend: {
                        legendLabelNoTitle: 'Toggle series visibility, {chartTitle}',
                        legendLabel: 'Chart legend: {legendTitle}',
                        legendItem: 'Show {itemName}'
                    },
                    /**
                     * Chart and map zoom accessibility language options.
                     *
                     * @since 8.0.0
                     */
                    zoom: {
                        mapZoomIn: 'Zoom chart',
                        mapZoomOut: 'Zoom out chart',
                        resetZoomButton: 'Reset zoom'
                    },
                    /**
                     * Range selector language options for accessibility.
                     *
                     * @since 8.0.0
                     */
                    rangeSelector: {
                        dropdownLabel: '{rangeTitle}',
                        minInputLabel: 'Select start date.',
                        maxInputLabel: 'Select end date.',
                        clickButtonAnnouncement: 'Viewing {axisRangeDescription}'
                    },
                    /**
                     * Accessibility language options for the data table.
                     *
                     * @since 8.0.0
                     */
                    table: {
                        viewAsDataTableButtonText: 'View as data table, {chartTitle}',
                        tableSummary: 'Table representation of chart.'
                    },
                    /**
                     * Default announcement for new data in charts. If addPoint or
                     * addSeries is used, and only one series/point is added, the
                     * `newPointAnnounce` and `newSeriesAnnounce` strings are used.
                     * The `...Single` versions will be used if there is only one chart
                     * on the page, and the `...Multiple` versions will be used if there
                     * are multiple charts on the page. For all other new data events,
                     * the `newDataAnnounce` string will be used.
                     *
                     * @since 7.1.0
                     */
                    announceNewData: {
                        newDataAnnounce: 'Updated data for chart {chartTitle}',
                        newSeriesAnnounceSingle: 'New data series: {seriesDesc}',
                        newPointAnnounceSingle: 'New data point: {pointDesc}',
                        newSeriesAnnounceMultiple: 'New data series in chart {chartTitle}: {seriesDesc}',
                        newPointAnnounceMultiple: 'New data point in chart {chartTitle}: {pointDesc}'
                    },
                    /**
                     * Descriptions of lesser known series types. The relevant
                     * description is added to the screen reader information region
                     * when these series types are used.
                     *
                     * @since 6.0.6
                     */
                    seriesTypeDescriptions: {
                        boxplot: 'Box plot charts are typically used to display ' +
                            'groups of statistical data. Each data point in the ' +
                            'chart can have up to 5 values: minimum, lower quartile, ' +
                            'median, upper quartile, and maximum.',
                        arearange: 'Arearange charts are line charts displaying a ' +
                            'range between a lower and higher value for each point.',
                        areasplinerange: 'These charts are line charts displaying a ' +
                            'range between a lower and higher value for each point.',
                        bubble: 'Bubble charts are scatter charts where each data ' +
                            'point also has a size value.',
                        columnrange: 'Columnrange charts are column charts ' +
                            'displaying a range between a lower and higher value for ' +
                            'each point.',
                        errorbar: 'Errorbar series are used to display the ' +
                            'variability of the data.',
                        funnel: 'Funnel charts are used to display reduction of data ' +
                            'in stages.',
                        pyramid: 'Pyramid charts consist of a single pyramid with ' +
                            'item heights corresponding to each point value.',
                        waterfall: 'A waterfall chart is a column chart where each ' +
                            'column contributes towards a total end value.'
                    },
                    /**
                     * Chart type description strings. This is added to the chart
                     * information region.
                     *
                     * If there is only a single series type used in the chart, we use
                     * the format string for the series type, or default if missing.
                     * There is one format string for cases where there is only a single
                     * series in the chart, and one for multiple series of the same
                     * type.
                     *
                     * @since 6.0.6
                     */
                    chartTypes: {
                        /* eslint-disable max-len */
                        emptyChart: 'Empty chart',
                        mapTypeDescription: 'Map of {mapTitle} with {numSeries} data series.',
                        unknownMap: 'Map of unspecified region with {numSeries} data series.',
                        combinationChart: 'Combination chart with {numSeries} data series.',
                        defaultSingle: 'Chart with {numPoints} data {#plural(numPoints, points, point)}.',
                        defaultMultiple: 'Chart with {numSeries} data series.',
                        splineSingle: 'Line chart with {numPoints} data {#plural(numPoints, points, point)}.',
                        splineMultiple: 'Line chart with {numSeries} lines.',
                        lineSingle: 'Line chart with {numPoints} data {#plural(numPoints, points, point)}.',
                        lineMultiple: 'Line chart with {numSeries} lines.',
                        columnSingle: 'Bar chart with {numPoints} {#plural(numPoints, bars, bar)}.',
                        columnMultiple: 'Bar chart with {numSeries} data series.',
                        barSingle: 'Bar chart with {numPoints} {#plural(numPoints, bars, bar)}.',
                        barMultiple: 'Bar chart with {numSeries} data series.',
                        pieSingle: 'Pie chart with {numPoints} {#plural(numPoints, slices, slice)}.',
                        pieMultiple: 'Pie chart with {numSeries} pies.',
                        scatterSingle: 'Scatter chart with {numPoints} {#plural(numPoints, points, point)}.',
                        scatterMultiple: 'Scatter chart with {numSeries} data series.',
                        boxplotSingle: 'Boxplot with {numPoints} {#plural(numPoints, boxes, box)}.',
                        boxplotMultiple: 'Boxplot with {numSeries} data series.',
                        bubbleSingle: 'Bubble chart with {numPoints} {#plural(numPoints, bubbles, bubble)}.',
                        bubbleMultiple: 'Bubble chart with {numSeries} data series.'
                    },
                    /**
                     * Axis description format strings.
                     *
                     * @since 6.0.6
                     */
                    axis: {
                        /* eslint-disable max-len */
                        xAxisDescriptionSingular: 'The chart has 1 X axis displaying {names[0]}. {ranges[0]}',
                        xAxisDescriptionPlural: 'The chart has {numAxes} X axes displaying {#each(names, -1) }and {names[-1]}.',
                        yAxisDescriptionSingular: 'The chart has 1 Y axis displaying {names[0]}. {ranges[0]}',
                        yAxisDescriptionPlural: 'The chart has {numAxes} Y axes displaying {#each(names, -1) }and {names[-1]}.',
                        timeRangeDays: 'Range: {range} days.',
                        timeRangeHours: 'Range: {range} hours.',
                        timeRangeMinutes: 'Range: {range} minutes.',
                        timeRangeSeconds: 'Range: {range} seconds.',
                        rangeFromTo: 'Range: {rangeFrom} to {rangeTo}.',
                        rangeCategories: 'Range: {numCategories} categories.'
                    },
                    /**
                     * Exporting menu format strings for accessibility module.
                     *
                     * @since 6.0.6
                     */
                    exporting: {
                        chartMenuLabel: 'Chart menu',
                        menuButtonLabel: 'View chart menu',
                        exportRegionLabel: 'Chart menu, {chartTitle}'
                    },
                    /**
                     * Lang configuration for different series types. For more dynamic
                     * control over the series element descriptions, see
                     * [accessibility.seriesDescriptionFormatter](#accessibility.seriesDescriptionFormatter).
                     *
                     * @since 6.0.6
                     */
                    series: {
                        /**
                         * Lang configuration for the series main summary. Each series
                         * type has two modes:
                         *
                         * 1. This series type is the only series type used in the
                         *    chart
                         *
                         * 2. This is a combination chart with multiple series types
                         *
                         * If a definition does not exist for the specific series type
                         * and mode, the 'default' lang definitions are used.
                         *
                         * @since 6.0.6
                         */
                        summary: {
                            /* eslint-disable max-len */
                            'default': '{name}, series {ix} of {numSeries} with {numPoints} data {#plural(numPoints, points, point)}.',
                            defaultCombination: '{name}, series {ix} of {numSeries} with {numPoints} data {#plural(numPoints, points, point)}.',
                            line: '{name}, line {ix} of {numSeries} with {numPoints} data {#plural(numPoints, points, point)}.',
                            lineCombination: '{name}, series {ix} of {numSeries}. Line with {numPoints} data {#plural(numPoints, points, point)}.',
                            spline: '{name}, line {ix} of {numSeries} with {numPoints} data {#plural(numPoints, points, point)}.',
                            splineCombination: '{name}, series {ix} of {numSeries}. Line with {numPoints} data {#plural(numPoints, points, point)}.',
                            column: '{name}, bar series {ix} of {numSeries} with {numPoints} {#plural(numPoints, bars, bar)}.',
                            columnCombination: '{name}, series {ix} of {numSeries}. Bar series with {numPoints} {#plural(numPoints, bars, bar)}.',
                            bar: '{name}, bar series {ix} of {numSeries} with {numPoints} {#plural(numPoints, bars, bar)}.',
                            barCombination: '{name}, series {ix} of {numSeries}. Bar series with {numPoints} {#plural(numPoints, bars, bar)}.',
                            pie: '{name}, pie {ix} of {numSeries} with {numPoints} {#plural(numPoints, slices, slice)}.',
                            pieCombination: '{name}, series {ix} of {numSeries}. Pie with {numPoints} {#plural(numPoints, slices, slice)}.',
                            scatter: '{name}, scatter plot {ix} of {numSeries} with {numPoints} {#plural(numPoints, points, point)}.',
                            scatterCombination: '{name}, series {ix} of {numSeries}, scatter plot with {numPoints} {#plural(numPoints, points, point)}.',
                            boxplot: '{name}, boxplot {ix} of {numSeries} with {numPoints} {#plural(numPoints, boxes, box)}.',
                            boxplotCombination: '{name}, series {ix} of {numSeries}. Boxplot with {numPoints} {#plural(numPoints, boxes, box)}.',
                            bubble: '{name}, bubble series {ix} of {numSeries} with {numPoints} {#plural(numPoints, bubbles, bubble)}.',
                            bubbleCombination: '{name}, series {ix} of {numSeries}. Bubble series with {numPoints} {#plural(numPoints, bubbles, bubble)}.',
                            map: '{name}, map {ix} of {numSeries} with {numPoints} {#plural(numPoints, areas, area)}.',
                            mapCombination: '{name}, series {ix} of {numSeries}. Map with {numPoints} {#plural(numPoints, areas, area)}.',
                            mapline: '{name}, line {ix} of {numSeries} with {numPoints} data {#plural(numPoints, points, point)}.',
                            maplineCombination: '{name}, series {ix} of {numSeries}. Line with {numPoints} data {#plural(numPoints, points, point)}.',
                            mapbubble: '{name}, bubble series {ix} of {numSeries} with {numPoints} {#plural(numPoints, bubbles, bubble)}.',
                            mapbubbleCombination: '{name}, series {ix} of {numSeries}. Bubble series with {numPoints} {#plural(numPoints, bubbles, bubble)}.'
                        },
                        /**
                         * User supplied description text. This is added in the point
                         * comment description by default if present.
                         *
                         * @since 6.0.6
                         */
                        description: '{description}',
                        /**
                         * xAxis description for series if there are multiple xAxes in
                         * the chart.
                         *
                         * @since 6.0.6
                         */
                        xAxisDescription: 'X axis, {name}',
                        /**
                         * yAxis description for series if there are multiple yAxes in
                         * the chart.
                         *
                         * @since 6.0.6
                         */
                        yAxisDescription: 'Y axis, {name}',
                        /**
                         * Description for the value of null points.
                         *
                         * @since 8.0.0
                         */
                        nullPointValue: 'No value',
                        /**
                         * Description for annotations on a point, as it is made available
                         * to assistive technology.
                         *
                         * @since 8.0.1
                         */
                        pointAnnotationsDescription: '{Annotation: #each(annotations). }'
                    }
                }
            };

        return langOptions;
    });
    _registerModule(_modules, 'Accessibility/Options/DeprecatedOptions.js', [_modules['Core/Utilities.js']], function (U) {
        /* *
         *
         *  (c) 2009-2021 Øystein Moseng
         *
         *  Default options for accessibility.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /* eslint-disable max-len */
        /*
         *  List of deprecated options:
         *
         *  chart.description -> accessibility.description
         *  chart.typeDescription -> accessibility.typeDescription
         *  series.description -> series.accessibility.description
         *  series.exposeElementToA11y -> series.accessibility.exposeAsGroupOnly
         *  series.pointDescriptionFormatter ->
         *      series.accessibility.pointDescriptionFormatter
         *  series.skipKeyboardNavigation ->
         *      series.accessibility.keyboardNavigation.enabled
         *  point.description -> point.accessibility.description !!!! WARNING: No longer deprecated and handled, removed for HC8.
         *  axis.description -> axis.accessibility.description
         *
         *  accessibility.pointDateFormat -> accessibility.point.dateFormat
         *  accessibility.addTableShortcut -> Handled by screenReaderSection.beforeChartFormat
         *  accessibility.pointDateFormatter -> accessibility.point.dateFormatter
         *  accessibility.pointDescriptionFormatter -> accessibility.point.descriptionFormatter
         *  accessibility.pointDescriptionThreshold -> accessibility.series.pointDescriptionEnabledThreshold
         *  accessibility.pointNavigationThreshold -> accessibility.keyboardNavigation.seriesNavigation.pointNavigationEnabledThreshold
         *  accessibility.pointValueDecimals -> accessibility.point.valueDecimals
         *  accessibility.pointValuePrefix -> accessibility.point.valuePrefix
         *  accessibility.pointValueSuffix -> accessibility.point.valueSuffix
         *  accessibility.screenReaderSectionFormatter -> accessibility.screenReaderSection.beforeChartFormatter
         *  accessibility.describeSingleSeries -> accessibility.series.describeSingleSeries
         *  accessibility.seriesDescriptionFormatter -> accessibility.series.descriptionFormatter
         *  accessibility.onTableAnchorClick -> accessibility.screenReaderSection.onViewDataTableClick
         *  accessibility.axisRangeDateFormat -> accessibility.screenReaderSection.axisRangeDateFormat
         *  accessibility.keyboardNavigation.skipNullPoints -> accessibility.keyboardNavigation.seriesNavigation.skipNullPoints
         *  accessibility.keyboardNavigation.mode -> accessibility.keyboardNavigation.seriesNavigation.mode
         *
         *  lang.accessibility.chartHeading -> no longer used, remove
         *  lang.accessibility.legendItem -> lang.accessibility.legend.legendItem
         *  lang.accessibility.legendLabel -> lang.accessibility.legend.legendLabel
         *  lang.accessibility.mapZoomIn -> lang.accessibility.zoom.mapZoomIn
         *  lang.accessibility.mapZoomOut -> lang.accessibility.zoom.mapZoomOut
         *  lang.accessibility.resetZoomButton -> lang.accessibility.zoom.resetZoomButton
         *  lang.accessibility.screenReaderRegionLabel -> lang.accessibility.screenReaderSection.beforeRegionLabel
         *  lang.accessibility.rangeSelectorButton -> lang.accessibility.rangeSelector.buttonText
         *  lang.accessibility.rangeSelectorMaxInput -> lang.accessibility.rangeSelector.maxInputLabel
         *  lang.accessibility.rangeSelectorMinInput -> lang.accessibility.rangeSelector.minInputLabel
         *  lang.accessibility.svgContainerEnd -> lang.accessibility.screenReaderSection.endOfChartMarker
         *  lang.accessibility.viewAsDataTable -> lang.accessibility.table.viewAsDataTableButtonText
         *  lang.accessibility.tableSummary -> lang.accessibility.table.tableSummary
         *
         */
        /* eslint-enable max-len */
        var error = U.error,
            pick = U.pick;
        /* eslint-disable valid-jsdoc */
        /**
         * Set a new option on a root prop, where the option is defined as an array of
         * suboptions.
         * @private
         * @param root
         * @param {Array<string>} optionAsArray
         * @param {*} val
         * @return {void}
         */
        function traverseSetOption(root, optionAsArray, val) {
            var opt = root,
                prop,
                i = 0;
            for (; i < optionAsArray.length - 1; ++i) {
                prop = optionAsArray[i];
                opt = opt[prop] = pick(opt[prop], {});
            }
            opt[optionAsArray[optionAsArray.length - 1]] = val;
        }
        /**
         * If we have a clear root option node for old and new options and a mapping
         * between, we can use this generic function for the copy and warn logic.
         */
        function deprecateFromOptionsMap(chart, rootOldAsArray, rootNewAsArray, mapToNewOptions) {
            /**
             * @private
             */
            function getChildProp(root, propAsArray) {
                return propAsArray.reduce(function (acc, cur) {
                    return acc[cur];
                }, root);
            }
            var rootOld = getChildProp(chart.options,
                rootOldAsArray),
                rootNew = getChildProp(chart.options,
                rootNewAsArray);
            Object.keys(mapToNewOptions).forEach(function (oldOptionKey) {
                var _a;
                var val = rootOld[oldOptionKey];
                if (typeof val !== 'undefined') {
                    traverseSetOption(rootNew, mapToNewOptions[oldOptionKey], val);
                    error(32, false, chart, (_a = {},
                        _a[rootOldAsArray.join('.') + "." + oldOptionKey] = rootNewAsArray.join('.') + "." + mapToNewOptions[oldOptionKey].join('.'),
                        _a));
                }
            });
        }
        /**
         * @private
         */
        function copyDeprecatedChartOptions(chart) {
            var chartOptions = chart.options.chart,
                a11yOptions = chart.options.accessibility || {};
            ['description', 'typeDescription'].forEach(function (prop) {
                var _a;
                if (chartOptions[prop]) {
                    a11yOptions[prop] = chartOptions[prop];
                    error(32, false, chart, (_a = {}, _a["chart." + prop] = "use accessibility." + prop, _a));
                }
            });
        }
        /**
         * @private
         */
        function copyDeprecatedAxisOptions(chart) {
            chart.axes.forEach(function (axis) {
                var opts = axis.options;
                if (opts && opts.description) {
                    opts.accessibility = opts.accessibility || {};
                    opts.accessibility.description = opts.description;
                    error(32, false, chart, { 'axis.description': 'use axis.accessibility.description' });
                }
            });
        }
        /**
         * @private
         */
        function copyDeprecatedSeriesOptions(chart) {
            // Map of deprecated series options. New options are defined as
            // arrays of paths under series.options.
            var oldToNewSeriesOptions = {
                    description: ['accessibility', 'description'],
                    exposeElementToA11y: ['accessibility', 'exposeAsGroupOnly'],
                    pointDescriptionFormatter: [
                        'accessibility', 'pointDescriptionFormatter'
                    ],
                    skipKeyboardNavigation: [
                        'accessibility', 'keyboardNavigation', 'enabled'
                    ]
                };
            chart.series.forEach(function (series) {
                // Handle series wide options
                Object.keys(oldToNewSeriesOptions).forEach(function (oldOption) {
                    var _a;
                    var optionVal = series.options[oldOption];
                    if (typeof optionVal !== 'undefined') {
                        // Set the new option
                        traverseSetOption(series.options, oldToNewSeriesOptions[oldOption], 
                        // Note that skipKeyboardNavigation has inverted option
                        // value, since we set enabled rather than disabled
                        oldOption === 'skipKeyboardNavigation' ?
                            !optionVal : optionVal);
                        error(32, false, chart, (_a = {}, _a["series." + oldOption] = "series." + oldToNewSeriesOptions[oldOption].join('.'), _a));
                    }
                });
            });
        }
        /**
         * @private
         */
        function copyDeprecatedTopLevelAccessibilityOptions(chart) {
            deprecateFromOptionsMap(chart, ['accessibility'], ['accessibility'], {
                pointDateFormat: ['point', 'dateFormat'],
                pointDateFormatter: ['point', 'dateFormatter'],
                pointDescriptionFormatter: ['point', 'descriptionFormatter'],
                pointDescriptionThreshold: ['series',
                    'pointDescriptionEnabledThreshold'],
                pointNavigationThreshold: ['keyboardNavigation', 'seriesNavigation',
                    'pointNavigationEnabledThreshold'],
                pointValueDecimals: ['point', 'valueDecimals'],
                pointValuePrefix: ['point', 'valuePrefix'],
                pointValueSuffix: ['point', 'valueSuffix'],
                screenReaderSectionFormatter: ['screenReaderSection',
                    'beforeChartFormatter'],
                describeSingleSeries: ['series', 'describeSingleSeries'],
                seriesDescriptionFormatter: ['series', 'descriptionFormatter'],
                onTableAnchorClick: ['screenReaderSection', 'onViewDataTableClick'],
                axisRangeDateFormat: ['screenReaderSection', 'axisRangeDateFormat']
            });
        }
        /**
         * @private
         */
        function copyDeprecatedKeyboardNavigationOptions(chart) {
            deprecateFromOptionsMap(chart, ['accessibility', 'keyboardNavigation'], ['accessibility', 'keyboardNavigation', 'seriesNavigation'], {
                skipNullPoints: ['skipNullPoints'],
                mode: ['mode']
            });
        }
        /**
         * @private
         */
        function copyDeprecatedLangOptions(chart) {
            deprecateFromOptionsMap(chart, ['lang', 'accessibility'], ['lang', 'accessibility'], {
                legendItem: ['legend', 'legendItem'],
                legendLabel: ['legend', 'legendLabel'],
                mapZoomIn: ['zoom', 'mapZoomIn'],
                mapZoomOut: ['zoom', 'mapZoomOut'],
                resetZoomButton: ['zoom', 'resetZoomButton'],
                screenReaderRegionLabel: ['screenReaderSection',
                    'beforeRegionLabel'],
                rangeSelectorButton: ['rangeSelector', 'buttonText'],
                rangeSelectorMaxInput: ['rangeSelector', 'maxInputLabel'],
                rangeSelectorMinInput: ['rangeSelector', 'minInputLabel'],
                svgContainerEnd: ['screenReaderSection', 'endOfChartMarker'],
                viewAsDataTable: ['table', 'viewAsDataTableButtonText'],
                tableSummary: ['table', 'tableSummary']
            });
        }
        /**
         * Copy options that are deprecated over to new options. Logs warnings to
         * console if deprecated options are used.
         *
         * @private
         */
        function copyDeprecatedOptions(chart) {
            copyDeprecatedChartOptions(chart);
            copyDeprecatedAxisOptions(chart);
            if (chart.series) {
                copyDeprecatedSeriesOptions(chart);
            }
            copyDeprecatedTopLevelAccessibilityOptions(chart);
            copyDeprecatedKeyboardNavigationOptions(chart);
            copyDeprecatedLangOptions(chart);
        }

        return copyDeprecatedOptions;
    });
    _registerModule(_modules, 'Accessibility/A11yI18n.js', [_modules['Core/Chart/Chart.js'], _modules['Core/Globals.js'], _modules['Core/FormatUtilities.js'], _modules['Core/Utilities.js']], function (Chart, H, F, U) {
        /* *
         *
         *  Accessibility module - internationalization support
         *
         *  (c) 2010-2021 Highsoft AS
         *  Author: Øystein Moseng
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var format = F.format;
        var pick = U.pick;
        /* eslint-disable valid-jsdoc */
        /**
         * String trim that works for IE6-8 as well.
         *
         * @private
         * @function stringTrim
         *
         * @param {string} str
         *        The input string
         *
         * @return {string}
         *         The trimmed string
         */
        function stringTrim(str) {
            return str.trim && str.trim() || str.replace(/^\s+|\s+$/g, '');
        }
        /**
         * i18n utility function. Format a single array or plural statement in a format
         * string. If the statement is not an array or plural statement, returns the
         * statement within brackets. Invalid array statements return an empty string.
         *
         * @private
         * @function formatExtendedStatement
         *
         * @param {string} statement
         *
         * @param {Highcharts.Dictionary<*>} ctx
         *        Context to apply to the format string.
         *
         * @return {string}
         */
        function formatExtendedStatement(statement, ctx) {
            var eachStart = statement.indexOf('#each('), pluralStart = statement.indexOf('#plural('), indexStart = statement.indexOf('['), indexEnd = statement.indexOf(']'), arr, result;
            // Dealing with an each-function?
            if (eachStart > -1) {
                var eachEnd = statement.slice(eachStart).indexOf(')') + eachStart, preEach = statement.substring(0, eachStart), postEach = statement.substring(eachEnd + 1), eachStatement = statement.substring(eachStart + 6, eachEnd), eachArguments = eachStatement.split(','), lenArg = Number(eachArguments[1]), len = void 0;
                result = '';
                arr = ctx[eachArguments[0]];
                if (arr) {
                    lenArg = isNaN(lenArg) ? arr.length : lenArg;
                    len = lenArg < 0 ?
                        arr.length + lenArg :
                        Math.min(lenArg, arr.length); // Overshoot
                    // Run through the array for the specified length
                    for (var i = 0; i < len; ++i) {
                        result += preEach + arr[i] + postEach;
                    }
                }
                return result.length ? result : '';
            }
            // Dealing with a plural-function?
            if (pluralStart > -1) {
                var pluralEnd = statement.slice(pluralStart).indexOf(')') + pluralStart, pluralStatement = statement.substring(pluralStart + 8, pluralEnd), pluralArguments = pluralStatement.split(','), num = Number(ctx[pluralArguments[0]]);
                switch (num) {
                    case 0:
                        result = pick(pluralArguments[4], pluralArguments[1]);
                        break;
                    case 1:
                        result = pick(pluralArguments[2], pluralArguments[1]);
                        break;
                    case 2:
                        result = pick(pluralArguments[3], pluralArguments[1]);
                        break;
                    default:
                        result = pluralArguments[1];
                }
                return result ? stringTrim(result) : '';
            }
            // Array index
            if (indexStart > -1) {
                var arrayName = statement.substring(0,
                    indexStart),
                    ix = Number(statement.substring(indexStart + 1,
                    indexEnd)),
                    val = void 0;
                arr = ctx[arrayName];
                if (!isNaN(ix) && arr) {
                    if (ix < 0) {
                        val = arr[arr.length + ix];
                        // Handle negative overshoot
                        if (typeof val === 'undefined') {
                            val = arr[0];
                        }
                    }
                    else {
                        val = arr[ix];
                        // Handle positive overshoot
                        if (typeof val === 'undefined') {
                            val = arr[arr.length - 1];
                        }
                    }
                }
                return typeof val !== 'undefined' ? val : '';
            }
            // Standard substitution, delegate to format or similar
            return '{' + statement + '}';
        }
        /**
         * i18n formatting function. Extends Highcharts.format() functionality by also
         * handling arrays and plural conditionals. Arrays can be indexed as follows:
         *
         * - Format: 'This is the first index: {myArray[0]}. The last: {myArray[-1]}.'
         *
         * - Context: { myArray: [0, 1, 2, 3, 4, 5] }
         *
         * - Result: 'This is the first index: 0. The last: 5.'
         *
         *
         * They can also be iterated using the #each() function. This will repeat the
         * contents of the bracket expression for each element. Example:
         *
         * - Format: 'List contains: {#each(myArray)cm }'
         *
         * - Context: { myArray: [0, 1, 2] }
         *
         * - Result: 'List contains: 0cm 1cm 2cm '
         *
         *
         * The #each() function optionally takes a length parameter. If positive, this
         * parameter specifies the max number of elements to iterate through. If
         * negative, the function will subtract the number from the length of the array.
         * Use this to stop iterating before the array ends. Example:
         *
         * - Format: 'List contains: {#each(myArray, -1) }and {myArray[-1]}.'
         *
         * - Context: { myArray: [0, 1, 2, 3] }
         *
         * - Result: 'List contains: 0, 1, 2, and 3.'
         *
         *
         * Use the #plural() function to pick a string depending on whether or not a
         * context object is 1. Arguments are #plural(obj, plural, singular). Example:
         *
         * - Format: 'Has {numPoints} {#plural(numPoints, points, point}.'
         *
         * - Context: { numPoints: 5 }
         *
         * - Result: 'Has 5 points.'
         *
         *
         * Optionally there are additional parameters for dual and none: #plural(obj,
         * plural, singular, dual, none). Example:
         *
         * - Format: 'Has {#plural(numPoints, many points, one point, two points,
         *   none}.'
         *
         * - Context: { numPoints: 2 }
         *
         * - Result: 'Has two points.'
         *
         *
         * The dual or none parameters will take precedence if they are supplied.
         *
         * @requires modules/accessibility
         *
         * @function Highcharts.i18nFormat
         *
         * @param {string} formatString
         *        The string to format.
         *
         * @param {Highcharts.Dictionary<*>} context
         *        Context to apply to the format string.
         *
         * @param {Highcharts.Chart} chart
         *        A `Chart` instance with a time object and numberFormatter, passed on
         *        to format().
         *
         * @return {string}
         *         The formatted string.
         */
        H.i18nFormat = function (formatString, context, chart) {
            var getFirstBracketStatement = function (sourceStr, offset) {
                    var str = sourceStr.slice(offset || 0), startBracket = str.indexOf('{'), endBracket = str.indexOf('}');
                if (startBracket > -1 && endBracket > startBracket) {
                    return {
                        statement: str.substring(startBracket + 1, endBracket),
                        begin: offset + startBracket + 1,
                        end: offset + endBracket
                    };
                }
            }, tokens = [], bracketRes, constRes, cursor = 0;
            // Tokenize format string into bracket statements and constants
            do {
                bracketRes = getFirstBracketStatement(formatString, cursor);
                constRes = formatString.substring(cursor, bracketRes && bracketRes.begin - 1);
                // If we have constant content before this bracket statement, add it
                if (constRes.length) {
                    tokens.push({
                        value: constRes,
                        type: 'constant'
                    });
                }
                // Add the bracket statement
                if (bracketRes) {
                    tokens.push({
                        value: bracketRes.statement,
                        type: 'statement'
                    });
                }
                cursor = bracketRes ? bracketRes.end + 1 : cursor + 1;
            } while (bracketRes);
            // Perform the formatting. The formatArrayStatement function returns the
            // statement in brackets if it is not an array statement, which means it
            // gets picked up by format below.
            tokens.forEach(function (token) {
                if (token.type === 'statement') {
                    token.value = formatExtendedStatement(token.value, context);
                }
            });
            // Join string back together and pass to format to pick up non-array
            // statements.
            return format(tokens.reduce(function (acc, cur) {
                return acc + cur.value;
            }, ''), context, chart);
        };
        /**
         * Apply context to a format string from lang options of the chart.
         *
         * @requires modules/accessibility
         *
         * @function Highcharts.Chart#langFormat
         *
         * @param {string} langKey
         *        Key (using dot notation) into lang option structure.
         *
         * @param {Highcharts.Dictionary<*>} context
         *        Context to apply to the format string.
         *
         * @return {string}
         *         The formatted string.
         */
        Chart.prototype.langFormat = function (langKey, context) {
            var keys = langKey.split('.'),
                formatString = this.options.lang,
                i = 0;
            for (; i < keys.length; ++i) {
                formatString = formatString && formatString[keys[i]];
            }
            return typeof formatString === 'string' ?
                H.i18nFormat(formatString, context, this) : '';
        };

    });
    _registerModule(_modules, 'Accessibility/FocusBorder.js', [_modules['Core/Chart/Chart.js'], _modules['Core/Renderer/SVG/SVGElement.js'], _modules['Core/Renderer/SVG/SVGLabel.js'], _modules['Core/Utilities.js']], function (Chart, SVGElement, SVGLabel, U) {
        /* *
         *
         *  (c) 2009-2021 Øystein Moseng
         *
         *  Extend SVG and Chart classes with focus border capabilities.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var addEvent = U.addEvent,
            extend = U.extend,
            pick = U.pick;
        /* eslint-disable no-invalid-this, valid-jsdoc */
        // Attributes that trigger a focus border update
        var svgElementBorderUpdateTriggers = [
                'x', 'y', 'transform', 'width', 'height', 'r', 'd', 'stroke-width'
            ];
        /**
         * Add hook to destroy focus border if SVG element is destroyed, unless
         * hook already exists.
         * @private
         * @param el Element to add destroy hook to
         */
        function addDestroyFocusBorderHook(el) {
            if (el.focusBorderDestroyHook) {
                return;
            }
            var origDestroy = el.destroy;
            el.destroy = function () {
                if (el.focusBorder && el.focusBorder.destroy) {
                    el.focusBorder.destroy();
                }
                return origDestroy.apply(el, arguments);
            };
            el.focusBorderDestroyHook = origDestroy;
        }
        /**
         * Remove hook from SVG element added by addDestroyFocusBorderHook, if
         * existing.
         * @private
         * @param el Element to remove destroy hook from
         */
        function removeDestroyFocusBorderHook(el) {
            if (!el.focusBorderDestroyHook) {
                return;
            }
            el.destroy = el.focusBorderDestroyHook;
            delete el.focusBorderDestroyHook;
        }
        /**
         * Add hooks to update the focus border of an element when the element
         * size/position is updated, unless already added.
         * @private
         * @param el Element to add update hooks to
         * @param updateParams Parameters to pass through to addFocusBorder when updating.
         */
        function addUpdateFocusBorderHooks(el) {
            var updateParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                updateParams[_i - 1] = arguments[_i];
            }
            if (el.focusBorderUpdateHooks) {
                return;
            }
            el.focusBorderUpdateHooks = {};
            svgElementBorderUpdateTriggers.forEach(function (trigger) {
                var setterKey = trigger + 'Setter';
                var origSetter = el[setterKey] || el._defaultSetter;
                el.focusBorderUpdateHooks[setterKey] = origSetter;
                el[setterKey] = function () {
                    var ret = origSetter.apply(el,
                        arguments);
                    el.addFocusBorder.apply(el, updateParams);
                    return ret;
                };
            });
        }
        /**
         * Remove hooks from SVG element added by addUpdateFocusBorderHooks, if
         * existing.
         * @private
         * @param el Element to remove update hooks from
         */
        function removeUpdateFocusBorderHooks(el) {
            if (!el.focusBorderUpdateHooks) {
                return;
            }
            Object.keys(el.focusBorderUpdateHooks).forEach(function (setterKey) {
                var origSetter = el.focusBorderUpdateHooks[setterKey];
                if (origSetter === el._defaultSetter) {
                    delete el[setterKey];
                }
                else {
                    el[setterKey] = origSetter;
                }
            });
            delete el.focusBorderUpdateHooks;
        }
        /*
         * Add focus border functionality to SVGElements. Draws a new rect on top of
         * element around its bounding box. This is used by multiple components.
         */
        extend(SVGElement.prototype, {
            /**
             * @private
             * @function Highcharts.SVGElement#addFocusBorder
             *
             * @param {number} margin
             *
             * @param {SVGAttributes} attribs
             */
            addFocusBorder: function (margin, attribs) {
                // Allow updating by just adding new border
                if (this.focusBorder) {
                    this.removeFocusBorder();
                }
                // Add the border rect
                var bb = this.getBBox(),
                    pad = pick(margin, 3);
                bb.x += this.translateX ? this.translateX : 0;
                bb.y += this.translateY ? this.translateY : 0;
                var borderPosX = bb.x - pad,
                    borderPosY = bb.y - pad,
                    borderWidth = bb.width + 2 * pad,
                    borderHeight = bb.height + 2 * pad;
                // For text elements, apply x and y offset, #11397.
                /**
                 * @private
                 * @function
                 *
                 * @param {Highcharts.SVGElement} text
                 *
                 * @return {TextAnchorCorrectionObject}
                 */
                function getTextAnchorCorrection(text) {
                    var posXCorrection = 0,
                        posYCorrection = 0;
                    if (text.attr('text-anchor') === 'middle') {
                        posXCorrection = posYCorrection = 0.5;
                    }
                    else if (!text.rotation) {
                        posYCorrection = 0.75;
                    }
                    else {
                        posXCorrection = 0.25;
                    }
                    return {
                        x: posXCorrection,
                        y: posYCorrection
                    };
                }
                var isLabel = this instanceof SVGLabel;
                if (this.element.nodeName === 'text' || isLabel) {
                    var isRotated = !!this.rotation;
                    var correction = !isLabel ? getTextAnchorCorrection(this) :
                            {
                                x: isRotated ? 1 : 0,
                                y: 0
                            };
                    var attrX = +this.attr('x');
                    var attrY = +this.attr('y');
                    if (!isNaN(attrX)) {
                        borderPosX = attrX - (bb.width * correction.x) - pad;
                    }
                    if (!isNaN(attrY)) {
                        borderPosY = attrY - (bb.height * correction.y) - pad;
                    }
                    if (isLabel && isRotated) {
                        var temp = borderWidth;
                        borderWidth = borderHeight;
                        borderHeight = temp;
                        if (!isNaN(attrX)) {
                            borderPosX = attrX - (bb.height * correction.x) - pad;
                        }
                        if (!isNaN(attrY)) {
                            borderPosY = attrY - (bb.width * correction.y) - pad;
                        }
                    }
                }
                this.focusBorder = this.renderer.rect(borderPosX, borderPosY, borderWidth, borderHeight, parseInt((attribs && attribs.r || 0).toString(), 10))
                    .addClass('highcharts-focus-border')
                    .attr({
                    zIndex: 99
                })
                    .add(this.parentGroup);
                if (!this.renderer.styledMode) {
                    this.focusBorder.attr({
                        stroke: attribs && attribs.stroke,
                        'stroke-width': attribs && attribs.strokeWidth
                    });
                }
                addUpdateFocusBorderHooks(this, margin, attribs);
                addDestroyFocusBorderHook(this);
            },
            /**
             * @private
             * @function Highcharts.SVGElement#removeFocusBorder
             */
            removeFocusBorder: function () {
                removeUpdateFocusBorderHooks(this);
                removeDestroyFocusBorderHook(this);
                if (this.focusBorder) {
                    this.focusBorder.destroy();
                    delete this.focusBorder;
                }
            }
        });
        /**
         * Redraws the focus border on the currently focused element.
         *
         * @private
         * @function Highcharts.Chart#renderFocusBorder
         */
        Chart.prototype.renderFocusBorder = function () {
            var focusElement = this.focusElement,
                focusBorderOptions = this.options.accessibility.keyboardNavigation.focusBorder;
            if (focusElement) {
                focusElement.removeFocusBorder();
                if (focusBorderOptions.enabled) {
                    focusElement.addFocusBorder(focusBorderOptions.margin, {
                        stroke: focusBorderOptions.style.color,
                        strokeWidth: focusBorderOptions.style.lineWidth,
                        r: focusBorderOptions.style.borderRadius
                    });
                }
            }
        };
        /**
         * Set chart's focus to an SVGElement. Calls focus() on it, and draws the focus
         * border. This is used by multiple components.
         *
         * @private
         * @function Highcharts.Chart#setFocusToElement
         *
         * @param {Highcharts.SVGElement} svgElement
         *        Element to draw the border around.
         *
         * @param {SVGDOMElement|HTMLDOMElement} [focusElement]
         *        If supplied, it draws the border around svgElement and sets the focus
         *        to focusElement.
         */
        Chart.prototype.setFocusToElement = function (svgElement, focusElement) {
            var focusBorderOptions = this.options.accessibility.keyboardNavigation.focusBorder,
                browserFocusElement = focusElement || svgElement.element;
            // Set browser focus if possible
            if (browserFocusElement &&
                browserFocusElement.focus) {
                // If there is no focusin-listener, add one to work around Edge issue
                // where Narrator is not reading out points despite calling focus().
                if (!(browserFocusElement.hcEvents &&
                    browserFocusElement.hcEvents.focusin)) {
                    addEvent(browserFocusElement, 'focusin', function () { });
                }
                browserFocusElement.focus();
                // Hide default focus ring
                if (focusBorderOptions.hideBrowserFocusOutline) {
                    browserFocusElement.style.outline = 'none';
                }
            }
            if (this.focusElement) {
                this.focusElement.removeFocusBorder();
            }
            this.focusElement = svgElement;
            this.renderFocusBorder();
        };

    });
    _registerModule(_modules, 'Accessibility/Accessibility.js', [_modules['Core/Chart/Chart.js'], _modules['Accessibility/Utils/ChartUtilities.js'], _modules['Core/Globals.js'], _modules['Accessibility/KeyboardNavigationHandler.js'], _modules['Core/DefaultOptions.js'], _modules['Core/Series/Point.js'], _modules['Core/Series/Series.js'], _modules['Core/Utilities.js'], _modules['Accessibility/AccessibilityComponent.js'], _modules['Accessibility/KeyboardNavigation.js'], _modules['Accessibility/Components/LegendComponent.js'], _modules['Accessibility/Components/MenuComponent.js'], _modules['Accessibility/Components/SeriesComponent/SeriesComponent.js'], _modules['Accessibility/Components/ZoomComponent.js'], _modules['Accessibility/Components/RangeSelectorComponent.js'], _modules['Accessibility/Components/InfoRegionsComponent.js'], _modules['Accessibility/Components/ContainerComponent.js'], _modules['Accessibility/HighContrastMode.js'], _modules['Accessibility/HighContrastTheme.js'], _modules['Accessibility/Options/Options.js'], _modules['Accessibility/Options/LangOptions.js'], _modules['Accessibility/Options/DeprecatedOptions.js'], _modules['Accessibility/Utils/HTMLUtilities.js']], function (Chart, ChartUtilities, H, KeyboardNavigationHandler, D, Point, Series, U, AccessibilityComponent, KeyboardNavigation, LegendComponent, MenuComponent, SeriesComponent, ZoomComponent, RangeSelectorComponent, InfoRegionsComponent, ContainerComponent, whcm, highContrastTheme, defaultOptionsA11Y, defaultLangOptions, copyDeprecatedOptions, HTMLUtilities) {
        /* *
         *
         *  (c) 2009-2021 Øystein Moseng
         *
         *  Accessibility module for Highcharts
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var doc = H.doc;
        var defaultOptions = D.defaultOptions;
        var addEvent = U.addEvent,
            extend = U.extend,
            fireEvent = U.fireEvent,
            merge = U.merge;
        // Add default options
        merge(true, defaultOptions, defaultOptionsA11Y, {
            accessibility: {
                highContrastTheme: highContrastTheme
            },
            lang: defaultLangOptions
        });
        // Expose functionality on Highcharts namespace
        H.A11yChartUtilities = ChartUtilities;
        H.A11yHTMLUtilities = HTMLUtilities;
        H.KeyboardNavigationHandler = KeyboardNavigationHandler;
        H.AccessibilityComponent = AccessibilityComponent;
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /**
         * The Accessibility class
         *
         * @private
         * @requires module:modules/accessibility
         *
         * @class
         * @name Highcharts.Accessibility
         *
         * @param {Highcharts.Chart} chart
         *        Chart object
         */
        function Accessibility(chart) {
            this.init(chart);
        }
        Accessibility.prototype = {
            /**
             * Initialize the accessibility class
             * @private
             * @param {Highcharts.Chart} chart
             *        Chart object
             */
            init: function (chart) {
                this.chart = chart;
                // Abort on old browsers
                if (!doc.addEventListener || !chart.renderer.isSVG) {
                    chart.renderTo.setAttribute('aria-hidden', true);
                    return;
                }
                // Copy over any deprecated options that are used. We could do this on
                // every update, but it is probably not needed.
                copyDeprecatedOptions(chart);
                this.initComponents();
                this.keyboardNavigation = new KeyboardNavigation(chart, this.components);
                this.update();
            },
            /**
             * @private
             */
            initComponents: function () {
                var chart = this.chart,
                    a11yOptions = chart.options.accessibility;
                this.components = {
                    container: new ContainerComponent(),
                    infoRegions: new InfoRegionsComponent(),
                    legend: new LegendComponent(),
                    chartMenu: new MenuComponent(),
                    rangeSelector: new RangeSelectorComponent(),
                    series: new SeriesComponent(),
                    zoom: new ZoomComponent()
                };
                if (a11yOptions.customComponents) {
                    extend(this.components, a11yOptions.customComponents);
                }
                var components = this.components;
                this.getComponentOrder().forEach(function (componentName) {
                    components[componentName].initBase(chart);
                    components[componentName].init();
                });
            },
            /**
             * Get order to update components in.
             * @private
             */
            getComponentOrder: function () {
                if (!this.components) {
                    return []; // For zombie accessibility object on old browsers
                }
                if (!this.components.series) {
                    return Object.keys(this.components);
                }
                var componentsExceptSeries = Object.keys(this.components)
                        .filter(function (c) { return c !== 'series'; });
                // Update series first, so that other components can read accessibility
                // info on points.
                return ['series'].concat(componentsExceptSeries);
            },
            /**
             * Update all components.
             */
            update: function () {
                var components = this.components,
                    chart = this.chart,
                    a11yOptions = chart.options.accessibility;
                fireEvent(chart, 'beforeA11yUpdate');
                // Update the chart type list as this is used by multiple modules
                chart.types = this.getChartTypes();
                // Update markup
                this.getComponentOrder().forEach(function (componentName) {
                    components[componentName].onChartUpdate();
                    fireEvent(chart, 'afterA11yComponentUpdate', {
                        name: componentName,
                        component: components[componentName]
                    });
                });
                // Update keyboard navigation
                this.keyboardNavigation.update(a11yOptions.keyboardNavigation.order);
                // Handle high contrast mode
                if (!chart.highContrastModeActive && // Only do this once
                    whcm.isHighContrastModeActive()) {
                    whcm.setHighContrastTheme(chart);
                }
                fireEvent(chart, 'afterA11yUpdate', {
                    accessibility: this
                });
            },
            /**
             * Destroy all elements.
             */
            destroy: function () {
                var chart = this.chart || {};
                // Destroy components
                var components = this.components;
                Object.keys(components).forEach(function (componentName) {
                    components[componentName].destroy();
                    components[componentName].destroyBase();
                });
                // Kill keyboard nav
                if (this.keyboardNavigation) {
                    this.keyboardNavigation.destroy();
                }
                // Hide container from screen readers if it exists
                if (chart.renderTo) {
                    chart.renderTo.setAttribute('aria-hidden', true);
                }
                // Remove focus border if it exists
                if (chart.focusElement) {
                    chart.focusElement.removeFocusBorder();
                }
            },
            /**
             * Return a list of the types of series we have in the chart.
             * @private
             */
            getChartTypes: function () {
                var types = {};
                this.chart.series.forEach(function (series) {
                    types[series.type] = 1;
                });
                return Object.keys(types);
            }
        };
        /**
         * @private
         */
        Chart.prototype.updateA11yEnabled = function () {
            var a11y = this.accessibility,
                accessibilityOptions = this.options.accessibility;
            if (accessibilityOptions && accessibilityOptions.enabled) {
                if (a11y) {
                    a11y.update();
                }
                else {
                    this.accessibility = a11y = new Accessibility(this);
                }
            }
            else if (a11y) {
                // Destroy if after update we have a11y and it is disabled
                if (a11y.destroy) {
                    a11y.destroy();
                }
                delete this.accessibility;
            }
            else {
                // Just hide container
                this.renderTo.setAttribute('aria-hidden', true);
            }
        };
        // Handle updates to the module and send render updates to components
        addEvent(Chart, 'render', function (e) {
            // Update/destroy
            if (this.a11yDirty && this.renderTo) {
                delete this.a11yDirty;
                this.updateA11yEnabled();
            }
            var a11y = this.accessibility;
            if (a11y) {
                a11y.getComponentOrder().forEach(function (componentName) {
                    a11y.components[componentName].onChartRender();
                });
            }
        });
        // Update with chart/series/point updates
        addEvent(Chart, 'update', function (e) {
            // Merge new options
            var newOptions = e.options.accessibility;
            if (newOptions) {
                // Handle custom component updating specifically
                if (newOptions.customComponents) {
                    this.options.accessibility.customComponents =
                        newOptions.customComponents;
                    delete newOptions.customComponents;
                }
                merge(true, this.options.accessibility, newOptions);
                // Recreate from scratch
                if (this.accessibility && this.accessibility.destroy) {
                    this.accessibility.destroy();
                    delete this.accessibility;
                }
            }
            // Mark dirty for update
            this.a11yDirty = true;
        });
        // Mark dirty for update
        addEvent(Point, 'update', function () {
            if (this.series.chart.accessibility) {
                this.series.chart.a11yDirty = true;
            }
        });
        ['addSeries', 'init'].forEach(function (event) {
            addEvent(Chart, event, function () {
                this.a11yDirty = true;
            });
        });
        ['update', 'updatedData', 'remove'].forEach(function (event) {
            addEvent(Series, event, function () {
                if (this.chart.accessibility) {
                    this.chart.a11yDirty = true;
                }
            });
        });
        // Direct updates (events happen after render)
        [
            'afterDrilldown', 'drillupall'
        ].forEach(function (event) {
            addEvent(Chart, event, function () {
                if (this.accessibility) {
                    this.accessibility.update();
                }
            });
        });
        // Destroy with chart
        addEvent(Chart, 'destroy', function () {
            if (this.accessibility) {
                this.accessibility.destroy();
            }
        });

    });
    _registerModule(_modules, 'masters/modules/accessibility.src.js', [], function () {


    });
}));