/**
 * This is a layout that manages multiple Panels in an expandable accordion style such that by default only
 * one Panel can be expanded at any given time (set {@link #multi} config to have more open). Each Panel has
 * built-in support for expanding and collapsing.
 *
 * Note: Only Ext Panels and all subclasses of Ext.panel.Panel may be used in an accordion layout Container.
 *
 *     @example
 *     Ext.create('Ext.panel.Panel', {
 *         title: 'Accordion Layout',
 *         width: 300,
 *         height: 300,
 *         defaults: {
 *             // applied to each contained panel
 *             bodyStyle: 'padding:15px'
 *         },
 *         layout: {
 *             // layout-specific configs go here
 *             type: 'accordion',
 *             titleCollapse: false,
 *             animate: true,
 *             activeOnTop: true
 *         },
 *         items: [{
 *             title: 'Panel 1',
 *             html: 'Panel content!'
 *         },{
 *             title: 'Panel 2',
 *             html: 'Panel content!'
 *         },{
 *             title: 'Panel 3',
 *             html: 'Panel content!'
 *         }],
 *         renderTo: Ext.getBody()
 *     });
 */
Ext.define('Ext.layout.container.Accordion', {
    extend: 'Ext.layout.container.VBox',
    alias: 'layout.accordion',
    type: 'accordion',

    alternateClassName: 'Ext.layout.AccordionLayout',

    targetCls: Ext.baseCSSPrefix + 'accordion-layout-ct',
    itemCls: [Ext.baseCSSPrefix + 'box-item', Ext.baseCSSPrefix + 'accordion-item'],

    align: 'stretch',

    enableSplitters: false,

    /**
     * @cfg {Boolean} fill
     * True to adjust the active item's height to fill the available space in the container, false to use the
     * item's current height, or auto height if not explicitly set.
     */
    fill : true,

    /**
     * @cfg {Boolean} autoWidth
     * Child Panels have their width actively managed to fit within the accordion's width.
     * @removed This config is ignored in ExtJS 4
     */

    /**
     * @cfg {Boolean} titleCollapse
     * True to allow expand/collapse of each contained panel by clicking anywhere on the title bar, false to allow
     * expand/collapse only when the toggle tool button is clicked.  When set to false,
     * {@link #hideCollapseTool} should be false also. An explicit {@link Ext.panel.Panel#titleCollapse} declared
     * on the panel will override this setting.
     */
    titleCollapse : true,

    /**
     * @cfg {Boolean} hideCollapseTool
     * True to hide the contained Panels' collapse/expand toggle buttons, false to display them.
     * When set to true, {@link #titleCollapse} is automatically set to true.
     */
    hideCollapseTool : false,

    /**
     * @cfg {Boolean} collapseFirst
     * True to make sure the collapse/expand toggle button always renders first (to the left of) any other tools
     * in the contained Panels' title bars, false to render it last. By default, this will use the
     * {@link Ext.panel.Panel#collapseFirst} setting on the panel. If the config option is specified on the layout,
     * it will override the panel value.
     */
    collapseFirst : undefined,

    /**
     * @cfg {Boolean} animate
     * True to slide the contained panels open and closed during expand/collapse using animation, false to open and
     * close directly with no animation. Note: The layout performs animated collapsing
     * and expanding, *not* the child Panels.
     */
    animate : true,
    /**
     * @cfg {Boolean} activeOnTop
     * Only valid when {@link #multi} is `false` and {@link #animate} is `false`.
     *
     * True to swap the position of each panel as it is expanded so that it becomes the first item in the container,
     * false to keep the panels in the rendered order.
     */
    activeOnTop : false,
    /**
     * @cfg {Boolean} multi
     * Set to true to enable multiple accordion items to be open at once.
     */
    multi: false,

    panelCollapseMode: 'header',

    defaultAnimatePolicy: {
        y: true,
        height: true
    },

    constructor: function() {
        var me = this;

        me.callParent(arguments);

        if (me.animate) {
            me.animatePolicy = {};

            /* Animate our parallel dimension and position.
               So in the default vertical accordion, this will be
                {
                    y: true,
                    height: true
                }
            */
            me.animatePolicy[me.names.x] = true;
            me.animatePolicy[me.names.width] = true;
        } else {
            me.animatePolicy = null;
        }
    },

    beforeRenderItems: function (items) {
        var me = this,
            ln = items.length,
            owner = me.owner,
            collapseFirst = me.collapseFirst,
            hasCollapseFirst = Ext.isDefined(collapseFirst),
            expandedItem = me.getExpanded(true)[0],
            multi = me.multi,
            comp, i;

        for (i = 0; i < ln; i++) {
            comp = items[i];
            if (!comp.rendered) {
                // Set up initial properties for Panels in an accordion.
                if (!multi || comp.collapsible !== false) {
                    comp.collapsible = true;
                }

                if (comp.collapsible) {
                    if (hasCollapseFirst) {
                        comp.collapseFirst = collapseFirst;
                    }
                    if (me.hideCollapseTool) {
                        comp.hideCollapseTool = me.hideCollapseTool;
                        comp.titleCollapse = true;
                    } else if (me.titleCollapse && comp.titleCollapse === undefined) {
                        // Only force titleCollapse if we don't explicitly
                        // set one on the child panel
                        comp.titleCollapse = me.titleCollapse;
                    }
                }

                comp.hideHeader = comp.width = null;
                comp.title = comp.title || '&#160;';
                comp.addBodyCls(Ext.baseCSSPrefix + 'accordion-body');

                // If only one child Panel is allowed to be expanded
                // then collapse all except the first one found with collapsed:false
                // If we have hasExpanded set, we've already done this
                if (!multi) {
                    if (expandedItem) {
                        comp.collapsed = expandedItem !== comp;
                    } else if (comp.hasOwnProperty('collapsed') && comp.collapsed === false) {
                        expandedItem = comp;
                    } else {
                        comp.collapsed = true;
                    }

                    // If only one child Panel may be expanded, then intercept expand/show requests.
                    owner.mon(comp, 'show', me.onComponentShow, me);
                }
                // Need to still check this outside multi because we don't want
                // a single item to be able to collapse
                comp.headerOverCls = Ext.baseCSSPrefix + 'accordion-hd-over';
            }
        }

        // If no collapsed:false Panels found, make the first one expanded, only if we're
        // not during an expand/collapse
        if (!me.processing && !multi) {
            if (!expandedItem) {
                if (ln) {
                    items[0].collapsed = false;
                }
            } else if (me.activeOnTop) {
                expandedItem.collapsed = false;
                me.configureItem(expandedItem);
                if (owner.items.indexOf(expandedItem) > 0) {
                    owner.insert(0, expandedItem);
                }
            }
        }
    },

    getItemsRenderTree: function(items) {
        this.beforeRenderItems(items);
        return this.callParent(arguments);
    },

    renderItems : function(items, target) {
        this.beforeRenderItems(items);

        this.callParent(arguments);
    },

    configureItem: function(item) {
        this.callParent(arguments);

        // Accordion headers are immune to dock layout's border-management rules
        item.ignoreHeaderBorderManagement = true;

        // We handle animations for the expand/collapse of items.
        // Items do not have individual borders
        item.animCollapse = false;

        // If filling available space, all Panels flex.
        if (this.fill) {
            item.flex = 1;
        }
    },

    beginLayout: function (ownerContext) {
        this.callParent(arguments);
        this.updatePanelClasses(ownerContext);
    },

    updatePanelClasses: function(ownerContext) {
        var children = ownerContext.visibleItems,
            ln = children.length,
            siblingCollapsed = true,
            i, child, header;

        for (i = 0; i < ln; i++) {
            child = children[i];
            header = child.header;
            header.addCls(Ext.baseCSSPrefix + 'accordion-hd');

            if (siblingCollapsed) {
                header.removeCls(Ext.baseCSSPrefix + 'accordion-hd-sibling-expanded');
            } else {
                header.addCls(Ext.baseCSSPrefix + 'accordion-hd-sibling-expanded');
            }

            if (i + 1 == ln && child.collapsed) {
                header.addCls(Ext.baseCSSPrefix + 'accordion-hd-last-collapsed');
            } else {
                header.removeCls(Ext.baseCSSPrefix + 'accordion-hd-last-collapsed');
            }

            siblingCollapsed = child.collapsed;
        }
    },

    // When a Component expands, adjust the heights of the other Components to be just enough to accommodate
    // their headers.
    // The expanded Component receives the only flex value, and so gets all remaining space.
    onBeforeComponentExpand: function(toExpand) {
        var me = this,
            owner = me.owner,
            multi = me.multi,
            moveToTop = !multi && !me.animate && me.activeOnTop,
            expanded,
            previousValue;

        if (!me.processing) {
            me.processing = true;
            previousValue = owner.deferLayouts;
            owner.deferLayouts = true;
            
            if (!multi) {
                expanded = me.getExpanded()[0];
                if (expanded && expanded !== toExpand) {
                    expanded.collapse();
                }
            }

            if (moveToTop) {
                // Prevent extra layout when moving the item
                Ext.suspendLayouts();
                owner.insert(0, toExpand);
                Ext.resumeLayouts();
            }

            owner.deferLayouts = previousValue;
            me.processing = false;
        }
    },

    onBeforeComponentCollapse: function(comp) {
        var me = this,
            owner = me.owner,
            toExpand,
            expanded,
            previousValue;

        if (me.owner.items.getCount() === 1) {
            // do not allow collapse if there is only one item
            return false;
        }

        if (!me.processing) {
            me.processing = true;
            previousValue = owner.deferLayouts;
            owner.deferLayouts = true;
            toExpand = comp.next() || comp.prev();

            // If we are allowing multi, and the "toCollapse" component is NOT the only expanded Component,
            // then ask the box layout to collapse it to its header.
            if (me.multi) {
                expanded = me.getExpanded();

                // If the collapsing Panel is the only expanded one, expand the following Component.
                // All this is handling fill: true, so there must be at least one expanded,
                if (expanded.length === 1) {
                    toExpand.expand();
                }

            } else if (toExpand) {
                toExpand.expand();
            }
            owner.deferLayouts = previousValue;
            me.processing = false;
        }
    },

    onComponentShow: function(comp) {
        this.onBeforeComponentExpand(comp);
    },

    onAdd: function (item) {
        var me = this;

        me.callParent(arguments);

        if (item.collapseMode === 'placeholder') {
            item.collapseMode = me.panelCollapseMode;
        }

        item.collapseDirection = item.headerPosition;

        // If we add to an accordion after its is has run once we need to make sure
        // new items are collapsed on entry. The item is also in the collection now,
        // so only collapse it if we have more than 1.
        if (me.layoutCount && !me.multi && me.owner.items.getCount() > 1) {
            // If we get here, we must already have something expanded, so we don't
            // want to react here.
            me.processing = true;
            item.collapse();
            me.processing = false
        }
    },

    onRemove: function(panel, destroying){
        var me = this,
            item;
            
        me.callParent(arguments);
        
        if (!me.owner.destroying && !me.multi && !panel.collapsed) {
            item = me.owner.items.first();
            if (item) {
                item.expand();
            }
        }
    },

    getExpanded: function(explicitCheck){
        var items = this.owner.items.items,
            len = items.length,
            i = 0,
            out = [],
            add,
            item;

        for (; i < len; ++i) {
            item = items[i];

            if (!item.hidden) {
                if (explicitCheck) {
                    add = item.hasOwnProperty('collapsed') && item.collapsed === false;
                } else {
                    add = !item.collapsed;
                }
                if (add) {
                    out.push(item);
                }
            }
        }
        return out;

    }
});
