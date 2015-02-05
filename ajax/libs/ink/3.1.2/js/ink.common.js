/**
 * Auxiliar utilities for UI Modules
 * @module Ink.UI.Common_1
 * @version 1
 */
 
Ink.createModule('Ink.UI.Common', '1', ['Ink.Dom.Element_1', 'Ink.Net.Ajax_1','Ink.Dom.Css_1','Ink.Dom.Selector_1','Ink.Util.Url_1'], function(InkElement, Ajax,Css,Selector,Url) {

    'use strict';

    var nothing = {} /* a marker, for reference comparison. */;

    var keys = Object.keys || function (obj) {
        var ret = [];
        for (var k in obj) if (obj.hasOwnProperty(k)) {
            ret.push(k);
        }
        return ret;
    };

    var es6WeakMapSupport = 'WeakMap' in window;
    var instances = es6WeakMapSupport ? new WeakMap() : null;
    // Old Registry
    var _reg = [];
    var domRegistry = {
        get: function get(el) {
            return es6WeakMapSupport ?
                instances.get(el) :
                _reg[el.getAttribute('__InkInstance')];
        },
        set: function set(el, thing) {
            if (es6WeakMapSupport) {
                instances.set(el, thing);
            } else {
                el.setAttribute('__InkInstance', _reg.push(thing) - 1);
            }
        }
    };

    /**
     * @namespace Ink.UI.Common_1
     */

    var Common = {

        /**
         * Supported Ink Layouts
         *
         * @property Layouts
         * @type Object
         * @readOnly
         */
        Layouts: {
            TINY: 'tiny',
            SMALL:  'small',
            MEDIUM: 'medium',
            LARGE:  'large',
            XLARGE: 'xlarge'
        },

        /**
         * Checks if an item is a valid DOM Element.
         *
         * @method isDOMElement
         * @static
         * @param   {Mixed}     o   The object to be checked.
         * @return  {Boolean}       True if it's a valid DOM Element.
         * @example
         *     var el = Ink.s('#element');
         *     if( Ink.UI.Common.isDOMElement( el ) === true ){
         *         // It is a DOM Element.
         *     } else {
         *         // It is NOT a DOM Element.
         *     }
         */
        isDOMElement: InkElement.isDOMElement,

        /**
         * Checks if an item is a valid integer.
         *
         * @method isInteger
         * @static
         * @param {Mixed} n     The value to be checked.
         * @return {Boolean}    True if it's a valid integer.
         * @example
         *     var value = 1;
         *     if( Ink.UI.Common.isInteger( value ) === true ){
         *         // It is an integer.
         *     } else {
         *         // It is NOT an integer.
         *     }
         */
        isInteger: function(n) {
            return (typeof n === 'number' && n % 1 === 0);
        },

        /**
         * Gets a DOM Element. 
         *
         * @method elOrSelector
         * @static
         * @param  {Element|String}         elOrSelector    DOM Element or CSS Selector
         * @param  {String}                 fieldName       The name of the field. Commonly used for debugging.
         * @return {Element} Returns the Element passed or the first result of the CSS Selector. Otherwise it throws an exception.
         * @example
         *     // In case there are several .myInput, it will retrieve the first found
         *     var el = Ink.UI.Common.elOrSelector('.myInput','My Input');
         */
        elOrSelector: function(elOrSelector, fieldName) {
            if (!Common.isDOMElement(elOrSelector)) {
                var t = Selector.select(elOrSelector);
                if (t.length === 0) {
                    Ink.warn(fieldName + ' must either be a DOM Element or a selector expression!\nThe script element must also be after the DOM Element itself.');
                    return null;
                }
                return t[0];
            }
            return elOrSelector;
        },

        /**
         * Like `elOrSelector` but returns an array of elements.
         *
         * @method elsOrSelector
         *
         * @static
         * @param  {Element|Array|String} elsOrSelector DOM Element, array of DOM Elements, or CSS Selector
         * @param  {String}               [fieldName]     The name of the field. Used for the error shown when no elements are found.
         * @param {Boolean} required If this is true, throw an error instead of returning an empty array.
         * @return {Array} The selected Elements, or the given Elements
         * @example
         *     var elements = Ink.UI.Common.elsOrSelector('input.my-inputs', 'My Input');
         */
        elsOrSelector: function(elsOrSelector, fieldName, required) {
            var ret;
            if (typeof elsOrSelector === 'string') {
                ret = Selector.select(elsOrSelector);
            } else if (Common.isDOMElement(elsOrSelector)) {
                ret = [elsOrSelector];
            } else if (elsOrSelector && typeof elsOrSelector === 'object' && typeof elsOrSelector.length === 'number') {
                ret = elsOrSelector;
            }

            if (ret && ret.length) {
                return ret;
            } else {
                if (required) {
                    throw new TypeError(fieldName + ' must either be a DOM Element, an Array of elements, or a selector expression!\nThe script element must also be after the DOM Element itself.');
                } else {
                    return [];
                }
            }
        },

        /**
         * Gets options an object and element's metadata.
         *
         * The element's data attributes take precedence. Values from the element's data-atrributes are coerced into the required type.
         *
         * @method options
         *
         * @param {Object}  [fieldId]   Name to be used in error reports.
         * @param {Object}  defaults    Object with the options' types and defaults.
         * @param {Object}  overrides   Options to override the defaults. Usually passed when instantiating an UI module.
         * @param {Element} [element]   Element with data-attributes
         * @return {Object} An object containing all the option values.
         *
         * @example
         *
         *      this._options = Ink.UI.Common.options('MyComponent', {
         *          'anobject': ['Object', null],  // Defaults to null
         *          'target': ['Element', null],
         *          'stuff': ['Number', 0.1],
         *          'stuff2': ['Integer', 0],
         *          'doKickFlip': ['Boolean', false],
         *          'targets': ['Elements'], // Required option since no default was given
         *          'onClick': ['Function', null]
         *      }, options || {}, elm)
         *
         * @example
         *
         * ### Note about booleans
         *
         * Here is how options are read from the markup
         * data-attributes, for several values`data-a-boolean`.
         *
         * Options considered true:
         *
         *   - `data-a-boolean="true"`
         *   - (Every other value which is not on the list below.)
         * 
         * Options considered false:
         *
         *   - `data-a-boolean="false"`
         *   - `data-a-boolean=""`
         *   - `data-a-boolean`
         *
         * Options which go to default:
         *
         *   - (no attribute). When `data-a-boolean` is ommitted, the
         *   option is not considered true nor false, and as such
         *   defaults to what is in the `defaults` argument.
         *
         **/
        options: function (fieldId, defaults, overrides, element) {
            // TODO Change Common.options's signature? the below looks better, more manageable
            // var options = Common.options({
            //     element: this._element,
            //     modName: constructor._name,
            //     options: constructor._optionDefinition,
            //     defaults: constructor._globalDefaults
            // });

            if (typeof fieldId !== 'string') {
                element = overrides;
                overrides = defaults;
                defaults = fieldId;
                fieldId = '';
            }
            overrides = overrides || {};
            var out = {};
            var dataAttrs = element ? InkElement.data(element) : {};
            var fromDataAttrs;
            var type;
            var lType;
            var defaultVal;

            var invalidStr = function (str) {
                if (fieldId) { str = fieldId + ': "' + ('' + str).replace(/"/, '\\"') + '"'; }
                return str;
            };

            var quote = function (str) {
                return '"' + ('' + str).replace(/"/, '\\"') + '"';
            };

            var invalidThrow = function (str) {
                throw new Error(invalidStr(str));
            };

            var invalid = function (str) {
                Ink.error(invalidStr(str) + '. Ignoring option.');
            };

            function optionValue(key) {
                type = defaults[key][0];
                lType = type.toLowerCase();
                defaultVal = defaults[key].length === 2 ? defaults[key][1] : nothing;

                if (!type) {
                    invalidThrow('Ink.UI.Common.options: Always specify a type!');
                }
                if (!(lType in Common._coerce_funcs)) {
                    invalidThrow('Ink.UI.Common.options: ' + defaults[key][0] + ' is not a valid type. Use one of ' + keys(Common._coerce_funcs).join(', '));

                }
                if (!defaults[key].length || defaults[key].length > 2) {
                    invalidThrow('the "defaults" argument must be an object mapping option names to [typestring, optional] arrays.');
                }

                if (key in dataAttrs) {
                    fromDataAttrs = Common._coerce_from_string(lType, dataAttrs[key], key, fieldId);
                    // (above can return `nothing`)
                } else {
                    fromDataAttrs = nothing;
                }

                if (fromDataAttrs !== nothing) {
                    if (!Common._options_validate(fromDataAttrs, lType)) {
                        invalid('(' + key + ' option) Invalid ' + lType + ' ' + quote(fromDataAttrs));
                        return defaultVal;
                    } else {
                        return fromDataAttrs;
                    }
                } else if (key in overrides) {
                    return overrides[key];
                } else if (defaultVal !== nothing) {
                    return defaultVal;
                } else {
                    invalidThrow('Option ' + key + ' is required!');
                }
            }

            for (var key in defaults) {
                if (defaults.hasOwnProperty(key)) {
                    out[key] = optionValue(key);
                }
            }

            return out;
        },

        _coerce_from_string: function (type, val, paramName, fieldId) {
            if (type in Common._coerce_funcs) {
                return Common._coerce_funcs[type](val, paramName, fieldId);
            } else {
                return val;
            }
        },

        _options_validate: function (val, type) {
            if (type in Common._options_validate_types) {
                return Common._options_validate_types[type].call(Common, val);
            } else {
                // 'object' options cannot be passed through data-attributes.
                // Json you say? Not any good to embed in HTML.
                return false;
            }
        },

        _coerce_funcs: (function () {
            var ret = {
                element: function (val) {
                    return Common.elOrSelector(val, '');
                },
                elements: function (val) {
                    return Common.elsOrSelector(val, '', false /*not required, so don't throw an exception now*/);
                },
                object: function (val) { return val; },
                number: function (val) { return parseFloat(val); },
                'boolean': function (val) {
                    return !(val === 'false' || val === '' || val === null);
                },
                string: function (val) { return val; },
                'function': function (val, paramName, fieldId) {
                    Ink.error(fieldId + ': You cannot specify the option "' + paramName + '" through data-attributes because it\'s a function');
                    return nothing;
                }
            };
            ret['float'] = ret.integer = ret.number;
            return ret;
        }()),

        _options_validate_types: (function () {
            var types = {
                string: function (val) {
                    return typeof val === 'string';
                },
                number: function (val) {
                    return typeof val === 'number' && !isNaN(val) && isFinite(val);
                },
                integer: function (val) {
                    return val === Math.round(val);
                },
                element: function (val) {
                    return Common.isDOMElement(val);
                },
                elements: function (val) {
                    return val && typeof val === 'object' && typeof val.length === 'number' && val.length;
                },
                'boolean': function (val) {
                    return typeof val === 'boolean';
                },
                object: function () { return true; }
            };
            types['float'] = types.number;
            return types;
        }()),

        /**
         * Deep copy (clone) an object.
         * Note: The object cannot have referece loops.
         *
         * @method clone
         * @static
         * @deprecated
         * @param  {Object} o The object to be cloned/copied.
         * @return {Object} Returns the result of the clone/copy.
         * @example
         *     var originalObj = {
         *         key1: 'value1',
         *         key2: 'value2',
         *         key3: 'value3'
         *     };
         *     var cloneObj = Ink.UI.Common.clone( originalObj );
         */
        clone: function(o) {
            try {
                return JSON.parse( JSON.stringify(o) );
            } catch (ex) {
                throw new Error('Given object cannot have loops!');
            }
        },


        /**
         * Gets an element's one-base index relative to its parent.
         *
         * Deprecated. Use Ink.Dom.Element.parentIndexOf instead.
         *
         * @method childIndex
         * @deprecated
         * @static
         * @param  {Element}     childEl     Valid DOM Element.
         * @return {Number}                     Numerical position of an element relatively to its parent.
         * @example
         *     <!-- Imagine the following HTML: -->
         *     <ul>
         *       <li>One</li>
         *       <li>Two</li>
         *       <li id="test">Three</li>
         *       <li>Four</li>
         *     </ul>
         *
         *     <script>
         *         var testLi = Ink.s('#test');
         *         Ink.UI.Common.childIndex( testLi ); // Returned value: 3
         *     </script>
         */
        childIndex: InkElement.parentIndexOf,

        /**
         * AJAX JSON request shortcut method
         * It provides a more convenient way to do an AJAX request and expect a JSON response.It also offers a callback option, as third parameter, for better async handling.
         *
         * @method ajaxJSON
         * @static
         * @async
         * @param   {String}    endpoint    Valid URL to be used as target by the request.
         * @param   {Object}    params      This field is used in the thrown Exception to identify the parameter.
         * @param   {Function}  cb          Callback for the request.
         * @return {void}
         * @public
         * @example
         *     // In case there are several .myInput, it will retrieve the first found
         *     var el = Ink.UI.Common.elOrSelector('.myInput','My Input');
         */
        ajaxJSON: function(endpoint, params, cb) {
            new Ajax(
                endpoint,
                {
                    evalJS:         'force',
                    method:         'POST',
                    parameters:     params,

                    onSuccess:  function( r) {
                        try {
                            r = r.responseJSON;
                            if (r.status !== 'ok') {
                                throw 'server error: ' + r.message;
                            }
                            cb(null, r);
                        } catch (ex) {
                            cb(ex);
                        }
                    },

                    onFailure: function() {
                        cb('communication failure');
                    }
                }
            );
        },


        /**
         * Gets the current Ink layout.
         *
         * @method currentLayout
         * @static
         * @return {String} A string representation of the current layout name.
         * @public
         * @example
         *      var inkLayout = Ink.UI.Common.currentLayout();
         *      if (inkLayout === 'small') {
         *          // ...
         *      }
         */
        currentLayout: function() {
            var i, f, k, v, el, detectorEl = Selector.select('#ink-layout-detector')[0];
            if (!detectorEl) {
                detectorEl = document.createElement('div');
                detectorEl.id = 'ink-layout-detector';
                for (k in Common.Layouts) {
                    if (Common.Layouts.hasOwnProperty(k)) {
                        v = Common.Layouts[k];
                        el = document.createElement('div');
                        el.className = 'show-' + v + ' hide-all';
                        el.setAttribute('data-ink-layout', v);
                        detectorEl.appendChild(el);
                    }
                }
                document.body.appendChild(detectorEl);
            }

            for (i = 0, f = detectorEl.children.length; i < f; ++i) {
                el = detectorEl.children[i];
                if (Css.getStyle(el, 'display') === 'block') {
                    return el.getAttribute('data-ink-layout');
                }
            }

            return 'large';
        },


        /**
         * Sets the location's hash (window.location.hash).
         *
         * @method hashSet
         * @static
         * @param  {Object} o Object with the info to be placed in the location's hash.
         * @return {void}
         * @example
         *     // It will set the location's hash like: <url>#key1=value1&key2=value2&key3=value3
         *     Ink.UI.Common.hashSet({
         *         key1: 'value1',
         *         key2: 'value2',
         *         key3: 'value3'
         *     });
         */
        hashSet: function(o) {
            if (typeof o !== 'object') { throw new TypeError('o should be an object!'); }
            var hashParams = Url.getAnchorString();
            hashParams = Ink.extendObj(hashParams, o);
            window.location.hash = Url.genQueryString('', hashParams).substring(1);
        },

        /**
         * Removes children nodes from a given object.
         * This method was initially created to help solve a problem in Internet Explorer(s) that occurred when trying to set the innerHTML of some specific elements like 'table'.
         *
         * @method cleanChildren
         * @static
         * @param  {Element} parentEl Valid DOM Element
         * @return {void}
         * @public
         * @example
         *     <!-- Imagine the following HTML: -->
         *     <ul id="myUl">
         *       <li>One</li>
         *       <li>Two</li>
         *       <li>Three</li>
         *       <li>Four</li>
         *     </ul>
         *
         *     <script>
         *     Ink.UI.Common.cleanChildren( Ink.s( '#myUl' ) );
         *     </script>
         *
         *     <!-- After running it, the HTML changes to: -->
         *     <ul id="myUl"></ul>
         */
        cleanChildren: function(parentEl) {
            if( !Common.isDOMElement(parentEl) ){
                throw new Error('Please provide a valid DOMElement');
            }
            InkElement.setHTML(parentEl, '');
        },

        /**
         * Stores the id and/or classes of an element in an object.
         *
         * @method storeIdAndClasses
         * @static
         * @param  {Element}    fromEl    Valid DOM Element to get the id and classes from.
         * @param  {Object}     inObj     Object where the id and classes will be saved.
         * @return {void}
         * @public
         * @example
         *     <div id="myDiv" class="aClass"></div>
         *
         *     <script>
         *         var storageObj = {};
         *         Ink.UI.Common.storeIdAndClasses( Ink.s('#myDiv'), storageObj );
         *         // storageObj changes to:
         *         {
         *           _id: 'myDiv',
         *           _classes: 'aClass'
         *         }
         *     </script>
         */
        storeIdAndClasses: function(fromEl, inObj) {
            if( !Common.isDOMElement(fromEl) ){
                throw 'Please provide a valid Element as first parameter';
            }

            var id = fromEl.id;
            if (id) {
                inObj._id = id;
            }

            var classes = fromEl.className;
            if (classes) {
                inObj._classes = classes;
            }
        },

        /**
         * Sets the id and className properties of an element based 
         *
         * @method restoreIdAndClasses
         * @static
         * @param  {Element}    toEl    Valid DOM Element to set the id and classes on.
         * @param  {Object}     inObj   Object where the id and classes to be set are. This method uses the same format as the one given in `storeIdAndClasses`
         * @return {void}
         * @public
         * @example
         *     <div></div>
         *
         *     <script>
         *         var storageObj = {
         *           _id: 'myDiv',
         *           _classes: 'aClass'
         *         };
         *
         *         Ink.UI.Common.storeIdAndClasses( Ink.s('div'), storageObj );
         *     </script>
         *
         *     <!-- After the code runs the div element changes to: -->
         *     <div id="myDiv" class="aClass"></div>
         */
        restoreIdAndClasses: function(toEl, inObj) {

            if( !Common.isDOMElement(toEl) ){
                throw 'Please provide a valid Element as first parameter';
            }

            if (inObj._id && toEl.id !== inObj._id) {
                toEl.id = inObj._id;
            }

            if (inObj._classes && toEl.className.indexOf(inObj._classes) === -1) {
                if (toEl.className) { toEl.className += ' ' + inObj._classes; }
                else {                toEl.className  =       inObj._classes; }
            }

            if (inObj._instanceId && !toEl.getAttribute('data-instance')) {
                toEl.setAttribute('data-instance', inObj._instanceId);
            }
        },

        _warnDoubleInstantiation: function (elm, newInstance) {
            var instances = Common.getInstance(elm);

            if (getName(newInstance) === '') { return; }
            if (!instances) { return; }

            var nameWithoutVersion = getName(newInstance);

            if (!nameWithoutVersion) { return; }

            for (var i = 0, len = instances.length; i < len; i++) {
                if (nameWithoutVersion === getName(instances[i])) {
                    // Yes, I am using + to concatenate and , to split
                    // arguments.
                    //
                    // Elements can't be concatenated with strings, but if
                    // they are passed in an argument, modern debuggers will
                    // pretty-print them and make it easy to find them in the
                    // element inspector.
                    //
                    // On the other hand, if strings are passed as different
                    // arguments, they get pretty printed. And the pretty
                    // print of a string has quotes around it.
                    //
                    // If some day people find out that strings are not
                    // just text and they start preserving contextual
                    // information, then by all means change this to a
                    // regular concatenation.
                    //
                    // But they won't. So don't change this.
                    Ink.warn('Creating more than one ' + nameWithoutVersion + 'for the same element.',
                            '(Was creating a ' + nameWithoutVersion + ' on:', elm, ').');
                    return false;
                }
            }

            function getName(thing) {
                return ((thing.constructor && (thing.constructor._name)) ||
                    thing._name ||
                    '').replace(/_.*?$/, '');
            }

            return true;
        },

        /**
         * Saves an object (which should inherit BaseUIComponent) in the registry, associated with an element. You can retrieve it later by calling getInstance.
         *
         * This won't allow two instances of the same class to be created on a single element. It will fail and print a warning to the console if you try to do it. That is a common error when using Ink.
         *
         * @method registerInstance
         * @static
         * @param  {Object}   inst Object to be registered
         * @param  {Element}  [el=inst._element]   Element to associate with `inst`. Defaults to `_element` property of `inst`.
         * @return {Boolean} `true` if we could create the instance, `false` otherwise.
         */
        registerInstance: function(inst, el) {
            if (!inst) { return; }

            if (!el) { el = inst._element; }

            if (!Common.isDOMElement(el)) { throw new TypeError('Ink.UI.Common.registerInstance: The element passed in is not a DOM element!'); }

            // [todo] this belongs in the BaseUIComponent's initialization
            if (Common._warnDoubleInstantiation(el, inst) === false) {
                return false;
            }

            var instances = domRegistry.get(el);

            if (!instances) {
                instances = [];
                domRegistry.set(el, instances);
            }

            instances.push(inst);

            return true;
        },

        /**
         * Unregisters (removes from the registry) a UI component instance from whatever element it's on.
         *
         * @method unregisterInstance
         * @static
         * @param  {String}     inst       Instance to be unregistered.
         * @return {void}
         * @public
         */
        unregisterInstance: function(inst) {
            if (!inst || !inst._element) { return; }
            var instances = domRegistry.get(inst._element);
            for (var i = 0, len = instances.length; i < len; i++) {
                if (instances[i] === inst) {
                    instances.splice(i, 1);
                }
            }
        },

        /**
         * Gets an UI component instance from an element.
         *
         * This function is already available in the UI components' classes themselves. You can call Modal.getInstance() and retrieve a modal.
         *
         * @method getInstance
         * @static
         * @param  {String|Element} el Element from which we want the instances. A selector is okay.
         * @param {BaseUIComponent} [UIComponent] If you pass an Ink UI component class (Like Ink.UI.Modal or Ink.UI.Carousel), this won't return an array of all instances associated with the element. Instead it will return only the object which is an instance of that class.
         * @return  {Object|Array}               Returns an array containing all the instances in that element.
         * @public
         */
        getInstance: function(el, UIComponent) {
            var givenEl = el;  // So we can warn it later.

            el = Common.elOrSelector(el);

            if (!Common.isDOMElement(el)) {
                Ink.warn('Ink.UI.Common: getInstance called on non-element (' + givenEl + ')');
                return [];
            }

            var instances = domRegistry.get(el);

            if (!instances) {
                instances = [];
            }

            if (typeof UIComponent !== 'function') {
                return instances;
            }

            for (var i = 0, len = instances.length; i < len; i++) {
                if (instances[i] instanceof UIComponent) {
                    return instances[i];
                }
            }

            return null;
        },

        /**
         * Gets an instance based on a selector.
         *
         * @method getInstanceFromSelector
         * @static
         * @param  {String}             selector    CSS selector to get the instances from. This function will only use the *first* element.
         * @return  {Object|Array}               Returns an array of the instances in the selected element.
         * @public
         */
        getInstanceFromSelector: function(selector) {
            return Common.getInstance(selector);
        },

        /**
         * Gets all the instance ids
         *
         * @method getInstanceIds
         * @static
         * @return  {Array} Collection of instance ids
         */
        getInstanceIds: function() {
            if( _reg.length > 0 ) return _reg;
            var res = [];
            for (var id in instances) {
                if (instances.hasOwnProperty(id)) {
                    res.push( id );
                }
            }
            return res;
        },

        /**
         * Gets all the instances
         *
         * @method getInstances
         * @static
         * @return  {Array}     Collection of existing instances.
         * @public
         */
        getInstances: function() {
            if( _reg.length > 0 ) return _reg;
            var res = [];
            for (var id in instances) {
                if (instances.hasOwnProperty(id)) {
                    res.push( instances[id] );
                }
            }
            return res;
        },

        /**
         * Boilerplate method to destroy a component.
         * Components should copy this method as its destroy method and modify it.
         *
         * @method destroyComponent
         * @return {void}
         * @public
         * @static
         */
        destroyComponent: function() {
            Common.unregisterInstance(this);
            this._element.parentNode.removeChild(this._element);
        }
    };




    /**
     * Ink UI Base Class
     **/

    function warnStub() {
        /* jshint validthis: true */
        if (!this || this === window || typeof this.constructor !== 'function') { return; }
        Ink.warn('You called a method on an incorrectly instantiated ' + this.constructor._name + ' component. Check the warnings above to see what went wrong.');
    }

    function stub(prototype, obj) {
        for (var k in prototype) if (prototype.hasOwnProperty(k)) {
            if (k === 'constructor') { continue; }
            if (typeof obj[k] === 'function') {
                obj[k] = warnStub;
            }
        }
    }

    /**
     * Ink UI Base Class
     *
     * You don't use this class directly, or inherit from it directly.
     *
     * See createUIComponent() (in this module) for how to create a UI component and inherit from this. It's not plain old JS inheritance, for several reasons.
     *
     * @class Ink.UI.Common.BaseUIComponent
     * @constructor
     *
     * @param {Element|String} element Element to associate this UI component with. It's the element you can get later using `comp.getElement()`
     * @param {Object} [options] Options to pass to the component. You should see your specific UI component for this information.
     * @public
     **/
    function BaseUIComponent(element, options) {
        var constructor = this.constructor;
        var _name = constructor._name;

        if (!this || this === window) {
            throw new Error('Use "new InkComponent()" instead of "InkComponent()"');
        }

        if (this && !(this instanceof BaseUIComponent)) {
            throw new Error('You forgot to call Ink.UI.Common.createUIComponent() on this module!');
        }

        if (!element && !constructor._componentOptions.elementIsOptional) {
            Ink.error(new Error(_name + ': You need to pass an element or a selector as the first argument to "new ' + _name + '()"'));
            return;
        } else {
            this._element = Common.elsOrSelector(element,
                _name + ': An element with the selector "' + element + '" was not found!')[0];
        }

        if (!this._element && !constructor._componentOptions.elementIsOptional) {
            isValidInstance = false;
            Ink.error(new Error(element + ' does not match an element on the page. You need to pass a valid selector to "new ' + _name + '".'));
        }

        this._options = Common.options(_name, constructor._optionDefinition, options, this._element);

        var isValidInstance = BaseUIComponent._validateInstance(this) === true;

        if (isValidInstance && typeof this._init === 'function') {
            try {
                this._init.apply(this, arguments);
            } catch(e) {
                isValidInstance = false;
                Ink.error(e);
            }
        }

        if (!isValidInstance) {
            BaseUIComponent._stubInstance(this, constructor, _name);
        } else if (this._element) {
            Common.registerInstance(this);
        }
    }

    /**
     * Calls the `instance`'s _validate() method so it can validate itself.
     *
     * Returns false if the method exists, was called, but no Error was returned or thrown.
     *
     * @method _validateInstance
     * @private
     */
    BaseUIComponent._validateInstance = function (instance) {
        var err;

        if (typeof instance._validate !== 'function') { return true; }

        try {
            err = instance._validate();
        } catch (e) {
            err = e;
        }

        if (err instanceof Error) {
            instance._validationError = err;
            return false;
        }

        return true;
    };


    /**
     * Replaces every method in the instance with stub functions which just call Ink.warn().
     *
     * This avoids breaking the page when there are errors.
     *
     * @method _stubInstance
     * @param instance
     * @param constructor
     * @param name
     * @private
     */
    BaseUIComponent._stubInstance = function (instance, constructor, name) {
        stub(constructor.prototype, instance);
        stub(BaseUIComponent.prototype, instance);
        Ink.warn(name + ' was not correctly created. ' + (instance._validationError || ''));
    };

    // TODO BaseUIComponent.setGlobalOptions = function () {}
    // TODO BaseUIComponent.createMany = function (selector) {}
    BaseUIComponent.getInstance = function (elOrSelector) {
        elOrSelector = Common.elOrSelector(elOrSelector);
        return Common.getInstance(elOrSelector, this /* get instance by constructor */);
    };

    Ink.extendObj(BaseUIComponent.prototype, {
        /**
         * Get an UI component's option's value.
         *
         * @method getOption
         * @param {String} name The option's name.
         * @return {Mixed} The option value, or undefined if nothing is found.
         *
         * @example
         *
         * var myUIComponent = new Modal('#element', { trigger: '#trigger' }); // or anything else inheriting BaseUIComponent
         * myUIComponent.getOption('trigger');  // -> The trigger element (not the selector string, mind you)
         *
         **/
        getOption: function (name) {
            if (this.constructor && !(name in this.constructor._optionDefinition)) {
                Ink.error('"' + name + '" is not an option for ' + this.constructor._name);
                return undefined;
            }

            return this._options[name];
        },

        /**
         * Sets an option's value.
         *
         * @method getOption
         * @param {String} name Name of the option.
         * @param {Mixed} value New option value.
         * @return {void}
         * @public
         *
         * @example
         *
         * var myUIComponent = new Modal(...);
         * myUIComponent.setOption('trigger', '#some-element');
         **/
        setOption: function (name, value) {
            if (this.constructor && !(name in this.constructor._optionDefinition)) {
                Ink.error('"' + name + ' is not an option for ' + this.constructor._name);
                return;
            }

            this._options[name] = value;
        },

        /**
         * Get the element associated with an UI component (IE the one you used in the constructor)
         *
         * @method getElement
         * @return {Element} The component's element.
         *
         * @example
         * var myUIComponent = new Modal('#element'); // or anything else inheriting BaseUIComponent
         * myUIComponent.getElement();  // -> The '#element' (not the selector string, mind you).
         *
         **/
        getElement: function () {
            return this._element;
        }
    });

    Common.BaseUIComponent = BaseUIComponent;

    /**
     * Take a constructor, and make it an Ink UI component.
     *
     * Makes it inherit BaseUIComponent, makes sure it has the basic properties Ink.UI.Common needs it to have, adds the necessary static methods, sets its options, etc.
     *
     * @method createUIComponent
     * @param {Function} theConstructor UI component constructor. It should have an _init function in its prototype, an _optionDefinition object, and a _name property indicating its name.
     * @param {Object}  [options] Options hash, containing:
     * @param {Boolean} [options.elementIsOptional=false] Whether the element argument is optional (For example, when the component might work on existing markup or create its own).
     * @return {void}
     * @public
     **/
    Common.createUIComponent = function createUIComponent(theConstructor, options) {
        theConstructor._componentOptions = options || {};

        function assert(test, msg) {
            if (!test) {
                throw new Error('Ink.UI_1.createUIComponent: ' + msg);
            }
        }

        function assertProp(prop, propType, message) {
            var propVal = theConstructor[prop];
            // Check that the property was passed
            assert(typeof propVal !== 'undefined',
                theConstructor + ' doesn\'t have a "' + prop + '" property. ' + message);
            // Check that its type is correct
            assert(propType && typeof propVal === propType,
                'typeof ' + theConstructor + '.' + prop + ' is not "' + propType + '". ' + message);
        }

        assert(typeof theConstructor === 'function',
            'constructor argument is not a function!');

        assertProp('_name', 'string', 'This property is used for error ' +
            'messages. Set it to the full module path and version (Ink.My.Module_1).');
        assertProp('_optionDefinition', 'object', 'This property contains the ' +
            'option names, types and defaults. See Ink.UI.Common.options() for reference.');

        // Extend the instance methods and props
        var _oldProto = theConstructor.prototype;

        if (typeof Object.create === 'function') {
            theConstructor.prototype = Object.create(BaseUIComponent.prototype);
        } else {
            theConstructor.prototype = (function hideF() {
                function F() {}
                F.prototype = BaseUIComponent.prototype;
                return new F();
            }());
        }

        Ink.extendObj(theConstructor.prototype, _oldProto);
        theConstructor.prototype.constructor = theConstructor;
        // Extend static methods
        Ink.extendObj(theConstructor, BaseUIComponent);
    };

    return Common;

});
