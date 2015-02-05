// Fluidbox
// Description: Replicating the seamless lightbox transition effect seen on Medium.com, with some improvements
// Version: 1.4.2
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
			]
		}, opts);

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
			// 2. funcPositionFb()	- used for dynamic positioning of any instance of opened Fluidbox
			// 3. funcCalcAll()		- used to run funcCalc() for every instance of targered Fluidbox thumbnail
			// 5. fbClickhandler()	- universal click handler for all Fluidbox items
			funcCloseFb = function (selector) {
				$(selector + '.fluidbox-opened').trigger('click');
			},
			funcPositionFb = function ($activeFb, customEvent) {
				// Get shorthand for more objects
				var $img    = $activeFb.find('img'),
					$ghost  = $activeFb.find('.fluidbox-ghost'),
					$wrap	= $activeFb.find('.fluidbox-wrap'),
					$data	= $activeFb.data(),
					fHeight = 0,
					fWidth	= 0;
                                $img.data().imgRatio = $data.natWidth/ $data.natHeight;
                                
                                var newHeight, missingRatioNormal, missingRatio;
                                
				// Check natural dimensions
				if(vpRatio > $img.data().imgRatio) {
					if($data.natHeight < $w.height()*settings.viewportFill) {
						fHeight = $data.natHeight;
					} else {
						fHeight = $w.height()*settings.viewportFill;
					}
					$data.imgScale = fHeight/$img.height();                                       
                                        $data.imgScaleY = $data.imgScale;

                                        newHeight = $img.height() * $data.imgScaleY;
                                        missingRatioNormal = newHeight / $data.natHeight;
                                        missingRatio = $data.natWidth * missingRatioNormal / $img.width();   

                                        $data.imgScaleX = missingRatio;
				} else {
					if($data.natWidth < $w.width()*settings.viewportFill) {
						fWidth = $data.natWidth;
					} else {
						fWidth = $w.width()*settings.viewportFill;
					}
					$data.imgScale = fWidth/$img.width();                                      
                                        $data.imgScaleX = $data.imgScale;

                                        var newWidth = $img.width() * $data.imgScaleX;
                                        var missingRatioNormal = newWidth / $data.natWidth;
                                        var missingRatio = $data.natHeight * missingRatioNormal / $img.height();

                                        $data.imgScaleY = missingRatio;
				}	

				// Calculation goes here
				var offsetY = $w.scrollTop()-$img.offset().top+0.5*($img.data('imgHeight')*($img.data('imgScale')-1))+0.5*($w.height()-$img.data('imgHeight')*$img.data('imgScale')),
					offsetX = 0.5*($img.data('imgWidth')*($img.data('imgScale')-1))+0.5*($w.width()-$img.data('imgWidth')*$img.data('imgScale'))-$img.offset().left,
                                        scale = parseInt($data.imgScaleX * 1000) / 1000 + ',' + parseInt($data.imgScaleY * 1000) / 1000;

				// Apply CSS transforms to ghost element
				// For offsetX and Y, we round to one decimal place
				// For scale, we round to three decimal places
				$ghost.css({
					'transform': 'translate('+parseInt(offsetX*10)/10+'px,'+parseInt(offsetY*10)/10+'px) scale('+ scale +')',
					top: $img.offset().top - $wrap.offset().top,
					left: $img.offset().left - $wrap.offset().left
				}).one(customTransitionEnd, function() {
					$activeFb.trigger(customEvent);
				});
			},
			funcCalc = function ($fbItem) {
				// Get viewport ratio
				vpRatio = $w.width() / $w.height();

				// Get image dimensions and aspect ratio
				if($fbItem.hasClass('fluidbox')) {
					var $img	= $fbItem.find('img'),
						$ghost	= $fbItem.find('.fluidbox-ghost'),
						$wrap	= $fbItem.find('.fluidbox-wrap'),
						data	= $img.data();

					function imageProp() {
						// Store image dimensions in jQuery object
						data.imgWidth	= $img.width();
						data.imgHeight	= $img.height();
						data.imgRatio	= $img.width()/$img.height();

						// Resize and position ghost element
						$ghost.css({
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
						$img		= $(this).find('img'),
						$ghost		= $(this).find('.fluidbox-ghost'),
						$wrap   	= $(this).find('.fluidbox-wrap'),
						timer   	= {};

					if($(this).data('fluidbox-state') === 0 || !$(this).data('fluidbox-state')) {
						// State: Closed
						// Action: Open fluidbox

						// Fire custom event: openstart
						$(this).trigger('openstart');

						// Wait for ghost image to be loaded successfully first, then do the rest
						$('<img />', {
							src: $img.attr('src')
						}).load(function () {
							// Preload ghost image
							$('<img />', {
								src: $activeFb.attr('href')
							}).load(function() {
								// Store natural width and heights
								$activeFb
								.data('natWidth', $(this)[0].naturalWidth)
								.data('natHeight', $(this)[0].naturalHeight);

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

								// Set thumbnail image source as background image first, preload later
								$ghost.css({
									'background-image': 'url('+$img.attr('src')+')',
									opacity: 1
								});

								// Hide original image
								$img.css({ opacity: 0 });

								$ghost.css({ 'background-image': 'url('+$activeFb.attr('href')+')' });

								// Position Fluidbox
								funcPositionFb($activeFb, 'openend');
							});
						});

					} else {
						// State: Open
						// Action: Close fluidbox

						// Fire custom event: closestart
						$activeFb.trigger('closestart');

						// Switch state
						$activeFb
						.data('fluidbox-state', 0)
						.removeClass('fluidbox-opened')
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
						$ghost.css({
							'transform': 'translate(0,0) scale(1)',
							opacity: 0,
							top: $img.offset().top - $wrap.offset().top + parseInt($img.css('borderTopWidth')) + parseInt($img.css('paddingTop')),
							left: $img.offset().left - $wrap.offset().left + parseInt($img.css('borderLeftWidth')) + parseInt($img.css('paddingLeft'))
						}).one(customTransitionEnd, function() {
							$activeFb.trigger('closeend');
						});
						$img.css({ opacity: 1 });
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
				if($activeFb.length > 0) funcPositionFb($activeFb, 'resizeend');
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
			if($(this).is('a') && $(this).children().length === 1 && $(this).children().is('img') && $(this).css('display') !== 'none' && $(this).parents().css('display') !=='none') {

				// Define wrap
				var $fbInnerWrap = $('<div />', {
					'class': 'fluidbox-wrap',
					css: {
						'z-index': settings.stackIndex - settings.stackIndexDelta
					}
				});

				// Update count for global Fluidbox instances
				fbCount+=1;

				// Add class
				var $fbItem = $(this);
				$fbItem
				.addClass('fluidbox')
				.attr('id', 'fluidbox-'+fbCount)
				.wrapInner($fbInnerWrap)
				.find('img')
					.css({ opacity: 1 })
					.after('<div class="fluidbox-ghost" />')
					.each(function(){
						var $img = $(this);
						
						if ($img.width() > 0 && $img.height() > 0) {
							// if image is already loaded (from cache)
							funcCalc($fbItem);
							$fbItem.click(fbClickHandler);
						} else {
							// wait for image to load
							$img.load(function(){
								funcCalc($fbItem);
								$fbItem.click(fbClickHandler);
							});
						}
				});

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
								if(trigger.keyCode) {
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