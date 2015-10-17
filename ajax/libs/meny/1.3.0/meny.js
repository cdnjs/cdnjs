/*!
 * meny 1.3
 * http://lab.hakim.se/meny
 * MIT licensed
 *
 * Created by Hakim El Hattab (http://hakim.se, @hakimel)
 */
var Meny = {
	// Creates a new instance of Meny
	create: function( options ) {
		return (function(){

			// Make sure the required arguments are defined
			if( !options || !options.menuElement || !options.contentsElement ) {
				throw 'You need to specify which menu and contents elements to use.';
			}

			// Make sure the menu and contents have the same parent
			if( options.menuElement.parentNode !== options.contentsElement.parentNode ) {
				throw 'The menu and contents elements must have the same parent.';
			}

			// Constants
			var POSITION_T = 'top',
				POSITION_R = 'right',
				POSITION_B = 'bottom',
				POSITION_L = 'left';

			// Feature detection for 3D transforms
			var supports3DTransforms =  'WebkitPerspective' in document.body.style ||
										'MozPerspective' in document.body.style ||
										'msPerspective' in document.body.style ||
										'OPerspective' in document.body.style ||
										'perspective' in document.body.style;

			// Default options, gets extended by passed in arguments
			var config = {
				width: 300,
				height: 300,
				position: POSITION_L,
				threshold: 40,
				overlap: 6,
				transitionDuration: '0.5s',
				transitionEasing: 'ease',
				mouse: true,
				touch: true
			};

			// Cache references to DOM elements
			var dom = {
				menu: options.menuElement,
				contents: options.contentsElement,
				wrapper: options.menuElement.parentNode,
				cover: null
			};

			// State and input
			var indentX = dom.wrapper.offsetLeft,
				indentY = dom.wrapper.offsetTop,
				touchStartX = null,
				touchStartY = null,
				touchMoveX = null,
				touchMoveY = null,
				isOpen = false,
				isMouseDown = false;

			// Precalculated transform and style states
			var menuTransformOrigin,
				menuTransformClosed,
				menuTransformOpened,
				menuStyleClosed,
				menuStyleOpened,

				contentsTransformOrigin,
				contentsTransformClosed,
				contentsTransformOpened,
				contentsStyleClosed,
				contentsStyleOpened;

			// Ongoing animations (for fallback mode)
			var menuAnimation,
				contentsAnimation,
				coverAnimation;

			configure( options );

			/**
			 * Initializes Meny with the specified user options,
			 * may be called multiple times as configuration changes.
			 */
			function configure( o ) {
				// Extend the default config object with the passed in
				// options
				Meny.extend( config, o );

				setupPositions();
				setupWrapper();
				setupCover();
				setupMenu();
				setupContents();

				bindEvents();
			}

			/**
			 * Prepares the transforms for the current positioning
			 * settings.
			 */
			function setupPositions() {
				menuTransformOpened = '';
				contentsTransformClosed = '';

				switch( config.position ) {
					case POSITION_T:
						// Primary transform:
						menuTransformOrigin = '50% 0%';
						menuTransformClosed = 'rotateX( 30deg ) translateY( -100% ) translateY( '+ config.overlap +'px )';
						contentsTransformOrigin = '50% 0';
						contentsTransformOpened = 'translateY( '+ config.height +'px ) rotateX( -15deg )';

						// Position fallback:
						menuStyleClosed = { top: '-' + (config.height-config.overlap) + 'px' };
						menuStyleOpened = { top: '0px' };
						contentsStyleClosed = { top: '0px' };
						contentsStyleOpened = { top: config.height + 'px' };
						break;

					case POSITION_R:
						// Primary transform:
						menuTransformOrigin = '100% 50%';
						menuTransformClosed = 'rotateY( 30deg ) translateX( 100% ) translateX( -2px ) scale( 1.01 )';
						contentsTransformOrigin = '100% 50%';
						contentsTransformOpened = 'translateX( -'+ config.width +'px ) rotateY( -15deg )';

						// Position fallback:
						menuStyleClosed = { right: '-' + (config.width-config.overlap) + 'px' };
						menuStyleOpened = { right: '0px' };
						contentsStyleClosed = { left: '0px' };
						contentsStyleOpened = { left: '-' + config.width + 'px' };
						break;

					case POSITION_B:
						// Primary transform:
						menuTransformOrigin = '50% 100%';
						menuTransformClosed = 'rotateX( -30deg ) translateY( 100% ) translateY( -'+ config.overlap +'px )';
						contentsTransformOrigin = '50% 100%';
						contentsTransformOpened = 'translateY( -'+ config.height +'px ) rotateX( 15deg )';

						// Position fallback:
						menuStyleClosed = { bottom: '-' + (config.height-config.overlap) + 'px' };
						menuStyleOpened = { bottom: '0px' };
						contentsStyleClosed = { top: '0px' };
						contentsStyleOpened = { top: '-' + config.height + 'px' };
						break;

					default:
						// Primary transform:
						menuTransformOrigin = '100% 50%';
						menuTransformClosed = 'translateX( -100% ) translateX( '+ config.overlap +'px ) scale( 1.01 ) rotateY( -30deg )';
						contentsTransformOrigin = '0 50%';
						contentsTransformOpened = 'translateX( '+ config.width +'px ) rotateY( 15deg )';

						// Position fallback:
						menuStyleClosed = { left: '-' + (config.width-config.overlap) + 'px' };
						menuStyleOpened = { left: '0px' };
						contentsStyleClosed = { left: '0px' };
						contentsStyleOpened = { left: config.width + 'px' };
						break;
				}
			}

			/**
			 * The wrapper element holds the menu and contents.
			 */
			function setupWrapper() {
				// Add a class to allow for custom styles based on
				// position
				Meny.addClass( dom.wrapper, 'meny-' + config.position );

				dom.wrapper.style[ Meny.prefix( 'perspective' ) ] = '800px';
				dom.wrapper.style[ Meny.prefix( 'perspectiveOrigin' ) ] = contentsTransformOrigin;
			}

			/**
			 * The cover is used to obfuscate the contents while
			 * Meny is open.
			 */
			function setupCover() {
				if( dom.cover ) {
					dom.cover.parentNode.removeChild( dom.cover );
				}

				dom.cover = document.createElement( 'div' );

				// Disabled until a falback fade in animation is added
				dom.cover.style.position = 'absolute';
				dom.cover.style.display = 'block';
				dom.cover.style.width = '100%';
				dom.cover.style.height = '100%';
				dom.cover.style.left = 0;
				dom.cover.style.top = 0;
				dom.cover.style.zIndex = 1000;
				dom.cover.style.visibility = 'hidden';
				dom.cover.style.opacity = 0;

				// Silence unimportant errors in IE8
				try {
					dom.cover.style.background = 'rgba( 0, 0, 0, 0.4 )';
					dom.cover.style.background = '-ms-linear-gradient('+ config.position +', rgba(0,0,0,0.20) 0%,rgba(0,0,0,0.65) 100%)';
					dom.cover.style.background = '-moz-linear-gradient('+ config.position +', rgba(0,0,0,0.20) 0%,rgba(0,0,0,0.65) 100%)';
					dom.cover.style.background = '-webkit-linear-gradient('+ config.position +', rgba(0,0,0,0.20) 0%,rgba(0,0,0,0.65) 100%)';
				}
				catch( e ) {}

				if( supports3DTransforms ) {
					dom.cover.style[ Meny.prefix( 'transition' ) ] = 'all ' + config.transitionDuration +' '+ config.transitionEasing;
				}

				dom.contents.appendChild( dom.cover );
			}

			/**
			 * The meny element that folds out upon activation.
			 */
			function setupMenu() {
				// Shorthand
				var style = dom.menu.style;

				switch( config.position ) {
					case POSITION_T:
						style.width = '100%';
						style.height = config.height + 'px';
						break;

					case POSITION_R:
						style.right = '0';
						style.width = config.width + 'px';
						style.height = '100%';
						break;

					case POSITION_B:
						style.bottom = '0';
						style.width = '100%';
						style.height = config.height + 'px';
						break;

					case POSITION_L:
						style.width = config.width + 'px';
						style.height = '100%';
						break;
				}

				style.position = 'fixed';
				style.display = 'block';
				style.zIndex = 1;

				if( supports3DTransforms ) {
					style[ Meny.prefix( 'transform' ) ] = menuTransformClosed;
					style[ Meny.prefix( 'transformOrigin' ) ] = menuTransformOrigin;
					style[ Meny.prefix( 'transition' ) ] = 'all ' + config.transitionDuration +' '+ config.transitionEasing;
				}
				else {
					Meny.extend( style, menuStyleClosed );
				}
			}

			/**
			 * The contents element which gets pushed aside while
			 * Meny is open.
			 */
			function setupContents() {
				// Shorthand
				var style = dom.contents.style;

				if( supports3DTransforms ) {
					style[ Meny.prefix( 'transform' ) ] = contentsTransformClosed;
					style[ Meny.prefix( 'transformOrigin' ) ] = contentsTransformOrigin;
					style[ Meny.prefix( 'transition' ) ] = 'all ' + config.transitionDuration +' '+ config.transitionEasing;
				}
				else {
					style.position = style.position.match( /relative|absolute|fixed/gi ) ? style.position : 'relative';
					Meny.extend( style, contentsStyleClosed );
				}
			}

			/**
			 * Attaches all input event listeners.
			 */
			function bindEvents() {

				if( 'ontouchstart' in window ) {
					if( config.touch ) {
						Meny.bindEvent( document, 'touchstart', onTouchStart );
						Meny.bindEvent( document, 'touchend', onTouchEnd );
					}
					else {
						Meny.unbindEvent( document, 'touchstart', onTouchStart );
						Meny.unbindEvent( document, 'touchend', onTouchEnd );
					}
				}

				if( config.mouse ) {
					Meny.bindEvent( document, 'mousedown', onMouseDown );
					Meny.bindEvent( document, 'mouseup', onMouseUp );
					Meny.bindEvent( document, 'mousemove', onMouseMove );
				}
				else {
					Meny.unbindEvent( document, 'mousedown', onMouseDown );
					Meny.unbindEvent( document, 'mouseup', onMouseUp );
					Meny.unbindEvent( document, 'mousemove', onMouseMove );
				}
			}

			/**
			 * Expands the menu.
			 */
			function open() {
				if( !isOpen ) {
					isOpen = true;

					Meny.addClass( dom.wrapper, 'meny-active' );

					dom.cover.style.height = dom.contents.scrollHeight + 'px';
					dom.cover.style.visibility = 'visible';

					// Use transforms and transitions if available...
					if( supports3DTransforms ) {
						dom.cover.style.opacity = 1;

						dom.contents.style[ Meny.prefix( 'transform' ) ] = contentsTransformOpened;
						dom.menu.style[ Meny.prefix( 'transform' ) ] = menuTransformOpened;
					}
					// ...fall back on JS animation
					else {
						menuAnimation && menuAnimation.stop();
						menuAnimation = Meny.animate( dom.menu, menuStyleOpened, 500 );
						contentsAnimation && contentsAnimation.stop();
						contentsAnimation = Meny.animate( dom.contents, contentsStyleOpened, 500 );
						coverAnimation && coverAnimation.stop();
						coverAnimation = Meny.animate( dom.cover, { opacity: 1 }, 500 );
					}

					Meny.dispatchEvent( dom.menu, 'open' );
				}
			}

			/**
			 * Collapses the menu.
			 */
			function close() {
				if( isOpen ) {
					isOpen = false;

					Meny.removeClass( dom.wrapper, 'meny-active' );

					// Use transforms and transitions if available...
					if( supports3DTransforms ) {
						dom.cover.style.visibility = 'hidden';
						dom.cover.style.opacity = 0;

						dom.contents.style[ Meny.prefix( 'transform' ) ] = contentsTransformClosed;
						dom.menu.style[ Meny.prefix( 'transform' ) ] = menuTransformClosed;
					}
					// ...fall back on JS animation
					else {
						menuAnimation && menuAnimation.stop();
						menuAnimation = Meny.animate( dom.menu, menuStyleClosed, 500 );
						contentsAnimation && contentsAnimation.stop();
						contentsAnimation = Meny.animate( dom.contents, contentsStyleClosed, 500 );
						coverAnimation && coverAnimation.stop();
						coverAnimation = Meny.animate( dom.cover, { opacity: 0 }, 500, function() { dom.cover.style.visibility = 'hidden'; } );
					}

					Meny.dispatchEvent( dom.menu, 'close' );
				}
			}


			/// INPUT: /////////////////////////////////

			function onMouseDown( event ) {
				isMouseDown = true;
			}

			function onMouseMove( event ) {
				// Prevent opening/closing when mouse is down since
				// the user may be selecting text
				if( !isMouseDown ) {
					var x = event.clientX - indentX,
						y = event.clientY - indentY;

					switch( config.position ) {
						case POSITION_T:
							if( y > config.height ) {
								close();
							}
							else if( y < config.threshold ) {
								open();
							}
							break;

						case POSITION_R:
							var w = dom.wrapper.offsetWidth;
							if( x < w - config.width ) {
								close();
							}
							else if( x > w - config.threshold ) {
								open();
							}
							break;

						case POSITION_B:
							var h = dom.wrapper.offsetHeight;
							if( y < h - config.height ) {
								close();
							}
							else if( y > h - config.threshold ) {
								open();
							}
							break;

						case POSITION_L:
							if( x > config.width ) {
								close();
							}
							else if( x < config.threshold ) {
								open();
							}
							break;
					}
				}
			}

			function onMouseUp( event ) {
				isMouseDown = false;
			}

			function onTouchStart( event ) {
				touchStartX = event.touches[0].clientX - indentX;
				touchStartY = event.touches[0].clientY - indentY;
				touchMoveX = null;
				touchMoveY = null;

				Meny.bindEvent( document, 'touchmove', onTouchMove );
			}

			function onTouchMove( event ) {
				touchMoveX = event.touches[0].clientX - indentX;
				touchMoveY = event.touches[0].clientY - indentY;

				var swipeMethod = null;

				// Check for swipe gestures in any direction

				if( Math.abs( touchMoveX - touchStartX ) > Math.abs( touchMoveY - touchStartY ) ) {
					if( touchMoveX < touchStartX - config.threshold ) {
						swipeMethod = onSwipeRight;
					}
					else if( touchMoveX > touchStartX + config.threshold ) {
						swipeMethod = onSwipeLeft;
					}
				}
				else {
					if( touchMoveY < touchStartY - config.threshold ) {
						swipeMethod = onSwipeDown;
					}
					else if( touchMoveY > touchStartY + config.threshold ) {
						swipeMethod = onSwipeUp;
					}
				}

				if( swipeMethod && swipeMethod() ) {
					event.preventDefault();
				}
			}

			function onTouchEnd( event ) {
				Meny.unbindEvent( document, 'touchmove', onTouchMove );

				// If there was no movement this was a tap
				if( touchMoveX === null && touchMoveY === null ) {
					onTap();
				}
			}

			function onTap() {
				var isOverContent = ( config.position === POSITION_T && touchStartY > config.height ) ||
									( config.position === POSITION_R && touchStartX < dom.wrapper.offsetWidth - config.width ) ||
									( config.position === POSITION_B && touchStartY < dom.wrapper.offsetHeight - config.height ) ||
									( config.position === POSITION_L && touchStartX > config.width );

				if( isOverContent ) {
					close();
				}
			}

			function onSwipeLeft() {
				if( config.position === POSITION_R && isOpen ) {
					close();
					return true;
				}
				else if( config.position === POSITION_L && !isOpen ) {
					open();
					return true;
				}
			}

			function onSwipeRight() {
				if( config.position === POSITION_R && !isOpen ) {
					open();
					return true;
				}
				else if( config.position === POSITION_L && isOpen ) {
					close();
					return true;
				}
			}

			function onSwipeUp() {
				if( config.position === POSITION_B && isOpen ) {
					close();
					return true;
				}
				else if( config.position === POSITION_T && !isOpen ) {
					open();
					return true;
				}
			}

			function onSwipeDown() {
				if( config.position === POSITION_B && !isOpen ) {
					open();
					return true;
				}
				else if( config.position === POSITION_T && isOpen ) {
					close();
					return true;
				}
			}


			/// API: ///////////////////////////////////

			return {
				configure: configure,

				open: open,
				close: close,

				isOpen: function() {
					return isOpen;
				},

				/**
				 * Forward event binding to the menu DOM element.
				 */
				addEventListener: function( type, listener ) {
					dom.menu && Meny.bindEvent( dom.menu, type, listener );
				},
				removeEventListener: function( type, listener ) {
					dom.menu && Meny.unbindEvent( dom.menu, type, listener );
				}
			};

		})();
	},

	/**
	 * Helper method, changes an element style over time.
	 */
	animate: function( element, properties, duration, callback ) {
		return (function() {
			// Will hold start/end values for all properties
			var interpolations = {};

			// Format properties
			for( var p in properties ) {
				interpolations[p] = {
					start: parseFloat( element.style[p] ) || 0,
					end: parseFloat( properties[p] ),
					unit: ( typeof properties[p] === 'string' && properties[p].match( /px|em|%/gi ) ) ? properties[p].match( /px|em|%/gi )[0] : ''
				};
			}

			var animationStartTime = Date.now(),
				animationTimeout;

			// Takes one step forward in the animation
			function step() {
				// Ease out
				var progress = 1 - Math.pow( 1 - ( ( Date.now() - animationStartTime ) / duration ), 5 );

				// Set style to interpolated value
				for( var p in interpolations ) {
					var property = interpolations[p];
					element.style[p] = property.start + ( ( property.end - property.start ) * progress ) + property.unit;
				}

				// Continue as long as we're not done
				if( progress < 1 ) {
					animationTimeout = setTimeout( step, 1000 / 60 );
				}
				else {
					callback && callback();
					stop();
				}
			}

			// Cancels the animation
			function stop() {
				clearTimeout( animationTimeout );
			}

			// Starts the animation
			step();


			/// API: ///////////////////////////////////

			return {
				stop: stop
			};
		})();
	},

	/**
	 * Extend object a with the properties of object b.
	 * If there's a conflict, object b takes precedence.
	 */
	extend: function( a, b ) {
		for( var i in b ) {
			a[ i ] = b[ i ];
		}
	},

	/**
	 * Prefixes a style property with the correct vendor.
	 */
	prefix: function( property, el ) {
		var propertyUC = property.slice( 0, 1 ).toUpperCase() + property.slice( 1 ),
			vendors = [ 'Webkit', 'Moz', 'O', 'ms' ];

		for( var i = 0, len = vendors.length; i < len; i++ ) {
			var vendor = vendors[i];

			if( typeof ( el || document.body ).style[ vendor + propertyUC ] !== 'undefined' ) {
				return vendor + propertyUC;
			}
		}

		return property;
	},

	/**
	 * Adds a class to the target element.
	 */
	addClass: function( element, name ) {
		element.className = element.className.replace( /\s+$/gi, '' ) + ' ' + name;
	},

	/**
	 * Removes a class from the target element.
	 */
	removeClass: function( element, name ) {
		element.className = element.className.replace( name, '' );
	},

	/**
	 * Adds an event listener in a browser safe way.
	 */
	bindEvent: function( element, ev, fn ) {
		if( element.addEventListener ) {
			element.addEventListener( ev, fn, false );
		}
		else {
			element.attachEvent( 'on' + ev, fn );
		}
	},

	/**
	 * Removes an event listener in a browser safe way.
	 */
	unbindEvent: function( element, ev, fn ) {
		if( element.removeEventListener ) {
			element.removeEventListener( ev, fn, false );
		}
		else {
			element.detachEvent( 'on' + ev, fn );
		}
	},

	/**
	 * Dispatches an event of the specified type from the
	 * menu DOM element.
	 */
	dispatchEvent: function( element, type, properties ) {
		if( element ) {
			var event = document.createEvent( "HTMLEvents", 1, 2 );
			event.initEvent( type, true, true );
			Meny.extend( event, properties );
			element.dispatchEvent( event );
		}
	},

	/**
	 * Retrieves query string as a key/value hash.
	 */
	getQuery: function() {
		var query = {};

		location.search.replace( /[A-Z0-9]+?=([\w|:|\/\.]*)/gi, function(a) {
			query[ a.split( '=' ).shift() ] = a.split( '=' ).pop();
		} );

		return query;
	}
};

if( typeof Date.now !== 'function' ) Date.now = function() { return new Date().getTime(); };
