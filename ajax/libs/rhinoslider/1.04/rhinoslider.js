/**
  * Rhinoslider 1.04
  * http://rhinoslider.com/
  *
  * Copyright 2012: Sebastian Pontow, Rene Maas (http://renemaas.de/)
  * Dual licensed under the MIT or GPL Version 2 licenses.
  * http://rhinoslider.com/license/
  */
(function ($, window, undefined) {

	$.extend($.easing, {
		def: 'out',
		out: function (none, currentTime, startValue, endValue, totalTime) {
			return -endValue * (currentTime /= totalTime) * (currentTime - 2) + startValue;
		},
		kick: function (none, currentTime, startValue, endValue, totalTime) {
			if ((currentTime /= totalTime / 2) < 1) {
				return endValue / 2 * Math.pow(2, 10 * (currentTime - 1)) + startValue;
			}
			return endValue / 2 * (-Math.pow(2, -10 * --currentTime) + 2) + startValue;
		},
		shuffle: function (none, currentTime, startValue, endValue, totalTime) {
			if ((currentTime /= totalTime / 2) < 1) {
				return endValue / 2 * currentTime * currentTime * currentTime * currentTime * currentTime + startValue;
			}
			return endValue / 2 * ((currentTime -= 2) * currentTime * currentTime * currentTime * currentTime + 2) + startValue;
		}
	});

	var rhinoSlider = function (element, opts) {
		var
			settings = $.extend({}, $.fn.rhinoslider.defaults, opts),
			$slider = $(element),
			effects = $.fn.rhinoslider.effects,
			preparations = $.fn.rhinoslider.preparations,
			//internal variables
			vars = {
				isPlaying: false,
				intervalAutoPlay: false,
				active: '',
				next: '',
				container: '',
				items: '',
				buttons: [],
				prefix: 'rhino-',
				playedArray: [],
				playedCounter: 0,
				original: element
			};

		settings.callBeforeInit();

		var
			setUpSettings = function (settings) {
				settings.controlsPrevNext = String(settings.controlsPrevNext) == 'true' ? true : false;
				settings.controlsKeyboard = String(settings.controlsKeyboard) == 'true' ? true : false;
				settings.controlsMousewheel = String(settings.controlsMousewheel) == 'true' ? true : false;
				settings.controlsPlayPause = String(settings.controlsPlayPause) == 'true' ? true : false;
				settings.pauseOnHover = String(settings.pauseOnHover) == 'true' ? true : false;
				settings.animateActive = String(settings.animateActive) == 'true' ? true : false;
				settings.autoPlay = String(settings.autoPlay) == 'true' ? true : false;
				settings.cycled = String(settings.cycled) == 'true' ? true : false;
				settings.showTime = parseInt(settings.showTime, 10);
				settings.effectTime = parseInt(settings.effectTime, 10);
				settings.controlFadeTime = parseInt(settings.controlFadeTime, 10);
				settings.captionsFadeTime = parseInt(settings.captionsFadeTime, 10);
				tmpShiftValue = settings.shiftValue;
				tmpParts = settings.parts;
				settings.shiftValue = [];
				settings.parts = [];
				return settings;
			},
			
			//init function
			init = function ($slider, settings, vars) {
				settings = setUpSettings(settings);
				
				$slider.wrap('<div class="' + vars.prefix + 'container">');
				vars.container = $slider.parent('.' + vars.prefix + 'container');
				vars.isPlaying = settings.autoPlay;

				//the string, which will contain the button-html-code
				var buttons = '';

				//add prev/next-buttons
				if (settings.controlsPrevNext) {
					vars.container.addClass(vars.prefix + 'controls-prev-next');
					buttons = '<a class="' + vars.prefix + 'prev ' + vars.prefix + 'btn">' + settings.prevText + '</a><a class="' + vars.prefix + 'next ' + vars.prefix + 'btn">' + settings.nextText + '</a>';
					vars.container.append(buttons);

					vars.buttons.prev = vars.container.find('.' + vars.prefix + 'prev');
					vars.buttons.next = vars.container.find('.' + vars.prefix + 'next');

					//add functionality to the "prev"-button
					vars.buttons.prev.click(function () {
						prev($slider, settings);

						//stop autoplay, if set
						if (settings.autoPlay) {
							pause();
						}
					});

					//add functionality to the "next"-button
					vars.buttons.next.click(function () {
						next($slider, settings);

						//stop autoplay, if set
						if (settings.autoPlay) {
							pause();
						}
					});
				}

				//add play/pause-button
				if (settings.controlsPlayPause) {
					vars.container.addClass(vars.prefix + 'controls-play-pause');
					buttons = settings.autoPlay ? '<a class="' + vars.prefix + 'toggle ' + vars.prefix + 'pause ' + vars.prefix + 'btn">' + settings.pauseText + '</a>' : '<a class="' + vars.prefix + 'toggle ' + vars.prefix + 'play ' + vars.prefix + 'btn">' + settings.playText + '</a>';
					vars.container.append(buttons);

					vars.buttons.play = vars.container.find('.' + vars.prefix + 'toggle');

					//add functionality
					vars.buttons.play.click(function () {
						//self-explaining
						if (vars.isPlaying === false) {
							play();
						} else {
							pause();
						}
					});
				}
				
				//style
				vars.container.find('.' + vars.prefix + 'btn').css({
					position: 'absolute',
					display: 'block',
					cursor: 'pointer'
				});
				
				//hide/show controls on hover or never
				if (settings.showControls !== 'always') {
					var allControls = vars.container.find('.' + vars.prefix + 'btn');
					allControls.stop(true, true).fadeOut(0);
					if (settings.showControls === 'hover') {
						vars.container.mouseenter(function () {
							allControls.stop(true, true).fadeIn(settings.controlFadeTime);
						}).mouseleave(function () {
							allControls.delay(200).fadeOut(settings.controlFadeTime);
						});
					}
				}
				if(settings.showControls !== 'never'){
					vars.container.addClass(vars.prefix + 'show-controls');
				}
				

				//get content-elements and set css-reset for positioning
				vars.items = $slider.children();
				vars.items.addClass(vars.prefix + 'item');
				vars.items.first().addClass(vars.prefix + 'active');

				//give sliderstyle to container
				var sliderStyles = settings.styles.split(','), style;
				for (i = 0; i < sliderStyles.length; i++) {
					style = $.trim(sliderStyles[i]);
					vars.container.css(style, $slider.css(style));
					$slider.css(style, ' ');
				}
				if(vars.container.css('position') == 'static'){
					vars.container.css('position', 'relative');
				}

				$slider.css({
					top: 'auto',
					left: 'auto',
					position: 'relative'
				});

				//style items
				vars.items.css({
					margin: 0,
					width: $slider.css('width'),
					height: $slider.css('height'),
					position: 'absolute',
					top: 0,
					left: 0,
					zIndex: 0,
					opacity: 0,
					overflow: 'hidden'
				});

				vars.items.each(function (i) {
					$(this).attr('id', vars.prefix + 'item' + i);
				});

				//generate navigation
				if (settings.showBullets !== 'never') {
					vars.container.addClass(vars.prefix + 'show-bullets');
					var navi = '<ol class="' + vars.prefix + 'bullets">';
					vars.items.each(function (i) {
						var $item = $(this);
						var id = vars.prefix + 'item' + i;
						navi = navi + '<li><a id="' + id + '-bullet" class="' + vars.prefix + 'bullet">' + parseInt(i + 1, 10) + '</a></li>';
					});
					navi = navi + '</ol>';
					vars.container.append(navi);

					vars.navigation = vars.container.find('.' + vars.prefix + 'bullets');
					vars.buttons.bullets = vars.navigation.find('.' + vars.prefix + 'bullet');
					vars.buttons.bullets.first().addClass(vars.prefix + 'active-bullet ' + vars.prefix + 'first-bullet');
					vars.buttons.bullets.last().addClass(vars.prefix + 'last-bullet');
					vars.buttons.bullets.click(function () {
						var itemID = $(this).attr('id').replace('-bullet', '');
						var $next = vars.container.find('#' + itemID);
						var curID = parseInt(vars.navigation.find('.' + vars.prefix + 'active-bullet').attr('id').replace('-bullet', '').replace(vars.prefix + 'item', ''), 10);
						var nextID = parseInt(itemID.replace(vars.prefix + 'item', ''), 10);
						if (curID < nextID) {
							next($slider, settings, $next);
						} else if (curID > nextID) {
							prev($slider, settings, $next);
						} else {
							return false;
						}

						//stop autoplay, if set
						if (settings.autoPlay) {
							pause();
						}
					});
				}
				//hide/show bullets on hover or never
				if (settings.showBullets === 'hover') {
					vars.navigation.hide();
					vars.container.mouseenter(function () {
						vars.navigation.stop(true, true).fadeIn(settings.controlFadeTime);
					}).mouseleave(function () {
						vars.navigation.delay(200).fadeOut(settings.controlFadeTime);
					});
				}
				
				//add captions
				if (settings.showCaptions !== 'never') {
					vars.container.addClass(vars.prefix + 'show-captions');
					vars.items.each(function () {
						var $item = $(this);
						if ($item.children('.' + vars.prefix + 'caption').length == 0) {
							if ($item.children('img').length > 0) {
								var title = $.trim($item.children('img:first').attr('title'));
								if(undefined != title || '' == title){
									$item.append('<div class="' + vars.prefix + 'caption">' + title + '</div>');
									$item.children('.' + vars.prefix + 'caption:empty').remove();
								}
							}
						}
					});
					
					if (settings.showCaptions === 'hover') {
						$('.' + vars.prefix + 'caption').hide();
						vars.container.mouseenter(function () {
							vars.active.find('.' + vars.prefix + 'caption').stop(true, true).fadeTo(settings.captionFadeTime, settings.captionsOpacity);
						}).mouseleave(function () {
							vars.active.find('.' + vars.prefix + 'caption').delay(200).fadeOut(settings.captionFadeTime);
						});
					} else if (settings.showCaptions === 'always') {
						$('.' + vars.prefix + 'caption').fadeTo(0, settings.captionsOpacity);
					}
				}
				//remove titles
				vars.items.each(function () {
					$(this).children('img').removeAttr('title');
				});

				//start autoplay if set
				if (settings.autoPlay) {
					vars.intervalAutoPlay = setInterval(function () {
						next($slider, settings);
					}, settings.showTime);
				} else {
					vars.intervalAutoPlay = false;
				}
				//if pause on hover
				if (settings.pauseOnHover) {
					vars.container.addClass(vars.prefix + 'pause-on-hover');
					//play/pause function cannot be used for they trigger the isPlaying variable
					$slider.mouseenter(function () {
						if (vars.isPlaying) {
							clearInterval(vars.intervalAutoPlay);
							if (settings.controlsPlayPause) {
								vars.buttons.play.text(settings.playText).removeClass(vars.prefix + 'pause').addClass(vars.prefix + 'play');
							}
						}
					}).mouseleave(function () {
						if (vars.isPlaying) {
							vars.intervalAutoPlay = setInterval(function () {
								next($slider, settings);
							}, settings.showTime);

							if (settings.controlsPlayPause) {
								vars.buttons.play.text(settings.pauseText).removeClass(vars.prefix + 'play').addClass(vars.prefix + 'pause');
							}
						}
					});
				}

				//catch keyup event and trigger functions if the right key is pressed
				if (settings.controlsKeyboard) {
					vars.container.addClass(vars.prefix + 'controls-keyboard');
					$(document).keyup(function (e) {
						switch (e.keyCode) {
						case 37:
							pause();
							prev($slider, settings);
							break;
						case 39:
							pause();
							next($slider, settings);
							break;
						case 80:
							//self-explaining
							if (vars.isPlaying === false) {
								play();
							} else {
								pause();
							}
							break;
						}
					});
				}

				//catch mousewheel event and trigger prev or next
				if (settings.controlsMousewheel) {
					vars.container.addClass(vars.prefix + 'controls-mousewheel');
					if (!$.isFunction($.fn.mousewheel)) {
						alert('$.fn.mousewheel is not a function. Please check that you have the mousewheel-plugin installed properly.');
					} else {
						$slider.mousewheel(function (e, delta) {
							e.preventDefault();
							if(vars.container.hasClass('inProgress')){
								return false;
							}
							var dir = delta > 0 ? 'up' : 'down';
							if (dir === 'up') {
								pause();
								prev($slider, settings);
							} else {
								pause();
								next($slider, settings);
							}
						});
					}
				}

				vars.active = $slider.find('.' + vars.prefix + 'active');
				vars.active.css({
					zIndex: 1,
					opacity: 1
				});

				//check if slider is non-cycled
				if(!settings.cycled) {
					vars.items.each(function() {
						var $item = $(this);
						if($item.is(':first-child')) {
							$item.addClass(vars.prefix + 'firstItem');
						}
						if($item.is(':last-child')) {
							$item.addClass(vars.prefix + 'lastItem');
						}
					});
					
					if(vars.active.is(':first-child') && settings.controlsPrevNext){
						vars.buttons.prev.addClass('disabled');
					}
					if(vars.active.is(':last-child')){
						if(settings.controlsPrevNext){
							vars.buttons.next.addClass('disabled');
							pause();
						}
						if(settings.autoPlay){
							vars.buttons.play.addClass('disabled');	
						}
					}
				}
				
				if(preparations[settings.effect] == undefined){
					console.log('Preparations for ' + settings.effect + ' not found.');
				}else{
					preparations[settings.effect]($slider, settings, vars);
				}

				//return the init-data to the slide for further use
				$slider.data('slider:vars', vars);

				settings.callBackInit();
			},
			
			//check if item element is first-child
			isFirst = function($item) {
				return $item.is(':first-child');
			},
			
			//check if item element is last-child
			isLast = function($item) {
				return $item.is(':last-child');
			},

			//pause the autoplay and change the bg-image of the button to "play"
			pause = function () {
				var vars = $slider.data('slider:vars');
				clearInterval(vars.intervalAutoPlay);
				vars.isPlaying = false;
				if (settings.controlsPlayPause) {
					vars.buttons.play.text(settings.playText).removeClass(vars.prefix + 'pause').addClass(vars.prefix + 'play');
				}
	
				settings.callBackPause();
			},
		
			//start/resume the autoplay and change the bg-image of the button to "pause"
			play = function () {
				var vars = $slider.data('slider:vars');
				vars.intervalAutoPlay = setInterval(function () {
					next($slider, settings);
				}, settings.showTime);
				vars.isPlaying = true;
				if (settings.controlsPlayPause) {
					vars.buttons.play.text(settings.pauseText).removeClass(vars.prefix + 'play').addClass(vars.prefix + 'pause');
				}
	
				settings.callBackPlay();
			},

			prev = function ($slider, settings, $next) {
				var vars = $slider.data('slider:vars');
				if(!settings.cycled && isFirst(vars.active)){
					return false;
				}
				
				settings.callBeforePrev();
				
				//if some effect is already running, don't stack up another one
				if (vars.container.hasClass('inProgress')) {
					return false;
				}
				vars.container.addClass('inProgress');

				if (!$next) {
					if (settings.randomOrder) {
						var nextID = getRandom(vars);
						vars.next = vars.container.find('#' + nextID);
					} else {
						vars.next = vars.items.first().hasClass(vars.prefix + 'active') ? vars.items.last() : vars.active.prev();
					}
				} else {
					vars.next = $next;
				}

				if (vars.next.hasClass(vars.prefix + 'active')) {
					return false;
				}

				//hide captions
				if (settings.showCaptions !== 'never') {
					$('.' + vars.prefix + 'caption').stop(true, true).fadeOut(settings.captionsFadeTime);
				}
				
				if (settings.showBullets !== 'never' && settings.changeBullets == 'before') {
					vars.navigation.find('.' + vars.prefix + 'active-bullet').removeClass(vars.prefix + 'active-bullet');
					vars.navigation.find('#' + vars.next.attr('id') + '-bullet').addClass(vars.prefix + 'active-bullet');
				}

				setTimeout(function() {
					var params = [];
					params.settings = settings;
					params.animateActive = settings.animateActive;
					params.direction = settings.slidePrevDirection;
	
					if(effects[settings.effect] == undefined){
						console.log('Preparations for ' + settings.effect + ' not found.');
					}else{
						effects[settings.effect]($slider, params, resetElements);
					}
	
					setTimeout(function () {
						if (settings.showBullets !== 'never' && settings.changeBullets == 'after') {
							vars.navigation.find('.' + vars.prefix + 'active-bullet').removeClass(vars.prefix + 'active-bullet');
							vars.navigation.find('#' + vars.next.attr('id') + '-bullet').addClass(vars.prefix + 'active-bullet');
						}
						settings.callBackPrev();
					}, settings.effectTime);
				}, settings.captionsFadeTime);
				
				if (settings.showBullets !== 'never' && settings.changeBullets == 'after') {
					vars.navigation.find('.' + vars.prefix + 'active-bullet').removeClass(vars.prefix + 'active-bullet');
					vars.navigation.find('#' + vars.next.attr('id') + '-bullet').addClass(vars.prefix + 'active-bullet');
				}
			},

			next = function ($slider, settings, $next) {
				var vars = $slider.data('slider:vars');
				if(!settings.cycled && isLast(vars.active)){
					return false;
				}
				
				settings.callBeforeNext();
				
				//if some effect is already running, don't stack up another one
				if (vars.container.hasClass('inProgress')) {
					return false;
				}
				vars.container.addClass('inProgress');
				//check, if the active element is the last, so we can set the first element to be the "next"-element
				if (!$next) {
					if (settings.randomOrder) {
						var nextID = getRandom(vars);
						vars.next = vars.container.find('#' + nextID);
					} else {
						vars.next = vars.items.last().hasClass(vars.prefix + 'active') ? vars.items.first() : vars.active.next();
					}
				} else {
					vars.next = $next;
				}

				if (vars.next.hasClass(vars.prefix + 'active')) {
					return false;
				}

				//hide captions
				if (settings.showCaptions !== 'never') {
					$('.' + vars.prefix + 'caption').stop(true, true).fadeOut(settings.captionsFadeTime);
				}
								
				if (settings.showBullets !== 'never' && settings.changeBullets == 'before') {
					vars.navigation.find('.' + vars.prefix + 'active-bullet').removeClass(vars.prefix + 'active-bullet');
					vars.navigation.find('#' + vars.next.attr('id') + '-bullet').addClass(vars.prefix + 'active-bullet');
				}

				setTimeout(function() {
					var params = [];
					params.settings = settings;
					params.animateActive = settings.animateActive;
					params.direction = settings.slideNextDirection;
	
					//run effect
					if(effects[settings.effect] == undefined){
						console.log('Preparations for ' + settings.effect + ' not found.');
					}else{
						effects[settings.effect]($slider, params, resetElements);
					}
	
					setTimeout(function () {
						if (settings.showBullets !== 'never' && settings.changeBullets == 'after') {
							vars.navigation.find('.' + vars.prefix + 'active-bullet').removeClass(vars.prefix + 'active-bullet');
							vars.navigation.find('#' + vars.next.attr('id') + '-bullet').addClass(vars.prefix + 'active-bullet');
						}
						settings.callBackNext();
					}, settings.effectTime);
					
				}, settings.captionsFadeTime);
			},

			//get random itemID
			getRandom = function (vars) {
				var curID = vars.active.attr('id');
				var itemCount = vars.items.length;
				var nextID = vars.prefix + 'item' + parseInt((Math.random() * itemCount), 10);
				var nextKey = nextID.replace(vars.prefix + 'item', '');
				if (vars.playedCounter >= itemCount) {
					vars.playedCounter = 0;
					vars.playedArray = [];
				}
				if (curID == nextID || vars.playedArray[nextKey] === true) {
					return getRandom(vars);
				} else {
					vars.playedArray[nextKey] = true;
					vars.playedCounter++;
					return nextID;
				}
			},

			//function to reset elements and style after an effect
			resetElements = function ($slider, settings) {
				var vars = $slider.data('slider:vars');
				//set the active-element on the same z-index as the rest and reset css
				vars.next
					//add the active-class
					.addClass(vars.prefix + 'active')
					//and put  it above the others
					.css({
						zIndex: 1,
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						margin: 0,
						opacity: 1
					});
				vars.active
					.css({
						zIndex: 0,
						top: 0,
						left: 0,
						margin: 0,
						opacity: 0
					})
					//and remove its active class
					.removeClass(vars.prefix + 'active');
					
				settings.additionalResets();
				
				//check if cycled is false and start or end is reached
				if(!settings.cycled) {
					if(settings.controlsPrevNext){
						if(isFirst(vars.next)) {
							vars.buttons.prev.addClass('disabled');
						} else {
							vars.buttons.prev.removeClass('disabled');
						}
						if(isLast(vars.next)) {
							vars.buttons.next.addClass('disabled');
							pause();
						} else {
							vars.buttons.next.removeClass('disabled');
						}
					}
					if(settings.controlsPlayPause){
						if(isLast(vars.next)) {
							vars.buttons.play.addClass('disabled');
							pause();
						} else {
							vars.buttons.play.removeClass('disabled');
						}
					}
				}

				//make the "next"-element the new active-element
				vars.active = vars.next;

				//show captions
				if (settings.showCaptions !== 'never') {
					vars.active.find('.' + vars.prefix + 'caption').stop(true, true).fadeTo(settings.captionsFadeTime, settings.captionsOpacity);
				}
				
				vars.container.removeClass('inProgress');
			};

		this.pause = function () {pause();};
		this.play = function () {play();};
		this.prev = function ($next) {prev($slider, settings, $next);};
		this.next = function ($next) {next($slider, settings, $next);};
		this.uninit = function () {
			pause();
			vars.container.before($(element).data('slider:original'));
			$slider.data('slider:vars', null);
			vars.container.remove();
			$(element).data('rhinoslider', null);
		};

		init($slider, settings, vars);
	};

	$.fn.rhinoslider = function (opts) {
		return this.each(function () {
			var element = $(this);
			if (element.data('rhinoslider')) {
				return element.data('rhinoslider');
			}
			
			element.data('slider:original', element.clone());
			var rhinoslider = new rhinoSlider(this, opts);
			element.data('rhinoslider', rhinoslider);
        });
	};

	$.fn.rhinoslider.defaults = {
		//which effect to blend content
		effect: 'slide',
		//easing for animations of the slides
		easing: 'swing',
		//linear or shuffled order for items
		randomOrder: false,
		//enable/disable mousewheel navigation
		controlsMousewheel: true,
		//enable/disable keyboard navigation
		controlsKeyboard: true,
		//show/hide prev/next-controls
		controlsPrevNext: true,
		//show/hide play/pause-controls
		controlsPlayPause: true,
		//pause on mouse-over
		pauseOnHover: true,
		//if the active content should be animated too - depending on effect slide
		animateActive: true,
		//start slideshow automatically on init
		autoPlay: false,
		//begin from start if end has reached
		cycled: true,
		//time, the content is visible before next content will be blend in - depends on autoPlay
		showTime: 3000,
		//time, the effect will last
		effectTime: 1000,
		//duration for fading controls
		controlFadeTime: 650,
		//duration for fading captions
		captionsFadeTime: 250,
		//opacity for captions
		captionsOpacity: 0.7,
		//delay for parts in "chewyBars" effect
		partDelay: 100,
		//width, the animation for moving the content needs, can be comma-seperated string (x,y) or int if both are the same
		shiftValue: '150',
		//amount of parts per line for shuffle effect
		parts: '5,3',
		//show image-title: hover, always, never
		showCaptions: 'never',
		//show navigation: hover, always, never
		showBullets: 'hover',
		//change bullets before or after the animation
		changeBullets: 'after',
		//show controls: hover, always, never
		showControls: 'hover',
		//the direction, the prev-button triggers - depending on effect slide
		slidePrevDirection: 'toLeft',
		//the direction, the next-button triggers - depending on effect slide
		slideNextDirection: 'toRight',
		//text for the prev-button
		prevText: 'prev',
		//text for the next-button
		nextText: 'next',
		//text for the play-button
		playText: 'play',
		//text for the pause-button
		pauseText: 'pause',
		//style which will be transfered to the containerelement
		styles: 'position,top,right,bottom,left,margin-top,margin-right,margin-bottom,margin-left,width,height',
		//callbacks
		//the function, which is started bofore anything is done by this script
		callBeforeInit: function () {
			return false;
		},
		//the function, which is started when the slider is ready (only once)
		callBackInit: function () {
			return false;
		},
		//the function, which is started before the blending-effect
		callBeforeNext: function () {
			return false;
		},
		//the function, which is started before the blending-effect
		callBeforePrev: function () {
			return false;
		},
		//the function, which is started after the blending-effect
		callBackNext: function () {
			return false;
		},
		//the function, which is started after the blending-effect
		callBackPrev: function () {
			return false;
		},
		//the function, which is started if the autoplay intervall starts
		callBackPlay: function () {
			return false;
		},
		//the function, which is started if the autoplay intervall ends
		callBackPause: function () {
			return false;
		},
		//the function, which is started within resetElements
		additionalResets: function () {
			return false;
		}
	};

	$.fn.rhinoslider.effects = {
		none: function ($slider, params, callback) {
			var vars = $slider.data('slider:vars');
			var settings = params.settings;
			//set next on top of the others and hide it
			vars.next.css({
				zIndex: 2,
				display: 'block'
			});
			vars.active.hide(0, function () {
				callback($slider, settings);
			});
		},
		//options: easing, animateActive
		fade: function ($slider, params, callback) {
			var vars = $slider.data('slider:vars');
			var settings = params.settings;
			if(settings.animateActive){
				vars.active.animate({
					opacity: 0
				}, settings.effectTime);
			}
			//set next on top of the others and hide it
			vars.next.css({
				zIndex: 2
			})
			//then fade it in - fade with animate-> fade didnt do it...
			.animate({
				opacity: 1
			}, settings.effectTime, settings.easing, function () {
				//and reset the rest
				callback($slider, settings);
			});
		},
		//options: direction, animateActive, easing
		slide: function ($slider, params, callback) {
			var vars = $slider.data('slider:vars');
			var settings = params.settings;
			var direction = params.direction;
			var values = [];
			values.width = vars.container.width();
			values.height = vars.container.height();
			//if showtime is 0, content is sliding permanently so linear is the way to go
			values.easing = settings.showTime === 0 ? 'linear' : settings.easing;
			values.nextEasing = settings.showTime === 0 ? 'linear' : settings.easing;
			$slider.css('overflow', 'hidden');

			//check, in which direction the content will be moved
			switch (direction) {
				case 'toTop':
					values.top = -values.height;
					values.left = 0;
					values.nextTop = -values.top;
					values.nextLeft = 0;
					break;
				case 'toBottom':
					values.top = values.height;
					values.left = 0;
					values.nextTop = -values.top;
					values.nextLeft = 0;
					break;
				case 'toRight':
					values.top = 0;
					values.left = values.width;
					values.nextTop = 0;
					values.nextLeft = -values.left;
					break;
				case 'toLeft':
					values.top = 0;
					values.left = -values.width;
					values.nextTop = 0;
					values.nextLeft = -values.left;
					break;
			}

			//put the "next"-element on top of the others and show/hide it, depending on the effect
			vars.next.css({
				zIndex: 2,
				opacity: 1
			});

			//if animateActive is false, the active-element will not move
			if (settings.animateActive) {
				vars.active.css({
					top: 0,
					left: 0
				}).animate({
					top: values.top,
					left: values.left,
					opacity: 1
				}, settings.effectTime, values.easing);
			}
			vars.next
			//position "next"-element depending on the direction
			.css({
				top: values.nextTop,
				left: values.nextLeft
			}).animate({
				top: 0,
				left: 0,
				opacity: 1
			}, settings.effectTime, values.nextEasing, function () {
				//reset element-positions
				callback($slider, settings);
			});
		},
		//options: direction, animateActive, shiftValue
		kick: function ($slider, params, callback) {
			var vars = $slider.data('slider:vars');
			var settings = params.settings;
			var direction = params.direction;
			var values = [];

			values.delay = settings.effectTime / 2;
			values.activeEffectTime = settings.effectTime / 2;
			settings.shiftValue.x = settings.shiftValue.x < 0 ? settings.shiftValue.x * -1 : settings.shiftValue.x;


			//check, in which direction the content will be moved
			switch (direction) {
				case 'toTop':
					values.top = -settings.shiftValue.x;
					values.left = 0;
					values.nextTop = settings.shiftValue.x;
					values.nextLeft = 0;
					break;
				case 'toBottom':
					values.top = settings.shiftValue.x;
					values.left = 0;
					values.nextTop = -settings.shiftValue.x;
					values.nextLeft = 0;
					break;
				case 'toRight':
					values.top = 0;
					values.left = settings.shiftValue.x;
					values.nextTop = 0;
					values.nextLeft = -settings.shiftValue.x;
					break;
				case 'toLeft':
					values.top = 0;
					values.left = -settings.shiftValue.x;
					values.nextTop = 0;
					values.nextLeft = settings.shiftValue.x;
					break;
			}

			//put the "next"-element on top of the others and show/hide it, depending on the effect
			vars.next.css({
				zIndex: 2,
				opacity: 0
			});

			vars.active.css({
				top: 0,
				left: 0
			});
			if (settings.animateActive) {
				//delay is for kick, so it seems as if the "next"-element kicks the activ-element away
				vars.active.delay(values.delay).animate({
					top: values.top,
					left: values.left,
					opacity: 0
				}, values.activeEffectTime, 'out'); //easing is variable because kick seems more "realistic" if it's not too linear
			}

			vars.next
			//position "next"-element depending on the direction
			.css({
				top: values.nextTop,
				left: values.nextLeft
			}).animate({
				top: 0,
				left: 0,
				opacity: 1
			}, settings.effectTime, 'kick', function () {
				//reset element-positions
				callback($slider, settings);
			});
		},
		//options: direction, animateActive, easing, shiftValue
		transfer: function ($slider, params, callback) {
			var settings = params.settings;
			var direction = params.direction;
			var vars = $slider.data('slider:vars');
			var values = [];
			values.width = $slider.width();
			values.height = $slider.height();
			
			//set values for effect
			switch (direction) {
				case 'toTop':
					values.top = -settings.shiftValue.y;
					values.left = values.width / 2;
					values.nextTop = values.height + settings.shiftValue.y;
					values.nextLeft = values.width / 2;
					break;
				case 'toBottom':
					values.top = values.height + settings.shiftValue.y;
					values.left = values.width / 2;
					values.nextTop = -settings.shiftValue.y;
					values.nextLeft = values.width / 2;
					break;
				case 'toRight':
					values.top = values.height / 2;
					values.left = values.width + settings.shiftValue.x;
					values.nextTop = values.height / 2;
					values.nextLeft = -settings.shiftValue.x;
					break;
				case 'toLeft':
					values.top = values.height / 2;
					values.left = -settings.shiftValue.x;
					values.nextTop = values.height / 2;
					values.nextLeft = values.width + settings.shiftValue.x;
					break;
			}
			vars.next.children().wrapAll('<div id="' + vars.prefix + 'nextContainer" class="' + vars.prefix + 'tmpContainer"></div>');
			vars.active.children().wrapAll('<div id="' + vars.prefix + 'activeContainer" class="' + vars.prefix + 'tmpContainer"></div>');
			var
				$nextContainer = vars.next.find('#' + vars.prefix + 'nextContainer'),
				$activeContainer = vars.active.find('#' + vars.prefix + 'activeContainer'),
				$tmpContainer = vars.container.find('.' + vars.prefix + 'tmpContainer');

			$activeContainer.css({
				width: values.width,
				height: values.height,
				position: 'absolute',
				top: '50%',
				left: '50%',
				margin: '-' + parseInt(values.height * 0.5, 10) + 'px 0 0 -' + parseInt(values.width * 0.5, 10) + 'px'
			});
				
			$nextContainer.css({
				width: values.width,
				height: values.height,
				position: 'absolute',
				top: '50%',
				left: '50%',
				margin: '-' + parseInt(values.height * 0.5, 10) + 'px 0 0 -' + parseInt(values.width * 0.5, 10) + 'px'
			});
			
			if(settings.animateActive){
				
				vars.active.css({
					width: '100%',
					height: '100%',
					top: 0,
					left: 0
				}).animate({
					width: 0,
					height: 0,
					top: values.top,
					left: values.left,
					opacity: 0
				}, settings.effectTime);
			}

			vars.next.css({
				opacity: 0,
				zIndex: 2,
				width: 0,
				height: 0,
				top: values.nextTop,
				left: values.nextLeft
			}).animate({
				width: '100%',
				height: '100%',
				top: 0,
				left: 0,
				opacity: 1
			}, settings.effectTime, settings.easing, function () {
				$tmpContainer.children().unwrap();
				callback($slider, settings);
			});

		},
		//options: animateActive, easing, shiftValue, parts
		shuffle: function ($slider, params, callback) {
			var
			vars = $slider.data('slider:vars'),
				settings = params.settings,
				values = [],
				preShuffle = function ($slider, settings, $li) {
					var vars = $slider.data('slider:vars');
					$li.html('<div class="' + vars.prefix + 'partContainer">' + $li.html() + '</div>');

					var part = $li.html();
					var width = $slider.width();
					var height = $slider.height();
					for (i = 1; i < (settings.parts.x * settings.parts.y); i++) {
						$li.html($li.html() + part);
					}
					var $parts = $li.children('.' + vars.prefix + 'partContainer');
					var partValues = [];
					partValues.width = $li.width() / settings.parts.x;
					partValues.height = $li.height() / settings.parts.y;
					$parts.each(function (i) {
						var $this = $(this);
						partValues.top = ((i - (i % settings.parts.x)) / settings.parts.x) * partValues.height;
						partValues.left = (i % settings.parts.x) * partValues.width;
						partValues.marginTop = -partValues.top;
						partValues.marginLeft = -partValues.left;
						$this.css({
							top: partValues.top,
							left: partValues.left,
							width: partValues.width,
							height: partValues.height,
							position: 'absolute',
							overflow: 'hidden'
						}).html('<div class="' + vars.prefix + 'part">' + $this.html() + '</div>');
						$this.children('.' + vars.prefix + 'part').css({
							marginTop: partValues.marginTop,
							marginLeft: partValues.marginLeft,
							width: width,
							height: height,
							background: $li.css('background-image') + ' ' + $li.parent().css('background-color')
						});
					});
					return $parts;
				},
				//calc amount of parts
				calcParts = function (parts, c) {
					if (parts.x * parts.y > 36) {
						if (c) {
							if (parts.x > 1) {
								parts.x--;
							} else {
								parts.y--;
							}
							c = false;
						} else {
							if (parts.y > 1) {
								parts.y--;
							} else {
								parts.x--;
							}
							c = true;
						}
						return calcParts(parts, c);
					}
					return parts;
				},
				//effect "shuffle"
				shuffle = function ($slider, settings) {
					settings.parts.x = settings.parts.x < 1 ? 1 : settings.parts.x;
					settings.parts.y = settings.parts.y < 1 ? 1 : settings.parts.y;
					settings.parts = calcParts(settings.parts, true);
					settings.shiftValue.x = settings.shiftValue.x < 0 ? settings.shiftValue.x * -1 : settings.shiftValue.x;
					settings.shiftValue.y = settings.shiftValue.y < 0 ? settings.shiftValue.y * -1 : settings.shiftValue.y;
					var vars = $slider.data('slider:vars');
					var activeContent = vars.active.html();
					var nextContent = vars.next.html();
					var width = $slider.width();
					var height = $slider.height();
					var $activeParts = preShuffle($slider, settings, vars.active);
					var $nextParts = preShuffle($slider, settings, vars.next);
					var activeBackgroundImage = vars.active.css('background-image');
					var activeBackgroundColor = vars.active.css('background-color');
					var nextBackgroundImage = vars.next.css('background-image');
					var nextBackgroundColor = vars.next.css('background-color');
					vars.active.css({
						backgroundImage: 'none',
						backgroundColor: 'none',
						opacity: 1
					});
					vars.next.css({
						backgroundImage: 'none',
						backgroundColor: 'none',
						opacity: 1,
						zIndex: 2
					});
					var partValues = [];
					partValues.width = vars.next.width() / settings.parts.x;
					partValues.height = vars.next.height() / settings.parts.y;
					if (settings.animateActive) {
						$activeParts.each(function (i) {
							$this = $(this);
							var newLeft, newTop;
							newLeft = (Math.random() * (settings.shiftValue.x * 2) - settings.shiftValue.x);
							newTop = (Math.random() * (settings.shiftValue.y * 2) - settings.shiftValue.y);
							$this.animate({
								opacity: 0,
								top: '+=' + newTop,
								left: '+=' + newLeft
							}, settings.effectTime, settings.easing);
						});
					}
					$nextParts.each(function (i) {
						$this = $(this);
						partValues.top = ((i - (i % settings.parts.x)) / settings.parts.x) * partValues.height;
						partValues.left = (i % settings.parts.x) * partValues.width;
						var newLeft, newTop;
						newLeft = partValues.left + (Math.random() * (settings.shiftValue.x * 2) - settings.shiftValue.x);
						newTop = partValues.top + (Math.random() * (settings.shiftValue.y * 2) - settings.shiftValue.y);

						$this.css({
							top: newTop,
							left: newLeft,
							opacity: 0
						}).animate({
							top: partValues.top,
							left: partValues.left,
							opacity: 1
						}, settings.effectTime, settings.easing, function () {
							if (i == $activeParts.length - 1) {
								vars.active.html(activeContent);
								vars.next.html(nextContent);
								vars.active.css({
									backgroundImage: activeBackgroundImage,
									backgroundColor: activeBackgroundColor,
									opacity: 0
								});
								vars.next.css({
									backgroundImage: nextBackgroundImage,
									backgroundColor: nextBackgroundColor,
									opacity: 1
								});
								callback($slider, settings);
							}
						});
					});
				}

			shuffle($slider, settings);
		},
		//options: animateActive, easing, shiftValue, parts
		explode: function ($slider, params, callback) {
			var
			vars = $slider.data('slider:vars'),
				settings = params.settings,
				values = [],
				preShuffle = function ($slider, settings, $li) {
					var vars = $slider.data('slider:vars');
					$li.html('<div class="' + vars.prefix + 'partContainer">' + $li.html() + '</div>');
					var part = $li.html();
					var width = $slider.width();
					var height = $slider.height();
					for (i = 1; i < (settings.parts.x * settings.parts.y); i++) {
						$li.html($li.html() + part);
					}
					var $parts = $li.children('.' + vars.prefix + 'partContainer');
					var partValues = [];
					partValues.width = $li.width() / settings.parts.x;
					partValues.height = $li.height() / settings.parts.y;
					$parts.each(function (i) {
						var $this = $(this);
						partValues.top = ((i - (i % settings.parts.x)) / settings.parts.x) * partValues.height;
						partValues.left = (i % settings.parts.x) * partValues.width;
						partValues.marginTop = -partValues.top;
						partValues.marginLeft = -partValues.left;
						$this.css({
							top: partValues.top,
							left: partValues.left,
							width: partValues.width,
							height: partValues.height,
							position: 'absolute',
							overflow: 'hidden'
						}).html('<div class="' + vars.prefix + 'part">' + $this.html() + '</div>');
						$this.children('.' + vars.prefix + 'part').css({
							marginTop: partValues.marginTop,
							marginLeft: partValues.marginLeft,
							width: width,
							height: height,
							background: $li.css('background-image') + ' ' + $li.parent().css('background-color')
						});
					});
					return $parts;
				},
				//calc amount of parts
				calcParts = function (parts, c) {
					if (parts.x * parts.y > 36) {
						if (c) {
							if (parts.x > 1) {
								parts.x--;
							} else {
								parts.y--;
							}
							c = false;
						} else {
							if (parts.y > 1) {
								parts.y--;
							} else {
								parts.x--;
							}
							c = true;
						}
						return calcParts(parts, c);
					}
					return parts;
				},
				//effect "shuffle"
				explode = function ($slider, settings) {
					settings.parts.x = settings.parts.x < 1 ? 1 : settings.parts.x;
					settings.parts.y = settings.parts.y < 1 ? 1 : settings.parts.y;
					settings.parts = calcParts(settings.parts, true);
					settings.shiftValue.x = settings.shiftValue.x < 0 ? settings.shiftValue.x * -1 : settings.shiftValue.x;
					settings.shiftValue.y = settings.shiftValue.y < 0 ? settings.shiftValue.y * -1 : settings.shiftValue.y;
					var vars = $slider.data('slider:vars');
					var activeContent = vars.active.html();
					var nextContent = vars.next.html();
					var width = $slider.width();
					var height = $slider.height();
					var $activeParts = preShuffle($slider, settings, vars.active);
					var $nextParts = preShuffle($slider, settings, vars.next);
					var activeBackgroundImage = vars.active.css('background-image');
					var activeBackgroundColor = vars.active.css('background-color');
					var nextBackgroundImage = vars.next.css('background-image');
					var nextBackgroundColor = vars.next.css('background-color');
					vars.active.css({
						backgroundImage: 'none',
						backgroundColor: 'none',
						opacity: 1
					});
					vars.next.css({
						backgroundImage: 'none',
						backgroundColor: 'none',
						opacity: 1,
						zIndex: 2
					});
					var partValues = [];
					partValues.width = vars.next.width() / settings.parts.x;
					partValues.height = vars.next.height() / settings.parts.y;
					if (settings.animateActive) {
						$activeParts.each(function (i) {
							$this = $(this);
							var newLeft, newTop;
							var position = [];
							position.top = $this.position().top;
							position.bottom = $this.parent().height() - $this.position().top - $this.height();
							position.left = $this.position().left;
							position.right = $this.parent().width() - $this.position().left - $this.width();

							var rndX = parseInt(Math.random() * settings.shiftValue.x, 10);
							var rndY = parseInt(Math.random() * settings.shiftValue.y, 10);
							newLeft = position.right <= position.left ? (position.right == position.left ? rndX / 2 : rndX) : -rndX;
							newTop = position.bottom <= position.top ? (position.top == (position.bottom - 1) ? rndY / 2 : rndY) : -rndY;
							$this.animate({
								top: '+=' + newTop,
								left: '+=' + newLeft,
								opacity: 0
							}, settings.effectTime, settings.easing);
						});
					}
					$nextParts.each(function (i) {
						$this = $(this);
						partValues.top = ((i - (i % settings.parts.x)) / settings.parts.x) * partValues.height;
						partValues.left = (i % settings.parts.x) * partValues.width;
						var newLeft, newTop, position = [];
						
						position.top = $this.position().top;
						position.bottom = $this.parent().height() - $this.position().top - $this.height();
						position.left = $this.position().left;
						position.right = $this.parent().width() - $this.position().left - $this.width();

						var rndX = parseInt(Math.random() * settings.shiftValue.x, 10);
						var rndY = parseInt(Math.random() * settings.shiftValue.y, 10);
						newLeft = position.right <= position.left ? (position.right == position.left ? rndX / 2 : rndX) : -rndX;
						newTop = position.bottom <= position.top ? (position.top == (position.bottom - 1) ? rndY / 2 : rndY) : -rndY;
						newLeft = partValues.left + newLeft;
						newTop = partValues.top + newTop;


						$this.css({
							top: newTop,
							left: newLeft,
							opacity: 0
						}).animate({
							top: partValues.top,
							left: partValues.left,
							opacity: 1
						}, settings.effectTime, settings.easing, function () {
							if (i == $activeParts.length - 1) {
								vars.active.html(activeContent);
								vars.next.html(nextContent);
								vars.active.css({
									backgroundImage: activeBackgroundImage,
									backgroundColor: activeBackgroundColor,
									opacity: 0
								});
								vars.next.css({
									backgroundImage: nextBackgroundImage,
									backgroundColor: nextBackgroundColor,
									opacity: 1
								});
								callback($slider, settings);
							}
						});
					});
				}

			explode($slider, settings);
		},
		//options: direction, animateActive, easing
		turnOver: function ($slider, params, callback) {
			var
				vars = $slider.data('slider:vars'),
				settings = params.settings,
				direction = params.direction,
				values = []
			;
			values.width = vars.container.width();
			values.height = vars.container.height();
			
			
			
			//check, in which direction the content will be moved
			switch (direction) {
				case 'toTop':
					values.top = -values.height;
					values.left = 0;
					break;
				case 'toBottom':
					values.top = values.height;
					values.left = 0;
					break;
				case 'toRight':
					values.top = 0;
					values.left = values.width;
					break;
				case 'toLeft':
					values.top = 0;
					values.left = -values.width;
					break;
			}
			//secure that out and in animation don't play simultaneously
			values.timeOut = settings.animateActive ? settings.effectTime : 0;
			values.effectTime = settings.animateActive ? settings.effectTime / 2 : settings.effectTime;

			//put the "next"-element on top of the others and show/hide it, depending on the effect
			vars.next.css({
				zIndex: 2,
				opacity: 1
			});

			//position "next"-element depending on the direction
			vars.next.css({
				top: values.top,
				left: values.left
			});
			//if animateActive is false, the active-element will not move
			if (settings.animateActive) {
				vars.active.css({
					top: 0,
					left: 0
				}).animate({
					top: values.top,
					left: values.left,
					opacity: 1
				}, values.effectTime, settings.easing);
			}
			
			setTimeout(function() {
				vars.next.animate({
					top: 0,
					left: 0,
					opacity: 1
				}, values.effectTime, settings.easing, function () {
					vars.active.css('opacity', 0);
					//reset element-positions
					callback($slider, settings);
				});
			}, values.timeOut);
		},
		//options: direction, animateActive, easing, shiftValue, parts, partDelay
		//animationtime for each part is effectTime - (2 * ((settings.parts - 1) * partDelay))
		chewyBars: function ($slider, params, callback) {
			var
				vars = $slider.data('slider:vars'),
				settings = params.settings,
				direction = params.direction,
				values = [],
				preSlide = function ($slider, settings, $li) {
					var vars = $slider.data('slider:vars');
					$li.html('<div class="' + vars.prefix + 'partContainer">' + $li.html() + '</div>');
					var
						part = $li.html(),
						width = $slider.width(),
						height = $slider.height()
					;
					for (i = 1; i < settings.parts; i++) {
						$li.html($li.html() + part);
					}
					var
						$parts = $li.children('.' + vars.prefix + 'partContainer'),
						partValues = []
					;
					switch(direction){
						case 'toLeft':
							partValues.width = $li.width() / settings.parts;
							partValues.height = height;
							break;
						case 'toTop':
							partValues.width = width;
							partValues.height = $li.height() / settings.parts;
							break;
					}
					
					$parts.each(function (i) {
						var $this = $(this), liWidth = $li.width(), liHeight = $li.height();
						partValues.left = 'auto';
						partValues.marginLeft = 'auto';
						partValues.top = 'auto';
						partValues.marginTop = 'auto';
						partValues.right = 'auto';
						partValues.bottom = 'auto';
						
						switch(direction){
							case 'toLeft':
								partValues.width = liWidth / settings.parts;
								partValues.height = height;
								partValues.left = (i % settings.parts) * partValues.width;
								partValues.marginLeft = -partValues.left;
								partValues.top = 0;
								partValues.marginTop = 0;
								break;
							case 'toRight':
								partValues.width = liWidth / settings.parts;
								partValues.height = height;
								partValues.right = (i % settings.parts) * partValues.width;
								partValues.marginLeft = -(liWidth - partValues.right - partValues.width);
								partValues.top = 0;
								partValues.marginTop = 0;
								break;
							case 'toTop':
								partValues.width = width;
								partValues.height = liHeight / settings.parts;
								partValues.left = 0;
								partValues.marginLeft = 0;
								partValues.top = (i % settings.parts) * partValues.height;
								partValues.marginTop = -partValues.top;
								break;
							case 'toBottom':
								partValues.width = width;
								partValues.height = liHeight / settings.parts;
								partValues.left = 0;
								partValues.marginLeft = 0;
								partValues.bottom = (i % settings.parts) * partValues.height;
								partValues.marginTop = -(liHeight - partValues.bottom - partValues.height);
								break;
						}
						$this.css({
							top: partValues.top,
							left: partValues.left,
							bottom: partValues.bottom,
							right: partValues.right,
							width: partValues.width,
							height: partValues.height,
							position: 'absolute',
							overflow: 'hidden'
						}).html('<div class="' + vars.prefix + 'part">' + $this.html() + '</div>');
						$this.children('.' + vars.prefix + 'part').css({
							marginLeft: partValues.marginLeft,
							marginTop: partValues.marginTop,
							width: width,
							height: height,
							background: $li.css('background-image') + ' ' + $li.parent().css('background-color')
						});
					});
					return $parts;
				},
				//effect "slideBars"
				slideBars = function ($slider, settings) {
					settings.parts = settings.parts < 1 ? 1 : settings.parts;
					settings.shiftValue.x = settings.shiftValue.x < 0 ? settings.shiftValue.x * -1 : settings.shiftValue.x;
					settings.shiftValue.y = settings.shiftValue.y < 0 ? settings.shiftValue.y * -1 : settings.shiftValue.y;
					var vars = $slider.data('slider:vars');
					var
						partDuration,
						partDelay = settings.partDelay,
						activeContent = vars.active.html(),
						nextContent = vars.next.html(),
						width = $slider.width(),
						height = $slider.height(),
						$activeParts = preSlide($slider, settings, vars.active),
						$nextParts = preSlide($slider, settings, vars.next),
						activeBackgroundImage = vars.active.css('background-image'),
						activeBackgroundColor = vars.active.css('background-color'),
						nextBackgroundImage = vars.next.css('background-image'),
						nextBackgroundColor = vars.next.css('background-color'),
						delay = 0
					;
					
					partDuration = settings.effectTime - (2 * ((settings.parts - 1) * partDelay));
					
					vars.active.css({
						backgroundImage: 'none',
						backgroundColor: 'none',
						opacity: 1
					});
					vars.next.css({
						backgroundImage: 'none',
						backgroundColor: 'none',
						opacity: 1,
						zIndex: 2
					});
					var values = [], aniMap = {opacity: 0}, cssMapNext = {opacity: 0};

					switch(direction){
						case 'toTop':
							aniMap.left = -settings.shiftValue.x;
							aniMap.top = -settings.shiftValue.y;
							cssMapNext.left = settings.shiftValue.x;
							cssMapNext.top = height + settings.shiftValue.y;
							values.width = width;
							values.height = vars.next.height() / settings.parts;
							break;
						case 'toRight':
							values.width = vars.next.width() / settings.parts;
							values.height = height;
							aniMap.top = -settings.shiftValue.y;
							aniMap.right = -settings.shiftValue.x;
							cssMapNext.top = settings.shiftValue.y;
							cssMapNext.right = width + settings.shiftValue.x;
							break;
						case 'toBottom':
							values.width = width;
							values.height = vars.next.height() / settings.parts;
							aniMap.left = -settings.shiftValue.x;
							aniMap.bottom = -settings.shiftValue.y;
							cssMapNext.left = settings.shiftValue.x;
							cssMapNext.bottom = height + settings.shiftValue.y;
							break;
						case 'toLeft':
							values.width = vars.next.width() / settings.parts;
							values.height = height;
							aniMap.top = -settings.shiftValue.y;
							aniMap.left = -settings.shiftValue.x;
							cssMapNext.top = settings.shiftValue.y;
							cssMapNext.left = width + settings.shiftValue.x;
							break;
					}
					if (settings.animateActive) {
						$activeParts.each(function (i) {
							$this = $(this);
							$this.delay(partDelay * i).animate(aniMap, partDuration, settings.easing);
						});
						delay = settings.parts * partDelay;
					}
					
					$nextParts.each(function(i){
						var $this = $(this), newValues = [], aniMap = {opacity: 1};

						switch(direction){
							case 'toTop':
								aniMap.left = 0;
								aniMap.top = values.height * i;
								break;
							case 'toRight':
								aniMap.top = 0;
								aniMap.right = values.width * i;
								break;
							case 'toBottom':
								aniMap.left = 0;
								aniMap.bottom = values.height * i;
								break;
							case 'toLeft':
								aniMap.top = 0;
								aniMap.left = values.width * i;
								break;
						}
						
						$this.delay(delay).css(cssMapNext).delay(i*partDelay).animate(aniMap, partDuration, settings.easing, function () {
							if (i == settings.parts - 1) {
								vars.active.html(activeContent);
								vars.next.html(nextContent);
								vars.active.css({
									backgroundImage: activeBackgroundImage,
									backgroundColor: activeBackgroundColor,
									opacity: 0
								});
								vars.next.css({
									backgroundImage: nextBackgroundImage,
									backgroundColor: nextBackgroundColor,
									opacity: 1
								});
								callback($slider, settings);
							}
						});
					});
				}

			slideBars($slider, settings);
		}
	};

	$.fn.rhinoslider.preparations = {
		none: function ($slider, settings, vars) {},
		fade: function ($slider, settings, vars) {},
		slide: function ($slider, settings, vars) {
			vars.items.css('overflow', 'hidden');
			$slider.css('overflow', 'hidden');
		},
		kick: function ($slider, settings, vars) {
			vars.items.css('overflow', 'hidden');
			settings.shiftValue.x = parseInt(tmpShiftValue, 10);
			settings.shiftValue.y = parseInt(tmpShiftValue, 10);
			settings.parts.x = parseInt(tmpParts, 10);
			settings.parts.y = parseInt(tmpParts, 10);
		},
		transfer: function($slider, settings, vars) {
			//if shuffle-effect has x and y shift or parts
			var shiftValue = String(tmpShiftValue);
			if (shiftValue.indexOf(',') >= 0) {
				var tmp = shiftValue.split(',');
				settings.shiftValue.x = parseInt(tmp[0], 10);
				settings.shiftValue.y = parseInt(tmp[1], 10);
			} else {
				settings.shiftValue.x = parseInt(tmpShiftValue, 10);
				settings.shiftValue.y = parseInt(tmpShiftValue, 10);
			}
			
			vars.items.css('overflow', 'hidden');
		},
		shuffle: function ($slider, settings, vars) {
			//if shuffle-effect has x and y shift or parts
			var shiftValue = String(tmpShiftValue);
			if (shiftValue.indexOf(',') >= 0) {
				var tmp = shiftValue.split(',');
				settings.shiftValue.x = tmp[0];
				settings.shiftValue.y = tmp[1];
			} else {
				settings.shiftValue.x = parseInt(tmpShiftValue, 10);
				settings.shiftValue.y = parseInt(tmpShiftValue, 10);
			}
			var parts = String(tmpParts);
			if (parts.indexOf(',') >= 0) {
				var tmp = parts.split(',');
				settings.parts.x = tmp[0];
				settings.parts.y = tmp[1];
			} else {
				settings.parts.x = parseInt(tmpParts, 10);
				settings.parts.y = parseInt(tmpParts, 10);
			}
			
			vars.items.css('overflow', 'visible');
		},
		explode: function ($slider, settings, vars) {
			//if shuffle-effect has x and y shift or parts
			var shiftValue = String(tmpShiftValue);
			if (shiftValue.indexOf(',') >= 0) {
				var tmp = shiftValue.split(',');
				settings.shiftValue.x = tmp[0];
				settings.shiftValue.y = tmp[1];
			} else {
				settings.shiftValue.x = parseInt(tmpShiftValue, 10);
				settings.shiftValue.y = parseInt(tmpShiftValue, 10);
			}
			var parts = String(tmpParts);
			if (parts.indexOf(',') >= 0) {
				var tmp = parts.split(',');
				settings.parts.x = tmp[0];
				settings.parts.y = tmp[1];
			} else {
				settings.parts.x = parseInt(tmpParts, 10);
				settings.parts.y = parseInt(tmpParts, 10);
			}
			
			vars.items.css('overflow', 'visible');
		},
		turnOver: function ($slider, settings, vars) {
			vars.items.css('overflow', 'hidden');
			$slider.css('overflow', 'hidden');
		},
		chewyBars: function ($slider, settings, vars) {
			//if shuffle-effect has x and y shift or parts
			var shiftValue = String(tmpShiftValue);
			if (shiftValue.indexOf(',') >= 0) {
				var tmp = shiftValue.split(',');
				settings.shiftValue.x = parseInt(tmp[0], 10);
				settings.shiftValue.y = parseInt(tmp[1], 10);
			} else {
				settings.shiftValue.x = parseInt(tmpShiftValue, 10);
				settings.shiftValue.y = parseInt(tmpShiftValue, 10);
			}
			
			//if bars-effect has x and y shift or parts
			var parts = String(tmpParts);
			if (parts.indexOf(',') >= 0) {
				var tmp = parts.split(',');
				settings.parts = parseInt(tmp[0], 10) * parseInt(tmp[1], 10);
			} else {
				settings.parts = parseInt(tmpParts, 10);
			}

			vars.items.css('overflow', 'visible');
			
		}
	};

})(jQuery, window);