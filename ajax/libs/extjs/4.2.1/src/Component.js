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
 * Base class for all Ext components.
 *
 * The Component base class has built-in support for basic hide/show and enable/disable and size control behavior.
 *
 * ## xtypes
 *
 * Every component has a specific xtype, which is its Ext-specific type name, along with methods for checking the xtype
 * like {@link #getXType} and {@link #isXType}. See the [Component Guide][1] for more information on xtypes and the
 * Component hierarchy.
 *
 * ## Finding components
 *
 * All Components are registered with the {@link Ext.ComponentManager} on construction so that they can be referenced at
 * any time via {@link Ext#getCmp Ext.getCmp}, passing the {@link #id}.
 *
 * Additionally the {@link Ext.ComponentQuery} provides a CSS-selectors-like way to look up components by their xtype
 * and many other attributes.  For example the following code will find all textfield components inside component with
 * `id: 'myform'`:
 *
 *     Ext.ComponentQuery.query('#myform textfield');
 *
 * ## Extending Ext.Component
 *
 * All subclasses of Component may participate in the automated Ext component
 * lifecycle of creation, rendering and destruction which is provided by the {@link Ext.container.Container Container}
 * class. Components may be added to a Container through the {@link Ext.container.Container#cfg-items items} config option
 * at the time the Container is created, or they may be added dynamically via the
 * {@link Ext.container.Container#method-add add} method.
 *
 * All user-developed visual widgets that are required to participate in automated lifecycle and size management should
 * subclass Component.
 *
 * See the Creating new UI controls chapter in [Component Guide][1] for details on how and to either extend
 * or augment Ext JS base classes to create custom Components.
 *
 * ## The Ext.Component class by itself
 *
 * Usually one doesn't need to instantiate the Ext.Component class. There are subclasses which implement
 * specialized use cases, covering most application needs. However it is possible to instantiate a base
 * Component, and it can be rendered to document, or handled by layouts as the child item of a Container:
 *
 *     @example
 *     Ext.create('Ext.Component', {
 *         html: 'Hello world!',
 *         width: 300,
 *         height: 200,
 *         padding: 20,
 *         style: {
 *             color: '#FFFFFF',
 *             backgroundColor:'#000000'
 *         },
 *         renderTo: Ext.getBody()
 *     });
 *
 * The Component above creates its encapsulating `div` upon render, and use the configured HTML as content. More complex
 * internal structure may be created using the {@link #renderTpl} configuration, although to display database-derived
 * mass data, it is recommended that an ExtJS data-backed Component such as a {@link Ext.view.View View},
 * {@link Ext.grid.Panel GridPanel}, or {@link Ext.tree.Panel TreePanel} be used.
 *
 * [1]: #!/guide/components
 */
Ext.define('Ext.Component', {

    /* Begin Definitions */

    alias: ['widget.component', 'widget.box'],

    extend: 'Ext.AbstractComponent',

    uses: [
        'Ext.util.DelayedTask',
        'Ext.Layer',
        'Ext.resizer.Resizer',
        'Ext.util.ComponentDragger'
    ],

    mixins: {
        floating: 'Ext.util.Floating'
    },

    statics: {
        // Collapse/expand directions
        DIRECTION_TOP: 'top',
        DIRECTION_RIGHT: 'right',
        DIRECTION_BOTTOM: 'bottom',
        DIRECTION_LEFT: 'left',

        VERTICAL_DIRECTION_Re: /^(?:top|bottom)$/,

        // RegExp whih specifies characters in an xtype which must be translated to '-' when generating auto IDs.
        // This includes dot, comma and whitespace
        INVALID_ID_CHARS_Re: /[\.,\s]/g
    },

    /* End Definitions */

    /**
     * @cfg {Boolean/Object} resizable
     * Specify as `true` to apply a {@link Ext.resizer.Resizer Resizer} to this Component after rendering.
     *
     * May also be specified as a config object to be passed to the constructor of {@link Ext.resizer.Resizer Resizer}
     * to override any defaults. By default the Component passes its minimum and maximum size, and uses
     * `{@link Ext.resizer.Resizer#dynamic}: false`
     */

    /**
     * @cfg {String} resizeHandles
     * A valid {@link Ext.resizer.Resizer} handles config string. Only applies when resizable = true.
     */
    resizeHandles: 'all',

    /**
     * @cfg {Boolean} [autoScroll=false]
     * `true` to use overflow:'auto' on the components layout element and show scroll bars automatically when necessary,
     * `false` to clip any overflowing content.
     * This should not be combined with {@link #overflowX} or  {@link #overflowY}.
     */

    /**
     * @cfg {String} overflowX
     * Possible values are:
     *  * `'auto'` to enable automatic horizontal scrollbar (overflow-x: 'auto').
     *  * `'scroll'` to always enable horizontal scrollbar (overflow-x: 'scroll').
     * The default is overflow-x: 'hidden'. This should not be combined with {@link #autoScroll}.
     */

    /**
     * @cfg {String} overflowY
     * Possible values are:
     *  * `'auto'` to enable automatic vertical scrollbar (overflow-y: 'auto').
     *  * `'scroll'` to always enable vertical scrollbar (overflow-y: 'scroll').
     * The default is overflow-y: 'hidden'. This should not be combined with {@link #autoScroll}.
     */

    /**
     * @cfg {Boolean} floating
     * Specify as true to float the Component outside of the document flow using CSS absolute positioning.
     *
     * Components such as {@link Ext.window.Window Window}s and {@link Ext.menu.Menu Menu}s are floating by default.
     *
     * Floating Components that are programatically {@link Ext.Component#method-render rendered} will register
     * themselves with the global {@link Ext.WindowManager ZIndexManager}
     *
     * ### Floating Components as child items of a Container
     *
     * A floating Component may be used as a child item of a Container. This just allows the floating Component to seek
     * a ZIndexManager by examining the ownerCt chain.
     *
     * When configured as floating, Components acquire, at render time, a {@link Ext.ZIndexManager ZIndexManager} which
     * manages a stack of related floating Components. The ZIndexManager brings a single floating Component to the top
     * of its stack when the Component's {@link #toFront} method is called.
     *
     * The ZIndexManager is found by traversing up the {@link #ownerCt} chain to find an ancestor which itself is
     * floating. This is so that descendant floating Components of floating _Containers_ (Such as a ComboBox dropdown
     * within a Window) can have its zIndex managed relative to any siblings, but always **above** that floating
     * ancestor Container.
     *
     * If no floating ancestor is found, a floating Component registers itself with the default {@link Ext.WindowManager
     * ZIndexManager}.
     *
     * Floating components _do not participate in the Container's layout_. Because of this, they are not rendered until
     * you explicitly {@link #method-show} them.
     *
     * After rendering, the ownerCt reference is deleted, and the {@link #floatParent} property is set to the found
     * floating ancestor Container. If no floating ancestor Container was found the {@link #floatParent} property will
     * not be set.
     */
    floating: false,
    
    /**
     * @cfg {String} [defaultAlign="tl-bl?"]
     * The default {@link Ext.util.Positionable#getAlignToXY Ext.Element#getAlignToXY} anchor position value for this menu
     * relative to its element of origin. Used in conjunction with {@link #showBy}.
     */
    defaultAlign: 'tl-bl?',

    /**
     * @cfg {Boolean} toFrontOnShow
     * True to automatically call {@link #toFront} when the {@link #method-show} method is called on an already visible,
     * floating component.
     */
    toFrontOnShow: true,
    
    /**
     * @cfg {Ext.util.Region/Ext.Element} constrainTo
     * A {@link Ext.util.Region Region} (or an element from which a Region measurement will be read) which is used
     * to constrain the component. Only applies when the component is floating.
     */

    /**
     * @cfg {Object/String} constraintInsets
     * An object or a string (in TRBL order) specifying insets from the configured {@link #constrainTo constrain region}
     * within which this component must be constrained when positioning or sizing.
     * example:
     *
     *    constraintInsets: '10 10 10 10' // Constrain with 10px insets from parent
     */

    /**
     * @property {Ext.ZIndexManager} zIndexManager
     * Only present for {@link #floating} Components after they have been rendered.
     *
     * A reference to the ZIndexManager which is managing this Component's z-index.
     *
     * The {@link Ext.ZIndexManager ZIndexManager} maintains a stack of floating Component z-indices, and also provides
     * a single modal mask which is insert just beneath the topmost visible modal floating Component.
     *
     * Floating Components may be {@link #toFront brought to the front} or {@link #toBack sent to the back} of the
     * z-index stack.
     *
     * This defaults to the global {@link Ext.WindowManager ZIndexManager} for floating Components that are
     * programatically {@link Ext.Component#method-render rendered}.
     *
     * For {@link #floating} Components which are added to a Container, the ZIndexManager is acquired from the first
     * ancestor Container found which is floating. If no floating ancestor is found, the global {@link Ext.WindowManager ZIndexManager} is
     * used.
     *
     * See {@link #floating} and {@link #zIndexParent}
     * @readonly
     */

    /**
     * @property {Ext.Container} floatParent
     * **Only present for {@link #floating} Components which were inserted as child items of Containers.**
     *
     * There are other similar relationships such as the {@link Ext.button.Button button} which activates a {@link Ext.button.Button#cfg-menu menu}, or the
     * {@link Ext.menu.Item menu item} which activated a {@link Ext.menu.Item#cfg-menu submenu}, or the
     * {@link Ext.grid.column.Column column header} which activated the column menu.
     *
     * These differences are abstracted away by the {@link #up} method.
     *
     * Floating Components that are programatically {@link Ext.Component#method-render rendered} will not have a `floatParent`
     * property.
     *
     * See {@link #floating} and {@link #zIndexManager}
     * @readonly
     */

    /**
     * @property {Ext.Container} zIndexParent
     * Only present for {@link #floating} Components which were inserted as child items of Containers, and which have a floating
     * Container in their containment ancestry.
     *
     * For {@link #floating} Components which are child items of a Container, the zIndexParent will be a floating
     * ancestor Container which is responsible for the base z-index value of all its floating descendants. It provides
     * a {@link Ext.ZIndexManager ZIndexManager} which provides z-indexing services for all its descendant floating
     * Components.
     *
     * Floating Components that are programatically {@link Ext.Component#method-render rendered} will not have a `zIndexParent`
     * property.
     *
     * For example, the dropdown {@link Ext.view.BoundList BoundList} of a ComboBox which is in a Window will have the
     * Window as its `zIndexParent`, and will always show above that Window, wherever the Window is placed in the z-index stack.
     *
     * See {@link #floating} and {@link #zIndexManager}
     * @readonly
     */

    /**
     * @cfg {Boolean/Object} [draggable=false]
     * Specify as true to make a {@link #floating} Component draggable using the Component's encapsulating element as
     * the drag handle.
     *
     * This may also be specified as a config object for the {@link Ext.util.ComponentDragger ComponentDragger} which is
     * instantiated to perform dragging.
     *
     * For example to create a Component which may only be dragged around using a certain internal element as the drag
     * handle, use the delegate option:
     *
     *     new Ext.Component({
     *         constrain: true,
     *         floating: true,
     *         style: {
     *             backgroundColor: '#fff',
     *             border: '1px solid black'
     *         },
     *         html: '<h1 style="cursor:move">The title</h1><p>The content</p>',
     *         draggable: {
     *             delegate: 'h1'
     *         }
     *     }).show();
     */
    
    /**
     * @cfg {Boolean} [formBind=false]
     * When inside FormPanel, any component configured with `formBind: true` will
     * be enabled/disabled depending on the validity state of the form.
     * See {@link Ext.form.Panel} for more information and example.
     */

    /**
     * @cfg {Number/String} [columnWidth=undefined]
     * Defines the column width inside {@link Ext.layout.container.Column column layout}.
     *
     * Can be specified as a number or as a percentage.
     */

    /**
     * @cfg {"north"/"south"/"east"/"west"/"center"} [region=undefined]
     * Defines the region inside {@link Ext.layout.container.Border border layout}.
     *
     * Possible values:
     *
     * - north - Positions component at top.
     * - south - Positions component at bottom.
     * - east - Positions component at right.
     * - west - Positions component at left.
     * - center - Positions component at the remaining space.
     *   There **must** be a component with `region: "center"` in every border layout.
     */

    hideMode: 'display',
    
    offsetsCls: Ext.baseCSSPrefix + 'hide-offsets',

    bubbleEvents: [],

    defaultComponentLayoutType: 'autocomponent',

    //renderTpl: new Ext.XTemplate(
    //    '<div id="{id}" class="{baseCls} {cls} {cmpCls}<tpl if="typeof ui !== \'undefined\'"> {uiBase}-{ui}</tpl>"<tpl if="typeof style !== \'undefined\'"> style="{style}"</tpl>></div>', {
    //        compiled: true,
    //        disableFormats: true
    //    }
    //),

    /**
     * Creates new Component.
     * @param {Ext.Element/String/Object} config The configuration options may be specified as either:
     *
     * - **an element** : it is set as the internal element and its id used as the component id
     * - **a string** : it is assumed to be the id of an existing element and is used as the component id
     * - **anything else** : it is assumed to be a standard config object and is applied to the component
     */
    constructor: function(config) {
        var me = this;

        config = config || {};
        if (config.initialConfig) {

            // Being initialized from an Ext.Action instance...
            if (config.isAction) {
                me.baseAction = config;
            }
            config = config.initialConfig;
            // component cloning / action set up
        }
        else if (config.tagName || config.dom || Ext.isString(config)) {
            // element object
            config = {
                applyTo: config,
                id: config.id || config
            };
        }

        me.callParent([config]);

        // If we were configured from an instance of Ext.Action, (or configured with a baseAction option),
        // register this Component as one of its items
        if (me.baseAction){
            me.baseAction.addComponent(me);
        }
    },

    /**
     * The initComponent template method is an important initialization step for a Component. It is intended to be
     * implemented by each subclass of Ext.Component to provide any needed constructor logic. The
     * initComponent method of the class being created is called first, with each initComponent method
     * up the hierarchy to Ext.Component being called thereafter. This makes it easy to implement and,
     * if needed, override the constructor logic of the Component at any step in the hierarchy.
     *
     * The initComponent method **must** contain a call to {@link Ext.Base#callParent callParent} in order
     * to ensure that the parent class' initComponent method is also called.
     *
     * All config options passed to the constructor are applied to `this` before initComponent is called,
     * so you can simply access them with `this.someOption`.
     *
     * The following example demonstrates using a dynamic string for the text of a button at the time of
     * instantiation of the class.
     *
     *     Ext.define('DynamicButtonText', {
     *         extend: 'Ext.button.Button',
     *
     *         initComponent: function() {
     *             this.text = new Date();
     *             this.renderTo = Ext.getBody();
     *             this.callParent();
     *         }
     *     });
     *
     *     Ext.onReady(function() {
     *         Ext.create('DynamicButtonText');
     *     });
     *
     * @template
     * @protected
     * @since 1.1.0
     */
    initComponent: function() {
        var me = this;

        me.callParent();

        if (me.listeners) {
            me.on(me.listeners);
            me.listeners = null; //change the value to remove any on prototype
        }
        me.enableBubble(me.bubbleEvents);
    },

    afterRender: function() {
        var me = this;

        me.callParent();

        if (!(me.x && me.y) && (me.pageX || me.pageY)) {
            me.setPagePosition(me.pageX, me.pageY);
        }
    },

    /**
     * Sets the overflow on the content element of the component.
     * @param {Boolean} scroll True to allow the Component to auto scroll.
     * @return {Ext.Component} this
     */
    setAutoScroll : function(scroll) {
        var me = this;

        me.autoScroll = !!scroll;

        // Scrolling styles must be applied to Component's main element.
        // Layouts which use an innerCt (Box layout), shrinkwrap the innerCt round overflowing content,
        // so the innerCt must be scrolled by the container, it does not scroll content.
        if (me.rendered) {
            me.getOverflowEl().setStyle(me.getOverflowStyle());
        }
        me.updateLayout();
        return me;
    },

    /**
     * Sets the overflow x/y on the content element of the component. The x/y overflow
     * values can be any valid CSS overflow (e.g., 'auto' or 'scroll'). By default, the
     * value is 'hidden'. Passing null for one of the values will erase the inline style.
     * Passing `undefined` will preserve the current value.
     *
     * @param {String} overflowX The overflow-x value.
     * @param {String} overflowY The overflow-y value.
     * @return {Ext.Component} this
     */
    setOverflowXY: function(overflowX, overflowY) {
        var me = this,
            argCount = arguments.length;

        if (argCount) {
            me.overflowX = overflowX || '';
            if (argCount > 1) {
                me.overflowY = overflowY || '';
            }
        }

        // Scrolling styles must be applied to Component's main element.
        // Layouts which use an innerCt (Box layout), shrinkwrap the innerCt round overflowing content,
        // so the innerCt must be scrolled by the container, it does not scroll content.
        if (me.rendered) {
            me.getOverflowEl().setStyle(me.getOverflowStyle());
        }
        me.updateLayout();
        return me;
    },

    beforeRender: function () {
        var me = this,
            floating = me.floating,
            cls;

        if (floating) {
            me.addCls(Ext.baseCSSPrefix + 'layer');

            cls = floating.cls;
            if (cls) {
                me.addCls(cls);
            }
        }

        return me.callParent();
    },
    
    beforeLayout: function(){
        this.callParent(arguments);
        if (this.floating) {
            this.onBeforeFloatLayout();
        }    
    },
    
    afterComponentLayout: function(){
        this.callParent(arguments);
        if (this.floating) {
            this.onAfterFloatLayout();
        }
    },

    // @private
    makeFloating : function (dom) {
        this.mixins.floating.constructor.call(this, dom);
    },

    wrapPrimaryEl: function (dom) {
        if (this.floating) {
            this.makeFloating(dom);
        } else {
            this.callParent(arguments);
        }
    },

    initResizable: function(resizable) {
        var me = this;

        resizable = Ext.apply({
            target: me,
            dynamic: false,
            constrainTo: me.constrainTo || (me.floatParent ? me.floatParent.getTargetEl() : null),
            handles: me.resizeHandles
        }, resizable);
        resizable.target = me;
        me.resizer = new Ext.resizer.Resizer(resizable);
    },

    getDragEl: function() {
        return this.el;
    },

    initDraggable: function() {
        var me = this,

            // If we are resizable, and the resizer had to wrap this Component's el (eg an Img)
            // Then we have to create a pseudo-Component out of the resizer to drag that,
            // otherwise, we just drag this Component
            dragTarget = (me.resizer && me.resizer.el !== me.el) ? me.resizerComponent = new Ext.Component({
                el: me.resizer.el,
                rendered: true,
                container: me.container
            }) : me,
            ddConfig = Ext.applyIf({
                el: dragTarget.getDragEl(),
                constrainTo: (me.constrain||me.draggable.constrain) ? (me.constrainTo || (me.floatParent ? me.floatParent.getTargetEl() : me.container)) : undefined
            }, me.draggable);

        // Add extra configs if Component is specified to be constrained
        if (me.constrain || me.constrainDelegate) {
            ddConfig.constrain = me.constrain;
            ddConfig.constrainDelegate = me.constrainDelegate;
        }

        me.dd = new Ext.util.ComponentDragger(dragTarget, ddConfig);
    },

    /**
     * Scrolls this Component's {@link #getTargetEl target element} by the passed delta values, optionally animating.
     *
     * All of the following are equivalent:
     *
     *      comp.scrollBy(10, 10, true);
     *      comp.scrollBy([10, 10], true);
     *      comp.scrollBy({ x: 10, y: 10 }, true);
     *
     * @param {Number/Number[]/Object} deltaX Either the x delta, an Array specifying x and y deltas or
     * an object with "x" and "y" properties.
     * @param {Number/Boolean/Object} deltaY Either the y delta, or an animate flag or config object.
     * @param {Boolean/Object} animate Animate flag/config object if the delta values were passed separately.
     */
    scrollBy: function(deltaX, deltaY, animate) {
        var el;

        if ((el = this.getTargetEl()) && el.dom) {
            el.scrollBy.apply(el, arguments);
        }
    },

    /**
     * This method allows you to show or hide a LoadMask on top of this component.
     *
     * @param {Boolean/Object/String} load True to show the default LoadMask, a config object that will be passed to the
     * LoadMask constructor, or a message String to show. False to hide the current LoadMask.
     * @param {Boolean} [targetEl=false] True to mask the targetEl of this Component instead of the `this.el`. For example,
     * setting this to true on a Panel will cause only the body to be masked.
     * @return {Ext.LoadMask} The LoadMask instance that has just been shown.
     */
    setLoading : function(load, targetEl) {
        var me = this,
            config = {
                target: me
            };

        if (me.rendered) {
            Ext.destroy(me.loadMask);
            me.loadMask = null;

            if (load !== false && !me.collapsed) {
                if (Ext.isObject(load)) {
                    Ext.apply(config, load);
                } else if (Ext.isString(load)) {
                    config.msg = load;
                }
                
                if (targetEl) {
                    Ext.applyIf(config, {
                        useTargetEl: true
                    });
                }
                me.loadMask = new Ext.LoadMask(config);
                me.loadMask.show();
            }
        }
        return me.loadMask;
    },

    beforeSetPosition: function () {
        var me = this,
            pos = me.callParent(arguments), // pass all args on for signature decoding
            adj;

        if (pos) {
            adj = me.adjustPosition(pos.x, pos.y);
            pos.x = adj.x;
            pos.y = adj.y;
        }
        return pos || null;
    },

    afterSetPosition: function(ax, ay) {
        this.onPosition(ax, ay);
        this.fireEvent('move', this, ax, ay);
    },

    /**
     * Displays component at specific xy position.
     * A floating component (like a menu) is positioned relative to its ownerCt if any.
     * Useful for popping up a context menu:
     *
     *     listeners: {
     *         itemcontextmenu: function(view, record, item, index, event, options) {
     *             Ext.create('Ext.menu.Menu', {
     *                 width: 100,
     *                 height: 100,
     *                 margin: '0 0 10 0',
     *                 items: [{
     *                     text: 'regular item 1'
     *                 },{
     *                     text: 'regular item 2'
     *                 },{
     *                     text: 'regular item 3'
     *                 }]
     *             }).showAt(event.getXY());
     *         }
     *     }
     *
     * @param {Number/Number[]} x The new x position or array of `[x,y]`.
     * @param {Number} [y] The new y position
     * @param {Boolean/Object} [animate] True to animate the Component into its new position. You may also pass an
     * animation configuration.
     * @return {Ext.Component} this
     */
    showAt: function(x, y, animate) {
        var me = this;

        // Not rendered, then animating to a position is meaningless,
        // just set the x,y position and allow show's processing to work.
        if (!me.rendered && (me.autoRender || me.floating)) {
            me.x = x;
            me.y = y;
            return me.show();
        }
        if (me.floating) {
            me.setPosition(x, y, animate);
        } else {
            me.setPagePosition(x, y, animate);
        }
        me.show();
    },
    
    /**
     * Shows this component by the specified {@link Ext.Component Component} or {@link Ext.Element Element}.
     * Used when this component is {@link #floating}.
     * @param {Ext.Component/Ext.dom.Element} component The {@link Ext.Component} or {@link Ext.Element} to show the component by.
     * @param {String} [position] Alignment position as used by {@link Ext.util.Positionable#getAlignToXY}.
     * Defaults to `{@link #defaultAlign}`.
     * @param {Number[]} [offsets] Alignment offsets as used by {@link Ext.util.Positionable#getAlignToXY}.
     * @return {Ext.Component} this
     */
    showBy: function(cmp, pos, off) {
        var me = this;
        
        //<debug>
        if (!me.floating) {
            Ext.log.warn('Using showBy on a non-floating component');
            return me;
        }
        //</debug>

        if (me.floating && cmp) {
            me.show();

            // Show may have been vetoed
            if (me.rendered && !me.hidden) {
                // Align to Component or Element using alignTo because normal show methods
                // are container-relative, and we must align to the requested element or
                // Component:
                me.alignTo(cmp, pos || me.defaultAlign, off);
            }
        }
        return me;
    },

    /**
     * Sets the page XY position of the component. To set the left and top instead, use {@link #setPosition}.
     * This method fires the {@link #event-move} event.
     * @param {Number/Number[]} x The new x position or an array of `[x,y]`.
     * @param {Number} [y] The new y position.
     * @param {Boolean/Object} [animate] True to animate the Component into its new position. You may also pass an
     * animation configuration.
     * @return {Ext.Component} this
     */
    setPagePosition: function(x, y, animate) {
        var me = this,
            p,
            floatParentBox;

        if (Ext.isArray(x)) {
            y = x[1];
            x = x[0];
        }
        me.pageX = x;
        me.pageY = y;

        if (me.floating) {

            // Floating Components which are registered with a Container have to have their x and y properties made relative
            if (me.isContainedFloater()) {
                floatParentBox = me.floatParent.getTargetEl().getViewRegion();
                if (Ext.isNumber(x) && Ext.isNumber(floatParentBox.left)) {
                    x -= floatParentBox.left;
                }
                if (Ext.isNumber(y) && Ext.isNumber(floatParentBox.top)) {
                    y -= floatParentBox.top;
                }
            } else {
                p = me.el.translateXY(x, y);
                x = p.x;
                y = p.y;
            }

            me.setPosition(x, y, animate);
        } else {
            p = me.el.translateXY(x, y);
            me.setPosition(p.x, p.y, animate);
        }

        return me;
    },

    // Utility method to determine if a Component is floating, and has an owning Container whose coordinate system
    // it must be positioned in when using setPosition.
    isContainedFloater: function() {
        return (this.floating && this.floatParent);
    },

    /**
     * Sets the current box measurements of the component's underlying element.
     * @param {Object} box An object in the format {x, y, width, height}
     * @return {Ext.Component} this
     */
    updateBox : function(box){
        this.setSize(box.width, box.height);
        this.setPagePosition(box.x, box.y);
        return this;
    },

    // Include margins
    getOuterSize: function() {
        var el = this.el;
        return {
            width: el.getWidth() + el.getMargin('lr'),
            height: el.getHeight() + el.getMargin('tb')
        };
    },

    // @private
    adjustPosition: function(x, y) {
        var me = this,
            floatParentBox;

        // Floating Components being positioned in their ownerCt have to be made absolute.
        if (me.isContainedFloater()) {
            floatParentBox = me.floatParent.getTargetEl().getViewRegion();
            x += floatParentBox.left;
            y += floatParentBox.top;
        }

        return {
            x: x,
            y: y
        };
    },

    /**
     * Gets the current XY position of the component's underlying element.
     * @param {Boolean} [local=false] If true the element's left and top are returned instead of page XY.
     * @return {Number[]} The XY position of the element (e.g., [100, 200])
     */
    getPosition: function(local) {
        var me = this,
            xy,
            isContainedFloater = me.isContainedFloater(),
            floatParentBox;

        // Local position for non-floaters means element's local position
        if ((local === true) && !isContainedFloater) {
            return [me.getLocalX(), me.getLocalY()];
        }

        xy = me.getXY();

        // Local position for floaters means position relative to the container's target element
        if ((local === true) && isContainedFloater) {
            floatParentBox = me.floatParent.getTargetEl().getViewRegion();
            xy[0] -= floatParentBox.left;
            xy[1] -= floatParentBox.top;
        }
        return xy;
    },

    getId: function() {
        var me = this,
            xtype;

        if (!me.id) {
            xtype = me.getXType();
            if (xtype) {
                xtype = xtype.replace(Ext.Component.INVALID_ID_CHARS_Re, '-');
            } else {
                xtype = Ext.name.toLowerCase() + '-comp';
            }
            me.id = xtype + '-' + me.getAutoId();
        }
        return me.id;
    },

    /**
     * Shows this Component, rendering it first if {@link #autoRender} or {@link #floating} are `true`.
     *
     * After being shown, a {@link #floating} Component (such as a {@link Ext.window.Window}), is activated it and
     * brought to the front of its {@link #zIndexManager z-index stack}.
     *
     * @param {String/Ext.Element} [animateTarget=null] **only valid for {@link #floating} Components such as {@link
     * Ext.window.Window Window}s or {@link Ext.tip.ToolTip ToolTip}s, or regular Components which have been configured
     * with `floating: true`.** The target from which the Component should animate from while opening.
     * @param {Function} [callback] A callback function to call after the Component is displayed.
     * Only necessary if animation was specified.
     * @param {Object} [scope] The scope (`this` reference) in which the callback is executed.
     * Defaults to this Component.
     * @return {Ext.Component} this
     */
    show: function(animateTarget, cb, scope) {
        var me = this,
            rendered = me.rendered;

        if (me.hierarchicallyHidden || (me.floating && !rendered && me.isHierarchicallyHidden())) {
            // If this is a hierarchically hidden floating component, we need to stash
            // the arguments to this call so that the call can be deferred until the next
            // time syncHidden() is called.
            if (!rendered) {
                // If the component has not yet been rendered it requires special treatment.
                // Normally, for rendered components we can just set the pendingShow property
                // and syncHidden() listens to events in the hierarchyEventSource and calls
                // show() when this component becomes hierarchically visible.  However,
                // if the component has not yet been rendered the hierarchy event listeners
                // have not yet been attached (since Floating is initialized during the
                // render phase.  This means we have to initialize the hierarchy event
                // listeners right now to ensure that the component will show itself when
                // it becomes hierarchically visible.  
                me.initHierarchyEvents();
            }
            // defer the show call until next syncHidden(), but ignore animateTarget.
            if (arguments.length > 1) {
                arguments[0] = null;
                me.pendingShow = arguments;
            } else {
                me.pendingShow = true;
            }
        } else if (rendered && me.isVisible()) {
            if (me.toFrontOnShow && me.floating) {
                me.toFront();
            }
        } else {
            if (me.fireEvent('beforeshow', me) !== false) {
                me.hidden = false;
                delete this.getHierarchyState().hidden;
                // Render on first show if there is an autoRender config, or if this
                // is a floater (Window, Menu, BoundList etc).
                
                // We suspend layouts here because floaters/autoRenders
                // will layout when onShow is called. If the render succeeded,
                // the layout will be trigger inside onShow, so we don't flush
                // in the first block. If, for some reason we couldn't render, then
                // we resume layouts and force a flush because we don't know if something
                // will force it.
                Ext.suspendLayouts();
                if (!rendered && (me.autoRender || me.floating)) {
                    me.doAutoRender();
                    rendered = me.rendered;
                }
            
                if (rendered) {
                    me.beforeShow();
                    Ext.resumeLayouts();
                    me.onShow.apply(me, arguments);
                    me.afterShow.apply(me, arguments);
                } else {
                    Ext.resumeLayouts(true);
                }
            } else {
                me.onShowVeto();
            }
        }
        return me;
    },
    
    onShowVeto: Ext.emptyFn,

    /**
     * Invoked before the Component is shown.
     *
     * @method
     * @template
     * @protected
     */
    beforeShow: Ext.emptyFn,

    /**
     * Allows addition of behavior to the show operation. After
     * calling the superclass's onShow, the Component will be visible.
     *
     * Override in subclasses where more complex behaviour is needed.
     *
     * Gets passed the same parameters as #show.
     *
     * @param {String/Ext.Element} [animateTarget]
     * @param {Function} [callback]
     * @param {Object} [scope]
     *
     * @template
     * @protected
     */
    onShow: function() {
        var me = this;

        me.el.show();
        me.callParent(arguments);

        // Constraining/containing element may have changed size while this Component was hidden
        if (me.floating) {
            if (me.maximized) {
                me.fitContainer();
            }
            else if (me.constrain) {
                me.doConstrain();
            }
        }
    },
    
    getAnimateTarget: function(target){
        target = target || this.animateTarget;
        if (target) {
            target = target.isComponent ? target.getEl() : Ext.get(target);
        }
        return target || null;
    },

    /**
     * Invoked after the Component is shown (after #onShow is called).
     *
     * Gets passed the same parameters as #show.
     *
     * @param {String/Ext.Element} [animateTarget]
     * @param {Function} [callback]
     * @param {Object} [scope]
     *
     * @template
     * @protected
     */
    afterShow: function(animateTarget, cb, scope) {
        var me = this,
            myEl = me.el,
            fromBox,
            toBox,
            ghostPanel;

        // Default to configured animate target if none passed
        animateTarget = me.getAnimateTarget(animateTarget);

        // Need to be able to ghost the Component
        if (!me.ghost) {
            animateTarget = null;
        }
        // If we're animating, kick of an animation of the ghost from the target to the *Element* current box
        if (animateTarget) {
            toBox = {
                x: myEl.getX(),
                y: myEl.getY(),
                width: myEl.dom.offsetWidth,
                height: myEl.dom.offsetHeight
            };
            fromBox = {
                x: animateTarget.getX(),
                y: animateTarget.getY(),
                width: animateTarget.dom.offsetWidth,
                height: animateTarget.dom.offsetHeight
            };
            myEl.addCls(me.offsetsCls);
            ghostPanel = me.ghost();
            ghostPanel.el.stopAnimation();

            // Shunting it offscreen immediately, *before* the Animation class grabs it ensure no flicker.
            ghostPanel.setX(-10000);

            me.ghostBox = toBox;
            ghostPanel.el.animate({
                from: fromBox,
                to: toBox,
                listeners: {
                    afteranimate: function() {
                        delete ghostPanel.componentLayout.lastComponentSize;
                        me.unghost();
                        delete me.ghostBox;
                        myEl.removeCls(me.offsetsCls);
                        me.onShowComplete(cb, scope);
                    }
                }
            });
        }
        else {
            me.onShowComplete(cb, scope);
        }
        me.fireHierarchyEvent('show');
    },

    /**
     * Invoked after the #afterShow method is complete.
     *
     * Gets passed the same `callback` and `scope` parameters that #afterShow received.
     *
     * @param {Function} [callback]
     * @param {Object} [scope]
     *
     * @template
     * @protected
     */
    onShowComplete: function(cb, scope) {
        var me = this;
        if (me.floating) {
            me.toFront();
            me.onFloatShow();
        }
        Ext.callback(cb, scope || me);
        me.fireEvent('show', me);
        delete me.hiddenByLayout;
    },

    /**
     * Hides this Component, setting it to invisible using the configured {@link #hideMode}.
     * @param {String/Ext.Element/Ext.Component} [animateTarget=null] **only valid for {@link #cfg-floating} Components
     * such as {@link Ext.window.Window Window}s or {@link Ext.tip.ToolTip ToolTip}s, or regular Components which have
     * been configured with `floating: true`.**. The target to which the Component should animate while hiding.
     * @param {Function} [callback] A callback function to call after the Component is hidden.
     * @param {Object} [scope] The scope (`this` reference) in which the callback is executed.
     * Defaults to this Component.
     * @return {Ext.Component} this
     */
    hide: function(animateTarget, cb, scope) {
        var me = this,
            continueHide;

        if (me.pendingShow) {
            // If this is a hierarchically hidden floating component with a pending show
            // hide() simply cancels the pending show.
            delete me.pendingShow;
        } if (!(me.rendered && !me.isVisible())) {
            continueHide = (me.fireEvent('beforehide', me) !== false);
            if (me.hierarchicallyHidden || continueHide) {
                me.hidden = true;
                me.getHierarchyState().hidden = true;
                if (me.rendered) {
                    me.onHide.apply(me, arguments);
                }
            }
        }
        return me;
    },

    /**
     * Possibly animates down to a target element.
     *
     * Allows addition of behavior to the hide operation. After
     * calling the superclass’s onHide, the Component will be hidden.
     *
     * Gets passed the same parameters as #hide.
     *
     * @param {String/Ext.Element/Ext.Component} [animateTarget]
     * @param {Function} [callback]
     * @param {Object} [scope]
     *
     * @template
     * @protected
     */
    onHide: function(animateTarget, cb, scope) {
        var me = this,
            ghostPanel,
            fromSize,
            toBox;

        // Default to configured animate target if none passed
        animateTarget = me.getAnimateTarget(animateTarget);

        // Need to be able to ghost the Component
        if (!me.ghost) {
            animateTarget = null;
        }
        // If we're animating, kick off an animation of the ghost down to the target
        if (animateTarget) {
            toBox = {
                x: animateTarget.getX(),
                y: animateTarget.getY(),
                width: animateTarget.dom.offsetWidth,
                height: animateTarget.dom.offsetHeight
            };
            ghostPanel = me.ghost();
            ghostPanel.el.stopAnimation();
            fromSize = me.getSize();
            ghostPanel.el.animate({
                to: toBox,
                listeners: {
                    afteranimate: function() {
                        delete ghostPanel.componentLayout.lastComponentSize;
                        ghostPanel.el.hide();
                        ghostPanel.el.setSize(fromSize);
                        me.afterHide(cb, scope);
                    }
                }
            });
        }
        me.el.hide();
        if (!animateTarget) {
            me.afterHide(cb, scope);
        }
    },

    /**
     * Invoked after the Component has been hidden.
     *
     * Gets passed the same `callback` and `scope` parameters that #onHide received.
     *
     * @param {Function} [callback]
     * @param {Object} [scope]
     *
     * @template
     * @protected
     */
    afterHide: function(cb, scope) {
        var me = this,
            activeEl = Ext.Element.getActiveElement();

        me.hiddenByLayout = null;

        // we are the back-end method of onHide at this level, but our call to our parent
        // may need to be async... so callParent won't quite work here...
        Ext.AbstractComponent.prototype.onHide.call(me);

        // If hiding a Component which is focused, or contains focus: blur the focused el. 
        if (activeEl === me.el || me.el.contains(activeEl)) {
            Ext.fly(activeEl).blur();
        }

        Ext.callback(cb, scope || me);
        me.fireEvent('hide', me);
        me.fireHierarchyEvent('hide');
    },

    /**
     * Allows addition of behavior to the destroy operation.
     * After calling the superclass's onDestroy, the Component will be destroyed.
     *
     * @template
     * @protected
     */
    onDestroy: function() {
        var me = this;

        // Ensure that any ancillary components are destroyed.
        if (me.rendered) {
            Ext.destroy(
                me.dd,
                me.resizer,
                me.proxy,
                me.proxyWrap,
                me.resizerComponent
            );
        }
        delete me.focusTask;
        me.callParent();
    },

    deleteMembers: function() {
        var args = arguments,
            len = args.length,
            i = 0;
        for (; i < len; ++i) {
            delete this[args[i]];
        }
    },

    /**
     * Try to focus this component.
     * @param {Boolean} [selectText] If applicable, true to also select the text in this component
     * @param {Boolean/Number} [delay] Delay the focus this number of milliseconds (true for 10 milliseconds).
     * @param {Function} [callback] Only needed if the `delay` parameter is used. A function to call upon focus.
     * @param {Function} [scope] Only needed if the `delay` parameter is used. The scope (`this` reference) in which to execute the callback.
     * @return {Ext.Component} The focused Component. Usually <code>this</code> Component. Some Containers may
     * delegate focus to a descendant Component ({@link Ext.window.Window Window}s can do this through their
     * {@link Ext.window.Window#defaultFocus defaultFocus} config option.
     */
    focus: function(selectText, delay, callback, scope) {
        var me = this,
            focusEl,
            focusElDom,
            containerScrollTop;

        // If delay is wanted, queue a call to this function.
        if (delay) {
            if (!me.focusTask) {
                // One global DelayedTask to assign focus
                // So that the last focus call wins.
                Ext.Component.prototype.focusTask = new Ext.util.DelayedTask(me.focus);
            }
            me.focusTask.delay(Ext.isNumber(delay) ? delay : 10, null, me, [selectText, false, callback, scope]);
            return me;
        }

        // An immediate focus call must cancel any outstanding delayed focus calls.
        if (me.focusTask) {
            me.focusTask.cancel();
        }

        if (me.rendered && !me.isDestroyed && me.isVisible(true) && (focusEl = me.getFocusEl())) {

            // getFocusEl might return a Component if a Container wishes to delegate focus to a descendant.
            // Window can do this via its defaultFocus configuration which can reference a Button.
            if (focusEl.isComponent) {
                return focusEl.focus(selectText, delay);
            }

            // If it was an Element with a dom property
            if ((focusElDom = focusEl.dom)) {

                // Not a natural focus holding element, add a tab index to make it programatically focusable.
                if (focusEl.needsTabIndex()) {
                    focusElDom.tabIndex = -1;
                }

                if (me.floating) {
                    containerScrollTop = me.container.dom.scrollTop;
                }

                // Focus the element.
                // The focusEl has a DOM focus listener on it which invokes the Component's onFocus method
                // to perform Component-specific focus processing
                focusEl.focus();
                if (selectText === true) {
                    focusElDom.select();
                }

                // Call the callback when focus is done
                Ext.callback(callback, scope);
            }

            // Focusing a floating Component brings it to the front of its stack.
            // this is performed by its zIndexManager. Pass preventFocus true to avoid recursion.
            if (me.floating) {
                me.toFront(true);
                if (containerScrollTop !== undefined) {
                    me.container.dom.scrollTop = containerScrollTop;
                }
            }
        }
        return me;
    },

    /**
     * Cancel any deferred focus on this component
     * @protected
     */
    cancelFocus: function() {
        var task = this.focusTask;
        if (task) {
            task.cancel();
        }
    },

    // @private
    blur: function() {
        var focusEl;
        if (this.rendered && (focusEl = this.getFocusEl())) {
            focusEl.blur();
        }
        return this;
    },

    getEl: function() {
        return this.el;
    },

    // Deprecate 5.0
    getResizeEl: function() {
        return this.el;
    },

    // Deprecate 5.0
    getPositionEl: function() {
        return this.el;
    },

    // Deprecate 5.0
    getActionEl: function() {
        return this.el;
    },

    // Deprecate 5.0
    getVisibilityEl: function() {
        return this.el;
    },

    /*
     * @protected
     * Used by {@link Ext.ComponentQuery ComponentQuery}, and the {@link Ext.AbstractComponent#up up} method to find the
     * owning Component in the linkage hierarchy.
     *
     * By default this returns the Container which contains this Component.
     *
     * This may be overriden by Component authors who implement ownership hierarchies which are not
     * based upon ownerCt, such as BoundLists being owned by Fields or Menus being owned by Buttons.
     */
    getRefOwner: function() {
        return this.ownerCt || this.floatParent;
    },

    /**
     * @protected
     * Implements an upward event bubbling policy. By default a Component bubbles events up to its {@link #getRefOwner reference owner}.
     *
     * Component subclasses may implement a different bubbling strategy by overriding this method.
     */
    getBubbleTarget: function() {
        return this.getRefOwner();
    },

    // @private
    getContentTarget: function() {
        return this.el;
    },

    /**
     * Clone the current component using the original config values passed into this instance by default.
     * @param {Object} overrides A new config containing any properties to override in the cloned version.
     * An id property can be passed on this object, otherwise one will be generated to avoid duplicates.
     * @return {Ext.Component} clone The cloned copy of this component
     */
    cloneConfig: function(overrides) {
        overrides = overrides || {};
        var id = overrides.id || Ext.id(),
            cfg = Ext.applyIf(overrides, this.initialConfig),
            self;

        cfg.id = id;

        self = Ext.getClass(this);

        // prevent dup id
        return new self(cfg);
    },

    /**
     * Gets the xtype for this component as registered with {@link Ext.ComponentManager}. For a list of all available
     * xtypes, see the {@link Ext.Component} header. Example usage:
     *
     *     var t = new Ext.form.field.Text();
     *     alert(t.getXType());  // alerts 'textfield'
     *
     * @return {String} The xtype
     */
    getXType: function() {
        return this.self.xtype;
    },

    /**
     * Find a container above this component at any level by a custom function. If the passed function returns true, the
     * container will be returned.
     *
     * See also the {@link Ext.Component#up up} method.
     *
     * @param {Function} fn The custom function to call with the arguments (container, this component).
     * @return {Ext.container.Container} The first Container for which the custom function returns true
     */
    findParentBy: function(fn) {
        var p;

        // Iterate up the ownerCt chain until there's no ownerCt, or we find an ancestor which matches using the selector function.
        for (p = this.getBubbleTarget(); p && !fn(p, this); p = p.getBubbleTarget()) {
            // do nothing
        }
        return p || null;
    },

    /**
     * Find a container above this component at any level by xtype or class
     *
     * See also the {@link Ext.Component#up up} method.
     *
     * @param {String/Ext.Class} xtype The xtype string for a component, or the class of the component directly
     * @return {Ext.container.Container} The first Container which matches the given xtype or class
     */
    findParentByType: function(xtype) {
        return Ext.isFunction(xtype) ?
            this.findParentBy(function(p) {
                return p.constructor === xtype;
            })
        :
            this.up(xtype);
    },

    /**
     * Bubbles up the component/container heirarchy, calling the specified function with each component. The scope
     * (*this*) of function call will be the scope provided or the current component. The arguments to the function will
     * be the args provided or the current component. If the function returns false at any point, the bubble is stopped.
     *
     * @param {Function} fn The function to call
     * @param {Object} [scope] The scope of the function. Defaults to current node.
     * @param {Array} [args] The args to call the function with. Defaults to passing the current component.
     * @return {Ext.Component} this
     */
    bubble: function(fn, scope, args) {
        var p = this;
        while (p) {
            if (fn.apply(scope || p, args || [p]) === false) {
                break;
            }
            p = p.getBubbleTarget();
        }
        return this;
    },

    getProxy: function() {
        var me = this,
            target;

        if (!me.proxy) {
            target = Ext.getBody();
            me.proxy = me.el.createProxy(Ext.baseCSSPrefix + 'proxy-el', target, true);
        }
        return me.proxy;
    },

    /*
     * For more information on the hierarchy events, see the note for the
     * hierarchyEventSource observer defined in the onClassCreated callback.
     * 
     * This functionality is contained in Component (as opposed to Container)
     * because a Component can be the ownerCt for a floating component (loadmask),
     * and the loadmask needs to know when its owner is shown/hidden via the
     * hierarchyEventSource so that its hidden state can be synchronized.
     * 
     * TODO: merge this functionality with Ext.globalEvents
     */
    fireHierarchyEvent: function (ename) {
        this.hierarchyEventSource.fireEvent(ename, this);
    },

    onAdded: function() {
        this.callParent(arguments);
        if (this.hierarchyEventSource.hasListeners.added) {
            this.fireHierarchyEvent('added');
        }
    }
}, function () {
    /*
     * The observer below is used to be able to detect showing/hiding at various levels
     * in the hierarchy. While it's not particularly expensive to bubble an event up,
     * cascading an event down can be quite costly.
     * 
     * The main usage for this is to do with floating components. For example, the load mask
     * is a floating component. The component it is masking may be inside several containers.
     * As such, we need to know when component is hidden, either directly, or via a parent
     * container being hidden. We can subscribe to these events and filter out the appropriate
     * container.
     */
    this.hierarchyEventSource = this.prototype.hierarchyEventSource = new Ext.util.Observable({ events: {
        hide: true,
        show: true,
        collapse: true,
        expand: true,
        added: true
    }});
});
