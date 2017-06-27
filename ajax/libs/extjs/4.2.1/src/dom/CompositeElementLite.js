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
/**
 * This class encapsulates a *collection* of DOM elements, providing methods to filter members, or to perform collective
 * actions upon the whole set.
 *
 * Although they are not listed, this class supports all of the methods of {@link Ext.dom.Element} and
 * {@link Ext.fx.Anim}. The methods from these classes will be performed on all the elements in this collection.
 *
 * Example:
 *
 *     var els = Ext.select("#some-el div.some-class");
 *     // or select directly from an existing element
 *     var el = Ext.get('some-el');
 *     el.select('div.some-class');
 *
 *     els.setWidth(100); // all elements become 100 width
 *     els.hide(true); // all elements fade out and hide
 *     // or
 *     els.setWidth(100).hide(true);
 */
Ext.define('Ext.dom.CompositeElementLite', {
    alternateClassName: 'Ext.CompositeElementLite',

    requires: ['Ext.dom.Element', 'Ext.dom.Query'],

    statics: {
        /**
         * @private
         * Copies all of the functions from Ext.dom.Element's prototype onto CompositeElementLite's prototype.
         * This is called twice - once immediately below, and once again after additional Ext.dom.Element
         * are added in Ext JS
         */
        importElementMethods: function() {
            var name,
                elementPrototype = Ext.dom.Element.prototype,
                prototype = this.prototype;

            for (name in elementPrototype) {
                if (typeof elementPrototype[name] == 'function'){
                    (function(key) {
                        prototype[key] = prototype[key] || function() {
                            return this.invoke(key, arguments);
                        };
                    }).call(prototype, name);

                }
            }
        }
    },

    constructor: function(elements, root) {
        /**
         * @property {HTMLElement[]} elements
         * The Array of DOM elements which this CompositeElement encapsulates.
         *
         * This will not *usually* be accessed in developers' code, but developers wishing to augment the capabilities
         * of the CompositeElementLite class may use it when adding methods to the class.
         *
         * For example to add the `nextAll` method to the class to **add** all following siblings of selected elements,
         * the code would be
         *
         *     Ext.override(Ext.dom.CompositeElementLite, {
         *         nextAll: function() {
         *             var elements = this.elements, i, l = elements.length, n, r = [], ri = -1;
         *              
         *             // Loop through all elements in this Composite, accumulating
         *             // an Array of all siblings.
         *             for (i = 0; i < l; i++) {
         *                 for (n = elements[i].nextSibling; n; n = n.nextSibling) {
         *                     r[++ri] = n;
         *                 }
         *             }
         *              
         *             // Add all found siblings to this Composite
         *             return this.add(r);
         *         }
         *     });
         *
         * @readonly
         */
        this.elements = [];
        this.add(elements, root);
        this.el = new Ext.dom.AbstractElement.Fly();
    },

    /**
     * @property {Boolean} isComposite
     * `true` in this class to identify an object as an instantiated CompositeElement, or subclass thereof.
     */
    isComposite: true,

    // private
    getElement: function(el) {
        // Set the shared flyweight dom property to the current element
        return this.el.attach(el);
    },

    // private
    transformElement: function(el) {
        return Ext.getDom(el);
    },

    /**
     * Returns the number of elements in this Composite.
     * @return {Number}
     */
    getCount: function() {
        return this.elements.length;
    },

    /**
     * Adds elements to this Composite object.
     * @param {HTMLElement[]/Ext.dom.CompositeElement} els Either an Array of DOM elements to add, or another Composite
     * object who's elements should be added.
     * @return {Ext.dom.CompositeElement} This Composite object.
     */
    add: function(els, root) {
        var elements = this.elements,
            i, ln;

        if (!els) {
            return this;
        }

        if (typeof els == "string") {
            els = Ext.dom.Element.selectorFunction(els, root);
        }
        else if (els.isComposite) {
            els = els.elements;
        }
        else if (!Ext.isIterable(els)) {
            els = [els];
        }

        for (i = 0, ln = els.length; i < ln; ++i) {
            elements.push(this.transformElement(els[i]));
        }

        return this;
    },

    invoke: function(fn, args) {
        var elements = this.elements,
            ln = elements.length,
            element,
            i;

        fn = Ext.dom.Element.prototype[fn];
        for (i = 0; i < ln; i++) {
            element = elements[i];

            if (element) {
                fn.apply(this.getElement(element), args);
            }
        }
        return this;
    },

    /**
     * Returns a flyweight Element of the dom element object at the specified index
     * @param {Number} index
     * @return {Ext.dom.Element}
     */
    item: function(index) {
        var el = this.elements[index],
            out = null;

        if (el) {
            out = this.getElement(el);
        }

        return out;
    },

    /**
     * Gets a range nodes.
     * @param {Number} start (optional) The index of the first node in the range
     * @param {Number} end (optional) The index of the last node in the range
     * @return {HTMLElement[]} An array of nodes
     */
    slice: function() {
        return this.elements.slice.apply(this.elements, arguments);
    },

    // fixes scope with flyweight
    addListener: function(eventName, handler, scope, opt) {
        var els = this.elements,
                len = els.length,
                i, e;

        for (i = 0; i < len; i++) {
            e = els[i];
            if (e) {
                Ext.EventManager.on(e, eventName, handler, scope || e, opt);
            }
        }
        return this;
    },
    /**
     * Calls the passed function for each element in this composite.
     * @param {Function} fn The function to call.
     * @param {Ext.dom.Element} fn.el The current Element in the iteration. **This is the flyweight
     * (shared) Ext.dom.Element instance, so if you require a a reference to the dom node, use el.dom.**
     * @param {Ext.dom.CompositeElement} fn.c This Composite object.
     * @param {Number} fn.index The zero-based index in the iteration.
     * @param {Object} [scope] The scope (this reference) in which the function is executed.
     * Defaults to the Element.
     * @return {Ext.dom.CompositeElement} this
     */
    each: function(fn, scope) {
        var me  = this,
            els = me.elements,
            len = els.length,
            i, e;

        for (i = 0; i < len; i++) {
            e = els[i];
            if (e) {
                e = this.getElement(e);
                if (fn.call(scope || e, e, me, i) === false) {
                    break;
                }
            }
        }
        return me;
    },

    /**
     * Clears this Composite and adds the elements passed.
     * @param {HTMLElement[]/Ext.dom.CompositeElement} els Either an array of DOM elements, or another Composite from which
     * to fill this Composite.
     * @return {Ext.dom.CompositeElement} this
     */
    fill: function(els) {
        var me = this;
        me.elements = [];
        me.add(els);
        return me;
    },

    insert: function(index, nodes) {
        Ext.Array.insert(this.elements, index, nodes);
    },

    /**
     * Filters this composite to only elements that match the passed selector.
     * @param {String/Function} selector A string CSS selector or a comparison function. The comparison function will be
     * called with the following arguments:
     * @param {Ext.dom.Element} selector.el The current DOM element.
     * @param {Number} selector.index The current index within the collection.
     * @return {Ext.dom.CompositeElement} this
     */
    filter: function(selector) {
        var me  = this,
            els = me.elements,
            len = els.length,
            out = [],
            i = 0,
            isFunc = typeof selector == 'function',
            add,
            el;

        for (; i < len; i++) {
            el = els[i];
            add = false;
            if (el) {
                el = me.getElement(el);

                if (isFunc) {
                    add = selector.call(el, el, me, i) !== false;
                } else {
                    add = el.is(selector);
                }
                
                if (add) {
                    out.push(me.transformElement(el));
                }
            }
        }

        me.elements = out;
        return me;
    },

    /**
     * Find the index of the passed element within the composite collection.
     * @param {String/HTMLElement/Ext.Element/Number} el The id of an element, or an Ext.dom.Element, or an HtmlElement
     * to find within the composite collection.
     * @return {Number} The index of the passed Ext.dom.Element in the composite collection, or -1 if not found.
     */
    indexOf: function(el) {
        return Ext.Array.indexOf(this.elements, this.transformElement(el));
    },

    /**
     * Replaces the specified element with the passed element.
     * @param {String/HTMLElement/Ext.Element/Number} el The id of an element, the Element itself, the index of the
     * element in this composite to replace.
     * @param {String/Ext.Element} replacement The id of an element or the Element itself.
     * @param {Boolean} [domReplace] True to remove and replace the element in the document too.
     * @return {Ext.dom.CompositeElement} this
     */
    replaceElement: function(el, replacement, domReplace) {
        var index = !isNaN(el) ? el : this.indexOf(el),
                d;
        if (index > -1) {
            replacement = Ext.getDom(replacement);
            if (domReplace) {
                d = this.elements[index];
                d.parentNode.insertBefore(replacement, d);
                Ext.removeNode(d);
            }
            Ext.Array.splice(this.elements, index, 1, replacement);
        }
        return this;
    },

    /**
     * Removes all elements from this Composite.
     * @param {Boolean} [removeDom] True to also remove the elements from the document.
     */
    clear: function(removeDom) {
        var me  = this,
            els = me.elements,
            i = els.length - 1;
        
        if (removeDom) {
            for (; i >= 0; i--) {
                Ext.removeNode(els[i]);
            }
        }
        this.elements = [];
    },

    addElements: function(els, root) {
        if (!els) {
            return this;
        }

        if (typeof els == "string") {
            els = Ext.dom.Element.selectorFunction(els, root);
        }

        var yels = this.elements,
            eLen = els.length,
            e;

        for (e = 0; e < eLen; e++) {
            yels.push(Ext.get(els[e]));
        }

        return this;
    },

    /**
     * Returns the first Element
     * @return {Ext.dom.Element}
     */
    first: function() {
        return this.item(0);
    },

    /**
     * Returns the last Element
     * @return {Ext.dom.Element}
     */
    last: function() {
        return this.item(this.getCount() - 1);
    },

    /**
     * Returns true if this composite contains the passed element.
     * @param {String/HTMLElement/Ext.Element/Number} el The id of an element, or an Ext.Element, or an HtmlElement to
     * find within the composite collection.
     * @return {Boolean}
     */
    contains: function(el) {
        return this.indexOf(el) != -1;
    },

    /**
     * Removes the specified element(s).
     * @param {String/HTMLElement/Ext.Element/Number} el The id of an element, the Element itself, the index of the
     * element in this composite or an array of any of those.
     * @param {Boolean} [removeDom] True to also remove the element from the document.
     * @return {Ext.dom.CompositeElement} this
     */
    removeElement: function(keys, removeDom) {
        keys = [].concat(keys);

        var me       = this,
            elements = me.elements,
            kLen     = keys.length,
            val, el, k;

        for (k = 0; k < kLen; k++) {
            val = keys[k];

            if ((el = (elements[val] || elements[val = me.indexOf(val)]))) {
                if (removeDom) {
                    if (el.dom) {
                        el.remove();
                    } else {
                        Ext.removeNode(el);
                    }
                }
                Ext.Array.erase(elements, val, 1);
            }
        }

        return me;
    }

}, function() {
    this.importElementMethods();

    this.prototype.on = this.prototype.addListener;

    if (Ext.DomQuery){
        Ext.dom.Element.selectorFunction = Ext.DomQuery.select;
    }

    /**
     * Selects elements based on the passed CSS selector to enable {@link Ext.Element Element} methods
     * to be applied to many related elements in one statement through the returned
     * {@link Ext.dom.CompositeElement CompositeElement} or
     * {@link Ext.dom.CompositeElementLite CompositeElementLite} object.
     * @param {String/HTMLElement[]} selector The CSS selector or an array of elements
     * @param {HTMLElement/String} [root] The root element of the query or id of the root
     * @return {Ext.dom.CompositeElementLite/Ext.dom.CompositeElement}
     * @member Ext.dom.Element
     * @method select
     * @static
     * @ignore
     */
   Ext.dom.Element.select = function(selector, root) {
        var elements;

        if (typeof selector == "string") {
            elements = Ext.dom.Element.selectorFunction(selector, root);
        }
        else if (selector.length !== undefined) {
            elements = selector;
        }
        else {
            //<debug>
            throw new Error("[Ext.select] Invalid selector specified: " + selector);
            //</debug>
        }

        return new Ext.CompositeElementLite(elements);
    };

    /**
     * @member Ext
     * @method select
     * @inheritdoc Ext.dom.Element#select
     * @ignore
     */
    Ext.select = function() {
        return Ext.dom.Element.select.apply(Ext.dom.Element, arguments);
    };
});
