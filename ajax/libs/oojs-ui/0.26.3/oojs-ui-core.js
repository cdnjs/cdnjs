/*!
 * OOUI v0.26.3
 * https://www.mediawiki.org/wiki/OOUI
 *
 * Copyright 2011–2018 OOUI Team and other contributors.
 * Released under the MIT license
 * http://oojs.mit-license.org
 *
 * Date: 2018-04-10T22:15:39Z
 */
( function ( OO ) {

'use strict';

/**
 * Namespace for all classes, static methods and static properties.
 *
 * @class
 * @singleton
 */
OO.ui = {};

OO.ui.bind = $.proxy;

/**
 * @property {Object}
 */
OO.ui.Keys = {
	UNDEFINED: 0,
	BACKSPACE: 8,
	DELETE: 46,
	LEFT: 37,
	RIGHT: 39,
	UP: 38,
	DOWN: 40,
	ENTER: 13,
	END: 35,
	HOME: 36,
	TAB: 9,
	PAGEUP: 33,
	PAGEDOWN: 34,
	ESCAPE: 27,
	SHIFT: 16,
	SPACE: 32
};

/**
 * Constants for MouseEvent.which
 *
 * @property {Object}
 */
OO.ui.MouseButtons = {
	LEFT: 1,
	MIDDLE: 2,
	RIGHT: 3
};

/**
 * @property {number}
 * @private
 */
OO.ui.elementId = 0;

/**
 * Generate a unique ID for element
 *
 * @return {string} ID
 */
OO.ui.generateElementId = function () {
	OO.ui.elementId++;
	return 'ooui-' + OO.ui.elementId;
};

/**
 * Check if an element is focusable.
 * Inspired by :focusable in jQueryUI v1.11.4 - 2015-04-14
 *
 * @param {jQuery} $element Element to test
 * @return {boolean} Element is focusable
 */
OO.ui.isFocusableElement = function ( $element ) {
	var nodeName,
		element = $element[ 0 ];

	// Anything disabled is not focusable
	if ( element.disabled ) {
		return false;
	}

	// Check if the element is visible
	if ( !(
		// This is quicker than calling $element.is( ':visible' )
		$.expr.pseudos.visible( element ) &&
		// Check that all parents are visible
		!$element.parents().addBack().filter( function () {
			return $.css( this, 'visibility' ) === 'hidden';
		} ).length
	) ) {
		return false;
	}

	// Check if the element is ContentEditable, which is the string 'true'
	if ( element.contentEditable === 'true' ) {
		return true;
	}

	// Anything with a non-negative numeric tabIndex is focusable.
	// Use .prop to avoid browser bugs
	if ( $element.prop( 'tabIndex' ) >= 0 ) {
		return true;
	}

	// Some element types are naturally focusable
	// (indexOf is much faster than regex in Chrome and about the
	// same in FF: https://jsperf.com/regex-vs-indexof-array2)
	nodeName = element.nodeName.toLowerCase();
	if ( [ 'input', 'select', 'textarea', 'button', 'object' ].indexOf( nodeName ) !== -1 ) {
		return true;
	}

	// Links and areas are focusable if they have an href
	if ( ( nodeName === 'a' || nodeName === 'area' ) && $element.attr( 'href' ) !== undefined ) {
		return true;
	}

	return false;
};

/**
 * Find a focusable child
 *
 * @param {jQuery} $container Container to search in
 * @param {boolean} [backwards] Search backwards
 * @return {jQuery} Focusable child, or an empty jQuery object if none found
 */
OO.ui.findFocusable = function ( $container, backwards ) {
	var $focusable = $( [] ),
		// $focusableCandidates is a superset of things that
		// could get matched by isFocusableElement
		$focusableCandidates = $container
			.find( 'input, select, textarea, button, object, a, area, [contenteditable], [tabindex]' );

	if ( backwards ) {
		$focusableCandidates = Array.prototype.reverse.call( $focusableCandidates );
	}

	$focusableCandidates.each( function () {
		var $this = $( this );
		if ( OO.ui.isFocusableElement( $this ) ) {
			$focusable = $this;
			return false;
		}
	} );
	return $focusable;
};

/**
 * Get the user's language and any fallback languages.
 *
 * These language codes are used to localize user interface elements in the user's language.
 *
 * In environments that provide a localization system, this function should be overridden to
 * return the user's language(s). The default implementation returns English (en) only.
 *
 * @return {string[]} Language codes, in descending order of priority
 */
OO.ui.getUserLanguages = function () {
	return [ 'en' ];
};

/**
 * Get a value in an object keyed by language code.
 *
 * @param {Object.<string,Mixed>} obj Object keyed by language code
 * @param {string|null} [lang] Language code, if omitted or null defaults to any user language
 * @param {string} [fallback] Fallback code, used if no matching language can be found
 * @return {Mixed} Local value
 */
OO.ui.getLocalValue = function ( obj, lang, fallback ) {
	var i, len, langs;

	// Requested language
	if ( obj[ lang ] ) {
		return obj[ lang ];
	}
	// Known user language
	langs = OO.ui.getUserLanguages();
	for ( i = 0, len = langs.length; i < len; i++ ) {
		lang = langs[ i ];
		if ( obj[ lang ] ) {
			return obj[ lang ];
		}
	}
	// Fallback language
	if ( obj[ fallback ] ) {
		return obj[ fallback ];
	}
	// First existing language
	for ( lang in obj ) {
		return obj[ lang ];
	}

	return undefined;
};

/**
 * Check if a node is contained within another node
 *
 * Similar to jQuery#contains except a list of containers can be supplied
 * and a boolean argument allows you to include the container in the match list
 *
 * @param {HTMLElement|HTMLElement[]} containers Container node(s) to search in
 * @param {HTMLElement} contained Node to find
 * @param {boolean} [matchContainers] Include the container(s) in the list of nodes to match, otherwise only match descendants
 * @return {boolean} The node is in the list of target nodes
 */
OO.ui.contains = function ( containers, contained, matchContainers ) {
	var i;
	if ( !Array.isArray( containers ) ) {
		containers = [ containers ];
	}
	for ( i = containers.length - 1; i >= 0; i-- ) {
		if ( ( matchContainers && contained === containers[ i ] ) || $.contains( containers[ i ], contained ) ) {
			return true;
		}
	}
	return false;
};

/**
 * Return a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 *
 * Ported from: http://underscorejs.org/underscore.js
 *
 * @param {Function} func Function to debounce
 * @param {number} [wait=0] Wait period in milliseconds
 * @param {boolean} [immediate] Trigger on leading edge
 * @return {Function} Debounced function
 */
OO.ui.debounce = function ( func, wait, immediate ) {
	var timeout;
	return function () {
		var context = this,
			args = arguments,
			later = function () {
				timeout = null;
				if ( !immediate ) {
					func.apply( context, args );
				}
			};
		if ( immediate && !timeout ) {
			func.apply( context, args );
		}
		if ( !timeout || wait ) {
			clearTimeout( timeout );
			timeout = setTimeout( later, wait );
		}
	};
};

/**
 * Puts a console warning with provided message.
 *
 * @param {string} message Message
 */
OO.ui.warnDeprecation = function ( message ) {
	if ( OO.getProp( window, 'console', 'warn' ) !== undefined ) {
		// eslint-disable-next-line no-console
		console.warn( message );
	}
};

/**
 * Returns a function, that, when invoked, will only be triggered at most once
 * during a given window of time. If called again during that window, it will
 * wait until the window ends and then trigger itself again.
 *
 * As it's not knowable to the caller whether the function will actually run
 * when the wrapper is called, return values from the function are entirely
 * discarded.
 *
 * @param {Function} func Function to throttle
 * @param {number} wait Throttle window length, in milliseconds
 * @return {Function} Throttled function
 */
OO.ui.throttle = function ( func, wait ) {
	var context, args, timeout,
		previous = 0,
		run = function () {
			timeout = null;
			previous = OO.ui.now();
			func.apply( context, args );
		};
	return function () {
		// Check how long it's been since the last time the function was
		// called, and whether it's more or less than the requested throttle
		// period. If it's less, run the function immediately. If it's more,
		// set a timeout for the remaining time -- but don't replace an
		// existing timeout, since that'd indefinitely prolong the wait.
		var remaining = wait - ( OO.ui.now() - previous );
		context = this;
		args = arguments;
		if ( remaining <= 0 ) {
			// Note: unless wait was ridiculously large, this means we'll
			// automatically run the first time the function was called in a
			// given period. (If you provide a wait period larger than the
			// current Unix timestamp, you *deserve* unexpected behavior.)
			clearTimeout( timeout );
			run();
		} else if ( !timeout ) {
			timeout = setTimeout( run, remaining );
		}
	};
};

/**
 * A (possibly faster) way to get the current timestamp as an integer
 *
 * @return {number} Current timestamp, in milliseconds since the Unix epoch
 */
OO.ui.now = Date.now || function () {
	return new Date().getTime();
};

/**
 * Reconstitute a JavaScript object corresponding to a widget created by
 * the PHP implementation.
 *
 * This is an alias for `OO.ui.Element.static.infuse()`.
 *
 * @param {string|HTMLElement|jQuery} idOrNode
 *   A DOM id (if a string) or node for the widget to infuse.
 * @return {OO.ui.Element}
 *   The `OO.ui.Element` corresponding to this (infusable) document node.
 */
OO.ui.infuse = function ( idOrNode ) {
	return OO.ui.Element.static.infuse( idOrNode );
};

( function () {
	/**
	 * Message store for the default implementation of OO.ui.msg
	 *
	 * Environments that provide a localization system should not use this, but should override
	 * OO.ui.msg altogether.
	 *
	 * @private
	 */
	var messages = {
		// Tool tip for a button that moves items in a list down one place
		'ooui-outline-control-move-down': 'Move item down',
		// Tool tip for a button that moves items in a list up one place
		'ooui-outline-control-move-up': 'Move item up',
		// Tool tip for a button that removes items from a list
		'ooui-outline-control-remove': 'Remove item',
		// Label for the toolbar group that contains a list of all other available tools
		'ooui-toolbar-more': 'More',
		// Label for the fake tool that expands the full list of tools in a toolbar group
		'ooui-toolgroup-expand': 'More',
		// Label for the fake tool that collapses the full list of tools in a toolbar group
		'ooui-toolgroup-collapse': 'Fewer',
		// Default label for the tooltip for the button that removes a tag item
		'ooui-item-remove': 'Remove',
		// Default label for the accept button of a confirmation dialog
		'ooui-dialog-message-accept': 'OK',
		// Default label for the reject button of a confirmation dialog
		'ooui-dialog-message-reject': 'Cancel',
		// Title for process dialog error description
		'ooui-dialog-process-error': 'Something went wrong',
		// Label for process dialog dismiss error button, visible when describing errors
		'ooui-dialog-process-dismiss': 'Dismiss',
		// Label for process dialog retry action button, visible when describing only recoverable errors
		'ooui-dialog-process-retry': 'Try again',
		// Label for process dialog retry action button, visible when describing only warnings
		'ooui-dialog-process-continue': 'Continue',
		// Label for the file selection widget's select file button
		'ooui-selectfile-button-select': 'Select a file',
		// Label for the file selection widget if file selection is not supported
		'ooui-selectfile-not-supported': 'File selection is not supported',
		// Label for the file selection widget when no file is currently selected
		'ooui-selectfile-placeholder': 'No file is selected',
		// Label for the file selection widget's drop target
		'ooui-selectfile-dragdrop-placeholder': 'Drop file here'
	};

	/**
	 * Get a localized message.
	 *
	 * After the message key, message parameters may optionally be passed. In the default implementation,
	 * any occurrences of $1 are replaced with the first parameter, $2 with the second parameter, etc.
	 * Alternative implementations of OO.ui.msg may use any substitution system they like, as long as
	 * they support unnamed, ordered message parameters.
	 *
	 * In environments that provide a localization system, this function should be overridden to
	 * return the message translated in the user's language. The default implementation always returns
	 * English messages. An example of doing this with [jQuery.i18n](https://github.com/wikimedia/jquery.i18n)
	 * follows.
	 *
	 *     @example
	 *     var i, iLen, button,
	 *         messagePath = 'oojs-ui/dist/i18n/',
	 *         languages = [ $.i18n().locale, 'ur', 'en' ],
	 *         languageMap = {};
	 *
	 *     for ( i = 0, iLen = languages.length; i < iLen; i++ ) {
	 *         languageMap[ languages[ i ] ] = messagePath + languages[ i ].toLowerCase() + '.json';
	 *     }
	 *
	 *     $.i18n().load( languageMap ).done( function() {
	 *         // Replace the built-in `msg` only once we've loaded the internationalization.
	 *         // OOUI uses `OO.ui.deferMsg` for all initially-loaded messages. So long as
	 *         // you put off creating any widgets until this promise is complete, no English
	 *         // will be displayed.
	 *         OO.ui.msg = $.i18n;
	 *
	 *         // A button displaying "OK" in the default locale
	 *         button = new OO.ui.ButtonWidget( {
	 *             label: OO.ui.msg( 'ooui-dialog-message-accept' ),
	 *             icon: 'check'
	 *         } );
	 *         $( 'body' ).append( button.$element );
	 *
	 *         // A button displaying "OK" in Urdu
	 *         $.i18n().locale = 'ur';
	 *         button = new OO.ui.ButtonWidget( {
	 *             label: OO.ui.msg( 'ooui-dialog-message-accept' ),
	 *             icon: 'check'
	 *         } );
	 *         $( 'body' ).append( button.$element );
	 *     } );
	 *
	 * @param {string} key Message key
	 * @param {...Mixed} [params] Message parameters
	 * @return {string} Translated message with parameters substituted
	 */
	OO.ui.msg = function ( key ) {
		var message = messages[ key ],
			params = Array.prototype.slice.call( arguments, 1 );
		if ( typeof message === 'string' ) {
			// Perform $1 substitution
			message = message.replace( /\$(\d+)/g, function ( unused, n ) {
				var i = parseInt( n, 10 );
				return params[ i - 1 ] !== undefined ? params[ i - 1 ] : '$' + n;
			} );
		} else {
			// Return placeholder if message not found
			message = '[' + key + ']';
		}
		return message;
	};
}() );

/**
 * Package a message and arguments for deferred resolution.
 *
 * Use this when you are statically specifying a message and the message may not yet be present.
 *
 * @param {string} key Message key
 * @param {...Mixed} [params] Message parameters
 * @return {Function} Function that returns the resolved message when executed
 */
OO.ui.deferMsg = function () {
	var args = arguments;
	return function () {
		return OO.ui.msg.apply( OO.ui, args );
	};
};

/**
 * Resolve a message.
 *
 * If the message is a function it will be executed, otherwise it will pass through directly.
 *
 * @param {Function|string} msg Deferred message, or message text
 * @return {string} Resolved message
 */
OO.ui.resolveMsg = function ( msg ) {
	if ( $.isFunction( msg ) ) {
		return msg();
	}
	return msg;
};

/**
 * @param {string} url
 * @return {boolean}
 */
OO.ui.isSafeUrl = function ( url ) {
	// Keep this function in sync with php/Tag.php
	var i, protocolWhitelist;

	function stringStartsWith( haystack, needle ) {
		return haystack.substr( 0, needle.length ) === needle;
	}

	protocolWhitelist = [
		'bitcoin', 'ftp', 'ftps', 'geo', 'git', 'gopher', 'http', 'https', 'irc', 'ircs',
		'magnet', 'mailto', 'mms', 'news', 'nntp', 'redis', 'sftp', 'sip', 'sips', 'sms', 'ssh',
		'svn', 'tel', 'telnet', 'urn', 'worldwind', 'xmpp'
	];

	if ( url === '' ) {
		return true;
	}

	for ( i = 0; i < protocolWhitelist.length; i++ ) {
		if ( stringStartsWith( url, protocolWhitelist[ i ] + ':' ) ) {
			return true;
		}
	}

	// This matches '//' too
	if ( stringStartsWith( url, '/' ) || stringStartsWith( url, './' ) ) {
		return true;
	}
	if ( stringStartsWith( url, '?' ) || stringStartsWith( url, '#' ) ) {
		return true;
	}

	return false;
};

/**
 * Check if the user has a 'mobile' device.
 *
 * For our purposes this means the user is primarily using an
 * on-screen keyboard, touch input instead of a mouse and may
 * have a physically small display.
 *
 * It is left up to implementors to decide how to compute this
 * so the default implementation always returns false.
 *
 * @return {boolean} User is on a mobile device
 */
OO.ui.isMobile = function () {
	return false;
};

/**
 * Get the additional spacing that should be taken into account when displaying elements that are
 * clipped to the viewport, e.g. dropdown menus and popups. This is meant to be overridden to avoid
 * such menus overlapping any fixed headers/toolbars/navigation used by the site.
 *
 * @return {Object} Object with the properties 'top', 'right', 'bottom', 'left', each representing
 *     the extra spacing from that edge of viewport (in pixels)
 */
OO.ui.getViewportSpacing = function () {
	return {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	};
};

/**
 * Get the default overlay, which is used by various widgets when they are passed `$overlay: true`.
 * See <https://www.mediawiki.org/wiki/OOUI/Concepts#Overlays>.
 *
 * @return {jQuery} Default overlay node
 */
OO.ui.getDefaultOverlay = function () {
	if ( !OO.ui.$defaultOverlay ) {
		OO.ui.$defaultOverlay = $( '<div>' ).addClass( 'oo-ui-defaultOverlay' );
		$( 'body' ).append( OO.ui.$defaultOverlay );
	}
	return OO.ui.$defaultOverlay;
};

/*!
 * Mixin namespace.
 */

/**
 * Namespace for OOUI mixins.
 *
 * Mixins are named according to the type of object they are intended to
 * be mixed in to.  For example, OO.ui.mixin.GroupElement is intended to be
 * mixed in to an instance of OO.ui.Element, and OO.ui.mixin.GroupWidget
 * is intended to be mixed in to an instance of OO.ui.Widget.
 *
 * @class
 * @singleton
 */
OO.ui.mixin = {};

/**
 * Each Element represents a rendering in the DOM—a button or an icon, for example, or anything
 * that is visible to a user. Unlike {@link OO.ui.Widget widgets}, plain elements usually do not have events
 * connected to them and can't be interacted with.
 *
 * @abstract
 * @class
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {string[]} [classes] The names of the CSS classes to apply to the element. CSS styles are added
 *  to the top level (e.g., the outermost div) of the element. See the [OOUI documentation on MediaWiki][2]
 *  for an example.
 *  [2]: https://www.mediawiki.org/wiki/OOUI/Widgets/Buttons_and_Switches#cssExample
 * @cfg {string} [id] The HTML id attribute used in the rendered tag.
 * @cfg {string} [text] Text to insert
 * @cfg {Array} [content] An array of content elements to append (after #text).
 *  Strings will be html-escaped; use an OO.ui.HtmlSnippet to append raw HTML.
 *  Instances of OO.ui.Element will have their $element appended.
 * @cfg {jQuery} [$content] Content elements to append (after #text).
 * @cfg {jQuery} [$element] Wrapper element. Defaults to a new element with #getTagName.
 * @cfg {Mixed} [data] Custom data of any type or combination of types (e.g., string, number, array, object).
 *  Data can also be specified with the #setData method.
 */
OO.ui.Element = function OoUiElement( config ) {
	if ( OO.ui.isDemo ) {
		this.initialConfig = config;
	}
	// Configuration initialization
	config = config || {};

	// Properties
	this.$ = $;
	this.elementId = null;
	this.visible = true;
	this.data = config.data;
	this.$element = config.$element ||
		$( document.createElement( this.getTagName() ) );
	this.elementGroup = null;

	// Initialization
	if ( Array.isArray( config.classes ) ) {
		this.$element.addClass( config.classes.join( ' ' ) );
	}
	if ( config.id ) {
		this.setElementId( config.id );
	}
	if ( config.text ) {
		this.$element.text( config.text );
	}
	if ( config.content ) {
		// The `content` property treats plain strings as text; use an
		// HtmlSnippet to append HTML content.  `OO.ui.Element`s get their
		// appropriate $element appended.
		this.$element.append( config.content.map( function ( v ) {
			if ( typeof v === 'string' ) {
				// Escape string so it is properly represented in HTML.
				return document.createTextNode( v );
			} else if ( v instanceof OO.ui.HtmlSnippet ) {
				// Bypass escaping.
				return v.toString();
			} else if ( v instanceof OO.ui.Element ) {
				return v.$element;
			}
			return v;
		} ) );
	}
	if ( config.$content ) {
		// The `$content` property treats plain strings as HTML.
		this.$element.append( config.$content );
	}
};

/* Setup */

OO.initClass( OO.ui.Element );

/* Static Properties */

/**
 * The name of the HTML tag used by the element.
 *
 * The static value may be ignored if the #getTagName method is overridden.
 *
 * @static
 * @inheritable
 * @property {string}
 */
OO.ui.Element.static.tagName = 'div';

/* Static Methods */

/**
 * Reconstitute a JavaScript object corresponding to a widget created
 * by the PHP implementation.
 *
 * @param {string|HTMLElement|jQuery} idOrNode
 *   A DOM id (if a string) or node for the widget to infuse.
 * @return {OO.ui.Element}
 *   The `OO.ui.Element` corresponding to this (infusable) document node.
 *   For `Tag` objects emitted on the HTML side (used occasionally for content)
 *   the value returned is a newly-created Element wrapping around the existing
 *   DOM node.
 */
OO.ui.Element.static.infuse = function ( idOrNode ) {
	var obj = OO.ui.Element.static.unsafeInfuse( idOrNode, false );
	// Verify that the type matches up.
	// FIXME: uncomment after T89721 is fixed, see T90929.
	/*
	if ( !( obj instanceof this['class'] ) ) {
		throw new Error( 'Infusion type mismatch!' );
	}
	*/
	return obj;
};

/**
 * Implementation helper for `infuse`; skips the type check and has an
 * extra property so that only the top-level invocation touches the DOM.
 *
 * @private
 * @param {string|HTMLElement|jQuery} idOrNode
 * @param {jQuery.Promise|boolean} domPromise A promise that will be resolved
 *     when the top-level widget of this infusion is inserted into DOM,
 *     replacing the original node; or false for top-level invocation.
 * @return {OO.ui.Element}
 */
OO.ui.Element.static.unsafeInfuse = function ( idOrNode, domPromise ) {
	// look for a cached result of a previous infusion.
	var id, $elem, error, data, cls, parts, parent, obj, top, state, infusedChildren;
	if ( typeof idOrNode === 'string' ) {
		id = idOrNode;
		$elem = $( document.getElementById( id ) );
	} else {
		$elem = $( idOrNode );
		id = $elem.attr( 'id' );
	}
	if ( !$elem.length ) {
		if ( typeof idOrNode === 'string' ) {
			error = 'Widget not found: ' + idOrNode;
		} else if ( idOrNode && idOrNode.selector ) {
			error = 'Widget not found: ' + idOrNode.selector;
		} else {
			error = 'Widget not found';
		}
		throw new Error( error );
	}
	if ( $elem[ 0 ].oouiInfused ) {
		$elem = $elem[ 0 ].oouiInfused;
	}
	data = $elem.data( 'ooui-infused' );
	if ( data ) {
		// cached!
		if ( data === true ) {
			throw new Error( 'Circular dependency! ' + id );
		}
		if ( domPromise ) {
			// pick up dynamic state, like focus, value of form inputs, scroll position, etc.
			state = data.constructor.static.gatherPreInfuseState( $elem, data );
			// restore dynamic state after the new element is re-inserted into DOM under infused parent
			domPromise.done( data.restorePreInfuseState.bind( data, state ) );
			infusedChildren = $elem.data( 'ooui-infused-children' );
			if ( infusedChildren && infusedChildren.length ) {
				infusedChildren.forEach( function ( data ) {
					var state = data.constructor.static.gatherPreInfuseState( $elem, data );
					domPromise.done( data.restorePreInfuseState.bind( data, state ) );
				} );
			}
		}
		return data;
	}
	data = $elem.attr( 'data-ooui' );
	if ( !data ) {
		throw new Error( 'No infusion data found: ' + id );
	}
	try {
		data = JSON.parse( data );
	} catch ( _ ) {
		data = null;
	}
	if ( !( data && data._ ) ) {
		throw new Error( 'No valid infusion data found: ' + id );
	}
	if ( data._ === 'Tag' ) {
		// Special case: this is a raw Tag; wrap existing node, don't rebuild.
		return new OO.ui.Element( { $element: $elem } );
	}
	parts = data._.split( '.' );
	cls = OO.getProp.apply( OO, [ window ].concat( parts ) );
	if ( cls === undefined ) {
		throw new Error( 'Unknown widget type: id: ' + id + ', class: ' + data._ );
	}

	// Verify that we're creating an OO.ui.Element instance
	parent = cls.parent;

	while ( parent !== undefined ) {
		if ( parent === OO.ui.Element ) {
			// Safe
			break;
		}

		parent = parent.parent;
	}

	if ( parent !== OO.ui.Element ) {
		throw new Error( 'Unknown widget type: id: ' + id + ', class: ' + data._ );
	}

	if ( domPromise === false ) {
		top = $.Deferred();
		domPromise = top.promise();
	}
	$elem.data( 'ooui-infused', true ); // prevent loops
	data.id = id; // implicit
	infusedChildren = [];
	data = OO.copy( data, null, function deserialize( value ) {
		var infused;
		if ( OO.isPlainObject( value ) ) {
			if ( value.tag ) {
				infused = OO.ui.Element.static.unsafeInfuse( value.tag, domPromise );
				infusedChildren.push( infused );
				// Flatten the structure
				infusedChildren.push.apply( infusedChildren, infused.$element.data( 'ooui-infused-children' ) || [] );
				infused.$element.removeData( 'ooui-infused-children' );
				return infused;
			}
			if ( value.html !== undefined ) {
				return new OO.ui.HtmlSnippet( value.html );
			}
		}
	} );
	// allow widgets to reuse parts of the DOM
	data = cls.static.reusePreInfuseDOM( $elem[ 0 ], data );
	// pick up dynamic state, like focus, value of form inputs, scroll position, etc.
	state = cls.static.gatherPreInfuseState( $elem[ 0 ], data );
	// rebuild widget
	// eslint-disable-next-line new-cap
	obj = new cls( data );
	// If anyone is holding a reference to the old DOM element,
	// let's allow them to OO.ui.infuse() it and do what they expect, see T105828.
	// Do not use jQuery.data(), as using it on detached nodes leaks memory in 1.x line by design.
	$elem[ 0 ].oouiInfused = obj.$element;
	// now replace old DOM with this new DOM.
	if ( top ) {
		// An efficient constructor might be able to reuse the entire DOM tree of the original element,
		// so only mutate the DOM if we need to.
		if ( $elem[ 0 ] !== obj.$element[ 0 ] ) {
			$elem.replaceWith( obj.$element );
		}
		top.resolve();
	}
	obj.$element.data( 'ooui-infused', obj );
	obj.$element.data( 'ooui-infused-children', infusedChildren );
	// set the 'data-ooui' attribute so we can identify infused widgets
	obj.$element.attr( 'data-ooui', '' );
	// restore dynamic state after the new element is inserted into DOM
	domPromise.done( obj.restorePreInfuseState.bind( obj, state ) );
	return obj;
};

/**
 * Pick out parts of `node`'s DOM to be reused when infusing a widget.
 *
 * This method **must not** make any changes to the DOM, only find interesting pieces and add them
 * to `config` (which should then be returned). Actual DOM juggling should then be done by the
 * constructor, which will be given the enhanced config.
 *
 * @protected
 * @param {HTMLElement} node
 * @param {Object} config
 * @return {Object}
 */
OO.ui.Element.static.reusePreInfuseDOM = function ( node, config ) {
	return config;
};

/**
 * Gather the dynamic state (focus, value of form inputs, scroll position, etc.) of an HTML DOM node
 * (and its children) that represent an Element of the same class and the given configuration,
 * generated by the PHP implementation.
 *
 * This method is called just before `node` is detached from the DOM. The return value of this
 * function will be passed to #restorePreInfuseState after the newly created widget's #$element
 * is inserted into DOM to replace `node`.
 *
 * @protected
 * @param {HTMLElement} node
 * @param {Object} config
 * @return {Object}
 */
OO.ui.Element.static.gatherPreInfuseState = function () {
	return {};
};

/**
 * Get a jQuery function within a specific document.
 *
 * @static
 * @param {jQuery|HTMLElement|HTMLDocument|Window} context Context to bind the function to
 * @param {jQuery} [$iframe] HTML iframe element that contains the document, omit if document is
 *   not in an iframe
 * @return {Function} Bound jQuery function
 */
OO.ui.Element.static.getJQuery = function ( context, $iframe ) {
	function wrapper( selector ) {
		return $( selector, wrapper.context );
	}

	wrapper.context = this.getDocument( context );

	if ( $iframe ) {
		wrapper.$iframe = $iframe;
	}

	return wrapper;
};

/**
 * Get the document of an element.
 *
 * @static
 * @param {jQuery|HTMLElement|HTMLDocument|Window} obj Object to get the document for
 * @return {HTMLDocument|null} Document object
 */
OO.ui.Element.static.getDocument = function ( obj ) {
	// jQuery - selections created "offscreen" won't have a context, so .context isn't reliable
	return ( obj[ 0 ] && obj[ 0 ].ownerDocument ) ||
		// Empty jQuery selections might have a context
		obj.context ||
		// HTMLElement
		obj.ownerDocument ||
		// Window
		obj.document ||
		// HTMLDocument
		( obj.nodeType === Node.DOCUMENT_NODE && obj ) ||
		null;
};

/**
 * Get the window of an element or document.
 *
 * @static
 * @param {jQuery|HTMLElement|HTMLDocument|Window} obj Context to get the window for
 * @return {Window} Window object
 */
OO.ui.Element.static.getWindow = function ( obj ) {
	var doc = this.getDocument( obj );
	return doc.defaultView;
};

/**
 * Get the direction of an element or document.
 *
 * @static
 * @param {jQuery|HTMLElement|HTMLDocument|Window} obj Context to get the direction for
 * @return {string} Text direction, either 'ltr' or 'rtl'
 */
OO.ui.Element.static.getDir = function ( obj ) {
	var isDoc, isWin;

	if ( obj instanceof jQuery ) {
		obj = obj[ 0 ];
	}
	isDoc = obj.nodeType === Node.DOCUMENT_NODE;
	isWin = obj.document !== undefined;
	if ( isDoc || isWin ) {
		if ( isWin ) {
			obj = obj.document;
		}
		obj = obj.body;
	}
	return $( obj ).css( 'direction' );
};

/**
 * Get the offset between two frames.
 *
 * TODO: Make this function not use recursion.
 *
 * @static
 * @param {Window} from Window of the child frame
 * @param {Window} [to=window] Window of the parent frame
 * @param {Object} [offset] Offset to start with, used internally
 * @return {Object} Offset object, containing left and top properties
 */
OO.ui.Element.static.getFrameOffset = function ( from, to, offset ) {
	var i, len, frames, frame, rect;

	if ( !to ) {
		to = window;
	}
	if ( !offset ) {
		offset = { top: 0, left: 0 };
	}
	if ( from.parent === from ) {
		return offset;
	}

	// Get iframe element
	frames = from.parent.document.getElementsByTagName( 'iframe' );
	for ( i = 0, len = frames.length; i < len; i++ ) {
		if ( frames[ i ].contentWindow === from ) {
			frame = frames[ i ];
			break;
		}
	}

	// Recursively accumulate offset values
	if ( frame ) {
		rect = frame.getBoundingClientRect();
		offset.left += rect.left;
		offset.top += rect.top;
		if ( from !== to ) {
			this.getFrameOffset( from.parent, offset );
		}
	}
	return offset;
};

/**
 * Get the offset between two elements.
 *
 * The two elements may be in a different frame, but in that case the frame $element is in must
 * be contained in the frame $anchor is in.
 *
 * @static
 * @param {jQuery} $element Element whose position to get
 * @param {jQuery} $anchor Element to get $element's position relative to
 * @return {Object} Translated position coordinates, containing top and left properties
 */
OO.ui.Element.static.getRelativePosition = function ( $element, $anchor ) {
	var iframe, iframePos,
		pos = $element.offset(),
		anchorPos = $anchor.offset(),
		elementDocument = this.getDocument( $element ),
		anchorDocument = this.getDocument( $anchor );

	// If $element isn't in the same document as $anchor, traverse up
	while ( elementDocument !== anchorDocument ) {
		iframe = elementDocument.defaultView.frameElement;
		if ( !iframe ) {
			throw new Error( '$element frame is not contained in $anchor frame' );
		}
		iframePos = $( iframe ).offset();
		pos.left += iframePos.left;
		pos.top += iframePos.top;
		elementDocument = iframe.ownerDocument;
	}
	pos.left -= anchorPos.left;
	pos.top -= anchorPos.top;
	return pos;
};

/**
 * Get element border sizes.
 *
 * @static
 * @param {HTMLElement} el Element to measure
 * @return {Object} Dimensions object with `top`, `left`, `bottom` and `right` properties
 */
OO.ui.Element.static.getBorders = function ( el ) {
	var doc = el.ownerDocument,
		win = doc.defaultView,
		style = win.getComputedStyle( el, null ),
		$el = $( el ),
		top = parseFloat( style ? style.borderTopWidth : $el.css( 'borderTopWidth' ) ) || 0,
		left = parseFloat( style ? style.borderLeftWidth : $el.css( 'borderLeftWidth' ) ) || 0,
		bottom = parseFloat( style ? style.borderBottomWidth : $el.css( 'borderBottomWidth' ) ) || 0,
		right = parseFloat( style ? style.borderRightWidth : $el.css( 'borderRightWidth' ) ) || 0;

	return {
		top: top,
		left: left,
		bottom: bottom,
		right: right
	};
};

/**
 * Get dimensions of an element or window.
 *
 * @static
 * @param {HTMLElement|Window} el Element to measure
 * @return {Object} Dimensions object with `borders`, `scroll`, `scrollbar` and `rect` properties
 */
OO.ui.Element.static.getDimensions = function ( el ) {
	var $el, $win,
		doc = el.ownerDocument || el.document,
		win = doc.defaultView;

	if ( win === el || el === doc.documentElement ) {
		$win = $( win );
		return {
			borders: { top: 0, left: 0, bottom: 0, right: 0 },
			scroll: {
				top: $win.scrollTop(),
				left: $win.scrollLeft()
			},
			scrollbar: { right: 0, bottom: 0 },
			rect: {
				top: 0,
				left: 0,
				bottom: $win.innerHeight(),
				right: $win.innerWidth()
			}
		};
	} else {
		$el = $( el );
		return {
			borders: this.getBorders( el ),
			scroll: {
				top: $el.scrollTop(),
				left: $el.scrollLeft()
			},
			scrollbar: {
				right: $el.innerWidth() - el.clientWidth,
				bottom: $el.innerHeight() - el.clientHeight
			},
			rect: el.getBoundingClientRect()
		};
	}
};

/**
 * Get the number of pixels that an element's content is scrolled to the left.
 *
 * Adapted from <https://github.com/othree/jquery.rtl-scroll-type>.
 * Original code copyright 2012 Wei-Ko Kao, licensed under the MIT License.
 *
 * This function smooths out browser inconsistencies (nicely described in the README at
 * <https://github.com/othree/jquery.rtl-scroll-type>) and produces a result consistent
 * with Firefox's 'scrollLeft', which seems the sanest.
 *
 * @static
 * @method
 * @param {HTMLElement|Window} el Element to measure
 * @return {number} Scroll position from the left.
 *  If the element's direction is LTR, this is a positive number between `0` (initial scroll position)
 *  and `el.scrollWidth - el.clientWidth` (furthest possible scroll position).
 *  If the element's direction is RTL, this is a negative number between `0` (initial scroll position)
 *  and `-el.scrollWidth + el.clientWidth` (furthest possible scroll position).
 */
OO.ui.Element.static.getScrollLeft = ( function () {
	var rtlScrollType = null;

	function test() {
		var $definer = $( '<div dir="rtl" style="font-size: 14px; width: 1px; height: 1px; position: absolute; top: -1000px; overflow: scroll">A</div>' ),
			definer = $definer[ 0 ];

		$definer.appendTo( 'body' );
		if ( definer.scrollLeft > 0 ) {
			// Safari, Chrome
			rtlScrollType = 'default';
		} else {
			definer.scrollLeft = 1;
			if ( definer.scrollLeft === 0 ) {
				// Firefox, old Opera
				rtlScrollType = 'negative';
			} else {
				// Internet Explorer, Edge
				rtlScrollType = 'reverse';
			}
		}
		$definer.remove();
	}

	return function getScrollLeft( el ) {
		var isRoot = el.window === el ||
				el === el.ownerDocument.body ||
				el === el.ownerDocument.documentElement,
			scrollLeft = isRoot ? $( window ).scrollLeft() : el.scrollLeft,
			// All browsers use the correct scroll type ('negative') on the root, so don't
			// do any fixups when looking at the root element
			direction = isRoot ? 'ltr' : $( el ).css( 'direction' );

		if ( direction === 'rtl' ) {
			if ( rtlScrollType === null ) {
				test();
			}
			if ( rtlScrollType === 'reverse' ) {
				scrollLeft = -scrollLeft;
			} else if ( rtlScrollType === 'default' ) {
				scrollLeft = scrollLeft - el.scrollWidth + el.clientWidth;
			}
		}

		return scrollLeft;
	};
}() );

/**
 * Get the root scrollable element of given element's document.
 *
 * On Blink-based browsers (Chrome etc.), `document.documentElement` can't be used to get or set
 * the scrollTop property; instead we have to use `document.body`. Changing and testing the value
 * lets us use 'body' or 'documentElement' based on what is working.
 *
 * https://code.google.com/p/chromium/issues/detail?id=303131
 *
 * @static
 * @param {HTMLElement} el Element to find root scrollable parent for
 * @return {HTMLElement} Scrollable parent, `document.body` or `document.documentElement`
 *     depending on browser
 */
OO.ui.Element.static.getRootScrollableElement = function ( el ) {
	var scrollTop, body;

	if ( OO.ui.scrollableElement === undefined ) {
		body = el.ownerDocument.body;
		scrollTop = body.scrollTop;
		body.scrollTop = 1;

		// In some browsers (observed in Chrome 56 on Linux Mint 18.1),
		// body.scrollTop doesn't become exactly 1, but a fractional value like 0.76
		if ( Math.round( body.scrollTop ) === 1 ) {
			body.scrollTop = scrollTop;
			OO.ui.scrollableElement = 'body';
		} else {
			OO.ui.scrollableElement = 'documentElement';
		}
	}

	return el.ownerDocument[ OO.ui.scrollableElement ];
};

/**
 * Get closest scrollable container.
 *
 * Traverses up until either a scrollable element or the root is reached, in which case the root
 * scrollable element will be returned (see #getRootScrollableElement).
 *
 * @static
 * @param {HTMLElement} el Element to find scrollable container for
 * @param {string} [dimension] Dimension of scrolling to look for; `x`, `y` or omit for either
 * @return {HTMLElement} Closest scrollable container
 */
OO.ui.Element.static.getClosestScrollableContainer = function ( el, dimension ) {
	var i, val,
		// Browsers do not correctly return the computed value of 'overflow' when 'overflow-x' and
		// 'overflow-y' have different values, so we need to check the separate properties.
		props = [ 'overflow-x', 'overflow-y' ],
		$parent = $( el ).parent();

	if ( dimension === 'x' || dimension === 'y' ) {
		props = [ 'overflow-' + dimension ];
	}

	// Special case for the document root (which doesn't really have any scrollable container, since
	// it is the ultimate scrollable container, but this is probably saner than null or exception)
	if ( $( el ).is( 'html, body' ) ) {
		return this.getRootScrollableElement( el );
	}

	while ( $parent.length ) {
		if ( $parent[ 0 ] === this.getRootScrollableElement( el ) ) {
			return $parent[ 0 ];
		}
		i = props.length;
		while ( i-- ) {
			val = $parent.css( props[ i ] );
			// We assume that elements with 'overflow' (in any direction) set to 'hidden' will never be
			// scrolled in that direction, but they can actually be scrolled programatically. The user can
			// unintentionally perform a scroll in such case even if the application doesn't scroll
			// programatically, e.g. when jumping to an anchor, or when using built-in find functionality.
			// This could cause funny issues...
			if ( val === 'auto' || val === 'scroll' ) {
				return $parent[ 0 ];
			}
		}
		$parent = $parent.parent();
	}
	// The element is unattached... return something mostly sane
	return this.getRootScrollableElement( el );
};

/**
 * Scroll element into view.
 *
 * @static
 * @param {HTMLElement} el Element to scroll into view
 * @param {Object} [config] Configuration options
 * @param {string} [config.duration='fast'] jQuery animation duration value
 * @param {string} [config.direction] Scroll in only one direction, e.g. 'x' or 'y', omit
 *  to scroll in both directions
 * @return {jQuery.Promise} Promise which resolves when the scroll is complete
 */
OO.ui.Element.static.scrollIntoView = function ( el, config ) {
	var position, animations, container, $container, elementDimensions, containerDimensions, $window,
		deferred = $.Deferred();

	// Configuration initialization
	config = config || {};

	animations = {};
	container = this.getClosestScrollableContainer( el, config.direction );
	$container = $( container );
	elementDimensions = this.getDimensions( el );
	containerDimensions = this.getDimensions( container );
	$window = $( this.getWindow( el ) );

	// Compute the element's position relative to the container
	if ( $container.is( 'html, body' ) ) {
		// If the scrollable container is the root, this is easy
		position = {
			top: elementDimensions.rect.top,
			bottom: $window.innerHeight() - elementDimensions.rect.bottom,
			left: elementDimensions.rect.left,
			right: $window.innerWidth() - elementDimensions.rect.right
		};
	} else {
		// Otherwise, we have to subtract el's coordinates from container's coordinates
		position = {
			top: elementDimensions.rect.top - ( containerDimensions.rect.top + containerDimensions.borders.top ),
			bottom: containerDimensions.rect.bottom - containerDimensions.borders.bottom - containerDimensions.scrollbar.bottom - elementDimensions.rect.bottom,
			left: elementDimensions.rect.left - ( containerDimensions.rect.left + containerDimensions.borders.left ),
			right: containerDimensions.rect.right - containerDimensions.borders.right - containerDimensions.scrollbar.right - elementDimensions.rect.right
		};
	}

	if ( !config.direction || config.direction === 'y' ) {
		if ( position.top < 0 ) {
			animations.scrollTop = containerDimensions.scroll.top + position.top;
		} else if ( position.top > 0 && position.bottom < 0 ) {
			animations.scrollTop = containerDimensions.scroll.top + Math.min( position.top, -position.bottom );
		}
	}
	if ( !config.direction || config.direction === 'x' ) {
		if ( position.left < 0 ) {
			animations.scrollLeft = containerDimensions.scroll.left + position.left;
		} else if ( position.left > 0 && position.right < 0 ) {
			animations.scrollLeft = containerDimensions.scroll.left + Math.min( position.left, -position.right );
		}
	}
	if ( !$.isEmptyObject( animations ) ) {
		$container.stop( true ).animate( animations, config.duration === undefined ? 'fast' : config.duration );
		$container.queue( function ( next ) {
			deferred.resolve();
			next();
		} );
	} else {
		deferred.resolve();
	}
	return deferred.promise();
};

/**
 * Force the browser to reconsider whether it really needs to render scrollbars inside the element
 * and reserve space for them, because it probably doesn't.
 *
 * Workaround primarily for <https://code.google.com/p/chromium/issues/detail?id=387290>, but also
 * similar bugs in other browsers. "Just" forcing a reflow is not sufficient in all cases, we need
 * to first actually detach (or hide, but detaching is simpler) all children, *then* force a reflow,
 * and then reattach (or show) them back.
 *
 * @static
 * @param {HTMLElement} el Element to reconsider the scrollbars on
 */
OO.ui.Element.static.reconsiderScrollbars = function ( el ) {
	var i, len, scrollLeft, scrollTop, nodes = [];
	// Save scroll position
	scrollLeft = el.scrollLeft;
	scrollTop = el.scrollTop;
	// Detach all children
	while ( el.firstChild ) {
		nodes.push( el.firstChild );
		el.removeChild( el.firstChild );
	}
	// Force reflow
	void el.offsetHeight;
	// Reattach all children
	for ( i = 0, len = nodes.length; i < len; i++ ) {
		el.appendChild( nodes[ i ] );
	}
	// Restore scroll position (no-op if scrollbars disappeared)
	el.scrollLeft = scrollLeft;
	el.scrollTop = scrollTop;
};

/* Methods */

/**
 * Toggle visibility of an element.
 *
 * @param {boolean} [show] Make element visible, omit to toggle visibility
 * @fires visible
 * @chainable
 */
OO.ui.Element.prototype.toggle = function ( show ) {
	show = show === undefined ? !this.visible : !!show;

	if ( show !== this.isVisible() ) {
		this.visible = show;
		this.$element.toggleClass( 'oo-ui-element-hidden', !this.visible );
		this.emit( 'toggle', show );
	}

	return this;
};

/**
 * Check if element is visible.
 *
 * @return {boolean} element is visible
 */
OO.ui.Element.prototype.isVisible = function () {
	return this.visible;
};

/**
 * Get element data.
 *
 * @return {Mixed} Element data
 */
OO.ui.Element.prototype.getData = function () {
	return this.data;
};

/**
 * Set element data.
 *
 * @param {Mixed} data Element data
 * @chainable
 */
OO.ui.Element.prototype.setData = function ( data ) {
	this.data = data;
	return this;
};

/**
 * Set the element has an 'id' attribute.
 *
 * @param {string} id
 * @chainable
 */
OO.ui.Element.prototype.setElementId = function ( id ) {
	this.elementId = id;
	this.$element.attr( 'id', id );
	return this;
};

/**
 * Ensure that the element has an 'id' attribute, setting it to an unique value if it's missing,
 * and return its value.
 *
 * @return {string}
 */
OO.ui.Element.prototype.getElementId = function () {
	if ( this.elementId === null ) {
		this.setElementId( OO.ui.generateElementId() );
	}
	return this.elementId;
};

/**
 * Check if element supports one or more methods.
 *
 * @param {string|string[]} methods Method or list of methods to check
 * @return {boolean} All methods are supported
 */
OO.ui.Element.prototype.supports = function ( methods ) {
	var i, len,
		support = 0;

	methods = Array.isArray( methods ) ? methods : [ methods ];
	for ( i = 0, len = methods.length; i < len; i++ ) {
		if ( $.isFunction( this[ methods[ i ] ] ) ) {
			support++;
		}
	}

	return methods.length === support;
};

/**
 * Update the theme-provided classes.
 *
 * @localdoc This is called in element mixins and widget classes any time state changes.
 *   Updating is debounced, minimizing overhead of changing multiple attributes and
 *   guaranteeing that theme updates do not occur within an element's constructor
 */
OO.ui.Element.prototype.updateThemeClasses = function () {
	OO.ui.theme.queueUpdateElementClasses( this );
};

/**
 * Get the HTML tag name.
 *
 * Override this method to base the result on instance information.
 *
 * @return {string} HTML tag name
 */
OO.ui.Element.prototype.getTagName = function () {
	return this.constructor.static.tagName;
};

/**
 * Check if the element is attached to the DOM
 *
 * @return {boolean} The element is attached to the DOM
 */
OO.ui.Element.prototype.isElementAttached = function () {
	return $.contains( this.getElementDocument(), this.$element[ 0 ] );
};

/**
 * Get the DOM document.
 *
 * @return {HTMLDocument} Document object
 */
OO.ui.Element.prototype.getElementDocument = function () {
	// Don't cache this in other ways either because subclasses could can change this.$element
	return OO.ui.Element.static.getDocument( this.$element );
};

/**
 * Get the DOM window.
 *
 * @return {Window} Window object
 */
OO.ui.Element.prototype.getElementWindow = function () {
	return OO.ui.Element.static.getWindow( this.$element );
};

/**
 * Get closest scrollable container.
 *
 * @return {HTMLElement} Closest scrollable container
 */
OO.ui.Element.prototype.getClosestScrollableElementContainer = function () {
	return OO.ui.Element.static.getClosestScrollableContainer( this.$element[ 0 ] );
};

/**
 * Get group element is in.
 *
 * @return {OO.ui.mixin.GroupElement|null} Group element, null if none
 */
OO.ui.Element.prototype.getElementGroup = function () {
	return this.elementGroup;
};

/**
 * Set group element is in.
 *
 * @param {OO.ui.mixin.GroupElement|null} group Group element, null if none
 * @chainable
 */
OO.ui.Element.prototype.setElementGroup = function ( group ) {
	this.elementGroup = group;
	return this;
};

/**
 * Scroll element into view.
 *
 * @param {Object} [config] Configuration options
 * @return {jQuery.Promise} Promise which resolves when the scroll is complete
 */
OO.ui.Element.prototype.scrollElementIntoView = function ( config ) {
	if (
		!this.isElementAttached() ||
		!this.isVisible() ||
		( this.getElementGroup() && !this.getElementGroup().isVisible() )
	) {
		return $.Deferred().resolve();
	}
	return OO.ui.Element.static.scrollIntoView( this.$element[ 0 ], config );
};

/**
 * Restore the pre-infusion dynamic state for this widget.
 *
 * This method is called after #$element has been inserted into DOM. The parameter is the return
 * value of #gatherPreInfuseState.
 *
 * @protected
 * @param {Object} state
 */
OO.ui.Element.prototype.restorePreInfuseState = function () {
};

/**
 * Wraps an HTML snippet for use with configuration values which default
 * to strings.  This bypasses the default html-escaping done to string
 * values.
 *
 * @class
 *
 * @constructor
 * @param {string} [content] HTML content
 */
OO.ui.HtmlSnippet = function OoUiHtmlSnippet( content ) {
	// Properties
	this.content = content;
};

/* Setup */

OO.initClass( OO.ui.HtmlSnippet );

/* Methods */

/**
 * Render into HTML.
 *
 * @return {string} Unchanged HTML snippet.
 */
OO.ui.HtmlSnippet.prototype.toString = function () {
	return this.content;
};

/**
 * Layouts are containers for elements and are used to arrange other widgets of arbitrary type in a way
 * that is centrally controlled and can be updated dynamically. Layouts can be, and usually are, combined.
 * See {@link OO.ui.FieldsetLayout FieldsetLayout}, {@link OO.ui.FieldLayout FieldLayout}, {@link OO.ui.FormLayout FormLayout},
 * {@link OO.ui.PanelLayout PanelLayout}, {@link OO.ui.StackLayout StackLayout}, {@link OO.ui.PageLayout PageLayout},
 * {@link OO.ui.HorizontalLayout HorizontalLayout}, and {@link OO.ui.BookletLayout BookletLayout} for more information and examples.
 *
 * @abstract
 * @class
 * @extends OO.ui.Element
 * @mixins OO.EventEmitter
 *
 * @constructor
 * @param {Object} [config] Configuration options
 */
OO.ui.Layout = function OoUiLayout( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.Layout.parent.call( this, config );

	// Mixin constructors
	OO.EventEmitter.call( this );

	// Initialization
	this.$element.addClass( 'oo-ui-layout' );
};

/* Setup */

OO.inheritClass( OO.ui.Layout, OO.ui.Element );
OO.mixinClass( OO.ui.Layout, OO.EventEmitter );

/**
 * Widgets are compositions of one or more OOUI elements that users can both view
 * and interact with. All widgets can be configured and modified via a standard API,
 * and their state can change dynamically according to a model.
 *
 * @abstract
 * @class
 * @extends OO.ui.Element
 * @mixins OO.EventEmitter
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {boolean} [disabled=false] Disable the widget. Disabled widgets cannot be used and their
 *  appearance reflects this state.
 */
OO.ui.Widget = function OoUiWidget( config ) {
	// Initialize config
	config = $.extend( { disabled: false }, config );

	// Parent constructor
	OO.ui.Widget.parent.call( this, config );

	// Mixin constructors
	OO.EventEmitter.call( this );

	// Properties
	this.disabled = null;
	this.wasDisabled = null;

	// Initialization
	this.$element.addClass( 'oo-ui-widget' );
	this.setDisabled( !!config.disabled );
};

/* Setup */

OO.inheritClass( OO.ui.Widget, OO.ui.Element );
OO.mixinClass( OO.ui.Widget, OO.EventEmitter );

/* Events */

/**
 * @event disable
 *
 * A 'disable' event is emitted when the disabled state of the widget changes
 * (i.e. on disable **and** enable).
 *
 * @param {boolean} disabled Widget is disabled
 */

/**
 * @event toggle
 *
 * A 'toggle' event is emitted when the visibility of the widget changes.
 *
 * @param {boolean} visible Widget is visible
 */

/* Methods */

/**
 * Check if the widget is disabled.
 *
 * @return {boolean} Widget is disabled
 */
OO.ui.Widget.prototype.isDisabled = function () {
	return this.disabled;
};

/**
 * Set the 'disabled' state of the widget.
 *
 * When a widget is disabled, it cannot be used and its appearance is updated to reflect this state.
 *
 * @param {boolean} disabled Disable widget
 * @chainable
 */
OO.ui.Widget.prototype.setDisabled = function ( disabled ) {
	var isDisabled;

	this.disabled = !!disabled;
	isDisabled = this.isDisabled();
	if ( isDisabled !== this.wasDisabled ) {
		this.$element.toggleClass( 'oo-ui-widget-disabled', isDisabled );
		this.$element.toggleClass( 'oo-ui-widget-enabled', !isDisabled );
		this.$element.attr( 'aria-disabled', isDisabled.toString() );
		this.emit( 'disable', isDisabled );
		this.updateThemeClasses();
	}
	this.wasDisabled = isDisabled;

	return this;
};

/**
 * Update the disabled state, in case of changes in parent widget.
 *
 * @chainable
 */
OO.ui.Widget.prototype.updateDisabled = function () {
	this.setDisabled( this.disabled );
	return this;
};

/**
 * Get an ID of a labelable node which is part of this widget, if any, to be used for `<label for>`
 * value.
 *
 * If this function returns null, the widget should have a meaningful #simulateLabelClick method
 * instead.
 *
 * @return {string|null} The ID of the labelable element
 */
OO.ui.Widget.prototype.getInputId = function () {
	return null;
};

/**
 * Simulate the behavior of clicking on a label (a HTML `<label>` element) bound to this input.
 * HTML only allows `<label>` to act on specific "labelable" elements; complex widgets might need to
 * override this method to provide intuitive, accessible behavior.
 *
 * By default, this does nothing. OO.ui.mixin.TabIndexedElement overrides it for focusable widgets.
 * Individual widgets may override it too.
 *
 * This method is called by OO.ui.LabelWidget and OO.ui.FieldLayout. It should not be called
 * directly.
 */
OO.ui.Widget.prototype.simulateLabelClick = function () {
};

/**
 * Theme logic.
 *
 * @abstract
 * @class
 *
 * @constructor
 */
OO.ui.Theme = function OoUiTheme() {
	this.elementClassesQueue = [];
	this.debouncedUpdateQueuedElementClasses = OO.ui.debounce( this.updateQueuedElementClasses );
};

/* Setup */

OO.initClass( OO.ui.Theme );

/* Methods */

/**
 * Get a list of classes to be applied to a widget.
 *
 * The 'on' and 'off' lists combined MUST contain keys for all classes the theme adds or removes,
 * otherwise state transitions will not work properly.
 *
 * @param {OO.ui.Element} element Element for which to get classes
 * @return {Object.<string,string[]>} Categorized class names with `on` and `off` lists
 */
OO.ui.Theme.prototype.getElementClasses = function () {
	return { on: [], off: [] };
};

/**
 * Update CSS classes provided by the theme.
 *
 * For elements with theme logic hooks, this should be called any time there's a state change.
 *
 * @param {OO.ui.Element} element Element for which to update classes
 */
OO.ui.Theme.prototype.updateElementClasses = function ( element ) {
	var $elements = $( [] ),
		classes = this.getElementClasses( element );

	if ( element.$icon ) {
		$elements = $elements.add( element.$icon );
	}
	if ( element.$indicator ) {
		$elements = $elements.add( element.$indicator );
	}

	$elements
		.removeClass( classes.off.join( ' ' ) )
		.addClass( classes.on.join( ' ' ) );
};

/**
 * @private
 */
OO.ui.Theme.prototype.updateQueuedElementClasses = function () {
	var i;
	for ( i = 0; i < this.elementClassesQueue.length; i++ ) {
		this.updateElementClasses( this.elementClassesQueue[ i ] );
	}
	// Clear the queue
	this.elementClassesQueue = [];
};

/**
 * Queue #updateElementClasses to be called for this element.
 *
 * @localdoc QUnit tests override this method to directly call #queueUpdateElementClasses,
 *   to make them synchronous.
 *
 * @param {OO.ui.Element} element Element for which to update classes
 */
OO.ui.Theme.prototype.queueUpdateElementClasses = function ( element ) {
	// Keep items in the queue unique. Use lastIndexOf to start checking from the end because that's
	// the most common case (this method is often called repeatedly for the same element).
	if ( this.elementClassesQueue.lastIndexOf( element ) !== -1 ) {
		return;
	}
	this.elementClassesQueue.push( element );
	this.debouncedUpdateQueuedElementClasses();
};

/**
 * Get the transition duration in milliseconds for dialogs opening/closing
 *
 * The dialog should be fully rendered this many milliseconds after the
 * ready process has executed.
 *
 * @return {number} Transition duration in milliseconds
 */
OO.ui.Theme.prototype.getDialogTransitionDuration = function () {
	return 0;
};

/**
 * The TabIndexedElement class is an attribute mixin used to add additional functionality to an
 * element created by another class. The mixin provides a ‘tabIndex’ property, which specifies the
 * order in which users will navigate through the focusable elements via the "tab" key.
 *
 *     @example
 *     // TabIndexedElement is mixed into the ButtonWidget class
 *     // to provide a tabIndex property.
 *     var button1 = new OO.ui.ButtonWidget( {
 *         label: 'fourth',
 *         tabIndex: 4
 *     } );
 *     var button2 = new OO.ui.ButtonWidget( {
 *         label: 'second',
 *         tabIndex: 2
 *     } );
 *     var button3 = new OO.ui.ButtonWidget( {
 *         label: 'third',
 *         tabIndex: 3
 *     } );
 *     var button4 = new OO.ui.ButtonWidget( {
 *         label: 'first',
 *         tabIndex: 1
 *     } );
 *     $( 'body' ).append( button1.$element, button2.$element, button3.$element, button4.$element );
 *
 * @abstract
 * @class
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {jQuery} [$tabIndexed] The element that should use the tabindex functionality. By default,
 *  the functionality is applied to the element created by the class ($element). If a different element is specified, the tabindex
 *  functionality will be applied to it instead.
 * @cfg {string|number|null} [tabIndex=0] Number that specifies the element’s position in the tab-navigation
 *  order (e.g., 1 for the first focusable element). Use 0 to use the default navigation order; use -1
 *  to remove the element from the tab-navigation flow.
 */
OO.ui.mixin.TabIndexedElement = function OoUiMixinTabIndexedElement( config ) {
	// Configuration initialization
	config = $.extend( { tabIndex: 0 }, config );

	// Properties
	this.$tabIndexed = null;
	this.tabIndex = null;

	// Events
	this.connect( this, { disable: 'onTabIndexedElementDisable' } );

	// Initialization
	this.setTabIndex( config.tabIndex );
	this.setTabIndexedElement( config.$tabIndexed || this.$element );
};

/* Setup */

OO.initClass( OO.ui.mixin.TabIndexedElement );

/* Methods */

/**
 * Set the element that should use the tabindex functionality.
 *
 * This method is used to retarget a tabindex mixin so that its functionality applies
 * to the specified element. If an element is currently using the functionality, the mixin’s
 * effect on that element is removed before the new element is set up.
 *
 * @param {jQuery} $tabIndexed Element that should use the tabindex functionality
 * @chainable
 */
OO.ui.mixin.TabIndexedElement.prototype.setTabIndexedElement = function ( $tabIndexed ) {
	var tabIndex = this.tabIndex;
	// Remove attributes from old $tabIndexed
	this.setTabIndex( null );
	// Force update of new $tabIndexed
	this.$tabIndexed = $tabIndexed;
	this.tabIndex = tabIndex;
	return this.updateTabIndex();
};

/**
 * Set the value of the tabindex.
 *
 * @param {string|number|null} tabIndex Tabindex value, or `null` for no tabindex
 * @chainable
 */
OO.ui.mixin.TabIndexedElement.prototype.setTabIndex = function ( tabIndex ) {
	tabIndex = /^-?\d+$/.test( tabIndex ) ? Number( tabIndex ) : null;

	if ( this.tabIndex !== tabIndex ) {
		this.tabIndex = tabIndex;
		this.updateTabIndex();
	}

	return this;
};

/**
 * Update the `tabindex` attribute, in case of changes to tab index or
 * disabled state.
 *
 * @private
 * @chainable
 */
OO.ui.mixin.TabIndexedElement.prototype.updateTabIndex = function () {
	if ( this.$tabIndexed ) {
		if ( this.tabIndex !== null ) {
			// Do not index over disabled elements
			this.$tabIndexed.attr( {
				tabindex: this.isDisabled() ? -1 : this.tabIndex,
				// Support: ChromeVox and NVDA
				// These do not seem to inherit aria-disabled from parent elements
				'aria-disabled': this.isDisabled().toString()
			} );
		} else {
			this.$tabIndexed.removeAttr( 'tabindex aria-disabled' );
		}
	}
	return this;
};

/**
 * Handle disable events.
 *
 * @private
 * @param {boolean} disabled Element is disabled
 */
OO.ui.mixin.TabIndexedElement.prototype.onTabIndexedElementDisable = function () {
	this.updateTabIndex();
};

/**
 * Get the value of the tabindex.
 *
 * @return {number|null} Tabindex value
 */
OO.ui.mixin.TabIndexedElement.prototype.getTabIndex = function () {
	return this.tabIndex;
};

/**
 * Get an ID of a focusable element of this widget, if any, to be used for `<label for>` value.
 *
 * If the element already has an ID then that is returned, otherwise unique ID is
 * generated, set on the element, and returned.
 *
 * @return {string|null} The ID of the focusable element
 */
OO.ui.mixin.TabIndexedElement.prototype.getInputId = function () {
	var id;

	if ( !this.$tabIndexed ) {
		return null;
	}
	if ( !this.isLabelableNode( this.$tabIndexed ) ) {
		return null;
	}

	id = this.$tabIndexed.attr( 'id' );
	if ( id === undefined ) {
		id = OO.ui.generateElementId();
		this.$tabIndexed.attr( 'id', id );
	}

	return id;
};

/**
 * Whether the node is 'labelable' according to the HTML spec
 * (i.e., whether it can be interacted with through a `<label for="…">`).
 * See: <https://html.spec.whatwg.org/multipage/forms.html#category-label>.
 *
 * @private
 * @param {jQuery} $node
 * @return {boolean}
 */
OO.ui.mixin.TabIndexedElement.prototype.isLabelableNode = function ( $node ) {
	var
		labelableTags = [ 'button', 'meter', 'output', 'progress', 'select', 'textarea' ],
		tagName = $node.prop( 'tagName' ).toLowerCase();

	if ( tagName === 'input' && $node.attr( 'type' ) !== 'hidden' ) {
		return true;
	}
	if ( labelableTags.indexOf( tagName ) !== -1 ) {
		return true;
	}
	return false;
};

/**
 * Focus this element.
 *
 * @chainable
 */
OO.ui.mixin.TabIndexedElement.prototype.focus = function () {
	if ( !this.isDisabled() ) {
		this.$tabIndexed.focus();
	}
	return this;
};

/**
 * Blur this element.
 *
 * @chainable
 */
OO.ui.mixin.TabIndexedElement.prototype.blur = function () {
	this.$tabIndexed.blur();
	return this;
};

/**
 * @inheritdoc OO.ui.Widget
 */
OO.ui.mixin.TabIndexedElement.prototype.simulateLabelClick = function () {
	this.focus();
};

/**
 * ButtonElement is often mixed into other classes to generate a button, which is a clickable
 * interface element that can be configured with access keys for accessibility.
 * See the [OOUI documentation on MediaWiki] [1] for examples.
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Widgets/Buttons_and_Switches#Buttons
 *
 * @abstract
 * @class
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {jQuery} [$button] The button element created by the class.
 *  If this configuration is omitted, the button element will use a generated `<a>`.
 * @cfg {boolean} [framed=true] Render the button with a frame
 */
OO.ui.mixin.ButtonElement = function OoUiMixinButtonElement( config ) {
	// Configuration initialization
	config = config || {};

	// Properties
	this.$button = null;
	this.framed = null;
	this.active = config.active !== undefined && config.active;
	this.onMouseUpHandler = this.onMouseUp.bind( this );
	this.onMouseDownHandler = this.onMouseDown.bind( this );
	this.onKeyDownHandler = this.onKeyDown.bind( this );
	this.onKeyUpHandler = this.onKeyUp.bind( this );
	this.onClickHandler = this.onClick.bind( this );
	this.onKeyPressHandler = this.onKeyPress.bind( this );

	// Initialization
	this.$element.addClass( 'oo-ui-buttonElement' );
	this.toggleFramed( config.framed === undefined || config.framed );
	this.setButtonElement( config.$button || $( '<a>' ) );
};

/* Setup */

OO.initClass( OO.ui.mixin.ButtonElement );

/* Static Properties */

/**
 * Cancel mouse down events.
 *
 * This property is usually set to `true` to prevent the focus from changing when the button is clicked.
 * Classes such as {@link OO.ui.mixin.DraggableElement DraggableElement} and {@link OO.ui.ButtonOptionWidget ButtonOptionWidget}
 * use a value of `false` so that dragging behavior is possible and mousedown events can be handled by a
 * parent widget.
 *
 * @static
 * @inheritable
 * @property {boolean}
 */
OO.ui.mixin.ButtonElement.static.cancelButtonMouseDownEvents = true;

/* Events */

/**
 * A 'click' event is emitted when the button element is clicked.
 *
 * @event click
 */

/* Methods */

/**
 * Set the button element.
 *
 * This method is used to retarget a button mixin so that its functionality applies to
 * the specified button element instead of the one created by the class. If a button element
 * is already set, the method will remove the mixin’s effect on that element.
 *
 * @param {jQuery} $button Element to use as button
 */
OO.ui.mixin.ButtonElement.prototype.setButtonElement = function ( $button ) {
	if ( this.$button ) {
		this.$button
			.removeClass( 'oo-ui-buttonElement-button' )
			.removeAttr( 'role accesskey' )
			.off( {
				mousedown: this.onMouseDownHandler,
				keydown: this.onKeyDownHandler,
				click: this.onClickHandler,
				keypress: this.onKeyPressHandler
			} );
	}

	this.$button = $button
		.addClass( 'oo-ui-buttonElement-button' )
		.on( {
			mousedown: this.onMouseDownHandler,
			keydown: this.onKeyDownHandler,
			click: this.onClickHandler,
			keypress: this.onKeyPressHandler
		} );

	// Add `role="button"` on `<a>` elements, where it's needed
	// `toUppercase()` is added for XHTML documents
	if ( this.$button.prop( 'tagName' ).toUpperCase() === 'A' ) {
		this.$button.attr( 'role', 'button' );
	}
};

/**
 * Handles mouse down events.
 *
 * @protected
 * @param {jQuery.Event} e Mouse down event
 */
OO.ui.mixin.ButtonElement.prototype.onMouseDown = function ( e ) {
	if ( this.isDisabled() || e.which !== OO.ui.MouseButtons.LEFT ) {
		return;
	}
	this.$element.addClass( 'oo-ui-buttonElement-pressed' );
	// Run the mouseup handler no matter where the mouse is when the button is let go, so we can
	// reliably remove the pressed class
	this.getElementDocument().addEventListener( 'mouseup', this.onMouseUpHandler, true );
	// Prevent change of focus unless specifically configured otherwise
	if ( this.constructor.static.cancelButtonMouseDownEvents ) {
		return false;
	}
};

/**
 * Handles mouse up events.
 *
 * @protected
 * @param {MouseEvent} e Mouse up event
 */
OO.ui.mixin.ButtonElement.prototype.onMouseUp = function ( e ) {
	if ( this.isDisabled() || e.which !== OO.ui.MouseButtons.LEFT ) {
		return;
	}
	this.$element.removeClass( 'oo-ui-buttonElement-pressed' );
	// Stop listening for mouseup, since we only needed this once
	this.getElementDocument().removeEventListener( 'mouseup', this.onMouseUpHandler, true );
};

/**
 * Handles mouse click events.
 *
 * @protected
 * @param {jQuery.Event} e Mouse click event
 * @fires click
 */
OO.ui.mixin.ButtonElement.prototype.onClick = function ( e ) {
	if ( !this.isDisabled() && e.which === OO.ui.MouseButtons.LEFT ) {
		if ( this.emit( 'click' ) ) {
			return false;
		}
	}
};

/**
 * Handles key down events.
 *
 * @protected
 * @param {jQuery.Event} e Key down event
 */
OO.ui.mixin.ButtonElement.prototype.onKeyDown = function ( e ) {
	if ( this.isDisabled() || ( e.which !== OO.ui.Keys.SPACE && e.which !== OO.ui.Keys.ENTER ) ) {
		return;
	}
	this.$element.addClass( 'oo-ui-buttonElement-pressed' );
	// Run the keyup handler no matter where the key is when the button is let go, so we can
	// reliably remove the pressed class
	this.getElementDocument().addEventListener( 'keyup', this.onKeyUpHandler, true );
};

/**
 * Handles key up events.
 *
 * @protected
 * @param {KeyboardEvent} e Key up event
 */
OO.ui.mixin.ButtonElement.prototype.onKeyUp = function ( e ) {
	if ( this.isDisabled() || ( e.which !== OO.ui.Keys.SPACE && e.which !== OO.ui.Keys.ENTER ) ) {
		return;
	}
	this.$element.removeClass( 'oo-ui-buttonElement-pressed' );
	// Stop listening for keyup, since we only needed this once
	this.getElementDocument().removeEventListener( 'keyup', this.onKeyUpHandler, true );
};

/**
 * Handles key press events.
 *
 * @protected
 * @param {jQuery.Event} e Key press event
 * @fires click
 */
OO.ui.mixin.ButtonElement.prototype.onKeyPress = function ( e ) {
	if ( !this.isDisabled() && ( e.which === OO.ui.Keys.SPACE || e.which === OO.ui.Keys.ENTER ) ) {
		if ( this.emit( 'click' ) ) {
			return false;
		}
	}
};

/**
 * Check if button has a frame.
 *
 * @return {boolean} Button is framed
 */
OO.ui.mixin.ButtonElement.prototype.isFramed = function () {
	return this.framed;
};

/**
 * Render the button with or without a frame. Omit the `framed` parameter to toggle the button frame on and off.
 *
 * @param {boolean} [framed] Make button framed, omit to toggle
 * @chainable
 */
OO.ui.mixin.ButtonElement.prototype.toggleFramed = function ( framed ) {
	framed = framed === undefined ? !this.framed : !!framed;
	if ( framed !== this.framed ) {
		this.framed = framed;
		this.$element
			.toggleClass( 'oo-ui-buttonElement-frameless', !framed )
			.toggleClass( 'oo-ui-buttonElement-framed', framed );
		this.updateThemeClasses();
	}

	return this;
};

/**
 * Set the button's active state.
 *
 * The active state can be set on:
 *
 *  - {@link OO.ui.ButtonOptionWidget ButtonOptionWidget} when it is selected
 *  - {@link OO.ui.ToggleButtonWidget ToggleButtonWidget} when it is toggle on
 *  - {@link OO.ui.ButtonWidget ButtonWidget} when clicking the button would only refresh the page
 *
 * @protected
 * @param {boolean} value Make button active
 * @chainable
 */
OO.ui.mixin.ButtonElement.prototype.setActive = function ( value ) {
	this.active = !!value;
	this.$element.toggleClass( 'oo-ui-buttonElement-active', this.active );
	this.updateThemeClasses();
	return this;
};

/**
 * Check if the button is active
 *
 * @protected
 * @return {boolean} The button is active
 */
OO.ui.mixin.ButtonElement.prototype.isActive = function () {
	return this.active;
};

/**
 * Any OOUI widget that contains other widgets (such as {@link OO.ui.ButtonWidget buttons} or
 * {@link OO.ui.OptionWidget options}) mixes in GroupElement. Adding, removing, and clearing
 * items from the group is done through the interface the class provides.
 * For more information, please see the [OOUI documentation on MediaWiki] [1].
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Elements/Groups
 *
 * @abstract
 * @mixins OO.EmitterList
 * @class
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {jQuery} [$group] The container element created by the class. If this configuration
 *  is omitted, the group element will use a generated `<div>`.
 */
OO.ui.mixin.GroupElement = function OoUiMixinGroupElement( config ) {
	// Configuration initialization
	config = config || {};

	// Mixin constructors
	OO.EmitterList.call( this, config );

	// Properties
	this.$group = null;

	// Initialization
	this.setGroupElement( config.$group || $( '<div>' ) );
};

/* Setup */

OO.mixinClass( OO.ui.mixin.GroupElement, OO.EmitterList );

/* Events */

/**
 * @event change
 *
 * A change event is emitted when the set of selected items changes.
 *
 * @param {OO.ui.Element[]} items Items currently in the group
 */

/* Methods */

/**
 * Set the group element.
 *
 * If an element is already set, items will be moved to the new element.
 *
 * @param {jQuery} $group Element to use as group
 */
OO.ui.mixin.GroupElement.prototype.setGroupElement = function ( $group ) {
	var i, len;

	this.$group = $group;
	for ( i = 0, len = this.items.length; i < len; i++ ) {
		this.$group.append( this.items[ i ].$element );
	}
};

/**
 * Find an item by its data.
 *
 * Only the first item with matching data will be returned. To return all matching items,
 * use the #findItemsFromData method.
 *
 * @param {Object} data Item data to search for
 * @return {OO.ui.Element|null} Item with equivalent data, `null` if none exists
 */
OO.ui.mixin.GroupElement.prototype.findItemFromData = function ( data ) {
	var i, len, item,
		hash = OO.getHash( data );

	for ( i = 0, len = this.items.length; i < len; i++ ) {
		item = this.items[ i ];
		if ( hash === OO.getHash( item.getData() ) ) {
			return item;
		}
	}

	return null;
};

/**
 * Get an item by its data.
 *
 * @deprecated Since v0.25.0; use {@link #findItemFromData} instead.
 * @param {Object} data Item data to search for
 * @return {OO.ui.Element|null} Item with equivalent data, `null` if none exists
 */
OO.ui.mixin.GroupElement.prototype.getItemFromData = function ( data ) {
	OO.ui.warnDeprecation( 'GroupElement#getItemFromData. Deprecated function. Use findItemFromData instead. See T76630' );
	return this.findItemFromData( data );
};

/**
 * Find items by their data.
 *
 * All items with matching data will be returned. To return only the first match, use the #findItemFromData method instead.
 *
 * @param {Object} data Item data to search for
 * @return {OO.ui.Element[]} Items with equivalent data
 */
OO.ui.mixin.GroupElement.prototype.findItemsFromData = function ( data ) {
	var i, len, item,
		hash = OO.getHash( data ),
		items = [];

	for ( i = 0, len = this.items.length; i < len; i++ ) {
		item = this.items[ i ];
		if ( hash === OO.getHash( item.getData() ) ) {
			items.push( item );
		}
	}

	return items;
};

/**
 * Find items by their data.
 *
 * @deprecated Since v0.25.0; use {@link #findItemsFromData} instead.
 * @param {Object} data Item data to search for
 * @return {OO.ui.Element[]} Items with equivalent data
 */
OO.ui.mixin.GroupElement.prototype.getItemsFromData = function ( data ) {
	OO.ui.warnDeprecation( 'GroupElement#getItemsFromData. Deprecated function. Use findItemsFromData instead. See T76630' );
	return this.findItemsFromData( data );
};

/**
 * Add items to the group.
 *
 * Items will be added to the end of the group array unless the optional `index` parameter specifies
 * a different insertion point. Adding an existing item will move it to the end of the array or the point specified by the `index`.
 *
 * @param {OO.ui.Element[]} items An array of items to add to the group
 * @param {number} [index] Index of the insertion point
 * @chainable
 */
OO.ui.mixin.GroupElement.prototype.addItems = function ( items, index ) {
	// Mixin method
	OO.EmitterList.prototype.addItems.call( this, items, index );

	this.emit( 'change', this.getItems() );
	return this;
};

/**
 * @inheritdoc
 */
OO.ui.mixin.GroupElement.prototype.moveItem = function ( items, newIndex ) {
	// insertItemElements expects this.items to not have been modified yet, so call before the mixin
	this.insertItemElements( items, newIndex );

	// Mixin method
	newIndex = OO.EmitterList.prototype.moveItem.call( this, items, newIndex );

	return newIndex;
};

/**
 * @inheritdoc
 */
OO.ui.mixin.GroupElement.prototype.insertItem = function ( item, index ) {
	item.setElementGroup( this );
	this.insertItemElements( item, index );

	// Mixin method
	index = OO.EmitterList.prototype.insertItem.call( this, item, index );

	return index;
};

/**
 * Insert elements into the group
 *
 * @private
 * @param {OO.ui.Element} itemWidget Item to insert
 * @param {number} index Insertion index
 */
OO.ui.mixin.GroupElement.prototype.insertItemElements = function ( itemWidget, index ) {
	if ( index === undefined || index < 0 || index >= this.items.length ) {
		this.$group.append( itemWidget.$element );
	} else if ( index === 0 ) {
		this.$group.prepend( itemWidget.$element );
	} else {
		this.items[ index ].$element.before( itemWidget.$element );
	}
};

/**
 * Remove the specified items from a group.
 *
 * Removed items are detached (not removed) from the DOM so that they may be reused.
 * To remove all items from a group, you may wish to use the #clearItems method instead.
 *
 * @param {OO.ui.Element[]} items An array of items to remove
 * @chainable
 */
OO.ui.mixin.GroupElement.prototype.removeItems = function ( items ) {
	var i, len, item, index;

	// Remove specific items elements
	for ( i = 0, len = items.length; i < len; i++ ) {
		item = items[ i ];
		index = this.items.indexOf( item );
		if ( index !== -1 ) {
			item.setElementGroup( null );
			item.$element.detach();
		}
	}

	// Mixin method
	OO.EmitterList.prototype.removeItems.call( this, items );

	this.emit( 'change', this.getItems() );
	return this;
};

/**
 * Clear all items from the group.
 *
 * Cleared items are detached from the DOM, not removed, so that they may be reused.
 * To remove only a subset of items from a group, use the #removeItems method.
 *
 * @chainable
 */
OO.ui.mixin.GroupElement.prototype.clearItems = function () {
	var i, len;

	// Remove all item elements
	for ( i = 0, len = this.items.length; i < len; i++ ) {
		this.items[ i ].setElementGroup( null );
		this.items[ i ].$element.detach();
	}

	// Mixin method
	OO.EmitterList.prototype.clearItems.call( this );

	this.emit( 'change', this.getItems() );
	return this;
};

/**
 * IconElement is often mixed into other classes to generate an icon.
 * Icons are graphics, about the size of normal text. They are used to aid the user
 * in locating a control or to convey information in a space-efficient way. See the
 * [OOUI documentation on MediaWiki] [1] for a list of icons
 * included in the library.
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Widgets/Icons,_Indicators,_and_Labels#Icons
 *
 * @abstract
 * @class
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {jQuery} [$icon] The icon element created by the class. If this configuration is omitted,
 *  the icon element will use a generated `<span>`. To use a different HTML tag, or to specify that
 *  the icon element be set to an existing icon instead of the one generated by this class, set a
 *  value using a jQuery selection. For example:
 *
 *      // Use a <div> tag instead of a <span>
 *     $icon: $("<div>")
 *     // Use an existing icon element instead of the one generated by the class
 *     $icon: this.$element
 *     // Use an icon element from a child widget
 *     $icon: this.childwidget.$element
 * @cfg {Object|string} [icon=''] The symbolic name of the icon (e.g., ‘remove’ or ‘menu’), or a map of
 *  symbolic names.  A map is used for i18n purposes and contains a `default` icon
 *  name and additional names keyed by language code. The `default` name is used when no icon is keyed
 *  by the user's language.
 *
 *  Example of an i18n map:
 *
 *     { default: 'bold-a', en: 'bold-b', de: 'bold-f' }
 *  See the [OOUI documentation on MediaWiki] [2] for a list of icons included in the library.
 * [2]: https://www.mediawiki.org/wiki/OOUI/Widgets/Icons,_Indicators,_and_Labels#Icons
 * @cfg {string|Function} [iconTitle] A text string used as the icon title, or a function that returns title
 *  text. The icon title is displayed when users move the mouse over the icon.
 */
OO.ui.mixin.IconElement = function OoUiMixinIconElement( config ) {
	// Configuration initialization
	config = config || {};

	// Properties
	this.$icon = null;
	this.icon = null;
	this.iconTitle = null;

	// Initialization
	this.setIcon( config.icon || this.constructor.static.icon );
	this.setIconTitle( config.iconTitle || this.constructor.static.iconTitle );
	this.setIconElement( config.$icon || $( '<span>' ) );
};

/* Setup */

OO.initClass( OO.ui.mixin.IconElement );

/* Static Properties */

/**
 * The symbolic name of the icon (e.g., ‘remove’ or ‘menu’), or a map of symbolic names. A map is used
 * for i18n purposes and contains a `default` icon name and additional names keyed by
 * language code. The `default` name is used when no icon is keyed by the user's language.
 *
 * Example of an i18n map:
 *
 *     { default: 'bold-a', en: 'bold-b', de: 'bold-f' }
 *
 * Note: the static property will be overridden if the #icon configuration is used.
 *
 * @static
 * @inheritable
 * @property {Object|string}
 */
OO.ui.mixin.IconElement.static.icon = null;

/**
 * The icon title, displayed when users move the mouse over the icon. The value can be text, a
 * function that returns title text, or `null` for no title.
 *
 * The static property will be overridden if the #iconTitle configuration is used.
 *
 * @static
 * @inheritable
 * @property {string|Function|null}
 */
OO.ui.mixin.IconElement.static.iconTitle = null;

/* Methods */

/**
 * Set the icon element. This method is used to retarget an icon mixin so that its functionality
 * applies to the specified icon element instead of the one created by the class. If an icon
 * element is already set, the mixin’s effect on that element is removed. Generated CSS classes
 * and mixin methods will no longer affect the element.
 *
 * @param {jQuery} $icon Element to use as icon
 */
OO.ui.mixin.IconElement.prototype.setIconElement = function ( $icon ) {
	if ( this.$icon ) {
		this.$icon
			.removeClass( 'oo-ui-iconElement-icon oo-ui-icon-' + this.icon )
			.removeAttr( 'title' );
	}

	this.$icon = $icon
		.addClass( 'oo-ui-iconElement-icon' )
		.toggleClass( 'oo-ui-icon-' + this.icon, !!this.icon );
	if ( this.iconTitle !== null ) {
		this.$icon.attr( 'title', this.iconTitle );
	}

	this.updateThemeClasses();
};

/**
 * Set icon by symbolic name (e.g., ‘remove’ or ‘menu’). Use `null` to remove an icon.
 * The icon parameter can also be set to a map of icon names. See the #icon config setting
 * for an example.
 *
 * @param {Object|string|null} icon A symbolic icon name, a {@link #icon map of icon names} keyed
 *  by language code, or `null` to remove the icon.
 * @chainable
 */
OO.ui.mixin.IconElement.prototype.setIcon = function ( icon ) {
	icon = OO.isPlainObject( icon ) ? OO.ui.getLocalValue( icon, null, 'default' ) : icon;
	icon = typeof icon === 'string' && icon.trim().length ? icon.trim() : null;

	if ( this.icon !== icon ) {
		if ( this.$icon ) {
			if ( this.icon !== null ) {
				this.$icon.removeClass( 'oo-ui-icon-' + this.icon );
			}
			if ( icon !== null ) {
				this.$icon.addClass( 'oo-ui-icon-' + icon );
			}
		}
		this.icon = icon;
	}

	this.$element.toggleClass( 'oo-ui-iconElement', !!this.icon );
	this.updateThemeClasses();

	return this;
};

/**
 * Set the icon title. Use `null` to remove the title.
 *
 * @param {string|Function|null} iconTitle A text string used as the icon title,
 *  a function that returns title text, or `null` for no title.
 * @chainable
 */
OO.ui.mixin.IconElement.prototype.setIconTitle = function ( iconTitle ) {
	iconTitle =
		( typeof iconTitle === 'function' || ( typeof iconTitle === 'string' && iconTitle.length ) ) ?
			OO.ui.resolveMsg( iconTitle ) : null;

	if ( this.iconTitle !== iconTitle ) {
		this.iconTitle = iconTitle;
		if ( this.$icon ) {
			if ( this.iconTitle !== null ) {
				this.$icon.attr( 'title', iconTitle );
			} else {
				this.$icon.removeAttr( 'title' );
			}
		}
	}

	return this;
};

/**
 * Get the symbolic name of the icon.
 *
 * @return {string} Icon name
 */
OO.ui.mixin.IconElement.prototype.getIcon = function () {
	return this.icon;
};

/**
 * Get the icon title. The title text is displayed when a user moves the mouse over the icon.
 *
 * @return {string} Icon title text
 */
OO.ui.mixin.IconElement.prototype.getIconTitle = function () {
	return this.iconTitle;
};

/**
 * IndicatorElement is often mixed into other classes to generate an indicator.
 * Indicators are small graphics that are generally used in two ways:
 *
 * - To draw attention to the status of an item. For example, an indicator might be
 *   used to show that an item in a list has errors that need to be resolved.
 * - To clarify the function of a control that acts in an exceptional way (a button
 *   that opens a menu instead of performing an action directly, for example).
 *
 * For a list of indicators included in the library, please see the
 * [OOUI documentation on MediaWiki] [1].
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Widgets/Icons,_Indicators,_and_Labels#Indicators
 *
 * @abstract
 * @class
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {jQuery} [$indicator] The indicator element created by the class. If this
 *  configuration is omitted, the indicator element will use a generated `<span>`.
 * @cfg {string} [indicator] Symbolic name of the indicator (e.g., ‘clear’ or ‘down’).
 *  See the [OOUI documentation on MediaWiki][2] for a list of indicators included
 *  in the library.
 * [2]: https://www.mediawiki.org/wiki/OOUI/Widgets/Icons,_Indicators,_and_Labels#Indicators
 * @cfg {string|Function} [indicatorTitle] A text string used as the indicator title,
 *  or a function that returns title text. The indicator title is displayed when users move
 *  the mouse over the indicator.
 */
OO.ui.mixin.IndicatorElement = function OoUiMixinIndicatorElement( config ) {
	// Configuration initialization
	config = config || {};

	// Properties
	this.$indicator = null;
	this.indicator = null;
	this.indicatorTitle = null;

	// Initialization
	this.setIndicator( config.indicator || this.constructor.static.indicator );
	this.setIndicatorTitle( config.indicatorTitle || this.constructor.static.indicatorTitle );
	this.setIndicatorElement( config.$indicator || $( '<span>' ) );
};

/* Setup */

OO.initClass( OO.ui.mixin.IndicatorElement );

/* Static Properties */

/**
 * Symbolic name of the indicator (e.g., ‘clear’ or  ‘down’).
 * The static property will be overridden if the #indicator configuration is used.
 *
 * @static
 * @inheritable
 * @property {string|null}
 */
OO.ui.mixin.IndicatorElement.static.indicator = null;

/**
 * A text string used as the indicator title, a function that returns title text, or `null`
 * for no title. The static property will be overridden if the #indicatorTitle configuration is used.
 *
 * @static
 * @inheritable
 * @property {string|Function|null}
 */
OO.ui.mixin.IndicatorElement.static.indicatorTitle = null;

/* Methods */

/**
 * Set the indicator element.
 *
 * If an element is already set, it will be cleaned up before setting up the new element.
 *
 * @param {jQuery} $indicator Element to use as indicator
 */
OO.ui.mixin.IndicatorElement.prototype.setIndicatorElement = function ( $indicator ) {
	if ( this.$indicator ) {
		this.$indicator
			.removeClass( 'oo-ui-indicatorElement-indicator oo-ui-indicator-' + this.indicator )
			.removeAttr( 'title' );
	}

	this.$indicator = $indicator
		.addClass( 'oo-ui-indicatorElement-indicator' )
		.toggleClass( 'oo-ui-indicator-' + this.indicator, !!this.indicator );
	if ( this.indicatorTitle !== null ) {
		this.$indicator.attr( 'title', this.indicatorTitle );
	}

	this.updateThemeClasses();
};

/**
 * Set the indicator by its symbolic name: ‘clear’, ‘down’, ‘required’, ‘search’, ‘up’. Use `null` to remove the indicator.
 *
 * @param {string|null} indicator Symbolic name of indicator, or `null` for no indicator
 * @chainable
 */
OO.ui.mixin.IndicatorElement.prototype.setIndicator = function ( indicator ) {
	indicator = typeof indicator === 'string' && indicator.length ? indicator.trim() : null;

	if ( this.indicator !== indicator ) {
		if ( this.$indicator ) {
			if ( this.indicator !== null ) {
				this.$indicator.removeClass( 'oo-ui-indicator-' + this.indicator );
			}
			if ( indicator !== null ) {
				this.$indicator.addClass( 'oo-ui-indicator-' + indicator );
			}
		}
		this.indicator = indicator;
	}

	this.$element.toggleClass( 'oo-ui-indicatorElement', !!this.indicator );
	this.updateThemeClasses();

	return this;
};

/**
 * Set the indicator title.
 *
 * The title is displayed when a user moves the mouse over the indicator.
 *
 * @param {string|Function|null} indicatorTitle Indicator title text, a function that returns text, or
 *   `null` for no indicator title
 * @chainable
 */
OO.ui.mixin.IndicatorElement.prototype.setIndicatorTitle = function ( indicatorTitle ) {
	indicatorTitle =
		( typeof indicatorTitle === 'function' || ( typeof indicatorTitle === 'string' && indicatorTitle.length ) ) ?
			OO.ui.resolveMsg( indicatorTitle ) : null;

	if ( this.indicatorTitle !== indicatorTitle ) {
		this.indicatorTitle = indicatorTitle;
		if ( this.$indicator ) {
			if ( this.indicatorTitle !== null ) {
				this.$indicator.attr( 'title', indicatorTitle );
			} else {
				this.$indicator.removeAttr( 'title' );
			}
		}
	}

	return this;
};

/**
 * Get the symbolic name of the indicator (e.g., ‘clear’ or  ‘down’).
 *
 * @return {string} Symbolic name of indicator
 */
OO.ui.mixin.IndicatorElement.prototype.getIndicator = function () {
	return this.indicator;
};

/**
 * Get the indicator title.
 *
 * The title is displayed when a user moves the mouse over the indicator.
 *
 * @return {string} Indicator title text
 */
OO.ui.mixin.IndicatorElement.prototype.getIndicatorTitle = function () {
	return this.indicatorTitle;
};

/**
 * LabelElement is often mixed into other classes to generate a label, which
 * helps identify the function of an interface element.
 * See the [OOUI documentation on MediaWiki] [1] for more information.
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Widgets/Icons,_Indicators,_and_Labels#Labels
 *
 * @abstract
 * @class
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {jQuery} [$label] The label element created by the class. If this
 *  configuration is omitted, the label element will use a generated `<span>`.
 * @cfg {jQuery|string|Function|OO.ui.HtmlSnippet} [label] The label text. The label can be specified
 *  as a plaintext string, a jQuery selection of elements, or a function that will produce a string
 *  in the future. See the [OOUI documentation on MediaWiki] [2] for examples.
 *  [2]: https://www.mediawiki.org/wiki/OOUI/Widgets/Icons,_Indicators,_and_Labels#Labels
 */
OO.ui.mixin.LabelElement = function OoUiMixinLabelElement( config ) {
	// Configuration initialization
	config = config || {};

	// Properties
	this.$label = null;
	this.label = null;

	// Initialization
	this.setLabel( config.label || this.constructor.static.label );
	this.setLabelElement( config.$label || $( '<span>' ) );
};

/* Setup */

OO.initClass( OO.ui.mixin.LabelElement );

/* Events */

/**
 * @event labelChange
 * @param {string} value
 */

/* Static Properties */

/**
 * The label text. The label can be specified as a plaintext string, a function that will
 * produce a string in the future, or `null` for no label. The static value will
 * be overridden if a label is specified with the #label config option.
 *
 * @static
 * @inheritable
 * @property {string|Function|null}
 */
OO.ui.mixin.LabelElement.static.label = null;

/* Static methods */

/**
 * Highlight the first occurrence of the query in the given text
 *
 * @param {string} text Text
 * @param {string} query Query to find
 * @param {Function} [compare] Optional string comparator, e.g. Intl.Collator().compare
 * @return {jQuery} Text with the first match of the query
 *  sub-string wrapped in highlighted span
 */
OO.ui.mixin.LabelElement.static.highlightQuery = function ( text, query, compare ) {
	var i, tLen, qLen,
		offset = -1,
		$result = $( '<span>' );

	if ( compare ) {
		tLen = text.length;
		qLen = query.length;
		for ( i = 0; offset === -1 && i <= tLen - qLen; i++ ) {
			if ( compare( query, text.slice( i, i + qLen ) ) === 0 ) {
				offset = i;
			}
		}
	} else {
		offset = text.toLowerCase().indexOf( query.toLowerCase() );
	}

	if ( !query.length || offset === -1 ) {
		$result.text( text );
	} else {
		$result.append(
			document.createTextNode( text.slice( 0, offset ) ),
			$( '<span>' )
				.addClass( 'oo-ui-labelElement-label-highlight' )
				.text( text.slice( offset, offset + query.length ) ),
			document.createTextNode( text.slice( offset + query.length ) )
		);
	}
	return $result.contents();
};

/* Methods */

/**
 * Set the label element.
 *
 * If an element is already set, it will be cleaned up before setting up the new element.
 *
 * @param {jQuery} $label Element to use as label
 */
OO.ui.mixin.LabelElement.prototype.setLabelElement = function ( $label ) {
	if ( this.$label ) {
		this.$label.removeClass( 'oo-ui-labelElement-label' ).empty();
	}

	this.$label = $label.addClass( 'oo-ui-labelElement-label' );
	this.setLabelContent( this.label );
};

/**
 * Set the label.
 *
 * An empty string will result in the label being hidden. A string containing only whitespace will
 * be converted to a single `&nbsp;`.
 *
 * @param {jQuery|string|OO.ui.HtmlSnippet|Function|null} label Label nodes; text; a function that returns nodes or
 *  text; or null for no label
 * @chainable
 */
OO.ui.mixin.LabelElement.prototype.setLabel = function ( label ) {
	label = typeof label === 'function' ? OO.ui.resolveMsg( label ) : label;
	label = ( ( typeof label === 'string' || label instanceof jQuery ) && label.length ) || ( label instanceof OO.ui.HtmlSnippet && label.toString().length ) ? label : null;

	if ( this.label !== label ) {
		if ( this.$label ) {
			this.setLabelContent( label );
		}
		this.label = label;
		this.emit( 'labelChange' );
	}

	this.$element.toggleClass( 'oo-ui-labelElement', !!this.label );

	return this;
};

/**
 * Set the label as plain text with a highlighted query
 *
 * @param {string} text Text label to set
 * @param {string} query Substring of text to highlight
 * @param {Function} [compare] Optional string comparator, e.g. Intl.Collator().compare
 * @chainable
 */
OO.ui.mixin.LabelElement.prototype.setHighlightedQuery = function ( text, query, compare ) {
	return this.setLabel( this.constructor.static.highlightQuery( text, query, compare ) );
};

/**
 * Get the label.
 *
 * @return {jQuery|string|Function|null} Label nodes; text; a function that returns nodes or
 *  text; or null for no label
 */
OO.ui.mixin.LabelElement.prototype.getLabel = function () {
	return this.label;
};

/**
 * Set the content of the label.
 *
 * Do not call this method until after the label element has been set by #setLabelElement.
 *
 * @private
 * @param {jQuery|string|Function|null} label Label nodes; text; a function that returns nodes or
 *  text; or null for no label
 */
OO.ui.mixin.LabelElement.prototype.setLabelContent = function ( label ) {
	if ( typeof label === 'string' ) {
		if ( label.match( /^\s*$/ ) ) {
			// Convert whitespace only string to a single non-breaking space
			this.$label.html( '&nbsp;' );
		} else {
			this.$label.text( label );
		}
	} else if ( label instanceof OO.ui.HtmlSnippet ) {
		this.$label.html( label.toString() );
	} else if ( label instanceof jQuery ) {
		this.$label.empty().append( label );
	} else {
		this.$label.empty();
	}
};

/**
 * The FlaggedElement class is an attribute mixin, meaning that it is used to add
 * additional functionality to an element created by another class. The class provides
 * a ‘flags’ property assigned the name (or an array of names) of styling flags,
 * which are used to customize the look and feel of a widget to better describe its
 * importance and functionality.
 *
 * The library currently contains the following styling flags for general use:
 *
 * - **progressive**:  Progressive styling is applied to convey that the widget will move the user forward in a process.
 * - **destructive**: Destructive styling is applied to convey that the widget will remove something.
 *
 * The flags affect the appearance of the buttons:
 *
 *     @example
 *     // FlaggedElement is mixed into ButtonWidget to provide styling flags
 *     var button1 = new OO.ui.ButtonWidget( {
 *         label: 'Progressive',
 *         flags: 'progressive'
 *     } );
 *     var button2 = new OO.ui.ButtonWidget( {
 *         label: 'Destructive',
 *         flags: 'destructive'
 *     } );
 *     $( 'body' ).append( button1.$element, button2.$element );
 *
 * {@link OO.ui.ActionWidget ActionWidgets}, which are a special kind of button that execute an action, use these flags: **primary** and **safe**.
 * Please see the [OOUI documentation on MediaWiki] [1] for more information.
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Elements/Flagged
 *
 * @abstract
 * @class
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {string|string[]} [flags] The name or names of the flags (e.g., 'progressive' or 'primary') to apply.
 *  Please see the [OOUI documentation on MediaWiki] [2] for more information about available flags.
 *  [2]: https://www.mediawiki.org/wiki/OOUI/Elements/Flagged
 * @cfg {jQuery} [$flagged] The flagged element. By default,
 *  the flagged functionality is applied to the element created by the class ($element).
 *  If a different element is specified, the flagged functionality will be applied to it instead.
 */
OO.ui.mixin.FlaggedElement = function OoUiMixinFlaggedElement( config ) {
	// Configuration initialization
	config = config || {};

	// Properties
	this.flags = {};
	this.$flagged = null;

	// Initialization
	this.setFlags( config.flags );
	this.setFlaggedElement( config.$flagged || this.$element );
};

/* Events */

/**
 * @event flag
 * A flag event is emitted when the #clearFlags or #setFlags methods are used. The `changes`
 * parameter contains the name of each modified flag and indicates whether it was
 * added or removed.
 *
 * @param {Object.<string,boolean>} changes Object keyed by flag name. A Boolean `true` indicates
 * that the flag was added, `false` that the flag was removed.
 */

/* Methods */

/**
 * Set the flagged element.
 *
 * This method is used to retarget a flagged mixin so that its functionality applies to the specified element.
 * If an element is already set, the method will remove the mixin’s effect on that element.
 *
 * @param {jQuery} $flagged Element that should be flagged
 */
OO.ui.mixin.FlaggedElement.prototype.setFlaggedElement = function ( $flagged ) {
	var classNames = Object.keys( this.flags ).map( function ( flag ) {
		return 'oo-ui-flaggedElement-' + flag;
	} ).join( ' ' );

	if ( this.$flagged ) {
		this.$flagged.removeClass( classNames );
	}

	this.$flagged = $flagged.addClass( classNames );
};

/**
 * Check if the specified flag is set.
 *
 * @param {string} flag Name of flag
 * @return {boolean} The flag is set
 */
OO.ui.mixin.FlaggedElement.prototype.hasFlag = function ( flag ) {
	// This may be called before the constructor, thus before this.flags is set
	return this.flags && ( flag in this.flags );
};

/**
 * Get the names of all flags set.
 *
 * @return {string[]} Flag names
 */
OO.ui.mixin.FlaggedElement.prototype.getFlags = function () {
	// This may be called before the constructor, thus before this.flags is set
	return Object.keys( this.flags || {} );
};

/**
 * Clear all flags.
 *
 * @chainable
 * @fires flag
 */
OO.ui.mixin.FlaggedElement.prototype.clearFlags = function () {
	var flag, className,
		changes = {},
		remove = [],
		classPrefix = 'oo-ui-flaggedElement-';

	for ( flag in this.flags ) {
		className = classPrefix + flag;
		changes[ flag ] = false;
		delete this.flags[ flag ];
		remove.push( className );
	}

	if ( this.$flagged ) {
		this.$flagged.removeClass( remove.join( ' ' ) );
	}

	this.updateThemeClasses();
	this.emit( 'flag', changes );

	return this;
};

/**
 * Add one or more flags.
 *
 * @param {string|string[]|Object.<string, boolean>} flags A flag name, an array of flag names,
 *  or an object keyed by flag name with a boolean value that indicates whether the flag should
 *  be added (`true`) or removed (`false`).
 * @chainable
 * @fires flag
 */
OO.ui.mixin.FlaggedElement.prototype.setFlags = function ( flags ) {
	var i, len, flag, className,
		changes = {},
		add = [],
		remove = [],
		classPrefix = 'oo-ui-flaggedElement-';

	if ( typeof flags === 'string' ) {
		className = classPrefix + flags;
		// Set
		if ( !this.flags[ flags ] ) {
			this.flags[ flags ] = true;
			add.push( className );
		}
	} else if ( Array.isArray( flags ) ) {
		for ( i = 0, len = flags.length; i < len; i++ ) {
			flag = flags[ i ];
			className = classPrefix + flag;
			// Set
			if ( !this.flags[ flag ] ) {
				changes[ flag ] = true;
				this.flags[ flag ] = true;
				add.push( className );
			}
		}
	} else if ( OO.isPlainObject( flags ) ) {
		for ( flag in flags ) {
			className = classPrefix + flag;
			if ( flags[ flag ] ) {
				// Set
				if ( !this.flags[ flag ] ) {
					changes[ flag ] = true;
					this.flags[ flag ] = true;
					add.push( className );
				}
			} else {
				// Remove
				if ( this.flags[ flag ] ) {
					changes[ flag ] = false;
					delete this.flags[ flag ];
					remove.push( className );
				}
			}
		}
	}

	if ( this.$flagged ) {
		this.$flagged
			.addClass( add.join( ' ' ) )
			.removeClass( remove.join( ' ' ) );
	}

	this.updateThemeClasses();
	this.emit( 'flag', changes );

	return this;
};

/**
 * TitledElement is mixed into other classes to provide a `title` attribute.
 * Titles are rendered by the browser and are made visible when the user moves
 * the mouse over the element. Titles are not visible on touch devices.
 *
 *     @example
 *     // TitledElement provides a 'title' attribute to the
 *     // ButtonWidget class
 *     var button = new OO.ui.ButtonWidget( {
 *         label: 'Button with Title',
 *         title: 'I am a button'
 *     } );
 *     $( 'body' ).append( button.$element );
 *
 * @abstract
 * @class
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {jQuery} [$titled] The element to which the `title` attribute is applied.
 *  If this config is omitted, the title functionality is applied to $element, the
 *  element created by the class.
 * @cfg {string|Function} [title] The title text or a function that returns text. If
 *  this config is omitted, the value of the {@link #static-title static title} property is used.
 */
OO.ui.mixin.TitledElement = function OoUiMixinTitledElement( config ) {
	// Configuration initialization
	config = config || {};

	// Properties
	this.$titled = null;
	this.title = null;

	// Initialization
	this.setTitle( config.title !== undefined ? config.title : this.constructor.static.title );
	this.setTitledElement( config.$titled || this.$element );
};

/* Setup */

OO.initClass( OO.ui.mixin.TitledElement );

/* Static Properties */

/**
 * The title text, a function that returns text, or `null` for no title. The value of the static property
 * is overridden if the #title config option is used.
 *
 * @static
 * @inheritable
 * @property {string|Function|null}
 */
OO.ui.mixin.TitledElement.static.title = null;

/* Methods */

/**
 * Set the titled element.
 *
 * This method is used to retarget a titledElement mixin so that its functionality applies to the specified element.
 * If an element is already set, the mixin’s effect on that element is removed before the new element is set up.
 *
 * @param {jQuery} $titled Element that should use the 'titled' functionality
 */
OO.ui.mixin.TitledElement.prototype.setTitledElement = function ( $titled ) {
	if ( this.$titled ) {
		this.$titled.removeAttr( 'title' );
	}

	this.$titled = $titled;
	if ( this.title ) {
		this.updateTitle();
	}
};

/**
 * Set title.
 *
 * @param {string|Function|null} title Title text, a function that returns text, or `null` for no title
 * @chainable
 */
OO.ui.mixin.TitledElement.prototype.setTitle = function ( title ) {
	title = typeof title === 'function' ? OO.ui.resolveMsg( title ) : title;
	title = ( typeof title === 'string' && title.length ) ? title : null;

	if ( this.title !== title ) {
		this.title = title;
		this.updateTitle();
	}

	return this;
};

/**
 * Update the title attribute, in case of changes to title or accessKey.
 *
 * @protected
 * @chainable
 */
OO.ui.mixin.TitledElement.prototype.updateTitle = function () {
	var title = this.getTitle();
	if ( this.$titled ) {
		if ( title !== null ) {
			// Only if this is an AccessKeyedElement
			if ( this.formatTitleWithAccessKey ) {
				title = this.formatTitleWithAccessKey( title );
			}
			this.$titled.attr( 'title', title );
		} else {
			this.$titled.removeAttr( 'title' );
		}
	}
	return this;
};

/**
 * Get title.
 *
 * @return {string} Title string
 */
OO.ui.mixin.TitledElement.prototype.getTitle = function () {
	return this.title;
};

/**
 * AccessKeyedElement is mixed into other classes to provide an `accesskey` attribute.
 * Accesskeys allow an user to go to a specific element by using
 * a shortcut combination of a browser specific keys + the key
 * set to the field.
 *
 *     @example
 *     // AccessKeyedElement provides an 'accesskey' attribute to the
 *     // ButtonWidget class
 *     var button = new OO.ui.ButtonWidget( {
 *         label: 'Button with Accesskey',
 *         accessKey: 'k'
 *     } );
 *     $( 'body' ).append( button.$element );
 *
 * @abstract
 * @class
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {jQuery} [$accessKeyed] The element to which the `accesskey` attribute is applied.
 *  If this config is omitted, the accesskey functionality is applied to $element, the
 *  element created by the class.
 * @cfg {string|Function} [accessKey] The key or a function that returns the key. If
 *  this config is omitted, no accesskey will be added.
 */
OO.ui.mixin.AccessKeyedElement = function OoUiMixinAccessKeyedElement( config ) {
	// Configuration initialization
	config = config || {};

	// Properties
	this.$accessKeyed = null;
	this.accessKey = null;

	// Initialization
	this.setAccessKey( config.accessKey || null );
	this.setAccessKeyedElement( config.$accessKeyed || this.$element );

	// If this is also a TitledElement and it initialized before we did, we may have
	// to update the title with the access key
	if ( this.updateTitle ) {
		this.updateTitle();
	}
};

/* Setup */

OO.initClass( OO.ui.mixin.AccessKeyedElement );

/* Static Properties */

/**
 * The access key, a function that returns a key, or `null` for no accesskey.
 *
 * @static
 * @inheritable
 * @property {string|Function|null}
 */
OO.ui.mixin.AccessKeyedElement.static.accessKey = null;

/* Methods */

/**
 * Set the accesskeyed element.
 *
 * This method is used to retarget a AccessKeyedElement mixin so that its functionality applies to the specified element.
 * If an element is already set, the mixin's effect on that element is removed before the new element is set up.
 *
 * @param {jQuery} $accessKeyed Element that should use the 'accesskeyes' functionality
 */
OO.ui.mixin.AccessKeyedElement.prototype.setAccessKeyedElement = function ( $accessKeyed ) {
	if ( this.$accessKeyed ) {
		this.$accessKeyed.removeAttr( 'accesskey' );
	}

	this.$accessKeyed = $accessKeyed;
	if ( this.accessKey ) {
		this.$accessKeyed.attr( 'accesskey', this.accessKey );
	}
};

/**
 * Set accesskey.
 *
 * @param {string|Function|null} accessKey Key, a function that returns a key, or `null` for no accesskey
 * @chainable
 */
OO.ui.mixin.AccessKeyedElement.prototype.setAccessKey = function ( accessKey ) {
	accessKey = typeof accessKey === 'string' ? OO.ui.resolveMsg( accessKey ) : null;

	if ( this.accessKey !== accessKey ) {
		if ( this.$accessKeyed ) {
			if ( accessKey !== null ) {
				this.$accessKeyed.attr( 'accesskey', accessKey );
			} else {
				this.$accessKeyed.removeAttr( 'accesskey' );
			}
		}
		this.accessKey = accessKey;

		// Only if this is a TitledElement
		if ( this.updateTitle ) {
			this.updateTitle();
		}
	}

	return this;
};

/**
 * Get accesskey.
 *
 * @return {string} accessKey string
 */
OO.ui.mixin.AccessKeyedElement.prototype.getAccessKey = function () {
	return this.accessKey;
};

/**
 * Add information about the access key to the element's tooltip label.
 * (This is only public for hacky usage in FieldLayout.)
 *
 * @param {string} title Tooltip label for `title` attribute
 * @return {string}
 */
OO.ui.mixin.AccessKeyedElement.prototype.formatTitleWithAccessKey = function ( title ) {
	var accessKey;

	if ( !this.$accessKeyed ) {
		// Not initialized yet; the constructor will call updateTitle() which will rerun this function
		return title;
	}
	// Use jquery.accessKeyLabel if available to show modifiers, otherwise just display the single key
	if ( $.fn.updateTooltipAccessKeys && $.fn.updateTooltipAccessKeys.getAccessKeyLabel ) {
		accessKey = $.fn.updateTooltipAccessKeys.getAccessKeyLabel( this.$accessKeyed[ 0 ] );
	} else {
		accessKey = this.getAccessKey();
	}
	if ( accessKey ) {
		title += ' [' + accessKey + ']';
	}
	return title;
};

/**
 * ButtonWidget is a generic widget for buttons. A wide variety of looks,
 * feels, and functionality can be customized via the class’s configuration options
 * and methods. Please see the [OOUI documentation on MediaWiki] [1] for more information
 * and examples.
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Widgets/Buttons_and_Switches
 *
 *     @example
 *     // A button widget
 *     var button = new OO.ui.ButtonWidget( {
 *         label: 'Button with Icon',
 *         icon: 'trash',
 *         iconTitle: 'Remove'
 *     } );
 *     $( 'body' ).append( button.$element );
 *
 * NOTE: HTML form buttons should use the OO.ui.ButtonInputWidget class.
 *
 * @class
 * @extends OO.ui.Widget
 * @mixins OO.ui.mixin.ButtonElement
 * @mixins OO.ui.mixin.IconElement
 * @mixins OO.ui.mixin.IndicatorElement
 * @mixins OO.ui.mixin.LabelElement
 * @mixins OO.ui.mixin.TitledElement
 * @mixins OO.ui.mixin.FlaggedElement
 * @mixins OO.ui.mixin.TabIndexedElement
 * @mixins OO.ui.mixin.AccessKeyedElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {boolean} [active=false] Whether button should be shown as active
 * @cfg {string} [href] Hyperlink to visit when the button is clicked.
 * @cfg {string} [target] The frame or window in which to open the hyperlink.
 * @cfg {boolean} [noFollow] Search engine traversal hint (default: true)
 */
OO.ui.ButtonWidget = function OoUiButtonWidget( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.ButtonWidget.parent.call( this, config );

	// Mixin constructors
	OO.ui.mixin.ButtonElement.call( this, config );
	OO.ui.mixin.IconElement.call( this, config );
	OO.ui.mixin.IndicatorElement.call( this, config );
	OO.ui.mixin.LabelElement.call( this, config );
	OO.ui.mixin.TitledElement.call( this, $.extend( {}, config, { $titled: this.$button } ) );
	OO.ui.mixin.FlaggedElement.call( this, config );
	OO.ui.mixin.TabIndexedElement.call( this, $.extend( {}, config, { $tabIndexed: this.$button } ) );
	OO.ui.mixin.AccessKeyedElement.call( this, $.extend( {}, config, { $accessKeyed: this.$button } ) );

	// Properties
	this.href = null;
	this.target = null;
	this.noFollow = false;

	// Events
	this.connect( this, { disable: 'onDisable' } );

	// Initialization
	this.$button.append( this.$icon, this.$label, this.$indicator );
	this.$element
		.addClass( 'oo-ui-buttonWidget' )
		.append( this.$button );
	this.setActive( config.active );
	this.setHref( config.href );
	this.setTarget( config.target );
	this.setNoFollow( config.noFollow );
};

/* Setup */

OO.inheritClass( OO.ui.ButtonWidget, OO.ui.Widget );
OO.mixinClass( OO.ui.ButtonWidget, OO.ui.mixin.ButtonElement );
OO.mixinClass( OO.ui.ButtonWidget, OO.ui.mixin.IconElement );
OO.mixinClass( OO.ui.ButtonWidget, OO.ui.mixin.IndicatorElement );
OO.mixinClass( OO.ui.ButtonWidget, OO.ui.mixin.LabelElement );
OO.mixinClass( OO.ui.ButtonWidget, OO.ui.mixin.TitledElement );
OO.mixinClass( OO.ui.ButtonWidget, OO.ui.mixin.FlaggedElement );
OO.mixinClass( OO.ui.ButtonWidget, OO.ui.mixin.TabIndexedElement );
OO.mixinClass( OO.ui.ButtonWidget, OO.ui.mixin.AccessKeyedElement );

/* Static Properties */

/**
 * @static
 * @inheritdoc
 */
OO.ui.ButtonWidget.static.cancelButtonMouseDownEvents = false;

/**
 * @static
 * @inheritdoc
 */
OO.ui.ButtonWidget.static.tagName = 'span';

/* Methods */

/**
 * Get hyperlink location.
 *
 * @return {string} Hyperlink location
 */
OO.ui.ButtonWidget.prototype.getHref = function () {
	return this.href;
};

/**
 * Get hyperlink target.
 *
 * @return {string} Hyperlink target
 */
OO.ui.ButtonWidget.prototype.getTarget = function () {
	return this.target;
};

/**
 * Get search engine traversal hint.
 *
 * @return {boolean} Whether search engines should avoid traversing this hyperlink
 */
OO.ui.ButtonWidget.prototype.getNoFollow = function () {
	return this.noFollow;
};

/**
 * Set hyperlink location.
 *
 * @param {string|null} href Hyperlink location, null to remove
 */
OO.ui.ButtonWidget.prototype.setHref = function ( href ) {
	href = typeof href === 'string' ? href : null;
	if ( href !== null && !OO.ui.isSafeUrl( href ) ) {
		href = './' + href;
	}

	if ( href !== this.href ) {
		this.href = href;
		this.updateHref();
	}

	return this;
};

/**
 * Update the `href` attribute, in case of changes to href or
 * disabled state.
 *
 * @private
 * @chainable
 */
OO.ui.ButtonWidget.prototype.updateHref = function () {
	if ( this.href !== null && !this.isDisabled() ) {
		this.$button.attr( 'href', this.href );
	} else {
		this.$button.removeAttr( 'href' );
	}

	return this;
};

/**
 * Handle disable events.
 *
 * @private
 * @param {boolean} disabled Element is disabled
 */
OO.ui.ButtonWidget.prototype.onDisable = function () {
	this.updateHref();
};

/**
 * Set hyperlink target.
 *
 * @param {string|null} target Hyperlink target, null to remove
 */
OO.ui.ButtonWidget.prototype.setTarget = function ( target ) {
	target = typeof target === 'string' ? target : null;

	if ( target !== this.target ) {
		this.target = target;
		if ( target !== null ) {
			this.$button.attr( 'target', target );
		} else {
			this.$button.removeAttr( 'target' );
		}
	}

	return this;
};

/**
 * Set search engine traversal hint.
 *
 * @param {boolean} noFollow True if search engines should avoid traversing this hyperlink
 */
OO.ui.ButtonWidget.prototype.setNoFollow = function ( noFollow ) {
	noFollow = typeof noFollow === 'boolean' ? noFollow : true;

	if ( noFollow !== this.noFollow ) {
		this.noFollow = noFollow;
		if ( noFollow ) {
			this.$button.attr( 'rel', 'nofollow' );
		} else {
			this.$button.removeAttr( 'rel' );
		}
	}

	return this;
};

// Override method visibility hints from ButtonElement
/**
 * @method setActive
 * @inheritdoc
 */
/**
 * @method isActive
 * @inheritdoc
 */

/**
 * A ButtonGroupWidget groups related buttons and is used together with OO.ui.ButtonWidget and
 * its subclasses. Each button in a group is addressed by a unique reference. Buttons can be added,
 * removed, and cleared from the group.
 *
 *     @example
 *     // Example: A ButtonGroupWidget with two buttons
 *     var button1 = new OO.ui.PopupButtonWidget( {
 *         label: 'Select a category',
 *         icon: 'menu',
 *         popup: {
 *             $content: $( '<p>List of categories...</p>' ),
 *             padded: true,
 *             align: 'left'
 *         }
 *     } );
 *     var button2 = new OO.ui.ButtonWidget( {
 *         label: 'Add item'
 *     });
 *     var buttonGroup = new OO.ui.ButtonGroupWidget( {
 *         items: [button1, button2]
 *     } );
 *     $( 'body' ).append( buttonGroup.$element );
 *
 * @class
 * @extends OO.ui.Widget
 * @mixins OO.ui.mixin.GroupElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {OO.ui.ButtonWidget[]} [items] Buttons to add
 */
OO.ui.ButtonGroupWidget = function OoUiButtonGroupWidget( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.ButtonGroupWidget.parent.call( this, config );

	// Mixin constructors
	OO.ui.mixin.GroupElement.call( this, $.extend( {}, config, { $group: this.$element } ) );

	// Initialization
	this.$element.addClass( 'oo-ui-buttonGroupWidget' );
	if ( Array.isArray( config.items ) ) {
		this.addItems( config.items );
	}
};

/* Setup */

OO.inheritClass( OO.ui.ButtonGroupWidget, OO.ui.Widget );
OO.mixinClass( OO.ui.ButtonGroupWidget, OO.ui.mixin.GroupElement );

/* Static Properties */

/**
 * @static
 * @inheritdoc
 */
OO.ui.ButtonGroupWidget.static.tagName = 'span';

/* Methods */

/**
 * Focus the widget
 *
 * @chainable
 */
OO.ui.ButtonGroupWidget.prototype.focus = function () {
	if ( !this.isDisabled() ) {
		if ( this.items[ 0 ] ) {
			this.items[ 0 ].focus();
		}
	}
	return this;
};

/**
 * @inheritdoc
 */
OO.ui.ButtonGroupWidget.prototype.simulateLabelClick = function () {
	this.focus();
};

/**
 * IconWidget is a generic widget for {@link OO.ui.mixin.IconElement icons}. In general, IconWidgets should be used with OO.ui.LabelWidget,
 * which creates a label that identifies the icon’s function. See the [OOUI documentation on MediaWiki] [1]
 * for a list of icons included in the library.
 *
 *     @example
 *     // An icon widget with a label
 *     var myIcon = new OO.ui.IconWidget( {
 *         icon: 'help',
 *         iconTitle: 'Help'
 *      } );
 *      // Create a label.
 *      var iconLabel = new OO.ui.LabelWidget( {
 *          label: 'Help'
 *      } );
 *      $( 'body' ).append( myIcon.$element, iconLabel.$element );
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Widgets/Icons,_Indicators,_and_Labels#Icons
 *
 * @class
 * @extends OO.ui.Widget
 * @mixins OO.ui.mixin.IconElement
 * @mixins OO.ui.mixin.TitledElement
 * @mixins OO.ui.mixin.FlaggedElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 */
OO.ui.IconWidget = function OoUiIconWidget( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.IconWidget.parent.call( this, config );

	// Mixin constructors
	OO.ui.mixin.IconElement.call( this, $.extend( {}, config, { $icon: this.$element } ) );
	OO.ui.mixin.TitledElement.call( this, $.extend( {}, config, { $titled: this.$element } ) );
	OO.ui.mixin.FlaggedElement.call( this, $.extend( {}, config, { $flagged: this.$element } ) );

	// Initialization
	this.$element.addClass( 'oo-ui-iconWidget' );
};

/* Setup */

OO.inheritClass( OO.ui.IconWidget, OO.ui.Widget );
OO.mixinClass( OO.ui.IconWidget, OO.ui.mixin.IconElement );
OO.mixinClass( OO.ui.IconWidget, OO.ui.mixin.TitledElement );
OO.mixinClass( OO.ui.IconWidget, OO.ui.mixin.FlaggedElement );

/* Static Properties */

/**
 * @static
 * @inheritdoc
 */
OO.ui.IconWidget.static.tagName = 'span';

/**
 * IndicatorWidgets create indicators, which are small graphics that are generally used to draw
 * attention to the status of an item or to clarify the function within a control. For a list of
 * indicators included in the library, please see the [OOUI documentation on MediaWiki][1].
 *
 *     @example
 *     // Example of an indicator widget
 *     var indicator1 = new OO.ui.IndicatorWidget( {
 *         indicator: 'required'
 *     } );
 *
 *     // Create a fieldset layout to add a label
 *     var fieldset = new OO.ui.FieldsetLayout();
 *     fieldset.addItems( [
 *         new OO.ui.FieldLayout( indicator1, { label: 'A required indicator:' } )
 *     ] );
 *     $( 'body' ).append( fieldset.$element );
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Widgets/Icons,_Indicators,_and_Labels#Indicators
 *
 * @class
 * @extends OO.ui.Widget
 * @mixins OO.ui.mixin.IndicatorElement
 * @mixins OO.ui.mixin.TitledElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 */
OO.ui.IndicatorWidget = function OoUiIndicatorWidget( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.IndicatorWidget.parent.call( this, config );

	// Mixin constructors
	OO.ui.mixin.IndicatorElement.call( this, $.extend( {}, config, { $indicator: this.$element } ) );
	OO.ui.mixin.TitledElement.call( this, $.extend( {}, config, { $titled: this.$element } ) );

	// Initialization
	this.$element.addClass( 'oo-ui-indicatorWidget' );
};

/* Setup */

OO.inheritClass( OO.ui.IndicatorWidget, OO.ui.Widget );
OO.mixinClass( OO.ui.IndicatorWidget, OO.ui.mixin.IndicatorElement );
OO.mixinClass( OO.ui.IndicatorWidget, OO.ui.mixin.TitledElement );

/* Static Properties */

/**
 * @static
 * @inheritdoc
 */
OO.ui.IndicatorWidget.static.tagName = 'span';

/**
 * LabelWidgets help identify the function of interface elements. Each LabelWidget can
 * be configured with a `label` option that is set to a string, a label node, or a function:
 *
 * - String: a plaintext string
 * - jQuery selection: a jQuery selection, used for anything other than a plaintext label, e.g., a
 *   label that includes a link or special styling, such as a gray color or additional graphical elements.
 * - Function: a function that will produce a string in the future. Functions are used
 *   in cases where the value of the label is not currently defined.
 *
 * In addition, the LabelWidget can be associated with an {@link OO.ui.InputWidget input widget}, which
 * will come into focus when the label is clicked.
 *
 *     @example
 *     // Examples of LabelWidgets
 *     var label1 = new OO.ui.LabelWidget( {
 *         label: 'plaintext label'
 *     } );
 *     var label2 = new OO.ui.LabelWidget( {
 *         label: $( '<a href="default.html">jQuery label</a>' )
 *     } );
 *     // Create a fieldset layout with fields for each example
 *     var fieldset = new OO.ui.FieldsetLayout();
 *     fieldset.addItems( [
 *         new OO.ui.FieldLayout( label1 ),
 *         new OO.ui.FieldLayout( label2 )
 *     ] );
 *     $( 'body' ).append( fieldset.$element );
 *
 * @class
 * @extends OO.ui.Widget
 * @mixins OO.ui.mixin.LabelElement
 * @mixins OO.ui.mixin.TitledElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {OO.ui.InputWidget} [input] {@link OO.ui.InputWidget Input widget} that uses the label.
 *  Clicking the label will focus the specified input field.
 */
OO.ui.LabelWidget = function OoUiLabelWidget( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.LabelWidget.parent.call( this, config );

	// Mixin constructors
	OO.ui.mixin.LabelElement.call( this, $.extend( {}, config, { $label: this.$element } ) );
	OO.ui.mixin.TitledElement.call( this, config );

	// Properties
	this.input = config.input;

	// Initialization
	if ( this.input ) {
		if ( this.input.getInputId() ) {
			this.$element.attr( 'for', this.input.getInputId() );
		} else {
			this.$label.on( 'click', function () {
				this.input.simulateLabelClick();
			}.bind( this ) );
		}
	}
	this.$element.addClass( 'oo-ui-labelWidget' );
};

/* Setup */

OO.inheritClass( OO.ui.LabelWidget, OO.ui.Widget );
OO.mixinClass( OO.ui.LabelWidget, OO.ui.mixin.LabelElement );
OO.mixinClass( OO.ui.LabelWidget, OO.ui.mixin.TitledElement );

/* Static Properties */

/**
 * @static
 * @inheritdoc
 */
OO.ui.LabelWidget.static.tagName = 'label';

/**
 * PendingElement is a mixin that is used to create elements that notify users that something is happening
 * and that they should wait before proceeding. The pending state is visually represented with a pending
 * texture that appears in the head of a pending {@link OO.ui.ProcessDialog process dialog} or in the input
 * field of a {@link OO.ui.TextInputWidget text input widget}.
 *
 * Currently, {@link OO.ui.ActionWidget Action widgets}, which mix in this class, can also be marked as pending, but only when
 * used in {@link OO.ui.MessageDialog message dialogs}. The behavior is not currently supported for action widgets used
 * in process dialogs.
 *
 *     @example
 *     function MessageDialog( config ) {
 *         MessageDialog.parent.call( this, config );
 *     }
 *     OO.inheritClass( MessageDialog, OO.ui.MessageDialog );
 *
 *     MessageDialog.static.name = 'myMessageDialog';
 *     MessageDialog.static.actions = [
 *         { action: 'save', label: 'Done', flags: 'primary' },
 *         { label: 'Cancel', flags: 'safe' }
 *     ];
 *
 *     MessageDialog.prototype.initialize = function () {
 *         MessageDialog.parent.prototype.initialize.apply( this, arguments );
 *         this.content = new OO.ui.PanelLayout( { $: this.$, padded: true } );
 *         this.content.$element.append( '<p>Click the \'Done\' action widget to see its pending state. Note that action widgets can be marked pending in message dialogs but not process dialogs.</p>' );
 *         this.$body.append( this.content.$element );
 *     };
 *     MessageDialog.prototype.getBodyHeight = function () {
 *         return 100;
 *     }
 *     MessageDialog.prototype.getActionProcess = function ( action ) {
 *         var dialog = this;
 *         if ( action === 'save' ) {
 *             dialog.getActions().get({actions: 'save'})[0].pushPending();
 *             return new OO.ui.Process()
 *             .next( 1000 )
 *             .next( function () {
 *                 dialog.getActions().get({actions: 'save'})[0].popPending();
 *             } );
 *         }
 *         return MessageDialog.parent.prototype.getActionProcess.call( this, action );
 *     };
 *
 *     var windowManager = new OO.ui.WindowManager();
 *     $( 'body' ).append( windowManager.$element );
 *
 *     var dialog = new MessageDialog();
 *     windowManager.addWindows( [ dialog ] );
 *     windowManager.openWindow( dialog );
 *
 * @abstract
 * @class
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {jQuery} [$pending] Element to mark as pending, defaults to this.$element
 */
OO.ui.mixin.PendingElement = function OoUiMixinPendingElement( config ) {
	// Configuration initialization
	config = config || {};

	// Properties
	this.pending = 0;
	this.$pending = null;

	// Initialisation
	this.setPendingElement( config.$pending || this.$element );
};

/* Setup */

OO.initClass( OO.ui.mixin.PendingElement );

/* Methods */

/**
 * Set the pending element (and clean up any existing one).
 *
 * @param {jQuery} $pending The element to set to pending.
 */
OO.ui.mixin.PendingElement.prototype.setPendingElement = function ( $pending ) {
	if ( this.$pending ) {
		this.$pending.removeClass( 'oo-ui-pendingElement-pending' );
	}

	this.$pending = $pending;
	if ( this.pending > 0 ) {
		this.$pending.addClass( 'oo-ui-pendingElement-pending' );
	}
};

/**
 * Check if an element is pending.
 *
 * @return {boolean} Element is pending
 */
OO.ui.mixin.PendingElement.prototype.isPending = function () {
	return !!this.pending;
};

/**
 * Increase the pending counter. The pending state will remain active until the counter is zero
 * (i.e., the number of calls to #pushPending and #popPending is the same).
 *
 * @chainable
 */
OO.ui.mixin.PendingElement.prototype.pushPending = function () {
	if ( this.pending === 0 ) {
		this.$pending.addClass( 'oo-ui-pendingElement-pending' );
		this.updateThemeClasses();
	}
	this.pending++;

	return this;
};

/**
 * Decrease the pending counter. The pending state will remain active until the counter is zero
 * (i.e., the number of calls to #pushPending and #popPending is the same).
 *
 * @chainable
 */
OO.ui.mixin.PendingElement.prototype.popPending = function () {
	if ( this.pending === 1 ) {
		this.$pending.removeClass( 'oo-ui-pendingElement-pending' );
		this.updateThemeClasses();
	}
	this.pending = Math.max( 0, this.pending - 1 );

	return this;
};

/**
 * Element that will stick adjacent to a specified container, even when it is inserted elsewhere
 * in the document (for example, in an OO.ui.Window's $overlay).
 *
 * The elements's position is automatically calculated and maintained when window is resized or the
 * page is scrolled. If you reposition the container manually, you have to call #position to make
 * sure the element is still placed correctly.
 *
 * As positioning is only possible when both the element and the container are attached to the DOM
 * and visible, it's only done after you call #togglePositioning. You might want to do this inside
 * the #toggle method to display a floating popup, for example.
 *
 * @abstract
 * @class
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {jQuery} [$floatable] Node to position, assigned to #$floatable, omit to use #$element
 * @cfg {jQuery} [$floatableContainer] Node to position adjacent to
 * @cfg {string} [verticalPosition='below'] Where to position $floatable vertically:
 *  'below': Directly below $floatableContainer, aligning f's top edge with fC's bottom edge
 *  'above': Directly above $floatableContainer, aligning f's bottom edge with fC's top edge
 *  'top': Align the top edge with $floatableContainer's top edge
 *  'bottom': Align the bottom edge with $floatableContainer's bottom edge
 *  'center': Vertically align the center with $floatableContainer's center
 * @cfg {string} [horizontalPosition='start'] Where to position $floatable horizontally:
 *  'before': Directly before $floatableContainer, aligning f's end edge with fC's start edge
 *  'after': Directly after $floatableContainer, algining f's start edge with fC's end edge
 *  'start': Align the start (left in LTR, right in RTL) edge with $floatableContainer's start edge
 *  'end': Align the end (right in LTR, left in RTL) edge with $floatableContainer's end edge
 *  'center': Horizontally align the center with $floatableContainer's center
 * @cfg {boolean} [hideWhenOutOfView=true] Whether to hide the floatable element if the container
 *  is out of view
 */
OO.ui.mixin.FloatableElement = function OoUiMixinFloatableElement( config ) {
	// Configuration initialization
	config = config || {};

	// Properties
	this.$floatable = null;
	this.$floatableContainer = null;
	this.$floatableWindow = null;
	this.$floatableClosestScrollable = null;
	this.floatableOutOfView = false;
	this.onFloatableScrollHandler = this.position.bind( this );
	this.onFloatableWindowResizeHandler = this.position.bind( this );

	// Initialization
	this.setFloatableContainer( config.$floatableContainer );
	this.setFloatableElement( config.$floatable || this.$element );
	this.setVerticalPosition( config.verticalPosition || 'below' );
	this.setHorizontalPosition( config.horizontalPosition || 'start' );
	this.hideWhenOutOfView = config.hideWhenOutOfView === undefined ? true : !!config.hideWhenOutOfView;
};

/* Methods */

/**
 * Set floatable element.
 *
 * If an element is already set, it will be cleaned up before setting up the new element.
 *
 * @param {jQuery} $floatable Element to make floatable
 */
OO.ui.mixin.FloatableElement.prototype.setFloatableElement = function ( $floatable ) {
	if ( this.$floatable ) {
		this.$floatable.removeClass( 'oo-ui-floatableElement-floatable' );
		this.$floatable.css( { left: '', top: '' } );
	}

	this.$floatable = $floatable.addClass( 'oo-ui-floatableElement-floatable' );
	this.position();
};

/**
 * Set floatable container.
 *
 * The element will be positioned relative to the specified container.
 *
 * @param {jQuery|null} $floatableContainer Container to keep visible, or null to unset
 */
OO.ui.mixin.FloatableElement.prototype.setFloatableContainer = function ( $floatableContainer ) {
	this.$floatableContainer = $floatableContainer;
	if ( this.$floatable ) {
		this.position();
	}
};

/**
 * Change how the element is positioned vertically.
 *
 * @param {string} position 'below', 'above', 'top', 'bottom' or 'center'
 */
OO.ui.mixin.FloatableElement.prototype.setVerticalPosition = function ( position ) {
	if ( [ 'below', 'above', 'top', 'bottom', 'center' ].indexOf( position ) === -1 ) {
		throw new Error( 'Invalid value for vertical position: ' + position );
	}
	if ( this.verticalPosition !== position ) {
		this.verticalPosition = position;
		if ( this.$floatable ) {
			this.position();
		}
	}
};

/**
 * Change how the element is positioned horizontally.
 *
 * @param {string} position 'before', 'after', 'start', 'end' or 'center'
 */
OO.ui.mixin.FloatableElement.prototype.setHorizontalPosition = function ( position ) {
	if ( [ 'before', 'after', 'start', 'end', 'center' ].indexOf( position ) === -1 ) {
		throw new Error( 'Invalid value for horizontal position: ' + position );
	}
	if ( this.horizontalPosition !== position ) {
		this.horizontalPosition = position;
		if ( this.$floatable ) {
			this.position();
		}
	}
};

/**
 * Toggle positioning.
 *
 * Do not turn positioning on until after the element is attached to the DOM and visible.
 *
 * @param {boolean} [positioning] Enable positioning, omit to toggle
 * @chainable
 */
OO.ui.mixin.FloatableElement.prototype.togglePositioning = function ( positioning ) {
	var closestScrollableOfContainer;

	if ( !this.$floatable || !this.$floatableContainer ) {
		return this;
	}

	positioning = positioning === undefined ? !this.positioning : !!positioning;

	if ( positioning && !this.warnedUnattached && !this.isElementAttached() ) {
		OO.ui.warnDeprecation( 'FloatableElement#togglePositioning: Before calling this method, the element must be attached to the DOM.' );
		this.warnedUnattached = true;
	}

	if ( this.positioning !== positioning ) {
		this.positioning = positioning;

		this.needsCustomPosition =
			this.verticalPostion !== 'below' ||
			this.horizontalPosition !== 'start' ||
			!OO.ui.contains( this.$floatableContainer[ 0 ], this.$floatable[ 0 ] );

		closestScrollableOfContainer = OO.ui.Element.static.getClosestScrollableContainer( this.$floatableContainer[ 0 ] );
		// If the scrollable is the root, we have to listen to scroll events
		// on the window because of browser inconsistencies.
		if ( $( closestScrollableOfContainer ).is( 'html, body' ) ) {
			closestScrollableOfContainer = OO.ui.Element.static.getWindow( closestScrollableOfContainer );
		}

		if ( positioning ) {
			this.$floatableWindow = $( this.getElementWindow() );
			this.$floatableWindow.on( 'resize', this.onFloatableWindowResizeHandler );

			this.$floatableClosestScrollable = $( closestScrollableOfContainer );
			this.$floatableClosestScrollable.on( 'scroll', this.onFloatableScrollHandler );

			// Initial position after visible
			this.position();
		} else {
			if ( this.$floatableWindow ) {
				this.$floatableWindow.off( 'resize', this.onFloatableWindowResizeHandler );
				this.$floatableWindow = null;
			}

			if ( this.$floatableClosestScrollable ) {
				this.$floatableClosestScrollable.off( 'scroll', this.onFloatableScrollHandler );
				this.$floatableClosestScrollable = null;
			}

			this.$floatable.css( { left: '', right: '', top: '' } );
		}
	}

	return this;
};

/**
 * Check whether the bottom edge of the given element is within the viewport of the given container.
 *
 * @private
 * @param {jQuery} $element
 * @param {jQuery} $container
 * @return {boolean}
 */
OO.ui.mixin.FloatableElement.prototype.isElementInViewport = function ( $element, $container ) {
	var elemRect, contRect, topEdgeInBounds, bottomEdgeInBounds, leftEdgeInBounds, rightEdgeInBounds,
		startEdgeInBounds, endEdgeInBounds, viewportSpacing,
		direction = $element.css( 'direction' );

	elemRect = $element[ 0 ].getBoundingClientRect();
	if ( $container[ 0 ] === window ) {
		viewportSpacing = OO.ui.getViewportSpacing();
		contRect = {
			top: 0,
			left: 0,
			right: document.documentElement.clientWidth,
			bottom: document.documentElement.clientHeight
		};
		contRect.top += viewportSpacing.top;
		contRect.left += viewportSpacing.left;
		contRect.right -= viewportSpacing.right;
		contRect.bottom -= viewportSpacing.bottom;
	} else {
		contRect = $container[ 0 ].getBoundingClientRect();
	}

	topEdgeInBounds = elemRect.top >= contRect.top && elemRect.top <= contRect.bottom;
	bottomEdgeInBounds = elemRect.bottom >= contRect.top && elemRect.bottom <= contRect.bottom;
	leftEdgeInBounds = elemRect.left >= contRect.left && elemRect.left <= contRect.right;
	rightEdgeInBounds = elemRect.right >= contRect.left && elemRect.right <= contRect.right;
	if ( direction === 'rtl' ) {
		startEdgeInBounds = rightEdgeInBounds;
		endEdgeInBounds = leftEdgeInBounds;
	} else {
		startEdgeInBounds = leftEdgeInBounds;
		endEdgeInBounds = rightEdgeInBounds;
	}

	if ( this.verticalPosition === 'below' && !bottomEdgeInBounds ) {
		return false;
	}
	if ( this.verticalPosition === 'above' && !topEdgeInBounds ) {
		return false;
	}
	if ( this.horizontalPosition === 'before' && !startEdgeInBounds ) {
		return false;
	}
	if ( this.horizontalPosition === 'after' && !endEdgeInBounds ) {
		return false;
	}

	// The other positioning values are all about being inside the container,
	// so in those cases all we care about is that any part of the container is visible.
	return elemRect.top <= contRect.bottom && elemRect.bottom >= contRect.top &&
		elemRect.left <= contRect.right && elemRect.right >= contRect.left;
};

/**
 * Check if the floatable is hidden to the user because it was offscreen.
 *
 * @return {boolean} Floatable is out of view
 */
OO.ui.mixin.FloatableElement.prototype.isFloatableOutOfView = function () {
	return this.floatableOutOfView;
};

/**
 * Position the floatable below its container.
 *
 * This should only be done when both of them are attached to the DOM and visible.
 *
 * @chainable
 */
OO.ui.mixin.FloatableElement.prototype.position = function () {
	if ( !this.positioning ) {
		return this;
	}

	if ( !(
		// To continue, some things need to be true:
		// The element must actually be in the DOM
		this.isElementAttached() && (
			// The closest scrollable is the current window
			this.$floatableClosestScrollable[ 0 ] === this.getElementWindow() ||
			// OR is an element in the element's DOM
			$.contains( this.getElementDocument(), this.$floatableClosestScrollable[ 0 ] )
		)
	) ) {
		// Abort early if important parts of the widget are no longer attached to the DOM
		return this;
	}

	this.floatableOutOfView = this.hideWhenOutOfView && !this.isElementInViewport( this.$floatableContainer, this.$floatableClosestScrollable );
	if ( this.floatableOutOfView ) {
		this.$floatable.addClass( 'oo-ui-element-hidden' );
		return this;
	} else {
		this.$floatable.removeClass( 'oo-ui-element-hidden' );
	}

	if ( !this.needsCustomPosition ) {
		return this;
	}

	this.$floatable.css( this.computePosition() );

	// We updated the position, so re-evaluate the clipping state.
	// (ClippableElement does not listen to 'scroll' events on $floatableContainer's parent, and so
	// will not notice the need to update itself.)
	// TODO: This is terrible, we shouldn't need to know about ClippableElement at all here. Why does
	// it not listen to the right events in the right places?
	if ( this.clip ) {
		this.clip();
	}

	return this;
};

/**
 * Compute how #$floatable should be positioned based on the position of #$floatableContainer
 * and the positioning settings. This is a helper for #position that shouldn't be called directly,
 * but may be overridden by subclasses if they want to change or add to the positioning logic.
 *
 * @return {Object} New position to apply with .css(). Keys are 'top', 'left', 'bottom' and 'right'.
 */
OO.ui.mixin.FloatableElement.prototype.computePosition = function () {
	var isBody, scrollableX, scrollableY, containerPos,
		horizScrollbarHeight, vertScrollbarWidth, scrollTop, scrollLeft,
		newPos = { top: '', left: '', bottom: '', right: '' },
		direction = this.$floatableContainer.css( 'direction' ),
		$offsetParent = this.$floatable.offsetParent();

	if ( $offsetParent.is( 'html' ) ) {
		// The innerHeight/Width and clientHeight/Width calculations don't work well on the
		// <html> element, but they do work on the <body>
		$offsetParent = $( $offsetParent[ 0 ].ownerDocument.body );
	}
	isBody = $offsetParent.is( 'body' );
	scrollableX = $offsetParent.css( 'overflow-x' ) === 'scroll' || $offsetParent.css( 'overflow-x' ) === 'auto';
	scrollableY = $offsetParent.css( 'overflow-y' ) === 'scroll' || $offsetParent.css( 'overflow-y' ) === 'auto';

	vertScrollbarWidth = $offsetParent.innerWidth() - $offsetParent.prop( 'clientWidth' );
	horizScrollbarHeight = $offsetParent.innerHeight() - $offsetParent.prop( 'clientHeight' );
	// We don't need to compute and add scrollTop and scrollLeft if the scrollable container is the body,
	// or if it isn't scrollable
	scrollTop = scrollableY && !isBody ? $offsetParent.scrollTop() : 0;
	scrollLeft = scrollableX && !isBody ? OO.ui.Element.static.getScrollLeft( $offsetParent[ 0 ] ) : 0;

	// Avoid passing the <body> to getRelativePosition(), because it won't return what we expect
	// if the <body> has a margin
	containerPos = isBody ?
		this.$floatableContainer.offset() :
		OO.ui.Element.static.getRelativePosition( this.$floatableContainer, $offsetParent );
	containerPos.bottom = containerPos.top + this.$floatableContainer.outerHeight();
	containerPos.right = containerPos.left + this.$floatableContainer.outerWidth();
	containerPos.start = direction === 'rtl' ? containerPos.right : containerPos.left;
	containerPos.end = direction === 'rtl' ? containerPos.left : containerPos.right;

	if ( this.verticalPosition === 'below' ) {
		newPos.top = containerPos.bottom;
	} else if ( this.verticalPosition === 'above' ) {
		newPos.bottom = $offsetParent.outerHeight() - containerPos.top;
	} else if ( this.verticalPosition === 'top' ) {
		newPos.top = containerPos.top;
	} else if ( this.verticalPosition === 'bottom' ) {
		newPos.bottom = $offsetParent.outerHeight() - containerPos.bottom;
	} else if ( this.verticalPosition === 'center' ) {
		newPos.top = containerPos.top +
			( this.$floatableContainer.height() - this.$floatable.height() ) / 2;
	}

	if ( this.horizontalPosition === 'before' ) {
		newPos.end = containerPos.start;
	} else if ( this.horizontalPosition === 'after' ) {
		newPos.start = containerPos.end;
	} else if ( this.horizontalPosition === 'start' ) {
		newPos.start = containerPos.start;
	} else if ( this.horizontalPosition === 'end' ) {
		newPos.end = containerPos.end;
	} else if ( this.horizontalPosition === 'center' ) {
		newPos.left = containerPos.left +
			( this.$floatableContainer.width() - this.$floatable.width() ) / 2;
	}

	if ( newPos.start !== undefined ) {
		if ( direction === 'rtl' ) {
			newPos.right = ( isBody ? $( $offsetParent[ 0 ].ownerDocument.documentElement ) : $offsetParent ).outerWidth() - newPos.start;
		} else {
			newPos.left = newPos.start;
		}
		delete newPos.start;
	}
	if ( newPos.end !== undefined ) {
		if ( direction === 'rtl' ) {
			newPos.left = newPos.end;
		} else {
			newPos.right = ( isBody ? $( $offsetParent[ 0 ].ownerDocument.documentElement ) : $offsetParent ).outerWidth() - newPos.end;
		}
		delete newPos.end;
	}

	// Account for scroll position
	if ( newPos.top !== '' ) {
		newPos.top += scrollTop;
	}
	if ( newPos.bottom !== '' ) {
		newPos.bottom -= scrollTop;
	}
	if ( newPos.left !== '' ) {
		newPos.left += scrollLeft;
	}
	if ( newPos.right !== '' ) {
		newPos.right -= scrollLeft;
	}

	// Account for scrollbar gutter
	if ( newPos.bottom !== '' ) {
		newPos.bottom -= horizScrollbarHeight;
	}
	if ( direction === 'rtl' ) {
		if ( newPos.left !== '' ) {
			newPos.left -= vertScrollbarWidth;
		}
	} else {
		if ( newPos.right !== '' ) {
			newPos.right -= vertScrollbarWidth;
		}
	}

	return newPos;
};

/**
 * Element that can be automatically clipped to visible boundaries.
 *
 * Whenever the element's natural height changes, you have to call
 * {@link OO.ui.mixin.ClippableElement#clip} to make sure it's still
 * clipping correctly.
 *
 * The dimensions of #$clippableContainer will be compared to the boundaries of the
 * nearest scrollable container. If #$clippableContainer is too tall and/or too wide,
 * then #$clippable will be given a fixed reduced height and/or width and will be made
 * scrollable. By default, #$clippable and #$clippableContainer are the same element,
 * but you can build a static footer by setting #$clippableContainer to an element that contains
 * #$clippable and the footer.
 *
 * @abstract
 * @class
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {jQuery} [$clippable] Node to clip, assigned to #$clippable, omit to use #$element
 * @cfg {jQuery} [$clippableContainer] Node to keep visible, assigned to #$clippableContainer,
 *   omit to use #$clippable
 */
OO.ui.mixin.ClippableElement = function OoUiMixinClippableElement( config ) {
	// Configuration initialization
	config = config || {};

	// Properties
	this.$clippable = null;
	this.$clippableContainer = null;
	this.clipping = false;
	this.clippedHorizontally = false;
	this.clippedVertically = false;
	this.$clippableScrollableContainer = null;
	this.$clippableScroller = null;
	this.$clippableWindow = null;
	this.idealWidth = null;
	this.idealHeight = null;
	this.onClippableScrollHandler = this.clip.bind( this );
	this.onClippableWindowResizeHandler = this.clip.bind( this );

	// Initialization
	if ( config.$clippableContainer ) {
		this.setClippableContainer( config.$clippableContainer );
	}
	this.setClippableElement( config.$clippable || this.$element );
};

/* Methods */

/**
 * Set clippable element.
 *
 * If an element is already set, it will be cleaned up before setting up the new element.
 *
 * @param {jQuery} $clippable Element to make clippable
 */
OO.ui.mixin.ClippableElement.prototype.setClippableElement = function ( $clippable ) {
	if ( this.$clippable ) {
		this.$clippable.removeClass( 'oo-ui-clippableElement-clippable' );
		this.$clippable.css( { width: '', height: '', overflowX: '', overflowY: '' } );
		OO.ui.Element.static.reconsiderScrollbars( this.$clippable[ 0 ] );
	}

	this.$clippable = $clippable.addClass( 'oo-ui-clippableElement-clippable' );
	this.clip();
};

/**
 * Set clippable container.
 *
 * This is the container that will be measured when deciding whether to clip. When clipping,
 * #$clippable will be resized in order to keep the clippable container fully visible.
 *
 * If the clippable container is unset, #$clippable will be used.
 *
 * @param {jQuery|null} $clippableContainer Container to keep visible, or null to unset
 */
OO.ui.mixin.ClippableElement.prototype.setClippableContainer = function ( $clippableContainer ) {
	this.$clippableContainer = $clippableContainer;
	if ( this.$clippable ) {
		this.clip();
	}
};

/**
 * Toggle clipping.
 *
 * Do not turn clipping on until after the element is attached to the DOM and visible.
 *
 * @param {boolean} [clipping] Enable clipping, omit to toggle
 * @chainable
 */
OO.ui.mixin.ClippableElement.prototype.toggleClipping = function ( clipping ) {
	clipping = clipping === undefined ? !this.clipping : !!clipping;

	if ( clipping && !this.warnedUnattached && !this.isElementAttached() ) {
		OO.ui.warnDeprecation( 'ClippableElement#toggleClipping: Before calling this method, the element must be attached to the DOM.' );
		this.warnedUnattached = true;
	}

	if ( this.clipping !== clipping ) {
		this.clipping = clipping;
		if ( clipping ) {
			this.$clippableScrollableContainer = $( this.getClosestScrollableElementContainer() );
			// If the clippable container is the root, we have to listen to scroll events and check
			// jQuery.scrollTop on the window because of browser inconsistencies
			this.$clippableScroller = this.$clippableScrollableContainer.is( 'html, body' ) ?
				$( OO.ui.Element.static.getWindow( this.$clippableScrollableContainer ) ) :
				this.$clippableScrollableContainer;
			this.$clippableScroller.on( 'scroll', this.onClippableScrollHandler );
			this.$clippableWindow = $( this.getElementWindow() )
				.on( 'resize', this.onClippableWindowResizeHandler );
			// Initial clip after visible
			this.clip();
		} else {
			this.$clippable.css( {
				width: '',
				height: '',
				maxWidth: '',
				maxHeight: '',
				overflowX: '',
				overflowY: ''
			} );
			OO.ui.Element.static.reconsiderScrollbars( this.$clippable[ 0 ] );

			this.$clippableScrollableContainer = null;
			this.$clippableScroller.off( 'scroll', this.onClippableScrollHandler );
			this.$clippableScroller = null;
			this.$clippableWindow.off( 'resize', this.onClippableWindowResizeHandler );
			this.$clippableWindow = null;
		}
	}

	return this;
};

/**
 * Check if the element will be clipped to fit the visible area of the nearest scrollable container.
 *
 * @return {boolean} Element will be clipped to the visible area
 */
OO.ui.mixin.ClippableElement.prototype.isClipping = function () {
	return this.clipping;
};

/**
 * Check if the bottom or right of the element is being clipped by the nearest scrollable container.
 *
 * @return {boolean} Part of the element is being clipped
 */
OO.ui.mixin.ClippableElement.prototype.isClipped = function () {
	return this.clippedHorizontally || this.clippedVertically;
};

/**
 * Check if the right of the element is being clipped by the nearest scrollable container.
 *
 * @return {boolean} Part of the element is being clipped
 */
OO.ui.mixin.ClippableElement.prototype.isClippedHorizontally = function () {
	return this.clippedHorizontally;
};

/**
 * Check if the bottom of the element is being clipped by the nearest scrollable container.
 *
 * @return {boolean} Part of the element is being clipped
 */
OO.ui.mixin.ClippableElement.prototype.isClippedVertically = function () {
	return this.clippedVertically;
};

/**
 * Set the ideal size. These are the dimensions #$clippable will have when it's not being clipped.
 *
 * @param {number|string} [width] Width as a number of pixels or CSS string with unit suffix
 * @param {number|string} [height] Height as a number of pixels or CSS string with unit suffix
 */
OO.ui.mixin.ClippableElement.prototype.setIdealSize = function ( width, height ) {
	this.idealWidth = width;
	this.idealHeight = height;

	if ( !this.clipping ) {
		// Update dimensions
		this.$clippable.css( { width: width, height: height } );
	}
	// While clipping, idealWidth and idealHeight are not considered
};

/**
 * Return the side of the clippable on which it is "anchored" (aligned to something else).
 * ClippableElement will clip the opposite side when reducing element's width.
 *
 * Classes that mix in ClippableElement should override this to return 'right' if their
 * clippable is absolutely positioned and using 'right: Npx' (and not using 'left').
 * If your class also mixes in FloatableElement, this is handled automatically.
 *
 * (This can't be guessed from the actual CSS because the computed values for 'left'/'right' are
 * always in pixels, even if they were unset or set to 'auto'.)
 *
 * When in doubt, 'left' (or 'right' in RTL) is a sane fallback.
 *
 * @return {string} 'left' or 'right'
 */
OO.ui.mixin.ClippableElement.prototype.getHorizontalAnchorEdge = function () {
	if ( this.computePosition && this.positioning && this.computePosition().right !== '' ) {
		return 'right';
	}
	return 'left';
};

/**
 * Return the side of the clippable on which it is "anchored" (aligned to something else).
 * ClippableElement will clip the opposite side when reducing element's width.
 *
 * Classes that mix in ClippableElement should override this to return 'bottom' if their
 * clippable is absolutely positioned and using 'bottom: Npx' (and not using 'top').
 * If your class also mixes in FloatableElement, this is handled automatically.
 *
 * (This can't be guessed from the actual CSS because the computed values for 'left'/'right' are
 * always in pixels, even if they were unset or set to 'auto'.)
 *
 * When in doubt, 'top' is a sane fallback.
 *
 * @return {string} 'top' or 'bottom'
 */
OO.ui.mixin.ClippableElement.prototype.getVerticalAnchorEdge = function () {
	if ( this.computePosition && this.positioning && this.computePosition().bottom !== '' ) {
		return 'bottom';
	}
	return 'top';
};

/**
 * Clip element to visible boundaries and allow scrolling when needed. You should call this method
 * when the element's natural height changes.
 *
 * Element will be clipped the bottom or right of the element is within 10px of the edge of, or
 * overlapped by, the visible area of the nearest scrollable container.
 *
 * Because calling clip() when the natural height changes isn't always possible, we also set
 * max-height when the element isn't being clipped. This means that if the element tries to grow
 * beyond the edge, something reasonable will happen before clip() is called.
 *
 * @chainable
 */
OO.ui.mixin.ClippableElement.prototype.clip = function () {
	var extraHeight, extraWidth, viewportSpacing,
		desiredWidth, desiredHeight, allotedWidth, allotedHeight,
		naturalWidth, naturalHeight, clipWidth, clipHeight,
		$item, itemRect, $viewport, viewportRect, availableRect,
		direction, vertScrollbarWidth, horizScrollbarHeight,
		// Extra tolerance so that the sloppy code below doesn't result in results that are off
		// by one or two pixels. (And also so that we have space to display drop shadows.)
		// Chosen by fair dice roll.
		buffer = 7;

	if ( !this.clipping ) {
		// this.$clippableScrollableContainer and this.$clippableWindow are null, so the below will fail
		return this;
	}

	function rectIntersection( a, b ) {
		var out = {};
		out.top = Math.max( a.top, b.top );
		out.left = Math.max( a.left, b.left );
		out.bottom = Math.min( a.bottom, b.bottom );
		out.right = Math.min( a.right, b.right );
		return out;
	}

	viewportSpacing = OO.ui.getViewportSpacing();

	if ( this.$clippableScrollableContainer.is( 'html, body' ) ) {
		$viewport = $( this.$clippableScrollableContainer[ 0 ].ownerDocument.body );
		// Dimensions of the browser window, rather than the element!
		viewportRect = {
			top: 0,
			left: 0,
			right: document.documentElement.clientWidth,
			bottom: document.documentElement.clientHeight
		};
		viewportRect.top += viewportSpacing.top;
		viewportRect.left += viewportSpacing.left;
		viewportRect.right -= viewportSpacing.right;
		viewportRect.bottom -= viewportSpacing.bottom;
	} else {
		$viewport = this.$clippableScrollableContainer;
		viewportRect = $viewport[ 0 ].getBoundingClientRect();
		// Convert into a plain object
		viewportRect = $.extend( {}, viewportRect );
	}

	// Account for scrollbar gutter
	direction = $viewport.css( 'direction' );
	vertScrollbarWidth = $viewport.innerWidth() - $viewport.prop( 'clientWidth' );
	horizScrollbarHeight = $viewport.innerHeight() - $viewport.prop( 'clientHeight' );
	viewportRect.bottom -= horizScrollbarHeight;
	if ( direction === 'rtl' ) {
		viewportRect.left += vertScrollbarWidth;
	} else {
		viewportRect.right -= vertScrollbarWidth;
	}

	// Add arbitrary tolerance
	viewportRect.top += buffer;
	viewportRect.left += buffer;
	viewportRect.right -= buffer;
	viewportRect.bottom -= buffer;

	$item = this.$clippableContainer || this.$clippable;

	extraHeight = $item.outerHeight() - this.$clippable.outerHeight();
	extraWidth = $item.outerWidth() - this.$clippable.outerWidth();

	itemRect = $item[ 0 ].getBoundingClientRect();
	// Convert into a plain object
	itemRect = $.extend( {}, itemRect );

	// Item might already be clipped, so we can't just use its dimensions (in case we might need to
	// make it larger than before). Extend the rectangle to the maximum size we are allowed to take.
	if ( this.getHorizontalAnchorEdge() === 'right' ) {
		itemRect.left = viewportRect.left;
	} else {
		itemRect.right = viewportRect.right;
	}
	if ( this.getVerticalAnchorEdge() === 'bottom' ) {
		itemRect.top = viewportRect.top;
	} else {
		itemRect.bottom = viewportRect.bottom;
	}

	availableRect = rectIntersection( viewportRect, itemRect );

	desiredWidth = Math.max( 0, availableRect.right - availableRect.left );
	desiredHeight = Math.max( 0, availableRect.bottom - availableRect.top );
	// It should never be desirable to exceed the dimensions of the browser viewport... right?
	desiredWidth = Math.min( desiredWidth,
		document.documentElement.clientWidth - viewportSpacing.left - viewportSpacing.right );
	desiredHeight = Math.min( desiredHeight,
		document.documentElement.clientHeight - viewportSpacing.top - viewportSpacing.right );
	allotedWidth = Math.ceil( desiredWidth - extraWidth );
	allotedHeight = Math.ceil( desiredHeight - extraHeight );
	naturalWidth = this.$clippable.prop( 'scrollWidth' );
	naturalHeight = this.$clippable.prop( 'scrollHeight' );
	clipWidth = allotedWidth < naturalWidth;
	clipHeight = allotedHeight < naturalHeight;

	if ( clipWidth ) {
		// The order matters here. If overflow is not set first, Chrome displays bogus scrollbars. See T157672.
		// Forcing a reflow is a smaller workaround than calling reconsiderScrollbars() for this case.
		this.$clippable.css( 'overflowX', 'scroll' );
		void this.$clippable[ 0 ].offsetHeight; // Force reflow
		this.$clippable.css( {
			width: Math.max( 0, allotedWidth ),
			maxWidth: ''
		} );
	} else {
		this.$clippable.css( {
			overflowX: '',
			width: this.idealWidth || '',
			maxWidth: Math.max( 0, allotedWidth )
		} );
	}
	if ( clipHeight ) {
		// The order matters here. If overflow is not set first, Chrome displays bogus scrollbars. See T157672.
		// Forcing a reflow is a smaller workaround than calling reconsiderScrollbars() for this case.
		this.$clippable.css( 'overflowY', 'scroll' );
		void this.$clippable[ 0 ].offsetHeight; // Force reflow
		this.$clippable.css( {
			height: Math.max( 0, allotedHeight ),
			maxHeight: ''
		} );
	} else {
		this.$clippable.css( {
			overflowY: '',
			height: this.idealHeight || '',
			maxHeight: Math.max( 0, allotedHeight )
		} );
	}

	// If we stopped clipping in at least one of the dimensions
	if ( ( this.clippedHorizontally && !clipWidth ) || ( this.clippedVertically && !clipHeight ) ) {
		OO.ui.Element.static.reconsiderScrollbars( this.$clippable[ 0 ] );
	}

	this.clippedHorizontally = clipWidth;
	this.clippedVertically = clipHeight;

	return this;
};

/**
 * PopupWidget is a container for content. The popup is overlaid and positioned absolutely.
 * By default, each popup has an anchor that points toward its origin.
 * Please see the [OOUI documentation on Mediawiki] [1] for more information and examples.
 *
 * Unlike most widgets, PopupWidget is initially hidden and must be shown by calling #toggle.
 *
 *     @example
 *     // A popup widget.
 *     var popup = new OO.ui.PopupWidget( {
 *         $content: $( '<p>Hi there!</p>' ),
 *         padded: true,
 *         width: 300
 *     } );
 *
 *     $( 'body' ).append( popup.$element );
 *     // To display the popup, toggle the visibility to 'true'.
 *     popup.toggle( true );
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Widgets/Popups
 *
 * @class
 * @extends OO.ui.Widget
 * @mixins OO.ui.mixin.LabelElement
 * @mixins OO.ui.mixin.ClippableElement
 * @mixins OO.ui.mixin.FloatableElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {number} [width=320] Width of popup in pixels
 * @cfg {number} [height] Height of popup in pixels. Omit to use the automatic height.
 * @cfg {boolean} [anchor=true] Show anchor pointing to origin of popup
 * @cfg {string} [position='below'] Where to position the popup relative to $floatableContainer
 *  'above': Put popup above $floatableContainer; anchor points down to the horizontal center
 *           of $floatableContainer
 *  'below': Put popup below $floatableContainer; anchor points up to the horizontal center
 *           of $floatableContainer
 *  'before': Put popup to the left (LTR) / right (RTL) of $floatableContainer; anchor points
 *            endwards (right/left) to the vertical center of $floatableContainer
 *  'after': Put popup to the right (LTR) / left (RTL) of $floatableContainer; anchor points
 *            startwards (left/right) to the vertical center of $floatableContainer
 * @cfg {string} [align='center'] How to align the popup to $floatableContainer
 *  'forwards': If position is above/below, move the popup as far endwards (right in LTR, left in RTL)
 *              as possible while still keeping the anchor within the popup;
 *              if position is before/after, move the popup as far downwards as possible.
 *  'backwards': If position is above/below, move the popup as far startwards (left in LTR, right in RTL)
 *               as possible while still keeping the anchor within the popup;
 *               if position in before/after, move the popup as far upwards as possible.
 *  'center': Horizontally (if position is above/below) or vertically (before/after) align the center
 *            of the popup with the center of $floatableContainer.
 * 'force-left': Alias for 'forwards' in LTR and 'backwards' in RTL
 * 'force-right': Alias for 'backwards' in RTL and 'forwards' in LTR
 * @cfg {boolean} [autoFlip=true] Whether to automatically switch the popup's position between
 *  'above' and 'below', or between 'before' and 'after', if there is not enough space in the
 *  desired direction to display the popup without clipping
 * @cfg {jQuery} [$container] Constrain the popup to the boundaries of the specified container.
 *  See the [OOUI docs on MediaWiki][3] for an example.
 *  [3]: https://www.mediawiki.org/wiki/OOUI/Widgets/Popups#containerExample
 * @cfg {number} [containerPadding=10] Padding between the popup and its container, specified as a number of pixels.
 * @cfg {jQuery} [$content] Content to append to the popup's body
 * @cfg {jQuery} [$footer] Content to append to the popup's footer
 * @cfg {boolean} [autoClose=false] Automatically close the popup when it loses focus.
 * @cfg {jQuery} [$autoCloseIgnore] Elements that will not close the popup when clicked.
 *  This config option is only relevant if #autoClose is set to `true`. See the [OOUI documentation on MediaWiki][2]
 *  for an example.
 *  [2]: https://www.mediawiki.org/wiki/OOUI/Widgets/Popups#autocloseExample
 * @cfg {boolean} [head=false] Show a popup header that contains a #label (if specified) and close
 *  button.
 * @cfg {boolean} [padded=false] Add padding to the popup's body
 */
OO.ui.PopupWidget = function OoUiPopupWidget( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.PopupWidget.parent.call( this, config );

	// Properties (must be set before ClippableElement constructor call)
	this.$body = $( '<div>' );
	this.$popup = $( '<div>' );

	// Mixin constructors
	OO.ui.mixin.LabelElement.call( this, config );
	OO.ui.mixin.ClippableElement.call( this, $.extend( {}, config, {
		$clippable: this.$body,
		$clippableContainer: this.$popup
	} ) );
	OO.ui.mixin.FloatableElement.call( this, config );

	// Properties
	this.$anchor = $( '<div>' );
	// If undefined, will be computed lazily in computePosition()
	this.$container = config.$container;
	this.containerPadding = config.containerPadding !== undefined ? config.containerPadding : 10;
	this.autoClose = !!config.autoClose;
	this.$autoCloseIgnore = config.$autoCloseIgnore;
	this.transitionTimeout = null;
	this.anchored = false;
	this.width = config.width !== undefined ? config.width : 320;
	this.height = config.height !== undefined ? config.height : null;
	this.onMouseDownHandler = this.onMouseDown.bind( this );
	this.onDocumentKeyDownHandler = this.onDocumentKeyDown.bind( this );

	// Initialization
	this.toggleAnchor( config.anchor === undefined || config.anchor );
	this.setAlignment( config.align || 'center' );
	this.setPosition( config.position || 'below' );
	this.setAutoFlip( config.autoFlip === undefined || config.autoFlip );
	this.$body.addClass( 'oo-ui-popupWidget-body' );
	this.$anchor.addClass( 'oo-ui-popupWidget-anchor' );
	this.$popup
		.addClass( 'oo-ui-popupWidget-popup' )
		.append( this.$body );
	this.$element
		.addClass( 'oo-ui-popupWidget' )
		.append( this.$popup, this.$anchor );
	// Move content, which was added to #$element by OO.ui.Widget, to the body
	// FIXME This is gross, we should use '$body' or something for the config
	if ( config.$content instanceof jQuery ) {
		this.$body.append( config.$content );
	}

	if ( config.padded ) {
		this.$body.addClass( 'oo-ui-popupWidget-body-padded' );
	}

	if ( config.head ) {
		this.closeButton = new OO.ui.ButtonWidget( { framed: false, icon: 'close' } );
		this.closeButton.connect( this, { click: 'onCloseButtonClick' } );
		this.$head = $( '<div>' )
			.addClass( 'oo-ui-popupWidget-head' )
			.append( this.$label, this.closeButton.$element );
		this.$popup.prepend( this.$head );
	}

	if ( config.$footer ) {
		this.$footer = $( '<div>' )
			.addClass( 'oo-ui-popupWidget-footer' )
			.append( config.$footer );
		this.$popup.append( this.$footer );
	}

	// Initially hidden - using #toggle may cause errors if subclasses override toggle with methods
	// that reference properties not initialized at that time of parent class construction
	// TODO: Find a better way to handle post-constructor setup
	this.visible = false;
	this.$element.addClass( 'oo-ui-element-hidden' );
};

/* Setup */

OO.inheritClass( OO.ui.PopupWidget, OO.ui.Widget );
OO.mixinClass( OO.ui.PopupWidget, OO.ui.mixin.LabelElement );
OO.mixinClass( OO.ui.PopupWidget, OO.ui.mixin.ClippableElement );
OO.mixinClass( OO.ui.PopupWidget, OO.ui.mixin.FloatableElement );

/* Events */

/**
 * @event ready
 *
 * The popup is ready: it is visible and has been positioned and clipped.
 */

/* Methods */

/**
 * Handles mouse down events.
 *
 * @private
 * @param {MouseEvent} e Mouse down event
 */
OO.ui.PopupWidget.prototype.onMouseDown = function ( e ) {
	if (
		this.isVisible() &&
		!OO.ui.contains( this.$element.add( this.$autoCloseIgnore ).get(), e.target, true )
	) {
		this.toggle( false );
	}
};

/**
 * Bind mouse down listener.
 *
 * @private
 */
OO.ui.PopupWidget.prototype.bindMouseDownListener = function () {
	// Capture clicks outside popup
	this.getElementWindow().addEventListener( 'mousedown', this.onMouseDownHandler, true );
};

/**
 * Handles close button click events.
 *
 * @private
 */
OO.ui.PopupWidget.prototype.onCloseButtonClick = function () {
	if ( this.isVisible() ) {
		this.toggle( false );
	}
};

/**
 * Unbind mouse down listener.
 *
 * @private
 */
OO.ui.PopupWidget.prototype.unbindMouseDownListener = function () {
	this.getElementWindow().removeEventListener( 'mousedown', this.onMouseDownHandler, true );
};

/**
 * Handles key down events.
 *
 * @private
 * @param {KeyboardEvent} e Key down event
 */
OO.ui.PopupWidget.prototype.onDocumentKeyDown = function ( e ) {
	if (
		e.which === OO.ui.Keys.ESCAPE &&
		this.isVisible()
	) {
		this.toggle( false );
		e.preventDefault();
		e.stopPropagation();
	}
};

/**
 * Bind key down listener.
 *
 * @private
 */
OO.ui.PopupWidget.prototype.bindKeyDownListener = function () {
	this.getElementWindow().addEventListener( 'keydown', this.onDocumentKeyDownHandler, true );
};

/**
 * Unbind key down listener.
 *
 * @private
 */
OO.ui.PopupWidget.prototype.unbindKeyDownListener = function () {
	this.getElementWindow().removeEventListener( 'keydown', this.onDocumentKeyDownHandler, true );
};

/**
 * Show, hide, or toggle the visibility of the anchor.
 *
 * @param {boolean} [show] Show anchor, omit to toggle
 */
OO.ui.PopupWidget.prototype.toggleAnchor = function ( show ) {
	show = show === undefined ? !this.anchored : !!show;

	if ( this.anchored !== show ) {
		if ( show ) {
			this.$element.addClass( 'oo-ui-popupWidget-anchored' );
			this.$element.addClass( 'oo-ui-popupWidget-anchored-' + this.anchorEdge );
		} else {
			this.$element.removeClass( 'oo-ui-popupWidget-anchored' );
			this.$element.removeClass( 'oo-ui-popupWidget-anchored-' + this.anchorEdge );
		}
		this.anchored = show;
	}
};

/**
 * Change which edge the anchor appears on.
 *
 * @param {string} edge 'top', 'bottom', 'start' or 'end'
 */
OO.ui.PopupWidget.prototype.setAnchorEdge = function ( edge ) {
	if ( [ 'top', 'bottom', 'start', 'end' ].indexOf( edge ) === -1 ) {
		throw new Error( 'Invalid value for edge: ' + edge );
	}
	if ( this.anchorEdge !== null ) {
		this.$element.removeClass( 'oo-ui-popupWidget-anchored-' + this.anchorEdge );
	}
	this.anchorEdge = edge;
	if ( this.anchored ) {
		this.$element.addClass( 'oo-ui-popupWidget-anchored-' + edge );
	}
};

/**
 * Check if the anchor is visible.
 *
 * @return {boolean} Anchor is visible
 */
OO.ui.PopupWidget.prototype.hasAnchor = function () {
	return this.anchored;
};

/**
 * Toggle visibility of the popup. The popup is initially hidden and must be shown by calling
 * `.toggle( true )` after its #$element is attached to the DOM.
 *
 * Do not show the popup while it is not attached to the DOM. The calculations required to display
 * it in the right place and with the right dimensions only work correctly while it is attached.
 * Side-effects may include broken interface and exceptions being thrown. This wasn't always
 * strictly enforced, so currently it only generates a warning in the browser console.
 *
 * @fires ready
 * @inheritdoc
 */
OO.ui.PopupWidget.prototype.toggle = function ( show ) {
	var change, normalHeight, oppositeHeight, normalWidth, oppositeWidth;
	show = show === undefined ? !this.isVisible() : !!show;

	change = show !== this.isVisible();

	if ( show && !this.warnedUnattached && !this.isElementAttached() ) {
		OO.ui.warnDeprecation( 'PopupWidget#toggle: Before calling this method, the popup must be attached to the DOM.' );
		this.warnedUnattached = true;
	}
	if ( show && !this.$floatableContainer && this.isElementAttached() ) {
		// Fall back to the parent node if the floatableContainer is not set
		this.setFloatableContainer( this.$element.parent() );
	}

	if ( change && show && this.autoFlip ) {
		// Reset auto-flipping before showing the popup again. It's possible we no longer need to flip
		// (e.g. if the user scrolled).
		this.isAutoFlipped = false;
	}

	// Parent method
	OO.ui.PopupWidget.parent.prototype.toggle.call( this, show );

	if ( change ) {
		this.togglePositioning( show && !!this.$floatableContainer );

		if ( show ) {
			if ( this.autoClose ) {
				this.bindMouseDownListener();
				this.bindKeyDownListener();
			}
			this.updateDimensions();
			this.toggleClipping( true );

			if ( this.autoFlip ) {
				if ( this.popupPosition === 'above' || this.popupPosition === 'below' ) {
					if ( this.isClippedVertically() || this.isFloatableOutOfView() ) {
						// If opening the popup in the normal direction causes it to be clipped, open
						// in the opposite one instead
						normalHeight = this.$element.height();
						this.isAutoFlipped = !this.isAutoFlipped;
						this.position();
						if ( this.isClippedVertically() || this.isFloatableOutOfView() ) {
							// If that also causes it to be clipped, open in whichever direction
							// we have more space
							oppositeHeight = this.$element.height();
							if ( oppositeHeight < normalHeight ) {
								this.isAutoFlipped = !this.isAutoFlipped;
								this.position();
							}
						}
					}
				}
				if ( this.popupPosition === 'before' || this.popupPosition === 'after' ) {
					if ( this.isClippedHorizontally() || this.isFloatableOutOfView() ) {
						// If opening the popup in the normal direction causes it to be clipped, open
						// in the opposite one instead
						normalWidth = this.$element.width();
						this.isAutoFlipped = !this.isAutoFlipped;
						// Due to T180173 horizontally clipped PopupWidgets have messed up dimensions,
						// which causes positioning to be off. Toggle clipping back and fort to work around.
						this.toggleClipping( false );
						this.position();
						this.toggleClipping( true );
						if ( this.isClippedHorizontally() || this.isFloatableOutOfView() ) {
							// If that also causes it to be clipped, open in whichever direction
							// we have more space
							oppositeWidth = this.$element.width();
							if ( oppositeWidth < normalWidth ) {
								this.isAutoFlipped = !this.isAutoFlipped;
								// Due to T180173 horizontally clipped PopupWidgets have messed up dimensions,
								// which causes positioning to be off. Toggle clipping back and fort to work around.
								this.toggleClipping( false );
								this.position();
								this.toggleClipping( true );
							}
						}
					}
				}
			}

			this.emit( 'ready' );
		} else {
			this.toggleClipping( false );
			if ( this.autoClose ) {
				this.unbindMouseDownListener();
				this.unbindKeyDownListener();
			}
		}
	}

	return this;
};

/**
 * Set the size of the popup.
 *
 * Changing the size may also change the popup's position depending on the alignment.
 *
 * @param {number} width Width in pixels
 * @param {number} height Height in pixels
 * @param {boolean} [transition=false] Use a smooth transition
 * @chainable
 */
OO.ui.PopupWidget.prototype.setSize = function ( width, height, transition ) {
	this.width = width;
	this.height = height !== undefined ? height : null;
	if ( this.isVisible() ) {
		this.updateDimensions( transition );
	}
};

/**
 * Update the size and position.
 *
 * Only use this to keep the popup properly anchored. Use #setSize to change the size, and this will
 * be called automatically.
 *
 * @param {boolean} [transition=false] Use a smooth transition
 * @chainable
 */
OO.ui.PopupWidget.prototype.updateDimensions = function ( transition ) {
	var widget = this;

	// Prevent transition from being interrupted
	clearTimeout( this.transitionTimeout );
	if ( transition ) {
		// Enable transition
		this.$element.addClass( 'oo-ui-popupWidget-transitioning' );
	}

	this.position();

	if ( transition ) {
		// Prevent transitioning after transition is complete
		this.transitionTimeout = setTimeout( function () {
			widget.$element.removeClass( 'oo-ui-popupWidget-transitioning' );
		}, 200 );
	} else {
		// Prevent transitioning immediately
		this.$element.removeClass( 'oo-ui-popupWidget-transitioning' );
	}
};

/**
 * @inheritdoc
 */
OO.ui.PopupWidget.prototype.computePosition = function () {
	var direction, align, vertical, start, end, near, far, sizeProp, popupSize, anchorSize, anchorPos,
		anchorOffset, anchorMargin, parentPosition, positionProp, positionAdjustment, floatablePos,
		offsetParentPos, containerPos, popupPosition, viewportSpacing,
		popupPos = {},
		anchorCss = { left: '', right: '', top: '', bottom: '' },
		popupPositionOppositeMap = {
			above: 'below',
			below: 'above',
			before: 'after',
			after: 'before'
		},
		alignMap = {
			ltr: {
				'force-left': 'backwards',
				'force-right': 'forwards'
			},
			rtl: {
				'force-left': 'forwards',
				'force-right': 'backwards'
			}
		},
		anchorEdgeMap = {
			above: 'bottom',
			below: 'top',
			before: 'end',
			after: 'start'
		},
		hPosMap = {
			forwards: 'start',
			center: 'center',
			backwards: this.anchored ? 'before' : 'end'
		},
		vPosMap = {
			forwards: 'top',
			center: 'center',
			backwards: 'bottom'
		};

	if ( !this.$container ) {
		// Lazy-initialize $container if not specified in constructor
		this.$container = $( this.getClosestScrollableElementContainer() );
	}
	direction = this.$container.css( 'direction' );

	// Set height and width before we do anything else, since it might cause our measurements
	// to change (e.g. due to scrollbars appearing or disappearing), and it also affects centering
	this.$popup.css( {
		width: this.width,
		height: this.height !== null ? this.height : 'auto'
	} );

	align = alignMap[ direction ][ this.align ] || this.align;
	popupPosition = this.popupPosition;
	if ( this.isAutoFlipped ) {
		popupPosition = popupPositionOppositeMap[ popupPosition ];
	}

	// If the popup is positioned before or after, then the anchor positioning is vertical, otherwise horizontal
	vertical = popupPosition === 'before' || popupPosition === 'after';
	start = vertical ? 'top' : ( direction === 'rtl' ? 'right' : 'left' );
	end = vertical ? 'bottom' : ( direction === 'rtl' ? 'left' : 'right' );
	near = vertical ? 'top' : 'left';
	far = vertical ? 'bottom' : 'right';
	sizeProp = vertical ? 'Height' : 'Width';
	popupSize = vertical ? ( this.height || this.$popup.height() ) : this.width;

	this.setAnchorEdge( anchorEdgeMap[ popupPosition ] );
	this.horizontalPosition = vertical ? popupPosition : hPosMap[ align ];
	this.verticalPosition = vertical ? vPosMap[ align ] : popupPosition;

	// Parent method
	parentPosition = OO.ui.mixin.FloatableElement.prototype.computePosition.call( this );
	// Find out which property FloatableElement used for positioning, and adjust that value
	positionProp = vertical ?
		( parentPosition.top !== '' ? 'top' : 'bottom' ) :
		( parentPosition.left !== '' ? 'left' : 'right' );

	// Figure out where the near and far edges of the popup and $floatableContainer are
	floatablePos = this.$floatableContainer.offset();
	floatablePos[ far ] = floatablePos[ near ] + this.$floatableContainer[ 'outer' + sizeProp ]();
	// Measure where the offsetParent is and compute our position based on that and parentPosition
	offsetParentPos = this.$element.offsetParent()[ 0 ] === document.documentElement ?
		{ top: 0, left: 0 } :
		this.$element.offsetParent().offset();

	if ( positionProp === near ) {
		popupPos[ near ] = offsetParentPos[ near ] + parentPosition[ near ];
		popupPos[ far ] = popupPos[ near ] + popupSize;
	} else {
		popupPos[ far ] = offsetParentPos[ near ] +
			this.$element.offsetParent()[ 'inner' + sizeProp ]() - parentPosition[ far ];
		popupPos[ near ] = popupPos[ far ] - popupSize;
	}

	if ( this.anchored ) {
		// Position the anchor (which is positioned relative to the popup) to point to $floatableContainer
		anchorPos = ( floatablePos[ start ] + floatablePos[ end ] ) / 2;
		anchorOffset = ( start === far ? -1 : 1 ) * ( anchorPos - popupPos[ start ] );

		// If the anchor is less than 2*anchorSize from either edge, move the popup to make more space
		// this.$anchor.width()/height() returns 0 because of the CSS trickery we use, so use scrollWidth/Height
		anchorSize = this.$anchor[ 0 ][ 'scroll' + sizeProp ];
		anchorMargin = parseFloat( this.$anchor.css( 'margin-' + start ) );
		if ( anchorOffset + anchorMargin < 2 * anchorSize ) {
			// Not enough space for the anchor on the start side; pull the popup startwards
			positionAdjustment = ( positionProp === start ? -1 : 1 ) *
				( 2 * anchorSize - ( anchorOffset + anchorMargin ) );
		} else if ( anchorOffset + anchorMargin > popupSize - 2 * anchorSize ) {
			// Not enough space for the anchor on the end side; pull the popup endwards
			positionAdjustment = ( positionProp === end ? -1 : 1 ) *
				( anchorOffset + anchorMargin - ( popupSize - 2 * anchorSize ) );
		} else {
			positionAdjustment = 0;
		}
	} else {
		positionAdjustment = 0;
	}

	// Check if the popup will go beyond the edge of this.$container
	containerPos = this.$container[ 0 ] === document.documentElement ?
		{ top: 0, left: 0 } :
		this.$container.offset();
	containerPos[ far ] = containerPos[ near ] + this.$container[ 'inner' + sizeProp ]();
	if ( this.$container[ 0 ] === document.documentElement ) {
		viewportSpacing = OO.ui.getViewportSpacing();
		containerPos[ near ] += viewportSpacing[ near ];
		containerPos[ far ] -= viewportSpacing[ far ];
	}
	// Take into account how much the popup will move because of the adjustments we're going to make
	popupPos[ near ] += ( positionProp === near ? 1 : -1 ) * positionAdjustment;
	popupPos[ far ] += ( positionProp === near ? 1 : -1 ) * positionAdjustment;
	if ( containerPos[ near ] + this.containerPadding > popupPos[ near ] ) {
		// Popup goes beyond the near (left/top) edge, move it to the right/bottom
		positionAdjustment += ( positionProp === near ? 1 : -1 ) *
			( containerPos[ near ] + this.containerPadding - popupPos[ near ] );
	} else if ( containerPos[ far ] - this.containerPadding < popupPos[ far ] ) {
		// Popup goes beyond the far (right/bottom) edge, move it to the left/top
		positionAdjustment += ( positionProp === far ? 1 : -1 ) *
			( popupPos[ far ] - ( containerPos[ far ] - this.containerPadding ) );
	}

	if ( this.anchored ) {
		// Adjust anchorOffset for positionAdjustment
		anchorOffset += ( positionProp === start ? -1 : 1 ) * positionAdjustment;

		// Position the anchor
		anchorCss[ start ] = anchorOffset;
		this.$anchor.css( anchorCss );
	}

	// Move the popup if needed
	parentPosition[ positionProp ] += positionAdjustment;

	return parentPosition;
};

/**
 * Set popup alignment
 *
 * @param {string} [align=center] Alignment of the popup, `center`, `force-left`, `force-right`,
 *  `backwards` or `forwards`.
 */
OO.ui.PopupWidget.prototype.setAlignment = function ( align ) {
	// Validate alignment
	if ( [ 'force-left', 'force-right', 'backwards', 'forwards', 'center' ].indexOf( align ) > -1 ) {
		this.align = align;
	} else {
		this.align = 'center';
	}
	this.position();
};

/**
 * Get popup alignment
 *
 * @return {string} Alignment of the popup, `center`, `force-left`, `force-right`,
 *  `backwards` or `forwards`.
 */
OO.ui.PopupWidget.prototype.getAlignment = function () {
	return this.align;
};

/**
 * Change the positioning of the popup.
 *
 * @param {string} position 'above', 'below', 'before' or 'after'
 */
OO.ui.PopupWidget.prototype.setPosition = function ( position ) {
	if ( [ 'above', 'below', 'before', 'after' ].indexOf( position ) === -1 ) {
		position = 'below';
	}
	this.popupPosition = position;
	this.position();
};

/**
 * Get popup positioning.
 *
 * @return {string} 'above', 'below', 'before' or 'after'
 */
OO.ui.PopupWidget.prototype.getPosition = function () {
	return this.popupPosition;
};

/**
 * Set popup auto-flipping.
 *
 * @param {boolean} autoFlip Whether to automatically switch the popup's position between
 *  'above' and 'below', or between 'before' and 'after', if there is not enough space in the
 *  desired direction to display the popup without clipping
 */
OO.ui.PopupWidget.prototype.setAutoFlip = function ( autoFlip ) {
	autoFlip = !!autoFlip;

	if ( this.autoFlip !== autoFlip ) {
		this.autoFlip = autoFlip;
	}
};

/**
 * Get an ID of the body element, this can be used as the
 * `aria-describedby` attribute for an input field.
 *
 * @return {string} The ID of the body element
 */
OO.ui.PopupWidget.prototype.getBodyId = function () {
	var id = this.$body.attr( 'id' );
	if ( id === undefined ) {
		id = OO.ui.generateElementId();
		this.$body.attr( 'id', id );
	}
	return id;
};

/**
 * PopupElement is mixed into other classes to generate a {@link OO.ui.PopupWidget popup widget}.
 * A popup is a container for content. It is overlaid and positioned absolutely. By default, each
 * popup has an anchor, which is an arrow-like protrusion that points toward the popup’s origin.
 * See {@link OO.ui.PopupWidget PopupWidget} for an example.
 *
 * @abstract
 * @class
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {Object} [popup] Configuration to pass to popup
 * @cfg {boolean} [popup.autoClose=true] Popup auto-closes when it loses focus
 */
OO.ui.mixin.PopupElement = function OoUiMixinPopupElement( config ) {
	// Configuration initialization
	config = config || {};

	// Properties
	this.popup = new OO.ui.PopupWidget( $.extend(
		{
			autoClose: true,
			$floatableContainer: this.$element
		},
		config.popup,
		{
			$autoCloseIgnore: this.$element.add( config.popup && config.popup.$autoCloseIgnore )
		}
	) );
};

/* Methods */

/**
 * Get popup.
 *
 * @return {OO.ui.PopupWidget} Popup widget
 */
OO.ui.mixin.PopupElement.prototype.getPopup = function () {
	return this.popup;
};

/**
 * PopupButtonWidgets toggle the visibility of a contained {@link OO.ui.PopupWidget PopupWidget},
 * which is used to display additional information or options.
 *
 *     @example
 *     // Example of a popup button.
 *     var popupButton = new OO.ui.PopupButtonWidget( {
 *         label: 'Popup button with options',
 *         icon: 'menu',
 *         popup: {
 *             $content: $( '<p>Additional options here.</p>' ),
 *             padded: true,
 *             align: 'force-left'
 *         }
 *     } );
 *     // Append the button to the DOM.
 *     $( 'body' ).append( popupButton.$element );
 *
 * @class
 * @extends OO.ui.ButtonWidget
 * @mixins OO.ui.mixin.PopupElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {jQuery} [$overlay] Render the popup into a separate layer. This configuration is useful in cases where
 *  the expanded popup is larger than its containing `<div>`. The specified overlay layer is usually on top of the
 *  containing `<div>` and has a larger area. By default, the popup uses relative positioning.
 *  See <https://www.mediawiki.org/wiki/OOUI/Concepts#Overlays>.
 */
OO.ui.PopupButtonWidget = function OoUiPopupButtonWidget( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.PopupButtonWidget.parent.call( this, config );

	// Mixin constructors
	OO.ui.mixin.PopupElement.call( this, config );

	// Properties
	this.$overlay = ( config.$overlay === true ? OO.ui.getDefaultOverlay() : config.$overlay ) || this.$element;

	// Events
	this.connect( this, { click: 'onAction' } );

	// Initialization
	this.$element
		.addClass( 'oo-ui-popupButtonWidget' )
		.attr( 'aria-haspopup', 'true' );
	this.popup.$element
		.addClass( 'oo-ui-popupButtonWidget-popup' )
		.toggleClass( 'oo-ui-popupButtonWidget-framed-popup', this.isFramed() )
		.toggleClass( 'oo-ui-popupButtonWidget-frameless-popup', !this.isFramed() );
	this.$overlay.append( this.popup.$element );
};

/* Setup */

OO.inheritClass( OO.ui.PopupButtonWidget, OO.ui.ButtonWidget );
OO.mixinClass( OO.ui.PopupButtonWidget, OO.ui.mixin.PopupElement );

/* Methods */

/**
 * Handle the button action being triggered.
 *
 * @private
 */
OO.ui.PopupButtonWidget.prototype.onAction = function () {
	this.popup.toggle();
};

/**
 * Mixin for OO.ui.Widget subclasses to provide OO.ui.mixin.GroupElement.
 *
 * Use together with OO.ui.mixin.ItemWidget to make disabled state inheritable.
 *
 * @private
 * @abstract
 * @class
 * @mixins OO.ui.mixin.GroupElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 */
OO.ui.mixin.GroupWidget = function OoUiMixinGroupWidget( config ) {
	// Mixin constructors
	OO.ui.mixin.GroupElement.call( this, config );
};

/* Setup */

OO.mixinClass( OO.ui.mixin.GroupWidget, OO.ui.mixin.GroupElement );

/* Methods */

/**
 * Set the disabled state of the widget.
 *
 * This will also update the disabled state of child widgets.
 *
 * @param {boolean} disabled Disable widget
 * @chainable
 */
OO.ui.mixin.GroupWidget.prototype.setDisabled = function ( disabled ) {
	var i, len;

	// Parent method
	// Note: Calling #setDisabled this way assumes this is mixed into an OO.ui.Widget
	OO.ui.Widget.prototype.setDisabled.call( this, disabled );

	// During construction, #setDisabled is called before the OO.ui.mixin.GroupElement constructor
	if ( this.items ) {
		for ( i = 0, len = this.items.length; i < len; i++ ) {
			this.items[ i ].updateDisabled();
		}
	}

	return this;
};

/**
 * Mixin for widgets used as items in widgets that mix in OO.ui.mixin.GroupWidget.
 *
 * Item widgets have a reference to a OO.ui.mixin.GroupWidget while they are attached to the group. This
 * allows bidirectional communication.
 *
 * Use together with OO.ui.mixin.GroupWidget to make disabled state inheritable.
 *
 * @private
 * @abstract
 * @class
 *
 * @constructor
 */
OO.ui.mixin.ItemWidget = function OoUiMixinItemWidget() {
	//
};

/* Methods */

/**
 * Check if widget is disabled.
 *
 * Checks parent if present, making disabled state inheritable.
 *
 * @return {boolean} Widget is disabled
 */
OO.ui.mixin.ItemWidget.prototype.isDisabled = function () {
	return this.disabled ||
		( this.elementGroup instanceof OO.ui.Widget && this.elementGroup.isDisabled() );
};

/**
 * Set group element is in.
 *
 * @param {OO.ui.mixin.GroupElement|null} group Group element, null if none
 * @chainable
 */
OO.ui.mixin.ItemWidget.prototype.setElementGroup = function ( group ) {
	// Parent method
	// Note: Calling #setElementGroup this way assumes this is mixed into an OO.ui.Element
	OO.ui.Element.prototype.setElementGroup.call( this, group );

	// Initialize item disabled states
	this.updateDisabled();

	return this;
};

/**
 * OptionWidgets are special elements that can be selected and configured with data. The
 * data is often unique for each option, but it does not have to be. OptionWidgets are used
 * with OO.ui.SelectWidget to create a selection of mutually exclusive options. For more information
 * and examples, please see the [OOUI documentation on MediaWiki][1].
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Widgets/Selects_and_Options
 *
 * @class
 * @extends OO.ui.Widget
 * @mixins OO.ui.mixin.ItemWidget
 * @mixins OO.ui.mixin.LabelElement
 * @mixins OO.ui.mixin.FlaggedElement
 * @mixins OO.ui.mixin.AccessKeyedElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 */
OO.ui.OptionWidget = function OoUiOptionWidget( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.OptionWidget.parent.call( this, config );

	// Mixin constructors
	OO.ui.mixin.ItemWidget.call( this );
	OO.ui.mixin.LabelElement.call( this, config );
	OO.ui.mixin.FlaggedElement.call( this, config );
	OO.ui.mixin.AccessKeyedElement.call( this, config );

	// Properties
	this.selected = false;
	this.highlighted = false;
	this.pressed = false;

	// Initialization
	this.$element
		.data( 'oo-ui-optionWidget', this )
		// Allow programmatic focussing (and by accesskey), but not tabbing
		.attr( 'tabindex', '-1' )
		.attr( 'role', 'option' )
		.attr( 'aria-selected', 'false' )
		.addClass( 'oo-ui-optionWidget' )
		.append( this.$label );
};

/* Setup */

OO.inheritClass( OO.ui.OptionWidget, OO.ui.Widget );
OO.mixinClass( OO.ui.OptionWidget, OO.ui.mixin.ItemWidget );
OO.mixinClass( OO.ui.OptionWidget, OO.ui.mixin.LabelElement );
OO.mixinClass( OO.ui.OptionWidget, OO.ui.mixin.FlaggedElement );
OO.mixinClass( OO.ui.OptionWidget, OO.ui.mixin.AccessKeyedElement );

/* Static Properties */

/**
 * Whether this option can be selected. See #setSelected.
 *
 * @static
 * @inheritable
 * @property {boolean}
 */
OO.ui.OptionWidget.static.selectable = true;

/**
 * Whether this option can be highlighted. See #setHighlighted.
 *
 * @static
 * @inheritable
 * @property {boolean}
 */
OO.ui.OptionWidget.static.highlightable = true;

/**
 * Whether this option can be pressed. See #setPressed.
 *
 * @static
 * @inheritable
 * @property {boolean}
 */
OO.ui.OptionWidget.static.pressable = true;

/**
 * Whether this option will be scrolled into view when it is selected.
 *
 * @static
 * @inheritable
 * @property {boolean}
 */
OO.ui.OptionWidget.static.scrollIntoViewOnSelect = false;

/* Methods */

/**
 * Check if the option can be selected.
 *
 * @return {boolean} Item is selectable
 */
OO.ui.OptionWidget.prototype.isSelectable = function () {
	return this.constructor.static.selectable && !this.disabled && this.isVisible();
};

/**
 * Check if the option can be highlighted. A highlight indicates that the option
 * may be selected when a user presses enter or clicks. Disabled items cannot
 * be highlighted.
 *
 * @return {boolean} Item is highlightable
 */
OO.ui.OptionWidget.prototype.isHighlightable = function () {
	return this.constructor.static.highlightable && !this.disabled && this.isVisible();
};

/**
 * Check if the option can be pressed. The pressed state occurs when a user mouses
 * down on an item, but has not yet let go of the mouse.
 *
 * @return {boolean} Item is pressable
 */
OO.ui.OptionWidget.prototype.isPressable = function () {
	return this.constructor.static.pressable && !this.disabled && this.isVisible();
};

/**
 * Check if the option is selected.
 *
 * @return {boolean} Item is selected
 */
OO.ui.OptionWidget.prototype.isSelected = function () {
	return this.selected;
};

/**
 * Check if the option is highlighted. A highlight indicates that the
 * item may be selected when a user presses enter or clicks.
 *
 * @return {boolean} Item is highlighted
 */
OO.ui.OptionWidget.prototype.isHighlighted = function () {
	return this.highlighted;
};

/**
 * Check if the option is pressed. The pressed state occurs when a user mouses
 * down on an item, but has not yet let go of the mouse. The item may appear
 * selected, but it will not be selected until the user releases the mouse.
 *
 * @return {boolean} Item is pressed
 */
OO.ui.OptionWidget.prototype.isPressed = function () {
	return this.pressed;
};

/**
 * Set the option’s selected state. In general, all modifications to the selection
 * should be handled by the SelectWidget’s {@link OO.ui.SelectWidget#selectItem selectItem( [item] )}
 * method instead of this method.
 *
 * @param {boolean} [state=false] Select option
 * @chainable
 */
OO.ui.OptionWidget.prototype.setSelected = function ( state ) {
	if ( this.constructor.static.selectable ) {
		this.selected = !!state;
		this.$element
			.toggleClass( 'oo-ui-optionWidget-selected', state )
			.attr( 'aria-selected', state.toString() );
		if ( state && this.constructor.static.scrollIntoViewOnSelect ) {
			this.scrollElementIntoView();
		}
		this.updateThemeClasses();
	}
	return this;
};

/**
 * Set the option’s highlighted state. In general, all programmatic
 * modifications to the highlight should be handled by the
 * SelectWidget’s {@link OO.ui.SelectWidget#highlightItem highlightItem( [item] )}
 * method instead of this method.
 *
 * @param {boolean} [state=false] Highlight option
 * @chainable
 */
OO.ui.OptionWidget.prototype.setHighlighted = function ( state ) {
	if ( this.constructor.static.highlightable ) {
		this.highlighted = !!state;
		this.$element.toggleClass( 'oo-ui-optionWidget-highlighted', state );
		this.updateThemeClasses();
	}
	return this;
};

/**
 * Set the option’s pressed state. In general, all
 * programmatic modifications to the pressed state should be handled by the
 * SelectWidget’s {@link OO.ui.SelectWidget#pressItem pressItem( [item] )}
 * method instead of this method.
 *
 * @param {boolean} [state=false] Press option
 * @chainable
 */
OO.ui.OptionWidget.prototype.setPressed = function ( state ) {
	if ( this.constructor.static.pressable ) {
		this.pressed = !!state;
		this.$element.toggleClass( 'oo-ui-optionWidget-pressed', state );
		this.updateThemeClasses();
	}
	return this;
};

/**
 * Get text to match search strings against.
 *
 * The default implementation returns the label text, but subclasses
 * can override this to provide more complex behavior.
 *
 * @return {string|boolean} String to match search string against
 */
OO.ui.OptionWidget.prototype.getMatchText = function () {
	var label = this.getLabel();
	return typeof label === 'string' ? label : this.$label.text();
};

/**
 * A SelectWidget is of a generic selection of options. The OOUI library contains several types of
 * select widgets, including {@link OO.ui.ButtonSelectWidget button selects},
 * {@link OO.ui.RadioSelectWidget radio selects}, and {@link OO.ui.MenuSelectWidget
 * menu selects}.
 *
 * This class should be used together with OO.ui.OptionWidget or OO.ui.DecoratedOptionWidget. For more
 * information, please see the [OOUI documentation on MediaWiki][1].
 *
 *     @example
 *     // Example of a select widget with three options
 *     var select = new OO.ui.SelectWidget( {
 *         items: [
 *             new OO.ui.OptionWidget( {
 *                 data: 'a',
 *                 label: 'Option One',
 *             } ),
 *             new OO.ui.OptionWidget( {
 *                 data: 'b',
 *                 label: 'Option Two',
 *             } ),
 *             new OO.ui.OptionWidget( {
 *                 data: 'c',
 *                 label: 'Option Three',
 *             } )
 *         ]
 *     } );
 *     $( 'body' ).append( select.$element );
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Widgets/Selects_and_Options
 *
 * @abstract
 * @class
 * @extends OO.ui.Widget
 * @mixins OO.ui.mixin.GroupWidget
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {OO.ui.OptionWidget[]} [items] An array of options to add to the select.
 *  Options are created with {@link OO.ui.OptionWidget OptionWidget} classes. See
 *  the [OOUI documentation on MediaWiki] [2] for examples.
 *  [2]: https://www.mediawiki.org/wiki/OOUI/Widgets/Selects_and_Options
 */
OO.ui.SelectWidget = function OoUiSelectWidget( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.SelectWidget.parent.call( this, config );

	// Mixin constructors
	OO.ui.mixin.GroupWidget.call( this, $.extend( {}, config, { $group: this.$element } ) );

	// Properties
	this.pressed = false;
	this.selecting = null;
	this.onMouseUpHandler = this.onMouseUp.bind( this );
	this.onMouseMoveHandler = this.onMouseMove.bind( this );
	this.onKeyDownHandler = this.onKeyDown.bind( this );
	this.onKeyPressHandler = this.onKeyPress.bind( this );
	this.keyPressBuffer = '';
	this.keyPressBufferTimer = null;
	this.blockMouseOverEvents = 0;

	// Events
	this.connect( this, {
		toggle: 'onToggle'
	} );
	this.$element.on( {
		focusin: this.onFocus.bind( this ),
		mousedown: this.onMouseDown.bind( this ),
		mouseover: this.onMouseOver.bind( this ),
		mouseleave: this.onMouseLeave.bind( this )
	} );

	// Initialization
	this.$element
		.addClass( 'oo-ui-selectWidget oo-ui-selectWidget-depressed' )
		.attr( 'role', 'listbox' );
	this.setFocusOwner( this.$element );
	if ( Array.isArray( config.items ) ) {
		this.addItems( config.items );
	}
};

/* Setup */

OO.inheritClass( OO.ui.SelectWidget, OO.ui.Widget );
OO.mixinClass( OO.ui.SelectWidget, OO.ui.mixin.GroupWidget );

/* Events */

/**
 * @event highlight
 *
 * A `highlight` event is emitted when the highlight is changed with the #highlightItem method.
 *
 * @param {OO.ui.OptionWidget|null} item Highlighted item
 */

/**
 * @event press
 *
 * A `press` event is emitted when the #pressItem method is used to programmatically modify the
 * pressed state of an option.
 *
 * @param {OO.ui.OptionWidget|null} item Pressed item
 */

/**
 * @event select
 *
 * A `select` event is emitted when the selection is modified programmatically with the #selectItem method.
 *
 * @param {OO.ui.OptionWidget|null} item Selected item
 */

/**
 * @event choose
 * A `choose` event is emitted when an item is chosen with the #chooseItem method.
 * @param {OO.ui.OptionWidget} item Chosen item
 */

/**
 * @event add
 *
 * An `add` event is emitted when options are added to the select with the #addItems method.
 *
 * @param {OO.ui.OptionWidget[]} items Added items
 * @param {number} index Index of insertion point
 */

/**
 * @event remove
 *
 * A `remove` event is emitted when options are removed from the select with the #clearItems
 * or #removeItems methods.
 *
 * @param {OO.ui.OptionWidget[]} items Removed items
 */

/* Methods */

/**
 * Handle focus events
 *
 * @private
 * @param {jQuery.Event} event
 */
OO.ui.SelectWidget.prototype.onFocus = function ( event ) {
	var item;
	if ( event.target === this.$element[ 0 ] ) {
		// This widget was focussed, e.g. by the user tabbing to it.
		// The styles for focus state depend on one of the items being selected.
		if ( !this.findSelectedItem() ) {
			item = this.findFirstSelectableItem();
		}
	} else {
		if ( event.target.tabIndex === -1 ) {
			// One of the options got focussed (and the event bubbled up here).
			// They can't be tabbed to, but they can be activated using accesskeys.
			// OptionWidgets and focusable UI elements inside them have tabindex="-1" set.
			item = this.findTargetItem( event );
		} else {
			// There is something actually user-focusable in one of the labels of the options, and the
			// user focussed it (e.g. by tabbing to it). Do nothing (especially, don't change the focus).
			return;
		}
	}

	if ( item ) {
		if ( item.constructor.static.highlightable ) {
			this.highlightItem( item );
		} else {
			this.selectItem( item );
		}
	}

	if ( event.target !== this.$element[ 0 ] ) {
		this.$focusOwner.focus();
	}
};

/**
 * Handle mouse down events.
 *
 * @private
 * @param {jQuery.Event} e Mouse down event
 */
OO.ui.SelectWidget.prototype.onMouseDown = function ( e ) {
	var item;

	if ( !this.isDisabled() && e.which === OO.ui.MouseButtons.LEFT ) {
		this.togglePressed( true );
		item = this.findTargetItem( e );
		if ( item && item.isSelectable() ) {
			this.pressItem( item );
			this.selecting = item;
			this.getElementDocument().addEventListener( 'mouseup', this.onMouseUpHandler, true );
			this.getElementDocument().addEventListener( 'mousemove', this.onMouseMoveHandler, true );
		}
	}
	return false;
};

/**
 * Handle mouse up events.
 *
 * @private
 * @param {MouseEvent} e Mouse up event
 */
OO.ui.SelectWidget.prototype.onMouseUp = function ( e ) {
	var item;

	this.togglePressed( false );
	if ( !this.selecting ) {
		item = this.findTargetItem( e );
		if ( item && item.isSelectable() ) {
			this.selecting = item;
		}
	}
	if ( !this.isDisabled() && e.which === OO.ui.MouseButtons.LEFT && this.selecting ) {
		this.pressItem( null );
		this.chooseItem( this.selecting );
		this.selecting = null;
	}

	this.getElementDocument().removeEventListener( 'mouseup', this.onMouseUpHandler, true );
	this.getElementDocument().removeEventListener( 'mousemove', this.onMouseMoveHandler, true );

	return false;
};

/**
 * Handle mouse move events.
 *
 * @private
 * @param {MouseEvent} e Mouse move event
 */
OO.ui.SelectWidget.prototype.onMouseMove = function ( e ) {
	var item;

	if ( !this.isDisabled() && this.pressed ) {
		item = this.findTargetItem( e );
		if ( item && item !== this.selecting && item.isSelectable() ) {
			this.pressItem( item );
			this.selecting = item;
		}
	}
};

/**
 * Handle mouse over events.
 *
 * @private
 * @param {jQuery.Event} e Mouse over event
 */
OO.ui.SelectWidget.prototype.onMouseOver = function ( e ) {
	var item;
	if ( this.blockMouseOverEvents ) {
		return;
	}
	if ( !this.isDisabled() ) {
		item = this.findTargetItem( e );
		this.highlightItem( item && item.isHighlightable() ? item : null );
	}
	return false;
};

/**
 * Handle mouse leave events.
 *
 * @private
 * @param {jQuery.Event} e Mouse over event
 */
OO.ui.SelectWidget.prototype.onMouseLeave = function () {
	if ( !this.isDisabled() ) {
		this.highlightItem( null );
	}
	return false;
};

/**
 * Handle key down events.
 *
 * @protected
 * @param {KeyboardEvent} e Key down event
 */
OO.ui.SelectWidget.prototype.onKeyDown = function ( e ) {
	var nextItem,
		handled = false,
		currentItem = this.findHighlightedItem() || this.findSelectedItem();

	if ( !this.isDisabled() && this.isVisible() ) {
		switch ( e.keyCode ) {
			case OO.ui.Keys.ENTER:
				if ( currentItem && currentItem.constructor.static.highlightable ) {
					// Was only highlighted, now let's select it. No-op if already selected.
					this.chooseItem( currentItem );
					handled = true;
				}
				break;
			case OO.ui.Keys.UP:
			case OO.ui.Keys.LEFT:
				this.clearKeyPressBuffer();
				nextItem = this.findRelativeSelectableItem( currentItem, -1 );
				handled = true;
				break;
			case OO.ui.Keys.DOWN:
			case OO.ui.Keys.RIGHT:
				this.clearKeyPressBuffer();
				nextItem = this.findRelativeSelectableItem( currentItem, 1 );
				handled = true;
				break;
			case OO.ui.Keys.ESCAPE:
			case OO.ui.Keys.TAB:
				if ( currentItem && currentItem.constructor.static.highlightable ) {
					currentItem.setHighlighted( false );
				}
				this.unbindKeyDownListener();
				this.unbindKeyPressListener();
				// Don't prevent tabbing away / defocusing
				handled = false;
				break;
		}

		if ( nextItem ) {
			if ( nextItem.constructor.static.highlightable ) {
				this.highlightItem( nextItem );
			} else {
				this.chooseItem( nextItem );
			}
			this.scrollItemIntoView( nextItem );
		}

		if ( handled ) {
			e.preventDefault();
			e.stopPropagation();
		}
	}
};

/**
 * Bind key down listener.
 *
 * @protected
 */
OO.ui.SelectWidget.prototype.bindKeyDownListener = function () {
	this.getElementWindow().addEventListener( 'keydown', this.onKeyDownHandler, true );
};

/**
 * Unbind key down listener.
 *
 * @protected
 */
OO.ui.SelectWidget.prototype.unbindKeyDownListener = function () {
	this.getElementWindow().removeEventListener( 'keydown', this.onKeyDownHandler, true );
};

/**
 * Scroll item into view, preventing spurious mouse highlight actions from happening.
 *
 * @param {OO.ui.OptionWidget} item Item to scroll into view
 */
OO.ui.SelectWidget.prototype.scrollItemIntoView = function ( item ) {
	var widget = this;
	// Chromium's Blink engine will generate spurious 'mouseover' events during programmatic scrolling
	// and around 100-150 ms after it is finished.
	this.blockMouseOverEvents++;
	item.scrollElementIntoView().done( function () {
		setTimeout( function () {
			widget.blockMouseOverEvents--;
		}, 200 );
	} );
};

/**
 * Clear the key-press buffer
 *
 * @protected
 */
OO.ui.SelectWidget.prototype.clearKeyPressBuffer = function () {
	if ( this.keyPressBufferTimer ) {
		clearTimeout( this.keyPressBufferTimer );
		this.keyPressBufferTimer = null;
	}
	this.keyPressBuffer = '';
};

/**
 * Handle key press events.
 *
 * @protected
 * @param {KeyboardEvent} e Key press event
 */
OO.ui.SelectWidget.prototype.onKeyPress = function ( e ) {
	var c, filter, item;

	if ( !e.charCode ) {
		if ( e.keyCode === OO.ui.Keys.BACKSPACE && this.keyPressBuffer !== '' ) {
			this.keyPressBuffer = this.keyPressBuffer.substr( 0, this.keyPressBuffer.length - 1 );
			return false;
		}
		return;
	}
	if ( String.fromCodePoint ) {
		c = String.fromCodePoint( e.charCode );
	} else {
		c = String.fromCharCode( e.charCode );
	}

	if ( this.keyPressBufferTimer ) {
		clearTimeout( this.keyPressBufferTimer );
	}
	this.keyPressBufferTimer = setTimeout( this.clearKeyPressBuffer.bind( this ), 1500 );

	item = this.findHighlightedItem() || this.findSelectedItem();

	if ( this.keyPressBuffer === c ) {
		// Common (if weird) special case: typing "xxxx" will cycle through all
		// the items beginning with "x".
		if ( item ) {
			item = this.findRelativeSelectableItem( item, 1 );
		}
	} else {
		this.keyPressBuffer += c;
	}

	filter = this.getItemMatcher( this.keyPressBuffer, false );
	if ( !item || !filter( item ) ) {
		item = this.findRelativeSelectableItem( item, 1, filter );
	}
	if ( item ) {
		if ( this.isVisible() && item.constructor.static.highlightable ) {
			this.highlightItem( item );
		} else {
			this.chooseItem( item );
		}
		this.scrollItemIntoView( item );
	}

	e.preventDefault();
	e.stopPropagation();
};

/**
 * Get a matcher for the specific string
 *
 * @protected
 * @param {string} s String to match against items
 * @param {boolean} [exact=false] Only accept exact matches
 * @return {Function} function ( OO.ui.OptionWidget ) => boolean
 */
OO.ui.SelectWidget.prototype.getItemMatcher = function ( s, exact ) {
	var re;

	if ( s.normalize ) {
		s = s.normalize();
	}
	s = exact ? s.trim() : s.replace( /^\s+/, '' );
	re = '^\\s*' + s.replace( /([\\{}()|.?*+\-^$[\]])/g, '\\$1' ).replace( /\s+/g, '\\s+' );
	if ( exact ) {
		re += '\\s*$';
	}
	re = new RegExp( re, 'i' );
	return function ( item ) {
		var matchText = item.getMatchText();
		if ( matchText.normalize ) {
			matchText = matchText.normalize();
		}
		return re.test( matchText );
	};
};

/**
 * Bind key press listener.
 *
 * @protected
 */
OO.ui.SelectWidget.prototype.bindKeyPressListener = function () {
	this.getElementWindow().addEventListener( 'keypress', this.onKeyPressHandler, true );
};

/**
 * Unbind key down listener.
 *
 * If you override this, be sure to call this.clearKeyPressBuffer() from your
 * implementation.
 *
 * @protected
 */
OO.ui.SelectWidget.prototype.unbindKeyPressListener = function () {
	this.getElementWindow().removeEventListener( 'keypress', this.onKeyPressHandler, true );
	this.clearKeyPressBuffer();
};

/**
 * Visibility change handler
 *
 * @protected
 * @param {boolean} visible
 */
OO.ui.SelectWidget.prototype.onToggle = function ( visible ) {
	if ( !visible ) {
		this.clearKeyPressBuffer();
	}
};

/**
 * Get the closest item to a jQuery.Event.
 *
 * @private
 * @param {jQuery.Event} e
 * @return {OO.ui.OptionWidget|null} Outline item widget, `null` if none was found
 */
OO.ui.SelectWidget.prototype.findTargetItem = function ( e ) {
	var $option = $( e.target ).closest( '.oo-ui-optionWidget' );
	if ( !$option.closest( '.oo-ui-selectWidget' ).is( this.$element ) ) {
		return null;
	}
	return $option.data( 'oo-ui-optionWidget' ) || null;
};

/**
 * Find selected item.
 *
 * @return {OO.ui.OptionWidget|null} Selected item, `null` if no item is selected
 */
OO.ui.SelectWidget.prototype.findSelectedItem = function () {
	var i, len;

	for ( i = 0, len = this.items.length; i < len; i++ ) {
		if ( this.items[ i ].isSelected() ) {
			return this.items[ i ];
		}
	}
	return null;
};

/**
 * Get selected item.
 *
 * @deprecated Since v0.25.0; use {@link #findSelectedItem} instead.
 * @return {OO.ui.OptionWidget|null} Selected item, `null` if no item is selected
 */
OO.ui.SelectWidget.prototype.getSelectedItem = function () {
	OO.ui.warnDeprecation( 'SelectWidget#getSelectedItem: Deprecated function. Use findSelectedItem instead. See T76630.' );
	return this.findSelectedItem();
};

/**
 * Find highlighted item.
 *
 * @return {OO.ui.OptionWidget|null} Highlighted item, `null` if no item is highlighted
 */
OO.ui.SelectWidget.prototype.findHighlightedItem = function () {
	var i, len;

	for ( i = 0, len = this.items.length; i < len; i++ ) {
		if ( this.items[ i ].isHighlighted() ) {
			return this.items[ i ];
		}
	}
	return null;
};

/**
 * Toggle pressed state.
 *
 * Press is a state that occurs when a user mouses down on an item, but
 * has not yet let go of the mouse. The item may appear selected, but it will not be selected
 * until the user releases the mouse.
 *
 * @param {boolean} pressed An option is being pressed
 */
OO.ui.SelectWidget.prototype.togglePressed = function ( pressed ) {
	if ( pressed === undefined ) {
		pressed = !this.pressed;
	}
	if ( pressed !== this.pressed ) {
		this.$element
			.toggleClass( 'oo-ui-selectWidget-pressed', pressed )
			.toggleClass( 'oo-ui-selectWidget-depressed', !pressed );
		this.pressed = pressed;
	}
};

/**
 * Highlight an option. If the `item` param is omitted, no options will be highlighted
 * and any existing highlight will be removed. The highlight is mutually exclusive.
 *
 * @param {OO.ui.OptionWidget} [item] Item to highlight, omit for no highlight
 * @fires highlight
 * @chainable
 */
OO.ui.SelectWidget.prototype.highlightItem = function ( item ) {
	var i, len, highlighted,
		changed = false;

	for ( i = 0, len = this.items.length; i < len; i++ ) {
		highlighted = this.items[ i ] === item;
		if ( this.items[ i ].isHighlighted() !== highlighted ) {
			this.items[ i ].setHighlighted( highlighted );
			changed = true;
		}
	}
	if ( changed ) {
		if ( item ) {
			this.$focusOwner.attr( 'aria-activedescendant', item.getElementId() );
		} else {
			this.$focusOwner.removeAttr( 'aria-activedescendant' );
		}
		this.emit( 'highlight', item );
	}

	return this;
};

/**
 * Fetch an item by its label.
 *
 * @param {string} label Label of the item to select.
 * @param {boolean} [prefix=false] Allow a prefix match, if only a single item matches
 * @return {OO.ui.Element|null} Item with equivalent label, `null` if none exists
 */
OO.ui.SelectWidget.prototype.getItemFromLabel = function ( label, prefix ) {
	var i, item, found,
		len = this.items.length,
		filter = this.getItemMatcher( label, true );

	for ( i = 0; i < len; i++ ) {
		item = this.items[ i ];
		if ( item instanceof OO.ui.OptionWidget && item.isSelectable() && filter( item ) ) {
			return item;
		}
	}

	if ( prefix ) {
		found = null;
		filter = this.getItemMatcher( label, false );
		for ( i = 0; i < len; i++ ) {
			item = this.items[ i ];
			if ( item instanceof OO.ui.OptionWidget && item.isSelectable() && filter( item ) ) {
				if ( found ) {
					return null;
				}
				found = item;
			}
		}
		if ( found ) {
			return found;
		}
	}

	return null;
};

/**
 * Programmatically select an option by its label. If the item does not exist,
 * all options will be deselected.
 *
 * @param {string} [label] Label of the item to select.
 * @param {boolean} [prefix=false] Allow a prefix match, if only a single item matches
 * @fires select
 * @chainable
 */
OO.ui.SelectWidget.prototype.selectItemByLabel = function ( label, prefix ) {
	var itemFromLabel = this.getItemFromLabel( label, !!prefix );
	if ( label === undefined || !itemFromLabel ) {
		return this.selectItem();
	}
	return this.selectItem( itemFromLabel );
};

/**
 * Programmatically select an option by its data. If the `data` parameter is omitted,
 * or if the item does not exist, all options will be deselected.
 *
 * @param {Object|string} [data] Value of the item to select, omit to deselect all
 * @fires select
 * @chainable
 */
OO.ui.SelectWidget.prototype.selectItemByData = function ( data ) {
	var itemFromData = this.findItemFromData( data );
	if ( data === undefined || !itemFromData ) {
		return this.selectItem();
	}
	return this.selectItem( itemFromData );
};

/**
 * Programmatically select an option by its reference. If the `item` parameter is omitted,
 * all options will be deselected.
 *
 * @param {OO.ui.OptionWidget} [item] Item to select, omit to deselect all
 * @fires select
 * @chainable
 */
OO.ui.SelectWidget.prototype.selectItem = function ( item ) {
	var i, len, selected,
		changed = false;

	for ( i = 0, len = this.items.length; i < len; i++ ) {
		selected = this.items[ i ] === item;
		if ( this.items[ i ].isSelected() !== selected ) {
			this.items[ i ].setSelected( selected );
			changed = true;
		}
	}
	if ( changed ) {
		if ( item && !item.constructor.static.highlightable ) {
			if ( item ) {
				this.$focusOwner.attr( 'aria-activedescendant', item.getElementId() );
			} else {
				this.$focusOwner.removeAttr( 'aria-activedescendant' );
			}
		}
		this.emit( 'select', item );
	}

	return this;
};

/**
 * Press an item.
 *
 * Press is a state that occurs when a user mouses down on an item, but has not
 * yet let go of the mouse. The item may appear selected, but it will not be selected until the user
 * releases the mouse.
 *
 * @param {OO.ui.OptionWidget} [item] Item to press, omit to depress all
 * @fires press
 * @chainable
 */
OO.ui.SelectWidget.prototype.pressItem = function ( item ) {
	var i, len, pressed,
		changed = false;

	for ( i = 0, len = this.items.length; i < len; i++ ) {
		pressed = this.items[ i ] === item;
		if ( this.items[ i ].isPressed() !== pressed ) {
			this.items[ i ].setPressed( pressed );
			changed = true;
		}
	}
	if ( changed ) {
		this.emit( 'press', item );
	}

	return this;
};

/**
 * Choose an item.
 *
 * Note that ‘choose’ should never be modified programmatically. A user can choose
 * an option with the keyboard or mouse and it becomes selected. To select an item programmatically,
 * use the #selectItem method.
 *
 * This method is identical to #selectItem, but may vary in subclasses that take additional action
 * when users choose an item with the keyboard or mouse.
 *
 * @param {OO.ui.OptionWidget} item Item to choose
 * @fires choose
 * @chainable
 */
OO.ui.SelectWidget.prototype.chooseItem = function ( item ) {
	if ( item ) {
		this.selectItem( item );
		this.emit( 'choose', item );
	}

	return this;
};

/**
 * Find an option by its position relative to the specified item (or to the start of the option array,
 * if item is `null`). The direction in which to search through the option array is specified with a
 * number: -1 for reverse (the default) or 1 for forward. The method will return an option, or
 * `null` if there are no options in the array.
 *
 * @param {OO.ui.OptionWidget|null} item Item to describe the start position, or `null` to start at the beginning of the array.
 * @param {number} direction Direction to move in: -1 to move backward, 1 to move forward
 * @param {Function} [filter] Only consider items for which this function returns
 *  true. Function takes an OO.ui.OptionWidget and returns a boolean.
 * @return {OO.ui.OptionWidget|null} Item at position, `null` if there are no items in the select
 */
OO.ui.SelectWidget.prototype.findRelativeSelectableItem = function ( item, direction, filter ) {
	var currentIndex, nextIndex, i,
		increase = direction > 0 ? 1 : -1,
		len = this.items.length;

	if ( item instanceof OO.ui.OptionWidget ) {
		currentIndex = this.items.indexOf( item );
		nextIndex = ( currentIndex + increase + len ) % len;
	} else {
		// If no item is selected and moving forward, start at the beginning.
		// If moving backward, start at the end.
		nextIndex = direction > 0 ? 0 : len - 1;
	}

	for ( i = 0; i < len; i++ ) {
		item = this.items[ nextIndex ];
		if (
			item instanceof OO.ui.OptionWidget && item.isSelectable() &&
			( !filter || filter( item ) )
		) {
			return item;
		}
		nextIndex = ( nextIndex + increase + len ) % len;
	}
	return null;
};

/**
 * Find the next selectable item or `null` if there are no selectable items.
 * Disabled options and menu-section markers and breaks are not selectable.
 *
 * @return {OO.ui.OptionWidget|null} Item, `null` if there aren't any selectable items
 */
OO.ui.SelectWidget.prototype.findFirstSelectableItem = function () {
	return this.findRelativeSelectableItem( null, 1 );
};

/**
 * Add an array of options to the select. Optionally, an index number can be used to
 * specify an insertion point.
 *
 * @param {OO.ui.OptionWidget[]} items Items to add
 * @param {number} [index] Index to insert items after
 * @fires add
 * @chainable
 */
OO.ui.SelectWidget.prototype.addItems = function ( items, index ) {
	// Mixin method
	OO.ui.mixin.GroupWidget.prototype.addItems.call( this, items, index );

	// Always provide an index, even if it was omitted
	this.emit( 'add', items, index === undefined ? this.items.length - items.length - 1 : index );

	return this;
};

/**
 * Remove the specified array of options from the select. Options will be detached
 * from the DOM, not removed, so they can be reused later. To remove all options from
 * the select, you may wish to use the #clearItems method instead.
 *
 * @param {OO.ui.OptionWidget[]} items Items to remove
 * @fires remove
 * @chainable
 */
OO.ui.SelectWidget.prototype.removeItems = function ( items ) {
	var i, len, item;

	// Deselect items being removed
	for ( i = 0, len = items.length; i < len; i++ ) {
		item = items[ i ];
		if ( item.isSelected() ) {
			this.selectItem( null );
		}
	}

	// Mixin method
	OO.ui.mixin.GroupWidget.prototype.removeItems.call( this, items );

	this.emit( 'remove', items );

	return this;
};

/**
 * Clear all options from the select. Options will be detached from the DOM, not removed,
 * so that they can be reused later. To remove a subset of options from the select, use
 * the #removeItems method.
 *
 * @fires remove
 * @chainable
 */
OO.ui.SelectWidget.prototype.clearItems = function () {
	var items = this.items.slice();

	// Mixin method
	OO.ui.mixin.GroupWidget.prototype.clearItems.call( this );

	// Clear selection
	this.selectItem( null );

	this.emit( 'remove', items );

	return this;
};

/**
 * Set the DOM element which has focus while the user is interacting with this SelectWidget.
 *
 * Currently this is just used to set `aria-activedescendant` on it.
 *
 * @protected
 * @param {jQuery} $focusOwner
 */
OO.ui.SelectWidget.prototype.setFocusOwner = function ( $focusOwner ) {
	this.$focusOwner = $focusOwner;
};

/**
 * DecoratedOptionWidgets are {@link OO.ui.OptionWidget options} that can be configured
 * with an {@link OO.ui.mixin.IconElement icon} and/or {@link OO.ui.mixin.IndicatorElement indicator}.
 * This class is used with OO.ui.SelectWidget to create a selection of mutually exclusive
 * options. For more information about options and selects, please see the
 * [OOUI documentation on MediaWiki][1].
 *
 *     @example
 *     // Decorated options in a select widget
 *     var select = new OO.ui.SelectWidget( {
 *         items: [
 *             new OO.ui.DecoratedOptionWidget( {
 *                 data: 'a',
 *                 label: 'Option with icon',
 *                 icon: 'help'
 *             } ),
 *             new OO.ui.DecoratedOptionWidget( {
 *                 data: 'b',
 *                 label: 'Option with indicator',
 *                 indicator: 'next'
 *             } )
 *         ]
 *     } );
 *     $( 'body' ).append( select.$element );
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Widgets/Selects_and_Options
 *
 * @class
 * @extends OO.ui.OptionWidget
 * @mixins OO.ui.mixin.IconElement
 * @mixins OO.ui.mixin.IndicatorElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 */
OO.ui.DecoratedOptionWidget = function OoUiDecoratedOptionWidget( config ) {
	// Parent constructor
	OO.ui.DecoratedOptionWidget.parent.call( this, config );

	// Mixin constructors
	OO.ui.mixin.IconElement.call( this, config );
	OO.ui.mixin.IndicatorElement.call( this, config );

	// Initialization
	this.$element
		.addClass( 'oo-ui-decoratedOptionWidget' )
		.prepend( this.$icon )
		.append( this.$indicator );
};

/* Setup */

OO.inheritClass( OO.ui.DecoratedOptionWidget, OO.ui.OptionWidget );
OO.mixinClass( OO.ui.DecoratedOptionWidget, OO.ui.mixin.IconElement );
OO.mixinClass( OO.ui.DecoratedOptionWidget, OO.ui.mixin.IndicatorElement );

/**
 * MenuOptionWidget is an option widget that looks like a menu item. The class is used with
 * OO.ui.MenuSelectWidget to create a menu of mutually exclusive options. Please see
 * the [OOUI documentation on MediaWiki] [1] for more information.
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Widgets/Selects_and_Options#Menu_selects_and_options
 *
 * @class
 * @extends OO.ui.DecoratedOptionWidget
 *
 * @constructor
 * @param {Object} [config] Configuration options
 */
OO.ui.MenuOptionWidget = function OoUiMenuOptionWidget( config ) {
	// Parent constructor
	OO.ui.MenuOptionWidget.parent.call( this, config );

	// Properties
	this.checkIcon = new OO.ui.IconWidget( {
		icon: 'check',
		classes: [ 'oo-ui-menuOptionWidget-checkIcon' ]
	} );

	// Initialization
	this.$element
		.prepend( this.checkIcon.$element )
		.addClass( 'oo-ui-menuOptionWidget' );
};

/* Setup */

OO.inheritClass( OO.ui.MenuOptionWidget, OO.ui.DecoratedOptionWidget );

/* Static Properties */

/**
 * @static
 * @inheritdoc
 */
OO.ui.MenuOptionWidget.static.scrollIntoViewOnSelect = true;

/**
 * MenuSectionOptionWidgets are used inside {@link OO.ui.MenuSelectWidget menu select widgets} to group one or more related
 * {@link OO.ui.MenuOptionWidget menu options}. MenuSectionOptionWidgets cannot be highlighted or selected.
 *
 *     @example
 *     var myDropdown = new OO.ui.DropdownWidget( {
 *         menu: {
 *             items: [
 *                 new OO.ui.MenuSectionOptionWidget( {
 *                     label: 'Dogs'
 *                 } ),
 *                 new OO.ui.MenuOptionWidget( {
 *                     data: 'corgi',
 *                     label: 'Welsh Corgi'
 *                 } ),
 *                 new OO.ui.MenuOptionWidget( {
 *                     data: 'poodle',
 *                     label: 'Standard Poodle'
 *                 } ),
 *                 new OO.ui.MenuSectionOptionWidget( {
 *                     label: 'Cats'
 *                 } ),
 *                 new OO.ui.MenuOptionWidget( {
 *                     data: 'lion',
 *                     label: 'Lion'
 *                 } )
 *             ]
 *         }
 *     } );
 *     $( 'body' ).append( myDropdown.$element );
 *
 * @class
 * @extends OO.ui.DecoratedOptionWidget
 *
 * @constructor
 * @param {Object} [config] Configuration options
 */
OO.ui.MenuSectionOptionWidget = function OoUiMenuSectionOptionWidget( config ) {
	// Parent constructor
	OO.ui.MenuSectionOptionWidget.parent.call( this, config );

	// Initialization
	this.$element.addClass( 'oo-ui-menuSectionOptionWidget' )
		.removeAttr( 'role aria-selected' );
};

/* Setup */

OO.inheritClass( OO.ui.MenuSectionOptionWidget, OO.ui.DecoratedOptionWidget );

/* Static Properties */

/**
 * @static
 * @inheritdoc
 */
OO.ui.MenuSectionOptionWidget.static.selectable = false;

/**
 * @static
 * @inheritdoc
 */
OO.ui.MenuSectionOptionWidget.static.highlightable = false;

/**
 * MenuSelectWidget is a {@link OO.ui.SelectWidget select widget} that contains options and
 * is used together with OO.ui.MenuOptionWidget. It is designed be used as part of another widget.
 * See {@link OO.ui.DropdownWidget DropdownWidget}, {@link OO.ui.ComboBoxInputWidget ComboBoxInputWidget},
 * and {@link OO.ui.mixin.LookupElement LookupElement} for examples of widgets that contain menus.
 * MenuSelectWidgets themselves are not instantiated directly, rather subclassed
 * and customized to be opened, closed, and displayed as needed.
 *
 * By default, menus are clipped to the visible viewport and are not visible when a user presses the
 * mouse outside the menu.
 *
 * Menus also have support for keyboard interaction:
 *
 * - Enter/Return key: choose and select a menu option
 * - Up-arrow key: highlight the previous menu option
 * - Down-arrow key: highlight the next menu option
 * - Esc key: hide the menu
 *
 * Unlike most widgets, MenuSelectWidget is initially hidden and must be shown by calling #toggle.
 *
 * Please see the [OOUI documentation on MediaWiki][1] for more information.
 * [1]: https://www.mediawiki.org/wiki/OOUI/Widgets/Selects_and_Options
 *
 * @class
 * @extends OO.ui.SelectWidget
 * @mixins OO.ui.mixin.ClippableElement
 * @mixins OO.ui.mixin.FloatableElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {OO.ui.TextInputWidget} [input] Text input used to implement option highlighting for menu items that match
 *  the text the user types. This config is used by {@link OO.ui.ComboBoxInputWidget ComboBoxInputWidget}
 *  and {@link OO.ui.mixin.LookupElement LookupElement}
 * @cfg {jQuery} [$input] Text input used to implement option highlighting for menu items that match
 *  the text the user types. This config is used by {@link OO.ui.CapsuleMultiselectWidget CapsuleMultiselectWidget}
 * @cfg {OO.ui.Widget} [widget] Widget associated with the menu's active state. If the user clicks the mouse
 *  anywhere on the page outside of this widget, the menu is hidden. For example, if there is a button
 *  that toggles the menu's visibility on click, the menu will be hidden then re-shown when the user clicks
 *  that button, unless the button (or its parent widget) is passed in here.
 * @cfg {boolean} [autoHide=true] Hide the menu when the mouse is pressed outside the menu.
 * @cfg {jQuery} [$autoCloseIgnore] If these elements are clicked, don't auto-hide the menu.
 * @cfg {boolean} [hideOnChoose=true] Hide the menu when the user chooses an option.
 * @cfg {boolean} [filterFromInput=false] Filter the displayed options from the input
 * @cfg {boolean} [highlightOnFilter] Highlight the first result when filtering
 * @cfg {number} [width] Width of the menu
 */
OO.ui.MenuSelectWidget = function OoUiMenuSelectWidget( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.MenuSelectWidget.parent.call( this, config );

	// Mixin constructors
	OO.ui.mixin.ClippableElement.call( this, $.extend( {}, config, { $clippable: this.$group } ) );
	OO.ui.mixin.FloatableElement.call( this, config );

	// Properties
	this.autoHide = config.autoHide === undefined || !!config.autoHide;
	this.hideOnChoose = config.hideOnChoose === undefined || !!config.hideOnChoose;
	this.filterFromInput = !!config.filterFromInput;
	this.$input = config.$input ? config.$input : config.input ? config.input.$input : null;
	this.$widget = config.widget ? config.widget.$element : null;
	this.$autoCloseIgnore = config.$autoCloseIgnore || $( [] );
	this.onDocumentMouseDownHandler = this.onDocumentMouseDown.bind( this );
	this.onInputEditHandler = OO.ui.debounce( this.updateItemVisibility.bind( this ), 100 );
	this.highlightOnFilter = !!config.highlightOnFilter;
	this.width = config.width;

	// Initialization
	this.$element.addClass( 'oo-ui-menuSelectWidget' );
	if ( config.widget ) {
		this.setFocusOwner( config.widget.$tabIndexed );
	}

	// Initially hidden - using #toggle may cause errors if subclasses override toggle with methods
	// that reference properties not initialized at that time of parent class construction
	// TODO: Find a better way to handle post-constructor setup
	this.visible = false;
	this.$element.addClass( 'oo-ui-element-hidden' );
};

/* Setup */

OO.inheritClass( OO.ui.MenuSelectWidget, OO.ui.SelectWidget );
OO.mixinClass( OO.ui.MenuSelectWidget, OO.ui.mixin.ClippableElement );
OO.mixinClass( OO.ui.MenuSelectWidget, OO.ui.mixin.FloatableElement );

/* Events */

/**
 * @event ready
 *
 * The menu is ready: it is visible and has been positioned and clipped.
 */

/* Methods */

/**
 * Handles document mouse down events.
 *
 * @protected
 * @param {MouseEvent} e Mouse down event
 */
OO.ui.MenuSelectWidget.prototype.onDocumentMouseDown = function ( e ) {
	if (
		this.isVisible() &&
		!OO.ui.contains(
			this.$element.add( this.$widget ).add( this.$autoCloseIgnore ).get(),
			e.target,
			true
		)
	) {
		this.toggle( false );
	}
};

/**
 * @inheritdoc
 */
OO.ui.MenuSelectWidget.prototype.onKeyDown = function ( e ) {
	var currentItem = this.findHighlightedItem() || this.findSelectedItem();

	if ( !this.isDisabled() && this.isVisible() ) {
		switch ( e.keyCode ) {
			case OO.ui.Keys.LEFT:
			case OO.ui.Keys.RIGHT:
				// Do nothing if a text field is associated, arrow keys will be handled natively
				if ( !this.$input ) {
					OO.ui.MenuSelectWidget.parent.prototype.onKeyDown.call( this, e );
				}
				break;
			case OO.ui.Keys.ESCAPE:
			case OO.ui.Keys.TAB:
				if ( currentItem ) {
					currentItem.setHighlighted( false );
				}
				this.toggle( false );
				// Don't prevent tabbing away, prevent defocusing
				if ( e.keyCode === OO.ui.Keys.ESCAPE ) {
					e.preventDefault();
					e.stopPropagation();
				}
				break;
			default:
				OO.ui.MenuSelectWidget.parent.prototype.onKeyDown.call( this, e );
				return;
		}
	}
};

/**
 * Update menu item visibility and clipping after input changes (if filterFromInput is enabled)
 * or after items were added/removed (always).
 *
 * @protected
 */
OO.ui.MenuSelectWidget.prototype.updateItemVisibility = function () {
	var i, item, visible, section, sectionEmpty, filter, exactFilter,
		firstItemFound = false,
		anyVisible = false,
		len = this.items.length,
		showAll = !this.isVisible(),
		exactMatch = false;

	if ( this.$input && this.filterFromInput ) {
		filter = showAll ? null : this.getItemMatcher( this.$input.val() );
		exactFilter = this.getItemMatcher( this.$input.val(), true );

		// Hide non-matching options, and also hide section headers if all options
		// in their section are hidden.
		for ( i = 0; i < len; i++ ) {
			item = this.items[ i ];
			if ( item instanceof OO.ui.MenuSectionOptionWidget ) {
				if ( section ) {
					// If the previous section was empty, hide its header
					section.toggle( showAll || !sectionEmpty );
				}
				section = item;
				sectionEmpty = true;
			} else if ( item instanceof OO.ui.OptionWidget ) {
				visible = showAll || filter( item );
				exactMatch = exactMatch || exactFilter( item );
				anyVisible = anyVisible || visible;
				sectionEmpty = sectionEmpty && !visible;
				item.toggle( visible );
				if ( this.highlightOnFilter && visible && !firstItemFound ) {
					// Highlight the first item in the list
					this.highlightItem( item );
					firstItemFound = true;
				}
			}
		}
		// Process the final section
		if ( section ) {
			section.toggle( showAll || !sectionEmpty );
		}

		if ( anyVisible && this.items.length && !exactMatch ) {
			this.scrollItemIntoView( this.items[ 0 ] );
		}

		this.$element.toggleClass( 'oo-ui-menuSelectWidget-invisible', !anyVisible );
	}

	// Reevaluate clipping
	this.clip();
};

/**
 * @inheritdoc
 */
OO.ui.MenuSelectWidget.prototype.bindKeyDownListener = function () {
	if ( this.$input ) {
		this.$input.on( 'keydown', this.onKeyDownHandler );
	} else {
		OO.ui.MenuSelectWidget.parent.prototype.bindKeyDownListener.call( this );
	}
};

/**
 * @inheritdoc
 */
OO.ui.MenuSelectWidget.prototype.unbindKeyDownListener = function () {
	if ( this.$input ) {
		this.$input.off( 'keydown', this.onKeyDownHandler );
	} else {
		OO.ui.MenuSelectWidget.parent.prototype.unbindKeyDownListener.call( this );
	}
};

/**
 * @inheritdoc
 */
OO.ui.MenuSelectWidget.prototype.bindKeyPressListener = function () {
	if ( this.$input ) {
		if ( this.filterFromInput ) {
			this.$input.on( 'keydown mouseup cut paste change input select', this.onInputEditHandler );
			this.updateItemVisibility();
		}
	} else {
		OO.ui.MenuSelectWidget.parent.prototype.bindKeyPressListener.call( this );
	}
};

/**
 * @inheritdoc
 */
OO.ui.MenuSelectWidget.prototype.unbindKeyPressListener = function () {
	if ( this.$input ) {
		if ( this.filterFromInput ) {
			this.$input.off( 'keydown mouseup cut paste change input select', this.onInputEditHandler );
			this.updateItemVisibility();
		}
	} else {
		OO.ui.MenuSelectWidget.parent.prototype.unbindKeyPressListener.call( this );
	}
};

/**
 * Choose an item.
 *
 * When a user chooses an item, the menu is closed, unless the hideOnChoose config option is set to false.
 *
 * Note that ‘choose’ should never be modified programmatically. A user can choose an option with the keyboard
 * or mouse and it becomes selected. To select an item programmatically, use the #selectItem method.
 *
 * @param {OO.ui.OptionWidget} item Item to choose
 * @chainable
 */
OO.ui.MenuSelectWidget.prototype.chooseItem = function ( item ) {
	OO.ui.MenuSelectWidget.parent.prototype.chooseItem.call( this, item );
	if ( this.hideOnChoose ) {
		this.toggle( false );
	}
	return this;
};

/**
 * @inheritdoc
 */
OO.ui.MenuSelectWidget.prototype.addItems = function ( items, index ) {
	// Parent method
	OO.ui.MenuSelectWidget.parent.prototype.addItems.call( this, items, index );

	this.updateItemVisibility();

	return this;
};

/**
 * @inheritdoc
 */
OO.ui.MenuSelectWidget.prototype.removeItems = function ( items ) {
	// Parent method
	OO.ui.MenuSelectWidget.parent.prototype.removeItems.call( this, items );

	this.updateItemVisibility();

	return this;
};

/**
 * @inheritdoc
 */
OO.ui.MenuSelectWidget.prototype.clearItems = function () {
	// Parent method
	OO.ui.MenuSelectWidget.parent.prototype.clearItems.call( this );

	this.updateItemVisibility();

	return this;
};

/**
 * Toggle visibility of the menu. The menu is initially hidden and must be shown by calling
 * `.toggle( true )` after its #$element is attached to the DOM.
 *
 * Do not show the menu while it is not attached to the DOM. The calculations required to display
 * it in the right place and with the right dimensions only work correctly while it is attached.
 * Side-effects may include broken interface and exceptions being thrown. This wasn't always
 * strictly enforced, so currently it only generates a warning in the browser console.
 *
 * @fires ready
 * @inheritdoc
 */
OO.ui.MenuSelectWidget.prototype.toggle = function ( visible ) {
	var change, belowHeight, aboveHeight;

	visible = ( visible === undefined ? !this.visible : !!visible ) && !!this.items.length;
	change = visible !== this.isVisible();

	if ( visible && !this.warnedUnattached && !this.isElementAttached() ) {
		OO.ui.warnDeprecation( 'MenuSelectWidget#toggle: Before calling this method, the menu must be attached to the DOM.' );
		this.warnedUnattached = true;
	}

	if ( change ) {
		if ( visible && ( this.width || this.$floatableContainer ) ) {
			this.setIdealSize( this.width || this.$floatableContainer.width() );
		}
		if ( visible ) {
			// Reset position before showing the popup again. It's possible we no longer need to flip
			// (e.g. if the user scrolled).
			this.setVerticalPosition( 'below' );
		}
	}

	// Parent method
	OO.ui.MenuSelectWidget.parent.prototype.toggle.call( this, visible );

	if ( change ) {
		if ( visible ) {
			this.bindKeyDownListener();
			this.bindKeyPressListener();

			this.togglePositioning( !!this.$floatableContainer );
			this.toggleClipping( true );

			if ( this.isClippedVertically() || this.isFloatableOutOfView() ) {
				// If opening the menu downwards causes it to be clipped, flip it to open upwards instead
				belowHeight = this.$element.height();
				this.setVerticalPosition( 'above' );
				if ( this.isClippedVertically() || this.isFloatableOutOfView() ) {
					// If opening upwards also causes it to be clipped, flip it to open in whichever direction
					// we have more space
					aboveHeight = this.$element.height();
					if ( aboveHeight < belowHeight ) {
						this.setVerticalPosition( 'below' );
					}
				}
			}
			// Note that we do not flip the menu's opening direction if the clipping changes
			// later (e.g. after the user scrolls), that seems like it would be annoying

			this.$focusOwner.attr( 'aria-expanded', 'true' );

			if ( this.findSelectedItem() ) {
				this.$focusOwner.attr( 'aria-activedescendant', this.findSelectedItem().getElementId() );
				this.findSelectedItem().scrollElementIntoView( { duration: 0 } );
			}

			// Auto-hide
			if ( this.autoHide ) {
				this.getElementDocument().addEventListener( 'mousedown', this.onDocumentMouseDownHandler, true );
			}

			this.emit( 'ready' );
		} else {
			this.$focusOwner.removeAttr( 'aria-activedescendant' );
			this.unbindKeyDownListener();
			this.unbindKeyPressListener();
			this.$focusOwner.attr( 'aria-expanded', 'false' );
			this.getElementDocument().removeEventListener( 'mousedown', this.onDocumentMouseDownHandler, true );
			this.togglePositioning( false );
			this.toggleClipping( false );
		}
	}

	return this;
};

/**
 * DropdownWidgets are not menus themselves, rather they contain a menu of options created with
 * OO.ui.MenuOptionWidget. The DropdownWidget takes care of opening and displaying the menu so that
 * users can interact with it.
 *
 * If you want to use this within an HTML form, such as a OO.ui.FormLayout, use
 * OO.ui.DropdownInputWidget instead.
 *
 *     @example
 *     // Example: A DropdownWidget with a menu that contains three options
 *     var dropDown = new OO.ui.DropdownWidget( {
 *         label: 'Dropdown menu: Select a menu option',
 *         menu: {
 *             items: [
 *                 new OO.ui.MenuOptionWidget( {
 *                     data: 'a',
 *                     label: 'First'
 *                 } ),
 *                 new OO.ui.MenuOptionWidget( {
 *                     data: 'b',
 *                     label: 'Second'
 *                 } ),
 *                 new OO.ui.MenuOptionWidget( {
 *                     data: 'c',
 *                     label: 'Third'
 *                 } )
 *             ]
 *         }
 *     } );
 *
 *     $( 'body' ).append( dropDown.$element );
 *
 *     dropDown.getMenu().selectItemByData( 'b' );
 *
 *     dropDown.getMenu().findSelectedItem().getData(); // returns 'b'
 *
 * For more information, please see the [OOUI documentation on MediaWiki] [1].
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Widgets/Selects_and_Options#Menu_selects_and_options
 *
 * @class
 * @extends OO.ui.Widget
 * @mixins OO.ui.mixin.IconElement
 * @mixins OO.ui.mixin.IndicatorElement
 * @mixins OO.ui.mixin.LabelElement
 * @mixins OO.ui.mixin.TitledElement
 * @mixins OO.ui.mixin.TabIndexedElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {Object} [menu] Configuration options to pass to {@link OO.ui.MenuSelectWidget menu select widget}
 * @cfg {jQuery} [$overlay] Render the menu into a separate layer. This configuration is useful in cases where
 *  the expanded menu is larger than its containing `<div>`. The specified overlay layer is usually on top of the
 *  containing `<div>` and has a larger area. By default, the menu uses relative positioning.
 *  See <https://www.mediawiki.org/wiki/OOUI/Concepts#Overlays>.
 */
OO.ui.DropdownWidget = function OoUiDropdownWidget( config ) {
	// Configuration initialization
	config = $.extend( { indicator: 'down' }, config );

	// Parent constructor
	OO.ui.DropdownWidget.parent.call( this, config );

	// Properties (must be set before TabIndexedElement constructor call)
	this.$handle = $( '<span>' );
	this.$overlay = ( config.$overlay === true ? OO.ui.getDefaultOverlay() : config.$overlay ) || this.$element;

	// Mixin constructors
	OO.ui.mixin.IconElement.call( this, config );
	OO.ui.mixin.IndicatorElement.call( this, config );
	OO.ui.mixin.LabelElement.call( this, config );
	OO.ui.mixin.TitledElement.call( this, $.extend( {}, config, { $titled: this.$label } ) );
	OO.ui.mixin.TabIndexedElement.call( this, $.extend( {}, config, { $tabIndexed: this.$handle } ) );

	// Properties
	this.menu = new OO.ui.MenuSelectWidget( $.extend( {
		widget: this,
		$floatableContainer: this.$element
	}, config.menu ) );

	// Events
	this.$handle.on( {
		click: this.onClick.bind( this ),
		keydown: this.onKeyDown.bind( this ),
		// Hack? Handle type-to-search when menu is not expanded and not handling its own events
		keypress: this.menu.onKeyPressHandler,
		blur: this.menu.clearKeyPressBuffer.bind( this.menu )
	} );
	this.menu.connect( this, {
		select: 'onMenuSelect',
		toggle: 'onMenuToggle'
	} );

	// Initialization
	this.$handle
		.addClass( 'oo-ui-dropdownWidget-handle' )
		.attr( {
			role: 'combobox',
			'aria-owns': this.menu.getElementId(),
			'aria-autocomplete': 'list'
		} )
		.append( this.$icon, this.$label, this.$indicator );
	this.$element
		.addClass( 'oo-ui-dropdownWidget' )
		.append( this.$handle );
	this.$overlay.append( this.menu.$element );
};

/* Setup */

OO.inheritClass( OO.ui.DropdownWidget, OO.ui.Widget );
OO.mixinClass( OO.ui.DropdownWidget, OO.ui.mixin.IconElement );
OO.mixinClass( OO.ui.DropdownWidget, OO.ui.mixin.IndicatorElement );
OO.mixinClass( OO.ui.DropdownWidget, OO.ui.mixin.LabelElement );
OO.mixinClass( OO.ui.DropdownWidget, OO.ui.mixin.TitledElement );
OO.mixinClass( OO.ui.DropdownWidget, OO.ui.mixin.TabIndexedElement );

/* Methods */

/**
 * Get the menu.
 *
 * @return {OO.ui.MenuSelectWidget} Menu of widget
 */
OO.ui.DropdownWidget.prototype.getMenu = function () {
	return this.menu;
};

/**
 * Handles menu select events.
 *
 * @private
 * @param {OO.ui.MenuOptionWidget} item Selected menu item
 */
OO.ui.DropdownWidget.prototype.onMenuSelect = function ( item ) {
	var selectedLabel;

	if ( !item ) {
		this.setLabel( null );
		return;
	}

	selectedLabel = item.getLabel();

	// If the label is a DOM element, clone it, because setLabel will append() it
	if ( selectedLabel instanceof jQuery ) {
		selectedLabel = selectedLabel.clone();
	}

	this.setLabel( selectedLabel );
};

/**
 * Handle menu toggle events.
 *
 * @private
 * @param {boolean} isVisible Open state of the menu
 */
OO.ui.DropdownWidget.prototype.onMenuToggle = function ( isVisible ) {
	this.$element.toggleClass( 'oo-ui-dropdownWidget-open', isVisible );
	this.$handle.attr(
		'aria-expanded',
		this.$element.hasClass( 'oo-ui-dropdownWidget-open' ).toString()
	);
};

/**
 * Handle mouse click events.
 *
 * @private
 * @param {jQuery.Event} e Mouse click event
 */
OO.ui.DropdownWidget.prototype.onClick = function ( e ) {
	if ( !this.isDisabled() && e.which === OO.ui.MouseButtons.LEFT ) {
		this.menu.toggle();
	}
	return false;
};

/**
 * Handle key down events.
 *
 * @private
 * @param {jQuery.Event} e Key down event
 */
OO.ui.DropdownWidget.prototype.onKeyDown = function ( e ) {
	if (
		!this.isDisabled() &&
		(
			e.which === OO.ui.Keys.ENTER ||
			(
				e.which === OO.ui.Keys.SPACE &&
				// Avoid conflicts with type-to-search, see SelectWidget#onKeyPress.
				// Space only closes the menu is the user is not typing to search.
				this.menu.keyPressBuffer === ''
			) ||
			(
				!this.menu.isVisible() &&
				(
					e.which === OO.ui.Keys.UP ||
					e.which === OO.ui.Keys.DOWN
				)
			)
		)
	) {
		this.menu.toggle();
		return false;
	}
};

/**
 * RadioOptionWidget is an option widget that looks like a radio button.
 * The class is used with OO.ui.RadioSelectWidget to create a selection of radio options.
 * Please see the [OOUI documentation on MediaWiki] [1] for more information.
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Widgets/Selects_and_Options#Button_selects_and_option
 *
 * @class
 * @extends OO.ui.OptionWidget
 *
 * @constructor
 * @param {Object} [config] Configuration options
 */
OO.ui.RadioOptionWidget = function OoUiRadioOptionWidget( config ) {
	// Configuration initialization
	config = config || {};

	// Properties (must be done before parent constructor which calls #setDisabled)
	this.radio = new OO.ui.RadioInputWidget( { value: config.data, tabIndex: -1 } );

	// Parent constructor
	OO.ui.RadioOptionWidget.parent.call( this, config );

	// Initialization
	// Remove implicit role, we're handling it ourselves
	this.radio.$input.attr( 'role', 'presentation' );
	this.$element
		.addClass( 'oo-ui-radioOptionWidget' )
		.attr( 'role', 'radio' )
		.attr( 'aria-checked', 'false' )
		.removeAttr( 'aria-selected' )
		.prepend( this.radio.$element );
};

/* Setup */

OO.inheritClass( OO.ui.RadioOptionWidget, OO.ui.OptionWidget );

/* Static Properties */

/**
 * @static
 * @inheritdoc
 */
OO.ui.RadioOptionWidget.static.highlightable = false;

/**
 * @static
 * @inheritdoc
 */
OO.ui.RadioOptionWidget.static.scrollIntoViewOnSelect = true;

/**
 * @static
 * @inheritdoc
 */
OO.ui.RadioOptionWidget.static.pressable = false;

/**
 * @static
 * @inheritdoc
 */
OO.ui.RadioOptionWidget.static.tagName = 'label';

/* Methods */

/**
 * @inheritdoc
 */
OO.ui.RadioOptionWidget.prototype.setSelected = function ( state ) {
	OO.ui.RadioOptionWidget.parent.prototype.setSelected.call( this, state );

	this.radio.setSelected( state );
	this.$element
		.attr( 'aria-checked', state.toString() )
		.removeAttr( 'aria-selected' );

	return this;
};

/**
 * @inheritdoc
 */
OO.ui.RadioOptionWidget.prototype.setDisabled = function ( disabled ) {
	OO.ui.RadioOptionWidget.parent.prototype.setDisabled.call( this, disabled );

	this.radio.setDisabled( this.isDisabled() );

	return this;
};

/**
 * RadioSelectWidget is a {@link OO.ui.SelectWidget select widget} that contains radio
 * options and is used together with OO.ui.RadioOptionWidget. The RadioSelectWidget provides
 * an interface for adding, removing and selecting options.
 * Please see the [OOUI documentation on MediaWiki][1] for more information.
 *
 * If you want to use this within an HTML form, such as a OO.ui.FormLayout, use
 * OO.ui.RadioSelectInputWidget instead.
 *
 *     @example
 *     // A RadioSelectWidget with RadioOptions.
 *     var option1 = new OO.ui.RadioOptionWidget( {
 *         data: 'a',
 *         label: 'Selected radio option'
 *     } );
 *
 *     var option2 = new OO.ui.RadioOptionWidget( {
 *         data: 'b',
 *         label: 'Unselected radio option'
 *     } );
 *
 *     var radioSelect=new OO.ui.RadioSelectWidget( {
 *         items: [ option1, option2 ]
 *      } );
 *
 *     // Select 'option 1' using the RadioSelectWidget's selectItem() method.
 *     radioSelect.selectItem( option1 );
 *
 *     $( 'body' ).append( radioSelect.$element );
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Widgets/Selects_and_Options

 *
 * @class
 * @extends OO.ui.SelectWidget
 * @mixins OO.ui.mixin.TabIndexedElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 */
OO.ui.RadioSelectWidget = function OoUiRadioSelectWidget( config ) {
	// Parent constructor
	OO.ui.RadioSelectWidget.parent.call( this, config );

	// Mixin constructors
	OO.ui.mixin.TabIndexedElement.call( this, config );

	// Events
	this.$element.on( {
		focus: this.bindKeyDownListener.bind( this ),
		blur: this.unbindKeyDownListener.bind( this )
	} );

	// Initialization
	this.$element
		.addClass( 'oo-ui-radioSelectWidget' )
		.attr( 'role', 'radiogroup' );
};

/* Setup */

OO.inheritClass( OO.ui.RadioSelectWidget, OO.ui.SelectWidget );
OO.mixinClass( OO.ui.RadioSelectWidget, OO.ui.mixin.TabIndexedElement );

/**
 * MultioptionWidgets are special elements that can be selected and configured with data. The
 * data is often unique for each option, but it does not have to be. MultioptionWidgets are used
 * with OO.ui.SelectWidget to create a selection of mutually exclusive options. For more information
 * and examples, please see the [OOUI documentation on MediaWiki][1].
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Widgets/Selects_and_Multioptions
 *
 * @class
 * @extends OO.ui.Widget
 * @mixins OO.ui.mixin.ItemWidget
 * @mixins OO.ui.mixin.LabelElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {boolean} [selected=false] Whether the option is initially selected
 */
OO.ui.MultioptionWidget = function OoUiMultioptionWidget( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.MultioptionWidget.parent.call( this, config );

	// Mixin constructors
	OO.ui.mixin.ItemWidget.call( this );
	OO.ui.mixin.LabelElement.call( this, config );

	// Properties
	this.selected = null;

	// Initialization
	this.$element
		.addClass( 'oo-ui-multioptionWidget' )
		.append( this.$label );
	this.setSelected( config.selected );
};

/* Setup */

OO.inheritClass( OO.ui.MultioptionWidget, OO.ui.Widget );
OO.mixinClass( OO.ui.MultioptionWidget, OO.ui.mixin.ItemWidget );
OO.mixinClass( OO.ui.MultioptionWidget, OO.ui.mixin.LabelElement );

/* Events */

/**
 * @event change
 *
 * A change event is emitted when the selected state of the option changes.
 *
 * @param {boolean} selected Whether the option is now selected
 */

/* Methods */

/**
 * Check if the option is selected.
 *
 * @return {boolean} Item is selected
 */
OO.ui.MultioptionWidget.prototype.isSelected = function () {
	return this.selected;
};

/**
 * Set the option’s selected state. In general, all modifications to the selection
 * should be handled by the SelectWidget’s {@link OO.ui.SelectWidget#selectItem selectItem( [item] )}
 * method instead of this method.
 *
 * @param {boolean} [state=false] Select option
 * @chainable
 */
OO.ui.MultioptionWidget.prototype.setSelected = function ( state ) {
	state = !!state;
	if ( this.selected !== state ) {
		this.selected = state;
		this.emit( 'change', state );
		this.$element.toggleClass( 'oo-ui-multioptionWidget-selected', state );
	}
	return this;
};

/**
 * MultiselectWidget allows selecting multiple options from a list.
 *
 * For more information about menus and options, please see the [OOUI documentation on MediaWiki][1].
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Widgets/Selects_and_Options#Menu_selects_and_options
 *
 * @class
 * @abstract
 * @extends OO.ui.Widget
 * @mixins OO.ui.mixin.GroupWidget
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {OO.ui.MultioptionWidget[]} [items] An array of options to add to the multiselect.
 */
OO.ui.MultiselectWidget = function OoUiMultiselectWidget( config ) {
	// Parent constructor
	OO.ui.MultiselectWidget.parent.call( this, config );

	// Configuration initialization
	config = config || {};

	// Mixin constructors
	OO.ui.mixin.GroupWidget.call( this, config );

	// Events
	this.aggregate( { change: 'select' } );
	// This is mostly for compatibility with CapsuleMultiselectWidget... normally, 'change' is emitted
	// by GroupElement only when items are added/removed
	this.connect( this, { select: [ 'emit', 'change' ] } );

	// Initialization
	if ( config.items ) {
		this.addItems( config.items );
	}
	this.$group.addClass( 'oo-ui-multiselectWidget-group' );
	this.$element.addClass( 'oo-ui-multiselectWidget' )
		.append( this.$group );
};

/* Setup */

OO.inheritClass( OO.ui.MultiselectWidget, OO.ui.Widget );
OO.mixinClass( OO.ui.MultiselectWidget, OO.ui.mixin.GroupWidget );

/* Events */

/**
 * @event change
 *
 * A change event is emitted when the set of items changes, or an item is selected or deselected.
 */

/**
 * @event select
 *
 * A select event is emitted when an item is selected or deselected.
 */

/* Methods */

/**
 * Find options that are selected.
 *
 * @return {OO.ui.MultioptionWidget[]} Selected options
 */
OO.ui.MultiselectWidget.prototype.findSelectedItems = function () {
	return this.items.filter( function ( item ) {
		return item.isSelected();
	} );
};

/**
 * Get options that are selected.
 *
 * @deprecated Since v0.25.0; use {@link #findSelectedItems} instead.
 * @return {OO.ui.MultioptionWidget[]} Selected options
 */
OO.ui.MultiselectWidget.prototype.getSelectedItems = function () {
	OO.ui.warnDeprecation( 'MultiselectWidget#getSelectedItems: Deprecated function. Use findSelectedItems instead. See T76630.' );
	return this.findSelectedItems();
};

/**
 * Find the data of options that are selected.
 *
 * @return {Object[]|string[]} Values of selected options
 */
OO.ui.MultiselectWidget.prototype.findSelectedItemsData = function () {
	return this.findSelectedItems().map( function ( item ) {
		return item.data;
	} );
};

/**
 * Get the data of options that are selected.
 *
 * @deprecated Since v0.25.0; use {@link #findSelectedItemsData} instead.
 * @return {Object[]|string[]} Values of selected options
 */
OO.ui.MultiselectWidget.prototype.getSelectedItemsData = function () {
	OO.ui.warnDeprecation( 'MultiselectWidget#getSelectedItemsData: Deprecated function. Use findSelectedItemsData instead. See T76630.' );
	return this.findSelectedItemsData();
};

/**
 * Select options by reference. Options not mentioned in the `items` array will be deselected.
 *
 * @param {OO.ui.MultioptionWidget[]} items Items to select
 * @chainable
 */
OO.ui.MultiselectWidget.prototype.selectItems = function ( items ) {
	this.items.forEach( function ( item ) {
		var selected = items.indexOf( item ) !== -1;
		item.setSelected( selected );
	} );
	return this;
};

/**
 * Select items by their data. Options not mentioned in the `datas` array will be deselected.
 *
 * @param {Object[]|string[]} datas Values of items to select
 * @chainable
 */
OO.ui.MultiselectWidget.prototype.selectItemsByData = function ( datas ) {
	var items,
		widget = this;
	items = datas.map( function ( data ) {
		return widget.findItemFromData( data );
	} );
	this.selectItems( items );
	return this;
};

/**
 * CheckboxMultioptionWidget is an option widget that looks like a checkbox.
 * The class is used with OO.ui.CheckboxMultiselectWidget to create a selection of checkbox options.
 * Please see the [OOUI documentation on MediaWiki] [1] for more information.
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Widgets/Selects_and_Options#Button_selects_and_option
 *
 * @class
 * @extends OO.ui.MultioptionWidget
 *
 * @constructor
 * @param {Object} [config] Configuration options
 */
OO.ui.CheckboxMultioptionWidget = function OoUiCheckboxMultioptionWidget( config ) {
	// Configuration initialization
	config = config || {};

	// Properties (must be done before parent constructor which calls #setDisabled)
	this.checkbox = new OO.ui.CheckboxInputWidget();

	// Parent constructor
	OO.ui.CheckboxMultioptionWidget.parent.call( this, config );

	// Events
	this.checkbox.on( 'change', this.onCheckboxChange.bind( this ) );
	this.$element.on( 'keydown', this.onKeyDown.bind( this ) );

	// Initialization
	this.$element
		.addClass( 'oo-ui-checkboxMultioptionWidget' )
		.prepend( this.checkbox.$element );
};

/* Setup */

OO.inheritClass( OO.ui.CheckboxMultioptionWidget, OO.ui.MultioptionWidget );

/* Static Properties */

/**
 * @static
 * @inheritdoc
 */
OO.ui.CheckboxMultioptionWidget.static.tagName = 'label';

/* Methods */

/**
 * Handle checkbox selected state change.
 *
 * @private
 */
OO.ui.CheckboxMultioptionWidget.prototype.onCheckboxChange = function () {
	this.setSelected( this.checkbox.isSelected() );
};

/**
 * @inheritdoc
 */
OO.ui.CheckboxMultioptionWidget.prototype.setSelected = function ( state ) {
	OO.ui.CheckboxMultioptionWidget.parent.prototype.setSelected.call( this, state );
	this.checkbox.setSelected( state );
	return this;
};

/**
 * @inheritdoc
 */
OO.ui.CheckboxMultioptionWidget.prototype.setDisabled = function ( disabled ) {
	OO.ui.CheckboxMultioptionWidget.parent.prototype.setDisabled.call( this, disabled );
	this.checkbox.setDisabled( this.isDisabled() );
	return this;
};

/**
 * Focus the widget.
 */
OO.ui.CheckboxMultioptionWidget.prototype.focus = function () {
	this.checkbox.focus();
};

/**
 * Handle key down events.
 *
 * @protected
 * @param {jQuery.Event} e
 */
OO.ui.CheckboxMultioptionWidget.prototype.onKeyDown = function ( e ) {
	var
		element = this.getElementGroup(),
		nextItem;

	if ( e.keyCode === OO.ui.Keys.LEFT || e.keyCode === OO.ui.Keys.UP ) {
		nextItem = element.getRelativeFocusableItem( this, -1 );
	} else if ( e.keyCode === OO.ui.Keys.RIGHT || e.keyCode === OO.ui.Keys.DOWN ) {
		nextItem = element.getRelativeFocusableItem( this, 1 );
	}

	if ( nextItem ) {
		e.preventDefault();
		nextItem.focus();
	}
};

/**
 * CheckboxMultiselectWidget is a {@link OO.ui.MultiselectWidget multiselect widget} that contains
 * checkboxes and is used together with OO.ui.CheckboxMultioptionWidget. The
 * CheckboxMultiselectWidget provides an interface for adding, removing and selecting options.
 * Please see the [OOUI documentation on MediaWiki][1] for more information.
 *
 * If you want to use this within an HTML form, such as a OO.ui.FormLayout, use
 * OO.ui.CheckboxMultiselectInputWidget instead.
 *
 *     @example
 *     // A CheckboxMultiselectWidget with CheckboxMultioptions.
 *     var option1 = new OO.ui.CheckboxMultioptionWidget( {
 *         data: 'a',
 *         selected: true,
 *         label: 'Selected checkbox'
 *     } );
 *
 *     var option2 = new OO.ui.CheckboxMultioptionWidget( {
 *         data: 'b',
 *         label: 'Unselected checkbox'
 *     } );
 *
 *     var multiselect=new OO.ui.CheckboxMultiselectWidget( {
 *         items: [ option1, option2 ]
 *      } );
 *
 *     $( 'body' ).append( multiselect.$element );
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Widgets/Selects_and_Options
 *
 * @class
 * @extends OO.ui.MultiselectWidget
 *
 * @constructor
 * @param {Object} [config] Configuration options
 */
OO.ui.CheckboxMultiselectWidget = function OoUiCheckboxMultiselectWidget( config ) {
	// Parent constructor
	OO.ui.CheckboxMultiselectWidget.parent.call( this, config );

	// Properties
	this.$lastClicked = null;

	// Events
	this.$group.on( 'click', this.onClick.bind( this ) );

	// Initialization
	this.$element
		.addClass( 'oo-ui-checkboxMultiselectWidget' );
};

/* Setup */

OO.inheritClass( OO.ui.CheckboxMultiselectWidget, OO.ui.MultiselectWidget );

/* Methods */

/**
 * Get an option by its position relative to the specified item (or to the start of the option array,
 * if item is `null`). The direction in which to search through the option array is specified with a
 * number: -1 for reverse (the default) or 1 for forward. The method will return an option, or
 * `null` if there are no options in the array.
 *
 * @param {OO.ui.CheckboxMultioptionWidget|null} item Item to describe the start position, or `null` to start at the beginning of the array.
 * @param {number} direction Direction to move in: -1 to move backward, 1 to move forward
 * @return {OO.ui.CheckboxMultioptionWidget|null} Item at position, `null` if there are no items in the select
 */
OO.ui.CheckboxMultiselectWidget.prototype.getRelativeFocusableItem = function ( item, direction ) {
	var currentIndex, nextIndex, i,
		increase = direction > 0 ? 1 : -1,
		len = this.items.length;

	if ( item ) {
		currentIndex = this.items.indexOf( item );
		nextIndex = ( currentIndex + increase + len ) % len;
	} else {
		// If no item is selected and moving forward, start at the beginning.
		// If moving backward, start at the end.
		nextIndex = direction > 0 ? 0 : len - 1;
	}

	for ( i = 0; i < len; i++ ) {
		item = this.items[ nextIndex ];
		if ( item && !item.isDisabled() ) {
			return item;
		}
		nextIndex = ( nextIndex + increase + len ) % len;
	}
	return null;
};

/**
 * Handle click events on checkboxes.
 *
 * @param {jQuery.Event} e
 */
OO.ui.CheckboxMultiselectWidget.prototype.onClick = function ( e ) {
	var $options, lastClickedIndex, nowClickedIndex, i, direction, wasSelected, items,
		$lastClicked = this.$lastClicked,
		$nowClicked = $( e.target ).closest( '.oo-ui-checkboxMultioptionWidget' )
			.not( '.oo-ui-widget-disabled' );

	// Allow selecting multiple options at once by Shift-clicking them
	if ( $lastClicked && $nowClicked.length && e.shiftKey ) {
		$options = this.$group.find( '.oo-ui-checkboxMultioptionWidget' );
		lastClickedIndex = $options.index( $lastClicked );
		nowClickedIndex = $options.index( $nowClicked );
		// If it's the same item, either the user is being silly, or it's a fake event generated by the
		// browser. In either case we don't need custom handling.
		if ( nowClickedIndex !== lastClickedIndex ) {
			items = this.items;
			wasSelected = items[ nowClickedIndex ].isSelected();
			direction = nowClickedIndex > lastClickedIndex ? 1 : -1;

			// This depends on the DOM order of the items and the order of the .items array being the same.
			for ( i = lastClickedIndex; i !== nowClickedIndex; i += direction ) {
				if ( !items[ i ].isDisabled() ) {
					items[ i ].setSelected( !wasSelected );
				}
			}
			// For the now-clicked element, use immediate timeout to allow the browser to do its own
			// handling first, then set our value. The order in which events happen is different for
			// clicks on the <input> and on the <label> and there are additional fake clicks fired for
			// non-click actions that change the checkboxes.
			e.preventDefault();
			setTimeout( function () {
				if ( !items[ nowClickedIndex ].isDisabled() ) {
					items[ nowClickedIndex ].setSelected( !wasSelected );
				}
			} );
		}
	}

	if ( $nowClicked.length ) {
		this.$lastClicked = $nowClicked;
	}
};

/**
 * Focus the widget
 *
 * @chainable
 */
OO.ui.CheckboxMultiselectWidget.prototype.focus = function () {
	var item;
	if ( !this.isDisabled() ) {
		item = this.getRelativeFocusableItem( null, 1 );
		if ( item ) {
			item.focus();
		}
	}
	return this;
};

/**
 * @inheritdoc
 */
OO.ui.CheckboxMultiselectWidget.prototype.simulateLabelClick = function () {
	this.focus();
};

/**
 * Progress bars visually display the status of an operation, such as a download,
 * and can be either determinate or indeterminate:
 *
 * - **determinate** process bars show the percent of an operation that is complete.
 *
 * - **indeterminate** process bars use a visual display of motion to indicate that an operation
 *   is taking place. Because the extent of an indeterminate operation is unknown, the bar does
 *   not use percentages.
 *
 * The value of the `progress` configuration determines whether the bar is determinate or indeterminate.
 *
 *     @example
 *     // Examples of determinate and indeterminate progress bars.
 *     var progressBar1 = new OO.ui.ProgressBarWidget( {
 *         progress: 33
 *     } );
 *     var progressBar2 = new OO.ui.ProgressBarWidget();
 *
 *     // Create a FieldsetLayout to layout progress bars
 *     var fieldset = new OO.ui.FieldsetLayout;
 *     fieldset.addItems( [
 *        new OO.ui.FieldLayout( progressBar1, {label: 'Determinate', align: 'top'}),
 *        new OO.ui.FieldLayout( progressBar2, {label: 'Indeterminate', align: 'top'})
 *     ] );
 *     $( 'body' ).append( fieldset.$element );
 *
 * @class
 * @extends OO.ui.Widget
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {number|boolean} [progress=false] The type of progress bar (determinate or indeterminate).
 *  To create a determinate progress bar, specify a number that reflects the initial percent complete.
 *  By default, the progress bar is indeterminate.
 */
OO.ui.ProgressBarWidget = function OoUiProgressBarWidget( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.ProgressBarWidget.parent.call( this, config );

	// Properties
	this.$bar = $( '<div>' );
	this.progress = null;

	// Initialization
	this.setProgress( config.progress !== undefined ? config.progress : false );
	this.$bar.addClass( 'oo-ui-progressBarWidget-bar' );
	this.$element
		.attr( {
			role: 'progressbar',
			'aria-valuemin': 0,
			'aria-valuemax': 100
		} )
		.addClass( 'oo-ui-progressBarWidget' )
		.append( this.$bar );
};

/* Setup */

OO.inheritClass( OO.ui.ProgressBarWidget, OO.ui.Widget );

/* Static Properties */

/**
 * @static
 * @inheritdoc
 */
OO.ui.ProgressBarWidget.static.tagName = 'div';

/* Methods */

/**
 * Get the percent of the progress that has been completed. Indeterminate progresses will return `false`.
 *
 * @return {number|boolean} Progress percent
 */
OO.ui.ProgressBarWidget.prototype.getProgress = function () {
	return this.progress;
};

/**
 * Set the percent of the process completed or `false` for an indeterminate process.
 *
 * @param {number|boolean} progress Progress percent or `false` for indeterminate
 */
OO.ui.ProgressBarWidget.prototype.setProgress = function ( progress ) {
	this.progress = progress;

	if ( progress !== false ) {
		this.$bar.css( 'width', this.progress + '%' );
		this.$element.attr( 'aria-valuenow', this.progress );
	} else {
		this.$bar.css( 'width', '' );
		this.$element.removeAttr( 'aria-valuenow' );
	}
	this.$element.toggleClass( 'oo-ui-progressBarWidget-indeterminate', progress === false );
};

/**
 * InputWidget is the base class for all input widgets, which
 * include {@link OO.ui.TextInputWidget text inputs}, {@link OO.ui.CheckboxInputWidget checkbox inputs},
 * {@link OO.ui.RadioInputWidget radio inputs}, and {@link OO.ui.ButtonInputWidget button inputs}.
 * See the [OOUI documentation on MediaWiki] [1] for more information and examples.
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Widgets/Inputs
 *
 * @abstract
 * @class
 * @extends OO.ui.Widget
 * @mixins OO.ui.mixin.FlaggedElement
 * @mixins OO.ui.mixin.TabIndexedElement
 * @mixins OO.ui.mixin.TitledElement
 * @mixins OO.ui.mixin.AccessKeyedElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {string} [name=''] The value of the input’s HTML `name` attribute.
 * @cfg {string} [value=''] The value of the input.
 * @cfg {string} [dir] The directionality of the input (ltr/rtl).
 * @cfg {string} [inputId] The value of the input’s HTML `id` attribute.
 * @cfg {Function} [inputFilter] The name of an input filter function. Input filters modify the value of an input
 *  before it is accepted.
 */
OO.ui.InputWidget = function OoUiInputWidget( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.InputWidget.parent.call( this, config );

	// Properties
	// See #reusePreInfuseDOM about config.$input
	this.$input = config.$input || this.getInputElement( config );
	this.value = '';
	this.inputFilter = config.inputFilter;

	// Mixin constructors
	OO.ui.mixin.FlaggedElement.call( this, config );
	OO.ui.mixin.TabIndexedElement.call( this, $.extend( {}, config, { $tabIndexed: this.$input } ) );
	OO.ui.mixin.TitledElement.call( this, $.extend( {}, config, { $titled: this.$input } ) );
	OO.ui.mixin.AccessKeyedElement.call( this, $.extend( {}, config, { $accessKeyed: this.$input } ) );

	// Events
	this.$input.on( 'keydown mouseup cut paste change input select', this.onEdit.bind( this ) );

	// Initialization
	this.$input
		.addClass( 'oo-ui-inputWidget-input' )
		.attr( 'name', config.name )
		.prop( 'disabled', this.isDisabled() );
	this.$element
		.addClass( 'oo-ui-inputWidget' )
		.append( this.$input );
	this.setValue( config.value );
	if ( config.dir ) {
		this.setDir( config.dir );
	}
	if ( config.inputId !== undefined ) {
		this.setInputId( config.inputId );
	}
};

/* Setup */

OO.inheritClass( OO.ui.InputWidget, OO.ui.Widget );
OO.mixinClass( OO.ui.InputWidget, OO.ui.mixin.FlaggedElement );
OO.mixinClass( OO.ui.InputWidget, OO.ui.mixin.TabIndexedElement );
OO.mixinClass( OO.ui.InputWidget, OO.ui.mixin.TitledElement );
OO.mixinClass( OO.ui.InputWidget, OO.ui.mixin.AccessKeyedElement );

/* Static Methods */

/**
 * @inheritdoc
 */
OO.ui.InputWidget.static.reusePreInfuseDOM = function ( node, config ) {
	config = OO.ui.InputWidget.parent.static.reusePreInfuseDOM( node, config );
	// Reusing `$input` lets browsers preserve inputted values across page reloads, see T114134.
	config.$input = $( node ).find( '.oo-ui-inputWidget-input' );
	return config;
};

/**
 * @inheritdoc
 */
OO.ui.InputWidget.static.gatherPreInfuseState = function ( node, config ) {
	var state = OO.ui.InputWidget.parent.static.gatherPreInfuseState( node, config );
	if ( config.$input && config.$input.length ) {
		state.value = config.$input.val();
		// Might be better in TabIndexedElement, but it's awkward to do there because mixins are awkward
		state.focus = config.$input.is( ':focus' );
	}
	return state;
};

/* Events */

/**
 * @event change
 *
 * A change event is emitted when the value of the input changes.
 *
 * @param {string} value
 */

/* Methods */

/**
 * Get input element.
 *
 * Subclasses of OO.ui.InputWidget use the `config` parameter to produce different elements in
 * different circumstances. The element must have a `value` property (like form elements).
 *
 * @protected
 * @param {Object} config Configuration options
 * @return {jQuery} Input element
 */
OO.ui.InputWidget.prototype.getInputElement = function () {
	return $( '<input>' );
};

/**
 * Handle potentially value-changing events.
 *
 * @private
 * @param {jQuery.Event} e Key down, mouse up, cut, paste, change, input, or select event
 */
OO.ui.InputWidget.prototype.onEdit = function () {
	var widget = this;
	if ( !this.isDisabled() ) {
		// Allow the stack to clear so the value will be updated
		setTimeout( function () {
			widget.setValue( widget.$input.val() );
		} );
	}
};

/**
 * Get the value of the input.
 *
 * @return {string} Input value
 */
OO.ui.InputWidget.prototype.getValue = function () {
	// Resynchronize our internal data with DOM data. Other scripts executing on the page can modify
	// it, and we won't know unless they're kind enough to trigger a 'change' event.
	var value = this.$input.val();
	if ( this.value !== value ) {
		this.setValue( value );
	}
	return this.value;
};

/**
 * Set the directionality of the input.
 *
 * @param {string} dir Text directionality: 'ltr', 'rtl' or 'auto'
 * @chainable
 */
OO.ui.InputWidget.prototype.setDir = function ( dir ) {
	this.$input.prop( 'dir', dir );
	return this;
};

/**
 * Set the value of the input.
 *
 * @param {string} value New value
 * @fires change
 * @chainable
 */
OO.ui.InputWidget.prototype.setValue = function ( value ) {
	value = this.cleanUpValue( value );
	// Update the DOM if it has changed. Note that with cleanUpValue, it
	// is possible for the DOM value to change without this.value changing.
	if ( this.$input.val() !== value ) {
		this.$input.val( value );
	}
	if ( this.value !== value ) {
		this.value = value;
		this.emit( 'change', this.value );
	}
	// The first time that the value is set (probably while constructing the widget),
	// remember it in defaultValue. This property can be later used to check whether
	// the value of the input has been changed since it was created.
	if ( this.defaultValue === undefined ) {
		this.defaultValue = this.value;
		this.$input[ 0 ].defaultValue = this.defaultValue;
	}
	return this;
};

/**
 * Clean up incoming value.
 *
 * Ensures value is a string, and converts undefined and null to empty string.
 *
 * @private
 * @param {string} value Original value
 * @return {string} Cleaned up value
 */
OO.ui.InputWidget.prototype.cleanUpValue = function ( value ) {
	if ( value === undefined || value === null ) {
		return '';
	} else if ( this.inputFilter ) {
		return this.inputFilter( String( value ) );
	} else {
		return String( value );
	}
};

/**
 * @inheritdoc
 */
OO.ui.InputWidget.prototype.setDisabled = function ( state ) {
	OO.ui.InputWidget.parent.prototype.setDisabled.call( this, state );
	if ( this.$input ) {
		this.$input.prop( 'disabled', this.isDisabled() );
	}
	return this;
};

/**
 * Set the 'id' attribute of the `<input>` element.
 *
 * @param {string} id
 * @chainable
 */
OO.ui.InputWidget.prototype.setInputId = function ( id ) {
	this.$input.attr( 'id', id );
	return this;
};

/**
 * @inheritdoc
 */
OO.ui.InputWidget.prototype.restorePreInfuseState = function ( state ) {
	OO.ui.InputWidget.parent.prototype.restorePreInfuseState.call( this, state );
	if ( state.value !== undefined && state.value !== this.getValue() ) {
		this.setValue( state.value );
	}
	if ( state.focus ) {
		this.focus();
	}
};

/**
 * Data widget intended for creating 'hidden'-type inputs.
 *
 * @class
 * @extends OO.ui.Widget
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {string} [value=''] The value of the input.
 * @cfg {string} [name=''] The value of the input’s HTML `name` attribute.
 */
OO.ui.HiddenInputWidget = function OoUiHiddenInputWidget( config ) {
	// Configuration initialization
	config = $.extend( { value: '', name: '' }, config );

	// Parent constructor
	OO.ui.HiddenInputWidget.parent.call( this, config );

	// Initialization
	this.$element.attr( {
		type: 'hidden',
		value: config.value,
		name: config.name
	} );
	this.$element.removeAttr( 'aria-disabled' );
};

/* Setup */

OO.inheritClass( OO.ui.HiddenInputWidget, OO.ui.Widget );

/* Static Properties */

/**
 * @static
 * @inheritdoc
 */
OO.ui.HiddenInputWidget.static.tagName = 'input';

/**
 * ButtonInputWidget is used to submit HTML forms and is intended to be used within
 * a OO.ui.FormLayout. If you do not need the button to work with HTML forms, you probably
 * want to use OO.ui.ButtonWidget instead. Button input widgets can be rendered as either an
 * HTML `<button>` (the default) or an HTML `<input>` tags. See the
 * [OOUI documentation on MediaWiki] [1] for more information.
 *
 *     @example
 *     // A ButtonInputWidget rendered as an HTML button, the default.
 *     var button = new OO.ui.ButtonInputWidget( {
 *         label: 'Input button',
 *         icon: 'check',
 *         value: 'check'
 *     } );
 *     $( 'body' ).append( button.$element );
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Widgets/Inputs#Button_inputs
 *
 * @class
 * @extends OO.ui.InputWidget
 * @mixins OO.ui.mixin.ButtonElement
 * @mixins OO.ui.mixin.IconElement
 * @mixins OO.ui.mixin.IndicatorElement
 * @mixins OO.ui.mixin.LabelElement
 * @mixins OO.ui.mixin.TitledElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {string} [type='button'] The value of the HTML `'type'` attribute: 'button', 'submit' or 'reset'.
 * @cfg {boolean} [useInputTag=false] Use an `<input>` tag instead of a `<button>` tag, the default.
 *  Widgets configured to be an `<input>` do not support {@link #icon icons} and {@link #indicator indicators},
 *  non-plaintext {@link #label labels}, or {@link #value values}. In general, useInputTag should only
 *  be set to `true` when there’s need to support IE 6 in a form with multiple buttons.
 */
OO.ui.ButtonInputWidget = function OoUiButtonInputWidget( config ) {
	// Configuration initialization
	config = $.extend( { type: 'button', useInputTag: false }, config );

	// See InputWidget#reusePreInfuseDOM about config.$input
	if ( config.$input ) {
		config.$input.empty();
	}

	// Properties (must be set before parent constructor, which calls #setValue)
	this.useInputTag = config.useInputTag;

	// Parent constructor
	OO.ui.ButtonInputWidget.parent.call( this, config );

	// Mixin constructors
	OO.ui.mixin.ButtonElement.call( this, $.extend( {}, config, { $button: this.$input } ) );
	OO.ui.mixin.IconElement.call( this, config );
	OO.ui.mixin.IndicatorElement.call( this, config );
	OO.ui.mixin.LabelElement.call( this, config );
	OO.ui.mixin.TitledElement.call( this, $.extend( {}, config, { $titled: this.$input } ) );

	// Initialization
	if ( !config.useInputTag ) {
		this.$input.append( this.$icon, this.$label, this.$indicator );
	}
	this.$element.addClass( 'oo-ui-buttonInputWidget' );
};

/* Setup */

OO.inheritClass( OO.ui.ButtonInputWidget, OO.ui.InputWidget );
OO.mixinClass( OO.ui.ButtonInputWidget, OO.ui.mixin.ButtonElement );
OO.mixinClass( OO.ui.ButtonInputWidget, OO.ui.mixin.IconElement );
OO.mixinClass( OO.ui.ButtonInputWidget, OO.ui.mixin.IndicatorElement );
OO.mixinClass( OO.ui.ButtonInputWidget, OO.ui.mixin.LabelElement );
OO.mixinClass( OO.ui.ButtonInputWidget, OO.ui.mixin.TitledElement );

/* Static Properties */

/**
 * @static
 * @inheritdoc
 */
OO.ui.ButtonInputWidget.static.tagName = 'span';

/* Methods */

/**
 * @inheritdoc
 * @protected
 */
OO.ui.ButtonInputWidget.prototype.getInputElement = function ( config ) {
	var type;
	type = [ 'button', 'submit', 'reset' ].indexOf( config.type ) !== -1 ? config.type : 'button';
	return $( '<' + ( config.useInputTag ? 'input' : 'button' ) + ' type="' + type + '">' );
};

/**
 * Set label value.
 *
 * If #useInputTag is `true`, the label is set as the `value` of the `<input>` tag.
 *
 * @param {jQuery|string|Function|null} label Label nodes, text, a function that returns nodes or
 *  text, or `null` for no label
 * @chainable
 */
OO.ui.ButtonInputWidget.prototype.setLabel = function ( label ) {
	if ( typeof label === 'function' ) {
		label = OO.ui.resolveMsg( label );
	}

	if ( this.useInputTag ) {
		// Discard non-plaintext labels
		if ( typeof label !== 'string' ) {
			label = '';
		}

		this.$input.val( label );
	}

	return OO.ui.mixin.LabelElement.prototype.setLabel.call( this, label );
};

/**
 * Set the value of the input.
 *
 * This method is disabled for button inputs configured as {@link #useInputTag <input> tags}, as
 * they do not support {@link #value values}.
 *
 * @param {string} value New value
 * @chainable
 */
OO.ui.ButtonInputWidget.prototype.setValue = function ( value ) {
	if ( !this.useInputTag ) {
		OO.ui.ButtonInputWidget.parent.prototype.setValue.call( this, value );
	}
	return this;
};

/**
 * @inheritdoc
 */
OO.ui.ButtonInputWidget.prototype.getInputId = function () {
	// Disable generating `<label>` elements for buttons. One would very rarely need additional label
	// for a button, and it's already a big clickable target, and it causes unexpected rendering.
	return null;
};

/**
 * CheckboxInputWidgets, like HTML checkboxes, can be selected and/or configured with a value.
 * Note that these {@link OO.ui.InputWidget input widgets} are best laid out
 * in {@link OO.ui.FieldLayout field layouts} that use the {@link OO.ui.FieldLayout#align inline}
 * alignment. For more information, please see the [OOUI documentation on MediaWiki][1].
 *
 * This widget can be used inside an HTML form, such as a OO.ui.FormLayout.
 *
 *     @example
 *     // An example of selected, unselected, and disabled checkbox inputs
 *     var checkbox1=new OO.ui.CheckboxInputWidget( {
 *          value: 'a',
 *          selected: true
 *     } );
 *     var checkbox2=new OO.ui.CheckboxInputWidget( {
 *         value: 'b'
 *     } );
 *     var checkbox3=new OO.ui.CheckboxInputWidget( {
 *         value:'c',
 *         disabled: true
 *     } );
 *     // Create a fieldset layout with fields for each checkbox.
 *     var fieldset = new OO.ui.FieldsetLayout( {
 *         label: 'Checkboxes'
 *     } );
 *     fieldset.addItems( [
 *         new OO.ui.FieldLayout( checkbox1, { label: 'Selected checkbox', align: 'inline' } ),
 *         new OO.ui.FieldLayout( checkbox2, { label: 'Unselected checkbox', align: 'inline' } ),
 *         new OO.ui.FieldLayout( checkbox3, { label: 'Disabled checkbox', align: 'inline' } ),
 *     ] );
 *     $( 'body' ).append( fieldset.$element );
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Widgets/Inputs
 *
 * @class
 * @extends OO.ui.InputWidget
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {boolean} [selected=false] Select the checkbox initially. By default, the checkbox is not selected.
 */
OO.ui.CheckboxInputWidget = function OoUiCheckboxInputWidget( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.CheckboxInputWidget.parent.call( this, config );

	// Properties
	this.checkIcon = new OO.ui.IconWidget( {
		icon: 'check',
		classes: [ 'oo-ui-checkboxInputWidget-checkIcon' ]
	} );

	// Initialization
	this.$element
		.addClass( 'oo-ui-checkboxInputWidget' )
		// Required for pretty styling in WikimediaUI theme
		.append( this.checkIcon.$element );
	this.setSelected( config.selected !== undefined ? config.selected : false );
};

/* Setup */

OO.inheritClass( OO.ui.CheckboxInputWidget, OO.ui.InputWidget );

/* Static Properties */

/**
 * @static
 * @inheritdoc
 */
OO.ui.CheckboxInputWidget.static.tagName = 'span';

/* Static Methods */

/**
 * @inheritdoc
 */
OO.ui.CheckboxInputWidget.static.gatherPreInfuseState = function ( node, config ) {
	var state = OO.ui.CheckboxInputWidget.parent.static.gatherPreInfuseState( node, config );
	state.checked = config.$input.prop( 'checked' );
	return state;
};

/* Methods */

/**
 * @inheritdoc
 * @protected
 */
OO.ui.CheckboxInputWidget.prototype.getInputElement = function () {
	return $( '<input>' ).attr( 'type', 'checkbox' );
};

/**
 * @inheritdoc
 */
OO.ui.CheckboxInputWidget.prototype.onEdit = function () {
	var widget = this;
	if ( !this.isDisabled() ) {
		// Allow the stack to clear so the value will be updated
		setTimeout( function () {
			widget.setSelected( widget.$input.prop( 'checked' ) );
		} );
	}
};

/**
 * Set selection state of this checkbox.
 *
 * @param {boolean} state `true` for selected
 * @chainable
 */
OO.ui.CheckboxInputWidget.prototype.setSelected = function ( state ) {
	state = !!state;
	if ( this.selected !== state ) {
		this.selected = state;
		this.$input.prop( 'checked', this.selected );
		this.emit( 'change', this.selected );
	}
	// The first time that the selection state is set (probably while constructing the widget),
	// remember it in defaultSelected. This property can be later used to check whether
	// the selection state of the input has been changed since it was created.
	if ( this.defaultSelected === undefined ) {
		this.defaultSelected = this.selected;
		this.$input[ 0 ].defaultChecked = this.defaultSelected;
	}
	return this;
};

/**
 * Check if this checkbox is selected.
 *
 * @return {boolean} Checkbox is selected
 */
OO.ui.CheckboxInputWidget.prototype.isSelected = function () {
	// Resynchronize our internal data with DOM data. Other scripts executing on the page can modify
	// it, and we won't know unless they're kind enough to trigger a 'change' event.
	var selected = this.$input.prop( 'checked' );
	if ( this.selected !== selected ) {
		this.setSelected( selected );
	}
	return this.selected;
};

/**
 * @inheritdoc
 */
OO.ui.CheckboxInputWidget.prototype.simulateLabelClick = function () {
	if ( !this.isDisabled() ) {
		this.$input.click();
	}
	this.focus();
};

/**
 * @inheritdoc
 */
OO.ui.CheckboxInputWidget.prototype.restorePreInfuseState = function ( state ) {
	OO.ui.CheckboxInputWidget.parent.prototype.restorePreInfuseState.call( this, state );
	if ( state.checked !== undefined && state.checked !== this.isSelected() ) {
		this.setSelected( state.checked );
	}
};

/**
 * DropdownInputWidget is a {@link OO.ui.DropdownWidget DropdownWidget} intended to be used
 * within an HTML form, such as a OO.ui.FormLayout. The selected value is synchronized with the value
 * of a hidden HTML `input` tag. Please see the [OOUI documentation on MediaWiki][1] for
 * more information about input widgets.
 *
 * A DropdownInputWidget always has a value (one of the options is always selected), unless there
 * are no options. If no `value` configuration option is provided, the first option is selected.
 * If you need a state representing no value (no option being selected), use a DropdownWidget.
 *
 * This and OO.ui.RadioSelectInputWidget support the same configuration options.
 *
 *     @example
 *     // Example: A DropdownInputWidget with three options
 *     var dropdownInput = new OO.ui.DropdownInputWidget( {
 *         options: [
 *             { data: 'a', label: 'First' },
 *             { data: 'b', label: 'Second'},
 *             { data: 'c', label: 'Third' }
 *         ]
 *     } );
 *     $( 'body' ).append( dropdownInput.$element );
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Widgets/Inputs
 *
 * @class
 * @extends OO.ui.InputWidget
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {Object[]} [options=[]] Array of menu options in the format `{ data: …, label: … }`
 * @cfg {Object} [dropdown] Configuration options for {@link OO.ui.DropdownWidget DropdownWidget}
 */
OO.ui.DropdownInputWidget = function OoUiDropdownInputWidget( config ) {
	// Configuration initialization
	config = config || {};

	// Properties (must be done before parent constructor which calls #setDisabled)
	this.dropdownWidget = new OO.ui.DropdownWidget( config.dropdown );
	// Set up the options before parent constructor, which uses them to validate config.value.
	// Use this instead of setOptions() because this.$input is not set up yet.
	this.setOptionsData( config.options || [] );

	// Parent constructor
	OO.ui.DropdownInputWidget.parent.call( this, config );

	// Events
	this.dropdownWidget.getMenu().connect( this, { select: 'onMenuSelect' } );

	// Initialization
	this.$element
		.addClass( 'oo-ui-dropdownInputWidget' )
		.append( this.dropdownWidget.$element );
	this.setTabIndexedElement( this.dropdownWidget.$tabIndexed );
};

/* Setup */

OO.inheritClass( OO.ui.DropdownInputWidget, OO.ui.InputWidget );

/* Methods */

/**
 * @inheritdoc
 * @protected
 */
OO.ui.DropdownInputWidget.prototype.getInputElement = function () {
	return $( '<select>' );
};

/**
 * Handles menu select events.
 *
 * @private
 * @param {OO.ui.MenuOptionWidget|null} item Selected menu item
 */
OO.ui.DropdownInputWidget.prototype.onMenuSelect = function ( item ) {
	this.setValue( item ? item.getData() : '' );
};

/**
 * @inheritdoc
 */
OO.ui.DropdownInputWidget.prototype.setValue = function ( value ) {
	var selected;
	value = this.cleanUpValue( value );
	// Only allow setting values that are actually present in the dropdown
	selected = this.dropdownWidget.getMenu().findItemFromData( value ) ||
		this.dropdownWidget.getMenu().findFirstSelectableItem();
	this.dropdownWidget.getMenu().selectItem( selected );
	value = selected ? selected.getData() : '';
	OO.ui.DropdownInputWidget.parent.prototype.setValue.call( this, value );
	if ( this.optionsDirty ) {
		// We reached this from the constructor or from #setOptions.
		// We have to update the <select> element.
		this.updateOptionsInterface();
	}
	return this;
};

/**
 * @inheritdoc
 */
OO.ui.DropdownInputWidget.prototype.setDisabled = function ( state ) {
	this.dropdownWidget.setDisabled( state );
	OO.ui.DropdownInputWidget.parent.prototype.setDisabled.call( this, state );
	return this;
};

/**
 * Set the options available for this input.
 *
 * @param {Object[]} options Array of menu options in the format `{ data: …, label: … }`
 * @chainable
 */
OO.ui.DropdownInputWidget.prototype.setOptions = function ( options ) {
	var value = this.getValue();

	this.setOptionsData( options );

	// Re-set the value to update the visible interface (DropdownWidget and <select>).
	// In case the previous value is no longer an available option, select the first valid one.
	this.setValue( value );

	return this;
};

/**
 * Set the internal list of options, used e.g. by setValue() to see which options are allowed.
 *
 * This method may be called before the parent constructor, so various properties may not be
 * intialized yet.
 *
 * @param {Object[]} options Array of menu options in the format `{ data: …, label: … }`
 * @private
 */
OO.ui.DropdownInputWidget.prototype.setOptionsData = function ( options ) {
	var
		optionWidgets,
		widget = this;

	this.optionsDirty = true;

	optionWidgets = options.map( function ( opt ) {
		var optValue;

		if ( opt.optgroup !== undefined ) {
			return widget.createMenuSectionOptionWidget( opt.optgroup );
		}

		optValue = widget.cleanUpValue( opt.data );
		return widget.createMenuOptionWidget(
			optValue,
			opt.label !== undefined ? opt.label : optValue
		);

	} );

	this.dropdownWidget.getMenu().clearItems().addItems( optionWidgets );
};

/**
 * Create a menu option widget.
 *
 * @protected
 * @param {string} data Item data
 * @param {string} label Item label
 * @return {OO.ui.MenuOptionWidget} Option widget
 */
OO.ui.DropdownInputWidget.prototype.createMenuOptionWidget = function ( data, label ) {
	return new OO.ui.MenuOptionWidget( {
		data: data,
		label: label
	} );
};

/**
 * Create a menu section option widget.
 *
 * @protected
 * @param {string} label Section item label
 * @return {OO.ui.MenuSectionOptionWidget} Menu section option widget
 */
OO.ui.DropdownInputWidget.prototype.createMenuSectionOptionWidget = function ( label ) {
	return new OO.ui.MenuSectionOptionWidget( {
		label: label
	} );
};

/**
 * Update the user-visible interface to match the internal list of options and value.
 *
 * This method must only be called after the parent constructor.
 *
 * @private
 */
OO.ui.DropdownInputWidget.prototype.updateOptionsInterface = function () {
	var
		$optionsContainer = this.$input,
		defaultValue = this.defaultValue,
		widget = this;

	this.$input.empty();

	this.dropdownWidget.getMenu().getItems().forEach( function ( optionWidget ) {
		var $optionNode;

		if ( !( optionWidget instanceof OO.ui.MenuSectionOptionWidget ) ) {
			$optionNode = $( '<option>' )
				.attr( 'value', optionWidget.getData() )
				.text( optionWidget.getLabel() );

			// Remember original selection state. This property can be later used to check whether
			// the selection state of the input has been changed since it was created.
			$optionNode[ 0 ].defaultSelected = ( optionWidget.getData() === defaultValue );

			$optionsContainer.append( $optionNode );
		} else {
			$optionNode = $( '<optgroup>' )
				.attr( 'label', optionWidget.getLabel() );
			widget.$input.append( $optionNode );
			$optionsContainer = $optionNode;
		}
	} );

	this.optionsDirty = false;
};

/**
 * @inheritdoc
 */
OO.ui.DropdownInputWidget.prototype.focus = function () {
	this.dropdownWidget.focus();
	return this;
};

/**
 * @inheritdoc
 */
OO.ui.DropdownInputWidget.prototype.blur = function () {
	this.dropdownWidget.blur();
	return this;
};

/**
 * RadioInputWidget creates a single radio button. Because radio buttons are usually used as a set,
 * in most cases you will want to use a {@link OO.ui.RadioSelectWidget radio select}
 * with {@link OO.ui.RadioOptionWidget radio options} instead of this class. For more information,
 * please see the [OOUI documentation on MediaWiki][1].
 *
 * This widget can be used inside an HTML form, such as a OO.ui.FormLayout.
 *
 *     @example
 *     // An example of selected, unselected, and disabled radio inputs
 *     var radio1 = new OO.ui.RadioInputWidget( {
 *         value: 'a',
 *         selected: true
 *     } );
 *     var radio2 = new OO.ui.RadioInputWidget( {
 *         value: 'b'
 *     } );
 *     var radio3 = new OO.ui.RadioInputWidget( {
 *         value: 'c',
 *         disabled: true
 *     } );
 *     // Create a fieldset layout with fields for each radio button.
 *     var fieldset = new OO.ui.FieldsetLayout( {
 *         label: 'Radio inputs'
 *     } );
 *     fieldset.addItems( [
 *         new OO.ui.FieldLayout( radio1, { label: 'Selected', align: 'inline' } ),
 *         new OO.ui.FieldLayout( radio2, { label: 'Unselected', align: 'inline' } ),
 *         new OO.ui.FieldLayout( radio3, { label: 'Disabled', align: 'inline' } ),
 *     ] );
 *     $( 'body' ).append( fieldset.$element );
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Widgets/Inputs
 *
 * @class
 * @extends OO.ui.InputWidget
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {boolean} [selected=false] Select the radio button initially. By default, the radio button is not selected.
 */
OO.ui.RadioInputWidget = function OoUiRadioInputWidget( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.RadioInputWidget.parent.call( this, config );

	// Initialization
	this.$element
		.addClass( 'oo-ui-radioInputWidget' )
		// Required for pretty styling in WikimediaUI theme
		.append( $( '<span>' ) );
	this.setSelected( config.selected !== undefined ? config.selected : false );
};

/* Setup */

OO.inheritClass( OO.ui.RadioInputWidget, OO.ui.InputWidget );

/* Static Properties */

/**
 * @static
 * @inheritdoc
 */
OO.ui.RadioInputWidget.static.tagName = 'span';

/* Static Methods */

/**
 * @inheritdoc
 */
OO.ui.RadioInputWidget.static.gatherPreInfuseState = function ( node, config ) {
	var state = OO.ui.RadioInputWidget.parent.static.gatherPreInfuseState( node, config );
	state.checked = config.$input.prop( 'checked' );
	return state;
};

/* Methods */

/**
 * @inheritdoc
 * @protected
 */
OO.ui.RadioInputWidget.prototype.getInputElement = function () {
	return $( '<input>' ).attr( 'type', 'radio' );
};

/**
 * @inheritdoc
 */
OO.ui.RadioInputWidget.prototype.onEdit = function () {
	// RadioInputWidget doesn't track its state.
};

/**
 * Set selection state of this radio button.
 *
 * @param {boolean} state `true` for selected
 * @chainable
 */
OO.ui.RadioInputWidget.prototype.setSelected = function ( state ) {
	// RadioInputWidget doesn't track its state.
	this.$input.prop( 'checked', state );
	// The first time that the selection state is set (probably while constructing the widget),
	// remember it in defaultSelected. This property can be later used to check whether
	// the selection state of the input has been changed since it was created.
	if ( this.defaultSelected === undefined ) {
		this.defaultSelected = state;
		this.$input[ 0 ].defaultChecked = this.defaultSelected;
	}
	return this;
};

/**
 * Check if this radio button is selected.
 *
 * @return {boolean} Radio is selected
 */
OO.ui.RadioInputWidget.prototype.isSelected = function () {
	return this.$input.prop( 'checked' );
};

/**
 * @inheritdoc
 */
OO.ui.RadioInputWidget.prototype.simulateLabelClick = function () {
	if ( !this.isDisabled() ) {
		this.$input.click();
	}
	this.focus();
};

/**
 * @inheritdoc
 */
OO.ui.RadioInputWidget.prototype.restorePreInfuseState = function ( state ) {
	OO.ui.RadioInputWidget.parent.prototype.restorePreInfuseState.call( this, state );
	if ( state.checked !== undefined && state.checked !== this.isSelected() ) {
		this.setSelected( state.checked );
	}
};

/**
 * RadioSelectInputWidget is a {@link OO.ui.RadioSelectWidget RadioSelectWidget} intended to be used
 * within an HTML form, such as a OO.ui.FormLayout. The selected value is synchronized with the value
 * of a hidden HTML `input` tag. Please see the [OOUI documentation on MediaWiki][1] for
 * more information about input widgets.
 *
 * This and OO.ui.DropdownInputWidget support the same configuration options.
 *
 *     @example
 *     // Example: A RadioSelectInputWidget with three options
 *     var radioSelectInput = new OO.ui.RadioSelectInputWidget( {
 *         options: [
 *             { data: 'a', label: 'First' },
 *             { data: 'b', label: 'Second'},
 *             { data: 'c', label: 'Third' }
 *         ]
 *     } );
 *     $( 'body' ).append( radioSelectInput.$element );
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Widgets/Inputs
 *
 * @class
 * @extends OO.ui.InputWidget
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {Object[]} [options=[]] Array of menu options in the format `{ data: …, label: … }`
 */
OO.ui.RadioSelectInputWidget = function OoUiRadioSelectInputWidget( config ) {
	// Configuration initialization
	config = config || {};

	// Properties (must be done before parent constructor which calls #setDisabled)
	this.radioSelectWidget = new OO.ui.RadioSelectWidget();
	// Set up the options before parent constructor, which uses them to validate config.value.
	// Use this instead of setOptions() because this.$input is not set up yet
	this.setOptionsData( config.options || [] );

	// Parent constructor
	OO.ui.RadioSelectInputWidget.parent.call( this, config );

	// Events
	this.radioSelectWidget.connect( this, { select: 'onMenuSelect' } );

	// Initialization
	this.$element
		.addClass( 'oo-ui-radioSelectInputWidget' )
		.append( this.radioSelectWidget.$element );
	this.setTabIndexedElement( this.radioSelectWidget.$tabIndexed );
};

/* Setup */

OO.inheritClass( OO.ui.RadioSelectInputWidget, OO.ui.InputWidget );

/* Static Methods */

/**
 * @inheritdoc
 */
OO.ui.RadioSelectInputWidget.static.gatherPreInfuseState = function ( node, config ) {
	var state = OO.ui.RadioSelectInputWidget.parent.static.gatherPreInfuseState( node, config );
	state.value = $( node ).find( '.oo-ui-radioInputWidget .oo-ui-inputWidget-input:checked' ).val();
	return state;
};

/**
 * @inheritdoc
 */
OO.ui.RadioSelectInputWidget.static.reusePreInfuseDOM = function ( node, config ) {
	config = OO.ui.RadioSelectInputWidget.parent.static.reusePreInfuseDOM( node, config );
	// Cannot reuse the `<input type=radio>` set
	delete config.$input;
	return config;
};

/* Methods */

/**
 * @inheritdoc
 * @protected
 */
OO.ui.RadioSelectInputWidget.prototype.getInputElement = function () {
	// Use this instead of <input type="hidden">, because hidden inputs do not have separate
	// 'value' and 'defaultValue' properties, and InputWidget wants to handle 'defaultValue'.
	return $( '<input>' ).addClass( 'oo-ui-element-hidden' );
};

/**
 * Handles menu select events.
 *
 * @private
 * @param {OO.ui.RadioOptionWidget} item Selected menu item
 */
OO.ui.RadioSelectInputWidget.prototype.onMenuSelect = function ( item ) {
	this.setValue( item.getData() );
};

/**
 * @inheritdoc
 */
OO.ui.RadioSelectInputWidget.prototype.setValue = function ( value ) {
	var selected;
	value = this.cleanUpValue( value );
	// Only allow setting values that are actually present in the dropdown
	selected = this.radioSelectWidget.findItemFromData( value ) ||
		this.radioSelectWidget.findFirstSelectableItem();
	this.radioSelectWidget.selectItem( selected );
	value = selected ? selected.getData() : '';
	OO.ui.RadioSelectInputWidget.parent.prototype.setValue.call( this, value );
	return this;
};

/**
 * @inheritdoc
 */
OO.ui.RadioSelectInputWidget.prototype.setDisabled = function ( state ) {
	this.radioSelectWidget.setDisabled( state );
	OO.ui.RadioSelectInputWidget.parent.prototype.setDisabled.call( this, state );
	return this;
};

/**
 * Set the options available for this input.
 *
 * @param {Object[]} options Array of menu options in the format `{ data: …, label: … }`
 * @chainable
 */
OO.ui.RadioSelectInputWidget.prototype.setOptions = function ( options ) {
	var value = this.getValue();

	this.setOptionsData( options );

	// Re-set the value to update the visible interface (RadioSelectWidget).
	// In case the previous value is no longer an available option, select the first valid one.
	this.setValue( value );

	return this;
};

/**
 * Set the internal list of options, used e.g. by setValue() to see which options are allowed.
 *
 * This method may be called before the parent constructor, so various properties may not be
 * intialized yet.
 *
 * @param {Object[]} options Array of menu options in the format `{ data: …, label: … }`
 * @private
 */
OO.ui.RadioSelectInputWidget.prototype.setOptionsData = function ( options ) {
	var widget = this;

	this.radioSelectWidget
		.clearItems()
		.addItems( options.map( function ( opt ) {
			var optValue = widget.cleanUpValue( opt.data );
			return new OO.ui.RadioOptionWidget( {
				data: optValue,
				label: opt.label !== undefined ? opt.label : optValue
			} );
		} ) );
};

/**
 * @inheritdoc
 */
OO.ui.RadioSelectInputWidget.prototype.focus = function () {
	this.radioSelectWidget.focus();
	return this;
};

/**
 * @inheritdoc
 */
OO.ui.RadioSelectInputWidget.prototype.blur = function () {
	this.radioSelectWidget.blur();
	return this;
};

/**
 * CheckboxMultiselectInputWidget is a
 * {@link OO.ui.CheckboxMultiselectWidget CheckboxMultiselectWidget} intended to be used within a
 * HTML form, such as a OO.ui.FormLayout. The selected values are synchronized with the value of
 * HTML `<input type=checkbox>` tags. Please see the [OOUI documentation on MediaWiki][1] for
 * more information about input widgets.
 *
 *     @example
 *     // Example: A CheckboxMultiselectInputWidget with three options
 *     var multiselectInput = new OO.ui.CheckboxMultiselectInputWidget( {
 *         options: [
 *             { data: 'a', label: 'First' },
 *             { data: 'b', label: 'Second'},
 *             { data: 'c', label: 'Third' }
 *         ]
 *     } );
 *     $( 'body' ).append( multiselectInput.$element );
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Widgets/Inputs
 *
 * @class
 * @extends OO.ui.InputWidget
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {Object[]} [options=[]] Array of menu options in the format `{ data: …, label: …, disabled: … }`
 */
OO.ui.CheckboxMultiselectInputWidget = function OoUiCheckboxMultiselectInputWidget( config ) {
	// Configuration initialization
	config = config || {};

	// Properties (must be done before parent constructor which calls #setDisabled)
	this.checkboxMultiselectWidget = new OO.ui.CheckboxMultiselectWidget();
	// Must be set before the #setOptionsData call below
	this.inputName = config.name;
	// Set up the options before parent constructor, which uses them to validate config.value.
	// Use this instead of setOptions() because this.$input is not set up yet
	this.setOptionsData( config.options || [] );

	// Parent constructor
	OO.ui.CheckboxMultiselectInputWidget.parent.call( this, config );

	// Events
	this.checkboxMultiselectWidget.connect( this, { select: 'onCheckboxesSelect' } );

	// Initialization
	this.$element
		.addClass( 'oo-ui-checkboxMultiselectInputWidget' )
		.append( this.checkboxMultiselectWidget.$element );
	// We don't use this.$input, but rather the CheckboxInputWidgets inside each option
	this.$input.detach();
};

/* Setup */

OO.inheritClass( OO.ui.CheckboxMultiselectInputWidget, OO.ui.InputWidget );

/* Static Methods */

/**
 * @inheritdoc
 */
OO.ui.CheckboxMultiselectInputWidget.static.gatherPreInfuseState = function ( node, config ) {
	var state = OO.ui.CheckboxMultiselectInputWidget.parent.static.gatherPreInfuseState( node, config );
	state.value = $( node ).find( '.oo-ui-checkboxInputWidget .oo-ui-inputWidget-input:checked' )
		.toArray().map( function ( el ) { return el.value; } );
	return state;
};

/**
 * @inheritdoc
 */
OO.ui.CheckboxMultiselectInputWidget.static.reusePreInfuseDOM = function ( node, config ) {
	config = OO.ui.CheckboxMultiselectInputWidget.parent.static.reusePreInfuseDOM( node, config );
	// Cannot reuse the `<input type=checkbox>` set
	delete config.$input;
	return config;
};

/* Methods */

/**
 * @inheritdoc
 * @protected
 */
OO.ui.CheckboxMultiselectInputWidget.prototype.getInputElement = function () {
	// Actually unused
	return $( '<unused>' );
};

/**
 * Handles CheckboxMultiselectWidget select events.
 *
 * @private
 */
OO.ui.CheckboxMultiselectInputWidget.prototype.onCheckboxesSelect = function () {
	this.setValue( this.checkboxMultiselectWidget.findSelectedItemsData() );
};

/**
 * @inheritdoc
 */
OO.ui.CheckboxMultiselectInputWidget.prototype.getValue = function () {
	var value = this.$element.find( '.oo-ui-checkboxInputWidget .oo-ui-inputWidget-input:checked' )
		.toArray().map( function ( el ) { return el.value; } );
	if ( this.value !== value ) {
		this.setValue( value );
	}
	return this.value;
};

/**
 * @inheritdoc
 */
OO.ui.CheckboxMultiselectInputWidget.prototype.setValue = function ( value ) {
	value = this.cleanUpValue( value );
	this.checkboxMultiselectWidget.selectItemsByData( value );
	OO.ui.CheckboxMultiselectInputWidget.parent.prototype.setValue.call( this, value );
	if ( this.optionsDirty ) {
		// We reached this from the constructor or from #setOptions.
		// We have to update the <select> element.
		this.updateOptionsInterface();
	}
	return this;
};

/**
 * Clean up incoming value.
 *
 * @param {string[]} value Original value
 * @return {string[]} Cleaned up value
 */
OO.ui.CheckboxMultiselectInputWidget.prototype.cleanUpValue = function ( value ) {
	var i, singleValue,
		cleanValue = [];
	if ( !Array.isArray( value ) ) {
		return cleanValue;
	}
	for ( i = 0; i < value.length; i++ ) {
		singleValue =
			OO.ui.CheckboxMultiselectInputWidget.parent.prototype.cleanUpValue.call( this, value[ i ] );
		// Remove options that we don't have here
		if ( !this.checkboxMultiselectWidget.findItemFromData( singleValue ) ) {
			continue;
		}
		cleanValue.push( singleValue );
	}
	return cleanValue;
};

/**
 * @inheritdoc
 */
OO.ui.CheckboxMultiselectInputWidget.prototype.setDisabled = function ( state ) {
	this.checkboxMultiselectWidget.setDisabled( state );
	OO.ui.CheckboxMultiselectInputWidget.parent.prototype.setDisabled.call( this, state );
	return this;
};

/**
 * Set the options available for this input.
 *
 * @param {Object[]} options Array of menu options in the format `{ data: …, label: …, disabled: … }`
 * @chainable
 */
OO.ui.CheckboxMultiselectInputWidget.prototype.setOptions = function ( options ) {
	var value = this.getValue();

	this.setOptionsData( options );

	// Re-set the value to update the visible interface (CheckboxMultiselectWidget).
	// This will also get rid of any stale options that we just removed.
	this.setValue( value );

	return this;
};

/**
 * Set the internal list of options, used e.g. by setValue() to see which options are allowed.
 *
 * This method may be called before the parent constructor, so various properties may not be
 * intialized yet.
 *
 * @param {Object[]} options Array of menu options in the format `{ data: …, label: … }`
 * @private
 */
OO.ui.CheckboxMultiselectInputWidget.prototype.setOptionsData = function ( options ) {
	var widget = this;

	this.optionsDirty = true;

	this.checkboxMultiselectWidget
		.clearItems()
		.addItems( options.map( function ( opt ) {
			var optValue, item, optDisabled;
			optValue =
				OO.ui.CheckboxMultiselectInputWidget.parent.prototype.cleanUpValue.call( widget, opt.data );
			optDisabled = opt.disabled !== undefined ? opt.disabled : false;
			item = new OO.ui.CheckboxMultioptionWidget( {
				data: optValue,
				label: opt.label !== undefined ? opt.label : optValue,
				disabled: optDisabled
			} );
			// Set the 'name' and 'value' for form submission
			item.checkbox.$input.attr( 'name', widget.inputName );
			item.checkbox.setValue( optValue );
			return item;
		} ) );
};

/**
 * Update the user-visible interface to match the internal list of options and value.
 *
 * This method must only be called after the parent constructor.
 *
 * @private
 */
OO.ui.CheckboxMultiselectInputWidget.prototype.updateOptionsInterface = function () {
	var defaultValue = this.defaultValue;

	this.checkboxMultiselectWidget.getItems().forEach( function ( item ) {
		// Remember original selection state. This property can be later used to check whether
		// the selection state of the input has been changed since it was created.
		var isDefault = defaultValue.indexOf( item.getData() ) !== -1;
		item.checkbox.defaultSelected = isDefault;
		item.checkbox.$input[ 0 ].defaultChecked = isDefault;
	} );

	this.optionsDirty = false;
};

/**
 * @inheritdoc
 */
OO.ui.CheckboxMultiselectInputWidget.prototype.focus = function () {
	this.checkboxMultiselectWidget.focus();
	return this;
};

/**
 * TextInputWidgets, like HTML text inputs, can be configured with options that customize the
 * size of the field as well as its presentation. In addition, these widgets can be configured
 * with {@link OO.ui.mixin.IconElement icons}, {@link OO.ui.mixin.IndicatorElement indicators}, an optional
 * validation-pattern (used to determine if an input value is valid or not) and an input filter,
 * which modifies incoming values rather than validating them.
 * Please see the [OOUI documentation on MediaWiki] [1] for more information and examples.
 *
 * This widget can be used inside an HTML form, such as a OO.ui.FormLayout.
 *
 *     @example
 *     // Example of a text input widget
 *     var textInput = new OO.ui.TextInputWidget( {
 *         value: 'Text input'
 *     } )
 *     $( 'body' ).append( textInput.$element );
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Widgets/Inputs
 *
 * @class
 * @extends OO.ui.InputWidget
 * @mixins OO.ui.mixin.IconElement
 * @mixins OO.ui.mixin.IndicatorElement
 * @mixins OO.ui.mixin.PendingElement
 * @mixins OO.ui.mixin.LabelElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {string} [type='text'] The value of the HTML `type` attribute: 'text', 'password'
 *  'email', 'url' or 'number'.
 * @cfg {string} [placeholder] Placeholder text
 * @cfg {boolean} [autofocus=false] Use an HTML `autofocus` attribute to
 *  instruct the browser to focus this widget.
 * @cfg {boolean} [readOnly=false] Prevent changes to the value of the text input.
 * @cfg {number} [maxLength] Maximum number of characters allowed in the input.
 *
 *  For unfortunate historical reasons, this counts the number of UTF-16 code units rather than
 *  Unicode codepoints, which means that codepoints outside the Basic Multilingual Plane (e.g.
 *  many emojis) count as 2 characters each.
 * @cfg {string} [labelPosition='after'] The position of the inline label relative to that of
 *  the value or placeholder text: `'before'` or `'after'`
 * @cfg {boolean} [required=false] Mark the field as required with `true`. Implies `indicator: 'required'`.
 *  Note that `false` & setting `indicator: 'required' will result in no indicator shown.
 * @cfg {boolean} [autocomplete=true] Should the browser support autocomplete for this field
 * @cfg {boolean} [spellcheck] Should the browser support spellcheck for this field (`undefined` means
 *  leaving it up to the browser).
 * @cfg {RegExp|Function|string} [validate] Validation pattern: when string, a symbolic name of a
 *  pattern defined by the class: 'non-empty' (the value cannot be an empty string) or 'integer'
 *  (the value must contain only numbers); when RegExp, a regular expression that must match the
 *  value for it to be considered valid; when Function, a function receiving the value as parameter
 *  that must return true, or promise resolving to true, for it to be considered valid.
 */
OO.ui.TextInputWidget = function OoUiTextInputWidget( config ) {
	// Configuration initialization
	config = $.extend( {
		type: 'text',
		labelPosition: 'after'
	}, config );

	if ( config.multiline ) {
		OO.ui.warnDeprecation( 'TextInputWidget: config.multiline is deprecated. Use the MultilineTextInputWidget instead. See T130434.' );
		return new OO.ui.MultilineTextInputWidget( config );
	}

	// Parent constructor
	OO.ui.TextInputWidget.parent.call( this, config );

	// Mixin constructors
	OO.ui.mixin.IconElement.call( this, config );
	OO.ui.mixin.IndicatorElement.call( this, config );
	OO.ui.mixin.PendingElement.call( this, $.extend( {}, config, { $pending: this.$input } ) );
	OO.ui.mixin.LabelElement.call( this, config );

	// Properties
	this.type = this.getSaneType( config );
	this.readOnly = false;
	this.required = false;
	this.validate = null;
	this.styleHeight = null;
	this.scrollWidth = null;

	this.setValidation( config.validate );
	this.setLabelPosition( config.labelPosition );

	// Events
	this.$input.on( {
		keypress: this.onKeyPress.bind( this ),
		blur: this.onBlur.bind( this ),
		focus: this.onFocus.bind( this )
	} );
	this.$icon.on( 'mousedown', this.onIconMouseDown.bind( this ) );
	this.$indicator.on( 'mousedown', this.onIndicatorMouseDown.bind( this ) );
	this.on( 'labelChange', this.updatePosition.bind( this ) );
	this.on( 'change', OO.ui.debounce( this.onDebouncedChange.bind( this ), 250 ) );

	// Initialization
	this.$element
		.addClass( 'oo-ui-textInputWidget oo-ui-textInputWidget-type-' + this.type )
		.append( this.$icon, this.$indicator );
	this.setReadOnly( !!config.readOnly );
	this.setRequired( !!config.required );
	if ( config.placeholder !== undefined ) {
		this.$input.attr( 'placeholder', config.placeholder );
	}
	if ( config.maxLength !== undefined ) {
		this.$input.attr( 'maxlength', config.maxLength );
	}
	if ( config.autofocus ) {
		this.$input.attr( 'autofocus', 'autofocus' );
	}
	if ( config.autocomplete === false ) {
		this.$input.attr( 'autocomplete', 'off' );
		// Turning off autocompletion also disables "form caching" when the user navigates to a
		// different page and then clicks "Back". Re-enable it when leaving. Borrowed from jQuery UI.
		$( window ).on( {
			beforeunload: function () {
				this.$input.removeAttr( 'autocomplete' );
			}.bind( this ),
			pageshow: function () {
				// Browsers don't seem to actually fire this event on "Back", they instead just reload the
				// whole page... it shouldn't hurt, though.
				this.$input.attr( 'autocomplete', 'off' );
			}.bind( this )
		} );
	}
	if ( config.spellcheck !== undefined ) {
		this.$input.attr( 'spellcheck', config.spellcheck ? 'true' : 'false' );
	}
	if ( this.label ) {
		this.isWaitingToBeAttached = true;
		this.installParentChangeDetector();
	}
};

/* Setup */

OO.inheritClass( OO.ui.TextInputWidget, OO.ui.InputWidget );
OO.mixinClass( OO.ui.TextInputWidget, OO.ui.mixin.IconElement );
OO.mixinClass( OO.ui.TextInputWidget, OO.ui.mixin.IndicatorElement );
OO.mixinClass( OO.ui.TextInputWidget, OO.ui.mixin.PendingElement );
OO.mixinClass( OO.ui.TextInputWidget, OO.ui.mixin.LabelElement );

/* Static Properties */

OO.ui.TextInputWidget.static.validationPatterns = {
	'non-empty': /.+/,
	integer: /^\d+$/
};

/* Events */

/**
 * An `enter` event is emitted when the user presses 'enter' inside the text box.
 *
 * @event enter
 */

/* Methods */

/**
 * Handle icon mouse down events.
 *
 * @private
 * @param {jQuery.Event} e Mouse down event
 */
OO.ui.TextInputWidget.prototype.onIconMouseDown = function ( e ) {
	if ( e.which === OO.ui.MouseButtons.LEFT ) {
		this.focus();
		return false;
	}
};

/**
 * Handle indicator mouse down events.
 *
 * @private
 * @param {jQuery.Event} e Mouse down event
 */
OO.ui.TextInputWidget.prototype.onIndicatorMouseDown = function ( e ) {
	if ( e.which === OO.ui.MouseButtons.LEFT ) {
		this.focus();
		return false;
	}
};

/**
 * Handle key press events.
 *
 * @private
 * @param {jQuery.Event} e Key press event
 * @fires enter If enter key is pressed
 */
OO.ui.TextInputWidget.prototype.onKeyPress = function ( e ) {
	if ( e.which === OO.ui.Keys.ENTER ) {
		this.emit( 'enter', e );
	}
};

/**
 * Handle blur events.
 *
 * @private
 * @param {jQuery.Event} e Blur event
 */
OO.ui.TextInputWidget.prototype.onBlur = function () {
	this.setValidityFlag();
};

/**
 * Handle focus events.
 *
 * @private
 * @param {jQuery.Event} e Focus event
 */
OO.ui.TextInputWidget.prototype.onFocus = function () {
	if ( this.isWaitingToBeAttached ) {
		// If we've received focus, then we must be attached to the document, and if
		// isWaitingToBeAttached is still true, that means the handler never fired. Fire it now.
		this.onElementAttach();
	}
	this.setValidityFlag( true );
};

/**
 * Handle element attach events.
 *
 * @private
 * @param {jQuery.Event} e Element attach event
 */
OO.ui.TextInputWidget.prototype.onElementAttach = function () {
	this.isWaitingToBeAttached = false;
	// Any previously calculated size is now probably invalid if we reattached elsewhere
	this.valCache = null;
	this.positionLabel();
};

/**
 * Handle debounced change events.
 *
 * @param {string} value
 * @private
 */
OO.ui.TextInputWidget.prototype.onDebouncedChange = function () {
	this.setValidityFlag();
};

/**
 * Check if the input is {@link #readOnly read-only}.
 *
 * @return {boolean}
 */
OO.ui.TextInputWidget.prototype.isReadOnly = function () {
	return this.readOnly;
};

/**
 * Set the {@link #readOnly read-only} state of the input.
 *
 * @param {boolean} state Make input read-only
 * @chainable
 */
OO.ui.TextInputWidget.prototype.setReadOnly = function ( state ) {
	this.readOnly = !!state;
	this.$input.prop( 'readOnly', this.readOnly );
	return this;
};

/**
 * Check if the input is {@link #required required}.
 *
 * @return {boolean}
 */
OO.ui.TextInputWidget.prototype.isRequired = function () {
	return this.required;
};

/**
 * Set the {@link #required required} state of the input.
 *
 * @param {boolean} state Make input required
 * @chainable
 */
OO.ui.TextInputWidget.prototype.setRequired = function ( state ) {
	this.required = !!state;
	if ( this.required ) {
		this.$input
			.prop( 'required', true )
			.attr( 'aria-required', 'true' );
		if ( this.getIndicator() === null ) {
			this.setIndicator( 'required' );
		}
	} else {
		this.$input
			.prop( 'required', false )
			.removeAttr( 'aria-required' );
		if ( this.getIndicator() === 'required' ) {
			this.setIndicator( null );
		}
	}
	return this;
};

/**
 * Support function for making #onElementAttach work across browsers.
 *
 * This whole function could be replaced with one line of code using the DOMNodeInsertedIntoDocument
 * event, but it's not supported by Firefox and allegedly deprecated, so we only use it as fallback.
 *
 * Due to MutationObserver performance woes, #onElementAttach is only somewhat reliably called the
 * first time that the element gets attached to the documented.
 */
OO.ui.TextInputWidget.prototype.installParentChangeDetector = function () {
	var mutationObserver, onRemove, topmostNode, fakeParentNode,
		MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver,
		widget = this;

	if ( MutationObserver ) {
		// The new way. If only it wasn't so ugly.

		if ( this.isElementAttached() ) {
			// Widget is attached already, do nothing. This breaks the functionality of this function when
			// the widget is detached and reattached. Alas, doing this correctly with MutationObserver
			// would require observation of the whole document, which would hurt performance of other,
			// more important code.
			return;
		}

		// Find topmost node in the tree
		topmostNode = this.$element[ 0 ];
		while ( topmostNode.parentNode ) {
			topmostNode = topmostNode.parentNode;
		}

		// We have no way to detect the $element being attached somewhere without observing the entire
		// DOM with subtree modifications, which would hurt performance. So we cheat: we hook to the
		// parent node of $element, and instead detect when $element is removed from it (and thus
		// probably attached somewhere else). If there is no parent, we create a "fake" one. If it
		// doesn't get attached, we end up back here and create the parent.

		mutationObserver = new MutationObserver( function ( mutations ) {
			var i, j, removedNodes;
			for ( i = 0; i < mutations.length; i++ ) {
				removedNodes = mutations[ i ].removedNodes;
				for ( j = 0; j < removedNodes.length; j++ ) {
					if ( removedNodes[ j ] === topmostNode ) {
						setTimeout( onRemove, 0 );
						return;
					}
				}
			}
		} );

		onRemove = function () {
			// If the node was attached somewhere else, report it
			if ( widget.isElementAttached() ) {
				widget.onElementAttach();
			}
			mutationObserver.disconnect();
			widget.installParentChangeDetector();
		};

		// Create a fake parent and observe it
		fakeParentNode = $( '<div>' ).append( topmostNode )[ 0 ];
		mutationObserver.observe( fakeParentNode, { childList: true } );
	} else {
		// Using the DOMNodeInsertedIntoDocument event is much nicer and less magical, and works for
		// detachment and reattachment, but it's not supported by Firefox and allegedly deprecated.
		this.$element.on( 'DOMNodeInsertedIntoDocument', this.onElementAttach.bind( this ) );
	}
};

/**
 * @inheritdoc
 * @protected
 */
OO.ui.TextInputWidget.prototype.getInputElement = function ( config ) {
	if ( this.getSaneType( config ) === 'number' ) {
		return $( '<input>' )
			.attr( 'step', 'any' )
			.attr( 'type', 'number' );
	} else {
		return $( '<input>' ).attr( 'type', this.getSaneType( config ) );
	}
};

/**
 * Get sanitized value for 'type' for given config.
 *
 * @param {Object} config Configuration options
 * @return {string|null}
 * @protected
 */
OO.ui.TextInputWidget.prototype.getSaneType = function ( config ) {
	var allowedTypes = [
		'text',
		'password',
		'email',
		'url',
		'number'
	];
	return allowedTypes.indexOf( config.type ) !== -1 ? config.type : 'text';
};

/**
 * Focus the input and select a specified range within the text.
 *
 * @param {number} from Select from offset
 * @param {number} [to] Select to offset, defaults to from
 * @chainable
 */
OO.ui.TextInputWidget.prototype.selectRange = function ( from, to ) {
	var isBackwards, start, end,
		input = this.$input[ 0 ];

	to = to || from;

	isBackwards = to < from;
	start = isBackwards ? to : from;
	end = isBackwards ? from : to;

	this.focus();

	try {
		input.setSelectionRange( start, end, isBackwards ? 'backward' : 'forward' );
	} catch ( e ) {
		// IE throws an exception if you call setSelectionRange on a unattached DOM node.
		// Rather than expensively check if the input is attached every time, just check
		// if it was the cause of an error being thrown. If not, rethrow the error.
		if ( this.getElementDocument().body.contains( input ) ) {
			throw e;
		}
	}
	return this;
};

/**
 * Get an object describing the current selection range in a directional manner
 *
 * @return {Object} Object containing 'from' and 'to' offsets
 */
OO.ui.TextInputWidget.prototype.getRange = function () {
	var input = this.$input[ 0 ],
		start = input.selectionStart,
		end = input.selectionEnd,
		isBackwards = input.selectionDirection === 'backward';

	return {
		from: isBackwards ? end : start,
		to: isBackwards ? start : end
	};
};

/**
 * Get the length of the text input value.
 *
 * This could differ from the length of #getValue if the
 * value gets filtered
 *
 * @return {number} Input length
 */
OO.ui.TextInputWidget.prototype.getInputLength = function () {
	return this.$input[ 0 ].value.length;
};

/**
 * Focus the input and select the entire text.
 *
 * @chainable
 */
OO.ui.TextInputWidget.prototype.select = function () {
	return this.selectRange( 0, this.getInputLength() );
};

/**
 * Focus the input and move the cursor to the start.
 *
 * @chainable
 */
OO.ui.TextInputWidget.prototype.moveCursorToStart = function () {
	return this.selectRange( 0 );
};

/**
 * Focus the input and move the cursor to the end.
 *
 * @chainable
 */
OO.ui.TextInputWidget.prototype.moveCursorToEnd = function () {
	return this.selectRange( this.getInputLength() );
};

/**
 * Insert new content into the input.
 *
 * @param {string} content Content to be inserted
 * @chainable
 */
OO.ui.TextInputWidget.prototype.insertContent = function ( content ) {
	var start, end,
		range = this.getRange(),
		value = this.getValue();

	start = Math.min( range.from, range.to );
	end = Math.max( range.from, range.to );

	this.setValue( value.slice( 0, start ) + content + value.slice( end ) );
	this.selectRange( start + content.length );
	return this;
};

/**
 * Insert new content either side of a selection.
 *
 * @param {string} pre Content to be inserted before the selection
 * @param {string} post Content to be inserted after the selection
 * @chainable
 */
OO.ui.TextInputWidget.prototype.encapsulateContent = function ( pre, post ) {
	var start, end,
		range = this.getRange(),
		offset = pre.length;

	start = Math.min( range.from, range.to );
	end = Math.max( range.from, range.to );

	this.selectRange( start ).insertContent( pre );
	this.selectRange( offset + end ).insertContent( post );

	this.selectRange( offset + start, offset + end );
	return this;
};

/**
 * Set the validation pattern.
 *
 * The validation pattern is either a regular expression, a function, or the symbolic name of a
 * pattern defined by the class: 'non-empty' (the value cannot be an empty string) or 'integer' (the
 * value must contain only numbers).
 *
 * @param {RegExp|Function|string|null} validate Regular expression, function, or the symbolic name
 *  of a pattern (either ‘integer’ or ‘non-empty’) defined by the class.
 */
OO.ui.TextInputWidget.prototype.setValidation = function ( validate ) {
	if ( validate instanceof RegExp || validate instanceof Function ) {
		this.validate = validate;
	} else {
		this.validate = this.constructor.static.validationPatterns[ validate ] || /.*/;
	}
};

/**
 * Sets the 'invalid' flag appropriately.
 *
 * @param {boolean} [isValid] Optionally override validation result
 */
OO.ui.TextInputWidget.prototype.setValidityFlag = function ( isValid ) {
	var widget = this,
		setFlag = function ( valid ) {
			if ( !valid ) {
				widget.$input.attr( 'aria-invalid', 'true' );
			} else {
				widget.$input.removeAttr( 'aria-invalid' );
			}
			widget.setFlags( { invalid: !valid } );
		};

	if ( isValid !== undefined ) {
		setFlag( isValid );
	} else {
		this.getValidity().then( function () {
			setFlag( true );
		}, function () {
			setFlag( false );
		} );
	}
};

/**
 * Get the validity of current value.
 *
 * This method returns a promise that resolves if the value is valid and rejects if
 * it isn't. Uses the {@link #validate validation pattern}  to check for validity.
 *
 * @return {jQuery.Promise} A promise that resolves if the value is valid, rejects if not.
 */
OO.ui.TextInputWidget.prototype.getValidity = function () {
	var result;

	function rejectOrResolve( valid ) {
		if ( valid ) {
			return $.Deferred().resolve().promise();
		} else {
			return $.Deferred().reject().promise();
		}
	}

	// Check browser validity and reject if it is invalid
	if (
		this.$input[ 0 ].checkValidity !== undefined &&
		this.$input[ 0 ].checkValidity() === false
	) {
		return rejectOrResolve( false );
	}

	// Run our checks if the browser thinks the field is valid
	if ( this.validate instanceof Function ) {
		result = this.validate( this.getValue() );
		if ( result && $.isFunction( result.promise ) ) {
			return result.promise().then( function ( valid ) {
				return rejectOrResolve( valid );
			} );
		} else {
			return rejectOrResolve( result );
		}
	} else {
		return rejectOrResolve( this.getValue().match( this.validate ) );
	}
};

/**
 * Set the position of the inline label relative to that of the value: `‘before’` or `‘after’`.
 *
 * @param {string} labelPosition Label position, 'before' or 'after'
 * @chainable
 */
OO.ui.TextInputWidget.prototype.setLabelPosition = function ( labelPosition ) {
	this.labelPosition = labelPosition;
	if ( this.label ) {
		// If there is no label and we only change the position, #updatePosition is a no-op,
		// but it takes really a lot of work to do nothing.
		this.updatePosition();
	}
	return this;
};

/**
 * Update the position of the inline label.
 *
 * This method is called by #setLabelPosition, and can also be called on its own if
 * something causes the label to be mispositioned.
 *
 * @chainable
 */
OO.ui.TextInputWidget.prototype.updatePosition = function () {
	var after = this.labelPosition === 'after';

	this.$element
		.toggleClass( 'oo-ui-textInputWidget-labelPosition-after', !!this.label && after )
		.toggleClass( 'oo-ui-textInputWidget-labelPosition-before', !!this.label && !after );

	this.valCache = null;
	this.scrollWidth = null;
	this.positionLabel();

	return this;
};

/**
 * Position the label by setting the correct padding on the input.
 *
 * @private
 * @chainable
 */
OO.ui.TextInputWidget.prototype.positionLabel = function () {
	var after, rtl, property, newCss;

	if ( this.isWaitingToBeAttached ) {
		// #onElementAttach will be called soon, which calls this method
		return this;
	}

	newCss = {
		'padding-right': '',
		'padding-left': ''
	};

	if ( this.label ) {
		this.$element.append( this.$label );
	} else {
		this.$label.detach();
		// Clear old values if present
		this.$input.css( newCss );
		return;
	}

	after = this.labelPosition === 'after';
	rtl = this.$element.css( 'direction' ) === 'rtl';
	property = after === rtl ? 'padding-left' : 'padding-right';

	newCss[ property ] = this.$label.outerWidth( true ) + ( after ? this.scrollWidth : 0 );
	// We have to clear the padding on the other side, in case the element direction changed
	this.$input.css( newCss );

	return this;
};

/**
 * @class
 * @extends OO.ui.TextInputWidget
 *
 * @constructor
 * @param {Object} [config] Configuration options
 */
OO.ui.SearchInputWidget = function OoUiSearchInputWidget( config ) {
	config = $.extend( {
		icon: 'search'
	}, config );

	// Parent constructor
	OO.ui.SearchInputWidget.parent.call( this, config );

	// Events
	this.connect( this, {
		change: 'onChange'
	} );

	// Initialization
	this.updateSearchIndicator();
	this.connect( this, {
		disable: 'onDisable'
	} );
};

/* Setup */

OO.inheritClass( OO.ui.SearchInputWidget, OO.ui.TextInputWidget );

/* Methods */

/**
 * @inheritdoc
 * @protected
 */
OO.ui.SearchInputWidget.prototype.getSaneType = function () {
	return 'search';
};

/**
 * @inheritdoc
 */
OO.ui.SearchInputWidget.prototype.onIndicatorMouseDown = function ( e ) {
	if ( e.which === OO.ui.MouseButtons.LEFT ) {
		// Clear the text field
		this.setValue( '' );
		this.focus();
		return false;
	}
};

/**
 * Update the 'clear' indicator displayed on type: 'search' text
 * fields, hiding it when the field is already empty or when it's not
 * editable.
 */
OO.ui.SearchInputWidget.prototype.updateSearchIndicator = function () {
	if ( this.getValue() === '' || this.isDisabled() || this.isReadOnly() ) {
		this.setIndicator( null );
	} else {
		this.setIndicator( 'clear' );
	}
};

/**
 * Handle change events.
 *
 * @private
 */
OO.ui.SearchInputWidget.prototype.onChange = function () {
	this.updateSearchIndicator();
};

/**
 * Handle disable events.
 *
 * @param {boolean} disabled Element is disabled
 * @private
 */
OO.ui.SearchInputWidget.prototype.onDisable = function () {
	this.updateSearchIndicator();
};

/**
 * @inheritdoc
 */
OO.ui.SearchInputWidget.prototype.setReadOnly = function ( state ) {
	OO.ui.SearchInputWidget.parent.prototype.setReadOnly.call( this, state );
	this.updateSearchIndicator();
	return this;
};

/**
 * @class
 * @extends OO.ui.TextInputWidget
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {number} [rows] Number of visible lines in textarea. If used with `autosize`,
 *  specifies minimum number of rows to display.
 * @cfg {boolean} [autosize=false] Automatically resize the text input to fit its content.
 *  Use the #maxRows config to specify a maximum number of displayed rows.
 * @cfg {number} [maxRows] Maximum number of rows to display when #autosize is set to true.
 *  Defaults to the maximum of `10` and `2 * rows`, or `10` if `rows` isn't provided.
 */
OO.ui.MultilineTextInputWidget = function OoUiMultilineTextInputWidget( config ) {
	config = $.extend( {
		type: 'text'
	}, config );
	config.multiline = false;
	// Parent constructor
	OO.ui.MultilineTextInputWidget.parent.call( this, config );

	// Properties
	this.multiline = true;
	this.autosize = !!config.autosize;
	this.minRows = config.rows !== undefined ? config.rows : '';
	this.maxRows = config.maxRows || Math.max( 2 * ( this.minRows || 0 ), 10 );

	// Clone for resizing
	if ( this.autosize ) {
		this.$clone = this.$input
			.clone()
			.insertAfter( this.$input )
			.attr( 'aria-hidden', 'true' )
			.addClass( 'oo-ui-element-hidden' );
	}

	// Events
	this.connect( this, {
		change: 'onChange'
	} );

	// Initialization
	if ( this.multiline && config.rows ) {
		this.$input.attr( 'rows', config.rows );
	}
	if ( this.autosize ) {
		this.$input.addClass( 'oo-ui-textInputWidget-autosized' );
		this.isWaitingToBeAttached = true;
		this.installParentChangeDetector();
	}
};

/* Setup */

OO.inheritClass( OO.ui.MultilineTextInputWidget, OO.ui.TextInputWidget );

/* Static Methods */

/**
 * @inheritdoc
 */
OO.ui.MultilineTextInputWidget.static.gatherPreInfuseState = function ( node, config ) {
	var state = OO.ui.MultilineTextInputWidget.parent.static.gatherPreInfuseState( node, config );
	state.scrollTop = config.$input.scrollTop();
	return state;
};

/* Methods */

/**
 * @inheritdoc
 */
OO.ui.MultilineTextInputWidget.prototype.onElementAttach = function () {
	OO.ui.MultilineTextInputWidget.parent.prototype.onElementAttach.call( this );
	this.adjustSize();
};

/**
 * Handle change events.
 *
 * @private
 */
OO.ui.MultilineTextInputWidget.prototype.onChange = function () {
	this.adjustSize();
};

/**
 * @inheritdoc
 */
OO.ui.MultilineTextInputWidget.prototype.updatePosition = function () {
	OO.ui.MultilineTextInputWidget.parent.prototype.updatePosition.call( this );
	this.adjustSize();
};

/**
 * @inheritdoc
 *
 * Modify to emit 'enter' on Ctrl/Meta+Enter, instead of plain Enter
 */
OO.ui.MultilineTextInputWidget.prototype.onKeyPress = function ( e ) {
	if (
		( e.which === OO.ui.Keys.ENTER && ( e.ctrlKey || e.metaKey ) ) ||
		// Some platforms emit keycode 10 for ctrl+enter in a textarea
		e.which === 10
	) {
		this.emit( 'enter', e );
	}
};

/**
 * Automatically adjust the size of the text input.
 *
 * This only affects multiline inputs that are {@link #autosize autosized}.
 *
 * @chainable
 * @fires resize
 */
OO.ui.MultilineTextInputWidget.prototype.adjustSize = function () {
	var scrollHeight, innerHeight, outerHeight, maxInnerHeight, measurementError,
		idealHeight, newHeight, scrollWidth, property;

	if ( this.$input.val() !== this.valCache ) {
		if ( this.autosize ) {
			this.$clone
				.val( this.$input.val() )
				.attr( 'rows', this.minRows )
				// Set inline height property to 0 to measure scroll height
				.css( 'height', 0 );

			this.$clone.removeClass( 'oo-ui-element-hidden' );

			this.valCache = this.$input.val();

			scrollHeight = this.$clone[ 0 ].scrollHeight;

			// Remove inline height property to measure natural heights
			this.$clone.css( 'height', '' );
			innerHeight = this.$clone.innerHeight();
			outerHeight = this.$clone.outerHeight();

			// Measure max rows height
			this.$clone
				.attr( 'rows', this.maxRows )
				.css( 'height', 'auto' )
				.val( '' );
			maxInnerHeight = this.$clone.innerHeight();

			// Difference between reported innerHeight and scrollHeight with no scrollbars present.
			// This is sometimes non-zero on Blink-based browsers, depending on zoom level.
			measurementError = maxInnerHeight - this.$clone[ 0 ].scrollHeight;
			idealHeight = Math.min( maxInnerHeight, scrollHeight + measurementError );

			this.$clone.addClass( 'oo-ui-element-hidden' );

			// Only apply inline height when expansion beyond natural height is needed
			// Use the difference between the inner and outer height as a buffer
			newHeight = idealHeight > innerHeight ? idealHeight + ( outerHeight - innerHeight ) : '';
			if ( newHeight !== this.styleHeight ) {
				this.$input.css( 'height', newHeight );
				this.styleHeight = newHeight;
				this.emit( 'resize' );
			}
		}
		scrollWidth = this.$input[ 0 ].offsetWidth - this.$input[ 0 ].clientWidth;
		if ( scrollWidth !== this.scrollWidth ) {
			property = this.$element.css( 'direction' ) === 'rtl' ? 'left' : 'right';
			// Reset
			this.$label.css( { right: '', left: '' } );
			this.$indicator.css( { right: '', left: '' } );

			if ( scrollWidth ) {
				this.$indicator.css( property, scrollWidth );
				if ( this.labelPosition === 'after' ) {
					this.$label.css( property, scrollWidth );
				}
			}

			this.scrollWidth = scrollWidth;
			this.positionLabel();
		}
	}
	return this;
};

/**
 * @inheritdoc
 * @protected
 */
OO.ui.MultilineTextInputWidget.prototype.getInputElement = function () {
	return $( '<textarea>' );
};

/**
 * Check if the input supports multiple lines.
 *
 * @return {boolean}
 */
OO.ui.MultilineTextInputWidget.prototype.isMultiline = function () {
	return !!this.multiline;
};

/**
 * Check if the input automatically adjusts its size.
 *
 * @return {boolean}
 */
OO.ui.MultilineTextInputWidget.prototype.isAutosizing = function () {
	return !!this.autosize;
};

/**
 * @inheritdoc
 */
OO.ui.MultilineTextInputWidget.prototype.restorePreInfuseState = function ( state ) {
	OO.ui.MultilineTextInputWidget.parent.prototype.restorePreInfuseState.call( this, state );
	if ( state.scrollTop !== undefined ) {
		this.$input.scrollTop( state.scrollTop );
	}
};

/**
 * ComboBoxInputWidgets combine a {@link OO.ui.TextInputWidget text input} (where a value
 * can be entered manually) and a {@link OO.ui.MenuSelectWidget menu of options} (from which
 * a value can be chosen instead). Users can choose options from the combo box in one of two ways:
 *
 * - by typing a value in the text input field. If the value exactly matches the value of a menu
 *   option, that option will appear to be selected.
 * - by choosing a value from the menu. The value of the chosen option will then appear in the text
 *   input field.
 *
 * After the user chooses an option, its `data` will be used as a new value for the widget.
 * A `label` also can be specified for each option: if given, it will be shown instead of the
 * `data` in the dropdown menu.
 *
 * This widget can be used inside an HTML form, such as a OO.ui.FormLayout.
 *
 * For more information about menus and options, please see the [OOUI documentation on MediaWiki][1].
 *
 *     @example
 *     // Example: A ComboBoxInputWidget.
 *     var comboBox = new OO.ui.ComboBoxInputWidget( {
 *         value: 'Option 1',
 *         options: [
 *             { data: 'Option 1' },
 *             { data: 'Option 2' },
 *             { data: 'Option 3' }
 *         ]
 *     } );
 *     $( 'body' ).append( comboBox.$element );
 *
 *     @example
 *     // Example: A ComboBoxInputWidget with additional option labels.
 *     var comboBox = new OO.ui.ComboBoxInputWidget( {
 *         value: 'Option 1',
 *         options: [
 *             {
 *                 data: 'Option 1',
 *                 label: 'Option One'
 *             },
 *             {
 *                 data: 'Option 2',
 *                 label: 'Option Two'
 *             },
 *             {
 *                 data: 'Option 3',
 *                 label: 'Option Three'
 *             }
 *         ]
 *     } );
 *     $( 'body' ).append( comboBox.$element );
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Widgets/Selects_and_Options#Menu_selects_and_options
 *
 * @class
 * @extends OO.ui.TextInputWidget
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {Object[]} [options=[]] Array of menu options in the format `{ data: …, label: … }`
 * @cfg {Object} [menu] Configuration options to pass to the {@link OO.ui.MenuSelectWidget menu select widget}.
 * @cfg {jQuery} [$overlay] Render the menu into a separate layer. This configuration is useful in cases where
 *  the expanded menu is larger than its containing `<div>`. The specified overlay layer is usually on top of the
 *  containing `<div>` and has a larger area. By default, the menu uses relative positioning.
 *  See <https://www.mediawiki.org/wiki/OOUI/Concepts#Overlays>.
 */
OO.ui.ComboBoxInputWidget = function OoUiComboBoxInputWidget( config ) {
	// Configuration initialization
	config = $.extend( {
		autocomplete: false
	}, config );

	// ComboBoxInputWidget shouldn't support `multiline`
	config.multiline = false;

	// See InputWidget#reusePreInfuseDOM about `config.$input`
	if ( config.$input ) {
		config.$input.removeAttr( 'list' );
	}

	// Parent constructor
	OO.ui.ComboBoxInputWidget.parent.call( this, config );

	// Properties
	this.$overlay = ( config.$overlay === true ? OO.ui.getDefaultOverlay() : config.$overlay ) || this.$element;
	this.dropdownButton = new OO.ui.ButtonWidget( {
		classes: [ 'oo-ui-comboBoxInputWidget-dropdownButton' ],
		indicator: 'down',
		disabled: this.disabled
	} );
	this.menu = new OO.ui.MenuSelectWidget( $.extend(
		{
			widget: this,
			input: this,
			$floatableContainer: this.$element,
			disabled: this.isDisabled()
		},
		config.menu
	) );

	// Events
	this.connect( this, {
		change: 'onInputChange',
		enter: 'onInputEnter'
	} );
	this.dropdownButton.connect( this, {
		click: 'onDropdownButtonClick'
	} );
	this.menu.connect( this, {
		choose: 'onMenuChoose',
		add: 'onMenuItemsChange',
		remove: 'onMenuItemsChange',
		toggle: 'onMenuToggle'
	} );

	// Initialization
	this.$input.attr( {
		role: 'combobox',
		'aria-owns': this.menu.getElementId(),
		'aria-autocomplete': 'list'
	} );
	// Do not override options set via config.menu.items
	if ( config.options !== undefined ) {
		this.setOptions( config.options );
	}
	this.$field = $( '<div>' )
		.addClass( 'oo-ui-comboBoxInputWidget-field' )
		.append( this.$input, this.dropdownButton.$element );
	this.$element
		.addClass( 'oo-ui-comboBoxInputWidget' )
		.append( this.$field );
	this.$overlay.append( this.menu.$element );
	this.onMenuItemsChange();
};

/* Setup */

OO.inheritClass( OO.ui.ComboBoxInputWidget, OO.ui.TextInputWidget );

/* Methods */

/**
 * Get the combobox's menu.
 *
 * @return {OO.ui.MenuSelectWidget} Menu widget
 */
OO.ui.ComboBoxInputWidget.prototype.getMenu = function () {
	return this.menu;
};

/**
 * Get the combobox's text input widget.
 *
 * @return {OO.ui.TextInputWidget} Text input widget
 */
OO.ui.ComboBoxInputWidget.prototype.getInput = function () {
	return this;
};

/**
 * Handle input change events.
 *
 * @private
 * @param {string} value New value
 */
OO.ui.ComboBoxInputWidget.prototype.onInputChange = function ( value ) {
	var match = this.menu.findItemFromData( value );

	this.menu.selectItem( match );
	if ( this.menu.findHighlightedItem() ) {
		this.menu.highlightItem( match );
	}

	if ( !this.isDisabled() ) {
		this.menu.toggle( true );
	}
};

/**
 * Handle input enter events.
 *
 * @private
 */
OO.ui.ComboBoxInputWidget.prototype.onInputEnter = function () {
	if ( !this.isDisabled() ) {
		this.menu.toggle( false );
	}
};

/**
 * Handle button click events.
 *
 * @private
 */
OO.ui.ComboBoxInputWidget.prototype.onDropdownButtonClick = function () {
	this.menu.toggle();
	this.focus();
};

/**
 * Handle menu choose events.
 *
 * @private
 * @param {OO.ui.OptionWidget} item Chosen item
 */
OO.ui.ComboBoxInputWidget.prototype.onMenuChoose = function ( item ) {
	this.setValue( item.getData() );
};

/**
 * Handle menu item change events.
 *
 * @private
 */
OO.ui.ComboBoxInputWidget.prototype.onMenuItemsChange = function () {
	var match = this.menu.findItemFromData( this.getValue() );
	this.menu.selectItem( match );
	if ( this.menu.findHighlightedItem() ) {
		this.menu.highlightItem( match );
	}
	this.$element.toggleClass( 'oo-ui-comboBoxInputWidget-empty', this.menu.isEmpty() );
};

/**
 * Handle menu toggle events.
 *
 * @private
 * @param {boolean} isVisible Open state of the menu
 */
OO.ui.ComboBoxInputWidget.prototype.onMenuToggle = function ( isVisible ) {
	this.$element.toggleClass( 'oo-ui-comboBoxInputWidget-open', isVisible );
};

/**
 * @inheritdoc
 */
OO.ui.ComboBoxInputWidget.prototype.setDisabled = function ( disabled ) {
	// Parent method
	OO.ui.ComboBoxInputWidget.parent.prototype.setDisabled.call( this, disabled );

	if ( this.dropdownButton ) {
		this.dropdownButton.setDisabled( this.isDisabled() );
	}
	if ( this.menu ) {
		this.menu.setDisabled( this.isDisabled() );
	}

	return this;
};

/**
 * Set the options available for this input.
 *
 * @param {Object[]} options Array of menu options in the format `{ data: …, label: … }`
 * @chainable
 */
OO.ui.ComboBoxInputWidget.prototype.setOptions = function ( options ) {
	this.getMenu()
		.clearItems()
		.addItems( options.map( function ( opt ) {
			return new OO.ui.MenuOptionWidget( {
				data: opt.data,
				label: opt.label !== undefined ? opt.label : opt.data
			} );
		} ) );

	return this;
};

/**
 * FieldLayouts are used with OO.ui.FieldsetLayout. Each FieldLayout requires a field-widget,
 * which is a widget that is specified by reference before any optional configuration settings.
 *
 * Field layouts can be configured with help text and/or labels. Labels are aligned in one of four ways:
 *
 * - **left**: The label is placed before the field-widget and aligned with the left margin.
 *   A left-alignment is used for forms with many fields.
 * - **right**: The label is placed before the field-widget and aligned to the right margin.
 *   A right-alignment is used for long but familiar forms which users tab through,
 *   verifying the current field with a quick glance at the label.
 * - **top**: The label is placed above the field-widget. A top-alignment is used for brief forms
 *   that users fill out from top to bottom.
 * - **inline**: The label is placed after the field-widget and aligned to the left.
 *   An inline-alignment is best used with checkboxes or radio buttons.
 *
 * Help text is accessed via a help icon that appears in the upper right corner of the rendered field layout.
 * Please see the [OOUI documentation on MediaWiki] [1] for examples and more information.
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Layouts/Fields_and_Fieldsets
 *
 * @class
 * @extends OO.ui.Layout
 * @mixins OO.ui.mixin.LabelElement
 * @mixins OO.ui.mixin.TitledElement
 *
 * @constructor
 * @param {OO.ui.Widget} fieldWidget Field widget
 * @param {Object} [config] Configuration options
 * @cfg {string} [align='left'] Alignment of the label: 'left', 'right', 'top' or 'inline'
 * @cfg {Array} [errors] Error messages about the widget, which will be displayed below the widget.
 *  The array may contain strings or OO.ui.HtmlSnippet instances.
 * @cfg {Array} [notices] Notices about the widget, which will be displayed below the widget.
 *  The array may contain strings or OO.ui.HtmlSnippet instances.
 * @cfg {string|OO.ui.HtmlSnippet} [help] Help text. When help text is specified, a "help" icon will appear
 *  in the upper-right corner of the rendered field; clicking it will display the text in a popup.
 *  For important messages, you are advised to use `notices`, as they are always shown.
 * @cfg {jQuery} [$overlay] Passed to OO.ui.PopupButtonWidget for help popup, if `help` is given.
 *  See <https://www.mediawiki.org/wiki/OOUI/Concepts#Overlays>.
 *
 * @throws {Error} An error is thrown if no widget is specified
 */
OO.ui.FieldLayout = function OoUiFieldLayout( fieldWidget, config ) {
	// Allow passing positional parameters inside the config object
	if ( OO.isPlainObject( fieldWidget ) && config === undefined ) {
		config = fieldWidget;
		fieldWidget = config.fieldWidget;
	}

	// Make sure we have required constructor arguments
	if ( fieldWidget === undefined ) {
		throw new Error( 'Widget not found' );
	}

	// Configuration initialization
	config = $.extend( { align: 'left' }, config );

	// Parent constructor
	OO.ui.FieldLayout.parent.call( this, config );

	// Mixin constructors
	OO.ui.mixin.LabelElement.call( this, $.extend( {}, config, {
		$label: $( '<label>' )
	} ) );
	OO.ui.mixin.TitledElement.call( this, $.extend( {}, config, { $titled: this.$label } ) );

	// Properties
	this.fieldWidget = fieldWidget;
	this.errors = [];
	this.notices = [];
	this.$field = this.isFieldInline() ? $( '<span>' ) : $( '<div>' );
	this.$messages = $( '<ul>' );
	this.$header = $( '<span>' );
	this.$body = $( '<div>' );
	this.align = null;
	if ( config.help ) {
		this.popupButtonWidget = new OO.ui.PopupButtonWidget( {
			$overlay: config.$overlay,
			popup: {
				padded: true
			},
			classes: [ 'oo-ui-fieldLayout-help' ],
			framed: false,
			icon: 'info'
		} );
		if ( config.help instanceof OO.ui.HtmlSnippet ) {
			this.popupButtonWidget.getPopup().$body.html( config.help.toString() );
		} else {
			this.popupButtonWidget.getPopup().$body.text( config.help );
		}
		this.$help = this.popupButtonWidget.$element;
	} else {
		this.$help = $( [] );
	}

	// Events
	this.fieldWidget.connect( this, { disable: 'onFieldDisable' } );

	// Initialization
	if ( config.help ) {
		// Set the 'aria-describedby' attribute on the fieldWidget
		// Preference given to an input or a button
		(
			this.fieldWidget.$input ||
			this.fieldWidget.$button ||
			this.fieldWidget.$element
		).attr(
			'aria-describedby',
			this.popupButtonWidget.getPopup().getBodyId()
		);
	}
	if ( this.fieldWidget.getInputId() ) {
		this.$label.attr( 'for', this.fieldWidget.getInputId() );
	} else {
		this.$label.on( 'click', function () {
			this.fieldWidget.simulateLabelClick();
		}.bind( this ) );
	}
	this.$element
		.addClass( 'oo-ui-fieldLayout' )
		.toggleClass( 'oo-ui-fieldLayout-disabled', this.fieldWidget.isDisabled() )
		.append( this.$body );
	this.$body.addClass( 'oo-ui-fieldLayout-body' );
	this.$header.addClass( 'oo-ui-fieldLayout-header' );
	this.$messages.addClass( 'oo-ui-fieldLayout-messages' );
	this.$field
		.addClass( 'oo-ui-fieldLayout-field' )
		.append( this.fieldWidget.$element );

	this.setErrors( config.errors || [] );
	this.setNotices( config.notices || [] );
	this.setAlignment( config.align );
	// Call this again to take into account the widget's accessKey
	this.updateTitle();
};

/* Setup */

OO.inheritClass( OO.ui.FieldLayout, OO.ui.Layout );
OO.mixinClass( OO.ui.FieldLayout, OO.ui.mixin.LabelElement );
OO.mixinClass( OO.ui.FieldLayout, OO.ui.mixin.TitledElement );

/* Methods */

/**
 * Handle field disable events.
 *
 * @private
 * @param {boolean} value Field is disabled
 */
OO.ui.FieldLayout.prototype.onFieldDisable = function ( value ) {
	this.$element.toggleClass( 'oo-ui-fieldLayout-disabled', value );
};

/**
 * Get the widget contained by the field.
 *
 * @return {OO.ui.Widget} Field widget
 */
OO.ui.FieldLayout.prototype.getField = function () {
	return this.fieldWidget;
};

/**
 * Return `true` if the given field widget can be used with `'inline'` alignment (see
 * #setAlignment). Return `false` if it can't or if this can't be determined.
 *
 * @return {boolean}
 */
OO.ui.FieldLayout.prototype.isFieldInline = function () {
	// This is very simplistic, but should be good enough.
	return this.getField().$element.prop( 'tagName' ).toLowerCase() === 'span';
};

/**
 * @protected
 * @param {string} kind 'error' or 'notice'
 * @param {string|OO.ui.HtmlSnippet} text
 * @return {jQuery}
 */
OO.ui.FieldLayout.prototype.makeMessage = function ( kind, text ) {
	var $listItem, $icon, message;
	$listItem = $( '<li>' );
	if ( kind === 'error' ) {
		$icon = new OO.ui.IconWidget( { icon: 'alert', flags: [ 'warning' ] } ).$element;
		$listItem.attr( 'role', 'alert' );
	} else if ( kind === 'notice' ) {
		$icon = new OO.ui.IconWidget( { icon: 'notice' } ).$element;
	} else {
		$icon = '';
	}
	message = new OO.ui.LabelWidget( { label: text } );
	$listItem
		.append( $icon, message.$element )
		.addClass( 'oo-ui-fieldLayout-messages-' + kind );
	return $listItem;
};

/**
 * Set the field alignment mode.
 *
 * @private
 * @param {string} value Alignment mode, either 'left', 'right', 'top' or 'inline'
 * @chainable
 */
OO.ui.FieldLayout.prototype.setAlignment = function ( value ) {
	if ( value !== this.align ) {
		// Default to 'left'
		if ( [ 'left', 'right', 'top', 'inline' ].indexOf( value ) === -1 ) {
			value = 'left';
		}
		// Validate
		if ( value === 'inline' && !this.isFieldInline() ) {
			value = 'top';
		}
		// Reorder elements
		if ( value === 'top' ) {
			this.$header.append( this.$help, this.$label );
			this.$body.append( this.$header, this.$field );
		} else if ( value === 'inline' ) {
			this.$header.append( this.$help, this.$label );
			this.$body.append( this.$field, this.$header );
		} else {
			this.$header.append( this.$label );
			this.$body.append( this.$header, this.$help, this.$field );
		}
		// Set classes. The following classes can be used here:
		// * oo-ui-fieldLayout-align-left
		// * oo-ui-fieldLayout-align-right
		// * oo-ui-fieldLayout-align-top
		// * oo-ui-fieldLayout-align-inline
		if ( this.align ) {
			this.$element.removeClass( 'oo-ui-fieldLayout-align-' + this.align );
		}
		this.$element.addClass( 'oo-ui-fieldLayout-align-' + value );
		this.align = value;
	}

	return this;
};

/**
 * Set the list of error messages.
 *
 * @param {Array} errors Error messages about the widget, which will be displayed below the widget.
 *  The array may contain strings or OO.ui.HtmlSnippet instances.
 * @chainable
 */
OO.ui.FieldLayout.prototype.setErrors = function ( errors ) {
	this.errors = errors.slice();
	this.updateMessages();
	return this;
};

/**
 * Set the list of notice messages.
 *
 * @param {Array} notices Notices about the widget, which will be displayed below the widget.
 *  The array may contain strings or OO.ui.HtmlSnippet instances.
 * @chainable
 */
OO.ui.FieldLayout.prototype.setNotices = function ( notices ) {
	this.notices = notices.slice();
	this.updateMessages();
	return this;
};

/**
 * Update the rendering of error and notice messages.
 *
 * @private
 */
OO.ui.FieldLayout.prototype.updateMessages = function () {
	var i;
	this.$messages.empty();

	if ( this.errors.length || this.notices.length ) {
		this.$body.after( this.$messages );
	} else {
		this.$messages.remove();
		return;
	}

	for ( i = 0; i < this.notices.length; i++ ) {
		this.$messages.append( this.makeMessage( 'notice', this.notices[ i ] ) );
	}
	for ( i = 0; i < this.errors.length; i++ ) {
		this.$messages.append( this.makeMessage( 'error', this.errors[ i ] ) );
	}
};

/**
 * Include information about the widget's accessKey in our title. TitledElement calls this method.
 * (This is a bit of a hack.)
 *
 * @protected
 * @param {string} title Tooltip label for 'title' attribute
 * @return {string}
 */
OO.ui.FieldLayout.prototype.formatTitleWithAccessKey = function ( title ) {
	if ( this.fieldWidget && this.fieldWidget.formatTitleWithAccessKey ) {
		return this.fieldWidget.formatTitleWithAccessKey( title );
	}
	return title;
};

/**
 * ActionFieldLayouts are used with OO.ui.FieldsetLayout. The layout consists of a field-widget, a button,
 * and an optional label and/or help text. The field-widget (e.g., a {@link OO.ui.TextInputWidget TextInputWidget}),
 * is required and is specified before any optional configuration settings.
 *
 * Labels can be aligned in one of four ways:
 *
 * - **left**: The label is placed before the field-widget and aligned with the left margin.
 *   A left-alignment is used for forms with many fields.
 * - **right**: The label is placed before the field-widget and aligned to the right margin.
 *   A right-alignment is used for long but familiar forms which users tab through,
 *   verifying the current field with a quick glance at the label.
 * - **top**: The label is placed above the field-widget. A top-alignment is used for brief forms
 *   that users fill out from top to bottom.
 * - **inline**: The label is placed after the field-widget and aligned to the left.
 *   An inline-alignment is best used with checkboxes or radio buttons.
 *
 * Help text is accessed via a help icon that appears in the upper right corner of the rendered field layout when help
 * text is specified.
 *
 *     @example
 *     // Example of an ActionFieldLayout
 *     var actionFieldLayout = new OO.ui.ActionFieldLayout(
 *         new OO.ui.TextInputWidget( {
 *             placeholder: 'Field widget'
 *         } ),
 *         new OO.ui.ButtonWidget( {
 *             label: 'Button'
 *         } ),
 *         {
 *             label: 'An ActionFieldLayout. This label is aligned top',
 *             align: 'top',
 *             help: 'This is help text'
 *         }
 *     );
 *
 *     $( 'body' ).append( actionFieldLayout.$element );
 *
 * @class
 * @extends OO.ui.FieldLayout
 *
 * @constructor
 * @param {OO.ui.Widget} fieldWidget Field widget
 * @param {OO.ui.ButtonWidget} buttonWidget Button widget
 * @param {Object} config
 */
OO.ui.ActionFieldLayout = function OoUiActionFieldLayout( fieldWidget, buttonWidget, config ) {
	// Allow passing positional parameters inside the config object
	if ( OO.isPlainObject( fieldWidget ) && config === undefined ) {
		config = fieldWidget;
		fieldWidget = config.fieldWidget;
		buttonWidget = config.buttonWidget;
	}

	// Parent constructor
	OO.ui.ActionFieldLayout.parent.call( this, fieldWidget, config );

	// Properties
	this.buttonWidget = buttonWidget;
	this.$button = $( '<span>' );
	this.$input = this.isFieldInline() ? $( '<span>' ) : $( '<div>' );

	// Initialization
	this.$element
		.addClass( 'oo-ui-actionFieldLayout' );
	this.$button
		.addClass( 'oo-ui-actionFieldLayout-button' )
		.append( this.buttonWidget.$element );
	this.$input
		.addClass( 'oo-ui-actionFieldLayout-input' )
		.append( this.fieldWidget.$element );
	this.$field
		.append( this.$input, this.$button );
};

/* Setup */

OO.inheritClass( OO.ui.ActionFieldLayout, OO.ui.FieldLayout );

/**
 * FieldsetLayouts are composed of one or more {@link OO.ui.FieldLayout FieldLayouts},
 * which each contain an individual widget and, optionally, a label. Each Fieldset can be
 * configured with a label as well. For more information and examples,
 * please see the [OOUI documentation on MediaWiki][1].
 *
 *     @example
 *     // Example of a fieldset layout
 *     var input1 = new OO.ui.TextInputWidget( {
 *         placeholder: 'A text input field'
 *     } );
 *
 *     var input2 = new OO.ui.TextInputWidget( {
 *         placeholder: 'A text input field'
 *     } );
 *
 *     var fieldset = new OO.ui.FieldsetLayout( {
 *         label: 'Example of a fieldset layout'
 *     } );
 *
 *     fieldset.addItems( [
 *         new OO.ui.FieldLayout( input1, {
 *             label: 'Field One'
 *         } ),
 *         new OO.ui.FieldLayout( input2, {
 *             label: 'Field Two'
 *         } )
 *     ] );
 *     $( 'body' ).append( fieldset.$element );
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Layouts/Fields_and_Fieldsets
 *
 * @class
 * @extends OO.ui.Layout
 * @mixins OO.ui.mixin.IconElement
 * @mixins OO.ui.mixin.LabelElement
 * @mixins OO.ui.mixin.GroupElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {OO.ui.FieldLayout[]} [items] An array of fields to add to the fieldset. See OO.ui.FieldLayout for more information about fields.
 * @cfg {string|OO.ui.HtmlSnippet} [help] Help text. When help text is specified, a "help" icon will appear
 *  in the upper-right corner of the rendered field; clicking it will display the text in a popup.
 *  For important messages, you are advised to use `notices`, as they are always shown.
 * @cfg {jQuery} [$overlay] Passed to OO.ui.PopupButtonWidget for help popup, if `help` is given.
 *  See <https://www.mediawiki.org/wiki/OOUI/Concepts#Overlays>.
 */
OO.ui.FieldsetLayout = function OoUiFieldsetLayout( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.FieldsetLayout.parent.call( this, config );

	// Mixin constructors
	OO.ui.mixin.IconElement.call( this, config );
	OO.ui.mixin.LabelElement.call( this, config );
	OO.ui.mixin.GroupElement.call( this, config );

	// Properties
	this.$header = $( '<legend>' );
	if ( config.help ) {
		this.popupButtonWidget = new OO.ui.PopupButtonWidget( {
			$overlay: config.$overlay,
			popup: {
				padded: true
			},
			classes: [ 'oo-ui-fieldsetLayout-help' ],
			framed: false,
			icon: 'info'
		} );
		if ( config.help instanceof OO.ui.HtmlSnippet ) {
			this.popupButtonWidget.getPopup().$body.html( config.help.toString() );
		} else {
			this.popupButtonWidget.getPopup().$body.text( config.help );
		}
		this.$help = this.popupButtonWidget.$element;
	} else {
		this.$help = $( [] );
	}

	// Initialization
	this.$header
		.addClass( 'oo-ui-fieldsetLayout-header' )
		.append( this.$icon, this.$label, this.$help );
	this.$group.addClass( 'oo-ui-fieldsetLayout-group' );
	this.$element
		.addClass( 'oo-ui-fieldsetLayout' )
		.prepend( this.$header, this.$group );
	if ( Array.isArray( config.items ) ) {
		this.addItems( config.items );
	}
};

/* Setup */

OO.inheritClass( OO.ui.FieldsetLayout, OO.ui.Layout );
OO.mixinClass( OO.ui.FieldsetLayout, OO.ui.mixin.IconElement );
OO.mixinClass( OO.ui.FieldsetLayout, OO.ui.mixin.LabelElement );
OO.mixinClass( OO.ui.FieldsetLayout, OO.ui.mixin.GroupElement );

/* Static Properties */

/**
 * @static
 * @inheritdoc
 */
OO.ui.FieldsetLayout.static.tagName = 'fieldset';

/**
 * FormLayouts are used to wrap {@link OO.ui.FieldsetLayout FieldsetLayouts} when you intend to use browser-based
 * form submission for the fields instead of handling them in JavaScript. Form layouts can be configured with an
 * HTML form action, an encoding type, and a method using the #action, #enctype, and #method configs, respectively.
 * See the [OOUI documentation on MediaWiki] [1] for more information and examples.
 *
 * Only widgets from the {@link OO.ui.InputWidget InputWidget} family support form submission. It
 * includes standard form elements like {@link OO.ui.CheckboxInputWidget checkboxes}, {@link
 * OO.ui.RadioInputWidget radio buttons} and {@link OO.ui.TextInputWidget text fields}, as well as
 * some fancier controls. Some controls have both regular and InputWidget variants, for example
 * OO.ui.DropdownWidget and OO.ui.DropdownInputWidget – only the latter support form submission and
 * often have simplified APIs to match the capabilities of HTML forms.
 * See the [OOUI documentation on MediaWiki] [2] for more information about InputWidgets.
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Layouts/Forms
 * [2]: https://www.mediawiki.org/wiki/OOUI/Widgets/Inputs
 *
 *     @example
 *     // Example of a form layout that wraps a fieldset layout
 *     var input1 = new OO.ui.TextInputWidget( {
 *         placeholder: 'Username'
 *     } );
 *     var input2 = new OO.ui.TextInputWidget( {
 *         placeholder: 'Password',
 *         type: 'password'
 *     } );
 *     var submit = new OO.ui.ButtonInputWidget( {
 *         label: 'Submit'
 *     } );
 *
 *     var fieldset = new OO.ui.FieldsetLayout( {
 *         label: 'A form layout'
 *     } );
 *     fieldset.addItems( [
 *         new OO.ui.FieldLayout( input1, {
 *             label: 'Username',
 *             align: 'top'
 *         } ),
 *         new OO.ui.FieldLayout( input2, {
 *             label: 'Password',
 *             align: 'top'
 *         } ),
 *         new OO.ui.FieldLayout( submit )
 *     ] );
 *     var form = new OO.ui.FormLayout( {
 *         items: [ fieldset ],
 *         action: '/api/formhandler',
 *         method: 'get'
 *     } )
 *     $( 'body' ).append( form.$element );
 *
 * @class
 * @extends OO.ui.Layout
 * @mixins OO.ui.mixin.GroupElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {string} [method] HTML form `method` attribute
 * @cfg {string} [action] HTML form `action` attribute
 * @cfg {string} [enctype] HTML form `enctype` attribute
 * @cfg {OO.ui.FieldsetLayout[]} [items] Fieldset layouts to add to the form layout.
 */
OO.ui.FormLayout = function OoUiFormLayout( config ) {
	var action;

	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.FormLayout.parent.call( this, config );

	// Mixin constructors
	OO.ui.mixin.GroupElement.call( this, $.extend( {}, config, { $group: this.$element } ) );

	// Events
	this.$element.on( 'submit', this.onFormSubmit.bind( this ) );

	// Make sure the action is safe
	action = config.action;
	if ( action !== undefined && !OO.ui.isSafeUrl( action ) ) {
		action = './' + action;
	}

	// Initialization
	this.$element
		.addClass( 'oo-ui-formLayout' )
		.attr( {
			method: config.method,
			action: action,
			enctype: config.enctype
		} );
	if ( Array.isArray( config.items ) ) {
		this.addItems( config.items );
	}
};

/* Setup */

OO.inheritClass( OO.ui.FormLayout, OO.ui.Layout );
OO.mixinClass( OO.ui.FormLayout, OO.ui.mixin.GroupElement );

/* Events */

/**
 * A 'submit' event is emitted when the form is submitted.
 *
 * @event submit
 */

/* Static Properties */

/**
 * @static
 * @inheritdoc
 */
OO.ui.FormLayout.static.tagName = 'form';

/* Methods */

/**
 * Handle form submit events.
 *
 * @private
 * @param {jQuery.Event} e Submit event
 * @fires submit
 */
OO.ui.FormLayout.prototype.onFormSubmit = function () {
	if ( this.emit( 'submit' ) ) {
		return false;
	}
};

/**
 * PanelLayouts expand to cover the entire area of their parent. They can be configured with scrolling, padding,
 * and a frame, and are often used together with {@link OO.ui.StackLayout StackLayouts}.
 *
 *     @example
 *     // Example of a panel layout
 *     var panel = new OO.ui.PanelLayout( {
 *         expanded: false,
 *         framed: true,
 *         padded: true,
 *         $content: $( '<p>A panel layout with padding and a frame.</p>' )
 *     } );
 *     $( 'body' ).append( panel.$element );
 *
 * @class
 * @extends OO.ui.Layout
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {boolean} [scrollable=false] Allow vertical scrolling
 * @cfg {boolean} [padded=false] Add padding between the content and the edges of the panel.
 * @cfg {boolean} [expanded=true] Expand the panel to fill the entire parent element.
 * @cfg {boolean} [framed=false] Render the panel with a frame to visually separate it from outside content.
 */
OO.ui.PanelLayout = function OoUiPanelLayout( config ) {
	// Configuration initialization
	config = $.extend( {
		scrollable: false,
		padded: false,
		expanded: true,
		framed: false
	}, config );

	// Parent constructor
	OO.ui.PanelLayout.parent.call( this, config );

	// Initialization
	this.$element.addClass( 'oo-ui-panelLayout' );
	if ( config.scrollable ) {
		this.$element.addClass( 'oo-ui-panelLayout-scrollable' );
	}
	if ( config.padded ) {
		this.$element.addClass( 'oo-ui-panelLayout-padded' );
	}
	if ( config.expanded ) {
		this.$element.addClass( 'oo-ui-panelLayout-expanded' );
	}
	if ( config.framed ) {
		this.$element.addClass( 'oo-ui-panelLayout-framed' );
	}
};

/* Setup */

OO.inheritClass( OO.ui.PanelLayout, OO.ui.Layout );

/* Methods */

/**
 * Focus the panel layout
 *
 * The default implementation just focuses the first focusable element in the panel
 */
OO.ui.PanelLayout.prototype.focus = function () {
	OO.ui.findFocusable( this.$element ).focus();
};

/**
 * HorizontalLayout arranges its contents in a single line (using `display: inline-block` for its
 * items), with small margins between them. Convenient when you need to put a number of block-level
 * widgets on a single line next to each other.
 *
 * Note that inline elements, such as OO.ui.ButtonWidgets, do not need this wrapper.
 *
 *     @example
 *     // HorizontalLayout with a text input and a label
 *     var layout = new OO.ui.HorizontalLayout( {
 *       items: [
 *         new OO.ui.LabelWidget( { label: 'Label' } ),
 *         new OO.ui.TextInputWidget( { value: 'Text' } )
 *       ]
 *     } );
 *     $( 'body' ).append( layout.$element );
 *
 * @class
 * @extends OO.ui.Layout
 * @mixins OO.ui.mixin.GroupElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {OO.ui.Widget[]|OO.ui.Layout[]} [items] Widgets or other layouts to add to the layout.
 */
OO.ui.HorizontalLayout = function OoUiHorizontalLayout( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.HorizontalLayout.parent.call( this, config );

	// Mixin constructors
	OO.ui.mixin.GroupElement.call( this, $.extend( {}, config, { $group: this.$element } ) );

	// Initialization
	this.$element.addClass( 'oo-ui-horizontalLayout' );
	if ( Array.isArray( config.items ) ) {
		this.addItems( config.items );
	}
};

/* Setup */

OO.inheritClass( OO.ui.HorizontalLayout, OO.ui.Layout );
OO.mixinClass( OO.ui.HorizontalLayout, OO.ui.mixin.GroupElement );

}( OO ) );

//# sourceMappingURL=oojs-ui-core.js.map