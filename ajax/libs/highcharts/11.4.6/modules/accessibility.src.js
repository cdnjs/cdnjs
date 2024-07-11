/**
 * @license Highcharts JS v11.4.6 (2024-07-08)
 *
 * Accessibility module
 *
 * (c) 2010-2024 Highsoft AS
 * Author: Oystein Moseng
 *
 * License: www.highcharts.com/license
 */
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
    _registerModule(_modules, 'Accessibility/Utils/HTMLUtilities.js', [_modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (H, U) {
        /* *
         *
         *  (c) 2009-2024 Øystein Moseng
         *
         *  Utility functions for accessibility module.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { doc, win } = H;
        const { css } = U;
        /* *
         *
         *  Constants
         *
         * */
        const simulatedEventTarget = win.EventTarget && new win.EventTarget() || 'none';
        /* *
         *
         *  Functions
         *
         * */
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
                el.className += ' ' + className;
            }
        }
        /**
         * @private
         * @param {Highcharts.HTMLDOMElement} el
         * @param {string} className
         * @return {void}
         */
        function removeClass(el, className) {
            if (el.classList) {
                el.classList.remove(className);
            }
            else {
                // Note: Dumb logic that will break if the element has a class name that
                // consists of className plus something else.
                el.className = el.className.replace(new RegExp(className, 'g'), '');
            }
        }
        /**
         * Utility function to clone a mouse event for re-dispatching.
         * @private
         */
        function cloneMouseEvent(e) {
            if (typeof win.MouseEvent === 'function') {
                return new win.MouseEvent(e.type, e);
            }
            // No MouseEvent support, try using initMouseEvent
            if (doc.createEvent) {
                const evt = doc.createEvent('MouseEvent');
                if (evt.initMouseEvent) {
                    evt.initMouseEvent(e.type, e.bubbles, // #10561, #12161
                    e.cancelable, e.view || win, e.detail, e.screenX, e.screenY, e.clientX, e.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, e.button, e.relatedTarget);
                    return evt;
                }
            }
            return getFakeMouseEvent(e.type);
        }
        /**
         * Utility function to clone a touch event for re-dispatching.
         * @private
         */
        function cloneTouchEvent(e) {
            const touchListToTouchArray = (l) => {
                const touchArray = [];
                for (let i = 0; i < l.length; ++i) {
                    const item = l.item(i);
                    if (item) {
                        touchArray.push(item);
                    }
                }
                return touchArray;
            };
            if (typeof win.TouchEvent === 'function') {
                const newEvent = new win.TouchEvent(e.type, {
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
            const fakeEvt = cloneMouseEvent(e);
            fakeEvt.touches = e.touches;
            fakeEvt.changedTouches = e.changedTouches;
            fakeEvt.targetTouches = e.targetTouches;
            return fakeEvt;
        }
        /**
         * @private
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
         * @private
         */
        function getElement(id) {
            return doc.getElementById(id);
        }
        /**
         * Get a fake mouse event of a given type. If relatedTarget is not given,
         * it will point to simulatedEventTarget, as an indicator that the event
         * is fake.
         * @private
         */
        function getFakeMouseEvent(type, position, relatedTarget) {
            const pos = position || {
                x: 0,
                y: 0
            };
            if (typeof win.MouseEvent === 'function') {
                return new win.MouseEvent(type, {
                    bubbles: true,
                    cancelable: true,
                    composed: true,
                    button: 0,
                    buttons: 1,
                    relatedTarget: relatedTarget || simulatedEventTarget,
                    view: win,
                    detail: type === 'click' ? 1 : 0,
                    screenX: pos.x,
                    screenY: pos.y,
                    clientX: pos.x,
                    clientY: pos.y
                });
            }
            // No MouseEvent support, try using initMouseEvent
            if (doc.createEvent) {
                const evt = doc.createEvent('MouseEvent');
                if (evt.initMouseEvent) {
                    evt.initMouseEvent(type, true, // Bubble
                    true, // Cancel
                    win, // View
                    type === 'click' ? 1 : 0, // Detail
                    // Coords
                    pos.x, pos.y, pos.x, pos.y, 
                    // Pressed keys
                    false, false, false, false, 0, // Button
                    null // Related target
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
            const getIncreasedHeadingLevel = (tagName) => {
                const headingLevel = parseInt(tagName.slice(1), 10), newLevel = Math.min(6, headingLevel + 1);
                return 'h' + newLevel;
            };
            const isHeading = (tagName) => /^H[1-6]$/i.test(tagName);
            const getPreviousSiblingsHeading = (el) => {
                let sibling = el;
                while (sibling = sibling.previousSibling) { // eslint-disable-line
                    const tagName = sibling.tagName || '';
                    if (isHeading(tagName)) {
                        return tagName;
                    }
                }
                return '';
            };
            const getHeadingRecursive = (el) => {
                const prevSiblingsHeading = getPreviousSiblingsHeading(el);
                if (prevSiblingsHeading) {
                    return getIncreasedHeadingLevel(prevSiblingsHeading);
                }
                // No previous siblings are headings, try parent node
                const parent = el.parentElement;
                if (!parent) {
                    return 'p';
                }
                const parentTagName = parent.tagName;
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
         * Remove all child nodes from an element.
         * @private
         * @param {Highcharts.HTMLDOMElement|Highcharts.SVGDOMElement} [element]
         * @return {void}
         */
        function removeChildNodes(element) {
            while (element.lastChild) {
                element.removeChild(element.lastChild);
            }
        }
        /**
         * Utility function. Reverses child nodes of a DOM element.
         * @private
         */
        function reverseChildNodes(node) {
            let i = node.childNodes.length;
            while (i--) {
                node.appendChild(node.childNodes[i]);
            }
        }
        /**
         * Used for aria-label attributes, painting on a canvas will fail if the
         * text contains tags.
         * @private
         */
        function stripHTMLTagsFromString(str, isForExport = false) {
            return (typeof str === 'string') ?
                (isForExport ?
                    str.replace(/<\/?[^>]+(>|$)/g, '') :
                    str.replace(/<\/?(?!\s)[^>]+(>|$)/g, '')) : str;
        }
        /**
         * Utility function for hiding an element visually, but still keeping it
         * available to screen reader users.
         * @private
         */
        function visuallyHideElement(element) {
            css(element, {
                position: 'absolute',
                width: '1px',
                height: '1px',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                clip: 'rect(1px, 1px, 1px, 1px)',
                marginTop: '-3px',
                '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=1)',
                filter: 'alpha(opacity=1)',
                opacity: 0.01
            });
        }
        /* *
         *
         *  Default Export
         *
         * */
        const HTMLUtilities = {
            addClass,
            cloneMouseEvent,
            cloneTouchEvent,
            escapeStringForHTML,
            getElement,
            getFakeMouseEvent,
            getHeadingTagNameForElement,
            removeChildNodes,
            removeClass,
            removeElement,
            reverseChildNodes,
            simulatedEventTarget,
            stripHTMLTagsFromString,
            visuallyHideElement
        };

        return HTMLUtilities;
    });
    _registerModule(_modules, 'Accessibility/A11yI18n.js', [_modules['Core/Templating.js'], _modules['Core/Utilities.js']], function (F, U) {
        /* *
         *
         *  Accessibility module - internationalization support
         *
         *  (c) 2010-2024 Highsoft AS
         *  Author: Øystein Moseng
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { format } = F;
        const { getNestedProperty, pick } = U;
        /* *
         *
         *  Composition
         *
         * */
        var A11yI18nComposition;
        (function (A11yI18nComposition) {
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
            /**
             * @private
             */
            function compose(ChartClass) {
                const chartProto = ChartClass.prototype;
                if (!chartProto.langFormat) {
                    chartProto.langFormat = langFormat;
                }
            }
            A11yI18nComposition.compose = compose;
            /**
             * I18n utility function.  Format a single array or plural statement in a
             * format string.  If the statement is not an array or plural statement,
             * returns the statement within brackets.  Invalid array statements return
             * an empty string.
             *
             * @private
             * @function formatExtendedStatement
             * @param {string} statement
             * @param {Highcharts.Dictionary<*>} ctx
             * Context to apply to the format string.
             */
            function formatExtendedStatement(statement, ctx) {
                const eachStart = statement.indexOf('#each('), pluralStart = statement.indexOf('#plural('), indexStart = statement.indexOf('['), indexEnd = statement.indexOf(']');
                let arr, result;
                // Dealing with an each-function?
                if (eachStart > -1) {
                    const eachEnd = statement.slice(eachStart).indexOf(')') + eachStart, preEach = statement.substring(0, eachStart), postEach = statement.substring(eachEnd + 1), eachStatement = statement.substring(eachStart + 6, eachEnd), eachArguments = eachStatement.split(',');
                    let lenArg = Number(eachArguments[1]), len;
                    result = '';
                    arr = getNestedProperty(eachArguments[0], ctx);
                    if (arr) {
                        lenArg = isNaN(lenArg) ? arr.length : lenArg;
                        len = lenArg < 0 ?
                            arr.length + lenArg :
                            Math.min(lenArg, arr.length); // Overshoot
                        // Run through the array for the specified length
                        for (let i = 0; i < len; ++i) {
                            result += preEach + arr[i] + postEach;
                        }
                    }
                    return result.length ? result : '';
                }
                // Dealing with a plural-function?
                if (pluralStart > -1) {
                    const pluralEnd = (statement.slice(pluralStart).indexOf(')') + pluralStart), pluralStatement = statement.substring(pluralStart + 8, pluralEnd), pluralArguments = pluralStatement.split(','), num = Number(getNestedProperty(pluralArguments[0], ctx));
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
                    const arrayName = statement.substring(0, indexStart), ix = Number(statement.substring(indexStart + 1, indexEnd));
                    let val;
                    arr = getNestedProperty(arrayName, ctx);
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
            /* eslint-disable max-len */
            /**
             * i18n formatting function.  Extends Highcharts.format() functionality by
             * also handling arrays and plural conditionals.  Arrays can be indexed as
             * follows:
             *
             * - Format: 'This is the first index: {myArray[0]}. The last: {myArray[-1]}.'
             *
             * - Context: { myArray: [0, 1, 2, 3, 4, 5] }
             *
             * - Result: 'This is the first index: 0. The last: 5.'
             *
             *
             * They can also be iterated using the #each() function.  This will repeat
             * the contents of the bracket expression for each element.  Example:
             *
             * - Format: 'List contains: {#each(myArray)cm }'
             *
             * - Context: { myArray: [0, 1, 2] }
             *
             * - Result: 'List contains: 0cm 1cm 2cm '
             *
             *
             * The #each() function optionally takes a length parameter.  If positive,
             * this parameter specifies the max number of elements to iterate through.
             * If negative, the function will subtract the number from the length of the
             * array.  Use this to stop iterating before the array ends.  Example:
             *
             * - Format: 'List contains: {#each(myArray, -1) }and {myArray[-1]}.'
             *
             * - Context: { myArray: [0, 1, 2, 3] }
             *
             * - Result: 'List contains: 0, 1, 2, and 3.'
             *
             *
             * Use the #plural() function to pick a string depending on whether or not a
             * context object is 1.  Arguments are #plural(obj, plural, singular).
             * Example:
             *
             * - Format: 'Has {numPoints} {#plural(numPoints, points, point}.'
             *
             * - Context: { numPoints: 5 }
             *
             * - Result: 'Has 5 points.'
             *
             *
             * Optionally there are additional parameters for dual and none:
             * #plural(obj, plural, singular, dual, none).  Example:
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
             * The string to format.
             *
             * @param {Highcharts.Dictionary<*>} context
             * Context to apply to the format string.
             *
             * @param {Highcharts.Chart} chart
             * A `Chart` instance with a time object and numberFormatter, passed on to
             * format().
             *
             * @deprecated
             *
             * @return {string}
             * The formatted string.
             */
            function i18nFormat(formatString, context, chart) {
                const getFirstBracketStatement = (sourceStr, offset) => {
                    const str = sourceStr.slice(offset || 0), startBracket = str.indexOf('{'), endBracket = str.indexOf('}');
                    if (startBracket > -1 && endBracket > startBracket) {
                        return {
                            statement: str.substring(startBracket + 1, endBracket),
                            begin: offset + startBracket + 1,
                            end: offset + endBracket
                        };
                    }
                }, tokens = [];
                let bracketRes, constRes, cursor = 0;
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
                // Perform the formatting.  The formatArrayStatement function returns
                // the statement in brackets if it is not an array statement, which
                // means it gets picked up by format below.
                tokens.forEach((token) => {
                    if (token.type === 'statement') {
                        token.value = formatExtendedStatement(token.value, context);
                    }
                });
                // Join string back together and pass to format to pick up non-array
                // statements.
                return format(tokens.reduce((acc, cur) => acc + cur.value, ''), context, chart);
            }
            A11yI18nComposition.i18nFormat = i18nFormat;
            /* eslint-enable max-len */
            /**
             * Apply context to a format string from lang options of the chart.
             *
             * @requires modules/accessibility
             *
             * @function Highcharts.Chart#langFormat
             *
             * @param {string} langKey
             * Key (using dot notation) into lang option structure.
             *
             * @param {Highcharts.Dictionary<*>} context
             * Context to apply to the format string.
             *
             * @return {string}
             * The formatted string.
             */
            function langFormat(langKey, context) {
                const keys = langKey.split('.');
                let formatString = this.options.lang, i = 0;
                for (; i < keys.length; ++i) {
                    formatString = formatString && formatString[keys[i]];
                }
                return typeof formatString === 'string' ?
                    i18nFormat(formatString, context, this) : '';
            }
            /**
             * @private
             * @function stringTrim
             *
             * @param {string} str
             * The input string
             *
             * @return {string}
             * The trimmed string
             */
            function stringTrim(str) {
                return str.trim && str.trim() || str.replace(/^\s+|\s+$/g, '');
            }
        })(A11yI18nComposition || (A11yI18nComposition = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return A11yI18nComposition;
    });
    _registerModule(_modules, 'Accessibility/Utils/ChartUtilities.js', [_modules['Core/Globals.js'], _modules['Accessibility/Utils/HTMLUtilities.js'], _modules['Core/Utilities.js']], function (H, HU, U) {
        /* *
         *
         *  (c) 2009-2024 Øystein Moseng
         *
         *  Utils for dealing with charts.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { doc } = H;
        const { stripHTMLTagsFromString: stripHTMLTags } = HU;
        const { defined, find, fireEvent } = U;
        /* *
         *
         *  Functions
         *
         * */
        /* eslint-disable valid-jsdoc */
        /**
         * Fire an event on an element that is either wrapped by Highcharts,
         * or a DOM element.
         * @private
         */
        function fireEventOnWrappedOrUnwrappedElement(el, eventObject) {
            const type = eventObject.type;
            const hcEvents = el.hcEvents;
            if (!!doc.createEvent &&
                (el.dispatchEvent || el.fireEvent)) {
                if (el.dispatchEvent) {
                    el.dispatchEvent(eventObject);
                }
                else {
                    el.fireEvent(type, eventObject);
                }
            }
            else if (hcEvents && hcEvents[type]) {
                fireEvent(el, type, eventObject);
            }
            else if (el.element) {
                fireEventOnWrappedOrUnwrappedElement(el.element, eventObject);
            }
        }
        /**
         * @private
         */
        function getChartTitle(chart) {
            return stripHTMLTags(chart.options.title.text ||
                chart.langFormat('accessibility.defaultChartTitle', { chart: chart }), chart.renderer.forExport);
        }
        /**
         * Return string with the axis name/title.
         * @private
         */
        function getAxisDescription(axis) {
            return axis && (axis.options.accessibility?.description ||
                axis.axisTitle?.textStr ||
                axis.options.id ||
                axis.categories && 'categories' ||
                axis.dateTime && 'Time' ||
                'values');
        }
        /**
         * Return string with text description of the axis range.
         * @private
         * @param {Highcharts.Axis} axis
         * The axis to get range desc of.
         * @return {string}
         * A string with the range description for the axis.
         */
        function getAxisRangeDescription(axis) {
            const axisOptions = axis.options || {};
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
         * @private
         */
        function getCategoryAxisRangeDesc(axis) {
            const chart = axis.chart;
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
         * @private
         */
        function getAxisTimeLengthDesc(axis) {
            const chart = axis.chart, range = {}, min = axis.dataMin || axis.min || 0, max = axis.dataMax || axis.max || 0;
            let rangeUnit = 'Seconds';
            range.Seconds = (max - min) / 1000;
            range.Minutes = range.Seconds / 60;
            range.Hours = range.Minutes / 60;
            range.Days = range.Hours / 24;
            ['Minutes', 'Hours', 'Days'].forEach(function (unit) {
                if (range[unit] > 2) {
                    rangeUnit = unit;
                }
            });
            const rangeValue = range[rangeUnit].toFixed(rangeUnit !== 'Seconds' &&
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
         * @private
         */
        function getAxisFromToDescription(axis) {
            const chart = axis.chart, options = chart.options, dateRangeFormat = (options &&
                options.accessibility &&
                options.accessibility.screenReaderSection.axisRangeDateFormat ||
                ''), extremes = {
                min: axis.dataMin || axis.min || 0,
                max: axis.dataMax || axis.max || 0
            }, format = function (key) {
                return axis.dateTime ?
                    chart.time.dateFormat(dateRangeFormat, extremes[key]) :
                    extremes[key].toString();
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
                const firstPointWithGraphic = find(series.points, (p) => !!p.graphic);
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
            const firstPointEl = getSeriesFirstPointElement(series);
            return (firstPointEl &&
                firstPointEl.parentNode || series.graph &&
                series.graph.element || series.group &&
                series.group.element); // Could be tracker series depending on series type
        }
        /**
         * Remove aria-hidden from element. Also unhides parents of the element, and
         * hides siblings that are not explicitly unhidden.
         * @private
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
         */
        function hideSeriesFromAT(series) {
            const seriesEl = getSeriesA11yElement(series);
            if (seriesEl) {
                seriesEl.setAttribute('aria-hidden', true);
            }
        }
        /**
         * Get series objects by series name.
         * @private
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
         */
        function getPointFromXY(series, x, y) {
            let i = series.length, res;
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
         */
        function getRelativePointAxisPosition(axis, point) {
            if (!defined(axis.dataMin) || !defined(axis.dataMax)) {
                return 0;
            }
            const axisStart = axis.toPixels(axis.dataMin), axisEnd = axis.toPixels(axis.dataMax), 
            // We have to use pixel position because of axis breaks, log axis etc.
            positionProp = axis.coll === 'xAxis' ? 'x' : 'y', pointPos = axis.toPixels(point[positionProp] || 0);
            return (pointPos - axisStart) / (axisEnd - axisStart);
        }
        /**
         * Get relative position of point on an x/y axis from 0 to 1.
         * @private
         */
        function scrollAxisToPoint(point) {
            const xAxis = point.series.xAxis, yAxis = point.series.yAxis, axis = (xAxis && xAxis.scrollbar ? xAxis : yAxis), scrollbar = (axis && axis.scrollbar);
            if (scrollbar && defined(scrollbar.to) && defined(scrollbar.from)) {
                const range = scrollbar.to - scrollbar.from;
                const pos = getRelativePointAxisPosition(axis, point);
                scrollbar.updatePosition(pos - range / 2, pos + range / 2);
                fireEvent(scrollbar, 'changed', {
                    from: scrollbar.from,
                    to: scrollbar.to,
                    trigger: 'scrollbar',
                    DOMEvent: null
                });
            }
        }
        /* *
         *
         *  Default Export
         *
         * */
        const ChartUtilities = {
            fireEventOnWrappedOrUnwrappedElement,
            getChartTitle,
            getAxisDescription,
            getAxisRangeDescription,
            getPointFromXY,
            getSeriesFirstPointElement,
            getSeriesFromName,
            getSeriesA11yElement,
            unhideChartElementFromAT,
            hideSeriesFromAT,
            scrollAxisToPoint
        };

        return ChartUtilities;
    });
    _registerModule(_modules, 'Accessibility/Utils/DOMElementProvider.js', [_modules['Core/Globals.js'], _modules['Accessibility/Utils/HTMLUtilities.js']], function (H, HU) {
        /* *
         *
         *  (c) 2009-2024 Øystein Moseng
         *
         *  Class that can keep track of elements added to DOM and clean them up on
         *  destroy.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { doc } = H;
        const { removeElement } = HU;
        /* *
         *
         *  Class
         *
         * */
        /**
         * @private
         */
        class DOMElementProvider {
            /* *
             *
             *  Constructor
             *
             * */
            constructor() {
                this.elements = [];
            }
            /**
             * Create an element and keep track of it for later removal.
             * Same args as document.createElement
             * @private
             */
            createElement() {
                const el = doc.createElement.apply(doc, arguments);
                this.elements.push(el);
                return el;
            }
            /**
             * Destroy created element, removing it from the DOM.
             * @private
             */
            removeElement(element) {
                removeElement(element);
                this.elements.splice(this.elements.indexOf(element), 1);
            }
            /**
             * Destroy all created elements, removing them from the DOM.
             * @private
             */
            destroyCreatedElements() {
                this.elements.forEach(function (element) {
                    removeElement(element);
                });
                this.elements = [];
            }
        }
        /* *
         *
         *  Default Export
         *
         * */

        return DOMElementProvider;
    });
    _registerModule(_modules, 'Accessibility/Utils/EventProvider.js', [_modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (H, U) {
        /* *
         *
         *  (c) 2009-2024 Øystein Moseng
         *
         *  Class that can keep track of events added, and clean them up on destroy.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { addEvent } = U;
        /**
         * @private
         */
        class EventProvider {
            /* *
             *
             *  Constructor
             *
             * */
            constructor() {
                this.eventRemovers = [];
            }
            /**
             * Add an event to an element and keep track of it for later removal.
             * Same args as Highcharts.addEvent.
             * @private
             */
            addEvent() {
                const remover = addEvent.apply(H, arguments);
                this.eventRemovers.push({
                    element: arguments[0], // HTML element
                    remover
                });
                return remover;
            }
            /**
             * Remove added event.
             * @private
             */
            removeEvent(event) {
                const pos = this.eventRemovers.map((e) => e.remover).indexOf(event);
                this.eventRemovers[pos].remover();
                this.eventRemovers.splice(pos, 1);
            }
            /**
             * Remove all added events.
             * @private
             */
            removeAddedEvents() {
                this.eventRemovers.map((e) => e.remover)
                    .forEach((remover) => remover());
                this.eventRemovers = [];
            }
        }
        /* *
         *
         *  Default Export
         *
         * */

        return EventProvider;
    });
    _registerModule(_modules, 'Accessibility/AccessibilityComponent.js', [_modules['Accessibility/Utils/ChartUtilities.js'], _modules['Accessibility/Utils/DOMElementProvider.js'], _modules['Accessibility/Utils/EventProvider.js'], _modules['Accessibility/Utils/HTMLUtilities.js'], _modules['Core/Utilities.js']], function (CU, DOMElementProvider, EventProvider, HU, U) {
        /* *
         *
         *  (c) 2009-2024 Øystein Moseng
         *
         *  Accessibility component class definition
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { fireEventOnWrappedOrUnwrappedElement } = CU;
        const { getFakeMouseEvent } = HU;
        const { extend } = U;
        /* *
         *
         *  Class
         *
         * */
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
         * @requires modules/accessibility
         * @class
         * @name Highcharts.AccessibilityComponent
         */
        class AccessibilityComponent {
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Initialize the class
             * @private
             * @param {Highcharts.Chart} chart The chart object
             * @param {Highcharts.ProxyProvider} proxyProvider The proxy provider of the accessibility module
             */
            initBase(chart, proxyProvider) {
                this.chart = chart;
                this.eventProvider = new EventProvider();
                this.domElementProvider = new DOMElementProvider();
                this.proxyProvider = proxyProvider;
                // Key code enum for common keys
                this.keyCodes = {
                    left: 37,
                    right: 39,
                    up: 38,
                    down: 40,
                    enter: 13,
                    space: 32,
                    esc: 27,
                    tab: 9,
                    pageUp: 33,
                    pageDown: 34,
                    end: 35,
                    home: 36
                };
            }
            /**
             * Add an event to an element and keep track of it for later removal.
             * See EventProvider for details.
             * @private
             */
            addEvent(el, type, fn, options) {
                return this.eventProvider.addEvent(el, type, fn, options);
            }
            /**
             * Create an element and keep track of it for later removal.
             * See DOMElementProvider for details.
             * @private
             */
            createElement(tagName, options) {
                return this.domElementProvider.createElement(tagName, options);
            }
            /**
             * Fire a fake click event on an element. It is useful to have this on
             * AccessibilityComponent for users of custom components.
             */
            fakeClickEvent(el) {
                const fakeEvent = getFakeMouseEvent('click');
                fireEventOnWrappedOrUnwrappedElement(el, fakeEvent);
            }
            /**
             * Remove traces of the component.
             * @private
             */
            destroyBase() {
                this.domElementProvider.destroyCreatedElements();
                this.eventProvider.removeAddedEvents();
            }
        }
        extend(AccessibilityComponent.prototype, 
        /** @lends Highcharts.AccessibilityComponent */
        {
            /**
             * Called on component initialization.
             */
            init() { },
            /**
             * Get keyboard navigation handler for this component.
             * @private
             */
            getKeyboardNavigation: function () { },
            /**
             * Called on updates to the chart, including options changes.
             * Note that this is also called on first render of chart.
             */
            onChartUpdate() { },
            /**
             * Called on every chart render.
             */
            onChartRender() { },
            /**
             * Called when accessibility is disabled or chart is destroyed.
             */
            destroy() { }
        });
        /* *
         *
         *  Default Export
         *
         * */

        return AccessibilityComponent;
    });
    _registerModule(_modules, 'Accessibility/KeyboardNavigationHandler.js', [_modules['Core/Utilities.js']], function (U) {
        /* *
         *
         *  (c) 2009-2024 Øystein Moseng
         *
         *  Keyboard navigation handler base class definition
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { find } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Define a keyboard navigation handler for use with a
         * Highcharts.AccessibilityComponent instance. This functions as an abstraction
         * layer for keyboard navigation, and defines a map of keyCodes to handler
         * functions.
         *
         * @requires modules/accessibility
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
        class KeyboardNavigationHandler {
            /* *
             *
             *  Constructor
             *
             * */
            constructor(chart, options) {
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
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Find handler function(s) for key code in the keyCodeMap and run it.
             *
             * @function KeyboardNavigationHandler#run
             * @param {global.KeyboardEvent} e
             * @return {number} Returns a response code indicating whether the run was
             *      a success/fail/unhandled, or if we should move to next/prev module.
             */
            run(e) {
                const keyCode = e.which || e.keyCode;
                let response = this.response.noHandler;
                const handlerCodeSet = find(this.keyCodeMap, function (codeSet) {
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
        }
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
        (''); // Keeps doclets above in JS file

        return KeyboardNavigationHandler;
    });
    _registerModule(_modules, 'Accessibility/Components/ContainerComponent.js', [_modules['Accessibility/AccessibilityComponent.js'], _modules['Accessibility/KeyboardNavigationHandler.js'], _modules['Accessibility/Utils/ChartUtilities.js'], _modules['Core/Globals.js'], _modules['Accessibility/Utils/HTMLUtilities.js']], function (AccessibilityComponent, KeyboardNavigationHandler, CU, H, HU) {
        /* *
         *
         *  (c) 2009-2024 Øystein Moseng
         *
         *  Accessibility component for chart container.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { unhideChartElementFromAT, getChartTitle } = CU;
        const { doc } = H;
        const { stripHTMLTagsFromString: stripHTMLTags } = HU;
        /**
         * The ContainerComponent class
         *
         * @private
         * @class
         * @name Highcharts.ContainerComponent
         */
        class ContainerComponent extends AccessibilityComponent {
            /* *
             *
             *  Functions
             *
             * */
            /* eslint-disable valid-jsdoc */
            /**
             * Called on first render/updates to the chart, including options changes.
             */
            onChartUpdate() {
                this.handleSVGTitleElement();
                this.setSVGContainerLabel();
                this.setGraphicContainerAttrs();
                this.setRenderToAttrs();
                this.makeCreditsAccessible();
            }
            /**
             * @private
             */
            handleSVGTitleElement() {
                const chart = this.chart, titleId = 'highcharts-title-' + chart.index, titleContents = stripHTMLTags(chart.langFormat('accessibility.svgContainerTitle', {
                    chartTitle: getChartTitle(chart)
                }));
                if (titleContents.length) {
                    const titleElement = this.svgTitleElement =
                        this.svgTitleElement || doc.createElementNS('http://www.w3.org/2000/svg', 'title');
                    titleElement.textContent = titleContents;
                    titleElement.id = titleId;
                    chart.renderTo.insertBefore(titleElement, chart.renderTo.firstChild);
                }
            }
            /**
             * @private
             */
            setSVGContainerLabel() {
                const chart = this.chart, svgContainerLabel = chart.langFormat('accessibility.svgContainerLabel', {
                    chartTitle: getChartTitle(chart)
                });
                if (chart.renderer.box && svgContainerLabel.length) {
                    chart.renderer.box.setAttribute('aria-label', svgContainerLabel);
                }
            }
            /**
             * @private
             */
            setGraphicContainerAttrs() {
                const chart = this.chart, label = chart.langFormat('accessibility.graphicContainerLabel', {
                    chartTitle: getChartTitle(chart)
                });
                if (label.length) {
                    chart.container.setAttribute('aria-label', label);
                }
            }
            /**
             * Set attributes on the chart container element.
             * @private
             */
            setRenderToAttrs() {
                const chart = this.chart, shouldHaveLandmark = chart.options.accessibility
                    .landmarkVerbosity !== 'disabled', containerLabel = chart.langFormat('accessibility.chartContainerLabel', {
                    title: getChartTitle(chart),
                    chart: chart
                });
                if (containerLabel) {
                    chart.renderTo.setAttribute('role', shouldHaveLandmark ? 'region' : 'group');
                    chart.renderTo.setAttribute('aria-label', containerLabel);
                }
            }
            /**
             * @private
             */
            makeCreditsAccessible() {
                const chart = this.chart, credits = chart.credits;
                if (credits) {
                    if (credits.textStr) {
                        credits.element.setAttribute('aria-label', chart.langFormat('accessibility.credits', {
                            creditsStr: stripHTMLTags(credits.textStr, chart.renderer.forExport)
                        }));
                    }
                    unhideChartElementFromAT(chart, credits.element);
                }
            }
            /**
             * Empty handler to just set focus on chart
             * @private
             */
            getKeyboardNavigation() {
                const chart = this.chart;
                return new KeyboardNavigationHandler(chart, {
                    keyCodeMap: [],
                    validate: function () {
                        return true;
                    },
                    init: function () {
                        const a11y = chart.accessibility;
                        if (a11y) {
                            a11y.keyboardNavigation.tabindexContainer.focus();
                        }
                    }
                });
            }
            /**
             * Accessibility disabled/chart destroyed.
             */
            destroy() {
                this.chart.renderTo.setAttribute('aria-hidden', true);
            }
        }
        /* *
         *
         *  Default Export
         *
         * */

        return ContainerComponent;
    });
    _registerModule(_modules, 'Accessibility/FocusBorder.js', [_modules['Core/Utilities.js']], function (U) {
        /* *
         *
         *  (c) 2009-2024 Øystein Moseng
         *
         *  Extend SVG and Chart classes with focus border capabilities.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { addEvent, pick } = U;
        /* *
         *
         *  Composition
         *
         * */
        var FocusBorderComposition;
        (function (FocusBorderComposition) {
            /* *
             *
             *  Declarations
             *
             * */
            /* *
             *
             *  Constants
             *
             * */
            // Attributes that trigger a focus border update
            const svgElementBorderUpdateTriggers = [
                'x', 'y', 'transform', 'width', 'height', 'r', 'd', 'stroke-width'
            ];
            /* *
             *
             *  Functions
             *
             * */
            /**
             * @private
             */
            function compose(ChartClass, SVGElementClass) {
                const chartProto = ChartClass.prototype, svgElementProto = SVGElementClass.prototype;
                if (!chartProto.renderFocusBorder) {
                    chartProto.renderFocusBorder = chartRenderFocusBorder;
                    chartProto.setFocusToElement = chartSetFocusToElement;
                }
                if (!svgElementProto.addFocusBorder) {
                    svgElementProto.addFocusBorder = svgElementAddFocusBorder;
                    svgElementProto.removeFocusBorder = svgElementRemoveFocusBorder;
                }
            }
            FocusBorderComposition.compose = compose;
            /**
             * Redraws the focus border on the currently focused element.
             *
             * @private
             * @function Highcharts.Chart#renderFocusBorder
             */
            function chartRenderFocusBorder() {
                const focusElement = this.focusElement, focusBorderOptions = this.options.accessibility.keyboardNavigation.focusBorder;
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
            }
            /**
             * Set chart's focus to an SVGElement. Calls focus() on it, and draws the
             * focus border. This is used by multiple components.
             *
             * @private
             * @function Highcharts.Chart#setFocusToElement
             *
             * @param {Highcharts.SVGElement} svgElement
             * Element to draw the border around.
             *
             * @param {SVGDOMElement|HTMLDOMElement} [focusElement]
             * If supplied, it draws the border around svgElement and sets the focus to
             * focusElement.
             */
            function chartSetFocusToElement(svgElement, focusElement) {
                const focusBorderOptions = this.options.accessibility.keyboardNavigation.focusBorder, browserFocusElement = focusElement || svgElement.element;
                // Set browser focus if possible
                if (browserFocusElement &&
                    browserFocusElement.focus) {
                    // If there is no focusin-listener, add one to work around Edge
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
            }
            /**
             * Add hook to destroy focus border if SVG element is destroyed, unless
             * hook already exists.
             * @private
             * @param el Element to add destroy hook to
             */
            function svgElementAddDestroyFocusBorderHook(el) {
                if (el.focusBorderDestroyHook) {
                    return;
                }
                const origDestroy = el.destroy;
                el.destroy = function () {
                    if (el.focusBorder && el.focusBorder.destroy) {
                        el.focusBorder.destroy();
                    }
                    return origDestroy.apply(el, arguments);
                };
                el.focusBorderDestroyHook = origDestroy;
            }
            /**
             * Add focus border functionality to SVGElements. Draws a new rect on top of
             * element around its bounding box. This is used by multiple components.
             *
             * @private
             * @function Highcharts.SVGElement#addFocusBorder
             *
             * @param {number} margin
             *
             * @param {SVGAttributes} attribs
             */
            function svgElementAddFocusBorder(margin, attribs) {
                // Allow updating by just adding new border
                if (this.focusBorder) {
                    this.removeFocusBorder();
                }
                // Add the border rect
                const bb = this.getBBox(), pad = pick(margin, 3), parent = this.parentGroup, scaleX = this.scaleX || parent && parent.scaleX, scaleY = this.scaleY || parent && parent.scaleY, oneDefined = scaleX ? !scaleY : scaleY, scaleBoth = oneDefined ? Math.abs(scaleX || scaleY || 1) :
                    (Math.abs(scaleX || 1) + Math.abs(scaleY || 1)) / 2;
                bb.x += this.translateX ? this.translateX : 0;
                bb.y += this.translateY ? this.translateY : 0;
                let borderPosX = bb.x - pad, borderPosY = bb.y - pad, borderWidth = bb.width + 2 * pad, borderHeight = bb.height + 2 * pad;
                /**
                 * For text elements, apply x and y offset, #11397.
                 * @private
                 */
                function getTextAnchorCorrection(text) {
                    let posXCorrection = 0, posYCorrection = 0;
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
                const isLabel = !!this.text;
                if (this.element.nodeName === 'text' || isLabel) {
                    const isRotated = !!this.rotation;
                    const correction = !isLabel ? getTextAnchorCorrection(this) :
                        {
                            x: isRotated ? 1 : 0,
                            y: 0
                        };
                    const attrX = +this.attr('x');
                    const attrY = +this.attr('y');
                    if (!isNaN(attrX)) {
                        borderPosX = attrX - (bb.width * correction.x) - pad;
                    }
                    if (!isNaN(attrY)) {
                        borderPosY = attrY - (bb.height * correction.y) - pad;
                    }
                    if (isLabel && isRotated) {
                        const temp = borderWidth;
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
                this.focusBorder = this.renderer.rect(borderPosX, borderPosY, borderWidth, borderHeight, parseInt((attribs && attribs.r || 0).toString(), 10) / scaleBoth)
                    .addClass('highcharts-focus-border')
                    .attr({
                    zIndex: 99
                })
                    .add(parent);
                if (!this.renderer.styledMode) {
                    this.focusBorder.attr({
                        stroke: attribs && attribs.stroke,
                        'stroke-width': (attribs && attribs.strokeWidth || 0) / scaleBoth
                    });
                }
                avgElementAddUpdateFocusBorderHooks(this, margin, attribs);
                svgElementAddDestroyFocusBorderHook(this);
            }
            /**
             * Add hooks to update the focus border of an element when the element
             * size/position is updated, unless already added.
             * @private
             * @param el Element to add update hooks to
             * @param updateParams Parameters to pass through to addFocusBorder when updating.
             */
            function avgElementAddUpdateFocusBorderHooks(el, ...updateParams) {
                if (el.focusBorderUpdateHooks) {
                    return;
                }
                el.focusBorderUpdateHooks = {};
                svgElementBorderUpdateTriggers.forEach((trigger) => {
                    const setterKey = trigger + 'Setter';
                    const origSetter = el[setterKey] || el._defaultSetter;
                    el.focusBorderUpdateHooks[setterKey] = origSetter;
                    el[setterKey] = function () {
                        const ret = origSetter.apply(el, arguments);
                        el.addFocusBorder.apply(el, updateParams);
                        return ret;
                    };
                });
            }
            /**
             * Remove hook from SVG element added by addDestroyFocusBorderHook, if
             * existing.
             * @private
             * @param el Element to remove destroy hook from
             */
            function svgElementRemoveDestroyFocusBorderHook(el) {
                if (!el.focusBorderDestroyHook) {
                    return;
                }
                el.destroy = el.focusBorderDestroyHook;
                delete el.focusBorderDestroyHook;
            }
            /**
             * Add focus border functionality to SVGElements. Draws a new rect on top of
             * element around its bounding box. This is used by multiple components.
             * @private
             * @function Highcharts.SVGElement#removeFocusBorder
             */
            function svgElementRemoveFocusBorder() {
                svgElementRemoveUpdateFocusBorderHooks(this);
                svgElementRemoveDestroyFocusBorderHook(this);
                if (this.focusBorder) {
                    this.focusBorder.destroy();
                    delete this.focusBorder;
                }
            }
            /**
             * Remove hooks from SVG element added by addUpdateFocusBorderHooks, if
             * existing.
             * @private
             * @param el Element to remove update hooks from
             */
            function svgElementRemoveUpdateFocusBorderHooks(el) {
                if (!el.focusBorderUpdateHooks) {
                    return;
                }
                Object.keys(el.focusBorderUpdateHooks).forEach((setterKey) => {
                    const origSetter = el.focusBorderUpdateHooks[setterKey];
                    if (origSetter === el._defaultSetter) {
                        delete el[setterKey];
                    }
                    else {
                        el[setterKey] = origSetter;
                    }
                });
                delete el.focusBorderUpdateHooks;
            }
        })(FocusBorderComposition || (FocusBorderComposition = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return FocusBorderComposition;
    });
    _registerModule(_modules, 'Accessibility/Utils/Announcer.js', [_modules['Core/Renderer/HTML/AST.js'], _modules['Accessibility/Utils/DOMElementProvider.js'], _modules['Core/Globals.js'], _modules['Accessibility/Utils/HTMLUtilities.js'], _modules['Core/Utilities.js']], function (AST, DOMElementProvider, H, HU, U) {
        /* *
         *
         *  (c) 2009-2024 Øystein Moseng
         *
         *  Create announcer to speak messages to screen readers and other AT.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { doc } = H;
        const { addClass, visuallyHideElement } = HU;
        const { attr } = U;
        /* *
         *
         *  Class
         *
         * */
        class Announcer {
            /* *
             *
             *  Constructor
             *
             * */
            constructor(chart, type) {
                this.chart = chart;
                this.domElementProvider = new DOMElementProvider();
                this.announceRegion = this.addAnnounceRegion(type);
            }
            /* *
             *
             *  Functions
             *
             * */
            destroy() {
                this.domElementProvider.destroyCreatedElements();
            }
            announce(message) {
                AST.setElementHTML(this.announceRegion, message);
                // Delete contents after a little while to avoid user finding the live
                // region in the DOM.
                if (this.clearAnnouncementRegionTimer) {
                    clearTimeout(this.clearAnnouncementRegionTimer);
                }
                this.clearAnnouncementRegionTimer = setTimeout(() => {
                    this.announceRegion.innerHTML = AST.emptyHTML;
                    delete this.clearAnnouncementRegionTimer;
                }, 3000);
            }
            addAnnounceRegion(type) {
                const chartContainer = (this.chart.announcerContainer || this.createAnnouncerContainer()), div = this.domElementProvider.createElement('div');
                attr(div, {
                    'aria-hidden': false,
                    'aria-live': type,
                    'aria-atomic': true
                });
                if (this.chart.styledMode) {
                    addClass(div, 'highcharts-visually-hidden');
                }
                else {
                    visuallyHideElement(div);
                }
                chartContainer.appendChild(div);
                return div;
            }
            createAnnouncerContainer() {
                const chart = this.chart, container = doc.createElement('div');
                attr(container, {
                    'aria-hidden': false,
                    'class': 'highcharts-announcer-container'
                });
                container.style.position = 'relative';
                chart.renderTo.insertBefore(container, chart.renderTo.firstChild);
                chart.announcerContainer = container;
                return container;
            }
        }
        /* *
         *
         *  Default Export
         *
         * */

        return Announcer;
    });
    _registerModule(_modules, 'Accessibility/Components/AnnotationsA11y.js', [_modules['Accessibility/Utils/HTMLUtilities.js']], function (HTMLUtilities) {
        /* *
         *
         *  (c) 2009-2024 Øystein Moseng
         *
         *  Annotations accessibility code.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { escapeStringForHTML, stripHTMLTagsFromString } = HTMLUtilities;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Get list of all annotation labels in the chart.
         *
         * @private
         * @param {Highcharts.Chart} chart The chart to get annotation info on.
         * @return {Array<object>} The labels, or empty array if none.
         */
        function getChartAnnotationLabels(chart) {
            const annotations = chart.annotations || [];
            return annotations.reduce((acc, cur) => {
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
         * @param {Object} label The annotation label object
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
         * @param {Object} label The annotation label object to describe
         * @return {string} The description for the label.
         */
        function getAnnotationLabelDescription(label) {
            const a11yDesc = (label.options &&
                label.options.accessibility &&
                label.options.accessibility.description);
            if (a11yDesc) {
                return a11yDesc;
            }
            const chart = label.chart;
            const labelText = getLabelText(label);
            const points = label.points;
            const getAriaLabel = (point) => (point.graphic &&
                point.graphic.element &&
                point.graphic.element.getAttribute('aria-label') ||
                '');
            const getValueDesc = (point) => {
                const valDesc = (point.accessibility &&
                    point.accessibility.valueDescription ||
                    getAriaLabel(point));
                const seriesName = (point &&
                    point.series.name ||
                    '');
                return (seriesName ? seriesName + ', ' : '') + 'data point ' + valDesc;
            };
            const pointValueDescriptions = points
                .filter((p) => !!p.graphic) // Filter out mock points
                .map(getValueDesc)
                // Filter out points we can't describe
                .filter((desc) => !!desc);
            const numPoints = pointValueDescriptions.length;
            const pointsSelector = numPoints > 1 ?
                'MultiplePoints' : numPoints ?
                'SinglePoint' : 'NoPoints';
            const langFormatStr = ('accessibility.screenReaderSection.annotations.description' +
                pointsSelector);
            const context = {
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
            const labels = getChartAnnotationLabels(chart);
            return labels.map((label) => {
                const desc = escapeStringForHTML(stripHTMLTagsFromString(getAnnotationLabelDescription(label), chart.renderer.forExport));
                return desc ? `<li>${desc}</li>` : '';
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
            const annotations = chart.annotations;
            if (!(annotations && annotations.length)) {
                return '';
            }
            const annotationItems = getAnnotationListItems(chart);
            return `<ul style="list-style-type: none">${annotationItems.join(' ')}</ul>`;
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
            const labels = getChartAnnotationLabels(point.series.chart);
            const pointLabels = labels
                .filter((label) => label.points.indexOf(point) > -1);
            if (!pointLabels.length) {
                return [];
            }
            return pointLabels.map((label) => `${getLabelText(label)}`);
        }
        /* *
         *
         *  Default Export
         *
         * */
        const AnnotationsA11y = {
            getAnnotationsInfoHTML,
            getAnnotationLabelDescription,
            getAnnotationListItems,
            getPointAnnotationTexts
        };

        return AnnotationsA11y;
    });
    _registerModule(_modules, 'Accessibility/Components/InfoRegionsComponent.js', [_modules['Accessibility/A11yI18n.js'], _modules['Accessibility/AccessibilityComponent.js'], _modules['Accessibility/Utils/Announcer.js'], _modules['Accessibility/Components/AnnotationsA11y.js'], _modules['Core/Renderer/HTML/AST.js'], _modules['Accessibility/Utils/ChartUtilities.js'], _modules['Core/Templating.js'], _modules['Core/Globals.js'], _modules['Accessibility/Utils/HTMLUtilities.js'], _modules['Core/Utilities.js']], function (A11yI18n, AccessibilityComponent, Announcer, AnnotationsA11y, AST, CU, F, H, HU, U) {
        /* *
         *
         *  (c) 2009-2024 Øystein Moseng
         *
         *  Accessibility component for chart info region and table.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { getAnnotationsInfoHTML } = AnnotationsA11y;
        const { getAxisDescription, getAxisRangeDescription, getChartTitle, unhideChartElementFromAT } = CU;
        const { format } = F;
        const { doc } = H;
        const { addClass, getElement, getHeadingTagNameForElement, stripHTMLTagsFromString, visuallyHideElement } = HU;
        const { attr, pick, replaceNested } = U;
        /* *
         *
         *  Functions
         *
         * */
        /* eslint-disable valid-jsdoc */
        /**
         * @private
         */
        function getTableSummary(chart) {
            return chart.langFormat('accessibility.table.tableSummary', { chart: chart });
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
            const firstType = types[0], typeExplanation = chart.langFormat('accessibility.seriesTypeDescriptions.' + firstType, context), multi = chart.series && chart.series.length < 2 ? 'Single' : 'Multiple';
            return (chart.langFormat('accessibility.chartTypes.' + firstType + multi, context) ||
                chart.langFormat('accessibility.chartTypes.default' + multi, context)) + (typeExplanation ? ' ' + typeExplanation : '');
        }
        /**
         * Return simplified explanation of chart type. Some types will not be
         * familiar to most users, but in those cases we try to add an explanation
         * of the type.
         *
         * @private
         * @function Highcharts.Chart#getTypeDescription
         * @param {Array<string>} types The series types in this chart.
         * @return {string} The text description of the chart type.
         */
        function getTypeDescription(chart, types) {
            const firstType = types[0], firstSeries = chart.series && chart.series[0] || {}, mapTitle = chart.mapView && chart.mapView.geoMap &&
                chart.mapView.geoMap.title, formatContext = {
                numSeries: chart.series.length,
                numPoints: firstSeries.points && firstSeries.points.length,
                chart,
                mapTitle
            };
            if (!firstType) {
                return getTypeDescForEmptyChart(chart, formatContext);
            }
            if (firstType === 'map' || firstType === 'tiledwebmap') {
                return getTypeDescForMapChart(chart, formatContext);
            }
            if (chart.types.length > 1) {
                return getTypeDescForCombinationChart(chart, formatContext);
            }
            return buildTypeDescriptionFromSeries(chart, types, formatContext);
        }
        /**
         * @private
         */
        function stripEmptyHTMLTags(str) {
            // Scan alert #[71]: Loop for nested patterns
            return replaceNested(str, [/<([\w\-.:!]+)\b[^<>]*>\s*<\/\1>/g, '']);
        }
        /* *
         *
         *  Class
         *
         * */
        /**
         * The InfoRegionsComponent class
         *
         * @private
         * @class
         * @name Highcharts.InfoRegionsComponent
         */
        class InfoRegionsComponent extends AccessibilityComponent {
            constructor() {
                /* *
                 *
                 *  Properties
                 *
                 * */
                super(...arguments);
                this.screenReaderSections = {};
            }
            /* *
             *
             *  Functions
             *
             * */
            /* eslint-disable valid-jsdoc */
            /**
             * Init the component
             * @private
             */
            init() {
                const chart = this.chart;
                const component = this;
                this.initRegionsDefinitions();
                this.addEvent(chart, 'aftergetTableAST', function (e) {
                    component.onDataTableCreated(e);
                });
                this.addEvent(chart, 'afterViewData', function (e) {
                    if (e.wasHidden) {
                        component.dataTableDiv = e.element;
                        // Use a small delay to give browsers & AT time to
                        // register the new table.
                        setTimeout(function () {
                            component.focusDataTable();
                        }, 300);
                    }
                });
                this.addEvent(chart, 'afterHideData', function () {
                    if (component.viewDataTableButton) {
                        component.viewDataTableButton
                            .setAttribute('aria-expanded', 'false');
                    }
                });
                this.announcer = new Announcer(chart, 'assertive');
            }
            /**
             * @private
             */
            initRegionsDefinitions() {
                const component = this, accessibilityOptions = this.chart.options.accessibility;
                this.screenReaderSections = {
                    before: {
                        element: null,
                        buildContent: function (chart) {
                            const formatter = accessibilityOptions.screenReaderSection
                                .beforeChartFormatter;
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
                            const formatter = accessibilityOptions.screenReaderSection
                                .afterChartFormatter;
                            return formatter ? formatter(chart) :
                                component.defaultAfterChartFormatter();
                        },
                        insertIntoDOM: function (el, chart) {
                            chart.renderTo.insertBefore(el, chart.container.nextSibling);
                        },
                        afterInserted: function () {
                            if (component.chart.accessibility &&
                                accessibilityOptions.keyboardNavigation.enabled) {
                                component.chart.accessibility
                                    .keyboardNavigation.updateExitAnchor(); // #15986
                            }
                        }
                    }
                };
            }
            /**
             * Called on chart render. Have to update the sections on render, in order
             * to get a11y info from series.
             */
            onChartRender() {
                const component = this;
                this.linkedDescriptionElement = this.getLinkedDescriptionElement();
                this.setLinkedDescriptionAttrs();
                Object.keys(this.screenReaderSections).forEach(function (regionKey) {
                    component.updateScreenReaderSection(regionKey);
                });
            }
            /**
             * @private
             */
            getLinkedDescriptionElement() {
                const chartOptions = this.chart.options, linkedDescOption = chartOptions.accessibility.linkedDescription;
                if (!linkedDescOption) {
                    return;
                }
                if (typeof linkedDescOption !== 'string') {
                    return linkedDescOption;
                }
                const query = format(linkedDescOption, this.chart), queryMatch = doc.querySelectorAll(query);
                if (queryMatch.length === 1) {
                    return queryMatch[0];
                }
            }
            /**
             * @private
             */
            setLinkedDescriptionAttrs() {
                const el = this.linkedDescriptionElement;
                if (el) {
                    el.setAttribute('aria-hidden', 'true');
                    addClass(el, 'highcharts-linked-description');
                }
            }
            /**
             * @private
             * @param {string} regionKey
             * The name/key of the region to update
             */
            updateScreenReaderSection(regionKey) {
                const chart = this.chart;
                const region = this.screenReaderSections[regionKey];
                const content = region.buildContent(chart);
                const sectionDiv = region.element = (region.element || this.createElement('div'));
                const hiddenDiv = (sectionDiv.firstChild || this.createElement('div'));
                if (content) {
                    this.setScreenReaderSectionAttribs(sectionDiv, regionKey);
                    AST.setElementHTML(hiddenDiv, content);
                    sectionDiv.appendChild(hiddenDiv);
                    region.insertIntoDOM(sectionDiv, chart);
                    if (chart.styledMode) {
                        addClass(hiddenDiv, 'highcharts-visually-hidden');
                    }
                    else {
                        visuallyHideElement(hiddenDiv);
                    }
                    unhideChartElementFromAT(chart, hiddenDiv);
                    if (region.afterInserted) {
                        region.afterInserted();
                    }
                }
                else {
                    if (sectionDiv.parentNode) {
                        sectionDiv.parentNode.removeChild(sectionDiv);
                    }
                    region.element = null;
                }
            }
            /**
             * Apply a11y attributes to a screen reader info section
             * @private
             * @param {Highcharts.HTMLDOMElement} sectionDiv The section element
             * @param {string} regionKey Name/key of the region we are setting attrs for
             */
            setScreenReaderSectionAttribs(sectionDiv, regionKey) {
                const chart = this.chart, labelText = chart.langFormat('accessibility.screenReaderSection.' + regionKey +
                    'RegionLabel', { chart: chart, chartTitle: getChartTitle(chart) }), sectionId = `highcharts-screen-reader-region-${regionKey}-${chart.index}`;
                attr(sectionDiv, {
                    id: sectionId,
                    'aria-label': labelText || void 0
                });
                // Sections are wrapped to be positioned relatively to chart in case
                // elements inside are tabbed to.
                sectionDiv.style.position = 'relative';
                if (labelText) {
                    sectionDiv.setAttribute('role', chart.options.accessibility.landmarkVerbosity === 'all' ?
                        'region' : 'group');
                }
            }
            /**
             * @private
             */
            defaultBeforeChartFormatter() {
                const chart = this.chart, format = chart.options.accessibility.screenReaderSection
                    .beforeChartFormat;
                if (!format) {
                    return '';
                }
                const axesDesc = this.getAxesDescription(), shouldHaveSonifyBtn = (chart.sonify &&
                    chart.options.sonification &&
                    chart.options.sonification.enabled), sonifyButtonId = 'highcharts-a11y-sonify-data-btn-' +
                    chart.index, dataTableButtonId = 'hc-linkto-highcharts-data-table-' +
                    chart.index, annotationsList = getAnnotationsInfoHTML(chart), annotationsTitleStr = chart.langFormat('accessibility.screenReaderSection.annotations.heading', { chart: chart }), context = {
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
                }, formattedString = A11yI18n.i18nFormat(format, context, chart);
                this.dataTableButtonId = dataTableButtonId;
                this.sonifyButtonId = sonifyButtonId;
                return stripEmptyHTMLTags(formattedString);
            }
            /**
             * @private
             */
            defaultAfterChartFormatter() {
                const chart = this.chart;
                const format = chart.options.accessibility.screenReaderSection
                    .afterChartFormat;
                if (!format) {
                    return '';
                }
                const context = { endOfChartMarker: this.getEndOfChartMarkerText() };
                const formattedString = A11yI18n.i18nFormat(format, context, chart);
                return stripEmptyHTMLTags(formattedString);
            }
            /**
             * @private
             */
            getLinkedDescription() {
                const el = this.linkedDescriptionElement, content = el && el.innerHTML || '';
                return stripHTMLTagsFromString(content, this.chart.renderer.forExport);
            }
            /**
             * @private
             */
            getLongdescText() {
                const chartOptions = this.chart.options, captionOptions = chartOptions.caption, captionText = captionOptions && captionOptions.text, linkedDescription = this.getLinkedDescription();
                return (chartOptions.accessibility.description ||
                    linkedDescription ||
                    captionText ||
                    '');
            }
            /**
             * @private
             */
            getTypeDescriptionText() {
                const chart = this.chart;
                return chart.types ?
                    chart.options.accessibility.typeDescription ||
                        getTypeDescription(chart, chart.types) : '';
            }
            /**
             * @private
             */
            getDataTableButtonText(buttonId) {
                const chart = this.chart, buttonText = chart.langFormat('accessibility.table.viewAsDataTableButtonText', { chart: chart, chartTitle: getChartTitle(chart) });
                return '<button id="' + buttonId + '">' + buttonText + '</button>';
            }
            /**
             * @private
             */
            getSonifyButtonText(buttonId) {
                const chart = this.chart;
                if (chart.options.sonification &&
                    chart.options.sonification.enabled === false) {
                    return '';
                }
                const buttonText = chart.langFormat('accessibility.sonification.playAsSoundButtonText', { chart: chart, chartTitle: getChartTitle(chart) });
                return '<button id="' + buttonId + '">' + buttonText + '</button>';
            }
            /**
             * @private
             */
            getSubtitleText() {
                const subtitle = (this.chart.options.subtitle);
                return stripHTMLTagsFromString(subtitle && subtitle.text || '', this.chart.renderer.forExport);
            }
            /**
             * @private
             */
            getEndOfChartMarkerText() {
                const endMarkerId = `highcharts-end-of-chart-marker-${this.chart.index}`, endMarker = getElement(endMarkerId);
                if (endMarker) {
                    return endMarker.outerHTML;
                }
                const chart = this.chart, markerText = chart.langFormat('accessibility.screenReaderSection.endOfChartMarker', { chart: chart }), id = 'highcharts-end-of-chart-marker-' + chart.index;
                return '<div id="' + id + '">' + markerText + '</div>';
            }
            /**
             * @private
             * @param {Highcharts.Dictionary<string>} e
             */
            onDataTableCreated(e) {
                const chart = this.chart;
                if (chart.options.accessibility.enabled) {
                    if (this.viewDataTableButton) {
                        this.viewDataTableButton.setAttribute('aria-expanded', 'true');
                    }
                    const attributes = e.tree.attributes || {};
                    attributes.tabindex = -1;
                    attributes.summary = getTableSummary(chart);
                    e.tree.attributes = attributes;
                }
            }
            /**
             * @private
             */
            focusDataTable() {
                const tableDiv = this.dataTableDiv, table = tableDiv && tableDiv.getElementsByTagName('table')[0];
                if (table && table.focus) {
                    table.focus();
                }
            }
            /**
             * @private
             * @param {string} sonifyButtonId
             */
            initSonifyButton(sonifyButtonId) {
                const el = this.sonifyButton = getElement(sonifyButtonId);
                const chart = this.chart;
                const defaultHandler = (e) => {
                    if (el) {
                        el.setAttribute('aria-hidden', 'true');
                        el.setAttribute('aria-label', '');
                    }
                    e.preventDefault();
                    e.stopPropagation();
                    const announceMsg = chart.langFormat('accessibility.sonification.playAsSoundClickAnnouncement', { chart: chart });
                    this.announcer.announce(announceMsg);
                    setTimeout(() => {
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
                    el.setAttribute('tabindex', -1);
                    el.onclick = function (e) {
                        const onPlayAsSoundClick = (chart.options.accessibility &&
                            chart.options.accessibility.screenReaderSection
                                .onPlayAsSoundClick);
                        (onPlayAsSoundClick || defaultHandler).call(this, e, chart);
                    };
                }
            }
            /**
             * Set attribs and handlers for default viewAsDataTable button if exists.
             * @private
             * @param {string} tableButtonId
             */
            initDataTableButton(tableButtonId) {
                const el = this.viewDataTableButton = getElement(tableButtonId), chart = this.chart, tableId = tableButtonId.replace('hc-linkto-', '');
                if (el) {
                    attr(el, {
                        tabindex: -1,
                        'aria-expanded': !!getElement(tableId)
                    });
                    el.onclick = chart.options.accessibility
                        .screenReaderSection.onViewDataTableClick ||
                        function () {
                            chart.viewData();
                        };
                }
            }
            /**
             * Return object with text description of each of the chart's axes.
             * @private
             */
            getAxesDescription() {
                const chart = this.chart, shouldDescribeColl = function (collectionKey, defaultCondition) {
                    const axes = chart[collectionKey];
                    return axes.length > 1 || axes[0] &&
                        pick(axes[0].options.accessibility &&
                            axes[0].options.accessibility.enabled, defaultCondition);
                }, hasNoMap = !!chart.types &&
                    chart.types.indexOf('map') < 0 &&
                    chart.types.indexOf('treemap') < 0 &&
                    chart.types.indexOf('tilemap') < 0, hasCartesian = !!chart.hasCartesianSeries, showXAxes = shouldDescribeColl('xAxis', !chart.angular && hasCartesian && hasNoMap), showYAxes = shouldDescribeColl('yAxis', hasCartesian && hasNoMap), desc = {};
                if (showXAxes) {
                    desc.xAxis = this.getAxisDescriptionText('xAxis');
                }
                if (showYAxes) {
                    desc.yAxis = this.getAxisDescriptionText('yAxis');
                }
                return desc;
            }
            /**
             * @private
             */
            getAxisDescriptionText(collectionKey) {
                const chart = this.chart;
                const axes = chart[collectionKey];
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
            }
            /**
             * Remove component traces
             */
            destroy() {
                if (this.announcer) {
                    this.announcer.destroy();
                }
            }
        }
        /* *
         *
         *  Default Export
         *
         * */

        return InfoRegionsComponent;
    });
    _registerModule(_modules, 'Accessibility/Components/MenuComponent.js', [_modules['Core/Utilities.js'], _modules['Accessibility/AccessibilityComponent.js'], _modules['Accessibility/KeyboardNavigationHandler.js'], _modules['Accessibility/Utils/ChartUtilities.js'], _modules['Accessibility/Utils/HTMLUtilities.js']], function (U, AccessibilityComponent, KeyboardNavigationHandler, ChartUtilities, HTMLUtilities) {
        /* *
         *
         *  (c) 2009-2024 Øystein Moseng
         *
         *  Accessibility component for exporting menu.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { attr } = U;
        const { getChartTitle, unhideChartElementFromAT } = ChartUtilities;
        const { getFakeMouseEvent } = HTMLUtilities;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Get the wrapped export button element of a chart.
         * @private
         */
        function getExportMenuButtonElement(chart) {
            return chart.exportSVGElements && chart.exportSVGElements[0];
        }
        /**
         * @private
         */
        function exportingShouldHaveA11y(chart) {
            const exportingOpts = chart.options.exporting, exportButton = getExportMenuButtonElement(chart);
            return !!(exportingOpts &&
                exportingOpts.enabled !== false &&
                exportingOpts.accessibility &&
                exportingOpts.accessibility.enabled &&
                exportButton &&
                exportButton.element);
        }
        /* *
         *
         *  Class
         *
         * */
        /**
         * The MenuComponent class
         *
         * @private
         * @class
         * @name Highcharts.MenuComponent
         */
        class MenuComponent extends AccessibilityComponent {
            /* *
             *
             *  Functions
             *
             * */
            /* eslint-disable valid-jsdoc */
            /**
             * Init the component
             */
            init() {
                const chart = this.chart, component = this;
                this.addEvent(chart, 'exportMenuShown', function () {
                    component.onMenuShown();
                });
                this.addEvent(chart, 'exportMenuHidden', function () {
                    component.onMenuHidden();
                });
                this.createProxyGroup();
            }
            /**
             * @private
             */
            onMenuHidden() {
                const menu = this.chart.exportContextMenu;
                if (menu) {
                    menu.setAttribute('aria-hidden', 'true');
                }
                this.setExportButtonExpandedState('false');
            }
            /**
             * @private
             */
            onMenuShown() {
                const chart = this.chart, menu = chart.exportContextMenu;
                if (menu) {
                    this.addAccessibleContextMenuAttribs();
                    unhideChartElementFromAT(chart, menu);
                }
                this.setExportButtonExpandedState('true');
            }
            /**
             * @private
             * @param {string} stateStr
             */
            setExportButtonExpandedState(stateStr) {
                if (this.exportButtonProxy) {
                    this.exportButtonProxy.innerElement.setAttribute('aria-expanded', stateStr);
                }
            }
            /**
             * Called on each render of the chart. We need to update positioning of the
             * proxy overlay.
             */
            onChartRender() {
                const chart = this.chart, focusEl = chart.focusElement, a11y = chart.accessibility;
                this.proxyProvider.clearGroup('chartMenu');
                this.proxyMenuButton();
                if (this.exportButtonProxy &&
                    focusEl &&
                    focusEl === chart.exportingGroup) {
                    if (focusEl.focusBorder) {
                        chart.setFocusToElement(focusEl, this.exportButtonProxy.innerElement);
                    }
                    else if (a11y) {
                        a11y.keyboardNavigation.tabindexContainer.focus();
                    }
                }
            }
            /**
             * @private
             */
            proxyMenuButton() {
                const chart = this.chart;
                const proxyProvider = this.proxyProvider;
                const buttonEl = getExportMenuButtonElement(chart);
                if (exportingShouldHaveA11y(chart) && buttonEl) {
                    this.exportButtonProxy = proxyProvider.addProxyElement('chartMenu', { click: buttonEl }, 'button', {
                        'aria-label': chart.langFormat('accessibility.exporting.menuButtonLabel', {
                            chart: chart,
                            chartTitle: getChartTitle(chart)
                        }),
                        'aria-expanded': false,
                        title: chart.options.lang.contextButtonTitle || null
                    });
                }
            }
            /**
             * @private
             */
            createProxyGroup() {
                const chart = this.chart;
                if (chart && this.proxyProvider) {
                    this.proxyProvider.addGroup('chartMenu');
                }
            }
            /**
             * @private
             */
            addAccessibleContextMenuAttribs() {
                const chart = this.chart, exportList = chart.exportDivElements;
                if (exportList && exportList.length) {
                    // Set tabindex on the menu items to allow focusing by script
                    // Set role to give screen readers a chance to pick up the contents
                    exportList.forEach((item) => {
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
                    const parentDiv = (exportList[0] && exportList[0].parentNode);
                    if (parentDiv) {
                        attr(parentDiv, {
                            'aria-hidden': void 0,
                            'aria-label': chart.langFormat('accessibility.exporting.chartMenuLabel', { chart }),
                            role: 'list' // Needed for webkit/VO
                        });
                    }
                }
            }
            /**
             * Get keyboard navigation handler for this component.
             * @private
             */
            getKeyboardNavigation() {
                const keys = this.keyCodes, chart = this.chart, component = this;
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
                        const proxy = component.exportButtonProxy;
                        const svgEl = component.chart.exportingGroup;
                        if (proxy && svgEl) {
                            chart.setFocusToElement(svgEl, proxy.innerElement);
                        }
                    },
                    // Hide the menu
                    terminate: function () {
                        chart.hideExportMenu();
                    }
                });
            }
            /**
             * @private
             * @param {Highcharts.KeyboardNavigationHandler} keyboardNavigationHandler
             * @return {number} Response code
             */
            onKbdPrevious(keyboardNavigationHandler) {
                const chart = this.chart;
                const a11yOptions = chart.options.accessibility;
                const response = keyboardNavigationHandler.response;
                // Try to highlight prev item in list. Highlighting e.g.
                // separators will fail.
                let i = chart.highlightedExportItemIx || 0;
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
            }
            /**
             * @private
             * @param {Highcharts.KeyboardNavigationHandler} keyboardNavigationHandler
             * @return {number} Response code
             */
            onKbdNext(keyboardNavigationHandler) {
                const chart = this.chart;
                const a11yOptions = chart.options.accessibility;
                const response = keyboardNavigationHandler.response;
                // Try to highlight next item in list. Highlighting e.g.
                // separators will fail.
                for (let i = (chart.highlightedExportItemIx || 0) + 1; i < chart.exportDivElements.length; ++i) {
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
            }
            /**
             * @private
             * @param {Highcharts.KeyboardNavigationHandler} keyboardNavigationHandler
             * @return {number} Response code
             */
            onKbdClick(keyboardNavigationHandler) {
                const chart = this.chart;
                const curHighlightedItem = chart.exportDivElements[chart.highlightedExportItemIx];
                const exportButtonElement = getExportMenuButtonElement(chart).element;
                if (chart.openMenu) {
                    this.fakeClickEvent(curHighlightedItem);
                }
                else {
                    this.fakeClickEvent(exportButtonElement);
                    chart.highlightExportItem(0);
                }
                return keyboardNavigationHandler.response.success;
            }
        }
        /* *
         *
         *  Class Namespace
         *
         * */
        (function (MenuComponent) {
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
            /**
             * @private
             */
            function compose(ChartClass) {
                const chartProto = ChartClass.prototype;
                if (!chartProto.hideExportMenu) {
                    chartProto.hideExportMenu = chartHideExportMenu;
                    chartProto.highlightExportItem = chartHighlightExportItem;
                    chartProto.highlightLastExportItem = chartHighlightLastExportItem;
                    chartProto.showExportMenu = chartShowExportMenu;
                }
            }
            MenuComponent.compose = compose;
            /**
             * Show the export menu and focus the first item (if exists).
             *
             * @private
             * @function Highcharts.Chart#showExportMenu
             */
            function chartShowExportMenu() {
                const exportButton = getExportMenuButtonElement(this);
                if (exportButton) {
                    const el = exportButton.element;
                    if (el.onclick) {
                        el.onclick(getFakeMouseEvent('click'));
                    }
                }
            }
            /**
             * @private
             * @function Highcharts.Chart#hideExportMenu
             */
            function chartHideExportMenu() {
                const chart = this, exportList = chart.exportDivElements;
                if (exportList && chart.exportContextMenu && chart.openMenu) {
                    // Reset hover states etc.
                    exportList.forEach((el) => {
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
            }
            /**
             * Highlight export menu item by index.
             *
             * @private
             * @function Highcharts.Chart#highlightExportItem
             */
            function chartHighlightExportItem(ix) {
                const listItem = this.exportDivElements && this.exportDivElements[ix];
                const curHighlighted = this.exportDivElements &&
                    this.exportDivElements[this.highlightedExportItemIx];
                if (listItem &&
                    listItem.tagName === 'LI' &&
                    !(listItem.children && listItem.children.length)) {
                    // Test if we have focus support for SVG elements
                    const hasSVGFocusSupport = !!(this.renderTo.getElementsByTagName('g')[0] || {}).focus;
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
            }
            /**
             * Try to highlight the last valid export menu item.
             *
             * @private
             * @function Highcharts.Chart#highlightLastExportItem
             */
            function chartHighlightLastExportItem() {
                const chart = this;
                if (chart.exportDivElements) {
                    let i = chart.exportDivElements.length;
                    while (i--) {
                        if (chart.highlightExportItem(i)) {
                            return true;
                        }
                    }
                }
                return false;
            }
        })(MenuComponent || (MenuComponent = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return MenuComponent;
    });
    _registerModule(_modules, 'Accessibility/KeyboardNavigation.js', [_modules['Core/Globals.js'], _modules['Accessibility/Components/MenuComponent.js'], _modules['Core/Utilities.js'], _modules['Accessibility/Utils/EventProvider.js'], _modules['Accessibility/Utils/HTMLUtilities.js']], function (H, MenuComponent, U, EventProvider, HTMLUtilities) {
        /* *
         *
         *  (c) 2009-2024 Øystein Moseng
         *
         *  Main keyboard navigation handling.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { doc, win } = H;
        const { addEvent, defined, fireEvent } = U;
        const { getElement, simulatedEventTarget } = HTMLUtilities;
        /* *
         *
         *  Class
         *
         * */
        /**
         * The KeyboardNavigation class, containing the overall keyboard navigation
         * logic for the chart.
         *
         * @requires modules/accessibility
         *
         * @private
         * @class
         * @param {Highcharts.Chart} chart
         *        Chart object
         * @param {Object} components
         *        Map of component names to AccessibilityComponent objects.
         * @name Highcharts.KeyboardNavigation
         */
        class KeyboardNavigation {
            /* *
             *
             *  Constructor
             *
             * */
            constructor(chart, components) {
                this.currentModuleIx = NaN;
                this.modules = [];
                this.init(chart, components);
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Initialize the class
             * @private
             * @param {Highcharts.Chart} chart
             *        Chart object
             * @param {Object} components
             *        Map of component names to AccessibilityComponent objects.
             */
            init(chart, components) {
                const ep = this.eventProvider = new EventProvider();
                this.chart = chart;
                this.components = components;
                this.modules = [];
                this.currentModuleIx = 0;
                this.update();
                ep.addEvent(this.tabindexContainer, 'keydown', (e) => this.onKeydown(e));
                ep.addEvent(this.tabindexContainer, 'focus', (e) => this.onFocus(e));
                ['mouseup', 'touchend'].forEach((eventName) => ep.addEvent(doc, eventName, (e) => this.onMouseUp(e)));
                ['mousedown', 'touchstart'].forEach((eventName) => ep.addEvent(chart.renderTo, eventName, () => {
                    this.isClickingChart = true;
                }));
            }
            /**
             * Update the modules for the keyboard navigation.
             * @param {Array<string>} [order]
             *        Array specifying the tab order of the components.
             */
            update(order) {
                const a11yOptions = this.chart.options.accessibility, keyboardOptions = a11yOptions && a11yOptions.keyboardNavigation, components = this.components;
                this.updateContainerTabindex();
                if (keyboardOptions &&
                    keyboardOptions.enabled &&
                    order &&
                    order.length) {
                    // We (still) have keyboard navigation. Update module list
                    this.modules = order.reduce(function (modules, componentName) {
                        const navModules = components[componentName]
                            .getKeyboardNavigation();
                        return modules.concat(navModules);
                    }, []);
                    this.updateExitAnchor();
                }
                else {
                    this.modules = [];
                    this.currentModuleIx = 0;
                    this.removeExitAnchor();
                }
            }
            /**
             * We use an exit anchor to move focus out of chart whenever we want, by
             * setting focus to this div and not preventing the default tab action. We
             * also use this when users come back into the chart by tabbing back, in
             * order to navigate from the end of the chart.
             * @private
             */
            updateExitAnchor() {
                const endMarkerId = `highcharts-end-of-chart-marker-${this.chart.index}`, endMarker = getElement(endMarkerId);
                this.removeExitAnchor();
                if (endMarker) {
                    this.makeElementAnExitAnchor(endMarker);
                    this.exitAnchor = endMarker;
                }
                else {
                    this.createExitAnchor();
                }
            }
            /**
             * Move to prev/next module.
             * @private
             * @param {number} direction
             * Direction to move. +1 for next, -1 for prev.
             * @return {boolean}
             * True if there was a valid module in direction.
             */
            move(direction) {
                const curModule = this.modules && this.modules[this.currentModuleIx];
                if (curModule && curModule.terminate) {
                    curModule.terminate(direction);
                }
                // Remove existing focus border if any
                if (this.chart.focusElement) {
                    this.chart.focusElement.removeFocusBorder();
                }
                this.currentModuleIx += direction;
                const newModule = this.modules && this.modules[this.currentModuleIx];
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
                    this.exitAnchor && this.exitAnchor.focus();
                }
                else {
                    this.tabindexContainer.focus();
                }
                return false;
            }
            /**
             * Function to run on container focus
             * @private
             * @param {global.FocusEvent} e Browser focus event.
             */
            onFocus(e) {
                const chart = this.chart, focusComesFromChart = (e.relatedTarget &&
                    chart.container.contains(e.relatedTarget)), a11yOptions = chart.options.accessibility, keyboardOptions = a11yOptions && a11yOptions.keyboardNavigation, enabled = keyboardOptions && keyboardOptions.enabled;
                // Init keyboard nav if tabbing into chart
                if (enabled &&
                    !this.exiting &&
                    !this.tabbingInBackwards &&
                    !this.isClickingChart &&
                    !focusComesFromChart) {
                    const ix = this.getFirstValidModuleIx();
                    if (ix !== null) {
                        this.currentModuleIx = ix;
                        this.modules[ix].init(1);
                    }
                }
                this.keyboardReset = false;
                this.exiting = false;
            }
            /**
             * Reset chart navigation state if we mouse click and it's not already
             * reset. Reset fully if outside the chart, otherwise just hide focus
             * indicator.
             * @private
             */
            onMouseUp(e) {
                delete this.isClickingChart;
                if (!this.keyboardReset &&
                    e.relatedTarget !== simulatedEventTarget) {
                    const chart = this.chart;
                    if (!e.target ||
                        !chart.container.contains(e.target)) {
                        const curMod = this.modules &&
                            this.modules[this.currentModuleIx || 0];
                        if (curMod && curMod.terminate) {
                            curMod.terminate();
                        }
                        this.currentModuleIx = 0;
                    }
                    if (chart.focusElement) {
                        chart.focusElement.removeFocusBorder();
                        delete chart.focusElement;
                    }
                    this.keyboardReset = true;
                }
            }
            /**
             * Function to run on keydown
             * @private
             * @param {global.KeyboardEvent} ev Browser keydown event.
             */
            onKeydown(ev) {
                const e = ev || win.event, curNavModule = (this.modules &&
                    this.modules.length &&
                    this.modules[this.currentModuleIx]);
                let preventDefault;
                const target = e.target;
                if (target &&
                    target.nodeName === 'INPUT' &&
                    !target.classList.contains('highcharts-a11y-proxy-element')) {
                    return;
                }
                // Used for resetting nav state when clicking outside chart
                this.keyboardReset = false;
                // Used for sending focus out of the chart by the modules.
                this.exiting = false;
                // If there is a nav module for the current index, run it.
                // Otherwise, we are outside of the chart in some direction.
                if (curNavModule) {
                    const response = curNavModule.run(e);
                    if (response === curNavModule.response.success) {
                        preventDefault = true;
                    }
                    else if (response === curNavModule.response.prev) {
                        preventDefault = this.move(-1);
                    }
                    else if (response === curNavModule.response.next) {
                        preventDefault = this.move(1);
                    }
                    if (preventDefault) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }
            }
            /**
             * Chart container should have tabindex if navigation is enabled.
             * @private
             */
            updateContainerTabindex() {
                const a11yOptions = this.chart.options.accessibility, keyboardOptions = a11yOptions && a11yOptions.keyboardNavigation, shouldHaveTabindex = !(keyboardOptions && keyboardOptions.enabled === false), chart = this.chart, container = chart.container;
                let tabindexContainer;
                if (chart.renderTo.hasAttribute('tabindex')) {
                    container.removeAttribute('tabindex');
                    tabindexContainer = chart.renderTo;
                }
                else {
                    tabindexContainer = container;
                }
                this.tabindexContainer = tabindexContainer;
                const curTabindex = tabindexContainer.getAttribute('tabindex');
                if (shouldHaveTabindex && !curTabindex) {
                    tabindexContainer.setAttribute('tabindex', '0');
                }
                else if (!shouldHaveTabindex) {
                    chart.container.removeAttribute('tabindex');
                }
            }
            /**
             * Add new exit anchor to the chart.
             * @private
             */
            createExitAnchor() {
                const chart = this.chart, exitAnchor = this.exitAnchor = doc.createElement('div');
                chart.renderTo.appendChild(exitAnchor);
                this.makeElementAnExitAnchor(exitAnchor);
            }
            /**
             * Add attributes and events to an element to make it function as an
             * exit anchor.
             * @private
             */
            makeElementAnExitAnchor(el) {
                const chartTabindex = this.tabindexContainer.getAttribute('tabindex') || 0;
                el.setAttribute('class', 'highcharts-exit-anchor');
                el.setAttribute('tabindex', chartTabindex);
                el.setAttribute('aria-hidden', false);
                // Handle focus
                this.addExitAnchorEventsToEl(el);
            }
            /**
             * Destroy the exit anchor and remove from DOM.
             * @private
             */
            removeExitAnchor() {
                // Remove event from element and from eventRemovers array to prevent
                // memory leak (#20329).
                if (this.exitAnchor) {
                    const el = this.eventProvider.eventRemovers.find((el) => el.element === this.exitAnchor);
                    if (el && defined(el.remover)) {
                        this.eventProvider.removeEvent(el.remover);
                    }
                    if (this.exitAnchor.parentNode) {
                        this.exitAnchor.parentNode.removeChild(this.exitAnchor);
                    }
                    delete this.exitAnchor;
                }
            }
            /**
             * Add focus handler to exit anchor element.
             * @private
             */
            addExitAnchorEventsToEl(element) {
                const chart = this.chart, keyboardNavigation = this;
                this.eventProvider.addEvent(element, 'focus', function (ev) {
                    const e = ev || win.event, focusComesFromChart = (e.relatedTarget &&
                        chart.container.contains(e.relatedTarget)), comingInBackwards = !(focusComesFromChart || keyboardNavigation.exiting);
                    if (chart.focusElement) {
                        delete chart.focusElement;
                    }
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
                            const curModule = keyboardNavigation.modules[keyboardNavigation.currentModuleIx];
                            // Validate the module
                            if (curModule &&
                                curModule.validate && !curModule.validate()) {
                                // Invalid.
                                // Try moving backwards to find next valid.
                                keyboardNavigation.move(-1);
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
            }
            /**
             * Get the ix of the first module that either does not require validation or
             * validates positively.
             * @private
             */
            getFirstValidModuleIx() {
                const len = this.modules.length;
                for (let i = 0; i < len; ++i) {
                    const mod = this.modules[i];
                    if (!mod.validate || mod.validate()) {
                        return i;
                    }
                }
                return null;
            }
            /**
             * Remove all traces of keyboard navigation.
             * @private
             */
            destroy() {
                this.removeExitAnchor();
                this.eventProvider.removeAddedEvents();
                this.chart.container.removeAttribute('tabindex');
            }
        }
        /* *
         *
         *  Class Namespace
         *
         * */
        (function (KeyboardNavigation) {
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
            /**
             * Composition function.
             * @private
             */
            function compose(ChartClass) {
                MenuComponent.compose(ChartClass);
                const chartProto = ChartClass.prototype;
                if (!chartProto.dismissPopupContent) {
                    chartProto.dismissPopupContent = chartDismissPopupContent;
                    addEvent(doc, 'keydown', documentOnKeydown);
                }
                return ChartClass;
            }
            KeyboardNavigation.compose = compose;
            /**
             * Dismiss popup content in chart, including export menu and tooltip.
             * @private
             */
            function chartDismissPopupContent() {
                const chart = this;
                fireEvent(this, 'dismissPopupContent', {}, function () {
                    if (chart.tooltip) {
                        chart.tooltip.hide(0);
                    }
                    chart.hideExportMenu();
                });
            }
            /**
             * Add event listener to document to detect ESC key press and dismiss
             * hover/popup content.
             * @private
             */
            function documentOnKeydown(e) {
                const keycode = e.which || e.keyCode;
                const esc = 27;
                if (keycode === esc && H.charts) {
                    H.charts.forEach((chart) => {
                        if (chart && chart.dismissPopupContent) {
                            chart.dismissPopupContent();
                        }
                    });
                }
            }
        })(KeyboardNavigation || (KeyboardNavigation = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return KeyboardNavigation;
    });
    _registerModule(_modules, 'Accessibility/Components/LegendComponent.js', [_modules['Core/Animation/AnimationUtilities.js'], _modules['Core/Globals.js'], _modules['Core/Legend/Legend.js'], _modules['Core/Utilities.js'], _modules['Accessibility/AccessibilityComponent.js'], _modules['Accessibility/KeyboardNavigationHandler.js'], _modules['Accessibility/Utils/ChartUtilities.js'], _modules['Accessibility/Utils/HTMLUtilities.js']], function (A, H, Legend, U, AccessibilityComponent, KeyboardNavigationHandler, CU, HU) {
        /* *
         *
         *  (c) 2009-2024 Øystein Moseng
         *
         *  Accessibility component for chart legend.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { animObject } = A;
        const { doc } = H;
        const { addEvent, fireEvent, isNumber, pick, syncTimeout } = U;
        const { getChartTitle } = CU;
        const { stripHTMLTagsFromString: stripHTMLTags, addClass, removeClass } = HU;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * @private
         */
        function scrollLegendToItem(legend, itemIx) {
            const itemPage = (legend.allItems[itemIx].legendItem || {}).pageIx, curPage = legend.currentPage;
            if (typeof itemPage !== 'undefined' && itemPage + 1 !== curPage) {
                legend.scroll(1 + itemPage - curPage);
            }
        }
        /**
         * @private
         */
        function shouldDoLegendA11y(chart) {
            const items = chart.legend && chart.legend.allItems, legendA11yOptions = (chart.options.legend.accessibility || {}), unsupportedColorAxis = chart.colorAxis && chart.colorAxis.some((c) => !c.dataClasses || !c.dataClasses.length);
            return !!(items && items.length &&
                !unsupportedColorAxis &&
                legendA11yOptions.enabled !== false);
        }
        /**
         * @private
         */
        function setLegendItemHoverState(hoverActive, item) {
            const legendItem = item.legendItem || {};
            item.setState(hoverActive ? 'hover' : '', true);
            for (const key of ['group', 'label', 'symbol']) {
                const svgElement = legendItem[key];
                const element = svgElement && svgElement.element || svgElement;
                if (element) {
                    fireEvent(element, hoverActive ? 'mouseover' : 'mouseout');
                }
            }
        }
        /* *
         *
         *  Class
         *
         * */
        /**
         * The LegendComponent class
         *
         * @private
         * @class
         * @name Highcharts.LegendComponent
         */
        class LegendComponent extends AccessibilityComponent {
            constructor() {
                /* *
                 *
                 *  Properties
                 *
                 * */
                super(...arguments);
                this.highlightedLegendItemIx = NaN;
                this.proxyGroup = null;
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Init the component
             * @private
             */
            init() {
                const component = this;
                this.recreateProxies();
                // Note: Chart could create legend dynamically, so events cannot be
                // tied to the component's chart's current legend.
                // @todo 1. attach component to created legends
                // @todo 2. move listeners to composition and access `this.component`
                this.addEvent(Legend, 'afterScroll', function () {
                    if (this.chart === component.chart) {
                        component.proxyProvider.updateGroupProxyElementPositions('legend');
                        component.updateLegendItemProxyVisibility();
                        if (component.highlightedLegendItemIx > -1) {
                            this.chart.highlightLegendItem(component.highlightedLegendItemIx);
                        }
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
                        syncTimeout(() => component.proxyProvider
                            .updateGroupProxyElementPositions('legend'), animObject(pick(this.chart.renderer.globalAnimation, true)).duration);
                    }
                });
            }
            /**
             * Update visibility of legend items when using paged legend
             * @private
             */
            updateLegendItemProxyVisibility() {
                const chart = this.chart;
                const legend = chart.legend;
                const items = legend.allItems || [];
                const curPage = legend.currentPage || 1;
                const clipHeight = legend.clipHeight || 0;
                let legendItem;
                items.forEach((item) => {
                    if (item.a11yProxyElement) {
                        const hasPages = legend.pages && legend.pages.length;
                        const proxyEl = item.a11yProxyElement.element;
                        let hide = false;
                        legendItem = item.legendItem || {};
                        if (hasPages) {
                            const itemPage = legendItem.pageIx || 0;
                            const y = legendItem.y || 0;
                            const h = legendItem.label ?
                                Math.round(legendItem.label.getBBox().height) :
                                0;
                            hide = y + h - legend.pages[itemPage] > clipHeight ||
                                itemPage !== curPage - 1;
                        }
                        if (hide) {
                            if (chart.styledMode) {
                                addClass(proxyEl, 'highcharts-a11y-invisible');
                            }
                            else {
                                proxyEl.style.visibility = 'hidden';
                            }
                        }
                        else {
                            removeClass(proxyEl, 'highcharts-a11y-invisible');
                            proxyEl.style.visibility = '';
                        }
                    }
                });
            }
            /**
             * @private
             */
            onChartRender() {
                if (!shouldDoLegendA11y(this.chart)) {
                    this.removeProxies();
                }
            }
            /**
             * @private
             */
            highlightAdjacentLegendPage(direction) {
                const chart = this.chart;
                const legend = chart.legend;
                const curPageIx = legend.currentPage || 1;
                const newPageIx = curPageIx + direction;
                const pages = legend.pages || [];
                if (newPageIx > 0 && newPageIx <= pages.length) {
                    let i = 0, res;
                    for (const item of legend.allItems) {
                        if (((item.legendItem || {}).pageIx || 0) + 1 === newPageIx) {
                            res = chart.highlightLegendItem(i);
                            if (res) {
                                this.highlightedLegendItemIx = i;
                            }
                        }
                        ++i;
                    }
                }
            }
            /**
             * @private
             */
            updateProxyPositionForItem(item) {
                if (item.a11yProxyElement) {
                    item.a11yProxyElement.refreshPosition();
                }
            }
            /**
             * Returns false if legend a11y is disabled and proxies were not created,
             * true otherwise.
             * @private
             */
            recreateProxies() {
                const focusedElement = doc.activeElement;
                const proxyGroup = this.proxyGroup;
                const shouldRestoreFocus = focusedElement && proxyGroup &&
                    proxyGroup.contains(focusedElement);
                this.removeProxies();
                if (shouldDoLegendA11y(this.chart)) {
                    this.addLegendProxyGroup();
                    this.proxyLegendItems();
                    this.updateLegendItemProxyVisibility();
                    this.updateLegendTitle();
                    if (shouldRestoreFocus) {
                        this.chart.highlightLegendItem(this.highlightedLegendItemIx);
                    }
                    return true;
                }
                return false;
            }
            /**
             * @private
             */
            removeProxies() {
                this.proxyProvider.removeGroup('legend');
            }
            /**
             * @private
             */
            updateLegendTitle() {
                const chart = this.chart;
                const legendTitle = stripHTMLTags((chart.legend &&
                    chart.legend.options.title &&
                    chart.legend.options.title.text ||
                    '').replace(/<br ?\/?>/g, ' '), chart.renderer.forExport);
                const legendLabel = chart.langFormat('accessibility.legend.legendLabel' + (legendTitle ? '' : 'NoTitle'), {
                    chart,
                    legendTitle,
                    chartTitle: getChartTitle(chart)
                });
                this.proxyProvider.updateGroupAttrs('legend', {
                    'aria-label': legendLabel
                });
            }
            /**
             * @private
             */
            addLegendProxyGroup() {
                const a11yOptions = this.chart.options.accessibility;
                const groupRole = a11yOptions.landmarkVerbosity === 'all' ?
                    'region' : null;
                this.proxyGroup = this.proxyProvider.addGroup('legend', 'ul', {
                    // Filled by updateLegendTitle, to keep up to date without
                    // recreating group
                    'aria-label': '_placeholder_',
                    role: groupRole
                });
            }
            /**
             * @private
             */
            proxyLegendItems() {
                const component = this, items = (this.chart.legend || {}).allItems || [];
                let legendItem;
                items.forEach((item) => {
                    legendItem = item.legendItem || {};
                    if (legendItem.label && legendItem.label.element) {
                        component.proxyLegendItem(item);
                    }
                });
            }
            /**
             * @private
             * @param {Highcharts.BubbleLegendItem|Point|Highcharts.Series} item
             */
            proxyLegendItem(item) {
                const legendItem = item.legendItem || {};
                if (!legendItem.label || !legendItem.group) {
                    return;
                }
                const itemLabel = this.chart.langFormat('accessibility.legend.legendItem', {
                    chart: this.chart,
                    itemName: stripHTMLTags(item.name, this.chart.renderer.forExport),
                    item
                });
                const attribs = {
                    tabindex: -1,
                    'aria-pressed': item.visible,
                    'aria-label': itemLabel
                };
                // Considers useHTML
                const proxyPositioningElement = legendItem.group.div ?
                    legendItem.label :
                    legendItem.group;
                item.a11yProxyElement = this.proxyProvider.addProxyElement('legend', {
                    click: legendItem.label,
                    visual: proxyPositioningElement.element
                }, 'button', attribs);
            }
            /**
             * Get keyboard navigation handler for this component.
             * @private
             */
            getKeyboardNavigation() {
                const keys = this.keyCodes, component = this, chart = this.chart;
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
                        ],
                        [
                            [keys.pageDown, keys.pageUp],
                            function (keyCode) {
                                const direction = keyCode === keys.pageDown ? 1 : -1;
                                component.highlightAdjacentLegendPage(direction);
                                return this.response.success;
                            }
                        ]
                    ],
                    validate: function () {
                        return component.shouldHaveLegendNavigation();
                    },
                    init: function () {
                        chart.highlightLegendItem(0);
                        component.highlightedLegendItemIx = 0;
                    },
                    terminate: function () {
                        component.highlightedLegendItemIx = -1;
                        chart.legend.allItems.forEach((item) => setLegendItemHoverState(false, item));
                    }
                });
            }
            /**
             * Arrow key navigation
             * @private
             */
            onKbdArrowKey(keyboardNavigationHandler, key) {
                const { keyCodes: { left, up }, highlightedLegendItemIx, chart } = this, numItems = chart.legend.allItems.length, wrapAround = chart.options.accessibility
                    .keyboardNavigation.wrapAround, direction = (key === left || key === up) ? -1 : 1, res = chart.highlightLegendItem(highlightedLegendItemIx + direction);
                if (res) {
                    this.highlightedLegendItemIx += direction;
                }
                else if (wrapAround && numItems > 1) {
                    this.highlightedLegendItemIx = direction > 0 ?
                        0 : numItems - 1;
                    chart.highlightLegendItem(this.highlightedLegendItemIx);
                }
                return keyboardNavigationHandler.response.success;
            }
            /**
             * @private
             * @param {Highcharts.KeyboardNavigationHandler} keyboardNavigationHandler
             * @return {number} Response code
             */
            onKbdClick(keyboardNavigationHandler) {
                const legendItem = this.chart.legend.allItems[this.highlightedLegendItemIx];
                if (legendItem && legendItem.a11yProxyElement) {
                    legendItem.a11yProxyElement.click();
                }
                return keyboardNavigationHandler.response.success;
            }
            /**
             * @private
             */
            shouldHaveLegendNavigation() {
                if (!shouldDoLegendA11y(this.chart)) {
                    return false;
                }
                const chart = this.chart, legendOptions = chart.options.legend || {}, legendA11yOptions = (legendOptions.accessibility || {});
                return !!(chart.legend.display &&
                    legendA11yOptions.keyboardNavigation &&
                    legendA11yOptions.keyboardNavigation.enabled);
            }
            /**
             * Clean up
             * @private
             */
            destroy() {
                this.removeProxies();
            }
        }
        /* *
         *
         *  Class Namespace
         *
         * */
        (function (LegendComponent) {
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
            /**
             * Highlight legend item by index.
             * @private
             */
            function chartHighlightLegendItem(ix) {
                const items = this.legend.allItems;
                const oldIx = this.accessibility &&
                    this.accessibility.components.legend.highlightedLegendItemIx;
                const itemToHighlight = items[ix], legendItem = itemToHighlight?.legendItem || {};
                if (itemToHighlight) {
                    if (isNumber(oldIx) && items[oldIx]) {
                        setLegendItemHoverState(false, items[oldIx]);
                    }
                    scrollLegendToItem(this.legend, ix);
                    const legendItemProp = legendItem.label;
                    const proxyBtn = itemToHighlight.a11yProxyElement &&
                        itemToHighlight.a11yProxyElement.innerElement;
                    if (legendItemProp && legendItemProp.element && proxyBtn) {
                        this.setFocusToElement(legendItemProp, proxyBtn);
                    }
                    setLegendItemHoverState(true, itemToHighlight);
                    return true;
                }
                return false;
            }
            /**
             * @private
             */
            function compose(ChartClass, LegendClass) {
                const chartProto = ChartClass.prototype;
                if (!chartProto.highlightLegendItem) {
                    chartProto.highlightLegendItem = chartHighlightLegendItem;
                    addEvent(LegendClass, 'afterColorizeItem', legendOnAfterColorizeItem);
                }
            }
            LegendComponent.compose = compose;
            /**
             * Keep track of pressed state for legend items.
             * @private
             */
            function legendOnAfterColorizeItem(e) {
                const chart = this.chart, a11yOptions = chart.options.accessibility, legendItem = e.item;
                if (a11yOptions.enabled && legendItem && legendItem.a11yProxyElement) {
                    legendItem.a11yProxyElement.innerElement.setAttribute('aria-pressed', e.visible ? 'true' : 'false');
                }
            }
        })(LegendComponent || (LegendComponent = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return LegendComponent;
    });
    _registerModule(_modules, 'Stock/Navigator/ChartNavigatorComposition.js', [_modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (H, U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { isTouchDevice } = H;
        const { addEvent, merge, pick } = U;
        /* *
         *
         *  Constants
         *
         * */
        const composedMembers = [];
        /* *
         *
         *  Variables
         *
         * */
        let NavigatorConstructor;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * @private
         */
        function compose(ChartClass, NavigatorClass) {
            if (U.pushUnique(composedMembers, ChartClass)) {
                const chartProto = ChartClass.prototype;
                NavigatorConstructor = NavigatorClass;
                chartProto.callbacks.push(onChartCallback);
                addEvent(ChartClass, 'afterAddSeries', onChartAfterAddSeries);
                addEvent(ChartClass, 'afterSetChartSize', onChartAfterSetChartSize);
                addEvent(ChartClass, 'afterUpdate', onChartAfterUpdate);
                addEvent(ChartClass, 'beforeRender', onChartBeforeRender);
                addEvent(ChartClass, 'beforeShowResetZoom', onChartBeforeShowResetZoom);
                addEvent(ChartClass, 'update', onChartUpdate);
            }
        }
        /**
         * Handle adding new series.
         * @private
         */
        function onChartAfterAddSeries() {
            if (this.navigator) {
                // Recompute which series should be shown in navigator, and add them
                this.navigator.setBaseSeries(null, false);
            }
        }
        /**
         * For stock charts, extend the Chart.setChartSize method so that we can set the
         * final top position of the navigator once the height of the chart, including
         * the legend, is determined. #367. We can't use Chart.getMargins, because
         * labels offsets are not calculated yet.
         * @private
         */
        function onChartAfterSetChartSize() {
            const legend = this.legend, navigator = this.navigator;
            let legendOptions, xAxis, yAxis;
            if (navigator) {
                legendOptions = legend && legend.options;
                xAxis = navigator.xAxis;
                yAxis = navigator.yAxis;
                const { scrollbarHeight, scrollButtonSize } = navigator;
                // Compute the top position
                if (this.inverted) {
                    navigator.left = navigator.opposite ?
                        this.chartWidth - scrollbarHeight -
                            navigator.height :
                        this.spacing[3] + scrollbarHeight;
                    navigator.top = this.plotTop + scrollButtonSize;
                }
                else {
                    navigator.left = pick(xAxis.left, this.plotLeft + scrollButtonSize);
                    navigator.top = navigator.navigatorOptions.top ||
                        this.chartHeight -
                            navigator.height -
                            scrollbarHeight -
                            (this.scrollbar?.options.margin || 0) -
                            this.spacing[2] -
                            (this.rangeSelector && this.extraBottomMargin ?
                                this.rangeSelector.getHeight() :
                                0) -
                            ((legendOptions &&
                                legendOptions.verticalAlign === 'bottom' &&
                                legendOptions.layout !== 'proximate' && // #13392
                                legendOptions.enabled &&
                                !legendOptions.floating) ?
                                legend.legendHeight +
                                    pick(legendOptions.margin, 10) :
                                0) -
                            (this.titleOffset ? this.titleOffset[2] : 0);
                }
                if (xAxis && yAxis) { // False if navigator is disabled (#904)
                    if (this.inverted) {
                        xAxis.options.left = yAxis.options.left = navigator.left;
                    }
                    else {
                        xAxis.options.top = yAxis.options.top = navigator.top;
                    }
                    xAxis.setAxisSize();
                    yAxis.setAxisSize();
                }
            }
        }
        /**
         * Initialize navigator, if no scrolling exists yet.
         * @private
         */
        function onChartAfterUpdate(event) {
            if (!this.navigator && !this.scroller &&
                (this.options.navigator.enabled ||
                    this.options.scrollbar.enabled)) {
                this.scroller = this.navigator = new NavigatorConstructor(this);
                if (pick(event.redraw, true)) {
                    this.redraw(event.animation); // #7067
                }
            }
        }
        /**
         * Initialize navigator for stock charts
         * @private
         */
        function onChartBeforeRender() {
            const options = this.options;
            if (options.navigator.enabled ||
                options.scrollbar.enabled) {
                this.scroller = this.navigator = new NavigatorConstructor(this);
            }
        }
        /**
         * For Stock charts. For x only zooming, do not to create the zoom button
         * because X axis zooming is already allowed by the Navigator and Range
         * selector. (#9285)
         * @private
         */
        function onChartBeforeShowResetZoom() {
            const chartOptions = this.options, navigator = chartOptions.navigator, rangeSelector = chartOptions.rangeSelector;
            if (((navigator && navigator.enabled) ||
                (rangeSelector && rangeSelector.enabled)) &&
                ((!isTouchDevice &&
                    this.zooming.type === 'x') ||
                    (isTouchDevice && this.zooming.pinchType === 'x'))) {
                return false;
            }
        }
        /**
         * @private
         */
        function onChartCallback(chart) {
            const navigator = chart.navigator;
            // Initialize the navigator
            if (navigator && chart.xAxis[0]) {
                const extremes = chart.xAxis[0].getExtremes();
                navigator.render(extremes.min, extremes.max);
            }
        }
        /**
         * Merge options, if no scrolling exists yet
         * @private
         */
        function onChartUpdate(e) {
            const navigatorOptions = (e.options.navigator || {}), scrollbarOptions = (e.options.scrollbar || {});
            if (!this.navigator && !this.scroller &&
                (navigatorOptions.enabled || scrollbarOptions.enabled)) {
                merge(true, this.options.navigator, navigatorOptions);
                merge(true, this.options.scrollbar, scrollbarOptions);
                delete e.options.navigator;
                delete e.options.scrollbar;
            }
        }
        /* *
         *
         *  Default Export
         *
         * */
        const ChartNavigatorComposition = {
            compose
        };

        return ChartNavigatorComposition;
    });
    _registerModule(_modules, 'Core/Axis/NavigatorAxisComposition.js', [_modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (H, U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { isTouchDevice } = H;
        const { addEvent, correctFloat, defined, isNumber, pick } = U;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * @private
         */
        function onAxisInit() {
            const axis = this;
            if (!axis.navigatorAxis) {
                axis.navigatorAxis = new NavigatorAxisAdditions(axis);
            }
        }
        /**
         * For Stock charts, override selection zooming with some special features
         * because X axis zooming is already allowed by the Navigator and Range
         * selector.
         * @private
         */
        function onAxisSetExtremes(e) {
            const axis = this, chart = axis.chart, chartOptions = chart.options, navigator = chartOptions.navigator, navigatorAxis = axis.navigatorAxis, pinchType = chart.zooming.pinchType, rangeSelector = chartOptions.rangeSelector, zoomType = chart.zooming.type;
            let zoomed;
            if (axis.isXAxis &&
                (navigator?.enabled || rangeSelector?.enabled)) {
                // For y only zooming, ignore the X axis completely
                if (zoomType === 'y' && e.trigger === 'zoom') {
                    zoomed = false;
                    // For xy zooming, record the state of the zoom before zoom selection,
                    // then when the reset button is pressed, revert to this state. This
                    // should apply only if the chart is initialized with a range (#6612),
                    // otherwise zoom all the way out.
                }
                else if (((e.trigger === 'zoom' && zoomType === 'xy') ||
                    (isTouchDevice && pinchType === 'xy')) &&
                    axis.options.range) {
                    const previousZoom = navigatorAxis.previousZoom;
                    // Minimum defined, zooming in
                    if (defined(e.min)) {
                        navigatorAxis.previousZoom = [axis.min, axis.max];
                        // Minimum undefined, resetting zoom
                    }
                    else if (previousZoom) {
                        e.min = previousZoom[0];
                        e.max = previousZoom[1];
                        navigatorAxis.previousZoom = void 0;
                    }
                }
            }
            if (typeof zoomed !== 'undefined') {
                e.preventDefault();
            }
        }
        /* *
         *
         *  Class
         *
         * */
        /**
         * @private
         * @class
         */
        class NavigatorAxisAdditions {
            /* *
             *
             *  Static Functions
             *
             * */
            /**
             * @private
             */
            static compose(AxisClass) {
                if (!AxisClass.keepProps.includes('navigatorAxis')) {
                    AxisClass.keepProps.push('navigatorAxis');
                    addEvent(AxisClass, 'init', onAxisInit);
                    addEvent(AxisClass, 'setExtremes', onAxisSetExtremes);
                }
            }
            /* *
             *
             *  Constructors
             *
             * */
            constructor(axis) {
                this.axis = axis;
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * @private
             */
            destroy() {
                this.axis = void 0;
            }
            /**
             * Add logic to normalize the zoomed range in order to preserve the pressed
             * state of range selector buttons
             *
             * @private
             * @function Highcharts.Axis#toFixedRange
             */
            toFixedRange(pxMin, pxMax, fixedMin, fixedMax) {
                const axis = this.axis, halfPointRange = (axis.pointRange || 0) / 2;
                let newMin = pick(fixedMin, axis.translate(pxMin, true, !axis.horiz)), newMax = pick(fixedMax, axis.translate(pxMax, true, !axis.horiz));
                // Add/remove half point range to/from the extremes (#1172)
                if (!defined(fixedMin)) {
                    newMin = correctFloat(newMin + halfPointRange);
                }
                if (!defined(fixedMax)) {
                    newMax = correctFloat(newMax - halfPointRange);
                }
                if (!isNumber(newMin) || !isNumber(newMax)) { // #1195, #7411
                    newMin = newMax = void 0;
                }
                return {
                    min: newMin,
                    max: newMax
                };
            }
        }
        /* *
         *
         *  Default Export
         *
         * */

        return NavigatorAxisAdditions;
    });
    _registerModule(_modules, 'Stock/Navigator/NavigatorDefaults.js', [_modules['Core/Color/Color.js'], _modules['Core/Series/SeriesRegistry.js']], function (Color, SeriesRegistry) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { parse: color } = Color;
        const { seriesTypes } = SeriesRegistry;
        /* *
         *
         *  Constants
         *
         * */
        /**
         * The navigator is a small series below the main series, displaying
         * a view of the entire data set. It provides tools to zoom in and
         * out on parts of the data as well as panning across the dataset.
         *
         * @product      highstock gantt
         * @optionparent navigator
         */
        const NavigatorDefaults = {
            /**
             * Whether the navigator and scrollbar should adapt to updated data
             * in the base X axis. When loading data async, as in the demo below,
             * this should be `false`. Otherwise new data will trigger navigator
             * redraw, which will cause unwanted looping. In the demo below, the
             * data in the navigator is set only once. On navigating, only the main
             * chart content is updated.
             *
             * @sample {highstock} stock/demo/lazy-loading/
             *         Set to false with async data loading
             *
             * @type      {boolean}
             * @default   true
             * @apioption navigator.adaptToUpdatedData
             */
            /**
             * An integer identifying the index to use for the base series, or a
             * string representing the id of the series.
             *
             * **Note**: As of Highcharts 5.0, this is now a deprecated option.
             * Prefer [series.showInNavigator](#plotOptions.series.showInNavigator).
             *
             * @see [series.showInNavigator](#plotOptions.series.showInNavigator)
             *
             * @deprecated
             * @type      {number|string}
             * @default   0
             * @apioption navigator.baseSeries
             */
            /**
             * Enable or disable the navigator.
             *
             * @sample {highstock} stock/navigator/enabled/
             *         Disable the navigator
             *
             * @type      {boolean}
             * @default   true
             * @apioption navigator.enabled
             */
            /**
             * When the chart is inverted, whether to draw the navigator on the
             * opposite side.
             *
             * @type      {boolean}
             * @default   false
             * @since     5.0.8
             * @apioption navigator.opposite
             */
            /**
             * The height of the navigator.
             *
             * @sample {highstock} stock/navigator/height/
             *         A higher navigator
             */
            height: 40,
            /**
             * The distance from the nearest element, the X axis or X axis labels.
             *
             * @sample {highstock} stock/navigator/margin/
             *         A margin of 2 draws the navigator closer to the X axis labels
             */
            margin: 25,
            /**
             * Whether the mask should be inside the range marking the zoomed
             * range, or outside. In Highcharts Stock 1.x it was always `false`.
             *
             * @sample {highstock} stock/demo/maskinside-false/
             *         False, mask outside
             *
             * @since   2.0
             */
            maskInside: true,
            /**
             * Options for the handles for dragging the zoomed area.
             *
             * @sample {highstock} stock/navigator/handles/
             *         Colored handles
             */
            handles: {
                /**
                 * Width for handles.
                 *
                 * @sample {highstock} stock/navigator/styled-handles/
                 *         Styled handles
                 *
                 * @since   6.0.0
                 */
                width: 7,
                /**
                 * Border radius of the handles.
                 *
                 * @sample {highstock} stock/navigator/handles-border-radius/
                 *      Border radius on the navigator handles.
                 *
                 * @since 11.4.2
                 */
                borderRadius: 0,
                /**
                 * Height for handles.
                 *
                 * @sample {highstock} stock/navigator/styled-handles/
                 *         Styled handles
                 *
                 * @since   6.0.0
                 */
                height: 15,
                /**
                 * Array to define shapes of handles. 0-index for left, 1-index for
                 * right.
                 *
                 * Additionally, the URL to a graphic can be given on this form:
                 * `url(graphic.png)`. Note that for the image to be applied to
                 * exported charts, its URL needs to be accessible by the export
                 * server.
                 *
                 * Custom callbacks for symbol path generation can also be added to
                 * `Highcharts.SVGRenderer.prototype.symbols`. The callback is then
                 * used by its method name, as shown in the demo.
                 *
                 * @sample {highstock} stock/navigator/styled-handles/
                 *         Styled handles
                 *
                 * @type    {Array<string>}
                 * @default ["navigator-handle", "navigator-handle"]
                 * @since   6.0.0
                 */
                symbols: ['navigator-handle', 'navigator-handle'],
                /**
                 * Allows to enable/disable handles.
                 *
                 * @since   6.0.0
                 */
                enabled: true,
                /**
                 * The width for the handle border and the stripes inside.
                 *
                 * @sample {highstock} stock/navigator/styled-handles/
                 *         Styled handles
                 *
                 * @since     6.0.0
                 * @apioption navigator.handles.lineWidth
                 */
                lineWidth: 1,
                /**
                 * The fill for the handle.
                 *
                 * @type    {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 */
                backgroundColor: "#f2f2f2" /* Palette.neutralColor5 */,
                /**
                 * The stroke for the handle border and the stripes inside.
                 *
                 * @type    {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 */
                borderColor: "#999999" /* Palette.neutralColor40 */
            },
            /**
             * The color of the mask covering the areas of the navigator series
             * that are currently not visible in the main series. The default
             * color is bluish with an opacity of 0.3 to see the series below.
             *
             * @see In styled mode, the mask is styled with the
             *      `.highcharts-navigator-mask` and
             *      `.highcharts-navigator-mask-inside` classes.
             *
             * @sample {highstock} stock/navigator/maskfill/
             *         Blue, semi transparent mask
             *
             * @type    {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             * @default rgba(102,133,194,0.3)
             */
            maskFill: color("#667aff" /* Palette.highlightColor60 */).setOpacity(0.3).get(),
            /**
             * The color of the line marking the currently zoomed area in the
             * navigator.
             *
             * @sample {highstock} stock/navigator/outline/
             *         2px blue outline
             *
             * @type    {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             * @default #cccccc
             */
            outlineColor: "#999999" /* Palette.neutralColor40 */,
            /**
             * The width of the line marking the currently zoomed area in the
             * navigator.
             *
             * @see In styled mode, the outline stroke width is set with the
             *      `.highcharts-navigator-outline` class.
             *
             * @sample {highstock} stock/navigator/outline/
             *         2px blue outline
             *
             * @type    {number}
             */
            outlineWidth: 1,
            /**
             * Options for the navigator series. Available options are the same
             * as any series, documented at [plotOptions](#plotOptions.series)
             * and [series](#series).
             *
             * Unless data is explicitly defined on navigator.series, the data
             * is borrowed from the first series in the chart.
             *
             * Default series options for the navigator series are:
             * ```js
             * series: {
             *     type: 'areaspline',
             *     fillOpacity: 0.05,
             *     dataGrouping: {
             *         smoothed: true
             *     },
             *     lineWidth: 1,
             *     marker: {
             *         enabled: false
             *     }
             * }
             * ```
             *
             * @see In styled mode, the navigator series is styled with the
             *      `.highcharts-navigator-series` class.
             *
             * @sample {highstock} stock/navigator/series-data/
             *         Using a separate data set for the navigator
             * @sample {highstock} stock/navigator/series/
             *         A green navigator series
             *
             * @type {*|Array<*>|Highcharts.SeriesOptionsType|Array<Highcharts.SeriesOptionsType>}
             */
            series: {
                /**
                 * The type of the navigator series.
                 *
                 * Heads up:
                 * In column-type navigator, zooming is limited to at least one
                 * point with its `pointRange`.
                 *
                 * @sample {highstock} stock/navigator/column/
                 *         Column type navigator
                 *
                 * @type    {string}
                 * @default {highstock} `areaspline` if defined, otherwise `line`
                 * @default {gantt} gantt
                 */
                type: (typeof seriesTypes.areaspline === 'undefined' ?
                    'line' :
                    'areaspline'),
                /**
                 * The fill opacity of the navigator series.
                 */
                fillOpacity: 0.05,
                /**
                 * The pixel line width of the navigator series.
                 */
                lineWidth: 1,
                /**
                 * @ignore-option
                 */
                compare: null,
                /**
                 * @ignore-option
                 */
                sonification: {
                    enabled: false
                },
                /**
                 * Unless data is explicitly defined, the data is borrowed from the
                 * first series in the chart.
                 *
                 * @type      {Array<number|Array<number|string|null>|object|null>}
                 * @product   highstock
                 * @apioption navigator.series.data
                 */
                /**
                 * Data grouping options for the navigator series.
                 *
                 * @extends plotOptions.series.dataGrouping
                 */
                dataGrouping: {
                    approximation: 'average',
                    enabled: true,
                    groupPixelWidth: 2,
                    // Replace smoothed property by anchors, #12455.
                    firstAnchor: 'firstPoint',
                    anchor: 'middle',
                    lastAnchor: 'lastPoint',
                    // Day and week differs from plotOptions.series.dataGrouping
                    units: [
                        ['millisecond', [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                        ['second', [1, 2, 5, 10, 15, 30]],
                        ['minute', [1, 2, 5, 10, 15, 30]],
                        ['hour', [1, 2, 3, 4, 6, 8, 12]],
                        ['day', [1, 2, 3, 4]],
                        ['week', [1, 2, 3]],
                        ['month', [1, 3, 6]],
                        ['year', null]
                    ]
                },
                /**
                 * Data label options for the navigator series. Data labels are
                 * disabled by default on the navigator series.
                 *
                 * @extends plotOptions.series.dataLabels
                 */
                dataLabels: {
                    enabled: false,
                    zIndex: 2 // #1839
                },
                id: 'highcharts-navigator-series',
                className: 'highcharts-navigator-series',
                /**
                 * Sets the fill color of the navigator series.
                 *
                 * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 * @apioption navigator.series.color
                 */
                /**
                 * Line color for the navigator series. Allows setting the color
                 * while disallowing the default candlestick setting.
                 *
                 * @type {Highcharts.ColorString|null}
                 */
                lineColor: null, // #4602
                marker: {
                    enabled: false
                },
                /**
                 * Since Highcharts Stock v8, default value is the same as default
                 * `pointRange` defined for a specific type (e.g. `null` for
                 * column type).
                 *
                 * In Highcharts Stock version < 8, defaults to 0.
                 *
                 * @extends plotOptions.series.pointRange
                 * @type {number|null}
                 * @apioption navigator.series.pointRange
                 */
                /**
                 * The threshold option. Setting it to 0 will make the default
                 * navigator area series draw its area from the 0 value and up.
                 *
                 * @type {number|null}
                 */
                threshold: null
            },
            /**
             * Enable or disable navigator sticking to right, while adding new
             * points. If `undefined`, the navigator sticks to the axis maximum only
             * if it was already at the maximum prior to adding points.
             *
             * @type      {boolean}
             * @default   undefined
             * @since 10.2.1
             * @sample {highstock} stock/navigator/sticktomax-false/
             * stickToMax set to false
             * @apioption navigator.stickToMax
             */
            /**
             * Options for the navigator X axis. Default series options for the
             * navigator xAxis are:
             * ```js
             * xAxis: {
             *     tickWidth: 0,
             *     lineWidth: 0,
             *     gridLineWidth: 1,
             *     tickPixelInterval: 200,
             *     labels: {
             *            align: 'left',
             *         style: {
             *             color: '#888'
             *         },
             *         x: 3,
             *         y: -4
             *     }
             * }
             * ```
             *
             * @extends   xAxis
             * @excluding linkedTo, maxZoom, minRange, opposite, range, scrollbar,
             *            showEmpty, maxRange
             */
            xAxis: {
                /**
                 * Additional range on the right side of the xAxis. Works similar to
                 * `xAxis.maxPadding`, but the value is set in terms of axis values,
                 * percentage or pixels.
                 *
                 * If it's a number, it is interpreted as axis values, which in a
                 * datetime axis equals milliseconds.
                 *
                 * If it's a percentage string, is interpreted as percentages of the
                 * axis length. An overscroll of 50% will make a 100px axis 50px longer.
                 *
                 * If it's a pixel string, it is interpreted as a fixed pixel value, but
                 * limited to 90% of the axis length.
                 *
                 * If it's undefined, the value is inherited from `xAxis.overscroll`.
                 *
                 * Can be set for both, main xAxis and navigator's xAxis.
                 *
                 * @type    {number | string | undefined}
                 * @since   6.0.0
                 * @apioption navigator.xAxis.overscroll
                 */
                className: 'highcharts-navigator-xaxis',
                tickLength: 0,
                lineWidth: 0,
                gridLineColor: "#e6e6e6" /* Palette.neutralColor10 */,
                id: 'navigator-x-axis',
                gridLineWidth: 1,
                tickPixelInterval: 200,
                labels: {
                    align: 'left',
                    /**
                     * @type {Highcharts.CSSObject}
                     */
                    style: {
                        /** @ignore */
                        color: "#000000" /* Palette.neutralColor100 */,
                        /** @ignore */
                        fontSize: '0.7em',
                        /** @ignore */
                        opacity: 0.6,
                        /** @ignore */
                        textOutline: '2px contrast'
                    },
                    x: 3,
                    y: -4
                },
                crosshair: false
            },
            /**
             * Options for the navigator Y axis. Default series options for the
             * navigator yAxis are:
             * ```js
             * yAxis: {
             *     gridLineWidth: 0,
             *     startOnTick: false,
             *     endOnTick: false,
             *     minPadding: 0.1,
             *     maxPadding: 0.1,
             *     labels: {
             *         enabled: false
             *     },
             *     title: {
             *         text: null
             *     },
             *     tickWidth: 0
             * }
             * ```
             *
             * @extends   yAxis
             * @excluding height, linkedTo, maxZoom, minRange, ordinal, range,
             *            showEmpty, scrollbar, top, units, maxRange, minLength,
             *            maxLength, resize
             */
            yAxis: {
                className: 'highcharts-navigator-yaxis',
                gridLineWidth: 0,
                startOnTick: false,
                endOnTick: false,
                minPadding: 0.1,
                id: 'navigator-y-axis',
                maxPadding: 0.1,
                labels: {
                    enabled: false
                },
                crosshair: false,
                title: {
                    text: null
                },
                tickLength: 0,
                tickWidth: 0
            }
        };
        /* *
         *
         *  Default Export
         *
         * */
        /* *
         *
         *  API Options
         *
         * */
        /**
         * Maximum range which can be set using the navigator's handles.
         * Opposite of [xAxis.minRange](#xAxis.minRange).
         *
         * @sample {highstock} stock/navigator/maxrange/
         *         Defined max and min range
         *
         * @type      {number}
         * @since     6.0.0
         * @product   highstock gantt
         * @apioption xAxis.maxRange
         */
        (''); // Keeps doclets above in JS file

        return NavigatorDefaults;
    });
    _registerModule(_modules, 'Stock/Navigator/NavigatorSymbols.js', [_modules['Core/Renderer/SVG/Symbols.js'], _modules['Core/Utilities.js']], function (rect, U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { relativeLength } = U;
        /* *
         *
         *  Constants
         *
         * */
        /**
         * Draw one of the handles on the side of the zoomed range in the navigator.
         * @private
         */
        function navigatorHandle(_x, _y, width, height, options = {}) {
            const halfWidth = options.width ? options.width / 2 : width, markerPosition = 1.5, r = relativeLength(options.borderRadius || 0, Math.min(halfWidth * 2, height));
            height = options.height || height;
            return [
                ['M', -markerPosition, height / 2 - 3.5],
                ['L', -markerPosition, height / 2 + 4.5],
                ['M', markerPosition - 1, height / 2 - 3.5],
                ['L', markerPosition - 1, height / 2 + 4.5],
                ...rect.rect(-halfWidth - 1, 0.5, halfWidth * 2 + 1, height, { r })
            ];
        }
        /* *
         *
         *  Default Export
         *
         * */
        const NavigatorSymbols = {
            'navigator-handle': navigatorHandle
        };

        return NavigatorSymbols;
    });
    _registerModule(_modules, 'Stock/Utilities/StockUtilities.js', [_modules['Core/Utilities.js']], function (U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { defined } = U;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Sets the chart.fixedRange to the specified value. If the value is larger
         * than actual range, sets it to the maximum possible range. (#20327)
         *
         * @private
         * @function Highcharts.StockChart#setFixedRange
         * @param {number|undefined} range
         *        Range to set in axis units.
         */
        function setFixedRange(range) {
            const xAxis = this.xAxis[0];
            if (defined(xAxis.dataMax) &&
                defined(xAxis.dataMin) &&
                range) {
                this.fixedRange = Math.min(range, xAxis.dataMax - xAxis.dataMin);
            }
            else {
                this.fixedRange = range;
            }
        }
        const StockUtilities = {
            setFixedRange
        };

        return StockUtilities;
    });
    _registerModule(_modules, 'Stock/Navigator/NavigatorComposition.js', [_modules['Core/Defaults.js'], _modules['Core/Globals.js'], _modules['Core/Axis/NavigatorAxisComposition.js'], _modules['Stock/Navigator/NavigatorDefaults.js'], _modules['Stock/Navigator/NavigatorSymbols.js'], _modules['Core/Renderer/RendererRegistry.js'], _modules['Stock/Utilities/StockUtilities.js'], _modules['Core/Utilities.js']], function (D, H, NavigatorAxisAdditions, NavigatorDefaults, NavigatorSymbols, RendererRegistry, StockUtilities, U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { setOptions } = D;
        const { composed } = H;
        const { getRendererType } = RendererRegistry;
        const { setFixedRange } = StockUtilities;
        const { addEvent, extend, pushUnique } = U;
        /* *
         *
         *  Variables
         *
         * */
        /* *
         *
         *  Functions
         *
         * */
        /**
         * @private
         */
        function compose(ChartClass, AxisClass, SeriesClass) {
            NavigatorAxisAdditions.compose(AxisClass);
            if (pushUnique(composed, 'Navigator')) {
                ChartClass.prototype.setFixedRange = setFixedRange;
                extend(getRendererType().prototype.symbols, NavigatorSymbols);
                addEvent(SeriesClass, 'afterUpdate', onSeriesAfterUpdate);
                setOptions({ navigator: NavigatorDefaults });
            }
        }
        /**
         * Handle updating series
         * @private
         */
        function onSeriesAfterUpdate() {
            if (this.chart.navigator && !this.options.isInternal) {
                this.chart.navigator.setBaseSeries(null, false);
            }
        }
        /* *
         *
         *  Default Export
         *
         * */
        const NavigatorComposition = {
            compose
        };

        return NavigatorComposition;
    });
    _registerModule(_modules, 'Core/Axis/ScrollbarAxis.js', [_modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (H, U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { composed } = H;
        const { addEvent, defined, pick, pushUnique } = U;
        /* *
         *
         *  Composition
         *
         * */
        var ScrollbarAxis;
        (function (ScrollbarAxis) {
            /* *
             *
             *  Variables
             *
             * */
            let Scrollbar;
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Attaches to axis events to create scrollbars if enabled.
             *
             * @private
             *
             * @param {Highcharts.Axis} AxisClass
             * Axis class to extend.
             *
             * @param {Highcharts.Scrollbar} ScrollbarClass
             * Scrollbar class to use.
             */
            function compose(AxisClass, ScrollbarClass) {
                if (pushUnique(composed, 'Axis.Scrollbar')) {
                    Scrollbar = ScrollbarClass;
                    addEvent(AxisClass, 'afterGetOffset', onAxisAfterGetOffset);
                    addEvent(AxisClass, 'afterInit', onAxisAfterInit);
                    addEvent(AxisClass, 'afterRender', onAxisAfterRender);
                }
            }
            ScrollbarAxis.compose = compose;
            /** @private */
            function getExtremes(axis) {
                const axisMin = pick(axis.options && axis.options.min, axis.min);
                const axisMax = pick(axis.options && axis.options.max, axis.max);
                return {
                    axisMin,
                    axisMax,
                    scrollMin: defined(axis.dataMin) ?
                        Math.min(axisMin, axis.min, axis.dataMin, pick(axis.threshold, Infinity)) : axisMin,
                    scrollMax: defined(axis.dataMax) ?
                        Math.max(axisMax, axis.max, axis.dataMax, pick(axis.threshold, -Infinity)) : axisMax
                };
            }
            /**
             * Make space for a scrollbar.
             * @private
             */
            function onAxisAfterGetOffset() {
                const axis = this, scrollbar = axis.scrollbar, opposite = scrollbar && !scrollbar.options.opposite, index = axis.horiz ? 2 : opposite ? 3 : 1;
                if (scrollbar) {
                    // Reset scrollbars offsets
                    axis.chart.scrollbarsOffsets = [0, 0];
                    axis.chart.axisOffset[index] +=
                        scrollbar.size + (scrollbar.options.margin || 0);
                }
            }
            /**
             * Wrap axis initialization and create scrollbar if enabled.
             * @private
             */
            function onAxisAfterInit() {
                const axis = this;
                if (axis.options &&
                    axis.options.scrollbar &&
                    axis.options.scrollbar.enabled) {
                    // Predefined options:
                    axis.options.scrollbar.vertical = !axis.horiz;
                    axis.options.startOnTick = axis.options.endOnTick = false;
                    axis.scrollbar = new Scrollbar(axis.chart.renderer, axis.options.scrollbar, axis.chart);
                    addEvent(axis.scrollbar, 'changed', function (e) {
                        const { axisMin, axisMax, scrollMin: unitedMin, scrollMax: unitedMax } = getExtremes(axis), range = unitedMax - unitedMin;
                        let to, from;
                        // #12834, scroll when show/hide series, wrong extremes
                        if (!defined(axisMin) || !defined(axisMax)) {
                            return;
                        }
                        if ((axis.horiz && !axis.reversed) ||
                            (!axis.horiz && axis.reversed)) {
                            to = unitedMin + range * this.to;
                            from = unitedMin + range * this.from;
                        }
                        else {
                            // Y-values in browser are reversed, but this also
                            // applies for reversed horizontal axis:
                            to = unitedMin + range * (1 - this.from);
                            from = unitedMin + range * (1 - this.to);
                        }
                        if (this.shouldUpdateExtremes(e.DOMType)) {
                            // #17977, set animation to undefined instead of true
                            const animate = e.DOMType === 'mousemove' ||
                                e.DOMType === 'touchmove' ? false : void 0;
                            axis.setExtremes(from, to, true, animate, e);
                        }
                        else {
                            // When live redraw is disabled, don't change extremes
                            // Only change the position of the scrollbar thumb
                            this.setRange(this.from, this.to);
                        }
                    });
                }
            }
            /**
             * Wrap rendering axis, and update scrollbar if one is created.
             * @private
             */
            function onAxisAfterRender() {
                const axis = this, { scrollMin, scrollMax } = getExtremes(axis), scrollbar = axis.scrollbar, offset = (axis.axisTitleMargin + (axis.titleOffset || 0)), scrollbarsOffsets = axis.chart.scrollbarsOffsets, axisMargin = axis.options.margin || 0;
                let offsetsIndex, from, to;
                if (scrollbar && scrollbarsOffsets) {
                    if (axis.horiz) {
                        // Reserve space for labels/title
                        if (!axis.opposite) {
                            scrollbarsOffsets[1] += offset;
                        }
                        scrollbar.position(axis.left, (axis.top +
                            axis.height +
                            2 +
                            scrollbarsOffsets[1] -
                            (axis.opposite ? axisMargin : 0)), axis.width, axis.height);
                        // Next scrollbar should reserve space for margin (if set)
                        if (!axis.opposite) {
                            scrollbarsOffsets[1] += axisMargin;
                        }
                        offsetsIndex = 1;
                    }
                    else {
                        // Reserve space for labels/title
                        if (axis.opposite) {
                            scrollbarsOffsets[0] += offset;
                        }
                        let xPosition;
                        if (!scrollbar.options.opposite) {
                            xPosition = axis.opposite ? 0 : axisMargin;
                        }
                        else {
                            xPosition = axis.left +
                                axis.width +
                                2 +
                                scrollbarsOffsets[0] -
                                (axis.opposite ? 0 : axisMargin);
                        }
                        scrollbar.position(xPosition, axis.top, axis.width, axis.height);
                        // Next scrollbar should reserve space for margin (if set)
                        if (axis.opposite) {
                            scrollbarsOffsets[0] += axisMargin;
                        }
                        offsetsIndex = 0;
                    }
                    scrollbarsOffsets[offsetsIndex] += scrollbar.size +
                        (scrollbar.options.margin || 0);
                    if (isNaN(scrollMin) ||
                        isNaN(scrollMax) ||
                        !defined(axis.min) ||
                        !defined(axis.max) ||
                        axis.min === axis.max // #10733
                    ) {
                        // Default action: when extremes are the same or there is
                        // not extremes on the axis, but scrollbar exists, make it
                        // full size
                        scrollbar.setRange(0, 1);
                    }
                    else {
                        from = ((axis.min - scrollMin) /
                            (scrollMax - scrollMin));
                        to = ((axis.max - scrollMin) /
                            (scrollMax - scrollMin));
                        if ((axis.horiz && !axis.reversed) ||
                            (!axis.horiz && axis.reversed)) {
                            scrollbar.setRange(from, to);
                        }
                        else {
                            // Inverse vertical axis
                            scrollbar.setRange(1 - to, 1 - from);
                        }
                    }
                }
            }
        })(ScrollbarAxis || (ScrollbarAxis = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return ScrollbarAxis;
    });
    _registerModule(_modules, 'Stock/Scrollbar/ScrollbarDefaults.js', [], function () {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /* *
         *
         *  Constant
         *
         * */
        /**
         *
         * The scrollbar is a means of panning over the X axis of a stock chart.
         * Scrollbars can also be applied to other types of axes.
         *
         * Another approach to scrollable charts is the [chart.scrollablePlotArea](
         * https://api.highcharts.com/highcharts/chart.scrollablePlotArea) option that
         * is especially suitable for simpler cartesian charts on mobile.
         *
         * In styled mode, all the presentational options for the
         * scrollbar are replaced by the classes `.highcharts-scrollbar-thumb`,
         * `.highcharts-scrollbar-arrow`, `.highcharts-scrollbar-button`,
         * `.highcharts-scrollbar-rifles` and `.highcharts-scrollbar-track`.
         *
         * @sample stock/yaxis/inverted-bar-scrollbar/
         *         A scrollbar on a simple bar chart
         *
         * @product highstock gantt
         * @optionparent scrollbar
         *
         * @private
         */
        const ScrollbarDefaults = {
            /**
             * The height of the scrollbar. If `buttonsEnabled` is true , the height
             * also applies to the width of the scroll arrows so that they are always
             * squares.
             *
             * @sample stock/scrollbar/style/
             *         Non-default height
             *
             * @type    {number}
             */
            height: 10,
            /**
             * The border rounding radius of the bar.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             */
            barBorderRadius: 5,
            /**
             * The corner radius of the scrollbar buttons.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             */
            buttonBorderRadius: 0,
            /**
             * Enable or disable the buttons at the end of the scrollbar.
             *
             * @since 11.0.0
             */
            buttonsEnabled: false,
            /**
             * Enable or disable the scrollbar.
             *
             * @sample stock/scrollbar/enabled/
             *         Disable the scrollbar, only use navigator
             *
             * @type      {boolean}
             * @default   true
             * @apioption scrollbar.enabled
             */
            /**
             * Whether to redraw the main chart as the scrollbar or the navigator
             * zoomed window is moved. Defaults to `true` for modern browsers and
             * `false` for legacy IE browsers as well as mobile devices.
             *
             * @sample stock/scrollbar/liveredraw
             *         Setting live redraw to false
             *
             * @type  {boolean}
             * @since 1.3
             */
            liveRedraw: void 0,
            /**
             * The margin between the scrollbar and its axis when the scrollbar is
             * applied directly to an axis, or the navigator in case that is enabled.
             * Defaults to 10 for axis, 0 for navigator.
             *
             * @type {number|undefined}
             */
            margin: void 0,
            /**
             * The minimum width of the scrollbar.
             *
             * @since 1.2.5
             */
            minWidth: 6,
            /** @ignore-option */
            opposite: true,
            /**
             * Whether to show or hide the scrollbar when the scrolled content is
             * zoomed out to it full extent.
             *
             * @type      {boolean}
             * @default   true
             * @apioption scrollbar.showFull
             */
            step: 0.2,
            /**
             * The z index of the scrollbar group.
             */
            zIndex: 3,
            /**
             * The background color of the scrollbar itself.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            barBackgroundColor: "#cccccc" /* Palette.neutralColor20 */,
            /**
             * The width of the bar's border.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             */
            barBorderWidth: 0,
            /**
             * The color of the scrollbar's border.
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            barBorderColor: "#cccccc" /* Palette.neutralColor20 */,
            /**
             * The color of the small arrow inside the scrollbar buttons.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            buttonArrowColor: "#333333" /* Palette.neutralColor80 */,
            /**
             * The color of scrollbar buttons.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            buttonBackgroundColor: "#e6e6e6" /* Palette.neutralColor10 */,
            /**
             * The color of the border of the scrollbar buttons.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            buttonBorderColor: "#cccccc" /* Palette.neutralColor20 */,
            /**
             * The border width of the scrollbar buttons.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             */
            buttonBorderWidth: 1,
            /**
             * The color of the small rifles in the middle of the scrollbar.
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            rifleColor: 'none',
            /**
             * The color of the track background.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            trackBackgroundColor: 'rgba(255, 255, 255, 0.001)', // #18922
            /**
             * The color of the border of the scrollbar track.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            trackBorderColor: "#cccccc" /* Palette.neutralColor20 */,
            /**
             * The corner radius of the border of the scrollbar track.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             */
            trackBorderRadius: 5,
            /**
             * The width of the border of the scrollbar track.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             */
            trackBorderWidth: 1
        };
        /* *
         *
         *  Default Export
         *
         * */

        return ScrollbarDefaults;
    });
    _registerModule(_modules, 'Stock/Scrollbar/Scrollbar.js', [_modules['Core/Defaults.js'], _modules['Core/Globals.js'], _modules['Core/Axis/ScrollbarAxis.js'], _modules['Stock/Scrollbar/ScrollbarDefaults.js'], _modules['Core/Utilities.js']], function (D, H, ScrollbarAxis, ScrollbarDefaults, U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { defaultOptions } = D;
        const { addEvent, correctFloat, crisp, defined, destroyObjectProperties, fireEvent, merge, pick, removeEvent } = U;
        /* *
         *
         *  Constants
         *
         * */
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /**
         * A reusable scrollbar, internally used in Highcharts Stock's
         * navigator and optionally on individual axes.
         *
         * @private
         * @class
         * @name Highcharts.Scrollbar
         * @param {Highcharts.SVGRenderer} renderer
         * @param {Highcharts.ScrollbarOptions} options
         * @param {Highcharts.Chart} chart
         */
        class Scrollbar {
            /* *
             *
             *  Static Functions
             *
             * */
            static compose(AxisClass) {
                ScrollbarAxis.compose(AxisClass, Scrollbar);
            }
            /**
             * When we have vertical scrollbar, rifles and arrow in buttons should be
             * rotated. The same method is used in Navigator's handles, to rotate them.
             *
             * @function Highcharts.swapXY
             *
             * @param {Highcharts.SVGPathArray} path
             * Path to be rotated.
             *
             * @param {boolean} [vertical]
             * If vertical scrollbar, swap x-y values.
             *
             * @return {Highcharts.SVGPathArray}
             * Rotated path.
             *
             * @requires modules/stock
             */
            static swapXY(path, vertical) {
                if (vertical) {
                    path.forEach((seg) => {
                        const len = seg.length;
                        let temp;
                        for (let i = 0; i < len; i += 2) {
                            temp = seg[i + 1];
                            if (typeof temp === 'number') {
                                seg[i + 1] = seg[i + 2];
                                seg[i + 2] = temp;
                            }
                        }
                    });
                }
                return path;
            }
            /* *
             *
             *  Constructors
             *
             * */
            constructor(renderer, options, chart) {
                /* *
                 *
                 *  Properties
                 *
                 * */
                this._events = [];
                this.chartX = 0;
                this.chartY = 0;
                this.from = 0;
                this.scrollbarButtons = [];
                this.scrollbarLeft = 0;
                this.scrollbarStrokeWidth = 1;
                this.scrollbarTop = 0;
                this.size = 0;
                this.to = 0;
                this.trackBorderWidth = 1;
                this.x = 0;
                this.y = 0;
                this.init(renderer, options, chart);
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Set up the mouse and touch events for the Scrollbar
             *
             * @private
             * @function Highcharts.Scrollbar#addEvents
             */
            addEvents() {
                const buttonsOrder = this.options.inverted ? [1, 0] : [0, 1], buttons = this.scrollbarButtons, bar = this.scrollbarGroup.element, track = this.track.element, mouseDownHandler = this.mouseDownHandler.bind(this), mouseMoveHandler = this.mouseMoveHandler.bind(this), mouseUpHandler = this.mouseUpHandler.bind(this);
                const _events = [
                    // Mouse events
                    [
                        buttons[buttonsOrder[0]].element,
                        'click',
                        this.buttonToMinClick.bind(this)
                    ],
                    [
                        buttons[buttonsOrder[1]].element,
                        'click',
                        this.buttonToMaxClick.bind(this)
                    ],
                    [track, 'click', this.trackClick.bind(this)],
                    [bar, 'mousedown', mouseDownHandler],
                    [bar.ownerDocument, 'mousemove', mouseMoveHandler],
                    [bar.ownerDocument, 'mouseup', mouseUpHandler],
                    // Touch events
                    [bar, 'touchstart', mouseDownHandler],
                    [bar.ownerDocument, 'touchmove', mouseMoveHandler],
                    [bar.ownerDocument, 'touchend', mouseUpHandler]
                ];
                // Add them all
                _events.forEach(function (args) {
                    addEvent.apply(null, args);
                });
                this._events = _events;
            }
            buttonToMaxClick(e) {
                const scroller = this;
                const range = ((scroller.to - scroller.from) *
                    pick(scroller.options.step, 0.2));
                scroller.updatePosition(scroller.from + range, scroller.to + range);
                fireEvent(scroller, 'changed', {
                    from: scroller.from,
                    to: scroller.to,
                    trigger: 'scrollbar',
                    DOMEvent: e
                });
            }
            buttonToMinClick(e) {
                const scroller = this;
                const range = correctFloat(scroller.to - scroller.from) *
                    pick(scroller.options.step, 0.2);
                scroller.updatePosition(correctFloat(scroller.from - range), correctFloat(scroller.to - range));
                fireEvent(scroller, 'changed', {
                    from: scroller.from,
                    to: scroller.to,
                    trigger: 'scrollbar',
                    DOMEvent: e
                });
            }
            /**
             * Get normalized (0-1) cursor position over the scrollbar
             *
             * @private
             * @function Highcharts.Scrollbar#cursorToScrollbarPosition
             *
             * @param  {*} normalizedEvent
             *         normalized event, with chartX and chartY values
             *
             * @return {Highcharts.Dictionary<number>}
             *         Local position {chartX, chartY}
             */
            cursorToScrollbarPosition(normalizedEvent) {
                const scroller = this, options = scroller.options, minWidthDifference = options.minWidth > scroller.calculatedWidth ?
                    options.minWidth :
                    0; // `minWidth` distorts translation
                return {
                    chartX: (normalizedEvent.chartX - scroller.x -
                        scroller.xOffset) /
                        (scroller.barWidth - minWidthDifference),
                    chartY: (normalizedEvent.chartY - scroller.y -
                        scroller.yOffset) /
                        (scroller.barWidth - minWidthDifference)
                };
            }
            /**
             * Destroys allocated elements.
             *
             * @private
             * @function Highcharts.Scrollbar#destroy
             */
            destroy() {
                const scroller = this, navigator = scroller.chart.scroller;
                // Disconnect events added in addEvents
                scroller.removeEvents();
                // Destroy properties
                [
                    'track',
                    'scrollbarRifles',
                    'scrollbar',
                    'scrollbarGroup',
                    'group'
                ].forEach(function (prop) {
                    if (scroller[prop] && scroller[prop].destroy) {
                        scroller[prop] = scroller[prop].destroy();
                    }
                });
                // #6421, chart may have more scrollbars
                if (navigator && scroller === navigator.scrollbar) {
                    navigator.scrollbar = null;
                    // Destroy elements in collection
                    destroyObjectProperties(navigator.scrollbarButtons);
                }
            }
            /**
             * Draw the scrollbar buttons with arrows
             *
             * @private
             * @function Highcharts.Scrollbar#drawScrollbarButton
             * @param {number} index
             *        0 is left, 1 is right
             */
            drawScrollbarButton(index) {
                const scroller = this, renderer = scroller.renderer, scrollbarButtons = scroller.scrollbarButtons, options = scroller.options, size = scroller.size, group = renderer.g().add(scroller.group);
                scrollbarButtons.push(group);
                if (options.buttonsEnabled) {
                    // Create a rectangle for the scrollbar button
                    const rect = renderer.rect()
                        .addClass('highcharts-scrollbar-button')
                        .add(group);
                    // Presentational attributes
                    if (!scroller.chart.styledMode) {
                        rect.attr({
                            stroke: options.buttonBorderColor,
                            'stroke-width': options.buttonBorderWidth,
                            fill: options.buttonBackgroundColor
                        });
                    }
                    // Place the rectangle based on the rendered stroke width
                    rect.attr(rect.crisp({
                        x: -0.5,
                        y: -0.5,
                        width: size,
                        height: size,
                        r: options.buttonBorderRadius
                    }, rect.strokeWidth()));
                    // Button arrow
                    const arrow = renderer
                        .path(Scrollbar.swapXY([[
                            'M',
                            size / 2 + (index ? -1 : 1),
                            size / 2 - 3
                        ], [
                            'L',
                            size / 2 + (index ? -1 : 1),
                            size / 2 + 3
                        ], [
                            'L',
                            size / 2 + (index ? 2 : -2),
                            size / 2
                        ]], options.vertical))
                        .addClass('highcharts-scrollbar-arrow')
                        .add(scrollbarButtons[index]);
                    if (!scroller.chart.styledMode) {
                        arrow.attr({
                            fill: options.buttonArrowColor
                        });
                    }
                }
            }
            /**
             * @private
             * @function Highcharts.Scrollbar#init
             * @param {Highcharts.SVGRenderer} renderer
             * @param {Highcharts.ScrollbarOptions} options
             * @param {Highcharts.Chart} chart
             */
            init(renderer, options, chart) {
                const scroller = this;
                scroller.scrollbarButtons = [];
                scroller.renderer = renderer;
                scroller.userOptions = options;
                scroller.options = merge(ScrollbarDefaults, defaultOptions.scrollbar, options);
                scroller.options.margin = pick(scroller.options.margin, 10);
                scroller.chart = chart;
                // Backward compatibility
                scroller.size = pick(scroller.options.size, scroller.options.height);
                // Init
                if (options.enabled) {
                    scroller.render();
                    scroller.addEvents();
                }
            }
            mouseDownHandler(e) {
                const scroller = this, normalizedEvent = scroller.chart.pointer?.normalize(e) || e, mousePosition = scroller.cursorToScrollbarPosition(normalizedEvent);
                scroller.chartX = mousePosition.chartX;
                scroller.chartY = mousePosition.chartY;
                scroller.initPositions = [scroller.from, scroller.to];
                scroller.grabbedCenter = true;
            }
            /**
             * Event handler for the mouse move event.
             * @private
             */
            mouseMoveHandler(e) {
                const scroller = this, normalizedEvent = scroller.chart.pointer?.normalize(e) || e, options = scroller.options, direction = options.vertical ?
                    'chartY' : 'chartX', initPositions = scroller.initPositions || [];
                let scrollPosition, chartPosition, change;
                // In iOS, a mousemove event with e.pageX === 0 is fired when
                // holding the finger down in the center of the scrollbar. This
                // should be ignored.
                if (scroller.grabbedCenter &&
                    // #4696, scrollbar failed on Android
                    (!e.touches || e.touches[0][direction] !== 0)) {
                    chartPosition = scroller.cursorToScrollbarPosition(normalizedEvent)[direction];
                    scrollPosition = scroller[direction];
                    change = chartPosition - scrollPosition;
                    scroller.hasDragged = true;
                    scroller.updatePosition(initPositions[0] + change, initPositions[1] + change);
                    if (scroller.hasDragged) {
                        fireEvent(scroller, 'changed', {
                            from: scroller.from,
                            to: scroller.to,
                            trigger: 'scrollbar',
                            DOMType: e.type,
                            DOMEvent: e
                        });
                    }
                }
            }
            /**
             * Event handler for the mouse up event.
             * @private
             */
            mouseUpHandler(e) {
                const scroller = this;
                if (scroller.hasDragged) {
                    fireEvent(scroller, 'changed', {
                        from: scroller.from,
                        to: scroller.to,
                        trigger: 'scrollbar',
                        DOMType: e.type,
                        DOMEvent: e
                    });
                }
                scroller.grabbedCenter =
                    scroller.hasDragged =
                        scroller.chartX =
                            scroller.chartY = null;
            }
            /**
             * Position the scrollbar, method called from a parent with defined
             * dimensions.
             *
             * @private
             * @function Highcharts.Scrollbar#position
             * @param {number} x
             *        x-position on the chart
             * @param {number} y
             *        y-position on the chart
             * @param {number} width
             *        width of the scrollbar
             * @param {number} height
             *        height of the scrollbar
             */
            position(x, y, width, height) {
                const scroller = this, options = scroller.options, { buttonsEnabled, margin = 0, vertical } = options, method = scroller.rendered ? 'animate' : 'attr';
                let xOffset = height, yOffset = 0;
                // Make the scrollbar visible when it is repositioned, #15763.
                scroller.group.show();
                scroller.x = x;
                scroller.y = y + this.trackBorderWidth;
                scroller.width = width; // Width with buttons
                scroller.height = height;
                scroller.xOffset = xOffset;
                scroller.yOffset = yOffset;
                // If Scrollbar is a vertical type, swap options:
                if (vertical) {
                    scroller.width = scroller.yOffset = width = yOffset = scroller.size;
                    scroller.xOffset = xOffset = 0;
                    scroller.yOffset = yOffset = buttonsEnabled ? scroller.size : 0;
                    // Width without buttons
                    scroller.barWidth = height - (buttonsEnabled ? width * 2 : 0);
                    scroller.x = x = x + margin;
                }
                else {
                    scroller.height = height = scroller.size;
                    scroller.xOffset = xOffset = buttonsEnabled ? scroller.size : 0;
                    // Width without buttons
                    scroller.barWidth = width - (buttonsEnabled ? height * 2 : 0);
                    scroller.y = scroller.y + margin;
                }
                // Set general position for a group:
                scroller.group[method]({
                    translateX: x,
                    translateY: scroller.y
                });
                // Resize background/track:
                scroller.track[method]({
                    width: width,
                    height: height
                });
                // Move right/bottom button to its place:
                scroller.scrollbarButtons[1][method]({
                    translateX: vertical ? 0 : width - xOffset,
                    translateY: vertical ? height - yOffset : 0
                });
            }
            /**
             * Removes the event handlers attached previously with addEvents.
             *
             * @private
             * @function Highcharts.Scrollbar#removeEvents
             */
            removeEvents() {
                this._events.forEach(function (args) {
                    removeEvent.apply(null, args);
                });
                this._events.length = 0;
            }
            /**
             * Render scrollbar with all required items.
             *
             * @private
             * @function Highcharts.Scrollbar#render
             */
            render() {
                const scroller = this, renderer = scroller.renderer, options = scroller.options, size = scroller.size, styledMode = scroller.chart.styledMode, group = renderer.g('scrollbar')
                    .attr({
                    zIndex: options.zIndex
                })
                    .hide() // Initially hide the scrollbar #15863
                    .add();
                // Draw the scrollbar group
                scroller.group = group;
                // Draw the scrollbar track:
                scroller.track = renderer.rect()
                    .addClass('highcharts-scrollbar-track')
                    .attr({
                    r: options.trackBorderRadius || 0,
                    height: size,
                    width: size
                }).add(group);
                if (!styledMode) {
                    scroller.track.attr({
                        fill: options.trackBackgroundColor,
                        stroke: options.trackBorderColor,
                        'stroke-width': options.trackBorderWidth
                    });
                }
                const trackBorderWidth = scroller.trackBorderWidth =
                    scroller.track.strokeWidth();
                scroller.track.attr({
                    x: -crisp(0, trackBorderWidth),
                    y: -crisp(0, trackBorderWidth)
                });
                // Draw the scrollbar itself
                scroller.scrollbarGroup = renderer.g().add(group);
                scroller.scrollbar = renderer.rect()
                    .addClass('highcharts-scrollbar-thumb')
                    .attr({
                    height: size - trackBorderWidth,
                    width: size - trackBorderWidth,
                    r: options.barBorderRadius || 0
                }).add(scroller.scrollbarGroup);
                scroller.scrollbarRifles = renderer
                    .path(Scrollbar.swapXY([
                    ['M', -3, size / 4],
                    ['L', -3, 2 * size / 3],
                    ['M', 0, size / 4],
                    ['L', 0, 2 * size / 3],
                    ['M', 3, size / 4],
                    ['L', 3, 2 * size / 3]
                ], options.vertical))
                    .addClass('highcharts-scrollbar-rifles')
                    .add(scroller.scrollbarGroup);
                if (!styledMode) {
                    scroller.scrollbar.attr({
                        fill: options.barBackgroundColor,
                        stroke: options.barBorderColor,
                        'stroke-width': options.barBorderWidth
                    });
                    scroller.scrollbarRifles.attr({
                        stroke: options.rifleColor,
                        'stroke-width': 1
                    });
                }
                scroller.scrollbarStrokeWidth = scroller.scrollbar.strokeWidth();
                scroller.scrollbarGroup.translate(-crisp(0, scroller.scrollbarStrokeWidth), -crisp(0, scroller.scrollbarStrokeWidth));
                // Draw the buttons:
                scroller.drawScrollbarButton(0);
                scroller.drawScrollbarButton(1);
            }
            /**
             * Set scrollbar size, with a given scale.
             *
             * @private
             * @function Highcharts.Scrollbar#setRange
             * @param {number} from
             *        scale (0-1) where bar should start
             * @param {number} to
             *        scale (0-1) where bar should end
             */
            setRange(from, to) {
                const scroller = this, options = scroller.options, vertical = options.vertical, minWidth = options.minWidth, fullWidth = scroller.barWidth, method = (this.rendered &&
                    !this.hasDragged &&
                    !(this.chart.navigator && this.chart.navigator.hasDragged)) ? 'animate' : 'attr';
                if (!defined(fullWidth)) {
                    return;
                }
                const toPX = fullWidth * Math.min(to, 1);
                let fromPX, newSize;
                from = Math.max(from, 0);
                fromPX = Math.ceil(fullWidth * from);
                scroller.calculatedWidth = newSize = correctFloat(toPX - fromPX);
                // We need to recalculate position, if minWidth is used
                if (newSize < minWidth) {
                    fromPX = (fullWidth - minWidth + newSize) * from;
                    newSize = minWidth;
                }
                const newPos = Math.floor(fromPX + scroller.xOffset + scroller.yOffset);
                const newRiflesPos = newSize / 2 - 0.5; // -0.5 -> rifle line width / 2
                // Store current position:
                scroller.from = from;
                scroller.to = to;
                if (!vertical) {
                    scroller.scrollbarGroup[method]({
                        translateX: newPos
                    });
                    scroller.scrollbar[method]({
                        width: newSize
                    });
                    scroller.scrollbarRifles[method]({
                        translateX: newRiflesPos
                    });
                    scroller.scrollbarLeft = newPos;
                    scroller.scrollbarTop = 0;
                }
                else {
                    scroller.scrollbarGroup[method]({
                        translateY: newPos
                    });
                    scroller.scrollbar[method]({
                        height: newSize
                    });
                    scroller.scrollbarRifles[method]({
                        translateY: newRiflesPos
                    });
                    scroller.scrollbarTop = newPos;
                    scroller.scrollbarLeft = 0;
                }
                if (newSize <= 12) {
                    scroller.scrollbarRifles.hide();
                }
                else {
                    scroller.scrollbarRifles.show();
                }
                // Show or hide the scrollbar based on the showFull setting
                if (options.showFull === false) {
                    if (from <= 0 && to >= 1) {
                        scroller.group.hide();
                    }
                    else {
                        scroller.group.show();
                    }
                }
                scroller.rendered = true;
            }
            /**
             * Checks if the extremes should be updated in response to a scrollbar
             * change event.
             *
             * @private
             * @function Highcharts.Scrollbar#shouldUpdateExtremes
             */
            shouldUpdateExtremes(eventType) {
                return (pick(this.options.liveRedraw, H.svg &&
                    !H.isTouchDevice &&
                    !this.chart.boosted) ||
                    // Mouseup always should change extremes
                    eventType === 'mouseup' ||
                    eventType === 'touchend' ||
                    // Internal events
                    !defined(eventType));
            }
            trackClick(e) {
                const scroller = this;
                const normalizedEvent = scroller.chart.pointer?.normalize(e) || e, range = scroller.to - scroller.from, top = scroller.y + scroller.scrollbarTop, left = scroller.x + scroller.scrollbarLeft;
                if ((scroller.options.vertical && normalizedEvent.chartY > top) ||
                    (!scroller.options.vertical && normalizedEvent.chartX > left)) {
                    // On the top or on the left side of the track:
                    scroller.updatePosition(scroller.from + range, scroller.to + range);
                }
                else {
                    // On the bottom or the right side of the track:
                    scroller.updatePosition(scroller.from - range, scroller.to - range);
                }
                fireEvent(scroller, 'changed', {
                    from: scroller.from,
                    to: scroller.to,
                    trigger: 'scrollbar',
                    DOMEvent: e
                });
            }
            /**
             * Update the scrollbar with new options
             *
             * @private
             * @function Highcharts.Scrollbar#update
             * @param  {Highcharts.ScrollbarOptions} options
             */
            update(options) {
                this.destroy();
                this.init(this.chart.renderer, merge(true, this.options, options), this.chart);
            }
            /**
             * Update position option in the Scrollbar, with normalized 0-1 scale
             *
             * @private
             * @function Highcharts.Scrollbar#updatePosition
             * @param  {number} from
             * @param  {number} to
             */
            updatePosition(from, to) {
                if (to > 1) {
                    from = correctFloat(1 - correctFloat(to - from));
                    to = 1;
                }
                if (from < 0) {
                    to = correctFloat(to - from);
                    from = 0;
                }
                this.from = from;
                this.to = to;
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        Scrollbar.defaultOptions = ScrollbarDefaults;
        /* *
         *
         *  Registry
         *
         * */
        defaultOptions.scrollbar = merge(true, Scrollbar.defaultOptions, defaultOptions.scrollbar);
        /* *
         *
         *  Default Export
         *
         * */

        return Scrollbar;
    });
    _registerModule(_modules, 'Stock/Navigator/Navigator.js', [_modules['Core/Axis/Axis.js'], _modules['Stock/Navigator/ChartNavigatorComposition.js'], _modules['Core/Defaults.js'], _modules['Core/Globals.js'], _modules['Core/Axis/NavigatorAxisComposition.js'], _modules['Stock/Navigator/NavigatorComposition.js'], _modules['Stock/Scrollbar/Scrollbar.js'], _modules['Core/Renderer/SVG/SVGRenderer.js'], _modules['Core/Utilities.js']], function (Axis, ChartNavigatorComposition, D, H, NavigatorAxisAdditions, NavigatorComposition, Scrollbar, SVGRenderer, U) {
        /* *
         *
         *  (c) 2010-2024 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { defaultOptions } = D;
        const { isTouchDevice } = H;
        const { prototype: { symbols } } = SVGRenderer;
        const { addEvent, clamp, correctFloat, defined, destroyObjectProperties, erase, extend, find, fireEvent, isArray, isNumber, merge, pick, removeEvent, splat } = U;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Finding the min or max of a set of variables where we don't know if they are
         * defined, is a pattern that is repeated several places in Highcharts. Consider
         * making this a global utility method.
         * @private
         */
        function numExt(extreme, ...args) {
            const numbers = [].filter.call(args, isNumber);
            if (numbers.length) {
                return Math[extreme].apply(0, numbers);
            }
        }
        /* *
         *
         *  Class
         *
         * */
        /**
         * The Navigator class
         *
         * @private
         * @class
         * @name Highcharts.Navigator
         *
         * @param {Highcharts.Chart} chart
         *        Chart object
         */
        class Navigator {
            /* *
             *
             *  Static Properties
             *
             * */
            static compose(ChartClass, AxisClass, SeriesClass) {
                ChartNavigatorComposition.compose(ChartClass, Navigator);
                NavigatorComposition.compose(ChartClass, AxisClass, SeriesClass);
            }
            /* *
             *
             *  Constructor
             *
             * */
            constructor(chart) {
                this.isDirty = false;
                this.scrollbarHeight = 0;
                this.init(chart);
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Draw one of the handles on the side of the zoomed range in the navigator.
             *
             * @private
             * @function Highcharts.Navigator#drawHandle
             *
             * @param {number} x
             *        The x center for the handle
             *
             * @param {number} index
             *        0 for left and 1 for right
             *
             * @param {boolean|undefined} inverted
             *        Flag for chart.inverted
             *
             * @param {string} verb
             *        Use 'animate' or 'attr'
             */
            drawHandle(x, index, inverted, verb) {
                const navigator = this, height = navigator.navigatorOptions.handles.height;
                // Place it
                navigator.handles[index][verb](inverted ? {
                    translateX: Math.round(navigator.left + navigator.height / 2),
                    translateY: Math.round(navigator.top + parseInt(x, 10) + 0.5 - height)
                } : {
                    translateX: Math.round(navigator.left + parseInt(x, 10)),
                    translateY: Math.round(navigator.top + navigator.height / 2 - height / 2 - 1)
                });
            }
            /**
             * Render outline around the zoomed range
             *
             * @private
             * @function Highcharts.Navigator#drawOutline
             *
             * @param {number} zoomedMin
             *        in pixels position where zoomed range starts
             *
             * @param {number} zoomedMax
             *        in pixels position where zoomed range ends
             *
             * @param {boolean|undefined} inverted
             *        flag if chart is inverted
             *
             * @param {string} verb
             *        use 'animate' or 'attr'
             */
            drawOutline(zoomedMin, zoomedMax, inverted, verb) {
                const navigator = this, maskInside = navigator.navigatorOptions.maskInside, outlineWidth = navigator.outline.strokeWidth(), halfOutline = outlineWidth / 2, outlineCorrection = (outlineWidth % 2) / 2, // #5800
                scrollButtonSize = navigator.scrollButtonSize, navigatorSize = navigator.size, navigatorTop = navigator.top, height = navigator.height, lineTop = navigatorTop - halfOutline, lineBtm = navigatorTop + height;
                let left = navigator.left, verticalMin, path;
                if (inverted) {
                    verticalMin = navigatorTop + zoomedMax + outlineCorrection;
                    zoomedMax = navigatorTop + zoomedMin + outlineCorrection;
                    path = [
                        [
                            'M',
                            left + height,
                            navigatorTop - scrollButtonSize - outlineCorrection
                        ],
                        // Top right of zoomed range
                        ['L', left + height, verticalMin],
                        ['L', left, verticalMin], // Top left of z.r.
                        ['M', left, zoomedMax], // Bottom left of z.r.
                        ['L', left + height, zoomedMax], // Bottom right of z.r.
                        [
                            'L',
                            left + height,
                            navigatorTop + navigatorSize + scrollButtonSize
                        ]
                    ];
                    if (maskInside) {
                        path.push(
                        // Upper left of zoomed range
                        ['M', left + height, verticalMin - halfOutline], 
                        // Upper right of z.r.
                        [
                            'L',
                            left + height,
                            zoomedMax + halfOutline
                        ]);
                    }
                }
                else {
                    left -= scrollButtonSize;
                    zoomedMin += left + scrollButtonSize - outlineCorrection;
                    zoomedMax += left + scrollButtonSize - outlineCorrection;
                    path = [
                        // Left
                        ['M', left, lineTop],
                        // Upper left of zoomed range
                        ['L', zoomedMin, lineTop],
                        // Lower left of z.r.
                        ['L', zoomedMin, lineBtm],
                        // Lower right of z.r.
                        ['M', zoomedMax, lineBtm],
                        // Upper right of z.r.
                        ['L', zoomedMax, lineTop],
                        // Right
                        [
                            'L',
                            left + navigatorSize + scrollButtonSize * 2,
                            lineTop
                        ]
                    ];
                    if (maskInside) {
                        path.push(
                        // Upper left of zoomed range
                        ['M', zoomedMin - halfOutline, lineTop], 
                        // Upper right of z.r.
                        ['L', zoomedMax + halfOutline, lineTop]);
                    }
                }
                navigator.outline[verb]({
                    d: path
                });
            }
            /**
             * Render outline around the zoomed range
             *
             * @private
             * @function Highcharts.Navigator#drawMasks
             *
             * @param {number} zoomedMin
             *        in pixels position where zoomed range starts
             *
             * @param {number} zoomedMax
             *        in pixels position where zoomed range ends
             *
             * @param {boolean|undefined} inverted
             *        flag if chart is inverted
             *
             * @param {string} verb
             *        use 'animate' or 'attr'
             */
            drawMasks(zoomedMin, zoomedMax, inverted, verb) {
                const navigator = this, left = navigator.left, top = navigator.top, navigatorHeight = navigator.height;
                let height, width, x, y;
                // Determine rectangle position & size
                // According to (non)inverted position:
                if (inverted) {
                    x = [left, left, left];
                    y = [top, top + zoomedMin, top + zoomedMax];
                    width = [navigatorHeight, navigatorHeight, navigatorHeight];
                    height = [
                        zoomedMin,
                        zoomedMax - zoomedMin,
                        navigator.size - zoomedMax
                    ];
                }
                else {
                    x = [left, left + zoomedMin, left + zoomedMax];
                    y = [top, top, top];
                    width = [
                        zoomedMin,
                        zoomedMax - zoomedMin,
                        navigator.size - zoomedMax
                    ];
                    height = [navigatorHeight, navigatorHeight, navigatorHeight];
                }
                navigator.shades.forEach((shade, i) => {
                    shade[verb]({
                        x: x[i],
                        y: y[i],
                        width: width[i],
                        height: height[i]
                    });
                });
            }
            /**
             * Generate and update DOM elements for a navigator:
             *
             * - main navigator group
             *
             * - all shades
             *
             * - outline
             *
             * - handles
             *
             * @private
             * @function Highcharts.Navigator#renderElements
             */
            renderElements() {
                const navigator = this, navigatorOptions = navigator.navigatorOptions, maskInside = navigatorOptions.maskInside, chart = navigator.chart, inverted = chart.inverted, renderer = chart.renderer, mouseCursor = {
                    cursor: inverted ? 'ns-resize' : 'ew-resize'
                }, 
                // Create the main navigator group
                navigatorGroup = navigator.navigatorGroup ??
                    (navigator.navigatorGroup = renderer
                        .g('navigator')
                        .attr({
                        zIndex: 8,
                        visibility: 'hidden'
                    })
                        .add());
                // Create masks, each mask will get events and fill:
                [
                    !maskInside,
                    maskInside,
                    !maskInside
                ].forEach((hasMask, index) => {
                    const shade = navigator.shades[index] ??
                        (navigator.shades[index] = renderer.rect()
                            .addClass('highcharts-navigator-mask' +
                            (index === 1 ? '-inside' : '-outside'))
                            .add(navigatorGroup));
                    if (!chart.styledMode) {
                        shade.attr({
                            fill: hasMask ? navigatorOptions.maskFill : 'rgba(0,0,0,0)'
                        });
                        if (index === 1) {
                            shade.css(mouseCursor);
                        }
                    }
                });
                // Create the outline:
                if (!navigator.outline) {
                    navigator.outline = renderer.path()
                        .addClass('highcharts-navigator-outline')
                        .add(navigatorGroup);
                }
                if (!chart.styledMode) {
                    navigator.outline.attr({
                        'stroke-width': navigatorOptions.outlineWidth,
                        stroke: navigatorOptions.outlineColor
                    });
                }
                // Create the handlers:
                if (navigatorOptions.handles?.enabled) {
                    const handlesOptions = navigatorOptions.handles, { height, width } = handlesOptions;
                    [0, 1].forEach((index) => {
                        const symbolName = handlesOptions.symbols[index];
                        if (!navigator.handles[index]) {
                            navigator.handles[index] = renderer.symbol(symbolName, -width / 2 - 1, 0, width, height, handlesOptions);
                            // Z index is 6 for right handle, 7 for left. Can't be 10,
                            // because of the tooltip in inverted chart (#2908).
                            navigator.handles[index].attr({ zIndex: 7 - index })
                                .addClass('highcharts-navigator-handle ' +
                                'highcharts-navigator-handle-' +
                                ['left', 'right'][index]).add(navigatorGroup);
                            // If the navigator symbol changed, update its path and name
                        }
                        else if (symbolName !== navigator.handles[index].symbolName) {
                            const symbolFn = symbols[symbolName], path = symbolFn.call(symbols, -width / 2 - 1, 0, width, height);
                            navigator.handles[index].attr({
                                d: path
                            });
                            navigator.handles[index].symbolName = symbolName;
                        }
                        if (chart.inverted) {
                            navigator.handles[index].attr({
                                rotation: 90,
                                rotationOriginX: Math.floor(-width / 2),
                                rotationOriginY: (height + width) / 2
                            });
                        }
                        if (!chart.styledMode) {
                            navigator.handles[index]
                                .attr({
                                fill: handlesOptions.backgroundColor,
                                stroke: handlesOptions.borderColor,
                                'stroke-width': handlesOptions.lineWidth,
                                width: handlesOptions.width,
                                height: handlesOptions.height,
                                x: -width / 2 - 1,
                                y: 0
                            })
                                .css(mouseCursor);
                        }
                    });
                }
            }
            /**
             * Update navigator
             *
             * @private
             * @function Highcharts.Navigator#update
             *
             * @param {Highcharts.NavigatorOptions} options
             *        Options to merge in when updating navigator
             */
            update(options, redraw = false) {
                const chart = this.chart, invertedUpdate = chart.options.chart.inverted !==
                    chart.scrollbar?.options.vertical;
                merge(true, chart.options.navigator, options);
                this.navigatorOptions = chart.options.navigator || {};
                this.setOpposite();
                // Revert to destroy/init for navigator/scrollbar enabled toggle
                if (defined(options.enabled) || invertedUpdate) {
                    this.destroy();
                    this.navigatorEnabled = options.enabled || this.navigatorEnabled;
                    return this.init(chart);
                }
                if (this.navigatorEnabled) {
                    this.isDirty = true;
                    if (options.adaptToUpdatedData === false) {
                        this.baseSeries.forEach((series) => {
                            removeEvent(series, 'updatedData', this.updatedDataHandler);
                        }, this);
                    }
                    if (options.adaptToUpdatedData) {
                        this.baseSeries.forEach((series) => {
                            series.eventsToUnbind.push(addEvent(series, 'updatedData', this.updatedDataHandler));
                        }, this);
                    }
                    // Update navigator series
                    if (options.series || options.baseSeries) {
                        this.setBaseSeries(void 0, false);
                    }
                    // Update navigator axis
                    if (options.height || options.xAxis || options.yAxis) {
                        this.height = options.height ?? this.height;
                        const offsets = this.getXAxisOffsets();
                        this.xAxis.update({
                            ...options.xAxis,
                            offsets,
                            [chart.inverted ? 'width' : 'height']: this.height,
                            [chart.inverted ? 'height' : 'width']: void 0
                        }, false);
                        this.yAxis.update({
                            ...options.yAxis,
                            [chart.inverted ? 'width' : 'height']: this.height
                        }, false);
                    }
                }
                if (redraw) {
                    chart.redraw();
                }
            }
            /**
             * Render the navigator
             *
             * @private
             * @function Highcharts.Navigator#render
             * @param {number} min
             *        X axis value minimum
             * @param {number} max
             *        X axis value maximum
             * @param {number} [pxMin]
             *        Pixel value minimum
             * @param {number} [pxMax]
             *        Pixel value maximum
             */
            render(min, max, pxMin, pxMax) {
                const navigator = this, chart = navigator.chart, xAxis = navigator.xAxis, pointRange = xAxis.pointRange || 0, scrollbarXAxis = xAxis.navigatorAxis.fake ? chart.xAxis[0] : xAxis, navigatorEnabled = navigator.navigatorEnabled, rendered = navigator.rendered, inverted = chart.inverted, minRange = chart.xAxis[0].minRange, maxRange = chart.xAxis[0].options.maxRange, scrollButtonSize = navigator.scrollButtonSize;
                let navigatorWidth, scrollbarLeft, scrollbarTop, scrollbarHeight = navigator.scrollbarHeight, navigatorSize, verb;
                // Don't redraw while moving the handles (#4703).
                if (this.hasDragged && !defined(pxMin)) {
                    return;
                }
                if (this.isDirty) {
                    // Update DOM navigator elements
                    this.renderElements();
                }
                min = correctFloat(min - pointRange / 2);
                max = correctFloat(max + pointRange / 2);
                // Don't render the navigator until we have data (#486, #4202, #5172).
                if (!isNumber(min) || !isNumber(max)) {
                    // However, if navigator was already rendered, we may need to resize
                    // it. For example hidden series, but visible navigator (#6022).
                    if (rendered) {
                        pxMin = 0;
                        pxMax = pick(xAxis.width, scrollbarXAxis.width);
                    }
                    else {
                        return;
                    }
                }
                navigator.left = pick(xAxis.left, 
                // In case of scrollbar only, without navigator
                chart.plotLeft + scrollButtonSize +
                    (inverted ? chart.plotWidth : 0));
                let zoomedMax = navigator.size = navigatorSize = pick(xAxis.len, (inverted ? chart.plotHeight : chart.plotWidth) -
                    2 * scrollButtonSize);
                if (inverted) {
                    navigatorWidth = scrollbarHeight;
                }
                else {
                    navigatorWidth = navigatorSize + 2 * scrollButtonSize;
                }
                // Get the pixel position of the handles
                pxMin = pick(pxMin, xAxis.toPixels(min, true));
                pxMax = pick(pxMax, xAxis.toPixels(max, true));
                // Verify (#1851, #2238)
                if (!isNumber(pxMin) || Math.abs(pxMin) === Infinity) {
                    pxMin = 0;
                    pxMax = navigatorWidth;
                }
                // Are we below the minRange? (#2618, #6191)
                const newMin = xAxis.toValue(pxMin, true), newMax = xAxis.toValue(pxMax, true), currentRange = Math.abs(correctFloat(newMax - newMin));
                if (currentRange < minRange) {
                    if (this.grabbedLeft) {
                        pxMin = xAxis.toPixels(newMax - minRange - pointRange, true);
                    }
                    else if (this.grabbedRight) {
                        pxMax = xAxis.toPixels(newMin + minRange + pointRange, true);
                    }
                }
                else if (defined(maxRange) &&
                    correctFloat(currentRange - pointRange) > maxRange) {
                    if (this.grabbedLeft) {
                        pxMin = xAxis.toPixels(newMax - maxRange - pointRange, true);
                    }
                    else if (this.grabbedRight) {
                        pxMax = xAxis.toPixels(newMin + maxRange + pointRange, true);
                    }
                }
                // Handles are allowed to cross, but never exceed the plot area
                navigator.zoomedMax = clamp(Math.max(pxMin, pxMax), 0, zoomedMax);
                navigator.zoomedMin = clamp(navigator.fixedWidth ?
                    navigator.zoomedMax - navigator.fixedWidth :
                    Math.min(pxMin, pxMax), 0, zoomedMax);
                navigator.range = navigator.zoomedMax - navigator.zoomedMin;
                zoomedMax = Math.round(navigator.zoomedMax);
                const zoomedMin = Math.round(navigator.zoomedMin);
                if (navigatorEnabled) {
                    navigator.navigatorGroup.attr({
                        visibility: 'inherit'
                    });
                    // Place elements
                    verb = rendered && !navigator.hasDragged ? 'animate' : 'attr';
                    navigator.drawMasks(zoomedMin, zoomedMax, inverted, verb);
                    navigator.drawOutline(zoomedMin, zoomedMax, inverted, verb);
                    if (navigator.navigatorOptions.handles.enabled) {
                        navigator.drawHandle(zoomedMin, 0, inverted, verb);
                        navigator.drawHandle(zoomedMax, 1, inverted, verb);
                    }
                }
                if (navigator.scrollbar) {
                    if (inverted) {
                        scrollbarTop = navigator.top - scrollButtonSize;
                        scrollbarLeft = navigator.left - scrollbarHeight +
                            (navigatorEnabled || !scrollbarXAxis.opposite ? 0 :
                                // Multiple axes has offsets:
                                (scrollbarXAxis.titleOffset || 0) +
                                    // Self margin from the axis.title
                                    scrollbarXAxis.axisTitleMargin);
                        scrollbarHeight = navigatorSize + 2 * scrollButtonSize;
                    }
                    else {
                        scrollbarTop = navigator.top + (navigatorEnabled ?
                            navigator.height :
                            -scrollbarHeight);
                        scrollbarLeft = navigator.left - scrollButtonSize;
                    }
                    // Reposition scrollbar
                    navigator.scrollbar.position(scrollbarLeft, scrollbarTop, navigatorWidth, scrollbarHeight);
                    // Keep scale 0-1
                    navigator.scrollbar.setRange(
                    // Use real value, not rounded because range can be very small
                    // (#1716)
                    navigator.zoomedMin / (navigatorSize || 1), navigator.zoomedMax / (navigatorSize || 1));
                }
                navigator.rendered = true;
                this.isDirty = false;
                fireEvent(this, 'afterRender');
            }
            /**
             * Set up the mouse and touch events for the navigator
             *
             * @private
             * @function Highcharts.Navigator#addMouseEvents
             */
            addMouseEvents() {
                const navigator = this, chart = navigator.chart, container = chart.container;
                let eventsToUnbind = [], mouseMoveHandler, mouseUpHandler;
                /**
                 * Create mouse events' handlers.
                 * Make them as separate functions to enable wrapping them:
                 */
                navigator.mouseMoveHandler = mouseMoveHandler = function (e) {
                    navigator.onMouseMove(e);
                };
                navigator.mouseUpHandler = mouseUpHandler = function (e) {
                    navigator.onMouseUp(e);
                };
                // Add shades and handles mousedown events
                eventsToUnbind = navigator.getPartsEvents('mousedown');
                eventsToUnbind.push(
                // Add mouse move and mouseup events. These are bind to doc/div,
                // because Navigator.grabbedSomething flags are stored in mousedown
                // events
                addEvent(chart.renderTo, 'mousemove', mouseMoveHandler), addEvent(container.ownerDocument, 'mouseup', mouseUpHandler), 
                // Touch events
                addEvent(chart.renderTo, 'touchmove', mouseMoveHandler), addEvent(container.ownerDocument, 'touchend', mouseUpHandler));
                eventsToUnbind.concat(navigator.getPartsEvents('touchstart'));
                navigator.eventsToUnbind = eventsToUnbind;
                // Data events
                if (navigator.series && navigator.series[0]) {
                    eventsToUnbind.push(addEvent(navigator.series[0].xAxis, 'foundExtremes', function () {
                        chart.navigator.modifyNavigatorAxisExtremes();
                    }));
                }
            }
            /**
             * Generate events for handles and masks
             *
             * @private
             * @function Highcharts.Navigator#getPartsEvents
             *
             * @param {string} eventName
             *        Event name handler, 'mousedown' or 'touchstart'
             *
             * @return {Array<Function>}
             *         An array of functions to remove navigator functions from the
             *         events again.
             */
            getPartsEvents(eventName) {
                const navigator = this, events = [];
                ['shades', 'handles'].forEach(function (name) {
                    navigator[name].forEach(function (navigatorItem, index) {
                        events.push(addEvent(navigatorItem.element, eventName, function (e) {
                            navigator[name + 'Mousedown'](e, index);
                        }));
                    });
                });
                return events;
            }
            /**
             * Mousedown on a shaded mask, either:
             *
             * - will be stored for future drag&drop
             *
             * - will directly shift to a new range
             *
             * @private
             * @function Highcharts.Navigator#shadesMousedown
             *
             * @param {Highcharts.PointerEventObject} e
             *        Mouse event
             *
             * @param {number} index
             *        Index of a mask in Navigator.shades array
             */
            shadesMousedown(e, index) {
                e = this.chart.pointer?.normalize(e) || e;
                const navigator = this, chart = navigator.chart, xAxis = navigator.xAxis, zoomedMin = navigator.zoomedMin, navigatorSize = navigator.size, range = navigator.range;
                let navigatorPosition = navigator.left, chartX = e.chartX, fixedMax, fixedMin, ext, left;
                // For inverted chart, swap some options:
                if (chart.inverted) {
                    chartX = e.chartY;
                    navigatorPosition = navigator.top;
                }
                if (index === 1) {
                    // Store information for drag&drop
                    navigator.grabbedCenter = chartX;
                    navigator.fixedWidth = range;
                    navigator.dragOffset = chartX - zoomedMin;
                }
                else {
                    // Shift the range by clicking on shaded areas
                    left = chartX - navigatorPosition - range / 2;
                    if (index === 0) {
                        left = Math.max(0, left);
                    }
                    else if (index === 2 && left + range >= navigatorSize) {
                        left = navigatorSize - range;
                        if (navigator.reversedExtremes) {
                            // #7713
                            left -= range;
                            fixedMin = navigator.getUnionExtremes().dataMin;
                        }
                        else {
                            // #2293, #3543
                            fixedMax = navigator.getUnionExtremes().dataMax;
                        }
                    }
                    if (left !== zoomedMin) { // It has actually moved
                        navigator.fixedWidth = range; // #1370
                        ext = xAxis.navigatorAxis.toFixedRange(left, left + range, fixedMin, fixedMax);
                        if (defined(ext.min)) { // #7411
                            fireEvent(this, 'setRange', {
                                min: Math.min(ext.min, ext.max),
                                max: Math.max(ext.min, ext.max),
                                redraw: true,
                                eventArguments: {
                                    trigger: 'navigator'
                                }
                            });
                        }
                    }
                }
            }
            /**
             * Mousedown on a handle mask.
             * Will store necessary information for drag&drop.
             *
             * @private
             * @function Highcharts.Navigator#handlesMousedown
             * @param {Highcharts.PointerEventObject} e
             *        Mouse event
             * @param {number} index
             *        Index of a handle in Navigator.handles array
             */
            handlesMousedown(e, index) {
                e = this.chart.pointer?.normalize(e) || e;
                const navigator = this, chart = navigator.chart, baseXAxis = chart.xAxis[0], 
                // For reversed axes, min and max are changed,
                // so the other extreme should be stored
                reverse = navigator.reversedExtremes;
                if (index === 0) {
                    // Grab the left handle
                    navigator.grabbedLeft = true;
                    navigator.otherHandlePos = navigator.zoomedMax;
                    navigator.fixedExtreme = reverse ? baseXAxis.min : baseXAxis.max;
                }
                else {
                    // Grab the right handle
                    navigator.grabbedRight = true;
                    navigator.otherHandlePos = navigator.zoomedMin;
                    navigator.fixedExtreme = reverse ? baseXAxis.max : baseXAxis.min;
                }
                chart.setFixedRange(void 0);
            }
            /**
             * Mouse move event based on x/y mouse position.
             *
             * @private
             * @function Highcharts.Navigator#onMouseMove
             *
             * @param {Highcharts.PointerEventObject} e
             *        Mouse event
             */
            onMouseMove(e) {
                const navigator = this, chart = navigator.chart, navigatorSize = navigator.navigatorSize, range = navigator.range, dragOffset = navigator.dragOffset, inverted = chart.inverted;
                let left = navigator.left, chartX;
                // In iOS, a mousemove event with e.pageX === 0 is fired when holding
                // the finger down in the center of the scrollbar. This should be
                // ignored.
                if (!e.touches || e.touches[0].pageX !== 0) { // #4696
                    e = chart.pointer?.normalize(e) || e;
                    chartX = e.chartX;
                    // Swap some options for inverted chart
                    if (inverted) {
                        left = navigator.top;
                        chartX = e.chartY;
                    }
                    // Drag left handle or top handle
                    if (navigator.grabbedLeft) {
                        navigator.hasDragged = true;
                        navigator.render(0, 0, chartX - left, navigator.otherHandlePos);
                        // Drag right handle or bottom handle
                    }
                    else if (navigator.grabbedRight) {
                        navigator.hasDragged = true;
                        navigator.render(0, 0, navigator.otherHandlePos, chartX - left);
                        // Drag scrollbar or open area in navigator
                    }
                    else if (navigator.grabbedCenter) {
                        navigator.hasDragged = true;
                        if (chartX < dragOffset) { // Outside left
                            chartX = dragOffset;
                            // Outside right
                        }
                        else if (chartX >
                            navigatorSize + dragOffset - range) {
                            chartX = navigatorSize + dragOffset - range;
                        }
                        navigator.render(0, 0, chartX - dragOffset, chartX - dragOffset + range);
                    }
                    if (navigator.hasDragged &&
                        navigator.scrollbar &&
                        pick(navigator.scrollbar.options.liveRedraw, 
                        // By default, don't run live redraw on touch
                        // devices or if the chart is in boost.
                        !isTouchDevice &&
                            !this.chart.boosted)) {
                        e.DOMType = e.type;
                        setTimeout(function () {
                            navigator.onMouseUp(e);
                        }, 0);
                    }
                }
            }
            /**
             * Mouse up event based on x/y mouse position.
             *
             * @private
             * @function Highcharts.Navigator#onMouseUp
             * @param {Highcharts.PointerEventObject} e
             *        Mouse event
             */
            onMouseUp(e) {
                const navigator = this, chart = navigator.chart, xAxis = navigator.xAxis, scrollbar = navigator.scrollbar, DOMEvent = e.DOMEvent || e, inverted = chart.inverted, verb = navigator.rendered && !navigator.hasDragged ?
                    'animate' : 'attr';
                let zoomedMax, zoomedMin, unionExtremes, fixedMin, fixedMax, ext;
                if (
                // MouseUp is called for both, navigator and scrollbar (that order),
                // which causes calling afterSetExtremes twice. Prevent first call
                // by checking if scrollbar is going to set new extremes (#6334)
                (navigator.hasDragged && (!scrollbar || !scrollbar.hasDragged)) ||
                    e.trigger === 'scrollbar') {
                    unionExtremes = navigator.getUnionExtremes();
                    // When dragging one handle, make sure the other one doesn't change
                    if (navigator.zoomedMin === navigator.otherHandlePos) {
                        fixedMin = navigator.fixedExtreme;
                    }
                    else if (navigator.zoomedMax === navigator.otherHandlePos) {
                        fixedMax = navigator.fixedExtreme;
                    }
                    // Snap to right edge (#4076)
                    if (navigator.zoomedMax === navigator.size) {
                        fixedMax = navigator.reversedExtremes ?
                            unionExtremes.dataMin :
                            unionExtremes.dataMax;
                    }
                    // Snap to left edge (#7576)
                    if (navigator.zoomedMin === 0) {
                        fixedMin = navigator.reversedExtremes ?
                            unionExtremes.dataMax :
                            unionExtremes.dataMin;
                    }
                    ext = xAxis.navigatorAxis.toFixedRange(navigator.zoomedMin, navigator.zoomedMax, fixedMin, fixedMax);
                    if (defined(ext.min)) {
                        fireEvent(this, 'setRange', {
                            min: Math.min(ext.min, ext.max),
                            max: Math.max(ext.min, ext.max),
                            redraw: true,
                            animation: navigator.hasDragged ? false : null,
                            eventArguments: {
                                trigger: 'navigator',
                                triggerOp: 'navigator-drag',
                                DOMEvent: DOMEvent // #1838
                            }
                        });
                    }
                }
                if (e.DOMType !== 'mousemove' &&
                    e.DOMType !== 'touchmove') {
                    navigator.grabbedLeft = navigator.grabbedRight =
                        navigator.grabbedCenter = navigator.fixedWidth =
                            navigator.fixedExtreme = navigator.otherHandlePos =
                                navigator.hasDragged = navigator.dragOffset = null;
                }
                // Update position of navigator shades, outline and handles (#12573)
                if (navigator.navigatorEnabled &&
                    isNumber(navigator.zoomedMin) &&
                    isNumber(navigator.zoomedMax)) {
                    zoomedMin = Math.round(navigator.zoomedMin);
                    zoomedMax = Math.round(navigator.zoomedMax);
                    if (navigator.shades) {
                        navigator.drawMasks(zoomedMin, zoomedMax, inverted, verb);
                    }
                    if (navigator.outline) {
                        navigator.drawOutline(zoomedMin, zoomedMax, inverted, verb);
                    }
                    if (navigator.navigatorOptions.handles.enabled &&
                        Object.keys(navigator.handles).length ===
                            navigator.handles.length) {
                        navigator.drawHandle(zoomedMin, 0, inverted, verb);
                        navigator.drawHandle(zoomedMax, 1, inverted, verb);
                    }
                }
            }
            /**
             * Removes the event handlers attached previously with addEvents.
             *
             * @private
             * @function Highcharts.Navigator#removeEvents
             */
            removeEvents() {
                if (this.eventsToUnbind) {
                    this.eventsToUnbind.forEach(function (unbind) {
                        unbind();
                    });
                    this.eventsToUnbind = void 0;
                }
                this.removeBaseSeriesEvents();
            }
            /**
             * Remove data events.
             *
             * @private
             * @function Highcharts.Navigator#removeBaseSeriesEvents
             */
            removeBaseSeriesEvents() {
                const baseSeries = this.baseSeries || [];
                if (this.navigatorEnabled && baseSeries[0]) {
                    if (this.navigatorOptions.adaptToUpdatedData !== false) {
                        baseSeries.forEach(function (series) {
                            removeEvent(series, 'updatedData', this.updatedDataHandler);
                        }, this);
                    }
                    // We only listen for extremes-events on the first baseSeries
                    if (baseSeries[0].xAxis) {
                        removeEvent(baseSeries[0].xAxis, 'foundExtremes', this.modifyBaseAxisExtremes);
                    }
                }
            }
            /**
             * Calculate the navigator xAxis offsets
             *
             * @private
             */
            getXAxisOffsets() {
                return (this.chart.inverted ?
                    [this.scrollButtonSize, 0, -this.scrollButtonSize, 0] :
                    [0, -this.scrollButtonSize, 0, this.scrollButtonSize]);
            }
            /**
             * Initialize the Navigator object
             *
             * @private
             * @function Highcharts.Navigator#init
             */
            init(chart) {
                const chartOptions = chart.options, navigatorOptions = chartOptions.navigator || {}, navigatorEnabled = navigatorOptions.enabled, scrollbarOptions = chartOptions.scrollbar || {}, scrollbarEnabled = scrollbarOptions.enabled, height = navigatorEnabled && navigatorOptions.height || 0, scrollbarHeight = scrollbarEnabled && scrollbarOptions.height || 0, scrollButtonSize = scrollbarOptions.buttonsEnabled && scrollbarHeight || 0;
                this.handles = [];
                this.shades = [];
                this.chart = chart;
                this.setBaseSeries();
                this.height = height;
                this.scrollbarHeight = scrollbarHeight;
                this.scrollButtonSize = scrollButtonSize;
                this.scrollbarEnabled = scrollbarEnabled;
                this.navigatorEnabled = navigatorEnabled;
                this.navigatorOptions = navigatorOptions;
                this.scrollbarOptions = scrollbarOptions;
                this.setOpposite();
                const navigator = this, baseSeries = navigator.baseSeries, xAxisIndex = chart.xAxis.length, yAxisIndex = chart.yAxis.length, baseXaxis = baseSeries && baseSeries[0] && baseSeries[0].xAxis ||
                    chart.xAxis[0] || { options: {} };
                chart.isDirtyBox = true;
                if (navigator.navigatorEnabled) {
                    const offsets = this.getXAxisOffsets();
                    // An x axis is required for scrollbar also
                    navigator.xAxis = new Axis(chart, merge({
                        // Inherit base xAxis' break, ordinal options and overscroll
                        breaks: baseXaxis.options.breaks,
                        ordinal: baseXaxis.options.ordinal,
                        overscroll: baseXaxis.options.overscroll
                    }, navigatorOptions.xAxis, {
                        type: 'datetime',
                        index: xAxisIndex,
                        isInternal: true,
                        offset: 0,
                        keepOrdinalPadding: true, // #2436
                        startOnTick: false,
                        endOnTick: false,
                        // Inherit base xAxis' padding when ordinal is false (#16915).
                        minPadding: baseXaxis.options.ordinal ? 0 :
                            baseXaxis.options.minPadding,
                        maxPadding: baseXaxis.options.ordinal ? 0 :
                            baseXaxis.options.maxPadding,
                        zoomEnabled: false
                    }, chart.inverted ? {
                        offsets,
                        width: height
                    } : {
                        offsets,
                        height
                    }), 'xAxis');
                    navigator.yAxis = new Axis(chart, merge(navigatorOptions.yAxis, {
                        alignTicks: false,
                        offset: 0,
                        index: yAxisIndex,
                        isInternal: true,
                        reversed: pick((navigatorOptions.yAxis &&
                            navigatorOptions.yAxis.reversed), (chart.yAxis[0] && chart.yAxis[0].reversed), false), // #14060
                        zoomEnabled: false
                    }, chart.inverted ? {
                        width: height
                    } : {
                        height: height
                    }), 'yAxis');
                    // If we have a base series, initialize the navigator series
                    if (baseSeries || navigatorOptions.series.data) {
                        navigator.updateNavigatorSeries(false);
                        // If not, set up an event to listen for added series
                    }
                    else if (chart.series.length === 0) {
                        navigator.unbindRedraw = addEvent(chart, 'beforeRedraw', function () {
                            // We've got one, now add it as base
                            if (chart.series.length > 0 && !navigator.series) {
                                navigator.setBaseSeries();
                                navigator.unbindRedraw(); // Reset
                            }
                        });
                    }
                    navigator.reversedExtremes = (chart.inverted && !navigator.xAxis.reversed) || (!chart.inverted && navigator.xAxis.reversed);
                    // Render items, so we can bind events to them:
                    navigator.renderElements();
                    // Add mouse events
                    navigator.addMouseEvents();
                    // In case of scrollbar only, fake an x axis to get translation
                }
                else {
                    navigator.xAxis = {
                        chart,
                        navigatorAxis: {
                            fake: true
                        },
                        translate: function (value, reverse) {
                            const axis = chart.xAxis[0], ext = axis.getExtremes(), scrollTrackWidth = axis.len - 2 * scrollButtonSize, min = numExt('min', axis.options.min, ext.dataMin), valueRange = numExt('max', axis.options.max, ext.dataMax) - min;
                            return reverse ?
                                // From pixel to value
                                (value * valueRange / scrollTrackWidth) + min :
                                // From value to pixel
                                scrollTrackWidth * (value - min) / valueRange;
                        },
                        toPixels: function (value) {
                            return this.translate(value);
                        },
                        toValue: function (value) {
                            return this.translate(value, true);
                        }
                    };
                    navigator.xAxis.navigatorAxis.axis = navigator.xAxis;
                    navigator.xAxis.navigatorAxis.toFixedRange = (NavigatorAxisAdditions.prototype.toFixedRange.bind(navigator.xAxis.navigatorAxis));
                }
                // Initialize the scrollbar
                if (chart.options.scrollbar.enabled) {
                    const options = merge(chart.options.scrollbar, { vertical: chart.inverted });
                    if (!isNumber(options.margin) && navigator.navigatorEnabled) {
                        options.margin = chart.inverted ? -3 : 3;
                    }
                    chart.scrollbar = navigator.scrollbar = new Scrollbar(chart.renderer, options, chart);
                    addEvent(navigator.scrollbar, 'changed', function (e) {
                        const range = navigator.size, to = range * this.to, from = range * this.from;
                        navigator.hasDragged = navigator.scrollbar.hasDragged;
                        navigator.render(0, 0, from, to);
                        if (this.shouldUpdateExtremes(e.DOMType)) {
                            setTimeout(function () {
                                navigator.onMouseUp(e);
                            });
                        }
                    });
                }
                // Add data events
                navigator.addBaseSeriesEvents();
                // Add redraw events
                navigator.addChartEvents();
            }
            /**
             * Set the opposite property on navigator
             *
             * @private
             */
            setOpposite() {
                const navigatorOptions = this.navigatorOptions, navigatorEnabled = this.navigatorEnabled, chart = this.chart;
                this.opposite = pick(navigatorOptions.opposite, Boolean(!navigatorEnabled && chart.inverted)); // #6262
            }
            /**
             * Get the union data extremes of the chart - the outer data extremes of the
             * base X axis and the navigator axis.
             *
             * @private
             * @function Highcharts.Navigator#getUnionExtremes
             */
            getUnionExtremes(returnFalseOnNoBaseSeries) {
                const baseAxis = this.chart.xAxis[0], navAxis = this.xAxis, navAxisOptions = navAxis.options, baseAxisOptions = baseAxis.options;
                let ret;
                if (!returnFalseOnNoBaseSeries || baseAxis.dataMin !== null) {
                    ret = {
                        dataMin: pick(// #4053
                        navAxisOptions && navAxisOptions.min, numExt('min', baseAxisOptions.min, baseAxis.dataMin, navAxis.dataMin, navAxis.min)),
                        dataMax: pick(navAxisOptions && navAxisOptions.max, numExt('max', baseAxisOptions.max, baseAxis.dataMax, navAxis.dataMax, navAxis.max))
                    };
                }
                return ret;
            }
            /**
             * Set the base series and update the navigator series from this. With a bit
             * of modification we should be able to make this an API method to be called
             * from the outside
             *
             * @private
             * @function Highcharts.Navigator#setBaseSeries
             * @param {Highcharts.SeriesOptionsType} [baseSeriesOptions]
             *        Additional series options for a navigator
             * @param {boolean} [redraw]
             *        Whether to redraw after update.
             */
            setBaseSeries(baseSeriesOptions, redraw) {
                const chart = this.chart, baseSeries = this.baseSeries = [];
                baseSeriesOptions = (baseSeriesOptions ||
                    chart.options && chart.options.navigator.baseSeries ||
                    (chart.series.length ?
                        // Find the first non-navigator series (#8430)
                        find(chart.series, (s) => (!s.options.isInternal)).index :
                        0));
                // Iterate through series and add the ones that should be shown in
                // navigator.
                (chart.series || []).forEach((series, i) => {
                    if (
                    // Don't include existing nav series
                    !series.options.isInternal &&
                        (series.options.showInNavigator ||
                            (i === baseSeriesOptions ||
                                series.options.id === baseSeriesOptions) &&
                                series.options.showInNavigator !== false)) {
                        baseSeries.push(series);
                    }
                });
                // When run after render, this.xAxis already exists
                if (this.xAxis && !this.xAxis.navigatorAxis.fake) {
                    this.updateNavigatorSeries(true, redraw);
                }
            }
            /**
             * Update series in the navigator from baseSeries, adding new if does not
             * exist.
             *
             * @private
             * @function Highcharts.Navigator.updateNavigatorSeries
             */
            updateNavigatorSeries(addEvents, redraw) {
                const navigator = this, chart = navigator.chart, baseSeries = navigator.baseSeries, navSeriesMixin = {
                    enableMouseTracking: false,
                    index: null, // #6162
                    linkedTo: null, // #6734
                    group: 'nav', // For columns
                    padXAxis: false,
                    xAxis: this.navigatorOptions.xAxis?.id,
                    yAxis: this.navigatorOptions.yAxis?.id,
                    showInLegend: false,
                    stacking: void 0, // #4823
                    isInternal: true,
                    states: {
                        inactive: {
                            opacity: 1
                        }
                    }
                }, 
                // Remove navigator series that are no longer in the baseSeries
                navigatorSeries = navigator.series =
                    (navigator.series || []).filter((navSeries) => {
                        const base = navSeries.baseSeries;
                        if (baseSeries.indexOf(base) < 0) { // Not in array
                            // If there is still a base series connected to this
                            // series, remove event handler and reference.
                            if (base) {
                                removeEvent(base, 'updatedData', navigator.updatedDataHandler);
                                delete base.navigatorSeries;
                            }
                            // Kill the nav series. It may already have been
                            // destroyed (#8715).
                            if (navSeries.chart) {
                                navSeries.destroy();
                            }
                            return false;
                        }
                        return true;
                    });
                let baseOptions, mergedNavSeriesOptions, chartNavigatorSeriesOptions = navigator.navigatorOptions.series, baseNavigatorOptions;
                // Go through each base series and merge the options to create new
                // series
                if (baseSeries && baseSeries.length) {
                    baseSeries.forEach((base) => {
                        const linkedNavSeries = base.navigatorSeries, userNavOptions = extend(
                        // Grab color and visibility from base as default
                        {
                            color: base.color,
                            visible: base.visible
                        }, !isArray(chartNavigatorSeriesOptions) ?
                            chartNavigatorSeriesOptions :
                            defaultOptions.navigator.series);
                        // Don't update if the series exists in nav and we have disabled
                        // adaptToUpdatedData.
                        if (linkedNavSeries &&
                            navigator.navigatorOptions.adaptToUpdatedData === false) {
                            return;
                        }
                        navSeriesMixin.name = 'Navigator ' + baseSeries.length;
                        baseOptions = base.options || {};
                        baseNavigatorOptions = baseOptions.navigatorOptions || {};
                        // The dataLabels options are not merged correctly
                        // if the settings are an array, #13847.
                        userNavOptions.dataLabels = splat(userNavOptions.dataLabels);
                        mergedNavSeriesOptions = merge(baseOptions, navSeriesMixin, userNavOptions, baseNavigatorOptions);
                        // Once nav series type is resolved, pick correct pointRange
                        mergedNavSeriesOptions.pointRange = pick(
                        // Stricte set pointRange in options
                        userNavOptions.pointRange, baseNavigatorOptions.pointRange, 
                        // Fallback to default values, e.g. `null` for column
                        defaultOptions.plotOptions[mergedNavSeriesOptions.type || 'line'].pointRange);
                        // Merge data separately. Do a slice to avoid mutating the
                        // navigator options from base series (#4923).
                        const navigatorSeriesData = baseNavigatorOptions.data || userNavOptions.data;
                        navigator.hasNavigatorData =
                            navigator.hasNavigatorData || !!navigatorSeriesData;
                        mergedNavSeriesOptions.data =
                            navigatorSeriesData ||
                                baseOptions.data && baseOptions.data.slice(0);
                        // Update or add the series
                        if (linkedNavSeries && linkedNavSeries.options) {
                            linkedNavSeries.update(mergedNavSeriesOptions, redraw);
                        }
                        else {
                            base.navigatorSeries = chart.initSeries(mergedNavSeriesOptions);
                            // Set data on initial run with dataSorting enabled (#20318)
                            chart.setSortedData();
                            base.navigatorSeries.baseSeries = base; // Store ref
                            navigatorSeries.push(base.navigatorSeries);
                        }
                    });
                }
                // If user has defined data (and no base series) or explicitly defined
                // navigator.series as an array, we create these series on top of any
                // base series.
                if (chartNavigatorSeriesOptions.data &&
                    !(baseSeries && baseSeries.length) ||
                    isArray(chartNavigatorSeriesOptions)) {
                    navigator.hasNavigatorData = false;
                    // Allow navigator.series to be an array
                    chartNavigatorSeriesOptions =
                        splat(chartNavigatorSeriesOptions);
                    chartNavigatorSeriesOptions.forEach((userSeriesOptions, i) => {
                        navSeriesMixin.name =
                            'Navigator ' + (navigatorSeries.length + 1);
                        mergedNavSeriesOptions = merge(defaultOptions.navigator.series, {
                            // Since we don't have a base series to pull color from,
                            // try to fake it by using color from series with same
                            // index. Otherwise pull from the colors array. We need
                            // an explicit color as otherwise updates will increment
                            // color counter and we'll get a new color for each
                            // update of the nav series.
                            color: chart.series[i] &&
                                !chart.series[i].options.isInternal &&
                                chart.series[i].color ||
                                chart.options.colors[i] ||
                                chart.options.colors[0]
                        }, navSeriesMixin, userSeriesOptions);
                        mergedNavSeriesOptions.data = userSeriesOptions.data;
                        if (mergedNavSeriesOptions.data) {
                            navigator.hasNavigatorData = true;
                            navigatorSeries.push(chart.initSeries(mergedNavSeriesOptions));
                        }
                    });
                }
                if (addEvents) {
                    this.addBaseSeriesEvents();
                }
            }
            /**
             * Add data events.
             * For example when main series is updated we need to recalculate extremes
             *
             * @private
             * @function Highcharts.Navigator#addBaseSeriesEvent
             */
            addBaseSeriesEvents() {
                const navigator = this, baseSeries = navigator.baseSeries || [];
                // Bind modified extremes event to first base's xAxis only.
                // In event of > 1 base-xAxes, the navigator will ignore those.
                // Adding this multiple times to the same axis is no problem, as
                // duplicates should be discarded by the browser.
                if (baseSeries[0] && baseSeries[0].xAxis) {
                    baseSeries[0].eventsToUnbind.push(addEvent(baseSeries[0].xAxis, 'foundExtremes', this.modifyBaseAxisExtremes));
                }
                baseSeries.forEach((base) => {
                    // Link base series show/hide to navigator series visibility
                    base.eventsToUnbind.push(addEvent(base, 'show', function () {
                        if (this.navigatorSeries) {
                            this.navigatorSeries.setVisible(true, false);
                        }
                    }));
                    base.eventsToUnbind.push(addEvent(base, 'hide', function () {
                        if (this.navigatorSeries) {
                            this.navigatorSeries.setVisible(false, false);
                        }
                    }));
                    // Respond to updated data in the base series, unless explicitly
                    // not adapting to data changes.
                    if (this.navigatorOptions.adaptToUpdatedData !== false) {
                        if (base.xAxis) {
                            base.eventsToUnbind.push(addEvent(base, 'updatedData', this.updatedDataHandler));
                        }
                    }
                    // Handle series removal
                    base.eventsToUnbind.push(addEvent(base, 'remove', function () {
                        if (baseSeries) {
                            erase(baseSeries, base); // #21043
                        }
                        if (this.navigatorSeries) {
                            erase(navigator.series, this.navigatorSeries);
                            if (defined(this.navigatorSeries.options)) {
                                this.navigatorSeries.remove(false);
                            }
                            delete this.navigatorSeries;
                        }
                    }));
                });
            }
            /**
             * Get minimum from all base series connected to the navigator
             * @private
             * @param {number} currentSeriesMin
             *        Minium from the current series
             * @return {number}
             *         Minimum from all series
             */
            getBaseSeriesMin(currentSeriesMin) {
                return this.baseSeries.reduce(function (min, series) {
                    // (#10193)
                    return Math.min(min, series.xData && series.xData.length ?
                        series.xData[0] : min);
                }, currentSeriesMin);
            }
            /**
             * Set the navigator x axis extremes to reflect the total. The navigator
             * extremes should always be the extremes of the union of all series in the
             * chart as well as the navigator series.
             *
             * @private
             * @function Highcharts.Navigator#modifyNavigatorAxisExtremes
             */
            modifyNavigatorAxisExtremes() {
                const xAxis = this.xAxis;
                if (typeof xAxis.getExtremes !== 'undefined') {
                    const unionExtremes = this.getUnionExtremes(true);
                    if (unionExtremes &&
                        (unionExtremes.dataMin !== xAxis.min ||
                            unionExtremes.dataMax !== xAxis.max)) {
                        xAxis.min = unionExtremes.dataMin;
                        xAxis.max = unionExtremes.dataMax;
                    }
                }
            }
            /**
             * Hook to modify the base axis extremes with information from the Navigator
             *
             * @private
             * @function Highcharts.Navigator#modifyBaseAxisExtremes
             */
            modifyBaseAxisExtremes() {
                const baseXAxis = this, navigator = baseXAxis.chart.navigator, baseExtremes = baseXAxis.getExtremes(), baseMin = baseExtremes.min, baseMax = baseExtremes.max, baseDataMin = baseExtremes.dataMin, baseDataMax = baseExtremes.dataMax, range = baseMax - baseMin, stickToMin = navigator.stickToMin, stickToMax = navigator.stickToMax, overscroll = pick(baseXAxis.ordinal?.convertOverscroll(baseXAxis.options.overscroll), 0), navigatorSeries = navigator.series && navigator.series[0], hasSetExtremes = !!baseXAxis.setExtremes, 
                // When the extremes have been set by range selector button, don't
                // stick to min or max. The range selector buttons will handle the
                // extremes. (#5489)
                unmutable = baseXAxis.eventArgs &&
                    baseXAxis.eventArgs.trigger === 'rangeSelectorButton';
                let newMax, newMin;
                if (!unmutable) {
                    // If the zoomed range is already at the min, move it to the right
                    // as new data comes in
                    if (stickToMin) {
                        newMin = baseDataMin;
                        newMax = newMin + range;
                    }
                    // If the zoomed range is already at the max, move it to the right
                    // as new data comes in
                    if (stickToMax) {
                        newMax = baseDataMax + overscroll;
                        // If stickToMin is true, the new min value is set above
                        if (!stickToMin) {
                            newMin = Math.max(baseDataMin, // Don't go below data extremes (#13184)
                            newMax - range, navigator.getBaseSeriesMin(navigatorSeries && navigatorSeries.xData ?
                                navigatorSeries.xData[0] :
                                -Number.MAX_VALUE));
                        }
                    }
                    // Update the extremes
                    if (hasSetExtremes && (stickToMin || stickToMax)) {
                        if (isNumber(newMin)) {
                            baseXAxis.min = baseXAxis.userMin = newMin;
                            baseXAxis.max = baseXAxis.userMax = newMax;
                        }
                    }
                }
                // Reset
                navigator.stickToMin =
                    navigator.stickToMax = null;
            }
            /**
             * Handler for updated data on the base series. When data is modified, the
             * navigator series must reflect it. This is called from the Chart.redraw
             * function before axis and series extremes are computed.
             *
             * @private
             * @function Highcharts.Navigator#updateDataHandler
             */
            updatedDataHandler() {
                const navigator = this.chart.navigator, baseSeries = this, navigatorSeries = this.navigatorSeries, shouldStickToMax = navigator.reversedExtremes ?
                    Math.round(navigator.zoomedMin) === 0 :
                    Math.round(navigator.zoomedMax) >= Math.round(navigator.size);
                // If the scrollbar is scrolled all the way to the right, keep right as
                // new data comes in, unless user set navigator.stickToMax to false.
                navigator.stickToMax = pick(this.chart.options.navigator &&
                    this.chart.options.navigator.stickToMax, shouldStickToMax);
                navigator.stickToMin = navigator.shouldStickToMin(baseSeries, navigator);
                // Set the navigator series data to the new data of the base series
                if (navigatorSeries && !navigator.hasNavigatorData) {
                    navigatorSeries.options.pointStart = baseSeries.xData[0];
                    navigatorSeries.setData(baseSeries.options.data, false, null, false); // #5414
                }
            }
            /**
             * Detect if the zoomed area should stick to the minimum, #14742.
             *
             * @private
             * @function Highcharts.Navigator#shouldStickToMin
             */
            shouldStickToMin(baseSeries, navigator) {
                const xDataMin = navigator.getBaseSeriesMin(baseSeries.xData[0]), xAxis = baseSeries.xAxis, max = xAxis.max, min = xAxis.min, range = xAxis.options.range;
                let stickToMin = true;
                if (isNumber(max) && isNumber(min)) {
                    // If range declared, stick to the minimum only if the range
                    // is smaller than the data set range.
                    if (range && max - xDataMin > 0) {
                        stickToMin = max - xDataMin < range;
                    }
                    else {
                        // If the current axis minimum falls outside the new
                        // updated dataset, we must adjust.
                        stickToMin = min <= xDataMin;
                    }
                }
                else {
                    stickToMin = false; // #15864
                }
                return stickToMin;
            }
            /**
             * Add chart events, like redrawing navigator, when chart requires that.
             *
             * @private
             * @function Highcharts.Navigator#addChartEvents
             */
            addChartEvents() {
                if (!this.eventsToUnbind) {
                    this.eventsToUnbind = [];
                }
                this.eventsToUnbind.push(
                // Move the scrollbar after redraw, like after data updata even if
                // axes don't redraw
                addEvent(this.chart, 'redraw', function () {
                    const navigator = this.navigator, xAxis = navigator && (navigator.baseSeries &&
                        navigator.baseSeries[0] &&
                        navigator.baseSeries[0].xAxis ||
                        this.xAxis[0]); // #5709, #13114
                    if (xAxis) {
                        navigator.render(xAxis.min, xAxis.max);
                    }
                }), 
                // Make room for the navigator, can be placed around the chart:
                addEvent(this.chart, 'getMargins', function () {
                    const chart = this, navigator = chart.navigator;
                    let marginName = navigator.opposite ?
                        'plotTop' : 'marginBottom';
                    if (chart.inverted) {
                        marginName = navigator.opposite ?
                            'marginRight' : 'plotLeft';
                    }
                    chart[marginName] =
                        (chart[marginName] || 0) + (navigator.navigatorEnabled || !chart.inverted ?
                            navigator.height + navigator.scrollbarHeight :
                            0) + navigator.navigatorOptions.margin;
                }), addEvent(Navigator, 'setRange', function (e) {
                    this.chart.xAxis[0].setExtremes(e.min, e.max, e.redraw, e.animation, e.eventArguments);
                }));
            }
            /**
             * Destroys allocated elements.
             *
             * @private
             * @function Highcharts.Navigator#destroy
             */
            destroy() {
                // Disconnect events added in addEvents
                this.removeEvents();
                if (this.xAxis) {
                    erase(this.chart.xAxis, this.xAxis);
                    erase(this.chart.axes, this.xAxis);
                }
                if (this.yAxis) {
                    erase(this.chart.yAxis, this.yAxis);
                    erase(this.chart.axes, this.yAxis);
                }
                // Destroy series
                (this.series || []).forEach((s) => {
                    if (s.destroy) {
                        s.destroy();
                    }
                });
                // Destroy properties
                [
                    'series', 'xAxis', 'yAxis', 'shades', 'outline', 'scrollbarTrack',
                    'scrollbarRifles', 'scrollbarGroup', 'scrollbar', 'navigatorGroup',
                    'rendered'
                ].forEach((prop) => {
                    if (this[prop] && this[prop].destroy) {
                        this[prop].destroy();
                    }
                    this[prop] = null;
                });
                // Destroy elements in collection
                [this.handles].forEach((coll) => {
                    destroyObjectProperties(coll);
                });
                this.navigatorEnabled = false;
            }
        }
        /* *
         *
         *  Default Export
         *
         * */

        return Navigator;
    });
    _registerModule(_modules, 'Accessibility/Components/NavigatorComponent.js', [_modules['Accessibility/AccessibilityComponent.js'], _modules['Accessibility/Utils/Announcer.js'], _modules['Accessibility/KeyboardNavigationHandler.js'], _modules['Stock/Navigator/Navigator.js'], _modules['Core/Animation/AnimationUtilities.js'], _modules['Core/Templating.js'], _modules['Core/Utilities.js'], _modules['Accessibility/Utils/HTMLUtilities.js'], _modules['Accessibility/Utils/ChartUtilities.js']], function (AccessibilityComponent, Announcer, KeyboardNavigationHandler, Navigator, A, T, U, HU, CU) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  Accessibility component for the navigator.
         *
         *  Author: Øystein Moseng
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /* *
         *
         *  Imports
         *
         * */
        const { animObject } = A;
        const { format } = T;
        const { clamp, pick, syncTimeout } = U;
        const { getFakeMouseEvent } = HU;
        const { getAxisRangeDescription, fireEventOnWrappedOrUnwrappedElement } = CU;
        /**
         * The NavigatorComponent class
         *
         * @private
         * @class
         * @name Highcharts.NavigatorComponent
         */
        class NavigatorComponent extends AccessibilityComponent {
            /**
             * Init the component
             * @private
             */
            init() {
                const chart = this.chart, component = this;
                this.announcer = new Announcer(chart, 'polite');
                // Update positions after render
                this.addEvent(Navigator, 'afterRender', function () {
                    if (this.chart === component.chart &&
                        this.chart.renderer) {
                        syncTimeout(() => {
                            component.proxyProvider
                                .updateGroupProxyElementPositions('navigator');
                            component.updateHandleValues();
                        }, animObject(pick(this.chart.renderer.globalAnimation, true)).duration);
                    }
                });
            }
            /**
             * Called on updates
             * @private
             */
            onChartUpdate() {
                const chart = this.chart, options = chart.options, navigator = options.navigator;
                if (navigator.enabled && navigator.accessibility?.enabled) {
                    const verbosity = options.accessibility.landmarkVerbosity, groupFormatStr = options.lang
                        .accessibility?.navigator.groupLabel;
                    // We just recreate the group for simplicity. Could consider
                    // updating the existing group if the verbosity has not changed.
                    this.proxyProvider.removeGroup('navigator');
                    this.proxyProvider.addGroup('navigator', 'div', {
                        role: verbosity === 'all' ? 'region' : 'group',
                        'aria-label': format(groupFormatStr, { chart }, chart)
                    });
                    const handleFormatStr = options.lang
                        .accessibility?.navigator.handleLabel;
                    [0, 1].forEach((n) => {
                        const handle = this.getHandleByIx(n);
                        if (handle) {
                            const proxyEl = this.proxyProvider.addProxyElement('navigator', {
                                click: handle
                            }, 'input', {
                                type: 'range',
                                'aria-label': format(handleFormatStr, { handleIx: n, chart }, chart)
                            });
                            this[n ? 'maxHandleProxy' : 'minHandleProxy'] =
                                proxyEl.innerElement;
                            proxyEl.innerElement.style.pointerEvents = 'none';
                            proxyEl.innerElement.oninput =
                                () => this.updateNavigator();
                        }
                    });
                    this.updateHandleValues();
                }
                else {
                    this.proxyProvider.removeGroup('navigator');
                }
            }
            /**
             * Get navigation for a navigator handle.
             * @private
             * @return {Highcharts.KeyboardNavigationHandler} The module object.
             */
            getNavigatorHandleNavigation(handleIx) {
                const component = this, chart = this.chart, proxyEl = handleIx ? this.maxHandleProxy : this.minHandleProxy, keys = this.keyCodes;
                return new KeyboardNavigationHandler(chart, {
                    keyCodeMap: [[
                            [keys.left, keys.right, keys.up, keys.down],
                            function (keyCode) {
                                if (proxyEl) {
                                    const delta = keyCode === keys.left ||
                                        keyCode === keys.up ? -1 : 1;
                                    proxyEl.value = '' + clamp(parseFloat(proxyEl.value) + delta, 0, 100);
                                    component.updateNavigator(() => {
                                        const handle = component.getHandleByIx(handleIx);
                                        if (handle) {
                                            chart.setFocusToElement(handle, proxyEl);
                                        }
                                    });
                                }
                                return this.response.success;
                            }
                        ]],
                    init: () => {
                        chart.setFocusToElement(this.getHandleByIx(handleIx), proxyEl);
                    },
                    validate: () => !!(this.getHandleByIx(handleIx) && proxyEl &&
                        chart.options.navigator.accessibility?.enabled)
                });
            }
            /**
             * Get keyboard navigation handlers for this component.
             * @return {Array<Highcharts.KeyboardNavigationHandler>}
             *         List of module objects.
             */
            getKeyboardNavigation() {
                return [
                    this.getNavigatorHandleNavigation(0),
                    this.getNavigatorHandleNavigation(1)
                ];
            }
            /**
             * Remove component traces
             */
            destroy() {
                if (this.updateNavigatorThrottleTimer) {
                    clearTimeout(this.updateNavigatorThrottleTimer);
                }
                this.proxyProvider.removeGroup('navigator');
                if (this.announcer) {
                    this.announcer.destroy();
                }
            }
            /**
             * Update the value of the handles to match current navigator pos.
             * @private
             */
            updateHandleValues() {
                const navigator = this.chart.navigator;
                if (navigator && this.minHandleProxy && this.maxHandleProxy) {
                    const length = navigator.size;
                    this.minHandleProxy.value =
                        '' + Math.round(navigator.zoomedMin / length * 100);
                    this.maxHandleProxy.value =
                        '' + Math.round(navigator.zoomedMax / length * 100);
                }
            }
            /**
             * Get a navigator handle by its index
             * @private
             */
            getHandleByIx(ix) {
                const navigator = this.chart.navigator;
                return navigator && navigator.handles &&
                    navigator.handles[ix];
            }
            /**
             * Update navigator to match changed proxy values.
             * @private
             */
            updateNavigator(beforeAnnounce) {
                const performUpdate = (beforeAnnounce) => {
                    const chart = this.chart, { navigator, pointer } = chart;
                    if (navigator &&
                        pointer &&
                        this.minHandleProxy &&
                        this.maxHandleProxy) {
                        const chartPos = pointer.getChartPosition(), minNewX = parseFloat(this.minHandleProxy.value) /
                            100 * navigator.size, maxNewX = parseFloat(this.maxHandleProxy.value) /
                            100 * navigator.size;
                        // Fire fake events in order for each handle.
                        [
                            [0, 'mousedown', navigator.zoomedMin],
                            [0, 'mousemove', minNewX],
                            [0, 'mouseup', minNewX],
                            [1, 'mousedown', navigator.zoomedMax],
                            [1, 'mousemove', maxNewX],
                            [1, 'mouseup', maxNewX]
                        ].forEach(([handleIx, type, x]) => {
                            const handle = this.getHandleByIx(handleIx)?.element;
                            if (handle) {
                                fireEventOnWrappedOrUnwrappedElement(handle, getFakeMouseEvent(type, {
                                    x: chartPos.left + navigator.left + x,
                                    y: chartPos.top + navigator.top
                                }, handle));
                            }
                        });
                        if (beforeAnnounce) {
                            beforeAnnounce();
                        }
                        // Announce the update
                        const announceFormatStr = chart.options.lang
                            .accessibility?.navigator.changeAnnouncement, axisRangeDescription = getAxisRangeDescription(chart.xAxis[0]);
                        this.announcer.announce(format(announceFormatStr, { axisRangeDescription, chart }, chart));
                    }
                };
                // Throttle updates so as not to reduce performance with
                // continuous keypress.
                if (this.updateNavigatorThrottleTimer) {
                    clearTimeout(this.updateNavigatorThrottleTimer);
                }
                this.updateNavigatorThrottleTimer = setTimeout(performUpdate.bind(this, beforeAnnounce), 20);
            }
        }
        /* *
         *
         *  Export Default
         *
         * */

        return NavigatorComponent;
    });
    _registerModule(_modules, 'Accessibility/Components/SeriesComponent/SeriesDescriber.js', [_modules['Accessibility/Components/AnnotationsA11y.js'], _modules['Accessibility/Utils/ChartUtilities.js'], _modules['Core/Templating.js'], _modules['Accessibility/Utils/HTMLUtilities.js'], _modules['Core/Utilities.js']], function (AnnotationsA11y, ChartUtilities, F, HTMLUtilities, U) {
        /* *
         *
         *  (c) 2009-2024 Øystein Moseng
         *
         *  Place desriptions on a series and its points.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { getPointAnnotationTexts } = AnnotationsA11y;
        const { getAxisDescription, getSeriesFirstPointElement, getSeriesA11yElement, unhideChartElementFromAT } = ChartUtilities;
        const { format, numberFormat } = F;
        const { reverseChildNodes, stripHTMLTagsFromString: stripHTMLTags } = HTMLUtilities;
        const { find, isNumber, isString, pick, defined } = U;
        /* *
         *
         *  Functions
         *
         * */
        /* eslint-disable valid-jsdoc */
        /**
         * @private
         */
        function findFirstPointWithGraphic(point) {
            const sourcePointIndex = point.index;
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
         * Whether or not we should add a mock point element in
         * order to describe a point that has no graphic.
         * @private
         */
        function shouldAddMockPoint(point) {
            // Note: Sunburst series use isNull for hidden points on drilldown.
            // Ignore these.
            const series = point.series, chart = series && series.chart, isSunburst = series && series.is('sunburst'), isNull = point.isNull, shouldDescribeNull = chart &&
                chart
                    .options.accessibility.point.describeNull;
            return isNull && !isSunburst && shouldDescribeNull;
        }
        /**
         * @private
         */
        function makeMockElement(point, pos) {
            const renderer = point.series.chart.renderer, mock = renderer.rect(pos.x, pos.y, 1, 1);
            mock.attr({
                'class': 'highcharts-a11y-mock-point',
                fill: 'none',
                opacity: 0,
                'fill-opacity': 0,
                'stroke-opacity': 0
            });
            return mock;
        }
        /**
         * @private
         */
        function addMockPointElement(point) {
            const series = point.series, firstPointWithGraphic = findFirstPointWithGraphic(point), firstGraphic = firstPointWithGraphic && firstPointWithGraphic.graphic, parentGroup = firstGraphic ?
                firstGraphic.parentGroup :
                series.graph || series.group, mockPos = firstPointWithGraphic ? {
                x: pick(point.plotX, firstPointWithGraphic.plotX, 0),
                y: pick(point.plotY, firstPointWithGraphic.plotY, 0)
            } : {
                x: pick(point.plotX, 0),
                y: pick(point.plotY, 0)
            }, mockElement = makeMockElement(point, mockPos);
            if (parentGroup && parentGroup.element) {
                point.graphic = mockElement;
                point.hasMockGraphic = true;
                mockElement.add(parentGroup);
                // Move to correct pos in DOM
                parentGroup.element.insertBefore(mockElement.element, firstGraphic ? firstGraphic.element : null);
                return mockElement.element;
            }
        }
        /**
         * @private
         */
        function hasMorePointsThanDescriptionThreshold(series) {
            const chartA11yOptions = series.chart.options.accessibility, threshold = (chartA11yOptions.series.pointDescriptionEnabledThreshold);
            return !!(threshold !== false &&
                series.points &&
                series.points.length >= +threshold);
        }
        /**
         * @private
         */
        function shouldSetScreenReaderPropsOnPoints(series) {
            const seriesA11yOptions = series.options.accessibility || {};
            return !hasMorePointsThanDescriptionThreshold(series) &&
                !seriesA11yOptions.exposeAsGroupOnly;
        }
        /**
         * @private
         */
        function shouldSetKeyboardNavPropsOnPoints(series) {
            const chartA11yOptions = series.chart.options.accessibility, seriesNavOptions = chartA11yOptions.keyboardNavigation.seriesNavigation;
            return !!(series.points && (series.points.length <
                +seriesNavOptions.pointNavigationEnabledThreshold ||
                seriesNavOptions.pointNavigationEnabledThreshold === false));
        }
        /**
         * @private
         */
        function shouldDescribeSeriesElement(series) {
            const chart = series.chart, chartOptions = chart.options.chart, chartHas3d = chartOptions.options3d && chartOptions.options3d.enabled, hasMultipleSeries = chart.series.length > 1, describeSingleSeriesOption = chart.options.accessibility.series.describeSingleSeries, exposeAsGroupOnlyOption = (series.options.accessibility || {}).exposeAsGroupOnly, noDescribe3D = chartHas3d && hasMultipleSeries;
            return !noDescribe3D && (hasMultipleSeries || describeSingleSeriesOption ||
                exposeAsGroupOnlyOption || hasMorePointsThanDescriptionThreshold(series));
        }
        /**
         * @private
         */
        function pointNumberToString(point, value) {
            const series = point.series, chart = series.chart, a11yPointOptions = chart.options.accessibility.point || {}, seriesA11yPointOptions = series.options.accessibility &&
                series.options.accessibility.point || {}, tooltipOptions = series.tooltipOptions || {}, lang = chart.options.lang;
            if (isNumber(value)) {
                return numberFormat(value, seriesA11yPointOptions.valueDecimals ||
                    a11yPointOptions.valueDecimals ||
                    tooltipOptions.valueDecimals ||
                    -1, lang.decimalPoint, lang.accessibility.thousandsSep || lang.thousandsSep);
            }
            return value;
        }
        /**
         * @private
         */
        function getSeriesDescriptionText(series) {
            const seriesA11yOptions = series.options.accessibility || {}, descOpt = seriesA11yOptions.description;
            return descOpt && series.chart.langFormat('accessibility.series.description', {
                description: descOpt,
                series: series
            }) || '';
        }
        /**
         * @private
         */
        function getSeriesAxisDescriptionText(series, axisCollection) {
            const axis = series[axisCollection];
            return series.chart.langFormat('accessibility.series.' + axisCollection + 'Description', {
                name: getAxisDescription(axis),
                series: series
            });
        }
        /**
         * Get accessible time description for a point on a datetime axis.
         *
         * @private
         */
        function getPointA11yTimeDescription(point) {
            const series = point.series, chart = series.chart, seriesA11yOptions = series.options.accessibility &&
                series.options.accessibility.point || {}, a11yOptions = chart.options.accessibility.point || {}, dateXAxis = series.xAxis && series.xAxis.dateTime;
            if (dateXAxis) {
                const tooltipDateFormat = dateXAxis.getXDateFormat(point.x || 0, chart.options.tooltip.dateTimeLabelFormats), dateFormat = seriesA11yOptions.dateFormatter &&
                    seriesA11yOptions.dateFormatter(point) ||
                    a11yOptions.dateFormatter && a11yOptions.dateFormatter(point) ||
                    seriesA11yOptions.dateFormat ||
                    a11yOptions.dateFormat ||
                    tooltipDateFormat;
                return chart.time.dateFormat(dateFormat, point.x || 0, void 0);
            }
        }
        /**
         * @private
         */
        function getPointXDescription(point) {
            const timeDesc = getPointA11yTimeDescription(point), xAxis = point.series.xAxis || {}, pointCategory = xAxis.categories && defined(point.category) &&
                ('' + point.category).replace('<br/>', ' '), canUseId = defined(point.id) &&
                ('' + point.id).indexOf('highcharts-') < 0, fallback = 'x, ' + point.x;
            return point.name || timeDesc || pointCategory ||
                (canUseId ? point.id : fallback);
        }
        /**
         * @private
         */
        function getPointArrayMapValueDescription(point, prefix, suffix) {
            const pre = prefix || '', suf = suffix || '', keyToValStr = function (key) {
                const num = pointNumberToString(point, pick(point[key], point.options[key]));
                return num !== void 0 ?
                    key + ': ' + pre + num + suf :
                    num;
            }, pointArrayMap = point.series.pointArrayMap;
            return pointArrayMap.reduce(function (desc, key) {
                const propDesc = keyToValStr(key);
                return propDesc ?
                    (desc + (desc.length ? ', ' : '') + propDesc) :
                    desc;
            }, '');
        }
        /**
         * @private
         */
        function getPointValue(point) {
            const series = point.series, a11yPointOpts = series.chart.options.accessibility.point || {}, seriesA11yPointOpts = series.chart.options.accessibility &&
                series.chart.options.accessibility.point || {}, tooltipOptions = series.tooltipOptions || {}, valuePrefix = seriesA11yPointOpts.valuePrefix ||
                a11yPointOpts.valuePrefix ||
                tooltipOptions.valuePrefix ||
                '', valueSuffix = seriesA11yPointOpts.valueSuffix ||
                a11yPointOpts.valueSuffix ||
                tooltipOptions.valueSuffix ||
                '', fallbackKey = (typeof point.value !==
                'undefined' ?
                'value' : 'y'), fallbackDesc = pointNumberToString(point, point[fallbackKey]);
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
         * Return the description for the annotation(s) connected to a point, or
         * empty string if none.
         *
         * @private
         * @param {Highcharts.Point} point
         * The data point to get the annotation info from.
         * @return {string}
         * Annotation description
         */
        function getPointAnnotationDescription(point) {
            const chart = point.series.chart;
            const langKey = 'accessibility.series.pointAnnotationsDescription';
            const annotations = getPointAnnotationTexts(point);
            const context = { point, annotations };
            return annotations.length ? chart.langFormat(langKey, context) : '';
        }
        /**
         * Return string with information about point.
         * @private
         */
        function getPointValueDescription(point) {
            const series = point.series, chart = series.chart, seriesA11yOptions = series.options.accessibility, seriesValueDescFormat = seriesA11yOptions && seriesA11yOptions.point &&
                seriesA11yOptions.point.valueDescriptionFormat, pointValueDescriptionFormat = seriesValueDescFormat ||
                chart.options.accessibility.point.valueDescriptionFormat, showXDescription = pick(series.xAxis &&
                series.xAxis.options.accessibility &&
                series.xAxis.options.accessibility.enabled, !chart.angular && series.type !== 'flowmap'), xDesc = showXDescription ? getPointXDescription(point) : '', context = {
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
         */
        function defaultPointDescriptionFormatter(point) {
            const series = point.series, shouldExposeSeriesName = series.chart.series.length > 1 ||
                series.options.name, valText = getPointValueDescription(point), description = point.options && point.options.accessibility &&
                point.options.accessibility.description, userDescText = description ? ' ' + description : '', seriesNameText = shouldExposeSeriesName ? ' ' + series.name + '.' : '', annotationsDesc = getPointAnnotationDescription(point), pointAnnotationsText = annotationsDesc ? ' ' + annotationsDesc : '';
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
            const series = point.series, seriesPointA11yOptions = series.options.accessibility?.point || {}, a11yPointOptions = series.chart.options.accessibility.point || {}, label = stripHTMLTags((isString(seriesPointA11yOptions.descriptionFormat) &&
                format(seriesPointA11yOptions.descriptionFormat, point, series.chart)) ||
                seriesPointA11yOptions.descriptionFormatter?.(point) ||
                (isString(a11yPointOptions.descriptionFormat) &&
                    format(a11yPointOptions.descriptionFormat, point, series.chart)) ||
                a11yPointOptions.descriptionFormatter?.(point) ||
                defaultPointDescriptionFormatter(point), series.chart.renderer.forExport);
            pointElement.setAttribute('role', 'img');
            pointElement.setAttribute('aria-label', label);
        }
        /**
         * Add accessible info to individual point elements of a series
         * @private
         * @param {Highcharts.Series} series
         */
        function describePointsInSeries(series) {
            const setScreenReaderProps = shouldSetScreenReaderPropsOnPoints(series), setKeyboardProps = shouldSetKeyboardNavPropsOnPoints(series), shouldDescribeNullPoints = series.chart.options.accessibility
                .point.describeNull;
            if (setScreenReaderProps || setKeyboardProps) {
                series.points.forEach((point) => {
                    const pointEl = point.graphic && point.graphic.element ||
                        shouldAddMockPoint(point) && addMockPointElement(point), pointA11yDisabled = (point.options &&
                        point.options.accessibility &&
                        point.options.accessibility.enabled === false);
                    if (pointEl) {
                        if (point.isNull && !shouldDescribeNullPoints) {
                            pointEl.setAttribute('aria-hidden', true);
                            return;
                        }
                        // We always set tabindex, as long as we are setting props.
                        // When setting tabindex, also remove default outline to
                        // avoid ugly border on click.
                        pointEl.setAttribute('tabindex', '-1');
                        if (!series.chart.styledMode) {
                            pointEl.style.outline = 'none';
                        }
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
         */
        function defaultSeriesDescriptionFormatter(series) {
            const chart = series.chart, chartTypes = chart.types || [], description = getSeriesDescriptionText(series), shouldDescribeAxis = function (coll) {
                return chart[coll] && chart[coll].length > 1 && series[coll];
            }, seriesNumber = series.index + 1, xAxisInfo = getSeriesAxisDescriptionText(series, 'xAxis'), yAxisInfo = getSeriesAxisDescriptionText(series, 'yAxis'), summaryContext = {
                seriesNumber,
                series,
                chart
            }, combinationSuffix = chartTypes.length > 1 ? 'Combination' : '', summary = chart.langFormat('accessibility.series.summary.' + series.type + combinationSuffix, summaryContext) || chart.langFormat('accessibility.series.summary.default' + combinationSuffix, summaryContext), axisDescription = (shouldDescribeAxis('yAxis') ? ' ' + yAxisInfo + '.' : '') + (shouldDescribeAxis('xAxis') ? ' ' + xAxisInfo + '.' : ''), formatStr = pick(series.options.accessibility &&
                series.options.accessibility.descriptionFormat, chart.options.accessibility.series.descriptionFormat, '');
            return format(formatStr, {
                seriesDescription: summary,
                authorDescription: (description ? ' ' + description : ''),
                axisDescription,
                series,
                chart,
                seriesNumber
            }, void 0);
        }
        /**
         * Set a11y props on a series element
         * @private
         * @param {Highcharts.Series} series
         * @param {Highcharts.HTMLDOMElement|Highcharts.SVGDOMElement} seriesElement
         */
        function describeSeriesElement(series, seriesElement) {
            const seriesA11yOptions = series.options.accessibility || {}, a11yOptions = series.chart.options.accessibility, landmarkVerbosity = a11yOptions.landmarkVerbosity;
            // Handle role attribute
            if (seriesA11yOptions.exposeAsGroupOnly) {
                seriesElement.setAttribute('role', 'img');
            }
            else if (landmarkVerbosity === 'all') {
                seriesElement.setAttribute('role', 'region');
            }
            else {
                seriesElement.setAttribute('role', 'group');
            }
            seriesElement.setAttribute('tabindex', '-1');
            if (!series.chart.styledMode) {
                // Don't show browser outline on click, despite tabindex
                seriesElement.style.outline = 'none';
            }
            seriesElement.setAttribute('aria-label', stripHTMLTags(a11yOptions.series.descriptionFormatter &&
                a11yOptions.series.descriptionFormatter(series) ||
                defaultSeriesDescriptionFormatter(series), series.chart.renderer.forExport));
        }
        /**
         * Put accessible info on series and points of a series.
         * @param {Highcharts.Series} series The series to add info on.
         */
        function describeSeries(series) {
            const chart = series.chart, firstPointEl = getSeriesFirstPointElement(series), seriesEl = getSeriesA11yElement(series), is3d = chart.is3d && chart.is3d();
            if (seriesEl) {
                // For some series types the order of elements do not match the
                // order of points in series. In that case we have to reverse them
                // in order for AT to read them out in an understandable order.
                // Due to z-index issues we cannot do this for 3D charts.
                if (seriesEl.lastChild === firstPointEl && !is3d) {
                    reverseChildNodes(seriesEl);
                }
                describePointsInSeries(series);
                unhideChartElementFromAT(chart, seriesEl);
                if (shouldDescribeSeriesElement(series)) {
                    describeSeriesElement(series, seriesEl);
                }
                else {
                    seriesEl.removeAttribute('aria-label');
                }
            }
        }
        /* *
         *
         *  Default Export
         *
         * */
        const SeriesDescriber = {
            defaultPointDescriptionFormatter,
            defaultSeriesDescriptionFormatter,
            describeSeries
        };

        return SeriesDescriber;
    });
    _registerModule(_modules, 'Accessibility/Components/SeriesComponent/NewDataAnnouncer.js', [_modules['Core/Globals.js'], _modules['Core/Utilities.js'], _modules['Accessibility/Utils/Announcer.js'], _modules['Accessibility/Utils/ChartUtilities.js'], _modules['Accessibility/Utils/EventProvider.js'], _modules['Accessibility/Components/SeriesComponent/SeriesDescriber.js']], function (H, U, Announcer, ChartUtilities, EventProvider, SeriesDescriber) {
        /* *
         *
         *  (c) 2009-2024 Øystein Moseng
         *
         *  Handle announcing new data for a chart.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { composed } = H;
        const { addEvent, defined, pushUnique } = U;
        const { getChartTitle } = ChartUtilities;
        const { defaultPointDescriptionFormatter, defaultSeriesDescriptionFormatter } = SeriesDescriber;
        /* *
         *
         *  Functions
         *
         * */
        /* eslint-disable valid-jsdoc */
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
            const candidates = point.series.data.filter((candidate) => (point.x === candidate.x && point.y === candidate.y));
            return candidates.length === 1 ? candidates[0] : point;
        }
        /**
         * Get array of unique series from two arrays
         * @private
         */
        function getUniqueSeries(arrayA, arrayB) {
            const uniqueSeries = (arrayA || []).concat(arrayB || []).reduce((acc, cur) => {
                acc[cur.name + cur.index] = cur;
                return acc;
            }, {});
            return Object
                .keys(uniqueSeries)
                .map((ix) => uniqueSeries[ix]);
        }
        /* *
         *
         *  Class
         *
         * */
        /**
         * @private
         * @class
         */
        class NewDataAnnouncer {
            /* *
             *
             *  Constructor
             *
             * */
            constructor(chart) {
                this.dirty = {
                    allSeries: {}
                };
                this.lastAnnouncementTime = 0;
                this.chart = chart;
            }
            /* *
             *
             *  Functions
             *
             * */
            /* eslint-disable valid-jsdoc */
            /**
             * Initialize the new data announcer.
             * @private
             */
            init() {
                const chart = this.chart;
                const announceOptions = (chart.options.accessibility.announceNewData);
                const announceType = announceOptions.interruptUser ?
                    'assertive' : 'polite';
                this.lastAnnouncementTime = 0;
                this.dirty = {
                    allSeries: {}
                };
                this.eventProvider = new EventProvider();
                this.announcer = new Announcer(chart, announceType);
                this.addEventListeners();
            }
            /**
             * Remove traces of announcer.
             * @private
             */
            destroy() {
                this.eventProvider.removeAddedEvents();
                this.announcer.destroy();
            }
            /**
             * Add event listeners for the announcer
             * @private
             */
            addEventListeners() {
                const announcer = this, chart = this.chart, e = this.eventProvider;
                e.addEvent(chart, 'afterApplyDrilldown', function () {
                    announcer.lastAnnouncementTime = 0;
                });
                e.addEvent(chart, 'afterAddSeries', function (e) {
                    announcer.onSeriesAdded(e.series);
                });
                e.addEvent(chart, 'redraw', function () {
                    announcer.announceDirtyData();
                });
            }
            /**
             * On new data series added, update dirty list.
             * @private
             * @param {Highcharts.Series} series
             */
            onSeriesAdded(series) {
                if (chartHasAnnounceEnabled(this.chart)) {
                    this.dirty.hasDirty = true;
                    this.dirty.allSeries[series.name + series.index] = series;
                    // Add it to newSeries storage unless we already have one
                    this.dirty.newSeries = defined(this.dirty.newSeries) ?
                        void 0 : series;
                }
            }
            /**
             * Gather what we know and announce the data to user.
             * @private
             */
            announceDirtyData() {
                const chart = this.chart, announcer = this;
                if (chart.options.accessibility.announceNewData &&
                    this.dirty.hasDirty) {
                    let newPoint = this.dirty.newPoint;
                    // If we have a single new point, see if we can find it in the
                    // data array. Otherwise we can only pass through options to
                    // the description builder, and it is a bit sparse in info.
                    if (newPoint) {
                        newPoint = findPointInDataArray(newPoint);
                    }
                    this.queueAnnouncement(Object
                        .keys(this.dirty.allSeries)
                        .map((ix) => announcer.dirty.allSeries[ix]), this.dirty.newSeries, newPoint);
                    // Reset
                    this.dirty = {
                        allSeries: {}
                    };
                }
            }
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
            queueAnnouncement(dirtySeries, newSeries, newPoint) {
                const chart = this.chart;
                const annOptions = chart.options.accessibility.announceNewData;
                if (annOptions.enabled) {
                    const now = +new Date();
                    const dTime = now - this.lastAnnouncementTime;
                    const time = Math.max(0, annOptions.minAnnounceInterval - dTime);
                    // Add series from previously queued announcement.
                    const allSeries = getUniqueSeries(this.queuedAnnouncement && this.queuedAnnouncement.series, dirtySeries);
                    // Build message and announce
                    const message = this.buildAnnouncementMessage(allSeries, newSeries, newPoint);
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
                        this.queuedAnnouncementTimer = setTimeout(() => {
                            if (this && this.announcer) {
                                this.lastAnnouncementTime = +new Date();
                                this.announcer.announce(this.queuedAnnouncement.message);
                                delete this.queuedAnnouncement;
                                delete this.queuedAnnouncementTimer;
                            }
                        }, time);
                    }
                }
            }
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
            buildAnnouncementMessage(dirtySeries, newSeries, newPoint) {
                const chart = this.chart, annOptions = chart.options.accessibility.announceNewData;
                // User supplied formatter?
                if (annOptions.announcementFormatter) {
                    const formatterRes = annOptions.announcementFormatter(dirtySeries, newSeries, newPoint);
                    if (formatterRes !== false) {
                        return formatterRes.length ? formatterRes : null;
                    }
                }
                // Default formatter - use lang options
                const multiple = H.charts && H.charts.length > 1 ?
                    'Multiple' : 'Single', langKey = newSeries ? 'newSeriesAnnounce' + multiple :
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
        }
        /* *
         *
         *  Class Namespace
         *
         * */
        (function (NewDataAnnouncer) {
            /* *
             *
             *  Declarations
             *
             * */
            /* *
             *
             *  Static Functions
             *
             * */
            /**
             * @private
             */
            function compose(SeriesClass) {
                if (pushUnique(composed, 'A11y.NDA')) {
                    addEvent(SeriesClass, 'addPoint', seriesOnAddPoint);
                    addEvent(SeriesClass, 'updatedData', seriesOnUpdatedData);
                }
            }
            NewDataAnnouncer.compose = compose;
            /**
             * On new point added, update dirty list.
             * @private
             * @param {Highcharts.Point} point
             */
            function seriesOnAddPoint(e) {
                const chart = this.chart, newDataAnnouncer = chart.accessibility?.components
                    .series.newDataAnnouncer;
                if (newDataAnnouncer &&
                    newDataAnnouncer.chart === chart &&
                    chartHasAnnounceEnabled(chart)) {
                    // Add it to newPoint storage unless we already have one
                    newDataAnnouncer.dirty.newPoint = (defined(newDataAnnouncer.dirty.newPoint) ?
                        void 0 :
                        e.point);
                }
            }
            /**
             * On new data in the series, make sure we add it to the dirty list.
             * @private
             * @param {Highcharts.Series} series
             */
            function seriesOnUpdatedData() {
                const chart = this.chart, newDataAnnouncer = chart.accessibility?.components
                    .series.newDataAnnouncer;
                if (newDataAnnouncer &&
                    newDataAnnouncer.chart === chart &&
                    chartHasAnnounceEnabled(chart)) {
                    newDataAnnouncer.dirty.hasDirty = true;
                    newDataAnnouncer.dirty.allSeries[this.name + this.index] = this;
                }
            }
        })(NewDataAnnouncer || (NewDataAnnouncer = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return NewDataAnnouncer;
    });
    _registerModule(_modules, 'Accessibility/ProxyElement.js', [_modules['Core/Globals.js'], _modules['Core/Utilities.js'], _modules['Accessibility/Utils/EventProvider.js'], _modules['Accessibility/Utils/ChartUtilities.js'], _modules['Accessibility/Utils/HTMLUtilities.js']], function (H, U, EventProvider, ChartUtilities, HTMLUtilities) {
        /* *
         *
         *  (c) 2009-2024 Øystein Moseng
         *
         *  Proxy elements are used to shadow SVG elements in HTML for assistive
         *  technology, such as screen readers or voice input software.
         *
         *  The ProxyElement class represents such an element, and deals with
         *  overlay positioning and mirroring events for the target.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { doc } = H;
        const { attr, css, merge } = U;
        const { fireEventOnWrappedOrUnwrappedElement } = ChartUtilities;
        const { cloneMouseEvent, cloneTouchEvent, getFakeMouseEvent, removeElement } = HTMLUtilities;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Represents a proxy element that overlays a target and relays events
         * to its target.
         *
         * @private
         * @class
         */
        class ProxyElement {
            /* *
             *
             *  Constructor
             *
             * */
            constructor(chart, target, proxyElementType = 'button', wrapperElementType, attributes) {
                this.chart = chart;
                this.target = target;
                this.eventProvider = new EventProvider();
                const innerEl = this.innerElement =
                    doc.createElement(proxyElementType), wrapperEl = this.element = wrapperElementType ?
                    doc.createElement(wrapperElementType) : innerEl;
                if (!chart.styledMode) {
                    this.hideElementVisually(innerEl);
                }
                if (wrapperElementType) {
                    if (wrapperElementType === 'li' && !chart.styledMode) {
                        wrapperEl.style.listStyle = 'none';
                    }
                    wrapperEl.appendChild(innerEl);
                    this.element = wrapperEl;
                }
                this.updateTarget(target, attributes);
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Fake a click event on the target.
             */
            click() {
                const pos = this.getTargetPosition();
                pos.x += pos.width / 2;
                pos.y += pos.height / 2;
                const fakeEventObject = getFakeMouseEvent('click', pos);
                fireEventOnWrappedOrUnwrappedElement(this.target.click, fakeEventObject);
            }
            /**
             * Update the target to be proxied. The position and events are updated to
             * match the new target.
             * @param target The new target definition
             * @param attributes New HTML attributes to apply to the proxy. Set an
             * attribute to null to remove.
             */
            updateTarget(target, attributes) {
                this.target = target;
                this.updateCSSClassName();
                const attrs = attributes || {};
                Object.keys(attrs).forEach((a) => {
                    if (attrs[a] === null) {
                        delete attrs[a];
                    }
                });
                const targetAriaLabel = this.getTargetAttr(target.click, 'aria-label');
                attr(this.innerElement, merge(targetAriaLabel ? {
                    'aria-label': targetAriaLabel
                } : {}, attrs));
                this.eventProvider.removeAddedEvents();
                this.addProxyEventsToElement(this.innerElement, target.click);
                this.refreshPosition();
            }
            /**
             * Refresh the position of the proxy element to match the current target
             */
            refreshPosition() {
                const bBox = this.getTargetPosition();
                css(this.innerElement, {
                    width: (bBox.width || 1) + 'px',
                    height: (bBox.height || 1) + 'px',
                    left: (Math.round(bBox.x) || 0) + 'px',
                    top: (Math.round(bBox.y) || 0) + 'px'
                });
            }
            /**
             * Remove button from DOM, and clear events.
             */
            remove() {
                this.eventProvider.removeAddedEvents();
                removeElement(this.element);
            }
            // -------------------------- private ------------------------------------
            /**
             * Update the CSS class name to match target
             */
            updateCSSClassName() {
                const stringHasNoTooltip = (s) => (s.indexOf('highcharts-no-tooltip') > -1);
                const legend = this.chart.legend;
                const groupDiv = legend.group && legend.group.div;
                const noTooltipOnGroup = stringHasNoTooltip(groupDiv && groupDiv.className || '');
                const targetClassName = this.getTargetAttr(this.target.click, 'class') || '';
                const noTooltipOnTarget = stringHasNoTooltip(targetClassName);
                this.innerElement.className = noTooltipOnGroup || noTooltipOnTarget ?
                    'highcharts-a11y-proxy-element highcharts-no-tooltip' :
                    'highcharts-a11y-proxy-element';
            }
            /**
             * Mirror events for a proxy element to a target
             */
            addProxyEventsToElement(element, target) {
                [
                    'click', 'touchstart', 'touchend', 'touchcancel', 'touchmove',
                    'mouseover', 'mouseenter', 'mouseleave', 'mouseout'
                ].forEach((evtType) => {
                    const isTouchEvent = evtType.indexOf('touch') === 0;
                    this.eventProvider.addEvent(element, evtType, (e) => {
                        const clonedEvent = isTouchEvent ?
                            cloneTouchEvent(e) :
                            cloneMouseEvent(e);
                        if (target) {
                            fireEventOnWrappedOrUnwrappedElement(target, clonedEvent);
                        }
                        e.stopPropagation();
                        // #9682, #15318: Touch scrolling didn't work when touching
                        // proxy
                        if (!isTouchEvent) {
                            e.preventDefault();
                        }
                    }, { passive: false });
                });
            }
            /**
             * Set visually hidden style on a proxy element
             */
            hideElementVisually(el) {
                css(el, {
                    borderWidth: 0,
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    outline: 'none',
                    opacity: 0.001,
                    filter: 'alpha(opacity=1)',
                    zIndex: 999,
                    overflow: 'hidden',
                    padding: 0,
                    margin: 0,
                    display: 'block',
                    position: 'absolute',
                    '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=1)'
                });
            }
            /**
             * Get the position relative to chart container for the target
             */
            getTargetPosition() {
                const clickTarget = this.target.click;
                // We accept both DOM elements and wrapped elements as click targets.
                const clickTargetElement = clickTarget.element ?
                    clickTarget.element :
                    clickTarget;
                const posElement = this.target.visual || clickTargetElement;
                const chartDiv = this.chart.renderTo, pointer = this.chart.pointer;
                if (chartDiv && posElement?.getBoundingClientRect && pointer) {
                    const rectEl = posElement.getBoundingClientRect(), chartPos = pointer.getChartPosition();
                    return {
                        x: (rectEl.left - chartPos.left) / chartPos.scaleX,
                        y: (rectEl.top - chartPos.top) / chartPos.scaleY,
                        width: rectEl.right / chartPos.scaleX -
                            rectEl.left / chartPos.scaleX,
                        height: rectEl.bottom / chartPos.scaleY -
                            rectEl.top / chartPos.scaleY
                    };
                }
                return { x: 0, y: 0, width: 1, height: 1 };
            }
            /**
             * Get an attribute value of a target
             */
            getTargetAttr(target, key) {
                if (target.element) {
                    return target.element.getAttribute(key);
                }
                return target.getAttribute(key);
            }
        }
        /* *
         *
         *  Default Export
         *
         * */

        return ProxyElement;
    });
    _registerModule(_modules, 'Accessibility/ProxyProvider.js', [_modules['Core/Globals.js'], _modules['Core/Utilities.js'], _modules['Accessibility/Utils/ChartUtilities.js'], _modules['Accessibility/Utils/DOMElementProvider.js'], _modules['Accessibility/Utils/HTMLUtilities.js'], _modules['Accessibility/ProxyElement.js']], function (H, U, CU, DOMElementProvider, HU, ProxyElement) {
        /* *
         *
         *  (c) 2009-2024 Øystein Moseng
         *
         *  Proxy elements are used to shadow SVG elements in HTML for assistive
         *  technology, such as screen readers or voice input software.
         *
         *  The ProxyProvider keeps track of all proxy elements of the a11y module,
         *  and updating their order and positioning.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { doc } = H;
        const { attr, css } = U;
        const { unhideChartElementFromAT } = CU;
        const { removeChildNodes } = HU;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Keeps track of all proxy elements and proxy groups.
         *
         * @private
         * @class
         */
        class ProxyProvider {
            /* *
             *
             *  Constructor
             *
             * */
            constructor(chart) {
                this.chart = chart;
                this.domElementProvider = new DOMElementProvider();
                this.groups = {};
                this.groupOrder = [];
                this.beforeChartProxyPosContainer = this.createProxyPosContainer('before');
                this.afterChartProxyPosContainer = this.createProxyPosContainer('after');
                this.update();
            }
            /* *
             *
             *  Functions
             *
             * */
            /* eslint-disable */
            /**
             * Add a new proxy element to a group, proxying a target control.
             */
            addProxyElement(groupKey, target, proxyElementType = 'button', attributes) {
                const group = this.groups[groupKey];
                if (!group) {
                    throw new Error('ProxyProvider.addProxyElement: Invalid group key ' + groupKey);
                }
                const wrapperElementType = group.type === 'ul' || group.type === 'ol' ?
                    'li' : void 0, proxy = new ProxyElement(this.chart, target, proxyElementType, wrapperElementType, attributes);
                group.proxyContainerElement.appendChild(proxy.element);
                group.proxyElements.push(proxy);
                return proxy;
            }
            /**
             * Create a group that will contain proxy elements. The group order is
             * automatically updated according to the last group order keys.
             *
             * Returns the added group.
             */
            addGroup(groupKey, groupElementType = 'div', attributes) {
                const existingGroup = this.groups[groupKey];
                if (existingGroup) {
                    return existingGroup.groupElement;
                }
                const proxyContainer = this.domElementProvider
                    .createElement(groupElementType);
                // If we want to add a role to the group, and still use e.g.
                // a list group, we need a wrapper div around the proxyContainer.
                // Used for setting region role on legend.
                let groupElement;
                if (attributes && attributes.role && groupElementType !== 'div') {
                    groupElement = this.domElementProvider.createElement('div');
                    groupElement.appendChild(proxyContainer);
                }
                else {
                    groupElement = proxyContainer;
                }
                groupElement.className = 'highcharts-a11y-proxy-group highcharts-a11y-proxy-group-' +
                    groupKey.replace(/\W/g, '-');
                this.groups[groupKey] = {
                    proxyContainerElement: proxyContainer,
                    groupElement,
                    type: groupElementType,
                    proxyElements: []
                };
                attr(groupElement, attributes || {});
                if (groupElementType === 'ul') {
                    proxyContainer.setAttribute('role', 'list'); // Needed for webkit
                }
                // Add the group to the end by default, and perhaps then we
                // won't have to reorder the whole set of groups.
                this.afterChartProxyPosContainer.appendChild(groupElement);
                this.updateGroupOrder(this.groupOrder);
                return groupElement;
            }
            /**
             * Update HTML attributes of a group.
             */
            updateGroupAttrs(groupKey, attributes) {
                const group = this.groups[groupKey];
                if (!group) {
                    throw new Error('ProxyProvider.updateGroupAttrs: Invalid group key ' + groupKey);
                }
                attr(group.groupElement, attributes);
            }
            /**
             * Reorder the proxy groups.
             *
             * The group key "series" refers to the chart's data points / <svg> element.
             * This is so that the keyboardNavigation.order option can be used to
             * determine the proxy group order.
             */
            updateGroupOrder(groupKeys) {
                // Store so that we can update order when a new group is created
                this.groupOrder = groupKeys.slice();
                // Don't unnecessarily reorder, because keyboard focus is lost
                if (this.isDOMOrderGroupOrder()) {
                    return;
                }
                const seriesIx = groupKeys.indexOf('series');
                const beforeKeys = seriesIx > -1 ? groupKeys.slice(0, seriesIx) : groupKeys;
                const afterKeys = seriesIx > -1 ? groupKeys.slice(seriesIx + 1) : [];
                // Store focused element since it will be lost when reordering
                const activeElement = doc.activeElement;
                // Add groups to correct container
                ['before', 'after'].forEach((pos) => {
                    const posContainer = this[pos === 'before' ?
                        'beforeChartProxyPosContainer' :
                        'afterChartProxyPosContainer'];
                    const keys = pos === 'before' ? beforeKeys : afterKeys;
                    removeChildNodes(posContainer);
                    keys.forEach((groupKey) => {
                        const group = this.groups[groupKey];
                        if (group) {
                            posContainer.appendChild(group.groupElement);
                        }
                    });
                });
                // Attempt to restore focus after reordering, but note that this may
                // cause screen readers re-announcing the button.
                if ((this.beforeChartProxyPosContainer.contains(activeElement) ||
                    this.afterChartProxyPosContainer.contains(activeElement)) &&
                    activeElement && activeElement.focus) {
                    activeElement.focus();
                }
            }
            /**
             * Remove all proxy elements in a group
             */
            clearGroup(groupKey) {
                const group = this.groups[groupKey];
                if (!group) {
                    throw new Error('ProxyProvider.clearGroup: Invalid group key ' + groupKey);
                }
                removeChildNodes(group.proxyContainerElement);
            }
            /**
             * Remove a group from the DOM and from the proxy provider's group list.
             * All child elements are removed.
             * If the group does not exist, nothing happens.
             */
            removeGroup(groupKey) {
                const group = this.groups[groupKey];
                if (group) {
                    // Remove detached HTML elements to prevent memory leak (#20329).
                    this.domElementProvider.removeElement(group.groupElement);
                    // Sometimes groupElement is a wrapper around the proxyContainer, so
                    // the real one proxyContainer needs to be removed also.
                    if (group.groupElement !== group.proxyContainerElement) {
                        this.domElementProvider.removeElement(group.proxyContainerElement);
                    }
                    delete this.groups[groupKey];
                }
            }
            /**
             * Update the position and order of all proxy groups and elements
             */
            update() {
                this.updatePosContainerPositions();
                this.updateGroupOrder(this.groupOrder);
                this.updateProxyElementPositions();
            }
            /**
             * Update all proxy element positions
             */
            updateProxyElementPositions() {
                Object.keys(this.groups).forEach(this.updateGroupProxyElementPositions.bind(this));
            }
            /**
             * Update a group's proxy elements' positions.
             * If the group does not exist, nothing happens.
             */
            updateGroupProxyElementPositions(groupKey) {
                const group = this.groups[groupKey];
                if (group) {
                    group.proxyElements.forEach((el) => el.refreshPosition());
                }
            }
            /**
             * Remove all added elements
             */
            destroy() {
                this.domElementProvider.destroyCreatedElements();
            }
            // -------------------------- private ------------------------------------
            /**
             * Create and return a pos container element (the overall containers for
             * the proxy groups).
             */
            createProxyPosContainer(classNamePostfix) {
                const el = this.domElementProvider.createElement('div');
                el.setAttribute('aria-hidden', 'false');
                el.className = 'highcharts-a11y-proxy-container' + (classNamePostfix ? '-' + classNamePostfix : '');
                css(el, {
                    top: '0',
                    left: '0'
                });
                if (!this.chart.styledMode) {
                    el.style.whiteSpace = 'nowrap';
                    el.style.position = 'absolute';
                }
                return el;
            }
            /**
             * Get an array of group keys that corresponds to the current group order
             * in the DOM.
             */
            getCurrentGroupOrderInDOM() {
                const getGroupKeyFromElement = (el) => {
                    const allGroups = Object.keys(this.groups);
                    let i = allGroups.length;
                    while (i--) {
                        const groupKey = allGroups[i];
                        const group = this.groups[groupKey];
                        if (group && el === group.groupElement) {
                            return groupKey;
                        }
                    }
                };
                const getChildrenGroupOrder = (el) => {
                    const childrenOrder = [];
                    const children = el.children;
                    for (let i = 0; i < children.length; ++i) {
                        const groupKey = getGroupKeyFromElement(children[i]);
                        if (groupKey) {
                            childrenOrder.push(groupKey);
                        }
                    }
                    return childrenOrder;
                };
                const before = getChildrenGroupOrder(this.beforeChartProxyPosContainer);
                const after = getChildrenGroupOrder(this.afterChartProxyPosContainer);
                before.push('series');
                return before.concat(after);
            }
            /**
             * Check if the current DOM order matches the current group order, so that
             * a reordering/update is unnecessary.
             */
            isDOMOrderGroupOrder() {
                const domOrder = this.getCurrentGroupOrderInDOM();
                const groupOrderWithGroups = this.groupOrder.filter((x) => x === 'series' || !!this.groups[x]);
                let i = domOrder.length;
                if (i !== groupOrderWithGroups.length) {
                    return false;
                }
                while (i--) {
                    if (domOrder[i] !== groupOrderWithGroups[i]) {
                        return false;
                    }
                }
                return true;
            }
            /**
             * Update the DOM positions of the before/after proxy
             * positioning containers for the groups.
             */
            updatePosContainerPositions() {
                const chart = this.chart;
                // If exporting, don't add these containers to the DOM.
                if (chart.renderer.forExport) {
                    return;
                }
                const rendererSVGEl = chart.renderer.box;
                chart.container.insertBefore(this.afterChartProxyPosContainer, rendererSVGEl.nextSibling);
                chart.container.insertBefore(this.beforeChartProxyPosContainer, rendererSVGEl);
                unhideChartElementFromAT(this.chart, this.afterChartProxyPosContainer);
                unhideChartElementFromAT(this.chart, this.beforeChartProxyPosContainer);
            }
        }
        /* *
         *
         *  Export Default
         *
         * */

        return ProxyProvider;
    });
    _registerModule(_modules, 'Accessibility/Components/RangeSelectorComponent.js', [_modules['Accessibility/AccessibilityComponent.js'], _modules['Accessibility/Utils/Announcer.js'], _modules['Accessibility/Utils/ChartUtilities.js'], _modules['Accessibility/KeyboardNavigationHandler.js'], _modules['Core/Utilities.js']], function (AccessibilityComponent, Announcer, ChartUtilities, KeyboardNavigationHandler, U) {
        /* *
         *
         *  (c) 2009-2024 Øystein Moseng
         *
         *  Accessibility component for the range selector.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { unhideChartElementFromAT, getAxisRangeDescription } = ChartUtilities;
        const { addEvent, attr } = U;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Do we want date input navigation
         * @private
         */
        function shouldRunInputNavigation(chart) {
            return Boolean(chart.rangeSelector &&
                chart.rangeSelector.inputGroup &&
                chart.rangeSelector.inputGroup.element.style.visibility !== 'hidden' &&
                chart.options.rangeSelector.inputEnabled !== false &&
                chart.rangeSelector.minInput &&
                chart.rangeSelector.maxInput);
        }
        /* *
         *
         *  Class
         *
         * */
        /**
         * The RangeSelectorComponent class
         *
         * @private
         * @class
         * @name Highcharts.RangeSelectorComponent
         */
        class RangeSelectorComponent extends AccessibilityComponent {
            /* *
             *
             *  Functions
             *
             * */
            /* eslint-disable valid-jsdoc */
            /**
             * Init the component
             * @private
             */
            init() {
                const chart = this.chart;
                this.announcer = new Announcer(chart, 'polite');
            }
            /**
             * Called on first render/updates to the chart, including options changes.
             */
            onChartUpdate() {
                const chart = this.chart, component = this, rangeSelector = chart.rangeSelector;
                if (!rangeSelector) {
                    return;
                }
                this.updateSelectorVisibility();
                this.setDropdownAttrs();
                if (rangeSelector.buttons &&
                    rangeSelector.buttons.length) {
                    rangeSelector.buttons.forEach((button) => {
                        component.setRangeButtonAttrs(button);
                    });
                }
                // Make sure input boxes are accessible and focusable
                if (rangeSelector.maxInput && rangeSelector.minInput) {
                    ['minInput', 'maxInput'].forEach(function (key, i) {
                        const input = rangeSelector[key];
                        if (input) {
                            unhideChartElementFromAT(chart, input);
                            component.setRangeInputAttrs(input, 'accessibility.rangeSelector.' + (i ? 'max' : 'min') +
                                'InputLabel');
                        }
                    });
                }
            }
            /**
             * Hide buttons from AT when showing dropdown, and vice versa.
             * @private
             */
            updateSelectorVisibility() {
                const chart = this.chart;
                const rangeSelector = chart.rangeSelector;
                const dropdown = (rangeSelector &&
                    rangeSelector.dropdown);
                const buttons = (rangeSelector &&
                    rangeSelector.buttons ||
                    []);
                const hideFromAT = (el) => el.setAttribute('aria-hidden', true);
                if (rangeSelector &&
                    rangeSelector.hasVisibleDropdown &&
                    dropdown) {
                    unhideChartElementFromAT(chart, dropdown);
                    buttons.forEach((btn) => hideFromAT(btn.element));
                }
                else {
                    if (dropdown) {
                        hideFromAT(dropdown);
                    }
                    buttons.forEach((btn) => unhideChartElementFromAT(chart, btn.element));
                }
            }
            /**
             * Set accessibility related attributes on dropdown element.
             * @private
             */
            setDropdownAttrs() {
                const chart = this.chart;
                const dropdown = (chart.rangeSelector &&
                    chart.rangeSelector.dropdown);
                if (dropdown) {
                    const label = chart.langFormat('accessibility.rangeSelector.dropdownLabel', { rangeTitle: chart.options.lang.rangeSelectorZoom });
                    dropdown.setAttribute('aria-label', label);
                    dropdown.setAttribute('tabindex', -1);
                }
            }
            /**
             * Set attrs for a range button
             * @private
             */
            setRangeButtonAttrs(button) {
                attr(button.element, {
                    tabindex: -1,
                    role: 'button'
                });
            }
            /**
             * Set attrs for a date input
             * @private
             */
            setRangeInputAttrs(input, langKey) {
                const chart = this.chart;
                attr(input, {
                    tabindex: -1,
                    'aria-label': chart.langFormat(langKey, { chart: chart })
                });
            }
            /**
             * Handle arrow key nav
             * @private
             */
            onButtonNavKbdArrowKey(keyboardNavigationHandler, keyCode) {
                const response = keyboardNavigationHandler.response, keys = this.keyCodes, chart = this.chart, wrapAround = chart.options.accessibility
                    .keyboardNavigation.wrapAround, direction = (keyCode === keys.left || keyCode === keys.up) ? -1 : 1, didHighlight = chart.highlightRangeSelectorButton(chart.highlightedRangeSelectorItemIx + direction);
                if (!didHighlight) {
                    if (wrapAround) {
                        keyboardNavigationHandler.init(direction);
                        return response.success;
                    }
                    return response[direction > 0 ? 'next' : 'prev'];
                }
                return response.success;
            }
            /**
             * Handle keyboard click
             * @private
             */
            onButtonNavKbdClick(keyboardNavigationHandler) {
                const response = keyboardNavigationHandler.response, chart = this.chart, wasDisabled = chart.oldRangeSelectorItemState === 3;
                if (!wasDisabled) {
                    this.fakeClickEvent(chart.rangeSelector.buttons[chart.highlightedRangeSelectorItemIx].element);
                }
                return response.success;
            }
            /**
             * Called whenever a range selector button has been clicked, either by
             * mouse, touch, or kbd/voice/other.
             * @private
             */
            onAfterBtnClick() {
                const chart = this.chart;
                const axisRangeDescription = getAxisRangeDescription(chart.xAxis[0]);
                const announcement = chart.langFormat('accessibility.rangeSelector.clickButtonAnnouncement', { chart, axisRangeDescription });
                if (announcement) {
                    this.announcer.announce(announcement);
                }
            }
            /**
             * Handle move between input elements with Tab key
             * @private
             */
            onInputKbdMove(direction) {
                const chart = this.chart;
                const rangeSel = chart.rangeSelector;
                const newIx = chart.highlightedInputRangeIx = (chart.highlightedInputRangeIx || 0) + direction;
                const newIxOutOfRange = newIx > 1 || newIx < 0;
                if (newIxOutOfRange) {
                    if (chart.accessibility) {
                        // Ignore focus
                        chart.accessibility.keyboardNavigation.exiting = true;
                        chart.accessibility.keyboardNavigation.tabindexContainer
                            .focus();
                        return chart.accessibility.keyboardNavigation.move(direction);
                    }
                }
                else if (rangeSel) {
                    const svgEl = rangeSel[newIx ? 'maxDateBox' : 'minDateBox'];
                    const inputEl = rangeSel[newIx ? 'maxInput' : 'minInput'];
                    if (svgEl && inputEl) {
                        chart.setFocusToElement(svgEl, inputEl);
                    }
                }
                return true;
            }
            /**
             * Init date input navigation
             * @private
             */
            onInputNavInit(direction) {
                const component = this;
                const chart = this.chart;
                const buttonIxToHighlight = direction > 0 ? 0 : 1;
                const rangeSel = chart.rangeSelector;
                const svgEl = (rangeSel &&
                    rangeSel[buttonIxToHighlight ? 'maxDateBox' : 'minDateBox']);
                const minInput = (rangeSel && rangeSel.minInput);
                const maxInput = (rangeSel && rangeSel.maxInput);
                const inputEl = buttonIxToHighlight ? maxInput : minInput;
                chart.highlightedInputRangeIx = buttonIxToHighlight;
                if (svgEl && minInput && maxInput) {
                    chart.setFocusToElement(svgEl, inputEl);
                    // Tab-press with the input focused does not propagate to chart
                    // automatically, so we manually catch and handle it when relevant.
                    if (this.removeInputKeydownHandler) {
                        this.removeInputKeydownHandler();
                    }
                    const keydownHandler = (e) => {
                        const isTab = (e.which || e.keyCode) === this.keyCodes.tab;
                        if (isTab &&
                            component.onInputKbdMove(e.shiftKey ? -1 : 1)) {
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    };
                    const minRemover = addEvent(minInput, 'keydown', keydownHandler);
                    const maxRemover = addEvent(maxInput, 'keydown', keydownHandler);
                    this.removeInputKeydownHandler = () => {
                        minRemover();
                        maxRemover();
                    };
                }
            }
            /**
             * Terminate date input nav
             * @private
             */
            onInputNavTerminate() {
                const rangeSel = (this.chart.rangeSelector || {});
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
            }
            /**
             * Init range selector dropdown nav
             * @private
             */
            initDropdownNav() {
                const chart = this.chart;
                const rangeSelector = chart.rangeSelector;
                const dropdown = (rangeSelector && rangeSelector.dropdown);
                if (rangeSelector && dropdown) {
                    chart.setFocusToElement(rangeSelector.buttonGroup, dropdown);
                    if (this.removeDropdownKeydownHandler) {
                        this.removeDropdownKeydownHandler();
                    }
                    // Tab-press with dropdown focused does not propagate to chart
                    // automatically, so we manually catch and handle it when relevant.
                    this.removeDropdownKeydownHandler = addEvent(dropdown, 'keydown', (e) => {
                        const isTab = (e.which || e.keyCode) === this.keyCodes.tab, a11y = chart.accessibility;
                        if (isTab) {
                            e.preventDefault();
                            e.stopPropagation();
                            if (a11y) {
                                a11y.keyboardNavigation.tabindexContainer.focus();
                                a11y.keyboardNavigation.move(e.shiftKey ? -1 : 1);
                            }
                        }
                    });
                }
            }
            /**
             * Get navigation for the range selector buttons.
             * @private
             * @return {Highcharts.KeyboardNavigationHandler} The module object.
             */
            getRangeSelectorButtonNavigation() {
                const chart = this.chart;
                const keys = this.keyCodes;
                const component = this;
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
                        const rangeSelector = chart.rangeSelector;
                        if (rangeSelector && rangeSelector.hasVisibleDropdown) {
                            component.initDropdownNav();
                        }
                        else if (rangeSelector) {
                            const lastButtonIx = rangeSelector.buttons.length - 1;
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
            }
            /**
             * Get navigation for the range selector input boxes.
             * @private
             * @return {Highcharts.KeyboardNavigationHandler}
             *         The module object.
             */
            getRangeSelectorInputNavigation() {
                const chart = this.chart;
                const component = this;
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
            }
            /**
             * Get keyboard navigation handlers for this component.
             * @return {Array<Highcharts.KeyboardNavigationHandler>}
             *         List of module objects.
             */
            getKeyboardNavigation() {
                return [
                    this.getRangeSelectorButtonNavigation(),
                    this.getRangeSelectorInputNavigation()
                ];
            }
            /**
             * Remove component traces
             */
            destroy() {
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
        }
        /* *
         *
         *  Class Namespace
         *
         * */
        (function (RangeSelectorComponent) {
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
            /**
             * Highlight range selector button by index.
             *
             * @private
             * @function Highcharts.Chart#highlightRangeSelectorButton
             */
            function chartHighlightRangeSelectorButton(ix) {
                const buttons = (this.rangeSelector &&
                    this.rangeSelector.buttons ||
                    []);
                const curHighlightedIx = this.highlightedRangeSelectorItemIx;
                const curSelectedIx = (this.rangeSelector &&
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
            }
            /**
             * Build compositions
             * @private
             */
            function compose(ChartClass, RangeSelectorClass) {
                const chartProto = ChartClass.prototype;
                if (!chartProto.highlightRangeSelectorButton) {
                    chartProto.highlightRangeSelectorButton = (chartHighlightRangeSelectorButton);
                    addEvent(RangeSelectorClass, 'afterBtnClick', rangeSelectorAfterBtnClick);
                }
            }
            RangeSelectorComponent.compose = compose;
            /**
             * Range selector does not have destroy-setup for class instance events - so
             * we set it on the class and call the component from here.
             * @private
             */
            function rangeSelectorAfterBtnClick() {
                const a11y = this.chart.accessibility;
                if (a11y && a11y.components.rangeSelector) {
                    return a11y.components.rangeSelector.onAfterBtnClick();
                }
            }
        })(RangeSelectorComponent || (RangeSelectorComponent = {}));
        /* *
         *
         *  Export Default
         *
         * */

        return RangeSelectorComponent;
    });
    _registerModule(_modules, 'Accessibility/Components/SeriesComponent/ForcedMarkers.js', [_modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (H, U) {
        /* *
         *
         *  (c) 2009-2024 Øystein Moseng
         *
         *  Handle forcing series markers.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { composed } = H;
        const { addEvent, merge, pushUnique } = U;
        /* *
         *
         *  Composition
         *
         * */
        var ForcedMarkersComposition;
        (function (ForcedMarkersComposition) {
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
            /**
             * @private
             */
            function compose(SeriesClass) {
                if (pushUnique(composed, 'A11y.FM')) {
                    addEvent(SeriesClass, 'afterSetOptions', seriesOnAfterSetOptions);
                    addEvent(SeriesClass, 'render', seriesOnRender);
                    addEvent(SeriesClass, 'afterRender', seriesOnAfterRender);
                    addEvent(SeriesClass, 'renderCanvas', seriesOnRenderCanvas);
                }
            }
            ForcedMarkersComposition.compose = compose;
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
                    pointOptions.marker.states.normal.opacity;
            }
            /**
             * @private
             */
            function handleForcePointMarkers(series) {
                let i = series.points.length;
                while (i--) {
                    const point = series.points[i];
                    const pointOptions = point.options;
                    const hadForcedMarker = point.hasForcedA11yMarker;
                    delete point.hasForcedA11yMarker;
                    if (pointOptions.marker) {
                        const isStillForcedMarker = hadForcedMarker &&
                            getPointMarkerOpacity(pointOptions) === 0;
                        if (pointOptions.marker.enabled && !isStillForcedMarker) {
                            unforcePointMarkerOptions(pointOptions);
                            point.hasForcedA11yMarker = false;
                        }
                        else if (pointOptions.marker.enabled === false) {
                            forceZeroOpacityMarkerOptions(pointOptions);
                            point.hasForcedA11yMarker = true;
                        }
                    }
                }
            }
            /**
             * @private
             */
            function hasIndividualPointMarkerOptions(series) {
                return !!(series._hasPointMarkers &&
                    series.points &&
                    series.points.length);
            }
            /**
             * @private
             */
            function isWithinDescriptionThreshold(series) {
                const a11yOptions = series.chart.options.accessibility;
                return series.points.length <
                    a11yOptions.series.pointDescriptionEnabledThreshold ||
                    a11yOptions.series
                        .pointDescriptionEnabledThreshold === false;
            }
            /**
             * Process marker graphics after render
             * @private
             */
            function seriesOnAfterRender() {
                const series = this;
                // For styled mode the rendered graphic does not reflect the style
                // options, and we need to add/remove classes to achieve the same.
                if (series.chart.styledMode) {
                    if (series.markerGroup) {
                        series.markerGroup[series.a11yMarkersForced ? 'addClass' : 'removeClass']('highcharts-a11y-markers-hidden');
                    }
                    // Do we need to handle individual points?
                    if (hasIndividualPointMarkerOptions(series)) {
                        series.points.forEach((point) => {
                            if (point.graphic) {
                                point.graphic[point.hasForcedA11yMarker ?
                                    'addClass' : 'removeClass']('highcharts-a11y-marker-hidden');
                                point.graphic[point.hasForcedA11yMarker === false ?
                                    'addClass' :
                                    'removeClass']('highcharts-a11y-marker-visible');
                            }
                        });
                    }
                }
            }
            /**
             * Keep track of options to reset markers to if no longer forced.
             * @private
             */
            function seriesOnAfterSetOptions(e) {
                this.resetA11yMarkerOptions = merge(e.options.marker || {}, this.userOptions.marker || {});
            }
            /**
             * Keep track of forcing markers.
             * @private
             */
            function seriesOnRender() {
                const series = this, options = series.options;
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
                    delete series.resetA11yMarkerOptions;
                }
            }
            /**
             * @private
             */
            function shouldForceMarkers(series) {
                const chart = series.chart, chartA11yEnabled = chart.options.accessibility.enabled, seriesA11yEnabled = (series.options.accessibility &&
                    series.options.accessibility.enabled) !== false;
                return (chartA11yEnabled &&
                    seriesA11yEnabled &&
                    isWithinDescriptionThreshold(series));
            }
            /**
             * @private
             */
            function unforcePointMarkerOptions(pointOptions) {
                merge(true, pointOptions.marker, {
                    states: {
                        normal: {
                            opacity: getPointMarkerOpacity(pointOptions) || 1
                        }
                    }
                });
            }
            /**
             * Reset markers to normal
             * @private
             */
            function unforceSeriesMarkerOptions(series) {
                const resetMarkerOptions = series.resetA11yMarkerOptions;
                if (resetMarkerOptions) {
                    const originalOpacity = resetMarkerOptions.states &&
                        resetMarkerOptions.states.normal &&
                        resetMarkerOptions.states.normal.opacity;
                    // Temporarily set the old marker options to enabled in order to
                    // trigger destruction of the markers in Series.update.
                    if (series.userOptions && series.userOptions.marker) {
                        series.userOptions.marker.enabled = true;
                    }
                    series.update({
                        marker: {
                            enabled: resetMarkerOptions.enabled,
                            states: {
                                normal: { opacity: originalOpacity }
                            }
                        }
                    });
                }
            }
            /**
             * Reset markers if series is boosted and had forced markers (#17320).
             * @private
             */
            function seriesOnRenderCanvas() {
                if (this.boosted && this.a11yMarkersForced) {
                    merge(true, this.options, {
                        marker: {
                            enabled: false
                        }
                    });
                    delete this.a11yMarkersForced;
                }
            }
        })(ForcedMarkersComposition || (ForcedMarkersComposition = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return ForcedMarkersComposition;
    });
    _registerModule(_modules, 'Accessibility/Components/SeriesComponent/SeriesKeyboardNavigation.js', [_modules['Core/Series/Point.js'], _modules['Core/Series/Series.js'], _modules['Core/Series/SeriesRegistry.js'], _modules['Core/Globals.js'], _modules['Core/Utilities.js'], _modules['Accessibility/KeyboardNavigationHandler.js'], _modules['Accessibility/Utils/EventProvider.js'], _modules['Accessibility/Utils/ChartUtilities.js']], function (Point, Series, SeriesRegistry, H, U, KeyboardNavigationHandler, EventProvider, ChartUtilities) {
        /* *
         *
         *  (c) 2009-2024 Øystein Moseng
         *
         *  Handle keyboard navigation for series.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { seriesTypes } = SeriesRegistry;
        const { doc } = H;
        const { defined, fireEvent } = U;
        const { getPointFromXY, getSeriesFromName, scrollAxisToPoint } = ChartUtilities;
        /* *
         *
         *  Functions
         *
         * */
        /* eslint-disable valid-jsdoc */
        /**
         * Get the index of a point in a series. This is needed when using e.g. data
         * grouping.
         *
         * @private
         * @function getPointIndex
         * @param {Highcharts.AccessibilityPoint} point
         * The point to find index of.
         * @return {number|undefined}
         * The index in the series.points array of the point.
         */
        function getPointIndex(point) {
            const index = point.index, points = point.series.points;
            let i = points.length;
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
         * @private
         */
        function isSkipSeries(series) {
            const a11yOptions = series.chart.options.accessibility, seriesNavOptions = a11yOptions.keyboardNavigation.seriesNavigation, seriesA11yOptions = series.options.accessibility || {}, seriesKbdNavOptions = seriesA11yOptions.keyboardNavigation;
            return seriesKbdNavOptions && seriesKbdNavOptions.enabled === false ||
                seriesA11yOptions.enabled === false ||
                series.options.enableMouseTracking === false || // #8440
                !series.visible ||
                // Skip all points in a series where pointNavigationEnabledThreshold is
                // reached
                (seriesNavOptions.pointNavigationEnabledThreshold &&
                    +seriesNavOptions.pointNavigationEnabledThreshold <=
                        series.points.length);
        }
        /**
         * Determine if navigation for a point should be skipped
         * @private
         */
        function isSkipPoint(point) {
            const a11yOptions = point.series.chart.options.accessibility;
            const pointA11yDisabled = (point.options.accessibility &&
                point.options.accessibility.enabled === false);
            return point.isNull &&
                a11yOptions.keyboardNavigation.seriesNavigation.skipNullPoints ||
                point.visible === false ||
                point.isInside === false ||
                pointA11yDisabled ||
                isSkipSeries(point.series);
        }
        /**
         * Get the first point that is not a skip point in this series.
         * @private
         */
        function getFirstValidPointInSeries(series) {
            const points = series.points || [], len = points.length;
            for (let i = 0; i < len; ++i) {
                if (!isSkipPoint(points[i])) {
                    return points[i];
                }
            }
            return null;
        }
        /**
         * Get the first point that is not a skip point in this chart.
         * @private
         */
        function getFirstValidPointInChart(chart) {
            const series = chart.series || [], len = series.length;
            for (let i = 0; i < len; ++i) {
                if (!isSkipSeries(series[i])) {
                    const point = getFirstValidPointInSeries(series[i]);
                    if (point) {
                        return point;
                    }
                }
            }
            return null;
        }
        /**
         * @private
         */
        function highlightLastValidPointInChart(chart) {
            const numSeries = chart.series.length;
            let i = numSeries, res = false;
            while (i--) {
                chart.highlightedPoint = chart.series[i].points[chart.series[i].points.length - 1];
                // Highlight first valid point in the series will also
                // look backwards. It always starts from currently
                // highlighted point.
                res = chart.series[i].highlightNextValidPoint();
                if (res) {
                    break;
                }
            }
            return res;
        }
        /**
         * After drilling down/up, we need to set focus to the first point for
         * screen readers and keyboard nav.
         * @private
         */
        function updateChartFocusAfterDrilling(chart) {
            const point = getFirstValidPointInChart(chart);
            if (point) {
                point.highlight(false); // Do not visually highlight
            }
        }
        /**
         * Highlight the first point in chart that is not a skip point
         * @private
         */
        function highlightFirstValidPointInChart(chart) {
            delete chart.highlightedPoint;
            const point = getFirstValidPointInChart(chart);
            return point ? point.highlight() : false;
        }
        /* *
         *
         *  Class
         *
         * */
        /**
         * @private
         * @class
         * @name Highcharts.SeriesKeyboardNavigation
         */
        class SeriesKeyboardNavigation {
            /* *
             *
             *  Constructor
             *
             * */
            constructor(chart, keyCodes) {
                this.keyCodes = keyCodes;
                this.chart = chart;
            }
            /* *
             *
             *  Functions
             *
             * */
            /* eslint-disable valid-jsdoc */
            /**
             * Init the keyboard navigation
             */
            init() {
                const keyboardNavigation = this, chart = this.chart, e = this.eventProvider = new EventProvider();
                e.addEvent(Series, 'destroy', function () {
                    return keyboardNavigation.onSeriesDestroy(this);
                });
                e.addEvent(chart, 'afterApplyDrilldown', function () {
                    updateChartFocusAfterDrilling(this);
                });
                e.addEvent(chart, 'drilldown', function (e) {
                    const point = e.point, series = point.series;
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
                    const point = this;
                    const pointEl = point.graphic && point.graphic.element;
                    const focusedElement = doc.activeElement;
                    // VO brings focus with it to container, causing series nav to run.
                    // If then navigating with virtual cursor, it is possible to leave
                    // keyboard nav module state on the data points and still activate
                    // proxy buttons.
                    const focusedElClassName = (focusedElement && focusedElement.getAttribute('class'));
                    const isProxyFocused = focusedElClassName &&
                        focusedElClassName.indexOf('highcharts-a11y-proxy-element') > -1;
                    if (chart.highlightedPoint === point &&
                        focusedElement !== pointEl &&
                        !isProxyFocused &&
                        pointEl &&
                        pointEl.focus) {
                        pointEl.focus();
                    }
                });
            }
            /**
             * After drillup we want to find the point that was drilled down to and
             * highlight it.
             * @private
             */
            onDrillupAll() {
                const last = this.lastDrilledDownPoint, chart = this.chart, series = last && getSeriesFromName(chart, last.seriesName);
                let point;
                if (last && series && defined(last.x) && defined(last.y)) {
                    point = getPointFromXY(series, last.x, last.y);
                }
                point = point || getFirstValidPointInChart(chart);
                // Container focus can be lost on drillup due to deleted elements.
                if (chart.container) {
                    chart.container.focus();
                }
                if (point && point.highlight) {
                    point.highlight(false); // Do not visually highlight
                }
            }
            /**
             * @private
             */
            getKeyboardNavigationHandler() {
                const keyboardNavigation = this, keys = this.keyCodes, chart = this.chart, inverted = chart.inverted;
                return new KeyboardNavigationHandler(chart, {
                    keyCodeMap: [
                        [
                            inverted ? [keys.up, keys.down] : [keys.left, keys.right],
                            function (keyCode) {
                                return keyboardNavigation.onKbdSideways(this, keyCode);
                            }
                        ],
                        [
                            inverted ? [keys.left, keys.right] : [keys.up, keys.down],
                            function (keyCode) {
                                return keyboardNavigation.onKbdVertical(this, keyCode);
                            }
                        ],
                        [
                            [keys.enter, keys.space],
                            function (keyCode, event) {
                                const point = chart.highlightedPoint;
                                if (point) {
                                    const { plotLeft, plotTop } = this.chart, { plotX = 0, plotY = 0 } = point;
                                    event = {
                                        ...event,
                                        chartX: plotLeft + plotX,
                                        chartY: plotTop + plotY,
                                        point: point,
                                        target: point.graphic?.element || event.target
                                    };
                                    fireEvent(point.series, 'click', event);
                                    point.firePointEvent('click', event);
                                }
                                return this.response.success;
                            }
                        ],
                        [
                            [keys.home],
                            function () {
                                highlightFirstValidPointInChart(chart);
                                return this.response.success;
                            }
                        ],
                        [
                            [keys.end],
                            function () {
                                highlightLastValidPointInChart(chart);
                                return this.response.success;
                            }
                        ],
                        [
                            [keys.pageDown, keys.pageUp],
                            function (keyCode) {
                                chart.highlightAdjacentSeries(keyCode === keys.pageDown);
                                return this.response.success;
                            }
                        ]
                    ],
                    init: function () {
                        return keyboardNavigation.onHandlerInit(this);
                    },
                    validate: function () {
                        return !!getFirstValidPointInChart(chart);
                    },
                    terminate: function () {
                        return keyboardNavigation.onHandlerTerminate();
                    }
                });
            }
            /**
             * @private
             * @param {Highcharts.KeyboardNavigationHandler} handler
             * @param {number} keyCode
             * @return {number}
             * response
             */
            onKbdSideways(handler, keyCode) {
                const keys = this.keyCodes, isNext = keyCode === keys.right || keyCode === keys.down;
                return this.attemptHighlightAdjacentPoint(handler, isNext);
            }
            /**
             * When keyboard navigation inits.
             * @private
             * @param {Highcharts.KeyboardNavigationHandler} handler The handler object
             * @return {number}
             * response
             */
            onHandlerInit(handler) {
                const chart = this.chart, kbdNavOptions = chart.options.accessibility.keyboardNavigation;
                if (kbdNavOptions.seriesNavigation.rememberPointFocus &&
                    chart.highlightedPoint) {
                    chart.highlightedPoint.highlight();
                }
                else {
                    highlightFirstValidPointInChart(chart);
                }
                return handler.response.success;
            }
            /**
             * @private
             * @param {Highcharts.KeyboardNavigationHandler} handler
             * @param {number} keyCode
             * @return {number}
             * response
             */
            onKbdVertical(handler, keyCode) {
                const chart = this.chart, keys = this.keyCodes, isNext = keyCode === keys.down || keyCode === keys.right, navOptions = chart.options.accessibility.keyboardNavigation
                    .seriesNavigation;
                // Handle serialized mode, act like left/right
                if (navOptions.mode && navOptions.mode === 'serialize') {
                    return this.attemptHighlightAdjacentPoint(handler, isNext);
                }
                // Normal mode, move between series
                const highlightMethod = (chart.highlightedPoint &&
                    chart.highlightedPoint.series.keyboardMoveVertical) ?
                    'highlightAdjacentPointVertical' :
                    'highlightAdjacentSeries';
                chart[highlightMethod](isNext);
                return handler.response.success;
            }
            /**
             * @private
             */
            onHandlerTerminate() {
                const chart = this.chart, kbdNavOptions = chart.options.accessibility.keyboardNavigation;
                if (chart.tooltip) {
                    chart.tooltip.hide(0);
                }
                const hoverSeries = (chart.highlightedPoint && chart.highlightedPoint.series);
                if (hoverSeries && hoverSeries.onMouseOut) {
                    hoverSeries.onMouseOut();
                }
                if (chart.highlightedPoint && chart.highlightedPoint.onMouseOut) {
                    chart.highlightedPoint.onMouseOut();
                }
                if (!kbdNavOptions.seriesNavigation.rememberPointFocus) {
                    delete chart.highlightedPoint;
                }
            }
            /**
             * Function that attempts to highlight next/prev point. Handles wrap around.
             * @private
             */
            attemptHighlightAdjacentPoint(handler, directionIsNext) {
                const chart = this.chart, wrapAround = chart.options.accessibility.keyboardNavigation
                    .wrapAround, highlightSuccessful = chart.highlightAdjacentPoint(directionIsNext);
                if (!highlightSuccessful) {
                    if (wrapAround && (directionIsNext ?
                        highlightFirstValidPointInChart(chart) :
                        highlightLastValidPointInChart(chart))) {
                        return handler.response.success;
                    }
                    return handler.response[directionIsNext ? 'next' : 'prev'];
                }
                return handler.response.success;
            }
            /**
             * @private
             */
            onSeriesDestroy(series) {
                const chart = this.chart, currentHighlightedPointDestroyed = chart.highlightedPoint &&
                    chart.highlightedPoint.series === series;
                if (currentHighlightedPointDestroyed) {
                    delete chart.highlightedPoint;
                    if (chart.focusElement) {
                        chart.focusElement.removeFocusBorder();
                    }
                }
            }
            /**
             * @private
             */
            destroy() {
                this.eventProvider.removeAddedEvents();
            }
        }
        /* *
         *
         *  Class Namespace
         *
         * */
        (function (SeriesKeyboardNavigation) {
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
            /**
             * Function to highlight next/previous point in chart.
             *
             * @private
             * @function Highcharts.Chart#highlightAdjacentPoint
             *
             * @param {boolean} next
             * Flag for the direction.
             *
             * @return {Highcharts.Point|boolean}
             * Returns highlighted point on success, false on failure (no adjacent point
             * to highlight in chosen direction).
             */
            function chartHighlightAdjacentPoint(next) {
                const chart = this, series = chart.series, curPoint = chart.highlightedPoint, curPointIndex = curPoint && getPointIndex(curPoint) || 0, curPoints = curPoint && curPoint.series.points || [], lastSeries = chart.series && chart.series[chart.series.length - 1], lastPoint = lastSeries &&
                    lastSeries.points &&
                    lastSeries.points[lastSeries.points.length - 1];
                let newSeries, newPoint;
                // If no points, return false
                if (!series[0] || !series[0].points) {
                    return false;
                }
                if (!curPoint) {
                    // No point is highlighted yet. Try first/last point depending on
                    // move direction
                    newPoint = next ? series[0].points[0] : lastPoint;
                }
                else {
                    // We have a highlighted point. Grab next/prev point & series.
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
                    // If we skip this whole series, move to the end of the series
                    // before we recurse, just to optimize
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
            }
            /**
             * Highlight the closest point vertically.
             * @private
             */
            function chartHighlightAdjacentPointVertical(down) {
                const curPoint = this.highlightedPoint;
                let minDistance = Infinity, bestPoint;
                if (!defined(curPoint.plotX) || !defined(curPoint.plotY)) {
                    return false;
                }
                this.series.forEach((series) => {
                    if (isSkipSeries(series)) {
                        return;
                    }
                    series.points.forEach((point) => {
                        if (!defined(point.plotY) || !defined(point.plotX) ||
                            point === curPoint) {
                            return;
                        }
                        let yDistance = point.plotY - curPoint.plotY;
                        const width = Math.abs(point.plotX - curPoint.plotX), distance = Math.abs(yDistance) * Math.abs(yDistance) +
                            width * width * 4; // Weigh horizontal distance highly
                        // Reverse distance number if axis is reversed
                        if (series.yAxis && series.yAxis.reversed) {
                            yDistance *= -1;
                        }
                        if (yDistance <= 0 && down || yDistance >= 0 && !down ||
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
            }
            /**
             * Highlight next/previous series in chart. Returns false if no adjacent
             * series in the direction, otherwise returns new highlighted point.
             * @private
             */
            function chartHighlightAdjacentSeries(down) {
                const chart = this, curPoint = chart.highlightedPoint, lastSeries = chart.series && chart.series[chart.series.length - 1], lastPoint = lastSeries && lastSeries.points &&
                    lastSeries.points[lastSeries.points.length - 1];
                let newSeries, newPoint, adjacentNewPoint;
                // If no point is highlighted, highlight the first/last point
                if (!chart.highlightedPoint) {
                    newSeries = down ? (chart.series && chart.series[0]) : lastSeries;
                    newPoint = down ?
                        (newSeries && newSeries.points && newSeries.points[0]) :
                        lastPoint;
                    return newPoint ? newPoint.highlight() : false;
                }
                newSeries = (chart.series[curPoint.series.index + (down ? -1 : 1)]);
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
                    // Try recurse
                    adjacentNewPoint = chart.highlightAdjacentSeries(down);
                    if (!adjacentNewPoint) {
                        // Recurse failed
                        curPoint.highlight();
                        return false;
                    }
                    // Recurse succeeded
                    return adjacentNewPoint;
                }
                // Highlight the new point or any first valid point back or forwards
                // from it
                newPoint.highlight();
                return newPoint.series.highlightNextValidPoint();
            }
            /**
             * @private
             */
            function compose(ChartClass, PointClass, SeriesClass) {
                const chartProto = ChartClass.prototype, pointProto = PointClass.prototype, seriesProto = SeriesClass.prototype;
                if (!chartProto.highlightAdjacentPoint) {
                    chartProto.highlightAdjacentPoint = chartHighlightAdjacentPoint;
                    chartProto.highlightAdjacentPointVertical = (chartHighlightAdjacentPointVertical);
                    chartProto.highlightAdjacentSeries = chartHighlightAdjacentSeries;
                    pointProto.highlight = pointHighlight;
                    /**
                     * Set for which series types it makes sense to move to the closest
                     * point with up/down arrows, and which series types should just
                     * move to next series.
                     * @private
                     */
                    seriesProto.keyboardMoveVertical = true;
                    [
                        'column',
                        'gantt',
                        'pie'
                    ].forEach((type) => {
                        if (seriesTypes[type]) {
                            seriesTypes[type].prototype.keyboardMoveVertical = false;
                        }
                    });
                    seriesProto.highlightNextValidPoint = (seriesHighlightNextValidPoint);
                }
            }
            SeriesKeyboardNavigation.compose = compose;
            /**
             * Get the point in a series that is closest (in pixel distance) to a
             * reference point. Optionally supply weight factors for x and y directions.
             * @private
             */
            function getClosestPoint(point, series, xWeight, yWeight) {
                let minDistance = Infinity, dPoint, minIx, distance, i = series.points.length;
                const hasUndefinedPosition = (point) => (!(defined(point.plotX) && defined(point.plotY)));
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
             * Highlights a point (show tooltip, display hover state, focus element).
             *
             * @private
             * @function Highcharts.Point#highlight
             *
             * @return {Highcharts.Point}
             *         This highlighted point.
             */
            function pointHighlight(highlightVisually = true) {
                const chart = this.series.chart, tooltipElement = chart.tooltip?.label?.element;
                if (!this.isNull && highlightVisually) {
                    this.onMouseOver(); // Show the hover marker and tooltip
                }
                else {
                    if (chart.tooltip) {
                        chart.tooltip.hide(0);
                    }
                    // Do not call blur on the element, as it messes up the focus of the
                    // div element of the chart
                }
                scrollAxisToPoint(this);
                // We focus only after calling onMouseOver because the state change can
                // change z-index and mess up the element.
                if (this.graphic) {
                    chart.setFocusToElement(this.graphic);
                    if (!highlightVisually && chart.focusElement) {
                        chart.focusElement.removeFocusBorder();
                    }
                }
                chart.highlightedPoint = this;
                // Get position of the tooltip.
                const tooltipTop = tooltipElement?.getBoundingClientRect().top;
                if (tooltipElement && tooltipTop && tooltipTop < 0) {
                    // Calculate scroll position.
                    const scrollTop = window.scrollY, newScrollTop = scrollTop + tooltipTop;
                    // Scroll window to new position.
                    window.scrollTo({
                        behavior: 'smooth',
                        top: newScrollTop
                    });
                }
                return this;
            }
            /**
             * Highlight first valid point in a series. Returns the point if
             * successfully highlighted, otherwise false. If there is a highlighted
             * point in the series, use that as starting point.
             *
             * @private
             * @function Highcharts.Series#highlightNextValidPoint
             */
            function seriesHighlightNextValidPoint() {
                const curPoint = this.chart.highlightedPoint, start = (curPoint && curPoint.series) === this ?
                    getPointIndex(curPoint) :
                    0, points = this.points, len = points.length;
                if (points && len) {
                    for (let i = start; i < len; ++i) {
                        if (!isSkipPoint(points[i])) {
                            return points[i].highlight();
                        }
                    }
                    for (let j = start; j >= 0; --j) {
                        if (!isSkipPoint(points[j])) {
                            return points[j].highlight();
                        }
                    }
                }
                return false;
            }
        })(SeriesKeyboardNavigation || (SeriesKeyboardNavigation = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return SeriesKeyboardNavigation;
    });
    _registerModule(_modules, 'Accessibility/Components/SeriesComponent/SeriesComponent.js', [_modules['Accessibility/AccessibilityComponent.js'], _modules['Accessibility/Utils/ChartUtilities.js'], _modules['Accessibility/Components/SeriesComponent/ForcedMarkers.js'], _modules['Accessibility/Components/SeriesComponent/NewDataAnnouncer.js'], _modules['Accessibility/Components/SeriesComponent/SeriesDescriber.js'], _modules['Accessibility/Components/SeriesComponent/SeriesKeyboardNavigation.js']], function (AccessibilityComponent, ChartUtilities, ForcedMarkers, NewDataAnnouncer, SeriesDescriber, SeriesKeyboardNavigation) {
        /* *
         *
         *  (c) 2009-2024 Øystein Moseng
         *
         *  Accessibility component for series and points.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { hideSeriesFromAT } = ChartUtilities;
        const { describeSeries } = SeriesDescriber;
        /* *
         *
         *  Class
         *
         * */
        /**
         * The SeriesComponent class
         *
         * @private
         * @class
         * @name Highcharts.SeriesComponent
         */
        class SeriesComponent extends AccessibilityComponent {
            /* *
             *
             *  Static Functions
             *
             * */
            /* eslint-disable valid-jsdoc */
            /**
             * @private
             */
            static compose(ChartClass, PointClass, SeriesClass) {
                NewDataAnnouncer.compose(SeriesClass);
                ForcedMarkers.compose(SeriesClass);
                SeriesKeyboardNavigation.compose(ChartClass, PointClass, SeriesClass);
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Init the component.
             */
            init() {
                this.newDataAnnouncer = new NewDataAnnouncer(this.chart);
                this.newDataAnnouncer.init();
                this.keyboardNavigation = new SeriesKeyboardNavigation(this.chart, this.keyCodes);
                this.keyboardNavigation.init();
                this.hideTooltipFromATWhenShown();
                this.hideSeriesLabelsFromATWhenShown();
            }
            /**
             * @private
             */
            hideTooltipFromATWhenShown() {
                const component = this;
                if (this.chart.tooltip) {
                    this.addEvent(this.chart.tooltip.constructor, 'refresh', function () {
                        if (this.chart === component.chart &&
                            this.label &&
                            this.label.element) {
                            this.label.element.setAttribute('aria-hidden', true);
                        }
                    });
                }
            }
            /**
             * @private
             */
            hideSeriesLabelsFromATWhenShown() {
                this.addEvent(this.chart, 'afterDrawSeriesLabels', function () {
                    this.series.forEach(function (series) {
                        if (series.labelBySeries) {
                            series.labelBySeries.attr('aria-hidden', true);
                        }
                    });
                });
            }
            /**
             * Called on chart render. It is necessary to do this for render in case
             * markers change on zoom/pixel density.
             */
            onChartRender() {
                const chart = this.chart;
                chart.series.forEach(function (series) {
                    const shouldDescribeSeries = (series.options.accessibility &&
                        series.options.accessibility.enabled) !== false &&
                        series.visible && series.getPointsCollection().length !== 0;
                    if (shouldDescribeSeries) {
                        describeSeries(series);
                    }
                    else {
                        hideSeriesFromAT(series);
                    }
                });
            }
            /**
             * Get keyboard navigation handler for this component.
             * @private
             */
            getKeyboardNavigation() {
                return this.keyboardNavigation.getKeyboardNavigationHandler();
            }
            /**
             * Remove traces
             * @private
             */
            destroy() {
                this.newDataAnnouncer.destroy();
                this.keyboardNavigation.destroy();
            }
        }
        /* *
         *
         *  Default Export
         *
         * */

        return SeriesComponent;
    });
    _registerModule(_modules, 'Accessibility/Components/ZoomComponent.js', [_modules['Accessibility/AccessibilityComponent.js'], _modules['Accessibility/Utils/ChartUtilities.js'], _modules['Accessibility/Utils/HTMLUtilities.js'], _modules['Accessibility/KeyboardNavigationHandler.js'], _modules['Core/Utilities.js']], function (AccessibilityComponent, CU, HU, KeyboardNavigationHandler, U) {
        /* *
         *
         *  (c) 2009-2024 Øystein Moseng
         *
         *  Accessibility component for chart zoom.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { unhideChartElementFromAT } = CU;
        const { getFakeMouseEvent } = HU;
        const { attr, pick } = U;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * @private
         */
        function chartHasMapZoom(chart) {
            return !!((chart.mapView) &&
                chart.mapNavigation &&
                chart.mapNavigation.navButtons.length);
        }
        /* *
         *
         *  Class
         *
         * */
        /**
         * The ZoomComponent class
         *
         * @private
         * @class
         * @name Highcharts.ZoomComponent
         */
        class ZoomComponent extends AccessibilityComponent {
            constructor() {
                /* *
                 *
                 *  Properties
                 *
                 * */
                super(...arguments);
                this.focusedMapNavButtonIx = -1;
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Initialize the component
             */
            init() {
                const component = this, chart = this.chart;
                this.proxyProvider.addGroup('zoom', 'div');
                [
                    'afterShowResetZoom', 'afterApplyDrilldown', 'drillupall'
                ].forEach((eventType) => {
                    component.addEvent(chart, eventType, function () {
                        component.updateProxyOverlays();
                    });
                });
            }
            /**
             * Called when chart is updated
             */
            onChartUpdate() {
                const chart = this.chart, component = this;
                // Make map zoom buttons accessible
                if (chart.mapNavigation) {
                    chart.mapNavigation.navButtons.forEach((button, i) => {
                        unhideChartElementFromAT(chart, button.element);
                        component.setMapNavButtonAttrs(button.element, 'accessibility.zoom.mapZoom' + (i ? 'Out' : 'In'));
                    });
                }
            }
            /**
             * @private
             * @param {Highcharts.HTMLDOMElement|Highcharts.SVGDOMElement} button
             * @param {string} labelFormatKey
             */
            setMapNavButtonAttrs(button, labelFormatKey) {
                const chart = this.chart, label = chart.langFormat(labelFormatKey, { chart: chart });
                attr(button, {
                    tabindex: -1,
                    role: 'button',
                    'aria-label': label
                });
            }
            /**
             * Update the proxy overlays on every new render to ensure positions are
             * correct.
             */
            onChartRender() {
                this.updateProxyOverlays();
            }
            /**
             * Update proxy overlays, recreating the buttons.
             */
            updateProxyOverlays() {
                const chart = this.chart;
                // Always start with a clean slate
                this.proxyProvider.clearGroup('zoom');
                if (chart.resetZoomButton) {
                    this.createZoomProxyButton(chart.resetZoomButton, 'resetZoomProxyButton', chart.langFormat('accessibility.zoom.resetZoomButton', { chart: chart }));
                }
                if (chart.drillUpButton &&
                    chart.breadcrumbs &&
                    chart.breadcrumbs.list) {
                    const lastBreadcrumb = chart.breadcrumbs.list[chart.breadcrumbs.list.length - 1];
                    this.createZoomProxyButton(chart.drillUpButton, 'drillUpProxyButton', chart.langFormat('accessibility.drillUpButton', {
                        chart: chart,
                        buttonText: chart.breadcrumbs.getButtonText(lastBreadcrumb)
                    }));
                }
            }
            /**
             * @private
             * @param {Highcharts.SVGElement} buttonEl
             * @param {string} buttonProp
             * @param {string} label
             */
            createZoomProxyButton(buttonEl, buttonProp, label) {
                this[buttonProp] = this.proxyProvider.addProxyElement('zoom', {
                    click: buttonEl
                }, 'button', {
                    'aria-label': label,
                    tabindex: -1
                });
            }
            /**
             * Get keyboard navigation handler for map zoom.
             * @private
             * @return {Highcharts.KeyboardNavigationHandler} The module object
             */
            getMapZoomNavigation() {
                const keys = this.keyCodes, chart = this.chart, component = this;
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
            }
            /**
             * Arrow key panning for maps.
             * @private
             * @param {Highcharts.KeyboardNavigationHandler} keyboardNavigationHandler The handler context.
             * @param {number} keyCode Key pressed.
             * @return {number} Response code
             */
            onMapKbdArrow(keyboardNavigationHandler, keyCode) {
                const chart = this.chart, keys = this.keyCodes, target = chart.container, isY = keyCode === keys.up || keyCode === keys.down, stepDirection = (keyCode === keys.left || keyCode === keys.up) ?
                    1 : -1, granularity = 10, diff = (isY ? chart.plotHeight : chart.plotWidth) /
                    granularity * stepDirection, 
                // Randomize since same mousedown coords twice is ignored in MapView
                r = Math.random() * 10, startPos = {
                    x: target.offsetLeft + chart.plotLeft + chart.plotWidth / 2 + r,
                    y: target.offsetTop + chart.plotTop + chart.plotHeight / 2 + r
                }, endPos = isY ? { x: startPos.x, y: startPos.y + diff } :
                    { x: startPos.x + diff, y: startPos.y };
                [
                    getFakeMouseEvent('mousedown', startPos),
                    getFakeMouseEvent('mousemove', endPos),
                    getFakeMouseEvent('mouseup', endPos)
                ].forEach((e) => target.dispatchEvent(e));
                return keyboardNavigationHandler.response.success;
            }
            /**
             * @private
             * @param {Highcharts.KeyboardNavigationHandler} keyboardNavigationHandler
             * @param {global.KeyboardEvent} event
             * @return {number} Response code
             */
            onMapKbdTab(keyboardNavigationHandler, event) {
                const chart = this.chart;
                const response = keyboardNavigationHandler.response;
                const isBackwards = event.shiftKey;
                const isMoveOutOfRange = isBackwards && !this.focusedMapNavButtonIx ||
                    !isBackwards && this.focusedMapNavButtonIx;
                // Deselect old
                chart.mapNavigation.navButtons[this.focusedMapNavButtonIx].setState(0);
                if (isMoveOutOfRange) {
                    if (chart.mapView) {
                        chart.mapView.zoomBy(); // Reset zoom
                    }
                    return response[isBackwards ? 'prev' : 'next'];
                }
                // Select other button
                this.focusedMapNavButtonIx += isBackwards ? -1 : 1;
                const button = chart.mapNavigation.navButtons[this.focusedMapNavButtonIx];
                chart.setFocusToElement(button.box, button.element);
                button.setState(2);
                return response.success;
            }
            /**
             * Called on map button click.
             * @private
             * @param {Highcharts.KeyboardNavigationHandler} keyboardNavigationHandler The handler context object
             * @return {number} Response code
             */
            onMapKbdClick(keyboardNavigationHandler) {
                const el = this.chart.mapNavigation.navButtons[this.focusedMapNavButtonIx].element;
                this.fakeClickEvent(el);
                return keyboardNavigationHandler.response.success;
            }
            /**
             * @private
             * @param {number} direction
             */
            onMapNavInit(direction) {
                const chart = this.chart, zoomIn = chart.mapNavigation.navButtons[0], zoomOut = chart.mapNavigation.navButtons[1], initialButton = direction > 0 ? zoomIn : zoomOut;
                chart.setFocusToElement(initialButton.box, initialButton.element);
                initialButton.setState(2);
                this.focusedMapNavButtonIx = direction > 0 ? 0 : 1;
            }
            /**
             * Get keyboard navigation handler for a simple chart button. Provide the
             * button reference for the chart, and a function to call on click.
             *
             * @private
             * @param {string} buttonProp The property on chart referencing the button.
             * @return {Highcharts.KeyboardNavigationHandler} The module object
             */
            simpleButtonNavigation(buttonProp, proxyProp, onClick) {
                const keys = this.keyCodes, component = this, chart = this.chart;
                return new KeyboardNavigationHandler(chart, {
                    keyCodeMap: [
                        [
                            [keys.tab, keys.up, keys.down, keys.left, keys.right],
                            function (keyCode, e) {
                                const isBackwards = (keyCode === keys.tab && e.shiftKey ||
                                    keyCode === keys.left ||
                                    keyCode === keys.up);
                                // Arrow/tab => just move
                                return this.response[isBackwards ? 'prev' : 'next'];
                            }
                        ],
                        [
                            [keys.space, keys.enter],
                            function () {
                                const res = onClick(this, chart);
                                return pick(res, this.response.success);
                            }
                        ]
                    ],
                    validate: function () {
                        const hasButton = (chart[buttonProp] &&
                            chart[buttonProp].box &&
                            component[proxyProp].innerElement);
                        return hasButton;
                    },
                    init: function () {
                        chart.setFocusToElement(chart[buttonProp].box, component[proxyProp].innerElement);
                    }
                });
            }
            /**
             * Get keyboard navigation handlers for this component.
             * @return {Array<Highcharts.KeyboardNavigationHandler>}
             *         List of module objects
             */
            getKeyboardNavigation() {
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
        }
        /* *
         *
         *  Default Export
         *
         * */

        return ZoomComponent;
    });
    _registerModule(_modules, 'Accessibility/HighContrastMode.js', [_modules['Core/Globals.js']], function (H) {
        /* *
         *
         *  (c) 2009-2024 Øystein Moseng
         *
         *  Handling for Windows High Contrast Mode.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { doc, isMS, win } = H;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Detect WHCM in the browser.
         *
         * @function Highcharts#isHighContrastModeActive
         * @private
         * @return {boolean} Returns true if the browser is in High Contrast mode.
         */
        function isHighContrastModeActive() {
            // Use media query on Edge, but not on IE
            const isEdge = /(Edg)/.test(win.navigator.userAgent);
            if (win.matchMedia && isEdge) {
                return win.matchMedia('(-ms-high-contrast: active)').matches;
            }
            // Test BG image for IE
            if (isMS && win.getComputedStyle) {
                const testDiv = doc.createElement('div');
                const imageSrc = 'data:image/gif;base64,' +
                    'R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
                testDiv.style.backgroundImage = `url(${imageSrc})`; // #13071
                doc.body.appendChild(testDiv);
                const bi = (testDiv.currentStyle ||
                    win.getComputedStyle(testDiv)).backgroundImage;
                doc.body.removeChild(testDiv);
                return bi === 'none';
            }
            // Other browsers use the forced-colors standard
            return win.matchMedia && win.matchMedia('(forced-colors: active)').matches;
        }
        /**
         * Force high contrast theme for the chart. The default theme is defined in
         * a separate file.
         *
         * @function Highcharts#setHighContrastTheme
         * @private
         * @param {Highcharts.AccessibilityChart} chart The chart to set the theme of.
         * @return {void}
         */
        function setHighContrastTheme(chart) {
            // We might want to add additional functionality here in the future for
            // storing the old state so that we can reset the theme if HC mode is
            // disabled. For now, the user will have to reload the page.
            chart.highContrastModeActive = true;
            // Apply theme to chart
            const theme = (chart.options.accessibility.highContrastTheme);
            chart.update(theme, false);
            const hasCustomColors = theme.colors?.length > 1;
            // Force series colors (plotOptions is not enough)
            chart.series.forEach(function (s) {
                const plotOpts = theme.plotOptions[s.type] || {};
                const fillColor = hasCustomColors && s.colorIndex !== void 0 ?
                    theme.colors[s.colorIndex] :
                    plotOpts.color || 'window';
                const seriesOptions = {
                    color: plotOpts.color || 'windowText',
                    colors: hasCustomColors ?
                        theme.colors : [plotOpts.color || 'windowText'],
                    borderColor: plotOpts.borderColor || 'window',
                    fillColor
                };
                s.update(seriesOptions, false);
                if (s.points) {
                    // Force point colors if existing
                    s.points.forEach(function (p) {
                        if (p.options && p.options.color) {
                            p.update({
                                color: plotOpts.color || 'windowText',
                                borderColor: plotOpts.borderColor || 'window'
                            }, false);
                        }
                    });
                }
            });
            // The redraw for each series and after is required for 3D pie
            // (workaround)
            chart.redraw();
        }
        /* *
         *
         *  Default Export
         *
         * */
        const whcm = {
            isHighContrastModeActive,
            setHighContrastTheme
        };

        return whcm;
    });
    _registerModule(_modules, 'Accessibility/HighContrastTheme.js', [], function () {
        /* *
         *
         *  (c) 2009-2024 Øystein Moseng
         *
         *  Default theme for Windows High Contrast Mode.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const theme = {
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
                stops: [],
                dataClasses: []
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
        /* *
         *
         *  Default Export
         *
         * */

        return theme;
    });
    _registerModule(_modules, 'Accessibility/Options/A11yDefaults.js', [], function () {
        /* *
         *
         *  (c) 2009-2024 Øystein Moseng
         *
         *  Default options for accessibility.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /* *
         *
         *  API Options
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
        const Options = {
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
                 * Enable accessibility functionality for the chart. For more
                 * information on how to include these features, and why this is
                 * recommended, see [Highcharts Accessibility](https://www.highcharts.com/docs/accessibility/accessibility-module).
                 *
                 * Highcharts will by default emit a warning to the console if
                 * the [accessibility module](https://code.highcharts.com/modules/accessibility.js)
                 * is not loaded. Setting this option to `false` will override
                 * and silence the warning.
                 *
                 * Once the module is loaded, setting this option to `false`
                 * will disable the module for this chart.
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
                     * Set to empty string to remove the region altogether.
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
                     * [dateFormat](/class-reference/Highcharts.Time#dateFormat).
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
                     * @see [series.descriptionFormat](#accessibility.series.descriptionFormat)
                     * @see [series.description](#plotOptions.series.description)
                     *
                     * @type      {Highcharts.ScreenReaderFormatterCallbackFunction<Highcharts.Series>}
                     * @since 8.0.0
                     * @apioption accessibility.series.descriptionFormatter
                     */
                    /**
                     * Format to use for describing the data series group to assistive
                     * technology - including screen readers.
                     *
                     * The series context and its subproperties are available under the
                     * variable `{series}`, for example `{series.name}` for the series
                     * name, and `{series.points.length}` for the number of data points.
                     *
                     * The chart context and its subproperties are available under the
                     * variable `{chart}`, for example `{chart.series.length}` for the
                     * number of series in the chart.
                     *
                     * `{seriesDescription}` refers to the automatic description of the
                     * series type and number of points added by Highcharts by default.
                     * `{authorDescription}` refers to the description added in
                     * [series.description](#plotOptions.series.description) if one is
                     * present. `{axisDescription}` refers to the description added if
                     * the chart has multiple X or Y axes.
                     *
                     * Note that if [series.descriptionFormatter](#accessibility.series.descriptionFormatter)
                     * is declared it will take precedence, and this option will be
                     * overridden.
                     *
                     * @sample highcharts/accessibility/advanced-accessible
                     *  Accessible low-medium-high chart
                     *
                     * @type      {string}
                     * @since 10.1.0
                     */
                    descriptionFormat: '{seriesDescription}{authorDescription}{axisDescription}',
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
                     * [dateFormat](/class-reference/Highcharts.Time#dateFormat).
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
                     * [dateFormat](/class-reference/Highcharts.Time#dateFormat).
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
                     * A [format string](https://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting)
                     * to use instead of the default for point descriptions.
                     *
                     * The context of the format string is the point instance.
                     *
                     * As opposed to [accessibility.point.valueDescriptionFormat](#accessibility.point.valueDescriptionFormat),
                     * this option replaces the whole description.
                     *
                     * @type      {string}
                     * @since 11.1.0
                     * @sample highcharts/demo/advanced-accessible
                     *      Description format
                     * @apioption accessibility.point.descriptionFormat
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
                     * Other available context variables include `{index}`, `{value}`, and `{xDescription}`.
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
                    valueDescriptionFormat: '{xDescription}{separator}{value}.',
                    /**
                     * Whether or not to describe points with the value `null` to
                     * assistive technology, such as screen readers.
                     *
                     * @sample {highmaps} maps/demo/all-areas-as-null
                     *         Accessible map with null points
                     *
                     * @type      {boolean}
                     * @since 10.1.0
                     */
                    describeNull: true
                },
                /**
                 * Amount of landmarks/regions to create for screen reader users. More
                 * landmarks can make navigation with screen readers easier, but can
                 * be distracting if there are lots of charts on the page. Three modes
                 * are available:
                 *  - `all`: Adds regions for all series, legend, information
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
                linkedDescription: '*[data-highcharts-chart="{index}"] + .highcharts-description', // eslint-disable-line
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
                 * contrast system colors is used.
                 *
                 * @type      {*}
                 * @since     7.1.3
                 * @apioption accessibility.highContrastTheme
                 */
                /**
                 * Controls how [highContrastTheme](#accessibility.highContrastTheme)
                 * is applied.
                 *
                 * The default option is `auto`, which applies the high contrast theme
                 * the user's system has a high contrast theme active.
                 *
                 * @since 11.4.0
                 */
                highContrastMode: 'auto',
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
                         * automatic borders cannot be styled by Highcharts.
                         *
                         * In styled mode, the border is given the
                         * `.highcharts-focus-border` class.
                         *
                         * @type    {Highcharts.CSSObject}
                         * @since   6.0.3
                         */
                        style: {
                            /** @internal */
                            color: "#334eff" /* Palette.highlightColor80 */,
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
                     * `rangeSelector`, `navigator`, `chartMenu`, `legend` and `container`.
                     * In addition, any custom components can be added here. Adding
                     * `container` first in order will make the keyboard focus stop on
                     * the chart container first, requiring the user to tab again to
                     * enter the chart.
                     *
                     * @type  {Array<string>}
                     * @since 7.1.0
                     */
                    order: [
                        'series', 'zoom', 'rangeSelector',
                        'navigator', 'legend', 'chartMenu'
                    ],
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
                        pointNavigationEnabledThreshold: false,
                        /**
                         * Remember which point was focused even after navigating away
                         * from the series, so that when navigating back to the series
                         * you start at the last focused point.
                         *
                         * @type  {boolean}
                         * @since 10.1.0
                         */
                        rememberPointFocus: false
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
             * Format to use for describing the data series group to assistive
             * technology - including screen readers.
             *
             * @see [series.descriptionFormat](#accessibility.series.descriptionFormat)
             * @type       {string}
             * @since 11.0.0
             * @apioption  plotOptions.series.accessibility.descriptionFormat
             */
            /**
             * Expose only the series element to screen readers, not its points.
             *
             * @type       {boolean}
             * @since      7.1.0
             * @apioption  plotOptions.series.accessibility.exposeAsGroupOnly
             */
            /**
             * Point accessibility options for a series.
             *
             * @extends    accessibility.point
             * @since 9.3.0
             * @requires   modules/accessibility
             * @apioption  plotOptions.series.accessibility.point
             */
            /**
             * Formatter function to use instead of the default for point
             * descriptions. Same as `accessibility.point.descriptionFormatter`, but
             * applies to a series instead of the whole chart.
             *
             * Note: Prefer using [accessibility.point.valueDescriptionFormat](#plotOptions.series.accessibility.point.valueDescriptionFormat)
             * instead if possible, as default functionality such as describing
             * annotations will be preserved.
             *
             * @see [accessibility.point.valueDescriptionFormat](#plotOptions.series.accessibility.point.valueDescriptionFormat)
             * @see [point.accessibility.description](#series.line.data.accessibility.description)
             * @see [accessibility.point.descriptionFormatter](#accessibility.point.descriptionFormatter)
             *
             * @type      {Highcharts.ScreenReaderFormatterCallbackFunction<Highcharts.Point>}
             * @since 9.3.0
             * @apioption plotOptions.series.accessibility.point.descriptionFormatter
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
            },
            /**
             * @optionparent navigator
             */
            navigator: {
                /**
                 * Accessibility options for the navigator. Requires the
                 * Accessibility module.
                 *
                 * @since 11.2.0
                 * @requires modules/accessibility
                 */
                accessibility: {
                    /**
                     * Enable accessibility support for the navigator.
                     *
                     * @since 11.2.0
                     */
                    enabled: true
                }
            }
        };

        return Options;
    });
    _registerModule(_modules, 'Accessibility/Options/LangDefaults.js', [], function () {
        /* *
         *
         *  (c) 2009-2024 Øystein Moseng
         *
         *  Default lang/i18n options for accessibility.
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /* *
         *
         *  API Options
         *
         * */
        const langOptions = {
            /**
             * Configure the accessibility strings in the chart. Requires the
             * [accessibility module](https://code.highcharts.com/modules/accessibility.js)
             * to be loaded. For a description of the module and information on its
             * features, see
             * [Highcharts Accessibility](https://www.highcharts.com/docs/chart-concepts/accessibility).
             *
             * The lang options use [Format Strings](https://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting#format-strings)
             * with variables that are replaced at run time. These variables should be
             * used when available, to avoid duplicating text that is defined elsewhere.
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
                /**
                 * @deprecated 10.2.1
                 * @type       {string}
                 * @apioption  lang.accessibility.resetZoomButton
                 */
                /**
                 * Default title of the chart for assistive technology, for charts
                 * without a chart title.
                 */
                defaultChartTitle: 'Chart',
                /**
                 * Accessible label for the chart container HTML element.
                 * `{title}` refers to the chart title.
                 */
                chartContainerLabel: '{title}. Highcharts interactive chart.',
                /**
                 * Accessible label for the chart SVG element.
                 * `{chartTitle}` refers to the chart title.
                 */
                svgContainerLabel: 'Interactive chart',
                /**
                 * Accessible label for the drill-up button.
                 * `{buttonText}` refers to the visual text on the button.
                 */
                drillUpButton: '{buttonText}',
                /**
                 * Accessible label for the chart credits.
                 * `{creditsStr}` refers to the visual text in the credits.
                 */
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
                    beforeRegionLabel: '',
                    afterRegionLabel: '',
                    /**
                     * Language options for annotation descriptions.
                     *
                     * @since 8.0.1
                     */
                    annotations: {
                        heading: 'Chart annotations summary',
                        descriptionSinglePoint: ('{annotationText}. Related to {annotationPoint}'),
                        descriptionMultiplePoints: ('{annotationText}. Related to {annotationPoint}' +
                            '{#each additionalAnnotationPoints}' +
                            ', also related to {this}' +
                            '{/each}'),
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
                    /**
                     * Accessible label for the legend, for charts where there is no
                     * legend title defined.
                     */
                    legendLabelNoTitle: 'Toggle series visibility, {chartTitle}',
                    /**
                     * Accessible label for the legend, for charts where there is a
                     * legend title defined. `{legendTitle}` refers to the visual text
                     * in the legend title.
                     */
                    legendLabel: 'Chart legend: {legendTitle}',
                    /**
                     * Accessible label for individual legend items. `{itemName}` refers
                     * to the visual text in the legend for that item.
                     */
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
                 * Navigator language options for accessibility.
                 *
                 * @since 11.2.0
                 */
                navigator: {
                    /**
                     * Label for the navigator handles.
                     *
                     * Receives `handleIx` and `chart` as context.
                     * `handleIx` refers to the index of the navigator handle.
                     */
                    handleLabel: '{#eq handleIx 0}Start, percent{else}End, percent{/eq}',
                    /**
                     * Label for the navigator region.
                     *
                     * Receives `chart` as context.
                     */
                    groupLabel: 'Axis zoom',
                    /**
                     * Announcement for assistive technology when navigator values
                     * are changed.
                     *
                     * Receives `axisRangeDescription` and `chart` as context.
                     * `axisRangeDescription` corresponds to the range description
                     * defined in [lang.accessibility.axis](#lang.accessibility.axis)
                     */
                    changeAnnouncement: '{axisRangeDescription}'
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
                    defaultSingle: 'Chart with {numPoints} data ' +
                        '{#eq numPoints 1}point{else}points{/eq}.',
                    defaultMultiple: 'Chart with {numSeries} data series.',
                    splineSingle: 'Line chart with {numPoints} data ' +
                        '{#eq numPoints 1}point{else}points{/eq}.',
                    splineMultiple: 'Line chart with {numSeries} lines.',
                    lineSingle: 'Line chart with {numPoints} data ' +
                        '{#eq numPoints 1}point{else}points{/eq}.',
                    lineMultiple: 'Line chart with {numSeries} lines.',
                    columnSingle: 'Bar chart with {numPoints} ' +
                        '{#eq numPoints 1}bar{else}bars{/eq}.',
                    columnMultiple: 'Bar chart with {numSeries} data series.',
                    barSingle: 'Bar chart with {numPoints} ' +
                        '{#eq numPoints 1}bar{else}bars{/eq}.',
                    barMultiple: 'Bar chart with {numSeries} data series.',
                    pieSingle: 'Pie chart with {numPoints} ' +
                        '{#eq numPoints 1}slice{else}slices{/eq}.',
                    pieMultiple: 'Pie chart with {numSeries} pies.',
                    scatterSingle: 'Scatter chart with {numPoints} ' +
                        '{#eq numPoints 1}point{else}points{/eq}.',
                    scatterMultiple: 'Scatter chart with {numSeries} data series.',
                    boxplotSingle: 'Boxplot with {numPoints} ' +
                        '{#eq numPoints 1}box{else}boxes{/eq}.',
                    boxplotMultiple: 'Boxplot with {numSeries} data series.',
                    bubbleSingle: 'Bubble chart with {numPoints} ' +
                        '{#eq numPoints 1}bubbles{else}bubble{/eq}.',
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
                    xAxisDescriptionPlural: 'The chart has {numAxes} X axes displaying {#each names}{#unless @first},{/unless}{#if @last} and{/if} {this}{/each}.',
                    yAxisDescriptionSingular: 'The chart has 1 Y axis displaying {names[0]}. {ranges[0]}',
                    yAxisDescriptionPlural: 'The chart has {numAxes} Y axes displaying {#each names}{#unless @first},{/unless}{#if @last} and{/if} {this}{/each}.',
                    timeRangeDays: 'Data range: {range} days.',
                    timeRangeHours: 'Data range: {range} hours.',
                    timeRangeMinutes: 'Data range: {range} minutes.',
                    timeRangeSeconds: 'Data range: {range} seconds.',
                    rangeFromTo: 'Data ranges from {rangeFrom} to {rangeTo}.',
                    rangeCategories: 'Data range: {numCategories} categories.'
                }, /* eslint-enable max-len */
                /**
                 * Exporting menu format strings for accessibility module.
                 *
                 * @since 6.0.6
                 */
                exporting: {
                    chartMenuLabel: 'Chart menu',
                    menuButtonLabel: 'View chart menu, {chartTitle}'
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
                     * Chart and its subproperties can be accessed with the `{chart}` variable.
                     * The series and its subproperties can be accessed with the `{series}` variable.
                     *
                     * The series index (starting from 1) can be accessed with the `{seriesNumber}` variable.
                     *
                     * @since 6.0.6
                     */
                    summary: {
                        /* eslint-disable max-len */
                        'default': '{series.name}, series {seriesNumber} of {chart.series.length} with {series.points.length} data {#eq series.points.length 1}point{else}points{/eq}.',
                        defaultCombination: '{series.name}, series {seriesNumber} of {chart.series.length} with {series.points.length} data {#eq series.points.length 1}point{else}points{/eq}.',
                        line: '{series.name}, line {seriesNumber} of {chart.series.length} with {series.points.length} data {#eq series.points.length 1}point{else}points{/eq}.',
                        lineCombination: '{series.name}, series {seriesNumber} of {chart.series.length}. Line with {series.points.length} data {#eq series.points.length 1}point{else}points{/eq}.',
                        spline: '{series.name}, line {seriesNumber} of {chart.series.length} with {series.points.length} data {#eq series.points.length 1}point{else}points{/eq}.',
                        splineCombination: '{series.name}, series {seriesNumber} of {chart.series.length}. Line with {series.points.length} data {#eq series.points.length 1}point{else}points{/eq}.',
                        column: '{series.name}, bar series {seriesNumber} of {chart.series.length} with {series.points.length} {#eq series.points.length 1}bar{else}bars{/eq}.',
                        columnCombination: '{series.name}, series {seriesNumber} of {chart.series.length}. Bar series with {series.points.length} {#eq series.points.length 1}bar{else}bars{/eq}.',
                        bar: '{series.name}, bar series {seriesNumber} of {chart.series.length} with {series.points.length} {#eq series.points.length 1}bar{else}bars{/eq}.',
                        barCombination: '{series.name}, series {seriesNumber} of {chart.series.length}. Bar series with {series.points.length} {#eq series.points.length 1}bar{else}bars{/eq}.',
                        pie: '{series.name}, pie {seriesNumber} of {chart.series.length} with {series.points.length} {#eq series.points.length 1}slice{else}slices{/eq}.',
                        pieCombination: '{series.name}, series {seriesNumber} of {chart.series.length}. Pie with {series.points.length} {#eq series.points.length 1}slice{else}slices{/eq}.',
                        scatter: '{series.name}, scatter plot {seriesNumber} of {chart.series.length} with {series.points.length} {#eq series.points.length 1}point{else}points{/eq}.',
                        scatterCombination: '{series.name}, series {seriesNumber} of {chart.series.length}, scatter plot with {series.points.length} {#eq series.points.length 1}point{else}points{/eq}.',
                        boxplot: '{series.name}, boxplot {seriesNumber} of {chart.series.length} with {series.points.length} {#eq series.points.length 1}box{else}boxes{/eq}.',
                        boxplotCombination: '{series.name}, series {seriesNumber} of {chart.series.length}. Boxplot with {series.points.length} {#eq series.points.length 1}box{else}boxes{/eq}.',
                        bubble: '{series.name}, bubble series {seriesNumber} of {chart.series.length} with {series.points.length} {#eq series.points.length 1}bubble{else}bubbles{/eq}.',
                        bubbleCombination: '{series.name}, series {seriesNumber} of {chart.series.length}. Bubble series with {series.points.length} {#eq series.points.length 1}bubble{else}bubbles{/eq}.',
                        map: '{series.name}, map {seriesNumber} of {chart.series.length} with {series.points.length} {#eq series.points.length 1}area{else}areas{/eq}.',
                        mapCombination: '{series.name}, series {seriesNumber} of {chart.series.length}. Map with {series.points.length} {#eq series.points.length 1}area{else}areas{/eq}.',
                        mapline: '{series.name}, line {seriesNumber} of {chart.series.length} with {series.points.length} data {#eq series.points.length 1}point{else}points{/eq}.',
                        maplineCombination: '{series.name}, series {seriesNumber} of {chart.series.length}. Line with {series.points.length} data {#eq series.points.length 1}point{else}points{/eq}.',
                        mapbubble: '{series.name}, bubble series {seriesNumber} of {chart.series.length} with {series.points.length} {#eq series.points.length 1}bubble{else}bubbles{/eq}.',
                        mapbubbleCombination: '{series.name}, series {seriesNumber} of {chart.series.length}. Bubble series with {series.points.length} {#eq series.points.length 1}bubble{else}bubbles{/eq}.'
                    }, /* eslint-enable max-len */
                    /**
                     * User supplied description text. This is added in the point
                     * comment description by default if present.
                     *
                     * `{description}` refers to the value given in
                     * [point.accessibility.description](#series.line.data.accessibility.description).
                     *
                     * @since 6.0.6
                     */
                    description: '{description}',
                    /**
                     * X-axis description for series if there are multiple xAxes in
                     * the chart.
                     *
                     * @since 6.0.6
                     */
                    xAxisDescription: 'X axis, {name}',
                    /**
                     * Y-axis description for series if there are multiple yAxes in
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
                    pointAnnotationsDescription: '{#each annotations}' +
                        'Annotation: {this}{/each}'
                }
            }
        };
        /* *
         *
         *  Default Export
         *
         * */

        return langOptions;
    });
    _registerModule(_modules, 'Accessibility/Options/DeprecatedOptions.js', [_modules['Core/Utilities.js']], function (U) {
        /* *
         *
         *  (c) 2009-2024 Øystein Moseng
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
         *  series.accessibility.pointDescriptionFormatter ->
         *      series.accessibility.point.descriptionFormatter
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
        const { error, pick } = U;
        /* *
         *
         *  Functions
         *
         * */
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
            let opt = root, prop, i = 0;
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
            const rootOld = getChildProp(chart.options, rootOldAsArray), rootNew = getChildProp(chart.options, rootNewAsArray);
            Object.keys(mapToNewOptions).forEach(function (oldOptionKey) {
                const val = rootOld[oldOptionKey];
                if (typeof val !== 'undefined') {
                    traverseSetOption(rootNew, mapToNewOptions[oldOptionKey], val);
                    error(32, false, chart, {
                        [rootOldAsArray.join('.') + '.' + oldOptionKey]: (rootNewAsArray.join('.') + '.' +
                            mapToNewOptions[oldOptionKey].join('.'))
                    });
                }
            });
        }
        /**
         * @private
         */
        function copyDeprecatedChartOptions(chart) {
            const chartOptions = chart.options.chart, a11yOptions = chart.options.accessibility || {};
            ['description', 'typeDescription'].forEach(function (prop) {
                if (chartOptions[prop]) {
                    a11yOptions[prop] = chartOptions[prop];
                    error(32, false, chart, { [`chart.${prop}`]: `use accessibility.${prop}` });
                }
            });
        }
        /**
         * @private
         */
        function copyDeprecatedAxisOptions(chart) {
            chart.axes.forEach(function (axis) {
                const opts = axis.options;
                if (opts && opts.description) {
                    opts.accessibility = opts.accessibility || {};
                    opts.accessibility.description = opts.description;
                    error(32, false, chart, {
                        'axis.description': 'use axis.accessibility.description'
                    });
                }
            });
        }
        /**
         * @private
         */
        function copyDeprecatedSeriesOptions(chart) {
            // Map of deprecated series options. New options are defined as
            // arrays of paths under series.options.
            const oldToNewSeriesOptions = {
                description: ['accessibility', 'description'],
                exposeElementToA11y: ['accessibility', 'exposeAsGroupOnly'],
                pointDescriptionFormatter: [
                    'accessibility', 'point', 'descriptionFormatter'
                ],
                skipKeyboardNavigation: [
                    'accessibility', 'keyboardNavigation', 'enabled'
                ],
                'accessibility.pointDescriptionFormatter': [
                    'accessibility', 'point', 'descriptionFormatter'
                ]
            };
            chart.series.forEach(function (series) {
                // Handle series wide options
                Object.keys(oldToNewSeriesOptions).forEach(function (oldOption) {
                    let optionVal = series.options[oldOption];
                    // Special case
                    if (oldOption === 'accessibility.pointDescriptionFormatter') {
                        optionVal = (series.options.accessibility &&
                            series.options.accessibility
                                .pointDescriptionFormatter);
                    }
                    if (typeof optionVal !== 'undefined') {
                        // Set the new option
                        traverseSetOption(series.options, oldToNewSeriesOptions[oldOption], 
                        // Note that skipKeyboardNavigation has inverted option
                        // value, since we set enabled rather than disabled
                        oldOption === 'skipKeyboardNavigation' ?
                            !optionVal : optionVal);
                        error(32, false, chart, {
                            [`series.${oldOption}`]: ('series.' +
                                oldToNewSeriesOptions[oldOption].join('.'))
                        });
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
                pointDescriptionThreshold: [
                    'series',
                    'pointDescriptionEnabledThreshold'
                ],
                pointNavigationThreshold: [
                    'keyboardNavigation', 'seriesNavigation',
                    'pointNavigationEnabledThreshold'
                ],
                pointValueDecimals: ['point', 'valueDecimals'],
                pointValuePrefix: ['point', 'valuePrefix'],
                pointValueSuffix: ['point', 'valueSuffix'],
                screenReaderSectionFormatter: [
                    'screenReaderSection',
                    'beforeChartFormatter'
                ],
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
                screenReaderRegionLabel: [
                    'screenReaderSection',
                    'beforeRegionLabel'
                ],
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
        /* *
         *
         *  Default Export
         *
         * */

        return copyDeprecatedOptions;
    });
    _registerModule(_modules, 'Accessibility/Accessibility.js', [_modules['Core/Defaults.js'], _modules['Core/Globals.js'], _modules['Core/Utilities.js'], _modules['Accessibility/Utils/HTMLUtilities.js'], _modules['Accessibility/A11yI18n.js'], _modules['Accessibility/Components/ContainerComponent.js'], _modules['Accessibility/FocusBorder.js'], _modules['Accessibility/Components/InfoRegionsComponent.js'], _modules['Accessibility/KeyboardNavigation.js'], _modules['Accessibility/Components/LegendComponent.js'], _modules['Accessibility/Components/MenuComponent.js'], _modules['Accessibility/Components/NavigatorComponent.js'], _modules['Accessibility/Components/SeriesComponent/NewDataAnnouncer.js'], _modules['Accessibility/ProxyProvider.js'], _modules['Accessibility/Components/RangeSelectorComponent.js'], _modules['Accessibility/Components/SeriesComponent/SeriesComponent.js'], _modules['Accessibility/Components/ZoomComponent.js'], _modules['Accessibility/HighContrastMode.js'], _modules['Accessibility/HighContrastTheme.js'], _modules['Accessibility/Options/A11yDefaults.js'], _modules['Accessibility/Options/LangDefaults.js'], _modules['Accessibility/Options/DeprecatedOptions.js']], function (D, H, U, HU, A11yI18n, ContainerComponent, FocusBorderComposition, InfoRegionsComponent, KeyboardNavigation, LegendComponent, MenuComponent, NavigatorComponent, NewDataAnnouncer, ProxyProvider, RangeSelectorComponent, SeriesComponent, ZoomComponent, whcm, highContrastTheme, defaultOptionsA11Y, defaultLangOptions, copyDeprecatedOptions) {
        /* *
         *
         *  (c) 2009-2024 Øystein Moseng
         *
         *  Accessibility module for Highcharts
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { defaultOptions } = D;
        const { doc } = H;
        const { addEvent, extend, fireEvent, merge } = U;
        const { removeElement } = HU;
        /* *
         *
         *  Class
         *
         * */
        /**
         * The Accessibility class
         *
         * @private
         * @requires modules/accessibility
         *
         * @class
         * @name Highcharts.Accessibility
         *
         * @param {Highcharts.Chart} chart
         * Chart object
         */
        class Accessibility {
            /* *
             *
             *  Constructor
             *
             * */
            constructor(chart) {
                this.init(chart);
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Initialize the accessibility class
             * @private
             * @param {Highcharts.Chart} chart
             *        Chart object
             */
            init(chart) {
                this.chart = chart;
                // Abort on old browsers
                if (!doc.addEventListener) {
                    this.zombie = true;
                    this.components = {};
                    chart.renderTo.setAttribute('aria-hidden', true);
                    return;
                }
                // Copy over any deprecated options that are used. We could do this on
                // every update, but it is probably not needed.
                copyDeprecatedOptions(chart);
                this.proxyProvider = new ProxyProvider(this.chart);
                this.initComponents();
                this.keyboardNavigation = new KeyboardNavigation(chart, this.components);
            }
            /**
             * @private
             */
            initComponents() {
                const chart = this.chart;
                const proxyProvider = this.proxyProvider;
                const a11yOptions = chart.options.accessibility;
                this.components = {
                    container: new ContainerComponent(),
                    infoRegions: new InfoRegionsComponent(),
                    legend: new LegendComponent(),
                    chartMenu: new MenuComponent(),
                    rangeSelector: new RangeSelectorComponent(),
                    series: new SeriesComponent(),
                    zoom: new ZoomComponent(),
                    navigator: new NavigatorComponent()
                };
                if (a11yOptions.customComponents) {
                    extend(this.components, a11yOptions.customComponents);
                }
                const components = this.components;
                this.getComponentOrder().forEach(function (componentName) {
                    components[componentName].initBase(chart, proxyProvider);
                    components[componentName].init();
                });
            }
            /**
             * Get order to update components in.
             * @private
             */
            getComponentOrder() {
                if (!this.components) {
                    return []; // For zombie accessibility object on old browsers
                }
                if (!this.components.series) {
                    return Object.keys(this.components);
                }
                const componentsExceptSeries = Object.keys(this.components)
                    .filter((c) => c !== 'series');
                // Update series first, so that other components can read accessibility
                // info on points.
                return ['series'].concat(componentsExceptSeries);
            }
            /**
             * Update all components.
             */
            update() {
                const components = this.components, chart = this.chart, a11yOptions = chart.options.accessibility;
                fireEvent(chart, 'beforeA11yUpdate');
                // Update the chart type list as this is used by multiple modules
                chart.types = this.getChartTypes();
                // Update proxies. We don't update proxy positions since most likely we
                // need to recreate the proxies on update.
                const kbdNavOrder = a11yOptions.keyboardNavigation.order;
                this.proxyProvider.updateGroupOrder(kbdNavOrder);
                // Update markup
                this.getComponentOrder().forEach(function (componentName) {
                    components[componentName].onChartUpdate();
                    fireEvent(chart, 'afterA11yComponentUpdate', {
                        name: componentName,
                        component: components[componentName]
                    });
                });
                // Update keyboard navigation
                this.keyboardNavigation.update(kbdNavOrder);
                // Handle high contrast mode
                // Should only be applied once, and not if explicitly disabled
                if (!chart.highContrastModeActive &&
                    a11yOptions.highContrastMode !== false && (whcm.isHighContrastModeActive() ||
                    a11yOptions.highContrastMode === true)) {
                    whcm.setHighContrastTheme(chart);
                }
                fireEvent(chart, 'afterA11yUpdate', {
                    accessibility: this
                });
            }
            /**
             * Destroy all elements.
             */
            destroy() {
                const chart = this.chart || {};
                // Destroy components
                const components = this.components;
                Object.keys(components).forEach(function (componentName) {
                    components[componentName].destroy();
                    components[componentName].destroyBase();
                });
                // Destroy proxy provider
                if (this.proxyProvider) {
                    this.proxyProvider.destroy();
                }
                // Remove announcer container
                if (chart.announcerContainer) {
                    removeElement(chart.announcerContainer);
                }
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
            }
            /**
             * Return a list of the types of series we have in the chart.
             * @private
             */
            getChartTypes() {
                const types = {};
                this.chart.series.forEach(function (series) {
                    types[series.type] = 1;
                });
                return Object.keys(types);
            }
        }
        /* *
         *
         *  Class Namespace
         *
         * */
        (function (Accessibility) {
            /* *
             *
             *  Declarations
             *
             * */
            /* *
             *
             *  Constants
             *
             * */
            Accessibility.i18nFormat = A11yI18n.i18nFormat;
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Destroy with chart.
             * @private
             */
            function chartOnDestroy() {
                if (this.accessibility) {
                    this.accessibility.destroy();
                }
            }
            /**
             * Handle updates to the module and send render updates to components.
             * @private
             */
            function chartOnRender() {
                // Update/destroy
                if (this.a11yDirty && this.renderTo) {
                    delete this.a11yDirty;
                    this.updateA11yEnabled();
                }
                const a11y = this.accessibility;
                if (a11y && !a11y.zombie) {
                    a11y.proxyProvider.updateProxyElementPositions();
                    a11y.getComponentOrder().forEach(function (componentName) {
                        a11y.components[componentName].onChartRender();
                    });
                }
            }
            /**
             * Update with chart/series/point updates.
             * @private
             */
            function chartOnUpdate(e) {
                // Merge new options
                const newOptions = e.options.accessibility;
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
            }
            /**
             * @private
             */
            function chartUpdateA11yEnabled() {
                let a11y = this.accessibility;
                const accessibilityOptions = this.options.accessibility;
                if (accessibilityOptions && accessibilityOptions.enabled) {
                    if (a11y && !a11y.zombie) {
                        a11y.update();
                    }
                    else {
                        this.accessibility = a11y = new Accessibility(this);
                        if (a11y && !a11y.zombie) {
                            a11y.update();
                        }
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
            }
            /**
             * @private
             */
            function compose(ChartClass, LegendClass, PointClass, SeriesClass, SVGElementClass, RangeSelectorClass) {
                // Ordered:
                KeyboardNavigation.compose(ChartClass);
                NewDataAnnouncer.compose(SeriesClass);
                LegendComponent.compose(ChartClass, LegendClass);
                MenuComponent.compose(ChartClass);
                SeriesComponent.compose(ChartClass, PointClass, SeriesClass);
                A11yI18n.compose(ChartClass);
                FocusBorderComposition.compose(ChartClass, SVGElementClass);
                // RangeSelector
                if (RangeSelectorClass) {
                    RangeSelectorComponent.compose(ChartClass, RangeSelectorClass);
                }
                const chartProto = ChartClass.prototype;
                if (!chartProto.updateA11yEnabled) {
                    chartProto.updateA11yEnabled = chartUpdateA11yEnabled;
                    addEvent(ChartClass, 'destroy', chartOnDestroy);
                    addEvent(ChartClass, 'render', chartOnRender);
                    addEvent(ChartClass, 'update', chartOnUpdate);
                    // Mark dirty for update
                    ['addSeries', 'init'].forEach((event) => {
                        addEvent(ChartClass, event, function () {
                            this.a11yDirty = true;
                        });
                    });
                    // Direct updates (events happen after render)
                    ['afterApplyDrilldown', 'drillupall'].forEach((event) => {
                        addEvent(ChartClass, event, function chartOnAfterDrilldown() {
                            const a11y = this.accessibility;
                            if (a11y && !a11y.zombie) {
                                a11y.update();
                            }
                        });
                    });
                    addEvent(PointClass, 'update', pointOnUpdate);
                    // Mark dirty for update
                    ['update', 'updatedData', 'remove'].forEach((event) => {
                        addEvent(SeriesClass, event, function () {
                            if (this.chart.accessibility) {
                                this.chart.a11yDirty = true;
                            }
                        });
                    });
                }
            }
            Accessibility.compose = compose;
            /**
             * Mark dirty for update.
             * @private
             */
            function pointOnUpdate() {
                if (this.series.chart.accessibility) {
                    this.series.chart.a11yDirty = true;
                }
            }
        })(Accessibility || (Accessibility = {}));
        /* *
         *
         *  Registry
         *
         * */
        // Add default options
        merge(true, defaultOptions, defaultOptionsA11Y, {
            accessibility: {
                highContrastTheme: highContrastTheme
            },
            lang: defaultLangOptions
        });
        /* *
         *
         *  Default Export
         *
         * */

        return Accessibility;
    });
    _registerModule(_modules, 'masters/modules/accessibility.src.js', [_modules['Core/Globals.js'], _modules['Accessibility/Accessibility.js'], _modules['Accessibility/AccessibilityComponent.js'], _modules['Accessibility/Utils/ChartUtilities.js'], _modules['Accessibility/Utils/HTMLUtilities.js'], _modules['Accessibility/KeyboardNavigationHandler.js'], _modules['Accessibility/Components/SeriesComponent/SeriesDescriber.js']], function (Highcharts, Accessibility, AccessibilityComponent, ChartUtilities, HTMLUtilities, KeyboardNavigationHandler, SeriesDescriber) {

        const G = Highcharts;
        // Classes
        G.i18nFormat = Accessibility.i18nFormat;
        G.A11yChartUtilities = ChartUtilities;
        G.A11yHTMLUtilities = HTMLUtilities;
        G.AccessibilityComponent = AccessibilityComponent;
        G.KeyboardNavigationHandler = KeyboardNavigationHandler;
        G.SeriesAccessibilityDescriber = SeriesDescriber;
        // Compositions
        Accessibility.compose(G.Chart, G.Legend, G.Point, G.Series, G.SVGElement, G.RangeSelector);

        return Highcharts;
    });
}));
