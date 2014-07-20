/**
 * @class SimpleTasks.ux.ReminderColumn
 * @extends Ext.grid.column.Column
 * A grid column for selecting reminder times
 */
Ext.define('SimpleTasks.ux.ReminderColumn', {
    extend: 'Ext.grid.column.Column',
    xtype: 'remindercolumn',

    config: {
        /**
         * @cfg {String} menuPosition
         * Positing to show the menu relative to the reminder icon.
         * Alignment position as used by Ext.Element.getAlignToXY
         * Defaults to 'tl-bl'
         */
        menuPosition: 'tl-bl'
    },

    tdCls: Ext.baseCSSPrefix + 'grid-cell-remindercolumn',

    /**
     * @event select
     * Fires when a reminder time is selected from the dropdown menu
     * @param {Ext.data.Model} record    The underlying record of the row that was clicked to show the reminder menu
     * @param {String|Number} value      The value that was selected
     */

    /**
     * initializes the dropdown menu
     * @private
     */
    initMenu: function() {
        var me = this,
            items = [];

        function createItem(text, value) {
            return {
                text: text,
                listeners: {
                    click: Ext.bind(me.handleMenuItemClick, me, [value], true)
                }
            }
        }

        items.push(createItem('No Reminder'));
        items.push({xtype: 'menuseparator'});
        items.push(createItem('1 day before', 1));
        items.push(createItem('2 days before', 2));
        items.push(createItem('3 days before', 3));
        items.push(createItem('1 week before', 7));
        items.push(createItem('2 weeks before', 14));
        items.push(createItem('Set Default Time...', 'set'));

        me.menu = Ext.create('Ext.menu.Menu', {
            plain: true,
            items:  items
        });
    },

    /**
     * Handles a click on a menu item
     * @private
     * @param {Ext.menu.Item} menuItem
     * @param {Ext.EventObject} e
     * @param {Object} options
     * @param {String|Number} value
     */
    handleMenuItemClick: function(menuItem, options, e, value) {
        this.fireEvent('select', this.record, value);
    },

    /**
     * Process and refire events routed from the GridView's processEvent method.
     * @private
     */
    processEvent: function(type, view, cell, rowIndex, colIndex, e) {
        var me = this,
            cssPrefix = Ext.baseCSSPrefix,
            target = Ext.get(e.getTarget());

        if (target.hasCls(cssPrefix + 'grid-reminder')) {
            if(type === 'click') {
                if(!me.menu) {
                    me.initMenu();
                }
                me.record = view.store.getAt(rowIndex);
                me.menu.showBy(target, me.menuPosition);
            }
        } else {
            return me.callParent(arguments);
        }
    },

    /**
     * Renderer for the reminder column
     * @private
     * @param {Number} value
     * @param {Object} metaData
     * @param {SimpleTasks.model.Task} task
     * @param {Number} rowIndex
     * @param {Number} colIndex
     * @param {SimpleTasks.store.Tasks} store
     * @param {Ext.grid.View} view
     */
    renderer : function(value, metaData, task, rowIndex, colIndex, store, view){
        var cssPrefix = Ext.baseCSSPrefix,
            cls = [cssPrefix + 'grid-reminder'];

        if(task.get('done') || !task.get('due')) {
            // if the task is done or has no due date, a reminder cannot be set
            return '';
        }

        if (!value) {
            cls.push(cssPrefix + 'grid-reminder-empty');
        }
        return '<div class="' + cls.join(' ') + '"></div>';
    }
});
