Ext.define('SimpleTasks.Application', {
    name: 'SimpleTasks',
    requires: [
        'SimpleTasks.Settings'
    ],

    extend: 'Ext.app.Application',

    controllers: [
        'Lists',
        'Tasks'
    ],

    launch: function() {
        if (SimpleTasks.Settings.useLocalStorage && !Ext.supports.LocalStorage) {
            Ext.Msg.alert('Simple Tasks is configured to use HTML5 Local Storage, but your browser does not support Local Storage');
        }
    }
});
