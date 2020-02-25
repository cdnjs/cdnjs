/**
 * @license Highcharts JS v8.0.0 (2019-12-10)
 *
 * Accessibility module
 *
 * (c) 2010-2019 Highsoft AS
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
    _registerModule(_modules, 'modules/accessibility/utils/htmlUtilities.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         *
         *  (c) 2009-2019 Øystein Moseng
         *
         *  Utility functions for accessibility module.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var merge = H.merge,
            win = H.win,
            doc = win.document;
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
                    var cleanedVal = escapeStringForHTML('' + val);
                    el.setAttribute(attr, cleanedVal);
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
                removeElement: removeElement,
                reverseChildNodes: reverseChildNodes,
                setElAttrs: setElAttrs,
                stripHTMLTagsFromString: stripHTMLTagsFromString,
                visuallyHideElement: visuallyHideElement
            };

        return HTMLUtilities;
    });
    _registerModule(_modules, 'modules/accessibility/utils/chartUtilities.js', [_modules['modules/accessibility/utils/htmlUtilities.js'], _modules['parts/Globals.js']], function (HTMLUtilities, H) {
        /* *
         *
         *  (c) 2009-2019 Øystein Moseng
         *
         *  Utils for dealing with charts.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var stripHTMLTags = HTMLUtilities.stripHTMLTagsFromString;
        var find = H.find;
        /* eslint-disable valid-jsdoc */
        /**
         * @return {string}
         */
        function getChartTitle(chart) {
            return stripHTMLTags(chart.options.title.text ||
                chart.langFormat('accessibility.defaultChartTitle', { chart: chart }));
        }
        /**
         * @param {Highcharts.Axis} axis
         * @return {string}
         */
        function getAxisDescription(axis) {
            return stripHTMLTags(axis && (axis.userOptions && axis.userOptions.accessibility &&
                axis.userOptions.accessibility.description ||
                axis.axisTitle && axis.axisTitle.textStr ||
                axis.options.id ||
                axis.categories && 'categories' ||
                axis.isDatetimeAxis && 'Time' ||
                'values'));
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
            if (series.points &&
                series.points.length &&
                series.points[0].graphic) {
                return series.points[0].graphic.element;
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
         * @return {void}
         */
        function unhideChartElementFromAT(chart, element) {
            element.setAttribute('aria-hidden', false);
            if (element === chart.renderTo || !element.parentNode) {
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
        var ChartUtilities = {
                getChartTitle: getChartTitle,
                getAxisDescription: getAxisDescription,
                getPointFromXY: getPointFromXY,
                getSeriesFirstPointElement: getSeriesFirstPointElement,
                getSeriesFromName: getSeriesFromName,
                getSeriesA11yElement: getSeriesA11yElement,
                unhideChartElementFromAT: unhideChartElementFromAT,
                hideSeriesFromAT: hideSeriesFromAT
            };

        return ChartUtilities;
    });
    _registerModule(_modules, 'modules/accessibility/KeyboardNavigationHandler.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         *
         *  (c) 2009-2019 Øystein Moseng
         *
         *  Keyboard navigation handler base class definition
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var find = H.find;
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
                var keyCode = e.which || e.keyCode,
                    response = this.response.noHandler,
                    handlerCodeSet = find(this.keyCodeMap,
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
                else if (keyCode === 27) {
                    // Default esc handler, hide tooltip
                    if (this.chart && this.chart.tooltip) {
                        this.chart.tooltip.hide(0);
                    }
                    response = this.response.success;
                }
                return response;
            }
        };

        return KeyboardNavigationHandler;
    });
    _registerModule(_modules, 'modules/accessibility/utils/EventProvider.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js']], function (H, U) {
        /* *
         *
         *  (c) 2009-2019 Øystein Moseng
         *
         *  Class that can keep track of events added, and clean them up on destroy.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var extend = U.extend;
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
                var remover = H.addEvent.apply(H,
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
    _registerModule(_modules, 'modules/accessibility/utils/DOMElementProvider.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js'], _modules['modules/accessibility/utils/htmlUtilities.js']], function (H, U, HTMLUtilities) {
        /* *
         *
         *  (c) 2009-2019 Øystein Moseng
         *
         *  Class that can keep track of elements added to DOM and clean them up on
         *  destroy.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var doc = H.win.document;
        var extend = U.extend;
        var removeElement = HTMLUtilities.removeElement;
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
    _registerModule(_modules, 'modules/accessibility/AccessibilityComponent.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js'], _modules['modules/accessibility/utils/htmlUtilities.js'], _modules['modules/accessibility/utils/chartUtilities.js'], _modules['modules/accessibility/utils/EventProvider.js'], _modules['modules/accessibility/utils/DOMElementProvider.js']], function (H, U, HTMLUtilities, ChartUtilities, EventProvider, DOMElementProvider) {
        /* *
         *
         *  (c) 2009-2019 Øystein Moseng
         *
         *  Accessibility component class definition
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var win = H.win,
            doc = win.document,
            merge = H.merge,
            fireEvent = H.fireEvent;
        var extend = U.extend;
        var removeElement = HTMLUtilities.removeElement,
            getFakeMouseEvent = HTMLUtilities.getFakeMouseEvent;
        var unhideChartElementFromAT = ChartUtilities.unhideChartElementFromAT;
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
                    attributes),
                    bBox = this.getElementPosition(posElement || svgElement);
                Object.keys(attrs).forEach(function (prop) {
                    if (attrs[prop] !== null) {
                        proxy.setAttribute(prop, attrs[prop]);
                    }
                });
                proxy.className = 'highcharts-a11y-proxy-button';
                if (preClickEvent) {
                    this.addEvent(proxy, 'click', preClickEvent);
                }
                this.setProxyButtonStyle(proxy, bBox);
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
             * @param {Highcharts.HTMLElement} button
             * @param {Highcharts.BBoxObject} bBox
             */
            setProxyButtonStyle: function (button, bBox) {
                merge(true, button.style, {
                    'border-width': 0,
                    'background-color': 'transparent',
                    cursor: 'pointer',
                    outline: 'none',
                    opacity: 0.001,
                    filter: 'alpha(opacity=1)',
                    '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=1)',
                    zIndex: 999,
                    overflow: 'hidden',
                    padding: 0,
                    margin: 0,
                    display: 'block',
                    position: 'absolute',
                    width: (bBox.width || 1) + 'px',
                    height: (bBox.height || 1) + 'px',
                    left: (bBox.x || 0) + 'px',
                    top: (bBox.y || 0) + 'px'
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
                    component.addEvent(button, evtType, function (e) {
                        var clonedEvent = component.cloneMouseEvent(e);
                        if (source) {
                            component.fireEventOnWrappedOrUnwrappedElement(source, clonedEvent);
                        }
                        e.stopPropagation();
                        e.preventDefault();
                    });
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
    _registerModule(_modules, 'modules/accessibility/KeyboardNavigation.js', [_modules['parts/Globals.js'], _modules['modules/accessibility/utils/htmlUtilities.js'], _modules['modules/accessibility/KeyboardNavigationHandler.js'], _modules['modules/accessibility/utils/EventProvider.js']], function (H, HTMLUtilities, KeyboardNavigationHandler, EventProvider) {
        /* *
         *
         *  (c) 2009-2019 Øystein Moseng
         *
         *  Main keyboard navigation handling.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var merge = H.merge,
            win = H.win,
            doc = win.document;
        var getElement = HTMLUtilities.getElement;
        /* eslint-disable valid-jsdoc */
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
                var keyboardNavigation = this,
                    e = this.eventProvider = new EventProvider();
                this.chart = chart;
                this.components = components;
                this.modules = [];
                this.currentModuleIx = 0;
                // Add keydown event
                e.addEvent(chart.renderTo, 'keydown', function (e) {
                    keyboardNavigation.onKeydown(e);
                });
                // Add mouseup event on doc
                e.addEvent(doc, 'mouseup', function () {
                    keyboardNavigation.onMouseUp();
                });
                // Run an update to get all modules
                this.update();
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
                    }, [
                        // Add an empty module at the start of list, to allow users to
                        // tab into the chart.
                        new KeyboardNavigationHandler(this.chart, {
                            init: function () { }
                        })
                    ]);
                    this.updateExitAnchor();
                }
                else {
                    this.modules = [];
                    this.currentModuleIx = 0;
                    this.removeExitAnchor();
                }
            },
            /**
             * Reset chart navigation state if we click outside the chart and it's
             * not already reset.
             * @private
             */
            onMouseUp: function () {
                if (!this.keyboardReset &&
                    !(this.chart.pointer && this.chart.pointer.chartPosition)) {
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
             * @param {global.KeyboardEvent} ev
             * Browser keydown event.
             */
            onKeydown: function (ev) {
                var e = ev || win.event,
                    preventDefault,
                    curNavModule = this.modules && this.modules.length &&
                        this.modules[this.currentModuleIx];
                // Used for resetting nav state when clicking outside chart
                this.keyboardReset = false;
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
                if (direction > 0) {
                    this.exiting = true;
                    this.exitAnchor.focus();
                }
                else {
                    this.chart.renderTo.focus();
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
                    container = this.chart.container,
                    curTabindex = container.getAttribute('tabIndex');
                if (shouldHaveTabindex && !curTabindex) {
                    container.setAttribute('tabindex', '0');
                }
                else if (!shouldHaveTabindex && curTabindex === '0') {
                    container.removeAttribute('tabindex');
                }
            },
            /**
             * @private
             */
            makeElementAnExitAnchor: function (el) {
                el.setAttribute('class', 'highcharts-exit-anchor');
                el.setAttribute('tabindex', '0');
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
                // Hide exit anchor
                merge(true, exitAnchor.style, {
                    position: 'absolute',
                    width: '1px',
                    height: '1px',
                    zIndex: 0,
                    overflow: 'hidden',
                    outline: 'none'
                });
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
                        chart.renderTo.focus();
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
                if (this.chart.container.getAttribute('tabindex') === '0') {
                    this.chart.container.removeAttribute('tabindex');
                }
            }
        };

        return KeyboardNavigation;
    });
    _registerModule(_modules, 'modules/accessibility/components/LegendComponent.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js'], _modules['modules/accessibility/AccessibilityComponent.js'], _modules['modules/accessibility/KeyboardNavigationHandler.js'], _modules['modules/accessibility/utils/htmlUtilities.js']], function (H, U, AccessibilityComponent, KeyboardNavigationHandler, HTMLUtilities) {
        /* *
         *
         *  (c) 2009-2019 Øystein Moseng
         *
         *  Accessibility component for chart legend.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var extend = U.extend;
        var stripHTMLTags = HTMLUtilities.stripHTMLTagsFromString,
            removeElement = HTMLUtilities.removeElement;
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
        H.Chart.prototype.highlightLegendItem = function (ix) {
            var items = this.legend.allItems,
                oldIx = this.highlightedLegendItemIx;
            if (items[ix]) {
                if (items[oldIx]) {
                    H.fireEvent(items[oldIx].legendGroup.element, 'mouseout');
                }
                scrollLegendToItem(this.legend, ix);
                this.setFocusToElement(items[ix].legendItem, items[ix].a11yProxyElement);
                H.fireEvent(items[ix].legendGroup.element, 'mouseover');
                return true;
            }
            return false;
        };
        // Keep track of pressed state for legend items
        H.addEvent(H.Legend, 'afterColorizeItem', function (e) {
            var chart = this.chart,
                a11yOptions = chart.options.accessibility,
                legendItem = e.item;
            if (a11yOptions.enabled && legendItem && legendItem.a11yProxyElement) {
                legendItem.a11yProxyElement.setAttribute('aria-pressed', e.visible ? 'false' : 'true');
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
                this.addEvent(H.Legend, 'afterScroll', function () {
                    if (this.chart === component.chart) {
                        component.updateProxies();
                    }
                });
            },
            /**
             * @private
             */
            updateLegendItemProxyVisibility: function () {
                var legend = this.chart.legend,
                    items = legend.allItems || [],
                    curPage = legend.currentPage || 1;
                items.forEach(function (item) {
                    var itemPage = item.pageIx || 0,
                        hide = itemPage !== curPage - 1;
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
                var component = this;
                // Ignore render after proxy clicked. No need to destroy it, and
                // destroying also kills focus.
                if (this.legendProxyButtonClicked) {
                    delete component.legendProxyButtonClicked;
                    return;
                }
                this.updateProxies();
            },
            /**
             * @private
             */
            updateProxies: function () {
                removeElement(this.legendProxyGroup);
                if (shouldDoLegendA11y(this.chart)) {
                    this.addLegendProxyGroup();
                    this.proxyLegendItems();
                    this.updateLegendItemProxyVisibility();
                }
            },
            /**
             * @private
             */
            addLegendProxyGroup: function () {
                var a11yOptions = this.chart.options.accessibility, groupLabel = this.chart.langFormat('accessibility.legend.legendLabel', {}), groupRole = a11yOptions.landmarkVerbosity === 'all' ?
                        'region' : null;
                this.legendProxyGroup = this.addProxyGroup({
                    'aria-label': groupLabel,
                    'role': groupRole
                });
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
             * @param {Highcharts.BubbleLegend|Highcharts.Point|Highcharts.Series} item
             */
            proxyLegendItem: function (item) {
                var component = this,
                    itemLabel = this.chart.langFormat('accessibility.legend.legendItem', {
                        chart: this.chart,
                        itemName: stripHTMLTags(item.name)
                    }),
                    attribs = {
                        tabindex: -1,
                        'aria-pressed': !item.visible,
                        'aria-label': itemLabel
                    }, 
                    // Keep track of when we should ignore next render
                    preClickEvent = function () {
                        component.legendProxyButtonClicked = true;
                }, 
                // Considers useHTML
                proxyPositioningElement = item.legendGroup.div ?
                    item.legendItem : item.legendGroup;
                item.a11yProxyElement = this.createProxyButton(item.legendItem, this.legendProxyGroup, attribs, proxyPositioningElement, preClickEvent);
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
                            function () {
                                return component.onKbdClick(this);
                            }
                        ]
                    ],
                    validate: function () {
                        return component.shouldHaveLegendNavigation();
                    },
                    init: function (direction) {
                        return component.onKbdNavigationInit(direction);
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
                    H.fireEvent(legendItem.a11yProxyElement, 'click');
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
    _registerModule(_modules, 'modules/accessibility/components/MenuComponent.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js'], _modules['modules/accessibility/AccessibilityComponent.js'], _modules['modules/accessibility/KeyboardNavigationHandler.js'], _modules['modules/accessibility/utils/chartUtilities.js'], _modules['modules/accessibility/utils/htmlUtilities.js']], function (H, U, AccessibilityComponent, KeyboardNavigationHandler, ChartUtilities, HTMLUtilities) {
        /* *
         *
         *  (c) 2009-2019 Øystein Moseng
         *
         *  Accessibility component for exporting menu.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var extend = U.extend;
        var unhideChartElementFromAT = ChartUtilities.unhideChartElementFromAT;
        var removeElement = HTMLUtilities.removeElement,
            getFakeMouseEvent = HTMLUtilities.getFakeMouseEvent;
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /**
         * Show the export menu and focus the first item (if exists).
         *
         * @private
         * @function Highcharts.Chart#showExportMenu
         */
        H.Chart.prototype.showExportMenu = function () {
            if (this.exportSVGElements && this.exportSVGElements[0]) {
                var el = this.exportSVGElements[0].element;
                if (el.onclick) {
                    el.onclick(getFakeMouseEvent('click'));
                }
            }
        };
        /**
         * @private
         * @function Highcharts.Chart#hideExportMenu
         */
        H.Chart.prototype.hideExportMenu = function () {
            var chart = this,
                exportList = chart.exportDivElements;
            if (exportList && chart.exportContextMenu) {
                // Reset hover states etc.
                exportList.forEach(function (el) {
                    if (el.className === 'highcharts-menu-item' && el.onmouseout) {
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
        H.Chart.prototype.highlightExportItem = function (ix) {
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
        H.Chart.prototype.highlightLastExportItem = function () {
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
            var exportingOpts = chart.options.exporting;
            return !!(exportingOpts &&
                exportingOpts.enabled !== false &&
                exportingOpts.accessibility &&
                exportingOpts.accessibility.enabled &&
                chart.exportSVGElements &&
                chart.exportSVGElements[0] &&
                chart.exportSVGElements[0].element);
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
                        'aria-label': chart.langFormat('accessibility.exporting.exportRegionLabel', { chart: chart }),
                        'role': 'region'
                    } : {});
                    var button = (this.chart.exportSVGElements[0]);
                    this.exportButtonProxy = this.createProxyButton(button, this.exportProxyGroup, {
                        'aria-label': chart.langFormat('accessibility.exporting.menuButtonLabel', { chart: chart }),
                        'aria-expanded': 'false'
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
                        if (item.tagName === 'LI' &&
                            !(item.children && item.children.length)) {
                            item.setAttribute('tabindex', -1);
                        }
                        else {
                            item.setAttribute('aria-hidden', 'true');
                        }
                    });
                    // Set accessibility properties on parent div
                    var parentDiv = exportList[0].parentNode;
                    parentDiv.removeAttribute('aria-hidden');
                    parentDiv.setAttribute('aria-label', chart.langFormat('accessibility.exporting.chartMenuLabel', { chart: chart }));
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
                        ],
                        // ESC handler
                        [
                            [keys.esc],
                            function () {
                                return this.response.prev;
                            }
                        ]
                    ],
                    // Only run exporting navigation if exporting support exists and is
                    // enabled on chart
                    validate: function () {
                        return chart.exportChart &&
                            chart.options.exporting.enabled !== false &&
                            chart.options.exporting.accessibility.enabled !==
                                false;
                    },
                    // Show export menu
                    init: function (direction) {
                        chart.showExportMenu();
                        if (direction < 0) {
                            chart.highlightLastExportItem();
                        }
                        else {
                            chart.highlightExportItem(0);
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
                var chart = this.chart;
                this.fakeClickEvent(chart.exportDivElements[chart.highlightedExportItemIx]);
                return keyboardNavigationHandler.response.success;
            }
        });

        return MenuComponent;
    });
    _registerModule(_modules, 'modules/accessibility/components/SeriesComponent/SeriesKeyboardNavigation.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js'], _modules['modules/accessibility/KeyboardNavigationHandler.js'], _modules['modules/accessibility/utils/EventProvider.js'], _modules['modules/accessibility/utils/chartUtilities.js']], function (H, U, KeyboardNavigationHandler, EventProvider, ChartUtilities) {
        /* *
         *
         *  (c) 2009-2019 Øystein Moseng
         *
         *  Handle keyboard navigation for series.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var extend = U.extend,
            defined = U.defined;
        var getPointFromXY = ChartUtilities.getPointFromXY,
            getSeriesFromName = ChartUtilities.getSeriesFromName;
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /*
         * Set for which series types it makes sense to move to the closest point with
         * up/down arrows, and which series types should just move to next series.
         */
        H.Series.prototype.keyboardMoveVertical = true;
        ['column', 'pie'].forEach(function (type) {
            if (H.seriesTypes[type]) {
                H.seriesTypes[type].prototype.keyboardMoveVertical = false;
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
                points = point.series.points,
                i = points.length;
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
            return point.isNull &&
                a11yOptions.keyboardNavigation.seriesNavigation.skipNullPoints ||
                point.visible === false ||
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
                i = series.points.length,
                hasUndefinedPosition = function (point) {
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
        H.Point.prototype.highlight = function () {
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
        H.Chart.prototype.highlightAdjacentPoint = function (next) {
            var chart = this,
                series = chart.series,
                curPoint = chart.highlightedPoint,
                curPointIndex = curPoint && getPointIndex(curPoint) || 0,
                curPoints = (curPoint && curPoint.series.points),
                lastSeries = chart.series && chart.series[chart.series.length - 1],
                lastPoint = lastSeries && lastSeries.points &&
                    lastSeries.points[lastSeries.points.length - 1],
                newSeries,
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
        H.Series.prototype.highlightFirstValidPoint = function () {
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
        H.Chart.prototype.highlightAdjacentSeries = function (down) {
            var chart = this,
                newSeries,
                newPoint,
                adjacentNewPoint,
                curPoint = chart.highlightedPoint,
                lastSeries = chart.series && chart.series[chart.series.length - 1],
                lastPoint = lastSeries && lastSeries.points &&
                    lastSeries.points[lastSeries.points.length - 1];
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
        H.Chart.prototype.highlightAdjacentPointVertical = function (down) {
            var curPoint = this.highlightedPoint,
                minDistance = Infinity,
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
                    var yDistance = point.plotY - curPoint.plotY,
                        width = Math.abs(point.plotX - curPoint.plotX),
                        distance = Math.abs(yDistance) * Math.abs(yDistance) +
                            width * width * 4; // Weigh horizontal distance highly
                        // Reverse distance number if axis is reversed
                        if (series.yAxis.reversed) {
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
            var numSeries = chart.series.length,
                i = numSeries,
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
                e.addEvent(H.Series, 'destroy', function () {
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
            },
            onDrillupAll: function () {
                // After drillup we want to find the point that was drilled down to and
                // highlight it.
                var last = this.lastDrilledDownPoint,
                    chart = this.chart,
                    series = last && getSeriesFromName(chart,
                    last.seriesName),
                    point;
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
                        [inverted ? [keys.up, keys.down] : [keys.left, keys.right],
                            function (keyCode) {
                                return keyboardNavigation.onKbdSideways(this, keyCode);
                            }],
                        [inverted ? [keys.left, keys.right] : [keys.up, keys.down],
                            function (keyCode) {
                                return keyboardNavigation.onKbdVertical(this, keyCode);
                            }],
                        [[keys.enter, keys.space],
                            function () {
                                if (chart.highlightedPoint) {
                                    chart.highlightedPoint.firePointEvent('click');
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
    _registerModule(_modules, 'modules/accessibility/components/SeriesComponent/SeriesDescriber.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js'], _modules['modules/accessibility/utils/htmlUtilities.js'], _modules['modules/accessibility/utils/chartUtilities.js']], function (H, U, HTMLUtilities, ChartUtilities) {
        /* *
         *
         *  (c) 2009-2019 Øystein Moseng
         *
         *  Place desriptions on a series and its points.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var numberFormat = H.numberFormat,
            find = H.find;
        var isNumber = U.isNumber,
            pick = U.pick,
            defined = U.defined;
        var stripHTMLTags = HTMLUtilities.stripHTMLTagsFromString,
            reverseChildNodes = HTMLUtilities.reverseChildNodes;
        var getAxisDescription = ChartUtilities.getAxisDescription,
            getSeriesFirstPointElement = ChartUtilities.getSeriesFirstPointElement,
            getSeriesA11yElement = ChartUtilities.getSeriesA11yElement,
            unhideChartElementFromAT = ChartUtilities.unhideChartElementFromAT;
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
        function makeDummyElement(point, pos) {
            var renderer = point.series.chart.renderer,
                dummy = renderer.rect(pos.x,
                pos.y, 1, 1);
            dummy.attr({
                'class': 'highcharts-a11y-dummy-point',
                fill: 'none',
                'fill-opacity': 0,
                'stroke-opacity': 0,
                opacity: 0
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
                chartOptions = chart.options.chart || {},
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
                hasDateXAxis = series.xAxis && series.xAxis.isDatetimeAxis;
            if (hasDateXAxis) {
                var tooltipDateFormat = H.Tooltip.prototype.getXDateFormat.call({
                        getDateFormat: H.Tooltip.prototype.getDateFormat,
                        chart: chart
                    },
                    point,
                    chart.options.tooltip,
                    series.xAxis),
                    dateFormat = a11yOptions.dateFormatter &&
                        a11yOptions.dateFormatter(point) ||
                        a11yOptions.dateFormat ||
                        tooltipDateFormat;
                return chart.time.dateFormat(dateFormat, point.x, void 0);
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
        function getPointValueDescription(point) {
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
         * Return string with information about point.
         * @private
         * @return {string}
         */
        function defaultPointDescriptionFormatter(point) {
            var series = point.series, chart = series.chart, description = point.options && point.options.accessibility &&
                    point.options.accessibility.description, showXDescription = pick(series.xAxis &&
                    series.xAxis.options.accessibility &&
                    series.xAxis.options.accessibility.enabled, !chart.angular), xDesc = getPointXDescription(point), valueDesc = getPointValueDescription(point), indexText = defined(point.index) ? (point.index + 1) + '. ' : '', xDescText = showXDescription ? xDesc + ', ' : '', valText = valueDesc + '.', userDescText = description ? ' ' + description : '', seriesNameText = chart.series.length > 1 && series.name ?
                    ' ' + series.name + '.' : '';
            return indexText + xDescText + valText + userDescText + seriesNameText;
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
                    var shouldAddDummyPoint = point.isNull,
                        pointEl = point.graphic && point.graphic.element ||
                            shouldAddDummyPoint && addDummyPointElement(point);
                    if (pointEl) {
                        // We always set tabindex, as long as we are setting
                        // props.
                        pointEl.setAttribute('tabindex', '-1');
                        if (setScreenReaderProps) {
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
                seriesEl = getSeriesA11yElement(series);
            if (seriesEl) {
                // For some series types the order of elements do not match the
                // order of points in series. In that case we have to reverse them
                // in order for AT to read them out in an understandable order
                if (seriesEl.lastChild === firstPointEl) {
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
                getPointValueDescription: getPointValueDescription
            };

        return SeriesDescriber;
    });
    _registerModule(_modules, 'modules/accessibility/components/SeriesComponent/NewDataAnnouncer.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js'], _modules['modules/accessibility/utils/htmlUtilities.js'], _modules['modules/accessibility/utils/chartUtilities.js'], _modules['modules/accessibility/components/SeriesComponent/SeriesDescriber.js'], _modules['modules/accessibility/utils/EventProvider.js'], _modules['modules/accessibility/utils/DOMElementProvider.js']], function (H, U, HTMLUtilities, ChartUtilities, SeriesDescriber, EventProvider, DOMElementProvider) {
        /* *
         *
         *  (c) 2009-2019 Øystein Moseng
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
        var visuallyHideElement = HTMLUtilities.visuallyHideElement;
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
             */
            init: function () {
                this.lastAnnouncementTime = 0;
                this.dirty = {
                    allSeries: {}
                };
                this.eventProvider = new EventProvider();
                this.domElementProvider = new DOMElementProvider();
                this.announceRegion = this.addAnnounceRegion();
                this.addEventListeners();
            },
            /**
             * Remove traces of announcer.
             */
            destroy: function () {
                this.eventProvider.removeAddedEvents();
                this.domElementProvider.destroyCreatedElements();
            },
            /**
             * Add the announcement live region to the DOM.
             * @private
             */
            addAnnounceRegion: function () {
                var chart = this.chart,
                    div = this.domElementProvider.createElement('div'),
                    announceOptions = (chart.options.accessibility.announceNewData);
                div.setAttribute('aria-hidden', false);
                div.setAttribute('aria-live', announceOptions.interruptUser ? 'assertive' : 'polite');
                visuallyHideElement(div);
                chart.renderTo.insertBefore(div, chart.renderTo.firstChild);
                return div;
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
                e.addEvent(H.Series, 'updatedData', function () {
                    announcer.onSeriesUpdatedData(this);
                });
                e.addEvent(chart, 'afterAddSeries', function (e) {
                    announcer.onSeriesAdded(e.series);
                });
                e.addEvent(H.Series, 'addPoint', function (e) {
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
                var chart = this.chart,
                    annOptions = (chart.options.accessibility.announceNewData);
                if (annOptions.enabled) {
                    var announcer = this,
                        now = +new Date(),
                        dTime = now - this.lastAnnouncementTime,
                        time = Math.max(0,
                        annOptions.minAnnounceInterval - dTime), 
                        // Add series from previously queued announcement.
                        allSeries = getUniqueSeries(this.queuedAnnouncement && this.queuedAnnouncement.series,
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
                        announcer.queuedAnnouncementTimer = setTimeout(function () {
                            if (announcer && announcer.announceRegion) {
                                announcer.lastAnnouncementTime = +new Date();
                                announcer.liveRegionSpeak(announcer.queuedAnnouncement.message);
                                delete announcer.queuedAnnouncement;
                                delete announcer.queuedAnnouncementTimer;
                            }
                        }, time);
                    }
                }
            },
            /**
             * Speak a message using the announcer live region.
             * @private
             * @param {string} message
             */
            liveRegionSpeak: function (message) {
                var announcer = this;
                this.announceRegion.innerHTML = message;
                // Delete contents after a little while to avoid user finding the live
                // region in the DOM.
                if (this.clearAnnouncementContainerTimer) {
                    clearTimeout(this.clearAnnouncementContainerTimer);
                }
                this.clearAnnouncementContainerTimer = setTimeout(function () {
                    announcer.announceRegion.innerHTML = '';
                    delete announcer.clearAnnouncementContainerTimer;
                }, 1000);
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
    _registerModule(_modules, 'modules/accessibility/components/SeriesComponent/forcedMarkers.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         *
         *  (c) 2009-2019 Øystein Moseng
         *
         *  Handle forcing series markers.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var merge = H.merge;
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
        function isWithinNavigationThreshold(series) {
            var navOptions = series.chart.options.accessibility
                    .keyboardNavigation.seriesNavigation;
            return series.points.length <
                navOptions.pointNavigationEnabledThreshold ||
                navOptions.pointNavigationEnabledThreshold === false;
        }
        /**
         * @private
         */
        function shouldForceMarkers(series) {
            var chartA11yEnabled = series.chart.options.accessibility.enabled,
                seriesA11yEnabled = (series.options.accessibility &&
                    series.options.accessibility.enabled) !== false,
                withinDescriptionThreshold = isWithinDescriptionThreshold(series),
                withinNavigationThreshold = isWithinNavigationThreshold(series);
            return chartA11yEnabled && seriesA11yEnabled &&
                (withinDescriptionThreshold || withinNavigationThreshold);
        }
        /**
         * @private
         */
        function unforceMarkerOptions(series) {
            var resetMarkerOptions = series.resetA11yMarkerOptions;
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
        function forceDisplayPointMarker(pointOptions) {
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
        function handleForcePointMarkers(points) {
            var i = points.length;
            while (i--) {
                var pointOptions = points[i].options;
                if (pointOptions.marker) {
                    if (pointOptions.marker.enabled) {
                        forceDisplayPointMarker(pointOptions);
                    }
                    else {
                        forceZeroOpacityMarkerOptions(pointOptions);
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
            H.addEvent(H.Series, 'render', function () {
                var series = this,
                    options = series.options;
                if (shouldForceMarkers(series)) {
                    if (options.marker && options.marker.enabled === false) {
                        series.a11yMarkersForced = true;
                        forceZeroOpacityMarkerOptions(series.options);
                    }
                    if (series._hasPointMarkers && series.points && series.points.length) {
                        handleForcePointMarkers(series.points);
                    }
                }
                else if (series.a11yMarkersForced && series.resetMarkerOptions) {
                    delete series.a11yMarkersForced;
                    unforceMarkerOptions(series);
                }
            });
            /**
             * Keep track of options to reset markers to if no longer forced.
             * @private
             */
            H.addEvent(H.Series, 'afterSetOptions', function (e) {
                this.resetA11yMarkerOptions = merge(e.options.marker || {}, this.userOptions.marker || {});
            });
        }

        return addForceMarkersEvents;
    });
    _registerModule(_modules, 'modules/accessibility/components/SeriesComponent/SeriesComponent.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js'], _modules['modules/accessibility/AccessibilityComponent.js'], _modules['modules/accessibility/components/SeriesComponent/SeriesKeyboardNavigation.js'], _modules['modules/accessibility/components/SeriesComponent/NewDataAnnouncer.js'], _modules['modules/accessibility/components/SeriesComponent/forcedMarkers.js'], _modules['modules/accessibility/utils/chartUtilities.js'], _modules['modules/accessibility/components/SeriesComponent/SeriesDescriber.js']], function (H, U, AccessibilityComponent, SeriesKeyboardNavigation, NewDataAnnouncer, addForceMarkersEvents, ChartUtilities, SeriesDescriber) {
        /* *
         *
         *  (c) 2009-2019 Øystein Moseng
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
                this.addEvent(H.Tooltip, 'refresh', function () {
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
    _registerModule(_modules, 'modules/accessibility/components/ZoomComponent.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js'], _modules['modules/accessibility/AccessibilityComponent.js'], _modules['modules/accessibility/KeyboardNavigationHandler.js'], _modules['modules/accessibility/utils/chartUtilities.js'], _modules['modules/accessibility/utils/htmlUtilities.js']], function (H, U, AccessibilityComponent, KeyboardNavigationHandler, ChartUtilities, HTMLUtilities) {
        /* *
         *
         *  (c) 2009-2019 Øystein Moseng
         *
         *  Accessibility component for chart zoom.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var extend = U.extend,
            pick = U.pick;
        var unhideChartElementFromAT = ChartUtilities.unhideChartElementFromAT;
        var setElAttrs = HTMLUtilities.setElAttrs,
            removeElement = HTMLUtilities.removeElement;
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
        var ZoomComponent = function () { };
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
    _registerModule(_modules, 'modules/accessibility/components/RangeSelectorComponent.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js'], _modules['modules/accessibility/AccessibilityComponent.js'], _modules['modules/accessibility/KeyboardNavigationHandler.js'], _modules['modules/accessibility/utils/chartUtilities.js'], _modules['modules/accessibility/utils/htmlUtilities.js']], function (H, U, AccessibilityComponent, KeyboardNavigationHandler, ChartUtilities, HTMLUtilities) {
        /* *
         *
         *  (c) 2009-2019 Øystein Moseng
         *
         *  Accessibility component for the range selector.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var extend = U.extend;
        var unhideChartElementFromAT = ChartUtilities.unhideChartElementFromAT;
        var setElAttrs = HTMLUtilities.setElAttrs;
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /**
         * @private
         */
        function shouldRunInputNavigation(chart) {
            var inputVisible = (chart.rangeSelector &&
                    chart.rangeSelector.inputGroup &&
                    chart.rangeSelector.inputGroup.element
                        .getAttribute('visibility') !== 'hidden');
            return (inputVisible &&
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
        H.Chart.prototype.highlightRangeSelectorButton = function (ix) {
            var buttons = this.rangeSelector.buttons,
                curSelectedIx = this.highlightedRangeSelectorItemIx;
            // Deselect old
            if (typeof curSelectedIx !== 'undefined' && buttons[curSelectedIx]) {
                buttons[curSelectedIx].setState(this.oldRangeSelectorItemState || 0);
            }
            // Select new
            this.highlightedRangeSelectorItemIx = ix;
            if (buttons[ix]) {
                this.setFocusToElement(buttons[ix].box, buttons[ix].element);
                this.oldRangeSelectorItemState = buttons[ix].state;
                buttons[ix].setState(2);
                return true;
            }
            return false;
        };
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
             * Called on first render/updates to the chart, including options changes.
             */
            onChartUpdate: function () {
                var chart = this.chart,
                    component = this,
                    rangeSelector = chart.rangeSelector;
                if (!rangeSelector) {
                    return;
                }
                if (rangeSelector.buttons && rangeSelector.buttons.length) {
                    rangeSelector.buttons.forEach(function (button) {
                        unhideChartElementFromAT(chart, button.element);
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
             * @private
             * @param {Highcharts.SVGElement} button
             */
            setRangeButtonAttrs: function (button) {
                var chart = this.chart,
                    label = chart.langFormat('accessibility.rangeSelector.buttonText', {
                        chart: chart,
                        buttonText: button.text && button.text.textStr
                    });
                setElAttrs(button.element, {
                    tabindex: -1,
                    role: 'button',
                    'aria-label': label
                });
            },
            /**
             * @private
             */
            setRangeInputAttrs: function (input, langKey) {
                var chart = this.chart;
                setElAttrs(input, {
                    tabindex: -1,
                    role: 'textbox',
                    'aria-label': chart.langFormat(langKey, { chart: chart })
                });
            },
            /**
             * Get navigation for the range selector buttons.
             * @private
             * @return {Highcharts.KeyboardNavigationHandler} The module object.
             */
            getRangeSelectorButtonNavigation: function () {
                var chart = this.chart,
                    keys = this.keyCodes,
                    component = this;
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
                        var hasRangeSelector = chart.rangeSelector &&
                                chart.rangeSelector.buttons &&
                                chart.rangeSelector.buttons.length;
                        return hasRangeSelector;
                    },
                    init: function (direction) {
                        var lastButtonIx = (chart.rangeSelector.buttons.length - 1);
                        chart.highlightRangeSelectorButton(direction > 0 ? 0 : lastButtonIx);
                    }
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
             * Get navigation for the range selector input boxes.
             * @private
             * @return {Highcharts.KeyboardNavigationHandler}
             *         The module object.
             */
            getRangeSelectorInputNavigation: function () {
                var chart = this.chart,
                    keys = this.keyCodes,
                    component = this;
                return new KeyboardNavigationHandler(chart, {
                    keyCodeMap: [
                        [
                            [
                                keys.tab, keys.up, keys.down
                            ], function (keyCode, e) {
                                var direction = (keyCode === keys.tab && e.shiftKey ||
                                        keyCode === keys.up) ? -1 : 1;
                                return component.onInputKbdMove(this, direction);
                            }
                        ]
                    ],
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
             * @private
             * @param {Highcharts.KeyboardNavigationHandler} keyboardNavigationHandler
             * @param {number} direction
             * @return {number} Response code
             */
            onInputKbdMove: function (keyboardNavigationHandler, direction) {
                var chart = this.chart,
                    response = keyboardNavigationHandler.response,
                    newIx = chart.highlightedInputRangeIx =
                        chart.highlightedInputRangeIx + direction,
                    newIxOutOfRange = newIx > 1 || newIx < 0;
                if (newIxOutOfRange) {
                    return response[direction > 0 ? 'next' : 'prev'];
                }
                chart.rangeSelector[newIx ? 'maxInput' : 'minInput'].focus();
                return response.success;
            },
            /**
             * @private
             * @param {number} direction
             */
            onInputNavInit: function (direction) {
                var chart = this.chart,
                    buttonIxToHighlight = direction > 0 ? 0 : 1;
                chart.highlightedInputRangeIx = buttonIxToHighlight;
                chart.rangeSelector[buttonIxToHighlight ? 'maxInput' : 'minInput'].focus();
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
            }
        });

        return RangeSelectorComponent;
    });
    _registerModule(_modules, 'modules/accessibility/components/InfoRegionsComponent.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js'], _modules['modules/accessibility/AccessibilityComponent.js'], _modules['modules/accessibility/utils/chartUtilities.js'], _modules['modules/accessibility/utils/htmlUtilities.js']], function (H, U, AccessibilityComponent, ChartUtilities, HTMLUtilities) {
        /* *
         *
         *  (c) 2009-2019 Øystein Moseng
         *
         *  Accessibility component for chart info region and table.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var doc = H.win.document,
            format = H.format;
        var extend = U.extend,
            pick = U.pick;
        var unhideChartElementFromAT = ChartUtilities.unhideChartElementFromAT,
            getChartTitle = ChartUtilities.getChartTitle,
            getAxisDescription = ChartUtilities.getAxisDescription;
        var addClass = HTMLUtilities.addClass,
            setElAttrs = HTMLUtilities.setElAttrs,
            escapeStringForHTML = HTMLUtilities.escapeStringForHTML,
            stripHTMLTagsFromString = HTMLUtilities.stripHTMLTagsFromString,
            getElement = HTMLUtilities.getElement,
            visuallyHideElement = HTMLUtilities.visuallyHideElement;
        /* eslint-disable no-invalid-this, valid-jsdoc */
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
         * @private
         */
        function stripEmptyHTMLTags(str) {
            return str.replace(/<(\w+)[^>]*?>\s*<\/\1>/g, '');
        }
        /**
         * @private
         */
        function enableSimpleHTML(str) {
            return str
                .replace(/&lt;(h[1-7]|p|div)&gt;/g, '<$1>')
                .replace(/&lt;&#x2F;(h[1-7]|p|div|a|button)&gt;/g, '</$1>')
                .replace(/&lt;(div|a|button) id=&quot;([a-zA-Z\-0-9#]*?)&quot;&gt;/g, '<$1 id="$2">');
        }
        /**
         * @private
         */
        function stringToSimpleHTML(str) {
            return stripEmptyHTMLTags(enableSimpleHTML(escapeStringForHTML(str)));
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
        H.Chart.prototype.getTypeDescription = function (types) {
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
                var chart = this.chart,
                    component = this;
                this.initRegionsDefinitions();
                this.addEvent(chart, 'afterGetTable', function (e) {
                    component.onDataTableCreated(e);
                });
                this.addEvent(chart, 'afterViewData', function (tableDiv) {
                    component.dataTableDiv = tableDiv;
                    // Use small delay to give browsers & AT time to register new table
                    setTimeout(function () {
                        component.focusDataTable();
                    }, 300);
                });
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
                        }
                    }
                };
            },
            /**
             * Called on first render/updates to the chart, including options changes.
             */
            onChartUpdate: function () {
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
                hiddenDiv.innerHTML = content;
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
                var labelLangKey = ('accessibility.screenReaderSection.' + regionKey + 'RegionLabel'), chart = this.chart, labelText = chart.langFormat(labelLangKey, { chart: chart }), sectionId = 'highcharts-screen-reader-region-' + regionKey + '-' +
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
                    dataTableButtonId = 'hc-linkto-highcharts-data-table-' +
                        chart.index,
                    context = {
                        chartTitle: getChartTitle(chart),
                        typeDescription: this.getTypeDescriptionText(),
                        chartSubtitle: this.getSubtitleText(),
                        chartLongdesc: this.getLongdescText(),
                        xAxisDescription: axesDesc.xAxis,
                        yAxisDescription: axesDesc.yAxis,
                        viewTableButton: chart.getCSV ?
                            this.getDataTableButtonText(dataTableButtonId) : ''
                    },
                    formattedString = H.i18nFormat(format,
                    context,
                    chart);
                this.dataTableButtonId = dataTableButtonId;
                return stringToSimpleHTML(formattedString);
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
                return stringToSimpleHTML(formattedString);
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
                return '<a id="' + buttonId + '">' + buttonText + '</a>';
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
                    e.html = e.html.replace('<table ', '<table tabindex="0" summary="' + getTableSummary(chart) + '"');
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
             * Set attribs and handlers for default viewAsDataTable button if exists.
             * @private
             * @param {string} tableButtonId
             */
            initDataTableButton: function (tableButtonId) {
                var el = this.viewDataTableButton = getElement(tableButtonId), chart = this.chart, tableId = tableButtonId.replace('hc-linkto-', '');
                if (el) {
                    setElAttrs(el, {
                        role: 'button',
                        tabindex: '-1',
                        'aria-expanded': !!getElement(tableId),
                        href: '#' + tableId
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
                var component = this,
                    chart = this.chart,
                    axes = chart[collectionKey];
                return chart.langFormat('accessibility.axis.' + collectionKey + 'Description' + (axes.length > 1 ? 'Plural' : 'Singular'), {
                    chart: chart,
                    names: axes.map(function (axis) {
                        return getAxisDescription(axis);
                    }),
                    ranges: axes.map(function (axis) {
                        return component.getAxisRangeDescription(axis);
                    }),
                    numAxes: axes.length
                });
            },
            /**
             * Return string with text description of the axis range.
             * @private
             * @param {Highcharts.Axis} axis The axis to get range desc of.
             * @return {string} A string with the range description for the axis.
             */
            getAxisRangeDescription: function (axis) {
                var axisOptions = axis.options || {};
                // Handle overridden range description
                if (axisOptions.accessibility &&
                    typeof axisOptions.accessibility.rangeDescription !== 'undefined') {
                    return axisOptions.accessibility.rangeDescription;
                }
                // Handle category axes
                if (axis.categories) {
                    return this.getCategoryAxisRangeDesc(axis);
                }
                // Use time range, not from-to?
                if (axis.isDatetimeAxis && (axis.min === 0 || axis.dataMin === 0)) {
                    return this.getAxisTimeLengthDesc(axis);
                }
                // Just use from and to.
                // We have the range and the unit to use, find the desc format
                return this.getAxisFromToDescription(axis);
            },
            /**
             * @private
             * @param {Highcharts.Axis} axis
             * @return {string}
             */
            getCategoryAxisRangeDesc: function (axis) {
                var chart = this.chart;
                if (axis.dataMax && axis.dataMin) {
                    return chart.langFormat('accessibility.axis.rangeCategories', {
                        chart: chart,
                        axis: axis,
                        numCategories: axis.dataMax - axis.dataMin + 1
                    });
                }
                return '';
            },
            /**
             * @private
             * @param {Highcharts.Axis} axis
             * @return {string}
             */
            getAxisTimeLengthDesc: function (axis) {
                var chart = this.chart,
                    range = {},
                    rangeUnit = 'Seconds';
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
            },
            /**
             * @private
             * @param {Highcharts.Axis} axis
             * @return {string}
             */
            getAxisFromToDescription: function (axis) {
                var chart = this.chart,
                    dateRangeFormat = chart.options.accessibility
                        .screenReaderSection.axisRangeDateFormat,
                    format = function (axisKey) {
                        return axis.isDatetimeAxis ? chart.time.dateFormat(dateRangeFormat,
                    axis[axisKey]) : axis[axisKey];
                };
                return chart.langFormat('accessibility.axis.rangeFromTo', {
                    chart: chart,
                    axis: axis,
                    rangeFrom: format('min'),
                    rangeTo: format('max')
                });
            }
        });

        return InfoRegionsComponent;
    });
    _registerModule(_modules, 'modules/accessibility/components/ContainerComponent.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js'], _modules['modules/accessibility/utils/htmlUtilities.js'], _modules['modules/accessibility/utils/chartUtilities.js'], _modules['modules/accessibility/AccessibilityComponent.js']], function (H, U, HTMLUtilities, ChartUtilities, AccessibilityComponent) {
        /* *
         *
         *  (c) 2009-2019 Øystein Moseng
         *
         *  Accessibility component for chart container.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var doc = H.win.document;
        var extend = U.extend;
        var stripHTMLTags = HTMLUtilities.stripHTMLTagsFromString;
        var unhideChartElementFromAT = ChartUtilities.unhideChartElementFromAT,
            getChartTitle = ChartUtilities.getChartTitle;
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
                    svgContainerLabel = stripHTMLTags(chart.langFormat('accessibility.svgContainerLabel', {
                        chartTitle: getChartTitle(chart)
                    }));
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
                        credits.element.setAttribute('aria-label', stripHTMLTags(chart.langFormat('accessibility.credits', { creditsStr: credits.textStr })));
                    }
                    unhideChartElementFromAT(chart, credits.element);
                }
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
    _registerModule(_modules, 'modules/accessibility/high-contrast-mode.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         *
         *  (c) 2009-2019 Øystein Moseng
         *
         *  Handling for Windows High Contrast Mode.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var isMS = H.isMS,
            win = H.win,
            doc = win.document;
        var whcm = {
                /**
                 * Detect WHCM in the browser.
                 *
                 * @function Highcharts#isHighContrastModeActive
                 * @private
                 * @return {boolean} Returns true if the browser is in High Contrast mode.
                 */
                isHighContrastModeActive: function () {
                    if (win.matchMedia &&
                        isMS &&
                        /Edge\/\d./i.test(win.navigator.userAgent)) {
                        // Use media query for Edge
                        return win.matchMedia('(-ms-high-contrast: active)').matches;
                }
                if (isMS && win.getComputedStyle) {
                    // Test BG image for IE
                    var testDiv = doc.createElement('div');
                    testDiv.style.backgroundImage = 'url(#)';
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
    _registerModule(_modules, 'modules/accessibility/high-contrast-theme.js', [], function () {
        /* *
         *
         *  (c) 2009-2019 Øystein Moseng
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
    _registerModule(_modules, 'modules/accessibility/options/options.js', [], function () {
        /* *
         *
         *  (c) 2009-2019 Øystein Moseng
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
        var options = {
                /**
                 * Options for configuring accessibility for the chart. Requires the
                 * [accessibility module](https://code.highcharts.com/modules/accessibility.js)
                 * to be loaded. For a description of the module and information
                 * on its features, see
                 * [Highcharts Accessibility](http://www.highcharts.com/docs/chart-concepts/accessibility).
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
                         * Supported HTML tags are `<h1-7>`, `<p>`, `<div>`, `<a>`, and
                         * `<button>`. Attributes are not supported, except for id on
                         * `<div>`, `<a>`, and `<button>`. Id is required on `<a>` and
                         * `<button>` in the format `<tag id="abcd">`. Numbers, lower- and
                         * uppercase letters, "-" and "#" are valid characters in IDs.
                         *
                         * @since 8.0.0
                         */
                        beforeChartFormat: '<h5>{chartTitle}</h5>' +
                            '<div>{typeDescription}</div>' +
                            '<div>{chartSubtitle}</div>' +
                            '<div>{chartLongdesc}</div>' +
                            '<div>{xAxisDescription}</div>' +
                            '<div>{yAxisDescription}</div>' +
                            '<div>{viewTableButton}</div>',
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
                         * [dateFormat](/class-reference/Highcharts#dateFormat).
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
                     * Options for descriptions of individual data points.
                     *
                     * @since 8.0.0
                     * @apioption accessibility.point
                     */
                    /**
                     * Date format to use for points on datetime axes when describing them
                     * to screen reader users.
                     *
                     * Defaults to the same format as in tooltip.
                     *
                     * For an overview of the replacement codes, see
                     * [dateFormat](/class-reference/Highcharts#dateFormat).
                     *
                     * @see [dateFormatter](#accessibility.point.dateFormatter)
                     *
                     * @type      {string}
                     * @since 8.0.0
                     * @apioption accessibility.point.dateFormat
                     */
                    /**
                     * Formatter function to determine the date/time format used with
                     * points on datetime axes when describing them to screen reader users.
                     * Receives one argument, `point`, referring to the point to describe.
                     * Should return a date format string compatible with
                     * [dateFormat](/class-reference/Highcharts#dateFormat).
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
                     * Receives one argument, `point`, referring to the point to describe.
                     * Should return a string with the description of the point for a screen
                     * reader user. If `false` is returned, the default formatter will be
                     * used for that point.
                     *
                     * @see [point.accessibility.description](#series.line.data.accessibility.description)
                     *
                     * @type      {Highcharts.ScreenReaderFormatterCallbackFunction<Highcharts.Point>}
                     * @since 8.0.0
                     * @apioption accessibility.point.descriptionFormatter
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
                                color: '#335cad',
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
                         * `rangeSelector`, `chartMenu`, `legend`. In addition, any custom
                         * components can be added here.
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
                legend: {
                    /**
                     * Accessibility options for the legend. Requires the Accessibility
                     * module.
                     *
                     * @since     7.1.0
                     * @requires  modules/accessibility
                     * @apioption legend.accessibility
                     */
                    accessibility: {
                        /**
                         * Enable accessibility support for the legend.
                         *
                         * @since     7.1.0
                         * @apioption legend.accessibility.enabled
                         */
                        enabled: true,
                        /**
                         * Options for keyboard navigation for the legend.
                         *
                         * @since     7.1.0
                         * @requires  modules/accessibility
                         * @apioption legend.accessibility.keyboardNavigation
                         */
                        keyboardNavigation: {
                            /**
                             * Enable keyboard navigation for the legend.
                             *
                             * @see [accessibility.keyboardNavigation](#accessibility.keyboardNavigation.enabled)
                             *
                             * @since     7.1.0
                             * @apioption legend.accessibility.keyboardNavigation.enabled
                             */
                            enabled: true
                        }
                    }
                },
                exporting: {
                    /**
                     * Accessibility options for the exporting menu. Requires the
                     * Accessibility module.
                     *
                     * @since     7.1.0
                     * @requires  modules/accessibility
                     * @apioption exporting.accessibility
                     */
                    accessibility: {
                        /**
                         * Enable accessibility support for the export menu.
                         *
                         * @since     7.1.0
                         * @apioption exporting.accessibility.enabled
                         */
                        enabled: true
                    }
                }
            };

        return options;
    });
    _registerModule(_modules, 'modules/accessibility/options/langOptions.js', [], function () {
        /* *
         *
         *  (c) 2009-2019 Øystein Moseng
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
                 * [accessibility.pointDescriptionFormatter](#accessibility.pointDescriptionFormatter),
                 * [accessibility.seriesDescriptionFormatter](#accessibility.seriesDescriptionFormatter),
                 * and
                 * [accessibility.screenReaderSectionFormatter](#accessibility.screenReaderSectionFormatter).
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
                        beforeRegionLabel: 'Chart screen reader information.',
                        afterRegionLabel: '',
                        /**
                         * Label for the end of the chart. Announced by screen readers.
                         *
                         * @since 8.0.0
                         */
                        endOfChartMarker: 'End of interactive chart.'
                    },
                    /**
                     * Language options for accessibility of the legend.
                     *
                     * @since 8.0.0
                     */
                    legend: {
                        legendLabel: 'Toggle series visibility',
                        legendItem: 'Toggle visibility of {itemName}'
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
                        minInputLabel: 'Select start date.',
                        maxInputLabel: 'Select end date.',
                        buttonText: 'Select range {buttonText}'
                    },
                    /**
                     * Accessibility language options for the data table.
                     *
                     * @since 8.0.0
                     */
                    table: {
                        viewAsDataTableButtonText: 'View as data table. {chartTitle}',
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
                        exportRegionLabel: 'Chart menu'
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
                         * User supplied description text. This is added after the main
                         * summary if present.
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
                        nullPointValue: 'No value'
                    }
                }
            };

        return langOptions;
    });
    _registerModule(_modules, 'modules/accessibility/options/deprecatedOptions.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js']], function (H, U) {
        /* *
         *
         *  (c) 2009-2019 Øystein Moseng
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
        var error = H.error;
        var pick = U.pick;
        /* eslint-disable valid-jsdoc */
        /**
         * Warn user that a deprecated option was used.
         * @private
         * @param {Highcharts.Chart} chart
         * @param {string} oldOption
         * @param {string} newOption
         * @return {void}
         */
        function warn(chart, oldOption, newOption) {
            error('Highcharts: Deprecated option ' + oldOption +
                ' used. This will be removed from future versions of Highcharts. Use ' +
                newOption + ' instead.', false, chart);
        }
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
                var val = rootOld[oldOptionKey];
                if (typeof val !== 'undefined') {
                    traverseSetOption(rootNew, mapToNewOptions[oldOptionKey], val);
                    warn(chart, rootOldAsArray.join('.') + '.' + oldOptionKey, rootNewAsArray.join('.') + '.' +
                        mapToNewOptions[oldOptionKey].join('.'));
                }
            });
        }
        /**
         * @private
         */
        function copyDeprecatedChartOptions(chart) {
            var chartOptions = chart.options.chart || {},
                a11yOptions = chart.options.accessibility || {};
            ['description', 'typeDescription'].forEach(function (prop) {
                if (chartOptions[prop]) {
                    a11yOptions[prop] = chartOptions[prop];
                    warn(chart, 'chart.' + prop, 'accessibility.' + prop);
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
                    warn(chart, 'axis.description', 'axis.accessibility.description');
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
                    var optionVal = series.options[oldOption];
                    if (typeof optionVal !== 'undefined') {
                        // Set the new option
                        traverseSetOption(series.options, oldToNewSeriesOptions[oldOption], 
                        // Note that skipKeyboardNavigation has inverted option
                        // value, since we set enabled rather than disabled
                        oldOption === 'skipKeyboardNavigation' ?
                            !optionVal : optionVal);
                        warn(chart, 'series.' + oldOption, 'series.' +
                            oldToNewSeriesOptions[oldOption].join('.'));
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
    _registerModule(_modules, 'modules/accessibility/a11y-i18n.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js']], function (H, U) {
        /* *
         *
         *  Accessibility module - internationalization support
         *
         *  (c) 2010-2019 Highsoft AS
         *  Author: Øystein Moseng
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
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
                var eachEnd = statement.slice(eachStart).indexOf(')') + eachStart, preEach = statement.substring(0, eachStart), postEach = statement.substring(eachEnd + 1), eachStatement = statement.substring(eachStart + 6, eachEnd), eachArguments = eachStatement.split(','), lenArg = Number(eachArguments[1]), len;
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
                    val;
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
            // Standard substitution, delegate to H.format or similar
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
         *        to H.format().
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
            // gets picked up by H.format below.
            tokens.forEach(function (token) {
                if (token.type === 'statement') {
                    token.value = formatExtendedStatement(token.value, context);
                }
            });
            // Join string back together and pass to H.format to pick up non-array
            // statements.
            return H.format(tokens.reduce(function (acc, cur) {
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
        H.Chart.prototype.langFormat = function (langKey, context) {
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
    _registerModule(_modules, 'modules/accessibility/focusBorder.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js']], function (H, U) {
        /* *
         *
         *  (c) 2009-2019 Øystein Moseng
         *
         *  Extend SVG and Chart classes with focus border capabilities.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var addEvent = H.addEvent;
        var extend = U.extend,
            pick = U.pick;
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /*
         * Add focus border functionality to SVGElements. Draws a new rect on top of
         * element around its bounding box. This is used by multiple components.
         */
        extend(H.SVGElement.prototype, {
            /**
             * @private
             * @function Highcharts.SVGElement#addFocusBorder
             *
             * @param {number} margin
             *
             * @param {Highcharts.CSSObject} style
             */
            addFocusBorder: function (margin, style) {
                // Allow updating by just adding new border
                if (this.focusBorder) {
                    this.removeFocusBorder();
                }
                // Add the border rect
                var bb = this.getBBox(),
                    pad = pick(margin, 3);
                bb.x += this.translateX ? this.translateX : 0;
                bb.y += this.translateY ? this.translateY : 0;
                this.focusBorder = this.renderer.rect(bb.x - pad, bb.y - pad, bb.width + 2 * pad, bb.height + 2 * pad, parseInt((style && style.borderRadius || 0).toString(), 10))
                    .addClass('highcharts-focus-border')
                    .attr({
                    zIndex: 99
                })
                    .add(this.parentGroup);
                if (!this.renderer.styledMode) {
                    this.focusBorder.attr({
                        stroke: style && style.stroke,
                        'stroke-width': style && style.strokeWidth
                    });
                }
            },
            /**
             * @private
             * @function Highcharts.SVGElement#removeFocusBorder
             */
            removeFocusBorder: function () {
                if (this.focusBorder) {
                    this.focusBorder.destroy();
                    delete this.focusBorder;
                }
            }
        });
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
        H.Chart.prototype.setFocusToElement = function (svgElement, focusElement) {
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
            if (focusBorderOptions.enabled) {
                // Remove old focus border
                if (this.focusElement) {
                    this.focusElement.removeFocusBorder();
                }
                // Draw focus border (since some browsers don't do it automatically)
                svgElement.addFocusBorder(focusBorderOptions.margin, {
                    stroke: focusBorderOptions.style.color,
                    strokeWidth: focusBorderOptions.style.lineWidth,
                    borderRadius: focusBorderOptions.style.borderRadius
                });
                this.focusElement = svgElement;
            }
        };

    });
    _registerModule(_modules, 'modules/accessibility/accessibility.js', [_modules['modules/accessibility/utils/chartUtilities.js'], _modules['parts/Globals.js'], _modules['modules/accessibility/KeyboardNavigationHandler.js'], _modules['parts/Utilities.js'], _modules['modules/accessibility/AccessibilityComponent.js'], _modules['modules/accessibility/KeyboardNavigation.js'], _modules['modules/accessibility/components/LegendComponent.js'], _modules['modules/accessibility/components/MenuComponent.js'], _modules['modules/accessibility/components/SeriesComponent/SeriesComponent.js'], _modules['modules/accessibility/components/ZoomComponent.js'], _modules['modules/accessibility/components/RangeSelectorComponent.js'], _modules['modules/accessibility/components/InfoRegionsComponent.js'], _modules['modules/accessibility/components/ContainerComponent.js'], _modules['modules/accessibility/high-contrast-mode.js'], _modules['modules/accessibility/high-contrast-theme.js'], _modules['modules/accessibility/options/options.js'], _modules['modules/accessibility/options/langOptions.js'], _modules['modules/accessibility/options/deprecatedOptions.js']], function (ChartUtilities, H, KeyboardNavigationHandler, U, AccessibilityComponent, KeyboardNavigation, LegendComponent, MenuComponent, SeriesComponent, ZoomComponent, RangeSelectorComponent, InfoRegionsComponent, ContainerComponent, whcm, highContrastTheme, defaultOptions, defaultLangOptions, copyDeprecatedOptions) {
        /* *
         *
         *  (c) 2009-2019 Øystein Moseng
         *
         *  Accessibility module for Highcharts
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var extend = U.extend;
        var addEvent = H.addEvent,
            doc = H.win.document,
            merge = H.merge,
            fireEvent = H.fireEvent;
        // Add default options
        merge(true, H.defaultOptions, defaultOptions, {
            accessibility: {
                highContrastTheme: highContrastTheme
            },
            lang: defaultLangOptions
        });
        // Expose functionality on Highcharts namespace
        H.A11yChartUtilities = ChartUtilities;
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
                // Refactor to use Object.values if we polyfill
                Object.keys(components).forEach(function (componentName) {
                    components[componentName].initBase(chart);
                    components[componentName].init();
                });
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
                Object.keys(components).forEach(function (componentName) {
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
                fireEvent(chart, 'afterA11yUpdate');
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
        H.Chart.prototype.updateA11yEnabled = function () {
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
        addEvent(H.Chart, 'render', function (e) {
            // Update/destroy
            if (this.a11yDirty && this.renderTo) {
                delete this.a11yDirty;
                this.updateA11yEnabled();
            }
            var a11y = this.accessibility;
            if (a11y) {
                Object.keys(a11y.components).forEach(function (componentName) {
                    a11y.components[componentName].onChartRender();
                });
            }
        });
        // Update with chart/series/point updates
        addEvent(H.Chart, 'update', function (e) {
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
        addEvent(H.Point, 'update', function () {
            if (this.series.chart.accessibility) {
                this.series.chart.a11yDirty = true;
            }
        });
        ['addSeries', 'init'].forEach(function (event) {
            addEvent(H.Chart, event, function () {
                this.a11yDirty = true;
            });
        });
        ['update', 'updatedData', 'remove'].forEach(function (event) {
            addEvent(H.Series, event, function () {
                if (this.chart.accessibility) {
                    this.chart.a11yDirty = true;
                }
            });
        });
        // Direct updates (events happen after render)
        [
            'afterDrilldown', 'drillupall'
        ].forEach(function (event) {
            addEvent(H.Chart, event, function () {
                if (this.accessibility) {
                    this.accessibility.update();
                }
            });
        });
        // Destroy with chart
        addEvent(H.Chart, 'destroy', function () {
            if (this.accessibility) {
                this.accessibility.destroy();
            }
        });

    });
    _registerModule(_modules, 'masters/modules/accessibility.src.js', [], function () {



    });
}));