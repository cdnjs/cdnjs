;(function( win, $ ) {

	function featureTest( property, value, noPrefixes ) {
		// Thanks Modernizr! https://github.com/phistuck/Modernizr/commit/3fb7217f5f8274e2f11fe6cfeda7cfaf9948a1f5
		var prop = property + ':',
			el = document.createElement( 'test' ),
			mStyle = el.style;

		if( !noPrefixes ) {
			mStyle.cssText = prop + [ '-webkit-', '-moz-', '-ms-', '-o-', '' ].join( value + ';' + prop ) + value + ';';
		} else {
			mStyle.cssText = prop + value;
		}
		return mStyle[ property ].indexOf( value ) !== -1;
	}

	var S = {
		classes: {
			plugin: 'fixedsticky',
			active: 'fixedsticky-on',
			clone: 'fixedsticky-dummy',
			withoutFixedFixed: 'fixedsticky-withoutfixedfixed'
		},
		keys: {
			offset: 'fixedStickyOffset',
			position: 'fixedStickyPosition'
		},
		tests: {
			sticky: featureTest( 'position', 'sticky' ),
			fixed: featureTest( 'position', 'fixed', true )
		},
		// Thanks jQuery!
		getScrollTop: function() {
			var prop = 'pageYOffset',
				method = 'scrollTop';
			return win ? (prop in win) ? win[ prop ] :
				win.document.documentElement[ method ] :
				win.document.body[ method ];
		},
		hasFixSticky: function() {
			// Check  native sticky, check fixed and if fixed-fixed is also included on the page and is supported
			return !!( S.tests.sticky || !S.tests.fixed || win.FixedFixed && !$( win.document.documentElement ).hasClass( 'fixed-supported' ) );
		},
		update: function( el ) {
			if( !el.offsetWidth ) return;

			var $el = $( el ),
				height = $el.outerHeight(),
				initialOffset = $el.data( S.keys.offset ),
				scroll = S.getScrollTop(),
				isAlreadyOn = $el.is( '.' + S.classes.active ),
				toggle = function( turnOn ) {
					$el[ turnOn ? 'addClass' : 'removeClass' ]( S.classes.active );
				},
				viewportHeight = $( window ).height(),
				position = $el.data( S.keys.position ),
				skipSettingToFixed,
				elTop,
				elBottom;

			if( !initialOffset ) {
				initialOffset = $el.offset().top;
				$el.data( S.keys.offset, initialOffset );
				$el.after( $( '<div>' ).addClass( S.classes.clone ).height( height ) );
			}

			if( !position ) {
				// Some browsers require fixed/absolute to report accurate top/left values.
				skipSettingToFixed = $el.css( 'top' ) !== 'auto' || $el.css( 'bottom' ) !== 'auto';

				if( !skipSettingToFixed ) {
					$el.css( 'position', 'fixed' );
				}

				position = {
					top: $el.css( 'top' ) !== 'auto',
					bottom: $el.css( 'bottom' ) !== 'auto'
				};

				if( !skipSettingToFixed ) {
					$el.css( 'position', '' );
				}

				$el.data( S.keys.position, position );
			}

			elTop = parseInt( $( el ).css( 'top' ), 10 ) || 0;
			elBottom = parseInt( $( el ).css( 'bottom' ), 10 ) || 0;

			if( position.top && initialOffset < ( scroll + elTop ) ||
				position.bottom && initialOffset > scroll + viewportHeight - ( height || 0 ) - elBottom ) {

				if( !isAlreadyOn ) {
					toggle( true );
				}
			} else {
				if( isAlreadyOn ) {
					toggle( false );
				}
			}
		},
		destroy: function( el ) {
			var $el = $( el );
			if (S.hasFixSticky()) return;

			$( win ).unbind( '.fixedsticky' );

			return $el.each(function() {
				$( this )
					.removeData( [ S.keys.offset, S.keys.position ] )
					.removeClass( S.classes.active )
					.nextUntil( S.classes.clone ).remove();
			});
		},
		init: function( el ) {
			var $el = $( el );

			if( S.hasFixSticky() ) {
				return;
			}

			return $el.each(function() {
				var _this = this;
				$( win ).bind( 'scroll.fixedsticky', function() {
					S.update( _this );
				}).trigger( 'scroll.fixedsticky' );

				$( win ).bind( 'resize.fixedsticky', function() {
					if( $el.is( '.' + S.classes.active ) ) {
						S.update( _this );
					}
				});
			});
		}
	};

	win.FixedSticky = S;

	// Plugin
	$.fn.fixedsticky = function( method ) {
		if ( typeof S[ method ] === 'function') {
			return S[ method ].call( S, this);
		} else if ( typeof method === 'object' || ! method ) {
			return S.init.call( S, this );
		} else {
			throw new Error( 'Method `' +  method + '` does not exist on jQuery.fixedsticky' );
		}
	};

	// Add fallback when fixed-fixed is not available.
	if( !win.FixedFixed ) {
		$( win.document.documentElement ).addClass( S.classes.withoutFixedFixed );
	}

})( this, jQuery );