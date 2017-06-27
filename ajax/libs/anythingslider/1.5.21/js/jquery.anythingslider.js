/*
	AnythingSlider v1.5.21

	By Chris Coyier: http://css-tricks.com
	with major improvements by Doug Neiner: http://pixelgraphics.us/
	based on work by Remy Sharp: http://jqueryfordesigners.com/
	and crazy mods by Rob Garrison (aka Mottie): https://github.com/ProLoser/AnythingSlider

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
			base.$controls = $('<div class="anythingControls"></div>').appendTo( (o.appendControlsTo !== null && $(o.appendControlsTo).length) ? $(o.appendControlsTo) : base.$wrapper); // change so this works in jQuery 1.3.2
			base.win = window;
			base.$win = $(base.win);

			base.$nav = $('<ul class="thumbNav" />').appendTo(base.$controls);

			// Set up a few defaults & get details
			base.flag    = false; // event flag to prevent multiple calls (used in control click/focusin)
			base.playing = false; // slideshow state
			base.slideshow = false; // slideshow flag
			base.hovered = false; // actively hovering over the slider
			base.panelSize = [];  // will contain dimensions and left position of each panel
			base.currentPage = o.startPanel = parseInt(o.startPanel,10) || 1; // make sure this isn't a string
			base.adjustLimit = (o.infiniteSlides) ? 0 : 1; // adjust page limits for infinite or limited modes
			base.outerPad = [ base.$wrapper.innerWidth() - base.$wrapper.width(), base.$wrapper.innerHeight() - base.$wrapper.height() ];
			if (o.playRtl) { base.$wrapper.addClass('rtl'); }

			// save some options
			base.original = [ o.autoPlay, o.buildNavigation, o.buildArrows];

			// Expand slider to fit parent
			if (o.expand) {
				base.$outer = base.$wrapper.parent();
				base.$window.css({ width: '100%', height: '100%' }); // needed for Opera
				base.outerDim = [ base.$outer.width(), base.$outer.height() ];
				base.checkResize();
			}

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
			if (o.enableKeyboard) {
				$(document).keyup(function(e){
					// Stop arrow keys from working when focused on form items
					if (base.$wrapper.is('.activeSlider') && !e.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
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
			}

			// Binds events
			triggers = "slideshow_paused slideshow_unpaused slide_init slide_begin slideshow_stop slideshow_start initialized swf_completed".split(" ");
			$.each("onShowPause onShowUnpause onSlideInit onSlideBegin onShowStop onShowStart onInitialized onSWFComplete".split(" "), function(i,o){
				if ($.isFunction(base.options[o])){
					base.$el.bind(triggers[i], base.options[o]);
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

		};

		// called during initialization & to update the slider if a panel is added or deleted
		base.updateSlider = function(){
			// needed for updating the slider
			base.$el.children('.cloned').remove();
			base.$nav.empty();

			base.$items = base.$el.children(); 
			base.pages = base.$items.length;
			o.showMultiple = parseInt(o.showMultiple,10) || 1; // only integers allowed

			if (o.showMultiple > 1) {
				if (o.showMultiple > base.pages) { o.showMultiple = base.pages; }
				base.adjustMultiple = (o.infiniteSlides && base.pages > 1) ? 0 : parseInt(o.showMultiple, 10) - 1;
				base.pages = base.$items.length - base.adjustMultiple;
			}

			// Remove navigation & player if there is only one page
			if (base.pages <= 1) {
				o.autoPlay = false;
				o.buildNavigation = false;
				o.buildArrows = false;
				base.$controls.hide();
				base.$nav.hide();
				if (base.$forward) { base.$forward.add(base.$back).hide(); }
			} else {
				o.autoPlay = base.original[0];
				o.buildNavigation = base.original[1];
				o.buildArrows = base.original[2];
				base.$controls.show();
				base.$nav.show();
				if (base.$forward) { base.$forward.add(base.$back).show(); }

				// Build navigation tabs
				base.buildNavigation();

				// If autoPlay functionality is included, then initialize the settings
				if (o.autoPlay) {
					base.playing = !o.startStopped; // Sets the playing variable to false if startStopped is true
					base.buildAutoPlay();
				}

				// Build forwards/backwards buttons
				if (o.buildArrows) { base.buildNextBackButtons(); }
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
					// disable all <a> in cloned panels to prevent shifting the panels by tabbing
					$(this).find('a,input,textarea,select').attr('disabled', 'disabled');
					$(this).find('[id]').removeAttr('id');
				});
			}

			// We just added two items, time to re-cache the list, then get the dimensions of each panel
			base.$items = base.$el.children().addClass('panel');
			base.setDimensions();

			// Set the dimensions of each panel
			if (o.resizeContents) {
				if (o.width) {
					base.$items.css('width', o.width);
					base.$wrapper.css('width', base.getDim(base.currentPage)[0]);
				}
				if (o.height) { base.$wrapper.add(base.$items).css('height', o.height); }
			} else {
				base.$win.load(function(){ base.setDimensions(); }); // set dimensions after all images load
			}

			if (base.currentPage > base.pages) {
				base.currentPage = base.pages;
			}
			base.setCurrentPage(base.currentPage, false);
			base.$nav.find('a').eq(base.currentPage - 1).addClass('cur'); // update current selection

			base.hasEmb = base.$items.find('embed[src*=youtube]').length; // embedded youtube objects exist in the slider
			base.hasSwfo = (typeof(swfobject) !== 'undefined' && swfobject.hasOwnProperty('embedSWF') && $.isFunction(swfobject.embedSWF)) ? true : false; // is swfobject loaded?

			// Initialize YouTube javascript api, if YouTube video is present
			if (base.hasEmb && base.hasSwfo) {
				base.$items.find('embed[src*=youtube]').each(function(i){
					// Older IE doesn't have an object - just make sure we are wrapping the correct element
					var $tar = ($(this).parent()[0].tagName === "OBJECT") ? $(this).parent() : $(this);
					$tar.wrap('<div id="ytvideo' + i + '"></div>');
					// use SWFObject if it exists, it replaces the wrapper with the object/embed
					swfobject.embedSWF($(this).attr('src') + '&enablejsapi=1&version=3&playerapiid=ytvideo' + i, 'ytvideo' + i,
						$tar.attr('width'), $tar.attr('height'), '10', null, null,
						{ allowScriptAccess: "always", wmode : o.addWmodeToObject, allowfullscreen : true },
						{ 'class' : $tar.attr('class'), 'style' : $tar.attr('style') }, 
						function(){ if (i >= base.hasEmb - 1) { base.$el.trigger('swf_completed', base); } } // swf callback
					);
				});
			}

			// Fix tabbing through the page, but don't include it if multiple slides are showing
			if (o.showMultiple === false) {
				base.$items.find('a').unbind('focus').bind('focus', function(e){
					base.$items.find('.focusedLink').removeClass('focusedLink');
					$(this).addClass('focusedLink');
					var panel = $(this).closest('.panel');
					if (!panel.is('.activePage')) {
						base.gotoPage(base.$items.index(panel));
						e.preventDefault();
					}
				});
			}

		};

		// Creates the numbered navigation links
		base.buildNavigation = function() {
			var tmp, klass, $a;
			if (o.buildNavigation && (base.pages > 1)) {
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
			if (base.$forward) { return; }
			base.$forward = $('<span class="arrow forward"><a href="#"><span>' + o.forwardText + '</span></a></span>');
			base.$back = $('<span class="arrow back"><a href="#"><span>' + o.backText + '</span></a></span>');

			// Bind to the forward and back buttons
			base.$back.bind(o.clickArrows, function(e) {
				base.goBack();
				e.preventDefault();
			});
			base.$forward.bind(o.clickArrows, function(e) {
				base.goForward();
				e.preventDefault();
			});
			// using tab to get to arrow links will show they have focus (outline is disabled in css)
			base.$back.add(base.$forward).find('a').bind('focusin focusout',function(){
			 $(this).toggleClass('hover');
			});

			// Append elements to page
			base.$wrapper.prepend(base.$forward).prepend(base.$back);
			base.$arrowWidth = base.$forward.width();
		};

		// Creates the Start/Stop button
		base.buildAutoPlay = function(){
			if (base.$startStop || base.pages < 2) { return; }
			base.$startStop = $("<a href='#' class='start-stop'></a>").html('<span>' + (base.playing ? o.stopText : o.startText) + '</span>');
			base.$controls.prepend(base.$startStop);
			base.$startStop
				.bind(o.clickSlideshow, function(e) {
					if (o.enablePlay) {
						base.startStop(!base.playing);
						if (base.playing) {
							if (o.playRtl) {
								base.goBack(true);
							} else {
								base.goForward(true);
							}
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

		// Adjust slider dimensions on parent element resize
		base.checkResize = function(stopTimer){
			clearTimeout(base.resizeTimer);
			base.resizeTimer = setTimeout(function(){
				var w = base.$outer.width(), h = (base.$outer[0].tagName === "BODY") ? base.$win.height() : base.$outer.height(), dim = base.outerDim;
				if (dim[0] !== w || dim[1] !== h) {
					base.outerDim = [ w, h ];
					base.setDimensions(); // adjust panel sizes
					// make sure page is lined up (use 1 millisecond animation time, because "0||x" ignores zeros)
					base.gotoPage(base.currentPage, base.playing, null, 1);
				}
				if (typeof(stopTimer) === 'undefined'){ base.checkResize(); }
			}, 500);
		};

		// Set panel dimensions to either resize content or adjust panel to content
		base.setDimensions = function(){
			var w, h, c, cw, dw, leftEdge = 0,
				// showMultiple must have o.width set!!
				bww = (o.showMultiple > 1) ? o.width || base.$window.width()/o.showMultiple : base.$window.width(),
				winw = base.$win.width();
			if (o.expand){
				w = base.$outer.width() - base.outerPad[0];
				h = base.$outer.height() - base.outerPad[1];
				base.$wrapper.add(base.$window).add(base.$items).css({ width: w, height: h });
				bww = (o.showMultiple > 1) ? w/o.showMultiple : w;
			}
			base.$items.each(function(i){
				c = $(this).children('*');
				if (o.resizeContents){
					// get viewport width & height from options (if set), or css
					w = parseInt(o.width,10) || bww;
					h = parseInt(o.height,10) || base.$window.height();
					// resize panel
					$(this).css({ width: w, height: h });
					// resize panel contents, if solitary (wrapped content or solitary image)
					if (c.length === 1){
						c.css({ width: '100%', height: '100%' });
						if (c[0].tagName === "OBJECT") { c.find('embed').andSelf().attr({ width: '100%', height: '100%' }); }
					}
				} else {
					// get panel width & height and save it
					w = $(this).width(); // if not defined, it will return the width of the ul parent
					dw = (w >= winw) ? true : false; // width defined from css?
					if (c.length === 1 && dw){
						cw = (c.width() >= winw) ? bww : c.width(); // get width of solitary child
						$(this).css('width', cw); // set width of panel
						c.css('max-width', cw);   // set max width for all children
						w = cw;
					}
					w = (dw) ? o.width || bww : w;
					$(this).css('width', w);
					h = $(this).outerHeight(); // get height after setting width
					$(this).css('height', h);
				}
				base.panelSize[i] = [w,h,leftEdge];
				leftEdge += w;
			});
			// Set total width of slider, but don't go beyond the set max overall width (limited by Opera)
			base.$el.css('width', (leftEdge < o.maxOverallWidth) ? leftEdge : o.maxOverallWidth);
		};

		// get dimension of multiple panels, as needed
		base.getDim = function(page){
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

		base.gotoPage = function(page, autoplay, callback, time) {
			if (base.pages <= 1) { return; } // prevents animation
			base.$lastPage = base.$currentPage;
			if (typeof(page) !== "number") {
				page = o.startPanel;
				base.setCurrentPage(page);
			}

			// pause YouTube videos before scrolling or prevent change if playing
			if (base.hasEmb && base.checkVideo(base.playing)) { return; }

			if (page > base.pages + 1 - base.adjustLimit) { page = (!o.infiniteSlides && !o.stopAtEnd) ? 1 : base.pages; }
			if (page < base.adjustLimit ) { page = (!o.infiniteSlides && !o.stopAtEnd) ? base.pages : 1; }
			base.currentPage = ( page > base.pages ) ? base.pages : ( page < 1 ) ? 1 : base.currentPage;
			base.$currentPage = base.$items.eq(base.currentPage - base.adjustLimit);
			base.exactPage = page;
			base.$targetPage = base.$items.eq( (page === 0) ? base.pages - base.adjustLimit : (page > base.pages) ? 1 - base.adjustLimit : page - base.adjustLimit ); 
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
			base.$items.removeClass('activePage').eq(page - base.adjustLimit).addClass('activePage');

			if (!base.hovered) { base.slideControls(false); }

			// continue YouTube video if in current panel
			if (base.hasEmb){
				var emb = base.$currentPage.find('object[id*=ytvideo], embed[id*=ytvideo]');
				// player states: unstarted (-1), ended (0), playing (1), paused (2), buffering (3), video cued (5).
				if (emb.length && $.isFunction(emb[0].getPlayerState) && emb[0].getPlayerState() > 0 && emb[0].getPlayerState() !== 5) {
					emb[0].playVideo();
				}
			}

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
			page = parseInt(page, 10);
			if (page > base.pages + 1 - base.adjustLimit) { page = base.pages - base.adjustLimit; }
			if (page < base.adjustLimit ) { page = 1; }

			// Set visual
			if (o.buildNavigation){
				base.$nav.find('.cur').removeClass('cur');
				base.$nav.find('a').eq(page - 1).addClass('cur');
			}

			// hide/show arrows based on infinite scroll mode
			if (!o.infiniteSlides && o.stopAtEnd){
				base.$wrapper.find('span.forward')[ page === base.pages ? 'addClass' : 'removeClass']('disabled');
				base.$wrapper.find('span.back')[ page === 1 ? 'addClass' : 'removeClass']('disabled');
				if (page === base.pages && base.playing) { base.startStop(); }
			}

			// Only change left if move does not equal false
			if (!move) {
				var d = base.getDim(page);
				base.$wrapper.css({ width: d[0], height: d[1] });
				base.$wrapper.scrollLeft(0); // reset in case tabbing changed this scrollLeft
				base.$el.css('left', -base.panelSize[(o.infiniteSlides && base.pages > 1) ? page : page - 1][2] );
			}
			// Update local variable
			base.currentPage = page;
			base.$currentPage = base.$items.eq(page - base.adjustLimit).addClass('activePage');

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
				op = (toggle) ? 1: 0,
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
			if (o.autoPlay) {
				base.$startStop.toggleClass('playing', playing).html('<span>' + (playing ? o.stopText : o.startText) + '</span>');
				// add button text to title attribute if it is hidden by text-indent
				if (parseInt(base.$startStop.find('span').css('text-indent'),10) < 0) {
					base.$startStop.addClass(o.tooltipClass).attr('title', playing ? 'Stop' : 'Start');
				}
			}

			if (playing){
				base.clearTimer(true); // Just in case this was triggered twice in a row
				base.timer = base.win.setInterval(function() {
					// prevent autoplay if video is playing
					if (!(base.hasEmb && base.checkVideo(playing))) {
						if (o.playRtl) {
							base.goBack(true);
						} else {
							base.goForward(true);
						}
					}
				}, o.delay);
			} else {
				base.clearTimer();
			}
		};

		base.checkVideo = function(playing){
			// pause YouTube videos before scrolling?
			var emb, ps, stopAdvance = false;
			base.$items.find('object[id*=ytvideo], embed[id*=ytvideo]').each(function(){ // include embed for IE; if not using SWFObject, old detach/append code needs "object embed" here
				emb = $(this);
				if (emb.length && $.isFunction(emb[0].getPlayerState)) {
					// player states: unstarted (-1), ended (0), playing (1), paused (2), buffering (3), video cued (5).
					ps = emb[0].getPlayerState();
					// if autoplay, video playing, video is in current panel and resume option are true, then don't advance
					if (playing && (ps === 1 || ps > 2) && base.$items.index(emb.closest('.panel')) === base.currentPage && o.resumeOnVideoEnd) {
						stopAdvance = true;
					} else {
						// pause video if not autoplaying (if already initialized)
						if (ps > 0) { emb[0].pauseVideo(); }
					}
				}
			});
			return stopAdvance;
		};

		// Trigger the initialization
		base.init();
	};

	$.anythingSlider.defaults = {
		// Appearance
		width               : null,      // Override the default CSS width
		height              : null,      // Override the default CSS height
		expand              : false,     // If true, the entire slider will expand to fit the parent element
		resizeContents      : true,      // If true, solitary images/objects in the panel will expand to fit the viewport
		showMultiple        : false,     // Set this value to a number and it will show that many slides at once
		tooltipClass        : 'tooltip', // Class added to navigation & start/stop button (text copied to title if it is hidden by a negative text indent)
		theme               : 'default', // Theme name

		// Navigation
		startPanel          : 1,         // This sets the initial panel
		hashTags            : true,      // Should links change the hashtag in the URL?
		infiniteSlides      : true,      // if false, the slider will not wrap
		enableKeyboard      : true,      // if false, keyboard arrow keys will not work for the current panel.
		buildArrows         : true,      // If true, builds the forwards and backwards buttons
		toggleArrows        : false,     // If true, side navigation arrows will slide out on hovering & hide @ other times
		buildNavigation     : true,      // If true, builds a list of anchor links to link to each panel
		enableNavigation    : true,      // if false, navigation links will still be visible, but not clickable.
		toggleControls      : false,     // if true, slide in controls (navigation + play/stop button) on hover and slide change, hide @ other times
		appendControlsTo    : null,      // A HTML element (jQuery Object, selector or HTMLNode) to which the controls will be appended if not null
		navigationFormatter : null,      // Details at the top of the file on this use (advanced use)
		forwardText         : "&raquo;", // Link text used to move the slider forward (hidden by CSS, replaced with arrow image)
		backText            : "&laquo;", // Link text used to move the slider back (hidden by CSS, replace with arrow image)

		// Slideshow options
		enablePlay          : true,      // if false, the play/stop button will still be visible, but not clickable.
		autoPlay            : true,      // This turns off the entire slideshow FUNCTIONALY, not just if it starts running or not
		autoPlayLocked      : false,     // If true, user changing slides will not stop the slideshow
		startStopped        : false,     // If autoPlay is on, this can force it to start stopped
		pauseOnHover        : true,      // If true & the slideshow is active, the slideshow will pause on hover
		resumeOnVideoEnd    : true,      // If true & the slideshow is active & a youtube video is playing, it will pause the autoplay until the video is complete
		stopAtEnd           : false,     // If true & the slideshow is active, the slideshow will stop on the last page. This also stops the rewind effect when infiniteSlides is false.
		playRtl             : false,     // If true, the slideshow will move right-to-left
		startText           : "Start",   // Start button text
		stopText            : "Stop",    // Stop button text
		delay               : 3000,      // How long between slideshow transitions in AutoPlay mode (in milliseconds)
		resumeDelay         : 15000,     // Resume slideshow after user interaction, only if autoplayLocked is true (in milliseconds).
		animationTime       : 600,       // How long the slideshow transition takes (in milliseconds)
		easing              : "swing",   // Anything other than "linear" or "swing" requires the easing plugin

		// Callbacks - removed from options to reduce size - they still work

		// Interactivity
		clickArrows         : "click",         // Event used to activate arrow functionality (e.g. "click" or "mouseenter")
		clickControls       : "click focusin", // Events used to activate navigation control functionality
		clickSlideshow      : "click",         // Event used to activate slideshow play/stop button

		// Misc options
		addWmodeToObject    : "opaque", // If your slider has an embedded object, the script will automatically add a wmode parameter with this setting
		maxOverallWidth     : 32766     // Max width (in pixels) of combined sliders (side-to-side); set to 32766 to prevent problems with Opera
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