Ext.define('KitchenSink.view.binding.FormulasModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.binding-formulas',

    formulas: {
        quad: function (get) {
            return get('twice') * 2;
        },

        // This accomplishes the same thing as above but using object syntax.
        twice: {
            get: function (get) {
                return get('x') * 2;
            }
        }
    }
});
