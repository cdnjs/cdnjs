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
/**
 * This mixin enables classes to declare relationships to child elements and provides the
 * mechanics for acquiring the {@link Ext.Element elements} and storing them on an object
 * instance as properties.
 *
 * This class is used by {@link Ext.Component components} and {@link Ext.layout.container.Container container layouts} to
 * manage their child elements.
 * 
 * A typical component that uses these features might look something like this:
 * 
 *      Ext.define('Ext.ux.SomeComponent', {
 *          extend: 'Ext.Component',
 *          
 *          childEls: [
 *              'bodyEl'
 *          ],
 *          
 *          renderTpl: [
 *              '<div id="{id}-bodyEl"></div>'
 *          ],
 *          
 *          // ...
 *      });
 * 
 * The `childEls` array lists one or more relationships to child elements managed by the
 * component. The items in this array can be either of the following types:
 * 
 * - String: the id suffix and property name in one. For example, "bodyEl" in the above
 * example means a "bodyEl" property will be added to the instance with the result of
 * {@link Ext#get} given "componentId-bodyEl" where "componentId" is the component instance's
 * id.
 * - Object: with a `name` property that names the instance property for the element, and
 * one of the following additional properties:
 *      - `id`: The full id of the child element.
 *      - `itemId`: The suffix part of the id to which "componentId-" is prepended.
 *      - `select`: A selector that will be passed to {@link Ext#select}.
 *      - `selectNode`: A selector that will be passed to {@link Ext.DomQuery#selectNode}.
 * 
 * The example above could have used this instead to achieve the same result:
 *
 *      childEls: [
 *          { name: 'bodyEl', itemId: 'bodyEl' }
 *      ]
 *
 * When using `select`, the property will be an instance of {@link Ext.CompositeElement}. In
 * all other cases, the property will be an {@link Ext.Element} or `null` if not found.
 *
 * Care should be taken when using `select` or `selectNode` to find child elements. The
 * following issues should be considered:
 * 
 * - Performance: using selectors can be slower than id lookup by a factor 10x or more.
 * - Over-selecting: selectors are applied after the DOM elements for all children have
 * been rendered, so selectors can match elements from child components (including nested
 * versions of the same component) accidentally.
 * 
 * This above issues are most important when using `select` since it returns multiple
 * elements.
 *
 * **IMPORTANT** 
 * Unlike a `renderTpl` where there is a single value for an instance, `childEls` are aggregated
 * up the class hierarchy so that they are effectively inherited. In other words, if a
 * class where to derive from `Ext.ux.SomeComponent` in the example above, it could also
 * have a `childEls` property in the same way as `Ext.ux.SomeComponent`.
 * 
 *      Ext.define('Ext.ux.AnotherComponent', {
 *          extend: 'Ext.ux.SomeComponent',
 *          
 *          childEls: [
 *              // 'bodyEl' is inherited
 *              'innerEl'
 *          ],
 *          
 *          renderTpl: [
 *              '<div id="{id}-bodyEl">'
 *                  '<div id="{id}-innerEl"></div>'
 *              '</div>'
 *          ],
 *          
 *          // ...
 *      });
 * 
 * The `renderTpl` contains both child elements and unites them in the desired markup, but
 * the `childEls` only contains the new child element. The {@link #applyChildEls} method
 * takes care of looking up all `childEls` for an instance and considers `childEls`
 * properties on all the super classes and mixins.
 * 
 * @private
 */
