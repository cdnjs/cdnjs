/**
	joLog
	=====
	
	Wrapper for `console.log()` (or whatever device-specific logging you have). Also could
	be extended to send log information to a RESTful service as well, handy for devices
	which don't have decent logging abilities.
	
	Use
	---
	
	It's an all-in-one utility that's smart enough to ferret out whatever you throw at it
	and display it in the console.
	
		joLog("x=", x, "listdata=", listdata);
	
	Basically, fill it up with strings, variables, objects, arrays and the function will
	produce a string version of each argument (where appropriate; browser debuggers tend to
	display objects nicely) in the same console line. Simple, effective, easy to use.

*/

joLog = function() {
	var strings = [];
	
	for (var i = 0; i < arguments.length; i++) {
		// TODO: stringify for objects and arrays
		strings.push(arguments[i]);
	}
	
	// spit out our line
	console.log(strings.join(" "));
}
/**
	- - -

	jo
	==

	Singleton which the framework uses to store global infomation. It also is
	responsible for initializing the rest of the framework, detecting your environment,
	and notifying your application when jo is ready to use.
	
	Methods
	-------
	
	- `load()`
	
	  This method should be called after your DOM is loaded and before your app uses
	  jo. Typically, you can call this function from your document's `onLoad` method,
	  but it is recommended you use more device-specific "ready" notification if
	  they are available.
	
	- `getPlatform()`
	
	  Returns the platform you're running in as a string. Usually this is not needed,
	  but can be useful.
	
	- `getVersion()`
	
	  Returns the version of jo you loaded in the form of a string (e.g. `0.1.1`).
	
	- `matchPlatform(string)`
	  
	  Feed in a string list of desired platforms (e.g. `"mozilla chrome ipad"`),
	  and returns true if the identified platform is in the test list.

	Events
	------
	
	- `loadEvent`
	- `unloadEvent`
	
	  These events are fired after jo loads or unloads, and can be used in your
	  application to perform initialization or cleanup tasks.

	Function
	========
	
	jo extends the Function object to add a few goodies which augment JavaScript
	in a farily non-intrusive way.
	
	Methods
	-------
	
	- `extend(superclass, prototype)`
	
	  Gives you an easy way to extend a class using JavaScript's natural prototypal
	  inheritance. See Class Patterns for more information.
	
	- `bind(context)`

	  Returns a private function wrapper which automagically resolves context
	  for `this` when your method is called.
	
	HTMLElement
	===========
	
	This is a standard DOM element for JavaScript. Most of the jo views, continers
	and controls deal with these so your application doesn't need to.

	Methods
	-------
	
	Not a complete list by any means, but the useful ones for our
	purposes are:
	
	- `appendChild(node)`
	- `insertChild(before, node)`
	- `removeChild(node)`
	
	Properties
	----------
	
	jo uses these properties quite a bit:
	
	- `innerHTML`
	- `className`
	- `style`

*/

// syntactic sugar to make it easier to extend a class
Function.prototype.extend = function(superclass, proto) {
	// create our new subclass
	this.prototype = new superclass();

	// optional subclass methods and properties
	if (proto) {
		for (var i in proto)
			this.prototype[i] = proto[i];
	}
};

// add bind() method if we don't have it already
if (typeof Function.prototype.bind === 'undefined') {
	Function.prototype.bind = function(context) {
		var self = this;

		function callbind() {
			return self.apply(context, arguments);
		}

		return callbind;
	};
}

// hacky kludge for hacky browsers
if (typeof HTMLElement === 'undefined')
	HTMLElement = Object;

// no console.log? sad...
if (typeof console === 'undefined' || typeof console.log !== 'function')
	console = {log: function(msg) { }};

// just a place to hang our hat
jo = {
	platform: "webkit",
	version: "0.4.1",
	
	useragent: [
		'ipad',
		'iphone',
		'webos',
		'bada',
		'android',
		'opera',
		'chrome',
		'safari',
		'mozilla',
		'gecko',
		'explorer'
	],
	
	debug: false,
	setDebug: function(state) {
		this.debug = state;
	},
	
	flag: {
		stopback: false
	},
	
	load: function(call, context) {
		joDOM.enable();
		
		this.loadEvent = new joSubject(this);
		this.unloadEvent = new joSubject(this);

		// capture these events, prevent default for applications
		document.body.onMouseDown = function(e) { e.preventDefault(); };
		document.body.onDragStart = function(e) { e.preventDefault(); };

		// quick test to see which environment we're in
		if (typeof navigator == 'object' && navigator.userAgent) {
			var agent = navigator.userAgent.toLowerCase();
			for (var i = 0; i < this.useragent.length; i++) {
				if (agent.indexOf(this.useragent[i]) >= 0) {
					this.platform = this.useragent[i];
					break;
				}
			}
		}

		if (joEvent) {
			// detect if we're on a touch or mouse based browser
			var o = document.createElement('div');
			var test = ("ontouchstart" in o);
			if (!test) {
				o.setAttribute("ontouchstart", 'return;');
				test = (typeof o.ontouchstart === 'function');
			}
			joEvent.touchy = test;
			o = null;
		}
		
		if (joGesture)
			joGesture.load();

		var s = joScroller.prototype;
		
		// setup transition css hooks for the scroller
		if (typeof document.body.style.webkitTransition !== "undefined") {
			// webkit, leave everything alone
		}
		else if (typeof document.body.style.MozTransition !== "undefined") {
			// mozilla with transitions
			s.transitionEnd = "transitionend";
			s.setPosition = function(x, y, node) {
				node.style.MozTransform = "translate(" + x + "px," + y + "px)";
			};
		}
		else if (typeof document.body.style.msTransform !== "undefined") {
			// IE9 with transitions
			s.transitionEnd = "transitionend";
			s.setPosition = function(x, y, node) {
				node.style.msTransform = "translate(" + x + "px," + y + "px)";
			};
		}
		else if (typeof document.body.style.OTransition !== "undefined") {
			// opera with transitions
			s.transitionEnd = "otransitionend";
			s.setPosition = function(x, y, node) {
				node.style.OTransform = "translate(" + x + "px," + y + "px)";
			};
		}
		else {
			// no transitions, disable flick scrolling
			s.velocity = 0;
			s.bump = 0;
			s.transitionEnd = "transitionend";
			s.setPosition = function(x, y, node) {
				if (this.vertical)
					node.style.top = y + "px";
				
				if (this.horizontal)
					node.style.left = x + "px";
			};
		}

		joLog("Jo", this.version, "loaded for", this.platform, "environment");

		this.loadEvent.fire();
	},
	
	tagMap: {},
	tagMapLoaded: false,
	
	// make a map of node.tagName -> joView class constructor
	initTagMap: function() {
		// we only do this once per session
		if (this.tagMapLoaded)
			return;

		var key = this.tagMap;
		
		// defaults
		key.JOVIEW = joView;
		key.BODY = joScreen;

		// run through all our children of joView
		// and add to our joCollect.view object
		for (var p in window) {
			var o = window[p];
			if (typeof o === 'function'
			&& o.prototype
			&& typeof o.prototype.tagName !== 'undefined'
			&& o.prototype instanceof joView) {
				var tag = o.prototype.tagName.toUpperCase();
				
				if (o.prototype.type) {
					// handle tags with multiple types
					if (!key[tag])
						key[tag] = {};
						
					key[tag][o.prototype.type] = o;
				}
				else {
					key[tag] = o;
				}
			}
		}
	},
	
	getPlatform: function() {
		return this.platform;
	},
	
	matchPlatform: function(test) {
		return (test.indexOf(this.platform) >= 0);
	},
	
	getVersion: function() {
		return this.version;
	},
	
	getLanguage: function() {
		return this.language;
	}
};

/**
	joDOM
	======
	
	Singleton with utility methods for manipulating DOM elements.
	
	Methods
	-------

	- `get(id)`

	  Returns an HTMLElement which has the given id or if the
	  id is not a string returns the value of id.
	
	- `create(type, style)`
	
	  Type is a valid HTML tag type. Style is the same as `setStyle()`
	  method. Returns an HTMLElement.

			// simple
			var x = joDOM.create("div", "mycssclass");

			// more interesting
			var x = joDOM.create("div", {
				id: "name",
				className: "selected",
				background: "#fff",
				color: "#000"
			});

	- `setStyle(tag, style)`
	
	  Style can be an object literal with
	  style information (including "id" or "className") or a string. If
	  it's a string, it will simply use the style string as the className
	  for the new element.
	  
	  Note that the preferred and most cross-platform method for working
	  with the DOM is to use `className` and possibly `id` and put your
	  actual style information in your CSS file. That said, sometimes it's
	  easier to just set the background color in the code. Up to you.
	
	- `getParentWithin(node, ancestor)`

	  Returns an HTMLElement which is
	  the first child of the ancestor which is a parent of a given node.
	
	- `addCSSClass(HTMLElement, classname)`

	  Adds a CSS class to an element unless it is already there.
	
	- `removeCSSClass(HTMLElement, classname)`

	  Removes a CSS class from an element if it exists.
	
	- `toggleCSSClass(HTMLElement, classname)`

	  Auto add or remove a class from an element.
	
	- `pageOffsetLeft(HTMLElement)` and `pageOffsetHeight(HTMLElement)`
	
	  Returns the "true" left and top, in pixels, of a given element relative
	  to the page.
	
	- `applyCSS(css, stylenode)`
	
	  Applies a `css` string to the app. Useful for quick changes, like backgrounds
	  and other goodies. Basically creates an inline `<style>` tag. This method
	  returns a reference to the new `<style>` tag, which you can use with `removeCSS()`
	  and subsequent calls to `applyCSS()` as the `stylenode` argument.
	
	- `loadCSS(filename)`
	
	  Works the same as `applyCSS()` but loads the CSS from a file instead of a string.
	
	- `removeCSS(stylenode)`
	
	  Removes a `<style>` tag created with `applyCSS()` or `loadCSS()`.

*/
joDOM = {
	enabled: false,
	
	get: function(id) {
		if (typeof id === "string") {
			return document.getElementById(id);
		}
		else if (typeof id === 'object') {
			if (id instanceof joView)
				return id.container;
			else
				return id;
		}
	},
	
	remove: function(node) {
		if (node.parentNode) {
			node.parentNode.removeChild(node);
		}
	},

	enable: function() {
		this.enabled = true;
	},
	
	getParentWithin: function(node, ancestor) {
		while (node.parentNode !== window && node.parentNode !== ancestor) {
			node = node.parentNode;
		}

		return node;
	},

	addCSSClass: function(node, classname) {
		var node = joDOM.get(node);
		if (typeof node.className !== "undefined") {
			var n = node.className.split(/\s+/);

			for (var i = 0, l = n.length; i < l; i++) {
				if (n[i] == classname)
					return;
			}
			n.push(classname);
			node.className = n.join(" ");
		}
		else {
			node.className = classname;
		}
	},

	removeCSSClass: function(node, classname, toggle) {
		var node = joDOM.get(node);
		if (typeof node.className !== "undefined") {
			var n = node.className.split(/\s+/);

			for (var i = 0, l = n.length; i < l; i++) {
				if (n[i] == classname) {
					if (l == 1)
						node.className = "";
					else {
						n.splice(i, i);
						node.className = n.join(" ");
					}
					return;
				}
			}

			if (toggle) {
				n.push(classname);
				node.className = n.join(" ");
			}
		}
		else {
			node.className = classname;
		}
	},

	toggleCSSClass: function(node, classname) {
		this.removeCSSClass(node, classname, true);
	},

	create: function(tag, style) {
		if (!this.enabled)
			return null;

		if (typeof tag === "object" && typeof tag.tagName === "string") {
			// being used to create a container for a joView
			var o = document.createElement(tag.tagName);

			if (tag.className)
				this.setStyle(o, tag.className);
		}
		else {
			var o = document.createElement(tag);

			if (style)
				this.setStyle(o, style);
		}
		
		return o;
	},
	
	setStyle: function(node, style) {
		if (typeof style === "string") {
			node.className = style;
		}
		else if (typeof style === "object") {
			for (var i in style) {
				switch (i) {
				case "id":
				case "className":
					node[i] = style[i];
					break;
				default:
					node.style[i] = style[i];
				}
			}
		}
		else if (typeof style !== "undefined") {
			throw("joDOM.setStyle(): unrecognized type for style argument; must be object or string.");
		}
	},
	
	applyCSS: function(style, oldnode) {
		// TODO: should insert before and then remove the old node
		if (oldnode)
			document.body.removeChild(oldnode);

		var css = joDOM.create('jostyle');
		css.innerHTML = '<style>' + style + '</style>';

		document.body.appendChild(css);

		return css;
	},
	
	removeCSS: function(node) {
		document.body.removeChild(node);
	},
	
	loadCSS: function(filename, oldnode) {
		// you can just replace the source for a given
		// link if one is passed in
		if (oldnode)
			var css = oldnode;
		else
			var css = joDOM.create('link');
		
		css.rel = 'stylesheet';
		css.type = 'text/css';
		css.href = filename + (jo.debug ? ("?" + joTime.timestamp()) : "");

		if (!oldnode)
			document.body.appendChild(css);
		
		return css;
	},
	
	pageOffsetLeft: function(node) {
		var l = 0;
		
		while (typeof node !== 'undefined' && node && node.parentNode !== window) {
			if (node.offsetLeft)
				l += node.offsetLeft;

			node = node.parentNode;
		}

		return l;
	},
	
	pageOffsetTop: function(node) {
		var t = 0;
		
		while (typeof node !== 'undefined' && node && node.parentNode !== window) {
			t += node.offsetTop;
			node = node.parentNode;
		}

		return t;
	}
};

joCSSRule = function(data) {
	this.setData(data);
};
joCSSRule.prototype = {
	container: null,
	
	setData: function(data) {
		this.data = data || "";
		this.enable();
	},
	
	clear: function() {
		this.setData();
	},
	
	disable: function() {
		joDOM.removeCSS(this.container);
	},
	
	enable: function() {
		this.container = joDOM.applyCSS(this.data, this.container);
	}
};
/**
	joEvent
	========
	
	Singleton with DOM event model utility methods. Ideally, application-level
	code shouldn't have to use this, but library code does.
	
	Methods
	-------
	- `on(HTMLElement, event, Function, context, data)`
	
	  Set a DOM event listener for an HTMLElement which calls a given Function
	  with an optional context for `this` and optional static data. Returns a
	  reference to the handler function, which is required if you need to `remove()`
	  later.
	
	- `capture(HTMLElement, event, function, context, data)`
	
	  This is the same os `on()`, but captures the event at the node before its
	  children. If in doubt, use `on()` instead.
	
	- `remove(HTMLElement, event, handler)`
	
	  Removes a previously declared DOM event. Note that `handler` is the return
	  value of the `on()` and `capture()` methods.
	
	- `stop(event)`
	
	   Stop event propogation.
	
	- `preventDefault(event)`
	
	  Prevent default action for this event.
	
	- `block(event)`
	
	  Useful for preventing dragging the window around in some browsers, also highlighting
	  text in a desktop browser.
	
	- `getTarget(event)`
	
	  Returns the HTMLElement which a DOM event relates to.

*/

