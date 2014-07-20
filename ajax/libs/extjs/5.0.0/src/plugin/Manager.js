/**
 * Creates plugin instances.
 *
 * A plugin may be specified simply as a *config object* as long as the correct `ptype` is specified:
 *
 *     {
 *         ptype: 'gridviewdragdrop',
 *         dragText: 'Drag and drop to reorganize'
 *     }
 *
 * Or just use the ptype on its own:
 *
 *     'gridviewdragdrop'
 *
 * Alternatively you can instantiate the plugin with Ext.create:
 *
 *     Ext.create('Ext.grid.plugin.DragDrop', {
 *         dragText: 'Drag and drop to reorganize'
 *     })
 * @private
 */
Ext.define('Ext.plugin.Manager', {
    alternateClassName: [
        'Ext.PluginManager',
        'Ext.PluginMgr'
    ],

    singleton: true,
    typeName: 'ptype',

    /**
     * Creates a new Plugin from the specified config object using the config object's ptype to determine the class to
     * instantiate.
     * @param {Object} config A configuration object for the Plugin you wish to create.
     * @param {Function} defaultType (optional) The constructor to provide the default Plugin type if the config object does not
     * contain a `ptype`. (Optional if the config contains a `ptype`).
     * @return {Ext.Component} The newly instantiated Plugin.
     */
    create : function(config, defaultType, host) {
        var result, type;

        if (config.init) {
            result = config;
        } else {
            // Inject the host into the config is we know the host
            if (host) {
                config = Ext.apply({}, config); // copy since we are going to modify
                config.cmp = host;
            }
            // Grab the host ref if it was configured in
            else {
                host = config.cmp;
            }

            if (config.xclass) {
                result = Ext.create(config);
            } else {
                // Lookup the class from the ptype and instantiate unless its a singleton
                type = 'plugin.' + (config.ptype || defaultType);
                result = Ext.ClassManager.instantiateByAlias(type, config);
            }
        }

        // If we come out with a non-null plugin, ensure that any setCmp is called once.
        if (result && host && result.setCmp && !result.setCmpCalled) {
            result.setCmp(host);
            result.setCmpCalled = true;
        }
        return result;
    }
});
