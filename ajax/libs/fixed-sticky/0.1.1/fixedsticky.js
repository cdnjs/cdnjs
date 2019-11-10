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
		update: function( el ) {
			// Only exec if native sticky isn’t supported, fixed is supported,
			// and if fixed-fixed is also included on the page and is supported
			if( S.tests.sticky || !S.tests.fixed || win.FixedFixed && !$( win.document.documentElement ).hasClass( 'fixed-supported' ) ) {
				return;
			}

			if( !el.offsetWidth ) {
				return;
			}

			var $el = $( el ),
				keys = {
					offset: 'fixedStickyOffset'
				},
				height = $el.outerHeight(),
				initialOffset = $el.data( keys.offset ),
				scroll = S.getScrollTop(),
				isAlreadyOn = $el.is( '.' + S.classes.active ),
				toggle = function( turnOn ) {
					$el[ turnOn ? 'addClass' : 'removeClass' ]( S.classes.active );
				},
				viewportHeight = $( window ).height();

			if( !initialOffset ) {
				initialOffset = $el.offset().top;

				$el.data( keys.offset, initialOffset );
				$el.after( $( '<div>' ).addClass( S.classes.clone ).height( height ) );
			}

			if( $el.css( 'top' ) !== 'auto' && initialOffset < scroll || 
				$el.css( 'bottom' ) !== 'auto' && initialOffset > scroll + viewportHeight - ( height || 0 ) ) {

				if( !isAlreadyOn ) {
					toggle( true );
				}
			} else {
				if( isAlreadyOn ) {
					toggle( false );
				}
			}
		},
		init: function( el ) {
			var $el = $( el );

			$( win ).bind( 'scroll', function() {
				S.update( el );
			}).trigger( 'scroll' );

			$( win ).bind( 'resize', function() {
				if( $el.is( '.' + S.classes.active ) ) {
					S.update( el );
				}
			});
		}
	};

	// Expose Global
	win.FixedSticky = S;

	// Plugin
	$.fn.fixedsticky = function(){
		return this.each(function () {
			S.init( this );
		});
	};

	// Add fallback when fixed-fixed is not available.
	if( !win.FixedFixed ) {
		$( win.document.documentElement ).addClass( S.classes.withoutFixedFixed );
	}

})( this, jQuery );