joEvent = {
	eventMap: {
		"mousedown": "touchstart",
		"mousemove": "touchmove",
		"mouseup": "touchend",
		"mouseout": "touchcancel"
	},
	touchy: false,
	
	getTarget: function(e) {
		if (!e)
			var e = window.event;
		
		return e.target ? e.target : e.srcElement;
	},

	capture: function(element, event, call, context, data) {
		return this.on(element, event, call, context, data, true);
	},

	on: function(element, event, call, context, data, capture) {
		if (!call || !element)
			return false;
			
		if (this.touchy) {
			if (this.eventMap[event])
				event = this.eventMap[event];
		}

		var element = joDOM.get(element);
		var call = call;
		var data = data || "";

		function wrappercall(e) {
			// support touchy platforms,
			// might reverse this to turn non-touch into touch
			if (e.touches && e.touches.length == 1) {
				var touches = e.touches[0];
				e.pageX = touches.pageX;
				e.pageY = touches.pageY;
				e.screenX = touches.screenX;
				e.screenY = touches.screenY;
				e.clientX = touches.clientX;
				e.clientY = touches.clientY;
			}
			
			if (context)
				call.call(context, e, data);
			else
				call(e, data);
		};
		
		// annoying kludge for Mozilla
		wrappercall.capture = capture || false;

		if (!window.addEventListener)
			element.attachEvent("on" + event, wrappercall);
		else
			element.addEventListener(event, wrappercall, capture || false);
			
		return wrappercall;
	},
	
	remove: function(element, event, call, capture) {
		if (this.touchy) {
			if (this.eventMap[event]) {
				event = this.eventMap[event];
			}
		}

		if (typeof element.removeEventListener !== 'undefined')
			element.removeEventListener(event, call, capture || false);
	},
		
	stop: function(e) {
		if (e.stopPropagation)
			e.stopPropagation();
		else
			e.cancelBubble = true;
	},
	
	preventDefault: function(e) {
		e.preventDefault();
	},
	
	block: function(e) {
		if (window.event)
			var e = window.event;

		if (typeof e.target == 'undefined')
			e.target = e.srcElement;

		switch (e.target.nodeName.toLowerCase()) {
		case 'input':
		case 'textarea':
			return true;
			break;
		default:
			return false;
		}
	}
};
/**
	joSubject
	==========
	
	Class for custom events using the Observer Pattern. This is designed to be used
	inside a subject to create events which observers can subscribe to. Unlike
	the classic observer pattern, a subject can fire more than one event when called,
	and each observer gets data from the subject. This is very similar to YUI 2.x
	event model.
	
	You can also "lock" the notification chain by using the `capture()` method, which
	tells the event to only notify the most recent subscriber (observer) which requested
	to capture the event exclusively.
	
	Methods
	-------
	
	- `subscribe(Function, context, data)`

	  Both `context` and `data` are optional. Also, you may use the `Function.bind(this)`
	  approach instead of passing in the `context` as a separate argument.
	  All subscribers will be notified when the event is fired.

	- `unsubscribe(Function, context)`
	
	  Does what you'd think. The `context` is only required if you used one when
	  you set up a subscriber.

	- `capture(Function, context, data)`
	
	  Only the last subscriber to capture this event will be notified until it is
	  released. Note that you can stack `capture()` calls to produce a modal event
	  heiarchy. Used in conjunction with the `resume()` method, you can build an
	  event chain where each observer can fire the next based on some decision making.
	
	- `release(Function, context)`
	
	  Removes the most recent subscription called with `capture()`, freeing up the next
	  subscribers in the list to be notified the next time the event is fired.

	- `fire(data)`

	  Calls subscriber methods for all observers, and passes in: `data` from the subject,
	  a reference to the `subject` and any static `data` which was passed in the
	  `subscribe()` call.
	
	- `resume(data)`
	
	  If you used `capture()` to subscribe to this event, you can continue notifying
	  other subscribers in the chain with this method. The `data` parameter, as in
	  `fire()`, is optional.
	
	Use
	---
	
	### In the subject (or "publisher") object
	
		// inside the Subject, we setup an event observers can subscribe to
		this.changeEvent = new joSubject(this);
		
		// to fire the event inside the Subject
		this.changeEvent.fire(somedata);

	### In the observer (or "subscriber") object

		// simple case, using Function.bind()
		somesubject.changeEvent.subscribe(this.mymethod.bind());
		
		// explicit context (this)
		somesubject.changeEvent.subscribe(this.mymethod, this);
		
		// optional data which gets passed with the event fires
		somesubject.changeEvent.subscribe(this.mymethod, this, "hello");

	This is a very flexible way to handle messages between objects. Each subject
	may have multiple events which any number of observer objects can subscribe
	to.

*/
joSubject = function(subject) {
	this.subscriptions = [];
	this.subject = subject;	
};
joSubject.prototype = {
	last: -1,
	
	subscribe: function(call, observer, data) {
		if (!call)
			return false;
		
		var o = { "call": call };

		if (observer)
			o.observer = observer;

		if (data)
			o.data = data;
		
		this.subscriptions.push(o);
	
		return this.subject;
	},
	
	unsubscribe: function(call, observer) {
		if (!call)
			return false;

		for (var i = 0, l = this.subscriptions.length; i < l; i++) {
			var sub = this.subscriptions[i];
			if (sub.call === call && (typeof sub.observer === 'undefined' || sub.observer === observer)) {
				this.subscriptions.splice(i, 1);
				break;
			}
		}
		
		return this.subject;
	},

	resume: function(data) {
		if (this.last != -1)
			this.fire(data, true);
			
		return this.subject;
	},
	
	fire: function(data, resume) {
		if (typeof data === 'undefined')
			data = "";
		
		var i = (resume) ? (this.last || 0) : 0;

		// reset our call stack
		this.last = -1;
			
		for (var l = this.subscriptions.length; i < l; i++) {
			var sub = this.subscriptions[i];
			var subjectdata = (typeof sub.data !== 'undefined') ? sub.data : null;
			
			if (sub.observer)
				sub.call.call(sub.observer, data, this.subject, subjectdata);
			else
				sub.call(data, this.subject, subjectdata);
			
			// if this subscriber wants to capture events,
			// stop calling other subscribers
			if (sub.capture) {
				this.last = i + 1;
				break;
			}
		}
		
		return this.subject;
	},

	capture: function(call, observer, data) {
		if (!call)
			return false;

		var o = { "call": call, capture: true };

		if (observer)
			o.observer = observer;

		if (data)
			o.data = data;
			
		this.subscriptions.unshift(o);

		return this.subject;
	},
	
	release: function(call, observer) {
		return this.unsubscribe(call, observer);
	}
};
/**
	joTime
	======
	
	Time utility functions. More will be added, but only as needed by the
	framework. There are entire libraries dedicated to extensive datetime
	manipulation, and Jo doesn't pretend to be one of them.
	
	Methods
	-------
	
	- `timestamp()`
	
	  Returns a current timestamp in milliseconds from 01/01/1970 from
	  the system clock.

	Constants
	---------

	- `SEC`, `MIN`, `HOUR`, `DAY`

	  Convenience global constants which make it easier to manipulate
	  timestamps.
	
	Use
	---
	
		var twoHoursLater = joTime.timestamp() + (HOUR * 2);
	
*/

var SEC = 1000;
var MIN = 60 * SEC;
var HOUR = 60 * MIN;
var DAY = 24 * HOUR;

joTime = {
	timestamp: function() {
		var now = new Date();
		return now / 1;
	}
};
/**
	joDefer
	=======
	
	Utility function which calls a given method within a given context after `n`
	milliseconds with optional static data.

	Use
	-----
	
		joDefer(Function, context, delay, data);
	
	Note that delay defaults to 100ms if not specified, and `data` is optional.

	joYield
	=======
	
	Deprecated, use joDefer instead.

*/
function joDefer(call, context, delay, data) {
	if (!delay)
		var delay = 100;

	if (!context)
		var context = this;
		
	var timer = window.setTimeout(function() {
		call.call(context, data);
	}, delay);
	
	return timer;
};
joYield = joDefer;/**
	joCache
	=======
	
	A singleton which makes it easy to setup deferred object creation and cached
	results. This is a performance menchanism initially designed for UI views, but
	could be extended to handle data requests and other object types.
	
	Methods
	-------
	
	- `set(key, call, context)`
	
	  Defines a factory (`call`) for building an object keyed from the `key` string.
	  The `context` argument is optional, but provides a reference for `this`.
	
	- `get(key)`
	
	  Returns an object based on the `key` string. If an object has not been created
	  which corresponds to the `key`, joCache will call the constructor defined to
	  create it and store the reference for future calls to `get()`.
	
	Use
	---
	
	Defining a view for on-demand use:
	
		joCache.set("home", function() {
			return new joCard([
				new joTitle("Home"),
				new joMenu([
					"Top Stories",
					"Latest News",
					"Old News",
					"No News"
				])
			]);
		});
	
	Displaying a view later:
	
		mystack.push(joCache.get("home"));
		
		// the first call to get() will instantiate
		// the view, subsequent calls will return the
		// view that was created the first time
		
		// you can pass parameters into your view factory
		var x = joCache.get("home", "My Title");
		
		// note that if you want to use joCache to cache
		// views which differ based on parameters passed in,
		// you probably want your own caching mechanism instead.

*/

joCache = {
	cache: {},
	
	set: function(key, call, context) {
		if (call)
			this.cache[key] = { "call": call, "context": context || this };
	},
	
	get: function(key) {
		var cache = this.cache[key] || null;
		if (cache) {
			if (!cache.view)
				cache.view = cache.call.apply(cache.context, arguments);
				
			return cache.view;
		}
		else {
			return new joView("View not found: " + key);
		}
	}
};

/**
	joChain
	========
	
	Class which strings asyncronous calls together.
	
	> In serious need of rework; doesn't meet original goal of sequencing
	> these calls. This class might also become deprecated.

	Methods
	-------
	
	- `add(Function, context, data)`
	- `start()`
	- `stop()`
	- `next()`

*/

joChain = function() {
	this.queue = [];
	this.active = false;
	
	this.addEvent = new joSubject("add", this);
	this.startEvent = new joSubject("start", this);
	this.stopEvent = new joSubject("stop", this);
	this.nextEvent = new joSubject("next", this);

	this.stop();
	
	this.delay = 100;
};
joChain.prototype = {
	add: function(call, context, data) {
		if (!context)
			var context = this;
		
		if (!data)
			var data = "";
			
		this.queue.push({
			"call":call,
			"context": context,
			"data": data
		});
		
		if (this.active && !this.timer)
			this.next();
	},
	
	start: function() {
		this.active = true;
		
		this.startEvent.fire();
		
		this.next();
	},
	
	stop: function() {
		this.active = false;

		if (this.timer != null)
			window.clearTimeout(this.timer);

		this.timer = null;
		
		this.stopEvent.fire();
	},
	
	next: function() {
		var nextcall = this.queue.shift();
		
		if (!nextcall) {
			this.timer = null;
			return;
		}
		
		this.nextEvent.fire(nextcall);

		nextcall.call.call(nextcall.context, nextcall.data);
		
		if (this.queue.length)
			this.timer = joEvent.yield(this.next, this, this.delay);
		else
			this.timer = null;
	}
};
/**
	joClipboard
	===========
	
	Singleton which abstracts the system clipboard. Note that this is a platform
	dependant interface. By default, the class will simply store the contents in
	a special joPreference named "joClipboardData" to provide clipboard capabilities
	within your app.
	
	> Even if you think you're just going to use the default behavior, it is
	> recommended that you never manipulate the "joClipboardData" preference directly.
	
	Methods
	-------
	
	- `get()`
	- `set(String)`

	  Low level methods which use just strings. At this time, you will need to
	  stringify your own data when setting, and extract your data when getting.
	
	- `cut(joControl)`
	- `copy(joControl)`
	- `paste(joControl)`

	  High level methods which work with any joControl or subclass. If a control
	  supports selections, `cut()` will automatically remove the selection after
	  copying its contents. Otherwise, `cut()` will work the same as `copy()`.
	
	> Note: this is not working yet, steer clear (or contribute some working code!)
	
*/
joClipboard = {
	data: "",
	
	get: function() {
		return joPreference.get("joClipboardData") || this.data;
	},
	
	set: function(clip) {
		// don't feed it junk; stringify it first
		// TODO: detect non-strings and stringify them
		this.data = clip;
		joPreference.set("joClipboardData");
	}
};
/*
	not used at this time
*/

/**
	joDataSource
	=============

	Wraps data acquisition in an event-driven class. Objects can
	subscribe to the `changeEvent` to update their own data.

	This base class can be used as-is as a data dispatcher, but is
	designed to be extended to handle asynchronous file or SQL queries.

	Methods
	-------
	- `set()`
	- `get()`
	- `clear()`
	- `setQuery(...)`
	- `getQuery()`
	- `load()`
	- `refresh()`

	Events
	------

	- `changeEvent`
	- `errorEvent`
	
	> Under construction, use with care.
	
*/
joDataSource = function(data) {
	this.changeEvent = new joSubject(this);	
	this.errorEvent = new joSubject(this);

	if (typeof data !== "undefined")
		this.setData(data);
	else
		this.data = "";
};
joDataSource.prototype = {
	autoSave: true,
	data: null,
	
	setQuery: function(query) {
		this.query = query;
	},
	
	setAutoSave: function(state) {
		this.autoSave = state;
		return this;
	},
	
	setData: function(data) {
		var last = this.data;
		this.data = data;

		if (data !== last)
			this.changeEvent.fire(data);
	},
	
	getData: function() {
		return this.data;
	},
	
	getDataCount: function() {
		return this.getData().length;
	},
	
	getPageCount: function() {
		if (this.pageSize)
			return Math.floor(this.getData().length / this.pageSize) + 1;
		else
			return 1;
	},
	
	getPage: function(index) {
		var start = index * this.pageSize;
		var end = start + this.pageSize;
		
		if (end > this.getData().length)
			end = this.getData().length;
			
		if (start < 0)
			start = 0;

		return this.data.slice(start, end);
	},
	
	refresh: function() {
		// needs to make a new query object
	},
	
	setPageSize: function(length) {
		this.pageSize = length;
	},
	
	getPageSze: function() {
		return this.pageSize;
	},
	
	load: function(data) {
		this.data = data;
		this.changeEvent.fire(data);
	},
	
	error: function(msg) {
		this.errorEvent.fire(msg);
	}
};
/**
	joRecord
	========
	
	An event-driven wrapper for an object and its properties. Useful as a
	data interface for forms and other collections of UI controls.
	
	Extends
	-------
	
	- joDataSource
	
	Methods
	-------
	
	- `link(property)`
	
	  Returns a reference to a joProperty object which can be used with UI
	  controls (children of joControl) to automatically save or load data
	  based on user interaction.
	
	- `save()`
	
	  Saves the object's data. The base class does not itself save the data;
	  you will need to make your own action for the save method, or have
	  something which subscribes to the `saveEvent`.
	
	- `load()`
	
	  Loads the object's data, and fires off notifications to any UI controls
	  which are linked to this joRecord object. Same as the `save()` method,
	  you will have to make this function do some actual file loading if that's
	  what you want it to do.
	
	- `getProperty(property)`
	- `setProperty(property, value)`
	
	  Get or set a given property. Used in conjunction with `setAutoSave()`,
	  `setProprty()` will also trigger a call to the `save()` method.

	- `getDelegate(property)`
	
	  Returns a reference to the joProperty object which fires off events
	  for data changes for that property. If none exists, one is created.
	  This method is used by the `link()` method, and can be overriden if
	  you extend this class to provide some other flavor of a joDataSource
	  to manage events for your properties.

	Use
	---
	
		// setup a joRecord
		var r = new joRecord({
			user: "Jo",
			password: "1234",
			active: true
		});
		
		// bind it to some fields
		var x = new joGroup([
			new joLabel("User"),
			new joInput(r.link("user")),
			new joLabel("Password"),
			new joPasswordInput(r.link("password")),
			new joFlexBox([
				new joLabel("Active"),
				new joToggle(r.link("active"))
			])
		]);

	And if you want the data to be persistent, or interact with some
	cloud service, you'll need to do something like this:
	
		// make something happen to load the data
		r.load = function() {
			// some AJAX or SQL call here
		};
		
		// make something happen to save the data
		r.save = function() {
			// some AJAX or SQL call here
		};
	
	You could also make your own subclass of joRecord with your own save
	and load methods using `extend()` like this:
	
		var preferences = function() {
			// call to the superclass constructor
			joRecord.apply(this, arguments);
		};
		preferences.extend(joRecord, {
			save: function() {
				// do an AJAX or SQL call here
			},
			
			load: function() {
				// do an AJAX or SQL call here
			}
		}

	See Class Patterns for more details on this method of "subclassing"
	in JavaScript.

*/
joRecord = function(data) {
	joDataSource.call(this, data);
	this.delegate = {};
};
joRecord.extend(joDataSource, {
	link: function(p) {
		return this.getDelegate(p);
	},
	
	getDelegate: function(p) {
		if (!this.delegate[p])
			this.delegate[p] = new joProperty(this, p);
			
		return this.delegate[p];
	},
	
	getProperty: function(p) {
		return this.data[p];
	},
	
	setProperty: function(p, data) {
		if (this.data[p] === data)
			return;
		
		this.data[p] = data;
		this.changeEvent.fire(this);
		
		if (this.autoSave)
			this.save();

		return this;
	},
	
	load: function() {
		console.log("TODO: extend the load() method");
		return this;
	},

	save: function() {
		console.log("TODO: extend the save() method");
		return this;
	}
});
	
