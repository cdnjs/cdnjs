YUI.add('pluginhost', function(Y) {

    /**
     * Provides the augmentable PluginHost interface, which can be added to any class.
     * @module pluginhost
     */

    /**
     * <p>
     * An augmentable class, which provides the augmented class with the ability to host plugins.
     * It adds <a href="#method_plug">plug</a> and <a href="#method_unplug">unplug</a> methods to the augmented class, which can 
     * be used to add or remove plugins from instances of the class.
     * </p>
     *
     * <p>Plugins can also be added through the constructor configuration object passed to the host class' constructor using
     * the "plugins" property. Supported values for the "plugins" property are those defined by the <a href="#method_plug">plug</a> method. 
     * 
     * For example the following code would add the AnimPlugin and IOPlugin to Overlay (the plugin host):
     * <xmp>
     * var o = new Overlay({plugins: [ AnimPlugin, {fn:IOPlugin, cfg:{section:"header"}}]});
     * </xmp>
     * </p>
     * <p>
     * Plug.Host's protected <a href="#method_initPlugins">_initPlugins</a> and <a href="#method_destroyPlugins">_destroyPlugins</a> 
     * methods should be invoked by the host class at the appropriate point in the host's lifecyle.  
     * </p>
     *
     * @class Plugin.Host
     */

    var L = Y.Lang;

    function PluginHost() {
        this._plugins = {};
    }

    PluginHost.prototype = {

        /**
         * Adds a plugin to the host object. This will instantiate the 
         * plugin and attach it to the configured namespace on the host object.
         *
         * @method plug
         * @chainable
         * @param p {Function | Object |Array} Accepts the plugin class, or an 
         * object with a "fn" property specifying the plugin class and 
         * a "cfg" property specifying the configuration for the Plugin.
         * <p>
         * Additionally an Array can also be passed in, with the above function or 
         * object values, allowing the user to add multiple plugins in a single call.
         * </p>
         * @param config (Optional) If the first argument is the plugin class, the second argument
         * can be the configuration for the plugin.
         * @return {Base} A reference to the host object
         */

        plug: function(p, config) {
            if (p) {
                if (L.isFunction(p)) {
                    this._plug(p, config);
                } else if (L.isArray(p)) {
                    for (var i = 0, ln = p.length; i < ln; i++) {
                        this.plug(p[i]);
                    }
                } else {
                    this._plug(p.fn, p.cfg);
                }
            }
            return this;
        },

        /**
         * Removes a plugin from the host object. This will destroy the 
         * plugin instance and delete the namepsace from the host object. 
         *
         * @method unplug
         * @param {String | Function} plugin The namespace of the plugin, or the plugin class with the static NS namespace property defined. If not provided,
         * all registered plugins are unplugged.
         * @return {Base} A reference to the host object
         * @chainable
         */
        unplug: function(plugin) {
            if (plugin) {
                this._unplug(plugin);
            } else {
                var ns;
                for (ns in this._plugins) {
                    if (this._plugins.hasOwnProperty(ns)) {
                        this._unplug(ns);
                    }
                }
            }
            return this;
        },

        /**
         * Determines if a plugin has plugged into this host.
         *
         * @method hasPlugin
         * @param {String} ns The plugin's namespace
         * @return {boolean} returns true, if the plugin has been plugged into this host, false otherwise.
         */
        hasPlugin : function(ns) {
            return (this._plugins[ns] && this[ns]);
        },

        /**
         * Initializes static plugins registered on the host (using the
         * Base.plug static method) and any plugins passed to the 
         * instance through the "plugins" configuration property.
         *
         * @method _initPlugins
         * @param {Config} config The configuration object with property name/value pairs.
         * @private
         */
        _initPlugins: function(config) {
            this._plugins = this._plugins || {};

            // Class Configuration
            var classes = (this._getClasses) ? this._getClasses() : [this.constructor],
                plug = [],
                unplug = {},
                constructor, i, classPlug, classUnplug, pluginClassName;

            //TODO: Room for optimization. Can we apply statically/unplug in same pass?
            for (i = classes.length - 1; i >= 0; i--) {
                constructor = classes[i];

                classUnplug = constructor._UNPLUG;
                if (classUnplug) {
                    // subclasses over-write
                    Y.mix(unplug, classUnplug, true);
                }

                classPlug = constructor._PLUG;
                if (classPlug) {
                    // subclasses over-write
                    Y.mix(plug, classPlug, true);
                }
            }
    
            for (pluginClassName in plug) {
                if (plug.hasOwnProperty(pluginClassName)) {
                    if (!unplug[pluginClassName]) {
                        this.plug(plug[pluginClassName]);
                    }
                }
            }
    
            // User Configuration
            if (config && config.plugins) {
                this.plug(config.plugins);
            }
        },

        /**
         * Unplugs and destroys all plugins on the host
         * @method _destroyPlugins
         * @private
         */
        _destroyPlugins: function() {
            this._unplug();
        },

        /**
         * Private method used to instantiate and attach plugins to the host
         *
         * @method _plug
         * @param {Function} PluginClass The plugin class to instantiate
         * @param {Object} config The configuration object for the plugin
         * @private
         */
        _plug: function(PluginClass, config) {
            if (PluginClass && PluginClass.NS) {
                var ns = PluginClass.NS;
    
                config = config || {};
                config.host = this;
    
                if (this.hasPlugin(ns)) {
                    // Update config
                    this[ns].setAttrs(config);
                } else {
                    // Create new instance
                    this[ns] = new PluginClass(config);
                    this._plugins[ns] = PluginClass;
                }
            }
        },

        /**
         * Unplugs and destroys a plugin already instantiated with the host.
         *
         * @method _unplug
         * @private
         * @param {String | Function} plugin The namespace for the plugin, or a plugin class with the static NS property defined.
         */
        _unplug : function(plugin) {
            var ns = plugin, 
                plugins = this._plugins;
    
            if (L.isFunction(plugin)) {
                ns = plugin.NS;
                if (ns && (!plugins[ns] || plugins[ns] !== plugin)) {
                    ns = null;
                }
            }
    
            if (ns) {
                if (this[ns]) {
                    this[ns].destroy();
                    delete this[ns];
                }
                if (plugins[ns]) {
                    delete plugins[ns];
                }
            }
        }
    };
    
    /**
     * Registers plugins to be instantiated at the class level (plugins 
     * which should be plugged into every instance of the class by default).
     *
     * @method Plugin.Host.plug
     * @static
     *
     * @param {Function} hostClass The host class on which to register the plugins
     * @param {Function | Array} plugin Either the plugin class, an array of plugin classes or an array of objects (with fn and cfg properties defined)
     * @param {Object} config (Optional) If plugin is the plugin class, the configuration for the plugin
     */
    PluginHost.plug = function(hostClass, plugin, config) {
        // Cannot plug into Base, since Plugins derive from Base [ will cause infinite recurrsion ]
        var p, i, l, name;
    
        if (hostClass !== Y.Base) {
            hostClass._PLUG = hostClass._PLUG || {};
    
            if (!L.isArray(plugin)) {
                if (config) {
                    plugin = {fn:plugin, cfg:config};
                }
                plugin = [plugin];
            }
    
            for (i = 0, l = plugin.length; i < l;i++) {
                p = plugin[i];
                name = p.NAME || p.fn.NAME;
                hostClass._PLUG[name] = p;
            }
        }
    };

    /**
     * Unregisters any class level plugins which have been registered by the host class, or any
     * other class in the hierarchy.
     *
     * @method Plugin.Host.unplug
     * @static
     *
     * @param {Function} hostClass The host class from which to unregister the plugins
     * @param {Function | Array} plugin The plugin class, or an array of plugin classes
     */
    PluginHost.unplug = function(hostClass, plugin) {
        var p, i, l, name;
    
        if (hostClass !== Y.Base) {
            hostClass._UNPLUG = hostClass._UNPLUG || {};
    
            if (!L.isArray(plugin)) {
                plugin = [plugin];
            }
    
            for (i = 0, l = plugin.length; i < l; i++) {
                p = plugin[i];
                name = p.NAME;
                if (!hostClass._PLUG[name]) {
                    hostClass._UNPLUG[name] = p;
                } else {
                    delete hostClass._PLUG[name];
                }
            }
        }
    };

    Y.namespace("Plugin").Host = PluginHost;


}, '@VERSION@' ,{requires:['yui-base']});
