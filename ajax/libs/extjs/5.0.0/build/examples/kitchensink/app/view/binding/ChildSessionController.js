/**
 * This controller manages the ChildSession view.
 */
Ext.define('KitchenSink.view.binding.ChildSessionController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.binding.childsession',

    requires: [
        'Ext.window.Window',
        'KitchenSink.view.binding.ChildSessionForm'
    ],

    onSessionChangeClick: function () {
        var changes = this.getView().getSession().getChanges();
        if (changes !== null) {
            new Ext.window.Window({
                autoShow: true,
                title: 'Session Changes',
                modal: true,
                width: 600,
                height: 400,
                layout: 'fit',
                items: {
                    xtype: 'textarea',
                    value: JSON.stringify(changes, null, 4)
                }
            });
        } else {
            Ext.Msg.alert('No Changes', 'There are no changes to the session.');
        }
    },

    onRemoveClick: function (button) {
        var orders = this.lookupReference('orders').getStore();
        orders.remove(button.getWidgetRecord());
    },

    onEditClick: function (button) {
        var view = this.getView();

        this.dialog = view.add({
            xtype: 'binding-child-session-form',

            viewModel: {
                // This creates a copy in the child session. We use "links" here
                // instead of "data" because "data" would simply hold the record
                // but "links" creates a linked copy.
                links: {
                    theCustomer: button.getWidgetRecord()
                }
            },

            // Creates a child session that will spawn from the current session
            // of this view.
            session: true
        });

        this.dialog.show();
    },

    onSaveClick: function () {
        // Save the changes pending in the dialog's child session back to the
        // parent session.
        this.dialog.getSession().save();

        this.onCancelClick();
    },

    onCancelClick: function () {
        this.getView().remove(this.dialog);
        this.dialog = null;
    }
});