/**
	joProperty
	==========
	
	Used by joRecord to provide an event-driven binding to properties.
	This class is instantiated by joRecord and not of much use on its own.
	
	Extends
	-------
	
	- joDataSource
	
	Use
	---
	
	See joRecord for examples.
*/
joProperty = function(datasource, p) {
	joDataSource.call(this);

	this.changeEvent = new joSubject(this);
	datasource.changeEvent.subscribe(this.onSourceChange, this);

	this.datasource = datasource;
	this.p = p;
};
joProperty.extend(joDataSource, {
	setData: function(data) {
		if (this.datasource)
			this.datasource.setProperty(this.p, data);
		
		return this;
	},
	
	getData: function() {
		if (!this.datasource)
			return null;

		return this.datasource.getProperty(this.p);
	},
	
	onSourceChange: function() {
		this.changeEvent.fire(this.getData());
	}
});
/**
	- - -

	joDatabase
	===========

	Wrapper class for WebKit SQLite database.
	
	Methods
	-------
	
	- `open(datafile, size)`
	
	  `datafile` is a filename, `size` is an optional parameter for initial
	  allocation size for the database.
	
	- `close()`
	
	- `now()`
	
	  *Deprecated* convenience method which returns a SQLite-formatted date
	  string for use in queries. Should be replaced with a utility function
	  in joTime.
*/
joDatabase = function(datafile, size) {
	this.openEvent = new joEvent.Subject(this);
	this.closeEvent = new joEvent.Subject(this);
	this.errorEvent = new joEvent.Subject(this);

	this.datafile = datafile;
	this.size = size || 256000;
	this.db = null;
};
joDatabase.prototype = {
	open: function() {
		this.db = openDatabase(this.datafile, "1.0", this.datafile, this.size);

		if (this.db) {
			this.openEvent.fire();
		}
		else {
			joLog("DataBase Error", this.db);
			this.errorEvent.fire();
		}
	},
	
	close: function() {
		this.db.close();
		this.closeEvent.fire();
	},
	
	now: function(offset) {
		var date = new Date();
		
		if (offset)
			date.setDate(date.valueOf() + (offset * 1000 * 60 * 60 * 24));
		
		return date.format("yyyy-mm-dd");
	}
};
/**
	joSQLDataSource
	================

	SQL flavor of joDataSource which uses "HTML5" SQL found in webkit.

	Methods
	-------

	- `setDatabase(joDatabase)`
	- `setQuery(query)`
	- `setParameters(arguments)`
	- `execute(query, arguments)`
	
	Events
	------
	
	- `changeEvent`
	
	  Fired when data is loaded after an `execute()` or when data is cleared.
	
	- `errorEvent`
	
	  Fired when some sort of SQL error happens.

	Extends
	-------

	- joDataSource
*/
joSQLDataSource = function(db, query, args) {
	this.db = db;
	this.query = (typeof query == 'undefined') ? "" : query;
	this.args = (typeof args == 'undefined') ? [] : args;
	
	this.changeEvent = new joEvent.subject(this);
	this.errorEvent = new joEvent.subject(this);
};
joSQLDataSource.prototype = {
	setDatabase: function(db) {
		this.db = db;
	},
	
	setQuery: function(query) {
		this.query = query;
	},

	setData: function(data) {
		this.data = data;
		this.changeEvent.fire();
	},

	clear: function() {
		this.data = [];
		this.changeEvent.fire();
	},

	setParameters: function(args) {
		this.args = args;
	},

	execute: function(query, args) {
		this.setQuery(query || "");
		this.setParameters(args);
		
		if (this.query)
			this.refresh();
	},
	
	refresh: function() {
		if (!this.db) {
			this.errorEvent.fire();
//			joLog("query error: no db!");
			return;
		}
		
		var self = this;

		if (arguments.length) {
			var args = [];
			for (var i = 0; i < arguments.length; i++)
				args.push(arguments[i]);
		}
		else {
			var args = this.args;
		}
		
		var query = this.query;

		function success(t, result) {
			self.data = [];

			for (var i = 0, l = result.rows.length; i < l; i++) {
				var row = result.rows.item(i);

				self.data.push(row);
			}
			
			self.changeEvent.fire(self.data);
		}
		
		function error() {
			joLog('SQL error', query, "argument count", args.length);
			self.errorEvent.fire();
		}
		
		this.db.db.transaction(function(t) {
			t.executeSql(query, args, success, error);
		});
	}
};
/**
	joFileSource
	============
	
	A special joDataSource which loads and handles a file. This class
	wraps joFile.
	
	Extends
	-------
	
	- `joDataSource`
	
*/
joFileSource = function(url, timeout) {
	this.changeEvent = new joSubject(this);
	this.errorEvent = new joSubject(this);
	
	if (timeout)
		this.setTimeout(timeout);
		
	if (url)
		this.setQuery(url);
};
joFileSource.extend(joDataSource, {
	baseurl: '',
	query: '',
	
	load: function() {
		var get = this.baseurl + this.query;

		joFile(get, this.callBack, this);
	},
	
	callBack: function(data, error) {
		if (error)
			this.errorEvent.fire(error);
		else
			this.setData(data);
	}
});

/**
	joFile
	======
	
	A utility method which uses XMLHttpRequest to load a text-like file
	from either a remote server or a local file.
	
	> Note that some browsers and mobile devices will *not* allow you to
	> load from just any URL, and some will restrict use with local files
	> especially (I'm looking at you, FireFox).
	>
	> If your aim is to load JavaScript-like data (also, JSON), you may want
	> to look at joScript instead, which uses script tags to accomplish the job.
	
	Calling
	-------
	
		joFile(url, call, context, timeout)
	
	Where
	-----
	
	- `url` is a well-formed URL, or, in most cases, a relative url to a local
	  file

	- `call` is a function to call when the operation completes

	- `context` is an optional scope for the function to call (i.e. value of `this`).
	  You can also ignore this parameter (or pass in `null` and use `Function.bind(this)`
	  instead.

	- `timeout` is an optional parameter which tells joFile to wait, in seconds,
	  for a response before throwing an error.
	
	Use
	---
	
		// simple call with a global callback
		var x = joFile("about.html", App.loadAbout);
		
		// an inline function
		var y = joFile("http://joapp.com/index.html", function(data, error) {
			if (error) {
				console.log("error loading file");
				return;
			}
			
			console.log(data);
		});
*/
joFile = function(url, call, context, timeout) {
	var req = new XMLHttpRequest();

	if (!req)
		return onerror();

	// 30 second default on requests
	if (!timeout)
		var timeout = 60 * SEC;
		
	var timer = (timeout > 0) ? setTimeout(onerror, timeout) : null;

	req.open('GET', url, true);
	req.onreadystatechange = onchange;
	req.onError = onerror;
	req.send(null);
	
	function onchange(e) {
		if (timer)
			timer = clearTimeout(timer);

		if (req.readyState == 4)
			handler(req.responseText, 0);
	}
	
	function onerror() {
		handler(null, true);
	}
	
	function handler(data, error) {
		if (call) {
			if (context)
				call.call(context, data, error);
			else
				call(error, data, error);
		}
	}
}	

/**
	joScript
	========
	
	Script tag loader function which can be used to dynamically load script
	files or make RESTful calls to many JSON services (provided they have some
	sort of callback ability). This is a low-level utility function.
	
	> Need a URL with some examples of this.
	
	Calling
	-------

	`joScript(url, callback, context, errorcallback, errorcontext)`
	
	- url
	- callback is a function (supports bind, in which case context is optional)
	- context (usually `this`, and is optional)

	Returns
	-------
	
	Calls your handler method and passes a truthy value if there was an error.
	
	Use
	---
	
		joScript("myscript.js", function(error, url) {
			if (error)
				console.log("script " + url + " didn't load.");
		}, this);

*/
function joScript(url, call, context) {
	var node = joDOM.create('script');

	if (!node)
		return;

	node.onload = onload;
	node.onerror = onerror;
	node.src = url;
	document.body.appendChild(node);

	function onerror() {
		handler(true);
	}
	
	function onload() {
		handler(false);
	}
	
	function handler(error) {
		if (call) {
			if (context)
				call.call(context, error, url);
			else
				call(error, url);
		}

		document.body.removeChild(node);
		node = null;
	}
}	

/**
	joPreference
	============

	A class used for storing and retrieving preferences in your application.

	*The interface for this is changing.* joPreference will become a specialized
	application-level extension of joRecord in the near future. Until then, you
	should use joRecord to achieve this use-case.
	
	Extends
	-------
	
	- joRecord

*/

// placeholder for now
joPreference = joRecord;
/**
	joYQL
	=====
	
	A joDataSource geared for YQL RESTful JSON calls. YQL is like SQL, but for cloud
	services. Pretty amazing stuff:
	
	> The Yahoo! Query Language is an expressive SQL-like language that lets you query,
	> filter, and join data across Web services. With YQL, apps run faster with fewer lines of
	> code and a smaller network footprint.
	>
	> Yahoo! and other websites across the Internet make much of their structured data
	> available to developers, primarily through Web services. To access and query these
	> services, developers traditionally endure the pain of locating the right URLs and
	> documentation to access and query each Web service.
	>
	> With YQL, developers can access and shape data across the Internet through one
	> simple language, eliminating the need to learn how to call different APIs.

	[Yahoo! Query Language Home](http://developer.yahoo.com/yql/)
	
	Use
	---
	
	A simple one-shot use would look like:
	
		// setup our data source
		var yql = new joYQL("select * from rss where url='http://davebalmer.wordpress.com'");
		
		// subscribe to load events
		yql.loadEvent.subscribe(function(data) {
			joLog("received data!");
		});

		// kick off our call
		yql.exec();
	
	A more robust example with parameters in the query could look something
	like this:
	
		// quick/dirty augmentation of the setQuery method
		var yql = new joYQL();
		yql.setQuery = function(feed, limit) {
			this.query = "select * from rss where url='"
				+ feed + "' limit " + limit
				+ " | sort(field=pubDate)";
		};
		
		// we can hook up a list to display the results
		var list = new joList(yql).attach(document.body);
		list.formatItem = function(data, index) {
			var html = new joListItem(data.title + " (" + data.pubDate + ")", index);
		};
		
		// later, we make our call with our parameters
		yql.exec("http://davebalmer.wordpress.com", 10);
	
	Methods
	-------
	- `setQuery()`
	
	  Designed to be augmented, see the example above.
	
	- `exec()`
	
	Extends
	-------
	
	- joDataSource

*/

joYQL = function(query) {
	joDataSource.call(this);

	this.setQuery(query);
};
joYQL.extend(joDataSource, {
	baseurl: 'http://query.yahooapis.com/v1/public/yql?',
	format: 'json',
	query: '',
	
	exec: function() {
		var get = this.baseurl + "q=" + encodeURIComponent(this.query)
			+ "&format=" + this.format + "&callback=" + joDepot(this.load, this);

		joScript(get, this.callBack, this);
	},
	
	load: function(data) {
		var results = data.query && data.query.results && data.query.results.item;
		
		if (!results)
			this.errorEvent.fire(data);
		else {
			this.data = results;
			this.changeEvent.fire(results);
		}
	},
	
	callBack: function(error) {
		if (error)
			this.errorEvent.fire();
	}
});


