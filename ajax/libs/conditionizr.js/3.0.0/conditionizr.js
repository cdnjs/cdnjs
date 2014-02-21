/*!
 *  Conditionizr v3.0.0
 *  by Todd Motto & Mark Goodyear
 *  @toddmotto    & @markgdyr
 *  GitHub: https://github.com/conditionizr/conditionizr
 */

(function ( window, document, undefined ) {

	'use strict'; // ECMA 5

	window.conditionizr = function ( options ) {

		var baseSettings = {
			scripts: false,
			styles: false,
			classes: true,
			customScript: false
		};
		
		document.documentElement.id = 'conditionizr';
		
		var settings = {
			debug     : false,
			scriptSrc : 'js/conditionizr/',
			styleSrc  : 'css/conditionizr/',
			ieLessThan: {
				active: false,
				version: '9',
				scripts: false,
				styles: false,
				classes: true,
				customScript: false
			},
			chrome    : baseSettings[0],
			safari    : baseSettings[0],
			opera     : baseSettings[0],
			firefox   : baseSettings[0],
			ie10      : baseSettings[0],
			ie9       : baseSettings[0],
			ie8       : baseSettings[0],
			ie7       : baseSettings[0],
			ie6       : baseSettings[0],
			retina    : baseSettings[0],		
			mac       : true,
			win       : true,
			x11       : true,
			linux     : true
		};

		function conditionizrMerge( obj1, obj2 ) {
			for ( var p in obj2 ) {
				try {
					if ( obj2[p].constructor == Object ) {
						obj1[p] = conditionizrMerge( obj1[p], obj2[p] );
					} else {
						obj1[p] = obj2[p];
					}
				} catch ( e ) {
					obj1[p] = obj2[p];
				}
			}
			return obj1;
		}

		if ( options ) {
			conditionizrMerge( settings, options );
		}

		function conditionizrLoader() {

			for ( var resourceType in browserSettings ) {
				var val = browserSettings[resourceType];
				var head = document.getElementsByTagName( 'head' )[0];

				if ( val ) {
					switch ( resourceType ) {
						case 'classes':
							document.documentElement.className += ' ' + theBrowser;
						break;
						case 'scripts':
							var scriptTag = document.createElement( 'script' );
							scriptTag.src = settings.scriptSrc + theBrowser + '.js';
							head.appendChild( scriptTag );
						break;
						case 'styles':
							var linkTag = document.createElement( 'link' );
							linkTag.rel = 'stylesheet';
							linkTag.href = settings.styleSrc + theBrowser + '.css';
							head.appendChild( linkTag );
						break;
						case 'customScript':
							var strip = browserSettings.customScript.replace(/\s/g, '');
							var customSplit = strip.split( ',' );
							for( var i = 0; i < customSplit.length; i++ ) {
								var customScriptTag = document.createElement( 'script' );
								customScriptTag.src = customSplit[i];
								head.appendChild( customScriptTag );
							}
						break;
					}
				}
			}
		}

		var actualBrowser = '';

		var browsers = [ 'chrome', 'safari', 'firefox', 'opera' ];
		
		for ( var i = 0; i < browsers.length; i++ ) {
			var theBrowser = browsers[i];

			if ( navigator.userAgent.toLowerCase().indexOf( theBrowser ) > -1 ) {
				var browserSettings = settings[theBrowser];	
				conditionizrLoader();
				actualBrowser = theBrowser;
				break;
			}
		}
		
		var ie = (function () {
		    for ( var v = 3, 
		    	  el = document.createElement( 'b' ),
		    	  all = el.all || []; el.innerHTML = '<!--[if gt IE ' + (++v) + ']><i><![endif]-->',
		    	  all[0]; );
		    return v > 4 ? v : document.documentMode;
		})();
		
		if ( ie < settings.ieLessThan.version + '.0' ) {
			var theBrowser = 'lt-ie' + settings.ieLessThan.version;
			var browserSettings = settings.ieLessThan;
			conditionizrLoader();
		}
			
		for( var i = 6; i < 11; i++ ) {
			if ( ie === i ) {
				var theBrowser	= 'ie'+i;
				var browserSettings = settings[theBrowser];
				conditionizrLoader();
				actualBrowser = theBrowser;
			}
		}
		
		var browserExtras = '';

		if ( window.devicePixelRatio >= 1.5 ) {

			var browserSettings = settings.retina;
			var theBrowser = 'retina';

			conditionizrLoader();

			browserExtras += ' ' + theBrowser;
			theBrowser = actualBrowser;

		} else {
			document.documentElement.className += ' no-retina';
		}

		if ( 'ontouchstart' in window || window.navigator.msMaxTouchPoints ) {

			var browserSettings = settings.touch;
			var	theBrowser = 'touch';

			conditionizrLoader();

			browserExtras += ' ' + theBrowser;
			theBrowser = actualBrowser;

		} else {
			document.documentElement.className += ' no-touch';
		}

		var oSystems = [ 'Win', 'Mac', 'X11', 'Linux' ];

		for ( var i = 0; i < oSystems.length; i++ ) {

			var currentPlatform = oSystems[i]
				
			if ( navigator.appVersion.indexOf( currentPlatform ) > -1 ) {
				var osSettings = settings[currentPlatform.toLowerCase()];
				var theOS = currentPlatform;
				
				if (osSettings) {
					document.documentElement.className += ' ' + currentPlatform.toLowerCase();
				}
				break;
			}
		}

		if ( settings.debug ) {
			console.log(
			    'Conditionizr Debug' + 
			    '\nScripts: ' + settings.scriptSrc + 
			    '\nStyles: ' + settings.styleSrc + 
			    '\nBrowser: ' + theBrowser + 
			    '\nOS: ' + theOS + 
			    '\nExtras: ' + browserExtras + '\n'
			);
		}
	};

})( window, document );