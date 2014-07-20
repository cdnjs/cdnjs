Ext.define('SimpleTasks.store.Tasks', {
    extend: 'Ext.data.Store',
    model: 'SimpleTasks.model.Task',
    pageSize: 0, //disable paging
    grouper: {
        property: 'due',
        // Use the group string here so we don't need to worry about time
        // during any grouping based comparisons
        groupFn: function(rec){
            return Ext.Date.format(rec.get('due'), 'Y-m-d');
        }
    }
});