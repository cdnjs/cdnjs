YUI.add('plugin', function(Y) {

/**
 * Provides the base Plugin class for building widget plugins. 
 *
 * @module plugin
 */

        /**
         * Plugin provides a base class for all Plugin classes.
         *
         * @class Plugin 
         * @extends Base
         * @param {Object} config The configuration object for the
         * plugin.
         */
        function Plugin(config) {
            Plugin.superclass.constructor.apply(this, arguments);
        }

        Plugin.ATTRS = {

            /**
             * The plugin's host object.
             *
             * @attribute host
             * @writeOnce
             * @type PluginHost
             */
            host : {
                writeOnce: true
            }
        };

        /**
         * Static property provides a string to identify the class.
         *
         * @property Plugin.NAME
         * @type {String}
         * @static
         */
        Plugin.NAME = 'plugin';

        /**
         * Static property provides the namespace the plugin will be
         * registered under.
         *
         * @property Plugin.NS
         * @type {String}
         * @static
         */
        Plugin.NS = 'plugin';

        Y.extend(Plugin, Y.Base, {

            _handles: null,

            /**
             * Initializer lifecycle implementation.
             * 
             * @method initializer
             * @param {Object} config Configuration object literal for the plugin
             */
            initializer : function(config) {
                this._handles = [];
            },

            /**
             * desctructor lifecycle implementation.
             * 
             * Removes any listeners attached by the Plugin and restores
             * and over-ridden methods.
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
             * Listens for events and methods fired by the host.
             * The handler is called before the event handler or method is called.
             * @method doBefore
             * @param sFn The event of method to listen for.
             * @param fn The handler function to call when the listener fires.
             * @param context An optional context to call the handler with.
             * Default context is the plugin instance.
             * @return Handle A handle that can be used to detach the handler (e.g. "handle.detach()").
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
             * Listens for events and methods fired by the owner widget.
             * The handler is called after the event handler or method is called.
             * @method doAfter
             * @param sFn The event of method to listen for.
             * @param fn The handler function to call when the listener fires.
             * @param context An optional context to call the handler with.
             * Default context is the plugin instance.
             * @return Handle A handle that can be used to detach the handler (e.g. "handle.detach()").
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



}, '@VERSION@' ,{requires:['base']});
