/*! Respimg - Responsive Images that work today.
 *  Author: Alexander Farkas, 2014
 *  Author: Scott Jehl, Filament Group, 2012 ( new proposal implemented by Shawn Jansepar )
 *  License: MIT
 *  Spec: http://picture.responsiveimages.org/
 */
(function( window, document, undefined ) {
	// Enable strict mode
	"use strict";
	if ( typeof RIDEBUG == "undefined" ) {
		window.RIDEBUG = true;
	}

	var lowTreshHold, partialLowTreshHold, isLandscape, lazyFactor, tMemory, substractCurRes, warn, eminpx,
		alwaysCheckWDescriptor, resizeThrottle, evalID;
	// local object for method references and testing exposure
	var ri = {};
	var noop = function() {};
	var image = document.createElement( "img" );
	var getImgAttr = image.getAttribute;
	var setImgAttr = image.setAttribute;
	var removeImgAttr = image.removeAttribute;
	var docElem = document.documentElement;
	var types = {};
	var cfg = {
		//resource selection:
		xQuant: 1,
		lazyFactor: 0.4,
		maxX: 2
	};
	var srcAttr = "data-risrc";
	var srcsetAttr = srcAttr + "set";
	var reflowBug = "webkitBackfaceVisibility" in docElem.style;
	var ua = navigator.userAgent;
	var supportAbort = (/rident/).test(ua) || ((/ecko/).test(ua) && ua.match(/rv\:(\d+)/) && RegExp.$1 > 35 );
	var curSrcProp = "currentSrc";
	var regWDesc = /\s+\+?\d+(e\d+)?w/;
	var regSize = /((?:\([^)]+\)(?:\s*and\s*|\s*or\s*|\s*not\s*)?)+)?\s*(.+)/;
	var regDescriptor =  /^([\+eE\d\.]+)(w|x)$/; // currently no h
	var regHDesc = /\s*\d+h\s*/;
	var setOptions = window.respimgCFG;
	/**
	 * Shortcut property for https://w3c.github.io/webappsec/specs/mixedcontent/#restricts-mixed-content ( for easy overriding in tests )
	 */
	var isSSL = location.protocol == "https:";
	// baseStyle also used by getEmValue (i.e.: width: 1em is important)
	var baseStyle = "position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)";
	var fsCss = "font-size:100%!important;";
	var isVwDirty = true;

	var cssCache = {};
	var sizeLengthCache = {};
	var DPR = window.devicePixelRatio;
	var units = {
		px: 1,
		'in': 96
	};
	var anchor = document.createElement( "a" );
	/**
	 * alreadyRun flag used for setOptions. is it true setOptions will reevaluate
	 * @type {boolean}
	 */
	var alreadyRun = false;

	var on = function(obj, evt, fn, capture) {
		if ( obj.addEventListener ) {
			obj.addEventListener(evt, fn, capture || false);
		} else if ( obj.attachEvent ) {
			obj.attachEvent( "on"+ evt, fn);
		}
	};

	var off = function(obj, evt, fn, capture) {
		if ( obj.removeEventListener ) {
			obj.removeEventListener(evt, fn, capture || false);
		} else if ( obj.detachEvent ) {
			obj.detachEvent( "on"+ evt, fn);
		}
	};

	/**
	 * simple memoize function:
	 */

	var memoize = function(fn) {
		var cache = {};
		return function(input) {
			if ( !(input in cache) ) {
				cache[ input ] = fn(input);
			}
			return cache[ input ];
		};
	};

	/**
	 * gets a mediaquery and returns a boolean or gets a css length and returns a number
	 * @param css mediaqueries or css length
	 * @returns {boolean|number}
	 *
	 * based on: https://gist.github.com/jonathantneal/db4f77009b155f083738
	 */
	var evalCSS = (function(){
		var regLength = /^([\d\.]+)(em|vw|px)$/;
		var replace = function() {
			var args = arguments, index = 0, string = args[0];
			while (++index in args) {
				string = string.replace(args[index], args[++index]);
			}
			return string;
		};

		var buidlStr = memoize(function(css) {
			return "return " + replace((css || "").toLowerCase(),
					// interpret `and`
					/\band\b/g, "&&",

					// interpret `,`
					/,/g, "||",

					// interpret `min-` as >=
					/min-([a-z-\s]+):/g, "e.$1>=",

					// interpret `min-` as <=
					/max-([a-z-\s]+):/g, "e.$1<=",

					//calc value
					/calc([^)]+)/g, "($1)",

					// interpret css values
					/(\d+[\.]*[\d]*)([a-z]+)/g, "($1 * e.$2)",
					//make eval less evil
					/^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/ig, ""
				);
		});

		return function(css, length) {
			var parsedLength;
			if (!(css in cssCache)) {
				cssCache[css] = false;
				if(length && (parsedLength = css.match( regLength ))){
					cssCache[css] = parsedLength[ 1 ] * units[parsedLength[ 2 ]];
				} else {
					/*jshint evil:true */
					try{
						cssCache[css] = new Function("e", buidlStr(css))(units);
					} catch(e){}
					/*jshint evil:false */
				}
			}
			return cssCache[css];
		};
	})();

	var setResolution = function ( candidate, sizesattr ) {
		if ( candidate.w ) { // h = means height: || descriptor.type == 'h' do not handle yet...
			candidate.cWidth = ri.calcListLength( sizesattr || "100vw" );
			candidate.res = candidate.w / candidate.cWidth ;
		} else {
			candidate.res = candidate.x;
		}
		return candidate;
	};

	/**
	 *
	 * @param opt
	 */
	var respimage = function( opt ) {
		var elements, i, plen;

		var options = opt || {};

		if ( options.elements && options.elements.nodeType == 1 ) {
			if ( options.elements.nodeName.toUpperCase() == "IMG" ) {
				options.elements =  [ options.elements ];
			} else {
				options.context = options.elements;
				options.elements =  null;
			}
		}

		if(options.reparse){
			options.reevaluate = true;
			if(window.console && console.warn){
				console.warn('reparse was renamed to reevaluate!');
			}
		}

		elements = options.elements || ri.qsa( (options.context || document), ( options.reevaluate || options.reselect ) ? ri.sel : ri.selShort );

		if ( (plen = elements.length) ) {

			ri.setupRun( options );
			alreadyRun = true;

			// Loop through all elements

			for ( i = 0; i < plen; i++ ) {
				ri.fillImg(elements[ i ], options);
			}
			ri.teardownRun( options );
		}
	};

	var parseDescriptor = memoize(function ( descriptor ) {

		var descriptorObj = [1, 'x'];
		var parsedDescriptor = trim( descriptor || "" );

		if ( parsedDescriptor ) {
			parsedDescriptor = parsedDescriptor.replace(regHDesc, "");
			if ( ( parsedDescriptor ).match( regDescriptor ) ) {

				descriptorObj = [RegExp.$1 * 1, RegExp.$2];

				if ( RIDEBUG && (
						descriptorObj[0] < 0 ||
						isNaN( descriptorObj[0] ) ||
						(descriptorObj[1] == "w" && /\./.test(''+descriptorObj[0]))
					) ) {
					warn( "bad descriptor: " + descriptor );
				}
			} else {
				descriptorObj = false;

				if ( RIDEBUG ) {
					warn( "unknown descriptor: " + descriptor );
				}
			}
		}

		return descriptorObj;
	});

	/**
	 * outputs a warning for the developer
	 * @param {message}
	 * @type {Function}
	 */
	if(RIDEBUG){
		warn = ( window.console && console.warn ) ?
			function( message ) {
				console.warn( message );
			} :
			noop
		;
	}

	if( !(curSrcProp in image) ){
		curSrcProp = "src";
	}

	// Add support for standard mime types.
	types["image/jpeg"] = true;
	types["image/gif"] = true;
	types["image/png"] = true;

	// test svg support
	types[ "image/svg+xml" ] = document.implementation.hasFeature( "http://wwwindow.w3.org/TR/SVG11/feature#Image", "1.1" );

	/**
	 * a trim workaroung mainly for IE8
	 * @param str
	 * @returns {string}
	 */
	function trim( str ) {
		return str.trim ? str.trim() : str.replace( /^\s+|\s+$/g, "" );
	}

	/**
	 * updates the internal vW property with the current viewport width in px
	 */
	function updateMetrics() {
		var dprM;

		isVwDirty = false;
		DPR = window.devicePixelRatio;
		cssCache = {};
		sizeLengthCache = {};

		dprM = (DPR || 1) * cfg.xQuant;

		if(!cfg.uT){
			cfg.maxX = Math.max(1.3, cfg.maxX);
			dprM = Math.min( dprM, cfg.maxX );

			ri.DPR = dprM;
		}

		units.width = Math.max(window.innerWidth || 0, docElem.clientWidth);
		units.height = Math.max(window.innerHeight || 0, docElem.clientHeight);

		units.vw = units.width / 100;
		units.vh = units.height / 100;

		units.em = ri.getEmValue();
		units.rem = units.em;

		lazyFactor = cfg.lazyFactor / 2;

		lazyFactor = (lazyFactor * dprM) + lazyFactor;

		substractCurRes = 0.4 + (0.1 * dprM);

		lowTreshHold = 0.5 + (0.2 * dprM);

		partialLowTreshHold = 0.5 + (0.25 * dprM);

		tMemory = dprM + 1.3;

		if(!(isLandscape = units.width > units.height)){
			lazyFactor *= 0.9;
		}
		if(supportAbort){
			lazyFactor *= 0.9;
		}

		evalID = [units.width, units.height, dprM].join('-');
	}

	function chooseLowRes( lowRes, diff, dpr ) {
		var add = diff * Math.pow(lowRes - 0.4, 1.9);
		if(!isLandscape){
			add /= 1.3;
		}

		lowRes += add;
		return lowRes > dpr;
	}

	function applyBestCandidate( img ) {
		var srcSetCandidates;
		var matchingSet = ri.getSet( img );
		var evaluated = false;
		if ( matchingSet != "pending" ) {
			evaluated = evalID;
			if ( matchingSet ) {
				srcSetCandidates = ri.setRes( matchingSet );
				evaluated = ri.applySetCandidate( srcSetCandidates, img );
			}

		}
		img[ ri.ns ].evaled = evaluated;
	}

	function ascendingSort( a, b ) {
		return a.res - b.res;
	}

	function setSrcToCur( img, src, set ) {
		var candidate;
		if ( !set && src ) {
			set = img[ ri.ns ].sets;
			set = set && set[set.length - 1];
		}

		candidate = getCandidateForSrc(src, set);

		if ( candidate ) {
			src = ri.makeUrl(src);
			img[ ri.ns ].curSrc = src;
			img[ ri.ns ].curCan = candidate;

			if ( !candidate.res ) {
				setResolution( candidate, candidate.set.sizes );
			}
		}
		return candidate;
	}

	function getCandidateForSrc( src, set ) {
		var i, candidate, candidates;
		if ( src && set ) {
			candidates = ri.parseSet( set );
			src = ri.makeUrl(src);
			for ( i = 0; i < candidates.length; i++ ) {
				if ( src == ri.makeUrl(candidates[ i ].url) ) {
					candidate = candidates[ i ];
					break;
				}
			}
		}
		return candidate;
	}


	function getAllSourceElements( picture, candidates ) {
		var i, len, source, srcset;

		// SPEC mismatch intended for size and perf:
		// actually only source elements preceding the img should be used
		// also note: don't use qsa here, because IE8 sometimes doesn't like source as the key part in a selector
		var sources = picture.getElementsByTagName( "source" );

		for ( i = 0, len = sources.length; i < len; i++ ) {
			source = sources[ i ];
			source[ ri.ns ] = true;
			srcset = source.getAttribute( "srcset" );

			if ( RIDEBUG && document.documentMode != 9 && source.parentNode != picture ) {
				warn( "all source elements have to be a child of the picture element. For IE9 support wrap them in an audio/video element, BUT with conditional comments" );
			}
			// if source does not have a srcset attribute, skip
			if ( srcset ) {
				candidates.push( {
					srcset: srcset,
					media: source.getAttribute( "media" ),
					type: source.getAttribute( "type" ),
					sizes: source.getAttribute( "sizes" )
				} );
			}
			if ( RIDEBUG && source.getAttribute( "src" ) ) {
				warn( "`src` on `source` invalid, use `srcset`." );
			}
		}

		if ( RIDEBUG ) {
			var srcTest = ri.qsa( picture, "source, img");
			if ( srcTest[ srcTest.length - 1].nodeName.toUpperCase() == "SOURCE" ) {
				warn( "all sources inside picture have to precede the img element" );
			}
		}
	}

	// namespace
	ri.ns = ("ri" + new Date().getTime()).substr(0, 9);

	// srcset support test
	ri.supSrcset = "srcset" in image;
	ri.supSizes = "sizes" in image;

	// using ri.qsa instead of dom traversing does scale much better,
	// especially on sites mixing responsive and non-responsive images
	ri.selShort = "picture>img,img[srcset]";
	ri.sel = ri.selShort;
	ri.cfg = cfg;

	if ( ri.supSrcset ) {
		ri.sel += ",img[" + srcsetAttr + "]";
	}

	/**
	 * Shortcut property for `devicePixelRatio` ( for easy overriding in tests )
	 */
	ri.DPR = (DPR  || 1 );
	ri.u = units;

	// container of supported mime types that one might need to qualify before using
	ri.types =  types;

	alwaysCheckWDescriptor = ri.supSrcset && !ri.supSizes;

	ri.setSize = noop;

	/**
	 * Gets a string and returns the absolute URL
	 * @param src
	 * @returns {String} absolute URL
	 */
	ri.makeUrl = memoize(function(src) {
		anchor.href = src;
		return anchor.href;
	});

	/**
	 * Gets a DOM element or document and a selctor and returns the found matches
	 * Can be extended with jQuery/Sizzle for IE7 support
	 * @param context
	 * @param sel
	 * @returns {NodeList}
	 */
	ri.qsa = function(context, sel) {
		return context.querySelectorAll(sel);
	};

	/**
	 * Shortcut method for matchMedia ( for easy overriding in tests )
	 * wether native or ri.mMQ is used will be decided lazy on first call
	 * @returns {boolean}
	 */
	ri.matchesMedia = function() {
		if ( window.matchMedia && (matchMedia( "(min-width: 0.1em)" ) || {}).matches ) {
			ri.matchesMedia = function( media ) {
				return !media || ( matchMedia( media ).matches );
			};
		} else {
			ri.matchesMedia = ri.mMQ;
		}

		return ri.matchesMedia.apply( this, arguments );
	};

	/**
	 * A simplified matchMedia implementation for IE8 and IE9
	 * handles only min-width/max-width with px or em values
	 * @param media
	 * @returns {boolean}
	 */
	ri.mMQ = function( media ) {
		return media ? evalCSS(media) : true;
	};


	/**
	 * Returns the calculated length in css pixel from the given sourceSizeValue
	 * http://dev.w3.org/csswg/css-values-3/#length-value
	 * intended Spec mismatches:
	 * * Does not check for invalid use of CSS functions
	 * * Does handle a computed length of 0 the same as a negative and therefore invalid value
	 * @param sourceSizeValue
	 * @returns {Number}
	 */
	ri.calcLength = function( sourceSizeValue ) {

		var value = evalCSS(sourceSizeValue, true) || false;
		if(value < 0){
			value = false;
		}

		if ( RIDEBUG && (value === false || value < 0) ) {
			warn( "invalid source size: " + sourceSizeValue );
		}
		return value;
	};

	/**
	 * Takes a type string and checks if its supported
	 */

	ri.supportsType = function( type ) {
		return ( type ) ? types[ type ] : true;
	};

	/**
	 * Parses a sourceSize into mediaCondition (media) and sourceSizeValue (length)
	 * @param sourceSizeStr
	 * @returns {*}
	 */
	ri.parseSize = memoize(function( sourceSizeStr ) {
		var match = ( sourceSizeStr || "" ).match(regSize);
		return {
			media: match && match[1],
			length: match && match[2]
		};
	});

	ri.parseSet = function( set ) {
		/*
		 * A lot of this was pulled from Boris Smus’ parser for the now-defunct WHATWG `srcset`
		 * https://github.com/borismus/srcset-polyfill/blob/master/js/srcset-info.js
		 *
		 * 1. Let input (`srcset`) be the value passed to this algorithm.
		 * 2. Let position be a pointer into input, initially pointing at the start of the string.
		 * 3. Let raw candidates be an initially empty ordered list of URLs with associated
		 * unparsed descriptors. The order of entries in the list is the order in which entries
		 * are added to the list.
		 */

		if ( !set.cands ) {

			var pos, url, descriptor, last, descpos, can, firstDescriptorType;
			var srcset = set.srcset;

			set.cands = [];

			while ( srcset ) {
				srcset = srcset.replace(/^\s+/g,"");
				// 5. Collect a sequence of characters that are not space characters, and let that be url.
				pos = srcset.search(/\s/g);
				descriptor = null;
				if ( pos != -1 ) {
					url = srcset.slice( 0, pos );
					last = url.charAt( url.length - 1 );
					// 6. If url ends with a U+002C COMMA character (,), remove that character from url
					// and let descriptors be the empty string. Otherwise, follow these substeps
					// 6.1. If url is empty, then jump to the step labeled descriptor parser.
					if ( last == "," || !url ) {
						url = url.replace(/,+$/, "");
						descriptor = "";
					}
					srcset = srcset.slice( pos + 1 );
					// 6.2. Collect a sequence of characters that are not U+002C COMMA characters (,), and
					// let that be descriptors.
					if ( descriptor == null ) {
						descpos = srcset.indexOf( "," );
						if ( descpos != -1 ) {
							descriptor = srcset.slice( 0, descpos );
							srcset = srcset.slice( descpos + 1 );
						} else {
							descriptor = srcset;
							srcset = "";
						}
					}
				} else {
					url = srcset;
					srcset = "";
				}

				// 7. Add url to raw candidates, associated with descriptors.
				if ( url && (descriptor = parseDescriptor( descriptor )) ) {

					if ( RIDEBUG ) {
						if ( !firstDescriptorType ) {
							firstDescriptorType = set.sizes ? "w" : descriptor[1];
						}
						if ( firstDescriptorType != descriptor[1] ) {
							warn("mixing x with a w descriptor/sizes attribute in one srcset doesn't make sense in most cases and is invalid.");
						}
					}
					can = {
						url: url.replace(/^,+/, ""),
						set: set
					};
					can[descriptor[1]] = descriptor[0];

					if(descriptor[1] == 'x' && descriptor[0] == 1){
						set.has1x = true;
					}

					set.cands.push(can);
				}
			}
		}

		return set.cands;
	};

	/**
	 * returns 1em in css px for html/body default size
	 * function taken from respondjs
	 * @returns {*|number}
	 */
	ri.getEmValue = function() {
		var body;
		if ( !eminpx && (body = document.body) ) {
			var div = document.createElement( "div" ),
				originalHTMLCSS = docElem.style.cssText,
				originalBodyCSS = body.style.cssText;

			div.style.cssText = baseStyle;

			// 1em in a media query is the value of the default font size of the browser
			// reset docElem and body to ensure the correct value is returned
			docElem.style.cssText = fsCss;
			body.style.cssText = fsCss;

			body.appendChild( div );
			eminpx = div.offsetWidth;
			body.removeChild( div );

			//also update eminpx before returning
			eminpx = parseFloat( eminpx, 10 );

			// restore the original values
			docElem.style.cssText = originalHTMLCSS;
			body.style.cssText = originalBodyCSS;

		}
		return eminpx || 16;
	};


	/**
	 * Takes a string of sizes and returns the width in pixels as a number
	 */
	ri.calcListLength = function( sourceSizeListStr ) {
		// Split up source size list, ie ( max-width: 30em ) 100%, ( max-width: 50em ) 50%, 33%
		//
		//                           or (min-width:30em) calc(30% - 15px)
		if ( !(sourceSizeListStr in sizeLengthCache) || cfg.uT ) {
			var sourceSize, parsedSize, length, media, i, len;
			var sourceSizeList = trim( sourceSizeListStr ).split( /\s*,\s*/ );
			var winningLength = false;
			for ( i = 0, len = sourceSizeList.length; i < len; i++ ) {
				// Match <media-condition>? length, ie ( min-width: 50em ) 100%
				sourceSize = sourceSizeList[ i ];
				// Split "( min-width: 50em ) 100%" into separate strings
				parsedSize = ri.parseSize( sourceSize );
				length = parsedSize.length;
				media = parsedSize.media;

				if ( !length ) {
					continue;
				}
				// if there is no media query or it matches, choose this as our winning length
				// and end algorithm
				if ( ri.matchesMedia( media ) && (winningLength = ri.calcLength( length )) !== false ) {
					break;
				}
			}
			// pass the length to a method that can properly determine length
			// in pixels based on these formats: http://dev.w3.org/csswg/css-values-3/#length-value
			sizeLengthCache[ sourceSizeListStr ] = !winningLength ? units.width : winningLength;
		}

		return sizeLengthCache[ sourceSizeListStr ];
	};

	/**
	 * Takes a candidate object with a srcset property in the form of url/
	 * ex. "images/pic-medium.png 1x, images/pic-medium-2x.png 2x" or
	 *     "images/pic-medium.png 400w, images/pic-medium-2x.png 800w" or
	 *     "images/pic-small.png"
	 * Get an array of image candidates in the form of
	 *      {url: "/foo/bar.png", resolution: 1}
	 * where resolution is http://dev.w3.org/csswg/css-values-3/#resolution-value
	 * If sizes is specified, res is calculated
	 */
	ri.setRes = function( set ) {
		var candidates;
		if ( set ) {

			candidates = ri.parseSet( set );

			for ( var i = 0, len = candidates.length; i < len; i++ ) {
				setResolution( candidates[ i ], set.sizes );
			}
		}
		return candidates;
	};

	ri.setRes.res = setResolution;

	ri.applySetCandidate = function( candidates, img ) {
		if ( !candidates.length ) {return;}
		var candidate,
			dpr,
			i,
			j,
			diff,
			length,
			bestCandidate,
			curSrc,
			curCan,
			isSameSet,
			candidateSrc,
			abortCurSrc,
			oldRes;

		var imageData = img[ ri.ns ];
		var evaled = evalID;
		var lazyF = lazyFactor;
		var sub = substractCurRes;

		curSrc = imageData.curSrc || img[curSrcProp];

		curCan = imageData.curCan || setSrcToCur(img, curSrc, candidates[0].set);

		dpr = ri.DPR;

		oldRes = curCan && curCan.res;

		//if we have a current source, we might either become lazy or give this source some advantage
		if ( !bestCandidate && curSrc ) {

			abortCurSrc = (supportAbort && !img.complete && curCan && oldRes - 0.2 > dpr);

			if( !abortCurSrc && (!curCan || tMemory > oldRes) ){

				//add some lazy padding to the src
				if ( curCan && oldRes < dpr && oldRes > lowTreshHold ) {


					if(oldRes < partialLowTreshHold){
						lazyF *= 0.8;
						sub += (0.04 * dpr);
					}

					curCan.res += lazyF * Math.pow(oldRes - sub, 2);
				}

				isSameSet = !imageData.pic || (curCan && curCan.set == candidates[ 0 ].set);

				if ( curCan && isSameSet && curCan.res >= dpr ) {
					bestCandidate = curCan;
				}
			}
		}

		if ( !bestCandidate ) {
			if ( oldRes ) {
				curCan.res = curCan.res - ((curCan.res - oldRes) / 2);
			}

			candidates.sort( ascendingSort );

			length = candidates.length;
			bestCandidate = candidates[ length - 1 ];

			for ( i = 0; i < length; i++ ) {
				candidate = candidates[ i ];
				if ( candidate.res >= dpr ) {
					j = i - 1;

					// we have found the perfect candidate,
					// but let's improve this a little bit with some assumptions ;-)
					if (candidates[ j ] &&
						(diff = (candidate.res - dpr)) &&
						(abortCurSrc || curSrc != ri.makeUrl( candidate.url )) &&
						chooseLowRes(candidates[ j ].res, diff, dpr)) {
						bestCandidate = candidates[ j ];

					} else {
						bestCandidate = candidate;
					}
					break;
				}
			}
		}

		if ( oldRes ) {
			curCan.res = oldRes;
		}

		if ( bestCandidate ) {

			candidateSrc = ri.makeUrl( bestCandidate.url );


			imageData.curSrc = candidateSrc;
			imageData.curCan = bestCandidate;

			if ( candidateSrc != curSrc ) {
				ri.setSrc( img, bestCandidate );
				if ( RIDEBUG ) {
					testImgDimensions(img, bestCandidate);
					if(isSSL && !bestCandidate.url.indexOf( "http:" )){
						warn( "insecure: " + candidateSrc );
					}
				}
			}
			ri.setSize( img );
		}

		return evaled;
	};

	ri.setSrc = function( img, bestCandidate ) {
		var origStyle;
		img.src = bestCandidate.url;


		if ( reflowBug ) {
			origStyle = img.style.zoom;
			img.style.zoom = "0.999";

			// next line only should trigger a repaint
			// if... is only done to trick dead code removal
			if ( img.offsetWidth || 1 ) {
				img.style.zoom = origStyle;
			}
		}
	};

	ri.getSet = function( img ) {
		var i, set, supportsType;
		var match = false;
		var sets = img [ ri.ns ].sets;

		for ( i = 0; i < sets.length && !match; i++ ) {
			set = sets[i];

			if ( !set.srcset || !ri.matchesMedia( set.media ) || !(supportsType = ri.supportsType( set.type )) ) {
				continue;
			}

			if ( supportsType == "pending" ) {
				set = supportsType;
			}

			match = set;
			break;
		}

		return match;
	};

	ri.parseSets = function( element, parent, options ) {
		var srcsetAttribute, imageSet, isWDescripor, srcsetParsed;

		var hasPicture = parent.nodeName.toUpperCase() == "PICTURE";
		var imageData = element[ ri.ns ];

		if ( imageData.src === undefined || options.src ) {
			imageData.src = getImgAttr.call( element, "src" );
			if ( imageData.src ) {
				setImgAttr.call( element, srcAttr, imageData.src );
			} else {
				removeImgAttr.call( element, srcAttr );
			}
		}

		if ( imageData.srcset === undefined || !ri.supSrcset || element.srcset || options.srcset ) {
			srcsetAttribute = getImgAttr.call( element, "srcset" );
			imageData.srcset = srcsetAttribute;
			srcsetParsed = true;
		}

		imageData.sets = [];

		if ( hasPicture ) {
			imageData.pic = true;
			getAllSourceElements( parent, imageData.sets );
		}

		if ( imageData.srcset ) {
			imageSet = {
				srcset: imageData.srcset,
				sizes: getImgAttr.call( element, "sizes" )
			};

			imageData.sets.push( imageSet );

			isWDescripor = (alwaysCheckWDescriptor || imageData.src) && regWDesc.test(imageData.srcset || '');

			// add normal src as candidate, if source has no w descriptor
			if ( !isWDescripor && imageData.src && !getCandidateForSrc(imageData.src, imageSet) && !imageSet.has1x ) {
				imageSet.srcset += ", " + imageData.src;
				imageSet.cands.push({
					url: imageData.src,
					x: 1,
					set: imageSet
				});
			}

			if ( RIDEBUG && !hasPicture && isWDescripor && imageData.src && imageSet.srcset.indexOf(element[ ri.ns ].src) == -1 ) {
				warn("The fallback candidate (`src`) isn't described inside the srcset attribute. Normally you want to describe all available candidates.");
			}

		} else if ( imageData.src ) {
			imageData.sets.push( {
				srcset: imageData.src,
				sizes: null
			} );
		}

		imageData.curCan = null;
		imageData.curSrc = undefined;

		// if img has picture or the srcset was removed or has a srcset and does not support srcset at all
		// or has a w descriptor (and does not support sizes) set support to false to evaluate
		imageData.supported = !( hasPicture || ( imageSet && !ri.supSrcset ) || isWDescripor );

		if ( srcsetParsed && ri.supSrcset && !imageData.supported ) {
			if ( srcsetAttribute ) {
				setImgAttr.call( element, srcsetAttr, srcsetAttribute );
				element.srcset = "";
			} else {
				removeImgAttr.call( element, srcsetAttr );
			}
		}

		if(imageData.supported && !imageData.srcset && ((!imageData.src && element.src) ||  element.src != ri.makeUrl(imageData.src))){
			if(imageData.src == null){
				element.removeAttribute('src');
			} else {
				element.src = imageData.src;
			}
		}

		if ( RIDEBUG ) {
			testMediaOrder(imageData.sets, 'source');
		}
		imageData.parsed = true;
	};


	ri.fillImg = function(element, options) {
		var parent, imageData;
		var extreme = options.reselect || options.reevaluate;

		// expando for caching data on the img
		if ( !element[ ri.ns ] ) {
			element[ ri.ns ] = {};
		}

		imageData = element[ ri.ns ];

		// if the element has already been evaluated, skip it
		// unless `options.reevaluate` is set to true ( this, for example,
		// is set to true when running `respimage` on `resize` ).
		if ( !extreme && imageData.evaled == evalID ) {
			return;
		}

		if ( !imageData.parsed || options.reevaluate ) {
			parent = element.parentNode;
			if ( !parent ) {
				return;
			}
			ri.parseSets( element, parent, options );
		}

		if ( !imageData.supported ) {
			applyBestCandidate( element );
		} else {
			imageData.evaled = evalID;
		}
	};

	ri.setupRun = function( options ) {
		if ( !alreadyRun || isVwDirty || DPR != window.devicePixelRatio ) {
			updateMetrics();

			// if all images are reevaluated clear the resizetimer
			if ( !options.elements && !options.context ) {
				clearTimeout( resizeThrottle );
			}
		}
	};

	// If picture is supported, well, that's awesome.
	if ( window.HTMLPictureElement ) {
		respimage = noop;
		ri.fillImg = noop;
	} else {
		// HTML shim|v it for old IE (IE9 will still need the HTML video tag workaround)
		document.createElement( "picture" );

		/**
		 * Sets up picture polyfill by polling the document
		 * Also attaches respimage on resize and readystatechange
		 */
		(function() {
			var isDomReady;
			var regReady = window.attachEvent ? /d$|^c/ : /d$|^c|^i/;
			var run = function() {
				var readyState = document.readyState || "";

				timerId = setTimeout(run, readyState == "loading" ? 200 :  999);
				if ( document.body ) {
					isDomReady = isDomReady || regReady.test( readyState );
					ri.fillImgs();
					if ( isDomReady  ) {
						clearTimeout( timerId );
					}
				}
			};

			var resizeEval = function() {
				ri.fillImgs();
			};

			var onResize = function() {
				clearTimeout( resizeThrottle );
				isVwDirty = true;
				resizeThrottle = setTimeout( resizeEval, 99 );
			};

			var timerId = setTimeout(run, document.body ? 0 : 20);

			on( window, "resize", onResize );
			on( document, "readystatechange", run );

		})();
	}

	ri.respimage = respimage;
	//use this internally for easy monkey patching/performance testing
	ri.fillImgs = respimage;
	ri.teardownRun = noop;

	/* expose methods for testing */
	respimage._ = ri;

	/* expose respimage */
	window.respimage = respimage;

	window.respimgCFG = {
		ri: ri,
		push: function(args){
			var name = args.shift();
			if(typeof ri[name] == "function"){
				ri[name].apply(ri, args);
			} else {
				cfg[name] = args[0];
				if(alreadyRun){
					ri.fillImgs({reselect: true});
				}
			}
		}
	};

	while(setOptions && setOptions.length){
		window.respimgCFG.push(setOptions.shift());
	}

	if ( RIDEBUG ) {
		warn( "Responsive image debugger active. Do not use in production, because it slows things down! extremly" );

		if(!document.querySelector || (document.documentMode || 9) < 8){
			warn("querySelector is needed. IE8 needs to be in strict, standard or edge mode: http://bit.ly/1yGgYU0 or try the ri.oldie.js plugin.");
		}
		if( (document.getElementsByTagName("picture")[0] ||{} ).outerHTML == "<PICTURE>" ){
			warn("IE8 needs to picture shived. Either include respimage.js in <head> or use html5shiv.");
		}

		if(document.compatMode == "BackCompat"){
			warn("Browser is in quirksmode. Please make sure to be in strict mode.");
		}

		var testImgDimensions = function (img, candidate) {
			var onload = function () {
				var dif, xtreshhold;
				var imgWidth = img.offsetWidth;
				var naturalWidth = img.naturalWidth;
				var canWidth = candidate.cWidth;
				var res = ri.DPR * cfg.xQuant;
				var hTresh =  0.84;
				var lTresh = res > 1 ? 0.5 : 0.75;


				if(!canWidth && naturalWidth && candidate.x){
					canWidth = naturalWidth / res;
				}

				if (imgWidth && canWidth) {
					if (imgWidth > canWidth) {
						dif = canWidth / imgWidth;
						xtreshhold = lTresh;
					} else {
						dif = imgWidth / canWidth;
						xtreshhold = hTresh;
					}

					if(Math.abs(imgWidth - canWidth) > 50){
						if (candidate.w && dif < 0.86) {
							warn("Check your sizes attribute: " + candidate.set.sizes + " was calculated to: " + canWidth + "px. But your image is shown with a size of " + imgWidth + "px. img: "+ candidate.url);
						} else if(candidate.x && dif < xtreshhold){
							//warn("Image too much resized. Image was shown with "+ imgWidth +" but has a normalized width of "+ canWidth +". Maybe you should use a w descriptor instead of an x descriptor. img: "+ candidate.url);
						}
					}
				}

				off(img, "load", onload);
			};

			on(img, "load", onload);
		};
		var testMediaOrder = (function(){
			var regex = {
				minw: /^\s*\(\s*min\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)\s*$/,
				maxw: /^\s*\(\s*max\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)\s*$/
			};

			var checkSetOrder = function(set, sets, index, type){
				var i, curSet;
				for(i = 0; i < index && i < sets.length; i++){
					curSet = sets[i];
					if((set._min && curSet._min && set._min >= curSet._min) || (set._max && curSet._max && set._max <= curSet._max)){
						if(type == 'source'){
							warn("Order of your source elements matters. Defining "+ set.media + " after "+ curSet.media +" doesn't make sense.");
						} else {
							warn("Order inside your sizes attribute does matter. Defining "+ set.media + " after "+ curSet.media +" doesn't make sense.");
						}
					}
				}
			};
			var mediaTest = function(sets, type){
				var i, len, set, lastSet;

				lastSet = sets[sets.length - 1];
				if(lastSet && (lastSet.media || lastSet.type)){
					if(type == 'source'){
						warn("The last src/srcset shouldn't have any type or media conditions. Use img[src] or img[srcset].");
					} else {
						warn("Last sizes attribute shouldn't have any condition otherwise 100vw is used.");
					}
				}
				for(i = 0, len = sets.length; i < len; i++){
					set = sets[i];
					if(!set.media || set.type){
						if(!set.type && i != len - 1){
							if(type == 'source'){
								warn("A source element without [media] and [type] doesn't make any sense. Last srcset can be used at the img element. Order is important!");
							} else {
								warn("The order of your sizes attribute does matter! The sizes length without a media condition has to be defined as last entry.");
							}
						}
						continue;
					}
					set._min = set.media.match( regex.minw ) && parseFloat( RegExp.$1 ) + ( RegExp.$2 || "" );
					set._max = set.media.match( regex.maxw ) && parseFloat( RegExp.$1 ) + ( RegExp.$2 || "" );


					if ( set._min ) {
						set._min = parseFloat( set._min, 10 ) * (set._min.indexOf( "em" ) > 0 ? ri.getEmValue() : 1);
					}

					if ( set._max ) {
						set._max = parseFloat( set._max, 10 ) * (set._max.indexOf( "em" ) > 0 ? ri.getEmValue() : 1);
					}
					if(set._min || set._max){
						checkSetOrder(set, sets, i, type);
					}
				}
			};

			return function(sets){
				var i, len, sizes, j, sizesSet;

				mediaTest(sets, 'source');

				for(i = 0, len = sets.length; i < len; i++){
					sizes = trim(sets[i].sizes || '');
					if(sizes){
						sizesSet = [];
						sizes = sizes.split( /\s*,\s*/ );
						for(j = 0; j < sizes.length; j++){
							if(sizes[j]){
								sizesSet.push(ri.parseSize( sizes[j] ));
							}
						}

						if(sizesSet.length){
							mediaTest(sizesSet, 'sizes');
						}
					}
				}
			};
		})();
	}

} )( window, document );

