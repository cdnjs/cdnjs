/*!
 * OOUI v0.33.1
 * https://www.mediawiki.org/wiki/OOUI
 *
 * Copyright 2011–2019 OOUI Team and other contributors.
 * Released under the MIT license
 * http://oojs.mit-license.org
 *
 * Date: 2019-07-03T21:05:08Z
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
 * Find a focusable child.
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
 * Check if a node is contained within another node.
 *
 * Similar to jQuery#contains except a list of containers can be supplied
 * and a boolean argument allows you to include the container in the match list
 *
 * @param {HTMLElement|HTMLElement[]} containers Container node(s) to search in
 * @param {HTMLElement} contained Node to find
 * @param {boolean} [matchContainers] Include the container(s) in the list of nodes to match,
 *  otherwise only match descendants
 * @return {boolean} The node is in the list of target nodes
 */
OO.ui.contains = function ( containers, contained, matchContainers ) {
	var i;
	if ( !Array.isArray( containers ) ) {
		containers = [ containers ];
	}
	for ( i = containers.length - 1; i >= 0; i-- ) {
		if (
			( matchContainers && contained === containers[ i ] ) ||
			$.contains( containers[ i ], contained )
		) {
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
		previous = Date.now() - wait,
		run = function () {
			timeout = null;
			previous = Date.now();
			func.apply( context, args );
		};
	return function () {
		// Check how long it's been since the last time the function was
		// called, and whether it's more or less than the requested throttle
		// period. If it's less, run the function immediately. If it's more,
		// set a timeout for the remaining time -- but don't replace an
		// existing timeout, since that'd indefinitely prolong the wait.
		var remaining = Math.max( wait - ( Date.now() - previous ), 0 );
		context = this;
		args = arguments;
		if ( !timeout ) {
			// If time is up, do setTimeout( run, 0 ) so the function
			// always runs asynchronously, just like Promise#then .
			timeout = setTimeout( run, remaining );
		}
	};
};

/**
 * Reconstitute a JavaScript object corresponding to a widget created by
 * the PHP implementation.
 *
 * This is an alias for `OO.ui.Element.static.infuse()`.
 *
 * @param {string|HTMLElement|jQuery} idOrNode
 *   A DOM id (if a string) or node for the widget to infuse.
 * @param {Object} [config] Configuration options
 * @return {OO.ui.Element}
 *   The `OO.ui.Element` corresponding to this (infusable) document node.
 */
OO.ui.infuse = function ( idOrNode, config ) {
	return OO.ui.Element.static.infuse( idOrNode, config );
};

/**
 * Get a localized message.
 *
 * After the message key, message parameters may optionally be passed. In the default
 * implementation, any occurrences of $1 are replaced with the first parameter, $2 with the
 * second parameter, etc.
 * Alternative implementations of OO.ui.msg may use any substitution system they like, as long
 * as they support unnamed, ordered message parameters.
 *
 * In environments that provide a localization system, this function should be overridden to
 * return the message translated in the user's language. The default implementation always
 * returns English messages. An example of doing this with
 * [jQuery.i18n](https://github.com/wikimedia/jquery.i18n) follows.
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
 *         $( document.body ).append( button.$element );
 *
 *         // A button displaying "OK" in Urdu
 *         $.i18n().locale = 'ur';
 *         button = new OO.ui.ButtonWidget( {
 *             label: OO.ui.msg( 'ooui-dialog-message-accept' ),
 *             icon: 'check'
 *         } );
 *         $( document.body ).append( button.$element );
 *     } );
 *
 * @param {string} key Message key
 * @param {...Mixed} [params] Message parameters
 * @return {string} Translated message with parameters substituted
 */
OO.ui.msg = function ( key ) {
	// `OO.ui.msg.messages` is defined in code generated during the build process
	var messages = OO.ui.msg.messages,
		message = messages[ key ],
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
	if ( typeof msg === 'function' ) {
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
 *  the extra spacing from that edge of viewport (in pixels)
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
		$( document.body ).append( OO.ui.$defaultOverlay );
	}
	return OO.ui.$defaultOverlay;
};

/**
 * Message store for the default implementation of OO.ui.msg.
 *
 * Environments that provide a localization system should not use this, but should override
 * OO.ui.msg altogether.
 *
 * @private
 */
OO.ui.msg.messages = {
	"ooui-outline-control-move-down": "Move item down",
	"ooui-outline-control-move-up": "Move item up",
	"ooui-outline-control-remove": "Remove item",
	"ooui-toolbar-more": "More",
	"ooui-toolgroup-expand": "More",
	"ooui-toolgroup-collapse": "Fewer",
	"ooui-item-remove": "Remove",
	"ooui-dialog-message-accept": "OK",
	"ooui-dialog-message-reject": "Cancel",
	"ooui-dialog-process-error": "Something went wrong",
	"ooui-dialog-process-dismiss": "Dismiss",
	"ooui-dialog-process-retry": "Try again",
	"ooui-dialog-process-continue": "Continue",
	"ooui-combobox-button-label": "Dropdown for combobox",
	"ooui-selectfile-button-select": "Select a file",
	"ooui-selectfile-not-supported": "File selection is not supported",
	"ooui-selectfile-placeholder": "No file is selected",
	"ooui-selectfile-dragdrop-placeholder": "Drop file here",
	"ooui-field-help": "Help"
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
 * that is visible to a user. Unlike {@link OO.ui.Widget widgets}, plain elements usually do not
 * have events connected to them and can't be interacted with.
 *
 * @abstract
 * @class
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {string[]} [classes] The names of the CSS classes to apply to the element. CSS styles are
 *  added to the top level (e.g., the outermost div) of the element. See the
 *  [OOUI documentation on MediaWiki][2] for an example.
 *  [2]: https://www.mediawiki.org/wiki/OOUI/Widgets/Buttons_and_Switches#cssExample
 * @cfg {string} [id] The HTML id attribute used in the rendered tag.
 * @cfg {string} [text] Text to insert
 * @cfg {Array} [content] An array of content elements to append (after #text).
 *  Strings will be html-escaped; use an OO.ui.HtmlSnippet to append raw HTML.
 *  Instances of OO.ui.Element will have their $element appended.
 * @cfg {jQuery} [$content] Content elements to append (after #text).
 * @cfg {jQuery} [$element] Wrapper element. Defaults to a new element with #getTagName.
 * @cfg {Mixed} [data] Custom data of any type or combination of types (e.g., string, number,
 *  array, object).
 *  Data can also be specified with the #setData method.
 */
OO.ui.Element = function OoUiElement( config ) {
	if ( OO.ui.isDemo ) {
		this.initialConfig = config;
	}
	// Configuration initialization
	config = config || {};

	// Properties
	this.elementId = null;
	this.visible = true;
	this.data = config.data;
	this.$element = config.$element ||
		$( document.createElement( this.getTagName() ) );
	this.elementGroup = null;

	// Initialization
	if ( Array.isArray( config.classes ) ) {
		this.$element.addClass( config.classes );
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
				// Don't create empty text nodes for empty strings.
				return v ? document.createTextNode( v ) : undefined;
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
 * @param {Object} [config] Configuration options
 * @return {OO.ui.Element}
 *   The `OO.ui.Element` corresponding to this (infusable) document node.
 *   For `Tag` objects emitted on the HTML side (used occasionally for content)
 *   the value returned is a newly-created Element wrapping around the existing
 *   DOM node.
 */
OO.ui.Element.static.infuse = function ( idOrNode, config ) {
	var obj = OO.ui.Element.static.unsafeInfuse( idOrNode, config, false );

	if ( typeof idOrNode === 'string' ) {
		// IDs deprecated since 0.29.7
		OO.ui.warnDeprecation(
			'Passing a string ID to infuse is deprecated. Use an HTMLElement or jQuery collection instead.'
		);
	}
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
 * @param {Object} [config] Configuration options
 * @param {jQuery.Promise} [domPromise] A promise that will be resolved
 *     when the top-level widget of this infusion is inserted into DOM,
 *     replacing the original node; only used internally.
 * @return {OO.ui.Element}
 */
OO.ui.Element.static.unsafeInfuse = function ( idOrNode, config, domPromise ) {
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
			// Pick up dynamic state, like focus, value of form inputs, scroll position, etc.
			state = data.constructor.static.gatherPreInfuseState( $elem, data );
			// Restore dynamic state after the new element is re-inserted into DOM under
			// infused parent.
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
		return new OO.ui.Element( $.extend( {}, config, { $element: $elem } ) );
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

	if ( !domPromise ) {
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
				infused = OO.ui.Element.static.unsafeInfuse( value.tag, config, domPromise );
				infusedChildren.push( infused );
				// Flatten the structure
				infusedChildren.push.apply(
					infusedChildren,
					infused.$element.data( 'ooui-infused-children' ) || []
				);
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
	obj = new cls( $.extend( {}, config, data ) );
	// If anyone is holding a reference to the old DOM element,
	// let's allow them to OO.ui.infuse() it and do what they expect, see T105828.
	// Do not use jQuery.data(), as using it on detached nodes leaks memory in 1.x line by design.
	$elem[ 0 ].oouiInfused = obj.$element;
	// now replace old DOM with this new DOM.
	if ( top ) {
		// An efficient constructor might be able to reuse the entire DOM tree of the original
		// element, so only mutate the DOM if we need to.
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
 * Gather the dynamic state (focus, value of form inputs, scroll position, etc.) of an HTML DOM
 * node (and its children) that represent an Element of the same class and the given configuration,
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

	if ( obj instanceof $ ) {
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
 *  If the element's direction is LTR, this is a positive number between `0` (initial scroll
 *  position) and `el.scrollWidth - el.clientWidth` (furthest possible scroll position).
 *  If the element's direction is RTL, this is a negative number between `0` (initial scroll
 *  position) and `-el.scrollWidth + el.clientWidth` (furthest possible scroll position).
 */
OO.ui.Element.static.getScrollLeft = ( function () {
	var rtlScrollType = null;

	function test() {
		var $definer = $( '<div>' ).attr( {
				dir: 'rtl',
				style: 'font-size: 14px; width: 4px; height: 1px; position: absolute; top: -1000px; overflow: scroll;'
			} ).text( 'ABCD' ),
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

	// Special case for the document root (which doesn't really have any scrollable container,
	// since it is the ultimate scrollable container, but this is probably saner than null or
	// exception).
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
			// We assume that elements with 'overflow' (in any direction) set to 'hidden' will
			// never be scrolled in that direction, but they can actually be scrolled
			// programatically. The user can unintentionally perform a scroll in such case even if
			// the application doesn't scroll programatically, e.g. when jumping to an anchor, or
			// when using built-in find functionality.
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
 * @param {HTMLElement|Object} elOrPosition Element to scroll into view
 * @param {Object} [config] Configuration options
 * @param {string} [config.animate=true] Animate to the new scroll offset.
 * @param {string} [config.duration='fast'] jQuery animation duration value
 * @param {string} [config.direction] Scroll in only one direction, e.g. 'x' or 'y', omit
 *  to scroll in both directions
 * @param {Object} [config.padding] Additional padding on the container to scroll past.
 *  Object containing any of 'top', 'bottom', 'left', or 'right' as numbers.
 * @param {Object} [config.scrollContainer] Scroll container. Defaults to
 *  getClosestScrollableContainer of the element.
 * @return {jQuery.Promise} Promise which resolves when the scroll is complete
 */
OO.ui.Element.static.scrollIntoView = function ( elOrPosition, config ) {
	var position, animations, container, $container, elementPosition, containerDimensions,
		$window, padding, animate, method,
		deferred = $.Deferred();

	// Configuration initialization
	config = config || {};

	padding = $.extend( {
		top: 0,
		bottom: 0,
		left: 0,
		right: 0
	}, config.padding );

	animate = config.animate !== false;

	animations = {};
	elementPosition = elOrPosition instanceof HTMLElement ?
		this.getDimensions( elOrPosition ).rect :
		elOrPosition;
	container = config.scrollContainer || (
		elOrPosition instanceof HTMLElement ?
			this.getClosestScrollableContainer( elOrPosition, config.direction ) :
			// No scrollContainer or element
			this.getClosestScrollableContainer( document.body )
	);
	$container = $( container );
	containerDimensions = this.getDimensions( container );
	$window = $( this.getWindow( container ) );

	// Compute the element's position relative to the container
	if ( $container.is( 'html, body' ) ) {
		// If the scrollable container is the root, this is easy
		position = {
			top: elementPosition.top,
			bottom: $window.innerHeight() - elementPosition.bottom,
			left: elementPosition.left,
			right: $window.innerWidth() - elementPosition.right
		};
	} else {
		// Otherwise, we have to subtract el's coordinates from container's coordinates
		position = {
			top: elementPosition.top -
				( containerDimensions.rect.top + containerDimensions.borders.top ),
			bottom: containerDimensions.rect.bottom - containerDimensions.borders.bottom -
				containerDimensions.scrollbar.bottom - elementPosition.bottom,
			left: elementPosition.left -
				( containerDimensions.rect.left + containerDimensions.borders.left ),
			right: containerDimensions.rect.right - containerDimensions.borders.right -
				containerDimensions.scrollbar.right - elementPosition.right
		};
	}

	if ( !config.direction || config.direction === 'y' ) {
		if ( position.top < padding.top ) {
			animations.scrollTop = containerDimensions.scroll.top + position.top - padding.top;
		} else if ( position.bottom < padding.bottom ) {
			animations.scrollTop = containerDimensions.scroll.top +
				// Scroll the bottom into view, but not at the expense
				// of scrolling the top out of view
				Math.min( position.top - padding.top, -position.bottom + padding.bottom );
		}
	}
	if ( !config.direction || config.direction === 'x' ) {
		if ( position.left < padding.left ) {
			animations.scrollLeft = containerDimensions.scroll.left + position.left - padding.left;
		} else if ( position.right < padding.right ) {
			animations.scrollLeft = containerDimensions.scroll.left +
				// Scroll the right into view, but not at the expense
				// of scrolling the left out of view
				Math.min( position.left - padding.left, -position.right + padding.right );
		}
	}
	if ( !$.isEmptyObject( animations ) ) {
		if ( animate ) {
			// eslint-disable-next-line no-jquery/no-animate
			$container.stop( true ).animate( animations, config.duration === undefined ? 'fast' : config.duration );
			$container.queue( function ( next ) {
				deferred.resolve();
				next();
			} );
		} else {
			$container.stop( true );
			for ( method in animations ) {
				$container[ method ]( animations[ method ] );
			}
			deferred.resolve();
		}
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
 * to first actually detach (or hide, but detaching is simpler) all children, *then* force a
 * reflow, and then reattach (or show) them back.
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
	// eslint-disable-next-line no-void
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
 * @return {OO.ui.Element} The element, for chaining
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
 * @return {OO.ui.Element} The element, for chaining
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
 * @return {OO.ui.Element} The element, for chaining
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
		if ( typeof this[ methods[ i ] ] === 'function' ) {
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
 * @return {OO.ui.Element} The element, for chaining
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
 * Layouts are containers for elements and are used to arrange other widgets of arbitrary type in
 * a way that is centrally controlled and can be updated dynamically. Layouts can be, and usually
 * are, combined.
 * See {@link OO.ui.FieldsetLayout FieldsetLayout}, {@link OO.ui.FieldLayout FieldLayout},
 * {@link OO.ui.FormLayout FormLayout}, {@link OO.ui.PanelLayout PanelLayout},
 * {@link OO.ui.StackLayout StackLayout}, {@link OO.ui.PageLayout PageLayout},
 * {@link OO.ui.HorizontalLayout HorizontalLayout}, and {@link OO.ui.BookletLayout BookletLayout}
 * for more information and examples.
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

/* Methods */

/**
 * Reset scroll offsets
 *
 * @chainable
 * @return {OO.ui.Layout} The layout, for chaining
 */
OO.ui.Layout.prototype.resetScroll = function () {
	this.$element[ 0 ].scrollTop = 0;
	// TODO: Reset scrollLeft in an RTL-aware manner, see OO.ui.Element.static.getScrollLeft.

	return this;
};

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
 * @return {OO.ui.Widget} The widget, for chaining
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
 * @return {OO.ui.Widget} The widget, for chaining
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
		.removeClass( classes.off )
		.addClass( classes.on );
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
 * order in which users will navigate through the focusable elements via the Tab key.
 *
 *     @example
 *     // TabIndexedElement is mixed into the ButtonWidget class
 *     // to provide a tabIndex property.
 *     var button1 = new OO.ui.ButtonWidget( {
 *             label: 'fourth',
 *             tabIndex: 4
 *         } ),
 *         button2 = new OO.ui.ButtonWidget( {
 *             label: 'second',
 *             tabIndex: 2
 *         } ),
 *         button3 = new OO.ui.ButtonWidget( {
 *             label: 'third',
 *             tabIndex: 3
 *         } ),
 *         button4 = new OO.ui.ButtonWidget( {
 *             label: 'first',
 *             tabIndex: 1
 *         } );
 *     $( document.body ).append(
 *         button1.$element,
 *         button2.$element,
 *         button3.$element,
 *         button4.$element
 *      );
 *
 * @abstract
 * @class
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {jQuery} [$tabIndexed] The element that should use the tabindex functionality. By default,
 *  the functionality is applied to the element created by the class ($element). If a different
 *  element is specified, the tabindex functionality will be applied to it instead.
 * @cfg {string|number|null} [tabIndex=0] Number that specifies the element’s position in the
 *  tab-navigation order (e.g., 1 for the first focusable element). Use 0 to use the default
 *  navigation order; use -1 to remove the element from the tab-navigation flow.
 */
OO.ui.mixin.TabIndexedElement = function OoUiMixinTabIndexedElement( config ) {
	// Configuration initialization
	config = $.extend( { tabIndex: 0 }, config );

	// Properties
	this.$tabIndexed = null;
	this.tabIndex = null;

	// Events
	this.connect( this, {
		disable: 'onTabIndexedElementDisable'
	} );

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
 * @return {OO.ui.Element} The element, for chaining
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
 * @return {OO.ui.Element} The element, for chaining
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
 * @return {OO.ui.Element} The element, for chaining
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
		tagName = ( $node.prop( 'tagName' ) || '' ).toLowerCase();

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
 * @return {OO.ui.Element} The element, for chaining
 */
OO.ui.mixin.TabIndexedElement.prototype.focus = function () {
	if ( !this.isDisabled() ) {
		this.$tabIndexed.trigger( 'focus' );
	}
	return this;
};

/**
 * Blur this element.
 *
 * @chainable
 * @return {OO.ui.Element} The element, for chaining
 */
OO.ui.mixin.TabIndexedElement.prototype.blur = function () {
	this.$tabIndexed.trigger( 'blur' );
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
 * interface element that can be configured with access keys for keyboard interaction.
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
	this.onDocumentMouseUpHandler = this.onDocumentMouseUp.bind( this );
	this.onMouseDownHandler = this.onMouseDown.bind( this );
	this.onDocumentKeyUpHandler = this.onDocumentKeyUp.bind( this );
	this.onKeyDownHandler = this.onKeyDown.bind( this );
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
 * This property is usually set to `true` to prevent the focus from changing when the button is
 * clicked.
 * Classes such as {@link OO.ui.mixin.DraggableElement DraggableElement} and
 * {@link OO.ui.ButtonOptionWidget ButtonOptionWidget} use a value of `false` so that dragging
 * behavior is possible and mousedown events can be handled by a parent widget.
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
	// `toUpperCase()` is added for XHTML documents
	if ( this.$button.prop( 'tagName' ).toUpperCase() === 'A' ) {
		this.$button.attr( 'role', 'button' );
	}
};

/**
 * Handles mouse down events.
 *
 * @protected
 * @param {jQuery.Event} e Mouse down event
 * @return {undefined|boolean} False to prevent default if event is handled
 */
OO.ui.mixin.ButtonElement.prototype.onMouseDown = function ( e ) {
	if ( this.isDisabled() || e.which !== OO.ui.MouseButtons.LEFT ) {
		return;
	}
	this.$element.addClass( 'oo-ui-buttonElement-pressed' );
	// Run the mouseup handler no matter where the mouse is when the button is let go, so we can
	// reliably remove the pressed class
	this.getElementDocument().addEventListener( 'mouseup', this.onDocumentMouseUpHandler, true );
	// Prevent change of focus unless specifically configured otherwise
	if ( this.constructor.static.cancelButtonMouseDownEvents ) {
		return false;
	}
};

/**
 * Handles document mouse up events.
 *
 * @protected
 * @param {MouseEvent} e Mouse up event
 */
OO.ui.mixin.ButtonElement.prototype.onDocumentMouseUp = function ( e ) {
	if ( this.isDisabled() || e.which !== OO.ui.MouseButtons.LEFT ) {
		return;
	}
	this.$element.removeClass( 'oo-ui-buttonElement-pressed' );
	// Stop listening for mouseup, since we only needed this once
	this.getElementDocument().removeEventListener( 'mouseup', this.onDocumentMouseUpHandler, true );
};

/**
 * Handles mouse click events.
 *
 * @protected
 * @param {jQuery.Event} e Mouse click event
 * @fires click
 * @return {undefined|boolean} False to prevent default if event is handled
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
	this.getElementDocument().addEventListener( 'keyup', this.onDocumentKeyUpHandler, true );
};

/**
 * Handles document key up events.
 *
 * @protected
 * @param {KeyboardEvent} e Key up event
 */
OO.ui.mixin.ButtonElement.prototype.onDocumentKeyUp = function ( e ) {
	if ( this.isDisabled() || ( e.which !== OO.ui.Keys.SPACE && e.which !== OO.ui.Keys.ENTER ) ) {
		return;
	}
	this.$element.removeClass( 'oo-ui-buttonElement-pressed' );
	// Stop listening for keyup, since we only needed this once
	this.getElementDocument().removeEventListener( 'keyup', this.onDocumentKeyUpHandler, true );
};

/**
 * Handles key press events.
 *
 * @protected
 * @param {jQuery.Event} e Key press event
 * @fires click
 * @return {undefined|boolean} False to prevent default if event is handled
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
 * Render the button with or without a frame. Omit the `framed` parameter to toggle the button frame
 * on and off.
 *
 * @param {boolean} [framed] Make button framed, omit to toggle
 * @chainable
 * @return {OO.ui.Element} The element, for chaining
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
 * @return {OO.ui.Element} The element, for chaining
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
 * Find items by their data.
 *
 * All items with matching data will be returned. To return only the first match, use the
 * #findItemFromData method instead.
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
 * Add items to the group.
 *
 * Items will be added to the end of the group array unless the optional `index` parameter
 * specifies a different insertion point. Adding an existing item will move it to the end of the
 * array or the point specified by the `index`.
 *
 * @param {OO.ui.Element[]} items An array of items to add to the group
 * @param {number} [index] Index of the insertion point
 * @chainable
 * @return {OO.ui.Element} The element, for chaining
 */
OO.ui.mixin.GroupElement.prototype.addItems = function ( items, index ) {

	if ( items.length === 0 ) {
		return this;
	}

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
 * @return {OO.ui.Element} The element, for chaining
 */
OO.ui.mixin.GroupElement.prototype.removeItems = function ( items ) {
	var i, len, item, index;

	if ( items.length === 0 ) {
		return this;
	}

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
 * @return {OO.ui.Element} The element, for chaining
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
 * @cfg {jQuery|string|Function|OO.ui.HtmlSnippet} [label] The label text. The label can be
 *  specified as a plaintext string, a jQuery selection of elements, or a function that will
 *  produce a string in the future. See the [OOUI documentation on MediaWiki] [2] for examples.
 *  [2]: https://www.mediawiki.org/wiki/OOUI/Widgets/Icons,_Indicators,_and_Labels#Labels
 * @cfg {boolean} [invisibleLabel] Whether the label should be visually hidden (but still
 *  accessible to screen-readers).
 */
OO.ui.mixin.LabelElement = function OoUiMixinLabelElement( config ) {
	// Configuration initialization
	config = config || {};

	// Properties
	this.$label = null;
	this.label = null;
	this.invisibleLabel = null;

	// Initialization
	this.setLabel( config.label || this.constructor.static.label );
	this.setLabelElement( config.$label || $( '<span>' ) );
	this.setInvisibleLabel( config.invisibleLabel );
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
 * @param {jQuery|string|OO.ui.HtmlSnippet|Function|null} label Label nodes; text; a function that
 *  returns nodes or text; or null for no label
 * @chainable
 * @return {OO.ui.Element} The element, for chaining
 */
OO.ui.mixin.LabelElement.prototype.setLabel = function ( label ) {
	label = typeof label === 'function' ? OO.ui.resolveMsg( label ) : label;
	label = ( ( typeof label === 'string' || label instanceof $ ) && label.length ) || ( label instanceof OO.ui.HtmlSnippet && label.toString().length ) ? label : null;

	if ( this.label !== label ) {
		if ( this.$label ) {
			this.setLabelContent( label );
		}
		this.label = label;
		this.emit( 'labelChange' );
	}

	this.$element.toggleClass( 'oo-ui-labelElement', !!this.label && !this.invisibleLabel );

	return this;
};

/**
 * Set whether the label should be visually hidden (but still accessible to screen-readers).
 *
 * @param {boolean} invisibleLabel
 * @chainable
 * @return {OO.ui.Element} The element, for chaining
 */
OO.ui.mixin.LabelElement.prototype.setInvisibleLabel = function ( invisibleLabel ) {
	invisibleLabel = !!invisibleLabel;

	if ( this.invisibleLabel !== invisibleLabel ) {
		this.invisibleLabel = invisibleLabel;
		this.emit( 'labelChange' );
	}

	this.$label.toggleClass( 'oo-ui-labelElement-invisible', this.invisibleLabel );
	// Pretend that there is no label, a lot of CSS has been written with this assumption
	this.$element.toggleClass( 'oo-ui-labelElement', !!this.label && !this.invisibleLabel );

	return this;
};

/**
 * Set the label as plain text with a highlighted query
 *
 * @param {string} text Text label to set
 * @param {string} query Substring of text to highlight
 * @param {Function} [compare] Optional string comparator, e.g. Intl.Collator().compare
 * @chainable
 * @return {OO.ui.Element} The element, for chaining
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
	} else if ( label instanceof $ ) {
		this.$label.empty().append( label );
	} else {
		this.$label.empty();
	}
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
 *     $icon: $( '<div>' )
 *     // Use an existing icon element instead of the one generated by the class
 *     $icon: this.$element
 *     // Use an icon element from a child widget
 *     $icon: this.childwidget.$element
 * @cfg {Object|string} [icon=''] The symbolic name of the icon (e.g., ‘remove’ or ‘menu’), or a
 *  map of symbolic names. A map is used for i18n purposes and contains a `default` icon
 *  name and additional names keyed by language code. The `default` name is used when no icon is
 *  keyed by the user's language.
 *
 *  Example of an i18n map:
 *
 *     { default: 'bold-a', en: 'bold-b', de: 'bold-f' }
 *  See the [OOUI documentation on MediaWiki] [2] for a list of icons included in the library.
 * [2]: https://www.mediawiki.org/wiki/OOUI/Widgets/Icons,_Indicators,_and_Labels#Icons
 */
OO.ui.mixin.IconElement = function OoUiMixinIconElement( config ) {
	// Configuration initialization
	config = config || {};

	// Properties
	this.$icon = null;
	this.icon = null;

	// Initialization
	this.setIcon( config.icon || this.constructor.static.icon );
	this.setIconElement( config.$icon || $( '<span>' ) );
};

/* Setup */

OO.initClass( OO.ui.mixin.IconElement );

/* Static Properties */

/**
 * The symbolic name of the icon (e.g., ‘remove’ or ‘menu’), or a map of symbolic names. A map
 * is used for i18n purposes and contains a `default` icon name and additional names keyed by
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
		.toggleClass( 'oo-ui-iconElement-noIcon', !this.icon )
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
 * @return {OO.ui.Element} The element, for chaining
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
	if ( this.$icon ) {
		this.$icon.toggleClass( 'oo-ui-iconElement-noIcon', !this.icon );
	}
	this.updateThemeClasses();

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
 */
OO.ui.mixin.IndicatorElement = function OoUiMixinIndicatorElement( config ) {
	// Configuration initialization
	config = config || {};

	// Properties
	this.$indicator = null;
	this.indicator = null;

	// Initialization
	this.setIndicator( config.indicator || this.constructor.static.indicator );
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
 * for no title. The static property will be overridden if the #indicatorTitle configuration is
 * used.
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
		.toggleClass( 'oo-ui-indicatorElement-noIndicator', !this.indicator )
		.toggleClass( 'oo-ui-indicator-' + this.indicator, !!this.indicator );
	if ( this.indicatorTitle !== null ) {
		this.$indicator.attr( 'title', this.indicatorTitle );
	}

	this.updateThemeClasses();
};

/**
 * Set the indicator by its symbolic name: ‘clear’, ‘down’, ‘required’, ‘search’, ‘up’. Use `null`
 * to remove the indicator.
 *
 * @param {string|null} indicator Symbolic name of indicator, or `null` for no indicator
 * @chainable
 * @return {OO.ui.Element} The element, for chaining
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
	if ( this.$indicator ) {
		this.$indicator.toggleClass( 'oo-ui-indicatorElement-noIndicator', !this.indicator );
	}
	this.updateThemeClasses();

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
 * The FlaggedElement class is an attribute mixin, meaning that it is used to add
 * additional functionality to an element created by another class. The class provides
 * a ‘flags’ property assigned the name (or an array of names) of styling flags,
 * which are used to customize the look and feel of a widget to better describe its
 * importance and functionality.
 *
 * The library currently contains the following styling flags for general use:
 *
 * - **progressive**: Progressive styling is applied to convey that the widget will move the user
 *   forward in a process.
 * - **destructive**: Destructive styling is applied to convey that the widget will remove
 *   something.
 *
 * The flags affect the appearance of the buttons:
 *
 *     @example
 *     // FlaggedElement is mixed into ButtonWidget to provide styling flags
 *     var button1 = new OO.ui.ButtonWidget( {
 *             label: 'Progressive',
 *             flags: 'progressive'
 *         } ),
 *         button2 = new OO.ui.ButtonWidget( {
 *             label: 'Destructive',
 *             flags: 'destructive'
 *         } );
 *     $( document.body ).append( button1.$element, button2.$element );
 *
 * {@link OO.ui.ActionWidget ActionWidgets}, which are a special kind of button that execute an
 * action, use these flags: **primary** and **safe**.
 * Please see the [OOUI documentation on MediaWiki] [1] for more information.
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Elements/Flagged
 *
 * @abstract
 * @class
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {string|string[]} [flags] The name or names of the flags (e.g., 'progressive' or 'primary')
 *  to apply.
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
	this.setFlags( config.flags || this.constructor.static.flags );
	this.setFlaggedElement( config.$flagged || this.$element );
};

/* Setup */

OO.initClass( OO.ui.mixin.FlaggedElement );

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

/* Static Properties */

/**
 * Initial value to pass to setFlags if no value is provided in config.
 *
 * @static
 * @inheritable
 * @property {string|string[]|Object.<string, boolean>}
 */
OO.ui.mixin.FlaggedElement.static.flags = null;

/* Methods */

/**
 * Set the flagged element.
 *
 * This method is used to retarget a flagged mixin so that its functionality applies to the
 * specified element.
 * If an element is already set, the method will remove the mixin’s effect on that element.
 *
 * @param {jQuery} $flagged Element that should be flagged
 */
OO.ui.mixin.FlaggedElement.prototype.setFlaggedElement = function ( $flagged ) {
	var classNames = Object.keys( this.flags ).map( function ( flag ) {
		return 'oo-ui-flaggedElement-' + flag;
	} );

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
 * @return {OO.ui.Element} The element, for chaining
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
		this.$flagged.removeClass( remove );
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
 * @return {OO.ui.Element} The element, for chaining
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
			.addClass( add )
			.removeClass( remove );
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
 *     // TitledElement provides a `title` attribute to the
 *     // ButtonWidget class.
 *     var button = new OO.ui.ButtonWidget( {
 *         label: 'Button with Title',
 *         title: 'I am a button'
 *     } );
 *     $( document.body ).append( button.$element );
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
 * The title text, a function that returns text, or `null` for no title. The value of the static
 * property is overridden if the #title config option is used.
 *
 * If the element has a default title (e.g. `<input type=file>`), `null` will allow that title to be
 * shown. Use empty string to suppress it.
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
 * This method is used to retarget a TitledElement mixin so that its functionality applies to the
 * specified element.
 * If an element is already set, the mixin’s effect on that element is removed before the new
 * element is set up.
 *
 * @param {jQuery} $titled Element that should use the 'titled' functionality
 */
OO.ui.mixin.TitledElement.prototype.setTitledElement = function ( $titled ) {
	if ( this.$titled ) {
		this.$titled.removeAttr( 'title' );
	}

	this.$titled = $titled;
	this.updateTitle();
};

/**
 * Set title.
 *
 * @param {string|Function|null} title Title text, a function that returns text, or `null`
 *  for no title
 * @chainable
 * @return {OO.ui.Element} The element, for chaining
 */
OO.ui.mixin.TitledElement.prototype.setTitle = function ( title ) {
	title = typeof title === 'function' ? OO.ui.resolveMsg( title ) : title;
	title = typeof title === 'string' ? title : null;

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
 * @return {OO.ui.Element} The element, for chaining
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
 * AccessKeyedElement is mixed into other classes to provide an `accesskey` HTML attribute.
 * Access keys allow an user to go to a specific element by using
 * a shortcut combination of a browser specific keys + the key
 * set to the field.
 *
 *     @example
 *     // AccessKeyedElement provides an `accesskey` attribute to the
 *     // ButtonWidget class.
 *     var button = new OO.ui.ButtonWidget( {
 *         label: 'Button with access key',
 *         accessKey: 'k'
 *     } );
 *     $( document.body ).append( button.$element );
 *
 * @abstract
 * @class
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {jQuery} [$accessKeyed] The element to which the `accesskey` attribute is applied.
 *  If this config is omitted, the access key functionality is applied to $element, the
 *  element created by the class.
 * @cfg {string|Function} [accessKey] The key or a function that returns the key. If
 *  this config is omitted, no access key will be added.
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
 * The access key, a function that returns a key, or `null` for no access key.
 *
 * @static
 * @inheritable
 * @property {string|Function|null}
 */
OO.ui.mixin.AccessKeyedElement.static.accessKey = null;

/* Methods */

/**
 * Set the access keyed element.
 *
 * This method is used to retarget a AccessKeyedElement mixin so that its functionality applies to
 * the specified element.
 * If an element is already set, the mixin's effect on that element is removed before the new
 * element is set up.
 *
 * @param {jQuery} $accessKeyed Element that should use the 'access keyed' functionality
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
 * Set access key.
 *
 * @param {string|Function|null} accessKey Key, a function that returns a key, or `null` for no
 *  access key
 * @chainable
 * @return {OO.ui.Element} The element, for chaining
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
 * Get access key.
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
		// Not initialized yet; the constructor will call updateTitle() which will rerun this
		// function.
		return title;
	}
	// Use jquery.accessKeyLabel if available to show modifiers, otherwise just display the
	// single key.
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
 *     // A button widget.
 *     var button = new OO.ui.ButtonWidget( {
 *         label: 'Button with Icon',
 *         icon: 'trash',
 *         title: 'Remove'
 *     } );
 *     $( document.body ).append( button.$element );
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
	OO.ui.mixin.TitledElement.call( this, $.extend( {
		$titled: this.$button
	}, config ) );
	OO.ui.mixin.FlaggedElement.call( this, config );
	OO.ui.mixin.TabIndexedElement.call( this, $.extend( {
		$tabIndexed: this.$button
	}, config ) );
	OO.ui.mixin.AccessKeyedElement.call( this, $.extend( {
		$accessKeyed: this.$button
	}, config ) );

	// Properties
	this.href = null;
	this.target = null;
	this.noFollow = false;

	// Events
	this.connect( this, {
		disable: 'onDisable'
	} );

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
 * @chainable
 * @return {OO.ui.Widget} The widget, for chaining
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
 * @return {OO.ui.Widget} The widget, for chaining
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
 * @return {OO.ui.Widget} The widget, for chaining
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
 * @return {OO.ui.Widget} The widget, for chaining
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
 *     // A ButtonGroupWidget with two buttons.
 *     var button1 = new OO.ui.PopupButtonWidget( {
 *             label: 'Select a category',
 *             icon: 'menu',
 *             popup: {
 *                 $content: $( '<p>List of categories…</p>' ),
 *                 padded: true,
 *                 align: 'left'
 *             }
 *         } ),
 *         button2 = new OO.ui.ButtonWidget( {
 *             label: 'Add item'
 *         } ),
 *         buttonGroup = new OO.ui.ButtonGroupWidget( {
 *             items: [ button1, button2 ]
 *         } );
 *     $( document.body ).append( buttonGroup.$element );
 *
 * @class
 * @extends OO.ui.Widget
 * @mixins OO.ui.mixin.GroupElement
 * @mixins OO.ui.mixin.TitledElement
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
	OO.ui.mixin.GroupElement.call( this, $.extend( {
		$group: this.$element
	}, config ) );
	OO.ui.mixin.TitledElement.call( this, config );

	// Initialization
	this.$element.addClass( 'oo-ui-buttonGroupWidget' );
	if ( Array.isArray( config.items ) ) {
		this.addItems( config.items );
	}
};

/* Setup */

OO.inheritClass( OO.ui.ButtonGroupWidget, OO.ui.Widget );
OO.mixinClass( OO.ui.ButtonGroupWidget, OO.ui.mixin.GroupElement );
OO.mixinClass( OO.ui.ButtonGroupWidget, OO.ui.mixin.TitledElement );

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
 * @return {OO.ui.Widget} The widget, for chaining
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
 * IconWidget is a generic widget for {@link OO.ui.mixin.IconElement icons}.
 * In general, IconWidgets should be used with OO.ui.LabelWidget, which creates a label that
 * identifies the icon’s function. See the [OOUI documentation on MediaWiki] [1]
 * for a list of icons included in the library.
 *
 *     @example
 *     // An IconWidget with a label via LabelWidget.
 *     var myIcon = new OO.ui.IconWidget( {
 *             icon: 'help',
 *             title: 'Help'
 *          } ),
 *          // Create a label.
 *          iconLabel = new OO.ui.LabelWidget( {
 *              label: 'Help'
 *          } );
 *      $( document.body ).append( myIcon.$element, iconLabel.$element );
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Widgets/Icons,_Indicators,_and_Labels#Icons
 *
 * @class
 * @extends OO.ui.Widget
 * @mixins OO.ui.mixin.IconElement
 * @mixins OO.ui.mixin.TitledElement
 * @mixins OO.ui.mixin.LabelElement
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
	OO.ui.mixin.IconElement.call( this, $.extend( {
		$icon: this.$element
	}, config ) );
	OO.ui.mixin.TitledElement.call( this, $.extend( {
		$titled: this.$element
	}, config ) );
	OO.ui.mixin.LabelElement.call( this, $.extend( {
		$label: this.$element,
		invisibleLabel: true
	}, config ) );
	OO.ui.mixin.FlaggedElement.call( this, $.extend( {
		$flagged: this.$element
	}, config ) );

	// Initialization
	this.$element.addClass( 'oo-ui-iconWidget' );
	// Remove class added by LabelElement initialization. It causes unexpected CSS to apply when
	// nested in other widgets, because this widget used to not mix in LabelElement.
	this.$element.removeClass( 'oo-ui-labelElement-label' );
};

/* Setup */

OO.inheritClass( OO.ui.IconWidget, OO.ui.Widget );
OO.mixinClass( OO.ui.IconWidget, OO.ui.mixin.IconElement );
OO.mixinClass( OO.ui.IconWidget, OO.ui.mixin.TitledElement );
OO.mixinClass( OO.ui.IconWidget, OO.ui.mixin.LabelElement );
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
 *     // An indicator widget.
 *     var indicator1 = new OO.ui.IndicatorWidget( {
 *             indicator: 'required'
 *         } ),
 *         // Create a fieldset layout to add a label.
 *         fieldset = new OO.ui.FieldsetLayout();
 *     fieldset.addItems( [
 *         new OO.ui.FieldLayout( indicator1, {
 *             label: 'A required indicator:'
 *         } )
 *     ] );
 *     $( document.body ).append( fieldset.$element );
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Widgets/Icons,_Indicators,_and_Labels#Indicators
 *
 * @class
 * @extends OO.ui.Widget
 * @mixins OO.ui.mixin.IndicatorElement
 * @mixins OO.ui.mixin.TitledElement
 * @mixins OO.ui.mixin.LabelElement
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
	OO.ui.mixin.IndicatorElement.call( this, $.extend( {
		$indicator: this.$element
	}, config ) );
	OO.ui.mixin.TitledElement.call( this, $.extend( {
		$titled: this.$element
	}, config ) );
	OO.ui.mixin.LabelElement.call( this, $.extend( {
		$label: this.$element,
		invisibleLabel: true
	}, config ) );

	// Initialization
	this.$element.addClass( 'oo-ui-indicatorWidget' );
	// Remove class added by LabelElement initialization. It causes unexpected CSS to apply when
	// nested in other widgets, because this widget used to not mix in LabelElement.
	this.$element.removeClass( 'oo-ui-labelElement-label' );
};

/* Setup */

OO.inheritClass( OO.ui.IndicatorWidget, OO.ui.Widget );
OO.mixinClass( OO.ui.IndicatorWidget, OO.ui.mixin.IndicatorElement );
OO.mixinClass( OO.ui.IndicatorWidget, OO.ui.mixin.TitledElement );
OO.mixinClass( OO.ui.IndicatorWidget, OO.ui.mixin.LabelElement );

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
 *   label that includes a link or special styling, such as a gray color or additional
 *   graphical elements.
 * - Function: a function that will produce a string in the future. Functions are used
 *   in cases where the value of the label is not currently defined.
 *
 * In addition, the LabelWidget can be associated with an {@link OO.ui.InputWidget input widget},
 * which will come into focus when the label is clicked.
 *
 *     @example
 *     // Two LabelWidgets.
 *     var label1 = new OO.ui.LabelWidget( {
 *             label: 'plaintext label'
 *         } ),
 *         label2 = new OO.ui.LabelWidget( {
 *             label: $( '<a>' ).attr( 'href', 'default.html' ).text( 'jQuery label' )
 *         } ),
 *         // Create a fieldset layout with fields for each example.
 *         fieldset = new OO.ui.FieldsetLayout();
 *     fieldset.addItems( [
 *         new OO.ui.FieldLayout( label1 ),
 *         new OO.ui.FieldLayout( label2 )
 *     ] );
 *     $( document.body ).append( fieldset.$element );
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
	OO.ui.mixin.LabelElement.call( this, $.extend( {
		$label: this.$element
	}, config ) );
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
 * MessageWidget produces a visual component for sending a notice to the user
 * with an icon and distinct design noting its purpose. The MessageWidget changes
 * its visual presentation based on the type chosen, which also denotes its UX
 * purpose.
 *
 * @class
 * @extends OO.ui.Widget
 * @mixins OO.ui.mixin.IconElement
 * @mixins OO.ui.mixin.LabelElement
 * @mixins OO.ui.mixin.TitledElement
 * @mixins OO.ui.mixin.FlaggedElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {string} [type='notice'] The type of the notice widget. This will also
 *  impact the flags that the widget receives (and hence its CSS design) as well
 *  as the icon that appears. Available types:
 *  'notice', 'error', 'warning', 'success'
 * @cfg {boolean} [inline] Set the notice as an inline notice. The default
 *  is not inline, or 'boxed' style.
 */
OO.ui.MessageWidget = function OoUiMessageWidget( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.MessageWidget.parent.call( this, config );

	// Mixin constructors
	OO.ui.mixin.IconElement.call( this, config );
	OO.ui.mixin.LabelElement.call( this, config );
	OO.ui.mixin.TitledElement.call( this, config );
	OO.ui.mixin.FlaggedElement.call( this, config );

	// Set type
	this.setType( config.type );
	this.setInline( config.inline );

	// Build the widget
	this.$element
		.append( this.$icon, this.$label )
		.addClass( 'oo-ui-messageWidget' );
};

/* Setup */

OO.inheritClass( OO.ui.MessageWidget, OO.ui.Widget );
OO.mixinClass( OO.ui.MessageWidget, OO.ui.mixin.IconElement );
OO.mixinClass( OO.ui.MessageWidget, OO.ui.mixin.LabelElement );
OO.mixinClass( OO.ui.MessageWidget, OO.ui.mixin.TitledElement );
OO.mixinClass( OO.ui.MessageWidget, OO.ui.mixin.FlaggedElement );

/* Static Properties */

/**
 * An object defining the icon name per defined type.
 *
 * @static
 * @property {Object}
 */
OO.ui.MessageWidget.static.iconMap = {
	notice: 'infoFilled',
	error: 'error',
	warning: 'alert',
	success: 'check'
};

/* Methods */

/**
 * Set the inline state of the widget.
 *
 * @param {boolean} inline Widget is inline
 */
OO.ui.MessageWidget.prototype.setInline = function ( inline ) {
	inline = !!inline;

	if ( this.inline !== inline ) {
		this.inline = inline;
		this.$element
			.toggleClass( 'oo-ui-messageWidget-block', !this.inline );
	}
};
/**
 * Set the widget type. The given type must belong to the list of
 * legal types set by OO.ui.MessageWidget.static.iconMap
 *
 * @param  {string} [type] Given type. Defaults to 'notice'
 */
OO.ui.MessageWidget.prototype.setType = function ( type ) {
	// Validate type
	if ( Object.keys( this.constructor.static.iconMap ).indexOf( type ) === -1 ) {
		type = 'notice'; // Default
	}

	if ( this.type !== type ) {

		// Flags
		this.clearFlags();
		this.setFlags( type );

		// Set the icon and its variant
		this.setIcon( this.constructor.static.iconMap[ type ] );
		this.$icon.removeClass( 'oo-ui-image-' + this.type );
		this.$icon.addClass( 'oo-ui-image-' + type );

		if ( type === 'error' ) {
			this.$element.attr( 'role', 'alert' );
			this.$element.removeAttr( 'aria-live' );
		} else {
			this.$element.removeAttr( 'role' );
			this.$element.attr( 'aria-live', 'polite' );
		}

		this.type = type;
	}
};

/**
 * PendingElement is a mixin that is used to create elements that notify users that something is
 * happening and that they should wait before proceeding. The pending state is visually represented
 * with a pending texture that appears in the head of a pending
 * {@link OO.ui.ProcessDialog process dialog} or in the input field of a
 * {@link OO.ui.TextInputWidget text input widget}.
 *
 * Currently, {@link OO.ui.ActionWidget Action widgets}, which mix in this class, can also be marked
 * as pending, but only when used in {@link OO.ui.MessageDialog message dialogs}. The behavior is
 * not currently supported for action widgets used in process dialogs.
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
 *         this.content = new OO.ui.PanelLayout( { padded: true } );
 *         this.content.$element.append( '<p>Click the \'Done\' action widget to see its pending ' +
 *             'state. Note that action widgets can be marked pending in message dialogs but not ' +
 *             'process dialogs.</p>' );
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
 *     $( document.body ).append( windowManager.$element );
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
 * @return {OO.ui.Element} The element, for chaining
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
 * @return {OO.ui.Element} The element, for chaining
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
 *  'after': Directly after $floatableContainer, aligning f's start edge with fC's end edge
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
	this.hideWhenOutOfView = config.hideWhenOutOfView === undefined ?
		true : !!config.hideWhenOutOfView;
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
 * @return {OO.ui.Element} The element, for chaining
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

		closestScrollableOfContainer = OO.ui.Element.static.getClosestScrollableContainer(
			this.$floatableContainer[ 0 ]
		);
		// If the scrollable is the root, we have to listen to scroll events
		// on the window because of browser inconsistencies.
		if ( $( closestScrollableOfContainer ).is( 'html, body' ) ) {
			closestScrollableOfContainer = OO.ui.Element.static.getWindow(
				closestScrollableOfContainer
			);
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
 * Check whether the bottom edge of the given element is within the viewport of the given
 * container.
 *
 * @private
 * @param {jQuery} $element
 * @param {jQuery} $container
 * @return {boolean}
 */
OO.ui.mixin.FloatableElement.prototype.isElementInViewport = function ( $element, $container ) {
	var elemRect, contRect, topEdgeInBounds, bottomEdgeInBounds, leftEdgeInBounds,
		rightEdgeInBounds, startEdgeInBounds, endEdgeInBounds, viewportSpacing,
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
 * @return {OO.ui.Element} The element, for chaining
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

	this.floatableOutOfView = this.hideWhenOutOfView &&
		!this.isElementInViewport( this.$floatableContainer, this.$floatableClosestScrollable );
	if ( this.floatableOutOfView ) {
		this.$floatable.addClass( 'oo-ui-element-hidden' );
		return this;
	} else {
		this.$floatable.removeClass( 'oo-ui-element-hidden' );
	}

	this.$floatable.css( this.computePosition() );

	// We updated the position, so re-evaluate the clipping state.
	// (ClippableElement does not listen to 'scroll' events on $floatableContainer's parent, and so
	// will not notice the need to update itself.)
	// TODO: This is terrible, we shouldn't need to know about ClippableElement at all here.
	// Why does it not listen to the right events in the right places?
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
	scrollableX = $offsetParent.css( 'overflow-x' ) === 'scroll' ||
		$offsetParent.css( 'overflow-x' ) === 'auto';
	scrollableY = $offsetParent.css( 'overflow-y' ) === 'scroll' ||
		$offsetParent.css( 'overflow-y' ) === 'auto';

	vertScrollbarWidth = $offsetParent.innerWidth() - $offsetParent.prop( 'clientWidth' );
	horizScrollbarHeight = $offsetParent.innerHeight() - $offsetParent.prop( 'clientHeight' );
	// We don't need to compute and add scrollTop and scrollLeft if the scrollable container
	// is the body, or if it isn't scrollable
	scrollTop = scrollableY && !isBody ?
		$offsetParent.scrollTop() : 0;
	scrollLeft = scrollableX && !isBody ?
		OO.ui.Element.static.getScrollLeft( $offsetParent[ 0 ] ) : 0;

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
			newPos.right = ( isBody ? $( $offsetParent[ 0 ].ownerDocument.documentElement ) :
				$offsetParent ).outerWidth() - newPos.start;
		} else {
			newPos.left = newPos.start;
		}
		delete newPos.start;
	}
	if ( newPos.end !== undefined ) {
		if ( direction === 'rtl' ) {
			newPos.left = newPos.end;
		} else {
			newPos.right = ( isBody ? $( $offsetParent[ 0 ].ownerDocument.documentElement ) :
				$offsetParent ).outerWidth() - newPos.end;
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
 * @return {OO.ui.Element} The element, for chaining
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
 * @return {OO.ui.Element} The element, for chaining
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
		// this.$clippableScrollableContainer and this.$clippableWindow are null, so the below
		// will fail
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
		// The order matters here. If overflow is not set first, Chrome displays bogus scrollbars.
		// See T157672.
		// Forcing a reflow is a smaller workaround than calling reconsiderScrollbars() for
		// this case.
		this.$clippable.css( 'overflowX', 'scroll' );
		// eslint-disable-next-line no-void
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
		// The order matters here. If overflow is not set first, Chrome displays bogus scrollbars.
		// See T157672.
		// Forcing a reflow is a smaller workaround than calling reconsiderScrollbars() for
		// this case.
		this.$clippable.css( 'overflowY', 'scroll' );
		// eslint-disable-next-line no-void
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
 * Please see the [OOUI documentation on MediaWiki.org] [1] for more information and examples.
 *
 * Unlike most widgets, PopupWidget is initially hidden and must be shown by calling #toggle.
 *
 *     @example
 *     // A PopupWidget.
 *     var popup = new OO.ui.PopupWidget( {
 *         $content: $( '<p>Hi there!</p>' ),
 *         padded: true,
 *         width: 300
 *     } );
 *
 *     $( document.body ).append( popup.$element );
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
 * @cfg {number|null} [width=320] Width of popup in pixels. Pass `null` to use automatic width.
 * @cfg {number|null} [height=null] Height of popup in pixels. Pass `null` to use automatic height.
 * @cfg {boolean} [anchor=true] Show anchor pointing to origin of popup
 * @cfg {string} [position='below'] Where to position the popup relative to $floatableContainer
 *  'above': Put popup above $floatableContainer; anchor points down to the horizontal center
 *    of $floatableContainer
 *  'below': Put popup below $floatableContainer; anchor points up to the horizontal center
 *    of $floatableContainer
 *  'before': Put popup to the left (LTR) / right (RTL) of $floatableContainer; anchor points
 *    endwards (right/left) to the vertical center of $floatableContainer
 *  'after': Put popup to the right (LTR) / left (RTL) of $floatableContainer; anchor points
 *    startwards (left/right) to the vertical center of $floatableContainer
 * @cfg {string} [align='center'] How to align the popup to $floatableContainer
 *  'forwards': If position is above/below, move the popup as far endwards (right in LTR, left in
 *    RTL) as possible while still keeping the anchor within the popup; if position is before/after,
 *    move the popup as far downwards as possible.
 *  'backwards': If position is above/below, move the popup as far startwards (left in LTR, right in
 *    RTL) as possible while still keeping the anchor within the popup; if position is before/after,
 *     move the popup as far upwards as possible.
 *  'center': Horizontally (if position is above/below) or vertically (before/after) align the
 *     center of the popup with the center of $floatableContainer.
 * 'force-left': Alias for 'forwards' in LTR and 'backwards' in RTL
 * 'force-right': Alias for 'backwards' in RTL and 'forwards' in LTR
 * @cfg {boolean} [autoFlip=true] Whether to automatically switch the popup's position between
 *  'above' and 'below', or between 'before' and 'after', if there is not enough space in the
 *  desired direction to display the popup without clipping
 * @cfg {jQuery} [$container] Constrain the popup to the boundaries of the specified container.
 *  See the [OOUI docs on MediaWiki][3] for an example.
 *  [3]: https://www.mediawiki.org/wiki/OOUI/Widgets/Popups#containerExample
 * @cfg {number} [containerPadding=10] Padding between the popup and its container, specified as a
 *  number of pixels.
 * @cfg {jQuery} [$content] Content to append to the popup's body
 * @cfg {jQuery} [$footer] Content to append to the popup's footer
 * @cfg {boolean} [autoClose=false] Automatically close the popup when it loses focus.
 * @cfg {jQuery} [$autoCloseIgnore] Elements that will not close the popup when clicked.
 *  This config option is only relevant if #autoClose is set to `true`. See the
 *  [OOUI documentation on MediaWiki][2] for an example.
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
	OO.ui.mixin.ClippableElement.call( this, $.extend( {
		$clippable: this.$body,
		$clippableContainer: this.$popup
	}, config ) );
	OO.ui.mixin.FloatableElement.call( this, config );

	// Properties
	this.$anchor = $( '<div>' );
	// If undefined, will be computed lazily in computePosition()
	this.$container = config.$container;
	this.containerPadding = config.containerPadding !== undefined ? config.containerPadding : 10;
	this.autoClose = !!config.autoClose;
	this.transitionTimeout = null;
	this.anchored = false;
	this.onDocumentMouseDownHandler = this.onDocumentMouseDown.bind( this );
	this.onDocumentKeyDownHandler = this.onDocumentKeyDown.bind( this );

	// Initialization
	this.setSize( config.width, config.height );
	this.toggleAnchor( config.anchor === undefined || config.anchor );
	this.setAlignment( config.align || 'center' );
	this.setPosition( config.position || 'below' );
	this.setAutoFlip( config.autoFlip === undefined || config.autoFlip );
	this.setAutoCloseIgnore( config.$autoCloseIgnore );
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
	if ( config.$content instanceof $ ) {
		this.$body.append( config.$content );
	}

	if ( config.padded ) {
		this.$body.addClass( 'oo-ui-popupWidget-body-padded' );
	}

	if ( config.head ) {
		this.closeButton = new OO.ui.ButtonWidget( {
			framed: false,
			icon: 'close'
		} );
		this.closeButton.connect( this, {
			click: 'onCloseButtonClick'
		} );
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
 * Handles document mouse down events.
 *
 * @private
 * @param {MouseEvent} e Mouse down event
 */
OO.ui.PopupWidget.prototype.onDocumentMouseDown = function ( e ) {
	if (
		this.isVisible() &&
		!OO.ui.contains( this.$element.add( this.$autoCloseIgnore ).get(), e.target, true )
	) {
		this.toggle( false );
	}
};

/**
 * Bind document mouse down listener.
 *
 * @private
 */
OO.ui.PopupWidget.prototype.bindDocumentMouseDownListener = function () {
	// Capture clicks outside popup
	this.getElementDocument().addEventListener( 'mousedown', this.onDocumentMouseDownHandler, true );
	// We add 'click' event because iOS safari needs to respond to this event.
	// We can't use 'touchstart' (as is usually the equivalent to 'mousedown') because
	// then it will trigger when scrolling. While iOS Safari has some reported behavior
	// of occasionally not emitting 'click' properly, that event seems to be the standard
	// that it should be emitting, so we add it to this and will operate the event handler
	// on whichever of these events was triggered first
	this.getElementDocument().addEventListener( 'click', this.onDocumentMouseDownHandler, true );
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
 * Unbind document mouse down listener.
 *
 * @private
 */
OO.ui.PopupWidget.prototype.unbindDocumentMouseDownListener = function () {
	this.getElementDocument().removeEventListener( 'mousedown', this.onDocumentMouseDownHandler, true );
	this.getElementDocument().removeEventListener( 'click', this.onDocumentMouseDownHandler, true );
};

/**
 * Handles document key down events.
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
 * Bind document key down listener.
 *
 * @private
 */
OO.ui.PopupWidget.prototype.bindDocumentKeyDownListener = function () {
	this.getElementDocument().addEventListener( 'keydown', this.onDocumentKeyDownHandler, true );
};

/**
 * Unbind document key down listener.
 *
 * @private
 */
OO.ui.PopupWidget.prototype.unbindDocumentKeyDownListener = function () {
	this.getElementDocument().removeEventListener( 'keydown', this.onDocumentKeyDownHandler, true );
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
		// Reset auto-flipping before showing the popup again. It's possible we no longer need to
		// flip (e.g. if the user scrolled).
		this.isAutoFlipped = false;
	}

	// Parent method
	OO.ui.PopupWidget.parent.prototype.toggle.call( this, show );

	if ( change ) {
		this.togglePositioning( show && !!this.$floatableContainer );

		if ( show ) {
			if ( this.autoClose ) {
				this.bindDocumentMouseDownListener();
				this.bindDocumentKeyDownListener();
			}
			this.updateDimensions();
			this.toggleClipping( true );

			if ( this.autoFlip ) {
				if ( this.popupPosition === 'above' || this.popupPosition === 'below' ) {
					if ( this.isClippedVertically() || this.isFloatableOutOfView() ) {
						// If opening the popup in the normal direction causes it to be clipped,
						// open in the opposite one instead
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
						// If opening the popup in the normal direction causes it to be clipped,
						// open in the opposite one instead
						normalWidth = this.$element.width();
						this.isAutoFlipped = !this.isAutoFlipped;
						// Due to T180173 horizontally clipped PopupWidgets have messed up
						// dimensions, which causes positioning to be off. Toggle clipping back and
						// forth to work around.
						this.toggleClipping( false );
						this.position();
						this.toggleClipping( true );
						if ( this.isClippedHorizontally() || this.isFloatableOutOfView() ) {
							// If that also causes it to be clipped, open in whichever direction
							// we have more space
							oppositeWidth = this.$element.width();
							if ( oppositeWidth < normalWidth ) {
								this.isAutoFlipped = !this.isAutoFlipped;
								// Due to T180173, horizontally clipped PopupWidgets have messed up
								// dimensions, which causes positioning to be off. Toggle clipping
								// back and forth to work around.
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
				this.unbindDocumentMouseDownListener();
				this.unbindDocumentKeyDownListener();
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
 * @param {number|null} [width=320] Width in pixels. Pass `null` to use automatic width.
 * @param {number|null} [height=null] Height in pixels. Pass `null` to use automatic height.
 * @param {boolean} [transition=false] Use a smooth transition
 * @chainable
 */
OO.ui.PopupWidget.prototype.setSize = function ( width, height, transition ) {
	this.width = width !== undefined ? width : 320;
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
	var direction, align, vertical, start, end, near, far, sizeProp, popupSize, anchorSize,
		anchorPos, anchorOffset, anchorMargin, parentPosition, positionProp, positionAdjustment,
		floatablePos, offsetParentPos, containerPos, popupPosition, viewportSpacing,
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
		width: this.width !== null ? this.width : 'auto',
		height: this.height !== null ? this.height : 'auto'
	} );

	align = alignMap[ direction ][ this.align ] || this.align;
	popupPosition = this.popupPosition;
	if ( this.isAutoFlipped ) {
		popupPosition = popupPositionOppositeMap[ popupPosition ];
	}

	// If the popup is positioned before or after, then the anchor positioning is vertical,
	// otherwise horizontal
	vertical = popupPosition === 'before' || popupPosition === 'after';
	start = vertical ? 'top' : ( direction === 'rtl' ? 'right' : 'left' );
	end = vertical ? 'bottom' : ( direction === 'rtl' ? 'left' : 'right' );
	near = vertical ? 'top' : 'left';
	far = vertical ? 'bottom' : 'right';
	sizeProp = vertical ? 'Height' : 'Width';
	popupSize = vertical ?
		( this.height || this.$popup.height() ) :
		( this.width || this.$popup.width() );

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
		// Position the anchor (which is positioned relative to the popup) to point to
		// $floatableContainer
		anchorPos = ( floatablePos[ start ] + floatablePos[ end ] ) / 2;
		anchorOffset = ( start === far ? -1 : 1 ) * ( anchorPos - popupPos[ start ] );

		// If the anchor is less than 2*anchorSize from either edge, move the popup to make more
		// space this.$anchor.width()/height() returns 0 because of the CSS trickery we use, so use
		// scrollWidth/Height
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
 * Set which elements will not close the popup when clicked.
 *
 * For auto-closing popups, clicks on these elements will not cause the popup to auto-close.
 *
 * @param {jQuery} $autoCloseIgnore Elements to ignore for auto-closing
 */
OO.ui.PopupWidget.prototype.setAutoCloseIgnore = function ( $autoCloseIgnore ) {
	this.$autoCloseIgnore = $autoCloseIgnore;
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
 *     // A PopupButtonWidget.
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
 *     $( document.body ).append( popupButton.$element );
 *
 * @class
 * @extends OO.ui.ButtonWidget
 * @mixins OO.ui.mixin.PopupElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {jQuery} [$overlay] Render the popup into a separate layer. This configuration is useful
 *  in cases where the expanded popup is larger than its containing `<div>`. The specified overlay
 *  layer is usually on top of the containing `<div>` and has a larger area. By default, the popup
 *  uses relative positioning.
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
	this.$overlay = ( config.$overlay === true ?
		OO.ui.getDefaultOverlay() : config.$overlay ) || this.$element;

	// Events
	this.connect( this, {
		click: 'onAction'
	} );

	// Initialization
	this.$element.addClass( 'oo-ui-popupButtonWidget' );
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
 * @return {OO.ui.Widget} The widget, for chaining
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
 * Item widgets have a reference to a OO.ui.mixin.GroupWidget while they are attached to the group.
 * This allows bidirectional communication.
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
 * @return {OO.ui.Widget} The widget, for chaining
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
 * @mixins OO.ui.mixin.TitledElement
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
	OO.ui.mixin.TitledElement.call( this, config );

	// Properties
	this.highlighted = false;
	this.pressed = false;
	this.setSelected( !!config.selected );

	// Initialization
	this.$element
		.data( 'oo-ui-optionWidget', this )
		// Allow programmatic focussing (and by access key), but not tabbing
		.attr( 'tabindex', '-1' )
		.attr( 'role', 'option' )
		.addClass( 'oo-ui-optionWidget' )
		.append( this.$label );
};

/* Setup */

OO.inheritClass( OO.ui.OptionWidget, OO.ui.Widget );
OO.mixinClass( OO.ui.OptionWidget, OO.ui.mixin.ItemWidget );
OO.mixinClass( OO.ui.OptionWidget, OO.ui.mixin.LabelElement );
OO.mixinClass( OO.ui.OptionWidget, OO.ui.mixin.FlaggedElement );
OO.mixinClass( OO.ui.OptionWidget, OO.ui.mixin.AccessKeyedElement );
OO.mixinClass( OO.ui.OptionWidget, OO.ui.mixin.TitledElement );

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
 * may be selected when a user presses Enter key or clicks. Disabled items cannot
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
 * item may be selected when a user presses Enter key or clicks.
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
 * should be handled by the SelectWidget’s
 * {@link OO.ui.SelectWidget#selectItem selectItem( [item] )} method instead of this method.
 *
 * @param {boolean} [state=false] Select option
 * @chainable
 * @return {OO.ui.Widget} The widget, for chaining
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
 * @return {OO.ui.Widget} The widget, for chaining
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
 * @return {OO.ui.Widget} The widget, for chaining
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
 * This class should be used together with OO.ui.OptionWidget or OO.ui.DecoratedOptionWidget. For
 * more information, please see the [OOUI documentation on MediaWiki][1].
 *
 *     @example
 *     // A select widget with three options.
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
 *     $( document.body ).append( select.$element );
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
 * @cfg {boolean} [multiselect] Allow for multiple selections
 */
OO.ui.SelectWidget = function OoUiSelectWidget( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.SelectWidget.parent.call( this, config );

	// Mixin constructors
	OO.ui.mixin.GroupWidget.call( this, $.extend( {
		$group: this.$element
	}, config ) );

	// Properties
	this.pressed = false;
	this.selecting = null;
	this.multiselect = !!config.multiselect;
	this.onDocumentMouseUpHandler = this.onDocumentMouseUp.bind( this );
	this.onDocumentMouseMoveHandler = this.onDocumentMouseMove.bind( this );
	this.onDocumentKeyDownHandler = this.onDocumentKeyDown.bind( this );
	this.onDocumentKeyPressHandler = this.onDocumentKeyPress.bind( this );
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
		.addClass( 'oo-ui-selectWidget oo-ui-selectWidget-unpressed' )
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
 * A `select` event is emitted when the selection is modified programmatically with the #selectItem
 * method.
 *
 * @param {OO.ui.OptionWidget[]|OO.ui.OptionWidget|null} items Currently selected items
 */

/**
 * @event choose
 *
 * A `choose` event is emitted when an item is chosen with the #chooseItem method.
 *
 * @param {OO.ui.OptionWidget} item Chosen item
 * @param {boolean} selected Item is selected
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

/* Static methods */

/**
 * Normalize text for filter matching
 *
 * @param {string} text Text
 * @return {string} Normalized text
 */
OO.ui.SelectWidget.static.normalizeForMatching = function ( text ) {
	// Replace trailing whitespace, normalize multiple spaces and make case insensitive
	var normalized = text.trim().replace( /\s+/, ' ' ).toLowerCase();

	// Normalize Unicode
	// eslint-disable-next-line no-restricted-properties
	if ( normalized.normalize ) {
		// eslint-disable-next-line no-restricted-properties
		normalized = normalized.normalize();
	}
	return normalized;
};

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
			// They can't be tabbed to, but they can be activated using access keys.
			// OptionWidgets and focusable UI elements inside them have tabindex="-1" set.
			item = this.findTargetItem( event );
		} else {
			// There is something actually user-focusable in one of the labels of the options, and
			// the user focussed it (e.g. by tabbing to it). Do nothing (especially, don't change
			// the focus).
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
		this.$focusOwner.trigger( 'focus' );
	}
};

/**
 * Handle mouse down events.
 *
 * @private
 * @param {jQuery.Event} e Mouse down event
 * @return {undefined|boolean} False to prevent default if event is handled
 */
OO.ui.SelectWidget.prototype.onMouseDown = function ( e ) {
	var item;

	if ( !this.isDisabled() && e.which === OO.ui.MouseButtons.LEFT ) {
		this.togglePressed( true );
		item = this.findTargetItem( e );
		if ( item && item.isSelectable() ) {
			this.pressItem( item );
			this.selecting = item;
			this.getElementDocument().addEventListener( 'mouseup', this.onDocumentMouseUpHandler, true );
			this.getElementDocument().addEventListener( 'mousemove', this.onDocumentMouseMoveHandler, true );
		}
	}
	return false;
};

/**
 * Handle document mouse up events.
 *
 * @private
 * @param {MouseEvent} e Mouse up event
 * @return {undefined|boolean} False to prevent default if event is handled
 */
OO.ui.SelectWidget.prototype.onDocumentMouseUp = function ( e ) {
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

	this.getElementDocument().removeEventListener( 'mouseup', this.onDocumentMouseUpHandler, true );
	this.getElementDocument().removeEventListener( 'mousemove', this.onDocumentMouseMoveHandler, true );

	return false;
};

/**
 * Handle document mouse move events.
 *
 * @private
 * @param {MouseEvent} e Mouse move event
 */
OO.ui.SelectWidget.prototype.onDocumentMouseMove = function ( e ) {
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
 * @return {undefined|boolean} False to prevent default if event is handled
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
 * @return {undefined|boolean} False to prevent default if event is handled
 */
OO.ui.SelectWidget.prototype.onMouseLeave = function () {
	if ( !this.isDisabled() ) {
		this.highlightItem( null );
	}
	return false;
};

/**
 * Handle document key down events.
 *
 * @protected
 * @param {KeyboardEvent} e Key down event
 */
OO.ui.SelectWidget.prototype.onDocumentKeyDown = function ( e ) {
	var nextItem,
		handled = false,
		selected = this.findSelectedItems(),
		currentItem = this.findHighlightedItem() || (
			Array.isArray( selected ) ? selected[ 0 ] : selected
		),
		firstItem = this.getItems()[ 0 ];

	if ( !this.isDisabled() && this.isVisible() ) {
		switch ( e.keyCode ) {
			case OO.ui.Keys.ENTER:
				if ( currentItem ) {
					// Was only highlighted, now let's select it. No-op if already selected.
					this.chooseItem( currentItem );
					handled = true;
				}
				break;
			case OO.ui.Keys.UP:
			case OO.ui.Keys.LEFT:
				this.clearKeyPressBuffer();
				nextItem = currentItem ?
					this.findRelativeSelectableItem( currentItem, -1 ) : firstItem;
				handled = true;
				break;
			case OO.ui.Keys.DOWN:
			case OO.ui.Keys.RIGHT:
				this.clearKeyPressBuffer();
				nextItem = currentItem ?
					this.findRelativeSelectableItem( currentItem, 1 ) : firstItem;
				handled = true;
				break;
			case OO.ui.Keys.ESCAPE:
			case OO.ui.Keys.TAB:
				if ( currentItem ) {
					currentItem.setHighlighted( false );
				}
				this.unbindDocumentKeyDownListener();
				this.unbindDocumentKeyPressListener();
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
 * Bind document key down listener.
 *
 * @protected
 */
OO.ui.SelectWidget.prototype.bindDocumentKeyDownListener = function () {
	this.getElementDocument().addEventListener( 'keydown', this.onDocumentKeyDownHandler, true );
};

/**
 * Unbind document key down listener.
 *
 * @protected
 */
OO.ui.SelectWidget.prototype.unbindDocumentKeyDownListener = function () {
	this.getElementDocument().removeEventListener( 'keydown', this.onDocumentKeyDownHandler, true );
};

/**
 * Scroll item into view, preventing spurious mouse highlight actions from happening.
 *
 * @param {OO.ui.OptionWidget} item Item to scroll into view
 */
OO.ui.SelectWidget.prototype.scrollItemIntoView = function ( item ) {
	var widget = this;
	// Chromium's Blink engine will generate spurious 'mouseover' events during programmatic
	// scrolling and around 100-150 ms after it is finished.
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
 * @return {undefined|boolean} False to prevent default if event is handled
 */
OO.ui.SelectWidget.prototype.onDocumentKeyPress = function ( e ) {
	var c, filter, item, selected;

	if ( !e.charCode ) {
		if ( e.keyCode === OO.ui.Keys.BACKSPACE && this.keyPressBuffer !== '' ) {
			this.keyPressBuffer = this.keyPressBuffer.substr( 0, this.keyPressBuffer.length - 1 );
			return false;
		}
		return;
	}
	// eslint-disable-next-line no-restricted-properties
	if ( String.fromCodePoint ) {
		// eslint-disable-next-line no-restricted-properties
		c = String.fromCodePoint( e.charCode );
	} else {
		c = String.fromCharCode( e.charCode );
	}

	if ( this.keyPressBufferTimer ) {
		clearTimeout( this.keyPressBufferTimer );
	}
	this.keyPressBufferTimer = setTimeout( this.clearKeyPressBuffer.bind( this ), 1500 );

	selected = this.findSelectedItems();
	item = this.findHighlightedItem() || (
		Array.isArray( selected ) ? selected[ 0 ] : selected
	);

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
 * @param {string} query String to match against items
 * @param {string} [mode='prefix'] Matching mode: 'substring', 'prefix', or 'exact'
 * @return {Function} function ( OO.ui.OptionWidget ) => boolean
 */
OO.ui.SelectWidget.prototype.getItemMatcher = function ( query, mode ) {
	var normalizeForMatching = this.constructor.static.normalizeForMatching,
		normalizedQuery = normalizeForMatching( query );

	// Support deprecated exact=true argument
	if ( mode === true ) {
		mode = 'exact';
	}

	return function ( item ) {
		var matchText = normalizeForMatching( item.getMatchText() );

		if ( normalizedQuery === '' ) {
			// Empty string matches all, except if we are in 'exact'
			// mode, where it doesn't match at all
			return mode !== 'exact';
		}

		switch ( mode ) {
			case 'exact':
				return matchText === normalizedQuery;
			case 'substring':
				return matchText.indexOf( normalizedQuery ) !== -1;
			// 'prefix'
			default:
				return matchText.indexOf( normalizedQuery ) === 0;
		}
	};
};

/**
 * Bind document key press listener.
 *
 * @protected
 */
OO.ui.SelectWidget.prototype.bindDocumentKeyPressListener = function () {
	this.getElementDocument().addEventListener( 'keypress', this.onDocumentKeyPressHandler, true );
};

/**
 * Unbind document key down listener.
 *
 * If you override this, be sure to call this.clearKeyPressBuffer() from your
 * implementation.
 *
 * @protected
 */
OO.ui.SelectWidget.prototype.unbindDocumentKeyPressListener = function () {
	this.getElementDocument().removeEventListener( 'keypress', this.onDocumentKeyPressHandler, true );
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
 * Find all selected items, if there are any. If the widget allows for multiselect
 * it will return an array of selected options. If the widget doesn't allow for
 * multiselect, it will return the selected option or null if no item is selected.
 *
 * @return {OO.ui.OptionWidget[]|OO.ui.OptionWidget|null} If the widget is multiselect
 *  then return an array of selected items (or empty array),
 *  if the widget is not multiselect, return a single selected item, or `null`
 *  if no item is selected
 */
OO.ui.SelectWidget.prototype.findSelectedItems = function () {
	var selected = this.items.filter( function ( item ) {
		return item.isSelected();
	} );

	return this.multiselect ?
		selected :
		selected[ 0 ] || null;
};

/**
 * Find selected item.
 *
 * @return {OO.ui.OptionWidget[]|OO.ui.OptionWidget|null} If the widget is multiselect
 *  then return an array of selected items (or empty array),
 *  if the widget is not multiselect, return a single selected item, or `null`
 *  if no item is selected
 */
OO.ui.SelectWidget.prototype.findSelectedItem = function () {
	return this.findSelectedItems();
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
			.toggleClass( 'oo-ui-selectWidget-unpressed', !pressed );
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
 * @return {OO.ui.Widget} The widget, for chaining
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
		filter = this.getItemMatcher( label, 'exact' );

	for ( i = 0; i < len; i++ ) {
		item = this.items[ i ];
		if ( item instanceof OO.ui.OptionWidget && item.isSelectable() && filter( item ) ) {
			return item;
		}
	}

	if ( prefix ) {
		found = null;
		filter = this.getItemMatcher( label, 'prefix' );
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
 * @return {OO.ui.Widget} The widget, for chaining
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
 * @return {OO.ui.Widget} The widget, for chaining
 */
OO.ui.SelectWidget.prototype.selectItemByData = function ( data ) {
	var itemFromData = this.findItemFromData( data );
	if ( data === undefined || !itemFromData ) {
		return this.selectItem();
	}
	return this.selectItem( itemFromData );
};

/**
 * Programmatically unselect an option by its reference. If the widget
 * allows for multiple selections, there may be other items still selected;
 * otherwise, no items will be selected.
 * If no item is given, all selected items will be unselected.
 *
 * @param {OO.ui.OptionWidget} [item] Item to unselect
 * @fires select
 * @chainable
 * @return {OO.ui.Widget} The widget, for chaining
 */
OO.ui.SelectWidget.prototype.unselectItem = function ( item ) {
	if ( item ) {
		item.setSelected( false );
	} else {
		this.items.forEach( function ( item ) {
			item.setSelected( false );
		} );
	}

	this.emit( 'select', this.findSelectedItems() );
	return this;
};

/**
 * Programmatically select an option by its reference. If the `item` parameter is omitted,
 * all options will be deselected.
 *
 * @param {OO.ui.OptionWidget} [item] Item to select, omit to deselect all
 * @fires select
 * @chainable
 * @return {OO.ui.Widget} The widget, for chaining
*/
OO.ui.SelectWidget.prototype.selectItem = function ( item ) {
	var i, len, selected,
		changed = false;

	if ( this.multiselect && item ) {
		// Select the item directly
		item.setSelected( true );
	} else {
		for ( i = 0, len = this.items.length; i < len; i++ ) {
			selected = this.items[ i ] === item;
			if ( this.items[ i ].isSelected() !== selected ) {
				this.items[ i ].setSelected( selected );
				changed = true;
			}
		}
	}
	if ( changed ) {
		// TODO: When should a non-highlightable element be selected?
		if ( item && !item.constructor.static.highlightable ) {
			if ( item ) {
				this.$focusOwner.attr( 'aria-activedescendant', item.getElementId() );
			} else {
				this.$focusOwner.removeAttr( 'aria-activedescendant' );
			}
		}
		this.emit( 'select', this.findSelectedItems() );
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
 * @return {OO.ui.Widget} The widget, for chaining
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
 * @return {OO.ui.Widget} The widget, for chaining
 */
OO.ui.SelectWidget.prototype.chooseItem = function ( item ) {
	if ( item ) {
		if ( this.multiselect && item.isSelected() ) {
			this.unselectItem( item );
		} else {
			this.selectItem( item );
		}

		this.emit( 'choose', item, item.isSelected() );
	}

	return this;
};

/**
 * Find an option by its position relative to the specified item (or to the start of the option
 * array, if item is `null`). The direction in which to search through the option array is specified
 * with a number: -1 for reverse (the default) or 1 for forward. The method will return an option,
 * or `null` if there are no options in the array.
 *
 * @param {OO.ui.OptionWidget|null} item Item to describe the start position, or `null` to start at
 *  the beginning of the array.
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
 * @return {OO.ui.Widget} The widget, for chaining
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
 * @return {OO.ui.Widget} The widget, for chaining
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
 * @return {OO.ui.Widget} The widget, for chaining
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
 * This is used to set `aria-activedescendant` and `aria-expanded` on it.
 *
 * @protected
 * @param {jQuery} $focusOwner
 */
OO.ui.SelectWidget.prototype.setFocusOwner = function ( $focusOwner ) {
	this.$focusOwner = $focusOwner;
};

/**
 * DecoratedOptionWidgets are {@link OO.ui.OptionWidget options} that can be configured
 * with an {@link OO.ui.mixin.IconElement icon} and/or
 * {@link OO.ui.mixin.IndicatorElement indicator}.
 * This class is used with OO.ui.SelectWidget to create a selection of mutually exclusive
 * options. For more information about options and selects, please see the
 * [OOUI documentation on MediaWiki][1].
 *
 *     @example
 *     // Decorated options in a select widget.
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
 *     $( document.body ).append( select.$element );
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
 * MenuSectionOptionWidgets are used inside {@link OO.ui.MenuSelectWidget menu select widgets} to
 * group one or more related {@link OO.ui.MenuOptionWidget menu options}. MenuSectionOptionWidgets
 * cannot be highlighted or selected.
 *
 *     @example
 *     var dropdown = new OO.ui.DropdownWidget( {
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
 *     $( document.body ).append( dropdown.$element );
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
	this.$element
		.addClass( 'oo-ui-menuSectionOptionWidget' )
		.removeAttr( 'role aria-selected' );
	this.selected = false;
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
 * See {@link OO.ui.DropdownWidget DropdownWidget},
 * {@link OO.ui.ComboBoxInputWidget ComboBoxInputWidget}, and
 * {@link OO.ui.mixin.LookupElement LookupElement} for examples of widgets that contain menus.
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
 * - Escape key: hide the menu
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
 * @cfg {OO.ui.TextInputWidget} [input] Text input used to implement option highlighting for menu
 *  items that match the text the user types. This config is used by
 *  {@link OO.ui.ComboBoxInputWidget ComboBoxInputWidget} and
 *  {@link OO.ui.mixin.LookupElement LookupElement}
 * @cfg {jQuery} [$input] Text input used to implement option highlighting for menu items that match
 *  the text the user types. This config is used by
 *  {@link OO.ui.TagMultiselectWidget TagMultiselectWidget}
 * @cfg {OO.ui.Widget} [widget] Widget associated with the menu's active state. If the user clicks
 *  the mouse anywhere on the page outside of this widget, the menu is hidden. For example, if
 *  there is a button that toggles the menu's visibility on click, the menu will be hidden then
 *  re-shown when the user clicks that button, unless the button (or its parent widget) is passed
 *  in here.
 * @cfg {boolean} [autoHide=true] Hide the menu when the mouse is pressed outside the menu.
 * @cfg {jQuery} [$autoCloseIgnore] If these elements are clicked, don't auto-hide the menu.
 * @cfg {boolean} [hideOnChoose=true] Hide the menu when the user chooses an option.
 * @cfg {boolean} [filterFromInput=false] Filter the displayed options from the input
 * @cfg {boolean} [highlightOnFilter] Highlight the first result when filtering
 * @cfg {string} [filterMode='prefix'] The mode by which the menu filters the results.
 *  Options are 'exact', 'prefix' or 'substring'. See `OO.ui.SelectWidget#getItemMatcher`
 * @param {number|string} [width] Width of the menu as a number of pixels or CSS string with unit
 *  suffix, used by {@link OO.ui.mixin.ClippableElement ClippableElement}
 */
OO.ui.MenuSelectWidget = function OoUiMenuSelectWidget( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.MenuSelectWidget.parent.call( this, config );

	// Mixin constructors
	OO.ui.mixin.ClippableElement.call( this, $.extend( { $clippable: this.$group }, config ) );
	OO.ui.mixin.FloatableElement.call( this, config );

	// Initial vertical positions other than 'center' will result in
	// the menu being flipped if there is not enough space in the container.
	// Store the original position so we know what to reset to.
	this.originalVerticalPosition = this.verticalPosition;

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
	this.lastHighlightedItem = null;
	this.width = config.width;
	this.filterMode = config.filterMode;

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
	this.$focusOwner.attr( 'aria-expanded', 'false' );
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

/* Static properties */

/**
 * Positions to flip to if there isn't room in the container for the
 * menu in a specific direction.
 *
 * @property {Object.<string,string>}
 */
OO.ui.MenuSelectWidget.static.flippedPositions = {
	below: 'above',
	above: 'below',
	top: 'bottom',
	bottom: 'top'
};

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
OO.ui.MenuSelectWidget.prototype.onDocumentKeyDown = function ( e ) {
	var currentItem = this.findHighlightedItem() || this.findSelectedItem();

	if ( !this.isDisabled() && this.isVisible() ) {
		switch ( e.keyCode ) {
			case OO.ui.Keys.LEFT:
			case OO.ui.Keys.RIGHT:
				// Do nothing if a text field is associated, arrow keys will be handled natively
				if ( !this.$input ) {
					OO.ui.MenuSelectWidget.parent.prototype.onDocumentKeyDown.call( this, e );
				}
				break;
			case OO.ui.Keys.ESCAPE:
			case OO.ui.Keys.TAB:
				if ( currentItem && !this.multiselect ) {
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
				OO.ui.MenuSelectWidget.parent.prototype.onDocumentKeyDown.call( this, e );
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
	var i, item, items, visible, section, sectionEmpty, filter, exactFilter,
		anyVisible = false,
		len = this.items.length,
		showAll = !this.isVisible(),
		exactMatch = false;

	if ( this.$input && this.filterFromInput ) {
		filter = showAll ? null : this.getItemMatcher( this.$input.val(), this.filterMode );
		exactFilter = this.getItemMatcher( this.$input.val(), 'exact' );
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
			}
		}
		// Process the final section
		if ( section ) {
			section.toggle( showAll || !sectionEmpty );
		}

		if ( !anyVisible ) {
			this.highlightItem( null );
		}

		this.$element.toggleClass( 'oo-ui-menuSelectWidget-invisible', !anyVisible );

		if (
			this.highlightOnFilter &&
			!( this.lastHighlightedItem && this.lastHighlightedItem.isVisible() )
		) {
			// Highlight the first item on the list
			item = null;
			items = this.getItems();
			for ( i = 0; i < items.length; i++ ) {
				if ( items[ i ].isVisible() ) {
					item = items[ i ];
					break;
				}
			}
			this.highlightItem( item );
			this.lastHighlightedItem = item;
		}

	}

	// Reevaluate clipping
	this.clip();
};

/**
 * @inheritdoc
 */
OO.ui.MenuSelectWidget.prototype.bindDocumentKeyDownListener = function () {
	if ( this.$input ) {
		this.$input.on( 'keydown', this.onDocumentKeyDownHandler );
	} else {
		OO.ui.MenuSelectWidget.parent.prototype.bindDocumentKeyDownListener.call( this );
	}
};

/**
 * @inheritdoc
 */
OO.ui.MenuSelectWidget.prototype.unbindDocumentKeyDownListener = function () {
	if ( this.$input ) {
		this.$input.off( 'keydown', this.onDocumentKeyDownHandler );
	} else {
		OO.ui.MenuSelectWidget.parent.prototype.unbindDocumentKeyDownListener.call( this );
	}
};

/**
 * @inheritdoc
 */
OO.ui.MenuSelectWidget.prototype.bindDocumentKeyPressListener = function () {
	if ( this.$input ) {
		if ( this.filterFromInput ) {
			this.$input.on(
				'keydown mouseup cut paste change input select',
				this.onInputEditHandler
			);
			this.updateItemVisibility();
		}
	} else {
		OO.ui.MenuSelectWidget.parent.prototype.bindDocumentKeyPressListener.call( this );
	}
};

/**
 * @inheritdoc
 */
OO.ui.MenuSelectWidget.prototype.unbindDocumentKeyPressListener = function () {
	if ( this.$input ) {
		if ( this.filterFromInput ) {
			this.$input.off(
				'keydown mouseup cut paste change input select',
				this.onInputEditHandler
			);
			this.updateItemVisibility();
		}
	} else {
		OO.ui.MenuSelectWidget.parent.prototype.unbindDocumentKeyPressListener.call( this );
	}
};

/**
 * Choose an item.
 *
 * When a user chooses an item, the menu is closed, unless the hideOnChoose config option is
 * set to false.
 *
 * Note that ‘choose’ should never be modified programmatically. A user can choose an option with
 * the keyboard or mouse and it becomes selected. To select an item programmatically,
 * use the #selectItem method.
 *
 * @param {OO.ui.OptionWidget} item Item to choose
 * @chainable
 * @return {OO.ui.Widget} The widget, for chaining
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
	var change, originalHeight, flippedHeight, selectedItem;

	visible = ( visible === undefined ? !this.visible : !!visible ) && !!this.items.length;
	change = visible !== this.isVisible();

	if ( visible && !this.warnedUnattached && !this.isElementAttached() ) {
		OO.ui.warnDeprecation( 'MenuSelectWidget#toggle: Before calling this method, the menu must be attached to the DOM.' );
		this.warnedUnattached = true;
	}

	if ( change && visible ) {
		// Reset position before showing the popup again. It's possible we no longer need to flip
		// (e.g. if the user scrolled).
		this.setVerticalPosition( this.originalVerticalPosition );
	}

	// Parent method
	OO.ui.MenuSelectWidget.parent.prototype.toggle.call( this, visible );

	if ( change ) {
		if ( visible ) {

			if ( this.width ) {
				this.setIdealSize( this.width );
			} else if ( this.$floatableContainer ) {
				this.$clippable.css( 'width', 'auto' );
				this.setIdealSize(
					this.$floatableContainer[ 0 ].offsetWidth > this.$clippable[ 0 ].offsetWidth ?
						// Dropdown is smaller than handle so expand to width
						this.$floatableContainer[ 0 ].offsetWidth :
						// Dropdown is larger than handle so auto size
						'auto'
				);
				this.$clippable.css( 'width', '' );
			}

			this.togglePositioning( !!this.$floatableContainer );
			this.toggleClipping( true );

			this.bindDocumentKeyDownListener();
			this.bindDocumentKeyPressListener();

			if (
				( this.isClippedVertically() || this.isFloatableOutOfView() ) &&
				this.originalVerticalPosition !== 'center'
			) {
				// If opening the menu in one direction causes it to be clipped, flip it
				originalHeight = this.$element.height();
				this.setVerticalPosition(
					this.constructor.static.flippedPositions[ this.originalVerticalPosition ]
				);
				if ( this.isClippedVertically() || this.isFloatableOutOfView() ) {
					// If flipping also causes it to be clipped, open in whichever direction
					// we have more space
					flippedHeight = this.$element.height();
					if ( originalHeight > flippedHeight ) {
						this.setVerticalPosition( this.originalVerticalPosition );
					}
				}
			}
			// Note that we do not flip the menu's opening direction if the clipping changes
			// later (e.g. after the user scrolls), that seems like it would be annoying

			this.$focusOwner.attr( 'aria-expanded', 'true' );

			selectedItem = this.findSelectedItem();
			if ( !this.multiselect && selectedItem ) {
				// TODO: Verify if this is even needed; This is already done on highlight changes
				// in SelectWidget#highlightItem, so we should just need to highlight the item
				// we need to highlight here and not bother with attr or checking selections.
				this.$focusOwner.attr( 'aria-activedescendant', selectedItem.getElementId() );
				selectedItem.scrollElementIntoView( { duration: 0 } );
			}

			// Auto-hide
			if ( this.autoHide ) {
				this.getElementDocument().addEventListener( 'mousedown', this.onDocumentMouseDownHandler, true );
			}

			this.emit( 'ready' );
		} else {
			this.$focusOwner.removeAttr( 'aria-activedescendant' );
			this.unbindDocumentKeyDownListener();
			this.unbindDocumentKeyPressListener();
			this.$focusOwner.attr( 'aria-expanded', 'false' );
			this.getElementDocument().removeEventListener( 'mousedown', this.onDocumentMouseDownHandler, true );
			this.togglePositioning( false );
			this.toggleClipping( false );
			this.lastHighlightedItem = null;
		}
	}

	return this;
};

/**
 * Scroll to the top of the menu
 */
OO.ui.MenuSelectWidget.prototype.scrollToTop = function () {
	this.$element.scrollTop( 0 );
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
 *     // A DropdownWidget with a menu that contains three options.
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
 *     $( document.body ).append( dropDown.$element );
 *
 *     dropDown.getMenu().selectItemByData( 'b' );
 *
 *     dropDown.getMenu().findSelectedItem().getData(); // Returns 'b'.
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
 * @cfg {Object} [menu] Configuration options to pass to
 *  {@link OO.ui.MenuSelectWidget menu select widget}.
 * @cfg {jQuery|boolean} [$overlay] Render the menu into a separate layer. This configuration is
 *  useful in cases where the expanded menu is larger than its containing `<div>`. The specified
 *  overlay layer is usually on top of the containing `<div>` and has a larger area. By default,
 *  the menu uses relative positioning. Pass 'true' to use the default overlay.
 *  See <https://www.mediawiki.org/wiki/OOUI/Concepts#Overlays>.
 */
OO.ui.DropdownWidget = function OoUiDropdownWidget( config ) {
	// Configuration initialization
	config = $.extend( { indicator: 'down' }, config );

	// Parent constructor
	OO.ui.DropdownWidget.parent.call( this, config );

	// Properties (must be set before TabIndexedElement constructor call)
	this.$handle = $( '<span>' );
	this.$overlay = ( config.$overlay === true ?
		OO.ui.getDefaultOverlay() : config.$overlay ) || this.$element;

	// Mixin constructors
	OO.ui.mixin.IconElement.call( this, config );
	OO.ui.mixin.IndicatorElement.call( this, config );
	OO.ui.mixin.LabelElement.call( this, config );
	OO.ui.mixin.TitledElement.call( this, $.extend( {
		$titled: this.$label
	}, config ) );
	OO.ui.mixin.TabIndexedElement.call( this, $.extend( {
		$tabIndexed: this.$handle
	}, config ) );

	// Properties
	this.menu = new OO.ui.MenuSelectWidget( $.extend( {
		widget: this,
		$floatableContainer: this.$element
	}, config.menu ) );

	// Events
	this.$handle.on( {
		click: this.onClick.bind( this ),
		keydown: this.onKeyDown.bind( this ),
		// Hack? Handle type-to-search when menu is not expanded and not handling its own events.
		keypress: this.menu.onDocumentKeyPressHandler,
		blur: this.menu.clearKeyPressBuffer.bind( this.menu )
	} );
	this.menu.connect( this, {
		select: 'onMenuSelect',
		toggle: 'onMenuToggle'
	} );

	// Initialization
	this.$label
		.attr( {
			role: 'textbox',
			'aria-readonly': 'true'
		} );
	this.$handle
		.addClass( 'oo-ui-dropdownWidget-handle' )
		.append( this.$icon, this.$label, this.$indicator )
		.attr( {
			role: 'combobox',
			'aria-autocomplete': 'list',
			'aria-expanded': 'false',
			'aria-haspopup': 'true',
			'aria-owns': this.menu.getElementId()
		} );
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
	if ( selectedLabel instanceof $ ) {
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
};

/**
 * Handle mouse click events.
 *
 * @private
 * @param {jQuery.Event} e Mouse click event
 * @return {undefined|boolean} False to prevent default if event is handled
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
 * @return {undefined|boolean} False to prevent default if event is handled
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
 *             data: 'a',
 *             label: 'Selected radio option'
 *         } ),
 *         option2 = new OO.ui.RadioOptionWidget( {
 *             data: 'b',
 *             label: 'Unselected radio option'
 *         } );
 *         radioSelect = new OO.ui.RadioSelectWidget( {
 *             items: [ option1, option2 ]
 *         } );
 *
 *     // Select 'option 1' using the RadioSelectWidget's selectItem() method.
 *     radioSelect.selectItem( option1 );
 *
 *     $( document.body ).append( radioSelect.$element );
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
		focus: this.bindDocumentKeyDownListener.bind( this ),
		blur: this.unbindDocumentKeyDownListener.bind( this )
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
 * [1]: https://www.mediawiki.org/wiki/OOUI/Widgets/Selects_and_Options
 *
 * @class
 * @extends OO.ui.Widget
 * @mixins OO.ui.mixin.ItemWidget
 * @mixins OO.ui.mixin.LabelElement
 * @mixins OO.ui.mixin.TitledElement
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
	OO.ui.mixin.TitledElement.call( this, config );

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
OO.mixinClass( OO.ui.MultioptionWidget, OO.ui.mixin.TitledElement );

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
 * should be handled by the SelectWidget’s
 * {@link OO.ui.SelectWidget#selectItem selectItem( [item] )} method instead of this method.
 *
 * @param {boolean} [state=false] Select option
 * @chainable
 * @return {OO.ui.Widget} The widget, for chaining
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
 * For more information about menus and options, please see the [OOUI documentation
 * on MediaWiki][1].
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Widgets/Selects_and_Options#Menu_selects_and_options
 *
 * @class
 * @abstract
 * @extends OO.ui.Widget
 * @mixins OO.ui.mixin.GroupWidget
 * @mixins OO.ui.mixin.TitledElement
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
	OO.ui.mixin.TitledElement.call( this, config );

	// Events
	this.aggregate( {
		change: 'select'
	} );
	// This is mostly for compatibility with TagMultiselectWidget... normally, 'change' is emitted
	// by GroupElement only when items are added/removed
	this.connect( this, {
		select: [ 'emit', 'change' ]
	} );

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
OO.mixinClass( OO.ui.MultiselectWidget, OO.ui.mixin.TitledElement );

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
 * Select options by reference. Options not mentioned in the `items` array will be deselected.
 *
 * @param {OO.ui.MultioptionWidget[]} items Items to select
 * @chainable
 * @return {OO.ui.Widget} The widget, for chaining
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
 * @return {OO.ui.Widget} The widget, for chaining
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
 *             data: 'a',
 *             selected: true,
 *             label: 'Selected checkbox'
 *         } ),
 *         option2 = new OO.ui.CheckboxMultioptionWidget( {
 *             data: 'b',
 *             label: 'Unselected checkbox'
 *         } ),
 *         multiselect = new OO.ui.CheckboxMultiselectWidget( {
 *             items: [ option1, option2 ]
 *         } );
 *     $( document.body ).append( multiselect.$element );
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
	this.$element.addClass( 'oo-ui-checkboxMultiselectWidget' );
};

/* Setup */

OO.inheritClass( OO.ui.CheckboxMultiselectWidget, OO.ui.MultiselectWidget );

/* Methods */

/**
 * Get an option by its position relative to the specified item (or to the start of the
 * option array, if item is `null`). The direction in which to search through the option array
 * is specified with a number: -1 for reverse (the default) or 1 for forward. The method will
 * return an option, or `null` if there are no options in the array.
 *
 * @param {OO.ui.CheckboxMultioptionWidget|null} item Item to describe the start position, or
 *  `null` to start at the beginning of the array.
 * @param {number} direction Direction to move in: -1 to move backward, 1 to move forward
 * @return {OO.ui.CheckboxMultioptionWidget|null} Item at position, `null` if there are no items
 *  in the select.
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
		// If it's the same item, either the user is being silly, or it's a fake event generated
		// by the browser. In either case we don't need custom handling.
		if ( nowClickedIndex !== lastClickedIndex ) {
			items = this.items;
			wasSelected = items[ nowClickedIndex ].isSelected();
			direction = nowClickedIndex > lastClickedIndex ? 1 : -1;

			// This depends on the DOM order of the items and the order of the .items array being
			// the same.
			for ( i = lastClickedIndex; i !== nowClickedIndex; i += direction ) {
				if ( !items[ i ].isDisabled() ) {
					items[ i ].setSelected( !wasSelected );
				}
			}
			// For the now-clicked element, use immediate timeout to allow the browser to do its own
			// handling first, then set our value. The order in which events happen is different for
			// clicks on the <input> and on the <label> and there are additional fake clicks fired
			// for non-click actions that change the checkboxes.
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
 * @return {OO.ui.Widget} The widget, for chaining
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
 * The value of the `progress` configuration determines whether the bar is determinate
 * or indeterminate.
 *
 *     @example
 *     // Examples of determinate and indeterminate progress bars.
 *     var progressBar1 = new OO.ui.ProgressBarWidget( {
 *         progress: 33
 *     } );
 *     var progressBar2 = new OO.ui.ProgressBarWidget();
 *
 *     // Create a FieldsetLayout to layout progress bars.
 *     var fieldset = new OO.ui.FieldsetLayout;
 *     fieldset.addItems( [
 *         new OO.ui.FieldLayout( progressBar1, {
 *             label: 'Determinate',
 *             align: 'top'
 *         } ),
 *         new OO.ui.FieldLayout( progressBar2, {
 *             label: 'Indeterminate',
 *             align: 'top'
 *         } )
 *     ] );
 *     $( document.body ).append( fieldset.$element );
 *
 * @class
 * @extends OO.ui.Widget
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {number|boolean} [progress=false] The type of progress bar (determinate or indeterminate).
 *  To create a determinate progress bar, specify a number that reflects the initial
 *  percent complete.
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
 * Get the percent of the progress that has been completed. Indeterminate progresses will
 * return `false`.
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
 * include {@link OO.ui.TextInputWidget text inputs}, {@link OO.ui.CheckboxInputWidget checkbox
 * inputs}, {@link OO.ui.RadioInputWidget radio inputs}, and
 * {@link OO.ui.ButtonInputWidget button inputs}.
 * See the [OOUI documentation on MediaWiki] [1] for more information and examples.
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Widgets/Inputs
 *
 * @abstract
 * @class
 * @extends OO.ui.Widget
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
 * @cfg {Function} [inputFilter] The name of an input filter function. Input filters modify the
 *  value of an input before it is accepted.
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
	OO.ui.mixin.TabIndexedElement.call( this, $.extend( {
		$tabIndexed: this.$input
	}, config ) );
	OO.ui.mixin.TitledElement.call( this, $.extend( {
		$titled: this.$input
	}, config ) );
	OO.ui.mixin.AccessKeyedElement.call( this, $.extend( {
		$accessKeyed: this.$input
	}, config ) );

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
		// Might be better in TabIndexedElement, but it's awkward to do there because
		// mixins are awkward
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
 * @return {OO.ui.Widget} The widget, for chaining
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
 * @return {OO.ui.Widget} The widget, for chaining
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
 * @return {OO.ui.Widget} The widget, for chaining
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
 * Data widget intended for creating `<input type="hidden">` inputs.
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
 *     $( document.body ).append( button.$element );
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Widgets/Inputs#Button_inputs
 *
 * @class
 * @extends OO.ui.InputWidget
 * @mixins OO.ui.mixin.ButtonElement
 * @mixins OO.ui.mixin.IconElement
 * @mixins OO.ui.mixin.IndicatorElement
 * @mixins OO.ui.mixin.LabelElement
 * @mixins OO.ui.mixin.FlaggedElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {string} [type='button'] The value of the HTML `'type'` attribute:
 *  'button', 'submit' or 'reset'.
 * @cfg {boolean} [useInputTag=false] Use an `<input>` tag instead of a `<button>` tag, the default.
 *  Widgets configured to be an `<input>` do not support {@link #icon icons} and
 *  {@link #indicator indicators},
 *  non-plaintext {@link #label labels}, or {@link #value values}. In general, useInputTag should
 *  only be set to `true` when there’s need to support IE 6 in a form with multiple buttons.
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
	OO.ui.mixin.ButtonElement.call( this, $.extend( {
		$button: this.$input
	}, config ) );
	OO.ui.mixin.IconElement.call( this, config );
	OO.ui.mixin.IndicatorElement.call( this, config );
	OO.ui.mixin.LabelElement.call( this, config );
	OO.ui.mixin.FlaggedElement.call( this, config );

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
OO.mixinClass( OO.ui.ButtonInputWidget, OO.ui.mixin.FlaggedElement );

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
 * @return {OO.ui.Widget} The widget, for chaining
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
 * @return {OO.ui.Widget} The widget, for chaining
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
	// Disable generating `<label>` elements for buttons. One would very rarely need additional
	// label for a button, and it's already a big clickable target, and it causes
	// unexpected rendering.
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
 *     // An example of selected, unselected, and disabled checkbox inputs.
 *     var checkbox1 = new OO.ui.CheckboxInputWidget( {
 *             value: 'a',
 *              selected: true
 *         } ),
 *         checkbox2 = new OO.ui.CheckboxInputWidget( {
 *             value: 'b'
 *         } ),
 *         checkbox3 = new OO.ui.CheckboxInputWidget( {
 *             value:'c',
 *             disabled: true
 *         } ),
 *         // Create a fieldset layout with fields for each checkbox.
 *         fieldset = new OO.ui.FieldsetLayout( {
 *             label: 'Checkboxes'
 *         } );
 *     fieldset.addItems( [
 *         new OO.ui.FieldLayout( checkbox1, { label: 'Selected checkbox', align: 'inline' } ),
 *         new OO.ui.FieldLayout( checkbox2, { label: 'Unselected checkbox', align: 'inline' } ),
 *         new OO.ui.FieldLayout( checkbox3, { label: 'Disabled checkbox', align: 'inline' } ),
 *     ] );
 *     $( document.body ).append( fieldset.$element );
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Widgets/Inputs
 *
 * @class
 * @extends OO.ui.InputWidget
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {boolean} [selected=false] Select the checkbox initially. By default, the checkbox is
 *  not selected.
 * @cfg {boolean} [indeterminate=false] Whether the checkbox is in the indeterminate state.
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
	this.setIndeterminate( config.indeterminate !== undefined ? config.indeterminate : false );
};

/* Setup */

OO.inheritClass( OO.ui.CheckboxInputWidget, OO.ui.InputWidget );

/* Events */

/**
 * @event change
 *
 * A change event is emitted when the state of the input changes.
 *
 * @param {boolean} selected
 * @param {boolean} indeterminate
 */

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
			widget.setIndeterminate( widget.$input.prop( 'indeterminate' ) );
		} );
	}
};

/**
 * Set selection state of this checkbox.
 *
 * @param {boolean} state Selected state
 * @param {boolean} internal Used for internal calls to suppress events
 * @chainable
 * @return {OO.ui.CheckboxInputWidget} The widget, for chaining
 */
OO.ui.CheckboxInputWidget.prototype.setSelected = function ( state, internal ) {
	state = !!state;
	if ( this.selected !== state ) {
		this.selected = state;
		this.$input.prop( 'checked', this.selected );
		if ( !internal ) {
			this.setIndeterminate( false, true );
			this.emit( 'change', this.selected, this.indeterminate );
		}
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
 * Set indeterminate state of this checkbox.
 *
 * @param {boolean} state Indeterminate state
 * @param {boolean} internal Used for internal calls to suppress events
 * @chainable
 * @return {OO.ui.CheckboxInputWidget} The widget, for chaining
 */
OO.ui.CheckboxInputWidget.prototype.setIndeterminate = function ( state, internal ) {
	state = !!state;
	if ( this.indeterminate !== state ) {
		this.indeterminate = state;
		this.$input.prop( 'indeterminate', this.indeterminate );
		if ( !internal ) {
			this.setSelected( false, true );
			this.emit( 'change', this.selected, this.indeterminate );
		}
	}
	return this;
};

/**
 * Check if this checkbox is selected.
 *
 * @return {boolean} Checkbox is selected
 */
OO.ui.CheckboxInputWidget.prototype.isIndeterminate = function () {
	// Resynchronize our internal data with DOM data. Other scripts executing on the page can modify
	// it, and we won't know unless they're kind enough to trigger a 'change' event.
	var indeterminate = this.$input.prop( 'indeterminate' );
	if ( this.indeterminate !== indeterminate ) {
		this.setIndeterminate( indeterminate );
	}
	return this.indeterminate;
};

/**
 * @inheritdoc
 */
OO.ui.CheckboxInputWidget.prototype.simulateLabelClick = function () {
	if ( !this.isDisabled() ) {
		this.$handle.trigger( 'click' );
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
 * within an HTML form, such as a OO.ui.FormLayout. The selected value is synchronized with the
 * value of a hidden HTML `input` tag. Please see the [OOUI documentation on MediaWiki][1] for
 * more information about input widgets.
 *
 * A DropdownInputWidget always has a value (one of the options is always selected), unless there
 * are no options. If no `value` configuration option is provided, the first option is selected.
 * If you need a state representing no value (no option being selected), use a DropdownWidget.
 *
 * This and OO.ui.RadioSelectInputWidget support similar configuration options.
 *
 *     @example
 *     // A DropdownInputWidget with three options.
 *     var dropdownInput = new OO.ui.DropdownInputWidget( {
 *         options: [
 *             { data: 'a', label: 'First' },
 *             { data: 'b', label: 'Second', disabled: true },
 *             { optgroup: 'Group label' },
 *             { data: 'c', label: 'First sub-item)' }
 *         ]
 *     } );
 *     $( document.body ).append( dropdownInput.$element );
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Widgets/Inputs
 *
 * @class
 * @extends OO.ui.InputWidget
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {Object[]} [options=[]] Array of menu options in the format described above.
 * @cfg {Object} [dropdown] Configuration options for {@link OO.ui.DropdownWidget DropdownWidget}
 * @cfg {jQuery|boolean} [$overlay] Render the menu into a separate layer. This configuration is
 *  useful in cases where the expanded menu is larger than its containing `<div>`. The specified
 *  overlay layer is usually on top of the containing `<div>` and has a larger area. By default,
 *  the menu uses relative positioning. Pass 'true' to use the default overlay.
 *  See <https://www.mediawiki.org/wiki/OOUI/Concepts#Overlays>.
 */
OO.ui.DropdownInputWidget = function OoUiDropdownInputWidget( config ) {
	// Configuration initialization
	config = config || {};

	// Properties (must be done before parent constructor which calls #setDisabled)
	this.dropdownWidget = new OO.ui.DropdownWidget( $.extend(
		{
			$overlay: config.$overlay
		},
		config.dropdown
	) );
	// Set up the options before parent constructor, which uses them to validate config.value.
	// Use this instead of setOptions() because this.$input is not set up yet.
	this.setOptionsData( config.options || [] );

	// Parent constructor
	OO.ui.DropdownInputWidget.parent.call( this, config );

	// Events
	this.dropdownWidget.getMenu().connect( this, {
		select: 'onMenuSelect'
	} );

	// Initialization
	this.$element
		.addClass( 'oo-ui-dropdownInputWidget' )
		.append( this.dropdownWidget.$element );
	if ( OO.ui.isMobile() ) {
		this.$element.addClass( 'oo-ui-isMobile' );
	}
	this.setTabIndexedElement( this.dropdownWidget.$tabIndexed );
	this.setTitledElement( this.dropdownWidget.$handle );
};

/* Setup */

OO.inheritClass( OO.ui.DropdownInputWidget, OO.ui.InputWidget );

/* Methods */

/**
 * @inheritdoc
 * @protected
 */
OO.ui.DropdownInputWidget.prototype.getInputElement = function () {
	return $( '<select>' ).addClass( 'oo-ui-indicator-down' );
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
 * @return {OO.ui.Widget} The widget, for chaining
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
 * initialized yet.
 *
 * @param {Object[]} options Array of menu options (see #constructor for details).
 * @private
 */
OO.ui.DropdownInputWidget.prototype.setOptionsData = function ( options ) {
	var optionWidgets, optIndex, opt, previousOptgroup, optionWidget, optValue,
		widget = this;

	this.optionsDirty = true;

	// Go through all the supplied option configs and create either
	// MenuSectionOption or MenuOption widgets from each.
	optionWidgets = [];
	for ( optIndex = 0; optIndex < options.length; optIndex++ ) {
		opt = options[ optIndex ];

		if ( opt.optgroup !== undefined ) {
			// Create a <optgroup> menu item.
			optionWidget = widget.createMenuSectionOptionWidget( opt.optgroup );
			previousOptgroup = optionWidget;

		} else {
			// Create a normal <option> menu item.
			optValue = widget.cleanUpValue( opt.data );
			optionWidget = widget.createMenuOptionWidget(
				optValue,
				opt.label !== undefined ? opt.label : optValue
			);
		}

		// Disable the menu option if it is itself disabled or if its parent optgroup is disabled.
		if (
			opt.disabled !== undefined ||
			previousOptgroup instanceof OO.ui.MenuSectionOptionWidget &&
			previousOptgroup.isDisabled()
		) {
			optionWidget.setDisabled( true );
		}

		optionWidgets.push( optionWidget );
	}

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

		// Disable the option or optgroup if required.
		if ( optionWidget.isDisabled() ) {
			$optionNode.prop( 'disabled', true );
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
 *     $( document.body ).append( fieldset.$element );
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Widgets/Inputs
 *
 * @class
 * @extends OO.ui.InputWidget
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {boolean} [selected=false] Select the radio button initially. By default, the radio button
 *  is not selected.
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
 * @return {OO.ui.Widget} The widget, for chaining
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
		this.$input.trigger( 'click' );
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
 * RadioSelectInputWidget is a {@link OO.ui.RadioSelectWidget RadioSelectWidget} intended to be
 * used within an HTML form, such as a OO.ui.FormLayout. The selected value is synchronized with
 * the value of a hidden HTML `input` tag. Please see the [OOUI documentation on MediaWiki][1] for
 * more information about input widgets.
 *
 * This and OO.ui.DropdownInputWidget support similar configuration options.
 *
 *     @example
 *     // A RadioSelectInputWidget with three options
 *     var radioSelectInput = new OO.ui.RadioSelectInputWidget( {
 *         options: [
 *             { data: 'a', label: 'First' },
 *             { data: 'b', label: 'Second'},
 *             { data: 'c', label: 'Third' }
 *         ]
 *     } );
 *     $( document.body ).append( radioSelectInput.$element );
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
	this.radioSelectWidget.connect( this, {
		select: 'onMenuSelect'
	} );

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
 * @return {OO.ui.Widget} The widget, for chaining
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
 *     // A CheckboxMultiselectInputWidget with three options.
 *     var multiselectInput = new OO.ui.CheckboxMultiselectInputWidget( {
 *         options: [
 *             { data: 'a', label: 'First' },
 *             { data: 'b', label: 'Second' },
 *             { data: 'c', label: 'Third' }
 *         ]
 *     } );
 *     $( document.body ).append( multiselectInput.$element );
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Widgets/Inputs
 *
 * @class
 * @extends OO.ui.InputWidget
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {Object[]} [options=[]] Array of menu options in the format
 *  `{ data: …, label: …, disabled: … }`
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
	this.checkboxMultiselectWidget.connect( this, {
		select: 'onCheckboxesSelect'
	} );

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
	var state = OO.ui.CheckboxMultiselectInputWidget.parent.static.gatherPreInfuseState(
		node, config
	);
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
		singleValue = OO.ui.CheckboxMultiselectInputWidget.parent.prototype.cleanUpValue
			.call( this, value[ i ] );
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
 * @param {Object[]} options Array of menu options in the format
 *  `{ data: …, label: …, disabled: … }`
 * @chainable
 * @return {OO.ui.Widget} The widget, for chaining
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
 * @param {Object[]} options Array of menu options in the format
 *  `{ data: …, label: … }`
 * @private
 */
OO.ui.CheckboxMultiselectInputWidget.prototype.setOptionsData = function ( options ) {
	var widget = this;

	this.optionsDirty = true;

	this.checkboxMultiselectWidget
		.clearItems()
		.addItems( options.map( function ( opt ) {
			var optValue, item, optDisabled;
			optValue = OO.ui.CheckboxMultiselectInputWidget.parent.prototype.cleanUpValue
				.call( widget, opt.data );
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
 * with {@link OO.ui.mixin.IconElement icons}, {@link OO.ui.mixin.IndicatorElement indicators}, an
 * optional validation-pattern (used to determine if an input value is valid or not) and an input
 * filter, which modifies incoming values rather than validating them.
 * Please see the [OOUI documentation on MediaWiki] [1] for more information and examples.
 *
 * This widget can be used inside an HTML form, such as a OO.ui.FormLayout.
 *
 *     @example
 *     // A TextInputWidget.
 *     var textInput = new OO.ui.TextInputWidget( {
 *         value: 'Text input'
 *     } );
 *     $( document.body ).append( textInput.$element );
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Widgets/Inputs
 *
 * @class
 * @extends OO.ui.InputWidget
 * @mixins OO.ui.mixin.IconElement
 * @mixins OO.ui.mixin.IndicatorElement
 * @mixins OO.ui.mixin.PendingElement
 * @mixins OO.ui.mixin.LabelElement
 * @mixins OO.ui.mixin.FlaggedElement
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
 * @cfg {boolean} [required=false] Mark the field as required with `true`. Implies `indicator:
 *  'required'`. Note that `false` & setting `indicator: 'required' will result in no indicator
 *  shown.
 * @cfg {boolean} [autocomplete=true] Should the browser support autocomplete for this field
 * @cfg {boolean} [spellcheck] Should the browser support spellcheck for this field (`undefined`
 *  means leaving it up to the browser).
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

	// Parent constructor
	OO.ui.TextInputWidget.parent.call( this, config );

	// Mixin constructors
	OO.ui.mixin.IconElement.call( this, config );
	OO.ui.mixin.IndicatorElement.call( this, config );
	OO.ui.mixin.PendingElement.call( this, $.extend( { $pending: this.$input }, config ) );
	OO.ui.mixin.LabelElement.call( this, config );
	OO.ui.mixin.FlaggedElement.call( this, config );

	// Properties
	this.type = this.getSaneType( config );
	this.readOnly = false;
	this.required = false;
	this.validate = null;
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
		// different page and then clicks "Back". Re-enable it when leaving.
		// Borrowed from jQuery UI.
		$( window ).on( {
			beforeunload: function () {
				this.$input.removeAttr( 'autocomplete' );
			}.bind( this ),
			pageshow: function () {
				// Browsers don't seem to actually fire this event on "Back", they instead just
				// reload the whole page... it shouldn't hurt, though.
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
OO.mixinClass( OO.ui.TextInputWidget, OO.ui.mixin.FlaggedElement );

/* Static Properties */

OO.ui.TextInputWidget.static.validationPatterns = {
	'non-empty': /.+/,
	integer: /^\d+$/
};

/* Events */

/**
 * An `enter` event is emitted when the user presses Enter key inside the text box.
 *
 * @event enter
 */

/* Methods */

/**
 * Handle icon mouse down events.
 *
 * @private
 * @param {jQuery.Event} e Mouse down event
 * @return {undefined|boolean} False to prevent default if event is handled
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
 * @return {undefined|boolean} False to prevent default if event is handled
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
 * @fires enter If Enter key is pressed
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
 * @return {OO.ui.Widget} The widget, for chaining
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
 * @return {OO.ui.Widget} The widget, for chaining
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
		MutationObserver = window.MutationObserver ||
			window.WebKitMutationObserver ||
			window.MozMutationObserver,
		widget = this;

	if ( MutationObserver ) {
		// The new way. If only it wasn't so ugly.

		if ( this.isElementAttached() ) {
			// Widget is attached already, do nothing. This breaks the functionality of this
			// function when the widget is detached and reattached. Alas, doing this correctly with
			// MutationObserver would require observation of the whole document, which would hurt
			// performance of other, more important code.
			return;
		}

		// Find topmost node in the tree
		topmostNode = this.$element[ 0 ];
		while ( topmostNode.parentNode ) {
			topmostNode = topmostNode.parentNode;
		}

		// We have no way to detect the $element being attached somewhere without observing the
		// entire DOM with subtree modifications, which would hurt performance. So we cheat: we hook
		// to the parent node of $element, and instead detect when $element is removed from it (and
		// thus probably attached somewhere else). If there is no parent, we create a "fake" one. If
		// it doesn't get attached, we end up back here and create the parent.
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
 * @return {OO.ui.Widget} The widget, for chaining
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
 * @return {OO.ui.Widget} The widget, for chaining
 */
OO.ui.TextInputWidget.prototype.select = function () {
	return this.selectRange( 0, this.getInputLength() );
};

/**
 * Focus the input and move the cursor to the start.
 *
 * @chainable
 * @return {OO.ui.Widget} The widget, for chaining
 */
OO.ui.TextInputWidget.prototype.moveCursorToStart = function () {
	return this.selectRange( 0 );
};

/**
 * Focus the input and move the cursor to the end.
 *
 * @chainable
 * @return {OO.ui.Widget} The widget, for chaining
 */
OO.ui.TextInputWidget.prototype.moveCursorToEnd = function () {
	return this.selectRange( this.getInputLength() );
};

/**
 * Insert new content into the input.
 *
 * @param {string} content Content to be inserted
 * @chainable
 * @return {OO.ui.Widget} The widget, for chaining
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
 * @return {OO.ui.Widget} The widget, for chaining
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
		if ( result && typeof result.promise === 'function' ) {
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
 * @return {OO.ui.Widget} The widget, for chaining
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
 * @return {OO.ui.Widget} The widget, for chaining
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
 * @return {OO.ui.Widget} The widget, for chaining
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
 * SearchInputWidgets are TextInputWidgets with `type="search"` assigned and feature a
 * {@link OO.ui.mixin.IconElement search icon} by default.
 * Please see the [OOUI documentation on MediaWiki] [1] for more information and examples.
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Widgets/Inputs#SearchInputWidget
 *
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
	this.$indicator.on( 'click', this.onIndicatorClick.bind( this ) );

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
 * Handle click events on the indicator
 *
 * @param {jQuery.Event} e Click event
 * @return {boolean}
 */
OO.ui.SearchInputWidget.prototype.onIndicatorClick = function ( e ) {
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
 * MultilineTextInputWidgets, like HTML textareas, are featuring customization options to
 * configure number of rows visible. In addition, these widgets can be autosized to fit user
 * inputs and can show {@link OO.ui.mixin.IconElement icons} and
 * {@link OO.ui.mixin.IndicatorElement indicators}.
 * Please see the [OOUI documentation on MediaWiki] [1] for more information and examples.
 *
 * This widget can be used inside an HTML form, such as a OO.ui.FormLayout.
 *
 *     @example
 *     // A MultilineTextInputWidget.
 *     var multilineTextInput = new OO.ui.MultilineTextInputWidget( {
 *         value: 'Text input on multiple lines'
 *     } );
 *     $( document.body ).append( multilineTextInput.$element );
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Widgets/Inputs#MultilineTextInputWidget
 *
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
	// Parent constructor
	OO.ui.MultilineTextInputWidget.parent.call( this, config );

	// Properties
	this.autosize = !!config.autosize;
	this.styleHeight = null;
	this.minRows = config.rows !== undefined ? config.rows : '';
	this.maxRows = config.maxRows || Math.max( 2 * ( this.minRows || 0 ), 10 );

	// Clone for resizing
	if ( this.autosize ) {
		this.$clone = this.$input
			.clone()
			.removeAttr( 'id' )
			.removeAttr( 'name' )
			.insertAfter( this.$input )
			.attr( 'aria-hidden', 'true' )
			.addClass( 'oo-ui-element-hidden' );
	}

	// Events
	this.connect( this, {
		change: 'onChange'
	} );

	// Initialization
	if ( config.rows ) {
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
		// Some platforms emit keycode 10 for Control+Enter keypress in a textarea
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
 * @return {OO.ui.Widget} The widget, for chaining
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
 * For more information about menus and options, please see the
 * [OOUI documentation on MediaWiki][1].
 *
 *     @example
 *     // A ComboBoxInputWidget.
 *     var comboBox = new OO.ui.ComboBoxInputWidget( {
 *         value: 'Option 1',
 *         options: [
 *             { data: 'Option 1' },
 *             { data: 'Option 2' },
 *             { data: 'Option 3' }
 *         ]
 *     } );
 *     $( document.body ).append( comboBox.$element );
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
 *     $( document.body ).append( comboBox.$element );
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Widgets/Selects_and_Options#Menu_selects_and_options
 *
 * @class
 * @extends OO.ui.TextInputWidget
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {Object[]} [options=[]] Array of menu options in the format `{ data: …, label: … }`
 * @cfg {Object} [menu] Configuration options to pass to the {@link OO.ui.MenuSelectWidget menu
 *  select widget}.
 * @cfg {jQuery} [$overlay] Render the menu into a separate layer. This configuration is useful
 *  in cases where the expanded menu is larger than its containing `<div>`. The specified overlay
 *  layer is usually on top of the containing `<div>` and has a larger area. By default, the menu
 *  uses relative positioning.
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
	this.$overlay = ( config.$overlay === true ?
		OO.ui.getDefaultOverlay() : config.$overlay ) || this.$element;
	this.dropdownButton = new OO.ui.ButtonWidget( {
		classes: [ 'oo-ui-comboBoxInputWidget-dropdownButton' ],
		label: OO.ui.msg( 'ooui-combobox-button-label' ),
		indicator: 'down',
		invisibleLabel: true,
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
	this.dropdownButton.$button.attr( {
		'aria-controls': this.menu.getElementId()
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
 * Update the disabled state of the controls
 *
 * @chainable
 * @protected
 * @return {OO.ui.ComboBoxInputWidget} The widget, for chaining
 */
OO.ui.ComboBoxInputWidget.prototype.updateControlsDisabled = function () {
	var disabled = this.isDisabled() || this.isReadOnly();
	if ( this.dropdownButton ) {
		this.dropdownButton.setDisabled( disabled );
	}
	if ( this.menu ) {
		this.menu.setDisabled( disabled );
	}
	return this;
};

/**
 * @inheritdoc
 */
OO.ui.ComboBoxInputWidget.prototype.setDisabled = function () {
	// Parent method
	OO.ui.ComboBoxInputWidget.parent.prototype.setDisabled.apply( this, arguments );
	this.updateControlsDisabled();
	return this;
};

/**
 * @inheritdoc
 */
OO.ui.ComboBoxInputWidget.prototype.setReadOnly = function () {
	// Parent method
	OO.ui.ComboBoxInputWidget.parent.prototype.setReadOnly.apply( this, arguments );
	this.updateControlsDisabled();
	return this;
};

/**
 * Set the options available for this input.
 *
 * @param {Object[]} options Array of menu options in the format `{ data: …, label: … }`
 * @chainable
 * @return {OO.ui.Widget} The widget, for chaining
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
 * Field layouts can be configured with help text and/or labels. Labels are aligned in one of
 * four ways:
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
 * Help text can either be:
 *
 * - accessed via a help icon that appears in the upper right corner of the rendered field layout,
 *   or
 * - shown as a subtle explanation below the label.
 *
 * If the help text is brief, or is essential to always expose it, set `helpInline` to `true`.
 * If it is long or not essential, leave `helpInline` to its default, `false`.
 *
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
 * @cfg {string} [align='left'] Alignment of the label: 'left', 'right', 'top'
 *  or 'inline'
 * @cfg {Array} [errors] Error messages about the widget, which will be
 *  displayed below the widget.
 * @cfg {Array} [warnings] Warning messages about the widget, which will be
 *  displayed below the widget.
 * @cfg {Array} [successMessages] Success messages on user interactions with the widget,
 *  which will be displayed below the widget.
 *  The array may contain strings or OO.ui.HtmlSnippet instances.
 * @cfg {Array} [notices] Notices about the widget, which will be displayed
 *  below the widget.
 *  The array may contain strings or OO.ui.HtmlSnippet instances.
 *  These are more visible than `help` messages when `helpInline` is set, and so
 *  might be good for transient messages.
 * @cfg {string|OO.ui.HtmlSnippet} [help] Help text. When help text is specified
 *  and `helpInline` is `false`, a "help" icon will appear in the upper-right
 *  corner of the rendered field; clicking it will display the text in a popup.
 *  If `helpInline` is `true`, then a subtle description will be shown after the
 *  label.
 * @cfg {boolean} [helpInline=false] Whether or not the help should be inline,
 *  or shown when the "help" icon is clicked.
 * @cfg {jQuery} [$overlay] Passed to OO.ui.PopupButtonWidget for help popup, if
 * `help` is given.
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
	config = $.extend( { align: 'left', helpInline: false }, config );

	// Parent constructor
	OO.ui.FieldLayout.parent.call( this, config );

	// Mixin constructors
	OO.ui.mixin.LabelElement.call( this, $.extend( {
		$label: $( '<label>' )
	}, config ) );
	OO.ui.mixin.TitledElement.call( this, $.extend( { $titled: this.$label }, config ) );

	// Properties
	this.fieldWidget = fieldWidget;
	this.errors = [];
	this.warnings = [];
	this.successMessages = [];
	this.notices = [];
	this.$field = this.isFieldInline() ? $( '<span>' ) : $( '<div>' );
	this.$messages = $( '<div>' );
	this.$header = $( '<span>' );
	this.$body = $( '<div>' );
	this.align = null;
	this.helpInline = config.helpInline;

	// Events
	this.fieldWidget.connect( this, {
		disable: 'onFieldDisable'
	} );

	// Initialization
	this.$help = config.help ?
		this.createHelpElement( config.help, config.$overlay ) :
		$( [] );
	if ( this.fieldWidget.getInputId() ) {
		this.$label.attr( 'for', this.fieldWidget.getInputId() );
		if ( this.helpInline ) {
			this.$help.attr( 'for', this.fieldWidget.getInputId() );
		}
	} else {
		this.$label.on( 'click', function () {
			this.fieldWidget.simulateLabelClick();
		}.bind( this ) );
		if ( this.helpInline ) {
			this.$help.on( 'click', function () {
				this.fieldWidget.simulateLabelClick();
			}.bind( this ) );
		}
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
	this.setWarnings( config.warnings || [] );
	this.setSuccess( config.successMessages || [] );
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
	return new OO.ui.MessageWidget( {
		type: kind,
		inline: true,
		label: text
	} ).$element;
};

/**
 * Set the field alignment mode.
 *
 * @private
 * @param {string} value Alignment mode, either 'left', 'right', 'top' or 'inline'
 * @chainable
 * @return {OO.ui.BookletLayout} The layout, for chaining
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

		if ( this.helpInline ) {
			if ( value === 'top' ) {
				this.$header.append( this.$label );
				this.$body.append( this.$header, this.$field, this.$help );
			} else if ( value === 'inline' ) {
				this.$header.append( this.$label, this.$help );
				this.$body.append( this.$field, this.$header );
			} else {
				this.$header.append( this.$label, this.$help );
				this.$body.append( this.$header, this.$field );
			}
		} else {
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
 * @return {OO.ui.BookletLayout} The layout, for chaining
 */
OO.ui.FieldLayout.prototype.setErrors = function ( errors ) {
	this.errors = errors.slice();
	this.updateMessages();
	return this;
};

/**
 * Set the list of warning messages.
 *
 * @param {Array} warnings Warning messages about the widget, which will be displayed below
 *  the widget.
 *  The array may contain strings or OO.ui.HtmlSnippet instances.
 * @chainable
 * @return {OO.ui.BookletLayout} The layout, for chaining
 */
OO.ui.FieldLayout.prototype.setWarnings = function ( warnings ) {
	this.warnings = warnings.slice();
	this.updateMessages();
	return this;
};

/**
 * Set the list of success messages.
 *
 * @param {Array} successMessages Success messages about the widget, which will be displayed below
 *  the widget.
 *  The array may contain strings or OO.ui.HtmlSnippet instances.
 * @chainable
 * @return {OO.ui.BookletLayout} The layout, for chaining
 */
OO.ui.FieldLayout.prototype.setSuccess = function ( successMessages ) {
	this.successMessages = successMessages.slice();
	this.updateMessages();
	return this;
};

/**
 * Set the list of notice messages.
 *
 * @param {Array} notices Notices about the widget, which will be displayed below the widget.
 *  The array may contain strings or OO.ui.HtmlSnippet instances.
 * @chainable
 * @return {OO.ui.BookletLayout} The layout, for chaining
 */
OO.ui.FieldLayout.prototype.setNotices = function ( notices ) {
	this.notices = notices.slice();
	this.updateMessages();
	return this;
};

/**
 * Update the rendering of error, warning, success and notice messages.
 *
 * @private
 */
OO.ui.FieldLayout.prototype.updateMessages = function () {
	var i;
	this.$messages.empty();

	if (
		this.errors.length ||
		this.warnings.length ||
		this.successMessages.length ||
		this.notices.length
	) {
		this.$body.after( this.$messages );
	} else {
		this.$messages.remove();
		return;
	}

	for ( i = 0; i < this.errors.length; i++ ) {
		this.$messages.append( this.makeMessage( 'error', this.errors[ i ] ) );
	}
	for ( i = 0; i < this.warnings.length; i++ ) {
		this.$messages.append( this.makeMessage( 'warning', this.warnings[ i ] ) );
	}
	for ( i = 0; i < this.successMessages.length; i++ ) {
		this.$messages.append( this.makeMessage( 'success', this.successMessages[ i ] ) );
	}
	for ( i = 0; i < this.notices.length; i++ ) {
		this.$messages.append( this.makeMessage( 'notice', this.notices[ i ] ) );
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
 * Creates and returns the help element. Also sets the `aria-describedby`
 * attribute on the main element of the `fieldWidget`.
 *
 * @private
 * @param {string|OO.ui.HtmlSnippet} [help] Help text.
 * @param {jQuery} [$overlay] Passed to OO.ui.PopupButtonWidget for help popup.
 * @return {jQuery} The element that should become `this.$help`.
 */
OO.ui.FieldLayout.prototype.createHelpElement = function ( help, $overlay ) {
	var helpId, helpWidget;

	if ( this.helpInline ) {
		helpWidget = new OO.ui.LabelWidget( {
			label: help,
			classes: [ 'oo-ui-inline-help' ]
		} );

		helpId = helpWidget.getElementId();
	} else {
		helpWidget = new OO.ui.PopupButtonWidget( {
			$overlay: $overlay,
			popup: {
				padded: true
			},
			classes: [ 'oo-ui-fieldLayout-help' ],
			framed: false,
			icon: 'info',
			label: OO.ui.msg( 'ooui-field-help' ),
			invisibleLabel: true
		} );
		if ( help instanceof OO.ui.HtmlSnippet ) {
			helpWidget.getPopup().$body.html( help.toString() );
		} else {
			helpWidget.getPopup().$body.text( help );
		}

		helpId = helpWidget.getPopup().getBodyId();
	}

	// Set the 'aria-describedby' attribute on the fieldWidget
	// Preference given to an input or a button
	(
		this.fieldWidget.$input ||
		this.fieldWidget.$button ||
		this.fieldWidget.$element
	).attr( 'aria-describedby', helpId );

	return helpWidget.$element;
};

/**
 * ActionFieldLayouts are used with OO.ui.FieldsetLayout. The layout consists of a field-widget,
 * a button, and an optional label and/or help text. The field-widget (e.g., a
 * {@link OO.ui.TextInputWidget TextInputWidget}), is required and is specified before any optional
 * configuration settings.
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
 * Help text is accessed via a help icon that appears in the upper right corner of the rendered
 * field layout when help text is specified.
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
 *     $( document.body ).append( actionFieldLayout.$element );
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
	this.$element.addClass( 'oo-ui-actionFieldLayout' );
	this.$button
		.addClass( 'oo-ui-actionFieldLayout-button' )
		.append( this.buttonWidget.$element );
	this.$input
		.addClass( 'oo-ui-actionFieldLayout-input' )
		.append( this.fieldWidget.$element );
	this.$field.append( this.$input, this.$button );
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
 *     $( document.body ).append( fieldset.$element );
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
 * @cfg {OO.ui.FieldLayout[]} [items] An array of fields to add to the fieldset.
 *  See OO.ui.FieldLayout for more information about fields.
 * @cfg {string|OO.ui.HtmlSnippet} [help] Help text. When help text is specified
 *  and `helpInline` is `false`, a "help" icon will appear in the upper-right
 *  corner of the rendered field; clicking it will display the text in a popup.
 *  If `helpInline` is `true`, then a subtle description will be shown after the
 *  label.
 *  For feedback messages, you are advised to use `notices`.
 * @cfg {boolean} [helpInline=false] Whether or not the help should be inline,
 *  or shown when the "help" icon is clicked.
 * @cfg {jQuery} [$overlay] Passed to OO.ui.PopupButtonWidget for help popup, if `help` is given.
 *  See <https://www.mediawiki.org/wiki/OOUI/Concepts#Overlays>.
 */
OO.ui.FieldsetLayout = function OoUiFieldsetLayout( config ) {
	var helpWidget;

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

	// Initialization
	this.$header
		.addClass( 'oo-ui-fieldsetLayout-header' )
		.append( this.$icon, this.$label );
	this.$group.addClass( 'oo-ui-fieldsetLayout-group' );
	this.$element
		.addClass( 'oo-ui-fieldsetLayout' )
		.prepend( this.$header, this.$group );

	// Help
	if ( config.help ) {
		if ( config.helpInline ) {
			helpWidget = new OO.ui.LabelWidget( {
				label: config.help,
				classes: [ 'oo-ui-inline-help' ]
			} );
			this.$element.prepend( this.$header, helpWidget.$element, this.$group );
		} else {
			helpWidget = new OO.ui.PopupButtonWidget( {
				$overlay: config.$overlay,
				popup: {
					padded: true
				},
				classes: [ 'oo-ui-fieldsetLayout-help' ],
				framed: false,
				icon: 'info',
				label: OO.ui.msg( 'ooui-field-help' ),
				invisibleLabel: true
			} );
			if ( config.help instanceof OO.ui.HtmlSnippet ) {
				helpWidget.getPopup().$body.html( config.help.toString() );
			} else {
				helpWidget.getPopup().$body.text( config.help );
			}
			this.$header.append( helpWidget.$element );
		}
	}
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
 * FormLayouts are used to wrap {@link OO.ui.FieldsetLayout FieldsetLayouts} when you intend to use
 * browser-based form submission for the fields instead of handling them in JavaScript. Form layouts
 * can be configured with an HTML form action, an encoding type, and a method using the #action,
 * #enctype, and #method configs, respectively.
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
 *     // Example of a form layout that wraps a fieldset layout.
 *     var input1 = new OO.ui.TextInputWidget( {
 *             placeholder: 'Username'
 *         } ),
 *         input2 = new OO.ui.TextInputWidget( {
 *             placeholder: 'Password',
 *             type: 'password'
 *         } ),
 *         submit = new OO.ui.ButtonInputWidget( {
 *             label: 'Submit'
 *         } ),
 *         fieldset = new OO.ui.FieldsetLayout( {
 *             label: 'A form layout'
 *         } );
 *
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
 *     $( document.body ).append( form.$element );
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
	OO.ui.mixin.GroupElement.call( this, $.extend( { $group: this.$element }, config ) );

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
 * @return {OO.ui.FormLayout} The layout, for chaining
 */
OO.ui.FormLayout.prototype.onFormSubmit = function () {
	if ( this.emit( 'submit' ) ) {
		return false;
	}
};

/**
 * PanelLayouts expand to cover the entire area of their parent. They can be configured with
 * scrolling, padding, and a frame, and are often used together with
 * {@link OO.ui.StackLayout StackLayouts}.
 *
 *     @example
 *     // Example of a panel layout
 *     var panel = new OO.ui.PanelLayout( {
 *         expanded: false,
 *         framed: true,
 *         padded: true,
 *         $content: $( '<p>A panel layout with padding and a frame.</p>' )
 *     } );
 *     $( document.body ).append( panel.$element );
 *
 * @class
 * @extends OO.ui.Layout
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {boolean} [scrollable=false] Allow vertical scrolling
 * @cfg {boolean} [padded=false] Add padding between the content and the edges of the panel.
 * @cfg {boolean} [expanded=true] Expand the panel to fill the entire parent element.
 * @cfg {boolean} [framed=false] Render the panel with a frame to visually separate it from outside
 *  content.
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

/* Static Methods */

/**
 * @inheritdoc
 */
OO.ui.PanelLayout.static.reusePreInfuseDOM = function ( node, config ) {
	config = OO.ui.PanelLayout.parent.static.reusePreInfuseDOM( node, config );
	if ( config.preserveContent !== false ) {
		config.$content = $( node ).contents();
	}
	return config;
};

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
 *     // HorizontalLayout with a text input and a label.
 *     var layout = new OO.ui.HorizontalLayout( {
 *       items: [
 *         new OO.ui.LabelWidget( { label: 'Label' } ),
 *         new OO.ui.TextInputWidget( { value: 'Text' } )
 *       ]
 *     } );
 *     $( document.body ).append( layout.$element );
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
	OO.ui.mixin.GroupElement.call( this, $.extend( { $group: this.$element }, config ) );

	// Initialization
	this.$element.addClass( 'oo-ui-horizontalLayout' );
	if ( Array.isArray( config.items ) ) {
		this.addItems( config.items );
	}
};

/* Setup */

OO.inheritClass( OO.ui.HorizontalLayout, OO.ui.Layout );
OO.mixinClass( OO.ui.HorizontalLayout, OO.ui.mixin.GroupElement );

/**
 * NumberInputWidgets combine a {@link OO.ui.TextInputWidget text input} (where a value
 * can be entered manually) and two {@link OO.ui.ButtonWidget button widgets}
 * (to adjust the value in increments) to allow the user to enter a number.
 *
 *     @example
 *     // A NumberInputWidget.
 *     var numberInput = new OO.ui.NumberInputWidget( {
 *         label: 'NumberInputWidget',
 *         input: { value: 5 },
 *         min: 1,
 *         max: 10
 *     } );
 *     $( document.body ).append( numberInput.$element );
 *
 * @class
 * @extends OO.ui.TextInputWidget
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {Object} [minusButton] Configuration options to pass to the
 *  {@link OO.ui.ButtonWidget decrementing button widget}.
 * @cfg {Object} [plusButton] Configuration options to pass to the
 *  {@link OO.ui.ButtonWidget incrementing button widget}.
 * @cfg {number} [min=-Infinity] Minimum allowed value
 * @cfg {number} [max=Infinity] Maximum allowed value
 * @cfg {number|null} [step] If specified, the field only accepts values that are multiples of this.
 * @cfg {number} [buttonStep=step||1] Delta when using the buttons or Up/Down arrow keys.
 *  Defaults to `step` if specified, otherwise `1`.
 * @cfg {number} [pageStep=10*buttonStep] Delta when using the Page-up/Page-down keys.
 *  Defaults to 10 times `buttonStep`.
 * @cfg {boolean} [showButtons=true] Whether to show the plus and minus buttons.
 */
OO.ui.NumberInputWidget = function OoUiNumberInputWidget( config ) {
	var $field = $( '<div>' ).addClass( 'oo-ui-numberInputWidget-field' );

	// Configuration initialization
	config = $.extend( {
		min: -Infinity,
		max: Infinity,
		showButtons: true
	}, config );

	// For backward compatibility
	$.extend( config, config.input );
	this.input = this;

	// Parent constructor
	OO.ui.NumberInputWidget.parent.call( this, $.extend( config, {
		type: 'number'
	} ) );

	if ( config.showButtons ) {
		this.minusButton = new OO.ui.ButtonWidget( $.extend(
			{
				disabled: this.isDisabled(),
				tabIndex: -1,
				classes: [ 'oo-ui-numberInputWidget-minusButton' ],
				icon: 'subtract'
			},
			config.minusButton
		) );
		this.minusButton.$element.attr( 'aria-hidden', 'true' );
		this.plusButton = new OO.ui.ButtonWidget( $.extend(
			{
				disabled: this.isDisabled(),
				tabIndex: -1,
				classes: [ 'oo-ui-numberInputWidget-plusButton' ],
				icon: 'add'
			},
			config.plusButton
		) );
		this.plusButton.$element.attr( 'aria-hidden', 'true' );
	}

	// Events
	this.$input.on( {
		keydown: this.onKeyDown.bind( this ),
		'wheel mousewheel DOMMouseScroll': this.onWheel.bind( this )
	} );
	if ( config.showButtons ) {
		this.plusButton.connect( this, {
			click: [ 'onButtonClick', +1 ]
		} );
		this.minusButton.connect( this, {
			click: [ 'onButtonClick', -1 ]
		} );
	}

	// Build the field
	$field.append( this.$input );
	if ( config.showButtons ) {
		$field
			.prepend( this.minusButton.$element )
			.append( this.plusButton.$element );
	}

	// Initialization
	if ( config.allowInteger || config.isInteger ) {
		// Backward compatibility
		config.step = 1;
	}
	this.setRange( config.min, config.max );
	this.setStep( config.buttonStep, config.pageStep, config.step );
	// Set the validation method after we set step and range
	// so that it doesn't immediately call setValidityFlag
	this.setValidation( this.validateNumber.bind( this ) );

	this.$element
		.addClass( 'oo-ui-numberInputWidget' )
		.toggleClass( 'oo-ui-numberInputWidget-buttoned', config.showButtons )
		.append( $field );
};

/* Setup */

OO.inheritClass( OO.ui.NumberInputWidget, OO.ui.TextInputWidget );

/* Methods */

// Backward compatibility
OO.ui.NumberInputWidget.prototype.setAllowInteger = function ( flag ) {
	this.setStep( flag ? 1 : null );
};
// Backward compatibility
OO.ui.NumberInputWidget.prototype.setIsInteger = OO.ui.NumberInputWidget.prototype.setAllowInteger;

// Backward compatibility
OO.ui.NumberInputWidget.prototype.getAllowInteger = function () {
	return this.step === 1;
};
// Backward compatibility
OO.ui.NumberInputWidget.prototype.getIsInteger = OO.ui.NumberInputWidget.prototype.getAllowInteger;

/**
 * Set the range of allowed values
 *
 * @param {number} min Minimum allowed value
 * @param {number} max Maximum allowed value
 */
OO.ui.NumberInputWidget.prototype.setRange = function ( min, max ) {
	if ( min > max ) {
		throw new Error( 'Minimum (' + min + ') must not be greater than maximum (' + max + ')' );
	}
	this.min = min;
	this.max = max;
	this.$input.attr( 'min', this.min );
	this.$input.attr( 'max', this.max );
	this.setValidityFlag();
};

/**
 * Get the current range
 *
 * @return {number[]} Minimum and maximum values
 */
OO.ui.NumberInputWidget.prototype.getRange = function () {
	return [ this.min, this.max ];
};

/**
 * Set the stepping deltas
 *
 * @param {number} [buttonStep=step||1] Delta when using the buttons or up/down arrow keys.
 *  Defaults to `step` if specified, otherwise `1`.
 * @param {number} [pageStep=10*buttonStep] Delta when using the page-up/page-down keys.
 *  Defaults to 10 times `buttonStep`.
 * @param {number|null} [step] If specified, the field only accepts values that are multiples
 *  of this.
 */
OO.ui.NumberInputWidget.prototype.setStep = function ( buttonStep, pageStep, step ) {
	if ( buttonStep === undefined ) {
		buttonStep = step || 1;
	}
	if ( pageStep === undefined ) {
		pageStep = 10 * buttonStep;
	}
	if ( step !== null && step <= 0 ) {
		throw new Error( 'Step value, if given, must be positive' );
	}
	if ( buttonStep <= 0 ) {
		throw new Error( 'Button step value must be positive' );
	}
	if ( pageStep <= 0 ) {
		throw new Error( 'Page step value must be positive' );
	}
	this.step = step;
	this.buttonStep = buttonStep;
	this.pageStep = pageStep;
	this.$input.attr( 'step', this.step || 'any' );
	this.setValidityFlag();
};

/**
 * @inheritdoc
 */
OO.ui.NumberInputWidget.prototype.setValue = function ( value ) {
	if ( value === '' ) {
		// Some browsers allow a value in the input even if there isn't one reported by $input.val()
		// so here we make sure an 'empty' value is actually displayed as such.
		this.$input.val( '' );
	}
	return OO.ui.NumberInputWidget.parent.prototype.setValue.call( this, value );
};

/**
 * Get the current stepping values
 *
 * @return {number[]} Button step, page step, and validity step
 */
OO.ui.NumberInputWidget.prototype.getStep = function () {
	return [ this.buttonStep, this.pageStep, this.step ];
};

/**
 * Get the current value of the widget as a number
 *
 * @return {number} May be NaN, or an invalid number
 */
OO.ui.NumberInputWidget.prototype.getNumericValue = function () {
	return +this.getValue();
};

/**
 * Adjust the value of the widget
 *
 * @param {number} delta Adjustment amount
 */
OO.ui.NumberInputWidget.prototype.adjustValue = function ( delta ) {
	var n, v = this.getNumericValue();

	delta = +delta;
	if ( isNaN( delta ) || !isFinite( delta ) ) {
		throw new Error( 'Delta must be a finite number' );
	}

	if ( isNaN( v ) ) {
		n = 0;
	} else {
		n = v + delta;
		n = Math.max( Math.min( n, this.max ), this.min );
		if ( this.step ) {
			n = Math.round( n / this.step ) * this.step;
		}
	}

	if ( n !== v ) {
		this.setValue( n );
	}
};
/**
 * Validate input
 *
 * @private
 * @param {string} value Field value
 * @return {boolean}
 */
OO.ui.NumberInputWidget.prototype.validateNumber = function ( value ) {
	var n = +value;
	if ( value === '' ) {
		return !this.isRequired();
	}

	if ( isNaN( n ) || !isFinite( n ) ) {
		return false;
	}

	if ( this.step && Math.floor( n / this.step ) !== n / this.step ) {
		return false;
	}

	if ( n < this.min || n > this.max ) {
		return false;
	}

	return true;
};

/**
 * Handle mouse click events.
 *
 * @private
 * @param {number} dir +1 or -1
 */
OO.ui.NumberInputWidget.prototype.onButtonClick = function ( dir ) {
	this.adjustValue( dir * this.buttonStep );
};

/**
 * Handle mouse wheel events.
 *
 * @private
 * @param {jQuery.Event} event
 * @return {undefined|boolean} False to prevent default if event is handled
 */
OO.ui.NumberInputWidget.prototype.onWheel = function ( event ) {
	var delta = 0;

	if ( this.isDisabled() || this.isReadOnly() ) {
		return;
	}

	if ( this.$input.is( ':focus' ) ) {
		// Standard 'wheel' event
		if ( event.originalEvent.deltaMode !== undefined ) {
			this.sawWheelEvent = true;
		}
		if ( event.originalEvent.deltaY ) {
			delta = -event.originalEvent.deltaY;
		} else if ( event.originalEvent.deltaX ) {
			delta = event.originalEvent.deltaX;
		}

		// Non-standard events
		if ( !this.sawWheelEvent ) {
			if ( event.originalEvent.wheelDeltaX ) {
				delta = -event.originalEvent.wheelDeltaX;
			} else if ( event.originalEvent.wheelDeltaY ) {
				delta = event.originalEvent.wheelDeltaY;
			} else if ( event.originalEvent.wheelDelta ) {
				delta = event.originalEvent.wheelDelta;
			} else if ( event.originalEvent.detail ) {
				delta = -event.originalEvent.detail;
			}
		}

		if ( delta ) {
			delta = delta < 0 ? -1 : 1;
			this.adjustValue( delta * this.buttonStep );
		}

		return false;
	}
};

/**
 * Handle key down events.
 *
 * @private
 * @param {jQuery.Event} e Key down event
 * @return {undefined|boolean} False to prevent default if event is handled
 */
OO.ui.NumberInputWidget.prototype.onKeyDown = function ( e ) {
	if ( this.isDisabled() || this.isReadOnly() ) {
		return;
	}

	switch ( e.which ) {
		case OO.ui.Keys.UP:
			this.adjustValue( this.buttonStep );
			return false;
		case OO.ui.Keys.DOWN:
			this.adjustValue( -this.buttonStep );
			return false;
		case OO.ui.Keys.PAGEUP:
			this.adjustValue( this.pageStep );
			return false;
		case OO.ui.Keys.PAGEDOWN:
			this.adjustValue( -this.pageStep );
			return false;
	}
};

/**
 * Update the disabled state of the controls
 *
 * @chainable
 * @protected
 * @return {OO.ui.NumberInputWidget} The widget, for chaining
 */
OO.ui.NumberInputWidget.prototype.updateControlsDisabled = function () {
	var disabled = this.isDisabled() || this.isReadOnly();
	if ( this.minusButton ) {
		this.minusButton.setDisabled( disabled );
	}
	if ( this.plusButton ) {
		this.plusButton.setDisabled( disabled );
	}
	return this;
};

/**
 * @inheritdoc
 */
OO.ui.NumberInputWidget.prototype.setDisabled = function ( disabled ) {
	// Parent method
	OO.ui.NumberInputWidget.parent.prototype.setDisabled.call( this, disabled );
	this.updateControlsDisabled();
	return this;
};

/**
 * @inheritdoc
 */
OO.ui.NumberInputWidget.prototype.setReadOnly = function () {
	// Parent method
	OO.ui.NumberInputWidget.parent.prototype.setReadOnly.apply( this, arguments );
	this.updateControlsDisabled();
	return this;
};

/**
 * SelectFileInputWidgets allow for selecting files, using <input type="file">. These
 * widgets can be configured with {@link OO.ui.mixin.IconElement icons}, {@link
 * OO.ui.mixin.IndicatorElement indicators} and {@link OO.ui.mixin.TitledElement titles}.
 * Please see the [OOUI documentation on MediaWiki] [1] for more information and examples.
 *
 * SelectFileInputWidgets must be used in HTML forms, as getValue only returns the filename.
 *
 *     @example
 *     // A file select input widget.
 *     var selectFile = new OO.ui.SelectFileInputWidget();
 *     $( document.body ).append( selectFile.$element );
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Widgets
 *
 * @class
 * @extends OO.ui.InputWidget
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {string[]|null} [accept=null] MIME types to accept. null accepts all types.
 * @cfg {boolean} [multiple=false] Allow multiple files to be selected.
 * @cfg {string} [placeholder] Text to display when no file is selected.
 * @cfg {Object} [button] Config to pass to select file button.
 * @cfg {string} [icon] Icon to show next to file info
 */
OO.ui.SelectFileInputWidget = function OoUiSelectFileInputWidget( config ) {
	var widget = this;

	config = config || {};

	// Construct buttons before parent method is called (calling setDisabled)
	this.selectButton = new OO.ui.ButtonWidget( $.extend( {
		$element: $( '<label>' ),
		classes: [ 'oo-ui-selectFileInputWidget-selectButton' ],
		label: OO.ui.msg( 'ooui-selectfile-button-select' )
	}, config.button ) );

	// Configuration initialization
	config = $.extend( {
		accept: null,
		placeholder: OO.ui.msg( 'ooui-selectfile-placeholder' ),
		$tabIndexed: this.selectButton.$tabIndexed
	}, config );

	this.info = new OO.ui.SearchInputWidget( {
		classes: [ 'oo-ui-selectFileInputWidget-info' ],
		placeholder: config.placeholder,
		// Pass an empty collection so that .focus() always does nothing
		$tabIndexed: $( [] )
	} ).setIcon( config.icon );
	// Set tabindex manually on $input as $tabIndexed has been overridden
	this.info.$input.attr( 'tabindex', -1 );

	// Parent constructor
	OO.ui.SelectFileInputWidget.parent.call( this, config );

	// Properties
	this.currentFiles = this.filterFiles( this.$input[ 0 ].files || [] );
	if ( Array.isArray( config.accept ) ) {
		this.accept = config.accept;
	} else {
		this.accept = null;
	}
	this.multiple = !!config.multiple;

	// Events
	this.info.connect( this, { change: 'onInfoChange' } );
	this.selectButton.$button.on( {
		keypress: this.onKeyPress.bind( this )
	} );
	this.$input.on( {
		change: this.onFileSelected.bind( this ),
		// Support: IE11
		// In IE 11, focussing a file input (by clicking on it) displays a text cursor and scrolls
		// the cursor into view (in this case, it scrolls the button, which has 'overflow: hidden').
		// Since this messes with our custom styling (the file input has large dimensions and this
		// causes the label to scroll out of view), scroll the button back to top. (T192131)
		focus: function () {
			widget.$input.parent().prop( 'scrollTop', 0 );
		}
	} );
	this.connect( this, { change: 'updateUI' } );

	this.fieldLayout = new OO.ui.ActionFieldLayout( this.info, this.selectButton, { align: 'top' } );

	this.$input
		.attr( {
			type: 'file',
			// this.selectButton is tabindexed
			tabindex: -1,
			// Infused input may have previously by
			// TabIndexed, so remove aria-disabled attr.
			'aria-disabled': null
		} );

	if ( this.accept ) {
		this.$input.attr( 'accept', this.accept.join( ', ' ) );
	}
	if ( this.multiple ) {
		this.$input.attr( 'multiple', '' );
	}
	this.selectButton.$button.append( this.$input );

	this.$element
		.addClass( 'oo-ui-selectFileInputWidget' )
		.append( this.fieldLayout.$element );

	this.updateUI();
};

/* Setup */

OO.inheritClass( OO.ui.SelectFileInputWidget, OO.ui.InputWidget );

/* Static properties */

// Set empty title so that browser default tooltips like "No file chosen" don't appear.
// On SelectFileWidget this tooltip will often be incorrect, so create a consistent
// experience on SelectFileInputWidget.
OO.ui.SelectFileInputWidget.static.title = '';

/* Methods */

/**
 * Get the filename of the currently selected file.
 *
 * @return {string} Filename
 */
OO.ui.SelectFileInputWidget.prototype.getFilename = function () {
	if ( this.currentFiles.length ) {
		return this.currentFiles.map( function ( file ) {
			return file.name;
		} ).join( ', ' );
	} else {
		// Try to strip leading fakepath.
		return this.getValue().split( '\\' ).pop();
	}
};

/**
 * @inheritdoc
 */
OO.ui.SelectFileInputWidget.prototype.setValue = function ( value ) {
	if ( value === undefined ) {
		// Called during init, don't replace value if just infusing.
		return;
	}
	if ( value ) {
		// We need to update this.value, but without trying to modify
		// the DOM value, which would throw an exception.
		if ( this.value !== value ) {
			this.value = value;
			this.emit( 'change', this.value );
		}
	} else {
		this.currentFiles = [];
		// Parent method
		OO.ui.SelectFileInputWidget.super.prototype.setValue.call( this, '' );
	}
};

/**
 * Handle file selection from the input.
 *
 * @protected
 * @param {jQuery.Event} e
 */
OO.ui.SelectFileInputWidget.prototype.onFileSelected = function ( e ) {
	this.currentFiles = this.filterFiles( e.target.files || [] );
};

/**
 * Update the user interface when a file is selected or unselected.
 *
 * @protected
 */
OO.ui.SelectFileInputWidget.prototype.updateUI = function () {
	this.info.setValue( this.getFilename() );
};

/**
 * Determine if we should accept this file.
 *
 * @private
 * @param {FileList|File[]} files Files to filter
 * @return {File[]} Filter files
 */
OO.ui.SelectFileInputWidget.prototype.filterFiles = function ( files ) {
	var accept = this.accept;

	function mimeAllowed( file ) {
		var i, mimeTest,
			mimeType = file.type;

		if ( !accept || !mimeType ) {
			return true;
		}

		for ( i = 0; i < accept.length; i++ ) {
			mimeTest = accept[ i ];
			if ( mimeTest === mimeType ) {
				return true;
			} else if ( mimeTest.substr( -2 ) === '/*' ) {
				mimeTest = mimeTest.substr( 0, mimeTest.length - 1 );
				if ( mimeType.substr( 0, mimeTest.length ) === mimeTest ) {
					return true;
				}
			}
		}
		return false;
	}

	return Array.prototype.filter.call( files, mimeAllowed );
};

/**
 * Handle info input change events
 *
 * The info widget can only be changed by the user
 * with the clear button.
 *
 * @private
 * @param {string} value
 */
OO.ui.SelectFileInputWidget.prototype.onInfoChange = function ( value ) {
	if ( value === '' ) {
		this.setValue( null );
	}
};

/**
 * Handle key press events.
 *
 * @private
 * @param {jQuery.Event} e Key press event
 * @return {undefined|boolean} False to prevent default if event is handled
 */
OO.ui.SelectFileInputWidget.prototype.onKeyPress = function ( e ) {
	if ( !this.isDisabled() && this.$input &&
		( e.which === OO.ui.Keys.SPACE || e.which === OO.ui.Keys.ENTER )
	) {
		// Emit a click to open the file selector.
		this.$input.trigger( 'click' );
		// Taking focus from the selectButton means keyUp isn't fired, so fire it manually.
		this.selectButton.onDocumentKeyUp( e );
		return false;
	}
};

/**
 * @inheritdoc
 */
OO.ui.SelectFileInputWidget.prototype.setDisabled = function ( disabled ) {
	// Parent method
	OO.ui.SelectFileInputWidget.parent.prototype.setDisabled.call( this, disabled );

	this.selectButton.setDisabled( disabled );
	this.info.setDisabled( disabled );

	return this;
};

}( OO ) );

//# sourceMappingURL=oojs-ui-core.js.map.json
/*!
 * OOUI v0.33.1
 * https://www.mediawiki.org/wiki/OOUI
 *
 * Copyright 2011–2019 OOUI Team and other contributors.
 * Released under the MIT license
 * http://oojs.mit-license.org
 *
 * Date: 2019-07-03T21:05:08Z
 */
( function ( OO ) {

'use strict';

/**
 * DraggableElement is a mixin class used to create elements that can be clicked
 * and dragged by a mouse to a new position within a group. This class must be used
 * in conjunction with OO.ui.mixin.DraggableGroupElement, which provides a container for
 * the draggable elements.
 *
 * @abstract
 * @class
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {jQuery} [$handle] The part of the element which can be used for dragging, defaults to
 *  the whole element
 * @cfg {boolean} [draggable] The items are draggable. This can change with #toggleDraggable
 *  but the draggable state should be called from the DraggableGroupElement, which updates
 *  the whole group
 */
OO.ui.mixin.DraggableElement = function OoUiMixinDraggableElement( config ) {
	config = config || {};

	// Properties
	this.index = null;
	this.$handle = config.$handle || this.$element;
	this.wasHandleUsed = null;

	// Initialize and events
	this.$element
		.addClass( 'oo-ui-draggableElement' )
		.on( {
			mousedown: this.onDragMouseDown.bind( this ),
			dragstart: this.onDragStart.bind( this ),
			dragover: this.onDragOver.bind( this ),
			dragend: this.onDragEnd.bind( this ),
			drop: this.onDrop.bind( this )
		} );
	this.$handle.addClass( 'oo-ui-draggableElement-handle' );
	this.toggleDraggable( config.draggable === undefined ? true : !!config.draggable );
};

OO.initClass( OO.ui.mixin.DraggableElement );

/* Events */

/**
 * @event dragstart
 *
 * A dragstart event is emitted when the user clicks and begins dragging an item.
 * @param {OO.ui.mixin.DraggableElement} item The item the user has clicked and is dragging with
 *  the mouse.
 */

/**
 * @event dragend
 * A dragend event is emitted when the user drags an item and releases the mouse,
 * thus terminating the drag operation.
 */

/**
 * @event drop
 * A drop event is emitted when the user drags an item and then releases the mouse button
 * over a valid target.
 */

/* Static Properties */

/**
 * @inheritdoc OO.ui.mixin.ButtonElement
 */
OO.ui.mixin.DraggableElement.static.cancelButtonMouseDownEvents = false;

/* Methods */

/**
 * Change the draggable state of this widget.
 * This allows users to temporarily halt the dragging operations.
 *
 * @param {boolean} isDraggable Widget supports draggable operations
 * @fires draggable
 */
OO.ui.mixin.DraggableElement.prototype.toggleDraggable = function ( isDraggable ) {
	isDraggable = isDraggable !== undefined ? !!isDraggable : !this.draggable;

	if ( this.draggable !== isDraggable ) {
		this.draggable = isDraggable;

		this.$handle.toggleClass( 'oo-ui-draggableElement-undraggable', !this.draggable );

		// We make the entire element draggable, not just the handle, so that
		// the whole element appears to move. wasHandleUsed prevents drags from
		// starting outside the handle
		this.$element.prop( 'draggable', this.draggable );
	}
};

/**
 * Check the draggable state of this widget.
 *
 * @return {boolean} Widget supports draggable operations
 */
OO.ui.mixin.DraggableElement.prototype.isDraggable = function () {
	return this.draggable;
};

/**
 * Respond to mousedown event.
 *
 * @private
 * @param {jQuery.Event} e Drag event
 */
OO.ui.mixin.DraggableElement.prototype.onDragMouseDown = function ( e ) {
	if ( !this.isDraggable() ) {
		return;
	}

	this.wasHandleUsed =
		// Optimization: if the handle is the whole element this is always true
		this.$handle[ 0 ] === this.$element[ 0 ] ||
		// Check the mousedown occurred inside the handle
		OO.ui.contains( this.$handle[ 0 ], e.target, true );
};

/**
 * Respond to dragstart event.
 *
 * @private
 * @param {jQuery.Event} e Drag event
 * @return {boolean} False if the event is cancelled
 * @fires dragstart
 */
OO.ui.mixin.DraggableElement.prototype.onDragStart = function ( e ) {
	var element = this,
		dataTransfer = e.originalEvent.dataTransfer;

	if ( !this.wasHandleUsed || !this.isDraggable() ) {
		return false;
	}

	// Define drop effect
	dataTransfer.dropEffect = 'none';
	dataTransfer.effectAllowed = 'move';
	// Support: Firefox
	// We must set up a dataTransfer data property or Firefox seems to
	// ignore the fact the element is draggable.
	try {
		dataTransfer.setData( 'application-x/OOUI-draggable', this.getIndex() );
	} catch ( err ) {
		// The above is only for Firefox. Move on if it fails.
	}
	// Briefly add a 'clone' class to style the browser's native drag image
	this.$element.addClass( 'oo-ui-draggableElement-clone' );
	// Add placeholder class after the browser has rendered the clone
	setTimeout( function () {
		element.$element
			.removeClass( 'oo-ui-draggableElement-clone' )
			.addClass( 'oo-ui-draggableElement-placeholder' );
	} );
	// Emit event
	this.emit( 'dragstart', this );
	return true;
};

/**
 * Respond to dragend event.
 *
 * @private
 * @fires dragend
 */
OO.ui.mixin.DraggableElement.prototype.onDragEnd = function () {
	this.$element.removeClass( 'oo-ui-draggableElement-placeholder' );
	this.emit( 'dragend' );
};

/**
 * Handle drop event.
 *
 * @private
 * @param {jQuery.Event} e Drop event
 * @fires drop
 */
OO.ui.mixin.DraggableElement.prototype.onDrop = function ( e ) {
	e.preventDefault();
	this.emit( 'drop', e );
};

/**
 * In order for drag/drop to work, the dragover event must
 * return false and stop propogation.
 *
 * @param {jQuery.Event} e Drag event
 * @private
 */
OO.ui.mixin.DraggableElement.prototype.onDragOver = function ( e ) {
	e.preventDefault();
};

/**
 * Set item index.
 * Store it in the DOM so we can access from the widget drag event.
 *
 * @private
 * @param {number} index Item index
 */
OO.ui.mixin.DraggableElement.prototype.setIndex = function ( index ) {
	if ( this.index !== index ) {
		this.index = index;
		this.$element.data( 'index', index );
	}
};

/**
 * Get item index.
 *
 * @private
 * @return {number} Item index
 */
OO.ui.mixin.DraggableElement.prototype.getIndex = function () {
	return this.index;
};

/**
 * DraggableGroupElement is a mixin class used to create a group element to
 * contain draggable elements, which are items that can be clicked and dragged by a mouse.
 * The class is used with OO.ui.mixin.DraggableElement.
 *
 * @abstract
 * @class
 * @mixins OO.ui.mixin.GroupElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {string} [orientation] Item orientation: 'horizontal' or 'vertical'. The orientation
 *  should match the layout of the items. Items displayed in a single row
 *  or in several rows should use horizontal orientation. The vertical orientation should only be
 *  used when the items are displayed in a single column. Defaults to 'vertical'
 * @cfg {boolean} [draggable] The items are draggable. This can change with #toggleDraggable
 */
OO.ui.mixin.DraggableGroupElement = function OoUiMixinDraggableGroupElement( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.mixin.GroupElement.call( this, config );

	// Properties
	this.orientation = config.orientation || 'vertical';
	this.dragItem = null;
	this.itemKeys = {};
	this.dir = null;
	this.itemsOrder = null;
	this.draggable = config.draggable === undefined ? true : !!config.draggable;

	// Events
	this.aggregate( {
		dragstart: 'itemDragStart',
		dragend: 'itemDragEnd',
		drop: 'itemDrop'
	} );
	this.connect( this, {
		itemDragStart: 'onItemDragStart',
		itemDrop: 'onItemDropOrDragEnd',
		itemDragEnd: 'onItemDropOrDragEnd'
	} );

	// Initialize
	if ( Array.isArray( config.items ) ) {
		this.addItems( config.items );
	}
	this.$element
		.addClass( 'oo-ui-draggableGroupElement' )
		.toggleClass( 'oo-ui-draggableGroupElement-horizontal', this.orientation === 'horizontal' );
};

/* Setup */
OO.mixinClass( OO.ui.mixin.DraggableGroupElement, OO.ui.mixin.GroupElement );

/* Events */

/**
 * An item has been dragged to a new position, but not yet dropped.
 *
 * @event drag
 * @param {OO.ui.mixin.DraggableElement} item Dragged item
 * @param {number} [newIndex] New index for the item
 */

/**
 * An item has been dropped at a new position.
 *
 * @event reorder
 * @param {OO.ui.mixin.DraggableElement} item Reordered item
 * @param {number} [newIndex] New index for the item
 */

/**
 * Draggable state of this widget has changed.
 *
 * @event draggable
 * @param {boolean} [draggable] Widget is draggable
 */

/* Methods */

/**
 * Change the draggable state of this widget.
 * This allows users to temporarily halt the dragging operations.
 *
 * @param {boolean} isDraggable Widget supports draggable operations
 * @fires draggable
 */
OO.ui.mixin.DraggableGroupElement.prototype.toggleDraggable = function ( isDraggable ) {
	isDraggable = isDraggable !== undefined ? !!isDraggable : !this.draggable;

	if ( this.draggable !== isDraggable ) {
		this.draggable = isDraggable;

		// Tell the items their draggable state changed
		this.getItems().forEach( function ( item ) {
			item.toggleDraggable( this.draggable );
		}.bind( this ) );

		// Emit event
		this.emit( 'draggable', this.draggable );
	}
};

/**
 * Check the draggable state of this widget
 *
 * @return {boolean} Widget supports draggable operations
 */
OO.ui.mixin.DraggableGroupElement.prototype.isDraggable = function () {
	return this.draggable;
};

/**
 * Respond to item drag start event
 *
 * @private
 * @param {OO.ui.mixin.DraggableElement} item Dragged item
 */
OO.ui.mixin.DraggableGroupElement.prototype.onItemDragStart = function ( item ) {
	if ( !this.isDraggable() ) {
		return;
	}
	// Make a shallow copy of this.items so we can re-order it during previews
	// without affecting the original array.
	this.itemsOrder = this.items.slice();
	this.updateIndexes();
	if ( this.orientation === 'horizontal' ) {
		// Calculate and cache directionality on drag start - it's a little
		// expensive and it shouldn't change while dragging.
		this.dir = this.$element.css( 'direction' );
	}
	this.setDragItem( item );
};

/**
 * Update the index properties of the items
 */
OO.ui.mixin.DraggableGroupElement.prototype.updateIndexes = function () {
	var i, len;

	// Map the index of each object
	for ( i = 0, len = this.itemsOrder.length; i < len; i++ ) {
		this.itemsOrder[ i ].setIndex( i );
	}
};

/**
 * Handle drop or dragend event and switch the order of the items accordingly
 *
 * @private
 * @param {OO.ui.mixin.DraggableElement} item Dropped item
 * @return {OO.ui.Element} The element, for chaining
 */
OO.ui.mixin.DraggableGroupElement.prototype.onItemDropOrDragEnd = function () {
	var targetIndex, originalIndex,
		item = this.getDragItem();

	// TODO: Figure out a way to configure a list of legally droppable
	// elements even if they are not yet in the list
	if ( item ) {
		originalIndex = this.items.indexOf( item );
		// If the item has moved forward, add one to the index to account for the left shift
		targetIndex = item.getIndex() + ( item.getIndex() > originalIndex ? 1 : 0 );
		if ( targetIndex !== originalIndex ) {
			this.reorder( this.getDragItem(), targetIndex );
			this.emit( 'reorder', this.getDragItem(), targetIndex );
		}
		this.updateIndexes();
	}
	this.unsetDragItem();
	// Return false to prevent propogation
	return false;
};

/**
 * Respond to dragover event
 *
 * @private
 * @param {jQuery.Event} e Dragover event
 * @fires reorder
 */
OO.ui.mixin.DraggableGroupElement.prototype.onDragOver = function ( e ) {
	var overIndex, targetIndex,
		item = this.getDragItem(),
		dragItemIndex = item.getIndex();

	// Get the OptionWidget item we are dragging over
	overIndex = $( e.target ).closest( '.oo-ui-draggableElement' ).data( 'index' );

	if ( overIndex !== undefined && overIndex !== dragItemIndex ) {
		targetIndex = overIndex + ( overIndex > dragItemIndex ? 1 : 0 );

		if ( targetIndex > 0 ) {
			this.$group.children().eq( targetIndex - 1 ).after( item.$element );
		} else {
			this.$group.prepend( item.$element );
		}
		// Move item in itemsOrder array
		this.itemsOrder.splice( overIndex, 0,
			this.itemsOrder.splice( dragItemIndex, 1 )[ 0 ]
		);
		this.updateIndexes();
		this.emit( 'drag', item, targetIndex );
	}
	// Prevent default
	e.preventDefault();
};

/**
 * Reorder the items in the group
 *
 * @param {OO.ui.mixin.DraggableElement} item Reordered item
 * @param {number} newIndex New index
 */
OO.ui.mixin.DraggableGroupElement.prototype.reorder = function ( item, newIndex ) {
	this.addItems( [ item ], newIndex );
};

/**
 * Set a dragged item
 *
 * @param {OO.ui.mixin.DraggableElement} item Dragged item
 */
OO.ui.mixin.DraggableGroupElement.prototype.setDragItem = function ( item ) {
	if ( this.dragItem !== item ) {
		this.dragItem = item;
		this.$element.on( 'dragover', this.onDragOver.bind( this ) );
		this.$element.addClass( 'oo-ui-draggableGroupElement-dragging' );
	}
};

/**
 * Unset the current dragged item
 */
OO.ui.mixin.DraggableGroupElement.prototype.unsetDragItem = function () {
	if ( this.dragItem ) {
		this.dragItem = null;
		this.$element.off( 'dragover' );
		this.$element.removeClass( 'oo-ui-draggableGroupElement-dragging' );
	}
};

/**
 * Get the item that is currently being dragged.
 *
 * @return {OO.ui.mixin.DraggableElement|null} The currently dragged item, or `null` if no item is
 *  being dragged
 */
OO.ui.mixin.DraggableGroupElement.prototype.getDragItem = function () {
	return this.dragItem;
};

/**
 * RequestManager is a mixin that manages the lifecycle of a promise-backed request for a widget,
 * such as the {@link OO.ui.mixin.LookupElement}.
 *
 * @class
 * @abstract
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {boolean} [showPendingRequest=true] Show pending state while request data is being fetched.
 *  Requires widget to have also mixed in {@link OO.ui.mixin.PendingElement}.
 */
OO.ui.mixin.RequestManager = function OoUiMixinRequestManager( config ) {
	this.requestCache = {};
	this.requestQuery = null;
	this.requestRequest = null;
	this.showPendingRequest = !!this.pushPending && config.showPendingRequest !== false;
};

/* Setup */

OO.initClass( OO.ui.mixin.RequestManager );

/**
 * Get request results for the current query.
 *
 * @return {jQuery.Promise} Promise object which will be passed response data as the first argument
 *  of the done event. If the request was aborted to make way for a subsequent request, this
 *  promise may not be rejected, depending on what jQuery feels like doing.
 */
OO.ui.mixin.RequestManager.prototype.getRequestData = function () {
	var widget = this,
		value = this.getRequestQuery(),
		deferred = $.Deferred(),
		ourRequest;

	this.abortRequest();
	if ( Object.prototype.hasOwnProperty.call( this.requestCache, value ) ) {
		deferred.resolve( this.requestCache[ value ] );
	} else {
		if ( this.showPendingRequest ) {
			this.pushPending();
		}
		this.requestQuery = value;
		ourRequest = this.requestRequest = this.getRequest();
		ourRequest
			.always( function () {
				// We need to pop pending even if this is an old request, otherwise
				// the widget will remain pending forever.
				// TODO: this assumes that an aborted request will fail or succeed soon after
				// being aborted, or at least eventually. It would be nice if we could popPending()
				// at abort time, but only if we knew that we hadn't already called popPending()
				// for that request.
				if ( widget.showPendingRequest ) {
					widget.popPending();
				}
			} )
			.done( function ( response ) {
				// If this is an old request (and aborting it somehow caused it to still succeed),
				// ignore its success completely
				if ( ourRequest === widget.requestRequest ) {
					widget.requestQuery = null;
					widget.requestRequest = null;
					widget.requestCache[ value ] =
						widget.getRequestCacheDataFromResponse( response );
					deferred.resolve( widget.requestCache[ value ] );
				}
			} )
			.fail( function () {
				// If this is an old request (or a request failing because it's being aborted),
				// ignore its failure completely
				if ( ourRequest === widget.requestRequest ) {
					widget.requestQuery = null;
					widget.requestRequest = null;
					deferred.reject();
				}
			} );
	}
	return deferred.promise();
};

/**
 * Abort the currently pending request, if any.
 *
 * @private
 */
OO.ui.mixin.RequestManager.prototype.abortRequest = function () {
	var oldRequest = this.requestRequest;
	if ( oldRequest ) {
		// First unset this.requestRequest to the fail handler will notice
		// that the request is no longer current
		this.requestRequest = null;
		this.requestQuery = null;
		oldRequest.abort();
	}
};

/**
 * Get the query to be made.
 *
 * @protected
 * @method
 * @abstract
 * @return {string} query to be used
 */
OO.ui.mixin.RequestManager.prototype.getRequestQuery = null;

/**
 * Get a new request object of the current query value.
 *
 * @protected
 * @method
 * @abstract
 * @return {jQuery.Promise} jQuery AJAX object, or promise object with an .abort() method
 */
OO.ui.mixin.RequestManager.prototype.getRequest = null;

/**
 * Pre-process data returned by the request from #getRequest.
 *
 * The return value of this function will be cached, and any further queries for the given value
 * will use the cache rather than doing API requests.
 *
 * @protected
 * @method
 * @abstract
 * @param {Mixed} response Response from server
 * @return {Mixed} Cached result data
 */
OO.ui.mixin.RequestManager.prototype.getRequestCacheDataFromResponse = null;

/**
 * LookupElement is a mixin that creates a {@link OO.ui.MenuSelectWidget menu} of suggested
 * values for a {@link OO.ui.TextInputWidget text input widget}. Suggested values are based on
 * the characters the user types into the text input field and, in general, the menu is only
 * displayed when the user types. If a suggested value is chosen from the lookup menu, that value
 * becomes the value of the input field.
 *
 * Note that a new menu of suggested items is displayed when a value is chosen from the
 * lookup menu. If this is not the desired behavior, disable lookup menus with the
 * #setLookupsDisabled method, then set the value, then re-enable lookups.
 *
 * See the [OOUI demos][1] for an example.
 *
 * [1]: https://doc.wikimedia.org/oojs-ui/master/demos/#LookupElement-try-inputting-an-integer
 *
 * @class
 * @abstract
 * @mixins OO.ui.mixin.RequestManager
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {jQuery} [$overlay] Overlay for the lookup menu; defaults to relative positioning.
 *  See <https://www.mediawiki.org/wiki/OOUI/Concepts#Overlays>.
 * @cfg {jQuery} [$container=this.$element] The container element. The lookup menu is rendered
 *  beneath the specified element.
 * @cfg {Object} [menu] Configuration options to pass to
 *  {@link OO.ui.MenuSelectWidget menu select widget}
 * @cfg {boolean} [allowSuggestionsWhenEmpty=false] Request and display a lookup menu when the
 *  text input is empty.
 *  By default, the lookup menu is not generated and displayed until the user begins to type.
 * @cfg {boolean} [highlightFirst=true] Whether the first lookup result should be highlighted
 *  (so, that the user can take it over into the input with simply pressing return) automatically
 *  or not.
 * @cfg {boolean} [showSuggestionsOnFocus=true] Show suggestions when focusing the input. If this
 *  is set to false, suggestions will still be shown on a mousedown triggered focus. This matches
 *  browser autocomplete behavior.
 */
OO.ui.mixin.LookupElement = function OoUiMixinLookupElement( config ) {
	// Configuration initialization
	config = $.extend( { highlightFirst: true }, config );

	// Mixin constructors
	OO.ui.mixin.RequestManager.call( this, config );

	// Properties
	this.$overlay = ( config.$overlay === true ?
		OO.ui.getDefaultOverlay() : config.$overlay ) || this.$element;
	this.lookupMenu = new OO.ui.MenuSelectWidget( $.extend( {
		widget: this,
		input: this,
		$floatableContainer: config.$container || this.$element
	}, config.menu ) );

	this.allowSuggestionsWhenEmpty = config.allowSuggestionsWhenEmpty || false;

	this.lookupsDisabled = false;
	this.lookupInputFocused = false;
	this.lookupHighlightFirstItem = config.highlightFirst;
	this.showSuggestionsOnFocus = config.showSuggestionsOnFocus !== false;

	// Events
	this.$input.on( {
		focus: this.onLookupInputFocus.bind( this ),
		blur: this.onLookupInputBlur.bind( this ),
		mousedown: this.onLookupInputMouseDown.bind( this )
	} );
	this.connect( this, {
		change: 'onLookupInputChange'
	} );
	this.lookupMenu.connect( this, {
		toggle: 'onLookupMenuToggle',
		choose: 'onLookupMenuItemChoose'
	} );

	// Initialization
	this.$input.attr( {
		role: 'combobox',
		'aria-owns': this.lookupMenu.getElementId(),
		'aria-autocomplete': 'list'
	} );
	this.$element.addClass( 'oo-ui-lookupElement' );
	this.lookupMenu.$element.addClass( 'oo-ui-lookupElement-menu' );
	this.$overlay.append( this.lookupMenu.$element );
};

/* Setup */

OO.mixinClass( OO.ui.mixin.LookupElement, OO.ui.mixin.RequestManager );

/* Methods */

/**
 * Handle input focus event.
 *
 * @protected
 * @param {jQuery.Event} e Input focus event
 */
OO.ui.mixin.LookupElement.prototype.onLookupInputFocus = function () {
	this.lookupInputFocused = true;
	if ( this.showSuggestionsOnFocus ) {
		this.populateLookupMenu();
	}
};

/**
 * Handle input blur event.
 *
 * @protected
 * @param {jQuery.Event} e Input blur event
 */
OO.ui.mixin.LookupElement.prototype.onLookupInputBlur = function () {
	this.closeLookupMenu();
	this.lookupInputFocused = false;
};

/**
 * Handle input mouse down event.
 *
 * @protected
 * @param {jQuery.Event} e Input mouse down event
 */
OO.ui.mixin.LookupElement.prototype.onLookupInputMouseDown = function () {
	if (
		!this.lookupMenu.isVisible() &&
		(
			// Open the menu if the input was already focused.
			// This way we allow the user to open the menu again after closing it with Escape (esc)
			// by clicking in the input.
			this.lookupInputFocused ||
			// If showSuggestionsOnFocus is disabled, still open the menu on mousedown.
			!this.showSuggestionsOnFocus
		)
	) {
		this.populateLookupMenu();
	}
};

/**
 * Handle input change event.
 *
 * @protected
 * @param {string} value New input value
 */
OO.ui.mixin.LookupElement.prototype.onLookupInputChange = function () {
	if ( this.lookupInputFocused ) {
		this.populateLookupMenu();
	}
};

/**
 * Handle the lookup menu being shown/hidden.
 *
 * @protected
 * @param {boolean} visible Whether the lookup menu is now visible.
 */
OO.ui.mixin.LookupElement.prototype.onLookupMenuToggle = function ( visible ) {
	if ( !visible ) {
		// When the menu is hidden, abort any active request and clear the menu.
		// This has to be done here in addition to closeLookupMenu(), because
		// MenuSelectWidget will close itself when the user presses Escape (esc).
		this.abortLookupRequest();
		this.lookupMenu.clearItems();
	}
};

/**
 * Handle menu item 'choose' event, updating the text input value to the value of the clicked item.
 *
 * @protected
 * @param {OO.ui.MenuOptionWidget} item Selected item
 */
OO.ui.mixin.LookupElement.prototype.onLookupMenuItemChoose = function ( item ) {
	this.setValue( item.getData() );
};

/**
 * Get lookup menu.
 *
 * @private
 * @return {OO.ui.MenuSelectWidget}
 */
OO.ui.mixin.LookupElement.prototype.getLookupMenu = function () {
	return this.lookupMenu;
};

/**
 * Disable or re-enable lookups.
 *
 * When lookups are disabled, calls to #populateLookupMenu will be ignored.
 *
 * @param {boolean} disabled Disable lookups
 */
OO.ui.mixin.LookupElement.prototype.setLookupsDisabled = function ( disabled ) {
	this.lookupsDisabled = !!disabled;
};

/**
 * Open the menu. If there are no entries in the menu, this does nothing.
 *
 * @private
 * @chainable
 * @return {OO.ui.Element} The element, for chaining
 */
OO.ui.mixin.LookupElement.prototype.openLookupMenu = function () {
	if ( !this.lookupMenu.isEmpty() ) {
		this.lookupMenu.toggle( true );
	}
	return this;
};

/**
 * Close the menu, empty it, and abort any pending request.
 *
 * @private
 * @chainable
 * @return {OO.ui.Element} The element, for chaining
 */
OO.ui.mixin.LookupElement.prototype.closeLookupMenu = function () {
	this.lookupMenu.toggle( false );
	this.abortLookupRequest();
	this.lookupMenu.clearItems();
	return this;
};

/**
 * Request menu items based on the input's current value, and when they arrive,
 * populate the menu with these items and show the menu.
 *
 * If lookups have been disabled with #setLookupsDisabled, this function does nothing.
 *
 * @private
 * @chainable
 * @return {OO.ui.Element} The element, for chaining
 */
OO.ui.mixin.LookupElement.prototype.populateLookupMenu = function () {
	var widget = this,
		value = this.getValue();

	if ( this.lookupsDisabled || this.isReadOnly() ) {
		return;
	}

	// If the input is empty, clear the menu, unless suggestions when empty are allowed.
	if ( !this.allowSuggestionsWhenEmpty && value === '' ) {
		this.closeLookupMenu();
	// Skip population if there is already a request pending for the current value
	} else if ( value !== this.lookupQuery ) {
		this.getLookupMenuItems()
			.done( function ( items ) {
				widget.lookupMenu.clearItems();
				if ( items.length ) {
					widget.lookupMenu
						.addItems( items )
						.toggle( true );
					widget.initializeLookupMenuSelection();
				} else {
					widget.lookupMenu.toggle( false );
				}
			} )
			.fail( function () {
				widget.lookupMenu.clearItems();
				widget.lookupMenu.toggle( false );
			} );
	}

	return this;
};

/**
 * Highlight the first selectable item in the menu, if configured.
 *
 * @private
 * @chainable
 */
OO.ui.mixin.LookupElement.prototype.initializeLookupMenuSelection = function () {
	if ( this.lookupHighlightFirstItem && !this.lookupMenu.findSelectedItem() ) {
		this.lookupMenu.highlightItem( this.lookupMenu.findFirstSelectableItem() );
	}
};

/**
 * Get lookup menu items for the current query.
 *
 * @private
 * @return {jQuery.Promise} Promise object which will be passed menu items as the first argument of
 *   the done event. If the request was aborted to make way for a subsequent request, this promise
 *   will not be rejected: it will remain pending forever.
 */
OO.ui.mixin.LookupElement.prototype.getLookupMenuItems = function () {
	return this.getRequestData().then( function ( data ) {
		return this.getLookupMenuOptionsFromData( data );
	}.bind( this ) );
};

/**
 * Abort the currently pending lookup request, if any.
 *
 * @private
 */
OO.ui.mixin.LookupElement.prototype.abortLookupRequest = function () {
	this.abortRequest();
};

/**
 * Get a new request object of the current lookup query value.
 *
 * @protected
 * @method
 * @abstract
 * @return {jQuery.Promise} jQuery AJAX object, or promise object with an .abort() method
 */
OO.ui.mixin.LookupElement.prototype.getLookupRequest = null;

/**
 * Pre-process data returned by the request from #getLookupRequest.
 *
 * The return value of this function will be cached, and any further queries for the given value
 * will use the cache rather than doing API requests.
 *
 * @protected
 * @method
 * @abstract
 * @param {Mixed} response Response from server
 * @return {Mixed} Cached result data
 */
OO.ui.mixin.LookupElement.prototype.getLookupCacheDataFromResponse = null;

/**
 * Get a list of menu option widgets from the (possibly cached) data returned by
 * #getLookupCacheDataFromResponse.
 *
 * @protected
 * @method
 * @abstract
 * @param {Mixed} data Cached result data, usually an array
 * @return {OO.ui.MenuOptionWidget[]} Menu items
 */
OO.ui.mixin.LookupElement.prototype.getLookupMenuOptionsFromData = null;

/**
 * Set the read-only state of the widget.
 *
 * This will also disable/enable the lookups functionality.
 *
 * @param {boolean} readOnly Make input read-only
 * @chainable
 * @return {OO.ui.Element} The element, for chaining
 */
OO.ui.mixin.LookupElement.prototype.setReadOnly = function ( readOnly ) {
	// Parent method
	// Note: Calling #setReadOnly this way assumes this is mixed into an OO.ui.TextInputWidget
	OO.ui.TextInputWidget.prototype.setReadOnly.call( this, readOnly );

	// During construction, #setReadOnly is called before the OO.ui.mixin.LookupElement constructor.
	if ( this.isReadOnly() && this.lookupMenu ) {
		this.closeLookupMenu();
	}

	return this;
};

/**
 * @inheritdoc OO.ui.mixin.RequestManager
 */
OO.ui.mixin.LookupElement.prototype.getRequestQuery = function () {
	return this.getValue();
};

/**
 * @inheritdoc OO.ui.mixin.RequestManager
 */
OO.ui.mixin.LookupElement.prototype.getRequest = function () {
	return this.getLookupRequest();
};

/**
 * @inheritdoc OO.ui.mixin.RequestManager
 */
OO.ui.mixin.LookupElement.prototype.getRequestCacheDataFromResponse = function ( response ) {
	return this.getLookupCacheDataFromResponse( response );
};

/**
 * TabPanelLayouts are used within {@link OO.ui.IndexLayout index layouts} to create tab panels that
 * users can select and display from the index's optional {@link OO.ui.TabSelectWidget tab}
 * navigation. TabPanels are usually not instantiated directly, rather extended to include the
 * required content and functionality.
 *
 * Each tab panel must have a unique symbolic name, which is passed to the constructor. In addition,
 * the tab panel's tab item is customized (with a label) using the #setupTabItem method. See
 * {@link OO.ui.IndexLayout IndexLayout} for an example.
 *
 * @class
 * @extends OO.ui.PanelLayout
 *
 * @constructor
 * @param {string} name Unique symbolic name of tab panel
 * @param {Object} [config] Configuration options
 * @cfg {jQuery|string|Function|OO.ui.HtmlSnippet} [label] Label for tab panel's tab
 */
OO.ui.TabPanelLayout = function OoUiTabPanelLayout( name, config ) {
	// Allow passing positional parameters inside the config object
	if ( OO.isPlainObject( name ) && config === undefined ) {
		config = name;
		name = config.name;
	}

	// Configuration initialization
	config = $.extend( { scrollable: true }, config );

	// Parent constructor
	OO.ui.TabPanelLayout.parent.call( this, config );

	// Properties
	this.name = name;
	this.label = config.label;
	this.tabItem = null;
	this.active = false;

	// Initialization
	this.$element
		.addClass( 'oo-ui-tabPanelLayout' )
		.attr( 'role', 'tabpanel' );
};

/* Setup */

OO.inheritClass( OO.ui.TabPanelLayout, OO.ui.PanelLayout );

/* Events */

/**
 * An 'active' event is emitted when the tab panel becomes active. Tab panels become active when
 * they are shown in a index layout that is configured to display only one tab panel at a time.
 *
 * @event active
 * @param {boolean} active Tab panel is active
 */

/* Methods */

/**
 * Get the symbolic name of the tab panel.
 *
 * @return {string} Symbolic name of tab panel
 */
OO.ui.TabPanelLayout.prototype.getName = function () {
	return this.name;
};

/**
 * Check if tab panel is active.
 *
 * Tab panels become active when they are shown in a {@link OO.ui.IndexLayout index layout} that is
 * configured to display only one tab panel at a time. Additional CSS is applied to the tab panel's
 * tab item to reflect the active state.
 *
 * @return {boolean} Tab panel is active
 */
OO.ui.TabPanelLayout.prototype.isActive = function () {
	return this.active;
};

/**
 * Get tab item.
 *
 * The tab item allows users to access the tab panel from the index's tab
 * navigation. The tab item itself can be customized (with a label, level, etc.) using the
 * #setupTabItem method.
 *
 * @return {OO.ui.TabOptionWidget|null} Tab option widget
 */
OO.ui.TabPanelLayout.prototype.getTabItem = function () {
	return this.tabItem;
};

/**
 * Set or unset the tab item.
 *
 * Specify a {@link OO.ui.TabOptionWidget tab option} to set it,
 * or `null` to clear the tab item. To customize the tab item itself (e.g., to set a label or tab
 * level), use #setupTabItem instead of this method.
 *
 * @param {OO.ui.TabOptionWidget|null} tabItem Tab option widget, null to clear
 * @chainable
 * @return {OO.ui.TabPanelLayout} The layout, for chaining
 */
OO.ui.TabPanelLayout.prototype.setTabItem = function ( tabItem ) {
	this.tabItem = tabItem || null;
	if ( tabItem ) {
		this.setupTabItem();
	}
	return this;
};

/**
 * Set up the tab item.
 *
 * Use this method to customize the tab item (e.g., to add a label or tab level). To set or unset
 * the tab item itself (with a {@link OO.ui.TabOptionWidget tab option} or `null`), use
 * the #setTabItem method instead.
 *
 * @param {OO.ui.TabOptionWidget} tabItem Tab option widget to set up
 * @chainable
 * @return {OO.ui.TabPanelLayout} The layout, for chaining
 */
OO.ui.TabPanelLayout.prototype.setupTabItem = function () {
	this.$element.attr( 'aria-labelledby', this.tabItem.getElementId() );

	this.tabItem.$element.attr( 'aria-controls', this.getElementId() );

	if ( this.label ) {
		this.tabItem.setLabel( this.label );
	}
	return this;
};

/**
 * Set the tab panel to its 'active' state.
 *
 * Tab panels become active when they are shown in a index layout that is configured to display only
 * one tab panel at a time. Additional CSS is applied to the tab item to reflect the tab panel's
 * active state. Outside of the index context, setting the active state on a tab panel does nothing.
 *
 * @param {boolean} active Tab panel is active
 * @fires active
 */
OO.ui.TabPanelLayout.prototype.setActive = function ( active ) {
	active = !!active;

	if ( active !== this.active ) {
		this.active = active;
		this.$element.toggleClass( 'oo-ui-tabPanelLayout-active', this.active );
		this.emit( 'active', this.active );
	}
};

/**
 * PageLayouts are used within {@link OO.ui.BookletLayout booklet layouts} to create pages that
 * users can select and display from the booklet's optional
 * {@link OO.ui.OutlineSelectWidget outline} navigation. Pages are usually not instantiated
 * directly, rather extended to include the required content and functionality.
 *
 * Each page must have a unique symbolic name, which is passed to the constructor. In addition, the
 * page's outline item is customized (with a label, outline level, etc.) using the
 * #setupOutlineItem method. See {@link OO.ui.BookletLayout BookletLayout} for an example.
 *
 * @class
 * @extends OO.ui.PanelLayout
 *
 * @constructor
 * @param {string} name Unique symbolic name of page
 * @param {Object} [config] Configuration options
 */
OO.ui.PageLayout = function OoUiPageLayout( name, config ) {
	// Allow passing positional parameters inside the config object
	if ( OO.isPlainObject( name ) && config === undefined ) {
		config = name;
		name = config.name;
	}

	// Configuration initialization
	config = $.extend( { scrollable: true }, config );

	// Parent constructor
	OO.ui.PageLayout.parent.call( this, config );

	// Properties
	this.name = name;
	this.outlineItem = null;
	this.active = false;

	// Initialization
	this.$element.addClass( 'oo-ui-pageLayout' );
};

/* Setup */

OO.inheritClass( OO.ui.PageLayout, OO.ui.PanelLayout );

/* Events */

/**
 * An 'active' event is emitted when the page becomes active. Pages become active when they are
 * shown in a booklet layout that is configured to display only one page at a time.
 *
 * @event active
 * @param {boolean} active Page is active
 */

/* Methods */

/**
 * Get the symbolic name of the page.
 *
 * @return {string} Symbolic name of page
 */
OO.ui.PageLayout.prototype.getName = function () {
	return this.name;
};

/**
 * Check if page is active.
 *
 * Pages become active when they are shown in a {@link OO.ui.BookletLayout booklet layout} that is
 * configured to display only one page at a time. Additional CSS is applied to the page's outline
 * item to reflect the active state.
 *
 * @return {boolean} Page is active
 */
OO.ui.PageLayout.prototype.isActive = function () {
	return this.active;
};

/**
 * Get outline item.
 *
 * The outline item allows users to access the page from the booklet's outline
 * navigation. The outline item itself can be customized (with a label, level, etc.) using the
 * #setupOutlineItem method.
 *
 * @return {OO.ui.OutlineOptionWidget|null} Outline option widget
 */
OO.ui.PageLayout.prototype.getOutlineItem = function () {
	return this.outlineItem;
};

/**
 * Set or unset the outline item.
 *
 * Specify an {@link OO.ui.OutlineOptionWidget outline option} to set it,
 * or `null` to clear the outline item. To customize the outline item itself (e.g., to set a label
 * or outline level), use #setupOutlineItem instead of this method.
 *
 * @param {OO.ui.OutlineOptionWidget|null} outlineItem Outline option widget, null to clear
 * @chainable
 * @return {OO.ui.PageLayout} The layout, for chaining
 */
OO.ui.PageLayout.prototype.setOutlineItem = function ( outlineItem ) {
	this.outlineItem = outlineItem || null;
	if ( outlineItem ) {
		this.setupOutlineItem();
	}
	return this;
};

/**
 * Set up the outline item.
 *
 * Use this method to customize the outline item (e.g., to add a label or outline level). To set or
 * unset the outline item itself (with an {@link OO.ui.OutlineOptionWidget outline option} or
 * `null`), use the #setOutlineItem method instead.
 *
 * @param {OO.ui.OutlineOptionWidget} outlineItem Outline option widget to set up
 * @chainable
 * @return {OO.ui.PageLayout} The layout, for chaining
 */
OO.ui.PageLayout.prototype.setupOutlineItem = function () {
	return this;
};

/**
 * Set the page to its 'active' state.
 *
 * Pages become active when they are shown in a booklet layout that is configured to display only
 * one page at a time. Additional CSS is applied to the outline item to reflect the page's active
 * state. Outside of the booklet context, setting the active state on a page does nothing.
 *
 * @param {boolean} active Page is active
 * @fires active
 */
OO.ui.PageLayout.prototype.setActive = function ( active ) {
	active = !!active;

	if ( active !== this.active ) {
		this.active = active;
		this.$element.toggleClass( 'oo-ui-pageLayout-active', active );
		this.emit( 'active', this.active );
	}
};

/**
 * StackLayouts contain a series of {@link OO.ui.PanelLayout panel layouts}. By default, only one
 * panel is displayed at a time, though the stack layout can also be configured to show all
 * contained panels, one after another, by setting the #continuous option to 'true'.
 *
 *     @example
 *     // A stack layout with two panels, configured to be displayed continuously
 *     var myStack = new OO.ui.StackLayout( {
 *         items: [
 *             new OO.ui.PanelLayout( {
 *                 $content: $( '<p>Panel One</p>' ),
 *                 padded: true,
 *                 framed: true
 *             } ),
 *             new OO.ui.PanelLayout( {
 *                 $content: $( '<p>Panel Two</p>' ),
 *                 padded: true,
 *                 framed: true
 *             } )
 *         ],
 *         continuous: true
 *     } );
 *     $( document.body ).append( myStack.$element );
 *
 * @class
 * @extends OO.ui.PanelLayout
 * @mixins OO.ui.mixin.GroupElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {boolean} [continuous=false] Show all panels, one after another. By default, only one panel
 *  is displayed at a time.
 * @cfg {OO.ui.Layout[]} [items] Panel layouts to add to the stack layout.
 */
OO.ui.StackLayout = function OoUiStackLayout( config ) {
	// Configuration initialization
	// Make the layout scrollable in continuous mode, otherwise each
	// panel is responsible for its own scrolling.
	config = $.extend( { scrollable: !!( config && config.continuous ) }, config );

	// Parent constructor
	OO.ui.StackLayout.parent.call( this, config );

	// Mixin constructors
	OO.ui.mixin.GroupElement.call( this, $.extend( { $group: this.$element }, config ) );

	// Properties
	this.currentItem = null;
	this.continuous = !!config.continuous;

	// Initialization
	this.$element.addClass( 'oo-ui-stackLayout' );
	if ( this.continuous ) {
		this.$element.addClass( 'oo-ui-stackLayout-continuous' );
		this.$element.on( 'scroll', OO.ui.debounce( this.onScroll.bind( this ), 250 ) );
	}
	if ( Array.isArray( config.items ) ) {
		this.addItems( config.items );
	}
};

/* Setup */

OO.inheritClass( OO.ui.StackLayout, OO.ui.PanelLayout );
OO.mixinClass( OO.ui.StackLayout, OO.ui.mixin.GroupElement );

/* Events */

/**
 * A 'set' event is emitted when panels are {@link #addItems added}, {@link #removeItems removed},
 * {@link #clearItems cleared} or {@link #setItem displayed}.
 *
 * @event set
 * @param {OO.ui.Layout|null} item Current panel or `null` if no panel is shown
 */

/**
 * When used in continuous mode, this event is emitted when the user scrolls down
 * far enough such that currentItem is no longer visible.
 *
 * @event visibleItemChange
 * @param {OO.ui.PanelLayout} panel The next visible item in the layout
 */

/* Methods */

/**
 * Handle scroll events from the layout element
 *
 * @param {jQuery.Event} e
 * @fires visibleItemChange
 */
OO.ui.StackLayout.prototype.onScroll = function () {
	var currentRect,
		len = this.items.length,
		currentIndex = this.items.indexOf( this.currentItem ),
		newIndex = currentIndex,
		containerRect = this.$element[ 0 ].getBoundingClientRect();

	if ( !containerRect || ( !containerRect.top && !containerRect.bottom ) ) {
		// Can't get bounding rect, possibly not attached.
		return;
	}

	function getRect( item ) {
		return item.$element[ 0 ].getBoundingClientRect();
	}

	function isVisible( item ) {
		var rect = getRect( item );
		return rect.bottom > containerRect.top && rect.top < containerRect.bottom;
	}

	currentRect = getRect( this.currentItem );

	if ( currentRect.bottom < containerRect.top ) {
		// Scrolled down past current item
		while ( ++newIndex < len ) {
			if ( isVisible( this.items[ newIndex ] ) ) {
				break;
			}
		}
	} else if ( currentRect.top > containerRect.bottom ) {
		// Scrolled up past current item
		while ( --newIndex >= 0 ) {
			if ( isVisible( this.items[ newIndex ] ) ) {
				break;
			}
		}
	}

	if ( newIndex !== currentIndex ) {
		this.emit( 'visibleItemChange', this.items[ newIndex ] );
	}
};

/**
 * Get the current panel.
 *
 * @return {OO.ui.Layout|null}
 */
OO.ui.StackLayout.prototype.getCurrentItem = function () {
	return this.currentItem;
};

/**
 * Unset the current item.
 *
 * @private
 * @param {OO.ui.StackLayout} layout
 * @fires set
 */
OO.ui.StackLayout.prototype.unsetCurrentItem = function () {
	var prevItem = this.currentItem;
	if ( prevItem === null ) {
		return;
	}

	this.currentItem = null;
	this.emit( 'set', null );
};

/**
 * Add panel layouts to the stack layout.
 *
 * Panels will be added to the end of the stack layout array unless the optional index parameter
 * specifies a different insertion point. Adding a panel that is already in the stack will move it
 * to the end of the array or the point specified by the index.
 *
 * @param {OO.ui.Layout[]} items Panels to add
 * @param {number} [index] Index of the insertion point
 * @chainable
 * @return {OO.ui.StackLayout} The layout, for chaining
 */
OO.ui.StackLayout.prototype.addItems = function ( items, index ) {
	// Update the visibility
	this.updateHiddenState( items, this.currentItem );

	// Mixin method
	OO.ui.mixin.GroupElement.prototype.addItems.call( this, items, index );

	if ( !this.currentItem && items.length ) {
		this.setItem( items[ 0 ] );
	}

	return this;
};

/**
 * Remove the specified panels from the stack layout.
 *
 * Removed panels are detached from the DOM, not removed, so that they may be reused. To remove all
 * panels, you may wish to use the #clearItems method instead.
 *
 * @param {OO.ui.Layout[]} items Panels to remove
 * @chainable
 * @return {OO.ui.StackLayout} The layout, for chaining
 * @fires set
 */
OO.ui.StackLayout.prototype.removeItems = function ( items ) {
	// Mixin method
	OO.ui.mixin.GroupElement.prototype.removeItems.call( this, items );

	if ( items.indexOf( this.currentItem ) !== -1 ) {
		if ( this.items.length ) {
			this.setItem( this.items[ 0 ] );
		} else {
			this.unsetCurrentItem();
		}
	}

	return this;
};

/**
 * Clear all panels from the stack layout.
 *
 * Cleared panels are detached from the DOM, not removed, so that they may be reused. To remove only
 * a subset of panels, use the #removeItems method.
 *
 * @chainable
 * @return {OO.ui.StackLayout} The layout, for chaining
 * @fires set
 */
OO.ui.StackLayout.prototype.clearItems = function () {
	this.unsetCurrentItem();
	OO.ui.mixin.GroupElement.prototype.clearItems.call( this );

	return this;
};

/**
 * Show the specified panel.
 *
 * If another panel is currently displayed, it will be hidden.
 *
 * @param {OO.ui.Layout} item Panel to show
 * @chainable
 * @return {OO.ui.StackLayout} The layout, for chaining
 * @fires set
 */
OO.ui.StackLayout.prototype.setItem = function ( item ) {
	if ( item !== this.currentItem ) {
		this.updateHiddenState( this.items, item );

		if ( this.items.indexOf( item ) !== -1 ) {
			this.currentItem = item;
			this.emit( 'set', item );
		} else {
			this.unsetCurrentItem();
		}
	}

	return this;
};

/**
 * Reset the scroll offset of all panels, or the container if continuous
 *
 * @inheritdoc
 */
OO.ui.StackLayout.prototype.resetScroll = function () {
	if ( this.continuous ) {
		// Parent method
		return OO.ui.StackLayout.parent.prototype.resetScroll.call( this );
	}
	// Reset each panel
	this.getItems().forEach( function ( panel ) {
		var hidden = panel.$element.hasClass( 'oo-ui-element-hidden' );
		// Scroll can only be reset when panel is visible
		panel.$element.removeClass( 'oo-ui-element-hidden' );
		panel.resetScroll();
		if ( hidden ) {
			panel.$element.addClass( 'oo-ui-element-hidden' );
		}
	} );

	return this;
};

/**
 * Update the visibility of all items in case of non-continuous view.
 *
 * Ensure all items are hidden except for the selected one.
 * This method does nothing when the stack is continuous.
 *
 * @private
 * @param {OO.ui.Layout[]} items Item list iterate over
 * @param {OO.ui.Layout} [selectedItem] Selected item to show
 */
OO.ui.StackLayout.prototype.updateHiddenState = function ( items, selectedItem ) {
	var i, len;

	if ( !this.continuous ) {
		for ( i = 0, len = items.length; i < len; i++ ) {
			if ( !selectedItem || selectedItem !== items[ i ] ) {
				items[ i ].$element.addClass( 'oo-ui-element-hidden' );
				items[ i ].$element.attr( 'aria-hidden', 'true' );
			}
		}
		if ( selectedItem ) {
			selectedItem.$element.removeClass( 'oo-ui-element-hidden' );
			selectedItem.$element.removeAttr( 'aria-hidden' );
		}
	}
};

/**
 * MenuLayouts combine a menu and a content {@link OO.ui.PanelLayout panel}. The menu is positioned
 * relative to the content (after, before, top, or bottom) and its size is customized with the
 * #menuSize config. The content area will fill all remaining space.
 *
 *     @example
 *     var menuLayout,
 *         menuPanel = new OO.ui.PanelLayout( {
 *             padded: true,
 *             expanded: true,
 *             scrollable: true
 *         } ),
 *         contentPanel = new OO.ui.PanelLayout( {
 *             padded: true,
 *             expanded: true,
 *             scrollable: true
 *         } ),
 *         select = new OO.ui.SelectWidget( {
 *             items: [
 *                 new OO.ui.OptionWidget( {
 *                     data: 'before',
 *                     label: 'Before'
 *                 } ),
 *                 new OO.ui.OptionWidget( {
 *                     data: 'after',
 *                     label: 'After'
 *                 } ),
 *                 new OO.ui.OptionWidget( {
 *                     data: 'top',
 *                     label: 'Top'
 *                 } ),
 *                 new OO.ui.OptionWidget( {
 *                     data: 'bottom',
 *                     label: 'Bottom'
 *                 } )
 *              ]
 *         } ).on( 'select', function ( item ) {
 *            menuLayout.setMenuPosition( item.getData() );
 *         } );
 *
 *     menuLayout = new OO.ui.MenuLayout( {
 *         position: 'top',
 *         menuPanel: menuPanel,
 *         contentPanel: contentPanel
 *     } );
 *     menuLayout.$menu.append(
 *         menuPanel.$element.append( '<b>Menu panel</b>', select.$element )
 *     );
 *     menuLayout.$content.append(
 *         contentPanel.$element.append(
 *             '<b>Content panel</b>',
 *             '<p>Note that the menu is positioned relative to the content panel: ' +
 *             'top, bottom, after, before.</p>'
 *          )
 *     );
 *     $( document.body ).append( menuLayout.$element );
 *
 * If menu size needs to be overridden, it can be accomplished using CSS similar to the snippet
 * below. MenuLayout's CSS will override the appropriate values with 'auto' or '0' to display the
 * menu correctly. If `menuPosition` is known beforehand, CSS rules corresponding to other positions
 * may be omitted.
 *
 *     .oo-ui-menuLayout-menu {
 *         width: 200px;
 *         height: 200px;
 *     }
 *
 *     .oo-ui-menuLayout-content {
 *         top: 200px;
 *         left: 200px;
 *         right: 200px;
 *         bottom: 200px;
 *     }
 *
 * @class
 * @extends OO.ui.Layout
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {OO.ui.PanelLayout} [menuPanel] Menu panel
 * @cfg {OO.ui.PanelLayout} [contentPanel] Content panel
 * @cfg {boolean} [expanded=true] Expand the layout to fill the entire parent element.
 * @cfg {boolean} [showMenu=true] Show menu
 * @cfg {string} [menuPosition='before'] Position of menu: `top`, `after`, `bottom` or `before`
 */
OO.ui.MenuLayout = function OoUiMenuLayout( config ) {
	// Configuration initialization
	config = $.extend( {
		expanded: true,
		showMenu: true,
		menuPosition: 'before'
	}, config );

	// Parent constructor
	OO.ui.MenuLayout.parent.call( this, config );

	this.menuPanel = null;
	this.contentPanel = null;
	this.expanded = !!config.expanded;
	/**
	 * Menu DOM node
	 *
	 * @property {jQuery}
	 */
	this.$menu = $( '<div>' );
	/**
	 * Content DOM node
	 *
	 * @property {jQuery}
	 */
	this.$content = $( '<div>' );

	// Initialization
	this.$menu.addClass( 'oo-ui-menuLayout-menu' );
	this.$content.addClass( 'oo-ui-menuLayout-content' );
	this.$element.addClass( 'oo-ui-menuLayout' );
	if ( config.expanded ) {
		this.$element.addClass( 'oo-ui-menuLayout-expanded' );
	} else {
		this.$element.addClass( 'oo-ui-menuLayout-static' );
	}
	if ( config.menuPanel ) {
		this.setMenuPanel( config.menuPanel );
	}
	if ( config.contentPanel ) {
		this.setContentPanel( config.contentPanel );
	}
	this.setMenuPosition( config.menuPosition );
	this.toggleMenu( config.showMenu );
};

/* Setup */

OO.inheritClass( OO.ui.MenuLayout, OO.ui.Layout );

/* Methods */

/**
 * Toggle menu.
 *
 * @param {boolean} showMenu Show menu, omit to toggle
 * @chainable
 * @return {OO.ui.MenuLayout} The layout, for chaining
 */
OO.ui.MenuLayout.prototype.toggleMenu = function ( showMenu ) {
	showMenu = showMenu === undefined ? !this.showMenu : !!showMenu;

	if ( this.showMenu !== showMenu ) {
		this.showMenu = showMenu;
		this.$element
			.toggleClass( 'oo-ui-menuLayout-showMenu', this.showMenu )
			.toggleClass( 'oo-ui-menuLayout-hideMenu', !this.showMenu );
		this.$menu.attr( 'aria-hidden', this.showMenu ? 'false' : 'true' );
	}

	return this;
};

/**
 * Check if menu is visible
 *
 * @return {boolean} Menu is visible
 */
OO.ui.MenuLayout.prototype.isMenuVisible = function () {
	return this.showMenu;
};

/**
 * Set menu position.
 *
 * @param {string} position Position of menu, either `top`, `after`, `bottom` or `before`
 * @chainable
 * @return {OO.ui.MenuLayout} The layout, for chaining
 */
OO.ui.MenuLayout.prototype.setMenuPosition = function ( position ) {
	if ( [ 'top', 'bottom', 'before', 'after' ].indexOf( position ) === -1 ) {
		position = 'before';
	}

	this.$element.removeClass( 'oo-ui-menuLayout-' + this.menuPosition );
	this.menuPosition = position;
	if ( this.menuPosition === 'top' || this.menuPosition === 'before' ) {
		this.$element.append( this.$menu, this.$content );
	} else {
		this.$element.append( this.$content, this.$menu );
	}
	this.$element.addClass( 'oo-ui-menuLayout-' + position );

	return this;
};

/**
 * Get menu position.
 *
 * @return {string} Menu position
 */
OO.ui.MenuLayout.prototype.getMenuPosition = function () {
	return this.menuPosition;
};

/**
 * Set the menu panel.
 *
 * @param {OO.ui.PanelLayout} menuPanel Menu panel
 */
OO.ui.MenuLayout.prototype.setMenuPanel = function ( menuPanel ) {
	this.menuPanel = menuPanel;
	this.$menu.append( this.menuPanel.$element );
};

/**
 * Set the content panel.
 *
 * @param {OO.ui.PanelLayout} contentPanel Content panel
 */
OO.ui.MenuLayout.prototype.setContentPanel = function ( contentPanel ) {
	this.contentPanel = contentPanel;
	this.$content.append( this.contentPanel.$element );
};

/**
 * Clear the menu panel.
 */
OO.ui.MenuLayout.prototype.clearMenuPanel = function () {
	this.menuPanel = null;
	this.$menu.empty();
};

/**
 * Clear the content panel.
 */
OO.ui.MenuLayout.prototype.clearContentPanel = function () {
	this.contentPanel = null;
	this.$content.empty();
};

/**
 * Reset the scroll offset of all panels and the tab select widget
 *
 * @inheritdoc
 */
OO.ui.MenuLayout.prototype.resetScroll = function () {
	if ( this.menuPanel ) {
		this.menuPanel.resetScroll();
	}
	if ( this.contentPanel ) {
		this.contentPanel.resetScroll();
	}

	return this;
};

/**
 * BookletLayouts contain {@link OO.ui.PageLayout page layouts} as well as
 * an {@link OO.ui.OutlineSelectWidget outline} that allows users to easily navigate
 * through the pages and select which one to display. By default, only one page is
 * displayed at a time and the outline is hidden. When a user navigates to a new page,
 * the booklet layout automatically focuses on the first focusable element, unless the
 * default setting is changed. Optionally, booklets can be configured to show
 * {@link OO.ui.OutlineControlsWidget controls} for adding, moving, and removing items.
 *
 *     @example
 *     // Example of a BookletLayout that contains two PageLayouts.
 *
 *     function PageOneLayout( name, config ) {
 *         PageOneLayout.parent.call( this, name, config );
 *         this.$element.append( '<p>First page</p><p>(This booklet has an outline, displayed on ' +
 *         'the left)</p>' );
 *     }
 *     OO.inheritClass( PageOneLayout, OO.ui.PageLayout );
 *     PageOneLayout.prototype.setupOutlineItem = function () {
 *         this.outlineItem.setLabel( 'Page One' );
 *     };
 *
 *     function PageTwoLayout( name, config ) {
 *         PageTwoLayout.parent.call( this, name, config );
 *         this.$element.append( '<p>Second page</p>' );
 *     }
 *     OO.inheritClass( PageTwoLayout, OO.ui.PageLayout );
 *     PageTwoLayout.prototype.setupOutlineItem = function () {
 *         this.outlineItem.setLabel( 'Page Two' );
 *     };
 *
 *     var page1 = new PageOneLayout( 'one' ),
 *         page2 = new PageTwoLayout( 'two' );
 *
 *     var booklet = new OO.ui.BookletLayout( {
 *         outlined: true
 *     } );
 *
 *     booklet.addPages( [ page1, page2 ] );
 *     $( document.body ).append( booklet.$element );
 *
 * @class
 * @extends OO.ui.MenuLayout
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {boolean} [continuous=false] Show all pages, one after another
 * @cfg {boolean} [autoFocus=true] Focus on the first focusable element when a new page is
 *  displayed. Disabled on mobile.
 * @cfg {boolean} [outlined=false] Show the outline. The outline is used to navigate through the
 *  pages of the booklet.
 * @cfg {boolean} [editable=false] Show controls for adding, removing and reordering pages.
 */
OO.ui.BookletLayout = function OoUiBookletLayout( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.BookletLayout.parent.call( this, config );

	// Properties
	this.currentPageName = null;
	this.pages = {};
	this.ignoreFocus = false;
	this.stackLayout = new OO.ui.StackLayout( {
		continuous: !!config.continuous,
		expanded: this.expanded
	} );
	this.setContentPanel( this.stackLayout );
	this.autoFocus = config.autoFocus === undefined || !!config.autoFocus;
	this.outlineVisible = false;
	this.outlined = !!config.outlined;
	if ( this.outlined ) {
		this.editable = !!config.editable;
		this.outlineControlsWidget = null;
		this.outlineSelectWidget = new OO.ui.OutlineSelectWidget();
		this.outlinePanel = new OO.ui.PanelLayout( {
			expanded: this.expanded,
			scrollable: true
		} );
		this.setMenuPanel( this.outlinePanel );
		this.outlineVisible = true;
		if ( this.editable ) {
			this.outlineControlsWidget = new OO.ui.OutlineControlsWidget(
				this.outlineSelectWidget
			);
		}
	}
	this.toggleMenu( this.outlined );

	// Events
	this.stackLayout.connect( this, {
		set: 'onStackLayoutSet'
	} );
	if ( this.outlined ) {
		this.outlineSelectWidget.connect( this, {
			select: 'onOutlineSelectWidgetSelect'
		} );
		this.scrolling = false;
		this.stackLayout.connect( this, {
			visibleItemChange: 'onStackLayoutVisibleItemChange'
		} );
	}
	if ( this.autoFocus ) {
		// Event 'focus' does not bubble, but 'focusin' does
		this.stackLayout.$element.on( 'focusin', this.onStackLayoutFocus.bind( this ) );
	}

	// Initialization
	this.$element.addClass( 'oo-ui-bookletLayout' );
	this.stackLayout.$element.addClass( 'oo-ui-bookletLayout-stackLayout' );
	if ( this.outlined ) {
		this.outlinePanel.$element
			.addClass( 'oo-ui-bookletLayout-outlinePanel' )
			.append( this.outlineSelectWidget.$element );
		if ( this.editable ) {
			this.outlinePanel.$element
				.addClass( 'oo-ui-bookletLayout-outlinePanel-editable' )
				.append( this.outlineControlsWidget.$element );
		}
	}
};

/* Setup */

OO.inheritClass( OO.ui.BookletLayout, OO.ui.MenuLayout );

/* Events */

/**
 * A 'set' event is emitted when a page is {@link #setPage set} to be displayed by the
 * booklet layout.
 * @event set
 * @param {OO.ui.PageLayout} page Current page
 */

/**
 * An 'add' event is emitted when pages are {@link #addPages added} to the booklet layout.
 *
 * @event add
 * @param {OO.ui.PageLayout[]} page Added pages
 * @param {number} index Index pages were added at
 */

/**
 * A 'remove' event is emitted when pages are {@link #clearPages cleared} or
 * {@link #removePages removed} from the booklet.
 *
 * @event remove
 * @param {OO.ui.PageLayout[]} pages Removed pages
 */

/* Methods */

/**
 * Handle stack layout focus.
 *
 * @private
 * @param {jQuery.Event} e Focusin event
 */
OO.ui.BookletLayout.prototype.onStackLayoutFocus = function ( e ) {
	var name, $target;

	// Find the page that an element was focused within
	$target = $( e.target ).closest( '.oo-ui-pageLayout' );
	for ( name in this.pages ) {
		// Check for page match, exclude current page to find only page changes
		if ( this.pages[ name ].$element[ 0 ] === $target[ 0 ] && name !== this.currentPageName ) {
			this.setPage( name );
			break;
		}
	}
};

/**
 * Handle visibleItemChange events from the stackLayout
 *
 * The next visible page is set as the current page by selecting it
 * in the outline
 *
 * @param {OO.ui.PageLayout} page The next visible page in the layout
 */
OO.ui.BookletLayout.prototype.onStackLayoutVisibleItemChange = function ( page ) {
	// Set a flag to so that the resulting call to #onStackLayoutSet doesn't
	// try and scroll the item into view again.
	this.scrolling = true;
	this.outlineSelectWidget.selectItemByData( page.getName() );
	this.scrolling = false;
};

/**
 * Handle stack layout set events.
 *
 * @private
 * @param {OO.ui.PanelLayout|null} page The page panel that is now the current panel
 */
OO.ui.BookletLayout.prototype.onStackLayoutSet = function ( page ) {
	var promise, layout = this;
	// If everything is unselected, do nothing
	if ( !page ) {
		return;
	}
	// For continuous BookletLayouts, scroll the selected page into view first
	if ( this.stackLayout.continuous && !this.scrolling ) {
		promise = page.scrollElementIntoView();
	} else {
		promise = $.Deferred().resolve();
	}
	// Focus the first element on the newly selected panel.
	// Don't focus if the page was set by scrolling.
	if ( this.autoFocus && !OO.ui.isMobile() && !this.scrolling ) {
		promise.done( function () {
			layout.focus();
		} );
	}
};

/**
 * Focus the first input in the current page.
 *
 * If no page is selected, the first selectable page will be selected.
 * If the focus is already in an element on the current page, nothing will happen.
 *
 * @param {number} [itemIndex] A specific item to focus on
 */
OO.ui.BookletLayout.prototype.focus = function ( itemIndex ) {
	var page,
		items = this.stackLayout.getItems();

	if ( itemIndex !== undefined && items[ itemIndex ] ) {
		page = items[ itemIndex ];
	} else {
		page = this.stackLayout.getCurrentItem();
	}

	if ( !page && this.outlined ) {
		this.selectFirstSelectablePage();
		page = this.stackLayout.getCurrentItem();
	}
	if ( !page ) {
		return;
	}
	// Only change the focus if is not already in the current page
	if ( !OO.ui.contains( page.$element[ 0 ], this.getElementDocument().activeElement, true ) ) {
		page.focus();
	}
};

/**
 * Find the first focusable input in the booklet layout and focus
 * on it.
 */
OO.ui.BookletLayout.prototype.focusFirstFocusable = function () {
	OO.ui.findFocusable( this.stackLayout.$element ).focus();
};

/**
 * Handle outline widget select events.
 *
 * @private
 * @param {OO.ui.OptionWidget|null} item Selected item
 */
OO.ui.BookletLayout.prototype.onOutlineSelectWidgetSelect = function ( item ) {
	if ( item ) {
		this.setPage( item.getData() );
	}
};

/**
 * Check if booklet has an outline.
 *
 * @return {boolean} Booklet has an outline
 */
OO.ui.BookletLayout.prototype.isOutlined = function () {
	return this.outlined;
};

/**
 * Check if booklet has editing controls.
 *
 * @return {boolean} Booklet is editable
 */
OO.ui.BookletLayout.prototype.isEditable = function () {
	return this.editable;
};

/**
 * Check if booklet has a visible outline.
 *
 * @return {boolean} Outline is visible
 */
OO.ui.BookletLayout.prototype.isOutlineVisible = function () {
	return this.outlined && this.outlineVisible;
};

/**
 * Hide or show the outline.
 *
 * @param {boolean} [show] Show outline, omit to invert current state
 * @chainable
 * @return {OO.ui.BookletLayout} The layout, for chaining
 */
OO.ui.BookletLayout.prototype.toggleOutline = function ( show ) {
	var booklet = this;

	if ( this.outlined ) {
		show = show === undefined ? !this.outlineVisible : !!show;
		this.outlineVisible = show;
		this.toggleMenu( show );
		if ( show && this.editable ) {
			// HACK: Kill dumb scrollbars when the sidebar stops animating, see T161798.
			// Only necessary when outline controls are present, delay matches transition on
			// `.oo-ui-menuLayout-menu`.
			setTimeout( function () {
				OO.ui.Element.static.reconsiderScrollbars( booklet.outlinePanel.$element[ 0 ] );
			}, OO.ui.theme.getDialogTransitionDuration() );
		}
	}

	return this;
};

/**
 * Find the page closest to the specified page.
 *
 * @param {OO.ui.PageLayout} page Page to use as a reference point
 * @return {OO.ui.PageLayout|null} Page closest to the specified page
 */
OO.ui.BookletLayout.prototype.findClosestPage = function ( page ) {
	var next, prev, level,
		pages = this.stackLayout.getItems(),
		index = pages.indexOf( page );

	if ( index !== -1 ) {
		next = pages[ index + 1 ];
		prev = pages[ index - 1 ];
		// Prefer adjacent pages at the same level
		if ( this.outlined ) {
			level = this.outlineSelectWidget.findItemFromData( page.getName() ).getLevel();
			if (
				prev &&
				level === this.outlineSelectWidget.findItemFromData( prev.getName() ).getLevel()
			) {
				return prev;
			}
			if (
				next &&
				level === this.outlineSelectWidget.findItemFromData( next.getName() ).getLevel()
			) {
				return next;
			}
		}
	}
	return prev || next || null;
};

/**
 * Get the outline widget.
 *
 * If the booklet is not outlined, the method will return `null`.
 *
 * @return {OO.ui.OutlineSelectWidget|null} Outline widget, or null if the booklet is not outlined
 */
OO.ui.BookletLayout.prototype.getOutline = function () {
	return this.outlineSelectWidget;
};

/**
 * Get the outline controls widget.
 *
 * If the outline is not editable, the method will return `null`.
 *
 * @return {OO.ui.OutlineControlsWidget|null} The outline controls widget.
 */
OO.ui.BookletLayout.prototype.getOutlineControls = function () {
	return this.outlineControlsWidget;
};

/**
 * Get a page by its symbolic name.
 *
 * @param {string} name Symbolic name of page
 * @return {OO.ui.PageLayout|undefined} Page, if found
 */
OO.ui.BookletLayout.prototype.getPage = function ( name ) {
	return this.pages[ name ];
};

/**
 * Get the current page.
 *
 * @return {OO.ui.PageLayout|undefined} Current page, if found
 */
OO.ui.BookletLayout.prototype.getCurrentPage = function () {
	var name = this.getCurrentPageName();
	return name ? this.getPage( name ) : undefined;
};

/**
 * Get the symbolic name of the current page.
 *
 * @return {string|null} Symbolic name of the current page
 */
OO.ui.BookletLayout.prototype.getCurrentPageName = function () {
	return this.currentPageName;
};

/**
 * Add pages to the booklet layout
 *
 * When pages are added with the same names as existing pages, the existing pages will be
 * automatically removed before the new pages are added.
 *
 * @param {OO.ui.PageLayout[]} pages Pages to add
 * @param {number} index Index of the insertion point
 * @fires add
 * @chainable
 * @return {OO.ui.BookletLayout} The layout, for chaining
 */
OO.ui.BookletLayout.prototype.addPages = function ( pages, index ) {
	var i, len, name, page, item, currentIndex,
		stackLayoutPages = this.stackLayout.getItems(),
		remove = [],
		items = [];

	// Remove pages with same names
	for ( i = 0, len = pages.length; i < len; i++ ) {
		page = pages[ i ];
		name = page.getName();

		if ( Object.prototype.hasOwnProperty.call( this.pages, name ) ) {
			// Correct the insertion index
			currentIndex = stackLayoutPages.indexOf( this.pages[ name ] );
			if ( currentIndex !== -1 && currentIndex + 1 < index ) {
				index--;
			}
			remove.push( this.pages[ name ] );
		}
	}
	if ( remove.length ) {
		this.removePages( remove );
	}

	// Add new pages
	for ( i = 0, len = pages.length; i < len; i++ ) {
		page = pages[ i ];
		name = page.getName();
		this.pages[ page.getName() ] = page;
		if ( this.outlined ) {
			item = new OO.ui.OutlineOptionWidget( { data: name } );
			page.setOutlineItem( item );
			items.push( item );
		}
	}

	if ( this.outlined && items.length ) {
		this.outlineSelectWidget.addItems( items, index );
		this.selectFirstSelectablePage();
	}
	this.stackLayout.addItems( pages, index );
	this.emit( 'add', pages, index );

	return this;
};

/**
 * Remove the specified pages from the booklet layout.
 *
 * To remove all pages from the booklet, you may wish to use the #clearPages method instead.
 *
 * @param {OO.ui.PageLayout[]} pages An array of pages to remove
 * @fires remove
 * @chainable
 * @return {OO.ui.BookletLayout} The layout, for chaining
 */
OO.ui.BookletLayout.prototype.removePages = function ( pages ) {
	var i, len, name, page,
		items = [];

	for ( i = 0, len = pages.length; i < len; i++ ) {
		page = pages[ i ];
		name = page.getName();
		delete this.pages[ name ];
		if ( this.outlined ) {
			items.push( this.outlineSelectWidget.findItemFromData( name ) );
			page.setOutlineItem( null );
		}
	}
	if ( this.outlined && items.length ) {
		this.outlineSelectWidget.removeItems( items );
		this.selectFirstSelectablePage();
	}
	this.stackLayout.removeItems( pages );
	this.emit( 'remove', pages );

	return this;
};

/**
 * Clear all pages from the booklet layout.
 *
 * To remove only a subset of pages from the booklet, use the #removePages method.
 *
 * @fires remove
 * @chainable
 * @return {OO.ui.BookletLayout} The layout, for chaining
 */
OO.ui.BookletLayout.prototype.clearPages = function () {
	var i, len,
		pages = this.stackLayout.getItems();

	this.pages = {};
	this.currentPageName = null;
	if ( this.outlined ) {
		this.outlineSelectWidget.clearItems();
		for ( i = 0, len = pages.length; i < len; i++ ) {
			pages[ i ].setOutlineItem( null );
		}
	}
	this.stackLayout.clearItems();

	this.emit( 'remove', pages );

	return this;
};

/**
 * Set the current page by symbolic name.
 *
 * @fires set
 * @param {string} name Symbolic name of page
 */
OO.ui.BookletLayout.prototype.setPage = function ( name ) {
	var selectedItem,
		$focused,
		page = this.pages[ name ],
		previousPage = this.currentPageName && this.pages[ this.currentPageName ];

	if ( name !== this.currentPageName ) {
		if ( this.outlined ) {
			selectedItem = this.outlineSelectWidget.findSelectedItem();
			if ( selectedItem && selectedItem.getData() !== name ) {
				this.outlineSelectWidget.selectItemByData( name );
			}
		}
		if ( page ) {
			if ( previousPage ) {
				previousPage.setActive( false );
				// Blur anything focused if the next page doesn't have anything focusable.
				// This is not needed if the next page has something focusable (because once it is
				// focused this blur happens automatically). If the layout is non-continuous, this
				// check is meaningless because the next page is not visible yet and thus can't
				// hold focus.
				if (
					this.autoFocus &&
					!OO.ui.isMobile() &&
					this.stackLayout.continuous &&
					OO.ui.findFocusable( page.$element ).length !== 0
				) {
					$focused = previousPage.$element.find( ':focus' );
					if ( $focused.length ) {
						$focused[ 0 ].blur();
					}
				}
			}
			this.currentPageName = name;
			page.setActive( true );
			this.stackLayout.setItem( page );
			if ( !this.stackLayout.continuous && previousPage ) {
				// This should not be necessary, since any inputs on the previous page should have
				// been blurred when it was hidden, but browsers are not very consistent about
				// this.
				$focused = previousPage.$element.find( ':focus' );
				if ( $focused.length ) {
					$focused[ 0 ].blur();
				}
			}
			this.emit( 'set', page );
		}
	}
};

/**
 * For outlined-continuous booklets, also reset the outlineSelectWidget to the first item.
 *
 * @inheritdoc
 */
OO.ui.BookletLayout.prototype.resetScroll = function () {
	// Parent method
	OO.ui.BookletLayout.parent.prototype.resetScroll.call( this );

	if (
		this.outlined &&
		this.stackLayout.continuous &&
		this.outlineSelectWidget.findFirstSelectableItem()
	) {
		this.scrolling = true;
		this.outlineSelectWidget.selectItem( this.outlineSelectWidget.findFirstSelectableItem() );
		this.scrolling = false;
	}
	return this;
};

/**
 * Select the first selectable page.
 *
 * @chainable
 * @return {OO.ui.BookletLayout} The layout, for chaining
 */
OO.ui.BookletLayout.prototype.selectFirstSelectablePage = function () {
	if ( !this.outlineSelectWidget.findSelectedItem() ) {
		this.outlineSelectWidget.selectItem( this.outlineSelectWidget.findFirstSelectableItem() );
	}

	return this;
};

/**
 * IndexLayouts contain {@link OO.ui.TabPanelLayout tab panel layouts} as well as
 * {@link OO.ui.TabSelectWidget tabs} that allow users to easily navigate through the tab panels
 * and select which one to display. By default, only one tab panel is displayed at a time. When a
 * user navigates to a new tab panel, the index layout automatically focuses on the first focusable
 * element, unless the default setting is changed.
 *
 * TODO: This class is similar to BookletLayout, we may want to refactor to reduce duplication
 *
 *     @example
 *     // Example of a IndexLayout that contains two TabPanelLayouts.
 *
 *     function TabPanelOneLayout( name, config ) {
 *         TabPanelOneLayout.parent.call( this, name, config );
 *         this.$element.append( '<p>First tab panel</p>' );
 *     }
 *     OO.inheritClass( TabPanelOneLayout, OO.ui.TabPanelLayout );
 *     TabPanelOneLayout.prototype.setupTabItem = function () {
 *         this.tabItem.setLabel( 'Tab panel one' );
 *     };
 *
 *     var tabPanel1 = new TabPanelOneLayout( 'one' ),
 *         tabPanel2 = new OO.ui.TabPanelLayout( 'two', { label: 'Tab panel two' } );
 *
 *     tabPanel2.$element.append( '<p>Second tab panel</p>' );
 *
 *     var index = new OO.ui.IndexLayout();
 *
 *     index.addTabPanels( [ tabPanel1, tabPanel2 ] );
 *     $( document.body ).append( index.$element );
 *
 * @class
 * @extends OO.ui.MenuLayout
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {OO.ui.StackLayout} [contentPanel] Content stack (see MenuLayout)
 * @cfg {boolean} [continuous=false] Show all tab panels, one after another
 * @cfg {boolean} [autoFocus=true] Focus on the first focusable element when a new tab panel is
 *  displayed. Disabled on mobile.
 * @cfg {boolean} [framed=true] Render the tabs with frames
 */
OO.ui.IndexLayout = function OoUiIndexLayout( config ) {
	// Configuration initialization
	config = $.extend( {}, config, { menuPosition: 'top' } );

	// Parent constructor
	OO.ui.IndexLayout.parent.call( this, config );

	// Properties
	this.currentTabPanelName = null;
	// Allow infused widgets to pass existing tabPanels
	this.tabPanels = config.tabPanels || {};

	this.ignoreFocus = false;
	this.stackLayout = this.contentPanel || new OO.ui.StackLayout( {
		continuous: !!config.continuous,
		expanded: this.expanded
	} );
	this.setContentPanel( this.stackLayout );
	this.autoFocus = config.autoFocus === undefined || !!config.autoFocus;

	// Allow infused widgets to pass an existing tabSelectWidget
	this.tabSelectWidget = config.tabSelectWidget || new OO.ui.TabSelectWidget( {
		framed: config.framed === undefined || config.framed
	} );
	this.tabPanel = this.menuPanel || new OO.ui.PanelLayout( {
		expanded: this.expanded
	} );
	this.setMenuPanel( this.tabPanel );

	this.toggleMenu( true );

	// Events
	this.stackLayout.connect( this, {
		set: 'onStackLayoutSet'
	} );
	this.tabSelectWidget.connect( this, {
		select: 'onTabSelectWidgetSelect'
	} );
	if ( this.autoFocus ) {
		// Event 'focus' does not bubble, but 'focusin' does.
		this.stackLayout.$element.on( 'focusin', this.onStackLayoutFocus.bind( this ) );
	}

	// Initialization
	this.$element.addClass( 'oo-ui-indexLayout' );
	this.stackLayout.$element.addClass( 'oo-ui-indexLayout-stackLayout' );
	this.tabPanel.$element
		.addClass( 'oo-ui-indexLayout-tabPanel' )
		.append( this.tabSelectWidget.$element );

	this.selectFirstSelectableTabPanel();
};

/* Setup */

OO.inheritClass( OO.ui.IndexLayout, OO.ui.MenuLayout );

/* Events */

/**
 * A 'set' event is emitted when a tab panel is {@link #setTabPanel set} to be displayed by the
 * index layout.
 *
 * @event set
 * @param {OO.ui.TabPanelLayout} tabPanel Current tab panel
 */

/**
 * An 'add' event is emitted when tab panels are {@link #addTabPanels added} to the index layout.
 *
 * @event add
 * @param {OO.ui.TabPanelLayout[]} tabPanel Added tab panels
 * @param {number} index Index tab panels were added at
 */

/**
 * A 'remove' event is emitted when tab panels are {@link #clearTabPanels cleared} or
 * {@link #removeTabPanels removed} from the index.
 *
 * @event remove
 * @param {OO.ui.TabPanelLayout[]} tabPanel Removed tab panels
 */

/* Methods */

/**
 * Handle stack layout focus.
 *
 * @private
 * @param {jQuery.Event} e Focusing event
 */
OO.ui.IndexLayout.prototype.onStackLayoutFocus = function ( e ) {
	var name, $target;

	// Find the tab panel that an element was focused within
	$target = $( e.target ).closest( '.oo-ui-tabPanelLayout' );
	for ( name in this.tabPanels ) {
		// Check for tab panel match, exclude current tab panel to find only tab panel changes
		if ( this.tabPanels[ name ].$element[ 0 ] === $target[ 0 ] &&
				name !== this.currentTabPanelName ) {
			this.setTabPanel( name );
			break;
		}
	}
};

/**
 * Handle stack layout set events.
 *
 * @private
 * @param {OO.ui.PanelLayout|null} tabPanel The tab panel that is now the current panel
 */
OO.ui.IndexLayout.prototype.onStackLayoutSet = function ( tabPanel ) {
	// If everything is unselected, do nothing
	if ( !tabPanel ) {
		return;
	}
	// Focus the first element on the newly selected panel
	if ( this.autoFocus && !OO.ui.isMobile() ) {
		this.focus();
	}
};

/**
 * Focus the first input in the current tab panel.
 *
 * If no tab panel is selected, the first selectable tab panel will be selected.
 * If the focus is already in an element on the current tab panel, nothing will happen.
 *
 * @param {number} [itemIndex] A specific item to focus on
 */
OO.ui.IndexLayout.prototype.focus = function ( itemIndex ) {
	var tabPanel,
		items = this.stackLayout.getItems();

	if ( itemIndex !== undefined && items[ itemIndex ] ) {
		tabPanel = items[ itemIndex ];
	} else {
		tabPanel = this.stackLayout.getCurrentItem();
	}

	if ( !tabPanel ) {
		this.selectFirstSelectableTabPanel();
		tabPanel = this.stackLayout.getCurrentItem();
	}
	if ( !tabPanel ) {
		return;
	}
	// Only change the focus if is not already in the current page
	if ( !OO.ui.contains(
		tabPanel.$element[ 0 ],
		this.getElementDocument().activeElement,
		true
	) ) {
		tabPanel.focus();
	}
};

/**
 * Find the first focusable input in the index layout and focus
 * on it.
 */
OO.ui.IndexLayout.prototype.focusFirstFocusable = function () {
	OO.ui.findFocusable( this.stackLayout.$element ).focus();
};

/**
 * Handle tab widget select events.
 *
 * @private
 * @param {OO.ui.OptionWidget|null} item Selected item
 */
OO.ui.IndexLayout.prototype.onTabSelectWidgetSelect = function ( item ) {
	if ( item ) {
		this.setTabPanel( item.getData() );
	}
};

/**
 * Get the tab panel closest to the specified tab panel.
 *
 * @param {OO.ui.TabPanelLayout} tabPanel Tab panel to use as a reference point
 * @return {OO.ui.TabPanelLayout|null} Tab panel closest to the specified
 */
OO.ui.IndexLayout.prototype.getClosestTabPanel = function ( tabPanel ) {
	var next, prev, level,
		tabPanels = this.stackLayout.getItems(),
		index = tabPanels.indexOf( tabPanel );

	if ( index !== -1 ) {
		next = tabPanels[ index + 1 ];
		prev = tabPanels[ index - 1 ];
		// Prefer adjacent tab panels at the same level
		level = this.tabSelectWidget.findItemFromData( tabPanel.getName() ).getLevel();
		if (
			prev &&
			level === this.tabSelectWidget.findItemFromData( prev.getName() ).getLevel()
		) {
			return prev;
		}
		if (
			next &&
			level === this.tabSelectWidget.findItemFromData( next.getName() ).getLevel()
		) {
			return next;
		}
	}
	return prev || next || null;
};

/**
 * Get the tabs widget.
 *
 * @return {OO.ui.TabSelectWidget} Tabs widget
 */
OO.ui.IndexLayout.prototype.getTabs = function () {
	return this.tabSelectWidget;
};

/**
 * Get a tab panel by its symbolic name.
 *
 * @param {string} name Symbolic name of tab panel
 * @return {OO.ui.TabPanelLayout|undefined} Tab panel, if found
 */
OO.ui.IndexLayout.prototype.getTabPanel = function ( name ) {
	return this.tabPanels[ name ];
};

/**
 * Get the current tab panel.
 *
 * @return {OO.ui.TabPanelLayout|undefined} Current tab panel, if found
 */
OO.ui.IndexLayout.prototype.getCurrentTabPanel = function () {
	var name = this.getCurrentTabPanelName();
	return name ? this.getTabPanel( name ) : undefined;
};

/**
 * Get the symbolic name of the current tab panel.
 *
 * @return {string|null} Symbolic name of the current tab panel
 */
OO.ui.IndexLayout.prototype.getCurrentTabPanelName = function () {
	return this.currentTabPanelName;
};

/**
 * Add tab panels to the index layout.
 *
 * When tab panels are added with the same names as existing tab panels, the existing tab panels
 * will be automatically removed before the new tab panels are added.
 *
 * @param {OO.ui.TabPanelLayout[]} tabPanels Tab panels to add
 * @param {number} index Index of the insertion point
 * @fires add
 * @chainable
 * @return {OO.ui.BookletLayout} The layout, for chaining
 */
OO.ui.IndexLayout.prototype.addTabPanels = function ( tabPanels, index ) {
	var i, len, name, tabPanel, item, currentIndex,
		stackLayoutTabPanels = this.stackLayout.getItems(),
		remove = [],
		items = [];

	// Remove tab panels with same names
	for ( i = 0, len = tabPanels.length; i < len; i++ ) {
		tabPanel = tabPanels[ i ];
		name = tabPanel.getName();

		if ( Object.prototype.hasOwnProperty.call( this.tabPanels, name ) ) {
			// Correct the insertion index
			currentIndex = stackLayoutTabPanels.indexOf( this.tabPanels[ name ] );
			if ( currentIndex !== -1 && currentIndex + 1 < index ) {
				index--;
			}
			remove.push( this.tabPanels[ name ] );
		}
	}
	if ( remove.length ) {
		this.removeTabPanels( remove );
	}

	// Add new tab panels
	for ( i = 0, len = tabPanels.length; i < len; i++ ) {
		tabPanel = tabPanels[ i ];
		name = tabPanel.getName();
		this.tabPanels[ tabPanel.getName() ] = tabPanel;
		item = new OO.ui.TabOptionWidget( { data: name } );
		tabPanel.setTabItem( item );
		items.push( item );
	}

	if ( items.length ) {
		this.tabSelectWidget.addItems( items, index );
		this.selectFirstSelectableTabPanel();
	}
	this.stackLayout.addItems( tabPanels, index );
	this.emit( 'add', tabPanels, index );

	return this;
};

/**
 * Remove the specified tab panels from the index layout.
 *
 * To remove all tab panels from the index, you may wish to use the #clearTabPanels method instead.
 *
 * @param {OO.ui.TabPanelLayout[]} tabPanels An array of tab panels to remove
 * @fires remove
 * @chainable
 * @return {OO.ui.BookletLayout} The layout, for chaining
 */
OO.ui.IndexLayout.prototype.removeTabPanels = function ( tabPanels ) {
	var i, len, name, tabPanel,
		items = [];

	for ( i = 0, len = tabPanels.length; i < len; i++ ) {
		tabPanel = tabPanels[ i ];
		name = tabPanel.getName();
		delete this.tabPanels[ name ];
		items.push( this.tabSelectWidget.findItemFromData( name ) );
		tabPanel.setTabItem( null );
	}
	if ( items.length ) {
		this.tabSelectWidget.removeItems( items );
		this.selectFirstSelectableTabPanel();
	}
	this.stackLayout.removeItems( tabPanels );
	this.emit( 'remove', tabPanels );

	return this;
};

/**
 * Clear all tab panels from the index layout.
 *
 * To remove only a subset of tab panels from the index, use the #removeTabPanels method.
 *
 * @fires remove
 * @chainable
 * @return {OO.ui.BookletLayout} The layout, for chaining
 */
OO.ui.IndexLayout.prototype.clearTabPanels = function () {
	var i, len,
		tabPanels = this.stackLayout.getItems();

	this.tabPanels = {};
	this.currentTabPanelName = null;
	this.tabSelectWidget.clearItems();
	for ( i = 0, len = tabPanels.length; i < len; i++ ) {
		tabPanels[ i ].setTabItem( null );
	}
	this.stackLayout.clearItems();

	this.emit( 'remove', tabPanels );

	return this;
};

/**
 * Set the current tab panel by symbolic name.
 *
 * @fires set
 * @param {string} name Symbolic name of tab panel
 */
OO.ui.IndexLayout.prototype.setTabPanel = function ( name ) {
	var selectedItem,
		$focused,
		previousTabPanel,
		tabPanel = this.tabPanels[ name ];

	if ( name !== this.currentTabPanelName ) {
		previousTabPanel = this.getCurrentTabPanel();
		selectedItem = this.tabSelectWidget.findSelectedItem();
		if ( selectedItem && selectedItem.getData() !== name ) {
			this.tabSelectWidget.selectItemByData( name );
		}
		if ( tabPanel ) {
			if ( previousTabPanel ) {
				previousTabPanel.setActive( false );
				// Blur anything focused if the next tab panel doesn't have anything focusable.
				// This is not needed if the next tab panel has something focusable (because once
				// it is focused this blur happens automatically). If the layout is non-continuous,
				// this check is meaningless because the next tab panel is not visible yet and thus
				// can't hold focus.
				if (
					this.autoFocus &&
					!OO.ui.isMobile() &&
					this.stackLayout.continuous &&
					OO.ui.findFocusable( tabPanel.$element ).length !== 0
				) {
					$focused = previousTabPanel.$element.find( ':focus' );
					if ( $focused.length ) {
						$focused[ 0 ].blur();
					}
				}
			}
			this.currentTabPanelName = name;
			tabPanel.setActive( true );
			this.stackLayout.setItem( tabPanel );
			if ( !this.stackLayout.continuous && previousTabPanel ) {
				// This should not be necessary, since any inputs on the previous tab panel should
				// have been blurred when it was hidden, but browsers are not very consistent about
				// this.
				$focused = previousTabPanel.$element.find( ':focus' );
				if ( $focused.length ) {
					$focused[ 0 ].blur();
				}
			}
			this.emit( 'set', tabPanel );
		}
	}
};

/**
 * Select the first selectable tab panel.
 *
 * @chainable
 * @return {OO.ui.BookletLayout} The layout, for chaining
 */
OO.ui.IndexLayout.prototype.selectFirstSelectableTabPanel = function () {
	if ( !this.tabSelectWidget.findSelectedItem() ) {
		this.tabSelectWidget.selectItem( this.tabSelectWidget.findFirstSelectableItem() );
	}

	return this;
};

/**
 * ToggleWidget implements basic behavior of widgets with an on/off state.
 * Please see OO.ui.ToggleButtonWidget and OO.ui.ToggleSwitchWidget for examples.
 *
 * @abstract
 * @class
 * @extends OO.ui.Widget
 * @mixins OO.ui.mixin.TitledElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {boolean} [value=false] The toggle’s initial on/off state.
 *  By default, the toggle is in the 'off' state.
 */
OO.ui.ToggleWidget = function OoUiToggleWidget( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.ToggleWidget.parent.call( this, config );

	// Mixin constructor
	OO.ui.mixin.TitledElement.call( this, config );

	// Properties
	this.value = null;

	// Initialization
	this.$element.addClass( 'oo-ui-toggleWidget' );
	this.setValue( !!config.value );
};

/* Setup */

OO.inheritClass( OO.ui.ToggleWidget, OO.ui.Widget );
OO.mixinClass( OO.ui.ToggleWidget, OO.ui.mixin.TitledElement );

/* Events */

/**
 * @event change
 *
 * A change event is emitted when the on/off state of the toggle changes.
 *
 * @param {boolean} value Value representing the new state of the toggle
 */

/* Methods */

/**
 * Get the value representing the toggle’s state.
 *
 * @return {boolean} The on/off state of the toggle
 */
OO.ui.ToggleWidget.prototype.getValue = function () {
	return this.value;
};

/**
 * Set the state of the toggle: `true` for 'on', `false` for 'off'.
 *
 * @param {boolean} value The state of the toggle
 * @fires change
 * @chainable
 * @return {OO.ui.Widget} The widget, for chaining
 */
OO.ui.ToggleWidget.prototype.setValue = function ( value ) {
	value = !!value;
	if ( this.value !== value ) {
		this.value = value;
		this.emit( 'change', value );
		this.$element.toggleClass( 'oo-ui-toggleWidget-on', value );
		this.$element.toggleClass( 'oo-ui-toggleWidget-off', !value );
	}
	return this;
};

/**
 * ToggleButtons are buttons that have a state (‘on’ or ‘off’) that is represented by a
 * Boolean value. Like other {@link OO.ui.ButtonWidget buttons}, toggle buttons can be
 * configured with {@link OO.ui.mixin.IconElement icons},
 * {@link OO.ui.mixin.IndicatorElement indicators},
 * {@link OO.ui.mixin.TitledElement titles}, {@link OO.ui.mixin.FlaggedElement styling flags},
 * and {@link OO.ui.mixin.LabelElement labels}. Please see
 * the [OOUI documentation][1] on MediaWiki for more information.
 *
 *     @example
 *     // Toggle buttons in the 'off' and 'on' state.
 *     var toggleButton1 = new OO.ui.ToggleButtonWidget( {
 *             label: 'Toggle Button off'
 *         } ),
 *         toggleButton2 = new OO.ui.ToggleButtonWidget( {
 *             label: 'Toggle Button on',
 *             value: true
 *         } );
 *     // Append the buttons to the DOM.
 *     $( document.body ).append( toggleButton1.$element, toggleButton2.$element );
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Widgets/Buttons_and_Switches#Toggle_buttons
 *
 * @class
 * @extends OO.ui.ToggleWidget
 * @mixins OO.ui.mixin.ButtonElement
 * @mixins OO.ui.mixin.IconElement
 * @mixins OO.ui.mixin.IndicatorElement
 * @mixins OO.ui.mixin.LabelElement
 * @mixins OO.ui.mixin.FlaggedElement
 * @mixins OO.ui.mixin.TabIndexedElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {boolean} [value=false] The toggle button’s initial on/off
 *  state. By default, the button is in the 'off' state.
 */
OO.ui.ToggleButtonWidget = function OoUiToggleButtonWidget( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.ToggleButtonWidget.parent.call( this, config );

	// Mixin constructors
	OO.ui.mixin.ButtonElement.call( this, $.extend( {
		active: this.active
	}, config ) );
	OO.ui.mixin.IconElement.call( this, config );
	OO.ui.mixin.IndicatorElement.call( this, config );
	OO.ui.mixin.LabelElement.call( this, config );
	OO.ui.mixin.FlaggedElement.call( this, config );
	OO.ui.mixin.TabIndexedElement.call( this, $.extend( {
		$tabIndexed: this.$button
	}, config ) );

	// Events
	this.connect( this, {
		click: 'onAction'
	} );

	// Initialization
	this.$button.append( this.$icon, this.$label, this.$indicator );
	this.$element
		.addClass( 'oo-ui-toggleButtonWidget' )
		.append( this.$button );
	this.setTitledElement( this.$button );
};

/* Setup */

OO.inheritClass( OO.ui.ToggleButtonWidget, OO.ui.ToggleWidget );
OO.mixinClass( OO.ui.ToggleButtonWidget, OO.ui.mixin.ButtonElement );
OO.mixinClass( OO.ui.ToggleButtonWidget, OO.ui.mixin.IconElement );
OO.mixinClass( OO.ui.ToggleButtonWidget, OO.ui.mixin.IndicatorElement );
OO.mixinClass( OO.ui.ToggleButtonWidget, OO.ui.mixin.LabelElement );
OO.mixinClass( OO.ui.ToggleButtonWidget, OO.ui.mixin.FlaggedElement );
OO.mixinClass( OO.ui.ToggleButtonWidget, OO.ui.mixin.TabIndexedElement );

/* Static Properties */

/**
 * @static
 * @inheritdoc
 */
OO.ui.ToggleButtonWidget.static.tagName = 'span';

/* Methods */

/**
 * Handle the button action being triggered.
 *
 * @private
 */
OO.ui.ToggleButtonWidget.prototype.onAction = function () {
	this.setValue( !this.value );
};

/**
 * @inheritdoc
 */
OO.ui.ToggleButtonWidget.prototype.setValue = function ( value ) {
	value = !!value;
	if ( value !== this.value ) {
		// Might be called from parent constructor before ButtonElement constructor
		if ( this.$button ) {
			this.$button.attr( 'aria-pressed', value.toString() );
		}
		this.setActive( value );
	}

	// Parent method
	OO.ui.ToggleButtonWidget.parent.prototype.setValue.call( this, value );

	return this;
};

/**
 * @inheritdoc
 */
OO.ui.ToggleButtonWidget.prototype.setButtonElement = function ( $button ) {
	if ( this.$button ) {
		this.$button.removeAttr( 'aria-pressed' );
	}
	OO.ui.mixin.ButtonElement.prototype.setButtonElement.call( this, $button );
	this.$button.attr( 'aria-pressed', this.value.toString() );
};

/**
 * ToggleSwitches are switches that slide on and off. Their state is represented by a Boolean
 * value (`true` for ‘on’, and `false` otherwise, the default). The ‘off’ state is represented
 * visually by a slider in the leftmost position.
 *
 *     @example
 *     // Toggle switches in the 'off' and 'on' position.
 *     var toggleSwitch1 = new OO.ui.ToggleSwitchWidget(),
 *         toggleSwitch2 = new OO.ui.ToggleSwitchWidget( {
 *             value: true
 *         } );
 *         // Create a FieldsetLayout to layout and label switches.
 *         fieldset = new OO.ui.FieldsetLayout( {
 *             label: 'Toggle switches'
 *         } );
 *     fieldset.addItems( [
 *         new OO.ui.FieldLayout( toggleSwitch1, {
 *             label: 'Off',
 *             align: 'top'
 *         } ),
 *         new OO.ui.FieldLayout( toggleSwitch2, {
 *             label: 'On',
 *             align: 'top'
 *         } )
 *     ] );
 *     $( document.body ).append( fieldset.$element );
 *
 * @class
 * @extends OO.ui.ToggleWidget
 * @mixins OO.ui.mixin.TabIndexedElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {boolean} [value=false] The toggle switch’s initial on/off state.
 *  By default, the toggle switch is in the 'off' position.
 */
OO.ui.ToggleSwitchWidget = function OoUiToggleSwitchWidget( config ) {
	// Parent constructor
	OO.ui.ToggleSwitchWidget.parent.call( this, config );

	// Mixin constructors
	OO.ui.mixin.TabIndexedElement.call( this, config );

	// Properties
	this.dragging = false;
	this.dragStart = null;
	this.sliding = false;
	this.$glow = $( '<span>' );
	this.$grip = $( '<span>' );

	// Events
	this.$element.on( {
		click: this.onClick.bind( this ),
		keypress: this.onKeyPress.bind( this )
	} );

	// Initialization
	this.$glow.addClass( 'oo-ui-toggleSwitchWidget-glow' );
	this.$grip.addClass( 'oo-ui-toggleSwitchWidget-grip' );
	this.$element
		.addClass( 'oo-ui-toggleSwitchWidget' )
		.attr( 'role', 'checkbox' )
		.append( this.$glow, this.$grip );
};

/* Setup */

OO.inheritClass( OO.ui.ToggleSwitchWidget, OO.ui.ToggleWidget );
OO.mixinClass( OO.ui.ToggleSwitchWidget, OO.ui.mixin.TabIndexedElement );

/* Methods */

/**
 * Handle mouse click events.
 *
 * @private
 * @param {jQuery.Event} e Mouse click event
 * @return {undefined|boolean} False to prevent default if event is handled
 */
OO.ui.ToggleSwitchWidget.prototype.onClick = function ( e ) {
	if ( !this.isDisabled() && e.which === OO.ui.MouseButtons.LEFT ) {
		this.setValue( !this.value );
	}
	return false;
};

/**
 * Handle key press events.
 *
 * @private
 * @param {jQuery.Event} e Key press event
 * @return {undefined|boolean} False to prevent default if event is handled
 */
OO.ui.ToggleSwitchWidget.prototype.onKeyPress = function ( e ) {
	if ( !this.isDisabled() && ( e.which === OO.ui.Keys.SPACE || e.which === OO.ui.Keys.ENTER ) ) {
		this.setValue( !this.value );
		return false;
	}
};

/**
 * @inheritdoc
 */
OO.ui.ToggleSwitchWidget.prototype.setValue = function ( value ) {
	OO.ui.ToggleSwitchWidget.parent.prototype.setValue.call( this, value );
	this.$element.attr( 'aria-checked', this.value.toString() );
	return this;
};

/**
 * @inheritdoc
 */
OO.ui.ToggleSwitchWidget.prototype.simulateLabelClick = function () {
	if ( !this.isDisabled() ) {
		this.setValue( !this.value );
	}
	this.focus();
};

/**
 * OutlineControlsWidget is a set of controls for an
 * {@link OO.ui.OutlineSelectWidget outline select widget}.
 * Controls include moving items up and down, removing items, and adding different kinds of items.
 *
 * **Currently, this class is only used by {@link OO.ui.BookletLayout booklet layouts}.**
 *
 * @class
 * @extends OO.ui.Widget
 * @mixins OO.ui.mixin.GroupElement
 *
 * @constructor
 * @param {OO.ui.OutlineSelectWidget} outline Outline to control
 * @param {Object} [config] Configuration options
 * @cfg {Object} [abilities] List of abilties
 * @cfg {boolean} [abilities.move=true] Allow moving movable items
 * @cfg {boolean} [abilities.remove=true] Allow removing removable items
 */
OO.ui.OutlineControlsWidget = function OoUiOutlineControlsWidget( outline, config ) {
	// Allow passing positional parameters inside the config object
	if ( OO.isPlainObject( outline ) && config === undefined ) {
		config = outline;
		outline = config.outline;
	}

	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.OutlineControlsWidget.parent.call( this, config );

	// Mixin constructors
	OO.ui.mixin.GroupElement.call( this, config );

	// Properties
	this.outline = outline;
	this.$movers = $( '<div>' );
	this.upButton = new OO.ui.ButtonWidget( {
		framed: false,
		icon: 'collapse',
		title: OO.ui.msg( 'ooui-outline-control-move-up' )
	} );
	this.downButton = new OO.ui.ButtonWidget( {
		framed: false,
		icon: 'expand',
		title: OO.ui.msg( 'ooui-outline-control-move-down' )
	} );
	this.removeButton = new OO.ui.ButtonWidget( {
		framed: false,
		icon: 'trash',
		title: OO.ui.msg( 'ooui-outline-control-remove' )
	} );
	this.abilities = { move: true, remove: true };

	// Events
	outline.connect( this, {
		select: 'onOutlineChange',
		add: 'onOutlineChange',
		remove: 'onOutlineChange'
	} );
	this.upButton.connect( this, {
		click: [ 'emit', 'move', -1 ]
	} );
	this.downButton.connect( this, {
		click: [ 'emit', 'move', 1 ]
	} );
	this.removeButton.connect( this, {
		click: [ 'emit', 'remove' ]
	} );

	// Initialization
	this.$element.addClass( 'oo-ui-outlineControlsWidget' );
	this.$group.addClass( 'oo-ui-outlineControlsWidget-items' );
	this.$movers
		.addClass( 'oo-ui-outlineControlsWidget-movers' )
		.append( this.removeButton.$element, this.upButton.$element, this.downButton.$element );
	this.$element.append( this.$icon, this.$group, this.$movers );
	this.setAbilities( config.abilities || {} );
};

/* Setup */

OO.inheritClass( OO.ui.OutlineControlsWidget, OO.ui.Widget );
OO.mixinClass( OO.ui.OutlineControlsWidget, OO.ui.mixin.GroupElement );

/* Events */

/**
 * @event move
 * @param {number} places Number of places to move
 */

/**
 * @event remove
 */

/* Methods */

/**
 * Set abilities.
 *
 * @param {Object} abilities List of abilties
 * @param {boolean} [abilities.move] Allow moving movable items
 * @param {boolean} [abilities.remove] Allow removing removable items
 */
OO.ui.OutlineControlsWidget.prototype.setAbilities = function ( abilities ) {
	var ability;

	for ( ability in this.abilities ) {
		if ( abilities[ ability ] !== undefined ) {
			this.abilities[ ability ] = !!abilities[ ability ];
		}
	}

	this.onOutlineChange();
};

/**
 * Handle outline change events.
 *
 * @private
 */
OO.ui.OutlineControlsWidget.prototype.onOutlineChange = function () {
	var i, len, firstMovable, lastMovable,
		items = this.outline.getItems(),
		selectedItem = this.outline.findSelectedItem(),
		movable = this.abilities.move && selectedItem && selectedItem.isMovable(),
		removable = this.abilities.remove && selectedItem && selectedItem.isRemovable();

	if ( movable ) {
		i = -1;
		len = items.length;
		while ( ++i < len ) {
			if ( items[ i ].isMovable() ) {
				firstMovable = items[ i ];
				break;
			}
		}
		i = len;
		while ( i-- ) {
			if ( items[ i ].isMovable() ) {
				lastMovable = items[ i ];
				break;
			}
		}
	}
	this.upButton.setDisabled( !movable || selectedItem === firstMovable );
	this.downButton.setDisabled( !movable || selectedItem === lastMovable );
	this.removeButton.setDisabled( !removable );
};

/**
 * OutlineOptionWidget is an item in an {@link OO.ui.OutlineSelectWidget OutlineSelectWidget}.
 *
 * Currently, this class is only used by {@link OO.ui.BookletLayout booklet layouts}, which contain
 * {@link OO.ui.PageLayout page layouts}. See {@link OO.ui.BookletLayout BookletLayout}
 * for an example.
 *
 * @class
 * @extends OO.ui.DecoratedOptionWidget
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {number} [level] Indentation level
 * @cfg {boolean} [movable] Allow modification from
 *  {@link OO.ui.OutlineControlsWidget outline controls}.
 */
OO.ui.OutlineOptionWidget = function OoUiOutlineOptionWidget( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.OutlineOptionWidget.parent.call( this, config );

	// Properties
	this.level = 0;
	this.movable = !!config.movable;
	this.removable = !!config.removable;

	// Initialization
	this.$element.addClass( 'oo-ui-outlineOptionWidget' );
	this.setLevel( config.level );
};

/* Setup */

OO.inheritClass( OO.ui.OutlineOptionWidget, OO.ui.DecoratedOptionWidget );

/* Static Properties */

/**
 * @static
 * @inheritdoc
 */
OO.ui.OutlineOptionWidget.static.highlightable = true;

/**
 * @static
 * @inheritdoc
 */
OO.ui.OutlineOptionWidget.static.scrollIntoViewOnSelect = true;

/**
 * @static
 * @inheritable
 * @property {string}
 */
OO.ui.OutlineOptionWidget.static.levelClass = 'oo-ui-outlineOptionWidget-level-';

/**
 * @static
 * @inheritable
 * @property {number}
 */
OO.ui.OutlineOptionWidget.static.levels = 3;

/* Methods */

/**
 * Check if item is movable.
 *
 * Movability is used by {@link OO.ui.OutlineControlsWidget outline controls}.
 *
 * @return {boolean} Item is movable
 */
OO.ui.OutlineOptionWidget.prototype.isMovable = function () {
	return this.movable;
};

/**
 * Check if item is removable.
 *
 * Removability is used by {@link OO.ui.OutlineControlsWidget outline controls}.
 *
 * @return {boolean} Item is removable
 */
OO.ui.OutlineOptionWidget.prototype.isRemovable = function () {
	return this.removable;
};

/**
 * Get indentation level.
 *
 * @return {number} Indentation level
 */
OO.ui.OutlineOptionWidget.prototype.getLevel = function () {
	return this.level;
};

/**
 * @inheritdoc
 */
OO.ui.OutlineOptionWidget.prototype.setPressed = function ( state ) {
	OO.ui.OutlineOptionWidget.parent.prototype.setPressed.call( this, state );
	return this;
};

/**
 * Set movability.
 *
 * Movability is used by {@link OO.ui.OutlineControlsWidget outline controls}.
 *
 * @param {boolean} movable Item is movable
 * @chainable
 * @return {OO.ui.Widget} The widget, for chaining
 */
OO.ui.OutlineOptionWidget.prototype.setMovable = function ( movable ) {
	this.movable = !!movable;
	this.updateThemeClasses();
	return this;
};

/**
 * Set removability.
 *
 * Removability is used by {@link OO.ui.OutlineControlsWidget outline controls}.
 *
 * @param {boolean} removable Item is removable
 * @chainable
 * @return {OO.ui.Widget} The widget, for chaining
 */
OO.ui.OutlineOptionWidget.prototype.setRemovable = function ( removable ) {
	this.removable = !!removable;
	this.updateThemeClasses();
	return this;
};

/**
 * @inheritdoc
 */
OO.ui.OutlineOptionWidget.prototype.setSelected = function ( state ) {
	OO.ui.OutlineOptionWidget.parent.prototype.setSelected.call( this, state );
	return this;
};

/**
 * Set indentation level.
 *
 * @param {number} [level=0] Indentation level, in the range of [0,#maxLevel]
 * @chainable
 * @return {OO.ui.Widget} The widget, for chaining
 */
OO.ui.OutlineOptionWidget.prototype.setLevel = function ( level ) {
	var levels = this.constructor.static.levels,
		levelClass = this.constructor.static.levelClass,
		i = levels;

	this.level = level ? Math.max( 0, Math.min( levels - 1, level ) ) : 0;
	while ( i-- ) {
		if ( this.level === i ) {
			this.$element.addClass( levelClass + i );
		} else {
			this.$element.removeClass( levelClass + i );
		}
	}
	this.updateThemeClasses();

	return this;
};

/**
 * OutlineSelectWidget is a structured list that contains
 * {@link OO.ui.OutlineOptionWidget outline options}
 * A set of controls can be provided with an {@link OO.ui.OutlineControlsWidget outline controls}
 * widget.
 *
 * **Currently, this class is only used by {@link OO.ui.BookletLayout booklet layouts}.**
 *
 * @class
 * @extends OO.ui.SelectWidget
 * @mixins OO.ui.mixin.TabIndexedElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 */
OO.ui.OutlineSelectWidget = function OoUiOutlineSelectWidget( config ) {
	// Parent constructor
	OO.ui.OutlineSelectWidget.parent.call( this, config );

	// Mixin constructors
	OO.ui.mixin.TabIndexedElement.call( this, config );

	// Events
	this.$element.on( {
		focus: this.bindDocumentKeyDownListener.bind( this ),
		blur: this.unbindDocumentKeyDownListener.bind( this )
	} );

	// Initialization
	this.$element.addClass( 'oo-ui-outlineSelectWidget' );
};

/* Setup */

OO.inheritClass( OO.ui.OutlineSelectWidget, OO.ui.SelectWidget );
OO.mixinClass( OO.ui.OutlineSelectWidget, OO.ui.mixin.TabIndexedElement );

/**
 * ButtonOptionWidget is a special type of {@link OO.ui.mixin.ButtonElement button element} that
 * can be selected and configured with data. The class is
 * used with OO.ui.ButtonSelectWidget to create a selection of button options. Please see the
 * [OOUI documentation on MediaWiki] [1] for more information.
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Widgets/Selects_and_Options#Button_selects_and_options
 *
 * @class
 * @extends OO.ui.OptionWidget
 * @mixins OO.ui.mixin.ButtonElement
 * @mixins OO.ui.mixin.IconElement
 * @mixins OO.ui.mixin.IndicatorElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 */
OO.ui.ButtonOptionWidget = function OoUiButtonOptionWidget( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.ButtonOptionWidget.parent.call( this, config );

	// Mixin constructors
	OO.ui.mixin.ButtonElement.call( this, config );
	OO.ui.mixin.IconElement.call( this, config );
	OO.ui.mixin.IndicatorElement.call( this, config );

	// Initialization
	this.$element.addClass( 'oo-ui-buttonOptionWidget' );
	this.$button.append( this.$icon, this.$label, this.$indicator );
	this.$element.append( this.$button );
	this.setTitledElement( this.$button );
};

/* Setup */

OO.inheritClass( OO.ui.ButtonOptionWidget, OO.ui.OptionWidget );
OO.mixinClass( OO.ui.ButtonOptionWidget, OO.ui.mixin.ButtonElement );
OO.mixinClass( OO.ui.ButtonOptionWidget, OO.ui.mixin.IconElement );
OO.mixinClass( OO.ui.ButtonOptionWidget, OO.ui.mixin.IndicatorElement );

/* Static Properties */

/**
 * Allow button mouse down events to pass through so they can be handled by the parent select widget
 *
 * @static
 * @inheritdoc
 */
OO.ui.ButtonOptionWidget.static.cancelButtonMouseDownEvents = false;

/**
 * @static
 * @inheritdoc
 */
OO.ui.ButtonOptionWidget.static.highlightable = false;

/* Methods */

/**
 * @inheritdoc
 */
OO.ui.ButtonOptionWidget.prototype.setSelected = function ( state ) {
	OO.ui.ButtonOptionWidget.parent.prototype.setSelected.call( this, state );

	if ( this.constructor.static.selectable ) {
		this.setActive( state );
	}

	return this;
};

/**
 * ButtonSelectWidget is a {@link OO.ui.SelectWidget select widget} that contains
 * button options and is used together with
 * OO.ui.ButtonOptionWidget. The ButtonSelectWidget provides an interface for
 * highlighting, choosing, and selecting mutually exclusive options. Please see
 * the [OOUI documentation on MediaWiki] [1] for more information.
 *
 *     @example
 *     // A ButtonSelectWidget that contains three ButtonOptionWidgets.
 *     var option1 = new OO.ui.ButtonOptionWidget( {
 *             data: 1,
 *             label: 'Option 1',
 *             title: 'Button option 1'
 *         } ),
 *         option2 = new OO.ui.ButtonOptionWidget( {
 *             data: 2,
 *             label: 'Option 2',
 *             title: 'Button option 2'
 *         } ),
 *         option3 = new OO.ui.ButtonOptionWidget( {
 *             data: 3,
 *             label: 'Option 3',
 *             title: 'Button option 3'
 *         } ),
 *         buttonSelect = new OO.ui.ButtonSelectWidget( {
 *             items: [ option1, option2, option3 ]
 *         } );
 *     $( document.body ).append( buttonSelect.$element );
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
OO.ui.ButtonSelectWidget = function OoUiButtonSelectWidget( config ) {
	// Parent constructor
	OO.ui.ButtonSelectWidget.parent.call( this, config );

	// Mixin constructors
	OO.ui.mixin.TabIndexedElement.call( this, config );

	// Events
	this.$element.on( {
		focus: this.bindDocumentKeyDownListener.bind( this ),
		blur: this.unbindDocumentKeyDownListener.bind( this )
	} );

	// Initialization
	this.$element.addClass( 'oo-ui-buttonSelectWidget' );
};

/* Setup */

OO.inheritClass( OO.ui.ButtonSelectWidget, OO.ui.SelectWidget );
OO.mixinClass( OO.ui.ButtonSelectWidget, OO.ui.mixin.TabIndexedElement );

/**
 * TabOptionWidget is an item in a {@link OO.ui.TabSelectWidget TabSelectWidget}.
 *
 * Currently, this class is only used by {@link OO.ui.IndexLayout index layouts}, which contain
 * {@link OO.ui.TabPanelLayout tab panel layouts}. See {@link OO.ui.IndexLayout IndexLayout}
 * for an example.
 *
 * @class
 * @extends OO.ui.OptionWidget
 *
 * @constructor
 * @param {Object} [config] Configuration options
 */
OO.ui.TabOptionWidget = function OoUiTabOptionWidget( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.TabOptionWidget.parent.call( this, config );

	// Initialization
	this.$element
		.addClass( 'oo-ui-tabOptionWidget' )
		.attr( 'role', 'tab' );
};

/* Setup */

OO.inheritClass( OO.ui.TabOptionWidget, OO.ui.OptionWidget );

/* Static Properties */

/**
 * @static
 * @inheritdoc
 */
OO.ui.TabOptionWidget.static.highlightable = false;

/**
 * TabSelectWidget is a list that contains {@link OO.ui.TabOptionWidget tab options}
 *
 * **Currently, this class is only used by {@link OO.ui.IndexLayout index layouts}.**
 *
 * @class
 * @extends OO.ui.SelectWidget
 * @mixins OO.ui.mixin.TabIndexedElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {boolean} [framed=true] Use framed tabs
 */
OO.ui.TabSelectWidget = function OoUiTabSelectWidget( config ) {
	// Parent constructor
	OO.ui.TabSelectWidget.parent.call( this, config );

	// Mixin constructors
	OO.ui.mixin.TabIndexedElement.call( this, config );

	// Events
	this.$element.on( {
		focus: this.bindDocumentKeyDownListener.bind( this ),
		blur: this.unbindDocumentKeyDownListener.bind( this )
	} );

	// Initialization
	this.$element
		.addClass( 'oo-ui-tabSelectWidget' )
		.attr( 'role', 'tablist' );

	this.toggleFramed( config.framed === undefined || config.framed );

	if ( OO.ui.isMobile() ) {
		this.$element.addClass( 'oo-ui-tabSelectWidget-mobile' );
	}
};

/* Setup */

OO.inheritClass( OO.ui.TabSelectWidget, OO.ui.SelectWidget );
OO.mixinClass( OO.ui.TabSelectWidget, OO.ui.mixin.TabIndexedElement );

/* Methods */

/**
 * Check if tabs are framed.
 *
 * @return {boolean} Tabs are framed
 */
OO.ui.TabSelectWidget.prototype.isFramed = function () {
	return this.framed;
};

/**
 * Render the tabs with or without frames.
 *
 * @param {boolean} [framed] Make tabs framed, omit to toggle
 * @chainable
 * @return {OO.ui.Element} The element, for chaining
 */
OO.ui.TabSelectWidget.prototype.toggleFramed = function ( framed ) {
	framed = framed === undefined ? !this.framed : !!framed;
	if ( framed !== this.framed ) {
		this.framed = framed;
		this.$element
			.toggleClass( 'oo-ui-tabSelectWidget-frameless', !framed )
			.toggleClass( 'oo-ui-tabSelectWidget-framed', framed );
	}

	return this;
};

/**
 * TagItemWidgets are used within a {@link OO.ui.TagMultiselectWidget
 * TagMultiselectWidget} to display the selected items.
 *
 * @class
 * @extends OO.ui.Widget
 * @mixins OO.ui.mixin.ItemWidget
 * @mixins OO.ui.mixin.LabelElement
 * @mixins OO.ui.mixin.FlaggedElement
 * @mixins OO.ui.mixin.TabIndexedElement
 * @mixins OO.ui.mixin.DraggableElement
 *
 * @constructor
 * @param {Object} [config] Configuration object
 * @cfg {boolean} [valid=true] Item is valid
 * @cfg {boolean} [fixed] Item is fixed. This means the item is
 *  always included in the values and cannot be removed.
 */
OO.ui.TagItemWidget = function OoUiTagItemWidget( config ) {
	config = config || {};

	// Parent constructor
	OO.ui.TagItemWidget.parent.call( this, config );

	// Mixin constructors
	OO.ui.mixin.ItemWidget.call( this );
	OO.ui.mixin.LabelElement.call( this, config );
	OO.ui.mixin.FlaggedElement.call( this, config );
	OO.ui.mixin.TabIndexedElement.call( this, config );
	OO.ui.mixin.DraggableElement.call( this, config );

	this.valid = config.valid === undefined ? true : !!config.valid;
	this.fixed = !!config.fixed;

	this.closeButton = new OO.ui.ButtonWidget( {
		framed: false,
		icon: 'close',
		tabIndex: -1,
		title: OO.ui.msg( 'ooui-item-remove' )
	} );
	this.closeButton.setDisabled( this.isDisabled() );

	// Events
	this.closeButton.connect( this, {
		click: 'remove'
	} );
	this.$element
		.on( 'click', this.select.bind( this ) )
		.on( 'keydown', this.onKeyDown.bind( this ) )
		// Prevent propagation of mousedown; the tag item "lives" in the
		// clickable area of the TagMultiselectWidget, which listens to
		// mousedown to open the menu or popup. We want to prevent that
		// for clicks specifically on the tag itself, so the actions taken
		// are more deliberate. When the tag is clicked, it will emit the
		// selection event (similar to how #OO.ui.MultioptionWidget emits 'change')
		// and can be handled separately.
		.on( 'mousedown', function ( e ) { e.stopPropagation(); } );

	// Initialization
	this.$element
		.addClass( 'oo-ui-tagItemWidget' )
		.append( this.$label, this.closeButton.$element );
};

/* Initialization */

OO.inheritClass( OO.ui.TagItemWidget, OO.ui.Widget );
OO.mixinClass( OO.ui.TagItemWidget, OO.ui.mixin.ItemWidget );
OO.mixinClass( OO.ui.TagItemWidget, OO.ui.mixin.LabelElement );
OO.mixinClass( OO.ui.TagItemWidget, OO.ui.mixin.FlaggedElement );
OO.mixinClass( OO.ui.TagItemWidget, OO.ui.mixin.TabIndexedElement );
OO.mixinClass( OO.ui.TagItemWidget, OO.ui.mixin.DraggableElement );

/* Events */

/**
 * @event remove
 *
 * A remove action was performed on the item
 */

/**
 * @event navigate
 * @param {string} direction Direction of the movement, forward or backwards
 *
 * A navigate action was performed on the item
 */

/**
 * @event select
 *
 * The tag widget was selected. This can occur when the widget
 * is either clicked or enter was pressed on it.
 */

/**
 * @event valid
 * @param {boolean} isValid Item is valid
 *
 * Item validity has changed
 */

/**
 * @event fixed
 * @param {boolean} isFixed Item is fixed
 *
 * Item fixed state has changed
 */

/* Methods */

/**
 * Set this item as fixed, meaning it cannot be removed
 *
 * @param {string} [state] Item is fixed
 * @fires fixed
 * @return {OO.ui.Widget} The widget, for chaining
 */
OO.ui.TagItemWidget.prototype.setFixed = function ( state ) {
	state = state === undefined ? !this.fixed : !!state;

	if ( this.fixed !== state ) {
		this.fixed = state;
		if ( this.closeButton ) {
			this.closeButton.toggle( !this.fixed );
		}

		if ( !this.fixed && this.elementGroup && !this.elementGroup.isDraggable() ) {
			// Only enable the state of the item if the
			// entire group is draggable
			this.toggleDraggable( !this.fixed );
		}
		this.$element.toggleClass( 'oo-ui-tagItemWidget-fixed', this.fixed );

		this.emit( 'fixed', this.isFixed() );
	}
	return this;
};

/**
 * Check whether the item is fixed
 * @return {boolean}
 */
OO.ui.TagItemWidget.prototype.isFixed = function () {
	return this.fixed;
};

/**
 * @inheritdoc
 */
OO.ui.TagItemWidget.prototype.setDisabled = function ( state ) {
	if ( state && this.elementGroup && !this.elementGroup.isDisabled() ) {
		OO.ui.warnDeprecation( 'TagItemWidget#setDisabled: Disabling individual items is deprecated and will result in inconsistent behavior. Use #setFixed instead. See T193571.' );
	}
	// Parent method
	OO.ui.TagItemWidget.parent.prototype.setDisabled.call( this, state );
	if (
		!state &&
		// Verify we have a group, and that the widget is ready
		this.toggleDraggable && this.elementGroup &&
		!this.isFixed() &&
		!this.elementGroup.isDraggable()
	) {
		// Only enable the draggable state of the item if the
		// entire group is draggable to begin with, and if the
		// item is not fixed
		this.toggleDraggable( !state );
	}

	if ( this.closeButton ) {
		this.closeButton.setDisabled( state );
	}

	return this;
};

/**
 * Handle removal of the item
 *
 * This is mainly for extensibility concerns, so other children
 * of this class can change the behavior if they need to. This
 * is called by both clicking the 'remove' button but also
 * on keypress, which is harder to override if needed.
 *
 * @fires remove
 */
OO.ui.TagItemWidget.prototype.remove = function () {
	if ( !this.isDisabled() && !this.isFixed() ) {
		this.emit( 'remove' );
	}
};

/**
 * Handle a keydown event on the widget
 *
 * @fires navigate
 * @fires remove
 * @param {jQuery.Event} e Key down event
 * @return {boolean|undefined} false to stop the operation
 */
OO.ui.TagItemWidget.prototype.onKeyDown = function ( e ) {
	var movement;

	if (
		!this.isDisabled() &&
		!this.isFixed() &&
		( e.keyCode === OO.ui.Keys.BACKSPACE || e.keyCode === OO.ui.Keys.DELETE )
	) {
		this.remove();
		return false;
	} else if ( e.keyCode === OO.ui.Keys.ENTER ) {
		this.select();
		return false;
	} else if (
		e.keyCode === OO.ui.Keys.LEFT ||
		e.keyCode === OO.ui.Keys.RIGHT
	) {
		if ( OO.ui.Element.static.getDir( this.$element ) === 'rtl' ) {
			movement = {
				left: 'forwards',
				right: 'backwards'
			};
		} else {
			movement = {
				left: 'backwards',
				right: 'forwards'
			};
		}

		this.emit(
			'navigate',
			e.keyCode === OO.ui.Keys.LEFT ?
				movement.left : movement.right
		);
		return false;
	}
};

/**
 * Select this item
 *
 * @fires select
 */
OO.ui.TagItemWidget.prototype.select = function () {
	if ( !this.isDisabled() ) {
		this.emit( 'select' );
	}
};

/**
 * Set the valid state of this item
 *
 * @param {boolean} [valid] Item is valid
 * @fires valid
 */
OO.ui.TagItemWidget.prototype.toggleValid = function ( valid ) {
	valid = valid === undefined ? !this.valid : !!valid;

	if ( this.valid !== valid ) {
		this.valid = valid;

		this.setFlags( { invalid: !this.valid } );

		this.emit( 'valid', this.valid );
	}
};

/**
 * Check whether the item is valid
 *
 * @return {boolean} Item is valid
 */
OO.ui.TagItemWidget.prototype.isValid = function () {
	return this.valid;
};

/**
 * A basic tag multiselect widget, similar in concept to
 * {@link OO.ui.ComboBoxInputWidget combo box widget} that allows the user to add multiple values
 * that are displayed in a tag area.
 *
 * This widget is a base widget; see {@link OO.ui.MenuTagMultiselectWidget MenuTagMultiselectWidget}
 * and {@link OO.ui.PopupTagMultiselectWidget PopupTagMultiselectWidget} for the implementations
 * that use a menu and a popup respectively.
 *
 *     @example
 *     // A TagMultiselectWidget.
 *     var widget = new OO.ui.TagMultiselectWidget( {
 *         inputPosition: 'outline',
 *         allowedValues: [ 'Option 1', 'Option 2', 'Option 3' ],
 *         selected: [ 'Option 1' ]
 *     } );
 *     $( document.body ).append( widget.$element );
 *
 * @class
 * @extends OO.ui.Widget
 * @mixins OO.ui.mixin.GroupWidget
 * @mixins OO.ui.mixin.DraggableGroupElement
 * @mixins OO.ui.mixin.IndicatorElement
 * @mixins OO.ui.mixin.IconElement
 * @mixins OO.ui.mixin.TabIndexedElement
 * @mixins OO.ui.mixin.FlaggedElement
 * @mixins OO.ui.mixin.TitledElement
 *
 * @constructor
 * @param {Object} config Configuration object
 * @cfg {Object} [input] Configuration options for the input widget
 * @cfg {OO.ui.InputWidget} [inputWidget] An optional input widget. If given, it will
 *  replace the input widget used in the TagMultiselectWidget. If not given,
 *  TagMultiselectWidget creates its own.
 * @cfg {boolean} [inputPosition='inline'] Position of the input. Options are:
 *  - inline: The input is invisible, but exists inside the tag list, so
 *    the user types into the tag groups to add tags.
 *  - outline: The input is underneath the tag area.
 *  - none: No input supplied
 * @cfg {boolean} [allowEditTags=true] Allow editing of the tags by clicking them
 * @cfg {boolean} [allowArbitrary=false] Allow data items to be added even if
 *  not present in the menu.
 * @cfg {Object[]} [allowedValues] An array representing the allowed items
 *  by their datas.
 * @cfg {boolean} [allowDuplicates=false] Allow duplicate items to be added
 * @cfg {boolean} [allowDisplayInvalidTags=false] Allow the display of
 *  invalid tags. These tags will display with an invalid state, and
 *  the widget as a whole will have an invalid state if any invalid tags
 *  are present.
 * @cfg {number} [tagLimit] An optional limit on the number of selected options.
 *  If 'tagLimit' is set and is reached, the input is disabled, not allowing any
 *  additions. If 'tagLimit' is unset or is 0, an unlimited number of items can be
 *  added.
 * @cfg {boolean} [allowReordering=true] Allow reordering of the items
 * @cfg {Object[]|String[]} [selected] A set of selected tags. If given,
 *  these will appear in the tag list on initialization, as long as they
 *  pass the validity tests.
 */
OO.ui.TagMultiselectWidget = function OoUiTagMultiselectWidget( config ) {
	var inputEvents,
		rAF = window.requestAnimationFrame || setTimeout,
		widget = this,
		$tabFocus = $( '<span>' ).addClass( 'oo-ui-tagMultiselectWidget-focusTrap' );

	config = config || {};

	// Parent constructor
	OO.ui.TagMultiselectWidget.parent.call( this, config );

	// Mixin constructors
	OO.ui.mixin.GroupWidget.call( this, config );
	OO.ui.mixin.IndicatorElement.call( this, config );
	OO.ui.mixin.IconElement.call( this, config );
	OO.ui.mixin.TabIndexedElement.call( this, config );
	OO.ui.mixin.FlaggedElement.call( this, config );
	OO.ui.mixin.DraggableGroupElement.call( this, config );
	OO.ui.mixin.TitledElement.call( this, config );

	this.toggleDraggable(
		config.allowReordering === undefined ?
			true : !!config.allowReordering
	);

	this.inputPosition =
		this.constructor.static.allowedInputPositions.indexOf( config.inputPosition ) > -1 ?
			config.inputPosition : 'inline';
	this.allowEditTags = config.allowEditTags === undefined ? true : !!config.allowEditTags;
	this.allowArbitrary = !!config.allowArbitrary;
	this.allowDuplicates = !!config.allowDuplicates;
	this.allowedValues = config.allowedValues || [];
	this.allowDisplayInvalidTags = config.allowDisplayInvalidTags;
	this.hasInput = this.inputPosition !== 'none';
	this.tagLimit = config.tagLimit;
	this.height = null;
	this.valid = true;

	this.$content = $( '<div>' ).addClass( 'oo-ui-tagMultiselectWidget-content' );
	this.$handle = $( '<div>' )
		.addClass( 'oo-ui-tagMultiselectWidget-handle' )
		.append(
			this.$indicator,
			this.$icon,
			this.$content
				.append(
					this.$group.addClass( 'oo-ui-tagMultiselectWidget-group' )
				)
		);

	// Events
	this.aggregate( {
		remove: 'itemRemove',
		navigate: 'itemNavigate',
		select: 'itemSelect',
		fixed: 'itemFixed'
	} );
	this.connect( this, {
		itemRemove: 'onTagRemove',
		itemSelect: 'onTagSelect',
		itemFixed: 'onTagFixed',
		itemNavigate: 'onTagNavigate',
		change: 'onChangeTags'
	} );
	this.$handle.on( {
		mousedown: this.onMouseDown.bind( this )
	} );

	// Initialize
	this.$element
		.addClass( 'oo-ui-tagMultiselectWidget' )
		.append( this.$handle );

	if ( this.hasInput ) {
		if ( config.inputWidget ) {
			this.input = config.inputWidget;
		} else {
			this.input = new OO.ui.TextInputWidget( $.extend( {
				placeholder: config.placeholder,
				classes: [ 'oo-ui-tagMultiselectWidget-input' ]
			}, config.input ) );
		}
		this.input.setDisabled( this.isDisabled() );

		inputEvents = {
			focus: this.onInputFocus.bind( this ),
			blur: this.onInputBlur.bind( this ),
			'propertychange change click mouseup keydown keyup input cut paste select focus':
				OO.ui.debounce( this.updateInputSize.bind( this ) ),
			keydown: this.onInputKeyDown.bind( this ),
			keypress: this.onInputKeyPress.bind( this )
		};

		this.input.$input.on( inputEvents );
		this.inputPlaceholder = this.input.$input.attr( 'placeholder' );

		if ( this.inputPosition === 'outline' ) {
			// Override max-height for the input widget
			// in the case the widget is outline so it can
			// stretch all the way if the widget is wide
			this.input.$element.css( 'max-width', 'inherit' );
			this.$element
				.addClass( 'oo-ui-tagMultiselectWidget-outlined' )
				.append( this.input.$element );
		} else {
			this.$element.addClass( 'oo-ui-tagMultiselectWidget-inlined' );
			// HACK: When the widget is using 'inline' input, the
			// behavior needs to only use the $input itself
			// so we style and size it accordingly (otherwise
			// the styling and sizing can get very convoluted
			// when the wrapping divs and other elements)
			// We are taking advantage of still being able to
			// call the widget itself for operations like
			// .getValue() and setDisabled() and .focus() but
			// having only the $input attached to the DOM
			this.$content.append( this.input.$input );
		}
	} else {
		this.$content.append( $tabFocus );
	}

	this.setTabIndexedElement(
		this.hasInput ?
			this.input.$input :
			$tabFocus
	);

	if ( config.selected ) {
		this.setValue( config.selected );
	}

	// HACK: Input size needs to be calculated after everything
	// else is rendered
	rAF( function () {
		if ( widget.hasInput ) {
			widget.updateInputSize();
		}
	} );
};

/* Initialization */

OO.inheritClass( OO.ui.TagMultiselectWidget, OO.ui.Widget );
OO.mixinClass( OO.ui.TagMultiselectWidget, OO.ui.mixin.GroupWidget );
OO.mixinClass( OO.ui.TagMultiselectWidget, OO.ui.mixin.DraggableGroupElement );
OO.mixinClass( OO.ui.TagMultiselectWidget, OO.ui.mixin.IndicatorElement );
OO.mixinClass( OO.ui.TagMultiselectWidget, OO.ui.mixin.IconElement );
OO.mixinClass( OO.ui.TagMultiselectWidget, OO.ui.mixin.TabIndexedElement );
OO.mixinClass( OO.ui.TagMultiselectWidget, OO.ui.mixin.FlaggedElement );
OO.mixinClass( OO.ui.TagMultiselectWidget, OO.ui.mixin.TitledElement );

/* Static properties */

/**
 * Allowed input positions.
 * - inline: The input is inside the tag list
 * - outline: The input is under the tag list
 * - none: There is no input
 *
 * @property {Array}
 */
OO.ui.TagMultiselectWidget.static.allowedInputPositions = [ 'inline', 'outline', 'none' ];

/* Methods */

/**
 * Handle mouse down events.
 *
 * @private
 * @param {jQuery.Event} e Mouse down event
 * @return {boolean} False to prevent defaults
 */
OO.ui.TagMultiselectWidget.prototype.onMouseDown = function ( e ) {
	if (
		!this.isDisabled() &&
		( !this.hasInput || e.target !== this.input.$input[ 0 ] ) &&
		e.which === OO.ui.MouseButtons.LEFT
	) {
		this.focus();
		return false;
	}
};

/**
 * Handle key press events.
 *
 * @private
 * @param {jQuery.Event} e Key press event
 * @return {boolean} Whether to prevent defaults
 */
OO.ui.TagMultiselectWidget.prototype.onInputKeyPress = function ( e ) {
	var stopOrContinue,
		withMetaKey = e.metaKey || e.ctrlKey;

	if ( !this.isDisabled() ) {
		if ( e.which === OO.ui.Keys.ENTER ) {
			stopOrContinue = this.doInputEnter( e, withMetaKey );
		}

		// Make sure the input gets resized.
		setTimeout( this.updateInputSize.bind( this ), 0 );
		return stopOrContinue;
	}
};

/**
 * Handle key down events.
 *
 * @private
 * @param {jQuery.Event} e Key down event
 * @return {boolean}
 */
OO.ui.TagMultiselectWidget.prototype.onInputKeyDown = function ( e ) {
	var movement, direction,
		widget = this,
		withMetaKey = e.metaKey || e.ctrlKey,
		isMovementInsideInput = function ( direction ) {
			var inputRange = widget.input.getRange(),
				inputValue = widget.hasInput && widget.input.getValue();

			if ( direction === 'forwards' && inputRange.to > inputValue.length - 1 ) {
				return false;
			}

			if ( direction === 'backwards' && inputRange.from <= 0 ) {
				return false;
			}

			return true;
		};

	if ( !this.isDisabled() ) {
		// 'keypress' event is not triggered for Backspace key
		if ( e.keyCode === OO.ui.Keys.BACKSPACE ) {
			return this.doInputBackspace( e, withMetaKey );
		} else if ( e.keyCode === OO.ui.Keys.ESCAPE ) {
			return this.doInputEscape( e );
		} else if (
			e.keyCode === OO.ui.Keys.LEFT ||
			e.keyCode === OO.ui.Keys.RIGHT
		) {
			if ( OO.ui.Element.static.getDir( this.$element ) === 'rtl' ) {
				movement = {
					left: 'forwards',
					right: 'backwards'
				};
			} else {
				movement = {
					left: 'backwards',
					right: 'forwards'
				};
			}
			direction = e.keyCode === OO.ui.Keys.LEFT ?
				movement.left : movement.right;

			if ( !this.hasInput || !isMovementInsideInput( direction ) ) {
				return this.doInputArrow( e, direction, withMetaKey );
			}
		}
	}
};

/**
 * Respond to input focus event
 */
OO.ui.TagMultiselectWidget.prototype.onInputFocus = function () {
	this.$element.addClass( 'oo-ui-tagMultiselectWidget-focus' );
	// Reset validity
	this.toggleValid( true );
};

/**
 * Respond to input blur event
 */
OO.ui.TagMultiselectWidget.prototype.onInputBlur = function () {
	this.$element.removeClass( 'oo-ui-tagMultiselectWidget-focus' );

	// Set the widget as invalid if there's text in the input
	this.addTagFromInput();
	this.toggleValid( this.checkValidity() && ( !this.hasInput || !this.input.getValue() ) );
};

/**
 * Perform an action after the Enter key on the input
 *
 * @param {jQuery.Event} e Event data
 * @param {boolean} [withMetaKey] Whether this key was pressed with
 * a meta key like Control
 * @return {boolean} Whether to prevent defaults
 */
OO.ui.TagMultiselectWidget.prototype.doInputEnter = function () {
	this.addTagFromInput();
	return false;
};

/**
 * Perform an action responding to the Enter key on the input
 *
 * @param {jQuery.Event} e Event data
 * @param {boolean} [withMetaKey] Whether this key was pressed with
 * a meta key like Control
 * @return {boolean} Whether to prevent defaults
 */
OO.ui.TagMultiselectWidget.prototype.doInputBackspace = function ( e, withMetaKey ) {
	var items, item;

	if (
		this.inputPosition === 'inline' &&
		this.input.getValue() === '' &&
		!this.isEmpty()
	) {
		// Delete the last item
		items = this.getItems();
		item = items[ items.length - 1 ];

		if ( !item.isDisabled() && !item.isFixed() ) {
			this.removeItems( [ item ] );
			// If Ctrl/Cmd was pressed, delete item entirely.
			// Otherwise put it into the text field for editing.
			if ( !withMetaKey ) {
				this.input.setValue( item.getLabel() );
			}
		}

		return false;
	}
};

/**
 * Perform an action after the Escape key on the input
 *
 * @param {jQuery.Event} e Event data
 */
OO.ui.TagMultiselectWidget.prototype.doInputEscape = function () {
	this.clearInput();
};

/**
 * Perform an action after the Left/Right arrow key on the input, select the previous
 * item from the input.
 * See #getPreviousItem
 *
 * @param {jQuery.Event} e Event data
 * @param {string} direction Direction of the movement; forwards or backwards
 * @param {boolean} [withMetaKey] Whether this key was pressed with
 *  a meta key like Control
 */
OO.ui.TagMultiselectWidget.prototype.doInputArrow = function ( e, direction ) {
	if (
		this.inputPosition === 'inline' &&
		!this.isEmpty() &&
		direction === 'backwards'
	) {
		// Get previous item
		this.getPreviousItem().focus();
	}
};

/**
 * Respond to item select event
 *
 * @param {OO.ui.TagItemWidget} item Selected item
 */
OO.ui.TagMultiselectWidget.prototype.onTagSelect = function ( item ) {
	if ( this.hasInput && this.allowEditTags && !item.isFixed() ) {
		if ( this.input.getValue() ) {
			this.addTagFromInput();
		}
		// 1. Get the label of the tag into the input
		this.input.setValue( item.getLabel() );
		// 2. Remove the tag
		this.removeItems( [ item ] );
		// 3. Focus the input
		this.focus();
	}
};

/**
 * Respond to item fixed state change
 *
 * @param {OO.ui.TagItemWidget} item Selected item
 */
OO.ui.TagMultiselectWidget.prototype.onTagFixed = function ( item ) {
	var i,
		items = this.getItems();

	// Move item to the end of the static items
	for ( i = 0; i < items.length; i++ ) {
		if ( items[ i ] !== item && !items[ i ].isFixed() ) {
			break;
		}
	}
	this.addItems( item, i );
};
/**
 * Respond to change event, where items were added, removed, or cleared.
 */
OO.ui.TagMultiselectWidget.prototype.onChangeTags = function () {
	var isUnderLimit = this.isUnderLimit();

	// Reset validity
	this.toggleValid(
		this.checkValidity() &&
		!( this.hasInput && this.input.getValue() )
	);

	if ( this.hasInput ) {
		this.updateInputSize();
		if ( !isUnderLimit ) {
			// Clear the input
			this.input.setValue( '' );
		}
		if ( this.inputPosition === 'outline' ) {
			// Show/clear the placeholder and enable/disable the input
			// based on whether we are/aren't under the specified limit
			this.input.$input.attr( 'placeholder', isUnderLimit ? this.inputPlaceholder : '' );
			this.input.setDisabled( !isUnderLimit );
		} else {
			// Show/hide the input
			this.input.$input.toggleClass( 'oo-ui-element-hidden', !isUnderLimit );
		}
	}
	this.updateIfHeightChanged();
};

/**
 * @inheritdoc
 */
OO.ui.TagMultiselectWidget.prototype.setDisabled = function ( isDisabled ) {
	// Parent method
	OO.ui.TagMultiselectWidget.parent.prototype.setDisabled.call( this, isDisabled );

	if ( this.hasInput && this.input ) {
		if ( !isDisabled ) {
			this.updateInputSize();
		}
		this.input.setDisabled( !!isDisabled && !this.isUnderLimit() );
	}

	if ( this.items ) {
		this.getItems().forEach( function ( item ) {
			item.setDisabled( !!isDisabled );
		} );
	}
};

/**
 * Respond to tag remove event
 * @param {OO.ui.TagItemWidget} item Removed tag
 */
OO.ui.TagMultiselectWidget.prototype.onTagRemove = function ( item ) {
	this.removeTagByData( item.getData() );
};

/**
 * Respond to navigate event on the tag
 *
 * @param {OO.ui.TagItemWidget} item Removed tag
 * @param {string} direction Direction of movement; 'forwards' or 'backwards'
 */
OO.ui.TagMultiselectWidget.prototype.onTagNavigate = function ( item, direction ) {
	var firstItem = this.getItems()[ 0 ];

	if ( direction === 'forwards' ) {
		this.getNextItem( item ).focus();
	} else if ( !this.inputPosition === 'inline' || item !== firstItem ) {
		// If the widget has an inline input, we want to stop at the starting edge
		// of the tags
		this.getPreviousItem( item ).focus();
	}
};

/**
 * Add tag from input value
 */
OO.ui.TagMultiselectWidget.prototype.addTagFromInput = function () {
	var val = this.input.getValue(),
		isValid = this.isAllowedData( val );

	if ( !val ) {
		return;
	}

	if ( isValid || this.allowDisplayInvalidTags ) {
		this.clearInput();
		this.addTag( val );
	}
};

/**
 * Clear the input
 */
OO.ui.TagMultiselectWidget.prototype.clearInput = function () {
	this.input.setValue( '' );
};

/**
 * Check whether the given value is a duplicate of an existing
 * tag already in the list.
 *
 * @param {string|Object} data Requested value
 * @return {boolean} Value is duplicate
 */
OO.ui.TagMultiselectWidget.prototype.isDuplicateData = function ( data ) {
	return !!this.findItemFromData( data );
};

/**
 * Check whether a given value is allowed to be added
 *
 * @param {string|Object} data Requested value
 * @return {boolean} Value is allowed
 */
OO.ui.TagMultiselectWidget.prototype.isAllowedData = function ( data ) {
	if (
		!this.allowDuplicates &&
		this.isDuplicateData( data )
	) {
		return false;
	}

	if ( this.allowArbitrary ) {
		return true;
	}

	// Check with allowed values
	if (
		this.getAllowedValues().some( function ( value ) {
			return data === value;
		} )
	) {
		return true;
	}

	return false;
};

/**
 * Get the allowed values list
 *
 * @return {string[]} Allowed data values
 */
OO.ui.TagMultiselectWidget.prototype.getAllowedValues = function () {
	return this.allowedValues;
};

/**
 * Add a value to the allowed values list
 *
 * @param {string} value Allowed data value
 */
OO.ui.TagMultiselectWidget.prototype.addAllowedValue = function ( value ) {
	if ( this.allowedValues.indexOf( value ) === -1 ) {
		this.allowedValues.push( value );
	}
};

/**
 * Get the datas of the currently selected items
 *
 * @return {string[]|Object[]} Datas of currently selected items
 */
OO.ui.TagMultiselectWidget.prototype.getValue = function () {
	return this.getItems()
		.filter( function ( item ) {
			return item.isValid();
		} )
		.map( function ( item ) {
			return item.getData();
		} );
};

/**
 * Set the value of this widget by datas.
 *
 * @param {string|string[]|Object|Object[]} valueObject An object representing the data
 *  and label of the value. If the widget allows arbitrary values,
 *  the items will be added as-is. Otherwise, the data value will
 *  be checked against allowedValues.
 *  This object must contain at least a data key. Example:
 *  { data: 'foo', label: 'Foo item' }
 *  For multiple items, use an array of objects. For example:
 *  [
 *     { data: 'foo', label: 'Foo item' },
 *     { data: 'bar', label: 'Bar item' }
 *  ]
 *  Value can also be added with plaintext array, for example:
 *  [ 'foo', 'bar', 'bla' ] or a single string, like 'foo'
 */
OO.ui.TagMultiselectWidget.prototype.setValue = function ( valueObject ) {
	valueObject = Array.isArray( valueObject ) ? valueObject : [ valueObject ];

	this.clearItems();
	valueObject.forEach( function ( obj ) {
		if ( typeof obj === 'string' ) {
			this.addTag( obj );
		} else {
			this.addTag( obj.data, obj.label );
		}
	}.bind( this ) );
};

/**
 * Add tag to the display area
 *
 * @param {string|Object} data Tag data
 * @param {string} [label] Tag label. If no label is provided, the
 *  stringified version of the data will be used instead.
 * @return {boolean} Item was added successfully
 */
OO.ui.TagMultiselectWidget.prototype.addTag = function ( data, label ) {
	var newItemWidget,
		isValid = this.isAllowedData( data );

	if ( this.isUnderLimit() && ( isValid || this.allowDisplayInvalidTags ) ) {
		newItemWidget = this.createTagItemWidget( data, label );
		newItemWidget.toggleValid( isValid );
		this.addItems( [ newItemWidget ] );
		return true;
	}

	return false;
};

/**
 * Check whether the number of current tags is within the limit.
 *
 * @return {boolean} True if current tag count is within the limit or
 *  if 'tagLimit' is not set
 */
OO.ui.TagMultiselectWidget.prototype.isUnderLimit = function () {
	return !this.tagLimit ||
		this.getItemCount() < this.tagLimit;
};

/**
 * Remove tag by its data property.
 *
 * @param {string|Object} data Tag data
 */
OO.ui.TagMultiselectWidget.prototype.removeTagByData = function ( data ) {
	var item = this.findItemFromData( data );

	this.removeItems( [ item ] );
};

/**
 * Construct a OO.ui.TagItemWidget (or a subclass thereof) from given label and data.
 *
 * @protected
 * @param {string} data Item data
 * @param {string} label The label text.
 * @return {OO.ui.TagItemWidget}
 */
OO.ui.TagMultiselectWidget.prototype.createTagItemWidget = function ( data, label ) {
	label = label || data;

	return new OO.ui.TagItemWidget( { data: data, label: label } );
};

/**
 * Given an item, returns the item after it. If the item is already the
 * last item, return `this.input`. If no item is passed, returns the
 * very first item.
 *
 * @protected
 * @param {OO.ui.TagItemWidget} [item] Tag item
 * @return {OO.ui.Widget} The next widget available.
 */
OO.ui.TagMultiselectWidget.prototype.getNextItem = function ( item ) {
	var itemIndex = this.items.indexOf( item );

	if ( item === undefined || itemIndex === -1 ) {
		return this.items[ 0 ];
	}

	if ( itemIndex === this.items.length - 1 ) { // Last item
		if ( this.hasInput ) {
			return this.input;
		} else {
			// Return first item
			return this.items[ 0 ];
		}
	} else {
		return this.items[ itemIndex + 1 ];
	}
};

/**
 * Given an item, returns the item before it. If the item is already the
 * first item, return `this.input`. If no item is passed, returns the
 * very last item.
 *
 * @protected
 * @param {OO.ui.TagItemWidget} [item] Tag item
 * @return {OO.ui.Widget} The previous widget available.
 */
OO.ui.TagMultiselectWidget.prototype.getPreviousItem = function ( item ) {
	var itemIndex = this.items.indexOf( item );

	if ( item === undefined || itemIndex === -1 ) {
		return this.items[ this.items.length - 1 ];
	}

	if ( itemIndex === 0 ) {
		if ( this.hasInput ) {
			return this.input;
		} else {
			// Return the last item
			return this.items[ this.items.length - 1 ];
		}
	} else {
		return this.items[ itemIndex - 1 ];
	}
};

/**
 * Update the dimensions of the text input field to encompass all available area.
 * This is especially relevant for when the input is at the edge of a line
 * and should get smaller. The usual operation (as an inline-block with min-width)
 * does not work in that case, pushing the input downwards to the next line.
 *
 * @private
 */
OO.ui.TagMultiselectWidget.prototype.updateInputSize = function () {
	var $lastItem, direction, contentWidth, currentWidth, bestWidth;
	if ( this.inputPosition === 'inline' && !this.isDisabled() ) {
		if ( this.input.$input[ 0 ].scrollWidth === 0 ) {
			// Input appears to be attached but not visible.
			// Don't attempt to adjust its size, because our measurements
			// are going to fail anyway.
			return;
		}
		this.input.$input.css( 'width', '1em' );
		$lastItem = this.$group.children().last();
		direction = OO.ui.Element.static.getDir( this.$handle );

		// Get the width of the input with the placeholder text as
		// the value and save it so that we don't keep recalculating
		if (
			this.contentWidthWithPlaceholder === undefined &&
			this.input.getValue() === '' &&
			this.input.$input.attr( 'placeholder' ) !== undefined
		) {
			this.input.setValue( this.input.$input.attr( 'placeholder' ) );
			this.contentWidthWithPlaceholder = this.input.$input[ 0 ].scrollWidth;
			this.input.setValue( '' );

		}

		// Always keep the input wide enough for the placeholder text
		contentWidth = Math.max(
			this.input.$input[ 0 ].scrollWidth,
			// undefined arguments in Math.max lead to NaN
			( this.contentWidthWithPlaceholder === undefined ) ?
				0 : this.contentWidthWithPlaceholder
		);
		currentWidth = this.input.$input.width();

		if ( contentWidth < currentWidth ) {
			this.updateIfHeightChanged();
			// All is fine, don't perform expensive calculations
			return;
		}

		if ( $lastItem.length === 0 ) {
			bestWidth = this.$content.innerWidth();
		} else {
			bestWidth = direction === 'ltr' ?
				this.$content.innerWidth() - $lastItem.position().left - $lastItem.outerWidth() :
				$lastItem.position().left;
		}

		// Some safety margin for sanity, because I *really* don't feel like finding out where the
		// few pixels this is off by are coming from.
		bestWidth -= 13;
		if ( contentWidth > bestWidth ) {
			// This will result in the input getting shifted to the next line
			bestWidth = this.$content.innerWidth() - 13;
		}
		this.input.$input.width( Math.floor( bestWidth ) );
		this.updateIfHeightChanged();
	} else {
		this.updateIfHeightChanged();
	}
};

/**
 * Determine if widget height changed, and if so,
 * emit the resize event. This is useful for when there are either
 * menus or popups attached to the bottom of the widget, to allow
 * them to change their positioning in case the widget moved down
 * or up.
 *
 * @private
 */
OO.ui.TagMultiselectWidget.prototype.updateIfHeightChanged = function () {
	var height = this.$element.height();
	if ( height !== this.height ) {
		this.height = height;
		this.emit( 'resize' );
	}
};

/**
 * Check whether all items in the widget are valid
 *
 * @return {boolean} Widget is valid
 */
OO.ui.TagMultiselectWidget.prototype.checkValidity = function () {
	return this.getItems().every( function ( item ) {
		return item.isValid();
	} );
};

/**
 * Set the valid state of this item
 *
 * @param {boolean} [valid] Item is valid
 * @fires valid
 */
OO.ui.TagMultiselectWidget.prototype.toggleValid = function ( valid ) {
	valid = valid === undefined ? !this.valid : !!valid;

	if ( this.valid !== valid ) {
		this.valid = valid;

		this.setFlags( { invalid: !this.valid } );

		this.emit( 'valid', this.valid );
	}
};

/**
 * Get the current valid state of the widget
 *
 * @return {boolean} Widget is valid
 */
OO.ui.TagMultiselectWidget.prototype.isValid = function () {
	return this.valid;
};

/**
 * PopupTagMultiselectWidget is a {@link OO.ui.TagMultiselectWidget OO.ui.TagMultiselectWidget}
 * intended to use a popup. The popup can be configured to have a default input to insert values
 * into the widget.
 *
 *     @example
 *     // A PopupTagMultiselectWidget.
 *     var widget = new OO.ui.PopupTagMultiselectWidget();
 *     $( document.body ).append( widget.$element );
 *
 *     // Example: A PopupTagMultiselectWidget with an external popup.
 *     var popupInput = new OO.ui.TextInputWidget(),
 *         widget = new OO.ui.PopupTagMultiselectWidget( {
 *            popupInput: popupInput,
 *            popup: {
 *               $content: popupInput.$element
 *            }
 *         } );
 *     $( document.body ).append( widget.$element );
 *
 * @class
 * @extends OO.ui.TagMultiselectWidget
 * @mixins OO.ui.mixin.PopupElement
 *
 * @param {Object} config Configuration object
 * @cfg {jQuery} [$overlay] An overlay for the popup.
 *  See <https://www.mediawiki.org/wiki/OOUI/Concepts#Overlays>.
 * @cfg {Object} [popup] Configuration options for the popup
 * @cfg {OO.ui.InputWidget} [popupInput] An input widget inside the popup that will be
 *  focused when the popup is opened and will be used as replacement for the
 *  general input in the widget.
 * @deprecated
 */
OO.ui.PopupTagMultiselectWidget = function OoUiPopupTagMultiselectWidget( config ) {
	var defaultInput,
		defaultConfig = { popup: {} };

	config = config || {};

	// Parent constructor
	OO.ui.PopupTagMultiselectWidget.parent.call( this, $.extend( {
		inputPosition: 'none'
	}, config ) );

	this.$overlay = ( config.$overlay === true ?
		OO.ui.getDefaultOverlay() : config.$overlay ) || this.$element;

	if ( !config.popup ) {
		// For the default base implementation, we give a popup
		// with an input widget inside it. For any other use cases
		// the popup needs to be populated externally and the
		// event handled to add tags separately and manually
		defaultInput = new OO.ui.TextInputWidget();

		defaultConfig.popupInput = defaultInput;
		defaultConfig.popup.$content = defaultInput.$element;
		defaultConfig.popup.padded = true;

		this.$element.addClass( 'oo-ui-popupTagMultiselectWidget-defaultPopup' );
	}

	// Add overlay, and add that to the autoCloseIgnore
	defaultConfig.popup.$overlay = this.$overlay;
	defaultConfig.popup.$autoCloseIgnore = this.hasInput ?
		this.input.$element.add( this.$overlay ) : this.$overlay;

	// Allow extending any of the above
	config = $.extend( defaultConfig, config );

	// Mixin constructors
	OO.ui.mixin.PopupElement.call( this, config );

	if ( this.hasInput ) {
		this.input.$input.on( 'focus', this.popup.toggle.bind( this.popup, true ) );
	}

	// Configuration options
	this.popupInput = config.popupInput;
	if ( this.popupInput ) {
		this.popupInput.connect( this, {
			enter: 'onPopupInputEnter'
		} );
	}

	// Events
	this.on( 'resize', this.popup.updateDimensions.bind( this.popup ) );
	this.popup.connect( this, {
		toggle: 'onPopupToggle'
	} );
	this.$tabIndexed.on( 'focus', this.onFocus.bind( this ) );

	// Initialize
	this.$element
		.append( this.popup.$element )
		.addClass( 'oo-ui-popupTagMultiselectWidget' );

	// Deprecation warning
	OO.ui.warnDeprecation( 'PopupTagMultiselectWidget: Deprecated widget. Use MenuTagMultiselectWidget instead. See T208821.' );
};

/* Initialization */

OO.inheritClass( OO.ui.PopupTagMultiselectWidget, OO.ui.TagMultiselectWidget );
OO.mixinClass( OO.ui.PopupTagMultiselectWidget, OO.ui.mixin.PopupElement );

/* Methods */

/**
 * Focus event handler.
 *
 * @private
 */
OO.ui.PopupTagMultiselectWidget.prototype.onFocus = function () {
	this.popup.toggle( true );
};

/**
 * Respond to popup toggle event
 *
 * @param {boolean} isVisible Popup is visible
 */
OO.ui.PopupTagMultiselectWidget.prototype.onPopupToggle = function ( isVisible ) {
	if ( isVisible && this.popupInput ) {
		this.popupInput.focus();
	}
};

/**
 * Respond to popup input enter event
 */
OO.ui.PopupTagMultiselectWidget.prototype.onPopupInputEnter = function () {
	if ( this.popupInput ) {
		this.addTagByPopupValue( this.popupInput.getValue() );
		this.popupInput.setValue( '' );
	}
};

/**
 * @inheritdoc
 */
OO.ui.PopupTagMultiselectWidget.prototype.onTagSelect = function ( item ) {
	if ( this.popupInput && this.allowEditTags ) {
		this.popupInput.setValue( item.getData() );
		this.removeItems( [ item ] );

		this.popup.toggle( true );
		this.popupInput.focus();
	} else {
		// Parent
		OO.ui.PopupTagMultiselectWidget.parent.prototype.onTagSelect.call( this, item );
	}
};

/**
 * Add a tag by the popup value.
 * Whatever is responsible for setting the value in the popup should call
 * this method to add a tag, or use the regular methods like #addTag or
 * #setValue directly.
 *
 * @param {string} data The value of item
 * @param {string} [label] The label of the tag. If not given, the data is used.
 */
OO.ui.PopupTagMultiselectWidget.prototype.addTagByPopupValue = function ( data, label ) {
	this.addTag( data, label );
};

/**
 * MenuTagMultiselectWidget is a {@link OO.ui.TagMultiselectWidget OO.ui.TagMultiselectWidget}
 * intended to use a menu of selectable options.
 *
 *     @example
 *     // A basic MenuTagMultiselectWidget.
 *     var widget = new OO.ui.MenuTagMultiselectWidget( {
 *         inputPosition: 'outline',
 *         options: [
 *            { data: 'option1', label: 'Option 1', icon: 'tag' },
 *            { data: 'option2', label: 'Option 2' },
 *            { data: 'option3', label: 'Option 3' },
 *         ],
 *         selected: [ 'option1', 'option2' ]
 *     } );
 *     $( document.body ).append( widget.$element );
 *
 * @class
 * @extends OO.ui.TagMultiselectWidget
 *
 * @constructor
 * @param {Object} [config] Configuration object
 * @cfg {boolean} [clearInputOnChoose=true] Clear the text input value when a menu option is chosen
 * @cfg {Object} [menu] Configuration object for the menu widget
 * @cfg {jQuery} [$overlay] An overlay for the menu.
 *  See <https://www.mediawiki.org/wiki/OOUI/Concepts#Overlays>.
 * @cfg {Object[]} [options=[]] Array of menu options in the format `{ data: …, label: … }`
 */
OO.ui.MenuTagMultiselectWidget = function OoUiMenuTagMultiselectWidget( config ) {
	var $autoCloseIgnore = $( [] );
	config = config || {};

	// Parent constructor
	OO.ui.MenuTagMultiselectWidget.parent.call( this, config );

	$autoCloseIgnore = $autoCloseIgnore.add( this.$group );
	if ( this.hasInput ) {
		$autoCloseIgnore = $autoCloseIgnore.add( this.input.$element );
	}

	this.$overlay = ( config.$overlay === true ?
		OO.ui.getDefaultOverlay() : config.$overlay ) || this.$element;
	this.clearInputOnChoose = config.clearInputOnChoose === undefined ||
		!!config.clearInputOnChoose;
	this.menu = this.createMenuWidget( $.extend( {
		widget: this,
		hideOnChoose: false,
		input: this.hasInput ? this.input : null,
		$input: this.hasInput ? this.input.$input : null,
		filterFromInput: !!this.hasInput,
		highlightOnFilter: !this.allowArbitrary,
		multiselect: true,
		$autoCloseIgnore: $autoCloseIgnore,
		$floatableContainer: this.hasInput && this.inputPosition === 'outline' ?
			this.input.$element : this.$element,
		$overlay: this.$overlay,
		disabled: this.isDisabled()
	}, config.menu ) );
	this.addOptions( config.options || [] );

	// Events
	this.menu.connect( this, {
		choose: 'onMenuChoose',
		toggle: 'onMenuToggle'
	} );
	if ( this.hasInput ) {
		this.input.connect( this, {
			change: 'onInputChange'
		} );
	}
	this.connect( this, {
		resize: 'onResize'
	} );

	// Initialization
	this.$overlay.append( this.menu.$element );
	this.$element.addClass( 'oo-ui-menuTagMultiselectWidget' );
	// Remove MenuSelectWidget's generic focus owner ARIA attribute
	// TODO: Should this widget have a `role` that is compatible with this attribute?
	this.menu.$focusOwner.removeAttr( 'aria-expanded' );
	// TagMultiselectWidget already does this, but it doesn't work right because this.menu is
	// not yet set up while the parent constructor runs, and #getAllowedValues rejects everything.
	if ( config.selected ) {
		this.setValue( config.selected );
	}
};

/* Initialization */

OO.inheritClass( OO.ui.MenuTagMultiselectWidget, OO.ui.TagMultiselectWidget );

/* Methods */

/**
 * Respond to resize event
 */
OO.ui.MenuTagMultiselectWidget.prototype.onResize = function () {
	// Reposition the menu
	this.menu.position();
};

/**
 * @inheritdoc
 */
OO.ui.MenuTagMultiselectWidget.prototype.onInputFocus = function () {
	// Parent method
	OO.ui.MenuTagMultiselectWidget.parent.prototype.onInputFocus.call( this );

	this.menu.toggle( true );
};

/**
 * Respond to input change event
 */
OO.ui.MenuTagMultiselectWidget.prototype.onInputChange = function () {
	this.menu.toggle( true );
};

/**
 * Respond to menu choose event, which is intentional by the user.
 *
 * @param {OO.ui.OptionWidget} menuItem Selected menu items
 * @param {boolean} selected Item is selected
 */
OO.ui.MenuTagMultiselectWidget.prototype.onMenuChoose = function ( menuItem, selected ) {
	if ( this.hasInput && this.clearInputOnChoose ) {
		this.input.setValue( '' );
	}

	if ( selected && !this.findItemFromData( menuItem.getData() ) ) {
		// The menu item is selected, add it to the tags
		this.addTag( menuItem.getData(), menuItem.getLabel() );
	} else {
		// The menu item was unselected, remove the tag
		this.removeTagByData( menuItem.getData() );
	}
};

/**
 * Respond to menu toggle event. Reset item highlights on hide.
 *
 * @param {boolean} isVisible The menu is visible
 */
OO.ui.MenuTagMultiselectWidget.prototype.onMenuToggle = function ( isVisible ) {
	if ( !isVisible ) {
		this.menu.highlightItem( null );
		this.menu.scrollToTop();
	}
	setTimeout( function () {
		// Remove MenuSelectWidget's generic focus owner ARIA attribute
		// TODO: Should this widget have a `role` that is compatible with this attribute?
		this.menu.$focusOwner.removeAttr( 'aria-expanded' );
	}.bind( this ) );
};

/**
 * @inheritdoc
 */
OO.ui.MenuTagMultiselectWidget.prototype.onTagSelect = function ( tagItem ) {
	var menuItem = this.menu.findItemFromData( tagItem.getData() );
	if ( !this.allowArbitrary ) {
		// Override the base behavior from TagMultiselectWidget; the base behavior
		// in TagMultiselectWidget is to remove the tag to edit it in the input,
		// but in our case, we want to utilize the menu selection behavior, and
		// definitely not remove the item.

		// If there is an input that is used for filtering, erase the value so we don't filter
		if ( this.hasInput && this.menu.filterFromInput ) {
			this.input.setValue( '' );
		}

		this.focus();

		// Highlight the menu item
		this.menu.highlightItem( menuItem );
		this.menu.scrollItemIntoView( menuItem );

	} else {
		// Use the default
		OO.ui.MenuTagMultiselectWidget.parent.prototype.onTagSelect.call( this, tagItem );
	}
};

/**
 * @inheritdoc
 */
OO.ui.MenuTagMultiselectWidget.prototype.removeItems = function ( items ) {
	var widget = this;

	// Parent
	OO.ui.MenuTagMultiselectWidget.parent.prototype.removeItems.call( this, items );

	items.forEach( function ( tagItem ) {
		var menuItem = widget.menu.findItemFromData( tagItem.getData() );
		if ( menuItem ) {
			// Synchronize the menu selection - unselect the removed tag
			widget.menu.unselectItem( menuItem );
		}
	} );
};

/**
 * @inheritdoc
 */
OO.ui.MenuTagMultiselectWidget.prototype.setValue = function ( valueObject ) {
	valueObject = Array.isArray( valueObject ) ? valueObject : [ valueObject ];

	// We override this method from the parent, to make sure we are adding proper
	// menu items, and are accounting for cases where we have this widget with
	// a menu but also 'allowArbitrary'
	if ( !this.menu ) {
		return;
	}

	this.clearItems();
	valueObject.forEach( function ( obj ) {
		var data, label, menuItem;

		if ( typeof obj === 'string' ) {
			data = label = obj;
		} else {
			data = obj.data;
			label = obj.label;
		}

		// Check if the item is in the menu
		menuItem = this.menu.getItemFromLabel( label ) || this.menu.findItemFromData( data );
		if ( menuItem ) {
			// Menu item found, add the menu item
			this.addTag( menuItem.getData(), menuItem.getLabel() );
			// Make sure that item is also selected
			this.menu.selectItem( menuItem );
		} else if ( this.allowArbitrary ) {
			// If the item isn't in the menu, only add it if we
			// allow for arbitrary values
			this.addTag( data, label );
		}
	}.bind( this ) );
};

/**
 * @inheritdoc
 */
OO.ui.MenuTagMultiselectWidget.prototype.setDisabled = function ( isDisabled ) {
	// Parent method
	OO.ui.MenuTagMultiselectWidget.parent.prototype.setDisabled.call( this, isDisabled );

	if ( this.menu ) {
		// Protect against calling setDisabled() before the menu was initialized
		this.menu.setDisabled( isDisabled );
	}
};

/**
 * Highlight the first selectable item in the menu, if configured.
 *
 * @private
 * @chainable
 */
OO.ui.MenuTagMultiselectWidget.prototype.initializeMenuSelection = function () {
	var highlightedItem;
	this.menu.highlightItem(
		this.allowArbitrary ?
			null :
			this.menu.findFirstSelectableItem()
	);

	highlightedItem = this.menu.findHighlightedItem();
	// Scroll to the highlighted item, if it exists
	if ( highlightedItem ) {
		this.menu.scrollItemIntoView( highlightedItem );
	}
};

/**
 * @inheritdoc
 */
OO.ui.MenuTagMultiselectWidget.prototype.addTagFromInput = function () {
	var val = this.input.getValue(),
		// Look for a highlighted item first
		// Then look for the element that fits the data
		item = this.menu.findHighlightedItem() || this.menu.findItemFromData( val ),
		data = item ? item.getData() : val,
		isValid = this.isAllowedData( data );

	// Override the parent method so we add from the menu
	// rather than directly from the input

	if ( !val ) {
		return;
	}

	if ( isValid || this.allowDisplayInvalidTags ) {
		this.clearInput();
		if ( item ) {
			this.addTag( data, item.getLabel() );
		} else {
			this.addTag( val );
		}
	}
};

/**
 * Return the visible items in the menu. This is mainly used for when
 * the menu is filtering results.
 *
 * @return {OO.ui.MenuOptionWidget[]} Visible results
 */
OO.ui.MenuTagMultiselectWidget.prototype.getMenuVisibleItems = function () {
	return this.menu.getItems().filter( function ( menuItem ) {
		return menuItem.isVisible();
	} );
};

/**
 * Create the menu for this widget. This is in a separate method so that
 * child classes can override this without polluting the constructor with
 * unnecessary extra objects that will be overidden.
 *
 * @param {Object} menuConfig Configuration options
 * @return {OO.ui.MenuSelectWidget} Menu widget
 */
OO.ui.MenuTagMultiselectWidget.prototype.createMenuWidget = function ( menuConfig ) {
	return new OO.ui.MenuSelectWidget( menuConfig );
};

/**
 * Add options to the menu
 *
 * @param {Object[]} menuOptions Object defining options
 */
OO.ui.MenuTagMultiselectWidget.prototype.addOptions = function ( menuOptions ) {
	var widget = this,
		items = menuOptions.map( function ( obj ) {
			return widget.createMenuOptionWidget( obj.data, obj.label, obj.icon );
		} );

	this.menu.addItems( items );
};

/**
 * Create a menu option widget.
 *
 * @param {string} data Item data
 * @param {string} [label] Item label
 * @param {string} [icon] Symbolic icon name
 * @return {OO.ui.OptionWidget} Option widget
 */
OO.ui.MenuTagMultiselectWidget.prototype.createMenuOptionWidget = function ( data, label, icon ) {
	return new OO.ui.MenuOptionWidget( {
		data: data,
		label: label || data,
		icon: icon
	} );
};

/**
 * Get the menu
 *
 * @return {OO.ui.MenuSelectWidget} Menu
 */
OO.ui.MenuTagMultiselectWidget.prototype.getMenu = function () {
	return this.menu;
};

/**
 * Get the allowed values list
 *
 * @return {string[]} Allowed data values
 */
OO.ui.MenuTagMultiselectWidget.prototype.getAllowedValues = function () {
	var menuDatas = [];
	if ( this.menu ) {
		// If the parent constructor is calling us, we're not ready yet, this.menu is not set up.
		menuDatas = this.menu.getItems().map( function ( menuItem ) {
			return menuItem.getData();
		} );
	}
	return this.allowedValues.concat( menuDatas );
};

/**
 * SelectFileWidgets allow for selecting files, using the HTML5 File API. These
 * widgets can be configured with {@link OO.ui.mixin.IconElement icons}, {@link
 * OO.ui.mixin.IndicatorElement indicators} and {@link OO.ui.mixin.TitledElement titles}.
 * Please see the [OOUI documentation on MediaWiki] [1] for more information and examples.
 *
 * Although SelectFileWidget inherits from SelectFileInputWidget, it does not
 * behave as an InputWidget, and can't be used in HTML forms.
 *
 *     @example
 *     // A file select widget.
 *     var selectFile = new OO.ui.SelectFileWidget();
 *     $( document.body ).append( selectFile.$element );
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Widgets
 *
 * @class
 * @extends OO.ui.SelectFileInputWidget
 * @mixins OO.ui.mixin.PendingElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {string} [notsupported] Text to display when file support is missing in the browser.
 * @cfg {boolean} [droppable=true] Whether to accept files by drag and drop.
 * @cfg {boolean} [buttonOnly=false] Show only the select file button, no info field. Requires
 *  showDropTarget to be false.
 * @cfg {boolean} [showDropTarget=false] Whether to show a drop target. Requires droppable to be
 *  true. Not yet supported in multiple file mode.
 * @cfg {number} [thumbnailSizeLimit=20] File size limit in MiB above which to not try and show a
 *  preview (for performance).
 */
OO.ui.SelectFileWidget = function OoUiSelectFileWidget( config ) {
	var dragHandler, droppable,
		isSupported = this.constructor.static.isSupported();

	// Configuration initialization
	config = $.extend( {
		notsupported: OO.ui.msg( 'ooui-selectfile-not-supported' ),
		droppable: true,
		buttonOnly: false,
		showDropTarget: false,
		thumbnailSizeLimit: 20
	}, config );

	if ( !isSupported ) {
		config.disabled = true;
	}

	// Parent constructor
	OO.ui.SelectFileWidget.parent.call( this, config );

	// Mixin constructors
	OO.ui.mixin.PendingElement.call( this );

	if ( !isSupported ) {
		this.info.setValue( config.notsupported );
	}

	// Properties
	droppable = config.droppable && isSupported;
	// TODO: Support drop target when multiple is set
	this.showDropTarget = droppable && config.showDropTarget && !this.multiple;
	this.thumbnailSizeLimit = config.thumbnailSizeLimit;

	// Initialization
	if ( this.showDropTarget ) {
		this.selectButton.setIcon( 'upload' );
		this.$thumbnail = $( '<div>' ).addClass( 'oo-ui-selectFileWidget-thumbnail' );
		this.setPendingElement( this.$thumbnail );
		this.$element
			.addClass( 'oo-ui-selectFileWidget-dropTarget' )
			.on( {
				click: this.onDropTargetClick.bind( this )
			} )
			.append(
				this.$thumbnail,
				this.info.$element,
				this.selectButton.$element,
				$( '<span>' )
					.addClass( 'oo-ui-selectFileWidget-dropLabel' )
					.text( OO.ui.msg( 'ooui-selectfile-dragdrop-placeholder' ) )
			);
		this.fieldLayout.$element.remove();
	} else if ( config.buttonOnly ) {
		// Copy over any classes that may have been added already.
		// Ensure no events are bound to this.$element before here.
		this.selectButton.$element
			.addClass( this.$element.attr( 'class' ) )
			.addClass( 'oo-ui-selectFileWidget-buttonOnly' );
		// Set this.$element to just be the button
		this.$element = this.selectButton.$element;
	}

	// Events
	if ( droppable ) {
		dragHandler = this.onDragEnterOrOver.bind( this );
		this.$element.on( {
			dragenter: dragHandler,
			dragover: dragHandler,
			dragleave: this.onDragLeave.bind( this ),
			drop: this.onDrop.bind( this )
		} );
	}

	this.$input
		.on( 'click', function ( e ) {
			// Prevents dropTarget to get clicked which calls
			// a click on this input
			e.stopPropagation();
		} );

	this.$element.addClass( 'oo-ui-selectFileWidget' );

	this.updateUI();
};

/* Setup */

OO.inheritClass( OO.ui.SelectFileWidget, OO.ui.SelectFileInputWidget );
OO.mixinClass( OO.ui.SelectFileWidget, OO.ui.mixin.PendingElement );

/* Static Properties */

/**
 * Check if this widget is supported
 *
 * @static
 * @return {boolean}
 */
OO.ui.SelectFileWidget.static.isSupported = function () {
	var $input;
	if ( OO.ui.SelectFileWidget.static.isSupportedCache === null ) {
		$input = $( '<input>' ).attr( 'type', 'file' );
		OO.ui.SelectFileWidget.static.isSupportedCache = $input[ 0 ].files !== undefined;
	}
	return OO.ui.SelectFileWidget.static.isSupportedCache;
};

OO.ui.SelectFileWidget.static.isSupportedCache = null;

/* Events */

/**
 * @event change
 *
 * A change event is emitted when the on/off state of the toggle changes.
 *
 * @param {File|null} value New value
 */

/* Methods */

/**
 * Get the current value of the field
 *
 * For single file widgets returns a File or null.
 * For multiple file widgets returns a list of Files.
 *
 * @return {File|File[]|null}
 */
OO.ui.SelectFileWidget.prototype.getValue = function () {
	return this.multiple ? this.currentFiles : this.currentFiles[ 0 ];
};

/**
 * Set the current value of the field
 *
 * @param {File[]|null} files Files to select
 */
OO.ui.SelectFileWidget.prototype.setValue = function ( files ) {
	if ( files && !this.multiple ) {
		files = files.slice( 0, 1 );
	}

	function comparableFile( file ) {
		// Use extend to convert to plain objects so they can be compared.
		return $.extend( {}, file );
	}

	if ( !OO.compare(
		files && files.map( comparableFile ),
		this.currentFiles && this.currentFiles.map( comparableFile )
	) ) {
		this.currentFiles = files || [];
		this.emit( 'change', this.currentFiles );
	}
};

/**
 * @inheritdoc
 */
OO.ui.SelectFileWidget.prototype.getFilename = function () {
	return this.currentFiles.map( function ( file ) {
		return file.name;
	} ).join( ', ' );
};

/**
 * Disable InputWidget#onEdit listener, onFileSelected is used instead.
 * @inheritdoc
 */
OO.ui.SelectFileWidget.prototype.onEdit = function () {};

/**
 * @inheritdoc
 */
OO.ui.SelectFileWidget.prototype.updateUI = function () {
	// Too early, or not supported
	if ( !this.selectButton || !this.constructor.static.isSupported() ) {
		return;
	}

	// Parent method
	OO.ui.SelectFileWidget.super.prototype.updateUI.call( this );

	if ( this.currentFiles.length ) {
		this.$element.removeClass( 'oo-ui-selectFileInputWidget-empty' );

		if ( this.showDropTarget ) {
			this.pushPending();
			this.loadAndGetImageUrl( this.currentFiles[ 0 ] ).done( function ( url ) {
				this.$thumbnail.css( 'background-image', 'url( ' + url + ' )' );
			}.bind( this ) ).fail( function () {
				this.$thumbnail.append(
					new OO.ui.IconWidget( {
						icon: 'attachment',
						classes: [ 'oo-ui-selectFileWidget-noThumbnail-icon' ]
					} ).$element
				);
			}.bind( this ) ).always( function () {
				this.popPending();
			}.bind( this ) );
			this.$element.off( 'click' );
		}
	} else {
		if ( this.showDropTarget ) {
			this.$element.off( 'click' );
			this.$element.on( {
				click: this.onDropTargetClick.bind( this )
			} );
			this.$thumbnail
				.empty()
				.css( 'background-image', '' );
		}
		this.$element.addClass( 'oo-ui-selectFileInputWidget-empty' );
	}
};

/**
 * If the selected file is an image, get its URL and load it.
 *
 * @param {File} file File
 * @return {jQuery.Promise} Promise resolves with the image URL after it has loaded
 */
OO.ui.SelectFileWidget.prototype.loadAndGetImageUrl = function ( file ) {
	var deferred = $.Deferred(),
		reader = new FileReader();

	if (
		( OO.getProp( file, 'type' ) || '' ).indexOf( 'image/' ) === 0 &&
		file.size < this.thumbnailSizeLimit * 1024 * 1024
	) {
		reader.onload = function ( event ) {
			var img = document.createElement( 'img' );
			img.addEventListener( 'load', function () {
				if (
					img.naturalWidth === 0 ||
					img.naturalHeight === 0 ||
					img.complete === false
				) {
					deferred.reject();
				} else {
					deferred.resolve( event.target.result );
				}
			} );
			img.src = event.target.result;
		};
		reader.readAsDataURL( file );
	} else {
		deferred.reject();
	}

	return deferred.promise();
};

/**
 * @inheritdoc
 */
OO.ui.SelectFileWidget.prototype.onFileSelected = function ( e ) {
	var files;

	if ( this.inputClearing ) {
		return;
	}

	files = this.filterFiles( e.target.files || [] );

	// After a file is selected clear the native widget to avoid confusion
	this.inputClearing = true;
	this.$input[ 0 ].value = '';
	this.inputClearing = false;

	this.setValue( files );
};

/**
 * Handle drop target click events.
 *
 * @private
 * @param {jQuery.Event} e Key press event
 * @return {undefined|boolean} False to prevent default if event is handled
 */
OO.ui.SelectFileWidget.prototype.onDropTargetClick = function () {
	if ( !this.isDisabled() && this.$input ) {
		this.$input.trigger( 'click' );
		return false;
	}
};

/**
 * Handle drag enter and over events
 *
 * @private
 * @param {jQuery.Event} e Drag event
 * @return {undefined|boolean} False to prevent default if event is handled
 */
OO.ui.SelectFileWidget.prototype.onDragEnterOrOver = function ( e ) {
	var itemsOrFiles,
		hasDroppableFile = false,
		dt = e.originalEvent.dataTransfer;

	e.preventDefault();
	e.stopPropagation();

	if ( this.isDisabled() ) {
		this.$element.removeClass( 'oo-ui-selectFileWidget-canDrop' );
		dt.dropEffect = 'none';
		return false;
	}

	// DataTransferItem and File both have a type property, but in Chrome files
	// have no information at this point.
	itemsOrFiles = dt.items || dt.files;
	if ( itemsOrFiles && itemsOrFiles.length ) {
		if ( this.filterFiles( itemsOrFiles ).length ) {
			hasDroppableFile = true;
		}
	// dt.types is Array-like, but not an Array
	} else if ( Array.prototype.indexOf.call( OO.getProp( dt, 'types' ) || [], 'Files' ) !== -1 ) {
		// File information is not available at this point for security so just assume
		// it is acceptable for now.
		// https://bugzilla.mozilla.org/show_bug.cgi?id=640534
		hasDroppableFile = true;
	}

	this.$element.toggleClass( 'oo-ui-selectFileWidget-canDrop', hasDroppableFile );
	if ( !hasDroppableFile ) {
		dt.dropEffect = 'none';
	}

	return false;
};

/**
 * Handle drag leave events
 *
 * @private
 * @param {jQuery.Event} e Drag event
 */
OO.ui.SelectFileWidget.prototype.onDragLeave = function () {
	this.$element.removeClass( 'oo-ui-selectFileWidget-canDrop' );
};

/**
 * Handle drop events
 *
 * @private
 * @param {jQuery.Event} e Drop event
 * @return {undefined|boolean} False to prevent default if event is handled
 */
OO.ui.SelectFileWidget.prototype.onDrop = function ( e ) {
	var files,
		dt = e.originalEvent.dataTransfer;

	e.preventDefault();
	e.stopPropagation();
	this.$element.removeClass( 'oo-ui-selectFileWidget-canDrop' );

	if ( this.isDisabled() ) {
		return false;
	}

	files = this.filterFiles( dt.files || [] );
	this.setValue( files );

	return false;
};

/**
 * @inheritdoc
 */
OO.ui.SelectFileWidget.prototype.setDisabled = function ( disabled ) {
	disabled = disabled || !this.constructor.static.isSupported();

	// Parent method
	OO.ui.SelectFileWidget.parent.prototype.setDisabled.call( this, disabled );
};

/**
 * SearchWidgets combine a {@link OO.ui.TextInputWidget text input field},
 * where users can type a search query, and a menu of search results,
 * which is displayed beneath the query field.
 * Unlike {@link OO.ui.mixin.LookupElement lookup menus}, search result menus are always visible
 * to the user. Users can choose an item from the menu or type a query into the text field to
 * search for a matching result item.
 * In general, search widgets are used inside a separate {@link OO.ui.Dialog dialog} window.
 *
 * Each time the query is changed, the search result menu is cleared and repopulated. Please see
 * the [OOUI demos][1] for an example.
 *
 * [1]: https://doc.wikimedia.org/oojs-ui/master/demos/#SearchInputWidget-type-search
 *
 * @class
 * @extends OO.ui.Widget
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {string|jQuery} [placeholder] Placeholder text for query input
 * @cfg {string} [value] Initial query value
 */
OO.ui.SearchWidget = function OoUiSearchWidget( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.SearchWidget.parent.call( this, config );

	// Properties
	this.query = new OO.ui.TextInputWidget( {
		icon: 'search',
		placeholder: config.placeholder,
		value: config.value
	} );
	this.results = new OO.ui.SelectWidget();
	this.$query = $( '<div>' );
	this.$results = $( '<div>' );

	// Events
	this.query.connect( this, {
		change: 'onQueryChange',
		enter: 'onQueryEnter'
	} );
	this.query.$input.on( 'keydown', this.onQueryKeydown.bind( this ) );

	// Initialization
	this.$query
		.addClass( 'oo-ui-searchWidget-query' )
		.append( this.query.$element );
	this.$results
		.addClass( 'oo-ui-searchWidget-results' )
		.append( this.results.$element );
	this.$element
		.addClass( 'oo-ui-searchWidget' )
		.append( this.$results, this.$query );
};

/* Setup */

OO.inheritClass( OO.ui.SearchWidget, OO.ui.Widget );

/* Methods */

/**
 * Handle query key down events.
 *
 * @private
 * @param {jQuery.Event} e Key down event
 */
OO.ui.SearchWidget.prototype.onQueryKeydown = function ( e ) {
	var highlightedItem, nextItem,
		dir = e.which === OO.ui.Keys.DOWN ? 1 : ( e.which === OO.ui.Keys.UP ? -1 : 0 );

	if ( dir ) {
		highlightedItem = this.results.findHighlightedItem();
		if ( !highlightedItem ) {
			highlightedItem = this.results.findSelectedItem();
		}
		nextItem = this.results.findRelativeSelectableItem( highlightedItem, dir );
		this.results.highlightItem( nextItem );
		nextItem.scrollElementIntoView();
	}
};

/**
 * Handle select widget select events.
 *
 * Clears existing results. Subclasses should repopulate items according to new query.
 *
 * @private
 * @param {string} value New value
 */
OO.ui.SearchWidget.prototype.onQueryChange = function () {
	// Reset
	this.results.clearItems();
};

/**
 * Handle select widget enter key events.
 *
 * Chooses highlighted item.
 *
 * @private
 * @param {string} value New value
 */
OO.ui.SearchWidget.prototype.onQueryEnter = function () {
	var highlightedItem = this.results.findHighlightedItem();
	if ( highlightedItem ) {
		this.results.chooseItem( highlightedItem );
	}
};

/**
 * Get the query input.
 *
 * @return {OO.ui.TextInputWidget} Query input
 */
OO.ui.SearchWidget.prototype.getQuery = function () {
	return this.query;
};

/**
 * Get the search results menu.
 *
 * @return {OO.ui.SelectWidget} Menu of search results
 */
OO.ui.SearchWidget.prototype.getResults = function () {
	return this.results;
};

}( OO ) );

//# sourceMappingURL=oojs-ui-widgets.js.map.json
/*!
 * OOUI v0.33.1
 * https://www.mediawiki.org/wiki/OOUI
 *
 * Copyright 2011–2019 OOUI Team and other contributors.
 * Released under the MIT license
 * http://oojs.mit-license.org
 *
 * Date: 2019-07-03T21:05:08Z
 */
( function ( OO ) {

'use strict';

/**
 * Toolbars are complex interface components that permit users to easily access a variety
 * of {@link OO.ui.Tool tools} (e.g., formatting commands) and actions, which are additional
 * commands that are part of the toolbar, but not configured as tools.
 *
 * Individual tools are customized and then registered with a
 * {@link OO.ui.ToolFactory tool factory}, which creates the tools on demand. Each tool has a
 * symbolic name (used when registering the tool), a title (e.g., ‘Insert image’), and an icon.
 *
 * Individual tools are organized in {@link OO.ui.ToolGroup toolgroups}, which can be
 * {@link OO.ui.MenuToolGroup menus} of tools, {@link OO.ui.ListToolGroup lists} of tools, or a
 * single {@link OO.ui.BarToolGroup bar} of tools. The arrangement and order of the toolgroups is
 * customized when the toolbar is set up. Tools can be presented in any order, but each can only
 * appear once in the toolbar.
 *
 * The toolbar can be synchronized with the state of the external "application", like a text
 * editor's editing area, marking tools as active/inactive (e.g. a 'bold' tool would be shown as
 * active when the text cursor was inside bolded text) or enabled/disabled (e.g. a table caption
 * tool would be disabled while the user is not editing a table). A state change is signalled by
 * emitting the {@link #event-updateState 'updateState' event}, which calls Tools'
 * {@link OO.ui.Tool#onUpdateState onUpdateState method}.
 *
 * The following is an example of a basic toolbar.
 *
 *     @example
 *     // Example of a toolbar
 *     // Create the toolbar
 *     var toolFactory = new OO.ui.ToolFactory();
 *     var toolGroupFactory = new OO.ui.ToolGroupFactory();
 *     var toolbar = new OO.ui.Toolbar( toolFactory, toolGroupFactory );
 *
 *     // We will be placing status text in this element when tools are used
 *     var $area = $( '<p>' ).text( 'Toolbar example' );
 *
 *     // Define the tools that we're going to place in our toolbar
 *
 *     // Create a class inheriting from OO.ui.Tool
 *     function SearchTool() {
 *         SearchTool.parent.apply( this, arguments );
 *     }
 *     OO.inheritClass( SearchTool, OO.ui.Tool );
 *     // Each tool must have a 'name' (used as an internal identifier, see later) and at least one
 *     // of 'icon' and 'title' (displayed icon and text).
 *     SearchTool.static.name = 'search';
 *     SearchTool.static.icon = 'search';
 *     SearchTool.static.title = 'Search...';
 *     // Defines the action that will happen when this tool is selected (clicked).
 *     SearchTool.prototype.onSelect = function () {
 *         $area.text( 'Search tool clicked!' );
 *         // Never display this tool as "active" (selected).
 *         this.setActive( false );
 *     };
 *     SearchTool.prototype.onUpdateState = function () {};
 *     // Make this tool available in our toolFactory and thus our toolbar
 *     toolFactory.register( SearchTool );
 *
 *     // Register two more tools, nothing interesting here
 *     function SettingsTool() {
 *         SettingsTool.parent.apply( this, arguments );
 *     }
 *     OO.inheritClass( SettingsTool, OO.ui.Tool );
 *     SettingsTool.static.name = 'settings';
 *     SettingsTool.static.icon = 'settings';
 *     SettingsTool.static.title = 'Change settings';
 *     SettingsTool.prototype.onSelect = function () {
 *         $area.text( 'Settings tool clicked!' );
 *         this.setActive( false );
 *     };
 *     SettingsTool.prototype.onUpdateState = function () {};
 *     toolFactory.register( SettingsTool );
 *
 *     // Register two more tools, nothing interesting here
 *     function StuffTool() {
 *         StuffTool.parent.apply( this, arguments );
 *     }
 *     OO.inheritClass( StuffTool, OO.ui.Tool );
 *     StuffTool.static.name = 'stuff';
 *     StuffTool.static.icon = 'ellipsis';
 *     StuffTool.static.title = 'More stuff';
 *     StuffTool.prototype.onSelect = function () {
 *         $area.text( 'More stuff tool clicked!' );
 *         this.setActive( false );
 *     };
 *     StuffTool.prototype.onUpdateState = function () {};
 *     toolFactory.register( StuffTool );
 *
 *     // This is a PopupTool. Rather than having a custom 'onSelect' action, it will display a
 *     // little popup window (a PopupWidget).
 *     function HelpTool( toolGroup, config ) {
 *         OO.ui.PopupTool.call( this, toolGroup, $.extend( { popup: {
 *             padded: true,
 *             label: 'Help',
 *             head: true
 *         } }, config ) );
 *         this.popup.$body.append( '<p>I am helpful!</p>' );
 *     }
 *     OO.inheritClass( HelpTool, OO.ui.PopupTool );
 *     HelpTool.static.name = 'help';
 *     HelpTool.static.icon = 'help';
 *     HelpTool.static.title = 'Help';
 *     toolFactory.register( HelpTool );
 *
 *     // Finally define which tools and in what order appear in the toolbar. Each tool may only be
 *     // used once (but not all defined tools must be used).
 *     toolbar.setup( [
 *         {
 *             // 'bar' tool groups display tools' icons only, side-by-side.
 *             type: 'bar',
 *             include: [ 'search', 'help' ]
 *         },
 *         {
 *             // 'list' tool groups display both the titles and icons, in a dropdown list.
 *             type: 'list',
 *             indicator: 'down',
 *             label: 'More',
 *             include: [ 'settings', 'stuff' ]
 *         }
 *         // Note how the tools themselves are toolgroup-agnostic - the same tool can be displayed
 *         // either in a 'list' or a 'bar'. There is a 'menu' tool group too, not showcased here,
 *         // since it's more complicated to use. (See the next example snippet on this page.)
 *     ] );
 *
 *     // Create some UI around the toolbar and place it in the document
 *     var frame = new OO.ui.PanelLayout( {
 *         expanded: false,
 *         framed: true
 *     } );
 *     var contentFrame = new OO.ui.PanelLayout( {
 *         expanded: false,
 *         padded: true
 *     } );
 *     frame.$element.append(
 *         toolbar.$element,
 *         contentFrame.$element.append( $area )
 *     );
 *     $( document.body ).append( frame.$element );
 *
 *     // Here is where the toolbar is actually built. This must be done after inserting it into the
 *     // document.
 *     toolbar.initialize();
 *     toolbar.emit( 'updateState' );
 *
 * The following example extends the previous one to illustrate 'menu' toolgroups and the usage of
 * {@link #event-updateState 'updateState' event}.
 *
 *     @example
 *     // Create the toolbar
 *     var toolFactory = new OO.ui.ToolFactory();
 *     var toolGroupFactory = new OO.ui.ToolGroupFactory();
 *     var toolbar = new OO.ui.Toolbar( toolFactory, toolGroupFactory );
 *
 *     // We will be placing status text in this element when tools are used
 *     var $area = $( '<p>' ).text( 'Toolbar example' );
 *
 *     // Define the tools that we're going to place in our toolbar
 *
 *     // Create a class inheriting from OO.ui.Tool
 *     function SearchTool() {
 *         SearchTool.parent.apply( this, arguments );
 *     }
 *     OO.inheritClass( SearchTool, OO.ui.Tool );
 *     // Each tool must have a 'name' (used as an internal identifier, see later) and at least one
 *     // of 'icon' and 'title' (displayed icon and text).
 *     SearchTool.static.name = 'search';
 *     SearchTool.static.icon = 'search';
 *     SearchTool.static.title = 'Search...';
 *     // Defines the action that will happen when this tool is selected (clicked).
 *     SearchTool.prototype.onSelect = function () {
 *         $area.text( 'Search tool clicked!' );
 *         // Never display this tool as "active" (selected).
 *         this.setActive( false );
 *     };
 *     SearchTool.prototype.onUpdateState = function () {};
 *     // Make this tool available in our toolFactory and thus our toolbar
 *     toolFactory.register( SearchTool );
 *
 *     // Register two more tools, nothing interesting here
 *     function SettingsTool() {
 *         SettingsTool.parent.apply( this, arguments );
 *         this.reallyActive = false;
 *     }
 *     OO.inheritClass( SettingsTool, OO.ui.Tool );
 *     SettingsTool.static.name = 'settings';
 *     SettingsTool.static.icon = 'settings';
 *     SettingsTool.static.title = 'Change settings';
 *     SettingsTool.prototype.onSelect = function () {
 *         $area.text( 'Settings tool clicked!' );
 *         // Toggle the active state on each click
 *         this.reallyActive = !this.reallyActive;
 *         this.setActive( this.reallyActive );
 *         // To update the menu label
 *         this.toolbar.emit( 'updateState' );
 *     };
 *     SettingsTool.prototype.onUpdateState = function () {};
 *     toolFactory.register( SettingsTool );
 *
 *     // Register two more tools, nothing interesting here
 *     function StuffTool() {
 *         StuffTool.parent.apply( this, arguments );
 *         this.reallyActive = false;
 *     }
 *     OO.inheritClass( StuffTool, OO.ui.Tool );
 *     StuffTool.static.name = 'stuff';
 *     StuffTool.static.icon = 'ellipsis';
 *     StuffTool.static.title = 'More stuff';
 *     StuffTool.prototype.onSelect = function () {
 *         $area.text( 'More stuff tool clicked!' );
 *         // Toggle the active state on each click
 *         this.reallyActive = !this.reallyActive;
 *         this.setActive( this.reallyActive );
 *         // To update the menu label
 *         this.toolbar.emit( 'updateState' );
 *     };
 *     StuffTool.prototype.onUpdateState = function () {};
 *     toolFactory.register( StuffTool );
 *
 *     // This is a PopupTool. Rather than having a custom 'onSelect' action, it will display a
 *     // little popup window (a PopupWidget). 'onUpdateState' is also already implemented.
 *     function HelpTool( toolGroup, config ) {
 *         OO.ui.PopupTool.call( this, toolGroup, $.extend( { popup: {
 *             padded: true,
 *             label: 'Help',
 *             head: true
 *         } }, config ) );
 *         this.popup.$body.append( '<p>I am helpful!</p>' );
 *     }
 *     OO.inheritClass( HelpTool, OO.ui.PopupTool );
 *     HelpTool.static.name = 'help';
 *     HelpTool.static.icon = 'help';
 *     HelpTool.static.title = 'Help';
 *     toolFactory.register( HelpTool );
 *
 *     // Finally define which tools and in what order appear in the toolbar. Each tool may only be
 *     // used once (but not all defined tools must be used).
 *     toolbar.setup( [
 *         {
 *             // 'bar' tool groups display tools' icons only, side-by-side.
 *             type: 'bar',
 *             include: [ 'search', 'help' ]
 *         },
 *         {
 *             // 'menu' tool groups display both the titles and icons, in a dropdown menu.
 *             // Menu label indicates which items are selected.
 *             type: 'menu',
 *             indicator: 'down',
 *             include: [ 'settings', 'stuff' ]
 *         }
 *     ] );
 *
 *     // Create some UI around the toolbar and place it in the document
 *     var frame = new OO.ui.PanelLayout( {
 *         expanded: false,
 *         framed: true
 *     } );
 *     var contentFrame = new OO.ui.PanelLayout( {
 *         expanded: false,
 *         padded: true
 *     } );
 *     frame.$element.append(
 *         toolbar.$element,
 *         contentFrame.$element.append( $area )
 *     );
 *     $( document.body ).append( frame.$element );
 *
 *     // Here is where the toolbar is actually built. This must be done after inserting it into the
 *     // document.
 *     toolbar.initialize();
 *     toolbar.emit( 'updateState' );
 *
 * @class
 * @extends OO.ui.Element
 * @mixins OO.EventEmitter
 * @mixins OO.ui.mixin.GroupElement
 *
 * @constructor
 * @param {OO.ui.ToolFactory} toolFactory Factory for creating tools
 * @param {OO.ui.ToolGroupFactory} toolGroupFactory Factory for creating toolgroups
 * @param {Object} [config] Configuration options
 * @cfg {boolean} [actions] Add an actions section to the toolbar. Actions are commands that are
 *  included in the toolbar, but are not configured as tools. By default, actions are displayed on
 *  the right side of the toolbar.
 * @cfg {string} [position='top'] Whether the toolbar is positioned above ('top') or below
 *  ('bottom') content.
 * @cfg {jQuery} [$overlay] An overlay for the popup.
 *  See <https://www.mediawiki.org/wiki/OOUI/Concepts#Overlays>.
 */
OO.ui.Toolbar = function OoUiToolbar( toolFactory, toolGroupFactory, config ) {
	// Allow passing positional parameters inside the config object
	if ( OO.isPlainObject( toolFactory ) && config === undefined ) {
		config = toolFactory;
		toolFactory = config.toolFactory;
		toolGroupFactory = config.toolGroupFactory;
	}

	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.Toolbar.parent.call( this, config );

	// Mixin constructors
	OO.EventEmitter.call( this );
	OO.ui.mixin.GroupElement.call( this, config );

	// Properties
	this.toolFactory = toolFactory;
	this.toolGroupFactory = toolGroupFactory;
	this.groupsByName = {};
	this.activeToolGroups = 0;
	this.tools = {};
	this.position = config.position || 'top';
	this.$bar = $( '<div>' );
	this.$actions = $( '<div>' );
	this.$popups = $( '<div>' );
	this.initialized = false;
	this.narrowThreshold = null;
	this.onWindowResizeHandler = this.onWindowResize.bind( this );
	this.$overlay = ( config.$overlay === true ? OO.ui.getDefaultOverlay() : config.$overlay ) ||
		this.$element;

	// Events
	this.$element
		.add( this.$bar ).add( this.$group ).add( this.$actions )
		.on( 'mousedown keydown', this.onPointerDown.bind( this ) );

	// Initialization
	this.$group.addClass( 'oo-ui-toolbar-tools' );
	if ( config.actions ) {
		this.$bar.append( this.$actions.addClass( 'oo-ui-toolbar-actions' ) );
	}
	this.$popups.addClass( 'oo-ui-toolbar-popups' );
	this.$bar
		.addClass( 'oo-ui-toolbar-bar' )
		.append( this.$group, '<div style="clear:both"></div>' );
	// Possible classes: oo-ui-toolbar-position-top, oo-ui-toolbar-position-bottom
	this.$element
		.addClass( 'oo-ui-toolbar oo-ui-toolbar-position-' + this.position )
		.append( this.$bar );
	this.$overlay.append( this.$popups );
};

/* Setup */

OO.inheritClass( OO.ui.Toolbar, OO.ui.Element );
OO.mixinClass( OO.ui.Toolbar, OO.EventEmitter );
OO.mixinClass( OO.ui.Toolbar, OO.ui.mixin.GroupElement );

/* Events */

/**
 * @event updateState
 *
 * An 'updateState' event must be emitted on the Toolbar (by calling
 * `toolbar.emit( 'updateState' )`) every time the state of the application using the toolbar
 * changes, and an update to the state of tools is required.
 *
 * @param {...Mixed} data Application-defined parameters
 */

/**
 * @event active
 *
 * An 'active' event is emitted when the number of active toolgroups increases from 0, or
 * returns to 0.
 *
 * @param {boolean} There are active toolgroups in this toolbar
 */

/* Methods */

/**
 * Get the tool factory.
 *
 * @return {OO.ui.ToolFactory} Tool factory
 */
OO.ui.Toolbar.prototype.getToolFactory = function () {
	return this.toolFactory;
};

/**
 * Get the toolgroup factory.
 *
 * @return {OO.Factory} Toolgroup factory
 */
OO.ui.Toolbar.prototype.getToolGroupFactory = function () {
	return this.toolGroupFactory;
};

/**
 * Handles mouse down events.
 *
 * @private
 * @param {jQuery.Event} e Mouse down event
 * @return {undefined|boolean} False to prevent default if event is handled
 */
OO.ui.Toolbar.prototype.onPointerDown = function ( e ) {
	var $closestWidgetToEvent = $( e.target ).closest( '.oo-ui-widget' ),
		$closestWidgetToToolbar = this.$element.closest( '.oo-ui-widget' );
	if (
		!$closestWidgetToEvent.length ||
		$closestWidgetToEvent[ 0 ] ===
		$closestWidgetToToolbar[ 0 ]
	) {
		return false;
	}
};

/**
 * Handle window resize event.
 *
 * @private
 * @param {jQuery.Event} e Window resize event
 */
OO.ui.Toolbar.prototype.onWindowResize = function () {
	this.$element.add( this.$popups ).toggleClass(
		'oo-ui-toolbar-narrow',
		this.$bar[ 0 ].clientWidth <= this.getNarrowThreshold()
	);
};

/**
 * Get the (lazily-computed) width threshold for applying the oo-ui-toolbar-narrow
 * class.
 *
 * @private
 * @return {number} Width threshold in pixels
 */
OO.ui.Toolbar.prototype.getNarrowThreshold = function () {
	if ( this.narrowThreshold === null ) {
		this.narrowThreshold = this.$group[ 0 ].offsetWidth + this.$actions[ 0 ].offsetWidth;
	}
	return this.narrowThreshold;
};

/**
 * Sets up handles and preloads required information for the toolbar to work.
 * This must be called after it is attached to a visible document and before doing anything else.
 */
OO.ui.Toolbar.prototype.initialize = function () {
	if ( !this.initialized ) {
		this.initialized = true;
		$( this.getElementWindow() ).on( 'resize', this.onWindowResizeHandler );
		this.onWindowResize();
	}
};

/**
 * Set up the toolbar.
 *
 * The toolbar is set up with a list of toolgroup configurations that specify the type of
 * toolgroup ({@link OO.ui.BarToolGroup bar}, {@link OO.ui.MenuToolGroup menu}, or
 * {@link OO.ui.ListToolGroup list}) to add and which tools to include, exclude, promote, or demote
 * within that toolgroup. Please see {@link OO.ui.ToolGroup toolgroups} for more information about
 * including tools in toolgroups.
 *
 * @param {Object.<string,Array>} groups List of toolgroup configurations
 * @param {string} [groups.name] Symbolic name for this toolgroup
 * @param {string} [groups.type] Toolgroup type, should exist in the toolgroup factory
 * @param {Array|string} [groups.include] Tools to include in the toolgroup
 * @param {Array|string} [groups.exclude] Tools to exclude from the toolgroup
 * @param {Array|string} [groups.promote] Tools to promote to the beginning of the toolgroup
 * @param {Array|string} [groups.demote] Tools to demote to the end of the toolgroup
 */
OO.ui.Toolbar.prototype.setup = function ( groups ) {
	var i, len, type, toolGroup, groupConfig,
		items = [],
		defaultType = 'bar';

	// Cleanup previous groups
	this.reset();

	// Build out new groups
	for ( i = 0, len = groups.length; i < len; i++ ) {
		groupConfig = groups[ i ];
		if ( groupConfig.include === '*' ) {
			// Apply defaults to catch-all groups
			if ( groupConfig.type === undefined ) {
				groupConfig.type = 'list';
			}
			if ( groupConfig.label === undefined ) {
				groupConfig.label = OO.ui.msg( 'ooui-toolbar-more' );
			}
		}
		// Check type has been registered
		type = this.getToolGroupFactory().lookup( groupConfig.type ) ?
			groupConfig.type : defaultType;
		toolGroup = this.getToolGroupFactory().create( type, this, groupConfig );
		items.push( toolGroup );
		this.groupsByName[ groupConfig.name ] = toolGroup;
		toolGroup.connect( this, {
			active: 'onToolGroupActive'
		} );
	}
	this.addItems( items );
};

/**
 * Handle active events from tool groups
 *
 * @param {boolean} active Tool group has become active, inactive if false
 * @fires active
 */
OO.ui.Toolbar.prototype.onToolGroupActive = function ( active ) {
	if ( active ) {
		this.activeToolGroups++;
		if ( this.activeToolGroups === 1 ) {
			this.emit( 'active', true );
		}
	} else {
		this.activeToolGroups--;
		if ( this.activeToolGroups === 0 ) {
			this.emit( 'active', false );
		}
	}
};

/**
 * Get a toolgroup by name
 *
 * @param {string} name Group name
 * @return {OO.ui.ToolGroup|null} Tool group, or null if none found by that name
 */
OO.ui.Toolbar.prototype.getToolGroupByName = function ( name ) {
	return this.groupsByName[ name ] || null;
};

/**
 * Remove all tools and toolgroups from the toolbar.
 */
OO.ui.Toolbar.prototype.reset = function () {
	var i, len;

	this.groupsByName = {};
	this.tools = {};
	for ( i = 0, len = this.items.length; i < len; i++ ) {
		this.items[ i ].destroy();
	}
	this.clearItems();
};

/**
 * Destroy the toolbar.
 *
 * Destroying the toolbar removes all event handlers and DOM elements that constitute the toolbar.
 * Call this method whenever you are done using a toolbar.
 */
OO.ui.Toolbar.prototype.destroy = function () {
	$( this.getElementWindow() ).off( 'resize', this.onWindowResizeHandler );
	this.reset();
	this.$element.remove();
};

/**
 * Check if the tool is available.
 *
 * Available tools are ones that have not yet been added to the toolbar.
 *
 * @param {string} name Symbolic name of tool
 * @return {boolean} Tool is available
 */
OO.ui.Toolbar.prototype.isToolAvailable = function ( name ) {
	return !this.tools[ name ];
};

/**
 * Prevent tool from being used again.
 *
 * @param {OO.ui.Tool} tool Tool to reserve
 */
OO.ui.Toolbar.prototype.reserveTool = function ( tool ) {
	this.tools[ tool.getName() ] = tool;
};

/**
 * Allow tool to be used again.
 *
 * @param {OO.ui.Tool} tool Tool to release
 */
OO.ui.Toolbar.prototype.releaseTool = function ( tool ) {
	delete this.tools[ tool.getName() ];
};

/**
 * Get accelerator label for tool.
 *
 * The OOUI library does not contain an accelerator system, but this is the hook for one. To
 * use an accelerator system, subclass the toolbar and override this method, which is meant to
 * return a label that describes the accelerator keys for the tool passed (by symbolic name) to
 * the method.
 *
 * @param {string} name Symbolic name of tool
 * @return {string|undefined} Tool accelerator label if available
 */
OO.ui.Toolbar.prototype.getToolAccelerator = function () {
	return undefined;
};

/**
 * Tools, together with {@link OO.ui.ToolGroup toolgroups}, constitute
 * {@link OO.ui.Toolbar toolbars}.
 * Each tool is configured with a static name, title, and icon and is customized with the command
 * to carry out when the tool is selected. Tools must also be registered with a
 * {@link OO.ui.ToolFactory tool factory}, which creates the tools on demand.
 *
 * Every Tool subclass must implement two methods:
 *
 * - {@link #onUpdateState}
 * - {@link #onSelect}
 *
 * Tools are added to toolgroups ({@link OO.ui.ListToolGroup ListToolGroup},
 * {@link OO.ui.BarToolGroup BarToolGroup}, or {@link OO.ui.MenuToolGroup MenuToolGroup}), which
 * determine how the tool is displayed in the toolbar. See {@link OO.ui.Toolbar toolbars} for an
 * example.
 *
 * For more information, please see the [OOUI documentation on MediaWiki][1].
 * [1]: https://www.mediawiki.org/wiki/OOUI/Toolbars
 *
 * @abstract
 * @class
 * @extends OO.ui.Widget
 * @mixins OO.ui.mixin.IconElement
 * @mixins OO.ui.mixin.FlaggedElement
 * @mixins OO.ui.mixin.TabIndexedElement
 *
 * @constructor
 * @param {OO.ui.ToolGroup} toolGroup
 * @param {Object} [config] Configuration options
 * @cfg {string|Function} [title] Title text or a function that returns text. If this config is
 *  omitted, the value of the {@link #static-title static title} property is used.
 *
 *  The title is used in different ways depending on the type of toolgroup that contains the tool.
 *  The title is used as a tooltip if the tool is part of a {@link OO.ui.BarToolGroup bar}
 *  toolgroup, or as the label text if the tool is part of a {@link OO.ui.ListToolGroup list} or
 *  {@link OO.ui.MenuToolGroup menu} toolgroup.
 *
 *  For bar toolgroups, a description of the accelerator key is appended to the title if an
 *  accelerator key is associated with an action by the same name as the tool and accelerator
 *  functionality has been added to the application.
 *  To add accelerator key functionality, you must subclass OO.ui.Toolbar and override the
 *  {@link OO.ui.Toolbar#getToolAccelerator getToolAccelerator} method.
 */
OO.ui.Tool = function OoUiTool( toolGroup, config ) {
	// Allow passing positional parameters inside the config object
	if ( OO.isPlainObject( toolGroup ) && config === undefined ) {
		config = toolGroup;
		toolGroup = config.toolGroup;
	}

	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.Tool.parent.call( this, config );

	// Properties
	this.toolGroup = toolGroup;
	this.toolbar = this.toolGroup.getToolbar();
	this.active = false;
	this.$title = $( '<span>' );
	this.$accel = $( '<span>' );
	this.$link = $( '<a>' );
	this.title = null;
	this.checkIcon = new OO.ui.IconWidget( {
		icon: 'check',
		classes: [ 'oo-ui-tool-checkIcon' ]
	} );

	// Mixin constructors
	OO.ui.mixin.IconElement.call( this, config );
	OO.ui.mixin.FlaggedElement.call( this, config );
	OO.ui.mixin.TabIndexedElement.call( this, $.extend( {
		$tabIndexed: this.$link
	}, config ) );

	// Events
	this.toolbar.connect( this, {
		updateState: 'onUpdateState'
	} );

	// Initialization
	this.$title.addClass( 'oo-ui-tool-title' );
	this.$accel
		.addClass( 'oo-ui-tool-accel' )
		.prop( {
			// This may need to be changed if the key names are ever localized,
			// but for now they are essentially written in English
			dir: 'ltr',
			lang: 'en'
		} );
	this.$link
		.addClass( 'oo-ui-tool-link' )
		.append( this.checkIcon.$element, this.$icon, this.$title, this.$accel )
		.attr( 'role', 'button' );

	// Don't show keyboard shortcuts on mobile as users are unlikely to have
	// a physical keyboard, and likely to have limited screen space.
	if ( !OO.ui.isMobile() ) {
		this.$link.append( this.$accel );
	}

	this.$element
		.data( 'oo-ui-tool', this )
		.addClass( 'oo-ui-tool' )
		.addClass( 'oo-ui-tool-name-' +
			this.constructor.static.name.replace( /^([^/]+)\/([^/]+).*$/, '$1-$2' ) )
		.toggleClass( 'oo-ui-tool-with-label', this.constructor.static.displayBothIconAndLabel )
		.append( this.$link );
	this.setTitle( config.title || this.constructor.static.title );
};

/* Setup */

OO.inheritClass( OO.ui.Tool, OO.ui.Widget );
OO.mixinClass( OO.ui.Tool, OO.ui.mixin.IconElement );
OO.mixinClass( OO.ui.Tool, OO.ui.mixin.FlaggedElement );
OO.mixinClass( OO.ui.Tool, OO.ui.mixin.TabIndexedElement );

/* Static Properties */

/**
 * @static
 * @inheritdoc
 */
OO.ui.Tool.static.tagName = 'span';

/**
 * Symbolic name of tool.
 *
 * The symbolic name is used internally to register the tool with a
 * {@link OO.ui.ToolFactory ToolFactory}. It can also be used when adding tools to toolgroups.
 *
 * @abstract
 * @static
 * @inheritable
 * @property {string}
 */
OO.ui.Tool.static.name = '';

/**
 * Symbolic name of the group.
 *
 * The group name is used to associate tools with each other so that they can be selected later by
 * a {@link OO.ui.ToolGroup toolgroup}.
 *
 * @abstract
 * @static
 * @inheritable
 * @property {string}
 */
OO.ui.Tool.static.group = '';

/**
 * Tool title text or a function that returns title text. The value of the static property is
 * overridden if the #title config option is used.
 *
 * @abstract
 * @static
 * @inheritable
 * @property {string|Function}
 */
OO.ui.Tool.static.title = '';

/**
 * Display both icon and label when the tool is used in a {@link OO.ui.BarToolGroup bar} toolgroup.
 * Normally only the icon is displayed, or only the label if no icon is given.
 *
 * @static
 * @inheritable
 * @property {boolean}
 */
OO.ui.Tool.static.displayBothIconAndLabel = false;

/**
 * Add tool to catch-all groups automatically.
 *
 * A catch-all group, which contains all tools that do not currently belong to a toolgroup,
 * can be included in a toolgroup using the wildcard selector, an asterisk (*).
 *
 * @static
 * @inheritable
 * @property {boolean}
 */
OO.ui.Tool.static.autoAddToCatchall = true;

/**
 * Add tool to named groups automatically.
 *
 * By default, tools that are configured with a static ‘group’ property are added
 * to that group and will be selected when the symbolic name of the group is specified (e.g., when
 * toolgroups include tools by group name).
 *
 * @static
 * @property {boolean}
 * @inheritable
 */
OO.ui.Tool.static.autoAddToGroup = true;

/**
 * Check if this tool is compatible with given data.
 *
 * This is a stub that can be overridden to provide support for filtering tools based on an
 * arbitrary piece of information  (e.g., where the cursor is in a document). The implementation
 * must also call this method so that the compatibility check can be performed.
 *
 * @static
 * @inheritable
 * @param {Mixed} data Data to check
 * @return {boolean} Tool can be used with data
 */
OO.ui.Tool.static.isCompatibleWith = function () {
	return false;
};

/* Methods */

/**
 * Handle the toolbar state being updated. This method is called when the
 * {@link OO.ui.Toolbar#event-updateState 'updateState' event} is emitted on the
 * {@link OO.ui.Toolbar Toolbar} that uses this tool, and should set the state of this tool
 * depending on application state (usually by calling #setDisabled to enable or disable the tool,
 * or #setActive to mark is as currently in-use or not).
 *
 * This is an abstract method that must be overridden in a concrete subclass.
 *
 * @method
 * @protected
 * @abstract
 */
OO.ui.Tool.prototype.onUpdateState = null;

/**
 * Handle the tool being selected. This method is called when the user triggers this tool,
 * usually by clicking on its label/icon.
 *
 * This is an abstract method that must be overridden in a concrete subclass.
 *
 * @method
 * @protected
 * @abstract
 */
OO.ui.Tool.prototype.onSelect = null;

/**
 * Check if the tool is active.
 *
 * Tools become active when their #onSelect or #onUpdateState handlers change them to appear pressed
 * with the #setActive method. Additional CSS is applied to the tool to reflect the active state.
 *
 * @return {boolean} Tool is active
 */
OO.ui.Tool.prototype.isActive = function () {
	return this.active;
};

/**
 * Make the tool appear active or inactive.
 *
 * This method should be called within #onSelect or #onUpdateState event handlers to make the tool
 * appear pressed or not.
 *
 * @param {boolean} state Make tool appear active
 */
OO.ui.Tool.prototype.setActive = function ( state ) {
	this.active = !!state;
	this.$element.toggleClass( 'oo-ui-tool-active', this.active );
	this.updateThemeClasses();
};

/**
 * Set the tool #title.
 *
 * @param {string|Function} title Title text or a function that returns text
 * @chainable
 * @return {OO.ui.Tool} The tool, for chaining
 */
OO.ui.Tool.prototype.setTitle = function ( title ) {
	this.title = OO.ui.resolveMsg( title );
	this.updateTitle();
	return this;
};

/**
 * Get the tool #title.
 *
 * @return {string} Title text
 */
OO.ui.Tool.prototype.getTitle = function () {
	return this.title;
};

/**
 * Get the tool's symbolic name.
 *
 * @return {string} Symbolic name of tool
 */
OO.ui.Tool.prototype.getName = function () {
	return this.constructor.static.name;
};

/**
 * Update the title.
 */
OO.ui.Tool.prototype.updateTitle = function () {
	var titleTooltips = this.toolGroup.constructor.static.titleTooltips,
		accelTooltips = this.toolGroup.constructor.static.accelTooltips,
		accel = this.toolbar.getToolAccelerator( this.constructor.static.name ),
		tooltipParts = [];

	this.$title.text( this.title );
	this.$accel.text( accel );

	if ( titleTooltips && typeof this.title === 'string' && this.title.length ) {
		tooltipParts.push( this.title );
	}
	if ( accelTooltips && typeof accel === 'string' && accel.length ) {
		tooltipParts.push( accel );
	}
	if ( tooltipParts.length ) {
		this.$link.attr( 'title', tooltipParts.join( ' ' ) );
	} else {
		this.$link.removeAttr( 'title' );
	}
};

/**
 * @inheritdoc OO.ui.mixin.IconElement
 */
OO.ui.Tool.prototype.setIcon = function ( icon ) {
	// Mixin method
	OO.ui.mixin.IconElement.prototype.setIcon.call( this, icon );

	this.$element.toggleClass( 'oo-ui-tool-with-icon', !!this.icon );

	return this;
};

/**
 * Destroy tool.
 *
 * Destroying the tool removes all event handlers and the tool’s DOM elements.
 * Call this method whenever you are done using a tool.
 */
OO.ui.Tool.prototype.destroy = function () {
	this.toolbar.disconnect( this );
	this.$element.remove();
};

/**
 * ToolGroups are collections of {@link OO.ui.Tool tools} that are used in a
 * {@link OO.ui.Toolbar toolbar}.
 * The type of toolgroup ({@link OO.ui.ListToolGroup list}, {@link OO.ui.BarToolGroup bar}, or
 * {@link OO.ui.MenuToolGroup menu}) to which a tool belongs determines how the tool is arranged
 * and displayed in the toolbar. Toolgroups themselves are created on demand with a
 * {@link OO.ui.ToolGroupFactory toolgroup factory}.
 *
 * Toolgroups can contain individual tools, groups of tools, or all available tools, as specified
 * using the `include` config option. See OO.ui.ToolFactory#extract on documentation of the format.
 * The options `exclude`, `promote`, and `demote` support the same formats.
 *
 * See {@link OO.ui.Toolbar toolbars} for a full example. For more information about toolbars in
 * general, please see the [OOUI documentation on MediaWiki][1].
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Toolbars
 *
 * @abstract
 * @class
 * @extends OO.ui.Widget
 * @mixins OO.ui.mixin.GroupElement
 *
 * @constructor
 * @param {OO.ui.Toolbar} toolbar
 * @param {Object} [config] Configuration options
 * @cfg {Array|string} [include] List of tools to include in the toolgroup, see above.
 * @cfg {Array|string} [exclude] List of tools to exclude from the toolgroup, see above.
 * @cfg {Array|string} [promote] List of tools to promote to the beginning of the toolgroup,
 *  see above.
 * @cfg {Array|string} [demote] List of tools to demote to the end of the toolgroup, see above.
 *  This setting is particularly useful when tools have been added to the toolgroup
 *  en masse (e.g., via the catch-all selector).
 */
OO.ui.ToolGroup = function OoUiToolGroup( toolbar, config ) {
	// Allow passing positional parameters inside the config object
	if ( OO.isPlainObject( toolbar ) && config === undefined ) {
		config = toolbar;
		toolbar = config.toolbar;
	}

	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.ToolGroup.parent.call( this, config );

	// Mixin constructors
	OO.ui.mixin.GroupElement.call( this, config );

	// Properties
	this.toolbar = toolbar;
	this.tools = {};
	this.pressed = null;
	this.autoDisabled = false;
	this.include = config.include || [];
	this.exclude = config.exclude || [];
	this.promote = config.promote || [];
	this.demote = config.demote || [];
	this.onDocumentMouseKeyUpHandler = this.onDocumentMouseKeyUp.bind( this );

	// Events
	this.$group.on( {
		mousedown: this.onMouseKeyDown.bind( this ),
		mouseup: this.onMouseKeyUp.bind( this ),
		keydown: this.onMouseKeyDown.bind( this ),
		keyup: this.onMouseKeyUp.bind( this ),
		focus: this.onMouseOverFocus.bind( this ),
		blur: this.onMouseOutBlur.bind( this ),
		mouseover: this.onMouseOverFocus.bind( this ),
		mouseout: this.onMouseOutBlur.bind( this )
	} );
	this.toolbar.getToolFactory().connect( this, {
		register: 'onToolFactoryRegister'
	} );
	this.aggregate( {
		disable: 'itemDisable'
	} );
	this.connect( this, {
		itemDisable: 'updateDisabled',
		disable: 'onDisable'
	} );

	// Initialization
	this.$group.addClass( 'oo-ui-toolGroup-tools' );
	this.$element
		.addClass( 'oo-ui-toolGroup' )
		.append( this.$group );
	this.onDisable( this.isDisabled() );
	this.populate();
};

/* Setup */

OO.inheritClass( OO.ui.ToolGroup, OO.ui.Widget );
OO.mixinClass( OO.ui.ToolGroup, OO.ui.mixin.GroupElement );

/* Events */

/**
 * @event update
 */

/**
 * @event active
 *
 * An 'active' event is emitted when any popup is shown/hidden.
 *
 * @param {boolean} The popup is visible
 */

/* Static Properties */

/**
 * Show labels in tooltips.
 *
 * @static
 * @inheritable
 * @property {boolean}
 */
OO.ui.ToolGroup.static.titleTooltips = false;

/**
 * Show acceleration labels in tooltips.
 *
 * Note: The OOUI library does not include an accelerator system, but does contain
 * a hook for one. To use an accelerator system, subclass the {@link OO.ui.Toolbar toolbar} and
 * override the {@link OO.ui.Toolbar#getToolAccelerator getToolAccelerator} method, which is
 * meant to return a label that describes the accelerator keys for a given tool (e.g., Control+M
 * key combination).
 *
 * @static
 * @inheritable
 * @property {boolean}
 */
OO.ui.ToolGroup.static.accelTooltips = false;

/**
 * Automatically disable the toolgroup when all tools are disabled
 *
 * @static
 * @inheritable
 * @property {boolean}
 */
OO.ui.ToolGroup.static.autoDisable = true;

/**
 * @abstract
 * @static
 * @inheritable
 * @property {string}
 */
OO.ui.ToolGroup.static.name = null;

/* Methods */

/**
 * @inheritdoc
 */
OO.ui.ToolGroup.prototype.isDisabled = function () {
	return this.autoDisabled ||
		OO.ui.ToolGroup.parent.prototype.isDisabled.apply( this, arguments );
};

/**
 * @inheritdoc
 */
OO.ui.ToolGroup.prototype.updateDisabled = function () {
	var i, item, allDisabled = true;

	if ( this.constructor.static.autoDisable ) {
		for ( i = this.items.length - 1; i >= 0; i-- ) {
			item = this.items[ i ];
			if ( !item.isDisabled() ) {
				allDisabled = false;
				break;
			}
		}
		this.autoDisabled = allDisabled;
	}
	OO.ui.ToolGroup.parent.prototype.updateDisabled.apply( this, arguments );
};

/**
 * Handle disable events.
 *
 * @protected
 * @param {boolean} isDisabled
 */
OO.ui.ToolGroup.prototype.onDisable = function ( isDisabled ) {
	this.$group.toggleClass( 'oo-ui-toolGroup-disabled-tools', isDisabled );
	this.$group.toggleClass( 'oo-ui-toolGroup-enabled-tools', !isDisabled );
};

/**
 * Handle mouse down and key down events.
 *
 * @protected
 * @param {jQuery.Event} e Mouse down or key down event
 * @return {undefined|boolean} False to prevent default if event is handled
 */
OO.ui.ToolGroup.prototype.onMouseKeyDown = function ( e ) {
	if (
		!this.isDisabled() && (
			e.which === OO.ui.MouseButtons.LEFT ||
			e.which === OO.ui.Keys.SPACE ||
			e.which === OO.ui.Keys.ENTER
		)
	) {
		this.pressed = this.findTargetTool( e );
		if ( this.pressed ) {
			this.pressed.setActive( true );
			this.getElementDocument().addEventListener(
				'mouseup',
				this.onDocumentMouseKeyUpHandler,
				true
			);
			this.getElementDocument().addEventListener(
				'keyup',
				this.onDocumentMouseKeyUpHandler,
				true
			);
			return false;
		}
	}
};

/**
 * Handle document mouse up and key up events.
 *
 * @protected
 * @param {MouseEvent|KeyboardEvent} e Mouse up or key up event
 */
OO.ui.ToolGroup.prototype.onDocumentMouseKeyUp = function ( e ) {
	this.getElementDocument().removeEventListener(
		'mouseup',
		this.onDocumentMouseKeyUpHandler,
		true
	);
	this.getElementDocument().removeEventListener(
		'keyup',
		this.onDocumentMouseKeyUpHandler,
		true
	);
	// onMouseKeyUp may be called a second time, depending on where the mouse is when the button is
	// released, but since `this.pressed` will no longer be true, the second call will be ignored.
	this.onMouseKeyUp( e );
};

/**
 * Handle mouse up and key up events.
 *
 * @protected
 * @param {MouseEvent|KeyboardEvent} e Mouse up or key up event
 */
OO.ui.ToolGroup.prototype.onMouseKeyUp = function ( e ) {
	var tool = this.findTargetTool( e );

	if (
		!this.isDisabled() && this.pressed && this.pressed === tool && (
			e.which === OO.ui.MouseButtons.LEFT ||
			e.which === OO.ui.Keys.SPACE ||
			e.which === OO.ui.Keys.ENTER
		)
	) {
		this.pressed.onSelect();
		this.pressed = null;
		e.preventDefault();
		e.stopPropagation();
	}

	this.pressed = null;
};

/**
 * Handle mouse over and focus events.
 *
 * @protected
 * @param {jQuery.Event} e Mouse over or focus event
 */
OO.ui.ToolGroup.prototype.onMouseOverFocus = function ( e ) {
	var tool = this.findTargetTool( e );

	if ( this.pressed && this.pressed === tool ) {
		this.pressed.setActive( true );
	}
};

/**
 * Handle mouse out and blur events.
 *
 * @protected
 * @param {jQuery.Event} e Mouse out or blur event
 */
OO.ui.ToolGroup.prototype.onMouseOutBlur = function ( e ) {
	var tool = this.findTargetTool( e );

	if ( this.pressed && this.pressed === tool ) {
		this.pressed.setActive( false );
	}
};

/**
 * Get the closest tool to a jQuery.Event.
 *
 * Only tool links are considered, which prevents other elements in the tool such as popups from
 * triggering tool group interactions.
 *
 * @private
 * @param {jQuery.Event} e
 * @return {OO.ui.Tool|null} Tool, `null` if none was found
 */
OO.ui.ToolGroup.prototype.findTargetTool = function ( e ) {
	var tool,
		$item = $( e.target ).closest( '.oo-ui-tool-link' );

	if ( $item.length ) {
		tool = $item.parent().data( 'oo-ui-tool' );
	}

	return tool && !tool.isDisabled() ? tool : null;
};

/**
 * Handle tool registry register events.
 *
 * If a tool is registered after the group is created, we must repopulate the list to account for:
 *
 * - a tool being added that may be included
 * - a tool already included being overridden
 *
 * @protected
 * @param {string} name Symbolic name of tool
 */
OO.ui.ToolGroup.prototype.onToolFactoryRegister = function () {
	this.populate();
};

/**
 * Get the toolbar that contains the toolgroup.
 *
 * @return {OO.ui.Toolbar} Toolbar that contains the toolgroup
 */
OO.ui.ToolGroup.prototype.getToolbar = function () {
	return this.toolbar;
};

/**
 * Add and remove tools based on configuration.
 */
OO.ui.ToolGroup.prototype.populate = function () {
	var i, len, name, tool,
		toolFactory = this.toolbar.getToolFactory(),
		names = {},
		add = [],
		remove = [],
		list = this.toolbar.getToolFactory().getTools(
			this.include, this.exclude, this.promote, this.demote
		);

	// Build a list of needed tools
	for ( i = 0, len = list.length; i < len; i++ ) {
		name = list[ i ];
		if (
			// Tool exists
			toolFactory.lookup( name ) &&
			// Tool is available or is already in this group
			( this.toolbar.isToolAvailable( name ) || this.tools[ name ] )
		) {
			// Hack to prevent infinite recursion via ToolGroupTool. We need to reserve the tool
			// before creating it, but we can't call reserveTool() yet because we haven't created
			// the tool.
			this.toolbar.tools[ name ] = true;
			tool = this.tools[ name ];
			if ( !tool ) {
				// Auto-initialize tools on first use
				this.tools[ name ] = tool = toolFactory.create( name, this );
				tool.updateTitle();
			}
			this.toolbar.reserveTool( tool );
			add.push( tool );
			names[ name ] = true;
		}
	}
	// Remove tools that are no longer needed
	for ( name in this.tools ) {
		if ( !names[ name ] ) {
			this.tools[ name ].destroy();
			this.toolbar.releaseTool( this.tools[ name ] );
			remove.push( this.tools[ name ] );
			delete this.tools[ name ];
		}
	}
	if ( remove.length ) {
		this.removeItems( remove );
	}
	// Update emptiness state
	if ( add.length ) {
		this.$element.removeClass( 'oo-ui-toolGroup-empty' );
	} else {
		this.$element.addClass( 'oo-ui-toolGroup-empty' );
	}
	// Re-add tools (moving existing ones to new locations)
	this.addItems( add );
	// Disabled state may depend on items
	this.updateDisabled();
};

/**
 * Destroy toolgroup.
 */
OO.ui.ToolGroup.prototype.destroy = function () {
	var name;

	this.clearItems();
	this.toolbar.getToolFactory().disconnect( this );
	for ( name in this.tools ) {
		this.toolbar.releaseTool( this.tools[ name ] );
		this.tools[ name ].disconnect( this ).destroy();
		delete this.tools[ name ];
	}
	this.$element.remove();
};

/**
 * A ToolFactory creates tools on demand. All tools ({@link OO.ui.Tool Tools},
 * {@link OO.ui.PopupTool PopupTools}, and {@link OO.ui.ToolGroupTool ToolGroupTools}) must be
 * registered with a tool factory. Tools are registered by their symbolic name. See
 * {@link OO.ui.Toolbar toolbars} for an example.
 *
 * For more information about toolbars in general, please see the
 * [OOUI documentation on MediaWiki][1].
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Toolbars
 *
 * @class
 * @extends OO.Factory
 * @constructor
 */
OO.ui.ToolFactory = function OoUiToolFactory() {
	// Parent constructor
	OO.ui.ToolFactory.parent.call( this );
};

/* Setup */

OO.inheritClass( OO.ui.ToolFactory, OO.Factory );

/* Methods */

/**
 * Get tools from the factory.
 *
 * @param {Array|string} [include] Included tools, see #extract for format
 * @param {Array|string} [exclude] Excluded tools, see #extract for format
 * @param {Array|string} [promote] Promoted tools, see #extract for format
 * @param {Array|string} [demote] Demoted tools, see #extract for format
 * @return {string[]} List of tools
 */
OO.ui.ToolFactory.prototype.getTools = function ( include, exclude, promote, demote ) {
	var i, len, included, promoted, demoted,
		auto = [],
		used = {};

	// Collect included and not excluded tools
	included = OO.simpleArrayDifference( this.extract( include ), this.extract( exclude ) );

	// Promotion
	promoted = this.extract( promote, used );
	demoted = this.extract( demote, used );

	// Auto
	for ( i = 0, len = included.length; i < len; i++ ) {
		if ( !used[ included[ i ] ] ) {
			auto.push( included[ i ] );
		}
	}

	return promoted.concat( auto ).concat( demoted );
};

/**
 * Get a flat list of names from a list of names or groups.
 *
 * Normally, `collection` is an array of tool specifications. Tools can be specified in the
 * following ways:
 *
 * - To include an individual tool, use the symbolic name: `{ name: 'tool-name' }` or `'tool-name'`.
 * - To include all tools in a group, use the group name: `{ group: 'group-name' }`. (To assign the
 *   tool to a group, use OO.ui.Tool.static.group.)
 *
 * Alternatively, to include all tools that are not yet assigned to any other toolgroup, use the
 * catch-all selector `'*'`.
 *
 * If `used` is passed, tool names that appear as properties in this object will be considered
 * already assigned, and will not be returned even if specified otherwise. The tool names extracted
 * by this function call will be added as new properties in the object.
 *
 * @private
 * @param {Array|string} collection List of tools, see above
 * @param {Object} [used] Object containing information about used tools, see above
 * @return {string[]} List of extracted tool names
 */
OO.ui.ToolFactory.prototype.extract = function ( collection, used ) {
	var i, len, item, name, tool,
		names = [];

	collection = !Array.isArray( collection ) ? [ collection ] : collection;

	for ( i = 0, len = collection.length; i < len; i++ ) {
		item = collection[ i ];
		if ( item === '*' ) {
			for ( name in this.registry ) {
				tool = this.registry[ name ];
				if (
					// Only add tools by group name when auto-add is enabled
					tool.static.autoAddToCatchall &&
					// Exclude already used tools
					( !used || !used[ name ] )
				) {
					names.push( name );
					if ( used ) {
						used[ name ] = true;
					}
				}
			}
		} else {
			// Allow plain strings as shorthand for named tools
			if ( typeof item === 'string' ) {
				item = { name: item };
			}
			if ( OO.isPlainObject( item ) ) {
				if ( item.group ) {
					for ( name in this.registry ) {
						tool = this.registry[ name ];
						if (
							// Include tools with matching group
							tool.static.group === item.group &&
							// Only add tools by group name when auto-add is enabled
							tool.static.autoAddToGroup &&
							// Exclude already used tools
							( !used || !used[ name ] )
						) {
							names.push( name );
							if ( used ) {
								used[ name ] = true;
							}
						}
					}
				// Include tools with matching name and exclude already used tools
				} else if ( item.name && ( !used || !used[ item.name ] ) ) {
					names.push( item.name );
					if ( used ) {
						used[ item.name ] = true;
					}
				}
			}
		}
	}
	return names;
};

/**
 * ToolGroupFactories create {@link OO.ui.ToolGroup toolgroups} on demand. The toolgroup classes
 * must specify a symbolic name and be registered with the factory. The following classes are
 * registered by default:
 *
 * - {@link OO.ui.BarToolGroup BarToolGroups} (‘bar’)
 * - {@link OO.ui.MenuToolGroup MenuToolGroups} (‘menu’)
 * - {@link OO.ui.ListToolGroup ListToolGroups} (‘list’)
 *
 * See {@link OO.ui.Toolbar toolbars} for an example.
 *
 * For more information about toolbars in general, please see the
 * [OOUI documentation on MediaWiki][1].
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Toolbars
 *
 * @class
 * @extends OO.Factory
 * @constructor
 */
OO.ui.ToolGroupFactory = function OoUiToolGroupFactory() {
	var i, l, defaultClasses;
	// Parent constructor
	OO.Factory.call( this );

	defaultClasses = this.constructor.static.getDefaultClasses();

	// Register default toolgroups
	for ( i = 0, l = defaultClasses.length; i < l; i++ ) {
		this.register( defaultClasses[ i ] );
	}
};

/* Setup */

OO.inheritClass( OO.ui.ToolGroupFactory, OO.Factory );

/* Static Methods */

/**
 * Get a default set of classes to be registered on construction.
 *
 * @return {Function[]} Default classes
 */
OO.ui.ToolGroupFactory.static.getDefaultClasses = function () {
	return [
		OO.ui.BarToolGroup,
		OO.ui.ListToolGroup,
		OO.ui.MenuToolGroup
	];
};

/**
 * Popup tools open a popup window when they are selected from the {@link OO.ui.Toolbar toolbar}.
 * Each popup tool is configured with a static name, title, and icon, as well with as any popup
 * configurations. Unlike other tools, popup tools do not require that developers specify an
 * #onSelect or #onUpdateState method, as these methods have been implemented already.
 *
 *     // Example of a popup tool. When selected, a popup tool displays
 *     // a popup window.
 *     function HelpTool( toolGroup, config ) {
 *        OO.ui.PopupTool.call( this, toolGroup, $.extend( { popup: {
 *            padded: true,
 *            label: 'Help',
 *            head: true
 *        } }, config ) );
 *        this.popup.$body.append( '<p>I am helpful!</p>' );
 *     };
 *     OO.inheritClass( HelpTool, OO.ui.PopupTool );
 *     HelpTool.static.name = 'help';
 *     HelpTool.static.icon = 'help';
 *     HelpTool.static.title = 'Help';
 *     toolFactory.register( HelpTool );
 *
 * For an example of a toolbar that contains a popup tool, see {@link OO.ui.Toolbar toolbars}.
 * For more information about toolbars in general, please see the
 * [OOUI documentation on MediaWiki][1].
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Toolbars
 *
 * @abstract
 * @class
 * @extends OO.ui.Tool
 * @mixins OO.ui.mixin.PopupElement
 *
 * @constructor
 * @param {OO.ui.ToolGroup} toolGroup
 * @param {Object} [config] Configuration options
 */
OO.ui.PopupTool = function OoUiPopupTool( toolGroup, config ) {
	// Allow passing positional parameters inside the config object
	if ( OO.isPlainObject( toolGroup ) && config === undefined ) {
		config = toolGroup;
		toolGroup = config.toolGroup;
	}

	// Parent constructor
	OO.ui.PopupTool.parent.call( this, toolGroup, config );

	// Mixin constructors
	OO.ui.mixin.PopupElement.call( this, config );

	// Events
	this.popup.connect( this, {
		toggle: 'onPopupToggle'
	} );

	// Initialization
	this.popup.setAutoFlip( false );
	this.popup.setPosition( toolGroup.getToolbar().position === 'bottom' ? 'above' : 'below' );
	this.$element.addClass( 'oo-ui-popupTool' );
	this.popup.$element.addClass( 'oo-ui-popupTool-popup' );
	this.toolbar.$popups.append( this.popup.$element );
};

/* Setup */

OO.inheritClass( OO.ui.PopupTool, OO.ui.Tool );
OO.mixinClass( OO.ui.PopupTool, OO.ui.mixin.PopupElement );

/* Methods */

/**
 * Handle the tool being selected.
 *
 * @inheritdoc
 */
OO.ui.PopupTool.prototype.onSelect = function () {
	if ( !this.isDisabled() ) {
		this.popup.toggle();
	}
	return false;
};

/**
 * Handle the toolbar state being updated.
 *
 * @inheritdoc
 */
OO.ui.PopupTool.prototype.onUpdateState = function () {
};

/**
 * Handle popup visibility being toggled.
 *
 * @param {boolean} isVisible
 */
OO.ui.PopupTool.prototype.onPopupToggle = function ( isVisible ) {
	this.setActive( isVisible );
	this.toolGroup.emit( 'active', isVisible );
};

/**
 * A ToolGroupTool is a special sort of tool that can contain other {@link OO.ui.Tool tools}
 * and {@link OO.ui.ToolGroup toolgroups}. The ToolGroupTool was specifically designed to be used
 * inside a {@link OO.ui.BarToolGroup bar} toolgroup to provide access to additional tools from
 * the bar item. Included tools will be displayed in a dropdown {@link OO.ui.ListToolGroup list}
 * when the ToolGroupTool is selected.
 *
 *     // Example: ToolGroupTool with two nested tools, 'setting1' and 'setting2',
 *     // defined elsewhere.
 *
 *     function SettingsTool() {
 *         SettingsTool.parent.apply( this, arguments );
 *     };
 *     OO.inheritClass( SettingsTool, OO.ui.ToolGroupTool );
 *     SettingsTool.static.name = 'settings';
 *     SettingsTool.static.title = 'Change settings';
 *     SettingsTool.static.groupConfig = {
 *         icon: 'settings',
 *         label: 'ToolGroupTool',
 *         include: [  'setting1', 'setting2'  ]
 *     };
 *     toolFactory.register( SettingsTool );
 *
 * For more information, please see the [OOUI documentation on MediaWiki][1].
 *
 * Please note that this implementation is subject to change per [T74159] [2].
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Toolbars#ToolGroupTool
 * [2]: https://phabricator.wikimedia.org/T74159
 *
 * @abstract
 * @class
 * @extends OO.ui.Tool
 *
 * @constructor
 * @param {OO.ui.ToolGroup} toolGroup
 * @param {Object} [config] Configuration options
 */
OO.ui.ToolGroupTool = function OoUiToolGroupTool( toolGroup, config ) {
	// Allow passing positional parameters inside the config object
	if ( OO.isPlainObject( toolGroup ) && config === undefined ) {
		config = toolGroup;
		toolGroup = config.toolGroup;
	}

	// Parent constructor
	OO.ui.ToolGroupTool.parent.call( this, toolGroup, config );

	// Properties
	this.innerToolGroup = this.createGroup( this.constructor.static.groupConfig );

	// Events
	this.innerToolGroup.connect( this, {
		disable: 'onToolGroupDisable',
		// Re-emit active events from the innerToolGroup on the parent toolGroup
		active: this.toolGroup.emit.bind( this.toolGroup, 'active' )
	} );

	// Initialization
	this.$link.remove();
	this.$element
		.addClass( 'oo-ui-toolGroupTool' )
		.append( this.innerToolGroup.$element );
};

/* Setup */

OO.inheritClass( OO.ui.ToolGroupTool, OO.ui.Tool );

/* Static Properties */

/**
 * Toolgroup configuration.
 *
 * The toolgroup configuration consists of the tools to include, as well as an icon and label
 * to use for the bar item. Tools can be included by symbolic name, group, or with the
 * wildcard selector. Please see {@link OO.ui.ToolGroup toolgroup} for more information.
 *
 * @property {Object.<string,Array>}
 */
OO.ui.ToolGroupTool.static.groupConfig = {};

/* Methods */

/**
 * Handle the tool being selected.
 *
 * @inheritdoc
 */
OO.ui.ToolGroupTool.prototype.onSelect = function () {
	this.innerToolGroup.setActive( !this.innerToolGroup.active );
	return false;
};

/**
 * Synchronize disabledness state of the tool with the inner toolgroup.
 *
 * @private
 * @param {boolean} disabled Element is disabled
 */
OO.ui.ToolGroupTool.prototype.onToolGroupDisable = function ( disabled ) {
	this.setDisabled( disabled );
};

/**
 * Handle the toolbar state being updated.
 *
 * @inheritdoc
 */
OO.ui.ToolGroupTool.prototype.onUpdateState = function () {
	this.setActive( false );
};

/**
 * Build a {@link OO.ui.ToolGroup toolgroup} from the specified configuration.
 *
 * @param {Object.<string,Array>} group Toolgroup configuration. Please see
 *  {@link OO.ui.ToolGroup toolgroup} for more information.
 * @return {OO.ui.ListToolGroup}
 */
OO.ui.ToolGroupTool.prototype.createGroup = function ( group ) {
	if ( group.include === '*' ) {
		// Apply defaults to catch-all groups
		if ( group.label === undefined ) {
			group.label = OO.ui.msg( 'ooui-toolbar-more' );
		}
	}

	return this.toolbar.getToolGroupFactory().create( 'list', this.toolbar, group );
};

/**
 * BarToolGroups are one of three types of {@link OO.ui.ToolGroup toolgroups} that are used to
 * create {@link OO.ui.Toolbar toolbars} (the other types of groups are
 * {@link OO.ui.MenuToolGroup MenuToolGroup} and {@link OO.ui.ListToolGroup ListToolGroup}).
 * The {@link OO.ui.Tool tools} in a BarToolGroup are displayed by icon in a single row. The
 * title of the tool is displayed when users move the mouse over the tool.
 *
 * BarToolGroups are created by a {@link OO.ui.ToolGroupFactory tool group factory} when the toolbar
 * is set up.
 *
 *     @example
 *     // Example of a BarToolGroup with two tools
 *     var toolFactory = new OO.ui.ToolFactory();
 *     var toolGroupFactory = new OO.ui.ToolGroupFactory();
 *     var toolbar = new OO.ui.Toolbar( toolFactory, toolGroupFactory );
 *
 *     // We will be placing status text in this element when tools are used
 *     var $area = $( '<p>' ).text( 'Example of a BarToolGroup with two tools.' );
 *
 *     // Define the tools that we're going to place in our toolbar
 *
 *     // Create a class inheriting from OO.ui.Tool
 *     function SearchTool() {
 *         SearchTool.parent.apply( this, arguments );
 *     }
 *     OO.inheritClass( SearchTool, OO.ui.Tool );
 *     // Each tool must have a 'name' (used as an internal identifier, see later) and at least one
 *     // of 'icon' and 'title' (displayed icon and text).
 *     SearchTool.static.name = 'search';
 *     SearchTool.static.icon = 'search';
 *     SearchTool.static.title = 'Search...';
 *     // Defines the action that will happen when this tool is selected (clicked).
 *     SearchTool.prototype.onSelect = function () {
 *         $area.text( 'Search tool clicked!' );
 *         // Never display this tool as "active" (selected).
 *         this.setActive( false );
 *     };
 *     SearchTool.prototype.onUpdateState = function () {};
 *     // Make this tool available in our toolFactory and thus our toolbar
 *     toolFactory.register( SearchTool );
 *
 *     // This is a PopupTool. Rather than having a custom 'onSelect' action, it will display a
 *     // little popup window (a PopupWidget).
 *     function HelpTool( toolGroup, config ) {
 *         OO.ui.PopupTool.call( this, toolGroup, $.extend( { popup: {
 *             padded: true,
 *             label: 'Help',
 *             head: true
 *         } }, config ) );
 *         this.popup.$body.append( '<p>I am helpful!</p>' );
 *     }
 *     OO.inheritClass( HelpTool, OO.ui.PopupTool );
 *     HelpTool.static.name = 'help';
 *     HelpTool.static.icon = 'help';
 *     HelpTool.static.title = 'Help';
 *     toolFactory.register( HelpTool );
 *
 *     // Finally define which tools and in what order appear in the toolbar. Each tool may only be
 *     // used once (but not all defined tools must be used).
 *     toolbar.setup( [
 *         {
 *             // 'bar' tool groups display tools by icon only
 *             type: 'bar',
 *             include: [ 'search', 'help' ]
 *         }
 *     ] );
 *
 *     // Create some UI around the toolbar and place it in the document
 *     var frame = new OO.ui.PanelLayout( {
 *         expanded: false,
 *         framed: true
 *     } );
 *     var contentFrame = new OO.ui.PanelLayout( {
 *         expanded: false,
 *         padded: true
 *     } );
 *     frame.$element.append(
 *         toolbar.$element,
 *         contentFrame.$element.append( $area )
 *     );
 *     $( document.body ).append( frame.$element );
 *
 *     // Here is where the toolbar is actually built. This must be done after inserting it into the
 *     // document.
 *     toolbar.initialize();
 *
 * For more information about how to add tools to a bar tool group, please see
 * {@link OO.ui.ToolGroup toolgroup}.
 * For more information about toolbars in general, please see the
 * [OOUI documentation on MediaWiki][1].
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Toolbars
 *
 * @class
 * @extends OO.ui.ToolGroup
 *
 * @constructor
 * @param {OO.ui.Toolbar} toolbar
 * @param {Object} [config] Configuration options
 */
OO.ui.BarToolGroup = function OoUiBarToolGroup( toolbar, config ) {
	// Allow passing positional parameters inside the config object
	if ( OO.isPlainObject( toolbar ) && config === undefined ) {
		config = toolbar;
		toolbar = config.toolbar;
	}

	// Parent constructor
	OO.ui.BarToolGroup.parent.call( this, toolbar, config );

	// Initialization
	this.$element.addClass( 'oo-ui-barToolGroup' );
	this.$group.addClass( 'oo-ui-barToolGroup-tools' );
};

/* Setup */

OO.inheritClass( OO.ui.BarToolGroup, OO.ui.ToolGroup );

/* Static Properties */

/**
 * @static
 * @inheritdoc
 */
OO.ui.BarToolGroup.static.titleTooltips = true;

/**
 * @static
 * @inheritdoc
 */
OO.ui.BarToolGroup.static.accelTooltips = true;

/**
 * @static
 * @inheritdoc
 */
OO.ui.BarToolGroup.static.name = 'bar';

/**
 * PopupToolGroup is an abstract base class used by both {@link OO.ui.MenuToolGroup MenuToolGroup}
 * and {@link OO.ui.ListToolGroup ListToolGroup} to provide a popup (an overlaid menu or list of
 * tools with an optional icon and label). This class can be used for other base classes that
 * also use this functionality.
 *
 * @abstract
 * @class
 * @extends OO.ui.ToolGroup
 * @mixins OO.ui.mixin.IconElement
 * @mixins OO.ui.mixin.IndicatorElement
 * @mixins OO.ui.mixin.LabelElement
 * @mixins OO.ui.mixin.TitledElement
 * @mixins OO.ui.mixin.FlaggedElement
 * @mixins OO.ui.mixin.ClippableElement
 * @mixins OO.ui.mixin.FloatableElement
 * @mixins OO.ui.mixin.TabIndexedElement
 *
 * @constructor
 * @param {OO.ui.Toolbar} toolbar
 * @param {Object} [config] Configuration options
 * @cfg {string} [header] Text to display at the top of the popup
 */
OO.ui.PopupToolGroup = function OoUiPopupToolGroup( toolbar, config ) {
	// Allow passing positional parameters inside the config object
	if ( OO.isPlainObject( toolbar ) && config === undefined ) {
		config = toolbar;
		toolbar = config.toolbar;
	}

	// Configuration initialization
	config = $.extend( {
		indicator: config.indicator === undefined ?
			( toolbar.position === 'bottom' ? 'up' : 'down' ) : config.indicator
	}, config );

	// Parent constructor
	OO.ui.PopupToolGroup.parent.call( this, toolbar, config );

	// Properties
	this.active = false;
	this.dragging = false;
	// Don't conflict with parent method of the same name
	this.onPopupDocumentMouseKeyUpHandler = this.onPopupDocumentMouseKeyUp.bind( this );
	this.$handle = $( '<span>' );

	// Mixin constructors
	OO.ui.mixin.IconElement.call( this, config );
	OO.ui.mixin.IndicatorElement.call( this, config );
	OO.ui.mixin.LabelElement.call( this, config );
	OO.ui.mixin.TitledElement.call( this, config );
	OO.ui.mixin.FlaggedElement.call( this, config );
	OO.ui.mixin.ClippableElement.call( this, $.extend( {
		$clippable: this.$group
	}, config ) );
	OO.ui.mixin.FloatableElement.call( this, $.extend( {
		$floatable: this.$group,
		$floatableContainer: this.$handle,
		hideWhenOutOfView: false,
		verticalPosition: this.toolbar.position === 'bottom' ? 'above' : 'below'
	}, config ) );
	OO.ui.mixin.TabIndexedElement.call( this, $.extend( {
		$tabIndexed: this.$handle
	}, config ) );

	// Events
	this.$handle.on( {
		keydown: this.onHandleMouseKeyDown.bind( this ),
		keyup: this.onHandleMouseKeyUp.bind( this ),
		mousedown: this.onHandleMouseKeyDown.bind( this ),
		mouseup: this.onHandleMouseKeyUp.bind( this )
	} );

	// Initialization
	this.$handle
		.addClass( 'oo-ui-popupToolGroup-handle' )
		.attr( 'role', 'button' )
		.append( this.$icon, this.$label, this.$indicator );
	// If the pop-up should have a header, add it to the top of the toolGroup.
	// Note: If this feature is useful for other widgets, we could abstract it into an
	// OO.ui.HeaderedElement mixin constructor.
	if ( config.header !== undefined ) {
		this.$group
			.prepend( $( '<span>' )
				.addClass( 'oo-ui-popupToolGroup-header' )
				.text( config.header )
			);
	}
	this.$element
		.addClass( 'oo-ui-popupToolGroup' )
		.prepend( this.$handle );
	this.$group.addClass( 'oo-ui-popupToolGroup-tools' );
	this.toolbar.$popups.append( this.$group );
};

/* Setup */

OO.inheritClass( OO.ui.PopupToolGroup, OO.ui.ToolGroup );
OO.mixinClass( OO.ui.PopupToolGroup, OO.ui.mixin.IconElement );
OO.mixinClass( OO.ui.PopupToolGroup, OO.ui.mixin.IndicatorElement );
OO.mixinClass( OO.ui.PopupToolGroup, OO.ui.mixin.LabelElement );
OO.mixinClass( OO.ui.PopupToolGroup, OO.ui.mixin.TitledElement );
OO.mixinClass( OO.ui.PopupToolGroup, OO.ui.mixin.FlaggedElement );
OO.mixinClass( OO.ui.PopupToolGroup, OO.ui.mixin.ClippableElement );
OO.mixinClass( OO.ui.PopupToolGroup, OO.ui.mixin.FloatableElement );
OO.mixinClass( OO.ui.PopupToolGroup, OO.ui.mixin.TabIndexedElement );

/* Methods */

/**
 * @inheritdoc
 */
OO.ui.PopupToolGroup.prototype.setDisabled = function () {
	// Parent method
	OO.ui.PopupToolGroup.parent.prototype.setDisabled.apply( this, arguments );

	if ( this.isDisabled() && this.isElementAttached() ) {
		this.setActive( false );
	}
};

/**
 * Handle document mouse up and key up events.
 *
 * @protected
 * @param {MouseEvent|KeyboardEvent} e Mouse up or key up event
 */
OO.ui.PopupToolGroup.prototype.onPopupDocumentMouseKeyUp = function ( e ) {
	var $target = $( e.target );
	// Only deactivate when clicking outside the dropdown element
	if ( $target.closest( '.oo-ui-popupToolGroup' )[ 0 ] === this.$element[ 0 ] ) {
		return;
	}
	if ( $target.closest( '.oo-ui-popupToolGroup-tools' )[ 0 ] === this.$group[ 0 ] ) {
		return;
	}
	this.setActive( false );
};

/**
 * @inheritdoc
 */
OO.ui.PopupToolGroup.prototype.onMouseKeyUp = function ( e ) {
	// Only close toolgroup when a tool was actually selected
	if (
		!this.isDisabled() && this.pressed && this.pressed === this.findTargetTool( e ) && (
			e.which === OO.ui.MouseButtons.LEFT ||
			e.which === OO.ui.Keys.SPACE ||
			e.which === OO.ui.Keys.ENTER
		)
	) {
		this.setActive( false );
	}
	return OO.ui.PopupToolGroup.parent.prototype.onMouseKeyUp.call( this, e );
};

/**
 * @inheritdoc
 */
OO.ui.PopupToolGroup.prototype.onMouseKeyDown = function ( e ) {
	var $focused, $firstFocusable, $lastFocusable;
	// Shift-Tab on the first tool in the group jumps to the handle.
	// Tab on the last tool in the group jumps to the next group.
	if ( !this.isDisabled() && e.which === OO.ui.Keys.TAB ) {
		// We can't use this.items because ListToolGroup inserts the extra fake
		// expand/collapse tool.
		$focused = $( document.activeElement );
		$firstFocusable = OO.ui.findFocusable( this.$group );
		if ( $focused[ 0 ] === $firstFocusable[ 0 ] && e.shiftKey ) {
			this.$handle.trigger( 'focus' );
			return false;
		}
		$lastFocusable = OO.ui.findFocusable( this.$group, true );
		if ( $focused[ 0 ] === $lastFocusable[ 0 ] && !e.shiftKey ) {
			// Focus this group's handle and let the browser's tab handling happen
			// (no 'return false').
			// This way we don't have to fiddle with other ToolGroups' business, or worry what to do
			// if the next group is not a PopupToolGroup or doesn't exist at all.
			this.$handle.trigger( 'focus' );
			// Close the popup so that we don't move back inside it (if this is the last group).
			this.setActive( false );
		}
	}
	return OO.ui.PopupToolGroup.parent.prototype.onMouseKeyDown.call( this, e );
};

/**
 * Handle mouse up and key up events.
 *
 * @protected
 * @param {jQuery.Event} e Mouse up or key up event
 * @return {undefined|boolean} False to prevent default if event is handled
 */
OO.ui.PopupToolGroup.prototype.onHandleMouseKeyUp = function ( e ) {
	if (
		!this.isDisabled() && (
			e.which === OO.ui.MouseButtons.LEFT ||
			e.which === OO.ui.Keys.SPACE ||
			e.which === OO.ui.Keys.ENTER
		)
	) {
		return false;
	}
};

/**
 * Handle mouse down and key down events.
 *
 * @protected
 * @param {jQuery.Event} e Mouse down or key down event
 * @return {undefined|boolean} False to prevent default if event is handled
 */
OO.ui.PopupToolGroup.prototype.onHandleMouseKeyDown = function ( e ) {
	var $focusable;
	if ( !this.isDisabled() ) {
		// Tab on the handle jumps to the first tool in the group (if the popup is open).
		if ( e.which === OO.ui.Keys.TAB && !e.shiftKey ) {
			$focusable = OO.ui.findFocusable( this.$group );
			if ( $focusable.length ) {
				$focusable.trigger( 'focus' );
				return false;
			}
		}
		if (
			e.which === OO.ui.MouseButtons.LEFT ||
			e.which === OO.ui.Keys.SPACE ||
			e.which === OO.ui.Keys.ENTER
		) {
			this.setActive( !this.active );
			return false;
		}
	}
};

/**
 * Check if the tool group is active.
 *
 * @return {boolean} Tool group is active
 */
OO.ui.PopupToolGroup.prototype.isActive = function () {
	return this.active;
};

/**
 * Switch into 'active' mode.
 *
 * When active, the popup is visible. A mouseup event anywhere in the document will trigger
 * deactivation.
 *
 * @param {boolean} value The active state to set
 * @fires active
 */
OO.ui.PopupToolGroup.prototype.setActive = function ( value ) {
	var containerWidth, containerLeft;
	value = !!value;
	if ( this.active !== value ) {
		this.active = value;
		if ( value ) {
			this.getElementDocument().addEventListener(
				'mouseup',
				this.onPopupDocumentMouseKeyUpHandler,
				true
			);
			this.getElementDocument().addEventListener(
				'keyup',
				this.onPopupDocumentMouseKeyUpHandler,
				true
			);

			this.$clippable.css( 'left', '' );
			this.$element.addClass( 'oo-ui-popupToolGroup-active' );
			this.$group.addClass( 'oo-ui-popupToolGroup-active-tools' );
			this.togglePositioning( true );
			this.toggleClipping( true );

			// Try anchoring the popup to the left first
			this.setHorizontalPosition( 'start' );

			if ( this.isClippedHorizontally() || this.isFloatableOutOfView() ) {
				// Anchoring to the left caused the popup to clip, so anchor it to the
				// right instead.
				this.setHorizontalPosition( 'end' );
			}
			if ( this.isClippedHorizontally() || this.isFloatableOutOfView() ) {
				// Anchoring to the right also caused the popup to clip, so just make it fill the
				// container.
				containerWidth = this.$clippableScrollableContainer.width();
				containerLeft = this.$clippableScrollableContainer[ 0 ] ===
					document.documentElement ?
					0 :
					this.$clippableScrollableContainer.offset().left;

				this.toggleClipping( false );
				this.setHorizontalPosition( 'start' );

				this.$clippable.css( {
					'margin-left': -( this.$element.offset().left - containerLeft ),
					width: containerWidth
				} );
			}
		} else {
			this.getElementDocument().removeEventListener(
				'mouseup',
				this.onPopupDocumentMouseKeyUpHandler,
				true
			);
			this.getElementDocument().removeEventListener(
				'keyup',
				this.onPopupDocumentMouseKeyUpHandler,
				true
			);
			this.$element.removeClass( 'oo-ui-popupToolGroup-active' );
			this.$group.removeClass( 'oo-ui-popupToolGroup-active-tools' );
			this.togglePositioning( false );
			this.toggleClipping( false );
		}
		this.emit( 'active', this.active );
		this.updateThemeClasses();
	}
};

/**
 * ListToolGroups are one of three types of {@link OO.ui.ToolGroup toolgroups} that are used to
 * create {@link OO.ui.Toolbar toolbars} (the other types of groups are
 * {@link OO.ui.MenuToolGroup MenuToolGroup} and {@link OO.ui.BarToolGroup BarToolGroup}).
 * The {@link OO.ui.Tool tools} in a ListToolGroup are displayed by label in a dropdown menu.
 * The title of the tool is used as the label text. The menu itself can be configured with a label,
 * icon, indicator, header, and title.
 *
 * ListToolGroups can be configured to be expanded and collapsed. Collapsed lists will have a
 * ‘More’ option that users can select to see the full list of tools. If a collapsed toolgroup is
 * expanded, a ‘Fewer’ option permits users to collapse the list again.
 *
 * ListToolGroups are created by a {@link OO.ui.ToolGroupFactory toolgroup factory} when the
 * toolbar is set up. The factory requires the ListToolGroup's symbolic name, 'list', which is
 * specified along with the other configurations. For more information about how to add tools to a
 * ListToolGroup, please see {@link OO.ui.ToolGroup toolgroup}.
 *
 *     @example
 *     // Example of a ListToolGroup
 *     var toolFactory = new OO.ui.ToolFactory();
 *     var toolGroupFactory = new OO.ui.ToolGroupFactory();
 *     var toolbar = new OO.ui.Toolbar( toolFactory, toolGroupFactory );
 *
 *     // Configure and register two tools
 *     function SettingsTool() {
 *         SettingsTool.parent.apply( this, arguments );
 *     }
 *     OO.inheritClass( SettingsTool, OO.ui.Tool );
 *     SettingsTool.static.name = 'settings';
 *     SettingsTool.static.icon = 'settings';
 *     SettingsTool.static.title = 'Change settings';
 *     SettingsTool.prototype.onSelect = function () {
 *         this.setActive( false );
 *     };
 *     SettingsTool.prototype.onUpdateState = function () {};
 *     toolFactory.register( SettingsTool );
 *     // Register two more tools, nothing interesting here
 *     function StuffTool() {
 *         StuffTool.parent.apply( this, arguments );
 *     }
 *     OO.inheritClass( StuffTool, OO.ui.Tool );
 *     StuffTool.static.name = 'stuff';
 *     StuffTool.static.icon = 'search';
 *     StuffTool.static.title = 'Change the world';
 *     StuffTool.prototype.onSelect = function () {
 *         this.setActive( false );
 *     };
 *     StuffTool.prototype.onUpdateState = function () {};
 *     toolFactory.register( StuffTool );
 *     toolbar.setup( [
 *         {
 *             // Configurations for list toolgroup.
 *             type: 'list',
 *             label: 'ListToolGroup',
 *             icon: 'ellipsis',
 *             title: 'This is the title, displayed when user moves the mouse over the list ' +
 *                 'toolgroup',
 *             header: 'This is the header',
 *             include: [ 'settings', 'stuff' ],
 *             allowCollapse: ['stuff']
 *         }
 *     ] );
 *
 *     // Create some UI around the toolbar and place it in the document
 *     var frame = new OO.ui.PanelLayout( {
 *         expanded: false,
 *         framed: true
 *     } );
 *     frame.$element.append(
 *         toolbar.$element
 *     );
 *     $( document.body ).append( frame.$element );
 *     // Build the toolbar. This must be done after the toolbar has been appended to the document.
 *     toolbar.initialize();
 *
 * For more information about toolbars in general, please see the
 * [OOUI documentation on MediaWiki][1].
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Toolbars
 *
 * @class
 * @extends OO.ui.PopupToolGroup
 *
 * @constructor
 * @param {OO.ui.Toolbar} toolbar
 * @param {Object} [config] Configuration options
 * @cfg {Array} [allowCollapse] Allow the specified tools to be collapsed. By default, collapsible
 *  tools will only be displayed if users click the ‘More’ option displayed at the bottom of the
 *  list. If the list is expanded, a ‘Fewer’ option permits users to collapse the list again.
 *  Any tools that are included in the toolgroup, but are not designated as collapsible, will always
 *  be displayed.
 *  To open a collapsible list in its expanded state, set #expanded to 'true'.
 * @cfg {Array} [forceExpand] Expand the specified tools. All other tools will be designated as
 *  collapsible. Unless #expanded is set to true, the collapsible tools will be collapsed when the
 *  list is first opened.
 * @cfg {boolean} [expanded=false] Expand collapsible tools. This config is only relevant if tools
 *  have been designated as collapsible. When expanded is set to true, all tools in the group will
 *  be displayed when the list is first opened. Users can collapse the list with a ‘Fewer’ option at
 *  the bottom.
 */
OO.ui.ListToolGroup = function OoUiListToolGroup( toolbar, config ) {
	// Allow passing positional parameters inside the config object
	if ( OO.isPlainObject( toolbar ) && config === undefined ) {
		config = toolbar;
		toolbar = config.toolbar;
	}

	// Configuration initialization
	config = config || {};

	// Properties (must be set before parent constructor, which calls #populate)
	this.allowCollapse = config.allowCollapse;
	this.forceExpand = config.forceExpand;
	this.expanded = config.expanded !== undefined ? config.expanded : false;
	this.collapsibleTools = [];

	// Parent constructor
	OO.ui.ListToolGroup.parent.call( this, toolbar, config );

	// Initialization
	this.$element.addClass( 'oo-ui-listToolGroup' );
	this.$group.addClass( 'oo-ui-listToolGroup-tools' );
};

/* Setup */

OO.inheritClass( OO.ui.ListToolGroup, OO.ui.PopupToolGroup );

/* Static Properties */

/**
 * @static
 * @inheritdoc
 */
OO.ui.ListToolGroup.static.name = 'list';

/* Methods */

/**
 * @inheritdoc
 */
OO.ui.ListToolGroup.prototype.populate = function () {
	var i, len, allowCollapse = [];

	OO.ui.ListToolGroup.parent.prototype.populate.call( this );

	// Update the list of collapsible tools
	if ( this.allowCollapse !== undefined ) {
		allowCollapse = this.allowCollapse;
	} else if ( this.forceExpand !== undefined ) {
		allowCollapse = OO.simpleArrayDifference( Object.keys( this.tools ), this.forceExpand );
	}

	this.collapsibleTools = [];
	for ( i = 0, len = allowCollapse.length; i < len; i++ ) {
		if ( this.tools[ allowCollapse[ i ] ] !== undefined ) {
			this.collapsibleTools.push( this.tools[ allowCollapse[ i ] ] );
		}
	}

	// Keep at the end, even when tools are added
	this.$group.append( this.getExpandCollapseTool().$element );

	this.getExpandCollapseTool().toggle( this.collapsibleTools.length !== 0 );
	this.updateCollapsibleState();
};

/**
 * Get the expand/collapse tool for this group
 *
 * @return {OO.ui.Tool} Expand collapse tool
 */
OO.ui.ListToolGroup.prototype.getExpandCollapseTool = function () {
	var ExpandCollapseTool;
	if ( this.expandCollapseTool === undefined ) {
		ExpandCollapseTool = function () {
			ExpandCollapseTool.parent.apply( this, arguments );
		};

		OO.inheritClass( ExpandCollapseTool, OO.ui.Tool );

		ExpandCollapseTool.prototype.onSelect = function () {
			this.toolGroup.expanded = !this.toolGroup.expanded;
			this.toolGroup.updateCollapsibleState();
			this.setActive( false );
		};
		ExpandCollapseTool.prototype.onUpdateState = function () {
			// Do nothing. Tool interface requires an implementation of this function.
		};

		ExpandCollapseTool.static.name = 'more-fewer';

		this.expandCollapseTool = new ExpandCollapseTool( this );
	}
	return this.expandCollapseTool;
};

/**
 * @inheritdoc
 */
OO.ui.ListToolGroup.prototype.onMouseKeyUp = function ( e ) {
	// Do not close the popup when the user wants to show more/fewer tools
	if (
		$( e.target ).closest( '.oo-ui-tool-name-more-fewer' ).length && (
			e.which === OO.ui.MouseButtons.LEFT ||
			e.which === OO.ui.Keys.SPACE ||
			e.which === OO.ui.Keys.ENTER
		)
	) {
		// HACK: Prevent the popup list from being hidden. Skip the PopupToolGroup implementation
		// (which hides the popup list when a tool is selected) and call ToolGroup's implementation
		// directly.
		return OO.ui.ListToolGroup.parent.parent.prototype.onMouseKeyUp.call( this, e );
	} else {
		return OO.ui.ListToolGroup.parent.prototype.onMouseKeyUp.call( this, e );
	}
};

OO.ui.ListToolGroup.prototype.updateCollapsibleState = function () {
	var i, icon, len;

	if ( this.toolbar.position !== 'bottom' ) {
		icon = this.expanded ? 'collapse' : 'expand';
	} else {
		icon = this.expanded ? 'expand' : 'collapse';
	}

	this.getExpandCollapseTool()
		.setIcon( icon )
		.setTitle( OO.ui.msg( this.expanded ? 'ooui-toolgroup-collapse' : 'ooui-toolgroup-expand' ) );

	for ( i = 0, len = this.collapsibleTools.length; i < len; i++ ) {
		this.collapsibleTools[ i ].toggle( this.expanded );
	}

	// Re-evaluate clipping, because our height has changed
	this.clip();
};

/**
 * MenuToolGroups are one of three types of {@link OO.ui.ToolGroup toolgroups} that are used to
 * create {@link OO.ui.Toolbar toolbars} (the other types of groups are
 * {@link OO.ui.BarToolGroup BarToolGroup} and {@link OO.ui.ListToolGroup ListToolGroup}).
 * MenuToolGroups contain selectable {@link OO.ui.Tool tools}, which are displayed by label in a
 * dropdown menu. The tool's title is used as the label text, and the menu label is updated to
 * reflect which tool or tools are currently selected. If no tools are selected, the menu label
 * is empty. The menu can be configured with an indicator, icon, title, and/or header.
 *
 * MenuToolGroups are created by a {@link OO.ui.ToolGroupFactory tool group factory} when the
 * toolbar is set up.
 *
 *     @example
 *     // Example of a MenuToolGroup
 *     var toolFactory = new OO.ui.ToolFactory();
 *     var toolGroupFactory = new OO.ui.ToolGroupFactory();
 *     var toolbar = new OO.ui.Toolbar( toolFactory, toolGroupFactory );
 *
 *     // We will be placing status text in this element when tools are used
 *     var $area = $( '<p>' ).text( 'An example of a MenuToolGroup. Select a tool from the '
 *         + 'dropdown menu.' );
 *
 *     // Define the tools that we're going to place in our toolbar
 *
 *     function SettingsTool() {
 *         SettingsTool.parent.apply( this, arguments );
 *         this.reallyActive = false;
 *     }
 *     OO.inheritClass( SettingsTool, OO.ui.Tool );
 *     SettingsTool.static.name = 'settings';
 *     SettingsTool.static.icon = 'settings';
 *     SettingsTool.static.title = 'Change settings';
 *     SettingsTool.prototype.onSelect = function () {
 *         $area.text( 'Settings tool clicked!' );
 *         // Toggle the active state on each click
 *         this.reallyActive = !this.reallyActive;
 *         this.setActive( this.reallyActive );
 *         // To update the menu label
 *         this.toolbar.emit( 'updateState' );
 *     };
 *     SettingsTool.prototype.onUpdateState = function () {};
 *     toolFactory.register( SettingsTool );
 *
 *     function StuffTool() {
 *         StuffTool.parent.apply( this, arguments );
 *         this.reallyActive = false;
 *     }
 *     OO.inheritClass( StuffTool, OO.ui.Tool );
 *     StuffTool.static.name = 'stuff';
 *     StuffTool.static.icon = 'ellipsis';
 *     StuffTool.static.title = 'More stuff';
 *     StuffTool.prototype.onSelect = function () {
 *         $area.text( 'More stuff tool clicked!' );
 *         // Toggle the active state on each click
 *         this.reallyActive = !this.reallyActive;
 *         this.setActive( this.reallyActive );
 *         // To update the menu label
 *         this.toolbar.emit( 'updateState' );
 *     };
 *     StuffTool.prototype.onUpdateState = function () {};
 *     toolFactory.register( StuffTool );
 *
 *     // Finally define which tools and in what order appear in the toolbar. Each tool may only be
 *     // used once (but not all defined tools must be used).
 *     toolbar.setup( [
 *         {
 *             type: 'menu',
 *             header: 'This is the (optional) header',
 *             title: 'This is the (optional) title',
 *             include: [ 'settings', 'stuff' ]
 *         }
 *     ] );
 *
 *     // Create some UI around the toolbar and place it in the document
 *     var frame = new OO.ui.PanelLayout( {
 *         expanded: false,
 *         framed: true
 *     } );
 *     var contentFrame = new OO.ui.PanelLayout( {
 *         expanded: false,
 *         padded: true
 *     } );
 *     frame.$element.append(
 *         toolbar.$element,
 *         contentFrame.$element.append( $area )
 *     );
 *     $( document.body ).append( frame.$element );
 *
 *     // Here is where the toolbar is actually built. This must be done after inserting it into the
 *     // document.
 *     toolbar.initialize();
 *     toolbar.emit( 'updateState' );
 *
 * For more information about how to add tools to a MenuToolGroup, please see
 * {@link OO.ui.ToolGroup toolgroup}.
 * For more information about toolbars in general, please see the
 * [OOUI documentation on MediaWiki] [1].
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Toolbars
 *
 * @class
 * @extends OO.ui.PopupToolGroup
 *
 * @constructor
 * @param {OO.ui.Toolbar} toolbar
 * @param {Object} [config] Configuration options
 */
OO.ui.MenuToolGroup = function OoUiMenuToolGroup( toolbar, config ) {
	// Allow passing positional parameters inside the config object
	if ( OO.isPlainObject( toolbar ) && config === undefined ) {
		config = toolbar;
		toolbar = config.toolbar;
	}

	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.MenuToolGroup.parent.call( this, toolbar, config );

	// Events
	this.toolbar.connect( this, {
		updateState: 'onUpdateState'
	} );

	// Initialization
	this.$element.addClass( 'oo-ui-menuToolGroup' );
	this.$group.addClass( 'oo-ui-menuToolGroup-tools' );
};

/* Setup */

OO.inheritClass( OO.ui.MenuToolGroup, OO.ui.PopupToolGroup );

/* Static Properties */

/**
 * @static
 * @inheritdoc
 */
OO.ui.MenuToolGroup.static.name = 'menu';

/* Methods */

/**
 * Handle the toolbar state being updated.
 *
 * When the state changes, the title of each active item in the menu will be joined together and
 * used as a label for the group. The label will be empty if none of the items are active.
 *
 * @private
 */
OO.ui.MenuToolGroup.prototype.onUpdateState = function () {
	var name,
		labelTexts = [];

	for ( name in this.tools ) {
		if ( this.tools[ name ].isActive() ) {
			labelTexts.push( this.tools[ name ].getTitle() );
		}
	}

	this.setLabel( labelTexts.join( ', ' ) || ' ' );
};

}( OO ) );

//# sourceMappingURL=oojs-ui-toolbars.js.map.json
/*!
 * OOUI v0.33.1
 * https://www.mediawiki.org/wiki/OOUI
 *
 * Copyright 2011–2019 OOUI Team and other contributors.
 * Released under the MIT license
 * http://oojs.mit-license.org
 *
 * Date: 2019-07-03T21:05:08Z
 */
( function ( OO ) {

'use strict';

/**
 * An ActionWidget is a {@link OO.ui.ButtonWidget button widget} that executes an action.
 * Action widgets are used with OO.ui.ActionSet, which manages the behavior and availability
 * of the actions.
 *
 * Both actions and action sets are primarily used with {@link OO.ui.Dialog Dialogs}.
 * Please see the [OOUI documentation on MediaWiki] [1] for more information
 * and examples.
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Windows/Process_Dialogs#Action_sets
 *
 * @class
 * @extends OO.ui.ButtonWidget
 * @mixins OO.ui.mixin.PendingElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {string} [action] Symbolic name of the action (e.g., ‘continue’ or ‘cancel’).
 * @cfg {string[]} [modes] Symbolic names of the modes (e.g., ‘edit’ or ‘read’) in which the action
 *  should be made available. See the action set's {@link OO.ui.ActionSet#setMode setMode} method
 *  for more information about setting modes.
 * @cfg {boolean} [framed=false] Render the action button with a frame
 */
OO.ui.ActionWidget = function OoUiActionWidget( config ) {
	// Configuration initialization
	config = $.extend( { framed: false }, config );

	// Parent constructor
	OO.ui.ActionWidget.parent.call( this, config );

	// Mixin constructors
	OO.ui.mixin.PendingElement.call( this, config );

	// Properties
	this.action = config.action || '';
	this.modes = config.modes || [];
	this.width = 0;
	this.height = 0;

	// Initialization
	this.$element.addClass( 'oo-ui-actionWidget' );
};

/* Setup */

OO.inheritClass( OO.ui.ActionWidget, OO.ui.ButtonWidget );
OO.mixinClass( OO.ui.ActionWidget, OO.ui.mixin.PendingElement );

/* Methods */

/**
 * Check if the action is configured to be available in the specified `mode`.
 *
 * @param {string} mode Name of mode
 * @return {boolean} The action is configured with the mode
 */
OO.ui.ActionWidget.prototype.hasMode = function ( mode ) {
	return this.modes.indexOf( mode ) !== -1;
};

/**
 * Get the symbolic name of the action (e.g., ‘continue’ or ‘cancel’).
 *
 * @return {string}
 */
OO.ui.ActionWidget.prototype.getAction = function () {
	return this.action;
};

/**
 * Get the symbolic name of the mode or modes for which the action is configured to be available.
 *
 * The current mode is set with the action set's {@link OO.ui.ActionSet#setMode setMode} method.
 * Only actions that are configured to be available in the current mode will be visible.
 * All other actions are hidden.
 *
 * @return {string[]}
 */
OO.ui.ActionWidget.prototype.getModes = function () {
	return this.modes.slice();
};

/* eslint-disable no-unused-vars */
/**
 * ActionSets manage the behavior of the {@link OO.ui.ActionWidget action widgets} that
 * comprise them.
 * Actions can be made available for specific contexts (modes) and circumstances
 * (abilities). Action sets are primarily used with {@link OO.ui.Dialog Dialogs}.
 *
 * ActionSets contain two types of actions:
 *
 * - Special: Special actions are the first visible actions with special flags, such as 'safe' and
 *  'primary', the default special flags. Additional special flags can be configured in subclasses
 *  with the static #specialFlags property.
 * - Other: Other actions include all non-special visible actions.
 *
 * See the [OOUI documentation on MediaWiki][1] for more information.
 *
 *     @example
 *     // Example: An action set used in a process dialog
 *     function MyProcessDialog( config ) {
 *         MyProcessDialog.parent.call( this, config );
 *     }
 *     OO.inheritClass( MyProcessDialog, OO.ui.ProcessDialog );
 *     MyProcessDialog.static.title = 'An action set in a process dialog';
 *     MyProcessDialog.static.name = 'myProcessDialog';
 *     // An action set that uses modes ('edit' and 'help' mode, in this example).
 *     MyProcessDialog.static.actions = [
 *         { action: 'continue', modes: 'edit', label: 'Continue',
 *           flags: [
 *               'primary', 'progressive'
 *         ] },
 *         { action: 'help', modes: 'edit', label: 'Help' },
 *         { modes: 'edit', label: 'Cancel', flags: 'safe' },
 *         { action: 'back', modes: 'help', label: 'Back', flags: 'safe' }
 *     ];
 *
 *     MyProcessDialog.prototype.initialize = function () {
 *         MyProcessDialog.parent.prototype.initialize.apply( this, arguments );
 *         this.panel1 = new OO.ui.PanelLayout( { padded: true, expanded: false } );
 *         this.panel1.$element.append( '<p>This dialog uses an action set (continue, help, ' +
 *             'cancel, back) configured with modes. This is edit mode. Click \'help\' to see ' +
 *             'help mode.</p>' );
 *         this.panel2 = new OO.ui.PanelLayout( { padded: true, expanded: false } );
 *         this.panel2.$element.append( '<p>This is help mode. Only the \'back\' action widget ' +
 *              'is configured to be visible here. Click \'back\' to return to \'edit\' mode.' +
 *              '</p>' );
 *         this.stackLayout = new OO.ui.StackLayout( {
 *             items: [ this.panel1, this.panel2 ]
 *         } );
 *         this.$body.append( this.stackLayout.$element );
 *     };
 *     MyProcessDialog.prototype.getSetupProcess = function ( data ) {
 *         return MyProcessDialog.parent.prototype.getSetupProcess.call( this, data )
 *             .next( function () {
 *                 this.actions.setMode( 'edit' );
 *             }, this );
 *     };
 *     MyProcessDialog.prototype.getActionProcess = function ( action ) {
 *         if ( action === 'help' ) {
 *             this.actions.setMode( 'help' );
 *             this.stackLayout.setItem( this.panel2 );
 *         } else if ( action === 'back' ) {
 *             this.actions.setMode( 'edit' );
 *             this.stackLayout.setItem( this.panel1 );
 *         } else if ( action === 'continue' ) {
 *             var dialog = this;
 *             return new OO.ui.Process( function () {
 *                 dialog.close();
 *             } );
 *         }
 *         return MyProcessDialog.parent.prototype.getActionProcess.call( this, action );
 *     };
 *     MyProcessDialog.prototype.getBodyHeight = function () {
 *         return this.panel1.$element.outerHeight( true );
 *     };
 *     var windowManager = new OO.ui.WindowManager();
 *     $( document.body ).append( windowManager.$element );
 *     var dialog = new MyProcessDialog( {
 *         size: 'medium'
 *     } );
 *     windowManager.addWindows( [ dialog ] );
 *     windowManager.openWindow( dialog );
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Windows/Process_Dialogs#Action_sets
 *
 * @abstract
 * @class
 * @mixins OO.EventEmitter
 *
 * @constructor
 * @param {Object} [config] Configuration options
 */
OO.ui.ActionSet = function OoUiActionSet( config ) {
	// Configuration initialization
	config = config || {};

	// Mixin constructors
	OO.EventEmitter.call( this );

	// Properties
	this.list = [];
	this.categories = {
		actions: 'getAction',
		flags: 'getFlags',
		modes: 'getModes'
	};
	this.categorized = {};
	this.special = {};
	this.others = [];
	this.organized = false;
	this.changing = false;
	this.changed = false;
};
/* eslint-enable no-unused-vars */

/* Setup */

OO.mixinClass( OO.ui.ActionSet, OO.EventEmitter );

/* Static Properties */

/**
 * Symbolic name of the flags used to identify special actions. Special actions are displayed in the
 *  header of a {@link OO.ui.ProcessDialog process dialog}.
 *  See the [OOUI documentation on MediaWiki][2] for more information and examples.
 *
 *  [2]:https://www.mediawiki.org/wiki/OOUI/Windows/Process_Dialogs
 *
 * @abstract
 * @static
 * @inheritable
 * @property {string}
 */
OO.ui.ActionSet.static.specialFlags = [ 'safe', 'primary' ];

/* Events */

/**
 * @event click
 *
 * A 'click' event is emitted when an action is clicked.
 *
 * @param {OO.ui.ActionWidget} action Action that was clicked
 */

/**
 * @event add
 *
 * An 'add' event is emitted when actions are {@link #method-add added} to the action set.
 *
 * @param {OO.ui.ActionWidget[]} added Actions added
 */

/**
 * @event remove
 *
 * A 'remove' event is emitted when actions are {@link #method-remove removed}
 *  or {@link #clear cleared}.
 *
 * @param {OO.ui.ActionWidget[]} added Actions removed
 */

/**
 * @event change
 *
 * A 'change' event is emitted when actions are {@link #method-add added}, {@link #clear cleared},
 * or {@link #method-remove removed} from the action set or when the {@link #setMode mode}
 * is changed.
 *
 */

/* Methods */

/**
 * Handle action change events.
 *
 * @private
 * @fires change
 */
OO.ui.ActionSet.prototype.onActionChange = function () {
	this.organized = false;
	if ( this.changing ) {
		this.changed = true;
	} else {
		this.emit( 'change' );
	}
};

/**
 * Check if an action is one of the special actions.
 *
 * @param {OO.ui.ActionWidget} action Action to check
 * @return {boolean} Action is special
 */
OO.ui.ActionSet.prototype.isSpecial = function ( action ) {
	var flag;

	for ( flag in this.special ) {
		if ( action === this.special[ flag ] ) {
			return true;
		}
	}

	return false;
};

/**
 * Get action widgets based on the specified filter: ‘actions’, ‘flags’, ‘modes’, ‘visible’,
 *  or ‘disabled’.
 *
 * @param {Object} [filters] Filters to use, omit to get all actions
 * @param {string|string[]} [filters.actions] Actions that action widgets must have
 * @param {string|string[]} [filters.flags] Flags that action widgets must have (e.g., 'safe')
 * @param {string|string[]} [filters.modes] Modes that action widgets must have
 * @param {boolean} [filters.visible] Action widgets must be visible
 * @param {boolean} [filters.disabled] Action widgets must be disabled
 * @return {OO.ui.ActionWidget[]} Action widgets matching all criteria
 */
OO.ui.ActionSet.prototype.get = function ( filters ) {
	var i, len, list, category, actions, index, match, matches;

	if ( filters ) {
		this.organize();

		// Collect category candidates
		matches = [];
		for ( category in this.categorized ) {
			list = filters[ category ];
			if ( list ) {
				if ( !Array.isArray( list ) ) {
					list = [ list ];
				}
				for ( i = 0, len = list.length; i < len; i++ ) {
					actions = this.categorized[ category ][ list[ i ] ];
					if ( Array.isArray( actions ) ) {
						matches.push.apply( matches, actions );
					}
				}
			}
		}
		// Remove by boolean filters
		for ( i = 0, len = matches.length; i < len; i++ ) {
			match = matches[ i ];
			if (
				( filters.visible !== undefined && match.isVisible() !== filters.visible ) ||
				( filters.disabled !== undefined && match.isDisabled() !== filters.disabled )
			) {
				matches.splice( i, 1 );
				len--;
				i--;
			}
		}
		// Remove duplicates
		for ( i = 0, len = matches.length; i < len; i++ ) {
			match = matches[ i ];
			index = matches.lastIndexOf( match );
			while ( index !== i ) {
				matches.splice( index, 1 );
				len--;
				index = matches.lastIndexOf( match );
			}
		}
		return matches;
	}
	return this.list.slice();
};

/**
 * Get 'special' actions.
 *
 * Special actions are the first visible action widgets with special flags, such as 'safe' and
 * 'primary'.
 * Special flags can be configured in subclasses by changing the static #specialFlags property.
 *
 * @return {OO.ui.ActionWidget[]|null} 'Special' action widgets.
 */
OO.ui.ActionSet.prototype.getSpecial = function () {
	this.organize();
	return $.extend( {}, this.special );
};

/**
 * Get 'other' actions.
 *
 * Other actions include all non-special visible action widgets.
 *
 * @return {OO.ui.ActionWidget[]} 'Other' action widgets
 */
OO.ui.ActionSet.prototype.getOthers = function () {
	this.organize();
	return this.others.slice();
};

/**
 * Set the mode  (e.g., ‘edit’ or ‘view’). Only {@link OO.ui.ActionWidget#modes actions} configured
 * to be available in the specified mode will be made visible. All other actions will be hidden.
 *
 * @param {string} mode The mode. Only actions configured to be available in the specified
 *  mode will be made visible.
 * @chainable
 * @return {OO.ui.ActionSet} The widget, for chaining
 * @fires toggle
 * @fires change
 */
OO.ui.ActionSet.prototype.setMode = function ( mode ) {
	var i, len, action;

	this.changing = true;
	for ( i = 0, len = this.list.length; i < len; i++ ) {
		action = this.list[ i ];
		action.toggle( action.hasMode( mode ) );
	}

	this.organized = false;
	this.changing = false;
	this.emit( 'change' );

	return this;
};

/**
 * Set the abilities of the specified actions.
 *
 * Action widgets that are configured with the specified actions will be enabled
 * or disabled based on the boolean values specified in the `actions`
 * parameter.
 *
 * @param {Object.<string,boolean>} actions A list keyed by action name with boolean
 *  values that indicate whether or not the action should be enabled.
 * @chainable
 * @return {OO.ui.ActionSet} The widget, for chaining
 */
OO.ui.ActionSet.prototype.setAbilities = function ( actions ) {
	var i, len, action, item;

	for ( i = 0, len = this.list.length; i < len; i++ ) {
		item = this.list[ i ];
		action = item.getAction();
		if ( actions[ action ] !== undefined ) {
			item.setDisabled( !actions[ action ] );
		}
	}

	return this;
};

/**
 * Executes a function once per action.
 *
 * When making changes to multiple actions, use this method instead of iterating over the actions
 * manually to defer emitting a #change event until after all actions have been changed.
 *
 * @param {Object|null} filter Filters to use to determine which actions to iterate over; see #get
 * @param {Function} callback Callback to run for each action; callback is invoked with three
 *   arguments: the action, the action's index, the list of actions being iterated over
 * @chainable
 * @return {OO.ui.ActionSet} The widget, for chaining
 */
OO.ui.ActionSet.prototype.forEach = function ( filter, callback ) {
	this.changed = false;
	this.changing = true;
	this.get( filter ).forEach( callback );
	this.changing = false;
	if ( this.changed ) {
		this.emit( 'change' );
	}

	return this;
};

/**
 * Add action widgets to the action set.
 *
 * @param {OO.ui.ActionWidget[]} actions Action widgets to add
 * @chainable
 * @return {OO.ui.ActionSet} The widget, for chaining
 * @fires add
 * @fires change
 */
OO.ui.ActionSet.prototype.add = function ( actions ) {
	var i, len, action;

	this.changing = true;
	for ( i = 0, len = actions.length; i < len; i++ ) {
		action = actions[ i ];
		action.connect( this, {
			click: [ 'emit', 'click', action ],
			toggle: [ 'onActionChange' ]
		} );
		this.list.push( action );
	}
	this.organized = false;
	this.emit( 'add', actions );
	this.changing = false;
	this.emit( 'change' );

	return this;
};

/**
 * Remove action widgets from the set.
 *
 * To remove all actions, you may wish to use the #clear method instead.
 *
 * @param {OO.ui.ActionWidget[]} actions Action widgets to remove
 * @chainable
 * @return {OO.ui.ActionSet} The widget, for chaining
 * @fires remove
 * @fires change
 */
OO.ui.ActionSet.prototype.remove = function ( actions ) {
	var i, len, index, action;

	this.changing = true;
	for ( i = 0, len = actions.length; i < len; i++ ) {
		action = actions[ i ];
		index = this.list.indexOf( action );
		if ( index !== -1 ) {
			action.disconnect( this );
			this.list.splice( index, 1 );
		}
	}
	this.organized = false;
	this.emit( 'remove', actions );
	this.changing = false;
	this.emit( 'change' );

	return this;
};

/**
 * Remove all action widgets from the set.
 *
 * To remove only specified actions, use the {@link #method-remove remove} method instead.
 *
 * @chainable
 * @return {OO.ui.ActionSet} The widget, for chaining
 * @fires remove
 * @fires change
 */
OO.ui.ActionSet.prototype.clear = function () {
	var i, len, action,
		removed = this.list.slice();

	this.changing = true;
	for ( i = 0, len = this.list.length; i < len; i++ ) {
		action = this.list[ i ];
		action.disconnect( this );
	}

	this.list = [];

	this.organized = false;
	this.emit( 'remove', removed );
	this.changing = false;
	this.emit( 'change' );

	return this;
};

/**
 * Organize actions.
 *
 * This is called whenever organized information is requested. It will only reorganize the actions
 * if something has changed since the last time it ran.
 *
 * @private
 * @chainable
 * @return {OO.ui.ActionSet} The widget, for chaining
 */
OO.ui.ActionSet.prototype.organize = function () {
	var i, iLen, j, jLen, flag, action, category, list, item, special,
		specialFlags = this.constructor.static.specialFlags;

	if ( !this.organized ) {
		this.categorized = {};
		this.special = {};
		this.others = [];
		for ( i = 0, iLen = this.list.length; i < iLen; i++ ) {
			action = this.list[ i ];
			if ( action.isVisible() ) {
				// Populate categories
				for ( category in this.categories ) {
					if ( !this.categorized[ category ] ) {
						this.categorized[ category ] = {};
					}
					list = action[ this.categories[ category ] ]();
					if ( !Array.isArray( list ) ) {
						list = [ list ];
					}
					for ( j = 0, jLen = list.length; j < jLen; j++ ) {
						item = list[ j ];
						if ( !this.categorized[ category ][ item ] ) {
							this.categorized[ category ][ item ] = [];
						}
						this.categorized[ category ][ item ].push( action );
					}
				}
				// Populate special/others
				special = false;
				for ( j = 0, jLen = specialFlags.length; j < jLen; j++ ) {
					flag = specialFlags[ j ];
					if ( !this.special[ flag ] && action.hasFlag( flag ) ) {
						this.special[ flag ] = action;
						special = true;
						break;
					}
				}
				if ( !special ) {
					this.others.push( action );
				}
			}
		}
		this.organized = true;
	}

	return this;
};

/**
 * Errors contain a required message (either a string or jQuery selection) that is used to describe
 * what went wrong in a {@link OO.ui.Process process}. The error's #recoverable and #warning
 * configurations are used to customize the appearance and functionality of the error interface.
 *
 * The basic error interface contains a formatted error message as well as two buttons: 'Dismiss'
 * and 'Try again' (i.e., the error is 'recoverable' by default). If the error is not recoverable,
 * the 'Try again' button will not be rendered and the widget that initiated the failed process will
 * be disabled.
 *
 * If the error is a warning, the error interface will include a 'Dismiss' and a 'Continue' button,
 * which will try the process again.
 *
 * For an example of error interfaces, please see the [OOUI documentation on MediaWiki][1].
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Windows/Process_Dialogs#Processes_and_errors
 *
 * @class
 *
 * @constructor
 * @param {string|jQuery} message Description of error
 * @param {Object} [config] Configuration options
 * @cfg {boolean} [recoverable=true] Error is recoverable.
 *  By default, errors are recoverable, and users can try the process again.
 * @cfg {boolean} [warning=false] Error is a warning.
 *  If the error is a warning, the error interface will include a
 *  'Dismiss' and a 'Continue' button. It is the responsibility of the developer to ensure that the
 *  warning is not triggered a second time if the user chooses to continue.
 */
OO.ui.Error = function OoUiError( message, config ) {
	// Allow passing positional parameters inside the config object
	if ( OO.isPlainObject( message ) && config === undefined ) {
		config = message;
		message = config.message;
	}

	// Configuration initialization
	config = config || {};

	// Properties
	this.message = message instanceof $ ? message : String( message );
	this.recoverable = config.recoverable === undefined || !!config.recoverable;
	this.warning = !!config.warning;
};

/* Setup */

OO.initClass( OO.ui.Error );

/* Methods */

/**
 * Check if the error is recoverable.
 *
 * If the error is recoverable, users are able to try the process again.
 *
 * @return {boolean} Error is recoverable
 */
OO.ui.Error.prototype.isRecoverable = function () {
	return this.recoverable;
};

/**
 * Check if the error is a warning.
 *
 * If the error is a warning, the error interface will include a 'Dismiss' and a 'Continue' button.
 *
 * @return {boolean} Error is warning
 */
OO.ui.Error.prototype.isWarning = function () {
	return this.warning;
};

/**
 * Get error message as DOM nodes.
 *
 * @return {jQuery} Error message in DOM nodes
 */
OO.ui.Error.prototype.getMessage = function () {
	return this.message instanceof $ ?
		this.message.clone() :
		$( '<div>' ).text( this.message ).contents();
};

/**
 * Get the error message text.
 *
 * @return {string} Error message
 */
OO.ui.Error.prototype.getMessageText = function () {
	return this.message instanceof $ ? this.message.text() : this.message;
};

/**
 * A Process is a list of steps that are called in sequence. The step can be a number, a
 * jQuery promise, or a function:
 *
 * - **number**: the process will wait for the specified number of milliseconds before proceeding.
 * - **promise**: the process will continue to the next step when the promise is successfully
 *  resolved or stop if the promise is rejected.
 * - **function**: the process will execute the function. The process will stop if the function
 *  returns either a boolean `false` or a promise that is rejected; if the function returns a
 *  number, the process will wait for that number of milliseconds before proceeding.
 *
 * If the process fails, an {@link OO.ui.Error error} is generated. Depending on how the error is
 * configured, users can dismiss the error and try the process again, or not. If a process is
 * stopped, its remaining steps will not be performed.
 *
 * @class
 *
 * @constructor
 * @param {number|jQuery.Promise|Function} step Number of milliseconds to wait before proceeding,
 *  promise that must be resolved before proceeding, or a function to execute. See #createStep for
 *  more information. See #createStep for more information.
 * @param {Object} [context=null] Execution context of the function. The context is ignored if the
 *  step is a number or promise.
 */
OO.ui.Process = function ( step, context ) {
	// Properties
	this.steps = [];

	// Initialization
	if ( step !== undefined ) {
		this.next( step, context );
	}
};

/* Setup */

OO.initClass( OO.ui.Process );

/* Methods */

/**
 * Start the process.
 *
 * @return {jQuery.Promise} Promise that is resolved when all steps have successfully completed.
 *  If any of the steps return a promise that is rejected or a boolean false, this promise is
 *  rejected and any remaining steps are not performed.
 */
OO.ui.Process.prototype.execute = function () {
	var i, len, promise;

	/**
	 * Continue execution.
	 *
	 * @ignore
	 * @param {Array} step A function and the context it should be called in
	 * @return {Function} Function that continues the process
	 */
	function proceed( step ) {
		return function () {
			// Execute step in the correct context
			var deferred,
				result = step.callback.call( step.context );

			if ( result === false ) {
				// Use rejected promise for boolean false results
				return $.Deferred().reject( [] ).promise();
			}
			if ( typeof result === 'number' ) {
				if ( result < 0 ) {
					throw new Error( 'Cannot go back in time: flux capacitor is out of service' );
				}
				// Use a delayed promise for numbers, expecting them to be in milliseconds
				deferred = $.Deferred();
				setTimeout( deferred.resolve, result );
				return deferred.promise();
			}
			if ( result instanceof OO.ui.Error ) {
				// Use rejected promise for error
				return $.Deferred().reject( [ result ] ).promise();
			}
			if ( Array.isArray( result ) && result.length && result[ 0 ] instanceof OO.ui.Error ) {
				// Use rejected promise for list of errors
				return $.Deferred().reject( result ).promise();
			}
			// Duck-type the object to see if it can produce a promise
			if ( result && typeof result.promise === 'function' ) {
				// Use a promise generated from the result
				return result.promise();
			}
			// Use resolved promise for other results
			return $.Deferred().resolve().promise();
		};
	}

	if ( this.steps.length ) {
		// Generate a chain reaction of promises
		promise = proceed( this.steps[ 0 ] )();
		for ( i = 1, len = this.steps.length; i < len; i++ ) {
			promise = promise.then( proceed( this.steps[ i ] ) );
		}
	} else {
		promise = $.Deferred().resolve().promise();
	}

	return promise;
};

/**
 * Create a process step.
 *
 * @private
 * @param {number|jQuery.Promise|Function} step
 *
 * - Number of milliseconds to wait before proceeding
 * - Promise that must be resolved before proceeding
 * - Function to execute
 *   - If the function returns a boolean false the process will stop
 *   - If the function returns a promise, the process will continue to the next
 *     step when the promise is resolved or stop if the promise is rejected
 *   - If the function returns a number, the process will wait for that number of
 *     milliseconds before proceeding
 * @param {Object} [context=null] Execution context of the function. The context is
 *  ignored if the step is a number or promise.
 * @return {Object} Step object, with `callback` and `context` properties
 */
OO.ui.Process.prototype.createStep = function ( step, context ) {
	if ( typeof step === 'number' || typeof step.promise === 'function' ) {
		return {
			callback: function () {
				return step;
			},
			context: null
		};
	}
	if ( typeof step === 'function' ) {
		return {
			callback: step,
			context: context
		};
	}
	throw new Error( 'Cannot create process step: number, promise or function expected' );
};

/**
 * Add step to the beginning of the process.
 *
 * @inheritdoc #createStep
 * @return {OO.ui.Process} this
 * @chainable
 */
OO.ui.Process.prototype.first = function ( step, context ) {
	this.steps.unshift( this.createStep( step, context ) );
	return this;
};

/**
 * Add step to the end of the process.
 *
 * @inheritdoc #createStep
 * @return {OO.ui.Process} this
 * @chainable
 */
OO.ui.Process.prototype.next = function ( step, context ) {
	this.steps.push( this.createStep( step, context ) );
	return this;
};

/**
 * A window instance represents the life cycle for one single opening of a window
 * until its closing.
 *
 * While OO.ui.WindowManager will reuse OO.ui.Window objects, each time a window is
 * opened, a new lifecycle starts.
 *
 * For more information, please see the [OOUI documentation on MediaWiki] [1].
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Windows
 *
 * @class
 *
 * @constructor
 */
OO.ui.WindowInstance = function OoUiWindowInstance() {
	var deferreds = {
		opening: $.Deferred(),
		opened: $.Deferred(),
		closing: $.Deferred(),
		closed: $.Deferred()
	};

	/**
	 * @private
	 * @property {Object}
	 */
	this.deferreds = deferreds;

	// Set these up as chained promises so that rejecting of
	// an earlier stage automatically rejects the subsequent
	// would-be stages as well.

	/**
	 * @property {jQuery.Promise}
	 */
	this.opening = deferreds.opening.promise();
	/**
	 * @property {jQuery.Promise}
	 */
	this.opened = this.opening.then( function () {
		return deferreds.opened;
	} );
	/**
	 * @property {jQuery.Promise}
	 */
	this.closing = this.opened.then( function () {
		return deferreds.closing;
	} );
	/**
	 * @property {jQuery.Promise}
	 */
	this.closed = this.closing.then( function () {
		return deferreds.closed;
	} );
};

/* Setup */

OO.initClass( OO.ui.WindowInstance );

/**
 * Check if window is opening.
 *
 * @return {boolean} Window is opening
 */
OO.ui.WindowInstance.prototype.isOpening = function () {
	return this.deferreds.opened.state() === 'pending';
};

/**
 * Check if window is opened.
 *
 * @return {boolean} Window is opened
 */
OO.ui.WindowInstance.prototype.isOpened = function () {
	return this.deferreds.opened.state() === 'resolved' &&
		this.deferreds.closing.state() === 'pending';
};

/**
 * Check if window is closing.
 *
 * @return {boolean} Window is closing
 */
OO.ui.WindowInstance.prototype.isClosing = function () {
	return this.deferreds.closing.state() === 'resolved' &&
		this.deferreds.closed.state() === 'pending';
};

/**
 * Check if window is closed.
 *
 * @return {boolean} Window is closed
 */
OO.ui.WindowInstance.prototype.isClosed = function () {
	return this.deferreds.closed.state() === 'resolved';
};

/**
 * Window managers are used to open and close {@link OO.ui.Window windows} and control their
 * presentation. Managed windows are mutually exclusive. If a new window is opened while a current
 * window is opening or is opened, the current window will be closed and any on-going
 * {@link OO.ui.Process process} will be cancelled. Windows
 * themselves are persistent and—rather than being torn down when closed—can be repopulated with the
 * pertinent data and reused.
 *
 * Over the lifecycle of a window, the window manager makes available three promises: `opening`,
 * `opened`, and `closing`, which represent the primary stages of the cycle:
 *
 * **Opening**: the opening stage begins when the window manager’s #openWindow or a window’s
 * {@link OO.ui.Window#open open} method is used, and the window manager begins to open the window.
 *
 * - an `opening` event is emitted with an `opening` promise
 * - the #getSetupDelay method is called and the returned value is used to time a pause in execution
 *   before the window’s {@link OO.ui.Window#method-setup setup} method is called which executes
 *   OO.ui.Window#getSetupProcess.
 * - a `setup` progress notification is emitted from the `opening` promise
 * - the #getReadyDelay method is called the returned value is used to time a pause in execution
 *   before the window’s {@link OO.ui.Window#method-ready ready} method is called which executes
 *   OO.ui.Window#getReadyProcess.
 * - a `ready` progress notification is emitted from the `opening` promise
 * - the `opening` promise is resolved with an `opened` promise
 *
 * **Opened**: the window is now open.
 *
 * **Closing**: the closing stage begins when the window manager's #closeWindow or the
 * window's {@link OO.ui.Window#close close} methods is used, and the window manager begins
 * to close the window.
 *
 * - the `opened` promise is resolved with `closing` promise and a `closing` event is emitted
 * - the #getHoldDelay method is called and the returned value is used to time a pause in execution
 *   before the window's {@link OO.ui.Window#getHoldProcess getHoldProcess} method is called on the
 *   window and its result executed
 * - a `hold` progress notification is emitted from the `closing` promise
 * - the #getTeardownDelay() method is called and the returned value is used to time a pause in
 *   execution before the window's {@link OO.ui.Window#getTeardownProcess getTeardownProcess} method
 *   is called on the window and its result executed
 * - a `teardown` progress notification is emitted from the `closing` promise
 * - the `closing` promise is resolved. The window is now closed
 *
 * See the [OOUI documentation on MediaWiki][1] for more information.
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Windows/Window_managers
 *
 * @class
 * @extends OO.ui.Element
 * @mixins OO.EventEmitter
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {OO.Factory} [factory] Window factory to use for automatic instantiation
 *  Note that window classes that are instantiated with a factory must have
 *  a {@link OO.ui.Dialog#static-name static name} property that specifies a symbolic name.
 * @cfg {boolean} [modal=true] Prevent interaction outside the dialog
 */
OO.ui.WindowManager = function OoUiWindowManager( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.WindowManager.parent.call( this, config );

	// Mixin constructors
	OO.EventEmitter.call( this );

	// Properties
	this.factory = config.factory;
	this.modal = config.modal === undefined || !!config.modal;
	this.windows = {};
	// Deprecated placeholder promise given to compatOpening in openWindow()
	// that is resolved in closeWindow().
	this.compatOpened = null;
	this.preparingToOpen = null;
	this.preparingToClose = null;
	this.currentWindow = null;
	this.globalEvents = false;
	this.$returnFocusTo = null;
	this.$ariaHidden = null;
	this.onWindowResizeTimeout = null;
	this.onWindowResizeHandler = this.onWindowResize.bind( this );
	this.afterWindowResizeHandler = this.afterWindowResize.bind( this );

	// Initialization
	this.$element
		.addClass( 'oo-ui-windowManager' )
		.toggleClass( 'oo-ui-windowManager-modal', this.modal );
	if ( this.modal ) {
		this.$element.attr( 'aria-hidden', true );
	}
};

/* Setup */

OO.inheritClass( OO.ui.WindowManager, OO.ui.Element );
OO.mixinClass( OO.ui.WindowManager, OO.EventEmitter );

/* Events */

/**
 * An 'opening' event is emitted when the window begins to be opened.
 *
 * @event opening
 * @param {OO.ui.Window} win Window that's being opened
 * @param {jQuery.Promise} opened A promise resolved with a value when the window is opened
 *  successfully. This promise also emits `setup` and `ready` notifications. When this promise is
 *  resolved, the first argument of the value is an 'closed' promise, the second argument is the
 *  opening data.
 * @param {Object} data Window opening data
 */

/**
 * A 'closing' event is emitted when the window begins to be closed.
 *
 * @event closing
 * @param {OO.ui.Window} win Window that's being closed
 * @param {jQuery.Promise} closed A promise resolved with a value when the window is closed
 *  successfully. This promise also emits `hold` and `teardown` notifications. When this promise is
 *  resolved, the first argument of its value is the closing data.
 * @param {Object} data Window closing data
 */

/**
 * A 'resize' event is emitted when a window is resized.
 *
 * @event resize
 * @param {OO.ui.Window} win Window that was resized
 */

/* Static Properties */

/**
 * Map of the symbolic name of each window size and its CSS properties.
 *
 * @static
 * @inheritable
 * @property {Object}
 */
OO.ui.WindowManager.static.sizes = {
	small: {
		width: 300
	},
	medium: {
		width: 500
	},
	large: {
		width: 700
	},
	larger: {
		width: 900
	},
	full: {
		// These can be non-numeric because they are never used in calculations
		width: '100%',
		height: '100%'
	}
};

/**
 * Symbolic name of the default window size.
 *
 * The default size is used if the window's requested size is not recognized.
 *
 * @static
 * @inheritable
 * @property {string}
 */
OO.ui.WindowManager.static.defaultSize = 'medium';

/* Methods */

/**
 * Handle window resize events.
 *
 * @private
 * @param {jQuery.Event} e Window resize event
 */
OO.ui.WindowManager.prototype.onWindowResize = function () {
	clearTimeout( this.onWindowResizeTimeout );
	this.onWindowResizeTimeout = setTimeout( this.afterWindowResizeHandler, 200 );
};

/**
 * Handle window resize events.
 *
 * @private
 * @param {jQuery.Event} e Window resize event
 */
OO.ui.WindowManager.prototype.afterWindowResize = function () {
	var currentFocusedElement = document.activeElement;
	if ( this.currentWindow ) {
		this.updateWindowSize( this.currentWindow );

		// Restore focus to the original element if it has changed.
		// When a layout change is made on resize inputs lose focus
		// on Android (Chrome and Firefox), see T162127.
		if ( currentFocusedElement !== document.activeElement ) {
			currentFocusedElement.focus();
		}
	}
};

/**
 * Check if window is opening.
 *
 * @param {OO.ui.Window} win Window to check
 * @return {boolean} Window is opening
 */
OO.ui.WindowManager.prototype.isOpening = function ( win ) {
	return win === this.currentWindow && !!this.lifecycle &&
		this.lifecycle.isOpening();
};

/**
 * Check if window is closing.
 *
 * @param {OO.ui.Window} win Window to check
 * @return {boolean} Window is closing
 */
OO.ui.WindowManager.prototype.isClosing = function ( win ) {
	return win === this.currentWindow && !!this.lifecycle &&
		this.lifecycle.isClosing();
};

/**
 * Check if window is opened.
 *
 * @param {OO.ui.Window} win Window to check
 * @return {boolean} Window is opened
 */
OO.ui.WindowManager.prototype.isOpened = function ( win ) {
	return win === this.currentWindow && !!this.lifecycle &&
		this.lifecycle.isOpened();
};

/**
 * Check if a window is being managed.
 *
 * @param {OO.ui.Window} win Window to check
 * @return {boolean} Window is being managed
 */
OO.ui.WindowManager.prototype.hasWindow = function ( win ) {
	var name;

	for ( name in this.windows ) {
		if ( this.windows[ name ] === win ) {
			return true;
		}
	}

	return false;
};

/**
 * Get the number of milliseconds to wait after opening begins before executing the ‘setup’ process.
 *
 * @param {OO.ui.Window} win Window being opened
 * @param {Object} [data] Window opening data
 * @return {number} Milliseconds to wait
 */
OO.ui.WindowManager.prototype.getSetupDelay = function () {
	return 0;
};

/**
 * Get the number of milliseconds to wait after setup has finished before executing the ‘ready’
 * process.
 *
 * @param {OO.ui.Window} win Window being opened
 * @param {Object} [data] Window opening data
 * @return {number} Milliseconds to wait
 */
OO.ui.WindowManager.prototype.getReadyDelay = function () {
	return this.modal ? OO.ui.theme.getDialogTransitionDuration() : 0;
};

/**
 * Get the number of milliseconds to wait after closing has begun before executing the 'hold'
 * process.
 *
 * @param {OO.ui.Window} win Window being closed
 * @param {Object} [data] Window closing data
 * @return {number} Milliseconds to wait
 */
OO.ui.WindowManager.prototype.getHoldDelay = function () {
	return 0;
};

/**
 * Get the number of milliseconds to wait after the ‘hold’ process has finished before
 * executing the ‘teardown’ process.
 *
 * @param {OO.ui.Window} win Window being closed
 * @param {Object} [data] Window closing data
 * @return {number} Milliseconds to wait
 */
OO.ui.WindowManager.prototype.getTeardownDelay = function () {
	return this.modal ? OO.ui.theme.getDialogTransitionDuration() : 0;
};

/**
 * Get a window by its symbolic name.
 *
 * If the window is not yet instantiated and its symbolic name is recognized by a factory, it will
 * be instantiated and added to the window manager automatically. Please see the [OOUI documentation
 * on MediaWiki][3] for more information about using factories.
 * [3]: https://www.mediawiki.org/wiki/OOUI/Windows/Window_managers
 *
 * @param {string} name Symbolic name of the window
 * @return {jQuery.Promise} Promise resolved with matching window, or rejected with an OO.ui.Error
 * @throws {Error} An error is thrown if the symbolic name is not recognized by the factory.
 * @throws {Error} An error is thrown if the named window is not recognized as a managed window.
 */
OO.ui.WindowManager.prototype.getWindow = function ( name ) {
	var deferred = $.Deferred(),
		win = this.windows[ name ];

	if ( !( win instanceof OO.ui.Window ) ) {
		if ( this.factory ) {
			if ( !this.factory.lookup( name ) ) {
				deferred.reject( new OO.ui.Error(
					'Cannot auto-instantiate window: symbolic name is unrecognized by the factory'
				) );
			} else {
				win = this.factory.create( name );
				this.addWindows( [ win ] );
				deferred.resolve( win );
			}
		} else {
			deferred.reject( new OO.ui.Error(
				'Cannot get unmanaged window: symbolic name unrecognized as a managed window'
			) );
		}
	} else {
		deferred.resolve( win );
	}

	return deferred.promise();
};

/**
 * Get current window.
 *
 * @return {OO.ui.Window|null} Currently opening/opened/closing window
 */
OO.ui.WindowManager.prototype.getCurrentWindow = function () {
	return this.currentWindow;
};

/* eslint-disable valid-jsdoc */
/**
 * Open a window.
 *
 * @param {OO.ui.Window|string} win Window object or symbolic name of window to open
 * @param {Object} [data] Window opening data
 * @param {jQuery|null} [data.$returnFocusTo] Element to which the window will return focus when
 *  closed. Defaults the current activeElement. If set to null, focus isn't changed on close.
 * @return {OO.ui.WindowInstance} A lifecycle object representing this particular
 *  opening of the window. For backwards-compatibility, then object is also a Thenable that is
 *  resolved when the window is done opening, with nested promise for when closing starts. This
 *  behaviour is deprecated and is not compatible with jQuery 3, see T163510.
 * @fires opening
 */
OO.ui.WindowManager.prototype.openWindow = function ( win, data, lifecycle, compatOpening ) {
	/* eslint-enable valid-jsdoc */
	var error,
		manager = this;
	data = data || {};

	// Internal parameter 'lifecycle' allows this method to always return
	// a lifecycle even if the window still needs to be created
	// asynchronously when 'win' is a string.
	lifecycle = lifecycle || new OO.ui.WindowInstance();
	compatOpening = compatOpening || $.Deferred();

	// Turn lifecycle into a Thenable for backwards-compatibility with
	// the deprecated nested-promise behaviour, see T163510.
	[ 'state', 'always', 'catch', 'pipe', 'then', 'promise', 'progress', 'done', 'fail' ]
		.forEach( function ( method ) {
			lifecycle[ method ] = function () {
				OO.ui.warnDeprecation(
					'Using the return value of openWindow as a promise is deprecated. ' +
					'Use .openWindow( ... ).opening.' + method + '( ... ) instead.'
				);
				return compatOpening[ method ].apply( this, arguments );
			};
		} );

	// Argument handling
	if ( typeof win === 'string' ) {
		this.getWindow( win ).then(
			function ( win ) {
				manager.openWindow( win, data, lifecycle, compatOpening );
			},
			function ( err ) {
				lifecycle.deferreds.opening.reject( err );
			}
		);
		return lifecycle;
	}

	// Error handling
	if ( !this.hasWindow( win ) ) {
		error = 'Cannot open window: window is not attached to manager';
	} else if ( this.lifecycle && this.lifecycle.isOpened() ) {
		error = 'Cannot open window: another window is open';
	} else if ( this.preparingToOpen || ( this.lifecycle && this.lifecycle.isOpening() ) ) {
		error = 'Cannot open window: another window is opening';
	}

	if ( error ) {
		compatOpening.reject( new OO.ui.Error( error ) );
		lifecycle.deferreds.opening.reject( new OO.ui.Error( error ) );
		return lifecycle;
	}

	// If a window is currently closing, wait for it to complete
	this.preparingToOpen = $.when( this.lifecycle && this.lifecycle.closed );
	// Ensure handlers get called after preparingToOpen is set
	this.preparingToOpen.done( function () {
		if ( manager.modal ) {
			manager.toggleGlobalEvents( true );
			manager.toggleAriaIsolation( true );
		}
		manager.$returnFocusTo = data.$returnFocusTo !== undefined ?
			data.$returnFocusTo :
			$( document.activeElement );
		manager.currentWindow = win;
		manager.lifecycle = lifecycle;
		manager.preparingToOpen = null;
		manager.emit( 'opening', win, compatOpening, data );
		lifecycle.deferreds.opening.resolve( data );
		setTimeout( function () {
			manager.compatOpened = $.Deferred();
			win.setup( data ).then( function () {
				compatOpening.notify( { state: 'setup' } );
				setTimeout( function () {
					win.ready( data ).then( function () {
						compatOpening.notify( { state: 'ready' } );
						lifecycle.deferreds.opened.resolve( data );
						compatOpening.resolve( manager.compatOpened.promise(), data );
					}, function () {
						lifecycle.deferreds.opened.reject();
						compatOpening.reject();
						manager.closeWindow( win );
					} );
				}, manager.getReadyDelay() );
			}, function () {
				lifecycle.deferreds.opened.reject();
				compatOpening.reject();
				manager.closeWindow( win );
			} );
		}, manager.getSetupDelay() );
	} );

	return lifecycle;
};

/**
 * Close a window.
 *
 * @param {OO.ui.Window|string} win Window object or symbolic name of window to close
 * @param {Object} [data] Window closing data
 * @return {OO.ui.WindowInstance} A lifecycle object representing this particular
 *  opening of the window. For backwards-compatibility, the object is also a Thenable that is
 *  resolved when the window is done closing, see T163510.
 * @fires closing
 */
OO.ui.WindowManager.prototype.closeWindow = function ( win, data ) {
	var error,
		manager = this,
		compatClosing = $.Deferred(),
		lifecycle = this.lifecycle,
		compatOpened;

	// Argument handling
	if ( typeof win === 'string' ) {
		win = this.windows[ win ];
	} else if ( !this.hasWindow( win ) ) {
		win = null;
	}

	// Error handling
	if ( !lifecycle ) {
		error = 'Cannot close window: no window is currently open';
	} else if ( !win ) {
		error = 'Cannot close window: window is not attached to manager';
	} else if ( win !== this.currentWindow || this.lifecycle.isClosed() ) {
		error = 'Cannot close window: window already closed with different data';
	} else if ( this.preparingToClose || this.lifecycle.isClosing() ) {
		error = 'Cannot close window: window already closing with different data';
	}

	if ( error ) {
		// This function was called for the wrong window and we don't want to mess with the current
		// window's state.
		lifecycle = new OO.ui.WindowInstance();
		// Pretend the window has been opened, so that we can pretend to fail to close it.
		lifecycle.deferreds.opening.resolve( {} );
		lifecycle.deferreds.opened.resolve( {} );
	}

	// Turn lifecycle into a Thenable for backwards-compatibility with
	// the deprecated nested-promise behaviour, see T163510.
	[ 'state', 'always', 'catch', 'pipe', 'then', 'promise', 'progress', 'done', 'fail' ]
		.forEach( function ( method ) {
			lifecycle[ method ] = function () {
				OO.ui.warnDeprecation(
					'Using the return value of closeWindow as a promise is deprecated. ' +
					'Use .closeWindow( ... ).closed.' + method + '( ... ) instead.'
				);
				return compatClosing[ method ].apply( this, arguments );
			};
		} );

	if ( error ) {
		compatClosing.reject( new OO.ui.Error( error ) );
		lifecycle.deferreds.closing.reject( new OO.ui.Error( error ) );
		return lifecycle;
	}

	// If the window is currently opening, close it when it's done
	this.preparingToClose = $.when( this.lifecycle.opened );
	// Ensure handlers get called after preparingToClose is set
	this.preparingToClose.always( function () {
		manager.preparingToClose = null;
		manager.emit( 'closing', win, compatClosing, data );
		lifecycle.deferreds.closing.resolve( data );
		compatOpened = manager.compatOpened;
		manager.compatOpened = null;
		compatOpened.resolve( compatClosing.promise(), data );
		setTimeout( function () {
			win.hold( data ).then( function () {
				compatClosing.notify( { state: 'hold' } );
				setTimeout( function () {
					win.teardown( data ).then( function () {
						compatClosing.notify( { state: 'teardown' } );
						if ( manager.modal ) {
							manager.toggleGlobalEvents( false );
							manager.toggleAriaIsolation( false );
						}
						if ( manager.$returnFocusTo && manager.$returnFocusTo.length ) {
							manager.$returnFocusTo[ 0 ].focus();
						}
						manager.currentWindow = null;
						manager.lifecycle = null;
						lifecycle.deferreds.closed.resolve( data );
						compatClosing.resolve( data );
					} );
				}, manager.getTeardownDelay() );
			} );
		}, manager.getHoldDelay() );
	} );

	return lifecycle;
};

/**
 * Add windows to the window manager.
 *
 * Windows can be added by reference, symbolic name, or explicitly defined symbolic names.
 * See the [OOUI documentation on MediaWiki] [2] for examples.
 * [2]: https://www.mediawiki.org/wiki/OOUI/Windows/Window_managers
 *
 * This function can be called in two manners:
 *
 * 1. `.addWindows( [ winA, winB, ... ] )` (where `winA`, `winB` are OO.ui.Window objects)
 *
 *    This syntax registers windows under the symbolic names defined in their `.static.name`
 *    properties. For example, if `windowA.constructor.static.name` is `'nameA'`, calling
 *    `.openWindow( 'nameA' )` afterwards will open the window `windowA`. This syntax requires the
 *    static name to be set, otherwise an exception will be thrown.
 *
 *    This is the recommended way, as it allows for an easier switch to using a window factory.
 *
 * 2. `.addWindows( { nameA: winA, nameB: winB, ... } )`
 *
 *    This syntax registers windows under the explicitly given symbolic names. In this example,
 *    calling `.openWindow( 'nameA' )` afterwards will open the window `windowA`, regardless of what
 *    its `.static.name` is set to. The static name is not required to be set.
 *
 *    This should only be used if you need to override the default symbolic names.
 *
 * Example:
 *
 *     var windowManager = new OO.ui.WindowManager();
 *     $( document.body ).append( windowManager.$element );
 *
 *     // Add a window under the default name: see OO.ui.MessageDialog.static.name
 *     windowManager.addWindows( [ new OO.ui.MessageDialog() ] );
 *     // Add a window under an explicit name
 *     windowManager.addWindows( { myMessageDialog: new OO.ui.MessageDialog() } );
 *
 *     // Open window by default name
 *     windowManager.openWindow( 'message' );
 *     // Open window by explicitly given name
 *     windowManager.openWindow( 'myMessageDialog' );
 *
 *
 * @param {Object.<string,OO.ui.Window>|OO.ui.Window[]} windows An array of window objects specified
 *  by reference, symbolic name, or explicitly defined symbolic names.
 * @throws {Error} An error is thrown if a window is added by symbolic name, but has neither an
 *  explicit nor a statically configured symbolic name.
 */
OO.ui.WindowManager.prototype.addWindows = function ( windows ) {
	var i, len, win, name, list;

	if ( Array.isArray( windows ) ) {
		// Convert to map of windows by looking up symbolic names from static configuration
		list = {};
		for ( i = 0, len = windows.length; i < len; i++ ) {
			name = windows[ i ].constructor.static.name;
			if ( !name ) {
				throw new Error( 'Windows must have a `name` static property defined.' );
			}
			list[ name ] = windows[ i ];
		}
	} else if ( OO.isPlainObject( windows ) ) {
		list = windows;
	}

	// Add windows
	for ( name in list ) {
		win = list[ name ];
		this.windows[ name ] = win.toggle( false );
		this.$element.append( win.$element );
		win.setManager( this );
	}
};

/**
 * Remove the specified windows from the windows manager.
 *
 * Windows will be closed before they are removed. If you wish to remove all windows, you may wish
 * to use the #clearWindows method instead. If you no longer need the window manager and want to
 * ensure that it no longer listens to events, use the #destroy method.
 *
 * @param {string[]} names Symbolic names of windows to remove
 * @return {jQuery.Promise} Promise resolved when window is closed and removed
 * @throws {Error} An error is thrown if the named windows are not managed by the window manager.
 */
OO.ui.WindowManager.prototype.removeWindows = function ( names ) {
	var i, len, win, name, cleanupWindow,
		manager = this,
		promises = [],
		cleanup = function ( name, win ) {
			delete manager.windows[ name ];
			win.$element.detach();
		};

	for ( i = 0, len = names.length; i < len; i++ ) {
		name = names[ i ];
		win = this.windows[ name ];
		if ( !win ) {
			throw new Error( 'Cannot remove window' );
		}
		cleanupWindow = cleanup.bind( null, name, win );
		promises.push( this.closeWindow( name ).closed.then( cleanupWindow, cleanupWindow ) );
	}

	return $.when.apply( $, promises );
};

/**
 * Remove all windows from the window manager.
 *
 * Windows will be closed before they are removed. Note that the window manager, though not in use,
 * will still listen to events. If the window manager will not be used again, you may wish to use
 * the #destroy method instead. To remove just a subset of windows, use the #removeWindows method.
 *
 * @return {jQuery.Promise} Promise resolved when all windows are closed and removed
 */
OO.ui.WindowManager.prototype.clearWindows = function () {
	return this.removeWindows( Object.keys( this.windows ) );
};

/**
 * Set dialog size. In general, this method should not be called directly.
 *
 * Fullscreen mode will be used if the dialog is too wide to fit in the screen.
 *
 * @param {OO.ui.Window} win Window to update, should be the current window
 * @chainable
 * @return {OO.ui.WindowManager} The manager, for chaining
 */
OO.ui.WindowManager.prototype.updateWindowSize = function ( win ) {
	var isFullscreen;

	// Bypass for non-current, and thus invisible, windows
	if ( win !== this.currentWindow ) {
		return;
	}

	isFullscreen = win.getSize() === 'full';

	this.$element.toggleClass( 'oo-ui-windowManager-fullscreen', isFullscreen );
	this.$element.toggleClass( 'oo-ui-windowManager-floating', !isFullscreen );
	win.setDimensions( win.getSizeProperties() );

	this.emit( 'resize', win );

	return this;
};

/**
 * Bind or unbind global events for scrolling.
 *
 * @private
 * @param {boolean} [on] Bind global events
 * @chainable
 * @return {OO.ui.WindowManager} The manager, for chaining
 */
OO.ui.WindowManager.prototype.toggleGlobalEvents = function ( on ) {
	var scrollWidth, bodyMargin,
		$body = $( this.getElementDocument().body ),
		// We could have multiple window managers open so only modify
		// the body css at the bottom of the stack
		stackDepth = $body.data( 'windowManagerGlobalEvents' ) || 0;

	on = on === undefined ? !!this.globalEvents : !!on;

	if ( on ) {
		if ( !this.globalEvents ) {
			$( this.getElementWindow() ).on( {
				// Start listening for top-level window dimension changes
				'orientationchange resize': this.onWindowResizeHandler
			} );
			if ( stackDepth === 0 ) {
				scrollWidth = window.innerWidth - document.documentElement.clientWidth;
				bodyMargin = parseFloat( $body.css( 'margin-right' ) ) || 0;
				$body.addClass( 'oo-ui-windowManager-modal-active' );
				$body.css( 'margin-right', bodyMargin + scrollWidth );
			}
			stackDepth++;
			this.globalEvents = true;
		}
	} else if ( this.globalEvents ) {
		$( this.getElementWindow() ).off( {
			// Stop listening for top-level window dimension changes
			'orientationchange resize': this.onWindowResizeHandler
		} );
		stackDepth--;
		if ( stackDepth === 0 ) {
			$body.removeClass( 'oo-ui-windowManager-modal-active' );
			$body.css( 'margin-right', '' );
		}
		this.globalEvents = false;
	}
	$body.data( 'windowManagerGlobalEvents', stackDepth );

	return this;
};

/**
 * Toggle screen reader visibility of content other than the window manager.
 *
 * @private
 * @param {boolean} [isolate] Make only the window manager visible to screen readers
 * @chainable
 * @return {OO.ui.WindowManager} The manager, for chaining
 */
OO.ui.WindowManager.prototype.toggleAriaIsolation = function ( isolate ) {
	var $topLevelElement;
	isolate = isolate === undefined ? !this.$ariaHidden : !!isolate;

	if ( isolate ) {
		if ( !this.$ariaHidden ) {
			// Find the top level element containing the window manager or the
			// window manager's element itself in case its a direct child of body
			$topLevelElement = this.$element.parentsUntil( 'body' ).last();
			$topLevelElement = $topLevelElement.length === 0 ? this.$element : $topLevelElement;

			// In case previously set by another window manager
			this.$element.removeAttr( 'aria-hidden' );

			// Hide everything other than the window manager from screen readers
			this.$ariaHidden = $( document.body )
				.children()
				.not( 'script' )
				.not( $topLevelElement )
				.attr( 'aria-hidden', true );
		}
	} else if ( this.$ariaHidden ) {
		// Restore screen reader visibility
		this.$ariaHidden.removeAttr( 'aria-hidden' );
		this.$ariaHidden = null;

		// and hide the window manager
		this.$element.attr( 'aria-hidden', true );
	}

	return this;
};

/**
 * Destroy the window manager.
 *
 * Destroying the window manager ensures that it will no longer listen to events. If you would like
 * to continue using the window manager, but wish to remove all windows from it, use the
 * #clearWindows method instead.
 */
OO.ui.WindowManager.prototype.destroy = function () {
	this.toggleGlobalEvents( false );
	this.toggleAriaIsolation( false );
	this.clearWindows();
	this.$element.remove();
};

/**
 * A window is a container for elements that are in a child frame. They are used with
 * a window manager (OO.ui.WindowManager), which is used to open and close the window and control
 * its presentation. The size of a window is specified using a symbolic name (e.g., ‘small’,
 * ‘medium’, ‘large’), which is interpreted by the window manager. If the requested size is not
 * recognized, the window manager will choose a sensible fallback.
 *
 * The lifecycle of a window has three primary stages (opening, opened, and closing) in which
 * different processes are executed:
 *
 * **opening**: The opening stage begins when the window manager's
 * {@link OO.ui.WindowManager#openWindow openWindow} or the window's {@link #open open} methods are
 * used, and the window manager begins to open the window.
 *
 * - {@link #getSetupProcess} method is called and its result executed
 * - {@link #getReadyProcess} method is called and its result executed
 *
 * **opened**: The window is now open
 *
 * **closing**: The closing stage begins when the window manager's
 * {@link OO.ui.WindowManager#closeWindow closeWindow}
 * or the window's {@link #close} methods are used, and the window manager begins to close the
 * window.
 *
 * - {@link #getHoldProcess} method is called and its result executed
 * - {@link #getTeardownProcess} method is called and its result executed. The window is now closed
 *
 * Each of the window's processes (setup, ready, hold, and teardown) can be extended in subclasses
 * by overriding the window's #getSetupProcess, #getReadyProcess, #getHoldProcess and
 * #getTeardownProcess methods. Note that each {@link OO.ui.Process process} is executed in series,
 * so asynchronous processing can complete. Always assume window processes are executed
 * asynchronously.
 *
 * For more information, please see the [OOUI documentation on MediaWiki] [1].
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Windows
 *
 * @abstract
 * @class
 * @extends OO.ui.Element
 * @mixins OO.EventEmitter
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {string} [size] Symbolic name of the dialog size: `small`, `medium`, `large`, `larger` or
 *  `full`.  If omitted, the value of the {@link #static-size static size} property will be used.
 */
OO.ui.Window = function OoUiWindow( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.Window.parent.call( this, config );

	// Mixin constructors
	OO.EventEmitter.call( this );

	// Properties
	this.manager = null;
	this.size = config.size || this.constructor.static.size;
	this.$frame = $( '<div>' );
	/**
	 * Overlay element to use for the `$overlay` configuration option of widgets that support it.
	 * Things put inside it are overlaid on top of the window and are not bound to its dimensions.
	 * See <https://www.mediawiki.org/wiki/OOUI/Concepts#Overlays>.
	 *
	 *     MyDialog.prototype.initialize = function () {
	 *       ...
	 *       var popupButton = new OO.ui.PopupButtonWidget( {
	 *         $overlay: this.$overlay,
	 *         label: 'Popup button',
	 *         popup: {
	 *           $content: $( '<p>Popup content.</p><p>More content.</p><p>Yet more content.</p>' ),
	 *           padded: true
	 *         }
	 *       } );
	 *       ...
	 *     };
	 *
	 * @property {jQuery}
	 */
	this.$overlay = $( '<div>' );
	this.$content = $( '<div>' );

	this.$focusTrapBefore = $( '<div>' ).prop( 'tabIndex', 0 );
	this.$focusTrapAfter = $( '<div>' ).prop( 'tabIndex', 0 );
	this.$focusTraps = this.$focusTrapBefore.add( this.$focusTrapAfter );

	// Initialization
	this.$overlay.addClass( 'oo-ui-window-overlay' );
	this.$content
		.addClass( 'oo-ui-window-content' )
		.attr( 'tabindex', 0 );
	this.$frame
		.addClass( 'oo-ui-window-frame' )
		.append( this.$focusTrapBefore, this.$content, this.$focusTrapAfter );
	this.$element
		.addClass( 'oo-ui-window' )
		.append( this.$frame, this.$overlay );

	// Initially hidden - using #toggle may cause errors if subclasses override toggle with methods
	// that reference properties not initialized at that time of parent class construction
	// TODO: Find a better way to handle post-constructor setup
	this.visible = false;
	this.$element.addClass( 'oo-ui-element-hidden' );
};

/* Setup */

OO.inheritClass( OO.ui.Window, OO.ui.Element );
OO.mixinClass( OO.ui.Window, OO.EventEmitter );

/* Static Properties */

/**
 * Symbolic name of the window size: `small`, `medium`, `large`, `larger` or `full`.
 *
 * The static size is used if no #size is configured during construction.
 *
 * @static
 * @inheritable
 * @property {string}
 */
OO.ui.Window.static.size = 'medium';

/* Methods */

/**
 * Handle mouse down events.
 *
 * @private
 * @param {jQuery.Event} e Mouse down event
 * @return {OO.ui.Window} The window, for chaining
 */
OO.ui.Window.prototype.onMouseDown = function ( e ) {
	// Prevent clicking on the click-block from stealing focus
	if ( e.target === this.$element[ 0 ] ) {
		return false;
	}
};

/**
 * Check if the window has been initialized.
 *
 * Initialization occurs when a window is added to a manager.
 *
 * @return {boolean} Window has been initialized
 */
OO.ui.Window.prototype.isInitialized = function () {
	return !!this.manager;
};

/**
 * Check if the window is visible.
 *
 * @return {boolean} Window is visible
 */
OO.ui.Window.prototype.isVisible = function () {
	return this.visible;
};

/**
 * Check if the window is opening.
 *
 * This method is a wrapper around the window manager's
 * {@link OO.ui.WindowManager#isOpening isOpening} method.
 *
 * @return {boolean} Window is opening
 */
OO.ui.Window.prototype.isOpening = function () {
	return this.manager.isOpening( this );
};

/**
 * Check if the window is closing.
 *
 * This method is a wrapper around the window manager's
 * {@link OO.ui.WindowManager#isClosing isClosing} method.
 *
 * @return {boolean} Window is closing
 */
OO.ui.Window.prototype.isClosing = function () {
	return this.manager.isClosing( this );
};

/**
 * Check if the window is opened.
 *
 * This method is a wrapper around the window manager's
 * {@link OO.ui.WindowManager#isOpened isOpened} method.
 *
 * @return {boolean} Window is opened
 */
OO.ui.Window.prototype.isOpened = function () {
	return this.manager.isOpened( this );
};

/**
 * Get the window manager.
 *
 * All windows must be attached to a window manager, which is used to open
 * and close the window and control its presentation.
 *
 * @return {OO.ui.WindowManager} Manager of window
 */
OO.ui.Window.prototype.getManager = function () {
	return this.manager;
};

/**
 * Get the symbolic name of the window size (e.g., `small` or `medium`).
 *
 * @return {string} Symbolic name of the size: `small`, `medium`, `large`, `larger`, `full`
 */
OO.ui.Window.prototype.getSize = function () {
	var viewport = OO.ui.Element.static.getDimensions( this.getElementWindow() ),
		sizes = this.manager.constructor.static.sizes,
		size = this.size;

	if ( !sizes[ size ] ) {
		size = this.manager.constructor.static.defaultSize;
	}
	if ( size !== 'full' && viewport.rect.right - viewport.rect.left < sizes[ size ].width ) {
		size = 'full';
	}

	return size;
};

/**
 * Get the size properties associated with the current window size
 *
 * @return {Object} Size properties
 */
OO.ui.Window.prototype.getSizeProperties = function () {
	return this.manager.constructor.static.sizes[ this.getSize() ];
};

/**
 * Disable transitions on window's frame for the duration of the callback function, then enable them
 * back.
 *
 * @private
 * @param {Function} callback Function to call while transitions are disabled
 */
OO.ui.Window.prototype.withoutSizeTransitions = function ( callback ) {
	// Temporarily resize the frame so getBodyHeight() can use scrollHeight measurements.
	// Disable transitions first, otherwise we'll get values from when the window was animating.
	// We need to build the transition CSS properties using these specific properties since
	// Firefox doesn't return anything useful when asked just for 'transition'.
	var oldTransition = this.$frame.css( 'transition-property' ) + ' ' +
		this.$frame.css( 'transition-duration' ) + ' ' +
		this.$frame.css( 'transition-timing-function' ) + ' ' +
		this.$frame.css( 'transition-delay' );

	this.$frame.css( 'transition', 'none' );
	callback();

	// Force reflow to make sure the style changes done inside callback
	// really are not transitioned
	this.$frame.height();
	this.$frame.css( 'transition', oldTransition );
};

/**
 * Get the height of the full window contents (i.e., the window head, body and foot together).
 *
 * What constitutes the head, body, and foot varies depending on the window type.
 * A {@link OO.ui.MessageDialog message dialog} displays a title and message in its body,
 * and any actions in the foot. A {@link OO.ui.ProcessDialog process dialog} displays a title
 * and special actions in the head, and dialog content in the body.
 *
 * To get just the height of the dialog body, use the #getBodyHeight method.
 *
 * @return {number} The height of the window contents (the dialog head, body and foot) in pixels
 */
OO.ui.Window.prototype.getContentHeight = function () {
	var bodyHeight,
		win = this,
		bodyStyleObj = this.$body[ 0 ].style,
		frameStyleObj = this.$frame[ 0 ].style;

	// Temporarily resize the frame so getBodyHeight() can use scrollHeight measurements.
	// Disable transitions first, otherwise we'll get values from when the window was animating.
	this.withoutSizeTransitions( function () {
		var oldHeight = frameStyleObj.height,
			oldPosition = bodyStyleObj.position;
		frameStyleObj.height = '1px';
		// Force body to resize to new width
		bodyStyleObj.position = 'relative';
		bodyHeight = win.getBodyHeight();
		frameStyleObj.height = oldHeight;
		bodyStyleObj.position = oldPosition;
	} );

	return (
		// Add buffer for border
		( this.$frame.outerHeight() - this.$frame.innerHeight() ) +
		// Use combined heights of children
		( this.$head.outerHeight( true ) + bodyHeight + this.$foot.outerHeight( true ) )
	);
};

/**
 * Get the height of the window body.
 *
 * To get the height of the full window contents (the window body, head, and foot together),
 * use #getContentHeight.
 *
 * When this function is called, the window will temporarily have been resized
 * to height=1px, so .scrollHeight measurements can be taken accurately.
 *
 * @return {number} Height of the window body in pixels
 */
OO.ui.Window.prototype.getBodyHeight = function () {
	return this.$body[ 0 ].scrollHeight;
};

/**
 * Get the directionality of the frame (right-to-left or left-to-right).
 *
 * @return {string} Directionality: `'ltr'` or `'rtl'`
 */
OO.ui.Window.prototype.getDir = function () {
	return OO.ui.Element.static.getDir( this.$content ) || 'ltr';
};

/**
 * Get the 'setup' process.
 *
 * The setup process is used to set up a window for use in a particular context, based on the `data`
 * argument. This method is called during the opening phase of the window’s lifecycle (before the
 * opening animation). You can add elements to the window in this process or set their default
 * values.
 *
 * Override this method to add additional steps to the ‘setup’ process the parent method provides
 * using the {@link OO.ui.Process#first first} and {@link OO.ui.Process#next next} methods
 * of OO.ui.Process.
 *
 * To add window content that persists between openings, you may wish to use the #initialize method
 * instead.
 *
 * @param {Object} [data] Window opening data
 * @return {OO.ui.Process} Setup process
 */
OO.ui.Window.prototype.getSetupProcess = function () {
	return new OO.ui.Process();
};

/**
 * Get the ‘ready’ process.
 *
 * The ready process is used to ready a window for use in a particular context, based on the `data`
 * argument. This method is called during the opening phase of the window’s lifecycle, after the
 * window has been {@link #getSetupProcess setup} (after the opening animation). You can focus
 * elements in the window in this process, or open their dropdowns.
 *
 * Override this method to add additional steps to the ‘ready’ process the parent method
 * provides using the {@link OO.ui.Process#first first} and {@link OO.ui.Process#next next}
 * methods of OO.ui.Process.
 *
 * @param {Object} [data] Window opening data
 * @return {OO.ui.Process} Ready process
 */
OO.ui.Window.prototype.getReadyProcess = function () {
	return new OO.ui.Process();
};

/**
 * Get the 'hold' process.
 *
 * The hold process is used to keep a window from being used in a particular context, based on the
 * `data` argument. This method is called during the closing phase of the window’s lifecycle (before
 * the closing animation). You can close dropdowns of elements in the window in this process, if
 * they do not get closed automatically.
 *
 * Override this method to add additional steps to the 'hold' process the parent method provides
 * using the {@link OO.ui.Process#first first} and {@link OO.ui.Process#next next} methods
 * of OO.ui.Process.
 *
 * @param {Object} [data] Window closing data
 * @return {OO.ui.Process} Hold process
 */
OO.ui.Window.prototype.getHoldProcess = function () {
	return new OO.ui.Process();
};

/**
 * Get the ‘teardown’ process.
 *
 * The teardown process is used to teardown a window after use. During teardown, user interactions
 * within the window are conveyed and the window is closed, based on the `data` argument. This
 * method is called during the closing phase of the window’s lifecycle (after the closing
 * animation). You can remove elements in the window in this process or clear their values.
 *
 * Override this method to add additional steps to the ‘teardown’ process the parent method provides
 * using the {@link OO.ui.Process#first first} and {@link OO.ui.Process#next next} methods
 * of OO.ui.Process.
 *
 * @param {Object} [data] Window closing data
 * @return {OO.ui.Process} Teardown process
 */
OO.ui.Window.prototype.getTeardownProcess = function () {
	return new OO.ui.Process();
};

/**
 * Set the window manager.
 *
 * This will cause the window to initialize. Calling it more than once will cause an error.
 *
 * @param {OO.ui.WindowManager} manager Manager for this window
 * @throws {Error} An error is thrown if the method is called more than once
 * @chainable
 * @return {OO.ui.Window} The window, for chaining
 */
OO.ui.Window.prototype.setManager = function ( manager ) {
	if ( this.manager ) {
		throw new Error( 'Cannot set window manager, window already has a manager' );
	}

	this.manager = manager;
	this.initialize();

	return this;
};

/**
 * Set the window size by symbolic name (e.g., 'small' or 'medium')
 *
 * @param {string} size Symbolic name of size: `small`, `medium`, `large`, `larger` or
 *  `full`
 * @chainable
 * @return {OO.ui.Window} The window, for chaining
 */
OO.ui.Window.prototype.setSize = function ( size ) {
	this.size = size;
	this.updateSize();
	return this;
};

/**
 * Update the window size.
 *
 * @throws {Error} An error is thrown if the window is not attached to a window manager
 * @chainable
 * @return {OO.ui.Window} The window, for chaining
 */
OO.ui.Window.prototype.updateSize = function () {
	if ( !this.manager ) {
		throw new Error( 'Cannot update window size, must be attached to a manager' );
	}

	this.manager.updateWindowSize( this );

	return this;
};

/**
 * Set window dimensions. This method is called by the {@link OO.ui.WindowManager window manager}
 * when the window is opening. In general, setDimensions should not be called directly.
 *
 * To set the size of the window, use the #setSize method.
 *
 * @param {Object} dim CSS dimension properties
 * @param {string|number} [dim.width] Width
 * @param {string|number} [dim.minWidth] Minimum width
 * @param {string|number} [dim.maxWidth] Maximum width
 * @param {string|number} [dim.height] Height, omit to set based on height of contents
 * @param {string|number} [dim.minHeight] Minimum height
 * @param {string|number} [dim.maxHeight] Maximum height
 * @chainable
 * @return {OO.ui.Window} The window, for chaining
 */
OO.ui.Window.prototype.setDimensions = function ( dim ) {
	var height,
		win = this,
		styleObj = this.$frame[ 0 ].style;

	// Calculate the height we need to set using the correct width
	if ( dim.height === undefined ) {
		this.withoutSizeTransitions( function () {
			var oldWidth = styleObj.width;
			win.$frame.css( 'width', dim.width || '' );
			height = win.getContentHeight();
			styleObj.width = oldWidth;
		} );
	} else {
		height = dim.height;
	}

	this.$frame.css( {
		width: dim.width || '',
		minWidth: dim.minWidth || '',
		maxWidth: dim.maxWidth || '',
		height: height || '',
		minHeight: dim.minHeight || '',
		maxHeight: dim.maxHeight || ''
	} );

	return this;
};

/**
 * Initialize window contents.
 *
 * Before the window is opened for the first time, #initialize is called so that content that
 * persists between openings can be added to the window.
 *
 * To set up a window with new content each time the window opens, use #getSetupProcess.
 *
 * @throws {Error} An error is thrown if the window is not attached to a window manager
 * @chainable
 * @return {OO.ui.Window} The window, for chaining
 */
OO.ui.Window.prototype.initialize = function () {
	if ( !this.manager ) {
		throw new Error( 'Cannot initialize window, must be attached to a manager' );
	}

	// Properties
	this.$head = $( '<div>' );
	this.$body = $( '<div>' );
	this.$foot = $( '<div>' );
	this.$document = $( this.getElementDocument() );

	// Events
	this.$element.on( 'mousedown', this.onMouseDown.bind( this ) );

	// Initialization
	this.$head.addClass( 'oo-ui-window-head' );
	this.$body.addClass( 'oo-ui-window-body' );
	this.$foot.addClass( 'oo-ui-window-foot' );
	this.$content.append( this.$head, this.$body, this.$foot );

	return this;
};

/**
 * Called when someone tries to focus the hidden element at the end of the dialog.
 * Sends focus back to the start of the dialog.
 *
 * @param {jQuery.Event} event Focus event
 */
OO.ui.Window.prototype.onFocusTrapFocused = function ( event ) {
	var backwards = this.$focusTrapBefore.is( event.target ),
		element = OO.ui.findFocusable( this.$content, backwards );
	if ( element ) {
		// There's a focusable element inside the content, at the front or
		// back depending on which focus trap we hit; select it.
		element.focus();
	} else {
		// There's nothing focusable inside the content. As a fallback,
		// this.$content is focusable, and focusing it will keep our focus
		// properly trapped. It's not a *meaningful* focus, since it's just
		// the content-div for the Window, but it's better than letting focus
		// escape into the page.
		this.$content.trigger( 'focus' );
	}
};

/**
 * Open the window.
 *
 * This method is a wrapper around a call to the window
 * manager’s {@link OO.ui.WindowManager#openWindow openWindow} method.
 *
 * To customize the window each time it opens, use #getSetupProcess or #getReadyProcess.
 *
 * @param {Object} [data] Window opening data
 * @return {OO.ui.WindowInstance} See OO.ui.WindowManager#openWindow
 * @throws {Error} An error is thrown if the window is not attached to a window manager
 */
OO.ui.Window.prototype.open = function ( data ) {
	if ( !this.manager ) {
		throw new Error( 'Cannot open window, must be attached to a manager' );
	}

	return this.manager.openWindow( this, data );
};

/**
 * Close the window.
 *
 * This method is a wrapper around a call to the window
 * manager’s {@link OO.ui.WindowManager#closeWindow closeWindow} method.
 *
 * The window's #getHoldProcess and #getTeardownProcess methods are called during the closing
 * phase of the window’s lifecycle and can be used to specify closing behavior each time
 * the window closes.
 *
 * @param {Object} [data] Window closing data
 * @return {OO.ui.WindowInstance} See OO.ui.WindowManager#closeWindow
 * @throws {Error} An error is thrown if the window is not attached to a window manager
 */
OO.ui.Window.prototype.close = function ( data ) {
	if ( !this.manager ) {
		throw new Error( 'Cannot close window, must be attached to a manager' );
	}

	return this.manager.closeWindow( this, data );
};

/**
 * Setup window.
 *
 * This is called by OO.ui.WindowManager during window opening (before the animation), and should
 * not be called directly by other systems.
 *
 * @param {Object} [data] Window opening data
 * @return {jQuery.Promise} Promise resolved when window is setup
 */
OO.ui.Window.prototype.setup = function ( data ) {
	var win = this;

	this.toggle( true );

	this.focusTrapHandler = OO.ui.bind( this.onFocusTrapFocused, this );
	this.$focusTraps.on( 'focus', this.focusTrapHandler );

	return this.getSetupProcess( data ).execute().then( function () {
		win.updateSize();
		// Force redraw by asking the browser to measure the elements' widths
		win.$element.addClass( 'oo-ui-window-active oo-ui-window-setup' ).width();
		win.$content.addClass( 'oo-ui-window-content-setup' ).width();
	} );
};

/**
 * Ready window.
 *
 * This is called by OO.ui.WindowManager during window opening (after the animation), and should not
 * be called directly by other systems.
 *
 * @param {Object} [data] Window opening data
 * @return {jQuery.Promise} Promise resolved when window is ready
 */
OO.ui.Window.prototype.ready = function ( data ) {
	var win = this;

	this.$content.trigger( 'focus' );
	return this.getReadyProcess( data ).execute().then( function () {
		// Force redraw by asking the browser to measure the elements' widths
		win.$element.addClass( 'oo-ui-window-ready' ).width();
		win.$content.addClass( 'oo-ui-window-content-ready' ).width();
	} );
};

/**
 * Hold window.
 *
 * This is called by OO.ui.WindowManager during window closing (before the animation), and should
 * not be called directly by other systems.
 *
 * @param {Object} [data] Window closing data
 * @return {jQuery.Promise} Promise resolved when window is held
 */
OO.ui.Window.prototype.hold = function ( data ) {
	var win = this;

	return this.getHoldProcess( data ).execute().then( function () {
		// Get the focused element within the window's content
		var $focus = win.$content.find(
			OO.ui.Element.static.getDocument( win.$content ).activeElement
		);

		// Blur the focused element
		if ( $focus.length ) {
			$focus[ 0 ].blur();
		}

		// Force redraw by asking the browser to measure the elements' widths
		win.$element.removeClass( 'oo-ui-window-ready oo-ui-window-setup' ).width();
		win.$content.removeClass( 'oo-ui-window-content-ready oo-ui-window-content-setup' ).width();
	} );
};

/**
 * Teardown window.
 *
 * This is called by OO.ui.WindowManager during window closing (after the animation), and should not
 * be called directly by other systems.
 *
 * @param {Object} [data] Window closing data
 * @return {jQuery.Promise} Promise resolved when window is torn down
 */
OO.ui.Window.prototype.teardown = function ( data ) {
	var win = this;

	return this.getTeardownProcess( data ).execute().then( function () {
		// Force redraw by asking the browser to measure the elements' widths
		win.$element.removeClass( 'oo-ui-window-active' ).width();

		win.$focusTraps.off( 'focus', win.focusTrapHandler );
		win.toggle( false );
	} );
};

/**
 * The Dialog class serves as the base class for the other types of dialogs.
 * Unless extended to include controls, the rendered dialog box is a simple window
 * that users can close by hitting the Escape key. Dialog windows are used with OO.ui.WindowManager,
 * which opens, closes, and controls the presentation of the window. See the
 * [OOUI documentation on MediaWiki] [1] for more information.
 *
 *     @example
 *     // A simple dialog window.
 *     function MyDialog( config ) {
 *         MyDialog.parent.call( this, config );
 *     }
 *     OO.inheritClass( MyDialog, OO.ui.Dialog );
 *     MyDialog.static.name = 'myDialog';
 *     MyDialog.prototype.initialize = function () {
 *         MyDialog.parent.prototype.initialize.call( this );
 *         this.content = new OO.ui.PanelLayout( { padded: true, expanded: false } );
 *         this.content.$element.append( '<p>A simple dialog window. Press Escape key to ' +
 *             'close.</p>' );
 *         this.$body.append( this.content.$element );
 *     };
 *     MyDialog.prototype.getBodyHeight = function () {
 *         return this.content.$element.outerHeight( true );
 *     };
 *     var myDialog = new MyDialog( {
 *         size: 'medium'
 *     } );
 *     // Create and append a window manager, which opens and closes the window.
 *     var windowManager = new OO.ui.WindowManager();
 *     $( document.body ).append( windowManager.$element );
 *     windowManager.addWindows( [ myDialog ] );
 *     // Open the window!
 *     windowManager.openWindow( myDialog );
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Windows/Dialogs
 *
 * @abstract
 * @class
 * @extends OO.ui.Window
 * @mixins OO.ui.mixin.PendingElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 */
OO.ui.Dialog = function OoUiDialog( config ) {
	// Parent constructor
	OO.ui.Dialog.parent.call( this, config );

	// Mixin constructors
	OO.ui.mixin.PendingElement.call( this );

	// Properties
	this.actions = new OO.ui.ActionSet();
	this.attachedActions = [];
	this.currentAction = null;
	this.onDialogKeyDownHandler = this.onDialogKeyDown.bind( this );

	// Events
	this.actions.connect( this, {
		click: 'onActionClick',
		change: 'onActionsChange'
	} );

	// Initialization
	this.$element
		.addClass( 'oo-ui-dialog' )
		.attr( 'role', 'dialog' );
};

/* Setup */

OO.inheritClass( OO.ui.Dialog, OO.ui.Window );
OO.mixinClass( OO.ui.Dialog, OO.ui.mixin.PendingElement );

/* Static Properties */

/**
 * Symbolic name of dialog.
 *
 * The dialog class must have a symbolic name in order to be registered with OO.Factory.
 * Please see the [OOUI documentation on MediaWiki] [3] for more information.
 *
 * [3]: https://www.mediawiki.org/wiki/OOUI/Windows/Window_managers
 *
 * @abstract
 * @static
 * @inheritable
 * @property {string}
 */
OO.ui.Dialog.static.name = '';

/**
 * The dialog title.
 *
 * The title can be specified as a plaintext string, a {@link OO.ui.mixin.LabelElement Label} node,
 * or a function that will produce a Label node or string. The title can also be specified with data
 * passed to the constructor (see #getSetupProcess). In this case, the static value will be
 * overridden.
 *
 * @abstract
 * @static
 * @inheritable
 * @property {jQuery|string|Function}
 */
OO.ui.Dialog.static.title = '';

/**
 * An array of configured {@link OO.ui.ActionWidget action widgets}.
 *
 * Actions can also be specified with data passed to the constructor (see #getSetupProcess). In this
 * case, the static value will be overridden.
 *
 * [2]: https://www.mediawiki.org/wiki/OOUI/Windows/Process_Dialogs#Action_sets
 *
 * @static
 * @inheritable
 * @property {Object[]}
 */
OO.ui.Dialog.static.actions = [];

/**
 * Close the dialog when the Escape key is pressed.
 *
 * @static
 * @abstract
 * @inheritable
 * @property {boolean}
 */
OO.ui.Dialog.static.escapable = true;

/* Methods */

/**
 * Handle frame document key down events.
 *
 * @private
 * @param {jQuery.Event} e Key down event
 */
OO.ui.Dialog.prototype.onDialogKeyDown = function ( e ) {
	var actions;
	if ( e.which === OO.ui.Keys.ESCAPE && this.constructor.static.escapable ) {
		this.executeAction( '' );
		e.preventDefault();
		e.stopPropagation();
	} else if ( e.which === OO.ui.Keys.ENTER && ( e.ctrlKey || e.metaKey ) ) {
		actions = this.actions.get( { flags: 'primary', visible: true, disabled: false } );
		if ( actions.length > 0 ) {
			this.executeAction( actions[ 0 ].getAction() );
			e.preventDefault();
			e.stopPropagation();
		}
	}
};

/**
 * Handle action click events.
 *
 * @private
 * @param {OO.ui.ActionWidget} action Action that was clicked
 */
OO.ui.Dialog.prototype.onActionClick = function ( action ) {
	if ( !this.isPending() ) {
		this.executeAction( action.getAction() );
	}
};

/**
 * Handle actions change event.
 *
 * @private
 */
OO.ui.Dialog.prototype.onActionsChange = function () {
	this.detachActions();
	if ( !this.isClosing() ) {
		this.attachActions();
		if ( !this.isOpening() ) {
			// If the dialog is currently opening, this will be called automatically soon.
			this.updateSize();
		}
	}
};

/**
 * Get the set of actions used by the dialog.
 *
 * @return {OO.ui.ActionSet}
 */
OO.ui.Dialog.prototype.getActions = function () {
	return this.actions;
};

/**
 * Get a process for taking action.
 *
 * When you override this method, you can create a new OO.ui.Process and return it, or add
 * additional accept steps to the process the parent method provides using the
 * {@link OO.ui.Process#first 'first'} and {@link OO.ui.Process#next 'next'} methods of
 * OO.ui.Process.
 *
 * @param {string} [action] Symbolic name of action
 * @return {OO.ui.Process} Action process
 */
OO.ui.Dialog.prototype.getActionProcess = function ( action ) {
	return new OO.ui.Process()
		.next( function () {
			if ( !action ) {
				// An empty action always closes the dialog without data, which should always be
				// safe and make no changes
				this.close();
			}
		}, this );
};

/**
 * @inheritdoc
 *
 * @param {Object} [data] Dialog opening data
 * @param {jQuery|string|Function|null} [data.title] Dialog title, omit to use
 *  the {@link #static-title static title}
 * @param {Object[]} [data.actions] List of configuration options for each
 *   {@link OO.ui.ActionWidget action widget}, omit to use {@link #static-actions static actions}.
 */
OO.ui.Dialog.prototype.getSetupProcess = function ( data ) {
	data = data || {};

	// Parent method
	return OO.ui.Dialog.parent.prototype.getSetupProcess.call( this, data )
		.next( function () {
			var config = this.constructor.static,
				actions = data.actions !== undefined ? data.actions : config.actions,
				title = data.title !== undefined ? data.title : config.title;

			this.title.setLabel( title ).setTitle( title );
			this.actions.add( this.getActionWidgets( actions ) );

			this.$element.on( 'keydown', this.onDialogKeyDownHandler );
		}, this );
};

/**
 * @inheritdoc
 */
OO.ui.Dialog.prototype.getTeardownProcess = function ( data ) {
	// Parent method
	return OO.ui.Dialog.parent.prototype.getTeardownProcess.call( this, data )
		.first( function () {
			this.$element.off( 'keydown', this.onDialogKeyDownHandler );

			this.actions.clear();
			this.currentAction = null;
		}, this );
};

/**
 * @inheritdoc
 */
OO.ui.Dialog.prototype.initialize = function () {
	// Parent method
	OO.ui.Dialog.parent.prototype.initialize.call( this );

	// Properties
	this.title = new OO.ui.LabelWidget();

	// Initialization
	this.$content.addClass( 'oo-ui-dialog-content' );
	this.$element.attr( 'aria-labelledby', this.title.getElementId() );
	this.setPendingElement( this.$head );
};

/**
 * Get action widgets from a list of configs
 *
 * @param {Object[]} actions Action widget configs
 * @return {OO.ui.ActionWidget[]} Action widgets
 */
OO.ui.Dialog.prototype.getActionWidgets = function ( actions ) {
	var i, len, widgets = [];
	for ( i = 0, len = actions.length; i < len; i++ ) {
		widgets.push( this.getActionWidget( actions[ i ] ) );
	}
	return widgets;
};

/**
 * Get action widget from config
 *
 * Override this method to change the action widget class used.
 *
 * @param {Object} config Action widget config
 * @return {OO.ui.ActionWidget} Action widget
 */
OO.ui.Dialog.prototype.getActionWidget = function ( config ) {
	return new OO.ui.ActionWidget( this.getActionWidgetConfig( config ) );
};

/**
 * Get action widget config
 *
 * Override this method to modify the action widget config
 *
 * @param {Object} config Initial action widget config
 * @return {Object} Action widget config
 */
OO.ui.Dialog.prototype.getActionWidgetConfig = function ( config ) {
	return config;
};

/**
 * Attach action actions.
 *
 * @protected
 */
OO.ui.Dialog.prototype.attachActions = function () {
	// Remember the list of potentially attached actions
	this.attachedActions = this.actions.get();
};

/**
 * Detach action actions.
 *
 * @protected
 * @chainable
 * @return {OO.ui.Dialog} The dialog, for chaining
 */
OO.ui.Dialog.prototype.detachActions = function () {
	var i, len;

	// Detach all actions that may have been previously attached
	for ( i = 0, len = this.attachedActions.length; i < len; i++ ) {
		this.attachedActions[ i ].$element.detach();
	}
	this.attachedActions = [];

	return this;
};

/**
 * Execute an action.
 *
 * @param {string} action Symbolic name of action to execute
 * @return {jQuery.Promise} Promise resolved when action completes, rejected if it fails
 */
OO.ui.Dialog.prototype.executeAction = function ( action ) {
	this.pushPending();
	this.currentAction = action;
	return this.getActionProcess( action ).execute()
		.always( this.popPending.bind( this ) );
};

/**
 * MessageDialogs display a confirmation or alert message. By default, the rendered dialog box
 * consists of a header that contains the dialog title, a body with the message, and a footer that
 * contains any {@link OO.ui.ActionWidget action widgets}. The MessageDialog class is the only type
 * of {@link OO.ui.Dialog dialog} that is usually instantiated directly.
 *
 * There are two basic types of message dialogs, confirmation and alert:
 *
 * - **confirmation**: the dialog title describes what a progressive action will do and the message
 *   provides more details about the consequences.
 * - **alert**: the dialog title describes which event occurred and the message provides more
 *   information about why the event occurred.
 *
 * The MessageDialog class specifies two actions: ‘accept’, the primary
 * action (e.g., ‘ok’) and ‘reject,’ the safe action (e.g., ‘cancel’). Both will close the window,
 * passing along the selected action.
 *
 * For more information and examples, please see the [OOUI documentation on MediaWiki][1].
 *
 *     @example
 *     // Example: Creating and opening a message dialog window.
 *     var messageDialog = new OO.ui.MessageDialog();
 *
 *     // Create and append a window manager.
 *     var windowManager = new OO.ui.WindowManager();
 *     $( document.body ).append( windowManager.$element );
 *     windowManager.addWindows( [ messageDialog ] );
 *     // Open the window.
 *     windowManager.openWindow( messageDialog, {
 *         title: 'Basic message dialog',
 *         message: 'This is the message'
 *     } );
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Windows/Message_Dialogs
 *
 * @class
 * @extends OO.ui.Dialog
 *
 * @constructor
 * @param {Object} [config] Configuration options
 */
OO.ui.MessageDialog = function OoUiMessageDialog( config ) {
	// Parent constructor
	OO.ui.MessageDialog.parent.call( this, config );

	// Properties
	this.verticalActionLayout = null;

	// Initialization
	this.$element.addClass( 'oo-ui-messageDialog' );
};

/* Setup */

OO.inheritClass( OO.ui.MessageDialog, OO.ui.Dialog );

/* Static Properties */

/**
 * @static
 * @inheritdoc
 */
OO.ui.MessageDialog.static.name = 'message';

/**
 * @static
 * @inheritdoc
 */
OO.ui.MessageDialog.static.size = 'small';

/**
 * Dialog title.
 *
 * The title of a confirmation dialog describes what a progressive action will do. The
 * title of an alert dialog describes which event occurred.
 *
 * @static
 * @inheritable
 * @property {jQuery|string|Function|null}
 */
OO.ui.MessageDialog.static.title = null;

/**
 * The message displayed in the dialog body.
 *
 * A confirmation message describes the consequences of a progressive action. An alert
 * message describes why an event occurred.
 *
 * @static
 * @inheritable
 * @property {jQuery|string|Function|null}
 */
OO.ui.MessageDialog.static.message = null;

/**
 * @static
 * @inheritdoc
 */
OO.ui.MessageDialog.static.actions = [
	// Note that OO.ui.alert() and OO.ui.confirm() rely on these.
	{ action: 'accept', label: OO.ui.deferMsg( 'ooui-dialog-message-accept' ), flags: 'primary' },
	{ action: 'reject', label: OO.ui.deferMsg( 'ooui-dialog-message-reject' ), flags: 'safe' }
];

/* Methods */

/**
 * Toggle action layout between vertical and horizontal.
 *
 * @private
 * @param {boolean} [value] Layout actions vertically, omit to toggle
 * @chainable
 * @return {OO.ui.MessageDialog} The dialog, for chaining
 */
OO.ui.MessageDialog.prototype.toggleVerticalActionLayout = function ( value ) {
	value = value === undefined ? !this.verticalActionLayout : !!value;

	if ( value !== this.verticalActionLayout ) {
		this.verticalActionLayout = value;
		this.$actions
			.toggleClass( 'oo-ui-messageDialog-actions-vertical', value )
			.toggleClass( 'oo-ui-messageDialog-actions-horizontal', !value );
	}

	return this;
};

/**
 * @inheritdoc
 */
OO.ui.MessageDialog.prototype.getActionProcess = function ( action ) {
	if ( action ) {
		return new OO.ui.Process( function () {
			this.close( { action: action } );
		}, this );
	}
	return OO.ui.MessageDialog.parent.prototype.getActionProcess.call( this, action );
};

/**
 * @inheritdoc
 *
 * @param {Object} [data] Dialog opening data
 * @param {jQuery|string|Function|null} [data.title] Description of the action being confirmed
 * @param {jQuery|string|Function|null} [data.message] Description of the action's consequence
 * @param {string} [data.size] Symbolic name of the dialog size, see OO.ui.Window
 * @param {Object[]} [data.actions] List of OO.ui.ActionOptionWidget configuration options for each
 *  action item
 */
OO.ui.MessageDialog.prototype.getSetupProcess = function ( data ) {
	data = data || {};

	// Parent method
	return OO.ui.MessageDialog.parent.prototype.getSetupProcess.call( this, data )
		.next( function () {
			this.title.setLabel(
				data.title !== undefined ? data.title : this.constructor.static.title
			);
			this.message.setLabel(
				data.message !== undefined ? data.message : this.constructor.static.message
			);
			this.size = data.size !== undefined ? data.size : this.constructor.static.size;
		}, this );
};

/**
 * @inheritdoc
 */
OO.ui.MessageDialog.prototype.getReadyProcess = function ( data ) {
	data = data || {};

	// Parent method
	return OO.ui.MessageDialog.parent.prototype.getReadyProcess.call( this, data )
		.next( function () {
			// Focus the primary action button
			var actions = this.actions.get();
			actions = actions.filter( function ( action ) {
				return action.getFlags().indexOf( 'primary' ) > -1;
			} );
			if ( actions.length > 0 ) {
				actions[ 0 ].focus();
			}
		}, this );
};

/**
 * @inheritdoc
 */
OO.ui.MessageDialog.prototype.getBodyHeight = function () {
	var bodyHeight, oldOverflow,
		$scrollable = this.container.$element;

	oldOverflow = $scrollable[ 0 ].style.overflow;
	$scrollable[ 0 ].style.overflow = 'hidden';

	OO.ui.Element.static.reconsiderScrollbars( $scrollable[ 0 ] );

	bodyHeight = this.text.$element.outerHeight( true );
	$scrollable[ 0 ].style.overflow = oldOverflow;

	return bodyHeight;
};

/**
 * @inheritdoc
 */
OO.ui.MessageDialog.prototype.setDimensions = function ( dim ) {
	var
		dialog = this,
		$scrollable = this.container.$element;
	OO.ui.MessageDialog.parent.prototype.setDimensions.call( this, dim );

	// Twiddle the overflow property, otherwise an unnecessary scrollbar will be produced.
	// Need to do it after transition completes (250ms), add 50ms just in case.
	setTimeout( function () {
		var oldOverflow = $scrollable[ 0 ].style.overflow,
			activeElement = document.activeElement;

		$scrollable[ 0 ].style.overflow = 'hidden';

		OO.ui.Element.static.reconsiderScrollbars( $scrollable[ 0 ] );

		// Check reconsiderScrollbars didn't destroy our focus, as we
		// are doing this after the ready process.
		if ( activeElement && activeElement !== document.activeElement && activeElement.focus ) {
			activeElement.focus();
		}

		$scrollable[ 0 ].style.overflow = oldOverflow;
	}, 300 );

	dialog.fitActions();
	// Wait for CSS transition to finish and do it again :(
	setTimeout( function () {
		dialog.fitActions();
	}, 300 );

	return this;
};

/**
 * @inheritdoc
 */
OO.ui.MessageDialog.prototype.initialize = function () {
	// Parent method
	OO.ui.MessageDialog.parent.prototype.initialize.call( this );

	// Properties
	this.$actions = $( '<div>' );
	this.container = new OO.ui.PanelLayout( {
		scrollable: true, classes: [ 'oo-ui-messageDialog-container' ]
	} );
	this.text = new OO.ui.PanelLayout( {
		padded: true, expanded: false, classes: [ 'oo-ui-messageDialog-text' ]
	} );
	this.message = new OO.ui.LabelWidget( {
		classes: [ 'oo-ui-messageDialog-message' ]
	} );

	// Initialization
	this.title.$element.addClass( 'oo-ui-messageDialog-title' );
	this.$content.addClass( 'oo-ui-messageDialog-content' );
	this.container.$element.append( this.text.$element );
	this.text.$element.append( this.title.$element, this.message.$element );
	this.$body.append( this.container.$element );
	this.$actions.addClass( 'oo-ui-messageDialog-actions' );
	this.$foot.append( this.$actions );
};

/**
 * @inheritdoc
 */
OO.ui.MessageDialog.prototype.getActionWidgetConfig = function ( config ) {
	// Force unframed
	return $.extend( {}, config, { framed: false } );
};

/**
 * @inheritdoc
 */
OO.ui.MessageDialog.prototype.attachActions = function () {
	var i, len, special, others;

	// Parent method
	OO.ui.MessageDialog.parent.prototype.attachActions.call( this );

	special = this.actions.getSpecial();
	others = this.actions.getOthers();

	if ( special.safe ) {
		this.$actions.append( special.safe.$element );
		special.safe.toggleFramed( true );
	}
	for ( i = 0, len = others.length; i < len; i++ ) {
		this.$actions.append( others[ i ].$element );
		others[ i ].toggleFramed( true );
	}
	if ( special.primary ) {
		this.$actions.append( special.primary.$element );
		special.primary.toggleFramed( true );
	}
};

/**
 * Fit action actions into columns or rows.
 *
 * Columns will be used if all labels can fit without overflow, otherwise rows will be used.
 *
 * @private
 */
OO.ui.MessageDialog.prototype.fitActions = function () {
	var i, len, action,
		previous = this.verticalActionLayout,
		actions = this.actions.get();

	// Detect clipping
	this.toggleVerticalActionLayout( false );
	for ( i = 0, len = actions.length; i < len; i++ ) {
		action = actions[ i ];
		if ( action.$element[ 0 ].scrollWidth > action.$element[ 0 ].clientWidth ) {
			this.toggleVerticalActionLayout( true );
			break;
		}
	}

	// Move the body out of the way of the foot
	this.$body.css( 'bottom', this.$foot.outerHeight( true ) );

	if ( this.verticalActionLayout !== previous ) {
		// We changed the layout, window height might need to be updated.
		this.updateSize();
	}
};

/**
 * ProcessDialog windows encapsulate a {@link OO.ui.Process process} and all of the code necessary
 * to complete it. If the process terminates with an error, a customizable {@link OO.ui.Error error
 * interface} alerts users to the trouble, permitting the user to dismiss the error and try again
 * when relevant. The ProcessDialog class is always extended and customized with the actions and
 * content required for each process.
 *
 * The process dialog box consists of a header that visually represents the ‘working’ state of long
 * processes with an animation. The header contains the dialog title as well as
 * two {@link OO.ui.ActionWidget action widgets}:  a ‘safe’ action on the left (e.g., ‘Cancel’) and
 * a ‘primary’ action on the right (e.g., ‘Done’).
 *
 * Like other windows, the process dialog is managed by a
 * {@link OO.ui.WindowManager window manager}.
 * Please see the [OOUI documentation on MediaWiki][1] for more information and examples.
 *
 *     @example
 *     // Example: Creating and opening a process dialog window.
 *     function MyProcessDialog( config ) {
 *         MyProcessDialog.parent.call( this, config );
 *     }
 *     OO.inheritClass( MyProcessDialog, OO.ui.ProcessDialog );
 *
 *     MyProcessDialog.static.name = 'myProcessDialog';
 *     MyProcessDialog.static.title = 'Process dialog';
 *     MyProcessDialog.static.actions = [
 *         { action: 'save', label: 'Done', flags: 'primary' },
 *         { label: 'Cancel', flags: 'safe' }
 *     ];
 *
 *     MyProcessDialog.prototype.initialize = function () {
 *         MyProcessDialog.parent.prototype.initialize.apply( this, arguments );
 *         this.content = new OO.ui.PanelLayout( { padded: true, expanded: false } );
 *         this.content.$element.append( '<p>This is a process dialog window. The header ' +
 *             'contains the title and two buttons: \'Cancel\' (a safe action) on the left and ' +
 *             '\'Done\' (a primary action)  on the right.</p>' );
 *         this.$body.append( this.content.$element );
 *     };
 *     MyProcessDialog.prototype.getActionProcess = function ( action ) {
 *         var dialog = this;
 *         if ( action ) {
 *             return new OO.ui.Process( function () {
 *                 dialog.close( { action: action } );
 *             } );
 *         }
 *         return MyProcessDialog.parent.prototype.getActionProcess.call( this, action );
 *     };
 *
 *     var windowManager = new OO.ui.WindowManager();
 *     $( document.body ).append( windowManager.$element );
 *
 *     var dialog = new MyProcessDialog();
 *     windowManager.addWindows( [ dialog ] );
 *     windowManager.openWindow( dialog );
 *
 * [1]: https://www.mediawiki.org/wiki/OOUI/Windows/Process_Dialogs
 *
 * @abstract
 * @class
 * @extends OO.ui.Dialog
 *
 * @constructor
 * @param {Object} [config] Configuration options
 */
OO.ui.ProcessDialog = function OoUiProcessDialog( config ) {
	// Parent constructor
	OO.ui.ProcessDialog.parent.call( this, config );

	// Properties
	this.fitOnOpen = false;

	// Initialization
	this.$element.addClass( 'oo-ui-processDialog' );
	if ( OO.ui.isMobile() ) {
		this.$element.addClass( 'oo-ui-isMobile' );
	}
};

/* Setup */

OO.inheritClass( OO.ui.ProcessDialog, OO.ui.Dialog );

/* Methods */

/**
 * Handle dismiss button click events.
 *
 * Hides errors.
 *
 * @private
 */
OO.ui.ProcessDialog.prototype.onDismissErrorButtonClick = function () {
	this.hideErrors();
};

/**
 * Handle retry button click events.
 *
 * Hides errors and then tries again.
 *
 * @private
 */
OO.ui.ProcessDialog.prototype.onRetryButtonClick = function () {
	this.hideErrors();
	this.executeAction( this.currentAction );
};

/**
 * @inheritdoc
 */
OO.ui.ProcessDialog.prototype.initialize = function () {
	// Parent method
	OO.ui.ProcessDialog.parent.prototype.initialize.call( this );

	// Properties
	this.$navigation = $( '<div>' );
	this.$location = $( '<div>' );
	this.$safeActions = $( '<div>' );
	this.$primaryActions = $( '<div>' );
	this.$otherActions = $( '<div>' );
	this.dismissButton = new OO.ui.ButtonWidget( {
		label: OO.ui.msg( 'ooui-dialog-process-dismiss' )
	} );
	this.retryButton = new OO.ui.ButtonWidget();
	this.$errors = $( '<div>' );
	this.$errorsTitle = $( '<div>' );

	// Events
	this.dismissButton.connect( this, {
		click: 'onDismissErrorButtonClick'
	} );
	this.retryButton.connect( this, {
		click: 'onRetryButtonClick'
	} );
	this.title.connect( this, {
		labelChange: 'fitLabel'
	} );

	// Initialization
	this.title.$element.addClass( 'oo-ui-processDialog-title' );
	this.$location
		.append( this.title.$element )
		.addClass( 'oo-ui-processDialog-location' );
	this.$safeActions.addClass( 'oo-ui-processDialog-actions-safe' );
	this.$primaryActions.addClass( 'oo-ui-processDialog-actions-primary' );
	this.$otherActions.addClass( 'oo-ui-processDialog-actions-other' );
	this.$errorsTitle
		.addClass( 'oo-ui-processDialog-errors-title' )
		.text( OO.ui.msg( 'ooui-dialog-process-error' ) );
	this.$errors
		.addClass( 'oo-ui-processDialog-errors oo-ui-element-hidden' )
		.append( this.$errorsTitle, this.dismissButton.$element, this.retryButton.$element );
	this.$content
		.addClass( 'oo-ui-processDialog-content' )
		.append( this.$errors );
	this.$navigation
		.addClass( 'oo-ui-processDialog-navigation' )
		// Note: Order of appends below is important. These are in the order
		// we want tab to go through them. Display-order is handled entirely
		// by CSS absolute-positioning. As such, primary actions like "done"
		// should go first.
		.append( this.$primaryActions, this.$location, this.$safeActions );
	this.$head.append( this.$navigation );
	this.$foot.append( this.$otherActions );
};

/**
 * @inheritdoc
 */
OO.ui.ProcessDialog.prototype.getActionWidgetConfig = function ( config ) {
	function checkFlag( flag ) {
		return config.flags === flag ||
			( Array.isArray( config.flags ) && config.flags.indexOf( flag ) !== -1 );
	}

	// Default to unframed.
	config = $.extend( { framed: true }, config );
	if ( checkFlag( 'close' ) ) {
		// Change close buttons to icon only.
		$.extend( config, {
			icon: 'close',
			invisibleLabel: true
		} );
	} else if ( OO.ui.isMobile() && checkFlag( 'back' ) ) {
		// Change back buttons to icon only.
		$.extend( config, {
			icon: 'previous',
			invisibleLabel: true
		} );
	}

	return config;
};

/**
 * @inheritdoc
 */
OO.ui.ProcessDialog.prototype.attachActions = function () {
	var i, len, other, special, others;

	// Parent method
	OO.ui.ProcessDialog.parent.prototype.attachActions.call( this );

	special = this.actions.getSpecial();
	others = this.actions.getOthers();
	if ( special.primary ) {
		this.$primaryActions.append( special.primary.$element );
	}
	for ( i = 0, len = others.length; i < len; i++ ) {
		other = others[ i ];
		this.$otherActions.append( other.$element );
	}
	if ( special.safe ) {
		this.$safeActions.append( special.safe.$element );
	}
};

/**
 * @inheritdoc
 */
OO.ui.ProcessDialog.prototype.executeAction = function ( action ) {
	var process = this;
	return OO.ui.ProcessDialog.parent.prototype.executeAction.call( this, action )
		.fail( function ( errors ) {
			process.showErrors( errors || [] );
		} );
};

/**
 * @inheritdoc
 */
OO.ui.ProcessDialog.prototype.setDimensions = function () {
	var dialog = this;

	// Parent method
	OO.ui.ProcessDialog.parent.prototype.setDimensions.apply( this, arguments );

	this.fitLabel();

	// If there are many actions, they might be shown on multiple lines. Their layout can change
	// when resizing the dialog and when changing the actions. Adjust the height of the footer to
	// fit them.
	dialog.$body.css( 'bottom', dialog.$foot.outerHeight( true ) );
	// Wait for CSS transition to finish and do it again :(
	setTimeout( function () {
		dialog.$body.css( 'bottom', dialog.$foot.outerHeight( true ) );
	}, 300 );
};

/**
 * Fit label between actions.
 *
 * @private
 * @chainable
 * @return {OO.ui.MessageDialog} The dialog, for chaining
 */
OO.ui.ProcessDialog.prototype.fitLabel = function () {
	var safeWidth, primaryWidth, biggerWidth, labelWidth, navigationWidth, leftWidth, rightWidth,
		size = this.getSizeProperties();

	if ( typeof size.width !== 'number' ) {
		if ( this.isOpened() ) {
			navigationWidth = this.$head.width() - 20;
		} else if ( this.isOpening() ) {
			if ( !this.fitOnOpen ) {
				// Size is relative and the dialog isn't open yet, so wait.
				// FIXME: This should ideally be handled by setup somehow.
				this.manager.lifecycle.opened.done( this.fitLabel.bind( this ) );
				this.fitOnOpen = true;
			}
			return;
		} else {
			return;
		}
	} else {
		navigationWidth = size.width - 20;
	}

	safeWidth = this.$safeActions.is( ':visible' ) ? this.$safeActions.width() : 0;
	primaryWidth = this.$primaryActions.is( ':visible' ) ? this.$primaryActions.width() : 0;
	biggerWidth = Math.max( safeWidth, primaryWidth );

	labelWidth = this.title.$element.width();

	if ( 2 * biggerWidth + labelWidth < navigationWidth ) {
		// We have enough space to center the label
		leftWidth = rightWidth = biggerWidth;
	} else {
		// Let's hope we at least have enough space not to overlap, because we can't wrap
		// the label.
		if ( this.getDir() === 'ltr' ) {
			leftWidth = safeWidth;
			rightWidth = primaryWidth;
		} else {
			leftWidth = primaryWidth;
			rightWidth = safeWidth;
		}
	}

	this.$location.css( { paddingLeft: leftWidth, paddingRight: rightWidth } );

	return this;
};

/**
 * Handle errors that occurred during accept or reject processes.
 *
 * @private
 * @param {OO.ui.Error[]|OO.ui.Error} errors Errors to be handled
 */
OO.ui.ProcessDialog.prototype.showErrors = function ( errors ) {
	var i, len, $item, actions,
		items = [],
		abilities = {},
		recoverable = true,
		warning = false;

	if ( errors instanceof OO.ui.Error ) {
		errors = [ errors ];
	}

	for ( i = 0, len = errors.length; i < len; i++ ) {
		if ( !errors[ i ].isRecoverable() ) {
			recoverable = false;
		}
		if ( errors[ i ].isWarning() ) {
			warning = true;
		}
		$item = $( '<div>' )
			.addClass( 'oo-ui-processDialog-error' )
			.append( errors[ i ].getMessage() );
		items.push( $item[ 0 ] );
	}
	this.$errorItems = $( items );
	if ( recoverable ) {
		abilities[ this.currentAction ] = true;
		// Copy the flags from the first matching action.
		actions = this.actions.get( { actions: this.currentAction } );
		if ( actions.length ) {
			this.retryButton.clearFlags().setFlags( actions[ 0 ].getFlags() );
		}
	} else {
		abilities[ this.currentAction ] = false;
		this.actions.setAbilities( abilities );
	}
	if ( warning ) {
		this.retryButton.setLabel( OO.ui.msg( 'ooui-dialog-process-continue' ) );
	} else {
		this.retryButton.setLabel( OO.ui.msg( 'ooui-dialog-process-retry' ) );
	}
	this.retryButton.toggle( recoverable );
	this.$errorsTitle.after( this.$errorItems );
	this.$errors.removeClass( 'oo-ui-element-hidden' ).scrollTop( 0 );
};

/**
 * Hide errors.
 *
 * @private
 */
OO.ui.ProcessDialog.prototype.hideErrors = function () {
	this.$errors.addClass( 'oo-ui-element-hidden' );
	if ( this.$errorItems ) {
		this.$errorItems.remove();
		this.$errorItems = null;
	}
};

/**
 * @inheritdoc
 */
OO.ui.ProcessDialog.prototype.getTeardownProcess = function ( data ) {
	// Parent method
	return OO.ui.ProcessDialog.parent.prototype.getTeardownProcess.call( this, data )
		.first( function () {
			// Make sure to hide errors.
			this.hideErrors();
			this.fitOnOpen = false;
		}, this );
};

/**
 * @class OO.ui
 */

/**
 * Lazy-initialize and return a global OO.ui.WindowManager instance, used by OO.ui.alert and
 * OO.ui.confirm.
 *
 * @private
 * @return {OO.ui.WindowManager}
 */
OO.ui.getWindowManager = function () {
	if ( !OO.ui.windowManager ) {
		OO.ui.windowManager = new OO.ui.WindowManager();
		$( document.body ).append( OO.ui.windowManager.$element );
		OO.ui.windowManager.addWindows( [ new OO.ui.MessageDialog() ] );
	}
	return OO.ui.windowManager;
};

/**
 * Display a quick modal alert dialog, using a OO.ui.MessageDialog. While the dialog is open, the
 * rest of the page will be dimmed out and the user won't be able to interact with it. The dialog
 * has only one action button, labelled "OK", clicking it will simply close the dialog.
 *
 * A window manager is created automatically when this function is called for the first time.
 *
 *     @example
 *     OO.ui.alert( 'Something happened!' ).done( function () {
 *         console.log( 'User closed the dialog.' );
 *     } );
 *
 *     OO.ui.alert( 'Something larger happened!', { size: 'large' } );
 *
 * @param {jQuery|string} text Message text to display
 * @param {Object} [options] Additional options, see OO.ui.MessageDialog#getSetupProcess
 * @return {jQuery.Promise} Promise resolved when the user closes the dialog
 */
OO.ui.alert = function ( text, options ) {
	return OO.ui.getWindowManager().openWindow( 'message', $.extend( {
		message: text,
		actions: [ OO.ui.MessageDialog.static.actions[ 0 ] ]
	}, options ) ).closed.then( function () {
		return undefined;
	} );
};

/**
 * Display a quick modal confirmation dialog, using a OO.ui.MessageDialog. While the dialog is open,
 * the rest of the page will be dimmed out and the user won't be able to interact with it. The
 * dialog has two action buttons, one to confirm an operation (labelled "OK") and one to cancel it
 * (labelled "Cancel").
 *
 * A window manager is created automatically when this function is called for the first time.
 *
 *     @example
 *     OO.ui.confirm( 'Are you sure?' ).done( function ( confirmed ) {
 *         if ( confirmed ) {
 *             console.log( 'User clicked "OK"!' );
 *         } else {
 *             console.log( 'User clicked "Cancel" or closed the dialog.' );
 *         }
 *     } );
 *
 * @param {jQuery|string} text Message text to display
 * @param {Object} [options] Additional options, see OO.ui.MessageDialog#getSetupProcess
 * @return {jQuery.Promise} Promise resolved when the user closes the dialog. If the user chose to
 *  confirm, the promise will resolve to boolean `true`; otherwise, it will resolve to boolean
 *  `false`.
 */
OO.ui.confirm = function ( text, options ) {
	return OO.ui.getWindowManager().openWindow( 'message', $.extend( {
		message: text
	}, options ) ).closed.then( function ( data ) {
		return !!( data && data.action === 'accept' );
	} );
};

/**
 * Display a quick modal prompt dialog, using a OO.ui.MessageDialog. While the dialog is open,
 * the rest of the page will be dimmed out and the user won't be able to interact with it. The
 * dialog has a text input widget and two action buttons, one to confirm an operation
 * (labelled "OK") and one to cancel it (labelled "Cancel").
 *
 * A window manager is created automatically when this function is called for the first time.
 *
 *     @example
 *     OO.ui.prompt( 'Choose a line to go to', {
 *         textInput: { placeholder: 'Line number' }
 *     } ).done( function ( result ) {
 *         if ( result !== null ) {
 *             console.log( 'User typed "' + result + '" then clicked "OK".' );
 *         } else {
 *             console.log( 'User clicked "Cancel" or closed the dialog.' );
 *         }
 *     } );
 *
 * @param {jQuery|string} text Message text to display
 * @param {Object} [options] Additional options, see OO.ui.MessageDialog#getSetupProcess
 * @param {Object} [options.textInput] Additional options for text input widget,
 *  see OO.ui.TextInputWidget
 * @return {jQuery.Promise} Promise resolved when the user closes the dialog. If the user chose to
 *  confirm, the promise will resolve with the value of the text input widget; otherwise, it will
 *  resolve to `null`.
 */
OO.ui.prompt = function ( text, options ) {
	var instance,
		manager = OO.ui.getWindowManager(),
		textInput = new OO.ui.TextInputWidget( ( options && options.textInput ) || {} ),
		textField = new OO.ui.FieldLayout( textInput, {
			align: 'top',
			label: text
		} );

	instance = manager.openWindow( 'message', $.extend( {
		message: textField.$element
	}, options ) );

	// TODO: This is a little hacky, and could be done by extending MessageDialog instead.
	instance.opened.then( function () {
		textInput.on( 'enter', function () {
			manager.getCurrentWindow().close( { action: 'accept' } );
		} );
		textInput.focus();
	} );

	return instance.closed.then( function ( data ) {
		return data && data.action === 'accept' ? textInput.getValue() : null;
	} );
};

}( OO ) );

//# sourceMappingURL=oojs-ui-windows.js.map.json