/**
 * A specialized container representing the viewable application area (the browser viewport).
 *
 * The Viewport renders itself to the document body, and automatically sizes itself to the size of
 * the browser viewport and manages window resizing. There may only be one Viewport created
 * in a page.
 *
 * Like any {@link Ext.container.Container Container}, a Viewport will only perform sizing and positioning
 * on its child Components if you configure it with a {@link #layout}.
 *
 * A Common layout used with Viewports is {@link Ext.layout.container.Border border layout}, but if the
 * required layout is simpler, a different layout should be chosen.
 *
 * For example, to simply make a single child item occupy all available space, use
 * {@link Ext.layout.container.Fit fit layout}.
 *
 * To display one "active" item at full size from a choice of several child items, use
 * {@link Ext.layout.container.Card card layout}.
 *
 * Inner layouts are available because all {@link Ext.panel.Panel Panel}s
 * added to the Viewport, either through its {@link #cfg-items}, or the {@link #method-add}
 * method of any of its child Panels may themselves have a layout.
 *
 * The Viewport does not provide scrolling, so child Panels within the Viewport should provide
 * for scrolling if needed using the {@link #autoScroll} config.
 *
 * An example showing a classic application border layout:
 *
 *     @example
 *     Ext.create('Ext.container.Viewport', {
 *         layout: 'border',
 *         items: [{
 *             region: 'north',
 *             html: '<h1 class="x-panel-header">Page Title</h1>',
 *             border: false,
 *             margin: '0 0 5 0'
 *         }, {
 *             region: 'west',
 *             collapsible: true,
 *             title: 'Navigation',
 *             width: 150
 *             // could use a TreePanel or AccordionLayout for navigational items
 *         }, {
 *             region: 'south',
 *             title: 'South Panel',
 *             collapsible: true,
 *             html: 'Information goes here',
 *             split: true,
 *             height: 100,
 *             minHeight: 100
 *         }, {
 *             region: 'east',
 *             title: 'East Panel',
 *             collapsible: true,
 *             split: true,
 *             width: 150
 *         }, {
 *             region: 'center',
 *             xtype: 'tabpanel', // TabPanel itself has no title
 *             activeTab: 0,      // First tab active by default
 *             items: {
 *                 title: 'Default Tab',
 *                 html: 'The first tab\'s content. Others may be added dynamically'
 *             }
 *         }]
 *     });
 *
 * Alternatively you can turn any normal Container (or Component) into a Viewport using
 * the `{@link Ext.plugin.Viewport viewport plugin}`.
 */
Ext.define('Ext.container.Viewport', {
    extend: 'Ext.container.Container',

    requires: [
        'Ext.plugin.Viewport'
    ],

    mixins: [
        'Ext.mixin.Responsive'
    ],

    alias: 'widget.viewport',
    alternateClassName: 'Ext.Viewport',

    /**
     * @property {Boolean} isViewport
     * `true` in this class to identify an object as an instantiated Viewport, or subclass thereof.
     * @readonly
     */

    /**
     * @cfg {Number} [maxUserScale=10]
     * The maximum zoom scale. Only applicable for touch devices. Set this to 1 to
     * disable zooming.
     */

    // Privatize config options which, if used, would interfere with the
    // correct operation of the Viewport as the sole manager of the
    // layout of the document body.

    /**
     * @cfg {Boolean} allowDomMove
     * @private
     */

    /**
     * @cfg {String/HTMLElement/Ext.dom.Element} renderTo
     * Always renders to document body.
     * @private
     */

    /**
     * @cfg {Number} height
     * Sets itself to viewport width.
     * @private
     */

    /**
     * @cfg {Number} width
     * Sets itself to viewport height.
     * @private
     */

    privates: {
        updateResponsiveState: function () {
            // By providing this method we are in sync with the layout suspend/resume as
            // well as other changes to configs that need to happen during this pulse of
            // size change.

            // Since we are not using the Viewport plugin beyond applying its methods on
            // to our prototype, we need to be Responsive ourselves and call this here:
            this.handleViewportResize();

            this.mixins.responsive.updateResponsiveState.call(this);
        }
    }
},
function () {
    Ext.plugin.Viewport.apply(this);
});