(function( factory ) {
	"use strict";
	var interValId;
	var intervalIndex = 0;
	var run = function(){
		if ( window.respimage ) {
			factory( window.respimage );
		}
		if(window.respimage || intervalIndex > 9999){
			clearInterval(interValId);
		}
		intervalIndex++;
	};
	interValId = setInterval(run, 8);

	run();

}( function( respimage, undefined ) {
	"use strict";

	var document = window.document;
	var ri = respimage._;
	var knownWidths = {};
	var cfg = ri.cfg;
	var setSize = function(width, img, data){
		var curCandidate = data.curCan;

		if ( width ) {
			img.setAttribute( "width", parseInt(width / curCandidate.res, 10) );
		}
	};
	var loadBg = function(url, img, data){
		var bgImg, curCandidate, clear;


		if(url in knownWidths){
			setSize(knownWidths[url], img, data);
		} else {
			clear = function(){
				data.pendingURLSize = null;
				bgImg.onload = null;
				bgImg.onerror = null;
				img = null;
				bgImg = null;
			};

			data.pendingURLSize = url;
			curCandidate = data.curCan;

			if(curCandidate.w){
				setSize(curCandidate.w, img, data);
			}

			bgImg = document.createElement("img");

			bgImg.onload = function(){
				knownWidths[url] = bgImg.naturalWidth || bgImg.width;
				if (!knownWidths[url]) {
					try {
						document.body.appendChild(bgImg);
						knownWidths[url] = bgImg.offsetWidth || bgImg.naturalWidth || bgImg.width;
						document.body.removeChild(bgImg);
					} catch (e) {}
				}
				if(url == img.src){
					setSize(knownWidths[url], img, data);
				}
				clear();
			};
			bgImg.onerror = clear;

			bgImg.src = url;

			if(bgImg && bgImg.complete){
				bgImg.onload();
			}
		}

	};
	var reeval = (function(){
		var running, timer;

		var run = function(){
			var i, len, imgData;
			var imgs = document.getElementsByTagName("img");
			var options = {elements: []};

			ri.setupRun(options);

			running = false;
			clearTimeout(timer);

			for(i = 0, len = imgs.length; i < len; i++){
				imgData = imgs[i][ri.ns];

				if(imgData && imgData.curCan){
					ri.setRes.res(imgData.curCan, imgData.curCan.set.sizes);
					ri.setSize(imgs[i]);
				}
			}

			ri.teardownRun( options );
		};

		return function(){
			if(!running && cfg.addSize){
				running = true;
				clearTimeout(timer);
				timer = setTimeout(run);
			}
		};

	})();

	ri.setSize = function( img ) {
		var url;
		var data = img[ ri.ns ];
		var curCandidate = data.curCan;

		if ( data.dims === undefined ) {
			data.dims = img.getAttribute( "height" ) && img.getAttribute( "width" );
		}

		if ( !cfg.addSize || !curCandidate || data.dims ) {return;}
		url = ri.makeUrl(curCandidate.url);

		if(url == img.src && url !== data.pendingURLSize){
			loadBg(url, img, data);
		}
	};


	if(window.addEventListener && !window.HTMLPictureElement){
		addEventListener("resize", reeval, false);
	}

	if(!('addSize' in cfg)){
		cfg.addSize = true;
	} else {
		cfg.addSize = !!cfg.addSize;
	}

	reeval();
}));

