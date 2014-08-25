/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-05-16 14:36:50 (f9be68accb407158ba2b1be2c226a6ce1f649314)
*/
// @tag dom,core
// @require Ext.Supports

/**
 * @private
 */
Ext.define('Ext.dom.AbstractElement', {
    requires: [
        'Ext.EventManager',
        'Ext.dom.AbstractElement_static',
        'Ext.dom.AbstractElement_insertion',
        'Ext.dom.AbstractElement_style',
        'Ext.dom.AbstractElement_traversal'
    ],

    trimRe: /^\s+|\s+$/g,
    whitespaceRe: /\s/,
    
    inheritableStatics: {
        trimRe: /^\s+|\s+$/g,
        whitespaceRe: /\s/,

        /**
         * Retrieves Ext.dom.Element objects. {@link Ext#get} is alias for {@link Ext.dom.Element#get}.
         *
         * **This method does not retrieve {@link Ext.Component Component}s.** This method retrieves Ext.dom.Element
         * objects which encapsulate DOM elements. To retrieve a Component by its ID, use {@link Ext.ComponentManager#get}.
         * 
         * When passing an id, it should not include the `#` character that is used for a css selector.
         * 
         *     // For an element with id 'foo'
         *     Ext.get('foo'); // Correct
         *     Ext.get('#foo'); // Incorrect
         *
         * Uses simple caching to consistently return the same object. Automatically fixes if an object was recreated with
         * the same id via AJAX or DOM.
         *
         * @param {String/HTMLElement/Ext.Element} el The id of the node, a DOM Node or an existing Element.
         * @return {Ext.dom.Element} The Element object (or null if no matching element was found)
         * @static
         * @inheritable
         */
        get: function(el) {
            var me = this,
                document = window.document,
                El = Ext.dom.Element,
                cacheItem,
                docEl,
                extEl,
                dom,
                id;

            if (!el) {
                return null;
            }

            // Ext.get(flyweight) must return an Element instance, not the flyweight
            if (el.isFly) {
                el = el.dom;
            }

            if (typeof el == "string") { // element id
                if (el == Ext.windowId) {
                    return El.get(window);
                } else if (el == Ext.documentId) {
                    return El.get(document);
                }
                
                cacheItem = Ext.cache[el];
                // This code is here to catch the case where we've got a reference to a document of an iframe
                // It getElementById will fail because it's not part of the document, so if we're skipping
                // GC it means it's a window/document object that isn't the default window/document, which we have
                // already handled above
                if (cacheItem && cacheItem.skipGarbageCollection) {
                    extEl = cacheItem.el;
                    return extEl;
                }
                
                if (!(dom = document.getElementById(el))) {
                    return null;
                }

                if (cacheItem && cacheItem.el) {
                    extEl = Ext.updateCacheEntry(cacheItem, dom).el;
                } else {
                    // Force new element if there's a cache but no el attached
                    extEl = new El(dom, !!cacheItem);
                }
                return extEl;
            } else if (el.tagName) { // dom element
                if (!(id = el.id)) {
                    id = Ext.id(el);
                }
                cacheItem = Ext.cache[id];
                if (cacheItem && cacheItem.el) {
                    extEl = Ext.updateCacheEntry(cacheItem, el).el;
                } else {
                    // Force new element if there's a cache but no el attached
                    extEl = new El(el, !!cacheItem);
                }
                return extEl;
            } else if (el instanceof me) {
                if (el != me.docEl && el != me.winEl) {
                    id = el.id;
                    // refresh dom element in case no longer valid,
                    // catch case where it hasn't been appended
                    cacheItem = Ext.cache[id];
                    if (cacheItem) {
                        Ext.updateCacheEntry(cacheItem, document.getElementById(id) || el.dom);
                    }
                }
                return el;
            } else if (el.isComposite) {
                return el;
            } else if (Ext.isArray(el)) {
                return me.select(el);
            } else if (el === document) {
                // create a bogus element object representing the document object
                if (!me.docEl) {
                    docEl = me.docEl = Ext.Object.chain(El.prototype);
                    docEl.dom = document;
                    // set an "el" property on the element that references itself.
                    // This allows Ext.util.Positionable methods to operate on
                    // this.el.dom since it gets mixed into both Element and Component
                    docEl.el = docEl;
                    docEl.id = Ext.id(document);
                    me.addToCache(docEl);
                }
                return me.docEl;
            } else if (el === window) {
                if (!me.winEl) {
                    me.winEl = Ext.Object.chain(El.prototype);
                    me.winEl.dom = window;
                    me.winEl.id = Ext.id(window);
                    me.addToCache(me.winEl);
                }
                return me.winEl;
            }
            return null;
        },

        addToCache: function(el, id) {
            if (el) {
                Ext.addCacheEntry(id, el);
            }
            return el;
        },

        addMethods: function() {
            this.override.apply(this, arguments);
        },

        /**
         * <p>Returns an array of unique class names based upon the input strings, or string arrays.</p>
         * <p>The number of parameters is unlimited.</p>
         * <p>Example</p><pre><code>
// Add x-invalid and x-mandatory classes, do not duplicate
myElement.dom.className = Ext.core.Element.mergeClsList(this.initialClasses, 'x-invalid x-mandatory');
</code></pre>
         * @param {Mixed} clsList1 A string of class names, or an array of class names.
         * @param {Mixed} clsList2 A string of class names, or an array of class names.
         * @return {Array} An array of strings representing remaining unique, merged class names. If class names were added to the first list, the <code>changed</code> property will be <code>true</code>.
         * @static
         * @inheritable
         */
        mergeClsList: function() {
            var clsList, clsHash = {},
                i, length, j, listLength, clsName, result = [],
                changed = false,
                trimRe = this.trimRe,
                whitespaceRe = this.whitespaceRe;

            for (i = 0, length = arguments.length; i < length; i++) {
                clsList = arguments[i];
                if (Ext.isString(clsList)) {
                    clsList = clsList.replace(trimRe, '').split(whitespaceRe);
                }
                if (clsList) {
                    for (j = 0, listLength = clsList.length; j < listLength; j++) {
                        clsName = clsList[j];
                        if (!clsHash[clsName]) {
                            if (i) {
                                changed = true;
                            }
                            clsHash[clsName] = true;
                        }
                    }
                }
            }

            for (clsName in clsHash) {
                result.push(clsName);
            }
            result.changed = changed;
            return result;
        },

        /**
         * <p>Returns an array of unique class names deom the first parameter with all class names
         * from the second parameter removed.</p>
         * <p>Example</p><pre><code>
// Remove x-invalid and x-mandatory classes if present.
myElement.dom.className = Ext.core.Element.removeCls(this.initialClasses, 'x-invalid x-mandatory');
</code></pre>
         * @param {Mixed} existingClsList A string of class names, or an array of class names.
         * @param {Mixed} removeClsList A string of class names, or an array of class names to remove from <code>existingClsList</code>.
         * @return {Array} An array of strings representing remaining class names. If class names were removed, the <code>changed</code> property will be <code>true</code>.
         * @static
         * @inheritable
         */
        removeCls: function(existingClsList, removeClsList) {
            var clsHash = {},
                i, length, clsName, result = [],
                changed = false,
                whitespaceRe = this.whitespaceRe;

            if (existingClsList) {
                if (Ext.isString(existingClsList)) {
                    existingClsList = existingClsList.replace(this.trimRe, '').split(whitespaceRe);
                }
                for (i = 0, length = existingClsList.length; i < length; i++) {
                    clsHash[existingClsList[i]] = true;
                }
            }
            if (removeClsList) {
                if (Ext.isString(removeClsList)) {
                    removeClsList = removeClsList.split(whitespaceRe);
                }
                for (i = 0, length = removeClsList.length; i < length; i++) {
                    clsName = removeClsList[i];
                    if (clsHash[clsName]) {
                        changed = true;
                        delete clsHash[clsName];
                    }
                }
            }
            for (clsName in clsHash) {
                result.push(clsName);
            }
            result.changed = changed;
            return result;
        },

        /**
         * @property {Number}
         * Visibility mode constant for use with {@link Ext.dom.Element#setVisibilityMode}. 
         * Use the CSS 'visibility' property to hide the element.
         *
         * Note that in this mode, {@link Ext.dom.Element#isVisible isVisible} may return true
         * for an element even though it actually has a parent element that is hidden. For this
         * reason, and in most cases, using the {@link #OFFSETS} mode is a better choice.
         * @static
         * @inheritable
         */
        VISIBILITY: 1,

        /**
         * @property {Number}
         * Visibility mode constant for use with {@link Ext.dom.Element#setVisibilityMode}. 
         * Use the CSS 'display' property to hide the element.
         * @static
         * @inheritable
         */
        DISPLAY: 2,

        /**
         * @property {Number}
         * Visibility mode constant for use with {@link Ext.dom.Element#setVisibilityMode}. 
         * Use CSS absolute positioning and top/left offsets to hide the element.
         * @static
         * @inheritable
         */
        OFFSETS: 3,

        /**
         * @property {Number}
         * Visibility mode constant for use with {@link Ext.dom.Element#setVisibilityMode}. 
         * Add or remove the {@link Ext.Layer#visibilityCls} class to hide the element.
         * @static
         * @inheritable
         */
        ASCLASS: 4
    },

    constructor: function(element, forceNew) {
        var me = this,
            dom = typeof element == 'string'
                ? document.getElementById(element)
                : element,
            id;

        // set an "el" property that references "this".  This allows
        // Ext.util.Positionable methods to operate on this.el.dom since it
        // gets mixed into both Element and Component
        me.el = me;

        if (!dom) {
            return null;
        }

        id = dom.id;
        if (!forceNew && id && Ext.cache[id]) {
            // element object already exists
            return Ext.cache[id].el;
        }

        /**
         * @property {HTMLElement} dom
         * The DOM element
         */
        me.dom = dom;

        /**
         * @property {String} id
         * The DOM element ID
         */
        me.id = id || Ext.id(dom);

        me.self.addToCache(me);
    },

    /**
     * Sets the passed attributes as attributes of this element (a style attribute can be a string, object or function)
     * @param {Object} o The object with the attributes
     * @param {Boolean} [useSet=true] false to override the default setAttribute to use expandos.
     * @return {Ext.dom.Element} this
     */
    set: function(o, useSet) {
         var el = this.dom,
             attr,
             value;

         for (attr in o) {
             if (o.hasOwnProperty(attr)) {
                 value = o[attr];
                 if (attr == 'style') {
                     this.applyStyles(value);
                 }
                 else if (attr == 'cls') {
                     el.className = value;
                 }
                 else if (useSet !== false) {
                     if (value === undefined) {
                         el.removeAttribute(attr);
                     } else {
                        el.setAttribute(attr, value);
                     }
                 }
                 else {
                     el[attr] = value;
                 }
             }
         }
         return this;
     },

    /**
     * @property {String} defaultUnit
     * The default unit to append to CSS values where a unit isn't provided.
     */
    defaultUnit: "px",

    /**
     * Returns true if this element matches the passed simple selector (e.g. div.some-class or span:first-child)
     * @param {String} selector The simple selector to test
     * @return {Boolean} True if this element matches the selector, else false
     */
    is: function(simpleSelector) {
        return Ext.DomQuery.is(this.dom, simpleSelector);
    },

    /**
     * Returns the value of the "value" attribute
     * @param {Boolean} asNumber true to parse the value as a number
     * @return {String/Number}
     */
    getValue: function(asNumber) {
        var val = this.dom.value;
        return asNumber ? parseInt(val, 10) : val;
    },

    /**
     * Removes this element's dom reference. Note that event and cache removal is handled at {@link Ext#removeNode
     * Ext.removeNode}
     */
    remove: function() {
        var me = this,
            dom = me.dom;
            
        if (me.isAnimate) {
            me.stopAnimation();
        }

        if (dom) {
            Ext.removeNode(dom);
            delete me.dom;
        }
    },

    /**
     * Returns true if this element is an ancestor of the passed element
     * @param {HTMLElement/String} el The element to check
     * @return {Boolean} True if this element is an ancestor of el, else false
     */
    contains: function(el) {
        if (!el) {
            return false;
        }

        var me = this,
            dom = el.dom || el;

        // we need el-contains-itself logic here because isAncestor does not do that:
        return (dom === me.dom) || Ext.dom.AbstractElement.isAncestor(me.dom, dom);
    },

    /**
     * Returns the value of an attribute from the element's underlying DOM node.
     * @param {String} name The attribute name
     * @param {String} [namespace] The namespace in which to look for the attribute
     * @return {String} The attribute value
     */
    getAttribute: function(name, ns) {
        var dom = this.dom;
        return dom.getAttributeNS(ns, name) || dom.getAttribute(ns + ":" + name) || dom.getAttribute(name) || dom[name];
    },

    /**
     * Update the innerHTML of this element
     * @param {String} html The new HTML
     * @return {Ext.dom.Element} this
     */
    update: function(html) {
        if (this.dom) {
            this.dom.innerHTML = html;
        }
        return this;
    },


    /**
    * Set the innerHTML of this element
    * @param {String} html The new HTML
    * @return {Ext.Element} this
     */
    setHTML: function(html) {
        if(this.dom) {
            this.dom.innerHTML = html;
        }
        return this;
    },

    /**
     * Returns the innerHTML of an Element or an empty string if the element's
     * dom no longer exists.
     */
    getHTML: function() {
        return this.dom ? this.dom.innerHTML : '';
    },

    /**
     * Hide this element - Uses display mode to determine whether to use "display" or "visibility". See {@link #setVisible}.
     * @param {Boolean/Object} animate (optional) true for the default animation or a standard Element animation config object
     * @return {Ext.Element} this
     */
    hide: function() {
        this.setVisible(false);
        return this;
    },

    /**
     * Show this element - Uses display mode to determine whether to use "display" or "visibility". See {@link #setVisible}.
     * @param {Boolean/Object} animate (optional) true for the default animation or a standard Element animation config object
     * @return {Ext.Element} this
     */
    show: function() {
        this.setVisible(true);
        return this;
    },

    /**
     * Sets the visibility of the element (see details). If the visibilityMode is set to Element.DISPLAY, it will use
     * the display property to hide the element, otherwise it uses visibility. The default is to hide and show using the visibility property.
     * @param {Boolean} visible Whether the element is visible
     * @param {Boolean/Object} animate (optional) True for the default animation, or a standard Element animation config object
     * @return {Ext.Element} this
     */
    setVisible: function(visible, animate) {
        var me = this,
            statics = me.self,
            mode = me.getVisibilityMode(),
            prefix = Ext.baseCSSPrefix;

        switch (mode) {
            case statics.VISIBILITY:
                me.removeCls([prefix + 'hidden-display', prefix + 'hidden-offsets']);
                me[visible ? 'removeCls' : 'addCls'](prefix + 'hidden-visibility');
            break;

            case statics.DISPLAY:
                me.removeCls([prefix + 'hidden-visibility', prefix + 'hidden-offsets']);
                me[visible ? 'removeCls' : 'addCls'](prefix + 'hidden-display');
            break;

            case statics.OFFSETS:
                me.removeCls([prefix + 'hidden-visibility', prefix + 'hidden-display']);
                me[visible ? 'removeCls' : 'addCls'](prefix + 'hidden-offsets');
            break;
        }

        return me;
    },

    getVisibilityMode: function() {
        // Only flyweights won't have a $cache object, by calling getCache the cache
        // will be created for future accesses. As such, we're eliminating the method
        // call since it's mostly redundant
        var data = (this.$cache || this.getCache()).data,
            visMode = data.visibilityMode;

        if (visMode === undefined) {
            data.visibilityMode = visMode = this.self.DISPLAY;
        }
        
        return visMode;
    },

    /**
     * Use this to change the visibility mode between {@link #VISIBILITY}, {@link #DISPLAY}, {@link #OFFSETS} or {@link #ASCLASS}.
     */
    setVisibilityMode: function(mode) {
        (this.$cache || this.getCache()).data.visibilityMode = mode;
        return this;
    },
    
    getCache: function() {
        var me = this,
            id = me.dom.id || Ext.id(me.dom);

        // Note that we do not assign an ID to the calling object here.
        // An Ext.dom.Element will have one assigned at construction, and an Ext.dom.Element.Fly must not have one.
        // We assign an ID to the DOM element if it does not have one.
        me.$cache = Ext.cache[id] || Ext.addCacheEntry(id, null, me.dom);
            
        return me.$cache;
    }
},
function() {
    var AbstractElement = this;

    /**
     * @private
     * @member Ext
     */
    Ext.getDetachedBody = function () {
        var detachedEl = AbstractElement.detachedBodyEl;

        if (!detachedEl) {
            detachedEl = document.createElement('div');
            AbstractElement.detachedBodyEl = detachedEl = new AbstractElement.Fly(detachedEl);
            detachedEl.isDetachedBody = true;
        }

        return detachedEl;
    };

    /**
     * @private
     * @member Ext
     */
    Ext.getElementById = function (id) {
        var el = document.getElementById(id),
            detachedBodyEl;

        if (!el && (detachedBodyEl = AbstractElement.detachedBodyEl)) {
            el = detachedBodyEl.dom.querySelector('#' + Ext.escapeId(id));
        }

        return el;
    };

    /**
     * @member Ext
     * @method get
     * @inheritdoc Ext.dom.Element#get
     */
    Ext.get = function(el) {
        return Ext.dom.Element.get(el);
    };

    this.addStatics({
        /**
         * @class Ext.dom.Element.Fly
         * @alternateClassName Ext.dom.AbstractElement.Fly
         * @extends Ext.dom.Element
         *
         * A non-persistent wrapper for a DOM element which may be used to execute methods of {@link Ext.dom.Element}
         * upon a DOM element without creating an instance of {@link Ext.dom.Element}.
         *
         * A **singleton** instance of this class is returned when you use {@link Ext#fly}
         *
         * Because it is a singleton, this Flyweight does not have an ID, and must be used and discarded in a single line.
         * You should not keep and use the reference to this singleton over multiple lines because methods that you call
         * may themselves make use of {@link Ext#fly} and may change the DOM element to which the instance refers.
         */
        Fly: new Ext.Class({
            // Although here the class is extending from AbstractElement,
            // the class will be overwritten by Element definition with
            // a class extending from Element instead.
            // Therefore above we document it as extending Ext.Element.
            extend: AbstractElement,

            /**
             * @property {Boolean} isFly
             * This is `true` to identify Element flyweights
             */
            isFly: true,

            constructor: function(dom) {
                this.dom = dom;
                // set an "el" property that references "this".  This allows
                // Ext.util.Positionable methods to operate on this.el.dom since it
                // gets mixed into both Element and Component
                this.el = this;
            },

            /**
             * @private
             * Attach this fliyweight instance to the passed DOM element.
             *
             * Note that a flightweight does **not** have an ID, and does not acquire the ID of the DOM element.
             */
            attach: function (dom) {

                // Attach to the passed DOM element. The same code as in Ext.Fly
                this.dom = dom;
                // Use cached data if there is existing cached data for the referenced DOM element,
                // otherwise it will be created when needed by getCache.
                this.$cache = dom.id ? Ext.cache[dom.id] : null;
                return this;
            }
        }),

        _flyweights: {},

        /**
         * Gets the singleton {@link Ext.dom.Element.Fly flyweight} element, with the passed node as the active element.
         * 
         * Because it is a singleton, this Flyweight does not have an ID, and must be used and discarded in a single line.
         * You may not keep and use the reference to this singleton over multiple lines because methods that you call
         * may themselves make use of {@link Ext#fly} and may change the DOM element to which the instance refers.
         *  
         * {@link Ext#fly} is alias for {@link Ext.dom.AbstractElement#fly}.
         *
         * Use this to make one-time references to DOM elements which are not going to be accessed again either by
         * application code, or by Ext's classes. If accessing an element which will be processed regularly, then {@link
         * Ext#get Ext.get} will be more appropriate to take advantage of the caching provided by the Ext.dom.Element
         * class.
         *
         * @param {String/HTMLElement} dom The dom node or id
         * @param {String} [named] Allows for creation of named reusable flyweights to prevent conflicts (e.g.
         * internally Ext uses "_global")
         * @return {Ext.dom.Element.Fly} The singleton flyweight object (or null if no matching element was found)
         * @static
         * @member Ext.dom.AbstractElement
         */
        fly: function(dom, named) {
            var fly = null,
                _flyweights = AbstractElement._flyweights;

            named = named || '_global';

            dom = Ext.getDom(dom);

            if (dom) {
                fly = _flyweights[named] || (_flyweights[named] = new AbstractElement.Fly());

                // Attach to the passed DOM element.
                // This code performs the same function as Fly.attach, but inline it for efficiency
                fly.dom = dom;
                // Use cached data if there is existing cached data for the referenced DOM element,
                // otherwise it will be created when needed by getCache.
                fly.$cache = dom.id ? Ext.cache[dom.id] : null;
            }
            return fly;
        }
    });

    /**
     * @member Ext
     * @method fly
     * @inheritdoc Ext.dom.AbstractElement#fly
     */
    Ext.fly = function() {
        return AbstractElement.fly.apply(AbstractElement, arguments);
    };

    (function (proto) {
        /**
         * @method destroy
         * @member Ext.dom.AbstractElement
         * @inheritdoc Ext.dom.AbstractElement#remove
         * Alias to {@link #remove}.
         */
        proto.destroy = proto.remove;

        /**
         * Returns a child element of this element given its `id`.
         * @method getById
         * @member Ext.dom.AbstractElement
         * @param {String} id The id of the desired child element.
         * @param {Boolean} [asDom=false] True to return the DOM element, false to return a
         * wrapped Element object.
         */
        if (document.querySelector) {
            proto.getById = function (id, asDom) {
                // for normal elements getElementById is the best solution, but if the el is
                // not part of the document.body, we have to resort to querySelector
                var dom = document.getElementById(id) ||
                    this.dom.querySelector('#'+Ext.escapeId(id));
                return asDom ? dom : (dom ? Ext.get(dom) : null);
            };
        } else {
            proto.getById = function (id, asDom) {
                var dom = document.getElementById(id);
                return asDom ? dom : (dom ? Ext.get(dom) : null);
            };
        }
    }(this.prototype));
});
