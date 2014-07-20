/**
 * This class manages the login process.
 */
Ext.define('Ticket.LoginManager', {
    config: {
        /**
         * @cfg {Class} model
         * The model class from which to create the "user" record from the login.
         */
        model: null,

        /**
         * @cfg {Ext.data.Session} session
         */
        session: null
    },

    constructor: function (config) {
        this.initConfig(config);
    },

    applyModel: function(model) {
        return model && Ext.data.schema.Schema.lookupEntity(model);
    },

    login: function(options) {
        Ext.Ajax.request({
            url: '/authenticate',
            method: 'GET',
            params: options.data,
            scope: this,
            callback: this.onLoginReturn,
            original: options
        });
    },
    
    onLoginReturn: function(options, success, response) {
        options = options.original;
        var session = this.getSession(),
            resultSet;
        
        if (success) {
            resultSet = this.getModel().getProxy().getReader().read(response, {
                recordCreator: session ? session.recordCreator : null
            });
                
            if (resultSet.getSuccess()) {
                Ext.callback(options.success, options.scope, [resultSet.getRecords()[0]]);
                return;
            }
        }

        Ext.callback(options.failure, options.scope, [response, resultSet]);
    }
});
