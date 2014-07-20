/**
 * This class is used to wrap content items in the `Dashboard`. It uses an
 * `anchor` layout by default and provides resizing on the bottom edge only.
 * @protected
 */
Ext.define('Ext.dashboard.Panel', {
    extend: 'Ext.panel.Panel',

    xtype: 'dashboard-panel',

    cls: Ext.baseCSSPrefix + 'dashboard-panel',

    anchor: '100%',

    layout  : 'fit',

    frame: true,
    closable: true,
    collapsible: true,
    animCollapse: true,
    titleCollapse  : true,

    stateful : true,

    draggable: {
        moveOnDrag: false
    },

    animateClose: true,

    loadMask: true,

    minHeight: 90,

    resizable: true,
    resizeHandles: 's',

    // Override Panel's default doClose to provide a custom fade out effect
    // when a portlet is removed from the portal
    doClose: function() {
        var me = this;

        if (me.animateClose) {
            if (!me.closing) {
                me.closing = true;
                me.el.animate({
                    opacity: 0,
                    callback: me.finishClose,
                    scope: me
                });
            }
        } else {
            me.finishClose();
        }
    },

    finishClose: function () {
        var me = this,
            closeAction = me.closeAction;

        me.closing = false;
        me.fireEvent('close', me);

        // The close of the last portlet within a column results in removal of both the column and its splitter.
        // So coalesce any layouts resulting from this operation.
        Ext.suspendLayouts();
        me[closeAction]();
        Ext.resumeLayouts(true);

        if (closeAction === 'hide') {
            me.el.setOpacity(1);
        }
    },

    afterRender: function () {
        this.callParent();

        if (this.loading) {
            this.onViewBeforeLoad();
        }
    },

    getLoadMask: function () {
        var me = this,
            loadMask = me.rendered && me.loadMask,
            config;

        if (loadMask && !loadMask.isComponent) {
            config = {
                target: me
            };

            if (loadMask === true) {
                loadMask = config;
            } else {
                Ext.apply(config, loadMask);
            }

            me.loadMask = loadMask = Ext.ComponentManager.create(config, 'loadmask');
        }

        return loadMask || null;
    },

    onAdd: function (view) {
        this.callParent(arguments);

        view.on({
            beforeload: 'onViewBeforeLoad',
            load: 'onViewLoaded',
            scope: this
        });
    },

    onViewBeforeLoad: function () {
        this.loading = true;

        var loadMask = this.getLoadMask();
        if (loadMask) {
            loadMask.show();
        }
    },

    onViewLoaded: function () {
        this.loading = false;

        var loadMask = this.getLoadMask();
        if (loadMask) {
            loadMask.hide();
        }
        var view = this.items.getAt(0);
        if (view.getTitle) {
            var title = view.getTitle();
            if (title) {
                this.setTitle(title);
            }
        }
    },

    /** @private */
    setBox: function (box) {
        // The resizer calls setBox which would set our left/top coordinates but
        // that is a BAD thing in a column layout which relies on flow!
        this.setSize(box.width, box.height);
    },

    /** @private */
    getState : function() {
        var me = this,
            state = me.callParent() || {};

        if (!state.collapsed) {
            me.addPropertyToState(state, 'height', me.rendered ? me.getHeight() : me.height || me.minHeight || 100);
        }

        return state;

    }
});