/*
	Used by joYQL for RESTful calls, may be abstracted into
	a restful superclass, but that will be dependant on a
	callback paramter as well.
*/
joDepotCall = [];
joDepot = function(call, context) {
	joDepotCall.push(handler);
		
	function handler(data) {
		if (context)
			call.call(context, data);
		else
			call(data);
	};
	
	return "joDepotCall[" + (joDepotCall.length - 1) + "]";
};
/**
	joInterface
	===========
	
	*EXPERIMENTAL*

	> This utility method is experimental! Be very careful with it. *NOTE* that
	> for now, this class requires you to remove whitespace in your HTML. If you
	> don't know a good approach offhand to do that, then this thing probably isn't
	> ready for you yet.
	
	This class parses the DOM tree for a given element and attempts to
	attach appropriate joView subclasses to all the relevant HTML nodes.
	Returns an object with references to all elements with the `id`
	attribute set. This method helps turn HTML into HTML + JavaScript.
	
	Use
	---
	
		// an HTML element by its ID
		var x = new joInterface("someid");
		
		// a known HTML element
		var y = new joInterface(someHTMLElement);
		
		// the entire document body (careful, see below)
		var z = new joInterface();
	
	Returns
	-------
	
	A new object with a property for each element ID found. For example:
	
		<!-- this DOM structure -->
		<jocard id="login">
			<jotitle>Login</jotitle>
			<jogroup>
				<jolabel>Username</jolabel>
				<input id="username" type="text">
				<jolabel>Password</jolabel>
				<input id="password" type="password">
			</jogroup>
			<jobutton id="loginbutton">Login</jobutton>
		</jocard>
	
	Parsed with this JavaScript:
	
		// walk the DOM, find nodes, create controls for each
		var x = new joInterface("login");

	Produces these properties:
	
	- `x.login` is a reference to a `new joCard`
	- `x.username` is a reference to a `new joInput`
	- `x.password` is a reference to a `new joPassword`
	- `x.loginbutton` is a reference to a `new joButton`
	
	This in essence flattens your UI to a single set of properties you can
	use to access the controls that were created from your DOM structure.
	
	In addition, any unrecognized tags which have an `id` attribute set will
	also be loaded into the properties.
	
	Parsing complex trees
	---------------------
	
	Yes, you can make a joInterface that encapsulates your entire UI with HTML.
	This is not recommended for larger or more complex applications, some
	reasons being:
	
	- Rendering speed: if you're defining multiple views within a `<jostack>`
	  (or another subclass of joContainer), your users will see a flicker and
	  longer load time while the window renders your static tags and the extra
	  views for the stack are removed from view.
	
	- Double rendering: again with `<jostack>` tags, you're going to see a separate
	  render when the first view is redrawn (has to).
	
	- Load time: especially if you're doing a mobile app, this could be a biggie.
	  You are almost always going to be better off building the app controls with
	  JavaScript (especially in conjunction with joCache, which only creates DOM
	  nodes for a given view structure on demand).
	
	If you really want to use HTML as your primary means of defining your UI, you're
	better off putting your major UI components inside of a `<div>` (or other tag)
	with `display: none` set in its CSS property. Like this:
	
		<!-- in your CSS: .hideui { display: none } -->
		<div class="hideui" id="cards">
			<jocard id="about">
				<jotitle>About this app</jotitle>
				<johtml>
					This is my app, it is cool.
				</johtml>
				<jobutton>Done</jobutton>
			</jocard>
			<jocard id="login">
				... etc ...
			</jocard>
		</div>
		
	Then in your JavaScript:
	
		// pull in all our card views from HTML
		var cards = new joInterface("cards");
		
	Definitely use this class judiciously or you'll end up doing a lot of recatoring
	as your application grows.
	
	Flattening UI widget references
	-------------------------------
	
	This is both good and bad, depending on your coding style and complexity of
	your app. Because all the tags with an ID attribute (regardless of where they
	are in your tag tree) get a single corresponding property reference, things
	could get very messy in larger apps. Again, be smart.
	
*/
joInterface = function(parent) {
	// initialize our tag lookup object
	jo.initTagMap();
	
	// surprise! we're only using our prototype once and
	// just returning references to the nodes with ID attributes
	return this.get(parent);
};
joInterface.prototype = {
	get: function(parent) {
		parent = joDOM.get(parent);

		if (!parent)
			parent = document.body;

		var ui = {};

		// pure evil -- seriously
		var setContainer = joView.setContainer;
		var draw = joView.draw;
		
		parse(parent);

		// evil purged
		joView.setContainer = setContainer;
		joView.draw = draw;
		
		function parse(node) {
			if (!node)
				return;
			
			var args = "";

			// handle all the leaves first
			if (node.childNodes && node.firstChild) {
				// spin through child nodes, build our list
				var kids = node.childNodes;
				args = [];
				
				for (var i = 0, l = kids.length; i < l; i++) {
					var p = parse(kids[i]);

					if (p)
						args.push(p);
				}
			}

			// make this control
			return newview(node, args);
		}
		
		// create appropriate joView widget from the tag type,
		// otherwise return the node itself
		function newview(node, args) {
			var tag = node.tagName;
			var view = node;

//			console.log(tag, node.nodeType);
			
			if (jo.tagMap[tag]) {
				if (args instanceof Array && args.length) {
					if (args.length == 1)
						args = args[0];
				}

				if (args instanceof Text)
					args = node.nodeData;
				
				if (!args)
					args = node.value || node.checked || node.innerText || node.innerHTML;

//				console.log(args);
				
				joView.setContainer = function() {
					this.container = node;

					return this;
				};
				
				if (typeof jo.tagMap[tag] === "function") {
					var o = jo.tagMap[tag];
				}
				else {
					var t = node.type || node.getAttribute("type");
					var o = jo.tagMap[tag][t];
				}
				
				if (typeof o === "function")
					var view = new o(args);
				else
					joLog("joInterface can't process ", tag, "'type' attribute?");
			}
			
			// keep track of named controls
			if (node.id)
				ui[node.id] = view;
				
			return view;
		}
		
		// send back our object with named controls as properties
//		console.log(ui);
		return ui;
	}
};
/**
	joCollect
	=========
	
	*DEPRECATED* use joInterface instead. This function is planned
	to die when jo goes beta.

*/
joCollect = {
	get: function(parent) {
		// this is what happens when you announced something not
		// quite fully baked
		return new joInterface(parent);
	}
};
/**
	joView
	=======
	
	Base class for all other views, containers, controls and other visual doo-dads.
	
	Use
	-----
	
		var x = new joView(data);
	
	Where `data` is either a text or HTML string, an HTMLElement, or any joView object
	or subclass.
		
	Methods
	-------
	
	- `setData(data)`
	- `getData()`
	- `createContainer(type, classname)`
	- `setContainer(HTMLElement)`
	- `getContainer()`
	- `clear()`
	- `refresh()`

	- `attach(HTMLElement or joView)`
	- `detach(HTMLElement or joView)`
	
	  Convenience methods which allow you to append a view or DOM node to the
	  current view (or detach it).
	
*/
joView = function(data) {
	this.changeEvent = new joSubject(this);

	this.setContainer();

	if (data)
		this.setData(data);
};
joView.prototype = {
	tagName: "joview",
	busyNode: null,
	container: null,
	data: null,
	
	getContainer: function() {
		return this.container;
	},

	setContainer: function(container) {
		this.container = joDOM.get(container);
			
		if (!this.container)
			this.container = this.createContainer();
		
		this.setEvents();
		
		return this;
	},
	
	createContainer: function() {
		return joDOM.create(this);
	},

	clear: function() {
		this.data = "";
		
		if (this.container)
			this.container.innerHTML = "";

		this.changeEvent.fire();
	},

	setData: function(data) {
		this.data = data;
		this.refresh();
		
		return this;
	},

	getData: function() {
		return this.data;
	},

	refresh: function() {
		if (!this.container || typeof this.data == "undefined")
			return 0;

		this.container.innerHTML = "";
		this.draw();

		this.changeEvent.fire(this.data);
	},

	draw: function() {
		this.container.innerHTML = this.data;
	},
	
	setStyle: function(style) {
		joDOM.setStyle(this.container, style);
		
		return this;
	},
	
	attach: function(parent) {
		if (!this.container)
			return this;
		
		var node = joDOM.get(parent) || document.body;
		node.appendChild(this.container);
		
		return this;
	},
	
	detach: function(parent) {
		if (!this.container)
			return this;

		var node = joDOM.get(parent) || document.body;
		
		if (this.container && this.container.parentNode === node)
			node.removeChild(this.container);
		
		return this;
	},
		
	setEvents: function() {}
};
/**
	joContainer
	============
	
	A view which is designed to contain other views and controls. Subclass to provide
	different layout types. A container can be used to intantiate an entire tree of
	controls at once, and is a very powerful UI component in jo.
	
	Use
	---
	
		// plain container
		var x = new joContainer();
		
		// HTML or plain text
		var y = new joContainer("Some HTML");
		
		// HTMLElement
		var w = new joContainer(joDOM.get("mydiv"));
		
		// nested inline structure with text, HTML, joViews or HTMLElements
		var z = new joContainer([
			new joTitle("Hello"),
			new joList([
				"Red",
				"Green",
				"Blue"
			]),
			new joFieldset([
				"Name", new joInput(joPreference.bind("name")),
				"Phone", new joInput(joPreference.bind("phone"))
			]),
			new joButton("Done")
		]);
		
		// set an optional title string, used with joNavbar
		z.setTitle("About");
	
	Extends
	-------
	
	- joView
	
	Events
	------
	
	- `changeEvent`
	
	Methods
	-------
	
	- `setData(data)`

	  The constructor calls this method if you provide `data` when you instantiate
	  (see example above)
	
	- `push(data)`
	
	  Same support as `setData()`, but places the new content at the end of the
	  existing content.
	
	- `setTitle(string)`
	- `getTitle(string)`
	
	  Titles are optional, but used with joStack & joStackScroller to update a
	  joNavbar control automagically.

*/
joContainer = function(data) {
	joView.apply(this, arguments);
};
joContainer.extend(joView, {
	tagName: "jocontainer",
	title: null,
	
	getContent: function() {
		return this.container.childNodes;
	},
	
	setTitle: function(title) {
		this.title = title;
		return this;
	},
	
	setData: function(data) {
		this.data = data;
		this.refresh();
		return this;
	},
	
	activate: function() {},
	
	deactivate: function() {},

	push: function(data) {
		if (typeof data === 'object') {
			if (data instanceof Array) {
				// we have a list of stuff
				for (var i = 0; i < data.length; i++)
					this.push(data[i]);
			}
			else if (data instanceof joView && data.container !== this.container) {
				// ok, we have a single widget here
				this.container.appendChild(data.container);
			}
			else if (data instanceof HTMLElement) {
				// DOM element attached directly
				this.container.appendChild(data);
			}
		}
		else {
			// shoving html directly in does work
			var o = document.createElement("div");
			o.innerHTML = data;
			this.container.appendChild(o);
		}
	},
	
	getTitle: function() {
		return this.title;
	},
	
	refresh: function() {
		if (this.container)
			this.container.innerHTML = "";

		this.draw();
		this.changeEvent.fire();
	},
	
	draw: function() {
		this.push(this.data);
	}
});
/**
	joControl
	=========
	
	Interactive, data-driven control class which may be bound to a joDataSource,
	can receive focus events, and can fire off important events which other objects
	can listen for and react to.
	
	Extends
	-------
	
	- joView
	
	Events
	------
	
	- `changeEvent`
	- `selectEvent`
	
	Methods
	-------
	
	- `setValue(value)`
	
	  Many controls have a *value* in addition to their *data*. This is
	  particularly useful for `joList`, `joMenu`, `joOption` and other controls
	  which has a list of possibilities (the data) and a current seletion from those
	  (the value).
	
	- `enable()`
	- `disable()`
	
	  Enable or disable the control, pretty much does what you'd expect.
	
	- `focus()`
	- `blur()`
	
	  Manually control focus for this control.
	
	- `setDataSource(joDataSource)`
	
	  Tells this control to bind its data to any `joDataSource` or subclass.
	
	- `setValueSource(joDataSource)`
	
	  Tells this control to bind its *value* to any `joDataSource` type.
	
	- `setReadOnly(state)`
	
	  Certain controls can have their interaction turned off. State is either `true`
	  or `false`.
	
	See Also
	--------
	
	- joRecord and joProperty are specialized joDataSource classes which
	  make it simple to bind control values to a data structure.

*/
joControl = function(data, value) {
	this.selectEvent = new joSubject(this);
	this.enabled = true;
	this.value = null;

	if (typeof value !== "undefined" && value != null) {
		if (value instanceof joDataSource)
			this.setValueSource(value);
		else
			this.value = value;
	}

	if (data instanceof joDataSource) {
		// we want to bind directly to some data
		joView.call(this);
		this.setDataSource(data);
	}
	else {
		joView.apply(this, arguments);
	}
};
joControl.extend(joView, {
	tagName: "jocontrol",
	
	setEvents: function() {
		// not sure what we want to do here, want to use
		// gesture system, but that's not defined
		joEvent.on(this.container, "click", this.onMouseDown, this);
		joEvent.on(this.container, "blur", this.onBlur, this);
		joEvent.on(this.container, "focus", this.onFocus, this);
	},
	
	onMouseDown: function(e) {
		this.select(e);
	},
	
	select: function(e) {
		if (e)
			joEvent.stop(e);

		this.selectEvent.fire(this.data);
	},
	
	enable: function() {
		joDOM.removeCSSClass(this.container, 'disabled');
		this.container.contentEditable = true;
		this.enabled = true;
		
		return this;
	},
	
	disable: function() {
		joDOM.addCSSClass(this.container, 'disabled');
		this.container.contentEditable = false;
		this.enabled = false;
		
		return this;
	},

	setReadOnly: function(value) {
		if (typeof value === 'undefined' || value)
			this.container.setAttribute('readonly', '1');
		else 
			this.container.removeAttribute('readonly');
		
		return this;
	},

	onFocus: function(e) {
		joEvent.stop(e);
		
		if (this.enabled)
			joFocus.set(this);
	},
	
	onBlur: function(e) {
		this.data = (this.container.value) ? this.container.value : this.container.innerHTML;
		joEvent.stop(e);

		if (this.enabled) {
			this.blur();

			this.changeEvent.fire(this.data);
		}
	},
	
	focus: function(e) {
		if (!this.enabled)
			return;
		
		joDOM.addCSSClass(this.container, 'focus');

		if (!e)
			this.container.focus();
			
		return this;
	},
	
	setValue: function(value) {
		this.value = value;
		this.changeEvent.fire(value);

		return this;
	},
	
	getValue: function() {
		return this.value;
	},
	
	blur: function() {
		joDOM.removeCSSClass(this.container, 'focus');
		
		return this;
	},
	
	setDataSource: function(source) {
		this.dataSource = source;
		source.changeEvent.subscribe(this.setData, this);
		this.setData(source.getData() || null);
		this.changeEvent.subscribe(source.setData, source);
		
		return this;
	},
	
	setValueSource: function(source) {
		this.valueSource = source;
		source.changeEvent.subscribe(this.setValue, this);
		this.setValue(source.getData() || null);
		this.selectEvent.subscribe(source.setData, source);
		
		return this;
	}
});
/**
	joButton
	========
	
	Button control.
	
		// simple invocation
		var x = new joButton("Done");
		
		// optionally pass in a CSS classname to style the button
		var y = new joButton("Cancel", "cancelbutton");
		
		// like other controls, you can pass in a joDataSource
		// which could be useful, so why not
		var z = new joButton(joPreference.bind("processname"));
	
	Extends
	-------
	
	- joControl
	
	Methods
	-------
	
	- enable()
	- disable()
	
*/

joButton = function(data, classname) {
	// call super
	joControl.apply(this, arguments);
	this.enabled = true;
	
	if (classname)
		this.container.className = classname;
};
joButton.extend(joControl, {
	tagName: "jobutton",
	
	createContainer: function() {
		var o = joDOM.create(this.tagName);

		if (o)
			o.setAttribute("tabindex", "1");
		
		return o;
	},

	enable: function() {
		this.container.setAttribute("tabindex", "1");
		return joControl.prototype.enable.call(this);
	},
	
	disable: function() {
		// this doesn't seem to work in safari doh
		this.container.removeAttribute("tabindex");
		return joControl.prototype.disable.call(this);
	}
});
/**
	- - -

	joBusy
	======
	
	The idea here is to make a generic "spinner" control which you
	can overlay on other controls. It's still in flux, don't use it
	just yet.
	
	Extends
	-------
	
	- joView
	
	Methods
	-------
	
	- `setMessage(status)`
	
	  You can update the status message in this busy box so users
	  have a better idea why the busy box is showing.
*/
	
joBusy = function(data) {
	joContainer.apply(this, arguments);
};
joBusy.extend(joContainer, {
	tagName: "jobusy",
	
	draw: function() {
		this.container.innerHTML = "";
		for (var i = 0; i < 9; i++)
			this.container.appendChild(joDom.create("jobusyblock"));
	},
	
	setMessage: function(msg) {
		this.message = msg || "";
	},
	
	setEvents: function() {
		return this;
	}
});
/**
	joList
	=======
	
	A widget class which expects an array of any data type and renders the
	array as a list. The list control handles DOM interactions with only a
	single touch event to determine which item was selected.
	
	Extends
	-------
	
	- joControl
	
	Events
	------
	
	- `selectEvent`
	
	  Fired when an item is selected from the list. The data in the call is the
	  index of the item selected.
	
	- `changeEvent`
	
	  Fired when the data is changed for the list.
	
	Methods
	-------

	- `formatItem(data, index)`
	
	  When subclassing or augmenting, this is the method responsible for
	  rendering a list item's data.
	
	- `compareItems(a, b)`
	
	  For sorting purposes, this method is called and should be overriden
	  to support custom data types.
	
			// general logic and approriate return values
			if (a > b)
				return 1;
			else if (a == b)
				return 0;
			else
				return -1

	- `setIndex(index)`
	- `getIndex()`
	
	  *DEPRECATED* USe `setValue()` and `getValue()` instead, see joControl.
	
	- `refresh()`
	
	- `setDefault(message)`
	
	  Will present this message (HTML string) when the list is empty.
	  Normally the list is empty; this is a convenience for "zero state"
	  UI requirements.

	- `getNodeData(index)`
	
	- `getLength()`
	
	- `next()`

	- `prev()`
	
	- `setAutoSort(boolean)`

*/
joList = function() {
	// these are being deprecated in the BETA
	// for now, we'll keep references to the new stuff
	this.setIndex = this.setValue;
	this.getIndex = this.getValue;
	
	joControl.apply(this, arguments);
};
joList.extend(joControl, {
	tagName: "jolist",
	defaultMessage: "",
	lastNode: null,
	value: null,
	autoSort: false,
	
	setDefault: function(msg) {
		this.defaultMessage = msg;
		
		if (typeof this.data === 'undefined' || !this.data || !this.data.length) {
			if (typeof msg === 'object') {
				this.innerHTML = "";
				if (msg instanceof joView)
					this.container.appendChild(msg.container);
				else if (msg instanceof HTMLElement)
					this.container.appendChild(msg);
			}
			else {
				this.innerHTML = msg;
			}
		}
		
		return this;
	},
	
	draw: function() {
		var html = "";
		var length = 0;

		if (typeof this.data === 'undefined' || !this.data || !this.data.length) {
			if (this.defaultMessage)
				this.container.innerHTML = this.defaultMessage;

			return;
		}

		for (var i = 0, l = this.data.length; i < l; i++) {
			var element = this.formatItem(this.data[i], i, length);

			if (element == null)
				continue;
			
			if (typeof element === "string")
				html += element;
			else
				this.container.appendChild((element instanceof joView) ? element.container : element);

			++length;
		}
		
		// support setting the contents with innerHTML in one go,
		// or getting back HTMLElements ready to append to the contents
		if (html.length)
			this.container.innerHTML = html;
		
		// refresh our current selection
		if (this.value >= 0)
			this.setValue(this.value, true);
			
		return;
	},

	deselect: function() {
		if (typeof this.container == 'undefined'
		|| !this.container['childNodes'])
			return;

		var node = this.getNode(this.value);
		if (node) {
			if (this.lastNode) {
				joDOM.removeCSSClass(this.lastNode, "selected");
				this.value = null;
			}
		}
		
		return this;
	},
	
	setValue: function(index, silent) {
		this.value = index;

		if (index == null)
			return;

		if (typeof this.container === 'undefined'
		|| !this.container
		|| !this.container.firstChild) {
			return this;
		}

		var node = this.getNode(this.value);
		if (node) {
			if (this.lastNode)
				joDOM.removeCSSClass(this.lastNode, "selected");

			joDOM.addCSSClass(node, "selected");
			this.lastNode = node;
		}
		
		if (index >= 0 && !silent) {
			this.fireSelect(index);
			this.changeEvent.fire(index);
		}
			
		return this;
	},
	
	getNode: function(index) {
		return this.container.childNodes[index];
	},

	fireSelect: function(index) {
		this.selectEvent.fire(index);
	},
	
	getValue: function() {
		return this.value;
	},
	
	onMouseDown: function(e) {
		joEvent.stop(e);

		var node = joEvent.getTarget(e);
		var index = -1;
		
		while (index == -1 && node !== this.container) {
			index = node.getAttribute("index") || -1;
			node = node.parentNode;
		}

		if (index >= 0)
			this.setValue(index);
	},
	
	refresh: function() {
//		this.value = null;
//		this.lastNode = null;

		if (this.autoSort)
			this.sort();

		joControl.prototype.refresh.apply(this);
	},

	getNodeData: function(index) {
		if (this.data && this.data.length && index >= 0 && index < this.data.length)
			return this.data[index];
		else
			return null;
	},
	
	getLength: function() {
		return this.length || this.data.length || 0;
	},
	
	sort: function() {
		this.data.sort(this.compareItems);
	},
	
	getNodeIndex: function(element) {
		var index = element.getAttribute('index');
		if (typeof index !== "undefined" && index != null)
		 	return parseInt(index)
		else
			return -1;
	},
	
	formatItem: function(itemData, index) {
		var element = document.createElement('jolistitem');
		element.innerHTML = itemData;
		element.setAttribute("index", index);

		return element;
	},

	compareItems: function(a, b) {
		if (a > b)
			return 1;
		else if (a == b)
			return 0;
		else
			return -1;
	},

	setAutoSort: function(state) {
		this.autoSort = state;
		return this;
	},
	
	next: function() {
		if (this.getValue() < this.getLength() - 1)
			this.setValue(this.value + 1);
	},
	
	prev: function() {
		if (this.getValue() > 0)
			this.setValue(this.value - 1);
	}
});
/**
	- - -

	joBusy
	======
	
	The idea here is to make a generic "spinner" control which you
	can overlay on other controls. It's still in flux, don't use it
	just yet.
	
	Extends
	-------
	
	- joView
	
	Methods
	-------
	
	- `setMessage(status)`
	
	  You can update the status message in this busy box so users
	  have a better idea why the busy box is showing.
*/
	
