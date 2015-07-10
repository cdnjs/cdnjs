/*
	AnythingSlider v1.4

	By Chris Coyier: http://css-tricks.com
	with major improvements by Doug Neiner: http://pixelgraphics.us/
	based on work by Remy Sharp: http://jqueryfordesigners.com/

	To use the navigationFormatter function, you must have a function that
	accepts two paramaters, and returns a string of HTML text.

	index = integer index (1 based);
	panel = jQuery wrapped LI item this tab references
	@return = Must return a string of HTML/Text

	navigationFormatter: function(index, panel){
		return "Panel #" + index; // This would have each tab with the text 'Panel #X' where X = index
	}
*/

(function($) {

	$.anythingSlider = function(el, options) {

		// To avoid scope issues, use 'base' instead of 'this'
		// to reference this class from internal events and functions.
		var base = this;

		// Wraps the ul in the necessary divs and then gives Access to jQuery element
		base.$el = $(el).addClass('anythingBase').wrap('<div class="anythingSlider"><div class="anythingWindow" /></div>');

		// Add a reverse reference to the DOM object
		base.$el.data("AnythingSlider", base);

		base.init = function(){

			base.options = $.extend({},$.anythingSlider.defaults, options);

			// Cache existing DOM elements for later
			// base.$el = original ul
			base.$wrapper = base.$el.parent().closest('div.anythingSlider'); // parent() then closest incase the ul has anythingSlider class
			base.$window = base.$el.closest('div.anythingWindow');
			base.$items   = base.$el.find('> li').addClass('panel');
			base.$objects = base.$items.find('object');
			base.$dimensions = [];

			// Set up a few defaults & get details
			base.currentPage = base.options.startPanel;
			base.timer = null;
			base.playing = false;
			base.pages   = base.$items.length;
			base.$objlen = !!base.$objects.length;

			// Get index (run time) of this slider on the page
			base.runTimes = $('div.anythingSlider').index(base.$wrapper) + 1;

			// Make sure easing function exists.
			if (!$.isFunction($.easing[base.options.easing])) { base.options.easing = "swing"; }

			// Set the dimensions
			if (base.options.resizeContents) {
				if (base.options.width) {
					base.$wrapper.css('width', base.options.width);
					base.$items.css('width', base.options.width);
				}
				if (base.options.height) {
					base.$wrapper.css('height', base.options.height);
					base.$items.css('height', base.options.height);
				}
				if (base.$objlen){
					base.$objects.find('embed').andSelf().css({ width : '100%', height: '100%' });
				}
			}

			// initialize youtube api - doesn't work in IE (someone have a solution?)
			base.$objects.each(function(){
				if ($(this).find('[src*=youtube]').length){
					$(this).parent()
						.wrap('<div id="yt-temp"></div>')
						.find('embed[src*=youtube]').attr('src', function(i,s){ return s + '&enablejsapi=1&version=3'; }).end()
						.find('param[value*=youtube]').attr('value', function(i,v){ return v + '&enablejsapi=1&version=3'; }).end()
						// detach/appendTo required for Chrome
						.detach()
						.appendTo($('#yt-temp'))
						.unwrap();
				}
			});

			// Remove navigation & player if there is only one page
			if (base.pages === 1) {
				base.options.autoPlay = false;
				base.options.buildNavigation = false;
				base.options.buildArrows = false;
			}

			// If autoPlay functionality is included, then initialize the settings
			if (base.options.autoPlay) {
				base.playing = !base.options.startStopped; // Sets the playing variable to false if startStopped is true
				base.buildAutoPlay();
			}

			// Build the navigation
			base.buildNavigation();

			// Top and tail the list with 'visible' number of items, top has the last section, and tail has the first
			// This supports the "infinite" scrolling
			// Ensures any cloned elements with ID's have unique ID's
			var $itemClone = base.$items.filter(':last').clone().addClass('cloned');
			base.$items.filter(':first').before( $itemClone.attr('id', function(i,id){ return (id==='') ? '' : id + "-cloned"; }) );

			$itemClone = base.$items.filter(':first').clone().addClass('cloned');
			base.$items.filter(':last' ).after($itemClone.attr('id', function(i,id){ return (id==='') ? '' : id + "-cloned"; }) );

			// We just added two items, time to re-cache the list, then get the dimensions of each panel
			base.$items = base.$el.find('> li'); // reselect
			base.setDimensions();
			if (!base.options.resizeContents) { $(window).load(function(){ base.setDimensions(); }); } // set dimensions after all images load

			// Build forwards/backwards buttons
			if (base.options.buildArrows) { base.buildNextBackButtons(); }

			// If pauseOnHover then add hover effects
			if (base.options.pauseOnHover) {
				base.$wrapper.hover(function() {
					base.clearTimer();
				}, function() {
					base.startStop(base.playing);
				});
			}

			// If a hash can not be used to trigger the plugin, then go to start panel
			if ((base.options.hashTags === true && !base.gotoHash()) || base.options.hashTags === false) {
				base.setCurrentPage(base.options.startPanel, false);
			}

			// Fix tabbing through the page
			base.$items.find('a').focus(function(){
				base.$items.find('.focusedLink').removeClass('focusedLink');
				$(this).addClass('focusedLink');
				base.$items.each(function(i){
					if ($(this).find('a.focusedLink').length) {
						base.gotoPage(i);
						return false;
					}
				});
			});

			// Add keyboard navigation
			$(window).keyup(function(e){
				if (base.$wrapper.is('.activeSlider')) {
					switch (e.which) {
						case 39: // right arrow
							base.goForward();
							break;
						case 37: //left arrow
							base.goBack();
							break;
					}
				}
			});

		};

		// Creates the numbered navigation links
		base.buildNavigation = function() {
			base.$nav = $('<ul class="thumbNav" />').appendTo(base.$wrapper);
			if (base.options.playRtl) { base.$wrapper.addClass('rtl'); }

			if (base.options.buildNavigation && (base.pages > 1)) {
				base.$items.each(function(i,el) {
					var index = i + 1,
						$a = $("<a href='#'></a>");

					// If a formatter function is present, use it
					if (typeof(base.options.navigationFormatter) == "function") {
						$a.html(base.options.navigationFormatter(index, $(this)));
					} else {
						$a.text(index);
					}

					$a.bind('click focusin', function(e) {
						base.gotoPage(index);
						if (base.options.hashTags) { base.setHash('panel' + base.runTimes + '-' + index); }
						e.preventDefault();
					});

					$(base.$nav).append($a);
					$a.wrap("<li />");
				});

			}
		};

		// Creates the Forward/Backward buttons
		base.buildNextBackButtons = function() {
			var $forward = $('<span class="arrow forward"><a href="#">' + base.options.forwardText + '</a></span>'),
				$back = $('<span class="arrow back"><a href="#">' + base.options.backText + '</a></span>');

			// Bind to the forward and back buttons
			$back.click(function(e) {
				base.goBack();
				e.preventDefault();
			});
			$forward.click(function(e) {
				base.goForward();
				e.preventDefault();
			});
			// using tab to get to arrow links will show they have focus (outline is disabled in css)
			$back.add($forward).find('a').bind('focusin focusout',function(){
			 $(this).toggleClass('hover');
			});

			// Append elements to page
			base.$wrapper.prepend($forward).prepend($back);
		};

		// Creates the Start/Stop button
		base.buildAutoPlay = function(){
			base.$startStop = $("<a href='#' class='start-stop'></a>").html(base.playing ? base.options.stopText :  base.options.startText);
			base.$wrapper.append(base.$startStop);
			base.$startStop
				.click(function(e) {
					base.startStop(!base.playing);
					if (base.playing) {
						if (base.options.playRtl) {
							base.goBack(true);
						} else {
							base.goForward(true);
						}
					}
					e.preventDefault();
				})
				// show button has focus while tabbing
				.bind('focusin focusout',function(){
					$(this).toggleClass('hover');
				});

			// Use the same setting, but trigger the start;
			base.startStop(base.playing);
		};

		// Set panel dimensions to either resize content or adjust panel to content
		base.setDimensions = function(){
			var w, h, c, cw, dw, leftEdge = 0, bww = base.$window.width(), winw = $(window).width();
			base.$items.each(function(i){
				c = $(this).children('*');
				if (base.options.resizeContents){
					// get viewport width & height from options (if set), or css
					w = parseInt(base.options.width,10) || bww;
					h = parseInt(base.options.height,10) || base.$window.height();
					// resize panel
					$(this).css({ width: w, height: h });
					// resize panel contents, if solitary (wrapped content or solitary image)
					if (c.length == 1){ c.css({ width: w, height: h }); }
				} else {
					// get panel width & height and save it
					w = $(this).width(); // if not defined, it will return the width of the ul parent
					dw = (w >= winw) ? true : false; // width defined from css?
					if (c.length == 1 && dw){
						cw = (c.width() >= winw) ? bww : c.width(); // get width of solitary child
						$(this).css('width', cw); // set width of panel
						c.css('max-width', cw);   // set max width for all children
						w = cw;
					}
					w = (dw) ?  base.options.width || bww : w;
					$(this).css('width', w);
					h = $(this).outerHeight(); // get height after setting width
					$(this).css('height', h);
				}
				base.$dimensions[i] = [w,h,leftEdge];
				leftEdge += w;
			});
			//  Set total width of slider, but don't go beyond the set max overall width (limited by Opera)
			base.$el.css('width', (leftEdge < base.options.maxOverallWidth) ? leftEdge : base.options.maxOverallWidth);
		};

		base.gotoPage = function(page, autoplay) {
			if (typeof(page) === "undefined" || page === null) {
				page = base.options.startPage;
				base.setCurrentPage(base.options.startPage);
			}

			// Just check for bounds
			if (page > base.pages + 1) { page = base.pages; }
			if (page < 0 ) { page = 1; }

			// When autoplay isn't passed, we stop the timer
			if (autoplay !== true) { autoplay = false; }
			// Stop the slider when we reach the last page, if the option stopAtEnd is set to true
			if (!autoplay || (base.options.stopAtEnd && page == base.pages)) { base.startStop(false); }

			// pause YouTube videos before scrolling or prevent change if playing
			if (base.checkVideo(base.playing)) { return; }

			// resize slider if content size varies
			if (!base.options.resizeContents) {
				// animating the wrapper resize before the window prevents flickering in Firefox
				base.$wrapper.filter(':not(:animated)').animate(
					{ width: base.$dimensions[page][0], height: base.$dimensions[page][1] },
					{ queue: false, duration: base.options.animationTime, easing: base.options.easing }
				);
			}
			// Animate Slider
			base.$window.filter(':not(:animated)').animate(
				{ scrollLeft : base.$dimensions[page][2] },
				{ queue: false, duration: base.options.animationTime, easing: base.options.easing, complete: function(){ base.endAnimation(page); } }
			);

		};

		base.endAnimation = function(page){
			if (page === 0) {
				base.$window.scrollLeft(base.$dimensions[base.pages][2]);
				page = base.pages;
			} else if (page > base.pages) {
				// reset back to start position
				base.$window.scrollLeft(0);
				page = 1;
			}
			base.setCurrentPage(page, false);

			// continue YouTube video if in current panel
			if (base.$objlen){
				var emb = base.$items.eq(base.currentPage).find('embed[src*=youtube]');
				try {
					if (emb.length && $.isFunction(emb[0].getPlayerState) && emb[0].getPlayerState() > 0) {
						emb[0].playVideo();
					}
				} catch(err) {}
			}
		};

		base.setCurrentPage = function(page, move) {
			// Set visual
			if (base.options.buildNavigation){
				base.$nav.find('.cur').removeClass('cur');
				base.$nav.find('a').eq(page - 1).addClass('cur');
			}

			// Only change left if move does not equal false
			if (!move) {
				base.$wrapper.css({ // .add(base.$window)
					width: base.$dimensions[page][0],
					height: base.$dimensions[page][1]
				});
				base.$wrapper.scrollLeft(0); // reset in case tabbing changed this scrollLeft
				base.$window.scrollLeft( base.$dimensions[page][2] );
			}
			// Update local variable
			base.currentPage = page;

			// Set current slider as active so keyboard navigation works properly
			if (!base.$wrapper.is('.activeSlider')){
				$('.activeSlider').removeClass('activeSlider');
				base.$wrapper.addClass('activeSlider');
			}
		};

		base.goForward = function(autoplay) {
			if (autoplay !== true) { autoplay = false; base.startStop(false); }
			base.gotoPage(base.currentPage + 1, autoplay);
		};

		base.goBack = function(autoplay) {
			if (autoplay !== true) { autoplay = false; base.startStop(false); }
			base.gotoPage(base.currentPage - 1, autoplay);
		};

		// This method tries to find a hash that matches panel-X
		// If found, it tries to find a matching item
		// If that is found as well, then that item starts visible
		base.gotoHash = function(){
			var hash = window.location.hash.match(/^#?panel(\d+)-(\d+)$/);
			if (hash) {
				var panel = parseInt(hash[1],10);
				if (panel == base.runTimes) {
					var slide = parseInt(hash[2],10),
						$item = base.$items.filter(':eq(' + slide + ')');
					if ($item.length !== 0) {
						base.setCurrentPage(slide, false);
						return true;
					}
				}
			}
			return false; // An item wasn't found;
		};

		// Taken from AJAXY jquery.history Plugin
		base.setHash = function (hash) {
			// Write hash
			if ( typeof window.location.hash !== 'undefined' ) {
				if ( window.location.hash !== hash ) {
					window.location.hash = hash;
				}
			} else if ( location.hash !== hash ) {
				location.hash = hash;
			}

			// Done
			return hash;
		};
		// <-- End AJAXY code

		base.clearTimer = function(){
			// Clear the timer only if it is set
			if (base.timer) { window.clearInterval(base.timer); }
		};

		// Handles stopping and playing the slideshow
		// Pass startStop(false) to stop and startStop(true) to play
		base.startStop = function(playing) {
			if (playing !== true) { playing = false; } // Default if not supplied is false

			// Update variable
			base.playing = playing;

			// Toggle playing and text
			if (base.options.autoPlay) { base.$startStop.toggleClass("playing", playing).html( playing ? base.options.stopText : base.options.startText ); }

			if (playing){
				base.clearTimer(); // Just in case this was triggered twice in a row
				base.timer = window.setInterval(function() {
					// prevent autoplay if video is playing
					if (!base.checkVideo(playing)) {
						if (base.options.playRtl) {
							base.goBack(true);
						} else {
							base.goForward(true);
						}
					}
				}, base.options.delay);
			} else {
				base.clearTimer();
			}
		};

		base.checkVideo = function(playing){
			// pause YouTube videos before scrolling?
			var emb, ps, stopAdvance = false;
			if (base.$objlen){
				base.$objects.each(function(){
					// this only works on youtube videos
					emb = $(this).find('embed[src*=youtube]');
					try {
						if (emb.length && $.isFunction(emb[0].getPlayerState)) {
							// player states: unstarted (-1), ended (0), playing (1), paused (2), buffering (3), video cued (5).
							ps = emb[0].getPlayerState();
							// if autoplay, video playing, video is in current panel and resume option are true, then don't advance
							if (playing && ps == 1 && base.$items.index(emb.closest('li')) == base.currentPage && base.options.resumeOnVideoEnd) {
								stopAdvance = true;
							} else {
								// pause video if not autoplaying (if already initialized)
								if (ps > 0) { emb[0].pauseVideo(); }
							}
						}
					} catch(err) {}
				});
			}
			return stopAdvance;
		};

		// Trigger the initialization
		base.init();
	};

	$.anythingSlider.defaults = {
		// Appearance
		width               : null,      // Override the default CSS width
		height              : null,      // Override the default CSS height
		resizeContents      : true,      // If true, solitary images/objects in the panel will expand to fit the viewport

		// Navigation
		startPanel          : 1,         // This sets the initial panel
		hashTags            : true,      // Should links change the hashtag in the URL?
		buildArrows         : true,      // If true, builds the forwards and backwards buttons
		buildNavigation     : true,      // If true, builds a list of anchor links to link to each panel
		navigationFormatter : null,      // Details at the top of the file on this use (advanced use)
		forwardText         : "&raquo;", // Link text used to move the slider forward (hidden by CSS, replaced with arrow image)
		backText            : "&laquo;", // Link text used to move the slider back (hidden by CSS, replace with arrow image)

		// Slideshow options
		autoPlay            : true,      // This turns off the entire slideshow FUNCTIONALY, not just if it starts running or not
		startStopped        : false,     // If autoPlay is on, this can force it to start stopped
		pauseOnHover        : true,      // If true & the slideshow is active, the slideshow will pause on hover
		resumeOnVideoEnd    : true,      // If true & the slideshow is active & a youtube video is playing, it will pause the autoplay until the video is complete
		stopAtEnd           : false,     // If true & the slideshow is active, the slideshow will stop on the last page
		playRtl             : false,     // If true, the slideshow will move right-to-left
		startText           : "Start",   // Start button text
		stopText            : "Stop",    // Stop button text
		delay               : 3000,      // How long between slideshow transitions in AutoPlay mode (in milliseconds)
		animationTime       : 600,       // How long the slideshow transition takes (in milliseconds)
		easing              : "swing",   // Anything other than "linear" or "swing" requires the easing plugin
		
		maxOverallWidth     : 32766      // Max width (in pixels) of combined sliders (side-to-side); set to 32766 to prevent problems with Opera
	};

	$.fn.anythingSlider = function(options) {

		// initialize the slider
		if ((typeof(options)).match('object|undefined')){
			return this.each(function(i){
				(new $.anythingSlider(this, options));
			});

		// If options is a number, process as an external link to page #: $(element).anythingSlider(#)
		} else if (/\d/.test(options) && !isNaN(options)) {
			return this.each(function(i) {
				var anySlide = $(this).data('AnythingSlider');
				if (anySlide) {
					var page = (typeof(options) == "number") ? options : parseInt($.trim(options),10); // accepts "  2  "
					// ignore out of bound pages
					if ( page < 1 || page > anySlide.pages ) { return; }
					anySlide.gotoPage(page);
				}
			});
		}

	};

})(jQuery);