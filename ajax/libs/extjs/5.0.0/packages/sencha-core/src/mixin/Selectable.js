/**
 * Tracks what records are currently selected in a databound widget. This class is mixed in to {@link Ext.dataview.DataView} and
 * all subclasses.
 * @private
 */
Ext.define('Ext.mixin.Selectable', {
    extend: 'Ext.Mixin',

    mixinConfig: {
        id: 'selectable',
        after: {
            updateStore: 'updateStore'
        }
    },

    /**
     * @event beforeselectionchange
     * Fires before an item is selected.
     * @param {Ext.mixin.Selectable} this
     * @preventable selectionchange
     * @deprecated 2.0.0 Please listen to the {@link #selectionchange} event with an order of `before` instead.
     */

    /**
     * @event selectionchange
     * Fires when a selection changes.
     * @param {Ext.mixin.Selectable} this
     * @param {Ext.data.Model[]} records The records whose selection has changed.
     */

    config: {
        /**
         * @cfg {Boolean} disableSelection `true` to disable selection.
         * This configuration will lock the selection model that the DataView uses.
         * @accessor
         */
        disableSelection: null,

        /**
         * @cfg {String} mode
         * Modes of selection.
         * Valid values are `'SINGLE'`, `'SIMPLE'`, and `'MULTI'`.
         * @accessor
         */
        mode: 'SINGLE',

        /**
         * @cfg {Boolean} allowDeselect
         * Allow users to deselect a record in a DataView, List or Grid. Only applicable when the Selectable's `mode` is
         * `'SINGLE'`.
         * @accessor
         */
        allowDeselect: false,

        /**
         * @cfg {Ext.data.Model} lastSelected
         * @private
         * @accessor
         */
        lastSelected: null,

        /**
         * @cfg {Ext.data.Model} lastFocused
         * @private
         * @accessor
         */
        lastFocused: null,

        /**
         * @cfg {Boolean} deselectOnContainerClick `true` to deselect current selection when the container body is
         * clicked.
         * @accessor
         */
        deselectOnContainerClick: true
    },

    modes: {
        SINGLE: true,
        SIMPLE: true,
        MULTI: true
    },

    selectableEventHooks: {
        addrecords: 'onSelectionStoreAdd',
        removerecords: 'onSelectionStoreRemove',
        updaterecord: 'onSelectionStoreUpdate',
        load: 'refreshSelection',
        refresh: 'refreshSelection'
    },

    constructor: function() {
        this.selected = new Ext.util.MixedCollection();
        this.callParent(arguments);
    },

    /**
     * @private
     */
    applyMode: function(mode) {
        mode = mode ? mode.toUpperCase() : 'SINGLE';
        // set to mode specified unless it doesnt exist, in that case
        // use single.
        return this.modes[mode] ? mode : 'SINGLE';
    },

    /**
     * @private
     */
    updateStore: function(newStore, oldStore) {
        var me = this,
            bindEvents = Ext.apply({}, me.selectableEventHooks, { scope: me });

        if (oldStore && Ext.isObject(oldStore) && oldStore.isStore) {
            if (oldStore.autoDestroy) {
                oldStore.destroy();
            }
            else {
                oldStore.un(bindEvents);
                if(newStore) {
                    newStore.un('clear', 'onSelectionStoreClear', this);
                }
            }
        }

        if (newStore) {
            newStore.on(bindEvents);
            newStore.onBefore('clear', 'onSelectionStoreClear', this);
            me.refreshSelection();
        }
    },

    /**
     * Selects all records.
     * @param {Boolean} silent `true` to suppress all select events.
     */
    selectAll: function(silent) {
        var me = this,
            selections = me.getStore().getRange();

        me.select(selections, true, silent);
    },

    /**
     * Deselects all records.
     */
    deselectAll: function(supress) {
        var me = this,
            selections = me.getStore().getRange();

        me.deselect(selections, supress);

        me.selected.clear();
        me.setLastSelected(null);
        me.setLastFocused(null);
    },

    // Provides differentiation of logic between MULTI, SIMPLE and SINGLE
    // selection modes.
    selectWithEvent: function(record) {
        var me = this,
            isSelected = me.isSelected(record);
        switch (me.getMode()) {
            case 'MULTI':
            case 'SIMPLE':
                if (isSelected) {
                    me.deselect(record);
                }
                else {
                    me.select(record, true);
                }
                break;
            case 'SINGLE':
                if (me.getAllowDeselect() && isSelected) {
                    // if allowDeselect is on and this record isSelected, deselect it
                    me.deselect(record);
                } else {
                    // select the record and do NOT maintain existing selections
                    me.select(record, false);
                }
                break;
        }
    },

    /**
     * Selects a range of rows if the selection model {@link Ext.mixin.Selectable#getDisableSelection} is not locked.
     * All rows in between `startRecord` and `endRecord` are also selected.
     * @param {Number} startRecord The index of the first row in the range.
     * @param {Number} endRecord The index of the last row in the range.
     * @param {Boolean} [keepExisting] `true` to retain existing selections.
     */
    selectRange: function(startRecord, endRecord, keepExisting) {
        var me = this,
            store = me.getStore(),
            records = [],
            tmp, i;

        if (me.getDisableSelection()) {
            return;
        }

        // swap values
        if (startRecord > endRecord) {
            tmp = endRecord;
            endRecord = startRecord;
            startRecord = tmp;
        }

        for (i = startRecord; i <= endRecord; i++) {
            records.push(store.getAt(i));
        }
        this.doMultiSelect(records, keepExisting);
    },

    /**
     * Adds the given records to the currently selected set.
     * @param {Ext.data.Model/Array/Number} records The records to select.
     * @param {Boolean} keepExisting If `true`, the existing selection will be added to (if not, the old selection is replaced).
     * @param {Boolean} suppressEvent If `true`, the `select` event will not be fired.
     */
    select: function(records, keepExisting, suppressEvent) {
        var me = this,
            record;

        if (me.getDisableSelection()) {
            return;
        }

        if (typeof records === "number") {
            records = [me.getStore().getAt(records)];
        }

        if (!records) {
            return;
        }

        if (me.getMode() == "SINGLE" && records) {
            record = records.length ? records[0] : records;
            me.doSingleSelect(record, suppressEvent);
        } else {
            me.doMultiSelect(records, keepExisting, suppressEvent);
        }
    },

    /**
     * Selects a single record.
     * @private
     */
    doSingleSelect: function(record, suppressEvent) {
        var me = this,
            selected = me.selected;

        if (me.getDisableSelection()) {
            return;
        }

        // already selected.
        // should we also check beforeselect?
        if (me.isSelected(record)) {
            return;
        }

        if (selected.getCount() > 0) {
            me.deselect(me.getLastSelected(), suppressEvent);
        }

        selected.add(record);
        me.setLastSelected(record);
        me.onItemSelect(record, suppressEvent);
        me.setLastFocused(record);

        if (!suppressEvent) {
            me.fireSelectionChange([record]);
        }
    },

    /**
     * Selects a set of multiple records.
     * @private
     */
    doMultiSelect: function(records, keepExisting, suppressEvent) {
        if (records === null || this.getDisableSelection()) {
            return;
        }
        records = !Ext.isArray(records) ? [records] : records;

        var me = this,
            selected = me.selected,
            ln = records.length,
            change = false,
            i = 0,
            record;

        if (!keepExisting && selected.getCount() > 0) {
            change = true;
            me.deselect(me.getSelection(), true);
        }
        for (; i < ln; i++) {
            record = records[i];
            if (keepExisting && me.isSelected(record)) {
                continue;
            }
            change = true;
            me.setLastSelected(record);
            selected.add(record);
            if (!suppressEvent) {
                me.setLastFocused(record);
            }

            me.onItemSelect(record, suppressEvent);
        }
        if (change && !suppressEvent) {
            this.fireSelectionChange(records);
        }
    },

    /**
     * Deselects the given record(s). If many records are currently selected, it will only deselect those you pass in.
     * @param {Number/Array/Ext.data.Model} records The record(s) to deselect. Can also be a number to reference by index.
     * @param {Boolean} suppressEvent If `true` the `deselect` event will not be fired.
     */
    deselect: function(records, suppressEvent) {
        var me = this;

        if (me.getDisableSelection()) {
            return;
        }

        records = Ext.isArray(records) ? records : [records];

        var selected = me.selected,
            change   = false,
            i        = 0,
            store    = me.getStore(),
            ln       = records.length,
            record;

        for (; i < ln; i++) {
            record = records[i];

            if (typeof record === 'number') {
                record = store.getAt(record);
            }

            if (selected.remove(record)) {
                if (me.getLastSelected() == record) {
                    me.setLastSelected(selected.last());
                }
                change = true;
            }
            if (record) {
                me.onItemDeselect(record, suppressEvent);
            }
        }

        if (change && !suppressEvent) {
            me.fireSelectionChange(records);
        }
    },

    /**
     * Sets a record as the last focused record. This does NOT mean
     * that the record has been selected.
     * @param {Ext.data.Record} newRecord
     * @param {Ext.data.Record} oldRecord
     */
    updateLastFocused: function(newRecord, oldRecord) {
        this.onLastFocusChanged(oldRecord, newRecord);
    },

    fireSelectionChange: function(records) {
        var me = this;
        //<deprecated product=touch since=2.0>
        me.fireAction('beforeselectionchange', [me], function() {
        //</deprecated>
            me.fireAction('selectionchange', [me, records], 'getSelection');
        //<deprecated product=touch since=2.0>
        });
        //</deprecated>
    },

    /**
     * Returns an array of the currently selected records.
     * @return {Array} An array of selected records.
     */
    getSelection: function() {
        return this.selected.getRange();
    },

    /**
     * Returns `true` if the specified row is selected.
     * @param {Ext.data.Model/Number} record The record or index of the record to check.
     * @return {Boolean}
     */
    isSelected: function(record) {
        record = Ext.isNumber(record) ? this.getStore().getAt(record) : record;
        return this.selected.indexOf(record) !== -1;
    },

    /**
     * Returns `true` if there is a selected record.
     * @return {Boolean}
     */
    hasSelection: function() {
        return this.selected.getCount() > 0;
    },

    /**
     * @private
     */
    refreshSelection: function() {
        var me = this,
            selections = me.getSelection();

        me.deselectAll(true);
        if (selections.length) {
            me.select(selections, false, true);
        }
    },

    // prune records from the SelectionModel if
    // they were selected at the time they were
    // removed.
    onSelectionStoreRemove: function(store, records) {
        var me = this,
            selected = me.selected,
            ln = records.length,
            record, i;

        if (me.getDisableSelection()) {
            return;
        }

        for (i = 0; i < ln; i++) {
            record = records[i];
            if (selected.remove(record)) {
                if (me.getLastSelected() == record) {
                    me.setLastSelected(null);
                }
                if (me.getLastFocused() == record) {
                    me.setLastFocused(null);
                }
                me.fireSelectionChange([record]);
            }
        }
    },

    onSelectionStoreClear: function(store) {
        var records = store.getData().items;
        this.onSelectionStoreRemove(store, records);
    },

    /**
     * Returns the number of selections.
     * @return {Number}
     */
    getSelectionCount: function() {
        return this.selected.getCount();
    },

    onSelectionStoreAdd: Ext.emptyFn,
    onSelectionStoreUpdate: Ext.emptyFn,
    onItemSelect: Ext.emptyFn,
    onItemDeselect: Ext.emptyFn,
    onLastFocusChanged: Ext.emptyFn,
    onEditorKey: Ext.emptyFn
}, function() {
    /**
     * Selects a record instance by record instance or index.
     * @member Ext.mixin.Selectable
     * @method doSelect
     * @param {Ext.data.Model/Number} records An array of records or an index.
     * @param {Boolean} keepExisting
     * @param {Boolean} suppressEvent Set to `false` to not fire a select event.
     * @deprecated 2.0.0 Please use {@link #select} instead.
     */

    /**
     * Deselects a record instance by record instance or index.
     * @member Ext.mixin.Selectable
     * @method doDeselect
     * @param {Ext.data.Model/Number} records An array of records or an index.
     * @param {Boolean} suppressEvent Set to `false` to not fire a deselect event.
     * @deprecated 2.0.0 Please use {@link #deselect} instead.
     */

    /**
     * Returns the selection mode currently used by this Selectable.
     * @member Ext.mixin.Selectable
     * @method getSelectionMode
     * @return {String} The current mode.
     * @deprecated 2.0.0 Please use {@link #getMode} instead.
     */

    /**
     * Returns the array of previously selected items.
     * @member Ext.mixin.Selectable
     * @method getLastSelected
     * @return {Array} The previous selection.
     * @deprecated 2.0.0
     */

    /**
     * Returns `true` if the Selectable is currently locked.
     * @member Ext.mixin.Selectable
     * @method isLocked
     * @return {Boolean} True if currently locked
     * @deprecated 2.0.0 Please use {@link #getDisableSelection} instead.
     */

    /**
     * This was an internal function accidentally exposed in 1.x and now deprecated. Calling it has no effect
     * @member Ext.mixin.Selectable
     * @method setLastFocused
     * @deprecated 2.0.0
     */

    /**
     * Deselects any currently selected records and clears all stored selections.
     * @member Ext.mixin.Selectable
     * @method clearSelections
     * @deprecated 2.0.0 Please use {@link #deselectAll} instead.
     */

    /**
     * Returns the number of selections.
     * @member Ext.mixin.Selectable
     * @method getCount
     * @return {Number}
     * @deprecated 2.0.0 Please use {@link #getSelectionCount} instead.
     */

    /**
     * @cfg {Boolean} locked
     * @inheritdoc Ext.mixin.Selectable#disableSelection
     * @deprecated 2.0.0 Please use {@link #disableSelection} instead.
     */
});