joBusy = function(data) {
	joContainer.apply(this, arguments);
};
joBusy.extend(joContainer, {
	tagName: "jobusy",
	
	draw: function() {
		this.container.innerHTML = "";
		for (var i = 0; i < 9; i++)
			this.container.appendChild(joDom.create("jobusyblock"));
	},
	
	setMessage: function(msg) {
		this.message = msg || "";
	},
	
	setEvents: function() {
		return this;
	}
});
/**
	joCaption
	=========
	
	Basically, a paragraph of text.
	
	Extends
	-------
	
	- joControl
	
*/
joCaption = function(data) {
	joControl.apply(this, arguments);
};
joCaption.extend(joControl, {
	tagName: "jocaption"
});

/**
	joCard
	======
	
	Special container for card views, more of an application-level view.
	
	Extends
	-------
	
	- joContainer
	
	Methods
	-------
	
	- `activate()`
	- `deactivate()`
	
	  These methods are called automatically by various joView objects, for
	  now joStack is the only one which does. Basically, allows you to add
	  application-level handlers to initialize or cleanup a joCard.
	
*/
joCard = function(data) {
	joContainer.apply(this, arguments);
};
joCard.extend(joContainer, {
	tagName: "jocard"
});

/**
	joStack
	========
	
 	A UI container which keeps an array of views which can be pushed and popped.
	The DOM elements for a given view are removed from the DOM tree when popped
	so we keep the render tree clean.

	Extends
	-------
	
	- joView

	Methods
	-------
	
	- `push(joView | HTMLElement)`	
	
	  Pushes a new joView (or HTMLELement) onto the stack.
	
	- `pop()`
	
	  Pulls the current view off the stack and goes back to the previous view.

	- `home()`
	
	  Return to the first view, pop everything else off the stack.

	- `show()`
	- `hide()`

	  Controls the visibility of the entire stack.

	- `forward()`
	- `back()`
	
	  Much like your browser forward and back buttons, only for the stack.
	
	- `setLocked(boolean)`
	
	  The `setLocked()` method tells the stack to keep the first view pushed onto the
	  stack set; that is, `pop()` won't remove it. Most apps will probably use this,
	  so setting it as a default for now.
	
	Events
	------
	
	- `showEvent`
	- `hideEvent`
	- `homeEvent`
	- `pushEvent`
	- `popEvent`
	
	Notes
	-----
	
	Should set classNames to new/old views to allow for CSS transitions to be set
	(swiping in/out, cross fading, etc). Currently, it does none of this.
	
	Also, some weirdness with the new `forward()` and `back()` methods in conjuction
	with `push()` -- need to work on that, or just have your app rigged to `pop()`
	on back to keep the nesting simple.
	
*/
joStack = function(data) {
	this.visible = false;

	this.data = [];

	joContainer.apply(this, arguments);

	// yes, nice to have one control, but we need an array
	if (this.data && !(this.data instanceof Array))
		this.data = [ this.data ];
	else if (this.data.length > 1)
		this.data = [ this.data[0] ];
		
	// we need to clear inlined stuff out for this to work
	if (this.container && this.container.firstChild)
		this.container.innerHTML = "";

	// default to keep first card on the stack; won't pop() off
	this.setLocked(true);

	this.pushEvent = new joSubject(this);
	this.popEvent = new joSubject(this);
	this.homeEvent = new joSubject(this);
	this.showEvent = new joSubject(this);
	this.hideEvent = new joSubject(this);
	this.backEvent = new joSubject(this);
	this.forwardEvent = new joSubject(this);

	this.index = 0;
	this.lastIndex = 0;
	this.lastNode = null;
};
joStack.extend(joContainer, {
	tagName: "jostack",
	type: "fixed",
	eventset: false,
	
	setEvents: function() {
		// do not setup DOM events for the stack
	},
	
	onClick: function(e) {
		joEvent.stop(e);
	},
	
	forward: function() {
		if (this.index < this.data.length - 1) {
			this.index++;
			this.draw();
			this.forwardEvent.fire();
		}
	},
	
	back: function() {
		if (this.index > 0) {
			this.index--;
			this.draw();
			this.backEvent.fire();
		}
	},
	
	draw: function() {
		if (!this.container)
			this.createContainer();
			
		if (!this.data || !this.data.length)
			return;

		// short term hack for webos
		// not happy with it but works for now
		jo.flag.stopback = this.index ? true : false;

		var container = this.container;
		var oldchild = this.lastNode;
		var newnode = getnode(this.data[this.index]);
		var newchild = this.getChildStyleContainer(newnode);

		function getnode(o) {
			return (o instanceof joView) ? o.container : o;
		}
		
		if (!newchild)
			return;
		
		if (this.index > this.lastIndex) {
			var oldclass = "prev";
			var newclass = "next";
			joDOM.addCSSClass(newchild, newclass);
		}
		else if (this.index < this.lastIndex) {
			var oldclass = "next";
			var newclass = "prev";
			joDOM.addCSSClass(newchild, newclass);
		}
		else {
//			this.getContentContainer().innerHTML = "";
		}

		this.appendChild(newnode);

		var self = this;
		var transitionevent = null;

		joDefer(animate, this, 1);
		
		function animate() {
			// FIXME: AHHH must have some sort of transition for this to work,
			// need to check computed style for transition to make this
			// better
			if (typeof window.onwebkittransitionend !== 'undefined')
				transitionevent = joEvent.on(newchild, "webkitTransitionEnd", cleanup, self);
			else
				joDefer(cleanup, this, 200);

			if (newclass && newchild)
				joDOM.removeCSSClass(newchild, newclass);

			if (oldclass && oldchild)
				joDOM.addCSSClass(oldchild, oldclass);
		}
		
		function cleanup() {
			if (oldchild) {
				self.removeChild(oldchild);
				joDOM.removeCSSClass(oldchild, "next");
				joDOM.removeCSSClass(oldchild, "prev");
			}

			if (newchild) {
				if (transitionevent)
					joEvent.remove(newchild, "webkitTransitionEnd", transitionevent);

				joDOM.removeCSSClass(newchild, "next");
				joDOM.removeCSSClass(newchild, "prev");
			}
		}

		if (typeof this.data[this.index].activate !== "undefined")
			this.data[this.index].activate.call(this.data[this.index]);
		
		this.lastIndex = this.index;
		this.lastNode = newchild;
	},

	appendChild: function(child) {
		this.container.appendChild(child);
	},
	
	getChildStyleContainer: function(child) {
		return child;
	},
	
	getChild: function() {
		return this.container.firstChild;
	},

	getContentContainer: function() {
		return this.container;
	},
	
	removeChild: function(child) {
		if (child && child.parentNode === this.container)
			this.container.removeChild(child);
	},
	
	isVisible: function() {
		return this.visible;
	},
	
	push: function(o) {
//		if (!this.data || !this.data.length || o !== this.data[this.data.length - 1])
//			return;
			
		// don't push the same view we already have
		if (this.data && this.data.length && this.data[this.data.length - 1] === o)
			return;
			
		this.data.push(o);
		this.index = this.data.length - 1;
		this.draw();
		this.pushEvent.fire(o);
	},

	// lock the stack so the first pushed view stays put
	setLocked: function(state) {
		this.locked = (state) ? 1 : 0;
	},
	
	pop: function() {
		if (this.data.length > this.locked) {
			var o = this.data.pop();
			this.index = this.data.length - 1;

			this.draw();
			
			if (typeof o.deactivate === "function")
				o.deactivate.call(o);

			if (!this.data.length)
				this.hide();
		}

		if (this.data.length > 0)
			this.popEvent.fire();
	},
	
	home: function() {
		if (this.data && this.data.length && this.data.length > 1) {
			var o = this.data[0];
			var c = this.data[this.index];
			
			if (o === c)
				return;
			
			this.data = [o];
			this.lastIndex = 1;
			this.index = 0;
//			this.lastNode = null;
			this.draw();
						
			this.popEvent.fire();
			this.homeEvent.fire();
		}
	},
	
	showHome: function() {
		this.home();
		
		if (!this.visible) {
			this.visible = true;
			joDOM.addCSSClass(this.container, "show");
			this.showEvent.fire();
		}
	},
	
	getTitle: function() {
		var c = this.data[this.index];
		if (typeof c.getTitle === 'function')
			return c.getTitle();
		else
			return false;
	},
	
	show: function() {
		if (!this.visible) {
			this.visible = true;
			joDOM.addCSSClass(this.container, "show");

			joDefer(this.showEvent.fire, this.showEvent, 500);
		}
	},
	
	hide: function() {
		if (this.visible) {
			this.visible = false;
			joDOM.removeCSSClass(this.container, "show");			

			joDefer(this.hideEvent.fire, this.hideEvent, 500);
		}
	}
});
/**
	joScroller
	==========
	
	A scroller container. Ultimately, mobile webkit implementations
	should properly support scrolling elements that have the CSS
	`overflow` property set to `scroll` or `auto`. Why don't they,
	anyway? Until some sanity is adopted, we need to handle this scrolling
	issue ourselves. joScroller expects a single child to manage
	scrolling for.
	
	Use
	---
	
		// make a scroller and set its child later
		var x = new joScroller();
		x.setData(myCard);
		
		// or define things inline, not always a good idea
		var y = new joScroller(new joList(mydata));
		
		// you can dump a big hunk of HTML in there, too
		// since jo wraps strings in a container element, this works
		var z = new joScroller('Some giant HTML as a string');

	Extends
	-------
	
	- joContainer
	
	Methods
	-------
	
	- `scrollBy(position)`
	- `scrollTo(position or joView or HTMLElement)`
	
	  Scrolls to the position or the view or element. If you
	  specify an element or view, make sure that element is a
	  child node, or you'll get interesting results.
	
	- `setScroll(horizontal, vertical)`
	
	  Tells this scroller to allow scrolling the vertical, horizontal, both or none.
	
		// free scroller
		z.setScroll(true, true);
		
		// horizontal
		z.setScroll(true, false);
		
		// no scrolling
		z.setScroll(false, false);
	
*/

joScroller = function(data) {
	this.points = [];
	this.eventset = false;

	this.horizontal = 0;
	this.vertical = 1;
	this.inMotion = false;
	this.moved = false;
	this.mousemove = null;
	this.mouseup = null;
	this.bump = 0;

	// Call Super
	joContainer.apply(this, arguments);
};
joScroller.extend(joContainer, {
	tagName: "joscroller",
	velocity: 1.6,
	transitionEnd: "webkitTransitionEnd",
	
	setEvents: function() {
		joEvent.capture(this.container, "click", this.onClick, this);
		joEvent.on(this.container, "mousedown", this.onDown, this);
	},
	
	onFlick: function(e) {
		// placeholder
	},
	
	onClick: function(e) {
		if (this.moved) {
			this.moved = false;
			joEvent.stop(e);
			joEvent.preventDefault(e);
		}
	},
	
	onDown: function(e) {
		joEvent.stop(e);

		this.reset();

		var node = this.container.firstChild;
		
		joDOM.removeCSSClass(node, "flick");
		joDOM.removeCSSClass(node, "flickback");
		joDOM.removeCSSClass(node, "flickfast");

		this.start = this.getMouse(e);
		this.points.unshift(this.start);
		this.inMotion = true;

		if (!this.mousemove) {
			this.mousemove = joEvent.capture(document.body, "mousemove", this.onMove, this);
			this.mouseup = joEvent.capture(document.body, "mouseup", this.onUp, this);
		}
	},
	
	reset: function() {
		this.points = [];
		this.moved = false;
		this.inMotion = false;
	},
	
	onMove: function(e) {
		if (!this.inMotion)
			return;
		
		joEvent.stop(e);
		e.preventDefault();
		
		var point = this.getMouse(e);
		
		var y = point.y - this.points[0].y;
		var x = point.x - this.points[0].x;

//		if (y == 0)
//			return;
		
		this.points.unshift(point);

		if (this.points.length > 7)
			this.points.pop();

		// cleanup points if the user drags slowly to avoid unwanted flicks
		var self = this;
		this.timer = window.setTimeout(function() {
			if (self.inMotion && self.points.length > 1)
				self.points.pop();
		}, 100);
		
		this.scrollBy(x, y, true);

		if (!this.moved && this.points.length > 3)
			this.moved = true;
	},

	onUp: function (e) {
		if (!this.inMotion)
			return;

		joEvent.remove(document.body, "mousemove", this.mousemove, true);
		joEvent.remove(document.body, "mouseup", this.mouseup, true);

		this.mousemove = null;
		this.inMotion = false;

		joEvent.stop(e);
		joEvent.preventDefault(e);

		var end = this.getMouse(e);
		var node = this.container.firstChild;

		var top = this.getTop();
		var left = this.getLeft();
		
		var dy = 0;
		var dx = 0;
		
		for (var i = 0; i < this.points.length - 1; i++) {
			dy += (this.points[i].y - this.points[i + 1].y);
			dx += (this.points[i].x - this.points[i + 1].x);
		}

		var max = 0 - node.offsetHeight + this.container.offsetHeight;
		var maxx = 0 - node.offsetWidth + this.container.offsetWidth;
		
		// if the velocity is "high" then it was a flick
		if ((Math.abs(dy) * this.vertical > 4 || Math.abs(dx) * this.horizontal > 4)) {
			var flick = dy * (this.velocity * (node.offsetHeight / this.container.offsetHeight));
			var flickx = dx * (this.velocity * (node.offsetWidth / this.container.offsetWidth));

			// we want to move quickly if we're going to land past
			// the top or bottom
			if ((flick + top < max || flick + top > 0)
			|| (flickx + left < maxx || flickx + left > 0)) {
				joDOM.addCSSClass(node, "flickfast");
			}
			else {
				joDOM.addCSSClass(node, "flick");
			}

			this.scrollBy(flickx, flick, false);

			joDefer(this.snapBack, this, 3000);
		}
		else {
			joDefer(this.snapBack, this, 10);
		}

	},
	
	getMouse: function(e) {
		return { 
			x: (this.horizontal) ? e.screenX : 0,
			y: (this.vertical) ? e.screenY : 0
		};
	},
	
	scrollBy: function(x, y, test) {
		var node = this.container.firstChild;

		var top = this.getTop();
		var left = this.getLeft();

		var dy = Math.floor(top + y);
		var dx = Math.floor(left + x);
		
		if (this.vertical && (node.offsetHeight <= this.container.offsetHeight))
			return;
			
		var max = 0 - node.offsetHeight + this.container.offsetHeight;
		var maxx = 0 - node.offsetWidth + this.container.offsetWidth;

		var ody = dy;
		var odx = dx;
		
		if (this.bump) {
			if (dy > this.bump)
				dy = this.bump;
			else if (dy < max - this.bump)
				dy = max - this.bump;

			if (dx > this.bump)
				dx = this.bump;
			else if (dy < maxx - this.bump)
				dx = maxx - this.bump;
		}

		if (!this.eventset)
			this.eventset = joEvent.capture(node, this.transitionEnd, this.snapBack, this);

		if (top != dx || left != dy)
			this.moveTo(dx, dy);
	},

	scrollTo: function(y, instant) {
		var node = this.container.firstChild;
		
		if (!node)
			return;

		if (typeof y == 'object') {
			if (y instanceof HTMLElement)
				var e = y;
			else if (y instanceof joView)
				var e = y.container;
				
			var t = 0 - e.offsetTop;
			var h = e.offsetHeight + 80;

			var y = top;

			var top = this.getTop();
			var bottom = top - this.container.offsetHeight;

			if (t - h < bottom)
				y = (t - h) + this.container.offsetHeight;

			if (y < t)
				y = t;
		}
		
		if (y < 0 - node.offsetHeight)
			y = 0 - node.offsetHeight;
		else if (y > 0)
			y = 0;

		if (!instant) {
			joDOM.addCSSClass(node, 'flick');
		}
		else {
			joDOM.removeCSSClass(node, 'flick');
			joDOM.removeCSSClass(node, 'flickback');
		}

		this.moveTo(0, y);
	},

	// called after a flick transition to snap the view
	// back into our container if necessary.
	snapBack: function() {
		var node = this.container.firstChild;
		var top = this.getTop();
		var left = this.getLeft();

		var dy = top;
		var dx = left;

		var max = 0 - node.offsetHeight + this.container.offsetHeight;
		var maxx = 0 - node.offsetWidth + this.container.offsetWidth;

		if (this.eventset)
			joEvent.remove(node, this.transitionEnd, this.eventset);
		
		this.eventset = null;

		joDOM.removeCSSClass(node, 'flick');
		
		if (dy > 0)
			dy = 0;
		else if (dy < max)
			dy = max;

		if (dx > 0)
			dx = 0;
		else if (dx < maxx)
			dx = maxx;

		if (dx != left || dy != top) {
			joDOM.addCSSClass(node, 'flickback');
			this.moveTo(dx, dy);
		}
	},

	setScroll: function(x, y) {
		this.horizontal = x ? 1 : 0;
		this.vertical = y ? 1 : 0;
		return this;
	},
	
	moveTo: function(x, y) {
		var node = this.container.firstChild;
		
		if (!node)
			return;
		
		this.setPosition(x * this.horizontal, y * this.vertical, node);

		node.jotop = y;
		node.joleft = x;
	},
	
	setPosition: function(x, y, node) {
		node.style.webkitTransform = "translate3d(" + x + "px, " + y + "px, 0)";
	},
	
	getTop: function() {
		return this.container.firstChild.jotop || 0;
	},

	getLeft: function() {
		return this.container.firstChild.joleft || 0;
	},
	
	setData: function(data) {
		joContainer.prototype.setData.apply(this, arguments);
	}
});
/**
	joDivider
	=========
	
	Simple visual divider.
	
	Extends
	-------
	
	- joView

*/
joDivider = function(data) {
	joView.apply(this, arguments);
};
joDivider.extend(joView, {
	tagName: "jodivider"
});

