/**
 * @depends nothing
 * @name core.console
 * @package jquery-sparkle {@link http://www.balupton/projects/jquery-sparkle}
 */

/**
 * Console Emulator
 * We have to convert arguments into arrays, and do this explicitly as webkit (chrome) hates function references, and arguments cannot be passed as is
 * @version 1.0.2
 * @date August 21, 2010
 * @since 0.1.0-dev, December 01, 2009
 * @package jquery-sparkle {@link http://www.balupton/projects/jquery-sparkle}
 * @author Benjamin "balupton" Lupton {@link http://www.balupton.com}
 * @copyright (c) 2009-2010 Benjamin Arthur Lupton {@link http://www.balupton.com}
 * @license GNU Affero General Public License version 3 {@link http://www.gnu.org/licenses/agpl-3.0.html}
 */
if ( typeof window.console !== 'object' || typeof window.console.emulated === 'undefined' ) {
	// Check to see if console exists
	if ( typeof window.console !== 'object' || !(typeof window.console.log === 'function' || typeof window.console.log === 'object') ) {
		// Console does not exist
		window.console = {};
		window.console.log = window.console.debug = window.console.warn = window.console.trace = function(){};
		window.console.error = function(){
			var msg = "An error has occured. More information will be available in the console log.";
			for ( var i = 0; i < arguments.length; ++i ) {
				if ( typeof arguments[i] !== 'string' ) { break; }
				msg += "\n"+arguments[i];
			}
			if ( typeof Error !== 'undefined' ) {
				throw new Error(msg);
			}
			else {
				throw(msg);
			}
		};
	}
	else {
		// Console is object, and log does exist
		// Check Debug
		if ( typeof window.console.debug === 'undefined' ) {
			window.console.debug = function(){
				var arr = ['console.debug:']; for(var i = 0; i < arguments.length; i++) { arr.push(arguments[i]); };
			    window.console.log.apply(window.console, arr);
			};
		}
		// Check Warn
		if ( typeof window.console.warn === 'undefined' ) {
			window.console.warn = function(){
				var arr = ['console.warn:']; for(var i = 0; i < arguments.length; i++) { arr.push(arguments[i]); };
			    window.console.log.apply(window.console, arr);
			};
		} 
		// Check Error
		if ( typeof window.console.error === 'undefined' ) {
			window.console.error = function(){
				var arr = ['console.error']; for(var i = 0; i < arguments.length; i++) { arr.push(arguments[i]); };
			    window.console.log.apply(window.console, arr);
			};
		}
		// Check Trace
		if ( typeof window.console.trace === 'undefined' ) {
			window.console.trace = function(){
			    window.console.error.apply(window.console, ['console.trace does not exist']);
			};
		}
	}
	// We have been emulated
	window.console.emulated = true;
}
/**
 * @depends jquery, core.console
 * @name jquery.history
 * @package jquery-history {@link http://www.balupton/projects/jquery-history}
 */

