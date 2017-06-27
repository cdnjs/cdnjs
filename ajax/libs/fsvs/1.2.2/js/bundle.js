
/*!
* 	FSVS - Full Screen Vertical Scroller
* 	https://github.com/lukesnowden/FSVS
* 	Copyright 2014 Luke Snowden
* 	Released under the MIT license:
* 	http://www.opensource.org/licenses/mit-license.php
*/

;( function($){

	$.fn.fsvs = function( options ) {

		options = options || {};

		/**
		 * [defaults description]
		 * @type {Object}
		 */

		var defaults = {
			speed : 5000,
			autoPlay : false,
			bodyID : 'fsvs-body',
			selector : '> .slide',
			mouseSwipeDisance : 40,
			afterSlide : function(){},
			beforeSlide : function(){},
			endSlide : function(){},
			mouseWheelEvents : true,
			mouseWheelDelay : false,
			scrollabelArea : 'scrollable',
			mouseDragEvents : true,
			touchEvents : true,
			arrowKeyEvents : true,
			pagination : true,
			nthClasses : false,
			detectHash : true
		};

		for( var i in options ) {
			defaults[i] = options[i];
		}
		options = defaults;

		/**
		 * [loop description]
		 * @type {[type]}
		 */
		var loop = null;

		/**
		 * [currentSlideIndex description]
		 * @type {Number}
		 */

		var currentSlideIndex = 0;

		/**
		 * [ignoreHashChange description]
		 * @type {Boolean}
		 */

		var ignoreHashChange = false;

		/**
		 * [bodyTimeout description]
		 * @type {[type]}
		 */

		var bodyTimeout = null;

		/**
		 * [body description]
		 * @type {[type]}
		 */

		var body = null;

		/**
		 * [scrolling description]
		 * @type {Boolean}
		 */

		var scrolling = false;

		/**
		 * [mouseWheelTimer description]
		 * @type {Boolean}
		 */

		var mouseWheelTimer = false;

		/**
		 * [mouseWheelScrollStart description]
		 * Indicates when the mouseWheel last invoked a slide event.
		 * @type {Integer}
		 */

		var mouseWheelScrollStart = 0;

		/**
		 * [pagination description]
		 * @type {Boolean}
		 */

		var pagination = false;

		/**
		 * [isChrome description]
		 * @reference http://stackoverflow.com/questions/4565112/javascript-how-to-find-out-if-the-user-browser-is-chrome
		 * @return {Boolean} [description]
		 */

		var isChrome = function() {
			var isChromium = window.chrome,
			    vendorName = window.navigator.vendor;
			if( isChromium !== null && vendorName === "Google Inc." ) {
			   return true;
			}
			return false;
		};

		/**
		 * [changeViaHash description]
		 * @return {[type]} [description]
		 */

		var changeViaHash = function() {
			if( ! ignoreHashChange ) {
				if( window.location.hash !== '' ) {
					var slideID = window.location.hash;
					var slideTo = $( '> ' + slideID, body );
					app.slideToIndex( slideTo.index() );
				}
			}
			ignoreHashChange = false;
		};

		/**
		 * [detectHash description]
		 * @return {[type]} [description]
		 */

		var detectHash = function(){
			$( options.selector, body ).each( function( i ) {
				var slide = $(this);
				if( ! slide.attr( 'id' ) ) {
					slide.attr( 'id', 'slide-' + (i+1) );
				}
			});
			changeViaHash();
		};

		/**
		 * [hasTransition description]
		 * @return {Boolean} [description]
		 */

		var hasTransition = function(){
		    prefixes = ['Webkit','Moz','ms','O'];
		   	for( var i in prefixes ) {
		   		if( typeof document.getElementsByTagName( 'body' )[0].style[prefixes[i] + 'Transition' ] !== 'undefined' ) {
		   			return true;
		   		}
		   	}
		    return false;
		}

		/**
		 * [bindMouseDrag description]
		 * @return {[type]} [description]
		 */

		var bindMouseDrag = function() {
			var x, y;
			window.onmousedown = function(e) {
				y = e.y;
			}
			window.onmouseup = function(e) {
				if( e.y > ( y+options.mouseSwipeDisance ) ) {
					app.slideUp();
				} else if( e.y < ( y-options.mouseSwipeDisance ) ) {
					app.slideDown();
				}
			}
		};

		/**
		 * [unBindMouseDrag description]
		 * @return {[type]} [description]
		 */
		var unBindMouseDrag = function(){
			window.onmousedown = function(){};
			window.onmouseup = function(){};
		}

		/**
		 * [bindTouchSwipe description]
		 * @return {[type]} [description]
		 */

		var bindTouchSwipe = function() {
			var startY = null;
			$(window).on( "touchstart.fsvs", function(ev) {
    			var e = ev.originalEvent;
    			var cancelOn = ['a','input','textarea','select'];
				if( $.inArray( e.target.nodeName.toLowerCase(), cancelOn ) == -1 ) {
					var touches = e.touches;
					if( touches && touches.length ) {
						startY = touches[0].pageY;
					}
					e.preventDefault();
				}
			});
			$(window).on( "touchmove.fsvs", function(ev) {
    			var e = ev.originalEvent;
				if( startY !== null ) {
					var touches = e.touches;
					if( touches && touches.length ) {
						var deltaY = startY - touches[0].pageY;
						if ( deltaY >= options.mouseSwipeDisance ) {
							app.slideDown();
							startY = null;
						}
						if ( deltaY <= ( options.mouseSwipeDisance * -1 ) ) {
							app.slideUp();
							startY = null;
						}
					}
					e.preventDefault();
				}
			});
		};

		/**
		 * [unbindTouchSwipe description]
		 * @return {[type]} [description]
		 */
		var unbindTouchSwipe = function() {
			$(window).unbind( "touchstart.fsvs" );
			$(window).unbind( "touchmove.fsvs" );
		};

		/**
		 * [mouseWheelHandler description]
		 * @param  {[type]} e [description]
		 * @return {[type]}   [description]
		 */

		var mouseWheelHandler = function( ev ) {
			var e = window.event || ev;
			var wheely = ( e.wheelDelta || -e.detail || e.originalEvent.detail );
			var delta = Math.max( -1, Math.min( 1, wheely ) );
			if( isChrome() ) {
				// chrome seems to extends its "wheely" motion
				wheely = Math.floor( wheely / 5 );
			}
			if( ( ! scrolling || ( options.mouseWheelDelay && Date.now() > mouseWheelScrollStart + options.mouseWheelDelay ) ) && Math.abs( wheely ) > 5 ) {
				mouseWheelScrollStart = Date.now();
				scrolling = true;
				var allowToRun = true;
				var target = $(ev.target);
				if( target.hasClass( options.scrollabelArea ) || target.parents( '.' + options.scrollabelArea ).length !== 0 ) {
					allowToRun = false;
					var scrollableArea = target.closest('.' + options.scrollabelArea);
					if( target.hasClass( options.scrollabelArea ) ) scrollableArea = target;
					if( isScrollingUp(ev) && scrollableArea.scrollTop() === 0 ) {
						allowToRun = true;
					} else if( scrollableArea[0].scrollHeight - scrollableArea.scrollTop() === scrollableArea.outerHeight() ) {
						allowToRun = true;
					}
				}
				if( allowToRun ) {
					if( isScrollingUp(ev) ) {
						app.slideUp();
					} else {
						app.slideDown();
					}
				} else {
					scrolling = false;
				}
			}
		};

		/**
		 * [isScrollingUp description]
		 * @param  {[type]}  ev [description]
		 * @return {Boolean}    [description]
		 */
		var isScrollingUp = function(ev){
			var e = window.event || ev;
			var wheely = ( e.wheelDelta || -e.detail || e.originalEvent.detail );
			var delta = Math.max( -1, Math.min( 1, wheely ) );
			if( isChrome() ) wheely = Math.floor( wheely / 5 );
			if( e.originalEvent && e.originalEvent.detail ) {
				if( delta > 0 ) {
					return false;
				}
			} else if( delta < 0 ) {
				return false;
			}
			return true;
		}

		/**
		 * [bindMouseWheelEvent description]
		 * @return {[type]} [description]
		 */

		var bindMouseWheelEvent = function() {
			$(window).bind('wheel.fsvs mousewheel.fsvs DOMMouseScroll.fsvs MozMousePixelScroll.fsvs', mouseWheelHandler );
		};

		/**
		 * [unBindMouseWheelEvent description]
		 * @return {[type]} [description]
		 */
		var unBindMouseWheelEvent = function(){
			$(window).unbind('wheel.fsvs mousewheel.fsvs DOMMouseScroll.fsvs MozMousePixelScroll.fsvs', mouseWheelHandler );
		};

		/**
		 * [bindKeyArrows description]
		 * @return {[type]} [description]
		 */

		var bindKeyArrows = function() {
			allow = true;
			$('input,textarea,select,option', body)
			.bind( 'focus.fsvs', function(){ allow = false; })
			.bind( 'blur.fsvs', function(){ allow = true; });
			window.onkeydown = function(e) {
				e = e || window.event;
			    if ( e.keyCode == '38' && allow ) app.slideUp();
			    else if ( e.keyCode == '40' && allow ) app.slideDown();
			}
		};

		/**
		 * [unbindKeyArrows description]
		 * @return {[type]} [description]
		 */
		var unbindKeyArrows = function(){
			$('input,textarea,select,option', body).unbind('focus.fsvs blur.fsvs');
			window.onkeydown = function(){};
		};

		/**
		 * [slideCallback description]
		 * @param  {[type]} index [description]
		 * @return {[type]}       [description]
		 */

		var slideCallback = function( index ) {
			currentSlideIndex = index;
			options.afterSlide( index );
			if( options.detectHash ) {
				var slide = $( options.selector, body ).eq( index );
				window.location.hash = slide[0].id;
			}
			if( ! app.canSlideDown() ) {
				options.endSlide( index );
			}
			if( options.autoPlay && loop === null ) {
				play();
			}
			scrolling = false;
		};

		/**
		 * [nthClasses description]
		 * @param  {[type]} nthClassLimit [description]
		 * @return {[type]}               [description]
		 */

		var nthClasses = function( nthClassLimit ) {
			$( options.selector, body ).each( function( i ) {
				var nthClass = 'nth-class-' + ((i%nthClassLimit)+1);
				if( ! $(this).hasClass( nthClass ) ) {
					$(this).addClass( nthClass );
				}
			});
		};

		/**
		 * [jQuerySlide description]
		 * @param  {[type]} index [description]
		 * @return {[type]}       [description]
		 */

		var jQuerySlide = function( index ) {
			options.beforeSlide( index );
			if( body.is( ':animated' ) ) {
				currentSlideIndex = index;
				body.stop();
			}
			body.animate({
				top : '-' + (index*$(window).height()) + 'px'
			}, options.speed, function() {
				slideCallback( index );
			});
		};

		/**
		 * [cssSlide description]
		 * @param  {[type]} index [description]
		 * @return {[type]}       [description]
		 */

		var cssSlide = function( index ) {
			options.beforeSlide( index );
			body.css({
				'-webkit-transform' : 'translate3d(0, -' + (index*100) + '%, 0)',
				'-moz-transform' : 'translate3d(0, -' + (index*100) + '%, 0)',
				'-ms-transform' : 'translate3d(0, -' + (index*100) + '%, 0)',
				'transform' : 'translate3d(0, -' + (index*100) + '%, 0)'
			});
			if( bodyTimeout !== null ) {
				currentSlideIndex = index;
				clearTimeout( bodyTimeout );
			}
			bodyTimeout = setTimeout( function(){
				slideCallback( index );
				bodyTimeout = null;
			}, options.speed );
		};

		/**
		 * [play description]
		 * @return {[type]} [description]
		 */
		var play = function(){
			loop = setInterval(function(){
				if( app.canSlideDown() ) {
					app.slideDown();
				} else {
					app.slideToIndex(0);
				}
			}, options.autoPlay );
		};

		/**
		 * [removeStyling description]
		 * @return {[type]} [description]
		 */
		var removeStyling = function(){
			body.attr('style', '');
			$('> div', body).each(function(i){
				$(this).attr('class', 'slide' );
			});
			$('body').attr('class','');
			$('#fsvs-pagination').remove();
		};

		/**
		 * [app description]
		 * @type {Object}
		 */

		var app = {

			nthClasses : nthClasses,

			/**
			 * [addPagination description]
			 */

			addPagination : function() {
				pagination = $('<ul id="fsvs-pagination"></ul>');
				$( options.selector, body ).each( function(i) {
					var linkClass = currentSlideIndex === i ? 'pagination-link active' : 'pagination-link';
					$('<li class="' + linkClass + '"><span><span></span></span></li>').appendTo( pagination );
				});
				if( $('#fsvs-pagination').length !== 0 ) {
					$('#fsvs-pagination').remove();
				}
				pagination.appendTo( $('body') );
				var paginationHeight = pagination.height();
				var speed = options.speed/1000;
				$('span', pagination).css({
					'-webkit-transition': 'all ' + speed + 's',
					'-moz-transition'	: 'all ' + speed + 's',
					'-o-transition'		: 'all ' + speed + 's',
					'transition'		: 'all ' + speed + 's'
				});
				pagination.css({
					marginTop : '-' + (paginationHeight/2) + 'px',
					right : '25px'
				});
				$('li', pagination).bind( 'click.fsvs', function(e){
					ignoreHashChange = true;
					$('.active', pagination).removeClass( 'active' );
					$(this).addClass( 'active' );
					app.slideToIndex( $(this).index(), e );
				});
			},

			/**
			 * [setSpeed description]
			 * @param {[type]} _speed [description]
			 */

			setSpeed : function( _speed ) {
				speed = _speed/1000;
				body.css({
					'-webkit-transition': 'all ' + speed + 's',
					'-moz-transition'	: 'all ' + speed + 's',
					'-o-transition'		: 'all ' + speed + 's',
					'transition'		: 'all ' + speed + 's'
				});
			},

			/**
			 * [shouldRun description]
			 * @return {[type]} [description]
			 */

			shouldRun : function() {
				return $('html').hasClass( 'fsvs' );
			},

			/**
			 * [canSlideUp description]
			 * @return {[type]} [description]
			 */

			canSlideUp : function() {
				if( currentSlideIndex === 0 ) return false;
				return true;
			},

			/**
			 * [canSlideDown description]
			 * @return {[type]} [description]
			 */

			canSlideDown : function() {
				if( $( options.selector, body ).eq( (currentSlideIndex+1) ).length === 0 ) return false;
				return true;
			},

			/**
			 * [addClasses description]
			 * @param {[type]} before [description]
			 * @param {[type]} after  [description]
			 */

			addClasses : function( before, after ) {
				var _body = $('body');
				_body.removeClass( removeClass = 'active-slide-' + (before+1) );
				_body.addClass( 'active-slide-' + (after+1) );
				$( options.selector, body ).eq( before ).removeClass( 'active-slide' );
				$( options.selector, body ).eq( after ).addClass( 'active-slide' );
				if( options.nthClasses ) {
					_body.removeClass( 'active-nth-slide-' + (( before % options.nthClasses )+1) );
					_body.addClass( 'active-nth-slide-' + (( after % options.nthClasses )+1) );
				}
			},

			/**
			 * [slideToIndex description]
			 * @param  {[type]} index [description]
			 * @return {[type]}       [description]
			 */

			slideToIndex : function( index, e ) {
				var e = e || false;
				if( e && options.autoPlay ) {
					clearInterval( loop );
					loop = null;
				}
				if( ! e && pagination ) {
					$('.active', pagination).removeClass( 'active' );
					$('> *', pagination).eq(index).addClass( 'active' );
				}
				app.addClasses( currentSlideIndex, index );
				if( hasTransition() ) {
					cssSlide( index );
				} else {
					jQuerySlide( index );
				}
			},

			/**
			 * [unbind description]
			 * @return {[type]} [description]
			 */
			unbind : function(){
				unBindMouseDrag();
				unBindMouseWheelEvent();
				unbindKeyArrows();
				unbindTouchSwipe();
				removeStyling();
				$('html').removeClass('fsvs');
			},

			/**
			 * [rebind description]
			 * @return {[type]} [description]
			 */
			rebind : function() {
				$('html').addClass('fsvs');
				app.init();
			},

			/**
			 * [slideDown description]
			 * @return {[type]} [description]
			 */

			slideDown : function(e) {
				if( app.canSlideDown() ) {
					ignoreHashChange = true;
					app.slideToIndex( (currentSlideIndex+1), e );
				} else {
					scrolling = false;
				}
			},

			/**
			 * [slideUp description]
			 * @return {[type]} [description]
			 */

			slideUp : function(e) {
				if( app.canSlideUp() ) {
					ignoreHashChange = true;
					app.slideToIndex( (currentSlideIndex-1), e );
				} else {
					scrolling = false;
				}
			},

			/**
			 * [init description]
			 * @return {[type]} [description]
			 */

			init : function() {
				body = $( '#' + options.bodyID );
				if( hasTransition() ) {
					app.setSpeed( options.speed );
				}
				if( options.pagination ) {
					app.addPagination();
				}
				if( options.nthClasses ) {
					nthClasses( options.nthClasses );
				}
				if( options.mouseWheelEvents ) {
					bindMouseWheelEvent();
				}
				if( options.arrowKeyEvents ) {
					bindKeyArrows();
				}
				if( options.mouseDragEvents ) {
					bindMouseDrag();
				}
				if( options.touchEvents ) {
					bindTouchSwipe();
				}
				if( options.detectHash ) {
					detectHash();
					if( window.addEventListener ) {
					    window.addEventListener( "hashchange", changeViaHash, false );
					}
					else if (window.attachEvent) {
					    window.attachEvent( "onhashchange", changeViaHash );
					}
				}
				if( window.location.hash === '' ) {
					app.addClasses( 0, 0 );
				}
				if( options.autoPlay ) {
					if( options.autoPlay > options.speed ) {
						play();
					}
				}
			}

		};

		if( app.shouldRun() ) {
			app.init();
		}
		return app;

	};

})( jQuery );