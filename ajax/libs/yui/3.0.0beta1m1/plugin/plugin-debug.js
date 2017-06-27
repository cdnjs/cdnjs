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

        var proto = {
            _handles: null,

            /**
             * Initializer lifecycle implementation.
             * 
             * @method initializer
             * @param {Object} config Configuration object literal for the plugin
             */
            initializer : function(config) {
                config = config || {};

                if (config.owner) {
                    this._owner = config.owner;
                } else {
                    Y.log('no owner defined for plugin ' + this, 'warn', 'Plugin');
                }

                this._handles = [];

                Y.log('Initializing: ' + this.constructor.NAME, 'info', 'Plugin');
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
             * Listens for events and methods fired by the owner widget.
             * The handler is called before the event handler or method is called.
             * @method doBefore
             * @param sFn The event of method to listen for.
             * @param fn The handler function to call when the listener fires.
             * @param context An optional context to call the handler with.
             * Default context is the plugin instance.
             * @return Handle A handle that can be used to detach the handler (e.g. "handle.detach()").
             */
            doBefore: function(sFn, fn, context) {
                var owner = this._owner,
                    handle;

                context = context || this;

                if (sFn in owner) { // method
                    handle = Y.Do.before(fn, this._owner, sFn, context);
                } else if (owner.on) { // event
                    handle = owner.on(sFn, fn, context);
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
                var owner = this._owner,
                    handle;

                context = context || this;

                if (sFn in owner) { // method
                    handle = Y.Do.after(fn, this._owner, sFn, context);
                } else if (owner.after) { // event
                    handle = owner.after(sFn, fn, context);
                }

                this._handles.push(handle);
                return handle;
            },

            toString: function() {
                return this.constructor.NAME + '[' + this.constructor.NS + ']';
            }
        };

        Y.extend(Plugin, Y.Base, proto);
        Y.Plugin = Plugin;



}, '@VERSION@' ,{requires:['base']});
