/**
 * @license Highcharts Dashboards v (2023-10-30)
 *
 * (c) 2009-2023 Highsoft AS
 *
 * License: www.highcharts.com/license
 */
(function (root, factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = root.document ?
            factory(root) :
            factory;
    } else if (typeof define === 'function' && define.amd) {
        define('dashboards/dashboards', function () {
            return factory(root);
        });
    } else {
        if (root.Dashboards) {
            root.Dashboards.error(16, true);
        }
        root.Dashboards = factory(root);
    }
}(typeof window !== 'undefined' ? window : this, function (window) {
    'use strict';
    var _modules = {};
    function _registerModule(obj, path, args, fn) {
        if (!obj.hasOwnProperty(path)) {
            obj[path] = fn.apply(null, args);

            if (typeof CustomEvent === 'function') {
                window.dispatchEvent(new CustomEvent(
                    'DashboardsModuleLoaded',
                    { detail: { path: path, module: obj[path] } }
                ));
            }
        }
    }
    _registerModule(_modules, 'Core/Globals.js', [], function () {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /* *
         *
         *  Namespace
         *
         * */
        /**
         * Shared Highcharts properties.
         * @private
         */
        var Globals;
        (function (Globals) {
            /* *
             *
             *  Constants
             *
             * */
            Globals.SVG_NS = 'http://www.w3.org/2000/svg', Globals.product = 'Highcharts', Globals.version = '', Globals.win = (typeof window !== 'undefined' ?
                window :
                {}), // eslint-disable-line node/no-unsupported-features/es-builtins
            Globals.doc = Globals.win.document, Globals.svg = (Globals.doc &&
                Globals.doc.createElementNS &&
                !!Globals.doc.createElementNS(Globals.SVG_NS, 'svg').createSVGRect), Globals.userAgent = (Globals.win.navigator && Globals.win.navigator.userAgent) || '', Globals.isChrome = Globals.userAgent.indexOf('Chrome') !== -1, Globals.isFirefox = Globals.userAgent.indexOf('Firefox') !== -1, Globals.isMS = /(edge|msie|trident)/i.test(Globals.userAgent) && !Globals.win.opera, Globals.isSafari = !Globals.isChrome && Globals.userAgent.indexOf('Safari') !== -1, Globals.isTouchDevice = /(Mobile|Android|Windows Phone)/.test(Globals.userAgent), Globals.isWebKit = Globals.userAgent.indexOf('AppleWebKit') !== -1, Globals.deg2rad = Math.PI * 2 / 360, Globals.hasBidiBug = (Globals.isFirefox &&
                parseInt(Globals.userAgent.split('Firefox/')[1], 10) < 4 // issue #38
            ), Globals.hasTouch = !!Globals.win.TouchEvent, Globals.marginNames = [
                'plotTop',
                'marginRight',
                'marginBottom',
                'plotLeft'
            ], Globals.noop = function () { }, Globals.supportsPassiveEvents = (function () {
                // Checks whether the browser supports passive events, (#11353).
                let supportsPassive = false;
                // Object.defineProperty doesn't work on IE as well as passive
                // events - instead of using polyfill, we can exclude IE totally.
                if (!Globals.isMS) {
                    const opts = Object.defineProperty({}, 'passive', {
                        get: function () {
                            supportsPassive = true;
                        }
                    });
                    if (Globals.win.addEventListener && Globals.win.removeEventListener) {
                        Globals.win.addEventListener('testPassive', Globals.noop, opts);
                        Globals.win.removeEventListener('testPassive', Globals.noop, opts);
                    }
                }
                return supportsPassive;
            }());
            /**
             * An array containing the current chart objects in the page. A chart's
             * position in the array is preserved throughout the page's lifetime. When
             * a chart is destroyed, the array item becomes `undefined`.
             *
             * @name Highcharts.charts
             * @type {Array<Highcharts.Chart|undefined>}
             */
            Globals.charts = [];
            /**
             * A hook for defining additional date format specifiers. New
             * specifiers are defined as key-value pairs by using the
             * specifier as key, and a function which takes the timestamp as
             * value. This function returns the formatted portion of the
             * date.
             *
             * @sample highcharts/global/dateformats/
             *         Adding support for week number
             *
             * @name Highcharts.dateFormats
             * @type {Record<string, Highcharts.TimeFormatCallbackFunction>}
             */
            Globals.dateFormats = {};
            /**
             * @private
             * @deprecated
             * @todo Use only `Core/Series/SeriesRegistry.seriesTypes`
             */
            Globals.seriesTypes = {};
            /**
             * @private
             */
            Globals.symbolSizes = {};
            /* *
             *
             *  Properties
             *
             * */
            // eslint-disable-next-line prefer-const
            Globals.chartCount = 0;
        })(Globals || (Globals = {}));
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
         * Theme options that should get applied to the chart. In module mode it
         * might not be possible to change this property because of read-only
         * restrictions, instead use {@link Highcharts.setOptions}.
         *
         * @deprecated
         * @name Highcharts.theme
         * @type {Highcharts.Options}
         */
        (''); // keeps doclets above in JS file

        return Globals;
    });
    _registerModule(_modules, 'Core/Utilities.js', [_modules['Core/Globals.js']], function (H) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { charts, doc, win } = H;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Provide error messages for debugging, with links to online explanation. This
         * function can be overridden to provide custom error handling.
         *
         * @sample highcharts/chart/highcharts-error/
         *         Custom error handler
         *
         * @function Highcharts.error
         *
         * @param {number|string} code
         *        The error code. See
         *        [errors.xml](https://github.com/highcharts/highcharts/blob/master/errors/errors.xml)
         *        for available codes. If it is a string, the error message is printed
         *        directly in the console.
         *
         * @param {boolean} [stop=false]
         *        Whether to throw an error or just log a warning in the console.
         *
         * @param {Highcharts.Chart} [chart]
         *        Reference to the chart that causes the error. Used in 'debugger'
         *        module to display errors directly on the chart.
         *        Important note: This argument is undefined for errors that lack
         *        access to the Chart instance. In such case, the error will be
         *        displayed on the last created chart.
         *
         * @param {Highcharts.Dictionary<string>} [params]
         *        Additional parameters for the generated message.
         *
         * @return {void}
         */
        function error(code, stop, chart, params) {
            const severity = stop ? 'Highcharts error' : 'Highcharts warning';
            if (code === 32) {
                code = `${severity}: Deprecated member`;
            }
            const isCode = isNumber(code);
            let message = isCode ?
                `${severity} #${code}: www.highcharts.com/errors/${code}/` :
                code.toString();
            const defaultHandler = function () {
                if (stop) {
                    throw new Error(message);
                }
                // else ...
                if (win.console &&
                    error.messages.indexOf(message) === -1 // prevent console flooting
                ) {
                    console.warn(message); // eslint-disable-line no-console
                }
            };
            if (typeof params !== 'undefined') {
                let additionalMessages = '';
                if (isCode) {
                    message += '?';
                }
                objectEach(params, function (value, key) {
                    additionalMessages += `\n - ${key}: ${value}`;
                    if (isCode) {
                        message += encodeURI(key) + '=' + encodeURI(value);
                    }
                });
                message += additionalMessages;
            }
            fireEvent(H, 'displayError', { chart, code, message, params }, defaultHandler);
            error.messages.push(message);
        }
        (function (error) {
            error.messages = [];
        })(error || (error = {}));
        /* eslint-disable valid-jsdoc */
        /**
         * Utility function to deep merge two or more objects and return a third object.
         * If the first argument is true, the contents of the second object is copied
         * into the first object. The merge function can also be used with a single
         * object argument to create a deep copy of an object.
         *
         * @function Highcharts.merge<T>
         *
         * @param {boolean} extend
         *        Whether to extend the left-side object (a) or return a whole new
         *        object.
         *
         * @param {T|undefined} a
         *        The first object to extend. When only this is given, the function
         *        returns a deep copy.
         *
         * @param {...Array<object|undefined>} [n]
         *        An object to merge into the previous one.
         *
         * @return {T}
         *         The merged object. If the first argument is true, the return is the
         *         same as the second argument.
         */ /**
        * Utility function to deep merge two or more objects and return a third object.
        * The merge function can also be used with a single object argument to create a
        * deep copy of an object.
        *
        * @function Highcharts.merge<T>
        *
        * @param {T|undefined} a
        *        The first object to extend. When only this is given, the function
        *        returns a deep copy.
        *
        * @param {...Array<object|undefined>} [n]
        *        An object to merge into the previous one.
        *
        * @return {T}
        *         The merged object. If the first argument is true, the return is the
        *         same as the second argument.
        */
        function merge() {
            /* eslint-enable valid-jsdoc */
            let i, args = arguments, ret = {};
            const doCopy = function (copy, original) {
                // An object is replacing a primitive
                if (typeof copy !== 'object') {
                    copy = {};
                }
                objectEach(original, function (value, key) {
                    // Prototype pollution (#14883)
                    if (key === '__proto__' || key === 'constructor') {
                        return;
                    }
                    // Copy the contents of objects, but not arrays or DOM nodes
                    if (isObject(value, true) &&
                        !isClass(value) &&
                        !isDOMElement(value)) {
                        copy[key] = doCopy(copy[key] || {}, value);
                        // Primitives and arrays are copied over directly
                    }
                    else {
                        copy[key] = original[key];
                    }
                });
                return copy;
            };
            // If first argument is true, copy into the existing object. Used in
            // setOptions.
            if (args[0] === true) {
                ret = args[1];
                args = Array.prototype.slice.call(args, 2);
            }
            // For each argument, extend the return
            const len = args.length;
            for (i = 0; i < len; i++) {
                ret = doCopy(ret, args[i]);
            }
            return ret;
        }
        /**
         * Constrain a value to within a lower and upper threshold.
         *
         * @private
         * @param {number} value The initial value
         * @param {number} min The lower threshold
         * @param {number} max The upper threshold
         * @return {number} Returns a number value within min and max.
         */
        function clamp(value, min, max) {
            return value > min ? value < max ? value : max : min;
        }
        // eslint-disable-next-line valid-jsdoc
        /**
         * Return the deep difference between two objects. It can either return the new
         * properties, or optionally return the old values of new properties.
         * @private
         */
        function diffObjects(newer, older, keepOlder, collectionsWithUpdate) {
            const ret = {};
            /**
             * Recurse over a set of options and its current values, and store the
             * current values in the ret object.
             */
            function diff(newer, older, ret, depth) {
                const keeper = keepOlder ? older : newer;
                objectEach(newer, function (newerVal, key) {
                    if (!depth &&
                        collectionsWithUpdate &&
                        collectionsWithUpdate.indexOf(key) > -1 &&
                        older[key]) {
                        newerVal = splat(newerVal);
                        ret[key] = [];
                        // Iterate over collections like series, xAxis or yAxis and map
                        // the items by index.
                        for (let i = 0; i < Math.max(newerVal.length, older[key].length); i++) {
                            // Item exists in current data (#6347)
                            if (older[key][i]) {
                                // If the item is missing from the new data, we need to
                                // save the whole config structure. Like when
                                // responsively updating from a dual axis layout to a
                                // single axis and back (#13544).
                                if (newerVal[i] === void 0) {
                                    ret[key][i] = older[key][i];
                                    // Otherwise, proceed
                                }
                                else {
                                    ret[key][i] = {};
                                    diff(newerVal[i], older[key][i], ret[key][i], depth + 1);
                                }
                            }
                        }
                    }
                    else if (isObject(newerVal, true) &&
                        !newerVal.nodeType // #10044
                    ) {
                        ret[key] = isArray(newerVal) ? [] : {};
                        diff(newerVal, older[key] || {}, ret[key], depth + 1);
                        // Delete empty nested objects
                        if (Object.keys(ret[key]).length === 0 &&
                            // Except colorAxis which is a special case where the empty
                            // object means it is enabled. Which is unfortunate and we
                            // should try to find a better way.
                            !(key === 'colorAxis' && depth === 0)) {
                            delete ret[key];
                        }
                    }
                    else if (newer[key] !== older[key] ||
                        // If the newer key is explicitly undefined, keep it (#10525)
                        (key in newer && !(key in older))) {
                        ret[key] = keeper[key];
                    }
                });
            }
            diff(newer, older, ret, 0);
            return ret;
        }
        /**
         * Shortcut for parseInt
         *
         * @private
         * @function Highcharts.pInt
         *
         * @param {*} s
         *        any
         *
         * @param {number} [mag]
         *        Magnitude
         *
         * @return {number}
         *         number
         */
        function pInt(s, mag) {
            return parseInt(s, mag || 10);
        }
        /**
         * Utility function to check for string type.
         *
         * @function Highcharts.isString
         *
         * @param {*} s
         *        The item to check.
         *
         * @return {boolean}
         *         True if the argument is a string.
         */
        function isString(s) {
            return typeof s === 'string';
        }
        /**
         * Utility function to check if an item is an array.
         *
         * @function Highcharts.isArray
         *
         * @param {*} obj
         *        The item to check.
         *
         * @return {boolean}
         *         True if the argument is an array.
         */
        function isArray(obj) {
            const str = Object.prototype.toString.call(obj);
            return str === '[object Array]' || str === '[object Array Iterator]';
        }
        /**
         * Utility function to check if an item is of type object.
         *
         * @function Highcharts.isObject
         *
         * @param {*} obj
         *        The item to check.
         *
         * @param {boolean} [strict=false]
         *        Also checks that the object is not an array.
         *
         * @return {boolean}
         *         True if the argument is an object.
         */
        function isObject(obj, strict) {
            return (!!obj &&
                typeof obj === 'object' &&
                (!strict || !isArray(obj))); // eslint-disable-line @typescript-eslint/no-explicit-any
        }
        /**
         * Utility function to check if an Object is a HTML Element.
         *
         * @function Highcharts.isDOMElement
         *
         * @param {*} obj
         *        The item to check.
         *
         * @return {boolean}
         *         True if the argument is a HTML Element.
         */
        function isDOMElement(obj) {
            return isObject(obj) && typeof obj.nodeType === 'number';
        }
        /**
         * Utility function to check if an Object is a class.
         *
         * @function Highcharts.isClass
         *
         * @param {object|undefined} obj
         *        The item to check.
         *
         * @return {boolean}
         *         True if the argument is a class.
         */
        function isClass(obj) {
            const c = obj && obj.constructor;
            return !!(isObject(obj, true) &&
                !isDOMElement(obj) &&
                (c && c.name && c.name !== 'Object'));
        }
        /**
         * Utility function to check if an item is a number and it is finite (not NaN,
         * Infinity or -Infinity).
         *
         * @function Highcharts.isNumber
         *
         * @param {*} n
         *        The item to check.
         *
         * @return {boolean}
         *         True if the item is a finite number
         */
        function isNumber(n) {
            return typeof n === 'number' && !isNaN(n) && n < Infinity && n > -Infinity;
        }
        /**
         * Remove the last occurence of an item from an array.
         *
         * @function Highcharts.erase
         *
         * @param {Array<*>} arr
         *        The array.
         *
         * @param {*} item
         *        The item to remove.
         *
         * @return {void}
         */
        function erase(arr, item) {
            let i = arr.length;
            while (i--) {
                if (arr[i] === item) {
                    arr.splice(i, 1);
                    break;
                }
            }
        }
        /**
         * Insert a series or an axis in a collection with other items, either the
         * chart series or yAxis series or axis collections, in the correct order
         * according to the index option and whether it is internal. Used internally
         * when adding series and axes.
         *
         * @private
         * @function Highcharts.Chart#insertItem
         * @param  {Highcharts.Series|Highcharts.Axis} item
         *         The item to insert
         * @param  {Array<Highcharts.Series>|Array<Highcharts.Axis>} collection
         *         A collection of items, like `chart.series` or `xAxis.series`.
         * @return {number} The index of the series in the collection.
         */
        function insertItem(item, collection) {
            const indexOption = item.options.index, length = collection.length;
            let i;
            for (
            // Internal item (navigator) should always be pushed to the end
            i = item.options.isInternal ? length : 0; i < length + 1; i++) {
                if (
                // No index option, reached the end of the collection,
                // equivalent to pushing
                !collection[i] ||
                    // Handle index option, the element to insert has lower index
                    (isNumber(indexOption) &&
                        indexOption < pick(collection[i].options.index, collection[i]._i)) ||
                    // Insert the new item before other internal items
                    // (navigator)
                    collection[i].options.isInternal) {
                    collection.splice(i, 0, item);
                    break;
                }
            }
            return i;
        }
        /**
         * Adds an item to an array, if it is not present in the array.
         *
         * @function Highcharts.pushUnique
         *
         * @param {Array<unknown>} array
         * The array to add the item to.
         *
         * @param {unknown} item
         * The item to add.
         *
         * @return {boolean}
         * Returns true, if the item was not present and has been added.
         */
        function pushUnique(array, item) {
            return array.indexOf(item) < 0 && !!array.push(item);
        }
        /**
         * Check if an object is null or undefined.
         *
         * @function Highcharts.defined
         *
         * @param {*} obj
         *        The object to check.
         *
         * @return {boolean}
         *         False if the object is null or undefined, otherwise true.
         */
        function defined(obj) {
            return typeof obj !== 'undefined' && obj !== null;
        }
        /**
         * Set or get an attribute or an object of attributes.
         *
         * To use as a setter, pass a key and a value, or let the second argument be a
         * collection of keys and values. When using a collection, passing a value of
         * `null` or `undefined` will remove the attribute.
         *
         * To use as a getter, pass only a string as the second argument.
         *
         * @function Highcharts.attr
         *
         * @param {Highcharts.HTMLDOMElement|Highcharts.SVGDOMElement} elem
         *        The DOM element to receive the attribute(s).
         *
         * @param {string|Highcharts.HTMLAttributes|Highcharts.SVGAttributes} [keyOrAttribs]
         *        The property or an object of key-value pairs.
         *
         * @param {number|string} [value]
         *        The value if a single property is set.
         *
         * @return {string|null|undefined}
         *         When used as a getter, return the value.
         */
        function attr(elem, keyOrAttribs, value) {
            const isGetter = isString(keyOrAttribs) && !defined(value);
            let ret;
            const attrSingle = (value, key) => {
                // Set the value
                if (defined(value)) {
                    elem.setAttribute(key, value);
                    // Get the value
                }
                else if (isGetter) {
                    ret = elem.getAttribute(key);
                    // IE7 and below cannot get class through getAttribute (#7850)
                    if (!ret && key === 'class') {
                        ret = elem.getAttribute(key + 'Name');
                    }
                    // Remove the value
                }
                else {
                    elem.removeAttribute(key);
                }
            };
            // If keyOrAttribs is a string
            if (isString(keyOrAttribs)) {
                attrSingle(value, keyOrAttribs);
                // Else if keyOrAttribs is defined, it is a hash of key/value pairs
            }
            else {
                objectEach(keyOrAttribs, attrSingle);
            }
            return ret;
        }
        /**
         * Check if an element is an array, and if not, make it into an array.
         *
         * @function Highcharts.splat
         *
         * @param {*} obj
         *        The object to splat.
         *
         * @return {Array}
         *         The produced or original array.
         */
        function splat(obj) {
            return isArray(obj) ? obj : [obj];
        }
        /**
         * Set a timeout if the delay is given, otherwise perform the function
         * synchronously.
         *
         * @function Highcharts.syncTimeout
         *
         * @param {Function} fn
         *        The function callback.
         *
         * @param {number} delay
         *        Delay in milliseconds.
         *
         * @param {*} [context]
         *        An optional context to send to the function callback.
         *
         * @return {number}
         *         An identifier for the timeout that can later be cleared with
         *         Highcharts.clearTimeout. Returns -1 if there is no timeout.
         */
        function syncTimeout(fn, delay, context) {
            if (delay > 0) {
                return setTimeout(fn, delay, context);
            }
            fn.call(0, context);
            return -1;
        }
        /**
         * Internal clear timeout. The function checks that the `id` was not removed
         * (e.g. by `chart.destroy()`). For the details see
         * [issue #7901](https://github.com/highcharts/highcharts/issues/7901).
         *
         * @function Highcharts.clearTimeout
         *
         * @param {number|undefined} id
         * Id of a timeout.
         */
        function internalClearTimeout(id) {
            if (defined(id)) {
                clearTimeout(id);
            }
        }
        /* eslint-disable valid-jsdoc */
        /**
         * Utility function to extend an object with the members of another.
         *
         * @function Highcharts.extend<T>
         *
         * @param {T|undefined} a
         *        The object to be extended.
         *
         * @param {Partial<T>} b
         *        The object to add to the first one.
         *
         * @return {T}
         *         Object a, the original object.
         */
        function extend(a, b) {
            /* eslint-enable valid-jsdoc */
            let n;
            if (!a) {
                a = {};
            }
            for (n in b) { // eslint-disable-line guard-for-in
                a[n] = b[n];
            }
            return a;
        }
        /* eslint-disable valid-jsdoc */
        /**
         * Return the first value that is not null or undefined.
         *
         * @function Highcharts.pick<T>
         *
         * @param {...Array<T|null|undefined>} items
         *        Variable number of arguments to inspect.
         *
         * @return {T}
         *         The value of the first argument that is not null or undefined.
         */
        function pick() {
            const args = arguments;
            const length = args.length;
            for (let i = 0; i < length; i++) {
                const arg = args[i];
                if (typeof arg !== 'undefined' && arg !== null) {
                    return arg;
                }
            }
        }
        /**
         * Set CSS on a given element.
         *
         * @function Highcharts.css
         *
         * @param {Highcharts.HTMLDOMElement|Highcharts.SVGDOMElement} el
         *        An HTML DOM element.
         *
         * @param {Highcharts.CSSObject} styles
         *        Style object with camel case property names.
         *
         * @return {void}
         */
        function css(el, styles) {
            if (H.isMS && !H.svg) { // #2686
                if (styles && defined(styles.opacity)) {
                    styles.filter = `alpha(opacity=${styles.opacity * 100})`;
                }
            }
            extend(el.style, styles);
        }
        /**
         * Utility function to create an HTML element with attributes and styles.
         *
         * @function Highcharts.createElement
         *
         * @param {string} tag
         *        The HTML tag.
         *
         * @param {Highcharts.HTMLAttributes} [attribs]
         *        Attributes as an object of key-value pairs.
         *
         * @param {Highcharts.CSSObject} [styles]
         *        Styles as an object of key-value pairs.
         *
         * @param {Highcharts.HTMLDOMElement} [parent]
         *        The parent HTML object.
         *
         * @param {boolean} [nopad=false]
         *        If true, remove all padding, border and margin.
         *
         * @return {Highcharts.HTMLDOMElement}
         *         The created DOM element.
         */
        function createElement(tag, attribs, styles, parent, nopad) {
            const el = doc.createElement(tag);
            if (attribs) {
                extend(el, attribs);
            }
            if (nopad) {
                css(el, { padding: '0', border: 'none', margin: '0' });
            }
            if (styles) {
                css(el, styles);
            }
            if (parent) {
                parent.appendChild(el);
            }
            return el;
        }
        // eslint-disable-next-line valid-jsdoc
        /**
         * Extend a prototyped class by new members.
         *
         * @deprecated
         * @function Highcharts.extendClass<T>
         *
         * @param {Highcharts.Class<T>} parent
         *        The parent prototype to inherit.
         *
         * @param {Highcharts.Dictionary<*>} members
         *        A collection of prototype members to add or override compared to the
         *        parent prototype.
         *
         * @return {Highcharts.Class<T>}
         *         A new prototype.
         */
        function extendClass(parent, members) {
            const obj = (function () { });
            obj.prototype = new parent(); // eslint-disable-line new-cap
            extend(obj.prototype, members);
            return obj;
        }
        /**
         * Left-pad a string to a given length by adding a character repetitively.
         *
         * @function Highcharts.pad
         *
         * @param {number} number
         *        The input string or number.
         *
         * @param {number} [length]
         *        The desired string length.
         *
         * @param {string} [padder=0]
         *        The character to pad with.
         *
         * @return {string}
         *         The padded string.
         */
        function pad(number, length, padder) {
            return new Array((length || 2) +
                1 -
                String(number)
                    .replace('-', '')
                    .length).join(padder || '0') + number;
        }
        /**
         * Return a length based on either the integer value, or a percentage of a base.
         *
         * @function Highcharts.relativeLength
         *
         * @param {Highcharts.RelativeSize} value
         *        A percentage string or a number.
         *
         * @param {number} base
         *        The full length that represents 100%.
         *
         * @param {number} [offset=0]
         *        A pixel offset to apply for percentage values. Used internally in
         *        axis positioning.
         *
         * @return {number}
         *         The computed length.
         */
        function relativeLength(value, base, offset) {
            return (/%$/).test(value) ?
                (base * parseFloat(value) / 100) + (offset || 0) :
                parseFloat(value);
        }
        /**
         * Wrap a method with extended functionality, preserving the original function.
         *
         * @function Highcharts.wrap
         *
         * @param {*} obj
         *        The context object that the method belongs to. In real cases, this is
         *        often a prototype.
         *
         * @param {string} method
         *        The name of the method to extend.
         *
         * @param {Highcharts.WrapProceedFunction} func
         *        A wrapper function callback. This function is called with the same
         *        arguments as the original function, except that the original function
         *        is unshifted and passed as the first argument.
         */
        function wrap(obj, method, func) {
            const proceed = obj[method];
            obj[method] = function () {
                const outerArgs = arguments, scope = this;
                return func.apply(this, [
                    function () {
                        return proceed.apply(scope, arguments.length ? arguments : outerArgs);
                    }
                ].concat([].slice.call(arguments)));
            };
        }
        /**
         * Get the magnitude of a number.
         *
         * @function Highcharts.getMagnitude
         *
         * @param {number} num
         *        The number.
         *
         * @return {number}
         *         The magnitude, where 1-9 are magnitude 1, 10-99 magnitude 2 etc.
         */
        function getMagnitude(num) {
            return Math.pow(10, Math.floor(Math.log(num) / Math.LN10));
        }
        /**
         * Take an interval and normalize it to multiples of round numbers.
         *
         * @deprecated
         * @function Highcharts.normalizeTickInterval
         *
         * @param {number} interval
         *        The raw, un-rounded interval.
         *
         * @param {Array<*>} [multiples]
         *        Allowed multiples.
         *
         * @param {number} [magnitude]
         *        The magnitude of the number.
         *
         * @param {boolean} [allowDecimals]
         *        Whether to allow decimals.
         *
         * @param {boolean} [hasTickAmount]
         *        If it has tickAmount, avoid landing on tick intervals lower than
         *        original.
         *
         * @return {number}
         *         The normalized interval.
         *
         * @todo
         * Move this function to the Axis prototype. It is here only for historical
         * reasons.
         */
        function normalizeTickInterval(interval, multiples, magnitude, allowDecimals, hasTickAmount) {
            let i, retInterval = interval;
            // round to a tenfold of 1, 2, 2.5 or 5
            magnitude = pick(magnitude, getMagnitude(interval));
            const normalized = interval / magnitude;
            // multiples for a linear scale
            if (!multiples) {
                multiples = hasTickAmount ?
                    // Finer grained ticks when the tick amount is hard set, including
                    // when alignTicks is true on multiple axes (#4580).
                    [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] :
                    // Else, let ticks fall on rounder numbers
                    [1, 2, 2.5, 5, 10];
                // the allowDecimals option
                if (allowDecimals === false) {
                    if (magnitude === 1) {
                        multiples = multiples.filter(function (num) {
                            return num % 1 === 0;
                        });
                    }
                    else if (magnitude <= 0.1) {
                        multiples = [1 / magnitude];
                    }
                }
            }
            // normalize the interval to the nearest multiple
            for (i = 0; i < multiples.length; i++) {
                retInterval = multiples[i];
                // only allow tick amounts smaller than natural
                if ((hasTickAmount &&
                    retInterval * magnitude >= interval) ||
                    (!hasTickAmount &&
                        (normalized <=
                            (multiples[i] +
                                (multiples[i + 1] || multiples[i])) / 2))) {
                    break;
                }
            }
            // Multiply back to the correct magnitude. Correct floats to appropriate
            // precision (#6085).
            retInterval = correctFloat(retInterval * magnitude, -Math.round(Math.log(0.001) / Math.LN10));
            return retInterval;
        }
        /**
         * Sort an object array and keep the order of equal items. The ECMAScript
         * standard does not specify the behaviour when items are equal.
         *
         * @function Highcharts.stableSort
         *
         * @param {Array<*>} arr
         *        The array to sort.
         *
         * @param {Function} sortFunction
         *        The function to sort it with, like with regular Array.prototype.sort.
         */
        function stableSort(arr, sortFunction) {
            // @todo It seems like Chrome since v70 sorts in a stable way internally,
            // plus all other browsers do it, so over time we may be able to remove this
            // function
            const length = arr.length;
            let sortValue, i;
            // Add index to each item
            for (i = 0; i < length; i++) {
                arr[i].safeI = i; // stable sort index
            }
            arr.sort(function (a, b) {
                sortValue = sortFunction(a, b);
                return sortValue === 0 ? a.safeI - b.safeI : sortValue;
            });
            // Remove index from items
            for (i = 0; i < length; i++) {
                delete arr[i].safeI; // stable sort index
            }
        }
        /**
         * Non-recursive method to find the lowest member of an array. `Math.min` raises
         * a maximum call stack size exceeded error in Chrome when trying to apply more
         * than 150.000 points. This method is slightly slower, but safe.
         *
         * @function Highcharts.arrayMin
         *
         * @param {Array<*>} data
         *        An array of numbers.
         *
         * @return {number}
         *         The lowest number.
         */
        function arrayMin(data) {
            let i = data.length, min = data[0];
            while (i--) {
                if (data[i] < min) {
                    min = data[i];
                }
            }
            return min;
        }
        /**
         * Non-recursive method to find the lowest member of an array. `Math.max` raises
         * a maximum call stack size exceeded error in Chrome when trying to apply more
         * than 150.000 points. This method is slightly slower, but safe.
         *
         * @function Highcharts.arrayMax
         *
         * @param {Array<*>} data
         *        An array of numbers.
         *
         * @return {number}
         *         The highest number.
         */
        function arrayMax(data) {
            let i = data.length, max = data[0];
            while (i--) {
                if (data[i] > max) {
                    max = data[i];
                }
            }
            return max;
        }
        /**
         * Utility method that destroys any SVGElement instances that are properties on
         * the given object. It loops all properties and invokes destroy if there is a
         * destroy method. The property is then delete.
         *
         * @function Highcharts.destroyObjectProperties
         *
         * @param {*} obj
         *        The object to destroy properties on.
         *
         * @param {*} [except]
         *        Exception, do not destroy this property, only delete it.
         */
        function destroyObjectProperties(obj, except) {
            objectEach(obj, function (val, n) {
                // If the object is non-null and destroy is defined
                if (val && val !== except && val.destroy) {
                    // Invoke the destroy
                    val.destroy();
                }
                // Delete the property from the object.
                delete obj[n];
            });
        }
        /**
         * Discard a HTML element
         *
         * @function Highcharts.discardElement
         *
         * @param {Highcharts.HTMLDOMElement} element
         *        The HTML node to discard.
         */
        function discardElement(element) {
            if (element && element.parentElement) {
                element.parentElement.removeChild(element);
            }
        }
        /**
         * Fix JS round off float errors.
         *
         * @function Highcharts.correctFloat
         *
         * @param {number} num
         *        A float number to fix.
         *
         * @param {number} [prec=14]
         *        The precision.
         *
         * @return {number}
         *         The corrected float number.
         */
        function correctFloat(num, prec) {
            // When the number is higher than 1e14 use the number (#16275)
            return num > 1e14 ? num : parseFloat(num.toPrecision(prec || 14));
        }
        /**
         * The time unit lookup
         *
         * @ignore
         */
        const timeUnits = {
            millisecond: 1,
            second: 1000,
            minute: 60000,
            hour: 3600000,
            day: 24 * 3600000,
            week: 7 * 24 * 3600000,
            month: 28 * 24 * 3600000,
            year: 364 * 24 * 3600000
        };
        /**
         * Easing definition
         *
         * @private
         * @function Math.easeInOutSine
         *
         * @param {number} pos
         *        Current position, ranging from 0 to 1.
         *
         * @return {number}
         *         Ease result
         */
        Math.easeInOutSine = function (pos) {
            return -0.5 * (Math.cos(Math.PI * pos) - 1);
        };
        /**
         * Find the closest distance between two values of a two-dimensional array
         * @private
         * @function Highcharts.getClosestDistance
         *
         * @param {Array<Array<number>>} arrays
         *          An array of arrays of numbers
         *
         * @return {number | undefined}
         *          The closest distance between values
         */
        function getClosestDistance(arrays, onError) {
            const allowNegative = !onError;
            let closest, loopLength, distance, i;
            arrays.forEach((xData) => {
                if (xData.length > 1) {
                    loopLength = xData.length - 1;
                    for (i = loopLength; i > 0; i--) {
                        distance = xData[i] - xData[i - 1];
                        if (distance < 0 && !allowNegative) {
                            onError?.();
                            // Only one call
                            onError = void 0;
                        }
                        else if (distance && (typeof closest === 'undefined' || distance < closest)) {
                            closest = distance;
                        }
                    }
                }
            });
            return closest;
        }
        /**
         * Returns the value of a property path on a given object.
         *
         * @private
         * @function getNestedProperty
         *
         * @param {string} path
         * Path to the property, for example `custom.myValue`.
         *
         * @param {unknown} obj
         * Instance containing the property on the specific path.
         *
         * @return {unknown}
         * The unknown property value.
         */
        function getNestedProperty(path, parent) {
            const pathElements = path.split('.');
            while (pathElements.length && defined(parent)) {
                const pathElement = pathElements.shift();
                // Filter on the key
                if (typeof pathElement === 'undefined' ||
                    pathElement === '__proto__') {
                    return; // undefined
                }
                if (pathElement === 'this') {
                    let thisProp;
                    if (isObject(parent)) {
                        thisProp = parent['@this'];
                    }
                    return thisProp ?? parent;
                }
                const child = parent[pathElement];
                // Filter on the child
                if (!defined(child) ||
                    typeof child === 'function' ||
                    typeof child.nodeType === 'number' ||
                    child === win) {
                    return; // undefined
                }
                // Else, proceed
                parent = child;
            }
            return parent;
        }
        /**
         * Get the computed CSS value for given element and property, only for numerical
         * properties. For width and height, the dimension of the inner box (excluding
         * padding) is returned. Used for fitting the chart within the container.
         *
         * @function Highcharts.getStyle
         *
         * @param {Highcharts.HTMLDOMElement} el
         * An HTML element.
         *
         * @param {string} prop
         * The property name.
         *
         * @param {boolean} [toInt=true]
         * Parse to integer.
         *
         * @return {number|string|undefined}
         * The style value.
         */
        function getStyle(el, prop, toInt) {
            let style;
            // For width and height, return the actual inner pixel size (#4913)
            if (prop === 'width') {
                let offsetWidth = Math.min(el.offsetWidth, el.scrollWidth);
                // In flex boxes, we need to use getBoundingClientRect and floor it,
                // because scrollWidth doesn't support subpixel precision (#6427) ...
                const boundingClientRectWidth = el.getBoundingClientRect &&
                    el.getBoundingClientRect().width;
                // ...unless if the containing div or its parents are transform-scaled
                // down, in which case the boundingClientRect can't be used as it is
                // also scaled down (#9871, #10498).
                if (boundingClientRectWidth < offsetWidth &&
                    boundingClientRectWidth >= offsetWidth - 1) {
                    offsetWidth = Math.floor(boundingClientRectWidth);
                }
                return Math.max(0, // #8377
                (offsetWidth -
                    (getStyle(el, 'padding-left', true) || 0) -
                    (getStyle(el, 'padding-right', true) || 0)));
            }
            if (prop === 'height') {
                return Math.max(0, // #8377
                (Math.min(el.offsetHeight, el.scrollHeight) -
                    (getStyle(el, 'padding-top', true) || 0) -
                    (getStyle(el, 'padding-bottom', true) || 0)));
            }
            // Otherwise, get the computed style
            const css = win.getComputedStyle(el, void 0); // eslint-disable-line no-undefined
            if (css) {
                style = css.getPropertyValue(prop);
                if (pick(toInt, prop !== 'opacity')) {
                    style = pInt(style);
                }
            }
            return style;
        }
        /**
         * Search for an item in an array.
         *
         * @function Highcharts.inArray
         *
         * @deprecated
         *
         * @param {*} item
         *        The item to search for.
         *
         * @param {Array<*>} arr
         *        The array or node collection to search in.
         *
         * @param {number} [fromIndex=0]
         *        The index to start searching from.
         *
         * @return {number}
         *         The index within the array, or -1 if not found.
         */
        function inArray(item, arr, fromIndex) {
            error(32, false, void 0, { 'Highcharts.inArray': 'use Array.indexOf' });
            return arr.indexOf(item, fromIndex);
        }
        /**
         * Return the value of the first element in the array that satisfies the
         * provided testing function.
         *
         * @function Highcharts.find<T>
         *
         * @param {Array<T>} arr
         *        The array to test.
         *
         * @param {Function} callback
         *        The callback function. The function receives the item as the first
         *        argument. Return `true` if this item satisfies the condition.
         *
         * @return {T|undefined}
         *         The value of the element.
         */
        const find = Array.prototype.find ?
            function (arr, callback) {
                return arr.find(callback);
            } :
            // Legacy implementation. PhantomJS, IE <= 11 etc. #7223.
            function (arr, callback) {
                let i;
                const length = arr.length;
                for (i = 0; i < length; i++) {
                    if (callback(arr[i], i)) { // eslint-disable-line node/callback-return
                        return arr[i];
                    }
                }
            };
        /**
         * Returns an array of a given object's own properties.
         *
         * @function Highcharts.keys
         * @deprecated
         *
         * @param {*} obj
         *        The object of which the properties are to be returned.
         *
         * @return {Array<string>}
         *         An array of strings that represents all the properties.
         */
        function keys(obj) {
            error(32, false, void 0, { 'Highcharts.keys': 'use Object.keys' });
            return Object.keys(obj);
        }
        /**
         * Get the element's offset position, corrected for `overflow: auto`.
         *
         * @function Highcharts.offset
         *
         * @param {global.Element} el
         *        The DOM element.
         *
         * @return {Highcharts.OffsetObject}
         *         An object containing `left` and `top` properties for the position in
         *         the page.
         */
        function offset(el) {
            const docElem = doc.documentElement, box = (el.parentElement || el.parentNode) ?
                el.getBoundingClientRect() :
                { top: 0, left: 0, width: 0, height: 0 };
            return {
                top: box.top + (win.pageYOffset || docElem.scrollTop) -
                    (docElem.clientTop || 0),
                left: box.left + (win.pageXOffset || docElem.scrollLeft) -
                    (docElem.clientLeft || 0),
                width: box.width,
                height: box.height
            };
        }
        /* eslint-disable valid-jsdoc */
        /**
         * Iterate over object key pairs in an object.
         *
         * @function Highcharts.objectEach<T>
         *
         * @param {*} obj
         *        The object to iterate over.
         *
         * @param {Highcharts.ObjectEachCallbackFunction<T>} fn
         *        The iterator callback. It passes three arguments:
         *        * value - The property value.
         *        * key - The property key.
         *        * obj - The object that objectEach is being applied to.
         *
         * @param {T} [ctx]
         *        The context.
         */
        function objectEach(obj, fn, ctx) {
            /* eslint-enable valid-jsdoc */
            for (const key in obj) {
                if (Object.hasOwnProperty.call(obj, key)) {
                    fn.call(ctx || obj[key], obj[key], key, obj);
                }
            }
        }
        /**
         * Iterate over an array.
         *
         * @deprecated
         * @function Highcharts.each
         *
         * @param {Array<*>} arr
         *        The array to iterate over.
         *
         * @param {Function} fn
         *        The iterator callback. It passes three arguments:
         *        - `item`: The array item.
         *        - `index`: The item's index in the array.
         *        - `arr`: The array that each is being applied to.
         *
         * @param {*} [ctx]
         *        The context.
         *
         * @return {void}
         */
        /**
         * Filter an array by a callback.
         *
         * @deprecated
         * @function Highcharts.grep
         *
         * @param {Array<*>} arr
         *        The array to filter.
         *
         * @param {Function} callback
         *        The callback function. The function receives the item as the first
         *        argument. Return `true` if the item is to be preserved.
         *
         * @return {Array<*>}
         *         A new, filtered array.
         */
        /**
         * Map an array by a callback.
         *
         * @deprecated
         * @function Highcharts.map
         *
         * @param {Array<*>} arr
         *        The array to map.
         *
         * @param {Function} fn
         *        The callback function. Return the new value for the new array.
         *
         * @return {Array<*>}
         *         A new array item with modified items.
         */
        /**
         * Reduce an array to a single value.
         *
         * @deprecated
         * @function Highcharts.reduce
         *
         * @param {Array<*>} arr
         *        The array to reduce.
         *
         * @param {Function} fn
         *        The callback function. Return the reduced value. Receives 4
         *        arguments: Accumulated/reduced value, current value, current array
         *        index, and the array.
         *
         * @param {*} initialValue
         *        The initial value of the accumulator.
         *
         * @return {*}
         *         The reduced value.
         */
        /**
         * Test whether at least one element in the array passes the test implemented by
         * the provided function.
         *
         * @deprecated
         * @function Highcharts.some
         *
         * @param {Array<*>} arr
         *        The array to test
         *
         * @param {Function} fn
         *        The function to run on each item. Return truty to pass the test.
         *        Receives arguments `currentValue`, `index` and `array`.
         *
         * @param {*} ctx
         *        The context.
         *
         * @return {boolean}
         */
        objectEach({
            map: 'map',
            each: 'forEach',
            grep: 'filter',
            reduce: 'reduce',
            some: 'some'
        }, function (val, key) {
            H[key] = function (arr) {
                error(32, false, void 0, { [`Highcharts.${key}`]: `use Array.${val}` });
                return Array.prototype[val].apply(arr, [].slice.call(arguments, 1));
            };
        });
        /* eslint-disable valid-jsdoc */
        /**
         * Add an event listener.
         *
         * @function Highcharts.addEvent<T>
         *
         * @param {Highcharts.Class<T>|T} el
         *        The element or object to add a listener to. It can be a
         *        {@link HTMLDOMElement}, an {@link SVGElement} or any other object.
         *
         * @param {string} type
         *        The event type.
         *
         * @param {Highcharts.EventCallbackFunction<T>|Function} fn
         *        The function callback to execute when the event is fired.
         *
         * @param {Highcharts.EventOptionsObject} [options]
         *        Options for adding the event.
         *
         * @return {Function}
         *         A callback function to remove the added event.
         */
        function addEvent(el, type, fn, options = {}) {
            /* eslint-enable valid-jsdoc */
            // Add hcEvents to either the prototype (in case we're running addEvent on a
            // class) or the instance. If hasOwnProperty('hcEvents') is false, it is
            // inherited down the prototype chain, in which case we need to set the
            // property on this instance (which may itself be a prototype).
            const owner = typeof el === 'function' && el.prototype || el;
            if (!Object.hasOwnProperty.call(owner, 'hcEvents')) {
                owner.hcEvents = {};
            }
            const events = owner.hcEvents;
            // Allow click events added to points, otherwise they will be prevented by
            // the TouchPointer.pinch function after a pinch zoom operation (#7091).
            if (H.Point && // without H a dependency loop occurs
                el instanceof H.Point &&
                el.series &&
                el.series.chart) {
                el.series.chart.runTrackerClick = true;
            }
            // Handle DOM events
            // If the browser supports passive events, add it to improve performance
            // on touch events (#11353).
            const addEventListener = el.addEventListener;
            if (addEventListener) {
                addEventListener.call(el, type, fn, H.supportsPassiveEvents ? {
                    passive: options.passive === void 0 ?
                        type.indexOf('touch') !== -1 : options.passive,
                    capture: false
                } : false);
            }
            if (!events[type]) {
                events[type] = [];
            }
            const eventObject = {
                fn,
                order: typeof options.order === 'number' ? options.order : Infinity
            };
            events[type].push(eventObject);
            // Order the calls
            events[type].sort((a, b) => a.order - b.order);
            // Return a function that can be called to remove this event.
            return function () {
                removeEvent(el, type, fn);
            };
        }
        /* eslint-disable valid-jsdoc */
        /**
         * Remove an event that was added with {@link Highcharts#addEvent}.
         *
         * @function Highcharts.removeEvent<T>
         *
         * @param {Highcharts.Class<T>|T} el
         *        The element to remove events on.
         *
         * @param {string} [type]
         *        The type of events to remove. If undefined, all events are removed
         *        from the element.
         *
         * @param {Highcharts.EventCallbackFunction<T>} [fn]
         *        The specific callback to remove. If undefined, all events that match
         *        the element and optionally the type are removed.
         *
         * @return {void}
         */
        function removeEvent(el, type, fn) {
            /* eslint-enable valid-jsdoc */
            /**
             * @private
             */
            function removeOneEvent(type, fn) {
                const removeEventListener = el.removeEventListener;
                if (removeEventListener) {
                    removeEventListener.call(el, type, fn, false);
                }
            }
            /**
             * @private
             */
            function removeAllEvents(eventCollection) {
                let types, len;
                if (!el.nodeName) {
                    return; // break on non-DOM events
                }
                if (type) {
                    types = {};
                    types[type] = true;
                }
                else {
                    types = eventCollection;
                }
                objectEach(types, function (_val, n) {
                    if (eventCollection[n]) {
                        len = eventCollection[n].length;
                        while (len--) {
                            removeOneEvent(n, eventCollection[n][len].fn);
                        }
                    }
                });
            }
            const owner = typeof el === 'function' && el.prototype || el;
            if (Object.hasOwnProperty.call(owner, 'hcEvents')) {
                const events = owner.hcEvents;
                if (type) {
                    const typeEvents = (events[type] || []);
                    if (fn) {
                        events[type] = typeEvents.filter(function (obj) {
                            return fn !== obj.fn;
                        });
                        removeOneEvent(type, fn);
                    }
                    else {
                        removeAllEvents(events);
                        events[type] = [];
                    }
                }
                else {
                    removeAllEvents(events);
                    delete owner.hcEvents;
                }
            }
        }
        /* eslint-disable valid-jsdoc */
        /**
         * Fire an event that was registered with {@link Highcharts#addEvent}.
         *
         * @function Highcharts.fireEvent<T>
         *
         * @param {T} el
         *        The object to fire the event on. It can be a {@link HTMLDOMElement},
         *        an {@link SVGElement} or any other object.
         *
         * @param {string} type
         *        The type of event.
         *
         * @param {Highcharts.Dictionary<*>|Event} [eventArguments]
         *        Custom event arguments that are passed on as an argument to the event
         *        handler.
         *
         * @param {Highcharts.EventCallbackFunction<T>|Function} [defaultFunction]
         *        The default function to execute if the other listeners haven't
         *        returned false.
         *
         * @return {void}
         */
        function fireEvent(el, type, eventArguments, defaultFunction) {
            /* eslint-enable valid-jsdoc */
            let e, i;
            eventArguments = eventArguments || {};
            if (doc.createEvent &&
                (el.dispatchEvent ||
                    (el.fireEvent &&
                        // Enable firing events on Highcharts instance.
                        el !== H))) {
                e = doc.createEvent('Events');
                e.initEvent(type, true, true);
                eventArguments = extend(e, eventArguments);
                if (el.dispatchEvent) {
                    el.dispatchEvent(eventArguments);
                }
                else {
                    el.fireEvent(type, eventArguments);
                }
            }
            else if (el.hcEvents) {
                if (!eventArguments.target) {
                    // We're running a custom event
                    extend(eventArguments, {
                        // Attach a simple preventDefault function to skip
                        // default handler if called. The built-in
                        // defaultPrevented property is not overwritable (#5112)
                        preventDefault: function () {
                            eventArguments.defaultPrevented = true;
                        },
                        // Setting target to native events fails with clicking
                        // the zoom-out button in Chrome.
                        target: el,
                        // If the type is not set, we're running a custom event
                        // (#2297). If it is set, we're running a browser event.
                        type: type
                    });
                }
                const events = [];
                let object = el;
                let multilevel = false;
                // Recurse up the inheritance chain and collect hcEvents set as own
                // objects on the prototypes.
                while (object.hcEvents) {
                    if (Object.hasOwnProperty.call(object, 'hcEvents') &&
                        object.hcEvents[type]) {
                        if (events.length) {
                            multilevel = true;
                        }
                        events.unshift.apply(events, object.hcEvents[type]);
                    }
                    object = Object.getPrototypeOf(object);
                }
                // For performance reasons, only sort the event handlers in case we are
                // dealing with multiple levels in the prototype chain. Otherwise, the
                // events are already sorted in the addEvent function.
                if (multilevel) {
                    // Order the calls
                    events.sort((a, b) => a.order - b.order);
                }
                // Call the collected event handlers
                events.forEach((obj) => {
                    // If the event handler returns false, prevent the default handler
                    // from executing
                    if (obj.fn.call(el, eventArguments) === false) {
                        eventArguments.preventDefault();
                    }
                });
            }
            // Run the default if not prevented
            if (defaultFunction && !eventArguments.defaultPrevented) {
                defaultFunction.call(el, eventArguments);
            }
        }
        let serialMode;
        /**
         * Get a unique key for using in internal element id's and pointers. The key is
         * composed of a random hash specific to this Highcharts instance, and a
         * counter.
         *
         * @example
         * let id = uniqueKey(); // => 'highcharts-x45f6hp-0'
         *
         * @function Highcharts.uniqueKey
         *
         * @return {string}
         * A unique key.
         */
        const uniqueKey = (function () {
            const hash = Math.random().toString(36).substring(2, 9) + '-';
            let id = 0;
            return function () {
                return 'highcharts-' + (serialMode ? '' : hash) + id++;
            };
        }());
        /**
         * Activates a serial mode for element IDs provided by
         * {@link Highcharts.uniqueKey}. This mode can be used in automated tests, where
         * a simple comparison of two rendered SVG graphics is needed.
         *
         * **Note:** This is only for testing purposes and will break functionality in
         * webpages with multiple charts.
         *
         * @example
         * if (
         *   process &&
         *   process.env.NODE_ENV === 'development'
         * ) {
         *   Highcharts.useSerialIds(true);
         * }
         *
         * @function Highcharts.useSerialIds
         *
         * @param {boolean} [mode]
         * Changes the state of serial mode.
         *
         * @return {boolean|undefined}
         * State of the serial mode.
         */
        function useSerialIds(mode) {
            return (serialMode = pick(mode, serialMode));
        }
        function isFunction(obj) {
            return typeof obj === 'function';
        }
        // Register Highcharts as a plugin in jQuery
        if (win.jQuery) {
            /**
             * Highcharts-extended JQuery.
             *
             * @external JQuery
             */
            /**
             * Helper function to return the chart of the current JQuery selector
             * element.
             *
             * @function external:JQuery#highcharts
             *
             * @return {Highcharts.Chart}
             *         The chart that is linked to the JQuery selector element.
             */ /**
            * Factory function to create a chart in the current JQuery selector
            * element.
            *
            * @function external:JQuery#highcharts
            *
            * @param {'Chart'|'Map'|'StockChart'|string} [className]
            *        Name of the factory class in the Highcharts namespace.
            *
            * @param {Highcharts.Options} [options]
            *        The chart options structure.
            *
            * @param {Highcharts.ChartCallbackFunction} [callback]
            *        Function to run when the chart has loaded and and all external
            *        images are loaded. Defining a
            *        [chart.events.load](https://api.highcharts.com/highcharts/chart.events.load)
            *        handler is equivalent.
            *
            * @return {JQuery}
            *         The current JQuery selector.
            */
            win.jQuery.fn.highcharts = function () {
                const args = [].slice.call(arguments);
                if (this[0]) { // this[0] is the renderTo div
                    // Create the chart
                    if (args[0]) {
                        new H[ // eslint-disable-line computed-property-spacing, no-new
                        // Constructor defaults to Chart
                        isString(args[0]) ? args.shift() : 'Chart'](this[0], args[0], args[1]);
                        return this;
                    }
                    // When called without parameters or with the return argument,
                    // return an existing chart
                    return charts[attr(this[0], 'data-highcharts-chart')];
                }
            };
        }
        /* *
         *
         *  Default Export
         *
         * */
        // TODO use named exports when supported.
        const Utilities = {
            addEvent,
            arrayMax,
            arrayMin,
            attr,
            clamp,
            clearTimeout: internalClearTimeout,
            correctFloat,
            createElement,
            css,
            defined,
            destroyObjectProperties,
            diffObjects,
            discardElement,
            erase,
            error,
            extend,
            extendClass,
            find,
            fireEvent,
            getClosestDistance,
            getMagnitude,
            getNestedProperty,
            getStyle,
            inArray,
            insertItem,
            isArray,
            isClass,
            isDOMElement,
            isFunction,
            isNumber,
            isObject,
            isString,
            keys,
            merge,
            normalizeTickInterval,
            objectEach,
            offset,
            pad,
            pick,
            pInt,
            pushUnique,
            relativeLength,
            removeEvent,
            splat,
            stableSort,
            syncTimeout,
            timeUnits,
            uniqueKey,
            useSerialIds,
            wrap
        };
        /* *
         *
         *  API Declarations
         *
         * */
        /**
         * An animation configuration. Animation configurations can also be defined as
         * booleans, where `false` turns off animation and `true` defaults to a duration
         * of 500ms and defer of 0ms.
         *
         * @interface Highcharts.AnimationOptionsObject
         */ /**
        * A callback function to exectute when the animation finishes.
        * @name Highcharts.AnimationOptionsObject#complete
        * @type {Function|undefined}
        */ /**
        * The animation defer in milliseconds.
        * @name Highcharts.AnimationOptionsObject#defer
        * @type {number|undefined}
        */ /**
        * The animation duration in milliseconds.
        * @name Highcharts.AnimationOptionsObject#duration
        * @type {number|undefined}
        */ /**
        * The name of an easing function as defined on the `Math` object.
        * @name Highcharts.AnimationOptionsObject#easing
        * @type {string|Function|undefined}
        */ /**
        * A callback function to execute on each step of each attribute or CSS property
        * that's being animated. The first argument contains information about the
        * animation and progress.
        * @name Highcharts.AnimationOptionsObject#step
        * @type {Function|undefined}
        */
        /**
         * Creates a frame for the animated SVG element.
         *
         * @callback Highcharts.AnimationStepCallbackFunction
         *
         * @param {Highcharts.SVGElement} this
         *        The SVG element to animate.
         *
         * @return {void}
         */
        /**
         * Interface description for a class.
         *
         * @interface Highcharts.Class<T>
         * @extends Function
         */ /**
        * Class costructor.
        * @function Highcharts.Class<T>#new
        * @param {...Array<*>} args
        *        Constructor arguments.
        * @return {T}
        *         Class instance.
        */
        /**
         * A style object with camel case property names to define visual appearance of
         * a SVG element or HTML element. The properties can be whatever styles are
         * supported on the given SVG or HTML element.
         *
         * @example
         * {
         *    fontFamily: 'monospace',
         *    fontSize: '1.2em'
         * }
         *
         * @interface Highcharts.CSSObject
         */ /**
        * @name Highcharts.CSSObject#[key:string]
        * @type {boolean|number|string|undefined}
        */ /**
        * Background style for the element.
        * @name Highcharts.CSSObject#background
        * @type {string|undefined}
        */ /**
        * Background color of the element.
        * @name Highcharts.CSSObject#backgroundColor
        * @type {Highcharts.ColorString|undefined}
        */ /**
        * Border style for the element.
        * @name Highcharts.CSSObject#border
        * @type {string|undefined}
        */ /**
        * Radius of the element border.
        * @name Highcharts.CSSObject#borderRadius
        * @type {number|undefined}
        */ /**
        * Color used in the element. The 'contrast' option is a Highcharts custom
        * property that results in black or white, depending on the background of the
        * element.
        * @name Highcharts.CSSObject#color
        * @type {'contrast'|Highcharts.ColorString|undefined}
        */ /**
        * Style of the mouse cursor when resting over the element.
        * @name Highcharts.CSSObject#cursor
        * @type {Highcharts.CursorValue|undefined}
        */ /**
        * Font family of the element text. Multiple values have to be in decreasing
        * preference order and separated by comma.
        * @name Highcharts.CSSObject#fontFamily
        * @type {string|undefined}
        */ /**
        * Font size of the element text.
        * @name Highcharts.CSSObject#fontSize
        * @type {string|undefined}
        */ /**
        * Font weight of the element text.
        * @name Highcharts.CSSObject#fontWeight
        * @type {string|undefined}
        */ /**
        * Height of the element.
        * @name Highcharts.CSSObject#height
        * @type {number|undefined}
        */ /**
        * Width of the element border.
        * @name Highcharts.CSSObject#lineWidth
        * @type {number|undefined}
        */ /**
        * Opacity of the element.
        * @name Highcharts.CSSObject#opacity
        * @type {number|undefined}
        */ /**
        * Space around the element content.
        * @name Highcharts.CSSObject#padding
        * @type {string|undefined}
        */ /**
        * Behaviour of the element when the mouse cursor rests over it.
        * @name Highcharts.CSSObject#pointerEvents
        * @type {string|undefined}
        */ /**
        * Positioning of the element.
        * @name Highcharts.CSSObject#position
        * @type {string|undefined}
        */ /**
        * Alignment of the element text.
        * @name Highcharts.CSSObject#textAlign
        * @type {string|undefined}
        */ /**
        * Additional decoration of the element text.
        * @name Highcharts.CSSObject#textDecoration
        * @type {string|undefined}
        */ /**
        * Outline style of the element text.
        * @name Highcharts.CSSObject#textOutline
        * @type {string|undefined}
        */ /**
        * Line break style of the element text. Highcharts SVG elements support
        * `ellipsis` when a `width` is set.
        * @name Highcharts.CSSObject#textOverflow
        * @type {string|undefined}
        */ /**
        * Top spacing of the element relative to the parent element.
        * @name Highcharts.CSSObject#top
        * @type {string|undefined}
        */ /**
        * Animated transition of selected element properties.
        * @name Highcharts.CSSObject#transition
        * @type {string|undefined}
        */ /**
        * Line break style of the element text.
        * @name Highcharts.CSSObject#whiteSpace
        * @type {string|undefined}
        */ /**
        * Width of the element.
        * @name Highcharts.CSSObject#width
        * @type {number|undefined}
        */
        /**
         * All possible cursor styles.
         *
         * @typedef {'alias'|'all-scroll'|'auto'|'cell'|'col-resize'|'context-menu'|'copy'|'crosshair'|'default'|'e-resize'|'ew-resize'|'grab'|'grabbing'|'help'|'move'|'n-resize'|'ne-resize'|'nesw-resize'|'no-drop'|'none'|'not-allowed'|'ns-resize'|'nw-resize'|'nwse-resize'|'pointer'|'progress'|'row-resize'|'s-resize'|'se-resize'|'sw-resize'|'text'|'vertical-text'|'w-resize'|'wait'|'zoom-in'|'zoom-out'} Highcharts.CursorValue
         */
        /**
         * All possible dash styles.
         *
         * @typedef {'Dash'|'DashDot'|'Dot'|'LongDash'|'LongDashDot'|'LongDashDotDot'|'ShortDash'|'ShortDashDot'|'ShortDashDotDot'|'ShortDot'|'Solid'} Highcharts.DashStyleValue
         */
        /**
         * Generic dictionary in TypeScript notation.
         * Use the native `AnyRecord` instead.
         *
         * @deprecated
         * @interface Highcharts.Dictionary<T>
         */ /**
        * @name Highcharts.Dictionary<T>#[key:string]
        * @type {T}
        */
        /**
         * The function callback to execute when the event is fired. The `this` context
         * contains the instance, that fired the event.
         *
         * @callback Highcharts.EventCallbackFunction<T>
         *
         * @param {T} this
         *
         * @param {Highcharts.Dictionary<*>|Event} [eventArguments]
         *        Event arguments.
         *
         * @return {boolean|void}
         */
        /**
         * The event options for adding function callback.
         *
         * @interface Highcharts.EventOptionsObject
         */ /**
        * The order the event handler should be called. This opens for having one
        * handler be called before another, independent of in which order they were
        * added.
        * @name Highcharts.EventOptionsObject#order
        * @type {number}
        */ /**
        * Whether an event should be passive or not.
        * When set to `true`, the function specified by listener will never call
        * `preventDefault()`.
        * @name Highcharts.EventOptionsObject#passive
        * @type boolean
        */
        /**
         * Formats data as a string. Usually the data is accessible throught the `this`
         * keyword.
         *
         * @callback Highcharts.FormatterCallbackFunction<T>
         *
         * @param {T} this
         *        Context to format
         *
         * @return {string}
         *         Formatted text
         */
        /**
         * An object of key-value pairs for HTML attributes.
         *
         * @typedef {Highcharts.Dictionary<boolean|number|string|Function>} Highcharts.HTMLAttributes
         */
        /**
         * An HTML DOM element. The type is a reference to the regular HTMLElement in
         * the global scope.
         *
         * @typedef {global.HTMLElement} Highcharts.HTMLDOMElement
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
         */
        /**
         * The iterator callback.
         *
         * @callback Highcharts.ObjectEachCallbackFunction<T>
         *
         * @param {T} this
         *        The context.
         *
         * @param {*} value
         *        The property value.
         *
         * @param {string} key
         *        The property key.
         *
         * @param {*} obj
         *        The object that objectEach is being applied to.
         */
        /**
         * An object containing `left` and `top` properties for the position in the
         * page.
         *
         * @interface Highcharts.OffsetObject
         */ /**
        * Left distance to the page border.
        * @name Highcharts.OffsetObject#left
        * @type {number}
        */ /**
        * Top distance to the page border.
        * @name Highcharts.OffsetObject#top
        * @type {number}
        */
        /**
         * Describes a range.
         *
         * @interface Highcharts.RangeObject
         */ /**
        * Maximum number of the range.
        * @name Highcharts.RangeObject#max
        * @type {number}
        */ /**
        * Minimum number of the range.
        * @name Highcharts.RangeObject#min
        * @type {number}
        */
        /**
         * If a number is given, it defines the pixel length. If a percentage string is
         * given, like for example `'50%'`, the setting defines a length relative to a
         * base size, for example the size of a container.
         *
         * @typedef {number|string} Highcharts.RelativeSize
         */
        /**
         * Proceed function to call original (wrapped) function.
         *
         * @callback Highcharts.WrapProceedFunction
         *
         * @param {*} [arg1]
         *        Optional argument. Without any arguments defaults to first argument of
         *        the wrapping function.
         *
         * @param {*} [arg2]
         *        Optional argument. Without any arguments defaults to second argument
         *        of the wrapping function.
         *
         * @param {*} [arg3]
         *        Optional argument. Without any arguments defaults to third argument of
         *        the wrapping function.
         *
         * @return {*}
         *         Return value of the original function.
         */
        /**
         * The Highcharts object is the placeholder for all other members, and various
         * utility functions. The most important member of the namespace would be the
         * chart constructor.
         *
         * @example
         * let chart = Highcharts.chart('container', { ... });
         *
         * @namespace Highcharts
         */
        ''; // detach doclets above

        return Utilities;
    });
    _registerModule(_modules, 'Data/Modifiers/DataModifier.js', [_modules['Core/Utilities.js']], function (U) {
        /* *
         *
         *  (c) 2009-2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *  - Gøran Slettemark
         *
         * */
        const { addEvent, fireEvent, merge } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Abstract class to provide an interface for modifying a table.
         *
         * @private
         */
        class DataModifier {
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Runs a timed execution of the modifier on the given datatable.
             * Can be configured to run multiple times.
             *
             * @param {DataTable} dataTable
             * The datatable to execute
             *
             * @param {DataModifier.BenchmarkOptions} options
             * Options. Currently supports `iterations` for number of iterations.
             *
             * @return {Array<number>}
             * An array of times in milliseconds
             *
             */
            benchmark(dataTable, options) {
                const results = [];
                const modifier = this;
                const execute = () => {
                    modifier.modifyTable(dataTable);
                    modifier.emit({
                        type: 'afterBenchmarkIteration'
                    });
                };
                const defaultOptions = {
                    iterations: 1
                };
                const { iterations } = merge(defaultOptions, options);
                modifier.on('afterBenchmarkIteration', () => {
                    if (results.length === iterations) {
                        modifier.emit({
                            type: 'afterBenchmark',
                            results
                        });
                        return;
                    }
                    // Run again
                    execute();
                });
                const times = {
                    startTime: 0,
                    endTime: 0
                };
                // Add timers
                modifier.on('modify', () => {
                    times.startTime = window.performance.now();
                });
                modifier.on('afterModify', () => {
                    times.endTime = window.performance.now();
                    results.push(times.endTime - times.startTime);
                });
                // Initial run
                execute();
                return results;
            }
            /**
             * Emits an event on the modifier to all registered callbacks of this event.
             *
             * @param {DataModifier.Event} [e]
             * Event object containing additonal event information.
             */
            emit(e) {
                fireEvent(this, e.type, e);
            }
            /**
             * Returns a modified copy of the given table.
             *
             * @param {Highcharts.DataTable} table
             * Table to modify.
             *
             * @param {DataEvent.Detail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Promise<Highcharts.DataTable>}
             * Table with `modified` property as a reference.
             */
            modify(table, eventDetail) {
                const modifier = this;
                return new Promise((resolve, reject) => {
                    if (table.modified === table) {
                        table.modified = table.clone(false, eventDetail);
                    }
                    try {
                        resolve(modifier.modifyTable(table, eventDetail));
                    }
                    catch (e) {
                        modifier.emit({
                            type: 'error',
                            detail: eventDetail,
                            table
                        });
                        reject(e);
                    }
                });
            }
            /**
             * Applies partial modifications of a cell change to the property `modified`
             * of the given modified table.
             *
             * @param {Highcharts.DataTable} table
             * Modified table.
             *
             * @param {string} columnName
             * Column name of changed cell.
             *
             * @param {number|undefined} rowIndex
             * Row index of changed cell.
             *
             * @param {Highcharts.DataTableCellType} cellValue
             * Changed cell value.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Highcharts.DataTable}
             * Table with `modified` property as a reference.
             */
            modifyCell(table, columnName, rowIndex, cellValue, eventDetail) {
                return this.modifyTable(table);
            }
            /**
             * Applies partial modifications of column changes to the property
             * `modified` of the given table.
             *
             * @param {Highcharts.DataTable} table
             * Modified table.
             *
             * @param {Highcharts.DataTableColumnCollection} columns
             * Changed columns as a collection, where the keys are the column names.
             *
             * @param {number} [rowIndex=0]
             * Index of the first changed row.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Highcharts.DataTable}
             * Table with `modified` property as a reference.
             */
            modifyColumns(table, columns, rowIndex, eventDetail) {
                return this.modifyTable(table);
            }
            /**
             * Applies partial modifications of row changes to the property `modified`
             * of the given table.
             *
             * @param {Highcharts.DataTable} table
             * Modified table.
             *
             * @param {Array<(Highcharts.DataTableRow|Highcharts.DataTableRowObject)>} rows
             * Changed rows.
             *
             * @param {number} [rowIndex]
             * Index of the first changed row.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Highcharts.DataTable}
             * Table with `modified` property as a reference.
             */
            modifyRows(table, rows, rowIndex, eventDetail) {
                return this.modifyTable(table);
            }
            /**
             * Registers a callback for a specific modifier event.
             *
             * @param {string} type
             * Event type as a string.
             *
             * @param {DataEventEmitter.Callback} callback
             * Function to register for an modifier callback.
             *
             * @return {Function}
             * Function to unregister callback from the modifier event.
             */
            on(type, callback) {
                return addEvent(this, type, callback);
            }
        }
        /* *
         *
         *  Class Namespace
         *
         * */
        /**
         * Additionally provided types for modifier events and options.
         * @private
         */
        (function (DataModifier) {
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
            /**
             * Registry as a record object with modifier names and their class
             * constructor.
             */
            DataModifier.types = {};
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Adds a modifier class to the registry. The modifier class has to provide
             * the `DataModifier.options` property and the `DataModifier.modifyTable`
             * method to modify the table.
             *
             * @private
             *
             * @param {string} key
             * Registry key of the modifier class.
             *
             * @param {DataModifierType} DataModifierClass
             * Modifier class (aka class constructor) to register.
             *
             * @return {boolean}
             * Returns true, if the registration was successful. False is returned, if
             * their is already a modifier registered with this key.
             */
            function registerType(key, DataModifierClass) {
                return (!!key &&
                    !DataModifier.types[key] &&
                    !!(DataModifier.types[key] = DataModifierClass));
            }
            DataModifier.registerType = registerType;
        })(DataModifier || (DataModifier = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return DataModifier;
    });
    _registerModule(_modules, 'Data/DataTable.js', [_modules['Core/Utilities.js']], function (U) {
        /* *
         *
         *  (c) 2009-2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *  - Gøran Slettemark
         *
         * */
        const { addEvent, fireEvent, uniqueKey } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Class to manage columns and rows in a table structure. It provides methods
         * to add, remove, and manipulate columns and rows, as well as to retrieve data
         * from specific cells.
         *
         * @private
         * @class
         * @name Highcharts.DataTable
         *
         * @param {Highcharts.DataTableOptions} [options]
         * Options to initialize the new DataTable instance.
         */
        class DataTable {
            /* *
             *
             *  Static Functions
             *
             * */
            /**
             * Tests whether a row contains only `null` values or is equal to
             * DataTable.NULL. If all columns have `null` values, the function returns
             * `true`. Otherwise, it returns `false` to indicate that the row contains
             * at least one non-null value.
             *
             * @function Highcharts.DataTable.isNull
             *
             * @param {Highcharts.DataTableRow|Highcharts.DataTableRowObject} row
             * Row to test.
             *
             * @return {boolean}
             * Returns `true`, if the row contains only null, otherwise `false`.
             *
             * @example
             * if (DataTable.isNull(row)) {
             *   // handle null row
             * }
             */
            static isNull(row) {
                if (row === DataTable.NULL) {
                    return true;
                }
                if (row instanceof Array) {
                    if (!row.length) {
                        return false;
                    }
                    for (let i = 0, iEnd = row.length; i < iEnd; ++i) {
                        if (row[i] !== null) {
                            return false;
                        }
                    }
                }
                else {
                    const columnNames = Object.keys(row);
                    if (!columnNames.length) {
                        return false;
                    }
                    for (let i = 0, iEnd = columnNames.length; i < iEnd; ++i) {
                        if (row[columnNames[i]] !== null) {
                            return false;
                        }
                    }
                }
                return true;
            }
            /* *
             *
             *  Constructor
             *
             * */
            /**
             * Constructs an instance of the DataTable class.
             *
             * @param {Highcharts.DataTableOptions} [options]
             * Options to initialize the new DataTable instance.
             */
            constructor(options = {}) {
                /**
                 * Dictionary of all column aliases and their mapped column. If a column
                 * for one of the get-methods matches an column alias, this column will
                 * be replaced with the mapped column by the column alias.
                 *
                 * @name Highcharts.DataTable#aliases
                 * @type {Highcharts.Dictionary<string>}
                 */
                this.aliases = (options.aliases ?
                    JSON.parse(JSON.stringify(options.aliases)) :
                    {});
                /**
                 * Whether the ID was automatic generated or given in the constructor.
                 *
                 * @name Highcharts.DataTable#autoId
                 * @type {boolean}
                 */
                this.autoId = !options.id;
                this.columns = {};
                /**
                 * ID of the table for indentification purposes.
                 *
                 * @name Highcharts.DataTable#id
                 * @type {string}
                 */
                this.id = (options.id || uniqueKey());
                this.modified = this;
                this.rowCount = 0;
                this.versionTag = uniqueKey();
                const columns = options.columns || {}, columnNames = Object.keys(columns), thisColumns = this.columns;
                let rowCount = 0;
                for (let i = 0, iEnd = columnNames.length, column, columnName; i < iEnd; ++i) {
                    columnName = columnNames[i];
                    column = columns[columnName].slice();
                    thisColumns[columnName] = column;
                    rowCount = Math.max(rowCount, column.length);
                }
                for (let i = 0, iEnd = columnNames.length; i < iEnd; ++i) {
                    thisColumns[columnNames[i]].length = rowCount;
                }
                this.rowCount = rowCount;
                const aliases = options.aliases || {}, aliasKeys = Object.keys(aliases), thisAliases = this.aliases;
                for (let i = 0, iEnd = aliasKeys.length, alias; i < iEnd; ++i) {
                    alias = aliasKeys[i];
                    thisAliases[alias] = aliases[alias];
                }
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Returns a clone of this table. The cloned table is completely independent
             * of the original, and any changes made to the clone will not affect
             * the original table.
             *
             * @function Highcharts.DataTable#clone
             *
             * @param {boolean} [skipColumns]
             * Whether to clone columns or not.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Highcharts.DataTable}
             * Clone of this data table.
             *
             * @emits #cloneTable
             * @emits #afterCloneTable
             */
            clone(skipColumns, eventDetail) {
                const table = this, tableOptions = {};
                table.emit({ type: 'cloneTable', detail: eventDetail });
                if (!skipColumns) {
                    tableOptions.aliases = table.aliases;
                    tableOptions.columns = table.columns;
                }
                if (!table.autoId) {
                    tableOptions.id = table.id;
                }
                const tableClone = new DataTable(tableOptions);
                if (!skipColumns) {
                    tableClone.versionTag = table.versionTag;
                }
                table.emit({
                    type: 'afterCloneTable',
                    detail: eventDetail,
                    tableClone
                });
                return tableClone;
            }
            /**
             * Deletes a column alias and returns the original column name. If the alias
             * is not found, the method returns `undefined`. Deleting an alias does not
             * affect the data in the table, only the way columns are accessed.
             *
             * @function Highcharts.DataTable#deleteColumnAlias
             *
             * @param {string} alias
             * The alias to delete.
             *
             * @return {string|undefined}
             * Returns the original column name, if found.
             */
            deleteColumnAlias(alias) {
                const table = this, aliases = table.aliases, deletedAlias = aliases[alias], modifier = table.modifier;
                if (deletedAlias) {
                    delete table.aliases[alias];
                    if (modifier) {
                        modifier.modifyColumns(table, { [deletedAlias]: new Array(table.rowCount) }, 0);
                    }
                }
                return deletedAlias;
            }
            /**
             * Deletes columns from the table.
             *
             * @function Highcharts.DataTable#deleteColumns
             *
             * @param {Array<string>} [columnNames]
             * Names (no alias) of columns to delete. If no array is provided, all
             * columns will be deleted.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Highcharts.DataTableColumnCollection|undefined}
             * Returns the deleted columns, if found.
             *
             * @emits #deleteColumns
             * @emits #afterDeleteColumns
             */
            deleteColumns(columnNames, eventDetail) {
                const table = this, columns = table.columns, deletedColumns = {}, modifiedColumns = {}, modifier = table.modifier, rowCount = table.rowCount;
                columnNames = (columnNames || Object.keys(columns));
                if (columnNames.length) {
                    table.emit({
                        type: 'deleteColumns',
                        columnNames,
                        detail: eventDetail
                    });
                    for (let i = 0, iEnd = columnNames.length, column, columnName; i < iEnd; ++i) {
                        columnName = columnNames[i];
                        column = columns[columnName];
                        if (column) {
                            deletedColumns[columnName] = column;
                            modifiedColumns[columnName] = new Array(rowCount);
                        }
                        delete columns[columnName];
                    }
                    if (!Object.keys(columns).length) {
                        table.rowCount = 0;
                    }
                    if (modifier) {
                        modifier.modifyColumns(table, modifiedColumns, 0, eventDetail);
                    }
                    table.emit({
                        type: 'afterDeleteColumns',
                        columns: deletedColumns,
                        columnNames,
                        detail: eventDetail
                    });
                    return deletedColumns;
                }
            }
            /**
             * Deletes rows in this table.
             *
             * @function Highcharts.DataTable#deleteRows
             *
             * @param {number} [rowIndex]
             * Index to start delete of rows. If not specified, all rows will be
             * deleted.
             *
             * @param {number} [rowCount=1]
             * Number of rows to delete.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Array<Highcharts.DataTableRow>}
             * Returns the deleted rows, if found.
             *
             * @emits #deleteRows
             * @emits #afterDeleteRows
             */
            deleteRows(rowIndex, rowCount = 1, eventDetail) {
                const table = this, deletedRows = [], modifiedRows = [], modifier = table.modifier;
                table.emit({
                    type: 'deleteRows',
                    detail: eventDetail,
                    rowCount,
                    rowIndex: (rowIndex || 0)
                });
                if (typeof rowIndex === 'undefined') {
                    rowIndex = 0;
                    rowCount = table.rowCount;
                }
                if (rowCount > 0 && rowIndex < table.rowCount) {
                    const columns = table.columns, columnNames = Object.keys(columns);
                    for (let i = 0, iEnd = columnNames.length, column, deletedCells; i < iEnd; ++i) {
                        column = columns[columnNames[i]];
                        deletedCells = column.splice(rowIndex, rowCount);
                        if (!i) {
                            table.rowCount = column.length;
                        }
                        for (let j = 0, jEnd = deletedCells.length; j < jEnd; ++j) {
                            deletedRows[j] = (deletedRows[j] || []);
                            deletedRows[j][i] = deletedCells[j];
                        }
                        modifiedRows.push(new Array(iEnd));
                    }
                }
                if (modifier) {
                    modifier.modifyRows(table, modifiedRows, (rowIndex || 0), eventDetail);
                }
                table.emit({
                    type: 'afterDeleteRows',
                    detail: eventDetail,
                    rowCount,
                    rowIndex: (rowIndex || 0),
                    rows: deletedRows
                });
                return deletedRows;
            }
            /**
             * Emits an event on this table to all registered callbacks of the given
             * event.
             * @private
             *
             * @param {DataTable.Event} e
             * Event object with event information.
             */
            emit(e) {
                const table = this;
                switch (e.type) {
                    case 'afterDeleteColumns':
                    case 'afterDeleteRows':
                    case 'afterSetCell':
                    case 'afterSetColumns':
                    case 'afterSetRows':
                        table.versionTag = uniqueKey();
                        break;
                    default:
                }
                fireEvent(table, e.type, e);
            }
            /**
             * Fetches a single cell value.
             *
             * @function Highcharts.DataTable#getCell
             *
             * @param {string} columnNameOrAlias
             * Column name or alias of the cell to retrieve.
             *
             * @param {number} rowIndex
             * Row index of the cell to retrieve.
             *
             * @return {Highcharts.DataTableCellType|undefined}
             * Returns the cell value or `undefined`.
             */
            getCell(columnNameOrAlias, rowIndex) {
                const table = this;
                columnNameOrAlias = (table.aliases[columnNameOrAlias] ||
                    columnNameOrAlias);
                const column = table.columns[columnNameOrAlias];
                if (column) {
                    return column[rowIndex];
                }
            }
            /**
             * Fetches a cell value for the given row as a boolean.
             *
             * @function Highcharts.DataTable#getCellAsBoolean
             *
             * @param {string} columnNameOrAlias
             * Column name or alias to fetch.
             *
             * @param {number} rowIndex
             * Row index to fetch.
             *
             * @return {boolean}
             * Returns the cell value of the row as a boolean.
             */
            getCellAsBoolean(columnNameOrAlias, rowIndex) {
                const table = this;
                columnNameOrAlias = (table.aliases[columnNameOrAlias] ||
                    columnNameOrAlias);
                const column = table.columns[columnNameOrAlias];
                return !!(column && column[rowIndex]);
            }
            /**
             * Fetches a cell value for the given row as a number.
             *
             * @function Highcharts.DataTable#getCellAsNumber
             *
             * @param {string} columnNameOrAlias
             * Column name or alias to fetch.
             *
             * @param {number} rowIndex
             * Row index to fetch.
             *
             * @param {boolean} [useNaN]
             * Whether to return NaN instead of `null` and `undefined`.
             *
             * @return {number|null}
             * Returns the cell value of the row as a number.
             */
            getCellAsNumber(columnNameOrAlias, rowIndex, useNaN) {
                const table = this;
                columnNameOrAlias = (table.aliases[columnNameOrAlias] ||
                    columnNameOrAlias);
                const column = table.columns[columnNameOrAlias];
                let cellValue = (column && column[rowIndex]);
                switch (typeof cellValue) {
                    case 'boolean':
                        return (cellValue ? 1 : 0);
                    case 'number':
                        return (isNaN(cellValue) && !useNaN ? null : cellValue);
                }
                cellValue = parseFloat(`${cellValue}`);
                return (isNaN(cellValue) && !useNaN ? null : cellValue);
            }
            /**
             * Fetches a cell value for the given row as a string.
             *
             * @function Highcharts.DataTable#getCellAsString
             *
             * @param {string} columnNameOrAlias
             * Column name or alias to fetch.
             *
             * @param {number} rowIndex
             * Row index to fetch.
             *
             * @return {string}
             * Returns the cell value of the row as a string.
             */
            getCellAsString(columnNameOrAlias, rowIndex) {
                const table = this;
                columnNameOrAlias = (table.aliases[columnNameOrAlias] ||
                    columnNameOrAlias);
                const column = table.columns[columnNameOrAlias];
                return `${(column && column[rowIndex])}`;
            }
            /**
             * Fetches the given column by the canonical column name or by an alias.
             * This function is a simplified wrap of {@link getColumns}.
             *
             * @function Highcharts.DataTable#getColumn
             *
             * @param {string} columnNameOrAlias
             * Name or alias of the column to get, alias takes precedence.
             *
             * @param {boolean} [asReference]
             * Whether to return the column as a readonly reference.
             *
             * @return {Highcharts.DataTableColumn|undefined}
             * A copy of the column, or `undefined` if not found.
             */
            getColumn(columnNameOrAlias, asReference) {
                return this.getColumns([columnNameOrAlias], asReference)[columnNameOrAlias];
            }
            /**
             * Fetches the given column by the canonical column name or by an alias, and
             * validates the type of the first few cells. If the first defined cell is
             * of type number, it assumes for performance reasons, that all cells are of
             * type number or `null`. Otherwise it will convert all cells to number
             * type, except `null`.
             *
             * @function Highcharts.DataTable#getColumnAsNumbers
             *
             * @param {string} columnNameOrAlias
             * Name or alias of the column to get, alias takes precedence.
             *
             * @param {boolean} [useNaN]
             * Whether to use NaN instead of `null` and `undefined`.
             *
             * @return {Array<(number|null)>}
             * A copy of the column, or an empty array if not found.
             */
            getColumnAsNumbers(columnNameOrAlias, useNaN) {
                const table = this, columns = table.columns;
                columnNameOrAlias = (table.aliases[columnNameOrAlias] ||
                    columnNameOrAlias);
                const column = columns[columnNameOrAlias], columnAsNumber = [];
                if (column) {
                    const columnLength = column.length;
                    if (useNaN) {
                        for (let i = 0; i < columnLength; ++i) {
                            columnAsNumber.push(table.getCellAsNumber(columnNameOrAlias, i, true));
                        }
                    }
                    else {
                        for (let i = 0, cellValue; i < columnLength; ++i) {
                            cellValue = column[i];
                            if (typeof cellValue === 'number') {
                                // assume unmixed data for performance reasons
                                return column.slice();
                            }
                            if (cellValue !== null &&
                                typeof cellValue !== 'undefined') {
                                break;
                            }
                        }
                        for (let i = 0; i < columnLength; ++i) {
                            columnAsNumber.push(table.getCellAsNumber(columnNameOrAlias, i));
                        }
                    }
                }
                return columnAsNumber;
            }
            /**
             * Fetches all column names.
             *
             * @function Highcharts.DataTable#getColumnNames
             *
             * @return {Array<string>}
             * Returns all column names.
             */
            getColumnNames() {
                const table = this, columnNames = Object.keys(table.columns);
                return columnNames;
            }
            /**
             * Retrieves all or the given columns.
             *
             * @function Highcharts.DataTable#getColumns
             *
             * @param {Array<string>} [columnNamesOrAliases]
             * Column names or aliases to retrieve. Aliases taking precedence.
             *
             * @param {boolean} [asReference]
             * Whether to return columns as a readonly reference.
             *
             * @return {Highcharts.DataTableColumnCollection}
             * Collection of columns. If a requested column was not found, it is
             * `undefined`.
             */
            getColumns(columnNamesOrAliases, asReference) {
                const table = this, tableAliasMap = table.aliases, tableColumns = table.columns, columns = {};
                columnNamesOrAliases = (columnNamesOrAliases || Object.keys(tableColumns));
                for (let i = 0, iEnd = columnNamesOrAliases.length, column, columnName; i < iEnd; ++i) {
                    columnName = columnNamesOrAliases[i];
                    column = tableColumns[(tableAliasMap[columnName] || columnName)];
                    if (column) {
                        columns[columnName] = (asReference ? column : column.slice());
                    }
                }
                return columns;
            }
            /**
             * Retrieves the modifier for the table.
             * @private
             *
             * @return {Highcharts.DataModifier|undefined}
             * Returns the modifier or `undefined`.
             */
            getModifier() {
                return this.modifier;
            }
            /**
             * Retrieves the row at a given index. This function is a simplified wrap of
             * {@link getRows}.
             *
             * @function Highcharts.DataTable#getRow
             *
             * @param {number} rowIndex
             * Row index to retrieve. First row has index 0.
             *
             * @param {Array<string>} [columnNamesOrAliases]
             * Column names or aliases in order to retrieve.
             *
             * @return {Highcharts.DataTableRow}
             * Returns the row values, or `undefined` if not found.
             */
            getRow(rowIndex, columnNamesOrAliases) {
                return this.getRows(rowIndex, 1, columnNamesOrAliases)[0];
            }
            /**
             * Returns the number of rows in this table.
             *
             * @function Highcharts.DataTable#getRowCount
             *
             * @return {number}
             * Number of rows in this table.
             */
            getRowCount() {
                // @todo Implement via property getter `.length` browsers supported
                return this.rowCount;
            }
            /**
             * Retrieves the index of the first row matching a specific cell value.
             *
             * @function Highcharts.DataTable#getRowIndexBy
             *
             * @param {string} columnNameOrAlias
             * Column to search in.
             *
             * @param {Highcharts.DataTableCellType} cellValue
             * Cell value to search for. `NaN` and `undefined` are not supported.
             *
             * @param {number} [rowIndexOffset]
             * Index offset to start searching.
             *
             * @return {number|undefined}
             * Index of the first row matching the cell value.
             */
            getRowIndexBy(columnNameOrAlias, cellValue, rowIndexOffset) {
                const table = this;
                columnNameOrAlias = (table.aliases[columnNameOrAlias] ||
                    columnNameOrAlias);
                const column = table.columns[columnNameOrAlias];
                if (column) {
                    const rowIndex = column.indexOf(cellValue, rowIndexOffset);
                    if (rowIndex !== -1) {
                        return rowIndex;
                    }
                }
            }
            /**
             * Retrieves the row at a given index. This function is a simplified wrap of
             * {@link getRowObjects}.
             *
             * @function Highcharts.DataTable#getRowObject
             *
             * @param {number} rowIndex
             * Row index.
             *
             * @param {Array<string>} [columnNamesOrAliases]
             * Column names or aliases and their order to retrieve.
             *
             * @return {Highcharts.DataTableRowObject}
             * Returns the row values, or `undefined` if not found.
             */
            getRowObject(rowIndex, columnNamesOrAliases) {
                return this.getRowObjects(rowIndex, 1, columnNamesOrAliases)[0];
            }
            /**
             * Fetches all or a number of rows.
             *
             * @function Highcharts.DataTable#getRowObjects
             *
             * @param {number} [rowIndex]
             * Index of the first row to fetch. Defaults to first row at index `0`.
             *
             * @param {number} [rowCount]
             * Number of rows to fetch. Defaults to maximal number of rows.
             *
             * @param {Array<string>} [columnNamesOrAliases]
             * Column names or aliases and their order to retrieve.
             *
             * @return {Highcharts.DataTableRowObject}
             * Returns retrieved rows.
             */
            getRowObjects(rowIndex = 0, rowCount = (this.rowCount - rowIndex), columnNamesOrAliases) {
                const table = this, aliases = table.aliases, columns = table.columns, rows = new Array(rowCount);
                columnNamesOrAliases = (columnNamesOrAliases || Object.keys(columns));
                for (let i = rowIndex, i2 = 0, iEnd = Math.min(table.rowCount, (rowIndex + rowCount)), column, row; i < iEnd; ++i, ++i2) {
                    row = rows[i2] = {};
                    for (const columnName of columnNamesOrAliases) {
                        column = columns[(aliases[columnName] || columnName)];
                        row[columnName] = (column ? column[i] : void 0);
                    }
                }
                return rows;
            }
            /**
             * Fetches all or a number of rows.
             *
             * @function Highcharts.DataTable#getRows
             *
             * @param {number} [rowIndex]
             * Index of the first row to fetch. Defaults to first row at index `0`.
             *
             * @param {number} [rowCount]
             * Number of rows to fetch. Defaults to maximal number of rows.
             *
             * @param {Array<string>} [columnNamesOrAliases]
             * Column names or aliases and their order to retrieve.
             *
             * @return {Highcharts.DataTableRow}
             * Returns retrieved rows.
             */
            getRows(rowIndex = 0, rowCount = (this.rowCount - rowIndex), columnNamesOrAliases) {
                const table = this, aliases = table.aliases, columns = table.columns, rows = new Array(rowCount);
                columnNamesOrAliases = (columnNamesOrAliases || Object.keys(columns));
                for (let i = rowIndex, i2 = 0, iEnd = Math.min(table.rowCount, (rowIndex + rowCount)), column, row; i < iEnd; ++i, ++i2) {
                    row = rows[i2] = [];
                    for (const columnName of columnNamesOrAliases) {
                        column = columns[(aliases[columnName] || columnName)];
                        row.push(column ? column[i] : void 0);
                    }
                }
                return rows;
            }
            /**
             * Returns the unique version tag of the current state of the table.
             *
             * @function Highcharts.DataTable#getVersionTag
             *
             * @return {string}
             * Unique version tag.
             */
            getVersionTag() {
                return this.versionTag;
            }
            /**
             * Checks for given column names or aliases.
             *
             * @function Highcharts.DataTable#hasColumns
             *
             * @param {Array<string>} columnNamesOrAliases
             * Column names of aliases to check.
             *
             * @return {boolean}
             * Returns `true` if all columns have been found, otherwise `false`.
             */
            hasColumns(columnNamesOrAliases) {
                const table = this, aliases = table.aliases, columns = table.columns;
                for (let i = 0, iEnd = columnNamesOrAliases.length, columnName; i < iEnd; ++i) {
                    columnName = columnNamesOrAliases[i];
                    if (!columns[columnName] && !aliases[columnName]) {
                        return false;
                    }
                }
                return true;
            }
            /**
             * Searches for a specific cell value.
             *
             * @function Highcharts.DataTable#hasRowWith
             *
             * @param {string} columnNameOrAlias
             * Column to search in.
             *
             * @param {Highcharts.DataTableCellType} cellValue
             * Cell value to search for. `NaN` and `undefined` are not supported.
             *
             * @return {boolean}
             * True, if a row has been found, otherwise false.
             */
            hasRowWith(columnNameOrAlias, cellValue) {
                const table = this;
                columnNameOrAlias = (table.aliases[columnNameOrAlias] ||
                    columnNameOrAlias);
                const column = table.columns[columnNameOrAlias];
                if (column) {
                    return (column.indexOf(cellValue) !== -1);
                }
                return false;
            }
            /**
             * Registers a callback for a specific event.
             *
             * @function Highcharts.DataTable#on
             *
             * @param {string} type
             * Event type as a string.
             *
             * @param {Highcharts.EventCallbackFunction<Highcharts.DataTable>} callback
             * Function to register for an event callback.
             *
             * @return {Function}
             * Function to unregister callback from the event.
             */
            on(type, callback) {
                return addEvent(this, type, callback);
            }
            /**
             * Renames a column of cell values.
             *
             * @function Highcharts.DataTable#renameColumn
             *
             * @param {string} columnName
             * Name of the column to be renamed.
             *
             * @param {string} newColumnName
             * New name of the column. An existing column with the same name will be
             * replaced.
             *
             * @return {boolean}
             * Returns `true` if successful, `false` if the column was not found.
             */
            renameColumn(columnName, newColumnName) {
                const table = this, columns = table.columns;
                if (columns[columnName]) {
                    if (columnName !== newColumnName) {
                        const aliases = table.aliases;
                        if (aliases[newColumnName]) {
                            delete aliases[newColumnName];
                        }
                        columns[newColumnName] = columns[columnName];
                        delete columns[columnName];
                    }
                    return true;
                }
                return false;
            }
            /**
             * Sets a cell value based on the row index and column name or alias.  Will
             * insert a new column, if not found.
             *
             * @function Highcharts.DataTable#setCell
             *
             * @param {string} columnNameOrAlias
             * Column name or alias to set.
             *
             * @param {number|undefined} rowIndex
             * Row index to set.
             *
             * @param {Highcharts.DataTableCellType} cellValue
             * Cell value to set.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @emits #setCell
             * @emits #afterSetCell
             */
            setCell(columnNameOrAlias, rowIndex, cellValue, eventDetail) {
                const table = this, columns = table.columns, modifier = table.modifier;
                columnNameOrAlias = (table.aliases[columnNameOrAlias] ||
                    columnNameOrAlias);
                let column = columns[columnNameOrAlias];
                if (column && column[rowIndex] === cellValue) {
                    return;
                }
                table.emit({
                    type: 'setCell',
                    cellValue,
                    columnName: columnNameOrAlias,
                    detail: eventDetail,
                    rowIndex
                });
                if (!column) {
                    column = columns[columnNameOrAlias] = new Array(table.rowCount);
                }
                if (rowIndex >= table.rowCount) {
                    table.rowCount = (rowIndex + 1);
                }
                column[rowIndex] = cellValue;
                if (modifier) {
                    modifier.modifyCell(table, columnNameOrAlias, rowIndex, cellValue);
                }
                table.emit({
                    type: 'afterSetCell',
                    cellValue,
                    columnName: columnNameOrAlias,
                    detail: eventDetail,
                    rowIndex
                });
            }
            /**
             * Sets cell values for a column. Will insert a new column, if not found.
             *
             * @function Highcharts.DataTable#setColumn
             *
             * @param {string} columnNameOrAlias
             * Column name or alias to set.
             *
             * @param {Highcharts.DataTableColumn} [column]
             * Values to set in the column.
             *
             * @param {number} [rowIndex=0]
             * Index of the first row to change. (Default: 0)
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @emits #setColumns
             * @emits #afterSetColumns
             */
            setColumn(columnNameOrAlias, column = [], rowIndex = 0, eventDetail) {
                this.setColumns({ [columnNameOrAlias]: column }, rowIndex, eventDetail);
            }
            /**
             * Sets cell values for multiple columns. Will insert new columns, if not
             * found.
             *
             * @function Highcharts.DataTable#setColumns
             *
             * @param {Highcharts.DataTableColumnCollection} columns
             * Columns as a collection, where the keys are the column names or aliases.
             *
             * @param {number} [rowIndex]
             * Index of the first row to change. Keep undefined to reset.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @emits #setColumns
             * @emits #afterSetColumns
             */
            setColumns(columns, rowIndex, eventDetail) {
                const table = this, tableColumns = table.columns, tableModifier = table.modifier, tableRowCount = table.rowCount, reset = (typeof rowIndex === 'undefined'), columnNames = Object.keys(columns);
                table.emit({
                    type: 'setColumns',
                    columns,
                    columnNames,
                    detail: eventDetail,
                    rowIndex
                });
                for (let i = 0, iEnd = columnNames.length, column, columnName; i < iEnd; ++i) {
                    columnName = columnNames[i];
                    column = columns[columnName];
                    columnName = (table.aliases[columnName] ||
                        columnName);
                    if (reset) {
                        tableColumns[columnName] = column.slice();
                        table.rowCount = column.length;
                    }
                    else {
                        const tableColumn = (tableColumns[columnName] ?
                            tableColumns[columnName] :
                            tableColumns[columnName] = new Array(table.rowCount));
                        for (let i = (rowIndex || 0), iEnd = column.length; i < iEnd; ++i) {
                            tableColumn[i] = column[i];
                        }
                        table.rowCount = Math.max(table.rowCount, tableColumn.length);
                    }
                }
                const tableColumnNames = Object.keys(tableColumns);
                for (let i = 0, iEnd = tableColumnNames.length; i < iEnd; ++i) {
                    tableColumns[tableColumnNames[i]].length = table.rowCount;
                }
                if (tableModifier) {
                    tableModifier.modifyColumns(table, columns, (rowIndex || 0));
                }
                table.emit({
                    type: 'afterSetColumns',
                    columns,
                    columnNames,
                    detail: eventDetail,
                    rowIndex
                });
            }
            /**
             * Sets or unsets the modifier for the table.
             * @private
             *
             * @param {Highcharts.DataModifier} [modifier]
             * Modifier to set, or `undefined` to unset.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Promise<Highcharts.DataTable>}
             * Resolves to this table if successfull, or rejects on failure.
             *
             * @emits #setModifier
             * @emits #afterSetModifier
             */
            setModifier(modifier, eventDetail) {
                const table = this;
                let promise;
                table.emit({
                    type: 'setModifier',
                    detail: eventDetail,
                    modifier,
                    modified: table.modified
                });
                table.modified = table;
                table.modifier = modifier;
                if (modifier) {
                    promise = modifier.modify(table);
                }
                else {
                    promise = Promise.resolve(table);
                }
                return promise
                    .then((table) => {
                    table.emit({
                        type: 'afterSetModifier',
                        detail: eventDetail,
                        modifier,
                        modified: table.modified
                    });
                    return table;
                })['catch']((error) => {
                    table.emit({
                        type: 'setModifierError',
                        error,
                        modifier,
                        modified: table.modified
                    });
                    throw error;
                });
            }
            /**
             * Sets cell values of a row. Will insert a new row, if no index was
             * provided, or if the index is higher than the total number of table rows.
             *
             * Note: This function is just a simplified wrap of
             * {@link Highcharts.DataTable#setRows}.
             *
             * @function Highcharts.DataTable#setRow
             *
             * @param {Highcharts.DataTableRow|Highcharts.DataTableRowObject} row
             * Cell values to set.
             *
             * @param {number} [rowIndex]
             * Index of the row to set. Leave `undefind` to add as a new row.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @emits #setRows
             * @emits #afterSetRows
             */
            setRow(row, rowIndex, eventDetail) {
                this.setRows([row], rowIndex, eventDetail);
            }
            /**
             * Sets cell values for multiple rows. Will insert new rows, if no index was
             * was provided, or if the index is higher than the total number of table
             * rows.
             *
             * @function Highcharts.DataTable#setRows
             *
             * @param {Array<(Highcharts.DataTableRow|Highcharts.DataTableRowObject)>} rows
             * Row values to set.
             *
             * @param {number} [rowIndex]
             * Index of the first row to set. Leave `undefind` to add as new rows.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @emits #setRows
             * @emits #afterSetRows
             */
            setRows(rows, rowIndex = this.rowCount, eventDetail) {
                const table = this, aliases = table.aliases, columns = table.columns, columnNames = Object.keys(columns), modifier = table.modifier, rowCount = rows.length;
                table.emit({
                    type: 'setRows',
                    detail: eventDetail,
                    rowCount,
                    rowIndex,
                    rows
                });
                for (let i = 0, i2 = rowIndex, row; i < rowCount; ++i, ++i2) {
                    row = rows[i];
                    if (row === DataTable.NULL) {
                        for (let j = 0, jEnd = columnNames.length; j < jEnd; ++j) {
                            columns[columnNames[j]][i2] = null;
                        }
                    }
                    else if (row instanceof Array) {
                        for (let j = 0, jEnd = columnNames.length; j < jEnd; ++j) {
                            columns[columnNames[j]][i2] = row[j];
                        }
                    }
                    else {
                        const rowColumnNames = Object.keys(row);
                        for (let j = 0, jEnd = rowColumnNames.length, rowColumnName; j < jEnd; ++j) {
                            rowColumnName = rowColumnNames[j];
                            rowColumnName = (aliases[rowColumnName] || rowColumnName);
                            if (!columns[rowColumnName]) {
                                columns[rowColumnName] = new Array(i2 + 1);
                            }
                            columns[rowColumnName][i2] = row[rowColumnName];
                        }
                    }
                }
                const indexRowCount = (rowIndex + rowCount);
                if (indexRowCount > table.rowCount) {
                    table.rowCount = indexRowCount;
                    for (let i = 0, iEnd = columnNames.length; i < iEnd; ++i) {
                        columns[columnNames[i]].length = indexRowCount;
                    }
                }
                if (modifier) {
                    modifier.modifyRows(table, rows, rowIndex);
                }
                table.emit({
                    type: 'afterSetRows',
                    detail: eventDetail,
                    rowCount,
                    rowIndex,
                    rows
                });
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        /**
         * Null state for a row record. In some cases, a row in a table may not
         * contain any data or may be invalid. In these cases, a null state can be
         * used to indicate that the row record is empty or invalid.
         *
         * @name Highcharts.DataTable.NULL
         * @type {Highcharts.DataTableRowObject}
         *
         * @see {@link Highcharts.DataTable.isNull} for a null test.
         *
         * @example
         * table.setRows([DataTable.NULL, DataTable.NULL], 10);
         */
        DataTable.NULL = {};
        /**
         * Semantic version string of the DataTable class.
         * @internal
         */
        DataTable.version = '1.0.0';
        /* *
         *
         *  Default Export
         *
         * */

        return DataTable;
    });
    _registerModule(_modules, 'Data/Connectors/DataConnector.js', [_modules['Data/Modifiers/DataModifier.js'], _modules['Data/DataTable.js'], _modules['Core/Utilities.js']], function (DataModifier, DataTable, U) {
        /* *
         *
         *  (c) 2009-2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *  - Wojciech Chmiel
         *  - Gøran Slettemark
         *
         * */
        const { addEvent, fireEvent, merge, pick } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Abstract class providing an interface for managing a DataConnector.
         *
         * @private
         */
        class DataConnector {
            /* *
             *
             *  Constructor
             *
             * */
            /**
             * Constructor for the connector class.
             *
             * @param {DataConnector.UserOptions} [options]
             * Options to use in the connector.
             */
            constructor(options = {}) {
                this.table = new DataTable(options.dataTable);
                this.metadata = options.metadata || { columns: {} };
            }
            /**
             * Poll timer ID, if active.
             */
            get polling() {
                return !!this.polling;
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Method for adding metadata for a single column.
             *
             * @param {string} name
             * The name of the column to be described.
             *
             * @param {DataConnector.MetaColumn} columnMeta
             * The metadata to apply to the column.
             */
            describeColumn(name, columnMeta) {
                const connector = this, columns = connector.metadata.columns;
                columns[name] = merge(columns[name] || {}, columnMeta);
            }
            /**
             * Method for applying columns meta information to the whole DataConnector.
             *
             * @param {Highcharts.Dictionary<DataConnector.MetaColumn>} columns
             * Pairs of column names and MetaColumn objects.
             */
            describeColumns(columns) {
                const connector = this, columnNames = Object.keys(columns);
                let columnName;
                while (typeof (columnName = columnNames.pop()) === 'string') {
                    connector.describeColumn(columnName, columns[columnName]);
                }
            }
            /**
             * Emits an event on the connector to all registered callbacks of this
             * event.
             *
             * @param {DataConnector.Event} [e]
             * Event object containing additional event information.
             */
            emit(e) {
                fireEvent(this, e.type, e);
            }
            /**
             * Returns the order of columns.
             *
             * @param {boolean} [usePresentationState]
             * Whether to use the column order of the presentation state of the table.
             *
             * @return {Array<string>|undefined}
             * Order of columns.
             */
            getColumnOrder(usePresentationState) {
                const connector = this, columns = connector.metadata.columns, names = Object.keys(columns || {});
                if (names.length) {
                    return names.sort((a, b) => (pick(columns[a].index, 0) - pick(columns[b].index, 0)));
                }
            }
            /**
             * Retrieves the columns of the the dataTable,
             * applies column order from meta.
             *
             * @param {boolean} [usePresentationOrder]
             * Whether to use the column order of the presentation state of the table.
             *
             * @return {Highcharts.DataTableColumnCollection}
             * An object with the properties `columnNames` and `columnValues`
             */
            getSortedColumns(usePresentationOrder) {
                return this.table.getColumns(this.getColumnOrder(usePresentationOrder));
            }
            /**
             * The default load method, which fires the `afterLoad` event
             *
             * @return {Promise<DataConnector>}
             * The loaded connector.
             *
             * @emits DataConnector#afterLoad
             */
            load() {
                fireEvent(this, 'afterLoad', { table: this.table });
                return Promise.resolve(this);
            }
            /**
             * Registers a callback for a specific connector event.
             *
             * @param {string} type
             * Event type as a string.
             *
             * @param {DataEventEmitter.Callback} callback
             * Function to register for the connector callback.
             *
             * @return {Function}
             * Function to unregister callback from the connector event.
             */
            on(type, callback) {
                return addEvent(this, type, callback);
            }
            /**
             * The default save method, which fires the `afterSave` event.
             *
             * @return {Promise<DataConnector>}
             * The saved connector.
             *
             * @emits DataConnector#afterSave
             * @emits DataConnector#saveError
             */
            save() {
                fireEvent(this, 'saveError', { table: this.table });
                return Promise.reject(new Error('Not implemented'));
            }
            /**
             * Sets the index and order of columns.
             *
             * @param {Array<string>} columnNames
             * Order of columns.
             */
            setColumnOrder(columnNames) {
                const connector = this;
                for (let i = 0, iEnd = columnNames.length; i < iEnd; ++i) {
                    connector.describeColumn(columnNames[i], { index: i });
                }
            }
            setModifierOptions(modifierOptions) {
                const ModifierClass = (modifierOptions &&
                    DataModifier.types[modifierOptions.type]);
                return this.table
                    .setModifier(ModifierClass ?
                    new ModifierClass(modifierOptions) :
                    void 0)
                    .then(() => this);
            }
            /**
             * Starts polling new data after the specific time span in milliseconds.
             *
             * @param {number} refreshTime
             * Refresh time in milliseconds between polls.
             */
            startPolling(refreshTime = 1000) {
                const connector = this;
                window.clearTimeout(connector._polling);
                connector._polling = window.setTimeout(() => connector
                    .load()['catch']((error) => connector.emit({
                    type: 'loadError',
                    error,
                    table: connector.table
                }))
                    .then(() => {
                    if (connector._polling) {
                        connector.startPolling(refreshTime);
                    }
                }), refreshTime);
            }
            /**
             * Stops polling data.
             */
            stopPolling() {
                const connector = this;
                window.clearTimeout(connector._polling);
                delete connector._polling;
            }
            /**
             * Retrieves metadata from a single column.
             *
             * @param {string} name
             * The identifier for the column that should be described
             *
             * @return {DataConnector.MetaColumn|undefined}
             * Returns a MetaColumn object if found.
             */
            whatIs(name) {
                return this.metadata.columns[name];
            }
        }
        /* *
         *
         *  Class Namespace
         *
         * */
        (function (DataConnector) {
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
            /**
             * Registry as a record object with connector names and their class.
             */
            DataConnector.types = {};
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Adds a connector class to the registry. The connector has to provide the
             * `DataConnector.options` property and the `DataConnector.load` method to
             * modify the table.
             *
             * @private
             *
             * @param {string} key
             * Registry key of the connector class.
             *
             * @param {DataConnectorType} DataConnectorClass
             * Connector class (aka class constructor) to register.
             *
             * @return {boolean}
             * Returns true, if the registration was successful. False is returned, if
             * their is already a connector registered with this key.
             */
            function registerType(key, DataConnectorClass) {
                return (!!key &&
                    !DataConnector.types[key] &&
                    !!(DataConnector.types[key] = DataConnectorClass));
            }
            DataConnector.registerType = registerType;
        })(DataConnector || (DataConnector = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return DataConnector;
    });
    _registerModule(_modules, 'Dashboards/Components/ComponentRegistry.js', [_modules['Core/Utilities.js']], function (U) {
        /* *
         *
         *  (c) 2009 - 2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { merge } = U;
        /* *
         *
         *  Namespace
         *
         * */
        var ComponentRegistry;
        (function (ComponentRegistry) {
            /* *
             *
             *  Constants
             *
             * */
            /**
             *
             * Record of component classes
             * @todo
             *
             */
            ComponentRegistry.types = {};
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Method used to register new component classes.
             *
             * @param {string} key
             * Registry key of the component class.
             *
             * @param {ComponentType} DataConnectorClass
             * Component class (aka class constructor) to register.
             */
            function registerComponent(key, ComponentClass) {
                return (!!key &&
                    !ComponentRegistry.types[key] &&
                    !!(ComponentRegistry.types[key] = ComponentClass));
            }
            ComponentRegistry.registerComponent = registerComponent;
        })(ComponentRegistry || (ComponentRegistry = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return ComponentRegistry;
    });
    _registerModule(_modules, 'Dashboards/Globals.js', [], function () {
        /* *
         *
         *  (c) 2009 - 2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sebastian Bochan
         *  - Wojciech Chmiel
         *  - Gøran Slettemark
         *  - Sophie Bremer
         *  - Pawel Lysy
         *  - Karol Kolodziej
         *
         * */
        /* *
         *
         *  Namespace
         *
         * */
        /**
         * Global Dashboards namespace in classic `<scripts>`-based implementations.
         *
         * @namespace Dashboards
         */
        var Globals;
        (function (Globals) {
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
            /**
             * Prefix of a GUIElement HTML class name.
             */
            Globals.classNamePrefix = 'highcharts-dashboards-';
            /** @internal */
            Globals.classNames = {
                layout: Globals.classNamePrefix + 'layout',
                cell: Globals.classNamePrefix + 'cell',
                cellHover: Globals.classNamePrefix + 'cell-state-hover',
                cellActive: Globals.classNamePrefix + 'cell-state-active',
                cellLoading: Globals.classNamePrefix + 'cell-state-loading',
                row: Globals.classNamePrefix + 'row',
                layoutsWrapper: Globals.classNamePrefix + 'layouts-wrapper',
                boardContainer: Globals.classNamePrefix + 'wrapper'
            };
            /** @internal */
            Globals.guiElementType = {
                row: 'row',
                cell: 'cell',
                layout: 'layout'
            };
            /** @internal */
            Globals.responsiveBreakpoints = {
                small: 'small',
                medium: 'medium',
                large: 'large'
            };
            /**
             * Contains all Board instances of this window.
             */
            Globals.boards = [];
            /**
             * Reference to the window used by Dashboards.
             */
            Globals.win = window;
        })(Globals || (Globals = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return Globals;
    });
    _registerModule(_modules, 'Dashboards/Actions/Bindings.js', [_modules['Dashboards/Components/ComponentRegistry.js'], _modules['Dashboards/Globals.js'], _modules['Core/Utilities.js']], function (ComponentRegistry, Globals, U) {
        /* *
         *
         *  (c) 2009 - 2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sebastian Bochan
         *  - Wojciech Chmiel
         *  - Gøran Slettemark
         *  - Sophie Bremer
         *
         * */
        const { addEvent, fireEvent, error } = U;
        /* *
         *
         *  Namespace
         *
         * */
        var Bindings;
        (function (Bindings) {
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
            function getGUIElement(idOrElement) {
                const container = typeof idOrElement === 'string' ?
                    document.getElementById(idOrElement) : idOrElement;
                let guiElement;
                if (container !== null) {
                    fireEvent(container, 'bindedGUIElement', {}, function (e) {
                        guiElement = e.guiElement;
                    });
                }
                return guiElement;
            }
            async function addComponent(options, cell) {
                const optionsStates = options.states;
                const optionsEvents = options.events;
                cell = cell || Bindings.getCell(options.cell || '');
                if (!cell?.container || !options.type) {
                    error(`The component is misconfigured and is unable to find the
                        HTML cell element ${options.cell} to render the content.`);
                    return;
                }
                const componentContainer = cell.container;
                let ComponentClass = ComponentRegistry.types[options.type];
                if (!ComponentClass) {
                    error(`The component's type ${options.type} does not exist.`);
                    ComponentClass =
                        ComponentRegistry.types['HTML'];
                    options.title = {
                        text: cell.row.layout.board?.editMode?.lang.errorMessage,
                        className: Globals.classNamePrefix + 'component-title-error ' +
                            Globals.classNamePrefix + 'component-title'
                    };
                }
                const component = new ComponentClass(cell, options);
                const promise = component.load()['catch']((e) => {
                    // eslint-disable-next-line no-console
                    console.error(e);
                    component.update({
                        connector: {
                            id: ''
                        },
                        title: {
                            text: cell?.row.layout.board?.editMode?.lang.errorMessage,
                            className: Globals.classNamePrefix + 'component-title-error ' +
                                Globals.classNamePrefix + 'component-title'
                        }
                    });
                });
                fireEvent(component, 'mount');
                component.setCell(cell);
                cell.mountedComponent = component;
                cell.row.layout.board.mountedComponents.push({
                    options: options,
                    component: component,
                    cell: cell
                });
                // events
                if (optionsEvents && optionsEvents.click) {
                    addEvent(componentContainer, 'click', () => {
                        optionsEvents.click();
                        if (cell &&
                            component &&
                            componentContainer &&
                            optionsStates &&
                            optionsStates.active) {
                            cell.setActiveState();
                        }
                    });
                }
                // states
                if (optionsStates?.hover) {
                    componentContainer.classList.add(Globals.classNames.cellHover);
                }
                fireEvent(component, 'afterLoad');
                return promise;
            }
            Bindings.addComponent = addComponent;
            /** @internal */
            function componentFromJSON(json, cellContainer // @todo
            ) {
                let componentClass = ComponentRegistry.types[json.$class];
                if (!componentClass) {
                    return;
                }
                const cell = Bindings.getCell(json.options.cell || '');
                if (!cell) {
                    return;
                }
                const component = componentClass.fromJSON(json, cell);
                if (component) {
                    component.render();
                }
                return component;
            }
            Bindings.componentFromJSON = componentFromJSON;
            function getCell(idOrElement) {
                const cell = getGUIElement(idOrElement);
                if (!(cell && cell.getType() === 'cell')) {
                    return;
                }
                return cell;
            }
            Bindings.getCell = getCell;
            function getRow(idOrElement) {
                const row = getGUIElement(idOrElement);
                if (!(row && row.getType() === 'row')) {
                    return;
                }
                return row;
            }
            Bindings.getRow = getRow;
            function getLayout(idOrElement) {
                const layout = getGUIElement(idOrElement);
                if (!(layout && layout.getType() === 'layout')) {
                    return;
                }
                return layout;
            }
            Bindings.getLayout = getLayout;
        })(Bindings || (Bindings = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return Bindings;
    });
    _registerModule(_modules, 'Dashboards/Accessibility/DashboardsAccessibility.js', [], function () {
        /* *
         *
         *  (c) 2009 - 2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sebastian Bochan
         *
         * */
        /* *
         *
         *  Functions
         *
         * */
        /* *
         *
         *  Class
         *
         * */
        class DashboardsAccessibility {
            /* *
            *
            *  Constructor
            *
            * */
            constructor(board) {
                this.board = board;
                this.addTabIndexToCells();
            }
            /* *
            *
            *  Functions
            *
            * */
            addTabIndexToCells() {
                const components = this.board.mountedComponents;
                let cell;
                for (let i = 0, iEnd = components.length; i < iEnd; ++i) {
                    cell = components[i].cell;
                    if (cell && cell.container) {
                        cell.container.setAttribute('tabindex', -1);
                    }
                }
            }
        }
        // namespace DashboardsAccessibility { }
        /* *
         *
         *  Default Export
         *
         * */

        return DashboardsAccessibility;
    });
    _registerModule(_modules, 'Data/DataCursor.js', [], function () {
        /* *
         *
         *  (c) 2020-2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *
         * */
        /* *
         *
         *  Class
         *
         * */
        /**
         * This class manages state cursors pointing on {@link Data.DataTable}. It
         * creates a relation between states of the user interface and the table cells,
         * columns, or rows.
         *
         * @class
         * @name Data.DataCursor
         */
        class DataCursor {
            /* *
             *
             *  Constructor
             *
             * */
            constructor(stateMap = {}) {
                this.emittingRegister = [];
                this.listenerMap = {};
                this.stateMap = stateMap;
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * This function registers a listener for a specific state and table.
             *
             * @example
             * ```TypeScript
             * dataCursor.addListener(myTable.id, 'hover', (e: DataCursor.Event) => {
             *     if (e.cursor.type === 'position') {
             *         console.log(`Hover over row #${e.cursor.row}.`);
             *     }
             * });
             * ```
             *
             * @function #addListener
             *
             * @param {Data.DataCursor.TableId} tableId
             * The ID of the table to listen to.
             *
             * @param {Data.DataCursor.State} state
             * The state on the table to listen to.
             *
             * @param {Data.DataCursor.Listener} listener
             * The listener to register.
             *
             * @return {Data.DataCursor}
             * Returns the DataCursor instance for a call chain.
             */
            addListener(tableId, state, listener) {
                const listenerMap = this.listenerMap[tableId] = (this.listenerMap[tableId] ||
                    {});
                const listeners = listenerMap[state] = (listenerMap[state] ||
                    []);
                listeners.push(listener);
                return this;
            }
            /**
             * @private
             */
            buildEmittingTag(e) {
                return (e.cursor.type === 'position' ?
                    [
                        e.table.id,
                        e.cursor.column,
                        e.cursor.row,
                        e.cursor.state,
                        e.cursor.type
                    ] :
                    [
                        e.table.id,
                        e.cursor.columns,
                        e.cursor.firstRow,
                        e.cursor.lastRow,
                        e.cursor.state,
                        e.cursor.type
                    ]).join('\0');
            }
            // Implementation
            emitCursor(table, groupOrCursor, cursorOrEvent, eventOrLasting, lasting) {
                const cursor = (typeof groupOrCursor === 'object' ?
                    groupOrCursor :
                    cursorOrEvent), event = (typeof eventOrLasting === 'object' ?
                    eventOrLasting :
                    cursorOrEvent), group = (typeof groupOrCursor === 'string' ?
                    groupOrCursor :
                    void 0), tableId = table.id, state = cursor.state, listeners = (this.listenerMap[tableId] &&
                    this.listenerMap[tableId][state]);
                lasting = (lasting || eventOrLasting === true);
                if (listeners) {
                    const stateMap = this.stateMap[tableId] = (this.stateMap[tableId] ||
                        {});
                    const cursors = stateMap[cursor.state] || [];
                    if (lasting) {
                        if (!cursors.length) {
                            stateMap[cursor.state] = cursors;
                        }
                        if (DataCursor.getIndex(cursor, cursors) === -1) {
                            cursors.push(cursor);
                        }
                    }
                    const e = {
                        cursor,
                        cursors,
                        table
                    };
                    if (event) {
                        e.event = event;
                    }
                    if (group) {
                        e.group = group;
                    }
                    const emittingRegister = this.emittingRegister, emittingTag = this.buildEmittingTag(e);
                    if (emittingRegister.indexOf(emittingTag) >= 0) {
                        // break call stack loops
                        return this;
                    }
                    try {
                        this.emittingRegister.push(emittingTag);
                        for (let i = 0, iEnd = listeners.length; i < iEnd; ++i) {
                            listeners[i].call(this, e);
                        }
                    }
                    finally {
                        const index = this.emittingRegister.indexOf(emittingTag);
                        if (index >= 0) {
                            this.emittingRegister.splice(index, 1);
                        }
                    }
                }
                return this;
            }
            /**
             * Removes a lasting state cursor.
             *
             * @function #remitCursor
             *
             * @param {string} tableId
             * ID of the related cursor table.
             *
             * @param {Data.DataCursor.Type} cursor
             * Copy or reference of the cursor.
             *
             * @return {Data.DataCursor}
             * Returns the DataCursor instance for a call chain.
             */
            remitCursor(tableId, cursor) {
                const cursors = (this.stateMap[tableId] &&
                    this.stateMap[tableId][cursor.state]);
                if (cursors) {
                    const index = DataCursor.getIndex(cursor, cursors);
                    if (index >= 0) {
                        cursors.splice(index, 1);
                    }
                }
                return this;
            }
            /**
             * This function removes a listener.
             *
             * @function #addListener
             *
             * @param {Data.DataCursor.TableId} tableId
             * The ID of the table the listener is connected to.
             *
             * @param {Data.DataCursor.State} state
             * The state on the table the listener is listening to.
             *
             * @param {Data.DataCursor.Listener} listener
             * The listener to deregister.
             *
             * @return {Data.DataCursor}
             * Returns the DataCursor instance for a call chain.
             */
            removeListener(tableId, state, listener) {
                const listeners = (this.listenerMap[tableId] &&
                    this.listenerMap[tableId][state]);
                if (listeners) {
                    const index = listeners.indexOf(listener);
                    if (index) {
                        listeners.splice(index, 1);
                    }
                }
                return this;
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        /**
         * Semantic version string of the DataCursor class.
         * @internal
         */
        DataCursor.version = '1.0.0';
        /* *
         *
         *  Class Namespace
         *
         * */
        /**
         * @class Data.DataCursor
         */
        (function (DataCursor) {
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
             * Finds the index of an cursor in an array.
             * @private
             */
            function getIndex(needle, cursors) {
                if (needle.type === 'position') {
                    for (let cursor, i = 0, iEnd = cursors.length; i < iEnd; ++i) {
                        cursor = cursors[i];
                        if (cursor.type === 'position' &&
                            cursor.state === needle.state &&
                            cursor.column === needle.column &&
                            cursor.row === needle.row) {
                            return i;
                        }
                    }
                }
                else {
                    const columnNeedle = JSON.stringify(needle.columns);
                    for (let cursor, i = 0, iEnd = cursors.length; i < iEnd; ++i) {
                        cursor = cursors[i];
                        if (cursor.type === 'range' &&
                            cursor.state === needle.state &&
                            cursor.firstRow === needle.firstRow &&
                            cursor.lastRow === needle.lastRow &&
                            JSON.stringify(cursor.columns) === columnNeedle) {
                            return i;
                        }
                    }
                }
                return -1;
            }
            DataCursor.getIndex = getIndex;
            /**
             * Checks whether two cursor share the same properties.
             * @private
             */
            function isEqual(cursorA, cursorB) {
                if (cursorA.type === 'position' && cursorB.type === 'position') {
                    return (cursorA.column === cursorB.column &&
                        cursorA.row === cursorB.row &&
                        cursorA.state === cursorB.state);
                }
                if (cursorA.type === 'range' && cursorB.type === 'range') {
                    return (cursorA.firstRow === cursorB.firstRow &&
                        cursorA.lastRow === cursorB.lastRow &&
                        (JSON.stringify(cursorA.columns) ===
                            JSON.stringify(cursorB.columns)));
                }
                return false;
            }
            DataCursor.isEqual = isEqual;
            /**
             * Checks whether a cursor is in a range.
             * @private
             */
            function isInRange(needle, range) {
                if (range.type === 'position') {
                    range = toRange(range);
                }
                if (needle.type === 'position') {
                    needle = toRange(needle, range);
                }
                const needleColumns = needle.columns;
                const rangeColumns = range.columns;
                return (needle.firstRow >= range.firstRow &&
                    needle.lastRow <= range.lastRow &&
                    (!needleColumns ||
                        !rangeColumns ||
                        needleColumns.every((column) => rangeColumns.indexOf(column) >= 0)));
            }
            DataCursor.isInRange = isInRange;
            /**
             * @private
             */
            function toPositions(cursor) {
                if (cursor.type === 'position') {
                    return [cursor];
                }
                const columns = (cursor.columns || []);
                const positions = [];
                const state = cursor.state;
                for (let row = cursor.firstRow, rowEnd = cursor.lastRow; row < rowEnd; ++row) {
                    if (!columns.length) {
                        positions.push({
                            type: 'position',
                            row,
                            state
                        });
                        continue;
                    }
                    for (let column = 0, columnEnd = columns.length; column < columnEnd; ++column) {
                        positions.push({
                            type: 'position',
                            column: columns[column],
                            row,
                            state
                        });
                    }
                }
                return positions;
            }
            DataCursor.toPositions = toPositions;
            /**
             * @private
             */
            function toRange(cursor, defaultRange) {
                if (cursor.type === 'range') {
                    return cursor;
                }
                const range = {
                    type: 'range',
                    firstRow: (cursor.row ??
                        (defaultRange && defaultRange.firstRow) ??
                        0),
                    lastRow: (cursor.row ??
                        (defaultRange && defaultRange.lastRow) ??
                        Number.MAX_VALUE),
                    state: cursor.state
                };
                if (typeof cursor.column !== 'undefined') {
                    range.columns = [cursor.column];
                }
                return range;
            }
            DataCursor.toRange = toRange;
        })(DataCursor || (DataCursor = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return DataCursor;
    });
    _registerModule(_modules, 'Dashboards/Serializable.js', [], function () {
        /* *
         *
         *  (c) 2009 - 2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *
         * */
        /* *
         *
         *  Namespace
         *
         * */
        /**
         * Contains the toolset to serialize class instance to JSON and deserialize JSON
         * to class instances.
         * @internal
         * @private
         */
        var Serializable;
        (function (Serializable) {
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
            /**
             * Registry of serializable classes.
             */
            const classRegistry = {};
            /**
             * Registry of function sets.
             */
            const helperRegistry = {};
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Creates a class instance from the given JSON, if a suitable serializer
             * has been found.
             *
             * @function Serializable.fromJSON
             *
             * @param {Serializable.JSON} json
             * JSON to create a class instance or object from.
             *
             * @return {Globals.AnyRecord}
             * Returns the class instance or object, or throws an exception.
             */
            function fromJSON(json) {
                const $class = json.$class;
                if (typeof $class !== 'string') {
                    throw new Error('JSON has no $class property.');
                }
                const classs = classRegistry[$class];
                if (classs) {
                    return classs.fromJSON(json);
                }
                const helper = helperRegistry[$class];
                if (helper) {
                    return helper.fromJSON(json);
                }
                throw new Error(`'${$class}' unknown.`);
            }
            Serializable.fromJSON = fromJSON;
            /**
             * Registers a class prototype for the given JSON $class.
             *
             * @function Serializable.registerClassPrototype
             *
             * @param {string} $class
             * JSON $class to register for.
             *
             * @param {Serializable} classPrototype
             * Class to register.
             */
            function registerClassPrototype($class, classPrototype) {
                if (classRegistry[$class]) {
                    throw new Error('A serializer for \'' + $class + '\' is already registered.');
                }
                classRegistry[$class] = classPrototype;
            }
            Serializable.registerClassPrototype = registerClassPrototype;
            /**
             * Registers helper functions for the given JSON $class.
             *
             * @function Serializable.registerHelper
             *
             * @param {Helper} helperFunctions
             * Helper functions to register.
             */
            function registerHelper(helperFunctions) {
                if (helperRegistry[helperFunctions.$class]) {
                    throw new Error('A serializer for \'' + helperFunctions.$class +
                        '\' is already registered.');
                }
                helperRegistry[helperFunctions.$class] = helperFunctions;
            }
            Serializable.registerHelper = registerHelper;
            /**
             * Creates JSON from a class instance.
             *
             * @function Serializable.toJSON
             *
             * @param {Globals.AnyRecord} obj
             * Class instance or object to serialize as JSON.
             *
             * @return {Serializable.JSON}
             * JSON of the class instance.
             */
            function toJSON(obj) {
                if (typeof obj.fromJSON === 'function' &&
                    typeof obj.toJSON === 'function') {
                    return obj.toJSON();
                }
                const classes = Object.keys(helperRegistry), numberOfHelpers = classes.length;
                let $class, serializer;
                for (let i = 0; i < numberOfHelpers; ++i) {
                    $class = classes[i];
                    serializer = helperRegistry[$class];
                    if (serializer.jsonSupportFor(obj)) {
                        return serializer.toJSON(obj);
                    }
                }
                throw new Error('Object is not supported.');
            }
            Serializable.toJSON = toJSON;
        })(Serializable || (Serializable = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return Serializable;
    });
    _registerModule(_modules, 'Dashboards/SerializeHelper/DataCursorHelper.js', [_modules['Data/DataCursor.js'], _modules['Dashboards/Serializable.js']], function (DataCursor, Serializable) {
        /* *
         *
         *  (c) 2009 - 2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *
         * */
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Converts the given JSON to a class instance.
         *
         * @param {DataCursorHelper.JSON} json
         * JSON to deserialize as a class instance or object.
         *
         * @return {DataCursor}
         * Returns the class instance or object, or throws an exception.
         */
        function fromJSON(json) {
            return new DataCursor(json.stateMap);
        }
        /**
         * Validates the given class instance for JSON support.
         *
         * @param {Globals.AnyRecord} obj
         * Class instance or object to validate.
         *
         * @return {boolean}
         * Returns true, if the function set can convert the given object, otherwise
         * false.
         */
        function jsonSupportFor(obj) {
            return obj instanceof DataCursor;
        }
        /**
         * Converts the given class instance to JSON.
         *
         * @param {DataTable} obj
         * Class instance or object to serialize as JSON.
         *
         * @return {DataTableHelper.JSON}
         * Returns the JSON of the class instance or object.
         */
        function toJSON(obj) {
            const stateMap = obj.stateMap, stateMapJSON = {}, tableIds = Object.keys(obj.stateMap);
            let cursors, cursorsJSON, tableId, state, states;
            for (let i = 0, iEnd = tableIds.length; i < iEnd; ++i) {
                tableId = tableIds[i];
                states = Object.keys(stateMap[tableId]);
                stateMapJSON[tableId] = {};
                for (let j = 0, jEnd = states.length; j < jEnd; ++j) {
                    state = states[j];
                    cursors = stateMap[tableId][state];
                    stateMapJSON[tableId][state] = cursorsJSON = [];
                    for (let k = 0, kEnd = cursors.length; k < kEnd; ++k) {
                        cursorsJSON.push({ ...cursors[k] });
                    }
                }
            }
            return {
                $class: 'Data.DataCursor',
                stateMap: stateMapJSON
            };
        }
        /* *
         *
         *  Registry
         *
         * */
        const DataCursorHelper = {
            $class: 'Data.DataCursor',
            fromJSON,
            jsonSupportFor,
            toJSON
        };
        Serializable.registerHelper(DataCursorHelper);
        /* *
         *
         *  Default Export
         *
         * */

        return DataCursorHelper;
    });
    _registerModule(_modules, 'Data/DataPoolDefaults.js', [], function () {
        /* *
         *
         *  (c) 2009-2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *
         * */
        /* *
         *
         *  API Options
         *
         * */
        const DataPoolDefaults = {
            connectors: []
        };
        /* *
         *
         *  Export Defaults
         *
         * */

        return DataPoolDefaults;
    });
    _registerModule(_modules, 'Data/DataPool.js', [_modules['Data/Connectors/DataConnector.js'], _modules['Data/DataPoolDefaults.js'], _modules['Core/Utilities.js']], function (DataConnector, DataPoolDefaults, U) {
        /* *
         *
         *  (c) 2009-2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *
         * */
        /* *
         *
         *  Class
         *
         * */
        /**
         * Data pool to load connectors on-demand.
         *
         * @class
         * @name Data.DataPool
         *
         * @param {Data.DataPoolOptions} options
         * Pool options with all connectors.
         */
        class DataPool {
            /* *
             *
             *  Constructor
             *
             * */
            constructor(options = DataPoolDefaults) {
                options.connectors = (options.connectors || []);
                this.connectors = {};
                this.options = options;
                this.waiting = {};
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Emits an event on this data pool to all registered callbacks of the given
             * event.
             * @private
             *
             * @param {DataTable.Event} e
             * Event object with event information.
             */
            emit(e) {
                U.fireEvent(this, e.type, e);
            }
            /**
             * Loads the connector.
             *
             * @function Data.DataPool#getConnector
             *
             * @param {string} name
             * Name of the connector.
             *
             * @return {Promise<Data.DataConnector>}
             * Returns the connector.
             */
            getConnector(name) {
                const connector = this.connectors[name];
                // already loaded
                if (connector) {
                    return Promise.resolve(connector);
                }
                let waitingList = this.waiting[name];
                // start loading
                if (!waitingList) {
                    waitingList = this.waiting[name] = [];
                    const connectorOptions = this.getConnectorOptions(name);
                    if (!connectorOptions) {
                        throw new Error(`Connector not found. (${name})`);
                    }
                    // eslint-disable-next-line @typescript-eslint/no-floating-promises
                    this
                        .loadConnector(connectorOptions)
                        .then((connector) => {
                        delete this.waiting[name];
                        for (let i = 0, iEnd = waitingList.length; i < iEnd; ++i) {
                            waitingList[i][0](connector);
                        }
                    })['catch']((error) => {
                        delete this.waiting[name];
                        for (let i = 0, iEnd = waitingList.length; i < iEnd; ++i) {
                            waitingList[i][1](error);
                        }
                    });
                }
                // add request to waiting list
                return new Promise((resolve, reject) => {
                    waitingList.push([resolve, reject]);
                });
            }
            /**
             * Returns the names of all connectors.
             *
             * @private
             *
             * @return {Array<string>}
             * Names of all connectors.
             */
            getConnectorIds() {
                const connectors = this.options.connectors, connectorIds = [];
                for (let i = 0, iEnd = connectors.length; i < iEnd; ++i) {
                    connectorIds.push(connectors[i].id);
                }
                return connectorIds;
            }
            /**
             * Loads the options of the connector.
             *
             * @private
             *
             * @param {string} id
             * Name of the connector.
             *
             * @return {DataPoolConnectorOptions|undefined}
             * Returns the options of the connector, or `undefined` if not found.
             */
            getConnectorOptions(id) {
                const connectors = this.options.connectors;
                for (let i = 0, iEnd = connectors.length; i < iEnd; ++i) {
                    if (connectors[i].id === id) {
                        return connectors[i];
                    }
                }
            }
            /**
             * Loads the connector table.
             *
             * @function Data.DataPool#getConnectorTable
             *
             * @param {string} connectorId
             * Name of the connector.
             *
             * @return {Promise<Data.DataTable>}
             * Returns the connector table.
             */
            getConnectorTable(connectorId) {
                return this
                    .getConnector(connectorId)
                    .then((connector) => connector.table);
            }
            /**
             * Creates and loads the connector.
             *
             * @private
             *
             * @param {Data.DataPoolConnectorOptions} options
             * Options of connector.
             *
             * @return {Promise<Data.DataConnector>}
             * Returns the connector.
             */
            loadConnector(options) {
                return new Promise((resolve, reject) => {
                    this.emit({
                        type: 'load',
                        options
                    });
                    const ConnectorClass = DataConnector.types[options.type];
                    if (!ConnectorClass) {
                        throw new Error(`Connector type not found. (${options.type})`);
                    }
                    const connector = new ConnectorClass(options.options);
                    // eslint-disable-next-line @typescript-eslint/no-floating-promises
                    connector
                        .load()
                        .then((connector) => {
                        this.connectors[options.id] = connector;
                        this.emit({
                            type: 'afterLoad',
                            options
                        });
                        resolve(connector);
                    })['catch'](reject);
                });
            }
            /**
             * Registers a callback for a specific event.
             *
             * @function Highcharts.DataPool#on
             *
             * @param {string} type
             * Event type as a string.
             *
             * @param {Highcharts.EventCallbackFunction<Highcharts.DataPool>} callback
             * Function to register for an event callback.
             *
             * @return {Function}
             * Function to unregister callback from the event.
             */
            on(type, callback) {
                return U.addEvent(this, type, callback);
            }
            /**
             * Sets connector options with a specific name.
             *
             * @param {Data.DataPoolConnectorOptions} options
             * Connector options to set.
             */
            setConnectorOptions(options) {
                const connectors = this.options.connectors;
                this.emit({
                    type: 'setConnectorOptions',
                    options
                });
                for (let i = 0, iEnd = connectors.length; i < iEnd; ++i) {
                    if (connectors[i].id === options.id) {
                        connectors.splice(i, 1);
                        break;
                    }
                }
                connectors.push(options);
                this.emit({
                    type: 'afterSetConnectorOptions',
                    options
                });
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        /**
         * Semantic version string of the DataPool class.
         * @internal
         */
        DataPool.version = '1.0.0';
        /* *
         *
         *  Default Export
         *
         * */

        return DataPool;
    });
    _registerModule(_modules, 'Dashboards/EditMode/EditGlobals.js', [_modules['Dashboards/Globals.js']], function (DG) {
        /* *
         *
         *  (c) 2009 - 2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sebastian Bochan
         *  - Wojciech Chmiel
         *  - Gøran Slettemark
         *  - Sophie Bremer
         *
         * */
        const PREFIX = DG.classNamePrefix + 'edit-';
        /**
         * @internal
         */
        const EditGlobals = {
            classNames: {
                resizeSnap: PREFIX + 'resize-snap',
                resizeSnapX: PREFIX + 'resize-snap-x',
                resizeSnapY: PREFIX + 'resize-snap-y',
                separator: PREFIX + 'separator',
                contextMenuBtn: PREFIX + 'context-menu-btn',
                contextMenu: PREFIX + 'context-menu',
                contextMenuItem: PREFIX + 'context-menu-item',
                editModeEnabled: PREFIX + 'enabled',
                editToolbar: PREFIX + 'toolbar',
                editToolbarCellOutline: PREFIX + 'toolbar-cell-outline',
                editToolbarRowOutline: PREFIX + 'toolbar-row-outline',
                editToolbarItem: PREFIX + 'toolbar-item',
                editToolbarRow: PREFIX + 'toolbar-row',
                editToolbarCell: PREFIX + 'toolbar-cell',
                editSidebar: PREFIX + 'sidebar',
                editSidebarShow: PREFIX + 'sidebar-show',
                editSidebarHide: PREFIX + 'sidebar-hide',
                editSidebarTitle: PREFIX + 'sidebar-title',
                editSidebarMenuItem: PREFIX + 'sidebar-item',
                rowContextHighlight: PREFIX + 'row-context-highlight',
                cellEditHighlight: PREFIX + 'cell-highlight',
                dashboardCellEditHighlightActive: PREFIX + 'cell-highlight-active',
                dragMock: PREFIX + 'drag-mock',
                dropPointer: PREFIX + 'drop-pointer',
                contextDetectionPointer: PREFIX + 'ctx-detection-pointer',
                resizePointer: PREFIX + 'resize-pointer',
                currentEditedElement: PREFIX + 'unmask',
                maskElement: PREFIX + 'mask',
                menuItem: PREFIX + 'menu-item',
                menu: PREFIX + 'menu',
                menuVerticalSeparator: PREFIX + 'menu-vertical-separator',
                menuHorizontalSeparator: PREFIX + 'menu-horizontal-separator',
                menuDestroy: PREFIX + 'menu-destroy',
                editSidebarWrapper: PREFIX + 'sidebar-wrapper',
                customSelect: PREFIX + 'custom-select',
                customSelectButton: PREFIX + 'custom-option-button',
                toggleContainer: PREFIX + 'toggle-container',
                toggleWrapper: PREFIX + 'toggle-wrapper',
                toggleSlider: PREFIX + 'toggle-slider',
                toggleWrapperColored: PREFIX + 'toggle-wrapper-colored',
                toggleLabels: PREFIX + 'toggle-labels',
                button: PREFIX + 'button',
                sidebarNavButton: PREFIX + 'sidebar-button-nav',
                labelText: PREFIX + 'label-text',
                editSidebarTabBtn: PREFIX + 'sidebar-tab-btn',
                editToolsBtn: PREFIX + 'tools-btn',
                editTools: PREFIX + 'tools',
                editGridItems: PREFIX + 'grid-items',
                // Confirmation popup
                confirmationPopup: PREFIX + 'confirmation-popup',
                popupButtonContainer: PREFIX + 'confirmation-popup-button-container',
                popupContentContainer: PREFIX + 'confirmation-popup-content',
                popupCancelBtn: PREFIX + 'confirmation-popup-cancel-btn',
                popupConfirmBtn: PREFIX + 'confirmation-popup-confirm-btn',
                popupCloseButton: PREFIX + 'popup-close',
                editOverlay: PREFIX + 'overlay',
                editOverlayActive: PREFIX + 'overlay-active',
                resizerMenuBtnActive: PREFIX + 'resizer-menu-btn-active',
                sidebarCloseButton: PREFIX + 'close-btn',
                editSidebarTabBtnWrapper: PREFIX + 'tabs-buttons-wrapper',
                editSidebarRight: PREFIX + 'sidebar-right',
                editSidebarRightShow: PREFIX + 'sidebar-right-show',
                viewFullscreen: PREFIX + 'view-fullscreen',
                // Accordion
                accordionMenu: PREFIX + 'accordion-menu',
                accordionContainer: PREFIX + 'accordion',
                accordionHeader: PREFIX + 'accordion-header',
                accordionHeaderBtn: PREFIX + 'accordion-header-btn',
                accordionHeaderIcon: PREFIX + 'accordion-header-icon',
                accordionContent: PREFIX + 'accordion-content',
                accordionNestedWrapper: PREFIX + 'accordion-nested',
                accordionMenuButtonsContainer: PREFIX + 'accordion-menu-buttons-container',
                accordionMenuButton: PREFIX + 'accordion-menu-button',
                hiddenElement: PREFIX + 'hidden-element',
                collapsableContentHeader: PREFIX + 'collapsable-content-header',
                // Custom dropdown with icons
                collapsedElement: PREFIX + 'collapsed-element',
                dropdown: PREFIX + 'dropdown',
                dropdownContent: PREFIX + 'dropdown-content',
                dropdownButton: PREFIX + 'dropdown-button',
                dropdownButtonContent: PREFIX + 'dropdown-button-content',
                dropdownIcon: PREFIX + 'pointer',
                icon: PREFIX + 'icon'
            },
            lang: {
                accessibility: {
                    contextMenu: {
                        button: 'Context menu'
                    }
                },
                addComponent: 'Add component',
                cancelButton: 'Cancel',
                caption: 'Caption',
                chartClassName: 'Chart class name',
                chartConfig: 'Chart configuration',
                chartID: 'Chart ID',
                chartOptions: 'Chart options',
                chartType: 'Chart type',
                connectorName: 'Connector name',
                confirmButton: 'Confirm',
                confirmDestroyCell: 'Do you really want to destroy the cell?',
                confirmDestroyRow: 'Do you really want to destroy the row?',
                dataLabels: 'Data labels',
                editMode: 'Edit mode',
                errorMessage: 'Something went wrong',
                exitFullscreen: 'Exit full screen',
                id: 'Id',
                large: 'Large',
                medium: 'Medium',
                off: 'off',
                on: 'on',
                pointFormat: 'Point format',
                settings: 'Settings',
                small: 'Small',
                style: 'Styles',
                title: 'Title',
                viewFullscreen: 'View in full screen'
            }
        };

        return EditGlobals;
    });
    _registerModule(_modules, 'Dashboards/EditMode/EditRenderer.js', [_modules['Dashboards/EditMode/EditGlobals.js'], _modules['Core/Utilities.js']], function (EditGlobals, U) {
        /* *
         *
         *  (c) 2009 - 2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sebastian Bochan
         *  - Wojciech Chmiel
         *  - Gøran Slettemark
         *  - Sophie Bremer
         *
         * */
        const { merge, createElement, defined } = U;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Function to create a context button.
         * @internal
         *
         * @param parentElement
         * The element to which the new element should be appended.
         *
         * @param editMode
         * EditMode instance.
         *
         * @returns
         * Context button element.
         */
        function renderContextButton(parentNode, editMode) {
            let ctxBtnElement;
            if (editMode.options.contextMenu) {
                ctxBtnElement = createElement('button', {
                    className: EditGlobals.classNames.contextMenuBtn,
                    onclick: function () {
                        editMode.onContextBtnClick();
                    }
                }, {
                    'background-image': 'url(' +
                        editMode.options.contextMenu.icon +
                        ')'
                }, parentNode);
                ctxBtnElement.setAttribute('aria-label', editMode.lang.accessibility.contextMenu.button);
                ctxBtnElement.setAttribute('aria-expanded', 'false');
            }
            return ctxBtnElement;
        }
        /**
         * Creates the collapsable header element.
         * @internal
         *
         * @param parentElement
         * The HTMLElement to which the element should be rendered to.
         *
         * @param options
         * Nested header options.
         *
         * @returns the outer element and content in the collapsable div.
         */
        function renderCollapseHeader(parentElement, options) {
            const { name, showToggle, onchange, isEnabled, isNested, lang } = options;
            const accordion = createElement('div', {
                className: EditGlobals.classNames[isNested ? 'accordionNestedWrapper' : 'accordionContainer'] + ' ' + EditGlobals.classNames.collapsableContentHeader
            }, {}, parentElement);
            const header = createElement('div', {
                className: EditGlobals.classNames.accordionHeader
            }, {}, accordion);
            const headerBtn = createElement('button', { className: EditGlobals.classNames.accordionHeaderBtn }, {}, header);
            createElement('span', {
                textContent: lang[name] || name
            }, {}, headerBtn);
            if (showToggle) {
                renderToggle(header, {
                    enabledOnOffLabels: true,
                    id: name,
                    name: '',
                    onchange: onchange,
                    value: isEnabled || false,
                    lang
                });
            }
            const headerIcon = createElement('span', {
                className: EditGlobals.classNames.accordionHeaderIcon + ' ' +
                    EditGlobals.classNames.collapsedElement
            }, {}, headerBtn);
            const content = createElement('div', {
                className: EditGlobals.classNames.accordionContent + ' ' +
                    EditGlobals.classNames.hiddenElement
            }, {}, accordion);
            headerBtn.addEventListener('click', function () {
                content.classList.toggle(EditGlobals.classNames.hiddenElement);
                headerIcon.classList.toggle(EditGlobals.classNames.collapsedElement);
            });
            return { outerElement: accordion, content: content };
        }
        /**
         * Function to create select element.
         *
         * @param parentElement
         * The element to which the new element should be appended.
         *
         * @param options
         * Select form field options.
         *
         * @returns
         * Select element
         */
        function renderSelect(parentElement, options) {
            if (!parentElement) {
                return;
            }
            if (options.name) {
                renderText(parentElement, { title: options.name, isLabel: true });
            }
            const iconsURLPrefix = options.iconsURLPrefix || '';
            const customSelect = createElement('div', {
                className: EditGlobals.classNames.dropdown +
                    ' ' +
                    EditGlobals.classNames.collapsableContentHeader
            }, {}, parentElement);
            const btn = createElement('button', {
                className: EditGlobals.classNames.dropdownButton
            }, {}, customSelect);
            const btnContent = createElement('div', {
                className: EditGlobals.classNames.dropdownButtonContent
            }, {}, btn);
            const iconURL = (U.find(options.selectOptions, (item) => item.name === options.value) || {}).iconURL;
            let headerIcon;
            if (iconURL) {
                headerIcon = createElement('img', {
                    src: iconsURLPrefix + iconURL,
                    className: EditGlobals.classNames.icon
                }, {}, btnContent);
            }
            const placeholder = createElement('span', {
                textContent: options.value,
                id: options.id || ''
            }, {}, btnContent);
            const dropdownPointer = createElement('img', {
                className: EditGlobals.classNames.dropdownIcon +
                    ' ' +
                    EditGlobals.classNames.collapsedElement,
                src: iconsURLPrefix + 'dropdown-pointer.svg'
            }, {}, btn);
            const dropdown = createElement('ul', {
                className: EditGlobals.classNames.dropdownContent +
                    ' ' +
                    EditGlobals.classNames.hiddenElement
            }, {}, customSelect);
            btn.addEventListener('click', function () {
                dropdown.classList.toggle(EditGlobals.classNames.hiddenElement);
                dropdownPointer.classList.toggle(EditGlobals.classNames.collapsedElement);
            });
            for (let i = 0, iEnd = options.selectOptions.length; i < iEnd; ++i) {
                renderSelectElement(merge(options.selectOptions[i] || {}, { iconsURLPrefix }), dropdown, placeholder, options.id, dropdownPointer, headerIcon, options.onchange);
            }
            return customSelect;
        }
        /**
         * @internal
         */
        function renderSelectElement(option, dropdown, placeholder, id, dropdownPointer, headerIcon, callback) {
            const iconURL = option.iconsURLPrefix + option.iconURL;
            const selectOption = createElement('li', {}, {}, dropdown);
            const selectOptionBtn = createElement('button', { className: EditGlobals.classNames.customSelectButton }, {}, selectOption);
            let icon;
            if (option.iconURL) {
                icon = createElement('img', {
                    src: iconURL
                }, {}, selectOptionBtn);
            }
            createElement('span', { textContent: option.name || '' }, {}, selectOptionBtn);
            selectOptionBtn.addEventListener('click', function () {
                dropdown.classList.add(EditGlobals.classNames.hiddenElement);
                dropdownPointer.classList.toggle(EditGlobals.classNames.collapsedElement);
                placeholder.textContent = option.name || '';
                if (headerIcon && option.iconURL) {
                    headerIcon.src = iconURL;
                }
                if (callback) {
                    return callback(option.name);
                }
            });
        }
        /**
         * Function to create toggle element.
         *
         * @param parentElement
         * The element to which the new element should be appended.
         *
         * @param options
         * Form field options
         *
         * @returns
         * Toggle element
         */
        function renderToggle(parentElement, options) {
            if (!parentElement) {
                return;
            }
            const { value, lang } = options;
            const title = options.title || options.name;
            const toggleContainer = createElement('div', { className: EditGlobals.classNames.toggleContainer }, {}, parentElement);
            if (title) {
                renderText(toggleContainer, { title });
            }
            if (options.enabledOnOffLabels) {
                EditRenderer.renderText(toggleContainer, {
                    title: lang.off,
                    className: EditGlobals.classNames.toggleLabels
                });
            }
            const toggle = createElement('label', {
                className: EditGlobals.classNames.toggleWrapper +
                    ' ' + (options.className || '')
            }, {}, toggleContainer);
            const input = renderCheckbox(toggle, value);
            const callbackFn = options.onchange;
            if (input && callbackFn) {
                toggleContainer.addEventListener('click', (e) => {
                    callbackFn(!input.checked);
                    input.checked = !input.checked;
                });
            }
            const slider = createElement('span', {
                className: EditGlobals.classNames.toggleSlider
            }, {}, toggle);
            callbackFn && slider.addEventListener('click', (e) => {
                e.preventDefault();
            });
            if (options.enabledOnOffLabels) {
                EditRenderer.renderText(toggleContainer, {
                    title: lang.on,
                    className: EditGlobals.classNames.toggleLabels
                });
            }
            return toggleContainer;
        }
        /**
         * Function to create text element.
         *
         * @param parentElement
         * The element to which the new element should be appended
         *
         * @param text
         * Text to be displayed
         *
         * @param callback
         * Callback function to be fired on the click
         *
         * @returns text Element
         */
        function renderText(parentElement, options) {
            let textElem;
            const { title: text, className, isLabel } = options;
            if (parentElement) {
                const labelFor = isLabel ? { htmlFor: text } : {};
                textElem = createElement(isLabel ? 'label' : 'div', {
                    className: EditGlobals.classNames.labelText + ' ' + (className || ''),
                    textContent: text,
                    ...labelFor
                }, {}, parentElement);
            }
            return textElem;
        }
        /**
         * Function to create Icon element.
         *
         * @param parentElement
         * The element to which the new element should be appended.
         *
         * @param icon
         * Icon URL
         *
         * @param callback
         * Callback function
         *
         * @returns
         * Icon Element
         */
        function renderIcon(parentElement, options) {
            const { icon, callback } = options;
            if (!parentElement) {
                return;
            }
            const iconElem = createElement('div', {
                onclick: callback,
                className: options.className || ''
            }, {}, parentElement);
            iconElem.style['background-image'] = 'url(' + icon + ')';
            const mousedown = options.mousedown;
            const click = options.click;
            if (mousedown) {
                iconElem.onmousedown = function () {
                    mousedown.apply(this, arguments);
                };
            }
            if (click) {
                iconElem.addEventListener('click', function () {
                    click.apply(this, arguments);
                });
            }
            return iconElem;
        }
        /**
         * Function to create input element.
         *
         * @param parentElement
         * the element to which the new element should be appended
         *
         * @param options
         * Form field options
         *
         * @returns
         * Input Element
         */
        function renderInput(parentElement, options) {
            if (!parentElement) {
                return;
            }
            if (options.name) {
                renderText(parentElement, { title: options.name, isLabel: true });
            }
            const input = createElement('input', {
                type: 'text',
                onclick: options.callback,
                id: options.id || '',
                name: options.name || '',
                value: ((defined(options.value) &&
                    options.value.toString().replace(/\"/g, '')) || '')
            }, {}, parentElement);
            const onchange = options.onchange;
            if (onchange) {
                input.addEventListener('change', function (e) {
                    onchange(e.target.value);
                });
            }
            return input;
        }
        /**
         * Function to create textarea element.
         *
         * @param parentElement
         * The element to which the new element should be appended
         *
         * @param options
         * Form field options
         *
         * @returns
         * textarea Element
         */
        function renderTextarea(parentElement, options) {
            if (!parentElement) {
                return;
            }
            if (options.name) {
                renderText(parentElement, { title: options.name, isLabel: true });
            }
            const textarea = createElement('textarea', {
                id: options.id,
                name: options.name,
                value: options.value || ''
            }, {}, parentElement);
            const onchange = options.onchange;
            if (onchange) {
                textarea.addEventListener('change', function (e) {
                    onchange(e.target.value);
                });
            }
            return textarea;
        }
        /**
         * Function to render the input of type checkbox.
         *
         * @param parentElement
         * An element to which render the checkbox to
         *
         * @param checked
         * Whether the checkbox should be checked or not.
         *
         * @returns
         * The checkbox element
         */
        function renderCheckbox(parentElement, checked) {
            let input;
            if (parentElement) {
                input = createElement('input', {
                    type: 'checkbox',
                    checked: !!checked
                }, {}, parentElement);
            }
            return input;
        }
        /**
         * Function to create button element.
         *
         * @param parentElement
         * the element to which the new element should be appended
         *
         * @param options
         * Button field options
         *
         * @returns
         * Button Element
         */
        function renderButton(parentElement, options) {
            let button;
            if (!parentElement) {
                return;
            }
            button = createElement('button', {
                className: (EditGlobals.classNames.button + ' ' +
                    (options.className || '')),
                onclick: options.callback,
                textContent: options.text
            }, options.style || {}, parentElement);
            if (options.icon) {
                button.style['background-image'] =
                    'url(' + options.icon + ')';
            }
            return button;
        }
        /**
         * Get the renderer function based on the type of the element to render.
         *
         * @param type
         * Type of the element to render
         *
         * @returns
         * function to render a specific element
         */
        function getRendererFunction(type) {
            return {
                select: renderSelect,
                toggle: renderToggle,
                text: renderText,
                collapse: renderCollapseHeader,
                icon: renderIcon,
                contextButton: renderContextButton,
                input: renderInput,
                textarea: renderTextarea,
                checkbox: renderCheckbox,
                button: renderButton
            }[type];
        }
        const EditRenderer = {
            renderSelect,
            renderToggle,
            renderText,
            renderCollapseHeader,
            renderIcon,
            renderContextButton,
            renderInput,
            renderTextarea,
            renderCheckbox,
            renderButton,
            getRendererFunction
        };

        return EditRenderer;
    });
    _registerModule(_modules, 'Dashboards/EditMode/Menu/MenuItem.js', [_modules['Dashboards/EditMode/EditGlobals.js'], _modules['Core/Utilities.js'], _modules['Dashboards/EditMode/EditRenderer.js']], function (EditGlobals, U, EditRenderer) {
        /* *
         *
         *  (c) 2009 - 2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sebastian Bochan
         *  - Wojciech Chmiel
         *  - Gøran Slettemark
         *  - Sophie Bremer
         *
         * */
        const { createElement, merge } = U;
        class MenuItem {
            /* *
            *
            *  Constructor
            *
            * */
            constructor(menu, options) {
                this.menu = menu;
                this.isActive = false;
                this.options = merge(MenuItem.defaultOptions, options);
                this.container = this.setContainer();
                this.innerElement = this.setInnerElement();
            }
            /* *
            *
            *  Functions
            *
            * */
            setContainer() {
                const item = this, options = item.options;
                let className = EditGlobals.classNames.menuItem;
                if (item.menu.options.itemsClassName) {
                    className += ' ' + item.menu.options.itemsClassName;
                }
                if (options.className) {
                    className += ' ' + options.className;
                }
                return createElement('div', { className: className || '' }, merge(this.options.style || {}, 
                // to remove
                this.isActive ? { display: 'block' } : {}), this.menu.container);
            }
            setInnerElement() {
                const item = this, options = item.options, container = item.container, langKey = options.langKey;
                if (options.type === 'toggle') {
                    return EditRenderer.renderToggle(container, {
                        id: options.id,
                        name: options.id,
                        title: langKey ?
                            this.menu.editMode.lang[langKey] :
                            options.text,
                        value: !!(options.getValue && options.getValue(item)),
                        lang: this.menu.editMode.lang,
                        onchange: options.events?.click?.bind(item)
                    });
                }
                if (options.type === 'text') {
                    return EditRenderer.renderText(container, {
                        title: langKey ?
                            this.menu.editMode.lang[langKey] :
                            options.text || '',
                        className: options.className || ''
                    });
                }
                if (options.type === 'icon') {
                    return EditRenderer.renderIcon(container, {
                        icon: options.icon || '',
                        mousedown: options.events?.onmousedown?.bind(item),
                        click: options.events?.click?.bind(item)
                    });
                }
                if (options.type === 'button') {
                    return EditRenderer.renderButton(container, {
                        callback: options.events?.click?.bind(item),
                        className: options.className || '',
                        style: options.style || {},
                        text: langKey ?
                            this.menu.editMode.lang[langKey] :
                            (options.text || '')
                    });
                }
            }
            update() {
                const item = this, options = item.options;
                if (options.events && options.events.update) {
                    options.events.update.apply(item, arguments);
                }
            }
            activate() {
                const item = this;
                item.update();
                // Temp.
                if (item.container) {
                    item.isActive = true;
                    item.container.style.display = 'block';
                }
            }
            deactivate() {
                const item = this;
                // Temp.
                if (item.container) {
                    item.isActive = false;
                    item.container.style.display = 'none';
                }
            }
        }
        /* *
        *
        *  Static Properties
        *
        * */
        MenuItem.defaultOptions = {
            id: '',
            type: 'text'
        };

        return MenuItem;
    });
    _registerModule(_modules, 'Dashboards/EditMode/Menu/MenuItemBindings.js', [], function () {
        /* *
         *
         *  (c) 2009 - 2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sebastian Bochan
         *  - Wojciech Chmiel
         *  - Gøran Slettemark
         *  - Sophie Bremer
         *
         * */
        const MenuItemBindings = {
            /* *
            *
            *  Context menu
            *
            * */
            viewFullscreen: {
                id: 'viewFullscreen',
                type: 'button',
                langKey: 'viewFullscreen',
                events: {
                    click: function (e) {
                        const fullScreen = this.menu.editMode.board.fullscreen;
                        if (fullScreen) {
                            fullScreen.toggle();
                        }
                    }
                }
            }
        };

        return MenuItemBindings;
    });
    _registerModule(_modules, 'Dashboards/EditMode/Menu/Menu.js', [_modules['Dashboards/EditMode/EditGlobals.js'], _modules['Core/Utilities.js'], _modules['Dashboards/EditMode/Menu/MenuItem.js'], _modules['Dashboards/EditMode/Menu/MenuItemBindings.js']], function (EditGlobals, U, MenuItem, MenuItemBindings) {
        /* *
         *
         *  (c) 2009 - 2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sebastian Bochan
         *  - Wojciech Chmiel
         *  - Gøran Slettemark
         *  - Sophie Bremer
         *
         * */
        const { createElement, merge } = U;
        class Menu {
            /* *
            *
            *  Constructor
            *
            * */
            constructor(parentElement, options, editMode, parent) {
                this.parentElement = parentElement;
                this.isVisible = false;
                this.activeItems = [];
                this.options = options;
                this.items = {};
                this.editMode = editMode;
                if (parent) {
                    this.parent = parent;
                }
                this.container = this.setContainer();
            }
            /* *
            *
            *  Functions
            *
            * */
            setContainer() {
                return createElement('div', {
                    className: EditGlobals.classNames.menu +
                        ' ' + (this.options.className || '')
                }, {}, this.parentElement);
            }
            // ItemsSchemas - default items definitions.
            initItems(itemsSchemas, activeItems) {
                const menu = this, optionsItems = menu.options.items || [];
                let itemSchema, itemConfig, item, options;
                for (let i = 0, iEnd = optionsItems.length; i < iEnd; ++i) {
                    itemConfig = optionsItems[i];
                    itemSchema =
                        typeof itemConfig === 'string' ? itemsSchemas[itemConfig] :
                            itemConfig.id ? itemsSchemas[itemConfig.id] :
                                {};
                    options = typeof itemConfig === 'string' ?
                        merge(itemSchema, { id: itemConfig }) :
                        merge(itemSchema, itemConfig);
                    if (options.id) {
                        item = new MenuItem(menu, options);
                        // Save initialized item.
                        menu.items[item.options.id] = item;
                        if (activeItems) {
                            item.activate();
                            menu.activeItems.push(item);
                        }
                    }
                    else {
                        // Error - defined item needs an id.
                    }
                }
            }
            setActiveItems(items) {
                const menu = this;
                let item;
                // Deactivate items.
                for (let i = 0, iEnd = menu.activeItems.length; i < iEnd; ++i) {
                    if (items.indexOf(menu.activeItems[i].options.id) === -1) {
                        menu.activeItems[i].deactivate();
                    }
                }
                menu.activeItems.length = 0;
                for (let j = 0, jEnd = items.length; j < jEnd; ++j) {
                    item = menu.items[items[j]];
                    if (item) {
                        // Activate item.
                        if (!item.isActive) {
                            item.activate();
                        }
                        else {
                            item.update();
                        }
                        menu.activeItems.push(item);
                    }
                }
            }
            deactivateActiveItems() {
                const menu = this;
                for (let i = 0, iEnd = menu.activeItems.length; i < iEnd; ++i) {
                    menu.activeItems[i].deactivate();
                }
            }
            updateActiveItems() {
                const activeItems = this.activeItems;
                for (let i = 0, iEnd = activeItems.length; i < iEnd; ++i) {
                    activeItems[i].update();
                }
            }
            destroy() {
                this.activeItems.length = 0;
                this.container.remove();
                this.items = {};
                this.options = {};
            }
        }
        /* *
        *
        *  Static Properties
        *
        * */
        Menu.items = MenuItemBindings;

        return Menu;
    });
    _registerModule(_modules, 'Dashboards/EditMode/Toolbar/EditToolbar.js', [_modules['Core/Utilities.js'], _modules['Dashboards/EditMode/Menu/Menu.js']], function (U, Menu) {
        /* *
         *
         *  (c) 2009 - 2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sebastian Bochan
         *  - Wojciech Chmiel
         *  - Gøran Slettemark
         *  - Sophie Bremer
         *
         * */
        const { defined, createElement, css } = U;
        /**
         * Abstract Class of Edit Toolbar.
         * @internal
         */
        class EditToolbar {
            /* *
             *
             *  Constructor
             *
             * */
            constructor(editMode, options) {
                this.container = createElement('div', {
                    className: options.className
                }, void 0, editMode.board.container);
                this.editMode = editMode;
                this.iconURLPrefix = editMode.iconsURLPrefix;
                this.menu = new Menu(this.container, options.menu, editMode, this);
                this.options = options;
                this.isVisible = false;
                if (this.options.outline) {
                    this.outline = createElement('div', {
                        className: options.outlineClassName
                    }, void 0, this.container);
                }
            }
            /* *
             *
             *  Functions
             *
             * */
            hide() {
                this.setPosition(void 0, void 0);
            }
            refreshOutline(x, y, guiElement, offset = 0) {
                const toolbar = this, guiElemCnt = (guiElement || {}).container;
                if (toolbar.outline && guiElemCnt) {
                    css(toolbar.outline, {
                        display: 'block',
                        left: x - offset + 'px',
                        top: y - offset + 'px',
                        width: guiElemCnt.offsetWidth + offset * 2 + 'px',
                        height: guiElemCnt.offsetHeight + offset * 2 + 'px'
                    });
                }
            }
            hideOutline() {
                if (this.outline) {
                    this.outline.style.display = 'none';
                }
            }
            setPosition(x, y) {
                const toolbar = this;
                if (toolbar.container) {
                    css(toolbar.container, {
                        left: (x || '-9999') + 'px',
                        top: (y || '-9999') + 'px'
                    });
                }
                toolbar.isVisible = defined(x) && defined(y);
            }
        }

        return EditToolbar;
    });
    _registerModule(_modules, 'Dashboards/Layout/GUIElement.js', [_modules['Core/Utilities.js'], _modules['Dashboards/Globals.js']], function (U, Globals) {
        /* *
         *
         *  (c) 2009 - 2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sebastian Bochan
         *  - Wojciech Chmiel
         *  - Gøran Slettemark
         *  - Sophie Bremer
         *
         * */
        const { addEvent, createElement, uniqueKey, objectEach, error } = U;
        class GUIElement {
            /* *
            *
            *  Static Properties
            *
            * */
            // Get offsets of the guiElement relative to
            // the referenceElement or the Viewport.
            static getOffsets(guiElement, referenceElement) {
                const offset = { left: 0, top: 0, right: 0, bottom: 0 };
                if (guiElement.container) {
                    const guiElementClientRect = guiElement.container.getBoundingClientRect();
                    const referenceClientRect = referenceElement ?
                        referenceElement.getBoundingClientRect() : { left: 0, top: 0 };
                    offset.left = guiElementClientRect.left - referenceClientRect.left;
                    offset.top = guiElementClientRect.top - referenceClientRect.top;
                    offset.right =
                        guiElementClientRect.right - referenceClientRect.left;
                    offset.bottom =
                        guiElementClientRect.bottom - referenceClientRect.top;
                }
                return offset;
            }
            // Get dimensions of the guiElement container from offsets.
            static getDimFromOffsets(offsets) {
                return {
                    width: offsets.right - offsets.left,
                    height: offsets.bottom - offsets.top
                };
            }
            // Method for element id generation.
            static createElementId(elementType // col, row, layout
            ) {
                return (Globals.classNamePrefix + elementType + '-' +
                    uniqueKey().slice(11));
            }
            // Get width in percentages (0% - 100%).
            static getPercentageWidth(width // supported formats '50%' or '1/2'
            ) {
                const fractionRegEx = /^([0-9]{1})[\-\/\.]([0-9]{1,2})$/;
                let result;
                if (fractionRegEx.test(width)) {
                    const match = width.match(fractionRegEx) || [], multiplier = +match[1], divider = +match[2];
                    result = 100 * multiplier / divider;
                    result = (result <= 100 ? result : 100) + '%';
                }
                else if (width.indexOf('%') !== -1) {
                    const value = parseFloat(width);
                    result = (value <= 100 ?
                        (value >= 0 ? value : 0) : 100) + '%';
                }
                return result;
            }
            /* *
            *
            *  Functions
            *
            * */
            /**
             * Create or get existing HTML element as a GUIElement container.
             *
             * @param {GUIElement.ContainerOptions} options
             * Options.
             */
            getElementContainer(options) {
                const guiElement = this;
                let elem;
                if (options.render) {
                    if (options.attribs && !options.attribs.id) {
                        delete options.attribs.id;
                    }
                }
                else if (typeof options.elementId === 'string') {
                    const div = document.getElementById(options.elementId);
                    if (div) {
                        guiElement.container = div;
                    }
                    else {
                        error('Element ' + options.elementId + ' does not exist');
                    }
                }
                if (options.element instanceof HTMLElement) {
                    elem = options.element;
                }
                else {
                    elem = createElement('div', options.attribs || {}, options.style || {}, options.parentContainer);
                }
                // Set bindedGUIElement event on GUIElement container.
                guiElement.removeBindedEventFn = addEvent(elem, 'bindedGUIElement', function (e) {
                    e.guiElement = guiElement;
                    e.stopImmediatePropagation();
                });
                return elem;
            }
            /**
             * Destroy the element, its container, event hooks
             * and all properties.
             */
            destroy() {
                const guiElement = this;
                // Remove bindedGUIElement event.
                if (guiElement.removeBindedEventFn) {
                    guiElement.removeBindedEventFn();
                }
                // Remove HTML container.
                if (guiElement.container && guiElement.container.parentNode) {
                    guiElement.container.parentNode.removeChild(guiElement.container);
                }
                // Delete all properties.
                objectEach(guiElement, function (val, key) {
                    delete guiElement[key];
                });
            }
            /**
             * Return the GUIElement instance type.
             * @return {GUIElement.GUIElementType|undefined}
             * The GUIElement instance type
             */
            getType() {
                return this.type;
            }
            changeVisibility(setVisible = true, displayStyle) {
                const visibilityChanged = (this.isVisible && !setVisible ||
                    !this.isVisible && setVisible);
                if (this.container && visibilityChanged) {
                    this.container.style.display = (setVisible ?
                        (displayStyle || 'block') :
                        'none');
                    this.isVisible = setVisible;
                }
            }
            hide() {
                this.changeVisibility(false);
            }
            show() {
                this.changeVisibility();
            }
        }

        return GUIElement;
    });
    _registerModule(_modules, 'Dashboards/EditMode/Toolbar/CellEditToolbar.js', [_modules['Core/Utilities.js'], _modules['Dashboards/EditMode/EditGlobals.js'], _modules['Dashboards/EditMode/Toolbar/EditToolbar.js'], _modules['Dashboards/Layout/GUIElement.js']], function (U, EditGlobals, EditToolbar, GUIElement) {
        /* *
         *
         *  (c) 2009 - 2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sebastian Bochan
         *  - Wojciech Chmiel
         *  - Gøran Slettemark
         *  - Sophie Bremer
         *
         * */
        const { merge, fireEvent, objectEach } = U;
        /**
         * @internal
         */
        class CellEditToolbar extends EditToolbar {
            static getItemsConfig(options, iconURLPrefix) {
                const items = [];
                if (options.dragDrop?.enabled) {
                    items.push({
                        id: 'drag',
                        type: 'icon',
                        icon: iconURLPrefix + 'drag.svg',
                        events: {
                            onmousedown: function (e) {
                                const cellEditToolbar = this.menu
                                    .parent;
                                const dragDrop = cellEditToolbar.editMode.dragDrop;
                                if (dragDrop && cellEditToolbar.cell) {
                                    dragDrop.onDragStart(e, cellEditToolbar.cell);
                                }
                            }
                        }
                    });
                }
                if (options.settings?.enabled) {
                    items.push({
                        id: 'settings',
                        type: 'icon',
                        icon: iconURLPrefix + 'settings.svg',
                        events: {
                            click: function (e) {
                                this.menu.parent.editMode.setEditOverlay();
                                this.menu.parent.onCellOptions();
                            }
                        }
                    });
                }
                items.push({
                    id: 'destroy',
                    type: 'icon',
                    className: EditGlobals.classNames.menuDestroy,
                    icon: iconURLPrefix + 'destroy.svg',
                    events: {
                        click: function (e) {
                            const parentNode = this.menu.parent, editMode = this.menu.parent.editMode, popup = editMode.confirmationPopup;
                            popup.show({
                                confirmButton: {
                                    value: editMode.lang.confirmButton,
                                    callback: parentNode.onCellDestroy,
                                    context: parentNode
                                },
                                cancelButton: {
                                    value: editMode.lang.cancelButton,
                                    callback: () => {
                                        popup.closePopup();
                                    }
                                },
                                text: editMode.lang.confirmDestroyCell
                            });
                        }
                    }
                });
                return items;
            }
            /* *
             *
             *  Constructor
             *
             * */
            constructor(editMode) {
                super(editMode, merge(CellEditToolbar.defaultOptions, (editMode.options.toolbars || {}).cell, {
                    menu: {
                        items: CellEditToolbar.getItemsConfig(editMode.options, editMode.iconsURLPrefix)
                    }
                }));
                this.menu.initItems({});
            }
            /* *
             *
             *  Functions
             *
             * */
            showToolbar(cell) {
                const toolbar = this, cellCnt = cell.container, toolbarWidth = 30, toolbarMargin = 10;
                let x, y;
                if (cellCnt &&
                    toolbar.editMode.isActive() &&
                    !(toolbar.editMode.dragDrop || {}).isActive) {
                    const cellOffsets = GUIElement.getOffsets(cell, toolbar.editMode.board.container);
                    x = cellOffsets.right - toolbarWidth - toolbarMargin;
                    y = cellOffsets.top + toolbarMargin;
                    // Temp - activate all items.
                    objectEach(toolbar.menu.items, (item) => {
                        item.activate();
                    });
                    toolbar.setPosition(x, y);
                    toolbar.cell = cell;
                    toolbar.refreshOutline();
                }
                else if (toolbar.isVisible) {
                    toolbar.hide();
                }
            }
            refreshOutline() {
                const toolbar = this, offsetWidth = -1;
                if (toolbar.cell && toolbar.cell.container && toolbar.outline) {
                    super.refreshOutline(-toolbar.cell.container.offsetWidth, 0, this.cell, offsetWidth);
                }
            }
            onCellOptions() {
                const toolbar = this;
                if (toolbar.editMode.sidebar) {
                    toolbar.editMode.sidebar.show(toolbar.cell);
                    if (this.cell) {
                        this.cell.setHighlight();
                    }
                }
            }
            onCellDestroy() {
                const toolbar = this;
                if (toolbar.cell) {
                    const row = toolbar.cell.row;
                    toolbar.resetEditedCell();
                    toolbar.cell.destroy();
                    toolbar.cell = void 0;
                    // Hide row and cell toolbars.
                    toolbar.editMode.hideToolbars(['cell', 'row']);
                    // Call cellResize dashboard event.
                    if (row && row.cells && row.cells.length) {
                        fireEvent(toolbar.editMode.board, 'cellResize', {
                            cell: row.cells[0]
                        });
                        fireEvent(row, 'cellChange', { cell: row.cells[0], row });
                    }
                }
            }
            resetEditedCell() {
                this.editedCell = void 0;
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        CellEditToolbar.defaultOptions = {
            enabled: true,
            className: EditGlobals.classNames.editToolbar,
            outline: false,
            outlineClassName: EditGlobals.classNames.editToolbarCellOutline,
            menu: {
                className: EditGlobals.classNames.editToolbarCell,
                itemsClassName: EditGlobals.classNames.editToolbarItem,
                items: []
            }
        };

        return CellEditToolbar;
    });
    _registerModule(_modules, 'Dashboards/EditMode/Toolbar/RowEditToolbar.js', [_modules['Core/Utilities.js'], _modules['Dashboards/EditMode/EditGlobals.js'], _modules['Dashboards/EditMode/Toolbar/EditToolbar.js'], _modules['Dashboards/Layout/GUIElement.js']], function (U, EditGlobals, EditToolbar, GUIElement) {
        /* *
         *
         *  (c) 2009 - 2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sebastian Bochan
         *  - Wojciech Chmiel
         *  - Gøran Slettemark
         *  - Sophie Bremer
         *
         * */
        const { merge, objectEach } = U;
        /**
         * @internal
         */
        class RowEditToolbar extends EditToolbar {
            static getMenuItemsConfig(options, iconURLPrefix) {
                const items = [];
                if (options.dragDrop?.enabled) {
                    items.push({
                        id: 'drag',
                        type: 'icon',
                        icon: iconURLPrefix + 'drag.svg',
                        events: {
                            onmousedown: function (e) {
                                const rowEditToolbar = this.menu
                                    .parent, dragDrop = rowEditToolbar.editMode.dragDrop;
                                if (dragDrop && rowEditToolbar.row) {
                                    dragDrop.onDragStart(e, rowEditToolbar.row);
                                }
                            }
                        }
                    });
                }
                if (options.settings?.enabled) {
                    items.push({
                        id: 'settings',
                        type: 'icon',
                        icon: iconURLPrefix + 'settings.svg',
                        events: {
                            click: function (e) {
                                this.menu.parent.editMode.setEditOverlay();
                                this.menu.parent.onRowOptions(e);
                            }
                        }
                    });
                }
                items.push({
                    id: 'destroy',
                    type: 'icon',
                    className: EditGlobals.classNames.menuDestroy,
                    icon: iconURLPrefix + 'destroy.svg',
                    events: {
                        click: function (e) {
                            const parentNode = this.menu.parent, editMode = this.menu.parent.editMode, popup = editMode.confirmationPopup;
                            popup.show({
                                confirmButton: {
                                    value: editMode.lang.confirmButton,
                                    callback: parentNode.onRowDestroy,
                                    context: parentNode
                                },
                                cancelButton: {
                                    value: editMode.lang.cancelButton,
                                    callback: () => {
                                        popup.closePopup();
                                    }
                                },
                                text: editMode.lang.confirmDestroyRow
                            });
                        }
                    }
                });
                return items;
            }
            /* *
             *
             *  Constructor
             *
             * */
            constructor(editMode) {
                super(editMode, merge(RowEditToolbar.defaultOptions, (editMode.options.toolbars || {}).row, {
                    menu: {
                        items: RowEditToolbar.getMenuItemsConfig(editMode.options, editMode.iconsURLPrefix)
                    }
                }));
                this.menu.initItems({});
            }
            /* *
             *
             *  Functions
             *
             * */
            refreshOutline(x, y) {
                const toolbar = this, offsetWidth = 2;
                if (toolbar.row && toolbar.row.container) {
                    super.refreshOutline(x, y, this.row, offsetWidth);
                }
            }
            showToolbar(row) {
                const toolbar = this, rowCnt = row.container;
                let x, y, offsetX;
                if (rowCnt &&
                    toolbar.editMode.isActive() &&
                    !(toolbar.editMode.dragDrop || {}).isActive) {
                    const rowOffsets = GUIElement.getOffsets(row, toolbar.editMode.board.container);
                    const rowWidth = rowOffsets.right - rowOffsets.left;
                    // Temp - activate all items.
                    objectEach(toolbar.menu.items, (item) => {
                        item.activate();
                    });
                    offsetX = rowWidth / 2 - toolbar.container.clientWidth / 2;
                    x = rowOffsets.left + offsetX;
                    y = rowOffsets.top - toolbar.container.clientHeight;
                    toolbar.setPosition(x, y);
                    toolbar.row = row;
                    toolbar.refreshOutline(-offsetX, toolbar.container.clientHeight);
                }
                else if (toolbar.isVisible) {
                    toolbar.hide();
                }
            }
            onRowOptions(e) {
                const toolbar = this;
                if (toolbar.editMode.sidebar) {
                    toolbar.editMode.sidebar.show(toolbar.row);
                    // toolbar.editMode.sidebar.updateTitle('ROW OPTIONS');
                    // @ToDo - mask is buggy - should be refactored or removed.
                    // if (this.row) {
                    //     super.maskNotEditedElements(
                    //         this.row,
                    //         true
                    //     );
                    //     this.editedRow = this.row;
                    // }
                }
            }
            onRowDestroy(e) {
                const toolbar = this;
                if (toolbar.row) {
                    this.resetEditedRow();
                    toolbar.row.destroy();
                    toolbar.row = void 0;
                    // Hide row and cell toolbars.
                    toolbar.editMode.hideToolbars(['cell', 'row']);
                }
            }
            resetEditedRow() {
                // super.resetCurrentElements(this.row as Row, true);
                this.editedRow = void 0;
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        RowEditToolbar.defaultOptions = {
            enabled: true,
            className: EditGlobals.classNames.editToolbar,
            outline: true,
            outlineClassName: EditGlobals.classNames.editToolbarRowOutline,
            menu: {
                className: EditGlobals.classNames.editToolbarRow,
                itemsClassName: EditGlobals.classNames.editToolbarItem,
                items: []
            }
        };

        return RowEditToolbar;
    });
    _registerModule(_modules, 'Dashboards/EditMode/AccordionMenu.js', [_modules['Dashboards/EditMode/EditRenderer.js'], _modules['Core/Utilities.js'], _modules['Dashboards/EditMode/EditGlobals.js']], function (EditRenderer, U, EditGlobals) {
        /* *
         *
         *  (c) 2009-2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Pawel Lysy
         *  - Sebastian Bochan
         *
         * */
        const { createElement, merge, error } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Accordion menu class.
         */
        class AccordionMenu {
            /* *
             *
             *  Constructor
             *
             * */
            constructor(iconsURLPrefix, closeSidebar) {
                this.changedOptions = {};
                this.chartOptionsJSON = {};
                this.iconsURLPrefix = iconsURLPrefix;
                this.closeSidebar = closeSidebar;
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Renders the menu for given component.
             *
             * @param container
             * The HTML Element to render the menu in.
             * @param component
             * The component to render the menu for.
             */
            renderContent(container, component) {
                const menu = this;
                const editableOptions = component.editableOptions.getOptions();
                let option, content;
                const accordionContainer = createElement('div', {
                    className: EditGlobals.classNames.accordionMenu
                }, {}, container);
                for (let i = 0, end = editableOptions.length; i < end; i++) {
                    option = editableOptions[i];
                    content = EditRenderer.renderCollapseHeader(accordionContainer, {
                        name: option.name,
                        iconsURLPrefix: menu.iconsURLPrefix,
                        lang: (component.board?.editMode || EditGlobals).lang
                    }).content;
                    this.renderAccordion(option, content, component);
                }
                const buttonContainer = createElement('div', {
                    className: EditGlobals.classNames.accordionMenuButtonsContainer
                }, {}, accordionContainer);
                EditRenderer.renderButton(buttonContainer, {
                    text: (component.board?.editMode || EditGlobals)
                        .lang.confirmButton,
                    className: EditGlobals.classNames.popupConfirmBtn,
                    callback: () => {
                        const changedOptions = this
                            .changedOptions;
                        component.update(merge(changedOptions, {
                            chartOptions: this.chartOptionsJSON
                        }));
                        menu.changedOptions = {};
                        menu.chartOptionsJSON = {};
                        menu.closeSidebar();
                    }
                });
                EditRenderer.renderButton(buttonContainer, {
                    text: (component.board?.editMode || EditGlobals)
                        .lang.cancelButton,
                    className: EditGlobals.classNames.popupCancelBtn,
                    callback: () => {
                        menu.changedOptions = {};
                        menu.chartOptionsJSON = {};
                        menu.closeSidebar();
                    }
                });
            }
            /**
             * Update the options object with new nested value, based on the property
             * path. If the objects in the path are not defined, the function will
             * create them.
             *
             * @param propertyPath
             * Path of the property for which the value should be updated.
             * Example: ```['chartOptions', 'chart', 'type']```
             * @param value
             * New value of the property.
             */
            updateOptions(propertyPath, value) {
                const pathLength = propertyPath.length - 1;
                let currentLevel = this.changedOptions;
                if (pathLength === 0 && propertyPath[0] === 'chartOptions') {
                    try {
                        const parsedValue = JSON.parse(value);
                        this.chartOptionsJSON = parsedValue;
                    }
                    catch (e) {
                        // TODO: Handle the wrong config passed from the user.
                        error('Dashboards Error: Wrong JSON config structure passed as' +
                            ' a chart options.');
                    }
                }
                for (let i = 0; i < pathLength; i++) {
                    const key = propertyPath[i];
                    if (!currentLevel[key]) {
                        currentLevel[key] = {};
                    }
                    currentLevel = currentLevel[key];
                }
                currentLevel[propertyPath[pathLength]] = value;
            }
            /**
             * Renders either a basic or nested element. This function can be recursivly
             * called, if there are multiple nested options.
             *
             * @param options
             * Configuration object of the Component options.
             * @param parentNode
             * A container where the accordion is rendered.
             * @param component
             * the component for which the menu should be rendered.
             */
            renderAccordion(options, parentNode, component) {
                if (options.type === 'nested') {
                    return this.renderNested(parentNode, options, component);
                }
                const renderFunction = EditRenderer.getRendererFunction(options.type);
                if (!renderFunction) {
                    return;
                }
                renderFunction(parentNode, {
                    ...options,
                    iconsURLPrefix: this.iconsURLPrefix,
                    value: component.getEditableOptionValue(options.propertyPath),
                    onchange: (value) => this.updateOptions(options.propertyPath || [], value)
                });
            }
            /**
             * Render nested menu for the component.
             *
             * @param parentElement
             * HTML element to which the nested structure should be rendered to
             * @param options
             * configuration object for the options
             * @param component
             * The component instance for the options should be rendered
             */
            renderNested(parentElement, options, component) {
                if (!parentElement || !options.nestedOptions) {
                    return;
                }
                const nestedOptions = options.nestedOptions;
                for (let i = 0, iEnd = nestedOptions.length; i < iEnd; ++i) {
                    const name = nestedOptions[i].name;
                    const accordionOptions = nestedOptions[i].options;
                    const showToggle = !!nestedOptions[i].showToggle;
                    const propertyPath = nestedOptions[i].propertyPath || [];
                    const collapsedHeader = EditRenderer.renderCollapseHeader(parentElement, {
                        name,
                        isEnabled: !!component.getEditableOptionValue(propertyPath),
                        iconsURLPrefix: this.iconsURLPrefix,
                        showToggle: showToggle,
                        onchange: (value) => this.updateOptions(propertyPath, value),
                        isNested: true,
                        lang: (component.board?.editMode || EditGlobals).lang
                    });
                    for (let j = 0, jEnd = accordionOptions.length; j < jEnd; ++j) {
                        this.renderAccordion(accordionOptions[j], collapsedHeader.content, component);
                    }
                }
                return;
            }
        }
        /* *
         *
         *  Default Export
         *
         * */

        return AccordionMenu;
    });
    _registerModule(_modules, 'Core/Renderer/HTML/AST.js', [_modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (H, U) {
        /* *
         *
         *  (c) 2010-2020 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { SVG_NS, win } = H;
        const { attr, createElement, css, error, isFunction, isString, objectEach, splat } = U;
        const { trustedTypes } = win;
        /* *
         *
         *  Constants
         *
         * */
        // Create the trusted type policy. This should not be exposed.
        const trustedTypesPolicy = (trustedTypes &&
            isFunction(trustedTypes.createPolicy) &&
            trustedTypes.createPolicy('highcharts', {
                createHTML: (s) => s
            }));
        const emptyHTML = trustedTypesPolicy ?
            trustedTypesPolicy.createHTML('') :
            '';
        // IE9 and PhantomJS are only able to parse XML.
        const hasValidDOMParser = (function () {
            try {
                return Boolean(new DOMParser().parseFromString(emptyHTML, 'text/html'));
            }
            catch (e) {
                return false;
            }
        }());
        /* *
         *
         *  Class
         *
         * */
        /**
         * The AST class represents an abstract syntax tree of HTML or SVG content. It
         * can take HTML as an argument, parse it, optionally transform it to SVG, then
         * perform sanitation before inserting it into the DOM.
         *
         * @class
         * @name Highcharts.AST
         *
         * @param {string|Array<Highcharts.ASTNode>} source
         * Either an HTML string or an ASTNode list to populate the tree.
         */
        class AST {
            /* *
             *
             *  Static Functions
             *
             * */
            /**
             * Filter an object of SVG or HTML attributes against the allow list.
             *
             * @static
             *
             * @function Highcharts.AST#filterUserAttributes
             *
             * @param {Highcharts.SVGAttributes} attributes The attributes to filter
             *
             * @return {Highcharts.SVGAttributes}
             * The filtered attributes
             */
            static filterUserAttributes(attributes) {
                objectEach(attributes, (val, key) => {
                    let valid = true;
                    if (AST.allowedAttributes.indexOf(key) === -1) {
                        valid = false;
                    }
                    if (['background', 'dynsrc', 'href', 'lowsrc', 'src']
                        .indexOf(key) !== -1) {
                        valid = isString(val) && AST.allowedReferences.some((ref) => val.indexOf(ref) === 0);
                    }
                    if (!valid) {
                        error(33, false, void 0, {
                            'Invalid attribute in config': `${key}`
                        });
                        delete attributes[key];
                    }
                    // #17753, < is not allowed in SVG attributes
                    if (isString(val) && attributes[key]) {
                        attributes[key] = val.replace(/</g, '&lt;');
                    }
                });
                return attributes;
            }
            static parseStyle(style) {
                return style
                    .split(';')
                    .reduce((styles, line) => {
                    const pair = line.split(':').map((s) => s.trim()), key = pair.shift();
                    if (key && pair.length) {
                        styles[key.replace(/-([a-z])/g, (g) => g[1].toUpperCase())] = pair.join(':'); // #17146
                    }
                    return styles;
                }, {});
            }
            /**
             * Utility function to set html content for an element by passing in a
             * markup string. The markup is safely parsed by the AST class to avoid
             * XSS vulnerabilities. This function should be used instead of setting
             * `innerHTML` in all cases where the content is not fully trusted.
             *
             * @static
             * @function Highcharts.AST#setElementHTML
             *
             * @param {SVGDOMElement|HTMLDOMElement} el
             * Node to set content of.
             *
             * @param {string} html
             * Markup string
             */
            static setElementHTML(el, html) {
                el.innerHTML = AST.emptyHTML; // Clear previous
                if (html) {
                    const ast = new AST(html);
                    ast.addToDOM(el);
                }
            }
            /* *
             *
             *  Constructor
             *
             * */
            // Construct an AST from HTML markup, or wrap an array of existing AST nodes
            constructor(source) {
                this.nodes = typeof source === 'string' ?
                    this.parseMarkup(source) : source;
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Add the tree defined as a hierarchical JS structure to the DOM
             *
             * @function Highcharts.AST#addToDOM
             *
             * @param {Highcharts.HTMLDOMElement|Highcharts.SVGDOMElement} parent
             * The node where it should be added
             *
             * @return {Highcharts.HTMLDOMElement|Highcharts.SVGDOMElement}
             * The inserted node.
             */
            addToDOM(parent) {
                /**
                 * @private
                 * @param {Highcharts.ASTNode} subtree
                 * HTML/SVG definition
                 * @param {Element} [subParent]
                 * parent node
                 * @return {Highcharts.SVGDOMElement|Highcharts.HTMLDOMElement}
                 * The inserted node.
                 */
                function recurse(subtree, subParent) {
                    let ret;
                    splat(subtree).forEach(function (item) {
                        const tagName = item.tagName;
                        const textNode = item.textContent ?
                            H.doc.createTextNode(item.textContent) :
                            void 0;
                        // Whether to ignore the AST filtering totally, #15345
                        const bypassHTMLFiltering = AST.bypassHTMLFiltering;
                        let node;
                        if (tagName) {
                            if (tagName === '#text') {
                                node = textNode;
                            }
                            else if (AST.allowedTags.indexOf(tagName) !== -1 ||
                                bypassHTMLFiltering) {
                                const NS = tagName === 'svg' ?
                                    SVG_NS :
                                    (subParent.namespaceURI || SVG_NS);
                                const element = H.doc.createElementNS(NS, tagName);
                                const attributes = item.attributes || {};
                                // Apply attributes from root of AST node, legacy from
                                // from before TextBuilder
                                objectEach(item, function (val, key) {
                                    if (key !== 'tagName' &&
                                        key !== 'attributes' &&
                                        key !== 'children' &&
                                        key !== 'style' &&
                                        key !== 'textContent') {
                                        attributes[key] = val;
                                    }
                                });
                                attr(element, bypassHTMLFiltering ?
                                    attributes :
                                    AST.filterUserAttributes(attributes));
                                if (item.style) {
                                    css(element, item.style);
                                }
                                // Add text content
                                if (textNode) {
                                    element.appendChild(textNode);
                                }
                                // Recurse
                                recurse(item.children || [], element);
                                node = element;
                            }
                            else {
                                error(33, false, void 0, {
                                    'Invalid tagName in config': tagName
                                });
                            }
                        }
                        // Add to the tree
                        if (node) {
                            subParent.appendChild(node);
                        }
                        ret = node;
                    });
                    // Return last node added (on top level it's the only one)
                    return ret;
                }
                return recurse(this.nodes, parent);
            }
            /**
             * Parse HTML/SVG markup into AST Node objects. Used internally from the
             * constructor.
             *
             * @private
             *
             * @function Highcharts.AST#getNodesFromMarkup
             *
             * @param {string} markup The markup string.
             *
             * @return {Array<Highcharts.ASTNode>} The parsed nodes.
             */
            parseMarkup(markup) {
                const nodes = [];
                markup = markup
                    .trim()
                    // The style attribute throws a warning when parsing when CSP is
                    // enabled (#6884), so use an alias and pick it up below
                    // Make all quotation marks parse correctly to DOM (#17627)
                    .replace(/ style=(["'])/g, ' data-style=$1');
                let doc;
                if (hasValidDOMParser) {
                    doc = new DOMParser().parseFromString(trustedTypesPolicy ?
                        trustedTypesPolicy.createHTML(markup) :
                        markup, 'text/html');
                }
                else {
                    const body = createElement('div');
                    body.innerHTML = markup;
                    doc = { body };
                }
                const appendChildNodes = (node, addTo) => {
                    const tagName = node.nodeName.toLowerCase();
                    // Add allowed tags
                    const astNode = {
                        tagName
                    };
                    if (tagName === '#text') {
                        astNode.textContent = node.textContent || '';
                    }
                    const parsedAttributes = node.attributes;
                    // Add attributes
                    if (parsedAttributes) {
                        const attributes = {};
                        [].forEach.call(parsedAttributes, (attrib) => {
                            if (attrib.name === 'data-style') {
                                astNode.style = AST.parseStyle(attrib.value);
                            }
                            else {
                                attributes[attrib.name] = attrib.value;
                            }
                        });
                        astNode.attributes = attributes;
                    }
                    // Handle children
                    if (node.childNodes.length) {
                        const children = [];
                        [].forEach.call(node.childNodes, (childNode) => {
                            appendChildNodes(childNode, children);
                        });
                        if (children.length) {
                            astNode.children = children;
                        }
                    }
                    addTo.push(astNode);
                };
                [].forEach.call(doc.body.childNodes, (childNode) => appendChildNodes(childNode, nodes));
                return nodes;
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        /**
         * The list of allowed SVG or HTML attributes, used for sanitizing
         * potentially harmful content from the chart configuration before adding to
         * the DOM.
         *
         * @see [Source code with default values](
         * https://github.com/highcharts/highcharts/blob/master/ts/Core/Renderer/HTML/AST.ts#:~:text=public%20static%20allowedAttributes)
         *
         * @example
         * // Allow a custom, trusted attribute
         * Highcharts.AST.allowedAttributes.push('data-value');
         *
         * @name Highcharts.AST.allowedAttributes
         * @type {Array<string>}
         */
        AST.allowedAttributes = [
            'alt',
            'aria-controls',
            'aria-describedby',
            'aria-expanded',
            'aria-haspopup',
            'aria-hidden',
            'aria-label',
            'aria-labelledby',
            'aria-live',
            'aria-pressed',
            'aria-readonly',
            'aria-roledescription',
            'aria-selected',
            'class',
            'clip-path',
            'color',
            'colspan',
            'cx',
            'cy',
            'd',
            'dx',
            'dy',
            'disabled',
            'fill',
            'filterUnits',
            'flood-color',
            'flood-opacity',
            'height',
            'href',
            'id',
            'in',
            'markerHeight',
            'markerWidth',
            'offset',
            'opacity',
            'orient',
            'padding',
            'paddingLeft',
            'paddingRight',
            'patternUnits',
            'r',
            'refX',
            'refY',
            'role',
            'scope',
            'slope',
            'src',
            'startOffset',
            'stdDeviation',
            'stroke',
            'stroke-linecap',
            'stroke-width',
            'style',
            'tableValues',
            'result',
            'rowspan',
            'summary',
            'target',
            'tabindex',
            'text-align',
            'text-anchor',
            'textAnchor',
            'textLength',
            'title',
            'type',
            'valign',
            'width',
            'x',
            'x1',
            'x2',
            'xlink:href',
            'y',
            'y1',
            'y2',
            'zIndex'
        ];
        /**
         * The list of allowed references for referring attributes like `href` and
         * `src`. Attribute values will only be allowed if they start with one of
         * these strings.
         *
         * @see [Source code with default values](
         * https://github.com/highcharts/highcharts/blob/master/ts/Core/Renderer/HTML/AST.ts#:~:text=public%20static%20allowedReferences)
         *
         * @example
         * // Allow tel:
         * Highcharts.AST.allowedReferences.push('tel:');
         *
         * @name    Highcharts.AST.allowedReferences
         * @type    {Array<string>}
         */
        AST.allowedReferences = [
            'https://',
            'http://',
            'mailto:',
            '/',
            '../',
            './',
            '#'
        ];
        /**
         * The list of allowed SVG or HTML tags, used for sanitizing potentially
         * harmful content from the chart configuration before adding to the DOM.
         *
         * @see [Source code with default values](
         * https://github.com/highcharts/highcharts/blob/master/ts/Core/Renderer/HTML/AST.ts#:~:text=public%20static%20allowedTags)
         *
         * @example
         * // Allow a custom, trusted tag
         * Highcharts.AST.allowedTags.push('blink'); // ;)
         *
         * @name    Highcharts.AST.allowedTags
         * @type    {Array<string>}
         */
        AST.allowedTags = [
            'a',
            'abbr',
            'b',
            'br',
            'button',
            'caption',
            'circle',
            'clipPath',
            'code',
            'dd',
            'defs',
            'div',
            'dl',
            'dt',
            'em',
            'feComponentTransfer',
            'feDropShadow',
            'feFuncA',
            'feFuncB',
            'feFuncG',
            'feFuncR',
            'feGaussianBlur',
            'feOffset',
            'feMerge',
            'feMergeNode',
            'filter',
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
            'hr',
            'i',
            'img',
            'li',
            'linearGradient',
            'marker',
            'ol',
            'p',
            'path',
            'pattern',
            'pre',
            'rect',
            'small',
            'span',
            'stop',
            'strong',
            'style',
            'sub',
            'sup',
            'svg',
            'table',
            'text',
            'textPath',
            'thead',
            'title',
            'tbody',
            'tspan',
            'td',
            'th',
            'tr',
            'u',
            'ul',
            '#text'
        ];
        AST.emptyHTML = emptyHTML;
        /**
         * Allow all custom SVG and HTML attributes, references and tags (together
         * with potentially harmful ones) to be added to the DOM from the chart
         * configuration. In other words, disable the the allow-listing which is the
         * primary functionality of the AST.
         *
         * WARNING: Setting this property to `true` while allowing untrusted user
         * data in the chart configuration will expose your application to XSS
         * security risks!
         *
         * Note that in case you want to allow a known set of tags or attributes,
         * you should allow-list them instead of disabling the filtering totally.
         * See [allowedAttributes](Highcharts.AST#.allowedAttributes),
         * [allowedReferences](Highcharts.AST#.allowedReferences) and
         * [allowedTags](Highcharts.AST#.allowedTags). The `bypassHTMLFiltering`
         * setting is intended only for those cases where allow-listing is not
         * practical, and the chart configuration already comes from a secure
         * source.
         *
         * @example
         * // Allow all custom attributes, references and tags (disable DOM XSS
         * // filtering)
         * Highcharts.AST.bypassHTMLFiltering = true;
         *
         * @name Highcharts.AST.bypassHTMLFiltering
         * @static
         */
        AST.bypassHTMLFiltering = false;
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
         * Serialized form of an SVG/HTML definition, including children.
         *
         * @interface Highcharts.ASTNode
         */ /**
        * @name Highcharts.ASTNode#attributes
        * @type {Highcharts.SVGAttributes|undefined}
        */ /**
        * @name Highcharts.ASTNode#children
        * @type {Array<Highcharts.ASTNode>|undefined}
        */ /**
        * @name Highcharts.ASTNode#tagName
        * @type {string|undefined}
        */ /**
        * @name Highcharts.ASTNode#textContent
        * @type {string|undefined}
        */
        (''); // keeps doclets above in file

        return AST;
    });
    _registerModule(_modules, 'Shared/BaseForm.js', [_modules['Core/Renderer/HTML/AST.js'], _modules['Core/Utilities.js']], function (AST, U) {
        /* *
         *
         *  (c) 2009 - 2023 Highsoft AS
         *
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
        const { addEvent, createElement } = U;
        /* *
         *
         *  Class
         *
         * */
        class BaseForm {
            /* *
             *
             *  Constructor
             *
             * */
            constructor(parentDiv, iconsURL) {
                this.iconsURL = iconsURL;
                this.container = this.createPopupContainer(parentDiv);
                this.closeButton = this.addCloseButton();
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Create popup div container.
             *
             * @param {HTMLElement} parentDiv
             * Parent div to attach popup.
             *
             * @param  {string} className
             * Class name of the popup.
             *
             * @return {HTMLElement}
             * Popup div.
             */
            createPopupContainer(parentDiv, className = 'highcharts-popup highcharts-no-tooltip') {
                return createElement('div', { className }, void 0, parentDiv);
            }
            /**
             * Create HTML element and attach click event to close popup.
             *
             * @param {string} className
             * Class name of the close button.
             *
             * @return {HTMLElement}
             * Close button.
             */
            addCloseButton(className = 'highcharts-popup-close') {
                const popup = this, iconsURL = this.iconsURL;
                // Create close popup button.
                const closeButton = createElement('div', { className }, void 0, this.container);
                closeButton.style['background-image'] = 'url(' +
                    (iconsURL.match(/png|svg|jpeg|jpg|gif/ig) ?
                        iconsURL : iconsURL + 'close.svg') + ')';
                ['click', 'touchstart'].forEach((eventName) => {
                    addEvent(closeButton, eventName, popup.closeButtonEvents.bind(popup));
                });
                // close popup when press ESC
                addEvent(document, 'keydown', function (event) {
                    if (event.code === 'Escape') {
                        popup.closeButtonEvents();
                    }
                });
                return closeButton;
            }
            /**
             * Close button events.
             * @return {void}
             */
            closeButtonEvents() {
                this.closePopup();
            }
            /**
             * Reset content of the current popup and show.
             *
             * @param {string} toolbarClass
             * Class name of the toolbar which styles should be reset.
             */
            showPopup(toolbarClass = 'highcharts-annotation-toolbar') {
                const popupDiv = this.container, popupCloseButton = this.closeButton;
                this.type = void 0;
                // Reset content.
                popupDiv.innerHTML = AST.emptyHTML;
                // Reset toolbar styles if exists.
                if (popupDiv.className.indexOf(toolbarClass) >= 0) {
                    popupDiv.classList.remove(toolbarClass);
                    // reset toolbar inline styles
                    popupDiv.removeAttribute('style');
                }
                // Add close button.
                popupDiv.appendChild(popupCloseButton);
                popupDiv.style.display = 'block';
                popupDiv.style.height = '';
            }
            /**
             * Hide popup.
             */
            closePopup() {
                this.container.style.display = 'none';
            }
        }
        /* *
         *
         *  Default Export
         *
         * */

        return BaseForm;
    });
    _registerModule(_modules, 'Dashboards/Utilities.js', [_modules['Core/Utilities.js']], function (U) {
        /* *
         *
         *  (c) 2009 - 2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sebastian Bochan
         *  - Wojciech Chmiel
         *  - Gøran Slettemark
         *  - Sophie Bremer
         *
         * */
        /* *
         *
         *  Imports
         *
         * */
        const { isClass, isDOMElement, isObject, objectEach, uniqueKey: coreUniqueKey } = U;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Utility function to deep merge two or more objects and return a third object.
         * If the first argument is true, the contents of the second object is copied
         * into the first object. The merge function can also be used with a single
         * object argument to create a deep copy of an object.
         *
         * @function Highcharts.merge<T>
         *
         * @param {boolean} extend
         *        Whether to extend the left-side object (a) or return a whole new
         *        object.
         *
         * @param {T|undefined} a
         *        The first object to extend. When only this is given, the function
         *        returns a deep copy.
         *
         * @param {...Array<object|undefined>} [n]
         *        An object to merge into the previous one.
         *
         * @return {T}
         *         The merged object. If the first argument is true, the return is the
         *         same as the second argument.
         */ /**
        * Utility function to deep merge two or more objects and return a third object.
        * The merge function can also be used with a single object argument to create a
        * deep copy of an object.
        *
        * @function Highcharts.merge<T>
        *
        * @param {T|undefined} a
        *        The first object to extend. When only this is given, the function
        *        returns a deep copy.
        *
        * @param {...Array<object|undefined>} [n]
        *        An object to merge into the previous one.
        *
        * @return {T}
        *         The merged object. If the first argument is true, the return is the
        *         same as the second argument.
        */
        function merge() {
            /* eslint-enable valid-jsdoc */
            let i, args = arguments, copyDepth = 0, ret = {};
            // describtive error stack:
            const copyDepthError = new Error('Recursive copy depth > 100'), doCopy = (copy, original) => {
                // An object is replacing a primitive
                if (typeof copy !== 'object') {
                    copy = {};
                }
                if (++copyDepth > 100) {
                    throw copyDepthError;
                }
                objectEach(original, (value, key) => {
                    // Prototype pollution (#14883)
                    if (key === '__proto__' || key === 'constructor') {
                        return;
                    }
                    // Copy the contents of objects, but not arrays or DOM nodes
                    if (isObject(value, true) &&
                        !isClass(value) &&
                        !isDOMElement(value)) {
                        copy[key] = doCopy(copy[key] || {}, value);
                        // Primitives and arrays are copied over directly
                    }
                    else {
                        copy[key] = original[key];
                    }
                });
                --copyDepth;
                return copy;
            };
            // If first argument is true, copy into the existing object. Used in
            // setOptions.
            if (args[0] === true) {
                ret = args[1];
                args = Array.prototype.slice.call(args, 2);
            }
            // For each argument, extend the return
            const len = args.length;
            for (i = 0; i < len; i++) {
                ret = doCopy(ret, args[i]);
            }
            return ret;
        }
        /**
         * Creates a session-dependent unique key string for reference purposes.
         *
         * @function Dashboards.uniqueKey
         *
         * @return {string}
         * Unique key string
         */
        function uniqueKey() {
            return `dashboard-${coreUniqueKey().replace('highcharts-', '')}`;
        }
        /* *
         *
         *  Default Export
         *
         * */
        const Utilities = {
            merge,
            uniqueKey
        };

        return Utilities;
    });
    _registerModule(_modules, 'Dashboards/Layout/Cell.js', [_modules['Dashboards/Actions/Bindings.js'], _modules['Dashboards/EditMode/EditGlobals.js'], _modules['Dashboards/Globals.js'], _modules['Dashboards/Layout/GUIElement.js'], _modules['Core/Utilities.js']], function (Bindings, EditGlobals, Globals, GUIElement, U) {
        /* *
         *
         *  (c) 2009 - 2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sebastian Bochan
         *  - Wojciech Chmiel
         *  - Gøran Slettemark
         *  - Sophie Bremer
         *
         * */
        const { componentFromJSON } = Bindings;
        const { merge, fireEvent } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * @internal
         **/
        class Cell extends GUIElement {
            /* *
             *
             *  Static Properties
             *
             * */
            /** @internal */
            static fromJSON(json, row) {
                if (row) {
                    const options = json.options;
                    let id = options.containerId;
                    if (row.layout.copyId) {
                        id = id + '_' + row.layout.copyId;
                    }
                    return new Cell(row, {
                        id: id,
                        parentContainerId: (row.container && row.container.id) ||
                            options.parentContainerId,
                        mountedComponentJSON: options.mountedComponentJSON,
                        style: options.style,
                        layoutJSON: options.layoutJSON,
                        width: options.width,
                        height: options.height
                    });
                }
                return void 0;
            }
            /* *
             *
             *  Constructor
             *
             * */
            /**
             * Constructs an instance of the Cell class.
             *
             * @param {Row} row
             * Reference to the row instance.
             *
             * @param {Cell.Options} options
             * Options for the cell.
             *
             * @param {HTMLElement} cellElement
             * The container of the cell HTML element.
             */
            constructor(row, options, cellElement) {
                super();
                /**
                 * The type of GUI element.
                 */
                this.type = Globals.guiElementType.cell;
                this.id = options.id;
                this.options = options;
                this.row = row;
                this.isVisible = true;
                // Get parent container
                const parentContainer = document.getElementById(options.parentContainerId || '') ||
                    row.container;
                const layoutOptions = row.layout.options || {}, rowOptions = row.options || {}, cellClassName = layoutOptions.cellClassName || '';
                let cellHeight;
                if (options.height) {
                    if (typeof options.height === 'number') {
                        cellHeight = options.height + 'px';
                    }
                    else {
                        cellHeight = options.height;
                    }
                }
                this.container = this.getElementContainer({
                    render: row.layout.board.guiEnabled,
                    parentContainer: parentContainer,
                    attribs: {
                        id: options.id,
                        className: Globals.classNames.cell + ' ' +
                            cellClassName
                    },
                    element: cellElement,
                    elementId: options.id,
                    style: merge(layoutOptions.style, rowOptions.style, options.style, {
                        height: cellHeight
                    })
                });
                // Set cell width respecting responsive options.
                this.reflow();
                // Mount component from JSON.
                if (this.options.mountedComponentJSON) {
                    this.mountComponentFromJSON(this.options.mountedComponentJSON, this.container);
                }
                // nested layout
                if (this.options.layout) {
                    this.setNestedLayout();
                }
                if (this.options.layoutJSON) {
                    const layout = this.row.layout, board = layout.board, layoutFromJSON = layout.constructor.fromJSON;
                    this.nestedLayout = layoutFromJSON(merge(this.options.layoutJSON, {
                        parentContainerId: this.options.id
                    }), board, this);
                }
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Create a nested layout in the cell and assign it to the nestedCell
             * property.
             * @internal
             */
            setNestedLayout() {
                const board = this.row.layout.board, Layout = this.row.layout.constructor;
                const optionsGui = board.options.gui;
                this.nestedLayout = new Layout(board, merge({}, optionsGui && optionsGui.layoutOptions, this.options.layout, {
                    parentContainerId: this.options.id
                }), this);
            }
            /**
             * Mount component from JSON.
             * @internal
             *
             * @param {Component.JSON} [json]
             * Component JSON.
             *
             * @param {HTMLDOMElement} [cellContainer]
             * Cell container
             *
             * @return {boolean}
             * Returns true, if the component created from JSON is mounted,
             * otherwise false.
             */
            mountComponentFromJSON(json, cellContainer // @todo
            ) {
                const cell = this;
                if (cell.id !== json.options.parentElement) {
                    json.options.parentElement = cell.id;
                }
                const component = componentFromJSON(json, cellContainer);
                if (component) {
                    cell.mountedComponent = component;
                    return true;
                }
                return false;
            }
            /**
             * Destroy the element, its container, event hooks
             * and mounted component.
             */
            destroy() {
                const cell = this;
                const { row } = cell;
                // Destroy mounted component.
                if (cell.mountedComponent) {
                    cell.mountedComponent.destroy();
                }
                row.unmountCell(cell);
                const destroyRow = row.cells.length === 0;
                super.destroy();
                if (destroyRow) {
                    row.destroy();
                }
            }
            /**
             * Converts the class instance to a class JSON.
             * @internal
             *
             * @return {Cell.JSON}
             * Class JSON of this Cell instance.
             */
            toJSON() {
                const cell = this, rowContainerId = (cell.row.container || {}).id || '';
                return {
                    $class: 'Dashboards.Layout.Cell',
                    options: {
                        containerId: cell.container.id,
                        parentContainerId: rowContainerId,
                        width: cell.options.width,
                        height: cell.options.height,
                        mountedComponentJSON: cell.mountedComponent && cell.mountedComponent.toJSON(),
                        style: cell.options.style,
                        layoutJSON: cell.nestedLayout && cell.nestedLayout.toJSON()
                    }
                };
            }
            /**
             * Get the cell's options.
             * @returns
             * The JSON of cell's options.
             *
             * @internal
             *
             */
            getOptions() {
                return this.options;
            }
            changeVisibility(setVisible = true) {
                super.changeVisibility(setVisible);
                const cell = this, row = cell.row;
                // Change row visibility if needed.
                if (!cell.row.getVisibleCells().length) {
                    cell.row.hide();
                }
                else if (cell.isVisible && !row.isVisible) {
                    cell.row.show();
                }
                setTimeout(() => {
                    fireEvent(row, 'cellChange', { row, cell });
                }, 0);
            }
            getParentCell(level) {
                const cell = this;
                let parentCell;
                if (level <= cell.row.layout.level) {
                    if (cell.row.layout.level === level) {
                        return cell;
                    }
                    if (cell.row.layout.level - 1 >= 0) {
                        parentCell = cell.row.layout.parentCell;
                        if (parentCell) {
                            return parentCell.getParentCell(level);
                        }
                    }
                }
            }
            // Method to get array of overlapping levels.
            getOverlappingLevels(align, // left, right, top, bottom
            levelMaxGap, // max distance between levels
            offset // analized cell offset
            ) {
                const cell = this, parentCell = cell.row.layout.parentCell;
                let levels = [cell.row.layout.level];
                if (parentCell) {
                    const cellOffset = offset || GUIElement.getOffsets(cell)[align];
                    const parentCellOffset = GUIElement.getOffsets(parentCell)[align];
                    if (Math.abs(cellOffset - parentCellOffset) < levelMaxGap) {
                        levels = [
                            ...levels,
                            ...parentCell.getOverlappingLevels(align, levelMaxGap, parentCellOffset)
                        ];
                    }
                }
                return levels;
            }
            reflow(dashContainerSize) {
                const cell = this, cntSize = dashContainerSize ||
                    cell.row.layout.board.getLayoutContainerSize(), respoOptions = cell.options.responsive, optWidth = cell.options.width;
                if (cell.container) {
                    let width = '';
                    if (respoOptions &&
                        respoOptions[cntSize] &&
                        respoOptions[cntSize].width) {
                        width = cell.convertWidthToValue(respoOptions[cntSize].width);
                    }
                    else if (optWidth) {
                        width = cell.convertWidthToValue(optWidth);
                    }
                    cell.setSize(width || 'auto');
                }
            }
            /**
             * Set cell size.
             *
             * @param width
             * % value or 'auto' or px
             *
             * @param height
             * value in px
             */
            setSize(width, height) {
                const cell = this, editMode = cell.row.layout.board.editMode;
                if (cell.container) {
                    if (width) {
                        if (width === 'auto' &&
                            cell.container.style.flex !== '1 1 0%') {
                            cell.container.style.flex = '1 1 0%';
                        }
                        else {
                            const cellWidth = cell.convertWidthToValue(width);
                            if (cellWidth &&
                                cell.container.style.flex !== '0 0 ' + cellWidth) {
                                cell.container.style.flex = '0 0 ' + cellWidth;
                            }
                            cell.options.width = cellWidth;
                        }
                    }
                    if (height) {
                        cell.options.height = cell.container.style.height =
                            height + 'px';
                    }
                    if (editMode) {
                        editMode.hideContextPointer();
                        if (editMode.cellToolbar &&
                            editMode.cellToolbar.isVisible) {
                            if (editMode.cellToolbar.cell === cell) {
                                editMode.cellToolbar.showToolbar(cell);
                            }
                            else {
                                editMode.cellToolbar.hide();
                            }
                        }
                    }
                    // Call cellResize board event.
                    fireEvent(cell.row.layout.board, 'cellResize', { cell: cell });
                    fireEvent(cell.row, 'cellChange', { cell: cell, row: cell.row });
                }
            }
            // Updates width in responsive options.
            updateSize(width, // % value or 'auto' or px
            rwdMode // small, medium, large
            ) {
                const cell = this, cntSize = rwdMode ||
                    cell.row.layout.board.getLayoutContainerSize();
                if (!cell.options.responsive) {
                    cell.options.responsive = {};
                }
                cell.options.responsive[cntSize] = {
                    width: width
                };
            }
            setHighlight(remove) {
                const cell = this, editMode = cell.row.layout.board.editMode;
                if (cell.container && editMode) {
                    const cnt = cell.container, isSet = cnt.classList.contains(EditGlobals.classNames.cellEditHighlight);
                    if (!remove && !isSet) {
                        cnt.classList.add(EditGlobals.classNames.cellEditHighlight);
                        cell.row.layout.board.container.classList.add(EditGlobals.classNames.dashboardCellEditHighlightActive);
                        cell.isHighlighted = true;
                    }
                    else if (remove && isSet) {
                        cnt.classList.remove(EditGlobals.classNames.cellEditHighlight);
                        cell.row.layout.board.container.classList.remove(EditGlobals.classNames.dashboardCellEditHighlightActive);
                        cell.isHighlighted = false;
                    }
                }
            }
            setActiveState() {
                // reset other boxes
                const cell = this;
                cell.row.layout.board.mountedComponents.forEach((mountedComponent) => {
                    if (mountedComponent.cell.container) {
                        mountedComponent.cell.container.classList.remove(Globals.classNames.cellActive);
                    }
                });
                // apply class
                if (cell.container) {
                    cell.container.classList.add(Globals.classNames.cellActive);
                }
            }
            /**
             * Enables or disables the loading indicator in the cell.
             *
             * @internal
             */
            setLoadingState(enabled = true) {
                this.container?.classList?.toggle(Globals.classNames.cellLoading, enabled);
            }
            convertWidthToValue(width) {
                if (typeof width === 'number') {
                    return width + 'px';
                }
                if (/px/.test(width)) {
                    return width;
                }
                return GUIElement.getPercentageWidth(width) || '';
            }
        }
        /* *
         *
         *  Default Export
         *
         * */

        return Cell;
    });
    _registerModule(_modules, 'Dashboards/Layout/Row.js', [_modules['Dashboards/Globals.js'], _modules['Dashboards/Layout/Cell.js'], _modules['Dashboards/Layout/GUIElement.js'], _modules['Core/Utilities.js'], _modules['Dashboards/EditMode/EditGlobals.js']], function (Globals, Cell, GUIElement, U, EditGlobals) {
        /* *
         *
         *  (c) 2009 - 2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sebastian Bochan
         *  - Wojciech Chmiel
         *  - Gøran Slettemark
         *  - Sophie Bremer
         *
         * */
        const { pick, defined, merge, objectEach, fireEvent } = U;
        /**
         * @internal
         **/
        class Row extends GUIElement {
            /* *
            *
            *  Static Properties
            *
            * */
            /** @internal */
            static fromJSON(json, layout) {
                if (layout) {
                    const options = json.options;
                    let id = options.containerId || '';
                    if (id && layout.copyId) {
                        id = id + '_' + layout.copyId;
                    }
                    return new Row(layout, {
                        id: id,
                        parentContainerId: (layout.container && layout.container.id) ||
                            options.parentContainerId,
                        cellsJSON: options.cells,
                        style: options.style
                    });
                }
                return void 0;
            }
            static setContainerHeight(rowContainer, height) {
                if (height) {
                    rowContainer.style.height = height + 'px';
                }
            }
            /* *
            *
            *  Constructor
            *
            * */
            /**
             * Constructs an instance of the Row class.
             *
             * @param {Layout} layout
             * Reference to the layout instance.
             *
             * @param {Row.Options} options
             * Options for the row.
             *
             * @param {HTMLElement} rowElement
             * The container of the row HTML element.
             */
            constructor(layout, options, rowElement) {
                super();
                /**
                 * The type of GUI element.
                 */
                this.type = Globals.guiElementType.row;
                this.layout = layout;
                this.cells = [];
                this.options = options;
                this.isVisible = true;
                // Get parent container
                const parentContainer = document.getElementById(options.parentContainerId || '') ||
                    layout.container;
                const layoutOptions = (layout.options || {}), rowClassName = layoutOptions.rowClassName || '';
                this.container = this.getElementContainer({
                    render: layout.board.guiEnabled,
                    parentContainer: parentContainer,
                    attribs: {
                        id: options.id,
                        className: Globals.classNames.row + ' ' +
                            rowClassName
                    },
                    element: rowElement,
                    elementId: options.id,
                    style: merge(layoutOptions.style, options.style)
                });
                // Init rows from options.
                if (this.options.cells) {
                    this.setCells();
                }
                // Init rows from JSON.
                if (options.cellsJSON && !this.cells.length) {
                    this.setCellsFromJSON(options.cellsJSON);
                }
            }
            /* *
            *
            *  Functions
            *
            * */
            /**
             * Set the row cells using cell options or cellClassName.
             */
            setCells() {
                const row = this, cellClassName = (row.layout.options || {}).cellClassName || '', cellsElements = pick(row.options.cells, row.container && row.container.getElementsByClassName(cellClassName)) || [];
                let cellElement, i, iEnd;
                for (i = 0, iEnd = cellsElements.length; i < iEnd; ++i) {
                    cellElement = cellsElements[i];
                    row.addCell(row.layout.board.guiEnabled ? cellElement : { id: '' }, cellElement instanceof HTMLElement ? cellElement : void 0);
                }
            }
            /** @internal */
            setCellsFromJSON(json) {
                const row = this, componentsToMount = [];
                let cell, cellJSON;
                // Set cells.
                for (let i = 0, iEnd = json.length; i < iEnd; ++i) {
                    cellJSON = json[i];
                    cell = Cell.fromJSON({
                        $class: cellJSON.$class,
                        options: {
                            containerId: cellJSON.options.containerId,
                            parentContainerId: cellJSON.options.parentContainerId,
                            width: cellJSON.options.width,
                            height: cellJSON.options.height,
                            style: cellJSON.options.style,
                            layoutJSON: cellJSON.options.layoutJSON,
                            mountedComponentJSON: void 0 // Will be mounted later.
                        }
                    }, row);
                    if (cell) {
                        row.cells.push(cell);
                        if (cellJSON.options.mountedComponentJSON) {
                            componentsToMount.push({
                                cell: cell,
                                // eslint-disable-next-line
                                mountedComponentJSON: cellJSON.options.mountedComponentJSON
                            });
                        }
                    }
                }
                // Mount components.
                for (let i = 0, iEnd = componentsToMount.length; i < iEnd; ++i) {
                    componentsToMount[i].cell.mountComponentFromJSON(componentsToMount[i].mountedComponentJSON, (cell || {}).container);
                }
            }
            /**
             * Add a new Cell instance to the row cells array.
             *
             * @param {Cell.Options} [options]
             * Options for the row cell.
             *
             * @param {HTMLElement} [cellElement]
             * The container for a new cell HTML element.
             *
             * @return {Cell}
             * Returns the Cell object.
             */
            addCell(options, cellElement, index) {
                const row = this, cell = new Cell(row, options, cellElement);
                if (!defined(index)) {
                    row.cells.push(cell);
                }
                else {
                    row.mountCell(cell, index);
                }
                // Set editMode events.
                if (row.layout.board.editMode) {
                    row.layout.board.editMode.setCellEvents(cell);
                }
                return cell;
            }
            /**
             * Destroy the element, its container, event hooks
             * and inner cells.
             */
            destroy() {
                const row = this;
                const { layout } = row;
                // Destroy cells.
                for (let i = 0, iEnd = row.cells.length; i < iEnd; ++i) {
                    if (row.cells[i]) {
                        row.cells[i].destroy();
                    }
                }
                if (row.layout) {
                    row.layout.unmountRow(row);
                    super.destroy();
                    if (layout.rows.length === 0) {
                        layout.destroy();
                    }
                }
            }
            /**
             * Converts the class instance to a class JSON.
             * @internal
             *
             * @return {Row.JSON}
             * Class JSON of this Row instance.
             */
            toJSON() {
                const row = this, layoutContainerId = (row.layout.container || {}).id || '', cells = [];
                // Get cells JSON.
                for (let i = 0, iEnd = row.cells.length; i < iEnd; ++i) {
                    cells.push(row.cells[i].toJSON());
                }
                return {
                    $class: 'Dashboards.Layout.Row',
                    options: {
                        containerId: row.container.id,
                        parentContainerId: layoutContainerId,
                        cells: cells,
                        style: row.options.style
                    }
                };
            }
            /**
             * Get the row's options.
             * @returns
             * The JSON of row's options.
             *
             * @internal
             *
             */
            getOptions() {
                const row = this, cells = [];
                for (let i = 0, iEnd = row.cells.length; i < iEnd; ++i) {
                    cells.push(row.cells[i].getOptions());
                }
                return {
                    id: this.options.id,
                    style: this.options.style,
                    cells
                };
            }
            setSize(height) {
                const cells = this.cells;
                Row.setContainerHeight(this.container, height);
            }
            // Get cell index from the row.cells array.
            getCellIndex(cell) {
                for (let i = 0, iEnd = this.cells.length; i < iEnd; ++i) {
                    if (this.cells[i].id === cell.id) {
                        return i;
                    }
                }
            }
            // Add cell to the row.cells array and move cell container.
            mountCell(cell, index = 0) {
                const row = this, nextCell = row.cells[index], prevCell = row.cells[index - 1];
                if (cell.container) {
                    if (nextCell && nextCell.container) {
                        nextCell.container.parentNode.insertBefore(cell.container, nextCell.container);
                    }
                    else if (prevCell && prevCell.container) {
                        prevCell.container.parentNode.insertBefore(cell.container, prevCell.container.nextSibling);
                    }
                    else if (!prevCell && !nextCell && row.container) {
                        row.container.appendChild(cell.container);
                    }
                    row.cells.splice(index, 0, cell);
                    cell.row = row;
                    setTimeout(() => {
                        fireEvent(row, 'cellChange', { row, cell });
                    }, 0);
                }
            }
            // Remove cell from the row.cells array.
            unmountCell(cell) {
                const cellIndex = this.getCellIndex(cell);
                if (defined(cellIndex)) {
                    this.cells.splice(cellIndex, 1);
                }
                setTimeout(() => {
                    fireEvent(this, 'cellChange', { row: this, cell });
                }, 0);
            }
            getVisibleCells() {
                const cells = [];
                for (let i = 0, iEnd = this.cells.length; i < iEnd; ++i) {
                    if (this.cells[i].isVisible) {
                        cells.push(this.cells[i]);
                    }
                }
                return cells;
            }
            changeVisibility(setVisible = true, displayStyle) {
                const row = this;
                super.changeVisibility(setVisible, displayStyle);
                // Change layout visibility if needed.
                if (!row.layout.getVisibleRows().length) {
                    row.layout.hide();
                }
                else if (row.isVisible && !row.layout.isVisible) {
                    row.layout.show();
                }
            }
            show() {
                this.changeVisibility(true, 'flex');
            }
            setHighlight(remove) {
                if (this.container) {
                    const cnt = this.container, isSet = cnt.classList.contains(EditGlobals.classNames.rowContextHighlight);
                    if (!remove && !isSet) {
                        cnt.classList.add(EditGlobals.classNames.rowContextHighlight);
                    }
                    else if (remove && isSet) {
                        cnt.classList.remove(EditGlobals.classNames.rowContextHighlight);
                    }
                }
            }
            // Row can have cells below each others.
            // This method returns cells split into levels.
            getRowLevels() {
                const row = this, rowLevels = {}, rowLevelsArray = [];
                let cell, cellOffsets;
                for (let k = 0, kEnd = row.cells.length; k < kEnd; ++k) {
                    cell = row.cells[k];
                    if (cell.isVisible) {
                        cellOffsets = GUIElement.getOffsets(cell);
                        if (!rowLevels[cellOffsets.top]) {
                            rowLevels[cellOffsets.top] = {
                                top: cellOffsets.top,
                                bottom: cellOffsets.bottom,
                                cells: []
                            };
                        }
                        if (rowLevels[cellOffsets.top].bottom < cellOffsets.bottom) {
                            rowLevels[cellOffsets.top].bottom = cellOffsets.bottom;
                        }
                        rowLevels[cellOffsets.top].cells.push(cell);
                    }
                }
                objectEach(rowLevels, (value) => {
                    rowLevelsArray.push(value);
                });
                return rowLevelsArray;
            }
            // Get row level with additional info
            // on a specific Y position.
            getRowLevelInfo(posY) {
                const rowLevels = this.getRowLevels();
                let rowLevelInfo;
                for (let i = 0, iEnd = rowLevels.length; i < iEnd; ++i) {
                    if (rowLevels[i].top <= posY && rowLevels[i].bottom > posY) {
                        rowLevelInfo = {
                            index: i,
                            rowLevels: rowLevels,
                            rowLevel: rowLevels[i]
                        };
                    }
                }
                return rowLevelInfo;
            }
        }

        return Row;
    });
    _registerModule(_modules, 'Dashboards/Layout/Layout.js', [_modules['Dashboards/Utilities.js'], _modules['Core/Utilities.js'], _modules['Dashboards/Layout/Row.js'], _modules['Dashboards/Layout/GUIElement.js'], _modules['Dashboards/Globals.js']], function (DU, U, Row, GUIElement, Globals) {
        /* *
         *
         *  (c) 2009 - 2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sebastian Bochan
         *  - Wojciech Chmiel
         *  - Gøran Slettemark
         *  - Sophie Bremer
         *
         * */
        const { uniqueKey } = DU;
        const { pick, defined } = U;
        /**
         * @internal
         **/
        class Layout extends GUIElement {
            /* *
            *
            *  Static Properties
            *
            * */
            /** @internal */
            static fromJSON(json, board, parentCell) {
                const options = json.options, 
                // Check if layout container exists.
                container = document.getElementById(json.options.containerId), layout = new Layout(board, {
                    id: options.containerId,
                    copyId: container ? uniqueKey() : '',
                    parentContainerId: options.parentContainerId || board.container.id,
                    rowsJSON: options.rows,
                    style: options.style
                }, parentCell);
                // Save layout in the dashboard.
                if (layout && !parentCell) {
                    board.layouts.push(layout);
                }
                return layout;
            }
            /** @internal */
            static importLocal(id, board) {
                const layoutOptions = localStorage.getItem(Globals.classNamePrefix + id);
                let layout;
                if (layoutOptions) {
                    layout = Layout.fromJSON(JSON.parse(layoutOptions), board);
                }
                return layout;
            }
            /* *
            *
            *  Constructor
            *
            * */
            /**
             * Constructs an instance of the Layout class.
             *
             * @param {Dashboard} board
             * Reference to the dashboard instance.
             *
             * @param {Layout.Options} options
             * Options for the layout.
             */
            constructor(board, options, parentCell) {
                super();
                /**
                 * The type of GUI element.
                 */
                this.type = Globals.guiElementType.layout;
                this.board = board;
                this.rows = [];
                this.options = options;
                this.isVisible = true;
                // Get parent container
                const parentContainer = parentCell ? parentCell.container :
                    document.getElementById(options.parentContainerId || '') || board.layoutsWrapper;
                // Set layout level.
                if (parentCell) {
                    this.parentCell = parentCell;
                    this.level = parentCell.row.layout.level + 1;
                }
                else {
                    this.level = 0;
                }
                // GUI structure
                if (options.copyId) {
                    this.copyId = options.copyId;
                }
                const layoutOptions = (this.options || {}), layoutClassName = layoutOptions.rowClassName || '';
                this.container = this.getElementContainer({
                    render: board.guiEnabled,
                    parentContainer: parentContainer,
                    attribs: {
                        id: (options.id || '') + (this.copyId ? '_' + this.copyId : ''),
                        className: Globals.classNames.layout + ' ' +
                            layoutClassName
                    },
                    elementId: options.id,
                    style: this.options.style
                });
                // Init rows from options.
                if (this.options.rows) {
                    this.setRows();
                }
                // Init rows from JSON.
                if (options.rowsJSON && !this.rows.length) {
                    this.setRowsFromJSON(options.rowsJSON);
                }
            }
            /* *
            *
            *  Functions
            *
            * */
            /**
             * Set the layout rows using rows options or rowClassName.
             */
            setRows() {
                const layout = this, rowsElements = pick(layout.options.rows, layout.container && layout.container.getElementsByClassName(layout.options.rowClassName || '')) || [];
                let rowElement, i, iEnd;
                for (i = 0, iEnd = rowsElements.length; i < iEnd; ++i) {
                    rowElement = rowsElements[i];
                    layout.addRow(layout.board.guiEnabled ? rowElement : {}, rowElement instanceof HTMLElement ? rowElement : void 0);
                }
            }
            /** @internal */
            setRowsFromJSON(json) {
                const layout = this;
                let row;
                for (let i = 0, iEnd = json.length; i < iEnd; ++i) {
                    row = Row.fromJSON(json[i], layout);
                    if (row) {
                        layout.rows.push(row);
                    }
                }
            }
            /**
             * Add a new Row instance to the layout rows array.
             *
             * @param {Row.Options} options
             * Options of a row.
             *
             * @param {HTMLElement} rowElement
             * The container for a new row HTML element.
             *
             * @return {Row}
             * Returns the Row object.
             */
            addRow(options, rowElement, index) {
                const layout = this, row = new Row(layout, options, rowElement);
                if (!defined(index)) {
                    layout.rows.push(row);
                }
                else {
                    layout.mountRow(row, index);
                }
                // Set editMode events.
                if (layout.board.editMode) {
                    layout.board.editMode.setRowEvents(row);
                }
                return row;
            }
            /**
             * Destroy the element, its container, event hooks
             * and inner rows.
             */
            destroy() {
                const layout = this;
                for (let i = layout.board.layouts.length - 1; i >= 0; i--) {
                    if (layout.board.layouts[i] === layout) {
                        layout.board.layouts.splice(i, 1);
                    }
                }
                // Destroy rows.
                for (let i = layout.rows.length - 1; i >= 0; i--) {
                    layout.rows[i].destroy();
                }
                if (layout.parentCell) {
                    layout.parentCell.destroy();
                }
                super.destroy();
            }
            /**
             * Export layout's options and save in the local storage
             * @internal
             */
            exportLocal() {
                localStorage.setItem(Globals.classNamePrefix + this.options.id, JSON.stringify(this.toJSON()));
            }
            // Get row index from the layout.rows array.
            getRowIndex(row) {
                for (let i = 0, iEnd = this.rows.length; i < iEnd; ++i) {
                    if (this.rows[i] === row) {
                        return i;
                    }
                }
            }
            // Add cell to the layout.rows array and move row container.
            mountRow(row, index) {
                const nextRow = this.rows[index], prevRow = this.rows[index - 1];
                if (row.container) {
                    if (nextRow && nextRow.container) {
                        nextRow.container.parentNode.insertBefore(row.container, nextRow.container);
                    }
                    else if (prevRow && prevRow.container) {
                        prevRow.container.parentNode.insertBefore(row.container, prevRow.container.nextSibling);
                    }
                    this.rows.splice(index, 0, row);
                    row.layout = this;
                }
            }
            // Remove row from the layout.rows array.
            unmountRow(row) {
                const rowIndex = this.getRowIndex(row);
                if (defined(rowIndex)) {
                    this.rows.splice(rowIndex, 1);
                }
            }
            getVisibleRows() {
                const rows = [];
                for (let i = 0, iEnd = this.rows.length; i < iEnd; ++i) {
                    if (this.rows[i].isVisible) {
                        rows.push(this.rows[i]);
                    }
                }
                return rows;
            }
            changeVisibility(setVisible = true) {
                const layout = this;
                super.changeVisibility(setVisible);
                // Change parentCell visibility.
                if (layout.parentCell) {
                    if (layout.isVisible && !layout.parentCell.isVisible) {
                        layout.parentCell.show();
                    }
                    else if (!layout.isVisible && layout.parentCell.isVisible) {
                        layout.parentCell.hide();
                    }
                }
            }
            /**
             * Converts the class instance to a class JSON.
             * @internal
             *
             * @return {Layout.JSON}
             * Class JSON of this Layout instance.
             */
            toJSON() {
                const layout = this, dashboardContainerId = (layout.board.container || {}).id || '', rows = [];
                // Get rows JSON.
                for (let i = 0, iEnd = layout.rows.length; i < iEnd; ++i) {
                    rows.push(layout.rows[i].toJSON());
                }
                return {
                    $class: 'Dashboards.Layout',
                    options: {
                        containerId: layout.container.id,
                        parentContainerId: dashboardContainerId,
                        rows: rows,
                        style: layout.options.style
                    }
                };
            }
            /**
             * Get the layout's options.
             * @returns
             * The JSON of layout's options.
             *
             * @internal
             *
             */
            getOptions() {
                const layout = this, rows = [];
                // Get rows JSON.
                for (let i = 0, iEnd = layout.rows.length; i < iEnd; ++i) {
                    rows.push(layout.rows[i].getOptions());
                }
                return {
                    id: this.options.id,
                    layoutClassName: this.options.layoutClassName,
                    rowClassName: this.options.rowClassName,
                    cellClassName: this.options.cellClassName,
                    style: this.options.style,
                    rows
                };
            }
        }

        return Layout;
    });
    _registerModule(_modules, 'Dashboards/EditMode/SidebarPopup.js', [_modules['Dashboards/EditMode/AccordionMenu.js'], _modules['Shared/BaseForm.js'], _modules['Dashboards/Actions/Bindings.js'], _modules['Dashboards/EditMode/EditGlobals.js'], _modules['Dashboards/EditMode/EditRenderer.js'], _modules['Dashboards/Layout/GUIElement.js'], _modules['Dashboards/Layout/Layout.js'], _modules['Core/Utilities.js']], function (AccordionMenu, BaseForm, Bindings, EditGlobals, EditRenderer, GUIElement, Layout, U) {
        /* *
         *
         *  (c) 2009 - 2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  Pawel Lysy
         *
         * */
        const { addEvent, createElement, merge } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Class which creates the sidebar and handles its behaviour.
         */
        class SidebarPopup extends BaseForm {
            /* *
             *
             *  Constructor
             *
             * */
            /**
             * Constructor of the SidebarPopup class.
             *
             * @param parentDiv
             * Element to which the sidebar will be appended.
             * @param iconsURL
             * URL to the icons.
             * @param editMode
             * Instance of EditMode.
             */
            constructor(parentDiv, iconsURL, editMode) {
                super(parentDiv, iconsURL);
                /**
                 * Whether the sidebar is visible.
                 */
                this.isVisible = false;
                this.editMode = editMode;
                this.accordionMenu = new AccordionMenu(this.iconsURL, this.hide.bind(this));
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Function to detect on which side of the screen should the sidebar be.
             *
             * @param context
             * The cell or row which is the context of the sidebar.
             * @returns
             * Whether the sidebar should be on the right side of the screen.
             */
            detectRightSidebar(context) {
                const editMode = this.editMode;
                const layoutWrapper = editMode.board.layoutsWrapper;
                return GUIElement.getOffsets(context, layoutWrapper).left < ((layoutWrapper.offsetWidth / 2) - 10); // 10 = snap
            }
            /**
             * Function to remove the class names from the sidebar.
             */
            removeClassNames() {
                const classNames = EditGlobals.classNames, classList = this.container.classList;
                classList.remove(classNames.editSidebarShow);
                classList.remove(classNames.editSidebarRightShow);
            }
            /**
             * Function to add the class names to the sidebar depending on the position
             * of the sidebar.
             *
             * @param isRightSidebar
             * Whether the sidebar should be on the right side of the screen.
             */
            addClassNames(isRightSidebar) {
                const classList = this.container.classList;
                if (isRightSidebar) {
                    classList.add(EditGlobals.classNames.editSidebarRight);
                }
                else {
                    classList.remove(EditGlobals.classNames.editSidebarRight);
                }
                setTimeout(() => {
                    classList.add(EditGlobals.classNames[isRightSidebar ? 'editSidebarRightShow' : 'editSidebarShow']);
                });
            }
            /**
             * Function to show the sidebar.
             *
             * @param context
             * The cell or row which is the context of the sidebar.
             */
            show(context) {
                const editMode = this.editMode, isRightSidebar = !!(context && this.detectRightSidebar(context));
                this.showPopup(EditGlobals.classNames.editSidebarShow);
                this.addClassNames(isRightSidebar);
                if (editMode.resizer) {
                    editMode.resizer.disableResizer();
                }
                // Remove highlight from the row.
                if (editMode.editCellContext && editMode.editCellContext.row) {
                    editMode.editCellContext.row.setHighlight(true);
                }
                editMode.hideToolbars(['cell', 'row']);
                editMode.stopContextDetection();
                this.isVisible = true;
                this.generateContent(context);
            }
            generateContent(context) {
                // Title
                this.renderHeader(context ?
                    this.editMode.lang.settings :
                    this.editMode.lang.addComponent, '');
                if (!context) {
                    this.renderAddComponentsList();
                    return;
                }
                const type = context.getType();
                if (type === 'cell') {
                    const component = context.mountedComponent;
                    if (!component) {
                        return;
                    }
                    this.accordionMenu.renderContent(this.container, component);
                }
            }
            renderAddComponentsList() {
                const sidebar = this;
                const components = SidebarPopup.components;
                let gridElement;
                const gridWrapper = createElement('div', {
                    className: EditGlobals.classNames.editGridItems
                }, {}, sidebar.container);
                for (let i = 0, iEnd = components.length; i < iEnd; ++i) {
                    gridElement = createElement('div', {}, {}, gridWrapper);
                    // Drag drop new component.
                    gridElement.addEventListener('mousedown', (e) => {
                        if (sidebar.editMode.dragDrop) {
                            const onMouseLeave = () => {
                                sidebar.hide();
                            };
                            sidebar.container.addEventListener('mouseleave', onMouseLeave);
                            sidebar.editMode.dragDrop.onDragStart(e, void 0, (dropContext) => {
                                // Add component if there is no layout yet.
                                if (this.editMode.board.layouts.length === 0) {
                                    const board = this.editMode.board, newLayoutName = GUIElement.createElementId('layout'), layout = new Layout(board, {
                                        id: newLayoutName,
                                        copyId: '',
                                        parentContainerId: board.container.id,
                                        rows: [{}],
                                        style: {}
                                    });
                                    if (layout) {
                                        board.layouts.push(layout);
                                    }
                                    dropContext = layout.rows[0];
                                }
                                const newCell = components[i].onDrop(sidebar, dropContext);
                                if (newCell) {
                                    const mountedComponent = newCell.mountedComponent;
                                    // skip init connector when is not defined by
                                    // options f.e HTML component.
                                    if (mountedComponent.options?.connector?.id) {
                                        mountedComponent.initConnector();
                                    }
                                    sidebar.editMode.setEditCellContext(newCell);
                                    sidebar.show(newCell);
                                    newCell.setHighlight();
                                }
                                sidebar.container.removeEventListener('mouseleave', onMouseLeave);
                            });
                        }
                    });
                    gridElement.innerHTML = components[i].text;
                }
                return;
            }
            onDropNewComponent(dropContext, componentOptions) {
                const sidebar = this, dragDrop = sidebar.editMode.dragDrop;
                if (dragDrop) {
                    const row = (dropContext.getType() === 'cell' ?
                        dropContext.row :
                        dropContext), newCell = row.addCell({
                        id: GUIElement.createElementId('col')
                    });
                    dragDrop.onCellDragEnd(newCell);
                    const options = merge(componentOptions, {
                        cell: newCell.id
                    });
                    Bindings.addComponent(options, newCell);
                    sidebar.editMode.setEditOverlay();
                    return newCell;
                }
            }
            /**
             * Function to hide the sidebar.
             */
            hide() {
                const editMode = this.editMode;
                const editCellContext = editMode.editCellContext;
                this.removeClassNames();
                // Remove edit overlay if active.
                if (editMode.isEditOverlayActive) {
                    editMode.setEditOverlay(true);
                }
                if (editCellContext && editCellContext.row) {
                    editMode.showToolbars(['cell', 'row'], editCellContext);
                    editCellContext.row.setHighlight();
                    // Remove cell highlight if active.
                    if (editCellContext.isHighlighted) {
                        editCellContext.setHighlight(true);
                    }
                }
                editMode.isContextDetectionActive = true;
                this.isVisible = false;
            }
            /**
             * Function called when the close button is pressed.
             */
            closeButtonEvents() {
                this.hide();
            }
            renderHeader(title, iconURL) {
                const icon = EditRenderer.renderIcon(this.container, {
                    icon: iconURL,
                    className: EditGlobals.classNames.editSidebarTitle
                });
                if (icon) {
                    icon.textContent = title;
                }
            }
            /**
             * Function to create and add the close button to the sidebar.
             *
             * @param className
             * Class name of the close button.
             * @returns Close button element
             */
            addCloseButton(className = EditGlobals.classNames.popupCloseButton) {
                return super.addCloseButton.call(this, className);
            }
            /**
             * Function that creates the container of the sidebar.
             *
             * @param parentDiv
             * The parent div to which the sidebar will be appended.
             * @param className
             * Class name of the sidebar.
             * @returns The container of the sidebar.
             */
            createPopupContainer(parentDiv, className = EditGlobals.classNames.editSidebar) {
                return super.createPopupContainer.call(this, parentDiv, className);
            }
        }
        SidebarPopup.components = [
            {
                text: 'HTML',
                onDrop: function (sidebar, dropContext) {
                    if (sidebar && dropContext) {
                        return sidebar.onDropNewComponent(dropContext, {
                            cell: '',
                            type: 'HTML',
                            elements: [{
                                    tagName: 'img',
                                    attributes: {
                                        src: 'https://www.highcharts.com/samples/graphics/stock-dark.svg'
                                    }
                                }]
                        });
                    }
                }
            }, {
                text: 'layout',
                onDrop: function (sidebar, dropContext) {
                    if (!dropContext) {
                        return;
                    }
                    const row = (dropContext.getType() === 'cell' ?
                        dropContext.row :
                        dropContext), board = row.layout.board, newLayoutName = GUIElement.createElementId('layout'), cellName = GUIElement.createElementId('cell'), layout = new Layout(board, {
                        id: newLayoutName,
                        copyId: '',
                        parentContainerId: board.container.id,
                        rows: [{
                                cells: [{
                                        id: cellName
                                    }]
                            }],
                        style: {}
                    });
                    if (layout) {
                        board.layouts.push(layout);
                    }
                    Bindings.addComponent({
                        type: 'HTML',
                        cell: cellName,
                        elements: [
                            {
                                tagName: 'div',
                                style: { 'text-align': 'center' },
                                textContent: 'Placeholder text'
                            }
                        ]
                    });
                }
            }, {
                text: 'chart',
                onDrop: function (sidebar, dropContext) {
                    if (sidebar && dropContext) {
                        const connectorsIds = sidebar.editMode.board.dataPool.getConnectorIds();
                        let options = {
                            cell: '',
                            type: 'Highcharts',
                            chartOptions: {
                                chart: {
                                    animation: false,
                                    type: 'column',
                                    zooming: {}
                                }
                            }
                        };
                        if (connectorsIds.length) {
                            options = {
                                ...options,
                                connector: {
                                    id: connectorsIds[0]
                                }
                            };
                        }
                        return sidebar.onDropNewComponent(dropContext, options);
                    }
                }
            }, {
                text: 'datagrid',
                onDrop: function (sidebar, dropContext) {
                    if (sidebar && dropContext) {
                        const connectorsIds = sidebar.editMode.board.dataPool.getConnectorIds();
                        let options = {
                            cell: '',
                            type: 'DataGrid'
                        };
                        if (connectorsIds.length) {
                            options = {
                                ...options,
                                connector: {
                                    id: connectorsIds[0]
                                }
                            };
                        }
                        return sidebar.onDropNewComponent(dropContext, options);
                    }
                }
            }, {
                text: 'KPI',
                onDrop: function (sidebar, dropContext) {
                    if (sidebar && dropContext) {
                        const connectorsIds = sidebar.editMode.board.dataPool.getConnectorIds();
                        let options = {
                            cell: '',
                            type: 'KPI'
                        };
                        if (connectorsIds.length) {
                            options = {
                                ...options,
                                connector: {
                                    id: connectorsIds[0]
                                }
                            };
                        }
                        return sidebar.onDropNewComponent(dropContext, options);
                    }
                }
            }
        ];
        /* *
         *
         *  Default Export
         *
         * */

        return SidebarPopup;
    });
    _registerModule(_modules, 'Dashboards/EditMode/EditContextMenu.js', [_modules['Dashboards/EditMode/EditGlobals.js'], _modules['Core/Utilities.js'], _modules['Dashboards/EditMode/Menu/Menu.js']], function (EditGlobals, U, Menu) {
        /* *
         *
         *  (c) 2009 - 2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sebastian Bochan
         *  - Wojciech Chmiel
         *  - Gøran Slettemark
         *  - Sophie Bremer
         *
         * */
        const { addEvent, merge } = U;
        /**
         * Class to create context menu.
         * @internal
         */
        class EditContextMenu extends Menu {
            /* *
             *
             *  Constructor
             *
             * */
            constructor(parentElement, options, editMode, parent) {
                super(editMode.board.container, merge(EditContextMenu.defaultOptions, options || {}), editMode);
                this.editMode = editMode;
                this.options = merge(EditContextMenu.defaultOptions, options || {});
                // Set the context menu container width.
                this.container.style.width = this.options.width + 'px';
                super.initItems(EditContextMenu.items);
                if (this.options.items) {
                    const items = [];
                    for (let i = 0, iEnd = this.options.items.length; i < iEnd; ++i) {
                        if (typeof this.options.items[i] === 'string') {
                            items.push(this.options.items[i]);
                        }
                        else if (this.options.items[i].id) {
                            items.push(this.options.items[i].id);
                        }
                    }
                    this.setActiveItems(items);
                }
                this.initEvents();
            }
            /* *
            *
            *  Functions
            *
            * */
            initEvents() {
                const contextMenu = this;
                // Click on document close the context menu
                // TODO refactor
                addEvent(document, 'click', (event) => {
                    if (event.target !== this.container &&
                        event.target !==
                            contextMenu.editMode.tools.contextButtonElement &&
                        !event.target.classList
                            .contains(EditGlobals.classNames.toggleSlider) &&
                        event.target.tagName !== 'INPUT' &&
                        this.isVisible) {
                        this.setVisible(false);
                    }
                });
            }
            setVisible(visible) {
                const contextMenu = this, contextButtonElement = contextMenu.editMode.tools.contextButtonElement;
                if (contextMenu.container && contextButtonElement) {
                    if (visible) {
                        contextMenu.container.style.display = 'block';
                        contextMenu.isVisible = true;
                        contextButtonElement.setAttribute('aria-expanded', 'true');
                    }
                    else {
                        contextMenu.container.style.display = 'none';
                        contextMenu.isVisible = false;
                        contextButtonElement.setAttribute('aria-expanded', 'false');
                    }
                }
            }
            updatePosition(ctxButton, x, y) {
                const contextMenu = this, width = contextMenu.options.width || 0, left = (ctxButton ?
                    ctxButton.offsetLeft - width + ctxButton.offsetWidth :
                    x), top = ctxButton ? ctxButton.offsetTop + ctxButton.offsetHeight : y;
                if (left && top) {
                    contextMenu.container.style.left = left + 'px';
                    contextMenu.container.style.top = top + 'px';
                }
            }
        }
        /* *
        *
        *  Static Properties
        *
        * */
        EditContextMenu.defaultOptions = {
            enabled: true,
            width: 150,
            className: EditGlobals.classNames.contextMenu,
            itemsClassName: EditGlobals.classNames.contextMenuItem,
            items: ['editMode']
        };
        /**
         * Default Context menu items.
         */
        EditContextMenu.items = merge(Menu.items, {
            editMode: {
                id: 'editMode',
                type: 'toggle',
                getValue: function (item) {
                    return item.menu.editMode.isActive();
                },
                langKey: 'editMode',
                events: {
                    click: function () {
                        this.menu.editMode.onEditModeToggle();
                    }
                }
            }
        });

        return EditContextMenu;
    });
    _registerModule(_modules, 'Dashboards/Actions/ContextDetection.js', [_modules['Core/Utilities.js'], _modules['Dashboards/Layout/GUIElement.js']], function (U, GUIElement) {
        /* *
         *
         *  (c) 2009 - 2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sebastian Bochan
         *  - Wojciech Chmiel
         *  - Gøran Slettemark
         *  - Sophie Bremer
         *
         * */
        const { defined } = U;
        class ContextDetection {
            static isGUIElementOnParentEdge(mouseContext, side // right, left, top, bottom
            ) {
                const visibleElements = (side === 'top' || side === 'bottom') ?
                    mouseContext.row.layout.getVisibleRows() :
                    (side === 'left' || side === 'right') ?
                        mouseContext.row.getVisibleCells() :
                        [];
                const lastElementIndex = (visibleElements.length - 1);
                return ((visibleElements[lastElementIndex] === mouseContext &&
                    side === 'right') ||
                    (visibleElements[lastElementIndex] === mouseContext.row &&
                        side === 'bottom') ||
                    (visibleElements[0] === mouseContext && side === 'left') ||
                    (visibleElements[0] === mouseContext.row && side === 'top'));
            }
            static getContextLevel(mouseContext, offset, sideOffset, side) {
                // Array of overlapped levels.
                const overlappedLevels = mouseContext.getOverlappingLevels(side, offset / 2);
                // Divide offset to level sections (eg 3 nested layouts -
                // cell edge will have 3 sections each 1/3 offset width).
                const divOffset = offset / overlappedLevels.length;
                // Overlapped nested layout level.
                const lastOverlappedLevel = overlappedLevels[overlappedLevels.length - 1];
                let level = mouseContext.row.layout.level - Math.floor(sideOffset / divOffset);
                level = level < lastOverlappedLevel ? lastOverlappedLevel : (level > mouseContext.row.layout.level ?
                    mouseContext.row.layout.level : level);
                return level;
            }
            static getContext(mouseCellContext, e, offset) {
                let sideOffset;
                // get cell offsets, width, height
                const mouseCellContextOffsets = GUIElement.getOffsets(mouseCellContext);
                const { width, height } = GUIElement.getDimFromOffsets(mouseCellContextOffsets);
                // Correct offset when element to small.
                if (width < 2 * offset) {
                    offset = width / 2;
                }
                // Get mouse position relative to the mouseContext sides.
                const leftSideX = e.clientX - mouseCellContextOffsets.left;
                const topSideY = e.clientY - mouseCellContextOffsets.top;
                // get cell side - right, left, top, bottom
                const sideY = topSideY >= -offset && topSideY <= offset ? 'top' :
                    topSideY - height >= -offset && topSideY - height <= offset ?
                        'bottom' :
                        '';
                const sideX = leftSideX >= -offset && leftSideX <= offset ? 'left' :
                    leftSideX - width >= -offset && leftSideX - width <= offset ?
                        'right' :
                        '';
                const side = sideX ? sideX : sideY; // X is prioritized.
                switch (side) {
                    case 'right':
                        sideOffset = leftSideX - width + offset;
                        break;
                    case 'left':
                        sideOffset = offset - leftSideX;
                        break;
                    case 'top':
                        sideOffset = offset - topSideY;
                        break;
                    case 'bottom':
                        sideOffset = topSideY - height + offset;
                        break;
                }
                const context = {
                    cell: mouseCellContext,
                    side: side
                };
                // Nested layouts.
                if (mouseCellContext.row.layout.level !== 0 &&
                    side &&
                    ContextDetection.isGUIElementOnParentEdge(mouseCellContext, side) &&
                    defined(sideOffset)) {
                    const level = ContextDetection.getContextLevel(mouseCellContext, offset, sideOffset, side);
                    const cell = mouseCellContext.getParentCell(level);
                    if (cell) {
                        context.cell = cell;
                    }
                }
                return context;
            }
        }

        return ContextDetection;
    });
    _registerModule(_modules, 'Dashboards/Actions/DragDrop.js', [_modules['Core/Utilities.js'], _modules['Dashboards/Globals.js'], _modules['Dashboards/EditMode/EditGlobals.js'], _modules['Dashboards/Layout/GUIElement.js'], _modules['Dashboards/Actions/ContextDetection.js']], function (U, Globals, EditGlobals, GUIElement, ContextDetection) {
        /* *
         *
         *  (c) 2009 - 2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sebastian Bochan
         *  - Wojciech Chmiel
         *  - Gøran Slettemark
         *  - Sophie Bremer
         *
         * */
        const { addEvent, merge, css, fireEvent, createElement } = U;
        /**
         * Class providing a drag and drop functionality.
         * @internal
         */
        class DragDrop {
            /* *
             *
             *  Constructors
             *
             * */
            /**
             * Constructor for the DragDrop class.
             * @internal
             *
             * @param {EditMode} editMode
             * The parent editMode reference.
             *
             * @param {DragDrop.Options} options
             * Options for the DragDrop.
             */
            constructor(editMode, options) {
                this.editMode = editMode;
                this.options = merge(DragDrop.defaultOptions, options);
                this.mockElement = createElement('div', { className: EditGlobals.classNames.dragMock }, {}, editMode.board.container);
                this.dropPointer = {
                    isVisible: false,
                    align: '',
                    element: createElement('div', { className: EditGlobals.classNames.dropPointer }, {}, editMode.board.container)
                };
                this.isActive = false;
                this.initEvents();
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Method for showing and positioning drop pointer.
             *
             * @param {number} left
             * Drop pointer left position.
             *
             * @param {number} top
             * Drop pointer top position.
             *
             * @param {number} width
             * Drop pointer width.
             *
             * @param {number} height
             * Drop pointer height.
             */
            showDropPointer(left, top, width, height) {
                this.dropPointer.isVisible = true;
                css(this.dropPointer.element, {
                    display: 'block',
                    left: left + 'px',
                    top: top + 'px',
                    height: height + 'px',
                    width: width + 'px'
                });
            }
            /**
             * Method for hiding drop pointer.
             */
            hideDropPointer() {
                if (this.dropPointer.isVisible) {
                    this.dropPointer.isVisible = false;
                    this.dropPointer.align = '';
                    this.dropPointer.element.style.display = 'none';
                }
            }
            /**
             * Method for positioning drag mock element.
             *
             * @param {PointerEvent} mouseEvent
             * Mouse event.
             */
            setMockElementPosition(mouseEvent) {
                const dragDrop = this, dashBoundingRect = dragDrop.editMode.board.container.getBoundingClientRect(), offset = dragDrop.mockElement.clientWidth / 2, x = mouseEvent.clientX - dashBoundingRect.left - offset, y = mouseEvent.clientY - dashBoundingRect.top - offset;
                css(this.mockElement, { left: x + 'px', top: y + 'px' });
            }
            /**
             * Method for initializing drag drop events.
             */
            initEvents() {
                const dragDrop = this;
                // DragDrop events.
                addEvent(document, 'mousemove', dragDrop.onDrag.bind(dragDrop));
                addEvent(document, 'mouseup', dragDrop.onDragEnd.bind(dragDrop));
            }
            /**
             * General method used on drag start.
             *
             * @param {PointerEvent} e
             * Mouse event.
             *
             * @param {Cell|Row} context
             * Reference to the dragged context.
             *
             * @param {Function} dragEndCallback
             * Callback invoked on drag end.
             */
            onDragStart(e, context, dragEndCallback) {
                this.isActive = true;
                this.editMode.hideToolbars(['cell', 'row']);
                if (this.editMode.resizer) {
                    this.editMode.resizer.disableResizer();
                }
                this.setMockElementPosition(e);
                if (context) {
                    this.context = context;
                    context.hide();
                    if (context.getType() === Globals.guiElementType.cell) {
                        const draggedCell = context;
                        // Call cellResize board event.
                        fireEvent(this.editMode.board, 'cellResize', { cell: context });
                        fireEvent(draggedCell.row, 'cellChange', { cell: context, row: draggedCell.row });
                    }
                }
                else if (dragEndCallback) {
                    this.dragEndCallback = dragEndCallback;
                }
                css(this.mockElement, {
                    cursor: 'grabbing',
                    display: 'block'
                });
            }
            /**
             * General method used while dragging.
             *
             * @param {PointerEvent} e
             * Mouse event.
             */
            onDrag(e) {
                const dragDrop = this;
                if (dragDrop.isActive) {
                    e.preventDefault();
                    dragDrop.setMockElementPosition(e);
                    if (dragDrop.context) {
                        if (dragDrop.context.getType() ===
                            Globals.guiElementType.cell) {
                            dragDrop.onCellDrag(e);
                        }
                        else if (dragDrop.context.getType() ===
                            Globals.guiElementType.row) {
                            dragDrop.onRowDrag(e);
                        }
                    }
                    else if (dragDrop.dragEndCallback) {
                        dragDrop.onCellDrag(e);
                    }
                }
            }
            /**
             * General method used when drag finish.
             */
            onDragEnd() {
                const dragDrop = this;
                if (dragDrop.isActive) {
                    dragDrop.isActive = false;
                    css(dragDrop.mockElement, {
                        cursor: 'grab',
                        display: 'none'
                    });
                    if (dragDrop.context) {
                        if (dragDrop.context.getType() ===
                            Globals.guiElementType.cell) {
                            dragDrop.onCellDragEnd();
                        }
                        else if (dragDrop.context.getType() ===
                            Globals.guiElementType.row) {
                            dragDrop.onRowDragEnd();
                        }
                        dragDrop.context = void 0;
                        // Show toolbars and snaps.
                        if (dragDrop.editMode.editCellContext) {
                            dragDrop.editMode.showToolbars(['row', 'cell'], dragDrop.editMode.editCellContext);
                            if (dragDrop.editMode.resizer) {
                                dragDrop.editMode.resizer.setSnapPositions(dragDrop.editMode.editCellContext);
                            }
                        }
                    }
                    else if (dragDrop.dragEndCallback) {
                        dragDrop.dragEndCallback(dragDrop.dropContext);
                        dragDrop.dragEndCallback = void 0;
                        dragDrop.hideDropPointer();
                    }
                }
            }
            /**
             * Sets appropriate drop context and refresh drop pointer position when
             * row is dragged or cell is dragged as a row.
             *
             * @param {PointerEvent} e
             * Mouse event.
             *
             * @param {ContextDetection.ContextDetails} contextDetails
             * Context details (cell, side)
             */
            onRowDrag(e, contextDetails) {
                const dragDrop = this, mouseCellContext = dragDrop.mouseCellContext, dropPointerSize = dragDrop.options.dropPointerSize, offset = dragDrop.options.rowDropOffset;
                let updateDropPointer = false;
                if (mouseCellContext) {
                    const context = (contextDetails ||
                        ContextDetection.getContext(mouseCellContext, e, offset));
                    const align = context.side;
                    if (dragDrop.dropPointer.align !== align ||
                        dragDrop.dropContext !== context.cell.row) {
                        updateDropPointer = true;
                        dragDrop.dropPointer.align = align;
                        dragDrop.dropContext = context.cell.row;
                    }
                    if (align) {
                        const dropContextRowOffsets = GUIElement.getOffsets(dragDrop.dropContext, dragDrop.editMode.board.container);
                        const { width, height } = GUIElement
                            .getDimFromOffsets(dropContextRowOffsets);
                        // Update or show drop pointer.
                        if (!dragDrop.dropPointer.isVisible || updateDropPointer) {
                            dragDrop.showDropPointer(dropContextRowOffsets.left, dropContextRowOffsets.top + (dragDrop.dropPointer.align === 'bottom' ?
                                height :
                                0) - dropPointerSize / 2, width, dropPointerSize);
                        }
                    }
                    else {
                        dragDrop.dropContext = void 0;
                        dragDrop.hideDropPointer();
                    }
                }
            }
            /**
             * Unmounts dropped row and mounts it in a new position.
             */
            onRowDragEnd() {
                const dragDrop = this, draggedRow = dragDrop.context, dropContext = dragDrop.dropContext;
                if (dragDrop.dropPointer.align) {
                    draggedRow.layout.unmountRow(draggedRow);
                    // Destroy layout when empty.
                    if (draggedRow.layout.rows.length === 0) {
                        draggedRow.layout.destroy();
                    }
                    dropContext.layout.mountRow(draggedRow, (dropContext.layout.getRowIndex(dropContext) || 0) +
                        (dragDrop.dropPointer.align === 'bottom' ? 1 : 0));
                    // Call cellResize board event.
                    if (draggedRow.cells[0]) {
                        fireEvent(dragDrop.editMode.board, 'cellResize', { cell: draggedRow.cells[0] });
                        fireEvent(draggedRow, 'cellChange', { cell: draggedRow.cells[0], row: draggedRow });
                    }
                }
                dragDrop.hideDropPointer();
                draggedRow.show();
            }
            /**
             * Method used as middleware when cell is dragged.
             * Decides where to pass an event depending on the mouse context.
             *
             * @param {PointerEvent} e
             * Mouse event.
             *
             * @param {ContextDetection.ContextDetails} contextDetails
             * Context details (cell, side)
             */
            onCellDrag(e, contextDetails) {
                const dragDrop = this, mouseCellContext = dragDrop.mouseCellContext, offset = dragDrop.options.cellDropOffset;
                if (mouseCellContext || contextDetails) {
                    dragDrop.onCellDragCellCtx(e, contextDetails ||
                        ContextDetection.getContext(mouseCellContext, e, offset));
                }
                else if (dragDrop.mouseRowContext) {
                    dragDrop.onCellDragRowCtx(e, dragDrop.mouseRowContext);
                }
            }
            /**
             * Sets appropriate drop context and refreshes the drop pointer
             * position when a cell is dragged and a cell context is detected.
             *
             * @param {PointerEvent} e
             * Mouse event.
             *
             * @param {ContextDetection.ContextDetails} context
             * Context details (cell, side)
             */
            onCellDragCellCtx(e, context) {
                const dragDrop = this, dropPointerSize = dragDrop.options.dropPointerSize, align = context.side;
                let updateDropPointer = false;
                if (dragDrop.dropPointer.align !== align ||
                    dragDrop.dropContext !== context.cell) {
                    updateDropPointer = true;
                    dragDrop.dropPointer.align = align;
                    dragDrop.dropContext = context.cell;
                }
                if (align === 'right' || align === 'left') {
                    const dropContextOffsets = GUIElement.getOffsets(dragDrop.dropContext, dragDrop.editMode.board.container);
                    const { width, height } = GUIElement.getDimFromOffsets(dropContextOffsets);
                    // Update or show drop pointer.
                    if (!dragDrop.dropPointer.isVisible || updateDropPointer) {
                        const rowLevelInfo = dragDrop.dropContext.row.getRowLevelInfo(e.clientY), pointerHeight = (rowLevelInfo ?
                            (rowLevelInfo.rowLevel.bottom -
                                rowLevelInfo.rowLevel.top) :
                            height);
                        dragDrop.showDropPointer(dropContextOffsets.left + (align === 'right' ? width : 0) -
                            dropPointerSize / 2, dropContextOffsets.top, dropPointerSize, pointerHeight);
                    }
                }
                else if (align === 'top' || align === 'bottom') {
                    const dropContextOffsets = GUIElement.getOffsets(dragDrop.dropContext), rowLevelInfo = dragDrop.dropContext.row
                        .getRowLevelInfo(dropContextOffsets.top);
                    if (rowLevelInfo &&
                        ((rowLevelInfo.index === 0 && align === 'top') ||
                            (rowLevelInfo.index ===
                                rowLevelInfo.rowLevels.length - 1 &&
                                align === 'bottom'))) {
                        // Checks if a cell is dragged as a row
                        // (only when a cell edge is on a row edge)
                        dragDrop.onRowDrag(e, context);
                    }
                }
                else {
                    dragDrop.dropContext = void 0;
                    dragDrop.hideDropPointer();
                }
            }
            /**
             * Sets appropriate drop context and refreshes the drop pointer
             * position when a cell is dragged and a row context is detected.
             *
             * @param {PointerEvent} e
             * Mouse event.
             *
             * @param {Row} mouseRowContext
             * Row context.
             */
            onCellDragRowCtx(e, mouseRowContext) {
                const dragDrop = this, dropPointerSize = dragDrop.options.dropPointerSize, rowOffsets = GUIElement.getOffsets(mouseRowContext), rowLevelInfo = mouseRowContext.getRowLevelInfo(e.clientY);
                let cell, cellOffsets;
                if (rowLevelInfo) {
                    for (let i = 0, iEnd = rowLevelInfo.rowLevel.cells.length; i < iEnd; ++i) {
                        cell = rowLevelInfo.rowLevel.cells[i];
                        cellOffsets = GUIElement.getOffsets(cell);
                        const { width, height } = GUIElement
                            .getDimFromOffsets(cellOffsets), dashOffsets = dragDrop.editMode.board.container
                            .getBoundingClientRect(), levelHeight = (rowLevelInfo.rowLevel.bottom -
                            rowLevelInfo.rowLevel.top);
                        if (cell.isVisible) {
                            if (height < 0.8 * levelHeight &&
                                cellOffsets.left <= e.clientX &&
                                cellOffsets.right >= e.clientX) {
                                if (cellOffsets.top > e.clientY) {
                                    // @ToDo - Mouse above the cell.
                                }
                                else if (cellOffsets.bottom < e.clientY) {
                                    // Mouse below the cell.
                                    dragDrop.showDropPointer(cellOffsets.left - dashOffsets.left, cellOffsets.top - dashOffsets.top + height, width, levelHeight - height);
                                    dragDrop.dropPointer.align = 'nestedBottom';
                                    dragDrop.dropContext = cell;
                                }
                                i = iEnd; // Stop the loop
                            }
                            else if ((i === 0 && cellOffsets.left > e.clientX) ||
                                (i === iEnd - 1 && cellOffsets.right < e.clientX)) {
                                if (cellOffsets.left > e.clientX) {
                                    // @ToDo - Mouse on the cell left side.
                                }
                                else if (cellOffsets.right < e.clientX) {
                                    // Mouse on the cell right side.
                                    const pointerWidth = rowOffsets.right - cellOffsets.right;
                                    dragDrop.showDropPointer(cellOffsets.left + ((i === 0 && cellOffsets.left > e.clientX) ?
                                        0 :
                                        width) - dropPointerSize / 2 - dashOffsets.left, cellOffsets.top - dashOffsets.top, pointerWidth > dropPointerSize ?
                                        pointerWidth :
                                        dropPointerSize, levelHeight || height);
                                    dragDrop.dropPointer.align = 'right';
                                    dragDrop.dropContext = cell;
                                }
                                i = iEnd; // Stop the loop
                            }
                        }
                        else if (!cell.isVisible && cell === dragDrop.context) {
                            // Element is not visible.
                            dragDrop.dropContext = void 0;
                            dragDrop.hideDropPointer();
                        }
                    }
                }
            }
            /**
             * Unmounts dropped cell and mounts it in a new position.
             * When cell is dragged as a row also creates a new row
             * and mounts cell there.
             *
             * @param {Cell} contextCell
             * Cell used as a dragDrop context.
             */
            onCellDragEnd(contextCell) {
                const dragDrop = this, draggedCell = contextCell || dragDrop.context;
                let dropContext = dragDrop.dropContext;
                if (dragDrop.dropPointer.align && dropContext && draggedCell) {
                    draggedCell.row.unmountCell(draggedCell);
                    // Destroy row when empty.
                    if (draggedCell.row.cells.length === 0) {
                        draggedCell.row.destroy();
                    }
                    if ((dragDrop.dropPointer.align === 'top' ||
                        dragDrop.dropPointer.align === 'bottom') &&
                        dropContext.getType() === Globals.guiElementType.row) {
                        dropContext = dropContext;
                        const newRow = dropContext.layout.addRow({}, void 0, (dropContext.layout.getRowIndex(dropContext) || 0) +
                            (dragDrop.dropPointer.align === 'bottom' ? 1 : 0));
                        newRow.mountCell(draggedCell, 0);
                    }
                    else if (dragDrop.dropPointer.align === 'nestedBottom' &&
                        dropContext.getType() === Globals.guiElementType.cell) {
                        // Create nesting.
                        const dropContextCell = dropContext;
                        const row = dropContextCell.row;
                        const dropContextCellIndex = row.getCellIndex(dropContextCell);
                        row.unmountCell(dropContextCell);
                        const newCell = row.addCell({
                            id: GUIElement.createElementId('col-nested-'),
                            layout: {
                                rows: [{}, {}]
                            }
                        }, void 0, dropContextCellIndex);
                        if (newCell.nestedLayout) {
                            newCell.nestedLayout.rows[0].mountCell(dropContextCell);
                            newCell.nestedLayout.rows[1].mountCell(draggedCell);
                        }
                    }
                    else if (dropContext.getType() === Globals.guiElementType.cell) {
                        dropContext = dropContext;
                        dropContext.row.mountCell(draggedCell, (dropContext.row.getCellIndex(dropContext) || 0) +
                            (dragDrop.dropPointer.align === 'right' ? 1 : 0));
                    }
                }
                // Call cellResize board event.
                fireEvent(dragDrop.editMode.board, 'cellResize', { cell: draggedCell });
                fireEvent(draggedCell.row, 'cellChange', { cell: draggedCell, row: draggedCell.row });
                dragDrop.hideDropPointer();
                draggedCell.show();
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        DragDrop.defaultOptions = {
            enabled: true,
            rowDropOffset: 30,
            cellDropOffset: 30,
            dropPointerSize: 16
        };
        /* *
         *
         *  Default Export
         *
         * */

        return DragDrop;
    });
    _registerModule(_modules, 'Dashboards/Actions/Resizer.js', [_modules['Dashboards/EditMode/EditGlobals.js'], _modules['Dashboards/Layout/GUIElement.js'], _modules['Core/Utilities.js']], function (EditGlobals, GUIElement, U) {
        const { merge, addEvent, createElement, fireEvent, removeEvent, pick } = U;
        /**
         * Class providing a resizing functionality.
         */
        class Resizer {
            /* *
            *
            *  Static Properties
            *
            * */
            /**
             * Creates a new instance of the Resizer class based on JSON.
             * @internal
             */
            static fromJSON(editMode, json) {
                return new Resizer(editMode, json.options);
            }
            /* *
            *
            *  Constructors
            *
            * */
            /**
             * Constructor for the Resizer class.
             *
             * @param {EditMode} editMode
             * The parent editMode reference.
             *
             * @param {Resizer.Options} options
             * Options for the Resizer.
             */
            constructor(editMode, options) {
                this.editMode = editMode;
                this.options = merge({}, Resizer.defaultOptions, editMode.options.resize, options);
                this.currentCell = void 0;
                this.isX = this.options.type.indexOf('x') > -1;
                this.isY = this.options.type.indexOf('y') > -1;
                this.isActive = false;
                this.startX = 0;
                this.tempSiblingsWidth = [];
                this.addSnaps();
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Add Snap - create snaps and add events.
             *
             */
            addSnaps() {
                const iconsURLPrefix = this.editMode.iconsURLPrefix;
                const snapWidth = this.options.snap.width || 0;
                const snapHeight = this.options.snap.height || 0;
                const dashboardContainer = this.editMode.board.container;
                // Right snap
                this.snapRight = createElement('img', {
                    className: EditGlobals.classNames.resizeSnap + ' ' +
                        EditGlobals.classNames.resizeSnapX,
                    src: iconsURLPrefix + 'resize-handle.svg'
                }, {
                    width: snapWidth + 'px',
                    height: snapHeight + 'px',
                    left: -9999 + 'px'
                }, dashboardContainer);
                // Bottom snap
                this.snapBottom = createElement('img', {
                    className: EditGlobals.classNames.resizeSnap + ' ' +
                        EditGlobals.classNames.resizeSnapY,
                    src: iconsURLPrefix + 'resize-handle.svg'
                }, {
                    width: snapWidth + 'px',
                    height: snapHeight + 'px',
                    top: -9999 + 'px',
                    left: '0px'
                }, dashboardContainer);
                this.addResizeEvents();
            }
            /**
             * Hide snaps
             *
             */
            disableResizer() {
                this.isActive = false;
                this.currentDimension = void 0;
                this.currentCell = void 0;
                if (this.snapRight) {
                    this.snapRight.style.left = '-9999px';
                }
                if (this.snapBottom) {
                    this.snapBottom.style.left = '-9999px';
                }
            }
            /**
             * Update snap position.
             *
             * @param cell
             * Cell reference
             */
            setSnapPositions(cell) {
                // Set current cell
                this.currentCell = cell;
                // Set position of snaps
                const cellOffsets = GUIElement.getOffsets(cell, this.editMode.board.container);
                const left = cellOffsets.left || 0;
                const top = cellOffsets.top || 0;
                const { width, height } = GUIElement.getDimFromOffsets(cellOffsets);
                const snapWidth = (this.options.snap.width || 0);
                const snapHeight = (this.options.snap.height || 0);
                if (this.snapRight) {
                    this.snapRight.style.left = (left + width - snapWidth) + 'px';
                    this.snapRight.style.top = top + (height / 2) - (snapHeight / 2) + 'px';
                }
                if (this.snapBottom) {
                    this.snapBottom.style.top = (top + height - snapHeight) + 'px';
                    this.snapBottom.style.left = (left + (width / 2) - (snapWidth / 2)) + 'px';
                }
            }
            /**
             * Method detects siblings and auto-width applied by flex. The resizer
             * requires static widths for correct calculations, so we need to apply
             * temporary width on siblings.
             */
            setTempWidthSiblings() {
                const currentCell = this.currentCell;
                if (currentCell) {
                    const currentRwdMode = this.editMode.rwdMode, cellOffsets = GUIElement.getOffsets(currentCell), rowLevelInfo = currentCell.row.getRowLevelInfo(cellOffsets.top), rowLevelCells = (rowLevelInfo && rowLevelInfo.rowLevel.cells) || [];
                    let cellContainer, cell, optionsWidth;
                    for (let i = 0, iEnd = rowLevelCells.length; i < iEnd; ++i) {
                        cell = rowLevelCells[i];
                        cellContainer = cell.container;
                        optionsWidth = pick(((cell.options.responsive || {})[currentRwdMode] || {})
                            .width, cell.options.width);
                        // Do not convert width on the current cell and next siblings.
                        if (cell === currentCell) {
                            break;
                        }
                        if (cellContainer &&
                            (!optionsWidth || optionsWidth === 'auto')) {
                            cellContainer.style.flex =
                                '0 0 ' + cellContainer.offsetWidth + 'px';
                            this.tempSiblingsWidth.push(cell);
                        }
                    }
                }
            }
            /**
             * Revert widths to auto.
             */
            revertSiblingsAutoWidth() {
                const tempSiblingsWidth = this.tempSiblingsWidth;
                let cellContainer, cellResize;
                for (let i = 0, iEnd = tempSiblingsWidth.length; i < iEnd; ++i) {
                    cellContainer = tempSiblingsWidth[i].container;
                    if (cellContainer) {
                        cellContainer.style.flex = '1 1 0%';
                        cellResize = tempSiblingsWidth[i];
                    }
                }
                this.tempSiblingsWidth = [];
                // Call cellResize dashboard event.
                if (cellResize) {
                    fireEvent(this.editMode.board, 'cellResize', {
                        cell: cellResize
                    });
                    fireEvent(cellResize.row, 'cellChange', {
                        cell: cellResize,
                        row: cellResize.row
                    });
                }
            }
            /**
             * Add mouse events to snaps
             *
             */
            addResizeEvents() {
                const resizer = this;
                let mouseDownSnapX, mouseDownSnapY, mouseMoveSnap, mouseUpSnap;
                resizer.mouseDownSnapX = mouseDownSnapX = function (e) {
                    resizer.isActive = true;
                    resizer.currentDimension = 'x';
                    resizer.editMode.hideToolbars(['row', 'cell']);
                    resizer.setTempWidthSiblings();
                    resizer.startX = e.clientX;
                };
                resizer.mouseDownSnapY = mouseDownSnapY = function (e) {
                    resizer.isActive = true;
                    resizer.currentDimension = 'y';
                    resizer.editMode.hideToolbars(['row', 'cell']);
                };
                resizer.mouseMoveSnap = mouseMoveSnap = function (e) {
                    if (resizer.isActive) {
                        resizer.onMouseMove(e);
                    }
                };
                resizer.mouseUpSnap = mouseUpSnap = function (e) {
                    if (resizer.isActive) {
                        resizer.isActive = false;
                        resizer.currentDimension = void 0;
                        resizer.revertSiblingsAutoWidth();
                        resizer.editMode.showToolbars(['row', 'cell'], resizer.currentCell);
                        if (resizer.currentCell) {
                            resizer.setSnapPositions(resizer.currentCell);
                        }
                    }
                };
                // Add mouse events
                addEvent(this.snapRight, 'mousedown', mouseDownSnapX);
                addEvent(this.snapBottom, 'mousedown', mouseDownSnapY);
                addEvent(document, 'mousemove', mouseMoveSnap);
                addEvent(document, 'mouseup', mouseUpSnap);
                // Touch events
                // if (hasTouch) {
                //     addEvent(snapX, 'touchstart', mouseDownSnapX);
                //     addEvent(snapY, 'touchstart', mouseDownSnapY);
                //     if (!rowContainer.hcEvents.mousemove) {
                //         addEvent(rowContainer, 'touchmove', mouseMoveSnap);
                //         addEvent(rowContainer, 'touchend', mouseUpSnap);
                //     }
                // }
                const runReflow = () => {
                    if (resizer.currentCell) {
                        resizer.setSnapPositions(resizer.currentCell);
                    }
                };
                if (typeof ResizeObserver === 'function') {
                    this.resizeObserver = new ResizeObserver(runReflow);
                    this.resizeObserver.observe(resizer.editMode.board.container);
                }
                else {
                    const unbind = addEvent(window, 'resize', runReflow);
                    addEvent(this, 'destroy', unbind);
                }
            }
            /**
             * General method used on resizing.
             *
             * @param {global.Event} e
             * A mouse event.
             *
             */
            onMouseMove(e) {
                const currentCell = this.currentCell;
                const cellContainer = currentCell && currentCell.container;
                const currentDimension = this.currentDimension;
                const sidebar = this.editMode.sidebar;
                const currentRwdMode = sidebar && sidebar.editMode.rwdMode;
                if (currentCell &&
                    cellContainer &&
                    !((currentCell.row.layout.board.editMode || {}).dragDrop || {})
                        .isActive) {
                    const cellOffsets = GUIElement.getOffsets(currentCell);
                    const { width: parentRowWidth } = GUIElement.getDimFromOffsets(GUIElement.getOffsets(currentCell.row));
                    // Resize width
                    if (currentDimension === 'x') {
                        const newWidth = (Math.min(e.clientX - cellOffsets.left, parentRowWidth) /
                            parentRowWidth) *
                            100 +
                            '%';
                        currentCell.setSize(newWidth);
                        currentCell.updateSize(newWidth, currentRwdMode);
                        this.startX = e.clientX;
                    }
                    // Resize height
                    if (currentDimension === 'y') {
                        currentCell.setSize(void 0, e.clientY - cellOffsets.top);
                    }
                    // Call cellResize dashboard event.
                    fireEvent(this.editMode.board, 'cellResize', {
                        cell: currentCell
                    });
                    fireEvent(currentCell.row, 'cellChange', {
                        cell: currentCell,
                        row: currentCell.row
                    });
                    this.setSnapPositions(currentCell);
                }
            }
            /**
             * Destroy resizer
             */
            destroy() {
                const snaps = ['snapRight', 'snapBottom'];
                let snap;
                // Unbind events
                removeEvent(document, 'mousemove');
                removeEvent(document, 'mouseup');
                this.resizeObserver?.unobserve(this.editMode.board.container);
                for (let i = 0, iEnd = snaps.length; i < iEnd; ++i) {
                    snap = this[snaps[i]];
                    // Unbind event
                    removeEvent(snap, 'mousedown');
                    // Destroy snap
                    snap.remove();
                }
            }
            /**
             * Converts the class instance to a class JSON.
             * @internal
             *
             * @return {Resizer.JSON}
             * Class JSON of this Resizer instance.
             */
            toJSON() {
                const options = this.options;
                return {
                    $class: 'Dashboards.Action.Resizer',
                    options: {
                        enabled: options.enabled,
                        styles: {
                            minWidth: options.styles.minWidth,
                            minHeight: options.styles.minHeight
                        },
                        type: options.type,
                        snap: {
                            width: options.snap.width,
                            height: options.snap.height
                        }
                    }
                };
            }
        }
        Resizer.defaultOptions = {
            enabled: true,
            styles: {
                minWidth: 20,
                minHeight: 50
            },
            type: 'xy',
            snap: {
                width: 9,
                height: 17
            }
        };

        return Resizer;
    });
    _registerModule(_modules, 'Dashboards/EditMode/ConfirmationPopup.js', [_modules['Core/Utilities.js'], _modules['Shared/BaseForm.js'], _modules['Dashboards/EditMode/EditGlobals.js'], _modules['Dashboards/EditMode/EditRenderer.js']], function (U, BaseForm, EditGlobals, EditRenderer) {
        /* *
         *
         *  (c) 2009 - 2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sebastian Bochan
         *  - Wojciech Chmiel
         *  - Gøran Slettemark
         *  - Sophie Bremer
         *
         * */
        const { createElement } = U;
        /**
         * Class to create confirmation popup.
         */
        class ConfirmationPopup extends BaseForm {
            /* *
            *
            *  Static Properties
            *
            * */
            /* *
            *
            *  Constructor
            *
            * */
            /**
             * Constructs an instance of the ConfirmationPopup.
             *
             * @param parentDiv
             * Parent div where the popup will be added.
             *
             * @param iconsURL
             * URL to the icons.
             *
             * @param editMode
             * The EditMode instance.
             *
             * @param options
             * Options for confirmation popup.
             */
            constructor(parentDiv, iconsURL, editMode, options) {
                iconsURL =
                    options && options.close && options.close.icon ?
                        options.close.icon :
                        iconsURL;
                super(parentDiv, iconsURL);
                this.editMode = editMode;
                this.options = options;
            }
            /* *
            *
            *  Functions
            *
            * */
            /**
             * Returns popup container.
             *
             * @param parentDiv
             * Parent div where the popup will be added.
             *
             * @param className
             * Class name added to the popup container.
             */
            createPopupContainer(parentDiv, className = EditGlobals.classNames.confirmationPopup) {
                return super.createPopupContainer(parentDiv, className);
            }
            /**
             * Adds close button to the popup.
             *
             * @param className
             * Class name added to the close button.
             */
            addCloseButton(className = EditGlobals.classNames.popupCloseButton) {
                return super.addCloseButton(className);
            }
            /**
             * Adds content inside the popup.
             *
             * @param options
             * Options for confirmation popup.
             */
            renderContent(options) {
                // Render content wrapper
                this.contentContainer = createElement('div', {
                    className: EditGlobals.classNames.popupContentContainer
                }, {}, this.container);
                const popupContainer = this.contentContainer.parentNode;
                popupContainer.style.marginTop = '0px';
                const offsetTop = popupContainer.getBoundingClientRect().top;
                popupContainer.style.marginTop = (offsetTop < 0 ? Math.abs(offsetTop - 200) : 200) + 'px';
                // Render text
                EditRenderer.renderText(this.contentContainer, {
                    title: options.text || ''
                });
                // Render button wrapper
                this.buttonContainer = createElement('div', {
                    className: EditGlobals.classNames.popupButtonContainer
                }, {}, this.container);
                // Render cancel buttons
                EditRenderer.renderButton(this.buttonContainer, {
                    text: options.cancelButton.value,
                    className: EditGlobals.classNames.popupCancelBtn,
                    callback: options.cancelButton.callback
                });
                // Confirm
                EditRenderer.renderButton(this.buttonContainer, {
                    text: options.confirmButton.value,
                    className: EditGlobals.classNames.popupConfirmBtn,
                    callback: () => {
                        // Run callback
                        // confirmCallback.call(context);
                        options.confirmButton.callback.call(options.confirmButton.context);
                        // Hide popup
                        this.closePopup();
                    }
                });
            }
            /**
             * Shows confirmation popup.
             *
             * @param options
             * Options for confirmation popup.
             */
            show(options) {
                this.showPopup();
                this.renderContent(options);
                this.editMode.setEditOverlay();
            }
            /**
             * Hides confirmation popup.
             */
            closePopup() {
                super.closePopup();
                this.editMode.setEditOverlay(true);
            }
        }

        return ConfirmationPopup;
    });
    _registerModule(_modules, 'Dashboards/EditMode/EditMode.js', [_modules['Core/Utilities.js'], _modules['Dashboards/EditMode/EditGlobals.js'], _modules['Dashboards/EditMode/EditRenderer.js'], _modules['Dashboards/EditMode/Toolbar/CellEditToolbar.js'], _modules['Dashboards/EditMode/Toolbar/RowEditToolbar.js'], _modules['Dashboards/EditMode/SidebarPopup.js'], _modules['Dashboards/EditMode/EditContextMenu.js'], _modules['Dashboards/Actions/DragDrop.js'], _modules['Dashboards/Actions/Resizer.js'], _modules['Dashboards/EditMode/ConfirmationPopup.js'], _modules['Dashboards/Actions/ContextDetection.js'], _modules['Dashboards/Layout/GUIElement.js']], function (U, EditGlobals, EditRenderer, CellEditToolbar, RowEditToolbar, SidebarPopup, EditContextMenu, DragDrop, Resizer, ConfirmationPopup, ContextDetection, GUIElement) {
        /* *
         *
         *  (c) 2009 - 2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sebastian Bochan
         *  - Wojciech Chmiel
         *  - Gøran Slettemark
         *  - Sophie Bremer
         *
         * */
        const { addEvent, createElement, css, merge } = U;
        /* *
         *
         *  Class
         *
         * */
        class EditMode {
            /* *
            *
            *  Constructor
            *
            * */
            /**
             * Edit mode constructor.
             * @internal
              *
             * @param board
             * Board instance
             *
             * @param options
             * Edit mode options
             */
            constructor(board, options) {
                /* *
                *
                *  Properties
                *
                * */
                /**
                 * @internal
                 */
                this.active = false;
                /**
                 * URL from which the icons will be fetched.
                 */
                this.iconsURLPrefix = '/code/dashboards/gfx/dashboards-icons/';
                this.iconsURLPrefix =
                    (options && options.iconsURLPrefix) || this.iconsURLPrefix;
                this.options = merge(
                // Default options.
                {
                    dragDrop: {
                        enabled: true
                    },
                    resize: {
                        enabled: true
                    },
                    settings: {
                        enabled: true
                    },
                    enabled: true,
                    contextMenu: {
                        icon: this.iconsURLPrefix + 'menu.svg'
                    },
                    tools: {
                        addComponentBtn: {
                            enabled: true,
                            icon: this.iconsURLPrefix + 'add.svg'
                        },
                        rwdButtons: {
                            enabled: true,
                            icons: {
                                small: this.iconsURLPrefix + 'smartphone.svg',
                                medium: this.iconsURLPrefix + 'tablet.svg',
                                large: this.iconsURLPrefix + 'computer.svg'
                            }
                        }
                    },
                    confirmationPopup: {
                        close: {
                            icon: this.iconsURLPrefix + 'close.svg'
                        }
                    },
                    toolbars: {
                        cell: {
                            enabled: true
                        },
                        row: {
                            enabled: true
                        }
                    }
                }, options || {});
                this.board = board;
                this.lang = merge({}, EditGlobals.lang, this.options.lang);
                this.contextPointer = {
                    isVisible: false,
                    element: createElement('div', { className: EditGlobals.classNames.contextDetectionPointer }, {}, this.board.container)
                };
                this.isInitialized = false;
                this.isContextDetectionActive = false;
                this.tools = {};
                this.rwdMenu = [];
                this.rwdMode = this.board.getLayoutContainerSize();
                this.createTools();
                this.confirmationPopup = new ConfirmationPopup(board.container, this.iconsURLPrefix, this, this.options.confirmationPopup);
                // Create edit overlay.
                this.editOverlay = createElement('div', {
                    className: EditGlobals.classNames.editOverlay
                }, {}, board.container);
                this.isEditOverlayActive = false;
            }
            /* *
            *
            *  Functions
            *
            * */
            /**
             * Event to fire on click of the context button.
             * @internal
             */
            onContextBtnClick() {
                const editMode = this;
                // Init contextMenu if doesn't exist.
                if (!editMode.tools.contextMenu) {
                    editMode.tools.contextMenu = new EditContextMenu(editMode.board.container, editMode.options.contextMenu || {}, editMode);
                }
                // Show context menu.
                if (editMode.tools.contextMenu) {
                    if (!editMode.tools.contextMenu.isVisible) {
                        editMode.tools.contextMenu
                            .updatePosition(editMode.tools.contextButtonElement);
                    }
                    editMode.tools.contextMenu.setVisible(!editMode.tools.contextMenu.isVisible);
                }
            }
            /**
             * Activate or deactivate edit mode.
             */
            onEditModeToggle() {
                const editMode = this;
                if (editMode.active) {
                    editMode.deactivate();
                }
                else {
                    editMode.activate();
                }
            }
            /**
             * Init the instance of edit mode.
             * @internal
             */
            init() {
                const editMode = this;
                if (this.options.resize?.enabled) {
                    editMode.resizer = new Resizer(editMode, editMode.options.resize);
                }
                editMode.dragDrop = new DragDrop(editMode, editMode.options.dragDrop);
                // Init rowToolbar.
                if (editMode.options.toolbars?.row?.enabled && !editMode.rowToolbar) {
                    editMode.rowToolbar = new RowEditToolbar(editMode);
                }
                // Init cellToolbar.
                if (editMode.options.toolbars?.cell?.enabled && !editMode.cellToolbar) {
                    editMode.cellToolbar = new CellEditToolbar(editMode);
                }
                // Init Sidebar.
                if (!editMode.sidebar) {
                    editMode.sidebar = new SidebarPopup(this.board.container, this.iconsURLPrefix, editMode);
                }
                editMode.isInitialized = true;
            }
            /**
             * Init events for edit mode.
             * @internal
             */
            initEvents() {
                const editMode = this, board = editMode.board;
                for (let i = 0, iEnd = board.layouts.length; i < iEnd; ++i) {
                    editMode.setLayoutEvents(board.layouts[i]);
                }
                if (editMode.cellToolbar) {
                    // Stop context detection when mouse on cell toolbar.
                    addEvent(editMode.cellToolbar.container, 'mouseenter', function () {
                        editMode.stopContextDetection();
                    });
                    addEvent(editMode.cellToolbar.container, 'mouseleave', function () {
                        editMode.isContextDetectionActive = true;
                    });
                }
                if (editMode.rowToolbar) {
                    // Stop context detection when mouse on row toolbar.
                    addEvent(editMode.rowToolbar.container, 'mouseenter', function () {
                        editMode.stopContextDetection();
                    });
                    addEvent(editMode.rowToolbar.container, 'mouseleave', function () {
                        editMode.isContextDetectionActive = true;
                    });
                }
                addEvent(board.layoutsWrapper, 'mousemove', editMode.onDetectContext.bind(editMode));
                addEvent(board.layoutsWrapper, 'click', editMode.onContextConfirm.bind(editMode));
                addEvent(board.layoutsWrapper, 'mouseleave', () => {
                    editMode.hideContextPointer();
                });
            }
            /**
             * Set events for the layout.
             * @internal
             */
            setLayoutEvents(layout) {
                const editMode = this;
                for (let j = 0, jEnd = layout.rows.length; j < jEnd; ++j) {
                    const row = layout.rows[j];
                    editMode.setRowEvents(row);
                    for (let k = 0, kEnd = row.cells.length; k < kEnd; ++k) {
                        editMode.setCellEvents(row.cells[k]);
                    }
                }
            }
            /**
             * Set events for the row.
             * @internal
             */
            setRowEvents(row) {
                const editMode = this;
                // Init dragDrop row events.
                if (editMode.dragDrop) {
                    const dragDrop = editMode.dragDrop;
                    addEvent(row.container, 'mouseenter', function () {
                        if (editMode.isContextDetectionActive) {
                            editMode.mouseRowContext = row;
                        }
                    });
                    addEvent(row.container, 'mousemove', function (e) {
                        if (dragDrop.isActive && e.target === row.container) {
                            dragDrop.mouseRowContext = row;
                        }
                    });
                    addEvent(row.container, 'mouseleave', function (e) {
                        if (dragDrop.isActive && dragDrop.mouseRowContext === row) {
                            dragDrop.mouseRowContext = void 0;
                        }
                        if (editMode.isContextDetectionActive) {
                            editMode.mouseRowContext = void 0;
                        }
                    });
                }
            }
            /**
             * Set events for the cell.
             * @internal
             */
            setCellEvents(cell) {
                const editMode = this;
                if (cell.nestedLayout) {
                    editMode.setLayoutEvents(cell.nestedLayout);
                }
                else if (editMode.cellToolbar && cell.container) {
                    // Init dragDrop cell events.
                    if (editMode.dragDrop || editMode.resizer) {
                        const dragDrop = editMode.dragDrop;
                        addEvent(cell.container, 'mouseenter', function (e) {
                            if (editMode.isContextDetectionActive) {
                                editMode.mouseCellContext = cell;
                            }
                        });
                        addEvent(cell.container, 'mousemove', function (e) {
                            if (dragDrop &&
                                dragDrop.isActive &&
                                e.target === cell.container) {
                                dragDrop.mouseCellContext = cell;
                                dragDrop.mouseRowContext = void 0;
                            }
                        });
                        addEvent(cell.container, 'mouseleave', function () {
                            if (dragDrop &&
                                dragDrop.isActive &&
                                dragDrop.mouseCellContext === cell) {
                                dragDrop.mouseCellContext = void 0;
                            }
                            if (editMode.isContextDetectionActive) {
                                editMode.mouseCellContext = void 0;
                            }
                        });
                    }
                }
            }
            /**
             * Activate the edit mode.
             * @internal
             */
            activate() {
                const editMode = this;
                // Init edit mode.
                if (!editMode.isInitialized) {
                    editMode.init();
                    editMode.initEvents();
                }
                // Set edit mode active class to dashboard.
                editMode.board.container.classList.add(EditGlobals.classNames.editModeEnabled);
                // TODO all buttons should be activated, add some wrapper?
                if (this.addComponentBtn) {
                    this.addComponentBtn.style.display = 'block';
                }
                // Sets proper rwd mode.
                editMode.rwdMode = editMode.board.getLayoutContainerSize();
                // Show responsive buttons.
                this.showRwdButtons();
                editMode.active = true;
                editMode.isContextDetectionActive = true;
            }
            /**
             * Deactivate the edit mode.
             * @internal
             */
            deactivate() {
                const editMode = this, dashboardCnt = editMode.board.container;
                dashboardCnt.classList.remove(EditGlobals.classNames.editModeEnabled);
                // Hide toolbars.
                editMode.hideToolbars();
                // Remove highlight from the context row if exists.
                if (this.editCellContext) {
                    this.editCellContext.row.setHighlight(true);
                }
                // TODO all buttons should be deactivated.
                if (this.addComponentBtn) {
                    this.addComponentBtn.style.display = 'none';
                }
                if (editMode.resizer) {
                    editMode.resizer.disableResizer();
                }
                // Hide responsive buttons.
                this.hideRwdButtons();
                // Disable responsive width and restore elements to their original
                // positions and sizes.
                this.board.layoutsWrapper.style.width = '100%';
                this.board.reflow();
                editMode.active = false;
                editMode.stopContextDetection();
                this.editCellContext = void 0;
                this.potentialCellContext = void 0;
            }
            /**
             * Function to check whether the edit mode is activated.
             * @internal
             *
             * @returns
             * Whether the edit mode is activated.
             */
            isActive() {
                return this.active;
            }
            /**
             * Method for hiding edit toolbars.
             * @internal
             *
             * @param toolbarTypes
             * The array of toolbar names to hide ('cell', 'row', 'sidebar').
             */
            hideToolbars(toolbarTypes) {
                const editMode = this, toolbarsToHide = toolbarTypes || ['cell', 'row', 'sidebar'];
                for (let i = 0, iEnd = toolbarsToHide.length; i < iEnd; ++i) {
                    switch (toolbarsToHide[i]) {
                        case 'cell': {
                            if (editMode.cellToolbar &&
                                editMode.cellToolbar.isVisible) {
                                editMode.cellToolbar.hide();
                            }
                            break;
                        }
                        case 'row': {
                            if (editMode.rowToolbar && editMode.rowToolbar.isVisible) {
                                editMode.rowToolbar.hide();
                            }
                            break;
                        }
                        case 'sidebar': {
                            if (editMode.sidebar && editMode.sidebar.isVisible) {
                                editMode.sidebar.hide();
                            }
                            break;
                        }
                        default: {
                            break;
                        }
                    }
                }
            }
            /**
             * Method for hiding edit toolbars.
             * @internal
             *
             * @param toolbarTypes
             * The array of toolbar names to hide ('cell', 'row', 'sidebar').
             *
             * @param currentCell
             * The cell reference for toolbar.
             *
             */
            showToolbars(toolbarTypes, currentCell) {
                const editMode = this, toolbarsToShow = toolbarTypes || ['cell', 'row', 'sidebar'];
                for (let i = 0, iEnd = toolbarsToShow.length; i < iEnd; ++i) {
                    switch (toolbarsToShow[i]) {
                        case 'cell': {
                            if (currentCell && editMode.cellToolbar) {
                                editMode.cellToolbar.isVisible = true;
                                editMode.cellToolbar.showToolbar(currentCell);
                            }
                            break;
                        }
                        case 'row': {
                            if (currentCell && currentCell.row && editMode.rowToolbar) {
                                editMode.rowToolbar.isVisible = true;
                                editMode.rowToolbar.showToolbar(currentCell.row);
                            }
                            break;
                        }
                        case 'sidebar': {
                            if (editMode.sidebar && !editMode.sidebar.isVisible) {
                                editMode.sidebar.show();
                            }
                            break;
                        }
                        default: {
                            break;
                        }
                    }
                }
            }
            /**
             * Creates the buttons such as `addComponent` button, rwd buttons and
             * context menu button.
             * @internal
             */
            createTools() {
                const editMode = this;
                const options = this.options;
                // Create tools container
                this.tools.container = document.createElement('div');
                this.tools.container.classList.add(EditGlobals.classNames.editTools);
                this.board.layoutsWrapper.parentNode.insertBefore(this.tools.container, this.board.layoutsWrapper);
                // Create context menu button
                if (options.contextMenu?.enabled) {
                    this.tools.contextButtonElement = EditRenderer.renderContextButton(this.tools.container, editMode);
                }
                // Create rwd menu
                if (options.tools?.rwdButtons?.enabled) {
                    this.createRwdMenu();
                }
                // Create add component button
                if (options.tools?.addComponentBtn?.enabled &&
                    options.toolbars?.cell?.enabled) {
                    const addIconURL = options.tools.addComponentBtn.icon;
                    this.addComponentBtn = EditRenderer.renderButton(this.tools.container, {
                        className: EditGlobals.classNames.editToolsBtn,
                        icon: addIconURL,
                        text: this.lang.addComponent,
                        callback: () => {
                            // Sidebar trigger
                            if (editMode.sidebar) {
                                editMode.sidebar.show();
                                editMode.setEditOverlay();
                            }
                        },
                        style: {
                            display: 'none'
                        }
                    });
                }
            }
            /**
             * Creates the responsive width buttons.
             * @internal
             */
            createRwdMenu() {
                const rwdBreakingPoints = this.board.options.responsiveBreakpoints;
                const toolsContainer = this.tools.container;
                const options = this.options;
                const rwdIcons = options?.tools?.rwdButtons?.icons || {};
                for (const key in rwdBreakingPoints) {
                    if (toolsContainer) {
                        const btn = EditRenderer.renderButton(toolsContainer, {
                            className: EditGlobals.classNames.editToolsBtn,
                            icon: rwdIcons[key] || '',
                            text: this.lang[key],
                            callback: (e) => {
                                const button = e.target, isSelected = button.classList.contains('selected');
                                // Deselect given button and reset board width.
                                if (isSelected) {
                                    button.classList.remove('selected');
                                    this.board.layoutsWrapper.style.width = '';
                                    this.rwdMode = '';
                                }
                                else {
                                    // Deselect all buttons.
                                    this.rwdMenu.forEach((btn) => {
                                        btn.classList.remove('selected');
                                    });
                                    // Select given button and change board width.
                                    button.classList.add('selected');
                                    this.board.layoutsWrapper.style.width =
                                        rwdBreakingPoints[key] + 'px';
                                    this.rwdMode = key;
                                }
                                // Reflow elements.
                                this.board.reflow();
                            },
                            style: {
                                display: 'none'
                            }
                        });
                        if (btn) {
                            this.rwdMenu.push(btn);
                        }
                    }
                }
            }
            /**
             * Shows responsive buttons.
             * @internal
             */
            showRwdButtons() {
                for (let i = 0, iEnd = this.rwdMenu.length; i < iEnd; ++i) {
                    this.rwdMenu[i].style.display = 'block';
                }
            }
            /**
             * Hides responsive buttons.
             * @internal
             */
            hideRwdButtons() {
                for (let i = 0, iEnd = this.rwdMenu.length; i < iEnd; ++i) {
                    this.rwdMenu[i].style.display = 'none';
                }
            }
            /**
             * Event fired when detecting context on drag&drop.
             *
             * @param e
             * Mouse pointer event.
             */
            onDetectContext(e) {
                const editMode = this, offset = 50; // TODO - add it from options.
                if (editMode.isActive() &&
                    editMode.isContextDetectionActive &&
                    (editMode.mouseCellContext || editMode.mouseRowContext) &&
                    !(editMode.dragDrop || {}).isActive) {
                    let cellContext, rowContext;
                    if (editMode.mouseCellContext) {
                        cellContext = ContextDetection
                            .getContext(editMode.mouseCellContext, e, offset).cell;
                    }
                    else if (editMode.mouseRowContext) {
                        rowContext = editMode.mouseRowContext;
                        cellContext = rowContext.layout.parentCell;
                    }
                    this.potentialCellContext = cellContext;
                    if (cellContext) {
                        const cellContextOffsets = GUIElement
                            .getOffsets(cellContext, editMode.board.container);
                        const { width, height } = GUIElement
                            .getDimFromOffsets(cellContextOffsets);
                        editMode.showContextPointer(cellContextOffsets.left, cellContextOffsets.top, width, height);
                    }
                }
            }
            /**
             * Stops the context detection.
             */
            stopContextDetection() {
                this.isContextDetectionActive = false;
                if (this.dragDrop) {
                    this.dragDrop.mouseCellContext = void 0;
                }
                this.mouseCellContext = void 0;
                this.hideContextPointer();
            }
            /**
             * Confirms the selected context.
             */
            onContextConfirm() {
                if (this.isContextDetectionActive &&
                    this.potentialCellContext &&
                    this.editCellContext !== this.potentialCellContext) {
                    this.setEditCellContext(this.potentialCellContext, this.editCellContext);
                }
            }
            /**
             * Sets the edit cell context.
             * @internal
             */
            setEditCellContext(editCellContext, oldEditCellContext) {
                const editMode = this, oldContextRow = oldEditCellContext && oldEditCellContext.row;
                editMode.editCellContext = editCellContext;
                editMode.showToolbars(['row', 'cell'], editCellContext);
                if (!oldContextRow || oldContextRow !== editCellContext.row) {
                    if (oldContextRow) {
                        // Remove highlight from the previous row.
                        oldContextRow.setHighlight(true);
                    }
                    // Add highlight to the context row.
                    editCellContext.row.setHighlight();
                }
                if (editMode.resizer) {
                    editMode.resizer.setSnapPositions(editCellContext);
                }
            }
            /**
             * Method for showing and positioning context pointer.
             * @internal
             */
            showContextPointer(left, top, width, height) {
                this.contextPointer.isVisible = true;
                css(this.contextPointer.element, {
                    display: 'block',
                    left: left + 'px',
                    top: top + 'px',
                    height: height + 'px',
                    width: width + 'px'
                });
            }
            /**
             * Method for hiding context pointer.
             * @internal
             */
            hideContextPointer() {
                if (this.contextPointer.isVisible) {
                    this.contextPointer.isVisible = false;
                    this.contextPointer.element.style.display = 'none';
                }
            }
            /**
             * Adds/Removes the edit mode overlay.
             * @internal
             *
             * @param remove
             * Whether the edit overlay should be removed.
             */
            setEditOverlay(remove) {
                const editMode = this, cnt = editMode.editOverlay, isSet = cnt.classList.contains(EditGlobals.classNames.editOverlayActive);
                if (!remove && !isSet) {
                    cnt.classList.add(EditGlobals.classNames.editOverlayActive);
                    editMode.isEditOverlayActive = true;
                }
                else if (remove && isSet) {
                    cnt.classList.remove(EditGlobals.classNames.editOverlayActive);
                    editMode.isEditOverlayActive = false;
                }
            }
        }
        /* *
         *
         *  Default Export
         *
         * */

        return EditMode;
    });
    _registerModule(_modules, 'Dashboards/EditMode/Fullscreen.js', [_modules['Core/Utilities.js'], _modules['Dashboards/Globals.js']], function (U, Globals) {
        /* *
         *
         *  (c) 2009 - 2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sebastian Bochan
         *  - Wojciech Chmiel
         *  - Gøran Slettemark
         *  - Sophie Bremer
         *
         * */
        const { addEvent } = U;
        class Fullscreen {
            /* *
            *
            *  Constructor
            *
            * */
            constructor(DashboardClass) {
                this.isOpen = false;
                this.board = DashboardClass;
                // add class to allow scroll element
                this.board.boardWrapper.classList.add(Globals.classNamePrefix + '-fullscreen');
            }
            /* *
            *
            *  Functions
            *
            * */
            /**
             * Toggles displaying the board in fullscreen mode.
             */
            toggle() {
                const fullscreen = this, isOpen = this.isOpen;
                fullscreen[isOpen ? 'close' : 'open']();
            }
            /**
             * Display board in fullscreen.
             */
            open() {
                if (this.isOpen) {
                    return;
                }
                const fullscreen = this, board = fullscreen.board;
                // Handle exitFullscreen() method when user clicks 'Escape' button.
                const unbindChange = addEvent(board.boardWrapper.ownerDocument, // dashboard's document
                'fullscreenchange', function () {
                    if (fullscreen.isOpen) {
                        fullscreen.isOpen = false;
                        fullscreen.close();
                    }
                    else {
                        fullscreen.isOpen = true;
                        fullscreen.setButtonText();
                    }
                });
                fullscreen.unbindFullscreenEvent = () => {
                    unbindChange();
                };
                const promise = board.boardWrapper.requestFullscreen();
                // eslint-disable-next-line highcharts/quote-members
                promise.catch(() => {
                    throw new Error('Full screen is not supported.');
                });
            }
            /**
             * Stops displaying the dashboard in fullscreen mode.
             */
            close() {
                const fullscreen = this, board = fullscreen.board;
                // Don't fire exitFullscreen() when user exited using 'Escape' button.
                if (fullscreen.isOpen &&
                    board.boardWrapper.ownerDocument instanceof Document) {
                    void board.boardWrapper.ownerDocument.exitFullscreen();
                }
                // Unbind event as it's necessary only before exiting from fullscreen.
                if (fullscreen.unbindFullscreenEvent) {
                    fullscreen.unbindFullscreenEvent =
                        fullscreen.unbindFullscreenEvent();
                }
                fullscreen.isOpen = false;
                this.setButtonText();
            }
            /**
             * Set the correct text depending of the fullscreen is on or of.
             */
            setButtonText() {
                const editMode = this.board.editMode, contextMenu = editMode && editMode.tools.contextMenu, button = contextMenu && contextMenu.items.viewFullscreen;
                if (button && button.innerElement) {
                    const lang = editMode.lang;
                    button.innerElement.innerHTML =
                        (this.isOpen ? lang.exitFullscreen : lang.viewFullscreen) || '';
                }
            }
        }

        return Fullscreen;
    });
    _registerModule(_modules, 'Dashboards/CallbackRegistry.js', [], function () {
        class CallbackRegistry {
            constructor() {
                this.registry = {};
            }
            addCallback(id, callback) {
                this.registry[id] = callback;
            }
            getCallback(id) {
                return this.registry[id];
            }
            /** @internal */
            toJSON() {
                const json = {};
                Object.keys(this.registry).forEach((key) => {
                    const entry = this.getCallback(key);
                    const { func, type } = entry;
                    json[key] = {
                        func: func.toString(),
                        type
                    };
                });
                return json;
            }
        }

        return CallbackRegistry;
    });
    _registerModule(_modules, 'Dashboards/Components/EditableOptions.js', [], function () {
        /* *
         *
         *  (c) 2009 - 2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sebastian Bochan
         *  - Wojciech Chmiel
         *  - Gøran Slettemark
         *  - Sophie Bremer
         *
         * */
        class EditableOptions {
            constructor(component, bindings = EditableOptions.defaultBindings) {
                this.component = component;
                this.bindings = bindings;
            }
            getOptions() {
                const options = this.component.options.editableOptions;
                for (let i = 0, iEnd = options.length; i < iEnd; i++) {
                    const option = options[i];
                    if (option.name === 'connectorName') {
                        const board = this.component.board;
                        const selectOptions = !board ?
                            [] :
                            board.dataPool
                                .getConnectorIds()
                                .map((name) => ({ name }));
                        option.selectOptions = selectOptions;
                    }
                }
                return options;
            }
        }
        EditableOptions.defaultBindings = {
            keyMap: {
                color: 'colorPicker',
                title: 'text',
                caption: 'text',
                style: 'textarea'
            },
            typeMap: {
                'string': 'text',
                'number': 'input',
                'boolean': 'toggle'
            },
            skipRedraw: []
        };
        // Bindings of basic types to "editor components"
        EditableOptions.defaultTypeMap = {
            'string': 'text',
            'number': 'input',
            'boolean': 'toggle'
        };

        return EditableOptions;
    });
    _registerModule(_modules, 'Dashboards/Components/ComponentUtilities.js', [], function () {
        /* *
         *
         *  (c) 2009 - 2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sebastian Bochan
         *  - Wojciech Chmiel
         *  - Gøran Slettemark
         *  - Sophie Bremer
         *
         * */
        /* *
         *
         *  Namespace
         *
         * */
        var ComponentUtilities;
        (function (ComponentUtilities) {
            /* *
             *
             *  Functions
             *
             * */
            function getMargins(element, includeBorders = true) {
                const borders = {
                    x: ['borderLeft', 'borderRight'],
                    y: ['borderTop', 'borderBottom']
                };
                return {
                    y: getStyles(element, [
                        'marginTop',
                        'marginBottom',
                        ...(includeBorders ? borders.y : [])
                    ]).reduce(sumPixels, 0),
                    x: getStyles(element, [
                        'marginLeft',
                        'marginTop',
                        ...(includeBorders ? borders.x : [])
                    ]).reduce(sumPixels, 0)
                };
            }
            ComponentUtilities.getMargins = getMargins;
            function getPaddings(element) {
                return {
                    x: getStyles(element, ['paddingLeft', 'paddingRight']).reduce(sumPixels, 0),
                    y: getStyles(element, ['paddingTop', 'paddingBottom']).reduce(sumPixels, 0)
                };
            }
            ComponentUtilities.getPaddings = getPaddings;
            function getStyles(element, styles) {
                const elementStyles = window.getComputedStyle(element);
                return styles.map((style) => elementStyles[style]); // Cannot use getPropertyValue?
            }
            ComponentUtilities.getStyles = getStyles;
            function sumPixels(accumulator, value) {
                if (value) {
                    accumulator += (typeof value === 'number' ? value : parseFloat(value));
                }
                return accumulator;
            }
            ComponentUtilities.sumPixels = sumPixels;
        })(ComponentUtilities || (ComponentUtilities = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return ComponentUtilities;
    });
    _registerModule(_modules, 'Dashboards/Components/SharedComponentState.js', [_modules['Dashboards/Serializable.js'], _modules['Core/Utilities.js']], function (Serializable, U) {
        /* *
         *
         *  (c) 2009 - 2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Gøran Slettemark
         *  - Sophie Bremer
         *
         * */
        const { addEvent, fireEvent, merge } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Contains presentation information like column order, usually in relation to a
         * table instance.
         */
        class SharedComponentState {
            constructor() {
                /* *
                 *
                 *  Properties
                 *
                 * */
                this.columnVisibilityMap = {};
                this.hiddenRowIndexes = [];
                this.selection = {};
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Emits an event on this table to all registered callbacks of the given
             * event.
             *
             * @param {DataPresentationState.Event} e
             * Event object with event information.
             */
            emit(e) {
                fireEvent(this, e.type, e);
            }
            /**
             * Returns an ordered array of column names.
             *
             * @return {Array<string>}
             * Array of column names in order.
             */
            getColumnOrder() {
                return (this.columnOrder || []).slice();
            }
            getColumnVisibility(columnName) {
                return this.columnVisibilityMap[columnName];
            }
            /**
             * Returns a function for `Array.sort` to change the order of an array of
             * column names. Unknown column names come last.
             *
             * @return {DataPresentationState.ColumnOrderCallback}
             * Sort function to change the order.
             */
            getColumnSorter() {
                const columnOrder = (this.columnOrder || []).slice();
                if (!columnOrder.length) {
                    return () => 0;
                }
                return (a, b) => {
                    const aIndex = columnOrder.indexOf(a), bIndex = columnOrder.indexOf(b);
                    if (aIndex > -1 && bIndex > -1) {
                        return aIndex - bIndex;
                    }
                    if (bIndex > -1) {
                        return 1;
                    }
                    if (aIndex > -1) {
                        return -1;
                    }
                    return 0;
                };
            }
            /**
             * @return {boolean}
             * Returns true, if the state was changed since initialization.
             */
            isSet() {
                return this.isModified === true;
            }
            /**
             * Registers a callback for a specific event.
             *
             * @param {string} type
             * Event type as a string.
             *
             * @param {DataEventEmitter.Callback} callback
             * Function to register for an event callback.
             *
             * @return {Function}
             * Function to unregister callback from the event.
             */
            on(type, callback) {
                return addEvent(this, type, callback);
            }
            /**
             * Sets the order of the columns in place.
             *
             * @param {Array<string>} columnOrder
             * Array of column names in order.
             *
             * @param {DataEventEmitter.Detail} [eventDetail]
             * Custom information for pending events.
             */
            setColumnOrder(columnOrder, eventDetail) {
                const presentationState = this, oldColumnOrder = (presentationState.columnOrder || []).slice(), newColumnOrder = columnOrder.slice();
                presentationState.emit({
                    type: 'columnOrderChange',
                    detail: eventDetail,
                    newColumnOrder,
                    oldColumnOrder
                });
                presentationState.columnOrder = newColumnOrder;
                presentationState.isModified = true;
                presentationState.emit({
                    type: 'afterColumnOrderChange',
                    detail: eventDetail,
                    newColumnOrder,
                    oldColumnOrder
                });
            }
            setColumnVisibility(columnVisibility, eventDetail) {
                this.columnVisibilityMap = merge(this.columnVisibilityMap, columnVisibility);
                this.emit({
                    type: 'afterColumnVisibilityChange',
                    visibilityMap: this.columnVisibilityMap,
                    detail: eventDetail
                });
            }
            setHiddenRows(rowIndexes, hidden = true) {
                rowIndexes.forEach((rowIndex) => {
                    if (this.hiddenRowIndexes.indexOf(rowIndex) === -1 && hidden) {
                        this.hiddenRowIndexes.push(rowIndex);
                    }
                    if (this.hiddenRowIndexes.indexOf(rowIndex) > -1 && !hidden) {
                        this.hiddenRowIndexes
                            .splice(this.hiddenRowIndexes.indexOf(rowIndex), 1);
                    }
                });
                this.emit({
                    type: 'afterSetHiddenRows',
                    hiddenRows: this.hiddenRowIndexes
                });
            }
            getHiddenRows() {
                return this.hiddenRowIndexes;
            }
            setHoverPoint(point, eventDetail) {
                const isDataGrid = eventDetail && eventDetail.isDataGrid;
                this.hoverPoint = isDataGrid ? void 0 : point;
                if (point instanceof HTMLElement) {
                    this.hoverRow = isDataGrid ? point : void 0;
                }
                this.emit({
                    type: 'afterHoverPointChange',
                    hoverPoint: isDataGrid ? void 0 : this.hoverPoint,
                    hoverRow: isDataGrid ? this.hoverRow : void 0,
                    detail: eventDetail
                });
            }
            getHoverPoint() {
                return this.hoverPoint;
            }
            getSelection() {
                return this.selection;
            }
            setSelection(selection, reset = false, eventDetail) {
                const axes = Object.keys(selection);
                axes.forEach((axisID) => {
                    this.selection[axisID] = selection[axisID];
                });
                this.emit({
                    type: 'afterSelectionChange',
                    selection: this.selection,
                    reset,
                    detail: eventDetail
                });
            }
            /**
             * Converts JSON to a presentation state.
             * @internal
             *
             * @param {DataPresentationState.ClassJSON} json
             * JSON (usually with a $class property) to convert.
             *
             * @return {DataPresentationState}
             * Class instance from the JSON.
             */
            fromJSON(json) {
                const presentationState = new SharedComponentState();
                const { columnOrder, visibilityMap, selection, hoverpoint } = json;
                if (columnOrder) {
                    presentationState.setColumnOrder(columnOrder);
                }
                if (visibilityMap) {
                    presentationState.setColumnVisibility(visibilityMap);
                }
                if (selection) {
                    presentationState.setSelection(selection);
                }
                if (hoverpoint) {
                    presentationState.setHoverPoint(hoverpoint);
                }
                return presentationState;
            }
            /**
             * Converts the presentation state to JSON.
             * @internal
             *
             * @return {SharedComponentState.JSON}
             * JSON of this class instance.
             */
            toJSON() {
                const json = {
                    $class: 'Dashboards.SharedComponentState'
                };
                if (this.columnOrder) {
                    json.columnOrder = this.columnOrder.slice();
                }
                if (this.hoverPoint) {
                    const { x, y, id } = this.hoverPoint;
                    json.hoverPoint = { x, y, id };
                }
                if (this.selection) {
                    json.selection = this.selection;
                }
                if (this.columnVisibilityMap) {
                    json.columnVisibility = this.columnVisibilityMap;
                }
                return json;
            }
        }
        /* *
         *
         *  Registry
         *
         * */
        Serializable.registerClassPrototype('Dashboards.SharedComponentState', SharedComponentState.prototype);
        /* *
         *
         *  Default Export
         *
         * */

        return SharedComponentState;
    });
    _registerModule(_modules, 'Dashboards/Components/ComponentGroup.js', [_modules['Dashboards/Components/SharedComponentState.js']], function (SharedState) {
        /* *
         *
         *  (c) 2009 - 2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sebastian Bochan
         *  - Wojciech Chmiel
         *  - Gøran Slettemark
         *  - Sophie Bremer
         *
         * */
        class ComponentGroup {
            static getComponentGroup(groupID) {
                if (this.componentGroups[groupID]) {
                    return this.componentGroups[groupID];
                }
            }
            static addComponentGroup(group) {
                const { id } = group;
                if (!this.componentGroups[id]) {
                    this.componentGroups[id] = group;
                }
            }
            static getGroupsFromComponent(componentID) {
                const groups = Object.keys(this.componentGroups);
                return groups.reduce((arr, groupKey) => {
                    const group = this.getComponentGroup(groupKey);
                    if (group && group.components.indexOf(componentID) > -1) {
                        arr.push(group);
                    }
                    return arr;
                }, []);
            }
            constructor(id) {
                this.state = new SharedState();
                this.components = [];
                this.id = id;
                ComponentGroup.addComponentGroup(this);
            }
            addComponents(components) {
                while (components.length) {
                    const id = components.pop();
                    if (!id) {
                        break;
                    }
                    if (this.components.indexOf(id) === -1) {
                        this.components.push(id);
                    }
                }
            }
            removeComponents(components) {
                while (components.length) {
                    const id = components.pop();
                    if (!id) {
                        break;
                    }
                    const index = this.components.indexOf(id);
                    if (index > -1) {
                        this.components.splice(index, 1);
                    }
                }
            }
            getSharedState() {
                return this.state;
            }
            on() {
                throw new Error('Method not implemented.');
            }
            emit() {
                throw new Error('Method not implemented.');
            }
        }
        ComponentGroup.componentGroups = {};

        return ComponentGroup;
    });
    _registerModule(_modules, 'Dashboards/Components/Sync/Emitter.js', [], function () {
        /* *
         *
         *  (c) 2009 - 2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sebastian Bochan
         *  - Wojciech Chmiel
         *  - Gøran Slettemark
         *  - Sophie Bremer
         *
         * */
        /**
         *  Class responsible for adding event listeners on a component
         *  @internal
         */
        class SyncEmitter {
            /**
             * Adds an emitter to the emitter registry.
             *
             * @param emitter the emitter to add to the registry.
             */
            static register(emitter) {
                const { id } = emitter;
                this.registry[id] = emitter;
            }
            /**
             * Gets an emitter from emitter registry.
             *
             * @param emitterID The ID of the emitter to get.
             */
            static get(emitterID) {
                return this.registry[emitterID];
            }
            /**
             * Creates a new emitter instance.
             *
             * @param id An unique ID for the emitter.
             *
             * @param func
             * The function to be called when the emitter is activated.
             */
            constructor(id, func) {
                this.id = id;
                this.func = func;
                SyncEmitter.register(this);
            }
            /**
             * Attaches the emitter to a component.
             *
             * @param component The component to attach to.
             */
            create(component) {
                this.callback = this.func.call(component);
            }
            /**
             * To be used when removing the emitter from the component.
             * Calls the {@link callback} function.
             */
            remove() {
                if (this.callback) {
                    this.callback();
                }
            }
        }
        /**
         * Registry for reusable emitter.
         * The emitter is stored by ID.
         */
        SyncEmitter.registry = {};

        return SyncEmitter;
    });
    _registerModule(_modules, 'Dashboards/Components/Sync/Handler.js', [], function () {
        /* *
         *
         *  (c) 2009 - 2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sebastian Bochan
         *  - Wojciech Chmiel
         *  - Gøran Slettemark
         *  - Sophie Bremer
         *
         * */
        /* *
         *
         *  Class
         *
         * */
        /**
         * Class responsible for storing handler callbacks used in component sync.
         * @internal
         */
        class SyncHandler {
            /**
             * Adds a handler to the handler regisitry.
             *
             * @param handler The handler to add to the registry.
             */
            static register(handler) {
                const { id } = handler;
                this.registry[id] = handler;
            }
            /**
             * Gets a handler from handler registry.
             *
             * @param handlerID The ID of the handler to get.
             */
            static get(handlerID) {
                return this.registry[handlerID];
            }
            /**
             * Creates a new handler instance.
             *
             * @param id an unique ID for the handler.
             *
             * @param trigger The id of the presentationState that should trigger
             * this handler. Should be `undefined` when DataCursor is used.
             *
             * @param func
             * The function to be called when the handler is activated.
             */
            constructor(id, trigger, func) {
                this.id = id;
                this.presentationStateTrigger = trigger;
                this.func = func;
                SyncHandler.register(this);
            }
            /**
             * Attaches the handler to a component and presentationState.
             *
             * @deprecated use {@link register}
             * @param component The component to attach to.
             */
            create(component) {
                const { activeGroup } = component;
                const { func } = this;
                if (activeGroup && this.presentationStateTrigger) {
                    this.callback = activeGroup
                        .getSharedState()
                        .on(this.presentationStateTrigger, function (e) {
                        if (component.id !==
                            (e.detail ? e.detail.sender : void 0)) {
                            func.call(component, e);
                        }
                    });
                }
            }
            /**
             * Calls the activation function on the component and sets the callback to
             * the return function.
             *
             * @param component The component to register on.
             */
            register(component) {
                const { func } = this;
                this.callback = func.call(component);
            }
            /**
             * To be used when removing the handler from the component.
             * Calls the {@link callback} function.
             */
            remove() {
                if (this.callback) {
                    this.callback();
                }
            }
        }
        /**
         * Registry for reusable handlers.
         * The handler is stored by ID.
         */
        SyncHandler.registry = {};
        /* *
         *
         *  Default Export
         *
         * */

        return SyncHandler;
    });
    _registerModule(_modules, 'Dashboards/Components/Sync/Sync.js', [_modules['Dashboards/Components/Sync/Emitter.js'], _modules['Dashboards/Components/Sync/Handler.js']], function (SyncEmitter, SyncHandler) {
        /* *
         *
         *  (c) 2009 - 2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sebastian Bochan
         *  - Wojciech Chmiel
         *  - Gøran Slettemark
         *  - Sophie Bremer
         *
         * */
        /* *
         *
         * Class
         *
         * */
        /** @internal */
        class Sync {
            /* *
             *
             * Constructor
             *
             * */
            constructor(component, syncHandlers = Sync.defaultHandlers) {
                this.component = component;
                this.syncConfig = syncHandlers;
                this.registeredSyncHandlers = {};
                this.registeredSyncEmitters = {};
                this.isSyncing = false;
                this.listeners = [];
            }
            /**
             * Creates an instance of the sync class.
             *
             * @param component
             * The component to which the emitters and handlers are attached.
             *
             * @param syncHandlers
             * The emitters and handlers to use for each event.
             */
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Add new emitter to the registered emitters.
             * @param emitter
             The emitter to register.
             */
            registerSyncEmitter(emitter) {
                const { id } = emitter;
                this.registeredSyncEmitters[id] = emitter;
            }
            /**
             * Method that checks if the emitter is registered.
             *
             * @param id
             * The id of the emitter to check.
             *
             * @returns
             * Whether the emitter is registered.
             */
            isRegisteredEmitter(id) {
                return Boolean(this.registeredSyncEmitters[id]);
            }
            /**
             * Register new handler to the registered handlers.
             *
             * @param handler
             * The handler to register.
             */
            registerSyncHandler(handler) {
                const { id } = handler;
                this.registeredSyncHandlers[id] = handler;
            }
            /**
             * Method that checks if the handler is registered.
             *
             * @param handlerID
             * The id of the handler to check.
             *
             * @returns
             * Whether the handler is registered.
             */
            isRegisteredHandler(handlerID) {
                return Boolean(this.registeredSyncHandlers[handlerID]);
            }
            /**
             * Registers the handlers and emitters on the component
             */
            start() {
                const { syncConfig, component } = this;
                for (const id of Object.keys(syncConfig)) {
                    if (!syncConfig[id]) {
                        continue;
                    }
                    let { emitter: emitterConfig, handler: handlerConfig } = syncConfig[id];
                    if (handlerConfig) {
                        // Avoid registering the same handler multiple times
                        // i.e. panning and selection uses the same handler
                        if (typeof handlerConfig === 'boolean') {
                            handlerConfig =
                                Sync.defaultHandlers[id]
                                    .handler;
                        }
                        // TODO: should rework the SyncHandler constructor when
                        // all handlers are updated
                        if (typeof handlerConfig === 'function') {
                            handlerConfig = [id, void 0, handlerConfig];
                        }
                        const handler = new SyncHandler(...handlerConfig);
                        if (!this.isRegisteredHandler(handler.id)) {
                            this.registerSyncHandler(handler);
                            // TODO: workaround for now
                            // we should only use register in the future
                            if (handlerConfig[1] !== void 0) {
                                handler.create(component);
                            }
                            else {
                                handler.register(component);
                            }
                        }
                    }
                    if (emitterConfig) {
                        if (typeof emitterConfig === 'boolean') {
                            emitterConfig =
                                Sync.defaultHandlers[id]
                                    .emitter;
                        }
                        // TODO: should rework the SyncHandler constructor when
                        // all handlers are updated
                        if (typeof emitterConfig === 'function') {
                            emitterConfig = [id, emitterConfig];
                        }
                        const emitter = new SyncEmitter(...emitterConfig);
                        if (!this.isRegisteredEmitter(emitter.id)) {
                            this.registerSyncEmitter(emitter);
                            emitter.create(component);
                        }
                    }
                }
                this.isSyncing = true;
                this.listeners.push(component.on('update', () => this.stop()));
            }
            /**
             * Removes the handlers and emitters from the component.
             */
            stop() {
                const { component, listeners, registeredSyncHandlers, registeredSyncEmitters } = this;
                Object.keys(registeredSyncHandlers).forEach((id) => {
                    registeredSyncHandlers[id].remove();
                    delete registeredSyncHandlers[id];
                });
                Object.keys(registeredSyncEmitters).forEach((id) => {
                    registeredSyncEmitters[id].remove();
                    delete registeredSyncEmitters[id];
                });
                this.isSyncing = false;
                for (let i = 0, iEnd = listeners.length; i < iEnd; ++i) {
                    listeners[i]();
                }
                this.listeners.length = 0;
                this.listeners.push(component.on('afterUpdate', () => {
                    this.start();
                }));
            }
        }
        /**
         * Default handlers for the sync class. This property is extended by
         * different Components, where default syncs are added. Allows overwriting
         * the configuration before creating the dashboard.
         */
        Sync.defaultHandlers = {};
        /* *
         *
         *  Default Export
         *
         * */

        return Sync;
    });
    _registerModule(_modules, 'Dashboards/Components/Component.js', [_modules['Dashboards/CallbackRegistry.js'], _modules['Dashboards/Components/EditableOptions.js'], _modules['Dashboards/Globals.js'], _modules['Core/Utilities.js'], _modules['Dashboards/Components/ComponentUtilities.js'], _modules['Dashboards/Components/ComponentGroup.js'], _modules['Dashboards/Utilities.js'], _modules['Dashboards/Components/Sync/Sync.js']], function (CallbackRegistry, EditableOptions, Globals, U, CU, ComponentGroup, DU, Sync) {
        /* *
         *
         *  (c) 2009 - 2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sebastian Bochan
         *  - Wojciech Chmiel
         *  - Gøran Slettemark
         *  - Sophie Bremer
         *
         * */
        const { classNamePrefix } = Globals;
        const { createElement, isArray, merge, fireEvent, addEvent, objectEach, isFunction, getStyle, relativeLength, diffObjects } = U;
        const { getMargins, getPaddings } = CU;
        const { uniqueKey } = DU;
        /* *
         *
         *  Class
         *
         * */
        /**
         *
         * Abstract Class of component.
         *
         * @internal
         *
         */
        /**
         * Abstract Class of component.
         * @internal
         */
        class Component {
            /* *
             *
             *  Static Functions
             *
             * */
            /**
             *
             * Creates HTML text element like header or title
             *
             * @param tagName
             * HTML tag name used as wrapper of text like `h2` or `p`.
             * @param elementName
             * Name of element
             * @param textOptions
             * The options for the component
             * @returns
             * HTML object when title is created, otherwise undefined
             *
             * @internal
             */
            static createTextElement(tagName, elementName, textOptions) {
                if (typeof textOptions === 'object') {
                    const { className, text, style } = textOptions;
                    return createElement(tagName, {
                        className: className || `${classNamePrefix}component-${elementName}`,
                        textContent: text
                    }, style);
                }
                if (typeof textOptions === 'string') {
                    return createElement(tagName, {
                        className: `${classNamePrefix}component-${elementName}`,
                        textContent: textOptions
                    }, {});
                }
            }
            /* *
             *
             *  Constructor
             *
             * */
            /**
             * Creates a component in the cell.
             *
             * @param cell
             * Instance of cell, where component is attached.
             *
             * @param options
             * The options for the component.
             */
            constructor(cell, options) {
                /**
                 * Registry of callbacks registered on the component. Used in the Highcharts
                 * component to keep track of chart events.
                 *
                 * @internal
                 */
                this.callbackRegistry = new CallbackRegistry();
                /**
                 * Event listeners tied to the current DataTable. Used for rerendering the
                 * component on data changes.
                 *
                 * @internal
                 */
                this.tableEvents = [];
                /**
                 * Event listeners tied to the parent cell. Used for rendering/resizing the
                 * component on interactions.
                 *
                 * @internal
                 */
                this.cellListeners = [];
                /**
                 * The active group of the component. Used for sync.
                 *
                 * @internal
                 */
                this.activeGroup = void 0;
                /**
                 * Timeouts for calls to `Component.resizeTo()`.
                 *
                 * @internal
                /* *
                 */
                this.resizeTimeouts = [];
                /**
                 * Timeouts for resizing the content. I.e. `chart.setSize()`.
                 *
                 * @internal
                 * */
                this.innerResizeTimeouts = [];
                this.board = cell.row.layout.board;
                this.parentElement = cell.container;
                this.cell = cell;
                this.options = merge(Component.defaultOptions, options);
                this.id = this.options.id && this.options.id.length ?
                    this.options.id :
                    uniqueKey();
                this.editableOptions =
                    new EditableOptions(this, options.editableOptionsBindings);
                this.presentationModifier = this.options.presentationModifier;
                this.dimensions = {
                    width: null,
                    height: null
                };
                this.element = createElement('div', {
                    className: this.options.className
                }, {}, this.parentElement);
                this.contentElement = createElement('div', {
                    className: `${this.options.className}-content`
                }, {
                    height: '100%'
                }, this.element, true);
                this.filterAndAssignSyncOptions();
                this.setupEventListeners();
                this.attachCellListeneres();
                this.on('tableChanged', () => {
                    this.onTableChanged();
                });
                this.on('update', () => {
                    this.cell.setLoadingState();
                });
                this.on('afterRender', () => {
                    this.cell.setLoadingState(false);
                });
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Inits connectors for the component and rerenders it.
             *
             * @returns
             * Promise resolving to the component.
             */
            async initConnector() {
                if (this.options.connector?.id &&
                    this.connectorId !== this.options.connector.id) {
                    this.cell.setLoadingState();
                    const connector = await this.board.dataPool
                        .getConnector(this.options.connector.id);
                    this.setConnector(connector);
                }
                return this;
            }
            /**
            * Filter the sync options that are declared in the component options.
            * Assigns the sync options to the component and to the sync instance.
            *
            * @param defaultHandlers
            * Sync handlers on component.
            *
            * @internal
            */
            filterAndAssignSyncOptions(defaultHandlers = this.constructor.syncHandlers) {
                const sync = this.options.sync || {};
                const syncHandlers = Object.keys(sync)
                    .reduce((carry, handlerName) => {
                    if (handlerName) {
                        const handler = sync[handlerName];
                        if (handler && typeof handler === 'object') {
                            carry[handlerName] = handler;
                        }
                        if (handler && typeof handler === 'boolean') {
                            carry[handlerName] = defaultHandlers[handlerName];
                        }
                    }
                    return carry;
                }, {});
                this.sync ? this.sync.syncConfig = syncHandlers : void 0;
                this.syncHandlers = syncHandlers;
            }
            /**
             * Setup listeners on cell/other things up the chain
             *
             * @internal
             */
            attachCellListeneres() {
                // remove old listeners
                while (this.cellListeners.length) {
                    const destroy = this.cellListeners.pop();
                    if (destroy) {
                        destroy();
                    }
                }
                if (this.cell && Object.keys(this.cell).length) {
                    const board = this.cell.row.layout.board;
                    this.cellListeners.push(
                    // Listen for resize on dashboard
                    addEvent(board, 'cellResize', () => {
                        this.resizeTo(this.parentElement);
                    }), 
                    // Listen for changed parent
                    addEvent(this.cell.row, 'cellChange', (e) => {
                        const { row } = e;
                        if (row && this.cell) {
                            const hasLeftTheRow = row.getCellIndex(this.cell) === void 0;
                            if (hasLeftTheRow) {
                                if (this.cell) {
                                    this.setCell(this.cell);
                                }
                            }
                        }
                    }));
                }
            }
            /**
             * Set a parent cell.
             * @param cell
             * Instance of a cell.
             * @param resize
             * Flag that allow to resize the component.
             *
             * @internal
             */
            setCell(cell, resize = false) {
                this.cell = cell;
                if (cell.container) {
                    this.parentElement = cell.container;
                }
                this.attachCellListeneres();
                if (resize) {
                    this.resizeTo(this.parentElement);
                }
            }
            /**
             * Adds event listeners to data table.
             * @param table
             * Data table that is source of data.
             * @internal
             */
            setupTableListeners(table) {
                const connector = this.connector;
                if (connector) {
                    if (table) {
                        [
                            'afterDeleteColumns',
                            'afterDeleteRows',
                            'afterSetCell',
                            'afterSetConnector',
                            'afterSetColumns',
                            'afterSetRows'
                        ].forEach((event) => {
                            this.tableEvents.push((table)
                                .on(event, (e) => {
                                clearInterval(this.tableEventTimeout);
                                this.tableEventTimeout = Globals.win.setTimeout(() => {
                                    this.emit({
                                        ...e,
                                        type: 'tableChanged'
                                    });
                                    this.tableEventTimeout = void 0;
                                }, 0);
                            }));
                        });
                    }
                    this.tableEvents.push(connector.on('afterLoad', () => {
                        this.emit({
                            target: this,
                            type: 'tableChanged'
                        });
                    }));
                }
            }
            /**
             * Remove event listeners in data table.
             * @internal
             */
            clearTableListeners() {
                const connector = this.connector, tableEvents = this.tableEvents;
                if (tableEvents.length) {
                    tableEvents.forEach((removeEventCallback) => removeEventCallback());
                }
                if (connector) {
                    tableEvents.push(connector.table.on('afterSetModifier', (e) => {
                        if (e.type === 'afterSetModifier') {
                            this.emit({
                                ...e,
                                type: 'tableChanged'
                            });
                        }
                    }));
                }
            }
            /**
             * Attaches data store to the component.
             * @param connector
             * Connector of data.
             *
             * @returns
             * Component which can be used in chaining.
             *
             * @internal
             */
            setConnector(connector) {
                fireEvent(this, 'setConnector', { connector });
                // Clean up old event listeners
                while (this.tableEvents.length) {
                    const eventCallback = this.tableEvents.pop();
                    if (typeof eventCallback === 'function') {
                        eventCallback();
                    }
                }
                this.connector = connector;
                if (connector) {
                    // Set up event listeners
                    this.clearTableListeners();
                    this.setupTableListeners(connector.table);
                    // re-setup if modifier changes
                    connector.table.on('setModifier', () => this.clearTableListeners());
                    connector.table.on('afterSetModifier', (e) => {
                        if (e.type === 'afterSetModifier' && e.modified) {
                            this.setupTableListeners(e.modified);
                        }
                    });
                    // Add the component to a group based on the
                    // connector table id by default
                    // TODO: make this configurable
                    const tableID = connector.table.id;
                    if (!ComponentGroup.getComponentGroup(tableID)) {
                        ComponentGroup.addComponentGroup(new ComponentGroup(tableID));
                    }
                    const group = ComponentGroup.getComponentGroup(tableID);
                    if (group) {
                        group.addComponents([this.id]);
                        this.activeGroup = group;
                    }
                }
                fireEvent(this, 'afterSetConnector', { connector });
                return this;
            }
            /** @internal */
            setActiveGroup(group) {
                if (typeof group === 'string') {
                    group = ComponentGroup.getComponentGroup(group) || null;
                }
                if (group instanceof ComponentGroup) {
                    this.activeGroup = group;
                }
                if (group === null) {
                    this.activeGroup = void 0;
                }
                if (this.activeGroup) {
                    this.activeGroup.addComponents([this.id]);
                }
            }
            /**
             * Gets height of the component's content.
             *
             * @returns
             * Current height as number.
             * @internal
             */
            getContentHeight() {
                const parentHeight = this.dimensions.height || Number(getStyle(this.element, 'height'));
                const titleHeight = this.titleElement ?
                    this.titleElement.clientHeight + getMargins(this.titleElement).y :
                    0;
                const captionHeight = this.captionElement ?
                    this.captionElement.clientHeight +
                        getMargins(this.captionElement).y :
                    0;
                return parentHeight - titleHeight - captionHeight;
            }
            /**
             * Resize the component
             * @param width
             * The width to set the component to.
             * Can be pixels, a percentage string or null.
             * Null will unset the style
             * @param height
             * The height to set the component to.
             * Can be pixels, a percentage string or null.
             * Null will unset the style.
             */
            resize(width, height) {
                if (height) {
                    // Get offset for border, padding
                    const pad = getPaddings(this.element).y + getMargins(this.element).y;
                    this.dimensions.height = relativeLength(height, Number(getStyle(this.parentElement, 'height'))) - pad;
                    this.element.style.height = this.dimensions.height + 'px';
                    this.contentElement.style.height = this.getContentHeight() + 'px';
                }
                if (width) {
                    const pad = getPaddings(this.element).x + getMargins(this.element).x;
                    this.dimensions.width = relativeLength(width, Number(getStyle(this.parentElement, 'width'))) - pad;
                    this.element.style.width = this.dimensions.width + 'px';
                }
                if (height === null) {
                    this.dimensions.height = null;
                    this.element.style.removeProperty('height');
                }
                if (width === null) {
                    this.dimensions.width = null;
                    this.element.style.removeProperty('width');
                }
                fireEvent(this, 'resize', {
                    width,
                    height
                });
            }
            /**
             * Adjusts size of component to parent's cell size when animation is done.
             * @param element
             * HTML element that is resized.
             */
            resizeTo(element) {
                while (this.resizeTimeouts.length) {
                    const timeout = this.resizeTimeouts.pop();
                    if (timeout) {
                        cancelAnimationFrame(timeout);
                    }
                }
                const timeoutID = requestAnimationFrame(() => {
                    const { width, height } = element.getBoundingClientRect();
                    const padding = getPaddings(element);
                    const margins = getMargins(element);
                    this.resize(width - padding.x - margins.x, height - padding.y - margins.y);
                });
                this.resizeTimeouts.push(timeoutID);
            }
            /**
             * Handles updating via options.
             * @param newOptions
             * The options to apply.
             *
             * @param shouldRerender
             * Set to true if the update should rerender the component.
             */
            async update(newOptions, shouldRerender = true) {
                const eventObject = {
                    options: newOptions,
                    shouldForceRerender: false
                };
                // Update options
                fireEvent(this, 'update', eventObject);
                this.options = merge(this.options, newOptions);
                if (this.options.connector?.id &&
                    this.connectorId !== this.options.connector.id) {
                    const connector = await this.board.dataPool
                        .getConnector(this.options.connector.id);
                    this.setConnector(connector);
                }
                this.options = merge(this.options, newOptions);
                if (shouldRerender || eventObject.shouldForceRerender) {
                    this.render();
                }
            }
            /**
             * Private method which sets up event listeners for the component.
             *
             * @internal
             */
            setupEventListeners() {
                const events = this.options.events;
                if (events) {
                    Object.keys(events).forEach((key) => {
                        const eventCallback = events[key];
                        if (eventCallback) {
                            this.callbackRegistry.addCallback(key, {
                                type: 'component',
                                func: eventCallback
                            });
                        }
                    });
                    objectEach(events, (eventCallback, eventType) => {
                        if (isFunction(eventCallback)) {
                            this.on(eventType, eventCallback);
                        }
                    });
                }
                // TODO: Replace with a resize observer.
                window.addEventListener('resize', () => this.resizeTo(this.parentElement));
            }
            /**
             * Adds title at the top of component's container.
             *
             * @param titleOptions
             * The options for the title.
             */
            setTitle(titleOptions) {
                const titleElement = this.titleElement, shouldExist = titleOptions &&
                    (typeof titleOptions === 'string' || titleOptions.text);
                if (shouldExist) {
                    const newTitle = Component.createTextElement('h2', 'title', titleOptions);
                    if (newTitle) {
                        if (!titleElement) {
                            this.element.insertBefore(newTitle, this.element.firstChild);
                        }
                        else {
                            titleElement.replaceWith(newTitle);
                        }
                        this.titleElement = newTitle;
                    }
                }
                else {
                    if (titleElement) {
                        titleElement.remove();
                        delete this.titleElement;
                        return;
                    }
                }
            }
            /**
             * Adds caption at the bottom of component's container.
             *
             * @param captionOptions
             * The options for the caption.
             */
            setCaption(captionOptions) {
                const captionElement = this.captionElement, shouldExist = captionOptions &&
                    (typeof captionOptions === 'string' || captionOptions.text);
                if (shouldExist) {
                    const newCaption = Component.createTextElement('div', 'caption', captionOptions);
                    if (newCaption) {
                        if (!captionElement) {
                            this.element.appendChild(newCaption);
                        }
                        else {
                            captionElement.replaceWith(newCaption);
                        }
                        this.titleElement = newCaption;
                    }
                }
                else {
                    if (captionElement) {
                        captionElement.remove();
                        delete this.captionElement;
                        return;
                    }
                }
            }
            /**
             * Handles setting things up on initial render.
             *
             * @returns
             * The component for chaining.
             *
             * @internal
             */
            async load() {
                await this.initConnector();
                this.render();
                return this;
            }
            /**
             * Renders the component.
             *
             * @returns
             * The component for chaining.
             *
             * @internal
             */
            render() {
                this.emit({ type: 'render' });
                this.resizeTo(this.parentElement);
                this.setTitle(this.options.title);
                this.setCaption(this.options.caption);
                return this;
            }
            /**
             * Destroys the component.
             */
            destroy() {
                /**
                 * TODO: Should perhaps set an `isActive` flag to false.
                 */
                while (this.element.firstChild) {
                    this.element.firstChild.remove();
                }
                // Unregister events
                this.tableEvents.forEach((eventCallback) => eventCallback());
                this.element.remove();
            }
            /** @internal */
            on(type, callback) {
                return addEvent(this, type, callback);
            }
            /** @internal */
            emit(e) {
                if (!e.target) {
                    e.target = this;
                }
                fireEvent(this, e.type, e);
            }
            /**
             * Converts the class instance to a class JSON.
             * @internal
             *
             * @returns
             * Class JSON of this Component instance.
             *
             * @internal
             */
            toJSON() {
                const dimensions = {
                    width: 0,
                    height: 0
                };
                objectEach(this.dimensions, function (value, key) {
                    if (value === null) {
                        return;
                    }
                    dimensions[key] = value;
                });
                const json = {
                    $class: this.options.type,
                    // connector: this.connector ? this.connector.toJSON() : void 0,
                    options: {
                        cell: this.options.cell,
                        parentElement: this.parentElement.id,
                        dimensions,
                        id: this.id,
                        type: this.type
                    }
                };
                return json;
            }
            /**
             * Get the component's options.
             * @returns
             * The JSON of component's options.
             *
             * @internal
             *
             */
            getOptions() {
                return diffObjects(this.options, Component.defaultOptions);
            }
            getEditableOptions() {
                const component = this;
                return merge(component.options);
            }
            getEditableOptionValue(propertyPath) {
                const component = this;
                if (!propertyPath) {
                    return;
                }
                let result = component.getEditableOptions();
                for (let i = 0, end = propertyPath.length; i < end; i++) {
                    if (!result) {
                        return;
                    }
                    if (isArray(result)) {
                        result = result[0];
                    }
                    result = result[propertyPath[i]];
                }
                return result;
            }
        }
        /* *
         *
         *  Properties
         *
         * */
        /** @internal */
        Component.Sync = Sync;
        /**
         * Default options of the component.
         */
        Component.defaultOptions = {
            className: `${classNamePrefix}component`,
            id: '',
            title: false,
            caption: false,
            sync: Sync.defaultHandlers,
            editableOptions: [{
                    name: 'connectorName',
                    propertyPath: ['connector', 'id'],
                    type: 'select'
                }, {
                    name: 'title',
                    propertyPath: ['title'],
                    type: 'input'
                }, {
                    name: 'caption',
                    propertyPath: ['caption'],
                    type: 'input'
                }]
        };
        /**
         * Default sync Handlers.
         */
        Component.syncHandlers = {};

        return Component;
    });
    _registerModule(_modules, 'Dashboards/Components/HTMLComponent.js', [_modules['Core/Renderer/HTML/AST.js'], _modules['Dashboards/Components/Component.js'], _modules['Core/Utilities.js']], function (AST, Component, U) {
        /* *
         *
         *  (c) 2009 - 2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sebastian Bochan
         *  - Wojciech Chmiel
         *  - Gøran Slettemark
         *  - Sophie Bremer
         *
         * */
        const { merge, diffObjects } = U;
        // TODO: This may affect the AST parsing in Highcharts
        // should look into adding these as options if possible
        // Needs to go in a composition in the Highcharts plugin
        AST.allowedTags = [
            ...AST.allowedTags,
            'option',
            'select',
            'label',
            'input',
            'textarea'
        ];
        AST.allowedAttributes = [
            ...AST.allowedAttributes,
            'for', 'value', 'checked', 'src', 'name', 'selected'
        ];
        AST.allowedReferences = [...AST.allowedReferences, 'data:image/'];
        /* *
         *
         *  Class
         *
         * */
        /**
         *
         * Class that represents a HTML component.
         *
         */
        class HTMLComponent extends Component {
            /* *
             *
             *  Static functions
             *
             * */
            /**
             * Creates component from JSON.
             *
             * @param json
             * Set of component options, used for creating the HTML component.
             *
             * @param cell
             * Instance of cell, where component is attached.
             *
             * @returns
             * HTML component based on config from JSON.
             *
             * @internal
             */
            static fromJSON(json, cell) {
                const options = json.options;
                const elements = (json.elements ?
                    json.elements.map((el) => JSON.parse(el)) :
                    []);
                // const connector = (
                //     json.connector ? DataJSON.fromJSON(json.connector) : void 0
                // );
                const component = new HTMLComponent(cell, merge(options, {
                    elements
                    // connector: (
                    //   connector instanceof DataConnector ? connector : void 0
                    // )
                }));
                component.emit({
                    type: 'fromJSON',
                    json
                });
                return component;
            }
            /* *
             *
             *  Constructor
             *
             * */
            /**
             * Creates a HTML component in the cell.
             *
             * @param options
             * The options for the component.
             */
            constructor(cell, options) {
                options = merge(HTMLComponent.defaultOptions, options);
                super(cell, options);
                this.options = options;
                this.type = 'HTML';
                this.elements = [];
                this.sync = new Component.Sync(this, this.syncHandlers);
            }
            /* *
             *
             *  Functions
             *
             * */
            /** @internal */
            async load() {
                this.emit({
                    type: 'load'
                });
                await super.load();
                const options = this.options;
                let isError = false;
                if (options.elements) {
                    this.elements = options.elements.map(function (element) {
                        if (typeof element === 'string') {
                            return new AST(element).nodes[0];
                        }
                        if (!element.textContent &&
                            !element.tagName &&
                            element.attributes) {
                            isError = true;
                        }
                        return element;
                    });
                }
                this.constructTree();
                this.emit({ type: 'afterLoad' });
                if (isError) {
                    throw new Error('Missing tagName param in component: ' +
                        options.cell);
                }
                return this;
            }
            render() {
                super.render();
                this.constructTree();
                this.emit({ type: 'afterRender' });
                return this;
            }
            resize(width, height) {
                super.resize(width, height);
                return this;
            }
            /**
             * Handles updating via options.
             * @param options
             * The options to apply.
             */
            async update(options) {
                await super.update(options);
                this.emit({ type: 'afterUpdate' });
            }
            /**
             * TODO: Could probably use the serialize function moved on
             * the exportdata branch
             *
             * @internal
             */
            constructTree() {
                // Remove old tree if rerendering.
                while (this.contentElement.firstChild) {
                    this.contentElement.firstChild.remove();
                }
                const parser = new AST(this.elements);
                parser.addToDOM(this.contentElement);
            }
            /**
             * Converts the class instance to a class JSON.
             *
             * @returns
             * Class JSON of this Component instance.
             *
             * @internal
             */
            toJSON() {
                const elements = (this.options.elements || [])
                    .map((el) => JSON.stringify(el));
                const json = merge(super.toJSON(), {
                    elements,
                    options: this.options
                });
                this.emit({
                    type: 'toJSON',
                    json
                });
                return json;
            }
            /**
             * Get the HTML component's options.
             * @returns
             * The JSON of HTML component's options.
             *
             * @internal
             *
             */
            getOptions() {
                return {
                    ...diffObjects(this.options, HTMLComponent.defaultOptions),
                    type: 'HTML'
                };
            }
            /**
             * @internal
             */
            onTableChanged(e) {
                if (e.detail?.sender !== this.id) {
                    this.render();
                }
            }
        }
        /* *
         *
         *  Static properties
         *
         * */
        /**
         * Default options of the HTML component.
         */
        HTMLComponent.defaultOptions = merge(Component.defaultOptions, {
            type: 'HTML',
            elements: []
        });
        /* *
         *
         *  Default export
         *
         * */

        return HTMLComponent;
    });
    _registerModule(_modules, 'Dashboards/Board.js', [_modules['Dashboards/Actions/Bindings.js'], _modules['Dashboards/Components/ComponentRegistry.js'], _modules['Dashboards/Accessibility/DashboardsAccessibility.js'], _modules['Data/DataCursor.js'], _modules['Dashboards/SerializeHelper/DataCursorHelper.js'], _modules['Data/DataPool.js'], _modules['Dashboards/EditMode/EditMode.js'], _modules['Dashboards/EditMode/Fullscreen.js'], _modules['Dashboards/Globals.js'], _modules['Dashboards/Layout/Layout.js'], _modules['Dashboards/Serializable.js'], _modules['Core/Utilities.js'], _modules['Dashboards/Components/HTMLComponent.js']], function (Bindings, ComponentRegistry, DashboardsAccessibility, DataCursor, DataCursorHelper, DataPool, EditMode, Fullscreen, Globals, Layout, Serializable, U, HTMLComponent) {
        /* *
         *
         *  (c) 2009 - 2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sebastian Bochan
         *  - Wojciech Chmiel
         *  - Gøran Slettemark
         *  - Sophie Bremer
         *  - Pawel Lysy
         *  - Karol Kolodziej
         *
         * */
        const { merge, addEvent, error, objectEach, uniqueKey, createElement } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Class that represents a dashboard.
         *
         * @example
         * const dashboard = Dashboards.board('container', {
         *      gui: {
         *          layouts: [{
         *              id: 'layout-1',
         *              rows: [{
         *                  cells: [{
         *                      id: 'dashboard-col-0'
         *                  }]
         *              }]
         *          }]
         *      },
         *      components: [{
         *          cell: 'dashboard-col-0',
         *          type: 'Highcharts',
         *          chartOptions: {
         *              series: [{
         *                  data: [1, 2, 3, 4]
         *              }]
         *          }
         *      }]
         * });
         */
        class Board {
            // Implementation:
            static board(renderTo, options, async) {
                return new Board(renderTo, options).init(async);
            }
            /* *
             *
             *  Constructor
             *
             * */
            /**
             * Creates a dashboard with components like charts, tables, and HTML
             * elements.
             *
             * @internal
             * @param renderTo
             * The DOM element to render to, or its id.
             *
             * @param options
             * The options for the dashboard.
             */
            constructor(renderTo, options) {
                /**
                 * The container referenced by the `renderTo` option when creating the
                 * dashboard.
                 * @internal
                 * */
                this.boardWrapper = void 0;
                /**
                 * The main container for the dashboard. Created inside the element
                 * specified by user when creating the dashboard.
                 * */
                this.container = void 0;
                this.options = merge(Board.defaultOptions, options);
                this.dataPool = new DataPool(options.dataPool);
                this.id = uniqueKey();
                this.guiEnabled = (this.options.gui || {}).enabled;
                this.layouts = [];
                this.mountedComponents = [];
                this.initContainer(renderTo);
                // Create layouts wrapper.
                this.layoutsWrapper = createElement('div', {
                    className: Globals.classNames.layoutsWrapper
                }, {}, this.container);
                // Init edit mode.
                if (EditMode && !(this.options.editMode &&
                    !this.options.editMode.enabled)) {
                    this.editMode = new EditMode(this, this.options.editMode);
                }
                // Add table cursors support.
                this.dataCursor = new DataCursor();
                // Add fullscreen support.
                this.fullscreen = new Fullscreen(this);
                this.index = Globals.boards.length;
                Globals.boards.push(this);
                // a11y module
                this.a11y = new DashboardsAccessibility(this);
            }
            // Implementation:
            init(async) {
                const options = this.options;
                if (options.gui && this.options.gui) {
                    this.setLayouts(this.options.gui);
                }
                // Init layouts from JSON.
                if (options.layoutsJSON && !this.layouts.length) {
                    this.setLayoutsFromJSON(options.layoutsJSON);
                }
                let componentPromises = (options.components) ?
                    this.setComponents(options.components) : [];
                // Init events.
                this.initEvents();
                if (async) {
                    return Promise.all(componentPromises).then(() => this);
                }
                return this;
            }
            /**
             * Initializes the events.
             * @internal
             */
            initEvents() {
                const board = this, runReflow = () => {
                    board.reflow();
                };
                if (typeof ResizeObserver === 'function') {
                    this.resizeObserver = new ResizeObserver(runReflow);
                    this.resizeObserver.observe(board.container);
                }
                else {
                    const unbind = addEvent(window, 'resize', runReflow);
                    addEvent(this, 'destroy', unbind);
                }
            }
            /**
             * Initialize the container for the dashboard.
             * @internal
             *
             * @param renderTo
             * The DOM element to render to, or its id.
             */
            initContainer(renderTo) {
                const board = this;
                if (typeof renderTo === 'string') {
                    renderTo = window.document.getElementById(renderTo);
                }
                // Display an error if the renderTo doesn't exist.
                if (!renderTo) {
                    error(13, true);
                }
                // Clear the container from any content.
                renderTo.innerHTML = '';
                // Set the main wrapper container.
                board.boardWrapper = renderTo;
                // Add container for the board.
                board.container = createElement('div', {
                    className: Globals.classNames.boardContainer
                }, {}, this.boardWrapper);
            }
            /**
             * Creates a new layouts and adds it to the dashboard based on the options.
             * @internal
             *
             * @param guiOptions
             * The GUI options for the layout.
             *
             */
            setLayouts(guiOptions) {
                const board = this, layoutsOptions = guiOptions.layouts;
                for (let i = 0, iEnd = layoutsOptions.length; i < iEnd; ++i) {
                    board.layouts.push(new Layout(board, merge({}, guiOptions.layoutOptions, layoutsOptions[i])));
                }
            }
            /**
             * Set the layouts from JSON.
             * @internal
             *
             * @param json
             * An array of layout JSON objects.
             *
             */
            setLayoutsFromJSON(json) {
                const board = this;
                let layout;
                for (let i = 0, iEnd = json.length; i < iEnd; ++i) {
                    layout = Layout.fromJSON(json[i], board);
                    if (layout) {
                        board.layouts.push(layout);
                    }
                }
            }
            /**
             * Set the components from options.
             * @internal
             *
             * @param components
             * An array of component options.
             *
             */
            setComponents(components) {
                const promises = [];
                for (let i = 0, iEnd = components.length; i < iEnd; ++i) {
                    promises.push(Bindings.addComponent(components[i]));
                }
                return promises;
            }
            /**
             * Returns the current size of the layout container based on the selected
             * responsive breakpoints.
             * @internal
             *
             * @returns Return current size of the layout container in px.
             */
            getLayoutContainerSize() {
                const board = this, responsiveOptions = board.options.responsiveBreakpoints, cntWidth = (board.layoutsWrapper || {}).clientWidth;
                let size = Globals.responsiveBreakpoints.large;
                if (responsiveOptions) {
                    if (cntWidth <= responsiveOptions.small) {
                        size = Globals.responsiveBreakpoints.small;
                    }
                    else if (cntWidth > responsiveOptions.small &&
                        cntWidth <= responsiveOptions.medium) {
                        size = Globals.responsiveBreakpoints.medium;
                    }
                }
                return size;
            }
            /**
             * Destroy the whole dashboard, its layouts and elements.
             */
            destroy() {
                const board = this;
                // Destroy layouts.
                for (let i = 0, iEnd = board.layouts.length; i < iEnd; ++i) {
                    board.layouts[i].destroy();
                }
                // Remove resizeObserver from the board
                this.resizeObserver?.unobserve(board.container);
                // Destroy container.
                board.container.remove();
                // @ToDo Destroy bindings.
                // Delete all properties.
                objectEach(board, function (val, key) {
                    delete board[key];
                });
                Globals.boards[this.index] = void 0;
                return;
            }
            /**
             * Export layouts to the local storage.
             */
            exportLocal() {
                localStorage.setItem(
                // Dashboard.prefix + this.id,
                Globals.classNamePrefix + '1', // temporary for demo test
                JSON.stringify(this.toJSON()));
            }
            /**
             * Import the dashboard's layouts from the local storage.
             *
             * @param id
             * The id of the layout to import.
             *
             * @returns Returns the imported layout.
             */
            importLayoutLocal(id) {
                return Layout.importLocal(id, this);
            }
            /**
             * Reflow the dashboard. Hide the toolbars and context pointer. Reflow the
             * layouts and its cells.
             */
            reflow() {
                const board = this, cntSize = board.getLayoutContainerSize();
                let layout;
                if (board.editMode) {
                    board.editMode.hideToolbars(['cell', 'row']);
                    board.editMode.hideContextPointer();
                }
                for (let i = 0, iEnd = board.layouts.length; i < iEnd; ++i) {
                    this.reflowLayout(board.layouts[i], cntSize);
                }
            }
            reflowLayout(layout, cntSize) {
                let row, cell;
                for (let j = 0, jEnd = layout.rows.length; j < jEnd; ++j) {
                    row = layout.rows[j];
                    for (let k = 0, kEnd = row.cells.length; k < kEnd; ++k) {
                        cell = row.cells[k];
                        cell.reflow(cntSize);
                        if (cell.nestedLayout) {
                            this.reflowLayout(cell.nestedLayout, cntSize);
                        }
                    }
                }
            }
            /**
             * Converts the given JSON to a class instance.
             *
             * @param json
             * JSON to deserialize as a class instance or object.
             *
             * @returns Returns the class instance or object.
             */
            fromJSON(json) {
                const options = json.options, board = new Board(options.containerId, {
                    componentOptions: options.componentOptions,
                    responsiveBreakpoints: options.responsiveBreakpoints,
                    dataPool: options.dataPool,
                    layoutsJSON: options.layouts
                });
                board.dataCursor = DataCursorHelper.fromJSON(json.dataCursor);
                return board;
            }
            /**
             * Converts the class instance to a class JSON.
             *
             * @returns Class JSON of this Dashboard instance.
             */
            toJSON() {
                const board = this, layouts = [];
                // Get layouts JSON.
                for (let i = 0, iEnd = board.layouts.length; i < iEnd; ++i) {
                    layouts.push(board.layouts[i].toJSON());
                }
                return {
                    $class: 'Board',
                    dataCursor: DataCursorHelper.toJSON(board.dataCursor),
                    options: {
                        containerId: board.container.id,
                        dataPool: board.options.dataPool,
                        guiEnabled: board.guiEnabled,
                        layouts: layouts,
                        componentOptions: board.options.componentOptions,
                        responsiveBreakpoints: board.options.responsiveBreakpoints
                    }
                };
            }
            /**
             * Convert the current state of board's options into JSON. The function does
             * not support converting functions or events into JSON object.
             *
             * @returns
             * The JSON of boards's options.
             */
            getOptions() {
                const board = this, layouts = [], components = [];
                for (let i = 0, iEnd = board.layouts.length; i < iEnd; ++i) {
                    layouts.push(board.layouts[i].getOptions());
                }
                for (let i = 0, iEnd = board.mountedComponents.length; i < iEnd; ++i) {
                    if (board.mountedComponents[i].cell &&
                        board.mountedComponents[i].cell.mountedComponent) {
                        components.push(board.mountedComponents[i].component.getOptions());
                    }
                }
                return {
                    ...this.options,
                    gui: {
                        layouts
                    },
                    components: components
                };
            }
        }
        /* *
         *
         *  Class Namespace
         *
         * */
        (function (Board) {
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
            /**
             * Global dashboard settings.
             * @internal
             *
             */
            Board.defaultOptions = {
                gui: {
                    enabled: true,
                    layoutOptions: {
                        rowClassName: void 0,
                        cellClassName: void 0
                    },
                    layouts: []
                },
                components: [],
                responsiveBreakpoints: {
                    small: 576,
                    medium: 992,
                    large: 1200
                }
            };
            /**
             * @internal
             */
            Board.componentTypes = ComponentRegistry.types;
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Import layouts from the local storage.
             *
             * @returns Returns the Dashboard instance or undefined.
             */
            function importLocal() {
                const dashboardJSON = localStorage.getItem(
                // Dashboard.prefix + this.id,
                Globals.classNamePrefix + '1' // temporary for demo test
                );
                if (dashboardJSON) {
                    try {
                        return Serializable
                            .fromJSON(JSON.parse(dashboardJSON));
                    }
                    catch (e) {
                        // nothing to do
                    }
                }
            }
            Board.importLocal = importLocal;
        })(Board || (Board = {}));
        /* *
         *
         *  Registry
         *
         * */
        Serializable.registerClassPrototype('Board', Board.prototype);
        ComponentRegistry.registerComponent('HTML', HTMLComponent);
        /* *
         *
         *  Default Export
         *
         * */

        return Board;
    });
    _registerModule(_modules, 'Dashboards/PluginHandler.js', [_modules['Dashboards/Board.js'], _modules['Dashboards/Components/Sync/Sync.js'], _modules['Dashboards/Components/ComponentRegistry.js']], function (Board, Sync, ComponentRegistry) {
        /* *
         *
         *  (c) 2009 - 2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *
         * */
        /* *
         *
         *  Namespace
         *
         * */
        var PluginHandler;
        (function (PluginHandler) {
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
            /** @internal */
            PluginHandler.registry = {};
            /**
             * Revision of the Dashboard plugin API.
             *
             * @internal
             */
            PluginHandler.revision = 0;
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Adds a dashboard plugin.
             *
             * @param {Dashboards.Plugin} plugin
             * Dashboard plugin to register.
             *
             * @param {string} [key]
             * Plugin key for the registry. (Default: `plugin.name`)
             */
            function addPlugin(plugin, key = plugin.name) {
                const { maxRevision, minRevision, onRegister } = plugin;
                if (PluginHandler.registry[key]) {
                    // only throw error with custom key
                    if (key !== plugin.name) {
                        throw new Error(`Plugin '${key}' already registered.`);
                    }
                    return;
                }
                if ((typeof minRevision === 'number' && minRevision > PluginHandler.revision) ||
                    (typeof maxRevision === 'number' && maxRevision < PluginHandler.revision)) {
                    throw new Error(`Plugin '${key}' does not support revision ${PluginHandler.revision}.`);
                }
                onRegister({
                    Board,
                    ComponentRegistry,
                    Sync,
                    revision: PluginHandler.revision
                });
                PluginHandler.registry[key] = plugin;
            }
            PluginHandler.addPlugin = addPlugin;
            /**
             * Removes a dashboard plugin.
             *
             * @param {string} key
             * Plugin key in the registry.
             */
            function removePlugin(key) {
                if (PluginHandler.registry[key]) {
                    PluginHandler.registry[key].onUnregister({
                        ComponentRegistry: ComponentRegistry,
                        Board,
                        Sync,
                        revision: PluginHandler.revision
                    });
                    delete PluginHandler.registry[key];
                }
            }
            PluginHandler.removePlugin = removePlugin;
        })(PluginHandler || (PluginHandler = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return PluginHandler;
    });
    _registerModule(_modules, 'Data/Converters/DataConverter.js', [_modules['Data/DataTable.js'], _modules['Core/Utilities.js']], function (DataTable, U) {
        /* *
         *
         *  (c) 2009-2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *  - Sebastian Bochan
         *  - Gøran Slettemark
         *  - Torstein Hønsi
         *  - Wojciech Chmiel
         *
         * */
        const { addEvent, fireEvent, isNumber, merge } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Base class providing an interface and basic methods for a DataConverter
         *
         * @private
         */
        class DataConverter {
            /* *
             *
             *  Constructor
             *
             * */
            /**
             * Constructs an instance of the DataConverter.
             *
             * @param {DataConverter.UserOptions} [options]
             * Options for the DataConverter.
             */
            constructor(options) {
                /* *
                 *
                 *  Properties
                 *
                 * */
                /**
                 * A collection of available date formats.
                 */
                this.dateFormats = {
                    'YYYY/mm/dd': {
                        regex: /^([0-9]{4})([\-\.\/])([0-9]{1,2})\2([0-9]{1,2})$/,
                        parser: function (match) {
                            return (match ?
                                Date.UTC(+match[1], match[3] - 1, +match[4]) :
                                NaN);
                        }
                    },
                    'dd/mm/YYYY': {
                        regex: /^([0-9]{1,2})([\-\.\/])([0-9]{1,2})\2([0-9]{4})$/,
                        parser: function (match) {
                            return (match ?
                                Date.UTC(+match[4], match[3] - 1, +match[1]) :
                                NaN);
                        },
                        alternative: 'mm/dd/YYYY' // different format with the same regex
                    },
                    'mm/dd/YYYY': {
                        regex: /^([0-9]{1,2})([\-\.\/])([0-9]{1,2})\2([0-9]{4})$/,
                        parser: function (match) {
                            return (match ?
                                Date.UTC(+match[4], match[1] - 1, +match[3]) :
                                NaN);
                        }
                    },
                    'dd/mm/YY': {
                        regex: /^([0-9]{1,2})([\-\.\/])([0-9]{1,2})\2([0-9]{2})$/,
                        parser: function (match) {
                            const d = new Date();
                            if (!match) {
                                return NaN;
                            }
                            let year = +match[4];
                            if (year > (d.getFullYear() - 2000)) {
                                year += 1900;
                            }
                            else {
                                year += 2000;
                            }
                            return Date.UTC(year, match[3] - 1, +match[1]);
                        },
                        alternative: 'mm/dd/YY' // different format with the same regex
                    },
                    'mm/dd/YY': {
                        regex: /^([0-9]{1,2})([\-\.\/])([0-9]{1,2})\2([0-9]{2})$/,
                        parser: function (match) {
                            return (match ?
                                Date.UTC(+match[4] + 2000, match[1] - 1, +match[3]) :
                                NaN);
                        }
                    }
                };
                const mergedOptions = merge(DataConverter.defaultOptions, options);
                let regExpPoint = mergedOptions.decimalPoint;
                if (regExpPoint === '.' || regExpPoint === ',') {
                    regExpPoint = regExpPoint === '.' ? '\\.' : ',';
                    this.decimalRegExp =
                        new RegExp('^(-?[0-9]+)' + regExpPoint + '([0-9]+)$');
                }
                this.options = mergedOptions;
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Converts a value to a boolean.
             *
             * @param {DataConverter.Type} value
             * Value to convert.
             *
             * @return {boolean}
             * Converted value as a boolean.
             */
            asBoolean(value) {
                if (typeof value === 'boolean') {
                    return value;
                }
                if (typeof value === 'string') {
                    return value !== '' && value !== '0' && value !== 'false';
                }
                return !!this.asNumber(value);
            }
            /**
             * Converts a value to a Date.
             *
             * @param {DataConverter.Type} value
             * Value to convert.
             *
             * @return {globalThis.Date}
             * Converted value as a Date.
             */
            asDate(value) {
                let timestamp;
                if (typeof value === 'string') {
                    timestamp = this.parseDate(value);
                }
                else if (typeof value === 'number') {
                    timestamp = value;
                }
                else if (value instanceof Date) {
                    return value;
                }
                else {
                    timestamp = this.parseDate(this.asString(value));
                }
                return new Date(timestamp);
            }
            /**
             * Casts a string value to it's guessed type
             *
             * @param {*} value
             * The value to examine.
             *
             * @return {number|string|Date}
             * The converted value.
             */
            asGuessedType(value) {
                const converter = this, typeMap = {
                    'number': converter.asNumber,
                    'Date': converter.asDate,
                    'string': converter.asString
                };
                return typeMap[converter.guessType(value)].call(converter, value);
            }
            /**
             * Converts a value to a number.
             *
             * @param {DataConverter.Type} value
             * Value to convert.
             *
             * @return {number}
             * Converted value as a number.
             */
            asNumber(value) {
                if (typeof value === 'number') {
                    return value;
                }
                if (typeof value === 'boolean') {
                    return value ? 1 : 0;
                }
                if (typeof value === 'string') {
                    const decimalRegex = this.decimalRegExp;
                    if (value.indexOf(' ') > -1) {
                        value = value.replace(/\s+/g, '');
                    }
                    if (decimalRegex) {
                        if (!decimalRegex.test(value)) {
                            return NaN;
                        }
                        value = value.replace(decimalRegex, '$1.$2');
                    }
                    return parseFloat(value);
                }
                if (value instanceof Date) {
                    return value.getDate();
                }
                if (value) {
                    return value.getRowCount();
                }
                return NaN;
            }
            /**
             * Converts a value to a string.
             *
             * @param {DataConverter.Type} value
             * Value to convert.
             *
             * @return {string}
             * Converted value as a string.
             */
            asString(value) {
                return '' + value;
            }
            /**
             * Tries to guess the date format
             *  - Check if either month candidate exceeds 12
             *  - Check if year is missing (use current year)
             *  - Check if a shortened year format is used (e.g. 1/1/99)
             *  - If no guess can be made, the user must be prompted
             * data is the data to deduce a format based on
             * @private
             *
             * @param {Array<string>} data
             * Data to check the format.
             *
             * @param {number} limit
             * Max data to check the format.
             *
             * @param {boolean} save
             * Whether to save the date format in the converter options.
             */
            deduceDateFormat(data, limit, save) {
                const parser = this, stable = [], max = [];
                let format = 'YYYY/mm/dd', thing, guessedFormat = [], i = 0, madeDeduction = false, 
                // candidates = {},
                elem, j;
                if (!limit || limit > data.length) {
                    limit = data.length;
                }
                for (; i < limit; i++) {
                    if (typeof data[i] !== 'undefined' &&
                        data[i] && data[i].length) {
                        thing = data[i]
                            .trim()
                            .replace(/[-\.\/]/g, ' ')
                            .split(' ');
                        guessedFormat = [
                            '',
                            '',
                            ''
                        ];
                        for (j = 0; j < thing.length; j++) {
                            if (j < guessedFormat.length) {
                                elem = parseInt(thing[j], 10);
                                if (elem) {
                                    max[j] = (!max[j] || max[j] < elem) ? elem : max[j];
                                    if (typeof stable[j] !== 'undefined') {
                                        if (stable[j] !== elem) {
                                            stable[j] = false;
                                        }
                                    }
                                    else {
                                        stable[j] = elem;
                                    }
                                    if (elem > 31) {
                                        if (elem < 100) {
                                            guessedFormat[j] = 'YY';
                                        }
                                        else {
                                            guessedFormat[j] = 'YYYY';
                                        }
                                        // madeDeduction = true;
                                    }
                                    else if (elem > 12 &&
                                        elem <= 31) {
                                        guessedFormat[j] = 'dd';
                                        madeDeduction = true;
                                    }
                                    else if (!guessedFormat[j].length) {
                                        guessedFormat[j] = 'mm';
                                    }
                                }
                            }
                        }
                    }
                }
                if (madeDeduction) {
                    // This handles a few edge cases with hard to guess dates
                    for (j = 0; j < stable.length; j++) {
                        if (stable[j] !== false) {
                            if (max[j] > 12 &&
                                guessedFormat[j] !== 'YY' &&
                                guessedFormat[j] !== 'YYYY') {
                                guessedFormat[j] = 'YY';
                            }
                        }
                        else if (max[j] > 12 && guessedFormat[j] === 'mm') {
                            guessedFormat[j] = 'dd';
                        }
                    }
                    // If the middle one is dd, and the last one is dd,
                    // the last should likely be year.
                    if (guessedFormat.length === 3 &&
                        guessedFormat[1] === 'dd' &&
                        guessedFormat[2] === 'dd') {
                        guessedFormat[2] = 'YY';
                    }
                    format = guessedFormat.join('/');
                    // If the caculated format is not valid, we need to present an
                    // error.
                }
                // Save the deduced format in the converter options.
                if (save) {
                    parser.options.dateFormat = format;
                }
                return format;
            }
            /**
             * Emits an event on the DataConverter instance.
             *
             * @param {DataConverter.Event} [e]
             * Event object containing additional event data
             */
            emit(e) {
                fireEvent(this, e.type, e);
            }
            /**
             * Initiates the data exporting. Should emit `exportError` on failure.
             *
             * @param {DataConnector} connector
             * Connector to export from.
             *
             * @param {DataConverter.Options} [options]
             * Options for the export.
             */
            export(connector, options) {
                this.emit({
                    type: 'exportError',
                    columns: [],
                    headers: []
                });
                throw new Error('Not implemented');
            }
            /**
             * Getter for the data table.
             *
             * @return {DataTable}
             * Table of parsed data.
             */
            getTable() {
                throw new Error('Not implemented');
            }
            /**
             * Guesses the potential type of a string value for parsing CSV etc.
             *
             * @param {*} value
             * The value to examine.
             *
             * @return {'number'|'string'|'Date'}
             * Type string, either `string`, `Date`, or `number`.
             */
            guessType(value) {
                const converter = this;
                let result = 'string';
                if (typeof value === 'string') {
                    const trimedValue = converter.trim(`${value}`), decimalRegExp = converter.decimalRegExp;
                    let innerTrimedValue = converter.trim(trimedValue, true);
                    if (decimalRegExp) {
                        innerTrimedValue = (decimalRegExp.test(innerTrimedValue) ?
                            innerTrimedValue.replace(decimalRegExp, '$1.$2') :
                            '');
                    }
                    const floatValue = parseFloat(innerTrimedValue);
                    if (+innerTrimedValue === floatValue) {
                        // string is numeric
                        value = floatValue;
                    }
                    else {
                        // determine if a date string
                        const dateValue = converter.parseDate(value);
                        result = isNumber(dateValue) ? 'Date' : 'string';
                    }
                }
                if (typeof value === 'number') {
                    // greater than milliseconds in a year assumed timestamp
                    result = value > 365 * 24 * 3600 * 1000 ? 'Date' : 'number';
                }
                return result;
            }
            /**
             * Registers a callback for a specific event.
             *
             * @param {string} type
             * Event type as a string.
             *
             * @param {DataEventEmitter.Callback} callback
             * Function to register for an modifier callback.
             *
             * @return {Function}
             * Function to unregister callback from the modifier event.
             */
            on(type, callback) {
                return addEvent(this, type, callback);
            }
            /**
             * Initiates the data parsing. Should emit `parseError` on failure.
             *
             * @param {DataConverter.UserOptions} options
             * Options of the DataConverter.
             */
            parse(options) {
                this.emit({
                    type: 'parseError',
                    columns: [],
                    headers: []
                });
                throw new Error('Not implemented');
            }
            /**
             * Parse a date and return it as a number.
             *
             * @function Highcharts.Data#parseDate
             *
             * @param {string} value
             * Value to parse.
             *
             * @param {string} dateFormatProp
             * Which of the predefined date formats
             * to use to parse date values.
             */
            parseDate(value, dateFormatProp) {
                const converter = this, options = converter.options;
                let dateFormat = dateFormatProp || options.dateFormat, result = NaN, key, format, match;
                if (options.parseDate) {
                    result = options.parseDate(value);
                }
                else {
                    // Auto-detect the date format the first time
                    if (!dateFormat) {
                        for (key in converter.dateFormats) { // eslint-disable-line guard-for-in
                            format = converter.dateFormats[key];
                            match = value.match(format.regex);
                            if (match) {
                                // converter.options.dateFormat = dateFormat = key;
                                dateFormat = key;
                                // converter.options.alternativeFormat =
                                // format.alternative || '';
                                result = format.parser(match);
                                break;
                            }
                        }
                        // Next time, use the one previously found
                    }
                    else {
                        format = converter.dateFormats[dateFormat];
                        if (!format) {
                            // The selected format is invalid
                            format = converter.dateFormats['YYYY/mm/dd'];
                        }
                        match = value.match(format.regex);
                        if (match) {
                            result = format.parser(match);
                        }
                    }
                    // Fall back to Date.parse
                    if (!match) {
                        match = Date.parse(value);
                        // External tools like Date.js and MooTools extend Date object
                        // and returns a date.
                        if (typeof match === 'object' &&
                            match !== null &&
                            match.getTime) {
                            result = (match.getTime() -
                                match.getTimezoneOffset() *
                                    60000);
                            // Timestamp
                        }
                        else if (isNumber(match)) {
                            result = match - (new Date(match)).getTimezoneOffset() * 60000;
                            if ( // reset dates without year in Chrome
                            value.indexOf('2001') === -1 &&
                                (new Date(result)).getFullYear() === 2001) {
                                result = NaN;
                            }
                        }
                    }
                }
                return result;
            }
            /**
             * Trim a string from whitespaces.
             *
             * @param {string} str
             * String to trim.
             *
             * @param {boolean} [inside=false]
             * Remove all spaces between numbers.
             *
             * @return {string}
             * Trimed string
             */
            trim(str, inside) {
                if (typeof str === 'string') {
                    str = str.replace(/^\s+|\s+$/g, '');
                    // Clear white space insdie the string, like thousands separators
                    if (inside && /^[0-9\s]+$/.test(str)) {
                        str = str.replace(/\s/g, '');
                    }
                }
                return str;
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        /**
         * Default options
         */
        DataConverter.defaultOptions = {
            dateFormat: '',
            alternativeFormat: '',
            startColumn: 0,
            endColumn: Number.MAX_VALUE,
            startRow: 0,
            endRow: Number.MAX_VALUE,
            firstRowAsNames: true,
            switchRowsAndColumns: false
        };
        /* *
         *
         *  Class Namespace
         *
         * */
        /**
         * Additionally provided types for events and conversion.
         */
        (function (DataConverter) {
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
             * Converts an array of columns to a table instance. Second dimension of the
             * array are the row cells.
             *
             * @param {Array<DataTable.Column>} [columns]
             * Array to convert.
             *
             * @param {Array<string>} [headers]
             * Column names to use.
             *
             * @return {DataTable}
             * Table instance from the arrays.
             */
            function getTableFromColumns(columns = [], headers = []) {
                const table = new DataTable();
                for (let i = 0, iEnd = Math.max(headers.length, columns.length); i < iEnd; ++i) {
                    table.setColumn(headers[i] || `${i}`, columns[i]);
                }
                return table;
            }
            DataConverter.getTableFromColumns = getTableFromColumns;
        })(DataConverter || (DataConverter = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return DataConverter;
    });
    _registerModule(_modules, 'Data/Converters/CSVConverter.js', [_modules['Data/Converters/DataConverter.js'], _modules['Core/Utilities.js']], function (DataConverter, U) {
        /* *
         *
         *  (c) 2009-2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Torstein Hønsi
         *  - Christer Vasseng
         *  - Gøran Slettemark
         *  - Sophie Bremer
         *
         * */
        const { merge } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Handles parsing and transforming CSV to a table.
         *
         * @private
         */
        class CSVConverter extends DataConverter {
            /* *
             *
             *  Constructor
             *
             * */
            /**
             * Constructs an instance of the CSV parser.
             *
             * @param {CSVConverter.UserOptions} [options]
             * Options for the CSV parser.
             */
            constructor(options) {
                const mergedOptions = merge(CSVConverter.defaultOptions, options);
                super(mergedOptions);
                /* *
                 *
                 *  Properties
                 *
                 * */
                this.columns = [];
                this.headers = [];
                this.dataTypes = [];
                this.options = mergedOptions;
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Creates a CSV string from the datatable on the connector instance.
             *
             * @param {DataConnector} connector
             * Connector instance to export from.
             *
             * @param {CSVConverter.Options} [options]
             * Options used for the export.
             *
             * @return {string}
             * CSV string from the connector table.
             */
            export(connector, options = this.options) {
                const { useLocalDecimalPoint, lineDelimiter } = options, exportNames = (this.options.firstRowAsNames !== false);
                let { decimalPoint, itemDelimiter } = options;
                if (!decimalPoint) {
                    decimalPoint = (itemDelimiter !== ',' && useLocalDecimalPoint ?
                        (1.1).toLocaleString()[1] :
                        '.');
                }
                if (!itemDelimiter) {
                    itemDelimiter = (decimalPoint === ',' ? ';' : ',');
                }
                const columns = connector.getSortedColumns(options.usePresentationOrder), columnNames = Object.keys(columns), csvRows = [], columnsCount = columnNames.length;
                const rowArray = [];
                // Add the names as the first row if they should be exported
                if (exportNames) {
                    csvRows.push(columnNames.map((columnName) => `"${columnName}"`).join(itemDelimiter));
                }
                for (let columnIndex = 0; columnIndex < columnsCount; columnIndex++) {
                    const columnName = columnNames[columnIndex], column = columns[columnName], columnLength = column.length;
                    const columnMeta = connector.whatIs(columnName);
                    let columnDataType;
                    if (columnMeta) {
                        columnDataType = columnMeta.dataType;
                    }
                    for (let rowIndex = 0; rowIndex < columnLength; rowIndex++) {
                        let cellValue = column[rowIndex];
                        if (!rowArray[rowIndex]) {
                            rowArray[rowIndex] = [];
                        }
                        // Prefer datatype from metadata
                        if (columnDataType === 'string') {
                            cellValue = '"' + cellValue + '"';
                        }
                        else if (typeof cellValue === 'number') {
                            cellValue = String(cellValue).replace('.', decimalPoint);
                        }
                        else if (typeof cellValue === 'string') {
                            cellValue = `"${cellValue}"`;
                        }
                        rowArray[rowIndex][columnIndex] = cellValue;
                        // On the final column, push the row to the CSV
                        if (columnIndex === columnsCount - 1) {
                            // Trim repeated undefined values starting at the end
                            // Currently, we export the first "comma" even if the
                            // second value is undefined
                            let i = columnIndex;
                            while (rowArray[rowIndex].length > 2) {
                                const cellVal = rowArray[rowIndex][i];
                                if (cellVal !== void 0) {
                                    break;
                                }
                                rowArray[rowIndex].pop();
                                i--;
                            }
                            csvRows.push(rowArray[rowIndex].join(itemDelimiter));
                        }
                    }
                }
                return csvRows.join(lineDelimiter);
            }
            /**
             * Initiates parsing of CSV
             *
             * @param {CSVConverter.UserOptions}[options]
             * Options for the parser
             *
             * @param {DataEvent.Detail} [eventDetail]
             * Custom information for pending events.
             *
             * @emits CSVDataParser#parse
             * @emits CSVDataParser#afterParse
             */
            parse(options, eventDetail) {
                const converter = this, dataTypes = converter.dataTypes, parserOptions = merge(this.options, options), { beforeParse, lineDelimiter, firstRowAsNames, itemDelimiter } = parserOptions;
                let lines, rowIt = 0, { csv, startRow, endRow } = parserOptions, column;
                converter.columns = [];
                converter.emit({
                    type: 'parse',
                    columns: converter.columns,
                    detail: eventDetail,
                    headers: converter.headers
                });
                if (csv && beforeParse) {
                    csv = beforeParse(csv);
                }
                if (csv) {
                    lines = csv
                        .replace(/\r\n|\r/g, '\n') // Windows | Mac
                        .split(lineDelimiter || '\n');
                    if (!startRow || startRow < 0) {
                        startRow = 0;
                    }
                    if (!endRow || endRow >= lines.length) {
                        endRow = lines.length - 1;
                    }
                    if (!itemDelimiter) {
                        converter.guessedItemDelimiter =
                            converter.guessDelimiter(lines);
                    }
                    // If the first row contain names, add them to the
                    // headers array and skip the row.
                    if (firstRowAsNames) {
                        const headers = lines[0].split(itemDelimiter || converter.guessedItemDelimiter || ',');
                        // Remove ""s from the headers
                        for (let i = 0; i < headers.length; i++) {
                            headers[i] = headers[i].trim().replace(/^["']|["']$/g, '');
                        }
                        converter.headers = headers;
                        startRow++;
                    }
                    let offset = 0;
                    for (rowIt = startRow; rowIt <= endRow; rowIt++) {
                        if (lines[rowIt][0] === '#') {
                            offset++;
                        }
                        else {
                            converter
                                .parseCSVRow(lines[rowIt], rowIt - startRow - offset);
                        }
                    }
                    if (dataTypes.length &&
                        dataTypes[0].length &&
                        dataTypes[0][1] === 'date' && // format is a string date
                        !converter.options.dateFormat) {
                        converter.deduceDateFormat(converter.columns[0], null, true);
                    }
                    // Guess types.
                    for (let i = 0, iEnd = converter.columns.length; i < iEnd; ++i) {
                        column = converter.columns[i];
                        for (let j = 0, jEnd = column.length; j < jEnd; ++j) {
                            if (column[j] && typeof column[j] === 'string') {
                                let cellValue = converter.asGuessedType(column[j]);
                                if (cellValue instanceof Date) {
                                    cellValue = cellValue.getTime();
                                }
                                converter.columns[i][j] = cellValue;
                            }
                        }
                    }
                }
                converter.emit({
                    type: 'afterParse',
                    columns: converter.columns,
                    detail: eventDetail,
                    headers: converter.headers
                });
            }
            /**
             * Internal method that parses a single CSV row
             */
            parseCSVRow(columnStr, rowNumber) {
                const converter = this, columns = converter.columns || [], dataTypes = converter.dataTypes, { startColumn, endColumn } = converter.options, itemDelimiter = (converter.options.itemDelimiter ||
                    converter.guessedItemDelimiter);
                let { decimalPoint } = converter.options;
                if (!decimalPoint || decimalPoint === itemDelimiter) {
                    decimalPoint = converter.guessedDecimalPoint || '.';
                }
                let i = 0, c = '', cl = '', cn = '', token = '', actualColumn = 0, column = 0;
                const read = (j) => {
                    c = columnStr[j];
                    cl = columnStr[j - 1];
                    cn = columnStr[j + 1];
                };
                const pushType = (type) => {
                    if (dataTypes.length < column + 1) {
                        dataTypes.push([type]);
                    }
                    if (dataTypes[column][dataTypes[column].length - 1] !== type) {
                        dataTypes[column].push(type);
                    }
                };
                const push = () => {
                    if (startColumn > actualColumn || actualColumn > endColumn) {
                        // Skip this column, but increment the column count (#7272)
                        ++actualColumn;
                        token = '';
                        return;
                    }
                    // Save the type of the token.
                    if (typeof token === 'string') {
                        if (!isNaN(parseFloat(token)) && isFinite(token)) {
                            token = parseFloat(token);
                            pushType('number');
                        }
                        else if (!isNaN(Date.parse(token))) {
                            token = token.replace(/\//g, '-');
                            pushType('date');
                        }
                        else {
                            pushType('string');
                        }
                    }
                    else {
                        pushType('number');
                    }
                    if (columns.length < column + 1) {
                        columns.push([]);
                    }
                    // Try to apply the decimal point, and check if the token then is a
                    // number. If not, reapply the initial value
                    if (typeof token !== 'number' &&
                        converter.guessType(token) !== 'number' &&
                        decimalPoint) {
                        const initialValue = token;
                        token = token.replace(decimalPoint, '.');
                        if (converter.guessType(token) !== 'number') {
                            token = initialValue;
                        }
                    }
                    columns[column][rowNumber] = token;
                    token = '';
                    ++column;
                    ++actualColumn;
                };
                if (!columnStr.trim().length) {
                    return;
                }
                if (columnStr.trim()[0] === '#') {
                    return;
                }
                for (; i < columnStr.length; i++) {
                    read(i);
                    if (c === '#') {
                        // If there are hexvalues remaining (#13283)
                        if (!/^#[0-F]{3,3}|[0-F]{6,6}/i.test(columnStr.substring(i))) {
                            // The rest of the row is a comment
                            push();
                            return;
                        }
                    }
                    // Quoted string
                    if (c === '"') {
                        read(++i);
                        while (i < columnStr.length) {
                            if (c === '"') {
                                break;
                            }
                            token += c;
                            read(++i);
                        }
                    }
                    else if (c === itemDelimiter) {
                        push();
                        // Actual column data
                    }
                    else {
                        token += c;
                    }
                }
                push();
            }
            /**
             * Internal method that guesses the delimiter from the first
             * 13 lines of the CSV
             * @param {Array<string>} lines
             * The CSV, split into lines
             */
            guessDelimiter(lines) {
                let points = 0, commas = 0, guessed;
                const potDelimiters = {
                    ',': 0,
                    ';': 0,
                    '\t': 0
                }, linesCount = lines.length;
                for (let i = 0; i < linesCount; i++) {
                    let inStr = false, c, cn, cl, token = '';
                    // We should be able to detect dateformats within 13 rows
                    if (i > 13) {
                        break;
                    }
                    const columnStr = lines[i];
                    for (let j = 0; j < columnStr.length; j++) {
                        c = columnStr[j];
                        cn = columnStr[j + 1];
                        cl = columnStr[j - 1];
                        if (c === '#') {
                            // Skip the rest of the line - it's a comment
                            break;
                        }
                        if (c === '"') {
                            if (inStr) {
                                if (cl !== '"' && cn !== '"') {
                                    while (cn === ' ' && j < columnStr.length) {
                                        cn = columnStr[++j];
                                    }
                                    // After parsing a string, the next non-blank
                                    // should be a delimiter if the CSV is properly
                                    // formed.
                                    if (typeof potDelimiters[cn] !== 'undefined') {
                                        potDelimiters[cn]++;
                                    }
                                    inStr = false;
                                }
                            }
                            else {
                                inStr = true;
                            }
                        }
                        else if (typeof potDelimiters[c] !== 'undefined') {
                            token = token.trim();
                            if (!isNaN(Date.parse(token))) {
                                potDelimiters[c]++;
                            }
                            else if (isNaN(Number(token)) ||
                                !isFinite(Number(token))) {
                                potDelimiters[c]++;
                            }
                            token = '';
                        }
                        else {
                            token += c;
                        }
                        if (c === ',') {
                            commas++;
                        }
                        if (c === '.') {
                            points++;
                        }
                    }
                }
                // Count the potential delimiters.
                // This could be improved by checking if the number of delimiters
                // equals the number of columns - 1
                if (potDelimiters[';'] > potDelimiters[',']) {
                    guessed = ';';
                }
                else if (potDelimiters[','] > potDelimiters[';']) {
                    guessed = ',';
                }
                else {
                    // No good guess could be made..
                    guessed = ',';
                }
                // Try to deduce the decimal point if it's not explicitly set.
                // If both commas or points is > 0 there is likely an issue
                if (points > commas) {
                    this.guessedDecimalPoint = '.';
                }
                else {
                    this.guessedDecimalPoint = ',';
                }
                return guessed;
            }
            /**
             * Handles converting the parsed data to a table.
             *
             * @return {DataTable}
             * Table from the parsed CSV.
             */
            getTable() {
                return DataConverter.getTableFromColumns(this.columns, this.headers);
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        /**
         * Default options
         */
        CSVConverter.defaultOptions = {
            ...DataConverter.defaultOptions,
            lineDelimiter: '\n'
        };
        /* *
         *
         *  Default Export
         *
         * */

        return CSVConverter;
    });
    _registerModule(_modules, 'Data/Connectors/CSVConnector.js', [_modules['Data/Converters/CSVConverter.js'], _modules['Data/Connectors/DataConnector.js'], _modules['Core/Utilities.js']], function (CSVConverter, DataConnector, U) {
        /* *
         *
         *  (c) 2009-2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Torstein Hønsi
         *  - Christer Vasseng
         *  - Gøran Slettemark
         *  - Sophie Bremer
         *
         * */
        const { merge } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Class that handles creating a DataConnector from CSV
         *
         * @private
         */
        class CSVConnector extends DataConnector {
            /* *
             *
             *  Constructor
             *
             * */
            /**
             * Constructs an instance of CSVConnector.
             *
             * @param {CSVConnector.UserOptions} [options]
             * Options for the connector and converter.
             */
            constructor(options) {
                const mergedOptions = merge(CSVConnector.defaultOptions, options);
                super(mergedOptions);
                this.converter = new CSVConverter(mergedOptions);
                this.options = mergedOptions;
                if (mergedOptions.enablePolling) {
                    this.startPolling(Math.max(mergedOptions.dataRefreshRate || 0, 1) * 1000);
                }
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Initiates the loading of the CSV source to the connector
             *
             * @param {DataEvent.Detail} [eventDetail]
             * Custom information for pending events.
             *
             * @emits CSVConnector#load
             * @emits CSVConnector#afterLoad
             */
            load(eventDetail) {
                const connector = this, converter = connector.converter, table = connector.table, { csv, csvURL, dataModifier } = connector.options;
                connector.emit({
                    type: 'load',
                    csv,
                    detail: eventDetail,
                    table
                });
                // If already loaded, clear the current rows
                table.deleteRows();
                return Promise
                    .resolve(csvURL ?
                    fetch(csvURL).then((response) => response.text()) :
                    csv || '')
                    .then((csv) => {
                    if (csv) {
                        converter.parse({ csv });
                        table.setColumns(converter.getTable().getColumns());
                    }
                    return connector
                        .setModifierOptions(dataModifier)
                        .then(() => csv);
                })
                    .then((csv) => {
                    connector.emit({
                        type: 'afterLoad',
                        csv,
                        detail: eventDetail,
                        table
                    });
                    return connector;
                })['catch']((error) => {
                    connector.emit({
                        type: 'loadError',
                        detail: eventDetail,
                        error,
                        table
                    });
                    throw error;
                });
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        CSVConnector.defaultOptions = {
            csv: '',
            csvURL: '',
            enablePolling: false,
            dataRefreshRate: 1,
            firstRowAsNames: true
        };
        DataConnector.registerType('CSV', CSVConnector);
        /* *
         *
         *  Default Export
         *
         * */

        return CSVConnector;
    });
    _registerModule(_modules, 'Data/Converters/GoogleSheetsConverter.js', [_modules['Data/Converters/DataConverter.js'], _modules['Core/Utilities.js']], function (DataConverter, U) {
        /* *
         *
         *  (c) 2009-2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Torstein Hønsi
         *  - Gøran Slettemark
         *  - Wojciech Chmiel
         *  - Sophie Bremer
         *
         * */
        const { merge, uniqueKey } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Handles parsing and transformation of an Google Sheets to a table.
         *
         * @private
         */
        class GoogleSheetsConverter extends DataConverter {
            /* *
             *
             *  Constructor
             *
             * */
            /**
             * Constructs an instance of the GoogleSheetsConverter.
             *
             * @param {GoogleSheetsConverter.UserOptions} [options]
             * Options for the GoogleSheetsConverter.
             */
            constructor(options) {
                const mergedOptions = merge(GoogleSheetsConverter.defaultOptions, options);
                super(mergedOptions);
                this.columns = [];
                this.header = [];
                this.options = mergedOptions;
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Initiates the parsing of the Google Sheet
             *
             * @param {GoogleSheetsConverter.UserOptions}[options]
             * Options for the parser
             *
             * @param {DataEvent.Detail} [eventDetail]
             * Custom information for pending events.
             *
             * @emits GoogleSheetsParser#parse
             * @emits GoogleSheetsParser#afterParse
             */
            parse(options, eventDetail) {
                const converter = this, parseOptions = merge(converter.options, options), columns = ((parseOptions.json &&
                    parseOptions.json.values) || []).map((column) => column.slice());
                if (columns.length === 0) {
                    return false;
                }
                converter.header = [];
                converter.columns = [];
                converter.emit({
                    type: 'parse',
                    columns: converter.columns,
                    detail: eventDetail,
                    headers: converter.header
                });
                converter.columns = columns;
                let column;
                for (let i = 0, iEnd = columns.length; i < iEnd; i++) {
                    column = columns[i];
                    converter.header[i] = (parseOptions.firstRowAsNames ?
                        `${column.shift()}` :
                        uniqueKey());
                    for (let j = 0, jEnd = column.length; j < jEnd; ++j) {
                        if (column[j] && typeof column[j] === 'string') {
                            let cellValue = converter.asGuessedType(column[j]);
                            if (cellValue instanceof Date) {
                                cellValue = cellValue.getTime();
                            }
                            converter.columns[i][j] = cellValue;
                        }
                    }
                }
                converter.emit({
                    type: 'afterParse',
                    columns: converter.columns,
                    detail: eventDetail,
                    headers: converter.header
                });
            }
            /**
             * Handles converting the parsed data to a table.
             *
             * @return {DataTable}
             * Table from the parsed Google Sheet
             */
            getTable() {
                return DataConverter.getTableFromColumns(this.columns, this.header);
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        /**
         * Default options
         */
        GoogleSheetsConverter.defaultOptions = {
            ...DataConverter.defaultOptions
        };
        /* *
         *
         *  Default Export
         *
         * */

        return GoogleSheetsConverter;
    });
    _registerModule(_modules, 'Data/Connectors/GoogleSheetsConnector.js', [_modules['Data/Connectors/DataConnector.js'], _modules['Data/Converters/GoogleSheetsConverter.js'], _modules['Core/Utilities.js']], function (DataConnector, GoogleSheetsConverter, U) {
        /* *
         *
         *  (c) 2009-2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Torstein Hønsi
         *  - Gøran Slettemark
         *  - Wojciech Chmiel
         *  - Sophie Bremer
         *
         * */
        const { merge, pick } = U;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Tests Google's response for error.
         * @private
         */
        function isGoogleError(json) {
            return (typeof json === 'object' && json &&
                typeof json.error === 'object' && json.error &&
                typeof json.error.code === 'number' &&
                typeof json.error.message === 'string' &&
                typeof json.error.status === 'string');
        }
        /* *
         *
         *  Class
         *
         * */
        /**
         * @private
         * @todo implement save, requires oauth2
         */
        class GoogleSheetsConnector extends DataConnector {
            /* *
             *
             *  Constructor
             *
             * */
            /**
             * Constructs an instance of GoogleSheetsConnector
             *
             * @param {GoogleSheetsConnector.UserOptions} [options]
             * Options for the connector and converter.
             */
            constructor(options) {
                const mergedOptions = merge(GoogleSheetsConnector.defaultOptions, options);
                super(mergedOptions);
                this.converter = new GoogleSheetsConverter(mergedOptions);
                this.options = mergedOptions;
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Loads data from a Google Spreadsheet.
             *
             * @param {DataEvent.Detail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Promise<this>}
             * Same connector instance with modified table.
             */
            load(eventDetail) {
                const connector = this, converter = connector.converter, table = connector.table, { dataModifier, dataRefreshRate, enablePolling, firstRowAsNames, googleAPIKey, googleSpreadsheetKey } = connector.options, url = GoogleSheetsConnector.buildFetchURL(googleAPIKey, googleSpreadsheetKey, connector.options);
                connector.emit({
                    type: 'load',
                    detail: eventDetail,
                    table,
                    url
                });
                // If already loaded, clear the current table
                table.deleteColumns();
                return fetch(url)
                    .then((response) => (response.json()))
                    .then((json) => {
                    if (isGoogleError(json)) {
                        throw new Error(json.error.message);
                    }
                    converter.parse({
                        firstRowAsNames,
                        json
                    });
                    table.setColumns(converter.getTable().getColumns());
                    return connector.setModifierOptions(dataModifier);
                })
                    .then(() => {
                    connector.emit({
                        type: 'afterLoad',
                        detail: eventDetail,
                        table,
                        url
                    });
                    // Polling
                    if (enablePolling) {
                        setTimeout(() => connector.load(), Math.max(dataRefreshRate || 0, 1) * 1000);
                    }
                    return connector;
                })['catch']((error) => {
                    connector.emit({
                        type: 'loadError',
                        detail: eventDetail,
                        error,
                        table
                    });
                    throw error;
                });
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        GoogleSheetsConnector.defaultOptions = {
            googleAPIKey: '',
            googleSpreadsheetKey: '',
            worksheet: 1,
            enablePolling: false,
            dataRefreshRate: 2,
            firstRowAsNames: true
        };
        /* *
         *
         *  Class Namespace
         *
         * */
        (function (GoogleSheetsConnector) {
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
            const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Creates GoogleSheets API v4 URL.
             * @private
             */
            function buildFetchURL(apiKey, sheetKey, options = {}) {
                return (`https://sheets.googleapis.com/v4/spreadsheets/${sheetKey}/values/` +
                    (options.onlyColumnNames ?
                        'A1:Z1' :
                        buildQueryRange(options)) +
                    '?alt=json' +
                    (options.onlyColumnNames ?
                        '' :
                        '&dateTimeRenderOption=FORMATTED_STRING' +
                            '&majorDimension=COLUMNS' +
                            '&valueRenderOption=UNFORMATTED_VALUE') +
                    '&prettyPrint=false' +
                    `&key=${apiKey}`);
            }
            GoogleSheetsConnector.buildFetchURL = buildFetchURL;
            /**
             * Creates sheets range.
             * @private
             */
            function buildQueryRange(options = {}) {
                const { endColumn, endRow, googleSpreadsheetRange, startColumn, startRow } = options;
                return googleSpreadsheetRange || ((alphabet[startColumn || 0] || 'A') +
                    (Math.max((startRow || 0), 0) + 1) +
                    ':' +
                    (alphabet[pick(endColumn, 25)] || 'Z') +
                    (endRow ?
                        Math.max(endRow, 0) :
                        'Z'));
            }
            GoogleSheetsConnector.buildQueryRange = buildQueryRange;
        })(GoogleSheetsConnector || (GoogleSheetsConnector = {}));
        DataConnector.registerType('GoogleSheets', GoogleSheetsConnector);
        /* *
         *
         *  Default Export
         *
         * */

        return GoogleSheetsConnector;
    });
    _registerModule(_modules, 'Data/Converters/HTMLTableConverter.js', [_modules['Data/Converters/DataConverter.js'], _modules['Core/Utilities.js']], function (DataConverter, U) {
        /* *
         *
         *  (c) 2009-2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Torstein Hønsi
         *  - Gøran Slettemark
         *  - Wojciech Chmiel
         *  - Sophie Bremer
         *
         * */
        const { merge } = U;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Row equal
         */
        function isRowEqual(row1, row2) {
            let i = row1.length;
            if (row2.length === i) {
                while (--i) {
                    if (row1[i] !== row2[i]) {
                        return false;
                    }
                }
            }
            else {
                return false;
            }
            return true;
        }
        /* *
         *
         *  Class
         *
         * */
        /**
         * Handles parsing and transformation of an HTML table to a table.
         *
         * @private
         */
        class HTMLTableConverter extends DataConverter {
            /* *
             *
             *  Constructor
             *
             * */
            /**
             * Constructs an instance of the HTMLTableConverter.
             *
             * @param {HTMLTableConverter.UserOptions} [options]
             * Options for the HTMLTableConverter.
             */
            constructor(options) {
                const mergedOptions = merge(HTMLTableConverter.defaultOptions, options);
                super(mergedOptions);
                this.columns = [];
                this.headers = [];
                this.options = mergedOptions;
                if (mergedOptions.tableElement) {
                    this.tableElement = mergedOptions.tableElement;
                    this.tableElementID = mergedOptions.tableElement.id;
                }
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Exports the dataconnector as an HTML string, using the options
             * provided on      *
             * @param {DataConnector} connector
             * Connector instance to export from.
             *
             * @param {HTMLTableConnector.ExportOptions} [options]
             * Options that override default or existing export options.
             *
             * @return {string}
             * HTML from the current dataTable.
             */
            export(connector, options = this.options) {
                const exportNames = (options.firstRowAsNames !== false), useMultiLevelHeaders = options.useMultiLevelHeaders;
                const columns = connector.getSortedColumns(options.usePresentationOrder), columnNames = Object.keys(columns), htmlRows = [], columnsCount = columnNames.length;
                const rowArray = [];
                let tableHead = '';
                // Add the names as the first row if they should be exported
                if (exportNames) {
                    const subcategories = [];
                    // If using multilevel headers, the first value
                    // of each column is a subcategory
                    if (useMultiLevelHeaders) {
                        for (const name of columnNames) {
                            const subhead = (columns[name].shift() || '').toString();
                            subcategories.push(subhead);
                        }
                        tableHead = this.getTableHeaderHTML(columnNames, subcategories, options);
                    }
                    else {
                        tableHead = this.getTableHeaderHTML(void 0, columnNames, options);
                    }
                }
                for (let columnIndex = 0; columnIndex < columnsCount; columnIndex++) {
                    const columnName = columnNames[columnIndex], column = columns[columnName], columnLength = column.length;
                    for (let rowIndex = 0; rowIndex < columnLength; rowIndex++) {
                        let cellValue = column[rowIndex];
                        if (!rowArray[rowIndex]) {
                            rowArray[rowIndex] = [];
                        }
                        // Alternative: Datatype from HTML attribute with
                        // connector.whatIs(columnName)
                        if (!(typeof cellValue === 'string' ||
                            typeof cellValue === 'number' ||
                            typeof cellValue === 'undefined')) {
                            cellValue = (cellValue || '').toString();
                        }
                        rowArray[rowIndex][columnIndex] = this.getCellHTMLFromValue(columnIndex ? 'td' : 'th', null, columnIndex ? '' : 'scope="row"', cellValue);
                        // On the final column, push the row to the array
                        if (columnIndex === columnsCount - 1) {
                            htmlRows.push('<tr>' +
                                rowArray[rowIndex].join('') +
                                '</tr>');
                        }
                    }
                }
                let caption = '';
                // Add table caption
                // Current exportdata falls back to chart title
                // but that should probably be handled elsewhere?
                if (options.tableCaption) {
                    caption = '<caption class="highcharts-table-caption">' +
                        options.tableCaption +
                        '</caption>';
                }
                return ('<table>' +
                    caption +
                    tableHead +
                    '<tbody>' +
                    htmlRows.join('') +
                    '</tbody>' +
                    '</table>');
            }
            /**
             * Get table cell markup from row data.
             */
            getCellHTMLFromValue(tag, classes, attrs, value, decimalPoint) {
                let val = value, className = 'text' + (classes ? ' ' + classes : '');
                // Convert to string if number
                if (typeof val === 'number') {
                    val = val.toString();
                    if (decimalPoint === ',') {
                        val = val.replace('.', decimalPoint);
                    }
                    className = 'number';
                }
                else if (!value) {
                    val = '';
                    className = 'empty';
                }
                return '<' + tag + (attrs ? ' ' + attrs : '') +
                    ' class="' + className + '">' +
                    val + '</' + tag + '>';
            }
            /**
             * Get table header markup from row data.
             */
            getTableHeaderHTML(topheaders = [], subheaders = [], options = this.options) {
                const { useMultiLevelHeaders, useRowspanHeaders } = options, decimalPoint = (options.useLocalDecimalPoint ?
                    (1.1).toLocaleString()[1] :
                    '.');
                let html = '<thead>', i = 0, len = subheaders && subheaders.length, next, cur, curColspan = 0, rowspan;
                // Clean up multiple table headers. Chart.getDataRows() returns two
                // levels of headers when using multilevel, not merged. We need to
                // merge identical headers, remove redundant headers, and keep it
                // all marked up nicely.
                if (useMultiLevelHeaders &&
                    topheaders &&
                    subheaders &&
                    !isRowEqual(topheaders, subheaders)) {
                    html += '<tr>';
                    for (; i < len; ++i) {
                        cur = topheaders[i];
                        next = topheaders[i + 1];
                        if (cur === next) {
                            ++curColspan;
                        }
                        else if (curColspan) {
                            // Ended colspan
                            // Add cur to HTML with colspan.
                            html += this.getCellHTMLFromValue('th', 'highcharts-table-topheading', 'scope="col" ' +
                                'colspan="' + (curColspan + 1) + '"', cur);
                            curColspan = 0;
                        }
                        else {
                            // Cur is standalone. If it is same as sublevel,
                            // remove sublevel and add just toplevel.
                            if (cur === subheaders[i]) {
                                if (useRowspanHeaders) {
                                    rowspan = 2;
                                    delete subheaders[i];
                                }
                                else {
                                    rowspan = 1;
                                    subheaders[i] = '';
                                }
                            }
                            else {
                                rowspan = 1;
                            }
                            html += this.getCellHTMLFromValue('th', 'highcharts-table-topheading', 'scope="col"' +
                                (rowspan > 1 ?
                                    ' valign="top" rowspan="' + rowspan + '"' :
                                    ''), cur);
                        }
                    }
                    html += '</tr>';
                }
                // Add the subheaders (the only headers if not using multilevels)
                if (subheaders) {
                    html += '<tr>';
                    for (i = 0, len = subheaders.length; i < len; ++i) {
                        if (typeof subheaders[i] !== 'undefined') {
                            html += this.getCellHTMLFromValue('th', null, 'scope="col"', subheaders[i]);
                        }
                    }
                    html += '</tr>';
                }
                html += '</thead>';
                return html;
            }
            /**
             * Initiates the parsing of the HTML table
             *
             * @param {HTMLTableConverter.UserOptions}[options]
             * Options for the parser
             *
             * @param {DataEvent.Detail} [eventDetail]
             * Custom information for pending events.
             *
             * @emits CSVDataParser#parse
             * @emits CSVDataParser#afterParse
             * @emits HTMLTableParser#parseError
             */
            parse(options, eventDetail) {
                const converter = this, columns = [], headers = [], parseOptions = merge(converter.options, options), { endRow, startColumn, endColumn, firstRowAsNames } = parseOptions, tableHTML = parseOptions.tableElement || this.tableElement;
                if (!(tableHTML instanceof HTMLElement)) {
                    converter.emit({
                        type: 'parseError',
                        columns,
                        detail: eventDetail,
                        headers,
                        error: 'Not a valid HTML Table'
                    });
                    return;
                }
                converter.tableElement = tableHTML;
                converter.tableElementID = tableHTML.id;
                this.emit({
                    type: 'parse',
                    columns: converter.columns,
                    detail: eventDetail,
                    headers: converter.headers
                });
                const rows = tableHTML.getElementsByTagName('tr'), rowsCount = rows.length;
                let rowIndex = 0, item, { startRow } = parseOptions;
                // Insert headers from the first row
                if (firstRowAsNames && rowsCount) {
                    const items = rows[0].children, itemsLength = items.length;
                    for (let i = startColumn; i < itemsLength; i++) {
                        if (i > endColumn) {
                            break;
                        }
                        item = items[i];
                        if (item.tagName === 'TD' ||
                            item.tagName === 'TH') {
                            headers.push(item.innerHTML);
                        }
                    }
                    startRow++;
                }
                while (rowIndex < rowsCount) {
                    if (rowIndex >= startRow && rowIndex <= endRow) {
                        const columnsInRow = rows[rowIndex].children, columnsInRowLength = columnsInRow.length;
                        let columnIndex = 0;
                        while (columnIndex < columnsInRowLength) {
                            const relativeColumnIndex = columnIndex - startColumn, row = columns[relativeColumnIndex];
                            item = columnsInRow[columnIndex];
                            if ((item.tagName === 'TD' ||
                                item.tagName === 'TH') &&
                                (columnIndex >= startColumn &&
                                    columnIndex <= endColumn)) {
                                if (!columns[relativeColumnIndex]) {
                                    columns[relativeColumnIndex] = [];
                                }
                                let cellValue = converter.asGuessedType(item.innerHTML);
                                if (cellValue instanceof Date) {
                                    cellValue = cellValue.getTime();
                                }
                                columns[relativeColumnIndex][rowIndex - startRow] = cellValue;
                                // Loop over all previous indices and make sure
                                // they are nulls, not undefined.
                                let i = 1;
                                while (rowIndex - startRow >= i &&
                                    row[rowIndex - startRow - i] === void 0) {
                                    row[rowIndex - startRow - i] = null;
                                    i++;
                                }
                            }
                            columnIndex++;
                        }
                    }
                    rowIndex++;
                }
                this.columns = columns;
                this.headers = headers;
                this.emit({
                    type: 'afterParse',
                    columns,
                    detail: eventDetail,
                    headers
                });
            }
            /**
             * Handles converting the parsed data to a table.
             *
             * @return {DataTable}
             * Table from the parsed HTML table
             */
            getTable() {
                return DataConverter.getTableFromColumns(this.columns, this.headers);
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        /**
         * Default options
         */
        HTMLTableConverter.defaultOptions = {
            ...DataConverter.defaultOptions,
            useRowspanHeaders: true,
            useMultiLevelHeaders: true
        };
        /* *
         *
         *  Default Export
         *
         * */

        return HTMLTableConverter;
    });
    _registerModule(_modules, 'Data/Connectors/HTMLTableConnector.js', [_modules['Data/Connectors/DataConnector.js'], _modules['Core/Globals.js'], _modules['Data/Converters/HTMLTableConverter.js'], _modules['Core/Utilities.js']], function (DataConnector, H, HTMLTableConverter, U) {
        /* *
         *
         *  (c) 2009-2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Torstein Hønsi
         *  - Gøran Slettemark
         *  - Wojciech Chmiel
         *  - Sophie Bremer
         *
         * */
        const { win } = H;
        const { merge } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Class that handles creating a data connector from an HTML table.
         *
         * @private
         */
        class HTMLTableConnector extends DataConnector {
            /* *
             *
             *  Constructor
             *
             * */
            /**
             * Constructs an instance of HTMLTableConnector.
             *
             * @param {HTMLTableConnector.UserOptions} [options]
             * Options for the connector and converter.
             */
            constructor(options) {
                const mergedOptions = merge(HTMLTableConnector.defaultOptions, options);
                super(mergedOptions);
                this.converter = new HTMLTableConverter(mergedOptions);
                this.options = mergedOptions;
            }
            /**
             * Initiates creating the dataconnector from the HTML table
             *
             * @param {DataEvent.Detail} [eventDetail]
             * Custom information for pending events.
             *
             * @emits HTMLTableConnector#load
             * @emits HTMLTableConnector#afterLoad
             * @emits HTMLTableConnector#loadError
             */
            load(eventDetail) {
                const connector = this, converter = connector.converter, table = connector.table, { dataModifier, table: tableHTML } = connector.options;
                connector.emit({
                    type: 'load',
                    detail: eventDetail,
                    table,
                    tableElement: connector.tableElement
                });
                // If already loaded, clear the current rows
                table.deleteColumns();
                let tableElement;
                if (typeof tableHTML === 'string') {
                    connector.tableID = tableHTML;
                    tableElement = win.document.getElementById(tableHTML);
                }
                else {
                    tableElement = tableHTML;
                    connector.tableID = tableElement.id;
                }
                connector.tableElement = tableElement || void 0;
                if (!connector.tableElement) {
                    const error = 'HTML table not provided, or element with ID not found';
                    connector.emit({
                        type: 'loadError',
                        detail: eventDetail,
                        error,
                        table
                    });
                    return Promise.reject(new Error(error));
                }
                converter.parse(merge({ tableElement: connector.tableElement }, connector.options), eventDetail);
                table.setColumns(converter.getTable().getColumns());
                return connector
                    .setModifierOptions(dataModifier)
                    .then(() => {
                    connector.emit({
                        type: 'afterLoad',
                        detail: eventDetail,
                        table,
                        tableElement: connector.tableElement
                    });
                    return connector;
                });
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        HTMLTableConnector.defaultOptions = {
            table: ''
        };
        DataConnector.registerType('HTMLTable', HTMLTableConnector);
        /* *
         *
         *  Default Export
         *
         * */

        return HTMLTableConnector;
    });
    _registerModule(_modules, 'Data/Converters/JSONConverter.js', [_modules['Data/Converters/DataConverter.js'], _modules['Data/DataTable.js'], _modules['Core/Utilities.js']], function (DataConverter, DataTable, U) {
        /* *
         *
         *  (c) 2009-2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Pawel Lysy
         *
         * */
        const { merge, isArray } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Handles parsing and transforming JSON to a table.
         *
         * @private
         */
        class JSONConverter extends DataConverter {
            /* *
             *
             *  Constructor
             *
             * */
            /**
             * Constructs an instance of the JSON parser.
             *
             * @param {JSONConverter.UserOptions} [options]
             * Options for the JSON parser.
             */
            constructor(options) {
                const mergedOptions = merge(JSONConverter.defaultOptions, options);
                super(mergedOptions);
                /* *
                 *
                 *  Properties
                 *
                 * */
                this.columns = [];
                this.headers = [];
                this.dataTypes = [];
                this.options = mergedOptions;
                this.table = new DataTable();
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Initiates parsing of JSON structure.
             *
             * @param {JSONConverter.UserOptions}[options]
             * Options for the parser
             *
             * @param {DataEvent.Detail} [eventDetail]
             * Custom information for pending events.
             *
             * @emits JSONConverter#parse
             * @emits JSONConverter#afterParse
             */
            parse(options, eventDetail) {
                const converter = this;
                options = merge(converter.options, options);
                const { beforeParse, orientation, firstRowAsNames, columnNames } = options;
                let data = options.data;
                if (!data) {
                    return;
                }
                if (beforeParse) {
                    data = beforeParse(data);
                }
                data = data.slice();
                if (orientation === 'columns') {
                    for (let i = 0, iEnd = data.length; i < iEnd; i++) {
                        const item = data[i];
                        if (!(item instanceof Array)) {
                            return;
                        }
                        if (firstRowAsNames) {
                            converter.headers.push(`${item.shift()}`);
                        }
                        else if (columnNames) {
                            converter.headers.push(columnNames[i]);
                        }
                        converter.table.setColumn(converter.headers[i] || i.toString(), item);
                    }
                }
                else if (orientation === 'rows') {
                    if (firstRowAsNames) {
                        converter.headers = data.shift();
                    }
                    else if (columnNames) {
                        converter.headers = columnNames;
                    }
                    for (let rowIndex = 0, iEnd = data.length; rowIndex < iEnd; rowIndex++) {
                        const row = data[rowIndex];
                        if (isArray(row)) {
                            for (let columnIndex = 0, jEnd = row.length; columnIndex < jEnd; columnIndex++) {
                                if (converter.columns.length < columnIndex + 1) {
                                    converter.columns.push([]);
                                }
                                converter.columns[columnIndex].push(row[columnIndex]);
                                this.table.setCell(converter.headers[columnIndex] ||
                                    rowIndex.toString(), rowIndex, row[columnIndex]);
                            }
                        }
                        else {
                            this.table.setRows([row], rowIndex);
                        }
                    }
                }
            }
            /**
             * Handles converting the parsed data to a table.
             *
             * @return {DataTable}
             * Table from the parsed CSV.
             */
            getTable() {
                return this.table;
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        /**
         * Default options
         */
        JSONConverter.defaultOptions = {
            ...DataConverter.defaultOptions,
            data: [],
            orientation: 'columns'
        };
        /* *
         *
         *  Default Export
         *
         * */

        return JSONConverter;
    });
    _registerModule(_modules, 'Data/Connectors/JSONConnector.js', [_modules['Data/Connectors/DataConnector.js'], _modules['Core/Utilities.js'], _modules['Data/Converters/JSONConverter.js']], function (DataConnector, U, JSONConverter) {
        /* *
         *
         *  (c) 2009-2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Pawel Lysy
         *
         * */
        const { merge } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Class that handles creating a DataConnector from JSON structure
         *
         * @private
         */
        class JSONConnector extends DataConnector {
            /* *
             *
             *  Constructor
             *
             * */
            /**
             * Constructs an instance of JSONConnector.
             *
             * @param {JSONConnector.UserOptions} [options]
             * Options for the connector and converter.
             */
            constructor(options) {
                const mergedOptions = merge(JSONConnector.defaultOptions, options);
                super(mergedOptions);
                this.converter = new JSONConverter(mergedOptions);
                this.options = mergedOptions;
                if (mergedOptions.enablePolling) {
                    this.startPolling(Math.max(mergedOptions.dataRefreshRate || 0, 1) * 1000);
                }
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Initiates the loading of the JSON source to the connector
             *
             * @param {DataEvent.Detail} [eventDetail]
             * Custom information for pending events.
             *
             * @emits JSONConnector#load
             * @emits JSONConnector#afterLoad
             */
            load(eventDetail) {
                const connector = this, converter = connector.converter, table = connector.table, { data, dataUrl, dataModifier } = connector.options;
                connector.emit({
                    type: 'load',
                    data,
                    detail: eventDetail,
                    table
                });
                // If already loaded, clear the current rows
                table.deleteRows();
                return Promise
                    .resolve(dataUrl ?
                    fetch(dataUrl).then((json) => json.json()) :
                    data || [])
                    .then((data) => {
                    if (data) {
                        converter.parse({ data });
                        table.setColumns(converter.getTable().getColumns());
                    }
                    return connector
                        .setModifierOptions(dataModifier)
                        .then(() => data);
                })
                    .then((data) => {
                    connector.emit({
                        type: 'afterLoad',
                        data,
                        detail: eventDetail,
                        table
                    });
                    return connector;
                })['catch']((error) => {
                    connector.emit({
                        type: 'loadError',
                        detail: eventDetail,
                        error,
                        table
                    });
                    throw error;
                });
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        JSONConnector.defaultOptions = {
            data: [],
            enablePolling: false,
            dataRefreshRate: 0,
            firstRowAsNames: true,
            orientation: 'rows'
        };
        DataConnector.registerType('JSON', JSONConnector);
        /* *
         *
         *  Default Export
         *
         * */

        return JSONConnector;
    });
    _registerModule(_modules, 'Data/Modifiers/ChainModifier.js', [_modules['Data/Modifiers/DataModifier.js'], _modules['Core/Utilities.js']], function (DataModifier, U) {
        /* *
         *
         *  (c) 2009-2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *
         * */
        const { merge } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Modifies a table with the help of modifiers in an ordered chain.
         *
         * @private
         */
        class ChainModifier extends DataModifier {
            /* *
             *
             *  Constructor
             *
             * */
            /**
             * Constructs an instance of the modifier chain.
             *
             * @param {Partial<ChainModifier.Options>} [options]
             * Options to configure the modifier chain.
             *
             * @param {...DataModifier} [chain]
             * Ordered chain of modifiers.
             */
            constructor(options, ...chain) {
                super();
                this.chain = chain;
                this.options = merge(ChainModifier.defaultOptions, options);
                const optionsChain = this.options.chain || [];
                for (let i = 0, iEnd = optionsChain.length, modifierOptions, ModifierClass; i < iEnd; ++i) {
                    modifierOptions = optionsChain[i];
                    if (!modifierOptions.type) {
                        continue;
                    }
                    ModifierClass = DataModifier.types[modifierOptions.type];
                    if (ModifierClass) {
                        chain.push(new ModifierClass(modifierOptions));
                    }
                }
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Adds a configured modifier to the end of the modifier chain. Please note,
             * that the modifier can be added multiple times.
             *
             * @param {DataModifier} modifier
             * Configured modifier to add.
             *
             * @param {DataEvent.Detail} [eventDetail]
             * Custom information for pending events.
             */
            add(modifier, eventDetail) {
                this.emit({
                    type: 'addModifier',
                    detail: eventDetail,
                    modifier
                });
                this.chain.push(modifier);
                this.emit({
                    type: 'addModifier',
                    detail: eventDetail,
                    modifier
                });
            }
            /**
             * Clears all modifiers from the chain.
             *
             * @param {DataEvent.Detail} [eventDetail]
             * Custom information for pending events.
             */
            clear(eventDetail) {
                this.emit({
                    type: 'clearChain',
                    detail: eventDetail
                });
                this.chain.length = 0;
                this.emit({
                    type: 'afterClearChain',
                    detail: eventDetail
                });
            }
            /**
             * Applies several modifications to the table and returns a modified copy of
             * the given table.
             *
             * @param {Highcharts.DataTable} table
             * Table to modify.
             *
             * @param {DataEvent.Detail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Promise<Highcharts.DataTable>}
             * Table with `modified` property as a reference.
             */
            modify(table, eventDetail) {
                const modifiers = (this.options.reverse ?
                    this.chain.slice().reverse() :
                    this.chain.slice());
                if (table.modified === table) {
                    table.modified = table.clone(false, eventDetail);
                }
                let promiseChain = Promise.resolve(table);
                for (let i = 0, iEnd = modifiers.length; i < iEnd; ++i) {
                    const modifier = modifiers[i];
                    promiseChain = promiseChain.then((chainTable) => modifier.modify(chainTable.modified, eventDetail));
                }
                promiseChain = promiseChain.then((chainTable) => {
                    table.modified.deleteColumns();
                    table.modified.setColumns(chainTable.modified.getColumns());
                    return table;
                });
                promiseChain = promiseChain['catch']((error) => {
                    this.emit({
                        type: 'error',
                        detail: eventDetail,
                        table
                    });
                    throw error;
                });
                return promiseChain;
            }
            /**
             * Applies partial modifications of a cell change to the property `modified`
             * of the given modified table.
             *
             * *Note:* The `modified` property of the table gets replaced.
             *
             * @param {Highcharts.DataTable} table
             * Modified table.
             *
             * @param {string} columnName
             * Column name of changed cell.
             *
             * @param {number|undefined} rowIndex
             * Row index of changed cell.
             *
             * @param {Highcharts.DataTableCellType} cellValue
             * Changed cell value.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Highcharts.DataTable}
             * Table with `modified` property as a reference.
             */
            modifyCell(table, columnName, rowIndex, cellValue, eventDetail) {
                const modifiers = (this.options.reverse ?
                    this.chain.reverse() :
                    this.chain);
                if (modifiers.length) {
                    let clone = table.clone();
                    for (let i = 0, iEnd = modifiers.length; i < iEnd; ++i) {
                        modifiers[i].modifyCell(clone, columnName, rowIndex, cellValue, eventDetail);
                        clone = clone.modified;
                    }
                    table.modified = clone;
                }
                return table;
            }
            /**
             * Applies partial modifications of column changes to the property
             * `modified` of the given table.
             *
             * *Note:* The `modified` property of the table gets replaced.
             *
             * @param {Highcharts.DataTable} table
             * Modified table.
             *
             * @param {Highcharts.DataTableColumnCollection} columns
             * Changed columns as a collection, where the keys are the column names.
             *
             * @param {number} [rowIndex=0]
             * Index of the first changed row.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Highcharts.DataTable}
             * Table with `modified` property as a reference.
             */
            modifyColumns(table, columns, rowIndex, eventDetail) {
                const modifiers = (this.options.reverse ?
                    this.chain.reverse() :
                    this.chain.slice());
                if (modifiers.length) {
                    let clone = table.clone();
                    for (let i = 0, iEnd = modifiers.length; i < iEnd; ++i) {
                        modifiers[i].modifyColumns(clone, columns, rowIndex, eventDetail);
                        clone = clone.modified;
                    }
                    table.modified = clone;
                }
                return table;
            }
            /**
             * Applies partial modifications of row changes to the property `modified`
             * of the given table.
             *
             * *Note:* The `modified` property of the table gets replaced.
             *
             * @param {Highcharts.DataTable} table
             * Modified table.
             *
             * @param {Array<(Highcharts.DataTableRow|Highcharts.DataTableRowObject)>} rows
             * Changed rows.
             *
             * @param {number} [rowIndex]
             * Index of the first changed row.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Highcharts.DataTable}
             * Table with `modified` property as a reference.
             */
            modifyRows(table, rows, rowIndex, eventDetail) {
                const modifiers = (this.options.reverse ?
                    this.chain.reverse() :
                    this.chain.slice());
                if (modifiers.length) {
                    let clone = table.clone();
                    for (let i = 0, iEnd = modifiers.length; i < iEnd; ++i) {
                        modifiers[i].modifyRows(clone, rows, rowIndex, eventDetail);
                        clone = clone.modified;
                    }
                    table.modified = clone;
                }
                return table;
            }
            /**
             * Applies several modifications to the table.
             *
             * *Note:* The `modified` property of the table gets replaced.
             *
             * @param {DataTable} table
             * Table to modify.
             *
             * @param {DataEvent.Detail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {DataTable}
             * Table as a reference.
             *
             * @emits ChainDataModifier#execute
             * @emits ChainDataModifier#afterExecute
             */
            modifyTable(table, eventDetail) {
                const chain = this;
                chain.emit({
                    type: 'modify',
                    detail: eventDetail,
                    table
                });
                const modifiers = (chain.options.reverse ?
                    chain.chain.reverse() :
                    chain.chain.slice());
                let modified = table.modified;
                for (let i = 0, iEnd = modifiers.length, modifier; i < iEnd; ++i) {
                    modifier = modifiers[i];
                    modified = modifier.modifyTable(modified, eventDetail).modified;
                }
                table.modified = modified;
                chain.emit({
                    type: 'afterModify',
                    detail: eventDetail,
                    table
                });
                return table;
            }
            /**
             * Removes a configured modifier from all positions in the modifier chain.
             *
             * @param {DataModifier} modifier
             * Configured modifier to remove.
             *
             * @param {DataEvent.Detail} [eventDetail]
             * Custom information for pending events.
             */
            remove(modifier, eventDetail) {
                const modifiers = this.chain;
                this.emit({
                    type: 'removeModifier',
                    detail: eventDetail,
                    modifier
                });
                modifiers.splice(modifiers.indexOf(modifier), 1);
                this.emit({
                    type: 'afterRemoveModifier',
                    detail: eventDetail,
                    modifier
                });
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        /**
         * Default option for the ordered modifier chain.
         */
        ChainModifier.defaultOptions = {
            type: 'Chain'
        };
        DataModifier.registerType('Chain', ChainModifier);
        /* *
         *
         *  Default Export
         *
         * */

        return ChainModifier;
    });
    _registerModule(_modules, 'Data/Modifiers/InvertModifier.js', [_modules['Data/Modifiers/DataModifier.js'], _modules['Core/Utilities.js']], function (DataModifier, U) {
        /* *
         *
         *  (c) 2009-2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Wojciech Chmiel
         *  - Sophie Bremer
         *
         * */
        const { merge } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Inverts columns and rows in a table.
         *
         * @private
         */
        class InvertModifier extends DataModifier {
            /* *
             *
             *  Constructor
             *
             * */
            /**
             * Constructs an instance of the invert modifier.
             *
             * @param {Partial<InvertModifier.Options>} [options]
             * Options to configure the invert modifier.
             */
            constructor(options) {
                super();
                this.options = merge(InvertModifier.defaultOptions, options);
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Applies partial modifications of a cell change to the property `modified`
             * of the given modified table.
             *
             * @param {Highcharts.DataTable} table
             * Modified table.
             *
             * @param {string} columnName
             * Column name of changed cell.
             *
             * @param {number|undefined} rowIndex
             * Row index of changed cell.
             *
             * @param {Highcharts.DataTableCellType} cellValue
             * Changed cell value.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Highcharts.DataTable}
             * Table with `modified` property as a reference.
             */
            modifyCell(table, columnName, rowIndex, cellValue, eventDetail) {
                const modified = table.modified, modifiedRowIndex = modified.getRowIndexBy('columnNames', columnName);
                if (typeof modifiedRowIndex === 'undefined') {
                    modified.setColumns(this.modifyTable(table.clone()).getColumns(), void 0, eventDetail);
                }
                else {
                    modified.setCell(`${rowIndex}`, modifiedRowIndex, cellValue, eventDetail);
                }
                return table;
            }
            /**
             * Applies partial modifications of column changes to the property
             * `modified` of the given table.
             *
             * @param {Highcharts.DataTable} table
             * Modified table.
             *
             * @param {Highcharts.DataTableColumnCollection} columns
             * Changed columns as a collection, where the keys are the column names.
             *
             * @param {number} [rowIndex=0]
             * Index of the first changed row.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Highcharts.DataTable}
             * Table with `modified` property as a reference.
             */
            modifyColumns(table, columns, rowIndex, eventDetail) {
                const modified = table.modified, modifiedColumnNames = (modified.getColumn('columnNames') || []);
                let columnNames = table.getColumnNames(), reset = (table.getRowCount() !== modifiedColumnNames.length);
                if (!reset) {
                    for (let i = 0, iEnd = columnNames.length; i < iEnd; ++i) {
                        if (columnNames[i] !== modifiedColumnNames[i]) {
                            reset = true;
                            break;
                        }
                    }
                }
                if (reset) {
                    return this.modifyTable(table, eventDetail);
                }
                columnNames = Object.keys(columns);
                for (let i = 0, iEnd = columnNames.length, column, columnName, modifiedRowIndex; i < iEnd; ++i) {
                    columnName = columnNames[i];
                    column = columns[columnName];
                    modifiedRowIndex = (modified.getRowIndexBy('columnNames', columnName) ||
                        modified.getRowCount());
                    for (let j = 0, j2 = rowIndex, jEnd = column.length; j < jEnd; ++j, ++j2) {
                        modified.setCell(`${j2}`, modifiedRowIndex, column[j], eventDetail);
                    }
                }
                return table;
            }
            /**
             * Applies partial modifications of row changes to the property `modified`
             * of the given table.
             *
             * @param {Highcharts.DataTable} table
             * Modified table.
             *
             * @param {Array<(Highcharts.DataTableRow|Highcharts.DataTableRowObject)>} rows
             * Changed rows.
             *
             * @param {number} [rowIndex]
             * Index of the first changed row.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Highcharts.DataTable}
             * Table with `modified` property as a reference.
             */
            modifyRows(table, rows, rowIndex, eventDetail) {
                const columnNames = table.getColumnNames(), modified = table.modified, modifiedColumnNames = (modified.getColumn('columnNames') || []);
                let reset = (table.getRowCount() !== modifiedColumnNames.length);
                if (!reset) {
                    for (let i = 0, iEnd = columnNames.length; i < iEnd; ++i) {
                        if (columnNames[i] !== modifiedColumnNames[i]) {
                            reset = true;
                            break;
                        }
                    }
                }
                if (reset) {
                    return this.modifyTable(table, eventDetail);
                }
                for (let i = 0, i2 = rowIndex, iEnd = rows.length, row; i < iEnd; ++i, ++i2) {
                    row = rows[i];
                    if (row instanceof Array) {
                        modified.setColumn(`${i2}`, row);
                    }
                    else {
                        for (let j = 0, jEnd = columnNames.length; j < jEnd; ++j) {
                            modified.setCell(`${i2}`, j, row[columnNames[j]], eventDetail);
                        }
                    }
                }
                return table;
            }
            /**
             * Inverts rows and columns in the table.
             *
             * @param {DataTable} table
             * Table to invert.
             *
             * @param {DataEvent.Detail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {DataTable}
             * Table with inverted `modified` property as a reference.
             */
            modifyTable(table, eventDetail) {
                const modifier = this;
                modifier.emit({ type: 'modify', detail: eventDetail, table });
                const modified = table.modified;
                if (table.hasColumns(['columnNames'])) { // inverted table
                    const columnNames = ((table.deleteColumns(['columnNames']) || {})
                        .columnNames || []).map((column) => `${column}`), columns = {};
                    for (let i = 0, iEnd = table.getRowCount(), row; i < iEnd; ++i) {
                        row = table.getRow(i);
                        if (row) {
                            columns[columnNames[i]] = row;
                        }
                    }
                    modified.deleteColumns();
                    modified.setColumns(columns);
                }
                else { // regular table
                    const columns = {};
                    for (let i = 0, iEnd = table.getRowCount(), row; i < iEnd; ++i) {
                        row = table.getRow(i);
                        if (row) {
                            columns[`${i}`] = row;
                        }
                    }
                    columns.columnNames = table.getColumnNames();
                    modified.deleteColumns();
                    modified.setColumns(columns);
                }
                modifier.emit({ type: 'afterModify', detail: eventDetail, table });
                return table;
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        /**
         * Default options for the invert modifier.
         */
        InvertModifier.defaultOptions = {
            type: 'Invert'
        };
        DataModifier.registerType('Invert', InvertModifier);
        /* *
         *
         *  Default Export
         *
         * */

        return InvertModifier;
    });
    _registerModule(_modules, 'Data/Modifiers/RangeModifier.js', [_modules['Data/Modifiers/DataModifier.js'], _modules['Core/Utilities.js']], function (DataModifier, U) {
        /* *
         *
         *  (c) 2009-2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *
         * */
        const { merge } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Filters out table rows with a specific value range.
         *
         * @private
         */
        class RangeModifier extends DataModifier {
            /* *
             *
             *  Constructor
             *
             * */
            /**
             * Constructs an instance of the range modifier.
             *
             * @param {Partial<RangeModifier.Options>} [options]
             * Options to configure the range modifier.
             */
            constructor(options) {
                super();
                this.options = merge(RangeModifier.defaultOptions, options);
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Replaces table rows with filtered rows.
             *
             * @param {DataTable} table
             * Table to modify.
             *
             * @param {DataEvent.Detail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {DataTable}
             * Table with `modified` property as a reference.
             */
            modifyTable(table, eventDetail) {
                const modifier = this;
                modifier.emit({ type: 'modify', detail: eventDetail, table });
                const { additive, ranges, strict } = modifier.options;
                if (ranges.length) {
                    const modified = table.modified;
                    let columns = table.getColumns(), rows = [];
                    for (let i = 0, iEnd = ranges.length, range, rangeColumn; i < iEnd; ++i) {
                        range = ranges[i];
                        if (strict &&
                            typeof range.minValue !== typeof range.maxValue) {
                            continue;
                        }
                        if (i > 0 && !additive) {
                            modified.deleteRows();
                            modified.setRows(rows);
                            columns = modified.getColumns();
                            rows = [];
                        }
                        rangeColumn = (columns[range.column] || []);
                        for (let j = 0, jEnd = rangeColumn.length, cell, row; j < jEnd; ++j) {
                            cell = rangeColumn[j];
                            switch (typeof cell) {
                                default:
                                    continue;
                                case 'boolean':
                                case 'number':
                                case 'string':
                                    break;
                            }
                            if (strict &&
                                typeof cell !== typeof range.minValue) {
                                continue;
                            }
                            if (cell >= range.minValue &&
                                cell <= range.maxValue) {
                                row = (additive ?
                                    table.getRow(j) :
                                    modified.getRow(j));
                                if (row) {
                                    rows.push(row);
                                }
                            }
                        }
                    }
                    modified.deleteRows();
                    modified.setRows(rows);
                }
                modifier.emit({ type: 'afterModify', detail: eventDetail, table });
                return table;
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        /**
         * Default options for the range modifier.
         */
        RangeModifier.defaultOptions = {
            type: 'Range',
            ranges: []
        };
        DataModifier.registerType('Range', RangeModifier);
        /* *
         *
         *  Default Export
         *
         * */

        return RangeModifier;
    });
    _registerModule(_modules, 'Data/Modifiers/SortModifier.js', [_modules['Data/Modifiers/DataModifier.js'], _modules['Data/DataTable.js'], _modules['Core/Utilities.js']], function (DataModifier, DataTable, U) {
        /* *
         *
         *  (c) 2009-2023 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sophie Bremer
         *
         * */
        const { merge } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Sort table rows according to values of a column.
         *
         * @private
         */
        class SortModifier extends DataModifier {
            /* *
             *
             *  Static Functions
             *
             * */
            static ascending(a, b) {
                return ((a || 0) < (b || 0) ? -1 :
                    (a || 0) > (b || 0) ? 1 :
                        0);
            }
            static descending(a, b) {
                return ((b || 0) < (a || 0) ? -1 :
                    (b || 0) > (a || 0) ? 1 :
                        0);
            }
            /* *
             *
             *  Constructor
             *
             * */
            /**
             * Constructs an instance of the range modifier.
             *
             * @param {Partial<RangeDataModifier.Options>} [options]
             * Options to configure the range modifier.
             */
            constructor(options) {
                super();
                this.options = merge(SortModifier.defaultOptions, options);
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Returns index and row for sort reference.
             *
             * @private
             *
             * @param {Highcharts.DataTable} table
             * Table with rows to reference.
             *
             * @return {Array<SortModifier.RowReference>}
             * Array of row references.
             */
            getRowReferences(table) {
                const rows = table.getRows(), rowReferences = [];
                for (let i = 0, iEnd = rows.length; i < iEnd; ++i) {
                    rowReferences.push({
                        index: i,
                        row: rows[i]
                    });
                }
                return rowReferences;
            }
            /**
             * Applies partial modifications of a cell change to the property `modified`
             * of the given modified table.
             *
             * @param {Highcharts.DataTable} table
             * Modified table.
             *
             * @param {string} columnName
             * Column name of changed cell.
             *
             * @param {number|undefined} rowIndex
             * Row index of changed cell.
             *
             * @param {Highcharts.DataTableCellType} cellValue
             * Changed cell value.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Highcharts.DataTable}
             * Table with `modified` property as a reference.
             */
            modifyCell(table, columnName, rowIndex, cellValue, eventDetail) {
                const modifier = this, { orderByColumn, orderInColumn } = modifier.options;
                if (columnName === orderByColumn) {
                    if (orderInColumn) {
                        table.modified.setCell(columnName, rowIndex, cellValue);
                        table.modified.setColumn(orderInColumn, modifier
                            .modifyTable(new DataTable({
                            columns: table
                                .getColumns([orderByColumn, orderInColumn])
                        }))
                            .modified
                            .getColumn(orderInColumn));
                    }
                    else {
                        modifier.modifyTable(table, eventDetail);
                    }
                }
                return table;
            }
            /**
             * Applies partial modifications of column changes to the property
             * `modified` of the given table.
             *
             * @param {Highcharts.DataTable} table
             * Modified table.
             *
             * @param {Highcharts.DataTableColumnCollection} columns
             * Changed columns as a collection, where the keys are the column names.
             *
             * @param {number} [rowIndex=0]
             * Index of the first changed row.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Highcharts.DataTable}
             * Table with `modified` property as a reference.
             */
            modifyColumns(table, columns, rowIndex, eventDetail) {
                const modifier = this, { orderByColumn, orderInColumn } = modifier.options, columnNames = Object.keys(columns);
                if (columnNames.indexOf(orderByColumn) > -1) {
                    if (orderInColumn &&
                        columns[columnNames[0]].length) {
                        table.modified.setColumns(columns, rowIndex);
                        table.modified.setColumn(orderInColumn, modifier
                            .modifyTable(new DataTable({
                            columns: table
                                .getColumns([orderByColumn, orderInColumn])
                        }))
                            .modified
                            .getColumn(orderInColumn));
                    }
                    else {
                        modifier.modifyTable(table, eventDetail);
                    }
                }
                return table;
            }
            /**
             * Applies partial modifications of row changes to the property `modified`
             * of the given table.
             *
             * @param {Highcharts.DataTable} table
             * Modified table.
             *
             * @param {Array<(Highcharts.DataTableRow|Highcharts.DataTableRowObject)>} rows
             * Changed rows.
             *
             * @param {number} [rowIndex]
             * Index of the first changed row.
             *
             * @param {Highcharts.DataTableEventDetail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {Highcharts.DataTable}
             * Table with `modified` property as a reference.
             */
            modifyRows(table, rows, rowIndex, eventDetail) {
                const modifier = this, { orderByColumn, orderInColumn } = modifier.options;
                if (orderInColumn &&
                    rows.length) {
                    table.modified.setRows(rows, rowIndex);
                    table.modified.setColumn(orderInColumn, modifier
                        .modifyTable(new DataTable({
                        columns: table
                            .getColumns([orderByColumn, orderInColumn])
                    }))
                        .modified
                        .getColumn(orderInColumn));
                }
                else {
                    modifier.modifyTable(table, eventDetail);
                }
                return table;
            }
            /**
             * Sorts rows in the table.
             *
             * @param {DataTable} table
             * Table to sort in.
             *
             * @param {DataEvent.Detail} [eventDetail]
             * Custom information for pending events.
             *
             * @return {DataTable}
             * Table with `modified` property as a reference.
             */
            modifyTable(table, eventDetail) {
                const modifier = this;
                modifier.emit({ type: 'modify', detail: eventDetail, table });
                const columnNames = table.getColumnNames(), rowCount = table.getRowCount(), rowReferences = this.getRowReferences(table), { direction, orderByColumn, orderInColumn } = modifier.options, compare = (direction === 'asc' ?
                    SortModifier.ascending :
                    SortModifier.descending), orderByColumnIndex = columnNames.indexOf(orderByColumn), modified = table.modified;
                if (orderByColumnIndex !== -1) {
                    rowReferences.sort((a, b) => compare(a.row[orderByColumnIndex], b.row[orderByColumnIndex]));
                }
                if (orderInColumn) {
                    const column = [];
                    for (let i = 0; i < rowCount; ++i) {
                        column[rowReferences[i].index] = i;
                    }
                    modified.setColumns({ [orderInColumn]: column });
                }
                else {
                    const rows = [];
                    for (let i = 0; i < rowCount; ++i) {
                        rows.push(rowReferences[i].row);
                    }
                    modified.setRows(rows, 0);
                }
                modifier.emit({ type: 'afterModify', detail: eventDetail, table });
                return table;
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        /**
         * Default options to group table rows.
         */
        SortModifier.defaultOptions = {
            type: 'Sort',
            direction: 'desc',
            orderByColumn: 'y'
        };
        DataModifier.registerType('Sort', SortModifier);
        /* *
         *
         *  Default Export
         *
         * */

        return SortModifier;
    });
    _registerModule(_modules, 'masters/dashboards.src.js', [_modules['Data/Connectors/DataConnector.js'], _modules['Dashboards/Board.js'], _modules['Dashboards/Components/Component.js'], _modules['Dashboards/Components/ComponentRegistry.js'], _modules['Data/DataPool.js'], _modules['Data/DataCursor.js'], _modules['Data/Modifiers/DataModifier.js'], _modules['Data/DataTable.js'], _modules['Dashboards/Globals.js'], _modules['Dashboards/PluginHandler.js'], _modules['Dashboards/Components/Sync/Sync.js'], _modules['Dashboards/Utilities.js']], function (DataConnector, Board, Component, ComponentRegistry, DataPool, DataCursor, DataModifier, DataTable, Globals, PluginHandler, Sync, Utilities) {

        /* *
         *
         *  Imports
         *
         * */
        // Fill registries
        /* *
         *
         *  Namespace
         *
         * */
        const G = Globals;
        G.board = Board.board;
        G.merge = Utilities.merge;
        G.uniqueKey = Utilities.uniqueKey;
        G.Board = Board;
        G.Component = Component;
        G.ComponentRegistry = ComponentRegistry;
        G.DataConnector = DataConnector;
        G.DataCursor = DataCursor;
        G.DataModifier = DataModifier;
        G.DataPool = DataPool;
        G.DataTable = DataTable;
        G.PluginHandler = PluginHandler;
        G.Sync = Sync;
        /* *
         *
         *  Classic Export
         *
         * */
        if (!G.win.Dashboards) {
            G.win.Dashboards = G;
        }
        /* *
         *
         *  Default Export
         *
         * */

        return G;
    });
    _modules['masters/dashboards.src.js']._modules = _modules;
    return _modules['masters/dashboards.src.js'];
}));