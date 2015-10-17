YUI.add('graphics', function(Y) {

/**
 * The Graphics widget provides an api for basic drawing operations.
 *
 * @module graphics
 */
var SETTER = "setter",
	PluginHost = Y.Plugin.Host,
    VALUE = "value",
    VALUEFN = "valueFn",
    READONLY = "readOnly",
    Y_LANG = Y.Lang,
    STR = "string",
    WRITE_ONCE = "writeOnce",
    BaseGraphic,
    AttributeLite = function()
    {
        var host = this; // help compression
        
        // Perf tweak - avoid creating event literals if not required.
        host._ATTR_E_FACADE = {};
        
        Y.EventTarget.call(this, {emitFacade:true});
        host._state = {};
        host.prototype = Y.mix(AttributeLite.prototype, host.prototype);
    };

	/**
	 * AttributeLite provides Attribute-like getters and setters for shape classes in the Graphics module. It provides a get/set API without the event infastructure.
	 *
	 * @class AttributeLite
	 * @constructor
	 */
    AttributeLite.prototype = {
		/**
		 * Initializes the attributes for a shape. If an attribute config is passed into the constructor of the host, 
		 * the initial values will be overwritten.
		 *
		 * @method addAttrs
		 * @param {Object} cfg Optional object containing attributes key value pairs to be set.
		 */
		addAttrs: function(cfg)
		{
			var host = this,
				attrConfig = this.constructor.ATTRS, 
				attr,
				i,
				fn,
				state = host._state;
			for(i in attrConfig)
			{
				if(attrConfig.hasOwnProperty(i))
				{
					attr = attrConfig[i];
					if(attr.hasOwnProperty(VALUE))
					{
						state[i] = attr.value;
					}
					else if(attr.hasOwnProperty(VALUEFN))
					{
						fn = attr.valueFn;
						if(Y_LANG.isString(fn))
						{
							state[i] = host[fn].apply(host);
						}
						else
						{
							state[i] = fn.apply(host);
						}
					}
			    }
            }
			host._state = state;
            for(i in attrConfig)
			{
				if(attrConfig.hasOwnProperty(i))
				{
					attr = attrConfig[i];
                    if(attr.hasOwnProperty(READONLY) && attr.readOnly)
					{
						continue;
					}

					if(attr.hasOwnProperty(WRITE_ONCE) && attr.writeOnce)
					{
						attr.readOnly = true;
					}

					if(cfg && cfg.hasOwnProperty(i))
					{
						if(attr.hasOwnProperty(SETTER))
						{
							host._state[i] = attr.setter.apply(host, [cfg[i]]);
						}
						else
						{
							host._state[i] = cfg[i];
						}
					}
				}
			}
		},

        /**
         * For a given item, returns the value of the property requested, or undefined if not found.
         *
         * @method get
         * @param name {String} The name of the item
         * @return {Any} The value of the supplied property.
         */
        get: function(attr)
        {
            var host = this,
                getter,
                attrConfig = host.constructor.ATTRS;
            if(attrConfig && attrConfig[attr])
            {
                getter = attrConfig[attr].getter;
                if(getter)
                {
                    if(typeof getter == STR)
                    {
                        return host[getter].apply(host);
                    }
                    return attrConfig[attr].getter.apply(host);
                }

                return host._state[attr];
            }
            return null;
        },
    
        /**
         * Sets the value of an attribute.
         *
         * @method set
         * @param {String}|{Object} name The name of the attribute. Alternatively, an object of key value pairs can 
         * be passed in to set multiple attributes at once.
         * @param {Any} value The value to set the attribute to. This value is ignored if an object is received as 
         * the name param.
         */
        set: function(attr, val)
        {
            var i;
            if(Y_LANG.isObject(attr))
            {
                for(i in attr)
                {
                    if(attr.hasOwnProperty(i))
                    {
                        this._set(i, attr[i]);
                    }
                }
            }
            else
            {
                this._set.apply(this, arguments);
            }
        },

		/**
		 * @private
		 */
		_set: function(attr, val)
		{
			var host = this,
				setter,
				args,
				attrConfig = host.constructor.ATTRS;
			if(attrConfig && attrConfig.hasOwnProperty(attr))
			{
				setter = attrConfig[attr].setter;
				if(setter)
				{
					args = [val];
					if(typeof setter == STR)
					{
						val = host[setter].apply(host, args);
					}
					else
                    {
					    val = attrConfig[attr].setter.apply(host, args);
                    }
				}
				host._state[attr] = val;
			}
		}
	};
	Y.AttributeLite = AttributeLite;

    //BaseGraphic serves as the base class for the graphic layer. It serves the same purpose as
    //Base but uses a lightweight getter/setter class instead of Attribute.
    //This classs is temporary and a work in progress.
    BaseGraphic = function(cfg)
    {
        var host = this,
            PluginHost = Y.Plugin && Y.Plugin.Host;  
        if (host._initPlugins && PluginHost) {
            PluginHost.call(host);
        }
        
        host.name = host.constructor.NAME;
        host._eventPrefix = host.constructor.EVENT_PREFIX || host.constructor.NAME;
        AttributeLite.call(host);
        host.addAttrs(cfg);
        host.init.apply(this, arguments);
        if (host._initPlugins) {
            // Need to initPlugins manually, to handle constructor parsing, static Plug parsing
            host._initPlugins(cfg);
        }
        host.initialized = true;
    };

    BaseGraphic.NAME = "baseGraphic";

    BaseGraphic.prototype = {
        /**
         * @private
         */
        init: function()
        {
            this.publish("init", {
                fireOnce:true
            });
            this.initializer.apply(this, arguments);
            this.fire("init", {cfg: arguments[0]});
        }
    };
//Straightup augment, no wrapper functions
Y.mix(BaseGraphic, Y.AttributeLite, false, null, 1);
Y.mix(BaseGraphic, Y.EventTarget, false, null, 1);
Y.mix(BaseGraphic, PluginHost, false, null, 1);
BaseGraphic.plug = PluginHost.plug;
BaseGraphic.unplug = PluginHost.unplug;
Y.BaseGraphic = BaseGraphic;


}, '@VERSION@' ,{requires:['event-target', 'pluginhost']});