// Start of our jQuery Plugin
(function($)
{	// Create our Plugin function, with $ as the argument (we pass the jQuery object over later)
	// More info: http://docs.jquery.com/Plugins/Authoring#Custom_Alias
	
	/**
	 * jQuery History
	 * @version 1.5.0
	 * @date August 31, 2010
	 * @since 0.1.0-dev, July 24, 2008
     * @package jquery-history {@link http://www.balupton/projects/jquery-history}
	 * @author Benjamin "balupton" Lupton {@link http://www.balupton.com}
	 * @copyright (c) 2008-2010 Benjamin Arthur Lupton {@link http://www.balupton.com}
	 * @license GNU Affero General Public License version 3 {@link http://www.gnu.org/licenses/agpl-3.0.html}
	 */
	// Check our class exists
	if ( !($.History||false) ) {
		// Declare our class
		$.History = {
			// Our Plugin definition
		
			// -----------------
			// Options
		
			options: {
				debug: false
			},
		
			// -----------------
			// Variables
		
			state:		'',
			$window:	null,
			$iframe:	null,
			handlers:	{
				generic:	[],
				specific:	{}
			},
		
			// --------------------------------------------------
			// Functions
			
			/**
			 * Extract the Hash from a URL
			 * @param {String} hash
			 */
			extractHash: function ( url ) {
				// Extract the hash
				var hash = url
					.replace(/^[^#]*#/, '')	/* strip anything before the first anchor */
					.replace(/^#+|#+$/, '')
					;
				
				// Return hash
				return hash;
			},
			
			/**
			 * Get the current state of the application
			 */
	        getState: function ( ) {
				var History = $.History;
			
				// Get the current state
				return History.state;
	        },
			/**
			 * Set the current state of the application
			 * @param {String} hash
			 */
			setState: function ( state ) {
				var History = $.History;
				
				// Format the state
				state = History.extractHash(state)
			
				// Apply the state
				History.state = state;
			
				// Return the state
				return History.state;
			},
		
			/**
			 * Get the current hash of the browser
			 */
			getHash: function ( ) {
				var History = $.History;
			
				// Get the hash
				var hash = History.extractHash(window.location.hash || location.hash);
			
				// Return the hash
				return hash;
			},
		
			/**
			 * Set the current hash of the browser and iframe if present
			 * @param {String} hash
			 */
			setHash: function ( hash ) {
				var History = $.History;
			
				// Prepare hash
				hash = History.extractHash(hash);
			
				// Write hash
				if ( typeof window.location.hash !== 'undefined' ) {
					if ( window.location.hash !== hash ) {
						window.location.hash = hash;
					}
				} else if ( location.hash !== hash ) {
					location.hash = hash;
				}
			
				// Done
				return hash;
			},
		
			/**
			 * Go to the specific state - does not force a history entry like setHash
			 * @param {String} to
			 */
			go: function ( to ) {
				var History = $.History;
			
				// Format
				to = History.extractHash(to);
			
				// Get current
				var	hash = History.getHash(),
					state = History.getState();
			
				// Has the hash changed
				if ( to !== hash ) {
					// Yes, update the hash
					// And wait for the next automatic fire
					History.setHash(to);
				} else {
					// Hash the state changed?
					if ( to !== state ) {
						// Yes, Update the state
						History.setState(to);
					}
				
					// Trigger our change
					History.trigger();
				}
			
				// Done
				return true;
			},
		
			/**
			 * Handle when the hash has changed
			 * @param {Event} e
			 */
			hashchange: function ( e ) {
				var History = $.History;
			
				// Get Hash
				var hash = History.getHash();
			
				// Handle the new hash
				History.go(hash);
			
				// All done
				return true;
			},
		
			/**
			 * Bind a handler to a hash
			 * @param {Object} state
			 * @param {Object} handler
			 */
			bind: function ( state, handler ) {
				var History = $.History;
			
				// Handle
				if ( handler ) {
					// We have a state specific handler
					// Prepare
					if ( typeof History.handlers.specific[state] === 'undefined' ) {
						// Make it an array
						History.handlers.specific[state] = [];
					}
					// Push new handler
					History.handlers.specific[state].push(handler);
				}
				else {
					// We have a generic handler
					handler = state;
					History.handlers.generic.push(handler);
				}
			
				// Done
				return true;
			},
		
			/**
			 * Trigger a handler for a state
			 * @param {String} state
			 */
			trigger: function ( state ) {
				var History = $.History;
			
				// Prepare
				if ( typeof state === 'undefined' ) {
					// Use current
					state = History.getState();
				}
				var i, n, handler, list;
			
				// Fire specific
				if ( typeof History.handlers.specific[state] !== 'undefined' ) {
					// We have specific handlers
					list = History.handlers.specific[state];
					for ( i = 0, n = list.length; i < n; ++i ) {
						// Fire the specific handler
						handler = list[i];
						handler(state);
					}
				}
			
				// Fire generics
				list = History.handlers.generic;
				for ( i = 0, n = list.length; i < n; ++i ) {
					// Fire the specific handler
					handler = list[i];
					handler(state);
				}
			
				// Done
				return true;
			},
		
			// --------------------------------------------------
			// Constructors
		
			/**
			 * Construct our application
			 */
			construct: function ( ) {
				var History = $.History;
			
				// Modify the document
				$(document).ready(function() {
					// Prepare the document
					History.domReady();
				});
			
				// Done
				return true;
			},
		
			/**
			 * Configure our application
			 * @param {Object} options
			 */
			configure: function ( options ) {
				var History = $.History;
			
				// Set options
				History.options = $.extend(History.options, options);
			
				// Done
				return true;
			},
		
			domReadied: false,
			domReady: function ( ) {
				var History = $.History;
			
				// Runonce
				if ( History.domRedied ) {
					return;
				}
				History.domRedied = true;
			
				// Define window
				History.$window = $(window);
			
				// Apply the hashchange function
				History.$window.bind('hashchange', this.hashchange);
			
				// Force hashchange support for all browsers
				setTimeout(History.hashchangeLoader, 200);
			
				// All done
				return true;
			},
			
			/**
			 * Determines whether or not our browser has native support for the required onhashchange event.
			 * Unfortunately we have to test against a known range of browsers, as doing a automatic test would require testing the onhashchange functionality
			 * which would require a state change that we do not want.
			 * @param {Object} browser [optional]
			 */
			nativeSupport: function ( browser ) {
				// Prepare
				browser = browser||$.browser;
				var	browserVersion = browser.version,
					browserVersionInt = parseInt(browserVersion,10),
					browserVersionParts = browserVersion.split(/[^0-9]/g),
					browserVersionPartsOne = parseInt(browserVersionParts[0],10),
					browserVersionPartsTwo = parseInt(browserVersionParts[1],10),
					browserVersionPartsThree = parseInt(browserVersionParts[2],10),
					nativeSupport = false;
				
				// Determine if we are running under a browser which has nativeSupport for the onhashchange event
				// >= MSIE 8
				if ( (browser.msie||false) && browserVersionInt >= 8 ) {
					nativeSupport = true;
				}
				// >= Webkit 528
				else if ( (browser.webkit||false) && browserVersionInt >= 528 ) {
					nativeSupport = true;
				}
				// >= Gecko 1.9.2.x
				else if ( (browser.mozilla||false) ) {
					// > Gecko 1
					if ( browserVersionPartsOne > 1 ) {
						nativeSupport = true;
					}
					// = Gecko 1
					else if ( browserVersionPartsOne === 1 ) {
						// > Gecko 1.9
						if ( browserVersionPartsTwo > 9 ) {
							nativeSupport = true;
						}
						// = Gecko 1.9
						else if ( browserVersionPartsTwo === 9 ) {
							// >= Gecko 1.9.2
							if ( browserVersionPartsThree >= 2 ) {
								nativeSupport = true;
							}
						}
					}
				}
				// >= Opera 10.60
				else if ( (browser.opera||false) ) {
					// > Opera 10
					if ( browserVersionPartsOne > 10 ) {
						nativeSupport = true;
					}
					// = Opera 10
					else if ( browserVersionPartsOne === 10 ) {
						// >= Opera 10.60
						if ( browserVersionPartsTwo >= 60 ) {
							nativeSupport = true;
						}
					}
				}
				
				// Return nativeSupport
				return nativeSupport;
			},
			
			/**
			 * Enable hashchange for all browsers
			 * For browsers which do not have native support, the support must be emulated.
			 */
			hashchangeLoader: function () {
				var History = $.History;
				
				// Fetch nativeSupport
				var nativeSupport = History.nativeSupport();
				
				// Check whether or not we need to implement a unfortunate but required workaround for browsers without nativeSupport
				if ( !nativeSupport ) {	
					// We are not IE8, or another browser which supports onhashchange natively
			
					// State our checker function, it is used to constantly check the location to detect a change
					var checker;
				
					// Handle depending on the browser
					if ( $.browser.msie ) {
						// We are still IE
						// IE6, IE7, etc
				
						// Append and $iframe to the document, as $iframes are required for back and forward
						// Create a hidden $iframe for hash change tracking
						History.$iframe = $('<iframe id="jquery-history-iframe" style="display: none;"></$iframe>').prependTo(document.body)[0];
					
						// Create initial history entry
						History.$iframe.contentWindow.document.open();
						History.$iframe.contentWindow.document.close();
					
						// Define the checker function (for bookmarks)
						var iframeHit = false;
						checker = function ( ) {
						
							// Fetch
							var hash = History.getHash();
							var state = History.getState();
							var iframeHash = History.extractHash(History.$iframe.contentWindow.document.location.hash);
						
							// Check if the browser hash is different
							if ( state !== hash ) {
								// Browser hash is different
							
								// Check if we need to update the iframe
								if ( !iframeHit ) {
									// Write a iframe/history entry in the browsers back and forward
									// alert('update iframe entry');
									History.$iframe.contentWindow.document.open();
									History.$iframe.contentWindow.document.close();
									// alert('update iframe entry.');
								
									// Update the iframe hash
									// alert('update iframe hash');
									History.$iframe.contentWindow.document.location.hash = hash;
									// alert('update iframe hash.');
								}
							
								// Reset
								iframeHit = false;
							
								// Fire
								// alert('hashchange');
								History.$window.trigger('hashchange');
								// alert('hashchange.');
							}
							else {
								// Browser hash is not different
							
								// Check if the iframe hash is different from the iframe state
								if ( state !== iframeHash ) {
									// Specify we were hit from the iframe
									iframeHit = true;
								
									// Update the browser hash
									// alert('set hash from iframe');
									History.setHash(iframeHash);
									// alert('set hash from iframe.');
								}
							}
						
						};
					}
					else {
						// We are not IE
						// Firefox, Opera, Etc
				
						// Define the checker function (for bookmarks, back, forward)
						checker = function ( ) {
							var hash = History.getHash();
							var state = History.getState();
							// Check
							if ( state !== hash ) {
								// State change
								History.$window.trigger('hashchange');
							}
						};
					}
				
					// Apply the checker function
					setInterval(checker, 200);
				}
				else {
					// We are IE8, or another browser which supports onhashchange natively
				
					// Fire the initial
					var hash = History.getHash();
					if ( hash ) {
						History.$window.trigger('hashchange');
					}
				}
			
				// Done
				return true;
			}
	
		}; // We have finished extending/defining our Plugin
	
		// --------------------------------------------------
		// Finish up
	
		// Instantiate
		$.History.construct();
	}
	else {
		window.console.warn('$.History has already been defined...');
	}
	
	// Finished definition
})(jQuery); // We are done with our plugin, so lets call it with jQuery as the argument
