/*!
 * OOjs UI v0.12.12
 * https://www.mediawiki.org/wiki/OOjs_UI
 *
 * Copyright 2011–2015 OOjs UI Team and other contributors.
 * Released under the MIT license
 * http://oojs.mit-license.org
 *
 * Date: 2015-10-13T20:38:18Z
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
 * @property {Number}
 */
OO.ui.elementId = 0;

/**
 * Generate a unique ID for element
 *
 * @return {String} [id]
 */
OO.ui.generateElementId = function () {
	OO.ui.elementId += 1;
	return 'oojsui-' + OO.ui.elementId;
};

/**
 * Check if an element is focusable.
 * Inspired from :focusable in jQueryUI v1.11.4 - 2015-04-14
 *
 * @param {jQuery} element Element to test
 * @return {boolean}
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
		$.expr.filters.visible( element ) &&
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
 * @return {jQuery} Focusable child, an empty jQuery object if none found
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
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {Function}
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
		clearTimeout( timeout );
		timeout = setTimeout( later, wait );
	};
};

/**
 * Proxy for `node.addEventListener( eventName, handler, true )`, if the browser supports it.
 * Otherwise falls back to non-capturing event listeners.
 *
 * @param {HTMLElement} node
 * @param {string} eventName
 * @param {Function} handler
 */
OO.ui.addCaptureEventListener = function ( node, eventName, handler ) {
	if ( node.addEventListener ) {
		node.addEventListener( eventName, handler, true );
	} else {
		node.attachEvent( 'on' + eventName, handler );
	}
};

/**
 * Proxy for `node.removeEventListener( eventName, handler, true )`, if the browser supports it.
 * Otherwise falls back to non-capturing event listeners.
 *
 * @param {HTMLElement} node
 * @param {string} eventName
 * @param {Function} handler
 */
