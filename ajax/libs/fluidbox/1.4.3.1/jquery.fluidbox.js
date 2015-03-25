// Fluidbox
// Description: Replicating the seamless lightbox transition effect seen on Medium.com, with some improvements
// Version: 1.4.3
// Author: Terry Mun
// Author URI: http://terrymun.com

// -------------------------------------------------------- //
//  Dependency: Paul Irish's jQuery debounced resize event  //
// -------------------------------------------------------- //
(function($,sr){

	// debouncing function from John Hann
	// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
	var debounce = function (func, threshold, execAsap) {
		var timeout;

		return function debounced () {
			var obj = this, args = arguments;
			function delayed () {
				if (!execAsap)
				func.apply(obj, args);
				timeout = null;
			};

			if (timeout)
				clearTimeout(timeout);
			else if (execAsap)
				func.apply(obj, args);

			timeout = setTimeout(delayed, threshold || 100);
		};
	}
	// smartresize
	jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');


// ---------------------------------------------------------------------------------------------------------------------- //
//  Dependency: David Walsh (http://davidwalsh.name/css-animation-callback)                                               //
//              and                                                                                                       //
//              Jonathan Suh (https://jonsuh.com/blog/detect-the-end-of-css-animations-and-transitions-with-javascript/)  //
// ---------------------------------------------------------------------------------------------------------------------- //
function whichTransitionEvent() {
	var t,
		el = document.createElement("fakeelement");

	var transitions = {
		"transition"      : "transitionend",
		"OTransition"     : "oTransitionEnd",
		"MozTransition"   : "transitionend",
		"WebkitTransition": "webkitTransitionEnd"
	}

	for (t in transitions){
		if (el.style[t] !== undefined){
			return transitions[t];
		}
	}
}
var customTransitionEnd = whichTransitionEvent();

// -----------------------------
//  Fluidbox plugin starts here
// -----------------------------
(function ($) {

	var fbCount = 0;

	$.fn.fluidbox = function (opts) {

		// Default settings
		var settings = $.extend(true, {
			viewportFill: 0.95,
			debounceResize: true,
			stackIndex: 1000,
			stackIndexDelta: 10,
			closeTrigger: [
				{
					selector: '.fluidbox-overlay',
					event: 'click'
				},
				{
					selector: 'document',
					event: 'keyup',
					keyCode: 27
				}
			],
			immediateOpen: false,
			loadingEle: true
		}, opts);

		// Keyboard events
		var keyboardEvents = [
			'keyup',
			'keydown',
			'keypress'
		];

		// Ensure that the stackIndex does not become negative
		if(settings.stackIndex < settings.stackIndexDelta) settings.stackIndexDelta = settings.stackIndex;

		// Dynamically create overlay
		$fbOverlay = $('<div />', {
			'class': 'fluidbox-overlay',
			css: {
				'z-index': settings.stackIndex
			}
		});

		// Declare variables
		var $fb = this,
			$w = $(window),		// Shorthand for $(window)
			vpRatio,

			// Function:
			// 1. funcCloseFb()		- used for closing instances of opened Fluidbox
			// 2. funcPositionFb()	- used for dynamic positioning of any instance of opened Fluidbox
			// 3. funcCalcAll()		- used to run funcCalc() for every instance of targered Fluidbox thumbnail
			// 5. fbClickhandler()	- universal click handler for all Fluidbox items
			funcCloseFb = function (selector) {
				$(selector + '.fluidbox-opened').trigger('click');
			},
			funcPositionFb = function ($activeFb, customEvents) {
				// Get shorthand for more objects
				var $img    = $activeFb.find('img').first(),
					$ghost  = $activeFb.find('.fluidbox-ghost'),
					$loader = $activeFb.find('.fluidbox-loader'),
					$wrap	= $activeFb.find('.fluidbox-wrap'),
					$data	= $activeFb.data(),
					fHeight = 0,
					fWidth	= 0;

				// Calculate aspect ratio				
				$img.data().imgRatio = $data.natWidth/$data.natHeight;

				// Check natural dimensions
				if(vpRatio > $img.data().imgRatio) {

					// Check if linked image is smaller or larger than intended fill
					if($data.natHeight < $w.height()*settings.viewportFill) {
						// If shorter, preserve smaller height
						fHeight = $data.natHeight;
					} else {
						fHeight = $w.height()*settings.viewportFill;
					}

					// Calculate how much to scale along the y-axis
					$data.imgScale = fHeight/$img.height();
					$data.imgScaleY = $data.imgScale;

					// Calcualte how much to scale along the x-axis
					$data.imgScaleX = $data.natWidth*(($img.height()*$data.imgScaleY)/$data.natHeight)/$img.width();

				} else {
					// Check if linked image is smaller or larger than intended fill
					if($data.natWidth < $w.width()*settings.viewportFill) {
						// If narrower, preserve smaller width
						fWidth = $data.natWidth;
					} else {
						fWidth = $w.width()*settings.viewportFill;
					}

					// Calculate how much to scale along the x-axis
					$data.imgScale = fWidth/$img.width();                                      
					$data.imgScaleX = $data.imgScale;

					// Calculate how much to scale along the y-axis
					$data.imgScaleY = $data.natHeight*(($img.width()*$data.imgScaleX)/$data.natWidth)/$img.height();
				}	

				// Magic happens right here... okay, not really. Just really fizzy calculations
				var offsetY = $w.scrollTop()-$img.offset().top+0.5*($img.data('imgHeight')*($img.data('imgScale')-1))+0.5*($w.height()-$img.data('imgHeight')*$img.data('imgScale')),
					offsetX = 0.5*($img.data('imgWidth')*($img.data('imgScale')-1))+0.5*($w.width()-$img.data('imgWidth')*$img.data('imgScale'))-$img.offset().left,
					scale = parseInt($data.imgScaleX * 1000) / 1000 + ',' + parseInt($data.imgScaleY * 1000) / 1000;

				// Apply CSS transforms to ghost element
				// For offsetX and Y:	round to one decimal place
				// For scale: 			round to three decimal places
				$ghost
				.add($loader)
				.css({
					'transform': 'translate('+parseInt(offsetX*10)/10+'px,'+parseInt(offsetY*10)/10+'px) scale('+ scale +')',
					top: $img.offset().top - $wrap.offset().top,
					left: $img.offset().left - $wrap.offset().left
				});
				$ghost.one(customTransitionEnd, function() {
					$.each(customEvents, function(i,customEvent) {
						$activeFb.trigger(customEvent);
					});
				});
			},
			funcCalc = function ($fbItem) {
				// Get viewport ratio
				vpRatio = $w.width() / $w.height();

				// Get image dimensions and aspect ratio
				if($fbItem.hasClass('fluidbox')) {
					var $img	= $fbItem.find('img').first(),
						$ghost	= $fbItem.find('.fluidbox-ghost'),
						$loader = $fbItem.find('.fluidbox-loader'),
						$wrap	= $fbItem.find('.fluidbox-wrap'),
						data	= $img.data();

					function imageProp() {
						// Store image dimensions in jQuery object
						data.imgWidth	= $img.width();
						data.imgHeight	= $img.height();
						data.imgRatio	= $img.width()/$img.height();

						// Resize and position ghost element
						$ghost
						.add($loader)
						.css({
							width: $img.width(),
							height: $img.height(),
							top: $img.offset().top - $wrap.offset().top + parseInt($img.css('borderTopWidth')) + parseInt($img.css('paddingTop')),
							left: $img.offset().left - $wrap.offset().left + parseInt($img.css('borderLeftWidth')) + parseInt($img.css('paddingLeft'))
						});

						// Calculate scale based on orientation
						if(vpRatio > data.imgRatio) {
							data.imgScale = $w.height()*settings.viewportFill/$img.height();
						} else {
							data.imgScale = $w.width()*settings.viewportFill/$img.width();
						}						
					}

					imageProp();					

					// Rerun everything on imageload, to overcome issue in Firefox
					$img.load(imageProp);
				}
			},
			fbClickHandler = function(e) {

				// Check if the fluidbox element does have .fluidbox assigned to it
				if($(this).hasClass('fluidbox')) {

					// Variables
					var $activeFb	= $(this),
						$img		= $(this).find('img').first(),
						$ghost		= $(this).find('.fluidbox-ghost'),
						$loader		= $(this).find('.fluidbox-loader'),
						$wrap   	= $(this).find('.fluidbox-wrap'),
						linkedImg   = encodeURI($activeFb.attr('href')),
						timer   	= {};

					// Functions
					// 1. fbOpen(): called when Fluidbox receives a click event and is ready to open
					// 2. fbClose(): called when Fluidbox receives a click event and is ready to close
					var fbOpen = function() {
							// Fire custom event: openstart
							$activeFb.trigger('openstart');

							// What are we doing here:
							// 1. Append overlay in fluidbox
							// 2. Toggle fluidbox state with data attribute
							// 3. Store original z-index with data attribute (so users can change z-index when they see fit in CSS file)
							// 4. Class toggle
							$activeFb
							.append($fbOverlay)
							.data('fluidbox-state', 1)
							.removeClass('fluidbox-closed')
							.addClass('fluidbox-opened');

							// Force timer to completion
							if(timer['close']) window.clearTimeout(timer['close']);

							// Set timer for opening
							timer['open'] = window.setTimeout(function() {
								// Show overlay
								$('.fluidbox-overlay').css({ opacity: 1 });
							}, 10);

							// Change wrapper z-index, so it is above everything else
							// Decrease all siblings z-index by 1 just in case
							$('.fluidbox-wrap').css({ zIndex: settings.stackIndex - settings.stackIndexDelta - 1 });
							$wrap.css({ 'z-index': settings.stackIndex + settings.stackIndexDelta });
						},
						fbClose = function() {
							// Fire custom event: closestart
							$activeFb.trigger('closestart');

							// Switch state
							$activeFb
							.data('fluidbox-state', 0)
							.removeClass('fluidbox-opened fluidbox-loaded fluidbox-loading')
							.addClass('fluidbox-closed');

							// Set timer for closing
							if(timer['open']) window.clearTimeout(timer['open']);
							timer['close'] = window.setTimeout(function() {
								$('.fluidbox-overlay').remove();
								$wrap.css({ 'z-index': settings.stackIndex - settings.stackIndexDelta });
							}, 10);

							// Hide overlay
							$('.fluidbox-overlay').css({ opacity: 0 });

							// Reverse animation on wrapped elements, and restore stacking order
							// You might want to change this value if your transition timing is longer
							$ghost
							.add($loader)
							.css({
								'transform': 'translate(0,0) scale(1,1)',
								opacity: 0,
								top: $img.offset().top - $wrap.offset().top + parseInt($img.css('borderTopWidth')) + parseInt($img.css('paddingTop')),
								left: $img.offset().left - $wrap.offset().left + parseInt($img.css('borderLeftWidth')) + parseInt($img.css('paddingLeft'))
							});
							$ghost.one(customTransitionEnd, function() {
								$activeFb.trigger('closeend');
							});
							$img.css({ opacity: 1 });
						};

					if($(this).data('fluidbox-state') === 0 || !$(this).data('fluidbox-state')) {
						// State: Closed
						// Action: Open fluidbox

						// Add class to indicate larger image is being loaded
						$activeFb.addClass('fluidbox-loading');

						// Set thumbnail image source as background image first, preload later
						$img.css({ opacity: 0 });
						$ghost.css({
							'background-image': 'url('+$img.attr('src')+')',
							opacity: 1
						});

						// Check if item should be opened immediately
						if(settings.immediateOpen) {
							
							// Store natural width and height of thumbnail
							// We use this to scale preliminarily
							$activeFb
							.data('natWidth', $img[0].naturalWidth)
							.data('natHeight', $img[0].naturalHeight);

							// Open immediately
							fbOpen();

							// Preliminary positioning of Fluidbox based on available image ratio
							funcPositionFb($activeFb, ['openend']);

							// Preload target image
							$('<img />', {
								src: linkedImg
							}).load(function() {
								// When loading is successful
								// 1. Trigger custom event: imageloaddone
								// 2. Remove loading class
								// 3. Add loaded class
								// 4. Store natural width and height
								$activeFb
								.trigger('imageloaddone').trigger('delayedloaddone')
								.removeClass('fluidbox-loading')
								.addClass('fluidbox-loaded')
								.data('natWidth', $(this)[0].naturalWidth)
								.data('natHeight', $(this)[0].naturalHeight);

								// Show linked image
								$ghost.css({
									'background-image': 'url('+linkedImg+')'});

								// Reposition Fluidbox
								funcPositionFb($activeFb, ['delayedreposdone']);

							}).error(function() {
								// If image fails to load, close Fluidbox
								// Trigger custom event: imageloadfail
								$activeFb.trigger('imageloadfail');
								fbClose();
							});
						} else {
							// If wait for ghost image to preload
							// Preload ghost image
							$('<img />', {
								src: linkedImg
							}).load(function() {
								// When loading is successful
								// 1. Trigger custom event: imageloaddone
								// 2. Remove loading class
								// 3. Add loaded class
								// 4. Store natural width and height
								$activeFb
								.trigger('imageloaddone')
								.removeClass('fluidbox-loading')
								.addClass('fluidbox-loaded')
								.data('natWidth', $(this)[0].naturalWidth)
								.data('natHeight', $(this)[0].naturalHeight);

								// Show linked image
								$ghost.css({ 'background-image': 'url('+linkedImg+')' });

								// Open Fluidbox
								fbOpen();

								// Position Fluidbox
								funcPositionFb($activeFb, ['openend']);

							}).error(function() {
								// If image fails to load, close Fluidbox
								// Trigger custom event: imageloadfail
								$activeFb.trigger('imageloadfail');
								fbClose();
							});
						}

					} else {
						// State: Open
						// Action: Close fluidbox
						fbClose();
					}

					e.preventDefault();
				}
			};
			var funcResize = function (selectorChoice) {
				// Recalculate dimensions
				if(!selectorChoice) {
					// Recalcualte ALL Fluidbox instances (fired upon window resize)
					$fb.each(function () {
						funcCalc($(this));
					});
				} else {
					// Recalcualte selected Fluidbox instances
					funcCalc(selectorChoice);
				}

				// Reposition Fluidbox, but only if one is found to be open
				var $activeFb = $('a.fluidbox.fluidbox-opened');
				if($activeFb.length > 0) funcPositionFb($activeFb, ['resizeend']);
			};

		if(settings.debounceResize) {
			$(window).smartresize(function() { funcResize(); });
		} else {
			$(window).resize(function() { funcResize(); });
		}

		// Go through each individual object
		$fb.each(function (i) {
			// Check if Fluidbox:
			// 1. Is an anchor element ,<a>
			// 2. Contains one and ONLY one child
			// 3. The only child is an image element, <img>
			// 4. If the element is hidden
			if($(this).is('a') && $(this).children().length === 1 && $(this).children().is('img') && $(this).css('display') !== 'none' && $(this).parents().css('display') !== 'none') {

				// Define wrap
				var $fbInnerWrap = $('<div />', {
					'class': 'fluidbox-wrap',
					css: {
						'z-index': settings.stackIndex - settings.stackIndexDelta
					}
				});

				// Define loader
				var $fbLoader = $('<div />', {
					'class': 'fluidbox-loader'
				});

				// Update count for global Fluidbox instances
				fbCount+=1;

				// Add class
				var $fbItem = $(this);
				$fbItem
				.addClass('fluidbox fluidbox-closed')
				.attr('id', 'fluidbox-'+fbCount)
				.wrapInner($fbInnerWrap)
				.find('img')
					.first()
					.css({ opacity: 1 })
					.after('<div class="fluidbox-ghost" />')
					.each(function(){
						var $img = $(this);
						
						if ($img.width() > 0 && $img.height() > 0) {
							// If image is already loaded (from cache)
							funcCalc($fbItem);
							$fbItem.click(fbClickHandler);
						} else {
							// Wait for image to load
							$img.load(function(){
								funcCalc($fbItem);
								$fbItem.click(fbClickHandler);

								// Trigger custom event: thumbloaddone
								$fbItem.trigger('thumbloaddone');
							}).error(function() {
								// Trigger custom event: thumbloadfail
								$fbItem.trigger('thumbloadfail');
							});
						}
				});

				// Check of loader is enabled
				if(settings.loadingEle) {
					$fbItem.find('.fluidbox-ghost').after($fbLoader);
				}

				// Custom trigger
				$(this).on('recompute', function() {
					funcResize($(this));
					$(this).trigger('recomputeend');
				});

				// When should we close Fluidbox?
				var selector = '#fluidbox-'+fbCount;
				if(settings.closeTrigger) {
					// Go through array
					$.each(settings.closeTrigger, function (i) {
						var trigger = settings.closeTrigger[i];

						// Attach events
						if(trigger.selector != 'window') {
							// If it is not 'window', we append click handler to $(document) object, allow it to bubble up
							// However, if thes selector is 'document', we use a different .on() syntax
							if(trigger.selector == 'document') {
								if(trigger.keyCode && keyboardEvents.indexOf(trigger.event) > -1 ) {
									$(document).on(trigger.event, function (e) {
										if(e.keyCode == trigger.keyCode) funcCloseFb(selector);
									});
								} else {
									$(document).on(trigger.event, selector, function() {
										funcCloseFb(selector);
									});
								}
							}
						} else {
							// If it is 'window', append click handler to $(window) object
							$w.on(trigger.event, function() {
								funcCloseFb(selector);
							});
						}
					});
				}
			}
		});

		// Return to allow chaining
		return $fb;
	};

})(jQuery);