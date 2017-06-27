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
    AttributeLite,
    Matrix;

    /**
     * Matrix is a class that allows for the manipulation of a transform matrix.
     * This class is a work in progress.
     *
     * @class Matrix
     * @constructor
     */
    Matrix = function(config) {
        this.init(config);
    };

    Matrix.prototype = {
        /**
         * Used as value for the _rounding method.
         *
         * @property _rounder
         * @private
         */
        _rounder: 100000,

        /**
         * Updates the matrix. 
         *
         * @method multiple
         * @param {Number} a 
         * @param {Number} b
         * @param {Number} c
         * @param {Number} d
         * @param {Number} dx
         * @param {Number} dy
         */
        multiply: function(a, b, c, d, dx, dy) {
            var matrix = this,
                matrix_a = matrix.a * a + matrix.c * b,
                matrix_b = matrix.b * a + matrix.d * b,
                matrix_c = matrix.a * c + matrix.c * d,
                matrix_d = matrix.b * c + matrix.d * d,
                matrix_dx = matrix.a * dx + matrix.c * dy + matrix.dx,
                matrix_dy = matrix.b * dx + matrix.d * dy + matrix.dy;

            matrix.a = matrix_a;
            matrix.b = matrix_b;
            matrix.c = matrix_c;
            matrix.d = matrix_d;
            matrix.dx = matrix_dx;
            matrix.dy = matrix_dy;
            return this;
        },

        /**
         * Parses a string and updates the matrix.
         *
         * @method applyCSSText
         * @param {String} val A css transform string
         */
        applyCSSText: function(val) {
            var re = /\s*([a-z]*)\(([\w,\s]*)\)/gi,
                args,
                m;

            while ((m = re.exec(val))) {
                if (typeof this[m[1]] === 'function') {
                    args = m[2].split(',');
                    console.log(args);
                    this[m[1]].apply(this, args);
                }
            }
        },
        
        /**
         * Parses a string and returns an array of transform arrays.
         *
         * @method applyCSSText
         * @param {String} val A css transform string
         * @return Array
         */
        getTransformArray: function(val) {
            var re = /\s*([a-z]*)\(([\w,\s]*)\)/gi,
                transforms = [],
                args,
                m;

            while ((m = re.exec(val))) {
                if (typeof this[m[1]] === 'function') {
                    args = m[2].split(',');
                    args.unshift(m[1]);
                    transforms.push(args);
                }
            }
            return transforms;
        },

        /**
         * Default values for the matrix
         *
         * @property _defaults
         * @private
         */
        _defaults: {
            a: 1,
            b: 0,
            c: 0,
            d: 1,
            dx: 0,
            dy: 0
        },

        /**
         * Rounds values
         *
         * @method _round
         * @private
         */
        _round: function(val) {
            val = Math.round(val * this._rounder) / this._rounder;
            return val;
        },

        /**
         * Initializes a matrix.
         *
         * @method init
         * @param {Object} config Specified key value pairs for matrix properties. If a property is not explicitly defined in the config argument,
         * the default value will be used.
         */
        init: function(config) {
            var defaults = this._defaults,
                prop;

            config = config || {};

            for (prop in defaults) {
                if(defaults.hasOwnProperty(prop))
                {
                    this[prop] = (prop in config) ? config[prop] : defaults[prop];
                }
            }

            this._config = config;
        },

        /**
         * Applies a scale transform
         *
         * @method scale
         * @param {Number} val
         */
        scale: function(x, y) {
            this.multiply(x, 0, 0, y, 0, 0);
            return this;
        },
        
        /**
         * Applies a skew transformation.
         *
         * @method skew
         * @param {Number} x The value to skew on the x-axis.
         * @param {Number} y The value to skew on the y-axis.
         */
        skew: function(x, y) {
            x = x || 0;
            y = y || 0;

            if (x !== undefined) { // null or undef
                x = this._round(Math.tan(this.angle2rad(x)));

            }

            if (y !== undefined) { // null or undef
                y = this._round(Math.tan(this.angle2rad(y)));
            }

            this.multiply(1, y, x, 1, 0, 0);
            return this;
        },

        /**
         * Applies a skew to the x-coordinate
         *
         * @method skewX
         * @param {Number} x x-coordinate
         */
        skewX: function(x) {
            this.skew(x);
            return this;
        },

        /**
         * Applies a skew to the y-coordinate
         *
         * @method skewY
         * @param {Number} y y-coordinate
         */
        skewY: function(y) {
            this.skew(null, y);
            return this;
        },

        /**
         * Returns a string of text that can be used to populate a the css transform property of an element.
         *
         * @method toCSSText
         * @return String
         */
        toCSSText: function() {
            var matrix = this,
                dx = matrix.dx,
                dy = matrix.dy,
                text = 'matrix(';


            if (Y.UA.gecko) { // requires unit
                if (!isNaN(dx)) {
                    dx += 'px';
                }
                if (!isNaN(dy)) {
                    dy += 'px';
                }
            }

            text +=     matrix.a + ',' + 
                        matrix.b + ',' + 
                        matrix.c + ',' + 
                        matrix.d + ',' + 
                        dx + ',' +
                        dy;

            text += ')';

            return text;
        },

        /**
         * Returns a string that can be used to populate the css filter property of an element.
         *
         * @method toFilterText
         * @return String
         */
        toFilterText: function() {
            var matrix = this,
                text = 'progid:DXImageTransform.Microsoft.Matrix(';
            text +=     'M11=' + matrix.a + ',' + 
                        'M21=' + matrix.b + ',' + 
                        'M12=' + matrix.c + ',' + 
                        'M22=' + matrix.d + ',' +
                        'sizingMethod="auto expand")';

            text += '';

            return text;
        },

        /**
         * Converts a radian value to a degree.
         *
         * @method rad2deg
         * @param {Number} rad Radian value to be converted.
         * @return Number
         */
        rad2deg: function(rad) {
            var deg = rad * (180 / Math.PI);
            return deg;
        },

        /**
         * Converts a degree value to a radian.
         *
         * @method deg2rad
         * @param {Number} deg Degree value to be converted to radian.
         * @return Number
         */
        deg2rad: function(deg) {
            var rad = deg * (Math.PI / 180);
            return rad;
        },

        angle2rad: function(val) {
            if (typeof val === 'string' && val.indexOf('rad') > -1) {
                val = parseFloat(val);
            } else { // default to deg
                val = this.deg2rad(parseFloat(val));
            }

            return val;
        },

        /**
         * Applies a rotate transform.
         *
         * @method rotate
         * @param {Number} deg The degree of the rotation.
         */
        rotate: function(deg, x, y) {
            var matrix = [],
                rad = this.angle2rad(deg),
                sin = this._round(Math.sin(rad)),
                cos = this._round(Math.cos(rad));
            this.multiply(cos, sin, 0 - sin, cos, 0, 0);
            return this;
        },

        /**
         * Applies translate transformation.
         *
         * @method translate
         * @param {Number} x The value to transate on the x-axis.
         * @param {Number} y The value to translate on the y-axis.
         */
        translate: function(x, y) {
            this.multiply(1, 0, 0, 1, parseFloat(x), parseFloat(y));
            return this;
        }
    };
    Y.Matrix = Matrix;
    
    /**
	 * AttributeLite provides Attribute-like getters and setters for shape classes in the Graphics module. It provides a get/set API without the event infastructure.
     * This class is temporary and a work in progress.
	 *
	 * @class AttributeLite
	 * @constructor
	 */
    AttributeLite = function()
    {
        var host = this; // help compression
        
        // Perf tweak - avoid creating event literals if not required.
        host._ATTR_E_FACADE = {};
        
        Y.EventTarget.call(this, {emitFacade:true});
        host._state = {};
        host.prototype = Y.mix(AttributeLite.prototype, host.prototype);
    };

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
         * @param {String|Object} name The name of the attribute. Alternatively, an object of key value pairs can 
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
         * Provides setter logic. Used by `set`.
         *
         * @method _set
         * @param {String|Object} name The name of the attribute. Alternatively, an object of key value pairs can 
         * be passed in to set multiple attributes at once.
         * @param {Any} value The value to set the attribute to. This value is ignored if an object is received as 
         * the name param.
		 * @protected
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
    Y.mix(AttributeLite, Y.EventTarget, false, null, 1);
	Y.AttributeLite = AttributeLite;

    /**
     * BaseGraphic serves as the base class for the graphic layer. It serves the same purpose as
     * Base but uses a lightweight getter/setter class instead of Attribute.
     * This class is temporary and a work in progress.
     *
     * @class BaseGraphic
     * @constructor
     * @param {Object} cfg Key value pairs for attributes
     */
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
         * Init method, invoked during construction.
         * Fires an init event after calling `initializer` on implementers.
         *
         * @method init
         * @protected 
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
Y.mix(BaseGraphic, PluginHost, false, null, 1);
BaseGraphic.prototype.constructor = BaseGraphic;
BaseGraphic.plug = PluginHost.plug;
BaseGraphic.unplug = PluginHost.unplug;
Y.BaseGraphic = BaseGraphic;


}, '@VERSION@' ,{requires:['event-custom', 'node', 'pluginhost']});
