YUI.add('plugin', function(Y) {

    /**
     * Provides the base Plugin class, which plugin developers should extend, when creating custom plugins
     *
     * @module plugin
     */

    /**
     * The base class for all Plugin instances.
     *
     * @class Plugin.Base 
     * @extends Base
     * @param {Object} config Configuration object with property name/value pairs.
     */
    function Plugin(config) {
        Plugin.superclass.constructor.apply(this, arguments);
    }

    /**
     * Object defining the set of attributes supported by the Plugin.Base class
     * 
     * @property Plugin.Base.ATTRS
     * @type Object
     * @static
     */
    Plugin.ATTRS = {

        /**
         * The plugin's host object.
         *
         * @attribute host
         * @writeonce
         * @type Plugin.Host
         */
        host : {
            writeOnce: true
        }
    };

    /**
     * The string identifying the Plugin.Base class. Plugins extending
     * Plugin.Base should set their own NAME value.
     *
     * @property Plugin.Base.NAME
     * @type String
     * @static
     */
    Plugin.NAME = 'plugin';

    /**
     * The name of the property the the plugin will be attached to
     * when plugged into a Plugin Host. Plugins extending Plugin.Base,
     * should set their own NS value.
     *
     * @property Plugin.NS
     * @type String
     * @static
     */
    Plugin.NS = 'plugin';

    Y.extend(Plugin, Y.Base, {

        /**
         * The list of event handles for event listeners or AOP injected methods
         * applied by the plugin to the host object.
         *
         * @property _handles
         * @private
         * @type Array
         * @value null
         */
        _handles: null,

        /**
         * Initializer lifecycle implementation.
         *
         * @method initializer
         * @param {Object} config Configuration object with property name/value pairs.
         */
        initializer : function(config) {
            this._handles = [];
            if (!this.get("host")) { Y.log('No host defined for plugin ' + this, 'warn', 'Plugin');}
            Y.log('Initializing: ' + this.constructor.NAME, 'info', 'Plugin');
        },

        /**
         * Destructor lifecycle implementation.
         *
         * Removes any event listeners or injected methods applied by the Plugin
         *
         * @method destructor
         */
        destructor: function() {
            // remove all handles
            if (this._handles) {
                for (var i = 0, l = this._handles.length; i < l; i++) {
                   this._handles[i].detach();
                }
            }
        },

        /**
         * Listens for the "on" moment of events fired by the host, 
         * or injects code "before" a given method on the host.
         *
         * @method doBefore
         *
         * @param sFn {String} The event to listen for, or method to inject logic before.
         * @param fn {Function} The handler function. For events, the "on" moment listener. For methods, the function to execute before the given method is executed.
         * @param context {Object} An optional context to call the handler with. The default context is the plugin instance.
         * @return handle {EventHandle} The detach handle for the handler.
         */
        doBefore: function(sFn, fn, context) {
            var host = this.get("host"),
                handle;

            context = context || this;

            if (sFn in host) { // method
                handle = Y.Do.before(fn, host, sFn, context);
            } else if (host.on) { // event
                handle = host.on(sFn, fn, context);
            }

            this._handles.push(handle);
            return handle;
        },

        /**
         * Listens for the "after" moment of events fired by the host, 
         * or injects code "after" a given method on the host.
         *
         * @method doAfter
         *
         * @param sFn {String} The event to listen for, or method to inject logic after.
         * @param fn {Function} The handler function. For events, the "after" moment listener. For methods, the function to execute after the given method is executed.
         * @param context {Object} An optional context to call the handler with. The default context is the plugin instance.
         * @return handle {EventHandle} The detach handle for the handler.
         */
        doAfter: function(sFn, fn, context) {
            var host = this.get("host"),
                handle;

            context = context || this;

            if (sFn in host) { // method
                handle = Y.Do.after(fn, host, sFn, context);
            } else if (host.after) { // event
                handle = host.after(sFn, fn, context);
            }

            this._handles.push(handle);
            return handle;
        },

        toString: function() {
            return this.constructor.NAME + '[' + this.constructor.NS + ']';
        }
    });

    Y.namespace("Plugin").Base = Plugin;


}, '@VERSION@' ,{requires:['base-base']});
