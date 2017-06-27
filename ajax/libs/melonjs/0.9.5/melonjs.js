/**
 * @license MelonJS Game Engine
 * Copyright (C) 2012, Olivier BIOT
 * http://www.melonjs.org
 *
 * melonJS is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 *
 */

/**
 * (<b>m</b>)elonJS (<b>e</b>)ngine : All melonJS functions are defined inside of this namespace.<p>
 * You generally should not add new properties to this namespace as it may be overwritten in future versions.
 * @namespace
 */
var me = me || {};

(function($) {
	// Use the correct document accordingly to window argument
	var document = $.document;

	/**
	 * me global references
	 * @namespace
	 */
	me = {
		// settings & configuration
		// library name & version
		mod : "melonJS",
		version : "0.9.5",
		nocache : '',

		// Public Object (To be completed)
		audio : null,
		video : null,
		timer : null,
		input : null,
		state : null,
		game : null,
		entityPool : null,
		levelDirector : null,
		// System Object (instances)
		TMXParser : null,
		loadingScreen : null,
		// TMX Stuff
		TMXTileMap : null

	};

	/**
	 * global system settings and browser capabilities
	 * @namespace
	 */
	me.sys = {
		// Browser capabilities
		/**
		 * Browser User Agent (read-only)
		 * @type {Boolean}
		 * @memberOf me.sys
		 */
		ua : navigator.userAgent.toLowerCase(),
		/**
		 * Browser Audio capabilities (read-only) <br>
		 * @type {Boolean}
		 * @memberOf me.sys
		 */
		sound : false,
		/**
		 * Browser Local Storage capabilities (read-only) <br>
		 * @type {Boolean}
		 * @memberOf me.sys
		 */
		localStorage : (typeof($.localStorage) == 'object'),
		/**
		 * Browser Gyroscopic Motion Event capabilities (read-only) <br>
		 * @type {Boolean}
		 * @memberOf me.sys
		 */
		gyro : ($.DeviceMotionEvent !== undefined),

		/**
		 * Browser Base64 decoding capability (read-only) <br>
		 * @type {Boolean}
		 * @memberOf me.sys
		 */
		nativeBase64 : (typeof($.atob) == 'function'),

		/**
		 * Touch capabilities <br>
		 * @type {Boolean}
		 * @memberOf me.sys
		 */
		touch : false,


		// Global settings
		/**
		 * Game FPS (default 60)
		 * @type {Int}
		 * @memberOf me.sys
		 */
		fps : 60,

		/**
		 * enable/disable frame interpolation (default disable)<br>
		 * @type {Boolean}
		 * @memberOf me.sys
		 */
		interpolation : false,

		/**
		 * Global scaling factor(default 1.0)
		 * @type {me.Vector2d}
		 * @memberOf me.sys
		 */
		scale : null, //initialized by me.video.init
 	
		/**
		 * Global gravity settings <br>
		 * will override entities init value if defined<br>
		 * default value : undefined
		 * @type {Number}
		 * @memberOf me.sys
		 */
		gravity : undefined,

		/**
		 * Use native "requestAnimFrame" function if supported <br>
		 * fallback to clearInterval if not supported by the browser<br>
		 * @type {Boolean}
		 * @memberOf me.sys
		 */
		useNativeAnimFrame : false,

		/**
		 * cache Image using a Canvas element, instead of directly using the Image Object<br>
		 * using this, performances are lower on OSX desktop (others, including mobile untested)<br>
		 * default value : false
		 * @type {Boolean}
		 * @memberOf me.sys
		 */
		cacheImage : false,

		/**
		 * Enable dirtyRegion Feature <br>
		 * default value : false<br>
		 * (!) not fully implemented/supported (!)
		 * @type {Boolean}
		 * @memberOf me.sys
		 */
		dirtyRegion : false,

		/**
		 * Specify either to stop on audio loading error or not<br>
		 * if me.debug.stopOnAudioLoad is true, melonJS will throw an exception and stop loading<br>
		 * if me.debug.stopOnAudioLoad is false, melonJS will disable sounds and output a warning message in the console <br>
		 * default value : true<br>
		 * @type {Boolean}
		 * @memberOf me.sys
		 */
		stopOnAudioError : true,

		/**
		 * Specify either to pause the game when losing focus or not<br>
		 * default value : true<br>
		 * @type {Boolean}
		 * @memberOf me.sys
		 */
		pauseOnBlur : true,

		/**
		 * Specify the rendering method for layers <br>
		 * if false, visible part of the layers are rendered dynamically (default)<br>
		 * if true, the entire layers are first rendered into an offscreen canvas<br>
		 * the "best" rendering method depends of your game<br>
		 * (amount of layer, layer size, amount of tiles per layer, etc…)<br>
		 * note : rendering method is also configurable per layer by adding this property to your layer (in Tiled)<br>
		 * @type {Boolean}
		 * @memberOf me.sys
		 */
		preRender : false,

		// System methods
		/**
		 * Compare two version strings
		 * @public
		 * @function
		 * @param {String} first First version string to compare
		 * @param {String} [second="0.9.5"] Second version string to compare 
		 * @return {Integer} comparison result <br>&lt; 0 : first &lt; second <br>0 : first == second <br>&gt; 0 : first &gt; second
		 * @example
		 * if (me.sys.checkVersion("0.9.5") > 0) {
		 *     console.error("melonJS is too old. Expected: 0.9.5, Got: " + me.version);
		 * }
		 */
		checkVersion : function (first, second) {
			second = second || me.version;

			var a = first.split(".");
			var b = second.split(".");
			var len = Math.min(a.length, b.length);
			var result = 0;

			for (var i = 0; i < len; i++) {
				if (result = +a[i] - +b[i]) {
					break;
				}
			}

			return result ? result : a.length - b.length;
		}
	};

	// a flag to know if melonJS
	// is initialized
	var me_initialized = false;

	/*---

		DOM loading stuff

				---*/

	var readyBound = false, isReady = false, readyList = [];

	// Handle when the DOM is ready
	function domReady() {
		// Make sure that the DOM is not already loaded
		if (!isReady) {
			// be sure document.body is there
			if (!document.body) {
				return setTimeout(domReady, 13);
			}

			// clean up loading event
			if (document.removeEventListener)
				document.removeEventListener("DOMContentLoaded", domReady, false);
			else
				$.removeEventListener("load", domReady, false);

			// Remember that the DOM is ready
			isReady = true;

			// execute the defined callback
			for ( var fn = 0; fn < readyList.length; fn++) {
				readyList[fn].call($, []);
			}
			readyList.length = 0;
		}
	}
	;

	// bind ready
	function bindReady() {
		if (readyBound) {
			return;
		}
		readyBound = true;

		// directly call domReady if document is already "ready"
		if (document.readyState === "complete") {
			return domReady();
		} else {
			if (document.addEventListener) {
				// Use the handy event callback
				document.addEventListener("DOMContentLoaded", domReady, false);
			}
			// A fallback to window.onload, that will always work
			$.addEventListener("load", domReady, false);
		}
	}
	;

	/**
	 * Specify a function to execute when the DOM is fully loaded
	 * @param {Function} handler A function to execute after the DOM is ready.
	 * @example
	 * // small main skeleton
	 * var jsApp	=
	 * {
	 *    // Initialize the jsApp
	 *    // called by the window.onReady function
	 *    onload: function()
	 *    {
	 *       // init video
	 *       if (!me.video.init('jsapp', 640, 480))
	 *       {
	 *          alert("Sorry but your browser does not support html 5 canvas. ");
	 *          return;
	 *       }
	 *
	 *       // initialize the "audio"
	 *       me.audio.init("mp3,ogg");
	 *
	 *       // set callback for ressources loaded event
	 *       me.loader.onload = this.loaded.bind(this);
	 *
	 *       // set all ressources to be loaded
	 *       me.loader.preload(g_ressources);
	 *
	 *       // load everything & display a loading screen
	 *       me.state.change(me.state.LOADING);
	 *    },
	 *
	 *    // callback when everything is loaded
	 *    loaded: function ()
	 *    {
	 *       // define stuff
	 *       // ....
	 *
	 *       // change to the menu screen
	 *       me.state.change(me.state.MENU);
	 *    }
	 * }; // jsApp
	 *
	 * // "bootstrap"
	 * window.onReady(function()
	 * {
	 *    jsApp.onload();
	 * });
	 */
	$.onReady = function(fn) {
		// Attach the listeners
		bindReady();

		// If the DOM is already ready
		if (isReady) {
			// Execute the function immediately
			fn.call($, []);
		} else {
			// Add the function to the wait list
			readyList.push(function() {
				return fn.call($, []);
			});
		}
		return this;
	};

	// call the library init function when ready
	$.onReady(function() {
		_init_ME();
	});

	/************************************************************************************/

	/*---

	 	some "Javascript API" patch & enhancement

						---*/

	var initializing = false,
		fnTest = /xyz/.test(function() {/**@nosideeffects*/xyz;}) ? /\bparent\b/ : /.*/;

	/**
	 * JavaScript Inheritance Helper <br>
	 * Based on <a href="http://ejohn.org/">John Resig</a> Simple Inheritance<br>
	 * MIT Licensed.<br>
	 * Inspired by <a href="http://code.google.com/p/base2/">base2</a> and <a href="http://www.prototypejs.org/">Prototype</a><br>
	 * @param {Object} object Object (or Properties) to inherit from
	 * @example
	 * var Person = Object.extend(
	 * {
	 *    init: function(isDancing)
	 *    {
	 *       this.dancing = isDancing;
	 *    },
	 *    dance: function()
	 *    {
	 *       return this.dancing;
	 *    }
	 * });
	 *
	 * var Ninja = Person.extend(
	 * {
	 *    init: function()
	 *    {
	 *       this.parent( false );
	 *    },
	 *
	 *    dance: function()
	 *    {
	 *       // Call the inherited version of dance()
	 *       return this.parent();
	 *    },
	 *
	 *    swingSword: function()
	 *    {
	 *       return true;
	 *    }
	 * });
	 *
	 * var p = new Person(true);
	 * p.dance(); // => true
	 *
	 * var n = new Ninja();
	 * n.dance(); // => false
	 * n.swingSword(); // => true
	 *
	 * // Should all be true
	 * p instanceof Person && p instanceof Class &&
	 * n instanceof Ninja && n instanceof Person && n instanceof Class
	 */
	Object.extend = function(prop) {
		// _super rename to parent to ease code reading
		var parent = this.prototype;

		// Instantiate a base class (but only create the instance,
		// don't run the init constructor)
		initializing = true;
		var proto = new this();
		initializing = false;

		// Copy the properties over onto the new prototype
		for ( var name in prop) {
			// Check if we're overwriting an existing function
			proto[name] = typeof prop[name] == "function"
					&& typeof parent[name] == "function"
					&& fnTest.test(prop[name]) ? (function(name, fn) {
				return function() {
					var tmp = this.parent;

					// Add a new ._super() method that is the same method
					// but on the super-class
					this.parent = parent[name];

					// The method only need to be bound temporarily, so we
					// remove it when we're done executing
					var ret = fn.apply(this, arguments);
					this.parent = tmp;

					return ret;
				};
			})(name, prop[name]) : prop[name];
		}

		// The dummy class constructor
		function Class() {
			if (!initializing && this.init) {
				this.init.apply(this, arguments);
			}
			//return this;
		}
		// Populate our constructed prototype object
		Class.prototype = proto;
		// Enforce the constructor to be what we expect
		Class.constructor = Class;
		// And make this class extendable
		Class.extend = Object.extend;//arguments.callee;

		return Class;
	};

	if (typeof Object.create !== 'function') {
		/**
		 * Prototypal Inheritance Create Helper
		 * @param {Object} Object
		 * @example
		 * // declare oldObject
		 * oldObject = new Object();
		 * // make some crazy stuff with oldObject (adding functions, etc...)
		 * ...
		 * ...
		 *
		 * // make newObject inherits from oldObject
		 * newObject = Object.create(oldObject);
		 */
		Object.create = function(o) {
			function _fn() {};
			_fn.prototype = o;
			return new _fn();
		};
	};

	if (!Function.bind) {
		/**
		 * Binds this function to the given context by wrapping it in another function and returning the wrapper.<p>
		 * Whenever the resulting "bound" function is called, it will call the original ensuring that this is set to context. <p>
		 * Also optionally curries arguments for the function.
		 * @param {Object} context the object to bind to.
		 * @param {Array.<string>} [args] Optional additional arguments to curry for the function.
		 * @example
		 * // Ensure that our callback is triggered with the right object context (this):
		 * myObject.onComplete(this.callback.bind(this));
		 */
		Function.prototype.bind = function() {
			var fn = this, args = Array.prototype.slice.call(arguments), object = args.shift();
			return function() {
				return fn.apply(object, args.concat(Array.prototype.slice.call(arguments)));
			};
		};
	};
	
	
	if (typeof Date.now === "undefined") {
		/**
		 * provide a replacement for browser not
		 * supporting Date.now (JS 1.5)
		 * @private
		 */
		Date.now = function(){return new Date().getTime()};
	}

	if(typeof console === "undefined") {
		/**
		 * Dummy console.log to avoid crash
		 * in case the browser does not support it
		 * @private
		 */
		console = {
			log: function() {},
			info: function() {},
			error: function() {alert(Array.prototype.slice.call(arguments).join(", "));}
		};
	}

	/**
	 * Executes a function as soon as the interpreter is idle (stack empty).
	 * @returns id that can be used to clear the deferred function using clearTimeout
	 * @example
	 *
	 *   // execute myFunc() when the stack is empty, with 'myArgument' as parameter
	 *   myFunc.defer('myArgument');
	 *
	 */
	Function.prototype.defer = function() {
		var fn = this, args = Array.prototype.slice.call(arguments);
		return window.setTimeout(function() {
			return fn.apply(fn, args);
		}, 0.01);
	};

	if (!Object.defineProperty) {
		/**
		 * simple defineProperty function definition (if not supported by the browser)<br>
		 * if defineProperty is redefined, internally use __defineGetter__/__defineSetter__ as fallback
		 * @param {Object} obj The object on which to define the property.
		 * @param {String} prop The name of the property to be defined or modified.
		 * @param {Object} desc The descriptor for the property being defined or modified.
		 */
		Object.defineProperty = function(obj, prop, desc) {
			// check if Object support __defineGetter function
			if (obj.__defineGetter__) {
				if (desc.get) {
					obj.__defineGetter__(prop, desc.get);
				}
				if (desc.set) {
					obj.__defineSetter__(prop, desc.set);
				}
			} else {
				// we should never reach this point....
				throw "melonJS: Object.defineProperty not supported";
			}
		}
	};


	if(!String.prototype.trim) {  
		/**
		 * returns the string stripped of whitespace from both ends
		 * @extends String
		 * @return {String} trimmed string
		 */
		String.prototype.trim = function () {  
			return (this.replace(/^\s+/, '')).replace(/\s+$/, ''); 
		};  
	}; 
	
	/**
	 * add isNumeric fn to the string object
	 * @extends String
	 * @return {Boolean} true if string contains only digits
	 */
	String.prototype.isNumeric = function() {
		return (this != null && !isNaN(this) && this.trim() != "");
	};

	/**
	 * add a isBoolean fn to the string object
	 * @extends String
	 * @return {Boolean} true if the string is either true or false
	 */
	String.prototype.isBoolean = function() {
		return (this != null && ("true" == this.trim() || "false" == this
				.trim()));
	};

	/**
	 * add a contains fn to the string object
	 * @extends String
	 * @return {Boolean}
	 */
	String.prototype.contains = function(word) {
		return this.indexOf(word) > -1;
	};

	/**
	 * convert the string to hex value
	 * @extends String
	 * @return {String}
	 */
	String.prototype.toHex = function() {
		var res = "", c = 0;
		while(c<this.length){
			res += this.charCodeAt(c++).toString(16);
		}
		return res;
	};


	/**
	 * add a clamp fn to the Number object
	 * @extends Number
	 * @return {Number} clamped value
	 */
	Number.prototype.clamp = function(low, high) {
		return this < low ? low : this > high ? high : +this;
	};

	/**
	 * return a random between min, max
	 * @param {Number} min minimum value.
	 * @param {Number} max maximum value.
	 * @extends Number
	 * @return {Number} random value
	 */
	Number.prototype.random = function(min, max) {
		return (~~(Math.random() * (max - min + 1)) + min);
	};

	/**
	 * round a value to the specified number of digit
	 * @param {Number} [num="Object value"] value to be rounded.
	 * @param {Number} dec number of decimal digit to be rounded to.
	 * @extends Number
	 * @return {Number} rounded value
	 * @example
	 * // round a specific value to 2 digits
	 * Number.prototype.round (10.33333, 2); // return 10.33
	 * // round a float value to 4 digits
	 * num = 10.3333333
	 * num.round(4); // return 10.3333
	 */
	Number.prototype.round = function() {
		// if only one argument use the object value
		var num = (arguments.length < 2) ? this : arguments[0];
		var powres = Math.pow(10, arguments[1] || arguments[0] || 0);
		return (Math.round(num * powres) / powres);
	};

	/**
	 * a quick toHex function<br>
	 * given number <b>must</b> be an int, with a value between 0 and 255
	 * @extends Number
	 * @return {String} converted hexadecimal value
	 */
	Number.prototype.toHex = function() {
		return "0123456789ABCDEF".charAt((this - this % 16) >> 4)
				+ "0123456789ABCDEF".charAt(this % 16);
	};

	/**
	 * Returns a value indicating the sign of a number<br>
	 * @extends Number
	 * @return {Number} sign of a the number
	 */
	Number.prototype.sign = function() {
		return this < 0 ? -1 : (this > 0 ? 1 : 0);
	};

	/**
	 * Converts an angle in degrees to an angle in radians
	 * @param {Number} [angle="angle"] angle in degrees
	 * @extends Number
	 * @return {Number} corresponding angle in radians
	 * @example
	 * // convert a specific angle
	 * Number.prototype.degToRad (60); // return 1.0471...
	 * // convert object value
	 * var num = 60
	 * num.degToRad(); // return 1.0471...
	 */
	Number.prototype.degToRad = function (angle) {
		return (angle||this) / 180.0 * Math.PI;
	};

	/**
	 * Converts an angle in radians to an angle in degrees.
	 * @param {Number} [angle="angle"] angle in radians
	 * @extends Number
	 * @return {Number} corresponding angle in degrees
	 * @example
	 * // convert a specific angle
	 * Number.prototype.radToDeg (1.0471975511965976); // return 59.9999...
	 * // convert object value
	 * num = 1.0471975511965976
	 * Math.ceil(num.radToDeg()); // return 60
	 */
	Number.prototype.radToDeg = function (angle) {
		return (angle||this) * (180.0 / Math.PI);
	};
	
	/**
	 * Remove the specified object from the Array<br>
	 * @param {Object} object to be removed
	 * @extends Array
	 */
	Array.prototype.remove = function(obj) {
		var i = Array.prototype.indexOf.call(this, obj);
		if( i !== -1 ) {
			Array.prototype.splice.call(this, i, 1);
		}
		return this;
	};

	if (!Array.prototype.forEach) {
		/**
		 * provide a replacement for browsers that don't
		 * support Array.prototype.forEach (JS 1.6)
		 * @private
		 */
		Array.prototype.forEach = function (callback, scope) {
			for (var i = 0, j = this.length; j--; i++) {
				callback.call(scope || this, this[i], i, this);
			}
		};
	}
	/************************************************************************************/

	/**
	 * a basic TMX/TSX Parser
	 * @class
	 * @constructor
	 * @ignore
	 **/
	function _TinyTMXParser() {
		var parserObj = {
			tmxDoc : null,
			isJSON : false,

			// parse a TMX/TSX from a string (xmlhttpObj.responseText)
			parseFromString : function(data, isJSON) {
				this.isJSON = isJSON || false;
				
				if (this.isJSON) {
					this.tmxDoc = JSON.parse(data);
					// this won't work !
				} else {
					// get a reference to the requested corresponding xml file
					if ($.DOMParser) {
						var parser = new DOMParser();
						this.tmxDoc = parser.parseFromString(data, "text/xml");
					} else // Internet Explorer (untested!)
					{
						this.tmxDoc = new ActiveXObject("Microsoft.XMLDOM");
						this.tmxDoc.async = "false";
						this.tmxDoc.loadXML(data);
					}
					if (this.tmxDoc == null) {
						console.log("tmx/tsx " + this.tmxDoc + " not found!");
					}
				}
			},

			getFirstElementByTagName : function(name) {
				return this.tmxDoc ? this.tmxDoc.getElementsByTagName(name)[0] : null;
			},

			getAllTagElements : function() {
				return this.tmxDoc ? this.tmxDoc.getElementsByTagName('*') : null;
			},

			getStringAttribute : function(elt, str, val) {
				var ret = elt.getAttribute(str);
				return ret ? ret.trim() : val;
			},

			getIntAttribute : function(elt, str, val) {
				var ret = this.getStringAttribute(elt, str, val);
				return ret ? parseInt(ret) : val;
			},

			getFloatAttribute : function(elt, str, val) {
				var ret = this.getStringAttribute(elt, str, val);
				return ret ? parseFloat(ret) : val;
			},

			getBooleanAttribute : function(elt, str, val) {
				var ret = this.getStringAttribute(elt, str, val);
				return ret ? (ret == "true") : val;
			},

			// free the allocated parser
			free : function() {
				this.tmxDoc = null;
			}
		}
		return parserObj;
	}
	;
	/************************************************************************************/

	/************************************************************************************/

	Object.defineProperty(me, "initialized", {
		get : function get() {
			return me_initialized;
		}
	});

	/*---
	 	ME init stuff
						---*/

	function _init_ME() {
		// don't do anything if already initialized (should not happen anyway)
		if (me_initialized)
			return;

		// enable/disable the cache
		me.utils.setNocache(document.location.href.match(/\?nocache/)||false);
	
		// detect audio capabilities
		me.audio.detectCapabilities();
		
		// detect touch capabilities
		me.sys.touch = ('createTouch' in document) || ('ontouchstart' in $) || (navigator.isCocoonJS);

		// init the FPS counter if needed
		me.timer.init();

		// create an instance of the TMX parser
		me.TMXParser = new _TinyTMXParser();

		// create a default loading screen
		me.loadingScreen = new me.DefaultLoadingScreen();

		// init the App Manager
		me.state.init();

		// init the Entity Pool
		me.entityPool.init();

		// init the level Director
		me.levelDirector.reset();

		me_initialized = true;

	};

	/******************************************/
	/*		OBJECT DRAWING MANAGEMENT           */
	/*		hold & manage app/game objects		*/
	/******************************************/

	/**
	 * a object drawing manager
	 * only used by the game manager
	 * @ignore
	 */
	var drawManager = (function() {
		// hold public stuff in our singletong
		var api = {};

		// list of region to redraw
		// valid for any updated object
		var dirtyRects = [];

		// cache the full screen area rect
		var fullscreen_rect;

		// list of object to redraw
		// only valid for visible and update object
		var dirtyObjects = [];
		
		var drawCount = 0;

		// a flag indicating if we need a redraw
		api.isDirty = false;

		/**
		 * init function
		 */
		api.reset = function() {
			// make sure it's empty
			dirtyRects.length = 0;
			dirtyObjects.length = 0;

			// set our cached rect to the actual screen size
			fullscreen_rect = me.game.viewport.getRect();

			// make everything dirty
			api.makeAllDirty();
		};

		/**
		 * add a dirty object
		 * I should find a cleaner way to manage old/new object rect
		 */
		api.makeDirty = function(obj, updated, oldRect) {
			// object updated ?
			if (updated) {
				// yeah some drawing job to do !
				api.isDirty = true;

				// add a dirty rect if feature enable
				if (me.sys.dirtyRegion) {
					// some stuff to optimiwze the amount
					// of dirty rect would be nice here
					// instead of adding everything :)
					// this is for later I guess !
					if (oldRect) {
						// merge both rect, and add it to the list
						// directly pass object, since anyway it inherits from rect
						dirtyRects.push(oldRect.union(obj));
					} else if (obj.getRect) {
						dirtyRects.push(obj.getRect());
					}
				}
			}

			// if obj is in the viewport add it to the list of obj to draw
			if (obj.inViewport) {
				// add obj at index 0, so that we can keep
				// our inverted loop later
				dirtyObjects.unshift(obj);
			}
		};

		/**
		 * make all object dirty
		 */
		api.makeAllDirty = function() {
			//empty the dirty rect list
			dirtyRects.length = 0;
			//and add a dirty region with the screen area size
			dirtyRects.push(fullscreen_rect);
			// make sure it's dirty
			api.isDirty = true;
			// they are maybe too much call to this function
			// to be checked later...
			//console.log("making everything dirty!");
		};

		/**
		 * remove an object
		 */
		api.remove = function(obj) {
			var idx = dirtyObjects.indexOf(obj);
			if (idx != -1) {
				// remove the object from the list of obj to draw
				dirtyObjects.splice(idx, 1);

				// mark the object as not within the viewport
				// so it won't be added (again) in the list object to be draw
				obj.inViewport = false;

				// and flag the area as dirty
				api.makeDirty(obj, true);
			}
 		};

		/**
		 * return the amount of draw object per frame
		 */
		api.getDrawCount = function() {
			return drawCount;
 		};

		/**
		 * draw all dirty objects/regions
		 */
		api.draw = function(context) {
			// cache viewport position vector
			var posx = me.game.viewport.pos.x;
			var posy = me.game.viewport.pos.y;
						
			// save the current context
			context.save();
			// translate by default to screen coordinates
			context.translate(-posx, -posy)
			
			// substract the map offset to current the current pos
			posx -= me.game.currentLevel.pos.x;
			posy -= me.game.currentLevel.pos.y;
			
			// if feature disable, we only have one dirty rect (the viewport area)
			for ( var r = dirtyRects.length, rect; r--, rect = dirtyRects[r];) {
				// parse all objects
				for ( var o = dirtyObjects.length, obj; o--, obj = dirtyObjects[o];) {
					// if dirty region enabled, make sure the object is in the area to be refreshed
					if (me.sys.dirtyRegion && obj.isSprite && !obj.overlaps(rect)) {
						continue;
					}

					if (obj.floating===true) {
						context.save();
						// cancel the previous translate
						context.translate(posx, posy);
					}

					// draw the object using the dirty area to be updated
					obj.draw(context, rect);

					if (obj.floating===true) {
						context.restore();
					}

					drawCount++;
				}
				// some debug stuff
				if (me.debug.renderDirty) {
					rect.draw(context, "white");
				}
			}
			
			// restore initial context
			context.restore();
		};

		/**
		 * flush all rect
		 */
		api.flush = function() {
			// only empty dirty area list if dirtyRec feature is enable
			// allows to keep the viewport area as a default dirty rect
			if (me.sys.dirtyRegion) {
				dirtyRects.length = 0;
			}
			// empty the dirty object list
			dirtyObjects.length = 0;

			// clear the flag
			api.isDirty = false;

			// reset draw count for debug panel
			drawCount = 0;
		};

		return api;

	})();

	/**
	 * me.game represents your current game, it contains all the objects, tilemap layers,<br>
	 * HUD information, current viewport, collision map, etc..<br>
	 * me.game is also responsible for updating (each frame) the object status and draw them<br>
	 * There is no constructor function for me.game.
	 * @final
	 * @memberOf me
	 * @constructor Should not be called by the user.
	 */
	me.game = (function() {
		// hold public stuff in our singletong
		var api = {};

		/*---------------------------------------------

			PRIVATE STUFF

			---------------------------------------------*/

		// ref to the "system" context
		var frameBuffer = null;

		// hold all the objects
		var gameObjects = [];

		// flag to redraw the sprites
		var initialized = false;

		// to keep track of deferred stuff
		var pendingRemove = null;
		var pendingSort = null;
		
		/**
		 * a default sort function
		 * @private
		 */
		var default_sort_func = function(a, b) {
			// sort order is inverted,
			// since we use a reverse loop for the display
			return (b.z - a.z);
		};

		/*---------------------------------------------

			PUBLIC STUFF

			---------------------------------------------*/
		/**
		 * a reference to the game viewport.
		 * @public
		 * @type me.Viewport
		 * @name me.game#viewport
		 */
		api.viewport = null;
		/**
		 * a reference to the game HUD (if defined).
		 * @public
		 * @type me.HUD_Object
		 * @name me.game#HUD
		 */
		api.HUD = null;
		/**
		 * a reference to the game collision Map
		 * @public
		 * @type me.TiledLayer
		 * @name me.game#collisionMap
		 */
		api.collisionMap = null;
		/**
		 * a reference to the game current level
		 * @public
		 * @type me.TMXTileMap
		 * @name me.game#currentLevel
		 */
		api.currentLevel = null;

		// FIX ME : put this somewhere else
		api.NO_OBJECT = 0;

		/**
		 * Default object type constant.<br>
		 * See type property of the returned collision vector.
		 * @constant
		 * @name me.game#ENEMY_OBJECT
		 */
		api.ENEMY_OBJECT = 1;

		/**
		 * Default object type constant.<br>
		 * See type property of the returned collision vector.
		 * @constant
		 * @name me.game#COLLECTABLE_OBJECT
		 */
		api.COLLECTABLE_OBJECT = 2;

		/**
		 * Default object type constant.<br>
		 * See type property of the returned collision vector.
		 * @constant
		 * @name me.game#ACTION_OBJECT
		 */
		api.ACTION_OBJECT = 3; // door, etc...

		/**
		 * Fired when a level is fully loaded and <br>
		 * and all entities instantiated. <br>
		 * Additionnaly the level id will also be passed
		 * to the called function.
		 * @public
		 * @type function
		 * @name me.game#onLevelLoaded
		 * @example
		 * call myFunction() everytime a level is loaded
		 * me.game.onLevelLoaded = this.myFunction.bind(this);
		 */
		 api.onLevelLoaded = null;

		/**
		 * Initialize the game manager
		 * @name me.game#init
		 * @private
		 * @function
		 * @param {int} [width="full size of the created canvas"] width of the canvas
		 * @param {int} [height="full size of the created canvas"] width of the canvas
		 * init function.
		 */
		api.init = function(width, height) {
			if (!initialized) {
				// if no parameter specified use the system size
				var width = width || me.video.getWidth();
				var height = height || me.video.getHeight();

				// create a defaut viewport of the same size
				api.viewport = new me.Viewport(0, 0, width, height);

				// get a ref to the screen buffer
				frameBuffer = me.video.getSystemContext();

				// publish init notification
				me.event.publish(me.event.GAME_INIT);

				initialized = true;
			}
		};

		/**
		 * reset the game Object manager<p>
		 * destroy all current object except the HUD
		 * @see me.game#disableHUD
		 * @name me.game#reset
		 * @public
		 * @function
		 */
		api.reset = function() {

			// initialized the object if not yet done
			if (!initialized)
				api.init();

			// remove all objects
			api.removeAll();

			// reset the viewport to zero ?
			if (api.viewport)
				api.viewport.reset();

			// also reset the draw manager
			drawManager.reset();

			// reset the transform matrix to the normal one
			frameBuffer.setTransform(1, 0, 0, 1, 0, 0);

			// dummy current level
			api.currentLevel = {pos:{x:0,y:0}};
		};
	
		/**
		 * Load a TMX level
		 * @name me.game#loadTMXLevel
		 * @private
		 * @function
		 */

		api.loadTMXLevel = function(level) {
			// load our map
			api.currentLevel = level;

			// get the collision map
			api.collisionMap = api.currentLevel.getLayerByName("collision");
			if (!api.collisionMap || !api.collisionMap.isCollisionMap) {
				console.error("WARNING : no collision map detected");
			}

			// add all defined layers
			var layers = api.currentLevel.getLayers();
			for ( var i = layers.length; i--;) {
				if (layers[i].visible) {
					// only if visible
					api.add(layers[i]);
				}
			};

			// change the viewport limit
			api.viewport.setBounds(Math.max(api.currentLevel.realwidth, api.viewport.width),
								   Math.max(api.currentLevel.realheight, api.viewport.height));

			// load all game entities
			var objectGroups = api.currentLevel.getObjectGroups();
			for ( var group = 0; group < objectGroups.length; group++) {
				// only add corresponding objects it the group is visible
				if (objectGroups[group].visible) {
					for ( var entity = 0; entity < objectGroups[group].objects.length; entity++) {
						api.addEntity(objectGroups[group].objects[entity], objectGroups[group].z);
					}
				}
			}
			
			// check if the map has different default (0,0) screen coordinates
			if (api.currentLevel.pos.x != api.currentLevel.pos.y) {
				// translate the display accordingly
				frameBuffer.translate( api.currentLevel.pos.x , api.currentLevel.pos.y );
			}

			// sort all our stuff !!
			api.sort();

			// fire the callback if defined
			if (api.onLevelLoaded) {
				api.onLevelLoaded.call(api.onLevelLoaded, level.name)
			}
			//publish the corresponding message
			me.event.publish(me.event.LEVEL_LOADED, [level.name]);

		};

		/**
		 * Manually add object to the game manager
		 * @name me.game#add
		 * @param {me.ObjectEntity} obj Object to be added
		 * @param {int} [z="obj.z"] z index
		 * @public
		 * @function
		 * @example
		 * // create a new object
		 * var obj = new MyObject(x, y)
		 * // add the object and give the z index of the current object
		 * me.game.add(obj, this.z);
		 * // sort the object list (to ensure the object is properly displayed)
		 * me.game.sort();
		 */
		api.add = function(object, zOrder) {
			object.z = (zOrder) ? zOrder : object.z;

			// add the object in the game obj list
			gameObjects.push(object);

		};

		/**
		 * add an entity to the game manager
		 * @name me.game#addEntity
		 * @private
		 * @function
		 */
		api.addEntity = function(ent, zOrder) {
			var obj = me.entityPool.newInstanceOf(ent.name, ent.x, ent.y, ent);
			if (obj) {
				api.add(obj, zOrder);
			}
		};

		/**
		 * returns the list of entities with the specified name<br>
		 * as defined in Tiled (Name field of the Object Properties)<br>
		 * note : avoid calling this function every frame since
		 * it parses the whole object list each time
		 * @name me.game#getEntityByName
		 * @public
		 * @function
		 * @param {String} entityName entity name
		 * @return {me.ObjectEntity[]} Array of object entities
		 */
		api.getEntityByName = function(entityName)
		{
			var objList = [];
			entityName = entityName.toLowerCase();
			for (var i = gameObjects.length, obj; i--, obj = gameObjects[i];) {
				if(obj.name && obj.name.toLowerCase() === entityName) {
					objList.push(obj);
				}
			}
			return objList;
		};

		/**
		 * returns the amount of existing objects<br>
		 * @name me.game#getObjectCount
		 * @protected
		 * @function
		 * @return {Number} the amount of object
		 */
		api.getObjectCount = function()
		{
			return gameObjects.length;
		};

		/**
		 * returns the amount of object being drawn per frame<br>
		 * @name me.game#getDrawCount
		 * @protected
		 * @function
		 * @return {Number} the amount of object draws
		 */
		api.getDrawCount = function()
		{
			return drawManager.getDrawCount();
		};

		
		/**
		 * return the entity corresponding to the specified GUID<br>
		 * note : avoid calling this function every frame since
		 * it parses the whole object list each time
		 * @name me.game#getEntityByGUID
		 * @public
		 * @function
		 * @param {String} GUID entity GUID
		 * @return {me.ObjectEntity} Object Entity (or null if not found)
		 */
		api.getEntityByGUID = function(guid)
		{
			for (var i = gameObjects.length, obj; i--, obj = gameObjects[i];) {
				if(obj.isEntity && obj.GUID == guid) {
					return obj;
				}
			}
			return null;
		};

		/**
		 * add a HUD obj to the game manager
		 * @name me.game#addHUD
		 * @public
		 * @function
		 * @param {int} x x position of the HUD
		 * @param {int} y y position of the HUD
		 * @param {int} w width of the HUD
		 * @param {int} h height of the HUD
		 * @param {String} [bg="none"] a CSS string specifying the background color (e.g. "#0000ff" or "rgb(0,0,255)")
		 */
		api.addHUD = function(x, y, w, h, bg) {
			// if no HUD existing
			if (api.HUD == null) {
				// create a new default HUD object
				api.HUD = new me.HUD_Object(x, y, w, h, bg);
				api.add(api.HUD);
			}
		};

		/**
		 * disable the current HUD
		 * @name me.game#disableHUD
		 * @public
		 * @function
		 */
		api.disableHUD = function() {

			// if no HUD existing
			if (api.HUD != null) {
				// remove the HUD object
				api.remove(api.HUD);
				// nullify it
				api.HUD = null;

			}
		};

		/**
		 * update all objects of the game manager
		 * @name me.game#update
		 * @private
		 * @function
		 */
		api.update = function() {
			
			// previous rect (if any)
			var oldRect = null;
			// loop through our objects
			for ( var i = gameObjects.length, obj; i--, obj = gameObjects[i];) {
				// check for previous rect before position change
				oldRect = (me.sys.dirtyRegion && obj.isSprite) ? obj.getRect() : null;

				// update our object
				var updated = obj.update();

				// check if object is visible
				if (obj.visible) {
					obj.inViewport = (!obj.isSprite || obj.floating) ? true : api.viewport.isVisible(obj);
				}
				else {
					obj.inViewport = false;
				}

				// add it to the draw manager
				drawManager.makeDirty(obj, updated, updated ? oldRect : null);
			}
			// update the camera/viewport
			if (api.viewport.update(drawManager.isDirty)) {
				drawManager.makeAllDirty();
			}
			
		};
		
		
		/**
		 * remove an object
		 * @name me.game#remove
		 * @public
		 * @function
		 * @param {me.ObjectEntity} obj Object to be removed
		 * @param {Boolean} force force immediate deletion
		 */
		api.remove = function(obj, force) {
			
			// notify the object it will be destroyed
			if (obj.destroy) {
				obj.destroy();
			}
			
			// remove the object from the object to draw
			drawManager.remove(obj);
			
			// remove the object from the object list
			if (force===true) {
				// force immediate object deletion
				gameObjects.remove(obj);
				me.entityPool.freeInstance(obj);
			} else {
				// make it invisible (this is bad...)
				obj.visible = false;
				// else wait the end of the current loop
				/** @private */
				pendingRemove = (function (obj) {
					gameObjects.remove(obj);
					me.entityPool.freeInstance(obj);
					pendingRemove = null;
				}).defer(obj);
			}
		};

		/**
		 * remove all objects
		 * @name me.game#removeAll
		 * @public
		 * @function
		 */
		api.removeAll = function() {
			//cancel any pending tasks
			if (pendingRemove) {
				clearTimeout(pendingRemove);
				pendingRemove = null;
			}
			if (pendingSort) {
				clearTimeout(pendingSort);
				pendingSort = null;
			}
			
			// inform all object they are about to be deleted
			for (var i = gameObjects.length ; i-- ;) {
				if (gameObjects[i].isPersistent) {
                   // don't remove persistent objects
				   continue;
				}
				// remove the entity
				api.remove(gameObjects[i], true);
			}
			// make sure it's empty there as well
			drawManager.flush();
		};

		/**
		 * <p>Sort all the game objects.</p>
		 * <p>Normally all objects loaded through the LevelDirector are automatically sorted.
		 * this function is however usefull if you create and add object during the game,
		 * or need a specific sorting algorithm.<p>
		 * @name me.game#sort
		 * @public
		 * @function
		 * @param {Function} [sort_func="sorted on z property value"] sort function
		 * @example
		 * // user defined sort funtion (Z sort based on Y value)
		 * function mySort(a, b) {
		 *    var result = (b.z - a.z);
		 *    return (result ? result : ((b.pos && b.pos.y) - (a.pos && a.pos.y)) || 0);
		 * } </p>
		 * // call me.game.sort with our sorting function
		 * me.game.sort(mySort);
		 */

		api.sort = function(sort_func) {
			// do nothing if there is already 
			// a previous pending sort
			if (pendingSort === null) {
				// use the default sort function if
				// the specified one is not valid
				if (typeof(sort_func) !== "function") {
					sort_func = default_sort_func;
				}
				pendingSort = (function (sort_func) {
					// sort everything
					gameObjects.sort(sort_func);
					// clear the defer id
					pendingSort = null;
					// make sure we redraw everything
					me.game.repaint();
				}).defer(sort_func);
			};
		};

		/**
		 * Checks if the specified entity collides with others entities.
		 * @name me.game#collide
		 * @public
		 * @function
		 * @param {me.ObjectEntity} obj Object to be tested for collision
		 * @param {Boolean} [multiple=false] check for multiple collision
		 * @return {me.Vector2d} collision vector or an array of collision vector (multiple collision){@link me.Rect#collideVsAABB}
		 * @example
		 * // update player movement
		 * this.updateMovement();
		 *
		 * // check for collision with other objects
		 * res = me.game.collide(this);
		 *
		 * // check if we collide with an enemy :
		 * if (res && (res.obj.type == me.game.ENEMY_OBJECT))
		 * {
		 *   if (res.x != 0)
		 *   {
		 *      // x axis
		 *      if (res.x<0)
		 *         console.log("x axis : left side !");
		 *      else
		 *         console.log("x axis : right side !");
		 *   }
		 *   else
		 *   {
		 *      // y axis
		 *      if (res.y<0)
		 *         console.log("y axis : top side !");
		 *      else
		 *         console.log("y axis : bottom side !");
		 *   }
		 * }
		 */
		api.collide = function(objA, multiple) {
			var res;
			// make sure we have a boolean
			multiple = multiple===true ? true : false;
			if (multiple===true) {
				var mres = [], r = 0;
			} 
			// this should be replace by a list of the 4 adjacent cell around the object requesting collision
			for ( var i = gameObjects.length, obj; i--, obj = gameObjects[i];)//for (var i = objlist.length; i-- ;)
			{
				if (obj.inViewport && obj.visible && obj.collidable && (obj!=objA))
				{
					res = obj.collisionBox.collideVsAABB.call(obj.collisionBox, objA.collisionBox);
					if (res.x != 0 || res.y != 0) {
						// notify the object
						obj.onCollision.call(obj, res, objA);
						// return the type (deprecated)
						res.type = obj.type;
						// return a reference of the colliding object
						res.obj  = obj;
						// stop here if we don't look for multiple collision detection
						if (!multiple) {
							return res;
						}
						mres[r++] = res;
					}
				}
			}
			return multiple?mres:null;
		};

		/**
		 * Checks if the specified entity collides with others entities of the specified type.
		 * @name me.game#collideType
		 * @public
		 * @function
		 * @param {me.ObjectEntity} obj Object to be tested for collision
		 * @param {String} type Entity type to be tested for collision
		 * @param {Boolean} [multiple=false] check for multiple collision
		 * @return {me.Vector2d} collision vector or an array of collision vector (multiple collision){@link me.Rect#collideVsAABB}
		 */
		api.collideType = function(objA, type, multiple) {
			var res;
			// make sure we have a boolean
			multiple = multiple===true ? true : false;
			if (multiple===true) {
				var mres = [], r = 0;
			} 
			// this should be replace by a list of the 4 adjacent cell around the object requesting collision
			for ( var i = gameObjects.length, obj; i--, obj = gameObjects[i];)//for (var i = objlist.length; i-- ;)
			{
				if (obj.inViewport && obj.visible && obj.collidable && (obj.type === type) && (obj!=objA))
				{
					res = obj.collisionBox.collideVsAABB.call(obj.collisionBox, objA.collisionBox);
					if (res.x != 0 || res.y != 0) {
						// notify the object
						obj.onCollision.call(obj, res, objA);
						// return the type (deprecated)
						res.type = obj.type;
						// return a reference of the colliding object
						res.obj  = obj;
						// stop here if we don't look for multiple collision detection
						if (!multiple) {
							return res;
						}
						mres[r++] = res;
					}
				}
			}
			return multiple?mres:null;
		};

		/**
		 * force the redraw (not update) of all objects
		 * @name me.game#repaint
		 * @public
		 * @function
		 */

		api.repaint = function() {
			drawManager.makeAllDirty();
		};

		/**
		 * draw all existing objects
		 * @name me.game#draw
		 * @private
		 * @function
		 */

		api.draw = function() {
			if (drawManager.isDirty) {
				// draw our objects
				drawManager.draw(frameBuffer);

				// call the viewport draw function (for effects)
				api.viewport.draw(frameBuffer)
			}
			// clean everything for next frame
			drawManager.flush();
		};

		// return our object
		return api;

	})();

	/************************************************************************************/
	/*      Screen Object Type                                                          */
	/*      Used by the App Manager                                                     */
	/************************************************************************************/

	/* -----

		Screen object object

		------	*/
	/**
	 * A class skeleton for "Screen" Object <br>
	 * every "screen" object (title screen, credits, ingame, etc...) to be managed <br>
	 * through the state manager must inherit from this base class.
	 * @class
	 * @extends Object
	 * @memberOf me
	 * @constructor
	 * @see me.state
	 * @example
	 * // create a custom loading screen
	 * var CustomLoadingScreen = me.ScreenObject.extend(
	 * {
	 *    // constructor
	 *    init: function()
	 *    {
	 *       // pass true to the parent constructor
	 *       // as we draw our progress bar in the draw function
	 *       this.parent(true);
	 *       // a font logo
	 *       this.logo = new me.Font('century gothic', 32, 'white');
	 *       // flag to know if we need to refresh the display
	 *       this.invalidate = false;
	 *       // load progress in percent
	 *       this.loadPercent = 0;
	 *       // setup a callback
	 *       me.loader.onProgress = this.onProgressUpdate.bind(this);
	 *
	 *    },
	 *
	 *    // will be fired by the loader each time a resource is loaded
	 *    onProgressUpdate: function(progress)
	 *    {
	 *       this.loadPercent = progress;
	 *       this.invalidate = true;
	 *    },
	 *
	 *
	 *    // make sure the screen is only refreshed on load progress
	 *    update: function()
	 *    {
	 *       if (this.invalidate===true)
	 *       {
	 *          // clear the flag
	 *          this.invalidate = false;
	 *          // and return true
	 *          return true;
	 *       }
	 *       // else return false
	 *       return false;
	 *    },
	 *
	 *    // on destroy event
	 *    onDestroyEvent : function ()
	 *    {
	 *       // "nullify" all fonts
	 *       this.logo = null;
	 *    },
	 *
	 *    //	draw function
	 *    draw : function(context)
	 *    {
	 *       // clear the screen
	 *       me.video.clearSurface (context, "black");
	 *
	 *       // measure the logo size
	 *       logo_width = this.logo.measureText(context,"awesome loading screen").width;
	 *
	 *       // draw our text somewhere in the middle
	 *       this.logo.draw(context,
	 *                      "awesome loading screen",
	 *                      ((me.video.getWidth() - logo_width) / 2),
	 *                      (me.video.getHeight() + 60) / 2);
	 *
	 *       // display a progressive loading bar
	 *       var width = Math.floor(this.loadPercent * me.video.getWidth());
	 *
	 *       // draw the progress bar
	 *       context.strokeStyle = "silver";
	 *       context.strokeRect(0, (me.video.getHeight() / 2) + 40, me.video.getWidth(), 6);
	 *       context.fillStyle = "#89b002";
	 *       context.fillRect(2, (me.video.getHeight() / 2) + 42, width-4, 2);
	 *    },
	 * });
	 *
	 */
	me.ScreenObject = Object.extend(
	/** @scope me.ScreenObject.prototype */
	{

		inViewport		: false,
		visible			: false,
		addAsObject		: false,
		isPersistent	: false,
		z				: 999,
		rect			: null,

		/**
		 *	initialization function
		 * @param {Boolean} [addAsObjet] add the object in the game manager object pool<br>
		 * @param {Boolean} [isPersistent] isPersistent make the screen persistent overt level changes<br>
		 * allowing to override the update & draw function to add specific treatment.
		 */

		init : function(addAsObject, isPersistent) {
			this.addAsObject = this.visible = (addAsObject === true) || false;
			this.isPersistent = (this.visible && (isPersistent === true)) || false;
			this.rect = new me.Rect(new me.Vector2d(0, 0), 0, 0);
		},

		/**
		 *	Object reset function
		 * @private
		 */
		reset : function() {

			// reset the game manager
			me.game.reset();

			// call the onReset Function
			this.onResetEvent.apply(this, arguments);

			// add our object to the GameObject Manager
			// allowing to benefit from the keyboard event stuff
			if (this.addAsObject) {
				// make sure we are visible upon reset
				this.visible = true;
				// update the rect size if added as an object
				this.rect = me.game.viewport.getRect();
				// add ourself !
				me.game.add(this, this.z);
			}
			
			// sort the object pool
			me.game.sort();

		},

		/**
		 * getRect function
		 * @private
		 */
		getRect : function() {
			return this.rect;
		},

		/**
		 * destroy function
		 * @private
		 */
		destroy : function() {
			// notify the object
			this.onDestroyEvent.apply(this, arguments);
		},

		/**
		 * update function<br>
		 * optional empty function<br>
		 * only used by the engine if the object has been initialized using addAsObject parameter set to true<br>
		 * @example
		 * // define a Title Screen
		 * var TitleScreen = me.ScreenObject.extend(
		 * {
		 *    // override the default constructor
		 *    init : function()
		 *    {
		 *       //call the parent constructor giving true
		 *       //as parameter, so that we use the update & draw functions
		 *       this.parent(true);
		 *       ...
		 *       ...
		 *     },
		 *     ...
		 * });
		 */
		update : function() {
			return false;
		},

		/**
		 *	frame update function function
		 * @private
		 */
		onUpdateFrame : function() {
			// update the frame counter
			me.timer.update();

			// update all games object
			me.game.update();

			// draw the game objects
			me.game.draw();

			// blit our frame
			me.video.blitSurface();
		},

		/**
		 *	draw function<br>
		 * optional empty function<br>
		 * only used by the engine if the object has been initialized using addAsObject parameter set to true<br>
		 * @example
		 * // define a Title Screen
		 * var TitleScreen = me.ScreenObject.extend(
		 * {
		 *    // override the default constructor
		 *    init : function()
		 *    {
		 *       //call the parent constructor giving true
		 *       //as parameter, so that we use the update & draw functions
		 *       this.parent(true);
		 *       ...
		 *       ...
		 *     },
		 *     ...
		 * });
		 */
		draw : function() {
			// to be extended
		},

		/**
		 *	onResetEvent function<br>
		 * called by the state manager when reseting the object<br>
		 * this is typically where you will load a level, etc...
		 * to be extended
		 *	@param {String[]} [arguments] optional arguments passed when switching state
		 */
		onResetEvent : function() {
			// to be extended
		},

		/**
		 *	onDestroyEvent function<br>
		 * called by the state manager before switching to another state<br>
		 */
		onDestroyEvent : function() {
			// to be extended
		}

	});


	/************************************************************************************/
	/*      Game State Manager                                                          */
	/*      Manage the basic logic of a game/app                                        */
	/************************************************************************************/
	
	/**
	 * a State Manager (state machine)<p>
	 * There is no constructor function for me.state.
	 * @final
	 * @memberOf me
	 * @constructor Should not be called by the user.
	 */

	me.state = (function() {
		
		// list of vendors prefix (note : last modernizr version has
		// a getPrefix function that makes this cleaner and more generic
		var vendors = ['ms', 'moz', 'webkit', 'o'];
		
		// polyfill for RequestAnimationFrame (based on Erik Möller polyfill)
		for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
			window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
			window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
		};
		
		if (!window.requestAnimationFrame) {
			window.requestAnimationFrame = function(callback, element) {
				// TODO : allow to run at a lower rate than 60fps with requestAnimationFrame by skipping frame
				// TODO : integrate setInterval directly here as a fallback
				// (for next version, I plan to review the whole main loop mechanism, so I don't do it now) 
				// in melonJS if this returns -1 clearInterval is used
				return -1;
			};
        };
		
		if (!window.cancelAnimationFrame) {
			window.cancelAnimationFrame = function() {
				return -1;
			};
		};
		
		// hold public stuff in our singleton
		var obj = {};

		/*---------------------------------------------

			PRIVATE STUFF

			---------------------------------------------*/

		// current state
		var _state = -1;
		// SetInterval Id
		var _intervalId = -1;
		// requestAnimeFrame Id
		var _animFrameId = -1;

		// list of screenObject
		var _screenObject = {};

		// fading transition parameters between screen
		var _fade = {
			color : "",
			duration : 0
		};

		// callback when state switch is done
		/** @private */
		var _onSwitchComplete = null;

		// just to keep track of possible extra arguments
		var _extraArgs = null;

		// cache reference to the active screen update frame
		var _activeUpdateFrame = null;

		/**
		 * @ignore
		 */
		function _startRunLoop() {
			// ensure nothing is running first
			if ((_intervalId == -1) && (_animFrameId == -1)) {

				// reset the timer
				me.timer.reset();

				// start the main loop
				if (me.sys.useNativeAnimFrame) {
					// attempt to setup the game loop using requestAnimationFrame
					_animFrameId = window.requestAnimationFrame(_renderFrame);

					if (_animFrameId != -1) {
						return;
					}
					// else feature not supported !

					// disable use of requestAnimationFrame (since unsupported)
					me.sys.useNativeAnimFrame = false;
					//console.log("using setInterval as fallback ("+_animFrameId+")");
				}

				// setup the game loop using setInterval
				_intervalId = setInterval(_activeUpdateFrame, ~~(1000 / me.sys.fps));
			}
		};

		/**
		 * this is only called when using requestAnimFrame stuff
		 * @ignore
		 */
		function _renderFrame() {
			_activeUpdateFrame();
			// we already checked it was supported earlier
			// so no need to do it again here
			_animFrameId = window.requestAnimationFrame(_renderFrame);
		};

		/**
		 * stop the SO main loop
		 * @ignore
		 */
		function _stopRunLoop() {
			// cancel any previous setInterval
			if (_intervalId != -1) {
				clearInterval(_intervalId);
				_intervalId = -1;
			}
			// cancel any previous animationRequestFrame
			if (_animFrameId != -1) {
				window.cancelAnimationFrame(_animFrameId);
				_animFrameId = -1;
			}

		};

		/**
		 * start the SO main loop
		 * @ignore
		 */
		function _switchState(state) {
			// clear previous interval if any
			_stopRunLoop();

			// call the screen object destroy method
			if (_screenObject[_state]) {
				if (_screenObject[_state].screen.visible) {
					// persistent or not, make sure we remove it
					// from the current object list
					me.game.remove.call(me.game, _screenObject[_state].screen, true);
				}
				// notify the object
				_screenObject[_state].screen.destroy();
			}

			if (_screenObject[state])
			{
				// set the global variable
				_state = state;

				// call the reset function with _extraArgs as arguments
				_screenObject[_state].screen.reset.apply(_screenObject[_state].screen, _extraArgs);

				// cache the new screen object update function
				_activeUpdateFrame = _screenObject[_state].screen.onUpdateFrame.bind(_screenObject[_state].screen);

				// and start the main loop of the
				// new requested state
				_startRunLoop();

				// execute callback if defined
				if (_onSwitchComplete) {
					_onSwitchComplete();
				}

				// force repaint
				me.game.repaint();
			 }
		};

		/*---------------------------------------------

			PUBLIC STUFF

			---------------------------------------------*/
		/**
		 * default state value for Loading Screen
		 * @constant
		 * @name me.state#LOADING
		 */
		obj.LOADING = 0;
		/**
		 * default state value for Menu Screen
		 * @constant
		 * @name me.state#MENU
		 */
		obj.MENU = 1;
		/**
		 * default state value for "Ready" Screen
		 * @constant
		 * @name me.state#READY
		 */
		obj.READY = 2;
		/**
		 * default state value for Play Screen
		 * @constant
		 * @name me.state#PLAY
		 */
		obj.PLAY = 3;
		/**
		 * default state value for Game Over Screen
		 * @constant
		 * @name me.state#GAMEOVER
		 */
		obj.GAMEOVER = 4;
		/**
		 * default state value for Game End Screen
		 * @constant
		 * @name me.state#GAME_END
		 */
		obj.GAME_END = 5;
		/**
		 * default state value for High Score Screen
		 * @constant
		 * @name me.state#SCORE
		 */
		obj.SCORE = 6;
		/**
		 * default state value for Credits Screen
		 * @constant
		 * @name me.state#CREDITS
		 */
		obj.CREDITS = 7;
		/**
		 * default state value for Settings Screen
		 * @constant
		 * @name me.state#SETTINGS
		 */
		obj.SETTINGS = 8;
		
		/**
		 * default state value for user defined constants<br>
		 * @constant
		 * @name me.state#USER
		 * @example
		 * var STATE_INFO = me.state.USER + 0;
		 * var STATE_WARN = me.state.USER + 1;
		 * var STATE_ERROR = me.state.USER + 2;
		 * var STATE_CUTSCENE = me.state.USER + 3;
		 */
		obj.USER = 100;

		/**
		 * onPause callback
		 * @type function
		 * @name me.state#onPause
		 */
		obj.onPause = null;

		/**
		 * onResume callback
		 * @type function
		 * @name me.state#onResume
		 */
		obj.onResume = null;

		/**
		 * @ignore
		 */
		obj.init = function() {
			// set the embedded loading screen
			obj.set(obj.LOADING, me.loadingScreen);

			// set pause action on losing focus
			$.addEventListener("blur", function() {
				// only in case we are not loading stuff
				if (me.sys.pauseOnBlur && (_state != obj.LOADING)) {
					obj.pause(true);
				}
				// callback?
				if (obj.onPause)
					obj.onPause();

				// publish the pause notification
				me.event.publish(me.event.STATE_PAUSE);

			}, false);
			// set play action on gaining focus
			$.addEventListener("focus", function() {
				// only in case we are not loading stuff
				if (me.sys.pauseOnBlur && (_state != obj.LOADING)) {
					obj.resume(true);

					// force repaint
					me.game.repaint();
				}
				// callback?
				if (obj.onResume)
					obj.onResume();

				// publish the resume notification
				me.event.publish(me.event.STATE_RESUME);

			}, false);

		};

		/**
		 * pause the current screen object
		 * @name me.state#pause
		 * @public
		 * @function
		 * @param {Boolean} pauseTrack pause current track on screen pause
		 */
		obj.pause = function(music) {
			// stop the main loop
			_stopRunLoop();
			// current music stop
			if (music)
				me.audio.pauseTrack();

		};

		/**
		 * resume the resume screen object
		 * @name me.state#resume
		 * @public
		 * @function
		 * @param {Boolean} resumeTrack resume current track on screen resume
		 */
		obj.resume = function(music) {
			// start the main loop
			_startRunLoop();
			// current music stop
			if (music)
				me.audio.resumeTrack();
		};

		/**
		 * return the running state of the state manager
		 * @name me.state#isRunning
		 * @public
		 * @function
		 * @param {Boolean} true if a "process is running"
		 */
		obj.isRunning = function() {
			return ((_intervalId != -1) || (_animFrameId != -1))
		};

		/**
		 * associate the specified state with a screen object
		 * @name me.state#set
		 * @public
		 * @function
		 * @param {Int} state @see me.state#Constant
		 * @param {me.ScreenObject} so
		 */
		obj.set = function(state, so) {
			_screenObject[state] = {};
			_screenObject[state].screen = so;
			_screenObject[state].transition = true;
		};

		/**
		 * return a reference to the current screen object<br>
		 * useful to call a object specific method
		 * @name me.state#current
		 * @public
		 * @function
		 * @return {me.ScreenObject} so
		 */
		obj.current = function() {
			return _screenObject[_state].screen;
		};

		/**
		 * specify a global transition effect
		 * @name me.state#transition
		 * @public
		 * @function
		 * @param {String} effect (only "fade" is supported for now)
		 * @param {String} color in RGB format (e.g. "#000000")
		 * @param {Int} [duration="1000"] in ms
		 */
		obj.transition = function(effect, color, duration) {
			if (effect == "fade") {
				_fade.color = color;
				_fade.duration = duration;
			}
		};

		/**
		 * enable/disable transition for a specific state (by default enabled for all)
		 * @name me.state#setTransition
		 * @public
		 * @function
		 */

		obj.setTransition = function(state, enable) {
			_screenObject[state].transition = enable;
		};

		/**
		 * change the game/app state
		 * @name me.state#change
		 * @public
		 * @function
		 * @param {Int} state @see me.state#Constant
		 * @param {Arguments} [args] extra arguments to be passed to the reset functions
		 */

		obj.change = function(state) {
			_extraArgs = null;
			if (arguments.length > 1) {
				// store extra arguments if any
				_extraArgs = Array.prototype.slice.call(arguments, 1);
			}
			// if fading effect
			if (_fade.duration && _screenObject[state].transition) {
				/** @private */
				_onSwitchComplete = function() {
					me.game.viewport.fadeOut(_fade.color, _fade.duration);
				};
				me.game.viewport.fadeIn(_fade.color, _fade.duration,
										function() {
											_switchState.defer(state);
										});

			}
			// else just switch without any effects
			else {
				// wait for the last frame to be
				// "finished" before switching
				_switchState.defer(state);

			}
		};

		/**
		 * return true if the specified state is the current one
		 * @name me.state#isCurrent
		 * @public
		 * @function
		 * @param {Int} state @see me.state#Constant
		 */
		obj.isCurrent = function(state) {
			return _state == state;
		};

		// return our object
		return obj;

	})();


	/*---------------------------------------------------------*/
	// END END END
	/*---------------------------------------------------------*/
})(window);
/*
 * MelonJS Game Engine
 * Copyright (C) 2012, Olivier BIOT
 * http://www.melonjs.org
 *
 */

(function($) {

	/**
	 * a default loading screen
	 * @memberOf me
	 * @private
	 * @constructor
	 */
	me.DefaultLoadingScreen = me.ScreenObject.extend({
		/*---
		
			constructor
			
			---*/
		init : function() {
			this.parent(true);
			// melonJS logo
			this.logo1 = new me.Font('century gothic', 32, 'white', 'middle');
			this.logo2 = new me.Font('century gothic', 32, '#89b002', 'middle');
			this.logo2.bold();

			// flag to know if we need to refresh the display
			this.invalidate = false;

			// handle for the susbcribe function
			this.handle = null;
			
			// load progress in percent
			this.loadPercent = 0;
			
		},

		// call when the loader is resetted
		onResetEvent : function() {
			// setup a callback
			this.handle = me.event.subscribe(me.event.LOADER_PROGRESS, this.onProgressUpdate.bind(this));
		},
		
		// destroy object at end of loading
		onDestroyEvent : function() {
			// "nullify" all fonts
			this.logo1 = this.logo2 = null;
			// cancel the callback
			if (this.handle)  {
				me.event.unsubscribe(this.handle);
				this.handle = null;
			}
		},

		// make sure the screen is refreshed every frame 
		onProgressUpdate : function(progress) {
			this.loadPercent = progress;
			this.invalidate = true;
		},

		// make sure the screen is refreshed every frame 
		update : function() {
			if (this.invalidate === true) {
				// clear the flag
				this.invalidate = false;
				// and return true
				return true;
			}
			// else return false
			return false;
		},

		/*---
		
			draw function
		  ---*/

		draw : function(context) {
			
			// measure the logo size
			var logo1_width = this.logo1.measureText(context, "melon").width;
			var xpos = (me.video.getWidth() - logo1_width - this.logo2.measureText(context, "JS").width) / 2;
			var ypos = me.video.getHeight() / 2;
				
			// clear surface
			me.video.clearSurface(context, "black");
			
			// draw the melonJS logo
			this.logo1.draw(context, 'melon', xpos , ypos);
			xpos += logo1_width;
			this.logo2.draw(context, 'JS', xpos, ypos);
			
			ypos += this.logo1.measureText(context, "melon").height / 2;

			// display a progressive loading bar
			var progress = Math.floor(this.loadPercent * me.video.getWidth());

			// draw the progress bar
			context.strokeStyle = "silver";
			context.strokeRect(0, ypos, me.video.getWidth(), 6);
			context.fillStyle = "#89b002";
			context.fillRect(2, ypos + 2, progress - 4, 2);
		}

	});

	/************************************************************************************/
	/*			PRELOADER SINGLETON														*/
	/************************************************************************************/

	/**
	 * a small class to manage loading of stuff and manage resources
	 * There is no constructor function for me.input.
	 * @final
	 * @memberOf me
	 * @constructor Should not be called by the user.
	 */

	me.loader = (function() {
		// hold public stuff in our singletong
		var obj = {};

		// contains all the images loaded
		var imgList = {};
		// contains all the TMX loaded
		var tmxList = {};
		// contains all the binary files loaded
		var binList = {};
		// flag to check loading status
		var resourceCount = 0;
		var loadCount = 0;
		var timerId = 0;
		// keep track of how much TMX file we are loading
		var tmxCount = 0;


		/**
		 * check the loading status
		 * @private
		 */
		function checkLoadStatus() {
			// remove tmxCount from the total resource to be loaded
			// as we will after load each TMX into the level director
			if (loadCount == (resourceCount - tmxCount)) {

				// add all TMX level into the level Director
				for ( var tmxObj in tmxList) {
					if (tmxList[tmxObj].isTMX) {
						// load the level into the levelDirector
						if (me.levelDirector.addTMXLevel(tmxObj)) {
							//progress notification
							obj.onResourceLoaded();
						}
					}
				}

				// wait 1/2s and execute callback (cheap workaround to ensure everything is loaded)
				if (obj.onload) {
					// make sure we clear the timer
					clearTimeout(timerId);
					// trigger the onload callback
					setTimeout(function () {
						obj.onload();
						me.event.publish(me.event.LOADER_COMPLETE);
					}, 300);
					// reset tmxcount for next time
					tmxCount = 0;
				} else
					console.error("no load callback defined");
			} else {
				timerId = setTimeout(checkLoadStatus, 100);
			}
		};

		/**
		 * load Images
		 *	
		 *	call example : 
		 *	
		 *	preloadImages(
		 *				 [{name: 'image1', src: 'images/image1.png'},
		 * 				  {name: 'image2', src: 'images/image2.png'},
		 *				  {name: 'image3', src: 'images/image3.png'},
		 *				  {name: 'image4', src: 'images/image4.png'}]);
		 * @private
		 */
		
		function preloadImage(img, onload, onerror) {
			// create new Image object and add to list
			imgList[img.name] = new Image();
			imgList[img.name].onload = onload;
			imgList[img.name].onerror = onerror;
			imgList[img.name].src = img.src + me.nocache;
		};

		/**
		 * preload TMX files
		 * @private
		 */
		function preloadTMX(tmxData, onload, onerror) {
			var xmlhttp = new XMLHttpRequest();
			
			if (me.utils.getFileExtension(tmxData.src).toLowerCase() !== 'json') {
				// to ensure our document is treated as a XML file
				if (xmlhttp.overrideMimeType)
					xmlhttp.overrideMimeType('text/xml');
			}
			
			xmlhttp.open("GET", tmxData.src + me.nocache, true);
						
			// set the callbacks
			xmlhttp.ontimeout = onerror;
			xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState==4) {
					// status = 0 when file protocol is used, or cross-domain origin,
					// (With Chrome use "--allow-file-access-from-files --disable-web-security")
					if ((xmlhttp.status==200) || ((xmlhttp.status==0) && xmlhttp.responseText)){
						// get the TMX content
						tmxList[tmxData.name] = {
							data: xmlhttp.responseText,
							isTMX: (tmxData.type === "tmx"),
							// Sore the data format ('tmx', 'json')
							type : me.utils.getFileExtension(tmxData.src).toLowerCase()
						};
						// fire the callback
						onload();
					} else {
						onerror();
					}
				}
			};
			
			// send the request
			xmlhttp.send(null);
			
			
		};
			
		/**
		 * preload Binary files
		 * @private
		 */
		function preloadBinary(data, onload, onerror) {
			var httpReq = new XMLHttpRequest();

			// load our file
			httpReq.open("GET", data.src + me.nocache, false);
			httpReq.responseType = "arraybuffer";
			httpReq.onerror = onerror;
			httpReq.onload = function(event){
				var arrayBuffer = httpReq.response;
				if (arrayBuffer) {
					var byteArray = new Uint8Array(arrayBuffer);
					var buffer = [];
					binList[data.name] = new dataType();
					for (var i = 0; i < byteArray.byteLength; i++) { 
						buffer[i] = String.fromCharCode(byteArray[i]);
					}
					binList[data.name].data = buffer.join("");
					// callback
					onload();
				}
			};
			httpReq.send();
		};


		/* ---
			
			PUBLIC STUFF
				
			---										*/

		/* ---
		
			onload callback : to be initialized
			
			---*/
		/**
		 * onload callback
		 * @public
		 * @type Function
		 * @name me.loader#onload
		 * @example
		 *
		 * // set a callback when everything is loaded
		 * me.loader.onload = this.loaded.bind(this);
		 */
		obj.onload = undefined;

		/**
		 * onProgress callback<br>
		 * each time a resource is loaded, the loader will fire the specified function,
		 * giving the actual progress [0 ... 1], as argument.
		 * @public
		 * @type Function
		 * @name me.loader#onProgress
		 * @example
		 *
		 * // set a callback for progress notification
		 * me.loader.onProgress = this.updateProgress.bind(this);
		 */
		obj.onProgress = undefined;

		/**
		 *	just increment the number of already loaded resources
		 * @private
		 */

		obj.onResourceLoaded = function(e) {

			// increment the loading counter
			loadCount++;

			// callback ?
			var progress = obj.getLoadProgress();
			if (obj.onProgress) {
				// pass the load progress in percent, as parameter
				obj.onProgress(progress);
			}
			me.event.publish(me.event.LOADER_PROGRESS, [progress]);
		};
		
		/**
		 * on error callback for image loading 	
		 * @private
		 */
		obj.onLoadingError = function(res) {
			throw "melonJS: Failed loading resource " + res.src;
		};


		/**
		 * set all the specified game resources to be preloaded.<br>
		 * each resource item must contain the following fields :<br>
		 * - name    : internal name of the resource<br>
		 * - type    : "binary", "image", "tmx", "tsx", "audio"<br>
		 * - src     : path and file name of the resource<br>
		 * (!) for audio :<br>
		 * - src     : path (only) where resources are located<br>
		 * - channel : number of channels to be created<br>
		 * <br>
		 * @name me.loader#preload
		 * @public
		 * @function
		 * @param {Array.<string>} resources
		 * @example
		 * var g_resources = [ {name: "tileset-platformer",  type: "image",  src: "data/map/tileset-platformer.png"},
		 *                     {name: "meta_tiles",          type: "tsx",    src: "data/map/meta_tiles.tsx"},
		 *                     {name: "map1",                type: "tmx",    src: "data/map/map1.tmx"},
		 *                     {name: "cling",               type: "audio",  src: "data/audio/",        channel: 2},
		 *                     {name: "ymTrack",             type: "binary", src: "data/audio/main.ym"}
		 *                    ];
		 * ...
		 *
		 * // set all resources to be loaded
		 * me.loader.preload(g_resources);
		 */
		obj.preload = function(res) {
			// parse the resources
			for ( var i = 0; i < res.length; i++) {
				resourceCount += obj.load(res[i], obj.onResourceLoaded.bind(obj), obj.onLoadingError.bind(obj, res[i]));
			};
			// check load status
			checkLoadStatus();
		};

		/**
		 * Load a single resource (to be used if you need to load additional resource during the game)<br>
		 * Given parmeter must contain the following fields :<br>
		 * - name    : internal name of the resource<br>
		 * - type    : "binary", "image", "tmx", "tsx", "audio"
		 * - src     : path and file name of the resource<br>
		 * @name me.loader#load
		 * @public
		 * @function
		 * @param {Object} resource
		 * @param {Function} onload function to be called when the resource is loaded
		 * @param {Function} onerror function to be called in case of error
		 * @example
		 * // load a image asset
		 * me.loader.load({name: "avatar",  type:"image",  src: "data/avatar.png"}, this.onload.bind(this), this.onerror.bind(this));
		 */

		obj.load = function(res, onload, onerror) {
			// fore lowercase for the resource name
			res.name = res.name.toLowerCase();
			// check ressource type
			switch (res.type) {
				case "binary":
					// reuse the preloadImage fn
					preloadBinary.call(this, res, onload, onerror);
					return 1;

				case "image":
					// reuse the preloadImage fn
					preloadImage.call(this, res, onload, onerror);
					return 1;

				case "tmx":
					preloadTMX.call(this, res, onload, onerror);
					// increase the resourceCount by 1
					// allowing to add the loading of level in the 
					// levelDirector as part of the loading progress
					tmxCount += 1;
					return 2;

				case "tsx":
					preloadTMX.call(this, res, onload, onerror);
					return 1;

				case "audio":
					me.audio.setLoadCallback(onload);
					// only load is sound is enable
					if (me.audio.isAudioEnable()) {
						me.audio.load(res);
						return 1;
					}
					break;

				default:
					throw "melonJS: me.loader.load : unknown or invalid resource type : " + res.type;
					break;
			};
			return 0;
		};

		/**
		 * unload specified resource to free memory
		 * @name me.loader#unload
		 * @public
		 * @function
		 * @param {Object} resource
		 * @return {boolean} true if unloaded
		 * @example me.loader.unload({name: "avatar",  type:"image",  src: "data/avatar.png"});
		 */
		obj.unload = function(res) {
			res.name = res.name.toLowerCase();
			switch (res.type) {
				case "binary":
					if (!(res.name in binList))
						return false;

					delete binList[res.name];
					return true;

				case "image":
					if (!(res.name in imgList))
						return false;

					delete imgList[res.name];
					return true;

				case "tmx":
				case "tsx":
					if (!(res.name in tmxList))
						return false;

					delete tmxList[res.name];
					return true;

				case "audio":
					return me.audio.unload(res.name);

				default:
					throw "melonJS: me.loader.unload : unknown or invalid resource type : " + res.type;
			}
		};

		/**
		 * unload all resources to free memory
		 * @name me.loader#unloadAll
		 * @public
		 * @function
		 * @example me.loader.unloadAll();
		 */
		obj.unloadAll = function() {
			var name;

			// unload all binary resources
			for (name in binList)
				obj.unload(name);

			// unload all image resources
			for (name in imgList)
				obj.unload(name);

			// unload all tmx resources
			for (name in tmxList)
				obj.unload(name);

			// unload all audio resources
			me.audio.unloadAll();
		};

		/**
		 * return the specified TMX object storing type
		 * @name me.loader#getTMXFormat
		 * @public
		 * @function
		 * @param {String} tmx name of the tmx/tsx element ("map1");
		 * @return {String} 'tmx' or 'json'
		 */
		obj.getTMXFormat = function(elt) {
			// avoid case issue
			elt = elt.toLowerCase();
			if (elt in tmxList)
				return tmxList[elt].type;
			else {
				//console.log ("warning %s resource not yet loaded!",name);
				return null;
			}

		};
		/**
		 * return the specified TMX/TSX object
		 * @name me.loader#getTMX
		 * @public
		 * @function
		 * @param {String} tmx name of the tmx/tsx element ("map1");
		 * @return {TMx} 
		 */
		obj.getTMX = function(elt) {
			// avoid case issue
			elt = elt.toLowerCase();
			if (elt in tmxList)
				return tmxList[elt].data;
			else {
				//console.log ("warning %s resource not yet loaded!",name);
				return null;
			}
		};
		
		/**
		 * return the specified Binary object
		 * @name me.loader#getBinary
		 * @public
		 * @function
		 * @param {String} name of the binary object ("ymTrack");
		 * @return {Object} 
		 */
		obj.getBinary = function(elt) {
			// avoid case issue
			elt = elt.toLowerCase();
			if (elt in binList)
				return binList[elt];
			else {
				//console.log ("warning %s resource not yet loaded!",name);
				return null;
			}

		};


		/**
		 * return the specified Image Object
		 * @name me.loader#getImage
		 * @public
		 * @function
		 * @param {String} Image name of the Image element ("tileset-platformer");
		 * @return {Image} 
		 */

		obj.getImage = function(elt) {
			// avoid case issue
			elt = elt.toLowerCase();
			if (elt in imgList) {
				if (me.sys.cacheImage === true) {
					// build a new canvas
					var tempCanvas = me.video.createCanvasSurface(
							imgList[elt].width, imgList[elt].height);
					// draw the image into the canvas context
					tempCanvas.drawImage(imgList[elt], 0, 0);
					// return our canvas
					return tempCanvas.canvas;
				} else {
					// return the corresponding Image object
					return imgList[elt];
				}
			} else {
				//console.log ("warning %s resource not yet loaded!",name);
				return null;
			}

		};

		/**
		 * Return the loading progress in percent
		 * @name me.loader#getLoadProgress
		 * @public
		 * @function
		 * @deprecated use callback instead
		 * @return {Number} 
		 */

		obj.getLoadProgress = function() {
			return loadCount / resourceCount;
		};

		// return our object
		return obj;

	})();

	/*---------------------------------------------------------*/
	// END END END
	/*---------------------------------------------------------*/
})(window);
/*
 * MelonJS Game Engine
 * Copyright (C) 2012, Olivier BIOT
 * http://www.melonjs.org
 *
 */

(function($) {

	/************************************************************************************/
	/*                                                                                  */
	/*      a vector2D Object                                                           */
	/*                                                                                  */
	/************************************************************************************/
	/**
	 * a generic 2D Vector Object
	 * @class
	 * @extends Object
	 * @memberOf me
	 * @constructor
	 * @param {int} x x value of the vector
	 * @param {int} y y value of the vector
	 */
	me.Vector2d = Object.extend(
	/** @scope me.Vector2d.prototype */
	{
		/**
		 * x value of the vector
		 * @public
		 * @type Number
		 * @name me.Vector2d#x
		 */
		x : 0,
		/**
		 * y value of the vector
		 * @public
		 * @type Number
		 * @name me.Vector2d#y
		 */
		y : 0,

		/** @private */
		init : function(/**Number*/ x, /**Number*/ y) {
			this.x = x || 0;
			this.y = y || 0;
		},
		
		/**
		 * set the Vector x and y properties to the given values<br>
		 * @param {Number} x
		 * @param {Number} y
		 */
		set : function(x, y) {
			this.x = x;
			this.y = y;
		},

		/**
		 * set the Vector x and y properties to 0
		 */
		setZero : function() {
			this.set(0, 0);
		},

		/**
		 * set the Vector x and y properties using the passed vector
		 * @param {me.Vector2d} v
		 */
		setV : function(v) {
			this.x = v.x;
			this.y = v.y;
		},

		/**
		 * Add the passed vector to this vector
		 * @param {me.Vector2d} v
		 */
		add : function(v) {
			this.x += v.x;
			this.y += v.y;
		},

		/**
		 * Substract the passed vector to this vector
		 * @param {me.Vector2d} v
		 */
		sub : function(v) {
			this.x -= v.x;
			this.y -= v.y;
		},

		/**
		 * Multiply this vector values by the passed vector
		 * @param {me.Vector2d} v
		 */
		scale : function(v) {
			this.x *= v.x;
			this.y *= v.y;
		},

		/**
		 * Divide this vector values by the passed value
		 * @param {Number} value
		 */
		div : function(n) {
			this.x /= n;
			this.y /= n;
		},

		/**
		 * Update this vector values to absolute values
		 */
		abs : function() {
			if (this.x < 0)
				this.x = -this.x;
			if (this.y < 0)
				this.y = -this.y;
		},

		/**
		 * Clamp the vector value within the specified value range
		 * @param {Number} low
		 * @param {Number} high
		 * @return {me.Vector2d}
		 */
		clamp : function(low, high) {
			return new me.Vector2d(this.x.clamp(low, high), this.y.clamp(low, high));
		},
		
		/**
		 * Clamp this vector value within the specified value range
		 * @param {Number} low
		 * @param {Number} high
		 */
		clampSelf : function(low, high) {
			this.x = this.x.clamp(low, high);
			this.y = this.y.clamp(low, high);
			return this;
		},

		/**
		 * Update this vector with the minimum value between this and the passed vector
		 * @param {me.Vector2d} v
		 */
		minV : function(v) {
			this.x = this.x < v.x ? this.x : v.x;
			this.y = this.y < v.y ? this.y : v.y;
		},

		/**
		 * Update this vector with the maximum value between this and the passed vector
		 * @param {me.Vector2d} v
		 */
		maxV : function(v) {
			this.x = this.x > v.x ? this.x : v.x;
			this.y = this.y > v.y ? this.y : v.y;
		},

		/**
		 * Floor the vector values
		 * @return {me.Vector2d}
		 */
		floor : function() {
			return new me.Vector2d(~~this.x, ~~this.y);
		},
		
		/**
		 * Floor this vector values
		 */
		floorSelf : function() {
			this.x = ~~this.x;
			this.y = ~~this.y;
			return this;
		},
		
		/**
		 * Ceil the vector values
		 * @return {me.Vector2d}
		 */
		ceil : function() {
			return new me.Vector2d(Math.ceil(this.x), Math.ceil(this.y));
		},
		
		/**
		 * Ceil this vector values
		 */
		ceilSelf : function() {
			this.x = Math.ceil(this.x);
			this.y = Math.ceil(this.y);
			return this;
		},

		/**
		 * Negate the vector values
		 * @return {me.Vector2d}
		 */
		negate : function() {
			return new me.Vector2d(-this.x, -this.y);
		},

		/**
		 * Negate this vector values
		 */
		negateSelf : function() {
			this.x = -this.x;
			this.y = -this.y;
			return this;
		},

		/**
		 * Copy the x,y values of the passed vector to this one
		 * @param {me.Vector2d} v
		 */
		copy : function(v) {
			this.x = v.x;
			this.y = v.y;
		},
		
		/**
		 * return true if the two vectors are the same
		 * @param {me.Vector2d} v
		 * @return {Boolean}
		 */
		equals : function(v) {
			return ((this.x === v.x) && (this.y === v.y));
		},

		/**
		 * return the lenght (magnitude) of this vector
		 * @return {Number}
		 */		
		 length : function() {
			return Math.sqrt(this.x * this.x + this.y * this.y);
		},

		/**
		 * normalize this vector (scale the vector so that its magnitude is 1)
		 * @return {Number}
		 */		
		normalize : function() {
			var len = this.length();
			// some limit test
			if (len < Number.MIN_VALUE) {
				return 0.0;
			}
			var invL = 1.0 / len;
			this.x *= invL;
			this.y *= invL;
			return len;
		},

		/**
		 * return the doc product of this vector and the passed one
		 * @param {me.Vector2d} v
		 * @return {Number}
		 */	
		dotProduct : function(/**me.Vector2d*/ v) {
			return this.x * v.x + this.y * v.y;
		},

		/**
		 * return the distance between this vector and the passed one
		 * @param {me.Vector2d} v
		 * @return {Number}
		 */			
		distance : function(v) {
			return Math.sqrt((this.x - v.x) * (this.x - v.x) + (this.y - v.y) * (this.y - v.y));
		},
		
		/**
		 * return the angle between this vector and the passed one
		 * @param {me.Vector2d} v
		 * @return {Number} angle in radians
		 */			
		angle : function(v) {
			return Math.atan2((v.y - this.y), (v.x - this.x));
		},

		/**
		 * return a clone copy of this vector
		 * @return {me.Vector2d}
		 */			
		clone : function() {
			return new me.Vector2d(this.x, this.y);
		},

		/**
		 * convert the object to a string representation
		 * @return {String}
		 */			
		 toString : function() {
			return 'x:' + this.x + 'y:' + this.y;
		}

	});
	/************************************************************************************/
	/*                                                                                  */
	/*      a rectangle Class Object                                                    */
	/*                                                                                  */
	/************************************************************************************/
	/**
	 * a rectangle Object
	 * @class
	 * @extends Object
	 * @memberOf me
	 * @constructor
	 * @param {me.Vector2d} v x,y position of the rectange
	 * @param {int} w width of the rectangle
	 * @param {int} h height of the rectangle
	 */
	me.Rect = Object
			.extend(
			/** @scope me.Rect.prototype */
			{
				/**
				 * position of the Rectange
				 * @public
				 * @type me.Vector2d
				 * @name me.Rect#pos
				 */
				pos : null,

				/**
				 * allow to reduce the collision box size<p>
				 * while keeping the original position vector (pos)<p>
				 * corresponding to the entity<p>
				 * colPos is a relative offset to pos
				 * @private
				 * @type me.Vector2d
				 * @name me.Rect#colPos
				 * @see me.Rect#adjustSize
				 */
				colPos : null,
				
				/**
				 * left coordinate of the Rectange<br>
				 * takes in account the adjusted size of the rectangle (if set)
				 * @public
				 * @type Int
				 * @name me.Rect#left
				 */
				 // define later in the constructor
				
				/**
				 * right coordinate of the Rectange<br>
				 * takes in account the adjusted size of the rectangle (if set)
				 * @public
				 * @type Int
				 * @name me.Rect#right
				 */
				 // define later in the constructor
				 
				/**
				 * bottom coordinate of the Rectange<br>
				 * takes in account the adjusted size of the rectangle (if set)
				 * @public
				 * @type Int
				 * @name me.Rect#bottom
				 */
				// define later in the constructor
				
				/**
				 * top coordinate of the Rectange<br>
				 * takes in account the adjusted size of the rectangle (if set)
				 * @public
				 * @type Int
				 * @name me.Rect#top
				 */
				// define later in the constructor
				 
				/**
				 * width of the Rectange
				 * @public
				 * @type Int
				 * @name me.Rect#width
				 */
				width : 0,
				/**
				 * height of the Rectange
				 * @public
				 * @type Int
				 * @name me.Rect#height
				 */
				height : 0,

				// half width/height
				hWidth : 0,
				hHeight : 0,
				
				
				/** @private */
				init : function(v, w, h) {
					// reference to the initial position
					// we don't copy it, so we can use it later
					this.pos = v;

					// allow to reduce the hitbox size
					// while on keeping the original pos vector
					// corresponding to the entity
					this.colPos = new me.Vector2d();

					this.width = w;
					this.height = h;

					// half width/height
					this.hWidth = ~~(w / 2);
					this.hHeight = ~~(h / 2);

					// redefine some properties to ease our life when getting the rectangle coordinates
					Object.defineProperty(this, "left", {
						get : function() {
							return this.pos.x;
						},
						configurable : true
					});
					
					Object.defineProperty(this, "right", {
						get : function() {
							return this.pos.x + this.width;
						},
						configurable : true
					});

					Object.defineProperty(this, "top", {
						get : function() {
							return this.pos.y;
						},
						configurable : true
					});

					Object.defineProperty(this, "bottom", {
						get : function() {
							return this.pos.y + this.height;
						},
						configurable : true
					});

				},

				/**
				 * set new value to the rectangle
				 * @param {me.Vector2d} v x,y position for the rectangle
				 * @param {int} w width of the rectangle
				 * @param {int} h height of the rectangle	 
				 */
				set : function(v, w, h) {
					this.pos = v; // Vector2d - top left corner

					this.width = w;
					this.height = h;
					
					this.hWidth = ~~(w / 2);
					this.hHeight = ~~(h / 2);
				},

				/**
				 * return a new Rect with this rectangle coordinates
				 * @return {me.Rect} new rectangle	
				 */
				getRect : function() {
					return new me.Rect(this.pos.clone(), this.width,
							this.height);
				},

				/**
				 * merge this rectangle with another one
				 * @param {me.Rect} rect other rectangle to union with
				 * @return {me.Rect} the union(ed) rectangle	 
				 */
				union : function(/** {me.Rect} */ r) {
					var x1 = Math.min(this.pos.x, r.pos.x);
					var y1 = Math.min(this.pos.y, r.pos.y);

					this.width = Math.ceil(Math.max(this.pos.x + this.width,
							r.pos.x + r.width)
							- x1);
					this.height = Math.ceil(Math.max(this.pos.y + this.height,
							r.pos.y + r.height)
							- y1);
					this.pos.x = ~~x1;
					this.pos.y = ~~y1;

					return this;
				},

				/**
				 * update the size of the collision rectangle<br>
				 * the colPos Vector is then set as a relative offset to the initial position (pos)<br>
				 * <img src="me.Rect.colpos.png"/>
				 * @private
				 * @param {int} x x offset (specify -1 to not change the width)
				 * @param {int} w width of the hit box
				 * @param {int} y y offset (specify -1 to not change the height)
				 * @param {int} h height of the hit box
				 */
				adjustSize : function(x, w, y, h) {
					if (x != -1) {
						this.colPos.x = x;
						this.width = w;
						this.hWidth = ~~(this.width / 2);
						
						// avoid Property definition if not necessary
						if (this.left !== this.pos.x + this.colPos.x) {
							// redefine our properties taking colPos into account
							Object.defineProperty(this, "left", {
								get : function() {
									return this.pos.x + this.colPos.x;
								},
								configurable : true
							});
						}
						if (this.right !== this.pos.x + this.colPos.x + this.width) {
							Object.defineProperty(this, "right", {
								get : function() {
									return this.pos.x + this.colPos.x + this.width;
								},
								configurable : true
							});
						}
					}
					if (y != -1) {
						this.colPos.y = y;
						this.height = h;
						this.hHeight = ~~(this.height / 2);
						
						// avoid Property definition if not necessary
						if (this.top !== this.pos.y + this.colPos.y) {
							// redefine our properties taking colPos into account
							Object.defineProperty(this, "top", {
								get : function() {
									return this.pos.y + this.colPos.y;
								},
								configurable : true
							});
						}
						if (this.bottom !== this.pos.y + this.colPos.y + this.height) {
							Object.defineProperty(this, "bottom", {
								get : function() {
									return this.pos.y + this.colPos.y + this.height;
								},
								configurable : true
							});
						}
					}
				},

				/**
				 *	
				 * flip on X axis
				 * usefull when used as collision box, in a non symetric way
				 * @private
				 * @param sw the sprite width
				 */
				flipX : function(sw) {
					this.colPos.x = sw - this.width - this.colPos.x;
					this.hWidth = ~~(this.width / 2);
				},

				/**
				 *	
				 * flip on Y axis
				 * usefull when used as collision box, in a non symetric way
				 * @private
				 * @param sh the height width
				 */
				flipY : function(sh) {
					this.colPos.y = sh - this.height - this.colPos.y;
					this.hHeight = ~~(this.height / 2);
				},
				
				/**
				 * return true if this rectangle is equal to the specified one
				 * @param {me.Rect} rect
				 * @return {Boolean}
				 */
				equals : function(r) {
					return (this.left 	=== r.left	&& 
							this.right 	=== r.right && 
							this.top 	=== r.top 	&&
							this.bottom === r.bottom);
				},

				/**
				 * check if this rectangle is intersecting with the specified one
				 * @param  {me.Rect} rect
				 * @return {boolean} true if overlaps
				 */
				overlaps : function(r)	{
					return (this.left < r.right && 
							r.left < this.right && 
							this.top < r.bottom &&
							r.top < this.bottom);
				},
				
				/**
				 * check if this rectangle is within the specified one
				 * @param  {me.Rect} rect
				 * @return {boolean} true if within
				 */
				within: function(r) {
					return (r.left <= this.left && 
						    r.right >= this.right &&
						    r.top <= this.top && 
							r.bottom >= this.bottom);
                },
				
				/**
				 * check if this rectangle contains the specified one
				 * @param  {me.Rect} rect
				 * @return {boolean} true if contains
				 */
				contains: function(r) {
					return (r.left >= this.left && 
							r.right <= this.right &&
							r.top >= this.top && 
							r.bottom <= this.bottom);
                },
				
				/**
				 * check if this rectangle contains the specified point
				 * @param  {me.Vector2d} point
				 * @return {boolean} true if contains
				 */
				containsPoint: function(v) {
					return  (v.x >= this.left && v.x <= this.right && 
							(v.y >= this.top) && v.y <= this.bottom)
				},


				/**
				 * AABB vs AABB collission dectection<p>
				 * If there was a collision, the return vector will contains the following values: 
				 * @example
				 * if (v.x != 0 || v.y != 0)
				 * { 	
				 *   if (v.x != 0)
				 *   {
				 *      // x axis
				 *      if (v.x<0)
				 *         console.log("x axis : left side !");
				 *      else
				 *         console.log("x axis : right side !");
				 *   }
				 *   else
				 *   {
				 *      // y axis
				 *      if (v.y<0)
				 *         console.log("y axis : top side !");
				 *      else
				 *         console.log("y axis : bottom side !");			
				 *   }
				 *		
				 * }
				 * @private
				 * @param {me.Rect} rect
				 * @return {me.Vector2d} 
				 */
				collideVsAABB : function(/** {me.Rect} */ rect) {
					// response vector
					var p = new me.Vector2d(0, 0);

					// check if both box are overlaping
					if (this.overlaps(rect)) {
						// compute delta between this & rect
						var dx = this.left + this.hWidth  - rect.left - rect.hWidth;
						var dy = this.top  + this.hHeight - rect.top  - rect.hHeight;

						// compute penetration depth for both axis
						p.x = (rect.hWidth + this.hWidth) - (dx < 0 ? -dx : dx); // - Math.abs(dx);
						p.y = (rect.hHeight + this.hHeight)
								- (dy < 0 ? -dy : dy); // - Math.abs(dy);

						// check and "normalize" axis
						if (p.x < p.y) {
							p.y = 0;
							p.x = dx < 0 ? -p.x : p.x;
						} else {
							p.x = 0;
							p.y = dy < 0 ? -p.y : p.y;
						}
					}
					return p;
				},

				/**
				 * debug purpose
				 * @private
				 */
				draw : function(context, color) {
					// draw the rectangle
					context.strokeStyle = color || "red";
					context.strokeRect(this.left, this.top, this.width, this.height);

				}
	});

	/*---------------------------------------------------------*/
	// END END END
	/*---------------------------------------------------------*/
})(window);
/*
 * MelonJS Game Engine
 * Copyright (C) 2012, Olivier BIOT
 * http://www.melonjs.org
 *
 */

(function($) {

	/**
	 * debug stuff.
	 * @namespace
	 */
	me.debug = {
		
		/**
		 * enable the FPS counter <br>
		 * default value : false
		 * @type {Boolean}
		 * @memberOf me.debug
		 */
		displayFPS : false,

		/**
		 * render object Rectangle & Collision Box<br>
		 * default value : false
		 * @type {Boolean}
		 * @memberOf me.debug
		 */
		renderHitBox : false,

		/**
		 * render Collision Map layer<br>
		 * default value : false
		 * @type {Boolean}
		 * @memberOf me.debug
		 */
		renderCollisionMap : false,

		/**
		 * render dirty region/rectangle<br>
		 * default value : false<br>
		 * (feature must be enabled through the me.sys.dirtyRegion flag)
		 * @type {Boolean}
		 * @memberOf me.debug
		 */
		renderDirty : false,
		
		/**
		 * render entities current velocity<br>
		 * default value : false<br>
		 * @type {Boolean}
		 * @memberOf me.debug
		 */
		renderVelocity : false
		
	};


	/*---------------------------------------------------------*/
	// END END END
	/*---------------------------------------------------------*/
})(window);
/*
 * MelonJS Game Engine
 * Copyright (C) 2012, Olivier BIOT
 * http://www.melonjs.org
 *
 */

(function($) {

	// some ref shortcut
	var MIN = Math.min, MAX = Math.max;

	/************************************************************************************/
	/*		a viewport/camera entity																		*/
	/************************************************************************************/
	/**
	 * a camera/viewport Object
	 * @class
	 * @extends me.Rect
	 * @memberOf me
	 * @constructor
	 * @param {int} minX start x offset
	 * @param {int} minY start y offset
	 * @param {int} maxX end x offset
	 * @param {int} maxY end y offset
	 * @param {int} [realw] real world width limit
	 * @param {int} [realh] real world height limit
	 */
	me.Viewport = me.Rect
			.extend(
			/** @scope me.Viewport.prototype */
			{

				/**
				 *	Axis constant
				 * @public
				 * @type enum
				 */
				AXIS : {
					NONE : 0,
					HORIZONTAL : 1,
					VERTICAL : 2,
					BOTH : 3
				},

				// world limit
				limits : null,

				// target to follow
				target : null,

				// axis to follow
				follow_axis : 0,

				// shake parameters
				_shake : null,
				// fade parameters
				_fadeIn : null,
				_fadeOut : null,

				// cache some values
				_deadwidth : 0,
				_deadheight : 0,
				_limitwidth : 0,
				_limitheight : 0,

				/** @private */
				init : function(minX, minY, maxX, maxY, realw, realh) {
					// viewport coordinates
					this.parent(new me.Vector2d(minX, minY), maxX - minX, maxY - minY);

					// real worl limits
					this.limits = new me.Vector2d(realw||this.width, realh||this.height);

					// target to follow
					this.target = null;

					// default value follow 
					this.follow_axis = this.AXIS.NONE;

					// shake variables
					this._shake = {
						intensity : 0,
						duration : 0,
						axis : this.AXIS.BOTH,
						onComplete : null
					};
					// flash variables
					this._fadeOut = {
						color : 0,
						alpha : 0.0,
						duration : 0,
						tween : null
					};
					// fade variables
					this._fadeIn = {
						color : 0,
						alpha : 1.0,
						duration : 0,
						tween : null
					};

					// set a default deadzone
					this.setDeadzone(this.width / 6, this.height / 6);
				},

				// -- some private function ---

				/** @private */
				_followH : function(target) {
					if ((target.x - this.pos.x) > (this._deadwidth)) {
						this.pos.x = ~~MIN((target.x) - (this._deadwidth), this._limitwidth);
						return true;
					}
					else if ((target.x - this.pos.x) < (this.deadzone.x)) {
						this.pos.x = ~~MAX((target.x) - this.deadzone.x, 0);
						return true;
					}
					return false;
				},

				/** @private */
				_followV : function(target) {
					if ((target.y - this.pos.y) > (this._deadheight)) {
						this.pos.y = ~~MIN((target.y) - (this._deadheight),	this._limitheight);
						return true;
					}
					else if ((target.y - this.pos.y) < (this.deadzone.y)) {
						this.pos.y = ~~MAX((target.y) - this.deadzone.y, 0);
						return true;
					}
					return false;
				},

				// -- public function ---

				/**
				 * reset the viewport to specified coordinates
				 * @param {int} x
				 * @param {int} y
				 */
				reset : function(x, y) {
					// reset the initial viewport position to 0,0
					this.pos.x = x || 0;
					this.pos.y = y || 0;

					// reset the target
					this.target = null;

					// reset default axis value for follow 
					this.follow_axis = null;

				},

				/**
				 * Change the deadzone settings
				 * @param {int} w deadzone width
				 * @param {int} h deadzone height
				 */
				setDeadzone : function(w, h) {
					this.deadzone = new me.Vector2d(~~((this.width - w) / 2),
							~~((this.height - h) / 2 - h * 0.25));
					// cache some value
					this._deadwidth = this.width - this.deadzone.x;
					this._deadheight = this.height - this.deadzone.y;

					// force a camera update
					this.update(true);

				},

				/**
				 * set the viewport bound (real world limit)
				 * @param {int} w real world width
				 * @param {int} h real world height
				 */
				setBounds : function(w, h) {
					this.limits.set(w, h);
					// cache some value
					this._limitwidth = this.limits.x - this.width;
					this._limitheight = this.limits.y - this.height;

				},

				/**
				 * set the viewport to follow the specified entity
				 * @param {Object} Object ObjectEntity or Position Vector to follow
				 * @param {axis} [axis="AXIS.BOTH"] AXIS.HORIZONTAL, AXIS.VERTICAL, AXIS.BOTH
				 */

				follow : function(target, axis) {
					if (target instanceof me.ObjectEntity)
						this.target = target.pos;
					else if (target instanceof me.Vector2d)
						this.target = target;
					else
						throw "melonJS: invalid target for viewport.follow";
					// if axis is null, camera is moved on target center
					this.follow_axis = axis || this.AXIS.BOTH;
					
					// force a camera update
					this.update(true);
				},

				/**
				 * move the viewport to the specified coordinates
				 * @param {int} x
				 * @param {int} y
				 */

				move : function(x, y) {
					var newx = ~~(this.pos.x + x);
					var newy = ~~(this.pos.y + y);
					
					this.pos.x = newx.clamp(0,this._limitwidth);
					this.pos.y = newy.clamp(0,this._limitheight);
				},

				/** @private */
				update : function(updateTarget) {

					if (this.target && updateTarget) {
						switch (this.follow_axis) {
						case this.AXIS.NONE:
							//this.focusOn(this.target);
							break;

						case this.AXIS.HORIZONTAL:
							updateTarget = this._followH(this.target);
							break;

						case this.AXIS.VERTICAL:
							updateTarget = this._followV(this.target);
							break;

						case this.AXIS.BOTH:
							updateTarget = this._followH(this.target);
							updateTarget = this._followV(this.target) || updateTarget;
							break;

						default:
							break;
						}
					}

					if (this._shake.duration > 0) {
						this._shake.duration -= me.timer.tick;
						if (this._shake.duration < 0) {
							if (this._shake.onComplete)
								this._shake.onComplete();
						} else {
							if ((this._shake.axis == this.AXIS.BOTH)
									|| (this._shake.axis == this.AXIS.HORIZONTAL)) {
								var shakex = (Math.random() * this._shake.intensity);

								if (this.pos.x + this.width + shakex < this.limits.x)
									this.pos.x += ~~shakex;
								else
									this.pos.x -= ~~shakex;
							}
							if ((this._shake.axis == this.AXIS.BOTH)
									|| (this._shake.axis == this.AXIS.VERTICAL)) {
								var shakey = (Math.random() * this._shake.intensity);

								if (this.pos.y + this.height + shakey < this.limits.y)
									this.pos.y += ~~shakey;
								else
									this.pos.y -= ~~shakey;

							}
							// updated!
							updateTarget = true;
						}
					}

					// check for fade/flash effect
					if ((this._fadeIn.tween!=null) || (this._fadeOut.tween!=null)) {
						updateTarget = true;
					}

					// return same value that the one given
					// so that we only force it to true
					// if we used any effect (e.g. shake, fading, etc...)
					return updateTarget;
				},

				/**
				 * shake the camera 
				 * @param {int} intensity maximum offset that the screen can be moved while shaking
				 * @param {int} duration expressed in frame
				 * @param {axis} axis specify on which axis you want the shake effect (AXIS.HORIZONTAL, AXIS.VERTICAL, AXIS.BOTH)
				 * @param {function} [onComplete] callback once shaking effect is over
				 * @example
				 * // shake it baby !
				 * me.game.viewport.shake(10, 30, me.game.viewport.AXIS.BOTH);
				 */

				shake : function(intensity, duration, axis, onComplete) {
					// make sure we have a default value for axis
					axis = axis || this.AXIS.BOTH;

					// some limit test
					if (axis == this.AXIS.BOTH) {
						if (this.width == this.limits.x)
							axis = this.AXIS.VERTICAL;
						else if (this.height == this.limits.y)
							axis = this.AXIS.HORIZONTAL;
					}
					if ((axis == this.AXIS.HORIZONTAL)
							&& (this.width == this.limits.x))
						return;

					if ((axis == this.AXIS.VERTICAL)
							&& (this.height == this.limits.y))
						return;

					this._shake.intensity = intensity;
					this._shake.duration = duration;
					this._shake.axis = axis;
					this._shake.onComplete = onComplete || null;
				},

				/**
				 * fadeOut(flash) effect<p>
				 * screen is filled with the specified color and slowy goes back to normal
				 * @param {string} color in #rrggbb format
				 * @param {Int} [duration="1000"] in ms
				 * @param {function} [onComplete] callback once effect is over
				 */

				fadeOut : function(color, duration, onComplete) {
					this._fadeOut.color = color;
					this._fadeOut.duration = duration || 1000; // convert to ms
					this._fadeOut.alpha = 1.0;
					this._fadeOut.tween = new me.Tween(this._fadeOut).to({alpha: 0.0}, this._fadeOut.duration ).onComplete(onComplete||null);
					this._fadeOut.tween.start();
				},

				/**
				 * fadeIn effect <p>
				 * fade to the specified color
				 * @param {string} color in #rrggbb format
				 * @param {int} [duration="1000"] in ms
				 * @param {function} [onComplete] callback once effect is over
				 */

				fadeIn : function(color, duration, onComplete) {
					this._fadeIn.color = color;
					this._fadeIn.duration = duration || 1000; //convert to ms
					this._fadeIn.alpha = 0.0;
					this._fadeIn.tween = new me.Tween(this._fadeIn).to({alpha: 1.0}, this._fadeIn.duration ).onComplete(onComplete||null);
					this._fadeIn.tween.start();
				},

				/**
				 *	return the viewport width
				 * @return {int}
				 */
				getWidth : function() {
					return this.width;
				},

				/**
				 *	return the viewport height
				 * @return {int}
				 */
				getHeight : function() {
					return this.height;
				},

				/**
				 *	set the viewport around the specified entity<p>
				 * <b>BROKEN !!!!</b>
				 * @private
				 * @param {Object} 
				 */
				focusOn : function(target) {
					// BROKEN !! target x and y should be the center point
					this.pos.x = target.x - this.width * 0.5;
					this.pos.y = target.y - this.height * 0.5;
				},

				/**
				 *	check if the specified rectange is in the viewport
				 * @param {me.Rect} rect
				 * @return {boolean}
				 */
				isVisible : function(rect) {
					return rect.overlaps(this);
				},

				/**
				 *	render the camera effects
				 * @private
				 */
				draw : function(context) {
					
					// fading effect
					if (this._fadeIn.tween) {
						context.globalAlpha = this._fadeIn.alpha;
						me.video.clearSurface(context, me.utils.HexToRGB(this._fadeIn.color));
						// set back full opacity
						context.globalAlpha = 1.0;
						// remove the tween if over
						if (this._fadeIn.alpha==1.0)
							this._fadeIn.tween = null;
					}
					
					// flashing effect
					if (this._fadeOut.tween) {
						context.globalAlpha = this._fadeOut.alpha;
						me.video.clearSurface(context, me.utils.HexToRGB(this._fadeOut.color));
						// set back full opacity
						context.globalAlpha = 1.0;
						// remove the tween if over
						if (this._fadeOut.alpha==0.0)
							this._fadeOut.tween = null;
					}
				}

			});

	/*---------------------------------------------------------*/
	// END END END
	/*---------------------------------------------------------*/
})(window);
/*
 * MelonJS Game Engine
 * Copyright (C) 2012, Olivier BIOT
 * http://www.melonjs.org
 *
 */

(function($) {

	/**
	 * A Simple object to display a sprite on screen.
	 * @class
	 * @extends me.Rect
	 * @memberOf me
	 * @constructor
	 * @param {int} x the x coordinates of the sprite object
	 * @param {int} y the y coordinates of the sprite object
	 * @param {me.loader#getImage} image reference to the Sprite Image
	 * @param {int} [spritewidth] sprite width
	 * @param {int} [spriteheigth] sprite height
	 * @example
	 * // create a static Sprite Object
	 * mySprite = new me.SpriteObject (100, 100, me.loader.getImage("mySpriteImage"));
	 */
	me.SpriteObject = me.Rect.extend(
	/** @scope me.SpriteObject.prototype */
	{
		// default scale ratio of the object
		scale	   : null,

		// if true, image flipping/scaling is needed
		scaleFlag : false,

		// just to keep track of when we flip
		lastflipX : false,
		lastflipY : false,

		// z position (for ordering display)
		z : 0,

		// image offset
		offset : null,

		/**
		 * the visible state of the object<br>
		 * default value : true
		 * @public
		 * @type Boolean
		 * @name me.SpriteObject#visible
		 */
		visible : true,

		/**
		 * Whether the object is visible and within the viewport<br>
		 * default value : false
		 * @public
		 * @readonly
		 * @type Boolean
		 * @name me.SpriteObject#inViewport
		 */
		inViewport : false,

		/**
		 * Set the angle (in Radians) of a sprite to rotate it <br>
		 * WARNING: rotating sprites decreases performances
		 * @public
		 * @type Number
		 * @name me.SpriteObject#angle
		 */
		angle: 0,

		/**
		 * Define the sprite anchor point<br>
		 * This is used when using rotation, or sprite flipping<br>
		 * with the default anchor point being the center of the sprite
		 * @public
		 * @type me.Vector2d
		 * @name me.SpriteObject#anchorPoint
		 */
		anchorPoint: null,
		
		/**
		 * Define the sprite opacity<br>
		 * @see me.SpriteObject#setOpacity
		 * @see me.SpriteObject#getOpacity 
		 * @public
		 * @type me.Vector2d
		 * @name me.SpriteObject#alpha
		 */
		alpha: 1.0,
		
		/**
		 * Define if a renderable follows screen coordinates (floating)<br>
		 * or the world coordinates (not floating)<br>
		 * default value : false
		 * @public
		 * @type Boolean
		 * @name me.SpriteObject#floating
		 */
		floating: false,

		// image reference
		image : null,

		// to manage the flickering effect
		flickering : false,
		flickerTimer : -1,
		flickercb : null,
		flickerState : false,


		/**
		 * @ignore
		 */
		init : function(x, y, image, spritewidth, spriteheight) {

			// Used by the game engine to adjust visibility as the
			// sprite moves in and out of the viewport
			this.isSprite = true;

			// call the parent constructor
			this.parent(new me.Vector2d(x, y),
						spritewidth  || image.width,
						spriteheight || image.height);
						
			// cache image reference
			this.image = image;

			// scale factor of the object
			this.scale = new me.Vector2d(1.0, 1.0);
			this.lastflipX = this.lastflipY = false,
			this.scaleFlag = false;

			// set the default sprite index & offset
			this.offset = new me.Vector2d(0, 0);

			// set the default anchor point (middle of the sprite)
			this.anchorPoint = new me.Vector2d(0.5, 0.5);

			// ensure it's fully opaque by default
			this.alpha = 1.0;			
			
			// make it visible by default
			this.visible = true;
			
			// and not flickering
			this.flickering = false
		},

		/**
		 *	specify a transparent color
		 *	@param {String} color color key in rgb format (rrggbb or #rrggbb)
		 */
		setTransparency : function(col) {
			// remove the # if present
			col = (col.charAt(0) == "#") ? col.substring(1, 7) : col;
			// applyRGB Filter (return a context object)
			this.image = me.video.applyRGBFilter(this.image, "transparent", col.toUpperCase()).canvas;
		},

		/**
		 * return the flickering state of the object
		 * @return Boolean
		 */
		isFlickering : function() {
			return this.flickering;
		},


		/**
		 * make the object flicker
		 * @param {Int} duration
		 * @param {Function} callback
		 * @example
		 * // make the object flicker for 60 frame
		 * // and then remove it
		 * this.flicker(60, function()
		 * {
		 *    me.game.remove(this);
		 * });
		 */
		flicker : function(duration, callback) {
			this.flickerTimer = duration;
			if (this.flickerTimer < 0) {
				this.flickering = false;
				this.flickercb = null;
			} else if (!this.flickering) {
				this.flickercb = callback;
				this.flickering = true;
			}
		},


		/**
		 *	Flip object on horizontal axis
		 *	@param {Boolean} flip enable/disable flip
		 */
		flipX : function(flip) {
			if (flip != this.lastflipX) {
				this.lastflipX = flip;

				// invert the scale.x value
				this.scale.x = -this.scale.x;

				// set the scaleFlag
				this.scaleFlag = ((this.scale.x != 1.0) || (this.scale.y != 1.0))
			}
		},

		/**
		 *	Flip object on vertical axis
		 *	@param {Boolean} flip enable/disable flip
		 */
		flipY : function(flip) {
			if (flip != this.lastflipY) {
				this.lastflipY = flip;

				// invert the scale.x value
				this.scale.y = -this.scale.y;

				// set the scaleFlag
				this.scaleFlag = ((this.scale.x != 1.0) || (this.scale.y != 1.0))
			}
		},

		/**
		 *	Resize the sprite around his center<br>
		 *	@param {Boolean} ratio scaling ratio
		 */
		resize : function(ratio) {
			if (ratio > 0) {
				this.scale.x = this.scale.x < 0.0 ? -ratio : ratio;
				this.scale.y = this.scale.y < 0.0 ? -ratio : ratio;
				// set the scaleFlag
				this.scaleFlag = ((this.scale.x!= 1.0)  || (this.scale.y!= 1.0))
			}
		},

		/**
		 *	get the sprite alpha channel value<br>
		 *  @return current opacity value between 0 and 1
		 */
		getOpacity : function() {
			return this.alpha;
		},
		
		/**
		 *	set the sprite alpha channel value<br>
		 *	@param {alpha} alpha opacity value between 0 and 1
		 */
		setOpacity : function(alpha) {
			if (alpha) {
				this.alpha = alpha.clamp(0.0,1.0);
			}
		},

		/**
		 * sprite update<br>
		 * not to be called by the end user<br>
		 * called by the game manager on each game loop
		 * @protected
		 * @return false
		 **/
		update : function() {
			//update the "flickering" state if necessary
			if (this.flickering) {
				this.flickerTimer -= me.timer.tick;
				if (this.flickerTimer < 0) {
					if (this.flickercb)
						this.flickercb();
					this.flicker(-1);
				}
				return true;
			}
			return false;
		},

		/**
		 * object draw<br>
		 * not to be called by the end user<br>
		 * called by the game manager on each game loop
		 * @protected
		 * @param {Context2d} context 2d Context on which draw our object
		 **/
		draw : function(context) {

			// do nothing if we are flickering
			if (this.flickering) {
				this.flickerState = !this.flickerState;
				if (!this.flickerState) return;
			}

			// save the current the context
			context.save();
			
			// sprite alpha value
			context.globalAlpha = this.alpha;

			// clamp position vector to pixel grid
			var xpos = ~~this.pos.x, ypos = ~~this.pos.y;
			
			if ((this.scaleFlag) || (this.angle!==0)) {
				// calculate pixel pos of the anchor point
				var ax = this.width * this.anchorPoint.x, ay = this.height * this.anchorPoint.y;
				// translate to the defined anchor point
				context.translate(xpos + ax, ypos + ay);
				// scale
				if (this.scaleFlag)
					context.scale(this.scale.x, this.scale.y);
				if (this.angle!==0)
					context.rotate(this.angle);
				// reset coordinates back to upper left coordinates
				xpos = -ax;
				ypos = -ay;
			}

			context.drawImage(this.image,
							this.offset.x, this.offset.y,
							this.width, this.height,
							xpos, ypos,
							this.width, this.height);

			
			// restore the context
			context.restore();
				
			if (me.debug.renderHitBox) {
				// draw the sprite rectangle
				this.parent(context, "blue");
			}
		},

		/**
		 * Destroy function<br>
		 * @private
		 */
		destroy : function() {
			this.onDestroyEvent.apply(this, arguments);
		},

		/**
		 * OnDestroy Notification function<br>
		 * Called by engine before deleting the object
		 */
		onDestroyEvent : function() {
			;// to be extended !
		}

	});
	

	/**
	 * an object to manage animation
	 * @class
	 * @extends me.SpriteObject
	 * @memberOf me
	 * @constructor
	 * @param {int} x the x coordinates of the sprite object
	 * @param {int} y the y coordinates of the sprite object
	 * @param {me.loader#getImage} Image reference of the animation sheet
	 * @param {int} spritewidth width of a single sprite within the spritesheet
	 * @param {int} [spriteheight] height of a single sprite within the spritesheet (value will be set to the image height if not specified)
	 */
	me.AnimationSheet = me.SpriteObject.extend(
	/** @scope me.AnimationSheet.prototype */
	{
		// count the fps and manage animation change
		fpscount : 0,
		
		// Spacing and margin
		spacing: 0,
		margin: 0,

		/**
		 * pause and resume animation<br>
		 * default value : false;
		 * @public
		 * @type Boolean
		 * @name me.AnimationSheet#animationpause
		 */
		animationpause : false,

		/**
		 * animation cycling speed<br>
		 * default value : me.sys.fps / 10;
		 * @public
		 * @type Number
		 * @name me.AnimationSheet#animationspeed
		 */
		animationspeed : 0,

		/** @private */
		init : function(x, y, image, spritewidth, spriteheight, spacing, margin) {
			// hold all defined animation
			this.anim = [];

			// a flag to reset animation
			this.resetAnim = null;

			// default animation sequence
			this.current = null;

			// Spacing and margin
			this.spacing = spacing || 0;
			this.margin = margin || 0;

			// call the constructor
			this.parent(x, y, image, spritewidth, spriteheight, spacing, margin);
			
			// sprite count (line, col)
			this.spritecount = new me.Vector2d(~~((this.image.width - this.margin) / (this.width + this.spacing)),
											   ~~((this.image.height - this.margin) / (this.height + this.spacing)));


			// if one single image, disable animation
			if ((this.spritecount.x * this.spritecount.y) == 1) {
				// override setAnimationFrame with an empty function
				/** @private */
				this.setAnimationFrame = function() {;};
			}

			// default animation speed
			this.animationspeed = me.sys.fps / 10;

			// create a default animation sequence with all sprites
			this.addAnimation("default", null);
			// set as default
			this.setCurrentAnimation("default");
		},

		/**
		 * add an animation <br>
		 * the index list must follow the logic as per the following example :<br>
		 * <img src="spritesheet_grid.png"/>
		 * @param {String} name animation id
		 * @param {Int[]} index list of sprite index defining the animaton
		 * @param {Int} [speed=@see me.AnimationSheet.animationspeed], cycling speed for animation in fps (lower is faster).
		 * @example
		 * // walking animatin
		 * this.addAnimation ("walk", [0,1,2,3,4,5]);
		 * // eating animatin
		 * this.addAnimation ("eat", [6,6]);
		 * // rolling animatin
		 * this.addAnimation ("roll", [7,8,9,10]);
		 * // slower animation
		 * this.addAnimation ("roll", [7,8,9,10], 10);
		 */
		addAnimation : function(name, frame, animationspeed) {
			this.anim[name] = {
				name : name,
				frame : [],
				idx : 0,
				length : 0,
				animationspeed: animationspeed || this.animationspeed
			};

			if (frame == null) {
				frame = [];
				// create a default animation with all sprites in the spritesheet
				for ( var i = 0, count = this.spritecount.x * this.spritecount.y; i < count ; i++) {
					frame[i] = i;
				}
			}

			// compute and add the offset of each frame
			for ( var i = 0 , len = frame.length ; i < len; i++) {
				this.anim[name].frame[i] = new me.Vector2d(this.margin + (this.spacing + this.width) * (frame[i] % this.spritecount.x),
														   this.margin + (this.spacing + this.height) * ~~(frame[i] / this.spritecount.x));
			}
			this.anim[name].length = this.anim[name].frame.length;
		},

		/**
		 * set the current animation
		 * @param {String} name animation id
		 * @param {Object} [onComplete] animation id to switch to when complete, or callback
		 * @example
		 * // set "walk" animation
		 * this.setCurrentAnimation("walk");
		 * // set "eat" animation, and switch to "walk" when complete
		 * this.setCurrentAnimation("eat", "walk");
		 * // set "die" animation, and remove the object when finished
		 * this.setCurrentAnimation("die", function(){me.game.remove(this)});
		 **/

		setCurrentAnimation : function(name, resetAnim) {
			if (this.anim[name]) {
				this.current = this.anim[name];
				this.resetAnim = resetAnim || null;
				this.setAnimationFrame(this.current.idx); // or 0 ?
			} else {
				throw "melonJS: animation id '" + name + "' not defined";
			}
		},

		/**
		 * return true if the specified animation is the current one.
		 * @param {String} name animation id
		 * @example
		 * if (!this.isCurrentAnimation("walk"))
		 * {
		 *    // do something horny...
		 * }
		 */
		isCurrentAnimation : function(name) {
			return (this.current.name == name);
		},

		/**
		 * force the current animation frame index.
		 * @param {int} [index=0]
		 * @example
		 * //reset the current animation to the first frame
		 * this.setAnimationFrame();
		 */
		setAnimationFrame : function(idx) {
			this.current.idx = (idx || 0) % this.current.length;
			this.offset = this.current.frame[this.current.idx];
		},
		
		/**
		 * return the current animation frame index.
		 * @param {int} index
		 */
		getCurrentAnimationFrame : function() {
			return this.current.idx;
		},

		/**
		 * update the animation<br>
		 * this is automatically called by the game manager {@link me.game}
		 * @protected
		 */
		update : function() {
			// call the parent function
			this.parent();
			// update animation if necessary
			if (this.visible && !this.animationpause && (this.fpscount++ > this.current.animationspeed)) {
				this.setAnimationFrame(++this.current.idx);
				this.fpscount = 0;

				// switch animation if we reach the end of the strip
				// and a callback is defined
				if ((this.current.idx == 0) && this.resetAnim)  {
					// if string, change to the corresponding animation
					if (typeof(this.resetAnim) == "string")
						this.setCurrentAnimation(this.resetAnim);
					// if function (callback) call it
					else if (typeof(this.resetAnim) == "function")
						this.resetAnim();
				}
				return true;
			}
			return false;
		}
	});


	/*---------------------------------------------------------*/
	// END END END
	/*---------------------------------------------------------*/
})(window);
/*
 * MelonJS Game Engine
 * Copyright (C) 2012, Olivier BIOT
 * http://www.melonjs.org
 *
 */

(function($) {

	/**
	 * me.ObjectSettings contains the object attributes defined in Tiled<br>
	 * and is created by the engine and passed as parameter to the corresponding object when loading a level<br>
	 * the field marked Mandatory are to be defined either in Tiled, or in the before calling the parent constructor
	 * <img src="object_properties.png"/><br>
	 * @final
	 * @memberOf me
	 * @constructor Should not be called by the user.
	 */
	me.ObjectSettings = {
		/**
		 * object entity name<br>
		 * as defined in the Tiled Object Properties
		 * @public
		 * @type {String}
		 * @name me.ObjectSettings#name
		 */
		name : null,

		/**
		 * image ressource name to be loaded<br>
		 * MANDATORY<br>
		 * (in case of TiledObject, this field is automatically set)
		 * @public
		 * @type {String}
		 * @name me.ObjectSettings#image
		 */
		image : null,

		/**
		 * specify a transparent color for the image in rgb format (#rrggbb)<br>
		 * OPTIONAL<br>
		 * (using this option will imply processing time on the image)
		 * @public
		 * @type {String}
		 * @name me.ObjectSettings#transparent_color
		 */
		transparent_color : null,

		/**
		 * width of a single sprite in the spritesheet<br>
		 * MANDATORY<br>
		 * (in case of TiledObject, this field is automatically set)
		 * @public
		 * @type {Int}
		 * @name me.ObjectSettings#spritewidth
		 */
		spritewidth : null,

		/**
		 * height of a single sprite in the spritesheet<br>
		 * OPTIONAL<br>
		 * if not specified the value will be set to the corresponding image height<br>
		 * (in case of TiledObject, this field is automatically set)
		 * @public
		 * @type {Int}
		 * @name me.ObjectSettings#spriteheight
		 */
		spriteheight : null,


		/**
		 * custom type for collision detection<br>
		 * OPTIONAL
		 * @public
		 * @type {String}
		 * @name me.ObjectSettings#type
		 */
		type : 0,

		/**
		 * Enable collision detection for this object<br>
		 * OPTIONAL
		 * @public
		 * @type {Boolean}
		 * @name me.ObjectSettings#collidable
		 */
		collidable : false
	};


	/**
	 * A pool of Object entity <br>
	 * This object is used for object pooling - a technique that might speed up your game
	 * if used properly. <br>
	 * If some of your classes will be instanciated and removed a lot at a time, it is a 
	 * good idea to add the class to this entity pool. A separate pool for that class
	 * will be created, which will reuse objects of the class. That way they won't be instanciated
	 * each time you need a new one (slowing your game), but stored into that pool and taking one
	 * already instanciated when you need it.<br><br>
	 * This object is also used by the engine to instanciate objects defined in the map, 
	 * which means, that on level loading the engine will try to instanciate every object 
	 * found in the map, based on the user defined name in each Object Properties<br>
	 * <img src="object_properties.png"/><br>
	 * There is no constructor function for me.entityPool, this is a static object
	 * @final
	 * @memberOf me
	 * @constructor Should not be called by the user.
	 */
	me.entityPool = (function() {
		// hold public stuff in our singletong
		var obj = {};

		/*---------------------------------------------

			PRIVATE STUFF

		---------------------------------------------*/
		var entityClass = {};

		/*---------------------------------------------

			PUBLIC STUFF

		---------------------------------------------*/

		/*---

			init

			---*/

		obj.init = function() {
			// add default entity object
			obj.add("me.LevelEntity", me.LevelEntity);
			obj.add("me.ObjectEntity", me.ObjectEntity);
			obj.add("me.CollectableEntity", me.CollectableEntity);
			obj.add("me.InvisibleEntity", me.InvisibleEntity);
		};

		/**
		 * Add an object to the pool. <br>
		 * Pooling must be set to true if more than one such objects will be created. <br>
		 * (note) If pooling is enabled, you shouldn't instanciate objects with `new`.
		 * See examples in {@link me.entityPool#newInstanceOf}
		 * @name me.entityPool#add
		 * @public
		 * @function
		 * @param {String} className as defined in the Name fied of the Object Properties (in Tiled)
		 * @param {Object} class corresponding Class to be instanciated
		 * @param {Boolean} [objectPooling=false] enables object pooling for the specified class
		 * - speeds up the game by reusing existing objects
		 * @example
		 * // add our users defined entities in the entity pool
		 * me.entityPool.add("playerspawnpoint", PlayerEntity);
		 * me.entityPool.add("cherryentity", CherryEntity, true);
		 * me.entityPool.add("heartentity", HeartEntity, true);
		 * me.entityPool.add("starentity", StarEntity, true);
		 */
		obj.add = function(className, entityObj, pooling) {
			if (!pooling) {
				entityClass[className.toLowerCase()] = entityObj;
				return;
			}

			entityClass[className.toLowerCase()] = {
				"class" : entityObj,
				"pool" : [],
				"active" : []
			};
		};

		/**
		 *	Return a new instance of the requested object (if added into the object pool)
		 * @name me.entityPool#newInstanceOf
		 * @public
		 * @function
		 * @param {String} className as used in me.entityPool#add
		 * @params {arguments} [arguments] to be passed when instanciating/reinitializing the object
		 * @example
		 * me.entityPool.add("player", PlayerEntity);
		 * var player = me.entityPool.newInstanceOf("player");
		 * @example
		 * me.entityPool.add("bullet", BulletEntity, true);
		 * me.entityPool.add("enemy", EnemyEntity, true);
		 * // ...
		 * // when we need to manually create a new bullet:
		 * var bullet = me.entityPool.newInstanceOf("bullet", x, y, direction);
		 * // ...
		 * // params aren't a fixed number
		 * // when we need new enemy we can add more params, that the object construct requires:
		 * var enemy = me.entityPool.newInstanceOf("enemy", x, y, direction, speed, power, life);
		 * // ...
		 * // when we want to destroy existing object, the remove 
		 * // function will ensure the object can then be reallocated later
		 * me.game.remove(enemy);
		 * me.game.remove(bullet);
		 */

		obj.newInstanceOf = function(data) {
			var name = typeof data === 'string' ? data.toLowerCase() : undefined;
			if (name && entityClass[name]) {
				if (!entityClass[name]['pool']) {
					var proto = entityClass[name];
					arguments[0] = proto;
					return new (proto.bind.apply(proto, arguments))();
				}
				
				var obj, entity = entityClass[name], proto = entity["class"];
				if (entity["pool"].length > 0) {
					obj = entity["pool"].pop();
					obj.init.apply(obj, Array.prototype.slice.call(arguments, 1));
				} else {
					arguments[0] = proto;
					obj = new (proto.bind.apply(proto, arguments))();
					obj.className = name;
				}

				entity["active"].push(obj);
				return obj;
			}

			// Tile objects can be created with a GID attribute;
			// The TMX parser will use it to create the image dataerty.
			var settings = arguments[3];
			if (settings && settings.image) {
				return new me.SpriteObject(settings.x, settings.y, settings.image);
			}

			if (name) {
				console.error("Cannot instantiate entity of type '" + name + "': Class not found!");
			}
			return null;
		};

		/**
		 * purge the entity pool from any unactive object <br>
		 * Object pooling must be enabled for this function to work<br>
		 * note: this will trigger the garbage collector
		 * @name me.entityPool#purge
		 * @public
		 * @function
		 */
		obj.purge = function() {
			for (className in entityClass) {
				entityClass[className]["pool"] = [];
			}
		};

		/**
		 * Remove object from the entity pool <br>
		 * Object pooling for the object class must be enabled,
		 * and object must have been instanciated using {@link me.entityPool#newInstanceOf},
		 * otherwise this function won't work
		 * @name me.entityPool#freeInstance
		 * @public
		 * @function
		 * @param {Object} instance to be removed 
		 */
		obj.freeInstance = function(obj) {

			var name = obj.className;
			if (!name || !entityClass[name]) {
				//console.error("Cannot free object: unknown class");
				return;
			}

			var notFound = true;
			for (var i = 0, len = entityClass[name]["active"].length; i < len; i++) {
				if (entityClass[name]["active"][i] === obj) {
					notFound = false;
					entityClass[name]["active"].splice(i, 1);
					break;
				}
			}

			if (notFound) {
				//console.error("Cannot free object: not found in the active pool");
				return;
			}

			entityClass[name]["pool"].push(obj);
		};

		// return our object
		return obj;

	})();


	/************************************************************************************/
	/*                                                                                  */
	/*      a generic object entity                                                     */
	/*                                                                                  */
	/************************************************************************************/
	/**
	 * a Generic Object Entity<br>
	 * Object Properties (settings) are to be defined in Tiled, <br>
	 * or when calling the parent constructor
	 *
	 * @class
	 * @extends me.AnimationSheet
	 * @memberOf me
	 * @constructor
	 * @param {int} x the x coordinates of the sprite object
	 * @param {int} y the y coordinates of the sprite object
	 * @param {me.ObjectSettings} settings Object Properties as defined in Tiled <br> <img src="object_properties.png"/>
	 */
	me.ObjectEntity = me.AnimationSheet
			.extend(
			/** @scope me.ObjectEntity.prototype */
			{
			   /**
				* Entity "Game Unique Identifier"<br>
				* @public
				* @type String
				* @name me.ObjectEntity#GUID
				*/
				GUID : null,

				/**
				 * define the type of the object<br>
				 * default value : none<br>
				 * @public
				 * @type {Object}
				 * @name me.ObjectEntity#type
				 */
				type : 0,

				/**
				 * flag to enable collision detection for this object<br>
				 * default value : false<br>
				 * @public
				 * @type {Boolean}
				 * @name me.ObjectEntity#collidable
				 */
				collidable : false,
				
				
				/**
				 * Entity collision Box<br>
				 * @public
				 * @type {me.Rect}
				 * @name me.ObjectEntity#collisionBox
				 */
				collisionBox : null,

				/** @private */
				init : function(x, y, settings) {
					this.parent(x, y,
								(typeof settings.image == "string") ? me.loader.getImage(settings.image) : settings.image,
								settings.spritewidth,
								settings.spriteheight,
								settings.spacing,
								settings.margin);

					// check for user defined transparent color
					if (settings.transparent_color) {
						this.setTransparency(settings.transparent_color);
					}

					// set the object GUID value
					this.GUID = me.utils.createGUID();

					// set the object entity name
					this.name = settings.name?settings.name.toLowerCase():"";

					/**
					 * entity current velocity<br>
					 * @public
					 * @type me.Vector2d
					 * @name me.ObjectEntity#vel
					 */
					this.vel = new me.Vector2d();

					/**
					 * entity current acceleration<br>
					 * @public
					 * @type me.Vector2d
					 * @name me.ObjectEntity#accel
					 */
					this.accel = new me.Vector2d();

					/**
					 * entity current friction<br>
					 * @public
					 * @type me.Vector2d
					 * @name me.ObjectEntity#friction
					 */
					this.friction = new me.Vector2d();

					/**
					 * max velocity (to limit entity velocity)<br>
					 * @public
					 * @type me.Vector2d
					 * @name me.ObjectEntity#maxVel
					 */
					this.maxVel = new me.Vector2d(1000,1000);

					// some default contants
					/**
					 * Default gravity value of the entity<br>
					 * default value : 0.98 (earth gravity)<br>
					 * to be set to 0 for RPG, shooter, etc...<br>
					 * Note: Gravity can also globally be defined through me.sys.gravity
					 * @public
					 * @see me.sys.gravity
					 * @type Number
					 * @name me.ObjectEntity#gravity
					 */
					this.gravity = (me.sys.gravity!=undefined)?me.sys.gravity:0.98;

					// just to identify our object
					this.isEntity = true;
					
					// dead state :)
					/**
					 * dead/living state of the entity<br>
					 * default value : true
					 * @public
					 * @type Boolean
					 * @name me.ObjectEntity#alive
					 */
					this.alive = true;

					// some usefull variable

					/**
					 * falling state of the object<br>
					 * true if the object is falling<br>
					 * false if the object is standing on something<br>
					 * (!) READ ONLY property
					 * @public
					 * @type Boolean
					 * @name me.ObjectEntity#falling
					 */
					this.falling = false;
					/**
					 * jumping state of the object<br>
					 * equal true if the entity is jumping<br>
					 * (!) READ ONLY property
					 * @public
					 * @type Boolean
					 * @name me.ObjectEntity#jumping
					 */
					this.jumping = true;

					// some usefull slope variable
					this.slopeY = 0;
					/**
					 * equal true if the entity is standing on a slope<br>
					 * (!) READ ONLY property
					 * @public
					 * @type Boolean
					 * @name me.ObjectEntity#onslope
					 */
					this.onslope = false;
					/**
					 * equal true if the entity is on a ladder<br>
					 * (!) READ ONLY property
					 * @public
					 * @type Boolean
					 * @name me.ObjectEntity#onladder
					 */
					this.onladder = false;

					// to enable collision detection
					this.collidable = settings.collidable || false;
					//this.collectable = false;

					this.type = settings.type || 0;
					

					// ref to the collision map
					this.collisionMap = me.game.collisionMap;
					
					// create a a default collision rectangle
					this.collisionBox = new me.Rect(this.pos, this.width, this.height);
					
					// to know if our object can break tiles
					/**
					 * Define if an entity can go through breakable tiles<br>
					 * default value : false<br>
					 * @public
					 * @type Boolean
					 * @name me.ObjectEntity#canBreakTile
					 */
					this.canBreakTile = false;

					/**
					 * a callback when an entity break a tile<br>
					 * @public
					 * @type Function
					 * @name me.ObjectEntity#onTileBreak
					 */
					this.onTileBreak = null;
				},

				/**
				 * specify the size of the hit box for collision detection<br>
				 * (allow to have a specific size for each object)<br>
				 * e.g. : object with resized collision box :<br>
				 * <img src="me.Rect.colpos.png"/>
				 * @param {int} x x offset (specify -1 to not change the width)
				 * @param {int} w width of the hit box
				 * @param {int} y y offset (specify -1 to not change the height)
				 * @param {int} h height of the hit box
				 */
				updateColRect : function(x, w, y, h) {
					this.collisionBox.adjustSize(x, w, y, h);
				},

				/**
				 * onCollision Event function<br>
				 * called by the game manager when the object collide with shtg<br>
				 * by default, if the object type is Collectable, the destroy function is called
				 * @param {me.Vector2d} res collision vector
				 * @param {me.ObjectEntity} obj the other object that hit this object
				 * @protected
				 */
				onCollision : function(res, obj) {
					// destroy the object if collectable
					if (this.collidable
							&& (this.type == me.game.COLLECTABLE_OBJECT))
						me.game.remove(this);
				},

				/**
				 * set the entity default velocity<br>
				 * note : velocity is by default limited to the same value, see setMaxVelocity if needed<br>
				 * @param {Int} x velocity on x axis
				 * @param {Int} y velocity on y axis
				 * @protected
				 */

				setVelocity : function(x, y) {
					this.accel.x = (x != 0) ? x : this.accel.x;
					this.accel.y = (y != 0) ? y : this.accel.y;

					// limit by default to the same max value
					this.setMaxVelocity(x,y);
				},

				/**
				 * cap the entity velocity to the specified value<br>
				 * @param {Int} x max velocity on x axis
				 * @param {Int} y max velocity on y axis
				 * @protected
				 */
				setMaxVelocity : function(x, y) {
					this.maxVel.x = x;
					this.maxVel.y = y;
				},

				/**
				 * set the entity default friction<br>
				 * @param {Int} x horizontal friction
				 * @param {Int} y vertical friction
				 * @protected
				 */
				setFriction : function(x, y) {
					this.friction.x = x || 0;
					this.friction.y = y || 0;
				},
				
				/**
				 *	Flip object on horizontal axis
				 *	@param {Boolean} flip enable/disable flip
				 */
				flipX : function(flip) {
					if (flip != this.lastflipX) {
						// call the parent function
						this.parent(flip);

						// flip the collision box
						this.collisionBox.flipX(this.width);
					}
				},

				/**
				 *	Flip object on vertical axis
				 *	@param {Boolean} flip enable/disable flip
				 */
				flipY : function(flip) {
					if (flip != this.lastflipY) {
						// call the parent function
						this.parent(flip);

						// flip the collision box
						this.collisionBox.flipY(this.height);
					}
				},


				/**
				 * helper function for platform games: <br>
				 * make the entity move left of right<br>
				 * @param {Boolean} left will automatically flip horizontally the entity sprite
				 * @protected
				 * @example
				 * if (me.input.isKeyPressed('left'))
				 * {
				 *     this.doWalk(true);
				 * }
				 * else if (me.input.isKeyPressed('right'))
				 * {
				 *     this.doWalk(false);
				 * }
				 */
				doWalk : function(left) {
					this.flipX(left);
					this.vel.x += (left) ? -this.accel.x * me.timer.tick : this.accel.x * me.timer.tick;
				},

				/**
				 * helper function for platform games: <br>
				 * make the entity move up and down<br>
				 * only valid is the player is on a ladder
				 * @param {Boolean} up will automatically flip vertically the entity sprite
				 * @protected
				 * @example
				 * if (me.input.isKeyPressed('up'))
				 * {
				 *     this.doClimb(true);
				 * }
				 * else if (me.input.isKeyPressed('down'))
				 * {
				 *     this.doClimb(false);
				 * }
				 */
				doClimb : function(up) {
					// add the player x acceleration to the y velocity
					if (this.onladder) {
						this.vel.y = (up) ? -this.accel.x * me.timer.tick
								: this.accel.x * me.timer.tick;
						return true;
					}
					return false;
				},


				/**
				 * helper function for platform games: <br>
				 * make the entity jump<br>
				 * @protected
				 */
				doJump : function() {
					// only jump if standing
					if (!this.jumping && !this.falling) {
						this.vel.y = -this.maxVel.y * me.timer.tick;
						this.jumping = true;
						return true;
					}
					return false;
				},

				/**
				 * helper function for platform games: <br>
				 * force to the entity to jump (for double jump)<br>
				 * @protected
				 */
				forceJump : function() {
					this.jumping = this.falling = false;
					this.doJump();
				},


				/**
				 * return the distance to the specified entity
				 * @param {me.ObjectEntity} entity Entity
				 * @return {float} distance
				 */
				distanceTo: function(e)
				{
					// the me.Vector2d object also implements the same function, but
					// we have to use here the center of both entities
					var dx = (this.pos.x + this.hWidth)  - (e.pos.x + e.hWidth);
					var dy = (this.pos.y + this.hHeight) - (e.pos.y + e.hHeight);
					return Math.sqrt(dx*dx+dy*dy);
				},
				
				/**
				 * return the distance to the specified point
				 * @param {me.Vector2d} vector vector
				 * @return {float} distance
				 */
				distanceToPoint: function(v)
				{
					// the me.Vector2d object also implements the same function, but
					// we have to use here the center of both entities
					var dx = (this.pos.x + this.hWidth)  - (v.x);
					var dy = (this.pos.y + this.hHeight) - (v.y);
					return Math.sqrt(dx*dx+dy*dy);
				},
				
				/**
				 * return the angle to the specified entity
				 * @param {me.ObjectEntity} entity Entity
				 * @return {Number} angle in radians
				 */
				angleTo: function(e)
				{
					// the me.Vector2d object also implements the same function, but
					// we have to use here the center of both entities
					var ax = (e.pos.x + e.hWidth) - (this.pos.x + this.hWidth);
					var ay = (e.pos.y + e.hHeight) - (this.pos.y + this.hHeight);
					return Math.atan2(ay, ax);
				},
				
				
				/**
				 * return the angle to the specified point
				 * @param {me.Vector2d} vector vector
				 * @return {Number} angle in radians
				 */
				angleToPoint: function(v)
				{
					// the me.Vector2d object also implements the same function, but
					// we have to use here the center of both entities
					var ax = (v.x) - (this.pos.x + this.hWidth);
					var ay = (v.y) - (this.pos.y + this.hHeight);
					return Math.atan2(ay, ax);
				},


				/**
				 * handle the player movement on a slope
				 * and update vel value
				 * @private
				 */
				checkSlope : function(tile, left) {

					// first make the object stick to the tile
					this.pos.y = tile.pos.y - this.height;

					// normally the check should be on the object center point,
					// but since the collision check is done on corner, we must do the same thing here
					if (left)
						this.slopeY = tile.height - (this.collisionBox.right + this.vel.x - tile.pos.x);
					else
						this.slopeY = (this.collisionBox.left + this.vel.x - tile.pos.x);

					// cancel y vel
					this.vel.y = 0;
					// set player position (+ workaround when entering/exiting slopes tile)
					this.pos.y += this.slopeY.clamp(0, tile.height);

				},

				/**
				 * compute the new velocity value
				 * @private
				 */
				computeVelocity : function(vel) {

					// apply gravity (if any)
					if (this.gravity) {
						// apply a constant gravity (if not on a ladder)
						vel.y += !this.onladder?(this.gravity * me.timer.tick):0;

						// check if falling / jumping
						this.falling = (vel.y > 0);
						this.jumping = this.falling?false:this.jumping;
					}

					// apply friction
					if (this.friction.x)
						vel.x = me.utils.applyFriction(vel.x,this.friction.x);
					if (this.friction.y)
						vel.y = me.utils.applyFriction(vel.y,this.friction.y);

					// cap velocity
					if (vel.y !=0)
						vel.y = vel.y.clamp(-this.maxVel.y,this.maxVel.y);
					if (vel.x !=0)
						vel.x = vel.x.clamp(-this.maxVel.x,this.maxVel.x);
				},



				/**
				 * handle the player movement, "trying" to update his position<br>
				 * @return {me.Vector2d} a collision vector
				 * @example
				 * // make the player move
				 * if (me.input.isKeyPressed('left'))
				 * {
				 *     this.vel.x -= this.accel.x * me.timer.tick;
				 * }
				 * else if (me.input.isKeyPressed('right'))
				 * {
				 *     this.vel.x += this.accel.x * me.timer.tick;
				 * }
				 * // update player position
				 * var res = this.updateMovement();
				 *
				 * // check for collision result with the environment
				 * if (res.x != 0)
				 * {
				 *   // x axis
				 *   if (res.x<0)
				 *      console.log("x axis : left side !");
				 *   else
				 *      console.log("x axis : right side !");
				 * }
				 * else if(res.y != 0)
				 * {
				 *    // y axis
				 *    if (res.y<0)
				 *       console.log("y axis : top side !");
				 *    else
				 *       console.log("y axis : bottom side !");
				 *
				 *	  // display the tile type
				 *    console.log(res.yprop.type)
				 * }
				 *
				 * // check player status after collision check
				 * var updated = (this.vel.x!=0 || this.vel.y!=0);
				 */
				updateMovement : function() {

					this.computeVelocity(this.vel);

					// check for collision
					var collision = this.collisionMap.checkCollision(this.collisionBox, this.vel);

					// update some flags
					this.onslope  = collision.yprop.isSlope || collision.xprop.isSlope;
					// clear the ladder flag
					this.onladder = false;



					// y collision
					if (collision.y) {

						// going down, collision with the floor
						this.onladder = collision.yprop.isLadder;

						if (collision.y > 0) {
							if (collision.yprop.isSolid	|| (collision.yprop.isPlatform && (this.collisionBox.bottom - 1 <= collision.ytile.pos.y))) {
								// adjust position to the corresponding tile
								this.pos.y = ~~this.pos.y;
								this.vel.y = (this.falling) ?collision.ytile.pos.y - this.collisionBox.bottom: 0 ;
								this.falling = false;
							}
							else if (collision.yprop.isSlope && !this.jumping) {
								// we stop falling
								this.checkSlope(collision.ytile, collision.yprop.isLeftSlope);
								this.falling = false;
							}
							else if (collision.yprop.isBreakable) {
								if  (this.canBreakTile) {
									// remove the tile
									me.game.currentLevel.clearTile(collision.ytile.col, collision.ytile.row);
									if (this.onTileBreak)
										this.onTileBreak();
								}
								else {
									// adjust position to the corresponding tile
									this.pos.y = ~~this.pos.y;
									this.vel.y = (this.falling) ?collision.ytile.pos.y - this.collisionBox.bottom: 0;
									this.falling = false;
								}
							}
						}
						// going up, collision with ceiling
						else if (collision.y < 0) {
							if (!collision.yprop.isPlatform	&& !collision.yprop.isLadder) {
								this.falling = true;
								// cancel the y velocity
								this.vel.y = 0;
							}
						}
					}

					// x collision
					if (collision.x) {

						this.onladder = collision.xprop.isLadder ;

						if (collision.xprop.isSlope && !this.jumping) {
							this.checkSlope(collision.xtile, collision.xprop.isLeftSlope);
							this.falling = false;
						} else {
							// can walk through the platform & ladder
							if (!collision.xprop.isPlatform && !collision.xprop.isLadder) {
								if (collision.xprop.isBreakable	&& this.canBreakTile) {
									// remove the tile
									me.game.currentLevel.clearTile(collision.xtile.col, collision.xtile.row);
									if (this.onTileBreak) {
										this.onTileBreak();
									}
								} else {
									this.vel.x = 0;
								}
							}
						}
					}


					// update player position
					this.pos.add(this.vel);

					// returns the collision "vector"
					return collision;

				},
				
				/**
				 * Checks if this entity collides with others entities.
				 * @public
				 * @function
				 * @param {Boolean} [multiple=false] check for multiple collision
				 * @return {me.Vector2d} collision vector or an array of collision vector (if multiple collision){@link me.Rect#collideVsAABB}
				 * @example
				 * // update player movement
				 * this.updateMovement();
				 *
				 * // check for collision with other objects
				 * res = this.collide();
				 *
				 * // check if we collide with an enemy :
				 * if (res && (res.obj.type == me.game.ENEMY_OBJECT))
				 * {
				 *   if (res.x != 0)
				 *   {
				 *      // x axis
				 *      if (res.x<0)
				 *         console.log("x axis : left side !");
				 *      else
				 *         console.log("x axis : right side !");
				 *   }
				 *   else
				 *   {
				 *      // y axis
				 *      if (res.y<0)
				 *         console.log("y axis : top side !");
				 *      else
				 *         console.log("y axis : bottom side !");
				 *   }
				 * }
				 */
				collide : function(multiple) {
					return me.game.collide(this, multiple || false);
				},

				/**
				 * Checks if the specified entity collides with others entities of the specified type.
				 * @public
				 * @function
				 * @param {String} type Entity type to be tested for collision
				 * @param {Boolean} [multiple=false] check for multiple collision
				 * @return {me.Vector2d} collision vector or an array of collision vector (multiple collision){@link me.Rect#collideVsAABB}
				 */
				collideType : function(type, multiple) {
					return me.game.collideType(this, type, multiple || false);
				},
				
				/**
				 * object draw<br>
				 * not to be called by the end user<br>
				 * called by the game manager on each game loop
				 * @protected
				 * @param {Context2d} context 2d Context on which draw our object
				 **/
				draw : function(context) {
					// call parent function
					this.parent(context);
					
					// check if debug mode is enabled
					if (me.debug.renderHitBox) {
						// draw the collisionBox
						this.collisionBox.draw(context, "red");
						
						// draw entity current velocity
						var x =  ~~(this.pos.x + this.hWidth);
						var y =  ~~(this.pos.y + this.hHeight);
						
						context.lineWidth = 1;
						context.beginPath();
						context.moveTo(x , y);
						context.lineTo(x +  ~~(this.vel.x * this.hWidth), y + ~~(this.vel.y * this.hHeight));
						context.stroke();
					}
				}


	});

	/************************************************************************************/
	/*                                                                                  */
	/*      a Collectable entity                                                        */
	/*                                                                                  */
	/************************************************************************************/
	/**
	 * @class
	 * @extends me.ObjectEntity
	 * @memberOf me
	 * @constructor
	 * @param {int} x the x coordinates of the sprite object
	 * @param {int} y the y coordinates of the sprite object
	 * @param {me.ObjectSettings} settings object settings
	 */
	me.CollectableEntity = me.ObjectEntity.extend(
	/** @scope me.CollectableEntity.prototype */
	{
		/** @private */
		init : function(x, y, settings) {
			// call the parent constructor
			this.parent(x, y, settings);

			// make it collidable
			this.collidable = true;
			this.type = me.game.COLLECTABLE_OBJECT;

		}
	});

	/************************************************************************************/
	/*                                                                                  */
	/*      a non visible entity                                                        */
	/*      NOT FINISHED                                                                */
	/************************************************************************************/
	/**
	 * @class
	 * @extends me.Rect
	 * @memberOf me
	 * @constructor
	 * @param {int} x the x coordinates of the object
	 * @param {int} y the y coordinates of the object
	 * @param {me.ObjectSettings} settings object settings
	 */
	me.InvisibleEntity = me.Rect
			.extend(
			/** @scope me.InvisibleEntity.prototype */
			{

			   /**
				* Entity "Game Unique Identifier"<br>
				* @public
				* @type String
				* @name me.InvisibleEntity#GUID
				*/
				GUID : null,

				// for z ordering
				z : 0,
				collisionBox : null,

				/** @private */
				init : function(x, y, settings) {
					// call the parent constructor
					this.parent(new me.Vector2d(x, y), settings.width, settings.height);

					// create a a default collision rectangle
					this.collisionBox = new me.Rect(this.pos, settings.width, settings.height);

					// set the object GUID value
					this.GUID = me.utils.createGUID();

					// set the object entity name
					this.name = settings.name?settings.name.toLowerCase():"";

					this.visible = true;

					this.collidable = true;

					// just to identify our object
					this.isEntity = true;

				},

				/**
				 * specify the size of the hit box for collision detection<br>
				 * (allow to have a specific size for each object)<br>
				 * e.g. : object with resized collision box :<br>
				 * <img src="me.Rect.colpos.png"/>
				 * @param {int} x x offset (specify -1 to not change the width)
				 * @param {int} w width of the hit box
				 * @param {int} y y offset (specify -1 to not change the height)
				 * @param {int} h height of the hit box
				 */
				updateColRect : function(x, w, y, h) {
					this.collisionBox.adjustSize(x, w, y, h);
				},

				/**
				 * onCollision Event function<br>
				 * called by the game manager when the object collide with shtg
				 * @param {me.Vector2d} res collision vector
				 * @param {me.ObjectEntity} obj the other object that hit this object
				 * @protected
				 */
				onCollision : function(res, obj) {
					;// to be extended			
				},

				/**
				 * Destroy function
				 * @private
				 */
				destroy : function() {
					// call the destroy notification function
					this.onDestroyEvent.apply(this, arguments);
				},

				/**
				 * OnDestroy Notification function<br>
				 * Called by engine before deleting the object
				 */
				onDestroyEvent : function() {
					;// to be extended !
				},

				/** @private */
				update : function() {
					return false;
				},

				/** @private */
				draw : function(context) {
					if (me.debug.renderHitBox) {
						// draw the sprite rectangle
						context.strokeStyle = "blue";
						context.strokeRect(this.pos.x, this.pos.y, this.width, this.height);

						this.collisionBox.draw(context);
					}

				}
			});

	/************************************************************************************/
	/*                                                                                  */
	/*      a level entity                                                              */
	/*                                                                                  */
	/************************************************************************************/
	/**
	 * @class
	 * @extends me.InvisibleEntity
	 * @memberOf me
	 * @constructor
	 * @param {int} x the x coordinates of the object
	 * @param {int} y the y coordinates of the object
	 * @param {me.ObjectSettings} settings object settings
	 */
	me.LevelEntity = me.InvisibleEntity.extend(
	/** @scope me.LevelEntity.prototype */
	{
		/** @private */
		init : function(x, y, settings) {
			this.parent(x, y, settings);

			this.nextlevel = settings.to;

			this.fade = settings.fade;
			this.duration = settings.duration;
			this.fading = false;

			// a temp variable
			this.gotolevel = settings.to;

		},

		/**
		 * @private
		 */
		onFadeComplete : function() {
			me.levelDirector.loadLevel(this.gotolevel);
			me.game.viewport.fadeOut(this.fade, this.duration);
		},

		/**
		 * go to the specified level
		 * @protected
		 */
		goTo : function(level) {
			this.gotolevel = level || this.nextlevel;
			// load a level
			//console.log("going to : ", to);
			if (this.fade && this.duration) {
				if (!this.fading) {
					this.fading = true;
					me.game.viewport.fadeIn(this.fade, this.duration,
							this.onFadeComplete.bind(this));
				}
			} else {
				me.levelDirector.loadLevel(this.gotolevel);
			}
		},

		/** @private */
		onCollision : function() {
			this.goTo();
		}
	});

	/*---------------------------------------------------------*/
	// END END END
	/*---------------------------------------------------------*/
})(window);
/*
 * MelonJS Game Engine
 * Copyright (C) 2012, Olivier BIOT
 * http://www.melonjs.org
 *
 * Font / Bitmap font
 *
 * ASCII Table
 * http://www.asciitable.com/ 
 * [ !"#$%&'()*+'-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_'abcdefghijklmnopqrstuvwxyz]
 *
 * -> first char " " 32d (0x20);
 */

(function($) {

	/**
	 * a generic system font object.
	 * @class
	 * @extends Object
	 * @memberOf me
	 * @constructor
	 * @param {String} font
	 * @param {int} size
	 * @param {String} color
	 * @param {String} [align="left"] horizontal alignement
	 */
	me.Font = Object.extend(
	/** @scope me.Font.prototype */
	{
		// alignement constants
		ALIGN : {
			LEFT : "left",
			CENTER : "center",
			RIGHT : "right"
		},

		// font properties
		font : null,
		height : null,
		color : null,
		align : null,

		/** @private */
		init : function(font, size, color, align) {

			// font name and type
			this.set(font, size, color, align);
		},

		/**
		 * make the font bold
		 */
		bold : function() {
			this.font = "bold " + this.font;
		},

		/**
		 * make the font italic
		 */
		italic : function() {
			this.font = "italic " + this.font;
		},

		/**
		 * Change the font settings
		 * @param {String} font
		 * @param {int} size/{String} size + suffix (px, em, pt)
		 * @param {String} color
		 * @param {String} [align="left"] horizontal alignement
		 * @example
		 * font.set("Arial", 20, "white");
		 * font.set("Arial", "1.5em", "white");
		 */
		set : function(font, size, color, align) {
			// font name and type
			var font_names = font.split(",");
			for (var i = 0; i < font_names.length; i++) {
				font_names[i] = "'" + font_names[i] + "'";
			}
			this.height = parseInt(size);
			if (typeof size === "number") {
				size = "" + size + "px"
			}
			this.font = size + " " + font_names.join(",");;
			this.color = color;
			this.align = align || "left";
		},

		/**
		 * FIX ME !
		 * @private
		 */
		getRect : function() {
			return new me.Rect(new Vector2d(0, 0), 0, 0);
		},

		/**
		 * measure the given text size in pixels
		 * @param {Context} context 2D Context
		 * @param {String} text
		 * @return {Object} returns an object, with two attributes: width (the width of the text) and height (the height of the text).
		 */
		measureText : function(context, text) {
			// draw the text
			context.font = this.font;
			context.fillStyle = this.color;
			context.textAlign = this.align;
			var dim = context.measureText(text);
			dim.height = this.height;

			return dim;
		},

		/**
		 * draw a text at the specified coord
		 * @param {Context} context 2D Context
		 * @param {String} text
		 * @param {int} x
		 * @param {int} y
		 */
		draw : function(context, text, x, y) {
			// draw the text
			context.font = this.font;
			context.fillStyle = this.color;
			context.textAlign = this.align;
			context.fillText(text, ~~x, ~~y);
		}
	});

	/**
	 * a bitpmap font object
	 * @class
	 * @extends me.Font
	 * @memberOf me
	 * @constructor
	 * @param {String} font
	 * @param {int/Object} size either an int value, or an object like {x:16,y:16}
	 * @param {int} [scale="1.0"]
	 * @param {String} [firstChar="0x20"]

	 */
	me.BitmapFont = me.Font.extend(
	/** @scope me.BitmapFont.prototype */
	{
		// character size;
		size : null,
		// font scale;
		sSize : null,
		// first char in the ascii table
		firstChar : 0x20,
		
		// #char per row
		charCount : 0,

		/** @private */
		init : function(font, size, scale, firstChar) {
			// font name and type
			this.parent(font, null, null);

			// font characters size;
			this.size = new me.Vector2d();
			
			// font scaled size;
			this.sSize = new me.Vector2d();

			// first char in the ascii table
			this.firstChar = firstChar || 0x20;

			// load the font metrics
			this.loadFontMetrics(font, size);

			// set a default alignement
			this.align = this.ALIGN.RIGHT
			
			// resize if necessary
			if (scale) { 
				this.resize(scale);
			}

		},

		/**
		 * Load the font metrics
		 * @private	
		 */
		loadFontMetrics : function(font, size) {
			this.font = me.loader.getImage(font);

			// some cheap metrics
			this.size.x = size.x || size;
			this.size.y = size.y || this.font.height;
			this.sSize.copy(this.size);
			
			// #char per row  
			this.charCount = ~~(this.font.width / this.size.x);
		},

		/**
		 * change the font settings
		 * @param {String} align ("left", "center", "right")
		 * @param {int} [scale]
		 */
		set : function(align, scale) {
			this.align = align;
			// updated scaled Size
			if (scale) {
				this.resize(scale);
			}
		},
		
		/**
		 * change the font display size
		 * @param {int} scale ratio
		 */
		resize : function(scale) {
			// updated scaled Size
			this.sSize.copy(this.size);
			this.sSize.x *= scale;
			this.sSize.y *= scale;
		},

		/**
		 * measure the given text size in pixels
		 * @param {Context} context 2D Context
		 * @param {String} text
		 * @return {Object} returns an object, with two attributes: width (the width of the text) and height (the height of the text).
		 */
		measureText : function(text) {
			return {
				width : text.length * this.sSize.x,
				height : this.sSize.y
			};
		},

		/**
		 * draw a text at the specified coord
		 * @param {Context} context 2D Context
		 * @param {String} text
		 * @param {int} x
		 * @param {int} y
		 */
		draw : function(context, text, x, y) {
			// make sure it's a String object
			text = new String(text);

			// adjust pos based on alignment
			switch(this.align) {
				case this.ALIGN.RIGHT:
					x -= this.measureText(text).width;
					break;

				case this.ALIGN.CENTER:
					x -= this.measureText(text).width * 0.5;
					break;
			};
			
			// draw the text
			for ( var i = 0,len = text.length; i < len; i++) {
				// calculate the char index
				var idx = text.charCodeAt(i) - this.firstChar;
				// draw it
				context.drawImage(this.font,
						this.size.x * (idx % this.charCount), 
						this.size.y * ~~(idx / this.charCount), 
						this.size.x, this.size.y, 
						~~x, ~~y, 
						this.sSize.x, this.sSize.y);
				x += this.sSize.x;
			}

		}
	});

	/*---------------------------------------------------------*/
	// END END END
	/*---------------------------------------------------------*/
})(window);
/*
 * MelonJS Game Engine
 * Copyright (C) 2012, Olivier BIOT
 * http://www.melonjs.org
 *
 */

(function($) {
	
	/**
	 * GUI Object<br>
	 * A very basic object to manage GUI elements <br>
	 * The object simply register on the "mousedown" <br>
	 * or "touchstart" event and call the onClicked function" 
	 * @class
	 * @extends me.SpriteObject
	 * @memberOf me
	 * @example
	 *
	 * // create a basic GUI Object
	 * var myButton = me.GUI_Object.extend(
	 * {	
	 *    init:function(x, y)
	 *    {
	 *       settings = {}
	 *       settings.image = "button";
	 *       settings.spritewidth = 100;
	 *       settings.spriteheight = 50;
	 *       // parent constructor
	 *       this.parent(x, y, settings);
	 *    },
	 *	
	 *    // output something in the console
	 *    // when the object is clicked
	 *    onClick:function()
	 *    {
	 *       console.log("clicked!");
	 *       // don't propagate the event
	 *       return true;
	 *    }
	 * });
	 * 
	 * // add the object at pos (10,10), z index 4
	 * me.game.add((new myButton(10,10)),4);
	 *
	 */
	me.GUI_Object = me.SpriteObject.extend({
	/** @scope me.GUI_Object.prototype */
	
		/**
		 * object can be clicked or not
		 * @public
		 * @type boolean
		 * @name me.GUI_Object#isClickable
		 */
		isClickable : true,
		
		// object has been updated (clicked,etc..)	
		updated : false,

		/**
		 * @Constructor
		 * @private
		 */
		 init : function(x, y, settings) {
			this.parent(x, y, 
						((typeof settings.image == "string") ? me.loader.getImage(settings.image) : settings.image), 
						settings.spritewidth, 
						settings.spriteheight);
			
			// GUI items use screen coordinates
			this.floating = true;
			
			// register on mouse event
			me.input.registerMouseEvent('mousedown', this, this.clicked.bind(this));

		},

		/**
		 * return true if the object has been clicked
		 * @private
		 */
		update : function() {
			if (this.updated) {
				// clear the flag
				this.updated = false;
				return true;
			}
			return false;
		},
		
		/**
		 * function callback for the mousedown event
		 * @private
		 */
		clicked : function() {
			if (this.isClickable) {
				this.updated = true;
				return this.onClick();
			}
		},
	
		/**
		 * function called when the object is clicked <br>
		 * to be extended <br>
		 * return true if we need to stop propagating the event
		 * @public
		 * @function
		 */
		onClick : function() {
			
			return true;
		},
		
		/**
		 * OnDestroy notification function<br>
		 * Called by engine before deleting the object<br>
		 * be sure to call the parent function if overwritten
		 */
		onDestroyEvent : function() {
			me.input.releaseMouseEvent('mousedown', this);
		}

	});

	/*---------------------------------------------------------*/
	// END END END
	/*---------------------------------------------------------*/
})(window);
/*
 * MelonJS Game Engine
 * Copyright (C) 2012, Olivier BIOT
 * http://www.melonjs.org
 *
 *
 */

(function($) {

	/************************************************************************************/
	/*      HUD FUNCTIONS :                                                             */
	/*      a basic HUD to be extended                                                  */
	/*                                                                                  */
	/************************************************************************************/

	/**
	 * Item skeleton for HUD element 
	 * @class
	 * @extends Object
	 * @memberOf me
	 * @constructor
	 * @param {int} x x position (relative to the HUD position)
	 * @param {int} y y position (relative to the HUD position)
	 * @param {int} [val="0"] default value
	 * @example
	 * // create a "score object" that will use a Bitmap font
	 * // to display the score value
	 * ScoreObject = me.HUD_Item.extend(
	 * {	
	 *    // constructor
	 *    init: function(x, y)
	 *    {
	 *       // call the parent constructor
	 *       this.parent(x, y);
	 *       // create a font
	 *       this.font = new me.BitmapFont("font16px", 16);
	 *    },
	 *    // draw function
	 *    draw : function (context, x, y)
	 *    {
	 *       this.font.draw (context, this.value, this.pos.x +x, this.pos.y +y);
	 *    }
	 * });
	 * 
	 * // add a default HUD to the game mngr (with no background)
	 * me.game.addHUD(0,0,480,100);
	 * // add the "score" HUD item
	 * me.game.HUD.addItem("score", new ScoreObject(470,10));
	 */
	me.HUD_Item = Object.extend(
	/** @scope me.HUD_Item.prototype */
	{
		init : function(x, y, val) {
			/**
			 * position of the item
			 * @public
			 * @type me.Vector2d
			 * @name me.HUD_Item#pos
			 */
			this.pos = new me.Vector2d(x || 0, y || 0);

			// visible or not...	
			this.visible = true;

			this.defaultvalue = val || 0;

			/**
			 * value of the item
			 * @public
			 * @type Int
			 * @name me.HUD_Item#value
			 */

			this.value = val || 0;

			this.updated = true;
		},

		/**
		 * reset the item to the default value
		 */
		reset : function() {
			this.set(this.defaultvalue);
		},
		
		/**
		 * set the item value to the specified one
		 */
		set : function(value) {
			this.value = value;
			this.updated = true;
			return true;
		},

		/**
		 * update the item value
		 * @param {int} value add the specified value
		 */
		update : function(value) {
			return this.set(this.value + value);
		},

		/**
		 * draw the HUD item
		 * @protected
		 * @param {Context2D} context 2D context
		 * @param {x} x
		 * @param {y} y
		 */
		draw : function(context, x, y) {
			;// to be extended
		}
	});
	/*---------------------------------------------------------*/

	/**
	 * HUD Object<br>
	 * There is no constructor function for me.HUD_Object<br>
	 * Object instance is accessible through me.game.HUD if previously initialized using me.game.addHUD(...);
	 * @class
	 * @extends Object
	 * @memberOf me
	 * @example
	 * // create a "score object" that will use a Bitmap font
	 * // to display the score value
	 * ScoreObject = me.HUD_Item.extend(
	 * {	
	 *    // constructor
	 *    init: function(x, y)
	 *    {
	 *       // call the parent constructor
	 *       this.parent(x, y);
	 *       // create a font
	 *       this.font = new me.BitmapFont("font16px", 16);
	 *    },
	 *    // draw function
	 *    draw : function (context, x, y)
	 *    {
	 *       this.font.draw (context, this.value, this.pos.x +x, this.pos.y +y);
	 *    }
	 * });
	 * 
	 * // add a default HUD to the game mngr (with no background)
	 * me.game.addHUD(0,0,480,100);
	 * // add the "score" HUD item
	 * me.game.HUD.addItem("score", new ScoreObject(470,10));
	 */


	me.HUD_Object = me.Rect.extend(
	/** @scope me.HUD_Object.prototype */
	{	
	
		
		/**
		 * @Constructor
		 * @private
		 */
		init : function(x, y, w, h, bg) {
			// call the parent constructor
			this.parent(new me.Vector2d(x || 0, y || 0), 
						w || me.video.getWidth(), h || me.video.getHeight());

			// default background color (if specified)
			this.bgcolor = bg;

			// hold all the items labels						
			this.HUDItems = {};
			// hold all the items objects
			this.HUDobj = [];
			// Number of items in the HUD
			this.objCount = 0;

			// visible or not...	
			this.visible = true;
			
			// use screen coordinates
			this.floating = true;

			// state of HUD (to trigger redraw);
			this.HUD_invalidated = true;

			// create a canvas where to draw everything
			this.HUDCanvas = me.video.createCanvas(this.width, this.height);
			this.HUDCanvasSurface = this.HUDCanvas.getContext('2d');
			
			// this is a little hack to ensure the HUD is always the first draw
			this.z = 999;
			
			// ensure me.game.removeAll() will not remove the HUD
			this.isPersistent = true;

		},

		/**
		 * add an item to the me.game.HUD Object
		 * @name me.HUD_Object#addItem
		 * @public
		 * @function
		 * @param {String} name name of the item
		 * @param {me.HUD_Item} item HUD Item to be added
		 * @example
		 * // add a "score" HUD item
		 * me.game.HUD.addItem("score", new ScoreObject(470,10));
		 */
		addItem : function(name, item) {
			this.HUDItems[name] = item;
			this.HUDobj.push(this.HUDItems[name]);
			this.objCount++;
			this.HUD_invalidated = true;
		},
		
		/**
		 * remove an item from the me.game.HUD Object
		 * @name me.HUD_Object#removeItem
		 * @public
		 * @function
		 * @param {String} name name of the item
		 * @example
		 * // remove the "score" HUD item
		 * me.game.HUD.removeItem("score");
		 */
		removeItem : function(name) {
			if (this.HUDItems[name]) {
				this.HUDobj.splice(this.HUDobj.indexOf(this.HUDItems[name]),1);
				this.HUDItems[name] = null;
				this.objCount--;
				this.HUD_invalidated = true;
			}
		},
		
		/**
		 * set the value of the specified item
		 * @name me.HUD_Object#setItemValue
		 * @public
		 * @function
		 * @param {String} name name of the item
		 * @param {int} val value to be set 
		 * @example
		 * // set the "score" item value to 100
		 * me.game.HUD.setItemValue("score", 100);
		 */
		setItemValue : function(name, value) {
			if (this.HUDItems[name] && (this.HUDItems[name].set(value) == true))
				this.HUD_invalidated = true;				
		},

		
		/**
		 * update (add) the value of the specified item
		 * @name me.HUD_Object#updateItemValue
		 * @public
		 * @function
		 * @param {String} name name of the item
		 * @param {int} val value to be set 
		 * @example
		 * // add 10 to the current "score" item value
		 * me.game.HUD.updateItemValue("score", 10);
		 */
		updateItemValue : function(name, value) {
			if (this.HUDItems[name] && (this.HUDItems[name].update(value) == true))
				this.HUD_invalidated = true;
		},

		/**
		 * return the value of the specified item
		 * @name me.HUD_Object#getItemValue
		 * @public
		 * @function
		 * @param {String} name name of the item
		 * @return {int}
		 * @example
		 * // return the value of the "score" item
		 * score = me.game.HUD.getItemValue("score");
		 */
		getItemValue : function(name) {
			return (this.HUDItems[name]) ? this.HUDItems[name].value : 0;
		},
		
		
		/**
		 * return true if the HUD has been updated
		 * @private
		 */
		update : function() {
			return this.HUD_invalidated;
		},

		/**
		 * reset the specified item to default value
		 * @name me.HUD_Object#reset
		 * @public
		 * @function
		 * @param {String} [name="all"] name of the item
		 */		
		reset : function(name) {
			if (name != undefined) {
				// only reset the specified one
				if (this.HUDItems[name])
					this.HUDItems[name].reset();
				this.HUD_invalidated = true;
			} else {
				// reset everything
				this.resetAll();
			}
		},

		/**
		 * reset all items to default value
		 * @private
		 */
		resetAll : function() {
			for ( var i = this.objCount, obj; i--, obj = this.HUDobj[i];) {
				obj.reset();
			}
			this.HUD_invalidated = true;
		},

		/**
		 * override the default me.Rect get Rectangle definition
		 * since the HUD if a flaoting object
		 * (is this correct?)
		 * @private
		 * @return {me.Rect} new rectangle
		 */

		getRect : function() {
			p = this.pos.clone();
			p.add(me.game.viewport.pos);
			return new me.Rect(p, this.width, this.height);
		},

		/**
		 * draw the HUD
		 * @private
		 */
		draw : function(context) {
			if (this.HUD_invalidated) {
				if (this.bgcolor) {
					me.video.clearSurface(this.HUDCanvasSurface, this.bgcolor);
				}
				else {
					this.HUDCanvas.width = this.HUDCanvas.width;
				}
				for ( var i = this.objCount, obj; i--, obj = this.HUDobj[i];) {
					if (obj.visible) {
						obj.draw(this.HUDCanvasSurface, 0, 0);
						// clear the updated flag
						if (obj.updated) {
							obj.updated = false;
						}
					}
				}
			}
			// draw the HUD
			context.drawImage(this.HUDCanvas, this.pos.x, this.pos.y);
			// reset the flag
			this.HUD_invalidated = false;
		}
	});


	/*---------------------------------------------------------*/
	// END END END
	/*---------------------------------------------------------*/
})(window);
/*
 * MelonJS Game Engine
 * Copyright (C) 2012, Olivier BIOT
 * http://www.melonjs.org
 *
 * Audio Mngt Objects
 *
 *
 */

(function($) {

	/*
	 * -----------------------------------------------------
	 * 
	 * a audio class singleton to manage the game fx & music
	 * -----------------------------------------------------
	 */

	/**
	 * There is no constructor function for me.audio.
	 * 
	 * @final
	 * @memberOf me
	 * @constructor Should not be called by the user.
	 */

	me.audio = (function() {
		// hold public stuff in our singleton
		var obj = {};

		// audio channel list
		var audio_channels = {};

		// Active (supported) audio extension
		var activeAudioExt = -1;

		// loadcb function
		var load_cb = null;

		// current music
		var current_track_id = null;
		var current_track = null;

		// enable/disable flag
		var sound_enable = true;

		// defaut reset value
		var reset_val = 0;// .01;

		// a retry counter
		var retry_counter = 0;

		/*
		 * ---------------------------------------------
		 * 
		 * PRIVATE STUFF
		 * 
		 * ---------------------------------------------
		 */

		/**
		 * @private
		 * return the first audio format extension supported by the browser
		 */
		function getSupportedAudioFormat(requestedFormat) {
			var result = "";
			var len = requestedFormat.length;

			// check for sound support by the browser
			if (me.sys.sound) {
				var ext = "";
				var i = 0;
				// do a first loop and check for codec with
				// the 'probably' canPlayType first
				for (; i < len; i++) {
					ext = requestedFormat[i].toLowerCase().trim();
					// check extension against detected capabilities
					if (obj.capabilities[ext] && 
						obj.capabilities[ext].canPlay && 
						obj.capabilities[ext].canPlayType === 'probably') {
						result = ext;
						break;
					}
				}
				// loop again and check for all the rest ('maybe')
				i = 0;
				for (; i < len; i++) {
					ext = requestedFormat[i].toLowerCase().trim();
					// check extension against detected capabilities
					if (obj.capabilities[ext] && 
						obj.capabilities[ext].canPlay) {
						result = ext;
						break;
					}
				}
			}

			if (result === "") {
				// deactivate sound
				sound_enable = false;
			}

			return result;
		};

		/**
		 * @private
		 * return the specified sound
		 */

		function get(sound_id) {
			var channels = audio_channels[sound_id];
			// find which channel is available
			for ( var i = 0, soundclip; soundclip = channels[i++];) {
				if (soundclip.ended || !soundclip.currentTime)// soundclip.paused)
				{
					// console.log ("requested %s on channel %d",sound_id, i);
					soundclip.currentTime = reset_val;
					return soundclip;
				}
			}
			// else force on channel 0
			channels[0].pause();
			channels[0].currentTime = reset_val;
			return channels[0];
		};

		/**
		 * @private
		 * event listener callback on load error
		 */

		function soundLoadError(sound_id) {
			// check the retry counter
			if (retry_counter++ > 3) {
				// something went wrong
				var errmsg = "melonJS: failed loading " + sound_id + "." + activeAudioExt;
				if (me.sys.stopOnAudioError===false) {
					// disable audio
					me.audio.disable();
					// call load callback if defined
					if (load_cb) {
						load_cb();
					}
					// warning
					console.log(errmsg + ", disabling audio");
				} else {
					// throw an exception and stop everything !
					throw errmsg;
				}
			// else try loading again !
			} else {
				audio_channels[sound_id][0].load();
			}
		};

		/**
		 * @private
		 * event listener callback when a sound is loaded
		 */

		function soundLoaded(sound_id, sound_channel) {
			// reset the retry counter
			retry_counter = 0;
			// create other "copy" channels if necessary
			if (sound_channel > 1) {
				var soundclip = audio_channels[sound_id][0];
				// clone copy to create multiple channel version
				for (var channel = 1; channel < sound_channel; channel++) {
					// allocate the new additional channels
					audio_channels[sound_id][channel] = new Audio( soundclip.src );
					audio_channels[sound_id][channel].preload = 'auto';
					audio_channels[sound_id][channel].load();
				}
			}
			// callback if defined
			if (load_cb) {
				load_cb.call();
			}
		};

		/**
		 * play the specified sound
		 * 
		 * @name me.audio#play
		 * @public
		 * @function
		 * @param {String}
		 *            sound_id audio clip id
		 * @param {Boolean}
		 *            [loop="false"] loop audio
		 * @param {Function}
		 *            [callback] callback function
		 * @param {Number}
		 * 			  [volume=1.0] Float specifying volume (0.0 - 1.0 values accepted).
		 * @example 
		 * // play the "cling" audio clip 
		 * me.audio.play("cling"); 
		 * // play & repeat the "engine" audio clip
		 * me.audio.play("engine", true); 
		 * // play the "gameover_sfx" audio clip and call myFunc when finished
		 * me.audio.play("gameover_sfx", false, myFunc);
		 * // play the "gameover_sfx" audio clip with a lower volume level
		 * me.audio.play("gameover_sfx", false, null, 0.5);
		 */

		function _play_audio_enable(sound_id, loop, callback, volume) {
			// console.log("play!!");
			var soundclip = get(sound_id.toLowerCase());
	
			soundclip.loop = loop || false;
			soundclip.volume = volume ? parseFloat(volume) : 1.0;
			soundclip.play();

			// set a callback if defined
			if (callback && !loop) {
				soundclip.addEventListener('ended', function(event) {
					soundclip.removeEventListener('ended', arguments.callee,
							false);
					// soundclip.pause();
					// soundclip.currentTime = reset_val;
					// execute a callback if required
					callback();
				}, false);
			}

		};

		/**
		 * @private
		 * play_audio with simulated callback
		 */

		function _play_audio_disable(sound_id, loop, callback) {
			// check if a callback need to be called
			if (callback && !loop) {
				// SoundMngr._play_cb = callback;
				setTimeout(callback, 2000); // 2 sec as default timer ?
			}
		};

		/*
		 *---------------------------------------------
		 * PUBLIC STUFF
		 *---------------------------------------------
		 */

		// audio capabilities
		obj.capabilities = {
			mp3: {
				codec: 'audio/mpeg',
				canPlay: false,
				canPlayType: 'no'
			},
			ogg: {
				codec: 'audio/ogg; codecs="vorbis"',
				canPlay: false,
				canPlayType: 'no'
			},
			m4a: {
				codec: 'audio/mp4; codecs="mp4a.40.2"',
				canPlay: false,
				canPlayType: 'no'
			},
			wav: {
				codec: 'audio/wav; codecs="1"',
				canPlay: false,
				canPlayType: 'no'
			}
		};	
		
		/**
		 * @private
		 */
		obj.detectCapabilities = function () {
			// init some audio variables
			var a = document.createElement('audio');
			if (a.canPlayType) {
				for (var c in obj.capabilities) {
					var canPlayType = a.canPlayType(obj.capabilities[c].codec);
					// convert the string to a boolean
					if (canPlayType !== "" && canPlayType !== "no") {
						obj.capabilities[c].canPlay = true;
						obj.capabilities[c].canPlayType = canPlayType;
					}
					// enable sound if any of the audio format is supported
					me.sys.sound |= obj.capabilities[c].canPlay;					
				}
			}
			
			// check for specific platform
			if ((me.sys.ua.search("iphone") > -1) || (me.sys.ua.search("ipod") > -1) || 
				(me.sys.ua.search("ipad") > -1) || (me.sys.ua.search("android") > -1)) {
				// if on mobile device, without a specific HTML5 acceleration framework
				if (!navigator.isCocoonJS) {
					// disable sound for now
					me.sys.sound = false;
				}
			}
		};

		/**
		 * initialize the audio engine<br>
		 * the melonJS loader will try to load audio files corresponding to the
		 * browser supported audio format<br>
		 * if no compatible audio codecs are found, audio will be disabled
		 * 
		 * @name me.audio#init
		 * @public
		 * @function
		 * @param {String}
		 *          audioFormat audio format provided ("mp3, ogg, m4a, wav")
		 * @example 
		 * // initialize the "sound engine", giving "mp3" and "ogg" as desired audio format 
		 * // i.e. on Safari, the loader will load all audio.mp3 files, 
		 * // on Opera the loader will however load audio.ogg files
		 * me.audio.init("mp3,ogg"); 
		 */
		obj.init = function(audioFormat) {
			if (!me.initialized) {
				throw "melonJS: me.audio.init() called before engine initialization.";
			}
			// if no param is given to init we use mp3 by default
			audioFormat = new String(audioFormat?audioFormat:"mp3");
			// convert it into an array
			audioFormat = audioFormat.split(',');
			// detect the prefered audio format
			activeAudioExt = getSupportedAudioFormat(audioFormat);
			
			// enable/disable sound
			obj.play = obj.isAudioEnable() ? _play_audio_enable : _play_audio_disable;

			return obj.isAudioEnable();
		};

		/**
		 * set call back when a sound (and instances) is/are loaded
		 * 
		 * @name me.audio#setLoadCallback
		 * @private
		 * @function
		 */
		obj.setLoadCallback = function(callback) {
			load_cb = callback;
		};

		/**
		 * return true if audio is enable
		 * 
		 * @see me.audio#enable
		 * @name me.audio#isAudioEnable
		 * @public
		 * @function
		 * @return {boolean}
		 */
		obj.isAudioEnable = function() {
			return sound_enable;
		};

		/**
		 * enable audio output <br>
		 * only useful if audio supported and previously disabled through
		 * audio.disable()
		 * 
		 * @see me.audio#disable
		 * @name me.audio#enable
		 * @public
		 * @function
		 */
		obj.enable = function() {
			sound_enable = me.sys.sound;

			if (sound_enable)
				obj.play = _play_audio_enable;
			else
				obj.play = _play_audio_disable;
		};

		/**
		 * disable audio output
		 * 
		 * @name me.audio#disable
		 * @public
		 * @function
		 */
		obj.disable = function() {
			sound_enable = false;
			obj.play = _play_audio_disable;
		};

		/**
		 * load a sound sound struct : name: id of the sound src: src path
		 * channel: number of channel to allocate
		 * 
		 * @private
		 */
		obj.load = function(sound) {
			// do nothing if no compatible format is found
			if (activeAudioExt == -1)
				return 0;

			var soundclip = new Audio(sound.src + sound.name + "." + activeAudioExt + me.nocache);

			soundclip.preload = 'auto';

			soundclip.addEventListener('canplaythrough', function(e) {
				// console.log(soundclip);
				this.removeEventListener('canplaythrough', arguments.callee, false);
				soundLoaded.apply(me.audio, [sound.name, sound.channel]);
			}, false);

			soundclip.addEventListener("error", function(e) {
				soundLoadError.apply(me.audio, [sound.name]);
			}, false);

			// load it
			soundclip.load();

			audio_channels[sound.name] = [ soundclip ];

			return 1;
		};

		/**
		 * stop the specified sound on all channels
		 * 
		 * @name me.audio#stop
		 * @public
		 * @function
		 * @param {String} sound_id audio clip id
		 * @example 
		 * me.audio.stop("cling");
		 */
		obj.stop = function(sound_id) {
			if (sound_enable) {
				var sound = audio_channels[sound_id.toLowerCase()];
				for (var channel_id = sound.length; channel_id--;) {
					sound[channel_id].pause();
					// force rewind to beginning
					sound[channel_id].currentTime = reset_val;
				}

			}
		};

		/**
		 * pause the specified sound on all channels<br>
		 * this function does not reset the currentTime property
		 * 
		 * @name me.audio#pause
		 * @public
		 * @function
		 * @param {String} sound_id audio clip id
		 * @example 
		 * me.audio.pause("cling");
		 */
		obj.pause = function(sound_id) {
			if (sound_enable) {
				var sound = audio_channels[sound_id.toLowerCase()];
				for (var channel_id = sound.length; channel_id--;) {
					sound[channel_id].pause();
				}

			}
		};

		/**
		 * play the specified audio track<br>
		 * this function automatically set the loop property to true<br>
		 * and keep track of the current sound being played.
		 * 
		 * @name me.audio#playTrack
		 * @public
		 * @function
		 * @param {String} sound_id audio track id
		 * @example 
		 * me.audio.playTrack("awesome_music");
		 */
		obj.playTrack = function(sound_id) {
			if (sound_enable) {
				if (current_track != null)
					obj.stopTrack();

				sound_id = sound_id.toLowerCase();
				current_track = get(sound_id);

				if (current_track) {
					current_track_id = sound_id;
					current_track.loop = true;
					current_track.play();
				}
			}
		};

		/**
		 * stop the current audio track
		 * 
		 * @see me.audio#playTrack
		 * @name me.audio#stopTrack
		 * @public
		 * @function
		 * @example 
		 * // play a awesome music 
		 * me.audio.playTrack("awesome_music"); 
		 * // stop the current music 
		 * me.audio.stopTrack();
		 */
		obj.stopTrack = function() {
			if (sound_enable && current_track) {
				current_track.pause();
				current_track_id = null;
				current_track = null;
			}
		};

		/**
		 * pause the current audio track
		 * 
		 * @name me.audio#pauseTrack
		 * @public
		 * @function
		 * @example 
		 * me.audio.pauseTrack();
		 */
		obj.pauseTrack = function() {
			if (sound_enable && current_track) {
				current_track.pause();
			}
		};

		/**
		 * resume the previously paused audio track
		 * 
		 * @name me.audio#resumeTrack
		 * @public
		 * @function
		 * @param {String} sound_id audio track id
		 * @example 
		 * // play an awesome music 
		 * me.audio.playTrack("awesome_music");
		 * // pause the audio track 
		 * me.audio.pauseTrack();
		 * // resume the music 
		 * me.audio.resumeTrack();
		 */
		obj.resumeTrack = function() {
			if (sound_enable && current_track) {
				current_track.play();
			}
		};

		/**
		 * unload specified audio track to free memory
		 *
		 * @name me.audio#unload
		 * @public
		 * @function
		 * @param {String} sound_id audio track id
		 * @return {boolean} true if unloaded
		 * @example 
		 * me.audio.unload("awesome_music");
		 */
		obj.unload = function(sound_id) {
			sound_id = sound_id.toLowerCase();
			if (!(sound_id in audio_channels))
				return false;

			if (current_track_id === sound_id) {
				obj.stopTrack();
			}
			else {
				obj.stop(sound_id);
			}

			delete audio_channels[sound_id];

			return true;
		};

		/**
		 * unload all audio to free memory
		 *
		 * @name me.audio#unloadAll
		 * @public
		 * @function
		 * @example 
		 * me.audio.unloadAll();
		 */
		obj.unloadAll = function() {
			for (var sound_id in audio_channels) {
				obj.unload(sound_id);
			}
		};

		// return our object
		return obj;

	})();

	/*---------------------------------------------------------*/
	// END END END
	/*---------------------------------------------------------*/
})(window);
/*
 * MelonJS Game Engine
 * Copyright (C) 2012, Olivier BIOT
 * http://www.melonjs.org
 *
 */

(function($) {

	/**
	 * a Timer object to manage time function (FPS, Game Tick, Time...)<p>
	 * There is no constructor function for me.timer
	 * @final
	 * @memberOf me
	 * @constructor Should not be called by the user.
	 */
	me.timer = (function() {
		// hold public stuff in our api
		var api = {};

		/*---------------------------------------------
			
			PRIVATE STUFF
				
			---------------------------------------------*/

		//hold element to display fps
		var htmlCounter = null;
		var debug = false;
		var framecount = 0;
		var framedelta = 0;

		/* fps count stuff */
		var last = 0;
		var now = 0;
		var delta = 0;
		var step = Math.ceil(1000 / me.sys.fps); // ROUND IT ?
		// define some step with some margin
		var minstep = (1000 / me.sys.fps) * 1.25; // IS IT NECESSARY?

		/**
		 * draw the fps counter
		 * @private
		 */
		function draw(fps) {
			htmlCounter.replaceChild(document.createTextNode("(" + fps + "/"
					+ me.sys.fps + " fps)"), htmlCounter.firstChild);
		};

		/*---------------------------------------------
			
			PUBLIC STUFF
				
			---------------------------------------------*/

		/**
		 * last game tick value
		 * @public
		 * @type {Int}
		 * @name me.timer#tick
		 */
		api.tick = 1.0;

		/**
		 * last measured fps rate
		 * @public
		 * @type {Int}
		 * @name me.timer#fps
		 */
		api.fps = 0;
		
		/* ---
		
			init our time stuff
			
			---							*/
		api.init = function() {
			// check if we have a fps counter display in the HTML
			htmlCounter = document.getElementById("framecounter");
			if (htmlCounter !== null) {
				me.debug.displayFPS = true;
			}

			// reset variables to initial state
			api.reset();
		};

		/**
		 * reset time (e.g. usefull in case of pause)
		 * @name me.timer#reset
		 * @private
		 * @function
		 */
		api.reset = function() {
			// set to "now"
			now = last = Date.now();
			// reset delta counting variables
			framedelta = 0;
			framecount = 0;

		};

		/**
		 * return the current time
		 * @name me.timer#getTime
		 * @return {Date}
		 * @function
		 */
		api.getTime = function() {
			return now;
		};

		/* ---
		
			update game tick
			should be called once a frame
			
			---                           */
		api.update = function() {
			last = now;
			now = Date.now();

			delta = (now - last);

			// only draw the FPS on in the HTML page 
			if (me.debug.displayFPS) {
				framecount++;
				framedelta += delta;
				if (framecount % 10 == 0) {
					this.fps = (~~((1000 * framecount) / framedelta)).clamp(0, me.sys.fps);
					framedelta = 0;
					framecount = 0;
				}
				// set the element in the HTML
				if (htmlCounter !== null) {
					draw(this.fps);
				}
			}
			// get the game tick
			api.tick = (delta > minstep && me.sys.interpolation) ? delta / step	: 1;
		};

		// return our apiect
		return api;

	})();
	/************************************************************************************/

	/**
	 * video functions
	 * There is no constructor function for me.video
	 * @final
	 * @memberOf me
	 * @constructor Should not be called by the user.
	 */
	me.video = (function() {
		// hold public stuff in our apig
		var api = {};

		// internal variables
		var canvas = null;
		var context2D = null;
		var backBufferCanvas = null;
		var backBufferContext2D = null;
		var wrapper = null;
		
		var deferResizeId = -1;

		var double_buffering = false;
		var game_width_zoom = 0;
		var game_height_zoom = 0;
		var auto_scale = false;
		var maintainAspectRatio = true;

		/*---------------------------------------------
			
			PUBLIC STUFF
				
			---------------------------------------------*/

		/* ---
		
			init the video part
			
			
			---							*/
		/**
		 * init the "video" part<p>
		 * return false if initialization failed (canvas not supported)
		 * @name me.video#init
		 * @function
		 * @param {String} wrapper the "div" element id to hold the canvas in the HTML file  (if null document.body will be used)
		 * @param {Int} width game width
		 * @param {Int} height game height
		 * @param {Boolean} [double_buffering] enable/disable double buffering
		 * @param {Number} [scale] enable scaling of the canvas ('auto' for automatic scaling)
		 * @param {Boolean} [maintainAspectRatio] maintainAspectRatio when scaling the display
		 * @return {Boolean}
		 * @example
		 * // init the video with a 480x320 canvas
		 * if (!me.video.init('jsapp', 480, 320))
		 * {
		 *    alert("Sorry but your browser does not support html 5 canvas !");
		 *    return;
		 * }
		 */
		api.init = function(wrapperid, game_width, game_height,	doublebuffering, scale, aspectRatio) {
			// ensure melonjs has been properly initialized
			if (!me.initialized) {
				throw "melonJS: me.video.init() called before engine initialization.";
			}
			// check given parameters
			double_buffering = doublebuffering || false;
			auto_scale  = (scale==='auto') || false;
			maintainAspectRatio = (aspectRatio !== undefined) ? aspectRatio : true;
			
			// normalize scale
			scale = (scale!=='auto') ? parseFloat(scale || 1.0) : 1.0
			me.sys.scale = new me.Vector2d(scale, scale);
			
			// force double buffering if scaling is required
			if (auto_scale || (scale !== 1.0)) {
				double_buffering = true;
			}
			
			// default scaled size value
			game_width_zoom = game_width * me.sys.scale.x;
			game_height_zoom = game_height * me.sys.scale.y;
			
			//add a channel for the onresize/onorientationchange event
			window.addEventListener('resize', function (event) {me.event.publish(me.event.WINDOW_ONRESIZE, [event])}, false);
			window.addEventListener('orientationchange', function (event) {me.event.publish(me.event.WINDOW_ONRESIZE, [event])}, false);
			
			// register to the channel
			me.event.subscribe(me.event.WINDOW_ONRESIZE, me.video.onresize.bind(me.video));
			
			// create the main canvas
			canvas = api.createCanvas(game_width_zoom, game_height_zoom);

			// add our canvas
			if (wrapperid) {
				wrapper = document.getElementById(wrapperid);
			}
			// if wrapperid is not defined (null)
			if (!wrapper) {
				// add the canvas to document.body
				wrapper = document.body;
			}
			wrapper.appendChild(canvas);

			// stop here if not supported
			if (!canvas.getContext)
				return false;
				
			// get the 2D context
			context2D = canvas.getContext('2d');

			// create the back buffer if we use double buffering
			if (double_buffering) {
				backBufferCanvas = api.createCanvas(game_width, game_height);
				backBufferContext2D = backBufferCanvas.getContext('2d');
			} else {
				backBufferCanvas = canvas;
				backBufferContext2D = context2D;
			}
			
			// trigger an initial resize();
			if (auto_scale) {
				me.video.onresize(null);
			}
			
			return true;
		};

		/**
		 * return a reference to the wrapper
		 * @name me.video#getWrapper
		 * @function
		 * @return {Document}
		 */
		api.getWrapper = function() {
			return wrapper;
		};

		/**
		 * return the width of the display canvas (before scaling)
		 * @name me.video#getWidth
		 * @function
		 * @return {Int}
		 */
		api.getWidth = function() {
			return backBufferCanvas.width;

		};
		
		/**
		 * return the relative (to the page) position of the specified Canvas
		 * @name me.video#getPos
		 * @function
		 * @param {Canvas} [canvas] system one if none specified
		 * @return {me.Vector2d}
		 */
		api.getPos = function(c) {
			var obj = c || canvas;
			var offset = new me.Vector2d(obj.offsetLeft, obj.offsetTop);
			while ( obj = obj.offsetParent ) {
				offset.x += obj.offsetLeft;
				offset.y += obj.offsetTop;
			} 
			return offset;
		};

		/**
		 * return the height of the display canvas (before scaling)
		 * @name me.video#getHeight
		 * @function
		 * @return {Int}
		 */
		api.getHeight = function() {
			return backBufferCanvas.height;
		};

		/**
		 * Create and return a new Canvas
		 * @name me.video#createCanvas
		 * @function
		 * @param {Int} width width
		 * @param {Int} height height
		 * @return {Canvas}
		 */
		api.createCanvas = function(width, height) {
			var _canvas = document.createElement("canvas");

			_canvas.width = width || backBufferCanvas.width;
			_canvas.height = height || backBufferCanvas.height;

			return _canvas;
		};

		/**
		 * Create and return a new 2D Context
		 * @name me.video#createCanvasSurface
		 * @function
		 * @deprecated
		 * @param {Int} width width
		 * @param {Int} height height
		 * @return {Context2D}
		 */
		api.createCanvasSurface = function(width, height) {
			return api.createCanvas(width, height).getContext('2d');
		};

		/**
		 * return a reference to the screen canvas <br>
		 * use this when checking for display size, event <br>
		 * or if you need to apply any special "effect" to <br>
		 * the corresponding context (ie. imageSmoothingEnabled)
		 * @name me.video#getScreenCanvas
		 * @function
		 * @return {Canvas}
		 */
		api.getScreenCanvas = function() {
			return canvas;
		};
		
		/**
		 * return a reference to the screen canvas corresponding 2d Context
		 * @name me.video#getScreenContext
		 * @function
		 * @return {Context2D}
		 */
		api.getScreenContext = function() {
			return context2D;
		};
		
		/**
		 * return a reference to the system canvas
		 * @name me.video#getSystemCanvas
		 * @function
		 * @return {Canvas}
		 */
		api.getSystemCanvas = function() {
			return backBufferCanvas;
		};
		
		/**
		 * return a reference to the system 2d Context
		 * @name me.video#getSystemContext
		 * @function
		 * @return {Context2D}
		 */
		api.getSystemContext = function() {
			return backBufferContext2D;
		};
		
		/**
		 * callback for window resize event
		 * @private
		 */
		api.onresize = function(event){
			if (auto_scale) {
				// get the parent container max size
				var parent = me.video.getScreenCanvas().parentNode;
				var max_width = parent.width || window.innerWidth;
				var max_height = parent.height || window.innerHeight;
				
				if (deferResizeId) {
					// cancel any previous pending resize
					clearTimeout(deferResizeId);
				}

				if (maintainAspectRatio) {
					// make sure we maintain the original aspect ratio
					var designRatio = me.video.getWidth() / me.video.getHeight();
					var screenRatio = max_width / max_height;
					if (screenRatio < designRatio)
						var scale = max_width / me.video.getWidth();
					else
						var scale = max_height / me.video.getHeight();
		
					// update the "front" canvas size
					deferResizeId = me.video.updateDisplaySize.defer(scale,scale);
				} else {
					// scale the display canvas to fit with the parent container
					deferResizeId = me.video.updateDisplaySize.defer( 
						max_width / me.video.getWidth(),
						max_height / me.video.getHeight()
					);
				}
				return;
			}
			// make sure we have the correct relative canvas position cached
			me.input.mouse.offset = me.video.getPos();
		};
		
		/**
		 * Modify the "displayed" canvas size
		 * @name me.video#updateDisplaySize
		 * @function
		 * @param {Number} scale X scaling value
		 * @param {Number} scale Y scaling value
		 */
		api.updateDisplaySize = function(scaleX, scaleY) {
			// update the global scale variable
			me.sys.scale.set(scaleX,scaleY);
			// apply the new value
			canvas.width = game_width_zoom = backBufferCanvas.width * scaleX;
			canvas.height = game_height_zoom = backBufferCanvas.height * scaleY;
			
			// make sure we have the correct relative canvas position cached
			me.input.mouse.offset = me.video.getPos();

			// force a canvas repaint
			api.blitSurface();
			
			// clear the timeout id
			deferResizeId = -1;
		};
		
		/**
		 * Clear the specified context with the given color
		 * @name me.video#clearSurface
		 * @function
		 * @param {Context2D} context
		 * @param {Color} col
		 */
		api.clearSurface = function(context, col) {
			context.save();
			context.setTransform(1, 0, 0, 1, 0, 0);
			context.fillStyle = col;
			context.fillRect(0, 0, api.getWidth(),api.getHeight());
			context.restore();
		};

		/**
		 * scale & keep canvas centered<p>
		 * usefull for zooming effect
		 * @name me.video#scale
		 * @function
		 * @param {Context2D} context
		 * @param {scale} scale
		 */
		api.scale = function(context, scale) {
			context.translate(
							-(((context.canvas.width * scale) - context.canvas.width) >> 1),
							-(((context.canvas.height * scale) - context.canvas.height) >> 1));
			context.scale(scale, scale);

		};
		
		/**
		 * enable/disable image smoothing <br>
		 * (!) this might not be supported by all browsers <br>
		 * default : enabled
		 * @name me.video#setImageSmoothing
		 * @function
		 * @param {Boolean} enable
		 */
		api.setImageSmoothing = function(enable) {
			// a quick polyfill for the `imageSmoothingEnabled` property
			var vendors = ['ms', 'moz', 'webkit', 'o'];
			for(var x = 0; x < vendors.length; ++x) {
				if (context2D[vendors[x]+'ImageSmoothingEnabled'] !== undefined) {
					context2D[vendors[x]+'ImageSmoothingEnabled'] = enable;
				}
			};
			// generic one (if implemented)
			context2D.imageSmoothingEnabled = enable;
		};
		
		/**
		 * enable/disable Alpha for the specified context
		 * @name me.video#setAlpha
		 * @function
		 * @param {Context2D} context
		 * @param {Boolean} enable
		 */
		api.setAlpha = function(context, enable) {
			context.globalCompositeOperation = enable ? "source-over" : "copy";
		};

		/**
		 * render the main framebuffer on screen
		 * @name me.video#blitSurface
		 * @function
		 */
		api.blitSurface = function() {
			if (double_buffering) {
				/** @private */
				api.blitSurface = function() {
					//FPS.update();
					context2D.drawImage(backBufferCanvas, 0, 0,
							backBufferCanvas.width, backBufferCanvas.height, 0,
							0, game_width_zoom, game_height_zoom);
					
				};
			} else {
				// "empty" function, as we directly render stuff on "context2D"
				/** @private */
				api.blitSurface = function() {
				};
			}
			api.blitSurface();
		};

		/**
		 * apply the specified filter to the main canvas
		 * and return a new canvas object with the modified output<br>
		 * (!) Due to the internal usage of getImageData to manipulate pixels,
		 * this function will throw a Security Exception with FF if used locally
		 * @name me.video#applyRGBFilter
		 * @function
		 * @param {Object} object Canvas or Image Object on which to apply the filter
		 * @param {String} effect "b&w", "brightness", "transparent"
		 * @param {String} option : level [0...1] (for brightness), color to be replaced (for transparent) 
		 * @return {Context2D} context object
		 */
		api.applyRGBFilter = function(object, effect, option) {
			//create a output canvas using the given canvas or image size
			var fcanvas = api.createCanvasSurface(object.width, object.height);
			// get the pixels array of the give parameter
			var imgpix = me.utils.getPixels(object);
			// pointer to the pixels data
			var pix = imgpix.data;

			// apply selected effect
			switch (effect) {
			case "b&w": {
				for ( var i = 0, n = pix.length; i < n; i += 4) {
					var grayscale = (3 * pix[i] + 4 * pix[i + 1] + pix[i + 2]) >>> 3;
					pix[i] = grayscale; // red
					pix[i + 1] = grayscale; // green
					pix[i + 2] = grayscale; // blue
				}
				break;
			}

			case "brightness": {
				// make sure it's between 0.0 and 1.0
				var brightness = Math.abs(option).clamp(0.0, 1.0);
				for ( var i = 0, n = pix.length; i < n; i += 4) {

					pix[i] *= brightness; // red
					pix[i + 1] *= brightness; // green
					pix[i + 2] *= brightness; // blue
				}
				break;
			}

			case "transparent": {
				for ( var i = 0, n = pix.length; i < n; i += 4) {
					if (me.utils.RGBToHex(pix[i], pix[i + 1], pix[i + 2]) === option) {
						pix[i + 3] = 0;
					}
				}
				break;
			}

			default:
				return null;
			}

			// put our modified image back in the new filtered canvas
			fcanvas.putImageData(imgpix, 0, 0);

			// return it
			return fcanvas;
		};

		// return our api
		return api;

	})();

	/*---------------------------------------------------------*/
	// END END END
	/*---------------------------------------------------------*/
})(window);
/*
 * MelonJS Game Engine
 * Copyright (C) 2012, Olivier BIOT
 * http://www.melonjs.org
 *
 */

(function($) {

	/**
	 * There is no constructor function for me.input.
	 * @final
	 * @memberOf me
	 * @constructor Should not be called by the user.
	 */
	me.input = (function() {

		// hold public stuff in our singleton
		var obj = {};

		/*---------------------------------------------
			
			PRIVATE STUFF
				
		  ---------------------------------------------*/

		// list of binded keys
		var KeyBinding = {};

		// corresponding actions
		var keyStatus = {};

		// lock enable flag for keys
		var keyLock = {};
		// actual lock status of each key
		var keyLocked = {};

		// some usefull flags
		var keyboardInitialized = false;
		var mouseInitialized = false;
		var accelInitialized = false;
		
		// list of supported mouse & touch events
		var mouseEventList = ['mousewheel', 'mousemove', 'mousedown',  'mouseup', 'click', 'dblclick'];
		var touchEventList = [ undefined,   'touchmove', 'touchstart', 'touchend', 'tap' , 'dbltap'];
		
		
		/**
		 * enable keyboard event
		 * @private
		 */

		function enableKeyboardEvent() {
			if (!keyboardInitialized) {
				$.addEventListener('keydown', keydown, false);
				$.addEventListener('keyup', keyup, false);
				keyboardInitialized = true;
			}
		}
		
		/**
		 * enable mouse event
		 * @private
		 */
		function enableMouseEvent() {
			if (!mouseInitialized) {
				// initialize mouse pos (0,0)
				obj.touches.push({ x: 0, y: 0 });
				obj.mouse.pos = new me.Vector2d(0,0);
				// get relative canvas position in the page
				obj.mouse.offset = me.video.getPos();
				
				// add event listener for mouse & touch event
				if (me.sys.touch) {
					me.video.getScreenCanvas().addEventListener('touchmove', onMouseMove, false );
					for (var x = 2; x < touchEventList.length;++x) {
						me.video.getScreenCanvas().addEventListener(touchEventList[x], onTouchEvent, false );
					}
				} else {
					me.video.getScreenCanvas().addEventListener('mousemove', onMouseMove, false);
					$.addEventListener('mousewheel', onMouseWheel, false );
					for (var x = 2; x < mouseEventList.length;++x) {
						me.video.getScreenCanvas().addEventListener(mouseEventList[x], onMouseEvent, false );
					}
				}
				mouseInitialized = true;
			}
		}


		/**
		 * prevent event propagation
		 * @private
		 */
		function preventDefault(e) {
			// stop event propagation
			if (e.stopPropagation) {
				e.stopPropagation();
			}
			else {
				e.cancelBubble = true; 
			}
			// stop event default processing
			if (e.preventDefault)  {
				e.preventDefault();
			}
			else  {
				e.returnValue = false;
			}

			return false;
		}

		/**
		 * key down event
		 * @private
		 */
		function keydown(e, keyCode) {

			var action = KeyBinding[keyCode || e.keyCode || e.which];

			if (action) {
				if (!keyLocked[action]) {
					keyStatus[action] = true;
					// lock the key if requested
					keyLocked[action] = keyLock[action];

					// publish a message for keydown event
					me.event.publish(me.event.KEYDOWN, [ action ]);
				}
				// prevent event propagation
				return preventDefault(e);
			}

			return true;
		}


		/**
		 * key up event
		 * @private
		 */
		function keyup(e, keyCode) {

			var action = KeyBinding[keyCode || e.keyCode || e.which];

			if (action) {

				keyStatus[action] = false;
				keyLocked[action] = false;

				// publish message for keyup event
				me.event.publish(me.event.KEYUP, [ action ]);

				// prevent the event propagation
				return preventDefault(e);
			}

			return true;
		}
		
		/**
		 * propagate mouse event to registed object 
		 * @private
		 */
		function dispatchMouseEvent(e) {
			var handled = false;
			var handlers = obj.mouse.handlers[e.type];
			if (handlers) {
				var vpos = me.game.viewport.pos;
				var map_pos = me.game.currentLevel.pos;
				for(var t=0, l=obj.touches.length; t<l; t++) {
					// cache the x/y coordinates
					var x = obj.touches[t].x;
					var y = obj.touches[t].y;
					for (var i = handlers.length, handler; i--, handler = handlers[i];) {
						// adjust to world coordinates if not a floating object
						if (handler.floating===false) {
							var v = {x: x + vpos.x - map_pos.x, y: y + vpos.y - map_pos.y };
						} else {
							var v = {x: x, y: y};
						}
						// call the defined handler
						if ((handler.rect === null) || handler.rect.containsPoint(v)) {
							// trigger the corresponding callback
							if (handler.cb(e) === false) {
								// stop propagating the event if return false 
								handled = true;
								break;
							}
						}
					}
				} 
			}

			return handled;
		}

		
		/**
		 * translate Mouse Coordinates
		 * @private
		 */
		function updateCoordFromEvent(e) {

			// reset the touch array cache
			obj.touches.length=0;
			// non touch event (mouse)
			if (!e.touches) {
				var offset = obj.mouse.offset;
				var x = e.pageX - offset.x;
				var y = e.pageY - offset.y;
				var scale = me.sys.scale;
				if (scale.x != 1.0 || scale.y != 1.0) {
					x/=scale.x;
					y/=scale.y;
				}
				obj.touches.push({ x: x, y: y, id: 0});
			}
			// touch event
			else {
				var offset = obj.mouse.offset;
				for(var i=0, l=e.changedTouches.length; i<l; i++) {
					var t = e.changedTouches[i];
					var x = t.clientX - offset.x;
					var y = t.clientY - offset.y;
					var scale = me.sys.scale;
					if (scale.x != 1.0 || scale.y != 1.0) {
						x/=scale.x; 
						y/=scale.y;
					}
					obj.touches.push({ x: x, y: y, id: t.identifier });
				}
			}
			obj.mouse.pos.set(obj.touches[0].x,obj.touches[0].y);
		}

	
		/**
		 * mouse event management (mousewheel)
		 * @private
		 */
		function onMouseWheel(e) {
			if (e.target == me.video.getScreenCanvas()) {
				// dispatch mouse event to registered object
				if (dispatchMouseEvent(e)) {
					// prevent default action
					return preventDefault(e);
				}
			}

			return true;
		}

		
		/**
		 * mouse event management (mousemove)
		 * @private
		 */
		function onMouseMove(e) {
			// update position
			updateCoordFromEvent(e);
			// dispatch mouse event to registered object
			if (dispatchMouseEvent(e)) {
				// prevent default action
				return preventDefault(e);
			}

			return true;
		}
		
		/**
		 * mouse event management (mousedown, mouseup)
		 * @private
		 */
		function onMouseEvent(e) {
			// dispatch event to registered objects
			if (dispatchMouseEvent(e)) {
				// prevent default action
				return preventDefault(e);
			}

			// in case of touch event button is undefined
			var keycode = obj.mouse.bind[e.button || 0];

			// check if mapped to a key
			if (keycode) {
				if (e.type === 'mousedown' || e.type === 'touchstart')
					return keydown(e, keycode);
				else // 'mouseup' or 'touchend'
					return keyup(e, keycode);
			}

			return true;
		}
		
		/**
		 * mouse event management (touchstart, touchend)
		 * @private
		 */
		function onTouchEvent(e) {
			// update the new touch position
			updateCoordFromEvent(e);
			// reuse the mouse event function
			return onMouseEvent(e);
		}

		/**
		 * event management (Accelerometer)
		 * http://www.mobilexweb.com/samples/ball.html
		 * http://www.mobilexweb.com/blog/safari-ios-accelerometer-websockets-html5
		 * @private		
		 */
		function onDeviceMotion(e) {
			// Accelerometer information  
			obj.accel = e.accelerationIncludingGravity;
		}

		/*---------------------------------------------
			
			PUBLIC STUFF
				
		  ---------------------------------------------*/
		
		/**
		 * Accelerometer information<br>
		 * properties : x, y, z
		 * @public
		 * @enum {number}
		 * @name me.input#accel
		 */
		obj.accel = {
			x: 0, 
			y: 0, 
			z: 0
		};
		
		/**
		 * Mouse information<br>
		 * properties : <br>
		 * pos (me.Vector2d) : pointer position (in screen coordinates) <br>
		 * LEFT : constant for left button <br>
		 * MIDDLE : constant for middle button <br>
		 * RIGHT : constant for right button <br>
		 * @public
		 * @enum {number}
		 * @name me.input#mouse
		 */		
		 obj.mouse = {
			// mouse position
			pos : null,
			// canvas offset
			offset : null,
			// button constants (W3C)
			LEFT:	0,
			MIDDLE: 1,
			RIGHT:	2,
			// bind list for mouse buttons
			bind: [ 0, 0, 0 ],
			handlers:{} 
		};
		
		/**
		 * Array of object containing touch information<br>
		 * properties : <br>
		 * x : x position of the touch event in the canvas (screen coordinates)<br>
		 * y : y position of the touch event in the canvas (screen coordinates)<br>
		 * id : unique finger identifier<br>
		 * @public
		 * @type {Array}
		 * @name me.input#touches
		 */		
		obj.touches = [];
		
		/**
		 * list of mappable keys :
		 * LEFT, UP, RIGHT, DOWN, ENTER, SHIFT, CTRL, ALT, PAUSE, ESC, ESCAPE, [0..9], [A..Z]
		 * @public
		 * @enum {number}
		 * @name me.input#KEY
		 */
		obj.KEY = {
			'LEFT' : 37,
			'UP' : 38,
			'RIGHT' : 39,
			'DOWN' : 40,
			'ENTER' : 13,
			'SHIFT' : 16,
			'CTRL' : 17,
			'ALT' : 18,
			'PAUSE' : 19,
			'ESC' : 27,
			'SPACE' : 32,
			'NUM0' : 48,
			'NUM1' : 49,
			'NUM2' : 50,
			'NUM3' : 51,
			'NUM4' : 52,
			'NUM5' : 53,
			'NUM6' : 54,
			'NUM7' : 55,
			'NUM8' : 56,
			'NUM9' : 57,
			'A' : 65,
			'B' : 66,
			'C' : 67,
			'D' : 68,
			'E' : 69,
			'F' : 70,
			'G' : 71,
			'H' : 72,
			'I' : 73,
			'J' : 74,
			'K' : 75,
			'L' : 76,
			'M' : 77,
			'N' : 78,
			'O' : 79,
			'P' : 80,
			'Q' : 81,
			'R' : 82,
			'S' : 83,
			'T' : 84,
			'U' : 85,
			'V' : 86,
			'W' : 87,
			'X' : 88,
			'Y' : 89,
			'Z' : 90
		};

		/**
		 * return the key press status of the specified action
		 * @name me.input#isKeyPressed
		 * @public
		 * @function
		 * @param {String} action user defined corresponding action
		 * @return {boolean} true if pressed
		 * @example
		 * if (me.input.isKeyPressed('left'))
		 * {
		 *    //do something
		 * }
		 * else if (me.input.isKeyPressed('right'))
		 * {
		 *    //do something else...
		 * }
		 *
		 */

		obj.isKeyPressed = function(action) {
			if (keyStatus[action]) {
				if (keyLock[action]) {
					keyLocked[action] = true;
					// "eat" the event
					keyStatus[action] = false;
				}
				return true;
			}
			return false;
		};

		/**
		 * return the key status of the specified action
		 * @name me.input#keyStatus
		 * @public
		 * @function
		 * @param {String} action user defined corresponding action
		 * @return {boolean} down (true) or up(false)
		 */

		obj.keyStatus = function(action) {
			return (keyLocked[action] === true) ? true : keyStatus[action];
		};

		
		/**
		 * trigger the specified key (simulated) event <br>
		 * @name me.input#triggerKeyEvent
		 * @public
		 * @function
		 * @param {me.input#KEY} keycode
		 * @param {boolean} true to trigger a key press, or false for key release
		 * @example
		 * // trigger a key press
		 * me.input.triggerKeyEvent(me.input.KEY.LEFT, true);
		 */

		obj.triggerKeyEvent = function(keycode, status) {
			if (status) {
				keydown({}, keycode);
			}
			else {
				keyup({}, keycode);
			}
		};

		
		/**
		 * associate a user defined action to a keycode
		 * @name me.input#bindKey
		 * @public
		 * @function
		 * @param {me.input#KEY} keycode
		 * @param {String} action user defined corresponding action
		 * @param {boolean} lock cancel the keypress event once read
		 * @example
		 * // enable the keyboard
		 * me.input.bindKey(me.input.KEY.LEFT,  "left");
		 * me.input.bindKey(me.input.KEY.RIGHT, "right");
		 * me.input.bindKey(me.input.KEY.X,     "jump", true);
		 */
		obj.bindKey = function(keycode, action, lock) {
			// make sure the keyboard is enable
			enableKeyboardEvent();

			KeyBinding[keycode] = action;

			keyStatus[action] = false;
			keyLock[action] = lock ? lock : false;
			keyLocked[action] = false;
		};
		
		/**
		 * unbind the defined keycode
		 * @name me.input#unbindKey
		 * @public
		 * @function
		 * @param {me.input#KEY} keycode
		 * @example
		 * me.input.unbindKey(me.input.KEY.LEFT);
		 */
		obj.unbindKey = function(keycode) {
			// clear the event status
			keyStatus[KeyBinding[keycode]] = false;
			keyLock[KeyBinding[keycode]] = false;
			// remove the key binding
			KeyBinding[keycode] = null;
		};

		/**
		 * Associate a mouse (button) action to a keycode
		 * Left button – 0
		 * Middle button – 1
		 * Right button – 2
		 * @name me.input#bindMouse
		 * @public
		 * @function
		 * @param {Integer} button (accordingly to W3C values : 0,1,2 for left, middle and right buttons)
		 * @param {me.input#KEY} keyCode
		 * @example
		 * // enable the keyboard
		 * me.input.bindKey(me.input.KEY.X, "shoot");
		 * // map the left button click on the X key
		 * me.input.bindMouse(me.input.mouse.LEFT, me.input.KEY.X);
		 */
		obj.bindMouse = function (button, keyCode)
		{
			// make sure the mouse is initialized
			enableMouseEvent();
			
			// throw an exception if no action is defined for the specified keycode
			if (!KeyBinding[keyCode])
			  throw "melonJS : no action defined for keycode " + keyCode;
			// map the mouse button to the keycode
			obj.mouse.bind[button] = keyCode;
		};
		/**
		 * unbind the defined keycode
		 * @name me.input#unbindMouse
		 * @public
		 * @function
		 * @param {Integer} button (accordingly to W3C values : 0,1,2 for left, middle and right buttons)
		 * @example
		 * me.input.unbindMouse(me.input.mouse.LEFT);
		 */
		obj.unbindMouse = function(button) {
			// clear the event status
			obj.mouse.bind[button] = null;
		};
		
		/**
		 * Associate a touch action to a keycode
		 * @name me.input#bindTouch
		 * @public
		 * @function
		 * @param {me.input#KEY} keyCode
		 * @example
		 * // enable the keyboard
		 * me.input.bindKey(me.input.KEY.X, "shoot");
		 * // map the touch event on the X key
		 * me.input.bindTouch(me.input.KEY.X);
		 */
		obj.bindTouch = function (keyCode)
		{	
			// reuse the mouse emulation stuff
			// where left mouse button is map to touch event
			obj.bindMouse(me.input.mouse.LEFT, keyCode);
		};
		
		/**
		 * unbind the defined touch binding
		 * @name me.input#unbindTouch
		 * @public
		 * @function
		 * @example
		 * me.input.unbindTouch();
		 */
		obj.unbindTouch = function() {
			// clear the key binding
			obj.unbindMouse(me.input.mouse.LEFT);
		};


			
		/**
		 * register on a mouse event for a given region
		 * note : on a touch enabled device mouse event will automatically be converted to touch event
		 * @name me.input#registerMouseEvent
		 * @public
		 * @function
		 * @param {String} eventType ('mousemove','mousedown','mouseup','mousewheel','touchstart','touchmove','touchend')
		 * @param {me.Rect} rect (object must inherits from me.Rect)
		 * @param {Function} callback
		 * @param {Boolean} [floating="floating property of the given object"] specify if the object is a floating object (if yes, screen coordinates are used, if not mouse/touch coordinates will be converted to world coordinates)
		 * @example
		 * // register on the 'mousemove' event
		 * me.input.registerMouseEvent('mousemove', this.collisionBox, this.mouseMove.bind(this));
		 */
		obj.registerMouseEvent = function(eventType, rect, callback, floating) {
			// make sure the mouse is initialized
			enableMouseEvent();
			
			// convert the mouse event into a touch event 
			// if we are on a touch device
			if ( me.sys.touch && (mouseEventList.indexOf(eventType) !== -1)) {
				eventType = touchEventList[mouseEventList.indexOf(eventType)];
			}
			
			// check if this is supported event
			if (eventType && ((mouseEventList.indexOf(eventType) !== -1) || 
				(touchEventList.indexOf(eventType) !== -1))) {
				
				// register the event
				if (!obj.mouse.handlers[eventType]) {
					obj.mouse.handlers[eventType] = [];
 				}
				// check if this is a floating object or not
				var _float = rect.floating===true?true:false;
				// check if there is a given parameter
				if (floating) {
					// ovveride the previous value
					_float = floating===true?true:false;
				}
				// initialize the handler
				obj.mouse.handlers[eventType].push({rect:rect||null,cb:callback,floating:_float});
				return;
			}
			throw "melonJS : invalid event type : " + eventType;
		};
		
		/**
		 * release the previously registered mouse event callback
		 * note : on a touch enabled device mouse event will automatically be converted to touch event
		 * @name me.input#releaseMouseEvent
		 * @public
		 * @function
		 * @param {String} eventType ('mousemove', 'mousedown', 'mouseup', 'mousewheel', 'click', 'dblclick', 'touchstart', 'touchmove', 'touchend', 'tap', 'dbltap')
		 * @param {me.Rect} region
		 * @example
		 * // release the registered callback on the 'mousemove' event
		 * me.input.releaseMouseEvent('mousemove', this.collisionBox);
		 */
		obj.releaseMouseEvent = function(eventType, rect) {
			// convert the mouse event into a touch event 
			// if we are on a touch device
			if ( me.sys.touch && (mouseEventList.indexOf(eventType) !== -1)) {
				eventType = touchEventList[mouseEventList.indexOf(eventType)];
			}			
			// check if this is supported event
			if (eventType && ((mouseEventList.indexOf(eventType) !== -1) || 
				(touchEventList.indexOf(eventType) !== -1))) {
				
				// unregister the event
				if (!obj.mouse.handlers[eventType]) {
					obj.mouse.handlers[eventType] = [];
 				}
				var handlers = obj.mouse.handlers[eventType];
				if (handlers) {
					for (var i = handlers.length, handler; i--, handler = handlers[i];) {
						if (handler.rect === rect) {
							// make sure all references are null
							handler.rect = handler.cb = handler.floating = null;
							obj.mouse.handlers[eventType].splice(i, 1);
						}
					}
				}
				return;
			}
			throw "melonJS : invalid event type : " + eventType;
		};

		/**
		 * watch Accelerator event 
		 * @name me.input#watchAccelerometer
		 * @public
		 * @function
		 * @return {boolean} false if not supported by the device
		 */
		obj.watchAccelerometer = function() {
			if ($.sys.gyro) {
				if (!accelInitialized) {
					// add a listener for the mouse
					$.addEventListener('devicemotion', onDeviceMotion, false);
					accelInitialized = true;
				}
				return true;
			}
			return false;
		};
		
		/**
		 * unwatch Accelerometor event 
		 * @name me.input#unwatchAccelerometer
		 * @public
		 * @function
		 */
		obj.unwatchAccelerometer = function() {
			if (accelInitialized) {
				// add a listener for the mouse
				$.removeEventListener('devicemotion', onDeviceMotion, false);
				accelInitialized = false;
			}
		};

		// return our object
		return obj;

	})();

	/*---------------------------------------------------------*/
	// END END END
	/*---------------------------------------------------------*/
})(window);
/*
 * MelonJS Game Engine
 * Copyright (C) 2012, Olivier BIOT
 * http://www.melonjs.org
 *
 */
 
(function($) {

	/**
	 *  Base64 decoding
	 *  @see <a href="http://www.webtoolkit.info/">http://www.webtoolkit.info/</A>
	 */
	var Base64 = (function() {

		// hold public stuff in our singleton
		var singleton = {};

		// private property
		var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

		// public method for decoding
		singleton.decode = function(input) {
			
			// make sure our input string has the right format
			input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
			
			if (me.sys.nativeBase64) {
				// use native decoder
				return $.atob(input);
			}
			else {
				// use cross-browser decoding
				var output = [], chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0;

				while (i < input.length) {
					enc1 = _keyStr.indexOf(input.charAt(i++));
					enc2 = _keyStr.indexOf(input.charAt(i++));
					enc3 = _keyStr.indexOf(input.charAt(i++));
					enc4 = _keyStr.indexOf(input.charAt(i++));

					chr1 = (enc1 << 2) | (enc2 >> 4);
					chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
					chr3 = ((enc3 & 3) << 6) | enc4;

					output.push(String.fromCharCode(chr1));

					if (enc3 != 64) {
						output.push(String.fromCharCode(chr2));
					}
					if (enc4 != 64) {
						output.push(String.fromCharCode(chr3));
					}
				}

				output = output.join('');
				return output;
			}
		};

		return singleton;

	})();

	/**
	 * a collection of utility Function
	 * @final
	 * @memberOf me
	 * @private
	 * @constructor Should not be called by the user.
	 */

	me.utils = (function() {
		// hold public stuff in our singletong
		var api = {};
		
		
		/*---------------------------------------------
			
		   PRIVATE STUFF
				
		 ---------------------------------------------*/

		// cache rgb converted value
		var rgbCache = {};
		
		// guid default value
		var GUID_base  = "";
		var GUID_index = 0;
		
		// regexp to deal with file name & path
		var removepath = /^.*(\\|\/|\:)/;
		var removeext = /\.[^\.]*$/;

		/*---------------------------------------------
			
			PUBLIC STUFF
				
			---------------------------------------------*/

		/**
		 * Decode a base64 encoded string into a binary string
		 *
		 * @param {String} input Base64 encoded data
		 * @return {String} Binary string
		 */
		api.decodeBase64 = function(input) {
			return Base64.decode(input);
		};

		/**
		 * Decode a base64 encoded string into a byte array
		 *
		 * @param {String} input Base64 encoded data
		 * @param {Int} [bytes] number of bytes per array entry
		 * @return {Int[]} Array of bytes
		 */
		api.decodeBase64AsArray = function(input, bytes) {
			bytes = bytes || 1;

			var dec = Base64.decode(input), ar = [], i, j, len;

			for (i = 0, len = dec.length / bytes; i < len; i++) {
				ar[i] = 0;
				for (j = bytes - 1; j >= 0; --j) {
					ar[i] += dec.charCodeAt((i * bytes) + j) << (j << 3);
				}
			}
			return ar;
		};

		/**
		 * Decode a CSV encoded array into a binary array
		 *
		 * @param  {String} input CSV formatted data
		 * @param  {Int} limit row split limit
		 * @return {Int[]} Int Array
		 */
		api.decodeCSV = function(input, limit) {
			input = input.trim().split("\n");

			var result = [];
			for ( var i = 0; i < input.length; i++) {
				entries = input[i].split(",", limit);
				for ( var e = 0; e < entries.length; e++) {
					result.push(+entries[e]);
				}
			}
			return result;
		};
		
		/**
		 * return the base name of the file without path info.<br>
		 *
		 * @param  {String} path path containing the filename
		 * @return {String} basename returns the base name without path information.
		 */
		api.getBasename = function(path) {
			return path.replace(removepath, '').replace(removeext, '');
		};

		/**
		 * return the extension of the file in the given path <br>
		 *
		 * @param  {String} path path containing the filename
		 * @return {String} filename extension.
		 */
		api.getFileExtension = function(path) {
			return path.substring(path.lastIndexOf(".") + 1, path.length);
		};
		
		/* ---
		 
			enable the nocache mechanism
		  
		  ---*/
		api.setNocache = function(enable) {
			me.nocache = enable ? "?" + parseInt(Math.random() * 10000000) : '';
		};

		// a Hex to RGB color function
		api.HexToRGB = function(h, a) {
			if (h.charAt(0) !== "#") {
				// this is not a hexadecimal string
				return h;
			}
			// remove the # 
			h = h.substring(1, h.length);

			// check if we already have the converted value cached
			if (rgbCache[h] == null) {
				// else add it (format : "r,g,b")
				if (h.length < 6)  {
					// 3 char shortcut is used, double each char
					var h1 = h.charAt(0)+h.charAt(0);
					var h2 = h.charAt(1)+h.charAt(1);
					var h3 = h.charAt(2)+h.charAt(2);
				}
				else {
					var h1 = h.substring(0, 2);
					var h2 = h.substring(2, 4);
					var h3 = h.substring(4, 6);
				}
				// set the value in our cache
				rgbCache[h] = parseInt(h1, 16) + "," + parseInt(h2, 16) + "," + parseInt(h3, 16);
			}
			return (a ? "rgba(" : "rgb(") + rgbCache[h] + (a ? "," + a + ")" : ")");
		};

		// a Hex to RGB color function
		api.RGBToHex = function(r, g, b) {
			return r.toHex() + g.toHex() + b.toHex();
		};
		
		// return the given canvas or image pixels
		api.getPixels = function(arg) {
			if (arg instanceof HTMLImageElement) {
				var c = me.video.createCanvasSurface(arg.width, arg.height);
				c.drawImage(arg, 0, 0);
				return c.getImageData(0, 0, arg.width, arg.height);
			} else { 
				// canvas !
				return arg.getContext('2d').getImageData(0, 0, arg.width, arg.height);
			}
		};
   
		// reset the GUID Base Name
		// the idea here being to have a unique ID
		// per level / object
		api.resetGUID = function(base) {
			// also ensure it's only 8bit ASCII characters
			GUID_base  = base.toString().toUpperCase().toHex();
			GUID_index = 0;
		};
      
		// create and return a very simple GUID
		// Game Unique ID
		api.createGUID = function() {
			return GUID_base + "-" + (GUID_index++);
		};
		
		// apply friction to a force
		api.applyFriction = function(v, f) {
			return (v+f<0)?v+(f*me.timer.tick):(v-f>0)?v-(f*me.timer.tick):0;
		};

		// return our object
		return api;

	})();

	/*---------------------------------------------------------*/
	// END END END
	/*---------------------------------------------------------*/
})(window);
/*
 * MelonJS Game Engine
 * Copyright (C) 2012, Olivier BIOT
 * http://www.melonjs.org
 *
 */

(function($) {

	/************************************************************************************/
	/*      Game stat FUNCTIONS :                                                       */
	/*      a basic object to store and retreive values                                 */
	/*                                                                                  */
	/************************************************************************************/

	/**
	 * Item skeleton for game stat element
	 * @private
	 */
	function Stat_Item(val) {
		this.defaultvalue = val || 0;
		this.value = val || 0;
		this.updated = true;
	};

	/**
	 * reset to default value
	 * @private
	 */
	Stat_Item.prototype.reset = function() {
		this.set(this.defaultvalue);
	};

	/**
	 * update the value of an item
	 * @private
	 */
	Stat_Item.prototype.update = function(val) {
		return this.set(this.value + val);
	};
	
	/** 
      * Sets the value of an item 
	 * @private
	 */
    Stat_Item.prototype.set = function(value) { 
		this.value = value; 
		this.updated = true; 
		return this.updated; 
	}; 

	/*---------------------------------------------------------*/

	/**
	 * manage game statistics<p>
	 * me.gamestat can be used to store useful values during the game<p>
	 * there is no constructor for me.gamestat
	 * @final
	 * @memberOf me
	 * @constructor Should not be called by the user.
	 */
	me.gamestat = (function() {

		// hold public stuff in our singletong
		var singleton = {};

		/*---------------------------------------------
			
			PRIVATE STUFF
				
		  ---------------------------------------------*/
		// hold all the items							
		var items = {};
		var obj = [];
		var objCount = 0;

		/*---------------------------------------------
			
			PUBLIC STUFF
				
		  ---------------------------------------------*/

		/**
		 * add an item to the me.gamestat Object
		 * @name me.gamestat#add
		 * @public
		 * @function
		 * @param {String||Object} name name of the item or hash of items
		 * @param {int} [val="0"] default value
		 * @example
		 * // add a "stars" item
		 * me.gamestat.add("stars", 0);
		 */
		singleton.add = function(name, val) {
                  var addStat = function(k, v) {
                    items[k] = new Stat_Item(v);
                    obj.push(items[k]);
                    objCount++;
                  };
                  if (name.constructor === Object) {
                    for (var key in name) {
                      addStat(key, name[key]);
                    }
                  }
                  else { addStat(name, val); }
		};

		/**
		 * update an item
		 * @name me.gamestat#updateValue
		 * @public
		 * @function
		 * @param {String||Object} name name of the item or hash of items
		 * @param {int} val value to be added
		 * @example
		 * // update the "stars" item
		 * me.gamestat.updateValue("stars", 1);
		 */
		singleton.updateValue = function(name, value) {
                  var updateStat = function(k, v) {
                    items[k].update(v);
                  };
                  if (name.constructor === Object) {
                    for (var key in name) {
                      if (items[key]) { updateStat(key, name[key]); }
                    }
                  }
                  else if (items[name]) { updateStat(name, value); }
		};
		
		/** 
		 * set value of an item 
		 * @name me.gamestat#setValue 
		 * @public 
		 * @function 
		 * @param {String||Object} name name of the item or hash of items
		 * @param {int} val value to be set 
		 * @example 
		 * // set the"stars" item 
		 * me.gamestat.setValue("stars", 1); 
		 */ 
		singleton.setValue = function(name, value) { 
                  var setStat = function(k, v) {
                    items[k].set(v);
                  };
                  if (name.constructor === Object) {
                    for (var key in name) {
                      if (items[key]) { setStat(key, name[key]); }
                    }
                  }
                  else if (items[name]) { setStat(name, value); }
		};

		
		/**
		 * return an item value
		 * @name me.gamestat#getItemValue
		 * @public
		 * @function
		 * @param {String} name name of the item
		 * @return {int}
		 * @example
		 * // get the "stars" value
		 * totalStars = me.gamestat.getItemValue("stars");
		 */
		singleton.getItemValue = function(name) {
			return (items[name]) ? items[name].value : 0;
		};

		/**
		 * reset the specified item to default value
		 * @name me.gamestat#reset
		 * @public
		 * @function
		 * @param {String} [name="all"] name of the item
		 */
		singleton.reset = function(name) {
			if (name != undefined) {
				// only reset the specified one
				if (items[name])
					items[name].reset();
			} else {
				// reset everything
				singleton.resetAll();
			}
		};

		/**
		 * reset all items to default value
		 * @name me.gamestat#resetAll
		 * @private
		 * @function
		 */
		singleton.resetAll = function() {
			for ( var i = objCount, objt; i--, objt = obj[i];) {
				objt.reset();
			}
		};

		// return our object
		return singleton;

	})();

	/*---------------------------------------------------------*/
	// END END END
	/*---------------------------------------------------------*/
})(window);
/*
 * MelonJS Game Engine
 * Copyright (C) 2012, Olivier BIOT
 * http://www.melonjs.org
 *
 * Tile QT 0.7.x format
 * http://www.mapeditor.org/	
 *
 */

(function($) {
	
	// some custom level constants
	me.LevelConstants = {
		//# name of the collision map
		COLLISION_MAP : "collision",
		PARALLAX_MAP : "parallax"
	};
	
	// some TMX constants
	me.TMX_TAG_MAP                 = "map";
	me.TMX_TAG_NAME                = "name";
	me.TMX_TAG_VALUE               = "value";	
	me.TMX_TAG_VERSION             = "version";
	me.TMX_TAG_ORIENTATION	       = "orientation";
	me.TMX_TAG_WIDTH               = "width";
	me.TMX_TAG_HEIGHT              = "height";
	me.TMX_TAG_OPACITY             = "opacity";
	me.TMX_TAG_TRANS               = "trans";
	me.TMX_TAG_TILEWIDTH           = "tilewidth";
	me.TMX_TAG_TILEHEIGHT          = "tileheight";
	me.TMX_TAG_TILEOFFSET          = "tileoffset";
	me.TMX_TAG_FIRSTGID            = "firstgid";
	me.TMX_TAG_GID                 = "gid";
	me.TMX_TAG_TILE                = "tile";
	me.TMX_TAG_ID                  = "id";
	me.TMX_TAG_DATA                = "data";
	me.TMX_TAG_COMPRESSION         = "compression";
	me.TMX_TAG_ENCODING            = "encoding";
	me.TMX_TAG_ATTR_BASE64         = "base64";
	me.TMX_TAG_CSV                 = "csv";
	me.TMX_TAG_SPACING             = "spacing";
	me.TMX_TAG_MARGIN              = "margin";
	me.TMX_TAG_PROPERTIES          = "properties";
	me.TMX_TAG_PROPERTY            = "property";
	me.TMX_TAG_IMAGE               = "image";
	me.TMX_TAG_SOURCE              = "source";
	me.TMX_TAG_VISIBLE             = "visible";
	me.TMX_TAG_TILESET             = "tileset";
	me.TMX_TAG_LAYER               = "layer";
	me.TMX_TAG_IMAGE_LAYER         = "imagelayer";
	me.TMX_TAG_OBJECTGROUP         = "objectgroup";
	me.TMX_TAG_OBJECT              = "object";
	me.TMX_TAG_X                   = "x";
	me.TMX_TAG_Y                   = "y";
	me.TMX_TAG_WIDTH               = "width";
	me.TMX_TAG_HEIGHT              = "height";
	me.TMX_TAG_POLYGON             = "polygon";
	me.TMX_TAG_POLYLINE            = "polyline";
	me.TMX_TAG_POINTS              = "points";
	me.TMX_BACKGROUND_COLOR        = "backgroundcolor";
	/*---------------------------------------------------------*/
	// END END END
	/*---------------------------------------------------------*/
})(window);
/*
 * MelonJS Game Engine
 * Copyright (C) 2012, Olivier BIOT
 * http://www.melonjs.org
 *
 * Tile QT 0.7.x format
 * http://www.mapeditor.org/	
 *
 */

(function($) {

	
	/**
	 * a collection of TMX utility Function
	 * @final
	 * @memberOf me
	 * @private
	 */

	me.TMXUtils = (function() {
		// hold public stuff in our singleton
		var api = {};

		/**
		 * Apply TMX Properties to the give object
		 * @private
		 */
		api.setTMXProperties = function(obj, xmldata) {
			var properties = xmldata.getElementsByTagName(me.TMX_TAG_PROPERTIES)[0];

			if (properties) {
				var oProp = properties.getElementsByTagName(me.TMX_TAG_PROPERTY);

				for ( var i = 0; i < oProp.length; i++) {
					var propname = me.TMXParser.getStringAttribute(oProp[i], me.TMX_TAG_NAME);
					var value = me.TMXParser.getStringAttribute(oProp[i], me.TMX_TAG_VALUE);
					
					// if value not defined or boolean
					if (!value || value.isBoolean()) {
						value = value ? (value == "true") : true;
					}
					// check if numeric
					else if (value.isNumeric()) {
						value = Number(value);
					}
					// add the new prop to the object prop list
					obj[propname] = value;
							
				}
			}

		};
		
		/**
		 * basic function to merge object properties
		 * @private
		 */
		api.mergeProperties = function(dest, src, overwrite) {
			for(var p in src){
				if(overwrite || dest[p]===undefined) dest[p]= src[p];
			}
			return dest;
		};

		
		// return our object
		return api;

	})();

	/*---------------------------------------------------------*/
	// END END END
	/*---------------------------------------------------------*/
})(window);
/*
 * MelonJS Game Engine
 * Copyright (C) 2012, Olivier BIOT
 * http://www.melonjs.org
 *
 * Tile QT 0.7.x format
 * http://www.mapeditor.org/	
 *
 */

(function($) {
	
	/**
	 * TMX Group Object
	 * @class
	 * @extends Object
	 * @memberOf me
	 * @constructor
	 * @private
	 */
	me.TMXOBjectGroup = Object.extend(
	{
		// constructor
		init : function(name, tmxObjGroup, tilesets, z) {
			this.objects = [];

			this.name   = name;
			this.width  = me.TMXParser.getIntAttribute(tmxObjGroup, me.TMX_TAG_WIDTH);
			this.height = me.TMXParser.getIntAttribute(tmxObjGroup, me.TMX_TAG_HEIGHT);
			this.visible = (me.TMXParser.getIntAttribute(tmxObjGroup, me.TMX_TAG_VISIBLE, 1) == 1);
			this.z       = z;

						
			// check if we have any user-defined properties 
			if (tmxObjGroup.firstChild && (tmxObjGroup.firstChild.nextSibling.nodeName === me.TMX_TAG_PROPERTIES))  {
				me.TMXUtils.setTMXProperties(this, tmxObjGroup);
			}
			
			var data = tmxObjGroup.getElementsByTagName(me.TMX_TAG_OBJECT);

			for ( var i = 0; i < data.length; i++) {
				this.objects.push(new me.TMXOBject(data[i], tilesets, z));
			}
		},
		
		/**
		 * reset function
		 * @private
		 * @function
		 */
		reset : function() {
			// clear all allocated objects
			this.objects = null;
		},
		
		getObjectCount : function() {
			return this.objects.length;
		},

		getObjectByIndex : function(idx) {
			return this.objects[idx];
		}
	});

	/**
	 * a TMX Object
	 * @class
	 * @extends Object
	 * @memberOf me
	 * @constructor
	 * @private
	 */

	me.TMXOBject = Object.extend(
	{
		init :  function(tmxObj, tilesets, z) {
			this.name = me.TMXParser.getStringAttribute(tmxObj, me.TMX_TAG_NAME);
			this.x = me.TMXParser.getIntAttribute(tmxObj, me.TMX_TAG_X);
			this.y = me.TMXParser.getIntAttribute(tmxObj, me.TMX_TAG_Y);
			this.z = z;

			this.width = me.TMXParser.getIntAttribute(tmxObj, me.TMX_TAG_WIDTH, 0);
			this.height = me.TMXParser.getIntAttribute(tmxObj, me.TMX_TAG_HEIGHT, 0);
			this.gid = me.TMXParser.getIntAttribute(tmxObj, me.TMX_TAG_GID, null);
			// check if the object has an associated gid	
			if (this.gid) {
				
				// get the corresponding tileset
				var tileset = tilesets.getTilesetByGid(this.gid);
			 
				// set width and height equal to tile size
				this.width = tileset.tilewidth;
				this.height = tileset.tileheight;

				// force spritewidth size
				this.spritewidth = this.width;
				// adjust y coordinates (bug in tile 0.6.2?)
				this.y -= this.height;

				// the object corresponding tile 
				var tmxTile = new me.Tile(this.x, this.y, tileset.tilewidth, tileset.tileheight, this.gid);

				// get the corresponding tile into our object
				this.image = tileset.getTileImage(tmxTile);
			} 
			else {
				var polygon = tmxObj.getElementsByTagName(me.TMX_TAG_POLYGON);
				this.isPolygon = true;
				if (!polygon.length) {
					polygon = tmxObj.getElementsByTagName(me.TMX_TAG_POLYLINE);
					this.isPolygon = false;
				}

				if (polygon.length) {
					this.points = [];
					var points = me.TMXParser.getStringAttribute(polygon[0], me.TMX_TAG_POINTS);
					var point = points.split(" ");
					for (var i = 0, v; i < point.length; i++) {
						v = point[i].split(",");
						this.points[i] = new me.Vector2d(+v[0], +v[1]);
					}
				}
			}
			// set the object properties
			me.TMXUtils.setTMXProperties(this, tmxObj);
		},
		
		getObjectPropertyByName : function(name) {
			return this[name];
		}

	});

/*---------------------------------------------------------*/
// END END END
/*---------------------------------------------------------*/
})(window);
/*
 * MelonJS Game Engine
 * Copyright (C) 2012, Olivier BIOT
 * http://www.melonjs.org
 *
 * Tile QT 0.7.x format
 * http://www.mapeditor.org/	
 *
 */

(function($) {
	
	
	/**************************************************/
	/*                                                */
	/*      Tileset Management                        */
	/*                                                */
	/**************************************************/
	
	// bitmask constants to check for flipped & rotated tiles
	var FlippedHorizontallyFlag    = 0x80000000;
	var FlippedVerticallyFlag      = 0x40000000;
	var FlippedAntiDiagonallyFlag  = 0x20000000;

	
	/**
	 * a basic tile object
	 * @class
	 * @extends me.Rect
	 * @memberOf me
	 * @constructor
	 * @param {int} x x index of the Tile in the map
	 * @param {int} y y index of the Tile in the map
	 * @param {int} w Tile width
	 * @param {int} h Tile height
	 * @param {int} tileId tileId
	 */
	me.Tile = me.Rect.extend({
		/**
		 * tileId
		 * @public
		 * @type int
		 * @name me.Tile#tileId
		 */
		tileId : null,
		
		/** @private */
		init : function(x, y, w, h, gid) {
			this.parent(new me.Vector2d(x * w, y * h), w, h);
			
			// Tile col / row pos
			this.col = x;
			this.row = y;
			
			this.tileId = gid;
			
			/**
			 * True if the tile is flipped horizontally<br>
			 * @public
			 * @type Boolean
			 * @name me.Tile#flipX
			 */
			this.flipX  = (this.tileId & FlippedHorizontallyFlag) !== 0;
			
			/**
			 * True if the tile is flipped vertically<br>
			 * @public
			 * @type Boolean
			 * @name me.Tile#flipY
			 */
			this.flipY  = (this.tileId & FlippedVerticallyFlag) !== 0;
			
			/**
			 * True if the tile is flipped anti-diagonally<br>
			 * @public
			 * @type Boolean
			 * @name me.Tile#flipAD
			 */
			this.flipAD = (this.tileId & FlippedAntiDiagonallyFlag) !== 0;
			
			/**
			 * Global flag that indicates if the tile is flipped<br>
			 * @public
			 * @type Boolean
			 * @name me.Tile#flipped
			 */
			this.flipped = this.flipX || this.flipY || this.flipAD;
			
			// clear out the flags and set the tileId
			this.tileId &= ~(FlippedHorizontallyFlag | FlippedVerticallyFlag | FlippedAntiDiagonallyFlag);

		}
	});

	/**
	 * a Tile Set Object
	 * @class
	 * @memberOf me
	 * @constructor
	 */
	me.Tileset = Object.extend({
		// constructor
		init: function (name, tilewidth, tileheight, spacing, margin, imagesrc) {
			this.name = name;
			this.tilewidth = tilewidth;
			this.tileheight = tileheight;
			this.spacing = spacing;
			this.margin = margin;
			this.image = (imagesrc) ? me.loader.getImage(me.utils.getBasename(imagesrc)) : null;
			
			if (!this.image) {
				console.log("melonJS: '" + imagesrc + "' file for tileset '" + this.name + "' not found!");
			}
			
			
			// tile types
			this.type = {
				SOLID : "solid",
				PLATFORM : "platform",
				L_SLOPE : "lslope",
				R_SLOPE : "rslope",
				LADDER : "ladder",
				BREAKABLE : "breakable"
			};

			// tile properties
			// (collidable, etc..)
			this.TileProperties = [];
			
			// a cache for offset value
			this.tileXOffset = [];
			this.tileYOffset = [];

			// number of tiles per horizontal line 
			if (this.image) {
				this.hTileCount = ~~((this.image.width - this.margin) / (this.tilewidth + this.spacing));
				this.vTileCount = ~~((this.image.height - this.margin) / (this.tileheight + this.spacing));
			}
		},
		
		// return the list of property for a tile
		getPropertyList: function() {
			return {
				// collectable tiles
				//isCollectable	: false,
				// collidable tiles
				isCollidable : false,
				isSolid : false,
				isPlatform : false,
				isSlope : false,
				isLeftSlope : false,
				isRightSlope : false,
				isLadder : false,
				isBreakable : false
			};
		},
		
		// e.g. getTileProperty (gid)	
		/**
		 * return the properties of the specified tile <br>
		 * the function will return an object with the following boolean value :<br>
		 * - isCollidable<br>
		 * - isSolid<br>
		 * - isPlatform<br>
		 * - isSlope <br>
		 * - isLeftSlope<br>
		 * - isRightSlope<br>
		 * - isLadder<br>
		 * - isBreakable<br>
		 * @name me.Tileset#getTileProperties
		 * @public
		 * @function
		 * @param {Integer} tileId 
		 * @return {Object}
		 */
		getTileProperties: function(tileId) {
			return this.TileProperties[tileId];
		},
		
		//return collidable status of the specifiled tile

		isTileCollidable : function(tileId) {
			return this.TileProperties[tileId].isCollidable;
		},

		/*
		//return collectable status of the specifiled tile
		isTileCollectable : function (tileId) {
			return this.TileProperties[tileId].isCollectable;
		},
		 */
		
		// return the x offset of the specified tile in the tileset image
		getTileOffsetX : function(tileId) {
			if (this.tileXOffset[tileId] == null) {
				this.tileXOffset[tileId] = this.margin + (this.spacing + this.tilewidth)  * (tileId % this.hTileCount);
			}
			return this.tileXOffset[tileId];
		},
		
		// return the y offset of the specified tile in the tileset image
		getTileOffsetY : function(tileId) {
			if (this.tileYOffset[tileId] == null) {
				this.tileYOffset[tileId] = this.margin + (this.spacing + this.tileheight)	* ~~(tileId / this.hTileCount);
			}
			return this.tileYOffset[tileId];
		}

	});
	

	
    /**
	 * a TMX Tile Set Object
	 * @class
	 * @extends me.Tileset
	 * @memberOf me
	 * @constructor
	 */
	me.TMXTileset = me.Tileset.extend({
		
		// constructor
		init: function (xmltileset) {

			// first gid
			this.firstgid = me.TMXParser.getIntAttribute(xmltileset, me.TMX_TAG_FIRSTGID);

			var src = me.TMXParser.getStringAttribute(xmltileset, me.TMX_TAG_SOURCE);
			if (src) {
				// load TSX
				src = me.utils.getBasename(src);
				xmltileset = me.loader.getTMX(src);

				if (!xmltileset) {
					throw "melonJS:" + src + " TSX tileset not found";
				}

				// FIXME: This is ok for now, but it wipes out the
				// XML currently loaded into the global `me.TMXParser`
				me.TMXParser.parseFromString(xmltileset);
				xmltileset = me.TMXParser.getFirstElementByTagName("tileset");
			}

			this.parent(me.TMXParser.getStringAttribute(xmltileset, me.TMX_TAG_NAME),
						me.TMXParser.getIntAttribute(xmltileset, me.TMX_TAG_TILEWIDTH),
						me.TMXParser.getIntAttribute(xmltileset, me.TMX_TAG_TILEHEIGHT),
						me.TMXParser.getIntAttribute(xmltileset, me.TMX_TAG_SPACING, 0), 
						me.TMXParser.getIntAttribute(xmltileset, me.TMX_TAG_MARGIN, 0), 
						xmltileset.getElementsByTagName(me.TMX_TAG_IMAGE)[0].getAttribute(me.TMX_TAG_SOURCE));
			
			// compute the last gid value in the tileset
			this.lastgid = this.firstgid + ( ((this.hTileCount * this.vTileCount) - 1) || 0);
		  
			// check if transparency is defined for a specific color
			this.trans = xmltileset.getElementsByTagName(me.TMX_TAG_IMAGE)[0].getAttribute(me.TMX_TAG_TRANS);

			// set Color Key for transparency if needed
			if (this.trans !== null && this.image) {
				// applyRGB Filter (return a context object)
				this.image = me.video.applyRGBFilter(this.image, "transparent", this.trans.toUpperCase()).canvas;
			}
			
			// set tile offset properties (if any)
			this.tileoffset = new me.Vector2d(0,0);
			var offset = xmltileset.getElementsByTagName(me.TMX_TAG_TILEOFFSET);
			if (offset.length>0) {
				this.tileoffset.x = me.TMXParser.getIntAttribute(offset[0], me.TMX_TAG_X);
				this.tileoffset.y = me.TMXParser.getIntAttribute(offset[0], me.TMX_TAG_Y);
			}

			// set tile properties, if any
			var tileInfo = xmltileset.getElementsByTagName(me.TMX_TAG_TILE);
			for ( var i = 0; i < tileInfo.length; i++) {
				var tileID = me.TMXParser.getIntAttribute(tileInfo[i], me.TMX_TAG_ID) + this.firstgid;

				this.TileProperties[tileID] = {};

				var tileProp = this.TileProperties[tileID];

				// apply tiled defined properties
				me.TMXUtils.setTMXProperties(tileProp, tileInfo[i]);

				// check what we found and adjust property
				tileProp.isSolid = tileProp.type ? tileProp.type.toLowerCase() === this.type.SOLID : false;
				tileProp.isPlatform = tileProp.type ? tileProp.type.toLowerCase() === this.type.PLATFORM : false;
				tileProp.isLeftSlope = tileProp.type ? tileProp.type.toLowerCase() === this.type.L_SLOPE : false;
				tileProp.isRightSlope = tileProp.type ? tileProp.type.toLowerCase() === this.type.R_SLOPE	: false;
				tileProp.isBreakable = tileProp.type ? tileProp.type.toLowerCase() === this.type.BREAKABLE : false;
				tileProp.isLadder = tileProp.type ? tileProp.type.toLowerCase() === this.type.LADDER : false;
				tileProp.isSlope = tileProp.isLeftSlope || tileProp.isRightSlope;

				// ensure the collidable flag is correct
				tileProp.isCollidable = !! (tileProp.type);

			}
		},
		
		/**
		 * return true if the gid belongs to the tileset
		 * @name me.TMXTileset#contains
		 * @public
		 * @function
		 * @param {Integer} gid 
		 * @return {boolean}
		 */
		contains : function(gid) {
			return (gid >= this.firstgid && gid <= this.lastgid)
		},
		
		//return an Image Object with the specified tile
		getTileImage : function(tmxTile) {
			// create a new image object
			var image = me.video.createCanvasSurface(this.tilewidth, this.tileheight);
			this.drawTile(image, 0, 0, tmxTile);
			return image.canvas;
		},

		// draw the x,y tile
		drawTile : function(context, dx, dy, tmxTile) {
			// check if any transformation is required
			if (tmxTile.flipped) {
				var m11 = 1; // Horizontal scaling factor
				var m12 = 0; // Vertical shearing factor
				var m21 = 0; // Horizontal shearing factor
				var m22 = 1; // Vertical scaling factor
				var mx	= dx; 
				var my	= dy;
				// set initial value to zero since we use a transform matrix
				dx = dy = 0;
				
				context.save()
								
				if (tmxTile.flipAD){
					// Use shearing to swap the X/Y axis
					m11=0;
					m12=1;
					m21=1;
					m22=0;
					// Compensate for the swap of image dimensions
					my += this.tileheight - this.tilewidth;
				}
				if (tmxTile.flipX){
					m11 = -m11;
					m21 = -m21;
					mx += tmxTile.flipAD ? this.tileheight : this.tilewidth;
					
				}
				if (tmxTile.flipY){
					m12 = -m12;
					m22 = -m22;
					my += tmxTile.flipAD ? this.tilewidth : this.tileheight;
				}
				// set the transform matrix
				context.transform(m11, m12, m21, m22, mx, my);
			}
			
			// get the local tileset id
			var tileid = tmxTile.tileId - this.firstgid;
			
			// draw the tile
			context.drawImage(this.image, 
							  this.getTileOffsetX(tileid), this.getTileOffsetY(tileid),
							  this.tilewidth, this.tileheight, 
							  dx, dy, 
							  this.tilewidth, this.tileheight);

			if  (tmxTile.flipped)  {
				// restore the context to the previous state
				context.restore()
			}
		}


	});
	
	/**
	 * an object containing all tileset
	 * @class
	 * @memberOf me
	 * @constructor
	 */
	me.TMXTilesetGroup = Object.extend({
		// constructor
		init: function () {
			this.tilesets = [];
		},
		
		//add a tileset to the tileset group
		add : function(tileset) {
			this.tilesets.push(tileset);
		},

		//return the tileset at the specified index
		getTilesetByIndex : function(i) {
			return this.tilesets[i];
		},
	   
		/**
		 * return the tileset corresponding to the specified id <br>
		 * will throw an exception if no matching tileset is found
		 * @name me.TMXTilesetGroup#getTilesetByGid
		 * @public
		 * @function
		 * @param {Integer} gid 
		 * @return {me.TMXTileset} corresponding tileset
		 */
		getTilesetByGid : function(gid) {
			var invalidRange = -1;
			// cycle through all tilesets
			for ( var i = 0, len = this.tilesets.length; i < len; i++) {
				// return the corresponding tileset if matching
				if (this.tilesets[i].contains(gid))
					return this.tilesets[i];
				// typically indicates a layer with no asset loaded (collision?)
				if (this.tilesets[i].firstgid == this.tilesets[i].lastgid) {
					if (gid >= this.tilesets[i].firstgid)
					// store the id if the [firstgid .. lastgid] is invalid
					invalidRange = i;
				}
			}
			// return the tileset with the invalid range
			if (invalidRange!=-1)
				return this.tilesets[invalidRange];
			else
			throw "no matching tileset found for gid " + gid;
		}
		
	});
	
	
	/*---------------------------------------------------------*/
	// END END END
	/*---------------------------------------------------------*/
})(window);
/*
 * MelonJS Game Engine
 * Copyright (C) 2012, Olivier BIOT
 * http://www.melonjs.org
 *
 * Tile QT 0.7.x format
 * http://www.mapeditor.org/	
 *
 */

(function($) {
	
	/**
	 * an Orthogonal Map Renderder
	 * Tile QT 0.7.x format
	 * @memberOf me
	 * @private
	 * @constructor
	 */
	me.TMXOrthogonalRenderer = Object.extend({
		// constructor
		init: function(width, height, tilewidth, tileheight) {
			this.width = width;
			this.height = height;
			this.tilewidth = tilewidth;
			this.tileheight = tileheight;
		},
		/**
		 * return the tile position corresponding to the specified pixel
		 * @private
		 */
		pixelToTileCoords : function(x, y) {
			return new me.Vector2d(x / this.tilewidth,
								   y / this.tileheight);
		},
		
		/**
		 * return the pixel position corresponding of the specified tile
		 * @private
		 */
		tileToPixelCoords : function(x, y) {
			return new me.Vector2d(x * this.tilewidth,
								   y * this.tileheight);		
		},
		
		/**
		 * draw the tile map
		 * @private
		 */
		drawTile : function(context, x, y, tmxTile, tileset) {
			// draw the tile
			tileset.drawTile(context, 
							 tileset.tileoffset.x + x * this.tilewidth,
							 tileset.tileoffset.y + (y + 1) * this.tileheight - tileset.tileheight,
							 tmxTile);
		},
		
		/**
		 * draw the tile map
		 * @private
		 */
		drawTileLayer : function(context, layer, viewport, rect) {
			// get top-left and bottom-right tile position
			var start = this.pixelToTileCoords(viewport.x + rect.pos.x, 
											   viewport.y + rect.pos.y).floorSelf();
				
			var end = this.pixelToTileCoords(viewport.x + rect.pos.x + rect.width + this.tilewidth, 
											 viewport.y + rect.pos.y + rect.height + this.tileheight).ceilSelf();
			
			//ensure we are in the valid tile range
			end.x = end.x > this.width ? this.width : end.x;
			end.y = end.y > this.height ? this.height : end.y;
			
			// main drawing loop			
			for ( var y = start.y ; y < end.y; y++) {
				for ( var x = start.x; x < end.x; x++) {
					var tmxTile = layer.layerData[x][y];
					if (tmxTile) {
						if (!layer.tileset.contains(tmxTile.tileId)) {
							layer.tileset = layer.tilesets.getTilesetByGid(tmxTile.tileId);
						}
						this.drawTile(context, x, y, tmxTile, layer.tileset);
					}
				}
			}
			
			
		}
		
		
	});
	
	
	/**
	 * an Isometric Map Renderder
	 * Tile QT 0.7.x format
	 * @memberOf me
	 * @private
	 * @constructor
	 */
	me.TMXIsometricRenderer = Object.extend({
		// constructor
		init: function(width, height, tilewidth, tileheight) {
			this.width = width;
			this.height = height;
			this.tilewidth = tilewidth;
			this.tileheight = tileheight;
			this.hTilewidth = tilewidth / 2;
			this.hTileheight = tileheight / 2;
			this.ratio = this.tilewidth / this.tileheight;
			this.originX = this.height * this.hTilewidth;
		},
		/**
		 * return the tile position corresponding to the specified pixel
		 * @private
		 */
		pixelToTileCoords : function(x, y) {
			x -=  this.originX;
			return new me.Vector2d((y + (x / this.ratio)) / this.tileheight,
								   (y - (x / this.ratio)) / this.tileheight);
		},
		
		/**
		 * return the pixel position corresponding of the specified tile
		 * @private
		 */
		tileToPixelCoords : function(x, y) {
			return new me.Vector2d((x - y) * this.hTilewidth + this.originX,
								   (x + y) * this.hTileheight);
		},

		
		/**
		 * draw the tile map
		 * @private
		 */
		drawTile : function(context, x, y, tmxTile, tileset) {
			// draw the tile
			tileset.drawTile(context, 
							 ((this.width-1) * tileset.tilewidth + (x-y) * tileset.tilewidth>>1), 
							 (-tileset.tilewidth + (x+y) * tileset.tileheight>>2),
							 tmxTile);
		},
		
		/**
		 * draw the tile map
		 * @private
		 */
		drawTileLayer : function(context, layer, viewport, rect) {
		
			// cache a couple of useful references
			var tileset = layer.tileset;
			var offset  = tileset.tileoffset;

			// get top-left and bottom-right tile position
			var rowItr = this.pixelToTileCoords(viewport.x + rect.pos.x - tileset.tilewidth, 
											    viewport.y + rect.pos.y - tileset.tileheight).floorSelf();
			var TileEnd = this.pixelToTileCoords(viewport.x + rect.pos.x + rect.width + tileset.tilewidth, 
												 viewport.y + rect.pos.y + rect.height + tileset.tileheight).ceilSelf();
			
			var rectEnd = this.tileToPixelCoords(TileEnd.x, TileEnd.y);
			
			// Determine the tile and pixel coordinates to start at
			var startPos = this.tileToPixelCoords(rowItr.x, rowItr.y);
			startPos.x -= this.hTilewidth;
			startPos.y += this.tileheight;
		
			/* Determine in which half of the tile the top-left corner of the area we
			 * need to draw is. If we're in the upper half, we need to start one row
			 * up due to those tiles being visible as well. How we go up one row
			 * depends on whether we're in the left or right half of the tile.
			 */
			var inUpperHalf = startPos.y - rect.pos.y + viewport.y > this.hTileheight;
			var inLeftHalf  = rect.pos.x + viewport.x - startPos.x < this.hTilewidth;

			if (inUpperHalf) {
				if (inLeftHalf) {
					rowItr.x--;
					startPos.x -= this.hTilewidth;
				} else {
					rowItr.y--;
					startPos.x += this.hTilewidth;
				}
				startPos.y -= this.hTileheight;
			}
			
			
			 // Determine whether the current row is shifted half a tile to the right
			var shifted = inUpperHalf ^ inLeftHalf;
			
			// initialize the columItr vector
			var columnItr = rowItr.clone();
			
			// main drawing loop			
			for (var y = startPos.y; y - this.tileheight < rectEnd.y; y += this.hTileheight) {
				columnItr.setV(rowItr);
				for (var x = startPos.x; x < rectEnd.x; x += this.tilewidth) {
					//check if it's valid tile, if so render
					if ((columnItr.x >= 0) && (columnItr.y >= 0) && (columnItr.x < this.width) && (columnItr.y < this.height))
					{
						var tmxTile = layer.layerData[columnItr.x][columnItr.y];
						if (tmxTile) {
							if (!tileset.contains(tmxTile.tileId)) {
								tileset = layer.tileset = layer.tilesets.getTilesetByGid(tmxTile.tileId);
								// offset could be different per tileset
								offset  = tileset.tileoffset;
							}
							// draw our tile
							tileset.drawTile(context, offset.x + x, offset.y + y - tileset.tileheight, tmxTile);
						}
					}
					// Advance to the next column
					columnItr.x++;
					columnItr.y--;
				}
				
				// Advance to the next row
				if (!shifted) {
					rowItr.x++;
					startPos.x += this.hTilewidth;
					shifted = true;
				} else {
					rowItr.y++;
					startPos.x -= this.hTilewidth;
					shifted = false;
				}
			}	
		}

	});

})(window);
/*
 * MelonJS Game Engine
 * Copyright (C) 2012, Olivier BIOT
 * http://www.melonjs.org
 *
 */

(function($, game) {
	
	/**
	 * a generic Color Layer Object
	 * @class
	 * @memberOf me
	 * @constructor
	 * @param {name}    name    layer name
	 * @param {String}  color   in hexadecimal "#RRGGBB" format
	 * @param {int}     z       z position
	 */
	 me.ColorLayer = Object.extend({
		// constructor
		init: function(name, color, z) {
			this.name = name;
			this.color = me.utils.HexToRGB(color);
			// for displaying order
			this.z = z;
			
			this.visible = true;
			this.opacity = 1.0;
			
			this.floating = true;
		},

		/**
		 * reset function
		 * @private
		 * @function
		 */
		reset : function() {
			;// nothing to do here
		},

		/**
		 * get the layer alpha channel value<br>
		 * @return current opacity value between 0 and 1
		 */
		getOpacity : function() {
			return this.opacity;
		},

		/**
		 * set the layer alpha channel value<br>
		 * @param {alpha} alpha opacity value between 0 and 1
		 */
		setOpacity : function(alpha) {
			if (alpha) {
				this.opacity = alpha.clamp(0.0, 1.0);
			}
		},

		/**
		 * update function
		 * @private
		 * @function
		 */
		update : function() {
			return false;
		},

		/**
		 * draw the color layer
		 * @private
		 */
		draw : function(context, rect) {
			// set layer opacity
			var _alpha = context.globalAlpha
			context.globalAlpha = this.opacity;
			
			// set layer color
			context.fillStyle = this.color;

			// clear the specified rect
			context.fillRect(rect.left, rect.top, rect.width, rect.height);

			// restore context alpha value
			context.globalAlpha = _alpha;
		}
	});	

	
	/**
	 * a generic Image Layer Object
	 * @class
	 * @memberOf me
	 * @constructor
	 * @param {name}   name        layer name
	 * @param {int}    width       layer width in pixels 
	 * @param {int}    height      layer height in pixels
	 * @param {String} image       image name (as defined in the asset list)
	 * @param {int}    z           z position
	 * @param {float}  [ratio=1.0]   scrolling ratio to be applied
	 */
	 me.ImageLayer = Object.extend({
		
		/**
		 * Define if and how an Image Layer should be repeated.<br>
		 * By default, an Image Layer is repeated both vertically and horizontally.<br>
		 * Property values : <br>
		 * * 'repeat' - The background image will be repeated both vertically and horizontally. (default) <br>
		 * * 'repeat-x' - The background image will be repeated only horizontally.<br>
		 * * 'repeat-y' - The background image will be repeated only vertically.<br>
		 * * 'no-repeat' - The background-image will not be repeated.<br>
		 * @public
		 * @type String
		 * @name me.ImageLayer#repeat
		 */
		//repeat: 'repeat', (define through getter/setter
		
		/**
		 * Define the image scrolling ratio<br>
		 * Scrolling speed is defined by multiplying the viewport delta position (e.g. followed entity) by the specified ratio<br>
		 * Default value : 1.0 <br>
		 * @public
		 * @type float
		 * @name me.ImageLayer#ratio
		 */
		ratio: 1.0,
	 
		/**
		 * constructor
		 * @private
		 * @function
		 */
		init: function(name, width, height, imagesrc, z, ratio) {
			// layer name
			this.name = name;
						
			// get the corresponding image (throw an exception if not found)
			this.image = (imagesrc) ? me.loader.getImage(me.utils.getBasename(imagesrc)) : null;
			if (!this.image) {
				console.log("melonJS: '" + imagesrc + "' file for Image Layer '" + this.name + "' not found!");
			}
			
			this.imagewidth = this.image.width;
			this.imageheight = this.image.height;
			
			// displaying order
			this.z = z;
			
			// if ratio !=0 scrolling image
			this.ratio = ratio || 1.0;
			
			// last position of the viewport
			this.lastpos = game.viewport.pos.clone();
			// current base offset when drawing the image
			this.offset = new me.Vector2d(0,0);
			
			// set layer width & height 
			this.width  = width ? Math.min(game.viewport.width, width)   : game.viewport.width;
			this.height = height? Math.min(game.viewport.height, height) : game.viewport.height;
			
			// make it visible
			this.visible = true;
			
			// default opacity
			this.opacity = 1.0;
			
			// Image Layer is considered as a floating object
			this.floating = true;
			
			// default value for repeat
			this._repeat = 'repeat';
			
			this.repeatX = true;
			this.repeatY = true;
			
			Object.defineProperty(this, "repeat", {
				get : function get() {
					return this._repeat;
				},
				set : function set(val) {
					this._repeat = val;
					switch (this._repeat) {
						case "no-repeat" :
							this.repeatX = false;
							this.repeatY = false;
							break;
						case "repeat-x" :
							this.repeatX = true;
							this.repeatY = false;
							break;
						case "repeat-y" :
							this.repeatX = false;
							this.repeatY = true;
							break;
						default : // "repeat"
							this.repeatX = true;
							this.repeatY = true;
							break;
					}
				}
			});

			
		},
		
		/**
		 * reset function
		 * @private
		 * @function
		 */
		reset : function() {
			// clear all allocated objects
			this.image = null;
			this.lastpos = null;
			this.viewport = null;
			this.offset = null;
		},

		/**
		 * get the layer alpha channel value<br>
		 * @return current opacity value between 0 and 1
		 */
		getOpacity : function() {
			return this.opacity;
		},

		/**
		 * set the layer alpha channel value<br>
		 * @param {alpha} alpha opacity value between 0 and 1
		 */
		setOpacity : function(alpha) {
			if (alpha) {
				this.opacity = alpha.clamp(0.0, 1.0);
			}
		},
		
		/**
		 * update function
		 * @private
		 * @function
		 */
		update : function() {
			if (this.ratio===0) {
				// static image
				return false;
			}
			else {
				// reference to the viewport
				var vpos = game.viewport.pos;
				// parallax / scrolling image
				if (!this.lastpos.equals(vpos)) {
					// viewport changed
					this.offset.x = (this.imagewidth + this.offset.x + ((vpos.x - this.lastpos.x) * this.ratio)) % this.imagewidth;
					this.offset.y = (this.imageheight + this.offset.y + ((vpos.y - this.lastpos.y) * this.ratio)) % this.imageheight;
					this.lastpos.setV(vpos);
					return true;
				}
				return false
			}
		},
		

		/**
		 * draw the image layer
		 * @private
		 */
		draw : function(context, rect) {
			
			// check if transparency
			if (this.opacity < 1.0) {
				// set the layer alpha value
				var _alpha = context.globalAlpha
				context.globalAlpha = this.opacity;
			}
			
			// if not scrolling ratio define, static image
			if (this.ratio===0) {
				// static image
				sw = Math.min(rect.width, this.imagewidth);
				sh = Math.min(rect.height, this.imageheight);
				
				context.drawImage(this.image, 
								  rect.left, rect.top,		//sx, sy
								  sw,		 sh,			//sw, sh
								  rect.left, rect.top,		//dx, dy
								  sw,		 sh);			//dw, dh
			}
			// parallax / scrolling image
			// todo ; broken with dirtyRect enabled
			else {
				var sx = ~~this.offset.x;
				var sy = ~~this.offset.y;
				
				var dx = 0;
				var dy = 0;				
				
				var sw = Math.min(this.imagewidth - sx, this.width);
				var sh = Math.min(this.imageheight - sy, this.height);
				  
				do {
					do {
						context.drawImage(this.image, 
										  sx, sy, 		// sx, sy
										  sw, sh,
										  dx, dy,		// dx, dy
										  sw, sh);
						
						sy = 0;
						dy += sh;
						sh = Math.min(this.imageheight, this.height - dy);
					} while( this.repeatY && (dy < this.height));
					dx += sw;
					if (!this.repeatX || (dx >= this.width) ) {
						// done ("end" of the viewport)
						break;
					}
					// else update required var for next iteration
					sx = 0;
					sw = Math.min(this.imagewidth, this.width - dx);
					sy = ~~this.offset.y;
					dy = 0;
					sh = Math.min(this.imageheight - ~~this.offset.y, this.height);
				} while( true );
			}
			
			// restore context state
			if (this.opacity < 1.0) {
				context.globalAlpha = _alpha;
			}
		}
	});	
	
	
	/**
	 * a generic collision tile based layer object
	 * @memberOf me
	 * @private
	 * @constructor
	 */
	CollisionTiledLayer = Object.extend({
		// constructor
		init: function CollisionTiledLayer(realwidth, realheight) {
			this.realwidth = realwidth;
			this.realheight = realheight;

			this.isCollisionMap = true;

		},
	
		/**
		 * reset function
		 * @private
		 * @function
		 */
		reset : function() {
			; // nothing to do here
		},

		/**
		 * only test for the world limit
		 * @private
		 **/

		checkCollision : function(obj, pv) {
			var x = (pv.x < 0) ? obj.left + pv.x : obj.right + pv.x;
			var y = (pv.y < 0) ? obj.top + pv.y : obj.bottom + pv.y;

			//to return tile collision detection
			var res = {
				x : 0, // !=0 if collision on x axis
				y : 0, // !=0 if collision on y axis
				xprop : {},
				yprop : {}
			};

			// test x limits
			if (x <= 0 || x >= this.realwidth) {
				res.x = pv.x;
			}

			// test y limits
			if (y <= 0 || y >= this.realheight) {
				res.y = pv.y;
			}

			// return the collide object if collision
			return res;
		}
	});
	
	/**
	 * a generic tile based layer object
	 * @class
	 * @memberOf me
	 * @constructor
	 */
	me.TiledLayer = Object.extend({
		// constructor
		init: function(w, h, tw, th, tilesets, z) {
			this.width = w;
			this.height = h;
			// tile width & height
			this.tilewidth  = tw;
			this.tileheight = th;
			
			// layer "real" size
			this.realwidth = this.width * this.tilewidth;
			this.realheight = this.height * this.tileheight;

			// for displaying order
			this.z = z;

			this.name = null;
			this.visible = false;
			this.opacity = 1.0;

			// data array
			this.layerData = null;

			/**
			 * The Layer corresponding Tilesets
			 * @public
			 * @type me.TMXTilesetGroup
			 * @name me.TiledLayer#tilesets
			 */
			this.tilesets = tilesets;

			// the default tileset
			this.tileset = tilesets?this.tilesets.getTilesetByIndex(0):null;
		},
		
		/**
		 * reset function
		 * @private
		 * @function
		 */
		reset : function() {
			// clear all allocated objects
			this.layerData = null;
			this.tileset = null;
			this.tilesets = null;
		},

		/**
		 * Create all required arrays
		 * @private
		 */
		initArray : function() {
			// initialize the array
			this.layerData = [];
			for ( var x = 0; x < this.width; x++) {
				this.layerData[x] = [];
				for ( var y = 0; y < this.height; y++) {
					this.layerData[x][y] = null;
				}
			}
		},

		/**
		 * get the layer alpha channel value<br>
		 * @return current opacity value between 0 and 1
		 */
		getOpacity : function() {
			return this.opacity;
		},

		/**
		 * set the layer alpha channel value<br>
		 * @param {alpha} alpha opacity value between 0 and 1
		 */
		setOpacity : function(alpha) {
			if (alpha) {
				this.opacity = alpha.clamp(0.0, 1.0);
			}
		},

		/**
		 * Return the TileId of the Tile at the specified position
		 * @name me.TiledLayer#getTileId
		 * @public
		 * @function
		 * @param {Integer} x x coordinate in pixel 
		 * @param {Integer} y y coordinate in pixel
		 * @return {Int} TileId
		 */
		getTileId : function(x, y) {
			var tile = this.getTile(x,y);
			return tile ? tile.tileId : null;
		},
		
		/**
		 * Return the Tile object at the specified position
		 * @name me.TiledLayer#getTile
		 * @public
		 * @function
		 * @param {Integer} x x coordinate in pixel 
		 * @param {Integer} y y coordinate in pixel
		 * @return {me.Tile} Tile Object
		 */
		getTile : function(x, y) {
			return this.layerData[~~(x / this.tilewidth)][~~(y / this.tileheight)];
		},

		/**
		 * Create a new Tile at the specified position
		 * @name me.TiledLayer#setTile
		 * @public
		 * @function
		 * @param {Integer} x x coordinate in tile 
		 * @param {Integer} y y coordinate in tile
		 * @param {Integer} tileId tileId
		 */
		setTile : function(x, y, tileId) {
			this.layerData[x][y] = new me.Tile(x, y, this.tilewidth, this.tileheight, tileId);
		},

		/**
		 * clear the tile at the specified position
		 * @name me.TiledLayer#clearTile
		 * @public
		 * @function
		 * @param {Integer} x x coordinate in tile 
		 * @param {Integer} y y coordinate in tile 
		 */
		clearTile : function(x, y) {
			// clearing tile
			this.layerData[x][y] = null;
		},

		/**
		 * check for collision
		 * obj - obj
		 * pv   - projection vector
		 * res : result collision object
		 * @private
		 */
		checkCollision : function(obj, pv) {

			var x = (pv.x < 0) ? ~~(obj.left + pv.x) : Math.ceil(obj.right  - 1 + pv.x);
			var y = (pv.y < 0) ? ~~(obj.top  + pv.y) : Math.ceil(obj.bottom - 1 + pv.y);
			//to return tile collision detection
			var res = {
				x : 0, // !=0 if collision on x axis
				xtile : undefined,
				xprop : {},
				y : 0, // !=0 if collision on y axis
				ytile : undefined,
				yprop : {}
			};
			
			//var tile;
			if (x <= 0 || x >= this.realwidth) {
				res.x = pv.x;
			} else if (pv.x != 0 ) {
				// x, bottom corner
				res.xtile = this.getTile(x, Math.ceil(obj.bottom - 1));
				if (res.xtile && this.tileset.isTileCollidable(res.xtile.tileId)) {
					res.x = pv.x; // reuse pv.x to get a 
					res.xprop = this.tileset.getTileProperties(res.xtile.tileId);
				} else {
					// x, top corner
					res.xtile = this.getTile(x, ~~obj.top);
					if (res.xtile && this.tileset.isTileCollidable(res.xtile.tileId)) {
						res.x = pv.x;
						res.xprop = this.tileset.getTileProperties(res.xtile.tileId);
					}
				}
			}
			
			// check for y movement
			// left, y corner
			if ( pv.y != 0 ) {
				res.ytile = this.getTile((pv.x < 0) ? ~~obj.left : Math.ceil(obj.right - 1), y);
				if (res.ytile && this.tileset.isTileCollidable(res.ytile.tileId)) {
					res.y = pv.y || 1;
					res.yprop = this.tileset.getTileProperties(res.ytile.tileId);
				} else { // right, y corner
					res.ytile = this.getTile((pv.x < 0) ? Math.ceil(obj.right - 1) : ~~obj.left, y);
					if (res.ytile && this.tileset.isTileCollidable(res.ytile.tileId)) {
						res.y = pv.y || 1;
						res.yprop = this.tileset.getTileProperties(res.ytile.tileId);
					}
				}
			}
			// return the collide object
			return res;
		},

		/**
		 * a dummy update function
		 * @private
		 */
		update : function() {
			return false;
		}
	});
	
	/**
	 * a TMX Tile Map Object
	 * Tile QT 0.7.x format
	 * @class
	 * @extends me.TiledLayer
	 * @memberOf me
	 * @constructor
	 */
	me.TMXLayer = me.TiledLayer.extend({
		// constructor
		init: function(layer, tilewidth, tileheight, orientation, tilesets, zOrder) {
			// call the parent
			this.parent(me.TMXParser.getIntAttribute(layer, me.TMX_TAG_WIDTH), 
						me.TMXParser.getIntAttribute(layer, me.TMX_TAG_HEIGHT),
						tilewidth, 
						tileheight,
						// tilesets should exist here !
						tilesets, 
						zOrder);
						
			// additional TMX flags
			this.orientation = orientation;
			this.name = me.TMXParser.getStringAttribute(layer, me.TMX_TAG_NAME);
			this.visible = (me.TMXParser.getIntAttribute(layer, me.TMX_TAG_VISIBLE, 1) == 1);
			this.opacity = me.TMXParser.getFloatAttribute(layer, me.TMX_TAG_OPACITY, 1.0).clamp(0.0, 1.0);
				
			// check if we have any user-defined properties 
			me.TMXUtils.setTMXProperties(this, layer);
			
			// check for the correct rendering method
			if (this.preRender === undefined)
				this.preRender = me.sys.preRender
				
			// detect if the layer is a collision map
			this.isCollisionMap = (this.name.toLowerCase().contains(me.LevelConstants.COLLISION_MAP));
			if (this.isCollisionMap && !me.debug.renderCollisionMap) {
				// force the layer as invisible
				this.visible = false;
			}

			// store the data information
			var xmldata = layer.getElementsByTagName(me.TMX_TAG_DATA)[0];
			var encoding = me.TMXParser.getStringAttribute(xmldata, me.TMX_TAG_ENCODING, null);
			var compression = me.TMXParser.getStringAttribute(xmldata, me.TMX_TAG_COMPRESSION, null);

			// make sure this is not happening
			if (encoding == '')
				encoding = null;
			if (compression == '')
				compression = null;

			// if not a collision layer, create a canvas where to draw our layer
			if (!this.isCollisionMap) {
				// set the right renderer
				switch (this.orientation)
				{
					case "orthogonal": {
					  this.renderer = new me.TMXOrthogonalRenderer(this.width, this.height, this.tilewidth, this.tileheight);
					  break;
					}
					case "isometric": {
					  this.renderer = new me.TMXIsometricRenderer(this.width, this.height , this.tilewidth, this.tileheight);
					  break;
					}
			
					// if none found, throw an exception
					default : {
						throw "melonJS: " + this.orientation + " type TMX Tile Map not supported!";
					}
				}
				
				// if pre-rendering method is use, create the offline canvas
				if (this.preRender) {
					this.layerCanvas = me.video.createCanvas(this.width	* this.tilewidth, this.height * this.tileheight);
					this.layerSurface = this.layerCanvas.getContext('2d');
					
					// set alpha value for this layer
					this.layerSurface.globalAlpha = this.opacity;
				}
				
			}

			// initialize the layer data array
			this.initArray();

			// populate our level with some data
			this.fillArray(xmldata, encoding, compression);
		},
		
		/**
		 * reset function
		 * @private
		 * @function
		 */
		reset : function() {
			// clear all allocated objects
			if (this.preRender) {
				this.layerCanvas = null;
				this.layerSurface = null;
			}
			this.renderer = null;
			// call the parent reset function
			this.parent();
		},
		
		/**
		 * Build the tiled layer
		 * @private
		 */
		fillArray : function(xmldata, encoding, compression) {
			// check if data is compressed
			switch (compression) {
			 
			 // no compression
			 case null: {
				// decode data based on encoding type
				switch (encoding) {
				// XML encoding
				   case null: {
					  var data = xmldata.getElementsByTagName(me.TMX_TAG_TILE);
					  break;
				   }
				   // CSV encoding
				   case me.TMX_TAG_CSV:
					  // Base 64 encoding
				   case me.TMX_TAG_ATTR_BASE64: {
					  // Merge all childNodes[].nodeValue into a single one
					  var nodeValue = '';
					  for ( var i = 0, len = xmldata.childNodes.length; i < len; i++) {
						 nodeValue += xmldata.childNodes[i].nodeValue;
					  }
					  // and then decode them
					  if (encoding == me.TMX_TAG_ATTR_BASE64)
						 var data = me.utils.decodeBase64AsArray(nodeValue, 4);
					  else
						 var data = me.utils.decodeCSV(nodeValue, this.width);

					  // ensure nodeValue is deallocated
					  nodeValue = null;
					  break;
				   }
					  
				   default:
					  throw "melonJS: TMX Tile Map " + encoding + " encoding not supported!";
					  break;
				}
				
			 break;
			 }
				
			 default:
				throw "melonJS: " + compression+ " compressed TMX Tile Map not supported!";
				break;
			}

			var idx = 0;
			// set everything
			for ( var y = 0 ; y <this.height; y++) {
				for ( var x = 0; x <this.width; x++) {
					// get the value of the gid
					var gid = (encoding == null) ? me.TMXParser.getIntAttribute(data[idx++], me.TMX_TAG_GID) : data[idx++];
					// fill the array										
					if (gid !== 0) {
						// create a new tile object
						var tmxTile = new me.Tile(x, y, this.tilewidth, this.tileheight, gid);
						// set the tile in the data array
						this.layerData[x][y] = tmxTile;
						// switch to the right tileset
						if (!this.tileset.contains(tmxTile.tileId)) {
							this.tileset = this.tilesets.getTilesetByGid(tmxTile.tileId);
						}
					   	// draw the corresponding tile
						if (this.visible && this.preRender) {
							this.renderer.drawTile(this.layerSurface, x, y, tmxTile, this.tileset);
						}
					}
				}
			}

			// make sure data is deallocated :)
			data = null;
		},

		/**
		 * clear the tile at the specified position
		 * @name me.TMXLayer#clearTile
		 * @public
		 * @function
		 * @param {Integer} x x position 
		 * @param {Integer} y y position 
		 */
		clearTile : function(x, y) {
			// call the parent function
			this.parent(x, y);
			// erase the corresponding area in the canvas
			if (this.visible && this.preRender) {
				this.layerSurface.clearRect(x * this.tilewidth,	y * this.tileheight, this.tilewidth, this.tileheight);
			}
		},

		/**
		 * set the layer alpha channel value<br>
		 * @param {alpha} alpha opacity value between 0 and 1
		 */
		setOpacity : function(alpha) {
			// set opacity through parent function
			this.parent(alpha);

			// if pre-rendering is used, update opacity on the hidden canvas context
			if (this.preRender) {
				this.layerSurface.globalAlpha = this.opacity;
			}
		},

		/**
		 * draw a tileset layer
		 * @private
		 */
		draw : function(context, rect) {
			
			// get a reference to the viewport
			var vpos = game.viewport.pos;
			
			// use the offscreen canvas
			if (this.preRender) {
			
				var width = Math.min(rect.width, this.realwidth);
				var height = Math.min(rect.height, this.realheight);
			
				// draw using the cached canvas
				context.drawImage(this.layerCanvas, 
								  vpos.x + rect.pos.x, //sx
								  vpos.y + rect.pos.y, //sy
								  width, height,    //sw, sh
								  rect.pos.x, rect.pos.y,     //dx, dy
								  width, height);   //dw, dh
			}
			// dynamically render the layer
			else {
				// set the layer alpha value
				var _alpha = context.globalAlpha
				context.globalAlpha = this.opacity;

				// draw the layer
				this.renderer.drawTileLayer(context, this, vpos, rect);
				
				// restore context to initial state
				context.globalAlpha = _alpha;
			}
		}
	});

	/*---------------------------------------------------------*/
	// END END END
	/*---------------------------------------------------------*/
})(window, me.game);
/*
 * MelonJS Game Engine
 * Copyright (C) 2012, Olivier BIOT
 * http://www.melonjs.org
 *
 * Tile QT 0.7.x format
 * http://www.mapeditor.org/	
 *
 */

(function($) {
	
	
	/**
	 * a basic level object skeleton
	 * @class
	 * @memberOf me
	 * @constructor
	 */
	me.TileMap = Object.extend({
		// constructor
		init: function(x, y) {
			// map default position
			this.pos = new me.Vector2d(x, y);
						
			// map default z order
			this.z = 0;
			
			/**
			 * name of the tilemap
			 * @public
			 * @type String
			 * @name me.TileMap#name
			 */
			this.name = null;
			
			/**
			 * width of the tilemap in Tile
			 * @public
			 * @type Int
			 * @name me.TileMap#width
			 */
			this.width = 0;
			
			/**
			 * height of the tilemap in Tile
			 * @public
			 * @type Int
			 * @name me.TileMap#height
			 */
			this.height = 0;

			/**
			 * width of the tilemap in pixels
			 * @public
			 * @type Int
			 * @name me.TileMap#realwidth
			 */
			this.realwidth = -1;
			
			/**
			 * height of the tilemap in pixels
			 * @public
			 * @type Int
			 * @name me.TileMap#realheight
			 */
			this.realheight = -1;

			/**
			 * Tile width
			 * @public
			 * @type Int
			 * @name me.TileMap#tilewidth
			 */
			this.tilewidth = 0;

			/**
			 * Tile height
			 * @public
			 * @type Int
			 * @name me.TileMap#tileheight
			 */
			this.tileheight = 0;

			// corresponding tileset for this map
			this.tilesets = null;

			// map layers
			this.mapLayers = [];

			// map Object
			this.objectGroups = [];

			// loading flag
			this.initialized = false;
			
		},

		/**
		 * a dummy update function
		 * @private
		 */
		reset : function() {
			this.tilesets = null;
			this.mapLayers.length = 0;
			this.objectGroups.length = 0;
			this.pos.set(0,0);
			this.initialized = false;
		},

		/**
		 * return the specified object group
		 * @private	
		 */
		getObjectGroupByName : function(name) {
			var objectGroup = null;

            		// normalize name
            		name = name.trim().toLowerCase();
            		for ( var i = this.objectGroups.length; i--;) {
                		if (this.objectGroups[i].name.toLowerCase().contains(name)) {
                    			objectGroup = this.objectGroups[i];
                    			break;
                		}
            		};

			return objectGroup;
		},

		/**
		 * return all the object group
		 * @private		
		 */
		getObjectGroups : function() {
			return this.objectGroups;
		},
		
		/**
		 * return all the existing layers
		 * @name me.TileMap#getLayers
		 * @public
		 * @function
		 * @return {me.TiledLayer[]} Array of Layers
		 */
		getLayers : function() {
			return this.mapLayers;
		},

		/**
		 * return the specified layer object
		 * @name me.TileMap#getLayerByName
		 * @public
		 * @function
		 * @param {String} name Layer Name 
		 * @return {me.TiledLayer} Layer Object
		 */
		getLayerByName : function(name) {
			var layer = null;

			// normalize name
			name = name.trim().toLowerCase();
			for ( var i = this.mapLayers.length; i--;) {
				if (this.mapLayers[i].name.toLowerCase().contains(name)) {
					layer = this.mapLayers[i];
					break;
				}
			};

			// return a fake collision layer if not found
			if ((name.toLowerCase().contains(me.LevelConstants.COLLISION_MAP)) && (layer == null)) {
				layer = new CollisionTiledLayer(me.game.currentLevel.realwidth,	me.game.currentLevel.realheight);
			}

			return layer;
		},

		/**
		 * clear the tile at the specified position from all layers
		 * @name me.TileMap#clearTile
		 * @public
		 * @function
		 * @param {Integer} x x position 
		 * @param {Integer} y y position 
		 */
		clearTile : function(x, y) {
			// add all layers
			for ( var i = this.mapLayers.length; i--;) {
				// that are visible
				if (this.mapLayers[i] instanceof me.TiledLayer) {
					this.mapLayers[i].clearTile(x, y);
				}
			};
		}
	
	});

	
	
	/**
	 * a TMX Tile Map Object
	 * Tile QT 0.7.x format
	 * @class
	 * @extends me.TileMap
	 * @memberOf me
	 * @constructor
	 */
	me.TMXTileMap = me.TileMap.extend({
		// constructor
		init: function(tmxfile, x, y) {
			// call the constructor
			this.parent(x, y);

			this.xmlMap = me.loader.getTMX(tmxfile);
			this.isJSON = me.loader.getTMXFormat(tmxfile) === 'json';

			if (!this.xmlMap) {
				throw "melonJS:" + tmxfile + " TMX map not found";
			};

			// tilemap version
			this.version = "";

			// map type (only orthogonal format supported)
			this.orientation = "";

			// tileset(s)
			this.tilesets = null;
			
		},
		
		/**
		 * a dummy update function
		 * @private
		 */
		reset : function() {
			if (this.initialized === true) {
				// reset/clear all layers
				for ( var i = this.mapLayers.length; i--;) {
					this.mapLayers[i].reset();
					this.mapLayers[i] = null;
				};
				// reset object groups
				for ( var i = this.objectGroups.length; i--;) {
					this.objectGroups[i].reset();
					this.objectGroups[i] = null;
				};
				// call parent reset function
				this.parent();
				// set back as not initialized
				this.initialized = false;
			}
		},
		
		/**
		 * Load & initialize the Tile Map
		 * @private
		 */
		load : function() {
			// if already loaded, do nothing
			if (this.initialized)
				return;

			// to automatically increment z index
			var zOrder = 0;

			// init the parser
			me.TMXParser.parseFromString(this.xmlMap, this.isJSON);

			// retreive all the elements of the XML file
			var xmlElements = me.TMXParser.getAllTagElements();

			// parse all tags
			for ( var i = 0; i < xmlElements.length; i++) {
				// check each Tag
				var tagName = xmlElements.item(i).nodeName;

				switch (tagName) {
				// get the map information
				case me.TMX_TAG_MAP: {
				   var map = xmlElements.item(i);
				   this.version = me.TMXParser.getStringAttribute(map, me.TMX_TAG_VERSION);
				   this.orientation = me.TMXParser.getStringAttribute(map, me.TMX_TAG_ORIENTATION);
				   this.width = me.TMXParser.getIntAttribute(map, me.TMX_TAG_WIDTH);
				   this.height = me.TMXParser.getIntAttribute(map, me.TMX_TAG_HEIGHT);
				   this.tilewidth = me.TMXParser.getIntAttribute(map,	me.TMX_TAG_TILEWIDTH);
				   this.tileheight = me.TMXParser.getIntAttribute(map, me.TMX_TAG_TILEHEIGHT);
				   this.realwidth = this.width * this.tilewidth;
				   this.realheight = this.height * this.tileheight;
				   this.backgroundcolor = me.TMXParser.getStringAttribute(map, me.TMX_BACKGROUND_COLOR);
				   this.z = zOrder++;

				   // center the map if smaller than the current viewport
				   if ((this.realwidth < me.game.viewport.width) || 
					   (this.realheight < me.game.viewport.height)) {
						var shiftX =  ~~( (me.game.viewport.width - this.realwidth) / 2);
						var shiftY =  ~~( (me.game.viewport.height - this.realheight) / 2);
						// update the map default screen position
						this.pos.add({x:shiftX > 0 ? shiftX : 0 , y:shiftY > 0 ? shiftY : 0} );
				   }

				   // set the map properties (if any)
				   me.TMXUtils.setTMXProperties(this, map);
					
				   // check if a user-defined background color is defined  
				   this.background_color = this.backgroundcolor ? this.backgroundcolor : this.background_color;
				   if (this.background_color) {
						this.mapLayers.push(new me.ColorLayer("background_color", 
															  this.background_color, 
															  zOrder++));
				   }

				   // check if a background image is defined
				   if (this.background_image) {
						// add a new image layer
						this.mapLayers.push(new me.ImageLayer("background_image", 
															  this.width, this.height, 
															  this.background_image, 
															  zOrder++));
				   }
				   break;
				}
				   

				// get the tileset information
				case me.TMX_TAG_TILESET: {
				   // Initialize our object if not yet done
				   if (!this.tilesets) {
					  this.tilesets = new me.TMXTilesetGroup();
				   }
				   // add the new tileset
				   this.tilesets.add(new me.TMXTileset(xmlElements.item(i)));
				   break;
				}
				
				// get image layer information
				case me.TMX_TAG_IMAGE_LAYER: {
					
					// extract layer information
					var iln = me.TMXParser.getStringAttribute(xmlElements.item(i), me.TMX_TAG_NAME);
					var ilw = me.TMXParser.getIntAttribute(xmlElements.item(i), me.TMX_TAG_WIDTH);
					var ilh = me.TMXParser.getIntAttribute(xmlElements.item(i), me.TMX_TAG_HEIGHT);
					var ilsrc = xmlElements.item(i).getElementsByTagName(me.TMX_TAG_IMAGE)[0].getAttribute(me.TMX_TAG_SOURCE);
					
					// create the layer
					var ilayer = new me.ImageLayer(iln, ilw * this.tilewidth, ilh * this.tileheight, ilsrc, zOrder++);
				    
					// set some additional flags
					ilayer.visible = (me.TMXParser.getIntAttribute(xmlElements.item(i), me.TMX_TAG_VISIBLE, 1) == 1);
					ilayer.opacity = me.TMXParser.getFloatAttribute(xmlElements.item(i), me.TMX_TAG_OPACITY, 1.0);
					
					// check if we have any properties 
					me.TMXUtils.setTMXProperties(ilayer, xmlElements.item(i));
	
					// add the new layer
					this.mapLayers.push(ilayer);
					break;
				}
				
				// get the layer(s) information
				case me.TMX_TAG_LAYER: {
					// regular layer or collision layer
					this.mapLayers.push(new me.TMXLayer(xmlElements.item(i), this.tilewidth, this.tileheight, this.orientation, this.tilesets, zOrder++));
					break;
				}
				
				// get the object groups information
				case me.TMX_TAG_OBJECTGROUP: {
				   var name = me.TMXParser.getStringAttribute(xmlElements.item(i), me.TMX_TAG_NAME);
				   this.objectGroups.push(new me.TMXOBjectGroup(name, xmlElements.item(i), this.tilesets, zOrder++));
				   break;
				}
					
				} // end switch 
			} // end for

			// free the TMXParser ressource
			me.TMXParser.free();

			// flag as loaded
			this.initialized = true;

		}

	});
		

	/*---------------------------------------------------------*/
	// END END END
	/*---------------------------------------------------------*/
})(window);
/*
 * MelonJS Game Engine
 * Copyright (C) 2012, Olivier BIOT
 * http://www.melonjs.org
 *
 */

(function($) {

	
	/**
	 * a level manager object <br>
	 * once ressources loaded, the level director contains all references of defined levels<br>
	 * There is no constructor function for me.levelDirector, this is a static object
	 * @final
	 * @memberOf me
	 * @constructor Should not be called by the user.
	 */
	me.levelDirector = (function() {
		// hold public stuff in our singletong
		var obj = {};

		/*---------------------------------------------
			
			PRIVATE STUFF
				
			---------------------------------------------*/

		// our levels
		var levels = {};
		// level index table
		var levelIdx = [];
		// current level index
		var currentLevelIdx = 0;
		
		/*---------------------------------------------
			
			PUBLIC STUFF
				
  		  ---------------------------------------------*/
		/**
		 * reset the level director 
		 * @private
		 */
		obj.reset = function() {

		};

		/**
		 * add a level  
		 * @private
		 */
		obj.addLevel = function(level) {
			throw "melonJS: no level loader defined";
		};

		/**
		 *
		 * add a TMX level  
		 * @private
		 */
		obj.addTMXLevel = function(levelId, callback) {
			// just load the level with the XML stuff
			if (levels[levelId] == null) {
				//console.log("loading "+ levelId);
				levels[levelId] = new me.TMXTileMap(levelId, 0, 0);
				// set the name of the level
				levels[levelId].name = levelId;
				// level index
				levelIdx[levelIdx.length] = levelId;
			} 
			else  {
				//console.log("level %s already loaded", levelId);
				return false;
			}
			
			// call the callback if defined
			if (callback)
				callback();
			
			// true if level loaded
			return true;
		};

		/**
		 * load a level into the game manager<br>
		 * (will also create all level defined entities, etc..)
		 * @name me.levelDirector#loadLevel
		 * @public
		 * @function
		 * @param {String} level level id
		 * @example
		 * // the game defined ressources
		 * // to be preloaded by the loader
		 * // TMX maps
		 * ...
		 * {name: "a4_level1",   type: "tmx",   src: "data/level/a4_level1.tmx"},
		 * {name: "a4_level2",   type: "tmx",   src: "data/level/a4_level2.tmx"},
		 * {name: "a4_level3",   type: "tmx",   src: "data/level/a4_level3.tmx"},
		 * ...
		 * ...
		 * // load a level
		 * me.levelDirector.loadLevel("a4_level1");
		 */
		obj.loadLevel = function(levelId) {
			// make sure it's a string
			levelId = levelId.toString().toLowerCase();
			// throw an exception if not existing
			if (levels[levelId] === undefined) {
				throw ("melonJS: level " + levelId + " not found");
			}

			if (levels[levelId] instanceof me.TMXTileMap) {

				// check the status of the state mngr
				var isRunning = me.state.isRunning();

				if (isRunning) {
					// pause the game loop to avoid 
					// some silly side effects
					me.state.pause();
				}

				// reset the gameObject Manager (just in case!)
				me.game.reset();
				
				// reset the GUID generator
				// and pass the level id as parameter
				me.utils.resetGUID(levelId);
				
				// reset the current (previous) level
				if (levels[obj.getCurrentLevelId()]) {
					levels[obj.getCurrentLevelId()].reset();
				}
				levels[levelId].load();
			
				// update current level index
				currentLevelIdx = levelIdx.indexOf(levelId);
				
				// add the specified level to the game manager
				me.game.loadTMXLevel(levels[levelId]);
				
				if (isRunning) {
					// resume the game loop if it was
					// previously running
					me.state.resume();
				}
			} else
				throw "melonJS: no level loader defined";
			
			return true;
		};

		/**
		 * return the current level id<br>
		 * @name me.levelDirector#getCurrentLevelId
		 * @public
		 * @function
		 * @return {String}
		 */
		obj.getCurrentLevelId = function() {
			return levelIdx[currentLevelIdx];
		},

		/**
		 * reload the current level<br>
		 * @name me.levelDirector#reloadLevel
		 * @public
		 * @function
		 */
		obj.reloadLevel = function() {
			// reset the level to initial state
			//levels[currentLevel].reset();
			return obj.loadLevel(obj.getCurrentLevelId());
		},

		/**
		 * load the next level<br>
		 * @name me.levelDirector#nextLevel
		 * @public
		 * @function
		 */
		obj.nextLevel = function() {
			//go to the next level 
			if (currentLevelIdx + 1 < levelIdx.length) {
				return obj.loadLevel(levelIdx[currentLevelIdx + 1]);
			} else {
				return false;
			}
		};

		/**
		 * load the previous level<br>
		 * @name me.levelDirector#previousLevel
		 * @public
		 * @function
		 */
		obj.previousLevel = function() {
			// go to previous level
			if (currentLevelIdx - 1 >= 0) {
				return obj.loadLevel(levelIdx[currentLevelIdx - 1]);
			} else {
				return false;
			}
		};

		/**
		 * return the amount of level preloaded<br>
		 * @name me.levelDirector#levelCount
		 * @public
		 * @function
		 */
		obj.levelCount = function() {
			return levelIdx.length;
		};
		
		// return our object
		return obj;

	})();
	/*---------------------------------------------------------*/
	// END END END
	/*---------------------------------------------------------*/
})(window);
/**
 * @preserve Tween JS
 * https://github.com/sole/Tween.js
 */
/**
 * author sole / http://soledadpenades.com
 * author mr.doob / http://mrdoob.com
 * author Robert Eisele / http://www.xarg.org
 * author Philippe / http://philippe.elsass.me
 * author Robert Penner / http://www.robertpenner.com/easing_terms_of_use.html
 * author Paul Lewis / http://www.aerotwist.com/
 * author lechecacharro
 * author Josh Faul / http://jocafa.com/
 */

(function() {
	/**
	 * Javascript Tweening Engine<p>
	 * Super simple, fast and easy to use tweening engine which incorporates optimised Robert Penner's equation<p>
	 * <a href="https://github.com/sole/Tween.js">https://github.com/sole/Tween.js</a><p>
	 * @author <a href="http://soledadpenades.com">sole</a>
	 * @author <a href="http://mrdoob.com">mr.doob</a>
	 * @author <a href="http://www.xarg.org">Robert Eisele</a>
	 * @author <a href="http://philippe.elsass.me">Philippe</a>
	 * @author <a href="http://www.robertpenner.com/easing_terms_of_use.html">Robert Penner</a>
	 * @class
	 * @memberOf me
	 * @constructor
	 * @param {Object} object object on which to apply the tween
	 * @example
	 * // add a tween to change the object pos.y variable to 200 in 3 seconds
	 * tween = new me.Tween(myObject.pos).to({y: 200}, 3000).onComplete(myFunc);
	 * tween.easing(me.Tween.Easing.Bounce.EaseOut);
	 * tween.start();
	 */
	me.Tween = function(object) {

		var _object = object,
			_valuesStart = {},
			_valuesDelta = {},
			_valuesEnd = {},
			_duration = 1000,
			_delayTime = 0,
			_startTime = null,
			_pauseTime = 0,
			_easingFunction = me.Tween.Easing.Linear.EaseNone,
			_chainedTween = null,
			_onUpdateCallback = null,
			_onCompleteCallback = null;

		/**
		 * object properties to be updated and duration
		 * @name me.Tween#to
		 * @public
		 * @function
		 * @param {Properties} prop list of properties
		 * @param {int} duration tween duration
		 */
		this.to = function(properties, duration) {

			if (duration !== undefined) {

				_duration = duration;

			}

			for ( var property in properties) {

				// This prevents the engine from interpolating null values
				if (_object[property] === null) {

					continue;

				}

				// The current values are read when the Tween starts;
				// here we only store the final desired values
				_valuesEnd[property] = properties[property];

			}

			return this;

		};

		/**
		 * start the tween
		 * @name me.Tween#start
		 * @public
		 * @function
		 */
		this.start = function() {

			// add the tween to the object pool on start
			me.game.add(this, 999);

			_startTime = me.timer.getTime() + _delayTime;
			_pauseTime = 0;

			for ( var property in _valuesEnd) {

				// Again, prevent dealing with null values
				if (_object[property] === null) {

					continue;

				}

				_valuesStart[property] = _object[property];
				_valuesDelta[property] = _valuesEnd[property]
						- _object[property];

			}

			return this;
		};

		/**
		 * stop the tween
		 * @name me.Tween#stop
		 * @public
		 * @function
		 */
		this.stop = function() {

			me.game.remove(this);
			return this;

		};

		/**
		 * delay the tween
		 * @name me.Tween#delay
		 * @public
		 * @function
		 * @param {int} amount delay amount
		 */
		this.delay = function(amount) {

			_delayTime = amount;
			return this;

		};

		/**
		 * Calculate delta to pause the tween
		 * @private
		 */
		me.event.subscribe(me.event.STATE_PAUSE, function onPause() {
			if (_startTime) {
				_pauseTime = me.timer.getTime();
			}
		});

		/**
		 * Calculate delta to resume the tween
		 * @private
		 */
		me.event.subscribe(me.event.STATE_RESUME, function onResume() {
			if (_startTime && _pauseTime) {
				_startTime += me.timer.getTime() - _pauseTime;
			}
		});

		/**
		 * set the easing function
		 * @name me.Tween#easing
		 * @public
		 * @function
		 * @param {Function} easing easing function
		 */
		this.easing = function(easing) {

			_easingFunction = easing;
			return this;

		};

		/**
		 * chain the tween
		 * @name me.Tween#chain
		 * @public
		 * @function
		 * @param {me.Tween} chainedTween Tween to be chained
		 */
		this.chain = function(chainedTween) {

			_chainedTween = chainedTween;
			return this;

		};

		/**
		 * onUpdate callback
		 * @name me.Tween#onUpdate
		 * @public
		 * @function
		 * @param {function} onUpdateCallback callback
		 */
		this.onUpdate = function(onUpdateCallback) {

			_onUpdateCallback = onUpdateCallback;
			return this;

		};

		/**
		 * onComplete callback
		 * @name me.Tween#onComplete
		 * @public
		 * @function
		 * @param {function} onCompleteCallback callback
		 */
		this.onComplete = function(onCompleteCallback) {

			_onCompleteCallback = onCompleteCallback;
			return this;

		};

		/** @private*/
		this.update = function(/* time */) {

			var property, elapsed, value;

			var time = me.timer.getTime();

			if (time < _startTime) {

				return true;

			}

			if ( ( elapsed = ( time - _startTime ) / _duration ) >= 1) {
			
					elapsed = 1;
			}

			value = _easingFunction(elapsed);

			for (property in _valuesDelta) {

				_object[property] = _valuesStart[property]
						+ _valuesDelta[property] * value;

			}

			if (_onUpdateCallback !== null) {

				_onUpdateCallback.call(_object, value);

			}

			if (elapsed === 1) {

				// remove the tween from the object pool
				me.game.remove(this);

				if (_onCompleteCallback !== null) {

					_onCompleteCallback.call(_object);

				}

				if (_chainedTween !== null) {

					_chainedTween.start();

				}

				return false;

			}

			return true;

		};

		/** @private*/
		this.destroy = function() {

			// indicate we can safely be destroyed
			return true;

		};

	}

	/**
	 * Easing Function :<p>
	 * Easing.Linear.EaseNone<p>
	 * Easing.Quadratic.EaseIn<p>
	 * Easing.Quadratic.EaseOut<p>
	 * Easing.Quadratic.EaseInOut<p>
	 * Easing.Cubic.EaseIn<p>
	 * Easing.Cubic.EaseOut<p>
	 * Easing.Cubic.EaseInOut<p>
	 * Easing.Quartic.EaseIn<p>
	 * Easing.Quartic.EaseOut<p>
	 * Easing.Quartic.EaseInOut<p>
	 * Easing.Quintic.EaseIn<p>
	 * Easing.Quintic.EaseOut<p>
	 * Easing.Quintic.EaseInOut<p>
	 * Easing.Sinusoidal.EaseIn<p>
	 * Easing.Sinusoidal.EaseOut<p>
	 * Easing.Sinusoidal.EaseInOut<p>
	 * Easing.Exponential.EaseIn<p>
	 * Easing.Exponential.EaseOut<p>
	 * Easing.Exponential.EaseInOut<p>
	 * Easing.Circular.EaseIn<p>
	 * Easing.Circular.EaseOut<p>
	 * Easing.Circular.EaseInOut<p>
	 * Easing.Elastic.EaseIn<p>
	 * Easing.Elastic.EaseOut<p>
	 * Easing.Elastic.EaseInOut<p>
	 * Easing.Back.EaseIn<p>
	 * Easing.Back.EaseOut<p>
	 * Easing.Back.EaseInOut<p>
	 * Easing.Bounce.EaseIn<p>
	 * Easing.Bounce.EaseOut<p>
	 * Easing.Bounce.EaseInOut
	 * @public
	 * @type enum
	 * @name me.Tween#Easing
	 */
	me.Tween.Easing = {
		Linear : {},
		Quadratic : {},
		Cubic : {},
		Quartic : {},
		Quintic : {},
		Sinusoidal : {},
		Exponential : {},
		Circular : {},
		Elastic : {},
		Back : {},
		Bounce : {}
	};

	/** @ignore */
	me.Tween.Easing.Linear.EaseNone = function(k) {

		return k;

	};

	/** @ignore */
	me.Tween.Easing.Quadratic.EaseIn = function(k) {

		return k * k;

	};
	/** @ignore */
	me.Tween.Easing.Quadratic.EaseOut = function(k) {

		return k * ( 2 - k );

	};
	/** @ignore */
	me.Tween.Easing.Quadratic.EaseInOut = function(k) {

		if ((k *= 2) < 1)
			return 0.5 * k * k;
		return -0.5 * (--k * (k - 2) - 1);

	};
	/** @ignore */
	me.Tween.Easing.Cubic.EaseIn = function(k) {

		return k * k * k;

	};
	/** @ignore */
	me.Tween.Easing.Cubic.EaseOut = function(k) {

		return --k * k * k + 1;

	};
	/** @ignore */
	me.Tween.Easing.Cubic.EaseInOut = function(k) {

		if ((k *= 2) < 1)
			return 0.5 * k * k * k;
		return 0.5 * ((k -= 2) * k * k + 2);

	};
	/** @ignore */
	me.Tween.Easing.Quartic.EaseIn = function(k) {

		return k * k * k * k;

	};
	/** @ignore */
	me.Tween.Easing.Quartic.EaseOut = function(k) {

		return 1 - (--k * k * k * k);

	}
	/** @ignore */
	me.Tween.Easing.Quartic.EaseInOut = function(k) {

		if ((k *= 2) < 1)
			return 0.5 * k * k * k * k;
		return -0.5 * ((k -= 2) * k * k * k - 2);

	};
	/** @ignore */
	me.Tween.Easing.Quintic.EaseIn = function(k) {

		return k * k * k * k * k;

	};
	/** @ignore */
	me.Tween.Easing.Quintic.EaseOut = function(k) {

		return --k * k * k * k * k + 1;

	};
	/** @ignore */
	me.Tween.Easing.Quintic.EaseInOut = function(k) {

		if ((k *= 2) < 1)
			return 0.5 * k * k * k * k * k;
		return 0.5 * ((k -= 2) * k * k * k * k + 2);

	};
	/** @ignore */
	me.Tween.Easing.Sinusoidal.EaseIn = function(k) {

		return 1 - Math.cos( k * Math.PI / 2 );

	};
	/** @ignore */
	me.Tween.Easing.Sinusoidal.EaseOut = function(k) {

		return Math.sin(k * Math.PI / 2);

	};
	/** @ignore */
	me.Tween.Easing.Sinusoidal.EaseInOut = function(k) {

		return 0.5 * ( 1 - Math.cos( Math.PI * k ) );

	};
	/** @ignore */
	me.Tween.Easing.Exponential.EaseIn = function(k) {

		return k === 0 ? 0 : Math.pow( 1024, k - 1 );

	};
	/** @ignore */
	me.Tween.Easing.Exponential.EaseOut = function(k) {

		return k === 1 ? 1 : 1 - Math.pow( 2, - 10 * k );

	};
	/** @ignore */
	me.Tween.Easing.Exponential.EaseInOut = function(k) {

		if ( k === 0 ) return 0;
		if ( k === 1 ) return 1;
		if ( ( k *= 2 ) < 1 ) return 0.5 * Math.pow( 1024, k - 1 );
		return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);

	};
	/** @ignore */
	me.Tween.Easing.Circular.EaseIn = function(k) {

		return 1 - Math.sqrt( 1 - k * k );

	};
	/** @ignore */
	me.Tween.Easing.Circular.EaseOut = function(k) {

		return Math.sqrt(1 - (--k * k));

	};
	/** @ignore */
	me.Tween.Easing.Circular.EaseInOut = function(k) {

		if ( ( k *= 2 ) < 1) return - 0.5 * ( Math.sqrt( 1 - k * k) - 1);
		return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);

	};
	/** @ignore */
	me.Tween.Easing.Elastic.EaseIn = function(k) {

		var s, a = 0.1, p = 0.4;
		if ( k === 0 ) return 0;
		if ( k === 1 ) return 1;
		if ( !a || a < 1 ) { a = 1; s = p / 4; }
		else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
		return - ( a * Math.pow( 2, 10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) );

	};
	/** @ignore */
	me.Tween.Easing.Elastic.EaseOut = function(k) {

		var s, a = 0.1, p = 0.4;
		if ( k === 0 ) return 0;
		if ( k === 1 ) return 1;
		if ( !a || a < 1 ) { a = 1; s = p / 4; }
		else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
		return ( a * Math.pow( 2, - 10 * k) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) + 1 );

	};
	/** @ignore */
	me.Tween.Easing.Elastic.EaseInOut = function(k) {

		var s, a = 0.1, p = 0.4;
		if ( k === 0 ) return 0;
		if ( k === 1 ) return 1;
		if ( !a || a < 1 ) { a = 1; s = p / 4; }
		else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
		if ( ( k *= 2 ) < 1 ) return - 0.5 * ( a * Math.pow( 2, 10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) );
		return a * Math.pow( 2, -10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) * 0.5 + 1;

	};
	/** @ignore */
	me.Tween.Easing.Back.EaseIn = function(k) {

		var s = 1.70158;
		return k * k * ((s + 1) * k - s);

	};
	/** @ignore */
	me.Tween.Easing.Back.EaseOut = function(k) {

		var s = 1.70158;
		return --k * k * ( ( s + 1 ) * k + s ) + 1;

	};
	/** @ignore */
	me.Tween.Easing.Back.EaseInOut = function(k) {

		var s = 1.70158 * 1.525;
		if ((k *= 2) < 1)
			return 0.5 * (k * k * ((s + 1) * k - s));
		return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);

	};
	/** @ignore */
	me.Tween.Easing.Bounce.EaseIn = function(k) {

		return 1 - me.Tween.Easing.Bounce.EaseOut(1 - k);

	};
	/** @ignore */
	me.Tween.Easing.Bounce.EaseOut = function(k) {

		if ( k < ( 1 / 2.75 ) ) {

			return 7.5625 * k * k;

		} else if (k < (2 / 2.75)) {

			return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;

		} else if (k < (2.5 / 2.75)) {

			return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;

		} else {

			return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;

		}

	};
	/** @ignore */
	me.Tween.Easing.Bounce.EaseInOut = function(k) {

		if (k < 0.5)
			return me.Tween.Easing.Bounce.EaseIn(k * 2) * 0.5;
		return me.Tween.Easing.Bounce.EaseOut(k * 2 - 1) * 0.5 + 0.5;

	};


	/*---------------------------------------------------------*/
	// END END END
	/*---------------------------------------------------------*/
})();
/**
 * @preserve MinPubSub
 * a micro publish/subscribe messaging framework
 * @see https://github.com/daniellmb/MinPubSub 
 * @author Daniel Lamb <daniellmb.com>
 *
 * Released under the MIT License
 */

(function() {

	/**
	 * There is no constructor function for me.event
	 * @final
	 * @memberOf me
	 * @constructor Should not be called by the user.
	 */
	me.event = (function() {
		
		// hold public stuff inside the singleton
		var obj = {};
		
		/**
		 * the channel/subscription hash
		 * @private
		 */
		var cache = {};
		
		/*--------------
			PUBLIC 
		  --------------*/
		  
		/**
		 * Channel Constant when the game is paused <br>
		 * Data passed : none <br>
		 * @public
		 * @type {String}
		 * @name me.event#STATE_PAUSE
		 */		
		obj.STATE_PAUSE = "me.state.onPause";
		
		/**
		 * Channel Constant for when the game is resumed <br>
		 * Data passed : none <br>
		 * @public
		 * @type {String}
		 * @name me.event#STATE_RESUME
		 */		
		obj.STATE_RESUME = "me.state.onResume";
		
		/**
		 * Channel Constant for when the game manager is initialized <br>
		 * Data passed : none <br>
		 * @public
		 * @type {String}
		 * @name me.event#GAME_INIT
		 */		
		obj.GAME_INIT = "me.game.onInit";
		
		/**
		 * Channel Constant for when a level is loaded <br>
		 * Data passed : {String} Level Name
		 * @public
		 * @type {String}
		 * @name me.event#LEVEL_LOADED
		 */		
		obj.LEVEL_LOADED = "me.game.onLevelLoaded";

		/**
		 * Channel Constant for when everything has loaded <br>
		 * Data passed : none <br>
		 * @public
		 * @type {String}
		 * @name me.event#LOADER_COMPLETE
		 */
		obj.LOADER_COMPLETE = "me.loader.onload";

		/**
		 * Channel Constant for displaying a load progress indicator <br>
		 * Data passed : {Number} [0 .. 1] <br>
		 * @public
		 * @type {String}
		 * @name me.event#LOADER_PROGRESS
		 */
		obj.LOADER_PROGRESS = "me.loader.onProgress";

		/**
		 * Channel Constant for pressing a binded key <br>
		 * Data passed : {String} user-defined action <br>
		 * @public
		 * @type {String}
		 * @name me.event#KEYDOWN
		 */
		obj.KEYDOWN = "me.input.keydown";

		/**
		 * Channel Constant for releasing a binded key <br>
		 * Data passed : {Number} user-defined action <br>
		 * @public
		 * @type {String}
		 * @name me.event#KEYUP
		 */
		obj.KEYUP = "me.input.keyup";

		/**
		 * Channel Constant for when the (browser) window is resized <br>
		 * note the `orientationchange` event will also trigger this channel<br>
		 * Data passed : {Event} Event object <br>
		 * @public
		 * @type {String}
		 * @name me.event#WINDOW_ONRESIZE
		 */
		obj.WINDOW_ONRESIZE = "window.onresize";
		
		/**
		 * Publish some data on a channel
		 * @name me.event#publish
		 * @public
		 * @function
		 * @param {String} channel The channel to publish on
		 * @param {Array} arguments The data to publish
		 *
		 * @example Publish stuff on '/some/channel'.
		 * Anything subscribed will be called with a function
		 * signature like: function(a,b,c){ ... }
		 *
		 * me.publish("/some/channel", ["a","b","c"]);
		 * 
		 */
		obj.publish = function(channel, args){
			var subs = cache[channel],
				len = subs ? subs.length : 0;

			//can change loop or reverse array if the order matters
			while(len--){
				subs[len].apply(window, args || []); // is window correct here?
			}
		};

		/**
		 * Register a callback on a named channel.
		 * @name me.event#subscribe
		 * @public
		 * @function
		 * @param {String} channel The channel to subscribe to
		 * @param {Function} callback The event handler, any time something is
		 * published on a subscribed channel, the callback will be called
		 * with the published array as ordered arguments
		 * @return {Array} A handle which can be used to unsubscribe this
		 * particular subscription
		 * @example
		 * me.subscribe("/some/channel", function(a, b, c){ doSomething(); });
		 */

		obj.subscribe = function(channel, callback){
			if(!cache[channel]){
				cache[channel] = [];
			}
			cache[channel].push(callback);
			return [channel, callback]; // Array
		};
		
		/**
		 * Disconnect a subscribed function for a channel.
		 * @name me.event#unsubscribe
		 * @public
		 * @function
		 * @param {Array} handle The return value from a subscribe call or the
		 * name of a channel as a String
		 * @param {Function} [callback] The return value from a subscribe call.
		 * @example
		 * var handle = me.subscribe("/some/channel", function(){});
		 * me.unsubscribe(handle);
		 */
		obj.unsubscribe = function(handle, callback){
			var subs = cache[callback ? handle : handle[0]],
				callback = callback || handle[1],
				len = subs ? subs.length : 0;
			
			while(len--){
				if(subs[len] === callback){
					subs.splice(len, 1);
				}
			}
		};
		
		// return our object
		return obj;

	})();

})();
/*
 * MelonJS Game Engine
 * Copyright (C) 2012, Olivier BIOT
 * http://www.melonjs.org
 */
 
(function() {

	/**
	 * There is no constructor function for me.plugin
	 * @final
	 * @memberOf me
	 * @constructor Should not be called by the user.
	 */
	me.plugin = (function() {
		
		// hold public stuff inside the singleton
		var singleton = {};
		
		/*--------------
			PUBLIC 
		  --------------*/
		
		/**
		* a base Object for plugin <br>
		* plugin must be installed using the register function
		* @see me.plugin#Base
		* @class
		* @extends Object
		* @memberOf me
		* @constructor
		*/
		singleton.Base = Object.extend(
		/** @scope me.plugin.Base.prototype */
		{
			/**
			 * define the minimum required <br>
			 * version of melonJS  <br>
			 * this need to be defined by the plugin
			 * @public
			 * @type String
			 * @name me.plugin.Base#version
			 */
			version : undefined,
			
			/** @private */
			init : function() {
				; //empty for now !
			}
		});


		/**
		 * patch a melonJS function
		 * @name me.plugin#patch
		 * @public
		 * @function
		 * @param {Object} object target object
		 * @param {name} name target function
		 * @param {Function} fn function
		 * @example 
		 * // redefine the me.game.update function with a new one
		 * me.plugin.patch(me.game, "update", function () { 
		 * 	 // display something in the console
		 *   console.log("duh");
		 *   // call the original me.game.update function
		 *	 this.parent();
		 * });
		 */
		singleton.patch = function(proto, name, fn){
			// use the object prototype if possible
			if (proto.prototype!==undefined) {
				var proto = proto.prototype;
			}
			// reuse the logic behind Object.extend
			if (typeof(proto[name]) == "function") {
				// save the original function
				var _parent = proto[name];
				// override the function with the new one
				proto[name] = (function(name, fn){
					return function() {
						var tmp = this.parent;
						this.parent = _parent;
						var ret = fn.apply(this, arguments);			 
						this.parent = tmp;
						return ret;
					};
				})( name, fn );
			}
			else {
				console.error(name + " is not an existing function");
			}
		};

		/**
		 * Register a plugin.
		 * @name me.plugin#register
		 * @see me.plugin#Base
		 * @public
		 * @function
		 * @param {me.plugin.Base} plugin Plugin to instiantiate and register
		 * @param {String} name
		 * @param {Object} [args] all extra parameters will be passed to the plugin constructor
		 * @example
		 * // register a new plugin
		 * me.plugin.register(TestPlugin, "testPlugin");
		 * // the plugin then also become available
		 * // under then me.plugin namespace
 		 * me.plugin.testPlugin.myFunction();
		 */
		singleton.register = function(plugin, name){
			// ensure me.plugin[name] is not already "used"
			if (me.plugin[name]) {
				console.error ("plugin " + name + " already registered");
			}
			
			// compatibility testing
			if (plugin.prototype.version === undefined) {
				throw "melonJS: Plugin version not defined !";
			} else if (me.sys.checkVersion(plugin.prototype.version) > 0) {
				throw ("melonJS: Plugin version mismatch, expected: "+ plugin.prototype.version +", got: " + me.version);
			}
			
			// get extra arguments
			var _args = []; 
			if (arguments.length > 2) {
				// store extra arguments if any
				_args = Array.prototype.slice.call(arguments, 1);
			}
			
			// try to instantiate the plugin
			_args[0] = plugin;
			me.plugin[name] = new (plugin.bind.apply(plugin, _args))();
			
			// inheritance check
			if (!(me.plugin[name] instanceof me.plugin.Base)) {
				throw "melonJS: Plugin should extend the me.plugin.Base Class !";
			}
		};
		
		// return our singleton
		return singleton;

	})();
})();
