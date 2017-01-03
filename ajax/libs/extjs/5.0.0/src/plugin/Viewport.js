/**
 * This plugin can be applied to any `Component` (although almost always to a `Container`)
 * to make it fill the browser viewport. This plugin is used internally by the more familiar
 * `Ext.container.Viewport` class.
 *
 * The `Viewport` container is commonly used but it can be an issue if you need to fill the
 * viewport with a container that derives from another class (e.g., `Ext.tab.Panel`). Prior
 * to this plugin, you would have to do this:
 *
 *      Ext.create('Ext.container.Viewport', {
 *          layout: 'fit', // full the viewport with the tab panel
 *
 *          items: [{
 *              xtype: 'tabpanel',
 *              items: [{
 *                  ...
 *              }]
 *          }]
 *      });
 *
 * With this plugin you can create the `tabpanel` as the viewport:
 *
 *      Ext.create('Ext.tab.Panel', {
 *          plugins: 'viewport',
 *
 *          items: [{
 *              ...
 *          }]
 *      });
 *
 * More importantly perhaps is that as a plugin, the view class can be reused in other
 * contexts such as the content of a `{@link Ext.window.Window window}`.
 *
 * The Viewport renders itself to the document body, and automatically sizes itself to the size of
 * the browser viewport and manages window resizing. There may only be one Viewport created
 * in a page.
 *
 * ## Responsive Design
 *
 * This plugin enables {@link Ext.mixin.Responsive#responsiveConfig} for the target component.
 *
 * @since 5.0.0
 */
Ext.define('Ext.plugin.Viewport', {
    extend: 'Ext.plugin.Responsive',

    alias: 'plugin.viewport',

    /**
     * @cfg {Number} [maxUserScale=1]
     * The maximum zoom scale. Only applicable for touch devices. Set this to 1 to
     * disable zooming.  Setting this to any value other than "1" will disable all
     * multi-touch gestures.
     */

    setCmp: function (cmp) {
        this.cmp = cmp;

        if (cmp && !cmp.isViewport) {
            this.apply(cmp);
            if (cmp.renderConfigs) {
                cmp.flushRenderConfigs();
            }
            cmp.setupViewport();
        }
    },

    statics: {
        apply: function (target) {
            Ext.applyIf(target.prototype || target, {
                ariaRole: 'application',

                viewportCls: Ext.baseCSSPrefix + 'viewport'
            });

            Ext.override(target, {
                isViewport: true,

                preserveElOnDestroy: true,

                initComponent : function() {
                    this.callParent();
                    this.setupViewport();
                },

                handleViewportResize: function () {
                    var me = this,
                        Element = Ext.dom.Element,
                        width = Element.getViewportWidth(),
                        height = Element.getViewportHeight();

                    if (width != me.width || height != me.height) {
                        me.setSize(width, height);
                    }
                },

                setupViewport : function() {
                    var me = this,
                        html = document.body.parentNode,
                        el = me.el = Ext.getBody();

                    // Get the DOM disruption over with before the Viewport renders and begins a layout
                    Ext.getScrollbarSize();

                    // Clear any dimensions, we will size later on
                    me.width = me.height = undefined;

                    Ext.fly(html).addCls(me.viewportCls);
                    if (me.autoScroll) {
                        Ext.fly(html).setStyle(me.getOverflowStyle());
                        delete me.autoScroll;
                    }
                    el.setHeight = el.setWidth = Ext.emptyFn;
                    el.dom.scroll = 'no';
                    me.allowDomMove = false;
                    me.renderTo = me.el;

                    if (Ext.supports.Touch) {
                        me.initMeta();
                    }
                },

                afterLayout: function(layout) {
                    if (Ext.supports.Touch) {
                        document.body.scrollTop = 0;
                    }
                    this.callParent([layout]);
                },

                onRender: function() {
                    var me = this;

                    me.callParent(arguments);

                    // Important to start life as the proper size (to avoid extra layouts)
                    // But after render so that the size is not stamped into the body
                    me.width = Ext.Element.getViewportWidth();
                    me.height = Ext.Element.getViewportHeight();

                    // prevent touchmove from panning the viewport in mobile safari
                    if (Ext.supports.TouchEvents) {
                        me.mon(Ext.getDoc(), {
                            touchmove: function(e) {
                                e.preventDefault();
                            },
                            translate: false,
                            delegated: false
                        });
                    }
                },

                initInheritedState: function (inheritedState, inheritedStateInner) {
                    var me = this,
                        root = Ext.rootInheritedState;

                    if (inheritedState !== root) {
                        // We need to go at this again but with the rootInheritedState object. Let
                        // any derived class poke on the proper object!
                        me.initInheritedState(me.inheritedState = root,
                            me.inheritedStateInner = Ext.Object.chain(root));
                    } else {
                        me.callParent([ inheritedState, inheritedStateInner ]);
                    }
                },

                beforeDestroy: function(){
                    var me = this;

                    me.removeUIFromElement();
                    me.el.removeCls(me.baseCls);
                    Ext.fly(document.body.parentNode).removeCls(me.viewportCls);
                    me.callParent();
                },

                addMeta: function(name, content) {
                    var meta = document.createElement('meta');

                    meta.setAttribute('name', name);
                    meta.setAttribute('content', content);
                    Ext.getHead().appendChild(meta);
                },

                initMeta: function() {
                    var me = this,
                        maxScale = me.maxUserScale || 1;

                    me.addMeta('viewport', 'width=device-width, initial-scale=1, maximum-scale=' +
                           maxScale + ', user-scalable=' + (maxScale !== 1 ? 'yes' : 'no'));
                    me.addMeta('apple-mobile-web-app-capable', 'yes');
                },

                privates: {
                    // override here to prevent an extraneous warning
                    applyTargetCls: function (targetCls) {
                        this.el.addCls(targetCls);
                    }
                }
            });
        }
    },

    privates: {
        updateResponsiveState: function () {
            // By providing this method we are in sync with the layout suspend/resume as
            // well as other changes to configs that need to happen during this pulse of
            // size change.

            // This plugin instance is response, but the cmp is what needs to be handling
            // the resize:
            this.cmp.handleViewportResize();

            this.callParent();
        }
    }
},
function (Viewport) {
    Viewport.prototype.apply = Viewport.apply;
});
