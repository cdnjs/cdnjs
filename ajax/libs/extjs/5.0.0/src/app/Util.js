/**
 * @private 
 * @class Ext.app.Util
 */
Ext.define('Ext.app.Util', {
}, function() {
    Ext.apply(Ext.app, {
        namespaces: {
            Ext: {}
        },

        /**
        * Adds namespace(s) to known list.
        * @private
        *
        * @param {String/String[]} namespace
        */
        addNamespaces: function(namespace) {
            var namespaces = Ext.app.namespaces,
                i, l;

            if (!Ext.isArray(namespace)) {
                namespace = [namespace];
            }

            for (i = 0, l = namespace.length; i < l; i++) {
                namespaces[namespace[i]] = true;
            }
        },

        /**
        * @private Clear all namespaces from known list.
        */
        clearNamespaces: function() {
            Ext.app.namespaces = {};
        },

        /**
        * Get namespace prefix for a class name.
        * @private
        *
        * @param {String} className
        *
        * @return {String} Namespace prefix if it's known, otherwise undefined
        */
        getNamespace: function(className) {
            var namespaces    = Ext.apply({}, Ext.ClassManager.paths, Ext.app.namespaces),
                deepestPrefix = '',
                prefix;

            for (prefix in namespaces) {
                if (namespaces.hasOwnProperty(prefix)    &&
                    prefix.length > deepestPrefix.length &&
                    (prefix + '.' === className.substring(0, prefix.length + 1))) {
                    deepestPrefix = prefix;
                }
            }

            return deepestPrefix === '' ? undefined : deepestPrefix;
        }
    });
});