/**
 * @module Ink.UI.Common_1
 * @author inkdev AT sapo.pt
 * @version 1
 */
Ink.createModule('Ink.UI.Common', '1', ['Ink.Dom.Element_1', 'Ink.Net.Ajax_1','Ink.Dom.Css_1','Ink.Dom.Selector_1','Ink.Util.Url_1'], function(InkElement, Ajax,Css,Selector,Url) {

    'use strict';

    var instances = {};
    var lastIdNum = 0;
    var nothing = {} /* a marker, for reference comparison. */;

    var keys = Object.keys || function (obj) {
        var ret = [];
        for (var k in obj) if (obj.hasOwnProperty(k)) {
            ret.push(k);
        }
        return ret;
    };

    /**
     * The Common class provides auxiliar methods to ease some of the most common/repetitive UI tasks.
     *
     * @class Ink.UI.Common
     * @version 1
     * @static
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
            SMALL:  'small',
            MEDIUM: 'medium',
            LARGE:  'large'
        },

        /**
         * Method to check if an item is a valid DOM Element.
         *
         * @method isDOMElement
         * @static
         * @param {Mixed} o     The object to be checked.
         * @return {Boolean}    True if it's a valid DOM Element.
         * @example
         *     var el = Ink.s('#element');
         *     if( Ink.UI.Common.isDOMElement( el ) === true ){
         *         // It is a DOM Element.
         *     } else {
         *         // It is NOT a DOM Element.
         *     }
         */
        isDOMElement: function(o) {
            return o && typeof o === 'object' && 'nodeType' in o && o.nodeType === 1;
        },

        /**
         * Method to check if an item is a valid integer.
         *
         * @method isInteger
         * @static
         * @param {Mixed} n     The value to be checked.
         * @return {Boolean}    True if 'n' is a valid integer.
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
         * Method to get a DOM Element. The first parameter should be either a DOM Element or a valid CSS Selector.
         * If not, then it will throw an exception. Otherwise, it returns a DOM Element.
         *
         * @method elOrSelector
         * @static
         * @param  {DOMElement|String} elOrSelector DOM Element or CSS Selector
         * @param  {String}            fieldName    This field is used in the thrown Exception to identify the parameter.
         * @return {DOMElement} Returns the DOMElement passed or the first result of the CSS Selector. Otherwise it throws an exception.
         * @example
         *     // In case there are several .myInput, it will retrieve the first found
         *     var el = Ink.UI.Common.elOrSelector('.myInput','My Input');
         */
        elOrSelector: function(elOrSelector, fieldName) {
            if (!this.isDOMElement(elOrSelector)) {
                var t = Selector.select(elOrSelector);
                if (t.length === 0) { throw new TypeError(fieldName + ' must either be a DOM Element or a selector expression!\nThe script element must also be after the DOM Element itself.'); }
                return t[0];
            }
            return elOrSelector;
        },

        /**
         * Does the same as `elOrSelector` but returns an array of elements.
         *
         * see elOrSelector
         *
         * @method elsOrSelector
         *
         * @static
         *
         * @param ... (See elOrSelector's params)
         * @param {Boolean} required If true, accept an empty array as output.
         * @return {Array} The selected DOM Elements.
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
                if (required || arguments.length === 2) {
                    throw new TypeError(fieldName + ' must either be a DOM Element, an Array of elements, or a selector expression!\nThe script element must also be after the DOM Element itself.');
                } else {
                    return [];
                }
            }
        },

        /**
         * Get options from an "options" object and the Element's data attributes.
         *
         * The element's data attributes take precedence.
         * 
         * Values from the element's data-atrributes are coerced into the required type.
         *
         * Mainly for Ink UI.* modules
         *
         * @method options
         *
         * @param {Object}     [fieldId=''] Tag used in thrown exceptions: "<fieldId>: ..."
         * @param {Object}      defaults    Object with arrays of option defaults
         * @param {Object}      overrides   Object containing options given from user through JavaScript
         * @param {DOMElement} [element]    Element with data-attributes
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
                }
            };
            types['float'] = types.number;
            return types;
        }()),

        /**
         * Method to make a deep copy (clone) of an object.
         * Note: The object cannot have loops.
         *
         * @method clone
         * @static
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
         * Method to return the 'nth' position that an element occupies relatively to its parent.
         *
         * @method childIndex
         * @static
         * @param  {DOMElement} childEl Valid DOM Element.
         * @return {Number} Numerical position of an element relatively to its parent.
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
        childIndex: function(childEl) {
            if( Common.isDOMElement(childEl) ){
                var els = Selector.select('> *', childEl.parentNode);
                for (var i = 0, f = els.length; i < f; ++i) {
                    if (els[i] === childEl) {
                        return i;
                    }
                }
            }
            throw 'not found!';
        },


        /**
         * This method provides a more convenient way to do an async AJAX request and expect a JSON response.
         * It offers a callback option, as third paramenter, for a better async handling.
         *
         * @method ajaxJSON
         * @static
         * @async
         * @param  {String} endpoint    Valid URL to be used as target by the request.
         * @param  {Object} params      This field is used in the thrown Exception to identify the parameter.
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
         * Method to get the current Ink layout applied.
         *
         * @method currentLayout
         * @static
         * @return {String}         'small', 'medium' or 'large'
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
                for (k in this.Layouts) {
                    if (this.Layouts.hasOwnProperty(k)) {
                        v = this.Layouts[k];
                        el = document.createElement('div');
                        el.className = 'show-' + v + ' hide-all';
                        el.setAttribute('data-ink-layout', v);
                        detectorEl.appendChild(el);
                    }
                }
                document.body.appendChild(detectorEl);
            }

            var result = '';
            var resultCount = 0;
            for (i = 0, f = detectorEl.childNodes.length; i < f; ++i) {
                el = detectorEl.childNodes[i];
                if (Css.getStyle(el, 'display') === 'block') {
                    result = el.getAttribute('data-ink-layout');
                    resultCount += 1;
                }
            }

            if (resultCount === 1) {
                return result;
            } else {
                return 'large';
            }
        },


        /**
         * Method to set the location's hash (window.location.hash).
         *
         * @method hashSet
         * @static
         * @param  {Object} o   Object with the info to be placed in the location's hash.
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
         * Method to remove children nodes from a given object.
         * This method was initially created to help solve a problem in Internet Explorer(s) that occurred when trying
         * to set the innerHTML of some specific elements like 'table'.
         *
         * @method cleanChildren
         * @static
         * @param  {DOMElement} parentEl Valid DOM Element
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
                throw 'Please provide a valid DOMElement';
            }
            var prevEl, el = parentEl.lastChild;
            while (el) {
                prevEl = el.previousSibling;
                parentEl.removeChild(el);
                el = prevEl;
            }
        },

        /**
         * This method stores the id and/or the classes of a given element in a given object.
         *
         * @method storeIdAndClasses
         * @static
         * @param  {DOMElement} fromEl    Valid DOM Element to get the id and classes from.
         * @param  {Object}     inObj     Object where the id and classes will be saved.
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
                throw 'Please provide a valid DOMElement as first parameter';
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
         * This method sets the id and className properties of a given DOM Element based on a given similar object
         * resultant of the previous function 'storeIdAndClasses'.
         *
         * @method restoreIdAndClasses
         * @static
         * @param  {DOMElement} toEl    Valid DOM Element to set the id and classes on.
         * @param  {Object}     inObj   Object where the id and classes to be set are.
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
                throw 'Please provide a valid DOMElement as first parameter';
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

        /**
         * This method saves a component's instance reference for later retrieval.
         *
         * @method registerInstance
         * @static
         * @param  {Object}     inst                Object that holds the instance.
         * @param  {DOMElement} el                  DOM Element to associate with the object.
         * @param  {Object}     [optionalPrefix]    Defaults to 'instance'
         */
        registerInstance: function(inst, el, optionalPrefix) {
            if (inst._instanceId) { return; }

            if (typeof inst !== 'object') { throw new TypeError('1st argument must be a JavaScript object!'); }

            if (inst._options && inst._options.skipRegister) { return; }

            if (!this.isDOMElement(el)) { throw new TypeError('2nd argument must be a DOM element!'); }
            if (optionalPrefix !== undefined && typeof optionalPrefix !== 'string') { throw new TypeError('3rd argument must be a string!'); }
            var id = (optionalPrefix || 'instance') + (++lastIdNum);
            instances[id] = inst;
            inst._instanceId = id;
            var dataInst = el.getAttribute('data-instance');
            dataInst = (dataInst !== null) ? [dataInst, id].join(' ') : id;
            el.setAttribute('data-instance', dataInst);
        },

        /**
         * This method deletes/destroy an instance with a given id.
         *
         * @method unregisterInstance
         * @static
         * @param  {String}     id       Id of the instance to be destroyed.
         */
        unregisterInstance: function(id) {
            delete instances[id];
        },

        /**
         * This method retrieves the registered instance(s) of a given element or instance id.
         *
         * @method getInstance
         * @static
         * @param  {String|DOMElement}      instanceIdOrElement      Instance's id or DOM Element from which we want the instances.
         * @return  {Object|Object[]}       Returns an instance or a collection of instances.
         */
        getInstance: function(instanceIdOrElement) {
            var ids;
            if (this.isDOMElement(instanceIdOrElement)) {
                ids = instanceIdOrElement.getAttribute('data-instance');
                if (ids === null) { throw new Error('argument is not a DOM instance element!'); }
            }
            else {
                ids = instanceIdOrElement;
            }

            ids = ids.split(' ');
            var inst, id, i, l = ids.length;

            var res = [];
            for (i = 0; i < l; ++i) {
                id = ids[i];
                if (!id) { throw new Error('Element is not a JS instance!'); }
                inst = instances[id];
                if (!inst) { throw new Error('Instance "' + id + '" not found!'); }
                res.push(inst);
            }

            return (l === 1) ? res[0] : res;
        },

        /**
         * This method retrieves the registered instance(s) of an element based on the given selector.
         *
         * @method getInstanceFromSelector
         * @static
         * @param  {String}             selector    CSS selector to define the element from which it'll get the instance(s).
         * @return  {Object|Object[]}               Returns an instance or a collection of instances.
         */
        getInstanceFromSelector: function(selector) {
            var el = Selector.select(selector)[0];
            if (!el) { throw new Error('Element not found!'); }
            return this.getInstance(el);
        },

        /**
         * This method retrieves the registered instances' ids of all instances.
         *
         * @method getInstanceIds
         * @static
         * @return  {String[]}     Id or collection of ids of all existing instances.
         */
        getInstanceIds: function() {
            var res = [];
            for (var id in instances) {
                if (instances.hasOwnProperty(id)) {
                    res.push( id );
                }
            }
            return res;
        },

        /**
         * This method retrieves all existing instances.
         *
         * @method getInstances
         * @static
         * @return  {Object[]}     Collection of existing instances.
         */
        getInstances: function() {
            var res = [];
            for (var id in instances) {
                if (instances.hasOwnProperty(id)) {
                    res.push( instances[id] );
                }
            }
            return res;
        },

        /**
         * This method is not to supposed to be invoked by the Common component.
         * Components should copy this method as its destroy method.
         *
         * @method destroyComponent
         * @static
         */
        destroyComponent: function() {
            Common.unregisterInstance(this._instanceId);
            this._element.parentNode.removeChild(this._element);
        }

    };

    return Common;

});