(function( factory ) {
	"use strict";
	var interValId;
	var intervalIndex = 0;
	var run = function(){
		if ( window.respimage ) {
			factory( window.respimage );
		}
		if(window.respimage || intervalIndex > 9999){
			clearInterval(interValId);
		}
		intervalIndex++;
	};
	interValId = setInterval(run, 8);

	run();

}( function( respimage ) {
	"use strict";

	var ri = respimage._;
	var runningTests = 0;
	var setTypeValue = function(types, value){
		var i;
		for(i = 0; i < types.length; i++){
			ri.types[types[i]] = value;
		}
	};

	if(window.HTMLPictureElement && !ri.cfg.uT){
		respimage.testTypeSupport = function(){};
		return;
	}

	ri.types["image/bmp"] = true;
	ri.types["image/x-bmp"] = true;

	respimage.testTypeSupport = function(types, url, width, useCanvas){
		if(typeof types == "string"){
			types = types.split(/\s*\,*\s+/g);
		}
		var canvas;
		var supports = "pending";
		var img = document.createElement('img');
		var onComplete = function(){
			runningTests--;
			setTypeValue(types, supports);
			if(runningTests < 1){
				respimage({reevaluate: true});
			}
		};

		if(useCanvas){
			canvas = document.createElement('canvas');
			if(!canvas.getContext){
				setTypeValue(types, false);
				return;
			}
		}

		img.onload = function(){
			var ctx;
			supports = true;
			if(width){
				supports = img.width == width;
			}

			if(useCanvas){
				ctx = canvas.getContext('2d');
				ctx.drawImage(img, 0, 0);
				supports = ctx.getImageData(0, 0, 1, 1).data[3] === 0;
			}
			onComplete();
		};

		img.onerror = function(){
			supports = false;
			onComplete();
		};
		runningTests++;
		setTypeValue(types, "pending");
		img.src = url;
	};


	respimage.testTypeSupport("image/webp", "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==", 1);
	respimage.testTypeSupport("image/jp2 image/jpx image/jpm", "data:image/jp2;base64,/0//UQAyAAAAAAABAAAAAgAAAAAAAAAAAAAABAAAAAQAAAAAAAAAAAAEBwEBBwEBBwEBBwEB/1IADAAAAAEAAAQEAAH/XAAEQED/ZAAlAAFDcmVhdGVkIGJ5IE9wZW5KUEVHIHZlcnNpb24gMi4wLjD/kAAKAAAAAABYAAH/UwAJAQAABAQAAf9dAAUBQED/UwAJAgAABAQAAf9dAAUCQED/UwAJAwAABAQAAf9dAAUDQED/k8+kEAGvz6QQAa/PpBABr994EAk//9k=", 1);
	respimage.testTypeSupport("image/vnd.ms-photo", "data:image/vnd.ms-photo;base64,SUm8AQgAAAAFAAG8AQAQAAAASgAAAIC8BAABAAAAAQAAAIG8BAABAAAAAQAAAMC8BAABAAAAWgAAAMG8BAABAAAAHwAAAAAAAAAkw91vA07+S7GFPXd2jckNV01QSE9UTwAZAYBxAAAAABP/gAAEb/8AAQAAAQAAAA==", 1);
	respimage.testTypeSupport("video/vnd.mozilla.apng video/x-apng video/png video/apng video/x-mng video/x-png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACGFjVEwAAAABAAAAAcMq2TYAAAANSURBVAiZY2BgYPgPAAEEAQB9ssjfAAAAGmZjVEwAAAAAAAAAAQAAAAEAAAAAAAAAAAD6A+gBAbNU+2sAAAARZmRBVAAAAAEImWNgYGBgAAAABQAB6MzFdgAAAABJRU5ErkJggg==", false, true);

}));




(function(){

	webshim.isReady('picture', true);
	var sel = 'picture, img[srcset]';
	webshim.addReady(function(context){
		if(context.querySelector(sel)){
			window.respimage();
		}
	});
})();


