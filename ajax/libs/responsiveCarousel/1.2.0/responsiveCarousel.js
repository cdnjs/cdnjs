/*! responsiveCarousel.JS - v1.2.0
 * http://basilio.github.com/responsiveCarousel
 *
 * Copyright (c) 2013 Basilio Cáceres <basilio.caceres@gmail.com>;
 * Licensed under the MIT license */

;(function($){
	"use strict";
	$.fn.carousel = function(args){
		var defaults, obj;
		defaults = {
			infinite : true,
			visible : 1,
			speed : 'fast',
			overflow : false,
			autoRotate : false,
			navigation : $(this).data('navigation'),
			itemMinWidth : 0,
			itemEqualHeight : false,
			itemMargin : 0,
			itemClassActive : 'crsl-active',
			imageWideClass : 'wide-image',
			// Use to build grid system - carousel : false
			carousel : true
		};
		return $(this).each( function(){
			// Set Object
			obj = $(this);

			// Extend
			if( $.isEmptyObject(args) === false )
				$.extend( defaults, args );
			if( $.isEmptyObject( $(obj).data('crsl') ) === false )
				$.extend( defaults, $(obj).data('crsl') );


			// Touch detection
			defaults.isTouch = 'ontouchstart' in document.documentElement || navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i) ? true : false ;

			obj.init = function(){
				// Set some default vars
				defaults.total = $(obj).find('.crsl-item').length;
				defaults.itemWidth = $(obj).outerWidth();
				defaults.visibleDefault = defaults.visible;

				// Touch Defaults
				defaults.swipeDistance = null;
				defaults.swipeMinDistance = 100;
				defaults.startCoords = {};
				defaults.endCoords = {};

				// .crsl-items
				$(obj).css({ width: '100%' });
				// .crls-item
				$(obj).find('.crsl-item').css({ position: 'relative', float: 'left', overflow: 'hidden', height: 'auto' });
				// .crsl-item > images with full width
				$(obj).find('.'+defaults.imageWideClass).each( function(){
					$(this).css({ display: 'block', width: '100%', height: 'auto' });
				});
				// .crsl-item > iframes (videos)
				$(obj).find('.crsl-item iframe').attr({ width: '100%' });


				// Declare the item ative
				if( defaults.carousel )
					$(obj).find('.crsl-item:first-child').addClass(defaults.itemClassActive);

				// Move last element to begin for infinite carousel
				if( defaults.carousel && defaults.infinite && ( defaults.visible < defaults.total ) )
					$(obj).find('.crsl-item:first-child').before( $('.crsl-item:last-child', obj) );

				// if defaults.overflow
				if( defaults.overflow === false ){
					$(obj).css({ overflow: 'hidden' });
				} else {
					$('html, body').css({ 'overflow-x': 'hidden' });
				}

				$(obj).trigger('initCarousel', [defaults, obj]);

				// Preload if it`s neccesary
				obj.testPreload();

				// This configure and margins and variables when document is ready,
				// loaded and window is resized
				obj.config();

				// Init AutoRotate
				obj.initRotate();

				// Trigger Clicks
				obj.triggerNavs();

			};

			obj.testPreload= function(){
				if( $(obj).find('img').length > 0 ){
					var totalImages = $(obj).find('img').length, i = 1;
					$(obj).find('img').each( function(){
						obj.preloadImage(this, i , totalImages);
						i++;
					});
				} else {
					$(obj).trigger('loadedCarousel', [defaults, obj]);
				}
			};

			obj.preloadImage = function(image, i, totalImages){
				var new_image = new Image(), attributes = {};
				attributes.src = ( $(image).attr('src') !== undefined ? image.src : '' );
				attributes.alt = ( $(image).attr('alt') !== undefined ? image.alt : '' );
				$(new_image).attr( attributes );
				$(new_image).on('load', function(){
					// Trigger first image loaded as init Loading action
					if( i === 1 )
						$(obj).trigger('loadingImagesCarousel', [defaults, obj]);
					// Trigger last image loaded as loaded complete action
					if( i === totalImages )
						$(obj).trigger('loadedImagesCarousel', [defaults, obj]);
				});
			};

			// Base Configuration:
			obj.config = function(){
				// Width Item
				defaults.itemWidth = Math.floor( ( $(obj).outerWidth() - ( defaults.itemMargin * ( defaults.visibleDefault - 1 ) ) ) / defaults.visibleDefault );
				if( defaults.itemWidth <= defaults.itemMinWidth ){
					defaults.visible = Math.floor( ( $(obj).outerWidth() - ( defaults.itemMargin * ( defaults.visible - 1 ) ) ) / defaults.itemMinWidth ) === 1 ?
						Math.floor( $(obj).outerWidth() / defaults.itemMinWidth ) :
						Math.floor( ( $(obj).outerWidth() - defaults.itemMargin ) / defaults.itemMinWidth );
					defaults.visible = defaults.visible < 1 ? 1 : defaults.visible;
					defaults.itemWidth = defaults.visible === 1 ? Math.floor( $(obj).outerWidth() ) : Math.floor( ( $(obj).outerWidth() - ( defaults.itemMargin * ( defaults.visible - 1 ) ) ) / defaults.visible );
				} else {
					defaults.visible = defaults.visibleDefault;
				}

				if( defaults.carousel ){
					// Normal use - Global carousel variables
					// Set Variables
					obj.wrapWidth = Math.floor( ( defaults.itemWidth + defaults.itemMargin ) * defaults.total );
					obj.wrapMargin = obj.wrapMarginDefault = defaults.infinite && defaults.visible < defaults.total ? parseInt( ( defaults.itemWidth + defaults.itemMargin ) * -1, 10 ) : 0 ;
					// Move last element to begin for infinite carousel
					if( defaults.infinite && ( defaults.visible < defaults.total ) && ( $(obj).find('.crsl-item.'+defaults.itemClassActive).index() === 0 ) ){
						$(obj).find('.crsl-item:first-child').before( $('.crsl-item:last-child', obj) );
						obj.wrapMargin = obj.wrapMarginDefault = parseInt( ( defaults.itemWidth + defaults.itemMargin ) * -1, 10 );
					}
					// Modify width & margin to .crsl-wrap
					$(obj).find('.crsl-wrap').css({ width: obj.wrapWidth+'px', marginLeft: obj.wrapMargin });
				} else {
					// Excepcional use
					// responsiveCarousel might be use to create grids!
					obj.wrapWidth = $(obj).outerWidth();
					$(obj).find('.crsl-wrap').css({ width: obj.wrapWidth+defaults.itemMargin+'px' });
					$('#'+defaults.navigation).hide();
				}

				$(obj).find('.crsl-item').css({ width: defaults.itemWidth+'px', marginRight : defaults.itemMargin+'px' });

				// Equal Height Configuration
				obj.equalHeights();

				// Condition if total <= visible
				if( defaults.carousel ){
					if( defaults.visible >= defaults.total ){
						defaults.autoRotate = false;
						$('#'+defaults.navigation).hide();
					} else {
						$('#'+defaults.navigation).show();
					}
				}
			};

			// Equal Heights
			obj.equalHeights = function(){
				if( defaults.itemEqualHeight !== false ){
					var tallest = 0;
					$(obj).find('.crsl-item').each( function(){
						$(this).css({ 'height': 'auto' });
						if ( $(this).outerHeight() > tallest ){ tallest = $(this).outerHeight(); }
					});
					$(obj).find('.crsl-item').css({ height: tallest+'px' });
				}
				return true;
			};

			obj.initRotate = function(){
				// Set AutoRotate Interval
				if( defaults.autoRotate !== false ){
					obj.rotateTime = window.setInterval( function(){
						obj.rotate();
					}, defaults.autoRotate);
				}
			};

			obj.triggerNavs = function(){
				// Previous / Next Navigation
				$('#'+defaults.navigation).delegate('.previous, .next', 'click', function(event){
					// Prevent default
					event.preventDefault();
					// Prepare execute
					obj.prepareExecute();
					// Previous & next action
					if( $(this).hasClass('previous') && obj.testPrevious(obj.itemActive) ){
						obj.previous();
					} else if( $(this).hasClass('next') && obj.testNext() ){
						obj.next();
					} else {
						return;
					}
				});
			};

			// Prepare Execute
			obj.prepareExecute = function(){
				// Stop rotate
				if( defaults.autoRotate ){
					clearInterval(obj.rotateTime);
				}
				// Prevent Animate Event
				obj.preventAnimateEvent();
				// Active
				obj.itemActive = $(obj).find('.crsl-item.'+defaults.itemClassActive);
				return true;
			};

			obj.preventAnimateEvent = function(){
				if( $(obj).find('.crsl-wrap:animated').length > 0 ){
					return false;
				}
			};

			// Rotate Action
			obj.rotate = function(){
				// Prevent Animate Event
				obj.preventAnimateEvent();
				// Active
				obj.itemActive = $(obj).find('.crsl-item.'+defaults.itemClassActive);
				obj.next();
				return true;
			};

			obj.testPrevious = function(active){
				return $('.crsl-wrap', obj).find('.crsl-item').index(active) > 0;
			};
			obj.testNext = function(){
				return ( !defaults.infinite &&
					obj.wrapWidth >= (
						( ( defaults.itemWidth + defaults.itemMargin ) * ( defaults.visible + 1 ) ) - obj.wrapMargin
					)
				) || defaults.infinite;
			};

			// Previous Animate
			obj.previous = function(){
				obj.wrapMargin = defaults.infinite ? obj.wrapMarginDefault + $(obj.itemActive).outerWidth(true) : obj.wrapMargin + $(obj.itemActive).outerWidth(true);
				var prevItemIndex = $(obj.itemActive).index();
				var newItemActive = $(obj.itemActive).prev('.crsl-item');
				var action = 'previous';
				// Trigger Begin Carousel Move
				$(obj).trigger('beginCarousel', [defaults, obj, action]);
				// Animate
				$(obj).
					find('.crsl-wrap').
					animate({ marginLeft: obj.wrapMargin+'px' }, defaults.speed, function(){
						// Active
						$(obj.itemActive).removeClass(defaults.itemClassActive);
						$(newItemActive).addClass(defaults.itemClassActive);
						if( defaults.infinite ){
							$(this).css({ marginLeft: obj.wrapMarginDefault }).find('.crsl-item:first-child').before( $('.crsl-item:last-child', obj) );
						} else {
							if( obj.testPrevious(newItemActive) === false )
								$( '#'+defaults.navigation ).find('.previous').addClass('previous-inactive');
							if( obj.testNext() )
								$( '#'+defaults.navigation ).find('.next').removeClass('next-inactive');
						}
						// Trigger Carousel Exec
						$(this).trigger('endCarousel', [defaults, obj, action]);
					});
			};

			// Next Animate
			obj.next = function(){
				obj.wrapMargin = defaults.infinite ? obj.wrapMarginDefault - $(obj.itemActive).outerWidth(true) : obj.wrapMargin - $(obj.itemActive).outerWidth(true);
				var nextItemIndex = $(obj.itemActive).index();
				var newItemActive = $(obj.itemActive).next('.crsl-item');
				var action = 'next';
				// Trigger Begin Carousel Move
				$(obj).trigger('beginCarousel', [defaults, obj, action]);
				// Animate
				$(obj).
					find('.crsl-wrap').
					animate({ marginLeft: obj.wrapMargin+'px' }, defaults.speed, function(){
						// Active
						$(obj.itemActive).removeClass(defaults.itemClassActive);
						$(newItemActive).addClass(defaults.itemClassActive);
						if( defaults.infinite ){
							$(this).css({ marginLeft: obj.wrapMarginDefault }).find('.crsl-item:last-child').after( $('.crsl-item:first-child', obj) );
						} else {
							if( obj.testPrevious(newItemActive) )
								$( '#'+defaults.navigation ).find('.previous').removeClass('previous-inactive');
							if( obj.testNext() === false )
								$( '#'+defaults.navigation ).find('.next').addClass('next-inactive');
						}
						// Trigger Carousel Exec
						$(this).trigger('endCarousel', [defaults, obj, action]);
					});
			};

			var mouseHover = false, current;
			$(window).on('mouseleave', function(event){
				// Detect current
				if (event.target) current = event.target;
				else if (event.srcElement) current = event.srcElement;
				// Detect mouseover
				if( ( $(obj).attr('id') && $(current).parents('.crsl-items').attr('id') === $(obj).attr('id') ) || ( $(current).parents('.crsl-items').data('navigation') === $(obj).data('navigation') ) ){
					mouseHover = true;
				} else {
					mouseHover = false;
				}
				// False
				return false;
			});

			$(window).on('keydown', function(event){
				if( mouseHover === true ){
					// Previous & next action
					if( event.keyCode === 37 ){
						// Prepare execute
						obj.prepareExecute();
						// Previous
						obj.previous();
					} else if( event.keyCode === 39 ){
						// Prepare execute
						obj.prepareExecute();
						// Next
						obj.next();
					}
				}
				return;
			});

			if( defaults.isTouch ){
				$(obj).on('touchstart', function(e){
					$(obj).addClass('touching');
					defaults.startCoords.pageX = defaults.endCoords.pageX = e.originalEvent.targetTouches[0].pageX;
					defaults.startCoords.pageY = defaults.endCoords.pageY = e.originalEvent.targetTouches[0].pageY;
					$('.touching').on('touchmove',function(e){
						defaults.endCoords.pageX = e.originalEvent.targetTouches[0].pageX;
						defaults.endCoords.pageY = e.originalEvent.targetTouches[0].pageY;
						if( Math.abs( parseInt( defaults.endCoords.pageX-defaults.startCoords.pageX, 10 ) ) > Math.abs( parseInt( defaults.endCoords.pageY-defaults.startCoords.pageY, 10 ) ) ){
							e.preventDefault();
							e.stopPropagation();
						}
					});
				}).on('touchend', function(e){
					e.preventDefault();
					e.stopPropagation();
					defaults.swipeDistance = defaults.endCoords.pageX - defaults.startCoords.pageX;
					if( defaults.swipeDistance >= defaults.swipeMinDistance ){
						obj.prepareExecute();
						// swipeLeft
						obj.previous();
					} else if( defaults.swipeDistance <= - defaults.swipeMinDistance ){
						obj.prepareExecute();
						// swipeRight
						obj.next();
					}
					$('.touching').off('touchmove').removeClass('touching');
				});
			}

			$(obj).on('loadedCarousel loadedImagesCarousel', function(){
				// Trigger window onload EqualHeights
				obj.equalHeights();
			});

			// Create method to resize element
			$(window).on('carouselResizeEnd', function(){
				// This configure and margins and variables when document is ready,
				// loaded and window is resized
				if( defaults.itemWidth !== $(obj).outerWidth() )
					obj.config();

			});

			// Carousel General Detection
			$(window).ready( function(){
				// Trigger Prepare Event Carousel
				$(obj).trigger('prepareCarousel', [defaults, obj]);
				// Init some defaults styles
				obj.init();
				// ResizeEnd event
				$(window).on('resize', function(){
					if( this.carouselResizeTo ) clearTimeout(this.carouselResizeTo);
					this.carouselResizeTo = setTimeout(function(){
						$(this).trigger('carouselResizeEnd');
					}, 10);
				});
			});

			$(window).load( function(){
				// Preload if it`s neccesary
				obj.testPreload();
				// This configure and margins and variables when document is ready,
				// loaded and window is resized
				obj.config();
			});
		});
	};
})(jQuery);
