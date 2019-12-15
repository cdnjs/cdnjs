/**
 * @license Highcharts JS v7.1.3 (2019-08-14)
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
    _registerModule(_modules, 'modules/accessibility/KeyboardNavigationHandler.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         *
         *  (c) 2009-2019 Øystein Moseng
         *
         *  Keyboard navigation handler base class definition
         *
         *  License: www.highcharts.com/license
         *
         * */


        var find = H.find;


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
         * @param {Highcharts.Chart} chart The chart this module should act on.
         * @param {object} options
         * @param {Array<Array<Number>, Function>} options.keyCodeMap
         *      An array containing pairs of an array of keycodes, mapped to a handler
         *      function. When the keycode is received, the handler is called with the
         *      keycode as parameter.
         * @param {Function} [options.init]
         *      Function to run on initialization of module
         * @param {Function} [options.validate]
         *      Function to run to validate module. Should return false if module should
         *      not run, true otherwise. Receives chart as parameter.
         * @param {Function} [options.terminate]
         *      Function to run before moving to next/prev module. Receives moving
         *      direction as parameter: +1 for next, -1 for previous.
         * @param {Function} [options.init]
         *      Function to run on initialization of module
         */
        function KeyboardNavigationHandler(chart, options) {
            this.chart = chart;
            this.keyCodeMap = options.keyCodeMap || [];
            this.validate = options.validate;
            this.init = options.init;
            this.terminate = options.terminate;
            // Response enum
            this.response = {
                success: 1, // Keycode was handled
                prev: 2, // Move to prev module
                next: 3, // Move to next module
                noHandler: 4, // There is no handler for this keycode
                fail: 5 // Handler failed
            };
        }
        KeyboardNavigationHandler.prototype = {

            /**
             * Find handler function(s) for key code in the keyCodeMap and run it.
             *
             * @function KeyboardNavigationHandler#run
             * @param {global.Event} e
             * @return {number} Returns a response code indicating whether the run was
             *      a success/fail/unhandled, or if we should move to next/prev module.
             */
            run: function (e) {
                var keyCode = e.which || e.keyCode,
                    response = this.response.noHandler,
                    handlerCodeSet = find(this.keyCodeMap, function (codeSet) {
                        return codeSet[0].indexOf(keyCode) > -1;
                    });

                if (handlerCodeSet) {
                    response = handlerCodeSet[1].call(this, keyCode, e);
                } else if (keyCode === 9) {
                    // Default tab handler, move to next/prev module
                    response = this.response[e.shiftKey ? 'prev' : 'next'];
                } else if (keyCode === 27) {
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
    _registerModule(_modules, 'modules/accessibility/AccessibilityComponent.js', [_modules['parts/Globals.js']], function (Highcharts) {
        /* *
         *
         *  (c) 2009-2019 Øystein Moseng
         *
         *  Accessibility component class definition
         *
         *  License: www.highcharts.com/license
         *
         * */


        var win = Highcharts.win,
            doc = win.document,
            merge = Highcharts.merge,
            addEvent = Highcharts.addEvent;


        /**
         * The AccessibilityComponent base class, representing a part of the chart that
         * has accessibility logic connected to it. This class can be inherited from to
         * create a custom accessibility component for a chart.
         *
         * A component:
         *  - Must call initBase after inheriting.
         *  - Can override any of the following functions: init(), destroy(),
         *      getKeyboardNavigation(), onChartUpdate().
         *  - Should take care to destroy added elements and unregister event handlers
         *      on destroy.
         *
         * @sample highcharts/accessibility/custom-component
         *         Custom accessibility component
         *
         * @requires module:modules/accessibility
         * @class
         * @name Highcharts.AccessibilityComponent
         */
        function AccessibilityComponent() {}
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
                this.eventRemovers = [];
                this.domElements = [];
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
                // CSS Styles for hiding elements visually but keeping them visible to
                // AT.
                this.hiddenStyle = {
                    position: 'absolute',
                    width: '1px',
                    height: '1px',
                    overflow: 'hidden'
                };
            },


            /**
             * Add an event to an element and keep track of it for destroy().
             * Same args as Highcharts.addEvent
             * @private
             */
            addEvent: function () {
                var remover = Highcharts.addEvent.apply(Highcharts, arguments);
                this.eventRemovers.push(remover);
                return remover;
            },


            /**
             * Create an element and keep track of it for destroy().
             * Same args as document.createElement
             * @private
             */
            createElement: function () {
                var el = Highcharts.win.document.createElement.apply(
                    Highcharts.win.document, arguments
                );
                this.domElements.push(el);
                return el;
            },


            /**
             * Utility function to clone a mouse event for re-dispatching.
             * @private
             * @param {global.Event} e The event to clone.
             * @return {global.Event} The cloned event
             */
            cloneMouseEvent: function (e) {
                if (typeof win.MouseEvent === 'function') {
                    return new win.MouseEvent(e.type, e);
                }
                // No MouseEvent support, try using initMouseEvent
                if (doc.createEvent) {
                    var evt = doc.createEvent('MouseEvent');
                    if (evt.initMouseEvent) {
                        evt.initMouseEvent(
                            e.type,
                            e.type === 'click' || e.canBubble, // #10561
                            e.cancelable,
                            e.view,
                            e.detail,
                            e.screenX,
                            e.screenY,
                            e.clientX,
                            e.clientY,
                            e.ctrlKey,
                            e.altKey,
                            e.shiftKey,
                            e.metaKey,
                            e.button,
                            e.relatedTarget
                        );
                        return evt;
                    }

                    // Fallback to basic Event
                    evt = doc.createEvent('Event');
                    if (evt.initEvent) {
                        evt.initEvent(e.type, true, true);
                        return evt;
                    }
                }
            },


            /**
             * Utility function to attempt to fake a click event on an element.
             * @private
             * @param {Highcharts.HTMLDOMElement|Highcharts.SVGDOMElement} element
             */
            fakeClickEvent: function (element) {
                if (element && element.onclick && doc.createEvent) {
                    var fakeEvent = doc.createEvent('Event');
                    fakeEvent.initEvent('click', true, false);
                    element.onclick(fakeEvent);
                }
            },


            /**
             * Create an invisible proxy HTML button in the same position as an SVG
             * element
             * @private
             * @param {Highcharts.SVGElement} svgElement The wrapped svg el to proxy.
             * @param {Highcharts.HTMLElement} parentGroup The proxy group element in
             *          the proxy container to add this button to.
             * @param {object} [attributes] Additional attributes to set.
             * @param {Highcharts.SVGElement} [posElement] Element to use for
             *          positioning instead of svgElement.
             * @param {Function} [preClickEvent] Function to call before click event
             *          fires.
             *
             * @return {Highcharts.HTMLElement} The proxy button.
             */
            createProxyButton: function (
                svgElement, parentGroup, attributes, posElement, preClickEvent
            ) {
                var svgEl = svgElement.element,
                    component = this,
                    proxy = this.createElement('button'),
                    attrs = merge({
                        'aria-label': svgEl.getAttribute('aria-label')
                    }, attributes),
                    positioningElement = posElement || svgElement,
                    bBox = this.getElementPosition(positioningElement);

                // If we don't support getBoundingClientRect, no button is made
                if (!bBox) {
                    return;
                }

                Object.keys(attrs).forEach(function (prop) {
                    if (attrs[prop] !== null) {
                        proxy.setAttribute(prop, attrs[prop]);
                    }
                });

                merge(true, proxy.style, {
                    'border-width': 0,
                    'background-color': 'transparent',
                    position: 'absolute',
                    width: (bBox.width || 1) + 'px',
                    height: (bBox.height || 1) + 'px',
                    display: 'block',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    outline: 'none',
                    opacity: 0.001,
                    filter: 'alpha(opacity=1)',
                    '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=1)',
                    zIndex: 999,
                    padding: 0,
                    margin: 0,
                    left: bBox.x + 'px',
                    top: bBox.y - this.chart.chartHeight + 'px'
                });

                // Handle pre-click
                if (preClickEvent) {
                    addEvent(proxy, 'click', preClickEvent);
                }

                // Proxy mouse events
                [
                    'click', 'mouseover', 'mouseenter', 'mouseleave', 'mouseout'
                ].forEach(function (evtType) {
                    addEvent(proxy, evtType, function (e) {
                        var clonedEvent = component.cloneMouseEvent(e);
                        if (svgEl) {
                            if (clonedEvent) {
                                if (svgEl.fireEvent) {
                                    svgEl.fireEvent(clonedEvent);
                                } else if (svgEl.dispatchEvent) {
                                    svgEl.dispatchEvent(clonedEvent);
                                }
                            } else if (svgEl['on' + evtType]) {
                                svgEl['on' + evtType](e);
                            }
                        }
                    });
                });

                // Add to chart div and unhide from screen readers
                parentGroup.appendChild(proxy);
                if (!attrs['aria-hidden']) {
                    this.unhideElementFromScreenReaders(proxy);
                }
                return proxy;
            },


            /**
             * Get the position relative to chart container for a wrapped SVG element.
             * @private
             * @param {Highcharts.SVGElement} element The element to calculate position
             *          for.
             *
             * @return {object} Object with x and y props for the position.
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
            },


            /**
             * Add a new proxy group to the proxy container. Creates the proxy container
             * if it does not exist.
             * @private
             * @param {object} attrs The attributes to set on the new group div.
             *
             * @return {Highcharts.HTMLDOMElement} The new proxy group element.
             */
            addProxyGroup: function (attrs) {
                var chart = this.chart,
                    proxyContainer = chart.a11yProxyContainer;

                // Add root proxy container if it does not exist
                if (!proxyContainer) {
                    chart.a11yProxyContainer = doc.createElement('div');
                    chart.a11yProxyContainer.style.position = 'relative';
                }
                // Add it if it is new, else make sure we move it to the end
                if (chart.container.nextSibling !== chart.a11yProxyContainer) {
                    chart.renderTo.insertBefore(
                        chart.a11yProxyContainer,
                        chart.container.nextSibling
                    );
                }

                // Create the group and add it
                var groupDiv = this.createElement('div');
                Object.keys(attrs || {}).forEach(function (prop) {
                    if (attrs[prop] !== null) {
                        groupDiv.setAttribute(prop, attrs[prop]);
                    }
                });
                chart.a11yProxyContainer.appendChild(groupDiv);
                return groupDiv;
            },


            /**
             * Utility function for removing an element from the DOM.
             * @private
             * @param {Highcharts.HTMLDOMElement} element The element to remove.
             */
            removeElement: function (element) {
                if (element && element.parentNode) {
                    element.parentNode.removeChild(element);
                }
            },


            /**
             * Unhide an element from screen readers. Also unhides parents, and hides
             * siblings that are not explicitly unhidden.
             * @private
             * @param {Highcharts.HTMLDOMElement|Highcharts.SVGDOMElement} element
             *      The element to unhide
             */
            unhideElementFromScreenReaders: function (element) {
                element.setAttribute('aria-hidden', false);
                if (element === this.chart.renderTo || !element.parentNode) {
                    return;
                }

                // Hide siblings unless their hidden state is already explicitly set
                Array.prototype.forEach.call(
                    element.parentNode.childNodes,
                    function (node) {
                        if (!node.hasAttribute('aria-hidden')) {
                            node.setAttribute('aria-hidden', true);
                        }
                    }
                );
                // Repeat for parent
                this.unhideElementFromScreenReaders(element.parentNode);
            },


            /**
             * Should remove any event handlers added, as well as any DOM elements.
             * @private
             */
            destroyBase: function () {
                // Destroy proxy container
                var chart = this.chart || {},
                    component = this;
                this.removeElement(chart.a11yProxyContainer);

                // Remove event callbacks and dom elements
                this.eventRemovers.forEach(function (remover) {
                    remover();
                });
                this.domElements.forEach(function (element) {
                    component.removeElement(element);
                });
                this.eventRemovers = [];
                this.domElements = [];
            },


            /**
             * Utility function to strip tags from a string. Used for aria-label
             * attributes, painting on a canvas will fail if the text contains tags.
             * @private
             * @param {string} s The string to strip tags from
             * @return {string} The new string.
             */
            stripTags: function (s) {
                return typeof s === 'string' ? s.replace(/<\/?[^>]+(>|$)/g, '') : s;
            },


            /**
             * HTML encode some characters vulnerable for XSS.
             * @private
             * @param {string} html The input string.
             * @return {string} The escaped string.
             */
            htmlencode: function (html) {
                return html
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;')
                    .replace(/'/g, '&#x27;')
                    .replace(/\//g, '&#x2F;');
            },


            // Functions to be overridden by derived classes

            /**
             * Initialize component.
             */
            init: function () {},

            /**
             * Get keyboard navigation handler for this component.
             * @return {Highcharts.KeyboardNavigationHandler}
             */
            getKeyboardNavigation: function () {},

            /**
             * Called on updates to the chart, including options changes.
             * Note that this is also called on first render of chart.
             */
            onChartUpdate: function () {},

            /**
             * Called on every chart render.
             */
            onChartRender: function () {},

            /**
             * Called when accessibility is disabled or chart is destroyed.
             * Should call destroyBase to make sure events/elements added are removed.
             */
            destroy: function () {
                this.destroyBase();
            }

        };


        return AccessibilityComponent;
    });
    _registerModule(_modules, 'modules/accessibility/KeyboardNavigation.js', [_modules['parts/Globals.js'], _modules['modules/accessibility/KeyboardNavigationHandler.js']], function (H, KeyboardNavigationHandler) {
        /* *
         *
         *  (c) 2009-2019 Øystein Moseng
         *
         *  Main keyboard navigation handling.
         *
         *  License: www.highcharts.com/license
         *
         * */


        var merge = H.merge,
            addEvent = H.addEvent,
            win = H.win,
            doc = win.document;


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
        function KeyboardNavigation(chart, components, order) {
            this.init(chart, components, order);
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
                var keyboardNavigation = this;
                this.chart = chart;
                this.components = components;
                this.modules = [];
                this.currentModuleIx = 0;

                // Make chart container reachable by tab
                if (!chart.container.hasAttribute('tabIndex')) {
                    chart.container.setAttribute('tabindex', '0');
                }

                // Add exit anchor for focus
                this.addExitAnchor();

                // Add keydown event
                this.unbindKeydownHandler = addEvent(
                    chart.renderTo, 'keydown', function (e) {
                        keyboardNavigation.onKeydown(e);
                    }
                );

                // Add mouseup event on doc
                this.unbindMouseUpHandler = addEvent(doc, 'mouseup', function () {
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
             * Update the modules for the keyboard navigation
             * @param {Array<string>} order
             *        Array specifying the tab order of the components.
             */
            update: function (order) {
                var a11yOptions = this.chart.options.accessibility,
                    keyboardOptions = a11yOptions && a11yOptions.keyboardNavigation,
                    components = this.components;

                if (
                    keyboardOptions && keyboardOptions.enabled && order && order.length
                ) {
                    // We (still) have keyboard navigation. Update module list
                    this.modules = order.reduce(function (modules, componentName) {
                        var navModules = components[componentName]
                            .getKeyboardNavigation();
                        // If we didn't get back a list of modules, just push the one
                        if (!navModules.length) {
                            modules.push(navModules);
                            return modules;
                        }
                        // Add all of the modules
                        return modules.concat(navModules);
                    }, [
                        // Add an empty module at the start of list, to allow users to
                        // tab into the chart.
                        new KeyboardNavigationHandler(this.chart, {})
                    ]);
                } else {
                    // Clear module list and reset
                    this.modules = [];
                    this.currentModuleIx = 0;
                }
            },


            /**
             * Reset chart navigation state if we click outside the chart and it's
             * not already reset.
             * @private
             */
            onMouseUp: function () {
                if (
                    !this.keyboardReset &&
                    !(this.chart.pointer && this.chart.pointer.chartPosition)
                ) {
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
             * @param {global.Event} ev
             *        Browser keydown event
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
                    } else if (response === curNavModule.response.prev) {
                        preventDefault = this.prev();
                    } else if (response === curNavModule.response.next) {
                        preventDefault = this.next();
                    }
                    if (preventDefault) {
                        e.preventDefault();
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
             * @param {number} direction Direction to move. +1 for next, -1 for prev.
             * @return {boolean} True if there was a valid module in direction.
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
                } else {
                    this.chart.renderTo.focus();
                }

                return false;
            },


            /**
             * Add exit anchor to the chart. We use this to move focus out of chart
             * whenever we want, by setting focus to this div and not preventing the
             * default tab action. We also use this when users come back into the chart
             * by tabbing back, in order to navigate from the end of the chart.
             *
             * Screen reader users can also use heading-shortcuts to jump out of the
             * chart with this.
             *
             * @private
             */
            addExitAnchor: function () {
                var chart = this.chart,
                    exitAnchorWrapper = this.exitAnchorWrapper =
                        doc.createElement('div'),
                    exitAnchor = this.exitAnchor = doc.createElement('h6'),
                    keyboardNavigation = this,
                    exitAnchorLabel = chart.langFormat(
                        'accessibility.svgContainerEnd', { chart: chart }
                    );

                exitAnchor.innerHTML = exitAnchorLabel;

                exitAnchorWrapper.setAttribute('aria-hidden', 'false');
                exitAnchorWrapper.setAttribute(
                    'class', 'highcharts-exit-anchor-wrapper'
                );
                exitAnchorWrapper.style.position = 'relative';
                exitAnchorWrapper.style.outline = 'none';

                exitAnchor.setAttribute('tabindex', '0');
                exitAnchor.setAttribute('aria-hidden', false);

                // Hide exit anchor
                merge(true, exitAnchor.style, {
                    position: 'absolute',
                    width: '1px',
                    height: '1px',
                    bottom: '5px', // Avoid scrollbars (#10637)
                    zIndex: 0,
                    overflow: 'hidden',
                    outline: 'none'
                });

                exitAnchorWrapper.appendChild(exitAnchor);
                chart.renderTo.appendChild(exitAnchorWrapper);

                // Update position on render
                this.unbindExitAnchorUpdate = addEvent(chart, 'render', function () {
                    this.renderTo.appendChild(exitAnchorWrapper);
                });

                // Handle focus
                this.unbindExitAnchorFocus = addEvent(
                    exitAnchor,
                    'focus',
                    function (ev) {
                        var e = ev || win.event,
                            curModule;

                        // If focusing and we are exiting, do nothing once.
                        if (!keyboardNavigation.exiting) {

                            // Not exiting, means we are coming in backwards
                            chart.renderTo.focus();
                            e.preventDefault();

                            // Move to last valid keyboard nav module
                            // Note the we don't run it, just set the index
                            if (
                                keyboardNavigation.modules &&
                                keyboardNavigation.modules.length
                            ) {
                                keyboardNavigation.currentModuleIx =
                                    keyboardNavigation.modules.length - 1;
                                curModule = keyboardNavigation.modules[
                                    keyboardNavigation.currentModuleIx
                                ];

                                // Validate the module
                                if (
                                    curModule &&
                                    curModule.validate && !curModule.validate()
                                ) {
                                    // Invalid. Try moving backwards to find next valid.
                                    keyboardNavigation.prev();
                                } else if (curModule) {
                                    // We have a valid module, init it
                                    curModule.init(-1);
                                }
                            }
                        } else {
                            // Don't skip the next focus, we only skip once.
                            keyboardNavigation.exiting = false;
                        }
                    }
                );
            },


            /**
             * Remove all traces of keyboard navigation.
             * @private
             */
            destroy: function () {
                // Remove exit anchor
                if (this.unbindExitAnchorFocus) {
                    this.unbindExitAnchorFocus();
                    delete this.unbindExitAnchorFocus;
                }
                if (this.unbindExitAnchorUpdate) {
                    this.unbindExitAnchorUpdate();
                    delete this.unbindExitAnchorUpdate;
                }
                if (this.exitAnchorWrapper && this.exitAnchorWrapper.parentNode) {
                    this.exitAnchorWrapper.parentNode
                        .removeChild(this.exitAnchorWrapper);
                    delete this.exitAnchor;
                    delete this.exitAnchorWrapper;
                }

                // Remove keydown handler
                if (this.unbindKeydownHandler) {
                    this.unbindKeydownHandler();
                }

                // Remove mouseup handler
                if (this.unbindMouseUpHandler) {
                    this.unbindMouseUpHandler();
                }
            }
        };


        return KeyboardNavigation;
    });
    _registerModule(_modules, 'modules/accessibility/components/LegendComponent.js', [_modules['parts/Globals.js'], _modules['modules/accessibility/AccessibilityComponent.js'], _modules['modules/accessibility/KeyboardNavigationHandler.js']], function (H, AccessibilityComponent, KeyboardNavigationHandler) {
        /* *
         *
         *  (c) 2009-2019 Øystein Moseng
         *
         *  Accessibility component for chart legend.
         *
         *  License: www.highcharts.com/license
         *
         * */




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
                    H.fireEvent(
                        items[oldIx].legendGroup.element,
                        'mouseout'
                    );
                }
                // Scroll if we have to
                if (items[ix].pageIx !== undefined &&
                    items[ix].pageIx + 1 !== this.legend.currentPage) {
                    this.legend.scroll(1 + items[ix].pageIx - this.legend.currentPage);
                }
                // Focus
                this.setFocusToElement(
                    items[ix].legendItem, items[ix].a11yProxyElement
                );
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
                legendItem.a11yProxyElement.setAttribute(
                    'aria-pressed', e.visible ? 'false' : 'true'
                );
            }
        });


        /**
         * The LegendComponent class
         *
         * @private
         * @class
         * @name Highcharts.LegendComponent
         * @param {Highcharts.Chart} chart
         *        Chart object
         */
        var LegendComponent = function (chart) {
            this.initBase(chart);
        };
        LegendComponent.prototype = new AccessibilityComponent();
        H.extend(LegendComponent.prototype, /** @lends Highcharts.LegendComponent */ {

            /**
             * The legend needs updates on every render, in order to update positioning
             * of the proxy overlays.
             */
            onChartRender: function () {
                var chart = this.chart,
                    a11yOptions = chart.options.accessibility,
                    items = chart.legend && chart.legend.allItems,
                    component = this;

                // Ignore render after proxy clicked. No need to destroy it, and
                // destroying also kills focus.
                if (component.legendProxyButtonClicked) {
                    delete component.legendProxyButtonClicked;
                    return;
                }

                // Always Remove group if exists
                this.removeElement(this.legendProxyGroup);

                // Skip everything if we do not have legend items, or if we have a
                // color axis
                if (
                    !items || !items.length ||
                    chart.colorAxis && chart.colorAxis.length ||
                    !chart.options.legend.accessibility.enabled
                ) {
                    return;
                }

                // Add proxy group
                this.legendProxyGroup = this.addProxyGroup({
                    'aria-label': chart.langFormat(
                        'accessibility.legendLabel'
                    ),
                    'role': a11yOptions.landmarkVerbosity === 'all' ?
                        'region' : null
                });

                // Proxy the legend items
                items.forEach(function (item) {
                    if (item.legendItem && item.legendItem.element) {
                        item.a11yProxyElement = component.createProxyButton(
                            item.legendItem,
                            component.legendProxyGroup,
                            {
                                tabindex: -1,
                                'aria-pressed': !item.visible,
                                'aria-label': chart.langFormat(
                                    'accessibility.legendItem',
                                    {
                                        chart: chart,
                                        itemName: component.stripTags(item.name)
                                    }
                                )
                            },
                            // Consider useHTML
                            item.legendGroup.div ? item.legendItem : item.legendGroup,
                            // Additional click event (fires first)
                            function () {
                                // Keep track of when we should ignore next render
                                component.legendProxyButtonClicked = true;
                            }
                        );
                    }
                });
            },


            /**
             * Get keyboard navigation handler for this component.
             * @return {Highcharts.KeyboardNavigationHandler}
             */
            getKeyboardNavigation: function () {
                var keys = this.keyCodes,
                    component = this,
                    chart = this.chart,
                    a11yOptions = chart.options.accessibility;
                return new KeyboardNavigationHandler(chart, {
                    keyCodeMap: [
                        // Arrow key handling
                        [[
                            keys.left, keys.right, keys.up, keys.down
                        ], function (keyCode) {
                            var direction = (
                                keyCode === keys.left || keyCode === keys.up
                            ) ? -1 : 1;

                            // Try to highlight next/prev legend item
                            var res = chart.highlightLegendItem(
                                component.highlightedLegendItemIx + direction
                            );
                            if (res) {
                                component.highlightedLegendItemIx += direction;
                                return this.response.success;
                            }

                            // Failed, can we wrap around?
                            if (
                                chart.legend.allItems.length > 1 &&
                                a11yOptions.keyboardNavigation.wrapAround
                            ) {
                                // Wrap around if we failed and have more than 1 item
                                this.init(direction);
                                return this.response.success;
                            }

                            // No wrap, move
                            return this.response[direction > 0 ? 'next' : 'prev'];
                        }],

                        // Click item
                        [[
                            keys.enter, keys.space
                        ], function () {
                            var legendItem = chart.legend.allItems[
                                component.highlightedLegendItemIx
                            ];
                            if (legendItem && legendItem.a11yProxyElement) {
                                H.fireEvent(legendItem.a11yProxyElement, 'click');
                            }
                            return this.response.success;
                        }]
                    ],

                    // Only run this module if we have at least one legend - wait for
                    // it - item. Don't run if the legend is populated by a colorAxis.
                    // Don't run if legend navigation is disabled.
                    validate: function () {
                        var legendOptions = chart.options.legend;
                        return chart.legend && chart.legend.allItems &&
                            chart.legend.display &&
                            !(chart.colorAxis && chart.colorAxis.length) &&
                            legendOptions &&
                            legendOptions.accessibility &&
                            legendOptions.accessibility.enabled &&
                            legendOptions.accessibility.keyboardNavigation &&
                            legendOptions.accessibility.keyboardNavigation.enabled;
                    },


                    // Focus first/last item
                    init: function (direction) {
                        var ix = direction > 0 ? 0 : chart.legend.allItems.length - 1;
                        chart.highlightLegendItem(ix);
                        component.highlightedLegendItemIx = ix;
                    }
                });
            }

        });


        return LegendComponent;
    });
    _registerModule(_modules, 'modules/accessibility/components/MenuComponent.js', [_modules['parts/Globals.js'], _modules['modules/accessibility/AccessibilityComponent.js'], _modules['modules/accessibility/KeyboardNavigationHandler.js']], function (H, AccessibilityComponent, KeyboardNavigationHandler) {
        /* *
         *
         *  (c) 2009-2019 Øystein Moseng
         *
         *  Accessibility component for exporting menu.
         *
         *  License: www.highcharts.com/license
         *
         * */




        /**
         * Show the export menu and focus the first item (if exists).
         *
         * @private
         * @function Highcharts.Chart#showExportMenu
         */
        H.Chart.prototype.showExportMenu = function () {
            if (this.exportSVGElements && this.exportSVGElements[0]) {
                this.exportSVGElements[0].element.onclick();
                this.highlightExportItem(0);
            }
        };


        /**
         * Hide export menu.
         *
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
                        el.onmouseout();
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
         * @return {true|undefined}
         */
        H.Chart.prototype.highlightExportItem = function (ix) {
            var listItem = this.exportDivElements && this.exportDivElements[ix],
                curHighlighted =
                    this.exportDivElements &&
                    this.exportDivElements[this.highlightedExportItemIx],
                hasSVGFocusSupport;

            if (
                listItem &&
                listItem.tagName === 'DIV' &&
                !(listItem.children && listItem.children.length)
            ) {
                // Test if we have focus support for SVG elements
                hasSVGFocusSupport = !!(
                    this.renderTo.getElementsByTagName('g')[0] || {}
                ).focus;

                // Only focus if we can set focus back to the elements after
                // destroying the menu (#7422)
                if (listItem.focus && hasSVGFocusSupport) {
                    listItem.focus();
                }
                if (curHighlighted && curHighlighted.onmouseout) {
                    curHighlighted.onmouseout();
                }
                if (listItem.onmouseover) {
                    listItem.onmouseover();
                }
                this.highlightedExportItemIx = ix;
                return true;
            }
        };


        /**
         * Try to highlight the last valid export menu item.
         *
         * @private
         * @function Highcharts.Chart#highlightLastExportItem
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
         * The MenuComponent class
         *
         * @private
         * @class
         * @name Highcharts.MenuComponent
         * @param {Highcharts.Chart} chart
         *        Chart object
         */
        var MenuComponent = function (chart) {
            this.initBase(chart);
            this.init();
        };
        MenuComponent.prototype = new AccessibilityComponent();
        H.extend(MenuComponent.prototype, /** @lends Highcharts.MenuComponent */ {

            /**
             * Init the component
             */
            init: function () {
                var chart = this.chart;
                // Hide the export menu from screen readers when it is hidden visually
                this.addEvent(chart, 'exportMenuHidden', function () {
                    var menu = this.exportContextMenu;
                    if (menu) {
                        menu.setAttribute('aria-hidden', true);
                    }
                });
            },


            /**
             * Called on each render of the chart. We need to update positioning of the
             * proxy overlay.
             */
            onChartRender: function () {
                var component = this,
                    chart = this.chart,
                    a11yOptions = chart.options.accessibility;

                // Always start with a clean slate
                this.removeElement(this.exportProxyGroup);

                // Set screen reader properties on export menu
                if (
                    chart.options.exporting &&
                    chart.options.exporting.enabled !== false &&
                    chart.options.exporting.accessibility &&
                    chart.options.exporting.accessibility.enabled &&
                    chart.exportSVGElements &&
                    chart.exportSVGElements[0] &&
                    chart.exportSVGElements[0].element
                ) {
                    // Set event handler on button if not already done
                    var button = chart.exportSVGElements[0],
                        buttonElement = button.element,
                        oldExportCallback = buttonElement.onclick;
                    if (this.wrappedButton !== buttonElement) {
                        buttonElement.onclick = function () {
                            oldExportCallback.apply(
                                this,
                                Array.prototype.slice.call(arguments)
                            );
                            component.addAccessibleContextMenuAttribs();
                            chart.highlightExportItem(0);
                        };
                        this.wrappedButton = buttonElement;
                    }

                    // Proxy button and group
                    this.exportProxyGroup = this.addProxyGroup(
                        // Wrap in a region div if verbosity is high
                        a11yOptions.landmarkVerbosity === 'all' ? {
                            'aria-label': chart.langFormat(
                                'accessibility.exporting.exportRegionLabel',
                                { chart: chart }
                            ),
                            'role': 'region'
                        } : null
                    );

                    this.exportButtonProxy = this.createProxyButton(
                        button,
                        this.exportProxyGroup,
                        {
                            'aria-label': chart.langFormat(
                                'accessibility.exporting.menuButtonLabel',
                                { chart: chart }
                            )
                        }
                    );
                }
            },


            /**
             * Add ARIA to context menu
             * @private
             */
            addAccessibleContextMenuAttribs: function () {
                var chart = this.chart,
                    exportList = chart.exportDivElements,
                    contextMenu = chart.exportContextMenu;

                if (exportList && exportList.length) {
                    // Set tabindex on the menu items to allow focusing by script
                    // Set role to give screen readers a chance to pick up the contents
                    exportList.forEach(function (item) {
                        if (item.tagName === 'DIV' &&
                            !(item.children && item.children.length)) {
                            item.setAttribute('role', 'menuitem');
                            item.setAttribute('tabindex', -1);
                        }
                    });
                    // Set accessibility properties on parent div
                    exportList[0].parentNode.setAttribute('role', 'menu');
                    exportList[0].parentNode.setAttribute(
                        'aria-label',
                        chart.langFormat(
                            'accessibility.exporting.chartMenuLabel', { chart: chart }
                        )
                    );
                }
                if (contextMenu) {
                    this.unhideElementFromScreenReaders(contextMenu);
                }
            },


            /**
             * Get keyboard navigation handler for this component.
             * @return {Highcharts.KeyboardNavigationHandler}
             */
            getKeyboardNavigation: function () {
                var keys = this.keyCodes,
                    chart = this.chart,
                    a11yOptions = chart.options.accessibility,
                    component = this;

                return new KeyboardNavigationHandler(chart, {
                    keyCodeMap: [
                        // Arrow prev handler
                        [[
                            keys.left, keys.up
                        ], function () {
                            var i = chart.highlightedExportItemIx || 0;

                            // Try to highlight prev item in list. Highlighting e.g.
                            // separators will fail.
                            while (i--) {
                                if (chart.highlightExportItem(i)) {
                                    return this.response.success;
                                }
                            }

                            // We failed, so wrap around or move to prev module
                            if (a11yOptions.keyboardNavigation.wrapAround) {
                                chart.highlightLastExportItem();
                                return this.response.success;
                            }
                            return this.response.prev;
                        }],

                        // Arrow next handler
                        [[
                            keys.right, keys.down
                        ], function () {
                            var i = (chart.highlightedExportItemIx || 0) + 1;

                            // Try to highlight next item in list. Highlighting e.g.
                            // separators will fail.
                            for (;i < chart.exportDivElements.length; ++i) {
                                if (chart.highlightExportItem(i)) {
                                    return this.response.success;
                                }
                            }

                            // We failed, so wrap around or move to next module
                            if (a11yOptions.keyboardNavigation.wrapAround) {
                                chart.highlightExportItem(0);
                                return this.response.success;
                            }
                            return this.response.next;
                        }],

                        // Click handler
                        [[
                            keys.enter, keys.space
                        ], function () {
                            component.fakeClickEvent(
                                chart.exportDivElements[chart.highlightedExportItemIx]
                            );
                            return this.response.success;
                        }],

                        // ESC handler
                        [[
                            keys.esc
                        ], function () {
                            return this.response.prev;
                        }]
                    ],

                    // Only run exporting navigation if exporting support exists and is
                    // enabled on chart
                    validate: function () {
                        return chart.exportChart &&
                            chart.options.exporting.enabled !== false &&
                            chart.options.exporting.accessibility.enabled !== false;
                    },

                    // Show export menu
                    init: function (direction) {
                        chart.showExportMenu();

                        // If coming back to export menu from other module, try to
                        // highlight last item in menu
                        if (direction < 0) {
                            chart.highlightLastExportItem();
                        }
                    },

                    // Hide the menu
                    terminate: function () {
                        chart.hideExportMenu();
                    }
                });
            }

        });


        return MenuComponent;
    });
    _registerModule(_modules, 'modules/accessibility/components/SeriesComponent.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js'], _modules['modules/accessibility/AccessibilityComponent.js'], _modules['modules/accessibility/KeyboardNavigationHandler.js']], function (H, U, AccessibilityComponent, KeyboardNavigationHandler) {
        /* *
         *
         *  (c) 2009-2019 Øystein Moseng
         *
         *  Accessibility component for series and points.
         *
         *  License: www.highcharts.com/license
         *
         * */



        var isNumber = U.isNumber;


        var merge = H.merge,
            pick = H.pick;


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
         * Keep track of forcing markers.
         * @private
         */
        H.addEvent(H.Series, 'render', function () {
            var series = this,
                chart = series.chart,
                options = series.options,
                a11yOptions = chart.options.accessibility || {},
                points = series.points || [],
                dataLength = points.length,
                resetMarkerOptions = series.resetA11yMarkerOptions,
                // We need markers for a11y
                forceMarkers = a11yOptions.enabled &&
                    (
                        options.accessibility &&
                        options.accessibility.enabled
                    ) !== false &&
                    (
                        dataLength < a11yOptions.pointDescriptionThreshold ||
                        a11yOptions.pointDescriptionThreshold === false ||
                        dataLength < a11yOptions.pointNavigationThreshold ||
                        a11yOptions.pointNavigationThreshold === false
                    );

            if (forceMarkers) {
                // If markers are explicitly disabled on series, replace with markers
                // that have zero opacity.
                if (options.marker && options.marker.enabled === false) {
                    series.a11yMarkersForced = true;
                    merge(true, series.options, {
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

                // If we have point markers, we need to handle them
                if (series._hasPointMarkers && series.points && series.points.length) {
                    var i = dataLength,
                        pointOptions;
                    while (i--) {
                        pointOptions = points[i].options;
                        if (pointOptions.marker) {
                            if (pointOptions.marker.enabled) {
                                // Make sure opacity is overridden to show enabled
                                // markers
                                merge(true, pointOptions.marker, {
                                    states: {
                                        normal: {
                                            opacity: pointOptions.marker.states &&
                                                pointOptions.marker.states.normal &&
                                                pointOptions.marker.states.normal
                                                    .opacity || 1
                                        }
                                    }
                                });
                            } else {
                                // Make sure hidden markers are enabled instead, and
                                // opacity is out.
                                merge(true, pointOptions.marker, {
                                    enabled: true,
                                    states: {
                                        normal: {
                                            opacity: 0
                                        }
                                    }
                                });
                            }
                        }
                    }
                }

            } else if (series.a11yMarkersForced && resetMarkerOptions) {
                // Series markers should not be forced, and we should reset to old
                // options.
                delete series.a11yMarkersForced;
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
        });


        /**
         * Keep track of options to reset markers to if no longer forced.
         * @private
         */
        H.addEvent(H.Series, 'afterSetOptions', function (e) {
            this.resetA11yMarkerOptions = merge(
                e.options.marker || {}, this.userOptions.marker || {}
            );
        });


        /**
         * Get the index of a point in a series. This is needed when using e.g. data
         * grouping.
         *
         * @private
         * @function getPointIndex
         *
         * @param {Highcharts.Point} point
         *        The point to find index of.
         *
         * @return {number}
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
            } else {
                return index;
            }
        }


        /**
         * Determine if a series should be skipped
         *
         * @private
         * @function isSkipSeries
         *
         * @param {Highcharts.Series} series
         *
         * @return {boolean}
         */
        function isSkipSeries(series) {
            var a11yOptions = series.chart.options.accessibility,
                seriesA11yOptions = series.options.accessibility || {},
                seriesKbdNavOptions = seriesA11yOptions.keyboardNavigation;

            return seriesKbdNavOptions && seriesKbdNavOptions.enabled === false ||
                seriesA11yOptions.enabled === false ||
                series.options.enableMouseTracking === false || // #8440
                !series.visible ||
                // Skip all points in a series where pointNavigationThreshold is
                // reached
                (a11yOptions.pointNavigationThreshold &&
                a11yOptions.pointNavigationThreshold <= series.points.length);
        }


        /**
         * Determine if a point should be skipped
         *
         * @private
         * @function isSkipPoint
         *
         * @param {Highcharts.Point} point
         *
         * @return {boolean}
         */
        function isSkipPoint(point) {
            var a11yOptions = point.series.chart.options.accessibility;

            return point.isNull && a11yOptions.keyboardNavigation.skipNullPoints ||
                point.visible === false ||
                isSkipSeries(point.series);
        }


        /**
         * Get the point in a series that is closest (in distance) to a reference point.
         * Optionally supply weight factors for x and y directions.
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

            if (point.plotX === undefined || point.plotY === undefined) {
                return;
            }
            while (i--) {
                dPoint = series.points[i];
                if (dPoint.plotX === undefined || dPoint.plotY === undefined) {
                    continue;
                }
                distance = (point.plotX - dPoint.plotX) *
                        (point.plotX - dPoint.plotX) * (xWeight || 1) +
                        (point.plotY - dPoint.plotY) *
                        (point.plotY - dPoint.plotY) * (yWeight || 1);
                if (distance < minDistance) {
                    minDistance = distance;
                    minIx = i;
                }
            }
            return minIx !== undefined && series.points[minIx];
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
            } else {
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
                curPoints = curPoint && curPoint.series.points,
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
            } else {
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
                } else {
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
         * @return {Highcharts.Point|boolean}
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

            if (curPoint.plotX === undefined || curPoint.plotY === undefined) {
                return false;
            }
            this.series.forEach(function (series) {
                if (isSkipSeries(series)) {
                    return;
                }
                series.points.forEach(function (point) {
                    if (point.plotY === undefined || point.plotX === undefined ||
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

                    if (
                        yDistance <= 0 && down || yDistance >= 0 && !down || // Chk dir
                        distance < 5 || // Points in same spot => infinite loop
                        isSkipPoint(point)
                    ) {
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
         * Get accessible time description for a point on a datetime axis.
         *
         * @private
         * @function Highcharts.Point#getTimeDescription
         *
         * @return {string}
         *         The description as string.
         */
        H.Point.prototype.getA11yTimeDescription = function () {
            var point = this,
                series = point.series,
                chart = series.chart,
                a11yOptions = chart.options.accessibility;
            if (series.xAxis && series.xAxis.isDatetimeAxis) {
                return chart.time.dateFormat(
                    a11yOptions.pointDateFormatter &&
                    a11yOptions.pointDateFormatter(point) ||
                    a11yOptions.pointDateFormat ||
                    H.Tooltip.prototype.getXDateFormat.call(
                        {
                            getDateFormat: H.Tooltip.prototype.getDateFormat,
                            chart: chart
                        },
                        point,
                        chart.options.tooltip,
                        series.xAxis
                    ),
                    point.x
                );
            }
        };


        /**
         * The SeriesComponent class
         *
         * @private
         * @class
         * @name Highcharts.SeriesComponent
         * @param {Highcharts.Chart} chart
         *        Chart object
         */
        var SeriesComponent = function (chart) {
            this.initBase(chart);
            this.init();
        };
        SeriesComponent.prototype = new AccessibilityComponent();
        H.extend(SeriesComponent.prototype, /** @lends Highcharts.SeriesComponent */ {

            /**
             * Init the component.
             */
            init: function () {
                var component = this;

                // On destroy, we need to clean up the focus border and the state.
                this.addEvent(H.Series, 'destroy', function () {
                    var chart = this.chart;
                    if (
                        chart === component.chart &&
                        chart.highlightedPoint &&
                        chart.highlightedPoint.series === this
                    ) {
                        delete chart.highlightedPoint;
                        if (chart.focusElement) {
                            chart.focusElement.removeFocusBorder();
                        }
                    }
                });

                // Hide tooltip from screen readers when it is shown
                this.addEvent(H.Tooltip, 'refresh', function () {
                    if (
                        this.chart === component.chart &&
                        this.label &&
                        this.label.element
                    ) {
                        this.label.element.setAttribute('aria-hidden', true);
                    }
                });

                // Hide series labels
                this.addEvent(this.chart, 'afterDrawSeriesLabels', function () {
                    this.series.forEach(function (series) {
                        if (series.labelBySeries) {
                            series.labelBySeries.attr('aria-hidden', true);
                        }
                    });
                });

                // Set up announcing of new data
                this.initAnnouncer();
            },


            /**
             * Called on chart render. It is necessary to do this for render in case
             * markers change on zoom/pixel density.
             */
            onChartRender: function () {
                var component = this,
                    chart = this.chart;
                chart.series.forEach(function (series) {
                    component[
                        (series.options.accessibility &&
                        series.options.accessibility.enabled) !== false &&
                        series.visible ?
                            'addSeriesDescription' : 'hideSeriesFromScreenReader'
                    ](series);
                });
            },


            /**
             * Get keyboard navigation handler for this component.
             * @return {Highcharts.KeyboardNavigationHandler}
             */
            getKeyboardNavigation: function () {
                var keys = this.keyCodes,
                    chart = this.chart,
                    inverted = chart.inverted,
                    a11yOptions = chart.options.accessibility,
                    // Function that attempts to highlight next/prev point, returns
                    // the response number. Handles wrap around.
                    attemptNextPoint = function (directionIsNext) {
                        if (!chart.highlightAdjacentPoint(directionIsNext)) {
                            // Failed to highlight next, wrap to last/first if we
                            // have wrapAround
                            if (a11yOptions.keyboardNavigation.wrapAround) {
                                return this.init(directionIsNext ? 1 : -1);
                            }
                            return this.response[directionIsNext ? 'next' : 'prev'];
                        }
                        return this.response.success;
                    };

                return new KeyboardNavigationHandler(chart, {
                    keyCodeMap: [
                        // Arrow sideways
                        [[
                            inverted ? keys.up : keys.left,
                            inverted ? keys.down : keys.right
                        ], function (keyCode) {
                            return attemptNextPoint.call(
                                this, keyCode === keys.right || keyCode === keys.down
                            );
                        }],

                        // Arrow vertical
                        [[
                            inverted ? keys.left : keys.up,
                            inverted ? keys.right : keys.down
                        ], function (keyCode) {
                            var down = keyCode === keys.down || keyCode === keys.right,
                                navOptions = a11yOptions.keyboardNavigation;

                            // Handle serialized mode, act like left/right
                            if (navOptions.mode && navOptions.mode === 'serialize') {
                                return attemptNextPoint.call(this, down);
                            }

                            // Normal mode, move between series
                            var highlightMethod = chart.highlightedPoint &&
                                    chart.highlightedPoint.series.keyboardMoveVertical ?
                                'highlightAdjacentPointVertical' :
                                'highlightAdjacentSeries';

                            chart[highlightMethod](down);
                            return this.response.success;
                        }],

                        // Enter/Spacebar
                        [[
                            keys.enter, keys.space
                        ], function () {
                            if (chart.highlightedPoint) {
                                chart.highlightedPoint.firePointEvent('click');
                            }
                        }]
                    ],

                    // Always start highlighting from scratch when entering this module
                    init: function (dir) {
                        var numSeries = chart.series.length,
                            i = dir > 0 ? 0 : numSeries,
                            res;

                        if (dir > 0) {
                            delete chart.highlightedPoint;
                            // Find first valid point to highlight
                            while (i < numSeries) {
                                res = chart.series[i].highlightFirstValidPoint();
                                if (res) {
                                    break;
                                }
                                ++i;
                            }
                        } else {
                            // Find last valid point to highlight
                            while (i--) {
                                chart.highlightedPoint = chart.series[i].points[
                                    chart.series[i].points.length - 1
                                ];
                                // Highlight first valid point in the series will also
                                // look backwards. It always starts from currently
                                // highlighted point.
                                res = chart.series[i].highlightFirstValidPoint();
                                if (res) {
                                    break;
                                }
                            }
                        }

                        // Nothing to highlight
                        return this.response.success;
                    },

                    // If leaving points, don't show tooltip anymore
                    terminate: function () {
                        if (chart.tooltip) {
                            chart.tooltip.hide(0);
                        }
                        delete chart.highlightedPoint;
                    }
                });
            },


            /**
             * Returns true if a point should be clickable.
             * @private
             * @param {Highcharts.Point} point The point to test.
             * @return {boolean} True if the point can be clicked.
             */
            isPointClickable: function (point) {
                var seriesOpts = point.series.options || {},
                    seriesPointEvents = seriesOpts.point && seriesOpts.point.events;
                return point && point.graphic && point.graphic.element &&
                    (
                        point.hcEvents && point.hcEvents.click ||
                        seriesPointEvents && seriesPointEvents.click ||
                        (
                            point.options &&
                            point.options.events &&
                            point.options.events.click
                        )
                    );
            },


            /**
             * Initialize the new data announcer.
             * @private
             */
            initAnnouncer: function () {
                var chart = this.chart,
                    a11yOptions = chart.options.accessibility,
                    component = this;
                this.lastAnnouncementTime = 0;
                this.dirty = {
                    allSeries: {}
                };

                // Add the live region
                this.announceRegion = this.createElement('div');
                this.announceRegion.setAttribute('aria-hidden', false);
                this.announceRegion.setAttribute(
                    'aria-live', a11yOptions.announceNewData.interruptUser ?
                        'assertive' : 'polite'
                );
                merge(true, this.announceRegion.style, this.hiddenStyle);
                chart.renderTo.insertBefore(
                    this.announceRegion, chart.renderTo.firstChild
                );

                // After drilldown, make sure we reset time counter, and also that we
                // highlight the first series.
                this.addEvent(this.chart, 'afterDrilldown', function () {
                    chart.highlightedPoint = null;
                    if (chart.options.accessibility.announceNewData.enabled) {
                        if (this.series && this.series.length) {
                            var el = component.getSeriesElement(this.series[0]);
                            if (el.focus && el.getAttribute('aria-label')) {
                                el.focus();
                            } else {
                                this.series[0].highlightFirstValidPoint();
                            }
                        }
                        component.lastAnnouncementTime = 0;
                        if (chart.focusElement) {
                            chart.focusElement.removeFocusBorder();
                        }
                    }
                });
                // On new data in the series, make sure we add it to the dirty list
                this.addEvent(H.Series, 'updatedData', function () {
                    if (
                        this.chart === chart &&
                        this.chart.options.accessibility.announceNewData.enabled
                    ) {
                        component.dirty.hasDirty = true;
                        component.dirty.allSeries[this.name + this.index] = this;
                    }
                });
                // New series
                this.addEvent(chart, 'afterAddSeries', function (e) {
                    if (this.options.accessibility.announceNewData.enabled) {
                        var series = e.series;
                        component.dirty.hasDirty = true;
                        component.dirty.allSeries[series.name + series.index] = series;
                        // Add it to newSeries storage unless we already have one
                        component.dirty.newSeries = component.dirty.newSeries ===
                            undefined ? series : null;
                    }
                });
                // New point
                this.addEvent(H.Series, 'addPoint', function (e) {
                    if (this.chart === chart &&
                        this.chart.options.accessibility.announceNewData.enabled) {
                        // Add it to newPoint storage unless we already have one
                        component.dirty.newPoint = component.dirty.newPoint ===
                            undefined ? e.point : null;
                    }
                });
                // On redraw: compile what we know about new data, and build
                // announcement
                this.addEvent(chart, 'redraw', function () {
                    if (
                        this.options.accessibility.announceNewData &&
                        component.dirty.hasDirty
                    ) {
                        var newPoint = component.dirty.newPoint,
                            newPoints;
                        // If we have a single new point, see if we can find it in the
                        // data array. Otherwise we can only pass through options to
                        // the description builder, and it is a bit sparse in info.
                        if (newPoint) {
                            newPoints = newPoint.series.data.filter(function (point) {
                                return point.x === newPoint.x && point.y === newPoint.y;
                            });
                            // We have list of points with the same x and y values. If
                            // this list is one point long, we have our new point.
                            newPoint = newPoints.length === 1 ? newPoints[0] : newPoint;
                        }
                        // Queue the announcement
                        component.announceNewData(
                            Object.keys(component.dirty.allSeries).map(function (ix) {
                                return component.dirty.allSeries[ix];
                            }),
                            component.dirty.newSeries,
                            newPoint
                        );
                        // Reset
                        component.dirty = {
                            allSeries: {}
                        };
                    }
                });
            },


            /**
             * Handle announcement to user that there is new data.
             * @private
             * @param {Array<Highcharts.Series>} dirtySeries
             *          Array of series with new data.
             * @param {Highcharts.Series} [newSeries]
             *          If a single new series was added, a reference to this series.
             * @param {Highcharts.Point} [newPoint]
             *          If a single point was added, a reference to this point.
             */
            announceNewData: function (dirtySeries, newSeries, newPoint) {
                var chart = this.chart,
                    annOptions = chart.options.accessibility.announceNewData;
                if (annOptions.enabled) {
                    var component = this,
                        now = +new Date(),
                        dTime = now - this.lastAnnouncementTime,
                        time = Math.max(0, annOptions.minAnnounceInterval - dTime),
                        allSeries;

                    // Add affected series from existing queued announcement
                    if (this.queuedAnnouncement) {
                        var uniqueSeries = (this.queuedAnnouncement.series || [])
                            .concat(dirtySeries)
                            .reduce(function (acc, cur) {
                                acc[cur.name + cur.index] = cur;
                                return acc;
                            }, {});
                        allSeries = Object.keys(uniqueSeries).map(function (ix) {
                            return uniqueSeries[ix];
                        });
                    } else {
                        allSeries = [].concat(dirtySeries);
                    }

                    // Build message and announce
                    var message = this.buildAnnouncementMessage(
                        allSeries, newSeries, newPoint
                    );
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
                        component.queuedAnnouncementTimer = setTimeout(function () {
                            if (component && component.announceRegion) {
                                component.lastAnnouncementTime = +new Date();
                                component.announceRegion.innerHTML = component
                                    .queuedAnnouncement.message;

                                // Delete contents after a second to avoid user
                                // finding the live region in the DOM.
                                if (component.clearAnnouncementContainerTimer) {
                                    clearTimeout(
                                        component.clearAnnouncementContainerTimer
                                    );
                                }
                                component.clearAnnouncementContainerTimer = setTimeout(
                                    function () {
                                        component.announceRegion.innerHTML = '';
                                        delete
                                        component.clearAnnouncementContainerTimer;
                                    }, 1000
                                );
                                delete component.queuedAnnouncement;
                                delete component.queuedAnnouncementTimer;
                            }
                        }, time);
                    }
                }
            },


            /**
             * Handle announcement to user that there is new data.
             * @private
             * @param {Array<Highcharts.Series>} dirtySeries
             *          Array of series with new data.
             * @param {Highcharts.Series} [newSeries]
             *          If a single new series was added, a reference to this series.
             * @param {Highcharts.Point} [newPoint]
             *          If a single point was added, a reference to this point.
             *
             * @return {string} The announcement message to give to user.
             */
            buildAnnouncementMessage: function (dirtySeries, newSeries, newPoint) {
                var chart = this.chart,
                    annOptions = chart.options.accessibility.announceNewData;

                // User supplied formatter?
                if (annOptions.announcementFormatter) {
                    var formatterRes = annOptions.announcementFormatter(
                        dirtySeries, newSeries, newPoint
                    );
                    if (formatterRes !== false) {
                        return formatterRes.length ? formatterRes : null;
                    }
                }

                // Default formatter - use lang options
                var multiple = H.charts && H.charts.length > 1 ? 'Multiple' : 'Single',
                    langKey = newSeries ? 'newSeriesAnnounce' + multiple :
                        newPoint ? 'newPointAnnounce' + multiple : 'newDataAnnounce';
                return chart.langFormat(
                    'accessibility.announceNewData.' + langKey, {
                        chartTitle: this.stripTags(
                            chart.options.title.text || chart.langFormat(
                                'accessibility.defaultChartTitle', { chart: chart }
                            )
                        ),
                        seriesDesc: newSeries ?
                            this.defaultSeriesDescriptionFormatter(newSeries) : null,
                        pointDesc: newPoint ?
                            this.defaultPointDescriptionFormatter(newPoint) : null,
                        point: newPoint,
                        series: newSeries
                    }
                );
            },


            /**
             * Utility function. Reverses child nodes of a DOM element.
             * @private
             * @param {Highcharts.HTMLDOMElement|Highcharts.SVGDOMElement} node
             */
            reverseChildNodes: function (node) {
                var i = node.childNodes.length;
                while (i--) {
                    node.appendChild(node.childNodes[i]);
                }
            },


            /**
             * Get the DOM element for the first point in the series.
             * @private
             * @param {Highcharts.Series} series The series to get element for.
             * @return {Highcharts.SVGDOMElement} The DOM element for the point.
             */
            getSeriesFirstPointElement: function (series) {
                return (
                    series.points &&
                    series.points.length &&
                    series.points[0].graphic &&
                    series.points[0].graphic.element
                );
            },


            /**
             * Get the DOM element for the series that we put accessibility info on.
             * @private
             * @param {Highcharts.Series} series The series to get element for.
             * @return {Highcharts.SVGDOMElement} The DOM element for the series
             */
            getSeriesElement: function (series) {
                var firstPointEl = this.getSeriesFirstPointElement(series);
                return (
                    firstPointEl &&
                    firstPointEl.parentNode || series.graph &&
                    series.graph.element || series.group &&
                    series.group.element
                ); // Could be tracker series depending on series type
            },


            /**
             * Hide series from screen readers.
             * @private
             * @param {Highcharts.Series} series The series to hide
             */
            hideSeriesFromScreenReader: function (series) {
                var seriesEl = this.getSeriesElement(series);
                if (seriesEl) {
                    seriesEl.setAttribute('aria-hidden', true);
                }
            },


            /**
             * Put accessible info on series and points of a series.
             * @private
             * @param {Highcharts.Series} series The series to add info on.
             */
            addSeriesDescription: function (series) {
                var component = this,
                    chart = series.chart,
                    a11yOptions = chart.options.accessibility,
                    seriesA11yOptions = series.options.accessibility || {},
                    firstPointEl = component.getSeriesFirstPointElement(series),
                    seriesEl = component.getSeriesElement(series),
                    setScreenReaderProps = series.points && (
                        series.points.length <
                            a11yOptions.pointDescriptionThreshold ||
                            a11yOptions.pointDescriptionThreshold === false
                    ) && !seriesA11yOptions.exposeAsGroupOnly,
                    setKeyboardProps = series.points && (
                        series.points.length <
                            a11yOptions.pointNavigationThreshold ||
                            a11yOptions.pointNavigationThreshold === false
                    );

                if (seriesEl) {
                    // For some series types the order of elements do not match the
                    // order of points in series. In that case we have to reverse them
                    // in order for AT to read them out in an understandable order
                    if (seriesEl.lastChild === firstPointEl) {
                        component.reverseChildNodes(seriesEl);
                    }

                    // Unhide series element
                    component.unhideElementFromScreenReaders(seriesEl);

                    // Make individual point elements accessible if possible
                    if (setScreenReaderProps || setKeyboardProps) {
                        series.points.forEach(function (point) {
                            var pointEl = point.graphic && point.graphic.element;
                            if (pointEl) {
                                // We always set tabindex, as long as we are setting
                                // props.
                                pointEl.setAttribute('tabindex', '-1');

                                if (setScreenReaderProps) {
                                    // Set screen reader specific props
                                    pointEl.setAttribute('role', 'img');
                                    pointEl.setAttribute('aria-label',
                                        component.stripTags(
                                            seriesA11yOptions
                                                .pointDescriptionFormatter &&
                                            seriesA11yOptions
                                                .pointDescriptionFormatter(point) ||
                                            a11yOptions.pointDescriptionFormatter &&
                                            a11yOptions
                                                .pointDescriptionFormatter(point) ||
                                            component
                                                .defaultPointDescriptionFormatter(point)
                                        ));
                                } else {
                                    pointEl.setAttribute('aria-hidden', true);
                                }
                            }
                        });
                    }

                    // Make series element accessible
                    if (chart.series.length > 1 || a11yOptions.describeSingleSeries) {
                        // Handle role attribute
                        if (seriesA11yOptions.exposeAsGroupOnly) {
                            seriesEl.setAttribute('role', 'img');
                        } else if (a11yOptions.landmarkVerbosity === 'all') {
                            seriesEl.setAttribute('role', 'region');
                        } /* else do not add role */

                        seriesEl.setAttribute('tabindex', '-1');
                        seriesEl.setAttribute(
                            'aria-label',
                            component.stripTags(
                                a11yOptions.seriesDescriptionFormatter &&
                                a11yOptions.seriesDescriptionFormatter(series) ||
                                component.defaultSeriesDescriptionFormatter(series)
                            )
                        );
                    } else {
                        seriesEl.setAttribute('aria-label', '');
                    }
                }
            },


            /**
             * Return string with information about series.
             * @private
             * @return {string}
             */
            defaultSeriesDescriptionFormatter: function (series) {
                var chart = series.chart,
                    seriesA11yOptions = series.options.accessibility || {},
                    desc = seriesA11yOptions.description,
                    description = desc && chart.langFormat(
                        'accessibility.series.description', {
                            description: desc,
                            series: series
                        }
                    ),
                    xAxisInfo = chart.langFormat(
                        'accessibility.series.xAxisDescription',
                        {
                            name: series.xAxis && series.xAxis.getDescription(),
                            series: series
                        }
                    ),
                    yAxisInfo = chart.langFormat(
                        'accessibility.series.yAxisDescription',
                        {
                            name: series.yAxis && series.yAxis.getDescription(),
                            series: series
                        }
                    ),
                    summaryContext = {
                        name: series.name || '',
                        ix: series.index + 1,
                        numSeries: chart.series && chart.series.length,
                        numPoints: series.points && series.points.length,
                        series: series
                    },
                    combination = chart.types && chart.types.length > 1 ?
                        'Combination' : '',
                    summary = chart.langFormat(
                        'accessibility.series.summary.' + series.type + combination,
                        summaryContext
                    ) || chart.langFormat(
                        'accessibility.series.summary.default' + combination,
                        summaryContext
                    );

                return summary + (description ? ' ' + description : '') + (
                    chart.yAxis && chart.yAxis.length > 1 && this.yAxis ?
                        ' ' + yAxisInfo : ''
                ) + (
                    chart.xAxis && chart.xAxis.length > 1 && this.xAxis ?
                        ' ' + xAxisInfo : ''
                );
            },


            /**
             * Return string with information about point.
             * @private
             * @return {string}
             */
            defaultPointDescriptionFormatter: function (point) {
                var series = point.series,
                    chart = series.chart,
                    a11yOptions = chart.options.accessibility,
                    tooltipOptions = point.series.tooltipOptions || {},
                    valuePrefix = a11yOptions.pointValuePrefix ||
                        tooltipOptions.valuePrefix || '',
                    valueSuffix = a11yOptions.pointValueSuffix ||
                        tooltipOptions.valueSuffix || '',
                    description = point.options && point.options.accessibility &&
                        point.options.accessibility.description,
                    timeDesc = point.getA11yTimeDescription(),
                    numberFormat = function (value) {
                        if (isNumber(value)) {
                            var lang = H.defaultOptions.lang;
                            return H.numberFormat(
                                value,
                                a11yOptions.pointValueDecimals ||
                                    tooltipOptions.valueDecimals || -1,
                                lang.decimalPoint,
                                lang.accessibility.thousandsSep ||
                                    lang.thousandsSep
                            );
                        }
                        return value;
                    },
                    showXDescription = pick(
                        series.xAxis &&
                        series.xAxis.options.accessibility &&
                        series.xAxis.options.accessibility.enabled,
                        !chart.angular
                    ),
                    pointCategory = series.xAxis && series.xAxis.categories &&
                            point.category !== undefined && '' + point.category;

                // Pick and choose properties for a succint label
                var xDesc = point.name || timeDesc ||
                    pointCategory && pointCategory.replace('<br/>', ' ') || (
                        point.id && point.id.indexOf('highcharts-') < 0 ?
                            point.id : ('x, ' + point.x)
                    ),
                    valueDesc = point.series.pointArrayMap ?
                        point.series.pointArrayMap.reduce(function (desc, key) {
                            return desc + (desc.length ? ', ' : '') + key + ': ' +
                            valuePrefix + numberFormat(
                                pick(point[key], point.options[key])
                            ) + valueSuffix;
                        }, '') :
                        (
                            point.value !== undefined ?
                                valuePrefix + numberFormat(point.value) + valueSuffix :
                                valuePrefix + numberFormat(point.y) + valueSuffix
                        );

                return (point.index !== undefined ? (point.index + 1) + '. ' : '') +
                    (showXDescription ? xDesc + ', ' : '') + valueDesc + '.' +
                    (description ? ' ' + description : '') +
                    (chart.series.length > 1 && series.name ? ' ' + series.name : '');
            }

        });


        return SeriesComponent;
    });
    _registerModule(_modules, 'modules/accessibility/components/ZoomComponent.js', [_modules['parts/Globals.js'], _modules['modules/accessibility/AccessibilityComponent.js'], _modules['modules/accessibility/KeyboardNavigationHandler.js']], function (H, AccessibilityComponent, KeyboardNavigationHandler) {
        /* *
         *
         *  (c) 2009-2019 Øystein Moseng
         *
         *  Accessibility component for chart zoom.
         *
         *  License: www.highcharts.com/license
         *
         * */




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
            } else if (direction > 0 && newMax > extremes.dataMax) {
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
         * @param {Highcharts.Chart} chart
         *        Chart object
         */
        var ZoomComponent = function (chart) {
            this.initBase(chart);
            this.init();
        };
        ZoomComponent.prototype = new AccessibilityComponent();
        H.extend(ZoomComponent.prototype, /** @lends Highcharts.ZoomComponent */ {

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
                        component.unhideElementFromScreenReaders(button.element);
                        button.element.setAttribute('tabindex', -1);
                        button.element.setAttribute('role', 'button');
                        button.element.setAttribute(
                            'aria-label',
                            chart.langFormat(
                                'accessibility.mapZoom' + (i ? 'Out' : 'In'),
                                { chart: chart }
                            )
                        );
                    });
                }
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
                var component = this,
                    chart = this.chart,
                    proxyButton = function (buttonEl, buttonProp, groupProp, label) {
                        component.removeElement(component[groupProp]);
                        component[groupProp] = component.addProxyGroup();
                        component[buttonProp] = component.createProxyButton(
                            buttonEl,
                            component[groupProp],
                            {
                                'aria-label': label,
                                tabindex: -1
                            }
                        );
                    };

                // Always start with a clean slate
                component.removeElement(component.drillUpProxyGroup);
                component.removeElement(component.resetZoomProxyGroup);

                if (chart.resetZoomButton) {
                    proxyButton(
                        chart.resetZoomButton, 'resetZoomProxyButton',
                        'resetZoomProxyGroup', chart.langFormat(
                            'accessibility.resetZoomButton',
                            { chart: chart }
                        )
                    );
                }

                if (chart.drillUpButton) {
                    proxyButton(
                        chart.drillUpButton, 'drillUpProxyButton',
                        'drillUpProxyGroup', chart.langFormat(
                            'accessibility.drillUpButton',
                            {
                                chart: chart,
                                buttonText: chart.getDrilldownBackText()
                            }
                        )
                    );
                }
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
                        // Arrow keys
                        [[
                            keys.up, keys.down, keys.left, keys.right
                        ], function (keyCode) {
                            chart[
                                keyCode === keys.up || keyCode === keys.down ?
                                    'yAxis' : 'xAxis'
                            ][0].panStep(
                                keyCode === keys.left || keyCode === keys.up ? -1 : 1
                            );
                            return this.response.success;
                        }],

                        // Tabs
                        [[
                            keys.tab
                        ], function (keyCode, e) {
                            var button;

                            // Deselect old
                            chart.mapNavButtons[
                                component.focusedMapNavButtonIx
                            ].setState(0);

                            // Trying to go somewhere we can't?
                            if (
                                e.shiftKey && !component.focusedMapNavButtonIx ||
                                !e.shiftKey && component.focusedMapNavButtonIx
                            ) {
                                chart.mapZoom(); // Reset zoom
                                // Nowhere to go, go to prev/next module
                                return this.response[e.shiftKey ? 'prev' : 'next'];
                            }

                            // Select other button
                            component.focusedMapNavButtonIx += e.shiftKey ? -1 : 1;
                            button = chart.mapNavButtons[
                                component.focusedMapNavButtonIx
                            ];
                            chart.setFocusToElement(button.box, button.element);
                            button.setState(2);

                            return this.response.success;
                        }],

                        // Press button
                        [[
                            keys.space, keys.enter
                        ], function () {
                            component.fakeClickEvent(
                                chart.mapNavButtons[
                                    component.focusedMapNavButtonIx
                                ].element
                            );
                            return this.response.success;
                        }]
                    ],

                    // Only run this module if we have map zoom on the chart
                    validate: function () {
                        return (
                            chart.mapZoom &&
                            chart.mapNavButtons &&
                            chart.mapNavButtons.length === 2
                        );
                    },

                    // Make zoom buttons do their magic
                    init: function (direction) {
                        var zoomIn = chart.mapNavButtons[0],
                            zoomOut = chart.mapNavButtons[1],
                            initialButton = direction > 0 ? zoomIn : zoomOut;
                        chart.setFocusToElement(
                            initialButton.box, initialButton.element
                        );
                        initialButton.setState(2);
                        component.focusedMapNavButtonIx = direction > 0 ? 0 : 1;
                    }
                });
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
                        // Arrow/tab just move
                        [[
                            keys.tab, keys.up, keys.down, keys.left, keys.right
                        ], function (keyCode, e) {
                            return this.response[
                                keyCode === this.tab && e.shiftKey ||
                                keyCode === keys.left || keyCode === keys.up ?
                                    'prev' : 'next'
                            ];
                        }],

                        // Select to click
                        [[
                            keys.space, keys.enter
                        ], function () {
                            onClick(chart);
                            return this.response.success;
                        }]
                    ],

                    // Only run if we have the button
                    validate: function () {
                        return chart[buttonProp] && chart[buttonProp].box &&
                            component[proxyProp];
                    },

                    // Focus button initially
                    init: function () {
                        chart.setFocusToElement(
                            chart[buttonProp].box, component[proxyProp]
                        );
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
                    this.simpleButtonNavigation(
                        'resetZoomButton',
                        'resetZoomProxyButton',
                        function (chart) {
                            chart.zoomOut();
                        }
                    ),
                    this.simpleButtonNavigation(
                        'drillUpButton',
                        'drillUpProxyButton',
                        function (chart) {
                            chart.drillUp();
                        }
                    ),
                    this.getMapZoomNavigation()
                ];
            }

        });


        return ZoomComponent;
    });
    _registerModule(_modules, 'modules/accessibility/components/RangeSelectorComponent.js', [_modules['parts/Globals.js'], _modules['modules/accessibility/AccessibilityComponent.js'], _modules['modules/accessibility/KeyboardNavigationHandler.js']], function (H, AccessibilityComponent, KeyboardNavigationHandler) {
        /* *
         *
         *  (c) 2009-2019 Øystein Moseng
         *
         *  Accessibility component for the range selector.
         *
         *  License: www.highcharts.com/license
         *
         * */




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
            var buttons = this.rangeSelector.buttons;

            // Deselect old
            if (buttons[this.highlightedRangeSelectorItemIx]) {
                buttons[this.highlightedRangeSelectorItemIx].setState(
                    this.oldRangeSelectorItemState || 0
                );
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
         * @param {Highcharts.Chart} chart
         *        Chart object
         */
        var RangeSelectorComponent = function (chart) {
            this.initBase(chart);
        };
        RangeSelectorComponent.prototype = new AccessibilityComponent();
        H.extend(RangeSelectorComponent.prototype, /** @lends Highcharts.RangeSelectorComponent */ { // eslint-disable-line

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

                // Make sure buttons are accessible and focusable
                if (rangeSelector.buttons && rangeSelector.buttons.length) {
                    rangeSelector.buttons.forEach(function (button) {
                        component.unhideElementFromScreenReaders(button.element);
                        button.element.setAttribute('tabindex', '-1');
                        button.element.setAttribute('role', 'button');
                        button.element.setAttribute(
                            'aria-label',
                            chart.langFormat(
                                'accessibility.rangeSelectorButton',
                                {
                                    chart: chart,
                                    buttonText: button.text && button.text.textStr
                                }
                            )
                        );
                    });
                }

                // Make sure input boxes are accessible and focusable
                if (rangeSelector.maxInput && rangeSelector.minInput) {
                    ['minInput', 'maxInput'].forEach(function (key, i) {
                        if (rangeSelector[key]) {
                            component.unhideElementFromScreenReaders(
                                rangeSelector[key]
                            );
                            rangeSelector[key].setAttribute('tabindex', '-1');
                            rangeSelector[key].setAttribute('role', 'textbox');
                            rangeSelector[key].setAttribute(
                                'aria-label',
                                chart.langFormat(
                                    'accessibility.rangeSelector' +
                                        (i ? 'MaxInput' : 'MinInput'), { chart: chart }
                                )
                            );
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
                var chart = this.chart,
                    keys = this.keyCodes,
                    a11yOptions = chart.options.accessibility,
                    component = this;

                return new KeyboardNavigationHandler(chart, {
                    keyCodeMap: [
                        // Left/Right/Up/Down
                        [[
                            keys.left, keys.right, keys.up, keys.down
                        ], function (keyCode) {
                            var direction = (
                                keyCode === keys.left || keyCode === keys.up
                            ) ? -1 : 1;

                            // Try to highlight next/prev button
                            if (
                                !chart.highlightRangeSelectorButton(
                                    chart.highlightedRangeSelectorItemIx + direction
                                )
                            ) {
                                // If we failed, handle wrap around/move
                                if (a11yOptions.keyboardNavigation.wrapAround) {
                                    this.init(direction);
                                    return this.response.success;
                                }
                                return this.response[direction > 0 ? 'next' : 'prev'];
                            }
                        }],

                        // Enter/Spacebar
                        [[
                            keys.enter, keys.space
                        ], function () {
                            // Don't allow click if button used to be disabled
                            if (chart.oldRangeSelectorItemState !== 3) {
                                component.fakeClickEvent(
                                    chart.rangeSelector.buttons[
                                        chart.highlightedRangeSelectorItemIx
                                    ].element
                                );
                            }
                        }]
                    ],

                    // Only run this module if we have range selector
                    validate: function () {
                        return chart.rangeSelector && chart.rangeSelector.buttons &&
                            chart.rangeSelector.buttons.length;
                    },

                    // Focus first/last button
                    init: function (direction) {
                        chart.highlightRangeSelectorButton(
                            direction > 0 ? 0 : chart.rangeSelector.buttons.length - 1
                        );
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
                var chart = this.chart,
                    keys = this.keyCodes;

                return new KeyboardNavigationHandler(chart, {
                    keyCodeMap: [
                        // Tab/Up/Down
                        [[
                            keys.tab, keys.up, keys.down
                        ], function (keyCode, e) {
                            var direction = (
                                    keyCode === keys.tab && e.shiftKey ||
                                    keyCode === keys.up
                                ) ? -1 : 1,

                                newIx = chart.highlightedInputRangeIx =
                                    chart.highlightedInputRangeIx + direction;

                            // Try to highlight next/prev item in list.
                            if (newIx > 1 || newIx < 0) { // Out of range
                                return this.response[direction > 0 ? 'next' : 'prev'];
                            }
                            chart.rangeSelector[
                                newIx ? 'maxInput' : 'minInput'
                            ].focus();
                            return this.response.success;
                        }]
                    ],

                    // Only run if we have range selector with input boxes
                    validate: function () {
                        var inputVisible = (
                            chart.rangeSelector &&
                            chart.rangeSelector.inputGroup &&
                            chart.rangeSelector.inputGroup.element
                                .getAttribute('visibility') !== 'hidden'
                        );

                        return (
                            inputVisible &&
                            chart.options.rangeSelector.inputEnabled !== false &&
                            chart.rangeSelector.minInput &&
                            chart.rangeSelector.maxInput
                        );
                    },

                    // Highlight first/last input box
                    init: function (direction) {
                        chart.highlightedInputRangeIx = direction > 0 ? 0 : 1;
                        chart.rangeSelector[
                            chart.highlightedInputRangeIx ? 'maxInput' : 'minInput'
                        ].focus();
                    },

                    // Hide HTML element when leaving boxes
                    terminate: function () {
                        var rangeSel = chart.rangeSelector;
                        if (rangeSel && rangeSel.maxInput && rangeSel.minInput) {
                            rangeSel.hideInput('max');
                            rangeSel.hideInput('min');
                        }
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
            }

        });


        return RangeSelectorComponent;
    });
    _registerModule(_modules, 'modules/accessibility/components/InfoRegionComponent.js', [_modules['parts/Globals.js'], _modules['modules/accessibility/AccessibilityComponent.js']], function (H, AccessibilityComponent) {
        /* *
         *
         *  (c) 2009-2019 Øystein Moseng
         *
         *  Accessibility component for chart info region and table.
         *
         *  License: www.highcharts.com/license
         *
         * */



        var merge = H.merge,
            pick = H.pick;


        /**
         * Return simplified text description of chart type. Some types will not be
         * familiar to most users, but in those cases we try to add a description of the
         * type.
         *
         * @private
         * @function Highcharts.Chart#getTypeDescription
         * @param {Array<string>} types The series types in this chart.
         * @return {string} The text description of the chart type.
         */
        H.Chart.prototype.getTypeDescription = function (types) {
            var firstType = types[0],
                firstSeries = this.series && this.series[0] || {},
                mapTitle = firstSeries.mapTitle,
                formatContext = {
                    numSeries: this.series.length,
                    numPoints: firstSeries.points && firstSeries.points.length,
                    chart: this,
                    mapTitle: mapTitle
                };

            if (!firstType) {
                return this.langFormat(
                    'accessibility.chartTypes.emptyChart', formatContext
                );
            }

            if (firstType === 'map') {
                return mapTitle ?
                    this.langFormat(
                        'accessibility.chartTypes.mapTypeDescription',
                        formatContext
                    ) :
                    this.langFormat(
                        'accessibility.chartTypes.unknownMap',
                        formatContext
                    );
            }

            if (this.types.length > 1) {
                return this.langFormat(
                    'accessibility.chartTypes.combinationChart', formatContext
                );
            }

            var typeDesc = this.langFormat(
                    'accessibility.seriesTypeDescriptions.' + firstType,
                    { chart: this }
                ),
                multi = this.series && this.series.length === 1 ? 'Single' : 'Multiple';

            return (
                this.langFormat(
                    'accessibility.chartTypes.' + firstType + multi,
                    formatContext
                ) ||
                this.langFormat(
                    'accessibility.chartTypes.default' + multi,
                    formatContext
                )
            ) +
            (typeDesc ? ' ' + typeDesc : '');
        };


        /**
         * The InfoRegionComponent class
         *
         * @private
         * @class
         * @name Highcharts.InfoRegionComponent
         * @param {Highcharts.Chart} chart
         *        Chart object
         */
        var InfoRegionComponent = function (chart) {
            this.initBase(chart);
            this.init();
        };
        InfoRegionComponent.prototype = new AccessibilityComponent();
        H.extend(InfoRegionComponent.prototype, /** @lends Highcharts.InfoRegionComponent */ { // eslint-disable-line

            /**
             * Init the component
             * @private
             */
            init: function () {
                // Add ID and summary attr to table HTML
                var chart = this.chart,
                    component = this;
                this.addEvent(chart, 'afterGetTable', function (e) {
                    if (chart.options.accessibility.enabled) {
                        component.tableAnchor.setAttribute('aria-expanded', true);
                        e.html = e.html
                            .replace(
                                '<table ',
                                '<table tabindex="0" summary="' + chart.langFormat(
                                    'accessibility.tableSummary', { chart: chart }
                                ) + '"'
                            );
                    }
                });

                // Focus table after viewing
                this.addEvent(chart, 'afterViewData', function (tableDiv) {
                    // Use small delay to give browsers & AT time to register new table
                    setTimeout(function () {
                        var table = tableDiv &&
                            tableDiv.getElementsByTagName('table')[0];
                        if (table && table.focus) {
                            table.focus();
                        }
                    }, 300);
                });
            },


            /**
             * Called on first render/updates to the chart, including options changes.
             */
            onChartUpdate: function () {
                // Create/update the screen reader region
                var chart = this.chart,
                    a11yOptions = chart.options.accessibility,
                    hiddenSectionId = 'highcharts-information-region-' + chart.index,
                    hiddenSection = this.screenReaderRegion =
                        this.screenReaderRegion || this.createElement('div'),
                    tableShortcut = this.tableHeading =
                        this.tableHeading || this.createElement('h6'),
                    tableShortcutAnchor = this.tableAnchor =
                        this.tableAnchor || this.createElement('a'),
                    chartHeading = this.chartHeading =
                        this.chartHeading || this.createElement('h6');

                hiddenSection.setAttribute('id', hiddenSectionId);
                if (a11yOptions.landmarkVerbosity === 'all') {
                    hiddenSection.setAttribute('role', 'region');
                }
                hiddenSection.setAttribute(
                    'aria-label',
                    chart.langFormat(
                        'accessibility.screenReaderRegionLabel', { chart: chart }
                    )
                );

                hiddenSection.innerHTML = a11yOptions.screenReaderSectionFormatter ?
                    a11yOptions.screenReaderSectionFormatter(chart) :
                    this.defaultScreenReaderSectionFormatter(chart);

                // Add shortcut to data table if export-data is loaded
                if (chart.getCSV && chart.options.accessibility.addTableShortcut) {
                    var tableId = 'highcharts-data-table-' + chart.index;
                    tableShortcutAnchor.innerHTML = chart.langFormat(
                        'accessibility.viewAsDataTable', { chart: chart }
                    );
                    tableShortcutAnchor.href = '#' + tableId;
                    // Make this unreachable by user tabbing
                    tableShortcutAnchor.setAttribute('tabindex', '-1');
                    tableShortcutAnchor.setAttribute('role', 'button');
                    tableShortcutAnchor.setAttribute('aria-expanded', false);
                    tableShortcutAnchor.onclick =
                        chart.options.accessibility.onTableAnchorClick || function () {
                            chart.viewData();
                        };
                    tableShortcut.appendChild(tableShortcutAnchor);
                    hiddenSection.appendChild(tableShortcut);
                }

                // Note: JAWS seems to refuse to read aria-label on the container, so
                // add an h6 element as title for the chart.
                chartHeading.innerHTML = chart.langFormat(
                    'accessibility.chartHeading', { chart: chart }
                );
                chartHeading.setAttribute('aria-hidden', false);
                chart.renderTo.insertBefore(chartHeading, chart.renderTo.firstChild);
                chart.renderTo.insertBefore(hiddenSection, chart.renderTo.firstChild);
                this.unhideElementFromScreenReaders(hiddenSection);

                // Visually hide the section and the chart heading
                merge(true, chartHeading.style, this.hiddenStyle);
                merge(true, hiddenSection.style, this.hiddenStyle);
            },


            /**
             * The default formatter for the screen reader section.
             * @private
             */
            defaultScreenReaderSectionFormatter: function () {
                var chart = this.chart,
                    options = chart.options,
                    chartTypes = chart.types,
                    axesDesc = this.getAxesDescription();

                return '<h5>' +
                (
                    options.accessibility.typeDescription ||
                    chart.getTypeDescription(chartTypes)
                ) + '</h5>' + (
                    options.subtitle && options.subtitle.text ?
                        '<div>' + this.htmlencode(options.subtitle.text) + '</div>' : ''
                ) + (
                    options.accessibility.description ?
                        '<div>' + options.accessibility.description + '</div>' : ''
                ) + (axesDesc.xAxis ? (
                    '<div>' + axesDesc.xAxis + '</div>'
                ) : '') +
                (axesDesc.yAxis ? (
                    '<div>' + axesDesc.yAxis + '</div>'
                ) : '');
            },


            /**
             * Return object with text description of each of the chart's axes.
             * @private
             * @return {object}
             */
            getAxesDescription: function () {
                var chart = this.chart,
                    component = this,
                    xAxes = chart.xAxis,
                    // Figure out when to show axis info in the region
                    showXAxes = xAxes.length > 1 || xAxes[0] &&
                        pick(
                            xAxes[0].options.accessibility &&
                            xAxes[0].options.accessibility.enabled,
                            !chart.angular && chart.hasCartesianSeries &&
                            chart.types.indexOf('map') < 0
                        ),
                    yAxes = chart.yAxis,
                    showYAxes = yAxes.length > 1 || yAxes[0] &&
                        pick(
                            yAxes[0].options.accessibility &&
                            yAxes[0].options.accessibility.enabled,
                            chart.hasCartesianSeries && chart.types.indexOf('map') < 0
                        ),
                    desc = {};

                if (showXAxes) {
                    desc.xAxis = chart.langFormat(
                        'accessibility.axis.xAxisDescription' + (
                            xAxes.length > 1 ? 'Plural' : 'Singular'
                        ),
                        {
                            chart: chart,
                            names: chart.xAxis.map(function (axis) {
                                return axis.getDescription();
                            }),
                            ranges: chart.xAxis.map(function (axis) {
                                return component.getAxisRangeDescription(axis);
                            }),
                            numAxes: xAxes.length
                        }
                    );
                }

                if (showYAxes) {
                    desc.yAxis = chart.langFormat(
                        'accessibility.axis.yAxisDescription' + (
                            yAxes.length > 1 ? 'Plural' : 'Singular'
                        ),
                        {
                            chart: chart,
                            names: chart.yAxis.map(function (axis) {
                                return axis.getDescription();
                            }),
                            ranges: chart.yAxis.map(function (axis) {
                                return component.getAxisRangeDescription(axis);
                            }),
                            numAxes: yAxes.length
                        }
                    );
                }

                return desc;
            },


            /**
             * Return string with text description of the axis range.
             * @private
             * @param {Highcharts.Axis} axis The axis to get range desc of.
             * @return {string} A string with the range description for the axis.
             */
            getAxisRangeDescription: function (axis) {
                var chart = this.chart,
                    axisOptions = axis.options || {};

                // Handle overridden range description
                if (
                    axisOptions.accessibility &&
                    axisOptions.accessibility.rangeDescription !== undefined
                ) {
                    return axisOptions.accessibility.rangeDescription;
                }

                // Handle category axes
                if (axis.categories) {
                    return chart.langFormat(
                        'accessibility.axis.rangeCategories',
                        {
                            chart: chart,
                            axis: axis,
                            numCategories: axis.dataMax - axis.dataMin + 1
                        }
                    );
                }

                // Use range, not from-to?
                if (axis.isDatetimeAxis && (axis.min === 0 || axis.dataMin === 0)) {
                    var range = {},
                        rangeUnit = 'Seconds';
                    range.Seconds = (axis.max - axis.min) / 1000;
                    range.Minutes = range.Seconds / 60;
                    range.Hours = range.Minutes / 60;
                    range.Days = range.Hours / 24;
                    ['Minutes', 'Hours', 'Days'].forEach(function (unit) {
                        if (range[unit] > 2) {
                            rangeUnit = unit;
                        }
                    });
                    range.value = range[rangeUnit].toFixed(
                        rangeUnit !== 'Seconds' &&
                        rangeUnit !== 'Minutes' ? 1 : 0 // Use decimals for days/hours
                    );

                    // We have the range and the unit to use, find the desc format
                    return chart.langFormat(
                        'accessibility.axis.timeRange' + rangeUnit,
                        {
                            chart: chart,
                            axis: axis,
                            range: range.value.replace('.0', '')
                        }
                    );
                }

                // Just use from and to.
                // We have the range and the unit to use, find the desc format
                var a11yOptions = chart.options.accessibility;
                return chart.langFormat(
                    'accessibility.axis.rangeFromTo',
                    {
                        chart: chart,
                        axis: axis,
                        rangeFrom: axis.isDatetimeAxis ?
                            chart.time.dateFormat(
                                a11yOptions.axisRangeDateFormat, axis.min
                            ) : axis.min,
                        rangeTo: axis.isDatetimeAxis ?
                            chart.time.dateFormat(
                                a11yOptions.axisRangeDateFormat, axis.max
                            ) : axis.max
                    }
                );
            }

        });


        return InfoRegionComponent;
    });
    _registerModule(_modules, 'modules/accessibility/components/ContainerComponent.js', [_modules['parts/Globals.js'], _modules['modules/accessibility/AccessibilityComponent.js']], function (H, AccessibilityComponent) {
        /* *
         *
         *  (c) 2009-2019 Øystein Moseng
         *
         *  Accessibility component for chart container.
         *
         *  License: www.highcharts.com/license
         *
         * */



        var doc = H.win.document;


        /**
         * The ContainerComponent class
         *
         * @private
         * @class
         * @name Highcharts.ContainerComponent
         * @param {Highcharts.Chart} chart
         *        Chart object
         */
        var ContainerComponent = function (chart) {
            this.initBase(chart);
        };
        ContainerComponent.prototype = new AccessibilityComponent();
        H.extend(ContainerComponent.prototype, /** @lends Highcharts.ContainerComponent */ { // eslint-disable-line

            /**
             * Called on first render/updates to the chart, including options changes.
             */
            onChartUpdate: function () {
                var chart = this.chart,
                    a11yOptions = chart.options.accessibility,
                    titleElement,
                    titleId = 'highcharts-title-' + chart.index,
                    chartTitle = chart.options.title.text || chart.langFormat(
                        'accessibility.defaultChartTitle', { chart: chart }
                    ),
                    svgContainerTitle = this.stripTags(chart.langFormat(
                        'accessibility.svgContainerTitle', {
                            chartTitle: chartTitle
                        }
                    )),
                    svgContainerLabel = this.stripTags(chart.langFormat(
                        'accessibility.svgContainerLabel', {
                            chartTitle: chartTitle
                        }
                    ));

                // Add SVG title tag if it is set
                if (svgContainerTitle.length) {
                    titleElement = this.svgTitleElement =
                        this.svgTitleElement || doc.createElementNS(
                            'http://www.w3.org/2000/svg',
                            'title'
                        );
                    titleElement.textContent = svgContainerTitle;
                    titleElement.id = titleId;
                    chart.renderTo.insertBefore(
                        titleElement, chart.renderTo.firstChild
                    );
                }

                // Add label to SVG container
                if (chart.renderer.box && svgContainerLabel.length) {
                    chart.renderer.box.setAttribute('aria-label', svgContainerLabel);
                }

                // Add role and label to the div
                if (a11yOptions.landmarkVerbosity !== 'disabled') {
                    chart.renderTo.setAttribute('role', 'region');
                } else {
                    chart.renderTo.removeAttribute('role');
                }
                chart.renderTo.setAttribute(
                    'aria-label',
                    chart.langFormat(
                        'accessibility.chartContainerLabel',
                        {
                            title: this.stripTags(chartTitle),
                            chart: chart
                        }
                    )
                );

                // Make credits readable by screen reader
                var creditsEl = chart.credits && chart.credits.element;
                if (creditsEl) {
                    if (chart.credits.textStr) {
                        creditsEl.setAttribute(
                            'aria-label', this.stripTags(
                                chart.langFormat(
                                    'accessibility.credits', {
                                        creditsStr: chart.credits.textStr
                                    }
                                )
                            )
                        );
                    }
                    this.unhideElementFromScreenReaders(creditsEl);
                }
            },


            /**
             * Accessibility disabled/chart destroyed.
             */
            destroy: function () {
                this.chart.renderTo.setAttribute('aria-hidden', true);
                this.destroyBase();
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
                if (
                    win.matchMedia &&
                    isMS &&
                    /Edge\/\d./i.test(win.navigator.userAgent)
                ) {
                    // Use media query for Edge
                    return win.matchMedia('(-ms-high-contrast: active)').matches;
                }
                if (isMS && win.getComputedStyle) {
                    // Test BG image for IE
                    var testDiv = doc.createElement('div');
                    testDiv.style.backgroundImage = 'url(#)';
                    doc.body.appendChild(testDiv);
                    var bi = (
                        testDiv.currentStyle || win.getComputedStyle(testDiv)
                    ).backgroundImage;
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
             * @param {Highcharts.Chart} chart The chart to set the theme of.
             */
            setHighContrastTheme: function (chart) {
                // We might want to add additional functionality here in the future for
                // storing the old state so that we can reset the theme if HC mode is
                // disabled. For now, the user will have to reload the page.

                chart.highContrastModeActive = true;

                // Apply theme to chart
                var theme = chart.options.accessibility.highContrastTheme;
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
                stops: null
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
    _registerModule(_modules, 'modules/accessibility/options.js', [], function () {
        /* *
         *
         *  (c) 2009-2019 Øystein Moseng
         *
         *  Default options for accessibility.
         *
         *  License: www.highcharts.com/license
         *
         * */


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
             * @requires module:modules/accessibility
             *
             * @since        5.0.0
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
                 * When a series contains more points than this, we no longer expose
                 * information about individual points to screen readers.
                 *
                 * Set to `false` to disable.
                 *
                 * @type  {boolean|number}
                 * @since 5.0.0
                 */
                pointDescriptionThreshold: 200,

                /**
                 * When a series contains more points than this, we no longer allow
                 * keyboard navigation for it.
                 *
                 * Set to `false` to disable.
                 *
                 * @type  {boolean|number}
                 * @since 7.1.3
                 */
                pointNavigationThreshold: false,

                /**
                 * Whether or not to add a shortcut button in the screen reader
                 * information region to show the data table.
                 * @since 7.1.0
                 */
                addTableShortcut: true,

                /**
                 * Date format to use to describe range of datetime axes.
                 *
                 * For an overview of the replacement codes, see
                 * [dateFormat](/class-reference/Highcharts#dateFormat).
                 *
                 * @see [pointDateFormat](#accessibility.pointDateFormat)
                 * @since 7.1.0
                 */
                axisRangeDateFormat: '%Y-%m-%d %H:%M:%S',

                /**
                 * Whether or not to add series descriptions to charts with a single
                 * series.
                 *
                 * @since     5.0.0
                 */
                describeSingleSeries: false,

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
                 * A hook for adding custom components to the accessibility module.
                 * Should be an object mapping component names to instances of classes
                 * inheriting from the Highcharts.AccessibilityComponent base class.
                 * Remember to add the component to the
                 * [keyboardNavigation.order](#accessibility.keyboardNavigation.order)
                 * for the keyboard navigation to be usable.
                 *
                 * @since 7.1.0
                 * @type {object}
                 * @sample highcharts/accessibility/custom-component
                 *         Custom accessibility component
                 * @apioption accessibility.customComponents
                 */

                /**
                 * Theme to apply to the chart when Windows High Contrast Mode is
                 * detected.
                 *
                 * @since 7.1.3
                 * @type {object}
                 * @apioption accessibility.highContrastTheme
                 */

                /**
                 * A text description of the chart.
                 *
                 * If the Accessibility module is loaded, this is included by default
                 * as a long description of the chart in the hidden screen reader
                 * information region.
                 *
                 * Note: It is considered a best practice to make the description of the
                 * chart visible to all users, so consider if this can be placed in text
                 * around the chart instead.
                 *
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
                 * Function to run upon clicking the "View as Data Table" link in the
                 * screen reader region.
                 *
                 * By default Highcharts will insert and set focus to a data table
                 * representation of the chart.
                 *
                 * @type      {Highcharts.ScreenReaderClickCallbackFunction}
                 * @since     5.0.0
                 * @apioption accessibility.onTableAnchorClick
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
                 * @see [pointDateFormatter](#accessibility.pointDateFormatter)
                 *
                 * @type      {string}
                 * @since     5.0.0
                 * @apioption accessibility.pointDateFormat
                 */

                /**
                 * Formatter function to determine the date/time format used with
                 * points on datetime axes when describing them to screen reader users.
                 * Receives one argument, `point`, referring to the point to describe.
                 * Should return a date format string compatible with
                 * [dateFormat](/class-reference/Highcharts#dateFormat).
                 *
                 * @see [pointDateFormat](#accessibility.pointDateFormat)
                 *
                 * @type      {Highcharts.ScreenReaderFormatterCallbackFunction<Highcharts.Point>}
                 * @since     5.0.0
                 * @apioption accessibility.pointDateFormatter
                 */

                /**
                 * Prefix to add to the values in the point descriptions. Uses
                 * [tooltip.valuePrefix](#tooltip.valuePrefix) if not defined.
                 *
                 * @type      {string}
                 * @since 7.1.0
                 * @apioption accessibility.pointValuePrefix
                 */

                /**
                 * Suffix to add to the values in the point descriptions. Uses
                 * [tooltip.valueSuffix](#tooltip.valueSuffix) if not defined.
                 *
                 * @type      {string}
                 * @since 7.1.0
                 * @apioption accessibility.pointValueSuffix
                 */

                /**
                 * Decimals to use for the values in the point descriptions. Uses
                 * [tooltip.valueDecimals](#tooltip.valueDecimals) if not defined.
                 *
                 * @type      {string}
                 * @since 7.1.0
                 * @apioption accessibility.pointValueDecimals
                 */

                /**
                 * Formatter function to use instead of the default for point
                 * descriptions.
                 * Receives one argument, `point`, referring to the point to describe.
                 * Should return a string with the description of the point for a screen
                 * reader user. If `false` is returned, the default formatter will be
                 * used for that point.
                 *
                 * @see [point.description](#series.line.data.description)
                 *
                 * @type      {Highcharts.ScreenReaderFormatterCallbackFunction<Highcharts.Point>}
                 * @since     5.0.0
                 * @apioption accessibility.pointDescriptionFormatter
                 */

                /**
                 * Formatter function to use instead of the default for series
                 * descriptions. Receives one argument, `series`, referring to the
                 * series to describe. Should return a string with the description of
                 * the series for a screen reader user. If `false` is returned, the
                 * default formatter will be used for that series.
                 *
                 * @see [series.description](#plotOptions.series.description)
                 *
                 * @type      {Highcharts.ScreenReaderFormatterCallbackFunction<Highcharts.Series>}
                 * @since     5.0.0
                 * @apioption accessibility.seriesDescriptionFormatter
                 */

                /**
                 * A formatter function to create the HTML contents of the hidden screen
                 * reader information region. Receives one argument, `chart`, referring
                 * to the chart object. Should return a string with the HTML content
                 * of the region. By default this returns an automatic description of
                 * the chart.
                 *
                 * The button to view the chart as a data table will be added
                 * automatically after the custom HTML content if enabled.
                 *
                 * @type    {Highcharts.ScreenReaderFormatterCallbackFunction<Highcharts.Chart>}
                 * @default undefined
                 * @since   5.0.0
                 * @apioption accessibility.screenReaderSectionFormatter
                 */

                /**
                 * Options for keyboard navigation.
                 *
                 * @since 5.0.0
                 */
                keyboardNavigation: {

                    /**
                     * Enable keyboard navigation for the chart.
                     *
                     * @since 5.0.0
                     */
                    enabled: true,

                    /**
                     * Set the keyboard navigation mode for the chart. Can be "normal"
                     * or "serialize". In normal mode, left/right arrow keys move
                     * between points in a series, while up/down arrow keys move between
                     * series. Up/down navigation acts intelligently to figure out which
                     * series makes sense to move to from any given point.
                     *
                     * In "serialize" mode, points are instead navigated as a single
                     * list. Left/right behaves as in "normal" mode. Up/down arrow keys
                     * will behave like left/right. This can be useful for unifying
                     * navigation behavior with/without screen readers enabled.
                     *
                     * @type       {string}
                     * @default    normal
                     * @since      6.0.4
                     * @validvalue ["normal", "serialize"]
                     * @apioption  accessibility.keyboardNavigation.mode
                     */

                    /**
                     * Skip null points when navigating through points with the
                     * keyboard.
                     *
                     * @since 5.0.0
                     */
                    skipNullPoints: true,

                    /**
                     * Options for the focus border drawn around elements while
                     * navigating through them.
                     *
                     * @sample highcharts/accessibility/custom-focus
                     *         Custom focus ring
                     *
                     * @since 6.0.3
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
                         * @default {"color": "#335cad", "lineWidth": 2, "borderRadius": 3}
                         * @since   6.0.3
                         */
                        style: {
                            /** @ignore-option */
                            color: '#335cad',
                            /** @ignore-option */
                            lineWidth: 2,
                            /** @ignore-option */
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
                     * @since 7.1.0
                     * @type {Array<string>}
                     */
                    order: ['series', 'zoom', 'rangeSelector', 'chartMenu', 'legend'],

                    /**
                     * Whether or not to wrap around when reaching the end of arrow-key
                     * navigation for an element in the chart.
                     * @since 7.1.0
                     */
                    wrapAround: true
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
                 * @since 7.1.0
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
                     * @type {Function}
                     * @default undefined
                     * @sample highcharts/accessibility/custom-dynamic
                     *         High priority live alerts
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
             * Provide a description of the data point, announced to screen readers.
             *
             * @type       {string}
             * @since 7.1.0
             * @default    undefined
             * @apioption  series.line.data.accessibility.description
             */

            /**
             * Accessibility options for a series. Requires the accessibility module.
             *
             * @requires module:modules/accessibility
             *
             * @type       {object}
             * @since 7.1.0
             * @apioption  plotOptions.series.accessibility
             */

            /**
             * Enable/disable accessibility functionality for a specific series.
             *
             * @type       {boolean}
             * @since 7.1.0
             * @default    undefined
             * @apioption  plotOptions.series.accessibility.enabled
             */

            /**
             * Provide a description of the series, announced to screen readers.
             *
             * @type       {string}
             * @since 7.1.0
             * @default    undefined
             * @apioption  plotOptions.series.accessibility.description
             */

            /**
             * Formatter function to use instead of the default for point
             * descriptions. Same as `accessibility.pointDescriptionFormatter`, but for
             * a single series.
             *
             * @see [accessibility.pointDescriptionFormatter](#accessibility.pointDescriptionFormatter)
             *
             * @type      {Function}
             * @since 7.1.0
             * @default   undefined
             * @apioption plotOptions.series.accessibility.pointDescriptionFormatter
             */

            /**
             * Expose only the series element to screen readers, not its points.
             *
             * @type       {boolean}
             * @since 7.1.0
             * @default    undefined
             * @apioption  plotOptions.series.accessibility.exposeAsGroupOnly
             */

            /**
             * Keyboard navigation for a series
             *
             * @type       {object}
             * @since 7.1.0
             * @apioption  plotOptions.series.accessibility.keyboardNavigation
             */

            /**
             * Enable/disable keyboard navigation support for a specific series.
             *
             * @type       {boolean}
             * @default    undefined
             * @since 7.1.0
             * @apioption  plotOptions.series.accessibility.keyboardNavigation.enabled
             */

            /**
             * Accessibility options for an axis. Requires the accessibility module.
             *
             * @requires module:modules/accessibility
             * @since 7.1.0
             * @type       {object}
             * @apioption  xAxis.accessibility
             */

            /**
             * Enable axis accessibility features, including axis information in the
             * screen reader information region. If this is disabled on the xAxis, the
             * x values are not exposed to screen readers for the individual data points
             * by default.
             *
             * @since 7.1.0
             * @type       {boolean}
             * @default    undefined
             * @apioption  xAxis.accessibility.enabled
             */

            /**
             * Description for an axis to expose to screen reader users.
             *
             * @since 7.1.0
             * @type       {string}
             * @default    undefined
             * @apioption  xAxis.accessibility.description
             */

            /**
             * Range description for an axis. Overrides the default range description.
             * Set to empty to disable range description for this axis.
             *
             * @since 7.1.0
             * @type       {string}
             * @default    undefined
             * @apioption  xAxis.accessibility.rangeDescription
             */


            legend: {
                /**
                 * Accessibility options for the legend. Requires the Accessibility
                 * module.
                 *
                 * @requires module:modules/accessibility
                 * @since 7.1.0
                 * @type {object}
                 * @apioption legend.accessibility
                 */
                accessibility: {

                    /**
                     * Enable accessibility support for the legend.
                     *
                     * @since 7.1.0
                     * @apioption legend.accessibility.enabled
                     */
                    enabled: true,

                    /**
                     * Options for keyboard navigation for the legend.
                     *
                     * @since 7.1.0
                     * @apioption legend.accessibility.keyboardNavigation
                     */
                    keyboardNavigation: {
                        /**
                         * Enable keyboard navigation for the legend.
                         *
                         * @since 7.1.0
                         * @see [accessibility.keyboardNavigation](
                         *      #accessibility.keyboardNavigation.enabled)
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
                 * @requires module:modules/accessibility
                 * @since 7.1.0
                 * @type {object}
                 * @apioption exporting.accessibility
                 */
                accessibility: {
                    /**
                     * Enable accessibility support for the export menu.
                     *
                     * @since 7.1.0
                     * @apioption exporting.accessibility.enabled
                     */
                    enabled: true
                }
            }

        };


        return options;
    });
    _registerModule(_modules, 'modules/accessibility/a11y-i18n.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         * Accessibility module - internationalization support
         *
         * (c) 2010-2019 Highsoft AS
         * Author: Øystein Moseng
         *
         * License: www.highcharts.com/license
         */



        var pick = H.pick;


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
            var eachStart = statement.indexOf('#each('),
                pluralStart = statement.indexOf('#plural('),
                indexStart = statement.indexOf('['),
                indexEnd = statement.indexOf(']'),
                arr,
                result;

            // Dealing with an each-function?
            if (eachStart > -1) {
                var eachEnd = statement.slice(eachStart).indexOf(')') + eachStart,
                    preEach = statement.substring(0, eachStart),
                    postEach = statement.substring(eachEnd + 1),
                    eachStatement = statement.substring(eachStart + 6, eachEnd),
                    eachArguments = eachStatement.split(','),
                    lenArg = Number(eachArguments[1]),
                    len;

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
                var pluralEnd = statement.slice(pluralStart).indexOf(')') + pluralStart,
                    pluralStatement = statement.substring(pluralStart + 8, pluralEnd),
                    pluralArguments = pluralStatement.split(','),
                    num = Number(ctx[pluralArguments[0]]);

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
                var arrayName = statement.substring(0, indexStart),
                    ix = Number(statement.substring(indexStart + 1, indexEnd)),
                    val;

                arr = ctx[arrayName];
                if (!isNaN(ix) && arr) {
                    if (ix < 0) {
                        val = arr[arr.length + ix];
                        // Handle negative overshoot
                        if (val === undefined) {
                            val = arr[0];
                        }
                    } else {
                        val = arr[ix];
                        // Handle positive overshoot
                        if (val === undefined) {
                            val = arr[arr.length - 1];
                        }
                    }
                }
                return val !== undefined ? val : '';
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
         *
         * @function Highcharts.i18nFormat
         * @requires a11y-i18n
         *
         * @param {string} formatString
         *        The string to format.
         *
         * @param {Highcharts.Dictionary<*>} context
         *        Context to apply to the format string.
         *
         * @param {Highcharts.Time} time
         *        A `Time` instance for date formatting, passed on to H.format().
         *
         * @return {string}
         *         The formatted string.
         */
        H.i18nFormat = function (formatString, context, time) {
            var getFirstBracketStatement = function (sourceStr, offset) {
                    var str = sourceStr.slice(offset || 0),
                        startBracket = str.indexOf('{'),
                        endBracket = str.indexOf('}');

                    if (startBracket > -1 && endBracket > startBracket) {
                        return {
                            statement: str.substring(startBracket + 1, endBracket),
                            begin: offset + startBracket + 1,
                            end: offset + endBracket
                        };
                    }
                },
                tokens = [],
                bracketRes,
                constRes,
                cursor = 0;

            // Tokenize format string into bracket statements and constants
            do {
                bracketRes = getFirstBracketStatement(formatString, cursor);
                constRes = formatString.substring(
                    cursor,
                    bracketRes && bracketRes.begin - 1
                );

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

                cursor = bracketRes && bracketRes.end + 1;
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
            }, ''), context, time);
        };


        /**
         * Apply context to a format string from lang options of the chart.
         *
         * @function Highcharts.Chart#langFormat
         * @requires a11y-i18n
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
        H.Chart.prototype.langFormat = function (langKey, context, time) {
            var keys = langKey.split('.'),
                formatString = this.options.lang,
                i = 0;

            for (; i < keys.length; ++i) {
                formatString = formatString && formatString[keys[i]];
            }
            return typeof formatString === 'string' && H.i18nFormat(
                formatString, context, time
            );
        };

        H.setOptions({
            lang: {

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

                    /* eslint-disable max-len */
                    screenReaderRegionLabel: 'Chart screen reader information.',
                    defaultChartTitle: 'Chart',
                    viewAsDataTable: 'View as data table.',
                    chartHeading: 'Chart graphic.',
                    chartContainerLabel: '{title}. Highcharts interactive chart.',
                    credits: 'Chart credits: {creditsStr}',
                    svgContainerLabel: 'Interactive chart',
                    rangeSelectorMinInput: 'Select start date.',
                    rangeSelectorMaxInput: 'Select end date.',
                    tableSummary: 'Table representation of chart.',
                    mapZoomIn: 'Zoom chart',
                    mapZoomOut: 'Zoom out chart',
                    resetZoomButton: 'Reset zoom',
                    drillUpButton: '{buttonText}',
                    rangeSelectorButton: 'Select range {buttonText}',
                    legendLabel: 'Toggle series visibility',
                    legendItem: 'Toggle visibility of {itemName}',
                    /* eslint-enable max-len */

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
                     * Label for the end of the chart. Announced by screen readers.
                     *
                     * @since .1.0
                     */
                    svgContainerEnd: 'End of interactive chart',

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
                        newSeriesAnnounceMultiple:
                            'New data series in chart {chartTitle}: {seriesDesc}',
                        newPointAnnounceMultiple:
                            'New data point in chart {chartTitle}: {pointDesc}'
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
                    }, /* eslint-enable max-len */

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
                    }, /* eslint-enable max-len */

                    /**
                     * Exporting menu format strings for accessibility module.
                     *
                     * @since 6.0.6
                     */
                    exporting: {
                        chartMenuLabel: 'Chart export',
                        menuButtonLabel: 'View export menu',
                        exportRegionLabel: 'Chart export menu'
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
                        }, /* eslint-enable max-len */

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
                        yAxisDescription: 'Y axis, {name}'

                    }

                }

            }
        });

    });
    _registerModule(_modules, 'modules/accessibility/accessibility.js', [_modules['parts/Globals.js'], _modules['modules/accessibility/KeyboardNavigationHandler.js'], _modules['modules/accessibility/AccessibilityComponent.js'], _modules['modules/accessibility/KeyboardNavigation.js'], _modules['modules/accessibility/components/LegendComponent.js'], _modules['modules/accessibility/components/MenuComponent.js'], _modules['modules/accessibility/components/SeriesComponent.js'], _modules['modules/accessibility/components/ZoomComponent.js'], _modules['modules/accessibility/components/RangeSelectorComponent.js'], _modules['modules/accessibility/components/InfoRegionComponent.js'], _modules['modules/accessibility/components/ContainerComponent.js'], _modules['modules/accessibility/high-contrast-mode.js'], _modules['modules/accessibility/high-contrast-theme.js'], _modules['modules/accessibility/options.js']], function (H, KeyboardNavigationHandler, AccessibilityComponent, KeyboardNavigation, LegendComponent, MenuComponent, SeriesComponent, ZoomComponent, RangeSelectorComponent, InfoRegionComponent, ContainerComponent, whcm, highContrastTheme, defaultOptions) {
        /* *
         *
         *  (c) 2009-2019 Øystein Moseng
         *
         *  Accessibility module for Highcharts
         *
         *  License: www.highcharts.com/license
         *
         * */

        /**
         * @interface Highcharts.PointAccessibilityOptionsObject
         *//**
         * Provide a description of the data point, announced to screen readers.
         * @name Highcharts.PointAccessibilityOptionsObject#description
         * @type {string|undefined}
         * @requires modules/accessibility
         * @since 7.1.0
         */

        /**
         * @interface Highcharts.PointOptionsObject
         *//**
         * @name Highcharts.PointOptionsObject#accessibility
         * @type {Highcharts.PointAccessibilityOptionsObject|undefined}
         * @requires modules/accessibility
         * @since 7.1.0
         *//**
         * A description of the point to add to the screen reader information about the
         * point. Requires the Accessibility module.
         * @name Highcharts.PointOptionsObject#description
         * @type {string|undefined}
         * @requires modules/accessibility
         * @since 5.0.0
         */



        var addEvent = H.addEvent,
            doc = H.win.document,
            pick = H.pick,
            merge = H.merge,
            extend = H.extend,
            error = H.error;


        // Add default options
        merge(true, H.defaultOptions, defaultOptions, {
            accessibility: {
                highContrastTheme: highContrastTheme
            }
        });

        // Expose classes on Highcharts namespace
        H.KeyboardNavigationHandler = KeyboardNavigationHandler;
        H.AccessibilityComponent = AccessibilityComponent;


        /*
         * Add focus border functionality to SVGElements. Draws a new rect on top of
         * element around its bounding box. This is used by multiple components.
         */
        H.extend(H.SVGElement.prototype, {

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

                this.focusBorder = this.renderer.rect(
                    bb.x - pad,
                    bb.y - pad,
                    bb.width + 2 * pad,
                    bb.height + 2 * pad,
                    style && style.borderRadius
                )
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
            var focusBorderOptions = this.options.accessibility
                    .keyboardNavigation.focusBorder,
                browserFocusElement = focusElement || svgElement.element;

            // Set browser focus if possible
            if (
                browserFocusElement &&
                browserFocusElement.focus
            ) {
                // If there is no focusin-listener, add one to work around Edge issue
                // where Narrator is not reading out points despite calling focus().
                if (!(
                    browserFocusElement.hcEvents &&
                    browserFocusElement.hcEvents.focusin
                )) {
                    addEvent(browserFocusElement, 'focusin', function () {});
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


        /**
         * Get descriptive label for axis. This is used by multiple components.
         *
         * @private
         * @function Highcharts.Axis#getDescription
         *
         * @return {string}
         */
        H.Axis.prototype.getDescription = function () {
            return (
                this.userOptions && this.userOptions.accessibility &&
                    this.userOptions.accessibility.description ||
                this.axisTitle && this.axisTitle.textStr ||
                this.options.id ||
                this.categories && 'categories' ||
                this.isDatetimeAxis && 'Time' ||
                'values'
            );
        };


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
                var a11yOptions = chart.options.accessibility;
                this.chart = chart;

                // Abort on old browsers
                if (!doc.addEventListener || !chart.renderer.isSVG) {
                    chart.renderTo.setAttribute('aria-hidden', true);
                    return;
                }

                // Copy over any deprecated options that are used. We could do this on
                // every update, but it is probably not needed.
                this.copyDeprecatedOptions();

                // Add the components
                var components = this.components = {
                    container: new ContainerComponent(chart),
                    infoRegion: new InfoRegionComponent(chart),
                    legend: new LegendComponent(chart),
                    chartMenu: new MenuComponent(chart),
                    rangeSelector: new RangeSelectorComponent(chart),
                    series: new SeriesComponent(chart),
                    zoom: new ZoomComponent(chart)
                };
                if (a11yOptions.customComponents) {
                    extend(this.components, a11yOptions.customComponents);
                }

                this.keyboardNavigation = new KeyboardNavigation(chart, components);
                this.update();
            },


            /**
             * Update all components.
             */
            update: function () {
                var components = this.components,
                    chart = this.chart,
                    a11yOptions = chart.options.accessibility;

                // Update the chart type list as this is used by multiple modules
                chart.types = this.getChartTypes();

                // Update markup
                Object.keys(components).forEach(function (componentName) {
                    components[componentName].onChartUpdate();
                });

                // Update keyboard navigation
                this.keyboardNavigation.update(
                    a11yOptions.keyboardNavigation.order
                );

                // Handle high contrast mode
                if (
                    !chart.highContrastModeActive && // Only do this once
                    whcm.isHighContrastModeActive(chart)
                ) {
                    whcm.setHighContrastTheme(chart);
                }
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
            },


            /**
             * Copy options that are deprecated over to new options. Logs warnings to
             * console for deprecated options used. The following options are
             * deprecated:
             *
             *  chart.description -> accessibility.description
             *  chart.typeDescription -> accessibility.typeDescription
             *  series.description -> series.accessibility.description
             *  series.exposeElementToA11y -> series.accessibility.exposeAsGroupOnly
             *  series.pointDescriptionFormatter ->
             *      series.accessibility.pointDescriptionFormatter
             *  series.skipKeyboardNavigation ->
             *      series.accessibility.keyboardNavigation.enabled
             *  point.description -> point.accessibility.description
             *  axis.description -> axis.accessibility.description
             *
             * @private
             */
            copyDeprecatedOptions: function () {
                var chart = this.chart,
                    // Warn user that a deprecated option was used
                    warn = function (oldOption, newOption) {
                        error(
                            'Highcharts: Deprecated option ' + oldOption +
                            ' used. Use ' + newOption + ' instead.', false, chart
                        );
                    },
                    // Set a new option on a root prop, where the option is defined as
                    // an array of suboptions.
                    traverseSetOption = function (val, optionAsArray, root) {
                        var opt = root,
                            prop,
                            i = 0;
                        for (;i < optionAsArray.length - 1; ++i) {
                            prop = optionAsArray[i];
                            opt = opt[prop] = pick(opt[prop], {});
                        }
                        opt[optionAsArray[optionAsArray.length - 1]] = val;
                    },
                    // Map of deprecated series options. New options are defined as
                    // arrays of paths under series.options.
                    oldToNewSeriesOptions = {
                        description: ['accessibility', 'description'],
                        exposeElementToA11y: ['accessibility', 'exposeAsGroupOnly'],
                        pointDescriptionFormatter: [
                            'accessibility', 'pointDescriptionFormatter'
                        ],
                        skipKeyboardNavigation: [
                            'accessibility', 'keyboardNavigation', 'enabled'
                        ]
                    };

                // Deal with chart wide options (description, typeDescription)
                var chartOptions = chart.options.chart || {},
                    a11yOptions = chart.options.accessibility || {};
                ['description', 'typeDescription'].forEach(function (prop) {
                    if (chartOptions[prop]) {
                        a11yOptions[prop] = chartOptions[prop];
                        warn('chart.' + prop, 'accessibility.' + prop);
                    }
                });

                // Deal with axis description
                chart.axes.forEach(function (axis) {
                    var opts = axis.options;
                    if (opts && opts.description) {
                        opts.accessibility = opts.accessibility || {};
                        opts.accessibility.description = opts.description;
                        warn('axis.description', 'axis.accessibility.description');
                    }
                });

                // Loop through all series and handle options
                if (!chart.series) {
                    return;
                }
                chart.series.forEach(function (series) {
                    // Handle series wide options
                    Object.keys(oldToNewSeriesOptions).forEach(function (oldOption) {
                        var optionVal = series.options[oldOption];
                        if (optionVal !== undefined) {
                            // Set the new option
                            traverseSetOption(
                                // Note that skipKeyboardNavigation has inverted option
                                // value, since we set enabled rather than disabled
                                oldOption === 'skipKeyboardNavigation' ?
                                    !optionVal : optionVal,
                                oldToNewSeriesOptions[oldOption],
                                series.options
                            );
                            warn(
                                'series.' + oldOption, 'series.' +
                                oldToNewSeriesOptions[oldOption].join('.')
                            );
                        }
                    });

                    // Loop through the points and handle point.description
                    if (series.points) {
                        series.points.forEach(function (point) {
                            if (point.options && point.options.description) {
                                point.options.accessibility =
                                    point.options.accessibility || {};
                                point.options.accessibility.description =
                                    point.options.description;
                                warn('point.description',
                                    'point.accessibility.description');
                            }
                        });
                    }
                });
            }

        };


        // Handle updates to the module and send render updates to components
        addEvent(H.Chart, 'render', function (e) {
            var a11y = this.accessibility;
            // Update/destroy
            if (this.a11yDirty && this.renderTo) {
                delete this.a11yDirty;
                var accessibilityOptions = this.options.accessibility;
                if (accessibilityOptions && accessibilityOptions.enabled) {
                    if (a11y) {
                        a11y.update();
                    } else {
                        this.accessibility = a11y = new Accessibility(this);
                    }
                } else if (a11y) {
                    // Destroy if after update we have a11y and it is disabled
                    if (a11y.destroy) {
                        a11y.destroy();
                    }
                    delete this.accessibility;
                } else {
                    // Just hide container
                    this.renderTo.setAttribute('aria-hidden', true);
                }
            }
            // Update markup regardless
            if (a11y) {
                Object.keys(a11y.components).forEach(function (componentName) {
                    a11y.components[componentName].onChartRender(e);
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