OO.ui.removeCaptureEventListener = function ( node, eventName, handler ) {
	if ( node.addEventListener ) {
		node.removeEventListener( eventName, handler, true );
	} else {
		node.detachEvent( 'on' + eventName, handler );
	}
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
	 * In environments that provide a localization system, this function should be overridden to
	 * return the message translated in the user's language. The default implementation always returns
	 * English messages.
	 *
	 * After the message key, message parameters may optionally be passed. In the default implementation,
	 * any occurrences of $1 are replaced with the first parameter, $2 with the second parameter, etc.
	 * Alternative implementations of OO.ui.msg may use any substitution system they like, as long as
	 * they support unnamed, ordered message parameters.
	 *
	 * @abstract
	 * @param {string} key Message key
	 * @param {Mixed...} [params] Message parameters
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

	/**
	 * Package a message and arguments for deferred resolution.
	 *
	 * Use this when you are statically specifying a message and the message may not yet be present.
	 *
	 * @param {string} key Message key
	 * @param {Mixed...} [params] Message parameters
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
		var protocol,
			// Keep in sync with php/Tag.php
			whitelist = [
				'bitcoin:', 'ftp:', 'ftps:', 'geo:', 'git:', 'gopher:', 'http:', 'https:', 'irc:', 'ircs:',
				'magnet:', 'mailto:', 'mms:', 'news:', 'nntp:', 'redis:', 'sftp:', 'sip:', 'sips:', 'sms:', 'ssh:',
				'svn:', 'tel:', 'telnet:', 'urn:', 'worldwind:', 'xmpp:'
			];

		if ( url.indexOf( ':' ) === -1 ) {
			// No protocol, safe
			return true;
		}

		protocol = url.split( ':', 1 )[ 0 ] + ':';
		if ( !protocol.match( /^([A-za-z0-9\+\.\-])+:/ ) ) {
			// Not a valid protocol, safe
			return true;
		}

		// Safe if in the whitelist
		return whitelist.indexOf( protocol ) !== -1;
	};

} )();

/*!
 * Mixin namespace.
 */

/**
 * Namespace for OOjs UI mixins.
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
 * ActionSets manage the behavior of the {@link OO.ui.ActionWidget action widgets} that comprise them.
 * Actions can be made available for specific contexts (modes) and circumstances
 * (abilities). Action sets are primarily used with {@link OO.ui.Dialog Dialogs}.
 *
 * ActionSets contain two types of actions:
 *
 * - Special: Special actions are the first visible actions with special flags, such as 'safe' and 'primary', the default special flags. Additional special flags can be configured in subclasses with the static #specialFlags property.
 * - Other: Other actions include all non-special visible actions.
 *
 * Please see the [OOjs UI documentation on MediaWiki][1] for more information.
 *
 *     @example
 *     // Example: An action set used in a process dialog
 *     function MyProcessDialog( config ) {
 *         MyProcessDialog.parent.call( this, config );
 *     }
 *     OO.inheritClass( MyProcessDialog, OO.ui.ProcessDialog );
 *     MyProcessDialog.static.title = 'An action set in a process dialog';
 *     // An action set that uses modes ('edit' and 'help' mode, in this example).
 *     MyProcessDialog.static.actions = [
 *         { action: 'continue', modes: 'edit', label: 'Continue', flags: [ 'primary', 'constructive' ] },
 *         { action: 'help', modes: 'edit', label: 'Help' },
 *         { modes: 'edit', label: 'Cancel', flags: 'safe' },
 *         { action: 'back', modes: 'help', label: 'Back', flags: 'safe' }
 *     ];
 *
 *     MyProcessDialog.prototype.initialize = function () {
 *         MyProcessDialog.parent.prototype.initialize.apply( this, arguments );
 *         this.panel1 = new OO.ui.PanelLayout( { padded: true, expanded: false } );
 *         this.panel1.$element.append( '<p>This dialog uses an action set (continue, help, cancel, back) configured with modes. This is edit mode. Click \'help\' to see help mode.</p>' );
 *         this.panel2 = new OO.ui.PanelLayout( { padded: true, expanded: false } );
 *         this.panel2.$element.append( '<p>This is help mode. Only the \'back\' action widget is configured to be visible here. Click \'back\' to return to \'edit\' mode.</p>' );
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
 *     $( 'body' ).append( windowManager.$element );
 *     var dialog = new MyProcessDialog( {
 *         size: 'medium'
 *     } );
 *     windowManager.addWindows( [ dialog ] );
 *     windowManager.openWindow( dialog );
 *
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Windows/Process_Dialogs#Action_sets
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

/* Setup */

OO.mixinClass( OO.ui.ActionSet, OO.EventEmitter );

/* Static Properties */

/**
 * Symbolic name of the flags used to identify special actions. Special actions are displayed in the
 *  header of a {@link OO.ui.ProcessDialog process dialog}.
 *  See the [OOjs UI documentation on MediaWiki][2] for more information and examples.
 *
 *  [2]:https://www.mediawiki.org/wiki/OOjs_UI/Windows/Process_Dialogs
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
 * @event resize
 *
 * A 'resize' event is emitted when an action widget is resized.
 *
 * @param {OO.ui.ActionWidget} action Action that was resized
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
 * or {@link #method-remove removed} from the action set or when the {@link #setMode mode} is changed.
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
 * Special actions are the first visible action widgets with special flags, such as 'safe' and 'primary'.
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
 * @param {Object|null} actions Filters to use to determine which actions to iterate over; see #get
 * @param {Function} callback Callback to run for each action; callback is invoked with three
 *   arguments: the action, the action's index, the list of actions being iterated over
 * @chainable
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
			resize: [ 'emit', 'resize', action ],
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
 * Remove all action widets from the set.
 *
 * To remove only specified actions, use the {@link #method-remove remove} method instead.
 *
 * @chainable
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
 *  to the top level (e.g., the outermost div) of the element. See the [OOjs UI documentation on MediaWiki][2]
 *  for an example.
 *  [2]: https://www.mediawiki.org/wiki/OOjs_UI/Widgets/Buttons_and_Switches#cssExample
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
	// Configuration initialization
	config = config || {};

	// Properties
	this.$ = $;
	this.visible = true;
	this.data = config.data;
	this.$element = config.$element ||
		$( document.createElement( this.getTagName() ) );
	this.elementGroup = null;
	this.debouncedUpdateThemeClassesHandler = OO.ui.debounce( this.debouncedUpdateThemeClasses );

	// Initialization
	if ( Array.isArray( config.classes ) ) {
		this.$element.addClass( config.classes.join( ' ' ) );
	}
	if ( config.id ) {
		this.$element.attr( 'id', config.id );
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
	// FIXME: uncomment after T89721 is fixed (see T90929)
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
 * @private
 * @param {string|HTMLElement|jQuery} idOrNode
 * @param {jQuery.Promise|boolean} domPromise A promise that will be resolved
 *     when the top-level widget of this infusion is inserted into DOM,
 *     replacing the original node; or false for top-level invocation.
 * @return {OO.ui.Element}
 */
OO.ui.Element.static.unsafeInfuse = function ( idOrNode, domPromise ) {
	// look for a cached result of a previous infusion.
	var id, $elem, data, cls, parts, parent, obj, top, state;
	if ( typeof idOrNode === 'string' ) {
		id = idOrNode;
		$elem = $( document.getElementById( id ) );
	} else {
		$elem = $( idOrNode );
		id = $elem.attr( 'id' );
	}
	if ( !$elem.length ) {
		throw new Error( 'Widget not found: ' + id );
	}
	data = $elem.data( 'ooui-infused' ) || $elem[ 0 ].oouiInfused;
	if ( data ) {
		// cached!
		if ( data === true ) {
			throw new Error( 'Circular dependency! ' + id );
		}
		return data;
	}
	data = $elem.attr( 'data-ooui' );
	if ( !data ) {
		throw new Error( 'No infusion data found: ' + id );
	}
	try {
		data = $.parseJSON( data );
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
		// The PHP output might be old and not including the "OO.ui" prefix
		// TODO: Remove this back-compat after next major release
		cls = OO.getProp.apply( OO, [ OO.ui ].concat( parts ) );
		if ( cls === undefined ) {
			throw new Error( 'Unknown widget type: id: ' + id + ', class: ' + data._ );
		}
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
	data = OO.copy( data, null, function deserialize( value ) {
		if ( OO.isPlainObject( value ) ) {
			if ( value.tag ) {
				return OO.ui.Element.static.unsafeInfuse( value.tag, domPromise );
			}
			if ( value.html ) {
				return new OO.ui.HtmlSnippet( value.html );
			}
		}
	} );
	// jscs:disable requireCapitalizedConstructors
	obj = new cls( data ); // rebuild widget
	// pick up dynamic state, like focus, value of form inputs, scroll position, etc.
	state = obj.gatherPreInfuseState( $elem );
	// now replace old DOM with this new DOM.
	if ( top ) {
		$elem.replaceWith( obj.$element );
		// This element is now gone from the DOM, but if anyone is holding a reference to it,
		// let's allow them to OO.ui.infuse() it and do what they expect (T105828).
		// Do not use jQuery.data(), as using it on detached nodes leaks memory in 1.x line by design.
		$elem[ 0 ].oouiInfused = obj;
		top.resolve();
	}
	obj.$element.data( 'ooui-infused', obj );
	// set the 'data-ooui' attribute so we can identify infused widgets
	obj.$element.attr( 'data-ooui', '' );
	// restore dynamic state after the new element is inserted into DOM
	domPromise.done( obj.restorePreInfuseState.bind( obj, state ) );
	return obj;
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
		( obj.nodeType === 9 && obj ) ||
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
	// Support: IE 8
	// Standard Document.defaultView is IE9+
	return doc.parentWindow || doc.defaultView;
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
	isDoc = obj.nodeType === 9;
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
		// Support: IE 8
		// Standard Document.defaultView is IE9+
		win = doc.parentWindow || doc.defaultView,
		style = win && win.getComputedStyle ?
			win.getComputedStyle( el, null ) :
			// Support: IE 8
			// Standard getComputedStyle() is IE9+
			el.currentStyle,
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
		// Support: IE 8
		// Standard Document.defaultView is IE9+
		win = doc.parentWindow || doc.defaultView;

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
 * Get scrollable object parent
 *
 * documentElement can't be used to get or set the scrollTop
 * property on Blink. Changing and testing its value lets us
 * use 'body' or 'documentElement' based on what is working.
 *
 * https://code.google.com/p/chromium/issues/detail?id=303131
 *
 * @static
 * @param {HTMLElement} el Element to find scrollable parent for
 * @return {HTMLElement} Scrollable parent
 */
OO.ui.Element.static.getRootScrollableElement = function ( el ) {
	var scrollTop, body;

	if ( OO.ui.scrollableElement === undefined ) {
		body = el.ownerDocument.body;
		scrollTop = body.scrollTop;
		body.scrollTop = 1;

		if ( body.scrollTop === 1 ) {
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
 * Traverses up until either a scrollable element or the root is reached, in which case the window
 * will be returned.
 *
 * @static
 * @param {HTMLElement} el Element to find scrollable container for
 * @param {string} [dimension] Dimension of scrolling to look for; `x`, `y` or omit for either
 * @return {HTMLElement} Closest scrollable container
 */
OO.ui.Element.static.getClosestScrollableContainer = function ( el, dimension ) {
	var i, val,
		// props = [ 'overflow' ] doesn't work due to https://bugzilla.mozilla.org/show_bug.cgi?id=889091
		props = [ 'overflow-x', 'overflow-y' ],
		$parent = $( el ).parent();

	if ( dimension === 'x' || dimension === 'y' ) {
		props = [ 'overflow-' + dimension ];
	}

	while ( $parent.length ) {
		if ( $parent[ 0 ] === this.getRootScrollableElement( el ) ) {
			return $parent[ 0 ];
		}
		i = props.length;
		while ( i-- ) {
			val = $parent.css( props[ i ] );
			if ( val === 'auto' || val === 'scroll' ) {
				return $parent[ 0 ];
			}
		}
		$parent = $parent.parent();
	}
	return this.getDocument( el ).body;
};

/**
 * Scroll element into view.
 *
 * @static
 * @param {HTMLElement} el Element to scroll into view
 * @param {Object} [config] Configuration options
 * @param {string} [config.duration] jQuery animation duration value
 * @param {string} [config.direction] Scroll in only one direction, e.g. 'x' or 'y', omit
 *  to scroll in both directions
 * @param {Function} [config.complete] Function to call when scrolling completes
 */
OO.ui.Element.static.scrollIntoView = function ( el, config ) {
	var rel, anim, callback, sc, $sc, eld, scd, $win;

	// Configuration initialization
	config = config || {};

	anim = {};
	callback = typeof config.complete === 'function' && config.complete;
	sc = this.getClosestScrollableContainer( el, config.direction );
	$sc = $( sc );
	eld = this.getDimensions( el );
	scd = this.getDimensions( sc );
	$win = $( this.getWindow( el ) );

	// Compute the distances between the edges of el and the edges of the scroll viewport
	if ( $sc.is( 'html, body' ) ) {
		// If the scrollable container is the root, this is easy
		rel = {
			top: eld.rect.top,
			bottom: $win.innerHeight() - eld.rect.bottom,
			left: eld.rect.left,
			right: $win.innerWidth() - eld.rect.right
		};
	} else {
		// Otherwise, we have to subtract el's coordinates from sc's coordinates
		rel = {
			top: eld.rect.top - ( scd.rect.top + scd.borders.top ),
			bottom: scd.rect.bottom - scd.borders.bottom - scd.scrollbar.bottom - eld.rect.bottom,
			left: eld.rect.left - ( scd.rect.left + scd.borders.left ),
			right: scd.rect.right - scd.borders.right - scd.scrollbar.right - eld.rect.right
		};
	}

	if ( !config.direction || config.direction === 'y' ) {
		if ( rel.top < 0 ) {
			anim.scrollTop = scd.scroll.top + rel.top;
		} else if ( rel.top > 0 && rel.bottom < 0 ) {
			anim.scrollTop = scd.scroll.top + Math.min( rel.top, -rel.bottom );
		}
	}
	if ( !config.direction || config.direction === 'x' ) {
		if ( rel.left < 0 ) {
			anim.scrollLeft = scd.scroll.left + rel.left;
		} else if ( rel.left > 0 && rel.right < 0 ) {
			anim.scrollLeft = scd.scroll.left + Math.min( rel.left, -rel.right );
		}
	}
	if ( !$.isEmptyObject( anim ) ) {
		$sc.stop( true ).animate( anim, config.duration || 'fast' );
		if ( callback ) {
			$sc.queue( function ( next ) {
				callback();
				next();
			} );
		}
	} else {
		if ( callback ) {
			callback();
		}
	}
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
 * @param {Mixed} Element data
 * @chainable
 */
OO.ui.Element.prototype.setData = function ( data ) {
	this.data = data;
	return this;
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
	this.debouncedUpdateThemeClassesHandler();
};

/**
 * @private
 * @localdoc This method is called directly from the QUnit tests instead of #updateThemeClasses, to
 *   make them synchronous.
 */
OO.ui.Element.prototype.debouncedUpdateThemeClasses = function () {
	OO.ui.theme.updateElementClasses( this );
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
 */
OO.ui.Element.prototype.scrollElementIntoView = function ( config ) {
	return OO.ui.Element.static.scrollIntoView( this.$element[ 0 ], config );
};

/**
 * Gather the dynamic state (focus, value of form inputs, scroll position, etc.) of a HTML DOM node
 * (and its children) that represent an Element of the same type and configuration as the current
 * one, generated by the PHP implementation.
 *
 * This method is called just before `node` is detached from the DOM. The return value of this
 * function will be passed to #restorePreInfuseState after this widget's #$element is inserted into
 * DOM to replace `node`.
 *
 * @protected
 * @param {HTMLElement} node
 * @return {Object}
 */
OO.ui.Element.prototype.gatherPreInfuseState = function () {
	return {};
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
 * Widgets are compositions of one or more OOjs UI elements that users can both view
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

/* Static Properties */

/**
 * Whether this widget will behave reasonably when wrapped in a HTML `<label>`. If this is true,
 * wrappers such as OO.ui.FieldLayout may use a `<label>` instead of implementing own label click
 * handling.
 *
 * @static
 * @inheritable
 * @property {boolean}
 */
OO.ui.Widget.static.supportsSimpleLabel = false;

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
 * A window is a container for elements that are in a child frame. They are used with
 * a window manager (OO.ui.WindowManager), which is used to open and close the window and control
 * its presentation. The size of a window is specified using a symbolic name (e.g., ‘small’, ‘medium’,
 * ‘large’), which is interpreted by the window manager. If the requested size is not recognized,
 * the window manager will choose a sensible fallback.
 *
 * The lifecycle of a window has three primary stages (opening, opened, and closing) in which
 * different processes are executed:
 *
 * **opening**: The opening stage begins when the window manager's {@link OO.ui.WindowManager#openWindow
 * openWindow} or the window's {@link #open open} methods are used, and the window manager begins to open
 * the window.
 *
 * - {@link #getSetupProcess} method is called and its result executed
 * - {@link #getReadyProcess} method is called and its result executed
 *
 * **opened**: The window is now open
 *
 * **closing**: The closing stage begins when the window manager's
 * {@link OO.ui.WindowManager#closeWindow closeWindow}
 * or the window's {@link #close} methods are used, and the window manager begins to close the window.
 *
 * - {@link #getHoldProcess} method is called and its result executed
 * - {@link #getTeardownProcess} method is called and its result executed. The window is now closed
 *
 * Each of the window's processes (setup, ready, hold, and teardown) can be extended in subclasses
 * by overriding the window's #getSetupProcess, #getReadyProcess, #getHoldProcess and #getTeardownProcess
 * methods. Note that each {@link OO.ui.Process process} is executed in series, so asynchronous
 * processing can complete. Always assume window processes are executed asynchronously.
 *
 * For more information, please see the [OOjs UI documentation on MediaWiki] [1].
 *
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Windows
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
 * This method is a wrapper around the window manager's {@link OO.ui.WindowManager#isOpening isOpening}
 * method.
 *
 * @return {boolean} Window is opening
 */
OO.ui.Window.prototype.isOpening = function () {
	return this.manager.isOpening( this );
};

/**
 * Check if the window is closing.
 *
 * This method is a wrapper around the window manager's {@link OO.ui.WindowManager#isClosing isClosing} method.
 *
 * @return {boolean} Window is closing
 */
OO.ui.Window.prototype.isClosing = function () {
	return this.manager.isClosing( this );
};

/**
 * Check if the window is opened.
 *
 * This method is a wrapper around the window manager's {@link OO.ui.WindowManager#isOpened isOpened} method.
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
	var oldTransition,
		styleObj = this.$frame[ 0 ].style;
	oldTransition = styleObj.transition || styleObj.OTransition || styleObj.MsTransition ||
		styleObj.MozTransition || styleObj.WebkitTransition;
	styleObj.transition = styleObj.OTransition = styleObj.MsTransition =
		styleObj.MozTransition = styleObj.WebkitTransition = 'none';
	callback();
	// Force reflow to make sure the style changes done inside callback really are not transitioned
	this.$frame.height();
	styleObj.transition = styleObj.OTransition = styleObj.MsTransition =
		styleObj.MozTransition = styleObj.WebkitTransition = oldTransition;
};

/**
 * Get the height of the full window contents (i.e., the window head, body and foot together).
 *
 * What consistitutes the head, body, and foot varies depending on the window type.
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
 * The setup process is used to set up a window for use in a particular context,
 * based on the `data` argument. This method is called during the opening phase of the window’s
 * lifecycle.
 *
 * Override this method to add additional steps to the ‘setup’ process the parent method provides
 * using the {@link OO.ui.Process#first first} and {@link OO.ui.Process#next next} methods
 * of OO.ui.Process.
 *
 * To add window content that persists between openings, you may wish to use the #initialize method
 * instead.
 *
 * @abstract
 * @param {Object} [data] Window opening data
 * @return {OO.ui.Process} Setup process
 */
OO.ui.Window.prototype.getSetupProcess = function () {
	return new OO.ui.Process();
};

/**
 * Get the ‘ready’ process.
 *
 * The ready process is used to ready a window for use in a particular
 * context, based on the `data` argument. This method is called during the opening phase of
 * the window’s lifecycle, after the window has been {@link #getSetupProcess setup}.
 *
 * Override this method to add additional steps to the ‘ready’ process the parent method
 * provides using the {@link OO.ui.Process#first first} and {@link OO.ui.Process#next next}
 * methods of OO.ui.Process.
 *
 * @abstract
 * @param {Object} [data] Window opening data
 * @return {OO.ui.Process} Ready process
 */
OO.ui.Window.prototype.getReadyProcess = function () {
	return new OO.ui.Process();
};

/**
 * Get the 'hold' process.
 *
 * The hold proccess is used to keep a window from being used in a particular context,
 * based on the `data` argument. This method is called during the closing phase of the window’s
 * lifecycle.
 *
 * Override this method to add additional steps to the 'hold' process the parent method provides
 * using the {@link OO.ui.Process#first first} and {@link OO.ui.Process#next next} methods
 * of OO.ui.Process.
 *
 * @abstract
 * @param {Object} [data] Window closing data
 * @return {OO.ui.Process} Hold process
 */
OO.ui.Window.prototype.getHoldProcess = function () {
	return new OO.ui.Process();
};

/**
 * Get the ‘teardown’ process.
 *
 * The teardown process is used to teardown a window after use. During teardown,
 * user interactions within the window are conveyed and the window is closed, based on the `data`
 * argument. This method is called during the closing phase of the window’s lifecycle.
 *
 * Override this method to add additional steps to the ‘teardown’ process the parent method provides
 * using the {@link OO.ui.Process#first first} and {@link OO.ui.Process#next next} methods
 * of OO.ui.Process.
 *
 * @abstract
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
 * @param {string|number} [dim.width] Height, omit to set based on height of contents
 * @param {string|number} [dim.minWidth] Minimum height
 * @param {string|number} [dim.maxWidth] Maximum height
 * @chainable
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
	if ( this.$focusTrapBefore.is( event.target ) ) {
		OO.ui.findFocusable( this.$content, true ).focus();
	} else {
		// this.$content is the part of the focus cycle, and is the first focusable element
		this.$content.focus();
	}
};

/**
 * Open the window.
 *
 * This method is a wrapper around a call to the window manager’s {@link OO.ui.WindowManager#openWindow openWindow}
 * method, which returns a promise resolved when the window is done opening.
 *
 * To customize the window each time it opens, use #getSetupProcess or #getReadyProcess.
 *
 * @param {Object} [data] Window opening data
 * @return {jQuery.Promise} Promise resolved with a value when the window is opened, or rejected
 *  if the window fails to open. When the promise is resolved successfully, the first argument of the
 *  value is a new promise, which is resolved when the window begins closing.
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
 * manager’s {@link OO.ui.WindowManager#closeWindow closeWindow} method,
 * which returns a closing promise resolved when the window is done closing.
 *
 * The window's #getHoldProcess and #getTeardownProcess methods are called during the closing
 * phase of the window’s lifecycle and can be used to specify closing behavior each time
 * the window closes.
 *
 * @param {Object} [data] Window closing data
 * @return {jQuery.Promise} Promise resolved when window is closed
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
 * This is called by OO.ui.WindowManager during window opening, and should not be called directly
 * by other systems.
 *
 * @param {Object} [data] Window opening data
 * @return {jQuery.Promise} Promise resolved when window is setup
 */
OO.ui.Window.prototype.setup = function ( data ) {
	var win = this,
		deferred = $.Deferred();

	this.toggle( true );

	this.focusTrapHandler = OO.ui.bind( this.onFocusTrapFocused, this );
	this.$focusTraps.on( 'focus', this.focusTrapHandler );

	this.getSetupProcess( data ).execute().done( function () {
		// Force redraw by asking the browser to measure the elements' widths
		win.$element.addClass( 'oo-ui-window-active oo-ui-window-setup' ).width();
		win.$content.addClass( 'oo-ui-window-content-setup' ).width();
		deferred.resolve();
	} );

	return deferred.promise();
};

/**
 * Ready window.
 *
 * This is called by OO.ui.WindowManager during window opening, and should not be called directly
 * by other systems.
 *
 * @param {Object} [data] Window opening data
 * @return {jQuery.Promise} Promise resolved when window is ready
 */
OO.ui.Window.prototype.ready = function ( data ) {
	var win = this,
		deferred = $.Deferred();

	this.$content.focus();
	this.getReadyProcess( data ).execute().done( function () {
		// Force redraw by asking the browser to measure the elements' widths
		win.$element.addClass( 'oo-ui-window-ready' ).width();
		win.$content.addClass( 'oo-ui-window-content-ready' ).width();
		deferred.resolve();
	} );

	return deferred.promise();
};

/**
 * Hold window.
 *
 * This is called by OO.ui.WindowManager during window closing, and should not be called directly
 * by other systems.
 *
 * @param {Object} [data] Window closing data
 * @return {jQuery.Promise} Promise resolved when window is held
 */
OO.ui.Window.prototype.hold = function ( data ) {
	var win = this,
		deferred = $.Deferred();

	this.getHoldProcess( data ).execute().done( function () {
		// Get the focused element within the window's content
		var $focus = win.$content.find( OO.ui.Element.static.getDocument( win.$content ).activeElement );

		// Blur the focused element
		if ( $focus.length ) {
			$focus[ 0 ].blur();
		}

		// Force redraw by asking the browser to measure the elements' widths
		win.$element.removeClass( 'oo-ui-window-ready' ).width();
		win.$content.removeClass( 'oo-ui-window-content-ready' ).width();
		deferred.resolve();
	} );

	return deferred.promise();
};

/**
 * Teardown window.
 *
 * This is called by OO.ui.WindowManager during window closing, and should not be called directly
 * by other systems.
 *
 * @param {Object} [data] Window closing data
 * @return {jQuery.Promise} Promise resolved when window is torn down
 */
OO.ui.Window.prototype.teardown = function ( data ) {
	var win = this;

	return this.getTeardownProcess( data ).execute()
		.done( function () {
			// Force redraw by asking the browser to measure the elements' widths
			win.$element.removeClass( 'oo-ui-window-active oo-ui-window-setup' ).width();
			win.$content.removeClass( 'oo-ui-window-content-setup' ).width();
			win.$focusTraps.off( 'focus', win.focusTrapHandler );
			win.toggle( false );
		} );
};

/**
 * The Dialog class serves as the base class for the other types of dialogs.
 * Unless extended to include controls, the rendered dialog box is a simple window
 * that users can close by hitting the ‘Esc’ key. Dialog windows are used with OO.ui.WindowManager,
 * which opens, closes, and controls the presentation of the window. See the
 * [OOjs UI documentation on MediaWiki] [1] for more information.
 *
 *     @example
 *     // A simple dialog window.
 *     function MyDialog( config ) {
 *         MyDialog.parent.call( this, config );
 *     }
 *     OO.inheritClass( MyDialog, OO.ui.Dialog );
 *     MyDialog.prototype.initialize = function () {
 *         MyDialog.parent.prototype.initialize.call( this );
 *         this.content = new OO.ui.PanelLayout( { padded: true, expanded: false } );
 *         this.content.$element.append( '<p>A simple dialog window. Press \'Esc\' to close.</p>' );
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
 *     $( 'body' ).append( windowManager.$element );
 *     windowManager.addWindows( [ myDialog ] );
 *     // Open the window!
 *     windowManager.openWindow( myDialog );
 *
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Windows/Dialogs
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
		resize: 'onActionResize',
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
 * Please see the [OOjs UI documentation on MediaWiki] [3] for more information.
 *
 * [3]: https://www.mediawiki.org/wiki/OOjs_UI/Windows/Window_managers
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
 * The title can be specified as a plaintext string, a {@link OO.ui.mixin.LabelElement Label} node, or a function
 * that will produce a Label node or string. The title can also be specified with data passed to the
 * constructor (see #getSetupProcess). In this case, the static value will be overriden.
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
 * Actions can also be specified with data passed to the constructor (see #getSetupProcess). In this case, the static
 * value will be overriden.
 *
 * [2]: https://www.mediawiki.org/wiki/OOjs_UI/Windows/Process_Dialogs#Action_sets
 *
 * @static
 * @inheritable
 * @property {Object[]}
 */
OO.ui.Dialog.static.actions = [];

/**
 * Close the dialog when the 'Esc' key is pressed.
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
	if ( e.which === OO.ui.Keys.ESCAPE ) {
		this.close();
		e.preventDefault();
		e.stopPropagation();
	}
};

/**
 * Handle action resized events.
 *
 * @private
 * @param {OO.ui.ActionWidget} action Action that was resized
 */
OO.ui.Dialog.prototype.onActionResize = function () {
	// Override in subclass
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
 * When you override this method, you can create a new OO.ui.Process and return it, or add additional
 * accept steps to the process the parent method provides using the {@link OO.ui.Process#first 'first'}
 * and {@link OO.ui.Process#next 'next'} methods of OO.ui.Process.
 *
 * @abstract
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
				actions = data.actions !== undefined ? data.actions : config.actions;

			this.title.setLabel(
				data.title !== undefined ? data.title : this.constructor.static.title
			);
			this.actions.add( this.getActionWidgets( actions ) );

			if ( this.constructor.static.escapable ) {
				this.$element.on( 'keydown', this.onDialogKeyDownHandler );
			}
		}, this );
};

/**
 * @inheritdoc
 */
OO.ui.Dialog.prototype.getTeardownProcess = function ( data ) {
	// Parent method
	return OO.ui.Dialog.parent.prototype.getTeardownProcess.call( this, data )
		.first( function () {
			if ( this.constructor.static.escapable ) {
				this.$element.off( 'keydown', this.onDialogKeyDownHandler );
			}

			this.actions.clear();
			this.currentAction = null;
		}, this );
};

/**
 * @inheritdoc
 */
OO.ui.Dialog.prototype.initialize = function () {
	var titleId;

	// Parent method
	OO.ui.Dialog.parent.prototype.initialize.call( this );

	titleId = OO.ui.generateElementId();

	// Properties
	this.title = new OO.ui.LabelWidget( {
		id: titleId
	} );

	// Initialization
	this.$content.addClass( 'oo-ui-dialog-content' );
	this.$element.attr( 'aria-labelledby', titleId );
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
		widgets.push(
			new OO.ui.ActionWidget( actions[ i ] )
		);
	}
	return widgets;
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
 */
OO.ui.Dialog.prototype.detachActions = function () {
	var i, len;

	// Detach all actions that may have been previously attached
	for ( i = 0, len = this.attachedActions.length; i < len; i++ ) {
		this.attachedActions[ i ].$element.detach();
	}
	this.attachedActions = [];
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
 * Window managers are used to open and close {@link OO.ui.Window windows} and control their presentation.
 * Managed windows are mutually exclusive. If a new window is opened while a current window is opening
 * or is opened, the current window will be closed and any ongoing {@link OO.ui.Process process} will be cancelled. Windows
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
 * - the #getSetupDelay method is called and the returned value is used to time a pause in execution before
 *   the window’s {@link OO.ui.Window#getSetupProcess getSetupProcess} method is called on the
 *   window and its result executed
 * - a `setup` progress notification is emitted from the `opening` promise
 * - the #getReadyDelay method is called the returned value is used to time a pause in execution before
 *   the window’s {@link OO.ui.Window#getReadyProcess getReadyProcess} method is called on the
 *   window and its result executed
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
 * - the #getHoldDelay method is called and the returned value is used to time a pause in execution before
 *   the window's {@link OO.ui.Window#getHoldProcess getHoldProces} method is called on the
 *   window and its result executed
 * - a `hold` progress notification is emitted from the `closing` promise
 * - the #getTeardownDelay() method is called and the returned value is used to time a pause in execution before
 *   the window's {@link OO.ui.Window#getTeardownProcess getTeardownProcess} method is called on the
 *   window and its result executed
 * - a `teardown` progress notification is emitted from the `closing` promise
 * - the `closing` promise is resolved. The window is now closed
 *
 * See the [OOjs UI documentation on MediaWiki][1] for more information.
 *
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Windows/Window_managers
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
	this.opening = null;
	this.opened = null;
	this.closing = null;
	this.preparingToOpen = null;
	this.preparingToClose = null;
	this.currentWindow = null;
	this.globalEvents = false;
	this.$ariaHidden = null;
	this.onWindowResizeTimeout = null;
	this.onWindowResizeHandler = this.onWindowResize.bind( this );
	this.afterWindowResizeHandler = this.afterWindowResize.bind( this );

	// Initialization
	this.$element
		.addClass( 'oo-ui-windowManager' )
		.toggleClass( 'oo-ui-windowManager-modal', this.modal );
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
 * @param {jQuery.Promise} opening An `opening` promise resolved with a value when the window is opened successfully.
 *  When the `opening` promise is resolved, the first argument of the value is an 'opened' promise, the second argument
 *  is the opening data. The `opening` promise emits `setup` and `ready` notifications when those processes are complete.
 * @param {Object} data Window opening data
 */

/**
 * A 'closing' event is emitted when the window begins to be closed.
 *
 * @event closing
 * @param {OO.ui.Window} win Window that's being closed
 * @param {jQuery.Promise} closing A `closing` promise is resolved with a value when the window
 *  is closed successfully. The promise emits `hold` and `teardown` notifications when those
 *  processes are complete. When the `closing` promise is resolved, the first argument of its value
 *  is the closing data.
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
	if ( this.currentWindow ) {
		this.updateWindowSize( this.currentWindow );
	}
};

/**
 * Check if window is opening.
 *
 * @return {boolean} Window is opening
 */
OO.ui.WindowManager.prototype.isOpening = function ( win ) {
	return win === this.currentWindow && !!this.opening && this.opening.state() === 'pending';
};

/**
 * Check if window is closing.
 *
 * @return {boolean} Window is closing
 */
OO.ui.WindowManager.prototype.isClosing = function ( win ) {
	return win === this.currentWindow && !!this.closing && this.closing.state() === 'pending';
};

/**
 * Check if window is opened.
 *
 * @return {boolean} Window is opened
 */
OO.ui.WindowManager.prototype.isOpened = function ( win ) {
	return win === this.currentWindow && !!this.opened && this.opened.state() === 'pending';
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
 * Get the number of milliseconds to wait after setup has finished before executing the ‘ready’ process.
 *
 * @param {OO.ui.Window} win Window being opened
 * @param {Object} [data] Window opening data
 * @return {number} Milliseconds to wait
 */
OO.ui.WindowManager.prototype.getReadyDelay = function () {
	return 0;
};

/**
 * Get the number of milliseconds to wait after closing has begun before executing the 'hold' process.
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
	return this.modal ? 250 : 0;
};

/**
 * Get a window by its symbolic name.
 *
 * If the window is not yet instantiated and its symbolic name is recognized by a factory, it will be
 * instantiated and added to the window manager automatically. Please see the [OOjs UI documentation on MediaWiki][3]
 * for more information about using factories.
 * [3]: https://www.mediawiki.org/wiki/OOjs_UI/Windows/Window_managers
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

/**
 * Open a window.
 *
 * @param {OO.ui.Window|string} win Window object or symbolic name of window to open
 * @param {Object} [data] Window opening data
 * @return {jQuery.Promise} An `opening` promise resolved when the window is done opening.
 *  See {@link #event-opening 'opening' event}  for more information about `opening` promises.
 * @fires opening
 */
OO.ui.WindowManager.prototype.openWindow = function ( win, data ) {
	var manager = this,
		opening = $.Deferred();

	// Argument handling
	if ( typeof win === 'string' ) {
		return this.getWindow( win ).then( function ( win ) {
			return manager.openWindow( win, data );
		} );
	}

	// Error handling
	if ( !this.hasWindow( win ) ) {
		opening.reject( new OO.ui.Error(
			'Cannot open window: window is not attached to manager'
		) );
	} else if ( this.preparingToOpen || this.opening || this.opened ) {
		opening.reject( new OO.ui.Error(
			'Cannot open window: another window is opening or open'
		) );
	}

	// Window opening
	if ( opening.state() !== 'rejected' ) {
		// If a window is currently closing, wait for it to complete
		this.preparingToOpen = $.when( this.closing );
		// Ensure handlers get called after preparingToOpen is set
		this.preparingToOpen.done( function () {
			if ( manager.modal ) {
				manager.toggleGlobalEvents( true );
				manager.toggleAriaIsolation( true );
			}
			manager.currentWindow = win;
			manager.opening = opening;
			manager.preparingToOpen = null;
			manager.emit( 'opening', win, opening, data );
			setTimeout( function () {
				win.setup( data ).then( function () {
					manager.updateWindowSize( win );
					manager.opening.notify( { state: 'setup' } );
					setTimeout( function () {
						win.ready( data ).then( function () {
							manager.opening.notify( { state: 'ready' } );
							manager.opening = null;
							manager.opened = $.Deferred();
							opening.resolve( manager.opened.promise(), data );
						} );
					}, manager.getReadyDelay() );
				} );
			}, manager.getSetupDelay() );
		} );
	}

	return opening.promise();
};

/**
 * Close a window.
 *
 * @param {OO.ui.Window|string} win Window object or symbolic name of window to close
 * @param {Object} [data] Window closing data
 * @return {jQuery.Promise} A `closing` promise resolved when the window is done closing.
 *  See {@link #event-closing 'closing' event} for more information about closing promises.
 * @throws {Error} An error is thrown if the window is not managed by the window manager.
 * @fires closing
 */
OO.ui.WindowManager.prototype.closeWindow = function ( win, data ) {
	var manager = this,
		closing = $.Deferred(),
		opened;

	// Argument handling
	if ( typeof win === 'string' ) {
		win = this.windows[ win ];
	} else if ( !this.hasWindow( win ) ) {
		win = null;
	}

	// Error handling
	if ( !win ) {
		closing.reject( new OO.ui.Error(
			'Cannot close window: window is not attached to manager'
		) );
	} else if ( win !== this.currentWindow ) {
		closing.reject( new OO.ui.Error(
			'Cannot close window: window already closed with different data'
		) );
	} else if ( this.preparingToClose || this.closing ) {
		closing.reject( new OO.ui.Error(
			'Cannot close window: window already closing with different data'
		) );
	}

	// Window closing
	if ( closing.state() !== 'rejected' ) {
		// If the window is currently opening, close it when it's done
		this.preparingToClose = $.when( this.opening );
		// Ensure handlers get called after preparingToClose is set
		this.preparingToClose.done( function () {
			manager.closing = closing;
			manager.preparingToClose = null;
			manager.emit( 'closing', win, closing, data );
			opened = manager.opened;
			manager.opened = null;
			opened.resolve( closing.promise(), data );
			setTimeout( function () {
				win.hold( data ).then( function () {
					closing.notify( { state: 'hold' } );
					setTimeout( function () {
						win.teardown( data ).then( function () {
							closing.notify( { state: 'teardown' } );
							if ( manager.modal ) {
								manager.toggleGlobalEvents( false );
								manager.toggleAriaIsolation( false );
							}
							manager.closing = null;
							manager.currentWindow = null;
							closing.resolve( data );
						} );
					}, manager.getTeardownDelay() );
				} );
			}, manager.getHoldDelay() );
		} );
	}

	return closing.promise();
};

/**
 * Add windows to the window manager.
 *
 * Windows can be added by reference, symbolic name, or explicitly defined symbolic names.
 * See the [OOjs ui documentation on MediaWiki] [2] for examples.
 * [2]: https://www.mediawiki.org/wiki/OOjs_UI/Windows/Window_managers
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
			if ( typeof name !== 'string' ) {
				throw new Error( 'Cannot add window' );
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
 * Windows will be closed before they are removed. If you wish to remove all windows, you may wish to use
 * the #clearWindows method instead. If you no longer need the window manager and want to ensure that it no
 * longer listens to events, use the #destroy method.
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
		promises.push( this.closeWindow( name ).then( cleanupWindow, cleanupWindow ) );
	}

	return $.when.apply( $, promises );
};

/**
 * Remove all windows from the window manager.
 *
 * Windows will be closed before they are removed. Note that the window manager, though not in use, will still
 * listen to events. If the window manager will not be used again, you may wish to use the #destroy method instead.
 * To remove just a subset of windows, use the #removeWindows method.
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
 * @chainable
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
 */
OO.ui.WindowManager.prototype.toggleGlobalEvents = function ( on ) {
	var scrollWidth, bodyMargin,
		$body = $( this.getElementDocument().body ),
		// We could have multiple window managers open so only modify
		// the body css at the bottom of the stack
		stackDepth = $body.data( 'windowManagerGlobalEvents' ) || 0 ;

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
				$body.css( {
					overflow: 'hidden',
					'margin-right': bodyMargin + scrollWidth
				} );
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
			$body.css( {
				overflow: '',
				'margin-right': ''
			} );
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
 */
OO.ui.WindowManager.prototype.toggleAriaIsolation = function ( isolate ) {
	isolate = isolate === undefined ? !this.$ariaHidden : !!isolate;

	if ( isolate ) {
		if ( !this.$ariaHidden ) {
			// Hide everything other than the window manager from screen readers
			this.$ariaHidden = $( 'body' )
				.children()
				.not( this.$element.parentsUntil( 'body' ).last() )
				.attr( 'aria-hidden', '' );
		}
	} else if ( this.$ariaHidden ) {
		// Restore screen reader visibility
		this.$ariaHidden.removeAttr( 'aria-hidden' );
		this.$ariaHidden = null;
	}

	return this;
};

/**
 * Destroy the window manager.
 *
 * Destroying the window manager ensures that it will no longer listen to events. If you would like to
 * continue using the window manager, but wish to remove all windows from it, use the #clearWindows method
 * instead.
 */
OO.ui.WindowManager.prototype.destroy = function () {
	this.toggleGlobalEvents( false );
	this.toggleAriaIsolation( false );
	this.clearWindows();
	this.$element.remove();
};

/**
 * Errors contain a required message (either a string or jQuery selection) that is used to describe what went wrong
 * in a {@link OO.ui.Process process}. The error's #recoverable and #warning configurations are used to customize the
 * appearance and functionality of the error interface.
 *
 * The basic error interface contains a formatted error message as well as two buttons: 'Dismiss' and 'Try again' (i.e., the error
 * is 'recoverable' by default). If the error is not recoverable, the 'Try again' button will not be rendered and the widget
 * that initiated the failed process will be disabled.
 *
 * If the error is a warning, the error interface will include a 'Dismiss' and a 'Continue' button, which will try the
 * process again.
 *
 * For an example of error interfaces, please see the [OOjs UI documentation on MediaWiki][1].
 *
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Windows/Process_Dialogs#Processes_and_errors
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
 *  'Dismiss' and a 'Continue' button. It is the responsibility of the developer to ensure that the warning
 *  is not triggered a second time if the user chooses to continue.
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
	this.message = message instanceof jQuery ? message : String( message );
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
	return this.message instanceof jQuery ?
		this.message.clone() :
		$( '<div>' ).text( this.message ).contents();
};

/**
 * Get the error message text.
 *
 * @return {string} Error message
 */
OO.ui.Error.prototype.getMessageText = function () {
	return this.message instanceof jQuery ? this.message.text() : this.message;
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
 * A Process is a list of steps that are called in sequence. The step can be a number, a jQuery promise,
 * or a function:
 *
 * - **number**: the process will wait for the specified number of milliseconds before proceeding.
 * - **promise**: the process will continue to the next step when the promise is successfully resolved
 *  or stop if the promise is rejected.
 * - **function**: the process will execute the function. The process will stop if the function returns
 *  either a boolean `false` or a promise that is rejected; if the function returns a number, the process
 *  will wait for that number of milliseconds before proceeding.
 *
 * If the process fails, an {@link OO.ui.Error error} is generated. Depending on how the error is
 * configured, users can dismiss the error and try the process again, or not. If a process is stopped,
 * its remaining steps will not be performed.
 *
 * @class
 *
 * @constructor
 * @param {number|jQuery.Promise|Function} step Number of miliseconds to wait before proceeding, promise
 *  that must be resolved before proceeding, or a function to execute. See #createStep for more information. see #createStep for more information
 * @param {Object} [context=null] Execution context of the function. The context is ignored if the step is
 *  a number or promise.
 * @return {Object} Step object, with `callback` and `context` properties
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
 *  If any of the steps return a promise that is rejected or a boolean false, this promise is rejected
 *  and any remaining steps are not performed.
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
			if ( result && $.isFunction( result.promise ) ) {
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
	if ( typeof step === 'number' || $.isFunction( step.promise ) ) {
		return {
			callback: function () {
				return step;
			},
			context: null
		};
	}
	if ( $.isFunction( step ) ) {
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
 * A ToolFactory creates tools on demand. All tools ({@link OO.ui.Tool Tools}, {@link OO.ui.PopupTool PopupTools},
 * and {@link OO.ui.ToolGroupTool ToolGroupTools}) must be registered with a tool factory. Tools are
 * registered by their symbolic name. See {@link OO.ui.Toolbar toolbars} for an example.
 *
 * For more information about toolbars in general, please see the [OOjs UI documentation on MediaWiki][1].
 *
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Toolbars
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
 * Get tools from the factory
 *
 * @param {Array} include Included tools
 * @param {Array} exclude Excluded tools
 * @param {Array} promote Promoted tools
 * @param {Array} demote Demoted tools
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
 * Tools can be specified in the following ways:
 *
 * - A specific tool: `{ name: 'tool-name' }` or `'tool-name'`
 * - All tools in a group: `{ group: 'group-name' }`
 * - All tools: `'*'`
 *
 * @private
 * @param {Array|string} collection List of tools
 * @param {Object} [used] Object with names that should be skipped as properties; extracted
 *  names will be added as properties
 * @return {string[]} List of extracted names
 */
OO.ui.ToolFactory.prototype.extract = function ( collection, used ) {
	var i, len, item, name, tool,
		names = [];

	if ( collection === '*' ) {
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
	} else if ( Array.isArray( collection ) ) {
		for ( i = 0, len = collection.length; i < len; i++ ) {
			item = collection[ i ];
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
 * ToolGroupFactories create {@link OO.ui.ToolGroup toolgroups} on demand. The toolgroup classes must
 * specify a symbolic name and be registered with the factory. The following classes are registered by
 * default:
 *
 * - {@link OO.ui.BarToolGroup BarToolGroups} (‘bar’)
 * - {@link OO.ui.MenuToolGroup MenuToolGroups} (‘menu’)
 * - {@link OO.ui.ListToolGroup ListToolGroups} (‘list’)
 *
 * See {@link OO.ui.Toolbar toolbars} for an example.
 *
 * For more information about toolbars in general, please see the [OOjs UI documentation on MediaWiki][1].
 *
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Toolbars
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
 * Theme logic.
 *
 * @abstract
 * @class
 *
 * @constructor
 * @param {Object} [config] Configuration options
 */
OO.ui.Theme = function OoUiTheme( config ) {
	// Configuration initialization
	config = config || {};
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
 * @return {Object.<string,string[]>} Categorized class names with `on` and `off` lists
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
 * @cfg {number|null} [tabIndex=0] Number that specifies the element’s position in the tab-navigation
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
 * @param {number|null} tabIndex Tabindex value, or `null` for no tabindex
 * @chainable
 */
OO.ui.mixin.TabIndexedElement.prototype.setTabIndex = function ( tabIndex ) {
	tabIndex = typeof tabIndex === 'number' ? tabIndex : null;

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
 * ButtonElement is often mixed into other classes to generate a button, which is a clickable
 * interface element that can be configured with access keys for accessibility.
 * See the [OOjs UI documentation on MediaWiki] [1] for examples.
 *
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Widgets/Buttons_and_Switches#Buttons
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
	this.active = false;
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
		.attr( { role: 'button' } )
		.on( {
			mousedown: this.onMouseDownHandler,
			keydown: this.onKeyDownHandler,
			click: this.onClickHandler,
			keypress: this.onKeyPressHandler
		} );
};

/**
 * Handles mouse down events.
 *
 * @protected
 * @param {jQuery.Event} e Mouse down event
 */
OO.ui.mixin.ButtonElement.prototype.onMouseDown = function ( e ) {
	if ( this.isDisabled() || e.which !== 1 ) {
		return;
	}
	this.$element.addClass( 'oo-ui-buttonElement-pressed' );
	// Run the mouseup handler no matter where the mouse is when the button is let go, so we can
	// reliably remove the pressed class
	OO.ui.addCaptureEventListener( this.getElementDocument(), 'mouseup', this.onMouseUpHandler );
	// Prevent change of focus unless specifically configured otherwise
	if ( this.constructor.static.cancelButtonMouseDownEvents ) {
		return false;
	}
};

/**
 * Handles mouse up events.
 *
 * @protected
 * @param {jQuery.Event} e Mouse up event
 */
OO.ui.mixin.ButtonElement.prototype.onMouseUp = function ( e ) {
	if ( this.isDisabled() || e.which !== 1 ) {
		return;
	}
	this.$element.removeClass( 'oo-ui-buttonElement-pressed' );
	// Stop listening for mouseup, since we only needed this once
	OO.ui.removeCaptureEventListener( this.getElementDocument(), 'mouseup', this.onMouseUpHandler );
};

/**
 * Handles mouse click events.
 *
 * @protected
 * @param {jQuery.Event} e Mouse click event
 * @fires click
 */
OO.ui.mixin.ButtonElement.prototype.onClick = function ( e ) {
	if ( !this.isDisabled() && e.which === 1 ) {
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
	OO.ui.addCaptureEventListener( this.getElementDocument(), 'keyup', this.onKeyUpHandler );
};

/**
 * Handles key up events.
 *
 * @protected
 * @param {jQuery.Event} e Key up event
 */
OO.ui.mixin.ButtonElement.prototype.onKeyUp = function ( e ) {
	if ( this.isDisabled() || ( e.which !== OO.ui.Keys.SPACE && e.which !== OO.ui.Keys.ENTER ) ) {
		return;
	}
	this.$element.removeClass( 'oo-ui-buttonElement-pressed' );
	// Stop listening for keyup, since we only needed this once
	OO.ui.removeCaptureEventListener( this.getElementDocument(), 'keyup', this.onKeyUpHandler );
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
 * The active state occurs when a {@link OO.ui.ButtonOptionWidget ButtonOptionWidget} or
 * a {@link OO.ui.ToggleButtonWidget ToggleButtonWidget} is pressed. This method does nothing
 * for other button types.
 *
 * @param {boolean} value Make button active
 * @chainable
 */
OO.ui.mixin.ButtonElement.prototype.setActive = function ( value ) {
	this.active = !!value;
	this.$element.toggleClass( 'oo-ui-buttonElement-active', this.active );
	return this;
};

/**
 * Check if the button is active
 *
 * @return {boolean} The button is active
 */
OO.ui.mixin.ButtonElement.prototype.isActive = function () {
	return this.active;
};

/**
 * Any OOjs UI widget that contains other widgets (such as {@link OO.ui.ButtonWidget buttons} or
 * {@link OO.ui.OptionWidget options}) mixes in GroupElement. Adding, removing, and clearing
 * items from the group is done through the interface the class provides.
 * For more information, please see the [OOjs UI documentation on MediaWiki] [1].
 *
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Elements/Groups
 *
 * @abstract
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

	// Properties
	this.$group = null;
	this.items = [];
	this.aggregateItemEvents = {};

	// Initialization
	this.setGroupElement( config.$group || $( '<div>' ) );
};

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
 * Check if a group contains no items.
 *
 * @return {boolean} Group is empty
 */
OO.ui.mixin.GroupElement.prototype.isEmpty = function () {
	return !this.items.length;
};

/**
 * Get all items in the group.
 *
 * The method returns an array of item references (e.g., [button1, button2, button3]) and is useful
 * when synchronizing groups of items, or whenever the references are required (e.g., when removing items
 * from a group).
 *
 * @return {OO.ui.Element[]} An array of items.
 */
OO.ui.mixin.GroupElement.prototype.getItems = function () {
	return this.items.slice( 0 );
};

/**
 * Get an item by its data.
 *
 * Only the first item with matching data will be returned. To return all matching items,
 * use the #getItemsFromData method.
 *
 * @param {Object} data Item data to search for
 * @return {OO.ui.Element|null} Item with equivalent data, `null` if none exists
 */
OO.ui.mixin.GroupElement.prototype.getItemFromData = function ( data ) {
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
 * Get items by their data.
 *
 * All items with matching data will be returned. To return only the first match, use the #getItemFromData method instead.
 *
 * @param {Object} data Item data to search for
 * @return {OO.ui.Element[]} Items with equivalent data
 */
OO.ui.mixin.GroupElement.prototype.getItemsFromData = function ( data ) {
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
 * Aggregate the events emitted by the group.
 *
 * When events are aggregated, the group will listen to all contained items for the event,
 * and then emit the event under a new name. The new event will contain an additional leading
 * parameter containing the item that emitted the original event. Other arguments emitted from
 * the original event are passed through.
 *
 * @param {Object.<string,string|null>} events An object keyed by the name of the event that should be
 *  aggregated  (e.g., ‘click’) and the value of the new name to use (e.g., ‘groupClick’).
 *  A `null` value will remove aggregated events.

 * @throws {Error} An error is thrown if aggregation already exists.
 */
OO.ui.mixin.GroupElement.prototype.aggregate = function ( events ) {
	var i, len, item, add, remove, itemEvent, groupEvent;

	for ( itemEvent in events ) {
		groupEvent = events[ itemEvent ];

		// Remove existing aggregated event
		if ( Object.prototype.hasOwnProperty.call( this.aggregateItemEvents, itemEvent ) ) {
			// Don't allow duplicate aggregations
			if ( groupEvent ) {
				throw new Error( 'Duplicate item event aggregation for ' + itemEvent );
			}
			// Remove event aggregation from existing items
			for ( i = 0, len = this.items.length; i < len; i++ ) {
				item = this.items[ i ];
				if ( item.connect && item.disconnect ) {
					remove = {};
					remove[ itemEvent ] = [ 'emit', this.aggregateItemEvents[ itemEvent ], item ];
					item.disconnect( this, remove );
				}
			}
			// Prevent future items from aggregating event
			delete this.aggregateItemEvents[ itemEvent ];
		}

		// Add new aggregate event
		if ( groupEvent ) {
			// Make future items aggregate event
			this.aggregateItemEvents[ itemEvent ] = groupEvent;
			// Add event aggregation to existing items
			for ( i = 0, len = this.items.length; i < len; i++ ) {
				item = this.items[ i ];
				if ( item.connect && item.disconnect ) {
					add = {};
					add[ itemEvent ] = [ 'emit', groupEvent, item ];
					item.connect( this, add );
				}
			}
		}
	}
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
	var i, len, item, event, events, currentIndex,
		itemElements = [];

	for ( i = 0, len = items.length; i < len; i++ ) {
		item = items[ i ];

		// Check if item exists then remove it first, effectively "moving" it
		currentIndex = this.items.indexOf( item );
		if ( currentIndex >= 0 ) {
			this.removeItems( [ item ] );
			// Adjust index to compensate for removal
			if ( currentIndex < index ) {
				index--;
			}
		}
		// Add the item
		if ( item.connect && item.disconnect && !$.isEmptyObject( this.aggregateItemEvents ) ) {
			events = {};
			for ( event in this.aggregateItemEvents ) {
				events[ event ] = [ 'emit', this.aggregateItemEvents[ event ], item ];
			}
			item.connect( this, events );
		}
		item.setElementGroup( this );
		itemElements.push( item.$element.get( 0 ) );
	}

	if ( index === undefined || index < 0 || index >= this.items.length ) {
		this.$group.append( itemElements );
		this.items.push.apply( this.items, items );
	} else if ( index === 0 ) {
		this.$group.prepend( itemElements );
		this.items.unshift.apply( this.items, items );
	} else {
		this.items[ index ].$element.before( itemElements );
		this.items.splice.apply( this.items, [ index, 0 ].concat( items ) );
	}

	return this;
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
	var i, len, item, index, remove, itemEvent;

	// Remove specific items
	for ( i = 0, len = items.length; i < len; i++ ) {
		item = items[ i ];
		index = this.items.indexOf( item );
		if ( index !== -1 ) {
			if (
				item.connect && item.disconnect &&
				!$.isEmptyObject( this.aggregateItemEvents )
			) {
				remove = {};
				if ( Object.prototype.hasOwnProperty.call( this.aggregateItemEvents, itemEvent ) ) {
					remove[ itemEvent ] = [ 'emit', this.aggregateItemEvents[ itemEvent ], item ];
				}
				item.disconnect( this, remove );
			}
			item.setElementGroup( null );
			this.items.splice( index, 1 );
			item.$element.detach();
		}
	}

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
	var i, len, item, remove, itemEvent;

	// Remove all items
	for ( i = 0, len = this.items.length; i < len; i++ ) {
		item = this.items[ i ];
		if (
			item.connect && item.disconnect &&
			!$.isEmptyObject( this.aggregateItemEvents )
		) {
			remove = {};
			if ( Object.prototype.hasOwnProperty.call( this.aggregateItemEvents, itemEvent ) ) {
				remove[ itemEvent ] = [ 'emit', this.aggregateItemEvents[ itemEvent ], item ];
			}
			item.disconnect( this, remove );
		}
		item.setElementGroup( null );
		item.$element.detach();
	}

	this.items = [];
	return this;
};

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
 */
OO.ui.mixin.DraggableElement = function OoUiMixinDraggableElement() {
	// Properties
	this.index = null;

	// Initialize and events
	this.$element
		.attr( 'draggable', true )
		.addClass( 'oo-ui-draggableElement' )
		.on( {
			dragstart: this.onDragStart.bind( this ),
			dragover: this.onDragOver.bind( this ),
			dragend: this.onDragEnd.bind( this ),
			drop: this.onDrop.bind( this )
		} );
};

OO.initClass( OO.ui.mixin.DraggableElement );

/* Events */

/**
 * @event dragstart
 *
 * A dragstart event is emitted when the user clicks and begins dragging an item.
 * @param {OO.ui.mixin.DraggableElement} item The item the user has clicked and is dragging with the mouse.
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
 * Respond to dragstart event.
 *
 * @private
 * @param {jQuery.Event} event jQuery event
 * @fires dragstart
 */
OO.ui.mixin.DraggableElement.prototype.onDragStart = function ( e ) {
	var dataTransfer = e.originalEvent.dataTransfer;
	// Define drop effect
	dataTransfer.dropEffect = 'none';
	dataTransfer.effectAllowed = 'move';
	// Support: Firefox
	// We must set up a dataTransfer data property or Firefox seems to
	// ignore the fact the element is draggable.
	try {
		dataTransfer.setData( 'application-x/OOjs-UI-draggable', this.getIndex() );
	} catch ( err ) {
		// The above is only for Firefox. Move on if it fails.
	}
	// Add dragging class
	this.$element.addClass( 'oo-ui-draggableElement-dragging' );
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
	this.$element.removeClass( 'oo-ui-draggableElement-dragging' );
	this.emit( 'dragend' );
};

/**
 * Handle drop event.
 *
 * @private
 * @param {jQuery.Event} event jQuery event
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
 * @private
 */
OO.ui.mixin.DraggableElement.prototype.onDragOver = function ( e ) {
	e.preventDefault();
};

/**
 * Set item index.
 * Store it in the DOM so we can access from the widget drag event
 *
 * @private
 * @param {number} Item index
 */
OO.ui.mixin.DraggableElement.prototype.setIndex = function ( index ) {
	if ( this.index !== index ) {
		this.index = index;
		this.$element.data( 'index', index );
	}
};

/**
 * Get item index
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
 */
OO.ui.mixin.DraggableGroupElement = function OoUiMixinDraggableGroupElement( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.mixin.GroupElement.call( this, config );

	// Properties
	this.orientation = config.orientation || 'vertical';
	this.dragItem = null;
	this.itemDragOver = null;
	this.itemKeys = {};
	this.sideInsertion = '';

	// Events
	this.aggregate( {
		dragstart: 'itemDragStart',
		dragend: 'itemDragEnd',
		drop: 'itemDrop'
	} );
	this.connect( this, {
		itemDragStart: 'onItemDragStart',
		itemDrop: 'onItemDrop',
		itemDragEnd: 'onItemDragEnd'
	} );
	this.$element.on( {
		dragover: this.onDragOver.bind( this ),
		dragleave: this.onDragLeave.bind( this )
	} );

	// Initialize
	if ( Array.isArray( config.items ) ) {
		this.addItems( config.items );
	}
	this.$placeholder = $( '<div>' )
		.addClass( 'oo-ui-draggableGroupElement-placeholder' );
	this.$element
		.addClass( 'oo-ui-draggableGroupElement' )
		.append( this.$status )
		.toggleClass( 'oo-ui-draggableGroupElement-horizontal', this.orientation === 'horizontal' )
		.prepend( this.$placeholder );
};

/* Setup */
OO.mixinClass( OO.ui.mixin.DraggableGroupElement, OO.ui.mixin.GroupElement );

/* Events */

/**
 * A 'reorder' event is emitted when the order of items in the group changes.
 *
 * @event reorder
 * @param {OO.ui.mixin.DraggableElement} item Reordered item
 * @param {number} [newIndex] New index for the item
 */

/* Methods */

/**
 * Respond to item drag start event
 *
 * @private
 * @param {OO.ui.mixin.DraggableElement} item Dragged item
 */
OO.ui.mixin.DraggableGroupElement.prototype.onItemDragStart = function ( item ) {
	var i, len;

	// Map the index of each object
	for ( i = 0, len = this.items.length; i < len; i++ ) {
		this.items[ i ].setIndex( i );
	}

	if ( this.orientation === 'horizontal' ) {
		// Set the height of the indicator
		this.$placeholder.css( {
			height: item.$element.outerHeight(),
			width: 2
		} );
	} else {
		// Set the width of the indicator
		this.$placeholder.css( {
			height: 2,
			width: item.$element.outerWidth()
		} );
	}
	this.setDragItem( item );
};

/**
 * Respond to item drag end event
 *
 * @private
 */
OO.ui.mixin.DraggableGroupElement.prototype.onItemDragEnd = function () {
	this.unsetDragItem();
	return false;
};

/**
 * Handle drop event and switch the order of the items accordingly
 *
 * @private
 * @param {OO.ui.mixin.DraggableElement} item Dropped item
 * @fires reorder
 */
OO.ui.mixin.DraggableGroupElement.prototype.onItemDrop = function ( item ) {
	var toIndex = item.getIndex();
	// Check if the dropped item is from the current group
	// TODO: Figure out a way to configure a list of legally droppable
	// elements even if they are not yet in the list
	if ( this.getDragItem() ) {
		// If the insertion point is 'after', the insertion index
		// is shifted to the right (or to the left in RTL, hence 'after')
		if ( this.sideInsertion === 'after' ) {
			toIndex++;
		}
		// Emit change event
		this.emit( 'reorder', this.getDragItem(), toIndex );
	}
	this.unsetDragItem();
	// Return false to prevent propogation
	return false;
};

/**
 * Handle dragleave event.
 *
 * @private
 */
OO.ui.mixin.DraggableGroupElement.prototype.onDragLeave = function () {
	// This means the item was dragged outside the widget
	this.$placeholder
		.css( 'left', 0 )
		.addClass( 'oo-ui-element-hidden' );
};

/**
 * Respond to dragover event
 *
 * @private
 * @param {jQuery.Event} event Event details
 */
OO.ui.mixin.DraggableGroupElement.prototype.onDragOver = function ( e ) {
	var dragOverObj, $optionWidget, itemOffset, itemMidpoint, itemBoundingRect,
		itemSize, cssOutput, dragPosition, itemIndex, itemPosition,
		clientX = e.originalEvent.clientX,
		clientY = e.originalEvent.clientY;

	// Get the OptionWidget item we are dragging over
	dragOverObj = this.getElementDocument().elementFromPoint( clientX, clientY );
	$optionWidget = $( dragOverObj ).closest( '.oo-ui-draggableElement' );
	if ( $optionWidget[ 0 ] ) {
		itemOffset = $optionWidget.offset();
		itemBoundingRect = $optionWidget[ 0 ].getBoundingClientRect();
		itemPosition = $optionWidget.position();
		itemIndex = $optionWidget.data( 'index' );
	}

	if (
		itemOffset &&
		this.isDragging() &&
		itemIndex !== this.getDragItem().getIndex()
	) {
		if ( this.orientation === 'horizontal' ) {
			// Calculate where the mouse is relative to the item width
			itemSize = itemBoundingRect.width;
			itemMidpoint = itemBoundingRect.left + itemSize / 2;
			dragPosition = clientX;
			// Which side of the item we hover over will dictate
			// where the placeholder will appear, on the left or
			// on the right
			cssOutput = {
				left: dragPosition < itemMidpoint ? itemPosition.left : itemPosition.left + itemSize,
				top: itemPosition.top
			};
		} else {
			// Calculate where the mouse is relative to the item height
			itemSize = itemBoundingRect.height;
			itemMidpoint = itemBoundingRect.top + itemSize / 2;
			dragPosition = clientY;
			// Which side of the item we hover over will dictate
			// where the placeholder will appear, on the top or
			// on the bottom
			cssOutput = {
				top: dragPosition < itemMidpoint ? itemPosition.top : itemPosition.top + itemSize,
				left: itemPosition.left
			};
		}
		// Store whether we are before or after an item to rearrange
		// For horizontal layout, we need to account for RTL, as this is flipped
		if (  this.orientation === 'horizontal' && this.$element.css( 'direction' ) === 'rtl' ) {
			this.sideInsertion = dragPosition < itemMidpoint ? 'after' : 'before';
		} else {
			this.sideInsertion = dragPosition < itemMidpoint ? 'before' : 'after';
		}
		// Add drop indicator between objects
		this.$placeholder
			.css( cssOutput )
			.removeClass( 'oo-ui-element-hidden' );
	} else {
		// This means the item was dragged outside the widget
		this.$placeholder
			.css( 'left', 0 )
			.addClass( 'oo-ui-element-hidden' );
	}
	// Prevent default
	e.preventDefault();
};

/**
 * Set a dragged item
 *
 * @param {OO.ui.mixin.DraggableElement} item Dragged item
 */
OO.ui.mixin.DraggableGroupElement.prototype.setDragItem = function ( item ) {
	this.dragItem = item;
};

/**
 * Unset the current dragged item
 */
OO.ui.mixin.DraggableGroupElement.prototype.unsetDragItem = function () {
	this.dragItem = null;
	this.itemDragOver = null;
	this.$placeholder.addClass( 'oo-ui-element-hidden' );
	this.sideInsertion = '';
};

/**
 * Get the item that is currently being dragged.
 *
 * @return {OO.ui.mixin.DraggableElement|null} The currently dragged item, or `null` if no item is being dragged
 */
OO.ui.mixin.DraggableGroupElement.prototype.getDragItem = function () {
	return this.dragItem;
};

/**
 * Check if an item in the group is currently being dragged.
 *
 * @return {Boolean} Item is being dragged
 */
OO.ui.mixin.DraggableGroupElement.prototype.isDragging = function () {
	return this.getDragItem() !== null;
};

/**
 * IconElement is often mixed into other classes to generate an icon.
 * Icons are graphics, about the size of normal text. They are used to aid the user
 * in locating a control or to convey information in a space-efficient way. See the
 * [OOjs UI documentation on MediaWiki] [1] for a list of icons
 * included in the library.
 *
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Widgets/Icons,_Indicators,_and_Labels#Icons
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
 *  See the [OOjs UI documentation on MediaWiki] [2] for a list of icons included in the library.
 * [2]: https://www.mediawiki.org/wiki/OOjs_UI/Widgets/Icons,_Indicators,_and_Labels#Icons
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
	iconTitle = typeof iconTitle === 'function' ||
		( typeof iconTitle === 'string' && iconTitle.length ) ?
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
 * [OOjs UI documentation on MediaWiki] [1].
 *
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Widgets/Icons,_Indicators,_and_Labels#Indicators
 *
 * @abstract
 * @class
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {jQuery} [$indicator] The indicator element created by the class. If this
 *  configuration is omitted, the indicator element will use a generated `<span>`.
 * @cfg {string} [indicator] Symbolic name of the indicator (e.g., ‘alert’ or  ‘down’).
 *  See the [OOjs UI documentation on MediaWiki][2] for a list of indicators included
 *  in the library.
 * [2]: https://www.mediawiki.org/wiki/OOjs_UI/Widgets/Icons,_Indicators,_and_Labels#Indicators
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
 * Symbolic name of the indicator (e.g., ‘alert’ or  ‘down’).
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
 * Set the indicator by its symbolic name: ‘alert’, ‘down’, ‘next’, ‘previous’, ‘required’, ‘up’. Use `null` to remove the indicator.
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
 * @param {string|Function|null} indicator Indicator title text, a function that returns text, or
 *   `null` for no indicator title
 * @chainable
 */
OO.ui.mixin.IndicatorElement.prototype.setIndicatorTitle = function ( indicatorTitle ) {
	indicatorTitle = typeof indicatorTitle === 'function' ||
		( typeof indicatorTitle === 'string' && indicatorTitle.length ) ?
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
 * Get the symbolic name of the indicator (e.g., ‘alert’ or  ‘down’).
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
 * See the [OOjs UI documentation on MediaWiki] [1] for more information.
 *
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Widgets/Icons,_Indicators,_and_Labels#Labels
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
 *  in the future. See the [OOjs UI documentation on MediaWiki] [2] for examples.
 *  [2]: https://www.mediawiki.org/wiki/OOjs_UI/Widgets/Icons,_Indicators,_and_Labels#Labels
 * @cfg {boolean} [autoFitLabel=true] Fit the label to the width of the parent element.
 *  The label will be truncated to fit if necessary.
 */
OO.ui.mixin.LabelElement = function OoUiMixinLabelElement( config ) {
	// Configuration initialization
	config = config || {};

	// Properties
	this.$label = null;
	this.label = null;
	this.autoFitLabel = config.autoFitLabel === undefined || !!config.autoFitLabel;

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
	label = ( ( typeof label === 'string' && label.length ) || label instanceof jQuery || label instanceof OO.ui.HtmlSnippet ) ? label : null;

	this.$element.toggleClass( 'oo-ui-labelElement', !!label );

	if ( this.label !== label ) {
		if ( this.$label ) {
			this.setLabelContent( label );
		}
		this.label = label;
		this.emit( 'labelChange' );
	}

	return this;
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
 * Fit the label.
 *
 * @chainable
 */
OO.ui.mixin.LabelElement.prototype.fitLabel = function () {
	if ( this.$label && this.$label.autoEllipsis && this.autoFitLabel ) {
		this.$label.autoEllipsis( { hasSpan: false, tooltip: true } );
	}

	return this;
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
 * LookupElement is a mixin that creates a {@link OO.ui.FloatingMenuSelectWidget menu} of suggested values for
 * a {@link OO.ui.TextInputWidget text input widget}. Suggested values are based on the characters the user types
 * into the text input field and, in general, the menu is only displayed when the user types. If a suggested value is chosen
 * from the lookup menu, that value becomes the value of the input field.
 *
 * Note that a new menu of suggested items is displayed when a value is chosen from the lookup menu. If this is
 * not the desired behavior, disable lookup menus with the #setLookupsDisabled method, then set the value, then
 * re-enable lookups.
 *
 * See the [OOjs UI demos][1] for an example.
 *
 * [1]: https://tools.wmflabs.org/oojs-ui/oojs-ui/demos/index.html#widgets-apex-vector-ltr
 *
 * @class
 * @abstract
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {jQuery} [$overlay] Overlay for the lookup menu; defaults to relative positioning
 * @cfg {jQuery} [$container=this.$element] The container element. The lookup menu is rendered beneath the specified element.
 * @cfg {boolean} [allowSuggestionsWhenEmpty=false] Request and display a lookup menu when the text input is empty.
 *  By default, the lookup menu is not generated and displayed until the user begins to type.
 */
OO.ui.mixin.LookupElement = function OoUiMixinLookupElement( config ) {
	// Configuration initialization
	config = config || {};

	// Properties
	this.$overlay = config.$overlay || this.$element;
	this.lookupMenu = new OO.ui.FloatingMenuSelectWidget( {
		widget: this,
		input: this,
		$container: config.$container || this.$element
	} );

	this.allowSuggestionsWhenEmpty = config.allowSuggestionsWhenEmpty || false;

	this.lookupCache = {};
	this.lookupQuery = null;
	this.lookupRequest = null;
	this.lookupsDisabled = false;
	this.lookupInputFocused = false;

	// Events
	this.$input.on( {
		focus: this.onLookupInputFocus.bind( this ),
		blur: this.onLookupInputBlur.bind( this ),
		mousedown: this.onLookupInputMouseDown.bind( this )
	} );
	this.connect( this, { change: 'onLookupInputChange' } );
	this.lookupMenu.connect( this, {
		toggle: 'onLookupMenuToggle',
		choose: 'onLookupMenuItemChoose'
	} );

	// Initialization
	this.$element.addClass( 'oo-ui-lookupElement' );
	this.lookupMenu.$element.addClass( 'oo-ui-lookupElement-menu' );
	this.$overlay.append( this.lookupMenu.$element );
};

/* Methods */

/**
 * Handle input focus event.
 *
 * @protected
 * @param {jQuery.Event} e Input focus event
 */
OO.ui.mixin.LookupElement.prototype.onLookupInputFocus = function () {
	this.lookupInputFocused = true;
	this.populateLookupMenu();
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
	// Only open the menu if the input was already focused.
	// This way we allow the user to open the menu again after closing it with Esc
	// by clicking in the input. Opening (and populating) the menu when initially
	// clicking into the input is handled by the focus handler.
	if ( this.lookupInputFocused && !this.lookupMenu.isVisible() ) {
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
		// MenuSelectWidget will close itself when the user presses Esc.
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
 * @return {OO.ui.FloatingMenuSelectWidget}
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
			} );
	}

	return this;
};

/**
 * Highlight the first selectable item in the menu.
 *
 * @private
 * @chainable
 */
OO.ui.mixin.LookupElement.prototype.initializeLookupMenuSelection = function () {
	if ( !this.lookupMenu.getSelectedItem() ) {
		this.lookupMenu.highlightItem( this.lookupMenu.getFirstSelectableItem() );
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
	var widget = this,
		value = this.getValue(),
		deferred = $.Deferred(),
		ourRequest;

	this.abortLookupRequest();
	if ( Object.prototype.hasOwnProperty.call( this.lookupCache, value ) ) {
		deferred.resolve( this.getLookupMenuOptionsFromData( this.lookupCache[ value ] ) );
	} else {
		this.pushPending();
		this.lookupQuery = value;
		ourRequest = this.lookupRequest = this.getLookupRequest();
		ourRequest
			.always( function () {
				// We need to pop pending even if this is an old request, otherwise
				// the widget will remain pending forever.
				// TODO: this assumes that an aborted request will fail or succeed soon after
				// being aborted, or at least eventually. It would be nice if we could popPending()
				// at abort time, but only if we knew that we hadn't already called popPending()
				// for that request.
				widget.popPending();
			} )
			.done( function ( response ) {
				// If this is an old request (and aborting it somehow caused it to still succeed),
				// ignore its success completely
				if ( ourRequest === widget.lookupRequest ) {
					widget.lookupQuery = null;
					widget.lookupRequest = null;
					widget.lookupCache[ value ] = widget.getLookupCacheDataFromResponse( response );
					deferred.resolve( widget.getLookupMenuOptionsFromData( widget.lookupCache[ value ] ) );
				}
			} )
			.fail( function () {
				// If this is an old request (or a request failing because it's being aborted),
				// ignore its failure completely
				if ( ourRequest === widget.lookupRequest ) {
					widget.lookupQuery = null;
					widget.lookupRequest = null;
					deferred.reject();
				}
			} );
	}
	return deferred.promise();
};

/**
 * Abort the currently pending lookup request, if any.
 *
 * @private
 */
OO.ui.mixin.LookupElement.prototype.abortLookupRequest = function () {
	var oldRequest = this.lookupRequest;
	if ( oldRequest ) {
		// First unset this.lookupRequest to the fail handler will notice
		// that the request is no longer current
		this.lookupRequest = null;
		this.lookupQuery = null;
		oldRequest.abort();
	}
};

/**
 * Get a new request object of the current lookup query value.
 *
 * @protected
 * @abstract
 * @return {jQuery.Promise} jQuery AJAX object, or promise object with an .abort() method
 */
OO.ui.mixin.LookupElement.prototype.getLookupRequest = function () {
	// Stub, implemented in subclass
	return null;
};

/**
 * Pre-process data returned by the request from #getLookupRequest.
 *
 * The return value of this function will be cached, and any further queries for the given value
 * will use the cache rather than doing API requests.
 *
 * @protected
 * @abstract
 * @param {Mixed} response Response from server
 * @return {Mixed} Cached result data
 */
OO.ui.mixin.LookupElement.prototype.getLookupCacheDataFromResponse = function () {
	// Stub, implemented in subclass
	return [];
};

/**
 * Get a list of menu option widgets from the (possibly cached) data returned by
 * #getLookupCacheDataFromResponse.
 *
 * @protected
 * @abstract
 * @param {Mixed} data Cached result data, usually an array
 * @return {OO.ui.MenuOptionWidget[]} Menu items
 */
OO.ui.mixin.LookupElement.prototype.getLookupMenuOptionsFromData = function () {
	// Stub, implemented in subclass
	return [];
};

/**
 * Set the read-only state of the widget.
 *
 * This will also disable/enable the lookups functionality.
 *
 * @param {boolean} readOnly Make input read-only
 * @chainable
 */
OO.ui.mixin.LookupElement.prototype.setReadOnly = function ( readOnly ) {
	// Parent method
	// Note: Calling #setReadOnly this way assumes this is mixed into an OO.ui.TextInputWidget
	OO.ui.TextInputWidget.prototype.setReadOnly.call( this, readOnly );

	// During construction, #setReadOnly is called before the OO.ui.mixin.LookupElement constructor
	if ( this.isReadOnly() && this.lookupMenu ) {
		this.closeLookupMenu();
	}

	return this;
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
		{ autoClose: true },
		config.popup,
		{ $autoCloseIgnore: this.$element }
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
 * - **constructive**: Constructive styling is applied to convey that the widget will create something.
 *
 * The flags affect the appearance of the buttons:
 *
 *     @example
 *     // FlaggedElement is mixed into ButtonWidget to provide styling flags
 *     var button1 = new OO.ui.ButtonWidget( {
 *         label: 'Constructive',
 *         flags: 'constructive'
 *     } );
 *     var button2 = new OO.ui.ButtonWidget( {
 *         label: 'Destructive',
 *         flags: 'destructive'
 *     } );
 *     var button3 = new OO.ui.ButtonWidget( {
 *         label: 'Progressive',
 *         flags: 'progressive'
 *     } );
 *     $( 'body' ).append( button1.$element, button2.$element, button3.$element );
 *
 * {@link OO.ui.ActionWidget ActionWidgets}, which are a special kind of button that execute an action, use these flags: **primary** and **safe**.
 * Please see the [OOjs UI documentation on MediaWiki] [1] for more information.
 *
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Elements/Flagged
 *
 * @abstract
 * @class
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {string|string[]} [flags] The name or names of the flags (e.g., 'constructive' or 'primary') to apply.
 *  Please see the [OOjs UI documentation on MediaWiki] [2] for more information about available flags.
 *  [2]: https://www.mediawiki.org/wiki/OOjs_UI/Elements/Flagged
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
	this.setTitle( config.title || this.constructor.static.title );
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
		this.$titled.attr( 'title', this.title );
	}
};

/**
 * Set title.
 *
 * @param {string|Function|null} title Title text, a function that returns text, or `null` for no title
 * @chainable
 */
OO.ui.mixin.TitledElement.prototype.setTitle = function ( title ) {
	title = typeof title === 'string' ? OO.ui.resolveMsg( title ) : null;

	if ( this.title !== title ) {
		if ( this.$titled ) {
			if ( title !== null ) {
				this.$titled.attr( 'title', title );
			} else {
				this.$titled.removeAttr( 'title' );
			}
		}
		this.title = title;
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
			this.$clippable.css( { width: '', height: '', overflowX: '', overflowY: '' } );
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
 * Set the ideal size. These are the dimensions the element will have when it's not being clipped.
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
 * Clip element to visible boundaries and allow scrolling when needed. Call this method when
 * the element's natural height changes.
 *
 * Element will be clipped the bottom or right of the element is within 10px of the edge of, or
 * overlapped by, the visible area of the nearest scrollable container.
 *
 * @chainable
 */
OO.ui.mixin.ClippableElement.prototype.clip = function () {
	var $container, extraHeight, extraWidth, ccOffset,
		$scrollableContainer, scOffset, scHeight, scWidth,
		ccWidth, scrollerIsWindow, scrollTop, scrollLeft,
		desiredWidth, desiredHeight, allotedWidth, allotedHeight,
		naturalWidth, naturalHeight, clipWidth, clipHeight,
		buffer = 7; // Chosen by fair dice roll

	if ( !this.clipping ) {
		// this.$clippableScrollableContainer and this.$clippableWindow are null, so the below will fail
		return this;
	}

	$container = this.$clippableContainer || this.$clippable;
	extraHeight = $container.outerHeight() - this.$clippable.outerHeight();
	extraWidth = $container.outerWidth() - this.$clippable.outerWidth();
	ccOffset = $container.offset();
	$scrollableContainer = this.$clippableScrollableContainer.is( 'html, body' ) ?
		this.$clippableWindow : this.$clippableScrollableContainer;
	scOffset = $scrollableContainer.offset() || { top: 0, left: 0 };
	scHeight = $scrollableContainer.innerHeight() - buffer;
	scWidth = $scrollableContainer.innerWidth() - buffer;
	ccWidth = $container.outerWidth() + buffer;
	scrollerIsWindow = this.$clippableScroller[ 0 ] === this.$clippableWindow[ 0 ];
	scrollTop = scrollerIsWindow ? this.$clippableScroller.scrollTop() : 0;
	scrollLeft = scrollerIsWindow ? this.$clippableScroller.scrollLeft() : 0;
	desiredWidth = ccOffset.left < 0 ?
		ccWidth + ccOffset.left :
		( scOffset.left + scrollLeft + scWidth ) - ccOffset.left;
	desiredHeight = ( scOffset.top + scrollTop + scHeight ) - ccOffset.top;
	allotedWidth = desiredWidth - extraWidth;
	allotedHeight = desiredHeight - extraHeight;
	naturalWidth = this.$clippable.prop( 'scrollWidth' );
	naturalHeight = this.$clippable.prop( 'scrollHeight' );
	clipWidth = allotedWidth < naturalWidth;
	clipHeight = allotedHeight < naturalHeight;

	if ( clipWidth ) {
		this.$clippable.css( { overflowX: 'scroll', width: Math.max( 0, allotedWidth ) } );
	} else {
		this.$clippable.css( { width: this.idealWidth ? this.idealWidth - extraWidth : '', overflowX: '' } );
	}
	if ( clipHeight ) {
		this.$clippable.css( { overflowY: 'scroll', height: Math.max( 0, allotedHeight ) } );
	} else {
		this.$clippable.css( { height: this.idealHeight ? this.idealHeight - extraHeight : '', overflowY: '' } );
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
 * Element that will stick under a specified container, even when it is inserted elsewhere in the
 * document (for example, in a OO.ui.Window's $overlay).
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
 * @cfg {jQuery} [$floatableContainer] Node to position below
 */
OO.ui.mixin.FloatableElement = function OoUiMixinFloatableElement( config ) {
	// Configuration initialization
	config = config || {};

	// Properties
	this.$floatable = null;
	this.$floatableContainer = null;
	this.$floatableWindow = null;
	this.$floatableClosestScrollable = null;
	this.onFloatableScrollHandler = this.position.bind( this );
	this.onFloatableWindowResizeHandler = this.position.bind( this );

	// Initialization
	this.setFloatableContainer( config.$floatableContainer );
	this.setFloatableElement( config.$floatable || this.$element );
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
 * The element will be always positioned under the specified container.
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
 * Toggle positioning.
 *
 * Do not turn positioning on until after the element is attached to the DOM and visible.
 *
 * @param {boolean} [positioning] Enable positioning, omit to toggle
 * @chainable
 */
OO.ui.mixin.FloatableElement.prototype.togglePositioning = function ( positioning ) {
	var closestScrollableOfContainer, closestScrollableOfFloatable;

	positioning = positioning === undefined ? !this.positioning : !!positioning;

	if ( this.positioning !== positioning ) {
		this.positioning = positioning;

		closestScrollableOfContainer = OO.ui.Element.static.getClosestScrollableContainer( this.$floatableContainer[ 0 ] );
		closestScrollableOfFloatable = OO.ui.Element.static.getClosestScrollableContainer( this.$floatable[ 0 ] );
		if ( closestScrollableOfContainer !== closestScrollableOfFloatable ) {
			// If the scrollable is the root, we have to listen to scroll events
			// on the window because of browser inconsistencies (or do we? someone should verify this)
			if ( $( closestScrollableOfContainer ).is( 'html, body' ) ) {
				closestScrollableOfContainer = OO.ui.Element.static.getWindow( closestScrollableOfContainer );
			}
		}

		if ( positioning ) {
			this.$floatableWindow = $( this.getElementWindow() );
			this.$floatableWindow.on( 'resize', this.onFloatableWindowResizeHandler );

			if ( closestScrollableOfContainer !== closestScrollableOfFloatable ) {
				this.$floatableClosestScrollable = $( closestScrollableOfContainer );
				this.$floatableClosestScrollable.on( 'scroll', this.onFloatableScrollHandler );
			}

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

			this.$floatable.css( { left: '', top: '' } );
		}
	}

	return this;
};

/**
 * Position the floatable below its container.
 *
 * This should only be done when both of them are attached to the DOM and visible.
 *
 * @chainable
 */
OO.ui.mixin.FloatableElement.prototype.position = function () {
	var pos;

	if ( !this.positioning ) {
		return this;
	}

	pos = OO.ui.Element.static.getRelativePosition( this.$floatableContainer, this.$floatable.offsetParent() );

	// Position under container
	pos.top += this.$floatableContainer.height();
	this.$floatable.css( pos );

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
 * @param {string|Function|null} accesskey Key, a function that returns a key, or `null` for no accesskey
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
 * Tools, together with {@link OO.ui.ToolGroup toolgroups}, constitute {@link OO.ui.Toolbar toolbars}.
 * Each tool is configured with a static name, title, and icon and is customized with the command to carry
 * out when the tool is selected. Tools must also be registered with a {@link OO.ui.ToolFactory tool factory},
 * which creates the tools on demand.
 *
 * Tools are added to toolgroups ({@link OO.ui.ListToolGroup ListToolGroup},
 * {@link OO.ui.BarToolGroup BarToolGroup}, or {@link OO.ui.MenuToolGroup MenuToolGroup}), which determine how
 * the tool is displayed in the toolbar. See {@link OO.ui.Toolbar toolbars} for an example.
 *
 * For more information, please see the [OOjs UI documentation on MediaWiki][1].
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Toolbars
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
 * @cfg {string|Function} [title] Title text or a function that returns text. If this config is omitted, the value of
 *  the {@link #static-title static title} property is used.
 *
 *  The title is used in different ways depending on the type of toolgroup that contains the tool. The
 *  title is used as a tooltip if the tool is part of a {@link OO.ui.BarToolGroup bar} toolgroup, or as the label text if the tool is
 *  part of a {@link OO.ui.ListToolGroup list} or {@link OO.ui.MenuToolGroup menu} toolgroup.
 *
 *  For bar toolgroups, a description of the accelerator key is appended to the title if an accelerator key
 *  is associated with an action by the same name as the tool and accelerator functionality has been added to the application.
 *  To add accelerator key functionality, you must subclass OO.ui.Toolbar and override the {@link OO.ui.Toolbar#getToolAccelerator getToolAccelerator} method.
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

	// Mixin constructors
	OO.ui.mixin.IconElement.call( this, config );
	OO.ui.mixin.FlaggedElement.call( this, config );
	OO.ui.mixin.TabIndexedElement.call( this, $.extend( {}, config, { $tabIndexed: this.$link } ) );

	// Events
	this.toolbar.connect( this, { updateState: 'onUpdateState' } );

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
		.append( this.$icon, this.$title, this.$accel )
		.attr( 'role', 'button' );
	this.$element
		.data( 'oo-ui-tool', this )
		.addClass(
			'oo-ui-tool ' + 'oo-ui-tool-name-' +
			this.constructor.static.name.replace( /^([^\/]+)\/([^\/]+).*$/, '$1-$2' )
		)
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
 * The symbolic name is used internally to register the tool with a {@link OO.ui.ToolFactory ToolFactory}. It can
 * also be used when adding tools to toolgroups.
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
 * Tool title text or a function that returns title text. The value of the static property is overridden if the #title config option is used.
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
 * This is a stub that can be overriden to provide support for filtering tools based on an
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
 * Handle the toolbar state being updated.
 *
 * This is an abstract method that must be overridden in a concrete subclass.
 *
 * @protected
 * @abstract
 */
OO.ui.Tool.prototype.onUpdateState = function () {
	throw new Error(
		'OO.ui.Tool.onUpdateState not implemented in this subclass:' + this.constructor
	);
};

/**
 * Handle the tool being selected.
 *
 * This is an abstract method that must be overridden in a concrete subclass.
 *
 * @protected
 * @abstract
 */
OO.ui.Tool.prototype.onSelect = function () {
	throw new Error(
		'OO.ui.Tool.onSelect not implemented in this subclass:' + this.constructor
	);
};

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
	if ( this.active ) {
		this.$element.addClass( 'oo-ui-tool-active' );
	} else {
		this.$element.removeClass( 'oo-ui-tool-active' );
	}
};

/**
 * Set the tool #title.
 *
 * @param {string|Function} title Title text or a function that returns text
 * @chainable
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
 * Toolbars are complex interface components that permit users to easily access a variety
 * of {@link OO.ui.Tool tools} (e.g., formatting commands) and actions, which are additional commands that are
 * part of the toolbar, but not configured as tools.
 *
 * Individual tools are customized and then registered with a {@link OO.ui.ToolFactory tool factory}, which creates
 * the tools on demand. Each tool has a symbolic name (used when registering the tool), a title (e.g., ‘Insert
 * picture’), and an icon.
 *
 * Individual tools are organized in {@link OO.ui.ToolGroup toolgroups}, which can be {@link OO.ui.MenuToolGroup menus}
 * of tools, {@link OO.ui.ListToolGroup lists} of tools, or a single {@link OO.ui.BarToolGroup bar} of tools.
 * The arrangement and order of the toolgroups is customized when the toolbar is set up. Tools can be presented in
 * any order, but each can only appear once in the toolbar.
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
 *     function PictureTool() {
 *         PictureTool.parent.apply( this, arguments );
 *     }
 *     OO.inheritClass( PictureTool, OO.ui.Tool );
 *     // Each tool must have a 'name' (used as an internal identifier, see later) and at least one
 *     // of 'icon' and 'title' (displayed icon and text).
 *     PictureTool.static.name = 'picture';
 *     PictureTool.static.icon = 'picture';
 *     PictureTool.static.title = 'Insert picture';
 *     // Defines the action that will happen when this tool is selected (clicked).
 *     PictureTool.prototype.onSelect = function () {
 *         $area.text( 'Picture tool clicked!' );
 *         // Never display this tool as "active" (selected).
 *         this.setActive( false );
 *     };
 *     // Make this tool available in our toolFactory and thus our toolbar
 *     toolFactory.register( PictureTool );
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
 *             include: [ 'picture', 'help' ]
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
 *     $( 'body' ).append( frame.$element );
 *
 *     // Here is where the toolbar is actually built. This must be done after inserting it into the
 *     // document.
 *     toolbar.initialize();
 *
 * The following example extends the previous one to illustrate 'menu' toolgroups and the usage of
 * 'updateState' event.
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
 *     function PictureTool() {
 *         PictureTool.parent.apply( this, arguments );
 *     }
 *     OO.inheritClass( PictureTool, OO.ui.Tool );
 *     // Each tool must have a 'name' (used as an internal identifier, see later) and at least one
 *     // of 'icon' and 'title' (displayed icon and text).
 *     PictureTool.static.name = 'picture';
 *     PictureTool.static.icon = 'picture';
 *     PictureTool.static.title = 'Insert picture';
 *     // Defines the action that will happen when this tool is selected (clicked).
 *     PictureTool.prototype.onSelect = function () {
 *         $area.text( 'Picture tool clicked!' );
 *         // Never display this tool as "active" (selected).
 *         this.setActive( false );
 *     };
 *     // The toolbar can be synchronized with the state of some external stuff, like a text
 *     // editor's editing area, highlighting the tools (e.g. a 'bold' tool would be shown as active
 *     // when the text cursor was inside bolded text). Here we simply disable this feature.
 *     PictureTool.prototype.onUpdateState = function () {
 *     };
 *     // Make this tool available in our toolFactory and thus our toolbar
 *     toolFactory.register( PictureTool );
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
 *     SettingsTool.prototype.onUpdateState = function () {
 *     };
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
 *     StuffTool.prototype.onUpdateState = function () {
 *     };
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
 *             include: [ 'picture', 'help' ]
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
 *     $( 'body' ).append( frame.$element );
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
 * @cfg {boolean} [actions] Add an actions section to the toolbar. Actions are commands that are included
 *  in the toolbar, but are not configured as tools. By default, actions are displayed on the right side of
 *  the toolbar.
 * @cfg {boolean} [shadow] Add a shadow below the toolbar.
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
	this.groups = [];
	this.tools = {};
	this.$bar = $( '<div>' );
	this.$actions = $( '<div>' );
	this.initialized = false;
	this.onWindowResizeHandler = this.onWindowResize.bind( this );

	// Events
	this.$element
		.add( this.$bar ).add( this.$group ).add( this.$actions )
		.on( 'mousedown keydown', this.onPointerDown.bind( this ) );

	// Initialization
	this.$group.addClass( 'oo-ui-toolbar-tools' );
	if ( config.actions ) {
		this.$bar.append( this.$actions.addClass( 'oo-ui-toolbar-actions' ) );
	}
	this.$bar
		.addClass( 'oo-ui-toolbar-bar' )
		.append( this.$group, '<div style="clear:both"></div>' );
	if ( config.shadow ) {
		this.$bar.append( '<div class="oo-ui-toolbar-shadow"></div>' );
	}
	this.$element.addClass( 'oo-ui-toolbar' ).append( this.$bar );
};

/* Setup */

OO.inheritClass( OO.ui.Toolbar, OO.ui.Element );
OO.mixinClass( OO.ui.Toolbar, OO.EventEmitter );
OO.mixinClass( OO.ui.Toolbar, OO.ui.mixin.GroupElement );

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
 */
OO.ui.Toolbar.prototype.onPointerDown = function ( e ) {
	var $closestWidgetToEvent = $( e.target ).closest( '.oo-ui-widget' ),
		$closestWidgetToToolbar = this.$element.closest( '.oo-ui-widget' );
	if ( !$closestWidgetToEvent.length || $closestWidgetToEvent[ 0 ] === $closestWidgetToToolbar[ 0 ] ) {
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
	this.$element.toggleClass(
		'oo-ui-toolbar-narrow',
		this.$bar.width() <= this.narrowThreshold
	);
};

/**
 * Sets up handles and preloads required information for the toolbar to work.
 * This must be called after it is attached to a visible document and before doing anything else.
 */
OO.ui.Toolbar.prototype.initialize = function () {
	if ( !this.initialized ) {
		this.initialized = true;
		this.narrowThreshold = this.$group.width() + this.$actions.width();
		$( this.getElementWindow() ).on( 'resize', this.onWindowResizeHandler );
		this.onWindowResize();
	}
};

/**
 * Set up the toolbar.
 *
 * The toolbar is set up with a list of toolgroup configurations that specify the type of
 * toolgroup ({@link OO.ui.BarToolGroup bar}, {@link OO.ui.MenuToolGroup menu}, or {@link OO.ui.ListToolGroup list})
 * to add and which tools to include, exclude, promote, or demote within that toolgroup. Please
 * see {@link OO.ui.ToolGroup toolgroups} for more information about including tools in toolgroups.
 *
 * @param {Object.<string,Array>} groups List of toolgroup configurations
 * @param {Array|string} [groups.include] Tools to include in the toolgroup
 * @param {Array|string} [groups.exclude] Tools to exclude from the toolgroup
 * @param {Array|string} [groups.promote] Tools to promote to the beginning of the toolgroup
 * @param {Array|string} [groups.demote] Tools to demote to the end of the toolgroup
 */
OO.ui.Toolbar.prototype.setup = function ( groups ) {
	var i, len, type, group,
		items = [],
		defaultType = 'bar';

	// Cleanup previous groups
	this.reset();

	// Build out new groups
	for ( i = 0, len = groups.length; i < len; i++ ) {
		group = groups[ i ];
		if ( group.include === '*' ) {
			// Apply defaults to catch-all groups
			if ( group.type === undefined ) {
				group.type = 'list';
			}
			if ( group.label === undefined ) {
				group.label = OO.ui.msg( 'ooui-toolbar-more' );
			}
		}
		// Check type has been registered
		type = this.getToolGroupFactory().lookup( group.type ) ? group.type : defaultType;
		items.push(
			this.getToolGroupFactory().create( type, this, group )
		);
	}
	this.addItems( items );
};

/**
 * Remove all tools and toolgroups from the toolbar.
 */
OO.ui.Toolbar.prototype.reset = function () {
	var i, len;

	this.groups = [];
	this.tools = {};
	for ( i = 0, len = this.items.length; i < len; i++ ) {
		this.items[ i ].destroy();
	}
	this.clearItems();
};

/**
 * Destroy the toolbar.
 *
 * Destroying the toolbar removes all event handlers and DOM elements that constitute the toolbar. Call
 * this method whenever you are done using a toolbar.
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
 * The OOjs UI library does not contain an accelerator system, but this is the hook for one. To
 * use an accelerator system, subclass the toolbar and override this method, which is meant to return a label
 * that describes the accelerator keys for the tool passed (by symbolic name) to the method.
 *
 * @param {string} name Symbolic name of tool
 * @return {string|undefined} Tool accelerator label if available
 */
OO.ui.Toolbar.prototype.getToolAccelerator = function () {
	return undefined;
};

/**
 * ToolGroups are collections of {@link OO.ui.Tool tools} that are used in a {@link OO.ui.Toolbar toolbar}.
 * The type of toolgroup ({@link OO.ui.ListToolGroup list}, {@link OO.ui.BarToolGroup bar}, or {@link OO.ui.MenuToolGroup menu})
 * to which a tool belongs determines how the tool is arranged and displayed in the toolbar. Toolgroups
 * themselves are created on demand with a {@link OO.ui.ToolGroupFactory toolgroup factory}.
 *
 * Toolgroups can contain individual tools, groups of tools, or all available tools:
 *
 * To include an individual tool (or array of individual tools), specify tools by symbolic name:
 *
 *      include: [ 'tool-name' ] or [ { name: 'tool-name' }]
 *
 * To include a group of tools, specify the group name. (The tool's static ‘group’ config is used to assign the tool to a group.)
 *
 *      include: [ { group: 'group-name' } ]
 *
 *  To include all tools that are not yet assigned to a toolgroup, use the catch-all selector, an asterisk (*):
 *
 *      include: '*'
 *
 * See {@link OO.ui.Toolbar toolbars} for a full example. For more information about toolbars in general,
 * please see the [OOjs UI documentation on MediaWiki][1].
 *
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Toolbars
 *
 * @abstract
 * @class
 * @extends OO.ui.Widget
 * @mixins OO.ui.mixin.GroupElement
 *
 * @constructor
 * @param {OO.ui.Toolbar} toolbar
 * @param {Object} [config] Configuration options
 * @cfg {Array|string} [include=[]] List of tools to include in the toolgroup.
 * @cfg {Array|string} [exclude=[]] List of tools to exclude from the toolgroup.
 * @cfg {Array|string} [promote=[]] List of tools to promote to the beginning of the toolgroup.
 * @cfg {Array|string} [demote=[]] List of tools to demote to the end of the toolgroup.
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
	this.onCapturedMouseKeyUpHandler = this.onCapturedMouseKeyUp.bind( this );

	// Events
	this.$element.on( {
		mousedown: this.onMouseKeyDown.bind( this ),
		mouseup: this.onMouseKeyUp.bind( this ),
		keydown: this.onMouseKeyDown.bind( this ),
		keyup: this.onMouseKeyUp.bind( this ),
		focus: this.onMouseOverFocus.bind( this ),
		blur: this.onMouseOutBlur.bind( this ),
		mouseover: this.onMouseOverFocus.bind( this ),
		mouseout: this.onMouseOutBlur.bind( this )
	} );
	this.toolbar.getToolFactory().connect( this, { register: 'onToolFactoryRegister' } );
	this.aggregate( { disable: 'itemDisable' } );
	this.connect( this, { itemDisable: 'updateDisabled' } );

	// Initialization
	this.$group.addClass( 'oo-ui-toolGroup-tools' );
	this.$element
		.addClass( 'oo-ui-toolGroup' )
		.append( this.$group );
	this.populate();
};

/* Setup */

OO.inheritClass( OO.ui.ToolGroup, OO.ui.Widget );
OO.mixinClass( OO.ui.ToolGroup, OO.ui.mixin.GroupElement );

/* Events */

/**
 * @event update
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
 * Note: The OOjs UI library does not include an accelerator system, but does contain
 * a hook for one. To use an accelerator system, subclass the {@link OO.ui.Toolbar toolbar} and
 * override the {@link OO.ui.Toolbar#getToolAccelerator getToolAccelerator} method, which is
 * meant to return a label that describes the accelerator keys for a given tool (e.g., 'Ctrl + M').
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

/* Methods */

/**
 * @inheritdoc
 */
OO.ui.ToolGroup.prototype.isDisabled = function () {
	return this.autoDisabled || OO.ui.ToolGroup.parent.prototype.isDisabled.apply( this, arguments );
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
 * Handle mouse down and key down events.
 *
 * @protected
 * @param {jQuery.Event} e Mouse down or key down event
 */
OO.ui.ToolGroup.prototype.onMouseKeyDown = function ( e ) {
	if (
		!this.isDisabled() &&
		( e.which === 1 || e.which === OO.ui.Keys.SPACE || e.which === OO.ui.Keys.ENTER )
	) {
		this.pressed = this.getTargetTool( e );
		if ( this.pressed ) {
			this.pressed.setActive( true );
			OO.ui.addCaptureEventListener( this.getElementDocument(), 'mouseup', this.onCapturedMouseKeyUpHandler );
			OO.ui.addCaptureEventListener( this.getElementDocument(), 'keyup', this.onCapturedMouseKeyUpHandler );
		}
		return false;
	}
};

/**
 * Handle captured mouse up and key up events.
 *
 * @protected
 * @param {Event} e Mouse up or key up event
 */
OO.ui.ToolGroup.prototype.onCapturedMouseKeyUp = function ( e ) {
	OO.ui.removeCaptureEventListener( this.getElementDocument(), 'mouseup', this.onCapturedMouseKeyUpHandler );
	OO.ui.removeCaptureEventListener( this.getElementDocument(), 'keyup', this.onCapturedMouseKeyUpHandler );
	// onMouseKeyUp may be called a second time, depending on where the mouse is when the button is
	// released, but since `this.pressed` will no longer be true, the second call will be ignored.
	this.onMouseKeyUp( e );
};

/**
 * Handle mouse up and key up events.
 *
 * @protected
 * @param {jQuery.Event} e Mouse up or key up event
 */
OO.ui.ToolGroup.prototype.onMouseKeyUp = function ( e ) {
	var tool = this.getTargetTool( e );

	if (
		!this.isDisabled() && this.pressed && this.pressed === tool &&
		( e.which === 1 || e.which === OO.ui.Keys.SPACE || e.which === OO.ui.Keys.ENTER )
	) {
		this.pressed.onSelect();
		this.pressed = null;
		return false;
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
	var tool = this.getTargetTool( e );

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
	var tool = this.getTargetTool( e );

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
OO.ui.ToolGroup.prototype.getTargetTool = function ( e ) {
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
			// Hack to prevent infinite recursion via ToolGroupTool. We need to reserve the tool before
			// creating it, but we can't call reserveTool() yet because we haven't created the tool.
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
 * MessageDialogs display a confirmation or alert message. By default, the rendered dialog box
 * consists of a header that contains the dialog title, a body with the message, and a footer that
 * contains any {@link OO.ui.ActionWidget action widgets}. The MessageDialog class is the only type
 * of {@link OO.ui.Dialog dialog} that is usually instantiated directly.
 *
 * There are two basic types of message dialogs, confirmation and alert:
 *
 * - **confirmation**: the dialog title describes what a progressive action will do and the message provides
 *  more details about the consequences.
 * - **alert**: the dialog title describes which event occurred and the message provides more information
 *  about why the event occurred.
 *
 * The MessageDialog class specifies two actions: ‘accept’, the primary
 * action (e.g., ‘ok’) and ‘reject,’ the safe action (e.g., ‘cancel’). Both will close the window,
 * passing along the selected action.
 *
 * For more information and examples, please see the [OOjs UI documentation on MediaWiki][1].
 *
 *     @example
 *     // Example: Creating and opening a message dialog window.
 *     var messageDialog = new OO.ui.MessageDialog();
 *
 *     // Create and append a window manager.
 *     var windowManager = new OO.ui.WindowManager();
 *     $( 'body' ).append( windowManager.$element );
 *     windowManager.addWindows( [ messageDialog ] );
 *     // Open the window.
 *     windowManager.openWindow( messageDialog, {
 *         title: 'Basic message dialog',
 *         message: 'This is the message'
 *     } );
 *
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Windows/Message_Dialogs
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

OO.ui.MessageDialog.static.name = 'message';

OO.ui.MessageDialog.static.size = 'small';

OO.ui.MessageDialog.static.verbose = false;

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

OO.ui.MessageDialog.static.actions = [
	{ action: 'accept', label: OO.ui.deferMsg( 'ooui-dialog-message-accept' ), flags: 'primary' },
	{ action: 'reject', label: OO.ui.deferMsg( 'ooui-dialog-message-reject' ), flags: 'safe' }
];

/* Methods */

/**
 * @inheritdoc
 */
OO.ui.MessageDialog.prototype.setManager = function ( manager ) {
	OO.ui.MessageDialog.parent.prototype.setManager.call( this, manager );

	// Events
	this.manager.connect( this, {
		resize: 'onResize'
	} );

	return this;
};

/**
 * @inheritdoc
 */
OO.ui.MessageDialog.prototype.onActionResize = function ( action ) {
	this.fitActions();
	return OO.ui.MessageDialog.parent.prototype.onActionResize.call( this, action );
};

/**
 * Handle window resized events.
 *
 * @private
 */
OO.ui.MessageDialog.prototype.onResize = function () {
	var dialog = this;
	dialog.fitActions();
	// Wait for CSS transition to finish and do it again :(
	setTimeout( function () {
		dialog.fitActions();
	}, 300 );
};

/**
 * Toggle action layout between vertical and horizontal.
 *
 * @private
 * @param {boolean} [value] Layout actions vertically, omit to toggle
 * @chainable
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
 * @param {boolean} [data.verbose] Message is verbose and should be styled as a long message
 * @param {Object[]} [data.actions] List of OO.ui.ActionOptionWidget configuration options for each
 *   action item
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
			this.message.$element.toggleClass(
				'oo-ui-messageDialog-message-verbose',
				data.verbose !== undefined ? data.verbose : this.constructor.static.verbose
			);
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
				actions[ 0 ].$button.focus();
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
	var $scrollable = this.container.$element;
	OO.ui.MessageDialog.parent.prototype.setDimensions.call( this, dim );

	// Twiddle the overflow property, otherwise an unnecessary scrollbar will be produced.
	// Need to do it after transition completes (250ms), add 50ms just in case.
	setTimeout( function () {
		var oldOverflow = $scrollable[ 0 ].style.overflow;
		$scrollable[ 0 ].style.overflow = 'hidden';

		OO.ui.Element.static.reconsiderScrollbars( $scrollable[ 0 ] );

		$scrollable[ 0 ].style.overflow = oldOverflow;
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
OO.ui.MessageDialog.prototype.attachActions = function () {
	var i, len, other, special, others;

	// Parent method
	OO.ui.MessageDialog.parent.prototype.attachActions.call( this );

	special = this.actions.getSpecial();
	others = this.actions.getOthers();

	if ( special.safe ) {
		this.$actions.append( special.safe.$element );
		special.safe.toggleFramed( false );
	}
	if ( others.length ) {
		for ( i = 0, len = others.length; i < len; i++ ) {
			other = others[ i ];
			this.$actions.append( other.$element );
			other.toggleFramed( false );
		}
	}
	if ( special.primary ) {
		this.$actions.append( special.primary.$element );
		special.primary.toggleFramed( false );
	}

	if ( !this.isOpening() ) {
		// If the dialog is currently opening, this will be called automatically soon.
		// This also calls #fitActions.
		this.updateSize();
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
		if ( action.$element.innerWidth() < action.$label.outerWidth( true ) ) {
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
 * interface} alerts users to the trouble, permitting the user to dismiss the error and try again when
 * relevant. The ProcessDialog class is always extended and customized with the actions and content
 * required for each process.
 *
 * The process dialog box consists of a header that visually represents the ‘working’ state of long
 * processes with an animation. The header contains the dialog title as well as
 * two {@link OO.ui.ActionWidget action widgets}:  a ‘safe’ action on the left (e.g., ‘Cancel’) and
 * a ‘primary’ action on the right (e.g., ‘Done’).
 *
 * Like other windows, the process dialog is managed by a {@link OO.ui.WindowManager window manager}.
 * Please see the [OOjs UI documentation on MediaWiki][1] for more information and examples.
 *
 *     @example
 *     // Example: Creating and opening a process dialog window.
 *     function MyProcessDialog( config ) {
 *         MyProcessDialog.parent.call( this, config );
 *     }
 *     OO.inheritClass( MyProcessDialog, OO.ui.ProcessDialog );
 *
 *     MyProcessDialog.static.title = 'Process dialog';
 *     MyProcessDialog.static.actions = [
 *         { action: 'save', label: 'Done', flags: 'primary' },
 *         { label: 'Cancel', flags: 'safe' }
 *     ];
 *
 *     MyProcessDialog.prototype.initialize = function () {
 *         MyProcessDialog.parent.prototype.initialize.apply( this, arguments );
 *         this.content = new OO.ui.PanelLayout( { padded: true, expanded: false } );
 *         this.content.$element.append( '<p>This is a process dialog window. The header contains the title and two buttons: \'Cancel\' (a safe action) on the left and \'Done\' (a primary action)  on the right.</p>' );
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
 *     $( 'body' ).append( windowManager.$element );
 *
 *     var dialog = new MyProcessDialog();
 *     windowManager.addWindows( [ dialog ] );
 *     windowManager.openWindow( dialog );
 *
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Windows/Process_Dialogs
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
OO.ui.ProcessDialog.prototype.onActionResize = function ( action ) {
	if ( this.actions.isSpecial( action ) ) {
		this.fitLabel();
	}
	return OO.ui.ProcessDialog.parent.prototype.onActionResize.call( this, action );
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
	this.dismissButton.connect( this, { click: 'onDismissErrorButtonClick' } );
	this.retryButton.connect( this, { click: 'onRetryButtonClick' } );

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
		.append( this.$safeActions, this.$location, this.$primaryActions );
	this.$head.append( this.$navigation );
	this.$foot.append( this.$otherActions );
};

/**
 * @inheritdoc
 */
OO.ui.ProcessDialog.prototype.getActionWidgets = function ( actions ) {
	var i, len, widgets = [];
	for ( i = 0, len = actions.length; i < len; i++ ) {
		widgets.push(
			new OO.ui.ActionWidget( $.extend( { framed: true }, actions[ i ] ) )
		);
	}
	return widgets;
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

	this.fitLabel();
	this.$body.css( 'bottom', this.$foot.outerHeight( true ) );
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
	// Parent method
	OO.ui.ProcessDialog.parent.prototype.setDimensions.apply( this, arguments );

	this.fitLabel();
};

/**
 * Fit label between actions.
 *
 * @private
 * @chainable
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
				this.manager.opening.done( this.fitLabel.bind( this ) );
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
		// Let's hope we at least have enough space not to overlap, because we can't wrap the label…
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
		// Copy the flags from the first matching action
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
			// Make sure to hide errors
			this.hideErrors();
			this.fitOnOpen = false;
		}, this );
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
 * Please see the [OOjs UI documentation on MediaWiki] [1] for examples and more information.
 *
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Layouts/Fields_and_Fieldsets
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
 *
 * @throws {Error} An error is thrown if no widget is specified
 */
OO.ui.FieldLayout = function OoUiFieldLayout( fieldWidget, config ) {
	var hasInputWidget, div, i;

	// Allow passing positional parameters inside the config object
	if ( OO.isPlainObject( fieldWidget ) && config === undefined ) {
		config = fieldWidget;
		fieldWidget = config.fieldWidget;
	}

	// Make sure we have required constructor arguments
	if ( fieldWidget === undefined ) {
		throw new Error( 'Widget not found' );
	}

	hasInputWidget = fieldWidget.constructor.static.supportsSimpleLabel;

	// Configuration initialization
	config = $.extend( { align: 'left' }, config );

	// Parent constructor
	OO.ui.FieldLayout.parent.call( this, config );

	// Mixin constructors
	OO.ui.mixin.LabelElement.call( this, config );
	OO.ui.mixin.TitledElement.call( this, $.extend( {}, config, { $titled: this.$label } ) );

	// Properties
	this.fieldWidget = fieldWidget;
	this.errors = config.errors || [];
	this.notices = config.notices || [];
	this.$field = $( '<div>' );
	this.$messages = $( '<ul>' );
	this.$body = $( '<' + ( hasInputWidget ? 'label' : 'div' ) + '>' );
	this.align = null;
	if ( config.help ) {
		this.popupButtonWidget = new OO.ui.PopupButtonWidget( {
			classes: [ 'oo-ui-fieldLayout-help' ],
			framed: false,
			icon: 'info'
		} );

		div = $( '<div>' );
		if ( config.help instanceof OO.ui.HtmlSnippet ) {
			div.html( config.help.toString() );
		} else {
			div.text( config.help );
		}
		this.popupButtonWidget.getPopup().$body.append(
			div.addClass( 'oo-ui-fieldLayout-help-content' )
		);
		this.$help = this.popupButtonWidget.$element;
	} else {
		this.$help = $( [] );
	}

	// Events
	if ( hasInputWidget ) {
		this.$label.on( 'click', this.onLabelClick.bind( this ) );
	}
	this.fieldWidget.connect( this, { disable: 'onFieldDisable' } );

	// Initialization
	this.$element
		.addClass( 'oo-ui-fieldLayout' )
		.append( this.$help, this.$body );
	if ( this.errors.length || this.notices.length ) {
		this.$element.append( this.$messages );
	}
	this.$body.addClass( 'oo-ui-fieldLayout-body' );
	this.$messages.addClass( 'oo-ui-fieldLayout-messages' );
	this.$field
		.addClass( 'oo-ui-fieldLayout-field' )
		.toggleClass( 'oo-ui-fieldLayout-disable', this.fieldWidget.isDisabled() )
		.append( this.fieldWidget.$element );

	for ( i = 0; i < this.notices.length; i++ ) {
		this.$messages.append( this.makeMessage( 'notice', this.notices[ i ] ) );
	}
	for ( i = 0; i < this.errors.length; i++ ) {
		this.$messages.append( this.makeMessage( 'error', this.errors[ i ] ) );
	}

	this.setAlignment( config.align );
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
 * Handle label mouse click events.
 *
 * @private
 * @param {jQuery.Event} e Mouse click event
 */
OO.ui.FieldLayout.prototype.onLabelClick = function () {
	this.fieldWidget.simulateLabelClick();
	return false;
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
 * @param {string} kind 'error' or 'notice'
 * @param {string|OO.ui.HtmlSnippet} text
 * @return {jQuery}
 */
OO.ui.FieldLayout.prototype.makeMessage = function ( kind, text ) {
	var $listItem, $icon, message;
	$listItem = $( '<li>' );
	if ( kind === 'error' ) {
		$icon = new OO.ui.IconWidget( { icon: 'alert', flags: [ 'warning' ] } ).$element;
	} else if ( kind === 'notice' ) {
		$icon = new OO.ui.IconWidget( { icon: 'info' } ).$element;
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
		// Reorder elements
		if ( value === 'inline' ) {
			this.$body.append( this.$field, this.$label );
		} else {
			this.$body.append( this.$label, this.$field );
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
	this.$button = $( '<div>' );
	this.$input = $( '<div>' );

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
 * please see the [OOjs UI documentation on MediaWiki][1].
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
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Layouts/Fields_and_Fieldsets
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

	if ( config.help ) {
		this.popupButtonWidget = new OO.ui.PopupButtonWidget( {
			classes: [ 'oo-ui-fieldsetLayout-help' ],
			framed: false,
			icon: 'info'
		} );

		this.popupButtonWidget.getPopup().$body.append(
			$( '<div>' )
				.text( config.help )
				.addClass( 'oo-ui-fieldsetLayout-help-content' )
		);
		this.$help = this.popupButtonWidget.$element;
	} else {
		this.$help = $( [] );
	}

	// Initialization
	this.$element
		.addClass( 'oo-ui-fieldsetLayout' )
		.prepend( this.$help, this.$icon, this.$label, this.$group );
	if ( Array.isArray( config.items ) ) {
		this.addItems( config.items );
	}
};

/* Setup */

OO.inheritClass( OO.ui.FieldsetLayout, OO.ui.Layout );
OO.mixinClass( OO.ui.FieldsetLayout, OO.ui.mixin.IconElement );
OO.mixinClass( OO.ui.FieldsetLayout, OO.ui.mixin.LabelElement );
OO.mixinClass( OO.ui.FieldsetLayout, OO.ui.mixin.GroupElement );

/**
 * FormLayouts are used to wrap {@link OO.ui.FieldsetLayout FieldsetLayouts} when you intend to use browser-based
 * form submission for the fields instead of handling them in JavaScript. Form layouts can be configured with an
 * HTML form action, an encoding type, and a method using the #action, #enctype, and #method configs, respectively.
 * See the [OOjs UI documentation on MediaWiki] [1] for more information and examples.
 *
 * Only widgets from the {@link OO.ui.InputWidget InputWidget} family support form submission. It
 * includes standard form elements like {@link OO.ui.CheckboxInputWidget checkboxes}, {@link
 * OO.ui.RadioInputWidget radio buttons} and {@link OO.ui.TextInputWidget text fields}, as well as
 * some fancier controls. Some controls have both regular and InputWidget variants, for example
 * OO.ui.DropdownWidget and OO.ui.DropdownInputWidget – only the latter support form submission and
 * often have simplified APIs to match the capabilities of HTML forms.
 * See the [OOjs UI Inputs documentation on MediaWiki] [2] for more information about InputWidgets.
 *
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Layouts/Forms
 * [2]: https://www.mediawiki.org/wiki/OOjs_UI/Widgets/Inputs
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
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.FormLayout.parent.call( this, config );

	// Mixin constructors
	OO.ui.mixin.GroupElement.call( this, $.extend( {}, config, { $group: this.$element } ) );

	// Events
	this.$element.on( 'submit', this.onFormSubmit.bind( this ) );

	// Make sure the action is safe
	if ( config.action !== undefined && !OO.ui.isSafeUrl( config.action ) ) {
		throw new Error( 'Potentially unsafe action provided: ' + config.action );
	}

	// Initialization
	this.$element
		.addClass( 'oo-ui-formLayout' )
		.attr( {
			method: config.method,
			action: config.action,
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
 * MenuLayouts combine a menu and a content {@link OO.ui.PanelLayout panel}. The menu is positioned relative to the content (after, before, top, or bottom)
 * and its size is customized with the #menuSize config. The content area will fill all remaining space.
 *
 *     @example
 *     var menuLayout = new OO.ui.MenuLayout( {
 *         position: 'top'
 *     } ),
 *         menuPanel = new OO.ui.PanelLayout( { padded: true, expanded: true, scrollable: true } ),
 *         contentPanel = new OO.ui.PanelLayout( { padded: true, expanded: true, scrollable: true } ),
 *         select = new OO.ui.SelectWidget( {
 *             items: [
 *                 new OO.ui.OptionWidget( {
 *                     data: 'before',
 *                     label: 'Before',
 *                 } ),
 *                 new OO.ui.OptionWidget( {
 *                     data: 'after',
 *                     label: 'After',
 *                 } ),
 *                 new OO.ui.OptionWidget( {
 *                     data: 'top',
 *                     label: 'Top',
 *                 } ),
 *                 new OO.ui.OptionWidget( {
 *                     data: 'bottom',
 *                     label: 'Bottom',
 *                 } )
 *              ]
 *         } ).on( 'select', function ( item ) {
 *            menuLayout.setMenuPosition( item.getData() );
 *         } );
 *
 *     menuLayout.$menu.append(
 *         menuPanel.$element.append( '<b>Menu panel</b>', select.$element )
 *     );
 *     menuLayout.$content.append(
 *         contentPanel.$element.append( '<b>Content panel</b>', '<p>Note that the menu is positioned relative to the content panel: top, bottom, after, before.</p>')
 *     );
 *     $( 'body' ).append( menuLayout.$element );
 *
 * If menu size needs to be overridden, it can be accomplished using CSS similar to the snippet
 * below. MenuLayout's CSS will override the appropriate values with 'auto' or '0' to display the
 * menu correctly. If `menuPosition` is known beforehand, CSS rules corresponding to other positions
 * may be omitted.
 *
 *     .oo-ui-menuLayout-menu {
 *         height: 200px;
 *         width: 200px;
 *     }
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
 * @cfg {boolean} [showMenu=true] Show menu
 * @cfg {string} [menuPosition='before'] Position of menu: `top`, `after`, `bottom` or `before`
 */
OO.ui.MenuLayout = function OoUiMenuLayout( config ) {
	// Configuration initialization
	config = $.extend( {
		showMenu: true,
		menuPosition: 'before'
	}, config );

	// Parent constructor
	OO.ui.MenuLayout.parent.call( this, config );

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
	this.$menu
		.addClass( 'oo-ui-menuLayout-menu' );
	this.$content.addClass( 'oo-ui-menuLayout-content' );
	this.$element
		.addClass( 'oo-ui-menuLayout' )
		.append( this.$content, this.$menu );
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
 */
OO.ui.MenuLayout.prototype.toggleMenu = function ( showMenu ) {
	showMenu = showMenu === undefined ? !this.showMenu : !!showMenu;

	if ( this.showMenu !== showMenu ) {
		this.showMenu = showMenu;
		this.$element
			.toggleClass( 'oo-ui-menuLayout-showMenu', this.showMenu )
			.toggleClass( 'oo-ui-menuLayout-hideMenu', !this.showMenu );
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
 * @throws {Error} If position value is not supported
 * @chainable
 */
OO.ui.MenuLayout.prototype.setMenuPosition = function ( position ) {
	this.$element.removeClass( 'oo-ui-menuLayout-' + this.menuPosition );
	this.menuPosition = position;
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
 *         this.$element.append( '<p>First page</p><p>(This booklet has an outline, displayed on the left)</p>' );
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
 *     booklet.addPages ( [ page1, page2 ] );
 *     $( 'body' ).append( booklet.$element );
 *
 * @class
 * @extends OO.ui.MenuLayout
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {boolean} [continuous=false] Show all pages, one after another
 * @cfg {boolean} [autoFocus=true] Focus on the first focusable element when a new page is displayed.
 * @cfg {boolean} [outlined=false] Show the outline. The outline is used to navigate through the pages of the booklet.
 * @cfg {boolean} [editable=false] Show controls for adding, removing and reordering pages
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
	this.stackLayout = new OO.ui.StackLayout( { continuous: !!config.continuous } );
	this.$content.append( this.stackLayout.$element );
	this.autoFocus = config.autoFocus === undefined || !!config.autoFocus;
	this.outlineVisible = false;
	this.outlined = !!config.outlined;
	if ( this.outlined ) {
		this.editable = !!config.editable;
		this.outlineControlsWidget = null;
		this.outlineSelectWidget = new OO.ui.OutlineSelectWidget();
		this.outlinePanel = new OO.ui.PanelLayout( { scrollable: true } );
		this.$menu.append( this.outlinePanel.$element );
		this.outlineVisible = true;
		if ( this.editable ) {
			this.outlineControlsWidget = new OO.ui.OutlineControlsWidget(
				this.outlineSelectWidget
			);
		}
	}
	this.toggleMenu( this.outlined );

	// Events
	this.stackLayout.connect( this, { set: 'onStackLayoutSet' } );
	if ( this.outlined ) {
		this.outlineSelectWidget.connect( this, { select: 'onOutlineSelectWidgetSelect' } );
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
 * A 'set' event is emitted when a page is {@link #setPage set} to be displayed by the booklet layout.
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
 * Handle stack layout set events.
 *
 * @private
 * @param {OO.ui.PanelLayout|null} page The page panel that is now the current panel
 */
OO.ui.BookletLayout.prototype.onStackLayoutSet = function ( page ) {
	var layout = this;
	if ( page ) {
		page.scrollElementIntoView( { complete: function () {
			if ( layout.autoFocus ) {
				layout.focus();
			}
		} } );
	}
};

/**
 * Focus the first input in the current page.
 *
 * If no page is selected, the first selectable page will be selected.
 * If the focus is already in an element on the current page, nothing will happen.
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
 */
OO.ui.BookletLayout.prototype.toggleOutline = function ( show ) {
	if ( this.outlined ) {
		show = show === undefined ? !this.outlineVisible : !!show;
		this.outlineVisible = show;
		this.toggleMenu( show );
	}

	return this;
};

/**
 * Get the page closest to the specified page.
 *
 * @param {OO.ui.PageLayout} page Page to use as a reference point
 * @return {OO.ui.PageLayout|null} Page closest to the specified page
 */
OO.ui.BookletLayout.prototype.getClosestPage = function ( page ) {
	var next, prev, level,
		pages = this.stackLayout.getItems(),
		index = pages.indexOf( page );

	if ( index !== -1 ) {
		next = pages[ index + 1 ];
		prev = pages[ index - 1 ];
		// Prefer adjacent pages at the same level
		if ( this.outlined ) {
			level = this.outlineSelectWidget.getItemFromData( page.getName() ).getLevel();
			if (
				prev &&
				level === this.outlineSelectWidget.getItemFromData( prev.getName() ).getLevel()
			) {
				return prev;
			}
			if (
				next &&
				level === this.outlineSelectWidget.getItemFromData( next.getName() ).getLevel()
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
 */
OO.ui.BookletLayout.prototype.removePages = function ( pages ) {
	var i, len, name, page,
		items = [];

	for ( i = 0, len = pages.length; i < len; i++ ) {
		page = pages[ i ];
		name = page.getName();
		delete this.pages[ name ];
		if ( this.outlined ) {
			items.push( this.outlineSelectWidget.getItemFromData( name ) );
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
			selectedItem = this.outlineSelectWidget.getSelectedItem();
			if ( selectedItem && selectedItem.getData() !== name ) {
				this.outlineSelectWidget.selectItemByData( name );
			}
		}
		if ( page ) {
			if ( previousPage ) {
				previousPage.setActive( false );
				// Blur anything focused if the next page doesn't have anything focusable.
				// This is not needed if the next page has something focusable (because once it is focused
				// this blur happens automatically). If the layout is non-continuous, this check is
				// meaningless because the next page is not visible yet and thus can't hold focus.
				if (
					this.autoFocus &&
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
				// This should not be necessary, since any inputs on the previous page should have been
				// blurred when it was hidden, but browsers are not very consistent about this.
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
 * Select the first selectable page.
 *
 * @chainable
 */
OO.ui.BookletLayout.prototype.selectFirstSelectablePage = function () {
	if ( !this.outlineSelectWidget.getSelectedItem() ) {
		this.outlineSelectWidget.selectItem( this.outlineSelectWidget.getFirstSelectableItem() );
	}

	return this;
};

/**
 * IndexLayouts contain {@link OO.ui.CardLayout card layouts} as well as
 * {@link OO.ui.TabSelectWidget tabs} that allow users to easily navigate through the cards and
 * select which one to display. By default, only one card is displayed at a time. When a user
 * navigates to a new card, the index layout automatically focuses on the first focusable element,
 * unless the default setting is changed.
 *
 * TODO: This class is similar to BookletLayout, we may want to refactor to reduce duplication
 *
 *     @example
 *     // Example of a IndexLayout that contains two CardLayouts.
 *
 *     function CardOneLayout( name, config ) {
 *         CardOneLayout.parent.call( this, name, config );
 *         this.$element.append( '<p>First card</p>' );
 *     }
 *     OO.inheritClass( CardOneLayout, OO.ui.CardLayout );
 *     CardOneLayout.prototype.setupTabItem = function () {
 *         this.tabItem.setLabel( 'Card one' );
 *     };
 *
 *     var card1 = new CardOneLayout( 'one' ),
 *         card2 = new CardLayout( 'two', { label: 'Card two' } );
 *
 *     card2.$element.append( '<p>Second card</p>' );
 *
 *     var index = new OO.ui.IndexLayout();
 *
 *     index.addCards ( [ card1, card2 ] );
 *     $( 'body' ).append( index.$element );
 *
 * @class
 * @extends OO.ui.MenuLayout
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {boolean} [continuous=false] Show all cards, one after another
 * @cfg {boolean} [expanded=true] Expand the content panel to fill the entire parent element.
 * @cfg {boolean} [autoFocus=true] Focus on the first focusable element when a new card is displayed.
 */
OO.ui.IndexLayout = function OoUiIndexLayout( config ) {
	// Configuration initialization
	config = $.extend( {}, config, { menuPosition: 'top' } );

	// Parent constructor
	OO.ui.IndexLayout.parent.call( this, config );

	// Properties
	this.currentCardName = null;
	this.cards = {};
	this.ignoreFocus = false;
	this.stackLayout = new OO.ui.StackLayout( {
		continuous: !!config.continuous,
		expanded: config.expanded
	} );
	this.$content.append( this.stackLayout.$element );
	this.autoFocus = config.autoFocus === undefined || !!config.autoFocus;

	this.tabSelectWidget = new OO.ui.TabSelectWidget();
	this.tabPanel = new OO.ui.PanelLayout();
	this.$menu.append( this.tabPanel.$element );

	this.toggleMenu( true );

	// Events
	this.stackLayout.connect( this, { set: 'onStackLayoutSet' } );
	this.tabSelectWidget.connect( this, { select: 'onTabSelectWidgetSelect' } );
	if ( this.autoFocus ) {
		// Event 'focus' does not bubble, but 'focusin' does
		this.stackLayout.$element.on( 'focusin', this.onStackLayoutFocus.bind( this ) );
	}

	// Initialization
	this.$element.addClass( 'oo-ui-indexLayout' );
	this.stackLayout.$element.addClass( 'oo-ui-indexLayout-stackLayout' );
	this.tabPanel.$element
		.addClass( 'oo-ui-indexLayout-tabPanel' )
		.append( this.tabSelectWidget.$element );
};

/* Setup */

OO.inheritClass( OO.ui.IndexLayout, OO.ui.MenuLayout );

/* Events */

/**
 * A 'set' event is emitted when a card is {@link #setCard set} to be displayed by the index layout.
 * @event set
 * @param {OO.ui.CardLayout} card Current card
 */

/**
 * An 'add' event is emitted when cards are {@link #addCards added} to the index layout.
 *
 * @event add
 * @param {OO.ui.CardLayout[]} card Added cards
 * @param {number} index Index cards were added at
 */

/**
 * A 'remove' event is emitted when cards are {@link #clearCards cleared} or
 * {@link #removeCards removed} from the index.
 *
 * @event remove
 * @param {OO.ui.CardLayout[]} cards Removed cards
 */

/* Methods */

/**
 * Handle stack layout focus.
 *
 * @private
 * @param {jQuery.Event} e Focusin event
 */
OO.ui.IndexLayout.prototype.onStackLayoutFocus = function ( e ) {
	var name, $target;

	// Find the card that an element was focused within
	$target = $( e.target ).closest( '.oo-ui-cardLayout' );
	for ( name in this.cards ) {
		// Check for card match, exclude current card to find only card changes
		if ( this.cards[ name ].$element[ 0 ] === $target[ 0 ] && name !== this.currentCardName ) {
			this.setCard( name );
			break;
		}
	}
};

/**
 * Handle stack layout set events.
 *
 * @private
 * @param {OO.ui.PanelLayout|null} card The card panel that is now the current panel
 */
OO.ui.IndexLayout.prototype.onStackLayoutSet = function ( card ) {
	var layout = this;
	if ( card ) {
		card.scrollElementIntoView( { complete: function () {
			if ( layout.autoFocus ) {
				layout.focus();
			}
		} } );
	}
};

/**
 * Focus the first input in the current card.
 *
 * If no card is selected, the first selectable card will be selected.
 * If the focus is already in an element on the current card, nothing will happen.
 * @param {number} [itemIndex] A specific item to focus on
 */
OO.ui.IndexLayout.prototype.focus = function ( itemIndex ) {
	var card,
		items = this.stackLayout.getItems();

	if ( itemIndex !== undefined && items[ itemIndex ] ) {
		card = items[ itemIndex ];
	} else {
		card = this.stackLayout.getCurrentItem();
	}

	if ( !card ) {
		this.selectFirstSelectableCard();
		card = this.stackLayout.getCurrentItem();
	}
	if ( !card ) {
		return;
	}
	// Only change the focus if is not already in the current page
	if ( !OO.ui.contains( card.$element[ 0 ], this.getElementDocument().activeElement, true ) ) {
		card.focus();
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
		this.setCard( item.getData() );
	}
};

/**
 * Get the card closest to the specified card.
 *
 * @param {OO.ui.CardLayout} card Card to use as a reference point
 * @return {OO.ui.CardLayout|null} Card closest to the specified card
 */
OO.ui.IndexLayout.prototype.getClosestCard = function ( card ) {
	var next, prev, level,
		cards = this.stackLayout.getItems(),
		index = cards.indexOf( card );

	if ( index !== -1 ) {
		next = cards[ index + 1 ];
		prev = cards[ index - 1 ];
		// Prefer adjacent cards at the same level
		level = this.tabSelectWidget.getItemFromData( card.getName() ).getLevel();
		if (
			prev &&
			level === this.tabSelectWidget.getItemFromData( prev.getName() ).getLevel()
		) {
			return prev;
		}
		if (
			next &&
			level === this.tabSelectWidget.getItemFromData( next.getName() ).getLevel()
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
 * Get a card by its symbolic name.
 *
 * @param {string} name Symbolic name of card
 * @return {OO.ui.CardLayout|undefined} Card, if found
 */
OO.ui.IndexLayout.prototype.getCard = function ( name ) {
	return this.cards[ name ];
};

/**
 * Get the current card.
 *
 * @return {OO.ui.CardLayout|undefined} Current card, if found
 */
OO.ui.IndexLayout.prototype.getCurrentCard = function () {
	var name = this.getCurrentCardName();
	return name ? this.getCard( name ) : undefined;
};

/**
 * Get the symbolic name of the current card.
 *
 * @return {string|null} Symbolic name of the current card
 */
OO.ui.IndexLayout.prototype.getCurrentCardName = function () {
	return this.currentCardName;
};

/**
 * Add cards to the index layout
 *
 * When cards are added with the same names as existing cards, the existing cards will be
 * automatically removed before the new cards are added.
 *
 * @param {OO.ui.CardLayout[]} cards Cards to add
 * @param {number} index Index of the insertion point
 * @fires add
 * @chainable
 */
OO.ui.IndexLayout.prototype.addCards = function ( cards, index ) {
	var i, len, name, card, item, currentIndex,
		stackLayoutCards = this.stackLayout.getItems(),
		remove = [],
		items = [];

	// Remove cards with same names
	for ( i = 0, len = cards.length; i < len; i++ ) {
		card = cards[ i ];
		name = card.getName();

		if ( Object.prototype.hasOwnProperty.call( this.cards, name ) ) {
			// Correct the insertion index
			currentIndex = stackLayoutCards.indexOf( this.cards[ name ] );
			if ( currentIndex !== -1 && currentIndex + 1 < index ) {
				index--;
			}
			remove.push( this.cards[ name ] );
		}
	}
	if ( remove.length ) {
		this.removeCards( remove );
	}

	// Add new cards
	for ( i = 0, len = cards.length; i < len; i++ ) {
		card = cards[ i ];
		name = card.getName();
		this.cards[ card.getName() ] = card;
		item = new OO.ui.TabOptionWidget( { data: name } );
		card.setTabItem( item );
		items.push( item );
	}

	if ( items.length ) {
		this.tabSelectWidget.addItems( items, index );
		this.selectFirstSelectableCard();
	}
	this.stackLayout.addItems( cards, index );
	this.emit( 'add', cards, index );

	return this;
};

/**
 * Remove the specified cards from the index layout.
 *
 * To remove all cards from the index, you may wish to use the #clearCards method instead.
 *
 * @param {OO.ui.CardLayout[]} cards An array of cards to remove
 * @fires remove
 * @chainable
 */
OO.ui.IndexLayout.prototype.removeCards = function ( cards ) {
	var i, len, name, card,
		items = [];

	for ( i = 0, len = cards.length; i < len; i++ ) {
		card = cards[ i ];
		name = card.getName();
		delete this.cards[ name ];
		items.push( this.tabSelectWidget.getItemFromData( name ) );
		card.setTabItem( null );
	}
	if ( items.length ) {
		this.tabSelectWidget.removeItems( items );
		this.selectFirstSelectableCard();
	}
	this.stackLayout.removeItems( cards );
	this.emit( 'remove', cards );

	return this;
};

/**
 * Clear all cards from the index layout.
 *
 * To remove only a subset of cards from the index, use the #removeCards method.
 *
 * @fires remove
 * @chainable
 */
OO.ui.IndexLayout.prototype.clearCards = function () {
	var i, len,
		cards = this.stackLayout.getItems();

	this.cards = {};
	this.currentCardName = null;
	this.tabSelectWidget.clearItems();
	for ( i = 0, len = cards.length; i < len; i++ ) {
		cards[ i ].setTabItem( null );
	}
	this.stackLayout.clearItems();

	this.emit( 'remove', cards );

	return this;
};

/**
 * Set the current card by symbolic name.
 *
 * @fires set
 * @param {string} name Symbolic name of card
 */
OO.ui.IndexLayout.prototype.setCard = function ( name ) {
	var selectedItem,
		$focused,
		card = this.cards[ name ],
		previousCard = this.currentCardName && this.cards[ this.currentCardName ];

	if ( name !== this.currentCardName ) {
		selectedItem = this.tabSelectWidget.getSelectedItem();
		if ( selectedItem && selectedItem.getData() !== name ) {
			this.tabSelectWidget.selectItemByData( name );
		}
		if ( card ) {
			if ( previousCard ) {
				previousCard.setActive( false );
				// Blur anything focused if the next card doesn't have anything focusable.
				// This is not needed if the next card has something focusable (because once it is focused
				// this blur happens automatically). If the layout is non-continuous, this check is
				// meaningless because the next card is not visible yet and thus can't hold focus.
				if (
					this.autoFocus &&
					this.stackLayout.continuous &&
					OO.ui.findFocusable( card.$element ).length !== 0
				) {
					$focused = previousCard.$element.find( ':focus' );
					if ( $focused.length ) {
						$focused[ 0 ].blur();
					}
				}
			}
			this.currentCardName = name;
			card.setActive( true );
			this.stackLayout.setItem( card );
			if ( !this.stackLayout.continuous && previousCard ) {
				// This should not be necessary, since any inputs on the previous card should have been
				// blurred when it was hidden, but browsers are not very consistent about this.
				$focused = previousCard.$element.find( ':focus' );
				if ( $focused.length ) {
					$focused[ 0 ].blur();
				}
			}
			this.emit( 'set', card );
		}
	}
};

/**
 * Select the first selectable card.
 *
 * @chainable
 */
OO.ui.IndexLayout.prototype.selectFirstSelectableCard = function () {
	if ( !this.tabSelectWidget.getSelectedItem() ) {
		this.tabSelectWidget.selectItem( this.tabSelectWidget.getFirstSelectableItem() );
	}

	return this;
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
 * CardLayouts are used within {@link OO.ui.IndexLayout index layouts} to create cards that users can select and display
 * from the index's optional {@link OO.ui.TabSelectWidget tab} navigation. Cards are usually not instantiated directly,
 * rather extended to include the required content and functionality.
 *
 * Each card must have a unique symbolic name, which is passed to the constructor. In addition, the card's tab
 * item is customized (with a label) using the #setupTabItem method. See
 * {@link OO.ui.IndexLayout IndexLayout} for an example.
 *
 * @class
 * @extends OO.ui.PanelLayout
 *
 * @constructor
 * @param {string} name Unique symbolic name of card
 * @param {Object} [config] Configuration options
 * @cfg {jQuery|string|Function|OO.ui.HtmlSnippet} [label] Label for card's tab
 */
OO.ui.CardLayout = function OoUiCardLayout( name, config ) {
	// Allow passing positional parameters inside the config object
	if ( OO.isPlainObject( name ) && config === undefined ) {
		config = name;
		name = config.name;
	}

	// Configuration initialization
	config = $.extend( { scrollable: true }, config );

	// Parent constructor
	OO.ui.CardLayout.parent.call( this, config );

	// Properties
	this.name = name;
	this.label = config.label;
	this.tabItem = null;
	this.active = false;

	// Initialization
	this.$element.addClass( 'oo-ui-cardLayout' );
};

/* Setup */

OO.inheritClass( OO.ui.CardLayout, OO.ui.PanelLayout );

/* Events */

/**
 * An 'active' event is emitted when the card becomes active. Cards become active when they are
 * shown in a index layout that is configured to display only one card at a time.
 *
 * @event active
 * @param {boolean} active Card is active
 */

/* Methods */

/**
 * Get the symbolic name of the card.
 *
 * @return {string} Symbolic name of card
 */
OO.ui.CardLayout.prototype.getName = function () {
	return this.name;
};

/**
 * Check if card is active.
 *
 * Cards become active when they are shown in a {@link OO.ui.IndexLayout index layout} that is configured to display
 * only one card at a time. Additional CSS is applied to the card's tab item to reflect the active state.
 *
 * @return {boolean} Card is active
 */
OO.ui.CardLayout.prototype.isActive = function () {
	return this.active;
};

/**
 * Get tab item.
 *
 * The tab item allows users to access the card from the index's tab
 * navigation. The tab item itself can be customized (with a label, level, etc.) using the #setupTabItem method.
 *
 * @return {OO.ui.TabOptionWidget|null} Tab option widget
 */
OO.ui.CardLayout.prototype.getTabItem = function () {
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
 */
OO.ui.CardLayout.prototype.setTabItem = function ( tabItem ) {
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
 */
OO.ui.CardLayout.prototype.setupTabItem = function () {
	if ( this.label ) {
		this.tabItem.setLabel( this.label );
	}
	return this;
};

/**
 * Set the card to its 'active' state.
 *
 * Cards become active when they are shown in a index layout that is configured to display only one card at a time. Additional
 * CSS is applied to the tab item to reflect the card's active state. Outside of the index
 * context, setting the active state on a card does nothing.
 *
 * @param {boolean} value Card is active
 * @fires active
 */
OO.ui.CardLayout.prototype.setActive = function ( active ) {
	active = !!active;

	if ( active !== this.active ) {
		this.active = active;
		this.$element.toggleClass( 'oo-ui-cardLayout-active', this.active );
		this.emit( 'active', this.active );
	}
};

/**
 * PageLayouts are used within {@link OO.ui.BookletLayout booklet layouts} to create pages that users can select and display
 * from the booklet's optional {@link OO.ui.OutlineSelectWidget outline} navigation. Pages are usually not instantiated directly,
 * rather extended to include the required content and functionality.
 *
 * Each page must have a unique symbolic name, which is passed to the constructor. In addition, the page's outline
 * item is customized (with a label, outline level, etc.) using the #setupOutlineItem method. See
 * {@link OO.ui.BookletLayout BookletLayout} for an example.
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
 * Pages become active when they are shown in a {@link OO.ui.BookletLayout booklet layout} that is configured to display
 * only one page at a time. Additional CSS is applied to the page's outline item to reflect the active state.
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
 * navigation. The outline item itself can be customized (with a label, level, etc.) using the #setupOutlineItem method.
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
 * or `null` to clear the outline item. To customize the outline item itself (e.g., to set a label or outline
 * level), use #setupOutlineItem instead of this method.
 *
 * @param {OO.ui.OutlineOptionWidget|null} outlineItem Outline option widget, null to clear
 * @chainable
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
 * Use this method to customize the outline item (e.g., to add a label or outline level). To set or unset
 * the outline item itself (with an {@link OO.ui.OutlineOptionWidget outline option} or `null`), use
 * the #setOutlineItem method instead.
 *
 * @param {OO.ui.OutlineOptionWidget} outlineItem Outline option widget to set up
 * @chainable
 */
OO.ui.PageLayout.prototype.setupOutlineItem = function () {
	return this;
};

/**
 * Set the page to its 'active' state.
 *
 * Pages become active when they are shown in a booklet layout that is configured to display only one page at a time. Additional
 * CSS is applied to the outline item to reflect the page's active state. Outside of the booklet
 * context, setting the active state on a page does nothing.
 *
 * @param {boolean} value Page is active
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
 * StackLayouts contain a series of {@link OO.ui.PanelLayout panel layouts}. By default, only one panel is displayed
 * at a time, though the stack layout can also be configured to show all contained panels, one after another,
 * by setting the #continuous option to 'true'.
 *
 *     @example
 *     // A stack layout with two panels, configured to be displayed continously
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
 *     $( 'body' ).append( myStack.$element );
 *
 * @class
 * @extends OO.ui.PanelLayout
 * @mixins OO.ui.mixin.GroupElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {boolean} [continuous=false] Show all panels, one after another. By default, only one panel is displayed at a time.
 * @cfg {OO.ui.Layout[]} [items] Panel layouts to add to the stack layout.
 */
OO.ui.StackLayout = function OoUiStackLayout( config ) {
	// Configuration initialization
	config = $.extend( { scrollable: true }, config );

	// Parent constructor
	OO.ui.StackLayout.parent.call( this, config );

	// Mixin constructors
	OO.ui.mixin.GroupElement.call( this, $.extend( {}, config, { $group: this.$element } ) );

	// Properties
	this.currentItem = null;
	this.continuous = !!config.continuous;

	// Initialization
	this.$element.addClass( 'oo-ui-stackLayout' );
	if ( this.continuous ) {
		this.$element.addClass( 'oo-ui-stackLayout-continuous' );
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

/* Methods */

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
 * Panels will be added to the end of the stack layout array unless the optional index parameter specifies a different
 * insertion point. Adding a panel that is already in the stack will move it to the end of the array or the point specified
 * by the index.
 *
 * @param {OO.ui.Layout[]} items Panels to add
 * @param {number} [index] Index of the insertion point
 * @chainable
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
 * Removed panels are detached from the DOM, not removed, so that they may be reused. To remove all panels,
 * you may wish to use the #clearItems method instead.
 *
 * @param {OO.ui.Layout[]} items Panels to remove
 * @chainable
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
			}
		}
		if ( selectedItem ) {
			selectedItem.$element.removeClass( 'oo-ui-element-hidden' );
		}
	}
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

/**
 * BarToolGroups are one of three types of {@link OO.ui.ToolGroup toolgroups} that are used to
 * create {@link OO.ui.Toolbar toolbars} (the other types of groups are {@link OO.ui.MenuToolGroup MenuToolGroup}
 * and {@link OO.ui.ListToolGroup ListToolGroup}). The {@link OO.ui.Tool tools} in a BarToolGroup are
 * displayed by icon in a single row. The title of the tool is displayed when users move the mouse over
 * the tool.
 *
 * BarToolGroups are created by a {@link OO.ui.ToolGroupFactory tool group factory} when the toolbar is
 * set up.
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
 *     function PictureTool() {
 *         PictureTool.parent.apply( this, arguments );
 *     }
 *     OO.inheritClass( PictureTool, OO.ui.Tool );
 *     // Each tool must have a 'name' (used as an internal identifier, see later) and at least one
 *     // of 'icon' and 'title' (displayed icon and text).
 *     PictureTool.static.name = 'picture';
 *     PictureTool.static.icon = 'picture';
 *     PictureTool.static.title = 'Insert picture';
 *     // Defines the action that will happen when this tool is selected (clicked).
 *     PictureTool.prototype.onSelect = function () {
 *         $area.text( 'Picture tool clicked!' );
 *         // Never display this tool as "active" (selected).
 *         this.setActive( false );
 *     };
 *     // Make this tool available in our toolFactory and thus our toolbar
 *     toolFactory.register( PictureTool );
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
 *             include: [ 'picture', 'help' ]
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
 *     $( 'body' ).append( frame.$element );
 *
 *     // Here is where the toolbar is actually built. This must be done after inserting it into the
 *     // document.
 *     toolbar.initialize();
 *
 * For more information about how to add tools to a bar tool group, please see {@link OO.ui.ToolGroup toolgroup}.
 * For more information about toolbars in general, please see the [OOjs UI documentation on MediaWiki][1].
 *
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Toolbars
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
};

/* Setup */

OO.inheritClass( OO.ui.BarToolGroup, OO.ui.ToolGroup );

/* Static Properties */

OO.ui.BarToolGroup.static.titleTooltips = true;

OO.ui.BarToolGroup.static.accelTooltips = true;

OO.ui.BarToolGroup.static.name = 'bar';

/**
 * PopupToolGroup is an abstract base class used by both {@link OO.ui.MenuToolGroup MenuToolGroup}
 * and {@link OO.ui.ListToolGroup ListToolGroup} to provide a popup--an overlaid menu or list of tools with an
 * optional icon and label. This class can be used for other base classes that also use this functionality.
 *
 * @abstract
 * @class
 * @extends OO.ui.ToolGroup
 * @mixins OO.ui.mixin.IconElement
 * @mixins OO.ui.mixin.IndicatorElement
 * @mixins OO.ui.mixin.LabelElement
 * @mixins OO.ui.mixin.TitledElement
 * @mixins OO.ui.mixin.ClippableElement
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
	config = config || {};

	// Parent constructor
	OO.ui.PopupToolGroup.parent.call( this, toolbar, config );

	// Properties
	this.active = false;
	this.dragging = false;
	this.onBlurHandler = this.onBlur.bind( this );
	this.$handle = $( '<span>' );

	// Mixin constructors
	OO.ui.mixin.IconElement.call( this, config );
	OO.ui.mixin.IndicatorElement.call( this, config );
	OO.ui.mixin.LabelElement.call( this, config );
	OO.ui.mixin.TitledElement.call( this, config );
	OO.ui.mixin.ClippableElement.call( this, $.extend( {}, config, { $clippable: this.$group } ) );
	OO.ui.mixin.TabIndexedElement.call( this, $.extend( {}, config, { $tabIndexed: this.$handle } ) );

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
};

/* Setup */

OO.inheritClass( OO.ui.PopupToolGroup, OO.ui.ToolGroup );
OO.mixinClass( OO.ui.PopupToolGroup, OO.ui.mixin.IconElement );
OO.mixinClass( OO.ui.PopupToolGroup, OO.ui.mixin.IndicatorElement );
OO.mixinClass( OO.ui.PopupToolGroup, OO.ui.mixin.LabelElement );
OO.mixinClass( OO.ui.PopupToolGroup, OO.ui.mixin.TitledElement );
OO.mixinClass( OO.ui.PopupToolGroup, OO.ui.mixin.ClippableElement );
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
 * Handle focus being lost.
 *
 * The event is actually generated from a mouseup/keyup, so it is not a normal blur event object.
 *
 * @protected
 * @param {jQuery.Event} e Mouse up or key up event
 */
OO.ui.PopupToolGroup.prototype.onBlur = function ( e ) {
	// Only deactivate when clicking outside the dropdown element
	if ( $( e.target ).closest( '.oo-ui-popupToolGroup' )[ 0 ] !== this.$element[ 0 ] ) {
		this.setActive( false );
	}
};

/**
 * @inheritdoc
 */
OO.ui.PopupToolGroup.prototype.onMouseKeyUp = function ( e ) {
	// Only close toolgroup when a tool was actually selected
	if (
		!this.isDisabled() && this.pressed && this.pressed === this.getTargetTool( e ) &&
		( e.which === 1 || e.which === OO.ui.Keys.SPACE || e.which === OO.ui.Keys.ENTER )
	) {
		this.setActive( false );
	}
	return OO.ui.PopupToolGroup.parent.prototype.onMouseKeyUp.call( this, e );
};

/**
 * Handle mouse up and key up events.
 *
 * @protected
 * @param {jQuery.Event} e Mouse up or key up event
 */
OO.ui.PopupToolGroup.prototype.onHandleMouseKeyUp = function ( e ) {
	if (
		!this.isDisabled() &&
		( e.which === 1 || e.which === OO.ui.Keys.SPACE || e.which === OO.ui.Keys.ENTER )
	) {
		return false;
	}
};

/**
 * Handle mouse down and key down events.
 *
 * @protected
 * @param {jQuery.Event} e Mouse down or key down event
 */
OO.ui.PopupToolGroup.prototype.onHandleMouseKeyDown = function ( e ) {
	if (
		!this.isDisabled() &&
		( e.which === 1 || e.which === OO.ui.Keys.SPACE || e.which === OO.ui.Keys.ENTER )
	) {
		this.setActive( !this.active );
		return false;
	}
};

/**
 * Switch into 'active' mode.
 *
 * When active, the popup is visible. A mouseup event anywhere in the document will trigger
 * deactivation.
 */
OO.ui.PopupToolGroup.prototype.setActive = function ( value ) {
	var containerWidth, containerLeft;
	value = !!value;
	if ( this.active !== value ) {
		this.active = value;
		if ( value ) {
			OO.ui.addCaptureEventListener( this.getElementDocument(), 'mouseup', this.onBlurHandler );
			OO.ui.addCaptureEventListener( this.getElementDocument(), 'keyup', this.onBlurHandler );

			this.$clippable.css( 'left', '' );
			// Try anchoring the popup to the left first
			this.$element.addClass( 'oo-ui-popupToolGroup-active oo-ui-popupToolGroup-left' );
			this.toggleClipping( true );
			if ( this.isClippedHorizontally() ) {
				// Anchoring to the left caused the popup to clip, so anchor it to the right instead
				this.toggleClipping( false );
				this.$element
					.removeClass( 'oo-ui-popupToolGroup-left' )
					.addClass( 'oo-ui-popupToolGroup-right' );
				this.toggleClipping( true );
			}
			if ( this.isClippedHorizontally() ) {
				// Anchoring to the right also caused the popup to clip, so just make it fill the container
				containerWidth = this.$clippableScrollableContainer.width();
				containerLeft = this.$clippableScrollableContainer.offset().left;

				this.toggleClipping( false );
				this.$element.removeClass( 'oo-ui-popupToolGroup-right' );

				this.$clippable.css( {
					left: -( this.$element.offset().left - containerLeft ),
					width: containerWidth
				} );
			}
		} else {
			OO.ui.removeCaptureEventListener( this.getElementDocument(), 'mouseup', this.onBlurHandler );
			OO.ui.removeCaptureEventListener( this.getElementDocument(), 'keyup', this.onBlurHandler );
			this.$element.removeClass(
				'oo-ui-popupToolGroup-active oo-ui-popupToolGroup-left  oo-ui-popupToolGroup-right'
			);
			this.toggleClipping( false );
		}
	}
};

/**
 * ListToolGroups are one of three types of {@link OO.ui.ToolGroup toolgroups} that are used to
 * create {@link OO.ui.Toolbar toolbars} (the other types of groups are {@link OO.ui.MenuToolGroup MenuToolGroup}
 * and {@link OO.ui.BarToolGroup BarToolGroup}). The {@link OO.ui.Tool tools} in a ListToolGroup are displayed
 * by label in a dropdown menu. The title of the tool is used as the label text. The menu itself can be configured
 * with a label, icon, indicator, header, and title.
 *
 * ListToolGroups can be configured to be expanded and collapsed. Collapsed lists will have a ‘More’ option that
 * users can select to see the full list of tools. If a collapsed toolgroup is expanded, a ‘Fewer’ option permits
 * users to collapse the list again.
 *
 * ListToolGroups are created by a {@link OO.ui.ToolGroupFactory toolgroup factory} when the toolbar is set up. The factory
 * requires the ListToolGroup's symbolic name, 'list', which is specified along with the other configurations. For more
 * information about how to add tools to a ListToolGroup, please see {@link OO.ui.ToolGroup toolgroup}.
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
 *     toolFactory.register( SettingsTool );
 *     // Register two more tools, nothing interesting here
 *     function StuffTool() {
 *         StuffTool.parent.apply( this, arguments );
 *     }
 *     OO.inheritClass( StuffTool, OO.ui.Tool );
 *     StuffTool.static.name = 'stuff';
 *     StuffTool.static.icon = 'ellipsis';
 *     StuffTool.static.title = 'Change the world';
 *     StuffTool.prototype.onSelect = function () {
 *         this.setActive( false );
 *     };
 *     toolFactory.register( StuffTool );
 *     toolbar.setup( [
 *         {
 *             // Configurations for list toolgroup.
 *             type: 'list',
 *             label: 'ListToolGroup',
 *             indicator: 'down',
 *             icon: 'picture',
 *             title: 'This is the title, displayed when user moves the mouse over the list toolgroup',
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
 *     $( 'body' ).append( frame.$element );
 *     // Build the toolbar. This must be done after the toolbar has been appended to the document.
 *     toolbar.initialize();
 *
 * For more information about toolbars in general, please see the [OOjs UI documentation on MediaWiki][1].
 *
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Toolbars
 *
 * @class
 * @extends OO.ui.PopupToolGroup
 *
 * @constructor
 * @param {OO.ui.Toolbar} toolbar
 * @param {Object} [config] Configuration options
 * @cfg {Array} [allowCollapse] Allow the specified tools to be collapsed. By default, collapsible tools
 *  will only be displayed if users click the ‘More’ option displayed at the bottom of the list. If
 *  the list is expanded, a ‘Fewer’ option permits users to collapse the list again. Any tools that
 *  are included in the toolgroup, but are not designated as collapsible, will always be displayed.
 *  To open a collapsible list in its expanded state, set #expanded to 'true'.
 * @cfg {Array} [forceExpand] Expand the specified tools. All other tools will be designated as collapsible.
 *  Unless #expanded is set to true, the collapsible tools will be collapsed when the list is first opened.
 * @cfg {boolean} [expanded=false] Expand collapsible tools. This config is only relevant if tools have
 *  been designated as collapsible. When expanded is set to true, all tools in the group will be displayed
 *  when the list is first opened. Users can collapse the list with a ‘Fewer’ option at the bottom.
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
};

/* Setup */

OO.inheritClass( OO.ui.ListToolGroup, OO.ui.PopupToolGroup );

/* Static Properties */

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
		$( e.target ).closest( '.oo-ui-tool-name-more-fewer' ).length &&
		( e.which === 1 || e.which === OO.ui.Keys.SPACE || e.which === OO.ui.Keys.ENTER )
	) {
		// HACK: Prevent the popup list from being hidden. Skip the PopupToolGroup implementation (which
		// hides the popup list when a tool is selected) and call ToolGroup's implementation directly.
		return OO.ui.ListToolGroup.parent.parent.prototype.onMouseKeyUp.call( this, e );
	} else {
		return OO.ui.ListToolGroup.parent.prototype.onMouseKeyUp.call( this, e );
	}
};

OO.ui.ListToolGroup.prototype.updateCollapsibleState = function () {
	var i, len;

	this.getExpandCollapseTool()
		.setIcon( this.expanded ? 'collapse' : 'expand' )
		.setTitle( OO.ui.msg( this.expanded ? 'ooui-toolgroup-collapse' : 'ooui-toolgroup-expand' ) );

	for ( i = 0, len = this.collapsibleTools.length; i < len; i++ ) {
		this.collapsibleTools[ i ].toggle( this.expanded );
	}
};

/**
 * MenuToolGroups are one of three types of {@link OO.ui.ToolGroup toolgroups} that are used to
 * create {@link OO.ui.Toolbar toolbars} (the other types of groups are {@link OO.ui.BarToolGroup BarToolGroup}
 * and {@link OO.ui.ListToolGroup ListToolGroup}). MenuToolGroups contain selectable {@link OO.ui.Tool tools},
 * which are displayed by label in a dropdown menu. The tool's title is used as the label text, and the
 * menu label is updated to reflect which tool or tools are currently selected. If no tools are selected,
 * the menu label is empty. The menu can be configured with an indicator, icon, title, and/or header.
 *
 * MenuToolGroups are created by a {@link OO.ui.ToolGroupFactory tool group factory} when the toolbar
 * is set up. Note that all tools must define an {@link OO.ui.Tool#onUpdateState onUpdateState} method if
 * a MenuToolGroup is used.
 *
 *     @example
 *     // Example of a MenuToolGroup
 *     var toolFactory = new OO.ui.ToolFactory();
 *     var toolGroupFactory = new OO.ui.ToolGroupFactory();
 *     var toolbar = new OO.ui.Toolbar( toolFactory, toolGroupFactory );
 *
 *     // We will be placing status text in this element when tools are used
 *     var $area = $( '<p>' ).text( 'An example of a MenuToolGroup. Select a tool from the dropdown menu.' );
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
 *     SettingsTool.prototype.onUpdateState = function () {
 *     };
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
 *     StuffTool.prototype.onUpdateState = function () {
 *     };
 *     toolFactory.register( StuffTool );
 *
 *     // Finally define which tools and in what order appear in the toolbar. Each tool may only be
 *     // used once (but not all defined tools must be used).
 *     toolbar.setup( [
 *         {
 *             type: 'menu',
 *             header: 'This is the (optional) header',
 *             title: 'This is the (optional) title',
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
 *     $( 'body' ).append( frame.$element );
 *
 *     // Here is where the toolbar is actually built. This must be done after inserting it into the
 *     // document.
 *     toolbar.initialize();
 *     toolbar.emit( 'updateState' );
 *
 * For more information about how to add tools to a MenuToolGroup, please see {@link OO.ui.ToolGroup toolgroup}.
 * For more information about toolbars in general, please see the [OOjs UI documentation on MediaWiki] [1].
 *
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Toolbars
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
	this.toolbar.connect( this, { updateState: 'onUpdateState' } );

	// Initialization
	this.$element.addClass( 'oo-ui-menuToolGroup' );
};

/* Setup */

OO.inheritClass( OO.ui.MenuToolGroup, OO.ui.PopupToolGroup );

/* Static Properties */

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

/**
 * Popup tools open a popup window when they are selected from the {@link OO.ui.Toolbar toolbar}. Each popup tool is configured
 * with a static name, title, and icon, as well with as any popup configurations. Unlike other tools, popup tools do not require that developers specify
 * an #onSelect or #onUpdateState method, as these methods have been implemented already.
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
 * For an example of a toolbar that contains a popup tool, see {@link OO.ui.Toolbar toolbars}. For more information about
 * toolbars in genreral, please see the [OOjs UI documentation on MediaWiki][1].
 *
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Toolbars
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

	// Initialization
	this.$element
		.addClass( 'oo-ui-popupTool' )
		.append( this.popup.$element );
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
	this.setActive( false );
	return false;
};

/**
 * Handle the toolbar state being updated.
 *
 * @inheritdoc
 */
OO.ui.PopupTool.prototype.onUpdateState = function () {
	this.setActive( false );
};

/**
 * A ToolGroupTool is a special sort of tool that can contain other {@link OO.ui.Tool tools}
 * and {@link OO.ui.ToolGroup toolgroups}. The ToolGroupTool was specifically designed to be used
 * inside a {@link OO.ui.BarToolGroup bar} toolgroup to provide access to additional tools from
 * the bar item. Included tools will be displayed in a dropdown {@link OO.ui.ListToolGroup list}
 * when the ToolGroupTool is selected.
 *
 *     // Example: ToolGroupTool with two nested tools, 'setting1' and 'setting2', defined elsewhere.
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
 * For more information, please see the [OOjs UI documentation on MediaWiki][1].
 *
 * Please note that this implementation is subject to change per [T74159] [2].
 *
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Toolbars#ToolGroupTool
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
	this.innerToolGroup.connect( this, { disable: 'onToolGroupDisable' } );

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
 * @param {Object.<string,Array>} group Toolgroup configuration. Please see {@link OO.ui.ToolGroup toolgroup} for
 *  more information.
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
 * Mixin for OO.ui.Widget subclasses to provide OO.ui.mixin.GroupElement.
 *
 * Use together with OO.ui.mixin.ItemWidget to make disabled state inheritable.
 *
 * @private
 * @abstract
 * @class
 * @extends OO.ui.mixin.GroupElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 */
OO.ui.mixin.GroupWidget = function OoUiMixinGroupWidget( config ) {
	// Parent constructor
	OO.ui.mixin.GroupWidget.parent.call( this, config );
};

/* Setup */

OO.inheritClass( OO.ui.mixin.GroupWidget, OO.ui.mixin.GroupElement );

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
 * OutlineControlsWidget is a set of controls for an {@link OO.ui.OutlineSelectWidget outline select widget}.
 * Controls include moving items up and down, removing items, and adding different kinds of items.
 *
 * **Currently, this class is only used by {@link OO.ui.BookletLayout booklet layouts}.**
 *
 * @class
 * @extends OO.ui.Widget
 * @mixins OO.ui.mixin.GroupElement
 * @mixins OO.ui.mixin.IconElement
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
	config = $.extend( { icon: 'add' }, config );

	// Parent constructor
	OO.ui.OutlineControlsWidget.parent.call( this, config );

	// Mixin constructors
	OO.ui.mixin.GroupElement.call( this, config );
	OO.ui.mixin.IconElement.call( this, config );

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
		icon: 'remove',
		title: OO.ui.msg( 'ooui-outline-control-remove' )
	} );
	this.abilities = { move: true, remove: true };

	// Events
	outline.connect( this, {
		select: 'onOutlineChange',
		add: 'onOutlineChange',
		remove: 'onOutlineChange'
	} );
	this.upButton.connect( this, { click: [ 'emit', 'move', -1 ] } );
	this.downButton.connect( this, { click: [ 'emit', 'move', 1 ] } );
	this.removeButton.connect( this, { click: [ 'emit', 'remove' ] } );

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
OO.mixinClass( OO.ui.OutlineControlsWidget, OO.ui.mixin.IconElement );

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
 * @private
 * Handle outline change events.
 */
OO.ui.OutlineControlsWidget.prototype.onOutlineChange = function () {
	var i, len, firstMovable, lastMovable,
		items = this.outline.getItems(),
		selectedItem = this.outline.getSelectedItem(),
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
 * ToggleWidget implements basic behavior of widgets with an on/off state.
 * Please see OO.ui.ToggleButtonWidget and OO.ui.ToggleSwitchWidget for examples.
 *
 * @abstract
 * @class
 * @extends OO.ui.Widget
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

	// Properties
	this.value = null;

	// Initialization
	this.$element.addClass( 'oo-ui-toggleWidget' );
	this.setValue( !!config.value );
};

/* Setup */

OO.inheritClass( OO.ui.ToggleWidget, OO.ui.Widget );

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
 * Set the state of the toggle: `true` for 'on', `false' for 'off'.
 *
 * @param {boolean} value The state of the toggle
 * @fires change
 * @chainable
 */
OO.ui.ToggleWidget.prototype.setValue = function ( value ) {
	value = !!value;
	if ( this.value !== value ) {
		this.value = value;
		this.emit( 'change', value );
		this.$element.toggleClass( 'oo-ui-toggleWidget-on', value );
		this.$element.toggleClass( 'oo-ui-toggleWidget-off', !value );
		this.$element.attr( 'aria-checked', value.toString() );
	}
	return this;
};

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

/**
 * ButtonWidget is a generic widget for buttons. A wide variety of looks,
 * feels, and functionality can be customized via the class’s configuration options
 * and methods. Please see the [OOjs UI documentation on MediaWiki] [1] for more information
 * and examples.
 *
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Widgets/Buttons_and_Switches
 *
 *     @example
 *     // A button widget
 *     var button = new OO.ui.ButtonWidget( {
 *         label: 'Button with Icon',
 *         icon: 'remove',
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

/* Methods */

/**
 * @inheritdoc
 */
OO.ui.ButtonWidget.prototype.onMouseDown = function ( e ) {
	if ( !this.isDisabled() ) {
		// Remove the tab-index while the button is down to prevent the button from stealing focus
		this.$button.removeAttr( 'tabindex' );
	}

	return OO.ui.mixin.ButtonElement.prototype.onMouseDown.call( this, e );
};

/**
 * @inheritdoc
 */
OO.ui.ButtonWidget.prototype.onMouseUp = function ( e ) {
	if ( !this.isDisabled() ) {
		// Restore the tab-index after the button is up to restore the button's accessibility
		this.$button.attr( 'tabindex', this.tabIndex );
	}

	return OO.ui.mixin.ButtonElement.prototype.onMouseUp.call( this, e );
};

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
	if ( href !== null ) {
		if ( !OO.ui.isSafeUrl( href ) ) {
			throw new Error( 'Potentially unsafe href provided: ' + href );
		}

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

/**
 * An ActionWidget is a {@link OO.ui.ButtonWidget button widget} that executes an action.
 * Action widgets are used with OO.ui.ActionSet, which manages the behavior and availability
 * of the actions.
 *
 * Both actions and action sets are primarily used with {@link OO.ui.Dialog Dialogs}.
 * Please see the [OOjs UI documentation on MediaWiki] [1] for more information
 * and examples.
 *
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Windows/Process_Dialogs#Action_sets
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

/* Events */

/**
 * A resize event is emitted when the size of the widget changes.
 *
 * @event resize
 */

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
 * Only actions that are configured to be avaiable in the current mode will be visible. All other actions
 * are hidden.
 *
 * @return {string[]}
 */
OO.ui.ActionWidget.prototype.getModes = function () {
	return this.modes.slice();
};

/**
 * Emit a resize event if the size has changed.
 *
 * @private
 * @chainable
 */
OO.ui.ActionWidget.prototype.propagateResize = function () {
	var width, height;

	if ( this.isElementAttached() ) {
		width = this.$element.width();
		height = this.$element.height();

		if ( width !== this.width || height !== this.height ) {
			this.width = width;
			this.height = height;
			this.emit( 'resize' );
		}
	}

	return this;
};

/**
 * @inheritdoc
 */
OO.ui.ActionWidget.prototype.setIcon = function () {
	// Mixin method
	OO.ui.mixin.IconElement.prototype.setIcon.apply( this, arguments );
	this.propagateResize();

	return this;
};

/**
 * @inheritdoc
 */
OO.ui.ActionWidget.prototype.setLabel = function () {
	// Mixin method
	OO.ui.mixin.LabelElement.prototype.setLabel.apply( this, arguments );
	this.propagateResize();

	return this;
};

/**
 * @inheritdoc
 */
OO.ui.ActionWidget.prototype.setFlags = function () {
	// Mixin method
	OO.ui.mixin.FlaggedElement.prototype.setFlags.apply( this, arguments );
	this.propagateResize();

	return this;
};

/**
 * @inheritdoc
 */
OO.ui.ActionWidget.prototype.clearFlags = function () {
	// Mixin method
	OO.ui.mixin.FlaggedElement.prototype.clearFlags.apply( this, arguments );
	this.propagateResize();

	return this;
};

/**
 * Toggle the visibility of the action button.
 *
 * @param {boolean} [show] Show button, omit to toggle visibility
 * @chainable
 */
OO.ui.ActionWidget.prototype.toggle = function () {
	// Parent method
	OO.ui.ActionWidget.parent.prototype.toggle.apply( this, arguments );
	this.propagateResize();

	return this;
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
 */
OO.ui.PopupButtonWidget = function OoUiPopupButtonWidget( config ) {
	// Parent constructor
	OO.ui.PopupButtonWidget.parent.call( this, config );

	// Mixin constructors
	OO.ui.mixin.PopupElement.call( this, config );

	// Events
	this.connect( this, { click: 'onAction' } );

	// Initialization
	this.$element
		.addClass( 'oo-ui-popupButtonWidget' )
		.attr( 'aria-haspopup', 'true' )
		.append( this.popup.$element );
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
 * ToggleButtons are buttons that have a state (‘on’ or ‘off’) that is represented by a
 * Boolean value. Like other {@link OO.ui.ButtonWidget buttons}, toggle buttons can be
 * configured with {@link OO.ui.mixin.IconElement icons}, {@link OO.ui.mixin.IndicatorElement indicators},
 * {@link OO.ui.mixin.TitledElement titles}, {@link OO.ui.mixin.FlaggedElement styling flags},
 * and {@link OO.ui.mixin.LabelElement labels}. Please see
 * the [OOjs UI documentation][1] on MediaWiki for more information.
 *
 *     @example
 *     // Toggle buttons in the 'off' and 'on' state.
 *     var toggleButton1 = new OO.ui.ToggleButtonWidget( {
 *         label: 'Toggle Button off'
 *     } );
 *     var toggleButton2 = new OO.ui.ToggleButtonWidget( {
 *         label: 'Toggle Button on',
 *         value: true
 *     } );
 *     // Append the buttons to the DOM.
 *     $( 'body' ).append( toggleButton1.$element, toggleButton2.$element );
 *
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Widgets/Buttons_and_Switches#Toggle_buttons
 *
 * @class
 * @extends OO.ui.ToggleWidget
 * @mixins OO.ui.mixin.ButtonElement
 * @mixins OO.ui.mixin.IconElement
 * @mixins OO.ui.mixin.IndicatorElement
 * @mixins OO.ui.mixin.LabelElement
 * @mixins OO.ui.mixin.TitledElement
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
	OO.ui.mixin.ButtonElement.call( this, config );
	OO.ui.mixin.IconElement.call( this, config );
	OO.ui.mixin.IndicatorElement.call( this, config );
	OO.ui.mixin.LabelElement.call( this, config );
	OO.ui.mixin.TitledElement.call( this, $.extend( {}, config, { $titled: this.$button } ) );
	OO.ui.mixin.FlaggedElement.call( this, config );
	OO.ui.mixin.TabIndexedElement.call( this, $.extend( {}, config, { $tabIndexed: this.$button } ) );

	// Events
	this.connect( this, { click: 'onAction' } );

	// Initialization
	this.$button.append( this.$icon, this.$label, this.$indicator );
	this.$element
		.addClass( 'oo-ui-toggleButtonWidget' )
		.append( this.$button );
};

/* Setup */

OO.inheritClass( OO.ui.ToggleButtonWidget, OO.ui.ToggleWidget );
OO.mixinClass( OO.ui.ToggleButtonWidget, OO.ui.mixin.ButtonElement );
OO.mixinClass( OO.ui.ToggleButtonWidget, OO.ui.mixin.IconElement );
OO.mixinClass( OO.ui.ToggleButtonWidget, OO.ui.mixin.IndicatorElement );
OO.mixinClass( OO.ui.ToggleButtonWidget, OO.ui.mixin.LabelElement );
OO.mixinClass( OO.ui.ToggleButtonWidget, OO.ui.mixin.TitledElement );
OO.mixinClass( OO.ui.ToggleButtonWidget, OO.ui.mixin.FlaggedElement );
OO.mixinClass( OO.ui.ToggleButtonWidget, OO.ui.mixin.TabIndexedElement );

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
 * CapsuleMultiSelectWidgets are something like a {@link OO.ui.ComboBoxWidget combo box widget}
 * that allows for selecting multiple values.
 *
 * For more information about menus and options, please see the [OOjs UI documentation on MediaWiki][1].
 *
 *     @example
 *     // Example: A CapsuleMultiSelectWidget.
 *     var capsule = new OO.ui.CapsuleMultiSelectWidget( {
 *         label: 'CapsuleMultiSelectWidget',
 *         selected: [ 'Option 1', 'Option 3' ],
 *         menu: {
 *             items: [
 *                 new OO.ui.MenuOptionWidget( {
 *                     data: 'Option 1',
 *                     label: 'Option One'
 *                 } ),
 *                 new OO.ui.MenuOptionWidget( {
 *                     data: 'Option 2',
 *                     label: 'Option Two'
 *                 } ),
 *                 new OO.ui.MenuOptionWidget( {
 *                     data: 'Option 3',
 *                     label: 'Option Three'
 *                 } ),
 *                 new OO.ui.MenuOptionWidget( {
 *                     data: 'Option 4',
 *                     label: 'Option Four'
 *                 } ),
 *                 new OO.ui.MenuOptionWidget( {
 *                     data: 'Option 5',
 *                     label: 'Option Five'
 *                 } )
 *             ]
 *         }
 *     } );
 *     $( 'body' ).append( capsule.$element );
 *
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Widgets/Selects_and_Options#Menu_selects_and_options
 *
 * @class
 * @extends OO.ui.Widget
 * @mixins OO.ui.mixin.TabIndexedElement
 * @mixins OO.ui.mixin.GroupElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {boolean} [allowArbitrary=false] Allow data items to be added even if not present in the menu.
 * @cfg {Object} [menu] Configuration options to pass to the {@link OO.ui.MenuSelectWidget menu select widget}.
 * @cfg {Object} [popup] Configuration options to pass to the {@link OO.ui.PopupWidget popup widget}.
 *  If specified, this popup will be shown instead of the menu (but the menu
 *  will still be used for item labels and allowArbitrary=false). The widgets
 *  in the popup should use this.addItemsFromData() or this.addItems() as necessary.
 * @cfg {jQuery} [$overlay] Render the menu or popup into a separate layer.
 *  This configuration is useful in cases where the expanded menu is larger than
 *  its containing `<div>`. The specified overlay layer is usually on top of
 *  the containing `<div>` and has a larger area. By default, the menu uses
 *  relative positioning.
 */
OO.ui.CapsuleMultiSelectWidget = function OoUiCapsuleMultiSelectWidget( config ) {
	var $tabFocus;

	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.CapsuleMultiSelectWidget.parent.call( this, config );

	// Properties (must be set before mixin constructor calls)
	this.$input = config.popup ? null : $( '<input>' );
	this.$handle = $( '<div>' );

	// Mixin constructors
	OO.ui.mixin.GroupElement.call( this, config );
	if ( config.popup ) {
		config.popup = $.extend( {}, config.popup, {
			align: 'forwards',
			anchor: false
		} );
		OO.ui.mixin.PopupElement.call( this, config );
		$tabFocus = $( '<span>' );
		OO.ui.mixin.TabIndexedElement.call( this, $.extend( {}, config, { $tabIndexed: $tabFocus } ) );
	} else {
		this.popup = null;
		$tabFocus = null;
		OO.ui.mixin.TabIndexedElement.call( this, $.extend( {}, config, { $tabIndexed: this.$input } ) );
	}
	OO.ui.mixin.IndicatorElement.call( this, config );
	OO.ui.mixin.IconElement.call( this, config );

	// Properties
	this.allowArbitrary = !!config.allowArbitrary;
	this.$overlay = config.$overlay || this.$element;
	this.menu = new OO.ui.FloatingMenuSelectWidget( $.extend(
		{
			widget: this,
			$input: this.$input,
			$container: this.$element,
			filterFromInput: true,
			disabled: this.isDisabled()
		},
		config.menu
	) );

	// Events
	if ( this.popup ) {
		$tabFocus.on( {
			focus: this.onFocusForPopup.bind( this )
		} );
		this.popup.$element.on( 'focusout', this.onPopupFocusOut.bind( this ) );
		if ( this.popup.$autoCloseIgnore ) {
			this.popup.$autoCloseIgnore.on( 'focusout', this.onPopupFocusOut.bind( this ) );
		}
		this.popup.connect( this, {
			toggle: function ( visible ) {
				$tabFocus.toggle( !visible );
			}
		} );
	} else {
		this.$input.on( {
			focus: this.onInputFocus.bind( this ),
			blur: this.onInputBlur.bind( this ),
			'propertychange change click mouseup keydown keyup input cut paste select': this.onInputChange.bind( this ),
			keydown: this.onKeyDown.bind( this ),
			keypress: this.onKeyPress.bind( this )
		} );
	}
	this.menu.connect( this, {
		choose: 'onMenuChoose',
		add: 'onMenuItemsChange',
		remove: 'onMenuItemsChange'
	} );
	this.$handle.on( {
		click: this.onClick.bind( this )
	} );

	// Initialization
	if ( this.$input ) {
		this.$input.prop( 'disabled', this.isDisabled() );
		this.$input.attr( {
			role: 'combobox',
			'aria-autocomplete': 'list'
		} );
		this.$input.width( '1em' );
	}
	if ( config.data ) {
		this.setItemsFromData( config.data );
	}
	this.$group.addClass( 'oo-ui-capsuleMultiSelectWidget-group' );
	this.$handle.addClass( 'oo-ui-capsuleMultiSelectWidget-handle' )
		.append( this.$indicator, this.$icon, this.$group );
	this.$element.addClass( 'oo-ui-capsuleMultiSelectWidget' )
		.append( this.$handle );
	if ( this.popup ) {
		this.$handle.append( $tabFocus );
		this.$overlay.append( this.popup.$element );
	} else {
		this.$handle.append( this.$input );
		this.$overlay.append( this.menu.$element );
	}
	this.onMenuItemsChange();
};

/* Setup */

OO.inheritClass( OO.ui.CapsuleMultiSelectWidget, OO.ui.Widget );
OO.mixinClass( OO.ui.CapsuleMultiSelectWidget, OO.ui.mixin.GroupElement );
OO.mixinClass( OO.ui.CapsuleMultiSelectWidget, OO.ui.mixin.PopupElement );
OO.mixinClass( OO.ui.CapsuleMultiSelectWidget, OO.ui.mixin.TabIndexedElement );
OO.mixinClass( OO.ui.CapsuleMultiSelectWidget, OO.ui.mixin.IndicatorElement );
OO.mixinClass( OO.ui.CapsuleMultiSelectWidget, OO.ui.mixin.IconElement );

/* Events */

/**
 * @event change
 *
 * A change event is emitted when the set of selected items changes.
 *
 * @param {Mixed[]} datas Data of the now-selected items
 */

/* Methods */

/**
 * Construct a OO.ui.CapsuleItemWidget (or a subclass thereof) from given label and data.
 *
 * @protected
 * @param {Mixed} data Custom data of any type.
 * @param {string} label The label text.
 * @return {OO.ui.CapsuleItemWidget}
 */
OO.ui.CapsuleMultiSelectWidget.prototype.createItemWidget = function ( data, label ) {
	return new OO.ui.CapsuleItemWidget( { data: data, label: label } );
};

/**
 * Get the data of the items in the capsule
 * @return {Mixed[]}
 */
OO.ui.CapsuleMultiSelectWidget.prototype.getItemsData = function () {
	return $.map( this.getItems(), function ( e ) { return e.data; } );
};

/**
 * Set the items in the capsule by providing data
 * @chainable
 * @param {Mixed[]} datas
 * @return {OO.ui.CapsuleMultiSelectWidget}
 */
OO.ui.CapsuleMultiSelectWidget.prototype.setItemsFromData = function ( datas ) {
	var widget = this,
		menu = this.menu,
		items = this.getItems();

	$.each( datas, function ( i, data ) {
		var j, label,
			item = menu.getItemFromData( data );

		if ( item ) {
			label = item.label;
		} else if ( widget.allowArbitrary ) {
			label = String( data );
		} else {
			return;
		}

		item = null;
		for ( j = 0; j < items.length; j++ ) {
			if ( items[ j ].data === data && items[ j ].label === label ) {
				item = items[ j ];
				items.splice( j, 1 );
				break;
			}
		}
		if ( !item ) {
			item = widget.createItemWidget( data, label );
		}
		widget.addItems( [ item ], i );
	} );

	if ( items.length ) {
		widget.removeItems( items );
	}

	return this;
};

/**
 * Add items to the capsule by providing their data
 * @chainable
 * @param {Mixed[]} datas
 * @return {OO.ui.CapsuleMultiSelectWidget}
 */
OO.ui.CapsuleMultiSelectWidget.prototype.addItemsFromData = function ( datas ) {
	var widget = this,
		menu = this.menu,
		items = [];

	$.each( datas, function ( i, data ) {
		var item;

		if ( !widget.getItemFromData( data ) ) {
			item = menu.getItemFromData( data );
			if ( item ) {
				items.push( widget.createItemWidget( data, item.label ) );
			} else if ( widget.allowArbitrary ) {
				items.push( widget.createItemWidget( data, String( data ) ) );
			}
		}
	} );

	if ( items.length ) {
		this.addItems( items );
	}

	return this;
};

/**
 * Remove items by data
 * @chainable
 * @param {Mixed[]} datas
 * @return {OO.ui.CapsuleMultiSelectWidget}
 */
OO.ui.CapsuleMultiSelectWidget.prototype.removeItemsFromData = function ( datas ) {
	var widget = this,
		items = [];

	$.each( datas, function ( i, data ) {
		var item = widget.getItemFromData( data );
		if ( item ) {
			items.push( item );
		}
	} );

	if ( items.length ) {
		this.removeItems( items );
	}

	return this;
};

/**
 * @inheritdoc
 */
OO.ui.CapsuleMultiSelectWidget.prototype.addItems = function ( items ) {
	var same, i, l,
		oldItems = this.items.slice();

	OO.ui.mixin.GroupElement.prototype.addItems.call( this, items );

	if ( this.items.length !== oldItems.length ) {
		same = false;
	} else {
		same = true;
		for ( i = 0, l = oldItems.length; same && i < l; i++ ) {
			same = same && this.items[ i ] === oldItems[ i ];
		}
	}
	if ( !same ) {
		this.emit( 'change', this.getItemsData() );
	}

	return this;
};

/**
 * @inheritdoc
 */
OO.ui.CapsuleMultiSelectWidget.prototype.removeItems = function ( items ) {
	var same, i, l,
		oldItems = this.items.slice();

	OO.ui.mixin.GroupElement.prototype.removeItems.call( this, items );

	if ( this.items.length !== oldItems.length ) {
		same = false;
	} else {
		same = true;
		for ( i = 0, l = oldItems.length; same && i < l; i++ ) {
			same = same && this.items[ i ] === oldItems[ i ];
		}
	}
	if ( !same ) {
		this.emit( 'change', this.getItemsData() );
	}

	return this;
};

/**
 * @inheritdoc
 */
OO.ui.CapsuleMultiSelectWidget.prototype.clearItems = function () {
	if ( this.items.length ) {
		OO.ui.mixin.GroupElement.prototype.clearItems.call( this );
		this.emit( 'change', this.getItemsData() );
	}
	return this;
};

/**
 * Get the capsule widget's menu.
 * @return {OO.ui.MenuSelectWidget} Menu widget
 */
OO.ui.CapsuleMultiSelectWidget.prototype.getMenu = function () {
	return this.menu;
};

/**
 * Handle focus events
 *
 * @private
 * @param {jQuery.Event} event
 */
OO.ui.CapsuleMultiSelectWidget.prototype.onInputFocus = function () {
	if ( !this.isDisabled() ) {
		this.menu.toggle( true );
	}
};

/**
 * Handle blur events
 *
 * @private
 * @param {jQuery.Event} event
 */
OO.ui.CapsuleMultiSelectWidget.prototype.onInputBlur = function () {
	if ( this.allowArbitrary && this.$input.val().trim() !== '' ) {
		this.addItemsFromData( [ this.$input.val() ] );
	}
	this.clearInput();
};

/**
 * Handle focus events
 *
 * @private
 * @param {jQuery.Event} event
 */
OO.ui.CapsuleMultiSelectWidget.prototype.onFocusForPopup = function () {
	if ( !this.isDisabled() ) {
		this.popup.setSize( this.$handle.width() );
		this.popup.toggle( true );
		this.popup.$element.find( '*' )
			.filter( function () { return OO.ui.isFocusableElement( $( this ), true ); } )
			.first()
			.focus();
	}
};

/**
 * Handles popup focus out events.
 *
 * @private
 * @param {Event} e Focus out event
 */
OO.ui.CapsuleMultiSelectWidget.prototype.onPopupFocusOut = function () {
	var widget = this.popup;

	setTimeout( function () {
		if (
			widget.isVisible() &&
			!OO.ui.contains( widget.$element[ 0 ], document.activeElement, true ) &&
			( !widget.$autoCloseIgnore || !widget.$autoCloseIgnore.has( document.activeElement ).length )
		) {
			widget.toggle( false );
		}
	} );
};

/**
 * Handle mouse click events.
 *
 * @private
 * @param {jQuery.Event} e Mouse click event
 */
OO.ui.CapsuleMultiSelectWidget.prototype.onClick = function ( e ) {
	if ( e.which === 1 ) {
		this.focus();
		return false;
	}
};

/**
 * Handle key press events.
 *
 * @private
 * @param {jQuery.Event} e Key press event
 */
OO.ui.CapsuleMultiSelectWidget.prototype.onKeyPress = function ( e ) {
	var item;

	if ( !this.isDisabled() ) {
		if ( e.which === OO.ui.Keys.ESCAPE ) {
			this.clearInput();
			return false;
		}

		if ( !this.popup ) {
			this.menu.toggle( true );
			if ( e.which === OO.ui.Keys.ENTER ) {
				item = this.menu.getItemFromLabel( this.$input.val(), true );
				if ( item ) {
					this.addItemsFromData( [ item.data ] );
					this.clearInput();
				} else if ( this.allowArbitrary && this.$input.val().trim() !== '' ) {
					this.addItemsFromData( [ this.$input.val() ] );
					this.clearInput();
				}
				return false;
			}

			// Make sure the input gets resized.
			setTimeout( this.onInputChange.bind( this ), 0 );
		}
	}
};

/**
 * Handle key down events.
 *
 * @private
 * @param {jQuery.Event} e Key down event
 */
OO.ui.CapsuleMultiSelectWidget.prototype.onKeyDown = function ( e ) {
	if ( !this.isDisabled() ) {
		// 'keypress' event is not triggered for Backspace
		if ( e.keyCode === OO.ui.Keys.BACKSPACE && this.$input.val() === '' ) {
			if ( this.items.length ) {
				this.removeItems( this.items.slice( -1 ) );
			}
			return false;
		}
	}
};

/**
 * Handle input change events.
 *
 * @private
 * @param {jQuery.Event} e Event of some sort
 */
OO.ui.CapsuleMultiSelectWidget.prototype.onInputChange = function () {
	if ( !this.isDisabled() ) {
		this.$input.width( this.$input.val().length + 'em' );
	}
};

/**
 * Handle menu choose events.
 *
 * @private
 * @param {OO.ui.OptionWidget} item Chosen item
 */
OO.ui.CapsuleMultiSelectWidget.prototype.onMenuChoose = function ( item ) {
	if ( item && item.isVisible() ) {
		this.addItemsFromData( [ item.getData() ] );
		this.clearInput();
	}
};

/**
 * Handle menu item change events.
 *
 * @private
 */
OO.ui.CapsuleMultiSelectWidget.prototype.onMenuItemsChange = function () {
	this.setItemsFromData( this.getItemsData() );
	this.$element.toggleClass( 'oo-ui-capsuleMultiSelectWidget-empty', this.menu.isEmpty() );
};

/**
 * Clear the input field
 * @private
 */
OO.ui.CapsuleMultiSelectWidget.prototype.clearInput = function () {
	if ( this.$input ) {
		this.$input.val( '' );
		this.$input.width( '1em' );
	}
	if ( this.popup ) {
		this.popup.toggle( false );
	}
	this.menu.toggle( false );
	this.menu.selectItem();
	this.menu.highlightItem();
};

/**
 * @inheritdoc
 */
OO.ui.CapsuleMultiSelectWidget.prototype.setDisabled = function ( disabled ) {
	var i, len;

	// Parent method
	OO.ui.CapsuleMultiSelectWidget.parent.prototype.setDisabled.call( this, disabled );

	if ( this.$input ) {
		this.$input.prop( 'disabled', this.isDisabled() );
	}
	if ( this.menu ) {
		this.menu.setDisabled( this.isDisabled() );
	}
	if ( this.popup ) {
		this.popup.setDisabled( this.isDisabled() );
	}

	if ( this.items ) {
		for ( i = 0, len = this.items.length; i < len; i++ ) {
			this.items[ i ].updateDisabled();
		}
	}

	return this;
};

/**
 * Focus the widget
 * @chainable
 * @return {OO.ui.CapsuleMultiSelectWidget}
 */
OO.ui.CapsuleMultiSelectWidget.prototype.focus = function () {
	if ( !this.isDisabled() ) {
		if ( this.popup ) {
			this.popup.setSize( this.$handle.width() );
			this.popup.toggle( true );
			this.popup.$element.find( '*' )
				.filter( function () { return OO.ui.isFocusableElement( $( this ), true ); } )
				.first()
				.focus();
		} else {
			this.menu.toggle( true );
			this.$input.focus();
		}
	}
	return this;
};

/**
 * CapsuleItemWidgets are used within a {@link OO.ui.CapsuleMultiSelectWidget
 * CapsuleMultiSelectWidget} to display the selected items.
 *
 * @class
 * @extends OO.ui.Widget
 * @mixins OO.ui.mixin.ItemWidget
 * @mixins OO.ui.mixin.IndicatorElement
 * @mixins OO.ui.mixin.LabelElement
 * @mixins OO.ui.mixin.FlaggedElement
 * @mixins OO.ui.mixin.TabIndexedElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 */
OO.ui.CapsuleItemWidget = function OoUiCapsuleItemWidget( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.CapsuleItemWidget.parent.call( this, config );

	// Properties (must be set before mixin constructor calls)
	this.$indicator = $( '<span>' );

	// Mixin constructors
	OO.ui.mixin.ItemWidget.call( this );
	OO.ui.mixin.IndicatorElement.call( this, $.extend( {}, config, { $indicator: this.$indicator, indicator: 'clear' } ) );
	OO.ui.mixin.LabelElement.call( this, config );
	OO.ui.mixin.FlaggedElement.call( this, config );
	OO.ui.mixin.TabIndexedElement.call( this, $.extend( {}, config, { $tabIndexed: this.$indicator } ) );

	// Events
	this.$indicator.on( {
		keydown: this.onCloseKeyDown.bind( this ),
		click: this.onCloseClick.bind( this )
	} );

	// Initialization
	this.$element
		.addClass( 'oo-ui-capsuleItemWidget' )
		.append( this.$indicator, this.$label );
};

/* Setup */

OO.inheritClass( OO.ui.CapsuleItemWidget, OO.ui.Widget );
OO.mixinClass( OO.ui.CapsuleItemWidget, OO.ui.mixin.ItemWidget );
OO.mixinClass( OO.ui.CapsuleItemWidget, OO.ui.mixin.IndicatorElement );
OO.mixinClass( OO.ui.CapsuleItemWidget, OO.ui.mixin.LabelElement );
OO.mixinClass( OO.ui.CapsuleItemWidget, OO.ui.mixin.FlaggedElement );
OO.mixinClass( OO.ui.CapsuleItemWidget, OO.ui.mixin.TabIndexedElement );

/* Methods */

/**
 * Handle close icon clicks
 * @param {jQuery.Event} event
 */
OO.ui.CapsuleItemWidget.prototype.onCloseClick = function () {
	var element = this.getElementGroup();

	if ( !this.isDisabled() && element && $.isFunction( element.removeItems ) ) {
		element.removeItems( [ this ] );
		element.focus();
	}
};

/**
 * Handle close keyboard events
 * @param {jQuery.Event} event Key down event
 */
OO.ui.CapsuleItemWidget.prototype.onCloseKeyDown = function ( e ) {
	if ( !this.isDisabled() && $.isFunction( this.getElementGroup().removeItems ) ) {
		switch ( e.which ) {
			case OO.ui.Keys.ENTER:
			case OO.ui.Keys.BACKSPACE:
			case OO.ui.Keys.SPACE:
				this.getElementGroup().removeItems( [ this ] );
				return false;
		}
	}
};

/**
 * DropdownWidgets are not menus themselves, rather they contain a menu of options created with
 * OO.ui.MenuOptionWidget. The DropdownWidget takes care of opening and displaying the menu so that
 * users can interact with it.
 *
 * If you want to use this within a HTML form, such as a OO.ui.FormLayout, use
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
 *     dropDown.getMenu().getSelectedItem().getData(); // returns 'b'
 *
 * For more information, please see the [OOjs UI documentation on MediaWiki] [1].
 *
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Widgets/Selects_and_Options#Menu_selects_and_options
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
 * @cfg {Object} [menu] Configuration options to pass to {@link OO.ui.FloatingMenuSelectWidget menu select widget}
 * @cfg {jQuery} [$overlay] Render the menu into a separate layer. This configuration is useful in cases where
 *  the expanded menu is larger than its containing `<div>`. The specified overlay layer is usually on top of the
 *  containing `<div>` and has a larger area. By default, the menu uses relative positioning.
 */
OO.ui.DropdownWidget = function OoUiDropdownWidget( config ) {
	// Configuration initialization
	config = $.extend( { indicator: 'down' }, config );

	// Parent constructor
	OO.ui.DropdownWidget.parent.call( this, config );

	// Properties (must be set before TabIndexedElement constructor call)
	this.$handle = this.$( '<span>' );
	this.$overlay = config.$overlay || this.$element;

	// Mixin constructors
	OO.ui.mixin.IconElement.call( this, config );
	OO.ui.mixin.IndicatorElement.call( this, config );
	OO.ui.mixin.LabelElement.call( this, config );
	OO.ui.mixin.TitledElement.call( this, $.extend( {}, config, { $titled: this.$label } ) );
	OO.ui.mixin.TabIndexedElement.call( this, $.extend( {}, config, { $tabIndexed: this.$handle } ) );

	// Properties
	this.menu = new OO.ui.FloatingMenuSelectWidget( $.extend( {
		widget: this,
		$container: this.$element
	}, config.menu ) );

	// Events
	this.$handle.on( {
		click: this.onClick.bind( this ),
		keypress: this.onKeyPress.bind( this )
	} );
	this.menu.connect( this, { select: 'onMenuSelect' } );

	// Initialization
	this.$handle
		.addClass( 'oo-ui-dropdownWidget-handle' )
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
 * Handle mouse click events.
 *
 * @private
 * @param {jQuery.Event} e Mouse click event
 */
OO.ui.DropdownWidget.prototype.onClick = function ( e ) {
	if ( !this.isDisabled() && e.which === 1 ) {
		this.menu.toggle();
	}
	return false;
};

/**
 * Handle key press events.
 *
 * @private
 * @param {jQuery.Event} e Key press event
 */
OO.ui.DropdownWidget.prototype.onKeyPress = function ( e ) {
	if ( !this.isDisabled() &&
		( ( e.which === OO.ui.Keys.SPACE && !this.menu.isVisible() ) || e.which === OO.ui.Keys.ENTER )
	) {
		this.menu.toggle();
		return false;
	}
};

/**
 * SelectFileWidgets allow for selecting files, using the HTML5 File API. These
 * widgets can be configured with {@link OO.ui.mixin.IconElement icons} and {@link
 * OO.ui.mixin.IndicatorElement indicators}.
 * Please see the [OOjs UI documentation on MediaWiki] [1] for more information and examples.
 *
 *     @example
 *     // Example of a file select widget
 *     var selectFile = new OO.ui.SelectFileWidget();
 *     $( 'body' ).append( selectFile.$element );
 *
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Widgets
 *
 * @class
 * @extends OO.ui.Widget
 * @mixins OO.ui.mixin.IconElement
 * @mixins OO.ui.mixin.IndicatorElement
 * @mixins OO.ui.mixin.PendingElement
 * @mixins OO.ui.mixin.LabelElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {string[]|null} [accept=null] MIME types to accept. null accepts all types.
 * @cfg {string} [placeholder] Text to display when no file is selected.
 * @cfg {string} [notsupported] Text to display when file support is missing in the browser.
 * @cfg {boolean} [droppable=true] Whether to accept files by drag and drop.
 * @cfg {boolean} [showDropTarget=false] Whether to show a drop target. Requires droppable to be true.
 * @cfg {boolean} [dragDropUI=false] Deprecated alias for showDropTarget
 */
OO.ui.SelectFileWidget = function OoUiSelectFileWidget( config ) {
	var dragHandler;

	// TODO: Remove in next release
	if ( config && config.dragDropUI ) {
		config.showDropTarget = true;
	}

	// Configuration initialization
	config = $.extend( {
		accept: null,
		placeholder: OO.ui.msg( 'ooui-selectfile-placeholder' ),
		notsupported: OO.ui.msg( 'ooui-selectfile-not-supported' ),
		droppable: true,
		showDropTarget: false
	}, config );

	// Parent constructor
	OO.ui.SelectFileWidget.parent.call( this, config );

	// Mixin constructors
	OO.ui.mixin.IconElement.call( this, config );
	OO.ui.mixin.IndicatorElement.call( this, config );
	OO.ui.mixin.PendingElement.call( this, $.extend( {}, config, { $pending: this.$info } ) );
	OO.ui.mixin.LabelElement.call( this, $.extend( {}, config, { autoFitLabel: true } ) );

	// Properties
	this.$info = $( '<span>' );

	// Properties
	this.showDropTarget = config.showDropTarget;
	this.isSupported = this.constructor.static.isSupported();
	this.currentFile = null;
	if ( Array.isArray( config.accept ) ) {
		this.accept = config.accept;
	} else {
		this.accept = null;
	}
	this.placeholder = config.placeholder;
	this.notsupported = config.notsupported;
	this.onFileSelectedHandler = this.onFileSelected.bind( this );

	this.selectButton = new OO.ui.ButtonWidget( {
		classes: [ 'oo-ui-selectFileWidget-selectButton' ],
		label: 'Select a file',
		disabled: this.disabled || !this.isSupported
	} );

	this.clearButton = new OO.ui.ButtonWidget( {
		classes: [ 'oo-ui-selectFileWidget-clearButton' ],
		framed: false,
		icon: 'remove',
		disabled: this.disabled
	} );

	// Events
	this.selectButton.$button.on( {
		keypress: this.onKeyPress.bind( this )
	} );
	this.clearButton.connect( this, {
		click: 'onClearClick'
	} );
	if ( config.droppable ) {
		dragHandler = this.onDragEnterOrOver.bind( this );
		this.$element.on( {
			dragenter: dragHandler,
			dragover: dragHandler,
			dragleave: this.onDragLeave.bind( this ),
			drop: this.onDrop.bind( this )
		} );
	}

	// Initialization
	this.addInput();
	this.updateUI();
	this.$label.addClass( 'oo-ui-selectFileWidget-label' );
	this.$info
		.addClass( 'oo-ui-selectFileWidget-info' )
		.append( this.$icon, this.$label, this.clearButton.$element, this.$indicator );
	this.$element
		.addClass( 'oo-ui-selectFileWidget' )
		.append( this.$info, this.selectButton.$element );
	if ( config.droppable && config.showDropTarget ) {
		this.$dropTarget = $( '<div>' )
			.addClass( 'oo-ui-selectFileWidget-dropTarget' )
			.text( OO.ui.msg( 'ooui-selectfile-dragdrop-placeholder' ) )
			.on( {
				click: this.onDropTargetClick.bind( this )
			} );
		this.$element.prepend( this.$dropTarget );
	}
};

/* Setup */

OO.inheritClass( OO.ui.SelectFileWidget, OO.ui.Widget );
OO.mixinClass( OO.ui.SelectFileWidget, OO.ui.mixin.IconElement );
OO.mixinClass( OO.ui.SelectFileWidget, OO.ui.mixin.IndicatorElement );
OO.mixinClass( OO.ui.SelectFileWidget, OO.ui.mixin.PendingElement );
OO.mixinClass( OO.ui.SelectFileWidget, OO.ui.mixin.LabelElement );

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
		$input = $( '<input type="file">' );
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
 * @return {File|null}
 */
OO.ui.SelectFileWidget.prototype.getValue = function () {
	return this.currentFile;
};

/**
 * Set the current value of the field
 *
 * @param {File|null} file File to select
 */
OO.ui.SelectFileWidget.prototype.setValue = function ( file ) {
	if ( this.currentFile !== file ) {
		this.currentFile = file;
		this.updateUI();
		this.emit( 'change', this.currentFile );
	}
};

/**
 * Focus the widget.
 *
 * Focusses the select file button.
 *
 * @chainable
 */
OO.ui.SelectFileWidget.prototype.focus = function () {
	this.selectButton.$button[ 0 ].focus();
	return this;
};

/**
 * Update the user interface when a file is selected or unselected
 *
 * @protected
 */
OO.ui.SelectFileWidget.prototype.updateUI = function () {
	var $label;
	if ( !this.isSupported ) {
		this.$element.addClass( 'oo-ui-selectFileWidget-notsupported' );
		this.$element.removeClass( 'oo-ui-selectFileWidget-empty' );
		this.setLabel( this.notsupported );
	} else {
		this.$element.addClass( 'oo-ui-selectFileWidget-supported' );
		if ( this.currentFile ) {
			this.$element.removeClass( 'oo-ui-selectFileWidget-empty' );
			$label = $( [] );
			if ( this.currentFile.type !== '' ) {
				$label = $label.add( $( '<span>' ).addClass( 'oo-ui-selectFileWidget-fileType' ).text( this.currentFile.type ) );
			}
			$label = $label.add( $( '<span>' ).text( this.currentFile.name ) );
			this.setLabel( $label );
		} else {
			this.$element.addClass( 'oo-ui-selectFileWidget-empty' );
			this.setLabel( this.placeholder );
		}
	}

	if ( this.$input ) {
		this.$input.attr( 'title', this.getLabel() );
	}
};

/**
 * Add the input to the widget
 *
 * @private
 */
OO.ui.SelectFileWidget.prototype.addInput = function () {
	if ( this.$input ) {
		this.$input.remove();
	}

	if ( !this.isSupported ) {
		this.$input = null;
		return;
	}

	this.$input = $( '<input type="file">' );
	this.$input.on( 'change', this.onFileSelectedHandler );
	this.$input.attr( {
		tabindex: -1,
		title: this.getLabel()
	} );
	if ( this.accept ) {
		this.$input.attr( 'accept', this.accept.join( ', ' ) );
	}
	this.selectButton.$button.append( this.$input );
};

/**
 * Determine if we should accept this file
 *
 * @private
 * @param {string} File MIME type
 * @return {boolean}
 */
OO.ui.SelectFileWidget.prototype.isAllowedType = function ( mimeType ) {
	var i, mimeTest;

	if ( !this.accept || !mimeType ) {
		return true;
	}

	for ( i = 0; i < this.accept.length; i++ ) {
		mimeTest = this.accept[ i ];
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
};

/**
 * Handle file selection from the input
 *
 * @private
 * @param {jQuery.Event} e
 */
OO.ui.SelectFileWidget.prototype.onFileSelected = function ( e ) {
	var file = OO.getProp( e.target, 'files', 0 ) || null;

	if ( file && !this.isAllowedType( file.type ) ) {
		file = null;
	}

	this.setValue( file );
	this.addInput();
};

/**
 * Handle clear button click events.
 *
 * @private
 */
OO.ui.SelectFileWidget.prototype.onClearClick = function () {
	this.setValue( null );
	return false;
};

/**
 * Handle key press events.
 *
 * @private
 * @param {jQuery.Event} e Key press event
 */
OO.ui.SelectFileWidget.prototype.onKeyPress = function ( e ) {
	if ( this.isSupported && !this.isDisabled() && this.$input &&
		( e.which === OO.ui.Keys.SPACE || e.which === OO.ui.Keys.ENTER )
	) {
		this.$input.click();
		return false;
	}
};

/**
 * Handle drop target click events.
 *
 * @private
 * @param {jQuery.Event} e Key press event
 */
OO.ui.SelectFileWidget.prototype.onDropTargetClick = function () {
	if ( this.isSupported && !this.isDisabled() && this.$input ) {
		this.$input.click();
		return false;
	}
};

/**
 * Handle drag enter and over events
 *
 * @private
 * @param {jQuery.Event} e Drag event
 */
OO.ui.SelectFileWidget.prototype.onDragEnterOrOver = function ( e ) {
	var itemOrFile,
		droppableFile = false,
		dt = e.originalEvent.dataTransfer;

	e.preventDefault();
	e.stopPropagation();

	if ( this.isDisabled() || !this.isSupported ) {
		this.$element.removeClass( 'oo-ui-selectFileWidget-canDrop' );
		dt.dropEffect = 'none';
		return false;
	}

	// DataTransferItem and File both have a type property, but in Chrome files
	// have no information at this point.
	itemOrFile = OO.getProp( dt, 'items', 0 ) || OO.getProp( dt, 'files', 0 );
	if ( itemOrFile ) {
		if ( this.isAllowedType( itemOrFile.type ) ) {
			droppableFile = true;
		}
	// dt.types is Array-like, but not an Array
	} else if ( Array.prototype.indexOf.call( OO.getProp( dt, 'types' ) || [], 'Files' ) !== -1 ) {
		// File information is not available at this point for security so just assume
		// it is acceptable for now.
		// https://bugzilla.mozilla.org/show_bug.cgi?id=640534
		droppableFile = true;
	}

	this.$element.toggleClass( 'oo-ui-selectFileWidget-canDrop', droppableFile );
	if ( !droppableFile ) {
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
 */
OO.ui.SelectFileWidget.prototype.onDrop = function ( e ) {
	var file = null,
		dt = e.originalEvent.dataTransfer;

	e.preventDefault();
	e.stopPropagation();
	this.$element.removeClass( 'oo-ui-selectFileWidget-canDrop' );

	if ( this.isDisabled() || !this.isSupported ) {
		return false;
	}

	file = OO.getProp( dt, 'files', 0 );
	if ( file && !this.isAllowedType( file.type ) ) {
		file = null;
	}
	if ( file ) {
		this.setValue( file );
	}

	return false;
};

/**
 * @inheritdoc
 */
OO.ui.SelectFileWidget.prototype.setDisabled = function ( disabled ) {
	OO.ui.SelectFileWidget.parent.prototype.setDisabled.call( this, disabled );
	if ( this.selectButton ) {
		this.selectButton.setDisabled( disabled );
	}
	if ( this.clearButton ) {
		this.clearButton.setDisabled( disabled );
	}
	return this;
};

/**
 * IconWidget is a generic widget for {@link OO.ui.mixin.IconElement icons}. In general, IconWidgets should be used with OO.ui.LabelWidget,
 * which creates a label that identifies the icon’s function. See the [OOjs UI documentation on MediaWiki] [1]
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
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Widgets/Icons,_Indicators,_and_Labels#Icons
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

OO.ui.IconWidget.static.tagName = 'span';

/**
 * IndicatorWidgets create indicators, which are small graphics that are generally used to draw
 * attention to the status of an item or to clarify the function of a control. For a list of
 * indicators included in the library, please see the [OOjs UI documentation on MediaWiki][1].
 *
 *     @example
 *     // Example of an indicator widget
 *     var indicator1 = new OO.ui.IndicatorWidget( {
 *         indicator: 'alert'
 *     } );
 *
 *     // Create a fieldset layout to add a label
 *     var fieldset = new OO.ui.FieldsetLayout();
 *     fieldset.addItems( [
 *         new OO.ui.FieldLayout( indicator1, { label: 'An alert indicator:' } )
 *     ] );
 *     $( 'body' ).append( fieldset.$element );
 *
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Widgets/Icons,_Indicators,_and_Labels#Indicators
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

OO.ui.IndicatorWidget.static.tagName = 'span';

/**
 * InputWidget is the base class for all input widgets, which
 * include {@link OO.ui.TextInputWidget text inputs}, {@link OO.ui.CheckboxInputWidget checkbox inputs},
 * {@link OO.ui.RadioInputWidget radio inputs}, and {@link OO.ui.ButtonInputWidget button inputs}.
 * See the [OOjs UI documentation on MediaWiki] [1] for more information and examples.
 *
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Widgets/Inputs
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
 * @cfg {string} [accessKey=''] The access key of the input.
 * @cfg {Function} [inputFilter] The name of an input filter function. Input filters modify the value of an input
 *  before it is accepted.
 */
OO.ui.InputWidget = function OoUiInputWidget( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.InputWidget.parent.call( this, config );

	// Properties
	this.$input = this.getInputElement( config );
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
	this.setAccessKey( config.accessKey );
};

/* Setup */

OO.inheritClass( OO.ui.InputWidget, OO.ui.Widget );
OO.mixinClass( OO.ui.InputWidget, OO.ui.mixin.FlaggedElement );
OO.mixinClass( OO.ui.InputWidget, OO.ui.mixin.TabIndexedElement );
OO.mixinClass( OO.ui.InputWidget, OO.ui.mixin.TitledElement );
OO.mixinClass( OO.ui.InputWidget, OO.ui.mixin.AccessKeyedElement );

/* Static Properties */

OO.ui.InputWidget.static.supportsSimpleLabel = true;

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
 * Set the direction of the input, either RTL (right-to-left) or LTR (left-to-right).
 *
 * @param {boolean} isRTL
 * Direction is right-to-left
 */
OO.ui.InputWidget.prototype.setRTL = function ( isRTL ) {
	this.$input.prop( 'dir', isRTL ? 'rtl' : 'ltr' );
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
	return this;
};

/**
 * Set the input's access key.
 * FIXME: This is the same code as in OO.ui.mixin.ButtonElement, maybe find a better place for it?
 *
 * @param {string} accessKey Input's access key, use empty string to remove
 * @chainable
 */
OO.ui.InputWidget.prototype.setAccessKey = function ( accessKey ) {
	accessKey = typeof accessKey === 'string' && accessKey.length ? accessKey : null;

	if ( this.accessKey !== accessKey ) {
		if ( this.$input ) {
			if ( accessKey !== null ) {
				this.$input.attr( 'accesskey', accessKey );
			} else {
				this.$input.removeAttr( 'accesskey' );
			}
		}
		this.accessKey = accessKey;
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
 * Simulate the behavior of clicking on a label bound to this input. This method is only called by
 * {@link OO.ui.LabelWidget LabelWidget} and {@link OO.ui.FieldLayout FieldLayout}. It should not be
 * called directly.
 */
OO.ui.InputWidget.prototype.simulateLabelClick = function () {
	if ( !this.isDisabled() ) {
		if ( this.$input.is( ':checkbox, :radio' ) ) {
			this.$input.click();
		}
		if ( this.$input.is( ':input' ) ) {
			this.$input[ 0 ].focus();
		}
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
 * Focus the input.
 *
 * @chainable
 */
OO.ui.InputWidget.prototype.focus = function () {
	this.$input[ 0 ].focus();
	return this;
};

/**
 * Blur the input.
 *
 * @chainable
 */
OO.ui.InputWidget.prototype.blur = function () {
	this.$input[ 0 ].blur();
	return this;
};

/**
 * @inheritdoc
 */
OO.ui.InputWidget.prototype.gatherPreInfuseState = function ( node ) {
	var
		state = OO.ui.InputWidget.parent.prototype.gatherPreInfuseState.call( this, node ),
		$input = state.$input || $( node ).find( '.oo-ui-inputWidget-input' );
	state.value = $input.val();
	// Might be better in TabIndexedElement, but it's awkward to do there because mixins are awkward
	state.focus = $input.is( ':focus' );
	return state;
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
 * ButtonInputWidget is used to submit HTML forms and is intended to be used within
 * a OO.ui.FormLayout. If you do not need the button to work with HTML forms, you probably
 * want to use OO.ui.ButtonWidget instead. Button input widgets can be rendered as either an
 * HTML `<button/>` (the default) or an HTML `<input/>` tags. See the
 * [OOjs UI documentation on MediaWiki] [1] for more information.
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
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Widgets/Inputs#Button_inputs
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
 * @cfg {boolean} [useInputTag=false] Use an `<input/>` tag instead of a `<button/>` tag, the default.
 *  Widgets configured to be an `<input/>` do not support {@link #icon icons} and {@link #indicator indicators},
 *  non-plaintext {@link #label labels}, or {@link #value values}. In general, useInputTag should only
 *  be set to `true` when there’s need to support IE6 in a form with multiple buttons.
 */
OO.ui.ButtonInputWidget = function OoUiButtonInputWidget( config ) {
	// Configuration initialization
	config = $.extend( { type: 'button', useInputTag: false }, config );

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
 * Disable generating `<label>` elements for buttons. One would very rarely need additional label
 * for a button, and it's already a big clickable target, and it causes unexpected rendering.
 */
OO.ui.ButtonInputWidget.static.supportsSimpleLabel = false;

/* Methods */

/**
 * @inheritdoc
 * @protected
 */
OO.ui.ButtonInputWidget.prototype.getInputElement = function ( config ) {
	var type = [ 'button', 'submit', 'reset' ].indexOf( config.type ) !== -1 ?
		config.type :
		'button';
	return $( '<' + ( config.useInputTag ? 'input' : 'button' ) + ' type="' + type + '">' );
};

/**
 * Set label value.
 *
 * If #useInputTag is `true`, the label is set as the `value` of the `<input/>` tag.
 *
 * @param {jQuery|string|Function|null} label Label nodes, text, a function that returns nodes or
 *  text, or `null` for no label
 * @chainable
 */
OO.ui.ButtonInputWidget.prototype.setLabel = function ( label ) {
	OO.ui.mixin.LabelElement.prototype.setLabel.call( this, label );

	if ( this.useInputTag ) {
		if ( typeof label === 'function' ) {
			label = OO.ui.resolveMsg( label );
		}
		if ( label instanceof jQuery ) {
			label = label.text();
		}
		if ( !label ) {
			label = '';
		}
		this.$input.val( label );
	}

	return this;
};

/**
 * Set the value of the input.
 *
 * This method is disabled for button inputs configured as {@link #useInputTag <input/> tags}, as
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
 * CheckboxInputWidgets, like HTML checkboxes, can be selected and/or configured with a value.
 * Note that these {@link OO.ui.InputWidget input widgets} are best laid out
 * in {@link OO.ui.FieldLayout field layouts} that use the {@link OO.ui.FieldLayout#align inline}
 * alignment. For more information, please see the [OOjs UI documentation on MediaWiki][1].
 *
 * This widget can be used inside a HTML form, such as a OO.ui.FormLayout.
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
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Widgets/Inputs
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

	// Initialization
	this.$element
		.addClass( 'oo-ui-checkboxInputWidget' )
		// Required for pretty styling in MediaWiki theme
		.append( $( '<span>' ) );
	this.setSelected( config.selected !== undefined ? config.selected : false );
};

/* Setup */

OO.inheritClass( OO.ui.CheckboxInputWidget, OO.ui.InputWidget );

/* Methods */

/**
 * @inheritdoc
 * @protected
 */
OO.ui.CheckboxInputWidget.prototype.getInputElement = function () {
	return $( '<input type="checkbox" />' );
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
OO.ui.CheckboxInputWidget.prototype.gatherPreInfuseState = function ( node ) {
	var
		state = OO.ui.CheckboxInputWidget.parent.prototype.gatherPreInfuseState.call( this, node ),
		$input = $( node ).find( '.oo-ui-inputWidget-input' );
	state.$input = $input; // shortcut for performance, used in InputWidget
	state.checked = $input.prop( 'checked' );
	return state;
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
 * within a HTML form, such as a OO.ui.FormLayout. The selected value is synchronized with the value
 * of a hidden HTML `input` tag. Please see the [OOjs UI documentation on MediaWiki][1] for
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
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Widgets/Inputs
 *
 * @class
 * @extends OO.ui.InputWidget
 * @mixins OO.ui.mixin.TitledElement
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

	// Parent constructor
	OO.ui.DropdownInputWidget.parent.call( this, config );

	// Mixin constructors
	OO.ui.mixin.TitledElement.call( this, config );

	// Events
	this.dropdownWidget.getMenu().connect( this, { select: 'onMenuSelect' } );

	// Initialization
	this.setOptions( config.options || [] );
	this.$element
		.addClass( 'oo-ui-dropdownInputWidget' )
		.append( this.dropdownWidget.$element );
};

/* Setup */

OO.inheritClass( OO.ui.DropdownInputWidget, OO.ui.InputWidget );
OO.mixinClass( OO.ui.DropdownInputWidget, OO.ui.mixin.TitledElement );

/* Methods */

/**
 * @inheritdoc
 * @protected
 */
OO.ui.DropdownInputWidget.prototype.getInputElement = function () {
	return $( '<input type="hidden">' );
};

/**
 * Handles menu select events.
 *
 * @private
 * @param {OO.ui.MenuOptionWidget} item Selected menu item
 */
OO.ui.DropdownInputWidget.prototype.onMenuSelect = function ( item ) {
	this.setValue( item.getData() );
};

/**
 * @inheritdoc
 */
OO.ui.DropdownInputWidget.prototype.setValue = function ( value ) {
	value = this.cleanUpValue( value );
	this.dropdownWidget.getMenu().selectItemByData( value );
	OO.ui.DropdownInputWidget.parent.prototype.setValue.call( this, value );
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
	var
		value = this.getValue(),
		widget = this;

	// Rebuild the dropdown menu
	this.dropdownWidget.getMenu()
		.clearItems()
		.addItems( options.map( function ( opt ) {
			var optValue = widget.cleanUpValue( opt.data );
			return new OO.ui.MenuOptionWidget( {
				data: optValue,
				label: opt.label !== undefined ? opt.label : optValue
			} );
		} ) );

	// Restore the previous value, or reset to something sensible
	if ( this.dropdownWidget.getMenu().getItemFromData( value ) ) {
		// Previous value is still available, ensure consistency with the dropdown
		this.setValue( value );
	} else {
		// No longer valid, reset
		if ( options.length ) {
			this.setValue( options[ 0 ].data );
		}
	}

	return this;
};

/**
 * @inheritdoc
 */
OO.ui.DropdownInputWidget.prototype.focus = function () {
	this.dropdownWidget.getMenu().toggle( true );
	return this;
};

/**
 * @inheritdoc
 */
OO.ui.DropdownInputWidget.prototype.blur = function () {
	this.dropdownWidget.getMenu().toggle( false );
	return this;
};

/**
 * RadioInputWidget creates a single radio button. Because radio buttons are usually used as a set,
 * in most cases you will want to use a {@link OO.ui.RadioSelectWidget radio select}
 * with {@link OO.ui.RadioOptionWidget radio options} instead of this class. For more information,
 * please see the [OOjs UI documentation on MediaWiki][1].
 *
 * This widget can be used inside a HTML form, such as a OO.ui.FormLayout.
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
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Widgets/Inputs
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
		// Required for pretty styling in MediaWiki theme
		.append( $( '<span>' ) );
	this.setSelected( config.selected !== undefined ? config.selected : false );
};

/* Setup */

OO.inheritClass( OO.ui.RadioInputWidget, OO.ui.InputWidget );

/* Methods */

/**
 * @inheritdoc
 * @protected
 */
OO.ui.RadioInputWidget.prototype.getInputElement = function () {
	return $( '<input type="radio" />' );
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
OO.ui.RadioInputWidget.prototype.gatherPreInfuseState = function ( node ) {
	var
		state = OO.ui.RadioInputWidget.parent.prototype.gatherPreInfuseState.call( this, node ),
		$input = $( node ).find( '.oo-ui-inputWidget-input' );
	state.$input = $input; // shortcut for performance, used in InputWidget
	state.checked = $input.prop( 'checked' );
	return state;
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
 * within a HTML form, such as a OO.ui.FormLayout. The selected value is synchronized with the value
 * of a hidden HTML `input` tag. Please see the [OOjs UI documentation on MediaWiki][1] for
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
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Widgets/Inputs
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

	// Parent constructor
	OO.ui.RadioSelectInputWidget.parent.call( this, config );

	// Events
	this.radioSelectWidget.connect( this, { select: 'onMenuSelect' } );

	// Initialization
	this.setOptions( config.options || [] );
	this.$element
		.addClass( 'oo-ui-radioSelectInputWidget' )
		.append( this.radioSelectWidget.$element );
};

/* Setup */

OO.inheritClass( OO.ui.RadioSelectInputWidget, OO.ui.InputWidget );

/* Static Properties */

OO.ui.RadioSelectInputWidget.static.supportsSimpleLabel = false;

/* Methods */

/**
 * @inheritdoc
 * @protected
 */
OO.ui.RadioSelectInputWidget.prototype.getInputElement = function () {
	return $( '<input type="hidden">' );
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
	value = this.cleanUpValue( value );
	this.radioSelectWidget.selectItemByData( value );
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
	var
		value = this.getValue(),
		widget = this;

	// Rebuild the radioSelect menu
	this.radioSelectWidget
		.clearItems()
		.addItems( options.map( function ( opt ) {
			var optValue = widget.cleanUpValue( opt.data );
			return new OO.ui.RadioOptionWidget( {
				data: optValue,
				label: opt.label !== undefined ? opt.label : optValue
			} );
		} ) );

	// Restore the previous value, or reset to something sensible
	if ( this.radioSelectWidget.getItemFromData( value ) ) {
		// Previous value is still available, ensure consistency with the radioSelect
		this.setValue( value );
	} else {
		// No longer valid, reset
		if ( options.length ) {
			this.setValue( options[ 0 ].data );
		}
	}

	return this;
};

/**
 * @inheritdoc
 */
OO.ui.RadioSelectInputWidget.prototype.gatherPreInfuseState = function ( node ) {
	var state = OO.ui.RadioSelectInputWidget.parent.prototype.gatherPreInfuseState.call( this, node );
	state.value = $( node ).find( '.oo-ui-radioInputWidget .oo-ui-inputWidget-input:checked' ).val();
	return state;
};

/**
 * TextInputWidgets, like HTML text inputs, can be configured with options that customize the
 * size of the field as well as its presentation. In addition, these widgets can be configured
 * with {@link OO.ui.mixin.IconElement icons}, {@link OO.ui.mixin.IndicatorElement indicators}, an optional
 * validation-pattern (used to determine if an input value is valid or not) and an input filter,
 * which modifies incoming values rather than validating them.
 * Please see the [OOjs UI documentation on MediaWiki] [1] for more information and examples.
 *
 * This widget can be used inside a HTML form, such as a OO.ui.FormLayout.
 *
 *     @example
 *     // Example of a text input widget
 *     var textInput = new OO.ui.TextInputWidget( {
 *         value: 'Text input'
 *     } )
 *     $( 'body' ).append( textInput.$element );
 *
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Widgets/Inputs
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
 * @cfg {string} [type='text'] The value of the HTML `type` attribute: 'text', 'password', 'search',
 *  'email' or 'url'. Ignored if `multiline` is true.
 *
 *  Some values of `type` result in additional behaviors:
 *
 *  - `search`: implies `icon: 'search'` and `indicator: 'clear'`; when clicked, the indicator
 *    empties the text field
 * @cfg {string} [placeholder] Placeholder text
 * @cfg {boolean} [autofocus=false] Use an HTML `autofocus` attribute to
 *  instruct the browser to focus this widget.
 * @cfg {boolean} [readOnly=false] Prevent changes to the value of the text input.
 * @cfg {number} [maxLength] Maximum number of characters allowed in the input.
 * @cfg {boolean} [multiline=false] Allow multiple lines of text
 * @cfg {number} [rows] If multiline, number of visible lines in textarea. If used with `autosize`,
 *  specifies minimum number of rows to display.
 * @cfg {boolean} [autosize=false] Automatically resize the text input to fit its content.
 *  Use the #maxRows config to specify a maximum number of displayed rows.
 * @cfg {boolean} [maxRows] Maximum number of rows to display when #autosize is set to true.
 *  Defaults to the maximum of `10` and `2 * rows`, or `10` if `rows` isn't provided.
 * @cfg {string} [labelPosition='after'] The position of the inline label relative to that of
 *  the value or placeholder text: `'before'` or `'after'`
 * @cfg {boolean} [required=false] Mark the field as required. Implies `indicator: 'required'`.
 * @cfg {boolean} [autocomplete=true] Should the browser support autocomplete for this field
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
	if ( config.type === 'search' ) {
		if ( config.icon === undefined ) {
			config.icon = 'search';
		}
		// indicator: 'clear' is set dynamically later, depending on value
	}
	if ( config.required ) {
		if ( config.indicator === undefined ) {
			config.indicator = 'required';
		}
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
	this.multiline = !!config.multiline;
	this.autosize = !!config.autosize;
	this.minRows = config.rows !== undefined ? config.rows : '';
	this.maxRows = config.maxRows || Math.max( 2 * ( this.minRows || 0 ), 10 );
	this.validate = null;

	// Clone for resizing
	if ( this.autosize ) {
		this.$clone = this.$input
			.clone()
			.insertAfter( this.$input )
			.attr( 'aria-hidden', 'true' )
			.addClass( 'oo-ui-element-hidden' );
	}

	this.setValidation( config.validate );
	this.setLabelPosition( config.labelPosition );

	// Events
	this.$input.on( {
		keypress: this.onKeyPress.bind( this ),
		blur: this.onBlur.bind( this )
	} );
	this.$input.one( {
		focus: this.onElementAttach.bind( this )
	} );
	this.$icon.on( 'mousedown', this.onIconMouseDown.bind( this ) );
	this.$indicator.on( 'mousedown', this.onIndicatorMouseDown.bind( this ) );
	this.on( 'labelChange', this.updatePosition.bind( this ) );
	this.connect( this, {
		change: 'onChange',
		disable: 'onDisable'
	} );

	// Initialization
	this.$element
		.addClass( 'oo-ui-textInputWidget oo-ui-textInputWidget-type-' + this.type )
		.append( this.$icon, this.$indicator );
	this.setReadOnly( !!config.readOnly );
	this.updateSearchIndicator();
	if ( config.placeholder ) {
		this.$input.attr( 'placeholder', config.placeholder );
	}
	if ( config.maxLength !== undefined ) {
		this.$input.attr( 'maxlength', config.maxLength );
	}
	if ( config.autofocus ) {
		this.$input.attr( 'autofocus', 'autofocus' );
	}
	if ( config.required ) {
		this.$input.attr( 'required', 'required' );
		this.$input.attr( 'aria-required', 'true' );
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
	if ( this.multiline && config.rows ) {
		this.$input.attr( 'rows', config.rows );
	}
	if ( this.label || config.autosize ) {
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
 * Not emitted if the input is multiline.
 *
 * @event enter
 */

/* Methods */

/**
 * Handle icon mouse down events.
 *
 * @private
 * @param {jQuery.Event} e Mouse down event
 * @fires icon
 */
OO.ui.TextInputWidget.prototype.onIconMouseDown = function ( e ) {
	if ( e.which === 1 ) {
		this.$input[ 0 ].focus();
		return false;
	}
};

/**
 * Handle indicator mouse down events.
 *
 * @private
 * @param {jQuery.Event} e Mouse down event
 * @fires indicator
 */
OO.ui.TextInputWidget.prototype.onIndicatorMouseDown = function ( e ) {
	if ( e.which === 1 ) {
		if ( this.type === 'search' ) {
			// Clear the text field
			this.setValue( '' );
		}
		this.$input[ 0 ].focus();
		return false;
	}
};

/**
 * Handle key press events.
 *
 * @private
 * @param {jQuery.Event} e Key press event
 * @fires enter If enter key is pressed and input is not multiline
 */
OO.ui.TextInputWidget.prototype.onKeyPress = function ( e ) {
	if ( e.which === OO.ui.Keys.ENTER && !this.multiline ) {
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
 * Handle element attach events.
 *
 * @private
 * @param {jQuery.Event} e Element attach event
 */
OO.ui.TextInputWidget.prototype.onElementAttach = function () {
	// Any previously calculated size is now probably invalid if we reattached elsewhere
	this.valCache = null;
	this.adjustSize();
	this.positionLabel();
};

/**
 * Handle change events.
 *
 * @param {string} value
 * @private
 */
OO.ui.TextInputWidget.prototype.onChange = function () {
	this.updateSearchIndicator();
	this.setValidityFlag();
	this.adjustSize();
};

/**
 * Handle disable events.
 *
 * @param {boolean} disabled Element is disabled
 * @private
 */
OO.ui.TextInputWidget.prototype.onDisable = function () {
	this.updateSearchIndicator();
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
	this.updateSearchIndicator();
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

		if ( this.$element.closest( 'html' ).length ) {
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
			if ( widget.$element.closest( 'html' ).length ) {
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
 * Automatically adjust the size of the text input.
 *
 * This only affects #multiline inputs that are {@link #autosize autosized}.
 *
 * @chainable
 */
OO.ui.TextInputWidget.prototype.adjustSize = function () {
	var scrollHeight, innerHeight, outerHeight, maxInnerHeight, measurementError, idealHeight;

	if ( this.multiline && this.autosize && this.$input.val() !== this.valCache ) {
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

		// Difference between reported innerHeight and scrollHeight with no scrollbars present
		// Equals 1 on Blink-based browsers and 0 everywhere else
		measurementError = maxInnerHeight - this.$clone[ 0 ].scrollHeight;
		idealHeight = Math.min( maxInnerHeight, scrollHeight + measurementError );

		this.$clone.addClass( 'oo-ui-element-hidden' );

		// Only apply inline height when expansion beyond natural height is needed
		if ( idealHeight > innerHeight ) {
			// Use the difference between the inner and outer height as a buffer
			this.$input.css( 'height', idealHeight + ( outerHeight - innerHeight ) );
		} else {
			this.$input.css( 'height', '' );
		}
	}
	return this;
};

/**
 * @inheritdoc
 * @protected
 */
OO.ui.TextInputWidget.prototype.getInputElement = function ( config ) {
	return config.multiline ?
		$( '<textarea>' ) :
		$( '<input type="' + this.getSaneType( config ) + '" />' );
};

/**
 * Get sanitized value for 'type' for given config.
 *
 * @param {Object} config Configuration options
 * @return {string|null}
 * @private
 */
OO.ui.TextInputWidget.prototype.getSaneType = function ( config ) {
	var type = [ 'text', 'password', 'search', 'email', 'url' ].indexOf( config.type ) !== -1 ?
		config.type :
		'text';
	return config.multiline ? 'multiline' : type;
};

/**
 * Check if the input supports multiple lines.
 *
 * @return {boolean}
 */
OO.ui.TextInputWidget.prototype.isMultiline = function () {
	return !!this.multiline;
};

/**
 * Check if the input automatically adjusts its size.
 *
 * @return {boolean}
 */
OO.ui.TextInputWidget.prototype.isAutosizing = function () {
	return !!this.autosize;
};

/**
 * Select the entire text of the input.
 *
 * @chainable
 */
OO.ui.TextInputWidget.prototype.select = function () {
	this.$input.select();
	return this;
};

/**
 * Focus the input and move the cursor to the end.
 */
OO.ui.TextInputWidget.prototype.moveCursorToEnd = function () {
	var textRange,
		element = this.$input[ 0 ];
	this.focus();
	if ( element.selectionStart !== undefined ) {
		element.selectionStart = element.selectionEnd = element.value.length;
	} else if ( element.createTextRange ) {
		// IE 8 and below
		textRange = element.createTextRange();
		textRange.collapse( false );
		textRange.select();
	}
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
 * Check if a value is valid.
 *
 * This method returns a promise that resolves with a boolean `true` if the current value is
 * considered valid according to the supplied {@link #validate validation pattern}.
 *
 * @deprecated
 * @return {jQuery.Promise} A promise that resolves to a boolean `true` if the value is valid.
 */
OO.ui.TextInputWidget.prototype.isValid = function () {
	var result;

	if ( this.validate instanceof Function ) {
		result = this.validate( this.getValue() );
		if ( $.isFunction( result.promise ) ) {
			return result.promise();
		} else {
			return $.Deferred().resolve( !!result ).promise();
		}
	} else {
		return $.Deferred().resolve( !!this.getValue().match( this.validate ) ).promise();
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
	var result, promise;

	function rejectOrResolve( valid ) {
		if ( valid ) {
			return $.Deferred().resolve().promise();
		} else {
			return $.Deferred().reject().promise();
		}
	}

	if ( this.validate instanceof Function ) {
		result = this.validate( this.getValue() );

		if ( $.isFunction( result.promise ) ) {
			promise = $.Deferred();

			result.then( function ( valid ) {
				if ( valid ) {
					promise.resolve();
				} else {
					promise.reject();
				}
			}, function () {
				promise.reject();
			} );

			return promise.promise();
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
	this.updatePosition();
	return this;
};

/**
 * Deprecated alias of #setLabelPosition
 *
 * @deprecated Use setLabelPosition instead.
 */
OO.ui.TextInputWidget.prototype.setPosition =
	OO.ui.TextInputWidget.prototype.setLabelPosition;

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

	this.positionLabel();

	return this;
};

/**
 * Update the 'clear' indicator displayed on type: 'search' text fields, hiding it when the field is
 * already empty or when it's not editable.
 */
OO.ui.TextInputWidget.prototype.updateSearchIndicator = function () {
	if ( this.type === 'search' ) {
		if ( this.getValue() === '' || this.isDisabled() || this.isReadOnly() ) {
			this.setIndicator( null );
		} else {
			this.setIndicator( 'clear' );
		}
	}
};

/**
 * Position the label by setting the correct padding on the input.
 *
 * @private
 * @chainable
 */
OO.ui.TextInputWidget.prototype.positionLabel = function () {
	var after, rtl, property;
	// Clear old values
	this.$input
		// Clear old values if present
		.css( {
			'padding-right': '',
			'padding-left': ''
		} );

	if ( this.label ) {
		this.$element.append( this.$label );
	} else {
		this.$label.detach();
		return;
	}

	after = this.labelPosition === 'after';
	rtl = this.$element.css( 'direction' ) === 'rtl';
	property = after === rtl ? 'padding-left' : 'padding-right';

	this.$input.css( property, this.$label.outerWidth( true ) );

	return this;
};

/**
 * @inheritdoc
 */
OO.ui.TextInputWidget.prototype.gatherPreInfuseState = function ( node ) {
	var
		state = OO.ui.TextInputWidget.parent.prototype.gatherPreInfuseState.call( this, node ),
		$input = $( node ).find( '.oo-ui-inputWidget-input' );
	state.$input = $input; // shortcut for performance, used in InputWidget
	if ( this.multiline ) {
		state.scrollTop = $input.scrollTop();
	}
	return state;
};

/**
 * @inheritdoc
 */
OO.ui.TextInputWidget.prototype.restorePreInfuseState = function ( state ) {
	OO.ui.TextInputWidget.parent.prototype.restorePreInfuseState.call( this, state );
	if ( state.scrollTop !== undefined ) {
		this.$input.scrollTop( state.scrollTop );
	}
};

/**
 * ComboBoxWidgets combine a {@link OO.ui.TextInputWidget text input} (where a value
 * can be entered manually) and a {@link OO.ui.MenuSelectWidget menu of options} (from which
 * a value can be chosen instead). Users can choose options from the combo box in one of two ways:
 *
 * - by typing a value in the text input field. If the value exactly matches the value of a menu
 *   option, that option will appear to be selected.
 * - by choosing a value from the menu. The value of the chosen option will then appear in the text
 *   input field.
 *
 * For more information about menus and options, please see the [OOjs UI documentation on MediaWiki][1].
 *
 *     @example
 *     // Example: A ComboBoxWidget.
 *     var comboBox = new OO.ui.ComboBoxWidget( {
 *         label: 'ComboBoxWidget',
 *         input: { value: 'Option One' },
 *         menu: {
 *             items: [
 *                 new OO.ui.MenuOptionWidget( {
 *                     data: 'Option 1',
 *                     label: 'Option One'
 *                 } ),
 *                 new OO.ui.MenuOptionWidget( {
 *                     data: 'Option 2',
 *                     label: 'Option Two'
 *                 } ),
 *                 new OO.ui.MenuOptionWidget( {
 *                     data: 'Option 3',
 *                     label: 'Option Three'
 *                 } ),
 *                 new OO.ui.MenuOptionWidget( {
 *                     data: 'Option 4',
 *                     label: 'Option Four'
 *                 } ),
 *                 new OO.ui.MenuOptionWidget( {
 *                     data: 'Option 5',
 *                     label: 'Option Five'
 *                 } )
 *             ]
 *         }
 *     } );
 *     $( 'body' ).append( comboBox.$element );
 *
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Widgets/Selects_and_Options#Menu_selects_and_options
 *
 * @class
 * @extends OO.ui.Widget
 * @mixins OO.ui.mixin.TabIndexedElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {Object} [menu] Configuration options to pass to the {@link OO.ui.FloatingMenuSelectWidget menu select widget}.
 * @cfg {Object} [input] Configuration options to pass to the {@link OO.ui.TextInputWidget text input widget}.
 * @cfg {jQuery} [$overlay] Render the menu into a separate layer. This configuration is useful in cases where
 *  the expanded menu is larger than its containing `<div>`. The specified overlay layer is usually on top of the
 *  containing `<div>` and has a larger area. By default, the menu uses relative positioning.
 */
OO.ui.ComboBoxWidget = function OoUiComboBoxWidget( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.ComboBoxWidget.parent.call( this, config );

	// Properties (must be set before TabIndexedElement constructor call)
	this.$indicator = this.$( '<span>' );

	// Mixin constructors
	OO.ui.mixin.TabIndexedElement.call( this, $.extend( {}, config, { $tabIndexed: this.$indicator } ) );

	// Properties
	this.$overlay = config.$overlay || this.$element;
	this.input = new OO.ui.TextInputWidget( $.extend(
		{
			indicator: 'down',
			$indicator: this.$indicator,
			disabled: this.isDisabled()
		},
		config.input
	) );
	this.input.$input.eq( 0 ).attr( {
		role: 'combobox',
		'aria-autocomplete': 'list'
	} );
	this.menu = new OO.ui.FloatingMenuSelectWidget( $.extend(
		{
			widget: this,
			input: this.input,
			$container: this.input.$element,
			disabled: this.isDisabled()
		},
		config.menu
	) );

	// Events
	this.$indicator.on( {
		click: this.onClick.bind( this ),
		keypress: this.onKeyPress.bind( this )
	} );
	this.input.connect( this, {
		change: 'onInputChange',
		enter: 'onInputEnter'
	} );
	this.menu.connect( this, {
		choose: 'onMenuChoose',
		add: 'onMenuItemsChange',
		remove: 'onMenuItemsChange'
	} );

	// Initialization
	this.$element.addClass( 'oo-ui-comboBoxWidget' ).append( this.input.$element );
	this.$overlay.append( this.menu.$element );
	this.onMenuItemsChange();
};

/* Setup */

OO.inheritClass( OO.ui.ComboBoxWidget, OO.ui.Widget );
OO.mixinClass( OO.ui.ComboBoxWidget, OO.ui.mixin.TabIndexedElement );

/* Methods */

/**
 * Get the combobox's menu.
 * @return {OO.ui.FloatingMenuSelectWidget} Menu widget
 */
OO.ui.ComboBoxWidget.prototype.getMenu = function () {
	return this.menu;
};

/**
 * Get the combobox's text input widget.
 * @return {OO.ui.TextInputWidget} Text input widget
 */
OO.ui.ComboBoxWidget.prototype.getInput = function () {
	return this.input;
};

/**
 * Handle input change events.
 *
 * @private
 * @param {string} value New value
 */
OO.ui.ComboBoxWidget.prototype.onInputChange = function ( value ) {
	var match = this.menu.getItemFromData( value );

	this.menu.selectItem( match );
	if ( this.menu.getHighlightedItem() ) {
		this.menu.highlightItem( match );
	}

	if ( !this.isDisabled() ) {
		this.menu.toggle( true );
	}
};

/**
 * Handle mouse click events.
 *
 * @private
 * @param {jQuery.Event} e Mouse click event
 */
OO.ui.ComboBoxWidget.prototype.onClick = function ( e ) {
	if ( !this.isDisabled() && e.which === 1 ) {
		this.menu.toggle();
		this.input.$input[ 0 ].focus();
	}
	return false;
};

/**
 * Handle key press events.
 *
 * @private
 * @param {jQuery.Event} e Key press event
 */
OO.ui.ComboBoxWidget.prototype.onKeyPress = function ( e ) {
	if ( !this.isDisabled() && ( e.which === OO.ui.Keys.SPACE || e.which === OO.ui.Keys.ENTER ) ) {
		this.menu.toggle();
		this.input.$input[ 0 ].focus();
		return false;
	}
};

/**
 * Handle input enter events.
 *
 * @private
 */
OO.ui.ComboBoxWidget.prototype.onInputEnter = function () {
	if ( !this.isDisabled() ) {
		this.menu.toggle( false );
	}
};

/**
 * Handle menu choose events.
 *
 * @private
 * @param {OO.ui.OptionWidget} item Chosen item
 */
OO.ui.ComboBoxWidget.prototype.onMenuChoose = function ( item ) {
	this.input.setValue( item.getData() );
};

/**
 * Handle menu item change events.
 *
 * @private
 */
OO.ui.ComboBoxWidget.prototype.onMenuItemsChange = function () {
	var match = this.menu.getItemFromData( this.input.getValue() );
	this.menu.selectItem( match );
	if ( this.menu.getHighlightedItem() ) {
		this.menu.highlightItem( match );
	}
	this.$element.toggleClass( 'oo-ui-comboBoxWidget-empty', this.menu.isEmpty() );
};

/**
 * @inheritdoc
 */
OO.ui.ComboBoxWidget.prototype.setDisabled = function ( disabled ) {
	// Parent method
	OO.ui.ComboBoxWidget.parent.prototype.setDisabled.call( this, disabled );

	if ( this.input ) {
		this.input.setDisabled( this.isDisabled() );
	}
	if ( this.menu ) {
		this.menu.setDisabled( this.isDisabled() );
	}

	return this;
};

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

	// Events
	if ( this.input instanceof OO.ui.InputWidget ) {
		this.$element.on( 'click', this.onClick.bind( this ) );
	}

	// Initialization
	this.$element.addClass( 'oo-ui-labelWidget' );
};

/* Setup */

OO.inheritClass( OO.ui.LabelWidget, OO.ui.Widget );
OO.mixinClass( OO.ui.LabelWidget, OO.ui.mixin.LabelElement );
OO.mixinClass( OO.ui.LabelWidget, OO.ui.mixin.TitledElement );

/* Static Properties */

OO.ui.LabelWidget.static.tagName = 'span';

/* Methods */

/**
 * Handles label mouse click events.
 *
 * @private
 * @param {jQuery.Event} e Mouse click event
 */
OO.ui.LabelWidget.prototype.onClick = function () {
	this.input.simulateLabelClick();
	return false;
};

/**
 * OptionWidgets are special elements that can be selected and configured with data. The
 * data is often unique for each option, but it does not have to be. OptionWidgets are used
 * with OO.ui.SelectWidget to create a selection of mutually exclusive options. For more information
 * and examples, please see the [OOjs UI documentation on MediaWiki][1].
 *
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Widgets/Selects_and_Options
 *
 * @class
 * @extends OO.ui.Widget
 * @mixins OO.ui.mixin.LabelElement
 * @mixins OO.ui.mixin.FlaggedElement
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

	// Properties
	this.selected = false;
	this.highlighted = false;
	this.pressed = false;

	// Initialization
	this.$element
		.data( 'oo-ui-optionWidget', this )
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

/* Static Properties */

OO.ui.OptionWidget.static.selectable = true;

OO.ui.OptionWidget.static.highlightable = true;

OO.ui.OptionWidget.static.pressable = true;

OO.ui.OptionWidget.static.scrollIntoViewOnSelect = false;

/* Methods */

/**
 * Check if the option can be selected.
 *
 * @return {boolean} Item is selectable
 */
OO.ui.OptionWidget.prototype.isSelectable = function () {
	return this.constructor.static.selectable && !this.isDisabled() && this.isVisible();
};

/**
 * Check if the option can be highlighted. A highlight indicates that the option
 * may be selected when a user presses enter or clicks. Disabled items cannot
 * be highlighted.
 *
 * @return {boolean} Item is highlightable
 */
OO.ui.OptionWidget.prototype.isHighlightable = function () {
	return this.constructor.static.highlightable && !this.isDisabled() && this.isVisible();
};

/**
 * Check if the option can be pressed. The pressed state occurs when a user mouses
 * down on an item, but has not yet let go of the mouse.
 *
 * @return {boolean} Item is pressable
 */
OO.ui.OptionWidget.prototype.isPressable = function () {
	return this.constructor.static.pressable && !this.isDisabled() && this.isVisible();
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
 * DecoratedOptionWidgets are {@link OO.ui.OptionWidget options} that can be configured
 * with an {@link OO.ui.mixin.IconElement icon} and/or {@link OO.ui.mixin.IndicatorElement indicator}.
 * This class is used with OO.ui.SelectWidget to create a selection of mutually exclusive
 * options. For more information about options and selects, please see the
 * [OOjs UI documentation on MediaWiki][1].
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
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Widgets/Selects_and_Options
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
 * ButtonOptionWidget is a special type of {@link OO.ui.mixin.ButtonElement button element} that
 * can be selected and configured with data. The class is
 * used with OO.ui.ButtonSelectWidget to create a selection of button options. Please see the
 * [OOjs UI documentation on MediaWiki] [1] for more information.
 *
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Widgets/Selects_and_Options#Button_selects_and_options
 *
 * @class
 * @extends OO.ui.DecoratedOptionWidget
 * @mixins OO.ui.mixin.ButtonElement
 * @mixins OO.ui.mixin.TabIndexedElement
 * @mixins OO.ui.mixin.TitledElement
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
	OO.ui.mixin.TitledElement.call( this, $.extend( {}, config, { $titled: this.$button } ) );
	OO.ui.mixin.TabIndexedElement.call( this, $.extend( {}, config, {
		$tabIndexed: this.$button,
		tabIndex: -1
	} ) );

	// Initialization
	this.$element.addClass( 'oo-ui-buttonOptionWidget' );
	this.$button.append( this.$element.contents() );
	this.$element.append( this.$button );
};

/* Setup */

OO.inheritClass( OO.ui.ButtonOptionWidget, OO.ui.DecoratedOptionWidget );
OO.mixinClass( OO.ui.ButtonOptionWidget, OO.ui.mixin.ButtonElement );
OO.mixinClass( OO.ui.ButtonOptionWidget, OO.ui.mixin.TitledElement );
OO.mixinClass( OO.ui.ButtonOptionWidget, OO.ui.mixin.TabIndexedElement );

/* Static Properties */

// Allow button mouse down events to pass through so they can be handled by the parent select widget
OO.ui.ButtonOptionWidget.static.cancelButtonMouseDownEvents = false;

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
 * RadioOptionWidget is an option widget that looks like a radio button.
 * The class is used with OO.ui.RadioSelectWidget to create a selection of radio options.
 * Please see the [OOjs UI documentation on MediaWiki] [1] for more information.
 *
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Widgets/Selects_and_Options#Button_selects_and_option
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

	// Events
	this.radio.$input.on( 'focus', this.onInputFocus.bind( this ) );

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

OO.ui.RadioOptionWidget.static.highlightable = false;

OO.ui.RadioOptionWidget.static.scrollIntoViewOnSelect = true;

OO.ui.RadioOptionWidget.static.pressable = false;

OO.ui.RadioOptionWidget.static.tagName = 'label';

/* Methods */

/**
 * @param {jQuery.Event} e Focus event
 * @private
 */
OO.ui.RadioOptionWidget.prototype.onInputFocus = function () {
	this.radio.$input.blur();
	this.$element.parent().focus();
};

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
 * MenuOptionWidget is an option widget that looks like a menu item. The class is used with
 * OO.ui.MenuSelectWidget to create a menu of mutually exclusive options. Please see
 * the [OOjs UI documentation on MediaWiki] [1] for more information.
 *
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Widgets/Selects_and_Options#Menu_selects_and_options
 *
 * @class
 * @extends OO.ui.DecoratedOptionWidget
 *
 * @constructor
 * @param {Object} [config] Configuration options
 */
OO.ui.MenuOptionWidget = function OoUiMenuOptionWidget( config ) {
	// Configuration initialization
	config = $.extend( { icon: 'check' }, config );

	// Parent constructor
	OO.ui.MenuOptionWidget.parent.call( this, config );

	// Initialization
	this.$element
		.attr( 'role', 'menuitem' )
		.addClass( 'oo-ui-menuOptionWidget' );
};

/* Setup */

OO.inheritClass( OO.ui.MenuOptionWidget, OO.ui.DecoratedOptionWidget );

/* Static Properties */

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
	this.$element.addClass( 'oo-ui-menuSectionOptionWidget' );
};

/* Setup */

OO.inheritClass( OO.ui.MenuSectionOptionWidget, OO.ui.DecoratedOptionWidget );

/* Static Properties */

OO.ui.MenuSectionOptionWidget.static.selectable = false;

OO.ui.MenuSectionOptionWidget.static.highlightable = false;

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
 * @cfg {boolean} [movable] Allow modification from {@link OO.ui.OutlineControlsWidget outline controls}.
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

OO.ui.OutlineOptionWidget.static.highlightable = false;

OO.ui.OutlineOptionWidget.static.scrollIntoViewOnSelect = true;

OO.ui.OutlineOptionWidget.static.levelClass = 'oo-ui-outlineOptionWidget-level-';

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
 * Set movability.
 *
 * Movability is used by {@link OO.ui.OutlineControlsWidget outline controls}.
 *
 * @param {boolean} movable Item is movable
 * @chainable
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
 * @param {boolean} movable Item is removable
 * @chainable
 */
OO.ui.OutlineOptionWidget.prototype.setRemovable = function ( removable ) {
	this.removable = !!removable;
	this.updateThemeClasses();
	return this;
};

/**
 * Set indentation level.
 *
 * @param {number} [level=0] Indentation level, in the range of [0,#maxLevel]
 * @chainable
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
 * TabOptionWidget is an item in a {@link OO.ui.TabSelectWidget TabSelectWidget}.
 *
 * Currently, this class is only used by {@link OO.ui.IndexLayout index layouts}, which contain
 * {@link OO.ui.CardLayout card layouts}. See {@link OO.ui.IndexLayout IndexLayout}
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
	this.$element.addClass( 'oo-ui-tabOptionWidget' );
};

/* Setup */

OO.inheritClass( OO.ui.TabOptionWidget, OO.ui.OptionWidget );

/* Static Properties */

OO.ui.TabOptionWidget.static.highlightable = false;

/**
 * PopupWidget is a container for content. The popup is overlaid and positioned absolutely.
 * By default, each popup has an anchor that points toward its origin.
 * Please see the [OOjs UI documentation on Mediawiki] [1] for more information and examples.
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
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Widgets/Popups
 *
 * @class
 * @extends OO.ui.Widget
 * @mixins OO.ui.mixin.LabelElement
 * @mixins OO.ui.mixin.ClippableElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {number} [width=320] Width of popup in pixels
 * @cfg {number} [height] Height of popup in pixels. Omit to use the automatic height.
 * @cfg {boolean} [anchor=true] Show anchor pointing to origin of popup
 * @cfg {string} [align='center'] Alignment of the popup: `center`, `force-left`, `force-right`, `backwards` or `forwards`.
 *  If the popup is forced-left the popup body is leaning towards the left. For force-right alignment, the body of the
 *  popup is leaning towards the right of the screen.
 *  Using 'backwards' is a logical direction which will result in the popup leaning towards the beginning of the sentence
 *  in the given language, which means it will flip to the correct positioning in right-to-left languages.
 *  Using 'forward' will also result in a logical alignment where the body of the popup leans towards the end of the
 *  sentence in the given language.
 * @cfg {jQuery} [$container] Constrain the popup to the boundaries of the specified container.
 *  See the [OOjs UI docs on MediaWiki][3] for an example.
 *  [3]: https://www.mediawiki.org/wiki/OOjs_UI/Widgets/Popups#containerExample
 * @cfg {number} [containerPadding=10] Padding between the popup and its container, specified as a number of pixels.
 * @cfg {jQuery} [$content] Content to append to the popup's body
 * @cfg {jQuery} [$footer] Content to append to the popup's footer
 * @cfg {boolean} [autoClose=false] Automatically close the popup when it loses focus.
 * @cfg {jQuery} [$autoCloseIgnore] Elements that will not close the popup when clicked.
 *  This config option is only relevant if #autoClose is set to `true`. See the [OOjs UI docs on MediaWiki][2]
 *  for an example.
 *  [2]: https://www.mediawiki.org/wiki/OOjs_UI/Widgets/Popups#autocloseExample
 * @cfg {boolean} [head] Show a popup header that contains a #label (if specified) and close
 *  button.
 * @cfg {boolean} [padded] Add padding to the popup's body
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

	// Properties
	this.$head = $( '<div>' );
	this.$footer = $( '<div>' );
	this.$anchor = $( '<div>' );
	// If undefined, will be computed lazily in updateDimensions()
	this.$container = config.$container;
	this.containerPadding = config.containerPadding !== undefined ? config.containerPadding : 10;
	this.autoClose = !!config.autoClose;
	this.$autoCloseIgnore = config.$autoCloseIgnore;
	this.transitionTimeout = null;
	this.anchor = null;
	this.width = config.width !== undefined ? config.width : 320;
	this.height = config.height !== undefined ? config.height : null;
	this.setAlignment( config.align );
	this.closeButton = new OO.ui.ButtonWidget( { framed: false, icon: 'close' } );
	this.onMouseDownHandler = this.onMouseDown.bind( this );
	this.onDocumentKeyDownHandler = this.onDocumentKeyDown.bind( this );

	// Events
	this.closeButton.connect( this, { click: 'onCloseButtonClick' } );

	// Initialization
	this.toggleAnchor( config.anchor === undefined || config.anchor );
	this.$body.addClass( 'oo-ui-popupWidget-body' );
	this.$anchor.addClass( 'oo-ui-popupWidget-anchor' );
	this.$head
		.addClass( 'oo-ui-popupWidget-head' )
		.append( this.$label, this.closeButton.$element );
	this.$footer.addClass( 'oo-ui-popupWidget-footer' );
	if ( !config.head ) {
		this.$head.addClass( 'oo-ui-element-hidden' );
	}
	if ( !config.$footer ) {
		this.$footer.addClass( 'oo-ui-element-hidden' );
	}
	this.$popup
		.addClass( 'oo-ui-popupWidget-popup' )
		.append( this.$head, this.$body, this.$footer );
	this.$element
		.addClass( 'oo-ui-popupWidget' )
		.append( this.$popup, this.$anchor );
	// Move content, which was added to #$element by OO.ui.Widget, to the body
	if ( config.$content instanceof jQuery ) {
		this.$body.append( config.$content );
	}
	if ( config.$footer instanceof jQuery ) {
		this.$footer.append( config.$footer );
	}
	if ( config.padded ) {
		this.$body.addClass( 'oo-ui-popupWidget-body-padded' );
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
		!$.contains( this.$element[ 0 ], e.target ) &&
		( !this.$autoCloseIgnore || !this.$autoCloseIgnore.has( e.target ).length )
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
	OO.ui.addCaptureEventListener( this.getElementWindow(), 'mousedown', this.onMouseDownHandler );
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
	OO.ui.removeCaptureEventListener( this.getElementWindow(), 'mousedown', this.onMouseDownHandler );
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
	OO.ui.addCaptureEventListener( this.getElementWindow(), 'keydown', this.onDocumentKeyDownHandler );
};

/**
 * Unbind key down listener.
 *
 * @private
 */
OO.ui.PopupWidget.prototype.unbindKeyDownListener = function () {
	OO.ui.removeCaptureEventListener( this.getElementWindow(), 'keydown', this.onDocumentKeyDownHandler );
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
		} else {
			this.$element.removeClass( 'oo-ui-popupWidget-anchored' );
		}
		this.anchored = show;
	}
};

/**
 * Check if the anchor is visible.
 *
 * @return {boolean} Anchor is visible
 */
OO.ui.PopupWidget.prototype.hasAnchor = function () {
	return this.anchor;
};

/**
 * @inheritdoc
 */
OO.ui.PopupWidget.prototype.toggle = function ( show ) {
	var change;
	show = show === undefined ? !this.isVisible() : !!show;

	change = show !== this.isVisible();

	// Parent method
	OO.ui.PopupWidget.parent.prototype.toggle.call( this, show );

	if ( change ) {
		if ( show ) {
			if ( this.autoClose ) {
				this.bindMouseDownListener();
				this.bindKeyDownListener();
			}
			this.updateDimensions();
			this.toggleClipping( true );
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
	var popupOffset, originOffset, containerLeft, containerWidth, containerRight,
		popupLeft, popupRight, overlapLeft, overlapRight, anchorWidth,
		align = this.align,
		widget = this;

	if ( !this.$container ) {
		// Lazy-initialize $container if not specified in constructor
		this.$container = $( this.getClosestScrollableElementContainer() );
	}

	// Set height and width before measuring things, since it might cause our measurements
	// to change (e.g. due to scrollbars appearing or disappearing)
	this.$popup.css( {
		width: this.width,
		height: this.height !== null ? this.height : 'auto'
	} );

	// If we are in RTL, we need to flip the alignment, unless it is center
	if ( align === 'forwards' || align === 'backwards' ) {
		if ( this.$container.css( 'direction' ) === 'rtl' ) {
			align = ( { forwards: 'force-left', backwards: 'force-right' } )[ this.align ];
		} else {
			align = ( { forwards: 'force-right', backwards: 'force-left' } )[ this.align ];
		}

	}

	// Compute initial popupOffset based on alignment
	popupOffset = this.width * ( { 'force-left': -1, center: -0.5, 'force-right': 0 } )[ align ];

	// Figure out if this will cause the popup to go beyond the edge of the container
	originOffset = this.$element.offset().left;
	containerLeft = this.$container.offset().left;
	containerWidth = this.$container.innerWidth();
	containerRight = containerLeft + containerWidth;
	popupLeft = popupOffset - this.containerPadding;
	popupRight = popupOffset + this.containerPadding + this.width + this.containerPadding;
	overlapLeft = ( originOffset + popupLeft ) - containerLeft;
	overlapRight = containerRight - ( originOffset + popupRight );

	// Adjust offset to make the popup not go beyond the edge, if needed
	if ( overlapRight < 0 ) {
		popupOffset += overlapRight;
	} else if ( overlapLeft < 0 ) {
		popupOffset -= overlapLeft;
	}

	// Adjust offset to avoid anchor being rendered too close to the edge
	// $anchor.width() doesn't work with the pure CSS anchor (returns 0)
	// TODO: Find a measurement that works for CSS anchors and image anchors
	anchorWidth = this.$anchor[ 0 ].scrollWidth * 2;
	if ( popupOffset + this.width < anchorWidth ) {
		popupOffset = anchorWidth - this.width;
	} else if ( -popupOffset < anchorWidth ) {
		popupOffset = -anchorWidth;
	}

	// Prevent transition from being interrupted
	clearTimeout( this.transitionTimeout );
	if ( transition ) {
		// Enable transition
		this.$element.addClass( 'oo-ui-popupWidget-transitioning' );
	}

	// Position body relative to anchor
	this.$popup.css( 'margin-left', popupOffset );

	if ( transition ) {
		// Prevent transitioning after transition is complete
		this.transitionTimeout = setTimeout( function () {
			widget.$element.removeClass( 'oo-ui-popupWidget-transitioning' );
		}, 200 );
	} else {
		// Prevent transitioning immediately
		this.$element.removeClass( 'oo-ui-popupWidget-transitioning' );
	}

	// Reevaluate clipping state since we've relocated and resized the popup
	this.clip();

	return this;
};

/**
 * Set popup alignment
 * @param {string} align Alignment of the popup, `center`, `force-left`, `force-right`,
 *  `backwards` or `forwards`.
 */
OO.ui.PopupWidget.prototype.setAlignment = function ( align ) {
	// Validate alignment and transform deprecated values
	if ( [ 'left', 'right', 'force-left', 'force-right', 'backwards', 'forwards', 'center' ].indexOf( align ) > -1 ) {
		this.align = { left: 'force-right', right: 'force-left' }[ align ] || align;
	} else {
		this.align = 'center';
	}
};

/**
 * Get popup alignment
 * @return {string} align Alignment of the popup, `center`, `force-left`, `force-right`,
 *  `backwards` or `forwards`.
 */
OO.ui.PopupWidget.prototype.getAlignment = function () {
	return this.align;
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
	this.$element.toggleClass( 'oo-ui-progressBarWidget-indeterminate', !progress );
};

/**
 * SearchWidgets combine a {@link OO.ui.TextInputWidget text input field}, where users can type a search query,
 * and a menu of search results, which is displayed beneath the query
 * field. Unlike {@link OO.ui.mixin.LookupElement lookup menus}, search result menus are always visible to the user.
 * Users can choose an item from the menu or type a query into the text field to search for a matching result item.
 * In general, search widgets are used inside a separate {@link OO.ui.Dialog dialog} window.
 *
 * Each time the query is changed, the search result menu is cleared and repopulated. Please see
 * the [OOjs UI demos][1] for an example.
 *
 * [1]: https://tools.wmflabs.org/oojs-ui/oojs-ui/demos/#dialogs-mediawiki-vector-ltr
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
		highlightedItem = this.results.getHighlightedItem();
		if ( !highlightedItem ) {
			highlightedItem = this.results.getSelectedItem();
		}
		nextItem = this.results.getRelativeSelectableItem( highlightedItem, dir );
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
	var highlightedItem = this.results.getHighlightedItem();
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

/**
 * A SelectWidget is of a generic selection of options. The OOjs UI library contains several types of
 * select widgets, including {@link OO.ui.ButtonSelectWidget button selects},
 * {@link OO.ui.RadioSelectWidget radio selects}, and {@link OO.ui.MenuSelectWidget
 * menu selects}.
 *
 * This class should be used together with OO.ui.OptionWidget or OO.ui.DecoratedOptionWidget. For more
 * information, please see the [OOjs UI documentation on MediaWiki][1].
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
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Widgets/Selects_and_Options
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
 *  the [OOjs UI documentation on MediaWiki] [2] for examples.
 *  [2]: https://www.mediawiki.org/wiki/OOjs_UI/Widgets/Selects_and_Options
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

	// Events
	this.connect( this, {
		toggle: 'onToggle'
	} );
	this.$element.on( {
		mousedown: this.onMouseDown.bind( this ),
		mouseover: this.onMouseOver.bind( this ),
		mouseleave: this.onMouseLeave.bind( this )
	} );

	// Initialization
	this.$element
		.addClass( 'oo-ui-selectWidget oo-ui-selectWidget-depressed' )
		.attr( 'role', 'listbox' );
	if ( Array.isArray( config.items ) ) {
		this.addItems( config.items );
	}
};

/* Setup */

OO.inheritClass( OO.ui.SelectWidget, OO.ui.Widget );

// Need to mixin base class as well
OO.mixinClass( OO.ui.SelectWidget, OO.ui.mixin.GroupElement );
OO.mixinClass( OO.ui.SelectWidget, OO.ui.mixin.GroupWidget );

/* Static */
OO.ui.SelectWidget.static.passAllFilter = function () {
	return true;
};

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
 * Handle mouse down events.
 *
 * @private
 * @param {jQuery.Event} e Mouse down event
 */
OO.ui.SelectWidget.prototype.onMouseDown = function ( e ) {
	var item;

	if ( !this.isDisabled() && e.which === 1 ) {
		this.togglePressed( true );
		item = this.getTargetItem( e );
		if ( item && item.isSelectable() ) {
			this.pressItem( item );
			this.selecting = item;
			OO.ui.addCaptureEventListener(
				this.getElementDocument(),
				'mouseup',
				this.onMouseUpHandler
			);
			OO.ui.addCaptureEventListener(
				this.getElementDocument(),
				'mousemove',
				this.onMouseMoveHandler
			);
		}
	}
	return false;
};

/**
 * Handle mouse up events.
 *
 * @private
 * @param {jQuery.Event} e Mouse up event
 */
OO.ui.SelectWidget.prototype.onMouseUp = function ( e ) {
	var item;

	this.togglePressed( false );
	if ( !this.selecting ) {
		item = this.getTargetItem( e );
		if ( item && item.isSelectable() ) {
			this.selecting = item;
		}
	}
	if ( !this.isDisabled() && e.which === 1 && this.selecting ) {
		this.pressItem( null );
		this.chooseItem( this.selecting );
		this.selecting = null;
	}

	OO.ui.removeCaptureEventListener( this.getElementDocument(), 'mouseup',
		this.onMouseUpHandler );
	OO.ui.removeCaptureEventListener( this.getElementDocument(), 'mousemove',
		this.onMouseMoveHandler );

	return false;
};

/**
 * Handle mouse move events.
 *
 * @private
 * @param {jQuery.Event} e Mouse move event
 */
OO.ui.SelectWidget.prototype.onMouseMove = function ( e ) {
	var item;

	if ( !this.isDisabled() && this.pressed ) {
		item = this.getTargetItem( e );
		if ( item && item !== this.selecting && item.isSelectable() ) {
			this.pressItem( item );
			this.selecting = item;
		}
	}
	return false;
};

/**
 * Handle mouse over events.
 *
 * @private
 * @param {jQuery.Event} e Mouse over event
 */
OO.ui.SelectWidget.prototype.onMouseOver = function ( e ) {
	var item;

	if ( !this.isDisabled() ) {
		item = this.getTargetItem( e );
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
 * @param {jQuery.Event} e Key down event
 */
OO.ui.SelectWidget.prototype.onKeyDown = function ( e ) {
	var nextItem,
		handled = false,
		currentItem = this.getHighlightedItem() || this.getSelectedItem();

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
				nextItem = this.getRelativeSelectableItem( currentItem, -1 );
				handled = true;
				break;
			case OO.ui.Keys.DOWN:
			case OO.ui.Keys.RIGHT:
				this.clearKeyPressBuffer();
				nextItem = this.getRelativeSelectableItem( currentItem, 1 );
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
			nextItem.scrollElementIntoView();
		}

		if ( handled ) {
			// Can't just return false, because e is not always a jQuery event
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
	OO.ui.addCaptureEventListener( this.getElementWindow(), 'keydown', this.onKeyDownHandler );
};

/**
 * Unbind key down listener.
 *
 * @protected
 */
OO.ui.SelectWidget.prototype.unbindKeyDownListener = function () {
	OO.ui.removeCaptureEventListener( this.getElementWindow(), 'keydown', this.onKeyDownHandler );
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
 * @param {jQuery.Event} e Key press event
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

	item = this.getHighlightedItem() || this.getSelectedItem();

	if ( this.keyPressBuffer === c ) {
		// Common (if weird) special case: typing "xxxx" will cycle through all
		// the items beginning with "x".
		if ( item ) {
			item = this.getRelativeSelectableItem( item, 1 );
		}
	} else {
		this.keyPressBuffer += c;
	}

	filter = this.getItemMatcher( this.keyPressBuffer, false );
	if ( !item || !filter( item ) ) {
		item = this.getRelativeSelectableItem( item, 1, filter );
	}
	if ( item ) {
		if ( item.constructor.static.highlightable ) {
			this.highlightItem( item );
		} else {
			this.chooseItem( item );
		}
		item.scrollElementIntoView();
	}

	return false;
};

/**
 * Get a matcher for the specific string
 *
 * @protected
 * @param {string} s String to match against items
 * @param {boolean} [exact=false] Only accept exact matches
 * @return {Function} function ( OO.ui.OptionItem ) => boolean
 */
OO.ui.SelectWidget.prototype.getItemMatcher = function ( s, exact ) {
	var re;

	if ( s.normalize ) {
		s = s.normalize();
	}
	s = exact ? s.trim() : s.replace( /^\s+/, '' );
	re = '^\\s*' + s.replace( /([\\{}()|.?*+\-\^$\[\]])/g, '\\$1' ).replace( /\s+/g, '\\s+' );
	if ( exact ) {
		re += '\\s*$';
	}
	re = new RegExp( re, 'i' );
	return function ( item ) {
		var l = item.getLabel();
		if ( typeof l !== 'string' ) {
			l = item.$label.text();
		}
		if ( l.normalize ) {
			l = l.normalize();
		}
		return re.test( l );
	};
};

/**
 * Bind key press listener.
 *
 * @protected
 */
OO.ui.SelectWidget.prototype.bindKeyPressListener = function () {
	OO.ui.addCaptureEventListener( this.getElementWindow(), 'keypress', this.onKeyPressHandler );
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
	OO.ui.removeCaptureEventListener( this.getElementWindow(), 'keypress', this.onKeyPressHandler );
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
OO.ui.SelectWidget.prototype.getTargetItem = function ( e ) {
	return $( e.target ).closest( '.oo-ui-optionWidget' ).data( 'oo-ui-optionWidget' ) || null;
};

/**
 * Get selected item.
 *
 * @return {OO.ui.OptionWidget|null} Selected item, `null` if no item is selected
 */
OO.ui.SelectWidget.prototype.getSelectedItem = function () {
	var i, len;

	for ( i = 0, len = this.items.length; i < len; i++ ) {
		if ( this.items[ i ].isSelected() ) {
			return this.items[ i ];
		}
	}
	return null;
};

/**
 * Get highlighted item.
 *
 * @return {OO.ui.OptionWidget|null} Highlighted item, `null` if no item is highlighted
 */
OO.ui.SelectWidget.prototype.getHighlightedItem = function () {
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
	var itemFromData = this.getItemFromData( data );
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
 * Get an option by its position relative to the specified item (or to the start of the option array,
 * if item is `null`). The direction in which to search through the option array is specified with a
 * number: -1 for reverse (the default) or 1 for forward. The method will return an option, or
 * `null` if there are no options in the array.
 *
 * @param {OO.ui.OptionWidget|null} item Item to describe the start position, or `null` to start at the beginning of the array.
 * @param {number} direction Direction to move in: -1 to move backward, 1 to move forward
 * @param {Function} filter Only consider items for which this function returns
 *  true. Function takes an OO.ui.OptionWidget and returns a boolean.
 * @return {OO.ui.OptionWidget|null} Item at position, `null` if there are no items in the select
 */
OO.ui.SelectWidget.prototype.getRelativeSelectableItem = function ( item, direction, filter ) {
	var currentIndex, nextIndex, i,
		increase = direction > 0 ? 1 : -1,
		len = this.items.length;

	if ( !$.isFunction( filter ) ) {
		filter = OO.ui.SelectWidget.static.passAllFilter;
	}

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
		if ( item instanceof OO.ui.OptionWidget && item.isSelectable() && filter( item ) ) {
			return item;
		}
		nextIndex = ( nextIndex + increase + len ) % len;
	}
	return null;
};

/**
 * Get the next selectable item or `null` if there are no selectable items.
 * Disabled options and menu-section markers and breaks are not selectable.
 *
 * @return {OO.ui.OptionWidget|null} Item, `null` if there aren't any selectable items
 */
OO.ui.SelectWidget.prototype.getFirstSelectableItem = function () {
	var i, len, item;

	for ( i = 0, len = this.items.length; i < len; i++ ) {
		item = this.items[ i ];
		if ( item instanceof OO.ui.OptionWidget && item.isSelectable() ) {
			return item;
		}
	}

	return null;
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
 * ButtonSelectWidget is a {@link OO.ui.SelectWidget select widget} that contains
 * button options and is used together with
 * OO.ui.ButtonOptionWidget. The ButtonSelectWidget provides an interface for
 * highlighting, choosing, and selecting mutually exclusive options. Please see
 * the [OOjs UI documentation on MediaWiki] [1] for more information.
 *
 *     @example
 *     // Example: A ButtonSelectWidget that contains three ButtonOptionWidgets
 *     var option1 = new OO.ui.ButtonOptionWidget( {
 *         data: 1,
 *         label: 'Option 1',
 *         title: 'Button option 1'
 *     } );
 *
 *     var option2 = new OO.ui.ButtonOptionWidget( {
 *         data: 2,
 *         label: 'Option 2',
 *         title: 'Button option 2'
 *     } );
 *
 *     var option3 = new OO.ui.ButtonOptionWidget( {
 *         data: 3,
 *         label: 'Option 3',
 *         title: 'Button option 3'
 *     } );
 *
 *     var buttonSelect=new OO.ui.ButtonSelectWidget( {
 *         items: [ option1, option2, option3 ]
 *     } );
 *     $( 'body' ).append( buttonSelect.$element );
 *
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Widgets/Selects_and_Options
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
		focus: this.bindKeyDownListener.bind( this ),
		blur: this.unbindKeyDownListener.bind( this )
	} );

	// Initialization
	this.$element.addClass( 'oo-ui-buttonSelectWidget' );
};

/* Setup */

OO.inheritClass( OO.ui.ButtonSelectWidget, OO.ui.SelectWidget );
OO.mixinClass( OO.ui.ButtonSelectWidget, OO.ui.mixin.TabIndexedElement );

/**
 * RadioSelectWidget is a {@link OO.ui.SelectWidget select widget} that contains radio
 * options and is used together with OO.ui.RadioOptionWidget. The RadioSelectWidget provides
 * an interface for adding, removing and selecting options.
 * Please see the [OOjs UI documentation on MediaWiki][1] for more information.
 *
 * If you want to use this within a HTML form, such as a OO.ui.FormLayout, use
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
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Widgets/Selects_and_Options

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
 * MenuSelectWidget is a {@link OO.ui.SelectWidget select widget} that contains options and
 * is used together with OO.ui.MenuOptionWidget. It is designed be used as part of another widget.
 * See {@link OO.ui.DropdownWidget DropdownWidget}, {@link OO.ui.ComboBoxWidget ComboBoxWidget},
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
 * Please see the [OOjs UI documentation on MediaWiki][1] for more information.
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Widgets/Selects_and_Options
 *
 * @class
 * @extends OO.ui.SelectWidget
 * @mixins OO.ui.mixin.ClippableElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {OO.ui.TextInputWidget} [input] Text input used to implement option highlighting for menu items that match
 *  the text the user types. This config is used by {@link OO.ui.ComboBoxWidget ComboBoxWidget}
 *  and {@link OO.ui.mixin.LookupElement LookupElement}
 * @cfg {jQuery} [$input] Text input used to implement option highlighting for menu items that match
 *  the text the user types. This config is used by {@link OO.ui.CapsuleMultiSelectWidget CapsuleMultiSelectWidget}
 * @cfg {OO.ui.Widget} [widget] Widget associated with the menu's active state. If the user clicks the mouse
 *  anywhere on the page outside of this widget, the menu is hidden. For example, if there is a button
 *  that toggles the menu's visibility on click, the menu will be hidden then re-shown when the user clicks
 *  that button, unless the button (or its parent widget) is passed in here.
 * @cfg {boolean} [autoHide=true] Hide the menu when the mouse is pressed outside the menu.
 * @cfg {boolean} [filterFromInput=false] Filter the displayed options from the input
 */
OO.ui.MenuSelectWidget = function OoUiMenuSelectWidget( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.MenuSelectWidget.parent.call( this, config );

	// Mixin constructors
	OO.ui.mixin.ClippableElement.call( this, $.extend( {}, config, { $clippable: this.$group } ) );

	// Properties
	this.newItems = null;
	this.autoHide = config.autoHide === undefined || !!config.autoHide;
	this.filterFromInput = !!config.filterFromInput;
	this.$input = config.$input ? config.$input : config.input ? config.input.$input : null;
	this.$widget = config.widget ? config.widget.$element : null;
	this.onDocumentMouseDownHandler = this.onDocumentMouseDown.bind( this );
	this.onInputEditHandler = OO.ui.debounce( this.updateItemVisibility.bind( this ), 100 );

	// Initialization
	this.$element
		.addClass( 'oo-ui-menuSelectWidget' )
		.attr( 'role', 'menu' );

	// Initially hidden - using #toggle may cause errors if subclasses override toggle with methods
	// that reference properties not initialized at that time of parent class construction
	// TODO: Find a better way to handle post-constructor setup
	this.visible = false;
	this.$element.addClass( 'oo-ui-element-hidden' );
};

/* Setup */

OO.inheritClass( OO.ui.MenuSelectWidget, OO.ui.SelectWidget );
OO.mixinClass( OO.ui.MenuSelectWidget, OO.ui.mixin.ClippableElement );

/* Methods */

/**
 * Handles document mouse down events.
 *
 * @protected
 * @param {jQuery.Event} e Key down event
 */
OO.ui.MenuSelectWidget.prototype.onDocumentMouseDown = function ( e ) {
	if (
		!OO.ui.contains( this.$element[ 0 ], e.target, true ) &&
		( !this.$widget || !OO.ui.contains( this.$widget[ 0 ], e.target, true ) )
	) {
		this.toggle( false );
	}
};

/**
 * @inheritdoc
 */
OO.ui.MenuSelectWidget.prototype.onKeyDown = function ( e ) {
	var currentItem = this.getHighlightedItem() || this.getSelectedItem();

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
 * Update menu item visibility after input changes.
 * @protected
 */
OO.ui.MenuSelectWidget.prototype.updateItemVisibility = function () {
	var i, item,
		len = this.items.length,
		showAll = !this.isVisible(),
		filter = showAll ? null : this.getItemMatcher( this.$input.val() );

	for ( i = 0; i < len; i++ ) {
		item = this.items[ i ];
		if ( item instanceof OO.ui.OptionWidget ) {
			item.toggle( showAll || filter( item ) );
		}
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
 * When a user chooses an item, the menu is closed.
 *
 * Note that ‘choose’ should never be modified programmatically. A user can choose an option with the keyboard
 * or mouse and it becomes selected. To select an item programmatically, use the #selectItem method.
 * @param {OO.ui.OptionWidget} item Item to choose
 * @chainable
 */
OO.ui.MenuSelectWidget.prototype.chooseItem = function ( item ) {
	OO.ui.MenuSelectWidget.parent.prototype.chooseItem.call( this, item );
	this.toggle( false );
	return this;
};

/**
 * @inheritdoc
 */
OO.ui.MenuSelectWidget.prototype.addItems = function ( items, index ) {
	var i, len, item;

	// Parent method
	OO.ui.MenuSelectWidget.parent.prototype.addItems.call( this, items, index );

	// Auto-initialize
	if ( !this.newItems ) {
		this.newItems = [];
	}

	for ( i = 0, len = items.length; i < len; i++ ) {
		item = items[ i ];
		if ( this.isVisible() ) {
			// Defer fitting label until item has been attached
			item.fitLabel();
		} else {
			this.newItems.push( item );
		}
	}

	// Reevaluate clipping
	this.clip();

	return this;
};

/**
 * @inheritdoc
 */
OO.ui.MenuSelectWidget.prototype.removeItems = function ( items ) {
	// Parent method
	OO.ui.MenuSelectWidget.parent.prototype.removeItems.call( this, items );

	// Reevaluate clipping
	this.clip();

	return this;
};

/**
 * @inheritdoc
 */
OO.ui.MenuSelectWidget.prototype.clearItems = function () {
	// Parent method
	OO.ui.MenuSelectWidget.parent.prototype.clearItems.call( this );

	// Reevaluate clipping
	this.clip();

	return this;
};

/**
 * @inheritdoc
 */
OO.ui.MenuSelectWidget.prototype.toggle = function ( visible ) {
	var i, len, change;

	visible = ( visible === undefined ? !this.visible : !!visible ) && !!this.items.length;
	change = visible !== this.isVisible();

	// Parent method
	OO.ui.MenuSelectWidget.parent.prototype.toggle.call( this, visible );

	if ( change ) {
		if ( visible ) {
			this.bindKeyDownListener();
			this.bindKeyPressListener();

			if ( this.newItems && this.newItems.length ) {
				for ( i = 0, len = this.newItems.length; i < len; i++ ) {
					this.newItems[ i ].fitLabel();
				}
				this.newItems = null;
			}
			this.toggleClipping( true );

			// Auto-hide
			if ( this.autoHide ) {
				OO.ui.addCaptureEventListener( this.getElementDocument(), 'mousedown', this.onDocumentMouseDownHandler );
			}
		} else {
			this.unbindKeyDownListener();
			this.unbindKeyPressListener();
			OO.ui.removeCaptureEventListener( this.getElementDocument(), 'mousedown', this.onDocumentMouseDownHandler );
			this.toggleClipping( false );
		}
	}

	return this;
};

/**
 * FloatingMenuSelectWidget is a menu that will stick under a specified
 * container, even when it is inserted elsewhere in the document (for example,
 * in a OO.ui.Window's $overlay). This is sometimes necessary to prevent the
 * menu from being clipped too aggresively.
 *
 * The menu's position is automatically calculated and maintained when the menu
 * is toggled or the window is resized.
 *
 * See OO.ui.ComboBoxWidget for an example of a widget that uses this class.
 *
 * @class
 * @extends OO.ui.MenuSelectWidget
 * @mixins OO.ui.mixin.FloatableElement
 *
 * @constructor
 * @param {OO.ui.Widget} [inputWidget] Widget to provide the menu for.
 *   Deprecated, omit this parameter and specify `$container` instead.
 * @param {Object} [config] Configuration options
 * @cfg {jQuery} [$container=inputWidget.$element] Element to render menu under
 */
OO.ui.FloatingMenuSelectWidget = function OoUiFloatingMenuSelectWidget( inputWidget, config ) {
	// Allow 'inputWidget' parameter and config for backwards compatibility
	if ( OO.isPlainObject( inputWidget ) && config === undefined ) {
		config = inputWidget;
		inputWidget = config.inputWidget;
	}

	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.FloatingMenuSelectWidget.parent.call( this, config );

	// Properties (must be set before mixin constructors)
	this.inputWidget = inputWidget; // For backwards compatibility
	this.$container = config.$container || this.inputWidget.$element;

	// Mixins constructors
	OO.ui.mixin.FloatableElement.call( this, $.extend( {}, config, { $floatableContainer: this.$container } ) );

	// Initialization
	this.$element.addClass( 'oo-ui-floatingMenuSelectWidget' );
	// For backwards compatibility
	this.$element.addClass( 'oo-ui-textInputMenuSelectWidget' );
};

/* Setup */

OO.inheritClass( OO.ui.FloatingMenuSelectWidget, OO.ui.MenuSelectWidget );
OO.mixinClass( OO.ui.FloatingMenuSelectWidget, OO.ui.mixin.FloatableElement );

// For backwards compatibility
OO.ui.TextInputMenuSelectWidget = OO.ui.FloatingMenuSelectWidget;

/* Methods */

/**
 * @inheritdoc
 */
OO.ui.FloatingMenuSelectWidget.prototype.toggle = function ( visible ) {
	var change;
	visible = visible === undefined ? !this.isVisible() : !!visible;
	change = visible !== this.isVisible();

	if ( change && visible ) {
		// Make sure the width is set before the parent method runs.
		this.setIdealSize( this.$container.width() );
	}

	// Parent method
	// This will call this.clip(), which is nonsensical since we're not positioned yet...
	OO.ui.FloatingMenuSelectWidget.parent.prototype.toggle.call( this, visible );

	if ( change ) {
		this.togglePositioning( this.isVisible() );
	}

	return this;
};

/**
 * OutlineSelectWidget is a structured list that contains {@link OO.ui.OutlineOptionWidget outline options}
 * A set of controls can be provided with an {@link OO.ui.OutlineControlsWidget outline controls} widget.
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
		focus: this.bindKeyDownListener.bind( this ),
		blur: this.unbindKeyDownListener.bind( this )
	} );

	// Initialization
	this.$element.addClass( 'oo-ui-outlineSelectWidget' );
};

/* Setup */

OO.inheritClass( OO.ui.OutlineSelectWidget, OO.ui.SelectWidget );
OO.mixinClass( OO.ui.OutlineSelectWidget, OO.ui.mixin.TabIndexedElement );

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
 */
OO.ui.TabSelectWidget = function OoUiTabSelectWidget( config ) {
	// Parent constructor
	OO.ui.TabSelectWidget.parent.call( this, config );

	// Mixin constructors
	OO.ui.mixin.TabIndexedElement.call( this, config );

	// Events
	this.$element.on( {
		focus: this.bindKeyDownListener.bind( this ),
		blur: this.unbindKeyDownListener.bind( this )
	} );

	// Initialization
	this.$element.addClass( 'oo-ui-tabSelectWidget' );
};

/* Setup */

OO.inheritClass( OO.ui.TabSelectWidget, OO.ui.SelectWidget );
OO.mixinClass( OO.ui.TabSelectWidget, OO.ui.mixin.TabIndexedElement );

/**
 * NumberInputWidgets combine a {@link OO.ui.TextInputWidget text input} (where a value
 * can be entered manually) and two {@link OO.ui.ButtonWidget button widgets}
 * (to adjust the value in increments) to allow the user to enter a number.
 *
 *     @example
 *     // Example: A NumberInputWidget.
 *     var numberInput = new OO.ui.NumberInputWidget( {
 *         label: 'NumberInputWidget',
 *         input: { value: 5, min: 1, max: 10 }
 *     } );
 *     $( 'body' ).append( numberInput.$element );
 *
 * @class
 * @extends OO.ui.Widget
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {Object} [input] Configuration options to pass to the {@link OO.ui.TextInputWidget text input widget}.
 * @cfg {Object} [minusButton] Configuration options to pass to the {@link OO.ui.ButtonWidget decrementing button widget}.
 * @cfg {Object} [plusButton] Configuration options to pass to the {@link OO.ui.ButtonWidget incrementing button widget}.
 * @cfg {boolean} [isInteger=false] Whether the field accepts only integer values.
 * @cfg {number} [min=-Infinity] Minimum allowed value
 * @cfg {number} [max=Infinity] Maximum allowed value
 * @cfg {number} [step=1] Delta when using the buttons or up/down arrow keys
 * @cfg {number|null} [pageStep] Delta when using the page-up/page-down keys. Defaults to 10 times #step.
 */
OO.ui.NumberInputWidget = function OoUiNumberInputWidget( config ) {
	// Configuration initialization
	config = $.extend( {
		isInteger: false,
		min: -Infinity,
		max: Infinity,
		step: 1,
		pageStep: null
	}, config );

	// Parent constructor
	OO.ui.NumberInputWidget.parent.call( this, config );

	// Properties
	this.input = new OO.ui.TextInputWidget( $.extend(
		{
			disabled: this.isDisabled()
		},
		config.input
	) );
	this.minusButton = new OO.ui.ButtonWidget( $.extend(
		{
			disabled: this.isDisabled(),
			tabIndex: -1
		},
		config.minusButton,
		{
			classes: [ 'oo-ui-numberInputWidget-minusButton' ],
			label: '−'
		}
	) );
	this.plusButton = new OO.ui.ButtonWidget( $.extend(
		{
			disabled: this.isDisabled(),
			tabIndex: -1
		},
		config.plusButton,
		{
			classes: [ 'oo-ui-numberInputWidget-plusButton' ],
			label: '+'
		}
	) );

	// Events
	this.input.connect( this, {
		change: this.emit.bind( this, 'change' ),
		enter: this.emit.bind( this, 'enter' )
	} );
	this.input.$input.on( {
		keydown: this.onKeyDown.bind( this ),
		'wheel mousewheel DOMMouseScroll': this.onWheel.bind( this )
	} );
	this.plusButton.connect( this, {
		click: [ 'onButtonClick', +1 ]
	} );
	this.minusButton.connect( this, {
		click: [ 'onButtonClick', -1 ]
	} );

	// Initialization
	this.setIsInteger( !!config.isInteger );
	this.setRange( config.min, config.max );
	this.setStep( config.step, config.pageStep );

	this.$field = $( '<div>' ).addClass( 'oo-ui-numberInputWidget-field' )
		.append(
			this.minusButton.$element,
			this.input.$element,
			this.plusButton.$element
		);
	this.$element.addClass( 'oo-ui-numberInputWidget' ).append( this.$field );
	this.input.setValidation( this.validateNumber.bind( this ) );
};

/* Setup */

OO.inheritClass( OO.ui.NumberInputWidget, OO.ui.Widget );

/* Events */

/**
 * A `change` event is emitted when the value of the input changes.
 *
 * @event change
 */

/**
 * An `enter` event is emitted when the user presses 'enter' inside the text box.
 *
 * @event enter
 */

/* Methods */

/**
 * Set whether only integers are allowed
 * @param {boolean} flag
 */
OO.ui.NumberInputWidget.prototype.setIsInteger = function ( flag ) {
	this.isInteger = !!flag;
	this.input.setValidityFlag();
};

/**
 * Get whether only integers are allowed
 * @return {boolean} Flag value
 */
OO.ui.NumberInputWidget.prototype.getIsInteger = function () {
	return this.isInteger;
};

/**
 * Set the range of allowed values
 * @param {number} min Minimum allowed value
 * @param {number} max Maximum allowed value
 */
OO.ui.NumberInputWidget.prototype.setRange = function ( min, max ) {
	if ( min > max ) {
		throw new Error( 'Minimum (' + min + ') must not be greater than maximum (' + max + ')' );
	}
	this.min = min;
	this.max = max;
	this.input.setValidityFlag();
};

/**
 * Get the current range
 * @return {number[]} Minimum and maximum values
 */
OO.ui.NumberInputWidget.prototype.getRange = function () {
	return [ this.min, this.max ];
};

/**
 * Set the stepping deltas
 * @param {number} step Normal step
 * @param {number|null} pageStep Page step. If null, 10 * step will be used.
 */
OO.ui.NumberInputWidget.prototype.setStep = function ( step, pageStep ) {
	if ( step <= 0 ) {
		throw new Error( 'Step value must be positive' );
	}
	if ( pageStep === null ) {
		pageStep = step * 10;
	} else if ( pageStep <= 0 ) {
		throw new Error( 'Page step value must be positive' );
	}
	this.step = step;
	this.pageStep = pageStep;
};

/**
 * Get the current stepping values
 * @return {number[]} Step and page step
 */
OO.ui.NumberInputWidget.prototype.getStep = function () {
	return [ this.step, this.pageStep ];
};

/**
 * Get the current value of the widget
 * @return {string}
 */
OO.ui.NumberInputWidget.prototype.getValue = function () {
	return this.input.getValue();
};

/**
 * Get the current value of the widget as a number
 * @return {number} May be NaN, or an invalid number
 */
OO.ui.NumberInputWidget.prototype.getNumericValue = function () {
	return +this.input.getValue();
};

/**
 * Set the value of the widget
 * @param {string} value Invalid values are allowed
 */
OO.ui.NumberInputWidget.prototype.setValue = function ( value ) {
	this.input.setValue( value );
};

/**
 * Adjust the value of the widget
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
		if ( this.isInteger ) {
			n = Math.round( n );
		}
	}

	if ( n !== v ) {
		this.setValue( n );
	}
};

/**
 * Validate input
 * @private
 * @param {string} value Field value
 * @return {boolean}
 */
OO.ui.NumberInputWidget.prototype.validateNumber = function ( value ) {
	var n = +value;
	if ( isNaN( n ) || !isFinite( n ) ) {
		return false;
	}

	/*jshint bitwise: false */
	if ( this.isInteger && ( n | 0 ) !== n ) {
		return false;
	}
	/*jshint bitwise: true */

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
	this.adjustValue( dir * this.step );
};

/**
 * Handle mouse wheel events.
 *
 * @private
 * @param {jQuery.Event} event
 */
OO.ui.NumberInputWidget.prototype.onWheel = function ( event ) {
	var delta = 0;

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
		this.adjustValue( delta * this.step );
	}

	return false;
};

/**
 * Handle key down events.
 *
 * @private
 * @param {jQuery.Event} e Key down event
 */
OO.ui.NumberInputWidget.prototype.onKeyDown = function ( e ) {
	if ( !this.isDisabled() ) {
		switch ( e.which ) {
			case OO.ui.Keys.UP:
				this.adjustValue( this.step );
				return false;
			case OO.ui.Keys.DOWN:
				this.adjustValue( -this.step );
				return false;
			case OO.ui.Keys.PAGEUP:
				this.adjustValue( this.pageStep );
				return false;
			case OO.ui.Keys.PAGEDOWN:
				this.adjustValue( -this.pageStep );
				return false;
		}
	}
};

/**
 * @inheritdoc
 */
OO.ui.NumberInputWidget.prototype.setDisabled = function ( disabled ) {
	// Parent method
	OO.ui.NumberInputWidget.parent.prototype.setDisabled.call( this, disabled );

	if ( this.input ) {
		this.input.setDisabled( this.isDisabled() );
	}
	if ( this.minusButton ) {
		this.minusButton.setDisabled( this.isDisabled() );
	}
	if ( this.plusButton ) {
		this.plusButton.setDisabled( this.isDisabled() );
	}

	return this;
};

/**
 * ToggleSwitches are switches that slide on and off. Their state is represented by a Boolean
 * value (`true` for ‘on’, and `false` otherwise, the default). The ‘off’ state is represented
 * visually by a slider in the leftmost position.
 *
 *     @example
 *     // Toggle switches in the 'off' and 'on' position.
 *     var toggleSwitch1 = new OO.ui.ToggleSwitchWidget();
 *     var toggleSwitch2 = new OO.ui.ToggleSwitchWidget( {
 *         value: true
 *     } );
 *
 *     // Create a FieldsetLayout to layout and label switches
 *     var fieldset = new OO.ui.FieldsetLayout( {
 *        label: 'Toggle switches'
 *     } );
 *     fieldset.addItems( [
 *         new OO.ui.FieldLayout( toggleSwitch1, { label: 'Off', align: 'top' } ),
 *         new OO.ui.FieldLayout( toggleSwitch2, { label: 'On', align: 'top' } )
 *     ] );
 *     $( 'body' ).append( fieldset.$element );
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
 */
OO.ui.ToggleSwitchWidget.prototype.onClick = function ( e ) {
	if ( !this.isDisabled() && e.which === 1 ) {
		this.setValue( !this.value );
	}
	return false;
};

/**
 * Handle key press events.
 *
 * @private
 * @param {jQuery.Event} e Key press event
 */
OO.ui.ToggleSwitchWidget.prototype.onKeyPress = function ( e ) {
	if ( !this.isDisabled() && ( e.which === OO.ui.Keys.SPACE || e.which === OO.ui.Keys.ENTER ) ) {
		this.setValue( !this.value );
		return false;
	}
};

/*!
 * Deprecated aliases for classes in the `OO.ui.mixin` namespace.
 */

/**
 * @inheritdoc OO.ui.mixin.ButtonElement
 * @deprecated Use {@link OO.ui.mixin.ButtonElement} instead.
 */
OO.ui.ButtonElement = OO.ui.mixin.ButtonElement;

/**
 * @inheritdoc OO.ui.mixin.ClippableElement
 * @deprecated Use {@link OO.ui.mixin.ClippableElement} instead.
 */
OO.ui.ClippableElement = OO.ui.mixin.ClippableElement;

/**
 * @inheritdoc OO.ui.mixin.DraggableElement
 * @deprecated Use {@link OO.ui.mixin.DraggableElement} instead.
 */
OO.ui.DraggableElement = OO.ui.mixin.DraggableElement;

/**
 * @inheritdoc OO.ui.mixin.DraggableGroupElement
 * @deprecated Use {@link OO.ui.mixin.DraggableGroupElement} instead.
 */
OO.ui.DraggableGroupElement = OO.ui.mixin.DraggableGroupElement;

/**
 * @inheritdoc OO.ui.mixin.FlaggedElement
 * @deprecated Use {@link OO.ui.mixin.FlaggedElement} instead.
 */
OO.ui.FlaggedElement = OO.ui.mixin.FlaggedElement;

/**
 * @inheritdoc OO.ui.mixin.GroupElement
 * @deprecated Use {@link OO.ui.mixin.GroupElement} instead.
 */
OO.ui.GroupElement = OO.ui.mixin.GroupElement;

/**
 * @inheritdoc OO.ui.mixin.GroupWidget
 * @deprecated Use {@link OO.ui.mixin.GroupWidget} instead.
 */
OO.ui.GroupWidget = OO.ui.mixin.GroupWidget;

/**
 * @inheritdoc OO.ui.mixin.IconElement
 * @deprecated Use {@link OO.ui.mixin.IconElement} instead.
 */
OO.ui.IconElement = OO.ui.mixin.IconElement;

/**
 * @inheritdoc OO.ui.mixin.IndicatorElement
 * @deprecated Use {@link OO.ui.mixin.IndicatorElement} instead.
 */
OO.ui.IndicatorElement = OO.ui.mixin.IndicatorElement;

/**
 * @inheritdoc OO.ui.mixin.ItemWidget
 * @deprecated Use {@link OO.ui.mixin.ItemWidget} instead.
 */
OO.ui.ItemWidget = OO.ui.mixin.ItemWidget;

/**
 * @inheritdoc OO.ui.mixin.LabelElement
 * @deprecated Use {@link OO.ui.mixin.LabelElement} instead.
 */
OO.ui.LabelElement = OO.ui.mixin.LabelElement;

/**
 * @inheritdoc OO.ui.mixin.LookupElement
 * @deprecated Use {@link OO.ui.mixin.LookupElement} instead.
 */
OO.ui.LookupElement = OO.ui.mixin.LookupElement;

/**
 * @inheritdoc OO.ui.mixin.PendingElement
 * @deprecated Use {@link OO.ui.mixin.PendingElement} instead.
 */
OO.ui.PendingElement = OO.ui.mixin.PendingElement;

/**
 * @inheritdoc OO.ui.mixin.PopupElement
 * @deprecated Use {@link OO.ui.mixin.PopupElement} instead.
 */
OO.ui.PopupElement = OO.ui.mixin.PopupElement;

/**
 * @inheritdoc OO.ui.mixin.TabIndexedElement
 * @deprecated Use {@link OO.ui.mixin.TabIndexedElement} instead.
 */
OO.ui.TabIndexedElement = OO.ui.mixin.TabIndexedElement;

/**
 * @inheritdoc OO.ui.mixin.TitledElement
 * @deprecated Use {@link OO.ui.mixin.TitledElement} instead.
 */
OO.ui.TitledElement = OO.ui.mixin.TitledElement;

}( OO ) );
