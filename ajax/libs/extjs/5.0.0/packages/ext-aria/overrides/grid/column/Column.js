Ext.define('Ext.aria.grid.column.Column', {
    override: 'Ext.grid.column.Column',
    
    requires: [
        'Ext.aria.grid.header.Container'
    ],
    
    setSortState: function(state, skipClear, initial) {
        var me = this,
            oldSortState = me.sortState,
            ariaStates = {
                ASC: 'ascending',
                DESC: 'descending'
            };
        
        me.callParent(arguments);
        
        if (me.sortState !== oldSortState) {
            me.ariaUpdate({ 'aria-sort': ariaStates[state] });
        }
    }
});
