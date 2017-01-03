Ext.define('AM.controller.Users', {
    extend: 'Ext.app.Controller',

    stores: [
        'Users@AM.store'
    ],

    models: [
        'User@AM.model'
    ],

    views: [
        'Edit@AM.view.user',
        'List@AM.view.user'
    ],

    refs: [
        {
            ref: 'usersPanel',
            selector: 'panel'
        }
    ],

    init: function() {
        this.control({
            'viewport > userlist': {
                itemdblclick: this.editUser
            },
            'useredit button[action=save]': {
                click: this.updateUser
            }
        });
    },

    editUser: function(grid, record) {
        var edit = Ext.create('AM.view.user.Edit').show();

        edit.down('form').loadRecord(record);
    },

    updateUser: function(button) {
        var win    = button.up('window'),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();

        record.set(values);
        win.close();
        this.getUsersStore().sync();
    }
});
