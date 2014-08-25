/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-05-16 14:36:50 (f9be68accb407158ba2b1be2c226a6ce1f649314)
*/
/**
 * Provides a registry of available Plugin classes indexed by a mnemonic code known as the Plugin's ptype.
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
 */
Ext.define('Ext.PluginManager', {
    extend: 'Ext.AbstractManager',
    alternateClassName: 'Ext.PluginMgr',
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
        var result;

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
                result = Ext.ClassManager.getByAlias(('plugin.' + (config.ptype || defaultType)));

                if (typeof result === 'function') {
                    result = new result(config);
                }
            }
        }

        // If we come out with a non-null plugin, ensure that any setCmp is called once.
        if (result && host && result.setCmp && !result.setCmpCalled) {
            result.setCmp(host);
            result.setCmpCalled = true;
        }
        return result;
    },

    /**
     * Returns all plugins registered with the given type. Here, 'type' refers to the type of plugin, not its ptype.
     * @param {String} type The type to search for
     * @param {Boolean} defaultsOnly True to only return plugins of this type where the plugin's isDefault property is
     * truthy
     * @return {Ext.AbstractPlugin[]} All matching plugins
     */
    findByType: function(type, defaultsOnly) {
        var matches = [],
            types   = this.types,
            name,
            item;

        for (name in types) {
            if (!types.hasOwnProperty(name)) {
                continue;
            }
            item = types[name];

            if (item.type == type && (!defaultsOnly || (defaultsOnly === true && item.isDefault))) {
                matches.push(item);
            }
        }

        return matches;
    }
}, function() {
    /**
     * Shorthand for {@link Ext.PluginManager#registerType}
     * @param {String} ptype The ptype mnemonic string by which the Plugin class
     * may be looked up.
     * @param {Function} cls The new Plugin class.
     * @member Ext
     * @method preg
     */
    Ext.preg = function() {
        return Ext.PluginManager.registerType.apply(Ext.PluginManager, arguments);
    };
});
