/*!
 * MelonJS Game Engine
 * Copyright (C) 2011, Olivier BIOT
 * http://www.melonjs.org
 * 
 * melonJS is licensed under a Creative Commons 
 * Attribution-NonCommercial-ShareAlike 3.0 Unported License. 
 * http://creativecommons.org/licenses/by-nc-sa/3.0/
 *
 * @author Olivier Biot 2011
 *
 */
(function($, undefined) {
	// Use the correct document accordingly to window argument
	var document = $.document;

	/**
	 * (<b>m</b>)elon (<b>e</b>)ngine : All melonJS functions are defined inside of this namespace.<p>
	 * You generally should not add new properties to this namespace as it may be overwritten in future versions. 
	 * @namespace
	 */
	me = {
		// settings & configuration
		// library name & version
		mod : "melonJS",
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
		XMLParser : null,
		loadingScreen : null,
		// TMX Stuff
		TMXTileMap : null

	};

	/**
	 * debug stuff.
	 * @namespace
	 */
	me.debug = {
		/**
		 * this flag is automatically set <br>
		 * upon detection of a "framecounter" element <br>
		 * in the HTML file holding the cancas.
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
		 * render dirty region/rectangle<br>
		 * default value : false<br>
		 * (feature must be enabled through the me.sys.dirtyRegion flag)
		 * @type {Boolean}
		 * @memberOf me.debug 
		 */
		renderDirty : false

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
		storage : false,
		/** 
		 * Browser Gyroscopic Motion Event capabilities (read-only) <br>
		 * @type {Boolean}
		 * @memberOf me.sys
		 */
		gyro : ($.DeviceMotionEvent !== undefined),

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
		 * @type {int}
		 * @memberOf me.sys
		 */
		scale : 1.0,

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
		 * Experimental WebGl support <br>
		 * https://github.com/corbanbrook/webgl-2d<br>
		 * Be sure to also load the WebGL library (webgl-2d.js) before melonJS<br>
		 * default value : false
		 * @type {Boolean}
		 * @memberOf me.sys
		 */
		enableWebGL : false

	};

	// add me to the global window variable
	$.me = me;

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
			readyList = [];
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
			return util.domReady();
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
	onReady = function(fn) {
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
       fnTest = /xyz/.test(function() {xyz;}) ? /\bparent\b/ : /.*/;

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
		Class.extend = arguments.callee;

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
		 * ensure bind is properly supported<br>
		 * (c) <a href="http://www.prototypejs.org/">Prototype.js</a><p>
		 * Binds this function to the given context by wrapping it in another function and returning the wrapper.<p>
		 * Whenever the resulting "bound" function is called, it will call the original ensuring that this is set to context. <p>
		 * Also optionally curries arguments for the function.
		 * @param {Object} context the object to bind to.
		 * @param {Array.<string>} [args] Optional additional arguments to curry for the function.
		 * @example
		 * // A typical use of Function bind is to ensure that a callback
		 * // (event handler, etc.) that is an object method gets called with 
		 * // the correct object as its context (this value):
		 *
		 * // -> WRONG
		 * myObject.onComplete(this.callback);
		 *
		 * // -> RIGHT 
		 * myObject.onComplete(this.callback.bind(this));
		 */
		/*
		Function.prototype.bind = function(scope) 
		{
			var _function = this; 
			return function() 
			{
				return _function.apply(scope, arguments);
			}
		};
		 */

		Function.prototype.bind = function() {
			var fn = this, args = Array.prototype.slice.call(arguments), object = args.shift();
			return function() {
				return fn.apply(object, args.concat(Array.prototype.slice.call(arguments)));
			};
		};

	};
   

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

	/** 
	 * add trim fn to the string object 
	 * @extends String
	 * @return {String} trimmed string
	 */
	String.prototype.trim = function() {
		return (this.replace(/^\s+/, '')).replace(/\s+$/, '');
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
	 * add a clamp fn to the Number object
	 * @extends Number
	 * @return {Number} clamped value
	 */
	Number.prototype.clamp = function(low, high) {
		return this < low ? low : this > high ? high : this;
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
		num = (arguments.length == 1) ? this : arguments[0];
		powres = Math.pow(10, arguments[1] || arguments[0]);
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

	/************************************************************************************/

	/**
	 * @class
	 * @constructor
	 * @ignore
	 *	a basic XML Parser
	 *
	 **/
	function _TinyXMLParser() {
		var parserObj = {
			xmlDoc : null,
			parser : null,

			// parse a xml from a string (xmlhttpObj.responseText)
			parseFromString : function(textxml) {
				// get a reference to the requested corresponding xml file 
				if ($.DOMParser) {
					parser = new DOMParser();
					xmlDoc = parser.parseFromString(textxml, "text/xml");
				} else // Internet Explorer (untested!)
				{
					xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
					xmlDoc.async = "false";
					xmlDoc.loadXML(textxml);
				}
				if (xmlDoc == null) {
					console.log("xml " + xmlDoc + " not found!");
				}
			},

			getFirstElementByTagName : function(name) {
				return xmlDoc ? xmlDoc.getElementsByTagName(name)[0] : null;
			},

			getAllTagElements : function() {
				return xmlDoc ? xmlDoc.getElementsByTagName('*') : null;
			},

			getStringAttribute : function(elt, str, val) {
				var ret = elt.getAttribute(str);
				return ret ? ret.trim().toLowerCase() : val;
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
				xmlDoc = null;
				parser = null;
			}
		}
		return parserObj;
	}
	;
	/************************************************************************************/

	/************************************************************************************/

	/*---
	 	ME init stuff
						---*/

	function _init_ME() {
		// don't do anything if already initialized (should not happen anyway)
		if (me_initialized)
			return;

		// init some audio variables		
		var a = document.createElement('audio');

		// enable/disable the cache
		me.utils.setNocache(document.location.href.match(/\?nocache/));

		if (a.canPlayType) {
			me.audio.capabilities.mp3 = ("no" != a.canPlayType("audio/mpeg"))
					&& ("" != a.canPlayType("audio/mpeg"));

			me.audio.capabilities.ogg = ("no" != a.canPlayType('audio/ogg; codecs="vorbis"'))
					&& ("" != a.canPlayType('audio/ogg; codecs="vorbis"'));

			me.audio.capabilities.wav = ("no" != a.canPlayType('audio/wav; codecs="1"'))
					&& ("" != a.canPlayType('audio/wav; codecs="1"'));

			// enable sound if any of the audio format is supported
			me.sys.sound = me.audio.capabilities.mp3 || 
                        me.audio.capabilities.ogg || 
                        me.audio.capabilities.wav;

		}
		// hack, check for specific platform
		if ((me.sys.ua.search("iphone") > -1)
				|| (me.sys.ua.search("ipod") > -1)
				|| (me.sys.ua.search("ipad") > -1)
				|| (me.sys.ua.search("android") > -1)) {
			//if on mobile device, disable sound for now 
			me.sys.sound = false;
		}

		// init the FPS counter if needed
		me.timer.init();

		// create an instance of the XML parser
		me.XMLParser = new _TinyXMLParser();

		// create a default loading screen
		me.loadingScreen = new me.DefaultLoadingScreen();

		// init the App Manager
		me.state.init();

		// init the Entity Pool
		me.entityPool.init();

		// init the level Director
		me.levelDirector.reset();

		me_initialized = true;

	}
	;

	/******************************************/
	/*		OBJECT DRAWING MANAGEMENT           */
	/*		hold & manage app/game objects		*/
	/******************************************/

	/**
	 * a object drawing manager
	 * only used by the game manager
	 * @ignore
	 */
	drawManager = (function() {
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

		// a flag indicating if we need a redraw
		api.isDirty = false;

		/**
		 * init function
		 */
		api.reset = function() {
			// make sure it's empty
			dirtyRects = [];
			dirtyObjects = [];

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

			// if obj is visible add it to the list of obj to draw
			if (obj.visible) {
				// add obj at index 0, so that we can keep
				// our inverted loop later
				dirtyObjects.splice(0, 0, obj);
			}
		};

		/**
		 * make all object dirty
		 */
		api.makeAllDirty = function() {
			//empty the dirty rect list
			dirtyRects = [];
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
            // remove the object from the list of obj to draw
            dirtyObjects.splice(dirtyObjects.indexOf(obj), 1);
            // save the visible state of the object
            wasVisible = obj.visible;
            // mark the object as not visible
            // so it won't be added (again) in the list object to be draw
            obj.visible = false;
            // and flag the area as dirty
            api.makeDirty(obj, true);
            // restore visible state, this is needed for "persistent" object like screenObject
            obj.visible = wasVisible;
 		};

		/**
		 * draw all dirty objects/regions
		 */
		api.draw = function(context) {
			// if feature disable, we only have one dirty rect (the viewport area)
			for ( var r = dirtyRects.length, rect; r--, rect = dirtyRects[r];) {
				// parse all objects 
				for ( var o = dirtyObjects.length, obj; o--,
						obj = dirtyObjects[o];) {
					// if dirty region enabled, make sure the object is in the area to be refreshed
					if (me.sys.dirtyRegion && obj.isEntity
							&& !obj.checkAxisAligned(rect)) {
						continue;
					}
					// draw the object using the dirty area to be updated
					obj.draw(context, rect);
				}
				// some debug stuff
				if (me.debug.renderDirty) {
					rect.draw(context, "white");
				}
			}
		};

		/**
		 * flush all rect
		 */
		api.flush = function() {
			// only empty dirty area list if dirtyRec feature is enable
			// allows to keep the viewport area as a default dirty rect
			if (me.sys.dirtyRegion) {
				dirtyRects = [];
			}
			// empty the dirty object list
			dirtyObjects = [];

			// clear the flag
			api.isDirty = false;
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
	game = (function() {
		// hold public stuff in our singletong
		var api = {};

		/*---------------------------------------------
			
			PRIVATE STUFF
				
			---------------------------------------------*/

		// ref to the "system" context
		var frameBuffer = null;

		// hold all the objects							
		var gameObjects = [];

		// hold number of object in the array
		var objCount = 0;

		// flag to redraw the sprites 
		var initialized = false;

		// to handle mouse event
		var registeredMouseEventObj = [];
      
		// to keep track of deferred stuff
		var pendingDefer = null;
      
		/*---------------------------------------------
			
			PUBLIC STUFF

			---------------------------------------------*/
		/**
		 * a reference to the game viewport.
		 * @public
		 * @type me.ViewportEntity
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
				frameBuffer = me.video.getScreenFrameBuffer();

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
			
			//cancel any pending task
			if (pendingDefer)
			{
				clearTimeout(pendingDefer);
			}
			pendingDefer = null;
         
			// initialized the object if not yet done
			if (!initialized)
				api.init();

			// remove all objects
			api.removeAll();

			// reset the viewport to zero ?
			if (api.viewport)
				api.viewport.reset();

			// re-add the HUD if defined
			if (api.HUD != null) {
				api.add(api.HUD);
			}

			// also reset the draw manager
			drawManager.reset();

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
				alert("WARNING : no collision map detected");
			}

			// add ou tile map object to the game mngr
			api.currentLevel.addTo(me.game);

			// change the viewport limit
			api.viewport.setBounds(api.currentLevel.realwidth,
					api.currentLevel.realheight);

			// load all game entities
			var objectGroups = api.currentLevel.getObjectGroups();
			for ( var group = 0; group < objectGroups.length; group++) {
				for ( var entity = 0; entity < objectGroups[group].objects.length; entity++) {
					api.addEntity(objectGroups[group].objects[entity],
							objectGroups[group].z);
				}
			}

			// sort all our stuff !!
			api.sort();

		};

		/**
		 * add object to the game manager
		 * @name me.game#add
		 * @public
		 * @function
		 */

		api.add = function(object, zOrder) {
			object.z = (zOrder) ? zOrder : object.z;

			// add the object in the game obj list
			gameObjects.push(object);

			// TO BE REMOVED
			if (object.mouseEvent) {
				// also add a reference in the object even list
				registeredMouseEventObj.push(object);
			}

			// cache the number of object
			objCount = gameObjects.length;

		};

		/**
		 * add an entity to the game manager
		 * @name me.game#addEntity
		 * @public
		 * @private
		 * @function
		 */
		api.addEntity = function(entityType, zOrder) {
			api.add(me.entityPool.newIstanceOf(entityType), zOrder);
		};
		
		/**
		 * returns the list of entities with the specified name<br>
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
			for (var i = objCount, obj; i--, obj = gameObjects[i];) {
				if(obj.isEntity && obj.name == entityName) {
					objList.push(obj);
				}
			}
			return objList;
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

		/**- 
		 * propagate mouse event to objects
		 * @private
		 */
		api.mouseEvent = function(x, y) {
			for ( var i = registeredMouseEventObj.length; i--;) {
				registeredMouseEventObj[i].mouseEvent(x, y);
			}
		};

		/**
		 * update all objects of the game manager
		 * @name me.game#update
		 * @private
		 * @function
		 */
		api.update = function() {
			// update the Frame counter
			me.timer.update();

			// loop through our objects
			for ( var i = objCount, obj; i--, obj = gameObjects[i];) {
				// check for previous rect before position change
				oldRect = (me.sys.dirtyRegion && obj.isEntity) ? obj.getRect() : null;
            
				// update our object
				updated = obj.update();

				// check if object is visible
				if (obj.isEntity && !obj.flickering) {
					obj.visible = api.viewport.isVisible(obj.collisionBox);
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
		 */
		api.remove = function(obj) {
			// check if object can be destroy
			if (!obj.destroy || obj.destroy()) {
				// make it invisible (this is bad...)
				obj.visible = false
				// ensure it won't be turn back to visible later
				// PS: may be use obj.alive instead ?
				obj.isEntity = false;
				
				// remove the object from the object to draw
				drawManager.remove(obj);

				if (obj.mouseEvent) {
				   // remove object from the mouse event list
				   registeredMouseEventObj.splice(registeredMouseEventObj.indexOf(obj), 1);
				}
				
				// remove the object from the object list
				/** @private */
				pendingDefer = function () 
				{
				   idx = gameObjects.indexOf(obj);
				   if (idx!=-1) {
					  gameObjects.splice(idx, 1);
					  // update the number of object
					  objCount = gameObjects.length;
				   }
				   pendingDefer = null;
				}.defer(obj);
			}
      };

		/**
		 * remove all objects
		 * @name me.game#removeAll
		 * @public
		 * @function
		 */

		api.removeAll = function() {
			//empty everything
			objCount = 0;
			gameObjects = [];
			registeredMouseEventObj = [];

			// make sure it's empty there as well
			drawManager.flush();

		};

		/**
		 * <p>Sort all objects (using object z property value).</p>
		 * <p>Normally all objects loaded through the LevelDirector are automatically sorted.
		 * this function is however usefull if you create and add object during the game.</p>
		 * @name me.game#sort
		 * @public
		 * @function
		 */

		api.sort = function() {
			// sort order is inverted, 
			// since we use a reverse loop for the display 
			gameObjects.sort(function(a, b) {
				return (b.z - a.z);
			});

			// make sure we redraw everything
			api.repaint();
		};

		/**
		 * check for collision between objects
		 * @name me.game#collide
		 * @public
		 * @function
		 * @param {me.ObjectEntity} obj Object to be tested for collision
		 * @return {me.Vector2d} collision vector {@link me.Rect#collideVsAABB}
		 * @example
		 * // update player movement
		 * this.updateMovement();
		 *
		 * // check for collision with other objects
		 * res = me.game.collide(this);
		 *
		 * // check if we collide with an enemy :
		 * if (res && (res.type == me.game.ENEMY_OBJECT))
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
		 *		
		 * }

		 */
		api.collide = function(objB) {
			var result = null;

			// this should be replace by a list of the 4 adjacent cell around the object requesting collision
			for ( var i = objCount, obj; i--, obj = gameObjects[i];)//for (var i = objlist.length; i-- ;)
			{
				if (obj.visible && obj.collidable && obj.isEntity)// && (obj!=objB))
				{
					// if return value != null, we have a collision
					if (result = obj.checkCollision(objB))
						// stop the loop return the value
						break;
				}
			}
			return result;

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
	 *                      ((context.canvas.width - logo_width) / 2), 
	 *                      (context.canvas.height + 60) / 2);
	 *   
	 *       // display a progressive loading bar
	 *       var width = Math.floor(this.loadPercent * context.canvas.width);
	 *     
	 *       // draw the progress bar
	 *       context.strokeStyle = "silver";
	 *       context.strokeRect(0, (context.canvas.height / 2) + 40, context.canvas.width, 6);
	 *       context.fillStyle = "#89b002";
	 *       context.fillRect(2, (context.canvas.height / 2) + 42, width-4, 2);
	 *    },
	 * });
	 *
	 */
	ScreenObject = Object.extend(
	/** @scope me.ScreenObject.prototype */
	{

		visible : true,
		addAsObject : false,
		

		rect : null,

		/**
		 *	initialization function
		 * @param {Boolean} [addAsObjet] add the object in the game manager object pool<br> 
		 * allowing to override the update & draw function to add specific treatment.
		 */

		init : function(addAsObject) {
			this.addAsObject = addAsObject;
			this.visible = (addAsObject === true) || false;
			this.rect = new me.Rect(new Vector2d(0, 0), 0, 0);
		},

		/** 
		 *	Object reset function
		 * @private
		 */
		reset : function() {

			// reset the game manager
			me.game.reset();

			// add our object to the GameObject Manager
			// allowing to benefit from the keyboard event stuff
			if (this.addAsObject) {
				// make sure it's visible
				this.visible = true;
				// update the rect size if added as an object
				this.rect = me.game.viewport.getRect();
				// add ourself !
				me.game.add(this, 999);
			}
			// call the onReset Function
			this.onResetEvent.apply(this, arguments);

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
			// object can be destroyed
			return true;
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
			// update the game object
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
	// expose our stuff to the global score
	$.me.ScreenObject = ScreenObject;

	/************************************************************************************/
	/*      Game App Manager                                                            */
	/*      Manage the basic logic of a game/app                                        */
	/************************************************************************************/

	/*---
	
	 	cross browser requestAnimationFrame/cancelRequestAnimFrame.

		---*/
	window.requestAnimFrame = (function() {
		return window.requestAnimationFrame
				|| window.webkitRequestAnimationFrame
				|| window.mozRequestAnimationFrame
				|| window.oRequestAnimationFrame
				|| window.msRequestAnimationFrame || function() {
					return -1;
				} // return -1 if unsupported
	})();

	window.cancelRequestAnimFrame = (function() {
		return window.cancelAnimationFrame
				|| window.webkitCancelRequestAnimationFrame
				|| window.mozCancelRequestAnimationFrame
				|| window.oCancelRequestAnimationFrame
				|| window.msCancelRequestAnimationFrame || function() {
					return -1;
				} // return -1 if unsupported
	})();

	/* -----

		the game State Manager (state machine)
			
		------	*/
	/**
	 * a State Manager (state machine)<p>
	 * There is no constructor function for me.state.
	 * @final
	 * @memberOf me
	 * @constructor Should not be called by the user.
	 */

	state = (function() {
		// hold public stuff in our singletong
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

		// cache reference to the active screen update frame
		var _fps = null;

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
					_animFrameId = window.requestAnimFrame(_renderFrame);

					if (_animFrameId != -1) {
						return;
					}
					// else feature not supported !

					// disable use of requestAnimationFrame (since unsupported)
					me.sys.useNativeAnimFrame = false;
					//console.log("using setInterval as fallback ("+_animFrameId+")");
				}

				// setup the game loop using setInterval
				_intervalId = setInterval(_activeUpdateFrame, _fps);
			}
		}
		;

		/**
		 * @ignore
		 * this is only called when using requestAnimFrame stuff
		 */
		function _renderFrame() {
			_activeUpdateFrame();
			// we already checked it was supported earlier
			// so no need to do it again here
			window.requestAnimFrame(_renderFrame);
		}
		;

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
				cancelRequestAnimFrame(_animFrameId);
				_animFrameId = -1;
			}

		}
		;

		/**
		 * start the SO main loop
		 * @ignore
		 */
		function _switchState(state) {
			// clear previous interval if any
			_stopRunLoop();

			// call the screen object destroy method
			if (_screenObject[_state]) {
				if (_screenObject[_state].screen.visible)
					me.game.remove(_screenObject[_state].screen);
				else
					_screenObject[_state].screen.destroy();
			}
			
			
			// set the global variable
			_state = state;
			
			// call the reset function with _extraArgs as arguments
			_screenObject[_state].screen.reset.apply(_screenObject[_state].screen, _extraArgs);

			// cache the new screen object update function
			_activeUpdateFrame = _screenObject[_state].screen.onUpdateFrame;

			// and start the main loop of the 
			// new requested state
			_startRunLoop();

			// execute callback if defined
			if (_onSwitchComplete) {
				_onSwitchComplete();
			}
			
			// force repaint
			me.game.repaint();
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
				if (_state != obj.LOADING) {
					obj.pause(true);

					// callback?
					if (obj.onPause)
						obj.onPause();

				}
			}, false);
			// set play action on gaining focus
			$.addEventListener("focus", function() {
				// only in case we are not loading stuff
				if (_state != obj.LOADING) {
					obj.resume(true);

					// callback?
					if (obj.onResume)
						obj.onResume();

					// force repaint
					me.game.repaint();

				}
			}, false);

			// cache the FPS information
			_fps = ~~(1000 / me.sys.fps);
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
			_startRunLoop(_state);
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
		 * @name me.state#set
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
		 * @param {Int}	 duration (e.g. 15) 
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
			switch (state) {
				case obj.LOADING:
				case obj.MENU:
				case obj.PLAY:
				case obj.READY:
				case obj.GAMEOVER:
				case obj.GAME_END:
				case obj.SCORE:
				case obj.CREDITS:
				case obj.SETTINGS: {

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
									_switchState(state);
								});

					}
					// else just switch without any effects
					else {
						// wait for the last frame to be
						// "finished" before switching
						_switchState.defer(state);
						
					}

					break;
				}

				default: {
					break;
				}
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
	// expose our stuff to the global scope
	/*---------------------------------------------------------*/
	$.me.state = state;
	$.me.game = game;

	/*---------------------------------------------------------*/
	// END END END
	/*---------------------------------------------------------*/
})(window);
/*
 * MelonJS Game Engine
 * Copyright (C) 2011, Olivier BIOT
 * http://www.melonjs.org
 *
 *
 */

(function($, undefined) {

	/************************************************************************************/
	/*            a default loading screen                                              */
	/************************************************************************************/
	var DefaultLoadingScreen = me.ScreenObject.extend({
		/*---
		
			constructor
			
			---*/
		init : function() {
			this.parent(true);
			// melonJS logo
			this.logo1 = new me.Font('century gothic', 32, 'white');
			this.logo2 = new me.Font('century gothic', 32, '#89b002');
			this.logo2.bold();

			// flag to know if we need to refresh the display
			this.invalidate = false;

			// load progress in percent
			this.loadPercent = 0;

			// setup a callback
			me.loader.onProgress = this.onProgressUpdate.bind(this);

		},

		// destroy object at end of loading
		onDestroyEvent : function() {
			// "nullify" all fonts
			this.logo1 = this.logo2 = null;
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
			var y = context.canvas.height / 2;

			me.video.clearSurface(context, "black");

			// measure the logo size
			logo1_width = this.logo1.measureText(context, "melon").width;
			logo_width = logo1_width
					+ this.logo2.measureText(context, "JS").width

			// draw the melonJS logo
			this.logo1.draw(context, 'melon',
					((context.canvas.width - logo_width) / 2),
					(context.canvas.height + 60) / 2);
			this.logo2.draw(context, 'JS',
					((context.canvas.width - logo_width) / 2) + logo1_width,
					(context.canvas.height + 60) / 2);
			// add the height of the logo
			y += 40;

			// display a progressive loading bar
			var width = Math.floor(this.loadPercent * context.canvas.width);

			// draw the progress bar
			context.strokeStyle = "silver";
			context.strokeRect(0, y, context.canvas.width, 6);
			context.fillStyle = "#89b002";
			context.fillRect(2, y + 2, width - 4, 2);
		},

	});

	/************************************************************************************/
	/*			PRELOADER SINGLETON																			*/
	/************************************************************************************/

	/**
	 * a small class to manage loading of stuff and manage resources
	 * There is no constructor function for me.input.
	 * @final
	 * @memberOf me
	 * @constructor Should not be called by the user.
	 */

	loader = (function() {
		// hold public stuff in our singletong
		var obj = {};

		// contains all the images loaded
		var imgList = [];
		// contains all the xml loaded
		var xmlList = {};
		// flag to check loading status
		var resourceCount = 0;
		var loadCount = 0;
		var timerId = 0;
		// keep track of how much TMX file we are loading
		var tmxCount = 0;

		/* ---
		
			check the loading status
			
			---										*/
		function checkLoadStatus() {
			// remove tmxCount from the total resource to be loaded
			// as we will after load each TMX into the level director
			if (loadCount == (resourceCount - tmxCount)) {

				// add all TMX level into the level Director
				for ( var xmlObj in xmlList) {
					if (xmlList[xmlObj].isTMX) {
						//console.log("un TMX!", xmlObj);
						me.levelDirector.addTMXLevel(xmlObj);

						//progress notification
						obj.onResourceLoaded();
					}
				}

				// wait 1/2s and execute callback (cheap workaround to ensure everything is loaded)
				if (obj.onload) {
					timerId = setTimeout(obj.onload, 300);
				} else
					alert("no load callback defined");
			} else {
				timerId = setTimeout(checkLoadStatus, 100);
			}
		}
		;

		/* ---
		
			some callback for image loading	
			 error	
			---										*/
		function onImageError(e) {
			// retry mechanism with image loading ???
			throw "melonJS: Failed loading image resource";
		}
		;

		/* ---
		
			load Images
			
			call example : 
			
			preloadImages(
						 [{name: 'image1', src: 'images/image1.png'},
						  {name: 'image1', src: 'images/image1.png'},
						  {name: 'image1', src: 'images/image1.png'},
						  {name: 'image1', src: 'images/image1.png'}]);
			
			---										*/

		function preloadImage(img) {
			// create new Image object and add to array
			imgList.push(img.name);

			imgList[img.name] = new Image();
			imgList[img.name].onload = obj.onResourceLoaded.bind(obj);
			imgList[img.name].onerror = onImageError.bind(this);
			imgList[img.name].src = img.src + me.nocache;
		}
		;

		/* ---
		
			preload XML files
			---									*/

		function preloadXML(xmlData, isTMX) {
			if ($.XMLHttpRequest) {
				// code for IE7+, Firefox, Chrome, Opera, Safari
				xmlhttp = new XMLHttpRequest();
				// to ensure our document is treated as a XML file
				if (xmlhttp.overrideMimeType)
					xmlhttp.overrideMimeType('text/xml');
			} else {
				// code for IE6, IE5
				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
				// I actually don't give a **** about IE5/IE6...
			}
			// load our XML
			xmlhttp.open("GET", xmlData.src + me.nocache, false);
			xmlhttp.onload = obj.onResourceLoaded.bind(obj);
			xmlhttp.send();

			// set the xmldoc in the array
			xmlList[xmlData.name] = {};
			xmlList[xmlData.name].xml = xmlhttp.responseText;
			xmlList[xmlData.name].isTMX = isTMX || false;
			// in case we have a TMX file :
			if (xmlList[xmlData.name].isTMX) {
				// increase the resourceCount by 1
				// allowing to add the loading of level in the 
				// levelDirector as part of the loading progress
				resourceCount += 1;
				tmxCount += 1;
			}
		}
		;

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
			if (obj.onProgress) {
				// pass the load progress in percent, as parameter
				obj.onProgress(obj.getLoadProgress());
			}
		};

		/**
		 * set all the specified game resources to be preloaded.<br>
		 * each resource item must contain the following fields :<br>
		 * - name    : internal name of the resource<br>
		 * - type    : "image", "tmx", "audio"<br>
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
		 * var g_resources = [ {name: "tileset-platformer",  type:"image",  src: "data/map/tileset-platformer.png"},
		 *                     {name: "map1",                type: "tmx",   src: "data/map/map1_slopes.tmx"},
		 *                     {name: "cling",               type: "audio", src: "data/audio/",	channel : 2}
		 *                    ]; 
		 * ...
		 *
		 * // set all resources to be loaded
		 * me.loader.preload(g_resources);
		 */

		obj.preload = function(res) {
			// set the callback for audio stuff
			me.audio.setLoadCallback(obj.onResourceLoaded.bind(obj));

			// parse the resources
			for ( var i = 0; i < res.length; i++) {
				switch (res[i].type) {
				case "image":
					preloadImage(res[i]);
					resourceCount += 1;
					break;

				case "audio":
					// only load is sound is enable
					if (me.audio.isAudioEnable()) {
						me.audio.load(res[i]);
						resourceCount += 1;
					}
					break;

				case "tmx":
					preloadXML(res[i], true);
					resourceCount += 1;
					break;

				default:
					throw "melonJS: loader : unknow resource type : %s"
							+ res[i].type;
					break;
				}
			}
			;

			// check load status
			checkLoadStatus();
		};

		/**
		 * return the specified XML object
		 * @name me.loader#getXML
		 * @public
		 * @function
		 * @param {String} xmlfile name of the xml element ("map1");
		 * @return {Xml} 
		 */
		obj.getXML = function(elt) {
			if (xmlList != null)
				return xmlList[elt].xml;
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
			if (imgList[elt] != null) {
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
	// expose our stuff to the global scope
	/*---------------------------------------------------------*/
	$.me.loader = loader;
	$.me.DefaultLoadingScreen = DefaultLoadingScreen;

	/*---------------------------------------------------------*/
	// END END END
	/*---------------------------------------------------------*/
})(window);
/*
 * MelonJS Game Engine
 * Copyright (C) 2011, Olivier BIOT
 * http://www.melonjs.org
 *
 *
 */

(function($, undefined) {

	/************************************************************************************/
	/*                                                                                  */
	/*      a vector2D Object                                                           */
	/*                                                                                  */
	/************************************************************************************/
	/**
	 * a 2D Vector Object
	 * @class
	 * @extends Object
	 * @memberOf me
	 * @constructor
	 * @param {int} x x position of the vector
	 * @param {int} y y position of the vector
	 */
	Vector2d = Object.extend(
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
		init : function(/**Int*/
		x, /**Int*/
		y) {
			this.x = x || 0;
			this.y = y || 0;
		},

		set : function(/**Int*/
		x, /**Int*/
		y) {
			this.x = x;
			this.y = y;
		},

		setZero : function() {
			this.set(0, 0);

		},

		setV : function(/**me.Vector2d*/
		v) {
			this.x = v.x;
			this.y = v.y;
		},

		add : function(/**me.Vector2d*/
		v) {
			this.x += v.x;
			this.y += v.y;
		},

		sub : function(/**me.Vector2d*/
		v) {
			this.x -= v.x;
			this.y -= v.y;
		},

		scale : function(/**me.Vector2d*/
		v) {
			this.x *= v.x;
			this.y *= v.y;
		},

		div : function(/**Int*/
		n) {
			this.x /= n;
			this.y /= n;
		},

		abs : function() {
			if (this.x < 0)
				this.x = -this.x;
			if (this.y < 0)
				this.y = -this.y;
		},

		/** @return {me.Vector2D} */
		clamp : function(low, high) {
			return new Vector2d(this.x.clamp(low, high), this.y
					.clamp(low, high));
		},

		minV : function(/**me.Vector2d*/ v) {
			this.x = this.x < v.x ? this.x : v.x;
			this.y = this.y < v.y ? this.y : v.y;
		},

		maxV : function(/**me.Vector2d*/ v) {
			this.x = this.x > v.x ? this.x : v.x;
			this.y = this.y > v.y ? this.y : v.y;
		},

		/** @return {me.Vector2D} */
		negate : function() {
			return new Vector2d(-this.x, -this.y);
		},

		negateSelf : function() {
			this.x = -this.x;
			this.y = -this.y;
		},

		//copy() copies the x,y values of another instance to this
		copy : function(/**me.Vector2d*/ v) {
			this.x = v.x;
			this.y = v.y;
		},

		/** @return {int} */
		length : function() {
			return Math.sqrt(this.x * this.x + this.y * this.y);
		},

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

		/** @return {int} */
		dotProduct : function(/**me.Vector2d*/ v) {
			return this.x * v.x + this.y * v.y;
		},

		/** @return {int} */
		distance : function(/**me.Vector2d*/ v) {
			return Math.sqrt((this.x - v.x) * (this.x - v.x) + (this.y - v.y) * (this.y - v.y));
		},

		/** @return {me.Vector2d} */
		clone : function() {
			return new Vector2d(this.x, this.y);
		},

		/** @return {String} */
		toString : function() {
			return 'x:' + this.x + 'y:' + this.y;
		},

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
	Rect = Object
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
				left : null,

				/**
				 * right coordinate of the Rectange<br>
				 * takes in account the adjusted size of the rectangle (if set)
				 * @public
				 * @type Int
				 * @name me.Rect#right
				 */
				right : null,

				/**
				 * top coordinate of the Rectange<br>
				 * takes in account the adjusted size of the rectangle (if set)
				 * @public
				 * @type Int
				 * @name me.Rect#top
				 */
				top : null,

				/**
				 * bottom coordinate of the Rectange<br>
				 * takes in account the adjusted size of the rectangle (if set)
				 * @public
				 * @type Int
				 * @name me.Rect#bottom
				 */
				bottom : null,

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
					this.colPos = new Vector2d();

					this.width = w;
					this.height = h;

					// full width/height
					/*
					this.fWidth = w;
					this.fHeight = h;
					 */
					// half width/height
					this.hWidth = ~~(w / 2);
					this.hHeight = ~~(h / 2);

					
					// some properties to ease my life when getting the rectangle coordinates /**
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
				 * return a new Rect with this rectangle coordinates<
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
					x1 = Math.min(this.pos.x, r.pos.x);
					y1 = Math.min(this.pos.y, r.pos.y);

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

						// redefine our properties taking colPos into account
						Object.defineProperty(this, "left", {
							get : function() {
								return this.pos.x + this.colPos.x;
							},
							configurable : true
						});
						Object.defineProperty(this, "right", {
							get : function() {
								return this.pos.x + this.colPos.x + this.width;
							},
							configurable : true
						});
					}
					if (y != -1) {
						this.colPos.y = y;
						this.height = h;
						this.hHeight = ~~(this.height / 2);
						// redefine our properties taking colPos into account
						Object.defineProperty(this, "top", {
							get : function() {
								return this.pos.y + this.colPos.y;
							},
							configurable : true
						});
						Object.defineProperty(this, "bottom",
								{
									get : function() {
										return this.pos.y + this.colPos.y
												+ this.height;
									},
									configurable : true
								});
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
				 * check if this rectangle is intersecting with the specified one
				 * @private
				 * @param  {me.Rect} rect
				 * @return {boolean} true if intersecting
				 */
				checkAxisAligned : function(r) 
				{
					return (this.left < r.right && 
							r.left < this.right && 
							this.top < r.bottom &&
							r.top < this.bottom);
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
					p = new Vector2d(0, 0);

					// check if both box are overlaping
					if (this.checkAxisAligned(rect)) {
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
				 * @private
				 * debug purpose
				 */
				draw : function(context, color) {
					// draw the rectangle
					context.strokeStyle = color || "red";
					context.strokeRect(this.left - me.game.viewport.pos.x,
							this.top - me.game.viewport.pos.y, this.width,
							this.height);

				}
			});
	/*---------------------------------------------------------*/
	// expose our stuff to the global scope
	/*---------------------------------------------------------*/
	$.me.Vector2d = Vector2d;
	$.me.Rect = Rect;

	/*---------------------------------------------------------*/
	// END END END
	/*---------------------------------------------------------*/
})(window);
/*
 * MelonJS Game Engine
 * Copyright (C) 2011, Olivier BIOT
 * http://www.melonjs.org
 *
 */

(function($, undefined) {
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
	ViewportEntity = me.Rect
			.extend(
			/** @scope me.ViewportEntity.prototype */
			{

				/**
				 *	Axis constant
				 * @public
				 * type enum
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
					this.parent(new me.Vector2d(minX, minY), maxX - minX, maxY
							- minY);

					// keep track of camera update
					this.last = new me.Vector2d(-1, -1);

					// real worl limits
					this.limits = new me.Vector2d(realw || this.width, realh
							|| this.height);

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
						alpha : 0,
						duration : 0,
						onComplete : null
					};
					// fade variables
					this._fadeIn = {
						color : 0,
						alpha : 0,
						duration : 0,
						onComplete : null
					};

					// set a default deadzone
					this.setDeadzone(this.width / 6, this.height / 6);
				},

				// -- some private function ---

				/** @private */
				_followH : function(target) {
					if ((target.x - this.pos.x) > (this._deadwidth))
						this.pos.x = ~~MIN((target.x) - (this._deadwidth),
								this._limitwidth);
					else if ((target.x - this.pos.x) < (this.deadzone.x))
						this.pos.x = ~~MAX((target.x) - this.deadzone.x, 0);
				},

				/** @private */
				_followV : function(target) {
					if ((target.y - this.pos.y) > (this._deadheight))
						this.pos.y = ~~MIN((target.y) - (this._deadheight),
								this._limitheight);
					else if ((target.y - this.pos.y) < (this.deadzone.y))
						this.pos.y = ~~MAX((target.y) - this.deadzone.y, 0);
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

					// reset our position "tracker"
					this.last.set(-1, -1);

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
				 * @param {Object} Object Entity to follow
				 * @param {axis} [axis="AXIS.BOTH"] AXIS.HORIZONTAL, AXIS.VERTICAL, AXIS.BOTH
				 */

				follow : function(target, axis) {
					this.target = target;
					// if axis is null, camera is moved on target center
					this.follow_axis = axis || this.AXIS.NONE;
				},

				/**
				 *	move the viewport to the specified coordinates
				 * @param {int} x
				 * @param {int} y
				 */

				move : function(x, y) {
					newx = ~~(this.pos.x + x);
					newy = ~~(this.pos.y + y);

					if ((newx >= 0) && (newx <= this._limitwidth))
						this.pos.x = newx;

					if ((newy >= 0) && (newy <= this._limitheight))
						this.pos.y = newy;
				},

				/** @private */
				update : function(updateTarget) {
					if (this.target && updateTarget) {
						switch (this.follow_axis) {
						case this.AXIS.NONE:
							//this.focusOn(this.target);
							break;

						case this.AXIS.HORIZONTAL:
							this._followH(this.target,
									(this._shake.duration > 0));
							break;

						case this.AXIS.VERTICAL:
							this._followV(this.target,
									(this._shake.duration > 0));
							break;

						case this.AXIS.BOTH:
							this._followH(this.target,
									(this._shake.duration > 0));
							this._followV(this.target,
									(this._shake.duration > 0));
							break;

						default:
							break;
						}
						// check if the viewport position has changed (scrolling level)
						updateTarget = (this.last.x != this.pos.x)
								|| (this.last.y != this.pos.y)
						// and keep track of last position for the next update
						this.last.copy(this.pos);
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

					// check for fade effect
					if (this._fadeIn.alpha < 1.0) {
						this._fadeIn.alpha += me.timer.tick
								/ this._fadeIn.duration;
						if (this._fadeIn.alpha >= 1.0) {
							this._fadeIn.alpha = 1.0;
							if (this._fadeIn.onComplete)
								this._fadeIn.onComplete();
						}
						// updated!
						updateTarget = true;
					}

					// and for flash effect
					if (this._fadeOut.alpha > 0.0) {
						this._fadeOut.alpha -= me.timer.tick
								/ this._fadeOut.duration;
						if (this._fadeOut.alpha <= 0.0) {
							this._fadeOut.alpha = 0.0;
							if (this._fadeOut.onComplete)
								this._fadeOut.onComplete();
						}
						// updated!
						updateTarget = true;
					}

					// return same value that the one given
					// so that we only force it to true
					// if we used any effect (e.g. shake, fading, etc...)
					return updateTarget;
				},

				/**
				 *	shake the camera 
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
				 *	fadeOut(flash) effect<p>
				 * screen is filled with the specified color and slowy goes back to normal
				 * @param {int} color
				 * @param {int} [duration="30"]
				 * @param {function} [onComplete] callback once effect is over
				 */

				fadeOut : function(color, duration, onComplete) {
					this._fadeOut.color = color;
					this._fadeOut.duration = duration || 30;
					this._fadeOut.alpha = 1.0;
					this._fadeOut.onComplete = onComplete || null;

				},

				/**
				 *	fadeIn effect <p>
				 * fade to the specified color
				 * @param {int} color
				 * @param {int} [duration="30"]
				 * @param {function} [onComplete] callback once effect is over
				 */

				fadeIn : function(color, duration, onComplete) {
					this._fadeIn.color = color;
					this._fadeIn.duration = duration || 30;
					this._fadeIn.alpha = 0.0;
					this._fadeIn.onComplete = onComplete || null;
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
					return this.checkAxisAligned(rect);
				},

				/**
				 * @private
				 *	render the camera effects
				 */
				draw : function(context) {
					// fading effect
					if (this._fadeIn.alpha < 1.0) {
						if (me.sys.enableWebGL) {
							// don't use global alpha with webgl
							me.video.clearSurface(context, me.utils.HexToRGB(
									this._fadeIn.color, this._fadeIn.alpha));
						} else {
							context.globalAlpha = this._fadeIn.alpha;
							me.video.clearSurface(context, me.utils
									.HexToRGB(this._fadeIn.color));
							// set back full opacity
							context.globalAlpha = 1.0;
						}
					}
					// flashing effect
					if (this._fadeOut.alpha > 0.0) {
						if (me.sys.enableWebGL) {
							// don't use global alpha with webgl
							me.video.clearSurface(context, me.utils.HexToRGB(
									this._fadeOut.color, this._fadeOut.alpha));
						} else {
							context.globalAlpha = this._fadeOut.alpha;
							me.video.clearSurface(context, me.utils
									.HexToRGB(this._fadeOut.color));
							// set back full opacity
							context.globalAlpha = 1.0;
						}
					}
				}

			});
	/*---------------------------------------------------------*/
	// expose our stuff to the global scope
	/*---------------------------------------------------------*/
	$.me.Viewport = ViewportEntity;
	/*---------------------------------------------------------*/
	// END END END
	/*---------------------------------------------------------*/
})(window);
/*
 * MelonJS Game Engine
 * Copyright (C) 2011, Olivier BIOT
 * http://www.melonjs.org
 *
 *
 * Entity Objects
 *
 * BIG WORK IN PROGRESS :):):)
 *
 */

(function($, undefined) {
	// some ref shortcut
	var MIN = Math.min;

	/**
	 * me.ObjectSettings contains the object attributes defined in Tiled<br>
	 * and is created by the engine and passed as parameter to the corresponding object when loading a level<br>
	 * the field marked Mandatory are to be defined either in Tiled, or in the before calling the parent constructor
	 * <img src="object_properties.png"/><br>
	 * @final
	 * @memberOf me
	 * @constructor Should not be called by the user.
	 */
	ObjectSettings = {
		/**
		 * object entity name<br>
		 * OPTIONAL
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
		 * size of a single sprite in the spritesheet<br>
		 * MANDATORY<br>
		 * (in case of TiledObject, this field is automatically set)
		 * @public
		 * @type {Int}
		 * @name me.ObjectSettings#spritewidth
		 */
		spritewidth : null,

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
	me.ObjectSettings = ObjectSettings;

	/************************************************************************************/
	/*		a pool of entity																					*/
	/*    allowing to add new entity at runtime														*/
	/************************************************************************************/
	/**
	 * a pool of object entity <br>
	 * this object is used by the engine to instanciate object defined in the map<br>
	 * which means, that on level loading the engine will try to instanciate every object<br>
	 * found in the map, based on the user defined name in each Object Properties<br>
	 * <img src="object_properties.png"/><br>
	 * There is no constructor function for me.entityPool, this is a static object
	 * @final
	 * @memberOf me
	 * @constructor Should not be called by the user.
	 */
	entityPool = (function() {
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
			obj.add("me.LevelEntity", LevelEntity);
			obj.add("me.ObjectEntity", ObjectEntity);
			obj.add("me.CollectableEntity", CollectableEntity);
			obj.add("me.InvisibleEntity", InvisibleEntity);
		};

		/**
		 * add an object to the pool
		 * @name me.entityPool#add
		 * @public
		 * @function
		 * @param {String} className as defined in the Name fied of the Object Properties (in Tiled)
		 * @param {Object} object corresponding Object to be instanciated
		 * @example
		 * // add our users defined entities in the entity pool
		 * me.entityPool.add("playerspawnpoint", PlayerEntity);
		 * me.entityPool.add("cherryentity", CherryEntity);
		 * me.entityPool.add("heartentity", HeartEntity);
		 * me.entityPool.add("starentity", StarEntity);
		 */
		obj.add = function(className, entityObj) {
			entityClass[className.toLowerCase()] = entityObj;
		};

		/**
		 *	return a new instance of the requested object
		 * @private	
		 */

		obj.newIstanceOf = function(prop) {
			if (!entityClass[prop.name]) {
				alert("cannot instance entity of type '" + prop.name
						+ "': Class not found!");
				return null;
			}
			// i should pass the entity ownProperty instead of the object itself
			return new entityClass[prop.name](prop.x, prop.y, prop);
		};

		// return our object
		return obj;

	})();
	// expose our object to our scope
	$.me.entityPool = entityPool;

	/************************************************************************/
	/*      a parallax layer object entity                                  */
	/************************************************************************/
	/**
	 * @ignore
	 */
	ParallaxLayer = me.Rect.extend({
		/**
		 * @ignore 
		 */
		init : function(imagesrc, speed, zOrder) {
			// image..
			this.image = me.loader.getImage(imagesrc);

			// call the parent constructor
			this.parent(new me.Vector2d(0, 0), this.image.width,
					this.image.height);

			// base x offset within the image 
			this.baseOffset = 0;

			// z Index
			this.z = zOrder || 0;

			// layer scroll speed
			this.scrollspeed = speed;

			// link to the gameviewport width
			this.vp_width = me.game.viewport.width;
		},

		/*--
		
		   draw the layer
		   x coordinate is the current base offset in the texture
		 
		--*/
		draw : function(context, x, y) {
			// all this part should redone !
			var xpos = 0;
			var new_width = MIN(this.width - x, this.vp_width);
			do {
				context.drawImage(this.image, x, 0, new_width, this.height,
						xpos, y, new_width, this.height);

				xpos += new_width;
				x = 0; // x_offset
				new_width = MIN(this.width, this.vp_width - xpos);
			} while ((xpos < this.vp_width));
		}

	});
	/************************************************************************************/
	/*      a very basic & cheap parallax object entity                                 */
	/*      to be rewritten, this code is not optimized at all                          */
	/************************************************************************************/
	/**
	 * @constructor
	 * @memberOf me
	 *	@param {int} [z="0"] z order value for the parallax background
	 */
	ParallaxBackgroundEntity = me.Rect
			.extend({
				/**
				 * @ignore 
				 */
				init : function(z) {
					// call the parent constructor
					this.parent(new me.Vector2d(0, 0), 0, 0);

					// to identify the layer in the tilemap system
					this.name = "parallaxBackgroundEntity";

					this.visible = true;

					// z Index
					this.z = z || 0;

					// link to the gameviewport
					this.vp = me.game.viewport.pos;

					// hold the last x position (to track viewport change)
					this.lastx = this.vp.x;

					// hold all defined animation
					this.parallaxLayers = [];

					// keep track of background update (scroll)
					this.updated = true;
				},

				/**
				 * add a layer to the parallax
				 */
				addLayer : function(imagesrc, speed, zOrder) {
					var idx = this.parallaxLayers.length;
					// create the new layer
					this.parallaxLayers.push(new ParallaxLayer(imagesrc, speed,
							zOrder));

					// check if new layer is bigger than the current rect size
					if (this.parallaxLayers[idx].width > this.width) {
						// and adjust rect size if necessary
						this.width = this.parallaxLayers[idx].width;
					}
					if (this.parallaxLayers[idx].height > this.height) {
						// and adjust rect size if necessary
						this.height = this.parallaxLayers[idx].height;
					}
				},

				/**
				 * @private
				 */
				clearTile : function(x, y) {
					;// do nothing !
				},

				/**
				 * this method is called by the @see me.game object
				 * @protected
				 */
				update : function() {
					return this.updated;
				},

				/**
				 * override the default me.Rect get Rectangle definition
				 * since the layer if a scrolling object
				 * (is this correct?)
				 * @return {me.Rect} new rectangle	
				 */

				getRect : function() {
					return new me.Rect(this.vp.clone(), this.width, this.height);
				},

				/**
				 * draw the parallax object on the specified context
				 * @param {context} context 2D Context
				 * @protected
				 */
				draw : function(context) {
					// last x pos of the viewport
					x = this.vp.x;

					if (x > this.lastx) {
						// going right
						for ( var i = 0, layer; layer = this.parallaxLayers[i++];) {
							// calculate the new basoffset
							layer.baseOffset = (layer.baseOffset + layer.scrollspeed
									* me.timer.tick)
									% layer.width;
							// draw the layer
							layer.draw(context, ~~layer.baseOffset, 0);
							// save the last x pos
							this.lastx = x;
							// flag as updated
							this.updated = true;
						}
						return;
					} else if (x < this.lastx) {
						// going left
						for ( var i = 0, layer; layer = this.parallaxLayers[i++];) {
							// calculate the new basoffset
							layer.baseOffset = (layer.width + (layer.baseOffset - layer.scrollspeed
									* me.timer.tick))
									% layer.width;
							// draw the layer
							layer.draw(context, ~~layer.baseOffset, 0);
							// save the last x pos
							this.lastx = x;
							// flag as updated
							this.updated = true;
						}
						return;

					}

					// else nothing changes
					for ( var i = 0, layer; layer = this.parallaxLayers[i++];) {
						// draw the layer
						layer.draw(context, ~~layer.baseOffset, 0);
						// save the last x pos
						this.lastx = x;
						// flag as not updated
						this.updated = false;
					}
				}

			});
	// expose our object to me scope
	$.me.ParallaxBackgroundEntity = ParallaxBackgroundEntity

	/**
	 * A Simple object to display static or animated sprite on screen.
	 * @class
	 * @extends me.Rect
	 * @memberOf me
	 * @constructor
	 * @param {int} x the x coordinates of the sprite object
	 * @param {int} y the y coordinates of the sprite object
	 * @param {me.loader#getImage} image reference to the Sprite Image
	 * @param {int} [spritewidth] size of a single sprite inside the provided image
	 * @example
	 * // create a static Sprite Object
	 * mySprite = new SpriteObject (100, 100, me.loader.getImage("mySpriteImage"));
	 * // create a animated Sprite Object
	 * mySprite = new SpriteObject (100, 100, me.loader.getImage("mySpriteImage"), 64);
	 
	 */
	SpriteObject = me.Rect
			.extend(
			/** @scope me.SpriteObject.prototype */
			{
				// default pos & scale of the object
				//pos		: null,
				scale : null,

				// just to keep track of when we flip
				lastflipX : false,
				lastflipY : false,

				// z position (for ordering display)
				z : 0,

				// offset of the sprite to be displayed
				currentSprite : 0,
				currentSpriteOff : 0,

				// if true, image scaling is needed
				scaleFlag : false,

				/**
				 * a flag that can prevent the object to be destroyed<br>
				 * if set to false, the objet won't be destroy when calling me.game.remove(obj)<br>
				 * default value : true
				 * @public
				 * @type Boolean
				 * @name me.SpriteObject#autodestroy
				 */
				autodestroy : true,

				/**
				 * the visible state of the object<br>
				 * default value : true
				 * @public
				 * @type Boolean
				 * @name me.SpriteObject#visible
				 */
				visible : true,

				// image reference
				image : null,

				// create a a default collision rectangle
				// this object is useless here, but low level
				// function like flipX need to take this in account
				collisionBox : null,

				// a reference to the game vp 
				vp : null,

				// count the fps and manage animation change
				fpscount : 0,

				// animation cyling speed
				animationspeed : 0,

				/**
				 * @ignore 
				 */
				init : function(x, y, image, spritewidth) {

					// call the parent constructor
					this.parent(new me.Vector2d(x, y), spritewidth
							|| image.width, image.height);

					// cache image reference
					this.image = image;

					// #sprite in the image  
					this.spritecount = spritewidth ? ~~(image.width / spritewidth)
							: 1;

					// scale factor of the object
					this.scale = new me.Vector2d(1.0, 1.0);

					// create a a default collision rectangle
					this.collisionBox = new me.Rect(this.pos, this.width,
							this.height);

					// get a reference to the current viewport
					this.vp = me.game.viewport;

					// default animation speed
					this.animationspeed = me.sys.fps / 10;

					// set the current sprite index & offset
					this.currentSprite = 0, this.currentSpriteOff = 0;

					// if one single image, disable animation
					if (this.image.width == spritewidth) {
						this.update = function() {
							return false;
						}
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

						// flip ourself
						//this.parent(this.width);

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
						this.lastflipY = flip;

						// invert the scale.x value
						this.scale.y = -this.scale.y;

						// set the scaleFlag
						this.scaleFlag = ((this.scale.x != 1.0) || (this.scale.y != 1.0))

						// flip ourself
						//this.parent(this.height);

						// flip the collision box
						this.collisionBox.flipY(this.height);

					}
				},

				/*---
				
				  scale the object
				 
					NOT WORKING FOR NOW...
				 ---
				scale : function(x, y)
				{
					this.scale_x = this.scale_x < 0.0 ? -x : x;
					this.scale_y = this.scale_y < 0.0 ? -y : y;
					// set the scaleFlag
					this.scaleFlag = ((this.scale_x!= 1.0)  || (this.scale_y!= 1.0))
				};
				 */

				/**
				 * set the current sprite
				 * @private
				 */

				setCurrentSprite : function(s) {
					this.currentSprite = s;
					this.currentSpriteOff = this.width * s;
				},

				/**
				 * sprite update (animation update)<br>
				 * not to be called by the end user<br>
				 * called by the game manager on each game loop
				 * @protected
				 * @return true if object state changed (position, animation, etc...)
				 **/
				update : function() {
					if (this.visible && (this.fpscount++ > this.animationspeed)) {
						//this.setCurrentSprite(++this.currentSprite < this.spritecount ? this.currentSprite : 0);
						this.setCurrentSprite(++this.currentSprite
								% this.spritecount);
						this.fpscount = 0;
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
					var xpos = this.pos.x - this.vp.pos.x, ypos = this.pos.y
							- this.vp.pos.y;

					if (this.scaleFlag) {
						context.scale(this.scale.x, this.scale.y);

						/*
						 ...??????
						context.translate( - this.width - ((this.width * this.scale_x)),
													 this.height -((this.height * this.scale_y)));
						 */

						xpos = (xpos * this.scale.x)
								- (this.scale.x < 0 ? this.width : 0);
						ypos = (ypos * this.scale.y)
								- (this.scale.y < 0 ? this.height : 0);

					}

					context.drawImage(this.image, this.currentSpriteOff, 0,
							this.width, this.height, ~~xpos, ~~ypos,
							this.width, this.height);

					if (this.scaleFlag) {
						// restore the transform matrix to the normal one
						context.setTransform(1, 0, 0, 1, 0, 0);
					}

					if (me.debug.renderHitBox) {

						// draw the sprite rectangle
						this.parent(context, "blue");
						// draw the collisionBox
						this.collisionBox.draw(context, "red");
					}
				},

				/**
				 * Destroy function<br>
				 * object is only removed if the autodestroy flag is set (to be removed, useless)
				 * @private
				 */
				destroy : function() {
					// if object can be destroyed
					if (this.autodestroy) {
						// call the destroy notification function
						this.onDestroyEvent();
					}
					return this.autodestroy;
				},

				/**
				 * OnDestroy Notification function<br>
				 * Called by engine before deleting the object
				 */
				onDestroyEvent : function() {
					;// to be extended !
				}

			});
	$.me.SpriteObject = SpriteObject;

	/************************************************************************************/
	/*                                                                                  */
	/*      a generic object entity                                                     */
	/*                                                                                  */
	/************************************************************************************/
	/**
	 * an object to manage animation
	 * @class
	 * @extends me.SpriteObject
	 * @memberOf me
	 * @constructor
	 * @param {int} x the x coordinates of the sprite object
	 * @param {int} y the y coordinates of the sprite object
	 * @param {me.loader#getImage} Image reference of the animation sheet
	 * @param {int} spritewidth width of the sprite image
	 */
	AnimationSheet = me.SpriteObject
			.extend(
			/** @scope me.AnimationSheet.prototype */
			{
				/** @private */
				init : function(x, y, image, spritewidth) {
					// hold all defined animation
					this.anim = [];

					// a flag to reset animation
					this.resetAnim = null;

					// default animation sequence
					this.current = null;

					// call the constructor
					this.parent(x, y, image, spritewidth);

					// if one single image, disable animation
					if (this.image.width == spritewidth) {
						this.update = function() {
							return false;
						}
					} else {
						// create a default animation sequence with all sprites
						this.addAnimation("default", null);
						// set as default
						this.setCurrentAnimation("default");
					}
				},

				/**
				 * add an animation
				 * @param {String} name animation id
				 * @param {Int[]} frame list of sprite offset defining the animaton
				 * @example
				 * // walking animatin
				 * this.addAnimation ("walk", [0,1,2,3,4,5]);
				 * // eating animatin
				 * this.addAnimation ("eat", [6,6]);
				 * // rolling animatin
				 * this.addAnimation ("roll", [7,8,9,10]);
				 */
				addAnimation : function(name, frame) {
					this.anim[name] = {
						name : null,
						frame : [],
						idx : 0,
						length : 0
					};

					if (frame == null) {
						// add them all
						for ( var i = 0; i < this.spritecount; i++) {
							// compute and add the offset of each frame
							//console.log(this.spriteWidth);
							this.anim[name].frame[i] = i * this.width;//spriteWidth
							//console.log(this.anim[name].frame[i]);
						}

					} else {
						var frameidx = 0;
						for ( var i = 0; i < frame.length; i++) {
							// compute and add the offset of each frame
							//console.log(frame[i]);
							this.anim[name].frame[frameidx] = frame[i]
									* this.width;//spriteWidth
							//console.log(this.anim[name].frame[frameidx]);
							frameidx++;
						}
					}
					this.anim[name].name = name;
					this.anim[name].length = this.anim[name].frame.length;

					// return the create sequence
					//return this.anim[name];

				},

				/**		
				 * set the current animation
				 * @param {String} name animation id
				 * @param {String} [onComplete] animation id to switch to when complete
				 * @example
				 * // set "walk" animation
				 * this.setCurrentAnimation("walk");
				 * // set "eat" animation, and switch to "walk" when complete
				 * this.setCurrentAnimation("eat", "walk");
				 **/

				setCurrentAnimation : function(name, resetAnim) {
					this.current = this.anim[name];
					this.resetAnim = resetAnim || null;
					this.currentSpriteOff = this.current.frame[this.current.idx];
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
				 * set the current sprite
				 * @private
				 */

				setCurrentSprite : function(s) {
					this.current.idx = s;
					this.currentSpriteOff = this.current.frame[s];
				},

				/**
				 * update the animation<br>
				 * this is automatically called by the game manager {@link me.game}
				 * @protected
				 */
				update : function() {
					if (this.visible && (this.fpscount++ > this.animationspeed)) {
						this.setCurrentSprite(++this.current.idx
								% this.current.length);

						if ((this.current.idx == 0) && this.resetAnim)
							this.setCurrentAnimation(this.resetAnim);

						this.fpscount = 0;
						return true;
					}
					return false;
				}
			});
	$.me.AnimationSheet = AnimationSheet;

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
	ObjectEntity = AnimationSheet
			.extend(
			/** @scope me.ObjectEntity.prototype */
			{
				// default type of the object (null)
				type : 0,

				// flag to enable/disable collision detection on this object
				collidable : false,

				/** @private */
				init : function(x, y, settings) {
					this.parent(x, y,
							(typeof settings.image == "string") ? me.loader
									.getImage(settings.image) : settings.image,
							settings.spritewidth);
					
					// set the object entity name
					this.name = settings.name;
					
					// adjust initial coordinates should be bottom left ones
					this.pos.set(x, y + me.game.currentLevel.tileheight
							- this.height);

					// velocity to be applied on player movement
					this.vel = new me.Vector2d();

					// default speed
					this.accel = new me.Vector2d();
					
					// max velocity to be applied on entity movement
					this.maxVel = new me.Vector2d(1000,1000);

					// some default contants
					this.gravity = 0.98;

					// just to identify our object
					this.isEntity = true;

					// to know if our object can break tiles
					this.canBreakTile = false;

					// dead state :)
					this.alive = true;

					// some usefull jump variable
					this.falling = false;
					this.jumping = false;
					this.jumpspeed = 0;

					// some usefull slope variable
					this.slopeY = 0;
					this.onslope = false;
					this.onladder = false;

					// to enable collision detection
					this.collidable = settings.collidable || false;
					//this.collectable = false;

					this.type = settings.type || 0;

					// to manage the flickering effect
					this.flickering = false;
					this.flickerTimer = -1;
					this.flickercb = null;

					// ref to the collision map
					this.collisionMap = me.game.collisionMap;

					// a callback when the entity break a tile :) 
					this.onTileBreak = null;
				},

				/**
				 * specify the size of the hit box for collision detection<br>
				 * (allow to have a specific size for each object)<br>
				 * e.g. : object with resized collision box :<br>
				 * note : bottom of both rectangle MUST always be aligned !<br>
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
				 * collision detection
				 * @private	 
				 */
				checkCollision : function(obj) {
					var res = this.collisionBox.collideVsAABB(obj.collisionBox);

					if (res.x != 0 || res.y != 0) {
						// notify the object
						this.onCollision(res, obj);
						// return the type 
						res.type = this.type;
						return res;
					}
					return null;
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
				 * set the player default velocity<br>
				 * @param {Int} x velocity on x axis
				 * @param {Int} y velocity on y axis
				 * @protected
				 */

				setVelocity : function(x, y) {
					this.accel.x = (x != 0) ? x : this.accel.x;
					this.accel.y = (x != 0) ? y : this.accel.y;
				},
				
				
				/**
				 * cap the entity velocity to the specified value<br>
				 * (!) this will only cap the y velocity for now(!)
				 * @param {Int} x max velocity on x axis
				 * @param {Int} y max velocity on y axis
				 * @protected
				 */
				setMaxVelocity : function(x, y) {
					this.maxVel.x = x;
					this.maxVel.y = y;
				},

				/**
				 * make the player move left of right
				 * @param {Boolean} left 
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
					this.vel.x = (left) ? -this.accel.x * me.timer.tick
							: this.accel.x * me.timer.tick;
				},

				/**
				 * make the player move up and down<br>
				 * only valid is the player is on a ladder
				 * @param {Boolean} up 
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
				 * return the distance to the specified entity
				 * @param {me.ObjectEntity} entity Entity 
				 * @return {float} distance
				 */
				distanceTo: function(o) 
				{
					// the Vector object also implements the same function, but
					// we have to use here the center of both object
					dx = (this.pos.x + (this.width>>1))  - (o.pos.x + (o.width>>1)); 
					dy = (this.pos.y + (this.height>>1)) - (o.pos.y + (o.height>>1));
					return Math.sqrt(dx*dx+dy*dy);
				},
				
				/* -----

					make the player jump
					
				------			*/
				doJump : function() {
					if (!this.jumping && !this.falling) {
						this.jumpspeed = this.accel.y;
						this.jumping = true;

						// adjust y pos if on a slope tile
						if (this.onslope) {
							//this.pos.y -= this.slopeY;
							//console.log("jump on slope");
							//this.jumpspeed += this.slopeY;
						}
						return true;
					}
					return false;
				},

				/* -----

					force the player to jump
					
				------			*/
				forceJump : function() {
					this.jumping = false;
					this.falling = false;
					this.doJump();
				},

				/** 
				 * handle the player movement on a slope
				 * and update vel value
				 * @private
				 */
				checkSlope : function(tile, left) {
					// first make the object stick to the tile
					this.pos.y = tile.pos.y - this.height;

					// normally the check should be on the object center point, but since the collision check is done
					// on corner, we must do the same thing here
					if (left)
						this.slopeY = tile.height
								- (this.collisionBox.right + this.vel.x - tile.pos.x);
					else
						this.slopeY = (this.collisionBox.left + this.vel.x - tile.pos.x);

					// some limit check, workaround when entering/exiting slopes tile
					this.slopeY = this.slopeY.clamp(0, tile.height);

					if ((this.vel.x != 0) || this.falling) {
						// apply it to vel.y
						this.vel.y = this.slopeY;
					} else {
						// apply to pos.y, so we don't indicate we actually change pos
						this.vel.y = 0;
						this.pos.y += this.slopeY;
					}
				},

				/**
				 * handle the player movement, "trying" to update his position<br>
				 * @return {Boolean} <b>true<b> if player position has been updated
				 * @example
				 * // make the player move
				 * if (me.input.isKeyPressed('left'))
				 * {
				 *     this.doWalk(true);
				 * }
				 * else if (me.input.isKeyPressed('right'))
				 * {
				 *     this.doWalk(false);
				 * }
				 * // update player position
				 * this.updateMovement();
				 */
				updateMovement : function() {

					// apply gravity on y axis
					if (this.jumping) {
						this.jumpspeed -= this.gravity;
						if ((this.jumpspeed < 0))// || !me.input.keyStatus('jump')) // jumping)
						{
							this.jumping = false;
							this.falling = true;
							this.vel.y = 0;
							//console.log("falling!");
						} else
							this.vel.y = -this.jumpspeed;

						//		console.log(this.jumpspeed);
					}
					// else apply a constant gravity
					else if (!this.onladder) {
						//this.jumping = false
						this.falling = true;
						this.vel.y += (this.gravity * me.timer.tick);
					}
					
					// cap the y velocity
					if (this.vel.y !=0)
					{
						this.vel.y = this.vel.y.clamp(-this.maxVel.y,this.maxVel.y);
					}

					// check for collision
					collision = this.collisionMap.checkCollision(
							this.collisionBox, this.vel);

					// update some flags
					this.onladder = collision.xprop.isLadder;
					this.onslope = collision.yprop.isSlope
							|| collision.xprop.isSlope;
					//console.log(this.onslope);

					// y collision
					if (collision.y) {

						// going down,
						// collision with the floor
						if (this.vel.y > 0) {
							// update the onslope flag
							//this.onslope = collision.yprop.isSlope

							if (collision.yprop.isSolid
									|| (collision.yprop.isPlatform && (~~this.pos.y
											+ this.height <= collision.ytile.pos.y))) {
								// round pos.y
								this.pos.y = ~~this.pos.y;
								// adjust val to tile pos
								this.vel.y = (this.falling) ? collision.ytile.pos.y
										- this.pos.y - this.height
										: 0;

								this.falling = false;
							} else if (collision.yprop.isSlope && !this.jumping) // && this.falling
							{
								// we stop falling
								//this.onslope = true;
								//console.log("yslope");
								this.checkSlope(collision.ytile,
										collision.yprop.isLeftSlope);
								//this.onladder = false;
								this.falling = false;
								//this.jumping  = false;
								//this.onslope  = true;
							} else if (collision.yprop.isBreakable) {
								if (this.canBreakTile) {
									// remove the tile
									me.game.currentLevel.clearTile(
											collision.ytile.row,
											collision.ytile.col);
									if (this.onTileBreak)
										this.onTileBreak();
								} else {
									// cancel vel and adjust to tile pos
									// round pos.y
									this.pos.y = ~~this.pos.y;
									this.vel.y = (this.falling) ? collision.ytile.pos.y
											- this.pos.y - this.height
											: 0;
									this.falling = false;
								}
							}
						}
						// going up
						// collision with ceiling
						else if (this.vel.y < 0) {
							if (!collision.yprop.isPlatform
									&& !collision.yprop.isLadder) {
								this.jumping = false;
								this.falling = true;
								// cancel the y velocity
								this.vel.y = 0;
							}
						}
					}

					// x collision
					if (collision.x) {
						if (collision.xprop.isSlope && !this.jumping) {
							this.checkSlope(collision.xtile,
									collision.xprop.isLeftSlope);
							this.falling = false;
						} else {
							// can walk through the platform & ladder
							if (!collision.xprop.isPlatform
									&& !collision.xprop.isLadder) {
								if (collision.xprop.isBreakable
										&& this.canBreakTile) {
									// remove the tile
									me.game.currentLevel.clearTile(
											collision.xtile.row,
											collision.xtile.col);
									if (this.onTileBreak) {
										this.onTileBreak();
									}
								} else {
									this.vel.x = 0;
								}
							}
							// do we climb the ladder
							//this.onladder = collision.xprop.isLadder && (this.vel.x != 0);

						}
					}

					// -- THIS SHOULD NOT BE HERE --//
					// update the flickering
					this.updateFlickering();

					// check for other necessary updates
					if ((this.vel.x != 0) || (this.vel.y != 0)) {
						// update player position
						this.pos.add(this.vel);

						// once applied cancel cumulative vel.y if onslope and !jumping or on ladder
						if ((this.onslope && !this.jumping) || this.onladder) {
							this.vel.y = 0;
						}

						// update objet animation
						//this.update();

						return true;
					}
					// nothing updated (that happens!)
					return false;

				},

				/**
				 * upate the object "flickering"
				 * @private
				 */

				updateFlickering : function() {
					if (this.flickering) {
						this.flickerTimer -= me.timer.tick; // should be minus elapsed time;

						//console.log(this.flickerTimer);

						if (this.flickerTimer < 0) {
							if (this.flickercb)
								this.flickercb();
							this.flicker(-1);
						} else {
							this.visible = !this.visible;
							return true;
						}
					}
					return false;
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
						this.visible = true;
						this.flickercb = null;
					} else if (!this.flickering) {
						this.flickercb = callback;
						this.flickering = true;
					}
				}

			});
	// expose our object to our scope
	$.me.ObjectEntity = ObjectEntity;
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
	CollectableEntity = ObjectEntity.extend(
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
	// expose our object to our scope	
	$.me.CollectableEntity = CollectableEntity;

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
	InvisibleEntity = me.Rect
			.extend(
			/** @scope me.InvisibleEntity.prototype */
			{
				// for z ordering
				z : 0,
				collisionBox : null,

				/** @private */
				init : function(x, y, settings) {
					// call the parent constructor
					this.parent(new me.Vector2d(x, y), settings.width,
							settings.height);

					// create a a default collision rectangle
					this.collisionBox = new me.Rect(this.pos, settings.width,
							settings.height);

					this.visible = true;

					this.collidable = true;

					// just to identify our object
					this.isEntity = true;

				},

				/**
				 * specify the size of the hit box for collision detection<br>
				 * (allow to have a specific size for each object)<br>
				 * e.g. : object with resized collision box :<br>
				 * note : bottom of both rectangle MUST always be aligned !<br>
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
				 * collision detection
				 * @private	 
				 */
				checkCollision : function(obj) {
					var res = this.collisionBox.collideVsAABB(obj.collisionBox);

					if (res.x != 0 || res.y != 0) {
						// notify the object
						this.onCollision(res, obj);
						// return the type 
						res.type = this.type;
						return res;
					}
					return null;
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
				 * Destroy function
				 * @private
				 */
				destroy : function() {
					// call the destroy notification function
					this.onDestroyEvent();
					return true;
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
						context.strokeRect(this.pos.x - me.game.viewport.pos.x,
								this.pos.y - me.game.viewport.pos.y,
								this.width, this.height);

						this.collisionBox.draw(context);
					}

				}
			});
	// expose our object to our scope
	$.me.InvisibleEntity = InvisibleEntity;

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
	LevelEntity = InvisibleEntity.extend(
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
	// expose our object to our scope
	$.me.LevelEntity = LevelEntity;

	/*---------------------------------------------------------*/
	// END END END
	/*---------------------------------------------------------*/
})(window);
/*
 * MelonJS Game Engine
 * Copyright (C) 2011, Olivier BIOT
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

(function($, undefined) {

	/**
	 * a generic system font object.
	 * @class
	 * @extends Object
	 * @memberOf me
	 * @constructor
	 * @param {String} font
	 * @param {int} size
	 * @param {String} color
	 * @param {String} [align="top"]
	 */
	Font = Object.extend(
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
		 * @param {int} size
		 * @param {String} color
		 * @param {String} [align="top"]
		 */
		set : function(font, size, color, align) {
			// font name and type
			this.font = "" + size + "px " + font;
			this.height = size;
			this.color = color;
			this.align = align || "top";
		},

		/**
		 * FIX ME !
		 * @private
		 */
		getRect : function() {
			return new me.Rect(new Vector2d(0, 0), 0, 0);
		},

		/**
		 * measure the given test width
		 * @param {String} text
		 * @return {int} width
		 */
		measureText : function(context, text) {
			// draw the text
			context.font = this.font;
			context.fillStyle = this.color;
			context.textBaseLine = this.align;
			dim = context.measureText(text);
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
			context.textBaseLine = this.align;
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
	 * @param {int} size
	 * @param {int} [scale="1.0"]
	 * @param {String} [firstChar="0x20"]

	 */
	BitmapFont = Font.extend(
	/** @scope me.BitmapFont.prototype */
	{
		// character size;
		size : null,
		// font scale;
		sSize : null,
		// first char in the ascii table
		scale : 1.0,
		// first char in the ascii table
		firstChar : 0x20,

		/** @private */
		init : function(font, size, scale, firstChar) {
			// font name and type
			this.parent(font, null, null);

			// character size;
			this.size = new me.Vector2d(size, 0);
			// font scale;
			this.sSize = new me.Vector2d();

			// first char in the ascii table
			this.scale = scale || 1.0;

			// first char in the ascii table
			this.firstChar = firstChar || 0x20;

			// load the font metrics
			this.loadFontMetrics(font);

			// set a default alignement
			this.align = this.ALIGN.RIGHT

		},

		/**
		 * Load the font metrics
		 * @private	
		 */
		loadFontMetrics : function(font) {
			this.font = me.loader.getImage(font);

			// some cheap metrics
			//this.size.x = passed arguements;
			this.size.y = this.font.height || 0;

			this.sSize.copy(this.size);
			this.sSize.x *= this.scale;
			this.sSize.y *= this.scale;
		},

		/**
		 * change the font settings
		 * @param {String} align
		 * @param {int} scale
		 */
		set : function(align, scale) {
			this.align = align;
			// updated scaled Size
			if (scale) {
				this.sSize.copy(this.size);
				this.sSize.x *= this.scale;
				this.sSize.y *= this.scale;
			}
		},

		/**
		 *	measure the given test width
		 * @param {String} text
		 * @return {int} width
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
			// make sure it's a text parameter
			if (typeof (text) != 'string')
				text = text.toString();

			// adjust pos if right alig
			if (this.align == this.ALIGN.RIGHT) {
				x -= text.length * this.sSize.x;
			}

			for ( var i = 0; i < text.length; i++) {
				context.drawImage(this.font,
						(text.charCodeAt(i) - this.firstChar) * this.size.x, 0,
						this.sSize.x, this.sSize.y, ~~x, ~~y, this.size.x,
						this.size.y);
				x += this.sSize.x;
			}

		}
	});

	/*---------------------------------------------------------*/
	// expose our stuff to the global scope
	/*---------------------------------------------------------*/
	$.me.Font = Font;
	$.me.BitmapFont = BitmapFont;
	/*---------------------------------------------------------*/
	// END END END
	/*---------------------------------------------------------*/
})(window);
/*
 * MelonJS Game Engine
 * Copyright (C) 2011, Olivier BIOT
 * http://www.melonjs.org
 *
 */

(function($, undefined) {

	/************************************************************************************/
	/*      GUI FUNCTIONS :                                                             */
	/*      a basic set of objects to manage GUI elements                               */
	/*      basically they are sprite object with some event management                 */
	/************************************************************************************/

	/* -----

		a Simple GUI object
			
		------									*/
	var GUI_Object = me.SpriteObject.extend({
		// object can be clicked or not
		isClickable : true,
		// object has been updated (clicked,etc..)	
		updated : false,

		/* -----

			constructor function
				
			------ */

		init : function(x, y, image, spritewidth) {
			this.parent(this, x, y, image, spritewidth);
		},

		/* -----

			update function
				
			------ */
		update : function() {
			if (this.updated) {
				// clear the flag
				this.updated = false;
				return true;
			}
			return false;
		},

		/* -----

			a clicked function called when the object is clicked
			return true if the object is to be redraw
				
			------									*/
		clicked : function() {
			return false;
		},

		/* -----

			mouse event detection
				
			------									*/
		mouseEvent : function(x, y) {
			if ((x > this.pos.x) && (x < this.pos.x + this.displayWidth)
					&& (y > this.pos.y)
					&& (y < this.pos.y + this.displayHeight)) {
				// notify the object we have been clicked :)
				if (this.isClickable) {
					this.updated = this.clicked();
				}
			}
			return this.updated;
		}
	});
	// expose our stuff to the global scope
	$.me.GUI_Object = GUI_Object;

	/*---------------------------------------------------------*/
	// END END END
	/*---------------------------------------------------------*/
})(window);
/*
 * MelonJS Game Engine
 * Copyright (C) 2011, Olivier BIOT
 * http://www.melonjs.org
 *
 *
 */

(function($, undefined) {

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
	HUD_Item = Object.extend(
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
			this.value = this.defaultvalue;
			this.updated = true;
		},

		/**
		 * update the item value
		 * @param {int} value add the specified value
		 */
		update : function(value) {
			this.value += value;
			this.updated = true;
			return this.updated;
		},

		/**
		 * draw the HUD item
		 * @protected
		 * @param {Context2D} context 2D context
		 * @param {x} x
		 * @param {y} y
		 */
		draw : function(context, x, y) {
			//console.log("call score");
			if (this.updated) {
				//console.log("score : " + this.value);
				this.updated = false;
			}
		}
	});
	/*---------------------------------------------------------*/

	/* -----

		a Simple HUD object
			
		------									*/
	HUD_Object = me.Rect
			.extend({
				/**
				 * Constructor
				 */
				init : function(x, y, w, h, bg) {
					// call the parent constructor
					this.parent(new me.Vector2d(x || 0, y || 0), w
							|| me.video.getWidth(), h || me.video.getHeight());

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

					// state of HUD (to trigger redraw);
					this.HUD_invalidated = true;

					// create a canvas where to draw everything
					HUDCanvasSurface = me.video.createCanvasSurface(this.width,
							this.height);

					// this is a little hack to ensure the HUD is always the first draw
					this.z = 999;

				},

				/**
				 * add an item to the HUD Object
				 */
				addItem : function(name, item) {
					this.HUDItems[name] = item;
					this.HUDobj.push(this.HUDItems[name]);
					this.objCount++;
					this.HUD_invalidated = true;
				},

				/**
				 * update the value of an item
				 */
				updateItemValue : function(name, value) {
					if (this.HUDItems[name]
							&& (this.HUDItems[name].update(value) == true))
						this.HUD_invalidated = true;
				},

				/**
				 * get the value of an item
				 */
				getItemValue : function(name) {
					return (this.HUDItems[name]) ? this.HUDItems[name].value
							: 0;
				},

				/**
				 * return true if the HUD has been updated
				 */
				update : function() {
					return this.HUD_invalidated;
				},

				/**
				 * reset the item to it's default value
				 */
				reset : function(name) {
					if (this.HUDItems[name])
						this.HUDItems[name].reset();
					this.HUD_invalidated = true;
				},

				/**
				 * reset all items to their default value
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
				 * @return {me.Rect} new rectangle	
				 */

				getRect : function() {
					p = this.pos.clone();
					p.add(me.game.viewport.pos);
					return new me.Rect(p, this.width, this.height);
				},

				/**
				 * draw the HUD
				 */
				draw : function(context) {
					//console.log("draw HUD");
					if (this.HUD_invalidated) {
						if (this.bgcolor)
							me.video.clearSurface(HUDCanvasSurface,
									this.bgcolor);
						else
							HUDCanvasSurface.canvas.width = HUDCanvasSurface.canvas.width;

						for ( var i = this.objCount, obj; i--,
								obj = this.HUDobj[i];) {
							if (obj.visible) {
								obj.draw(HUDCanvasSurface, 0, 0);
							}
						}
					}
					// draw the HUD
					context.drawImage(HUDCanvasSurface.canvas, this.pos.x,
							this.pos.y);
					// reset the flag
					this.HUD_invalidated = false;
				}
			});

	// expose our stuff to the global scope
	$.me.HUD_Item = HUD_Item;
	$.me.HUD_Object = HUD_Object;

	/*---------------------------------------------------------*/
	// END END END
	/*---------------------------------------------------------*/
})(window);
/*
 * MelonJS Game Engine
 * Copyright (C) 2011, Olivier BIOT
 * http://www.melonjs.org
 *
 * Audio Mngt Objects
 *
 *
 */

(function($, undefined) {
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

	audio = (function() {
		// hold public stuff in our singletong
		var obj = {};

		// audio channel array
		var audio_channels = [];

		// supported Audio Format
		var supportedFormat = [ "mp3", "ogg", "wav" ];

		// Request format by the app/game
		var requestedFormat = null;

		// Active (supported) audio extension
		var activeAudioExt = -1;

		// loadcb function
		var load_cb = null;

		// current music
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

		/*
		 * ---
		 * 
		 * return the audio format extension supported by the browser ---
		 */

		function getSupportedAudioFormat() {

			var extIdx = 0;

			// check for sound support by the browser
			if (!me.sys.sound) {
				sound_enable = false;
				return;
			}

			// check for MP3
			if ((requestedFormat.search(/mp3/i) != -1) && obj.capabilities.mp3) {
				// console.log("mp3 audio supported");
				return supportedFormat[extIdx];
			}

			// check for OGG/Vorbis
			if ((requestedFormat.search(/ogg/i) != -1) && obj.capabilities.ogg) {
				// console.log("ogg audio supported");
				return supportedFormat[++extIdx];
			}

			// check for WAV
			if ((requestedFormat.search(/wav/i) != -1) && obj.capabilities.wav) {
				// console.log("wav audio supported");
				return supportedFormat[++extIdx];
			}

			// deactivate sound
			sound_enable = false;

			return -1;
		}
		;

		/*
		 * ---
		 * 
		 * return the specified sound ---
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
		}
		;

		/*
		 * ---
		 * 
		 * event listener callback on load error
		 * 
		 * ---
		 */

		function soundLoadError(sound_id) {
			// check the retry counter
			if (retry_counter++ > 3) {
				// what the hell ...?
				throw "melonJS: failed loading audio: " + sound_id + "."
						+ activeAudioExt;
			} else {
				// reload !
				audio_channels[sound_id][0].load();
			}
		}
		;

		/*
		 * ---
		 * 
		 * event listener callback when a sound is loaded
		 * 
		 * ---
		 */

		function soundLoaded(sound_id, sound_channel) {
			// reset the retry counter
			retry_counter = 0;

			// create other "copy" channels if necessary
			if (sound_channel > 1) {
				var soundclip = audio_channels[sound_id][0];
				// clone copy to create multiple channel version
				for (channel = 1; channel < sound_channel; channel++) {
					// make sure it's a new copy each time
					var node = soundclip.cloneNode(true);
					// fix for IE platform not properly
					// initializating everything when using cloneNode
					if (node.currentSrc.length == 0) {
						node.src = soundclip.src;
					}
					// allocate the new channel
					audio_channels[sound_id][channel] = node;
					audio_channels[sound_id][channel].load();
				}
			}
			// callback if defined
			if (load_cb) {
				load_cb();
			}
		}
		;

		/**
		 * play the specified sound
		 * 
		 * @name me.audio#play
		 * @public
		 * @function
		 * @param {String}
		 *            sound_id audio clip id
		 * @param {String}
		 *            [loop="false"] loop audio
		 * @param {Function}
		 *            [callback] callback function
		 * @example // play the "cling" audio clip me.audio.play("cling"); //
		 *          play & repeat the "engine" audio clip
		 *          me.audio.play("engine", true); // play the "gameover_sfx"
		 *          audio clip and call myFunc when finished
		 *          me.audio.play("gameover_sfx", false, myFunc);
		 */

		function _play_audio_enable(sound_id, loop, callback) {
			// console.log("play!!");
			var soundclip = get(sound_id);

			soundclip.loop = loop || false;
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

		}
		;

		/*
		 * ---
		 * 
		 * play_audio with simulated callback ---
		 */

		function _play_audio_disable(sound_id, loop, callback) {
			// check if a callback need to be called
			if (callback && !loop) {
				// SoundMngr._play_cb = callback;
				setTimeout(callback, 2000); // 2 sec as default timer ?
			}
		}
		;

		/*
		 * ---------------------------------------------
		 * 
		 * PUBLIC STUFF
		 * 
		 * ---------------------------------------------
		 */

		// audio capabilities
		obj.capabilities = {
			mp3 : false,
			ogg : false,
			ma4 : false,
			wav : false,
		};

		/**
		 * initialize the audio engine<br>
		 * the melonJS loader will try to load audio files corresponding to the
		 * browser supported audio format<br>
		 * if not compatible audio format is found, audio will be disabled
		 * 
		 * @name me.audio#init
		 * @public
		 * @function
		 * @param {String}
		 *            audioFormat audio format provided ("mp3, ogg, wav")
		 * @example // initialize the "sound engine", giving "mp3" and "ogg" as
		 *          available audio format me.audio.init("mp3,ogg"); // i.e. on
		 *          Safari, the loader will load all audio.mp3 files, // on
		 *          Opera the loader will however load audio.ogg files
		 */
		obj.init = function(audioFormat) {
			if (audioFormat)
				requestedFormat = new String(audioFormat);
			else
				// if no param is given to init we use mp3 by default
				requestedFormat = new String("mp3");

			// detect the prefered audio format
			activeAudioExt = getSupportedAudioFormat();

			if (sound_enable)
				obj.play = _play_audio_enable;
			else
				obj.play = _play_audio_disable;

			return sound_enable;
		};

		/*
		 * ---
		 * 
		 * 
		 * ---
		 */

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

			// var soundclip = document.createElement("audio");

			var soundclip = new Audio(sound.src + sound.name + "."
					+ activeAudioExt + me.nocache);

			// soundclip.autobuffer = true; // obsolete
			soundclip.preload = 'auto';

			soundclip.addEventListener('canplaythrough', function(e) {
				// console.log(soundclip);
				this.removeEventListener('canplaythrough', arguments.callee,
						false);
				soundLoaded(sound.name, sound.channel);
			}, false);

			soundclip.addEventListener("error", function(e) {
				soundLoadError(sound.name);
			}, false);

			soundclip.src = sound.src + sound.name + "." + activeAudioExt
					+ me.nocache;

			// document.body.appendChild(soundclip);

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
		 * @param {String}
		 *            sound_id audio clip id
		 * @example me.audio.stop("cling");
		 */
		obj.stop = function(sound_id) {
			if (sound_enable) {
				var sound = audio_channels[sound_id];
				for (channel_id = sound.length; channel_id--;) {
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
		 * @param {String}
		 *            sound_id audio clip id
		 * @example me.audio.pause("cling");
		 */
		obj.pause = function(sound_id) {
			if (sound_enable) {
				var sound = audio_channels[sound_id];
				for (channel_id = sound.length; channel_id--;) {
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
		 * @param {String}
		 *            sound_id audio track id
		 * @example me.audio.playTrack("awesome_music");
		 */
		obj.playTrack = function(sound_id) {
			if (sound_enable) {
				if (current_track != null)
					obj.stopTrack();

				current_track = get(sound_id);

				if (current_track) {
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
		 * @example // play a awesome music me.audio.playTrack("awesome_music"); //
		 *          stop the current music me.audio.stopTrack();
		 */
		obj.stopTrack = function() {
			if (sound_enable && current_track) {
				current_track.pause();
				current_track = null;
			}
		};

		/**
		 * pause the current audio track
		 * 
		 * @name me.audio#pauseTrack
		 * @public
		 * @function
		 * @example me.audio.pauseTrack();
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
		 * @param {String}
		 *            sound_id audio track id
		 * @example // play a awesome music me.audio.playTrack("awesome_music"); //
		 *          pause the audio track me.audio.pauseTrack(); // resume the
		 *          music me.audio.resumeTrack();
		 */
		obj.resumeTrack = function() {
			if (sound_enable && current_track) {
				current_track.play();
			}
		};

		// return our object
		return obj;

	})();

	// expose our stuff to the global scope
	$.me.audio = audio;

	/*---------------------------------------------------------*/
	// END END END
	/*---------------------------------------------------------*/
})(window);
/*
 * MelonJS Game Engine
 * Copyright (C) 2011, Olivier BIOT
 * http://olivierbiot.wordpress.com/
 *
 *
 * video Mngt 
 *
 *
 */

(function($, undefined) {
	/**
	 * a Timer object to manage time function (FPS, Game Tick, Time...)<p>
	 * There is no constructor function for me.timer
	 * @final
	 * @memberOf me
	 * @constructor Should not be called by the user.
	 */
	timer = (function() {
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

		/* ---
		
			update the fps counter
			
			---*/
		function draw(fps) {
			htmlCounter.replaceChild(document.createTextNode("(" + fps + "/"
					+ me.sys.fps + " fps)"), htmlCounter.firstChild);
		}
		;

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

		/* ---
		
			init our time stuff
			
			---							*/
		api.init = function() {
			// check if we have a framecounter display in the HTML
			htmlCounter = document.getElementById("framecounter");
			debug = (htmlCounter !== null);

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
			now = last = new Date().getTime();
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
			now = new Date().getTime();

			delta = (now - last);

			// only draw the FPS on in the HTML page 
			if (debug) {
				framecount++;
				framedelta += delta;
				if (framecount % 10 == 0) {
					lastfps = ~~((1000 * framecount) / framedelta);
					// clamp the result and "draw" it
					draw(lastfps.clamp(0, me.sys.fps));
					framedelta = 0;
					framecount = 0;
				}
			}
			// get the game tick
			api.tick = (delta > minstep && me.sys.interpolation) ? delta / step
					: 1;
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
	video = (function() {
		// hold public stuff in our apig
		var api = {};

		// internal variables
		var canvas = null;
		var context2D = null;
		var backBufferCanvas = null;
		var backBufferContext2D = null;
		var wrapper = null;

		var double_buffering = false;
		var game_width_zoom = 0;
		var game_height_zoom = 0;

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
		 * @param {String} wrapper the "div" element id to hold the canvas in the HTML file
		 * @param {Int} width game width
		 * @param {Int} height game height
		 * @param {Boolean} [double_buffering] enable/disable double buffering
		 * @param {Number} [scale] enable scaling of the canvas (note : if scale is used, double_buffering must be enabled)
		 * @return {Boolean}
		 * @example
		 * // init the video with a 480x320 canvas
		 * if (!me.video.init('jsapp', 480, 320))
		 * {
		 *    alert("Sorry but your browser does not support html 5 canvas !");
		 *    return;
		 * }
		 */
		api.init = function(wrapperid, game_width, game_height,
				doublebuffering, scale) {
			double_buffering = doublebuffering || false;

			// zoom only work with the double buffering since we 
			// actually zoom the backbuffer before rendering it
			me.sys.scale = double_buffering === true ? scale || 1.0 : 1.0;

			game_width_zoom = game_width * me.sys.scale;
			game_height_zoom = game_height * me.sys.scale;

			wrapper = document.getElementById(wrapperid);

			canvas = document.createElement("canvas");

			canvas.setAttribute("width", (game_width_zoom) + "px");
			canvas.setAttribute("height", (game_height_zoom) + "px");
			canvas.setAttribute("border", "0px solid black");

			// add our canvas
			wrapper.appendChild(canvas);

			// check if WebGL feature is supported & required
			if (me.sys.enableWebGL && window.WebGLRenderingContext) {
				// in case the library is not loaded
				try {
					// try to enable WebGL
					WebGL2D.enable(canvas);
					context2D = canvas.getContext('webgl-2d');
					// enable cacheImage feature, so that we use
					// canvas and not Image for assets.
					me.sys.cacheImage = true;
				} catch (e) {
					// just to be sure
					context2D = null;
				}
			}

			// if context2D not initialized, 
			if (context2D == null) {
				// make sure it's disabled
				me.sys.enableWebGL = false;

				if (!canvas.getContext)
					return false;

				context2D = canvas.getContext('2d');
			}

			// create the back buffer if we use double buffering
			if (double_buffering) {
				backBufferContext2D = api.createCanvasSurface(game_width,
						game_height);
				backBufferCanvas = backBufferContext2D.canvas;
			} else {
				backBufferContext2D = context2D;
				backBufferCanvas = context2D.canvas;
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
		 * return the height of the display canvas (before scaling)
		 * @name me.video#getHeight
		 * @function
		 * @return {Int}
		 */
		api.getHeight = function() {
			return backBufferCanvas.height;
		};

		/**
		 * allocate and return a new Canvas 2D surface
		 * @name me.video#createCanvasSurface
		 * @function
		 * @param {Int} width canvas width
		 * @param {Int} height canvas height
		 * @return {Context2D}
		 */
		api.createCanvasSurface = function(width, height) {
			var privateCanvas = document.createElement("canvas");

			privateCanvas.width = width || backBufferCanvas.width;
			privateCanvas.height = height || backBufferCanvas.height;

			/* !! this should be working, no ?
			if (me.sys.enableWebGL)
			{   
			   WebGL2D.enable(privateCanvas);
			   return privateCanvas.getContext('webgl-2d');
			}
			else
			{ 
			 */
			return privateCanvas.getContext('2d');
			//}
		};

		/**
		 * return a reference of the display canvas
		 * @name me.video#getScreenCanvas
		 * @function
		 * @return {Canvas}
		 */
		api.getScreenCanvas = function() {
			//console.log(VideoMngr._canvas);
			return canvas;
		};

		/**
		 * return a reference to the screen framebuffer
		 * @name me.video#getScreenFrameBuffer
		 * @function
		 * @return {Context2D}
		 */
		api.getScreenFrameBuffer = function() {
			return backBufferContext2D;
		};

		/* ---
		
			Update the display size (zoom ratio change)
			if no parameter called from the outside (select box)
			---								*/

		/**
		 * change the display scaling factor
		 * @name me.video#updateDisplaySize
		 * @function
		 * @param {Number} scale scaling value
		 */
		api.updateDisplaySize = function(scale) {
			if (double_buffering) {
				if (scale)
					me.sys.scale = scale;
				else
					// to be changed by something else :)
					me.sys.scale = document.getElementById("screen size").value;

				game_width_zoom = backBufferCanvas.width * me.sys.scale;
				game_height_zoom = backBufferCanvas.height * me.sys.scale;

				canvas.width = game_width_zoom; // in pixels
				canvas.height = game_height_zoom; // in pixels

			}
		};

		/**
		 * Clear the specified context with the given color
		 * @name me.video#clearSurface
		 * @function
		 * @param {Context2D} context
		 * @param {Color} col
		 */
		api.clearSurface = function(context, col) {
			context.fillStyle = col;
			context.fillRect(0, 0, context.canvas.width, context.canvas.height);
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
			context
					.translate(
							-(((context.canvas.width * scale) - context.canvas.width) >> 1),
							-(((context.canvas.height * scale) - context.canvas.height) >> 1));

			context.scale(scale, scale);

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
				api.blitSurface = function() {
					//FPS.update();
					context2D.drawImage(backBufferCanvas, 0, 0,
							backBufferCanvas.width, backBufferCanvas.height, 0,
							0, game_width_zoom, game_height_zoom);
				};
			} else {
				// "empty" function, as we directly render stuff on "context2D"
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
		 * @param {Object} [canvas] Canvas or Image Object on which to apply the filter
		 * @param {String} effect "b&w", "brightness", "transparent"
		 * @param {String} option : level [0...1] (for brightness), color to be replaced (for transparent) 
		 * @return {Context2D} context object
		 */
		api.applyRGBFilter = function() {

			// if first arguments is not an image or a canvas
			if (typeof arguments[0] == "string") {
				// get effect and option parameters value
				var effect = arguments[0];
				var option = arguments[1];

				//create a new canvas using the main canvas size
				var fcanvas = api.createCanvasSurface();

				// get the content of the main canvas
				var imgpix = backBufferContext2D.getImageData(0, 0,
						backBufferCanvas.width, backBufferCanvas.height);

			} else {
				//create a output canvas using the given canvas or image size
				var fcanvas = api.createCanvasSurface(arguments[0].width,
						arguments[0].height);

				// is it an image ?
				if (arguments[0] instanceof HTMLImageElement) {
					// build a temp canvas
					var tempCtx = me.video.createCanvasSurface(
							arguments[0].width, arguments[0].height);

					// draw the image into the canvas context
					tempCtx.drawImage(arguments[0], 0, 0);
					// get the image data               
					var imgpix = tempCtx.getImageData(0, 0, arguments[0].width,
							arguments[0].height);

				} else // a canvas ?
				{
					// let's hope ! :)
					var imgpix = arguments[0].getContext('2d').getImageData(0,
							0, arguments[0].width, arguments[0].height);
				}
				// get effect and option parameters value
				var effect = arguments[1];
				var option = arguments[2];

			}

			// pointer to the image data
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
				var brightness = Math.abs(option);
				// make sure it's not greater than 1.0
				brightness = (brightness > 1.0) ? 1.0 : brightness;
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

	// expose our stuff to the global scope
	$.me.timer = timer;
	$.me.video = video;

	/*---------------------------------------------------------*/
	// END END END
	/*---------------------------------------------------------*/
})(window);
/*
 * MelonJS Game Engine
 * Copyright (C) 2011, Olivier BIOT
 * http://www.melonjs.org
 *
 */

(function($, undefined) {

	/**
	 * There is no constructor function for me.input.
	 * @final
	 * @memberOf me
	 * @constructor Should not be called by the user.
	 */
	input = (function() {

		// hold public stuff in our singletong
		var obj = {};

		/*---------------------------------------------
			
			PRIVATE STUFF
				
		  ---------------------------------------------*/

		// list of binded keys
		var KeyBinding = [];

		// corresponding actions
		var keyStatus = [];

		// lock enable flag for keys
		var keyLock = [];
		// actual lock status of each key
		var keyLocked = [];

		// callback function for mouse & gyro
		var mouseEventCB = null;
		var gyroEventCB = null;

		// some usefull flags
		var keyboardInitialized = false;

		/*---
			
			enable keyboard event
				
			---*/
		function enableKeyboardEvent(enable) {
			if (enable) {
				// Event Management
				if (!keyboardInitialized) {
					$.addEventListener('keydown', keydown, false);
					$.addEventListener('keyup', keyup, false);
				}
			} else {
				// remove the even listeners
				$.removeEventListener('keydown', keydown, false);
				$.removeEventListener('keyup', keyup, false);
			}
			keyboardInitialized = enable;
		}
		;

		/* ---
			
			prevent event propagation
				
			---*/
		function preventDefault(e) {
			e.stopPropagation();
			if (e.preventDefault)
				e.preventDefault();
			e.returnValue = false;
			//e.cancelBubble = true;
		}
		;

		/* ---
			
			key down event
				
			---	*/
		/*
		function dispatchEvent (e)
		{
			var action = KeyBinding[e.keyCode || e.which];
			
			if(action)
			{
				console.log(e);
				if ((e.type === "keydown")&&(!keyLocked[action]))
				{
						keyStatus[action] = true;
						// lock the key if requested
						keyLocked[action] = keyLock[action];
				} 
				else if(e.type === "keyup")
				{
					keyStatus[action] = false;
					keyLocked[action] = false;
				}
			}
			// prevent event propagation
			preventDefault(event);
			return false;
		};
		 */

		function keydown(e) {

			var action = KeyBinding[e.keyCode || e.which];

			if (action) {
				//console.log(e, action);

				//console.log(action);
				if (!keyLocked[action]) {
					keyStatus[action] = true;
					// lock the key if requested
					keyLocked[action] = keyLock[action];
				}
				// prevent event propagation
				preventDefault(e);
				return false;
			}
			return true;
		}
		;

		/* ---
			
			key up event
				
			---	*/
		function keyup(e) {

			var action = KeyBinding[e.keyCode || e.which];

			//console.log(e, action);

			if (action) {

				keyStatus[action] = false;
				keyLocked[action] = false;
				// prevent the event propagation
				preventDefault(e);
				return false;
			}
			return true;

		}
		;

		/* ---
		
			 mouse event management (click)
			
			---										*/
		function onMouseEvent(e) {
			var x = e.clientX - me.video.getScreenCanvas().offsetLeft;
			var y = e.clientY - me.video.getScreenCanvas().offsetTop;

			// propagate the event to the callback with x,y coords
			mouseEventCB(x, y);

		}
		;

		/* ---
			
				 event management (Gyroscopic)
				
				---										*/
		function onGyroEvent(event) {
			// http://www.mobilexweb.com/samples/ball.html
			// http://www.mobilexweb.com/blog/safari-ios-accelerometer-websockets-html5
			// 
			// ax = event.accelerationIncludingGravity.x;
			// ay = event.accelerationIncludingGravity.y;

			// use acceleration instead on iphone4  
			// event.accelerationIncludingGravity.x
			// event.accelerationIncludingGravity.y
			// event.accelerationIncludingGravity.z

			// Gyroscope
			// window.ondeviceorientation = function(event) {
			// event.alpha
			// event.beta
			// event.gamma
			//}
		}
		;

		/*---------------------------------------------
			
			PUBLIC STUFF
				
		  ---------------------------------------------*/

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
			'0' : 48,
			'1' : 49,
			'2' : 50,
			'3' : 51,
			'4' : 52,
			'5' : 53,
			'6' : 54,
			'7' : 55,
			'8' : 56,
			'9' : 57,
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
			'Z' : 90,
		};

		/**
		 * return the key press status of the specified action
		 * @name me.input#isKeyPressed
		 * @public
		 * @function
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
		 * @return {boolean} down (true) or up(false)
		 */

		obj.keyStatus = function(action) {
			return (keyLocked[action] === true) ? true : keyStatus[action];
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
			if (!keyboardInitialized)
				enableKeyboardEvent(true);

			KeyBinding[keycode] = action;

			keyLock[action] = lock ? lock : false;
			keyLocked[action] = false;
			//console.log(this);
		};

		/**
		 * unbind the defined keycode
		 * @name me.input#unbindKey
		 * @public
		 * @function
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
		 * enable mouse event
		 * @name me.input#enableMouseEvent
		 * @public
		 * @function
		 * @deprecated to be rewritten
		 */
		obj.enableMouseEvent = function(enable, callback) {
			if (enable) {
				// add a listener for the mouse
				me.video.getScreenCanvas().addEventListener('click',
						onMouseEvent, false);
				// set the callback
				mouseEventCB = callback || me.game.mouseEvent.bind(me.game);
			} else {
				me.video.getScreenCanvas().removeEventListener('click',
						onMouseEvent, false);
			}
		};

		/**
		 * enable gyroscopic event (not implemented)
		 * @name me.input#enableGyroscopicEvent
		 * @public
		 * @function
		 */
		obj.enableGyroscopicEvent = function(enable, callback) {
			if ($.sys.gyro) {
				// add a listener for the mouse
				$.ondevicemotion = enable ? onGyroEvent : null;
				// set the callback
				gyroEventCB = enable ? callback : null;
			}

		};

		// return our object
		return obj;

	})();

	/*---------------------------------------------------------*/
	// expose our stuff to the global scope
	/*---------------------------------------------------------*/
	$.me.input = input;

	/*---------------------------------------------------------*/
	// END END END
	/*---------------------------------------------------------*/
})(window);
/*
 * MelonJS Game Engine
 * Copyright (C) 2011, Olivier BIOT
 * http://www.melonjs.org
 *
 *
 */

(function($, undefined) {

	/**
	 *  Base64 decoding
	 *  @see <a href="http://www.webtoolkit.info/">http://www.webtoolkit.info/</A>
	 */
	var Base64 = (function() {

		// hold public stuff in our singletong
		var singleton = {};

		// private property
		var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

		// public method for decoding
		singleton.decode = function(input) {
			var output = [], chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0;

			input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

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
		};

		return singleton;

	})();

	/*---
	
	 	a collection of utility Function
	  
								---*/

	var Utils = (function() {
		// hold public stuff in our singletong
		var api = {};

		/*---------------------------------------------
			
		   PRIVATE STUFF
				
		 ---------------------------------------------*/

		// cache rgb converted value
		var rgbCache = {};

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

		/* ---
		 
			enable the nocache mechanism
		  
		  ---*/
		api.setNocache = function(enable) {
			me.nocache = enable ? "?" + parseInt(Math.random() * 10000000) : '';
		};

		// a Hex to RGB color function
		api.HexToRGB = function(h, a) {
			// remove the # if present
			h = (h.charAt(0) == "#") ? h.substring(1, 7) : h;
			// check if we already have the converted value cached
			if (rgbCache[h] == null) {
				// else add it (format : "r,g,b")
				rgbCache[h] = parseInt(h.substring(0, 2), 16) + ","
						+ parseInt(h.substring(2, 4), 16) + ","
						+ parseInt(h.substring(4, 6), 16);
			}
			return (a ? "rgba(" : "rgb(") + rgbCache[h]
					+ (a ? "," + a + ")" : ")");
		};

		// a Hex to RGB color function
		api.RGBToHex = function(r, g, b) {
			return r.toHex() + g.toHex() + b.toHex();
		};

		// return our object
		return api;

	})();

	/*---------------------------------------------------------*/
	// expose our stuff to the global scope
	/*---------------------------------------------------------*/
	$.me.utils = Utils;

	/*---------------------------------------------------------*/
	// END END END
	/*---------------------------------------------------------*/
})(window);
/*
 * MelonJS Game Engine
 * Copyright (C) 2011, Olivier BIOT
 * http://www.melonjs.org
 *
 *
 */

(function($, undefined) {

	/************************************************************************************/
	/*      Game stat FUNCTIONS :                                                       */
	/*      a basic object to store and retreive values                                 */
	/*                                                                                  */
	/************************************************************************************/

	/* ----
		Item skeleton for game stat element
	
			--- */

	function Stat_Item(val) {
		this.defaultvalue = val || 0;
		this.value = val || 0;
		this.updated = true;
	}
	;

	/* ----
		
		reset to default value
		
		--- */

	Stat_Item.prototype.reset = function() {
		this.value = this.defaultvalue;
		this.updated = true;
	};

	/* ----
		
		update the value of an item
		
		--- */

	Stat_Item.prototype.update = function(value) {
		this.value += value;
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
	gamestat = (function() {

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
		 * @param {String} name name of the item
		 * @param {int} [val="0"] default value
		 * @example
		 * // add a "stars" item
		 * me.gamestat.add("stars", 0);
		 */
		singleton.add = function(name, val) {
			items[name] = new Stat_Item(val);
			obj.push(items[name]);
			objCount++;
		};

		/**
		 * update an item
		 * @name me.gamestat#updateValue
		 * @public
		 * @function
		 * @param {String} name name of the item
		 * @param {int} val value to be added
		 * @example
		 * // update the"stars" item
		 * me.gamestat.updateValue("stars", 1);
		 */
		singleton.updateValue = function(name, value) {
			if (items[name])
				items[name].update(value);
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
		 * @example
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

	// expose our stuff to the global scope
	$.me.gamestat = gamestat;

	/*---------------------------------------------------------*/
	// END END END
	/*---------------------------------------------------------*/
})(window);
/*
 * MelonJS Game Engine
 * Copyright (C) 2011, Olivier BIOT
 * http://www.melonjs.org
 *
 */

(function($, undefined) {
	// some regexp
	removepath = /^.*(\\|\/|\:)/;
	removeext = /\.[^\.]*$/;

	// some custom level constants
	var LevelConstants = {
		//# name of the collision map
		COLLISION_MAP : "collision",
		PARALLAX_MAP : "parallax",
	};

	/************************************************************************************/
	/*                                                                                  */
	/*      a  Tile object                                                              */
	/*                                                                                  */
	/************************************************************************************/

	var Tile = me.Rect.extend({
		init : function(x, y, w, h, tileId) {
			this.parent(new me.Vector2d(x * w, y * h), w, h);

			// tileID
			this.tileId = tileId;

			this.row = x;
			this.col = y;
		}
	});

	/************************************************************************************/
	/*                                                                                  */
	/*      a  Tileset object                                                           */
	/*                                                                                  */
	/************************************************************************************/

	function TileSet(name, tilewidth, tileheight, spacing, margin, imagesrc) {
		this.name = name;
		this.tilewidth = tilewidth;
		this.tileheight = tileheight;
		this.spacing = spacing;
		this.margin = margin;
		this.image = (imagesrc) ? me.loader.getImage(imagesrc.replace(
				removepath, '').replace(removeext, '')) : null;

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

		// number of tiles per horizontal line 
		if (this.image) {
			this.hTileCount = ~~((this.image.width - this.margin) / (this.tilewidth + this.spacing));
			this.vTileCount = ~~((this.image.height - this.margin) / (this.tileheight + this.spacing));
		}

	}
	;

	/* -----

		return the list of property for a tile
			
		------								*/

	TileSet.prototype.getPropertyList = function() {
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
	};

	/* -----

		return the assiocated property of the specified tile
		
		e.g. getTileProperty (gid)		
		
		------								*/

	TileSet.prototype.getTileProperties = function(tileId) {
		return this.TileProperties[tileId];
	};

	/* -----

		return collidable status of the specifiled tile
		
		------								*/

	TileSet.prototype.isTileCollidable = function(tileId) {
		return this.TileProperties[tileId].isCollidable;
	};

	/* -----

		return collectable status of the specifiled tile
		
		------								*/
	/*
	TileSet.prototype.isTileCollectable = function (tileId)
	{
		return this.TileProperties[tileId].isCollectable;
	};
	 */

	/* -----

		return an Image Object with the specified tile
			
		------								*/

	TileSet.prototype.getTileImage = function(tileId) {
		// create a new image object
		var image = me.video.createCanvasSurface(this.tilewidth,
				this.tileheight);

		this.drawTile(image, 0, 0, tileId);

		return image.canvas;
	};

	/* -----

		draw the x,y tile
			
		------								*/
	TileSet.prototype.drawTile = function(context, x, y, tileId, flipx, flipy) {
		var texturePositionX = this.margin + (this.spacing + this.tilewidth)
				* (tileId % this.hTileCount);
		var texturePositionY = this.margin + (this.spacing + this.tileheight)
				* ~~(tileId / this.hTileCount);

		if (flipx || flipy) {
			// "normalize" the flag value
			flipx = (flipx == 0) ? 1.0 : -1.0;
			flipy = (flipy == 0) ? 1.0 : -1.0;

			context.scale(flipx, flipy);

			x = (x * flipx) - (flipx < 0 ? this.tilewidth : 0);
			y = (y * flipy) - (flipy < 0 ? this.tileheight : 0);
		}

		context.drawImage(this.image, texturePositionX, texturePositionY,
				this.tilewidth, this.tileheight, x, y, this.tilewidth,
				this.tileheight);

		if (flipx || flipy) {
			// restore the transform matrix to the normal one
			context.setTransform(1, 0, 0, 1, 0, 0);
		}

	};

	/************************************************************************************/
	/*                                                                                  */
	/*      a generic Collision Tile based Layer object                                 */
	/*                                                                                  */
	/************************************************************************************/
	function CollisionTiledLayer(realwidth, realheight) {
		this.realwidth = realwidth;
		this.realheight = realheight;

		this.isCollisionMap = true;

	}
	;

	/* -----

		test for the world limit
			
		------*/

	CollisionTiledLayer.prototype.checkCollision = function(obj, pv) {
		//var x = (pv.x < 0) ? obj.pos.x + obj.colPos.x + pv.x: obj.pos.x + obj.colPos.x + obj.width  + pv.x- 1;
		//var y = (pv.y < 0) ? obj.pos.y + obj.colPos.y + pv.y: obj.pos.y + obj.colPos.y + obj.height + pv.y ;

		var x = (pv.x < 0) ? obj.left + pv.x : obj.right + pv.x - 1;
		var y = (pv.y < 0) ? obj.top + pv.y : obj.bottom + pv.y;

		//to return tile collision detection
		var collide = {
			x : false, // true if collision on x axis
			y : false, // true if collision on y axis
			tile : undefined,
			xprop : {},
			yprop : {}
		};

		// test x limits
		if (x <= 0 || x >= this.realwidth) {
			collide.x = true;
		}

		// test y limits
		if (y <= 0 || y >= this.realheight) {
			collide.y = true;
		}

		return collide;
	};

	/************************************************************************************/
	/*                                                                                  */
	/*      a generic Tile based Layer object                                           */
	/*                                                                                  */
	/************************************************************************************/
	function TiledLayer(w, h, tilesets, z) {
		this.width = w;
		this.height = h;

		// for displaying order
		this.z = z;

		this.name = null;
		this.visible = false;

		// data array
		this.layerData = null;

		// some lookup table to avoid unecessary math operation
		this.xLUT = {};
		this.yLUT = {};

		// a reference to the tilesets object
		this.tilesets = tilesets;
		// link to the first tileset by default
		this.tileset = tilesets?this.tilesets.getTilesetByIndex(0):null;

		// tile width & height
		this.tilewidth  = this.tileset?this.tileset.tilewidth:0;
		this.tileheight = this.tileset?this.tileset.tileheight:0;
  
		// layer "real" size
		this.realwidth = this.width * this.tilewidth;
		this.realheight = this.height * this.tileheight;
	};

	/* -----

		Create all required arrays
			
		------								*/
	TiledLayer.prototype.initArray = function(createLookup) {
		// initialize the array
		this.layerData = [];//new Array (this.width);
		for ( var x = 0; x < this.width + 1; x++) {
			this.layerData[x] = [];//new Array (this.height);
			for ( var y = 0; y < this.height + 1; y++) {
				this.layerData[x][y] = null;
			}
		}

		// create lookup table to speed up the table access
		// this is only valid for collision layer
		if (createLookup) {
			// initialize the lookuptable
			for ( var x = 0; x < this.width * this.tilewidth; x++)
				this.xLUT[x] = ~~(x / this.tilewidth);

			for ( var y = 0; y < this.height * this.tileheight; y++)
				this.yLUT[y] = ~~(y / this.tileheight);

			//console.log(this.xLUT);
		}

	};

	/* -----

		get the x,y tile
			
		------								*/
	TiledLayer.prototype.getTileId = function(x, y) {
		//return this.layerData[~~(x / this.tilewidth)][~~(y / this.tileheight)];
		var tile = this.layerData[this.xLUT[~~x]][this.yLUT[~~y]];

		return tile ? tile.tileId : null;
	};

	/* -----

		get the x,y tile
			
		------								*/
	TiledLayer.prototype.getTile = function(x, y) {
		//return this.layerData[~~(x / this.tilewidth)][~~(y / this.tileheight)];
		return this.layerData[this.xLUT[~~x]][this.yLUT[~~y]];
	};

	/* -----

		set the x,y tile
			
		------								*/
	TiledLayer.prototype.setTile = function(x, y, tileId) {
		this.layerData[x][y] = new Tile(x, y, this.tilewidth, this.tileheight,
				tileId);
	};

	/* -----

		clear a tile
			
		------								*/
	TiledLayer.prototype.clearTile = function(x, y) {
		// clearing tile
		this.layerData[x][y] = null;
	};

	/* -----

		check for collision 
		obj - obj
		pv   - projection vector
		
		res : result collision object
			
		------*/

	TiledLayer.prototype.checkCollision = function(obj, pv) {

		//var x = (pv.x > 0) ? obj.pos.x + obj.colPos.x + obj.width  + pv.x - 1 : obj.pos.x + obj.colPos.x + pv.x; // first pv.x - 1
		//var y = (pv.y > 0) ? obj.pos.y + obj.colPos.y + obj.height + pv.y	: obj.pos.y + obj.colPos.y + pv.y ;

		x = (pv.x < 0) ? obj.left + pv.x : obj.right + pv.x;
		y = (pv.y < 0) ? obj.top + pv.y : obj.bottom + pv.y;
		//to return tile collision detection
		collide = {
			x : false, // true if collision on x axis
			xtile : undefined,
			xprop : {},
			y : false, // true if collision on y axis
			ytile : undefined,
			yprop : {}
		};

		//var tile;
		if (x <= 0 || x >= this.realwidth) {
			collide.x = true;
		} else {
			//console.log(obj.bottom);
			// x, bottom corner
			collide.xtile = this.getTile(x, obj.bottom - 1);// obj.height - 1
			if (collide.xtile
					&& this.tileset.isTileCollidable(collide.xtile.tileId)) {
				collide.x = true;
				collide.xprop = this.tileset
						.getTileProperties(collide.xtile.tileId);
			} else {
				// x, top corner
				collide.xtile = this.getTile(x, obj.top);
				if (collide.xtile
						&& this.tileset.isTileCollidable(collide.xtile.tileId)) {
					collide.x = true;
					collide.xprop = this.tileset
							.getTileProperties(collide.xtile.tileId);
				}
			}
		}

		// check for y movement
		// left, y corner
		collide.ytile = this.getTile((pv.x < 0) ? obj.left : obj.right, y);// obj.width + 1
		if (collide.ytile
				&& this.tileset.isTileCollidable(collide.ytile.tileId)) {
			collide.y = true;
			collide.yprop = this.tileset
					.getTileProperties(collide.ytile.tileId);
		} else { // right, y corner
			collide.ytile = this.getTile((pv.x < 0) ? obj.right : obj.left, y);
			if (collide.ytile
					&& this.tileset.isTileCollidable(collide.ytile.tileId)) {
				collide.y = true;
				collide.yprop = this.tileset
						.getTileProperties(collide.ytile.tileId);
			}
		}

		return collide;
	};

	/* -----

		a dummy update function
			
		------								*/
	TiledLayer.prototype.update = function() {
		return false;
	};

	/************************************************************************************/
	/*       a basic level object skeleton                                              */
	/************************************************************************************/
	function TileMap(x, y) {
		this.pos = new me.Vector2d(x, y);
		this.z = 0;

		// tilemap size
		this.width = 0;
		this.height = 0;

		// realwidth (in pixels) of the level
		this.realwidth = -1;
		this.realheight = -1;

		// tile size
		this.tilewidth = 0;
		this.tileheight = 0;

		// corresponding tileset for this map
		this.tilesets = null;

		// map layers
		this.mapLayers = [];

		// map Object
		this.objectGroups = [];

		// loading flag
		this.initialized = false;

	};

	/* -----

		a dummy update function
			
		------								*/
	TileMap.prototype.reset = function() {
		this.tilesets = null;
		this.mapLayers = [];
		this.objectGroups = [];
		this.initialized = false;
	};

	/* -----

		return the specified object group
			
		------*/

	TileMap.prototype.getObjectGroupByName = function(name) {
		return this.objectGroups[name];
	};

	/* -----

		return all the object group
			
		------*/

	TileMap.prototype.getObjectGroups = function() {
		return this.objectGroups;
	};

	/* -----

		return the specified layer object
			
		------*/

	TileMap.prototype.getLayerByName = function(name) {
		var layer = null;

		// normalize name
		name = name.trim().toLowerCase();
		for ( var i = this.mapLayers.length; i--;) {
			if (this.mapLayers[i].name.contains(name)) {
				layer = this.mapLayers[i];
				break;
			}
		}
		;

		// return a fake collision layer if not found
		if ((name.contains(LevelConstants.COLLISION_MAP)) && (layer == null)) {
			layer = new CollisionTiledLayer(me.game.currentLevel.realwidth,
					me.game.currentLevel.realheight);
		}

		return layer;
	};

	/*  -----
		
		 clear a tile from all layers
		
		------				*/

	TileMap.prototype.clearTile = function(x, y) {
		// add all layers
		for ( var i = this.mapLayers.length; i--;) {
			// that are visible
			if (this.mapLayers[i].visible || this.mapLayers[i].isCollisionMap) {
				this.mapLayers[i].clearTile(x, y);
			}
		}
		;
	};

	/*  -----
		
		 add all visible layers to the game mngr
		
		------				*/

	TileMap.prototype.addTo = function(gameMngr) {
		// add ourself (for background color)
		if (this.visible) {
			gameMngr.add(this);
		}

		// add all layers
		for ( var i = this.mapLayers.length; i--;) {
			// that are visible
			if (this.mapLayers[i].visible) {
				gameMngr.add(this.mapLayers[i]);
			}
		}
		;
	};

	/* -----

		a dummy update function
			
		------								*/
	TileMap.prototype.update = function() {
		return false;
	};

	// TMX extends sprite object to benefit from some
	// nice mechanism (sprite Object to be redone)
	//LevelEntity.prototype = new me.SpriteObject();

	/************************************************************************************/
	/*                                                                                  */
	/*      a level Director                                                            */
	/*                                                                                  */
	/************************************************************************************/
	/**
	 * a level manager object <br>
	 * once ressources loaded, the level director contains all references of defined levels<br>
	 * There is no constructor function for me.levelDirector, this is a static object
	 * @final
	 * @memberOf me
	 * @constructor Should not be called by the user.
	 */
	levelDirector = (function() {
		// hold public stuff in our singletong
		var obj = {};

		/*---------------------------------------------
			
			PRIVATE STUFF
				
			---------------------------------------------*/

		// our levels
		var levels = {};
		// current level
		var currentLevel = null;

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
			}
			//else console.log("level %s already loaded", levelId);

			// call the callback if defined
			if (callback)
				callback();
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
		obj.loadLevel = function(level) {
			if (levels[level] === undefined) {
				throw ("melonJS: level %s not found" + level);
				return;
			}

			if (levels[level] instanceof me.TMXTileMap) {

				// check the status of the state mngr
				isRunning = me.state.isRunning();

				if (isRunning) {
					// pause the game loop to avoid 
					// some silly side effects
					me.state.pause();
				}

				// reset the gameObject Manager (just in case!)
				me.game.reset();
				// load the level
				levels[level].reset();
				levels[level].load();
				// set the current level
				currentLevel = level;
				// add the specified level to the game manager
				me.game.loadTMXLevel(levels[currentLevel]);

				if (isRunning) {
					// resume the game loop if it was
					// previously running
					me.state.resume();
				}
			} else
				throw "melonJS: no level loader defined";
		};

		/**
		 * return the current level id<br>
		 * @name me.levelDirector#getCurrentLevelId
		 * @public
		 * @function
		 * @return {String}
		 */
		obj.getCurrentLevelId = function() {
			return currentLevel;
		},

		/**
		 * reload the current level<br>
		 * @name me.levelDirector#getCurrentLevelId
		 * @public
		 * @function
		 */
		obj.reloadLevel = function() {
			// reset the level to initial state
			//levels[currentLevel].reset();
			return obj.loadLevel(currentLevel);
		},

		/**
		 * load the next level<br>
		 * @name me.levelDirector#nextLevel
		 * @public
		 * @function
		 */
		obj.nextLevel = function() {
			//go to the next level 
			if (currentLevel + 1 < levels.length) {
				return obj.loadLevel(currentLevel + 1);
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
			if (currentLevel - 1 >= 0) {
				return obj.loadLevel(currentLevel - 1);
			} else {
				return false;
			}
		};

		/* -----

			set the specified level  
		
			------ 
		
		obj.goToLevel = function(level)
		{
			obj.loadLevel(level);
		};
		 */

		// return our object
		return obj;

	})();

	/*---------------------------------------------------------*/
	// expose our stuff to the global scope
	/*---------------------------------------------------------*/
	$.me.Tile = Tile;
	$.me.TileSet = TileSet;
	$.me.TiledLayer = TiledLayer;
	$.me.TileMap = TileMap
	$.me.LevelConstants = LevelConstants;
	$.me.levelDirector = levelDirector;

	/*---------------------------------------------------------*/
	// END END END
	/*---------------------------------------------------------*/
})(window);
/*
 * MelonJS Game Engine
 * Copyright (C) 2011, Olivier BIOT
 * http://www.melonjs.org
 *
 *
 * TMX Loader
 * Tile QT 0.7.x format
 *	http://www.mapeditor.org/	
 *
 */

(function($, undefined) {
		
	// some TMX constants
	var
	TMX_TAG_MAP                 = "map",
	TMX_TAG_NAME                = "name",
	TMX_TAG_VALUE               = "value",	
	TMX_TAG_VERSION             = "version",
	TMX_TAG_ORIENTATION	        = "orientation",
	TMX_TAG_WIDTH               = "width",
	TMX_TAG_HEIGHT              = "height",
	TMX_TAG_OPACITY             = "opacity",
	TMX_TAG_TRANS               = "trans",
	TMX_TAG_TILEWIDTH           = "tilewidth",
	TMX_TAG_TILEHEIGHT          = "tileheight",
	TMX_TAG_FIRSTGID            = "firstgid",
	TMX_TAG_GID                 = "gid",
	TMX_TAG_TILE                = "tile",
	TMX_TAG_ID                  = "id",
	TMX_TAG_DATA                = "data",
	TMX_TAG_COMPRESSION         = "compression",
	TMX_TAG_ENCODING            = "encoding",
	TMX_TAG_ATTR_BASE64         = "base64",
	TMX_TAG_CSV                 = "csv",
	TMX_TAG_SPACING             = "spacing",
	TMX_TAG_MARGIN              = "margin",
	TMX_TAG_PROPERTIES          = "properties",
	TMX_TAG_PROPERTY            = "property",
	TMX_TAG_IMAGE               = "image",
	TMX_TAG_SOURCE              = "source",
	TMX_TAG_VISIBLE             = "visible",
	TMX_TAG_TILESET             = "tileset",
	TMX_TAG_LAYER               = "layer",
	TMX_TAG_OBJECTGROUP         = "objectgroup",
	TMX_TAG_OBJECT              = "object",
	TMX_TAG_X                   = "x",
	TMX_TAG_Y                   = "y",
	TMX_TAG_WIDTH               = "width",
	TMX_TAG_HEIGHT              = "height",

	// some other global value 

	// bitmaks to check for flipped tiles
	FlipH_Flag                  = 0x80000000,
	FlipV_Flag                  = 0x40000000;

	
	/* -----

		check if properties are defined for the given objet
			
		------									*/

	function setTMXProperties(obj, xmldata) {
		var layer_properties = xmldata.getElementsByTagName(TMX_TAG_PROPERTIES)[0];

		if (layer_properties) {
			var oProp = layer_properties.getElementsByTagName(TMX_TAG_PROPERTY);

			for ( var i = 0; i < oProp.length; i++) {
				applyTMXProperty(obj, oProp[i]);
			}
		}

	}
	;

	/* -----

		apply the specified TMX properties (name, value) to the object
			
		------									*/

	function applyTMXProperty(object, prop) {
		var propname = me.XMLParser.getStringAttribute(prop, TMX_TAG_NAME);
		var value = me.XMLParser.getStringAttribute(prop, TMX_TAG_VALUE);

		// if value not defined or boolean
		if (!value || value.isBoolean()) {
			value = value ? (value == "true") : true;
		}
		// check if numeric
		else if (value.isNumeric()) {
			value = parseInt(value);
		}
		// add the new prop to the object prop list
		object[propname] = value;
	};

	/***************************************************************/
	/*                                                             */
	/*    Manage a tile map                                        */
	/*    Tile QT 0.7.0 format                                     */
	/*    http://www.mapeditor.org/                                */
	/*                                                             */
	/***************************************************************/
	function TMXTileMap(xmlfile, x, y) {
		// call the constructor
		me.TileMap.call(this, x, y);

		this.xmlMap = me.loader.getXML(xmlfile);

		if (!this.xmlMap) {
			throw "melonJS:" + xmlfile + " TMX map not found";
		}

		// tilemap version
		this.version = "";

		// map type (only orthogonal format supported)
		this.orientation = "";

		// a canvas where to draw our map(s)
		this.tileMapCanvas = null;
      
      // tileset(s)
      this.tilesets = null;

	};
	TMXTileMap.prototype = new me.TileMap();

	/* -----

		Load & initialize the Tile Map
			
		------									*/
	TMXTileMap.prototype.load = function() {
		// if already loaded, do nothing
		if (this.initialized)
			return;

		// to automatically increment z index
		var zOrder = 0,
		// and parallax layer speed
		pLayer = 1;

		// init the parser
		me.XMLParser.parseFromString(this.xmlMap);

		// retreive all the elements of the XML file
		var xmlElements = me.XMLParser.getAllTagElements();

		// parse all tags
		for ( var i = 0; i < xmlElements.length; i++) {
			// check each Tag
			var tagName = xmlElements.item(i).nodeName;

			switch (tagName) {
            // get the map information
            case TMX_TAG_MAP: {
               var map = xmlElements.item(i);
               this.version = me.XMLParser.getStringAttribute(map, TMX_TAG_VERSION);
               this.orientation = me.XMLParser.getStringAttribute(map, TMX_TAG_ORIENTATION);
               this.width = me.XMLParser.getIntAttribute(map, TMX_TAG_WIDTH);
               this.height = me.XMLParser.getIntAttribute(map, TMX_TAG_HEIGHT);
               this.tilewidth = me.XMLParser.getIntAttribute(map,	TMX_TAG_TILEWIDTH);
               this.tileheight = me.XMLParser.getIntAttribute(map, TMX_TAG_TILEHEIGHT);
               this.realwidth = this.width * this.tilewidth;
               this.realheight = this.height * this.tileheight;
               this.z = zOrder++;

               // check some returned values
               if (this.orientation != "orthogonal") {
                  throw "melonJS: " + this.orientation + " type TMX Tile Map not supported!";
               }

               // set the map properties (if any)
               setTMXProperties(this, map);

               // ensure the visible flag is set to false, by default
               this.visible = false;

               // check if a backgroud color is defined  
               if (this.background_color) {
                  this.visible = true;
                  // convert to a rgb string (needed for Opera)
                  this.background_color = me.utils
                        .HexToRGB(this.background_color);
               }

               // check if a backgroud image is defined
               if (this.background_image) {
                  this.visible = true;
                  // retrieve the corresponding image ressource
                  this.background_image = me.loader.getImage(this.background_image);
               }
               break;
            }
               

            // get the tileset information
            case TMX_TAG_TILESET: {
            
               // Initialize our object if not yet done
               if (!this.tilesets)
               {
                  // make sure tilesets if of the right type
                  this.tilesets = new TMXTileSetGroup();
               }

               // add the new tileset
               this.tilesets.add(new TMXTileSet(xmlElements.item(i)));
               break;
            }
               

            // get the layer(s) information
            case TMX_TAG_LAYER: {
               // try to identify specific layer type based on the naming convention
               var layer_name = me.XMLParser.getStringAttribute(xmlElements
                     .item(i), TMX_TAG_NAME);

               // parallax layer
               if (layer_name.contains(me.LevelConstants.PARALLAX_MAP)) {
                  var visible = (me.XMLParser.getIntAttribute(xmlElements
                        .item(i), TMX_TAG_VISIBLE, 1) == 1);

                  // only add if visible
                  if (visible) {
                     // check the object properties 
                     var tprop = {};
                     setTMXProperties(tprop, xmlElements.item(i));

                     // check if we already have a parallax layer
                     parallax_layer = this.getLayerByName(me.LevelConstants.PARALLAX_MAP);

                     if (!parallax_layer) {
                        parallax_layer = new me.ParallaxBackgroundEntity(zOrder);
                        this.mapLayers.push(parallax_layer);
                     }
                     // add the new parallax layer
                     parallax_layer.addLayer(tprop.imagesrc, pLayer++, zOrder++);
                  }
               }
               else {
                  // regular layer or collision layer
                  this.mapLayers.push(new TMXLayer(xmlElements.item(i),
                                       this.tilesets, zOrder++));
                  zOrder++;
               }
               break;
            }
               

            // get the object groups information
            case TMX_TAG_OBJECTGROUP: {
               var name = me.XMLParser.getStringAttribute(xmlElements.item(i), TMX_TAG_NAME);
               this.objectGroups.push(new TMXOBjectGroup(name, xmlElements.item(i), this.tilesets, zOrder++));
               break;
            }
				
			} // end switch 
		} // end for

		// free the XMLParser ressource
		me.XMLParser.free();

		// flag as loaded
		this.initialized = true;

	};

	/* -----

		draw the tile map
		this is only called if the background_color property is defined
			
		------								*/
	TMXTileMap.prototype.draw = function(context, rect) {
		if (this.background_color) {
			// set the background color
			context.fillStyle = this.background_color;
			// clear the specified rect
			context.fillRect(rect.left, rect.top, rect.width, rect.height);
		}
		if (this.background_image) {
			context.drawImage(this.background_image, rect.left, rect.top,
					rect.width, rect.height, rect.left, rect.top, rect.width,
					rect.height);

		}
	};

	/**************************************************/
	/*                                                */
	/*      Tileset Management                        */
	/*                                                */
	/**************************************************/
	
	/* -------------------------
	 * Manage a group of Tileset
	 * -------------------------*/
	function TMXTileSetGroup() {
		this.tilesets = [];
	};
	/*
	 * add a tileset to the tileset group
	 */
	TMXTileSetGroup.prototype.add = function(tileset) {
		this.tilesets.push(tileset);
	};

	/*
	 * return the tileset at the specified index
	 */
	TMXTileSetGroup.prototype.getTilesetByIndex = function(i) {
		return this.tilesets[i];
	};
   
	/*
	 * return the tileset corresponding to  the specified gid
	 *		
	 */
	TMXTileSetGroup.prototype.getTilesetByGid = function(gid) {
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
	};
   
	/* -------------------------
	 * Tileset Object
	 * -------------------------*/
	function TMXTileSet(xmltileset) {

		// first gid
		this.firstgid = me.XMLParser.getIntAttribute(xmltileset, TMX_TAG_FIRSTGID);

		// call our super parent
		me.TileSet.call(this,
                        me.XMLParser.getStringAttribute(xmltileset, TMX_TAG_NAME),
                        me.XMLParser.getIntAttribute(xmltileset, TMX_TAG_TILEWIDTH),
                        me.XMLParser.getIntAttribute(xmltileset, TMX_TAG_TILEHEIGHT),
                        me.XMLParser.getIntAttribute(xmltileset, TMX_TAG_SPACING, 0), 
                        me.XMLParser.getIntAttribute(xmltileset, TMX_TAG_MARGIN, 0), 
                        xmltileset.getElementsByTagName(TMX_TAG_IMAGE)[0].getAttribute(TMX_TAG_SOURCE));
		
		// compute the last gid value in the tileset
		this.lastgid = this.firstgid + ( ((this.hTileCount * this.vTileCount) - 1) || 0);
      
		// check if transparency is defined for a specific color
		this.trans = xmltileset.getElementsByTagName(TMX_TAG_IMAGE)[0].getAttribute(TMX_TAG_TRANS);

		// set Color Key for transparency if needed
		if (this.trans !== null && this.image) {
			// applyRGB Filter (return a context object)
			this.image = me.video.applyRGBFilter(this.image, "transparent", this.trans.toUpperCase()).canvas;
		}

		// set tile properties, if any
		var tileInfo = xmltileset.getElementsByTagName(TMX_TAG_TILE);
		for ( var i = 0; i < tileInfo.length; i++) {
			var tileID = me.XMLParser.getIntAttribute(tileInfo[i], TMX_TAG_ID) + this.firstgid;

			this.TileProperties[tileID] = {};

			tileProp = this.TileProperties[tileID];

			// apply tiled defined properties
			setTMXProperties(tileProp, tileInfo[i]);

			// check what we found and adjust property
			tileProp.isSolid = tileProp.type ? tileProp.type.toLowerCase() === this.type.SOLID : false;
			tileProp.isPlatform = tileProp.type ? tileProp.type.toLowerCase() === this.type.PLATFORM : false;
			tileProp.isLeftSlope = tileProp.type ? tileProp.type.toLowerCase() === this.type.L_SLOPE : false;
			tileProp.isRightSlope = tileProp.type ? tileProp.type.toLowerCase() === this.type.R_SLOPE	: false;
			tileProp.isBreakable = tileProp.type ? tileProp.type.toLowerCase() === this.type.BREAKABLE : false;
			tileProp.isLadder = tileProp.type ? tileProp.type.toLowerCase() === this.type.LADDER : false;
			tileProp.isSlope = tileProp.isLeftSlope || tileProp.isRightSlope;

			// ensure the collidable flag is correct
			tileProp.isCollidable = tileProp.isSolid || tileProp.isPlatform
					|| tileProp.isSlope || tileProp.isLadder
					|| tileProp.isBreakable;

		}

	};
	TMXTileSet.prototype = new me.TileSet();

	/*
	 * check if the gid belongs to the tileset
	 */
	TMXTileSet.prototype.contains = function(gid) {
		return (gid >= this.firstgid && gid <= this.lastgid)
	}
	
	/************************************************************************************/
	/*                                                                                  */
	/*      Tile map Stuff                                                              */
	/*      Manage a tile Layer                                                         */
	/*                                                                                  */
	/************************************************************************************/
	function TMXLayer(layer, tilesets, zOrder) {
		// call the parent
		me.TiledLayer.call(this, 
                         me.XMLParser.getIntAttribute(layer, TMX_TAG_WIDTH), 
                         me.XMLParser.getIntAttribute(layer, TMX_TAG_HEIGHT),
                         // tilesets should exist here !
                         tilesets, zOrder);
      
 		// get invalidated when the viewport is changed
		this.layerInvalidated = true;
		this.name = me.XMLParser.getStringAttribute(layer, TMX_TAG_NAME);
		this.visible = (me.XMLParser.getIntAttribute(layer, TMX_TAG_VISIBLE, 1) == 1);
		this.opacity = me.XMLParser.getFloatAttribute(layer, TMX_TAG_OPACITY, 1.0);
            
		// check if we have any properties 
		setTMXProperties(this, layer);

		// detect if the layer is a collision map
		this.isCollisionMap = (this.name.contains(me.LevelConstants.COLLISION_MAP));
		if (this.isCollisionMap) {
			// force the layer as invisible
			this.visible = false;
		}

		// link to the gameviewport;
		this.vp = me.game.viewport;

		// store the data information
		var xmldata = layer.getElementsByTagName(TMX_TAG_DATA)[0];
		var encoding = me.XMLParser.getStringAttribute(xmldata, TMX_TAG_ENCODING, null);
		var compression = me.XMLParser.getStringAttribute(xmldata, TMX_TAG_COMPRESSION, null);

		// make sure this is not happening
		if (encoding == '')
			encoding = null;
		if (compression == '')
			compression = null;

		// create a canvas where to draw our layer
		if (this.visible) {
			this.layerSurface = me.video.createCanvasSurface(this.width
					* this.tilewidth, this.height * this.tileheight);
			this.layerCanvas = this.layerSurface.canvas;

			// set alpha value for this layer
			if (this.opacity > 0.0 && this.opacity < 1.0) {
				this.layerSurface.globalAlpha = this.opacity;
			}
		}

		if (this.visible || this.isCollisionMap) {
			// initialize the layer lookup table (only in case of collision map)
			this.initArray(this.isCollisionMap);

			// populate our level with some data
			this.fillArray(xmldata, encoding, compression);
		}
	};
	TMXLayer.prototype = new me.TiledLayer();

	/* -----

		Build the tiled layer
			
		------								*/
	TMXLayer.prototype.fillArray = function(xmldata, encoding, compression) {
		// check if data is compressed
		switch (compression) {
         
         // no compression
         case null: {
            // decode data based on encoding type
            switch (encoding) {
            // XML encoding
               case null: {
                  var data = xmldata.getElementsByTagName(TMX_TAG_TILE);
                  break;
               }
               
               // CSV encoding
               case TMX_TAG_CSV:
                  // Base 64 encoding
               case TMX_TAG_ATTR_BASE64: {
                  // Merge all childNodes[].nodeValue into a single one
                  var nodeValue = '';
                  for ( var i = 0, len = xmldata.childNodes.length; i < len; i++) {
                     nodeValue += xmldata.childNodes[i].nodeValue;
                  }
                  // and then decode them
                  if (encoding == TMX_TAG_ATTR_BASE64)
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

		// I love reversed loop !
		var idx = data.length - 1;

		var flipx, flipy;

		// set everything
		for ( var y = this.height - 1; y >= 0; y--) {
			for ( var x = this.width - 1; x >= 0; x--) {
				// get the value of the gid
				gid = (encoding == null) ? me.XMLParser.getIntAttribute(data[idx--], TMX_TAG_GID) : data[idx--];

				// check if tile is horizontally flipped
				// (this should be save somewhere!)
				flipx = (gid & FlipH_Flag);

				// check if tile is vertically flipped
				// (this should be save somewhere!)
				flipy = (gid & FlipV_Flag);

				// clear out the flags
				gid &= ~(FlipH_Flag | FlipV_Flag);

				// fill the array										
				if (gid > 0) {
					this.setTile(x, y, gid);
					// check if we are using the right tileset
					if (!this.tileset.contains(gid)) {
						// switch to the right tileset
						this.tileset = this.tilesets.getTilesetByGid(gid);
					}
				   
					if (this.visible) {
					  //draw our tile
					  this.tileset.drawTile(this.layerSurface, 
										   x * this.tilewidth, y * this.tileheight,
										   gid - this.tileset.firstgid, flipx, flipy);

					}
				}
			}
		}

		// make sure data is deallocated :)
		data = null;

	};

	/* -----

		clear a tile
			
		------								*/
	TMXLayer.prototype.clearTile = function(x, y) {
		// call the parent function
		me.TiledLayer.prototype.clearTile.call(this, x, y);
		// erase the corresponding area in the canvas
		if (this.visible) {
			this.layerSurface.clearRect(x * this.tilewidth,
					y * this.tileheight, this.tilewidth, this.tileheight);
		}
	};

	/* -----

		draw a tileset layer
			
		------								*/
	TMXLayer.prototype.draw = function(context, rect) {
		context.drawImage(this.layerCanvas, 
                        this.vp.pos.x + rect.pos.x, //sx
                        this.vp.pos.y + rect.pos.y, //sy
                        rect.width, rect.height,    //sw, sh
                        rect.pos.x, rect.pos.y,     //dx, dy
                        rect.width, rect.height);   //dw, dh
	};

	/************************************************************************************/
	/*                                                                                  */
	/*      Tile map Stuff                                                              */
	/*      Manage a Object Group                                                       */
	/*                                                                                  */
	/************************************************************************************/
	function TMXOBjectGroup(name, tmxObjGroup, tilesets, z) {
		this.objects = [];

		this.name   = name;
		this.width  = me.XMLParser.getIntAttribute(tmxObjGroup, TMX_TAG_WIDTH);
		this.height = me.XMLParser.getIntAttribute(tmxObjGroup, TMX_TAG_HEIGHT);
		this.z      = z;

		var data = tmxObjGroup.getElementsByTagName(TMX_TAG_OBJECT);

		for ( var i = 0; i < data.length; i++) {
			this.objects.push(new TMXOBject(data[i], tilesets, z));
		}

	};

	TMXOBjectGroup.prototype.getObjectCount = function() {
		return this.objects.length;
	};

	TMXOBjectGroup.prototype.getObjectByIndex = function(idx) {
		return this.objects[idx];
	};

	/************************************************************************************/
	/*                                                                                  */
	/*      Tile map Stuff                                                              */
	/*      Manage a TMX Object                                                         */
	/*                                                                                  */
	/************************************************************************************/
	function TMXOBject(tmxObj, tilesets, z) {
		this.name = me.XMLParser.getStringAttribute(tmxObj, TMX_TAG_NAME);
		this.x = me.XMLParser.getIntAttribute(tmxObj, TMX_TAG_X);
		this.y = me.XMLParser.getIntAttribute(tmxObj, TMX_TAG_Y);
		this.z = z;

		this.gid = me.XMLParser.getIntAttribute(tmxObj, TMX_TAG_GID, null);
		// check if the object has an associated gid	
		if (this.gid) {
			
			// get the corresponding tileset
			tileset = tilesets.getTilesetByGid(this.gid);
         
			// set width and height equal to tile size
			this.width = tileset.tilewidth;
			this.height = tileset.tileheight;

			// force spritewidth size
			this.spritewidth = this.width;
			// adjust y coordinates (bug in tile 0.6.2?)
			this.y -= this.height;

			// get the corresponding tile into our object
			this.image = tileset.getTileImage(this.gid - tileset.firstgid);
		} 
		else {
			this.width = me.XMLParser.getIntAttribute(tmxObj, TMX_TAG_WIDTH, 0);
			this.height = me.XMLParser.getIntAttribute(tmxObj, TMX_TAG_HEIGHT, 0);
		}
		// set the object properties
		setTMXProperties(this, tmxObj);

	};

	/* -----

		return the specified object group
			
		------									*/
	TMXOBject.prototype.getObjectPropertyByName = function(name) {
		return this[name];
	};

	/*------------------------------------------------------*/
	// expose our stuff to the me scope
	/*------------------------------------------------------*/
	$.me.TMXTileMap = TMXTileMap;
	/*---------------------------------------------------------*/
	// END END END
	/*---------------------------------------------------------*/
})(window);
/*!
 * Tween JS
 * https://github.com/sole/Tween.js
 *
 * author sole / http://soledadpenades.com
 * author mr.doob / http://mrdoob.com
 * author Robert Eisele / http://www.xarg.org
 * author Philippe / http://philippe.elsass.me
 * author Robert Penner / http://www.robertpenner.com/easing_terms_of_use.html
 */

(function($, undefined) {
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
	Tween = function(object) {

		var _object = object, _valuesStart = {}, _valuesDelta = {}, _valuesEnd = {}, _duration = 1000, _delayTime = 0, _startTime = null, _easingFunction = Tween.Easing.Linear.EaseNone, _chainedTween = null, _onUpdateCallback = null, _onCompleteCallback = null;

		/**
		 * object properties to be updated and duration
		 * @name me.Tween#to
		 * @public
		 * @function
		 * @param {Properties} prop list of properties
		 * @param {int} duration tween duration
		 */
		this.to = function(properties, duration) {

			if (duration !== null) {

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

			elapsed = (time - _startTime) / _duration;
			elapsed = elapsed > 1 ? 1 : elapsed;

			value = _easingFunction(elapsed);

			for (property in _valuesDelta) {

				_object[property] = _valuesStart[property]
						+ _valuesDelta[property] * value;

			}

			if (_onUpdateCallback !== null) {

				_onUpdateCallback.call(_object, value);

			}

			if (elapsed == 1) {

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
	Tween.Easing = {
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
	Tween.Easing.Linear.EaseNone = function(k) {

		return k;

	};

	/** @ignore */
	Tween.Easing.Quadratic.EaseIn = function(k) {

		return k * k;

	};
	/** @ignore */
	Tween.Easing.Quadratic.EaseOut = function(k) {

		return -k * (k - 2);

	};
	/** @ignore */
	Tween.Easing.Quadratic.EaseInOut = function(k) {

		if ((k *= 2) < 1)
			return 0.5 * k * k;
		return -0.5 * (--k * (k - 2) - 1);

	};
	/** @ignore */
	Tween.Easing.Cubic.EaseIn = function(k) {

		return k * k * k;

	};
	/** @ignore */
	Tween.Easing.Cubic.EaseOut = function(k) {

		return --k * k * k + 1;

	};
	/** @ignore */
	Tween.Easing.Cubic.EaseInOut = function(k) {

		if ((k *= 2) < 1)
			return 0.5 * k * k * k;
		return 0.5 * ((k -= 2) * k * k + 2);

	};
	/** @ignore */
	Tween.Easing.Quartic.EaseIn = function(k) {

		return k * k * k * k;

	};
	/** @ignore */
	Tween.Easing.Quartic.EaseOut = function(k) {

		return -(--k * k * k * k - 1);

	}
	/** @ignore */
	Tween.Easing.Quartic.EaseInOut = function(k) {

		if ((k *= 2) < 1)
			return 0.5 * k * k * k * k;
		return -0.5 * ((k -= 2) * k * k * k - 2);

	};
	/** @ignore */
	Tween.Easing.Quintic.EaseIn = function(k) {

		return k * k * k * k * k;

	};
	/** @ignore */
	Tween.Easing.Quintic.EaseOut = function(k) {

		return (k = k - 1) * k * k * k * k + 1;

	};
	/** @ignore */
	Tween.Easing.Quintic.EaseInOut = function(k) {

		if ((k *= 2) < 1)
			return 0.5 * k * k * k * k * k;
		return 0.5 * ((k -= 2) * k * k * k * k + 2);

	};
	/** @ignore */
	Tween.Easing.Sinusoidal.EaseIn = function(k) {

		return -Math.cos(k * Math.PI / 2) + 1;

	};
	/** @ignore */
	Tween.Easing.Sinusoidal.EaseOut = function(k) {

		return Math.sin(k * Math.PI / 2);

	};
	/** @ignore */
	Tween.Easing.Sinusoidal.EaseInOut = function(k) {

		return -0.5 * (Math.cos(Math.PI * k) - 1);

	};
	/** @ignore */
	Tween.Easing.Exponential.EaseIn = function(k) {

		return k == 0 ? 0 : Math.pow(2, 10 * (k - 1));

	};
	/** @ignore */
	Tween.Easing.Exponential.EaseOut = function(k) {

		return k == 1 ? 1 : -Math.pow(2, -10 * k) + 1;

	};
	/** @ignore */
	Tween.Easing.Exponential.EaseInOut = function(k) {

		if (k == 0)
			return 0;
		if (k == 1)
			return 1;
		if ((k *= 2) < 1)
			return 0.5 * Math.pow(2, 10 * (k - 1));
		return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);

	};
	/** @ignore */
	Tween.Easing.Circular.EaseIn = function(k) {

		return -(Math.sqrt(1 - k * k) - 1);

	};
	/** @ignore */
	Tween.Easing.Circular.EaseOut = function(k) {

		return Math.sqrt(1 - --k * k);

	};
	/** @ignore */
	Tween.Easing.Circular.EaseInOut = function(k) {

		if ((k /= 0.5) < 1)
			return -0.5 * (Math.sqrt(1 - k * k) - 1);
		return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);

	};
	/** @ignore */
	Tween.Easing.Elastic.EaseIn = function(k) {

		var s, a = 0.1, p = 0.4;
		if (k == 0)
			return 0;
		if (k == 1)
			return 1;
		if (!p)
			p = 0.3;
		if (!a || a < 1) {
			a = 1;
			s = p / 4;
		} else
			s = p / (2 * Math.PI) * Math.asin(1 / a);
		return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s)
				* (2 * Math.PI) / p));

	};
	/** @ignore */
	Tween.Easing.Elastic.EaseOut = function(k) {

		var s, a = 0.1, p = 0.4;
		if (k == 0)
			return 0;
		if (k == 1)
			return 1;
		if (!p)
			p = 0.3;
		if (!a || a < 1) {
			a = 1;
			s = p / 4;
		} else
			s = p / (2 * Math.PI) * Math.asin(1 / a);
		return (a * Math.pow(2, -10 * k)
				* Math.sin((k - s) * (2 * Math.PI) / p) + 1);

	};
	/** @ignore */
	Tween.Easing.Elastic.EaseInOut = function(k) {

		var s, a = 0.1, p = 0.4;
		if (k == 0)
			return 0;
		if (k == 1)
			return 1;
		if (!p)
			p = 0.3;
		if (!a || a < 1) {
			a = 1;
			s = p / 4;
		} else
			s = p / (2 * Math.PI) * Math.asin(1 / a);
		if ((k *= 2) < 1)
			return -0.5
					* (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s)
							* (2 * Math.PI) / p));
		return a * Math.pow(2, -10 * (k -= 1))
				* Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;

	};
	/** @ignore */
	Tween.Easing.Back.EaseIn = function(k) {

		var s = 1.70158;
		return k * k * ((s + 1) * k - s);

	};
	/** @ignore */
	Tween.Easing.Back.EaseOut = function(k) {

		var s = 1.70158;
		return (k = k - 1) * k * ((s + 1) * k + s) + 1;

	};
	/** @ignore */
	Tween.Easing.Back.EaseInOut = function(k) {

		var s = 1.70158 * 1.525;
		if ((k *= 2) < 1)
			return 0.5 * (k * k * ((s + 1) * k - s));
		return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);

	};
	/** @ignore */
	Tween.Easing.Bounce.EaseIn = function(k) {

		return 1 - Tween.Easing.Bounce.EaseOut(1 - k);

	};
	/** @ignore */
	Tween.Easing.Bounce.EaseOut = function(k) {

		if ((k /= 1) < (1 / 2.75)) {

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
	Tween.Easing.Bounce.EaseInOut = function(k) {

		if (k < 0.5)
			return Tween.Easing.Bounce.EaseIn(k * 2) * 0.5;
		return Tween.Easing.Bounce.EaseOut(k * 2 - 1) * 0.5 + 0.5;

	};

	/*---------------------------------------------------------*/
	// expose our stuff to the global scope
	/*---------------------------------------------------------*/
	$.me.Tween = Tween;

	/*---------------------------------------------------------*/
	// END END END
	/*---------------------------------------------------------*/
})(window);