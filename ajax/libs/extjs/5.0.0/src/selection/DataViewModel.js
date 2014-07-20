/**
 * @private
 */
Ext.define('Ext.selection.DataViewModel', {
    extend: 'Ext.selection.Model',

    requires: ['Ext.util.KeyNav'],

    deselectOnContainerClick: true,

    /**
     * @cfg {Boolean} enableKeyNav
     *
     * Turns on/off keyboard navigation within the DataView.
     */
    enableKeyNav: true,

    /**
     * @event beforedeselect
     * Fired before a record is deselected. If any listener returns false, the
     * deselection is cancelled.
     * @param {Ext.selection.DataViewModel} this
     * @param {Ext.data.Model} record The deselected record
     */

    /**
     * @event beforeselect
     * Fired before a record is selected. If any listener returns false, the
     * selection is cancelled.
     * @param {Ext.selection.DataViewModel} this
     * @param {Ext.data.Model} record The selected record
     */

    /**
     * @event deselect
     * Fired after a record is deselected
     * @param {Ext.selection.DataViewModel} this
     * @param  {Ext.data.Model} record The deselected record
     */

    /**
     * @event select
     * Fired after a record is selected
     * @param {Ext.selection.DataViewModel} this
     * @param  {Ext.data.Model} record The selected record
     */

    bindComponent: function(view) {
        var me = this,
            eventListeners = {
                refresh: me.refresh,
                scope: me
            };

        me.view = view;
        me.bindStore(view.getStore());

        eventListeners[view.triggerEvent] = me.onItemClick;
        eventListeners[view.triggerCtEvent] = me.onContainerClick;

        view.on(eventListeners);

        if (me.enableKeyNav) {
            me.initKeyNav(view);
        }
    },
    
    onUpdate: function(record){
        var view = this.view;
        if (view && this.isSelected(record)) {
            view.onItemSelect(record);
        }
    },

    onItemClick: function(view, record, item, index, e) {
        this.selectWithEvent(record, e);
    },

    onContainerClick: function() {
        if (this.deselectOnContainerClick) {
            this.deselectAll();
        }
    },

    initKeyNav: function(view) {
        var me = this;

        if (!view.rendered) {
            view.on({
                render: Ext.Function.bind(me.initKeyNav, me, [view]),
                single: true
            });
            return;
        }

        view.el.set({
            tabIndex: -1
        });
        me.keyNav = new Ext.util.KeyNav({
            target: view.el,
            ignoreInputFields: true,
            down: Ext.pass(me.onNavKey, [1], me),
            right: Ext.pass(me.onNavKey, [1], me),
            left: Ext.pass(me.onNavKey, [-1], me),
            up: Ext.pass(me.onNavKey, [-1], me),
            scope: me
        });
    },

    onNavKey: function(step) {
        step = step || 1;
        var me = this,
            view = me.view,
            selected = me.getSelection()[0],
            numRecords = me.view.store.getCount(),
            idx;

        if (selected) {
            idx = view.indexOf(view.getNode(selected)) + step;
        } else {
            idx = 0;
        }

        if (idx < 0) {
            idx = numRecords - 1;
        } else if (idx >= numRecords) {
            idx = 0;
        }

        me.select(idx);
    },

    // Allow the DataView to update the ui
    onSelectChange: function(record, isSelected, suppressEvent, commitFn) {
        var me = this,
            view = me.view,
            eventName = isSelected ? 'select' : 'deselect';

        if ((suppressEvent || me.fireEvent('before' + eventName, me, record)) !== false &&
                commitFn() !== false) {

            if (view) {
                if (isSelected) {
                    view.onItemSelect(record);
                } else {
                    view.onItemDeselect(record);
                }
            }

            if (!suppressEvent) {
                me.fireEvent(eventName, me, record);
            }
        }
    },
    
    onLastFocusChanged: function(oldFocus, newFocus, suppressFocus){
        var view = this.view;
        if (view && !suppressFocus && newFocus) {
            view.focusNode(newFocus);
            this.fireEvent('focuschange', this, oldFocus, newFocus);
        }
    },
    
    destroy: function(){
        Ext.destroy(this.keyNav);
        this.callParent();
    }
});
