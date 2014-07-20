/**
 * This ViewModel provides data for the ChildSession view.
 */
Ext.define('KitchenSink.view.binding.ChildSessionModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.binding.childsession',

    stores: {
        // Define a store of Customer records that links to the Session.
        customers: {
            model: 'Customer',
            autoLoad: true,
            session: true
        }
    }
});
