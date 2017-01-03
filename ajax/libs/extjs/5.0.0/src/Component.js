/**
 * Base class for all Ext components.
 *
 * The Component base class has built-in support for basic hide/show and enable/disable
 * and size control behavior.
 *
 * ## xtypes
 *
 * Every component has a specific xtype, which is its Ext-specific type name, along with
 * methods for checking the xtype like {@link #getXType} and {@link #isXType}. See the
 * [Component Guide][1] for more information on xtypes and the Component hierarchy.
 *
 * ## Finding components
 *
 * All Components are registered with the {@link Ext.ComponentManager} on construction so
 * that they can be referenced at any time via {@link Ext#getCmp Ext.getCmp}, passing the
 * {@link #id}.
 *
 * Additionally the {@link Ext.ComponentQuery} provides a CSS-selectors-like way to look
 * up components by their xtype and many other attributes.  For example the following code
 * will find all textfield components inside component with `id: 'myform'`:
 *
 *     Ext.ComponentQuery.query('#myform textfield');
 *
 * ## Extending Ext.Component
 *
 * All subclasses of Component may participate in the automated Ext component
 * lifecycle of creation, rendering and destruction which is provided by the
 * {@link Ext.container.Container Container} class. Components may be added to a Container
 * through the {@link Ext.container.Container#cfg-items items} config option at the time
 * the Container is created, or they may be added dynamically via the
 * {@link Ext.container.Container#method-add add} method.
 *
 * All user-developed visual widgets that are required to participate in automated
 * lifecycle and size management should subclass Component.
 *
 * See the Creating new UI controls chapter in [Component Guide][1] for details on how and
 * to either extend or augment Ext JS base classes to create custom Components.
 *
 * ## The Ext.Component class by itself
 *
 * Usually one doesn't need to instantiate the Ext.Component class. There are subclasses
 * which implement specialized use cases, covering most application needs. However it is
 * possible to instantiate a base Component, and it can be rendered to document, or handled
 * by layouts as the child item of a Container:
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
 * The Component above creates its encapsulating `div` upon render, and use the configured
 * HTML as content. More complex internal structure may be created using the
 * {@link #renderTpl} configuration, although to display database-derived mass data, it is
 * recommended that an ExtJS data-backed Component such as a {@link Ext.view.View View},
 * {@link Ext.grid.Panel GridPanel}, or {@link Ext.tree.Panel TreePanel} be used.
 *
 * [1]: #!/guide/components
 */