/**
	joExpando
	=========
	
	A compound UI element which allows the user to hide/show its contents.
	The first object passed in becomes the trigger control for the container,
	and the second becomes the container which expands and contracts. This
	action is controlled in the CSS by the presence of the "open" class.
	
	Use
	---
	
	This is a typical pattern:
	
		// normal look & feel
		var x = new joExpando([
			new joExpandoTitle("Options"),
			new joExpandoContent([
				new joLabel("Label"),
				new joInput("sample field")
			])
		]);
	
	Note that joExpando doesn't care what sort of controls you tell it
	to use. In this example, we have a joButton that hides and shows a
	DOM element:
		
		// you can use other things though
		var y = new joExpando([
			new joButton("More..."),
			joDOM.get("someelementid")
		]);
	
	Extends
	-------
	
	- joContainer
	
	Methods
	-------
	
	- `open()`
	- `close()`
	- `toggle()`
	
	Events
	------
	
	- `openEvent`
	- `closeEvent`

*/
joExpando = function(data) {
	this.openEvent = new joSubject(this);
	this.closeEvent = new joSubject(this);
	
	joContainer.apply(this, arguments);
};
joExpando.extend(joContainer, {
	tagName: "joexpando",
	
	draw: function() {
		if (!this.data)
			return;
		
		joContainer.prototype.draw.apply(this, arguments);
		this.setToggleEvent();
	},
	
	setEvents: function() {
	},
	
	setToggleEvent: function() {
		joEvent.on(this.container.childNodes[0], "click", this.toggle, this);
	},
	
	toggle: function() {
		if (this.container.className.indexOf("open") >= 0)
			this.close();
		else
			this.open();
	},
	
	open: function() {
		joDOM.addCSSClass(this.container, "open");
		this.openEvent.fire();
	},
	
	close: function() {
		joDOM.removeCSSClass(this.container, "open");
		this.closeEvent.fire();
	}
});


/**
	joExpandoContent
	================
	
	New widget to contain expando contents. This is normally used with
	joExpando, but not required.
	
	Extends
	-------
	- joContainer
*/
joExpandoContent = function() {
	joContainer.apply(this, arguments);
};
joExpandoContent.extend(joContainer, {
	tagName: "joexpandocontent"
});


/**

	joExpandoTitle
	==============
	
	Common UI element to trigger a joExpando. Contains a stylable
	arrow image which indicates open/closed state.
	
	Extends
	-------
	
	- joControl
	
	Use
	---
	
	See joExpando use.
	
*/
joExpandoTitle = function(data) {
	joControl.apply(this, arguments);
};
joExpandoTitle.extend(joControl, {
	tagName: "joexpandotitle",
	
	setData: function() {
		joView.prototype.setData.apply(this, arguments);
		this.draw();
	},
	
	draw: function() {
		this.container.innerHTML = this.data + "<joicon></joicon>";
	}
});
/**
	joFlexrow
	=========
	
	Uses the flexible box model in CSS to stretch elements evenly across a row.
	
	Use
	---
	
		// a simple row of things
		var x = new joFlexrow([
			new joButton("OK"),
			new joButton("Cancel")
		]);
		
		// making a control stretch
		var y = new joFlexrow(new joInput("Bob"));
		
	Extends
	-------
	
	- joContainer

*/
joFlexrow = function(data) {
	joContainer.apply(this, arguments);
};
joFlexrow.extend(joContainer, {
	tagName: "joflexrow"
});

/**
	joFlexcol
	=========
	
	Uses the flexible box model in CSS to stretch elements evenly across a column.
	
	Use
	---
	
		// fill up a vertical space with things
		var x = new joFlexcol([
			new joNavbar(),
			new joStackScroller()
		]);
	
	Extends
	-------
	
	- joContainer

*/
joFlexcol = function(data) {
	joContainer.apply(this, arguments);
};
joFlexcol.extend(joContainer, {
	tagName: "joflexcol"
});
/**
	joFocus
	=======
	
	Singleton which manages global input and event focus among joControl objects.
	
	Methods
	-------
	
	- `set(joControl)`
	
	  Unsets focus on the last control, and sets focus on the control passed in.
	
	- `clear()`
	
	  Unsets focus on the last control.
	
	- `refresh()`
	
	  Sets focus back to the last control that was focused.

*/

joFocus = {
	last: null,

	set: function(control) {
		if (this.last && this.last !== control)
			this.last.blur();
	
		if (control && control instanceof joControl) {
			control.focus();
			this.last = control;
		}
	},
	
	get: function(control) {
		return this.last;
	},
	
	refresh: function() {
//		joLog("joFocus.refresh()");
		if (this.last)
			this.last.focus();
	},
	
	clear: function() {
		this.set();
	}
};

/**
	joFooter
	======
	
	Attempt to make a filler object which pushed subsequent joView objects
	further down in the container if possible (to attach its contents to
	the bottom of a card, for eaxmple).
	
	> This behavior requires a working box model to attach properly to the bottom
	> of your container view.
	
	Extends
	-------
	
	- joContainer

*/
joFooter = function(data) {
	joContainer.apply(this, arguments);
};
joFooter.extend(joContainer, {
	tagName: "jofooter"
});
/**
	joGesture
	=========
	
	Experimental global gesture handler (keyboard, dpad, back, home, flick?).
	This needs a lot more fleshing out, so it's not (quite) ready for general
	consumption.
	
	Events
	------
	
	- `upEvent`
	- `downEvent`
	- `leftEvent`
	- `rightEvent`
	- `backEvent`
	- `forwardEvent`
	- `homeEvent`
	- `closeEvent`
	- `activateEvent`
	- `deactivateEvent`

	> Note that the events setup here are for the browser
	> or webOS. The `setEvents` method most likely needs to change
	> based on which OS you're running, although looking more deeply
	> into PhoneGap event layer.
	
*/
joGesture = {
	load: function() {
		this.upEvent = new joSubject(this);
		this.downEvent = new joSubject(this);
		this.leftEvent = new joSubject(this);
		this.rightEvent = new joSubject(this);
		this.forwardEvent = new joSubject(this);
		this.backEvent = new joSubject(this);
		this.homeEvent = new joSubject(this);
		this.closeEvent = new joSubject(this);
		this.activateEvent = new joSubject(this);
		this.deactivateEvent = new joSubject(this);
		this.resizeEvent = new joSubject(this);
		
		this.setEvents();
	},
	
	// by default, set for browser
	setEvents: function() {
		joEvent.on(document.body, "keydown", this.onKeyDown, this);
		joEvent.on(document.body, "keyup", this.onKeyUp, this);
		
		joEvent.on(document.body, "unload", this.closeEvent, this);
		joEvent.on(window, "activate", this.activateEvent, this);
		joEvent.on(window, "deactivate", this.deactivateEvent, this);
		
		joEvent.on(window, "resize", this.resize, this);
	},

	resize: function() {
		this.resizeEvent.fire(window);
	},

	onKeyUp: function(e) {
		if (!e)
			var e = window.event;
	
		if (e.keyCode == 18) {
			this.altkey = false;

			return;
		}

		if (e.keyCode == 27) {
			if (jo.flag.stopback) {
				joEvent.stop(e);
				joEvent.preventDefault(e);
			}

			this.backEvent.fire("back");
			return;
		}

		if (!this.altkey)
			return;
		
		joEvent.stop(e);
		
		switch (e.keyCode) {
			case 37:
				this.leftEvent.fire("left");
				break;
			case 38:
				this.upEvent.fire("up");
				break;
			case 39:
				this.rightEvent.fire("right");
				break;
			case 40:
				this.downEvent.fire("down");
				break;
			case 27:
				this.backEvent.fire("back");
				break;
			case 13:
				this.forwardEvent.fire("forward");
				break;
		}
	},
	
	onKeyDown: function(e) {
		if (!e)
			var e = window.event;
			
		if (e.keyCode == 27) {
			joEvent.stop(e);
			joEvent.preventDefault(e);
		}
		else if (e.keyCode == 13 && joFocus.get() instanceof joInput) {
			joEvent.stop(e);
		}
		else if (e.keyCode == 18) {
			this.altkey = true;
		}
		
		return;
	}
};
/**
	joGroup
	=======
	
	Group of controls, purely visual.
	
	Extends
	-------

	- joContainer
	
*/
joGroup = function(data) {
	joContainer.apply(this, arguments);
};
joGroup.extend(joContainer, {
	tagName: "jogroup"
});
/**
	joHTML
	======
	
	A simple HTML content control. One interesting feature is it intercepts all
	`<a>` tag interactions and fires off a `selectEvent` with the contents of
	the tag's `href` property.
	
	This is a relatively lightweight approach to displaying arbitrary HTML
	data inside your app, but it is _not_ recommended you allow external
	JavaScript inside the HTML chunk in question.
	
	Also keep in mind that your app document already _has_ `<html>`, `<head>` and
	`<body>` tags. When you use the `setData()` method on this view, _make sure
	you don't use any of these tags_ to avoid weird issues.
	
	> In a future version, it is feasible to load in stylesheets references in
	> the HTML document's `<head>` section. For now, that entire can of worms
	> will be avoided, and it's left up to you, the developer, to load in any
	> required CSS files using `joDOM.loadCSS()`.
	
	Extends
	-------
	
	- joControl
	
	Use
	---
	
		// simple html string
		var x = new joHTML("<h1>Hello World!</h1><p>Sup?</p>");
		
		// use a joDataSource like a file loader
		var y = new joHTML(new joFileSource("sample.html"));
	
*/
joHTML = function(data) {
	joControl.apply(this, arguments);
};
joHTML.extend(joControl, {
	tagName: "johtml",
	
	setEvents: function() {
		// limited events, no focus for example
		joEvent.on(this.container, "click", this.onClick, this);
	},
	
	// special sauce -- we want to trap any a href click events
	// and return them in our select event -- don't need to be
	// refreshing our entire page, after all
	onClick: function(e) {
		joEvent.stop(e);
		joEvent.preventDefault(e);
		
		// figure out what was clicked, look for an href
		var container = this.container;
		var hrefnode = findhref(joEvent.getTarget(e));
		
		if (hrefnode) {
			// whoa we have an <a> tag clicked
			this.selectEvent.fire(hrefnode.href);
		}
		
		function findhref(node) {
			if (!node)
				return null;

			if (node.href)
				return node;
				
			if (typeof node.parentNode !== "undefined" && node.parentNode !== container)
				return findhref(node.parentNode);
			else
				return null;
		}
	}
});

/**
	joInput
	=======
	
	Single-line text input control. When you instantiate or use `setData()`, you can
	either pass in an initial value or a reference to a joDataSource object which it,
	like other joControl instances, will bind to.
	
	Use
	---
	
		// simple value, simple field
		var x = new joInput(a);
		
		// set up a simple joRecord instance with some default data
		var pref = new joRecord({
			username: "Bob",
			password: "password"
		});
				
		// attach the value to a data structure property
		var y = new joInput(pref.link("username"));
	
	Extends
	-------
	
	- joControl
	
	Methods
	-------
	
	- `focus()`
	- `blur()`
	
	  You can manually set focus or call the `blur()` method (which also
	  triggers a data save).
	
	- `setData()`
	
	  Pass in either some arbitrary value for the control, or a reference to
	  a joDataSource if you want to automatically bind to a storage system
	  (e.g. joPreference).
	
*/
joInput = function(data) {
	joControl.apply(this, arguments);
};
joInput.extend(joControl, {
	tagName: "input",
	type: "text",
	
	setData: function(data) {
		if (data !== this.data) {
			this.data = data;
			
			if (typeof this.container.value !== "undefined")
				this.container.value = data;
			else
				this.container.innerHTML = data;

			this.changeEvent.fire(this.data);
		}
	},
	
	getData: function() {
		if (typeof this.container.value !== "undefined")
			return this.container.value;
		else
			return this.container.innerHTML;
	},
	
	enable: function() {
		this.container.setAttribute("tabindex", "1");
		joControl.prototype.enable.call(this);
	},
	
	disable: function() {
		this.container.removeAttribute("tabindex");
		joControl.prototype.disable.call(this);
	},	
	
	createContainer: function() {
		var o = joDOM.create(this);
		
		if (!o)
			return;
	
		o.setAttribute("type", "text");
		o.setAttribute("tabindex", "1");
		o.contentEditable = this.enabled;
		
		return o;
	},

	setEvents: function() {
		joControl.prototype.setEvents.call(this);
		joEvent.on(this.container, "keydown", this.onKeyDown, this);
	},
	
	onKeyDown: function(e) {
		if (e.keyCode == 13) {
			e.preventDefault();
			joEvent.stop(e);
		}
		return false;
	},
	
	draw: function() {
		if (this.container.value)
			this.value = this.data;
		else
			this.innerHTML = this.value;
	},
	
	onMouseDown: function(e) {
		joEvent.stop(e);
		this.focus();
	},
	
	storeData: function() {
		this.data = this.getData();
		if (this.dataSource)
			this.dataSource.set(this.value);
	}
});

/**
	joLabel
	=======
	
	Label view, purely a visual presentation. Usually placed in front
	of input fields and other controls.
	
	Extends
	-------
	
	- joView
	
*/
joLabel = function(data) {
	joControl.apply(this, arguments);
};
joLabel.extend(joControl, {
	tagName: "jolabel"
});

