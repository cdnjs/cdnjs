/*!
 * Autolinker.js
 * 0.7.0
 *
 * Copyright(c) 2014 Gregory Jacobs <greg@greg-jacobs.com>
 * MIT Licensed. http://www.opensource.org/licenses/mit-license.php
 *
 * https://github.com/gregjacobs/Autolinker.js
 */
/**
 * @class Autolinker
 * @extends Object
 * @singleton
 * 
 * Singleton class which exposes the {@link #link} method, used to process a given string of text,
 * and wrap the URLs, email addresses, and Twitter handles in the appropriate anchor (&lt;a&gt;) tags.
 */
// Set up Autolinker appropriately for the environment.
(function(root, factory) {
	// Start with AMD.
	if (typeof define === 'function' && define.amd) {
		define(factory);
	// Next for Node.js or CommonJS.
	} else if (typeof exports !== 'undefined') {
		module.exports = factory();
	// Finally, as a browser global.
	} else {
		root.Autolinker = factory();
	}
}(this, function(root) {
	var Autolinker = {
		/**
		 * @private
		 * @property {RegExp} htmlRegex
		 * 
		 * A regular expression used to pull out HTML tags from a string.
		 * 
		 * Capturing groups:
		 * 
		 * 1. If it is an end tag, this group will have the '/'.
		 * 2. The tag name.
		 */
		htmlRegex : /<(\/)?(\w+)(?:(?:\s+\w+(?:\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)\/?>/g,


		/**
		 * @private
		 * @property {RegExp} prefixRegex
		 * 
		 * A regular expression used to remove the 'http://' or 'https://' and/or the 'www.' from URLs.
		 */
		prefixRegex: /^(https?:\/\/)?(www\.)?/,
		
		
		/**
		 * Automatically links URLs, email addresses, and Twitter handles found in the given chunk of HTML. 
		 * Does not link URLs found within HTML tags.
		 * 
		 * For instance, if given the text: `You should go to http://www.yahoo.com`, then the result
		 * will be `You should go to &lt;a href="http://www.yahoo.com"&gt;http://www.yahoo.com&lt;/a&gt;`
		 * 
		 * @method link
		 * @param {String} html The HTML text to link URLs within.
		 * @param {Object} [options] Any options for the autolinking, specified in an object. It may have the following properties:
		 * @param {Boolean} [options.newWindow=true] True if the links should open in a new window, false otherwise.
		 * @param {Boolean} [options.stripPrefix=true] True if 'http://' or 'https://' and/or the 'www.' should be stripped from the beginning of links, false otherwise.
		 * @param {Number} [options.truncate] A number for how many characters long URLs/emails/twitter handles should be truncated to
		 *   inside the text of a link. If the URL/email/twitter is over the number of characters, it will be truncated to this length by 
		 *   adding a two period ellipsis ('..') into the middle of the string.
		 *   Ex: a url like 'http://www.yahoo.com/some/long/path/to/a/file' truncated to 25 characters might look like this: 'http://www...th/to/a/file'
		 * @param {Boolean} [options.twitter=true] True if Twitter handles ("@example") should be automatically linked.
		 * @param {Boolean} [options.email=true] True if email addresses should be automatically linked.
		 * @param {Boolean} [options.urls=true] True if miscellaneous URLs should be automatically linked.
		 * @return {String} The HTML text, with URLs automatically linked
		 */
		link : function( html, options ) {
			options = options || {};
			
			var htmlRegex = Autolinker.htmlRegex,         // full path for friendly
				matcherRegex = Autolinker.matcherRegex,   // out-of-scope calls
				newWindow = ( 'newWindow' in options ) ? options.newWindow : true,  // defaults to true
				stripPrefix = ( 'stripPrefix' in options ) ? options.stripPrefix : true,  // defaults to true
				truncate = options.truncate,
				enableTwitter = ( 'twitter' in options ) ? options.twitter : true,  // defaults to true
				enableEmailAddresses = ( 'email' in options ) ? options.email : true,  // defaults to true
				enableUrls = ( 'urls' in options ) ? options.urls : true,  // defaults to true
				currentResult, 
				lastIndex = 0,
				inBetweenTagsText,
				resultHtml = "",
				anchorTagStackCount = 0;
			
			// Function to process the text that lies between HTML tags. This function does the actual wrapping of
			// URLs with anchor tags.
			function autolinkText( text ) {
				text = text.replace( matcherRegex, function( matchStr, $1, $2, $3, $4, $5 ) {
					var twitterMatch = $1,
						twitterHandlePrefixWhitespaceChar = $2,  // The whitespace char before the @ sign in a Twitter handle match. This is needed because of no lookbehinds in JS regexes
						twitterHandle = $3,  // The actual twitterUser (i.e the word after the @ sign in a Twitter handle match)
						emailAddress = $4,   // For both determining if it is an email address, and stores the actual email address
						urlMatch = $5,       // The matched URL string
						
						prefixStr = "",      // A string to use to prefix the anchor tag that is created. This is needed for the Twitter handle match
						suffixStr = "",      // A string to suffix the anchor tag that is created. This is used if there is a trailing parenthesis that should not be auto-linked.
						
						anchorAttributes = [];
					
					// Handle a closing parenthesis at the end of the match, and exclude it if there is not a matching open parenthesis
					// in the match. This handles cases like the string "wikipedia.com/something_(disambiguation)" (which should be auto-
					// linked, and when it is enclosed in parenthesis itself, such as: "(wikipedia.com/something_(disambiguation))" (in
					// which the outer parens should *not* be auto-linked.
					var lastChar = matchStr.charAt( matchStr.length - 1 );
					if( lastChar === ')' ) {
						var openParensMatch = matchStr.match( /\(/g ),
							closeParensMatch = matchStr.match( /\)/g ),
							numOpenParens = ( openParensMatch && openParensMatch.length ) || 0,
							numCloseParens = ( closeParensMatch && closeParensMatch.length ) || 0;
						
						if( numOpenParens < numCloseParens ) {
							matchStr = matchStr.substr( 0, matchStr.length - 1 );  // remove the trailing ")"
							suffixStr = ")";  // this will be added after the <a> tag
						}
					}
					
					
					var anchorHref = matchStr,  // initialize both of these
						anchorText = matchStr;  // values as the full match

					if( ( twitterMatch && !enableTwitter ) || ( emailAddress && !enableEmailAddresses ) || ( urlMatch && !enableUrls ) ) {
						// A disabled link type
						return prefixStr + anchorText + suffixStr;
					}
					
					// Process the urls that are found. We need to change URLs like "www.yahoo.com" to "http://www.yahoo.com" (or the browser
					// will try to direct the user to "http://jux.com/www.yahoo.com"), and we need to prefix 'mailto:' to email addresses.
					if( twitterMatch ) {
						prefixStr = twitterHandlePrefixWhitespaceChar;
						anchorHref = 'https://twitter.com/' + twitterHandle;
						anchorText = '@' + twitterHandle;
					
					} else if( emailAddress ) {
						anchorHref = 'mailto:' + emailAddress;
						anchorText = emailAddress;
					
					} else if( !/^[A-Za-z]{3,9}:/i.test( anchorHref ) ) {  // string doesn't begin with a protocol, add http://
						anchorHref = 'http://' + anchorHref;
					}

					if( stripPrefix ) {
						anchorText = anchorText.replace( Autolinker.prefixRegex, '' );
					}

					// remove trailing slash
					if( anchorText.charAt( anchorText.length - 1 ) === '/' ) {
						anchorText = anchorText.slice( 0, -1 );
					}
					
					// Set the attributes for the anchor tag
					anchorAttributes.push( 'href="' + anchorHref + '"' );
					if( newWindow ) {
						anchorAttributes.push( 'target="_blank"' );
					}
					
					// Truncate the anchor text if it is longer than the provided 'truncate' option
					if( truncate && anchorText.length > truncate ) {
						anchorText = anchorText.substring( 0, truncate - 2 ) + '..';
					}
					
					return prefixStr + '<a ' + anchorAttributes.join( " " ) + '>' + anchorText + '</a>' + suffixStr;  // wrap the match in an anchor tag
				} );
				
				return text;
			}
			
			
			// Loop over the HTML string, ignoring HTML tags, and processing the text that lies between them,
			// wrapping the URLs in anchor tags 
			while( ( currentResult = htmlRegex.exec( html ) ) !== null ) {
				var tagText = currentResult[ 0 ],
					tagName = currentResult[ 2 ],
					isClosingTag = !!currentResult[ 1 ];
				
				inBetweenTagsText = html.substring( lastIndex, currentResult.index );
				lastIndex = currentResult.index + tagText.length;
				
				// Process around anchor tags, and any inner text / html they may have
				if( tagName === 'a' ) {
					if( !isClosingTag ) {  // it's the start <a> tag
						anchorTagStackCount++;
						resultHtml += autolinkText( inBetweenTagsText );
						
					} else {     // it's the end </a> tag
						anchorTagStackCount--;	
						if( anchorTagStackCount === 0 ) {
							resultHtml += inBetweenTagsText;  // We hit the matching </a> tag, simply add all of the text from the start <a> tag to the end </a> tag without linking it
						}
					}
					
				} else if( anchorTagStackCount === 0 ) {   // not within an anchor tag, link the "in between" text
					resultHtml += autolinkText( inBetweenTagsText );
				}
				
				resultHtml += tagText;  // now add the text of the tag itself verbatim
			}
			
			// Process any remaining text after the last HTML element. Will process all of the text if there were no HTML elements.
			if( lastIndex < html.length ) {
				resultHtml += autolinkText( html.substring( lastIndex ) );
			}
			
			return resultHtml;
		},
		/**
		 * @private
		 * @property {RegExp} matcherRegex
		 * 
		 * The regular expression that matches URLs, email addresses, and Twitter handles.
		 * 
		 * Capturing groups:
		 * 
		 * 1. Group that is used to determine if there is a Twitter handle match (i.e. @someTwitterUser). Simply check for its existence
		 *    to determine if there is a Twitter handle match. The next couple of capturing groups give information about the Twitter 
		 *    handle match.
		 * 2. The whitespace character before the @sign in a Twitter handle. This is needed because there are no lookbehinds in JS regular
		 *    expressions, and can be used to reconstruct the original string in a replace().
		 * 3. The Twitter handle itself in a Twitter match. If the match is '@someTwitterUser', the handle is 'someTwitterUser'.
		 * 4. Group that matches an email address. Used to determine if the match is an email address, as well as holding the full address.
		 *    Ex: 'me@my.com'
		 * 5. Group that matches a URL in the input text. Ex: 'http://google.com', 'www.google.com', or just 'google.com'.
		 *    This also includes a path, url parameters, or hash anchors. Ex: google.com/path/to/file?q1=1&q2=2#myAnchor
		 */
		matcherRegex: (function() {
			var twitterRegex = /(^|\s)@(\w{1,15})/,                 // For matching a twitter handle. Ex: @gregory_jacobs
				
				emailRegex = /(?:[\-;:&=\+\$,\w\.]+@)/,             // something@ for email addresses (a.k.a. local-part)
				
				protocolRegex = /(?:[A-Za-z]{3,9}:(?:\/\/)?)/,      // match protocol, allow in format http:// or mailto:
				wwwRegex = /(?:www\.)/,                             // starting with 'www.'
				domainNameRegex = /[A-Za-z0-9\.\-]*[A-Za-z0-9\-]/,  // anything looking at all like a domain, non-unicode domains, not ending in a period
				tldRegex = /\.(?:international|construction|contractors|enterprises|photography|productions|foundation|immobilien|industries|management|properties|technology|christmas|community|directory|education|equipment|institute|marketing|solutions|vacations|bargains|boutique|builders|catering|cleaning|clothing|computer|democrat|diamonds|graphics|holdings|lighting|partners|plumbing|supplies|training|ventures|academy|careers|company|cruises|domains|exposed|flights|florist|gallery|guitars|holiday|kitchen|neustar|okinawa|recipes|rentals|reviews|shiksha|singles|support|systems|agency|berlin|camera|center|coffee|condos|dating|estate|events|expert|futbol|kaufen|luxury|maison|monash|museum|nagoya|photos|repair|report|social|supply|tattoo|tienda|travel|viajes|villas|vision|voting|voyage|actor|build|cards|cheap|codes|dance|email|glass|house|mango|ninja|parts|photo|shoes|solar|today|tokyo|tools|watch|works|aero|arpa|asia|best|bike|blue|buzz|camp|club|cool|coop|farm|fish|gift|guru|info|jobs|kiwi|kred|land|limo|link|menu|mobi|moda|name|pics|pink|post|qpon|rich|ruhr|sexy|tips|vote|voto|wang|wien|wiki|zone|bar|bid|biz|cab|cat|ceo|com|edu|gov|int|kim|mil|net|onl|org|pro|pub|red|tel|uno|wed|xxx|xyz|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cw|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sx|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|za|zm|zw)\b/,   // match our known top level domains (TLDs)
				
				// Allow optional path, query string, and hash anchor, not ending in the following characters: "!:,.;"
				// http://blog.codinghorror.com/the-problem-with-urls/
				urlSuffixRegex = /(?:[-A-Za-z0-9+&@#\/%?=~_()|!:,.;]*[-A-Za-z0-9+&@#\/%=~_()|])?/;  // note: optional part of the full regex
			
			
			return new RegExp( [
				'(',  // *** Capturing group $1, which can be used to check for a twitter handle match. Use group $3 for the actual twitter handle though. $2 may be used to reconstruct the original string in a replace() 
					// *** Capturing group $2, which matches the whitespace character before the '@' sign (needed because of no lookbehinds), and 
					// *** Capturing group $3, which matches the actual twitter handle
					twitterRegex.source,
				')',
				
				'|',
				
				'(',  // *** Capturing group $4, which is used to determine an email match
					emailRegex.source,
					domainNameRegex.source,
					tldRegex.source,
				')',
				
				'|',
				
				'(',  // *** Capturing group $5, which is used to match a URL
					'(?:', // parens to cover match for protocol (optional), and domain
						'(?:',  // non-capturing paren for a protocol-prefixed url (ex: http://google.com) 
							protocolRegex.source,
							domainNameRegex.source,
						')',
						
						'|',
						
						'(?:',  // non-capturing paren for a 'www.' prefixed url (ex: www.google.com)
							wwwRegex.source,
							domainNameRegex.source,
						')',
						
						'|',
						
						'(?:',  // non-capturing paren for known a TLD url (ex: google.com)
							domainNameRegex.source,
							tldRegex.source,
						')',
					')',
					
					urlSuffixRegex.source,  // match for path, query string, and/or hash anchor
				')'
			].join( "" ), 'g' );
		})()
	};

	return Autolinker;
}));
