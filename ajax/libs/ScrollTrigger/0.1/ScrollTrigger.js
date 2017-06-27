/**
 * Written by Erik Terwan on 23/06/16.
 *
 * Erik Terwan - development + design
 * https://erikterwan.com
 * https://github.com/terwanerik
 *
 * MIT license.
 */
(function(){
	"use strict";
	
	var ScrollTrigger = function() {
		// the element to detect the scroll in
		this.scrollElement = window;
		
		// the element to get the data-scroll elements from
		this.bindElement = document.body; 
		
		// the elements with the data-scroll attribute
		var triggers = [];
		
		// attached callbacks for the requestAnimationFrame loop,
		// this is handy for custom scroll based animation. So you
		// don't have multiple, unnecessary loops going.
		var attached = [];
		
		// the previous scrollTop position, to determine if a user
		// is scrolling up or down
		var previousTop = 0;

		// the loop method to use, preferred window.requestAnimationFrame
		var loop = window.requestAnimationFrame;


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

				// check what requestAnimationFrame to use, and if
				// it's not supported, use the onscroll event
				loop = window.requestAnimationFrame ||
					window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame ||
					window.msRequestAnimationFrame ||
					window.oRequestAnimationFrame ||
					_this.scrollElement.onscroll; // old school browser support
				
				// set the current scrollTop position
				previousTop = _this.bindElement.scrollTop;
				
				// start the update loop
				update();

				// return 'this' for chaining
				return _this;
			};
		}(this);


		/**
		 * Attaches a callback every time the update method is called
		 */
		this.attach = function(_this) {
			return function(callback) {
				// add callback to array
				attached.push(callback);
				
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
			var windowHeight = _this.scrollElement.innerHeight;
			var currentTop = _this.bindElement.scrollTop;
			
			// loop through all triggers
			for (var i = 0; i <  triggers.length; i++) {
				var trigger = triggers[i];
				var triggerTop = trigger.getBoundingClientRect().top;
				
				// parse the options given in the data-scroll attribute,
				// if any.
				var optionString = trigger.getAttribute('data-scroll');
				var options = optionString.split(' ');
				
				var yOffset = parseInt(options[0] != undefined ? options[0] : 0);
				var visibleClass = options[1] != undefined ? options[1] : 'visible';
				var hiddenClass = options[2] != undefined ? options[2] : 'invisible';
				
				var addHeight = optionString.indexOf("addHeight") > -1;
				var once = optionString.indexOf("once") > -1;
				
				// if the add height (last parameter) is true, we add the
				// full height of the element to the top position, so the
				// visibleClass is only added after the element is completely
				// in the viewport
				if (addHeight) {
					triggerTop += trigger.offsetHeight;
				}
				
				if (previousTop > currentTop) {
					// scrolling up, so we subtract the yOffset
					triggerTop -= yOffset;
				} else {
					// scrolling down or not scrolling at all
					// then we add the yOffset
					triggerTop += yOffset;
				}
				
				// toggle the classes
				if (triggerTop < windowHeight && triggerTop > 0) {
					// the element is visible
					if (!trigger.classList.contains(visibleClass)) {
						trigger.classList.add(visibleClass);
					}

					if (trigger.classList.contains(hiddenClass)) {
						trigger.classList.remove(hiddenClass);
					}
					
					if (once) {
						// remove trigger from triggers array
						triggers.splice(i, 1);
					}
				} else {
					// the element is invisible
					if (!trigger.classList.contains(hiddenClass)) {
						trigger.classList.add(hiddenClass);
					}
					
					if (trigger.classList.contains(visibleClass)) {
						trigger.classList.remove(visibleClass);
					}
				}
			}
			
			// call the attached callbacks, if any
			for (var n = 0; n < attached.length; n++) {
				var callback = attached[n];

				callback.call(_this, windowHeight, _this.bindElement.scrollTop);
			}
			
			// save the current top position
			previousTop = currentTop;
			
			// and loop again
			loop(update);
		}
	};
	
	
	// add an instance of the ScrollTrigger to the window
	// for use in public/window scope.
	window.ScrollTrigger = new ScrollTrigger();
})();