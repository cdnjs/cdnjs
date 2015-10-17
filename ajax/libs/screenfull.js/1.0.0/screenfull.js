/*!
* screenfull.js
* v1.0.0 - 2012-05-02
* https://github.com/sindresorhus/screenfull.js
* (c) Sindre Sorhus; MIT License
*/

/*global Element */
(function( window, document ) {
	'use strict';

	var keyboardAllowed = typeof Element !== 'undefined' && 'ALLOW_KEYBOARD_INPUT' in Element, // IE6 throws without typeof check

		fn = (function() {
			var fnMap = [
				[
					'requestFullscreen',
					'exitFullscreen',
					'fullscreenchange',
					'fullscreen',
					'fullscreenElement',
					'fullscreenerror'
				],
				[
					'webkitRequestFullScreen',
					'webkitCancelFullScreen',
					'webkitfullscreenchange',
					'webkitIsFullScreen',
					'webkitCurrentFullScreenElement',
					'webkitfullscreenerror'

				],
				[
					'mozRequestFullScreen',
					'mozCancelFullScreen',
					'mozfullscreenchange',
					'mozFullScreen',
					'mozFullScreenElement',
					'mozfullscreenerror'
				],
			],
			i = 0,
			l = fnMap.length,
			ret = {},
			val,
			valLength;

			for ( ; i < l; i++ ) {
				val = fnMap[ i ];
				if ( val && val[1] in document ) {
					for ( i = 0, valLength = val.length; i < valLength; i++ ) {
						ret[ fnMap[0][ i ] ] = val[ i ];
					}
					return ret;
				}
			}
			return false;
		})(),

		screenfull = {
			isFullscreen: document[ fn.fullscreen ],
			element: document[ fn.fullscreenElement ],

			request: function( elem ) {
				var request = fn.requestFullscreen;

				elem = elem || document.documentElement;
				elem[ request ]( keyboardAllowed && Element.ALLOW_KEYBOARD_INPUT );

				// Work around Safari 5.1 bug: reports support for
				// keyboard in fullscreen even though it doesn't.
				if ( !document.isFullscreen ) {
					elem[ request ]();
				}
			},

			exit: function() {
				document[ fn.exitFullscreen ]();
			},

			toggle: function( elem ) {
				if ( this.isFullscreen ) {
					this.exit();
				} else {
					this.request( elem );
				}
			},

			onchange: function() {},
			onerror: function() {}
		};

	if ( !fn ) {
		window.screenfull = null;
		return;
	}

	document.addEventListener( fn.fullscreenchange, function( e ) {
		screenfull.isFullscreen = document[ fn.fullscreen ];
		screenfull.element = document[ fn.fullscreenElement ];
		screenfull.onchange.call( screenfull, e );
	});

	document.addEventListener( fn.fullscreenerror, function( e ) {
		screenfull.onerror.call( screenfull, e );
	});

	window.screenfull = screenfull;

})( window, document );