/**
 * This mixin enables classes to declare relationships to child elements and provides the
 * mechanics for acquiring the {@link Ext.dom.Element elements} and storing them on an object
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
 *              '<div id="{id}-bodyEl" data-ref="bodyEl"></div>'
 *          ],
 *          
 *          // ...
 *      });
 * 
 * The `{@link #childEls}` config lists one or more relationships to child elements managed
 * by the component. The items in this array can be objects that more fully specify the
 * child. For example, the above could have used this instead to achieve the same result:
 *
 *      childEls: [
 *          { name: 'bodyEl', itemId: 'bodyEl' }
 *      ]
 *
 *
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
 *              '<div id="{id}-bodyEl" data-ref="bodyEl">'
 *                  '<div id="{id}-innerEl" data-ref="innerEl"></div>'
 *              '</div>'
 *          ],
 *          
 *          // ...
 *      });
 *
 * **IMPORTANT**
 * The `renderTpl` contains both child elements and unites them in the desired markup, but
 * the `childEls` only contains the new child element. The `data-ref` attribute must be
 * rendered on to child elements that do not use `select` or `selectNode` options. This
 * is done for performance reasons on IE8 where element lookup (even by id) is not very
 * efficient.
 * 
 * @private
 */
Ext.define('Ext.util.ElementContainer', {
    mixinId: 'elementCt',

    config: {
        /**
         * @cfg {Object/String[]/Object[]} childEls
         * The canonical form of `childEls` is an object keyed by child's property name
         * with values that are objects with the following properties.
         *
         * - `itemId` - The id to combine with the Component's id that is the id of the
         *   child element.
         * - `id` - The id of the child element.
         * - `leaf` - Set to `true` to ignore content when scanning for childEls. This
         *  should be set on things like the generated content for an `Ext.view.View`.
         * - `select`: A selector that will be passed to {@link Ext.dom.Element#select}.
         * - `selectNode`: A selector that will be passed to {@link Ext.dom.Element#method-selectNode}.
         *
         * For example:
         *
         *      childEls: {
         *          button: true,
         *          buttonText: 'text',
         *          buttonImage: {
         *              itemId: 'image'
         *          }
         *      }
         *
         * The above is translated into the following complete form:
         *
         *      childEls: {
         *          button: {
         *              name: 'button',
         *              itemId: 'button'
         *          },
         *          buttonText: {
         *              name: 'buttonText',
         *              itemId: 'text'
         *          },
         *          buttonImage: {
         *              name: 'buttonImage',
         *              itemId: 'image'
         *          }
         *      }
         *
         * The above can be provided as an array like so:
         *
         *      childEls: [
         *          'button',
         *          { name: 'buttonText', itemId: 'text' },
         *          { name: 'buttonImage', itemId: 'image' }
         *      }
         *
         * For example, a Component which renders a title and body text:
         *
         *     @example
         *     Ext.create('Ext.Component', {
         *         renderTo: Ext.getBody(),
         *         renderTpl: [
         *             '<h1 id="{id}-title">{title}</h1>',
         *             '<p>{msg}</p>',
         *         ],
         *         renderData: {
         *             title: "Error",
         *             msg: "Something went wrong"
         *         },
         *         childEls: ["title"],
         *         listeners: {
         *             afterrender: function(cmp){
         *                 // After rendering the component will have a title property
         *                 cmp.title.setStyle({color: "red"});
         *             }
         *         }
         *     });
         *
         * When using `select`, the property will be an instance of {@link Ext.CompositeElement}.
         * In all other cases, the property will be an {@link Ext.dom.Element} or `null`
         * if not found.
         *
         * Care should be taken when using `select` or `selectNode` to find child elements.
         * The following issues should be considered:
         *
         * - Performance: using selectors can be 10x slower than id lookup.
         * - Over-selecting: selectors are applied after the DOM elements for all children
         *   have been rendered, so selectors can match elements from child components
         *   (including nested versions of the same component) accidentally.
         *
         * This above issues are most important when using `select` since it returns multiple
         * elements.
         */
        childEls: {
            $value: {},
            cached: true,
            lazy: true,

            merge: function (newValue, oldValue, target, mixinClass) {
                var childEls = oldValue ? Ext.Object.chain(oldValue) : {},
                    i, val;

                // We'd use mergeSets except it assumes array elements are just names.
                if (newValue instanceof Array) {
                    for (i = newValue.length; i--; ) {
                        val = newValue[i];
                        if (!mixinClass || !(val in childEls)) {
                            if (typeof val === 'string') {
                                childEls[val] = { name: val, itemId: val };
                            } else {
                                childEls[val.name] = val;
                            }
                        }
                    }
                } else  if (newValue) {
                    if (newValue.constructor === Object) {
                        for (i in newValue) {
                            if (!mixinClass || !(i in childEls)) {
                                val = newValue[i];
                                if (val === true) {
                                    childEls[i] = { itemId: i };
                                } else if (typeof val === 'string') {
                                    childEls[i] = { itemId: val };
                                } else {
                                    childEls[i] = val;
                                    if (!('itemId' in val)) {
                                        val.itemId = i;
                                    }
                                }
                                childEls[i].name = i;
                            }
                        }
                    } else {
                        if (!mixinClass || !(newValue in childEls)) {
                            childEls[newValue] = { name: newValue, itemId: newValue };
                        }
                    }
                }

                return childEls;
            }
        }
    },

    destroy: function () {
        var me = this,
            childEls = me.getChildEls(),
            child, childName;

        for (childName in childEls) {
            child = me[childName];

            if (child) {
                if (child.destroy) {
                    child.destroy();
                }
                me[childName] = null;
            }
        }
    },

    privates: {
        /**
         * Called after the mixin is applied. We need to see if `childEls` were used by
         * the `targetClass` and apply them to the config.
         * @param {Ext.Class} targetClass
         * @private
         */
        afterClassMixedIn: function (targetClass) {
            // When we are mixed in the targetClass may already have specified childEls,
            // so check the prototype for any...
            var proto = targetClass.prototype,
                childEls = proto.childEls;

            if (childEls) {
                delete proto.childEls;
                targetClass.getConfigurator().add({
                    childEls: childEls
                });
            }
        },

        /**
         * Sets references to elements inside the component.
         * @private
         */
        attachChildEls: function (el, owner) {
            var me = this,
                childEls = me.getChildEls(),
                comp = owner || me, // fyi - we are also used by layouts
                baseId = comp.id + '-',
                unframed = !comp.frame,
                childName, elements, entry, k, selector, value, id;

            for (childName in childEls) {
                // hasOwnProperty is a no-go here since we use prototype chains...
                entry = childEls[childName];
                if (unframed && entry.frame) {
                    continue;
                }

                selector = entry.select;
                if (selector) {
                    value = el.select(selector, true); // a CompositeElement
                } else if (!(selector = entry.selectNode)) {
                    if (!(id = entry.id)) {
                        // With a normal childEl we want to rely on data-ref to populate
                        // the cache and *not* use getById since that should never find
                        // anything we don't already know about.
                        id = baseId + entry.itemId;
                        value = Ext.cache[id];// || el.getById(id);
                    } else {
                        // With a specified id we may not be so lucky, so check the cache
                        // first but then fallback to getById.
                        value = Ext.cache[id] || el.getById(id);
                    }
                } else {
                    value = el.selectNode(selector, false);
                }

                if (value) {
                    if (value.isElement) {
                        value.component = comp;
                    } else if (value.isComposite && !value.isLite) {
                        elements = value.elements;
                        for (k = elements.length; k--;) {
                            elements[k].component = comp;
                        }
                    }
                }

                me[childName] = value || null;
            }
        }
    }
});
