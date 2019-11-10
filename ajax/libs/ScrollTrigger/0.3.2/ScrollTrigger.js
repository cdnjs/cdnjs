/**
 * Written by Erik Terwan on 03/07/16.
 *
 * Erik Terwan - development + design
 * https://erikterwan.com
 * https://github.com/terwanerik
 *
 * MIT license.
 */

(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define([], factory);
	} else if (typeof module === 'object' && module.exports) {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like environments that support module.exports,
		// like Node.
		module.exports = factory();
	} else {
		// Browser globals (root is window)
		root.ScrollTrigger = factory();
	}
}(this, function () {

	'use strict';

	return function(defaultOptions, bindTo, scrollIn) {
		/**
		 * Trigger object, represents a single html element with the
		 * data-scroll tag. Stores the options given in that tag.
		 */
		var Trigger = function(_defaultOptions, _element) {
			this.element = _element;
			this.defaultOptions = _defaultOptions;
			this.showCallback = null;
			this.hideCallback = null;
			this.visibleClass = 'visible';
			this.hiddenClass = 'invisible';
			this.addWidth = false;
			this.addHeight = false;
			this.once = false;

			var xOffset = 0;
			var yOffset = 0;

			this.left = function(_this){
				return function(){
					return _this.element.getBoundingClientRect().left;
				};
			}(this);

			this.top = function(_this){
				return function(){
					return _this.element.getBoundingClientRect().top;
				};
			}(this);

			this.xOffset = function(_this){
				return function(goingLeft){
					var offset = xOffset;

					// add the full width of the element to the left position, so the
					// visibleClass is only added after the element is completely
					// in the viewport
					if (_this.addWidth && !goingLeft) {
						offset += _this.width();
					} else if (goingLeft && !_this.addWidth) {
						offset -= _this.width();
					}

					return offset;
				};
			}(this);

			this.yOffset = function(_this){
				return function(goingUp){
					var offset = yOffset;

					// add the full height of the element to the top position, so the
					// visibleClass is only added after the element is completely
					// in the viewport
					if (_this.addHeight && !goingUp) {
						offset += _this.height();
					} else if (goingUp && !_this.addHeight) {
						offset -= _this.height();
					}

					return offset;
				};
			}(this);

			this.width = function(_this) {
				return function(){
					return _this.element.offsetWidth;
				};
			}(this);

			this.height = function(_this) {
				return function(){
					return _this.element.offsetHeight;
				};
			}(this);

			this.reset = function(_this) {
				return function() {
					_this.removeClass(_this.visibleClass);
					_this.removeClass(_this.hiddenClass);
				};
			}(this);

			this.addClass = function(_this){
				var addClass = function(className, didAddCallback) {
					if (!_this.element.classList.contains(className)) {
						_this.element.classList.add(className);
						if ( typeof didAddCallback === 'function' ) {
							didAddCallback();
						}
					}
				};

				var retroAddClass = function(className, didAddCallback) {
					className = className.trim();
					var regEx = new RegExp('(?:^|\\s)' + className + '(?:(\\s\\w)|$)', 'ig');
					var oldClassName = _this.element.className;
					if ( !regEx.test(oldClassName) ) {
						_this.element.className += " " + className;
						if ( typeof didAddCallback === 'function' ) {
							didAddCallback();
						}
					}
				};

				return _this.element.classList ? addClass : retroAddClass;
			}(this);

			this.removeClass = function(_this){
				var removeClass = function(className, didRemoveCallback) {
					if (_this.element.classList.contains(className)) {
						_this.element.classList.remove(className);
						if ( typeof didRemoveCallback === 'function' ) {
							didRemoveCallback();
						}
					}
				};

				var retroRemoveClass = function(className, didRemoveCallback) {
					className = className.trim();
					var regEx = new RegExp('(?:^|\\s)' + className + '(?:(\\s\\w)|$)', 'ig');
					var oldClassName = _this.element.className;
					if ( regEx.test(oldClassName) ) {
						_this.element.className = oldClassName.replace(regEx, "$1").trim();
						if ( typeof didRemoveCallback === 'function' ) {
							didRemoveCallback();
						}
					}
				};

				return _this.element.classList ? removeClass : retroRemoveClass;
			}(this);

			this.init = function(_this){
				return function(){
					// set the default options
					var options = _this.defaultOptions;
					// parse the options given in the data-scroll attribute, if any
					var optionString = _this.element.getAttribute('data-scroll');

					if (options) {
						if (options.toggle && options.toggle.visible) {
							_this.visibleClass = options.toggle.visible;
						}

						if (options.toggle && options.toggle.hidden) {
							_this.hiddenClass = options.toggle.hidden;
						}

						if (options.centerHorizontal === true) {
							xOffset = _this.element.offsetWidth / 2;
						}

						if (options.centerVertical === true) {
							yOffset = _this.element.offsetHeight / 2;
						}

						if (options.offset && options.offset.x) {
							xOffset+= options.offset.x;
						}

						if (options.offset && options.offset.y) {
							yOffset+= options.offset.y;
						}

						if (options.addWidth) {
							_this.addWidth = options.addWidth;
						}

						if (options.addHeight) {
							_this.addHeight = options.addHeight;
						}

						if (options.once) {
							_this.once = options.once;
						}
					}

					// parse the boolean options
					var parsedAddWidth = optionString.indexOf("addWidth") > -1;
					var parsedAddHeight = optionString.indexOf("addHeight") > -1;
					var parsedOnce = optionString.indexOf("once") > -1;

					// check if the 'addHeight' was toggled via the data-scroll tag, that overrides the default settings object
					if (_this.addWidth === false && parsedAddWidth === true) {
						_this.addWidth = parsedAddWidth;
					}

					if (_this.addHeight === false && parsedAddHeight === true) {
						_this.addHeight = parsedAddHeight;
					}

					if (_this.once === false && parsedOnce === true) {
						_this.once = parsedOnce;
					}

					// parse callbacks
					_this.showCallback = _this.element.getAttribute('data-scroll-showCallback');
					_this.hideCallback = _this.element.getAttribute('data-scroll-hideCallback');

					// split the options on the toggle() parameter
					var classParts = optionString.split('toggle(');
					if (classParts.length > 1) {
						// the toggle() parameter was given, split it at ) to get the
						// content inside the parentheses, then split them on the comma
						var classes = classParts[1].split(')')[0].split(',');

						// Check if trim exists if not, add the polyfill
						// courtesy of MDN
						if (!String.prototype.trim) {
							String.prototype.trim = function () {
								return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
							};
						}

						// trim and remove the dot
						_this.visibleClass = classes[0].trim().replace('.', '');
						_this.hiddenClass = classes[1].trim().replace('.', '');
					}

					// adds the half of the offsetWidth/Height to the x/yOffset
					if (optionString.indexOf("centerHorizontal") > -1) {
						xOffset = _this.element.offsetWidth / 2;
					}

					if (optionString.indexOf("centerVertical") > -1) {
						yOffset = _this.element.offsetHeight / 2;
					}

					// split the options on the offset() parameter
					var offsetParts = optionString.split('offset(');
					if (offsetParts.length > 1) {
						// the offset() parameter was given, split it at ) to get the
						// content inside the parentheses, then split them on the comma
						var offsets = offsetParts[1].split(')')[0].split(',');

						// remove the px unit and parse as integer
						xOffset += parseInt(offsets[0].replace('px', ''));
						yOffset += parseInt(offsets[1].replace('px', ''));
					}

					// return this for chaining
					return _this;
				};
			}(this);
		};

		// the element to detect the scroll in
		this.scrollElement = window;

		// the element to get the data-scroll elements from
		this.bindElement = document.body;

		// the Trigger objects
		var triggers = [];

		// attached callbacks for the requestAnimationFrame loop,
		// this is handy for custom scroll based animation. So you
		// don't have multiple, unnecessary loops going.
		var attached = [];

		// the previous scrollTop position, to determine if a user
		// is scrolling up or down. Set that to -1 -1 so the loop
		// always runs at least once
		var previousScroll = {
			left: -1,
			top: -1
		};

		// the loop method to use, preferred window.requestAnimationFrame
		var loop = window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			function(callback){ setTimeout(callback, 1000 / 60); };

		// if the requestAnimationFrame is looping
		var isLooping = false;


		/**
		 * Initializes the scrollTrigger
		 */
		var init = function(_this) {
			return function(defaultOptions, bindTo, scrollIn) {
				// check if bindTo is not undefined or null,
				// otherwise use the document.body
				if (bindTo != undefined && bindTo != null) {
					_this.bindElement = bindTo;
				} else {
					_this.bindElement = document.body;
				}

				// check if the scrollIn is not undefined or null,
				// otherwise use the window
				if (scrollIn != undefined && scrollIn != null) {
					_this.scrollElement = scrollIn;
				} else {
					_this.scrollElement = window;
				}

				// Initially bind all elements with the data-scroll attribute
				_this.bind(_this.bindElement.querySelectorAll("[data-scroll]"));

				// return 'this' for chaining
				return _this;
			};
		}(this);

		/**
		 * Binds new HTMLElement objects to the trigger array
		 */
		this.bind = function(_this) {
			return function(elements) {
				// check if an array is given
				if (elements instanceof HTMLElement) {
					// if it's a single HTMLElement just create an array
					elements = [elements];
				}

				// get all trigger elements, e.g. all elements with
				// the data-scroll attribute and turn it from a NodeList
				// into a plain old array
				var newTriggers = [].slice.call(elements);

				// map all the triggers to Trigger objects, and initialize them
				// so the options get parsed
				newTriggers = newTriggers.map(function (element, index) {
					var trigger = new Trigger(defaultOptions, element);

					return trigger.init();
				});

				// add to the triggers array
				triggers = triggers.concat(newTriggers);

				if (triggers.length > 0 && isLooping == false) {
					isLooping = true;

					// start the update loop
					update();
				} else {
					isLooping = false;
				}

				// return 'this' for chaining
				return _this;
			};
		}(this);

		/**
		 * Returns a trigger object from a htmlElement object (e.g. via querySelector())
		 */
		this.triggerFor = function(_this) {
			return function(htmlElement){
				var returnTrigger = null;

				triggers.forEach(function(trigger, index) {
					if (trigger.element == htmlElement) {
						returnTrigger = trigger;
					}
				});

				return returnTrigger;
			};
		}(this);

		/**
		 * Removes a Trigger by its HTMLElement object, e.g via querySelector()
		 */
		this.destroy = function(_this) {
			return function(htmlElement) {
				triggers.forEach(function(trigger, index) {
					if (trigger.element == htmlElement) {
						triggers.splice(index, 1);
					}
				});

				// return 'this' for chaining
				return _this;
			};
		}(this);

		/**
		 * Removes all Trigger objects from the Trigger array
		 */
		this.destroyAll = function(_this) {
			return function() {
				triggers = [];

				// return 'this' for chaining
				return _this;
			};
		}(this);

		/**
		 * Resets a Trigger object, removes all added classes and then removes it from the triggers array. Like nothing
		 * ever happened..
		 */
		this.reset = function(_this) {
			return function(htmlElement) {
				var trigger = _this.triggerFor(htmlElement);

				if (trigger != null) {
					trigger.reset();

					var index = triggers.indexOf(trigger);

					if (index > -1) {
						triggers.splice(index, 1);
					}
				}

				// return 'this' for chaining
				return _this;
			};
		}(this);

		/**
		 * Does the same as .reset() but for all triggers
		 */
		this.resetAll = function(_this) {
			return function() {
				triggers.forEach(function(trigger, index) {
					trigger.reset();
				});

				triggers = [];

				// return 'this' for chaining
				return _this;
			};
		}(this);

		/**
		 * Attaches a callback that get's called every time
		 * the update method is called
		 */
		this.attach = function(_this) {
			return function(callback) {
				// add callback to array
				attached.push(callback);

				if (!isLooping) {
					isLooping = true;

					// start the update loop
					update();
				}

				// return 'this' for chaining
				return _this;
			};
		}(this);


		/**
		 * Detaches a callback
		 */
		this.detach = function(_this) {
			return function(callback) {
				// remove callback from array
				var index = attached.indexOf(callback);

				if (index > -1) {
					attached.splice(index, 1);
				}

				return _this;
			};
		}(this);


		// store _this for use in the update function scope (strict)
		var _this = this;


		/**
		 * Gets called everytime the browser is ready for it, or when the user
		 * scrolls (on legacy browsers)
		 */
		function update() {
			var windowWidth = _this.scrollElement.innerWidth;
			var windowHeight = _this.scrollElement.innerHeight;

			// FF and IE use the documentElement instead of body
			var currentTop = !_this.bindElement.scrollTop ? document.documentElement.scrollTop : _this.bindElement.scrollTop;
			var currentLeft = !_this.bindElement.scrollLeft ? document.documentElement.scrollLeft : _this.bindElement.scrollLeft;

			// if the user scrolled
			if (previousScroll.left != currentLeft || previousScroll.top != currentTop) {

				// loop through all triggers
				triggers.forEach(function(trigger, index){
					var triggerLeft = trigger.left();
					var triggerTop = trigger.top();

					if (previousScroll.left > currentLeft) {
						// scrolling left, so we subtract the xOffset
						triggerLeft -= trigger.xOffset(true);
					} else if (previousScroll.left < currentLeft) {
						// scrolling right, so we add the xOffset
						triggerLeft += trigger.xOffset(false);
					}

					if (previousScroll.top > currentTop) {
						// scrolling up, so we subtract the yOffset
						triggerTop -= trigger.yOffset(true);
					} else if (previousScroll.top < currentTop){
						// scrolling down so then we add the yOffset
						triggerTop += trigger.yOffset(false);
					}

					// toggle the classes
					if (triggerLeft < windowWidth && triggerLeft >= 0 &&
						triggerTop < windowHeight && triggerTop >= 0) {
						// the element is visible
						trigger.addClass(trigger.visibleClass, function(){
							if (trigger.showCallback) {
								functionCall(trigger, trigger.showCallback);
							}
						});

						trigger.removeClass(trigger.hiddenClass);

						if (trigger.once) {
							// remove trigger from triggers array
							triggers.splice(index, 1);
						}
					} else {
						// the element is invisible
						trigger.addClass(trigger.hiddenClass);
						trigger.removeClass(trigger.visibleClass, function(){
							if (trigger.hideCallback) {
								functionCall(trigger, trigger.hideCallback);
							}
						});
					}
				});

				// call the attached callbacks, if any
				attached.forEach(function(callback) {
					callback.call(_this, currentLeft, currentTop, windowWidth, windowHeight);
				});

				// save the current scroll position
				previousScroll.left = currentLeft;
				previousScroll.top = currentTop;
			}

			if (triggers.length > 0 || attached.length > 0) {
				isLooping = true;

				// and loop again
				loop(update);
			} else {
				isLooping = false;
			}
		}

		function functionCall(trigger, functionAsString) {
			var params = functionAsString.split('(');
			var method = params[0];

			if (params.length > 1) {
				params = params[1].split(')')[0]; // get the value between the parentheses
			} else {
				params = undefined;
			}

			if (window[method]) {
				// function exists in the global window scope
				// so let's call it
				window[method].call(trigger.element, params);
			}
		}

		return init(defaultOptions, bindTo, scrollIn);
	};
}));
