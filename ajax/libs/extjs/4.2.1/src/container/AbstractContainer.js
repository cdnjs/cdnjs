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
 * An abstract base class which provides shared methods for Containers across the Sencha product line.
 *
 * Please refer to sub class's documentation
 *
 * @private
 */
Ext.define('Ext.container.AbstractContainer', {

    /* Begin Definitions */

    extend: 'Ext.Component',

    requires: [
        'Ext.util.MixedCollection',
        'Ext.layout.container.Auto',
        'Ext.ZIndexManager'
    ],
    
    mixins: {
        queryable: 'Ext.Queryable'
    },

    /* End Definitions */

    renderTpl: '{%this.renderContainer(out,values)%}',

    /**
     * @cfg {Ext.enums.Layout/Object} layout
     * **Important**: In order for child items to be correctly sized and
     * positioned, typically a layout manager **must** be specified through
     * the `layout` configuration option.
     *
     * The sizing and positioning of child {@link #cfg-items} is the responsibility of
     * the Container's layout manager which creates and manages the type of layout
     * you have in mind.  For example:
     *
     * If the layout configuration is not explicitly specified for
     * a general purpose container (e.g. Container or Panel) the
     * {@link Ext.layout.container.Auto default layout manager} will be used
     * which does nothing but render child components sequentially into the
     * Container (no sizing or positioning will be performed in this situation).
     *
     * **layout** may be specified as either as an Object or as a String:
     *
     * ## Specify as an Object
     *
     * Example usage:
     *
     *     layout: {
     *         type: 'vbox',
     *         align: 'left'
     *     }
     *
     *   - **type**
     *
     *     The layout type to be used for this container.  If not specified,
     *     a default {@link Ext.layout.container.Auto} will be created and used.
     *
     *     Valid layout <code>type</code> values are listed in {@link Ext.enums.Layout}.
     *
     *   - Layout specific configuration properties
     *
     *     Additional layout specific configuration properties may also be
     *     specified. For complete details regarding the valid config options for
     *     each layout type, see the layout class corresponding to the `type`
     *     specified.
     *
     * ## Specify as a String
     *
     * Example usage:
     *
     *     layout: 'vbox'
     *
     *   - **layout**
     *
     *     The layout `type` to be used for this container (see {@link Ext.enums.Layout}
     *     for list of valid values).
     *
     *     Additional layout specific configuration properties. For complete
     *     details regarding the valid config options for each layout type, see the
     *     layout class corresponding to the `layout` specified.
     *
     * ## Configuring the default layout type
     *
     * If a certain Container class has a default layout (For example a {@link Ext.toolbar.Toolbar Toolbar}
     * with a default `Box` layout), then to simply configure the default layout,
     * use an object, but without the `type` property:
     *
     *
     *     xtype: 'toolbar',
     *     layout: {
     *         pack: 'center'
     *     }
     *
     * @since 2.3.0
     */

    /**
     * @cfg {String/Number} activeItem
     * A string component id or the numeric index of the component that should be
     * initially activated within the container's layout on render.  For example,
     * activeItem: 'item-1' or activeItem: 0 (index 0 = the first item in the
     * container's collection).  activeItem only applies to layout styles that can
     * display items one at a time (like {@link Ext.layout.container.Card} and
     * {@link Ext.layout.container.Fit}).
     *
     * @since 2.3.0
     */

    /**
     * @cfg {Object/Object[]} items
     * A single item, or an array of child Components to be added to this container
     *
     * **Unless configured with a {@link #layout}, a Container simply renders child
     * Components serially into its encapsulating element and performs no sizing or
     * positioning upon them.**
     *
     * Example:
     *
     *     // specifying a single item
     *     items: {...},
     *     layout: 'fit',    // The single items is sized to fit
     *      
     *     // specifying multiple items
     *     items: [{...}, {...}],
     *     layout: 'hbox', // The items are arranged horizontally
     *
     * Each item may be:
     *
     * - A {@link Ext.Component Component}
     * - A Component configuration object
     *
     * If a configuration object is specified, the actual type of Component to be
     * instantiated my be indicated by using the {@link Ext.Component#xtype xtype} option.
     *
     * Every Component class has its own {@link Ext.Component#xtype xtype}.
     *
     * If an {@link Ext.Component#xtype xtype} is not explicitly specified, the
     * {@link #defaultType} for the Container is used, which by default is usually `panel`.
     *
     * # Notes:
     *
     * Ext uses lazy rendering. Child Components will only be rendered
     * should it become necessary. Items are automatically laid out when they are first
     * shown (no sizing is done while hidden), or in response to a {@link #doLayout} call.
     *
     * Do not specify {@link Ext.panel.Panel#contentEl contentEl} or
     * {@link Ext.panel.Panel#html html} with `items`.
     *
     * @since 2.3.0
     */

    /**
     * @cfg {Object/Function} defaults
     * This option is a means of applying default settings to all added items whether added
     * through the {@link #cfg-items} config or via the {@link #method-add} or {@link #insert} methods.
     *
     * Defaults are applied to both config objects and instantiated components conditionally
     * so as not to override existing properties in the item (see {@link Ext#applyIf}).
     *
     * If the defaults option is specified as a function, then the function will be called
     * using this Container as the scope (`this` reference) and passing the added item as
     * the first parameter. Any resulting object from that call is then applied to the item
     * as default properties.
     *
     * For example, to automatically apply padding to the body of each of a set of
     * contained {@link Ext.panel.Panel} items, you could pass:
     * `defaults: {bodyStyle:'padding:15px'}`.
     *
     * Usage:
     *
     *     defaults: { // defaults are applied to items, not the container
     *         autoScroll: true
     *     },
     *     items: [
     *         // default will not be applied here, panel1 will be autoScroll: false
     *         {
     *             xtype: 'panel',
     *             id: 'panel1',
     *             autoScroll: false
     *         },
     *         // this component will have autoScroll: true
     *         new Ext.panel.Panel({
     *             id: 'panel2'
     *         })
     *     ]
     *
     * @since 2.3.0
     */

    /**
     * @cfg {Boolean} suspendLayout
     * If true, suspend calls to doLayout. Useful when batching multiple adds to a container
     * and not passing them as multiple arguments or an array.
     */
    suspendLayout : false,

    /**
     * @cfg {Boolean} [autoDestroy=true]
     * If true the container will automatically destroy any contained component that is removed
     * from it, else destruction must be handled manually.
     * @since 2.3.0
     */
    autoDestroy : true,

     /**
      * @cfg {String} [defaultType="panel"]
      * The default {@link Ext.Component xtype} of child Components to create in this Container when
      * a child item is specified as a raw configuration object, rather than as an instantiated Component.
      * @since 2.3.0
      */
    defaultType: 'panel',
    
    /**
     * @cfg {Boolean} [detachOnRemove=true]
     * True to move any component to the {@link Ext#getDetachedBody detachedBody} when the component is
     * removed from this container. This option is only applicable when the component is not destroyed while
     * being removed, see {@link #autoDestroy} and {@link #method-remove}. If this option is set to false, the DOM
     * of the component will remain in the current place until it is explicitly moved.
     */
    detachOnRemove: true,

    /*
     * @property {Boolean} isContainer
     * `true` in this class to identify an object as an instantiated Container, or subclass thereof.
     */
    isContainer : true,

    /**
     * @property {Number} layoutCounter
     * The number of container layout calls made on this object.
     * @private
     */
    layoutCounter : 0,

    baseCls: Ext.baseCSSPrefix + 'container',

    /**
     * @cfg {String[]} bubbleEvents
     * An array of events that, when fired, should be bubbled to any parent container.
     * See {@link Ext.util.Observable#enableBubble}.
     * @since 3.4.0
     */

    defaultLayoutType: 'auto',

    // @private
    initComponent : function(){
        var me = this;
        me.addEvents(
            /**
             * @event afterlayout
             * Fires when the components in this container are arranged by the associated layout manager.
             * @param {Ext.container.Container} this
             * @param {Ext.layout.container.Container} layout The ContainerLayout implementation for this container
             * @since 2.3.0
             */
            'afterlayout',
            /**
             * @event beforeadd
             * Fires before any {@link Ext.Component} is added or inserted into the container.
             * A handler can return false to cancel the add.
             * @param {Ext.container.Container} this
             * @param {Ext.Component} component The component being added
             * @param {Number} index The index at which the component will be added to the container's items collection
             * @since 2.3.0
             */
            'beforeadd',
            /**
             * @event beforeremove
             * Fires before any {@link Ext.Component} is removed from the container.  A handler can return
             * false to cancel the remove.
             * @param {Ext.container.Container} this
             * @param {Ext.Component} component The component being removed
             * @since 2.3.0
             */
            'beforeremove',
            /**
             * @event add
             * Fires after any {@link Ext.Component} is added or inserted into the container.
             * 
             * **This event bubbles:** 'add' will also be fired when Component is added to any of
             * the child containers or their childern or ...
             * @param {Ext.container.Container} this
             * @param {Ext.Component} component The component that was added
             * @param {Number} index The index at which the component was added to the container's items collection
             * @since 2.3.0
             */
            'add',
            /**
             * @event remove
             * Fires after any {@link Ext.Component} is removed from the container.
             *
             * **This event bubbles:** 'remove' will also be fired when Component is removed from any of
             * the child containers or their children or ...
             * @param {Ext.container.Container} this
             * @param {Ext.Component} component The component that was removed
             * @since 2.3.0
             */
            'remove'
        );

        me.callParent();

        me.getLayout();
        me.initItems();
    },

    // @private
    initItems : function() {
        var me = this,
            items = me.items;

        /**
         * The MixedCollection containing all the child items of this container.
         * @property items
         * @type Ext.util.AbstractMixedCollection
         * @since 2.3.0
         */
        me.items = new Ext.util.AbstractMixedCollection(false, me.getComponentId);
        me.floatingItems = new Ext.util.MixedCollection(false, me.getComponentId);

        if (items) {
            if (!Ext.isArray(items)) {
                items = [items];
            }

            me.add(items);
        }
    },

    /**
     * @private
     * Returns the focus holder element associated with this Container. By default, this is the Container's target
     * element. Subclasses which use embedded focusable elements (such as Window and Button) should override this for use
     * by the {@link #method-focus} method.
     * @returns {Ext.Element} the focus holding element.
     */
    getFocusEl: function() {
        return this.getTargetEl();
    },

    finishRenderChildren: function () {
        this.callParent();

        var layout = this.getLayout();

        if (layout) {
            layout.finishRender();
        }
    },

    beforeRender: function () {
        var me = this,
            layout = me.getLayout(),
            targetCls;

        me.callParent();

        if (!layout.initialized) {
            layout.initLayout();
        }

        targetCls = layout.targetCls;

        if (targetCls) {
            me.applyTargetCls(targetCls);
        }
    },

    // The targetCls is a CSS class that the layout needs added to the targetEl. The targetEl is where the container's
    // children are rendered and is usually just the main el. Some containers (e.g. panels) use a body instead.
    //
    // In general, if a class overrides getTargetEl it will also need to override this method. This is necessary to
    // avoid a post-render step to add the targetCls.
    applyTargetCls: function(targetCls) {
        this.addCls(targetCls);
    },

    afterComponentLayout: function() {
        var floaters = this.floatingItems.items,
            floaterCount = floaters.length,
            i, floater
            
        this.callParent(arguments);

        // Contained, unrendered, autoShow items must be shown upon next layout of the Container
        for (i = 0; i < floaterCount; i++) {
            floater = floaters[i];
            if (!floater.rendered && floater.autoShow) {
                floater.show();
            }
        }
    },

    onPosition: function() {
        this.callParent(arguments);
        this.repositionFloatingItems();
    },

    onResize: function() {
        this.callParent(arguments);
        this.repositionFloatingItems();
    },

    repositionFloatingItems: function() {
        var floaters = this.floatingItems.items,
            floaterCount = floaters.length,
            i, floater;

        // Ensure correct positioning of floated children before calling superclass
        for (i = 0; i < floaterCount; i++) {
            floater = floaters[i];
            if (floater.el && !floater.hidden) {
                floater.setPosition(floater.x, floater.y);
            }
        }
    },

    setupRenderTpl: function (renderTpl) {
        this.callParent(arguments);
        this.getLayout().setupRenderTpl(renderTpl);
    },
    
    // @private
    getDefaultContentTarget: function() {
        return this.el;
    },
    
    // @private
    getContentTarget: function(){
        return this.getLayout().getContentTarget();
    },

    // @private
    setLayout : function(layout) {
        var currentLayout = this.layout;

        if (currentLayout && currentLayout.isLayout && currentLayout != layout) {
            currentLayout.setOwner(null);
        }

        this.layout = layout;
        layout.setOwner(this);
    },

    /**
     * Returns the {@link Ext.layout.container.Container layout} instance currently associated with this Container.
     * If a layout has not been instantiated yet, that is done first
     * @return {Ext.layout.container.Container} The layout
     */
    getLayout : function() {
        var me = this;
        if (!me.layout || !me.layout.isLayout) {
            // Pass any configured in layout property, defaulting to the prototype's layout property, falling back to Auto.
            me.setLayout(Ext.layout.Layout.create(me.layout, me.self.prototype.layout || me.defaultLayoutType));
        }

        return me.layout;
    },

    /**
     * Manually force this container's layout to be recalculated. The framework uses this internally to refresh layouts
     * form most cases.
     * @return {Ext.container.Container} this
     * @since 2.3.0
     */
    doLayout : function() {
        this.updateLayout();
        return this;
    },

    /**
     * Invoked after the Container has laid out (and rendered if necessary)
     * its child Components.
     *
     * @param {Ext.layout.container.Container} layout
     *
     * @template
     * @protected
     */
    afterLayout : function(layout) {
        var me = this;
        ++me.layoutCounter;
        if (me.hasListeners.afterlayout) {
            me.fireEvent('afterlayout', me, layout);
        }
    },

    // @private
    prepareItems : function(items, applyDefaults) {
        // Create an Array which does not refer to the passed array.
        // The passed array is a reference to a user's config object and MUST NOT be mutated.
        if (Ext.isArray(items)) {
            items = items.slice();
        } else {
            items = [items];
        }

        // Make sure defaults are applied and item is initialized
        var me = this,
            i = 0,
            len = items.length,
            item;

        for (; i < len; i++) {
            item = items[i];
            if (item == null) {
                Ext.Array.erase(items, i, 1);
                --i;
                --len;
            } else {
                if (applyDefaults) {
                    item = this.applyDefaults(item);
                }

                // Tell the item we're in a container during construction
                item.isContained = me;
                items[i] = me.lookupComponent(item);
                // need to delete both in case item was a config
                delete item.isContained;
                delete items[i].isContained;
            }
        }

        return items;
    },

    // @private
    applyDefaults : function(config) {
        var defaults = this.defaults;

        if (defaults) {
            if (Ext.isFunction(defaults)) {
                defaults = defaults.call(this, config);
            }

            if (Ext.isString(config)) {
                config = Ext.ComponentManager.get(config);
            }
            Ext.applyIf(config, defaults);
        }
        return config;
    },

    // @private
    lookupComponent : function(comp) {
        return (typeof comp == 'string') ? Ext.ComponentManager.get(comp)
                                         : Ext.ComponentManager.create(comp, this.defaultType);
    },

    // @private - used as the key lookup function for the items collection
    getComponentId : function(comp) {
        return comp.getItemId && comp.getItemId();
    },

    /**
     * Adds {@link Ext.Component Component}(s) to this Container.
     *
     * ## Description:
     *
     * - Fires the {@link #beforeadd} event before adding.
     * - The Container's {@link #defaults default config values} will be applied
     *   accordingly (see `{@link #defaults}` for details).
     * - Fires the `{@link #event-add}` event after the component has been added.
     *
     * ## Notes:
     *
     * If the Container is __already rendered__ when `add`
     * is called, it will render the newly added Component into its content area.
     *
     * **If** the Container was configured with a size-managing {@link #layout} manager,
     * the Container will recalculate its internal layout at this time too.
     *  
     * Note that the default layout manager simply renders child Components sequentially
     * into the content area and thereafter performs no sizing.
     *  
     * If adding multiple new child Components, pass them as an array to the `add` method,
     * so that only one layout recalculation is performed.
     *  
     *     tb = new {@link Ext.toolbar.Toolbar}({
     *         renderTo: document.body
     *     });  // toolbar is rendered
     *     // add multiple items.
     *     // ({@link #defaultType} for {@link Ext.toolbar.Toolbar Toolbar} is 'button')
     *     tb.add([{text:'Button 1'}, {text:'Button 2'}]);
     *
     * To inject components between existing ones, use the {@link #insert} method.
     *
     * ## Warning:
     *
     * Components directly managed by the BorderLayout layout manager may not be removed
     * or added.  See the Notes for {@link Ext.layout.container.Border BorderLayout} for
     * more details.
     *
     * @param {Ext.Component[]|Object[]/Ext.Component.../Object...} component
     * Either one or more Components to add or an Array of Components to add.
     * See `{@link #cfg-items}` for additional information.
     *
     * @return {Ext.Component[]/Ext.Component} The Components that were added.
     *
     * @since 2.3.0
     */
    add : function() {
        var me = this,
            args = Ext.Array.slice(arguments),
            index = (typeof args[0] == 'number') ? args.shift() : -1,
            layout = me.getLayout(),
            addingArray, items, i, length, item, pos, ret;

        if (args.length == 1 && Ext.isArray(args[0])) {
            items = args[0];
            addingArray = true;
        } else {
            items = args;
        }

        if (me.rendered) {
            Ext.suspendLayouts(); // suspend layouts while adding items...
        }

        ret = items = me.prepareItems(items, true);
        length = items.length;

        if (!addingArray && length == 1) { // an array of 1 should still return an array...
            ret = items[0];
        }

        // loop
        for (i = 0; i < length; i++) {
            item = items[i];
            //<debug>
            if (!item) {
                Ext.Error.raise("Cannot add null item to Container with itemId/id: " + me.getItemId());
            }
            //</debug>

            pos = (index < 0) ? me.items.length : (index + i);

            // Floating Components are not added into the items collection, but to a separate floatingItems collection
            if (item.floating) {
                me.floatingItems.add(item);
                item.onAdded(me, pos);

                if (me.hasListeners.add) {
                    me.fireEvent('add', me, item, pos);
                }
            } else if ((!me.hasListeners.beforeadd || me.fireEvent('beforeadd', me, item, pos) !== false) && me.onBeforeAdd(item) !== false) {
                me.items.insert(pos, item);
                item.onAdded(me, pos);
                me.onAdd(item, pos);
                layout.onAdd(item, pos);

                if (me.hasListeners.add) {
                    me.fireEvent('add', me, item, pos);
                }
            }
        }

        // We need to update our layout after adding all passed items
        me.updateLayout();
        if (me.rendered) {
            Ext.resumeLayouts(true);
        }

        return ret;
    },

    /**
     * This method is invoked after a new Component has been added. It
     * is passed the Component which has been added. This method may
     * be used to update any internal structure which may depend upon
     * the state of the child items.
     *
     * @param {Ext.Component} component
     * @param {Number} position
     *
     * @template
     * @protected
     */
    onAdd : Ext.emptyFn,

    /**
     * This method is invoked after a new Component has been
     * removed. It is passed the Component which has been
     * removed. This method may be used to update any internal
     * structure which may depend upon the state of the child items.
     *
     * @param {Ext.Component} component
     * @param {Boolean} autoDestroy
     *
     * @template
     * @protected
     */
    onRemove : Ext.emptyFn,

    /**
     * Inserts a Component into this Container at a specified index. Fires the
     * {@link #beforeadd} event before inserting, then fires the {@link #event-add}
     * event after the Component has been inserted.
     *
     * @param {Number} index The index at which the Component will be inserted
     * into the Container's items collection
     *
     * @param {Ext.Component/Object} component The child Component to insert.
     *
     * Ext uses lazy rendering, and will only render the inserted Component should
     * it become necessary.
     *
     * A Component config object may be passed in order to avoid the overhead of
     * constructing a real Component object if lazy rendering might mean that the
     * inserted Component will not be rendered immediately. To take advantage of
     * this 'lazy instantiation', set the {@link Ext.Component#xtype} config
     * property to the registered type of the Component wanted.
     *
     * For a list of all available xtypes, see {@link Ext.enums.Widget}.
     *
     * @return {Ext.Component} component The Component (or config object) that was
     * inserted with the Container's default config values applied.
     *
     * @since 2.3.0
     */
    insert : function(index, comp) {
        var compIdx;
        if (comp && comp.isComponent) {
            compIdx = this.items.indexOf(comp);
            if (compIdx !== -1) {
                return this.move(compIdx, index);
            }
        }
        return this.add(index, comp);
    },

    /**
     * Moves a Component within the Container
     * @param {Number/Ext.Component} fromIdx The index/component to move.
     * @param {Number} toIdx The new index for the Component.
     * @return {Ext.Component} component The Component that was moved.
     */
    move : function(fromIdx, toIdx) {
        var items = this.items,
            item;
            
        if (fromIdx.isComponent) {
            fromIdx = items.indexOf(fromIdx);
        }
        item = items.removeAt(fromIdx);
        if (item === false) {
            return false;
        }
        items.insert(toIdx, item);
        this.onMove(item, fromIdx, toIdx);
        this.updateLayout();
        return item;
    },
    
    onMove: Ext.emptyFn,

    /**
     * This method is invoked before adding a new child Component. It
     * is passed the new Component, and may be used to modify the
     * Component, or prepare the Container in some way. Returning
     * false aborts the add operation.
     *
     * @param {Ext.Component} item
     *
     * @template
     * @protected
     */
    onBeforeAdd : function(item) {
        // Remove from current container if it's not us.
        if (item.ownerCt && item.ownerCt !== this) {
            item.ownerCt.remove(item, false);
        }
    },

    /**
     * Removes a component from this container.  Fires the {@link #beforeremove} event
     * before removing, then fires the {@link #event-remove} event after the component has
     * been removed.
     *
     * @param {Ext.Component/String} component The component reference or id to remove.
     *
     * @param {Boolean} [autoDestroy] True to automatically invoke the removed Component's
     * {@link Ext.Component#method-destroy} function.
     *
     * Defaults to the value of this Container's {@link #autoDestroy} config.
     *
     * @return {Ext.Component} component The Component that was removed.
     * @since 2.3.0
     */
    remove : function(comp, autoDestroy) {
        var me = this,
            c = me.getComponent(comp);
        //<debug>
            if (Ext.isDefined(Ext.global.console) && !c) {
                Ext.global.console.warn("Attempted to remove a component that does not exist. Ext.container.Container: remove takes an argument of the component to remove. cmp.remove() is incorrect usage.");
            }
        //</debug>

        if (c && (!me.hasListeners.beforeremove || me.fireEvent('beforeremove', me, c) !== false)) {
            me.doRemove(c, autoDestroy);
            if (me.hasListeners.remove) {
                me.fireEvent('remove', me, c);
            }

            if (!me.destroying && !c.floating) {
                me.updateLayout();
            }
        }

        return c;
    },

    // @private
    doRemove : function(component, doDestroy) {
        // Ensure the flag is set correctly
        doDestroy = doDestroy === true || (doDestroy !== false && this.autoDestroy);

        var me = this,
            layout = me.layout,
            hasLayout = layout && me.rendered,

            // isDestroying flag is true if the removal is taking place as part of destruction, OR if removal is intended to *cause* destruction
            isDestroying = component.destroying || doDestroy,
            floating = component.floating;

        if (floating) {
            me.floatingItems.remove(component);
        } else {
            me.items.remove(component);
        }

        // Inform ownerLayout of removal before deleting the ownerLayout & ownerCt references in the onRemoved call
        if (hasLayout && !floating) {
            // Removing a component from a running layout has to cancel the layout
            if (layout.running) {
                Ext.AbstractComponent.cancelLayout(component, isDestroying);
            }
            layout.onRemove(component, isDestroying);
        }

        component.onRemoved(isDestroying);

        me.onRemove(component, isDestroying);

        // Destroy if we were explicitly told to, or we're defaulting to our autoDestroy configuration
        if (doDestroy) {
            component.destroy();
        }
        // Only have the layout perform remove postprocessing if the Component is not being destroyed
        else {
            if (hasLayout && !floating) {
                layout.afterRemove(component);       
            }
            if (me.detachOnRemove && component.rendered) {
                me.detachComponent(component);
            }
        }
    },
    
    // Detach a component from the DOM
    detachComponent: function(component){
        Ext.getDetachedBody().appendChild(component.getEl());
    },

    /**
     * Removes all components from this container.
     * @param {Boolean} [autoDestroy] True to automatically invoke the removed
     * Component's {@link Ext.Component#method-destroy} function.
     * Defaults to the value of this Container's {@link #autoDestroy} config.
     * @return {Ext.Component[]} Array of the removed components
     * @since 2.3.0
     */
    removeAll : function(autoDestroy) {
        var me = this,
            removeItems = me.items.items.slice().concat(me.floatingItems.items),
            items = [],
            i = 0,
            len = removeItems.length,
            item;

        // Suspend Layouts while we remove multiple items from the container
        me.suspendLayouts();
        for (; i < len; i++) {
            item = removeItems[i];
            me.remove(item, autoDestroy);

            if (item.ownerCt !== me) {
                items.push(item);
            }
        }

        // Resume Layouts now that all items have been removed and do a single layout (if we removed anything!)
        me.resumeLayouts(!!len);
        return items;
    },

    /**
     * @protected
     * Used by {@link Ext.ComponentQuery ComponentQuery}, {@link #child} and {@link #down} to retrieve all of the items
     * which can potentially be considered a child of this Container.
     * 
     * This may be overriden by Components which have ownership of Components
     * that are not contained in the {@link #property-items} collection.
     *
     * NOTE: IMPORTANT note for maintainers:
     * Items are returned in tree traversal order. Each item is appended to the result array
     * followed by the results of that child's getRefItems call.
     * Floating child items are appended after internal child items.
     */
    getRefItems : function(deep) {
        var me = this,
            items = me.items.items,
            len = items.length,
            i = 0,
            item,
            result = [];

        for (; i < len; i++) {
            item = items[i];
            result[result.length] = item;
            if (deep && item.getRefItems) {
                result.push.apply(result, item.getRefItems(true));
            }
        }

        // Append floating items to the list.
        items = me.floatingItems.items;
        len = items.length;
        for (i = 0; i < len; i++) {
            item = items[i];
            result[result.length] = item;
            if (deep && item.getRefItems) {
                result.push.apply(result, item.getRefItems(true));
            }
        }

        return result;
    },

    /**
     * Cascades down the component/container heirarchy from this component (passed in
     * the first call), calling the specified function with each component. The scope
     * (this reference) of the function call will be the scope provided or the current
     * component. The arguments to the function will be the args provided or the current
     * component. If the function returns false at any point, the cascade is stopped on
     * that branch.
     * @param {Function} fn The function to call
     * @param {Object} [scope] The scope of the function (defaults to current component)
     * @param {Array} [args] The args to call the function with. The current component
     * always passed as the last argument.
     * @return {Ext.Container} this
     * @since 2.3.0
     */
    cascade : function(fn, scope, origArgs){
        var me = this,
            cs = me.items ? me.items.items : [],
            len = cs.length,
            i = 0,
            c,
            args = origArgs ? origArgs.concat(me) : [me],
            componentIndex = args.length - 1;

        if (fn.apply(scope || me, args) !== false) {
            for (; i < len; i++){
                c = cs[i];
                if (c.cascade) {
                    c.cascade(fn, scope, origArgs);
                } else {
                    args[componentIndex] = c;
                    fn.apply(scope || cs, args);
                }
            }
        }
        return this;
    },

    /**
     * Determines whether **this Container** is an ancestor of the passed Component.
     * This will return `true` if the passed Component is anywhere within the subtree
     * beneath this Container.
     * @param {Ext.Component} possibleDescendant The Component to test for presence
     * within this Container's subtree.
     */
    isAncestor: function(possibleDescendant) {
        while (possibleDescendant) {
            if (possibleDescendant.ownerCt === this) {
                return true;
            }
            possibleDescendant = possibleDescendant.ownerCt;
        }
    },

    /**
     * Examines this container's {@link #property-items} **property** and gets a direct child
     * component of this container.
     *
     * @param {String/Number} comp This parameter may be any of the following:
     *
     * - a **String** : representing the {@link Ext.Component#itemId itemId}
     *   or {@link Ext.Component#id id} of the child component.
     * - a **Number** : representing the position of the child component
     *   within the {@link #property-items} **property**
     *
     * For additional information see {@link Ext.util.MixedCollection#get}.
     *
     * @return {Ext.Component} The component (if found).
     *
     * @since 2.3.0
     */
    getComponent : function(comp) {
        if (Ext.isObject(comp)) {
            comp = comp.getItemId();
        }
        
        var c = this.items.get(comp);
             
        // Only allow finding by index on the main items container
        if (!c && typeof comp != 'number') {
            c = this.floatingItems.get(comp);
        }

        return c;
    },

    /**
     * Determines whether the passed Component is either an immediate child of this Container,
     * or whether it is a descendant.
     *
     * @param {Ext.Component} comp The Component to test.
     * @param {Boolean} [deep=false] Pass `true` to test for the Component being a descendant at any level.
     * @return {Boolean} `true` if the passed Component is contained at the specified level.
     */
    contains: function(comp, deep) {
        var result = false;
        if (deep) {
            this.cascade(function(c) {
                // Only test if the item is a container
                if (c.contains && c.contains(comp)) {
                    result = true;
                    return false;
                }
            });
            return result;
        } else {
            return this.items.contains(comp) || this.floatingItems.contains(comp);
        }
    },

    nextChild: function(child, selector) {
        var me = this,
            result,
            childIndex = me.items.indexOf(child);

        if (childIndex !== -1) {
            result = selector ? Ext.ComponentQuery(selector, me.items.items.slice(childIndex + 1)) : me.items.getAt(childIndex + 1);
            if (!result && me.ownerCt) {
                result = me.ownerCt.nextChild(me, selector);
            }
        }
        return result;
    },

    prevChild: function(child, selector) {
        var me = this,
            result,
            childIndex = me.items.indexOf(child);

        if (childIndex !== -1) {
            result = selector ? Ext.ComponentQuery(selector, me.items.items.slice(childIndex + 1)) : me.items.getAt(childIndex + 1);
            if (!result && me.ownerCt) {
                result = me.ownerCt.nextChild(me, selector);
            }
        }
        return result;
    },

    // @private
    // Enable all immediate children that was previously disabled
    // Override enable because onEnable only gets called when rendered
    enable: function() {
        this.callParent(arguments);

        var itemsToDisable = this.getChildItemsToDisable(),
            length         = itemsToDisable.length,
            item, i;

        for (i = 0; i < length; i++) {
            item = itemsToDisable[i];

            if (item.resetDisable) {
                item.enable();
            }
        }

        return this;
    },

    // Inherit docs
    // Disable all immediate children that was previously disabled
    // Override disable because onDisable only gets called when rendered
    disable: function() {
        this.callParent(arguments);

        var itemsToDisable = this.getChildItemsToDisable(),
            length         = itemsToDisable.length,
            item, i;

        for (i = 0; i < length; i++) {
            item = itemsToDisable[i];

            if (item.resetDisable !== false && !item.disabled) {
                item.disable();
                item.resetDisable = true;
            }
        }

        return this;
    },
    
    /**
     * Gets a list of child components to enable/disable when the container is
     * enabled/disabled
     * @private
     * @return {Ext.Component[]} Items to be enabled/disabled
     */
    getChildItemsToDisable: function(){
        return this.query('[isFormField],button');
    },

    // @private
    // @since 2.3.0
    beforeDestroy : function() {
        var me = this,
            items = me.items,
            floatingItems = me.floatingItems,
            c;

        if (items) {
            while ((c = items.first())) {
                me.doRemove(c, true);
            }
        }
        
        if (floatingItems) {
            while ((c = floatingItems.first())) {
                me.doRemove(c, true);
            }
        }

        Ext.destroy(
            me.layout
        );
        me.callParent();
    }
});
