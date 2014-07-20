Ext.define('ExecDashboard.view.quarterly.QuarterlyController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.quarterly',

    init: function (view) {
        // We provide the updater for the activeState config of our View.
        view.updateActiveState = this.updateActiveState.bind(this);
    },

    menuItemClick: function (button, menuitem) {
        var view = this.getView();
        view.setActiveState(menuitem.text);
    },

    onQuarterlyStatementClick: function(dv, record, item, idx, e, eOpts) {
        //TODO we probably need to use <a> tag for mobile to work
        window.open(record.get('url'));
    },

    updateActiveState: function (activeState) {
        var viewModel = this.getViewModel();

        viewModel.set('company', activeState);

        this.fireEvent('changeroute', this, 'quarterly/' + activeState);
    }
});
