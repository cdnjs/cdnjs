/**
 * Written by Erik Terwan on 03/07/16.
 *
 * Erik Terwan - development + design
 * https://erikterwan.com
 * https://github.com/terwanerik
 *
 * MIT license.
 */
(function(){
	"use strict";
	
	var Trigger = function(_element) {
		this.element = _element;
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
		
		this.width = function(_this){
			return function(){
				return _this.element.offsetWidth;
			};
		}(this);
		
		this.height = function(_this){
			return function(){
				return _this.element.offsetHeight;
			};
		}(this);
		
		this.addClass = function(_this){
			var addClass = function(className, didAddCallback){
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
			var removeClass = function(className, didRemoveCallback){
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
				// parse the options given in the data-scroll attribute, if any
				var optionString = _this.element.getAttribute('data-scroll');
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
				
				// split the options on the offset() parameter
				var offsetParts = optionString.split('offset(');
				if (offsetParts.length > 1) {
					// the offset() parameter was given, split it at ) to get the
					// content inside the parentheses, then split them on the comma
					var offsets = offsetParts[1].split(')')[0].split(',');
					
					// remove the px unit and parse as integer
					xOffset = parseInt(offsets[0].replace('px', ''));
					yOffset = parseInt(offsets[1].replace('px', ''));
				}
				
				// parse the boolean options
				_this.addWidth = optionString.indexOf("addWidth") > -1;
				_this.addHeight = optionString.indexOf("addHeight") > -1;
				_this.once = optionString.indexOf("once") > -1;
				
				// adds the half of the offsetWidth/Height to the x/yOffset
				if (optionString.indexOf("centerHorizontal") > -1) {
					xOffset = _this.element.offsetWidth / 2;
				}
				
				if (optionString.indexOf("centerVertical") > -1) {
					yOffset = _this.element.offsetHeight / 2;
				}
				
				// return this for chaining
				return _this;
			};
		}(this);
	};
	
	var ScrollTrigger = function() {
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
		var isLooping = true;


		/**
		 * Initializes the scrollTrigger
		 */
		this.init = function(_this) {
			return function(bindTo, scrollIn) {
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
				
				// get all trigger elements, e.g. all elements with
				// the data-scroll attribute and turn it from a NodeList
				// into a plain old array
				triggers = [].slice.call(_this.bindElement.querySelectorAll("[data-scroll]"));
				
				// map all the triggers to Trigger objects, and initialize them
				// so the options get parsed
				triggers = triggers.map(function (value, index) {
			  	var trigger = new Trigger(value);
			  	
			  	return trigger.init();
			  });
				
				if (triggers.length > 0) {
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
				attached.splice(attached.indexOf(callback), 1);
				
				// return 'this' for chaining
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
				for (var i = 0; i <  triggers.length; i++) {
					var trigger = triggers[i];
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
							triggers.splice(i, 1);
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
				}
				
				// call the attached callbacks, if any
				for (var n = 0; n < attached.length; n++) {
					var callback = attached[n];
	
					callback.call(_this, currentLeft, currentTop, windowWidth, windowHeight);
				}
				
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
	}
	
	// add an instance of the ScrollTrigger to the window
	// for use in public/window scope.
	window.ScrollTrigger = new ScrollTrigger();
})();
