/*
	AnythingSlider v1.7.4
	Original by Chris Coyier: http://css-tricks.com
	Get the latest version: https://github.com/ProLoser/AnythingSlider

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

		var base = this, o;

		// Wraps the ul in the necessary divs and then gives Access to jQuery element
		base.$el = $(el).addClass('anythingBase').wrap('<div class="anythingSlider"><div class="anythingWindow" /></div>');

		// Add a reverse reference to the DOM object
		base.$el.data("AnythingSlider", base);

		base.init = function(){

			// Added "o" to be used in the code instead of "base.options" which doesn't get modifed by the compiler - reduces size by ~1k
			base.options = o = $.extend({}, $.anythingSlider.defaults, options);

			base.initialized = false;
			if ($.isFunction(o.onBeforeInitialize)) { base.$el.bind('before_initialize', o.onBeforeInitialize); }
			base.$el.trigger('before_initialize', base);

			// Cache existing DOM elements for later
			// base.$el = original ul
			// for wrap - get parent() then closest in case the ul has "anythingSlider" class
			base.$wrapper = base.$el.parent().closest('div.anythingSlider').addClass('anythingSlider-' + o.theme);
			base.$window = base.$el.closest('div.anythingWindow');
			base.win = window;
			base.$win = $(base.win);

			base.$controls = $('<div class="anythingControls"></div>').appendTo( (o.appendControlsTo !== null && $(o.appendControlsTo).length) ? $(o.appendControlsTo) : base.$wrapper);
			base.$startStop = $('<a href="#" class="start-stop"></a>');
			if (o.buildStartStop) {
				base.$startStop.appendTo( (o.appendStartStopTo !== null && $(o.appendStartStopTo).length) ? $(o.appendStartStopTo) : base.$controls );
			}
			base.$nav = $('<ul class="thumbNav" />').appendTo( (o.appendNavigationTo !== null && $(o.appendNavigationTo).length) ? $(o.appendNavigationTo) : base.$controls );

			// Set up a few defaults & get details
			base.flag    = false; // event flag to prevent multiple calls (used in control click/focusin)
			base.playing = o.autoPlay; // slideshow state; removed "startStopped" option
			base.slideshow = false; // slideshow flag
			base.hovered = false; // actively hovering over the slider
			base.panelSize = [];  // will contain dimensions and left position of each panel
			base.currentPage = o.startPanel = parseInt(o.startPanel,10) || 1; // make sure this isn't a string
			base.adj = (o.infiniteSlides) ? 0 : 1; // adjust page limits for infinite or limited modes
			base.width = base.$el.width();
			base.height = base.$el.height();
			base.outerPad = [ base.$wrapper.innerWidth() - base.$wrapper.width(), base.$wrapper.innerHeight() - base.$wrapper.height() ];
			if (o.playRtl) { base.$wrapper.addClass('rtl'); }

			// Expand slider to fit parent
			if (o.expand) {
				base.$outer = base.$wrapper.parent();
				base.$window.css({ width: '100%', height: '100%' }); // needed for Opera
				base.checkResize();
			}

			// Build start/stop button
			if (o.buildStartStop) { base.buildAutoPlay(); }

			// Build forwards/backwards buttons
			if (o.buildArrows) { base.buildNextBackButtons(); }

			// can't lock autoplay it if it's not enabled
			if (!o.autoPlay) { o.autoPlayLocked = false; }

			base.updateSlider();

			base.$lastPage = base.$currentPage;

			// Get index (run time) of this slider on the page
			base.runTimes = $('div.anythingSlider').index(base.$wrapper) + 1;
			base.regex = new RegExp('panel' + base.runTimes + '-(\\d+)', 'i'); // hash tag regex

			// Make sure easing function exists.
			if (!$.isFunction($.easing[o.easing])) { o.easing = "swing"; }

			// If pauseOnHover then add hover effects
			if (o.pauseOnHover) {
				base.$wrapper.hover(function() {
					if (base.playing) {
						base.$el.trigger('slideshow_paused', base);
						base.clearTimer(true);
					}
				}, function() {
					if (base.playing) {
						base.$el.trigger('slideshow_unpaused', base);
						base.startStop(base.playing, true);
					}
				});
			}

			// If a hash can not be used to trigger the plugin, then go to start panel
			var triggers, startPanel = (o.hashTags) ? base.gotoHash() || o.startPanel : o.startPanel;
			base.setCurrentPage(startPanel, false); // added to trigger events for FX code

			// Hide/Show navigation & play/stop controls
			base.slideControls(false);
			base.$wrapper.bind('mouseenter mouseleave', function(e){
				base.hovered = (e.type === "mouseenter") ? true : false;
				base.slideControls( base.hovered, false );
			});

			// Add keyboard navigation
			$(document).keyup(function(e){
				// Stop arrow keys from working when focused on form items
				if (o.enableKeyboard && base.$wrapper.is('.activeSlider') && !e.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
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

			// Fix tabbing through the page, but don't change the view if the link is in view (showMultiple = true)
			base.$items.delegate('a', 'focus.AnythingSlider', function(e){
				var panel = $(this).closest('.panel'),
				 indx = base.$items.index(panel) + base.adj;
				base.$items.find('.focusedLink').removeClass('focusedLink');
				$(this).addClass('focusedLink');
				base.$window.scrollLeft(0);
				if (!panel.is('.activePage') && base.currentPage + o.showMultiple - 1 > indx) {
					base.gotoPage(indx);
					e.preventDefault();
				}
			});

			// Binds events
			triggers = "slideshow_paused slideshow_unpaused slide_init slide_begin slideshow_stop slideshow_start initialized swf_completed".split(" ");
			$.each("onShowPause onShowUnpause onSlideInit onSlideBegin onShowStop onShowStart onInitialized onSWFComplete".split(" "), function(i,f){
				if ($.isFunction(o[f])){
					base.$el.bind(triggers[i], o[f]);
				}
			});
			if ($.isFunction(o.onSlideComplete)){
				// Added setTimeout (zero time) to ensure animation is complete... see this bug report: http://bugs.jquery.com/ticket/7157
				base.$el.bind('slide_complete', function(){
					setTimeout(function(){ o.onSlideComplete(base); }, 0);
				});
			}
			base.initialized = true;
			base.$el.trigger('initialized', base);

			// trigger the slideshow
			base.startStop(base.playing);

		};

		// called during initialization & to update the slider if a panel is added or deleted
		base.updateSlider = function(){
			// needed for updating the slider
			base.$el.children('.cloned').remove();
			base.$nav.empty();
			// set currentPage to 1 in case it was zero - occurs when adding slides after removing them all
			base.currentPage = base.currentPage || 1;

			base.$items = base.$el.children(); 
			base.pages = base.$items.length;
			o.showMultiple = parseInt(o.showMultiple,10) || 1; // only integers allowed

			if (o.showMultiple > 1) {
				if (o.showMultiple > base.pages) { o.showMultiple = base.pages; }
				base.adjustMultiple = (o.infiniteSlides && base.pages > 1) ? 0 : o.showMultiple - 1;
				base.pages = base.$items.length - base.adjustMultiple;
			}

			// Hide navigation & player if there is only one page
			base.$controls
				.add(base.$nav)
				.add(base.$startStop)
				.add(base.$forward)
				.add(base.$back)
				[(base.pages <= 1) ? 'hide' : 'show']();
			if (base.pages > 1) {
				// Build/update navigation tabs
				base.buildNavigation();
			}

			// Top and tail the list with 'visible' number of items, top has the last section, and tail has the first
			// This supports the "infinite" scrolling, also ensures any cloned elements don't duplicate an ID
			if (o.infiniteSlides && base.pages > 1) {
				base.$el.prepend( base.$items.filter(':last').clone().addClass('cloned').removeAttr('id') );
				// Add support for multiple sliders shown at the same time
				if (o.showMultiple > 1) {
					base.$el.append( base.$items.filter(':lt(' + o.showMultiple + ')').clone().addClass('cloned').addClass('multiple').removeAttr('id') );
				} else {
					base.$el.append( base.$items.filter(':first').clone().addClass('cloned').removeAttr('id') );
				}
				base.$el.find('.cloned').each(function(){
					// disable all focusable elements in cloned panels to prevent shifting the panels by tabbing
					$(this).find('a,input,textarea,select,button,area').attr('disabled', 'disabled');
					$(this).find('[id]').removeAttr('id');
				});
			}

			// We just added two items, time to re-cache the list, then get the dimensions of each panel
			base.$items = base.$el.children().addClass('panel');
			base.setDimensions();

			// Set the dimensions of each panel
			if (o.resizeContents && base.pages > 1) {
				base.$items.css('width', base.width);
				base.$wrapper.css('width', base.getDim(base.currentPage)[0]);
				base.$wrapper.add(base.$items).css('height', base.height);
			} else {
				base.$win.load(function(){ base.setDimensions(); }); // set dimensions after all images load
			}

			if (base.currentPage > base.pages) {
				base.currentPage = base.pages;
			}
			base.setCurrentPage(base.currentPage, false);
			base.$nav.find('a').eq(base.currentPage - 1).addClass('cur'); // update current selection

		};

		// Creates the numbered navigation links
		base.buildNavigation = function() {
			if (o.buildNavigation && (base.pages > 1)) {
				var tmp, klass, $a;
				base.$items.filter(':not(.cloned)').each(function(i) {
					var index = i + 1;
					klass = ((index === 1) ? 'first' : '') + ((index === base.pages) ? 'last' : '');
					$a = $('<a href="#"></a>').addClass('panel' + index).wrap('<li class="' + klass + '" />');
					base.$nav.append($a.parent()); // use $a.parent() so it will add <li> instead of only the <a> to the <ul>

					// If a formatter function is present, use it
					if ($.isFunction(o.navigationFormatter)) {
						tmp = o.navigationFormatter(index, $(this));
						$a.html('<span>' + tmp + '</span>');
						// Add formatting to title attribute if text is hidden
						if (parseInt($a.find('span').css('text-indent'),10) < 0) { $a.addClass(o.tooltipClass).attr('title', tmp); }
					} else {
						$a.html('<span>' + index + '</span>');
					}

					$a.bind(o.clickControls, function(e) {
						if (!base.flag && o.enableNavigation) {
							// prevent running functions twice (once for click, second time for focusin)
							base.flag = true; setTimeout(function(){ base.flag = false; }, 100);
							base.gotoPage(index);
							if (o.hashTags) { base.setHash(index); }
						}
						e.preventDefault();
					});
				});
			}
		};

		// Creates the Forward/Backward buttons
		base.buildNextBackButtons = function() {
			base.$forward = $('<span class="arrow forward"><a href="#"><span>' + o.forwardText + '</span></a></span>');
			base.$back = $('<span class="arrow back"><a href="#"><span>' + o.backText + '</span></a></span>');

			// Bind to the forward and back buttons
			base.$back.bind(o.clickBackArrow, function(e) {
				// prevent running functions twice (once for click, second time for swipe)
				if (o.enableArrows && !base.flag) {
					base.flag = true; setTimeout(function(){ base.flag = false; }, 100);
					base.goBack();
				}
				e.preventDefault();
			});
			base.$forward.bind(o.clickForwardArrow, function(e) {
				// prevent running functions twice (once for click, second time for swipe)
				if (o.enableArrows && !base.flag) {
					base.flag = true; setTimeout(function(){ base.flag = false; }, 100);
					base.goForward();
				}
				e.preventDefault();
			});
			// using tab to get to arrow links will show they have focus (outline is disabled in css)
			base.$back.add(base.$forward).find('a').bind('focusin focusout',function(){
			 $(this).toggleClass('hover');
			});

			// Append elements to page
			base.$forward.appendTo( (o.appendForwardTo !== null && $(o.appendForwardTo).length) ? $(o.appendForwardTo) : base.$wrapper );
			base.$back.appendTo( (o.appendBackTo !== null && $(o.appendBackTo).length) ? $(o.appendBackTo) : base.$wrapper );

			base.$arrowWidth = base.$forward.width(); // assuming the left & right arrows are the same width - used for toggle
		};

		// Creates the Start/Stop button
		base.buildAutoPlay = function(){
			base.$startStop
				.html('<span>' + (base.playing ? o.stopText : o.startText) + '</span>')
				.bind(o.clickSlideshow, function(e) {
					if (o.enableStartStop) {
						base.startStop(!base.playing);
						base.makeActive();
						if (base.playing && !o.autoPlayDelayed) {
							base.goForward(true);
						}
					}
					e.preventDefault();
				})
				// show button has focus while tabbing
				.bind('focusin focusout',function(){
					$(this).toggleClass('hover');
				});
		};

		// Adjust slider dimensions on parent element resize
		base.checkResize = function(stopTimer){
			clearTimeout(base.resizeTimer);
			base.resizeTimer = setTimeout(function(){
				var w = base.$outer.width() - base.outerPad[0],
					h = (base.$outer[0].tagName === "BODY" ? base.$win.height() : base.$outer.height()) - base.outerPad[1];
				// base.width = width of one panel, so multiply by # of panels; outerPad is padding added for arrows.
				if (base.width * o.showMultiple !== w || base.height !== h) {
					base.setDimensions(); // adjust panel sizes
					// make sure page is lined up (use 1 millisecond animation time, because "0||x" ignores zeros)
					base.gotoPage(base.currentPage, base.playing, null, 1);
				}
				if (typeof(stopTimer) === 'undefined'){ base.checkResize(); }
			}, 500);
		};

		// Set panel dimensions to either resize content or adjust panel to content
		base.setDimensions = function(){
			var w, h, c, leftEdge = 0,
				// determine panel width
				pw = (o.showMultiple > 1) ? base.width || base.$window.width()/o.showMultiple : base.$window.width(),
				winw = base.$win.width();
			if (o.expand){
				w = base.$outer.width() - base.outerPad[0];
				base.height = h = base.$outer.height() - base.outerPad[1];
				base.$wrapper.add(base.$window).add(base.$items).css({ width: w, height: h });
				base.width = pw = (o.showMultiple > 1) ? w/o.showMultiple : w;
			}
			base.$items.each(function(i){
				c = $(this).children();
				if (o.resizeContents){
					// resize panel
					w = base.width;
					$(this).css({ width: w, height: base.height });
					if (c.length && c[0].tagName === "EMBED") { c.attr({ width: '100%', height: '100%' }); } // needed for IE7; also c.length > 1 in IE7
					// resize panel contents, if solitary (wrapped content or solitary image)
					if (c.length === 1){
						c.css({ width: '100%', height: '100%' });
					}
				} else {
					// get panel width & height and save it
					w = $(this).width(); // if not defined, it will return the width of the ul parent
					if (c.length === 1 && w >= winw){
						w = (c.width() >= winw) ? pw : c.width(); // get width of solitary child
						c.css('max-width', w);   // set max width for all children
					}
					$(this).css('width', w); // set width of panel
					h = $(this).outerHeight(); // get height after setting width
					$(this).css('height', h);
				}
				base.panelSize[i] = [w,h,leftEdge];
				leftEdge += w;
			});
			// Set total width of slider, Note that this is limited to 32766 by Opera - option removed
			base.$el.css('width', leftEdge);
		};

		// get dimension of multiple panels, as needed
		base.getDim = function(page){
			if (base.pages < 1) { return; } // prevent errors when base.panelSize is empty
			page = (o.infiniteSlides && base.pages > 1) ? page : page - 1;
			var i,
				w = base.panelSize[page][0],
				h = base.panelSize[page][1];
			if (o.showMultiple > 1) {
				for (i=1; i < o.showMultiple; i++) {
					w += base.panelSize[(page + i)%o.showMultiple][0];
					h = Math.max(h, base.panelSize[page + i][1]);
				}
			}
			return [w,h];
		};

		base.goForward = function(autoplay) {
			base.gotoPage(base.currentPage + parseInt(o.changeBy, 10) * (o.playRtl ? -1 : 1), autoplay);
		};

		base.goBack = function(autoplay) {
			base.gotoPage(base.currentPage + parseInt(o.changeBy, 10) * (o.playRtl ? 1 : -1), autoplay);
		};

		base.gotoPage = function(page, autoplay, callback, time) {
			if (autoplay !== true) {
				autoplay = false;
				base.startStop(false);
				base.makeActive();
			}
			if (o.changeBy !== 1){
				if (page < 0) { page += base.pages; }
				if (page > base.pages) { page -= base.pages; }
			}
			if (base.pages <= 1) { return; } // prevents animation
			base.$lastPage = base.$currentPage;
			if (typeof(page) !== "number") {
				page = o.startPanel;
				base.setCurrentPage(page);
			}

			// pause YouTube videos before scrolling or prevent change if playing
			if (autoplay && o.isVideoPlaying(base)) { return; }

			if (page > base.pages + 1 - base.adj) { page = (!o.infiniteSlides && !o.stopAtEnd) ? 1 : base.pages; }
			if (page < base.adj ) { page = (!o.infiniteSlides && !o.stopAtEnd) ? base.pages : 1; }
			base.currentPage = ( page > base.pages ) ? base.pages : ( page < 1 ) ? 1 : base.currentPage;
			base.$currentPage = base.$items.eq(base.currentPage - base.adj);
			base.exactPage = page;
			base.$targetPage = base.$items.eq( (page === 0) ? base.pages - base.adj : (page > base.pages) ? 1 - base.adj : page - base.adj ); 
			base.$el.trigger('slide_init', base);

			base.slideControls(true, false);

			// When autoplay isn't passed, we stop the timer
			if (autoplay !== true) { autoplay = false; }
			// Stop the slider when we reach the last page, if the option stopAtEnd is set to true
			if (!autoplay || (o.stopAtEnd && page === base.pages)) { base.startStop(false); }

			base.$el.trigger('slide_begin', base);

			// resize slider if content size varies
			if (!o.resizeContents) {
				// animating the wrapper resize before the window prevents flickering in Firefox
				var d = base.getDim(page);
				base.$wrapper.filter(':not(:animated)').animate(
					{ width: d[0], height: d[1] },
					{ queue: false, duration: time || o.animationTime, easing: o.easing }
				);
			}

			// Animate Slider
			base.$el.filter(':not(:animated)').animate(
				{ left : -base.panelSize[(o.infiniteSlides && base.pages > 1) ? page : page - 1][2] },
				{ queue: false, duration: time || o.animationTime, easing: o.easing, complete: function(){ base.endAnimation(page, callback); } }
			);
		};

		base.endAnimation = function(page, callback){
			if (page === 0) {
				base.$el.css('left', -base.panelSize[base.pages][2]);
				page = base.pages;
			} else if (page > base.pages) {
				// reset back to start position
				base.$el.css('left', -base.panelSize[1][2]);
				page = 1;
			}
			base.exactPage = page;
			base.setCurrentPage(page, false);
			// Add active panel class
			base.$items.removeClass('activePage').eq(page - base.adj).addClass('activePage');

			if (!base.hovered) { base.slideControls(false); }

			base.$el.trigger('slide_complete', base);
			// callback from external slide control: $('#slider').anythingSlider(4, function(slider){ })
			if (typeof callback === 'function') { callback(base); }

			// Continue slideshow after a delay
			if (o.autoPlayLocked && !base.playing) {
				setTimeout(function(){
					base.startStop(true);
				// subtract out slide delay as the slideshow waits that additional time.
				}, o.resumeDelay - o.delay);
			}
		};

		base.setCurrentPage = function(page, move) {
			if (base.pages < 1 || page === 0) { return; }
			page = parseInt(page, 10);
			if (page > base.pages + 1 - base.adj) { page = base.pages - base.adj; }
			if (page < base.adj ) { page = 1; }

			// Set visual
			if (o.buildNavigation){
				base.$nav
					.find('.cur').removeClass('cur').end()
					.find('a').eq(page - 1).addClass('cur');
			}

			// hide/show arrows based on infinite scroll mode
			if (!o.infiniteSlides && o.stopAtEnd){
				base.$wrapper
					.find('span.forward')[ page === base.pages ? 'addClass' : 'removeClass']('disabled').end()
					.find('span.back')[ page === 1 ? 'addClass' : 'removeClass']('disabled');
				if (page === base.pages && base.playing) { base.startStop(); }
			}

			// Only change left if move does not equal false
			if (!move) {
				var d = base.getDim(page);
				base.$wrapper
					.css({ width: d[0], height: d[1] })
					.add(base.$window).scrollLeft(0); // reset in case tabbing changed this scrollLeft - probably overly redundant
				base.$el.css('left', -base.panelSize[(o.infiniteSlides && base.pages > 1) ? page : page - 1][2] );
			}
			// Update local variable
			base.currentPage = page;
			base.$currentPage = base.$items.removeClass('activePage').eq(page - base.adj).addClass('activePage');

		};

		base.makeActive = function(){
			// Set current slider as active so keyboard navigation works properly
			if (!base.$wrapper.is('.activeSlider')){
				$('.activeSlider').removeClass('activeSlider');
				base.$wrapper.addClass('activeSlider');
			}
		};

		// This method tries to find a hash that matches panel-X
		// If found, it tries to find a matching item
		// If that is found as well, then that item starts visible
		base.gotoHash = function(){
			var n = base.win.location.hash.match(base.regex);
			return (n===null) ? '' : parseInt(n[1],10);
		};

		base.setHash = function(n){
			var s = 'panel' + base.runTimes + '-',
				h = base.win.location.hash;
			if ( typeof h !== 'undefined' ) {
				base.win.location.hash = (h.indexOf(s) > 0) ? h.replace(base.regex, s + n) : h + "&" + s + n;
			}
		};

		// Slide controls (nav and play/stop button up or down)
		base.slideControls = function(toggle){
			var dir = (toggle) ? 'slideDown' : 'slideUp',
				t1 = (toggle) ? 0 : o.animationTime,
				t2 = (toggle) ? o.animationTime: 0,
				op = (toggle) ? 1 : 0,
				sign = (toggle) ? 0 : 1; // 0 = visible, 1 = hidden
			if (o.toggleControls) {
				base.$controls.stop(true,true).delay(t1)[dir](o.animationTime/2).delay(t2); 
			}
			if (o.buildArrows && o.toggleArrows) {
				if (!base.hovered && base.playing) { sign = 1; op = 0; } // don't animate arrows during slideshow
				base.$forward.stop(true,true).delay(t1).animate({ right: sign * base.$arrowWidth, opacity: op }, o.animationTime/2);
				base.$back.stop(true,true).delay(t1).animate({ left: sign * base.$arrowWidth, opacity: op }, o.animationTime/2);
			}
		};

		base.clearTimer = function(paused){
			// Clear the timer only if it is set
			if (base.timer) { 
				base.win.clearInterval(base.timer); 
				if (!paused && base.slideshow) {
					base.$el.trigger('slideshow_stop', base); 
					base.slideshow = false;
				}
			}
		};

		// Handles stopping and playing the slideshow
		// Pass startStop(false) to stop and startStop(true) to play
		base.startStop = function(playing, paused) {
			if (playing !== true) { playing = false; } // Default if not supplied is false

			if (playing && !paused) {
				base.$el.trigger('slideshow_start', base);
				base.slideshow = true;
			}

			// Update variable
			base.playing = playing;

			// Toggle playing and text
			if (o.buildStartStop) {
				base.$startStop.toggleClass('playing', playing).html('<span>' + (playing ? o.stopText : o.startText) + '</span>');
				// add button text to title attribute if it is hidden by text-indent
				if (parseInt(base.$startStop.find('span').css('text-indent'),10) < 0) {
					base.$startStop.addClass(o.tooltipClass).attr('title', playing ? 'Stop' : 'Start');
				}
			}

			// Pause slideshow while video is playing
			if (playing && o.resumeOnVideoEnd){
				base.clearTimer(true); // Just in case this was triggered twice in a row
				base.timer = base.win.setInterval(function() {
					// prevent autoplay if video is playing
					if ( !o.isVideoPlaying(base) ) {
						base.goForward(true);
					}
				}, o.delay);
			} else {
				base.clearTimer();
			}
		};

		// Trigger the initialization
		base.init();
	};

	$.anythingSlider.defaults = {
		// ** Appearance **
		theme               : "default", // Theme name, add the css stylesheet manually
		expand              : false,     // If true, the entire slider will expand to fit the parent element
		resizeContents      : true,      // If true, solitary images/objects in the panel will expand to fit the viewport
		showMultiple        : false,     // Set this value to a number and it will show that many slides at once
		easing              : "swing",   // Anything other than "linear" or "swing" requires the easing plugin or jQuery UI

		buildArrows         : true,      // If true, builds the forwards and backwards buttons
		buildNavigation     : true,      // If true, builds a list of anchor links to link to each panel
		buildStartStop      : true,      // ** If true, builds the start/stop button

		appendForwardTo     : null,      // Append forward arrow to a HTML element (jQuery Object, selector or HTMLNode), if not null
		appendBackTo        : null,      // Append back arrow to a HTML element (jQuery Object, selector or HTMLNode), if not null
		appendControlsTo    : null,      // Append controls (navigation + start-stop) to a HTML element (jQuery Object, selector or HTMLNode), if not null
		appendNavigationTo  : null,      // Append navigation buttons to a HTML element (jQuery Object, selector or HTMLNode), if not null
		appendStartStopTo   : null,      // Append start-stop button to a HTML element (jQuery Object, selector or HTMLNode), if not null

		toggleArrows        : false,     // If true, side navigation arrows will slide out on hovering & hide @ other times
		toggleControls      : false,     // if true, slide in controls (navigation + play/stop button) on hover and slide change, hide @ other times

		startText           : "Start",   // Start button text
		stopText            : "Stop",    // Stop button text
		forwardText         : "&raquo;", // Link text used to move the slider forward (hidden by CSS, replaced with arrow image)
		backText            : "&laquo;", // Link text used to move the slider back (hidden by CSS, replace with arrow image)
		tooltipClass        : "tooltip", // Class added to navigation & start/stop button (text copied to title if it is hidden by a negative text indent)

		// Function
		enableArrows        : true,      // if false, arrows will be visible, but not clickable.
		enableNavigation    : true,      // if false, navigation links will still be visible, but not clickable.
		enableStartStop     : true,      // if false, the play/stop button will still be visible, but not clickable. Previously "enablePlay"
		enableKeyboard      : true,      // if false, keyboard arrow keys will not work for this slider.

		// Navigation
		startPanel          : 1,         // This sets the initial panel
		changeBy            : 1,         // Amount to go forward or back when changing panels.
		hashTags            : true,      // Should links change the hashtag in the URL?
		infiniteSlides      : true,      // if false, the slider will not wrap & not clone any panels
		navigationFormatter : null,      // Details at the top of the file on this use (advanced use)

		// Slideshow options
		autoPlay            : false,     // If true, the slideshow will start running; replaces "startStopped" option
		autoPlayLocked      : false,     // If true, user changing slides will not stop the slideshow
		autoPlayDelayed     : false,     // If true, starting a slideshow will delay advancing slides; if false, the slider will immediately advance to the next slide when slideshow starts
		pauseOnHover        : true,      // If true & the slideshow is active, the slideshow will pause on hover
		stopAtEnd           : false,     // If true & the slideshow is active, the slideshow will stop on the last page. This also stops the rewind effect when infiniteSlides is false.
		playRtl             : false,     // If true, the slideshow will move right-to-left

		// Times
		delay               : 3000,      // How long between slideshow transitions in AutoPlay mode (in milliseconds)
		resumeDelay         : 15000,     // Resume slideshow after user interaction, only if autoplayLocked is true (in milliseconds).
		animationTime       : 600,       // How long the slideshow transition takes (in milliseconds)

		// Callbacks - removed from options to reduce size - they still work

		// Interactivity
		clickForwardArrow   : "click",         // Event used to activate forward arrow functionality (e.g. add jQuery mobile's "swiperight")
		clickBackArrow      : "click",         // Event used to activate back arrow functionality (e.g. add jQuery mobile's "swipeleft")
		clickControls       : "click focusin", // Events used to activate navigation control functionality
		clickSlideshow      : "click",         // Event used to activate slideshow play/stop button

		// Video
		resumeOnVideoEnd    : true,      // If true & the slideshow is active & a supported video is playing, it will pause the autoplay until the video is complete
		addWmodeToObject    : "opaque",  // If your slider has an embedded object, the script will automatically add a wmode parameter with this setting
		isVideoPlaying      : function(base){ return false; } // return true if video is playing or false if not - used by video extension

	};

	$.fn.anythingSlider = function(options, callback) {

		return this.each(function(){
			var page, anySlide = $(this).data('AnythingSlider');

			// initialize the slider but prevent multiple initializations
			if ((typeof(options)).match('object|undefined')){
				if (!anySlide) {
					(new $.anythingSlider(this, options));
				} else {
					anySlide.updateSlider();
				}
			// If options is a number, process as an external link to page #: $(element).anythingSlider(#)
			} else if (/\d/.test(options) && !isNaN(options) && anySlide) {
				page = (typeof(options) === "number") ? options : parseInt($.trim(options),10); // accepts "  2  "
				// ignore out of bound pages
				if ( page >= 1 && page <= anySlide.pages ) {
					anySlide.gotoPage(page, false, callback); // page #, autoplay, one time callback
				}
			}
		});
	};

})(jQuery);

/* AnythingSlider works with works with jQuery 1.4+, but you can uncomment the code below to make it
   work with jQuery 1.3.2. You'll have to manually add the code below to the minified copy if needed */
/*
 // Copied from jQuery 1.4.4 to make AnythingSlider backwards compatible to jQuery 1.3.2
 if (typeof jQuery.fn.delay === 'undefined') {
  jQuery.fn.extend({
   delay: function( time, type ) {
    time = jQuery.fx ? jQuery.fx.speeds[time] || time : time; type = type || "fx";
    return this.queue( type, function() { var elem = this; setTimeout(function() { jQuery.dequeue( elem, type ); }, time ); });
   }
  });
 }
*/