/**
	joMenu
	======
	
	Simple menu class with optional icons.
	
	Extends
	-------
	
	- joList
	
	Methods
	-------
	
	- `setData(menudata)`
	
	  See the example below for the format of the menu data.
	
	Use
	---
	
		// simple inline menu; you can always setup the menu items (or change
		// them) but using the `setData()` method, same as any joView
		var menu = new joMenu([
			{ title: "About" },
			{ title: "Frequently Asked Questions", id: "faq" },
			{ title: "Visit our website", id: "visit", icon: "images/web" }
		]);
		
		// simple inline function event handler
		menu.selectEvent.subscribe(function(id) {
			switch (id) {
			case "0":
				// the "About" line; if no id, the index of the menu item is used
				stack.push(aboutCard);
				break;
			case "faq":
				stack.push(faqCard);
				break;
			case "visit":
				stack.push(visitCard);
				break;
			}
		});
	
	Advanced Use
	------------
	
	This could actually be called "more consistent and simple" use. If your menus
	are static, you could always setup an id-based dispatch delegate which pushes
	the appropriate card based on the menu `id` selected.

	You could use the `id` in conjunction with view keys you create with joCache.
	The handler would then be something like:
	
		menu.selectEvent.subscribe(function(id) {
			mystack.push(joCache.get(id));
		});

*/
joMenu = function() {
	joList.apply(this, arguments);
};
joMenu.extend(joList, {
	tagName: "jomenu",
	itemTagName: "jomenuitem",
	value: null,

	fireSelect: function(index) {
		if (typeof this.data[index].id !== "undefined" && this.data[index].id)
			this.selectEvent.fire(this.data[index].id);
		else
			this.selectEvent.fire(index);
	},
	
	formatItem: function(item, index) {
		var o = joDOM.create(this.itemTagName);
		
		// TODO: not thrilled with this system of finding the
		// selected item. It's flexible but annoying to code to.
		o.setAttribute("index", index);
		
		// quick/dirty
		if (typeof item === "object") {
			o.innerHTML = item.title;
			if (item.icon) {
				o.style.backgroundImage = "url(" + item.icon + ")";
				joDOM.addCSSClass(o, "icon");
			}
		}
		else {
			o.innerHTML = item;
		}
		
		return o;
	}
});
/**
	joOption
	========
	
	This controls lets the user select one of a few options. Basically, this
	is a menu with a horizontal layout (depending on your CSS).
	
	Use
	---
	
		// simple set of options
		var x = new joOption([
			"Red",
			"Blue",
			"Green"
		]);
		
		// set the current value
		x.setValue(2);
		
		// or, associate the value with a joRecord property
		var pref = new joRecord();
		
		var y = new joOption([
			"Orange",
			"Banana",
			"Grape",
			"Lime"
		], pref.link("fruit"));
		
		// you can even associate the list with a datasource
		var fruits = new joDataSource( ... some query stuff ...);
		var z = new joOption(fruits, pref.link("fruit"));
	
	
	Extends
	-------
	
	- joMenu
	
*/
joOption = function() {
	joMenu.apply(this, arguments);
};
joOption.extend(joMenu, {
	tagName: "jooption",
	itemTagName: "jooptionitem"
});
/**
	joPasswordInput
	===============
	
	Secret data input field (e.g. displays `******` instead of `secret`).
	
	Extends
	-------
	
	- joInput
	
	> Note that this requires CSS3 which is known not to be currently supported
	> in Opera or Internet Explorer.

*/
joPasswordInput = function(data) {
	joInput.apply(this, arguments);
};
joPasswordInput.extend(joInput, {
	className: "password",
	type: "password"
});
/**
	joPopup
	=======
	
	A simple popup control. Pass in the UI contents as you would
	any other subclass of joContainer (e.g. joCard).
	
	Methods
	-------
	
	- `show()`
	- `hide()`
	
	  These do what you'd expect.

	Extends
	-------

	- joContainer
	
	Events
	------
	
	- `showEvent`
	- `hideEvent`
	

*/

joPopup = function() {
	this.showEvent = new joSubject(this);
	this.hideEvent = new joSubject(this);
	
	joContainer.apply(this, arguments);
};
joPopup.extend(joContainer, {
	tagName: "jopopup",

	setEvents: function() {
		joEvent.on(this.container, "mousedown", this.onClick, this);
	},
	
	onClick: function(e) {
		joEvent.stop(e);
	},
	
	hide: function() {
		joEvent.on(this.container, "webkitTransitionEnd", this.onHide, this);
		this.container.className = 'hide';
	},
	
	onHide: function() {
		this.hideEvent.fire();
	},
	
	show: function() {
		this.container.className = 'show';
		this.showEvent.fire();
	}
});
/**
	joScreen
	========
	
	Abstraction layer for the device screen. Uses document.body as its
	DOM element and allows other controls to be nested within (usually
	a joStack or other high-level containers or controls).
	
	Methods
	-------
	
	- `alert(title, message, buttons)`
	
	  Simple alert box. The `buttons` parameter is optional; a simple
	  "OK" button is added if nothing is specified.
	
	- `showPopup(joView)`
	- `hidePopup(joView)`
	
	  These methods allow you to do a completely custom modal joPopup.
	  Pass in either a joView, an array of them, or and HTMLElement
	  or a string, the same as you would when you create a joCard or
	  other child of joContainer.
	
	Extends
	-------
	
	- joContainer
	
	Use
	---
	
		var x = new joScreen([
			new joNav(),
			new joStack(),
			new joToolbar()
		]);
		
		// show a simple alert dialog
		x.alert("Hello", "This is an alert");
		
		// a more complex alert
		x.alert("Hola", "Do you like this alert?", [
			{ label: "Yes", action: yesFunction, context: this },
			{ label: "No", action: noFunction, context: this }
		]);
		
		// a completely custom popup
		x.showPopup(myView);
	
	Events
	------
	
	- `resizeEvent`
	- `menuEvent`
	- `activateEvent`
	- `deactivateEvent`
	- `backEvent`
	- `forwardEvent`
	
*/

joScreen = function() {
	this.resizeEvent = new joSubject(this);
	this.menuEvent = new joSubject(this);
	this.activateEvent = new joSubject(this);
	this.deactivateEvent = new joSubject(this);
	this.backEvent = new joSubject(this);
	this.forwardEvent = new joSubject(this);
	
	joContainer.apply(this, arguments);
};
joScreen.extend(joContainer, {
	tagName: "screen",
	
	setupEvents: function() {
		joEvent.on(window, "resize", this.resizeEvent.fire, this);
		joEvent.on(window, "appmenushow", this.menuEvent.fire, this);
		joEvent.on(window, "activate", this.activateEvent.fire, this);
		joEvent.on(window, "deactivate", this.deactivateEvent.fire, this);
		joEvent.on(window, "back", this.backEvent.fire, this);
	},
	
	createContainer: function() {
		return document.body;
	},
	
	// show a popup made from your own UI controls
	showPopup: function(data) {
		// take a view, a DOM element or some HTML and
		// make it pop up in the screen.
		if (!this.popup) {
			this.shim = new joShim(
				new joFlexcol([
					'&nbsp',
					this.popup = new joPopup(data),
					'&nbsp'
				])
			);
		}
		else {
			this.popup.setData(data);
		}
//		this.shim.showEvent.subscribe(this.popup.show, this);
		this.shim.show();
		this.popup.show();
	},
	
	hidePopup: function() {
		if (this.shim)
			this.shim.hide();
	},
	
	// shortcut to a simple alert dialog, not the most efficient
	// way to do this, but for now, it serves its purpose and
	// the API is clean enough.
	alert: function(title, msg, options, context) {
		var buttons = [];
		var callback;
		
		var context = (typeof context === 'object') ? context : null;
		
		if (typeof options === 'object') {
			if (options instanceof Array) {
				// we have several options
				for (var i = 0; i < options.length; i++)
					addbutton(options[i]);
			}
			else {
				addbutton(options);
			}
		}
		else if (typeof options === 'string') {
			addbutton({ label: options });
		}
		else {
			if (typeof options === 'function')
				callback = options;

			addbutton();
		}
	
		var view = [
			new joTitle(title),
			new joHTML(msg),
			buttons
		];
		this.showPopup(view);
		
		var self = this;
		
		function addbutton(options) {
			if (!options)
				var options = { label: 'OK' };

			var button = new joButton(options.label);
			button.selectEvent.subscribe(
				function() {
					if (options.action)
						options.action.call(options.context);
						
					defaultaction();
				}, options.context || self
			);
			
			buttons.push(button);
		}
		
		function defaultaction() {
			self.hidePopup();
			if (callback) {
				if (context)
					callback.call(context);
				else
					callback();
			}
		}
	}
});

/**
	joShim
	======
	
	A simple screen dimmer. Used mostly for popups and other
	modal use cases.

	Methods
	-------
	- `show()`
	- `hide()`

	  These do what you'd expect.
	
	Extends
	-------
	- joView
	
	Events
	------
	
	- `showEvent`
	- `hideEvent`

*/

joShim = function() {
	this.showEvent = new joSubject(this);
	this.hideEvent = new joSubject(this);
	this.selectEvent = new joSubject(this);
	
	joContainer.apply(this, arguments);
};
joShim.extend(joContainer, {
	tagName: "joshim",
	
	setEvents: function() {
		joEvent.on(this.container, "mousedown", this.onMouseDown, this);
	},
	
	onMouseDown: function(e) {
		joEvent.stop(e);
		this.hide();
//		this.selectEvent.fire();
	},
	
	hide: function() {
		this.container.className = '';
		joEvent.on(this.container, "webkitTransitionEnd", this.onHide, this);
	},
	
	show: function() {
		this.attach();

		this.container.className = 'show';
		joEvent.on(this.container, "webkitTransitionEnd", this.onShow, this);

		// default parent to the document body
		if (!this.lastParent)
			this.lastParent = document.body;
	},
	
	onShow: function() {
		this.showEvent.fire();
	},
	
	onHide: function() {
		this.detach();
		this.hideEvent.fire();
	}
});
/**
	joSound
	========
	
	Play preloaded sound effects using the HTML5 `Audio` object. This module could
	be wildly different for various platforms. Be warned.

	Methods
	-------
	
	- `play()`
	- `pause()`
	- `rewind()`
	- `stop()`
	
	  Basic sound controls.
	
	- `setLoop(n)`
	
	  Tell the joSound to automatically loop `n` times. Set to `-1` to loop
	  continuously until `pause()`.
	
	- `setVolume(level)`
	
	  Level is a decimal value from `0` to `1`. So, half volume would be `0.5`.
	
	Events
	------
	
	- `endedEvent`
	- `errorEvent`

*/
joSound = function(filename, repeat) {
	this.endedEvent = new joSubject(this);
	this.errorEvent = new joSubject(this);
	
	if (typeof Audio == 'undefined')
		return;

	this.filename = filename;
	this.audio = new Audio();
	this.audio.autoplay = false;
	
	if (!this.audio)
		return;
		
	joDefer(function() {
		this.audio.src = filename;
		this.audio.load();
	}, this, 5);
	
	this.setRepeatCount(repeat);

	joEvent.on(this.audio, "ended", this.onEnded, this);

//	this.pause();
};
joSound.prototype = {
	play: function() {
		if (!this.audio || this.audio.volume == 0)
			return;

		this.audio.play();
		
		return this;
	},

	onEnded: function(e) {
		this.endedEvent.fire(this.repeat);

		if (++this.repeat < this.repeatCount)
			this.play();
		else
			this.repeat = 0;
	},
	
	setRepeatCount: function(repeat) {
		this.repeatCount = repeat;
		this.repeat = 0;

		return this;
	},
	
	pause: function() {
		if (!this.audio)
			return;

		this.audio.pause();

		return this;
	},

	rewind: function() {
		if (!this.audio)
			return;

		try {
			this.audio.currentTime = 0.0;			
		}
		catch (e) {
			joLog("joSound: can't rewind...");
		}
		
		this.repeat = 0;

		return this;
	},

	stop: function() {
		this.pause();
		this.rewind();
		
		this.repeat = 0;

		return this;
	},
	
	setVolume: function(vol) {
		if (!this.audio || vol < 0 || vol > 1)
			return;

		this.audio.volume = vol;

		return this;
	}
};
/**
	joStackScroller
	===============
	
	What happens when you mix joStack and joScroller? You get this
	class. Use exactly as you would joStack, only it automatically
	puts a scroller in the stack as needed. At some point, this
	might get folded into joStack, but for now it's a special class.
	
	It also handles the `scrollTo()` and `scrollBy()` methods from
	joScroller.
	
	Extends
	-------
	- joStack
	- joScroller
*/

joStackScroller = function(data) {
	this.scrollers = [
		new joScroller(),
		new joScroller()
	];
	this.scroller = this.scrollers[0];

	joStack.apply(this, arguments);
	
	this.scroller.attach(this.container);
};
joStackScroller.extend(joStack, {
	type: "scroll",
	scrollerindex: 1,
	scroller: null,
	scrollers: [],
	
	switchScroller: function() {
		this.scrollerindex = this.scrollerindex ? 0 : 1;
		this.scroller = this.scrollers[this.scrollerindex];
	},
	
	getLastScroller: function() {
		return this.scrollers[this.scrollerindex ? 0 : 1];
	},
	
	scrollTo: function(something) {
		this.scroller.scrollTo(something);
	},
	
	scrollBy: function(y) {
		this.scroller.scrollBy(y);
	},

	getChildStyleContainer: function() {
		return this.scroller.container;
	},
	
	getContentContainer: function() {
		return this.scroller.container;
	},

	appendChild: function(child) {
		var scroller = this.scroller;
		scroller.setData(child);
		this.container.appendChild(scroller.container);
	},
	
	getChild: function() {
		return this.scroller.container || null;
	},

	forward: function() {
		if (this.index < this.data.length - 1)
			this.switchScroller();
			
		joStack.prototype.forward.call(this);
	},
	
	back: function() {
		if (this.index > 0)
			this.switchScroller();

		joStack.prototype.forward.call(this);
	},

	home: function() {
		if (this.data && this.data.length && this.data.length > 1) {
			this.switchScroller();
			joStack.prototype.home.call(this);
		}
	},
		
	push: function(o) {
		// don't push the same view we already have
		if (this.data && this.data.length && this.data[this.data.length - 1] === o)
			return;
			
		this.switchScroller();

		joDOM.removeCSSClass(o, 'flick');
		joDOM.removeCSSClass(o, 'flickback');

		this.scroller.setData(o);
		this.scroller.scrollTo(0, true);

		joStack.prototype.push.call(this, o);
	},
	
	pop: function() {
		if (this.data.length > this.locked)
			this.switchScroller();

		joStack.prototype.pop.call(this);
	}
});

/**
	joTabBar
	=========
	
	Tab bar widget.
	
	Extends
	-------
	
	- joList

	Model
	-----
	
	Data is expected to be an array of `{ type: "", label: ""}` objects,
	in the display order for the bar.

*/
joTabBar = function() {
	joList.apply(this, arguments);
};
joTabBar.extend(joList, {
	tagName: "jotabbar",
	
	formatItem: function(data, index) {
		var o = document.createElement("jotab");

		if (data.label)
			o.innerHTML = data.label;
		
		if (data.type)
			o.className = data.type;

		o.setAttribute("index", index);
		
		return o;
	}
});
/**
	joTable
	=======
	
	Table control, purely visual representation of tabular data (usually
	an array of arrays).
	
	Use
	---
	
		// simple table with inline data
		var x = new joTable([
			["Nickname", "Phone", "Email"],
			["Bob", "555-1234", "bob@bobco.not"],
			["Jo", "555-3456", "jo@joco.not"],
			["Jane", "555-6789", "jane@janeco.not"]
		]);
		
		// we can respond to touch events in the table
		x.selectEvent.subscribe(function(index, table) {
			// get the current row and column
			joLog("Table cell clicked:", table.getRow(), table.getCol());
			
			// you can also get at the cell HTML element as well
			joDOM.setStyle(table.getNode(), { fontWeight: "bold" });
		});

	Extends
	-------

	- joList

	Methods
	-------

	- `setCell(row, column)`

	  Sets the active cell for the table, also makes it editiable and sets focus.

	- `getRow()`, `getCol()`

	  Return the current row or column
*/

