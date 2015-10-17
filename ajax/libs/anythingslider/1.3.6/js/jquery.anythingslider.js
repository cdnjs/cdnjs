/*
	AnythingSlider v1.3.5

	By Chris Coyier: http://css-tricks.com
	with major improvements by Doug Neiner: http://pixelgraphics.us/
	based on work by Remy Sharp: http://jqueryfordesigners.com/


	To use the navigationFormatter function, you must have a function that
	accepts two paramaters, and returns a string of HTML text.

	index = integer index (1 based);
	panel = jQuery wrapped LI item this tab references
	@return = Must return a string of HTML/Text

	navigationFormatter: function(index, panel){
		return index + " Panel"; // This would have each tab with the text 'X Panel' where X = index
	}
*/

(function($) {

	__anythingSliderRunTimes = 0;

	$.anythingSlider = function(el, options) {

		// To avoid scope issues, use 'base' instead of 'this'
		// to reference this class from internal events and functions.
		var base = this;

			// Keeps track of the index of the current instance
		__anythingSliderRunTimes++;
		base.runTimes = __anythingSliderRunTimes;

		// Wraps the ul in the necessary divs and then gives Access to jQuery element
		base.$el = $(el).wrap('<div class="anythingSlider"><div class="anythingWindow" /></div>').closest('div.anythingSlider');

		// Set up a few defaults
		base.currentPage = 1;
		base.timer = null;
		base.playing = false;

		// Add a reverse reference to the DOM object
		base.$el.data("AnythingSlider", base);

		base.init = function() {

			base.options = $.extend({},$.anythingSlider.defaults, options);

			// Cache existing DOM elements for later
			base.$wrapper = base.$el.find('> div');
			base.$slider  = base.$wrapper.find('> ul');
			base.$items   = base.$slider.find('> li');
			base.$single  = base.$items.filter(':first');
			base.$objects = base.$items.find('object');
			base.$dimensions = [];

			// Set the dimensions
			if (base.options.width && base.options.resizeContents) {
				base.$el.css('width', base.options.width);
				base.$wrapper.css('width', base.options.width);
				base.$items.css('width', base.options.width);
			}
			if (base.options.height && base.options.resizeContents) {
				base.$el.css('height', base.options.height);
				base.$wrapper.css('height', base.options.height);
				base.$items.css('height', base.options.height);
			}
			if (base.$objects.length && base.options.resizeContents){
				base.$objects.find('embed').andSelf().css({ width : '100%', height: '100%' });
			}

			// initialize youtube api - doesn't work in IE (someone have a solution?)
			var $el;
			base.$objects.each(function(){
				if ($(this).find('embed[src*=youtube]').length){
					$el = $(this)
						.wrap('<div id="yt-temp"></div>')
						.find('embed[src*=youtube]').attr('src', function(i,s){ return s + '&enablejsapi=1&version=3'; }).end()
						.find('param[value*=youtube]').attr('value', function(i,v){ return v + '&enablejsapi=1&version=3'; }).end()
						// detach/appendTo required for Chrome
						.detach()
						.appendTo($('#yt-temp'))
						.unwrap();
				}
			});

			// Get the details
			base.singleWidth = base.$single.outerWidth();
			base.pages = base.$items.length;

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
			base.$items.filter(':first').before( $itemClone.attr('id', function(i,id){ return (id=='') ? '' : id + "-cloned"; }) );

			$itemClone = base.$items.filter(':first').clone().addClass('cloned');
			base.$items.filter(':last' ).after($itemClone.attr('id', function(i,id){ return (id=='') ? '' : id + "-cloned"; }) );

			// We just added two items, time to re-cache the list
			base.$items = base.$slider.find('> li'); // reselect
			base.setDimensions();
			if (!base.options.resizeContents) { $(window).load(function(){ base.setDimensions(); }); } // set dimensions after all images load

			// Build forwards/backwards buttons if needed
			if (base.options.buildArrows) { base.buildNextBackButtons(); }

			// If pauseOnHover then add hover effects
			if (base.options.pauseOnHover) {
				base.$el.hover(function() {
					base.clearTimer();
				}, function() {
					base.startStop(base.playing);
				});
			}

			// If a hash can not be used to trigger the plugin, then go to page 1
			if ((base.options.hashTags === true && !base.gotoHash()) || base.options.hashTags === false) {
				base.setCurrentPage(1);
			}

			// Fix tabbing through the page
			base.$items.find('a').focus(function(){
				base.$items.find('.focusedLink').removeClass('focusedLink');
				$(this).addClass('focusedLink');
				base.$items.each(function(i){
					if ($(this).find('a.focusedLink').length) {
						console.debug(i);
						base.gotoPage(i);
						return false;
					}
				});
			});

		};

		// Set panel dimensions to either resize content or adjust panel to content
		base.setDimensions = function(){
			var w, h, c, dw;
			base.$items.each(function(i){
				c = $(this).children('*');
				if (base.options.resizeContents){
					w = base.options.width || base.$wrapper.width();
					h = base.options.height || base.$wrapper.height();
					$(this).css({ width: w, height: h });
					// resize contents if solitary (wrapped content or solitary image)
					if (c.length == 1){
						c.css({ width: w, height: h });
					}
				} else {
					w = $(this).width(); // if not defined, it will return the width of the ul parent (32700px)
					dw = (w > 32000) ? true : false;
					if (c.length == 1 && dw){
						cw = (c.width() > 32000) ? base.$wrapper.width() : c.width(); // get width of solitary child
						$(this).css({ width: cw });
						c.css({ 'max-width' : cw });
						w = cw;
					}
					w = (dw) ?  base.options.width || base.$wrapper.width() : w;
					$(this).css( 'width', w );
					// get height after setting width
					h = $(this).outerHeight();
					$(this).css( 'height', h );
				}
				base.$dimensions[i] = [w,h];
			});
		};

		base.gotoPage = function(page, autoplay) {
			// When autoplay isn't passed, we stop the timer
			if (autoplay !== true) { autoplay = false; }
			if (!autoplay) { base.startStop(false); }

			if (typeof(page) === "undefined" || page === null) {
				page = 1;
				base.setCurrentPage(1);
			}

			// Stop the slider when we reach the last page, if the option stopAtEnd is set to true
			if(base.options.stopAtEnd){
				if(page == base.pages) { base.startStop(false); }
			}

			// Just check for bounds
			if (page > base.pages + 1) { page = base.pages; }
			if (page < 0 ) { page = 1; }

			var left = base.getLeft(page) - base.getLeft(base.currentPage);

			// pause YouTube videos before scrolling
			var emb;
			if (base.$objects.length){
				base.$objects.each(function(){
					emb = $(this).find('embed[src*=youtube]');
					if (emb.length) {
						try {
							// don't pause the video if it hasn't been initialized
							if (emb[0].getPlayerState() > 0) {
								emb[0].pauseVideo();
							}
						} catch(err) {}
					}
				});
			}

			base.$el.add(base.$wrapper).filter(':not(:animated)').animate({
				scrollLeft : '+=' + left,
				width: base.$dimensions[page][0],
				height: base.$dimensions[page][1]
			}, base.options.animationTime, base.options.easing, function () {
				if (page === 0) {
					base.$wrapper.scrollLeft(base.getLeft(base.pages));
					page = base.pages;
				} else if (page > base.pages) {
					base.$wrapper.scrollLeft(0);
					// reset back to start position
					page = 1;
				}
				base.setCurrentPage(page);

				// continue YouTube video if in current panel
				if (base.$objects.length){
					emb = base.$items.eq(base.currentPage).find('embed[src*=youtube]');
					if (emb.length){
						try {
							if (emb[0].getPlayerState() > 0) {
								emb[0].playVideo();
							}
						} catch(err) {}
					}
				}

			});
		};

		base.setCurrentPage = function(page, move) {
			// Set visual
			if (base.options.buildNavigation){
				base.$nav.find('.cur').removeClass('cur');
				base.$nav.find('a').eq(page - 1).addClass('cur');
			}

			// Only change left if move does not equal false
			if (move !== false) {
				base.$el.add(base.$wrapper).css({
					width: base.$dimensions[page][0],
					height: base.$dimensions[page][1]
				});
				base.$el.scrollLeft(0);
				base.$wrapper.scrollLeft( base.getLeft(page) );
			}
			// Update local variable
			base.currentPage = page;
		
			// Set current slider as active
			if ($('div.anythingSlider.activeSlider') == base.$el){
				return;
			} else {
				$('div.anythingSlider.activeSlider').removeClass('activeSlider');
				base.$el.addClass('activeSlider');
			}
		};

		base.getLeft = function(page){
			var i, left = 0;
			for (i = 0; i < page; i++){
				left += base.$dimensions[i][0];
			}
			return left;
		};

		base.goForward = function(autoplay) {
			if (autoplay !== true) { autoplay = false; }
			base.gotoPage(base.currentPage + 1, autoplay);
		};

		base.goBack = function() {
			base.gotoPage(base.currentPage - 1);
		};

		// This method tries to find a hash that matches panel-X
		// If found, it tries to find a matching item
		// If that is found as well, then that item starts visible
		base.gotoHash = function(){
			var hash = window.location.hash.match(/^#?panel(\d+)-(\d+)$/);
			if (hash) {
				var panel = parseInt(hash[1],10);
				if (panel == base.runTimes) {
					var slide = parseInt(hash[2],10);
					var $item = base.$items.filter(':eq(' + slide + ')');
					if ($item.length !== 0) {
						base.setCurrentPage(slide);
						return true;
					}
				}
			}
			return false; // A item wasn't found;
		};

		// Creates the numbered navigation links
		base.buildNavigation = function() {
			base.$nav = $('<ul class="thumbNav" />').appendTo(base.$el);

			if (base.options.buildNavigation && (base.pages > 1)) {
				base.$items.each(function(i,el) {
					var index = i + 1;
					var $a = $("<a href='#'></a>");

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

			// Append elements to page
			$(base.$el).prepend($forward).prepend($back);

			// Add keyboard navigation
			$(window).keyup(function(e){
				if (base.$el.is('.activeSlider')) {
					switch (e.which) {
						case 39: // right arrow
							base.goForward();
							e.preventDefault();
							break;
						case 37: //left arrow
							base.goBack();
							break;
					}
				}
			});

		};

		// Creates the Start/Stop button
		base.buildAutoPlay = function(){

			base.$startStop = $("<a href='#' class='start-stop'></a>").html(base.playing ? base.options.stopText :  base.options.startText);
			base.$el.append(base.$startStop);
			base.$startStop.click(function(e) {
				base.startStop(!base.playing);
				if (base.playing) { base.goForward(true); }
				e.preventDefault();
			});

			// Use the same setting, but trigger the start;
			base.startStop(base.playing);
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
					base.goForward(true);
				}, base.options.delay);
			} else {
				base.clearTimer();
			}
		};

		base.clearTimer = function(){
			// Clear the timer only if it is set
			if(base.timer) { window.clearInterval(base.timer); }
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

		// Trigger the initialization
		base.init();
	};

	$.anythingSlider.defaults = {
		easing: "swing",           // Anything other than "linear" or "swing" requires the easing plugin
		autoPlay: true,            // This turns off the entire FUNCTIONALY, not just if it starts running or not
		startStopped: false,       // If autoPlay is on, this can force it to start stopped
		delay: 3000,               // How long between slide transitions in AutoPlay mode
		animationTime: 600,        // How long the slide transition takes
		hashTags: true,            // Should links change the hashtag in the URL?
		buildNavigation: true,     // If true, builds and list of anchor links to link to each slide
		pauseOnHover: true,        // If true, and autoPlay is enabled, the show will pause on hover
		startText: "Start",        // Start text
		stopText: "Stop",          // Stop text
		navigationFormatter: null, // Details at the top of the file on this use (advanced use)
		buildArrows: true,         // If true, builds the forwards and backwards buttons
		forwardText: "&raquo;",    // Link text used to move the slider forward
		backText: "&laquo;",       // Link text used to move the slider back
		width: null,               // Override the default CSS width
		height: null,              // Override the default CSS height
		resizeContents: true       // If true, solitary images/objects in the panel will expand to fit the panel
	};

	$.fn.anythingSlider = function(options) {

		if (typeof(options) == "number" || typeof(options) == "string") {

			return this.closest('.anythingSlider').each(function(i) {
				var anySlide = $(this).data('AnythingSlider');
				if (anySlide) {
					anySlide.gotoPage(options);
				}
			});

		} else {
	
			return this.each(function(i){
				(new $.anythingSlider(this, options));
			});
			
		}

	};

})(jQuery);