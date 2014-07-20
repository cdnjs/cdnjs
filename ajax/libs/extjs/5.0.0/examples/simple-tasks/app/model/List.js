Ext.define('SimpleTasks.model.List', {
    extend: 'Ext.data.TreeModel',
    requires:[
        'Ext.data.proxy.LocalStorage',
        'Ext.data.proxy.Ajax'
    ],
    fields: [
        { name: 'id', type: 'int' },
        { name: 'name' },
        // if we are using local storage, we need to persist the index field so the ordering of tree nodes will be preserved
        {name: 'index', type: 'int', defaultValue: null, persist: !!SimpleTasks.Settings.useLocalStorage}
    ],

    proxy: SimpleTasks.Settings.useLocalStorage ? {
        type: 'localstorage',
        id: 'SimpleTasks-List'
    } : {
        type: 'ajax',
        api: {
            create: 'php/list/create.php',
            read: 'php/list/read.php',
            update: 'php/list/update.php',
            destroy: 'php/list/delete.php'
        },

        reader: {
            type: 'json',
            messageProperty: 'message'
        }
    }
});