Ext.define('Ext.util.ElementContainer', {

    childEls: [
        // empty - this solves a couple problems:
        //  1. It ensures that all classes have a childEls (avoid null ptr)
        //  2. It prevents mixins from smashing on their own childEls (these are gathered
        //      specifically)
    ],

    constructor: function () {
        var me = this,
            childEls;

        // if we have configured childEls, we need to merge them with those from this
        // class, its bases and the set of mixins...
        if (me.hasOwnProperty('childEls')) {
            childEls = me.childEls;
            delete me.childEls;

            me.addChildEls.apply(me, childEls);
        }
    },

    destroy: function () {
        var me = this,
            childEls = me.getChildEls(),
            child, childName, i, k;

        for (i = childEls.length; i--; ) {
            childName = childEls[i];
            if (typeof childName != 'string') {
                childName = childName.name;
            }

            child = me[childName];
            if (child) {
                me[childName] = null; // better than delete since that changes the "shape"
                child.remove();
            }
        }
    },

    /**
     * Adds each argument passed to this method to the {@link Ext.AbstractComponent#cfg-childEls childEls} array.
     */
    addChildEls: function () {
        var me = this,
            args = arguments;

        if (me.hasOwnProperty('childEls')) {
            me.childEls.push.apply(me.childEls, args);
        } else {
            me.childEls = me.getChildEls().concat(Array.prototype.slice.call(args));
        }
        
        me.prune(me.childEls, false);
    },

    /**
     * Sets references to elements inside the component. 
     * @private
     */
    applyChildEls: function(el, id) {
        var me = this,
            childEls = me.getChildEls(),
            baseId, childName, i, selector, value;

        baseId = (id || me.id) + '-';
        for (i = childEls.length; i--; ) {
            childName = childEls[i];

            if (typeof childName == 'string') {
                // We don't use Ext.get because that is 3x (or more) slower on IE6-8. Since
                // we know the el's are children of our el we use getById instead:
                value = el.getById(baseId + childName);
            } else {
                if ((selector = childName.select)) {
                    value = Ext.select(selector, true, el.dom); // a CompositeElement
                } else if ((selector = childName.selectNode)) {
                    value = Ext.get(Ext.DomQuery.selectNode(selector, el.dom));
                } else {
                    // see above re:getById...
                    value = el.getById(childName.id || (baseId + childName.itemId));
                }

                childName = childName.name;
            }

            me[childName] = value;
        }
    },

    getChildEls: function () {
        var me = this,
            self;

        // If an instance has its own childEls, that is the complete set:
        if (me.hasOwnProperty('childEls')) {
            return me.childEls;
        }

        // Typically, however, the childEls is a class-level concept, so check to see if
        // we have cached the complete set on the class:
        self = me.self;
        return self.$childEls || me.getClassChildEls(self);
    },

    getClassChildEls: function (cls) {
        var me = this,
            result = cls.$childEls,
            childEls, i, length, forked, mixin, mixins, name, parts, proto, supr, superMixins;

        if (!result) {
            // We put the various childEls arrays into parts in the order of superclass,
            // new mixins and finally from cls. These parts can be null or undefined and
            // we will skip them later.

            supr = cls.superclass;
            if (supr) {
                supr = supr.self;
                parts = [supr.$childEls || me.getClassChildEls(supr)]; // super+mixins
                superMixins = supr.prototype.mixins || {};
            } else {
                parts = [];
                superMixins = {};
            }

            proto = cls.prototype;
            mixins = proto.mixins; // since we are a mixin, there will be at least us
            for (name in mixins) {
                if (mixins.hasOwnProperty(name) && !superMixins.hasOwnProperty(name)) {
                    mixin = mixins[name].self;
                    parts.push(mixin.$childEls || me.getClassChildEls(mixin));
                }
            }

            parts.push(proto.hasOwnProperty('childEls') && proto.childEls);

            for (i = 0, length = parts.length; i < length; ++i) {
                childEls = parts[i];
                if (childEls && childEls.length) {
                    if (!result) {
                        result = childEls;
                    } else {
                        if (!forked) {
                            forked = true;
                            result = result.slice(0);
                        }
                        result.push.apply(result, childEls);
                    }
                }
            }

            cls.$childEls = result = (result ? me.prune(result, !forked) : []);
        }

        return result;
    },

    prune: function (childEls, shared) {
        var index = childEls.length,
            map = {},
            name;

        while (index--) {
            name = childEls[index];
            if (typeof name != 'string') {
                name = name.name;
            }

            if (!map[name]) {
                map[name] = 1;
            } else {
                if (shared) {
                    shared = false;
                    childEls = childEls.slice(0);
                }
                Ext.Array.erase(childEls, index, 1);
            }
        }

        return childEls;
    },

    /**
     * Removes items in the childEls array based on the return value of a supplied test
     * function. The function is called with a entry in childEls and if the test function
     * return true, that entry is removed. If false, that entry is kept.
     *
     * @param {Function} testFn The test function.
     */
    removeChildEls: function (testFn) {
        var me = this,
            old = me.getChildEls(),
            keepers = (me.childEls = []),
            n, i, cel;

        for (i = 0, n = old.length; i < n; ++i) {
            cel = old[i];
            if (!testFn(cel)) {
                keepers.push(cel);
            }
        }
    }
});
