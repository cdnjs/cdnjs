/*
 * FuncUnit - 2.0.4
 * http://funcunit.com
 * Copyright (c) 2013 Bitovi
 * Tue, 19 Nov 2013 20:58:56 GMT
 * Licensed MIT */

/*
 * Syn - 3.3.1
 * 
 * Copyright (c) 2013 Bitovi
 * Tue, 08 Oct 2013 00:20:41 GMT
 * Licensed MIT */

!function(window) {

// ## synthetic.js
var __m2 = (function(){
	//allow for configuration of Syn
	var opts = window.Syn ? window.Syn : {};

	var extend = function( d, s ) {
		var p;
		for (p in s) {
			d[p] = s[p];
		}
		return d;
	},
		// only uses browser detection for key events
		browser = {
			msie: !! (window.attachEvent && !window.opera),
			opera: !! window.opera,
			webkit: navigator.userAgent.indexOf('AppleWebKit/') > -1,
			safari: navigator.userAgent.indexOf('AppleWebKit/') > -1 && navigator.userAgent.indexOf('Chrome/') === -1,
			gecko: navigator.userAgent.indexOf('Gecko') > -1,
			mobilesafari: !! navigator.userAgent.match(/Apple.*Mobile.*Safari/),
			rhino: navigator.userAgent.match(/Rhino/) && true
		},
		createEventObject = function( type, options, element ) {
			var event = element.ownerDocument.createEventObject();
			return extend(event, options);
		},
		data = {},
		id = 1,
		expando = "_synthetic" + new Date().getTime(),
		bind, unbind, key = /keypress|keyup|keydown/,
		page = /load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll/,
		//this is maintained so we can click on html and blur the active element
		activeElement,

		/**
		 * @class Syn
		 * @download funcunit/dist/syn.js
		 * @test funcunit/synthetic/qunit.html
		 * Syn is used to simulate user actions.  It creates synthetic events and
		 * performs their default behaviors.
		 * 
		 * <h2>Basic Use</h2>
		 * The following clicks an input element with <code>id='description'</code>
		 * and then types <code>'Hello World'</code>.
		 * 
		 @codestart
		 Syn.click({},'description')
		 .type("Hello World")
		 @codeend
		 * <h2>User Actions and Events</h2>
		 * <p>Syn is typically used to simulate user actions as opposed to triggering events. Typing characters
		 * is an example of a user action.  The keypress that represents an <code>'a'</code>
		 * character being typed is an example of an event. 
		 * </p>
		 * <p>
		 *   While triggering events is supported, it's much more useful to simulate actual user behavior.  The 
		 *   following actions are supported by Syn:
		 * </p>
		 * <ul>
		 *   <li><code>[Syn.prototype.click click]</code> - a mousedown, focus, mouseup, and click.</li>
		 *   <li><code>[Syn.prototype.dblclick dblclick]</code> - two <code>click!</code> events followed by a <code>dblclick</code>.</li>
		 *   <li><code>[Syn.prototype.key key]</code> - types a single character (keydown, keypress, keyup).</li>
		 *   <li><code>[Syn.prototype.type type]</code> - types multiple characters into an element.</li>
		 *   <li><code>[Syn.prototype.move move]</code> - moves the mouse from one position to another (triggering mouseover / mouseouts).</li>
		 *   <li><code>[Syn.prototype.drag drag]</code> - a mousedown, followed by mousemoves, and a mouseup.</li>
		 * </ul>
		 * All actions run asynchronously.  
		 * Click on the links above for more 
		 * information on how to use the specific action.
		 * <h2>Asynchronous Callbacks</h2>
		 * Actions don't complete immediately. This is almost 
		 * entirely because <code>focus()</code> 
		 * doesn't run immediately in IE.
		 * If you provide a callback function to Syn, it will 
		 * be called after the action is completed.
		 * <br/>The following checks that "Hello World" was entered correctly: 
		 @codestart
		 Syn.click({},'description')
		 .type("Hello World", function(){
		 
		 ok("Hello World" == document.getElementById('description').value)  
		 })
		 @codeend
		 <h2>Asynchronous Chaining</h2>
		 <p>You might have noticed the [Syn.prototype.then then] method.  It provides chaining
		 so you can do a sequence of events with a single (final) callback.
		 </p><p>
		 If an element isn't provided to then, it uses the previous Syn's element.
		 </p>
		 The following does a lot of stuff before checking the result:
		 @codestart
		 Syn.type('ice water','title')
		 .type('ice and water','description')
		 .click({},'create')
		 .drag({to: 'favorites'},'newRecipe',
		 function(){
		 ok($('#newRecipe').parents('#favorites').length);
		 })
		 @codeend
		 
		 <h2>jQuery Helper</h2>
		 If jQuery is present, Syn adds a triggerSyn helper you can use like:
		 @codestart
		 $("#description").triggerSyn("type","Hello World");
		 @codeend
		 * <h2>Key Event Recording</h2>
		 * <p>Every browser has very different rules for dispatching key events.  
		 * As there is no way to feature detect how a browser handles key events,
		 * synthetic uses a description of how the browser behaves generated
		 * by a recording application.  </p>
		 * <p>
		 * If you want to support a browser not currently supported, you can
		 * record that browser's key event description and add it to
		 * <code>Syn.key.browsers</code> by it's navigator agent.
		 * </p>
		 @codestart
		 Syn.key.browsers["Envjs\ Resig/20070309 PilotFish/1.2.0.10\1.6"] = {
		 'prevent':
		 {"keyup":[],"keydown":["char","keypress"],"keypress":["char"]},
		 'character':
		 { ... }
		 }
		 @codeend
		 * <h2>Limitations</h2>
		 * Syn fully supports IE 6+, FF 3+, Chrome, Safari, Opera 10+.
		 * With FF 1+, drag / move events are only partially supported. They will
		 * not trigger mouseover / mouseout events.<br/>
		 * Safari crashes when a mousedown is triggered on a select.  Syn will not 
		 * create this event.
		 * <h2>Contributing to Syn</h2>
		 * Have we missed something? We happily accept patches.  The following are 
		 * important objects and properties of Syn:
		 * <ul>
		 * 	<li><code>Syn.create</code> - contains methods to setup, convert options, and create an event of a specific type.</li>
		 *  <li><code>Syn.defaults</code> - default behavior by event type (except for keys).</li>
		 *  <li><code>Syn.key.defaults</code> - default behavior by key.</li>
		 *  <li><code>Syn.keycodes</code> - supported keys you can type.</li>
		 * </ul>
		 * <h2>Roll Your Own Functional Test Framework</h2>
		 * <p>Syn is really the foundation of JavaScriptMVC's functional testing framework - [FuncUnit].
		 *   But, we've purposely made Syn work without any dependencies in the hopes that other frameworks or 
		 *   testing solutions can use it as well.
		 * </p>
		 * @constructor 
		 * Creates a synthetic event on the element.
		 * @param {Object} type
		 * @param {Object} options
		 * @param {Object} element
		 * @param {Object} callback
		 * @return Syn
		 */
		Syn = function( type, options, element, callback ) {
			return (new Syn.init(type, options, element, callback));
		};

		Syn.config = opts;

	bind = function( el, ev, f ) {
		return el.addEventListener ? el.addEventListener(ev, f, false) : el.attachEvent("on" + ev, f);
	};
	unbind = function( el, ev, f ) {
		return el.addEventListener ? el.removeEventListener(ev, f, false) : el.detachEvent("on" + ev, f);
	};

	/**
	 * @Static
	 */
	extend(Syn, {
		/**
		 * Creates a new synthetic event instance
		 * @hide
		 * @param {Object} type
		 * @param {Object} options
		 * @param {Object} element
		 * @param {Object} callback
		 */
		init: function( type, options, element, callback ) {
			var args = Syn.args(options, element, callback),
				self = this;
			this.queue = [];
			this.element = args.element;

			//run event
			if ( typeof this[type] === "function" ) {
				this[type](args.options, args.element, function( defaults, el ) {
					args.callback && args.callback.apply(self, arguments);
					self.done.apply(self, arguments);
				});
			} else {
				this.result = Syn.trigger(type, args.options, args.element);
				args.callback && args.callback.call(this, args.element, this.result);
			}
		},
		jquery: function( el, fast ) {
			if ( window.FuncUnit && window.FuncUnit.jQuery ) {
				return window.FuncUnit.jQuery;
			}
			if ( el ) {
				return Syn.helpers.getWindow(el).jQuery || window.jQuery;
			}
			else {
				return window.jQuery;
			}
		},
		/**
		 * Returns an object with the args for a Syn.
		 * @hide
		 * @return {Object}
		 */
		args: function() {
			var res = {},
				i = 0;
			for ( ; i < arguments.length; i++ ) {
				if ( typeof arguments[i] === 'function' ) {
					res.callback = arguments[i];
				} else if ( arguments[i] && arguments[i].jquery ) {
					res.element = arguments[i][0];
				} else if ( arguments[i] && arguments[i].nodeName ) {
					res.element = arguments[i];
				} else if ( res.options && typeof arguments[i] === 'string' ) { //we can get by id
					res.element = document.getElementById(arguments[i]);
				}
				else if ( arguments[i] ) {
					res.options = arguments[i];
				}
			}
			return res;
		},
		click: function( options, element, callback ) {
			Syn('click!', options, element, callback);
		},
		/**
		 * @attribute defaults
		 * Default actions for events.  Each default function is called with this as its 
		 * element.  It should return true if a timeout 
		 * should happen after it.  If it returns an element, a timeout will happen
		 * and the next event will happen on that element.
		 */
		defaults: {
			focus: function() {
				if (!Syn.support.focusChanges ) {
					var element = this,
						nodeName = element.nodeName.toLowerCase();
					Syn.data(element, "syntheticvalue", element.value);

					//TODO, this should be textarea too
					//and this might be for only text style inputs ... hmmmmm ....
					if ( nodeName === "input" || nodeName === "textarea" ) {
						bind(element, "blur", function() {
							if ( Syn.data(element, "syntheticvalue") != element.value ) {

								Syn.trigger("change", {}, element);
							}
							unbind(element, "blur", arguments.callee);
						});

					}
				}
			},
			submit: function() {
				Syn.onParents(this, function( el ) {
					if ( el.nodeName.toLowerCase() === 'form' ) {
						el.submit();
						return false;
					}
				});
			}
		},
		changeOnBlur: function( element, prop, value ) {

			bind(element, "blur", function() {
				if ( value !== element[prop] ) {
					Syn.trigger("change", {}, element);
				}
				unbind(element, "blur", arguments.callee);
			});

		},
		/**
		 * Returns the closest element of a particular type.
		 * @hide
		 * @param {Object} el
		 * @param {Object} type
		 */
		closest: function( el, type ) {
			while ( el && el.nodeName.toLowerCase() !== type.toLowerCase() ) {
				el = el.parentNode;
			}
			return el;
		},
		/**
		 * adds jQuery like data (adds an expando) and data exists FOREVER :)
		 * @hide
		 * @param {Object} el
		 * @param {Object} key
		 * @param {Object} value
		 */
		data: function( el, key, value ) {
			var d;
			if (!el[expando] ) {
				el[expando] = id++;
			}
			if (!data[el[expando]] ) {
				data[el[expando]] = {};
			}
			d = data[el[expando]];
			if ( value ) {
				data[el[expando]][key] = value;
			} else {
				return data[el[expando]][key];
			}
		},
		/**
		 * Calls a function on the element and all parents of the element until the function returns
		 * false.
		 * @hide
		 * @param {Object} el
		 * @param {Object} func
		 */
		onParents: function( el, func ) {
			var res;
			while ( el && res !== false ) {
				res = func(el);
				el = el.parentNode;
			}
			return el;
		},
		//regex to match focusable elements
		focusable: /^(a|area|frame|iframe|label|input|select|textarea|button|html|object)$/i,
		/**
		 * Returns if an element is focusable
		 * @hide
		 * @param {Object} elem
		 */
		isFocusable: function( elem ) {
			var attributeNode;

			// IE8 Standards doesn't like this on some elements
			if(elem.getAttributeNode){
				attributeNode = elem.getAttributeNode("tabIndex")
			}

			return this.focusable.test(elem.nodeName) || 
				   (attributeNode && attributeNode.specified) && 
				    Syn.isVisible(elem);
		},
		/**
		 * Returns if an element is visible or not
		 * @hide
		 * @param {Object} elem
		 */
		isVisible: function( elem ) {
			return (elem.offsetWidth && elem.offsetHeight) || (elem.clientWidth && elem.clientHeight);
		},
		/**
		 * Gets the tabIndex as a number or null
		 * @hide
		 * @param {Object} elem
		 */
		tabIndex: function( elem ) {
			var attributeNode = elem.getAttributeNode("tabIndex");
			return attributeNode && attributeNode.specified && (parseInt(elem.getAttribute('tabIndex')) || 0);
		},
		bind: bind,
		unbind: unbind,
		browser: browser,
		//some generic helpers
		helpers: {
			createEventObject: createEventObject,
			createBasicStandardEvent: function( type, defaults, doc ) {
				var event;
				try {
					event = doc.createEvent("Events");
				} catch (e2) {
					event = doc.createEvent("UIEvents");
				} finally {
					event.initEvent(type, true, true);
					extend(event, defaults);
				}
				return event;
			},
			inArray: function( item, array ) {
				var i =0;
				for ( ; i < array.length; i++ ) {
					if ( array[i] === item ) {
						return i;
					}
				}
				return -1;
			},
			getWindow: function( element ) {
				if(element.ownerDocument){
					return element.ownerDocument.defaultView || element.ownerDocument.parentWindow;
				}
			},
			extend: extend,
			scrollOffset: function( win , set) {
				var doc = win.document.documentElement,
					body = win.document.body;
				if(set){
					window.scrollTo(set.left, set.top);
					
				} else { 
					return {
						left: (doc && doc.scrollLeft || body && body.scrollLeft || 0) + (doc.clientLeft || 0),
						top: (doc && doc.scrollTop || body && body.scrollTop || 0) + (doc.clientTop || 0)
					};
				}
				
			},
			scrollDimensions: function(win){
				var doc = win.document.documentElement,
					body = win.document.body,
					docWidth = doc.clientWidth,
					docHeight = doc.clientHeight,
					compat = win.document.compatMode === "CSS1Compat";
				
				return {
					height: compat && docHeight ||
						body.clientHeight || docHeight,
					width: compat && docWidth ||
						body.clientWidth || docWidth
				};
			},
			addOffset: function( options, el ) {
				var jq = Syn.jquery(el),
					off;
				if ( typeof options === 'object' && options.clientX === undefined && options.clientY === undefined && options.pageX === undefined && options.pageY === undefined && jq ) {
					el = jq(el);
					off = el.offset();
					options.pageX = off.left + el.width() / 2;
					options.pageY = off.top + el.height() / 2;
				}
			}
		},
		// place for key data
		key: {
			ctrlKey: null,
			altKey: null,
			shiftKey: null,
			metaKey: null
		},
		//triggers an event on an element, returns true if default events should be run
		/**
		 * Dispatches an event and returns true if default events should be run.
		 * @hide
		 * @param {Object} event
		 * @param {Object} element
		 * @param {Object} type
		 * @param {Object} autoPrevent
		 */
		dispatch: function( event, element, type, autoPrevent ) {

			// dispatchEvent doesn't always work in IE (mostly in a popup)
			if ( element.dispatchEvent && event ) {
				var preventDefault = event.preventDefault,
					prevents = autoPrevent ? -1 : 0;

				//automatically prevents the default behavior for this event
				//this is to protect agianst nasty browser freezing bug in safari
				if ( autoPrevent ) {
					bind(element, type, function( ev ) {
						ev.preventDefault();
						unbind(this, type, arguments.callee);
					});
				}


				event.preventDefault = function() {
					prevents++;
					if (++prevents > 0 ) {
						preventDefault.apply(this, []);
					}
				};
				element.dispatchEvent(event);
				return prevents <= 0;
			} else {
				try {
					window.event = event;
				} catch (e) {}
				//source element makes sure element is still in the document
				return element.sourceIndex <= 0 || (element.fireEvent && element.fireEvent('on' + type, event));
			}
		},
		/**
		 * @attribute
		 * @hide
		 * An object of eventType -> function that create that event.
		 */
		create: {
			//-------- PAGE EVENTS ---------------------
			page: {
				event: function( type, options, element ) {
					var doc = Syn.helpers.getWindow(element).document || document,
						event;
					if ( doc.createEvent ) {
						event = doc.createEvent("Events");

						event.initEvent(type, true, true);
						return event;
					}
					else {
						try {
							event = createEventObject(type, options, element);
						}
						catch (e) {}
						return event;
					}
				}
			},
			// unique events
			focus: {
				event: function( type, options, element ) {
					Syn.onParents(element, function( el ) {
						if ( Syn.isFocusable(el) ) {
							if ( el.nodeName.toLowerCase() !== 'html' ) {
								el.focus();
								activeElement = el;
							}
							else if ( activeElement ) {
								// TODO: The HTML element isn't focasable in IE, but it is
								// in FF.  We should detect this and do a true focus instead
								// of just a blur
								var doc = Syn.helpers.getWindow(element).document;
								if ( doc !== window.document ) {
									return false;
								} else if ( doc.activeElement ) {
									doc.activeElement.blur();
									activeElement = null;
								} else {
									activeElement.blur();
									activeElement = null;
								}


							}
							return false;
						}
					});
					return true;
				}
			}
		},
		/**
		 * @attribute support
		 * 
		 * Feature detected properties of a browser's event system.
		 * Support has the following properties:
		 * 
		 *   - `backspaceWorks` - typing a backspace removes a character
		 *   - `clickChanges` - clicking on an option element creates a change event.
		 *   - `clickSubmits` - clicking on a form button submits the form.
		 *   - `focusChanges` - focus/blur creates a change event.
		 *   - `keypressOnAnchorClicks` - Keying enter on an anchor triggers a click.
		 *   - `keypressSubmits` - enter key submits
		 *   - `keyCharacters` - typing a character shows up
		 *   - `keysOnNotFocused` - enters keys when not focused.
		 *   - `linkHrefJS` - An achor's href JavaScript is run.
		 *   - `mouseDownUpClicks` - A mousedown followed by mouseup creates a click event.
		 *   - `mouseupSubmits` - a mouseup on a form button submits the form.
		 *   - `radioClickChanges` - clicking a radio button changes the radio.
		 *   - `tabKeyTabs` - A tab key changes tabs.
		 *   - `textareaCarriage` - a new line in a textarea creates a carriage return.
		 *   
		 * 
		 */
		support: {
			clickChanges: false,
			clickSubmits: false,
			keypressSubmits: false,
			mouseupSubmits: false,
			radioClickChanges: false,
			focusChanges: false,
			linkHrefJS: false,
			keyCharacters: false,
			backspaceWorks: false,
			mouseDownUpClicks: false,
			tabKeyTabs: false,
			keypressOnAnchorClicks: false,
			optionClickBubbles: false,
			ready: 0
		},
		/**
		 * Creates a synthetic event and dispatches it on the element.  
		 * This will run any default actions for the element.
		 * Typically you want to use Syn, but if you want the return value, use this.
		 * @param {String} type
		 * @param {Object} options
		 * @param {HTMLElement} element
		 * @return {Boolean} true if default events were run, false if otherwise.
		 */
		trigger: function( type, options, element ) {
			options || (options = {});

			var create = Syn.create,
				setup = create[type] && create[type].setup,
				kind = key.test(type) ? 'key' : (page.test(type) ? "page" : "mouse"),
				createType = create[type] || {},
				createKind = create[kind],
				event, ret, autoPrevent, dispatchEl = element;

			//any setup code?
			Syn.support.ready === 2 && setup && setup(type, options, element);

			autoPrevent = options._autoPrevent;
			//get kind
			delete options._autoPrevent;

			if ( createType.event ) {
				ret = createType.event(type, options, element);
			} else {
				//convert options
				options = createKind.options ? createKind.options(type, options, element) : options;

				if (!Syn.support.changeBubbles && /option/i.test(element.nodeName) ) {
					dispatchEl = element.parentNode; //jQuery expects clicks on select
				}

				//create the event
				event = createKind.event(type, options, dispatchEl);

				//send the event
				ret = Syn.dispatch(event, dispatchEl, type, autoPrevent);
			}
			
			ret && Syn.support.ready === 2 && Syn.defaults[type] && Syn.defaults[type].call(element, options, autoPrevent);
			return ret;
		},
		eventSupported: function( eventName ) {
			var el = document.createElement("div");
			eventName = "on" + eventName;

			var isSupported = (eventName in el);
			if (!isSupported ) {
				el.setAttribute(eventName, "return;");
				isSupported = typeof el[eventName] === "function";
			}
			el = null;

			return isSupported;
		}

	});
	/**
	 * @Prototype
	 */
	extend(Syn.init.prototype, {
		/**
		 * @function then
		 * <p>
		 * Then is used to chain a sequence of actions to be run one after the other.
		 * This is useful when many asynchronous actions need to be performed before some
		 * final check needs to be made.
		 * </p>
		 * <p>The following clicks and types into the <code>id='age'</code> element and then checks that only numeric characters can be entered.</p>
		 * <h3>Example</h3>
		 * @codestart
		 * Syn('click',{},'age')
		 *   .then('type','I am 12',function(){
		 *   equals($('#age').val(),"12")  
		 * })
		 * @codeend
		 * If the element argument is undefined, then the last element is used.
		 * 
		 * @param {String} type The type of event or action to create: "_click", "_dblclick", "_drag", "_type".
		 * @param {Object} options Optiosn to pass to the event.
		 * @param {String|HTMLElement} [element] A element's id or an element.  If undefined, defaults to the previous element.
		 * @param {Function} [callback] A function to callback after the action has run, but before any future chained actions are run.
		 */
		then: function( type, options, element, callback ) {
			if ( Syn.autoDelay ) {
				this.delay();
			}
			var args = Syn.args(options, element, callback),
				self = this;


			//if stack is empty run right away
			//otherwise ... unshift it
			this.queue.unshift(function( el, prevented ) {

				if ( typeof this[type] === "function" ) {
					this.element = args.element || el;
					this[type](args.options, this.element, function( defaults, el ) {
						args.callback && args.callback.apply(self, arguments);
						self.done.apply(self, arguments);
					});
				} else {
					this.result = Syn.trigger(type, args.options, args.element);
					args.callback && args.callback.call(this, args.element, this.result);
					return this;
				}
			})
			return this;
		},
		/**
		 * Delays the next command a set timeout.
		 * @param {Number} [timeout]
		 * @param {Function} [callback]
		 */
		delay: function( timeout, callback ) {
			if ( typeof timeout === 'function' ) {
				callback = timeout;
				timeout = null;
			}
			timeout = timeout || 600;
			var self = this;
			this.queue.unshift(function() {
				setTimeout(function() {
					callback && callback.apply(self, [])
					self.done.apply(self, arguments);
				}, timeout);
			});
			return this;
		},
		done: function( defaults, el ) {
			el && (this.element = el);
			if ( this.queue.length ) {
				this.queue.pop().call(this, this.element, defaults);
			}

		},
		/**
		 * @function click
		 * Clicks an element by triggering a mousedown, 
		 * mouseup, 
		 * and a click event.
		 * <h3>Example</h3>
		 * @codestart
		 * Syn.click({},'create',function(){
		 *   //check something
		 * })
		 * @codeend
		 * You can also provide the coordinates of the click.  
		 * If jQuery is present, it will set clientX and clientY
		 * for you.  Here's how to set it yourself:
		 * @codestart
		 * Syn.click(
		 *     {clientX: 20, clientY: 100},
		 *     'create',
		 *     function(){
		 *       //check something
		 *     })
		 * @codeend
		 * You can also provide pageX and pageY and Syn will convert it for you.
		 * @param {Object} options
		 * @param {HTMLElement} element
		 * @param {Function} callback
		 */
		"_click": function( options, element, callback, force ) {
			Syn.helpers.addOffset(options, element);
			Syn.trigger("mousedown", options, element);

			//timeout is b/c IE is stupid and won't call focus handlers
			setTimeout(function() {
				Syn.trigger("mouseup", options, element);
				if (!Syn.support.mouseDownUpClicks || force ) {
					Syn.trigger("click", options, element);
					callback(true);
				} else {
					//we still have to run the default (presumably)
					Syn.create.click.setup('click', options, element);
					Syn.defaults.click.call(element);
					//must give time for callback
					setTimeout(function() {
						callback(true);
					}, 1);
				}

			}, 1);
		},
		/**
		 * Right clicks in browsers that support it (everyone but opera).
		 * @param {Object} options
		 * @param {Object} element
		 * @param {Object} callback
		 */
		"_rightClick": function( options, element, callback ) {
			Syn.helpers.addOffset(options, element);
			var mouseopts = extend(extend({}, Syn.mouse.browser.right.mouseup), options);

			Syn.trigger("mousedown", mouseopts, element);

			//timeout is b/c IE is stupid and won't call focus handlers
			setTimeout(function() {
				Syn.trigger("mouseup", mouseopts, element);
				if ( Syn.mouse.browser.right.contextmenu ) {
					Syn.trigger("contextmenu", extend(extend({}, Syn.mouse.browser.right.contextmenu), options), element);
				}
				callback(true);
			}, 1);
		},
		/**
		 * @function dblclick
		 * Dblclicks an element.  This runs two [Syn.prototype.click click] events followed by
		 * a dblclick on the element.
		 * <h3>Example</h3>
		 * @codestart
		 * Syn.dblclick({},'open')
		 * @codeend
		 * @param {Object} options
		 * @param {HTMLElement} element
		 * @param {Function} callback
		 */
		"_dblclick": function( options, element, callback ) {
			Syn.helpers.addOffset(options, element);
			var self = this;
			this._click(options, element, function() {
				setTimeout(function() {
					self._click(options, element, function() {
						Syn.trigger("dblclick", options, element);
						callback(true);
					}, true);
				}, 2);

			});
		}
	});

	var actions = ["click", "dblclick", "move", "drag", "key", "type", 'rightClick'],
		makeAction = function( name ) {
			Syn[name] = function( options, element, callback ) {
				return Syn("_" + name, options, element, callback);
			};
			Syn.init.prototype[name] = function( options, element, callback ) {
				return this.then("_" + name, options, element, callback);
			};
		},
		i = 0;

	for ( ; i < actions.length; i++ ) {
		makeAction(actions[i]);
	}

	

	return Syn;
})();

// ## mouse.js
var __m3 = (function(Syn) {
//handles mosue events

	var h = Syn.helpers,
		getWin = h.getWindow;

	Syn.mouse = {};
	h.extend(Syn.defaults, {
		mousedown: function( options ) {
			Syn.trigger("focus", {}, this)
		},
		click: function() {
			// prevents the access denied issue in IE if the click causes the element to be destroyed
			var element = this, href, type, radioChanged, nodeName, scope;
			try {
				href = element.href;
				type = element.type;
				createChange = Syn.data(element, "createChange");
				radioChanged = Syn.data(element, "radioChanged");
				scope = getWin(element);
				nodeName = element.nodeName.toLowerCase();
			} catch (e) {
				return;
			}
			//get old values
			
			//this code was for restoring the href attribute to prevent popup opening
			//if ((href = Syn.data(element, "href"))) {
			//	element.setAttribute('href', href)
			//}

			//run href javascript
			if (!Syn.support.linkHrefJS && /^\s*javascript:/.test(href) ) {
				//eval js
				var code = href.replace(/^\s*javascript:/, "")

				//try{
				if ( code != "//" && code.indexOf("void(0)") == -1 ) {
					if ( window.selenium ) {
						eval("with(selenium.browserbot.getCurrentWindow()){" + code + "}")
					} else {
						eval("with(scope){" + code + "}")
					}
				}
			}

			//submit a form
			if (!(Syn.support.clickSubmits) && (nodeName == "input" && type == "submit") || nodeName == 'button' ) {

				var form = Syn.closest(element, "form");
				if ( form ) {
					Syn.trigger("submit", {}, form)
				}

			}
			//follow a link, probably needs to check if in an a.
			if ( nodeName == "a" && element.href && !/^\s*javascript:/.test(href) ) {
				scope.location.href = href;

			}

			//change a checkbox
			if ( nodeName == "input" && type == "checkbox" ) {

				//if(!Syn.support.clickChecks && !Syn.support.changeChecks){
				//	element.checked = !element.checked;
				//}
				if (!Syn.support.clickChanges ) {
					Syn.trigger("change", {}, element);
				}
			}

			//change a radio button
			if ( nodeName == "input" && type == "radio" ) { // need to uncheck others if not checked
				if ( radioChanged && !Syn.support.radioClickChanges ) {
					Syn.trigger("change", {}, element);
				}
			}
			// change options
			if ( nodeName == "option" && createChange ) {
				Syn.trigger("change", {}, element.parentNode); //does not bubble
				Syn.data(element, "createChange", false)
			}
		}
	})

	//add create and setup behavior for mosue events
	h.extend(Syn.create, {
		mouse: {
			options: function( type, options, element ) {
				var doc = document.documentElement,
					body = document.body,
					center = [options.pageX || 0, options.pageY || 0],
					//browser might not be loaded yet (doing support code)
					left = Syn.mouse.browser && Syn.mouse.browser.left[type],
					right = Syn.mouse.browser && Syn.mouse.browser.right[type];
				return h.extend({
					bubbles: true,
					cancelable: true,
					view: window,
					detail: 1,
					screenX: 1,
					screenY: 1,
					clientX: options.clientX || center[0] - (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc.clientLeft || 0),
					clientY: options.clientY || center[1] - (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc.clientTop || 0),
					ctrlKey: !! Syn.key.ctrlKey,
					altKey: !! Syn.key.altKey,
					shiftKey: !! Syn.key.shiftKey,
					metaKey: !! Syn.key.metaKey,
					button: left && left.button != null ? left.button : right && right.button || (type == 'contextmenu' ? 2 : 0),
					relatedTarget: document.documentElement
				}, options);
			},
			event: function( type, defaults, element ) { //Everyone Else
				var doc = getWin(element).document || document
				if ( doc.createEvent ) {
					var event;

					try {
						event = doc.createEvent('MouseEvents');
						event.initMouseEvent(type, defaults.bubbles, defaults.cancelable, defaults.view, defaults.detail, defaults.screenX, defaults.screenY, defaults.clientX, defaults.clientY, defaults.ctrlKey, defaults.altKey, defaults.shiftKey, defaults.metaKey, defaults.button, defaults.relatedTarget);
					} catch (e) {
						event = h.createBasicStandardEvent(type, defaults, doc)
					}
					event.synthetic = true;
					return event;
				} else {
					var event;
					try {
						event = h.createEventObject(type, defaults, element)
					}
					catch (e) {}

					return event;
				}

			}
		},
		click: {
			setup: function( type, options, element ) {
				var nodeName = element.nodeName.toLowerCase(),
					type;

				//we need to manually 'check' in browser that can't check
				//so checked has the right value
				if (!Syn.support.clickChecks && !Syn.support.changeChecks && nodeName === "input" ) {
					type = element.type.toLowerCase(); //pretty sure lowercase isn't needed
					if ( type === 'checkbox' ) {
						element.checked = !element.checked;
					}
					if ( type === "radio" ) {
						//do the checks manually 
						if (!element.checked ) { //do nothing, no change
							try {
								Syn.data(element, "radioChanged", true);
							} catch (e) {}
							element.checked = true;
						}
					}
				}

				if ( nodeName == "a" && element.href && !/^\s*javascript:/.test(element.href) ) {

					//save href
					Syn.data(element, "href", element.href)

					//remove b/c safari/opera will open a new tab instead of changing the page
					// this has been removed because newer versions don't have this problem
					//element.setAttribute('href', 'javascript://')
					//however this breaks scripts using the href
					//we need to listen to this and prevent the default behavior
					//and run the default behavior ourselves. Boo!
				}
				//if select or option, save old value and mark to change
				if (/option/i.test(element.nodeName) ) {
					var child = element.parentNode.firstChild,
						i = -1;
					while ( child ) {
						if ( child.nodeType == 1 ) {
							i++;
							if ( child == element ) break;
						}
						child = child.nextSibling;
					}
					if ( i !== element.parentNode.selectedIndex ) {
						//shouldn't this wait on triggering
						//change?
						element.parentNode.selectedIndex = i;
						Syn.data(element, "createChange", true)
					}
				}

			}
		},
		mousedown: {
			setup: function( type, options, element ) {
				var nn = element.nodeName.toLowerCase();
				//we have to auto prevent default to prevent freezing error in safari
				if ( Syn.browser.safari && (nn == "select" || nn == "option") ) {
					options._autoPrevent = true;
				}
			}
		}
	});
	//do support code
	(function() {
		if (!document.body ) {
			setTimeout(arguments.callee, 1)
			return;
		}
		var oldSynth = window.__synthTest;
		window.__synthTest = function() {
			Syn.support.linkHrefJS = true;
		}
		var div = document.createElement("div"),
			checkbox, submit, form, input, select;

		div.innerHTML = "<form id='outer'>" + "<input name='checkbox' type='checkbox'/>" + "<input name='radio' type='radio' />" + "<input type='submit' name='submitter'/>" + "<input type='input' name='inputter'/>" + "<input name='one'>" + "<input name='two'/>" + "<a href='javascript:__synthTest()' id='synlink'></a>" + "<select><option></option></select>" + "</form>";
		document.documentElement.appendChild(div);
		form = div.firstChild
		checkbox = form.childNodes[0];
		submit = form.childNodes[2];
		select = form.getElementsByTagName('select')[0]

		checkbox.checked = false;
		checkbox.onchange = function() {
			Syn.support.clickChanges = true;
		}

		Syn.trigger("click", {}, checkbox)
		Syn.support.clickChecks = checkbox.checked;

		checkbox.checked = false;

		Syn.trigger("change", {}, checkbox);

		Syn.support.changeChecks = checkbox.checked;

		form.onsubmit = function( ev ) {
			if ( ev.preventDefault ) ev.preventDefault();
			Syn.support.clickSubmits = true;
			return false;
		}
		Syn.trigger("click", {}, submit)



		form.childNodes[1].onchange = function() {
			Syn.support.radioClickChanges = true;
		}
		Syn.trigger("click", {}, form.childNodes[1])


		Syn.bind(div, 'click', function() {
			Syn.support.optionClickBubbles = true;
			Syn.unbind(div, 'click', arguments.callee)
		})
		Syn.trigger("click", {}, select.firstChild)


		Syn.support.changeBubbles = Syn.eventSupported('change');

		//test if mousedown followed by mouseup causes click (opera), make sure there are no clicks after this
		var clicksCount = 0
		div.onclick = function() {
			Syn.support.mouseDownUpClicks = true;
			//we should use this to check for opera potentially, but would
			//be difficult to remove element correctly
			//Syn.support.mouseDownUpRepeatClicks = (2 == (++clicksCount))
		}
		Syn.trigger("mousedown", {}, div)
		Syn.trigger("mouseup", {}, div)

		//setTimeout(function(){
		//	Syn.trigger("mousedown",{},div)
		//	Syn.trigger("mouseup",{},div)
		//},1)

		document.documentElement.removeChild(div);

		//check stuff
		window.__synthTest = oldSynth;
		Syn.support.ready++;
	})();
	return Syn;
})(__m2);

// ## browsers.js
var __m4 = (function(Syn) {
	Syn.key.browsers = {
		webkit : {
			'prevent':
			 {"keyup":[],"keydown":["char","keypress"],"keypress":["char"]},
			'character':
			 {"keydown":[0,"key"],"keypress":["char","char"],"keyup":[0,"key"]},
			'specialChars':
			 {"keydown":[0,"char"],"keyup":[0,"char"]},
			'navigation':
			 {"keydown":[0,"key"],"keyup":[0,"key"]},
			'special':
			 {"keydown":[0,"key"],"keyup":[0,"key"]},
			'tab':
			 {"keydown":[0,"char"],"keyup":[0,"char"]},
			'pause-break':
			 {"keydown":[0,"key"],"keyup":[0,"key"]},
			'caps':
			 {"keydown":[0,"key"],"keyup":[0,"key"]},
			'escape':
			 {"keydown":[0,"key"],"keyup":[0,"key"]},
			'num-lock':
			 {"keydown":[0,"key"],"keyup":[0,"key"]},
			'scroll-lock':
			 {"keydown":[0,"key"],"keyup":[0,"key"]},
			'print':
			 {"keyup":[0,"key"]},
			'function':
			 {"keydown":[0,"key"],"keyup":[0,"key"]},
			'\r':
			 {"keydown":[0,"key"],"keypress":["char","key"],"keyup":[0,"key"]}
		},
		gecko : {
			'prevent':
			 {"keyup":[],"keydown":["char"],"keypress":["char"]},
			'character':
			 {"keydown":[0,"key"],"keypress":["char",0],"keyup":[0,"key"]},
			'specialChars':
			 {"keydown":[0,"key"],"keypress":[0,"key"],"keyup":[0,"key"]},
			'navigation':
			 {"keydown":[0,"key"],"keypress":[0,"key"],"keyup":[0,"key"]},
			'special':
			 {"keydown":[0,"key"],"keyup":[0,"key"]},
			'\t':
			 {"keydown":[0,"key"],"keypress":[0,"key"],"keyup":[0,"key"]},
			'pause-break':
			 {"keydown":[0,"key"],"keypress":[0,"key"],"keyup":[0,"key"]},
			'caps':
			 {"keydown":[0,"key"],"keyup":[0,"key"]},
			'escape':
			 {"keydown":[0,"key"],"keypress":[0,"key"],"keyup":[0,"key"]},
			'num-lock':
			 {"keydown":[0,"key"],"keyup":[0,"key"]},
			'scroll-lock':
			 {"keydown":[0,"key"],"keyup":[0,"key"]},
			'print':
			 {"keyup":[0,"key"]},
			'function':
			 {"keydown":[0,"key"],"keyup":[0,"key"]},
			'\r':
			 {"keydown":[0,"key"],"keypress":[0,"key"],"keyup":[0,"key"]}
		},
		msie : {
			'prevent':{"keyup":[],"keydown":["char","keypress"],"keypress":["char"]},
			'character':{"keydown":[null,"key"],"keypress":[null,"char"],"keyup":[null,"key"]},
			'specialChars':{"keydown":[null,"char"],"keyup":[null,"char"]},
			'navigation':{"keydown":[null,"key"],"keyup":[null,"key"]},
			'special':{"keydown":[null,"key"],"keyup":[null,"key"]},
			'tab':{"keydown":[null,"char"],"keyup":[null,"char"]},
			'pause-break':{"keydown":[null,"key"],"keyup":[null,"key"]},
			'caps':{"keydown":[null,"key"],"keyup":[null,"key"]},
			'escape':{"keydown":[null,"key"],"keypress":[null,"key"],"keyup":[null,"key"]},
			'num-lock':{"keydown":[null,"key"],"keyup":[null,"key"]},
			'scroll-lock':{"keydown":[null,"key"],"keyup":[null,"key"]},
			'print':{"keyup":[null,"key"]},
			'function':{"keydown":[null,"key"],"keyup":[null,"key"]},
			'\r':{"keydown":[null,"key"],"keypress":[null,"key"],"keyup":[null,"key"]}	
		},
		opera : {
			'prevent':
			 {"keyup":[],"keydown":[],"keypress":["char"]},
			'character':
			 {"keydown":[null,"key"],"keypress":[null,"char"],"keyup":[null,"key"]},
			'specialChars':
			 {"keydown":[null,"char"],"keypress":[null,"char"],"keyup":[null,"char"]},
			'navigation':
			 {"keydown":[null,"key"],"keypress":[null,"key"]},
			'special':
			 {"keydown":[null,"key"],"keypress":[null,"key"],"keyup":[null,"key"]},
			'tab':
			 {"keydown":[null,"char"],"keypress":[null,"char"],"keyup":[null,"char"]},
			'pause-break':
			 {"keydown":[null,"key"],"keypress":[null,"key"],"keyup":[null,"key"]},
			'caps':
			 {"keydown":[null,"key"],"keyup":[null,"key"]},
			'escape':
			 {"keydown":[null,"key"],"keypress":[null,"key"]},
			'num-lock':
			 {"keyup":[null,"key"],"keydown":[null,"key"],"keypress":[null,"key"]},
			'scroll-lock':
			 {"keydown":[null,"key"],"keypress":[null,"key"],"keyup":[null,"key"]},
			'print':
			 {},
			'function':
			 {"keydown":[null,"key"],"keypress":[null,"key"],"keyup":[null,"key"]},
			'\r':
			 {"keydown":[null,"key"],"keypress":[null,"key"],"keyup":[null,"key"]}	
		}
	};
	
	Syn.mouse.browsers = {
		webkit : {"right":{"mousedown":{"button":2,"which":3},"mouseup":{"button":2,"which":3},"contextmenu":{"button":2,"which":3}},
		          "left":{"mousedown":{"button":0,"which":1},"mouseup":{"button":0,"which":1},"click":{"button":0,"which":1}}},
		opera: {"right":{"mousedown":{"button":2,"which":3},"mouseup":{"button":2,"which":3}},
		        "left":{"mousedown":{"button":0,"which":1},"mouseup":{"button":0,"which":1},"click":{"button":0,"which":1}}},
		msie: {	"right":{"mousedown":{"button":2},"mouseup":{"button":2},"contextmenu":{"button":0}},
				"left":{"mousedown":{"button":1},"mouseup":{"button":1},"click":{"button":0}}},
		chrome : {"right":{"mousedown":{"button":2,"which":3},"mouseup":{"button":2,"which":3},"contextmenu":{"button":2,"which":3}},
				  "left":{"mousedown":{"button":0,"which":1},"mouseup":{"button":0,"which":1},"click":{"button":0,"which":1}}},
		gecko: {"left":{"mousedown":{"button":0,"which":1},"mouseup":{"button":0,"which":1},"click":{"button":0,"which":1}},
		        "right":{"mousedown":{"button":2,"which":3},"mouseup":{"button":2,"which":3},"contextmenu":{"button":2,"which":3}}}
	}
	
	//set browser
	Syn.key.browser = 
	(function(){
		if(Syn.key.browsers[window.navigator.userAgent]){
			return Syn.key.browsers[window.navigator.userAgent];
		}
		for(var browser in Syn.browser){
			if(Syn.browser[browser] && Syn.key.browsers[browser]){
				return Syn.key.browsers[browser]
			}
		}
		return Syn.key.browsers.gecko;
	})();
	
	Syn.mouse.browser = 
	(function(){
		if(Syn.mouse.browsers[window.navigator.userAgent]){
			return Syn.mouse.browsers[window.navigator.userAgent];
		}
		for(var browser in Syn.browser){
			if(Syn.browser[browser] && Syn.mouse.browsers[browser]){
				return Syn.mouse.browsers[browser]
			}
		}
		return Syn.mouse.browsers.gecko;
	})();
	return Syn;
})(__m2, __m3);

// ## key.js
var __m5 = (function(Syn) {
	var h = Syn.helpers,

		// gets the selection of an input or textarea
		getSelection = function( el ) {
			// use selectionStart if we can
			if ( el.selectionStart !== undefined ) {
				// this is for opera, so we don't have to focus to type how we think we would
				if ( document.activeElement && document.activeElement != el && el.selectionStart == el.selectionEnd && el.selectionStart == 0 ) {
					return {
						start: el.value.length,
						end: el.value.length
					};
				}
				return {
					start: el.selectionStart,
					end: el.selectionEnd
				}
			} else {
				//check if we aren't focused
				try {
					//try 2 different methods that work differently (IE breaks depending on type)
					if ( el.nodeName.toLowerCase() == 'input' ) {
						var real = h.getWindow(el).document.selection.createRange(),
							r = el.createTextRange();
						r.setEndPoint("EndToStart", real);

						var start = r.text.length
						return {
							start: start,
							end: start + real.text.length
						}
					}
					else {
						var real = h.getWindow(el).document.selection.createRange(),
							r = real.duplicate(),
							r2 = real.duplicate(),
							r3 = real.duplicate();
						r2.collapse();
						r3.collapse(false);
						r2.moveStart('character', -1)
						r3.moveStart('character', -1)
						//select all of our element
						r.moveToElementText(el)
						//now move our endpoint to the end of our real range
						r.setEndPoint('EndToEnd', real);
						var start = r.text.length - real.text.length,
							end = r.text.length;
						if ( start != 0 && r2.text == "" ) {
							start += 2;
						}
						if ( end != 0 && r3.text == "" ) {
							end += 2;
						}
						//if we aren't at the start, but previous is empty, we are at start of newline
						return {
							start: start,
							end: end
						}
					}
				} catch (e) {
					return {
						start: el.value.length,
						end: el.value.length
					};
				}
			}
		},
		// gets all focusable elements
		getFocusable = function( el ) {
			var document = h.getWindow(el).document,
				res = [];

			var els = document.getElementsByTagName('*'),
				len = els.length;

			for ( var i = 0; i < len; i++ ) {
				Syn.isFocusable(els[i]) && els[i] != document.documentElement && res.push(els[i])
			}
			return res;


		};
	/**
	 * @add Syn static
	 */
	h.extend(Syn, {
		/**
		 * @attribute
		 * A list of the keys and their keycodes codes you can type.
		 * You can add type keys with
		 * @codestart
		 * Syn('key','delete','title');
		 * 
		 * //or 
		 * 
		 * Syn('type','One Two Three[left][left][delete]','title')
		 * @codeend
		 * 
		 * The following are a list of keys you can type:
		 * @codestart text
		 * \b        - backspace
		 * \t        - tab
		 * \r        - enter
		 * ' '       - space
		 * a-Z 0-9   - normal characters
		 * /!@#$*,.? - All other typeable characters
		 * page-up   - scrolls up
		 * page-down - scrolls down
		 * end       - scrolls to bottom
		 * home      - scrolls to top
		 * insert    - changes how keys are entered
		 * delete    - deletes the next character
		 * left      - moves cursor left
		 * right     - moves cursor right
		 * up        - moves the cursor up
		 * down      - moves the cursor down
		 * f1-12     - function buttons
		 * shift, ctrl, alt - special keys
		 * pause-break      - the pause button
		 * scroll-lock      - locks scrolling
		 * caps      - makes caps
		 * escape    - escape button
		 * num-lock  - allows numbers on keypad
		 * print     - screen capture
		 * @codeend
		 */
		keycodes: {
			//backspace
			'\b': 8,

			//tab
			'\t': 9,

			//enter
			'\r': 13,

			//special
			'shift': 16,
			'ctrl': 17,
			'alt': 18,

			//weird
			'pause-break': 19,
			'caps': 20,
			'escape': 27,
			'num-lock': 144,
			'scroll-lock': 145,
			'print': 44,

			//navigation
			'page-up': 33,
			'page-down': 34,
			'end': 35,
			'home': 36,
			'left': 37,
			'up': 38,
			'right': 39,
			'down': 40,
			'insert': 45,
			'delete': 46,

			//normal characters
			' ': 32,
			'0': 48,
			'1': 49,
			'2': 50,
			'3': 51,
			'4': 52,
			'5': 53,
			'6': 54,
			'7': 55,
			'8': 56,
			'9': 57,
			'a': 65,
			'b': 66,
			'c': 67,
			'd': 68,
			'e': 69,
			'f': 70,
			'g': 71,
			'h': 72,
			'i': 73,
			'j': 74,
			'k': 75,
			'l': 76,
			'm': 77,
			'n': 78,
			'o': 79,
			'p': 80,
			'q': 81,
			'r': 82,
			's': 83,
			't': 84,
			'u': 85,
			'v': 86,
			'w': 87,
			'x': 88,
			'y': 89,
			'z': 90,
			//normal-characters, numpad
			'num0': 96,
			'num1': 97,
			'num2': 98,
			'num3': 99,
			'num4': 100,
			'num5': 101,
			'num6': 102,
			'num7': 103,
			'num8': 104,
			'num9': 105,
			'*': 106,
			'+': 107,
			'-': 109,
			'.': 110,
			//normal-characters, others
			'/': 111,
			';': 186,
			'=': 187,
			',': 188,
			'-': 189,
			'.': 190,
			'/': 191,
			'`': 192,
			'[': 219,
			'\\': 220,
			']': 221,
			"'": 222,

			//ignore these, you shouldn't use them
			'left window key': 91,
			'right window key': 92,
			'select key': 93,


			'f1': 112,
			'f2': 113,
			'f3': 114,
			'f4': 115,
			'f5': 116,
			'f6': 117,
			'f7': 118,
			'f8': 119,
			'f9': 120,
			'f10': 121,
			'f11': 122,
			'f12': 123
		},

		// what we can type in
		typeable: /input|textarea/i,

		// selects text on an element
		selectText: function( el, start, end ) {
			if ( el.setSelectionRange ) {
				if (!end ) {
					el.focus();
					el.setSelectionRange(start, start);
				} else {
					el.selectionStart = start;
					el.selectionEnd = end;
				}
			} else if ( el.createTextRange ) {
				//el.focus();
				var r = el.createTextRange();
				r.moveStart('character', start);
				end = end || start;
				r.moveEnd('character', end - el.value.length);

				r.select();
			}
		},
		getText: function( el ) {
			//first check if the el has anything selected ..
			if ( Syn.typeable.test(el.nodeName) ) {
				var sel = getSelection(el);
				return el.value.substring(sel.start, sel.end)
			}
			//otherwise get from page
			var win = Syn.helpers.getWindow(el);
			if ( win.getSelection ) {
				return win.getSelection().toString();
			}
			else if ( win.document.getSelection ) {
				return win.document.getSelection().toString()
			}
			else {
				return win.document.selection.createRange().text;
			}
		},
		getSelection: getSelection
	});

	h.extend(Syn.key, {
		// retrieves a description of what events for this character should look like
		data: function( key ) {
			//check if it is described directly
			if ( Syn.key.browser[key] ) {
				return Syn.key.browser[key];
			}
			for ( var kind in Syn.key.kinds ) {
				if ( h.inArray(key, Syn.key.kinds[kind]) > -1 ) {
					return Syn.key.browser[kind]
				}
			}
			return Syn.key.browser.character
		},

		//returns the special key if special
		isSpecial: function( keyCode ) {
			var specials = Syn.key.kinds.special;
			for ( var i = 0; i < specials.length; i++ ) {
				if ( Syn.keycodes[specials[i]] == keyCode ) {
					return specials[i];
				}
			}
		},
		/**
		 * @hide
		 * gets the options for a key and event type ...
		 * @param {Object} key
		 * @param {Object} event
		 */
		options: function( key, event ) {
			var keyData = Syn.key.data(key);

			if (!keyData[event] ) {
				//we shouldn't be creating this event
				return null;
			}

			var charCode = keyData[event][0],
				keyCode = keyData[event][1],
				result = {};

			if ( keyCode == 'key' ) {
				result.keyCode = Syn.keycodes[key]
			} else if ( keyCode == 'char' ) {
				result.keyCode = key.charCodeAt(0)
			} else {
				result.keyCode = keyCode;
			}

			if ( charCode == 'char' ) {
				result.charCode = key.charCodeAt(0)
			} else if ( charCode !== null ) {
				result.charCode = charCode;
			}

			// all current browsers have which property to normalize keyCode/charCode
			if(result.keyCode){
				result.which = result.keyCode;
			} else {
				result.which = result.charCode;
			}


			return result
		},
		//types of event keys
		kinds: {
			special: ["shift", 'ctrl', 'alt', 'caps'],
			specialChars: ["\b"],
			navigation: ["page-up", 'page-down', 'end', 'home', 'left', 'up', 'right', 'down', 'insert', 'delete'],
			'function': ['f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10', 'f11', 'f12']
		},
		//returns the default function
		// some keys have default functions
		// some 'kinds' of keys have default functions
		getDefault: function( key ) {
			//check if it is described directly
			if ( Syn.key.defaults[key] ) {
				return Syn.key.defaults[key];
			}
			for ( var kind in Syn.key.kinds ) {
				if ( h.inArray(key, Syn.key.kinds[kind]) > -1 && Syn.key.defaults[kind] ) {
					return Syn.key.defaults[kind];
				}
			}
			return Syn.key.defaults.character
		},
		// default behavior when typing
		defaults: {
			'character': function( options, scope, key, force, sel ) {
				if (/num\d+/.test(key) ) {
					key = key.match(/\d+/)[0]
				}

				if ( force || (!Syn.support.keyCharacters && Syn.typeable.test(this.nodeName)) ) {
					var current = this.value,
						before = current.substr(0, sel.start),
						after = current.substr(sel.end),
						character = key;

					this.value = before + character + after;
					//handle IE inserting \r\n
					var charLength = character == "\n" && Syn.support.textareaCarriage ? 2 : character.length;
					Syn.selectText(this, before.length + charLength)
				}
			},
			'c': function( options, scope, key, force, sel ) {
				if ( Syn.key.ctrlKey ) {
					Syn.key.clipboard = Syn.getText(this)
				} else {
					Syn.key.defaults.character.apply(this, arguments);
				}
			},
			'v': function( options, scope, key, force, sel ) {
				if ( Syn.key.ctrlKey ) {
					Syn.key.defaults.character.call(this, options, scope, Syn.key.clipboard, true, sel);
				} else {
					Syn.key.defaults.character.apply(this, arguments);
				}
			},
			'a': function( options, scope, key, force, sel ) {
				if ( Syn.key.ctrlKey ) {
					Syn.selectText(this, 0, this.value.length)
				} else {
					Syn.key.defaults.character.apply(this, arguments);
				}
			},
			'home': function() {
				Syn.onParents(this, function( el ) {
					if ( el.scrollHeight != el.clientHeight ) {
						el.scrollTop = 0;
						return false;
					}
				})
			},
			'end': function() {
				Syn.onParents(this, function( el ) {
					if ( el.scrollHeight != el.clientHeight ) {
						el.scrollTop = el.scrollHeight;
						return false;
					}
				})
			},
			'page-down': function() {
				//find the first parent we can scroll
				Syn.onParents(this, function( el ) {
					if ( el.scrollHeight != el.clientHeight ) {
						var ch = el.clientHeight
						el.scrollTop += ch;
						return false;
					}
				})
			},
			'page-up': function() {
				Syn.onParents(this, function( el ) {
					if ( el.scrollHeight != el.clientHeight ) {
						var ch = el.clientHeight
						el.scrollTop -= ch;
						return false;
					}
				})
			},
			'\b': function( options, scope, key, force, sel ) {
				//this assumes we are deleting from the end
				if (!Syn.support.backspaceWorks && Syn.typeable.test(this.nodeName) ) {
					var current = this.value,
						before = current.substr(0, sel.start),
						after = current.substr(sel.end);

					if ( sel.start == sel.end && sel.start > 0 ) {
						//remove a character
						this.value = before.substring(0, before.length - 1) + after
						Syn.selectText(this, sel.start - 1)
					} else {
						this.value = before + after;
						Syn.selectText(this, sel.start)
					}

					//set back the selection
				}
			},
			'delete': function( options, scope, key, force, sel ) {
				if (!Syn.support.backspaceWorks && Syn.typeable.test(this.nodeName) ) {
					var current = this.value,
						before = current.substr(0, sel.start),
						after = current.substr(sel.end);
					if ( sel.start == sel.end && sel.start <= this.value.length - 1 ) {
						this.value = before + after.substring(1)
					} else {
						this.value = before + after;

					}
					Syn.selectText(this, sel.start)
				}
			},
			'\r': function( options, scope, key, force, sel ) {

				var nodeName = this.nodeName.toLowerCase()
				// submit a form
				if (nodeName == 'input' ) {
					Syn.trigger("change", {}, this);
				}
				
				if (!Syn.support.keypressSubmits && nodeName == 'input' ) {
					var form = Syn.closest(this, "form");
					if ( form ) {
						Syn.trigger("submit", {}, form);
					}

				}
				//newline in textarea
				if (!Syn.support.keyCharacters && nodeName == 'textarea' ) {
					Syn.key.defaults.character.call(this, options, scope, "\n", undefined, sel)
				}
				// 'click' hyperlinks
				if (!Syn.support.keypressOnAnchorClicks && nodeName == 'a' ) {
					Syn.trigger("click", {}, this);
				}
			},
			// 
			// Gets all focusable elements.  If the element (this)
			// doesn't have a tabindex, finds the next element after.
			// If the element (this) has a tabindex finds the element 
			// with the next higher tabindex OR the element with the same
			// tabindex after it in the document.
			// @return the next element
			// 
			'\t': function( options, scope ) {
				// focusable elements
				var focusEls = getFocusable(this),
					// the current element's tabindex
					tabIndex = Syn.tabIndex(this),
					// will be set to our guess for the next element
					current = null,
					// the next index we care about
					currentIndex = 1000000000,
					// set to true once we found 'this' element
					found = false,
					i = 0,
					el,
					//the tabindex of the tabable element we are looking at
					elIndex, firstNotIndexed, prev;
				orders = [];
				for (; i < focusEls.length; i++ ) {
					orders.push([focusEls[i], i]);
				}
				var sort = function( order1, order2 ) {
					var el1 = order1[0],
						el2 = order2[0],
						tab1 = Syn.tabIndex(el1) || 0,
						tab2 = Syn.tabIndex(el2) || 0;
					if ( tab1 == tab2 ) {
						return order1[1] - order2[1]
					} else {
						if ( tab1 == 0 ) {
							return 1;
						} else if ( tab2 == 0 ) {
							return -1;
						} else {
							return tab1 - tab2;
						}
					}
				}
				orders.sort(sort);
				//now find current
				for ( i = 0; i < orders.length; i++ ) {
					el = orders[i][0];
					if ( this == el ) {
						if (!Syn.key.shiftKey ) {
							current = orders[i + 1][0];
							if (!current ) {
								current = orders[0][0]
							}
						} else {
							current = orders[i - 1][0];
							if (!current ) {
								current = orders[focusEls.length - 1][0]
							}
						}

					}
				}

				//restart if we didn't find anything
				if (!current ) {
					current = firstNotIndexed;
				}
				current && current.focus();
				return current;
			},
			'left': function( options, scope, key, force, sel ) {
				if ( Syn.typeable.test(this.nodeName) ) {
					if ( Syn.key.shiftKey ) {
						Syn.selectText(this, sel.start == 0 ? 0 : sel.start - 1, sel.end)
					} else {
						Syn.selectText(this, sel.start == 0 ? 0 : sel.start - 1)
					}
				}
			},
			'right': function( options, scope, key, force, sel ) {
				if ( Syn.typeable.test(this.nodeName) ) {
					if ( Syn.key.shiftKey ) {
						Syn.selectText(this, sel.start, sel.end + 1 > this.value.length ? this.value.length : sel.end + 1)
					} else {
						Syn.selectText(this, sel.end + 1 > this.value.length ? this.value.length : sel.end + 1)
					}
				}
			},
			'up': function() {
				if (/select/i.test(this.nodeName) ) {

					this.selectedIndex = this.selectedIndex ? this.selectedIndex - 1 : 0;
					//set this to change on blur?
				}
			},
			'down': function() {
				if (/select/i.test(this.nodeName) ) {
					Syn.changeOnBlur(this, "selectedIndex", this.selectedIndex)
					this.selectedIndex = this.selectedIndex + 1;
					//set this to change on blur?
				}
			},
			'shift': function() {
				return null;
			},
			'ctrl': function() {
				return null;
			}
		}
	});


	h.extend(Syn.create, {
		keydown: {
			setup: function( type, options, element ) {
				if ( h.inArray(options, Syn.key.kinds.special) != -1 ) {
					Syn.key[options + "Key"] = element;
				}
			}
		},
		keypress: {
			setup: function( type, options, element ) {
				// if this browsers supports writing keys on events
				// but doesn't write them if the element isn't focused
				// focus on the element (ignored if already focused)
				if ( Syn.support.keyCharacters && !Syn.support.keysOnNotFocused ) {
					element.focus()
				}
			}
		},
		keyup: {
			setup: function( type, options, element ) {
				if ( h.inArray(options, Syn.key.kinds.special) != -1 ) {
					Syn.key[options + "Key"] = null;
				}
			}
		},
		key: {
			// return the options for a key event
			options: function( type, options, element ) {
				//check if options is character or has character
				options = typeof options != "object" ? {
					character: options
				} : options;

				//don't change the orignial
				options = h.extend({}, options)
				if ( options.character ) {
					h.extend(options, Syn.key.options(options.character, type));
					delete options.character;
				}

				options = h.extend({
					ctrlKey: !! Syn.key.ctrlKey,
					altKey: !! Syn.key.altKey,
					shiftKey: !! Syn.key.shiftKey,
					metaKey: !! Syn.key.metaKey
				}, options)

				return options;
			},
			// creates a key event
			event: function( type, options, element ) { //Everyone Else
				var doc = h.getWindow(element).document || document;
				if ( doc.createEvent ) {
					var event;

					try {

						event = doc.createEvent("KeyEvents");
						event.initKeyEvent(type, true, true, window, options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.keyCode, options.charCode);
					}
					catch (e) {
						event = h.createBasicStandardEvent(type, options, doc);
					}
					event.synthetic = true;
					return event;
				}
				else {
					var event;
					try {
						event = h.createEventObject.apply(this, arguments);
						h.extend(event, options)
					}
					catch (e) {}

					return event;
				}
			}
		}
	});

	var convert = {
		"enter": "\r",
		"backspace": "\b",
		"tab": "\t",
		"space": " "
	}

	/**
	 * @add Syn prototype
	 */
	h.extend(Syn.init.prototype, {
		/**
		 * @function key
		 * Types a single key.  The key should be
		 * a string that matches a 
		 * [Syn.static.keycodes].
		 * 
		 * The following sends a carridge return
		 * to the 'name' element.
		 * @codestart
		 * Syn.key('\r','name')
		 * @codeend
		 * For each character, a keydown, keypress, and keyup is triggered if
		 * appropriate.
		 * @param {String} options
		 * @param {HTMLElement} [element]
		 * @param {Function} [callback]
		 * @return {HTMLElement} the element currently focused.
		 */
		_key: function( options, element, callback ) {
			//first check if it is a special up
			if (/-up$/.test(options) && h.inArray(options.replace("-up", ""), Syn.key.kinds.special) != -1 ) {
				Syn.trigger('keyup', options.replace("-up", ""), element)
				callback(true, element);
				return;
			}

			// keep reference to current activeElement
			var activeElement = h.getWindow(element).document.activeElement,			
				caret = Syn.typeable.test(element.nodeName) && getSelection(element),
				key = convert[options] || options,
				// should we run default events
				runDefaults = Syn.trigger('keydown', key, element),

				// a function that gets the default behavior for a key
				getDefault = Syn.key.getDefault,

				// how this browser handles preventing default events
				prevent = Syn.key.browser.prevent,

				// the result of the default event
				defaultResult,
				
				keypressOptions = Syn.key.options(key, 'keypress');


				if ( runDefaults ) {
					//if the browser doesn't create keypresses for this key, run default
					if (!keypressOptions ) {
						defaultResult = getDefault(key).call(element, keypressOptions, h.getWindow(element), key, undefined, caret)
					} else {
						//do keypress
						// check if activeElement changed b/c someone called focus in keydown
						if( activeElement !== h.getWindow(element).document.activeElement ) {
							element = h.getWindow(element).document.activeElement;
						}
						
						runDefaults = Syn.trigger('keypress', keypressOptions, element)
						if ( runDefaults ) {
							defaultResult = getDefault(key).call(element, keypressOptions, h.getWindow(element), key, undefined, caret)
						}
					}
				} else {
					//canceled ... possibly don't run keypress
					if ( keypressOptions && h.inArray('keypress', prevent.keydown) == -1 ) {
						// check if activeElement changed b/c someone called focus in keydown
						if( activeElement !== h.getWindow(element).document.activeElement ) {
							element = h.getWindow(element).document.activeElement;
						}
						
						Syn.trigger('keypress', keypressOptions, element)
					}
				}
				if ( defaultResult && defaultResult.nodeName ) {
					element = defaultResult
				}

				if ( defaultResult !== null ) {
					setTimeout(function() {
						Syn.trigger('keyup', Syn.key.options(key, 'keyup'), element)
						callback(runDefaults, element)
					}, 1)
				} else {
					callback(runDefaults, element)
				}


				//do mouseup
				return element;
			// is there a keypress? .. if not , run default
			// yes -> did we prevent it?, if not run ...
		},
		/**
		 * @function type
		 * Types sequence of [Syn.key key actions].  Each
		 * character is typed, one at a type.
		 * Multi-character keys like 'left' should be
		 * enclosed in square brackents.
		 * 
		 * The following types 'JavaScript MVC' then deletes the space.
		 * @codestart
		 * Syn.type('JavaScript MVC[left][left][left]\b','name')
		 * @codeend
		 * 
		 * Type is able to handle (and move with) tabs (\t).  
		 * The following simulates tabing and entering values in a form and 
		 * eventually submitting the form.
		 * @codestart
		 * Syn.type("Justin\tMeyer\t27\tjustinbmeyer@gmail.com\r")
		 * @codeend
		 * @param {String} options the text to type
		 * @param {HTMLElement} [element] an element or an id of an element
		 * @param {Function} [callback] a function to callback
		 */
		_type: function( options, element, callback ) {
			//break it up into parts ...
			//go through each type and run
			var parts = options.match(/(\[[^\]]+\])|([^\[])/g),
				self = this,
				runNextPart = function( runDefaults, el ) {
					var part = parts.shift();
					if (!part ) {
						callback(runDefaults, el);
						return;
					}
					el = el || element;
					if ( part.length > 1 ) {
						part = part.substr(1, part.length - 2)
					}
					self._key(part, el, runNextPart)
				}

				runNextPart();

		}
	});

	if(!Syn.config.support) {
		//do support code
		!function() {
			if (!document.body ) {
				setTimeout(arguments.callee, 1)
				return;
			}

			var div = document.createElement("div"),
				checkbox, submit, form, input, submitted = false,
				anchor, textarea, inputter;

			div.innerHTML = "<form id='outer'>" + 
							"<input name='checkbox' type='checkbox'/>" + 
							"<input name='radio' type='radio' />" + 
							"<input type='submit' name='submitter'/>" + 
							"<input type='input' name='inputter'/>" + 
							"<input name='one'>" + 
							"<input name='two'/>" + 
							"<a href='#abc'></a>" + 
							"<textarea>1\n2</textarea>" +
							"</form>";

			document.documentElement.appendChild(div);
			form = div.firstChild;
			checkbox = form.childNodes[0];
			submit = form.childNodes[2];
			anchor = form.getElementsByTagName("a")[0];
			textarea = form.getElementsByTagName("textarea")[0];
			inputter = form.childNodes[3];

			form.onsubmit = function( ev ) {
				if ( ev.preventDefault ) ev.preventDefault();
				Syn.support.keypressSubmits = true;
				ev.returnValue = false;
				return false;
			};
			// Firefox 4 won't write key events if the element isn't focused
			inputter.focus();
			Syn.trigger("keypress", "\r", inputter);


			Syn.trigger("keypress", "a", inputter);
			Syn.support.keyCharacters = inputter.value == "a";


			inputter.value = "a";
			Syn.trigger("keypress", "\b", inputter);
			Syn.support.backspaceWorks = inputter.value == "";



			inputter.onchange = function() {
				Syn.support.focusChanges = true;
			}
			inputter.focus();
			Syn.trigger("keypress", "a", inputter);
			form.childNodes[5].focus(); // this will throw a change event
			Syn.trigger("keypress", "b", inputter);
			Syn.support.keysOnNotFocused = inputter.value == "ab";

			//test keypress \r on anchor submits
			Syn.bind(anchor, "click", function( ev ) {
				if ( ev.preventDefault ) ev.preventDefault();
				Syn.support.keypressOnAnchorClicks = true;
				ev.returnValue = false;
				return false;
			})
			Syn.trigger("keypress", "\r", anchor);

			Syn.support.textareaCarriage = textarea.value.length == 4;
			
			document.documentElement.removeChild(div);

			Syn.support.ready++;
		}();
	}
	else {
		Syn.helpers.extend(Syn.support, Syn.config.support);
	}

	return Syn;
})(__m2, __m4);

// ## drag/drag.js
var __m6 = (function(Syn) {
	
	// check if elementFromPageExists
	(function() {

		// document body has to exists for this test
		if (!document.body ) {
			setTimeout(arguments.callee, 1)
			return;
		}
		var div = document.createElement('div')
		document.body.appendChild(div);
		Syn.helpers.extend(div.style, {
			width: "100px",
			height: "10000px",
			backgroundColor: "blue",
			position: "absolute",
			top: "10px",
			left: "0px",
			zIndex: 19999
		});
		document.body.scrollTop = 11;
		if (!document.elementFromPoint ) {
			return;
		}
		var el = document.elementFromPoint(3, 1)
		if ( el == div ) {
			Syn.support.elementFromClient = true;
		}
		else {
			Syn.support.elementFromPage = true;
		}
		document.body.removeChild(div);
		document.body.scrollTop = 0;
	})();


	//gets an element from a point
	var elementFromPoint = function( point, element ) {
		var clientX = point.clientX,
			clientY = point.clientY,
			win = Syn.helpers.getWindow(element),
			el;



		if ( Syn.support.elementFromPage ) {
			var off = Syn.helpers.scrollOffset(win);
			clientX = clientX + off.left; //convert to pageX
			clientY = clientY + off.top; //convert to pageY
		}
		el = win.document.elementFromPoint ? win.document.elementFromPoint(clientX, clientY) : element;
		if ( el === win.document.documentElement && (point.clientY < 0 || point.clientX < 0) ) {
			return element;
		} else {
			return el;
		}
	},
		//creates an event at a certain point
		createEventAtPoint = function( event, point, element ) {
			var el = elementFromPoint(point, element)
			Syn.trigger(event, point, el || element)
			return el;
		},
		// creates a mousemove event, but first triggering mouseout / mouseover if appropriate
		mouseMove = function( point, element, last ) {
			var el = elementFromPoint(point, element)
			if ( last != el && el && last ) {
				var options = Syn.helpers.extend({}, point);
				options.relatedTarget = el;
				Syn.trigger("mouseout", options, last);
				options.relatedTarget = last;
				Syn.trigger("mouseover", options, el);
			}

			Syn.trigger("mousemove", point, el || element)
			return el;
		},
		// start and end are in clientX, clientY
		startMove = function( start, end, duration, element, callback ) {
			var startTime = new Date(),
				distX = end.clientX - start.clientX,
				distY = end.clientY - start.clientY,
				win = Syn.helpers.getWindow(element),
				current = elementFromPoint(start, element),
				cursor = win.document.createElement('div'),
				calls = 0;
			move = function() {
				//get what fraction we are at
				var now = new Date(),
					scrollOffset = Syn.helpers.scrollOffset(win),
					fraction = (calls == 0 ? 0 : now - startTime) / duration,
					options = {
						clientX: distX * fraction + start.clientX,
						clientY: distY * fraction + start.clientY
					};
				calls++;
				if ( fraction < 1 ) {
					Syn.helpers.extend(cursor.style, {
						left: (options.clientX + scrollOffset.left + 2) + "px",
						top: (options.clientY + scrollOffset.top + 2) + "px"
					})
					current = mouseMove(options, element, current)
					setTimeout(arguments.callee, 15)
				}
				else {
					current = mouseMove(end, element, current);
					win.document.body.removeChild(cursor)
					callback();
				}
			}
			Syn.helpers.extend(cursor.style, {
				height: "5px",
				width: "5px",
				backgroundColor: "red",
				position: "absolute",
				zIndex: 19999,
				fontSize: "1px"
			})
			win.document.body.appendChild(cursor)
			move();
		},
		startDrag = function( start, end, duration, element, callback ) {
			createEventAtPoint("mousedown", start, element);
			startMove(start, end, duration, element, function() {
				createEventAtPoint("mouseup", end, element);
				callback();
			})
		},
		center = function( el ) {
			var j = Syn.jquery()(el),
				o = j.offset();
			return {
				pageX: o.left + (j.outerWidth() / 2),
				pageY: o.top + (j.outerHeight() / 2)
			}
		},
		convertOption = function( option, win, from ) {
			var page = /(\d+)[x ](\d+)/,
				client = /(\d+)X(\d+)/,
				relative = /([+-]\d+)[xX ]([+-]\d+)/
				//check relative "+22x-44"
				if ( typeof option == 'string' && relative.test(option) && from ) {
					var cent = center(from),
						parts = option.match(relative);
					option = {
						pageX: cent.pageX + parseInt(parts[1]),
						pageY: cent.pageY + parseInt(parts[2])
					}
				}
				if ( typeof option == 'string' && page.test(option) ) {
					var parts = option.match(page)
					option = {
						pageX: parseInt(parts[1]),
						pageY: parseInt(parts[2])
					}
				}
				if ( typeof option == 'string' && client.test(option) ) {
					var parts = option.match(client)
					option = {
						clientX: parseInt(parts[1]),
						clientY: parseInt(parts[2])
					}
				}
				if ( typeof option == 'string' ) {
					option = Syn.jquery()(option, win.document)[0];
				}
				if ( option.nodeName ) {
					option = center(option)
				}
				if ( option.pageX ) {
					var off = Syn.helpers.scrollOffset(win);
					option = {
						clientX: option.pageX - off.left,
						clientY: option.pageY - off.top
					}
				}
				return option;
		},
		// if the client chords are not going to be visible ... scroll the page so they will be ...
		adjust = function(from, to, win){
			if(from.clientY < 0){
				var off = Syn.helpers.scrollOffset(win);
				var dimensions = Syn.helpers.scrollDimensions(win),
					top = off.top + (from.clientY) - 100,
					diff = top - off.top
				
				// first, lets see if we can scroll 100 px
				if( top > 0){
					
				} else {
					top =0;
					diff = -off.top;
				}
				from.clientY = from.clientY - diff;
				to.clientY = to.clientY - diff;
				Syn.helpers.scrollOffset(win,{top: top, left: off.left});
				
				//throw "out of bounds!"
			}
		}
		/**
		 * @add Syn prototype
		 */
		Syn.helpers.extend(Syn.init.prototype, {
			/**
			 * @function move
			 * Moves the cursor from one point to another.  
			 * 
			 * ### Quick Example
			 * 
			 * The following moves the cursor from (0,0) in
			 * the window to (100,100) in 1 second.
			 * 
			 *     Syn.move(
			 *          {
			 *            from: {clientX: 0, clientY: 0},
			 *            to: {clientX: 100, clientY: 100},
			 *            duration: 1000
			 *          },
			 *          document.document)
			 * 
			 * ## Options
			 * 
			 * There are many ways to configure the endpoints of the move.
			 * 
			 * ### PageX and PageY
			 * 
			 * If you pass pageX or pageY, these will get converted
			 * to client coordinates.
			 * 
			 *     Syn.move(
			 *          {
			 *            from: {pageX: 0, pageY: 0},
			 *            to: {pageX: 100, pageY: 100}
			 *          },
			 *          document.document)
			 * 
			 * ### String Coordinates
			 * 
			 * You can set the pageX and pageY as strings like:
			 * 
			 *     Syn.move(
			 *          {
			 *            from: "0x0",
			 *            to: "100x100"
			 *          },
			 *          document.document)
			 * 
			 * ### Element Coordinates
			 * 
			 * If jQuery is present, you can pass an element as the from or to option
			 * and the coordinate will be set as the center of the element.
			 
			 *     Syn.move(
			 *          {
			 *            from: $(".recipe")[0],
			 *            to: $("#trash")[0]
			 *          },
			 *          document.document)
			 * 
			 * ### Query Strings
			 * 
			 * If jQuery is present, you can pass a query string as the from or to option.
			 * 
			 * Syn.move(
			 *      {
			 *        from: ".recipe",
			 *        to: "#trash"
			 *      },
			 *      document.document)
			 *    
			 * ### No From
			 * 
			 * If you don't provide a from, the element argument passed to Syn is used.
			 * 
			 *     Syn.move(
			 *          { to: "#trash" },
			 *          'myrecipe')
			 * 
			 * ### Relative
			 * 
			 * You can move the drag relative to the center of the from element.
			 * 
			 *     Syn.move("+20 +30", "myrecipe");
			 * 
			 * @param {Object} options options to configure the drag
			 * @param {HTMLElement} from the element to move
			 * @param {Function} callback a callback that happens after the drag motion has completed
			 */
			_move: function( options, from, callback ) {
				//need to convert if elements
				var win = Syn.helpers.getWindow(from),
					fro = convertOption(options.from || from, win, from),
					to = convertOption(options.to || options, win, from);
				
				options.adjust !== false && adjust(fro, to, win);
				startMove(fro, to, options.duration || 500, from, callback);

			},
			/**
			 * @function drag
			 * Creates a mousedown and drags from one point to another.  
			 * Check out [Syn.prototype.move move] for API details.
			 * 
			 * @param {Object} options
			 * @param {Object} from
			 * @param {Object} callback
			 */
			_drag: function( options, from, callback ) {
				//need to convert if elements
				var win = Syn.helpers.getWindow(from),
					fro = convertOption(options.from || from, win, from),
					to = convertOption(options.to || options, win, from);

				options.adjust !== false && adjust(fro, to, win);
				startDrag(fro, to, options.duration || 500, from, callback);

			}
		})
	return Syn;
})(__m2);

// ## syn.js
var __m1 = (function(Syn){
	window.Syn = Syn;

	return Syn;
})(__m2, __m3, __m4, __m5, __m6);

}(window);
!function(window) {

// ## browser/init.js
var __m5 = (function(jQuery) {
	var FuncUnit = window.FuncUnit || {};

	jQuery.sub = function() {
		function jQuerySub( selector, context ) {
			return new jQuerySub.fn.init( selector, context );
		}
		jQuery.extend( true, jQuerySub, this );
		jQuerySub.superclass = this;
		jQuerySub.fn = jQuerySub.prototype = this();
		jQuerySub.fn.constructor = jQuerySub;
		jQuerySub.sub = this.sub;
		jQuerySub.fn.init = function init( selector, context ) {
			if ( context && context instanceof jQuery && !(context instanceof jQuerySub) ) {
				context = jQuerySub( context );
			}

			return jQuery.fn.init.call( this, selector, context, rootjQuerySub );
		};
		jQuerySub.fn.init.prototype = jQuerySub.fn;
		var rootjQuerySub = jQuerySub(document);
		return jQuerySub;
	};

	FuncUnit.jQuery = jQuery;
	return FuncUnit;
})(jQuery);

// ## browser/core.js
var __m3 = (function(jQuery, oldFuncUnit) {
	var FuncUnit = oldFuncUnit.jQuery.sub();
	var origFuncUnit = FuncUnit;
	// override the subbed init method
	// context can be an object with frame and forceSync:
	// - a number or string: this is a frame name/number, and means only do a sync query
	// - true: means force the query to be sync only
	FuncUnit = function( selector, frame ) {
		// if you pass true as context, this will avoid doing a synchronous query
		var frame,
			forceSync, 
			isSyncOnly = false;
		
		if(frame && frame.forceSync){
			forceSync = frame.forceSync;
		}
		
		if(frame && typeof frame.frame !== "undefined"){ // its passed as an object
			frame = frame.frame;
		}
		
		isSyncOnly = typeof forceSync === "boolean"? forceSync: isSyncOnly;
		// if its a function, just run it in the queue
		if(typeof selector == "function"){
			return FuncUnit.wait(0, selector);
		}
		// if the app window already exists, adjust the params (for the sync return value)
		this.selector = selector;
		// run this method in the queue also
		if(isSyncOnly === true){
			var collection = performSyncQuery(selector, frame);
			return collection;
		} else { // do both
			performAsyncQuery(selector, frame, this);
			var collection = performSyncQuery(selector, frame);
			return collection;
		}
	}


	
	var getContext = function(context){
			if (typeof context === "number" || typeof context === "string") {
				// try to get the context from an iframe in the funcunit document
				var sel = (typeof context === "number" ? "iframe:eq(" + context + ")" : "iframe[name='" + context + "']"),
					frames = new origFuncUnit.fn.init(sel, FuncUnit.win.document.documentElement, true);
				var frame = (frames.length ? frames.get(0).contentWindow : FuncUnit.win).document.documentElement;
				
			} else {
				frame = FuncUnit.win.document.documentElement;
			}
			return frame;
		},
		performAsyncQuery = function(selector, frame, self){
			FuncUnit.add({
				method: function(success, error){
					this.frame = frame;
					if (FuncUnit.win) {
						frame = getContext(frame);
					}
					this.selector = selector;
					this.bind = new origFuncUnit.fn.init( selector, frame, true );
					success();
					return this;
				},
				error: "selector failed: " + selector,
				type: "query"
			});
		},
		performSyncQuery = function(selector, frame){
			var origFrame = frame;
			if (FuncUnit.win) {
				frame = getContext(frame);
			}
			var obj = new origFuncUnit.fn.init( selector, frame, true );
			obj.frame = origFrame;
			return obj;
		}
	
	oldFuncUnit.jQuery.extend(FuncUnit, oldFuncUnit, origFuncUnit)
	FuncUnit.prototype = origFuncUnit.prototype;
	return FuncUnit;
})(jQuery, __m5);

// ## browser/adapters/jasmine.js
var __m7 = (function(FuncUnit) {
	if(window.jasmine) {
		var paused = false;
		FuncUnit.unit = {
			pauseTest:function(){
				paused = true;
				waitsFor(function(){
					return paused === false;
				}, 60000)
			},
			resumeTest: function(){
				paused = false;
			},
			assertOK: function(assertion, message){
				expect(assertion).toBeTruthy();
			},
			equiv: function(expected, actual){
				return jasmine.getEnv().equals_(expected, actual)
			}
		}
		return FuncUnit;
	}
})(__m3);

// ## browser/adapters/qunit.js
var __m8 = (function(FuncUnit) {
	if(window.QUnit) {
		FuncUnit.unit = {
		pauseTest:function(){
			stop();
		},
		resumeTest: function(){
			start();
		},
		assertOK: function(assertion, message){
			ok(assertion, message)
		},
		equiv: function(expected, actual){
			return QUnit.equiv(expected, actual);
		}
	}
	}
})(__m3);

// ## browser/adapters/adapters.js
var __m6 = (function() {})(__m7, __m8);

// ## browser/open.js
var __m9 = (function($, FuncUnit) {
	if(FuncUnit.frameMode){
		var ifrm = document.createElement("iframe");
		ifrm.id = 'funcunit_app';
		document.body.insertBefore(ifrm, document.body.firstChild);
	}

var confirms = [], 
	prompts = [], 
	currentDocument,
	currentHref,
	// pointer to the popup window
	appWin, 
	lookingForNewDocument = false,
	urlWithoutHash = function(url){
		return url.replace(/\#.*$/, "");
	},
	// returns true if url matches current window's url
	isCurrentPage = function(url){
		var pathname = urlWithoutHash(FuncUnit.win.location.pathname),
			href = urlWithoutHash(FuncUnit.win.location.href),
			url = urlWithoutHash(url);
		// must strip off hash from URLs
		if( pathname === url || href === url ){
			return true;
		}
		return false;
	};
/**
 * @add FuncUnit
 */
//
$.extend(FuncUnit,{
	// open is a method

	/**
     * @parent utilities
     * @function FuncUnit.open F.open()
     * @signature `open(path, success, timeout)`
     *
	 * Opens a page.  It will error if the page can't be opened before timeout. If a URL begins with "//", pages are opened 
	 * from the FuncUnit root (the root folder where funcunit is located)
	 * ### Example
     *
     * @codestart
     * F.open("//app/app.html")
     * @codeend
	 * 
	 * @param {String} path a full or partial url to open.
	 * @param {Function} success
	 * @param {Number} timeout
     * @return {undefined}
	 */
	open: function( path, success, timeout ) {
		if(typeof success != 'function'){
			timeout = success;
			success = undefined;
		}
		FuncUnit.add({
			method: function(success, error){ //function that actually does stuff, if this doesn't call success by timeout, error will be called, or can call error itself
				if(typeof path === "string"){
					var fullPath = FuncUnit.getAbsolutePath(path);
					FuncUnit._open(fullPath, error);
					FuncUnit._onload(function(){
						success()
					}, error);
				} else {
					FuncUnit.win = path;
					success();
				}
			},
			success: success,
			error: "Page " + path + " not loaded in time!",
			timeout: timeout || 30000
		});
	},
	_open: function(url){
		FuncUnit.win = appWin;
		hasSteal = false;
		// this will determine if this is supposed to open within a frame
		FuncUnit.frame =  $('#funcunit_app').length? $('#funcunit_app')[0]: null;
	
		// if the first time ..
		if (newPage) {
			if(FuncUnit.frame){
				FuncUnit.win = FuncUnit.frame.contentWindow;
				FuncUnit.win.location = url;
			}
			else{
				// giving a large height forces it to not open in a new tab and just opens to the window's height
				var width = $(window).width();
				FuncUnit.win = window.open(url, "funcunit",  "height=1000,toolbar=yes,status=yes,width="+width/2+",left="+width/2);
				// This is mainly for opera. Other browsers will hit the unload event and close the popup.
				// This block breaks in IE (which never reaches it) because after closing a window, it throws access 
				// denied any time you try to access it, even after reopening.
				if(FuncUnit.win.___FUNCUNIT_OPENED) {
					FuncUnit.win.close();
					FuncUnit.win = window.open(url, "funcunit",  "height=1000,toolbar=yes,status=yes,left="+width/2);
				}
				
				
				if(!FuncUnit.win){
					throw "Could not open a popup window.  Your popup blocker is probably on.  Please turn it off and try again";
				}
			}
			appWin = FuncUnit.win;
		}
		// otherwise, change the frame's url
		else {
			lookingForNewDocument = true;
			if(isCurrentPage(url)){
				/*Sometimes readyState does not correctly reset itself, so we remove the
				body from the document we are navigating away from, which will get set again
				when the page has reloaded*/
				FuncUnit.win.document.body.parentNode.removeChild(FuncUnit.win.document.body);
				// set the hash and reload
				FuncUnit.win.location.hash = url.split('#')[1] || '';
				FuncUnit.win.location.reload(true);
			} else {
				// setting the location forces a reload; IE freaks out if you try to do both
				FuncUnit.win.location = url;
			}
			// setting to null b/c opera uses the same document
			currentDocument = null;
		}
		lookingForNewDocument = true;
	},
	/**
	 * @parent utilities
     * @function FuncUnit.confirm F.confirm()
     * @signature `confirm(answer)`
     *
	 * When a browser's native confirm dialog is used, this method is used to repress the dialog and simulate
	 * clicking OK or Cancel.  Alerts are repressed by default in FuncUnit application windows.
     *
	 * @codestart
	 * F.confirm(true);
	 * @codeend
     *
	 * @param {Boolean} answer true if you want to click OK, false otherwise
     * @return {undefined}
	 */
	confirm: function(answer){
		confirms.push(!!answer)
	},
	/**
	 * @parent utilities
     * @function FuncUnit.prompt F.prompt()
     * @signature `prompt(answer)`
     *
	 * When a browser's native prompt dialog is used, this method is used to repress the dialog and simulate 
	 * clicking typing something into the dialog.
	 * @codestart
	 * F.prompt("Harry Potter");
	 * @codeend
	 * @param {String} answer Whatever you want to simulate a user typing in the prompt box
     * @return {undefined}
	 */
	prompt: function(answer){
		prompts.push(answer)
	},
	_opened: function(){
		if (!this._isOverridden("alert")) {
			FuncUnit.win.alert = function(){}
		}
		
		if (!this._isOverridden("confirm")) {
			FuncUnit.win.confirm = function(){
				var res = confirms.shift();
				return res;
			}
		}
		
		if (!this._isOverridden("prompt")) {
			FuncUnit.win.prompt = function(){
				return prompts.shift();
			}
		}
	},
	_isOverridden:function(type) {
		return !(/(native code)|(source code not available)/.test(FuncUnit.win[type]));
	},
	_onload: function(success, error){
		// saver reference to success
		loadSuccess = function(){
			if(FuncUnit.win.steal){
				hasSteal = true;
			}
			// called when load happens ... here we check for steal
			// console.log("success", (FuncUnit.win.steal && FuncUnit.win.steal.isReady) || !hasSteal, 
				// "isReady", (FuncUnit.win.steal && FuncUnit.win.steal.isReady));
			if((FuncUnit.win.steal && FuncUnit.win.steal.isReady) || !hasSteal){
				success();
			}else{
				setTimeout(arguments.callee, 200)
			}
				
		}
		
		// we only need to do this setup stuff once ...
		if (!newPage) {
			return;
		}
		newPage = false;
		
		if (FuncUnit.support.readystate)
		{
			poller();
		}
		else {
			unloadLoader();
		}
		
	},
	/**
	 * @hide
	 * @parent utilities
	 * Gets a path
	 * @param {String} path
	 */
	getAbsolutePath: function( path ) {
		if ( /^\/\//.test(path) ){
			path = path.substr(2);
		}
		return path;
	},
	/**
	 * @parent utilities
	 * @property {window} FuncUnit.win F.win()
	 * Use this to refer to the window of the application page.
	 * @codestart
	 *F(F.window).innerWidth(function(w){
	 *   ok(w > 1000, "window is more than 1000 px wide")
	 * })
	 * @codeend
	 */
	win: window,
	// for feature detection
	support: {
		readystate: "readyState" in document
	},
	/**
	 * @parent utilities
     * @function FuncUnit.eval F.eval()
     * @signature `eval(str)`
     *
	 * Used to evaluate code in the application page.
	 * @param {String} str the code to evaluate
	 * @return {Object} the result of the evaluated code
	 */
	eval: function(str){
		return FuncUnit.win.eval(str)
	},
	// return true if document is currently loaded, false if its loading
	// actions check this
	documentLoaded: function(){
		var loaded = FuncUnit.win.document.readyState === "complete" && 
				     FuncUnit.win.location.href != "about:blank" &&
				     FuncUnit.win.document.body;
		return loaded;
	},
	// return true if new document found
	checkForNewDocument: function(){
		var documentFound = false;

		// right after setting a new hash and reloading, IE barfs on this occassionally (only the first time)
		try {
			documentFound = ((FuncUnit.win.document !== currentDocument && // new document 
							!FuncUnit.win.___FUNCUNIT_OPENED) // hasn't already been marked loaded
							// covers opera case after you click a link, since document doesn't change in opera
							|| (currentHref != FuncUnit.win.location.href)) && // url is different 
							FuncUnit.documentLoaded(); // fully loaded
		} catch(e){}
		if(documentFound){
			// reset flags
			lookingForNewDocument = false;
			currentDocument = FuncUnit.win.document;
			currentHref = FuncUnit.win.location.href;
			
			// mark it as opened
			FuncUnit.win.___FUNCUNIT_OPENED = true;
			// reset confirm, prompt, alert
			FuncUnit._opened();
		}
		
		return documentFound;
	}
});

	//don't do any of this if in rhino
	if (navigator.userAgent.match(/Rhino/)) {
		return;	
	}
	
	
	var newPage = true, 
		hasSteal = false,
		unloadLoader, 
		loadSuccess, 
		firstLoad = true,
		onload = function(){
			FuncUnit.win.document.documentElement.tabIndex = 0;
			setTimeout(function(){
				FuncUnit.win.focus();
				var ls = loadSuccess
				loadSuccess = null;
				if (ls) {
					ls();
				}
			}, 0);
			Syn.unbind(FuncUnit.win, "load", onload);
		},
		onunload = function(){
			FuncUnit.stop = true;
			removeListeners();
			setTimeout(unloadLoader, 0)
			
		},
		removeListeners = function(){
			Syn.unbind(FuncUnit.win, "unload", onunload);
			Syn.unbind(FuncUnit.win, "load", onload);
		}
	unloadLoader = function(){
		if(!firstLoad) // dont remove the first run, fixes issue in FF 3.6
			removeListeners();
		
		Syn.bind(FuncUnit.win, "load", onload);
		
		//listen for unload to re-attach
		Syn.bind(FuncUnit.win, "unload", onunload)
	}
	
	//check for window location change, documentChange, then readyState complete -> fire load if you have one
	var newDocument = false, 
		poller = function(){
			var ls;
			
			if (lookingForNewDocument && FuncUnit.checkForNewDocument() ) {
				
				ls = loadSuccess;
				
				loadSuccess = null;
				if (ls) {
					FuncUnit.win.focus();
					FuncUnit.win.document.documentElement.tabIndex = 0;
					
					ls();
				}
			}
			
		setTimeout(arguments.callee, 500)
	}

	// All browsers except Opera close the app window on a reload.  This is to fix the case the URL to be opened 
	// has a hash.  In this case, window.open doesn't cause a reload if you reuse an existing popup, so we need to close.
	$(window).unload(function(){
		if(FuncUnit.win && FuncUnit.win !== window.top) {
			FuncUnit.win.close();
		}
	});

	return FuncUnit;
})(jQuery, __m3);

// ## browser/actions.js
var __m10 = (function($, FuncUnit, Syn) {
	window.Syn = Syn;
	/**
	 * @add FuncUnit
	 */
	var clicks = [
	// methods
	/**
     *
	 * @function FuncUnit.prototype.click .click()
     * @parent actions
     * @signature `click(options [,success])`
     *
	 * Clicks an element.  This uses [Syn.prototype.click] to issue a:
	 * <ul>
	 * 	<li><code>mousedown</code></li>
	 *  <li><code>focus</code> - if the element is focusable</li>
	 *  <li><code>mouseup</code></li>
	 *  <li><code>click</code></li>
	 * </ul>
	 * If no clientX/Y or pageX/Y is provided as options, the click happens at the 
	 * center of the element.
	 * <p>For a right click or double click use [FuncUnit.prototype.rightClick] or
	 *   [FuncUnit.prototype.dblclick].</p>
	 * <h3>Example</h3>
	 * @codestart
	 * //clicks the bar element
	 *F("#bar").click()
	 * @codeend
	 * @param {Object} [options] options to pass to the click event.  Typically, this is clientX/Y or pageX/Y:
	 * @codestart
	 * $('#foo').click({pageX: 200, pageY: 100});
	 * @codeend
	 * You can pass it any of the serializable parameters you'd send to 
	 * [http://developer.mozilla.org/en/DOM/event.initMouseEvent initMouseEvent], but command keys are 
	 * controlled by [FuncUnit.prototype.type].
     *
	 * @param {Function} [success] a callback that runs after the click, but before the next action.
	 * @return {funcUnit} returns the funcunit object for chaining.
	 */
	'click',
	/**
     * @function FuncUnit.prototype.dblclick .dblclick()
     * @parent actions
     * @signature `dblclick(options [,success])`
     *
	 * Double clicks an element by [FuncUnit.prototype.click clicking] it twice and triggering a dblclick event.
	 * @param {Object} options options to add to the mouse events.  This works
	 * the same as [FuncUnit.prototype.click]'s options.
	 * @param {Function} [success] a callback that runs after the double click, but before the next action.
	 * @return {funcUnit} returns the funcunit object for chaining.
	 */
	'dblclick',
	/**
     * @function FuncUnit.prototype.rightClick .rightClick()
     * @parent actions
     * @signature `rightClick(options [,success])`
	 * Right clicks an element.  This typically results in a contextmenu event for browsers that
	 * support it.
	 * @param {Object} options options to add to the mouse events.  This works
	 * the same as [FuncUnit.prototype.click]'s options.
	 * @param {Function} [success] a callback that runs after the click, but before the next action.
	 * @return {funcUnit} returns the funcunit object for chaining.
	 */
	'rightClick'],
		makeClick = function(name){
			FuncUnit.prototype[name] = function(options, success){
				this._addExists();
				if(typeof options == 'function'){
					success = options;
					options = {};
				}
				var selector = this.selector;
				FuncUnit.add({
					method: function(success, error){
						options = options || {};
						Syn("_" + name, options, this.bind[0],success);
					},
					success: success,
					error: "Could not " + name + " '" + this.selector+"'",
					bind: this,
					type: "action"
				});
				return this;
			}
		}
	
	for(var i=0; i < clicks.length; i++){
		makeClick(clicks[i])
	}
	
	$.extend(FuncUnit.prototype, {
		// perform check even if last queued item is a wait beacuse certain waits don't guarantee the element is visible (like text)
		_addExists: function(){
			this.exists(false);
		},
		/**
         * @function FuncUnit.prototype.type .type()
         * @parent actions
         * @signature `type(text [,success])`
         *
		 * Types text into an element.  This makes use of [Syn.type] and works in 
		 * a very similar way.
		 * <h3>Quick Examples</h3>
		 * @codestart
		 * //types hello world
		 *F('#bar').type('hello world')
		 * 
		 * //submits a form by typing \r
		 *F("input[name=age]").type("27\r")
		 * 
		 * //types FuncUnit, then deletes the Unit
		 *F('#foo').type("FuncUnit\b\b\b\b")
		 * 
		 * //types JavaScriptMVC, then removes the MVC
		 *F('#zar').type("JavaScriptMVC[left][left][left]"+
		 *                      "[delete][delete][delete]")
		 *          
		 * //types JavaScriptMVC, then selects the MVC and
		 * //deletes it
		 *F('#zar').type("JavaScriptMVC[shift]"+
		 *                "[left][left][left]"+
		 *                "[shift-up][delete]")
		 * @codeend
		 *
		 * <h2>Characters</h2>
		 * 
		 * For a list of the characters you can type, check [Syn.keycodes].
		 * 
		 * @param {String} text the text you want to type
		 * @param {Function} [success] a callback that is run after typing, but before the next action.
		 * @return {FuncUnit} returns the funcUnit object for chaining.
		 */
		type: function( text, success ) {
			this._addExists();
			// when you type in something you have to click on it first
			this.click();
			var selector = this.selector;
			// type("") is a shortcut for clearing out a text input
			if(text === ""){
				text = "[ctrl]a[ctrl-up]\b"
			}
			FuncUnit.add({
				method : function(success, error){
					Syn("_type", text, this.bind[0], success);
					
				},
				success : success,
				error : "Could not type " + text + " into " + this.selector,
				bind : this,
				type: "action"
			});
			return this;
		},
		trigger: function(evName, success){
			this._addExists();
			FuncUnit.add({
				method : function(success, error){
					// need to use the page's jquery to trigger events
					FuncUnit.win.jQuery(this.bind.selector).trigger(evName)
					success()
				},
				success : success,
				error : "Could not trigger " + evName,
				bind : this,
				type: "action"
			});
			return this;
		},
		/**
         * @function FuncUnit.prototype.drag .drag()
         * @parent actions
         * @signature `drag(options [,success])`
		 * Drags an element into another element or coordinates.  
		 * This takes the same paramameters as [Syn.prototype.move move].
		 * @param {String|Object} options A selector or coordinates describing the motion of the drag.
		 * <h5>Options as a Selector</h5>
		 * Passing a string selector to drag the mouse.  The drag runs to the center of the element
		 * matched by the selector.  The following drags from the center of #foo to the center of #bar.
		 * @codestart
		 *F('#foo').drag('#bar') 
		 * @codeend
		 * <h5>Options as Coordinates</h5>
		 * You can pass in coordinates as clientX and clientY:
		 * @codestart
		 *F('#foo').drag('100x200') 
		 * @codeend
		 * Or as pageX and pageY
		 * @codestart
		 *F('#foo').drag('100X200') 
		 * @codeend
		 * Or relative to the start position
		 *F('#foo').drag('+10 +20')
		 * <h5>Options as an Object</h5>
		 * You can configure the duration, start, and end point of a drag by passing in a json object.
		 * @codestart
		 * //drags from 0x0 to 100x100 in 2 seconds
		 *F('#foo').drag({
		 *   from: "0x0",
		 *   to: "100x100",
		 *   duration: 2000
		 * }) 
		 * @codeend
		 * @param {Function} [success] a callback that runs after the drag, but before the next action.
		 * @return {funcUnit} returns the funcunit object for chaining.
		 */
		drag: function( options, success ) {
			this._addExists();
			if(typeof options == 'string'){
				options = {to: options}
			}
			options.from = this.selector;
	
			var selector = this.selector;
			FuncUnit.add({
				method: function(success, error){
					Syn("_drag", options, this.bind[0],success);
				},
				success: success,
				error: "Could not drag " + this.selector,
				bind: this,
				type: "action"
			})
			return this;
		},
		/**
         * @function FuncUnit.prototype.move .move()
         * @parent actions
         * @signature `move(options [,success])`
		 * Moves an element into another element or coordinates.  This will trigger mouseover
		 * mouseouts accordingly.
		 * This takes the same paramameters as [Syn.prototype.move move].
		 * @param {String|Object} options A selector or coordinates describing the motion of the move.
		 * <h5>Options as a Selector</h5>
		 * Passing a string selector to move the mouse.  The move runs to the center of the element
		 * matched by the selector.  The following moves from the center of #foo to the center of #bar.
		 * @codestart
		 *F('#foo').move('#bar') 
		 * @codeend
		 * <h5>Options as Coordinates</h5>
		 * You can pass in coordinates as clientX and clientY:
		 * @codestart
		 *F('#foo').move('100x200') 
		 * @codeend
		 * Or as pageX and pageY
		 * @codestart
		 *F('#foo').move('100X200') 
		 * @codeend
		 * Or relative to the start position
		 *F('#foo').move('+10 +20')
		 * <h5>Options as an Object</h5>
		 * You can configure the duration, start, and end point of a move by passing in a json object.
		 * @codestart
		 * //drags from 0x0 to 100x100 in 2 seconds
		 *F('#foo').move({
		 *   from: "0x0",
		 *   to: "100x100",
		 *   duration: 2000
		 * }) 
		 * @codeend
		 * @param {Function} [success] a callback that runs after the drag, but before the next action.
		 * @return {funcUnit} returns the funcunit object for chaining.
		 */
		move: function( options, success ) {
			this._addExists();
			if(typeof options == 'string'){
				options = {to: options}
			}
			options.from = this.selector;
	
			var selector = this.selector;
			FuncUnit.add({
				method: function(success, error){
					Syn("_move", options, this.bind[0], success);
				},
				success: success,
				error: "Could not move " + this.selector,
				bind: this,
				type: "action"
			});
			return this;
		},
		/**
         * @function FuncUnit.prototype.scroll .scroll()
         * @parent actions
         * @signature `scroll(direction, amount, success)`
		 * Scrolls an element in a particular direction by setting the scrollTop or srollLeft.
		 * @param {String} direction "left" or "top"
		 * @param {Number} amount number of pixels to scroll
		 * @param {Function} success
		 */
		scroll: function( direction, amount, success ) {
			this._addExists();
			var selector = this.selector,
				direction;
			if (direction == "left" || direction == "right") {
				direction = "Left";
			} else if (direction == "top" || direction == "bottom") {
				direction = "Top";
			}
			FuncUnit.add({
				method: function(success, error){
					this.bind.each(function(i, el){
						this["scroll" + direction] = amount;
					})
					success();
				},
				success: success,
				error: "Could not scroll " + this.selector,
				bind: this,
				type: "action"
			});
			return this;
		}
	})
	return FuncUnit;
})(jQuery, __m3, Syn);

// ## browser/getters.js
var __m11 = (function($, FuncUnit) {
	
	/**
	 * @add FuncUnit
	 */
	//list of jQuery functions we want, number is argument index
	//for wait instead of getting value
	FuncUnit.funcs = {
	// methods
	/**
     * @function FuncUnit.prototype.size .size()
     * @parent dimensions
     * @signature `size([size] [,timeout] [,success] [,message])`
	 * Gets the number of elements matched by the selector or
	 * waits until the the selector is size.  You can also 
	 * provide a function that continues to the next action when
	 * it returns true.
	 * @codestart
	 *F(".recipe").size() //gets the number of recipes
	 * 
	 *F(".recipe").size(2) //waits until there are 2 recipes
	 * 
	 * //waits until size is count
	 *F(".recipe").size(function(size){
	 *   return size == count;
	 * })
	 * @codeend
	 * @param {Number|Function} [size] number or a checking function.
	 * @param {Number} [timeout] overrides FuncUnit.timeout.  If provided, the wait will fail if not completed before this timeout.
	 * @param {Function} [success] a callback that will run after this action completes.
	 * @param {String} [message] if provided, an assertion will be passed when this wait condition completes successfully
	 * @return {Number} if the size parameter is not provided, size returns the number
	 * of elements matched.
	 */
	'size' : 0,
	/**
     * @function FuncUnit.prototype.attr .attr()
     * @parent manipulation
     * @signature `attr(data, value [,timeout] [,success] [,message])`
	 * Gets the value of an attribute from an element or waits until the attribute
	 * equals the attr param.
	 * @codestart
	 * //waits until the abc attribute == some
	 *F("#something").attr("abc","some") 
	 * @codeend
	 * @param {String} data The attribute to get, or wait for.
	 * @param {String|Function} value If provided uses this as a check before continuing to the next action
     *
	 * @param {Number} [timeout] overrides FuncUnit.timeout.  If provided, the wait will fail if not completed before this timeout.
	 * @param {Function} [success] a callback that will run after this action completes.
	 * @param {String} [message] if provided, an assertion will be passed when this wait condition completes successfully
	 * @return {Object} if the attr parameter is not provided, returns
	 * the attribute.
	 */
	'attr' : 1, 
	/**
     * @function FuncUnit.prototype.hasClass .hasClass()
     * @parent css
     * @signature `hasClass(className [,value] [,timeout] [,success] [,message])`
	 * @codestart
	 * //returns if the element has the class in its className
	 *F("#something").hasClass("selected");
	 *
	 * //waits until #something has selected in its className
	 *F("#something").hasClass("selected",true);
	 * 
	 * //waits until #something does not have selected in its className
	 *F("#something").hasClass("selected",false);
	 * @codeend
	 * @param {String} className The part of the className to search for.
	 * @param {Boolean|Function} [value] If provided uses this as a check before continuing to the next action.
	 * @param {Number} [timeout] overrides FuncUnit.timeout.  If provided, the wait will fail if not completed before this timeout.
	 * @param {Function} [success] a callback that will run after this action completes.
	 * @param {String} [message] if provided, an assertion will be passed when this wait condition completes successfully
	 * @return {Boolean|funcUnit} if the value parameter is not provided, returns
	 * if the className is found in the element's className.  If a value paramters is provided, returns funcUnit for chaining.
	 */
	'hasClass' : 1, //makes wait
	/**
     * @function FuncUnit.prototype.html .html()
     * @parent manipulation
     * @signature `html([html] [,timeout] [,success] [,message])`
	 * Gets the [http://api.jquery.com/html/ html] from an element or waits until the html is a certain value.
	 * @codestart
	 * //checks foo's html has "JupiterJS"
	 * ok( /JupiterJS/.test(F('#foo').html() ) )
	 * 
	 * //waits until foo's html has JupiterJS
	 *F('#foo').html(/JupiterJS/)
	 * 
	 * //waits until foo's html is JupiterJS
	 *F('#foo').html("JupiterJS")
	 * @codeend
	 * 
	 * @param {String|Function} [html] If provided uses this as a check before continuing to the next action.
	 * @param {Number} [timeout] overrides FuncUnit.timeout.  If provided, the wait will fail if not completed before this timeout.
	 * @param {Function} [success] a callback that will run after this action completes.
	 * @param {String} [message] if provided, an assertion will be passed when this wait condition completes successfully
	 * @return {String|funcUnit} if the html parameter is provided, 
	 * returns the funcUnit selector for chaining, otherwise returns the html of the selector.
	 */
	'html' : 0, 
	/**
     * @function FuncUnit.prototype.text .text()
     * @parent manipulation
     * @signature `text([text] [,timeout] [,success] [,message])`
	 * Gets the [http://api.jquery.com/text/ text] from an element or waits until the text is a certain value.
	 * @codestart
	 * //checks foo's text has "JupiterJS"
	 * ok( /JupiterJS/.test(F('#foo').text() ) )
	 * 
	 * //waits until bar's text has JupiterJS
	 *F('#foo').text(/JupiterJS/)
	 * 
	 * //waits until bar's text is JupiterJS
	 *F('#foo').text("JupiterJS")
	 * @codeend
	 * 
	 * @param {String|Function} [text] If provided uses this as a check before continuing to the next action.
	 * @param {Number} [timeout] overrides FuncUnit.timeout.  If provided, the wait will fail if not completed before this timeout.
	 * @param {Function} [success] a callback that will run after this action completes.
	 * @param {String} [message] if provided, an assertion will be passed when this wait condition completes successfully
	 * @return {String|funcUnit} if the text parameter is provided, 
	 * returns the funcUnit selector for chaining, otherwise returns the html of the selector.
	 */
	'text' : 0, 
	/**
     * @function FuncUnit.prototype.val .val()
     * @parent manipulation
     * @signature `val([val] [,timeout] [,success] [,message])`
	 * Gets the [http://api.jquery.com/val/ val] from an element or waits until the val is a certain value.
	 * @codestart
	 * //checks foo's val has "JupiterJS"
	 * ok( /JupiterJS/.test(F('input#foo').val() ) )
	 * 
	 * //waits until bar's val has JupiterJS
	 *F('input#foo').val(/JupiterJS/)
	 * 
	 * //waits until bar's val is JupiterJS
	 *F('input#foo').val("JupiterJS")
	 * @codeend
	 * 
	 * @param {String|Function} [val] If provided uses this as a check before continuing to the next action.
	 * @param {Number} [timeout] overrides FuncUnit.timeout.  If provided, the wait will fail if not completed before this timeout.
	 * @param {Function} [success] a callback that will run after this action completes.
	 * @param {String} [message] if provided, an assertion will be passed when this wait condition completes successfully
	 * @return {String|funcUnit} if the val parameter is provided, 
	 * returns the funcUnit selector for chaining, otherwise returns the html of the selector.
	 */
	'val' : 0, 
	/**
     * @function FuncUnit.prototype.css .css()
     * @parent css
     * @signature `css(prop [,val] [,timeout] [,success] [,message])`
	 * Gets a [http://api.jquery.com/css/ css] property from an element or waits until the property is 
	 * a specified value.
	 * @codestart
	 * // gets the color
	 *F("#foo").css("color")
	 * 
	 * // waits until the color is red
	 *F("#foo").css("color","red") 
	 * @codeend
	 * 
	 * @param {String} prop A css property to get or wait until it is a specified value.
	 * @param {String|Function} [val] If provided uses this as a check before continuing to the next action.
	 * @param {Number} [timeout] overrides FuncUnit.timeout.  If provided, the wait will fail if not completed before this timeout.
	 * @param {Function} [success] a callback that will run after this action completes.
	 * @param {String} [message] if provided, an assertion will be passed when this wait condition completes successfully
	 * @return {String|funcUnit} if the val parameter is provided, 
	 * returns the funcUnit selector for chaining, otherwise returns the css of the selector.
	 */
	'css': 1, 
	'prop': 1, 
	/**
     * @function FuncUnit.prototype.offset .offset()
     * @parent dimensions
     * @signature `offset([offset] [,timeout] [,success] [,message])`
	 * Gets an element's [http://api.jquery.com/offset/ offset] or waits until 
	 * the offset is a specified value.
	 * @codestart
	 * // gets the offset
	 *F("#foo").offset();
	 * 
	 * // waits until the offset is 100, 200
	 *F("#foo").offset({top: 100, left: 200}) 
	 * @codeend
	 * 
	 * @param {Object|Function} [offset] If provided uses this as a check before continuing to the next action.  Or you can 
	 * provide a function that returns true to continue to the next action.
	 * @param {Number} [timeout] overrides FuncUnit.timeout.  If provided, the wait will fail if not completed before this timeout.
	 * @param {Function} [success] a callback that will run after this action completes.
	 * @param {String} [message] if provided, an assertion will be passed when this wait condition completes successfully
	 * @return {String|funcUnit} if the offset parameter is provided, 
	 * returns the funcUnit selector for chaining, otherwise returns the css of the selector.
	 */
	'offset' : 0,
	/**
     * @function FuncUnit.prototype.position .position()
     * @parent dimensions
     * @signature `position([position] [,timeout] [,success] [,message])`
	 * Gets an element's [http://api.jquery.com/position/ position] or waits until 
	 * the position is a specified value.
	 * @codestart
	 * // gets the position
	 *F("#foo").position();
	 * 
	 * // waits until the position is 100, 200
	 *F("#foo").position({top: 100, left: 200}) 
	 * @codeend
	 * 
	 * @param {Object|Function} [position] If provided uses this as a check before continuing to the next action.  Or you can 
	 * provide a function that returns true to continue to the next action.
	 * @param {Number} [timeout] overrides FuncUnit.timeout.  If provided, the wait will fail if not completed before this timeout.
	 * @param {Function} [success] a callback that will run after this action completes.
	 * @param {String} [message] if provided, an assertion will be passed when this wait condition completes successfully
	 * @return {String|funcUnit} if the position parameter is provided, 
	 * returns the funcUnit selector for chaining, otherwise returns the offset of the selector.
	 */
	'position' : 0,
	/**
     * @function FuncUnit.prototype.scrollTop .scrollTop()
     * @parent dimensions
     * @signature `scrollTop([scrollTop] [,timeout] [,success] [,message])`
	 * Gets an element's [http://api.jquery.com/scrollTop/ scrollTop] or waits until 
	 * it equals a specified value.
	 * @codestart
	 * // gets the scrollTop
	 *F("#foo").scrollTop();
	 * 
	 * // waits until the scrollTop is 100
	 *F("#foo").scrollTop(100) 
	 * @codeend
	 * 
	 * @param {Number|Function} [scrollTop] If provided uses this as a check before continuing to the next action.  Or you can 
	 * provide a function that returns true to continue to the next action.
	 * @param {Number} [timeout] overrides FuncUnit.timeout.  If provided, the wait will fail if not completed before this timeout.
	 * @param {Function} [success] a callback that will run after this action completes.
	 * @param {String} [message] if provided, an assertion will be passed when this wait condition completes successfully
	 * @return {String|funcUnit} if scrollTop is provided, 
	 * returns the funcUnit selector for chaining, otherwise returns the scrollTop of the selector.
	 */ 
	'scrollTop' : 0, 
	/**
     * @function FuncUnit.prototype.scrollLeft .scrollLeft()
     * @parent dimensions
     * @signature `scrollLeft([scrollLeft] [,timeout] [,success] [,message])`
	 * Gets an element's [http://api.jquery.com/scrollLeft/ scrollLeft] or waits until 
	 * it equals a specified value.
	 * @codestart
	 * // gets the scrollLeft
	 *F("#foo").scrollLeft();
	 * 
	 * // waits until the scrollLeft is 100
	 *F("#foo").scrollLeft(100) 
	 * @codeend
	 * 
	 * @param {Number|Function} [scrollLeft] If provided uses this as a check before continuing to the next action.  Or you can 
	 * provide a function that returns true to continue to the next action.
	 * @param {Number} [timeout] overrides FuncUnit.timeout.  If provided, the wait will fail if not completed before this timeout.
	 * @param {Function} [success] a callback that will run after this action completes.
	 * @param {String} [message] if provided, an assertion will be passed when this wait condition completes successfully
	 * @return {String|funcUnit} if scrollLeft is provided, 
	 * returns the funcUnit selector for chaining, otherwise returns the scrollLeft of the selector.
	 */ 
	'scrollLeft' : 0, 
	/**
     * @function FuncUnit.prototype.height .height()
     * @parent dimensions
     * @signature `height([height] [,timeout] [,success] [,message])`
	 * Gets an element's [http://api.jquery.com/height/ height] or waits until 
	 * it equals a specified value.
	 * @codestart
	 * // gets the height
	 *F("#foo").height();
	 * 
	 * // waits until the height is 100
	 *F("#foo").height(100) 
	 * @codeend
	 * 
	 * @param {Number|Function} [height] If provided uses this as a check before continuing to the next action.  Or you can 
	 * provide a function that returns true to continue to the next action.
	 * @param {Number} [timeout] overrides FuncUnit.timeout.  If provided, the wait will fail if not completed before this timeout.
	 * @param {Function} [success] a callback that will run after this action completes.
	 * @param {String} [message] if provided, an assertion will be passed when this wait condition completes successfully
	 * @return {String|funcUnit} if height is provided, 
	 * returns the funcUnit selector for chaining, otherwise returns the height of the selector.
	 */
	'height' : 0, 
	/**
     * @function FuncUnit.prototype.width .width()
     * @parent dimensions
     * @signature `width([width] [,timeout] [,success] [,message])`
	 * Gets an element's [http://api.jquery.com/width/ width] or waits until 
	 * it equals a specified value.
	 * @codestart
	 * // gets the width
	 *F("#foo").width();
	 * 
	 * // waits until the width is 100
	 *F("#foo").width(100) 
	 * @codeend
	 * 
	 * @param {Number|Function} [width] If provided uses this as a check before continuing to the next action.  Or you can 
	 * provide a function that returns true to continue to the next action.
	 * @param {Number} [timeout] overrides FuncUnit.timeout.  If provided, the wait will fail if not completed before this timeout.
	 * @param {Function} [success] a callback that will run after this action completes.
	 * @param {String} [message] if provided, an assertion will be passed when this wait condition completes successfully
	 * @return {String|funcUnit} if width is provided, 
	 * returns the funcUnit selector for chaining, otherwise returns the width of the selector.
	 */
	'width' : 0, 
	/**
     * @function FuncUnit.prototype.innerHeight .innerHeight()
     * @parent dimensions
     * @signature `innerHeight([innerHeight] [,timeout] [,success] [,message])`
	 * Gets an element's [http://api.jquery.com/innerHeight/ innerHeight] or waits until 
	 * it equals a specified value.
	 * @codestart
	 * // gets the innerHeight
	 *F("#foo").innerHeight();
	 * 
	 * // waits until the innerHeight is 100
	 *F("#foo").innerHeight(100) 
	 * @codeend
	 * 
	 * @param {Number|Function} [innerHeight] If provided uses this as a check before continuing to the next action.  Or you can 
	 * provide a function that returns true to continue to the next action.
	 * @param {Number} [timeout] overrides FuncUnit.timeout.  If provided, the wait will fail if not completed before this timeout.
	 * @param {Function} [success] a callback that will run after this action completes.
	 * @param {String} [message] if provided, an assertion will be passed when this wait condition completes successfully
	 * @return {String|funcUnit} if innerHeight is provided, 
	 * returns the funcUnit selector for chaining, otherwise returns the innerHeight of the selector.
	 */
	'innerHeight' : 0, 
	/**
     * @function FuncUnit.prototype.innerWidth .innerWidth()
     * @parent dimensions
     * @signature `innerWidth([innerWidth] [,timeout] [,success] [,message])`
	 * Gets an element's [http://api.jquery.com/innerWidth/ innerWidth] or waits until 
	 * it equals a specified value.
	 * @codestart
	 * // gets the innerWidth
	 *F("#foo").innerWidth();
	 * 
	 * // waits until the innerWidth is 100
	 *F("#foo").innerWidth(100) 
	 * @codeend
	 * 
	 * @param {Number|Function} [innerWidth] If provided uses this as a check before continuing to the next action.  Or you can 
	 * provide a function that returns true to continue to the next action.
	 * @param {Number} [timeout] overrides FuncUnit.timeout.  If provided, the wait will fail if not completed before this timeout.
	 * @param {Function} [success] a callback that will run after this action completes.
	 * @param {String} [message] if provided, an assertion will be passed when this wait condition completes successfully
	 * @return {String|funcUnit} if innerWidth is provided, 
	 * returns the funcUnit selector for chaining, otherwise returns the innerWidth of the selector.
	 */
	'innerWidth' : 0, 
	/**
     * @function FuncUnit.prototype.outerHeight .outerHeight()
     * @parent dimensions
     * @signature `outerHeight([outerHeight] [,timeout] [,success] [,message])`
	 * Gets an element's [http://api.jquery.com/outerHeight/ outerHeight] or waits until 
	 * it equals a specified value.
	 * @codestart
	 * // gets the outerHeight
	 *F("#foo").outerHeight();
	 * 
	 * // waits until the outerHeight is 100
	 *F("#foo").outerHeight(100) 
	 * @codeend
	 * 
	 * @param {Number|Function} [outerHeight] If provided uses this as a check before continuing to the next action.  Or you can 
	 * provide a function that returns true to continue to the next action.
	 * @param {Number} [timeout] overrides FuncUnit.timeout.  If provided, the wait will fail if not completed before this timeout.
	 * @param {Function} [success] a callback that will run after this action completes.
	 * @param {String} [message] if provided, an assertion will be passed when this wait condition completes successfully
	 * @return {String|funcUnit} if outerHeight is provided, 
	 * returns the funcUnit selector for chaining, otherwise returns the outerHeight of the selector.
	 */
	'outerHeight' : 0, 
	/**
     * @function FuncUnit.prototype.outerWidth .outerWidth()
     * @parent dimensions
     * @signature `outerWidth([outerWidth] [,timeout] [,success] [,message])`
	 * Gets an element's [http://api.jquery.com/outerWidth/ outerWidth] or waits until 
	 * it equals a specified value.
	 * @codestart
	 * // gets the outerWidth
	 *F("#foo").outerWidth();
	 * 
	 * // waits until the outerWidth is 100
	 *F("#foo").outerWidth(100) 
	 * @codeend
	 * 
	 * @param {Number|Function} [outerWidth] If provided uses this as a check before continuing to the next action.  Or you can 
	 * provide a function that returns true to continue to the next action.
	 * @param {Number} [timeout] overrides FuncUnit.timeout.  If provided, the wait will fail if not completed before this timeout.
	 * @param {Function} [success] a callback that will run after this action completes.
	 * @param {String} [message] if provided, an assertion will be passed when this wait condition completes successfully
	 * @return {String|funcUnit} if outerWidth is provided, 
	 * returns the funcUnit selector for chaining, otherwise returns the outerWidth of the selector.
	 */
	'outerWidth' : 0}
	
	
	//makes a jQuery like command.
	FuncUnit.makeFunc = function(fname, argIndex){
		var orig = FuncUnit.fn[fname];
		//makes a read / wait function
		FuncUnit.prototype[fname] = function(){
			//assume last arg is success
			var args = FuncUnit.makeArray(arguments), 
				isWait = args.length > argIndex,
				success,
				self = this;
			
			args.unshift(this.selector,this.frame,fname)
			if(isWait){
				//get the args greater and equal to argIndex
				var tester = args[argIndex+3],
					timeout = args[argIndex+4],
					success = args[argIndex+5],
					message = args[argIndex+6],
					testVal = tester,
					errorMessage = "waiting for "+fname +" on " + this.selector,
					frame = this.frame,
					logMessage = "Checking "+fname+" on '"+this.selector+"'",
					ret;
				
				// can pass in an object or list of arguments
				if(typeof tester == 'object' && !(tester instanceof RegExp)){
					timeout = tester.timeout;
					success = tester.success;
					message = tester.message;
					if(tester.errorMessage){
						errorMessage = tester.errorMessage
					}
					if(typeof tester.logMessage !== "undefined"){
						logMessage = tester.logMessage
					}
					tester = tester.condition;
				}
				if(typeof timeout == 'function'){
					success = timeout;
					message = success;
					timeout = undefined;
				}
				if(typeof timeout == 'string'){
					message = timeout;
					timeout = undefined;
					success = undefined;
				}
				if(typeof message !== 'string'){
					message = undefined;
				}
				args.splice(argIndex+3, args.length- argIndex - 3);
				
				if(typeof tester != 'function'){
					errorMessage += " !== "+testVal
					tester = function(val){
						return FuncUnit.unit.equiv(val, testVal) || 
							(testVal instanceof RegExp && testVal.test(val) );
					}
				}
				if(message){
					errorMessage = message;
				}
				FuncUnit.repeat({
					method : function(print){
						// keep getting new collection because the page might be updating, we need to keep re-checking
						if(this.bind.prevObject && this.bind.prevTraverser){
							var prev = this.bind;
							this.bind = this.bind.prevObject[this.bind.prevTraverser](this.bind.prevTraverserSelector)
							this.bind.prevTraverser = prev.prevTraverser;
							this.bind.prevTraverserSelector = prev.prevTraverserSelector;
						} else {
							// pass false so it will only do one synchronous request
							this.bind =F(this.selector, {
								frame: frame, 
								forceSync: true
							})
						}
						if(logMessage){
							print(logMessage)
						}
						var methodArgs = [];
						// might need an argument
						if(argIndex > 0){
							methodArgs.push(args[3]);
						}
						// lazy flag to ignore the getter error below
						FuncUnit._ignoreGetterError = true;
						ret = this.bind[fname].apply(this.bind, methodArgs)
						FuncUnit._ignoreGetterError = false;
						
						var passed = tester.call(this.bind, ret);
						
						// unless this is a "size" command, require size to be non-zero (don't pass through if there's no elements)
						if(this.bind.length === 0 && fname !== "size"){
							passed = false;
						}
						
						if(passed){
							// if document is still loading
							if(!FuncUnit.documentLoaded()){
								passed = false;
							} else {
								// after every successful wait, check for a new document (if someone clicked a link), 
								// and overwrite alert/confirm/prompt
								// TODO this creates a potential race if a new document is loaded but its steal isn't ready...should poll
								FuncUnit.checkForNewDocument();
							}
						}
						return passed;
					},
					success : function(){
						if(message){
							FuncUnit.unit.assertOK(true, message)
						}
						success && success.apply(this, arguments);
					},
					error : function(){
						var msg = errorMessage;
						if(ret){
							msg += ", actual value: "+ret;
						}
						FuncUnit.unit.assertOK(false, msg);
					},
					timeout : timeout,
					bind: this,
					type: "wait"
				})
				return this;
			}else{
				// throw a warning if user tries to use a getter after the start of the test (if there are other async methods)
				if(!FuncUnit._ignoreGetterError && !FuncUnit._incallback && FuncUnit._haveAsyncQueries()){
					console && console.error("You can't run getters after actions and waits. Please put your getters in a callback or at the beginning of the test.")
				}
				// just call the original jQ method
				var methodArgs = [];
				if(argIndex > 0){
					methodArgs.push(args[3]);
				}
				return orig.apply(this, methodArgs);
			}
		}
	}
	
	for (var prop in FuncUnit.funcs) {
		FuncUnit.makeFunc(prop, FuncUnit.funcs[prop]);
	}

	return FuncUnit;
})(jQuery, __m3);

// ## browser/traversers.js
var __m12 = (function($, FuncUnit){

/**
 * @add FuncUnit
 */
// prototype
//do traversers
var traversers = [
	/**
     * @function FuncUnit.prototype.closest .closest()
     * @parent traversal
     * @signature `closest()`
	 * Asynchronous version of jQuery's closest.  Performs the exact same functionality as the jQuery method 
	 * but adds itself to the queue.
	 * 
	 * @codestart
	 * // after the click, filter the collection, then wait for result to be visible
	 *F(".foo").click().closest(".bar").visible();
	 * @codeend
     * @param {string} selector
	 */
	"closest",
	/**
	 * @function FuncUnit.prototype.next .next()
     * @parent traversal
     * @signature `next()`
	 * Asynchronous version of next. Performs the exact same functionality as the jQuery method 
	 * but adds itself to the queue.
	 * 
	 * @codestart
	 * // after the click, filter the collection, then wait for result to be visible
	 *F(".foo").click().next().visible();
	 * @codeend
	 */
	"next",
	/**
     * @function FuncUnit.prototype.prev .prev()
     * @parent traversal
     * @signature `prev()`
	 * Asynchronous version of prev. Performs the exact same functionality as the jQuery method 
	 * but adds itself to the queue.
	 * 
	 * @codestart
	 * // after the click, filter the collection, then wait for result to be visible
	 *F(".foo").click().prev().visible();
	 * @codeend
	 */
	"prev",
	/**
     * @function FuncUnit.prototype.siblings .siblings()
     * @parent traversal
     * @signature `siblings()`
	 * Asynchronous version of siblings. Performs the exact same functionality as the jQuery method 
	 * but adds itself to the queue.
	 * 
	 * @codestart
	 * // after the click, filter the collection, then wait for result to be visible
	 *F(".foo").click().siblings().visible();
	 * @codeend
	 */
	"siblings",
	/**
     * @function FuncUnit.prototype.last .last()
     * @parent traversal
     * @signature `last()`
	 * Asynchronous version of last. Performs the exact same functionality as the jQuery method 
	 * but adds itself to the queue.
	 * 
	 * @codestart
	 * // after the click, filter the collection, then wait for result to be visible
	 *F(".foo").click().last().visible();
	 * @codeend
	 */
	"last",
	/**
     * @function FuncUnit.prototype.first .first()
     * @parent traversal
     * @signature `first()`
	 * Asynchronous version of first. Performs the exact same functionality as the jQuery method 
	 * but adds itself to the queue.
	 * 
	 * @codestart
	 * // after the click, filter the collection, then wait for result to be visible
	 *F(".foo").click().first().visible();
	 * @codeend
	 */
	"first", 
	/**
     * @function FuncUnit.prototype.find .find()
     * @parent traversal
     * @signature `find()`
	 * Asynchronous version of find. Performs the exact same functionality as the jQuery method 
	 * but adds itself to the queue.
	 * 
	 * @codestart
	 * // after the click, filter the collection, then wait for result to be visible
	 *F(".foo").click().find(".bar").visible();
	 * @codeend
     * @param {string} selector
	 */
	"find"
],
	makeTraverser = function(name){
		var orig = FuncUnit.prototype[name];
		FuncUnit.prototype[name] = function(selector){
			var args = arguments;
			// find is called (with "this" as document) from FuncUnit.fn.init, so in this case don't queue it up, just run the regular find
			if (FuncUnit.win && this[0] && this[0].parentNode && this[0].parentNode.nodeType !== 9) { // document nodes are 9
				FuncUnit.add({
					method: function(success, error){
						// adjust the collection by using the real traverser method
						var newBind = orig.apply(this.bind, args);
						newBind.prevTraverser = name;
						newBind.prevTraverserSelector = selector;
						success(newBind)
					},
					error: "Could not traverse: " + name + " " + selector,
					bind: this
				});
			}
			return orig.apply(this, arguments);
		}
	};
for(var i  =0; i < traversers.length; i++){
	makeTraverser(traversers[i]);
}

return FuncUnit;
})(jQuery, __m3);

// ## browser/queue.js
var __m13 = (function(FuncUnit) {
	/**
	 * @add FuncUnit
	 */
	/**
	 * True when we are in a callback function (something we pass to a FuncUnit plugin).
	 */
	FuncUnit._incallback = false;
	//where we should add things in a callback
	var currentPosition = 0,
		startedQueue = false;

	/**
     * @property FuncUnit.speed F.speed()
     * @parent utilities
	 * A global speed setting for actions. Defaults to 0 milliseconds.
	 */
	FuncUnit.speed = 0;
	/**
     * @property FuncUnit.timeout F.timeout()
     * @parent utilities
	 * A global timeout value for wait commands.  Defaults to 10 seconds.
	 */
	FuncUnit.timeout = 10000;
	/**
	 * @hide
	 * @property FuncUnit._queue _queue
   * @parent utilities
	 * A queue of methods.  Each method in the queue are run in order.  After the method is complete, it 
	 * calls FuncUnit._done, which pops the next method off the queue and runs it.
	 */
	FuncUnit._queue = [];
	/**
	 * @hide
	 * Logic that determines if this next query needs to be sync, or if we can optimize it.
	 * Returns false if there are actual actions in the queue, returns true if the only queued methods are 
	 * S methods. If the only method is an S query, remove it from the queue.
	 */
	FuncUnit._needSyncQuery = function(){
		// if only method is query, need sync
		if(FuncUnit._queue.length === 1){
			if(FuncUnit._queue[0].type === "query"){
				FuncUnit._queue = [];
				return true;
			}
		}
		// if empty queue, need sync
		if(FuncUnit._queue.length === 0){
			return true;
		}
		return false
	}
	/**
	 * @hide
	 * Return last item in the queue.
	 */
	FuncUnit._lastQueuedItem = function(){
		if(!FuncUnit._queue.length){
			return null;
		}
		return FuncUnit._queue[FuncUnit._queue.length-1];
	}
	/**
	 * @hide
	 * Return true if there are already async methods queued.  If true, getters need throw errors.
	 */
	FuncUnit._haveAsyncQueries = function(){
		for(var i=0; i < FuncUnit._queue.length; i++){
			if(FuncUnit._queue[i].type === "action" || FuncUnit._queue[i].type === "wait")
				return true;
		}
		return false;
	}
	FuncUnit.
	/**
     * @parent utilities
     * @function FuncUnit.add F.add()
     * @signature `add(handler)`
	 * Adds a function to the queue.
	 * @param {Object} handler An object that contains the method to run along with other properties:

 - method : the method to be called.  It will be provided a success and error function to call
 - success : an optional callback to be called after the function is done
 - error : an error message if the command fails
 - timeout : the time until success should be called
 - bind : an object that will be 'this' of the success
 - type: the type of method (optional)

	 */
	add = function(handler){
		//if we are in a callback, add to the current position
		if (FuncUnit._incallback) {
			FuncUnit._queue.splice(currentPosition, 0, handler);
			currentPosition++;
		}
		else {
			//add to the end
			FuncUnit._queue.push(handler);
		}
		//if our queue has just started, stop qunit
		//call done to call the next command
        if (FuncUnit._queue.length == 1 && ! FuncUnit._incallback) {
			FuncUnit.unit.pauseTest();
    		setTimeout(FuncUnit._done, 13)
        }
	}
	var currentEl;
	/**
     * @hide
     * @parent utilities
     * @function FuncUnit._done _done
     * @signature `_done(handler)`
     *
	 * Every queued method calls this when its complete.  It gets the next function from the queue and calls it.
	 * @param {Object} el the current jQuery collection
	 * @param {Object} selector
	 */
	FuncUnit._done = function(el, selector){
		var next, 
			timer,
			speed = FuncUnit.speed || 0;

		// TODO: we need to clarify the easing api
		if(FuncUnit.speed === 'slow'){
			speed = 500;
		}
		if (FuncUnit._queue.length > 0) {
			next = FuncUnit._queue.shift();
			currentPosition = 0;
			// set a timer that will error
			
			//call next method
			setTimeout(function(){
				timer = setTimeout(function(){
						next.stop && next.stop();
						if(typeof next.error === "function"){
							next.error();
						} else {
							FuncUnit.unit.assertOK(false, next.error);
						}
						FuncUnit._done();
					}, 
					(next.timeout || FuncUnit.timeout) + speed)
				// if the last successful method had a collection, save it
				if(el && el.jquery){
					currentEl = el;
				}
				// make the new collection the last successful collection
				if(currentEl){
					next.bind = currentEl;
				}
				next.selector = selector;
				next.method(	//success
					function(el){
						if(el && el.jquery){
							next.bind = el;
						}
						//make sure we don't create an error
						clearTimeout(timer);
						
						//mark in callback so the next set of add get added to the front
						
						FuncUnit._incallback = true;
						if (next.success) {
							// callback's "this" is the collection
							next.success.apply(next.bind, arguments);
						}
						FuncUnit._incallback = false;
						
						
						FuncUnit._done(next.bind, next.selector);
					}, //error
					function(message){
						clearTimeout(timer);
						FuncUnit.unit.assertOK(false, message);
						FuncUnit._done();
					})
				
				
			}, speed);
			
		}
		else {
			FuncUnit.unit.resumeTest();
		}
	}

	return FuncUnit;
})(__m3);

// ## browser/waits.js
var __m14 = (function($, FuncUnit) {
/**
 * @add FuncUnit
 */
FuncUnit.
/**
 *
 * @function FuncUnit.wait F.wait()
 * @parent waits
 * @signature `wait(time, success)`
 * Waits a timeout before running the next command.  Wait is an action and gets 
 * added to the queue.
 * @codestart
 * F.wait(100, function(){
 *   equals(F('#foo').innerWidth(), 100, "innerWidth is 100");
 * })
 * @codeend
 * @param {Number} [time] The timeout in milliseconds.  Defaults to 5000.
 * @param {Function} [success] A callback that will run 
 * 		after the wait has completed, 
 * 		but before any more queued actions.
 */
wait = function(time, success){
	if(typeof time == 'function'){
		success = time;
		time = undefined;
	}
	time = time != null ? time : 5000
	FuncUnit.add({
		method : function(success, error){
			setTimeout(success, time)
		},
		success : success,
		error : "Couldn't wait!",
		timeout : time + 1000
	});
	return this;
}

FuncUnit.
/**
 * @function FuncUnit.branch F.branch()
 * @parent waits
 * @signature `branch(check1, success1, check2, success2)`
 * Uses 2 checker methods to see which success function to call.  This is a way to conditionally
 * run one method if you're unsure about the conditions of your page, without causing a test
 * failure.  For example, this is useful for login steps, if you're not sure whether the app
 * is logged in.
 *
 * @codestart
 *   F.branch(function(){
 *    	return (F("#exists").size() > 0);
 *    }, function(){
 *    	ok(true, "found exists")
 *    }, function(){
 *    	return (F("#notexists").size() > 0);
 *    }, function(){
 *    	ok(false, "found notexists")
 *    });
 * @codeend
 *
 * @param {Function} check1 a checker function that, if it returns true, causes success1 to be called
 * @param {Function} success1 a function that runs when check1 returns true
 * @param {Function} check2 a checker function that, if it returns true, causes success2 to be called
 * @param {Function} success2 a function that runs when check2 returns true
 * @param {Number} timeout if neither checker returns true before this timeout, the test fails
 */
branch = function(check1, success1, check2, success2, timeout){
	FuncUnit.repeat({
		method : function(print){
			print("Running a branch statement")
			if(check1()){
				success1();
				return true;
			}
			if(check2()){
				success2();
				return true;
			}
		},
		error : "no branch condition was ever true",
		timeout : timeout,
		type: "branch"
	})
}

/**
 *
 * @function FuncUnit.repeat F.repeat()
 * @parent waits
 * @signature `repeat()`
 * Takes a function that will be called over and over until it is successful.
 * method : function(){},
	success : success,
	error : errorMessage,
	timeout : timeout,
	bind: this
 */
FuncUnit.repeat = function(options){
	
	var interval,
		stopped = false	,
		stop = function(){
			clearTimeout(interval)
			stopped = true;
		};
	FuncUnit.add({
		method : function(success, error){
			options.bind = this.bind;
			options.selector = this.selector;
			var printed = false,
				print = function(msg){
					if(!printed){
						printed = true;
					}
				}
			interval = setTimeout(function(){
				var result = null;
				try {
					result = options.method(print)
				} 
				catch (e) {
					//should we throw this too error?
				}
				
				if (result) {
					success(options.bind);
				}else if(!stopped){
					interval = setTimeout(arguments.callee, 10)
				}
				
			}, 10);
			
			
		},
		success : options.success,
		error : options.error,
		timeout : options.timeout,
		stop : stop,
		bind : options.bind,
		type: options.type
	});
	
}


/**
 *
 * @function FuncUnit.animationEnd F.animationEnd()
 * @parent waits
 * @signature `animationEnd()`
 * Waits until all animations in the page have completed.  Only works
 * if the tested page has jQuery present.
 */
FuncUnit.animationEnd = function(){
F("body").wait(200).size(function(){
		return F.win.$(':animated').length === 0;
	});
};

FuncUnit.animationsDone = FuncUnit.animationEnd;

$.extend(FuncUnit.prototype, {
	/**
     * @function FuncUnit.prototype.exists .exists()
     * @parent waits
     * @signature `exists([timeout] [,success] [,message])`
	 * Waits until an element exists before running the next action.
	 * @codestart
	 * //waits until #foo exists before clicking it.
	 *F("#foo").exists().click()
	 * @codeend
	 * @param {Number} [timeout] overrides FuncUnit.timeout.  If provided, the wait will fail if not completed before this timeout.
	 * @param {Function} [success] a success that is run after the selector exists, but before the next action.
	 * @param {String} [message] if provided, an assertion will be passed when this wait condition completes successfully
	 * @return {FuncUnit} returns the funcUnit for chaining. 
	 */
	exists: function( timeout, success, message ) {
		var logMessage = "Waiting for '"+this.selector+"' to exist";
		if(timeout === false){ // pass false to suppress this wait (make it not print any logMessage)
			logMessage = false
		}
		return this.size({
			condition: function(size){
				return size > 0;
			},
			timeout: timeout,
			success: success,
			message: message,
			errorMessage: "Exist failed: element with selector '"+this.selector+"' not found",
			logMessage: logMessage
		})
	},
	/**
     * @function FuncUnit.prototype.missing .missing()
     * @parent waits
     * @signature `missing([timeout] [,success] [,message])`
	 * Waits until no elements are matched by the selector.  Missing is equivalent to calling
	 * <code>.size(0, success);</code>
	 * @codestart
	 * //waits until #foo leaves before continuing to the next action.
	 *F("#foo").missing()
	 * @codeend
	 * @param {Number} [timeout] overrides FuncUnit.timeout.  If provided, the wait will fail if not completed before this timeout.
	 * @param {Function} [success] a callback that is run after the selector exists, but before the next action
	 * @param {String} [message] if provided, an assertion will be passed when this wait condition completes successfully
	 * @return {FuncUnit} returns the funcUnit for chaining. 
	 */
	missing: function( timeout,success, message ) {
		return this.size(0, timeout, success, message)
	},
	/**
     * @function FuncUnit.prototype.visible .visible()
     * @parent waits
     * @signature `visible([timeout] [,success] [,message])`
	 * Waits until the funcUnit selector is visible.  
	 * @codestart
	 * //waits until #foo is visible.
	 *F("#foo").visible()
	 * @codeend
	 * @param {Number} [timeout] overrides FuncUnit.timeout.  If provided, the wait will fail if not completed before this timeout.
	 * @param {Function} [success] a callback that runs after the funcUnit is visible, but before the next action.
	 * @param {String} [message] if provided, an assertion will be passed when this wait condition completes successfully
	 * @return [funcUnit] returns the funcUnit for chaining.
	 */
	visible: function( timeout, success, message ) {
		var self = this,
			sel = this.selector,
			ret;
		return this.size(function(size){
			return this.is(":visible") === true;
		}, timeout, success, message)
	},
	/**
     * @function FuncUnit.prototype.invisible .invisible()
     * @parent waits
     * @signature `invisible([timeout] [,success] [,message])`
	 * Waits until the selector is invisible.  
	 * @codestart
	 * //waits until #foo is invisible.
	 *F("#foo").invisible()
	 * @codeend
	 * @param {Number} [timeout] overrides FuncUnit.timeout.  If provided, the wait will fail if not completed before this timeout.
	 * @param {Function} [success] a callback that runs after the selector is invisible, but before the next action.
	 * @param {String} [message] if provided, an assertion will be passed when this wait condition completes successfully
	 * @return [funcUnit] returns the funcUnit selector for chaining.
	 */
	invisible: function( timeout, success, message ) {
		var self = this,
			sel = this.selector,
			ret;
		return this.size(function(size){
			return this.is(":visible") === false;
		}, timeout, success, message)
	},
	/**
     * @function FuncUnit.prototype.wait .wait()
     * @parent waits
     * @signature `wait([checker] [,timeout] [,success] [,message])`
     *
	 * Waits until some condition is true before calling the next action.  Or if no checker function is provided, waits a 
	 * timeout before calling the next queued method.  This can be used as a flexible wait condition to check various things in the tested page:
	 * @codestart
	 *F('#testData').wait(function(){
	 * 	 return F.win.$(this).data('idval') === 1000;
	 * }, "Data value matched");
	 * @codeend
	 * @param {Number|Function} [checker] a checking function.  It runs repeatedly until the condition becomes true or the timeout period passes.  
	 * If a number is provided, a time in milliseconds to wait before running the next queued method.
	 * @param {Number} [timeout] overrides FuncUnit.timeout.  If provided, the wait will fail if not completed before this timeout.
	 * @param {Function} [success] a callback that will run after this action completes.
	 * @param {String} [message] if provided, an assertion will be passed when this wait condition completes successfully
	 */
	wait: function( checker, timeout, success, message ) {
		if(typeof checker === "number"){
			timeout = checker;
			FuncUnit.wait(timeout, success)
			return this;	
		} else {
			return this.size(checker, timeout, success, message)
		}
	},
	/**
     * @function FuncUnit.prototype.then .then()
     * @parent waits
     * @signature `then(success)`
	 * Calls the success function after all previous asynchronous actions have completed.  Then
	 * is called with the funcunit object.
	 * @param {Function} success
	 */
	then : function(success){
		var self = this;
		FuncUnit.wait(0, function(){
			success.call(this, this);
		});
		return this;
	}
})
return FuncUnit;
})(jQuery, __m3);

// ## funcunit.js
var __m1 = (function(Syn, FuncUnit) {
	window.FuncUnit = window.S = window.F = FuncUnit;
	
	return FuncUnit;
})(Syn, __m3, __m6, __m9, __m10, __m11, __m12, __m13, __m14);

}(window);