Ext.define('Ext.Component', {
    alternateClassName: 'Ext.AbstractComponent',

    xtype: [
        'component',
        'box'
    ],

    requires: [
        'Ext.ComponentQuery',
        'Ext.ComponentManager',
        'Ext.util.ProtoElement',
        'Ext.dom.CompositeElement'
    ],

    mixins: [
        'Ext.mixin.Inheritable',
        'Ext.util.Positionable',
        'Ext.util.Observable',
        'Ext.mixin.Bindable',
        'Ext.util.Animate',
        'Ext.util.ElementContainer',
        'Ext.util.Renderable',
        'Ext.state.Stateful',
        'Ext.util.Floating'
    ],

    uses: [
        'Ext.overrides.*',
        'Ext.Element',
        'Ext.DomHelper',
        'Ext.XTemplate',
        'Ext.ComponentLoader',
        'Ext.layout.Context',
        'Ext.layout.Layout',
        'Ext.layout.component.Auto',
        'Ext.LoadMask',
        'Ext.ZIndexManager',
        'Ext.scroll.Manager',
        'Ext.util.DelayedTask',
        'Ext.Layer',
        'Ext.resizer.Resizer',
        'Ext.util.ComponentDragger'
    ],

    statics: {
        AUTO_ID: 1000,

        pendingLayouts: null,

        layoutSuspendCount: 0,

        // Collapse/expand directions
        DIRECTION_TOP: 'top',
        DIRECTION_RIGHT: 'right',
        DIRECTION_BOTTOM: 'bottom',
        DIRECTION_LEFT: 'left',

        VERTICAL_DIRECTION_Re: /^(?:top|bottom)$/,

        // RegExp whih specifies characters in an xtype which must be translated to '-' when generating auto IDs.
        // This includes dot, comma and whitespace
        INVALID_ID_CHARS_Re: /[\.,\s]/g,
        
        /**
         * @property {String} componentIdAttribute
         * Name of the element attribute containing its Component id. Used to look up Components
         * by their Elements.
         *
         * @private
         */
        componentIdAttribute: 'componentId',
        
        /**
         * Cancels layout of a component.
         * @param {Ext.Component} comp
         */
        cancelLayout: function(comp, isDestroying) {
            var context = this.runningLayoutContext || this.pendingLayouts;

            if (context) {
                context.cancelComponent(comp, false, isDestroying);
            }
        },

        /**
         * Performs all pending layouts that were scheduled while
         * {@link Ext.Component#suspendLayouts suspendLayouts} was in effect.
         * @static
         */
        flushLayouts: function () {
            var me = this,
                context = me.pendingLayouts;

            if (context && context.invalidQueue.length) {
                me.pendingLayouts = null;
                me.runningLayoutContext = context;

                Ext.override(context, {
                    runComplete: function () {
                        // we need to release the layout queue before running any of the
                        // finishedLayout calls because they call afterComponentLayout
                        // which can re-enter by calling doLayout/doComponentLayout.
                        me.runningLayoutContext = null;
                         
                        var result = this.callParent(); // not "me" here!
                        if (Ext.GlobalEvents.hasListeners.afterlayout) {
                            Ext.GlobalEvents.fireEvent('afterlayout');
                        }
                        return result;
                    }
                });

                context.run();
            }
        },

        /**
         * Resumes layout activity in the whole framework.
         *
         * {@link Ext#suspendLayouts} is alias of {@link Ext.Component#suspendLayouts}.
         *
         * @param {Boolean} [flush=false] `true` to perform all the pending layouts. This can also be
         * achieved by calling {@link Ext.Component#flushLayouts flushLayouts} directly.
         * @static
         */
        resumeLayouts: function (flush) {
            if (this.layoutSuspendCount && ! --this.layoutSuspendCount) {
                if (flush) {
                    this.flushLayouts();
                }
                if (Ext.GlobalEvents.hasListeners.resumelayouts) {
                    Ext.GlobalEvents.fireEvent('resumelayouts');
                }
            }
        },

        /**
         * Stops layouts from happening in the whole framework.
         *
         * It's useful to suspend the layout activity while updating multiple components and
         * containers:
         *
         *     Ext.suspendLayouts();
         *     // batch of updates...
         *     Ext.resumeLayouts(true);
         *
         * {@link Ext#suspendLayouts} is alias of {@link Ext.Component#suspendLayouts}.
         *
         * See also {@link Ext#batchLayouts} for more abstract way of doing this.
         *
         * @static
         */
        suspendLayouts: function () {
            ++this.layoutSuspendCount;
        },

        /**
         * Updates layout of a component.
         *
         * @param {Ext.Component} comp The component to update.
         * @param {Boolean} [defer=false] `true` to just queue the layout if this component.
         * @static
         */
        updateLayout: function (comp, defer) {
            var me = this,
                running = me.runningLayoutContext,
                pending;

            if (running) {
                running.queueInvalidate(comp);
            } else {
                pending = me.pendingLayouts || (me.pendingLayouts = new Ext.layout.Context());
                pending.queueInvalidate(comp);

                if (!defer && !me.layoutSuspendCount && !comp.isLayoutSuspended()) {
                    me.flushLayouts();
                }
            }
        }
    },

    // <editor-fold desc="Config">
    // ***********************************************************************************
    // Begin Config
    // ***********************************************************************************

    // We do not want "_hidden" style backing properties.
    $configPrefixed: false,
    // We also want non-config system properties to go to the instance.
    $configStrict: false,

    config: {
        /**
         * @cfg {Object} data
         * The initial set of data to apply to the `{@link #tpl}` to update the content
         * area of the Component.
         *
         * @since 3.4.0
         */
        data: null

        /**
         * @cfg {Boolean} modelValidation
         * This config enables binding to your `{@link Ext.data.Model#validators}`. This
         * is only processed by form fields (e.g., `Ext.form.field.Text`) at present, but
         * this setting is inherited and so can be set on a parent container.
         *
         * When set to `true` by a component or not set by a component but inherited from
         * an ancestor container, `Ext.data.Validation` records are used to automatically
         * bind validation results for any form field to which a `value` is bound.
         *
         * While this config can be set arbitrarily high in the component hierarchy, doing
         * so can create a lot overhead if most of your form fields do not actually rely on
         * `validators` in your data model.
         *
         * Using this setting for a form that is bound to an `Ext.data.Model` might look
         * like this:
         *
         *      {
         *          xtype: 'panel',
         *          modelValidation: true,
         *          items: [{
         *              xtype: 'textfield',
         *              bind: '{theUser.firstName}'
         *          },{
         *              xtype: 'textfield',
         *              bind: '{theUser.lastName}'
         *          },{
         *              xtype: 'textfield',
         *              bind: '{theUser.phoneNumber}'
         *          },{
         *              xtype: 'textfield',
         *              bind: '{theUser.email}'
         *          }]
         *      }
         *
         * The above is equivalent to the following manual binding of validation:
         *
         *      {
         *          xtype: 'panel',
         *          items: [{
         *              xtype: 'textfield',
         *              bind: {
         *                  value:      '{theUser.firstName}'
         *                  validation: '{theUser.validation.firstName}'
         *              }
         *          },{
         *              xtype: 'textfield',
         *              bind: {
         *                  value:      '{theUser.lastName}'
         *                  validation: '{theUser.validation.lastName}'
         *              }
         *          },{
         *              xtype: 'textfield',
         *              bind: {
         *                  value:      '{theUser.phoneNumber}'
         *                  validation: '{theUser.validation.phoneNumber}'
         *              }
         *          },{
         *              xtype: 'textfield',
         *              bind: {
         *                  value:      '{theUser.email}'
         *                  validation: '{theUser.validation.email}'
         *              }
         *          }]
         *      }
         *
         * Notice that "validation" is a pseudo-association defined for all entities. See
         * `{@link Ext.data.Model#getValidation}` for further details.
         */
    },

    defaultBindProperty: 'html',

    /**
     * @cfg {String} [alignTarget]
     * A Component or Element by which to position this component according to the {@link #defaultAlign}.
     * Defaults to ths owning Container.
     *
     * *Only applicable if this component is {@link #floating}*
     *
     * *Used upon first show*.
     */
    alignTarget: null,

    /**
     * @cfg {String/Object} autoEl
     * A tag name or {@link Ext.dom.Helper DomHelper} spec used to create the {@link #getEl Element} which will
     * encapsulate this Component.
     *
     * You do not normally need to specify this. For the base classes {@link Ext.Component} and
     * {@link Ext.container.Container}, this defaults to **'div'**. The more complex Sencha classes use a more
     * complex DOM structure specified by their own {@link #renderTpl}s.
     *
     * This is intended to allow the developer to create application-specific utility Components encapsulated by
     * different DOM elements. Example usage:
     *
     *     {
     *         xtype: 'component',
     *         autoEl: {
     *             tag: 'img',
     *             src: 'http://www.example.com/example.jpg'
     *         }
     *     }, {
     *         xtype: 'component',
     *         autoEl: {
     *             tag: 'blockquote',
     *             html: 'autoEl is cool!'
     *         }
     *     }, {
     *         xtype: 'container',
     *         autoEl: 'ul',
     *         cls: 'ux-unordered-list',
     *         items: {
     *             xtype: 'component',
     *             autoEl: 'li',
     *             html: 'First list item'
     *         }
     *     }
     *
     * @since 2.3.0
     */

    /**
     * @cfg {Boolean/String/HTMLElement/Ext.dom.Element} autoRender
     * This config is intended mainly for non-{@link #cfg-floating} Components which may or may not be shown. Instead of using
     * {@link #renderTo} in the configuration, and rendering upon construction, this allows a Component to render itself
     * upon first _{@link Ext.Component#method-show show}_. If {@link #cfg-floating} is `true`, the value of this config is omitted as if it is `true`.
     *
     * Specify as `true` to have this Component render to the document body upon first show.
     *
     * Specify as an element, or the ID of an element to have this Component render to a specific element upon first
     * show.
     */
    autoRender: false,

    /**
     * @cfg {Boolean} [autoScroll=false]
     * `true` to use overflow:'auto' on the components layout element and show scroll bars automatically when necessary,
     * `false` to clip any overflowing content.
     * This should not be combined with {@link #overflowX} or  {@link #overflowY}.
     */

    /**
     * @cfg {Boolean} autoShow
     * `true` to automatically show the component upon creation. This config option may only be used for
     * {@link #floating} components or components that use {@link #autoRender}.
     *
     * @since 2.3.0
     */
    autoShow: false,

    /**
     * @cfg {String} [baseCls='x-component']
     * The base CSS class to apply to this component's element. This will also be prepended to elements within this
     * component like Panel's body will get a class `x-panel-body`. This means that if you create a subclass of Panel, and
     * you want it to get all the Panels styling for the element and the body, you leave the `baseCls` `x-panel` and use
     * `componentCls` to add specific styling for this component.
     */
    baseCls: Ext.baseCSSPrefix + 'component',

    /**
     * @cfg {Number/String/Boolean} border
     * Specifies the border size for this component. The border can be a single numeric value to apply to all sides or it can
     * be a CSS style specification for each style, for example: '10 5 3 10' (top, right, bottom, left).
     *
     * For components that have no border by default, setting this won't make the border appear by itself.
     * You also need to specify border color and style:
     *
     *     border: 5,
     *     style: {
     *         borderColor: 'red',
     *         borderStyle: 'solid'
     *     }
     *
     * To turn off the border, use `border: false`.
     */

    /**
     * @cfg {Object/String[]/Object[]} childEls
     * @inheritdoc Ext.util.ElementContainer#childEls
     */
    childEls: {
        frameTable: { frame: true },
        frameTL:    { frame: 'tl' },
        frameTC:    { frame: 'tc' },
        frameTR:    { frame: 'tr' },
        frameML:    { frame: 'ml' },
        frameBody:  { frame: 'mc' },
        frameMR:    { frame: 'mr' },
        frameBL:    { frame: 'bl' },
        frameBC:    { frame: 'bc' },
        frameBR:    { frame: 'br' }
    },

    /**
     * @cfg {String} [cls='']
     * An optional extra CSS class that will be added to this component's Element. This can be useful
     * for adding customized styles to the component or any of its children using standard CSS rules.
     *
     * @since 1.1.0
     */

    /**
     * @cfg {Number/String} [columnWidth=undefined]
     * Defines the column width inside {@link Ext.layout.container.Column column layout}.
     *
     * Can be specified as a number or as a percentage.
     */

    /**
     * @cfg {String} componentCls
     * CSS Class to be added to a components root level element to give distinction to it via styling.
     */

    /**
     * @cfg {String/Object} componentLayout
     * The sizing and positioning of a Component's internal Elements is the responsibility of the Component's layout
     * manager which sizes a Component's internal structure in response to the Component being sized.
     *
     * Generally, developers will not use this configuration as all provided Components which need their internal
     * elements sizing (Such as {@link Ext.form.field.Base input fields}) come with their own componentLayout managers.
     *
     * The {@link Ext.layout.container.Auto default layout manager} will be used on instances of the base Ext.Component
     * class which simply sizes the Component's encapsulating element to the height and width specified in the
     * {@link #setSize} method.
     * 
     * @cmd-auto-dependency { aliasPrefix : "layout." }
     */
    componentLayout: 'autocomponent',

    /**
     * @cfg {Object/String} constraintInsets
     * An object or a string (in TRBL order) specifying insets from the configured {@link #constrainTo constrain region}
     * within which this component must be constrained when positioning or sizing.
     * example:
     *
     *    constraintInsets: '10 10 10 10' // Constrain with 10px insets from parent
     */

    /**
     * @cfg {Ext.util.Region/Ext.dom.Element} constrainTo
     * A {@link Ext.util.Region Region} (or an element from which a Region measurement will be read) which is used
     * to constrain the component. Only applies when the component is floating.
     */

    /**
     * @cfg {String} contentEl
     * Specify an existing HTML element, or the `id` of an existing HTML element to use as the content for this component.
     *
     * This config option is used to take an existing HTML element and place it in the layout element of a new component
     * (it simply moves the specified DOM element _after the Component is rendered_ to use as the content.
     *
     * **Notes:**
     *
     * The specified HTML element is appended to the layout element of the component _after any configured
     * {@link #html HTML} has been inserted_, and so the document will not contain this element at the time
     * the {@link #event-render} event is fired.
     *
     * The specified HTML element used will not participate in any **`{@link Ext.container.Container#layout layout}`**
     * scheme that the Component may use. It is just HTML. Layouts operate on child
     * **`{@link Ext.container.Container#cfg-items items}`**.
     *
     * Add either the `x-hidden` or the `x-hidden-display` CSS class to prevent a brief flicker of the content before it
     * is rendered to the panel.
     *
     * @since 3.4.0
     */

    /**
     * @cfg {String} [defaultAlign="c-c"]
     * The default {@link Ext.util.Positionable#getAlignToXY Ext.dom.Element#getAlignToXY} anchor position value for this component
     * relative to its {@link #alignTarget} (which defaults to its owning Container).
     *
     * _Only applicable if this component is {@link #floating}_
     *
     * *Used upon first show*.
     */
    defaultAlign: 'c-c',

    /**
     * @cfg {Boolean} disabled
     * `true` to disable the component.
     * @since 2.3.0
     */
    disabled: false,

    // http://www.w3.org/TR/html5/disabled-elements.html
    disabledRe: /^(?:button|input|select|textarea|optgroup|option|fieldset)$/i,

    nonMaskableRe: (function () {
        var re = ['input', 'select', 'textarea', 'optgroup', 'option', 'table'];

        // All IE browsers 9 and below except for IE 9 standards.
        if (Ext.isIE9m && !(Ext.isIE9 && !Ext.isIEQuirks)) {
            // <p>.insertAdjacentHTML('BeforeEnd', '<div>...</div>') yields
            // 'Invalid source HTML for this operation' in all IEs not IE 9 standards.
            re.push('p');
        }

        return new RegExp('^(?:' + re.join('|') + ')$', 'i');
    }()),

    /**
     * @cfg {String} [disabledCls='x-item-disabled']
     * CSS class to add when the Component is disabled.
     */
    disabledCls: Ext.baseCSSPrefix + 'item-disabled',

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
    draggable: false,

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
     * @cfg {Boolean} [formBind=false]
     * When inside FormPanel, any component configured with `formBind: true` will
     * be enabled/disabled depending on the validity state of the form.
     * See {@link Ext.form.Panel} for more information and example.
     */

    /**
     * @cfg {Boolean} frame
     * Specify as `true` to have the Component inject framing elements within the Component at render time to provide a
     * graphical rounded frame around the Component content.
     *
     * This is only necessary when running on outdated, or non standard-compliant browsers such as Microsoft's Internet
     * Explorer prior to version 9 which do not support rounded corners natively.
     *
     * The extra space taken up by this framing is available from the read only property {@link #frameSize}.
     */

    /**
     * @cfg {Number} height
     * The height of this component in pixels.
     */

    /**
     * @cfg {Boolean} hidden
     * `true` to hide the component.
     * @since 2.3.0
     */
    hidden: false,

    /**
     * @cfg {String} hideMode
     * A String which specifies how this Component's encapsulating DOM element will be hidden. Values may be:
     *
     *   - `'display'` : The Component will be hidden using the `display: none` style.
     *   - `'visibility'` : The Component will be hidden using the `visibility: hidden` style.
     *   - `'offsets'` : The Component will be hidden by absolutely positioning it out of the visible area of the document.
     *     This is useful when a hidden Component must maintain measurable dimensions. Hiding using `display` results in a
     *     Component having zero dimensions.
     *
     * @since 1.1.0
     */
    hideMode: 'display',

    /**
     * @cfg {String/Object} [html='']
     * An HTML fragment, or a {@link Ext.dom.Helper DomHelper} specification to use as the layout element content.
     * The HTML content is added after the component is rendered, so the document will not contain this HTML at the time
     * the {@link #event-render} event is fired. This content is inserted into the body _before_ any configured {@link #contentEl}
     * is appended.
     *
     * @since 3.4.0
     */

    /**
     * @cfg {String} id
     * The **unique** id of this component instance.
     *
     * Use of this config should be considered carefully as this value must be unique across
     * all existing components. Components created with an `id` may be accessed globally
     * using {@link Ext#getCmp Ext.getCmp}.
     *
     * Instead of using assigned ids, consider a {@link #reference} config and a {@link #cfg-controller ViewController}
     * to respond to events and perform processing upon this Component.
     *
     * Alternatively, {@link #itemId} and {@link Ext.ComponentQuery ComponentQuery} can be
     * used to perform selector-based searching for Components analogous to DOM querying.
     * The {@link Ext.container.Container Container} class contains several helpful
     * {@link Ext.container.Container#down shortcut methods} to query its descendant
     * Components by selector.
     *
     * Note that this `id` will also be used as the element id for the containing HTML
     * element that is rendered to the page for this component. This allows you to write
     * id-based CSS rules to style the specific instance of this component uniquely, and
     * also to select sub-elements using this component's `id` as the parent.
     *
     * Defaults to an {@link #getId auto-assigned id}.
     *
     * **Note**: Valid identifiers start with a letter or underscore and are followed by
     * (optional) additional letters, underscores, digits or hyphens.
     *
     * @since 1.1.0
     */

    /**
     * @cfg {String} itemId
     * The **unique** id of this component instance within its container. See also the
     * {@link #reference} config.
     *
     * An `itemId` can be used as an alternative way to get a reference to a component when no object reference is
     * available. Instead of using an `{@link #id}` with {@link Ext#getCmp getCmp}, use
     * `itemId` with {@link Ext.container.Container#getComponent getComponent} which will
     * retrieve `itemId`'s or {@link #id}'s. Since `itemId`'s are an index to the container's
     * internal collection, the `itemId` is scoped locally to the container -- avoiding
     * potential conflicts with {@link Ext.ComponentManager} which requires a **unique**
     * `{@link #id}` values.
     *
     *     var c = new Ext.panel.Panel({ //
     *         {@link Ext.Component#height height}: 300,
     *         {@link #renderTo}: document.body,
     *         {@link Ext.container.Container#layout layout}: 'auto',
     *         {@link Ext.container.Container#cfg-items items}: [
     *             {
     *                 itemId: 'p1',
     *                 {@link Ext.panel.Panel#title title}: 'Panel 1',
     *                 {@link Ext.Component#height height}: 150
     *             },
     *             {
     *                 itemId: 'p2',
     *                 {@link Ext.panel.Panel#title title}: 'Panel 2',
     *                 {@link Ext.Component#height height}: 150
     *             }
     *         ]
     *     })
     *     p1 = c.{@link Ext.container.Container#getComponent getComponent}('p1'); // not the same as {@link Ext#getCmp Ext.getCmp()}
     *     p2 = p1.{@link #ownerCt}.{@link Ext.container.Container#getComponent getComponent}('p2'); // reference via a sibling
     *
     * Also see {@link #id}, `{@link Ext.container.Container#query}`, `{@link Ext.container.Container#down}` and
     * `{@link Ext.container.Container#child}`.
     *
     * **Note**: Valid identifiers start with a letter or underscore and are followed by
     * (optional) additional letters, underscores, digits or hyphens.
     *
     * **Note**: to access the container of an item see {@link #ownerCt}.
     *
     * @since 3.4.0
     */

    /**
     * @cfg {Ext.ComponentLoader/Object} loader
     * A configuration object or an instance of a {@link Ext.ComponentLoader} to load remote content
     * for this Component.
     *
     *     Ext.create('Ext.Component', {
     *         loader: {
     *             url: 'content.html',
     *             autoLoad: true
     *         },
     *         renderTo: Ext.getBody()
     *     });
     */

    /**
     * @cfg {Number/String} margin
     * Specifies the margin for this component. The margin can be a single numeric value to apply to all sides or it can
     * be a CSS style specification for each style, for example: '10 5 3 10' (top, right, bottom, left).
     */

    /**
     * @cfg {String} [maskElement=null]
     * Related to the {@link #cfg-childEls} configuration which specifies named properties which correspond to component sub-elements.
     *
     * The name of the element property in this component to mask when masked by a LoadMask.
     *
     * Defaults to `null` to indicate that Components cannot by default contain a LoadMask, and that any LoadMask should be rendered into the document body.
     *
     * For example, Panels use `"el"` to indicate that the whole panel should be masked. This could be configured to be
     * `"body"` so that only the body is masked and toolbars and the header are still mouse-accessible.
     */
    maskElement: null,

    /**
     * @cfg {Number} maxHeight
     * The maximum value in pixels which this Component will set its height to.
     *
     * **Warning:** This will override any size management applied by layout managers.
     */

    /**
     * @cfg {Number} maxWidth
     * The maximum value in pixels which this Component will set its width to.
     *
     * **Warning:** This will override any size management applied by layout managers.
     */

    /**
     * @cfg {Number} minHeight
     * The minimum value in pixels which this Component will set its height to.
     *
     * **Warning:** This will override any size management applied by layout managers.
     */

    /**
     * @cfg {Number} minWidth
     * The minimum value in pixels which this Component will set its width to.
     *
     * **Warning:** This will override any size management applied by layout managers.
     */

    /**
     * @cfg {String} [overCls='']
     * An optional extra CSS class that will be added to this component's Element when the mouse moves over the Element,
     * and removed when the mouse moves out. This can be useful for adding customized 'active' or 'hover' styles to the
     * component or any of its children using standard CSS rules.
     *
     * @since 2.3.0
     */

    /**
     * @cfg {String} overflowX
     * Possible values are:
     *
     *  - `'auto'` to enable automatic horizontal scrollbar (Style overflow-x: 'auto').
     *  - `'scroll'` to always enable horizontal scrollbar (Style overflow-x: 'scroll').
     *
     * The default is overflow-x: 'hidden'. This should not be combined with {@link #autoScroll}.
     */

    /**
     * @cfg {String} overflowY
     * Possible values are:
     *
     *  - `'auto'` to enable automatic vertical scrollbar (Style overflow-y: 'auto').
     *  - `'scroll'` to always enable vertical scrollbar (Style overflow-y: 'scroll').
     *
     * The default is overflow-y: 'hidden'. This should not be combined with {@link #autoScroll}.
     */

    /**
     * @cfg {Number/String} padding
     * Specifies the padding for this component. The padding can be a single numeric value to apply to all sides or it
     * can be a CSS style specification for each style, for example: '10 5 3 10' (top, right, bottom, left).
     */

    /**
     * @cfg {Ext.plugin.Abstract[]/Ext.plugin.Abstract/Object[]/Object/Ext.enums.Plugin[]/Ext.enums.Plugin} plugins
     * An array of plugins to be added to this component. Can also be just a single plugin instead of array.
     *
     * Plugins provide custom functionality for a component. The only requirement for
     * a valid plugin is that it contain an `init` method that accepts a reference of type Ext.Component. When a component
     * is created, if any plugins are available, the component will call the init method on each plugin, passing a
     * reference to itself. Each plugin can then call methods or respond to events on the component as needed to provide
     * its functionality.
     *
     * Plugins can be added to component by either directly referencing the plugin instance:
     *
     *     plugins: [Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 1})],
     *
     * By using config object with ptype:
     *
     *     plugins: [{ptype: 'cellediting', clicksToEdit: 1}],
     *
     * Or with just a ptype:
     *
     *     plugins: ['cellediting', 'gridviewdragdrop'],
     *
     * See {@link Ext.enums.Plugin} for list of all ptypes.
     *
     * @since 2.3.0
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

    /**
     * @cfg {Object} renderData
     *
     * The data used by {@link #renderTpl} in addition to the following property values of the component:
     *
     * - id
     * - ui
     * - uiCls
     * - baseCls
     * - componentCls
     * - frame
     *
     * See {@link #renderSelectors} and {@link #cfg-childEls} for usage examples.
     */

    /**
     * @cfg {Object} renderSelectors
     * An object containing properties specifying CSS selectors which identify child elements
     * created by the render process.
     *
     * After the Component's internal structure is rendered according to the {@link #renderTpl}, this object is iterated through,
     * and the found Elements are added as properties to the Component using the `renderSelector` property name.
     *
     * For example, a Component which renders a title and description into its element:
     *
     *      Ext.create('Ext.Component', {
     *          renderTo: Ext.getBody(),
     *          renderTpl: [
     *              '<h1 class="title">{title}</h1>',
     *              '<p>{desc}</p>'
     *          ],
     *          renderData: {
     *              title: "Error",
     *              desc: "Something went wrong"
     *          },
     *          renderSelectors: {
     *              titleEl: 'h1.title',
     *              descEl: 'p'
     *          },
     *          listeners: {
     *              afterrender: function(cmp){
     *                  // After rendering the component will have a titleEl and descEl properties
     *                  cmp.titleEl.setStyle({color: "red"});
     *              }
     *          }
     *      });
     *
     * The use of `renderSelectors` is deprecated (for performance reasons). The above
     * code should be refactored into something like this:
     *
     *      Ext.create('Ext.Component', {
     *          renderTo: Ext.getBody(),
     *          renderTpl: [
     *              '<h1 class="title" id="{id}-titleEl" data-ref="titleEl">{title}</h1>',
     *              '<p id="{id}-descEl" data-ref="descEl">{desc}</p>'
     *          ],
     *          renderData: {
     *              title: "Error",
     *              desc: "Something went wrong"
     *          },
     *          childEls: [
     *              'titleEl',
     *              'descEl'
     *          ]
     *      });
     *
     * To use `childEls` yet retain the use of selectors (which remains as expensive as
     * `renderSelectors`):
     *
     *      Ext.create('Ext.Component', {
     *          renderTo: Ext.getBody(),
     *          renderTpl: [
     *              '<h1 class="title">{title}</h1>',
     *              '<p>{desc}</p>'
     *          ],
     *          renderData: {
     *              title: "Error",
     *              desc: "Something went wrong"
     *          },
     *          childEls: {
     *              titleEl: { selectNode: 'h1.title' },
     *              descEl: { selectNode: 'p' }
     *          }
     *      });
     *
     * @deprecated 5.0 Use {@link #cfg-childEls} instead.
     */

    /**
     * @cfg {String/HTMLElement/Ext.dom.Element} renderTo
     * Specify the `id` of the element, a DOM element or an existing Element that this component will be rendered into.
     *
     * **Notes:**
     *
     * Do *not* use this option if the Component is to be a child item of a {@link Ext.container.Container Container}.
     * It is the responsibility of the {@link Ext.container.Container Container}'s
     * {@link Ext.container.Container#layout layout manager} to render and manage its child items.
     *
     * When using this config, a call to `render()` is not required.
     *
     * See also: {@link #method-render}.
     *
     * @since 2.3.0
     */

    /**
     * @cfg {Ext.XTemplate/String/String[]} renderTpl
     * An {@link Ext.XTemplate XTemplate} used to create the internal structure inside this Component's encapsulating
     * {@link #getEl Element}.
     *
     * You do not normally need to specify this. For the base classes {@link Ext.Component} and
     * {@link Ext.container.Container}, this defaults to **`null`** which means that they will be initially rendered
     * with no internal structure; they render their {@link #getEl Element} empty. The more specialized Ext JS and Sencha Touch
     * classes which use a more complex DOM structure, provide their own template definitions.
     *
     * This is intended to allow the developer to create application-specific utility Components with customized
     * internal structure.
     *
     * Upon rendering, any created child elements may be automatically imported into object properties using the
     * {@link #renderSelectors} and {@link #cfg-childEls} options.
     * @protected
     */
    renderTpl: [
        '<tpl if="renderScroller">',
            '<div class="{scrollerCls}" style="{%this.renderPadding(out, values)%}">',
        '</tpl>',
            '{%this.renderContent(out,values)%}',
        '<tpl if="renderScroller"></div></tpl>'
    ],

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
     * @cfg {Boolean/Number} [shrinkWrap=2]
     *
     * If this property is a number, it is interpreted as follows:
     *
     *   - 0 (or `false`): Neither width nor height depend on content.
     *   - 1: Width depends on content (shrink wraps), but height does not.
     *   - 2 (default): Height depends on content (shrink wraps), but width does not.
     *   - 3 (or `true`): Both width and height depend on content (shrink wrap).
     *
     * In CSS terms, shrink-wrap width is analogous to an inline-block element as opposed
     * to a block-level element. Some container layouts always shrink-wrap their children,
     * effectively ignoring this property (e.g., {@link Ext.layout.container.HBox},
     * {@link Ext.layout.container.VBox}, {@link Ext.layout.component.Dock}).
     */
    shrinkWrap: 2,

    /**
     * @cfg {String/Object} style
     * A custom style specification to be applied to this component's Element. Should be a valid argument to
     * {@link Ext.dom.Element#applyStyles}.
     *
     *     new Ext.panel.Panel({
     *         title: 'Some Title',
     *         renderTo: Ext.getBody(),
     *         width: 400, height: 300,
     *         layout: 'form',
     *         items: [{
     *             xtype: 'textarea',
     *             style: {
     *                 width: '95%',
     *                 marginBottom: '10px'
     *             }
     *         },
     *         new Ext.button.Button({
     *             text: 'Send',
     *             minWidth: '100',
     *             style: {
     *                 marginBottom: '10px'
     *             }
     *         })
     *         ]
     *     });
     *
     * @since 1.1.0
     */

    /**
     * @cfg {Boolean} toFrontOnShow
     * True to automatically call {@link #toFront} when the {@link #method-show} method is called on an already visible,
     * floating component.
     */
    toFrontOnShow: true,

    /**
     * @cfg {Ext.XTemplate/Ext.Template/String/String[]} tpl
     * An {@link Ext.Template}, {@link Ext.XTemplate} or an array of strings to form an Ext.XTemplate. Used in
     * conjunction with the `{@link #data}` and `{@link #tplWriteMode}` configurations.
     *
     * @since 3.4.0
     */

    /**
     * @property {Boolean} [synthetic=false]
     * This property is `true` if the component was created internally by the framework
     * and is not explicitly user-defined. This is set for such things as `Splitter`
     * instances managed by `border` and `box` layouts.
     * @private
     */
    synthetic: false,

    /**
     * @cfg {String} tplWriteMode
     * The Ext.(X)Template method to use when updating the content area of the Component.
     * See `{@link Ext.XTemplate#overwrite}` for information on default mode.
     *
     * @since 3.4.0
     */
    tplWriteMode: 'overwrite',

    /**
     * @cfg {String} ui
     * A UI style for a component.
     */
    ui: 'default',

    /**
     * @cfg {String[]} uiCls
     * An array of of `classNames` which are currently applied to this component.
     * @private
     */
    uiCls: [],

    /**
     * @cfg {Number} [weight]
     * A value to control how Components are laid out in a {@link Ext.layout.container.Border Border} layout or as docked items.
     *
     * In a Border layout, this can control how the regions (not the center) region lay out if the west or east take full height
     * or if the north or south region take full width. Also look at the {@link Ext.layout.container.Border#regionWeights} on the Border layout. An example to show how you can
     * take control of this is:
     *
     *     Ext.create('Ext.container.Viewport', {
     *         layout      : 'border',
     *         defaultType : 'panel',
     *         items       : [
     *             {
     *                 region : 'north',
     *                 title  : 'North',
     *                 height : 100
     *             },
     *             {
     *                 region : 'south',
     *                 title  : 'South',
     *                 height : 100,
     *                 weight : -25
     *             },
     *             {
     *                 region : 'west',
     *                 title  : 'West',
     *                 width  : 200,
     *                 weight : 15
     *             },
     *             {
     *                 region : 'east',
     *                 title  : 'East',
     *                 width  : 200
     *             },
     *             {
     *                 region : 'center',
     *                 title  : 'center'
     *             }
     *         ]
     *     });
     *
     * If docked items, the weight will order how the items are laid out. Here is an example to put a {@link Ext.toolbar.Toolbar} above
     * a {@link Ext.panel.Panel}'s header:
     *
     *     Ext.create('Ext.panel.Panel', {
     *         renderTo    : document.body,
     *         width       : 300,
     *         height      : 300,
     *         title       : 'Panel',
     *         html        : 'Panel Body',
     *         dockedItems : [
     *             {
     *                 xtype : 'toolbar',
     *                 items : [
     *                     {
     *                         text : 'Save'
     *                     }
     *                 ]
     *             },
     *             {
     *                 xtype  : 'toolbar',
     *                 weight : -10,
     *                 items  : [
     *                     {
     *                         text : 'Remove'
     *                     }
     *                 ]
     *             }
     *         ]
     *     });
     */
    weight: null,

    /**
     * @cfg {Number} width
     * The width of this component in pixels.
     */

    /**
     * @cfg {Ext.enums.Widget} xtype
     * This property provides a shorter alternative to creating objects than using a full
     * class name. Using `xtype` is the most common way to define component instances,
     * especially in a container. For example, the items in a form containing text fields
     * could be created explicitly like so:
     *
     *      items: [
     *          Ext.create('Ext.form.field.Text', {
     *              fieldLabel: 'Foo'
     *          }),
     *          Ext.create('Ext.form.field.Text', {
     *              fieldLabel: 'Bar'
     *          }),
     *          Ext.create('Ext.form.field.Number', {
     *              fieldLabel: 'Num'
     *          })
     *      ]
     *
     * But by using `xtype`, the above becomes:
     *
     *      items: [
     *          {
     *              xtype: 'textfield',
     *              fieldLabel: 'Foo'
     *          },
     *          {
     *              xtype: 'textfield',
     *              fieldLabel: 'Bar'
     *          },
     *          {
     *              xtype: 'numberfield',
     *              fieldLabel: 'Num'
     *          }
     *      ]
     *
     * When the `xtype` is common to many items, {@link Ext.container.Container#defaultType}
     * is another way to specify the `xtype` for all items that don't have an explicit `xtype`:
     *
     *      defaultType: 'textfield',
     *      items: [
     *          { fieldLabel: 'Foo' },
     *          { fieldLabel: 'Bar' },
     *          { fieldLabel: 'Num', xtype: 'numberfield' }
     *      ]
     *
     * Each member of the `items` array is now just a "configuration object". These objects
     * are used to create and configure component instances. A configuration object can be
     * manually used to instantiate a component using {@link Ext#widget}:
     *
     *      var text1 = Ext.create('Ext.form.field.Text', {
     *          fieldLabel: 'Foo'
     *      });
     *
     *      // or alternatively:
     *
     *      var text1 = Ext.widget({
     *          xtype: 'textfield',
     *          fieldLabel: 'Foo'
     *      });
     *
     * This conversion of configuration objects into instantiated components is done when
     * a container is created as part of its {Ext.container.AbstractContainer#initComponent}
     * process. As part of the same process, the `items` array is converted from its raw
     * array form into a {@link Ext.util.MixedCollection} instance.
     *
     * You can define your own `xtype` on a custom {@link Ext.Component component} by specifying
     * the `xtype` property in {@link Ext#define}. For example:
     *
     *     Ext.define('MyApp.PressMeButton', {
     *         extend: 'Ext.button.Button',
     *         xtype: 'pressmebutton',
     *         text: 'Press Me'
     *     });
     *
     * Care should be taken when naming an `xtype` in a custom component because there is
     * a single, shared scope for all xtypes. Third part components should consider using
     * a prefix to avoid collisions.
     *
     *     Ext.define('Foo.form.CoolButton', {
     *         extend: 'Ext.button.Button',
     *         xtype: 'ux-coolbutton',
     *         text: 'Cool!'
     *     });
     *
     * See {@link Ext.enums.Widget} for list of all available xtypes.
     *
     * @since 2.3.0
     */

    // ***********************************************************************************
    // End Config
    // ***********************************************************************************
    // </editor-fold>

    // <editor-fold desc="Properties">
    // ***********************************************************************************
    // Begin Properties
    // ***********************************************************************************

    // private
    allowDomMove: true,

    /**
     * @property {Boolean} autoGenId
     * `true` indicates an `id` was auto-generated rather than provided by configuration.
     * @private
     */
    autoGenId: false,

    // private
    borderBoxCls: Ext.baseCSSPrefix + 'border-box',

    /**
     * @property {Number} componentLayoutCounter
     * @private
     * The number of component layout calls made on this object.
     */
    componentLayoutCounter: 0,

    /**
     * @property {String} [contentPaddingProperty='padding']
     * The name of the padding property that is used by the layout to manage
     * padding.  See {@link Ext.layout.container.Auto#managePadding managePadding}
     */ 
    contentPaddingProperty: 'padding',

    // private
    deferLayouts: false,

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
     * @property {Object} frameSize
     * @readonly
     * Indicates the width of any framing elements which were added within the encapsulating
     * element to provide graphical, rounded borders. See the {@link #frame} config. This
     * property is `null` if the component is not framed.
     *
     * This is an object containing the frame width in pixels for all four sides of the
     * Component containing the following properties:
     *
     * @property {Number} [frameSize.top=0] The width of the top framing element in pixels.
     * @property {Number} [frameSize.right=0] The width of the right framing element in pixels.
     * @property {Number} [frameSize.bottom=0] The width of the bottom framing element in pixels.
     * @property {Number} [frameSize.left=0] The width of the left framing element in pixels.
     * @property {Number} [frameSize.width=0] The total width of the left and right framing elements in pixels.
     * @property {Number} [frameSize.height=0] The total height of the top and right bottom elements in pixels.
     */
    frameSize: null,

    // private
    horizontalPosProp: 'left',

    /**
     * @property {Boolean} isComponent
     * `true` in this class to identify an object as an instantiated Component, or subclass thereof.
     */
    isComponent: true,

    /**
     * @property {Boolean} [_isLayoutRoot=false]
     * Setting this property to `true` causes the {@link #isLayoutRoot} method to return
     * `true` and stop the search for the top-most component for a layout.
     * @protected
     */
    _isLayoutRoot: false,

    // private
    layoutSuspendCount: 0,

    /**
     * @private
     * Components that achieve their internal layout results using solely CSS with no JS
     * intervention must set this to true.  Failure to set this property to true may result
     * in setSize failing to work if the component opted out of the layout run.
     */
    liquidLayout: false,

    /**
     * @property {Boolean} maskOnDisable
     * This is an internal flag that you use when creating custom components. By default this is set to `true` which means
     * that every component gets a mask when it's disabled. Components like FieldContainer, FieldSet, Field, Button, Tab
     * override this property to `false` since they want to implement custom disable logic.
     */
    maskOnDisable: true,

    // private
    offsetsCls: Ext.baseCSSPrefix + 'hidden-offsets',

    /**
     * @property {Ext.Container} ownerCt
     * This Component's owner {@link Ext.container.Container Container} (is set automatically
     * when this Component is added to a Container).
     *
     * *Important.* This is not a universal upwards navigation pointer. It indicates the Container which owns and manages
     * this Component if any. There are other similar relationships such as the {@link Ext.button.Button button} which activates a {@link Ext.button.Button#cfg-menu menu}, or the
     * {@link Ext.menu.Item menu item} which activated a {@link Ext.menu.Item#cfg-menu submenu}, or the
     * {@link Ext.grid.column.Column column header} which activated the column menu.
     *
     * These differences are abstracted away by the {@link #up} method.
     *
     * **Note**: to access items within the Container see {@link #itemId}.
     * @readonly
     * @since 2.3.0
     */

    /**
     * @property {Boolean} rendered
     * Indicates whether or not the component has been rendered.
     * @readonly
     * @since 1.1.0
     */
    rendered: false,

    // private
    rootCls: Ext.baseCSSPrefix + 'body',

    // private
    scrollerCls: Ext.baseCSSPrefix + 'touch-scroller',
    scrollerSelector: '.' + Ext.baseCSSPrefix + 'touch-scroller',

    validIdRe: Ext.validIdRe,

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

    // ***********************************************************************************
    // End Properties
    // ***********************************************************************************
    // </editor-fold>

    // <editor-fold desc="Events">
    // ***********************************************************************************
    // Begin Events
    // ***********************************************************************************

    /**
     * @event beforeactivate
     * Fires before a Component has been visually activated. Returning `false` from an event listener can prevent
     * the activate from occurring.
     *
     * **Note** This event is only fired if this Component is a child of a {@link Ext.container.Container}
     * that uses {@link Ext.layout.container.Card} as it's layout.
     * @param {Ext.Component} this
     */

    /**
     * @event activate
     * Fires after a Component has been visually activated.
     *
     * **Note** This event is only fired if this Component is a child of a {@link Ext.container.Container}
     * that uses {@link Ext.layout.container.Card} as it's layout or this Component is a floating Component.
     * @param {Ext.Component} this
     */

    /**
     * @event beforedeactivate
     * Fires before a Component has been visually deactivated. Returning `false` from an event listener can
     * prevent the deactivate from occurring.
     *
     * **Note** This event is only fired if this Component is a child of a {@link Ext.container.Container}
     * that uses {@link Ext.layout.container.Card} as it's layout.
     * @param {Ext.Component} this
     */

    /**
     * @event deactivate
     * Fires after a Component has been visually deactivated.
     *
     * **Note** This event is only fired if this Component is a child of a {@link Ext.container.Container}
     * that uses {@link Ext.layout.container.Card} as it's layout or this Component is a floating Component.
     * @param {Ext.Component} this
     */

    /**
     * @event added
     * Fires after a Component had been added to a Container.
     * @param {Ext.Component} this
     * @param {Ext.container.Container} container Parent Container
     * @param {Number} pos position of Component
     * @since 3.4.0
     */

    /**
     * @event disable
     * Fires after the component is disabled.
     * @param {Ext.Component} this
     * @since 1.1.0
     */

    /**
     * @event enable
     * Fires after the component is enabled.
     * @param {Ext.Component} this
     * @since 1.1.0
     */

    /**
     * @event beforeshow
     * Fires before the component is shown when calling the {@link Ext.Component#method-show show} method. Return `false` from an event
     * handler to stop the show.
     * @param {Ext.Component} this
     * @since 1.1.0
     */

    /**
     * @event show
     * Fires after the component is shown when calling the {@link Ext.Component#method-show show} method.
     * @param {Ext.Component} this
     * @since 1.1.0
     */

    /**
     * @event beforehide
     * Fires before the component is hidden when calling the {@link Ext.Component#method-hide hide} method. Return `false` from an event
     * handler to stop the hide.
     * @param {Ext.Component} this
     * @since 1.1.0
     */

    /**
     * @event hide
     * Fires after the component is hidden. Fires after the component is hidden when calling the {@link Ext.Component#method-hide hide}
     * method.
     * @param {Ext.Component} this
     * @since 1.1.0
     */

    /**
     * @event removed
     * Fires when a component is removed from an Ext.container.Container
     * @param {Ext.Component} this
     * @param {Ext.container.Container} ownerCt Container which holds the component
     * @since 3.4.0
     */

    /**
     * @event beforerender
     * Fires before the component is {@link #rendered}. Return `false` from an event handler to stop the
     * {@link #method-render}.
     * @param {Ext.Component} this
     * @since 1.1.0
     */

    /**
     * @event render
     * Fires after the component markup is {@link #rendered}.
     * @param {Ext.Component} this
     * @since 1.1.0
     */

    /**
     * @event afterrender
     * Fires after the component rendering is finished.
     *
     * The `afterrender` event is fired after this Component has been {@link #rendered}, been postprocessed by any
     * `afterRender` method defined for the Component.
     * @param {Ext.Component} this
     * @since 3.4.0
     */

    /**
     * @event boxready
     * Fires *one time* - after the component has been laid out for the first time at its initial size.
     * @param {Ext.Component} this
     * @param {Number} width The initial width.
     * @param {Number} height The initial height.
     */

    /**
     * @event beforedestroy
     * Fires before the component is {@link #method-destroy}ed. Return `false` from an event handler to stop the
     * {@link #method-destroy}.
     * @param {Ext.Component} this
     * @since 1.1.0
     */

    /**
     * @event destroy
     * Fires after the component is {@link #method-destroy}ed.
     * @param {Ext.Component} this
     * @since 1.1.0
     */

    /**
     * @event resize
     * Fires after the component is resized. Note that this does *not* fire when the component is first laid out at its initial
     * size. To hook that point in the life cycle, use the {@link #boxready} event.
     * @param {Ext.Component} this
     * @param {Number} width The new width that was set.
     * @param {Number} height The new height that was set.
     * @param {Number} oldWidth The previous width.
     * @param {Number} oldHeight The previous height.
     */

    /**
     * @event move
     * Fires after the component is moved.
     * @param {Ext.Component} this
     * @param {Number} x The new x position.
     * @param {Number} y The new y position.
     */

    /**
     * @event focus
     * Fires when this Component receives focus.
     * @param {Ext.Component} this
     * @param {Ext.event.Event} The focus event.
     */

    /**
     * @event blur
     * Fires when this Component loses focus.
     * @param {Ext.Component} this
     * @param {Ext.event.Event} The blur event.
     */

    // ***********************************************************************************
    // End Events
    // ***********************************************************************************
    // </editor-fold>

    /**
     * Creates new Component.
     * @param {Ext.dom.Element/String/Object} config The configuration options may be specified as either:
     *
     * - **an element** : it is set as the internal element and its id used as the component id
     * - **a string** : it is assumed to be the id of an existing element and is used as the component id
     * - **anything else** : it is assumed to be a standard config object and is applied to the component
     */
    constructor: function(config) {
        var me = this,
            i, len, xhooks, controller;

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

        // Make initialConfig available early so that config getters may access it
        me.initialConfig = config;

        // Ensure that we have an id early so that config getters may access it
        me.getId();
        me.protoEl = new Ext.util.ProtoElement();
        me.initConfig(config);

        xhooks = me.xhooks;
        if (xhooks) {
            delete me.xhooks;
            Ext.override(me, xhooks);
        }

        me.mixins.elementCt.constructor.call(me);

        //<debug>
        if (!me.validIdRe.test(me.id)) {
            Ext.Error.raise('Invalid component "id": "' + me.id + '"');
        }
        if (!me.validIdRe.test(me.itemId)) {
            Ext.Error.raise('Invalid component "itemId": "' + me.itemId + '"');
        }
        //</debug>

        me.setupProtoEl();

        // initComponent, beforeRender, or event handlers may have set the style or `cls` property since the `protoEl` was set up
        // so we must apply styles and classes here too.
        if (me.cls) {
            me.initialCls = me.cls;
            me.protoEl.addCls(me.cls);
        }
        if (me.style) {
            me.initialStyle = me.style;
            me.protoEl.setStyle(me.style);
        }

        me.renderData = me.renderData || {};

        me.initComponent();

        // initComponent gets a chance to change the id property before registering
        if (!me.preventRegister) {
            Ext.ComponentManager.register(me);
        }

        me.mixins.state.constructor.call(me);
        me.addStateEvents('resize');

        controller = me.getController();
        if (controller) {
            controller.init(me);
        }

        // Move this into Observable?
        if (me.plugins) {
            for (i = 0, len = me.plugins.length; i < len; i++) {
                me.plugins[i] = me.initPlugin(me.plugins[i]);
            }
        }

        me.loader = me.getLoader();

        if (me.renderTo) {
            me.render(me.renderTo);
            // EXTJSIV-1935 - should be a way to do afterShow or something, but that
            // won't work. Likewise, rendering hidden and then showing (w/autoShow) has
            // implications to afterRender so we cannot do that.
        }

        // Auto show only works unilaterally on *uncontained* Components.
        // If contained, then it is the Container's responsibility to do the showing at next layout time.
        if (me.autoShow && !me.initOwnerCt) {
            me.show();
        }

        //<debug>
        if (Ext.isDefined(me.disabledClass)) {
            if (Ext.isDefined(Ext.global.console)) {
                Ext.global.console.warn('Ext.Component: disabledClass has been deprecated. Please use disabledCls.');
            }
            me.disabledCls = me.disabledClass;
            delete me.disabledClass;
        }
        //</debug>

        // If we were configured from an instance of Ext.Action, (or configured with a baseAction option),
        // register this Component as one of its items
        if (me.baseAction){
            me.baseAction.addComponent(me);
        }
    },

    beforeInitConfig: function() {
        this.mixins.observable.constructor.call(this);
    },

    // <editor-fold desc="Component Methods">
    // ***********************************************************************************
    // Begin Component Methods
    // ***********************************************************************************

    /**
     * Adds a CSS class to the top level element representing this component.
     * @param {String/String[]} cls The CSS class name to add.
     * @return {Ext.Component} Returns the Component to allow method chaining.
     */
    addCls: function(cls) {
        var me = this,
            el = me.rendered ? me.el : me.protoEl;

        el.addCls.apply(el, arguments);
        return me;
    },

    /**
     * Adds a `cls` to the `uiCls` array, which will also call {@link #addUIClsToElement} and adds to all elements of this
     * component.
     * @param {String/String[]} classes A string or an array of strings to add to the `uiCls`.
     * @param {Boolean} [skip] `true` to skip adding it to the class and do it later (via the return).
     */
    addClsWithUI: function(classes, skip) {
        var me = this,
            clsArray = [],
            i = 0,
            uiCls = me.uiCls = Ext.Array.clone(me.uiCls),
            activeUI = me.activeUI,
            length,
            cls;

        if (typeof classes === "string") {
            classes = (classes.indexOf(' ') < 0) ? [classes] : Ext.String.splitWords(classes);
        }

        length = classes.length;

        for (; i < length; i++) {
            cls = classes[i];

            if (cls && !me.hasUICls(cls)) {
                uiCls.push(cls);

                // We can skip this bit if there isn't an activeUI because we'll be called again from setUI
                if (activeUI) {
                    clsArray = clsArray.concat(me.addUIClsToElement(cls));
                }
            }
        }

        if (skip !== true && activeUI) {
            me.addCls(clsArray);
        }

        return clsArray;
    },

    /**
     * Called by the layout system after the Component has been laid out.
     *
     * @param {Number} width The width that was set
     * @param {Number} height The height that was set
     * @param {Number/undefined} oldWidth The old width, or `undefined` if this was the initial layout.
     * @param {Number/undefined} oldHeight The old height, or `undefined` if this was the initial layout.
     *
     * @template
     * @protected
     */
    afterComponentLayout: function(width, height, oldWidth, oldHeight) {
        var me = this;

        if (++me.componentLayoutCounter === 1) {
            me.afterFirstLayout(width, height);
        }

        if (width !== oldWidth || height !== oldHeight) {
            me.onResize(width, height, oldWidth, oldHeight);
        }

        if (this.floating) {
            this.onAfterFloatLayout();
        }
    },

    addListener: function(element, listeners, scope, options) {
        var me = this,
            fn,
            option;

        if (Ext.isString(element) && (Ext.isObject(listeners) || options && options.element)) {
            if (options.element) {
                fn = listeners;

                listeners = {};
                listeners[element] = fn;
                element = options.element;
                if (scope) {
                    listeners.scope = scope;
                }

                for (option in options) {
                    if (options.hasOwnProperty(option)) {
                        if (me.eventOptionsRe.test(option)) {
                            listeners[option] = options[option];
                        }
                    }
                }
            }

            // At this point we have a variable called element,
            // and a listeners object that can be passed to on
            if (me[element] && me[element].on) {
                me.mon(me[element], listeners);
            } else {
                me.afterRenderEvents = me.afterRenderEvents || {};
                if (!me.afterRenderEvents[element]) {
                    me.afterRenderEvents[element] = [];
                }
                me.afterRenderEvents[element].push(listeners);
            }
            return;
        }

        return me.mixins.observable.addListener.apply(me, arguments);
    },

    // @private
    // Adds a plugin. May be called at any time in the component's lifecycle.
    addPlugin: function(plugin) {
        var me = this;

        plugin = me.constructPlugin(plugin);
        if (me.plugins) {
            me.plugins.push(plugin);
        } else {
            me.plugins = [ plugin ];
        }
        if (me.pluginsInitialized) {
            me.initPlugin(plugin);
        }
        return plugin;
    },

    /**
     * Save a property to the given state object if it is not its default or configured
     * value.
     *
     * @param {Object} state The state object.
     * @param {String} propName The name of the property on this object to save.
     * @param {String} [value] The value of the state property (defaults to `this[propName]`).
     * @return {Boolean} The state object or a new object if state was `null` and the property
     * was saved.
     * @protected
     */
    addPropertyToState: function (state, propName, value) {
        var me = this,
            len = arguments.length;

        // If the property is inherited, it is a default and we don't want to save it to
        // the state, however if we explicitly specify a value, always save it
        if (len === 3 || me.hasOwnProperty(propName)) {
            if (len < 3) {
                value = me[propName];
            }

            // If the property has the same value as was initially configured, again, we
            // don't want to save it.
            if (value !== me.initialConfig[propName]) {
                (state || (state = {}))[propName] = value;
            }
        }

        return state;
    },

    /**
     * Method which adds a specified UI + `uiCls` to the components element. Can be overridden
     * to add the UI to more than just the component's element.
     * @param {String} uiCls The UI class to add to the element.
     * @protected
     */
    addUIClsToElement: function (uiCls) {
        var me = this,
            baseClsUI = me.baseCls + '-' + me.ui + '-' + uiCls,
            result = [ Ext.baseCSSPrefix + uiCls, me.baseCls + '-' + uiCls, baseClsUI ],
            childEls, childElName, el, suffix;

        if (me.rendered && me.frame && !Ext.supports.CSS3BorderRadius) {
            // Loop through each frame element, and if they are defined add the ui:
            baseClsUI += '-';
            childEls = me.getChildEls();

            for (childElName in childEls) {
                suffix = childEls[childElName].frame;
                if (suffix && suffix !== true) {
                    el = me[childElName];
                    if (el) {
                        el.addCls(baseClsUI + suffix);
                    }
                }
            }
        }

        return result;
    },

    /**
     * Method which removes a specified UI + `uiCls` from the components element. The `cls`
     * which is added to the element will be: `this.baseCls + '-' + ui + uiCls`.
     * @param {String} uiCls The UI class to remove from the element.
     * @protected
     */
    removeUIClsFromElement: function(uiCls) {
        var me = this,
            baseClsUI = me.baseCls + '-' + me.ui + '-' + uiCls,
            result = [ Ext.baseCSSPrefix + uiCls, me.baseCls + '-' + uiCls, baseClsUI ],
            childEls, childElName, el, suffix;

        if (me.rendered && me.frame && !Ext.supports.CSS3BorderRadius) {
            // Loop through each frame element, and if they are defined remove the ui:
            baseClsUI += '-';
            childEls = me.getChildEls();

            for (childElName in childEls) {
                suffix = childEls[childElName].frame;
                if (suffix && suffix !== true) {
                    el = me[childElName];
                    if (el) {
                        el.removeCls(baseClsUI + suffix);
                    }
                }
            }
        }

        return result;
    },

    // private
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
        var me = this;

        me.hiddenByLayout = null;

        // Only lay out if there is an owning layout which might be affected by the hide
        if (this.ownerLayout) {
            this.updateLayout({ isRoot: false });
        }

        Ext.callback(cb, scope || me);
        me.fireEvent('hide', me);
        me.fireHierarchyEvent('hide');
    },

    /**
     * Template method called after a Component has been positioned.
     *
     * @param {Number} x
     * @param {Number} y
     *
     * @template
     * @protected
     */
    afterSetPosition: function(x, y) {
        var me = this;
        me.onPosition(x, y);
        if (me.hasListeners.move) {
            me.fireEvent('move', me, x, y);
        }
    },

    /**
     * Invoked after the Component is shown (after #onShow is called).
     *
     * Gets passed the same parameters as #show.
     *
     * @param {String/Ext.dom.Element} [animateTarget]
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

    animate: function(animObj) {
        var me = this,
            hasToWidth,
            hasToHeight,
            toHeight,
            toWidth,
            to,
            clearWidth,
            clearHeight,
            curWidth, w, curHeight, h, isExpanding,
            wasConstrained,
            wasConstrainedHeader,
            passedCallback,
            oldOverflow;

        animObj = animObj || {};
        to = animObj.to || {};

        if (Ext.fx.Manager.hasFxBlock(me.id)) {
            return me;
        }

        hasToWidth = Ext.isDefined(to.width);
        if (hasToWidth) {
            toWidth = Ext.Number.constrain(to.width, me.minWidth, me.maxWidth);
        }

        hasToHeight = Ext.isDefined(to.height);
        if (hasToHeight) {
            toHeight = Ext.Number.constrain(to.height, me.minHeight, me.maxHeight);
        }

        // Special processing for animating Component dimensions.
        if (!animObj.dynamic && (hasToWidth || hasToHeight)) {
            curWidth = (animObj.from ? animObj.from.width : undefined) || me.getWidth();
            w = curWidth;
            curHeight = (animObj.from ? animObj.from.height : undefined) || me.getHeight();
            h = curHeight;
            isExpanding = false;

            if (hasToHeight && toHeight > curHeight) {
                h = toHeight;
                isExpanding = true;
            }
            if (hasToWidth && toWidth > curWidth) {
                w = toWidth;
                isExpanding = true;
            }

            // During animated sizing, overflow has to be hidden to clip expanded content
            if (hasToHeight || hasToWidth) {
                oldOverflow = me.el.getStyle('overflow');
                if (oldOverflow !== 'hidden') {
                    me.el.setStyle('overflow', 'hidden');
                }
            }

            // If any dimensions are being increased, we must resize the internal structure
            // of the Component, but then clip it by sizing its encapsulating element back to original dimensions.
            // The animation will then progressively reveal the larger content.
            if (isExpanding) {
                clearWidth = !Ext.isNumber(me.width);
                clearHeight = !Ext.isNumber(me.height);

                // Lay out this component at the new, larger size to get the internals correctly laid out.
                // Then size the encapsulating **Element** back down to size.
                // We will then just animate the element to reveal the correctly laid out content.
                me.setSize(w, h);
                me.el.setSize(curWidth, curHeight);

                if (clearWidth) {
                    delete me.width;
                }
                if (clearHeight) {
                    delete me.height;
                }
            }
            if (hasToWidth) {
                to.width = toWidth;
            }

            if (hasToHeight) {
                to.height = toHeight;
            }
        }

        // No constraining during the animate - the "to" size has already been calculated with respect to all settings.
        // Arrange to reinstate any constraining after the animation has completed
        wasConstrained = me.constrain;
        wasConstrainedHeader = me.constrainHeader;
        if (wasConstrained || wasConstrainedHeader) {
            me.constrain = me.constrainHeader = false;
            passedCallback = animObj.callback;
            animObj.callback = function() {
                me.constrain = wasConstrained;
                me.constrainHeader = wasConstrainedHeader;
                // Call the original callback if any
                if (passedCallback) {
                    passedCallback.call(animObj.scope||me, arguments);
                }
                if (oldOverflow !== 'hidden') {
                    me.el.setStyle('overflow', oldOverflow);
                }
            };
        }
        return me.mixins.animate.animate.apply(me, arguments);
    },

    /**
     * Template method to do any pre-blur processing.
     * @protected
     * @param {Ext.event.Event} e The event object
     */
    beforeBlur: Ext.emptyFn,

    /**
     * Occurs before `componentLayout` is run. Returning `false` from this method will prevent the `componentLayout` from
     * being executed.
     *
     * @param {Number} adjWidth The box-adjusted width that was set.
     * @param {Number} adjHeight The box-adjusted height that was set.
     *
     * @template
     * @protected
     */
    beforeComponentLayout: function() {
        return true;
    },

    /**
     * Invoked before the Component is destroyed.
     *
     * @method
     * @template
     * @protected
     */
    beforeDestroy : Ext.emptyFn,

    /**
     * Template method to do any pre-focus processing.
     * @protected
     * @param {Ext.event.Event} e The event object
     */
    beforeFocus: Ext.emptyFn,

    /**
     * Occurs before componentLayout is run. In previous releases, this method could
     * return `false` to prevent its layout but that is not supported in Ext JS 4.1 or
     * higher. This method is simply a notification of the impending layout to give the
     * component a chance to adjust the DOM. Ideally, DOM reads should be avoided at this
     * time to reduce expensive document reflows.
     *
     * @template
     * @protected
     */
    beforeLayout: function(){
        if (this.floating) {
            this.onBeforeFloatLayout();
        }
    },

    /**
     * @private Template method called before a Component is positioned.
     *
     * Ensures that the position is adjusted so that the Component is constrained if so configured.
     */
    beforeSetPosition: function (x, y, animate) {
        var me = this,
            pos = null,
            x0, hasX, hasY, adj;

        // Decode members of x if x is an array or an object.
        // If it is numeric (including zero), we need do nothing.
        if (x) {
            // Position in first argument as an array of [x, y]
            if (Ext.isNumber(x0 = x[0])) {
                animate = y;
                y = x[1];
                x = x0;
            }
            // Position in first argument as object w/ x & y properties
            else if ((x0 = x.x) !== undefined) {
                animate = y;
                y = x.y;
                x = x0;
            }
        }

        if (me.constrain || me.constrainHeader) {
            pos = me.calculateConstrainedPosition(null, [x, y], true);
            if (pos) {
                x = pos[0];
                y = pos[1];
            }
        }

        hasX = (x !== undefined);
        hasY = (y !== undefined);

        if (hasX || hasY) {
            // The component's position is the position it was told to be at.
            // If it is contained, adjustPosition will add the floatParent's offsets.
            me.x = x;
            me.y = y;

            adj = me.adjustPosition(x, y);
            // Set up the return info and store the position in this object
            pos = {
                x : adj.x,
                y : adj.y,
                anim: animate,
                hasX: hasX,
                hasY: hasY
            };
        }

        return pos;
    },

    /**
     * Invoked before the Component is shown.
     *
     * @method
     * @template
     * @protected
     */
    beforeShow: Ext.emptyFn,

    /**
     * Bubbles up the component/container hierarchy, calling the specified function with each component. The scope
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
     * Destroys the Component.
     * @since 1.1.0
     */
    destroy: function() {
        var me = this,
            selectors = me.renderSelectors,
            viewModel = me.getConfig('viewModel', true),
            session = me.getConfig('session', true),
            selector,
            el;

        if (!me.isDestroyed) {
            if (!me.hasListeners.beforedestroy || me.fireEvent('beforedestroy', me) !== false) {
                me.destroying = true;

                me.removeBindings();

                // beforeDestroy destroys children, ensure they go before the viewModel/session
                me.beforeDestroy();

                if (viewModel && viewModel.isViewModel) {
                    viewModel.destroy();
                    me.viewModel = null;
                }

                if (session && session.isSession) {
                    session.destroy();
                    me.session = null;
                }

                if (me.floating) {
                    delete me.floatParent;
                    // A zIndexManager is stamped into a *floating* Component when it is added to a Container.
                    // If it has no zIndexManager at render time, it is assigned to the global Ext.WindowManager instance.
                    if (me.zIndexManager) {
                        me.zIndexManager.unregister(me);
                    }
                } else if (me.ownerCt && me.ownerCt.remove) {
                    me.ownerCt.remove(me, false);
                }

                me.stopAnimation();
                me.onDestroy();

                // Attempt to destroy all plugins
                Ext.destroy(me.plugins);

                me.componentLayout = null;
                if (me.hasListeners.destroy) {
                    me.fireEvent('destroy', me);
                }
                if (!me.preventRegister) {
                    Ext.ComponentManager.unregister(me);
                }

                me.mixins.state.destroy.call(me);

                me.clearListeners();
                // make sure we clean up the element references after removing all events
                if (me.rendered) {
                    if (!me.preserveElOnDestroy) {
                        me.el.destroy();
                    }
                    me.mixins.elementCt.destroy.call(me); // removes childEls
                    if (selectors) {
                        for (selector in selectors) {
                            if (selectors.hasOwnProperty(selector)) {
                                el = me[selector];
                                if (el) { // in case any other code may have already removed it
                                    delete me[selector];
                                    el.destroy();
                                }
                            }
                        }
                    }

                    delete me.data;
                    delete me.el;
                    delete me.frameBody;
                    delete me.rendered;
                }

                me.destroying = false;
                me.isDestroyed = true;
            }
        }
    },

    /**
     * Disable the component.
     * @param {Boolean} [silent=false] Passing `true` will suppress the `disable` event from being fired.
     * @since 1.1.0
     */
    disable: function(silent) {
        var me = this;

        me.enableOnRender = false;
        me.addCls(me.disabledCls);
        if (me.rendered) {
            me.onDisable();
        } else {
            me.disableOnRender = true;
        }

        me.disabled = true;

        if (silent !== true) {
            delete me.resetDisable;
            me.fireEvent('disable', me);
        }

        return me;
    },

    /**
     * Enable the component
     * @param {Boolean} [silent=false] Passing `true` will suppress the `enable` event from being fired.
     * @since 1.1.0
     */
    enable: function(silent) {
        var me = this;

        me.disableOnRender = false;
        me.removeCls(me.disabledCls);
        if (me.rendered) {
            me.onEnable();
        } else {
            me.enableOnRender = true;
        }

        me.disabled = false;
        delete me.resetDisable;

        if (silent !== true) {
            me.fireEvent('enable', me);
        }

        return me;
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

        // Iterate up the owner chain until we don't have one, or we find an ancestor which matches using the selector function.
        for (p = this.getRefOwner(); p && !fn(p, this); p = p.getRefOwner()) {
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
     * Retrieves plugin from this component's collection by its `ptype`.
     * @param {String} ptype The Plugin's ptype as specified by the class's `alias` configuration.
     * @return {Ext.plugin.Abstract} plugin instance.
     */
    findPlugin: function(ptype) {
        var i,
            plugins = this.plugins,
            ln = plugins && plugins.length;
        for (i = 0; i < ln; i++) {
            if (plugins[i].ptype === ptype) {
                return plugins[i];
            }
        }
    },

    /**
     * Try to focus this component.
     * @param {Mixed} [selectText] If applicable, `true` to also select all the text in this component, or an array consisting of start and end (defaults to start) position of selection.
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

        if (me.isDestroyed) {
            return;
        }

        // If delay is wanted, queue a call to this function.
        if (delay) {
            me.getFocusTask().delay(Ext.isNumber(delay) ? delay : 10, me.focus, me, [selectText, false, callback, scope]);
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
                if (selectText) {
                    if (Ext.isArray(selectText)) {
                        if (me.selectText) {
                            me.selectText.apply(me, selectText);
                        }
                    } else {
                        focusElDom.select();
                    }
                }

                // Call the callback when focus is done
                Ext.callback(callback, scope);
            }

            // Focusing a floating Component brings it to the front of its stack.
            // this is performed by its zIndexManager. Pass preventFocus true to avoid recursion.
            if (me.floating) {
                // Every component that doesn't have preventFocus set gets a delayed call to focus().
                // Only bring to front if the current component isn't the manager's topmost component.
                if (me !== me.zIndexManager.getActive()) {
                    me.toFront(true);
                }

                if (containerScrollTop !== undefined) {
                    me.container.dom.scrollTop = containerScrollTop;
                }
            }
        }
        return me;
    },

    getAnimateTarget: function(target){
        target = target || this.animateTarget;
        if (target) {
            target = target.isComponent ? target.getEl() : Ext.get(target);
        }
        return target || null;
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

    getComponentLayout: function() {
        var me = this;

        if (!me.componentLayout || !me.componentLayout.isLayout) {
            me.setComponentLayout(Ext.layout.Layout.create(me.componentLayout, 'autocomponent'));
        }
        return me.componentLayout;
    },

    /**
     * Retrieves the top level element representing this component.
     * @return {Ext.dom.Element}
     * @since 1.1.0
     */
    getEl: function() {
        return this.el;
    },

    /**
     * Gets the current height of the component's underlying element.
     * @return {Number}
     */
    getHeight: function() {
        return this.el.getHeight();
    },

    /**
     * Called by `getInherited` to initialize the inheritedState the first time it is
     * requested.
     * @protected
     */
    initInheritedState: function (inheritedState) {
        var me = this,
            layout = me.componentLayout;

        if (me.hidden) {
            inheritedState.hidden = true;
        }
        if (me.collapseImmune) {
            inheritedState.collapseImmune = true;
        }
        if (me.modelValidation !== undefined) {
            inheritedState.modelValidation = me.modelValidation;
        }

        me.mixins.bindable.initInheritedState.call(me, inheritedState);

        if (layout && layout.initInheritedState) {
            layout.initInheritedState(inheritedState);
        }
    },

    /**
     * Retrieves the `id` of this component. Will auto-generate an `id` if one has not already been set.
     * @return {String}
     */
    getId: function() {
        var me = this,
            xtype;

        // If we have no id, attempt to gather it from our configuration.
        // Autogenerate it if none was configured.
        if (!(me.id || (me.id = me.initialConfig.id))) {
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
     * Returns the value of {@link #itemId} assigned to this component, or when that
     * is not set, returns the value of {@link #id}.
     * @return {String}
     */
    getItemId: function() {
        return this.itemId || this.id;
    },

    /**
     * Gets the {@link Ext.ComponentLoader} for this Component.
     * @return {Ext.ComponentLoader} The loader instance, null if it doesn't exist.
     */
    getLoader: function(){
        var me = this,
            loader = me.loader;

        if (loader) {
            if (!loader.isLoader) {
                me.loader = new Ext.ComponentLoader(Ext.apply({
                    target: me
                }, loader));
            } else {
                loader.setTarget(me);
            }
            return me.loader;

        }
        return null;
    },

    /**
     * @protected
     * Returns the element which is masked by the {@link #mask} method, or into which the {@link #setLoading LoadMask} is rendered into.
     *
     * The default implementation uses the {@link #maskElement} configuration to access the Component's child element by name. By default, {@link #maskElement}
     * is `null` which means that `null` is returned from this method indicating that the mask needs to be rendered into the document because
     * component structure should not be contaminated by mask elements.
     *
     * Some subclasses may override this method if they have knowledge about external structures where a mask could usefully be rendered.
     *
     * For example a {@link Ext.view.Table GridView} will request that its owning {@link Ext.panel.Table GridPanel} be masked. The
     * GridPanel will have its own implementation of `getMaskTarget` which will return the element dicated by its own {@link #maskElement}
     * Panels use `"el"` as their {@link #maskElement} by default, but that could be overridden to be `"body"` to leave toolbars and the header
     * mouse-accessible.
     * 
     */
    getMaskTarget: function() {
        return this.maskElement ? this[this.maskElement] : null;
    },

    /**
     * Retrieves a plugin from this component's collection by its `pluginId`.
     * @param {String} pluginId
     * @return {Ext.plugin.Abstract} plugin instance.
     */
    getPlugin: function(pluginId) {
        var i,
            plugins = this.plugins,
            ln = plugins && plugins.length;
        for (i = 0; i < ln; i++) {
            if (plugins[i].pluginId === pluginId) {
                return plugins[i];
            }
        }
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

    /**
     * Returns the "x" scroll position for this component.  Only applicable for components
     * that have been configured with `{@link #autoScroll}` or `{@link #overflowX}`.
     * @return {Number}
     */
    getScrollX: function() {
        var me = this,
            scrollManager = me.scrollManager;

        return scrollManager ? scrollManager.getPosition().x : me.getScrollLeft();
    },

    /**
     * Returns the "y" scroll position for this component.  Only applicable for components
     * that have been configured with `{@link #autoScroll}` or `{@link #overflowY}`.
     * @return {Number}
     */
    getScrollY: function() {
        var me = this,
            scrollManager = me.scrollManager;

        return scrollManager ? scrollManager.getPosition().y : me.getOverflowEl().getScrollTop();
    },

    /**
     * Gets the current size of the component's underlying element.
     * @param {Boolean} [contentSize] true to get the width/size minus borders and padding
     * @return {Object} An object containing the element's size:
     * @return {Number} return.width
     * @return {Number} return.height
     */
    getSize: function(contentSize) {
        return this.el.getSize(contentSize);
    },

    /**
     * Returns an object that describes how this component's width and height are managed.
     * All of these objects are shared and should not be modified.
     *
     * @return {Object} The size model for this component.
     * @return {Ext.layout.SizeModel} return.width The {@link Ext.layout.SizeModel size model}
     * for the width.
     * @return {Ext.layout.SizeModel} return.height The {@link Ext.layout.SizeModel size model}
     * for the height.
     * @protected
     */
    getSizeModel: function (ownerCtSizeModel) {
        var me = this,
            models = Ext.layout.SizeModel,
            ownerContext = me.componentLayout.ownerContext,
            width = me.width,
            height = me.height,
            typeofWidth, typeofHeight,
            hasPixelWidth, hasPixelHeight,
            heightModel, ownerLayout, policy, shrinkWrap, topLevel, widthModel,

            // floating === a floating Component, floated === a border layout's slideout view of a region.
            isFloating = me.floating || me.floated;

        if (ownerContext) {
            // If we are in the middle of a running layout, always report the current,
            // dynamic size model rather than recompute it. This is not (only) a time
            // saving thing, but a correctness thing since we cannot get the right answer
            // otherwise.
            widthModel = ownerContext.widthModel;
            heightModel = ownerContext.heightModel;
        }

        if (!widthModel || !heightModel) {
            hasPixelWidth = ((typeofWidth = typeof width) == 'number');
            hasPixelHeight = ((typeofHeight = typeof height) == 'number');
            topLevel = isFloating || !(ownerLayout = me.ownerLayout);

            // Floating or no owner layout, e.g. rendered using renderTo
            if (topLevel) {
                policy = Ext.layout.Layout.prototype.autoSizePolicy;
                shrinkWrap = isFloating ? 3 : me.shrinkWrap;

                if (hasPixelWidth) {
                    widthModel = models.configured;
                }

                if (hasPixelHeight) {
                    heightModel = models.configured;
                }
            } else {
                policy = ownerLayout.getItemSizePolicy(me, ownerCtSizeModel);
                shrinkWrap = ownerLayout.isItemShrinkWrap(me);
            }

            if (ownerContext) {
                ownerContext.ownerSizePolicy = policy;
            }

            shrinkWrap = (shrinkWrap === true) ? 3 : (shrinkWrap || 0); // false->0, true->3

            // Now that we have shrinkWrap as a 0-3 value, we need to turn off shrinkWrap
            // bits for any dimension that has a configured size not in pixels. These must
            // be read from the DOM.
            //
            if (topLevel && shrinkWrap) {
                if (width && typeofWidth == 'string') {
                    shrinkWrap &= 2; // percentage, "30em" or whatever - not width shrinkWrap
                }
                if (height && typeofHeight == 'string') {
                    shrinkWrap &= 1; // percentage, "30em" or whatever - not height shrinkWrap
                }
            }

            if (shrinkWrap !== 3) {
                if (!ownerCtSizeModel) {
                    ownerCtSizeModel = me.ownerCt && me.ownerCt.getSizeModel();
                }

                if (ownerCtSizeModel) {
                    shrinkWrap |= (ownerCtSizeModel.width.shrinkWrap ? 1 : 0) | (ownerCtSizeModel.height.shrinkWrap ? 2 : 0);
                }
            }

            if (!widthModel) {
                if (!policy.setsWidth) {
                    if (hasPixelWidth) {
                        widthModel = models.configured;
                    } else {
                        widthModel = (shrinkWrap & 1) ? models.shrinkWrap : models.natural;
                    }
                } else if (policy.readsWidth) {
                    if (hasPixelWidth) {
                        widthModel = models.calculatedFromConfigured;
                    } else {
                        widthModel = (shrinkWrap & 1) ? models.calculatedFromShrinkWrap :
                                    models.calculatedFromNatural;
                    }
                } else {
                    widthModel = models.calculated;
                }
            }

            if (!heightModel) {
                if (!policy.setsHeight) {
                    if (hasPixelHeight) {
                        heightModel = models.configured;
                    } else {
                        heightModel = (shrinkWrap & 2) ? models.shrinkWrap : models.natural;
                    }
                } else if (policy.readsHeight) {
                    if (hasPixelHeight) {
                        heightModel = models.calculatedFromConfigured;
                    } else {
                        heightModel = (shrinkWrap & 2) ? models.calculatedFromShrinkWrap :
                                    models.calculatedFromNatural;
                    }
                } else {
                    heightModel = models.calculated;
                }
            }
        }

        // We return one of the cached objects with the proper "width" and "height" as the
        // sizeModels we have determined.
        return widthModel.pairsByHeightOrdinal[heightModel.ordinal];
    },

    /**
     * The supplied default state gathering method for the Component class.
     *
     * This method returns dimension settings such as `flex`, `anchor`, `width` and `height` along with `collapsed`
     * state.
     *
     * Subclasses which implement more complex state should call the superclass's implementation, and apply their state
     * to the result if this basic state is to be saved.
     *
     * Note that Component state will only be saved if the Component has a {@link #stateId} and there as a StateProvider
     * configured for the document.
     *
     * @return {Object}
     */
    getState: function() {
        var me = this,
            state = null,
            sizeModel = me.getSizeModel();

        if (sizeModel.width.configured) {
            state = me.addPropertyToState(state, 'width');
        }
        if (sizeModel.height.configured) {
            state = me.addPropertyToState(state, 'height');
        }

        return state;
    },

    /**
     * Gets the current width of the component's underlying element.
     * @return {Number}
     */
    getWidth: function() {
        return this.el.getWidth();
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
     * Returns this Component's xtype hierarchy as a slash-delimited string. For a list of all available xtypes, see the
     * {@link Ext.Component} header.
     *
     * **If using your own subclasses, be aware that a Component must register its own xtype to participate in
     * determination of inherited xtypes.**
     *
     * Example usage:
     *
     *     @example
     *     var t = new Ext.form.field.Text();
     *     alert(t.getXTypes());  // alerts 'component/field/textfield'
     *
     * @return {String} The xtype hierarchy string
     *
     * @since 2.3.0
     */
    getXTypes: function() {
        var self = this.self,
            xtypes, parentPrototype, parentXtypes;

        if (!self.xtypes) {
            xtypes = [];
            parentPrototype = this;

            while (parentPrototype) {
                parentXtypes = parentPrototype.xtypes;

                if (parentXtypes !== undefined) {
                    xtypes.unshift.apply(xtypes, parentXtypes);
                }

                parentPrototype = parentPrototype.superclass;
            }

            self.xtypeChain = xtypes;
            self.xtypes = xtypes.join('/');
        }

        return self.xtypes;
    },

    /**
     * Checks if the specified CSS class exists on this element's DOM node.
     * @param {String} className The CSS class to check for.
     * @return {Boolean} `true` if the class exists, else `false`.
     * @method
     */
    hasCls: function (cls) {
        var me = this,
            el = me.rendered ? me.el : me.protoEl;

        return el.hasCls.apply(el, arguments);
    },

    /**
     * Checks if there is currently a specified `uiCls`.
     * @param {String} cls The `cls` to check.
     */
    hasUICls: function(cls) {
        var me = this,
            uiCls = me.uiCls || [];

        return Ext.Array.contains(uiCls, cls);
    },

    /**
     * Hides this Component, setting it to invisible using the configured {@link #hideMode}.
     * @param {String/Ext.dom.Element/Ext.Component} [animateTarget=null] **only valid for {@link #cfg-floating} Components
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
                me.getInherited().hidden = true;
                if (me.rendered) {
                    me.onHide.apply(me, arguments);
                }
            }
        }
        return me;
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
    initComponent: function () {
        var me = this,
            width = me.width,
            height = me.height;

        // If plugins have been added by a subclass's initComponent before calling up to here (or any components
        // that don't have a table view), the processed flag will not have been set, and we must process them again.
        if (me.plugins && !me.plugins.processed) {
            me.plugins = me.constructPlugins();
        }

        // this will properly (ignore or) constrain the configured width/height to their
        // min/max values for consistency.
        if (width != null || height != null) {
            me.setSize(width, height);
        }

        if (me.listeners) {
            me.on(me.listeners);
            me.listeners = null; //change the value to remove any on prototype
        }
    },

    /**
     * Initialize any events on this component
     * @protected
     */
    initEvents: function() {
        var me = this,
            afterRenderEvents = me.afterRenderEvents,
            afterRenderEvent, el, property, index, len;

        if (afterRenderEvents) {
            for (property in afterRenderEvents) {
                el = me[property];

                if (el && el.on) {
                    afterRenderEvent = afterRenderEvents[property];

                    for (index = 0, len = afterRenderEvent.length ; index < len ; ++index) {
                        me.mon(el, afterRenderEvent[index]);
                     }
                 }
            }
        }

        // This will add focus/blur listeners to the getFocusEl() element if that is naturally focusable.
        // If *not* naturally focusable, then the FocusManager must be enabled to get it to listen for focus so that
        // the FocusManager can track and highlight focus.
        me.addFocusListener();
    },

    /**
     * Tests whether this Component matches a {@link Ext.ComponentQuery ComponentQuery}
     * selector string.
     * @param {String} selector The selector string to test against.
     * @return {Boolean} `true` if this Component matches the selector.
     */
    is: function(selector) {
        return Ext.ComponentQuery.is(this, selector);
    },

    /**
     * Determines whether this component is the descendant of a particular container.
     * @param {Ext.Container} container
     * @return {Boolean} `true` if the component is the descendant of a particular container, otherwise `false`.
     */
    isDescendantOf: function(container) {
        return !!this.findParentBy(function(p){
            return p === container;
        });
    },

    /**
     * Method to determine whether this Component is currently disabled.
     * @return {Boolean} the disabled state of this Component.
     */
    isDisabled: function() {
        return this.disabled;
    },

    /**
     * Method to determine whether this Component is draggable.
     * @return {Boolean} the draggable state of this component.
     */
    isDraggable: function() {
        return !!this.draggable;
    },

    /**
     * Method to determine whether this Component is droppable.
     * @return {Boolean} the droppable state of this component.
     */
    isDroppable: function() {
        return !!this.droppable;
    },

    /**
     * Method to determine whether this Component is floating.
     * @return {Boolean} the floating state of this component.
     */
    isFloating: function() {
        return this.floating;
    },

    isFocusable: function() {
        var me = this,
            focusEl;
        if ((me.focusable !== false) && (focusEl = me.getFocusEl()) && me.rendered && !me.destroying && !me.isDestroyed && !me.disabled && me.isVisible(true)) {

            // getFocusEl might return a Component if a Container wishes to delegate focus to a descendant.
            // Window can do this via its defaultFocus configuration which can reference a Button.
            // Both Component and Element implement isFocusable, so always ask that.
            return focusEl.isFocusable(true);
        }
    },

    /**
     * Method to determine whether this Component is currently set to hidden.
     * @return {Boolean} the hidden state of this Component.
     */
    isHidden: function() {
        return this.hidden;
    },

    isHierarchicallyHidden: function() {
        var child = this,
            hidden = false,
            parent, parentInheritedState;

        // It is possible for some components to be immune to collapse meaning the immune
        // component remains visible when its direct parent is collapsed, e.g. panel header.
        // Because of this, we must walk up the component hierarchy to determine the true
        // visible state of the component.
        for (; (parent = child.ownerCt || child.floatParent); child = parent) {
            parentInheritedState = parent.getInherited();
            if (parentInheritedState.hidden) {
                hidden = true;
                break;
            }
            if (child.getInherited().collapseImmune) {
                // The child or one of its ancestors is immune to collapse.
                if (parent.collapsed && !child.collapseImmune) {
                    // If the child's direct parent is collapsed, and the child
                    // itself does not have collapse immunity we know that
                    // the child is not visible.
                    hidden = true;
                    break;
                }
            } else {
                // We have ascended the tree to a point where collapse immunity
                // is not in play.  This means if any anscestor above this point
                // is collapsed, then the component is not visible.
                hidden = !!parentInheritedState.collapsed;
                break;
            }
        }

        return hidden;
    },

    /**
     * Determines whether this Component is the root of a layout. This returns `true` if
     * this component can run its layout without assistance from or impact on its owner.
     * If this component cannot run its layout given these restrictions, `false` is returned
     * and its owner will be considered as the next candidate for the layout root.
     *
     * Setting the {@link #_isLayoutRoot} property to `true` causes this method to always
     * return `true`. This may be useful when updating a layout of a Container which shrink
     * wraps content, and you know that it will not change size, and so can safely be the
     * topmost participant in the layout run.
     * @protected
     */
    isLayoutRoot: function() {
        var me = this,
            ownerLayout = me.ownerLayout;

        // Return true if we have been explicitly flagged as the layout root, or if we are floating.
        // Sometimes floating Components get an ownerCt ref injected into them which is *not* a true ownerCt, merely
        // an upward link for reference purposes. For example a grid column menu is linked to the
        // owning header via an ownerCt reference.
        if (!ownerLayout || me._isLayoutRoot || me.floating) {
            return true;
        }

        return ownerLayout.isItemLayoutRoot(me);
    },

    /**
     * Returns `true` if layout is suspended for this component. This can come from direct
     * suspension of this component's layout activity ({@link Ext.Container#suspendLayout}) or if one
     * of this component's containers is suspended.
     *
     * @return {Boolean} `true` layout of this component is suspended.
     */
    isLayoutSuspended: function () {
        var comp = this,
            ownerLayout;

        while (comp) {
            if (comp.layoutSuspendCount || comp.suspendLayout) {
                return true;
            }

            ownerLayout = comp.ownerLayout;
            if (!ownerLayout) {
                break;
            }

            // TODO - what about suspending a Layout instance?

            // this works better than ownerCt since ownerLayout means "is managed by" in
            // the proper sense... some floating components have ownerCt but won't have an
            // ownerLayout
            comp = ownerLayout.owner;
        }

        return false;
    },

    /**
     * Returns `true` if this component is visible.
     *
     * @param {Boolean} [deep=false] Pass `true` to interrogate the visibility status of all parent Containers to
     * determine whether this Component is truly visible to the user.
     *
     * Generally, to determine whether a Component is hidden, the no argument form is needed. For example when creating
     * dynamically laid out UIs in a hidden Container before showing them.
     *
     * @return {Boolean} `true` if this component is visible, `false` otherwise.
     *
     * @since 1.1.0
     */
    isVisible: function(deep) {
        var me = this,
            hidden;

        if (me.hidden || !me.rendered || me.isDestroyed) {
            hidden = true;
        } else if (deep) {
            hidden = me.isHierarchicallyHidden();
        }

        return !hidden;
    },

    /**
     * Tests whether or not this Component is of a specific xtype. This can test whether this Component is descended
     * from the xtype (default) or whether it is directly of the xtype specified (`shallow = true`).
     *
     * **If using your own subclasses, be aware that a Component must register its own xtype to participate in
     * determination of inherited xtypes.**
     *
     * For a list of all available xtypes, see the {@link Ext.Component} header.
     *
     * Example usage:
     *
     *     @example
     *     var t = new Ext.form.field.Text();
     *     var isText = t.isXType('textfield');        // true
     *     var isBoxSubclass = t.isXType('field');       // true, descended from Ext.form.field.Base
     *     var isBoxInstance = t.isXType('field', true); // false, not a direct Ext.form.field.Base instance
     *
     * @param {String} xtype The xtype to check for this Component
     * @param {Boolean} [shallow=false] `true` to check whether this Component is directly of the specified xtype, `false` to
     * check whether this Component is descended from the xtype.
     * @return {Boolean} `true` if this component descends from the specified xtype, `false` otherwise.
     *
     * @since 2.3.0
     */
    isXType: function(xtype, shallow) {
        return shallow ? (Ext.Array.indexOf(this.xtypes, xtype) !== -1) :
                !!this.xtypesMap[xtype];
    },

    /**
     * Masks this component with a semi-opaque layer and makes the contents unavailable to clicks.
     *
     * See {@link #unmask}.
     *
     * @param {String} [msg] A message to show in the center of the mask layer.
     * @param {String} [msgCls] A CSS clas name to use on the message element in the center of the layer.
     */
    mask: function (msg, msgCls, elHeight) {
        var box = this.lastBox,
            // getMaskTarget mayu be overridden in subclasses/
            // null means that a LoadMask has to be rendered to document.body
            // Element masking falls back to masking the local el
            target = this.getMaskTarget() || this.el;

        // Pass it the height of our element if we know it.
        if (box) {
            elHeight = box.height;
        }
        target.mask(msg, msgCls, elHeight);
    },

    /**
     * Returns the next node in the Component tree in tree traversal order.
     *
     * Note that this is not limited to siblings, and if invoked upon a node with no matching siblings, will walk the
     * tree to attempt to find a match. Contrast with {@link #nextSibling}.
     * @param {String} [selector] A {@link Ext.ComponentQuery ComponentQuery} selector to filter the following nodes.
     * @return {Ext.Component} The next node (or the next node which matches the selector).
     * Returns `null` if there is no matching node.
     */
    nextNode: function(selector, /* private */ includeSelf) {
        var node = this,
            ownerCt = node.ownerCt,
            result,
            it, len, i, sib;

        // If asked to include self, test me
        if (includeSelf && node.is(selector)) {
            return node;
        }

        if (ownerCt) {
            for (it = ownerCt.items.items, i = Ext.Array.indexOf(it, node) + 1, len = it.length; i < len; i++) {
                sib = it[i];
                if (sib.is(selector)) {
                    return sib;
                }
                if (sib.down) {
                    result = sib.down(selector);
                    if (result) {
                        return result;
                    }
                }
            }
            return ownerCt.nextNode(selector);
        }
        return null;
    },

    /**
     * Returns the next sibling of this Component.
     *
     * Optionally selects the next sibling which matches the passed {@link Ext.ComponentQuery ComponentQuery} selector.
     *
     * May also be referred to as **`next()`**
     *
     * Note that this is limited to siblings, and if no siblings of the item match, `null` is returned. Contrast with
     * {@link #nextNode}
     * @param {String} [selector] A {@link Ext.ComponentQuery ComponentQuery} selector to filter the following items.
     * @return {Ext.Component} The next sibling (or the next sibling which matches the selector).
     * Returns `null` if there is no matching sibling.
     */
    nextSibling: function(selector) {
        var o = this.ownerCt, it, last, idx, c;
        if (o) {
            it = o.items;
            idx = it.indexOf(this) + 1;
            if (idx) {
                if (selector) {
                    for (last = it.getCount(); idx < last; idx++) {
                        if ((c = it.getAt(idx)).is(selector)) {
                            return c;
                        }
                    }
                } else {
                    if (idx < it.getCount()) {
                        return it.getAt(idx);
                    }
                }
            }
        }
        return null;
    },

    /**
     * Method to manage awareness of when components are added to their
     * respective Container, firing an #added event. References are
     * established at add time rather than at render time.
     *
     * Allows addition of behavior when a Component is added to a
     * Container. At this stage, the Component is in the parent
     * Container's collection of child items. After calling the
     * superclass's `onAdded`, the `ownerCt` reference will be present,
     * and if configured with a ref, the `refOwner` will be set.
     *
     * @param {Ext.container.Container} container Container which holds the component.
     * @param {Number} pos Position at which the component was added.
     * @param {Boolean} instanced `false` if this component was instanced by the parent
     * container. `true` if the instance already existed when it was passed to the container.
     *
     * @template
     * @protected
     * @since 3.4.0
     */
    onAdded: function (container, pos, instanced) {
        var me = this,
            inheritedState = me.inheritedState;

        me.ownerCt = container;

        // The container constructed us, so it's not possible for our 
        // inheritedState to be invalid, so we only need to clear it
        // if we've been added as an instance 
        if (inheritedState && instanced) {
            me.invalidateInheritedState();
        }
        
        if (me.reference) {
            me.fixReference();
        }

        if (me.hasListeners && me.hasListeners.added) {
            me.fireEvent('added', me, container, pos);
        }

        if (Ext.GlobalEvents.hasListeners.added) {
            me.fireHierarchyEvent('added');
        }
    },
    
    /**
     * Method to manage awareness of when components are removed from their
     * respective Container, firing a #removed event. References are properly
     * cleaned up after removing a component from its owning container.
     *
     * Allows addition of behavior when a Component is removed from
     * its parent Container. At this stage, the Component has been
     * removed from its parent Container's collection of child items,
     * but has not been destroyed (It will be destroyed if the parent
     * Container's `autoDestroy` is `true`, or if the remove call was
     * passed a truthy second parameter). After calling the
     * superclass's `onRemoved`, the `ownerCt` and the `refOwner` will not
     * be present.
     * @param {Boolean} destroying Will be passed as `true` if the Container performing the remove operation will delete this
     * Component upon remove.
     *
     * @template
     * @protected
     * @since 3.4.0
     */
    onRemoved: function(destroying) {
        var me = this,
            refHolder;

        if (Ext.GlobalEvents.hasListeners.removed) {
            me.fireHierarchyEvent('removed');
        }

        if (me.hasListeners.removed) {
            me.fireEvent('removed', me, me.ownerCt);
        }
        
        if (me.reference) {
            refHolder = me.lookupReferenceHolder();
            if (refHolder) {
                refHolder.clearReference(me);
            }    
        }

        if (!destroying) {
            me.removeBindings();
        }
        
        if (me.inheritedState && !destroying) {
            me.invalidateInheritedState();
        }

        me.ownerCt = me.ownerLayout = null;
    },

    /**
     * Invoked when this component has first achieved size. Occurs after the
     * {@link #componentLayout} has completed its initial run.
     *
     * @param {Number} width The width of this component
     * @param {Number} height The height of this component
     * 
     * @template
     * @protected
     */
    onBoxReady: function(width, height) {
        var me = this;

        if (me.resizable) {
            me.initResizable(me.resizable);
        }

        // Draggability must be initialized after resizability
        // Because if we have to be wrapped, the resizer wrapper must be dragged as a pseudo-Component
        if (me.draggable) {
            me.initDraggable();
        }

        if (me.touchScroll) {
            me.initScrollManager();
        }
       
        if (me.hasListeners.boxready) {
            me.fireEvent('boxready', me, width, height);
        }
    },

    // private
    onBlur: function(e) {
        var me = this,
            focusCls = me.focusCls,
            focusEl = me.getFocusEl();

        if (me.destroying) {
            return;
        }

        me.beforeBlur(e);
        if (focusCls && focusEl) {
            focusEl.removeCls(me.removeClsWithUI(focusCls, true));
        }
        if (me.validateOnBlur) {
            me.validate();
        }
        me.hasFocus = false;
        me.fireEvent('blur', me, e);
        me.postBlur(e);
    },

    // private
    onFocus: function(e) {
        var me = this,
            focusCls = me.focusCls,
            focusEl = me.getFocusEl();

        if (!me.disabled) {
            me.beforeFocus(e);
            if (focusCls && focusEl) {
                focusEl.addCls(me.addClsWithUI(focusCls, true));
            }
            if (!me.hasFocus) {
                me.hasFocus = true;
                me.fireEvent('focus', me, e);
            }
        }
    },

    /**
     * Allows addition of behavior to the destroy operation.
     * After calling the superclass's onDestroy, the Component will be destroyed.
     *
     * @template
     * @protected
     */
    onDestroy: function() {
        var me = this,
            controller = me.controller,
            b, name;

        if (me.bind) {
            me.removeBindings();
        }

        if (controller) {
            controller.destroy();
        }
        me.controller = null;

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

        // Destroying the floatingItems ZIndexManager will also destroy descendant floating Components
        Ext.destroy(
            me.componentLayout,
            me.loadMask,
            me.floatingDescendants
        );
    },

    /**
     * Allows addition of behavior to the disable operation.
     * After calling the superclass's `onDisable`, the Component will be disabled.
     *
     * @template
     * @protected
     */
    onDisable: function () {
        var me = this,
            focusCls = me.focusCls,
            focusEl = me.getFocusEl(),
            dom, nodeName;
            
        if (focusCls && focusEl) {
            focusEl.removeCls(me.removeClsWithUI(focusCls, true));
        }
        
        if (me.maskOnDisable) {
            dom = me.el.dom;
            nodeName = dom.nodeName;

            if (me.disabledRe.test(nodeName)) {
                dom.disabled = true;
            }

            if (!me.nonMaskableRe.test(nodeName)) {
                me.mask();
            }
        }
    },

    /**
     * Allows addition of behavior to the enable operation.
     * After calling the superclass's `onEnable`, the Component will be enabled.
     *
     * @template
     * @protected
     */
    onEnable: function () {
        var me = this,
            dom, nodeName;

        if (me.maskOnDisable) {
            dom = me.el.dom;
            nodeName = dom.nodeName;

            if (me.disabledRe.test(nodeName)) {
                dom.disabled = false;
            }

            if (!me.nonMaskableRe.test(nodeName)) {
                me.unmask();
            }
        }
    },

    /**
     * Allows addition of behavior to the hide operation. After
     * calling the superclass's onHide, the Component will be hidden.
     *
     * Gets passed the same parameters as #hide.
     *
     * @param {String/Ext.dom.Element/Ext.Component} [animateTarget]
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
            toBox,
            activeEl = Ext.Element.getActiveElement();

        // If hiding a Component which is focused, or contains focus: blur the focused el.
        if (activeEl === me.el || me.el.contains(activeEl)) {
            Ext.fly(activeEl).blur();
        }

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
                        ghostPanel.setHiddenState(true);
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
     * Called after the component is moved, this method is empty by default but can be implemented by any
     * subclass that needs to perform custom logic after a move occurs.
     *
     * @param {Number} x The new x position.
     * @param {Number} y The new y position.
     *
     * @template
     * @protected
     */
    onPosition: Ext.emptyFn,

    /**
     * Allows addition of behavior to the resize operation.
     *
     * Called when Ext.resizer.Resizer#drag event is fired.
     *
     * @method
     * @template
     * @protected
     */
    onResize: function(width, height, oldWidth, oldHeight) {
        var me = this;

        // constrain is a config on Floating
        if (me.floating && me.constrain) {
            me.doConstrain();
        }

        // check oldWidth to ensure the scroller does not get needlessly refreshed on
        // initial component layout (oldWidth/Height are undefined when onResize is called
        // as a result of the initial component layout)
        if (oldWidth) {
            me.refreshScroll();
        }

        if (me.hasListeners.resize) {
            me.fireEvent('resize', me, width, height, oldWidth, oldHeight);
        }
    },

    /**
     * Allows addition of behavior to the show operation. After
     * calling the superclass's onShow, the Component will be visible.
     *
     * Override in subclasses where more complex behaviour is needed.
     *
     * Gets passed the same parameters as #show.
     *
     * @param {String/Ext.dom.Element} [animateTarget]
     * @param {Function} [callback]
     * @param {Object} [scope]
     *
     * @template
     * @protected
     */
    onShow: function() {
        var me = this;

        me.el.show();

        me.updateLayout({ isRoot: false });

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
            me.onFloatShow();
        }
        Ext.callback(cb, scope || me);
        me.fireEvent('show', me);
        delete me.hiddenByLayout;
    },

    onShowVeto: Ext.emptyFn,

    /**
     * Template method to do any post-blur processing.
     * @protected
     * @param {Ext.event.Event} e The event object
     */
    postBlur: Ext.emptyFn,

    /**
     * Returns the previous node in the Component tree in tree traversal order.
     *
     * Note that this is not limited to siblings, and if invoked upon a node with no matching siblings, will walk the
     * tree in reverse order to attempt to find a match. Contrast with {@link #previousSibling}.
     * @param {String} [selector] A {@link Ext.ComponentQuery ComponentQuery} selector to filter the preceding nodes.
     * @return {Ext.Component} The previous node (or the previous node which matches the selector).
     * Returns `null` if there is no matching node.
     */
    previousNode: function(selector, /* private */ includeSelf) {
        var node = this,
            ownerCt = node.ownerCt,
            result,
            it, i, sib;

        // If asked to include self, test me
        if (includeSelf && node.is(selector)) {
            return node;
        }

        if (ownerCt) {
            for (it = ownerCt.items.items, i = Ext.Array.indexOf(it, node) - 1; i > -1; i--) {
                sib = it[i];
                if (sib.query) {
                    result = sib.query(selector);
                    result = result[result.length - 1];
                    if (result) {
                        return result;
                    }
                }
                if (sib.is(selector)) {
                    return sib;
                }
            }
            return ownerCt.previousNode(selector, true);
        }
        return null;
    },

    /**
     * Returns the previous sibling of this Component.
     *
     * Optionally selects the previous sibling which matches the passed {@link Ext.ComponentQuery ComponentQuery}
     * selector.
     *
     * May also be referred to as **`prev()`**
     *
     * Note that this is limited to siblings, and if no siblings of the item match, `null` is returned. Contrast with
     * {@link #previousNode}
     * @param {String} [selector] A {@link Ext.ComponentQuery ComponentQuery} selector to filter the preceding items.
     * @return {Ext.Component} The previous sibling (or the previous sibling which matches the selector).
     * Returns `null` if there is no matching sibling.
     */
    previousSibling: function(selector) {
        var o = this.ownerCt, it, idx, c;
        if (o) {
            it = o.items;
            idx = it.indexOf(this);
            if (idx != -1) {
                if (selector) {
                    for (--idx; idx >= 0; idx--) {
                        if ((c = it.getAt(idx)).is(selector)) {
                            return c;
                        }
                    }
                } else {
                    if (idx) {
                        return it.getAt(--idx);
                    }
                }
            }
        }
        return null;
    },

    /**
     * Called by Component#doAutoRender
     *
     * Register a Container configured `floating: true` with this Component's {@link Ext.ZIndexManager ZIndexManager}.
     *
     * Components added in this way will not participate in any layout, but will be rendered
     * upon first show in the way that {@link Ext.window.Window Window}s are.
     */
    registerFloatingItem: function(cmp) {
        var me = this;
        if (!me.floatingDescendants) {
            me.floatingDescendants = new Ext.ZIndexManager(me);
        }
        me.floatingDescendants.register(cmp);
    },

    /**
     * Removes a CSS class from the top level element representing this component.
     * @param {String/String[]} cls The CSS class name to remove.
     * @returns {Ext.Component} Returns the Component to allow method chaining.
     */
    removeCls: function(cls) {
        var me = this,
            el = me.rendered ? me.el : me.protoEl;

        el.removeCls.apply(el, arguments);
        return me;
    },

    /**
     * Removes a `cls` to the `uiCls` array, which will also call {@link #removeUIClsFromElement} and removes it from all
     * elements of this component.
     * @param {String/String[]} cls A string or an array of strings to remove to the `uiCls`.
     */
    removeClsWithUI: function(classes, skip) {
        var me = this,
            clsArray = [],
            i = 0,
            extArray = Ext.Array,
            remove = extArray.remove,
            uiCls = me.uiCls = extArray.clone(me.uiCls),
            activeUI = me.activeUI,
            length, cls;

        if (typeof classes === "string") {
            classes = (classes.indexOf(' ') < 0) ? [classes] : Ext.String.splitWords(classes);
        }

        length = classes.length;

        for (i = 0; i < length; i++) {
            cls = classes[i];

            if (cls && me.hasUICls(cls)) {
                remove(uiCls, cls);

                //If there's no activeUI then there's nothing to remove
                if (activeUI) {
                    clsArray = clsArray.concat(me.removeUIClsFromElement(cls));
                }
            }
        }

        if (skip !== true && activeUI) {
            me.removeCls(clsArray);
        }

        return clsArray;
    },

    resumeLayouts: function (flushOptions) {
        var me = this;
        if (!me.rendered) {
            return;
        }
        //<debug>
        if (!me.layoutSuspendCount) {
            Ext.log.warn('Mismatched call to resumeLayouts - layouts are currently not suspended.');
        }
        //</debug>
        if (me.layoutSuspendCount && !--me.layoutSuspendCount) {
            me.suspendLayout = false;
            if (flushOptions && !me.isLayoutSuspended()) {
                me.updateLayout(flushOptions);
            }
        }
    },

    /**
     * Scrolls this Component by the passed delta values, optionally animating.
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
        var me = this,
            scrollManager = me.scrollManager;

        if (scrollManager) {
            scrollManager.scrollBy(deltaX, deltaY, animate);
        } else {
            me.doScrollBy(deltaX, deltaY, animate);
        }
    },

    /**
     * Scrolls this component to the specified `x` and `y` coordinates.  Only applicable
     * for components that have been configured with `{@link #autoScroll}` or
     * `{@link #overflowX}` and `{@link #overflowY}`.
     * @param {Number} x
     * @param {Number} y
     * @param {Boolean/Object} [animate] true for the default animation or a standard Element
     * animation config object
     */
    scrollTo: function(x, y, animate) {
        var me = this,
            scrollManager = me.scrollManager;

        if (scrollManager) {
            scrollManager.scrollTo(x, y, animate);
        } else {
            me.doScrollTo(x, y, animate);
        }
    },

    /**
     * Sets the overflow on the content element of the component.
     * @param {Boolean} scroll True to allow the Component to auto scroll.
     * @return {Ext.Component} this
     */
    setAutoScroll: function(scroll) {
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
     *
     * @param {String/Number} border The border, see {@link #border}. If a falsey value is passed
     * the border will be removed.
     */
    setBorder: function(border, /* private */ targetEl) {
        var me = this,
            initial = !!targetEl;

        if (me.rendered || initial) {
            if (!initial) {
                targetEl = me.el;
            }

            if (!border) {
                border = 0;
            } else if (border === true) {
                border = '1px';
            } else {
                border = this.unitizeBox(border);
            }
            targetEl.setStyle('border-width', border);
            if (!initial) {
                me.updateLayout();
            }
        }
        me.border = border;
    },

    /**
     * Sets the dock position of this component in its parent panel. Note that this only has effect if this item is part
     * of the `dockedItems` collection of a parent that has a DockLayout (note that any Panel has a DockLayout by default)
     * @param {Object} dock The dock position.
     * @return {Ext.Component} this
     */
    setDock: function(dock) {
        var me = this,
            ownerCt = me.ownerCt;

        if (dock !== me.dock) {
            if (ownerCt && ownerCt.moveDocked) {
                ownerCt.moveDocked(me, dock);
            } else {
                me.dock = dock;
            }
        }

        return me;
    },

    /**
     * Enable or disable the component.
     * @param {Boolean} disabled `true` to disable.
     */
    setDisabled: function(disabled) {
        return this[disabled ? 'disable': 'enable']();
    },

    /**
     * Sets the flex property of this component. Only applicable when this component is
     * an item of a box layout
     * @private
     * @param {Number} flex
     */
    setFlex: function(flex) {
        this.flex = flex;
    },

    /**
     * Sets the height of the component. This method fires the {@link #resize} event.
     *
     * @param {Number} height The new height to set. This may be one of:
     *
     *   - A Number specifying the new height in pixels.
     *   - A String used to set the CSS height style.
     *   - _undefined_ to leave the height unchanged.
     *
     * @return {Ext.Component} this
     */
    setHeight: function(height) {
        return this.setSize(undefined, height);
    },

    /**
     * This method allows you to show or hide a LoadMask on top of this component.
     *
     * The mask will be rendered into the element returned by {@link #getMaskTarget} which for most Components is the Component's
     * element. See {@link #getMaskTarget} and {@link #maskElement}.
     *
     * Most Components will return `null` indicating that their LoadMask cannot reside inside their element, but must
     * be rendered into the document body.
     *
     * {@link Ext.view.Table Grid Views} however will direct a LoadMask to be rendered into the owning {@link Ext.panel.Table GridPanel}.
     *
     * @param {Boolean/Object/String} load True to show the default LoadMask, a config object that will be passed to the
     * LoadMask constructor, or a message String to show. False to hide the current LoadMask.
     * @return {Ext.LoadMask} The LoadMask instance that has just been shown.
     */
    setLoading: function(load, /*deprecated */ targetEl) {
        var me = this,
            config = {
                target: me
            };

        if (me.rendered) {
            // Shows mask for anything but false.
            if (load !== false) {
                if (Ext.isString(load)) {
                    config.msg = load;
                } else {
                    Ext.apply(config, load);
                }
                // We do not already have a LoadMask: create one
                if (!me.loadMask || !me.loadMask.isLoadMask) {
                    // Deprecated second parameter.
                    // maskElement config replaces this
                    if (targetEl && config.useTargetEl == null) {
                        config.useTargetEl = true;
                    }
                    me.loadMask = new Ext.LoadMask(config);
                }
                // Change any settings according to load config
                else {
                    Ext.apply(me.loadMask, config);
                }
                // If already visible, just update display with passed configs.
                if (me.loadMask.isVisible()) {
                    me.loadMask.afterShow();
                }
                // Otherwise show with new configs
                else {
                    me.loadMask.show();
                }
            }
            // load == falsy: Hide the mask if it exists
            else {
                if (me.loadMask && me.loadMask.isLoadMask) {
                    me.loadMask.hide();
                }
            }
        }
        return me.loadMask;
    },

    /**
     * Sets the margin on the target element.
     * @param {Number/String} margin The margin to set. See the {@link #margin} config.
     */
    setMargin: function(margin, /* private */ preventLayout) {
        var me = this;
        
        if (me.rendered) {
            if (!margin && margin !== 0) {
                margin = '';
            } else {
                if (margin === true) {
                    margin = 5;
                }
                margin = this.unitizeBox(margin);
            }
            me.getTargetEl().setStyle('margin', margin);
            if (!preventLayout) {
                me.updateLayout();
            }
        } else {
            me.margin = margin;
        }
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
            argCount = arguments.length,
            ownerCt = me.ownerCt;

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

        // When overflow status changes, addition/removal of scrollbars potentially changes calculated content size.
        // Lay the owning container out if we have one.
        (ownerCt || me).updateLayout();
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

    /**
     * @member Ext.Component
     * Sets the left and top of the component. To set the page XY position instead, use {@link Ext.Component#setPagePosition setPagePosition}. This
     * method fires the {@link #event-move} event.
     * @param {Number/Number[]/Object} x The new left, an array of `[x,y]`, or animation config object containing `x` and `y` properties.
     * @param {Number} [y] The new top.
     * @param {Boolean/Object} [animate] If `true`, the Component is _animated_ into its new position. You may also pass an
     * animation configuration.
     * @return {Ext.Component} this
     */
    setPosition: function(x, y, animate) {
        var me = this,
            pos = me.beforeSetPosition.apply(me, arguments);

        if (pos && me.rendered) {
            x = pos.x;
            y = pos.y;

            if (animate) {
                // Proceed only if the new position is different from the current
                // one. We only do these DOM reads in the animate case as we don't
                // want to incur the penalty of read/write on every call to setPosition
                if (x !== me.getLocalX() || y !== me.getLocalY()) {
                    me.stopAnimation();
                    me.animate(Ext.apply({
                        duration: 1000,
                        listeners: {
                            afteranimate: Ext.Function.bind(me.afterSetPosition, me, [x, y])
                        },
                        to: {
                            // Use local coordinates for a component
                            // We don't need to normalize this for RTL, the anim.target.Component
                            // calls setPosition, which will normalize the x value to right when
                            // it's necessary
                            left: x,
                            top: y
                        }
                    }, animate));
                }
            } else {
                me.setLocalXY(x, y);
                me.afterSetPosition(x, y);
            }
        }
        return me;
    },

    /**
     * Sets the "x" scroll position for this component.  Only applicable for components
     * that have been configured with `{@link #autoScroll}` or `{@link #overflowX}`.
     * @param {Number} x
     */
    setScrollX: function(x) {
        var me = this,
            scrollManager = me.scrollManager;

        if (scrollManager) {
            scrollManager.scrollTo(x, scrollManager.getPosition().y);
        } else {
            me.setScrollLeft(x);
        }
    },

    /**
     * Sets the "y" scroll position for this component.  Only applicable for components
     * that have been configured with `{@link #autoScroll}` or `{@link #overflowY}`.
     * @param {Number} y
     */
    setScrollY: function(y) {
        var me = this,
            scrollManager = me.scrollManager;

        if (scrollManager) {
            scrollManager.scrollTo(scrollManager.getPosition().x, y);
        } else {
            me.getOverflowEl().setScrollTop(y);
        }
    },

    /**
     * Sets the width and height of this Component. This method fires the {@link #resize} event. This method can accept
     * either width and height as separate arguments, or you can pass a size object like `{width:10, height:20}`.
     *
     * @param {Number/String/Object} width The new width to set. This may be one of:
     *
     *   - A Number specifying the new width in pixels.
     *   - A String used to set the CSS width style.
     *   - A size object in the format `{width: widthValue, height: heightValue}`.
     *   - `undefined` to leave the width unchanged.
     *
     * @param {Number/String} height The new height to set (not required if a size object is passed as the first arg).
     * This may be one of:
     *
     *   - A Number specifying the new height in pixels.
     *   - A String used to set the CSS height style. Animation may **not** be used.
     *   - `undefined` to leave the height unchanged.
     *
     * @return {Ext.Component} this
     */
    setSize: function(width, height) {
        var me = this;

        // support for standard size objects
        if (width && typeof width == 'object') {
            height = width.height;
            width  = width.width;
        }

        // Constrain within configured maxima
        if (typeof width == 'number') {
            me.width = Ext.Number.constrain(width, me.minWidth, me.maxWidth);
        } else if (width === null) {
            delete me.width;
        }
        
        if (typeof height == 'number') {
            me.height = Ext.Number.constrain(height, me.minHeight, me.maxHeight);
        } else if (height === null) {
            delete me.height;
        }

        // If not rendered, all we need to is set the properties.
        // The initial layout will set the size
        if (me.rendered && me.isVisible()) {
            if (me.liquidLayout) {
                // if we have a liquid layout we must setSize now, since the following
                // updateLayout call will not set our size in the dom if we successfully
                // opt out of the layout run
                me.el.setSize(me.width, me.height);
            }

            // If we are changing size, then we are not the root.
            me.updateLayout({
                isRoot: false
            });
        }

        return me;
    },

    /**
     * Sets the stlye for this Component's primary element.
     * @param {String/Object} style
     */
    setStyle: function (style) {
        var el = this.el || this.protoEl;
        el.setStyle(style);
    },

    /**
     * Sets the UI for the component. This will remove any existing UIs on the component. It will also loop through any
     * `uiCls` set on the component and rename them so they include the new UI.
     * @param {String} ui The new UI for the component.
     */
    setUI: function(ui) {
        var me = this,
            uiCls = me.uiCls,
            activeUI = me.activeUI,
            classes;

        if (ui === activeUI) {
            // The ui hasn't changed
            return;
        }

        // activeUI will only be set if setUI has been called before. If it hasn't there's no need to remove anything
        if (activeUI) {
            classes = me.removeClsWithUI(uiCls, true);

            if (classes.length) {
                me.removeCls(classes);
            }

            // Remove the UI from the element
            me.removeUIFromElement();
        }
        else {
            // We need uiCls to be empty otherwise our call to addClsWithUI won't do anything
            me.uiCls = [];
        }

        // Set the UI
        me.ui = ui;

        // After the first call to setUI the values ui and activeUI should track each other but initially we need some
        // way to tell whether the ui has really been set.
        me.activeUI = ui;

        // Add the new UI to the element
        me.addUIToElement();

        classes = me.addClsWithUI(uiCls, true);

        if (classes.length) {
            me.addCls(classes);
        }

        // Changing the ui can lead to significant changes to a component's appearance, so the layout needs to be
        // updated. Internally most calls to setUI are pre-render. Buttons are a notable exception as setScale changes
        // the ui and often requires the layout to be updated.
        if (me.rendered) {
            me.updateLayout();
        }
    },

    /**
     * Convenience function to hide or show this component by Boolean.
     * @param {Boolean} visible `true` to show, `false` to hide.
     * @return {Ext.Component} this
     * @since 1.1.0
     */
    setVisible: function(visible) {
        return this[visible ? 'show': 'hide']();
    },

    /**
     * Sets the hidden state of this component. This is basically the same as
     * `{@link #setVisible}` but the boolean parameter has the opposite meaning.
     * @param {Boolean} hidden
     * @return {Ext.Component}
     */
    setHidden: function(hidden) {
        return this.setVisible(!hidden);
    },

    /**
     * Sets the width of the component. This method fires the {@link #resize} event.
     *
     * @param {Number} width The new width to setThis may be one of:
     *
     *   - A Number specifying the new width in pixels.
     *   - A String used to set the CSS width style.
     *
     * @return {Ext.Component} this
     */
    setWidth: function(width) {
        return this.setSize(width);
    },

    /**
     * Shows this Component, rendering it first if {@link #autoRender} or {@link #floating} are `true`.
     *
     * After being shown, a {@link #floating} Component (such as a {@link Ext.window.Window}), is activated it and
     * brought to the front of its {@link #zIndexManager z-index stack}.
     *
     * @param {String/Ext.dom.Element} [animateTarget=null] **only valid for {@link #floating} Components such as {@link
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
            if (me.floating) {
                me.onFloatShow();
            }
        } else {
            if (me.fireEvent('beforeshow', me) !== false) {
                me.hidden = false;
                delete this.getInherited().hidden;
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
     * Shows this component by the specified {@link Ext.Component Component} or {@link Ext.dom.Element Element}.
     * Used when this component is {@link #floating}.
     * @param {Ext.Component/Ext.dom.Element} component The {@link Ext.Component} or {@link Ext.dom.Element} to show the component by.
     * @param {String} [position] Alignment position as used by {@link Ext.util.Positionable#getAlignToXY}.
     * Defaults to `{@link #defaultAlign}`. See {@link #alignTo} for possible values.
     * @param {Number[]} [offsets] Alignment offsets as used by {@link Ext.util.Positionable#getAlignToXY}. See {@link #alignTo} for possible values.
     * @return {Ext.Component} this
     */
    showBy: function(cmp, pos, off) {
        var me = this;

        //<debug>
        if (!me.floating) {
            Ext.log.warn('Using showBy on a non-floating component');
        }
        //</debug>

        if (me.floating && cmp) {
            me.alignTarget = cmp;

            if (pos) {
                me.defaultAlign = pos;
            }

            if (off) {
                me.alignOffset = off;
            }

            me.show();

            // Could have been vetoed.
            if (!me.hidden) {
                me.alignTo(cmp, pos || me.defaultAlign, off || me.alignOffset);
            }
        }

        return me;
    },

    suspendLayouts: function () {
        var me = this;
        if (!me.rendered) {
            return;
        }
        if (++me.layoutSuspendCount === 1) {
            me.suspendLayout = true;
        }
    },

    unitizeBox: function(box) {
        return Ext.Element.unitizeBox(box);    
    },

    /**
     * Removes the mask applied by {@link #mask}
     */
    unmask: function() {
        (this.getMaskTarget() || this.el).unmask();
    },
    
    unregisterFloatingItem: function(cmp) {
        var me = this;
        if (me.floatingDescendants) {
            me.floatingDescendants.unregister(cmp);
        }
    },

    /**
     * Navigates up the ownership hierarchy searching for an ancestor Container which matches any passed selector or component.
     *
     * *Important.* There is not a universal upwards navigation pointer. There are several upwards relationships
     * such as the {@link Ext.button.Button button} which activates a {@link Ext.button.Button#cfg-menu menu}, or the
     * {@link Ext.menu.Item menu item} which activated a {@link Ext.menu.Item#cfg-menu submenu}, or the
     * {@link Ext.grid.column.Column column header} which activated the column menu.
     *
     * These differences are abstracted away by this method.
     *
     * Example:
     *
     *     var owningTabPanel = grid.up('tabpanel');
     *
     * @param {String/Ext.Component} [selector] The selector component or actual component to test. If not passed the immediate owner/activater is returned.
     * @param {String/Number/Ext.Component} [limit] This may be a selector upon which to stop the upward scan, or a limit of the number of steps, or Component reference to stop on.
     * @return {Ext.container.Container} The matching ancestor Container (or `undefined` if no match was found).
     */
    up: function (selector, limit) {
        var result = this.getRefOwner(),
            limitSelector = typeof limit === 'string',
            limitCount = typeof limit === 'number',
            limitComponent = limit && limit.isComponent,
            steps = 0;

        if (selector) {
            for (; result; result = result.getRefOwner()) {
                steps++;
                if (selector.isComponent) {
                    if (result === selector) {
                        return result;
                    }
                } else {
                    if (Ext.ComponentQuery.is(result, selector)) {
                        return result;
                    }
                }

                // Stop when we hit the limit selector
                if (limitSelector && result.is(limit)) {
                    return;
                }
                if (limitCount && steps === limit) {
                    return;
                }
                if (limitComponent && result === limit) {
                    return;
                }
            }
        }
        return result;
    },

    /**
     * Update the content area of a component.
     * @param {String/Object} htmlOrData If this component has been configured with a
     * template via the tpl config then it will use this argument as data to populate the
     * template. If this component was not configured with a template, the components
     * content area will be updated via Ext.Element update.
     * @param {Boolean} [loadScripts=false] Only legitimate when using the `html`
     * configuration.
     * @param {Function} [callback] Only legitimate when using the `html` configuration.
     * Callback to execute when scripts have finished loading.
     *
     * @since 3.4.0
     */
    update: function(htmlOrData, loadScripts, callback) {
        var me = this,
            isData = (me.tpl && !Ext.isString(htmlOrData)),
            scrollManager = me.scrollManager,
            sizeModel, doLayout, el;


        if (isData) {
            me.data = (htmlOrData && htmlOrData.isEntity) ? htmlOrData.getData(true) : htmlOrData;
        } else {
            me.html = Ext.isObject(htmlOrData) ? Ext.DomHelper.markup(htmlOrData) : htmlOrData;
        }

        if (me.rendered) {
            sizeModel = me.getSizeModel();
            doLayout = sizeModel.width.shrinkWrap || sizeModel.height.shrinkWrap;

            if (me.isContainer) {
                el = me.layout.getRenderTarget();

                // If we are a non-empty container being updated with raw content we have to lay out
                doLayout = doLayout || me.items.items.length > 0;
            } else {
                el = me.touchScroll ? me.getScrollerEl() : me.getTargetEl();
            }
            if (isData) {
                me.tpl[me.tplWriteMode](el, me.data || {});
            } else {
                el.setHtml(me.html, loadScripts, callback);
            }

            if (doLayout) {
                me.updateLayout();
            }
            if (scrollManager) {
                scrollManager.refresh();
            }
        }
    },

    setHtml: function (html) {
        this.update(html);
    },

    applyData: function (data) {
        // Don't return data here, update will set this.data
        this.update(data);
    },

    /**
     * Sets the current box measurements of the component's underlying element.
     * @param {Object} box An object in the format {x, y, width, height}
     * @return {Ext.Component} this
     */
    updateBox: function(box){
        this.setSize(box.width, box.height);
        this.setPagePosition(box.x, box.y);
        return this;
    },

    _asLayoutRoot: { isRoot: true },

    /**
     * Updates this component's layout. If this update affects this components {@link #ownerCt},
     * that component's `updateLayout` method will be called to perform the layout instead.
     * Otherwise, just this component (and its child items) will layout.
     *
     * @param {Object} [options] An object with layout options.
     * @param {Boolean} options.defer `true` if this layout should be deferred.
     * @param {Boolean} options.isRoot `true` if this layout should be the root of the layout.
     */
    updateLayout: function (options) {
        var me = this,
            defer,
            lastBox = me.lastBox,
            isRoot = options && options.isRoot;

        if (lastBox) {
            // remember that this component's last layout result is invalid and must be
            // recalculated
            lastBox.invalid = true;
        }

        if (!me.rendered || me.layoutSuspendCount || me.suspendLayout) {
            return;
        }

        if (me.hidden) {
            Ext.Component.cancelLayout(me);
        } else if (typeof isRoot != 'boolean') {
            isRoot = me.isLayoutRoot();
        }

        // if we aren't the root, see if our ownerLayout will handle it...
        if (isRoot || !me.ownerLayout || !me.ownerLayout.onContentChange(me)) {
            // either we are the root or our ownerLayout doesn't care
            if (!me.isLayoutSuspended()) {
                // we aren't suspended (knew that), but neither is any of our ownerCt's...
                defer = (options && options.hasOwnProperty('defer')) ? options.defer : me.deferLayouts;
                Ext.Component.updateLayout(me, defer);
            }
        }
    },

    // ***********************************************************************************
    // End Component methods
    // ***********************************************************************************
    // </editor-fold>

    // <editor-fold desc="Positionable Methods">
    // ***********************************************************************************
    // Begin Positionable methods
    // ***********************************************************************************
    getAnchorToXY: function(el, anchor, local, mySize) {
        return el.getAnchorXY(anchor, local, mySize);
    },

    getBorderPadding: function() {
        return this.el.getBorderPadding();
    },

    getLocalX: function() {
        return this.el.getLocalX();
    },

    getLocalXY: function() {
        return this.el.getLocalXY();
    },

    getLocalY: function() {
        return this.el.getLocalY();
    },

    getX: function() {
        return this.el.getX();
    },

    getXY: function() {
        return this.el.getXY();
    },

    getY: function() {
        return this.el.getY();
    },

    setLocalX: function(x) {
        this.el.setLocalX(x);
    },

    setLocalXY: function(x, y) {
        this.el.setLocalXY(x, y);
    },

    setLocalY: function(y) {
        this.el.setLocalY(y);
    },

    setX: function(x, animate) {
        this.el.setX(x, animate);
    },

    setXY: function(xy, animate) {
        this.el.setXY(xy, animate);
    },

    setY: function(y, animate) {
        this.el.setY(y, animate);
    },

    // ***********************************************************************************
    // End Positionable methods
    // ***********************************************************************************
    // </editor-fold>

    privates: {
        statics: {
            /**
             * Walk the DOM tree upwards and find the Component these elements belong to.
             * @private
             */
            findComponentByElement: function(node) {
                var topmost = document.body,
                    target = node,
                    cmp;

                while (target && target.nodeType === 1 && target !== topmost) {
                    cmp = Ext.getCmp(target.id);

                    if (cmp) {
                        return cmp;
                    }

                    target = target.parentNode;
                }

                return null;
            },

            /**
             * Find a Component that the given Element belongs to.
             *
             * @param {Ext.dom.Element/HTMLElement} el
             * @return {Ext.Component/null} Component, or null
             * @private
             */
            getComponentByElement: function(el) {
                var cmpIdAttr = Ext.Component.componentIdAttribute,
                    cmpId;

                el = Ext.fly(el);

                if (!el) {
                    return null;
                }

                cmpId = el.getAttribute(cmpIdAttr);

                if (cmpId) {
                    return Ext.getCmp(cmpId);
                }
                else {
                    return Ext.Component.findComponentByElement(el.dom);
                }
            },

            /**
             * Return the currently active (focused) Component
             *
             * @return {Ext.Component/null} Active Component, or null
             * @private
             */
            getActiveComponent: function() {
                var el = Ext.dom.Element.getActiveElement();

                return Ext.Component.getComponentByElement(el);
            }
        }, // statics

        /**
         * Sets up the focus listener on this Component's {@link #getFocusEl focusEl} if it has one.
         *
         * Form Components which must implicitly participate in tabbing order usually have a naturally focusable
         * element as their {@link #getFocusEl focusEl}, and it is the DOM event of that receiving focus which drives
         * the Component's `onFocus` handling, and the DOM event of it being blurred which drives the `onBlur` handling.
         *
         * If the {@link #getFocusEl focusEl} is **not** naturally focusable, then the listeners are only added
         * if the {@link Ext.FocusManager FocusManager} is enabled.
         * @private
         */
        addFocusListener: function() {
            var me = this,
                focusEl = me.getFocusEl(),
                needsTabIndex;

            // All Containers may be focusable, not only "form" type elements, but also
            // Panels, Toolbars, Windows etc.
            // Usually, the <DIV> element they will return as their focusEl will not be able to receive focus
            // However, if the FocusManager is invoked, its non-default navigation handlers (invoked when
            // tabbing/arrowing off of certain Components) may explicitly focus a Panel or Container or FieldSet etc.
            // Add listeners to the focus and blur events on the focus element

            // If this Component returns a focusEl, we might need to add a focus listener to it.
            if (focusEl) {
                // getFocusEl might return a Component if a Container wishes to delegate focus to a descendant.
                // Window can do this via its defaultFocus configuration which can reference a Button.
                if (focusEl.isComponent) {
                    return focusEl.addFocusListener();
                }

                // If the focusEl is naturally focusable, then we always need a focus listener to drive the Component's
                // onFocus handling.
                // If *not* naturally focusable, then we only need the focus listener if the FocusManager is enabled.
                needsTabIndex = focusEl.needsTabIndex();
                if (!me.focusListenerAdded && (!needsTabIndex || Ext.enableFocusManager)) {
                    if (needsTabIndex) {
                        focusEl.dom.tabIndex = -1;
                    }
                    focusEl.on({
                        focus: me.onFocus,
                        blur: me.onBlur,
                        scope: me
                    });

                    // This attribute is a shortcut to look up a Component by its Elements
                    // It only makes sense on focusable elements, so we set it here
                    focusEl.dom.setAttribute(Ext.Component.componentIdAttribute, me.id);

                    me.focusListenerAdded = true;
                }
            }
        },

        addOverCls: function() {
            var me = this;
            if (!me.disabled) {
                me.el.addCls(me.overCls);
            }
        },

        /**
         * Method which adds a specified UI to the components element.
         * @private
         */
        addUIToElement: function() {
            var me = this,
                baseClsUI = me.baseCls + '-' + me.ui,
                childEls, childElName, el, suffix;

            me.addCls(baseClsUI);

            if (me.rendered && me.frame && !Ext.supports.CSS3BorderRadius) {
                // Loop through each frame element, and if they are defined add the ui:
                baseClsUI += '-';
                childEls = me.getChildEls();

                for (childElName in childEls) {
                    suffix = childEls[childElName].frame;
                    if (suffix && suffix !== true) {
                        el = me[childElName];
                        if (el) {
                            el.addCls(baseClsUI + suffix);
                        }
                    }
                }
            }
        },

        // private
        blur: function() {
            var me = this,
                focusEl;

            if (me.rendered && (focusEl = me.getFocusEl())) {
                me.blurring = true;
                focusEl.blur();
                delete me.blurring;
            }
            return me;
        },

        /**
         * @param {String/Object} ptype string or config object containing a ptype property.
         *
         * Constructs a plugin according to the passed config object/ptype string.
         *
         * Ensures that the constructed plugin always has a `cmp` reference back to this component.
         * The setting up of this is done in PluginManager. The PluginManager ensures that a reference to this
         * component is passed to the constructor. It also ensures that the plugin's `setCmp` method (if any) is called.
         * @private
         */
        constructPlugin: function(plugin) {
            var me = this;

            // ptype only, pass as the defultType
            if (typeof plugin === 'string') {
                plugin = Ext.PluginManager.create({}, plugin, me);
            }
            // Object (either config with ptype or an instantiated plugin)
            else {
                plugin = Ext.PluginManager.create(plugin, null, me);
            }
            return plugin;
        },

        /**
         * Returns an array of fully constructed plugin instances. This converts any configs into their
         * appropriate instances.
         *
         * It does not mutate the plugins array. It creates a new array.
         * @private
         */
        constructPlugins: function() {
            var me = this,
                plugins = me.plugins,
                result, i, len;

            if (plugins) {
                result = [];

                // The processed flag indicates that the plugins have been constructed. This is usually done
                // at construction time, so if at initComponent time, there is a non-zero array of plugins which
                // does NOT have the processed flag, it needs to be processed again.
                result.processed = true;
                if (!Ext.isArray(plugins)) {
                    plugins = [ plugins ];
                }
                for (i = 0, len = plugins.length; i < len; i++) {
                    // this just returns already-constructed plugin instances...
                    result[i] = me.constructPlugin(plugins[i]);
                }
            }

            me.pluginsInitialized = true;
            return result;
        },

        // private - hook for rtl override
        doScrollBy: function(deltaX, deltaY, animate) {
            var overflowEl = this.getOverflowEl();
            if (overflowEl) {
                overflowEl.scrollBy(deltaX, deltaY, animate);
            }
        },

        // private - hook for rtl override
        doScrollTo: function(x, y, animate) {
            var overflowEl = this.getOverflowEl();
            overflowEl.scrollTo('left', x, animate);
            overflowEl.scrollTo('top', y, animate);
        },

        /**
         * This method fires an event on `Ext.GlobalEvents` allowing interested parties to know
         * of certain critical events for this component. This is done globally because the
         * (few) listeners can immediately receive the event rather than bubbling the event
         * only to reach the top and have no listeners.
         *
         * The main usage for these events is to do with floating components. For example, the
         * load mask is a floating component. The component it is masking may be inside several
         * containers. As such, they need to know when component is hidden, either directly, or
         * via a parent container being hidden. To do this they subscribe to these events and
         * filter out the appropriate container.
         *
         * This functionality is contained in Component (as opposed to Container) because a
         * Component can be the ownerCt for a floating component (loadmask), and the loadmask
         * needs to know when its owner is shown/hidden so that its hidden state can be
         * synchronized.
         *
         * @param {String} eventName The event name.
         * @since 4.2.0
         * @private
         */
        fireHierarchyEvent: function (eventName) {
            var globalEvents = Ext.GlobalEvents;

            if (globalEvents.hasListeners[eventName]) {
                globalEvents.fireEvent(eventName, this);
            }
        },

        getActionEl: function() {
            return this.el;
        },

        /**
         * @private
         */
        getAutoId: function() {
            this.autoGenId = true;
            return ++Ext.Component.AUTO_ID;
        },

        // private
        getContentTarget: function() {
            return this.el;
        },

        getDragEl: function() {
            return this.el;
        },

        /**
         * Returns the focus holder element associated with this Component. At the Component base class level, this function returns `undefined`.
         *
         * Subclasses which use embedded focusable elements (such as Window, Field and Button) should override this
         * for use by the {@link Ext.Component#method-focus focus} method.
         *
         * Containers which need to participate in the {@link Ext.FocusManager FocusManager}'s navigation and Container focusing scheme also
         * need to return a `focusEl`, although focus is only listened for in this case if the {@link Ext.FocusManager FocusManager} is {@link Ext.FocusManager#method-enable enable}d.
         *
         * @return {Ext.Element} `undefined` because raw Components cannot by default hold focus.
         * @method
         * @private
         */
        getFocusEl: Ext.privateFn,

        // private
        getFocusTask: function() {
            if (!this.focusTask) {
                // One global DelayedTask to assign focus
                // So that the last focus call wins.
                Ext.Component.prototype.focusTask = new Ext.util.DelayedTask();
            }
            return this.focusTask;
        },

        /**
         * Get an el for overflowing, defaults to the target el
         * @private
         */
        getOverflowEl: function(){
            return this.getTargetEl();
        },

        /**
         * @private
         * Returns the CSS style object which will set the Component's scroll styles. This must be applied
         * to the {@link #getTargetEl target element}.
         */
        getOverflowStyle: function() {
            var me = this,
                result = null,
                auto = me.autoScroll,
                ox, oy,
                overflowStyle;

            // Note to maintainer. To save on waves of testing, setting and defaulting, the code below
            // rolls assignent statements into conditional test value expressions and property object initializers.
            // This avoids sprawling code. Maintain with care.
            if (typeof auto === 'boolean') {
                result = {
                    overflow: overflowStyle = (auto ? 'auto' : '')
                };
                me.scrollFlags = {
                    overflowX: overflowStyle,
                    overflowY: overflowStyle,
                    x: auto,
                    y: auto,
                    both: auto
                };
            } else {
                ox = me.overflowX;
                oy = me.overflowY;
                if (ox !== undefined || oy !== undefined) {
                    if (ox && ox === true) {
                        ox = 'auto';
                    }

                    if (oy && oy === true) {
                        oy = 'auto';
                    }
                    result = {
                        'overflowX':  ox = ox || '',
                        'overflowY':  oy = oy || ''
                    };

                    /**
                     * @member Ext.Component
                     * @property {Object} scrollFlags
                     * An object property which provides unified information as to which dimensions are scrollable based upon
                     * the {@link #autoScroll}, {@link #overflowX} and {@link #overflowY} settings (And for *views* of trees and grids, the owning panel's {@link Ext.panel.Table#scroll scroll} setting).
                     *
                     * Note that if you set overflow styles using the {@link #style} config or {@link Ext.panel.Panel#bodyStyle bodyStyle} config, this object does not include that information;
                     * it is best to use {@link #autoScroll}, {@link #overflowX} and {@link #overflowY} if you need to access these flags.
                     *
                     * This object has the following properties:
                     * @property {Boolean} scrollFlags.x `true` if this Component is scrollable horizontally - style setting may be `'auto'` or `'scroll'`.
                     * @property {Boolean} scrollFlags.y `true` if this Component is scrollable vertically - style setting may be `'auto'` or `'scroll'`.
                     * @property {Boolean} scrollFlags.both `true` if this Component is scrollable both horizontally and vertically.
                     * @property {String} scrollFlags.overflowX The `overflow-x` style setting, `'auto'` or `'scroll'` or `''`.
                     * @property {String} scrollFlags.overflowY The `overflow-y` style setting, `'auto'` or `'scroll'` or `''`.
                     * @readonly
                     */
                    me.scrollFlags = {
                        overflowX: ox,
                        overflowY: oy,
                        x: ox = (ox === 'auto' || ox === 'scroll'),
                        y: oy = (oy === 'auto' || oy === 'scroll'),
                        both: ox && oy
                    };
                } else {
                    me.scrollFlags = {
                        overflowX: '',
                        overflowY: '',
                        x: false,
                        y: false,
                        both: false
                    };
                }
            }

            return result;
        },

        /**
         * Returns an array of current fully constructed plugin instances.
         * @private
         */
        getPlugins : function() {
            var me = this,
                plugins = me.plugins;
            return (plugins && plugins.processed) ? plugins : me.constructPlugins();
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

        // private - hook for rtl override
        getScrollLeft: function() {
            return this.getOverflowEl().getScrollLeft();
        },

        getScrollerEl: function() {
            var me = this;

            return me.scrollerEl || (me.scrollerEl =
                me.componentLayout.getScrollerEl() || me.getOverflowEl().child(me.scrollerSelector));
        },

        /**
         * This is used to determine where to insert the 'html', 'contentEl' and 'items' in this component.
         * @private
         */
        getTargetEl: function() {
            return this.frameBody || this.el;
        },

        /**
         * @private
         * Needed for when widget is rendered into a grid cell. The class to add to the cell element.
         */
        getTdCls: function() {
            return Ext.baseCSSPrefix + this.getTdType() + '-' + this.ui + '-cell';
        },

        /**
         * @private
         * Partner method to {@link #getTdCls}.
         *
         * Returns the base type for the component. Defaults to return `this.xtype`, but
         * All derived classes of {@link Ext.form.field.Text TextField} can return the type 'textfield',
         * and all derived classes of {@link Ext.button.Button Button} can return the type 'button'
         */
        getTdType: function() {
            return this.xtype;
        },

        /**
         * @private
         */
        getTpl: function(name) {
            return Ext.XTemplate.getTpl(this, name);
        },

        initCls: function() {
            var me = this,
                cls = [ me.baseCls, me.getComponentLayout().targetCls ];

            //<deprecated since=0.99>
            if (Ext.isDefined(me.cmpCls)) {
                if (Ext.isDefined(Ext.global.console)) {
                    Ext.global.console.warn('Ext.Component: cmpCls has been deprecated. Please use componentCls.');
                }
                me.componentCls = me.cmpCls;
                delete me.cmpCls;
            }
            //</deprecated>

            if (me.componentCls) {
                cls.push(me.componentCls);
            } else {
                me.componentCls = me.baseCls;
            }

            return cls;
        },

        initDraggable: function() {
            var me = this,

            // If we are resizable, and the resizer had to wrap this Component's el (eg an Img)
            // Then we have to create a pseudo-Component out of the resizer to drag that,
            // otherwise, we just drag this Component
                dragTarget = (me.resizer && me.resizer.el !== me.el) ? me.resizerComponent = new Ext.Component({
                    ariaRole: 'presentation',
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
         * Initializes padding by applying it to the target element, or if the layout manages
         * padding ensures that the padding on the target element is "0".
         * @private
         */
        initPadding: function(targetEl) {
            var me = this,
                padding = me.padding;

            if (padding != null) {
                if (me.touchScroll || (me.layout && me.layout.managePadding && me.contentPaddingProperty === 'padding')) {
                    // If the container layout manages padding, or if a touch scroller is in
                    // use, the padding will be applied to an inner layout element, or the
                    // touch scroller element.  This is done as a workaround for the browser bug
                    // where right and/or bottom padding is lost when the element has overflow.
                    // The assumed intent is for the configured padding to override any padding
                    // that is applied to the target element via stylesheet rules.  It is
                    // therefore necessary to set the target element's padding to "0".
                    targetEl.setStyle('padding', 0);
                } else {
                    // Convert the padding, margin and border properties from a space seperated string
                    // into a proper style string
                    targetEl.setStyle('padding', this.unitizeBox((padding === true) ? 5 : padding));
                }
            }
        },

        // @private
        initPlugin: function(plugin) {
            plugin.init(this);

            return plugin;
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

        initScrollManager: function() {
            var me = this,
                scrollFlags = me.scrollFlags,
                scrollerEl = me.getScrollerEl();

            if (scrollerEl && !me.scrollManager) {
                return me.scrollManager = new Ext.scroll.Manager({
                    owner: me,
                    el: scrollerEl,
                    direction: scrollFlags.both ? 'auto' : scrollFlags.y ? 'vertical' : 'horizontal'
                });
            }
        },

        /**
         * Applies padding, margin, border, top, left, height, and width configs to the
         * appropriate elements.
         * @private
         */
        initStyles: function(targetEl) {
            var me = this,
                margin = me.margin,
                border = me.border,
                cls = me.cls,
                style = me.style,
                x = me.x,
                y = me.y,
                liquidLayout = me.liquidLayout,
                width, height;

            me.initPadding(targetEl);

            if (margin != null) {
                targetEl.setStyle('margin', this.unitizeBox((margin === true) ? 5 : margin));
            }

            if (border != null) {
                me.setBorder(border, targetEl);
            }

            // initComponent, beforeRender, or event handlers may have set the style or cls property since the protoEl was set up
            // so we must apply styles and classes here too.
            if (cls && cls != me.initialCls) {
                targetEl.addCls(cls);
                me.cls = me.initialCls = null;
            }
            if (style && style != me.initialStyle) {
                targetEl.setStyle(style);
                me.style = me.initialStyle = null;
            }

            if (x != null) {
                targetEl.setStyle(me.horizontalPosProp, (typeof x == 'number') ? (x + 'px') : x);
            }
            if (y != null) {
                targetEl.setStyle('top', (typeof y == 'number') ? (y + 'px') : y);
            }

            if (!me.ownerCt || me.floating) {
                if (Ext.scopeCss) {
                    targetEl.addCls(me.rootCls);
                }
                targetEl.addCls(me.borderBoxCls);
            }

            // Framed components need their width/height to apply to the frame, which is
            // best handled in layout at present. The exception to this rule is component
            // that use liquidLayout and so cannot rely on the layout to set their size.
            if (liquidLayout || !me.getFrameInfo()) {
                width = me.width;
                height = me.height;

                // If we're using the content box model, we also cannot assign numeric initial sizes since we do not know the border widths to subtract
                if (width != null) {
                    if (typeof width === 'number') {
                        targetEl.setStyle('width', width + 'px');
                    } else {
                        targetEl.setStyle('width', width);
                    }
                }
                if (height != null) {
                    if (typeof height === 'number') {
                        targetEl.setStyle('height', height + 'px');
                    } else {
                        targetEl.setStyle('height', height);
                    }
                }
            }

            if (liquidLayout) {
                if (me.minWidth) {
                    targetEl.setStyle('min-width', me.minWidth + 'px');
                }

                if (me.minHeight) {
                    targetEl.setStyle('min-height', me.minHeight + 'px');
                }

                if (me.maxWidth) {
                    targetEl.setStyle('max-width', me.maxWidth + 'px');
                }

                if (me.maxHeight) {
                    targetEl.setStyle('max-height', me.maxHeight + 'px');
                }
            }
        },

        // Utility method to determine if a Component is floating, and has an owning Container whose coordinate system
        // it must be positioned in when using setPosition.
        isContainedFloater: function() {
            return (this.floating && this.floatParent);
        },

        isDescendant: function(ancestor) {
            if (ancestor.isContainer) {
                for (var c = this.ownerCt; c; c = c.ownerCt) {
                    if (c === ancestor) {
                        return true;
                    }
                }
            }
            return false;
        },

        // @private
        makeFloating: function (dom) {
            this.mixins.floating.constructor.call(this, dom);
        },

        /**
         * @private
         * Returns `true` if the passed element is within the container tree of this component.
         *
         * For example if a menu's submenu contains an {@link Ext.form.field.Date}, that top level
         * menu owns the elements of the date picker. Using this method, you can tell if an event took place
         * within a certain component tree.
         */
        owns: function(element) {
            var result = false;
            Ext.ComponentQuery.visitPreOrder('', this, function(c) {
                if (c.el && c.el.contains(element)) {
                    result = true;
                    return false;
                }
            });
            return result;
        },

        parseBox: function(box) {
            return Ext.Element.parseBox(box);
        },

        /**
         * @private
         * Implementation which updates the scroll range of a touch scroller.
         * Subclasses may change implementation.
         */
        refreshScroll: function() {
            var scrollManager = this.scrollManager;

            if (scrollManager) {
                scrollManager.refresh();
            }
        },

        removeManagedListenerItem: function(isClear, managedListener, item, ename, fn, scope){
            var me = this,
                element = managedListener.options ? managedListener.options.element : null;

            if (element) {
                element = me[element];
                if (element && element.un) {
                    if (isClear || (managedListener.item === item && managedListener.ename === ename && (!fn || managedListener.fn === fn) && (!scope || managedListener.scope === scope))) {
                        element.un(managedListener.ename, managedListener.fn, managedListener.scope);
                        if (!isClear) {
                            Ext.Array.remove(me.managedListeners, managedListener);
                        }
                    }
                }
            } else {
                return me.mixins.observable.removeManagedListenerItem.apply(me, arguments);
            }
        },

        removeOverCls: function() {
            this.el.removeCls(this.overCls);
        },

        removePlugin: function(plugin) {
            Ext.Array.remove(this.plugins, plugin);
            plugin.destroy();
        },

        /**
         * Method which removes a specified UI from the components element.
         * @private
         */
        removeUIFromElement: function() {
            var me = this,
                baseClsUI = me.baseCls + '-' + me.ui,
                childEls, childElName, el, suffix;

            me.removeCls(baseClsUI);

            if (me.rendered && me.frame && !Ext.supports.CSS3BorderRadius) {
                // Loop through each frame element, and if they are defined remove the ui:
                baseClsUI += '-';
                childEls = me.getChildEls();

                for (childElName in childEls) {
                    suffix = childEls[childElName].frame;
                    if (suffix && suffix !== true) {
                        el = me[childElName];
                        if (el) {
                            el.removeCls(baseClsUI + suffix);
                        }
                    }
                }
            }
        },

        // private
        setComponentLayout: function(layout) {
            var currentLayout = this.componentLayout;
            if (currentLayout && currentLayout.isLayout && currentLayout != layout) {
                currentLayout.setOwner(null);
            }
            this.componentLayout = layout;
            layout.setOwner(this);
        },

        setHiddenState: function (hidden) {
            var inheritedState = this.getInherited();

            this.hidden = hidden;

            if (hidden) {
                inheritedState.hidden = true;
            } else {
                delete inheritedState.hidden;
            }
        },

        setupProtoEl: function() {
            var cls = this.initCls();

            this.protoEl.addCls(cls);
        },

        // private - hook for rtl override
        setScrollLeft: function(left) {
            this.getOverflowEl().setScrollLeft(left);
        },

        wrapPrimaryEl: function (dom) {
            if (this.floating) {
                this.makeFloating(dom);
            } else {
                this.el = Ext.get(dom);
            }
        }
    }, // private

    deprecated: {
        5: {
            methods: {
                /**
                 * @method addClass
                 * @inheritdoc Ext.Component#addCls
                 * @deprecated 4.1 Use {@link #addCls} instead.
                 * @since 2.3.0
                 */
                addClass: 'addCls',

                /**
                 * This method needs to be called whenever you change something on this component that
                 * requires the Component's layout to be recalculated.
                 * @return {Ext.Component} this
                 * @deprecated 4.1 Use {@link #updateLayout} instead.
                 */
                doComponentLayout: function() {
                    this.updateLayout();
                    return this;
                },

                /**
                 * @method removeClass
                 * @inheritdoc Ext.Component#removeCls
                 * @deprecated 4.1 Use {@link #addCls} instead.
                 * @since 2.3.0
                 */
                removeClass: 'removeCls',

                /**
                 * @method forceComponentLayout
                 * @inheritdoc Ext.Component#updateLayout
                 * @deprecated 4.1 Use {@link #updateLayout} instead.
                 */
                forceComponentLayout: 'updateLayout',

                /**
                 * @method setDocked
                 * @inheritdoc Ext.Component#setDock
                 * @deprecated 5.0 Use {@link #setDock} instead.
                 */
                setDocked: 'setDock'
            }
        }
    }
}, function(Component) {

    Component.createAlias({
        on: 'addListener',
        prev: 'previousSibling',
        next: 'nextSibling'
    });

    /**
     * @method
     * @inheritdoc Ext.Component#static-resumeLayouts
     * @member Ext
     */
    Ext.resumeLayouts = function (flush) {
        Component.resumeLayouts(flush);
    };

    /**
     * @method
     * @inheritdoc Ext.Component#static-suspendLayouts
     * @member Ext
     */
    Ext.suspendLayouts = function () {
        Component.suspendLayouts();
    };

    /**
     * Utility wrapper that suspends layouts of all components for the duration of a given
     * function.
     * @param {Function} fn The function to execute.
     * @param {Object} [scope] The scope (`this` reference) in which the specified function
     * is executed.
     * @member Ext
     */
    Ext.batchLayouts = function(fn, scope) {
        Component.suspendLayouts();
        // Invoke the function
        fn.call(scope);
        Component.resumeLayouts(true);
    };

    /**
     * Sets the default font-family to use for components that support a `glyph` config.
     * @param {String} fontFamily The name of the font-family
     * @member Ext
     */
    Ext.setGlyphFontFamily = function (fontFamily) {
        Ext._glyphFontFamily = fontFamily;
    };

    // These are legacy names which are now subsumed by Ext.GlobalEvents
    Component.hierarchyEventSource = Component.prototype.hierarchyEventSource =
        Ext.GlobalEvents;
});



/* TODO
 *
 * ## Child Sessions
 *
 * By default, sessions created in child components are called "child sessions".
 * All data and edits are copied from the parent session in to the child session.
 * These changes can be written back to the parent session much like a session
 * can save its data to a server.
 *
 *      Ext.create({
 *          xtype: 'window',
 *          modal: true,
 *
 *          // Creates a new session for this Window but that session is linked
 *          // to a parent session (probably from the application's Viewport).
 *          //
 *          session: true,
 *
 *          items: [{
 *              ...
 *          },{
 *              xtype: 'button',
 *              text: 'OK',
 *              listeners: {
 *                  click: function () {
 *                      // Get the Session this component has inherited (from
 *                      // the Window) and save it back to the parent session.
 *                      //
 *                      this.lookupSession().save();
 *                  }
 *              }
 *          }]
 *      });
 *
 * ### Isolated Sessions
 *
 * This connection of a child session to its parent session is determined by the
 * `{@link Ext.data.Session#isolated isolated}` config. If `isolated` is
 * set to `true` then this session will not copy anything from a higher level
 * session and will instead do its own communication with the server.
 *
 *      Ext.create({
 *          xtype: 'window',
 *          modal: true,
 *
 *          // Creates a new session for this Window that is isolated from any
 *          // other sessions. All data for this session will be fetched from
 *          // the server and ultimately saved back to the server.
 *          //
 *          session: {
 *              isolated: true
 *          },
 *
 *          items: [{
 *              ...
 *          },{
 *              xtype: 'button',
 *              text: 'OK',
 *              listeners: {
 *                  click: function () {
 *                      // Get the Session this component has inherited (from
 *                      // the Window) and save it back to the server.
 *                      //
 *                      this.lookupSession().save();
 *                  }
 *              }
 *          }]
 *      });
 */
