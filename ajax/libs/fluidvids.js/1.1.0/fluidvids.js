/*!
 *  FluidVids.js v1.1.0
 *  Responsive and fluid YouTube/Vimeo video embeds.
 *  Project: https://github.com/toddmotto/fluidvids
 *  by Todd Motto: http://toddmotto.com
 *
 *  Copyright 2013 Todd Motto. MIT licensed.
 */
(function ( window, document, undefined ) {

	'use strict';

	/*
	 * Grab all iframes on the page or return
	 */
	var iframes = document.getElementsByTagName( 'iframe' );

	/*
	 * Loop through the iframes array
	 */
	for ( var i = 0; i < iframes.length; i++ ) {

		var iframe = iframes[i],

		/*
	     * RegExp, extend this if you need more players
	     */
		players = /www.youtube.com|player.vimeo.com/;

		/*
		 * If the RegExp pattern exists within the current iframe
		 */
		if ( iframe.src.search( players ) > 0 ) {

			/*
			 * Calculate the video ratio based on the iframe's w/h dimensions
			 */
			var videoRatio        = ( iframe.height / iframe.width ) * 100;
			
			/*
			 * Replace the iframe's dimensions and position
			 * the iframe absolute, this is the trick to emulate
			 * the video ratio
			 */
			iframe.style.position = 'absolute';
			iframe.style.top      = '0';
			iframe.style.left     = '0';
			iframe.width          = '100%';
			iframe.height         = '100%';
			
			/*
			 * Wrap the iframe in a new <div> which uses a
			 * dynamically fetched padding-top property based
			 * on the video's w/h dimensions
			 */
			var wrap              = document.createElement( 'div' );
			wrap.className        = 'video-wrap';
			wrap.style.width      = '100%';
			wrap.style.position   = 'relative';
			wrap.style.paddingTop = videoRatio + '%';
			
			/*
			 * Add the iframe inside our newly created <div>
			 */
			var iframeParent      = iframe.parentNode;
			iframeParent.insertBefore( wrap, iframe );
			wrap.appendChild( iframe );

		}

	}

})( window, document );