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
 * Panel is a container that has specific functionality and structural components that make it the perfect building
 * block for application-oriented user interfaces.
 *
 * Panels are, by virtue of their inheritance from {@link Ext.container.Container}, capable of being configured with a
 * {@link Ext.container.Container#layout layout}, and containing child Components.
 *
 * When either specifying child {@link #cfg-items} of a Panel, or dynamically {@link Ext.container.Container#method-add adding}
 * Components to a Panel, remember to consider how you wish the Panel to arrange those child elements, and whether those
 * child elements need to be sized using one of Ext's built-in `{@link Ext.container.Container#layout layout}`
 * schemes. By default, Panels use the {@link Ext.layout.container.Auto Auto} scheme. This simply renders child
 * components, appending them one after the other inside the Container, and **does not apply any sizing** at all.
 *
 * {@img Ext.panel.Panel/panel.png Panel components}
 *
 * A Panel may also contain {@link #bbar bottom} and {@link #tbar top} toolbars, along with separate {@link
 * Ext.panel.Header header}, {@link #fbar footer} and body sections.
 *
 * Panel also provides built-in {@link #collapsible collapsible, expandable} and {@link #closable} behavior. Panels can
 * be easily dropped into any {@link Ext.container.Container Container} or layout, and the layout and rendering pipeline
 * is {@link Ext.container.Container#method-add completely managed by the framework}.
 *
 * **Note:** By default, the `{@link #closable close}` header tool _destroys_ the Panel resulting in removal of the
 * Panel and the destruction of any descendant Components. This makes the Panel object, and all its descendants
 * **unusable**. To enable the close tool to simply _hide_ a Panel for later re-use, configure the Panel with
 * `{@link #closeAction closeAction}: 'hide'`.
 *
 * Usually, Panels are used as constituents within an application, in which case, they would be used as child items of
 * Containers, and would themselves use Ext.Components as child {@link #cfg-items}. However to illustrate simply rendering a
 * Panel into the document, here's how to do it:
 *
 *     @example
 *     Ext.create('Ext.panel.Panel', {
 *         title: 'Hello',
 *         width: 200,
 *         html: '<p>World!</p>',
 *         renderTo: Ext.getBody()
 *     });
 *
 * A more realistic scenario is a Panel created to house input fields which will not be rendered, but used as a
 * constituent part of a Container:
 *
 *     @example
 *     var filterPanel = Ext.create('Ext.panel.Panel', {
 *         bodyPadding: 5,  // Don't want content to crunch against the borders
 *         width: 300,
 *         title: 'Filters',
 *         items: [{
 *             xtype: 'datefield',
 *             fieldLabel: 'Start date'
 *         }, {
 *             xtype: 'datefield',
 *             fieldLabel: 'End date'
 *         }],
 *         renderTo: Ext.getBody()
 *     });
 *
 * Note that the Panel above is configured to render into the document and assigned a size. In a real world scenario,
 * the Panel will often be added inside a Container which will use a {@link #layout} to render, size and position its
 * child Components.
 *
 * Panels will often use specific {@link #layout}s to provide an application with shape and structure by containing and
 * arranging child Components:
 *
 *     @example
 *     var resultsPanel = Ext.create('Ext.panel.Panel', {
 *         title: 'Results',
 *         width: 600,
 *         height: 400,
 *         renderTo: Ext.getBody(),
 *         layout: {
 *             type: 'vbox',       // Arrange child items vertically
 *             align: 'stretch',    // Each takes up full width
 *             padding: 5
 *         },
 *         items: [{               // Results grid specified as a config object with an xtype of 'grid'
 *             xtype: 'grid',
 *             columns: [{header: 'Column One'}],            // One header just for show. There's no data,
 *             store: Ext.create('Ext.data.ArrayStore', {}), // A dummy empty data store
 *             flex: 1                                       // Use 1/3 of Container's height (hint to Box layout)
 *         }, {
 *             xtype: 'splitter'   // A splitter between the two child items
 *         }, {                    // Details Panel specified as a config object (no xtype defaults to 'panel').
 *             title: 'Details',
 *             bodyPadding: 5,
 *             items: [{
 *                 fieldLabel: 'Data item',
 *                 xtype: 'textfield'
 *             }], // An array of form fields
 *             flex: 2             // Use 2/3 of Container's height (hint to Box layout)
 *         }]
 *     });
 *
 * The example illustrates one possible method of displaying search results. The Panel contains a grid with the
 * resulting data arranged in rows. Each selected row may be displayed in detail in the Panel below. The {@link
 * Ext.layout.container.VBox vbox} layout is used to arrange the two vertically. It is configured to stretch child items
 * horizontally to full width. Child items may either be configured with a numeric height, or with a `flex` value to
 * distribute available space proportionately.
 *
 * This Panel itself may be a child item of, for exaple, a {@link Ext.tab.Panel} which will size its child items to fit
 * within its content area.
 *
 * Using these techniques, as long as the **layout** is chosen and configured correctly, an application may have any
 * level of nested containment, all dynamically sized according to configuration, the user's preference and available
 * browser size.
 */
Ext.define('Ext.panel.Panel', {
    extend: 'Ext.panel.AbstractPanel',
    requires: [
        'Ext.panel.Header',
        'Ext.fx.Anim',
        'Ext.util.KeyMap',
        'Ext.panel.DD',
        'Ext.XTemplate',
        'Ext.layout.component.Dock',
        'Ext.util.Memento'
    ],
    alias: 'widget.panel',
    alternateClassName: 'Ext.Panel',

    /**
     * @cfg {String} collapsedCls
     * A CSS class to add to the panel's element after it has been collapsed.
     */
    collapsedCls: 'collapsed',

    /**
     * @cfg {Boolean} animCollapse
     * `true` to animate the transition when the panel is collapsed, `false` to skip the animation (defaults to `true`
     * if the {@link Ext.fx.Anim} class is available, otherwise `false`). May also be specified as the animation
     * duration in milliseconds.
     */
    animCollapse: Ext.enableFx,

    /**
     * @cfg {Number} minButtonWidth
     * Minimum width of all footer toolbar buttons in pixels. If set, this will be used as the default
     * value for the {@link Ext.button.Button#minWidth} config of each Button added to the **footer toolbar** via the
     * {@link #fbar} or {@link #buttons} configurations. It will be ignored for buttons that have a minWidth configured
     * some other way, e.g. in their own config object or via the {@link Ext.container.Container#defaults defaults} of
     * their parent container.
     */
    minButtonWidth: 75,

    /**
     * @cfg {Boolean} collapsed
     * `true` to render the panel collapsed, `false` to render it expanded.
     */
    collapsed: false,

    /**
     * @cfg {Boolean} collapseFirst
     * `true` to make sure the collapse/expand toggle button always renders first (to the left of) any other tools in
     * the panel's title bar, `false` to render it last.
     */
    collapseFirst: true,

    /**
     * @cfg {Boolean} hideCollapseTool
     * `true` to hide the expand/collapse toggle button when `{@link #collapsible} == true`, `false` to display it.
     */
    hideCollapseTool: false,

    /**
     * @cfg {Boolean} titleCollapse
     * `true` to allow expanding and collapsing the panel (when `{@link #collapsible} = true`) by clicking anywhere in
     * the header bar, `false`) to allow it only by clicking to tool button). When a panel is used in a 
     * {@link Ext.layout.container.Border border layout}, the {@link #floatable} option can influence the behavior of collapsing.
     */
    titleCollapse: undefined,

    /**
     * @cfg {String} collapseMode
     * **Important: this config is only effective for {@link #collapsible} Panels which are direct child items of a
     * {@link Ext.layout.container.Border border layout}.**
     *
     * When _not_ a direct child item of a {@link Ext.layout.container.Border border layout}, then the Panel's header
     * remains visible, and the body is collapsed to zero dimensions. If the Panel has no header, then a new header
     * (orientated correctly depending on the {@link #collapseDirection}) will be inserted to show a the title and a re-
     * expand tool.
     *
     * When a child item of a {@link Ext.layout.container.Border border layout}, this config has three possible values:
     *
     * - `undefined` - When collapsed, a placeholder {@link Ext.panel.Header Header} is injected into the layout to
     *   represent the Panel and to provide a UI with a Tool to allow the user to re-expand the Panel.
     *
     * - `"header"` - The Panel collapses to leave its header visible as when not inside a
     *   {@link Ext.layout.container.Border border layout}.
     *
     * - `"mini"` - The Panel collapses without a visible header.
     */

    /**
     * @cfg {Ext.Component/Object} placeholder
     * **Important: This config is only effective for {@link #collapsible} Panels which are direct child items of a
     * {@link Ext.layout.container.Border border layout} when not using the `'header'` {@link #collapseMode}.**
     *
     * **Optional.** A Component (or config object for a Component) to show in place of this Panel when this Panel is
     * collapsed by a {@link Ext.layout.container.Border border layout}. Defaults to a generated {@link Ext.panel.Header
     * Header} containing a {@link Ext.panel.Tool Tool} to re-expand the Panel.
     */

    /**
     * @cfg {Boolean} floatable
     * **Important: This config is only effective for {@link #collapsible} Panels which are direct child items of a
     * {@link Ext.layout.container.Border border layout}.**
     *
     * true to allow clicking a collapsed Panel's {@link #placeholder} to display the Panel floated above the layout,
     * false to force the user to fully expand a collapsed region by clicking the expand button to see it again.
     */
    floatable: true,

    /**
     * @cfg {Boolean} overlapHeader
     * True to overlap the header in a panel over the framing of the panel itself. This is needed when frame:true (and
     * is done automatically for you). Otherwise it is undefined. If you manually add rounded corners to a panel header
     * which does not have frame:true, this will need to be set to true.
     */

    /**
     * @cfg {Boolean} collapsible
     * True to make the panel collapsible and have an expand/collapse toggle Tool added into the header tool button
     * area. False to keep the panel sized either statically, or by an owning layout manager, with no toggle Tool.
     * When a panel is used in a {@link Ext.layout.container.Border border layout}, the {@link #floatable} option
     * can influence the behavior of collapsing.
     * See {@link #collapseMode} and {@link #collapseDirection}
     */
    collapsible: undefined,

    /**
     * @cfg {String} collapseDirection
     * The direction to collapse the Panel when the toggle button is clicked.
     *
     * Defaults to the {@link #headerPosition}
     *
     * **Important: This config is _ignored_ for {@link #collapsible} Panels which are direct child items of a {@link
     * Ext.layout.container.Border border layout}.**
     *
     * Specify as `'top'`, `'bottom'`, `'left'` or `'right'`.
     */

    /**
     * @cfg {Boolean} closable
     * True to display the 'close' tool button and allow the user to close the window, false to hide the button and
     * disallow closing the window.
     *
     * By default, when close is requested by clicking the close button in the header, the {@link #method-close} method will be
     * called. This will _{@link Ext.Component#method-destroy destroy}_ the Panel and its content meaning that it may not be
     * reused.
     *
     * To make closing a Panel _hide_ the Panel so that it may be reused, set {@link #closeAction} to 'hide'.
     */
    closable: false,

    /**
     * @cfg {String} closeAction
     * The action to take when the close header tool is clicked:
     *
     * - **`'{@link #method-destroy}'`** :
     *
     *   {@link #method-remove remove} the window from the DOM and {@link Ext.Component#method-destroy destroy} it and all descendant
     *   Components. The window will **not** be available to be redisplayed via the {@link #method-show} method.
     *
     * - **`'{@link #method-hide}'`** :
     *
     *   {@link #method-hide} the window by setting visibility to hidden and applying negative offsets. The window will be
     *   available to be redisplayed via the {@link #method-show} method.
     *
     * **Note:** This behavior has changed! setting *does* affect the {@link #method-close} method which will invoke the
     * approriate closeAction.
     */
    closeAction: 'destroy',

    /**
     * @cfg {Object/Object[]} dockedItems
     * A component or series of components to be added as docked items to this panel. The docked items can be docked to
     * either the top, right, left or bottom of a panel. This is typically used for things like toolbars or tab bars:
     *
     *     var panel = new Ext.panel.Panel({
     *         dockedItems: [{
     *             xtype: 'toolbar',
     *             dock: 'top',
     *             items: [{
     *                 text: 'Docked to the top'
     *             }]
     *         }]
     *     });
     */

    /**
     * @cfg {Number} placeholderCollapseHideMode
     * The {@link Ext.dom.Element#setVisibilityMode mode} for hiding collapsed panels when
     * using {@link #collapseMode} "placeholder".
     */
    placeholderCollapseHideMode: Ext.Element.VISIBILITY,

    /**
     * @cfg {Boolean} preventHeader
     * @deprecated 4.1.0 Use {@link #header} instead.
     * Prevent a Header from being created and shown.
     */
     preventHeader: false,

    /**
     * @cfg {Boolean/Object} [header]
     * Pass as `false` to prevent a Header from being created and shown.
     *
     * Pass as a config object (optionally containing an `xtype`) to custom-configure this Panel's header.
     *
     * See {@link Ext.panel.Header} for all the options that may be specified here.
     *
     * A {@link Ext.panel.Header panel header} is a {@link Ext.container.Container} which contains the Panel's {@link #title} and {@link #tools}.
     * You may also configure the Panel's `header` option with its own child items which go *before* the {@link #tools}
     *
     * By default the panel {@link #title} is inserted after items configured in this config, but before any tools.
     * To insert the title at any point in the full array, specify the {@link Ext.panel.Header #titlePosition} config:
     *
     *    new Ext.panel.Panel({
     *        title: 'Test',
     *        tools: [{
     *            type: 'refresh
     *        }, {
     *            type: 'help'
     *        }],
     *        titlePosition: 2 // Title will come AFTER the two tools
     *        ...
     *    });
     *
     */
    header: undefined,

    /**
     * @cfg {String} headerPosition
     * Specify as `'top'`, `'bottom'`, `'left'` or `'right'`.
     */
    headerPosition: 'top',

    /**
     * @cfg {Boolean} frame
     * True to apply a frame to the panel.
     */
    frame: false,

    /**
     * @cfg {Boolean} frameHeader
     * True to apply a frame to the panel panels header (if 'frame' is true).
     */
    frameHeader: true,

    /**
     * @cfg {Object[]/Ext.panel.Tool[]} tools
     * An array of {@link Ext.panel.Tool} configs/instances to be added to the header tool area. The tools are stored as
     * child components of the header container. They can be accessed using {@link #down} and {#query}, as well as the
     * other component methods. The toggle tool is automatically created if {@link #collapsible} is set to true.
     *
     * Note that, apart from the toggle tool which is provided when a panel is collapsible, these tools only provide the
     * visual button. Any required functionality must be provided by adding handlers that implement the necessary
     * behavior.
     *
     * Example usage:
     *
     *     tools:[{
     *         type:'refresh',
     *         tooltip: 'Refresh form Data',
     *         // hidden:true,
     *         handler: function(event, toolEl, panelHeader) {
     *             // refresh logic
     *         }
     *     },
     *     {
     *         type:'help',
     *         tooltip: 'Get Help',
     *         callback: function(panel, tool, event) {
     *             // show help here
     *         }
     *     }]
     * 
     * The difference between `handler` and `callback` is the signature. For details on
     * the distinction, see {@link Ext.panel.Tool}.
     */

    /**
     * @cfg {String} [title='']
     * The title text to be used to display in the {@link Ext.panel.Header panel header}. When a
     * `title` is specified the {@link Ext.panel.Header} will automatically be created and displayed unless
     * {@link #header} is set to `false`.
     */

    /**
     * @cfg {String} [titleAlign]
     * The alignment of the title text within the available space between the
     * icon and the tools. 
     * 
     * May be `"left"`, `"right"` or `"center"`. Defaults to the browser's natural
     * behavior depending on the css direction property - `"left"` when direction
     * is ltr and `"right"` when direction is rtl
     * (see {@link Ext.AbstractComponent#rtl}).
     */

    /**
     * @cfg {Boolean} [manageHeight=true] When true, the dock component layout writes
     * height information to the panel's DOM elements based on its shrink wrap height
     * calculation. This ensures that the browser respects the calculated height.
     * When false, the dock component layout will not write heights on the panel or its
     * body element. In some simple layout cases, not writing the heights to the DOM may
     * be desired because this allows the browser to respond to direct DOM manipulations
     * (like animations).
     */
    manageHeight: true,

    /**
     * @cfg {String} iconCls
     * CSS class for an icon in the header. Used for displaying an icon to the left of a title.
     */
    
    /**
     * @cfg {String} icon
     * Path to image for an icon in the header. Used for displaying an icon to the left of a title.
     */

    /**
     * @cfg {Number/String} glyph
     * @inheritdoc Ext.panel.Header#glyph
     */

    /**
     * @cfg {String} headerOverCls
     * Optional CSS class to apply to the header element on mouseover
     */

    /**
     * @override
     * @cfg {Boolean} constrain
     * True to constrain the panel within its containing element, false to allow it to fall outside of its containing
     * element. By default floating components such as Windows will be rendered to `document.body`. To render and constrain the window within
     * another element specify {@link #renderTo}. Optionally the header only can be constrained
     * using {@link #constrainHeader}.
     */
    constrain: false,

    /**
     * @cfg {Boolean} constrainHeader
     * True to constrain the panel header within its containing element (allowing the panel body to fall outside of
     * its containing element) or false to allow the header to fall outside its containing element.
     * Optionally the entire panel can be constrained using {@link #constrain}.
     */
    constrainHeader: false,

    /**
     * @cfg {Boolean} [simpleDrag=false]
     * When {@link #cfg-draggable} is `true`, Specify this as `true` to  cause the `draggable` config
     * to work the same as it does in {@link Ext.window.Window Window}. This Panel
     * just becomes movable. No DragDrop instances receive any notifications.
     * For example:
     *
     *     @example
     *     var win = Ext.create('widget.window', {
     *         height: 300,
     *         width: 300,
     *         title: 'Constraining Window',
     *         closable: false,
     *         items: {
     *             title: "Floating Panel",
     *             width: 100,
     *             height: 100,
     *             floating: true,
     *             draggable: true,
     *             constrain: true,
     *             simpleDrag: true
     *         }
     *     });
     *     win.show();
     *     // Floating components begin life hidden
     *     win.child('[title=Floating Panel]').show();
     * 
     */
    
    initComponent: function() {
        var me = this;

        me.addEvents(

            /**
             * @event beforeclose
             * Fires before the user closes the panel. Return false from any listener to stop the close event being
             * fired
             * @param {Ext.panel.Panel} panel The Panel object
             */
            'beforeclose',
            
            /**
             * @event close
             * Fires when the user closes the panel.
             * @param {Ext.panel.Panel} panel The Panel object
             */
            'close',

            /**
             * @event beforeexpand
             * Fires before this panel is expanded. Return false to prevent the expand.
             * @param {Ext.panel.Panel} p The Panel being expanded.
             * @param {Boolean} animate True if the expand is animated, else false.
             */
            "beforeexpand",

            /**
             * @event beforecollapse
             * Fires before this panel is collapsed. Return false to prevent the collapse.
             * @param {Ext.panel.Panel} p The Panel being collapsed.
             * @param {String} direction . The direction of the collapse. One of
             *
             *   - Ext.Component.DIRECTION_TOP
             *   - Ext.Component.DIRECTION_RIGHT
             *   - Ext.Component.DIRECTION_BOTTOM
             *   - Ext.Component.DIRECTION_LEFT
             *
             * @param {Boolean} animate True if the collapse is animated, else false.
             */
            "beforecollapse",

            /**
             * @event expand
             * Fires after this Panel has expanded.
             * @param {Ext.panel.Panel} p The Panel that has been expanded.
             */
            "expand",

            /**
             * @event collapse
             * Fires after this Panel has collapsed.
             * @param {Ext.panel.Panel} p The Panel that has been collapsed.
             */
            "collapse",

            /**
             * @event titlechange
             * Fires after the Panel title has been set or changed.
             * @param {Ext.panel.Panel} p the Panel which has been resized.
             * @param {String} newTitle The new title.
             * @param {String} oldTitle The previous panel title.
             */
            'titlechange',

            /**
             * @event iconchange
             * Fires after the Panel icon has been set or changed.
             * @param {Ext.panel.Panel} p The Panel which has the icon changed.
             * @param {String} newIcon The path to the new icon image.
             * @param {String} oldIcon The path to the previous panel icon image.
             */
            'iconchange',
            
            /**
             * @event iconclschange
             * Fires after the Panel iconCls has been set or changed.
             * @param {Ext.panel.Panel} p The Panel which has the iconCls changed.
             * @param {String} newIconCls The new iconCls.
             * @param {String} oldIconCls The previous panel iconCls.
             */
            'iconclschange',

            /**
             * @event glyphchange
             * Fired when the Panel glyph has been changed by the {@link #setGlyph} method.
             * @param {Ext.panel.Panel} this
             * @param {Number/String} newGlyph
             * @param {Number/String} oldGlyph
             */
            'glyphchange',

            /**
             * @event float
             * Fires after a collapsed Panel has been "floated" by clicking on
             * it's header. Only applicable when the Panel is an item in a
             * {@link Ext.layout.container.Border Border Layout}.
             */
            'float',

            /**
             * @event unfloat
             * Fires after a "floated" Panel has returned to it's collapsed state
             * as a result of the mouse leaving the Panel. Only applicable when
             * the Panel is an item in a
             * {@link Ext.layout.container.Border Border Layout}.
             */
            'unfloat'
        );

        if (me.collapsible) {
        // Save state on these two events.
            this.addStateEvents(['expand', 'collapse']);
        }
        if (me.unstyled) {
            me.setUI('plain');
        }

        if (me.frame) {
            me.setUI(me.ui + '-framed');
        }

        // Backwards compatibility
        me.bridgeToolbars();

        me.callParent();
        me.collapseDirection = me.collapseDirection || me.headerPosition || Ext.Component.DIRECTION_TOP;

        // Used to track hidden content elements during collapsed state
        me.hiddenOnCollapse = new Ext.dom.CompositeElement();

    },

    beforeDestroy: function() {
        var me = this;
        Ext.destroy(
            me.placeholder,
            me.ghostPanel,
            me.dd
        );
        me.callParent();
    },

    initAria: function() {
        this.callParent();
        this.initHeaderAria();
    },

    getFocusEl: function() {
        return  this.el;
    },

    initHeaderAria: function() {
        var me = this,
            el = me.el,
            header = me.header;
        if (el && header) {
            el.dom.setAttribute('aria-labelledby', header.titleCmp.id);
        }
    },

    /**
     * Gets the {@link Ext.panel.Header Header} for this panel.
     */
    getHeader: function() {
        return this.header;
    },

    /**
     * Set a title for the panel's header. See {@link Ext.panel.Header#title}.
     * @param {String} newTitle
     */
    setTitle: function(newTitle) {
        var me = this,
            oldTitle = me.title,
            header = me.header,
            reExpander = me.reExpander,
            placeholder = me.placeholder;

        me.title = newTitle;

        if (header) {
            if (header.isHeader) {
                header.setTitle(newTitle);
            } else {
                header.title = newTitle;
            }
        } else if (me.rendered) {
            me.updateHeader();
        }

        if (reExpander) {
            reExpander.setTitle(newTitle);
        }

        if (placeholder && placeholder.setTitle) {
            placeholder.setTitle(newTitle);
        }

        me.fireEvent('titlechange', me, newTitle, oldTitle);
    },

    /**
     * Set the iconCls for the panel's header. See {@link Ext.panel.Header#iconCls}. It will fire the
     * {@link #iconclschange} event after completion.
     * @param {String} newIconCls The new CSS class name
     */
    setIconCls: function(newIconCls) {
        var me = this,
            oldIconCls = me.iconCls,
            header = me.header,
            placeholder = me.placeholder;

        me.iconCls = newIconCls;

        if (header) {
            if (header.isHeader) {
                header.setIconCls(newIconCls);
            } else {
                header.iconCls = newIconCls;
            }
        } else {
            me.updateHeader();
        }

        if (placeholder && placeholder.setIconCls) {
            placeholder.setIconCls(newIconCls);
        }

        me.fireEvent('iconclschange', me, newIconCls, oldIconCls);
    },
    
    /**
     * Set the icon for the panel's header. See {@link Ext.panel.Header#icon}. It will fire the
     * {@link #iconchange} event after completion.
     * @param {String} newIcon The new icon path
     */
    setIcon: function(newIcon) {
        var me = this,
            oldIcon = me.icon,
            header = me.header,
            placeholder = me.placeholder;

        me.icon = newIcon;

        if (header) {
            if (header.isHeader) {
                header.setIcon(newIcon);
            } else {
                header.icon = newIcon;
            }
        } else {
            me.updateHeader();
        }

        if (placeholder && placeholder.setIcon) {
            placeholder.setIcon(newIcon);
        }

        me.fireEvent('iconchange', me, newIcon, oldIcon);
    },

    /**
     * Set the glyph for the panel's header. See {@link Ext.panel.Header#glyph}. It will
     * fire the {@link #glyphchange} event after completion.
     * @param {Number/String} newGlyph The new glyph
     * This parameter expects a format consistent with that of {@link #glyph}
     */
    setGlyph: function(newGlyph) {
        var me = this,
            oldGlyph = me.glyph,
            header = me.header,
            placeholder = me.placeholder;

        me.glyph = newGlyph;

        if (header) {
            if (header.isHeader) {
                header.setGlyph(newGlyph);
            } else {
                header.glyph = newGlyph;
            }
        } else {
            me.updateHeader();
        }

        if (placeholder && placeholder.setGlyph) {
            placeholder.setIcon(newGlyph);
        }

        me.fireEvent('glyphchange', me, newGlyph, oldGlyph);
    },

    bridgeToolbars: function() {
        var me = this,
            docked = [],
            fbar,
            fbarDefaults,
            minButtonWidth = me.minButtonWidth;

        function initToolbar (toolbar, pos, useButtonAlign) {
            if (Ext.isArray(toolbar)) {
                toolbar = {
                    xtype: 'toolbar',
                    items: toolbar
                };
            }
            else if (!toolbar.xtype) {
                toolbar.xtype = 'toolbar';
            }
            toolbar.dock = pos;
            if (pos == 'left' || pos == 'right') {
                toolbar.vertical = true;
            }

            // Legacy support for buttonAlign (only used by buttons/fbar)
            if (useButtonAlign) {
                toolbar.layout = Ext.applyIf(toolbar.layout || {}, {
                    // default to 'end' (right-aligned) if me.buttonAlign is undefined or invalid
                    pack: { left:'start', center:'center' }[me.buttonAlign] || 'end'
                });
            }
            return toolbar;
        }

        // Short-hand toolbars (tbar, bbar and fbar plus new lbar and rbar):

        /**
         * @cfg {String} buttonAlign
         * The alignment of any buttons added to this panel. Valid values are 'right', 'left' and 'center' (defaults to
         * 'right' for buttons/fbar, 'left' for other toolbar types).
         *
         * **NOTE:** The prefered way to specify toolbars is to use the dockedItems config. Instead of buttonAlign you
         * would add the layout: { pack: 'start' | 'center' | 'end' } option to the dockedItem config.
         */

        /**
         * @cfg {Object/Object[]} tbar
         * Convenience config. Short for 'Top Bar'.
         *
         *     tbar: [
         *       { xtype: 'button', text: 'Button 1' }
         *     ]
         *
         * is equivalent to
         *
         *     dockedItems: [{
         *         xtype: 'toolbar',
         *         dock: 'top',
         *         items: [
         *             { xtype: 'button', text: 'Button 1' }
         *         ]
         *     }]
         */
        if (me.tbar) {
            docked.push(initToolbar(me.tbar, 'top'));
            me.tbar = null;
        }

        /**
         * @cfg {Object/Object[]} bbar
         * Convenience config. Short for 'Bottom Bar'.
         *
         *     bbar: [
         *       { xtype: 'button', text: 'Button 1' }
         *     ]
         *
         * is equivalent to
         *
         *     dockedItems: [{
         *         xtype: 'toolbar',
         *         dock: 'bottom',
         *         items: [
         *             { xtype: 'button', text: 'Button 1' }
         *         ]
         *     }]
         */
        if (me.bbar) {
            docked.push(initToolbar(me.bbar, 'bottom'));
            me.bbar = null;
        }

        /**
         * @cfg {Object/Object[]} buttons
         * Convenience config used for adding buttons docked to the bottom of the panel. This is a
         * synonym for the {@link #fbar} config.
         *
         *     buttons: [
         *       { text: 'Button 1' }
         *     ]
         *
         * is equivalent to
         *
         *     dockedItems: [{
         *         xtype: 'toolbar',
         *         dock: 'bottom',
         *         ui: 'footer',
         *         defaults: {minWidth: {@link #minButtonWidth}},
         *         items: [
         *             { xtype: 'component', flex: 1 },
         *             { xtype: 'button', text: 'Button 1' }
         *         ]
         *     }]
         *
         * The {@link #minButtonWidth} is used as the default {@link Ext.button.Button#minWidth minWidth} for
         * each of the buttons in the buttons toolbar.
         */
        if (me.buttons) {
            me.fbar = me.buttons;
            me.buttons = null;
        }

        /**
         * @cfg {Object/Object[]} fbar
         * Convenience config used for adding items to the bottom of the panel. Short for Footer Bar.
         *
         *     fbar: [
         *       { type: 'button', text: 'Button 1' }
         *     ]
         *
         * is equivalent to
         *
         *     dockedItems: [{
         *         xtype: 'toolbar',
         *         dock: 'bottom',
         *         ui: 'footer',
         *         defaults: {minWidth: {@link #minButtonWidth}},
         *         items: [
         *             { xtype: 'component', flex: 1 },
         *             { xtype: 'button', text: 'Button 1' }
         *         ]
         *     }]
         *
         * The {@link #minButtonWidth} is used as the default {@link Ext.button.Button#minWidth minWidth} for
         * each of the buttons in the fbar.
         */
        if (me.fbar) {
            fbar = initToolbar(me.fbar, 'bottom', true); // only we useButtonAlign
            fbar.ui = 'footer';

            // Apply the minButtonWidth config to buttons in the toolbar
            if (minButtonWidth) {
                fbarDefaults = fbar.defaults;
                fbar.defaults = function(config) {
                    var defaults = fbarDefaults || {};
                    if ((!config.xtype || config.xtype === 'button' || (config.isComponent && config.isXType('button'))) &&
                            !('minWidth' in defaults)) {
                        defaults = Ext.apply({minWidth: minButtonWidth}, defaults);
                    }
                    return defaults;
                };
            }

            docked.push(fbar);
            me.fbar = null;
        }

        /**
         * @cfg {Object/Object[]} lbar
         * Convenience config. Short for 'Left Bar' (left-docked, vertical toolbar).
         *
         *     lbar: [
         *       { xtype: 'button', text: 'Button 1' }
         *     ]
         *
         * is equivalent to
         *
         *     dockedItems: [{
         *         xtype: 'toolbar',
         *         dock: 'left',
         *         items: [
         *             { xtype: 'button', text: 'Button 1' }
         *         ]
         *     }]
         */
        if (me.lbar) {
            docked.push(initToolbar(me.lbar, 'left'));
            me.lbar = null;
        }

        /**
         * @cfg {Object/Object[]} rbar
         * Convenience config. Short for 'Right Bar' (right-docked, vertical toolbar).
         *
         *     rbar: [
         *       { xtype: 'button', text: 'Button 1' }
         *     ]
         *
         * is equivalent to
         *
         *     dockedItems: [{
         *         xtype: 'toolbar',
         *         dock: 'right',
         *         items: [
         *             { xtype: 'button', text: 'Button 1' }
         *         ]
         *     }]
         */
        if (me.rbar) {
            docked.push(initToolbar(me.rbar, 'right'));
            me.rbar = null;
        }

        if (me.dockedItems) {
            if (!Ext.isArray(me.dockedItems)) {
                me.dockedItems = [me.dockedItems];
            }
            me.dockedItems = me.dockedItems.concat(docked);
        } else {
            me.dockedItems = docked;
        }
    },

    isPlaceHolderCollapse: function(){
        return this.collapseMode == 'placeholder';
    },

    onBoxReady: function(){
        this.callParent();
        if (this.collapsed) {
            this.setHiddenDocked();
        }    
    },

    beforeRender: function() {
        var me = this,
            wasCollapsed;

        me.callParent();

        // Add class-specific header tools.
        // Panel adds collapsible and closable.
        me.initTools();

        // Dock the header/title unless we are configured specifically not to create a header
        if (!(me.preventHeader || (me.header === false))) {
            me.updateHeader();
        }

        // If we are rendering collapsed, we still need to save and modify various configs
        if (me.collapsed) {
            if (me.isPlaceHolderCollapse()) {
                if (!me.hidden) {
                    me.setHiddenState(true);

                    // This will insert the placeholder Component into the ownerCt's child collection
                    // Its getRenderTree call which is calling this will then iterate again and
                    // recreate the child items array to include the new Component. Prevent the first
                    // collapse from firing
                    me.preventCollapseFire = true;
                    me.placeholderCollapse();
                    delete me.preventCollapseFire;
                    wasCollapsed = me.collapsed;

                    // Temporarily clear the flag so that the header is rendered with a collapse tool in it.
                    // Placeholder collapse panels never really collapse, they just hide. The tool is always
                    // a collapse tool.
                    me.collapsed = false;
                }
            } else {
                me.beginCollapse();
                me.addClsWithUI(me.collapsedCls);
            }
        }

        // Restore the flag if we are being rendered initially placeholder collapsed.
        if (wasCollapsed) {
            me.collapsed = wasCollapsed;
        }
    },

    /**
     * @private
     * Tools are a Panel-specific capabilty.
     * Panel uses initTools. Subclasses may contribute tools by implementing addTools.
     */
    initTools: function() {
        var me = this,
            tools = me.tools,
            i, tool;

        me.tools = [];
        for (i = tools && tools.length; i; ) {
            --i;
            me.tools[i] = tool = tools[i];
            tool.toolOwner = me;
        }

        // Add a collapse tool unless configured to not show a collapse tool
        // or to not even show a header.
        if (me.collapsible && !(me.hideCollapseTool || me.header === false || me.preventHeader)) {
            me.collapseDirection = me.collapseDirection || me.headerPosition || 'top';
            me.collapseTool = me.expandTool = Ext.widget({
                xtype: 'tool',
                handler: me.toggleCollapse,
                scope: me
            });

            me.updateCollapseTool();
            // Prepend collapse tool is configured to do so.
            if (me.collapseFirst) {
                me.tools.unshift(me.collapseTool);
            }
        }

        // Add subclass-specific tools.
        me.addTools();

        // Make Panel closable.
        if (me.closable) {
            me.addClsWithUI('closable');
            me.addTool(Ext.widget({
                xtype : 'tool',
                type: 'close',
                handler: Ext.Function.bind(me.close, me, [])
            }));
        }

        // Append collapse tool if needed.
        if (me.collapseTool && !me.collapseFirst) {
            me.addTool(me.collapseTool);
        }
    },

    /**
     * @private
     * @template
     * Template method to be implemented in subclasses to add their tools after the collapsible tool.
     */
    addTools: Ext.emptyFn,

    updateCollapseTool: function () {
        var me = this,
            collapseTool = me.collapseTool;
    
        if (collapseTool) {
            if (me.collapsed && !me.isPlaceHolderCollapse()) {
                collapseTool.setType('expand-' + me.getOppositeDirection(me.collapseDirection));
            } else {
                collapseTool.setType('collapse-' + me.collapseDirection);
            }
        }
    },

    /**
     * Closes the Panel. By default, this method, removes it from the DOM, {@link Ext.Component#method-destroy destroy}s the
     * Panel object and all its descendant Components. The {@link #beforeclose beforeclose} event is fired before the
     * close happens and will cancel the close action if it returns false.
     *
     * **Note:** This method is also affected by the {@link #closeAction} setting. For more explicit control use
     * {@link #method-destroy} and {@link #method-hide} methods.
     */
    close: function() {
        if (this.fireEvent('beforeclose', this) !== false) {
            this.doClose();
        }
    },

    // @private
    doClose: function() {
        this.fireEvent('close', this);
        this[this.closeAction]();
    },

    /**
     * Create, hide, or show the header component as appropriate based on the current config.
     * @private
     * @param {Boolean} force True to force the header to be created
     */
    updateHeader: function(force) {
        var me = this,
            header = me.header,
            title = me.title,
            tools = me.tools,
            icon = me.icon || me.iconCls,
            vertical = me.headerPosition === 'left' || me.headerPosition === 'right';

        if (Ext.isObject(header) || (header !== false && (force || (title || icon) || (tools && tools.length) || (me.collapsible && !me.titleCollapse)))) {
            if (header && header.isHeader) {
                header.show();
            } else {
                // Apply the header property to the header config
                header = me.header = Ext.widget(Ext.apply({
                    xtype       : 'header',
                    title       : title,
                    titleAlign  : me.titleAlign,
                    orientation : vertical ? 'vertical' : 'horizontal',
                    dock        : me.headerPosition || 'top',
                    textCls     : me.headerTextCls,
                    iconCls     : me.iconCls,
                    icon        : me.icon,
                    glyph       : me.glyph,
                    baseCls     : me.baseCls + '-header',
                    tools       : tools,
                    ui          : me.ui,
                    id          : me.id + '_header',
                    overCls: me.headerOverCls,
                    indicateDrag: me.draggable,
                    frame       : (me.frame || me.alwaysFramed) && me.frameHeader,
                    ignoreParentFrame : me.frame || me.overlapHeader,
                    ignoreBorderManagement: me.frame || me.ignoreHeaderBorderManagement,
                    ownerCt     : me,
                    listeners   : me.collapsible && me.titleCollapse ? {
                        click: me.toggleCollapse,
                        scope: me
                    } : null
                }, me.header));
                // Header's onAdd mutates the tools array.
                // It replaces tool configs at each index with the instantiated tool
                // It also injects the tool instances as properties keyed by their type.
                me.addDocked(header, 0);
            }
            me.initHeaderAria();
        } else if (header) {
            header.hide();
        }
    },

    // @inheritdoc
    setUI: function(ui) {
        var me = this;

        me.callParent(arguments);

        if (me.header && me.header.rendered) {
            me.header.setUI(ui);
        }
    },

    // @private
    getDefaultContentTarget: function() {
        return this.body;
    },

    getTargetEl: function() {
        var me = this;
        return me.body || me.protoBody || me.frameBody || me.el;
    },

    // the overrides below allow for collapsed regions inside the border layout to be hidden

    // @inheritdoc
    isVisible: function(deep){
        var me = this;
        if (me.collapsed && me.placeholder) {
            return me.placeholder.isVisible(deep);
        }
        return me.callParent(arguments);
    },

    // @inheritdoc
    onHide: function() {
        var me = this;
        if (me.collapsed && me.placeholder) {
            me.placeholder.hide();
        } else {
            me.callParent(arguments);
        }
    },

    // @inheritdoc
    onShow: function() {
        var me = this;
        if (me.collapsed && me.isPlaceHolderCollapse()) {
            // force hidden back to true, since this gets set by the layout
            me.setHiddenState(true);
            me.placeholderCollapse();
        } else {
            me.callParent(arguments);
        }
    },

    onRemoved: function(destroying) {
        var me = this;

        // If we are removed but not being destroyed, ensure our placeholder is also removed but not destroyed
        // If we are being destroyed, our destroy processing will destroy the placeholder.
        // Must run before callParent because that breaks the ownerCt link
        if (me.placeholder && !destroying) {
            me.ownerCt.remove(me.placeholder, false);
        }

        me.callParent(arguments);
    },

    /**
     * Add tools to this panel
     * @param {Object[]/Ext.panel.Tool[]} tools The tools to add
     */
    addTool: function(tools) {
        if (!Ext.isArray(tools)) {
            tools = [tools];
        }

        var me     = this,
            header = me.header,
            t,
            tLen   = tools.length,
            tool;

        for (t = 0; t < tLen; t++) {
            tool = tools[t];
            tool.toolOwner = me;
            
            if (header && header.isHeader) {
                header.addTool(tool);
            } else {
                // only modify the tools array if the header isn't created,
                // otherwise, defer to the header to manage
                me.tools.push(tool);
            }
        }

        me.updateHeader();
    },

    getOppositeDirection: function(d) {
        var c = Ext.Component;
        switch (d) {
            case c.DIRECTION_TOP:
                return c.DIRECTION_BOTTOM;
            case c.DIRECTION_RIGHT:
                return c.DIRECTION_LEFT;
            case c.DIRECTION_BOTTOM:
                return c.DIRECTION_TOP;
            case c.DIRECTION_LEFT:
                return c.DIRECTION_RIGHT;
        }
    },

    getWidthAuthority: function() {
        if (this.collapsed && this.collapsedHorizontal()) {
            return 1; // the panel determine's its own width
        }

        return this.callParent();
    },

    getHeightAuthority: function() {
        if (this.collapsed && this.collapsedVertical()) {
            return 1; // the panel determine's its own height
        }

        return this.callParent();
    },

    collapsedHorizontal: function () {
        var dir = this.getCollapsed();
        return dir === 'left' || dir === 'right';
    },

    collapsedVertical: function () {
        var dir = this.getCollapsed();
        return dir === 'top' || dir === 'bottom';
    },

    restoreDimension: function(){
        var dir = this.collapseDirection;
        // If we're collapsing top/bottom, we want to restore the height
        // If we're collapsing left/right, we want to restore the width
        return (dir === 'top' || dir === 'bottom') ? 'height' : 'width';    
    },

    /**
     * Returns the current collapsed state of the panel.
     * @return {Boolean/String} False when not collapsed, otherwise the value of {@link #collapseDirection}.
     */
    getCollapsed: function() {
        var me = this;
        // The collapsed flag, when the Panel is collapsed acts as the direction in which the collapse took
        // place. It can still be tested as truthy/falsy if only a truth value is required.
        if (me.collapsed === true) {
            return me.collapseDirection;
        }
        return me.collapsed;
    },

    getState: function() {
        var me = this,
            state = me.callParent(),
            memento;

        state = me.addPropertyToState(state, 'collapsed');

        // If a collapse has taken place, use remembered values as the dimensions.
        if (me.collapsed) {
            memento = me.collapseMemento;
            memento = memento && memento.data;

            if (me.collapsedVertical()) {
                if (state) {
                    delete state.height;
                }
                if (memento) {
                    state = me.addPropertyToState(state, 'height', memento.height);
                }
            } else {
                if (state) {
                    delete state.width;
                }
                if (memento) {
                    state = me.addPropertyToState(state, 'width', memento.width);
                }
            }
        }

        return state;
    },

    findReExpander: function (direction) {
        var me = this,
            c = Ext.Component,
            dockedItems = me.dockedItems.items,
            dockedItemCount = dockedItems.length,
            comp, i;
            
        // never use the header if we're in collapseMode mini
        if (me.collapseMode === 'mini') {
            return;
        }

        switch (direction) {
            case c.DIRECTION_TOP:
            case c.DIRECTION_BOTTOM:

                // Attempt to find a reExpander Component (docked in a horizontal orientation)
                // Also, collect all other docked items which we must hide after collapse. 
                for (i = 0; i < dockedItemCount; i++) {
                    comp = dockedItems[i];
                    if (!comp.hidden) {
                        if (comp.isHeader && (!comp.dock || comp.dock === 'top' || comp.dock === 'bottom')) {
                            return comp;
                        }
                    }
                }
                break;

            case c.DIRECTION_LEFT:
            case c.DIRECTION_RIGHT:

                // Attempt to find a reExpander Component (docked in a vecrtical orientation)
                // Also, collect all other docked items which we must hide after collapse. 
                for (i = 0; i < dockedItemCount; i++) {
                    comp = dockedItems[i];
                    if (!comp.hidden) {
                        if (comp.isHeader && (comp.dock === 'left' || comp.dock === 'right')) {
                            return comp;
                        }
                    }
                }
                break;

            default:
                throw('Panel#findReExpander must be passed a valid collapseDirection');
        }
    },

    getReExpander: function (direction) {
        var me = this,
            collapseDir = direction || me.collapseDirection,
            reExpander = me.reExpander || me.findReExpander(collapseDir);

        me.expandDirection = me.getOppositeDirection(collapseDir);

        if (!reExpander) {
        // We did not find a Header of the required orientation: create one.
            me.reExpander = reExpander = me.createReExpander(collapseDir, {
                dock: collapseDir,
                cls: Ext.baseCSSPrefix + 'docked ' + me.baseCls + '-' + me.ui + '-collapsed',
                isCollapsedExpander: true
            });

            me.dockedItems.insert(0, reExpander);
        }
        return reExpander;
    },

    createReExpander: function(direction, defaults) {
        var me = this,
            isLeft = direction === 'left',
            isRight = direction === 'right',
            isVertical = isLeft || isRight,
            result = Ext.apply({
                hideMode: 'offsets',
                title: me.title || '&#160;',
                titleAlign: me.titleAlign,
                orientation: isVertical ? 'vertical' : 'horizontal',
                textCls: me.headerTextCls,
                icon: me.icon,
                iconCls: me.iconCls,
                glyph: me.glyph,
                baseCls: me.self.prototype.baseCls + '-header',
                ui: me.ui,
                frame: me.frame && me.frameHeader,
                ignoreParentFrame: me.frame || me.overlapHeader,
                indicateDrag: me.draggable,
                collapseImmune: true,
                ownerCt: me.ownerCt,
                ownerLayout: me.componentLayout,
                margin: me.margin
            }, defaults);
            
        // If we're in mini mode, set the placeholder size to only 1px since
        // we don't need it to show up.
        if (me.collapseMode === 'mini') {
            if (isVertical) {
                result.width = 1;
            } else {
                result.height = 1;
            }
        }

        // Create the re expand tool
        // For UI consistency reasons, collapse:left reExpanders, and region: 'west' placeHolders
        // have the re expand tool at the *top* with a bit of space.
        if (!me.hideCollapseTool) {
            if (isLeft || (isRight && me.isPlaceHolderCollapse())) {
                // adjust the title position if the collapse tool needs to be at the
                // top of a vertical header
                result.titlePosition = 1;
            }
            result.tools = [{
                xtype: 'tool',
                type: 'expand-' + me.getOppositeDirection(direction),
                uiCls: ['top'],
                handler: me.toggleCollapse,
                scope: me
            }];
        }
        result = new Ext.panel.Header(result);
        result.addClsWithUI(me.getHeaderCollapsedClasses(result));
        return result;
    },

    // @private
    // Create the class array to add to the Header when collpsed.
    getHeaderCollapsedClasses: function(header) {
        var me = this,
            collapsedCls = me.collapsedCls,
            collapsedClasses;

        collapsedClasses = [ collapsedCls, collapsedCls + '-' + header.getDockName()];
        if (me.border && (!me.frame || (me.frame && Ext.supports.CSS3BorderRadius))) {
            collapsedClasses.push(collapsedCls + '-border-' + header.getDockName());
        }
        return collapsedClasses;
    },

    /**
     * @private
     * Called before the change from default, configured state into the collapsed state.
     * This method may be called at render time to enable rendering in an initially collapsed state,
     * or at runtime when an existing, fully layed out Panel may be collapsed.
     * It basically saves configs which need to be clobbered for the duration of the collapsed state.
     */
    beginCollapse: function() {
        var me = this,
            lastBox = me.lastBox,
            rendered = me.rendered,
            collapseMemento = me.collapseMemento || (me.collapseMemento = new Ext.util.Memento(me)),
            sizeModel = me.getSizeModel(),
            header = me.header,
            reExpander;

        // When we collapse a panel, the panel is in control of one dimension (depending on
        // collapse direction) and sets that on the component. We must restore the user's
        // original value (including non-existance) when we expand. Using this technique, we
        // mimic setCalculatedSize for the dimension we do not control and setSize for the
        // one we do (only while collapsed).
        // Additionally, the panel may have a shrink wrapped width and/or height. For shrinkWrapped
        // panels this can be problematic, since a collapsed, shrink-wrapped panel has no way 
        // of determining its width (or height if the collapse direction is horizontal). It is
        // therefore necessary to capture both the width and height regardless of collapse direction.
        // This allows us to set a configured width or height on the panel when it is collapsed,
        // and it will be restored to an unconfigured-width shrinkWrapped state on expand.
        collapseMemento.capture(['height', 'minHeight', 'width', 'minWidth']);
        if (lastBox) {
            collapseMemento.capture(me.restoreDimension(), lastBox, 'last.');
        }
        // If the panel has a shrinkWrapped height/width and is already rendered, configure its width/height as its calculated width/height,
        // so that the collapsed header will have the same width or height as the panel did before it was collapsed.
        // If the shrinkWrapped panel has not yet been rendered, as will be the case when a panel is initially configured with
        // collapsed:true, we attempt to use the configured width/height, and fall back to minWidth or minHeight if
        // width/height has not been configured, and fall back to a value of 100 if a minWidth/minHeight has not been configured.
        if (me.collapsedVertical()) {
            if (sizeModel.width.shrinkWrap) {
                me.width = rendered ? me.getWidth() : me.width || me.minWidth || 100;
            }
            delete me.height;
            me.minHeight = 0;
        } else if (me.collapsedHorizontal()) {
            if (sizeModel.height.shrinkWrap) {
                me.height = rendered ? me.getHeight() : me.height || me.minHeight || 100;
            }
            delete me.width;
            me.minWidth = 0;
        }

        if (me.ownerCt) {
            me.ownerCt.getLayout().beginCollapse(me);
        }

        // Get a reExpander header. This will return the Panel Header if the Header is in the correct orientation
        // If we are using the Header as the reExpander, change its UI to collapsed state
        if (!me.isPlaceHolderCollapse() && header !== false) {
            if (header === (reExpander = me.getReExpander())) {
                header.collapseImmune = true;
                header.getHierarchyState().collapseImmune = true;
                header.addClsWithUI(me.getHeaderCollapsedClasses(header));

                // Ensure that the reExpander has the correct framing applied.
                if (header.rendered) {
                    header.updateFrame();
                }
            } else if (reExpander.el) {
                // We're going to use a temporary reExpander: show it.
                reExpander.el.show();
                reExpander.hidden = false;
            }
        }
        if (me.resizer) {
            me.resizer.disable();
        }
    },

    beginExpand: function() {
        var me = this,
            lastBox = me.lastBox,
            collapseMemento = me.collapseMemento,
            restoreDimension = this.restoreDimension(),
            header = me.header,
            reExpander;

        if (collapseMemento) {
            collapseMemento.restore(['minHeight', 'minWidth', restoreDimension]);
            if (lastBox) {
                collapseMemento.restore(restoreDimension, true, lastBox, 'last.');
            }
        }

        if (me.ownerCt) {
            me.ownerCt.getLayout().beginExpand(me);
        }

        if (!me.isPlaceHolderCollapse() && header !== false) {
            // If we have been using our Header as the reExpander then restore the Header to expanded UI
            if (header === (reExpander = me.getReExpander())) {
                delete header.collapseImmune;
                delete header.getHierarchyState().collapseImmune;
                header.removeClsWithUI(me.getHeaderCollapsedClasses(header));

                // Ensure that the reExpander has the correct framing applied.
                if (header.rendered) {
                    header.expanding = true;
                    header.updateFrame();
                    delete header.expanding;
                }
            } else {
                // We've been using a temporary reExpander: hide it.
                reExpander.hidden = true;
                reExpander.el.hide();
            }
        }
        if (me.resizer) {
            me.resizer.enable();
        }
    },

    /**
     * Collapses the panel body so that the body becomes hidden. Docked Components parallel to the border towards which
     * the collapse takes place will remain visible. Fires the {@link #beforecollapse} event which will cancel the
     * collapse action if it returns false.
     *
     * @param {String} [direction] The direction to collapse towards. Must be one of
     *
     *   - Ext.Component.DIRECTION_TOP
     *   - Ext.Component.DIRECTION_RIGHT
     *   - Ext.Component.DIRECTION_BOTTOM
     *   - Ext.Component.DIRECTION_LEFT
     *
     * Defaults to {@link #collapseDirection}.
     *
     * @param {Boolean} [animate] True to animate the transition, else false
     * (defaults to the value of the {@link #animCollapse} panel config). May
     * also be specified as the animation duration in milliseconds.
     * @return {Ext.panel.Panel} this
     */
    collapse: function(direction, animate) {
        var me = this,
            collapseDir = direction || me.collapseDirection,
            ownerCt = me.ownerCt;

        if (me.isCollapsingOrExpanding) {
            return me;
        }

        if (arguments.length < 2) {
            animate = me.animCollapse;
        }

        if (me.collapsed || me.fireEvent('beforecollapse', me, direction, animate) === false) {
            return me;
        }

        if (ownerCt && me.isPlaceHolderCollapse()) {
            return me.placeholderCollapse(direction, animate);
        }

        me.collapsed = collapseDir;
        me.beginCollapse();

        me.getHierarchyState().collapsed = true;
        me.fireHierarchyEvent('collapse');

        return me.doCollapseExpand(1, animate);
    },

    doCollapseExpand: function (flags, animate) {
        var me = this,
            originalAnimCollapse = me.animCollapse,
            ownerLayout = me.ownerLayout;

        // we need to temporarily set animCollapse to the animate value here because ContextItem
        // uses the animCollapse property to determine if the collapse/expand should be animated
        me.animCollapse = animate;

        // Flag used by the layout ContextItem to impose an animation policy based upon the
        // collapse direction and the animCollapse setting.
        me.isCollapsingOrExpanding = flags;

        // The x-animating-size class sets overflow:hidden so that overflowing
        // content is clipped during animation.
        if (animate) {
            me.addCls(Ext.baseCSSPrefix + 'animating-size');
        }

        if (ownerLayout && !animate) {
            ownerLayout.onContentChange(me);
        } else {
            me.updateLayout({ isRoot: true });
        }

        // set animCollapse back to its original value
        me.animCollapse = originalAnimCollapse;

        return me;
    },

    /**
     * Invoked after the Panel is Collapsed.
     *
     * @param {Boolean} animated
     *
     * @template
     * @protected
     */
    afterCollapse: function(animated) {
        var me = this,
            ownerLayout = me.ownerLayout;

        me.isCollapsingOrExpanding = 0;
        me.updateCollapseTool();

        // The x-animating-size class sets overflow:hidden so that overflowing
        // content is clipped during animation.
        if (animated) {
            me.removeCls(Ext.baseCSSPrefix + 'animating-size');
        }

        if (ownerLayout && animated) {
            ownerLayout.onContentChange(me);
        }

        me.setHiddenDocked();
        me.fireEvent('collapse', me);
    },
    
    setHiddenDocked: function(){
        // Hide Panel content except reExpander using visibility to prevent focusing of contained elements.
        // Track what we hide to re-show on expand
        var me = this,
            toHide = me.hiddenOnCollapse,
            items = me.getDockedItems(),
            len = items.length,
            i = 0,
            item, reExpander;
            
        if (me.header !== false) {
            reExpander = me.getReExpander();
        }
            
        toHide.add(me.body);
        for (; i < len; i++) {
            item = items[i];
            if (item && item !== reExpander && item.el) {
                toHide.add(item.el);
            }
        }
        toHide.setStyle('visibility', 'hidden');
    },
    
    restoreHiddenDocked: function(){
        var toShow = this.hiddenOnCollapse;
        // Re-show Panel content which was hidden after collapse.
        toShow.setStyle('visibility', '');
        toShow.clear();
    },

    getPlaceholder: function(direction) {
        var me = this,
            collapseDir = direction || me.collapseDirection,
            listeners = null,
            placeholder = me.placeholder,
            floatable = me.floatable,
            titleCollapse = me.titleCollapse;

        if (!placeholder) {
            if (floatable || (me.collapsible && titleCollapse)) {
                listeners = {
                    click: {
                        // titleCollapse needs to take precedence over floatable
                        fn: (!titleCollapse && floatable) ? me.floatCollapsedPanel : me.toggleCollapse,
                        element: 'el',
                        scope: me
                    }
                };
            }

            me.placeholder = placeholder = Ext.widget(me.createReExpander(collapseDir, {
                id: me.id + '-placeholder',
                listeners: listeners
            }));
        }

        // User created placeholder was passed in
        if (!placeholder.placeholderFor) {
            // Handle the case of a placeholder config
            if (!placeholder.isComponent) {
                me.placeholder = placeholder = me.lookupComponent(placeholder);
            }
            Ext.applyIf(placeholder, {
                margins: me.margins,
                placeholderFor: me
            });

            placeholder.addCls([Ext.baseCSSPrefix + 'region-collapsed-placeholder', Ext.baseCSSPrefix + 'region-collapsed-' + collapseDir + '-placeholder', me.collapsedCls]);
        }

        return placeholder;
    },

    placeholderCollapse: function(direction, animate) {
        var me = this,
            ownerCt = me.ownerCt,
            collapseDir = direction || me.collapseDirection,
            floatCls = Ext.baseCSSPrefix + 'border-region-slide-in',
            placeholder = me.getPlaceholder(collapseDir),
            slideInDirection;

        me.isCollapsingOrExpanding = 1;

        // Upcoming layout run will ignore this Component
        me.setHiddenState(true);
        me.collapsed = collapseDir;

        if (placeholder.rendered) {
            // We may have been added to another Container from that in which we rendered the placeholder
            if (placeholder.el.dom.parentNode !== me.el.dom.parentNode) {
                me.el.dom.parentNode.insertBefore(placeholder.el.dom, me.el.dom);
            }

            placeholder.hidden = false;
            placeholder.el.show();
            ownerCt.updateLayout();
        } else {
            ownerCt.insert(ownerCt.items.indexOf(me), placeholder);
        }

        if (me.rendered) {
            // We MUST NOT hide using display because that resets all scroll information.
            me.el.setVisibilityMode(me.placeholderCollapseHideMode);
            if (animate) {
                me.el.addCls(floatCls);
                placeholder.el.hide();
                slideInDirection = me.convertCollapseDir(collapseDir);

                me.el.slideOut(slideInDirection, {
                    preserveScroll: true,
                    duration: Ext.Number.from(animate, Ext.fx.Anim.prototype.duration),
                    listeners: {
                        afteranimate: function() {
                            me.el.removeCls(floatCls);
                            /* We need to show the element so that slideIn will work correctly. However, if we leave it
                               visible then it can be seen before the animation starts, causing a flicker. The solution,
                               borrowed from date picker, is to hide it using display none. The slideIn effect includes
                               a call to fixDisplay() that will undo the display none at the appropriate time.
                             */
                            placeholder.el.show().setStyle('display', 'none').slideIn(slideInDirection, {
                                easing: 'linear',
                                duration: 100,
                                listeners: {
                                    afteranimate: function() {
                                        placeholder.focus();
                                        me.isCollapsingOrExpanding = 0;
                                        me.fireEvent('collapse', me);
                                    }
                                }
                            });
                        }
                    }
                });
            } else {
                me.el.hide();
                me.isCollapsingOrExpanding = 0;
                me.fireEvent('collapse', me);
            }
        } else {
            me.isCollapsingOrExpanding = 0;
            if (!me.preventCollapseFire) {
                me.fireEvent('collapse', me);
            }
        }

        return me;
    },

    floatCollapsedPanel: function() {
        var me = this,
            placeholder = me.placeholder,
            ps = placeholder.getSize(),
            myBox,
            floatCls = Ext.baseCSSPrefix + 'border-region-slide-in',
            collapsed = me.collapsed,
            layoutOwner = me.ownerCt || me,
            slideDirection;

        if (me.isSliding) {
            return;
        }

        // Already floated
        if (me.el.hasCls(floatCls)) {
            me.slideOutFloatedPanel();
            return;
        }
        me.isSliding = true;

        // Lay out in fully expanded mode to ensure we are at the correct size, and collect our expanded box
        placeholder.el.hide();
        placeholder.hidden = true;
        me.el.show();
        me.setHiddenState(false);
        me.collapsed = false;
        layoutOwner.updateLayout();
        myBox = me.getBox(false, true);

        // Then go back immediately to collapsed state from which to initiate the float into view.
        placeholder.el.show();
        placeholder.hidden = false;
        me.el.hide();
        me.setHiddenState(true);
        me.collapsed = collapsed;
        layoutOwner.updateLayout();

        me.slideOutTask = me.slideOutTask || new Ext.util.DelayedTask(me.slideOutFloatedPanel, me);
        placeholder.el.on('mouseleave', me.onMouseLeaveFloated, me);
        me.el.on('mouseleave', me.onMouseLeaveFloated, me);
        placeholder.el.on('mouseenter', me.onMouseEnterFloated, me);
        me.el.on('mouseenter', me.onMouseEnterFloated, me);

        me.el.addCls(floatCls);
        me.floated = true;

        // Hide collapse tool in header if there is one (we might be headerless)
        if (me.collapseTool) {
            me.collapseTool.el.hide();
        }

        switch (me.collapsed) {
            case 'top':
                me.setLocalXY(myBox.x, myBox.y + ps.height - 1);
                break;
            case 'right':
                me.setLocalXY(myBox.x - ps.width + 1, myBox.y);
                break;
            case 'bottom':
                me.setLocalXY(myBox.x, myBox.y - ps.height + 1);
                break;
            case 'left':
                me.setLocalXY(myBox.x + ps.width - 1, myBox.y);
                break;
        }
        slideDirection = me.convertCollapseDir(me.collapsed);

        // Remember how we are really collapsed so we can restore it, but also so we can
        // become a layoutRoot while we are floated:
        me.floatedFromCollapse = me.collapsed;
        me.collapsed = false;
        me.setHiddenState(false);

        me.el.slideIn(slideDirection, {
            preserveScroll: true,
            duration: Ext.Number.from(me.animCollapse, Ext.fx.Anim.prototype.duration),
            listeners: {
                afteranimate: function() {
                    me.isSliding = false;
                    me.fireEvent('float', me);
                }
            }
        });
    },

    onMouseLeaveFloated: function(e) {
        this.slideOutTask.delay(500);
    },

    onMouseEnterFloated: function(e) {
        this.slideOutTask.cancel();
    },

    isLayoutRoot: function() {
        if (this.floatedFromCollapse) {
            return true;
        }
        return this.callParent();
    },

    slideOutFloatedPanel: function() {
        var me = this,
            compEl = this.el,
            collapseDirection;

        if (me.isSliding || me.isDestroyed) {
            return;
        }

        me.isSliding = true;
        me.floated = false;

        me.slideOutFloatedPanelBegin();

        if (typeof me.collapsed == 'string') {
            collapseDirection = me.convertCollapseDir(me.collapsed);
        }

        compEl.slideOut(collapseDirection, {
            preserveScroll: true,
            duration: Ext.Number.from(me.animCollapse, Ext.fx.Anim.prototype.duration),
            listeners: {
                afteranimate: function() {
                    me.slideOutFloatedPanelEnd();
                    // this would be in slideOutFloatedPanelEnd except that the only other
                    // caller removes this cls later
                    me.el.removeCls(Ext.baseCSSPrefix + 'border-region-slide-in');
                }
            }
        });
    },

    /**
     * This method begins the slide out of the floated panel.
     * @private
     */
    slideOutFloatedPanelBegin: function() {
        var me = this,
            placeholderEl = me.placeholder.el,
            el = me.el;

        me.collapsed = me.floatedFromCollapse;
        me.setHiddenState(true);
        me.floatedFromCollapse = null;

        // Remove mouse leave/enter monitors
        placeholderEl.un('mouseleave', me.onMouseLeaveFloated, me);
        el.un('mouseleave', me.onMouseLeaveFloated, me);
        placeholderEl.un('mouseenter', me.onMouseEnterFloated, me);
        el.un('mouseenter', me.onMouseEnterFloated, me);
    },

    /**
     * This method cleans up after the slide out of the floated panel.
     * @private
     */
    slideOutFloatedPanelEnd: function() {
        var me = this;

        if (me.collapseTool) {
            me.collapseTool.el.show();
        }
        me.slideOutTask.cancel();
        me.isSliding = false;
        me.fireEvent('unfloat', me);
    },

    /**
     * Expands the panel body so that it becomes visible.  Fires the {@link #beforeexpand} event which will
     * cancel the expand action if it returns false.
     * @param {Boolean} [animate] True to animate the transition, else false
     * (defaults to the value of the {@link #animCollapse} panel config).  May
     * also be specified as the animation duration in milliseconds.
     * @return {Ext.panel.Panel} this
     */
    expand: function(animate) {
        var me = this;

        if (me.isCollapsingOrExpanding) {
            return me;
        }

        if (!arguments.length) {
            animate = me.animCollapse;
        }

        if (!me.collapsed && !me.floatedFromCollapse) {
            return me;
        }

        if (me.fireEvent('beforeexpand', me, animate) === false) {
            return me;
        }

        delete this.getHierarchyState().collapsed;

        if (me.isPlaceHolderCollapse()) {
            return me.placeholderExpand(animate);
        }

        me.restoreHiddenDocked();
        me.beginExpand();
        me.collapsed = false;

        return me.doCollapseExpand(2, animate);
    },

    placeholderExpand: function(animate) {
        var me = this,
            collapseDir = me.collapsed,
            floatCls = Ext.baseCSSPrefix + 'border-region-slide-in',
            finalPos,
            floatedPos,
            center = me.ownerLayout ? me.ownerLayout.centerRegion: null;

        // Layouts suspended - don't bother with animation shenanigans
        if (Ext.AbstractComponent.layoutSuspendCount) {
            animate = false;
        }

        if (me.floatedFromCollapse) {
            floatedPos = me.getPosition(true);
            // these are the same cleanups performed by the normal slideOut mechanism:
            me.slideOutFloatedPanelBegin();
            me.slideOutFloatedPanelEnd();
            me.floated = false;
        }

        if (animate) {

            // Expand me and hide the placeholder
            Ext.suspendLayouts();
            me.placeholder.hide();
            me.el.show();
            me.collapsed = false;
            me.setHiddenState(false);

            // Stop the center region from moving when layed out without the placeholder there.
            // Unless we are expanding from a floated out situation. In that case, it's layed out immediately.
            if (center && !floatedPos) {
                center.hidden = true;
            }

            Ext.resumeLayouts(true);
            center.hidden = false;
            me.el.addCls(floatCls);

            // At this point, this Panel is arranged in its correct, expanded layout.
            // The center region has not been affected because it has been flagged as hidden.
            //
            // If we are proceeding from floated, the center region has also been arranged
            // in its new layout to accommodate this expansion, so no further layout is needed, just
            // element animation.
            //
            // If we are proceeding from fully collapsed, the center region has *not* been relayed out because
            // the UI look and feel dictates that it stays stable until the expanding panel has slid in all the
            // way, and *then* it snaps into place.

            me.isCollapsingOrExpanding = 2;

            // Floated, move it back to the floated pos, and thence into the correct place
            if (floatedPos) {
                finalPos = me.getXY();
                me.setLocalXY(floatedPos[0], floatedPos[1]);
                me.setXY([finalPos[0], finalPos[1]], {
                    duration: Ext.Number.from(animate, Ext.fx.Anim.prototype.duration),
                    listeners: {
                        afteranimate: function() {
                            me.el.removeCls(floatCls);
                            me.isCollapsingOrExpanding = 0;
                            me.fireEvent('expand', me);
                        }
                    }
                });
            }
            // Not floated, slide it in to the correct place
            else {
                me.el.hide();
                me.placeholder.el.show();
                me.placeholder.hidden = false;

                // Slide this Component's el back into place, after which we lay out AGAIN
                me.setHiddenState(false);
                me.el.slideIn(me.convertCollapseDir(collapseDir), {
                    preserveScroll: true,
                    duration: Ext.Number.from(animate, Ext.fx.Anim.prototype.duration),
                    listeners: {
                        afteranimate: function() {
                            // the ordering of these two lines appears to be important in
                            // IE9.  There is an odd expand issue in IE 9 in the border layout
                            // example that causes the index1 child of the south dock region
                            // to get 'hidden' after a collapse / expand cycle.  See
                            // EXTJSIV-5318 for details
                            me.el.removeCls(floatCls);
                            me.placeholder.hide();

                            // The center region has been left in its larger size, so a layout is needed now
                            me.updateLayout();

                            me.isCollapsingOrExpanding = 0;
                            me.fireEvent('expand', me);
                        }
                    }
                });
            }

        } else {
            me.floated = me.collapsed = false;
            me.el.removeCls(floatCls);
            Ext.suspendLayouts();
            me.placeholder.hide();
            me.show();
            Ext.resumeLayouts(true);
            me.fireEvent('expand', me);
        }

        return me;
    },

    /**
     * Invoked after the Panel is Expanded.
     *
     * @param {Boolean} animated
     *
     * @template
     * @protected
     */
    afterExpand: function(animated) {
        var me = this,
            ownerLayout = me.ownerLayout;

        me.isCollapsingOrExpanding = 0;
        me.updateCollapseTool();

        // The x-animating-size class sets overflow:hidden so that overflowing
        // content is clipped during animation.
        if (animated) {
            me.removeCls(Ext.baseCSSPrefix + 'animating-size');
        }

        if (ownerLayout && animated) {
            ownerLayout.onContentChange(me);
        }

        me.fireEvent('expand', me);
        me.fireHierarchyEvent('expand');
    },
    
    // @inheritdoc
    setBorder: function(border, targetEl) {
        if (targetEl) {
            // skip out here, the panel will set the border on the body/header during rendering
            return;
        }
        
        var me = this,
            header = me.header;
            
        if (!border) {
            border = 0;
        } else if (border === true) {
            border = '1px';
        } else {
            border = me.unitizeBox(border);
        }
        
        if (header) {
            if (header.isHeader) {
                header.setBorder(border);
            } else {
                header.border = border;
            }
        }
        
        if (me.rendered && me.bodyBorder !== false) {
            me.body.setStyle('border-width', border);
        }
        me.updateLayout();
        
        me.border = border;
    },

    /**
     * Shortcut for performing an {@link #method-expand} or {@link #method-collapse} based on the current state of the panel.
     * @return {Ext.panel.Panel} this
     */
    toggleCollapse: function() {
        return (this.collapsed || this.floatedFromCollapse) ? this.expand() : this.collapse();
    },

    // @private
    getKeyMap : function() {
        return this.keyMap || (this.keyMap = new Ext.util.KeyMap(Ext.apply({
            target: this.el
        }, this.keys)));
    },

    // @private
    initDraggable : function() {
        
        // For just simple dragging like Windows
        if (this.simpleDrag) {
            this.initSimpleDraggable();
        }
        // For DD package aware dragging of Panels
        else {
            /**
             * @property {Ext.dd.DragSource/Ext.util.ComponentDragger} dd
             *
             * Only present if this Panel has been configured with {@link #cfg-draggable} `true`.
             *
             * ##Simple dragging##
             *
             * If this Panel is configured {@link #cfg-simpleDrag} `true` (the default is `false`), this property
             * will reference an instance of {@link Ext.util.ComponentDragger} (A subclass of
             * {@link Ext.dd.DragTracker DragTracker}) which handles moving the Panel's DOM Element,
             * and constraining according to the {@link #constrain} and {@link #constrainHeader} .
             *
             * This object fires various events during its lifecycle and during a drag operation.
             * 
             * ##Complex dragging interacting with other DragDrop instances##
             *
             * By default, this property in a {@link #cfg-draggable} Panel will contain an instance of {@link
             * Ext.dd.DragSource} which handles dragging the Panel.
             *
             * The developer must provide implementations of the abstract methods of {@link Ext.dd.DragSource} in order to
             * supply behaviour for each stage of the drag/drop process. See {@link #cfg-draggable}.
             */
            this.dd = new Ext.panel.DD(this, Ext.isBoolean(this.draggable) ? null : this.draggable);
        }
    },

    /**
     * @private
     * Override Component.initDraggable.
     * Panel (and subclasses) use the header element as the delegate.
     */
    initSimpleDraggable: function() {
        var me = this,
            ddConfig, dd;

        if (!me.header) {
            me.updateHeader(true);
        }

        /*
         * Check the header here again. If for whatever reason it wasn't created in
         * updateHeader (we were configured with header: false) then we'll just ignore the rest since the
         * header acts as the drag handle.
         */
        if (me.header) {
            ddConfig = Ext.applyIf({
                el: me.el,
                delegate: '#' + Ext.escapeId(me.header.id)
            }, me.draggable);

            // Add extra configs if Window is specified to be constrained
            if (me.constrain || me.constrainHeader) {
                ddConfig.constrain = me.constrain;
                ddConfig.constrainDelegate = me.constrainHeader;
                ddConfig.constrainTo = me.constrainTo || me.container;
            }

            dd = me.dd = new Ext.util.ComponentDragger(this, ddConfig);
            me.relayEvents(dd, ['dragstart', 'drag', 'dragend']);
            if (me.maximized) {
                dd.disable();
            }
        }
    },
    
    // @private
    // helper function for ghost
    ghostTools : function() {
        var tools = [],
            header = this.header,
            headerTools = header ? header.query('tool[hidden=false]') : [],
            t, tLen, tool;

        if (headerTools.length) {
            t = 0;
            tLen = headerTools.length;

            for (; t < tLen; t++) {
                tool = headerTools[t];

                // Some tools can be full components, and copying them into the ghost
                // actually removes them from the owning panel. You could also potentially
                // end up with duplicate DOM ids as well. To avoid any issues we just make
                // a simple bare-minimum clone of each tool for ghosting purposes.
                tools.push({
                    type: tool.type
                });
            }
        } else {
            tools = [{
                type: 'placeholder'
            }];
        }
        return tools;
    },

    // @private
    // used for dragging
    ghost: function(cls) {
        var me = this,
            ghostPanel = me.ghostPanel,
            box = me.getBox(),
            header;

        if (!ghostPanel) {
            ghostPanel = new Ext.panel.Panel({
                renderTo: Ext.getBody(),
                floating: {
                    shadow: false
                },
                frame: me.frame && !me.alwaysFramed,
                alwaysFramed: me.alwaysFramed,
                overlapHeader: me.overlapHeader,
                headerPosition: me.headerPosition,
                baseCls: me.baseCls,
                cls: me.baseCls + '-ghost ' + (cls ||'')
            });
            me.ghostPanel = ghostPanel;
        } else {
            ghostPanel.el.show();
        }
        me.ghostPanel.hidden = false;
        ghostPanel.floatParent = me.floatParent;
        if (me.floating) {
            ghostPanel.zIndexManager.assignZIndices();
        } else {
            ghostPanel.toFront();
        }
        if (!(me.preventHeader || (me.header === false))) {
            header = ghostPanel.header;
            // restore options
            if (header) {
                header.suspendLayouts();
                Ext.Array.forEach(header.query('tool'), header.remove, header);
                header.resumeLayouts();
            }
            ghostPanel.addTool(me.ghostTools());
            ghostPanel.setTitle(me.title);

            if (me.iconCls) {
                ghostPanel.setIconCls(me.iconCls);
            } else if (me.icon) {
                ghostPanel.setIcon(me.icon);
            } else if (me.glyph) {
                ghostPanel.setGlyph(me.glyph);
            }
            
            ghostPanel.header.addCls(Ext.baseCSSPrefix + 'header-ghost');
        }

        ghostPanel.setPagePosition(box.x, box.y);
        ghostPanel.setSize(box.width, box.height);
        me.el.hide();
        return ghostPanel;
    },

    // @private
    unghost: function(show, matchPosition) {
        var me = this;
        if (!me.ghostPanel) {
            return;
        }
        if (show !== false) {
            // Show el first, so that position adjustment in setPagePosition
            // will work when relative positioned elements have their XY read.
            me.el.show();
            if (matchPosition !== false) {
                me.setPagePosition(me.ghostPanel.getXY());
                if (me.hideMode == 'offsets') {
                    // clear the hidden style because we just repositioned
                    delete me.el.hideModeStyles;
                }
            }
            Ext.defer(me.focus, 10, me);
        }
        me.ghostPanel.el.hide();
        me.ghostPanel.hidden = true;
    },

    beginDrag: function() {
        if (this.floatingDescendants) {
            this.floatingDescendants.hide();
        }
    },

    endDrag: function() {
        if (this.floatingDescendants) {
            this.floatingDescendants.show();
        }
    },

    initResizable: function() {
        this.callParent(arguments);
        if (this.collapsed) {
            this.resizer.disable();
        }
    },

    /**
     * converts a collapsdDir into an anchor argument for Element.slideIn
     * overridden in rtl mode to switch "l" and "r"
     */
    convertCollapseDir: function(collapseDir) {
        return collapseDir.substr(0, 1);
    }
}, function() {
    this.prototype.animCollapse = Ext.enableFx;
});
