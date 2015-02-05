/*
PNotify 2.0.0 sciactive.com/pnotify/
(C) 2014 Hunter Perrin
license GPL/LGPL/MPL
*/
/*
 * ====== PNotify ======
 *
 * http://sciactive.com/pnotify/
 *
 * Copyright 2009-2014 Hunter Perrin
 *
 * Triple licensed under the GPL, LGPL, and MPL.
 * 	http://gnu.org/licenses/gpl.html
 * 	http://gnu.org/licenses/lgpl.html
 * 	http://mozilla.org/MPL/MPL-1.1.html
 */

// Uses AMD or browser globals to create a jQuery plugin.
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function($) {
	var default_stack = {
		dir1: "down",
		dir2: "left",
		push: "bottom",
		spacing1: 25,
		spacing2: 25,
		context: $("body")
	};
	var timer, // Position all timer.
		body,
		jwindow = $(window);
	// Set global variables.
	var do_when_ready = function(){
		body = $("body");
		PNotify.prototype.options.stack.context = body;
		jwindow = $(window);
		// Reposition the notices when the window resizes.
		jwindow.bind('resize', function(){
			if (timer)
				clearTimeout(timer);
			timer = setTimeout(function(){ PNotify.positionAll(true) }, 10);
		});
	};
	PNotify = function(options){
		this.parseOptions(options);
		this.init();
	};
	$.extend(PNotify.prototype, {
		// The current version of PNotify.
		version: "2.0.0",

		// === Options ===

		// Options defaults.
		options: {
			// The notice's title.
			title: false,
			// Whether to escape the content of the title. (Not allow HTML.)
			title_escape: false,
			// The notice's text.
			text: false,
			// Whether to escape the content of the text. (Not allow HTML.)
			text_escape: false,
			// What styling classes to use. (Can be either jqueryui or bootstrap.)
			styling: "bootstrap3",
			// Additional classes to be added to the notice. (For custom styling.)
			addclass: "",
			// Class to be added to the notice for corner styling.
			cornerclass: "",
			// Display the notice when it is created.
			auto_display: true,
			// Width of the notice.
			width: "300px",
			// Minimum height of the notice. It will expand to fit content.
			min_height: "16px",
			// Type of the notice. "notice", "info", "success", or "error".
			type: "notice",
			// Set icon to true to use the default icon for the selected
			// style/type, false for no icon, or a string for your own icon class.
			icon: true,
			// Opacity of the notice.
			opacity: 1,
			// The animation to use when displaying and hiding the notice. "none",
			// "show", "fade", and "slide" are built in to jQuery. Others require jQuery
			// UI. Use an object with effect_in and effect_out to use different effects.
			animation: "fade",
			// Speed at which the notice animates in and out. "slow", "def" or "normal",
			// "fast" or number of milliseconds.
			animate_speed: "slow",
			// Specify a specific duration of position animation
			position_animate_speed: 500,
			// Display a drop shadow.
			shadow: true,
			// After a delay, remove the notice.
			hide: true,
			// Delay in milliseconds before the notice is removed.
			delay: 8000,
			// Reset the hide timer if the mouse moves over the notice.
			mouse_reset: true,
			// Remove the notice's elements from the DOM after it is removed.
			remove: true,
			// Change new lines to br tags.
			insert_brs: true,
			// Whether to remove notices from the global array.
			destroy: true,
			// The stack on which the notices will be placed. Also controls the
			// direction the notices stack.
			stack: default_stack
		},

		// === Modules ===

		// This object holds all the PNotify modules. They are used to provide
		// additional functionality.
		modules: {},
		// This runs an event on all the modules.
		runModules: function(event, arg){
			var curArg;
			for (var module in this.modules) {
				curArg = ((typeof arg === "object" && module in arg) ? arg[module] : arg);
				if (typeof this.modules[module][event] === 'function')
					this.modules[module][event](this, typeof this.options[module] === 'object' ? this.options[module] : {}, curArg);
			}
		},

		// === Class Variables ===

		state: "initializing", // The state can be "initializing", "opening", "open", "closing", and "closed".
		timer: null, // Auto close timer.
		styles: null,
		elem: null,
		container: null,
		title_container: null,
		text_container: null,
		animating: false, // Stores what is currently being animated (in or out).
		timerHide: false, // Stores whether the notice was hidden by a timer.

		// === Events ===

		init: function(){
			var that = this;

			// First and foremost, we don't want our module objects all referencing the prototype.
			this.modules = {};
			$.extend(true, this.modules, PNotify.prototype.modules);

			// Get our styling object.
			if (typeof this.options.styling === "object") {
				this.styles = this.options.styling;
			} else {
				this.styles = PNotify.styling[this.options.styling];
			}

			// Create our widget.
			// Stop animation, reset the removal timer when the user mouses over.
			this.elem = $("<div />", {
				"class": "ui-pnotify "+this.options.addclass,
				"css": {"display": "none"},
				"mouseenter": function(e){
					if (that.options.mouse_reset && that.animating === "out") {
						if (!that.timerHide)
							return;
						// If it's animating out, animate back in really quickly.
						that.elem.stop(true);
						that.state = "open";
						that.animating = "in";
						that.elem.css("height", "auto").animate({"width": that.options.width, "opacity": that.options.opacity}, "fast");
					}
					// Stop the close timer.
					if (that.options.hide && that.options.mouse_reset) that.cancelRemove();
				},
				"mouseleave": function(e){
					// Start the close timer.
					if (that.options.hide && that.options.mouse_reset) that.queueRemove();
					PNotify.positionAll();
				}
			});
			// Create a container for the notice contents.
			this.container = $("<div />", {"class": this.styles.container+" ui-pnotify-container "+(this.options.type === "error" ? this.styles.error : (this.options.type === "info" ? this.styles.info : (this.options.type === "success" ? this.styles.success : this.styles.notice)))})
			.appendTo(this.elem);
			if (this.options.cornerclass !== "")
				this.container.removeClass("ui-corner-all").addClass(this.options.cornerclass);
			// Create a drop shadow.
			if (this.options.shadow)
				this.container.addClass("ui-pnotify-shadow");


			// Add the appropriate icon.
			if (this.options.icon !== false) {
				$("<div />", {"class": "ui-pnotify-icon"})
				.append($("<span />", {"class": this.options.icon === true ? (this.options.type === "error" ? this.styles.error_icon : (this.options.type === "info" ? this.styles.info_icon : (this.options.type === "success" ? this.styles.success_icon : this.styles.notice_icon))) : this.options.icon}))
				.prependTo(this.container);
			}

			// Add a title.
			this.title_container = $("<h4 />", {
				"class": "ui-pnotify-title"
			})
			.appendTo(this.container);
			if (this.options.title === false)
				this.title_container.hide();
			else if (this.options.title_escape)
				this.title_container.text(this.options.title);
			else
				this.title_container.html(this.options.title);

			// Add text.
			this.text_container = $("<div />", {
				"class": "ui-pnotify-text"
			})
			.appendTo(this.container);
			if (this.options.text === false)
				this.text_container.hide();
			else if (this.options.text_escape)
				this.text_container.text(this.options.text);
			else
				this.text_container.html(this.options.insert_brs ? String(this.options.text).replace(/\n/g, "<br />") : this.options.text);

			// Set width and min height.
			if (typeof this.options.width === "string")
				this.elem.css("width", this.options.width);
			if (typeof this.options.min_height === "string")
				this.container.css("min-height", this.options.min_height);


			// Add the notice to the notice array.
			if (this.options.stack.push === "top")
				PNotify.notices = $.merge([this], PNotify.notices);
			else
				PNotify.notices = $.merge(PNotify.notices, [this]);
			// Now position all the notices if they are to push to the top.
			if (this.options.stack.push === "top")
				this.queuePosition(false, 1);




			// Mark the stack so it won't animate the new notice.
			this.options.stack.animation = false;

			// Run the modules.
			this.runModules('init');

			// Display the notice.
			if (this.options.auto_display)
				this.open();
			return this;
		},

		// This function is for updating the notice.
		update: function(options){
			// Save old options.
			var oldOpts = this.options;
			// Then update to the new options.
			this.parseOptions(oldOpts, options);
			// Update the corner class.
			if (this.options.cornerclass !== oldOpts.cornerclass)
				this.container.removeClass("ui-corner-all "+oldOpts.cornerclass).addClass(this.options.cornerclass);
			// Update the shadow.
			if (this.options.shadow !== oldOpts.shadow) {
				if (this.options.shadow)
					this.container.addClass("ui-pnotify-shadow");
				else
					this.container.removeClass("ui-pnotify-shadow");
			}
			// Update the additional classes.
			if (this.options.addclass === false)
				this.elem.removeClass(oldOpts.addclass);
			else if (this.options.addclass !== oldOpts.addclass)
				this.elem.removeClass(oldOpts.addclass).addClass(this.options.addclass);
			// Update the title.
			if (this.options.title === false)
				this.title_container.slideUp("fast");
			else if (this.options.title !== oldOpts.title) {
				if (this.options.title_escape)
					this.title_container.text(this.options.title);
				else
					this.title_container.html(this.options.title);
				if (oldOpts.title === false)
					this.title_container.slideDown(200)
			}
			// Update the text.
			if (this.options.text === false) {
				this.text_container.slideUp("fast");
			} else if (this.options.text !== oldOpts.text) {
				if (this.options.text_escape)
					this.text_container.text(this.options.text);
				else
					this.text_container.html(this.options.insert_brs ? String(this.options.text).replace(/\n/g, "<br />") : this.options.text);
				if (oldOpts.text === false)
					this.text_container.slideDown(200)
			}
			// Change the notice type.
			if (this.options.type !== oldOpts.type)
				this.container.removeClass(
					this.styles.error+" "+this.styles.notice+" "+this.styles.success+" "+this.styles.info
				).addClass(this.options.type === "error" ?
					this.styles.error :
					(this.options.type === "info" ?
						this.styles.info :
						(this.options.type === "success" ?
							this.styles.success :
							this.styles.notice
						)
					)
				);
			if (this.options.icon !== oldOpts.icon || (this.options.icon === true && this.options.type !== oldOpts.type)) {
				// Remove any old icon.
				this.container.find("div.ui-pnotify-icon").remove();
				if (this.options.icon !== false) {
					// Build the new icon.
					$("<div />", {"class": "ui-pnotify-icon"})
					.append($("<span />", {"class": this.options.icon === true ? (this.options.type === "error" ? this.styles.error_icon : (this.options.type === "info" ? this.styles.info_icon : (this.options.type === "success" ? this.styles.success_icon : this.styles.notice_icon))) : this.options.icon}))
					.prependTo(this.container);
				}
			}
			// Update the width.
			if (this.options.width !== oldOpts.width)
				this.elem.animate({width: this.options.width});
			// Update the minimum height.
			if (this.options.min_height !== oldOpts.min_height)
				this.container.animate({minHeight: this.options.min_height});
			// Update the opacity.
			if (this.options.opacity !== oldOpts.opacity)
				this.elem.fadeTo(this.options.animate_speed, this.options.opacity);
			// Update the timed hiding.
			if (!this.options.hide)
				this.cancelRemove();
			else if (!oldOpts.hide)
				this.queueRemove();
			this.queuePosition(true);

			// Run the modules.
			this.runModules('update', oldOpts);
			return this;
		},

		// Display the notice.
		open: function(){
			this.state = "opening";
			// Run the modules.
			this.runModules('beforeOpen');

			var that = this;
			// If the notice is not in the DOM, append it.
			if (!this.elem.parent().length)
				this.elem.appendTo(this.options.stack.context ? this.options.stack.context : body);
			// Try to put it in the right position.
			if (this.options.stack.push !== "top")
				this.position(true);
			// First show it, then set its opacity, then hide it.
			if (this.options.animation === "fade" || this.options.animation.effect_in === "fade") {
				// If it's fading in, it should start at 0.
				this.elem.show().fadeTo(0, 0).hide();
			} else {
				// Or else it should be set to the opacity.
				if (this.options.opacity !== 1)
					this.elem.show().fadeTo(0, this.options.opacity).hide();
			}
			this.animateIn(function(){
				that.queuePosition(true);

				// Now set it to hide.
				if (that.options.hide)
					that.queueRemove();

				that.state = "open";

				// Run the modules.
				that.runModules('afterOpen');
			});

			return this;
		},

		// Remove the notice.
		remove: function(timer_hide) {
			this.state = "closing";
			this.timerHide = !!timer_hide; // Make sure it's a boolean.
			// Run the modules.
			this.runModules('beforeClose');

			var that = this;
			if (this.timer) {
				window.clearTimeout(this.timer);
				this.timer = null;
			}
			this.animateOut(function(){
				that.state = "closed";
				// Run the modules.
				that.runModules('afterClose');
				that.queuePosition(true);
				// If we're supposed to remove the notice from the DOM, do it.
				if (that.options.remove)
					that.elem.detach();
				// Run the modules.
				that.runModules('beforeDestroy');
				// Remove object from PNotify.notices to prevent memory leak (issue #49)
				// unless destroy is off
				if (that.options.destroy) {
					if (PNotify.notices !== null) {
						var idx = $.inArray(that,PNotify.notices);
						if (idx !== -1) {
							PNotify.notices.splice(idx,1);
						}
					}
				}
				// Run the modules.
				that.runModules('afterDestroy');
			});

			return this;
		},

		// === Class Methods ===

		// Get the DOM element.
		get: function(){ return this.elem; },

		// Put all the options in the right places.
		parseOptions: function(options, moreOptions){
			this.options = $.extend(true, {}, PNotify.prototype.options);
			// This is the only thing that *should* be copied by reference.
			this.options.stack = PNotify.prototype.options.stack;
			var optArray = [options, moreOptions], curOpts;
			for (var curIndex in optArray) {
				curOpts = optArray[curIndex];
				if (typeof curOpts == "undefined")
					break;
				if (typeof curOpts !== 'object') {
					this.options.text = curOpts;
				} else {
					for (var option in curOpts) {
						if (this.modules[option]) {
							// Avoid overwriting module defaults.
							$.extend(true, this.options[option], curOpts[option]);
						} else {
							this.options[option] = curOpts[option];
						}
					}
				}
			}
		},

		// Animate the notice in.
		animateIn: function(callback){
			// Declare that the notice is animating in. (Or has completed animating in.)
			this.animating = "in";
			var animation;
			if (typeof this.options.animation.effect_in !== "undefined")
				animation = this.options.animation.effect_in;
			else
				animation = this.options.animation;
			if (animation === "none") {
				this.elem.show();
				callback();
			} else if (animation === "show")
				this.elem.show(this.options.animate_speed, callback);
			else if (animation === "fade")
				this.elem.show().fadeTo(this.options.animate_speed, this.options.opacity, callback);
			else if (animation === "slide")
				this.elem.slideDown(this.options.animate_speed, callback);
			else if (typeof animation === "function")
				animation("in", callback, this.elem);
			else
				this.elem.show(animation, (typeof this.options.animation.options_in === "object" ? this.options.animation.options_in : {}), this.options.animate_speed, callback);
		},

		// Animate the notice out.
		animateOut: function(callback){
			// Declare that the notice is animating out. (Or has completed animating out.)
			this.animating = "out";
			var animation;
			if (typeof this.options.animation.effect_out !== "undefined")
				animation = this.options.animation.effect_out;
			else
				animation = this.options.animation;
			if (animation === "none") {
				this.elem.hide();
				callback();
			} else if (animation === "show")
				this.elem.hide(this.options.animate_speed, callback);
			else if (animation === "fade")
				this.elem.fadeOut(this.options.animate_speed, callback);
			else if (animation === "slide")
				this.elem.slideUp(this.options.animate_speed, callback);
			else if (typeof animation === "function")
				animation("out", callback, this.elem);
			else
				this.elem.hide(animation, (typeof this.options.animation.options_out === "object" ? this.options.animation.options_out : {}), this.options.animate_speed, callback);
		},

		// Position the notice. dont_skip_hidden causes the notice to
		// position even if it's not visible.
		position: function(dontSkipHidden){
			// Get the notice's stack.
			var s = this.options.stack;
			if (typeof s.context === "undefined")
				s.context = body;
			if (!s) return;
			if (typeof s.nextpos1 !== "number")
				s.nextpos1 = s.firstpos1;
			if (typeof s.nextpos2 !== "number")
				s.nextpos2 = s.firstpos2;
			if (typeof s.addpos2 !== "number")
				s.addpos2 = 0;
			var hidden = this.elem.css("display") === "none";
			// Skip this notice if it's not shown.
			if (!hidden || dontSkipHidden) {
				var curpos1, curpos2;
				// Store what will need to be animated.
				var animate = {};
				// Calculate the current pos1 value.
				var csspos1;
				switch (s.dir1) {
					case "down":
						csspos1 = "top";
						break;
					case "up":
						csspos1 = "bottom";
						break;
					case "left":
						csspos1 = "right";
						break;
					case "right":
						csspos1 = "left";
						break;
				}
				curpos1 = parseInt(this.elem.css(csspos1).replace(/(?:\..*|[^0-9.])/g, ''));
				if (isNaN(curpos1))
					curpos1 = 0;
				// Remember the first pos1, so the first visible notice goes there.
				if (typeof s.firstpos1 === "undefined" && !hidden) {
					s.firstpos1 = curpos1;
					s.nextpos1 = s.firstpos1;
				}
				// Calculate the current pos2 value.
				var csspos2;
				switch (s.dir2) {
					case "down":
						csspos2 = "top";
						break;
					case "up":
						csspos2 = "bottom";
						break;
					case "left":
						csspos2 = "right";
						break;
					case "right":
						csspos2 = "left";
						break;
				}
				curpos2 = parseInt(this.elem.css(csspos2).replace(/(?:\..*|[^0-9.])/g, ''));
				if (isNaN(curpos2))
					curpos2 = 0;
				// Remember the first pos2, so the first visible notice goes there.
				if (typeof s.firstpos2 === "undefined" && !hidden) {
					s.firstpos2 = curpos2;
					s.nextpos2 = s.firstpos2;
				}
				// Check that it's not beyond the viewport edge.
				if ((s.dir1 === "down" && s.nextpos1 + this.elem.height() > (s.context.is(body) ? jwindow.height() : s.context.prop('scrollHeight')) ) ||
					(s.dir1 === "up" && s.nextpos1 + this.elem.height() > (s.context.is(body) ? jwindow.height() : s.context.prop('scrollHeight')) ) ||
					(s.dir1 === "left" && s.nextpos1 + this.elem.width() > (s.context.is(body) ? jwindow.width() : s.context.prop('scrollWidth')) ) ||
					(s.dir1 === "right" && s.nextpos1 + this.elem.width() > (s.context.is(body) ? jwindow.width() : s.context.prop('scrollWidth')) ) ) {
					// If it is, it needs to go back to the first pos1, and over on pos2.
					s.nextpos1 = s.firstpos1;
					s.nextpos2 += s.addpos2 + (typeof s.spacing2 === "undefined" ? 25 : s.spacing2);
					s.addpos2 = 0;
				}
				// Animate if we're moving on dir2.
				if (s.animation && s.nextpos2 < curpos2) {
					switch (s.dir2) {
						case "down":
							animate.top = s.nextpos2+"px";
							break;
						case "up":
							animate.bottom = s.nextpos2+"px";
							break;
						case "left":
							animate.right = s.nextpos2+"px";
							break;
						case "right":
							animate.left = s.nextpos2+"px";
							break;
					}
				} else {
					if(typeof s.nextpos2 === "number")
						this.elem.css(csspos2, s.nextpos2+"px");
				}
				// Keep track of the widest/tallest notice in the column/row, so we can push the next column/row.
				switch (s.dir2) {
					case "down":
					case "up":
						if (this.elem.outerHeight(true) > s.addpos2)
							s.addpos2 = this.elem.height();
						break;
					case "left":
					case "right":
						if (this.elem.outerWidth(true) > s.addpos2)
							s.addpos2 = this.elem.width();
						break;
				}
				// Move the notice on dir1.
				if (typeof s.nextpos1 === "number") {
					// Animate if we're moving toward the first pos.
					if (s.animation && (curpos1 > s.nextpos1 || animate.top || animate.bottom || animate.right || animate.left)) {
						switch (s.dir1) {
							case "down":
								animate.top = s.nextpos1+"px";
								break;
							case "up":
								animate.bottom = s.nextpos1+"px";
								break;
							case "left":
								animate.right = s.nextpos1+"px";
								break;
							case "right":
								animate.left = s.nextpos1+"px";
								break;
						}
					} else
						this.elem.css(csspos1, s.nextpos1+"px");
				}
				// Run the animation.
				if (animate.top || animate.bottom || animate.right || animate.left)
					this.elem.animate(animate, {duration: this.options.position_animate_speed, queue: false});
				// Calculate the next dir1 position.
				switch (s.dir1) {
					case "down":
					case "up":
						s.nextpos1 += this.elem.height() + (typeof s.spacing1 === "undefined" ? 25 : s.spacing1);
						break;
					case "left":
					case "right":
						s.nextpos1 += this.elem.width() + (typeof s.spacing1 === "undefined" ? 25 : s.spacing1);
						break;
				}
			}
			return this;
		},
		// Queue the position all function so it doesn't run repeatedly and
		// use up resources.
		queuePosition: function(animate, milliseconds){
			if (timer)
				clearTimeout(timer);
			if (!milliseconds)
				milliseconds = 10;
			timer = setTimeout(function(){ PNotify.positionAll(animate) }, milliseconds);
			return this;
		},


		// Cancel any pending removal timer.
		cancelRemove: function(){
			if (this.timer)
				window.clearTimeout(this.timer);
			return this;
		},
		// Queue a removal timer.
		queueRemove: function(){
			var that = this;
			// Cancel any current removal timer.
			this.cancelRemove();
			this.timer = window.setTimeout(function(){
				that.remove(true);
			}, (isNaN(this.options.delay) ? 0 : this.options.delay));
			return this;
		}
	});
	// These functions affect all notices.
	$.extend(PNotify, {
		// This holds all the notices.
		notices: [],
		removeAll: function () {
			$.each(PNotify.notices, function(){
				if (this.remove)
					this.remove();
			});
		},
		positionAll: function (animate) {
			// This timer is used for queueing this function so it doesn't run
			// repeatedly.
			if (timer)
				clearTimeout(timer);
			timer = null;
			// Reset the next position data.
			$.each(PNotify.notices, function(){
				var s = this.options.stack;
				if (!s) return;
				s.nextpos1 = s.firstpos1;
				s.nextpos2 = s.firstpos2;
				s.addpos2 = 0;
				s.animation = animate;
			});
			$.each(PNotify.notices, function(){
				this.position();
			});
		},
		styling: {
			jqueryui: {
				container: "ui-widget ui-widget-content ui-corner-all",
				notice: "ui-state-highlight",
				// (The actual jQUI notice icon looks terrible.)
				notice_icon: "ui-icon ui-icon-info",
				info: "",
				info_icon: "ui-icon ui-icon-info",
				success: "ui-state-default",
				success_icon: "ui-icon ui-icon-circle-check",
				error: "ui-state-error",
				error_icon: "ui-icon ui-icon-alert"
			},
			bootstrap2: {
				container: "alert",
				notice: "",
				notice_icon: "icon-exclamation-sign",
				info: "alert-info",
				info_icon: "icon-info-sign",
				success: "alert-success",
				success_icon: "icon-ok-sign",
				error: "alert-error",
				error_icon: "icon-warning-sign"
			},
			bootstrap3: {
				container: "alert",
				notice: "alert-warning",
				notice_icon: "glyphicon glyphicon-exclamation-sign",
				info: "alert-info",
				info_icon: "glyphicon glyphicon-info-sign",
				success: "alert-success",
				success_icon: "glyphicon glyphicon-ok-sign",
				error: "alert-danger",
				error_icon: "glyphicon glyphicon-warning-sign"
			}
		}
	});
	/*
	 * uses icons from http://fontawesome.io/
	 * version 4.0.3
	 */
	PNotify.styling.fontawesome = $.extend({}, PNotify.styling.bootstrap3);
	$.extend(PNotify.styling.fontawesome, {
		notice_icon: "fa fa-exclamation-circle",
		info_icon: "fa fa-info",
		success_icon: "fa fa-check",
		error_icon: "fa fa-warning"
	});

	if (document.body)
		do_when_ready();
	else
		$(do_when_ready);
}));
// Buttons
(function($){
	PNotify.prototype.options.buttons = {
		// Provide a button for the user to manually close the notice.
		closer: true,
		// Only show the closer button on hover.
		closer_hover: true,
		// Provide a button for the user to manually stick the notice.
		sticker: true,
		// Only show the sticker button on hover.
		sticker_hover: true,
		// The various displayed text, helps facilitating internationalization.
		labels: {
			close: "Close",
			stick: "Stick"
		}
	};
	PNotify.prototype.modules.buttons = {
		// This lets us update the options available in the closures.
		myOptions: null,

		closer: null,
		sticker: null,

		init: function(notice, options){
			var that = this;
			this.myOptions = options;
			notice.elem.on({
				"mouseenter": function(e){
					// Show the buttons.
					if (that.myOptions.sticker && !(notice.options.nonblock && notice.options.nonblock.nonblock)) that.sticker.trigger("pnotify_icon").css("visibility", "visible");
					if (that.myOptions.closer && !(notice.options.nonblock && notice.options.nonblock.nonblock)) that.closer.css("visibility", "visible");
				},
				"mouseleave": function(e){
					// Hide the buttons.
					if (that.myOptions.sticker_hover)
						that.sticker.css("visibility", "hidden");
					if (that.myOptions.closer_hover)
						that.closer.css("visibility", "hidden");
				}
			});

			// Provide a button to stick the notice.
			this.sticker = $("<div />", {
				"class": "ui-pnotify-sticker",
				"css": {"cursor": "pointer", "visibility": options.sticker_hover ? "hidden" : "visible"},
				"click": function(){
					notice.options.hide = !notice.options.hide;
					if (notice.options.hide)
						notice.queueRemove();
					else
						notice.cancelRemove();
					$(this).trigger("pnotify_icon");
				}
			})
			.bind("pnotify_icon", function(){
				$(this).children().removeClass(notice.styles.pin_up+" "+notice.styles.pin_down).addClass(notice.options.hide ? notice.styles.pin_up : notice.styles.pin_down);
			})
			.append($("<span />", {"class": notice.styles.pin_up, "title": options.labels.stick}))
			.prependTo(notice.container);
			if (!options.sticker || (notice.options.nonblock && notice.options.nonblock.nonblock))
				this.sticker.css("display", "none");

			// Provide a button to close the notice.
			this.closer = $("<div />", {
				"class": "ui-pnotify-closer",
				"css": {"cursor": "pointer", "visibility": options.closer_hover ? "hidden" : "visible"},
				"click": function(){
					notice.remove(false);
					that.sticker.css("visibility", "hidden");
					that.closer.css("visibility", "hidden");
				}
			})
			.append($("<span />", {"class": notice.styles.closer, "title": options.labels.close}))
			.prependTo(notice.container);
			if (!options.closer || (notice.options.nonblock && notice.options.nonblock.nonblock))
				this.closer.css("display", "none");
		},
		update: function(notice, options){
			this.myOptions = options;
			// Update the sticker and closer buttons.
			if (!options.closer || (notice.options.nonblock && notice.options.nonblock.nonblock))
				this.closer.css("display", "none");
			else if (options.closer)
				this.closer.css("display", "block");
			if (!options.sticker || (notice.options.nonblock && notice.options.nonblock.nonblock))
				this.sticker.css("display", "none");
			else if (options.sticker)
				this.sticker.css("display", "block");
			// Update the sticker icon.
			this.sticker.trigger("pnotify_icon");
			// Update the hover status of the buttons.
			if (options.sticker_hover)
				this.sticker.css("visibility", "hidden");
			else if (!(notice.options.nonblock && notice.options.nonblock.nonblock))
				this.sticker.css("visibility", "visible");
			if (options.closer_hover)
				this.closer.css("visibility", "hidden");
			else if (!(notice.options.nonblock && notice.options.nonblock.nonblock))
				this.closer.css("visibility", "visible");
		}
	};
	$.extend(PNotify.styling.jqueryui, {
		closer: "ui-icon ui-icon-close",
		pin_up: "ui-icon ui-icon-pin-w",
		pin_down: "ui-icon ui-icon-pin-s"
	});
	$.extend(PNotify.styling.bootstrap2, {
		closer: "icon-remove",
		pin_up: "icon-pause",
		pin_down: "icon-play"
	});
	$.extend(PNotify.styling.bootstrap3, {
		closer: "glyphicon glyphicon-remove",
		pin_up: "glyphicon glyphicon-pause",
		pin_down: "glyphicon glyphicon-play"
	});
	$.extend(PNotify.styling.fontawesome, {
		closer: "fa fa-times",
		pin_up: "fa fa-pause",
		pin_down: "fa fa-play"
	});
})(jQuery);
// Callbacks
(function($){
	var _init   = PNotify.prototype.init,
		_open   = PNotify.prototype.open,
		_remove = PNotify.prototype.remove;
	PNotify.prototype.init = function(){
		if (this.options.before_init) {
			this.options.before_init(this.options);
		}
		_init.apply(this, arguments);
		if (this.options.after_init) {
			this.options.after_init(this);
		}
	};
	PNotify.prototype.open = function(){
		var ret;
		if (this.options.before_open) {
			ret = this.options.before_open(this);
		}
		if (ret !== false) {
			_open.apply(this, arguments);
			if (this.options.after_open) {
				this.options.after_open(this);
			}
		}
	};
	PNotify.prototype.remove = function(timer_hide){
		var ret;
		if (this.options.before_close) {
			ret = this.options.before_close(this, timer_hide);
		}
		if (ret !== false) {
			_remove.apply(this, arguments);
			if (this.options.after_close) {
				this.options.after_close(this, timer_hide);
			}
		}
	};
})(jQuery);
// Confirm
(function($){
	PNotify.prototype.options.confirm = {
		// Make a confirmation box.
		confirm: false,
		// Where to align the buttons. (right, center, left, justify)
		align: "right",
		// The buttons to display, and their callbacks.
		buttons: [
			{
				text: "Ok",
				addClass: "",
				click: function(notice){
					notice.get().trigger("pnotify.confirm");
					notice.remove();
				}
			},
			{
				text: "Cancel",
				addClass: "",
				click: function(notice){
					notice.get().trigger("pnotify.cancel");
					notice.remove();
				}
			}
		]
	};
	PNotify.prototype.modules.confirm = {
		// The div that contains the buttons.
		buttonContainer: null,

		init: function(notice, options){
			this.buttonContainer = $('<div style="margin-top:5px;clear:both;text-align:'+options.align+';" />').appendTo(notice.container);

			if (options.confirm)
				this.makeButtons(notice, options);
			else
				this.buttonContainer.hide();
		},

		update: function(notice, options){
			if (options.confirm) {
				this.makeButtons(notice, options);
				this.buttonContainer.show();
			} else {
				this.buttonContainer.hide().empty();
			}
		},

		makeButtons: function(notice, options) {
			var already = false, btn, elem;
			this.buttonContainer.empty();
			for (var i in options.buttons) {
				btn = options.buttons[i];
				if (already)
					this.buttonContainer.append(' ');
				else
					already = true;
				elem = $('<button type="button" class="'+notice.styles.btn+' '+btn.addClass+'">'+btn.text+'</button>')
				.appendTo(this.buttonContainer)
				.on("click", (function(btn){ return function(){
					if (typeof btn.click == "function") {
						btn.click(notice);
					}
				}})(btn));
				if (notice.styles.text) {
					elem.wrapInner('<span class="'+notice.styles.text+'"></span>');
				}
				if (notice.styles.btnhover) {
					elem.hover((function(elem){ return function(){
						elem.addClass(notice.styles.btnhover);
					}})(elem), (function(elem){ return function(){
						elem.removeClass(notice.styles.btnhover);
					}})(elem));
				}
				if (notice.styles.btnactive) {
					elem.on("mousedown", (function(elem){ return function(){
						elem.addClass(notice.styles.btnactive);
					}})(elem)).on("mouseup", (function(elem){ return function(){
						elem.removeClass(notice.styles.btnactive);
					}})(elem));
				}
				if (notice.styles.btnfocus) {
					elem.on("focus", (function(elem){ return function(){
						elem.addClass(notice.styles.btnfocus);
					}})(elem)).on("blur", (function(elem){ return function(){
						elem.removeClass(notice.styles.btnfocus);
					}})(elem));
				}
			}
		}
	};
	$.extend(PNotify.styling.jqueryui, {
		btn: "ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only",
		btnhover: "ui-state-hover",
		btnactive: "ui-state-active",
		btnfocus: "ui-state-focus",
		text: "ui-button-text"
	});
	$.extend(PNotify.styling.bootstrap2, {
		btn: "btn"
	});
	$.extend(PNotify.styling.bootstrap3, {
		btn: "btn btn-default"
	});
	$.extend(PNotify.styling.fontawesome, {
		btn: "btn btn-default"
	});
})(jQuery);
// Desktop
(function($){
	var permission;
	var notify = function(title, options){
		// Memoize based on feature detection.
		if ("Notification" in window) {
			notify = function (title, options) {
				return new Notification(title, options);
			};
		} else if ("mozNotification" in navigator) {
			notify = function (title, options) {
				// Gecko < 22
				return navigator.mozNotification
					.createNotification(title, options.body, options.icon)
					.show();
			};
		} else if ("webkitNotifications" in window) {
			notify = function (title, options) {
				return window.webkitNotifications.createNotification(
					options.icon,
					title,
					options.body
				);
			};
		} else {
			notify = function (title, options) {
				return null;
			};
		}
		return notify(title, options);
	};


	PNotify.prototype.options.desktop = {
		// Display the notification as a desktop notification.
		desktop: false,
		// The URL of the icon to display. If false, no icon will show. If null, a default icon will show.
		icon: null
	};
	PNotify.prototype.modules.desktop = {
		init: function(notice, options){
			if (!options.desktop)
				return;
			permission = PNotify.desktop.checkPermission();
			if (permission != 0)
				return;
			if (options.icon === null) {
				options.icon = "http://sciactive.com/pnotify/includes/desktop/"+notice.options.type+".png";
			} else if (options.icon === false) {
				options.icon = null;
			}
			notice.desktop = notify(notice.options.title, {
				icon: options.icon,
				body: notice.options.text
			});
			if (!("close" in notice.desktop)) {
				notice.desktop = function(){
					notice.desktop.cancel();
				};
			}
			notice.desktop.onclick = function(){
				notice.elem.trigger("click");
			};
			notice.desktop.onclose = function(){
				if (notice.state !== "closing" && notice.state !== "closed") {
					notice.remove();
				}
			};
		},
		update: function(notice, options, oldOpts){
			if (permission != 0 || !options.desktop)
				return;
		},
		beforeOpen: function(notice, options){
			if (permission != 0 || !options.desktop)
				return;
			notice.elem.css({'left': '-10000px', 'display': 'none'});
		},
		afterOpen: function(notice, options){
			if (permission != 0 || !options.desktop)
				return;
			notice.elem.css({'left': '-10000px', 'display': 'none'});
			if ("show" in notice.desktop) {
				notice.desktop.show();
			}
		},
		beforeClose: function(notice, options){
			if (permission != 0 || !options.desktop)
				return;
			notice.elem.css({'left': '-10000px', 'display': 'none'});
		},
		afterClose: function(notice, options){
			if (permission != 0 || !options.desktop)
				return;
			notice.elem.css({'left': '-10000px', 'display': 'none'});
			notice.desktop.close();
		}
	};
	PNotify.desktop = {
		permission: function(){
			if (typeof Notification !== "undefined" && "requestPermission" in Notification) {
				Notification.requestPermission();
			} else if ("webkitNotifications" in window) {
				window.webkitNotifications.requestPermission();
			}
		},
		checkPermission: function(){
			if (typeof Notification !== "undefined" && "permission" in Notification) {
				return (Notification.permission == "granted" ? 0 : 1);
			} else if ("webkitNotifications" in window) {
				return window.webkitNotifications.checkPermission();
			} else {
				return 1;
			}
		}
	};
	permission = PNotify.desktop.checkPermission()
})(jQuery);
// History
(function($){
	var history_menu,
		history_handle_top;
	$(function(){
		$("body").on("pnotify.history-all", function(){
			// Display all notices. (Disregarding non-history notices.)
			$.each(PNotify.notices, function(){
				if (this.modules.history.inHistory) {
					if (this.elem.is(":visible")) {
						// The hide variable controls whether the history pull down should
						// queue a removal timer.
						if (this.options.hide)
							this.queueRemove();
					} else if (this.open)
						this.open();
				}
			});
		}).on("pnotify.history-last", function(){
			var pushTop = (PNotify.prototype.options.stack.push === "top");

			// Look up the last history notice, and display it.
			var i = (pushTop ? 0 : -1);

			var notice;
			do {
				if (i === -1)
					notice = PNotify.notices.slice(i);
				else
					notice = PNotify.notices.slice(i, i+1);
				if (!notice[0])
					return false;

				i = (pushTop ? i + 1 : i - 1);
			} while (!notice[0].modules.history.inHistory || notice[0].elem.is(":visible"));
			if (notice[0].open)
				notice[0].open();
		});
	});
	PNotify.prototype.options.history = {
		// Place the notice in the history.
		history: true,
		// Display a pull down menu to redisplay previous notices.
		menu: false,
		// Make the pull down menu fixed to the top of the viewport.
		fixed: true,
		// Maximum number of notifications to have onscreen.
		maxonscreen: Infinity,
		// The various displayed text, helps facilitating internationalization.
		labels: {
			redisplay: "Redisplay",
			all: "All",
			last: "Last"
		}
	};
	PNotify.prototype.modules.history = {
		// The history variable controls whether the notice gets redisplayed
		// by the history pull down.
		inHistory: false,

		init: function(notice, options){
			// Make sure that no notices get destroyed.
			notice.options.destroy = false;

			this.inHistory = options.history;

			if (options.menu) {
				// If there isn't a history pull down, create one.
				if (typeof history_menu === "undefined") {
					history_menu = $("<div />", {
						"class": "ui-pnotify-history-container "+notice.styles.hi_menu,
						"mouseleave": function(){
							history_menu.animate({top: "-"+history_handle_top+"px"}, {duration: 100, queue: false});
						}
					})
					.append($("<div />", {"class": "ui-pnotify-history-header", "text": options.labels.redisplay}))
					.append($("<button />", {
							"class": "ui-pnotify-history-all "+notice.styles.hi_btn,
							"text": options.labels.all,
							"mouseenter": function(){
								$(this).addClass(notice.styles.hi_btnhov);
							},
							"mouseleave": function(){
								$(this).removeClass(notice.styles.hi_btnhov);
							},
							"click": function(){
								$(this).trigger("pnotify.history-all");
								return false;
							}
					}))
					.append($("<button />", {
							"class": "ui-pnotify-history-last "+notice.styles.hi_btn,
							"text": options.labels.last,
							"mouseenter": function(){
								$(this).addClass(notice.styles.hi_btnhov);
							},
							"mouseleave": function(){
								$(this).removeClass(notice.styles.hi_btnhov);
							},
							"click": function(){
								$(this).trigger("pnotify.history-last");
								return false;
							}
					}))
					.appendTo("body");

					// Make a handle so the user can pull down the history tab.
					var handle = $("<span />", {
						"class": "ui-pnotify-history-pulldown "+notice.styles.hi_hnd,
						"mouseenter": function(){
							history_menu.animate({top: "0"}, {duration: 100, queue: false});
						}
					})
					.appendTo(history_menu);

					// Get the top of the handle.
					console.log(handle.offset());
					history_handle_top = handle.offset().top + 2;
					// Hide the history pull down up to the top of the handle.
					history_menu.css({top: "-"+history_handle_top+"px"});

					// Apply the fixed styling.
					if (options.fixed) {
						history_menu.addClass('ui-pnotify-history-fixed');
					}
				}
			}
		},
		update: function(notice, options){
			// Update values for history menu access.
			this.inHistory = options.history;
			if (options.fixed && history_menu) {
				history_menu.addClass('ui-pnotify-history-fixed');
			} else if (history_menu) {
				history_menu.removeClass('ui-pnotify-history-fixed');
			}
		},
		beforeOpen: function(notice, options){
			// Remove oldest notifications leaving only options.maxonscreen on screen
			if (PNotify.notices && (PNotify.notices.length > options.maxonscreen)) {
				// Oldest are normally in front of array, or if stack.push=="top" then
				// they are at the end of the array! (issue #98)
				var el;
				if (notice.options.stack.push !== "top")
					el = PNotify.notices.slice(0, PNotify.notices.length - options.maxonscreen);
				else
					el = PNotify.notices.slice(options.maxonscreen, PNotify.notices.length);

				$.each(el, function(){
					if (this.remove)
						this.remove();
				});
			}
		}
	};
	$.extend(PNotify.styling.jqueryui, {
		hi_menu: "ui-state-default ui-corner-bottom",
		hi_btn: "ui-state-default ui-corner-all",
		hi_btnhov: "ui-state-hover",
		hi_hnd: "ui-icon ui-icon-grip-dotted-horizontal"
	});
	$.extend(PNotify.styling.bootstrap2, {
		hi_menu: "well",
		hi_btn: "btn",
		hi_btnhov: "",
		hi_hnd: "icon-chevron-down"
	});
	$.extend(PNotify.styling.bootstrap3, {
		hi_menu: "well",
		hi_btn: "btn btn-default",
		hi_btnhov: "",
		hi_hnd: "glyphicon glyphicon-chevron-down"
	});
	$.extend(PNotify.styling.fontawesome, {
		hi_menu: "well",
		hi_btn: "btn btn-default",
		hi_btnhov: "",
		hi_hnd: "fa fa-chevron-down"
	});
})(jQuery);
// Nonblock
(function($){
	// Some useful regexes.
	var re_on = /^on/,
		re_mouse_events = /^(dbl)?click$|^mouse(move|down|up|over|out|enter|leave)$|^contextmenu$/,
		re_ui_events = /^(focus|blur|select|change|reset)$|^key(press|down|up)$/,
		re_html_events = /^(scroll|resize|(un)?load|abort|error)$/;
	// Fire a DOM event.
	var dom_event = function(e, orig_e){
		var event_object;
		e = e.toLowerCase();
		if (document.createEvent && this.dispatchEvent) {
			// FireFox, Opera, Safari, Chrome
			e = e.replace(re_on, '');
			if (e.match(re_mouse_events)) {
				// This allows the click event to fire on the notice. There is
				// probably a much better way to do it.
				$(this).offset();
				event_object = document.createEvent("MouseEvents");
				event_object.initMouseEvent(
					e, orig_e.bubbles, orig_e.cancelable, orig_e.view, orig_e.detail,
					orig_e.screenX, orig_e.screenY, orig_e.clientX, orig_e.clientY,
					orig_e.ctrlKey, orig_e.altKey, orig_e.shiftKey, orig_e.metaKey, orig_e.button, orig_e.relatedTarget
				);
			} else if (e.match(re_ui_events)) {
				event_object = document.createEvent("UIEvents");
				event_object.initUIEvent(e, orig_e.bubbles, orig_e.cancelable, orig_e.view, orig_e.detail);
			} else if (e.match(re_html_events)) {
				event_object = document.createEvent("HTMLEvents");
				event_object.initEvent(e, orig_e.bubbles, orig_e.cancelable);
			}
			if (!event_object) return;
			this.dispatchEvent(event_object);
		} else {
			// Internet Explorer
			if (!e.match(re_on)) e = "on"+e;
			event_object = document.createEventObject(orig_e);
			this.fireEvent(e, event_object);
		}
	};


	// This keeps track of the last element the mouse was over, so
	// mouseleave, mouseenter, etc can be called.
	var nonblock_last_elem;
	// This is used to pass events through the notice if it is non-blocking.
	var nonblock_pass = function(notice, e, e_name){
		notice.elem.css("display", "none");
		var element_below = document.elementFromPoint(e.clientX, e.clientY);
		notice.elem.css("display", "block");
		var jelement_below = $(element_below);
		var cursor_style = jelement_below.css("cursor");
		notice.elem.css("cursor", cursor_style !== "auto" ? cursor_style : "default");
		// If the element changed, call mouseenter, mouseleave, etc.
		if (!nonblock_last_elem || nonblock_last_elem.get(0) != element_below) {
			if (nonblock_last_elem) {
				dom_event.call(nonblock_last_elem.get(0), "mouseleave", e.originalEvent);
				dom_event.call(nonblock_last_elem.get(0), "mouseout", e.originalEvent);
			}
			dom_event.call(element_below, "mouseenter", e.originalEvent);
			dom_event.call(element_below, "mouseover", e.originalEvent);
		}
		dom_event.call(element_below, e_name, e.originalEvent);
		// Remember the latest element the mouse was over.
		nonblock_last_elem = jelement_below;
	};


	PNotify.prototype.options.nonblock = {
		// Create a non-blocking notice. It lets the user click elements underneath it.
		nonblock: false,
		// The opacity of the notice (if it's non-blocking) when the mouse is over it.
		nonblock_opacity: .2
	};
	PNotify.prototype.modules.nonblock = {
		// This lets us update the options available in the closures.
		myOptions: null,

		init: function(notice, options){
			var that = this;
			this.myOptions = options;
			notice.elem.on({
				"mouseenter": function(e){
					if (that.myOptions.nonblock) e.stopPropagation();
					if (that.myOptions.nonblock) {
						// If it's non-blocking, animate to the other opacity.
						notice.elem.stop().animate({"opacity": that.myOptions.nonblock_opacity}, "fast");
					}
				},
				"mouseleave": function(e){
					if (that.myOptions.nonblock) e.stopPropagation();
					nonblock_last_elem = null;
					notice.elem.css("cursor", "auto");
					// Animate back to the normal opacity.
					if (that.myOptions.nonblock && notice.animating !== "out")
						notice.elem.stop().animate({"opacity": notice.options.opacity}, "fast");
				},
				"mouseover": function(e){
					if (that.myOptions.nonblock) e.stopPropagation();
				},
				"mouseout": function(e){
					if (that.myOptions.nonblock) e.stopPropagation();
				},
				"mousemove": function(e){
					if (that.myOptions.nonblock) {
						e.stopPropagation();
						nonblock_pass(notice, e, "onmousemove");
					}
				},
				"mousedown": function(e){
					if (that.myOptions.nonblock) {
						e.stopPropagation();
						e.preventDefault();
						nonblock_pass(notice, e, "onmousedown");
					}
				},
				"mouseup": function(e){
					if (that.myOptions.nonblock) {
						e.stopPropagation();
						e.preventDefault();
						nonblock_pass(notice, e, "onmouseup");
					}
				},
				"click": function(e){
					if (that.myOptions.nonblock) {
						e.stopPropagation();
						nonblock_pass(notice, e, "onclick");
					}
				},
				"dblclick": function(e){
					if (that.myOptions.nonblock) {
						e.stopPropagation();
						nonblock_pass(notice, e, "ondblclick");
					}
				}
			});
		},
		update: function(notice, options){
			this.myOptions = options;
		}
	};
})(jQuery);
// Reference
// This file is for referencing while you are making a notify module.
(function($){
	// This if the default values of your options.
	PNotify.prototype.options.reference = {
		// Provide a thing for stuff. Turned off by default.
		putThing: false,
		// If you are displaying any text, you should use a labels options to
		// support internationalization.
		labels: {
			text: "Spin Around"
		}
	};
	PNotify.prototype.modules.reference = {
		// You can put variables here that are specific to a notice instance.
		thingElem: null,

		// This function is called when the notice is being created, after the
		// core has done all of its work.
		init: function(notice /* the notice object */, options /* this module's options */){
			var that = this; // This line will allow you to access instance variables
							 // like "this.thingElem" from within closures.

			// Note that options only contains the options specific to our modules.
			// To access global options, we would use notice.options.

			// We want to check to make sure the notice should include our thing.
			if (!options.putThing)
				return;

			// We're going to create a button that will be appended to the notice.
			// It will be disabled by default, so we can enable it on mouseover.
			// You should try to keep elements inside the notice container.
			this.thingElem = $('<button style="float:right;" class="btn btn-default" type="button" disabled><i class="'+notice.styles.athing+'" />&nbsp;'+options.labels.text+'</button>').appendTo(notice.container);
			// Since our button is floated, we have to add a clearing div.
			notice.container.append('<div style="clear: right; line-height: 0;" />')

			// Now we're going to enable the button on mouseenter.
			notice.elem.on({
				"mouseenter": function(e){
					// Enable the button.
					// Notice that we have to use "that" to access thingElem, because
					// we are in a different scope inside this function.
					that.thingElem.prop("disabled", false);
				},
				"mouseleave": function(e){
					// Disable the button.
					that.thingElem.prop("disabled", true);
				}
			});

			// Now we're going to make our button do something.
			this.thingElem.on("click", function(){
				// Spin the notice around.
				var cur_angle = 0;
				var timer = setInterval(function(){
					cur_angle += 10;
					if (cur_angle == 360) {
						cur_angle = 0;
						clearInterval(timer);
					}
					notice.elem.css({
						'-moz-transform': ('rotate('+cur_angle+'deg)'),
						'-webkit-transform': ('rotate('+cur_angle+'deg)'),
						'-o-transform': ('rotate('+cur_angle+'deg)'),
						'-ms-transform': ('rotate('+cur_angle+'deg)'),
						'filter': ('progid:DXImageTransform.Microsoft.BasicImage(rotation='+(cur_angle / 360 * 4)+')')
					});
				}, 20);
			});
		},

		// This is called when the notice is updating its options.
		update: function(notice, options /* the new options for our module */, oldOpts /* the old options for our module */){
			// We need to remove the button if it's now disabled, and show it again if it's enabled.
			if (options.putThing && this.thingElem)
				this.thingElem.show();
			else if (!options.putThing && this.thingElem)
				this.thingElem.hide();
			// You may notice that if the user creates a notice without our button,
			// then updates it to enable our button, they will be out of luck.
			// Whatever, I don't want to write that much code.

			// Now we update the icon, which may have changed.
			// Note that as of right now, PNotify doesn't support updating styling.
			if (this.thingElem)
				this.thingElem.find('i').attr("class", notice.styles.athing);
		},
		// I have nothing to put in these, just showing you that they exist. You
		// won't need to include them if you aren't using them.
		beforeOpen: function(notice, options){
			// Called before the notice is opened.
		},
		afterOpen: function(notice, options){
			// Called after the notice is opened.
		},
		beforeClose: function(notice, options){
			// Called before the notice is closed.
		},
		afterClose: function(notice, options){
			// Called after the notice is closed.
		},
		beforeDestroy: function(notice, options){
			// Called before the notice is destroyed.
		},
		afterDestroy: function(notice, options){
			// Called after the notice is destroyed.
		}
	};
	// This is where you would add any styling options you are using in your code.
	$.extend(PNotify.styling.jqueryui, {
		athing: "ui-icon ui-icon-refresh"
	});
	$.extend(PNotify.styling.bootstrap2, {
		athing: "icon-refresh"
	});
	$.extend(PNotify.styling.bootstrap3, {
		athing: "glyphicon glyphicon-refresh"
	});
	$.extend(PNotify.styling.fontawesome, {
		athing: "fa fa-refresh"
	});
})(jQuery);
