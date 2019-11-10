/*!
 * oCanvas v2.8.3
 * http://ocanvas.org/
 *
 * Copyright 2011-2015, Johannes Koggdal
 * Licensed under the MIT license
 * http://ocanvas.org/license
 *
 * Including Xccessors by Eli Grey
 * Including easing equations by Robert Penner
 */

(function(window, document, undefined){

	// Define the oCanvas object
	var oCanvas = {
	    
		// Version number of this oCanvas release.
		version: "2.8.3",
		
		// Array containing all canvases created by oCanvas on the current page
		canvasList: [],
		
		// Object containing all the registered modules
		modules: {},
		
		// Object containing all the registered init methods
		inits: {},
		
		// Object containing all the registered plugins
		plugins: {},
		
		// Define the core class
		core: function (options) {
			this.isCore = true;
		
			// Add the canvas to the canvas list on the global object
			this.id = oCanvas.canvasList.push(this) - 1;
			
			// A number which is used to give new objects an ID
			this.lastObjectID = 0;

			// Initialize a list of all objects added directly to the canvas
			this.children = [];

			// Initialize a list of all DOM event handlers
			this.domEventHandlers = [];
			
			// Add the registered modules to the new instance of core
			for (var m in oCanvas.modules) {
				if (typeof oCanvas.modules[m] === "function") {
					this[m] = oCanvas.modules[m]();
				} else {
					this[m] = Object.create(oCanvas.modules[m]);
				}
			}
			
			// Set up default settings
			this.settings = {
				fps: 30, // Deprecated value, will soon be changed to 60
				background: "transparent",
				clearEachFrame: true,
				drawEachFrame: true,
				disableScrolling: false,
				plugins: []
			};

			// Update the settings with the user specified settings
			oCanvas.extend(this.settings, options);

			// Save these settings in case the core instance is reset
			this.originalSettings = oCanvas.extend({}, this.settings);
			
			// Set canvas to specified element
			if (this.settings.canvas.nodeName && this.settings.canvas.nodeName.toLowerCase() === "canvas") {
				this.canvasElement = this.settings.canvas;
			}
			
			// Set canvas to the element specified using a selector
			else if (typeof this.settings.canvas === "string") {
				this.canvasElement = document.querySelector(this.settings.canvas);
			}
			
			// Return false if no canvas was specified
			else {
				return false;
			}
			
			// Get the canvas context and dimensions
			this.canvas = this.canvasElement.getContext("2d");
			var width = this.canvasElement.width;
			var height = this.canvasElement.height;
			Object.defineProperty(this, "width", {
				enumerable: true,
				configurable: true,
				set: function (value) {
					width = !isNaN(parseFloat(value)) ? parseFloat(value) : width;
					this.canvasElement.width = width;
					this.background.set(this.settings.background);
					this.redraw();
				},
				get: function () {
					return width;
				}
			});
			Object.defineProperty(this, "height", {
				enumerable: true,
				configurable: true,
				set: function (value) {
					height = !isNaN(parseFloat(value)) ? parseFloat(value) : height;
					this.canvasElement.height = height;
					this.background.set(this.settings.background);
					this.redraw();
				},
				get: function () {
					return height;
				}
			});
		
			// Set the core instance in all modules to enable access of core properties inside of modules
			for (var m in oCanvas.modules) {
			
				// Add core access to modules in a wrapper module (like display objects that reside in the wrapper display)
				if (this[m].wrapper === true) {
					for (var wm in this[m]) {
						if (typeof this[m][wm] === "object" && typeof this[m][wm].setCore === "function") {
							this[m][wm] = this[m][wm].setCore(this);
						}
						else if (typeof this[m][wm].setCore === "function") {
							this[m][wm].setCore(this);
						}
						
						this[m].core = this;
					}
				}
				
				// Add core access to modules that reside directly in the core
				this[m].core = this;
			}
			
			// Initialize added modules that have registered init methods
			for (var name in oCanvas.inits) {
			
				// Modules directly on the oCanvas object
				if ((typeof oCanvas.inits[name] === "string") && (typeof this[name][oCanvas.inits[name]] === "function")) {
					this[name][oCanvas.inits[name]]();
				}
				
				// Modules that are parts of a wrapper module
				else if (oCanvas.inits[name] === "object") {
					for (var subname in oCanvas.inits[name]) {
						if (typeof this[name][oCanvas.inits[name][subname]] === "function") {
							this[name][oCanvas.inits[name][subname]]();
						}
					}
				}
			}
			
			// Run plugins if any have been specified
			var plugins = this.settings.plugins;
			if (plugins.length > 0) {
				for (var i = 0, l = plugins.length; i < l; i++) {
					if (typeof oCanvas.plugins[plugins[i]] === "function") {
						oCanvas.plugins[plugins[i]].call(this);
					}
				}
			}
		},
		
		// Method for registering a new module
		registerModule: function (name, module, init) {
			if (~name.indexOf(".")) {
				var parts = name.split(".");
				oCanvas.modules[parts[0]][parts[1]] = module;
				
				if (init !== undefined) {
					if (!oCanvas.inits[parts[0]]) {
						oCanvas.inits[parts[0]] = {};
					}
					oCanvas.inits[parts[0]][parts[1]] = init;
				}
			} else {
				oCanvas.modules[name] = module;
				if (init !== undefined) {
					oCanvas.inits[name] = init;
				}
			}
		},
		
		// Method for registering a new plugin
		// The plugin will not be run until a new core instance is being created,
		// and the instance requests the plugin, thus allowing a plugin to change
		// things in the library for just one instance
		registerPlugin: function (name, plugin) {
			oCanvas.plugins[name] = plugin;
		},
		
		// Function for creating a new instance of oCanvas
		create: function (settings) {
		
			// Create the new instance and return it
			return new oCanvas.core(settings);
		},

		// Function for checking when the DOM is ready for interaction
		domReady: function (func) {
			func = func || function () {};

			this.domReadyHandlers.push(func);

			if (this.isDomReadyListening) {
				return false;
			}

			if (this.isDomReady) {
				oCanvas.triggerDomReadyHandlers();
				return true;
			}

			var checkState = function (e) {
				if (document.readyState === "complete" || (e && e.type === "DOMContentLoaded")) {
					oCanvas.isDomReadyListening = false;
					oCanvas.isDomReady = true;
					oCanvas.triggerDomReadyHandlers();
					document.removeEventListener("readystatechange", checkState, false);
					document.removeEventListener("DOMContentLoaded", checkState, false);
				}
			};

			if (checkState()) {
				return true;
			} else if (!this.isDomReadyListening) {
				oCanvas.isDomReadyListening = true;
				document.addEventListener("readystatechange", checkState, false);
				document.addEventListener("DOMContentLoaded", checkState, false);
				return false;
			}
		},
		isDomReady: false,
		isDomReadyListening: false,
		domReadyHandlers: [],
		triggerDomReadyHandlers: function () {
			var handlers, i, l, handler;
			handlers = this.domReadyHandlers;
			for (i = 0, l = handlers.length; i < l; i++) {
				handler = handlers[i];
				if (handler) {
					delete handlers[i];
					handler();
				}
			}
		}

	};
	
	
	// Methods the core instances will have access to
	oCanvas.core.prototype = {
		
		// Method for adding an object to the canvas
		addChild: function (displayobj, redraw) {
			displayobj.add(redraw);
			
			return this;
		},
		
		// Method for removing an object from the canvas
		removeChild: function (displayobj, redraw) {
			displayobj.remove(redraw);
			
			return this;
		},
		
		// Shorthand method for clearing the canvas
		clear: function (keepBackground) {
			this.draw.clear(keepBackground);
			
			return this;
		},
		
		// Shorthand method for redrawing the canvas
		redraw: function () {
			this.draw.redraw();
			
			return this;
		},
		
		// Method for binding an event to the canvas
		bind: function (types, handler) {
			this.events.bind(this.canvasElement, types.split(" "), handler);
			
			return this;
		},
		
		// Method for unbinding an event from the object
		unbind: function (types, handler) {
			this.events.unbind(this.canvasElement, types.split(" "), handler);
			
			return this;
		},
			
		// Method for triggering all events added to the object
		trigger: function (types, eventObject) {
			var events = this.events;
			events.triggerHandlers(this.canvasElement, types.split(" "), events.fixEventObject(eventObject));

			return this;
		},

		// Method for resetting the core instance to its initial state
		reset: function () {

			// Remove all objects
			var children = this.children;
			for (var i = 0, l = children.length; i < l; i++) {
				children[i].remove();
				i--; l--;
			}
			children.length = 0;
			this.lastObjectID = 0;

			// Remove all oCanvas event handlers
			var eventTypes = this.canvasElement.events;
			for (var type in eventTypes) {
				if (eventTypes[type] instanceof Array) {
					this.unbind(type, eventTypes[type]);
				}
			}

			// Reset the settings
			this.settings = oCanvas.extend({}, this.originalSettings);
		},

		// Method for destroying the core instance, to clear up memory etc
		destroy: function () {
			this.reset();

			// Remove all DOM event handlers
			for (var i = 0, l = this.domEventHandlers.length; i < l; i++) {
				oCanvas.removeDOMEventHandler(this, i);
			}
			this.domEventHandlers.length = 0;

			// Remove the core instance from the global list of core instances
			oCanvas.canvasList[this.id] = null;
		}
	};

	// Attach the oCanvas object to the window object for access outside of this file
	window.oCanvas = oCanvas;

	oCanvas.domReady();
	




	// Extend an object with new properties and replace values for existing properties
	oCanvas.extend = function () {
	
		// Get first two args
		var args = Array.prototype.slice.call(arguments),
			last = args[args.length - 1],
			destination = args.splice(0, 1)[0],
			current = args.splice(0, 1)[0],
			x, exclude = [],
			descriptor;
		
		// If the last object is an exclude object, get the properties
		if (last.exclude && (JSON.stringify(last) === JSON.stringify({exclude:last.exclude}))) {
			exclude = last.exclude;
		}
		
		// Do the loop unless this object is an exclude object
		if (current !== last || exclude.length === 0) {
			
			// Add members from second object to the first
			for (x in current) {
			
				// Exclude specified properties
				if (~exclude.indexOf(x)) {
					continue;
				}
				
				descriptor = Object.getOwnPropertyDescriptor(current, x);
				
				if (descriptor.get || descriptor.set) {
					Object.defineProperty(destination, x, descriptor);
				} else {
					destination[x] = current[x];
				}
			}
		}
		
		// If there are more objects passed in, run once more, otherwise return the first object
		if (args.length > 0) {
			return oCanvas.extend.apply(this, [destination].concat(args));
		} else {
			return destination;
		}
	};

	oCanvas.addDOMEventHandler = function (core, domObject, eventName, handler, useCapture) {
		core.domEventHandlers.push({
			obj: domObject,
			event: eventName,
			handler: handler,
			useCapture: !!useCapture
		});
		domObject.addEventListener(eventName, handler, useCapture);
	};

	oCanvas.removeDOMEventHandler = function (core, index) {
		var data = core.domEventHandlers[index];
		data.obj.removeEventListener(data.event, data.handler, data.useCapture);
	};

	oCanvas.isNumber = function (n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	};

	// Define Object.create if not available
	if (typeof Object.create !== "function") {
		Object.create = function (o) {
			function F() {}
			F.prototype = o;
			return new F();
		};
	}

	// Define Object.getPropertyDescriptor if not available.
	// This function will check for the descriptor in the whole prototype chain.
	if (typeof Object.getPropertyDescriptor !== "function") {
		Object.getPropertyDescriptor = function(object, property) {
			var descriptor = Object.getOwnPropertyDescriptor(object, property);
			var proto = Object.getPrototypeOf(object);
			while (descriptor === undefined && proto !== null) {
				descriptor = Object.getOwnPropertyDescriptor(proto, property);
				proto = Object.getPrototypeOf(proto);
			}
			return descriptor;
		};
	}

	// requestAnimationFrame polyfill by Erik Möller
	// fixes from Paul Irish and Tino Zijdel
	// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
	(function () {
		var lastTime = 0;
		var vendors = ['ms', 'moz', 'webkit', 'o'];
		for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
			window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
			window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
			  || window[vendors[x] + 'CancelRequestAnimationFrame'];
		}

		if (!window.requestAnimationFrame) {
			window.requestAnimationFrame = function (callback, element) {
				var currTime = new Date().getTime();
				var timeToCall = Math.max(0, 16 - (currTime - lastTime));
				var id = window.setTimeout(function () { callback(currTime + timeToCall); }, timeToCall);
				lastTime = currTime + timeToCall;
				return id;
			};
		}

		if (!window.cancelAnimationFrame) {
			window.cancelAnimationFrame = function (id) {
				clearTimeout(id);
			};
		}
	}());

	// usage: log('inside coolFunc',this,arguments);
	// http://paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
	window.log = function () {
		log.history = log.history || [];	// store logs to an array for reference
		log.history.push(arguments);
		if (this.console) {
			var i, args = Array.prototype.slice.call(arguments), l = args.length;
			for (i = 0; i < l; i++) {
				console.log(args[i]);
			}
		}
	};





	// Define the timeline class
	var timeline = function () {
	
		// Return an object when instantiated
		var module = {
			
			init: function () {
				var _this = this;
				
				// Method for setting the function to be called for each frame
				this.core.setLoop = function (callback) {
					_this.userLoop = callback;
					
					// Return the timeline object to enable methods like start() to be called directly
					return _this;
				};
			},
			
			// Set default values when initialized
			currentFrame: 1,
			timeline: 0,
			running: false,
			
			set fps (value) {
				this.core.settings.fps = value;
				
				// Restart the timer if the timeline is running
				if (this.running) {
					this.start();
				}
			},
			get fps () {
				return this.core.settings.fps;
			},
			
			// Method that will be called for each frame
			loop: function () {
				if (!this.running) {
					return;
				}

				// Set up a timer to respect the chosen fps,
				// but use RAF to decide when the next call should be made.
				setTimeout(function () {
					module.timeline = requestAnimationFrame(module.loopBound);

					var core = module.core;
				
					// If mainLoop has been defined
					if (typeof module.userLoop === "function") {

						// Clear the canvas if specified
						if (core.settings.clearEachFrame === true) {
							core.draw.clear();
						}

						// Trigger the user defined function mainLoop and set this to the current core instance
						module.userLoop.call(core, core.canvas);

						// Redraw the canvas if specified
						if (core.settings.drawEachFrame === true) {
							core.draw.redraw();
						}

						// Increment the frame count
						module.currentFrame++;
					}

				}, 1000 / module.fps);
			},

			// A wrapper function for the loop to bind this keyword
			loopBound: function () {
				module.loop();
			},
		
			// Method that starts the timeline
			start: function () {
				cancelAnimationFrame(module.timeline);
				module.running = true;
				module.loop();
				
				return this;
			},
			
			// Method that stops the timeline
			stop: function () {
				this.running = false;
				cancelAnimationFrame(module.timeline);
				
				return this;
			}
		};

		return module;
	};
	
	// Register the timeline module
	oCanvas.registerModule("timeline", timeline, "init");
	



	// Define the class
	var keyboard = function () {
		
		// Return an object when instantiated
		return {
			
			keysDown: {},
			keyPressTimers: {},
			modifiedKeys: [],
			
			// Method for initializing the keyboard object
			init: function () {
				var self = this;

				oCanvas.addDOMEventHandler(this.core, document, "keydown", function (e) { self.docHandler(e); }, false);
				oCanvas.addDOMEventHandler(this.core, document, "keyup", function (e) { self.docHandler(e); }, false);
				oCanvas.addDOMEventHandler(this.core, document, "keypress", function (e) { self.preventDefault(e); }, false);
			},

			docHandler: function (e) {
				var keyCode, events, canvasElement, eventObject;
				events = this.core.events;
				canvasElement = this.core.canvasElement;

				// Abort if events are disabled
				if (!events.enabled) {
					return;
				}

				// Only trigger events if the pointer has set focus to the canvas
				//  or if there are no pointers registered
				if (this.core.pointer && this.core.pointer.canvasFocused !== true) {
					return;
				}

				keyCode = this.getKeyCode(e);

				// Prevent default for keys that have been added to the prevent list
				this.preventDefault(e);
			
				// Cancel event if the key is already pressed down
				// (some browsers repeat even keydown when held down)
				if (e.type === "keydown" && this.keysDown[keyCode] === true) {
					return;
				}

				// Set the key states when pressed down
				if (e.type === "keydown") {
					this.keysDown[keyCode] = true;
				} else if (e.type === "keyup") {
					delete this.keysDown[keyCode];
				}

				// Get a fixed event object
				eventObject = events.fixEventObject(e, "keyboard");
				events.lastKeyboardEventObject = eventObject;

				// Trigger events
				events.triggerHandlers(canvasElement, [e.type]);

				// Set the timer to trigger keypress events continuously until released
				if (e.type === "keydown") {
					this.keyPressTimers[keyCode] = setInterval(function () {
						events.triggerHandlers(canvasElement, ["keypress"], eventObject);
					}, 1000 / this.core.settings.fps);
				}

				// If there are no more keys pressed down, cancel the keypress timers
				if (e.type === "keyup") {
					if (!this.anyKeysDown()) {
						for (keyCode in this.keyPressTimers) {
							clearInterval(this.keyPressTimers[keyCode]);
						}
					} else {
						clearInterval(this.keyPressTimers[keyCode]);
					}
				}
			},
			
			// Method for preventing the default behavior of the assigned keys
			preventDefault: function (e) {
				if ((this.core.mouse && this.core.mouse.canvasFocused === true) || !this.core.mouse) {
					var keyCode = this.getKeyCode(e);

					if (~this.modifiedKeys.indexOf(keyCode)) {
						e.preventDefault();
					}
				}
			},
			
			// Method for adding keys that will have the default actions prevented
			addPreventDefaultFor: function (keys) {
				
				// Fix the keys array
				keys = (typeof keys === "number") ? [keys] : ((keys instanceof Array) ? keys : []);
				
				// Add the keys
				for (var i = 0; i < keys.length; i++) {
					this.modifiedKeys.push(keys[i]);
				}
			},
			
			// Method for removing keys that will no longer have the default actions prevented
			removePreventDefaultFor: function (keys) {
				
				// Fix the keys array
				keys = (typeof keys === "number") ? [keys] : ((keys instanceof Array) ? keys : []);
				
				// Remove the keys
				var i, index;
				for (i = 0; i < keys.length; i++) {
					index = this.modifiedKeys.indexOf(keys[i]);
					if (~index) {
						this.modifiedKeys.splice(index, 1);
					}
				}
			},
			
			// Method for getting the key code from current event
			getKeyCode: function (e) {
				return e.keyCode === 0 ? e.which : e.keyCode;
			},

			// Method for getting how many keys are currently pressed down
			numKeysDown: function () {
				var numKeys, keysDown, keyCode;
				numKeys = 0;
				keysDown = this.keysDown;

				// Go through all the keys that are currently pressed down
				for (keyCode in keysDown) {
					if (keysDown[keyCode] === true) {
						numKeys++;
					}
				}

				return numKeys;
			},

			// Method for checking if any keys are pressed down
			anyKeysDown: function () {
				return this.numKeysDown() > 0;
			},

			// Method for getting which keys are currently pressed down
			getKeysDown: function () {
				var keysDown, currentlyDown, keyCode;
				keysDown = this.keysDown;
				currentlyDown = [];

				// Go through all the keys that are currently pressed down
				for (keyCode in keysDown) {
					if (keysDown[keyCode] === true) {
						currentlyDown.push(parseInt(keyCode, 10));
					}
				}

				return currentlyDown;
			},
			
			ARROW_UP:38, ARROW_DOWN:40, ARROW_LEFT:37, ARROW_RIGHT:39, SPACE:32, ENTER:13, ESC:27
		};
	};
	
	// Register the module
	oCanvas.registerModule("keyboard", keyboard, "init");




	// Define the class
	var mouse = function () {
		
		// Return an object when instantiated
		return {

			x: 0,
			y: 0,
			buttonState: "up",
			canvasFocused: false,
			canvasHovered: false,
			cursorValue: "default",

			init: function () {

				this.core.events.addEventTypes("mouse", {
					move: "mousemove",
					enter: "mouseenter",
					leave: "mouseleave",
					down: "mousedown",
					up: "mouseup",
					singleClick: "click",
					doubleClick: "dblclick"
				});

				this.types = {
					"mousemove": "move",
					"mousedown": "down",
					"mouseup": "up",
					"dblclick": "doubleClick"
				};

				this.core.pointer = this;

				// Only bind events for mouse if touch is not available
				//  This is to enable developers to bind to both touch and mouse,
				//  but still only trigger handlers once (for the right input device)
				if (!this.core.touch || !this.core.touch.isTouch) {
					this.bindHandlers();
				}
			},

			bindHandlers: function () {
				var self, core, canvasElement, type;
				
				self = this;
				core = this.core;
				canvasElement = core.canvasElement;

				for (type in this.types) {

					// Add event listeners to the canvas element
					oCanvas.addDOMEventHandler(core, canvasElement, type, function (e) {
						self.canvasHandler(e);
					}, false);

					// Add event listeners to the document (used for setting states and trigger mouseup events)
					if (type === "mousemove") {
						type = "mouseover";
					}
					oCanvas.addDOMEventHandler(core, document, type, function (e) {
						self.docHandler(e);
					}, false);

					var a = document.createElement('a');
					a.href = document.referrer;
					if (a.host === window.location.host && window.parent !== window) {
						oCanvas.addDOMEventHandler(core, window.parent.document, type, function (e) {
							self.docHandler(e);
						}, false);
					}
				}
			},

			canvasHandler: function (e, fromDoc) {
				var events, onCanvas, type, frontObject;

				events = this.core.events;
				onCanvas = this.onCanvas(e);

				// Trigger only mouseup events if pointer is outside the canvas
				if (e.type === "mouseup" && !onCanvas && !this.canvasUpEventTriggered) {
					events.triggerPointerEvent(this.types["mouseup"], events.frontObject, "mouse", e);
					events.triggerPointerEvent(this.types["mouseup"], this.core.canvasElement, "mouse", e);
					this.canvasUpEventTriggered = true;
					return;
				}

				// Abort the handler if the pointer started inside the canvas and is now outside
				if (!fromDoc && !onCanvas) {
					return;
				}

				type = (fromDoc && e.type === "mouseover") ? "mousemove" : e.type;

				if (!fromDoc) {
					this.canvasHovered = true;
				}

				if (type === "mousedown") {
					this.canvasUpEventTriggered = false;
					this.canvasFocused = true;
					this.buttonState = "down";
				}
				if (type === "mouseup") {
					this.buttonState = "up";
				}

				// Get the front object for pointer position, among all added objects
				frontObject = (fromDoc || !onCanvas) ? undefined : events.getFrontObject("mouse");

				// Trigger events
				if (fromDoc && events.frontObject) {
					events.triggerChain(events.getParentChain(events.frontObject, true, true), ["mouseleave"]);
					events.frontObject = null;
				} else if (fromDoc) {
					events.triggerHandlers(this.core.canvasElement, ["mouseleave"]);
				} else {
					events.triggerPointerEvent(this.types[type], frontObject, "mouse", e);
				}
			},

			docHandler: function (e) {
				var onCanvas = this.onCanvas(e);

				if (!onCanvas) {

					if (this.core.canvasElement.events.hasEntered) {
						if (e.type === "mouseover") {
							this.canvasHandler(e, true);
						}

					} else {
						if (e.type === "mouseup") {
							if (this.buttonState === "down") {
								this.canvasHandler(e, true);
							}
						}
						if (e.type === "mousedown") {
							this.canvasFocused = false;
						}
					}

				}
			},
			
			getPos: function (e) {
				var canvas = this.core.canvasElement;
				var boundingRect = canvas.getBoundingClientRect();
				var scaleX = canvas.width / canvas.clientWidth;
				var scaleY = canvas.height / canvas.clientHeight;

				// Calculate the mouse position relative to the viewport.
				// e.clientX exists, but has been incorrect in older versions of webkit.
				var clientX = e.pageX - window.pageXOffset;
				var clientY = e.pageY - window.pageYOffset;

				var x = scaleX * (clientX - Math.round(boundingRect.left));
				var y = scaleY * (clientY - Math.round(boundingRect.top));

				return { x: x, y: y };
			},

			updatePos: function (e) {
				var pos = this.getPos(e);
				this.x = pos.x;
				this.y = pos.y;
			},
			
			onCanvas: function (e) {
				e = e || (this.core.events.lastPointerEventObject && this.core.events.lastPointerEventObject.originalEvent);
				
				// Get pointer position
				var pos = e ? this.getPos(e) : { x: this.x, y: this.y };
				
				// Check boundaries => (left) && (right) && (top) && (bottom)
				if ( (pos.x >= 0) && (pos.x <= this.core.width) && (pos.y >= 0) && (pos.y <= this.core.height) ) {
					this.canvasHovered = true;
					if (e) this.updatePos(e);
					return true;
				} else {
					this.canvasHovered = false;
					return false;
				}
			},

			cancel: function () {
				this.core.events.lastDownObject = null;
			},

			hide: function () {
				this.core.canvasElement.style.cursor = "none";
			},

			show: function () {
				this.core.canvasElement.style.cursor = this.cursorValue;
			},

			cursor: function (value) {
				if (~value.indexOf("url(")) {
					var m = /url\((.*?)\)(\s(.*?)\s(.*?)|)($|,.*?$)/.exec(value),
						options = m[5] ? m[5] : "";
					value = "url(" + m[1] + ") " + (m[3] ? m[3] : 0) + " " + (m[4] ? m[4] : 0) + (options !== "" ? options :  ", default");
				}
				this.core.canvasElement.style.cursor = value;
				this.cursorValue = value;
			}

		};
	};

	// Register the module
	oCanvas.registerModule("mouse", mouse, "init");





	// Define the class
	var touch = function () {
		
		// Return an object when instantiated
		return {

			x: 0,
			y: 0,
			touchState: "up",
			canvasFocused: false,
			canvasHovered: false,
			isTouch: ("ontouchstart" in window || "createTouch" in document),
			dblTapInterval: 500,

			init: function () {
				var core, canvasElement;

				core = this.core;
				canvasElement = core.canvasElement;

				core.events.addEventTypes("touch", {
					move: "touchmove",
					enter: "touchenter",
					leave: "touchleave",
					down: "touchstart",
					up: "touchend",
					singleClick: "tap",
					doubleClick: "dbltap"
				});

				this.types = {
					"touchmove": "move",
					"touchstart": "down",
					"touchend": "up"
				};

				if (this.isTouch) {
					core.pointer = this;
					
					// Set iOS specific settings to prevent selection of the canvas element
					canvasElement.style.WebkitUserSelect = "none";
					canvasElement.style.WebkitTouchCallout = "none";
					canvasElement.style.WebkitTapHighlightColor = "rgba(0,0,0,0)";
				}

				this.bindHandlers();
			},

			bindHandlers: function () {
				var self, core, canvasElement, type;
				
				self = this;
				core = this.core;
				canvasElement = core.canvasElement;

				for (type in this.types) {

					// Add event listeners to the canvas element
					oCanvas.addDOMEventHandler(core, canvasElement, type, function (e) {
						self.canvasHandler(e);
					}, false);

					// Add event listeners to the document (used for setting states and trigger mouseup events)
					oCanvas.addDOMEventHandler(core, document, type, function (e) {
						self.docHandler(e);
					}, false);

					var a = document.createElement('a');
					a.href = document.referrer;
					if (a.host === window.location.host && window.parent !== window) {
						oCanvas.addDOMEventHandler(core, window.parent.document, type, function (e) {
							self.docHandler(e);
						}, false);
					}
				}

				// Add event listener to prevent scrolling on touch devices
				if (this.core.settings.disableScrolling) {
					oCanvas.addDOMEventHandler(core, canvasElement, "touchmove", function (e) {
						e.preventDefault();
					}, false);
				}
			},

			canvasHandler: function (e, fromDoc) {
				var events, onCanvas, frontObject, now, sameObj, interval;

				events = this.core.events;
				onCanvas = this.onCanvas(e);

				// Trigger only touchend events if pointer is outside the canvas
				if (e.type === "touchend" && !onCanvas && !this.canvasUpEventTriggered) {
					events.triggerPointerEvent(this.types["touchend"], events.frontObject, "touch", e);
					events.triggerPointerEvent(this.types["touchend"], this.core.canvasElement, "touch", e);
					this.canvasUpEventTriggered = true;
					return;
				}

				// Abort the handler if the pointer started inside the canvas and is now outside
				if (!fromDoc && !onCanvas) {
					return;
				}

				if (!fromDoc) {
					this.canvasHovered = true;
				}

				if (e.type === "touchstart") {
					this.canvasUpEventTriggered = false;
					this.canvasFocused = true;
					this.touchState = "down";
				}
				if (e.type === "touchend") {
					this.touchState = "up";
				}

				// Get the front object for pointer position, among all added objects
				frontObject = (fromDoc || !onCanvas) ? undefined : events.getFrontObject("touch");

				// Trigger events
				if (fromDoc && events.frontObject) {
					events.triggerChain(events.getParentChain(events.frontObject, true, true), ["touchleave"]);
					events.frontObject = null;
				} else if (fromDoc) {
					events.triggerHandlers(this.core.canvasElement, ["touchleave"]);
				} else {
					events.triggerPointerEvent(this.types[e.type], frontObject, "touch", e);
				}

				// Log timestamps for events, to enable double taps
				if (e.type === "touchstart") {
					now = (new Date()).getTime();

					if (!this.dblTapStart || now - this.dblTapStart.timestamp > this.dblTapInterval) {
						this.dblTapStart = {
							timestamp: now,
							obj: frontObject,
							count: 1
						};
					} else {
						this.dblTapStart.count++;
					}
				}
				if (e.type === "touchend" && this.dblTapStart.count === 2) {
					now = (new Date()).getTime();
					sameObj = frontObject === this.dblTapStart.obj;
					interval = now - this.dblTapStart.timestamp;

					// If the second touchend event is on the same object as the first touchstart,
					//  and the time interval between the events is small enough,
					//  then trigger a double tap event
					if (sameObj && interval < this.dblTapInterval) {
						events.triggerPointerEvent("doubleClick", frontObject, "touch", e);
					}

					delete this.dblTapStart;
				}
			},

			docHandler: function (e) {
				var onCanvas = this.onCanvas(e);

				if (!onCanvas) {

					if (this.core.canvasElement.events.hasEntered) {
						if (e.type === "touchmove") {
							this.canvasHandler(e, true);
						}

					} else {
						if (e.type === "touchend") {
							if (this.touchState === "down") {
								this.canvasHandler(e, true);
							}
						}
						if (e.type === "touchstart") {
							this.canvasFocused = false;
						}
					}

				}
			},
			
			getPos: function (e) {
				var x, y;

				var touches = e.changedTouches;
				
				if (touches !== undefined && touches.length > 0) {
					e = touches[0];
					var canvas = this.core.canvasElement;
					var boundingRect = canvas.getBoundingClientRect();
					var scaleX = canvas.width / canvas.clientWidth;
					var scaleY = canvas.height / canvas.clientHeight;

					// Calculate the touch position relative to the viewport.
					// e.clientX exists, but has been incorrect in older versions of webkit.
					var clientX = e.pageX - window.pageXOffset;
					var clientY = e.pageY - window.pageYOffset;

					x = scaleX * (clientX - Math.round(boundingRect.left));
					y = scaleY * (clientY - Math.round(boundingRect.top));

				} else {
					x = this.x;
					y = this.y;
				}
				
				return { x: x, y: y };
			},

			updatePos: function (e) {
				var pos = this.getPos(e);
				this.x = pos.x;
				this.y = pos.y;
			},
			
			onCanvas: function (e) {
				e = e || (this.core.events.lastPointerEventObject && this.core.events.lastPointerEventObject.originalEvent);
				
				// Get pointer position
				var pos = e ? this.getPos(e) : { x: this.x, y: this.y };
				
				// Check boundaries => (left) && (right) && (top) && (bottom)
				if ( (pos.x >= 0) && (pos.x <= this.core.width) && (pos.y >= 0) && (pos.y <= this.core.height) ) {
					this.canvasHovered = true;
					if (e) this.updatePos(e);
					return true;
				} else {
					this.canvasHovered = false;
					return false;
				}
			},

			cancel: function () {
				this.core.events.lastDownObject = null;
			}

		};
	};

	// Register the module
	oCanvas.registerModule("touch", touch, "init");





	// Define the class
	var tools = function () {
		
		// Return an object when instantiated
		return {
			
			// Method for transforming the pointer position to the current object's transformation
			transformPointerPosition: function (obj, cX, cY, extraAngle, pointer) {
				extraAngle = extraAngle || 0;
				pointer = pointer || this.core.pointer;
				
				// All calls that come from isPointerInside() will pass the display object as its first argument
				// This method will then do multiple transforms for each object in the parent chain to get the correct result
				if (typeof obj === "object") {
					var parent = obj.parent,
						objectChain = [],
						pos = { x: 0, y: 0 },
						last, object, n, l, origin;
					
					// Get all objects in the parent chain, including this one
					objectChain.push(obj);
					while (parent && parent !== this.core) {
						objectChain.push(parent);
						parent = parent.parent;
					}
					
					// Reverse the array so the top level parent comes first, and ends with the current object
					objectChain.reverse();
					
					// Loop through all objects in the parent chain
					last = pointer;
					for (n = 0, l = objectChain.length; n < l; n++) {
						object = objectChain[n];
						
						// If the object has a rotation, get the transformed mouse position for that rotation
						pos = this.transformPointerPosition(object.rotation, object.abs_x, object.abs_y, 0, last);
						
						// Save the current position so that the next iteration can use that as the pointer
						last = pos;
					}
					
					// Rotate an extra angle if specified
					if (extraAngle !== 0) {
						origin = obj.getOrigin();
						pos = this.transformPointerPosition(extraAngle * -1, cX - origin.x, cY - origin.y, 0, last);
					}
					
					// Return the correct position after all transforms
					return {
						x: pos.x,
						y: pos.y
					};
				}
				
				// If the first argument is not an object, it is the rotation passed in above
				else {
					var rotation = obj;
				}
				
				var topright = (pointer.x >= cX && pointer.y <= cY),
					bottomright = (pointer.x >= cX && pointer.y >= cY),
					bottomleft = (pointer.x <= cX && pointer.y >= cY),
					topleft = (pointer.x <= cX && pointer.y <= cY),
					D = Math.sqrt(Math.pow(pointer.x - cX, 2) + Math.pow(pointer.y - cY, 2)),
					rotation = ((rotation / 360) - Math.floor(rotation / 360)) * 360 - extraAngle,
					c, x, y,
					b = (D === 0) ? 0 : Math.abs(pointer.y - cY) / D;
				
				// When pointer is in top right or bottom left corner
				if ( topright || bottomleft ) {
					c = (180 - rotation - Math.asin(b) * 180 / Math.PI) * Math.PI / 180;
					
					x = cX + Math.cos(c) * D * (topright ? -1 : 1);
					y = cY + Math.sin(c) * D * (topright ? -1 : 1);
				}
				
				// When pointer is in top left or bottom right corner
				else if (topleft || bottomright) {
					c = (Math.asin(b) * 180 / Math.PI - rotation) * Math.PI / 180;
					
					x = cX + Math.cos(c) * D * (topleft ? -1 : 1);
					y = cY + Math.sin(c) * D * (topleft ? -1 : 1);
				}
				
				return {
					x: x,
					y: y
				};
			},
			
			// Method for checking if the pointer's current position is inside the specified object
			isPointerInside: function (obj, pointerObject) {
			
				var origin = obj.getOrigin();
			
				// Line
				if (obj.type === "line") {
				
					// Get angle difference relative to if it had been horizontal
					var dX = Math.abs(obj._.end_x - obj.abs_x),
						dY = Math.abs(obj._.end_y - obj.abs_y),
						D = Math.sqrt(dX * dX + dY * dY),
						s = obj.start,
						e = obj.end,
						factor = (s.x < e.x && s.y < e.y) || (s.x > e.x && s.y > e.y) ? -1 : 1,
						angle = Math.asin(dY / D) * (180 / Math.PI) * factor,
						
						// Transform the pointer position with the angle correction
						pointer = this.transformPointerPosition(obj, obj.abs_x, obj.abs_y, angle, pointerObject);
					
					// Check if pointer is inside the line
					// Pointer coordinates are transformed to be compared with a horizontal line
					return ((pointer.x > obj.abs_x - D - origin.x) && (pointer.x < obj.abs_x + D - origin.x) && (pointer.y > obj.abs_y - obj.strokeWidth / 2 - origin.y) && (pointer.y < obj.abs_y + obj.strokeWidth / 2 - origin.y));
				} else
				
				// Text
				if (obj.type === "text") {
					var pointer = this.transformPointerPosition(obj, obj.abs_x, obj.abs_y, 0, pointerObject),
						stroke = obj.strokeWidth / 2,
						lines = obj._.lines,
						numLines = lines.length,
						lineHeight = obj.size * obj.lineHeight,
						align = obj.align,
						rtl = this.core.canvasElement.dir === "rtl",
						baselines, i, aligns, left, right, top, bottom, isInside;

					baselines = {
						"top":         obj.size *  0.05,
						"hanging":     obj.size * -0.12,
						"middle":      obj.size * -0.47,
						"alphabetic":  obj.size * -0.78,
						"ideographic": obj.size * -0.83,
						"bottom":      obj.size * -1.00
					};

					for (i = 0; i < numLines; i++) {

						// Calculate the different positions for different aligns
						aligns = {
							"start":  rtl ? (obj.width - lines[i].width) : 0,
							"left":   0,
							"center": (obj.width - lines[i].width) / 2,
							"end":    rtl ? 0 : (obj.width - lines[i].width),
							"right":  (obj.width - lines[i].width)
						};

						// Find the left and right edges
						left = obj.abs_x + aligns[align];
						right = left + lines[i].width;

						// Find the top and bottom positions based on the text baseline
						top = obj.abs_y + (lineHeight * i) + baselines[obj.baseline];
						bottom = top + lineHeight + (numLines > 0 && i < numLines - 1 ? 1 : 0);

						isInside = ((pointer.x > left - origin.x - stroke) && (pointer.x < right - origin.x + stroke) && (pointer.y > top - origin.y - stroke) && (pointer.y < bottom - origin.y + stroke));

						if (isInside) {
							return true;
						}
					}
					
					return false;
				} else
				
				// Rectangle
				if (obj.shapeType === "rectangular") {
					var pointer = this.transformPointerPosition(obj, obj.abs_x, obj.abs_y, 0, pointerObject),
						stroke = (obj.strokePosition === "outside") ? obj.strokeWidth : ((obj.strokePosition === "center") ? obj.strokeWidth / 2 : 0);
					
					return ((pointer.x > obj.abs_x - origin.x - stroke) && (pointer.x < obj.abs_x + obj.width - origin.x + stroke) && (pointer.y > obj.abs_y - origin.y - stroke) && (pointer.y < obj.abs_y + obj.height - origin.y + stroke));
				} else
				
				// Circle
				if (obj.type === "ellipse" && obj.radius_x === obj.radius_y) {
					var pointer = this.transformPointerPosition(obj, obj.abs_x, obj.abs_y, 0, pointerObject),
						D = Math.sqrt(Math.pow(pointer.x - obj.abs_x + origin.x, 2) + Math.pow(pointer.y - obj.abs_y + origin.y, 2));
					return (D < obj.radius_x + obj.strokeWidth / 2);
				} else
				
				// Ellipse
				if (obj.type === "ellipse") {
					var pointer = this.transformPointerPosition(obj, obj.abs_x, obj.abs_y, 0, pointerObject),
						a = obj.radius_x + obj.strokeWidth / 2,
						b = obj.radius_y + obj.strokeWidth / 2;
					pointer.x -= obj.abs_x + origin.x;
					pointer.y -= obj.abs_y + origin.y;
					
					return ((pointer.x * pointer.x) / (a * a) + (pointer.y * pointer.y) / (b * b) < 1);
				} else
				
				// Polygon
				if (obj.type === "polygon") {
					var pointer = this.transformPointerPosition(obj, obj.abs_x, obj.abs_y, 0, pointerObject),
						radius = obj.radius + obj.strokeWidth / 2,
						length = obj.sides,
						j = length - 1,
						odd = false,
						i, thisPoint, prevPoint;
						
					for (i = 0; i < length; i++) {
					
						// Calulate positions for the points
						thisPoint = {
							x: (obj.abs_x - origin.x + (radius * Math.cos(i * 2 * Math.PI / length))),
							y: (obj.abs_y - origin.y + (radius * Math.sin(i * 2 * Math.PI / length)))
						};
						prevPoint = {
							x: (obj.abs_x - origin.x + (radius * Math.cos(j * 2 * Math.PI / length))),
							y: (obj.abs_y - origin.y + (radius * Math.sin(j * 2 * Math.PI / length)))
						};
						
						// Check how many edges we cross using odd parity
						if ( ((thisPoint.y < pointer.y) && (prevPoint.y >= pointer.y)) || ((prevPoint.y < pointer.y) && (thisPoint.y >= pointer.y)) ) {
							if (thisPoint.x + (pointer.y - thisPoint.y) / (prevPoint.y - thisPoint.y) * (prevPoint.x - thisPoint.x) < pointer.x) {
								odd = !odd;
							}
						}
						j = i;
					}
					
					return odd;
				} else
				
				// Arc
				// Filled arcs, stroked arcs, stroked arcs that look like pie chart pieces
				if (obj.type === "arc") {
					var angleDiff = obj.end - obj.start,
						angleRange = (obj.direction === "clockwise") ? (angleDiff < 0 ? 360 : 0) + (angleDiff % 360 ? angleDiff % 360 : (angleDiff > 0 ? 360 : 0)) : Math.abs(angleDiff),
						extraAngle = (obj.direction === "clockwise" ? obj.start * -1 : obj.end * -1),
						pointer = this.transformPointerPosition(obj, obj.abs_x, obj.abs_y, extraAngle, pointerObject),
						D = Math.sqrt(Math.pow(pointer.x - obj.abs_x + origin.x, 2) + Math.pow(pointer.y - obj.abs_y + origin.y, 2)),
						radius = obj.radius,
						eP = {},
						p1 = {},
						a, y_, z, angle;
					
					// Cancel if the distance between pointer and origin is longer than the radius
					if ((obj.strokeWidth === 0 && D > radius) || (obj.strokeWidth > 0 && D > radius + obj.strokeWidth / 2)) {
						return false;
					}
					
					// If the arc is made like a pie chart piece
					// (desired radius is set as stroke width and actual radius is set to half that size)
					if (radius === obj.strokeWidth / 2 || obj.pieSection) {
						var strokeWidth = obj.pieSection ? obj.radius : strokeWidth;
					
						if (angleRange > 180) {
						
							var pX, pY, pD, pA;
							
							// Calculate the distance between the pointer and origin, to find the angle
							pX = Math.abs(obj.abs_x - origin.x - pointer.x),
							pY = Math.abs(obj.abs_y - origin.y - pointer.y),
							pD = Math.sqrt(pX * pX + pY * pY),
							pA = Math.acos(pX / pD) * 180 / Math.PI;
							
							if (pointer.y >= obj.abs_y - origin.y && D <= strokeWidth) {
								return true;
							} else if (pointer.y < obj.abs_y - origin.y && pointer.x < obj.abs_x - origin.x && pA <= (angleRange - 180)) {
								return true;
							} else {
								return false;
							}
						
						} else if (angleRange === 180) {
							
							// Inside if pointer is below the origin
							if (pointer.y >= obj.abs_y - origin.y && D <= strokeWidth) {
								return true;
							} else {
								return false;
							}
							
						} else if (angleRange < 180) {
							
							// Rotate the pointer position so that the angle is aligned in the bottom like a U
							extraAngle = (90 - angleRange / 2 - (obj.direction === "clockwise" ? obj.start : obj.end));
							pointer = this.transformPointerPosition(obj, obj.abs_x, obj.abs_y, extraAngle, pointerObject);
							
							var d, pX, pY, pD, pA;
							
							// Fix the radius for this type of arc
							radius *= 2;
							
							// Calculate the distance from the origin to the y value of the end points
							d = Math.cos(angleRange / 2 * Math.PI / 180) * radius;
							
							// Calculate the distance between the pointer and origin, to find the angle
							pX = Math.abs(obj.abs_x - origin.x - pointer.x)
							pY = Math.abs(obj.abs_y - origin.y - pointer.y);
							pD = Math.sqrt(pX * pX + pY * pY);
							pA = Math.asin(pX / pD) * 180 / Math.PI;
							
							if (pointer.y >= obj.abs_y - origin.y + d) {
								return true;
							} else if (pointer.y >= obj.abs_y - origin.y && pA <= angleRange / 2) {
								return true;
							} else {
								return false;
							}
						}
					}
					
					// If it's a normal arc
					else {
						
						if (angleRange > 180) {
							a = (360 - angleRange) / 2;
							y_ = Math.cos(a * Math.PI / 180) * radius;
							
							eP.x = obj.abs_x - origin.x + Math.cos(a * Math.PI / 180) * y_;
							eP.y = obj.abs_y - origin.y - Math.sin(a * Math.PI / 180) * y_;
							
							
							z = 180 - 2 * a;
							
							p1.x = obj.abs_x - origin.x - Math.cos(z * Math.PI / 180) * radius;
							p1.y = obj.abs_y - origin.y - Math.sin(z * Math.PI / 180) * radius;
							
							var aRight = 90 - (90 - z) - (90 - a);
							
							if (pointer.y < eP.y && pointer.x < eP.x) {
								angle = a - Math.acos(Math.abs(pointer.y - eP.y) / Math.sqrt(Math.pow(pointer.x - eP.x, 2) + Math.pow(pointer.y - eP.y, 2))) * 180 / Math.PI;
							} else 
							if (pointer.y > eP.y && pointer.x >= eP.x) {
								angle = aRight - Math.acos(Math.abs(pointer.x - eP.x) / Math.sqrt(Math.pow(pointer.x - eP.x, 2) + Math.pow(pointer.y - eP.y, 2))) * 180 / Math.PI;
							} else
							if (pointer.y < obj.abs_y - origin.y && pointer.x >= eP.x) {
								return false;
							} else {
								angle = -1000000;
							}

							if ((obj.fill === "" || obj.fill === "transparent") && (obj.strokeWidth > 0) && (D < radius - obj.strokeWidth / 2)) {
								return false;
							}
							
							if (angle <= 0 && pointer.x >= p1.x && pointer.y > eP.y && pointer.y < obj.abs_y - origin.y) {
								return true;
							} else if (angle <= 0 && pointer.y <= obj.abs_y - origin.y && D <= radius) {
								return true;
							} else if (((obj.strokeWidth === 0 && D <= radius) || (obj.strokeWidth > 0 && D <= radius + obj.strokeWidth / 2)) && ((pointer.x <= p1.x && pointer.y <= obj.abs_y - origin.y) || (pointer.y >= obj.abs_y - origin.y)) ) {
								return true;
							} else {
								return false;
							}
						} else if (angleRange === 180) {
						
							// Inside if pointer is below the origin
							if (pointer.y >= obj.abs_y - origin.y && ((obj.strokeWidth === 0 && D <= radius) || (obj.strokeWidth > 0 && D <= radius + obj.strokeWidth / 2))) {
								return true;
							} else {
								return false;
							}
						} else if (angleRange < 180) {
						
							// Rotate the pointer position so that the angle is aligned in the bottom like a U
							extraAngle = (90 - angleRange / 2 - (obj.direction === "clockwise" ? obj.start : obj.end));
							pointer = this.transformPointerPosition(obj, obj.abs_x, obj.abs_y, extraAngle, pointerObject);
							
							var r, d;
							
							// Make it a bit more accurate when there is only a stroke
							r = (obj.fill === "") ? radius - obj.strokeWidth / 2 : radius;
							
							// Calculate the distance from the origin to the y value of the end points
							d = Math.cos(angleRange / 2 * Math.PI / 180) * r;
							
							// If there is only a stroke
							if (obj.fill === "" && obj.strokeWidth > 0) {
							
								// It has to be lower than the end points, and between the edges of the stroke
								if (pointer.y >= obj.abs_y - origin.y + d && D >= radius - obj.strokeWidth / 2 && D <= radius + obj.strokeWidth / 2) {
									return true;
								} else {
									return false;
								}
							}
							
							// If there is a fill and the y position of the pointer is below the end points
							else if (pointer.y >= obj.abs_y - origin.y + d) {
							
								// If there is also a stroke
								if (obj.strokeWidth > 0) {
									
									// If the distance from origin to pointer is less than to the outer edge of the stroke
									if (D <= radius + obj.strokeWidth / 2) {
										return true;
									} else {
										return false;
									}
								}
								
								// If no stroke, it is inside
								else {
									return true;
								}
							}
							
							// If the y position of the pointer is above the end points
							else {
								return false;
							}
						}
					}
				} else
				
				// Generic radial object
				if (obj.shapeType === "radial") {
					var radius = obj.radius ? obj.radius : 0;
					
					if (radius > 0) {
						var pointer = this.transformPointerPosition(obj, obj.abs_x, obj.abs_y, 0, pointerObject),
							origin = obj.getOrigin(),
							D = Math.sqrt(Math.pow(pointer.x - obj.abs_x + origin.x, 2) + Math.pow(pointer.y - obj.abs_y + origin.y, 2));
							
						return (D < radius);
					}
				}
			}
		};
	};

	// Register the module
	oCanvas.registerModule("tools", tools);





	// Define the class
	var events = function () {
		
		// Return an object when instantiated
		return {

			enabled: true,
			eventTypes: {},

			init: function () {

				// Add core properties that this module needs to be able to add events directly to the canvas
				this.core.canvasElement.events = {};
			},

			addEventTypes: function (pointerName, types) {
				this.eventTypes[pointerName] = this.eventTypes[pointerName] || [];
				var eventTypes = this.eventTypes[pointerName];
				for (var group in types) {
					eventTypes[group] = eventTypes[group] || [];
					eventTypes[group].push(types[group]);
				}
			},

			bind: function (obj, types, handler) {
				for (var i = 0; i < types.length; i++) {
					obj.events[types[i]] = obj.events[types[i]] || [];
					obj.events[types[i]].push(handler);
				}
			},

			unbind: function (obj, types, handler) {
				var i, handlers, index;

				for (i = 0; i < types.length; i++) {
					handlers = obj.events[types[i]];

					// If no handlers have been added, none can be removed
					if (handlers === undefined) {
						continue;
					}

					// Remove all handlers if no specific handler is passed in
					if (handler === undefined) {
						delete obj.events[types[i]];
					}

					// Find the passed in handler and remove it
					else {
						index = handlers.indexOf(handler);
						if (~index) {
							handlers.splice(index, 1);
						}
					}
				}
			},

			findFrontObject: function (objects, pointer) {
				var i, obj, result;

				// No object can be found if there are no objects
				if (objects.length === 0) {
					return false;
				}

				// Go through each object, starting from the end.
				//  For each object, it will loop through that object's children recursively.
				//  That way we start with the front object for the root level (added to core)
				//  and dig through to the deepest child. If the pointer is inside that object,
				//  we break out of all loops and return that object to the original caller.
				//  If the pointer was not inside that object, we will go back out one step
				//  at a time and check the pointer against each object. If no object was
				//  detected and we reach the core child again, we will take the next core
				//  child and iterate through that child chain.
				for (i = objects.length; i--;) {
					obj = objects[i];
					result = this.findFrontObject(obj.children, pointer);
					if (result === false) {
						if (obj.pointerEvents && obj.isPointerInside(pointer)) {
							result = obj;
							break;
						}
					} else {
						break;
					}
				}

				// This function will return an object if the pointer is inside it, or false otherwise
				return result;
			},

			getFrontObject: function (pointerName) {
				return this.findFrontObject(this.core.children, this.core[pointerName]) || undefined;
			},

			triggerPointerEvent: function (type, frontObject, pointerName, e) {

				// Abort if events are disabled
				if (!this.enabled) {
					return;
				}

				var canvas, eventTypes, enterEvent, leaveEvent, typeEvent,
				    clickEvent, parentChain, chain, sharedParent, i, l;

				canvas = this.core.canvasElement;
				eventTypes = this.eventTypes[pointerName];
				enterEvent = eventTypes.enter;
				leaveEvent = eventTypes.leave;
				typeEvent = eventTypes[type];
				clickEvent = eventTypes.singleClick;

				// Get a fixed event object
				this.lastPointerEventObject = this.fixEventObject(e, pointerName);

				// Was any front object found?
				if (frontObject) {

					// Is this a different object than the current front object?
					if (frontObject !== this.frontObject) {

						// Is there a current front object?
						if (this.frontObject) {

							// Is the current front object not in the parent chain for this object?
							parentChain = this.getParentChain(frontObject);
							if (!~parentChain.indexOf(this.frontObject)) {
								this.triggerHandlers(this.frontObject, leaveEvent);

								// Is this object not in the parent chain for the current front object?
								parentChain = this.getParentChain(this.frontObject);
								if (!~parentChain.indexOf(frontObject)) {
									this.triggerChain(parentChain, leaveEvent);
								} else {

									// This object is in the parent chain, so we construct a new chain
									//   for all parents in between and trigger leave events for this chain
									chain = [];
									for (i = 0, l = parentChain.length; i < l; i++) {
										if (parentChain[i] === frontObject) {
											break;
										}
										chain.push(parentChain[i]);
									}
									this.triggerChain(chain, leaveEvent);
								}
							}
						}

						// Set this object as new front object
						this.frontObject = frontObject;

						// Has the pointer not entered the parent of this object?
						if (!(frontObject.parent || canvas).events.hasEntered) {

							// Trigger all enter handlers for all parents that the pointer hasn't entered (out to in)
							parentChain = this.findNonEnteredParentChain(frontObject);
							this.triggerChain(parentChain, enterEvent);
						}

						// Has the pointer not entered this object?
						if (!frontObject.events.hasEntered) {
							this.triggerHandlers(frontObject, enterEvent);
						}
					}

				} else {

					// Is there a current front object?
					if (this.frontObject) {

						// Get the parent chain for the object and add the current object to the beginning
						chain = this.getParentChain(this.frontObject, false, true);

						// Trigger all leave handlers for current front object and parent chain
						this.triggerChain(chain, leaveEvent);

						this.frontObject = null;

					} else {

						// Trigger all enter handlers for the canvas if it hasn't been entered
						if (!canvas.events.hasEntered) {
							this.triggerHandlers(canvas, enterEvent);
						}
					}

					frontObject = this.core.canvasElement;
				}

				// Save which object the pointer was last pressed down on
				if (type === "down") {
					this.lastDownObject = frontObject;
				}

				// Trigger all handlers of the current type, for the object and its parent chain, including canvas
				//   This will also respect stopPropagation(), since the event will not be an enter or leave event
				chain = this.getParentChain(frontObject, true, true);
				this.triggerChain(chain, typeEvent);

				// If this is an up event, we might also want to trigger click events
				if (type === "up") {

					// Is this object the last object the pointer was pressed down on?
					if (frontObject === this.lastDownObject) {

						// Trigger all click handlers for the object and its parent chain, including canvas
						this.triggerChain(chain, clickEvent);

					} else {

						// Get the shared parent for this object and the last object the pointer was pressed down
						sharedParent = this.getSharedParent(frontObject, this.lastDownObject);
						if (sharedParent) {

							// Trigger all click handlers for the shared parent and its parent chain, incl canvas
							chain = this.getParentChain(sharedParent, true, true);
							this.triggerChain(chain, clickEvent);
						}
					}

					this.lastDownObject = null;
				}
			},

			getSharedParent: function (obj1, obj2) {
				var obj1Chain, canvas, obj2Parent;

				obj1Chain = this.getParentChain(obj1, true, true);

				canvas = this.core.canvasElement;
				obj2Parent = obj2;

				while (obj2Parent) {
					if (~obj1Chain.indexOf(obj2Parent)) {
						break;
					}
					obj2Parent = obj2Parent.parent || (obj2Parent !== canvas ? canvas : undefined);
				}

				return obj2Parent;
			},

			findNonEnteredParentChain: function (obj) {
				var chain, canvas, parent;

				chain = [];
				canvas = this.core.canvasElement;
				parent = obj.parent;

				while (parent) {
					if (parent.events.hasEntered) {
						break;
					}
					chain.push(parent);
					parent = parent.parent;
				}

				if (!parent && !canvas.events.hasEntered) {
					chain.push(canvas);
				}

				return chain.reverse();
			},

			getParentChain: function (obj, includeCanvas, includeObj) {
				var chain, parent;
				chain = [];

				if (includeObj) {
					chain.push(obj);
				}

				parent = obj.parent;
				while (parent) {
					chain.push(parent);
					parent = parent.parent;
				}

				if (includeCanvas && obj !== this.core.canvasElement) {
					chain.push(this.core.canvasElement);
				}

				return chain;
			},

			triggerChain: function (chain, types, eventObject) {
				var i, l, continuePropagation;
				for (i = 0, l = chain.length; i < l; i++) {
					continuePropagation = this.triggerHandlers(chain[i], types, eventObject);
					if (!continuePropagation) {
						break;
					}
				}
			},

			triggerHandlers: function (obj, types, eventObject) {
				var i, handlers, isEnter, isLeave, numHandlers, n, e;

				var callObj = (obj === this.core.canvasElement) ? this.core : obj;

				for (i = 0; i < types.length; i++) {
					handlers = obj.events[types[i]];
					isEnter = !!~types[i].indexOf("enter");
					isLeave = !!~types[i].indexOf("leave");
					e = eventObject || (~types[i].indexOf("key") ? this.lastKeyboardEventObject : this.lastPointerEventObject);
					e.type = types[i];
					e.bubbles = (isEnter || isLeave) ? false : true;

					if (isEnter && !obj.events.hasEntered) {
						obj.events.hasEntered = true;
					} else if (isLeave && obj.events.hasEntered) {
						obj.events.hasEntered = false;
					}

					if (handlers) {
						numHandlers = handlers.length;
						for (n = 0; n < numHandlers; n++) {
							if (typeof handlers[n] === "function") {
								handlers[n].call(callObj, e);
							}
						}

						if (e.stoppingPropagation) {
							e.stoppingPropagation = false;
							return false;
						}
					}
				}

				return true;
			},

			fixEventObject: function (e, inputName) {
				var properties = "altKey ctrlKey metaKey shiftKey button charCode keyCode clientX clientY pageX pageY screenX screenY detail eventPhase isChar touches targetTouches changedTouches scale rotation".split(" "),
					numProps = properties.length,
					eventObject, i, property, buttonConversion;
				
				// Fix specific properties and methods
				eventObject = {
					originalEvent: e,
					timeStamp: (new Date()).getTime(),
					which: e === undefined ? 0 : (e.which === 0 ? e.keyCode : e.which),
					
					preventDefault: function () {
						if (e !== undefined) {
							e.preventDefault();
						}
					},
					
					stopPropagation: function () {
						if (this.bubbles) {
							this.stoppingPropagation = true;
						}
						if (e !== undefined) {
							e.stopPropagation();
						}
					}
				};

				if (e === undefined) {
					return eventObject;
				}

				// Set selected original properties
				for (i = 0; i < numProps; i++) {
					property = properties[i];
					if (e[property] !== undefined) {
						eventObject[property] = e[property];
					}
				}

				// Add pointer coordinates
				if (~"mouse touch".indexOf(inputName)) {
					eventObject.x = this.core[inputName].x;
					eventObject.y = this.core[inputName].y;
				}

				// Fix the which property for mouse events
				if (inputName === "mouse") {
					// 0: No button pressed
					// 1: Primary button (usually left)
					// 2: Secondary button (usually right)
					// 3: Middle (usually the wheel)
					buttonConversion = {
						0: 1,
						2: 2,
						1: 3,
						"default": 0
					};
					eventObject.which = buttonConversion[eventObject.button] || buttonConversion["default"];
				}

				// Fix the which property for touch events
				if (inputName === "touch") {
					eventObject.which = 0;
				}

				return eventObject;
			}
		};
	};

	// Register the module
	oCanvas.registerModule("events", events, "init");





	// Define the class
	var draw = function () {
		
		// Return an object when instantiated
		return {

			// Set properties
			objects: [],
			translation: { x: 0, y: 0 },

			changeZorder: function (obj, index1, index2) {
				var objects = obj.children,
					obj1 = objects[index1],
					obj2 = objects[index2],
					before, middle, after, newArray;

				// Cancel the change if the first object doesn't exist
				if (obj1 === undefined) {
					return;
				}

				// Cancel the change if the indexes are the same
				if (index1 === index2) {
					return;
				}

				// If the new index is larger than the last index, make it the last
				if (index2 > objects.length -1) {
					index2 = objects.length -1;
				}

				// If the new index is smaller than the first, make it the first
				if (index2 < 0) {
					index2 = 0;
				}

				// Change the order of the objects
				if (index2 > index1) {
					before = objects.slice(0, index1);
					after = objects.slice(index2 + 1, objects.length);
					middle = objects.slice(index1, index2 + 1);
					middle.shift();
					middle.push(obj1);
				} else {
					before = objects.slice(0, index2);
					after = objects.slice(index1 + 1, objects.length);
					middle = objects.slice(index2, index1 + 1);
					middle.pop();
					middle.unshift(obj1);
				}

				// Update the array with the new values
				obj.children = before.concat(middle).concat(after);
			},
			
			// Method for clearing the canvas from everything that has been drawn (bg can be kept)
			clear: function (keepBackground) {

				// Clear all the image data on the canvas
				this.core.canvas.clearRect(0, 0, this.core.width, this.core.height);
				
				// Redraw the background if it should be kept
				if (keepBackground !== false) {
					this.core.background.redraw();
				}
				
				// Set a flag that will affect the value of the `drawn` property of display objects
				this.isCleared = true;

				return this;
			},
			
			// Method for drawing all objects in the object list
			redraw: function (forceClear) {
				forceClear = forceClear || false;
				
				// Clear the canvas (keep the background)
				if (this.core.settings.clearEachFrame || forceClear) {
					this.clear();
				}

				// Set a flag that will affect the value of the `drawn` property of display objects
				this.isCleared = false;

				// Draw all objects in the correct order
				this.drawObjects(this.core.children);
				
				return this;
			},

			drawObjects: function (objects) {
				var canvas = this.core.canvas,
					i, l, obj, object, x, y, objectChain, lastX, lastY, n, len, parent, shadow, opacity;

				for (i = 0, l = objects.length; i < l; i++) {
					obj = objects[i];
					if ((obj !== undefined) && (typeof obj.draw === "function")) {

						// Update the object's properties if an update method is available
						if (typeof obj.update === "function") {
							obj.update();
						}

						// Temporarily move the canvas origin and take children's positions into account, so they will rotate around the parent
						canvas.save();

						// Translate the canvas matrix to the position of the object
						canvas.translate(obj.x, obj.y);

						// If the object has a rotation, rotate the canvas matrix
						if (obj.rotation !== 0) {
							canvas.rotate(obj.rotation * Math.PI / 180);
						}

						// Scale the canvas for this object
						if (obj.scalingX !== 1 || obj.scalingY !== 1) {
							canvas.scale(obj.scalingX, obj.scalingY);
						}

						// Scale the opacity
						opacity = obj.opacity;
						var parent = obj.parent;
						while(parent && parent !== this.core) {
							opacity *= parent.opacity;
							parent = parent.parent;
						}

						// Save the translation so that display objects can access this if they need
						this.translation = { x: obj.abs_x, y: obj.abs_y };

						// Automatically adjust the abs_x/abs_y for the object
						// (objects not using these variables in the drawing process use the object created above)
						x = obj.abs_x;
						y = obj.abs_y;
						obj._.abs_x = 0;
						obj._.abs_y = 0;

						// Set the alpha to match the object's opacity
						canvas.globalAlpha = !isNaN(parseFloat(opacity)) ? parseFloat(opacity) : 1;

						// Set the composition mode
						canvas.globalCompositeOperation = obj.composition;

						// Set shadow properties if object has shadow
						shadow = obj.shadow;
						if (shadow.blur > 0) {
							canvas.shadowOffsetX = shadow.offsetX;
							canvas.shadowOffsetY = shadow.offsetY;
							canvas.shadowBlur = shadow.blur;
							canvas.shadowColor = shadow.color;
						}

						// Set stroke properties
						canvas.lineCap = obj.cap;
						canvas.lineJoin = obj.join;
						canvas.miterLimit = obj.miterLimit;

						// Draw the object
						obj.draw();
						obj.drawn = true;

						// Reset the abs_x/abs_y values
						obj._.abs_x = x;
						obj._.abs_y = y;

						// Reset stroke properties
						canvas.lineCap = "butt";
						canvas.lineJoin = "miter";
						canvas.miterLimit = 10;

						// Loop children recursively to draw everything in the correct order
						if (obj.children.length > 0) {
							this.drawObjects(obj.children);
						}

						// Restore the old transformation
						canvas.restore();
						this.translation = { x: 0, y: 0 };
					}
				}
			}
		};
	};

	// Register the module
	oCanvas.registerModule("draw", draw);





	// Define the class
	var background = function () {
		
		// Return an object when instantiated
		return {

			// Set properties
			bg: "",
			value: "",
			type: "transparent",
			loaded: false,
			
			init: function () {
				this.set(this.core.settings.background);
			},
			
			// Method for setting the background
			set: function (value) {
				var _this = this;
				if (typeof value !== "string") {
					value = "";
				}
				
				this.value = value;
				
				// Get background type (gradient, image, color or transparent)
				if (~value.indexOf("gradient")) {
					this.type = "gradient";
				} else if (~value.indexOf("image")) {
					this.type = "image";
				} else if (this.core.style && this.core.style.isColor(value)) {
					this.type = "color";
				} else {
					this.type = "transparent";
				}
				
				// Handle the different background types
				if (this.type === "color") {
				
					// Set color as background
					this.bg = value;
					if (this.core.timeline && !this.core.timeline.running) {
						this.core.draw.redraw(true);
					}
					this.loaded = true;
				}
				else if (this.type === "gradient") {
				
					// Get gradient object and set it as background
					this.bg = this.core.style ? this.core.style.getGradient(value, 0, 0, this.core.width, this.core.height) : "";
					if (this.core.timeline && !this.core.timeline.running) {
						this.core.draw.redraw(true);
					}
					this.loaded = true;
				}
				else if (this.type === "image") {
				
					// Parse image string
					var matches = /image\((.*?)(,(\s|)(repeat|repeat-x|repeat-y|no-repeat)|)\)/.exec(value),
						path = matches[1],
						repeat = matches[4] || "repeat",
						image = new Image();
				
					// Set image as background
					image.src = path;
					image.onload = function () {
						_this.bg = _this.core.canvas.createPattern(this, repeat);
						_this.loaded = true;
						if (_this.core.timeline && !_this.core.timeline.running) {
							_this.core.redraw(true);
						}
					};
				}
				
				else {
					// Background type is transparent, redraw the background (clears the canvas)
					this.redraw(true);
					this.loaded = true;
				}
				
				return this;
			},
			
			// Method for redrawing the background (replaces everything thas has been drawn)
			redraw: function () {
				var core = this.core;
				
				// Fill canvas with the background color if it's not transparent
				if (this.type !== "transparent") {
					core.canvas.fillStyle = this.bg;
					core.canvas.fillRect(0, 0, core.width, core.height);
				}
			}
		};
	};

	// Register the module
	oCanvas.registerModule("background", background, "init");




	// Define the class
	var scenes = function () {
		
		// Return an object when instantiated
		return {
			
			// Set properties
			current: "none",
			scenes: {},

			// Method for creating a new scene
			create: function (name, init) {
				this.scenes[name] = Object.create(this.scenesBase());
				this.scenes[name].name = name;
				
				init.call(this.scenes[name]);
				
				return this.scenes[name];
			},
			
			// Object base that will be instantiated for each new scene
			scenesBase: function () {
			
				return {
					name: "",
				
					// Container for all objects that are added to the scene
					objects: [],
					
					loaded: false,
					
					// Method for adding objects to the scene
					add: function (obj) {
						this.objects.push(obj);
						
						// Add the object to canvas if the scene is loaded
						if (this.loaded) {
							obj.add();
						}
						
						return this;
					},
					
					// Method for removing an object from the scene
					remove: function (obj) {
						var index = this.objects.indexOf(obj);
						if (~index) {
							this.objects.splice(index, 1);
								
							// Remove the object from canvas if the scene is loaded
							if (this.loaded) {
								obj.remove();
							}
						}
						
						return this;
					},
					
					// Method for loading the scene's objects
					load: function () {
						if (this.loaded) {
							return;
						}
						
						var objects = this.objects,
							i, l = objects.length;
							
						// Loop through all added objects
						for (i = 0; i < l; i++) {
							if (objects[i] !== undefined) {
								objects[i].add(false);
							}
						}
						
						this.loaded = true;
						
						return this;
					},
					
					// Method for unloading the scene (removes all added objects from the canvas)
					unload: function () {
						var objects = this.objects,
							i, l = objects.length;
							
						// Loop through all added objects
						for (i = 0; i < l; i++) {
							if (objects[i] !== undefined) {
								// Remove the object from canvas
								objects[i].remove(false);
							}
						}
						
						this.loaded = false;
						
						return this;
					}
				};
			},
			
			// Method for loading a specific scene
			load: function (name, unload) {
				// Unload last scene if not done already
				if (unload === true && this.current !== "none") {
					this.unload(this.current);
				}
				this.current = name;
				this.scenes[name].load();

				this.core.draw.redraw();

				return this;
			},
			
			// Method for unloading a specific scene
			unload: function (name) {
				this.current = "none";
				this.scenes[name].unload();

				this.core.draw.redraw();

				return this;
			}
		};
	};

	// Register the module
	oCanvas.registerModule("scenes", scenes);




	// Define the class
	var style = function () {
		
		// Return an object when instantiated
		return {

			// Method for converting a stroke to either an object or a string
			// Fixes errors if found
			getStroke: function (value, return_type) {
				return_type = (return_type === "string") ? "string" : "object";
			
				// Convert object to string with default values if unspecified
				if (typeof value === "object" && return_type === "string") {
					var val = value;
					value = (typeof val.pos === "string") ? val.pos : "center";
					value += " " + (typeof val.width === "number" ? val.width+"px" : "1px");
					value += " " + (typeof val.color === "string" ? val.color : "#000000");
				}

				// Get stroke components
				var stroke = value.split(" ");

				// Handle color values with parentheses, because they can contain spaces,
				// that would be split by the line above. The color value needs to be in
				// one entry in the stroke array.
				var parenStart, parenEnd;
				for (var i = 0, l = stroke.length; i < l; i++) {
					if (!parenStart && stroke[i].indexOf("(") > -1) parenStart = i;
					if (stroke[i].indexOf(")") > -1) parenEnd = i;
				}
				var color = parenEnd ? stroke.splice(parenStart, parenEnd - parenStart + 1) : undefined;
				if (color) stroke.push(color.join(" "));
			
				// Get stroke settings
				var strokePositions = ["outside", "center", "inside"];
				var fixed_color = '', i, num_splits = stroke.length;
				var strokePos, width, color, only_color;
				
				// If there are more than 2 splits
				if (num_splits >= 3) {
					
					// If first split is not a valid stroke position
					if (!~strokePositions.indexOf(stroke[0])) {
					
						// Boolean that says if only a color is specified
						only_color = isNaN(parseInt(stroke[0]));
						
						// Loop through all the splits and concatenate the split color values
						for (i = (only_color ? 0 : 1); i < num_splits; i++) {
							fixed_color += stroke[i] + (i === num_splits - 1 ? " " : "");
						}
						
						// Set the fixed stroke array
						if (only_color) {
							stroke = [1, fixed_color];
						} else {
							stroke = [stroke[0], fixed_color];
						}
						
						// Set number of splits so the if case further down is entered
						num_splits = 2;
						
					} else {
					
						// Fix color value
						if (num_splits > 3) {
							for (i = 2; i < num_splits; i++) {
								fixed_color += stroke[i] + (i === num_splits - 1 ? " " : "");
							}
							stroke = [stroke[0], stroke[1], fixed_color];
						}
						
						// Set the stroke object with correct values
						stroke = {
							pos: stroke[0],
							width: parseFloat(stroke[1]),
							color: stroke[2]
						};
					}
				}
				
				// If there are only two splits ( [width, color] )
				if (num_splits === 2) {
					
					// Set the stroke object
					stroke = {
						pos: "center",
						width: parseFloat(stroke[0]),
						color: stroke[1]
					};
				}
				
				// If stroke is still an array (empty stroke value was passed in)
				if (stroke.length) {
					stroke = {
						pos: "center",
						width: 0,
						color: ""
					};
				}
				
				if (return_type === "string") {
					return stroke.pos + " " + stroke.width + "px " + stroke.color;
				}
				else if (return_type === "object") {
					return stroke;
				}
			},
			
			// Method for converting a gradient string to a gradient object
			getGradient: function (value, x, y, width, height) {

				if (~value.indexOf("linear")) {
					return this.getLinearGradient(value, x, y, width, height);
					
				} else if (~value.indexOf("radial")) {
					return this.getRadialGradient(value, x, y, width, height);
					
				} else {
					return "transparent";
				}
			},
			
			// Method for converting a CSS style linear gradient to a CanvasGradient object
			getLinearGradient: function (value, x, y, width, height) {
				var gradient,
					args, pos_parts, pos = [], i, start, sX, sY, eX, eY,
					positions = ["top", "bottom", "left", "right"],
					matchedColor, colorIndex, parenColors = [], colorStops, s;
			
				// Get arguments of the linear-gradient function, while preserving color values like hsla() and such
				args = /\((.*)\)/.exec(value)[1];
				while (matchedColor = /((hsl|hsla|rgb|rgba)\(.*?\))/.exec(args)) {
					colorIndex = parenColors.push(matchedColor[1]) - 1;
					args = args.substring(0, matchedColor.index) + "###" + colorIndex + "###" + args.substring(matchedColor.index + matchedColor[1].length, args.length);
				}
				args = args.split(",");
				
				// Get position keywords
				pos_parts = args[0].split(" ");
				
				// If the first keyword is a position, add it
				if (~positions.indexOf(pos_parts[0]) || ~pos_parts[0].indexOf("deg")) {
					pos.push(pos_parts[0]);
				}
				// If the second keyword is a position, add it
				if (pos_parts.length > 1 && ~positions.indexOf(pos_parts[1])) {
					pos.push(pos_parts[1]);
				}
				// Add default value if none is specified
				if (pos.length === 0) {
					pos.push("top");
				} else {
					start = 1;
				}
				
				// Get coordinates for start and ending points, based on the above position
				// Get horizontal, vertical or degree specified coordinates
				if (pos.length === 1) {
					if (pos[0] === "top") {
						sX = x + width / 2;
						sY = y;
						eX = x + width / 2;
						eY = y + height;
					} else if (pos[0] === "right") {
						sX = x + width;
						sY = y + height / 2;
						eX = x;
						eY = y + height / 2;
					} else if (pos[0] === "bottom") {
						sX = x + width / 2;
						sY = y + height;
						eX = x + width / 2;
						eY = y;
					} else if (pos[0] === "left") {
						sX = x;
						sY = y + height / 2;
						eX = x + width;
						eY = y + height / 2;
					} else if (~pos[0].indexOf("deg")) {
						var alpha, a, beta, cornerDistance, endDistance, cornerX, cornerY, cY,
							pi = Math.PI,
							centerX = x + width / 2,
							centerY = y + height / 2;
						
						// Convert the angle to the range 0 - 359 degrees and then convert it to radians
						alpha = (parseFloat(pos) % 360) * pi / 180;
						a = alpha;
						
						// Upper right corner
						if (alpha >= 0 && alpha < pi / 2) {
							cornerX = x + width;
							cornerY = y;
						}
						
						// Upper left corner
						else if (alpha >= pi / 2 && alpha < pi) {
							cY = centerY;
							centerY = centerX;
							cornerY = x;
							cornerX = cY;
							centerX = y;
						}
						
						// Bottom left corner
						else if (alpha >= pi && alpha < pi * 1.5) {
							cY = centerY;
							cornerX = centerX;
							centerX = x;
							centerY = y + height;
							cornerY = cY;
						}
						
						// Bottom right corner
						else if (alpha >= pi * 1.5 && alpha < pi * 2) {
							cY = centerY;
							centerY = x + width;
							cornerY = centerX;
							cornerX = y + height;
							centerX = cY;
						}
						
						
						// Convert the angle to the range 0 - 89
						alpha = alpha % (pi / 2);
						
						// Get angle between baseline and the line between the corner and the center
						beta = Math.atan(Math.abs(centerY - cornerY) / Math.abs(cornerX - centerX));
						
						// Get the distance between the corner and the center
						cornerDistance = Math.sqrt(Math.pow(centerY - cornerY, 2) + Math.pow(centerX - cornerX, 2));
						
						// Get the distance between the end point and the center
						endDistance = cornerDistance * Math.cos(beta - (alpha));
						
						// Get end point and start point
						// Upper right corner
						if (a >= 0 && a < pi / 2) {
							eX = centerX + endDistance * Math.cos(alpha);
							eY = centerY - endDistance * Math.sin(alpha);
							sX = centerX * 2 - eX;
							sY = centerY * 2 - eY;
						}
						
						// Upper left corner
						else if (a >= pi / 2 && a < pi) {
							eX = centerY - endDistance * Math.cos(pi / 2 - alpha);
							eY = cornerX - endDistance * Math.sin(pi / 2 - alpha);
							sX = centerY * 2 - eX;
							sY = cornerX * 2 - eY;
						}
						
						// Bottom left corner
						else if (a >= pi && a < pi * 1.5) {
							eX = cornerX + endDistance * Math.cos(pi - alpha);
							eY = cornerY + endDistance * Math.sin(pi - alpha);
							sX = cornerX * 2 - eX;
							sY = cornerY * 2 - eY;
						}
						
						// Bottom right corner
						else if (a >= pi * 1.5 && a < pi * 2) {
							eX = cornerY - endDistance * Math.cos(pi * 1.5 - alpha);
							eY = centerX - endDistance * Math.sin(pi * 1.5 - alpha);
							sX = cornerY * 2 - eX;
							sY = centerX * 2 - eY;
						}
					}
					
				// Get diagonal coordinates
				} else {
					if (~pos.indexOf("top") && ~pos.indexOf("left")) {
						sX = x;
						sY = y;
						eX = x + width;
						eY = y + height;
					} else if (~pos.indexOf("top") && ~pos.indexOf("right")) {
						sX = x + width;
						sY = y;
						eX = x;
						eY = y + height;
					} else if (~pos.indexOf("bottom") && ~pos.indexOf("left")) {
						sX = x;
						sY = y + height;
						eX = x + width;
						eY = y;
					} else if (~pos.indexOf("bottom") && ~pos.indexOf("right")) {
						sX = x + width;
						sY = y + height;
						eX = x;
						eY = y;
					}
				}
				
				// Create the gradient object
				gradient = this.core.canvas.createLinearGradient(sX, sY, eX, eY);
				
				// Get the color stops
				colorStops = this.getColorStops(gradient, args.slice(start), parenColors);
				
				// Add the color stops to the gradient object
				for (s = 0; s < colorStops.length; s++) {
					gradient.addColorStop(colorStops[s].pos / 100, colorStops[s].color);
				}
				
				// Return the gradient object
				return gradient;
			},
			
			// Method for converting a CSS style radial gradient to a CanvasGradient object
			getRadialGradient: function (value, x, y, width, height) {
				var gradient,
					bg_position_keywords_x = ["left", "center", "right"],
					bg_position_keywords_y = ["top", "center", "bottom"],
					bg_position_sizes_x = { "left": x, "center": (x + width / 2), "right": (x + width) },
					bg_position_sizes_y = { "top": y, "center": (y + height / 2), "bottom": (y + height) },
					sizes = ["closest-side", "closest-corner", "farthest-side", "farthest-corner", "contain", "cover"],
					args, i, l, matchedColor, colorIndex, parenColors = [], colorStops, s,
					pos_arg, num_pos_args = 0, circles = [{x:undefined,y:undefined,r:0}, {x:undefined,y:undefined,r:undefined}], p, p_key,
					size_arg, size, size_set = false;
				
				// Get arguments of the radial-gradient function, while preserving color values like hsla() and such
				args = /\((.*)\)/.exec(value)[1];
				while (matchedColor = /((hsl|hsla|rgb|rgba)\(.*?\))/.exec(args)) {
					colorIndex = parenColors.push(matchedColor[1]) - 1;
					args = args.substring(0, matchedColor.index) + "###" + colorIndex + "###" + args.substring(matchedColor.index + matchedColor[1].length, args.length);
				}
				args = args.split(/\s*,\s*/);
				l = args.length;
				
				// Get position for start and end circles
				for (i = 0; i < 2; i++) {
					
					// If the argument has two values
					if (~args[i].indexOf(" ")) {
						pos_arg = args[i].split(" ");
						
						// Get the different keywords
						// Center
						if (pos_arg[0] === "center") {
							circles[i].x = pos_arg[0];
							circles[i].y = pos_arg[1];
							num_pos_args = i + 1;
						}
						
						// Interpret X position for first value of the argument
						else if (~bg_position_keywords_x.indexOf(pos_arg[0])) {
							circles[i].x = pos_arg[0];
							num_pos_args = i + 1;
							
							// Interpret Y position for second value of the argument
							if (~bg_position_keywords_y.indexOf(pos_arg[1])) {
								circles[i].y = pos_arg[1];
							}
						}
						
						// Interpret Y position for first value of the argument
						else if (~bg_position_keywords_y.indexOf(pos_arg[0])) {
							circles[i].y = pos_arg[0];
							num_pos_args = i + 1;
							
							// Interpret Y position for second value of the argument
							if (~bg_position_keywords_x.indexOf(pos_arg[1])) {
								circles[i].x = pos_arg[1];
							}
						}
						
						// Interpret X position for first value of the argument and the value is numeric
						else if (!isNaN(parseFloat(pos_arg[0]))) {
							circles[i].x = pos_arg[0];
							num_pos_args = i + 1;
							
							// Interpret Y position for second value of the argument (could be either keyword or numeric)
							if (~bg_position_keywords_y.indexOf(pos_arg[1]) || !isNaN(parseFloat(pos_arg[1]))) {
								circles[i].y = pos_arg[1];
							}
						}
						
						// Add the missing position values
						if (!circles[i].x) {
							circles[i].x = "center";
						}
						if (!circles[i].y) {
							circles[i].y = "center";
						}
					}
					
					// If only one value was passed in as the argument
					else {
						
						// Add position if it's a keyword for either an X or Y position
						if (~bg_position_keywords_x.indexOf(args[i])) {
							circles[i].x = args[i];
							num_pos_args = i + 1;
						} else if (~bg_position_keywords_y.indexOf(args[i])) {
							circles[i].y = args[i];
							num_pos_args = i + 1;
						}
						
						// If the position is not a valid keyword and this is the end circle,
						// add the same position as the first circle has
						else if (i === 1) {
							circles[i].x = circles[0].x;
						}
						
						// Add default position for the first value if nothing valid was passed in
						else {
							circles[i].x = "center";
						}
						
						
						// Since only one value was passed in, the second must be added here
						// If this is the second position (end circle), use the first circle's position
						if (i === 1) {
							circles[i].y = circles[0].y;
						}
						
						// Add default value if nothing value was passed in
						else {
							circles[i].y = "center";
						}
					}
				}
			
			
				// Get the size
				
				// Check for keywords
				if (~sizes.indexOf(args[num_pos_args])) {
					size = args[num_pos_args];
					size_set = true;
				}
				
				// Check for pixel or percentage value
				if (/\d+(%|px)\s/.test(args[num_pos_args])) {
					size = parseFloat(args[num_pos_args]);
					size_set = true;
					if (isNaN(size)) {
						size = 0;
					}
				}
				
				// Defaults if no correct values were passed in
				if (size === undefined) {
					size = "cover";
				}
				
				
				
				// Convert all positions to actual pixel sizes relative to the top left corner of the canvas
				for (i = 0; i < 2; i++) {
				
					// Get pixel sizes for keywords
					circles[i].abs_x = bg_position_sizes_x[circles[i].x];
					circles[i].abs_y = bg_position_sizes_y[circles[i].y];
					
					// Loop through both x and y
					for (p = 0; p < 2; p++) {
					
						p_key = "abs_" + (p === 0 ? "x" : "y");
					
						// If the value was not found, it is not a keyword – it is probably a number
						if (circles[i][p_key] === undefined) {
						
							// Get the number
							circles[i][p_key] = parseFloat(circles[i][(p_key === "abs_x" ? "x" : "y")]);
							
							// If it was not a number, get the center value
							if (isNaN(circles[i][p_key])) {
								circles[i][p_key] = (p_key === "abs_x") ? bg_position_sizes_x.center - x : bg_position_sizes_y.center - y;
							}
							
							// If it was a percentage, convert it to an actual pixel size
							if (~circles[i][(p_key === "abs_x" ? "x" : "y")].indexOf("%")) {
								circles[i][p_key] = (circles[i][p_key] / 100) * (p_key === "abs_x" ? width : height);
							}
							
							// Add the x offset to make the position relative to the left corner of the canvas
							circles[i][p_key] += (p_key === "abs_x") ? x : y;
						}
					}
				}
				
				
				// Convert the size to actual pixels
				
				// Check for keywords
				if (~sizes.indexOf(size)) {
					if (size === "closest-side" || size === "contain") {
						size = Math.min(
							Math.abs(circles[1].abs_y - y),
							Math.abs(y + height - circles[1].abs_y),
							Math.abs(circles[1].abs_x - x),
							Math.abs(x + width - circles[1].abs_y)
						);
					} else if (size === "closest-corner") {
						size = Math.min(
							Math.sqrt(Math.pow((circles[1].abs_x - x), 2) + Math.pow((circles[1].abs_y - y), 2)),
							Math.sqrt(Math.pow((x + width - circles[1].abs_x), 2) + Math.pow((circles[1].abs_y - y), 2)),
							Math.sqrt(Math.pow((x + width - circles[1].abs_x), 2) + Math.pow((y + height - circles[1].abs_y), 2)),
							Math.sqrt(Math.pow((circles[1].abs_x - x), 2) + Math.pow((y + height - circles[1].abs_y), 2))
						);
					} else if (size === "farthest-corner" || size === "cover") {
						size = Math.max(
							Math.sqrt(Math.pow((circles[1].abs_x - x), 2) + Math.pow((circles[1].abs_y - y), 2)),
							Math.sqrt(Math.pow((x + width - circles[1].abs_x), 2) + Math.pow((circles[1].abs_y - y), 2)),
							Math.sqrt(Math.pow((x + width - circles[1].abs_x), 2) + Math.pow((y + height - circles[1].abs_y), 2)),
							Math.sqrt(Math.pow((circles[1].abs_x - x), 2) + Math.pow((y + height - circles[1].abs_y), 2))
						);
					} else if (size === "farthest-side") {
						size = Math.max(
							Math.abs(circles[1].abs_y - y),
							Math.abs(y + height - circles[1].abs_y),
							Math.abs(circles[1].abs_x - x),
							Math.abs(x + width - circles[1].abs_y)
						);
					} else {
						size = 0;
					}
				}
				
				// Check for a percentage
				if (~args[num_pos_args].indexOf("%")) {
					
					// Convert it to pixels relative to the specified dimension. Defaults to width
					if (~args[num_pos_args].indexOf(" ")) {
						size_arg = args[num_pos_args].split(" ")[1] === "height" ? height : width;
					} else {
						size_arg = width;
					}
					size = (size / 100) * size_arg;
				}
				
				// Set the radius for the end circle
				circles[1].r = size;
				
				// Create the gradient object
				gradient = this.core.canvas.createRadialGradient(circles[0].abs_x, circles[0].abs_y, circles[0].r, circles[1].abs_x, circles[1].abs_y, circles[1].r);
				
				// Get the color stops
				colorStops = this.getColorStops(gradient, args.slice(num_pos_args + (size_set ? 1 : 0)), parenColors);
				
				// Add the color stops to the gradient object
				for (s = 0; s < colorStops.length; s++) {
					gradient.addColorStop(colorStops[s].pos / 100, colorStops[s].color);
				}
				
				return gradient;
			},
			
			// Method for getting color stops
			getColorStops: function (gradient, stops, parenColors) {
			
				var i, l = stops.length,
					colorStop, stop_parts, color, color_pos, colorStops = [];
			
				// Loop through all color stops
				for (i = 0; i < l; i++) {
					colorStop = stops[i].trim();
					
					// If the last position was more than or equal to 100 %,
					// the following would not be visible anyway, so setting it is unnecessary
					if (color_pos >= 100) {
						break;
					}
					
					// Split the color stop value to separate the color from the position
					// Using space is OK, since hsla() values and such are stripped away up at the top
					// Positions outside the range 0 - 100 % are not supported at the moment
					if (~colorStop.indexOf(" ")) {
						stop_parts = colorStop.split(" ");
						color = stop_parts[0];
						color_pos = stop_parts[1];
						
						// Convert a pixel value to a percentage
						if (~color_pos.indexOf("px")) {
							color_pos = parseFloat(color_pos) / Math.sqrt(Math.pow(eX - sX, 2) + Math.pow(eY - sY, 2)) * 100;
						} else {
							color_pos = parseFloat(color_pos);
						}
					}
					
					// No position was specified, so one will be generated
					else {
						color = colorStop;
						
						// Set first position to 0 if not set before
						if (color_pos === undefined) {
							color_pos = 0;
						}
						
						// Set the next position if it's not the first one
						else {
							color_pos = color_pos || 0;
							color_pos = color_pos + ((100 - color_pos) / (l - i));
						}
					}
					
					// Get the saved color value if the color contained parentheses when passed in to this method
					if (~color.indexOf("###")) {
						color = parenColors[/###(\d+)###/.exec(color)[1]];
					}
					
					// Add color data to an array with all color stops
					colorStops.push({
						pos: color_pos,
						color: color
					});
				}
				
				return colorStops;
			},
			
			// Method for converting a font to either a string or an object
			getFont: function (value, return_type) {
				return_type = (return_type === "string") ? "string" : "object";
				
				// Convert object to string with default values if unspecified
				if (typeof value === "object" && return_type === "string") {
					var val = value;
					value = (typeof val.style === "string" ? val.style : "normal");
					value += " " + (typeof val.variant === "string" ? val.variant : "normal");
					value += " " + (typeof val.weight === "string" ? val.weight : "normal");
					value += " " + (typeof val.size === "number" ? (~~(val.size * 10 + 0.5) / 10)+"px" : "16px");
					value += "/" + (typeof val.lineHeight === "number" ? (~~(val.lineHeight * 10 + 0.5) / 10) :
						(typeof val.lineHeight === "string" ? (val.lineHeight.indexOf("px") > -1 ? val.lineHeight : 1) : 1));
					value += " " + (typeof val.family === "string" ? val.family : "sans-serif");
				}
				
				if (value.length > 0) {
				
					// Get font settings
					var font = value.split(" "),
						l = font.length,
						i, value, splits, n, family = "",
						styles = ["normal", "italic", "oblique"],
						variants = ["normal", "small-caps"],
						weights = ["normal", "bold", "bolder", "lighter", "100", "200", "300", "400", "500", "600", "700", "800", "900"],
						font_object = {};
					
					for (i = 0; i < l; i++) {
						value = font[i];
						
						// Font style
						if (~styles.indexOf(value) && !font_object.style) {
							font_object.style = value;
						} else
						// Font variant
						if (~variants.indexOf(value) && !font_object.variant) {
							font_object.variant = value;
						} else
						// Font weight
						if (~weights.indexOf(value) && !font_object.weight) {
							font_object.weight = value;
						} else
	
						if (~value.indexOf("/") && !font_object.size && !font_object.lineHeight) {
							splits = value.split("/");
							// Font size
							if (!isNaN(parseInt(splits[0]))) {
								font_object.size = parseInt(splits[0]);
							}
							// Line height
							if (!isNaN(parseFloat(splits[1]))) {
								font_object.lineHeight = parseFloat(splits[1]);
								font_object.lineHeightUnit = splits[1].indexOf("px") > -1 ? "px" : "relative";
							}
						} else
						
						if (!font_object.size && /\d+[a-z]{2}(?!\/)/.test(value)) {
							// Font size
							if (!isNaN(parseInt(value))) {
								font_object.size = parseInt(value);
							}
						} else
						
						// Font family
						if (isNaN(parseInt(value)) && !font_object.family) {
							family = "";
							for (n = i; n < l; n++) {
								family += font[n] + (n === l-1 ? "" : " ")
							}
							font_object.family = family;
						}
					}
				}
				
				// Set default values if unspecified
				font = font_object || {};
				font.style = font.style ? font.style : "normal";
				font.variant = font.variant ? font.variant : "normal";
				font.weight = font.weight ? font.weight : "normal";
				font.size = font.size !== undefined ? font.size : 16;
				font.lineHeight = font.lineHeight !== undefined ? font.lineHeight : 1;
				font.lineHeightUnit = font.lineHeightUnit !== undefined ? font.lineHeightUnit : "relative";
				font.family = font.family ? font.family : "sans-serif";
				
				if (return_type === "string") {
					return font.style + " " + font.variant + " " + font.weight + " " + font.size + "px/" +
						font.lineHeight + (font.lineHeightUnit === "px" ? "px" : "") + " " + font.family;
				}
				else if (return_type === "object") {
					return font;
				}
			},
			
			// Method for converting a shadow to either an object or a string
			getShadow: function (value, return_type) {
				var shadow = {}, values;
				
				// Correct errors if any when an object is passed in
				if (typeof value === "object") {
					shadow.offsetX = !isNaN(parseFloat(value.offsetX)) ? parseFloat(value.offsetX) : 0;
					shadow.offsetY = !isNaN(parseFloat(value.offsetY)) ? parseFloat(value.offsetY) : 0;
					shadow.blur = !isNaN(parseFloat(value.blur)) ? parseFloat(value.blur) : 0;
					shadow.color = this.isColor(value.color) ? value.color : "#000";
				}
				
				// Parse the values if a string was passed in
				else if (typeof value === "string") {
					
					var values = /^(.*?)\s(.*?)\s(.*?)\s(.*?)$/.exec(value);
					shadow.offsetX = !isNaN(parseFloat(values[1])) ? parseFloat(values[1]) : 0;
					shadow.offsetY = !isNaN(parseFloat(values[2])) ? parseFloat(values[2]) : 0;
					shadow.blur = !isNaN(parseFloat(values[3])) ? parseFloat(values[3]) : 0;
					shadow.color = this.isColor(values[4]) ? values[4] : "#000";
				}
				
				if (return_type === "string") {
					return shadow.offsetX + "px " + shadow.offsetY + "px " + shadow.blur + "px " + shadow.color;
				} else {
					return shadow;
				}
			},
			
			// Method for checking if a value is a color or not
			isColor: function (value) {
				if (typeof value === "string" && (value[0] === "#" || value.substr(0, 4) === "rgb(" || value.substr(0, 5) === "rgba(" || value.substr(0, 4) === "hsl(" || value.substr(0, 5) === "hsla(")) {
					return true;
				} else {
					return false;
				}
			}
		};
	};

	// Register the module
	oCanvas.registerModule("style", style);




	window.logs = [];

	// Define the class
	var animation = function () {

		// Return an object when instantiated
		var module = {

			durations: {
				"short": 500,
				"normal": 1000,
				"long": 2000
			},

			defaults: {
				duration: "normal",
				easing: "ease-in-out" // Deprecated value, will be replaced by "ease-in-out-cubic"
			},

			animate: function (obj, args) {
				var argData = this.parseArguments(args);
				var props = argData.properties;
				var options = argData.options;

				// Create queue and get it
				var queue = this.queues.create(obj, options.queue);

				// Create the animation object
				var animation = {
					obj: obj,
					properties: props,
					startValues: {},
					diffValues: {},
					options: {
						queue: queue,
						duration: options.duration,
						easing: options.easing,
						callback: options.callback
					}
				};

				// Add the animation to the queue and run queue
				queue.add(animation);
				queue.run();
			},

			parseArguments: function (args) {
				args = Array.prototype.slice.call(args);
				args[1] = args[1] || {};
				var options;

				// Check for new syntax
				if (typeof args[1] === "object") {
					props = args[0];

					// Use passed in options, with fallbacks
					options = oCanvas.extend({
						duration: this.defaults.duration,
						easing: this.defaults.easing,
						queue: "default",
						callback: function () {}
					}, args[1]);

					options.easing = this.parseEasingOption(options.easing);
					options.duration = this.parseDurationOption(options.duration);

				// Or parse old deprecated syntax
				} else {
					props = args.shift();
					options = this.getAnimateArguments(args);
				}

				return {
					properties: props,
					options: options
				};
			},

			parseEasingOption: function (easing) {
				if (typeof easing === "string") {
					// The cubic-bezier() syntax is now deprecated (though it was never really public)
					if (~easing.indexOf("cubic-bezier")) {
						return this.getCustomCubicBezier(easing) || this.easing[this.defaults.easing];
					} else {
						return this.easing[easing] || this.easing[this.defaults.easing];
					}
				} else if (typeof easing == "function") {
					return easing;
				} else {
					return this.easing[this.defaults.easing];
				}
			},

			parseDurationOption: function (duration) {
				var durations = module.durations;
				if (typeof duration === "string") {
					return durations[duration] || durations[module.defaults.duration];
				}
				return duration;
			},

			runAnimation: function (animation, callback) {
				var obj, props, options, prop;

				obj = animation.obj;
				options = animation.options;
				animation.advanceCallback = callback;

				// Indicate to the module that we want to run an animation, which will start a redraw loop
				this.mainTimer.add(animation);

				// Collect values for the animation
				var props = this.parseProperties(animation.properties, obj);
				animation.properties = props.properties;
				animation.startValues = props.startValues;
				animation.diffValues = props.diffValues;

				// Set initial time
				animation.startTime = new Date().getTime();
			},

			parseProperties: function (props, obj) {
				var startValues = {};
				var diffValues = {};
				for (var prop in props) {
					if (oCanvas.isNumber(props[prop])) {
						startValues[prop] = obj[prop] || 0;
						diffValues[prop] = props[prop] - (obj[prop] || 0);
					} else if (typeof props[prop] === "object") {
						var parsedProps = this.parseProperties(props[prop], obj[prop]);
						startValues[prop] = parsedProps.startValues;
						diffValues[prop] = parsedProps.diffValues;
					} else {
						delete props[prop];
					}
				}

				return {
					properties: props,
					startValues: startValues,
					diffValues: diffValues
				};
			},

			tick: function (animation) {
				var timeDiff, position, propertyPosition, startValues, diffValues, prop;

				// Calculate position in time for the animation
				timeDiff = new Date().getTime() - animation.startTime;
				position = timeDiff / animation.options.duration;

				// Stop the animation if the duration has passed
				if (position > 1) {
					this.setEndValues(animation);
					return false;
				}

				// Calculate the property position based on the easing function
				if (animation.options.easing.length === 1) {
					// Deprecated syntax
					propertyPosition = animation.options.easing.call(this.easing, position);
				} else {
					// New syntax
					propertyPosition = animation.options.easing.call(this.easing, timeDiff, 0, 1, animation.options.duration);
				}

				// Set new values for all properties
				startValues = animation.startValues;
				diffValues = animation.diffValues;
				for (prop in diffValues) {
					this.setObjectProperty(animation.obj, prop, startValues[prop], diffValues[prop], propertyPosition);
				}

				return true;
			},

			setObjectProperty: function (obj, property, startValue, diffValue, propertyPosition) {
				if (oCanvas.isNumber(startValue)) {
					obj[property] = startValue + diffValue * propertyPosition;
				} else {
					for (var prop in startValue) {
						this.setObjectProperty(obj[property], prop, startValue[prop], diffValue[prop], propertyPosition);
					}
				}
			},

			setEndValues: function (animation) {
				var obj = animation.obj;
				var startValues = animation.startValues;
				var diffValues = animation.diffValues;
				for (var prop in animation.properties) {
					this.setObjectProperty(obj, prop, startValues[prop], diffValues[prop], 1);
				}
				if (!this.core.timeline.running) {
					this.core.draw.redraw(true);
				}
			},

			// Method that collects arguments passed in to the animate method, and corrects with defaults.
			// Used to parse the deprecated syntax of the animate method.
			getAnimateArguments: function (args) {
				var duration, easing, newQueue, callback;

				// First argument is already pulled out (properties object)

				// Second argument
				if (typeof args[0] === "number") {
					duration = args[0];
				} else if (typeof args[0] === "string") {
					if (args[0] in this.durations) {
						duration = this.durations[args[0]];
					} else if (args[0] in this.easing) {
						easing = this.easing[args[0]];
					}
				} else if (typeof args[0] === "boolean") {
					newQueue = args[0];
				} else if (typeof args[0] === "function") {
					if (typeof args[1] === "function") {
						easing = args[0];
						callback = args[1];
					}
				}

				// Third argument
				if (typeof args[1] === "string") {
					easing = this.easing[args[1]];
				} else if (typeof args[1] === "function") {
					if (args[2] !== undefined) {
						easing = args[1];
					} else {
						callback = args[1];
					}
				}

				// Fourth argument
				if (args[2] !== undefined) {
					if (typeof args[2] === "function") {
						callback = args[2];
					} else {
						newQueue = !!args[2];
					}
				}

				// Fifth argument
				if (args[3] !== undefined) {
					callback = args[3];
				}

				if (!easing) {
					easing = typeof args[0] === "string" ? args[0] : "";
					easing = ~easing.indexOf("cubic-bezier") ? easing : undefined;
					if (!easing) {
						easing = typeof args[1] === "string" ? args[1] : "";
						easing = ~easing.indexOf("cubic-bezier") ? easing : undefined;
					}
					if (easing) {
						easing = this.getCustomCubicBezier(easing);
					}
				}

				duration = duration || this.durations[this.defaults.duration];
				easing = easing || this.easing[this.defaults.easing];
				newQueue = newQueue !== undefined ? newQueue : false;
				callback = callback || function () {};

				return {
					duration: duration,
					easing: easing,
					queue: newQueue ? undefined : "default",
					callback: callback
				};
			},

			getCustomCubicBezier: function (value) {
				var match, x1, y1, x2, y2;

				// Get the values from the form:
				//   cubic-bezier(x1, y1, x2, y2)
				match = value.match(/cubic-bezier\(\s*(.*?),\s*(.*?),\s*(.*?),\s*(.*?)\)/);

				// Abort early if the input string is not valid
				if (!match) {
					return;
				}

				// Parse numbers
				x1 = !isNaN(parseFloat(match[1])) ? parseFloat(match[1]) : 0,
				y1 = !isNaN(parseFloat(match[2])) ? parseFloat(match[2]) : 0,
				x2 = !isNaN(parseFloat(match[3])) ? parseFloat(match[3]) : 1,
				y2 = !isNaN(parseFloat(match[4])) ? parseFloat(match[4]) : 1;

				return function (time) {
					return this.cubicBezier(x1, y1, x2, y2, time);
				};
			},

			stop: function (obj) {
				for (var name in obj.animationQueues) {
					obj.animationQueues[name].clear(false);
				}
			},

			finish: function (obj) {
				for (var name in obj.animationQueues) {
					obj.animationQueues[name].clear(true);
				}
			},

			delay: function (obj, duration, options) {
				var queue = obj.animationQueues[(options && options.queue) || "default"];
				if (queue) {
					queue.add({ type: "delay", duration: duration || 0 });
				}
			},

			mainTimer: {
				animations: [],
				add: function (animation) {
					this.animations.push(animation);
					if (this.animations.length === 1) {
						this.start();
					}
				},
				remove: function (animation) {
					this.animations.splice(this.animations.indexOf(animation), 1);
					if (this.animations.length === 0) {
						this.stop();
					}
				},
				start: function () {
					this.tick();
				},
				stop: function () {
					cancelAnimationFrame(this.timer);
				},
				tick: function () {
					var self = this;
					setTimeout(function () {
						self.timer = requestAnimationFrame(function () { self.tick(); });

						var animations = self.animations;
						var animation;
						for (var i = 0, l = animations.length; i < l; i++) {
							animation = animations[i];
							if (!animation.cancelled) {
								if (!module.tick(animation)) {
									module.mainTimer.remove(animation);
									i--; l--;
									animation.advanceCallback();
									animation.options.callback.call(animation.obj);
								}
							}
						}

						if (!module.core.timeline.running) {
							module.core.draw.redraw(true);
						}
					}, 1000 / module.core.settings.fps);
				}
			},

			queues: {

				create: function (obj, name) {
					if (name === undefined) {
						name = Math.round(new Date().getTime() * Math.random()).toString();
					}
					if (!obj.animationQueues[name]) {
						obj.animationQueues[name] = {
							name: name,
							list: [],
							isRunning: false,
							add: function (animation) {
								this.list.push(animation);
							},
							remove: function (animation) {
								if (animation) {
									var index = this.list.indexOf(animation);
									if (~index) {
										this.list.splice(index, 1);
									}
								} else {
									this.list.shift();
								}
							},
							run: function () {
								if (!this.isRunning && this.list.length > 0) {
									this.isRunning = true;
									var listItem = this.list[0];
									var queue = this;
									if (listItem.type === "delay") {
										setTimeout(function () {
											queue.advance();
										}, listItem.duration);
									} else {
										module.runAnimation(listItem, function () { queue.advance(); });
									}
								}
							},
							advance: function () {
								this.list.shift();
								this.isRunning = false;
								this.run();
							},
							clear: function (finish) {
								if (this.isRunning) {
									var animation = this.list[0];
									animation.cancelled = true;

									if (finish) {
										module.setEndValues(animation);
										animation.options.callback.call(animation.obj);
									}
									this.isRunning = false;
									module.mainTimer.remove(animation);
								}
								this.list.length = 0;
							}
						};
					}
					return this.get(obj, name);
				},

				get: function (obj, name) {
					return obj.animationQueues[name];
				}
			},

			// Easing functions take at least four arguments:
			// t: Current time
			// b: Start value
			// c: Change in value from start to end
			// d: Total duration of the animation
			// Some easing functions also take some optional arguments:
			// a: Amplitude
			// p: Period
			// s: Overshoot amount
			//
			// They return the new value. In oCanvas, 0 is passed in
			// as start value and 1 as change in value. This will
			// generate a factor that can be used on multiple property
			// values, and the easing function will only need to be
			// called once per frame, instead of once per property per frame.
			// The additional arguments are not passed though, which will
			// make them take the default values in those functions.
			//
			// The equations are created by Robert Penner.
			// (c) 2003 Robert Penner, all rights reserved.
			// The work is subject to the terms in http://www.robertpenner.com/easing_terms_of_use.html.
			easing: {

				// Deprecated
				"ease-in": function (time) {
					return this.cubicBezier(0.42, 0, 1, 1, time);
				},

				// Deprecated
				"ease-out": function (time) {
					return this.cubicBezier(0, 0, 0.58, 1, time);
				},

				// Deprecated
				"ease-in-out": function (time) {
					return this.cubicBezier(0.42, 0, 0.58, 1, time);
				},

				// Deprecated syntax, will adopt the t, b, c, d syntax as the rest
				"linear": function (time) {
					return time;
				},

				"ease-in-quad": function (t, b, c, d) {
					return c*(t/=d)*t + b;
				},

				"ease-out-quad": function (t, b, c, d) {
					return -c *(t/=d)*(t-2) + b;
				},

				"ease-in-out-quad": function (t, b, c, d) {
					if ((t/=d/2) < 1) return c/2*t*t + b;
					return -c/2 * ((--t)*(t-2) - 1) + b;
				},

				"ease-in-cubic": function (t, b, c, d) {
					return c*(t/=d)*t*t + b;
				},

				"ease-out-cubic": function (t, b, c, d) {
					return c*((t=t/d-1)*t*t + 1) + b;
				},

				"ease-in-out-cubic": function (t, b, c, d) {
					if ((t/=d/2) < 1) return c/2*t*t*t + b;
					return c/2*((t-=2)*t*t + 2) + b;
				},

				"ease-in-quart": function (t, b, c, d) {
					return c*(t/=d)*t*t*t + b;
				},

				"ease-out-quart": function (t, b, c, d) {
					return -c * ((t=t/d-1)*t*t*t - 1) + b;
				},

				"ease-in-out-quart": function (t, b, c, d) {
					if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
					return -c/2 * ((t-=2)*t*t*t - 2) + b;
				},

				"ease-in-quint": function (t, b, c, d) {
					return c*(t/=d)*t*t*t*t + b;
				},

				"ease-out-quint": function (t, b, c, d) {
					return c*((t=t/d-1)*t*t*t*t + 1) + b;
				},

				"ease-in-out-quint": function (t, b, c, d) {
					if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
					return c/2*((t-=2)*t*t*t*t + 2) + b;
				},

				"ease-in-sine": function (t, b, c, d) {
					return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
				},

				"ease-out-sine": function (t, b, c, d) {
					return c * Math.sin(t/d * (Math.PI/2)) + b;
				},

				"ease-in-out-sine": function (t, b, c, d) {
					return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
				},

				"ease-in-expo": function (t, b, c, d) {
					return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
				},

				"ease-out-expo": function (t, b, c, d) {
					return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
				},

				"ease-in-out-expo": function (t, b, c, d) {
					if (t==0) return b;
					if (t==d) return b+c;
					if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
					return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
				},

				"ease-in-circ": function (t, b, c, d) {
					return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
				},

				"ease-out-circ": function (t, b, c, d) {
					return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
				},

				"ease-in-out-circ": function (t, b, c, d) {
					if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
					return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
				},

				"ease-in-elastic": function (t, b, c, d, a, p) {
					a = a || 0;
					if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
					if (a < Math.abs(c)) { a=c; var s=p/4; }
					else var s = p/(2*Math.PI) * Math.asin (c/a);
					return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
				},

				"ease-out-elastic": function (t, b, c, d, a, p) {
					a = a || 0;
					if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
					if (a < Math.abs(c)) { a=c; var s=p/4; }
					else var s = p/(2*Math.PI) * Math.asin (c/a);
					return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
				},

				"ease-in-out-elastic": function (t, b, c, d, a, p) {
					a = a || 0;
					if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
					if (a < Math.abs(c)) { a=c; var s=p/4; }
					else var s = p/(2*Math.PI) * Math.asin (c/a);
					if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
					return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
				},

				"ease-in-back": function (t, b, c, d, s) {
					if (s == undefined) s = 1.70158;
					return c*(t/=d)*t*((s+1)*t - s) + b;
				},

				"ease-out-back": function (t, b, c, d, s) {
					if (s == undefined) s = 1.70158;
					return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
				},

				"ease-in-out-back": function (t, b, c, d, s) {
					if (s == undefined) s = 1.70158;
					if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
					return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
				},

				"ease-in-bounce": function (t, b, c, d) {
					return c - this["ease-out-bounce"](d-t, 0, c, d) + b;
				},

				"ease-out-bounce": function (t, b, c, d) {
					if ((t/=d) < (1/2.75)) {
						return c*(7.5625*t*t) + b;
					} else if (t < (2/2.75)) {
						return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
					} else if (t < (2.5/2.75)) {
						return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
					} else {
						return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
					}
				},

				"ease-in-out-bounce": function (t, b, c, d) {
					if (t < d/2) return this["ease-in-bounce"](t*2, 0, c, d) * .5 + b;
					return this["ease-out-bounce"](t*2-d, 0, c, d) * .5 + c*.5 + b;
				},

				// Deprecated, will be replaced by the new syntax for calling easing functions
				cubicBezier: function (x1, y1, x2, y2, time) {

					// Inspired by Don Lancaster's two articles
					// http://www.tinaja.com/glib/cubemath.pdf
					// http://www.tinaja.com/text/bezmath.html


						// Set start and end point
					var x0 = 0,
						y0 = 0,
						x3 = 1,
						y3 = 1,

						// Convert the coordinates to equation space
						A = x3 - 3*x2 + 3*x1 - x0,
						B = 3*x2 - 6*x1 + 3*x0,
						C = 3*x1 - 3*x0,
						D = x0,
						E = y3 - 3*y2 + 3*y1 - y0,
						F = 3*y2 - 6*y1 + 3*y0,
						G = 3*y1 - 3*y0,
						H = y0,

						// Variables for the loop below
						t = time,
						iterations = 5,
						i, slope, x, y;

					// Loop through a few times to get a more accurate time value, according to the Newton-Raphson method
					// http://en.wikipedia.org/wiki/Newton's_method
					for (i = 0; i < iterations; i++) {

						// The curve's x equation for the current time value
						x = A* t*t*t + B*t*t + C*t + D;

						// The slope we want is the inverse of the derivate of x
						slope = 1 / (3*A*t*t + 2*B*t + C);

						// Get the next estimated time value, which will be more accurate than the one before
						t -= (x - time) * slope;
						t = t > 1 ? 1 : (t < 0 ? 0 : t);
					}

					// Find the y value through the curve's y equation, with the now more accurate time value
					y = Math.abs(E*t*t*t + F*t*t + G*t * H);

					return y;
				}
			}

		};

		return module;
	};

	// Register the module
	oCanvas.registerModule("animation", animation);





	// Define the class
	var displayObject = function () {
	
		// Method for setting a stroke property. Updates both obj.stroke and obj.property
		var setStrokeProperty = function (_this, property, value, objectProperty, thecore) {
			var stroke = thecore.style.getStroke(_this.stroke);
			stroke[property] = value;
			_this.stroke = thecore.style.getStroke(stroke, "string");
		};
		
		// Return an object when instantiated
		return {

			// Properties
			id: 0,
			shapeType: "rectangular",
			type: "",
			origin: {
				x: 0,
				y: 0
			},
			events: {},
			children: [],
			added: false,
			opacity: 1,
			rotation: 0,
			composition: "source-over",
			scalingX: 1,
			scalingY: 1,
			pointerEvents: true,
			animationQueues: {},
			
			_: {
				x: 0,
				y: 0,
				abs_x: 0,
				abs_y: 0,
				rotation: 0,
				width: 0,
				height: 0,
				drawn: false,
				stroke: "",
				strokeColor: "",
				strokeWidth: 0,
				strokePosition: "center",
				cap: "butt",
				join: "miter",
				miterLimit: 10,
				fill: "",
				shadow: {
					offsetX: 0,
					offsetY: 0,
					blur: 0,
					color: "transparent"
				}
			},
			
			set strokeColor (color) {
				setStrokeProperty(this, "color", color, "strokeColor", this.core);
			},
			set strokeWidth (width) {
				setStrokeProperty(this, "width", width, "strokeWidth", this.core);
			},
			set strokePosition (pos) {
				setStrokeProperty(this, "pos", pos, "strokePosition", this.core);
			},
			set stroke (value) {
			
				// Convert the value to a correct string if it is not a string
				if (typeof value !== "string") {
					value = this.core.style.getStroke(value, "string");
				}
				
				// Get stroke object and set styles
				var stroke = this.core.style.getStroke(value);
				
				// Handle patterns
				if (~stroke.color.indexOf("image(")) {
					var matches = /image\((.*?)(,(\s|)(repeat|repeat-x|repeat-y|no-repeat)|)\)/.exec(stroke.color),
						path = matches[1],
						repeat = matches[4] || "repeat",
						image = new Image(),
						_this = this;
						
					image.src = path;
					this._.strokepattern_loading = true;
					this._.strokepattern_redraw = false;
					
					image.onload = function () {
						_this._.strokeColor = _this.core.canvas.createPattern(this, repeat);
						_this._.strokepattern_loading = false;
						
						if (_this._.strokepattern_redraw) {
							_this._.strokepattern_redraw = false;
							_this.redraw();
						}
					};
				} else {
					this._.strokeColor = stroke.color;
				}
				
				// Set other stroke properties
				this._.strokeWidth = stroke.width;
				this._.strokePosition = stroke.pos;
				this._.stroke = value;
			},
			set cap (value) {
				var possible_values = ["butt", "round", "square"];
				this._.cap = ~possible_values.indexOf(value) ? value : "butt";
			},
			set join (value) {
				var possible_values = ["round", "bevel", "miter"];
				this._.join = ~possible_values.indexOf(value) ? value : "miter";
			},
			set miterLimit (value) {
				this._.miterLimit = !isNaN(parseFloat(value)) ? parseFloat(value) : 10;
			},
			get stroke () {
				return this._.stroke;
			},
			get strokeColor () {
				if (this._.strokepattern_loading) {
					this._.strokepattern_redraw = true;
					return "";
				} else if (~this._.strokeColor.toString().indexOf("CanvasPattern")) {
					return this._.strokeColor;
				} else if (~this._.strokeColor.indexOf("gradient")) {
					var origin = this.getOrigin();
					if (this.shapeType === "rectangular") {
						var stroke = (this.strokePosition === "outside") ? this.strokeWidth : (this.strokePosition === "center" ? this.strokeWidth / 2 : 0);
						return this.core.style.getGradient(this._.strokeColor, this.abs_x - origin.x - stroke, this.abs_y - origin.y - stroke, this.width + stroke * 2, this.height + stroke * 2);
					} else if (this.shapeType === "radial") {
						var radius = this.radius + this.strokeWidth / 2;
						origin.x += this.radius;
						origin.y += this.radius;
						return this.core.style.getGradient(this._.strokeColor, this.abs_x - origin.x - this.radius, this.abs_y - origin.y - this.radius, radius * 2, radius * 2);
					}
				} else {
					return this._.strokeColor;
				}
			},
			get strokeWidth () {
				return this._.strokeWidth;
			},
			get strokePosition () {
				return this._.strokePosition;
			},
			get cap () {
				return this._.cap;
			},
			get join () {
				return this._.join;
			},
			get miterLimit () {
				return this._.miterLimit;
			},
			
			set fill (value) {
				if (~value.indexOf("image(")) {
					var matches = /image\((.*?)(,(\s|)(repeat|repeat-x|repeat-y|no-repeat)|)\)/.exec(value),
						path = matches[1],
						repeat = matches[4] || "repeat",
						image = new Image(),
						_this = this;
						
					image.src = path;
					this._.pattern_loading = true;
					this._.pattern_redraw = false;
					
					image.onload = function () {
						_this._.fill = _this.core.canvas.createPattern(this, repeat);
						_this._.pattern_loading = false;
						
						if (_this._.pattern_redraw) {
							_this._.pattern_redraw = false;
							_this.redraw();
						}
					};
				} else {
					this._.fill = value;
				}
			},
			get fill () {
				if (this._.pattern_loading) {
					this._.pattern_redraw = true;
					return "";
				} else if (~this._.fill.toString().indexOf("CanvasPattern")) {
					return this._.fill;
				} else if (~this._.fill.indexOf("gradient")) {
					var origin = this.getOrigin();
					if (this.shapeType === "rectangular") {
						return this.core.style.getGradient(this._.fill, this.abs_x - origin.x, this.abs_y - origin.y, this.width, this.height);
					} else if (this.shapeType === "radial") {
						return this.core.style.getGradient(this._.fill, this.abs_x - origin.x - this.radius, this.abs_y - origin.y - this.radius, this.radius * 2, this.radius * 2);
					}
				} else {
					return this._.fill;
				}
			},
			set shadow (value) {
			
				// Convert the value to a correct string if it is not a string
				if (typeof value !== "string") {
					value = this.core.style.getShadow(value, "string");
				}
				
				// Get shadow object and set styles
				var shadow = this.core.style.getShadow(value);
				this._.shadow = shadow;
			},
			set shadowOffsetX (value) {
				if (!isNaN(parseFloat(value))) {
					this._.shadow.offsetX = parseFloat(value);
				}
			},
			set shadowOffsetY (value) {
				if (!isNaN(parseFloat(value))) {
					this._.shadow.offsetY = parseFloat(value);
				}
			},
			set shadowBlur (value) {
				if (!isNaN(parseFloat(value))) {
					this._.shadow.blur = parseFloat(value);
				}
			},
			set shadowColor (value) {
				if (this.core.style.isColor(value)) {
					this._.shadow.color = value;
				}
			},
			get shadow () {
				return this._.shadow;
			},
			get shadowOffsetX () {
				return this._.shadow.offsetX;
			},
			get shadowOffsetY () {
				return this._.shadow.offsetY;
			},
			get shadowBlur () {
				return this._.shadow.blur;
			},
			get shadowColor () {
				return this._.shadow.color;
			},
			
			set x (value) {
				this._.x = value;
				this._.abs_x = value + ((this.parent !== undefined && this.parent !== this.core) ? this.parent.abs_x : 0);
				
				// Update children
				var objects = this.children,
					l = objects.length, i;
				for (i = 0; i < l; i++) {
					objects[i]._.abs_x = this.abs_x + objects[i].x;
					objects[i].x += 0;
				}
			},
			set y (value) {
				this._.y = value;
				this._.abs_y = value + ((this.parent !== undefined && this.parent !== this.core) ? this.parent.abs_y : 0);
				
				// Update children
				var objects = this.children,
					l = objects.length, i;
				for (i = 0; i < l; i++) {
					objects[i]._.abs_y = this.abs_y - objects[i].y;
					objects[i].y += 0;
				}
			},
			get x () {
				return this._.x;
			},
			get y () {
				return this._.y;
			},
			set abs_x (value) {
				return;
			},
			set abs_y (value) {
				return;
			},
			get abs_x () {
				return this._.abs_x;
			},
			get abs_y () {
				return this._.abs_y;
			},
			set width (value) {
				this._.width = value;
			},
			get width () {
				return this._.width;
			},
			set height (value) {
				this._.height = value;
			},
			get height () {
				return this._.height;
			},
			set zIndex (value) {
				if (!this.parent) {
					return;
				}

				// Get new z index based on keywords
				if (value === "front") {
					value = this.parent.children.length - 1;
				}
				if (value === "back") {
					value = 0;
				}

				// Change the z order
				this.core.draw.changeZorder(this.parent, this.zIndex, value);
			},
			get zIndex () {
				return this.parent && this.parent.children.indexOf(this);
			},
			get drawn () {
				return this.core.draw.isCleared ? false : this._.drawn;
			},
			set drawn (value) {
				this._.drawn = !!value;
			},
			
			// Method for binding an event to the object
			bind: function (types, handler) {
				this.core.events.bind(this, types.split(" "), handler);
				
				return this;
			},
			
			// Method for unbinding an event from the object
			unbind: function (types, handler) {
				this.core.events.unbind(this, types.split(" "), handler);
				
				return this;
			},
			
			// Method for triggering all events added to the object
			trigger: function (types, eventObject) {
				var events = this.core.events;
				var chain = events.getParentChain(this, true, true);
				events.triggerChain(chain, types.split(" "), events.fixEventObject(eventObject));
				
				return this;
			},
			
			// Method for adding the object to the canvas
			add: function (redraw) {
				if (!this.added) {

					// Redraw by default, but leave it to the user to decide
					redraw = redraw !== undefined ? redraw : true;
				
					// Add this object
					this.core.children.push(this);
					this.added = true;
					this.parent = this.core;

					// Add it to a global list of all objects. Deprecated list, will be removed soon.
					this.core.draw.objects.push(this);
					
					// Redraw the canvas with the new object
					if (redraw) {
						this.core.draw.redraw();
					}
				}
				
				return this;
			},
			
			// Method for removing the object from the canvas
			remove: function (redraw) {

				// Redraw by default, but leave it to the user to decide
				redraw = redraw !== undefined ? redraw : true;

				// Abort if the object is not added to a parent object
				if (!this.parent) {
					return this;
				}

				// Get the index for this object within the parent's child list
				var index = this.parent.children.indexOf(this);
				if (~index) {
					this.parent.children.splice(index, 1);
					this.parent = undefined;
					this.added = false;
					this.drawn = false;

					// Remove it from a global list of all objects. Deprecated list, will be removed soon.
					var index2 = this.core.draw.objects.indexOf(this);
					if (~index2) {
						this.core.draw.objects.splice(i, 1);
					}

					// Set draw state for children of this object
					var objects = this.children;
					for (var i = 0, l = objects.length; i < l; i++) {
						objects[i].drawn = false;
						index2 = this.core.draw.objects.indexOf(objects[i]);
						if (~index2) {
							this.core.draw.objects.splice(index2, 1);
						}
					}

					// Redraw the canvas to actually remove the object
					if (redraw) {
						this.core.draw.redraw();
					}
				}
				
				return this;
			},
			
			// Method for drawing the shape
			draw: function () {
				
			},
			
			// Method for redrawing the canvas
			redraw: function () {
				this.core.draw.redraw();
				
				return this;
			},
			
			// Method for rotating the object
			rotate: function (angle) {
				this.rotation += angle;
				
				return this;
			},
			
			// Method for rotating to a specific angle
			rotateTo: function (angle) {
				this.rotation = angle;
				
				return this;
			},
			
			// Method for getting x/y arguments, with the ability to choose only one
			// Used by other methods
			//   Examples:
			//     obj.move(50, 100); // moves object 50px to the right and 100px down
			//     obj.move(50, "x"); // moves object 50px to the right
			//     obj.move(50); // moves object 50px to the right and down
			getArgs: function (x, y, default_x, default_y) {
				default_x = default_x || 0;
				default_y = default_y || 0;
				
				// Second argument is string 
				if (typeof y === "string") {
					var type = y,
						val = x;
					x = (type === "x") ? val : default_x;
					y = (type === "y") ? val : default_y;
				}
				else if (y === undefined) {
					y = x;
				}
				
				return {
					x: x,
					y: y
				};
			},
			
			// Method for moving the object
			move: function (x, y) {
				var change = this.getArgs(x, y);
				this.x += change.x;
				this.y += change.y;
				
				return this;
			},
			
			// Method for moving to a specific position
			moveTo: function (x, y) {
				var pos = this.getArgs(x, y, this.x, this.y);
				this.x = pos.x;
				this.y = pos.y;
				
				return this;
			},
			
			// Method for scaling the object
			scale: function (x, y) {
				var scaling = this.getArgs(x, y, 1, 1);
				this.scalingX = scaling.x;
				this.scalingY = scaling.y;
				
				return this;
			},
			
			// Method for scaling to a specific size
			scaleTo: function (width, height) {
				var currentWidth = (this.shapeType === "rectangular" ? this.width : this.radius),
					currentHeight = (this.shapeType === "rectangular" ? this.height : this.radius),
					size = this.getArgs(width, height, currentWidth, currentHeight);
					
				// Don't let the size be 0, because the native scale method doesn't support zero values
				size.x = size.x <= 0 ? 1 : size.x;
				size.y = size.y <= 0 ? 1 : size.y;
				
				// Set the scaling
				this.scalingX = size.x / currentWidth;
				this.scalingX = size.y / currentHeight;
				
				return this;
			},
			
			// Method for animating any numeric property
			animate: function () {
				this.core.animation.animate(this, arguments);
				
				return this;
			},
			
			// Method for clearing the object's animation queue and stop the animations
			stop: function () {
				this.core.animation.stop(this);
				
				return this;
			},

			// Method for clearing the animation queue and setting all final values
			finish: function () {
				this.core.animation.finish(this);

				return this;
			},

			// Method for delaying the rest of the animation queue (queue arg is optional)
			delay: function (duration, options) {
				this.core.animation.delay(this, duration, options);

				return this;
			},
			
			// Method for changing the opacity property to 1 as an animation
			fadeIn: function () {
				var args = Array.prototype.slice.call(arguments);
				this.core.animation.animate(this, [{ opacity: 1 }].concat(args));
				
				return this;
			},
			
			// Method for changing the opacity property to 0 as an animation
			fadeOut: function () {
				var args = Array.prototype.slice.call(arguments);
				this.core.animation.animate(this, [{ opacity: 0 }].concat(args));
				
				return this;
			},
			
			// Method for changing the opacity property to a custom value as an animation
			fadeTo: function () {
				var args = Array.prototype.slice.call(arguments);
				this.core.animation.animate(this, [{ opacity: args.splice(0, 1)[0] }].concat(args));
				
				return this;
			},
			
			// Method for making drag and drop easier
			dragAndDrop: function (options) {
			
				options = (options === undefined) ? {} : options;
			
				// If false is passed as argument, remove all event handlers
				if (options === false && this.draggable === true) {
					this.draggable = false;
					
					this.unbind("mousedown touchstart", this._.drag_start)
					this.core.unbind("mouseup touchend", this._.drag_end);
					this.core.unbind("mousemove touchmove", this._.drag_move);
				}
				
				// Otherwise add event handlers, unless they have been added before
				else if (!this.draggable) {
				
					this.draggable = true;
					this.dragging = false;
				
					var _this = this,
						offset = { x: 0, y: 0 },
						startPos = { x: 0, y: 0 },
						start = { x: 0, y: 0 };
					
					this._.drag_start = function (e) {

						// Stop bubbling if specified
						if (options.bubble === false) {
							e.stopPropagation();
						}

						this.dragging = true;
						
						// Get the difference between pointer position and object position
						offset.x = e.x - this.x;
						offset.y = e.y - this.y;
						startPos.x = this.x;
						startPos.y = this.y;
						start = _this.core.tools.transformPointerPosition(_this, _this.abs_x, _this.abs_y, _this.rotation);

						// Change Z index if specified
						if (options.changeZindex === true) {
							this.zIndex = "front";
						}
						
						// Run user callback
						if (typeof options.start === "function") {
							options.start.call(this);
						}
						
						// Redraw the canvas if the timeline is not running
						if (!this.core.timeline.running) {
							this.core.draw.redraw();
						}
					};
					
					this._.drag_end = function (e) {
						if (_this.dragging) {

							// Stop bubbling if specified
							if (options.bubble === false) {
								e.stopPropagation();
							}

							_this.dragging = false;
							
							// Run user callback
							if (typeof options.end === "function") {
								options.end.call(_this);
							}
							
							// Redraw the canvas if the timeline is not running
							if (!_this.core.timeline.running) {
								_this.core.draw.redraw();
							}
						}
					};
					
					this._.drag_move = function (e) {
						if (_this.dragging) {

							// Stop bubbling if specified
							if (options.bubble === false) {
								e.stopPropagation();
							}
						
							var end = _this.core.tools.transformPointerPosition(_this, _this.abs_x, _this.abs_y, _this.rotation);

							_this.x = startPos.x + end.x - start.x;
							_this.y = startPos.y + end.y - start.y;
							
							// Run user callback
							if (typeof options.move === "function") {
								options.move.call(_this);
							}
							
							// Redraw the canvas if the timeline is not running
							if (!_this.core.timeline.running) {
								_this.core.draw.redraw();
							}
						}
					};
					
					// Bind event handlers
					this.bind("mousedown touchstart", this._.drag_start)
					this.core.bind("mouseup touchend", this._.drag_end);
					this.core.bind("mousemove touchmove", this._.drag_move);
				}
				
				return this;
			},
			
			// Method for setting the origin coordinates
			// Accepts pixel values or the following keywords:
			//     x: left | center | right
			//     y: top | center | bottom
			setOrigin: function (x, y) {
				this.origin.x = x;
				this.origin.y = y;
				
				return this;
			},
			
			// Method for getting the current origin coordinates in pixels
			getOrigin: function () {
				var x, y,
					origin = this.origin,
					shapeType = this.shapeType;
				
				// Get X coordinate in pixels
				if (origin.x === "center") {
					x = (shapeType === "rectangular") ? this.width / 2 : 0;
				} else if (origin.x === "right") {
					x = (shapeType === "rectangular") ? this.width : this.radius;
				} else if (origin.x === "left") {
					x = (shapeType === "rectangular") ? 0 : -this.radius;
				} else {
					x = !isNaN(parseFloat(origin.x)) ? parseFloat(origin.x) : 0;
				}
				
				// Get Y coordinate in pixels
				if (origin.y === "center") {
					y = (shapeType === "rectangular") ? this.height / 2 : 0;
				} else if (origin.y === "bottom") {
					y = (shapeType === "rectangular") ? this.height : this.radius;
				} else if (origin.y === "top") {
					y = (shapeType === "rectangular") ? 0 : -this.radius;
				} else {
					y = !isNaN(parseFloat(origin.y)) ? parseFloat(origin.y) : 0;
				}
				
				// Return pixel coordinates
				return {
					x: x,
					y: y
				};
			},
			
			// Method for adding a child to the display object
			// Children will transform accordingly when this display object transforms
			addChild: function (childObj, returnIndex) {
			
				// Check if the child object doesn't already have a parent
				if (childObj.parent === undefined) {
				
					// Add the object as a child
					var index = this.children.push(childObj) - 1;
					
					// Update child
					childObj.parent = this;
					childObj.x += 0;
					childObj.y += 0;

					// Add it to a global list of all objects. Deprecated list, will be removed soon.
					this.core.draw.objects.push(childObj);
					
					// Redraw the canvas if this object is drawn, to show the new child object
					if (this.drawn) {
						this.core.draw.redraw();
					}
					
					if (returnIndex) {
						return index;
					}
				} else if (returnIndex) {
					return false;
				}
				
				// Return the object itself if user chose to not get the index in return
				return this;
			},
			
			// Method for removing a child
			removeChild: function (childObj, redraw) {
				var index = this.children.indexOf(childObj);
				if (~index) {
					this.removeChildAt(index, redraw);
				}
				
				return this;
			},
			
			// Method for removing a child at a specific index
			removeChildAt: function (index, redraw) {
				if (this.children[index] !== undefined) {
					this.children[index].remove(redraw);
				}
				
				return this;
			},
			
			// Method for creating a clone of this object
			clone: function (settings) {
				settings = settings || {};
				settings.drawn = false;
				var originalParent = this.parent;
				var newObj = this.core.display[this.type](settings),
					this_filtered = {},
					reject = ["core", "events", "children", "parent", "img", "image", "fill", "strokeColor", "added"],
					absoluteX = ['abs_x', 'start_x', 'end_x'],
					absoluteY = ['abs_y', 'start_y', 'end_y'],
					loopObject, x, stroke, i, children, child, dX, dY, descriptor;
				
				// Filter out the setter and getter methods, and also properties listed above
				loopObject = function (obj, destination) {
					for (x in obj) {
						if (~reject.indexOf(x)) {
							continue;
						}

						// Check the descriptor to see if it has no getter method.
						// This uses the getPropertyDescriptor method (planned to arrive in ES6),
						// which is pollyfilled in oCanvas if it's not available.
						descriptor = Object.getPropertyDescriptor(obj, x);
						if (descriptor && descriptor.get === undefined) {

							// If the value is an object, we must copy each property of that object.
							// This is so that we don't get objects that are shared between two
							// display objects.
							if (typeof obj[x] === "object") {
								destination[x] = (obj[x].constructor === Array) ? [] : {};
								loopObject(obj[x], destination[x]);
								continue;
							}

							var value = obj[x];

							// If the original object has a parent, we must remove the absolute position
							// of the parent to get local positions for the new object. This is because
							// the new object will not yet have a parent, so the absolute positions can't
							// be based on a parent.
							if (originalParent) {
								if (absoluteX.indexOf(x) > -1) value -= originalParent.abs_x;
								else if (absoluteY.indexOf(x) > -1) value -= originalParent.abs_y;
							}

							destination[x] = value;
						}
					}
				}
				loopObject(this, this_filtered);
				
				// Fix gradients and patterns
				this_filtered.fill = this._.fill;
				stroke = this.core.style.getStroke(this.stroke);
				this_filtered.strokeColor = stroke.color;

				// Fix image source (ignored above since it can be set to a DOM node)
				if (this.image) {
					this_filtered.image = this.image;
				}
				
				// Extend the new object with this object's properties and then apply the custom settings
				newObj = oCanvas.extend(newObj, this_filtered, settings);
				newObj.id = ++this.core.lastObjectID;
				
				if (typeof newObj.init === "function") {
					newObj.init();
				}
				
				// Add children to the new clone
				children = this.children;
				if (children.length > 0) {
					for (i = 0; i < children.length; i++) {
						child = children[i].clone();
						newObj.children.push(child);
						child.parent = newObj;
						if (settings.x) {
							dX = Math.abs(children[i].abs_x - this.x);
							child.x = dX;
						}
						if (settings.y) {
							dY = Math.abs(children[i].abs_y - this.y);
							child.y = dY;
						}
					}
				}
				
				return newObj;
			},
			
			// Method for checking if the pointer is inside the object
			isPointerInside: function (pointer) {
				return this.core.tools.isPointerInside(this, pointer);
			}
		};
	},
	
	// Method for registering a custom display object at run time
	// It is only attached to the current core instance
	register = function (name, properties, draw, init) {
		var display = this,
			core = this.core,
			
			// The object that will be instantiated
			obj = function (settings, thecore) {
			
				// Return an object containing base properties, core access and a draw wrapper
				// The object is extended with properties set on register, and settings set on instantiation
				return oCanvas.extend({
					core: thecore,
					type: name,
					shapeType: "rectangular",
					
					// Wrapper for the draw method. This enables the callback to work internally and gives the user
					// access to the canvas context and the core
					draw: function () {
						draw.call(this, core.canvas, core);

						return this;
					}
				}, properties, settings);
			};
		
		// Add the constructor function to core.display.name
		this[name] = function (settings) {
		
			// Instantiate a new custom object with specified settings
			var retObj = oCanvas.extend(Object.create(displayObject()), new obj(settings, core));
			
			// Run initialization method if provided
			if (init !== undefined && typeof display[name][init] === "function") {
				display[name][init]();
			}
			
			// Return the new object
			return retObj;
		};
		
		return display;
	};
	
	// Register the module
	oCanvas.registerModule("displayObject", displayObject);
	
	// Second namespace where objects gets placed
	oCanvas.registerModule("display", { wrapper: true, register: register });
	
	
	
	// Add method to oCanvas to enable display objects to be added
	oCanvas.registerDisplayObject = function (name, obj, init) {
	
		// Register the object as a submodule to display
		oCanvas.registerModule("display."+name, {
		
			// Method for getting the core instance
			setCore: function (thecore) {
			
				// Method that core.display.objectname will refer to
				return function (settings) {
				
					// Create a new object that inherits from displayObject
					var retObj = oCanvas.extend(Object.create(displayObject()), new obj(settings, thecore));
					retObj.type = name;
					retObj.id = ++thecore.lastObjectID;
					thecore.animation.queues.create(retObj, "default");
					
					// Trigger an init method if specified
					if (init !== undefined) {
						retObj[init]();
					}
					
					// Return the new object
					return retObj;
				};
			}
		});
	};





	// Define the class
	var rectangle = function (settings, thecore) {
		
		// Return an object when instantiated
		return oCanvas.extend({
			core: thecore,
			
			shapeType: "rectangular",
			clipChildren: false,
			
			draw: function () {
				var canvas = this.core.canvas,
					origin = this.getOrigin(),
					x = this.abs_x - origin.x,
					y = this.abs_y - origin.y;
				
				canvas.beginPath();

				canvas.rect(x, y, this.width, this.height);
				
				// Do fill if a color is specified
				if (this.fill !== "") {
					canvas.fillStyle = this.fill;
					canvas.fill();
				}

				// Do color if stroke width is specified
				if (this.strokeWidth > 0) {
				
					// Set styles
					canvas.lineWidth = this.strokeWidth;
					canvas.strokeStyle = this.strokeColor;
					
					// Set stroke outside the box
					if (this.strokePosition === "outside") {
						canvas.strokeRect(x - this.strokeWidth / 2, y - this.strokeWidth / 2, this.width + this.strokeWidth, this.height + this.strokeWidth);
					}
					
					// Set stroke on the edge of the box (half of the stroke outside, half inside)
					else if (this.strokePosition === "center") {
						canvas.strokeRect(x, y, this.width, this.height);
					}
					
					// Set stroke on the inside of the box
					else if (this.strokePosition === "inside") {
						canvas.strokeRect(x + this.strokeWidth / 2, y + this.strokeWidth / 2, this.width - this.strokeWidth, this.height - this.strokeWidth);
					}
				}

				canvas.closePath();

				// Do clip
				if(this.clipChildren) {
					canvas.clip();
				}

				return this;
			}
			
		}, settings);
	};
	
	// Register the display object
	oCanvas.registerDisplayObject("rectangle", rectangle);
	



	// Define the class
	var image = function (settings, thecore) {
		
		// Return an object when instantiated
		return oCanvas.extend({
			core: thecore,

			_: oCanvas.extend({}, thecore.displayObject._, {
				hasBeenDrawn: false
			}),
			
			shapeType: "rectangular",
			loaded: false,
			firstDrawn: false,
			tile: false,
			tile_width: 0,
			tile_height: 0,
			tile_spacing_x: 0,
			tile_spacing_y: 0,
			clipChildren: false,
			
			// Init method for loading the image resource
			init: function () {
				var _this = this,
					source;

				// Abort initialization of the image if there is no image specified
				if (this.image === undefined) {
					return;
				}

				var isImageElement = this.image.nodeName && this.image.nodeName.toLowerCase() === "img";
				this.img = isImageElement ? this.image : new Image();
				
				// Get dimensions when the image is loaded. Also, remove the temp img from DOM
				var onload = function () {
					_this.loaded = true;
					
					// Set dimensions proportionally (if only one is specified, calculate the other)
					if (_this.width !== 0) {
						if (_this.height === 0) {
							_this.height = _this.width / (this.width / this.height);
						}
					} else {
						_this.width = this.width;
					}
					if (_this.height !== 0) {
						if (_this.width === 0) {
							_this.width = _this.height / (this.height / this.width);
						}
					} else {
						_this.height = this.height;
					}
					_this.tile_width = (_this.tile_width === 0) ? _this.width : _this.tile_width;
					_this.tile_height = (_this.tile_height === 0) ? _this.height : _this.tile_height;
					if (_this._.hasBeenDrawn) _this.core.redraw();
				};

				if (isImageElement && this.img.complete) {
					onload.call(this.img);
				} else {
					this.img.addEventListener("load", onload);

					if (!isImageElement) {
						this.img.src = this.image;
					}
				}
			},
			
			// Method that draws the image to the canvas once it's loaded
			draw: function () {
				var canvas = this.core.canvas,
					_this = this,
					origin = this.getOrigin(),
					x = this.abs_x - origin.x,
					y = this.abs_y - origin.y,
					width, height;
				
				// If the image has finished loading, go on and draw
				if (this.loaded && this.core.draw.objects[this.zIndex] !== undefined && this.img.width > 0 && this.img.height > 0) {
					
				
					width = (this.width === 0) ? this.img.width : this.width;
					height = (this.height === 0) ? this.img.height : this.height;
				
					if (this.tile) {
					
						var num_x = Math.ceil(width / this.tile_width),
							num_y = Math.ceil(height / this.tile_height),
							tile_x, tile_y;
						
						canvas.save();
						canvas.beginPath();
						
						// Create clipping path for the rectangle that the tiled images will be drawn inside
						canvas.moveTo(x, y);
						canvas.lineTo(x + width, y);
						canvas.lineTo(x + width, y + height);
						canvas.lineTo(x, y + height);
						canvas.lineTo(x, y);
						canvas.clip();
						
						// Draw all the tiled images
						for (tile_y = 0; tile_y < num_y; tile_y++) {
							for (tile_x = 0; tile_x < num_x; tile_x++) {
								canvas.drawImage(this.img, x + tile_x * (this.tile_width + this.tile_spacing_x), y + tile_y * (this.tile_height + this.tile_spacing_y), this.tile_width, this.tile_height);
							}
						}

						canvas.closePath();
						canvas.restore();

						
					} else {
				
						// Draw the image to the canvas
						canvas.drawImage(this.img, x, y, width, height);
						
					}
					
					// Do color if stroke width is specified
					if (this.strokeWidth > 0) {
						canvas.lineWidth = this.strokeWidth;
						canvas.strokeStyle = this.strokeColor;
						canvas.strokeRect(x, y, width, height);
					}
					
					// Clear the timer if this is the first time it is drawn
					if (this.firstDrawn === false) {
						this.firstDrawn = true;
						clearTimeout(this.loadtimer);
					}
				}
				
				// If the image hasn't finished loading, set a timer and try again
				else {
					clearTimeout(this.loadtimer);
					this.loadtimer = setTimeout(function () {
						_this.draw();
					}, 100);
				}

				// Do clip
				if(this.clipChildren) {

					// draw the clip region (the square area around the image)
					canvas.beginPath();
					canvas.rect(x, y, width, height);
					canvas.closePath();

					canvas.clip();

				}

				this._.hasBeenDrawn = true;

				return this;
			}
			
		}, settings);
	};
	
	// Register the display object
	oCanvas.registerDisplayObject("image", image, "init");
	




	var loadedFonts = [];

	// Define the class
	var text = function (settings, thecore) {
	
		// Method for setting a font property. Updates both obj.font and obj.property
		var setFontProperty = function (_this, property, value, objectProperty, thecore) {
			var font = thecore.style.getFont(_this.font);
			font[property] = value;
			_this._.font = thecore.style.getFont(font, "string");
			if (objectProperty === "lineHeight") {
				_this._.lineHeight = isNaN(parseInt(value, 10)) ? 1 : parseInt(value, 10);
				_this._.lineHeightUnit = typeof value === "string" ? (value.indexOf("px") > -1 ? "px" : "relative") : "relative";
			} else {
				_this._[objectProperty] = value;
			}
		};
		
		// Return an object when instantiated
		return oCanvas.extend({
			core: thecore,
			
			shapeType: "rectangular",
			
			// Default properties
			align: "start",
			baseline: "top",
			_: oCanvas.extend({}, thecore.displayObject._, {
				hasBeenDrawn: false,
				font: "normal normal normal 16px/1 sans-serif",
				style: "normal",
				variant: "normal",
				weight: "normal",
				size: 16,
				lineHeight: 1,
				family: "sans-serif",
				text: "",
				width: 0,
				height: 0,
				lines: []
			}),
			
			// Setters for font properties
			set font (value) {
			
				// Convert the value to a correct string if it is not a string
				if (typeof value !== "string") {
					value = this.core.style.getFont(value, "string");
				}
				
				// Get font object and set styles
				var font = this.core.style.getFont(value);
				value = this.core.style.getFont(font, "string");
				this._.style = font.style;
				this._.variant = font.variant;
				this._.weight = font.weight;
				this._.size = font.size;
				this._.lineHeight = font.lineHeight;
				this._.lineHeightUnit = font.lineHeightUnit;
				this._.family = font.family;
				this._.font = value;
				
				this.initWebFont();
				this.setDimensions();
			},
			set style (style) {
				setFontProperty(this, "style", style, "style", this.core);
				this.initWebFont();
				this.setDimensions();
			},
			set variant (variant) {
				setFontProperty(this, "variant", variant, "variant", this.core);
				this.initWebFont();
				this.setDimensions();
			},
			set weight (weight) {
				setFontProperty(this, "weight", weight, "weight", this.core);
				this.initWebFont();
				this.setDimensions();
			},
			set size (size) {
				setFontProperty(this, "size", size, "size", this.core);
				this.setDimensions();
			},
			set lineHeight (lineHeight) {
				setFontProperty(this, "lineHeight", lineHeight, "lineHeight", this.core);
				this.setDimensions();
			},
			set family (family) {
				setFontProperty(this, "family", family, "family", this.core);
				this.initWebFont();
				this.setDimensions();
			},
			set text (text) {
				this._.text = text;
				this.setDimensions();
			},
			set width (value) {
				return;
			},
			set height (value) {
				return;
			},
			
			// Getters for font properties
			get font () {
				return this._.font;
			},
			get style () {
				return this._.style;
			},
			get variant () {
				return this._.variant;
			},
			get weight () {
				return this._.weight;
			},
			get size () {
				return this._.size;
			},
			get lineHeight () {
				return this._.lineHeight + (this._.lineHeightUnit === "px" ? "px" : 0);
			},
			get family () {
				return this._.family;
			},
			get text () {
				return this._.text;
			},
			get width () {
				return this._.width;
			},
			get height () {
				return this._.height;
			},
			
			// Method for initializing the text and get dimensions
			init: function () {
				this._.initialized = true;
				this.initWebFont();
				this.setDimensions();
			},
			
			// Method for setting width/height when something has changed
			setDimensions: function () {
				if (this._.initialized) {
					var canvas, textLines, numLines, lineHeight, width, height, i, metrics, lines;

					canvas = this.core.canvas;
					
					// Set the text settings
					canvas.fillStyle = this.fill;
					canvas.font = this.font;
					textLines = this.text.toString().split("\n");
					numLines = textLines.length;
					width = 0;
					height = 0;
					lines = [];
					
					// Get the dimensions of all lines
					for (i = 0; i < numLines; i++) {
						metrics = canvas.measureText(textLines[i]);
						width = (metrics.width > width) ? metrics.width : width;
						if (this._.lineHeightUnit === "px") {
							lineHeight = this._.lineHeight;
						} else {
							lineHeight = this.size * this._.lineHeight;
						}
						height += lineHeight;
						lines.push({
							text: textLines[i],
							width: metrics.width,
							height: lineHeight
						});
					}

					// Set the dimensions
					this._.width = width;
					this._.height = height;
					this._.lines = lines;
				}
			},

			// Method for initializing a web font.
			// Sometimes the font needs to be used once first to trigger it, before using it for the real text
			initWebFont: function () {
				var font = this.style + " " + this.variant + " " + this.weight + " 0px " + this.family;

				if (loadedFonts.indexOf(font) > -1) return;
				loadedFonts.push(font);

				var self = this;
				var core = this.core,
					dummy;
				
				// Create a dummy element and set the current font
				dummy = document.createElement("span");
				dummy.style.font = font;

				// Append it to the DOM. This will trigger the web font to be used and available to the canvas
				document.body.appendChild(dummy);

				// Remove it after a second to not litter the DOM
				// Also redraw the canvas so text that didn't show before now appears
				setTimeout(function () {
					document.body.removeChild(dummy);
					if (self._.hasBeenDrawn) core.redraw();
				}, 1000);
			},

			getAlignOffset: function () {
				var aligns = {
					"start":  this.core.canvasElement.dir === "rtl" ? - this.width : 0,
					"end":    this.core.canvasElement.dir === "rtl" ? 0 : - this.width,
					"left":   0,
					"center": - this.width / 2,
					"right":  - this.width
				};

				return aligns[this.align] || 0;
			},
			
			getBaselineOffset: function () {
				var baselines = {
					"top":         this.size *  0.82,
					"hanging":     this.size *  0.65,
					"middle":      this.size *  0.31,
					"alphabetic":  0,
					"ideographic": this.size * -0.05,
					"bottom":      this.size * -0.22
				};

				return baselines[this.baseline] || 0;
			},
			
			// Method for drawing the object to the canvas
			draw: function () {
				var canvas, lines, alignOffset, baselineOffset, relativeLineHeight, lineHeightOffset, origin, x, y, i, numLines;

				canvas = this.core.canvas;
				lines = this._.lines;

				alignOffset = this.getAlignOffset();
				baselineOffset = this.getBaselineOffset();
				relativeLineHeight = this._.lineHeightUnit === "px" ? this._.lineHeight / this.size : this._.lineHeight;
				lineHeightOffset = (this.baseline !== "top") ? (this.size * (relativeLineHeight - 1)) / 2 : 0;

				origin = this.getOrigin();
				x = this.abs_x - origin.x - alignOffset;
				y = this.abs_y - origin.y + baselineOffset - lineHeightOffset;
				
				canvas.beginPath();
				
				canvas.font = this.font;
				canvas.textAlign = this.align;
				canvas.textBaseline = "alphabetic";
				
				// Draw the text as a stroke if a stroke is specified
				if (this.strokeWidth > 0) {
					canvas.lineWidth = this.strokeWidth;
					canvas.strokeStyle = this.strokeColor;

					// Draw the text with support for multiple lines
					for (i = 0, numLines = lines.length; i < numLines; i++) {
						canvas.strokeText(lines[i].text, x, y + (i * lines[i].height) + (lines[i].height - this.size) / 2);
					}
				}
				
				// Draw the text normally if a fill color is specified
				if (this.fill !== "") {
					canvas.fillStyle = this.fill;
					
					// Draw the text with support for multiple lines
					for (i = 0, numLines = lines.length; i < numLines; i++) {
						canvas.fillText(lines[i].text, x, y + (i * lines[i].height) + (lines[i].height - this.size) / 2);
					}
				}
				
				canvas.closePath();

				this._.hasBeenDrawn = true;
				
				return this;
			}
			
		}, settings);
	};
	
	// Register the display object
	oCanvas.registerDisplayObject("text", text, "init");
	




	// Define the class
	var arc = function (settings, thecore) {
		
		// Return an object when instantiated
		return oCanvas.extend({
			core: thecore,
			
			shapeType: "radial",
			radius: 0,
			start: 0,
			end: 0,
			direction: "clockwise",
			pieSection: false,
			clipChildren: false,
			
			draw: function () {
				var canvas = this.core.canvas,
					origin = this.getOrigin(),
					x = this.abs_x - origin.x,
					y = this.abs_y - origin.y;

				// beginPath and closePath must be outside if statement because the clipChildren feature (a radius of 0 must hide all children)
				canvas.beginPath();
				
				// Don't draw if the radius is 0 or less (won't be visible anyway)
				if (this.radius > 0 && this.start !== this.end) {
				
					// Draw the arc
					if (this.pieSection) {
						canvas.moveTo(x, y);
					}
					canvas.arc(x, y, this.radius, this.start * Math.PI / 180, this.end * Math.PI / 180, (this.direction === "anticlockwise"));
					
					// Do fill
					if (this.fill !== "") {
						canvas.fillStyle = this.fill;
						canvas.fill();
					}
					
					// Do stroke
					if (this.strokeWidth > 0) {
						canvas.lineWidth = this.strokeWidth;
						canvas.strokeStyle = this.strokeColor;
						canvas.stroke();
					}
					
				}
					
				canvas.closePath();

				// Do clip
				if(this.clipChildren) {
					canvas.clip();
				}
				
				return this;
			}
			
		}, settings);
	};
	
	// Register the display object
	oCanvas.registerDisplayObject("arc", arc);
	




	// Define the class
	var ellipse = function (settings, thecore) {
		
		// Return an object when instantiated
		return oCanvas.extend({
			core: thecore,
			
			shapeType: "radial",
			clipChildren: false,
			
			_: oCanvas.extend({}, thecore.displayObject._, {
				radius_x: 0,
				radius_y: 0
			}),
			
			set radius (value) {
				this._.radius_x = value;
				this._.radius_y = value;
			},
			
			set radius_x (value) {
				this._.radius_x = value;
			},
			
			set radius_y (value) {
				this._.radius_y = value;
			},
			
			get radius () {
				return this._.radius_x;
			},
			
			get radius_x () {
				return this._.radius_x;
			},
			
			get radius_y () {
				return this._.radius_y;
			},
			
			draw: function () {
				var canvas = this.core.canvas,
					origin = this.getOrigin(),
					x = this.abs_x - origin.x,
					y = this.abs_y - origin.y;
				
				canvas.beginPath();
				
				// Draw a perfect circle with the arc method if both radii are the same
				if (this.radius_x === this.radius_y) {
					canvas.arc(x, y, this.radius_x, 0, Math.PI * 2, false);
				}
				
				// Draw an ellipse if the radii are not the same
				else {
					
					// Calculate values for the ellipse
					var EllipseToBezierConstant = 0.276142374915397,
						o = {x: this.radius_x * 2 * EllipseToBezierConstant, y: this.radius_y * 2 * EllipseToBezierConstant};
					
					// Draw the curves that will form the ellipse
					canvas.moveTo(x - this.radius_x, y);
					canvas.bezierCurveTo(x - this.radius_x, y - o.y, x - o.x, y - this.radius_y, x, y - this.radius_y);
					canvas.bezierCurveTo(x + o.x, y - this.radius_y, x + this.radius_x, y - o.y, x + this.radius_x, y);
					canvas.bezierCurveTo(x + this.radius_x, y + o.y, x + o.x, y + this.radius_y, x, y + this.radius_y);
					canvas.bezierCurveTo(x - o.x, y + this.radius_y, x - this.radius_x, y + o.y, x - this.radius_x, y);
				}
				
				// Do fill
				if (this.fill !== "") {
					canvas.fillStyle = this.fill;
					canvas.fill();
				}
				
				// Do stroke
				if (this.strokeWidth > 0) {
					canvas.lineWidth = this.strokeWidth;
					canvas.strokeStyle = this.strokeColor;
					canvas.stroke();
				}
				
				canvas.closePath();

				// Do clip
				if(this.clipChildren) {
					canvas.clip();
				}
				
				return this;
			}
			
		}, settings);
	};
	
	// Register the display object
	oCanvas.registerDisplayObject("ellipse", ellipse);
	



	// Define the class
	var polygon = function (settings, thecore) {
		
		// Return an object when instantiated
		return oCanvas.extend({
			core: thecore,
			
			shapeType: "radial",
			sides: 3,
			clipChildren: false,
			
			_: oCanvas.extend({}, thecore.displayObject._, {
				radius: 0,
				side: 0
			}),
			
			set radius (value) {
				this._.radius = value;
				this._.side = 2 * this._.radius * Math.sin(Math.PI / this.sides);
			},
			
			set side (value) {
				this._.side = value;
				this._.radius = (this._.side / 2) / Math.sin(Math.PI / this.sides);
			},
			
			get radius () {
				return this._.radius;
			},
			
			get side () {
				return this._.side;
			},
			
			draw: function () {
				var canvas = this.core.canvas,
					origin = this.getOrigin(),
					x = this.abs_x - origin.x,
					y = this.abs_y - origin.y,
					firstPoint = { x: 0, y: 0 },
					sides = this.sides,
					radius = this.radius,
					xPos, yPos, i;
				
				canvas.beginPath();
				
				for (i = 0; i <= sides; i++) {
					xPos = x + radius * Math.cos(i * 2 * Math.PI / sides);
					yPos = y + radius * Math.sin(i * 2 * Math.PI / sides);
					
					if (i === 0) {
						canvas.moveTo(xPos, yPos);
						firstPoint = { x: xPos, y: yPos };
					} else
					if (i == sides) {
						canvas.lineTo(firstPoint.x, firstPoint.y);
					} else {
						canvas.lineTo(xPos, yPos);
					}
				}
				
				canvas.closePath();
				
				if (this.fill !== "") {
					canvas.fillStyle = this.fill;
					canvas.fill();
				}
				
				
				if (this.strokeWidth > 0) {
					canvas.lineWidth = this.strokeWidth;
					canvas.strokeStyle = this.strokeColor;
					canvas.stroke();
				}

				// Do clip
				if(this.clipChildren) {
					canvas.clip();
				}
				
				return this;
			}
			
		}, settings);
	};
	
	// Register the display object
	oCanvas.registerDisplayObject("polygon", polygon);
	



	// Define the class
	var line = function (settings, thecore) {
		
		// Return an object when instantiated
		return oCanvas.extend({
			core: thecore,
			
			shapeType: "radial",
			
			// Properties
			_: oCanvas.extend({}, thecore.displayObject._, {
				start_x: 0,
				start_y: 0,
				end_x: 0,
				end_y: 0,
				x: 0,
				y: 0,
				abs_x: 0,
				abs_y: 0
			}),
			children: [],
			
			// Getters and setters
			set start (values) {
				this._.start_x = values.x + (this.parent && !this.parent.isCore ? this.parent._.abs_x : 0);
				this._.start_y = values.y + (this.parent && !this.parent.isCore ? this.parent._.abs_y : 0);
				this.setPosition();
			},
			set end (values) {
				this._.end_x = values.x + (this.parent && !this.parent.isCore ? this.parent._.abs_x : 0);
				this._.end_y = values.y + (this.parent && !this.parent.isCore ? this.parent._.abs_y : 0);
				this.setPosition();
			},
			get start () {
				var offset = { x: 0, y: 0 };
				if (this.parent && !this.parent.isCore) {
					offset.x = this.parent._.abs_x;
					offset.y = this.parent._.abs_y;
				}
				var self = this;
				return {
					get x () { return self._.start_x - offset.x; },
					get y () { return self._.start_y - offset.y; },
					set x (value) {
						self._.start_x = value + (self.parent && !self.parent.isCore ? self.parent._.abs_x : 0);
						self.setPosition();
					},
					set y (value) {
						self._.start_y = value + (self.parent && !self.parent.isCore ? self.parent._.abs_y : 0);
						self.setPosition();
					}
				};
			},
			get end () {
				var offset = { x: 0, y: 0 };
				if (this.parent && !this.parent.isCore) {
					offset.x = this.parent._.abs_x;
					offset.y = this.parent._.abs_y;
				}
				var self = this;
				return {
					get x () { return self._.end_x - offset.x; },
					get y () { return self._.end_y - offset.y; },
					set x (value) {
						self._.end_x = value + (self.parent && !self.parent.isCore ? self.parent._.abs_x : 0);
						self.setPosition();
					},
					set y (value) {
						self._.end_y = value + (self.parent && !self.parent.isCore ? self.parent._.abs_y : 0);
						self.setPosition();
					}
				};
			},
			
			// Overwrite the setters that displayObject provides, to enable start/end coordinates to affect the position
			set x (value) {
				var diff, offsetX, objects, l, i;

				// Get delta length
				diff = this._.end_x - this._.start_x;

				// Get parent offset
				offsetX = this.parent && !this.parent.isCore ? this.parent._.abs_x : 0;
				
				// Assign new x positions for the object
				this._.x = value;
				this._.abs_x = value + offsetX;
				
				// Assign new x positions for start and end points
				this._.start_x = value - (diff / 2) + offsetX;
				this._.end_x = value + (diff / 2) + offsetX;
				
				// Update children
				objects = this.children;
				l = objects.length;
				for (i = 0; i < l; i++) {
					objects[i]._.abs_x = this.abs_x + objects[i].x;
					objects[i].x += 0;
				}
			},
			set y (value) {
				var diff, offsetY, objects, l, i;

				// Get delta length
				diff = this._.end_y - this._.start_y,
				
				// Get parent offset
				offsetY = this.parent && !this.parent.isCore ? this.parent._.abs_y : 0;
				
				// Assign new y positions for the object
				this._.y = value;
				this._.abs_y = value + offsetY;
				
				// Assign new y positions for start and end points
				this._.start_y = value - (diff / 2) + offsetY;
				this._.end_y = value + (diff / 2) + offsetY;
				
				// Update children
				objects = this.children;
				l = objects.length;
				for (i = 0; i < l; i++) {
					objects[i]._.abs_y = this.abs_y - objects[i].y;
					objects[i].y += 0;
				}
			},
			get x () {
				return this._.x;
			},
			get y () {
				return this._.y;
			},
			
			set length (value) {
				var dX, dY, length, angle;
				
				// Find current length and angle
				dX = Math.abs(this._.end_x - this._.start_x);
				dY = Math.abs(this._.end_y - this._.start_y);
				length = Math.sqrt(dX * dX + dY * dY);
				angle = Math.asin(dX / length);
				
				// Calculate new values
				dX = Math.sin(angle) * value;
				dY = Math.cos(angle) * value;
				this._.end_x = this._.start_x + dX;
				this._.end_y = this._.start_y + dY;
				this.x += 0;
				this.y += 0;

				this.setPosition();
			},
			get length () {
				var dX, dY, length;
				
				dX = Math.abs(this._.end_x - this._.start_x);
				dY = Math.abs(this._.end_y - this._.start_y);
				length = Math.sqrt(dX * dX + dY * dY);
				
				return length;
			},
			
			set radius (value) {
				this.length = value * 2;
			},
			get radius () {
				return this.length / 2;
			},
			
			// Method for setting x/y coordinates (which will set abs_x/abs_y as specified by displayObject)
			setPosition: function () {
				var offset = { x: 0, y: 0 };
				if (this.parent && !this.parent.isCore) {
					offset.x = this.parent._.abs_x;
					offset.y = this.parent._.abs_y;
				}
				this.x = this._.start_x - offset.x + (this._.end_x - this._.start_x) / 2;
				this.y = this._.start_y - offset.y + (this._.end_y - this._.start_y) / 2;
			},
			
			// Method for initializing the dimensions
			init: function () {
				this.initialized = true;
				this.setPosition();
			},
			
			draw: function () {
				var canvas = this.core.canvas,
					origin = this.getOrigin(),
					translation = this.core.draw.translation;
				
				
				canvas.lineWidth = this.strokeWidth;
				canvas.strokeStyle = this.strokeColor;
				canvas.beginPath();
				canvas.moveTo(this._.start_x - translation.x - origin.x, this._.start_y - translation.y - origin.y);
				canvas.lineTo(this._.end_x - translation.x - origin.x, this._.end_y - translation.y - origin.y);
				canvas.stroke();
				canvas.closePath();
				
				return this;
			}
			
		}, settings);
	};
	
	// Register the display object
	oCanvas.registerDisplayObject("line", line, "init");
	




	// Define the class
	var sprite = function (settings, thecore) {
		
		// Return an object when instantiated
		return oCanvas.extend({
			core: thecore,
			
			// Set properties
			shapeType: "rectangular",
			loaded: false,
			firstDrawn: false,
			frames: [],
			duration: 0,
			frame: 1,
			generate: false,
			numFrames: 0,
			offset_x: 0,
			offset_y: 0,
			direction: "x",
			running: false,
			active: false,
			loop: true,
			clipChildren: false,
			
			_: oCanvas.extend({}, thecore.displayObject._, {
				autostart: false,
				hasBeenDrawn: false
			}),
			
			set autostart (value) {
				this.active = value;
				this._.autostart = value;
			},
			
			get autostart () {
				return this._.autostart;
			},
			
			// Init method for loading the image resource
			init: function () {
				if (this.image === undefined) {
					return;
				}
				var _this = this;

				var isImageElement = this.image.nodeName && this.image.nodeName.toLowerCase() === "img";
				this.img = isImageElement ? this.image : new Image();
				
				// Get dimensions when the image is loaded. Also, remove the temp img from DOM
				var onload = function () {
				
					// Set the full source image dimensions
					_this.full_width = this.width;
					_this.full_height = this.height;

					// If automatic generation is specified
					if (_this.generate) {
						var dir, length_full, length_cropped, num_frames, i;
					
						// Get frame data
						dir = _this.direction;
						length_full = (dir === "y") ? _this.full_height : _this.full_width;
						length_cropped = (dir === "y") ? _this.height : _this.width;

						if (_this.numFrames > 0) {
							num_frames = _this.numFrames;
						} else {
							num_frames = length_full / length_cropped;
							_this.numFrames = num_frames;
						}
						
						// Create frames based on the specified width, height, direction, offset and duration
						_this.frames = [];
						for (i = 0; i < num_frames; i++) {
							_this.frames.push({
								x: _this.offset_x + (i * (dir === "x" ? _this.width : 0)),
								y: _this.offset_y + (i * (dir === "y" ? _this.height : 0)),
								d: _this.duration
							});
						}
					}
					_this.loaded = true;
					if (_this._.hasBeenDrawn) _this.core.redraw();
				};

				if (isImageElement && this.img.complete) {
					onload.call(this.img);
				} else {
					this.img.addEventListener("load", onload);

					if (!isImageElement) {
						this.img.src = this.image;
					}
				}
			},
			
			draw: function () {
				var _this = this,
					canvas = this.core.canvas,
					origin = this.getOrigin(),
					x = this.abs_x - origin.x,
					y = this.abs_y - origin.y,
					frame;

				// If the image has not been loaded or the sprite has no frames, the frame size must be 0 (for clipChildren feature).
				var frame_width=0, frame_height=0;
				
				// If the image has finished loading, go on and draw
				if (this.loaded) {
				
					// Draw current frame
					if (this.frames.length > 0) {
					
						// Get current frame
						if (this.frame > this.frames.length) {

							// Do clip with an empty path
							if(this.clipChildren) {
								canvas.beginPath();
								canvas.rect(x, y, 0, 0);
								canvas.closePath();
								canvas.clip();
							}

							return this;

						}

						frame = this.frames[this.frame - 1];
						frame_width = (frame.w !== undefined) ? frame.w : this.width;
						frame_height = (frame.h !== undefined) ? frame.h : this.height;
						
						// Draw the current sprite part
						canvas.drawImage(this.img, frame.x, frame.y, frame_width, frame_height, x, y, frame_width, frame_height);
						
						// Do stroke if stroke width is specified
						if (this.strokeWidth > 0) {
							canvas.lineWidth = this.strokeWidth;
							canvas.strokeStyle = this.strokeColor;
							canvas.strokeRect(x, y, frame_width, frame_height);
						}
						
						// Set a redraw timer at the current frame duration if a timer is not already running
						if (this.running === false && this.active) {
						
							setTimeout(function () {
							
								// Increment the frame number only after the frame duration has passed
								if (_this.loop) {
									_this.frame = (_this.frame === _this.frames.length) ? 1 : _this.frame + 1;
								} else {
									_this.frame = (_this.frame === _this.frames.length) ? _this.frame : _this.frame + 1;
								}
								
								// Set timer status
								_this.running = false;
								
								// Redraw canvas if the timeline is not running
								if (!_this.core.timeline.running) {
									_this.core.draw.redraw();
								}
								
							}, frame.d);
							
							// Set timer status
							this.running = true;
						}
					}
					
					// Clear the timer if this is the first time it is drawn
					if (this.firstDrawn === false) {
						this.firstDrawn = true;
						clearTimeout(this.loadtimer);
					}
				}
				
				// If the image hasn't finished loading, set a timer and try again
				else {
					clearTimeout(this.loadtimer);
					this.loadtimer = setTimeout(function () {
						_this.draw();
					}, 100);
				}

				// Do clip
				if(this.clipChildren) {

					// draw the clip region (the square area representing the current frame)
					canvas.beginPath();
					canvas.rect(x, y, frame_width, frame_height);
					canvas.closePath();

					canvas.clip();

				}

				this._.hasBeenDrawn = true;
				
				return this;
			},
			
			start: function () {
				this.startAnimation();

				return this;
			},

			startAnimation: function () {
				this.active = true;
				this.core.redraw();
				
				return this;
			},
			
			stopAnimation: function () {
				this.active = false;
				
				return this;
			},
			
		}, settings);
	};
	
	// Register the display object
	oCanvas.registerDisplayObject("sprite", sprite, "init");
	


})(window, document);
/*
 * Xccessors Standard: Cross-browser ECMAScript 5 accessors
 * http://purl.eligrey.com/github/Xccessors
 * 
 * 2010-06-21
 * By Eli Grey, http://eligrey.com
 * 
 * A shim that partially implements Object.defineProperty,
 * Object.getOwnPropertyDescriptor, and Object.defineProperties in browsers that have
 * legacy __(define|lookup)[GS]etter__ support.
 * 
 * Licensed under the X11/MIT License
 * Copyright © 2010 Elijah Grey, who also goes by Eli Grey.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in the
 * Software without restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so, subject to the
 * following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies
 * or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
 * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
(function () {
	"use strict";
	var ObjectProto = Object.prototype,
	defineGetter = ObjectProto.__defineGetter__,
	defineSetter = ObjectProto.__defineSetter__,
	lookupGetter = ObjectProto.__lookupGetter__,
	lookupSetter = ObjectProto.__lookupSetter__,
	hasOwnProp = ObjectProto.hasOwnProperty;
	
	if (defineGetter && defineSetter && lookupGetter && lookupSetter) {

		if (!Object.defineProperty) {
			Object.defineProperty = function (obj, prop, descriptor) {
				if (arguments.length < 3) { // all arguments required
					throw new TypeError("Arguments not optional");
				}
				
				prop += ""; // convert prop to string

				if (hasOwnProp.call(descriptor, "value")) {
					if (!lookupGetter.call(obj, prop) && !lookupSetter.call(obj, prop)) {
						// data property defined and no pre-existing accessors
						obj[prop] = descriptor.value;
					}

					if ((hasOwnProp.call(descriptor, "get") ||
					     hasOwnProp.call(descriptor, "set"))) 
					{
						// descriptor has a value prop but accessor already exists
						throw new TypeError("Cannot specify an accessor and a value");
					}
				}
				
				if (descriptor.get) {
					defineGetter.call(obj, prop, descriptor.get);
				}
				if (descriptor.set) {
					defineSetter.call(obj, prop, descriptor.set);
				}
			
				return obj;
			};
		}

		if (!Object.getOwnPropertyDescriptor) {
			Object.getOwnPropertyDescriptor = function (obj, prop) {
				if (arguments.length < 2) { // all arguments required
					throw new TypeError("Arguments not optional.");
				}
				
				prop += ""; // convert prop to string

				var descriptor = {
					configurable: true,
					enumerable  : true,
					writable    : true
				},
				getter = lookupGetter.call(obj, prop),
				setter = lookupSetter.call(obj, prop);

				if (!hasOwnProp.call(obj, prop)) {
					// property doesn't exist or is inherited
					return descriptor;
				}
				if (!getter && !setter) { // not an accessor so return prop
					descriptor.value = obj[prop];
					return descriptor;
				}

				// there is an accessor, remove descriptor.writable;
				// populate descriptor.get and descriptor.set (IE's behavior)
				delete descriptor.writable;
				descriptor.get = descriptor.set = undefined;
				
				if (getter) {
					descriptor.get = getter;
				}
				if (setter) {
					descriptor.set = setter;
				}
				
				return descriptor;
			};
		}

		if (!Object.defineProperties) {
			Object.defineProperties = function (obj, props) {
				for (var prop in props) {
					if (hasOwnProp.call(props, prop)) {
						Object.defineProperty(obj, prop, props[prop]);
					}
				}
			};
		}

	}
}());