joTable = function(data) {
	joList.apply(this, arguments);
};
joTable.extend(joList, {
	tagName: "jotable",
	
	// default row formatter
	formatItem: function(row, index) {
		var tr = document.createElement("tr");
		
		for (var i = 0, l = row.length; i < l; i++) {
			var o = document.createElement(index ? "td" : "th");
			o.innerHTML = row[i];
			
			// this is a little brittle, but plays nicely with joList's select event
			o.setAttribute("index", index * l + i);
			tr.appendChild(o);
		}
		
		return tr;
	},

	// override joList's getNode
	getNode: function(index) {
		var row = this.getRow(index);
		var col = this.getCol(index);
		
		return this.container.childNodes[row].childNodes[col];
	},
	
	getRow: function(index) {
		if (typeof index == "undefined")
			var index = this.getIndex();
			
		var rowsize = this.data[0].length;
		return Math.floor(index / rowsize);
	},

	getCol: function(index) {
		if (typeof index == "undefined")
			var index = this.getIndex();
			
		var rowsize = this.data[0].length;
		return index % rowsize;
	}	
});

/**
	joTextarea
	==========
	
	Multi-line text input control. When you instantiate or use `setData()`, you can
	either pass in an initial value or a reference to a joDataSource object which it,
	like other joControl instances, will bind to.
	
	Basically, this is just a multi-line version of joInput.
	
	Use
	---
	
		// simple multi-line field
		var sample = "This is some sample text to edit.";
		var x = new joTextarea(sample);
		
		// setting the style inline using chaining
		var f = new joTextarea(sample).setStyle({
			minHeight: "100px",
			maxHeight: "300px"
		});
		
		// adding a simple change event handler using chaining
		var h = new joTextarea(sample).changeEvent.subscribe(function(data) {
			joLog("text area changed:", data);
		});

		// attach the value to a preference
		var y = new joTextarea(joPreference.bind("username"));
		
		// attach input control to a custom joDataSource
		var username = new joDataSource("bob");
		var z = new joTextarea(username);
	
	Extends
	-------
	
	- joInput
	
*/
joTextarea = function(data) {
	joInput.apply(this, arguments);
};
joTextarea.extend(joInput, {
	tagName: "textarea",
	
	onKeyDown: function(e) {
		// here we want the enter key to work, overriding joInput's behavior
		return false;
	}
});

/**
	joTitle
	=======
	
	Title view, purely a visual presentation.
	
	Extends
	-------
	
	- joContainer

*/
joTitle = function(data) {
	joView.apply(this, arguments);
};
joTitle.extend(joView, {
	tagName: "jotitle"
});

/**
	joToolbar
	=========

	Locks UI controls to the bottom of whatever you put this container into.
	
	Extends
	-------
	
	- joContainer

*/
joToolbar = function(data) {
	joContainer.apply(this, arguments);
};
joToolbar.extend(joContainer, {
	tagName: "jotoolbar"
});
joForm = function() {
	joContainer.apply(this, arguments);
};
joForm.extend(joContainer, {
	tagName: "form"
});/**
	joDialog
	========
	
	This is a higher level container that wraps a joPopup with a joShim.
*/
joDialog = function(data) {
	joShim.call(this, new joFlexcol([
		'',
		new joPopup(
			new joScroller(data)
		).setStyle("show"),
		''
	]));
};
joDialog.extend(joShim, {
});
/**
	joSelectList
	============
	
	A selection list of options used by joSelect.
	
	Extends
	-------
	
	- joList
*/

joSelectList = function() {
	joList.apply(this, arguments);
};
joSelectList.extend(joList, {
	tagName: "joselectlist"
});
/**
	joNavbar
	========
	
	Floating navigation control. Usually tied to a joStack or joStackScroller.
	Will handle display of a "back" button (controllable in CSS) and show the
	title string of the current view in a stack (if it exists).

	Use
	---
	
		// make a stack
		var stack = new joStackScroller();
		
		// new navbar
		var x = new joNavbar();
		
		// link to a stack
		x.setStack(stack);
		
	Methods
	-------
	
	- `back()`
	
	  Signals the associated stack to move back in its stack (i.e. calls
	  the stack's `pop()` method).
	
	- `setStack(joStack or joStackScroller)`
	
	  Links this control to a stack.
	
*/

joNavbar = function(title) {
	if (title)
		this.firstTitle = title;
	
	var ui = [
		this.titlebar = new joView(title || '&nbsp;').setStyle('title'),
		new joFlexrow([this.back = new joBackButton('Back').selectEvent.subscribe(this.back, this), ""])
	];
	
	joContainer.call(this, ui);
};
joNavbar.extend(joContainer, {
	tagName: "jonavbar",
	stack: null,
	
	back: function() {
		if (this.stack)
			this.stack.pop();
	},
	
	setStack: function(stack) {
		if (this.stack) {
			this.stack.pushEvent.unsubscribe(this.update, this);
			this.stack.popEvent.unsubscribe(this.update, this);
		}
		
		if (!stack) {
			this.stack = null;
			return;
		}
		
		this.stack = stack;
		
		stack.pushEvent.subscribe(this.update, this);
		stack.popEvent.subscribe(this.update, this);

		this.refresh();
	},

	update: function() {
		if (!this.stack)
			return;
		
		joDOM.removeCSSClass(this.back, 'selected');
		joDOM.removeCSSClass(this.back, 'focus');

//		console.log('update ' + this.stack.data.length);
		
		if (this.stack.data.length > 1)
			joDOM.addCSSClass(this.back, 'active');
		else
			joDOM.removeCSSClass(this.back, 'active');
			
		var title = this.stack.getTitle();

		if (typeof title === 'string')
			this.titlebar.setData(title);
		else
			this.titlebar.setData(this.firstTitle);
	},
	
	setTitle: function(title) {
		this.titlebar.setData(title);
		this.firstTitle = title;
		return this;
	}
});


/**
	joBackButton
	============
	
	A "back" button, which can be made to be shown only in appropriate
	platforms (e.g. iOS, Safari, Chrome) through CSS styling.
	
	See joNavbar for more information.
	
	Extends
	-------
	
	- joButton
	
*/
joBackButton = function() {
	joButton.apply(this, arguments);
};
joBackButton.extend(joButton, {
	tagName: "jobackbutton"
});
/**
	joSelect
	========
	
	Multi-select control which presents a set of options for the user
	to choose from.
	
	Methods
	-------
	
	- `setValue(value)`
	
	  Set the current value, based on the index for the option list.
	
	- `getValue()`
	
	  Returns the index of the current selected item.
		
	Extends
	-------
	
	- joExpando
	
	Consumes
	--------
	
	- joSelectTitle
	- joSelectList
	
	Properties
	----------
	
	- `field`
	
	  Reference to the value field for this control.
	
	- `list`
	
	  Reference to the joSelectList for this control.
	
	Use
	---
	
		// pass in an array of options
		var x = new joSelect([ "Apples", "Oranges", "Grapes" ]);
		
		// pass in a current value
		var y = new joSelect([ "Apples", "Oranges", "Grapes" ], 2);
		
		// respond to the change event
		y.changeEvent = function(value, list) {
			console.log("Fruit: " + list.getNodeValue(value));
		});
	
*/
joSelect = function(data, value) {
	var v = value;
	if (value instanceof joDataSource)
		v = value.getData();
	
	var ui = [
		this.field = new joSelectTitle(v),
		this.list = new joSelectList(data, value)
	];
	
	this.field.setList(this.list);
	
	this.changeEvent = this.list.changeEvent;
	this.selectEvent = this.list.selectEvent;
	
	joExpando.call(this, ui);
	this.container.setAttribute("tabindex", 1);
	
	this.field.setData(this.list.value);

	this.list.selectEvent.subscribe(this.setValue, this);
};
joSelect.extend(joExpando, {
	setValue: function(value, list) {
		if (list) {
			this.field.setData(value);
			this.close();
		}
		else {
			this.field.setData(value);
		}
	},
	
	getValue: function() {
		return this.list.getValue();
	},
	
	setEvents: function() {
		joControl.prototype.setEvents.call(this);
	},
	
	onBlur: function(e) {
		joEvent.stop(e);
		joDOM.removeCSSClass(this, "focus");
		this.close();
	}
});

/**
	joSelectTitle
	=============
	
	joSelect flavor of joExpandoTitle.
	
	Extends
	-------
	
	- joExpandoTitle
*/
joSelectTitle = function() {
	joExpandoTitle.apply(this, arguments);
};
joSelectTitle.extend(joExpandoTitle, {
	list: null,

	setList: function(list) {
		this.list = list;
	},
	
	setData: function(value) {
		if (this.list)
			joExpandoTitle.prototype.setData.call(this, this.list.getNodeData(value) || "Select...");
		else
			joExpandoTitle.prototype.setData.call(this, value);
	}
});
/**
	joToggle
	========
	
	Boolean widget (on or off).
	
	Methods
	-------
	
	- `setLabels(Array)`
	
	You can change the labels for this control, which default to "Off" and "On".
	
	Extends
	-------
	
	- joControl
	
	Use
	---
	
		// simple
		var x = new joToggle();
		
		// with value
		var y = new joToggle(true);
		
		// with custom labels
		var z = new joToggle().setLabels(["No", "Yes"]);
		
	See Data Driven Controls for more examples.
	
*/
joToggle = function(data) {
	joControl.call(this, data);
};
joToggle.extend(joControl, {
	tagName: "jotoggle",
	button: null,
	labels: ["Off", "On"],

	setLabels: function(labels) {
		if (labels instanceof Array)
			this.labels = labels;
		else if (arguments.length == 2)
			this.labels = arguments;

		this.draw();
			
		return this;
	},

	select: function(e) {
		if (e)
			joEvent.stop(e);

		this.setData((this.data) ? false : true);
	},

	onBlur: function(e) {
		joEvent.stop(e);
		this.blur();
	},
	
	draw: function() {
		if (!this.container)
			return;

		if (!this.container.firstChild) {
			this.button = joDOM.create("div");
			this.container.appendChild(this.button);
		}
		
		this.button.innerHTML = this.labels[(this.data) ? 1 : 0];

		if (this.data)
			joDOM.addCSSClass(this.container, "on");
		else
			joDOM.removeCSSClass(this.container, "on");
	}
});
/**
	joSlider
	========
	
	Slider control, horizontal presentation (may be extended later to allow for
	vertical and x/y).
	
	Extends
	-------
	
	- joControl
	
	Methods
	-------
	
	- `setRange(min, max, snap)`
	
	Where `min`/`max` is a number, either integer or decimal, doesn't matter. If `max`
	and `min` are integers, then `snap` defaults to `1`, otherwise it is set to `0` (no
	snap, which allows free movement).
	
	The optional `snap` value adjusts the granularuty of choices. Set to `0` for
	free-floating, or any other positive number. Any `snap` that is less than `0`
	or greater than the total range of possible values will be ignored.
	
	Use
	---
	
		// basic slider, will allow any decimal value
		// between 0 and 1, defaults to 0
		var x = new joSlider();
		
		// custom range and default value set
		var y = new joSlider(0).setRange(-10, 10);
		
		// percent slider, with 5% snap
		var z = new joSlider(0).setRange(0, 100, 5);
		
		// responding to change events
		var r = new joSlider().changEvent.subscribe(function(value) {
			console.log(value);
		}, this);

*/

joSlider = function(value) {
	this.min = 0;
	this.max = 1;
	this.snap = 0;
	this.range = 1;
	this.thumb = null;
	this.horizontal = 1;
	this.vertical = 0;
	this.moved = false;
	this.jump = true;

	joControl.call(this, null, value);
};
joSlider.extend(joControl, {
	tagName: "joslider",
	
	setRange: function(min, max, snap) {
		if (min >= max) {
			joLog("WARNING: joSlider.setRange, min must be less than max.");
			return this;
		}
		
		this.min = min || 0;
		this.max = max || 1;
		
		if (min < 0 && max >= 0)
			this.range = Math.abs(min) + max;
		else if (min < 0 && max <= 0)
			this.range = min - max;
		else
			this.range = max - min;

		if (typeof snap !== 'undefined')
			this.snap = (snap >= 0 && snap <= this.range) ? snap : 0;
		else
			this.snap = 0;
			
		this.setValue(this.value);
			
		return this;
	},
	
	setValue: function(value, silent) {
		var v = this.adjustValue(value);
		
		if (v != this.value) {
			joControl.prototype.setValue.call(this, v);
			if (!silent)
				this.draw();
		}
			
		return this;
	},
	
	adjustValue: function(v) {
		var value = v;
		
		if (this.snap)
			value = Math.floor(value / this.snap) * this.snap;

		if (value < this.min)
			value = this.min;
		else if (value > this.max)
			value = this.max;
			
		return value;
	},
	
	createContainer: function() {
		var o = joDOM.create(this.tagName);

		if (o) {
			o.setAttribute("tabindex", "1");
			
			var t = joDOM.create("josliderthumb");
			o.appendChild(t);
			this.thumb = t;
		}
		
		return o;
	},
		
	onDown: function(e) {
		joEvent.stop(e);

		this.reset();
		
		var node = this.container.firstChild;
		
		this.inMotion = true;
		this.moved = false;

		if (!this.mousemove) {
			this.mousemove = joEvent.on(document.body, "mousemove", this.onMove, this);
			this.mouseup = joEvent.capture(document.body, "mouseup", this.onUp, this);
		}
	},

	reset: function() {
		this.moved = false;
		this.inMotion = false;
		this.firstX = -1;
		this.firstY = -1;
	},

	onMove: function(e) {
		if (!this.inMotion)
			return;

		joEvent.stop(e);
		e.preventDefault();
		
		var point = this.getMouse(e);

		var y = point.y;
		var x = point.x;
		
		if (this.firstX == -1) {
			this.firstX = x;
			this.firstY = y;
			
			this.ox = this.thumb.offsetLeft;
			this.oy = this.thumb.offsetTop;
		}		

		var x = (x - this.firstX) + this.ox;
		var y = (y - this.firstY) + this.oy;
		
		if (x > 4 || y > 4)
			this.moved = true;
		
		var t = this.thumb.offsetWidth;
		var w = this.container.offsetWidth - t;

		if (x < 0)
			x = 0;
		else if (x > w)
			x = w;

		if (!this.snap)
			this.moveTo(x);

		this.setValue((x / w) * this.range + this.min, !this.snap);
	},
	
	moveTo: function(x) {
		this.thumb.style.left = x + "px";
	},

	initValue: function(value) {
		var t = this.container.firstChild.offsetWidth;
		var w = this.container.offsetWidth - t;

		var x = Math.floor((this.value / this.range) * w);
		
		this.moveTo(x);
		
		return this;
	},

	onUp: function (e) {
		if (!this.inMotion)
			return;

		joEvent.remove(document.body, "mousemove", this.mousemove);
		joEvent.remove(document.body, "mouseup", this.mouseup);
		this.mousemove = null;

		joEvent.stop(e);
		joEvent.preventDefault(e);
		
		joDefer(function() {
			this.reset();
		}, this);
	},
	
	setEvents: function() {
		joEvent.on(this.container, "click", this.onClick, this);
		joEvent.on(this.thumb, "mousedown", this.onDown, this);
		
		// we have to adjust if the window changes size
		joGesture.resizeEvent.subscribe(this.draw, this);
		
		console.log('setevents');
	},

	onClick: function(e) {
		if (this.inMotion || this.moved)
			return;
		
		joEvent.stop(e);
		joEvent.preventDefault(e);
		
		var point = this.getMouse(e);
		
		var l = joDOM.pageOffsetLeft(this.container);
//		console.log(l);
		
		var x = Math.floor((point.x - l) - this.thumb.offsetWidth * 1.5);
		
//		console.log(x);

		var t = this.thumb.offsetWidth;
		
		x = x - t;
		
		var w = this.container.offsetWidth - t;

		if ((x < t && this.snap) || x < 0)
			x = 0;
		else if (x > w)
			x = w;

//		this.moveTo(x);

		this.setValue((x / w) * this.range + this.min);
	},
	
	getMouse: function(e) {
		return { 
			x: (this.horizontal) ? e.screenX : 0,
			y: (this.vertical) ? e.screenY : 0
		};
	},
	
	draw: function() {
		if (!this.container)
			this.setContainer();

		this.initValue(this.value);
	}
});

