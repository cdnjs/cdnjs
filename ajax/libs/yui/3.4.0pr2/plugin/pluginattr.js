YUI.add('pluginattr', function(Y) {

var Lang       = Y.Lang,
    isString   = Lang.isString,
    isObject   = Lang.isObject,
    isFunction = Lang.isFunction;

/**
 * <p>Register a Plugin with an activation attribute on a host class.
 * Setting this attribute at construction or at run time will cause the
 * Plugin to be plugged into the instance.  For example:</p>
 *
 * <pre><code>
 * Y.Plugin.addHostAttr('sortable', Y.DataTable, Y.Plugin.DTSort);
 * 
 * var dt = new Y.DataTable({ sortable: true }); // plugs DTSort
 * dt.set('sortable', false); // unplugs DTSort
 * </code></pre>
 *
 * <p>To support enhancing host instance behavior when the plugin is
 * use()d after the host instance is instantiated, you can also pass the
 * instance as the second parameter.</p>
 *
 * <p>To allow custom (de)activation behavior, pass an attribute
 * configuration object instead of the plugin class as the third parameter.
 * For example, to translate special activation values to meaningful plugin
 * configuration, override the setter.  To have attribute access respond
 * with more useful (truthy) data, override the getter.</p>
 *
 * <p>Note: the setter should return what was passed to it or
 * <code>Y.Attribute.INVALID_VALUE</code>.</p>
 *
 * <pre><code>
 * Y.Plugin.addHostAttr('filters', Y.Console, {
 *      setter: function (val, attr) {
 *          var method = (val === false) ? 'unplug' : 'plug',
 *              config = Y.Lang.isObject(val) ? val : {};
 *
 *          if (Y.Lang.isString(val) || Y.Lang.isArray(val)) {
 *              config = {
 *                  defaultVisibility: false,
 *                  category: Y.Array.hash(Y.Array(val));
 *              };
 *          }
 *          
 *          config.host = this;
 *          this[method](Y.Plugin.ConsoleFilters, config);
 *
 *         return val;
 *     }
 * });
 *
 * var con = new Y.Console({ filters: ['warn', 'error'] });</code></pre>
 *
 * <p>The host class must have a static ATTRS collection.</p>
 *
 * @method Plugin.addHostAttr
 * @param name {String} The attribute name to trigger plug and unplug
 * @param host {Function|Object} The class or instance to receive the
 *                               triggering attribute
 * @param plugin {Function|Object} The plugin class or getter/setter config
 * @param force {Boolean} Redefine the existing host attribue if found
 * @static
 */
Y.Plugin.addHostAttr = function (name, host, plugin, force) {
    if (!isString(name) || !isObject(host) || !isObject(plugin)) {
        return false;
    }

    var attrDef = { lazyAdd: false };

    if (isFunction(plugin)) {
        attrDef.setter = function (val, attr) {
            var method = (val !== false) ? 'plug' : 'unplug',
                ret    = Y.Attribute.INVALID_VALUE,
                conf   = (isObject(val)) ? val : {};

            // For now, disallow subattribute as a trigger or
            // plugin attribute setter
            if (attr.indexOf('.') === -1) {
                ret = val;
                conf.host = this;

                this[method](plugin, conf);
            }

            return ret;
        };
    } else {
        Y.mix(attrDef, plugin, true);
    }

    if (isFunction(host)) {
        if (host.ATTRS && (force || !host.ATTRS[name])) {
            host.ATTRS[name] = attrDef;
        }
    } else if (host.constructor.ATTRS && host.addAttr &&
            host._state && (force || !host.attrAdded(name))) {
        host.addAttr(name, attrDef, false);
    }

    return true;
};


}, '@VERSION@' ,{requires:['plugin']});
