/*!
 * OOjs UI v0.8.3
 * https://www.mediawiki.org/wiki/OOjs_UI
 *
 * Copyright 2011–2015 OOjs Team and other contributors.
 * Released under the MIT license
 * http://oojs.mit-license.org
 *
 * Date: 2015-02-27T23:04:45Z
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
		'ooui-dialog-process-continue': 'Continue'
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

} )();

/**
 * Element that can be marked as pending.
 *
 * @abstract
 * @class
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {jQuery} [$pending] Element to mark as pending, defaults to this.$element
 */
OO.ui.PendingElement = function OoUiPendingElement( config ) {
	// Configuration initialization
	config = config || {};

	// Properties
	this.pending = 0;
	this.$pending = null;

	// Initialisation
	this.setPendingElement( config.$pending || this.$element );
};

/* Setup */

OO.initClass( OO.ui.PendingElement );

/* Methods */

/**
 * Set the pending element (and clean up any existing one).
 *
 * @param {jQuery} $pending The element to set to pending.
 */
OO.ui.PendingElement.prototype.setPendingElement = function ( $pending ) {
	if ( this.$pending ) {
		this.$pending.removeClass( 'oo-ui-pendingElement-pending' );
	}

	this.$pending = $pending;
	if ( this.pending > 0 ) {
		this.$pending.addClass( 'oo-ui-pendingElement-pending' );
	}
};

/**
 * Check if input is pending.
 *
 * @return {boolean}
 */
OO.ui.PendingElement.prototype.isPending = function () {
	return !!this.pending;
};

/**
 * Increase the pending stack.
 *
 * @chainable
 */
OO.ui.PendingElement.prototype.pushPending = function () {
	if ( this.pending === 0 ) {
		this.$pending.addClass( 'oo-ui-pendingElement-pending' );
		this.updateThemeClasses();
	}
	this.pending++;

	return this;
};

/**
 * Reduce the pending stack.
 *
 * Clamped at zero.
 *
 * @chainable
 */
OO.ui.PendingElement.prototype.popPending = function () {
	if ( this.pending === 1 ) {
		this.$pending.removeClass( 'oo-ui-pendingElement-pending' );
		this.updateThemeClasses();
	}
	this.pending = Math.max( 0, this.pending - 1 );

	return this;
};

/**
 * ActionSets manage the behavior of the {@link OO.ui.ActionWidget Action widgets} that comprise them.
 * Actions can be made available for specific contexts (modes) and circumstances
 * (abilities). Please see the [OOjs UI documentation on MediaWiki][1] for more information.
 *
 *     @example
 *     // Example: An action set used in a process dialog
 *     function ProcessDialog( config ) {
 *         ProcessDialog.super.call( this, config );
 *     }
 *     OO.inheritClass( ProcessDialog, OO.ui.ProcessDialog );
 *     ProcessDialog.static.title = 'An action set in a process dialog';
 *     // An action set that uses modes ('edit' and 'help' mode, in this example).
 *     ProcessDialog.static.actions = [
 *        { action: 'continue', modes: 'edit', label: 'Continue', flags: [ 'primary', 'constructive' ] },
 *        { action: 'help', modes: 'edit', label: 'Help' },
 *        { modes: 'edit', label: 'Cancel', flags: 'safe' },
 *        { action: 'back', modes: 'help', label: 'Back', flags: 'safe' }
 *     ];
 *
 *     ProcessDialog.prototype.initialize = function () {
 *         ProcessDialog.super.prototype.initialize.apply( this, arguments );
 *         this.panel1 = new OO.ui.PanelLayout( { padded: true, expanded: false } );
 *         this.panel1.$element.append( '<p>This dialog uses an action set (continue, help, cancel, back) configured with modes. This is edit mode. Click \'help\' to see help mode. </p>' );
 *         this.panel2 = new OO.ui.PanelLayout( { padded: true, expanded: false } );
 *         this.panel2.$element.append( '<p>This is help mode. Only the \'back\' action widget is configured to be visible here. Click \'back\' to return to \'edit\' mode</p>' );
 *         this.stackLayout= new OO.ui.StackLayout( {
 *             items: [ this.panel1, this.panel2 ]
 *         });
 *         this.$body.append( this.stackLayout.$element );
 *     };
 *     ProcessDialog.prototype.getSetupProcess = function ( data ) {
 *         return ProcessDialog.super.prototype.getSetupProcess.call( this, data )
 *         .next( function () {
 *         this.actions.setMode('edit');
 *         }, this );
 *     };
 *     ProcessDialog.prototype.getActionProcess = function ( action ) {
 *         if ( action === 'help' ) {
 *             this.actions.setMode( 'help' );
 *             this.stackLayout.setItem( this.panel2 );
 *             } else if ( action === 'back' ) {
 *             this.actions.setMode( 'edit' );
 *             this.stackLayout.setItem( this.panel1 );
 *             } else if ( action === 'continue' ) {
 *             var dialog = this;
 *             return new OO.ui.Process( function () {
 *                 dialog.close();
 *             } );
 *         }
 *         return ProcessDialog.super.prototype.getActionProcess.call( this, action );
 *     };
 *     ProcessDialog.prototype.getBodyHeight = function () {
 *         return this.panel1.$element.outerHeight( true );
 *     };
 *     var windowManager = new OO.ui.WindowManager();
 *     $( 'body' ).append( windowManager.$element );
 *     var processDialog = new ProcessDialog({
 *        size: 'medium'});
 *     windowManager.addWindows( [ processDialog ] );
 *     windowManager.openWindow( processDialog );
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
 * @param {OO.ui.ActionWidget} action Action that was clicked
 */

/**
 * @event resize
 * @param {OO.ui.ActionWidget} action Action that was resized
 */

/**
 * @event add
 * @param {OO.ui.ActionWidget[]} added Actions added
 */

/**
 * @event remove
 * @param {OO.ui.ActionWidget[]} added Actions removed
 */

/**
 * @event change
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
 * Check if a action is one of the special actions.
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
 * Get actions.
 *
 * @param {Object} [filters] Filters to use, omit to get all actions
 * @param {string|string[]} [filters.actions] Actions that actions must have
 * @param {string|string[]} [filters.flags] Flags that actions must have
 * @param {string|string[]} [filters.modes] Modes that actions must have
 * @param {boolean} [filters.visible] Actions must be visible
 * @param {boolean} [filters.disabled] Actions must be disabled
 * @return {OO.ui.ActionWidget[]} Actions matching all criteria
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
 * Get special actions.
 *
 * Special actions are the first visible actions with special flags, such as 'safe' and 'primary'.
 * Special flags can be configured by changing #static-specialFlags in a subclass.
 *
 * @return {OO.ui.ActionWidget|null} Safe action
 */
OO.ui.ActionSet.prototype.getSpecial = function () {
	this.organize();
	return $.extend( {}, this.special );
};

/**
 * Get other actions.
 *
 * Other actions include all non-special visible actions.
 *
 * @return {OO.ui.ActionWidget[]} Other actions
 */
OO.ui.ActionSet.prototype.getOthers = function () {
	this.organize();
	return this.others.slice();
};

/**
 * Toggle actions based on their modes.
 *
 * Unlike calling toggle on actions with matching flags, this will enforce mutually exclusive
 * visibility; matching actions will be shown, non-matching actions will be hidden.
 *
 * @param {string} mode Mode actions must have
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
 * Change which actions are able to be performed.
 *
 * Actions with matching actions will be disabled/enabled. Other actions will not be changed.
 *
 * @param {Object.<string,boolean>} actions List of abilities, keyed by action name, values
 *   indicate actions are able to be performed
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
 * manually to defer emitting a change event until after all actions have been changed.
 *
 * @param {Object|null} actions Filters to use for which actions to iterate over; see #get
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
 * Add actions.
 *
 * @param {OO.ui.ActionWidget[]} actions Actions to add
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
 * Remove actions.
 *
 * @param {OO.ui.ActionWidget[]} actions Actions to remove
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
 * Remove all actions.
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
 * @cfg {jQuery} [$content] Content elements to append (after #text)
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
	this.debouncedUpdateThemeClassesHandler = this.debouncedUpdateThemeClasses.bind( this );
	this.updateThemeClassesPending = false;

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
		win = doc.parentWindow || doc.defaultView,
		style = win && win.getComputedStyle ?
			win.getComputedStyle( el, null ) :
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
		props = [ 'overflow' ],
		$parent = $( el ).parent();

	if ( dimension === 'x' || dimension === 'y' ) {
		props.push( 'overflow-' + dimension );
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
	// Configuration initialization
	config = config || {};

	var rel, anim = {},
		callback = typeof config.complete === 'function' && config.complete,
		sc = this.getClosestScrollableContainer( el, config.direction ),
		$sc = $( sc ),
		eld = this.getDimensions( el ),
		scd = this.getDimensions( sc ),
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
	var i, len, nodes = [];
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
	if ( !this.updateThemeClassesPending ) {
		this.updateThemeClassesPending = true;
		setTimeout( this.debouncedUpdateThemeClassesHandler );
	}
};

/**
 * @private
 */
OO.ui.Element.prototype.debouncedUpdateThemeClasses = function () {
	OO.ui.theme.updateElementClasses( this );
	this.updateThemeClassesPending = false;
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
 * @return {OO.ui.GroupElement|null} Group element, null if none
 */
OO.ui.Element.prototype.getElementGroup = function () {
	return this.elementGroup;
};

/**
 * Set group element is in.
 *
 * @param {OO.ui.GroupElement|null} group Group element, null if none
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
 * Container for elements.
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
	OO.ui.Layout.super.call( this, config );

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
 * @cfg {boolean} [disabled=false] Disable
 */
OO.ui.Widget = function OoUiWidget( config ) {
	// Initialize config
	config = $.extend( { disabled: false }, config );

	// Parent constructor
	OO.ui.Widget.super.call( this, config );

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
 * @param {boolean} disabled Widget is disabled
 */

/**
 * @event toggle
 * @param {boolean} visible Widget is visible
 */

/* Methods */

/**
 * Check if the widget is disabled.
 *
 * @return {boolean} Button is disabled
 */
OO.ui.Widget.prototype.isDisabled = function () {
	return this.disabled;
};

/**
 * Set the disabled state of the widget.
 *
 * This should probably change the widgets' appearance and prevent it from being used.
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
 * @cfg {string} [size] Symbolic name of dialog size, `small`, `medium`, `large`, `larger` or
 *  `full`; omit to use #static-size
 */
OO.ui.Window = function OoUiWindow( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.Window.super.call( this, config );

	// Mixin constructors
	OO.EventEmitter.call( this );

	// Properties
	this.manager = null;
	this.size = config.size || this.constructor.static.size;
	this.$frame = $( '<div>' );
	this.$overlay = $( '<div>' );
	this.$content = $( '<div>' );

	// Initialization
	this.$overlay.addClass( 'oo-ui-window-overlay' );
	this.$content
		.addClass( 'oo-ui-window-content' )
		.attr( 'tabIndex', 0 );
	this.$frame
		.addClass( 'oo-ui-window-frame' )
		.append( this.$content );

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
 * Symbolic name of size.
 *
 * Size is used if no size is configured during construction.
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
 * @param {jQuery.Event} e Mouse down event
 */
OO.ui.Window.prototype.onMouseDown = function ( e ) {
	// Prevent clicking on the click-block from stealing focus
	if ( e.target === this.$element[ 0 ] ) {
		return false;
	}
};

/**
 * Check if window has been initialized.
 *
 * Initialization occurs when a window is added to a manager.
 *
 * @return {boolean} Window has been initialized
 */
OO.ui.Window.prototype.isInitialized = function () {
	return !!this.manager;
};

/**
 * Check if window is visible.
 *
 * @return {boolean} Window is visible
 */
OO.ui.Window.prototype.isVisible = function () {
	return this.visible;
};

/**
 * Check if window is opening.
 *
 * This is a wrapper around OO.ui.WindowManager#isOpening.
 *
 * @return {boolean} Window is opening
 */
OO.ui.Window.prototype.isOpening = function () {
	return this.manager.isOpening( this );
};

/**
 * Check if window is closing.
 *
 * This is a wrapper around OO.ui.WindowManager#isClosing.
 *
 * @return {boolean} Window is closing
 */
OO.ui.Window.prototype.isClosing = function () {
	return this.manager.isClosing( this );
};

/**
 * Check if window is opened.
 *
 * This is a wrapper around OO.ui.WindowManager#isOpened.
 *
 * @return {boolean} Window is opened
 */
OO.ui.Window.prototype.isOpened = function () {
	return this.manager.isOpened( this );
};

/**
 * Get the window manager.
 *
 * @return {OO.ui.WindowManager} Manager of window
 */
OO.ui.Window.prototype.getManager = function () {
	return this.manager;
};

/**
 * Get the window size.
 *
 * @return {string} Symbolic size name, e.g. `small`, `medium`, `large`, `larger`, `full`
 */
OO.ui.Window.prototype.getSize = function () {
	return this.size;
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
 * Get the height of the dialog contents.
 *
 * @return {number} Content height
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
 * Get the height of the dialog contents.
 *
 * When this function is called, the dialog will temporarily have been resized
 * to height=1px, so .scrollHeight measurements can be taken accurately.
 *
 * @return {number} Height of content
 */
OO.ui.Window.prototype.getBodyHeight = function () {
	return this.$body[ 0 ].scrollHeight;
};

/**
 * Get the directionality of the frame
 *
 * @return {string} Directionality, 'ltr' or 'rtl'
 */
OO.ui.Window.prototype.getDir = function () {
	return this.dir;
};

/**
 * Get a process for setting up a window for use.
 *
 * Each time the window is opened this process will set it up for use in a particular context, based
 * on the `data` argument.
 *
 * When you override this method, you can add additional setup steps to the process the parent
 * method provides using the 'first' and 'next' methods.
 *
 * @abstract
 * @param {Object} [data] Window opening data
 * @return {OO.ui.Process} Setup process
 */
OO.ui.Window.prototype.getSetupProcess = function () {
	return new OO.ui.Process();
};

/**
 * Get a process for readying a window for use.
 *
 * Each time the window is open and setup, this process will ready it up for use in a particular
 * context, based on the `data` argument.
 *
 * When you override this method, you can add additional setup steps to the process the parent
 * method provides using the 'first' and 'next' methods.
 *
 * @abstract
 * @param {Object} [data] Window opening data
 * @return {OO.ui.Process} Setup process
 */
OO.ui.Window.prototype.getReadyProcess = function () {
	return new OO.ui.Process();
};

/**
 * Get a process for holding a window from use.
 *
 * Each time the window is closed, this process will hold it from use in a particular context, based
 * on the `data` argument.
 *
 * When you override this method, you can add additional setup steps to the process the parent
 * method provides using the 'first' and 'next' methods.
 *
 * @abstract
 * @param {Object} [data] Window closing data
 * @return {OO.ui.Process} Hold process
 */
OO.ui.Window.prototype.getHoldProcess = function () {
	return new OO.ui.Process();
};

/**
 * Get a process for tearing down a window after use.
 *
 * Each time the window is closed this process will tear it down and do something with the user's
 * interactions within the window, based on the `data` argument.
 *
 * When you override this method, you can add additional teardown steps to the process the parent
 * method provides using the 'first' and 'next' methods.
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
 * @throws {Error} If called more than once
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
 * Set the window size.
 *
 * @param {string} size Symbolic size name, e.g. 'small', 'medium', 'large', 'full'
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
 * @throws {Error} If not attached to a manager
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
 * Set window dimensions.
 *
 * Properties are applied to the frame container.
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
 * The first time the window is opened, #initialize is called so that changes to the window that
 * will persist between openings can be made. See #getSetupProcess for a way to make changes each
 * time the window opens.
 *
 * @throws {Error} If not attached to a manager
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
	this.$innerOverlay = $( '<div>' );
	this.dir = OO.ui.Element.static.getDir( this.$content ) || 'ltr';
	this.$document = $( this.getElementDocument() );

	// Events
	this.$element.on( 'mousedown', this.onMouseDown.bind( this ) );

	// Initialization
	this.$head.addClass( 'oo-ui-window-head' );
	this.$body.addClass( 'oo-ui-window-body' );
	this.$foot.addClass( 'oo-ui-window-foot' );
	this.$innerOverlay.addClass( 'oo-ui-window-inner-overlay' );
	this.$content.append( this.$head, this.$body, this.$foot, this.$innerOverlay );

	return this;
};

/**
 * Open window.
 *
 * This is a wrapper around calling {@link OO.ui.WindowManager#openWindow} on the window manager.
 * To do something each time the window opens, use #getSetupProcess or #getReadyProcess.
 *
 * @param {Object} [data] Window opening data
 * @return {jQuery.Promise} Promise resolved when window is opened; when the promise is resolved the
 *   first argument will be a promise which will be resolved when the window begins closing
 * @throws {Error} If not attached to a manager
 */
OO.ui.Window.prototype.open = function ( data ) {
	if ( !this.manager ) {
		throw new Error( 'Cannot open window, must be attached to a manager' );
	}

	return this.manager.openWindow( this, data );
};

/**
 * Close window.
 *
 * This is a wrapper around calling OO.ui.WindowManager#closeWindow on the window manager.
 * To do something each time the window closes, use #getHoldProcess or #getTeardownProcess.
 *
 * @param {Object} [data] Window closing data
 * @return {jQuery.Promise} Promise resolved when window is closed
 * @throws {Error} If not attached to a manager
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
 *         MyDialog.super.call( this, config );
 *     }
 *     OO.inheritClass( MyDialog, OO.ui.Dialog );
 *     MyDialog.prototype.initialize = function () {
 *         MyDialog.super.prototype.initialize.call( this );
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
 * @mixins OO.ui.PendingElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 */
OO.ui.Dialog = function OoUiDialog( config ) {
	// Parent constructor
	OO.ui.Dialog.super.call( this, config );

	// Mixin constructors
	OO.ui.PendingElement.call( this );

	// Properties
	this.actions = new OO.ui.ActionSet();
	this.attachedActions = [];
	this.currentAction = null;
	this.onDocumentKeyDownHandler = this.onDocumentKeyDown.bind( this );

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
OO.mixinClass( OO.ui.Dialog, OO.ui.PendingElement );

/* Static Properties */

/**
 * Symbolic name of dialog.
 *
 * @abstract
 * @static
 * @inheritable
 * @property {string}
 */
OO.ui.Dialog.static.name = '';

/**
 * Dialog title.
 *
 * @abstract
 * @static
 * @inheritable
 * @property {jQuery|string|Function} Label nodes, text or a function that returns nodes or text
 */
OO.ui.Dialog.static.title = '';

/**
 * List of OO.ui.ActionWidget configuration options.
 *
 * @static
 * inheritable
 * @property {Object[]}
 */
OO.ui.Dialog.static.actions = [];

/**
 * Close dialog when the escape key is pressed.
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
 * @param {jQuery.Event} e Key down event
 */
OO.ui.Dialog.prototype.onDocumentKeyDown = function ( e ) {
	if ( e.which === OO.ui.Keys.ESCAPE ) {
		this.close();
		e.preventDefault();
		e.stopPropagation();
	}
};

/**
 * Handle action resized events.
 *
 * @param {OO.ui.ActionWidget} action Action that was resized
 */
OO.ui.Dialog.prototype.onActionResize = function () {
	// Override in subclass
};

/**
 * Handle action click events.
 *
 * @param {OO.ui.ActionWidget} action Action that was clicked
 */
OO.ui.Dialog.prototype.onActionClick = function ( action ) {
	if ( !this.isPending() ) {
		this.currentAction = action;
		this.executeAction( action.getAction() );
	}
};

/**
 * Handle actions change event.
 */
OO.ui.Dialog.prototype.onActionsChange = function () {
	this.detachActions();
	if ( !this.isClosing() ) {
		this.attachActions();
	}
};

/**
 * Get set of actions.
 *
 * @return {OO.ui.ActionSet}
 */
OO.ui.Dialog.prototype.getActions = function () {
	return this.actions;
};

/**
 * Get a process for taking action.
 *
 * When you override this method, you can add additional accept steps to the process the parent
 * method provides using the 'first' and 'next' methods.
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
 * @param {jQuery|string|Function|null} [data.title] Dialog title, omit to use #static-title
 * @param {Object[]} [data.actions] List of OO.ui.ActionWidget configuration options for each
 *   action item, omit to use #static-actions
 */
OO.ui.Dialog.prototype.getSetupProcess = function ( data ) {
	data = data || {};

	// Parent method
	return OO.ui.Dialog.super.prototype.getSetupProcess.call( this, data )
		.next( function () {
			var i, len,
				items = [],
				config = this.constructor.static,
				actions = data.actions !== undefined ? data.actions : config.actions;

			this.title.setLabel(
				data.title !== undefined ? data.title : this.constructor.static.title
			);
			for ( i = 0, len = actions.length; i < len; i++ ) {
				items.push(
					new OO.ui.ActionWidget( actions[ i ] )
				);
			}
			this.actions.add( items );

			if ( this.constructor.static.escapable ) {
				this.$document.on( 'keydown', this.onDocumentKeyDownHandler );
			}
		}, this );
};

/**
 * @inheritdoc
 */
OO.ui.Dialog.prototype.getTeardownProcess = function ( data ) {
	// Parent method
	return OO.ui.Dialog.super.prototype.getTeardownProcess.call( this, data )
		.first( function () {
			if ( this.constructor.static.escapable ) {
				this.$document.off( 'keydown', this.onDocumentKeyDownHandler );
			}

			this.actions.clear();
			this.currentAction = null;
		}, this );
};

/**
 * @inheritdoc
 */
OO.ui.Dialog.prototype.initialize = function () {
	// Parent method
	OO.ui.Dialog.super.prototype.initialize.call( this );

	// Properties
	this.title = new OO.ui.LabelWidget();

	// Initialization
	this.$content.addClass( 'oo-ui-dialog-content' );
	this.setPendingElement( this.$head );
};

/**
 * Attach action actions.
 */
OO.ui.Dialog.prototype.attachActions = function () {
	// Remember the list of potentially attached actions
	this.attachedActions = this.actions.get();
};

/**
 * Detach action actions.
 *
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
 * @cfg {boolean} [modal=true] Prevent interaction outside the dialog
 */
OO.ui.WindowManager = function OoUiWindowManager( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.WindowManager.super.call( this, config );

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
 * Window is opening.
 *
 * Fired when the window begins to be opened.
 *
 * @event opening
 * @param {OO.ui.Window} win Window that's being opened
 * @param {jQuery.Promise} opening Promise resolved when window is opened; when the promise is
 *   resolved the first argument will be a promise which will be resolved when the window begins
 *   closing, the second argument will be the opening data; progress notifications will be fired on
 *   the promise for `setup` and `ready` when those processes are completed respectively.
 * @param {Object} data Window opening data
 */

/**
 * Window is closing.
 *
 * Fired when the window begins to be closed.
 *
 * @event closing
 * @param {OO.ui.Window} win Window that's being closed
 * @param {jQuery.Promise} opening Promise resolved when window is closed; when the promise
 *   is resolved the first argument will be a the closing data; progress notifications will be fired
 *   on the promise for `hold` and `teardown` when those processes are completed respectively.
 * @param {Object} data Window closing data
 */

/**
 * Window was resized.
 *
 * @event resize
 * @param {OO.ui.Window} win Window that was resized
 */

/* Static Properties */

/**
 * Map of symbolic size names and CSS properties.
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
 * Symbolic name of default size.
 *
 * Default size is used if the window's requested size is not recognized.
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
 * @param {jQuery.Event} e Window resize event
 */
OO.ui.WindowManager.prototype.onWindowResize = function () {
	clearTimeout( this.onWindowResizeTimeout );
	this.onWindowResizeTimeout = setTimeout( this.afterWindowResizeHandler, 200 );
};

/**
 * Handle window resize events.
 *
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
 * Get the number of milliseconds to wait between beginning opening and executing setup process.
 *
 * @param {OO.ui.Window} win Window being opened
 * @param {Object} [data] Window opening data
 * @return {number} Milliseconds to wait
 */
OO.ui.WindowManager.prototype.getSetupDelay = function () {
	return 0;
};

/**
 * Get the number of milliseconds to wait between finishing setup and executing ready process.
 *
 * @param {OO.ui.Window} win Window being opened
 * @param {Object} [data] Window opening data
 * @return {number} Milliseconds to wait
 */
OO.ui.WindowManager.prototype.getReadyDelay = function () {
	return 0;
};

/**
 * Get the number of milliseconds to wait between beginning closing and executing hold process.
 *
 * @param {OO.ui.Window} win Window being closed
 * @param {Object} [data] Window closing data
 * @return {number} Milliseconds to wait
 */
OO.ui.WindowManager.prototype.getHoldDelay = function () {
	return 0;
};

/**
 * Get the number of milliseconds to wait between finishing hold and executing teardown process.
 *
 * @param {OO.ui.Window} win Window being closed
 * @param {Object} [data] Window closing data
 * @return {number} Milliseconds to wait
 */
OO.ui.WindowManager.prototype.getTeardownDelay = function () {
	return this.modal ? 250 : 0;
};

/**
 * Get managed window by symbolic name.
 *
 * If window is not yet instantiated, it will be instantiated and added automatically.
 *
 * @param {string} name Symbolic window name
 * @return {jQuery.Promise} Promise resolved with matching window, or rejected with an OO.ui.Error
 * @throws {Error} If the symbolic name is unrecognized by the factory
 * @throws {Error} If the symbolic name unrecognized as a managed window
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
 * @return {jQuery.Promise} Promise resolved when window is done opening; see {@link #event-opening}
 *   for more details about the `opening` promise
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
 * @return {jQuery.Promise} Promise resolved when window is done closing; see {@link #event-closing}
 *   for more details about the `closing` promise
 * @throws {Error} If no window by that name is being managed
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
 * Add windows.
 *
 * @param {Object.<string,OO.ui.Window>|OO.ui.Window[]} windows Windows to add
 * @throws {Error} If one of the windows being added without an explicit symbolic name does not have
 *   a statically configured symbolic name
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
 * Remove windows.
 *
 * Windows will be closed before they are removed.
 *
 * @param {string[]} names Symbolic names of windows to remove
 * @return {jQuery.Promise} Promise resolved when window is closed and removed
 * @throws {Error} If windows being removed are not being managed
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
 * Remove all windows.
 *
 * Windows will be closed before they are removed.
 *
 * @return {jQuery.Promise} Promise resolved when all windows are closed and removed
 */
OO.ui.WindowManager.prototype.clearWindows = function () {
	return this.removeWindows( Object.keys( this.windows ) );
};

/**
 * Set dialog size.
 *
 * Fullscreen mode will be used if the dialog is too wide to fit in the screen.
 *
 * @chainable
 */
OO.ui.WindowManager.prototype.updateWindowSize = function ( win ) {
	// Bypass for non-current, and thus invisible, windows
	if ( win !== this.currentWindow ) {
		return;
	}

	var viewport = OO.ui.Element.static.getDimensions( win.getElementWindow() ),
		sizes = this.constructor.static.sizes,
		size = win.getSize();

	if ( !sizes[ size ] ) {
		size = this.constructor.static.defaultSize;
	}
	if ( size !== 'full' && viewport.rect.right - viewport.rect.left < sizes[ size ].width ) {
		size = 'full';
	}

	this.$element.toggleClass( 'oo-ui-windowManager-fullscreen', size === 'full' );
	this.$element.toggleClass( 'oo-ui-windowManager-floating', size !== 'full' );
	win.setDimensions( sizes[ size ] );

	this.emit( 'resize', win );

	return this;
};

/**
 * Bind or unbind global events for scrolling.
 *
 * @param {boolean} [on] Bind global events
 * @chainable
 */
OO.ui.WindowManager.prototype.toggleGlobalEvents = function ( on ) {
	on = on === undefined ? !!this.globalEvents : !!on;

	if ( on ) {
		if ( !this.globalEvents ) {
			$( this.getElementWindow() ).on( {
				// Start listening for top-level window dimension changes
				'orientationchange resize': this.onWindowResizeHandler
			} );
			$( this.getElementDocument().body ).css( 'overflow', 'hidden' );
			this.globalEvents = true;
		}
	} else if ( this.globalEvents ) {
		$( this.getElementWindow() ).off( {
			// Stop listening for top-level window dimension changes
			'orientationchange resize': this.onWindowResizeHandler
		} );
		$( this.getElementDocument().body ).css( 'overflow', '' );
		this.globalEvents = false;
	}

	return this;
};

/**
 * Toggle screen reader visibility of content other than the window manager.
 *
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
 * Destroy window manager.
 */
OO.ui.WindowManager.prototype.destroy = function () {
	this.toggleGlobalEvents( false );
	this.toggleAriaIsolation( false );
	this.clearWindows();
	this.$element.remove();
};

/**
 * @class
 *
 * @constructor
 * @param {string|jQuery} message Description of error
 * @param {Object} [config] Configuration options
 * @cfg {boolean} [recoverable=true] Error is recoverable
 * @cfg {boolean} [warning=false] Whether this error is a warning or not.
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
 * Check if error can be recovered from.
 *
 * @return {boolean} Error is recoverable
 */
OO.ui.Error.prototype.isRecoverable = function () {
	return this.recoverable;
};

/**
 * Check if the error is a warning
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
 * Get error message as text.
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
 * Reconstitute a JavaScript object corresponding to a widget created
 * by the PHP implementation.
 *
 * @member OO.ui
 * @param {string|HTMLElement|jQuery} idOrNode
 *   A DOM id (if a string) or node for the widget to infuse.
 * @return {OO.ui.Element}
 *   The `OO.ui.Element` corresponding to this (infusable) document node.
 *   For `Tag` objects emitted on the HTML side (used occasionally for content)
 *   the value returned is a newly-created Element wrapping around the existing
 *   DOM node.
 */
OO.ui.infuse = function ( idOrNode, dontReplace ) {
	// look for a cached result of a previous infusion.
	var id, $elem, data, cls, obj;
	if ( typeof idOrNode === 'string' ) {
		id = idOrNode;
		$elem = $( document.getElementById( id ) );
	} else {
		$elem = $( idOrNode );
		id = $elem.attr( 'id' );
	}
	data = $elem.data( 'ooui-infused' );
	if ( data ) {
		// cached!
		if ( data === true ) {
			throw new Error( 'Circular dependency! ' + id );
		}
		return data;
	}
	if ( !$elem.length ) {
		throw new Error( 'Widget not found: ' + id );
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
	cls = OO.ui[data._];
	if ( !cls ) {
		throw new Error( 'Unknown widget type: ' + id );
	}
	$elem.data( 'ooui-infused', true ); // prevent loops
	data.id = id; // implicit
	data = OO.copy( data, null, function deserialize( value ) {
		if ( OO.isPlainObject( value ) ) {
			if ( value.tag ) {
				return OO.ui.infuse( value.tag, 'rebuilding' );
			}
			if ( value.html ) {
				return new OO.ui.HtmlSnippet( value.html );
			}
		}
	} );
	// jscs:disable requireCapitalizedConstructors
	obj = new cls( data ); // rebuild widget
	// now replace old DOM with this new DOM.
	if ( !dontReplace ) {
		$elem.replaceWith( obj.$element );
	}
	obj.$element.data( 'ooui-infused', obj );
	// set the 'data-ooui' attribute so we can identify infused widgets
	obj.$element.attr( 'data-ooui', '' );
	return obj;
};

/**
 * A list of functions, called in sequence.
 *
 * If a function added to a process returns boolean false the process will stop; if it returns an
 * object with a `promise` method the process will use the promise to either continue to the next
 * step when the promise is resolved or stop when the promise is rejected.
 *
 * @class
 *
 * @constructor
 * @param {number|jQuery.Promise|Function} step Time to wait, promise to wait for or function to
 *   call, see #createStep for more information
 * @param {Object} [context=null] Context to call the step function in, ignored if step is a number
 *   or a promise
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
 * @return {jQuery.Promise} Promise that is resolved when all steps have completed or rejected when
 *   any of the steps return boolean false or a promise which gets rejected; upon stopping the
 *   process, the remaining steps will not be taken
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
 * - Number of milliseconds to wait; or
 * - Promise to wait to be resolved; or
 * - Function to execute
 *   - If it returns boolean false the process will stop
 *   - If it returns an object with a `promise` method the process will use the promise to either
 *     continue to the next step when the promise is resolved or stop when the promise is rejected
 *   - If it returns a number, the process will wait for that number of milliseconds before
 *     proceeding
 * @param {Object} [context=null] Context to call the step function in, ignored if step is a number
 *   or a promise
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
 * Factory for tools.
 *
 * @class
 * @extends OO.Factory
 * @constructor
 */
OO.ui.ToolFactory = function OoUiToolFactory() {
	// Parent constructor
	OO.ui.ToolFactory.super.call( this );
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
 * Factory for tool groups.
 *
 * @class
 * @extends OO.Factory
 * @constructor
 */
OO.ui.ToolGroupFactory = function OoUiToolGroupFactory() {
	// Parent constructor
	OO.Factory.call( this );

	var i, l,
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
 * Get a default set of classes to be registered on construction
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
OO.ui.Theme.prototype.getElementClasses = function ( /* element */ ) {
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
	var classes = this.getElementClasses( element );

	element.$element
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
 *         label : 'fourth',
 *         tabIndex : 4
 *     } );
 *     var button2 = new OO.ui.ButtonWidget( {
 *         label : 'second',
 *         tabIndex : 2
 *     } );
 *     var button3 = new OO.ui.ButtonWidget( {
 *         label : 'third',
 *         tabIndex : 3
 *     } );
 *     var button4 = new OO.ui.ButtonWidget( {
 *         label : 'first',
 *         tabIndex : 1
 *     } );
 *     $( 'body' ).append( button1.$element, button2.$element, button3.$element, button4.$element );
 *
 * @abstract
 * @class
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {jQuery} [$tabIndexed] tabIndexed node, assigned to #$tabIndexed, omit to use #$element
 * @cfg {number|null} [tabIndex=0] Tab index value. Use 0 to use default ordering, use -1 to
 *  prevent tab focusing, use null to suppress the `tabindex` attribute.
 */
OO.ui.TabIndexedElement = function OoUiTabIndexedElement( config ) {
	// Configuration initialization
	config = $.extend( { tabIndex: 0 }, config );

	// Properties
	this.$tabIndexed = null;
	this.tabIndex = null;

	// Events
	this.connect( this, { disable: 'onDisable' } );

	// Initialization
	this.setTabIndex( config.tabIndex );
	this.setTabIndexedElement( config.$tabIndexed || this.$element );
};

/* Setup */

OO.initClass( OO.ui.TabIndexedElement );

/* Methods */

/**
 * Set the element with `tabindex` attribute.
 *
 * If an element is already set, it will be cleaned up before setting up the new element.
 *
 * @param {jQuery} $tabIndexed Element to set tab index on
 * @chainable
 */
OO.ui.TabIndexedElement.prototype.setTabIndexedElement = function ( $tabIndexed ) {
	var tabIndex = this.tabIndex;
	// Remove attributes from old $tabIndexed
	this.setTabIndex( null );
	// Force update of new $tabIndexed
	this.$tabIndexed = $tabIndexed;
	this.tabIndex = tabIndex;
	return this.updateTabIndex();
};

/**
 * Set tab index value.
 *
 * @param {number|null} tabIndex Tab index value or null for no tab index
 * @chainable
 */
OO.ui.TabIndexedElement.prototype.setTabIndex = function ( tabIndex ) {
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
 * @chainable
 */
OO.ui.TabIndexedElement.prototype.updateTabIndex = function () {
	if ( this.$tabIndexed ) {
		if ( this.tabIndex !== null ) {
			// Do not index over disabled elements
			this.$tabIndexed.attr( {
				tabindex: this.isDisabled() ? -1 : this.tabIndex,
				// ChromeVox and NVDA do not seem to inherit this from parent elements
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
OO.ui.TabIndexedElement.prototype.onDisable = function () {
	this.updateTabIndex();
};

/**
 * Get tab index value.
 *
 * @return {number|null} Tab index value
 */
OO.ui.TabIndexedElement.prototype.getTabIndex = function () {
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
 * @cfg {jQuery} [$button] Button node, assigned to #$button, omit to use a generated `<a>`
 * @cfg {boolean} [framed=true] Render button with a frame
 * @cfg {string} [accessKey] Button's access key
 */
OO.ui.ButtonElement = function OoUiButtonElement( config ) {
	// Configuration initialization
	config = config || {};

	// Properties
	this.$button = config.$button || $( '<a>' );
	this.framed = null;
	this.accessKey = null;
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
	this.setAccessKey( config.accessKey );
	this.setButtonElement( this.$button );
};

/* Setup */

OO.initClass( OO.ui.ButtonElement );

/* Static Properties */

/**
 * Cancel mouse down events.
 *
 * @static
 * @inheritable
 * @property {boolean}
 */
OO.ui.ButtonElement.static.cancelButtonMouseDownEvents = true;

/* Events */

/**
 * @event click
 */

/* Methods */

/**
 * Set the button element.
 *
 * If an element is already set, it will be cleaned up before setting up the new element.
 *
 * @param {jQuery} $button Element to use as button
 */
OO.ui.ButtonElement.prototype.setButtonElement = function ( $button ) {
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
		.attr( { role: 'button', accesskey: this.accessKey } )
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
OO.ui.ButtonElement.prototype.onMouseDown = function ( e ) {
	if ( this.isDisabled() || e.which !== 1 ) {
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
 * @param {jQuery.Event} e Mouse up event
 */
OO.ui.ButtonElement.prototype.onMouseUp = function ( e ) {
	if ( this.isDisabled() || e.which !== 1 ) {
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
OO.ui.ButtonElement.prototype.onClick = function ( e ) {
	if ( !this.isDisabled() && e.which === 1 ) {
		this.emit( 'click' );
	}
	return false;
};

/**
 * Handles key down events.
 *
 * @protected
 * @param {jQuery.Event} e Key down event
 */
OO.ui.ButtonElement.prototype.onKeyDown = function ( e ) {
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
 * @param {jQuery.Event} e Key up event
 */
OO.ui.ButtonElement.prototype.onKeyUp = function ( e ) {
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
OO.ui.ButtonElement.prototype.onKeyPress = function ( e ) {
	if ( !this.isDisabled() && ( e.which === OO.ui.Keys.SPACE || e.which === OO.ui.Keys.ENTER ) ) {
		this.emit( 'click' );
	}
	return false;
};

/**
 * Check if button has a frame.
 *
 * @return {boolean} Button is framed
 */
OO.ui.ButtonElement.prototype.isFramed = function () {
	return this.framed;
};

/**
 * Toggle frame.
 *
 * @param {boolean} [framed] Make button framed, omit to toggle
 * @chainable
 */
OO.ui.ButtonElement.prototype.toggleFramed = function ( framed ) {
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
 * Set access key.
 *
 * @param {string} accessKey Button's access key, use empty string to remove
 * @chainable
 */
OO.ui.ButtonElement.prototype.setAccessKey = function ( accessKey ) {
	accessKey = typeof accessKey === 'string' && accessKey.length ? accessKey : null;

	if ( this.accessKey !== accessKey ) {
		if ( this.$button ) {
			if ( accessKey !== null ) {
				this.$button.attr( 'accesskey', accessKey );
			} else {
				this.$button.removeAttr( 'accesskey' );
			}
		}
		this.accessKey = accessKey;
	}

	return this;
};

/**
 * Set active state.
 *
 * @param {boolean} [value] Make button active
 * @chainable
 */
OO.ui.ButtonElement.prototype.setActive = function ( value ) {
	this.$element.toggleClass( 'oo-ui-buttonElement-active', !!value );
	return this;
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
 * @cfg {jQuery} [$group] Container node, assigned to #$group, omit to use a generated `<div>`
 */
OO.ui.GroupElement = function OoUiGroupElement( config ) {
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
OO.ui.GroupElement.prototype.setGroupElement = function ( $group ) {
	var i, len;

	this.$group = $group;
	for ( i = 0, len = this.items.length; i < len; i++ ) {
		this.$group.append( this.items[ i ].$element );
	}
};

/**
 * Check if there are no items.
 *
 * @return {boolean} Group is empty
 */
OO.ui.GroupElement.prototype.isEmpty = function () {
	return !this.items.length;
};

/**
 * Get items.
 *
 * @return {OO.ui.Element[]} Items
 */
OO.ui.GroupElement.prototype.getItems = function () {
	return this.items.slice( 0 );
};

/**
 * Get an item by its data.
 *
 * Data is compared by a hash of its value. Only the first item with matching data will be returned.
 *
 * @param {Object} data Item data to search for
 * @return {OO.ui.Element|null} Item with equivalent data, `null` if none exists
 */
OO.ui.GroupElement.prototype.getItemFromData = function ( data ) {
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
 * Data is compared by a hash of its value. All items with matching data will be returned.
 *
 * @param {Object} data Item data to search for
 * @return {OO.ui.Element[]} Items with equivalent data
 */
OO.ui.GroupElement.prototype.getItemsFromData = function ( data ) {
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
 * Add an aggregate item event.
 *
 * Aggregated events are listened to on each item and then emitted by the group under a new name,
 * and with an additional leading parameter containing the item that emitted the original event.
 * Other arguments that were emitted from the original event are passed through.
 *
 * @param {Object.<string,string|null>} events Aggregate events emitted by group, keyed by item
 *   event, use null value to remove aggregation
 * @throws {Error} If aggregation already exists
 */
OO.ui.GroupElement.prototype.aggregate = function ( events ) {
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
					remove[ itemEvent ] = [ 'emit', groupEvent, item ];
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
 * Add items.
 *
 * Adding an existing item will move it.
 *
 * @param {OO.ui.Element[]} items Items
 * @param {number} [index] Index to insert items at
 * @chainable
 */
OO.ui.GroupElement.prototype.addItems = function ( items, index ) {
	var i, len, item, event, events, currentIndex,
		itemElements = [];

	for ( i = 0, len = items.length; i < len; i++ ) {
		item = items[ i ];

		// Check if item exists then remove it first, effectively "moving" it
		currentIndex = $.inArray( item, this.items );
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
 * Remove items.
 *
 * Items will be detached, not removed, so they can be used later.
 *
 * @param {OO.ui.Element[]} items Items to remove
 * @chainable
 */
OO.ui.GroupElement.prototype.removeItems = function ( items ) {
	var i, len, item, index, remove, itemEvent;

	// Remove specific items
	for ( i = 0, len = items.length; i < len; i++ ) {
		item = items[ i ];
		index = $.inArray( item, this.items );
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
 * Clear all items.
 *
 * Items will be detached, not removed, so they can be used later.
 *
 * @chainable
 */
OO.ui.GroupElement.prototype.clearItems = function () {
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
 * in conjunction with OO.ui.DraggableGroupElement, which provides a container for
 * the draggable elements.
 *
 * @abstract
 * @class
 *
 * @constructor
 */
OO.ui.DraggableElement = function OoUiDraggableElement() {
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

OO.initClass( OO.ui.DraggableElement );

/* Events */

/**
 * @event dragstart
 *
 * A dragstart event is emitted when the user clicks and begins dragging an item.
 * @param {OO.ui.DraggableElement} item The item the user has clicked and is dragging with the mouse.
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
 * @inheritdoc OO.ui.ButtonElement
 */
OO.ui.DraggableElement.static.cancelButtonMouseDownEvents = false;

/* Methods */

/**
 * Respond to dragstart event.
 *
 * @private
 * @param {jQuery.Event} event jQuery event
 * @fires dragstart
 */
OO.ui.DraggableElement.prototype.onDragStart = function ( e ) {
	var dataTransfer = e.originalEvent.dataTransfer;
	// Define drop effect
	dataTransfer.dropEffect = 'none';
	dataTransfer.effectAllowed = 'move';
	// We must set up a dataTransfer data property or Firefox seems to
	// ignore the fact the element is draggable.
	try {
		dataTransfer.setData( 'application-x/OOjs-UI-draggable', this.getIndex() );
	} catch ( err ) {
		// The above is only for firefox. No need to set a catch clause
		// if it fails, move on.
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
OO.ui.DraggableElement.prototype.onDragEnd = function () {
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
OO.ui.DraggableElement.prototype.onDrop = function ( e ) {
	e.preventDefault();
	this.emit( 'drop', e );
};

/**
 * In order for drag/drop to work, the dragover event must
 * return false and stop propogation.
 *
 * @private
 */
OO.ui.DraggableElement.prototype.onDragOver = function ( e ) {
	e.preventDefault();
};

/**
 * Set item index.
 * Store it in the DOM so we can access from the widget drag event
 *
 * @private
 * @param {number} Item index
 */
OO.ui.DraggableElement.prototype.setIndex = function ( index ) {
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
OO.ui.DraggableElement.prototype.getIndex = function () {
	return this.index;
};

/**
 * DraggableGroupElement is a mixin class used to create a group element to
 * contain draggable elements, which are items that can be clicked and dragged by a mouse.
 * The class is used with OO.ui.DraggableElement.
 *
 * @abstract
 * @class
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {jQuery} [$group] Container node, assigned to #$group, omit to use a generated `<div>`
 * @cfg {string} [orientation] Item orientation, 'horizontal' or 'vertical'. Defaults to 'vertical'
 */
OO.ui.DraggableGroupElement = function OoUiDraggableGroupElement( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.GroupElement.call( this, config );

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
		dragover: $.proxy( this.onDragOver, this ),
		dragleave: $.proxy( this.onDragLeave, this )
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
OO.mixinClass( OO.ui.DraggableGroupElement, OO.ui.GroupElement );

/* Events */

/**
 * @event reorder
 * @param {OO.ui.DraggableElement} item Reordered item
 * @param {number} [newIndex] New index for the item
 */

/* Methods */

/**
 * Respond to item drag start event
 * @param {OO.ui.DraggableElement} item Dragged item
 */
OO.ui.DraggableGroupElement.prototype.onItemDragStart = function ( item ) {
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
 */
OO.ui.DraggableGroupElement.prototype.onItemDragEnd = function () {
	this.unsetDragItem();
	return false;
};

/**
 * Handle drop event and switch the order of the items accordingly
 * @param {OO.ui.DraggableElement} item Dropped item
 * @fires reorder
 */
OO.ui.DraggableGroupElement.prototype.onItemDrop = function ( item ) {
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
 */
OO.ui.DraggableGroupElement.prototype.onDragLeave = function () {
	// This means the item was dragged outside the widget
	this.$placeholder
		.css( 'left', 0 )
		.addClass( 'oo-ui-element-hidden' );
};

/**
 * Respond to dragover event
 * @param {jQuery.Event} event Event details
 */
OO.ui.DraggableGroupElement.prototype.onDragOver = function ( e ) {
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
 * @param {OO.ui.DraggableElement} item Dragged item
 */
OO.ui.DraggableGroupElement.prototype.setDragItem = function ( item ) {
	this.dragItem = item;
};

/**
 * Unset the current dragged item
 */
OO.ui.DraggableGroupElement.prototype.unsetDragItem = function () {
	this.dragItem = null;
	this.itemDragOver = null;
	this.$placeholder.addClass( 'oo-ui-element-hidden' );
	this.sideInsertion = '';
};

/**
 * Get the current dragged item
 * @return {OO.ui.DraggableElement|null} item Dragged item or null if no item is dragged
 */
OO.ui.DraggableGroupElement.prototype.getDragItem = function () {
	return this.dragItem;
};

/**
 * Check if there's an item being dragged.
 * @return {Boolean} Item is being dragged
 */
OO.ui.DraggableGroupElement.prototype.isDragging = function () {
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
OO.ui.IconElement = function OoUiIconElement( config ) {
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

OO.initClass( OO.ui.IconElement );

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
OO.ui.IconElement.static.icon = null;

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
OO.ui.IconElement.static.iconTitle = null;

/* Methods */

/**
 * Set the icon element. This method is used to retarget an icon mixin so that its functionality
 * applies to the specified icon element instead of the one created by the class. If an icon
 * element is already set, the mixin’s effect on that element is removed. Generated CSS classes
 * and mixin methods will no longer affect the element.
 *
 * @param {jQuery} $icon Element to use as icon
 */
OO.ui.IconElement.prototype.setIconElement = function ( $icon ) {
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
OO.ui.IconElement.prototype.setIcon = function ( icon ) {
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
OO.ui.IconElement.prototype.setIconTitle = function ( iconTitle ) {
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
OO.ui.IconElement.prototype.getIcon = function () {
	return this.icon;
};

/**
 * Get the icon title. The title text is displayed when a user moves the mouse over the icon.
 *
 * @return {string} Icon title text
 */
OO.ui.IconElement.prototype.getIconTitle = function () {
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
OO.ui.IndicatorElement = function OoUiIndicatorElement( config ) {
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

OO.initClass( OO.ui.IndicatorElement );

/* Static Properties */

/**
 * Symbolic name of the indicator (e.g., ‘alert’ or  ‘down’).
 * The static property will be overridden if the #indicator configuration is used.
 *
 * @static
 * @inheritable
 * @property {string|null}
 */
OO.ui.IndicatorElement.static.indicator = null;

/**
 * A text string used as the indicator title, a function that returns title text, or `null`
 * for no title. The static property will be overridden if the #indicatorTitle configuration is used.
 *
 * @static
 * @inheritable
 * @property {string|Function|null}
 */
OO.ui.IndicatorElement.static.indicatorTitle = null;

/* Methods */

/**
 * Set the indicator element.
 *
 * If an element is already set, it will be cleaned up before setting up the new element.
 *
 * @param {jQuery} $indicator Element to use as indicator
 */
OO.ui.IndicatorElement.prototype.setIndicatorElement = function ( $indicator ) {
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
};

/**
 * Set indicator name.
 *
 * @param {string|null} indicator Symbolic name of indicator to use or null for no indicator
 * @chainable
 */
OO.ui.IndicatorElement.prototype.setIndicator = function ( indicator ) {
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
 * Set indicator title.
 *
 * @param {string|Function|null} indicator Indicator title text, a function that returns text or
 *   null for no indicator title
 * @chainable
 */
OO.ui.IndicatorElement.prototype.setIndicatorTitle = function ( indicatorTitle ) {
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
 * Get indicator name.
 *
 * @return {string} Symbolic name of indicator
 */
OO.ui.IndicatorElement.prototype.getIndicator = function () {
	return this.indicator;
};

/**
 * Get indicator title.
 *
 * @return {string} Indicator title text
 */
OO.ui.IndicatorElement.prototype.getIndicatorTitle = function () {
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
 * @cfg {jQuery|string|Function} [label] The label text. The label can be specified as a plaintext string,
 *  a jQuery selection of elements, or a function that will produce a string in the future. See the
 *  [OOjs UI documentation on MediaWiki] [2] for examples.
 *  [2]: https://www.mediawiki.org/wiki/OOjs_UI/Widgets/Icons,_Indicators,_and_Labels#Labels
 * @cfg {boolean} [autoFitLabel=true] Fit the label to the width of the parent element.
 *  The label will be truncated to fit if necessary.
 */
OO.ui.LabelElement = function OoUiLabelElement( config ) {
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

OO.initClass( OO.ui.LabelElement );

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
OO.ui.LabelElement.static.label = null;

/* Methods */

/**
 * Set the label element.
 *
 * If an element is already set, it will be cleaned up before setting up the new element.
 *
 * @param {jQuery} $label Element to use as label
 */
OO.ui.LabelElement.prototype.setLabelElement = function ( $label ) {
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
OO.ui.LabelElement.prototype.setLabel = function ( label ) {
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
OO.ui.LabelElement.prototype.getLabel = function () {
	return this.label;
};

/**
 * Fit the label.
 *
 * @chainable
 */
OO.ui.LabelElement.prototype.fitLabel = function () {
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
OO.ui.LabelElement.prototype.setLabelContent = function ( label ) {
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
 * Mixin that adds a menu showing suggested values for a OO.ui.TextInputWidget.
 *
 * Subclasses that set the value of #lookupInput from #onLookupMenuItemChoose should
 * be aware that this will cause new suggestions to be looked up for the new value. If this is
 * not desired, disable lookups with #setLookupsDisabled, then set the value, then re-enable lookups.
 *
 * @class
 * @abstract
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {jQuery} [$overlay] Overlay for dropdown; defaults to relative positioning
 * @cfg {jQuery} [$container=this.$element] Element to render menu under
 */
OO.ui.LookupElement = function OoUiLookupElement( config ) {
	// Configuration initialization
	config = config || {};

	// Properties
	this.$overlay = config.$overlay || this.$element;
	this.lookupMenu = new OO.ui.TextInputMenuSelectWidget( this, {
		widget: this,
		input: this,
		$container: config.$container
	} );
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
 * @param {jQuery.Event} e Input focus event
 */
OO.ui.LookupElement.prototype.onLookupInputFocus = function () {
	this.lookupInputFocused = true;
	this.populateLookupMenu();
};

/**
 * Handle input blur event.
 *
 * @param {jQuery.Event} e Input blur event
 */
OO.ui.LookupElement.prototype.onLookupInputBlur = function () {
	this.closeLookupMenu();
	this.lookupInputFocused = false;
};

/**
 * Handle input mouse down event.
 *
 * @param {jQuery.Event} e Input mouse down event
 */
OO.ui.LookupElement.prototype.onLookupInputMouseDown = function () {
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
 * @param {string} value New input value
 */
OO.ui.LookupElement.prototype.onLookupInputChange = function () {
	if ( this.lookupInputFocused ) {
		this.populateLookupMenu();
	}
};

/**
 * Handle the lookup menu being shown/hidden.
 *
 * @param {boolean} visible Whether the lookup menu is now visible.
 */
OO.ui.LookupElement.prototype.onLookupMenuToggle = function ( visible ) {
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
 * @param {OO.ui.MenuOptionWidget|null} item Selected item
 */
OO.ui.LookupElement.prototype.onLookupMenuItemChoose = function ( item ) {
	if ( item ) {
		this.setValue( item.getData() );
	}
};

/**
 * Get lookup menu.
 *
 * @return {OO.ui.TextInputMenuSelectWidget}
 */
OO.ui.LookupElement.prototype.getLookupMenu = function () {
	return this.lookupMenu;
};

/**
 * Disable or re-enable lookups.
 *
 * When lookups are disabled, calls to #populateLookupMenu will be ignored.
 *
 * @param {boolean} disabled Disable lookups
 */
OO.ui.LookupElement.prototype.setLookupsDisabled = function ( disabled ) {
	this.lookupsDisabled = !!disabled;
};

/**
 * Open the menu. If there are no entries in the menu, this does nothing.
 *
 * @chainable
 */
OO.ui.LookupElement.prototype.openLookupMenu = function () {
	if ( !this.lookupMenu.isEmpty() ) {
		this.lookupMenu.toggle( true );
	}
	return this;
};

/**
 * Close the menu, empty it, and abort any pending request.
 *
 * @chainable
 */
OO.ui.LookupElement.prototype.closeLookupMenu = function () {
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
 * @chainable
 */
OO.ui.LookupElement.prototype.populateLookupMenu = function () {
	var widget = this,
		value = this.getValue();

	if ( this.lookupsDisabled ) {
		return;
	}

	// If the input is empty, clear the menu
	if ( value === '' ) {
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
 * Select and highlight the first selectable item in the menu.
 *
 * @chainable
 */
OO.ui.LookupElement.prototype.initializeLookupMenuSelection = function () {
	if ( !this.lookupMenu.getSelectedItem() ) {
		this.lookupMenu.selectItem( this.lookupMenu.getFirstSelectableItem() );
	}
	this.lookupMenu.highlightItem( this.lookupMenu.getSelectedItem() );
};

/**
 * Get lookup menu items for the current query.
 *
 * @return {jQuery.Promise} Promise object which will be passed menu items as the first argument of
 *   the done event. If the request was aborted to make way for a subsequent request, this promise
 *   will not be rejected: it will remain pending forever.
 */
OO.ui.LookupElement.prototype.getLookupMenuItems = function () {
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
			.done( function ( data ) {
				// If this is an old request (and aborting it somehow caused it to still succeed),
				// ignore its success completely
				if ( ourRequest === widget.lookupRequest ) {
					widget.lookupQuery = null;
					widget.lookupRequest = null;
					widget.lookupCache[ value ] = widget.getLookupCacheDataFromResponse( data );
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
 */
OO.ui.LookupElement.prototype.abortLookupRequest = function () {
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
 * @abstract
 * @return {jQuery.Promise} jQuery AJAX object, or promise object with an .abort() method
 */
OO.ui.LookupElement.prototype.getLookupRequest = function () {
	// Stub, implemented in subclass
	return null;
};

/**
 * Pre-process data returned by the request from #getLookupRequest.
 *
 * The return value of this function will be cached, and any further queries for the given value
 * will use the cache rather than doing API requests.
 *
 * @abstract
 * @param {Mixed} data Response from server
 * @return {Mixed} Cached result data
 */
OO.ui.LookupElement.prototype.getLookupCacheDataFromResponse = function () {
	// Stub, implemented in subclass
	return [];
};

/**
 * Get a list of menu option widgets from the (possibly cached) data returned by
 * #getLookupCacheDataFromResponse.
 *
 * @abstract
 * @param {Mixed} data Cached result data, usually an array
 * @return {OO.ui.MenuOptionWidget[]} Menu items
 */
OO.ui.LookupElement.prototype.getLookupMenuOptionsFromData = function () {
	// Stub, implemented in subclass
	return [];
};

/**
 * Element containing an OO.ui.PopupWidget object.
 *
 * @abstract
 * @class
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {Object} [popup] Configuration to pass to popup
 * @cfg {boolean} [popup.autoClose=true] Popup auto-closes when it loses focus
 */
OO.ui.PopupElement = function OoUiPopupElement( config ) {
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
OO.ui.PopupElement.prototype.getPopup = function () {
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
 * @cfg {jQuery} [$flagged] Flagged node, assigned to $flagged, omit to use $element
 */
OO.ui.FlaggedElement = function OoUiFlaggedElement( config ) {
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
 * If an element is already set, it will be cleaned up before setting up the new element.
 *
 * @param {jQuery} $flagged Element to add flags to
 */
OO.ui.FlaggedElement.prototype.setFlaggedElement = function ( $flagged ) {
	var classNames = Object.keys( this.flags ).map( function ( flag ) {
		return 'oo-ui-flaggedElement-' + flag;
	} ).join( ' ' );

	if ( this.$flagged ) {
		this.$flagged.removeClass( classNames );
	}

	this.$flagged = $flagged.addClass( classNames );
};

/**
 * Check if a flag is set.
 *
 * @param {string} flag Name of flag
 * @return {boolean} Has flag
 */
OO.ui.FlaggedElement.prototype.hasFlag = function ( flag ) {
	return flag in this.flags;
};

/**
 * Get the names of all flags set.
 *
 * @return {string[]} Flag names
 */
OO.ui.FlaggedElement.prototype.getFlags = function () {
	return Object.keys( this.flags );
};

/**
 * Clear all flags.
 *
 * @chainable
 * @fires flag
 */
OO.ui.FlaggedElement.prototype.clearFlags = function () {
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
 * @param {string|string[]|Object.<string, boolean>} flags One or more flags to add, or an object
 *  keyed by flag name containing boolean set/remove instructions.
 * @chainable
 * @fires flag
 */
OO.ui.FlaggedElement.prototype.setFlags = function ( flags ) {
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
 *         label : 'Button with Title',
 *         title : 'I am a button'
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
 *  this config is omitted, the value of the static `title` property is used.
 */
OO.ui.TitledElement = function OoUiTitledElement( config ) {
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

OO.initClass( OO.ui.TitledElement );

/* Static Properties */

/**
 * The title text, a function that returns text, or `null` for no title. The value of the static property
 * is overridden if the #title config option is used.
 *
 * @static
 * @inheritable
 * @property {string|Function|null}
 */
OO.ui.TitledElement.static.title = null;

/* Methods */

/**
 * Set the titled element.
 *
 * If an element is already set, it will be cleaned up before setting up the new element.
 *
 * @param {jQuery} $titled Element to set title on
 */
OO.ui.TitledElement.prototype.setTitledElement = function ( $titled ) {
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
 * @param {string|Function|null} title Title text, a function that returns text or null for no title
 * @chainable
 */
OO.ui.TitledElement.prototype.setTitle = function ( title ) {
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
OO.ui.TitledElement.prototype.getTitle = function () {
	return this.title;
};

/**
 * Element that can be automatically clipped to visible boundaries.
 *
 * Whenever the element's natural height changes, you have to call
 * #clip to make sure it's still clipping correctly.
 *
 * @abstract
 * @class
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {jQuery} [$clippable] Nodes to clip, assigned to #$clippable, omit to use #$element
 */
OO.ui.ClippableElement = function OoUiClippableElement( config ) {
	// Configuration initialization
	config = config || {};

	// Properties
	this.$clippable = null;
	this.clipping = false;
	this.clippedHorizontally = false;
	this.clippedVertically = false;
	this.$clippableContainer = null;
	this.$clippableScroller = null;
	this.$clippableWindow = null;
	this.idealWidth = null;
	this.idealHeight = null;
	this.onClippableContainerScrollHandler = this.clip.bind( this );
	this.onClippableWindowResizeHandler = this.clip.bind( this );

	// Initialization
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
OO.ui.ClippableElement.prototype.setClippableElement = function ( $clippable ) {
	if ( this.$clippable ) {
		this.$clippable.removeClass( 'oo-ui-clippableElement-clippable' );
		this.$clippable.css( { width: '', height: '', overflowX: '', overflowY: '' } );
		OO.ui.Element.static.reconsiderScrollbars( this.$clippable[ 0 ] );
	}

	this.$clippable = $clippable.addClass( 'oo-ui-clippableElement-clippable' );
	this.clip();
};

/**
 * Toggle clipping.
 *
 * Do not turn clipping on until after the element is attached to the DOM and visible.
 *
 * @param {boolean} [clipping] Enable clipping, omit to toggle
 * @chainable
 */
OO.ui.ClippableElement.prototype.toggleClipping = function ( clipping ) {
	clipping = clipping === undefined ? !this.clipping : !!clipping;

	if ( this.clipping !== clipping ) {
		this.clipping = clipping;
		if ( clipping ) {
			this.$clippableContainer = $( this.getClosestScrollableElementContainer() );
			// If the clippable container is the root, we have to listen to scroll events and check
			// jQuery.scrollTop on the window because of browser inconsistencies
			this.$clippableScroller = this.$clippableContainer.is( 'html, body' ) ?
				$( OO.ui.Element.static.getWindow( this.$clippableContainer ) ) :
				this.$clippableContainer;
			this.$clippableScroller.on( 'scroll', this.onClippableContainerScrollHandler );
			this.$clippableWindow = $( this.getElementWindow() )
				.on( 'resize', this.onClippableWindowResizeHandler );
			// Initial clip after visible
			this.clip();
		} else {
			this.$clippable.css( { width: '', height: '', overflowX: '', overflowY: '' } );
			OO.ui.Element.static.reconsiderScrollbars( this.$clippable[ 0 ] );

			this.$clippableContainer = null;
			this.$clippableScroller.off( 'scroll', this.onClippableContainerScrollHandler );
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
OO.ui.ClippableElement.prototype.isClipping = function () {
	return this.clipping;
};

/**
 * Check if the bottom or right of the element is being clipped by the nearest scrollable container.
 *
 * @return {boolean} Part of the element is being clipped
 */
OO.ui.ClippableElement.prototype.isClipped = function () {
	return this.clippedHorizontally || this.clippedVertically;
};

/**
 * Check if the right of the element is being clipped by the nearest scrollable container.
 *
 * @return {boolean} Part of the element is being clipped
 */
OO.ui.ClippableElement.prototype.isClippedHorizontally = function () {
	return this.clippedHorizontally;
};

/**
 * Check if the bottom of the element is being clipped by the nearest scrollable container.
 *
 * @return {boolean} Part of the element is being clipped
 */
OO.ui.ClippableElement.prototype.isClippedVertically = function () {
	return this.clippedVertically;
};

/**
 * Set the ideal size. These are the dimensions the element will have when it's not being clipped.
 *
 * @param {number|string} [width] Width as a number of pixels or CSS string with unit suffix
 * @param {number|string} [height] Height as a number of pixels or CSS string with unit suffix
 */
OO.ui.ClippableElement.prototype.setIdealSize = function ( width, height ) {
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
OO.ui.ClippableElement.prototype.clip = function () {
	if ( !this.clipping ) {
		// this.$clippableContainer and this.$clippableWindow are null, so the below will fail
		return this;
	}

	var buffer = 7, // Chosen by fair dice roll
		cOffset = this.$clippable.offset(),
		$container = this.$clippableContainer.is( 'html, body' ) ?
			this.$clippableWindow : this.$clippableContainer,
		ccOffset = $container.offset() || { top: 0, left: 0 },
		ccHeight = $container.innerHeight() - buffer,
		ccWidth = $container.innerWidth() - buffer,
		cHeight = this.$clippable.outerHeight() + buffer,
		cWidth = this.$clippable.outerWidth() + buffer,
		scrollTop = this.$clippableScroller.scrollTop(),
		scrollLeft = this.$clippableScroller.scrollLeft(),
		desiredWidth = cOffset.left < 0 ?
			cWidth + cOffset.left :
			( ccOffset.left + scrollLeft + ccWidth ) - cOffset.left,
		desiredHeight = cOffset.top < 0 ?
			cHeight + cOffset.top :
			( ccOffset.top + scrollTop + ccHeight ) - cOffset.top,
		naturalWidth = this.$clippable.prop( 'scrollWidth' ),
		naturalHeight = this.$clippable.prop( 'scrollHeight' ),
		clipWidth = desiredWidth < naturalWidth,
		clipHeight = desiredHeight < naturalHeight;

	if ( clipWidth ) {
		this.$clippable.css( { overflowX: 'scroll', width: desiredWidth } );
	} else {
		this.$clippable.css( { width: this.idealWidth || '', overflowX: '' } );
	}
	if ( clipHeight ) {
		this.$clippable.css( { overflowY: 'scroll', height: desiredHeight } );
	} else {
		this.$clippable.css( { height: this.idealHeight || '', overflowY: '' } );
	}

	// If we stopped clipping in at least one of the dimensions
	if ( !clipWidth || !clipHeight ) {
		OO.ui.Element.static.reconsiderScrollbars( this.$clippable[ 0 ] );
	}

	this.clippedHorizontally = clipWidth;
	this.clippedVertically = clipHeight;

	return this;
};

/**
 * Generic toolbar tool.
 *
 * @abstract
 * @class
 * @extends OO.ui.Widget
 * @mixins OO.ui.IconElement
 * @mixins OO.ui.FlaggedElement
 *
 * @constructor
 * @param {OO.ui.ToolGroup} toolGroup
 * @param {Object} [config] Configuration options
 * @cfg {string|Function} [title] Title text or a function that returns text
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
	OO.ui.Tool.super.call( this, config );

	// Mixin constructors
	OO.ui.IconElement.call( this, config );
	OO.ui.FlaggedElement.call( this, config );

	// Properties
	this.toolGroup = toolGroup;
	this.toolbar = this.toolGroup.getToolbar();
	this.active = false;
	this.$title = $( '<span>' );
	this.$accel = $( '<span>' );
	this.$link = $( '<a>' );
	this.title = null;

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
		.prop( 'tabIndex', 0 )
		.attr( 'role', 'button' );
	this.$element
		.data( 'oo-ui-tool', this )
		.addClass(
			'oo-ui-tool ' + 'oo-ui-tool-name-' +
			this.constructor.static.name.replace( /^([^\/]+)\/([^\/]+).*$/, '$1-$2' )
		)
		.append( this.$link );
	this.setTitle( config.title || this.constructor.static.title );
};

/* Setup */

OO.inheritClass( OO.ui.Tool, OO.ui.Widget );
OO.mixinClass( OO.ui.Tool, OO.ui.IconElement );
OO.mixinClass( OO.ui.Tool, OO.ui.FlaggedElement );

/* Events */

/**
 * @event select
 */

/* Static Properties */

/**
 * @static
 * @inheritdoc
 */
OO.ui.Tool.static.tagName = 'span';

/**
 * Symbolic name of tool.
 *
 * @abstract
 * @static
 * @inheritable
 * @property {string}
 */
OO.ui.Tool.static.name = '';

/**
 * Tool group.
 *
 * @abstract
 * @static
 * @inheritable
 * @property {string}
 */
OO.ui.Tool.static.group = '';

/**
 * Tool title.
 *
 * Title is used as a tooltip when the tool is part of a bar tool group, or a label when the tool
 * is part of a list or menu tool group. If a trigger is associated with an action by the same name
 * as the tool, a description of its keyboard shortcut for the appropriate platform will be
 * appended to the title if the tool is part of a bar tool group.
 *
 * @abstract
 * @static
 * @inheritable
 * @property {string|Function} Title text or a function that returns text
 */
OO.ui.Tool.static.title = '';

/**
 * Tool can be automatically added to catch-all groups.
 *
 * @static
 * @inheritable
 * @property {boolean}
 */
OO.ui.Tool.static.autoAddToCatchall = true;

/**
 * Tool can be automatically added to named groups.
 *
 * @static
 * @property {boolean}
 * @inheritable
 */
OO.ui.Tool.static.autoAddToGroup = true;

/**
 * Check if this tool is compatible with given data.
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
 * @abstract
 */
OO.ui.Tool.prototype.onSelect = function () {
	throw new Error(
		'OO.ui.Tool.onSelect not implemented in this subclass:' + this.constructor
	);
};

/**
 * Check if the button is active.
 *
 * @return {boolean} Button is active
 */
OO.ui.Tool.prototype.isActive = function () {
	return this.active;
};

/**
 * Make the button appear active or inactive.
 *
 * @param {boolean} state Make button appear active
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
 * Get the tool title.
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
 * Get the tool title.
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
 */
OO.ui.Tool.prototype.destroy = function () {
	this.toolbar.disconnect( this );
	this.$element.remove();
};

/**
 * Collection of tool groups.
 *
 * @class
 * @extends OO.ui.Element
 * @mixins OO.EventEmitter
 * @mixins OO.ui.GroupElement
 *
 * @constructor
 * @param {OO.ui.ToolFactory} toolFactory Factory for creating tools
 * @param {OO.ui.ToolGroupFactory} toolGroupFactory Factory for creating tool groups
 * @param {Object} [config] Configuration options
 * @cfg {boolean} [actions] Add an actions section opposite to the tools
 * @cfg {boolean} [shadow] Add a shadow below the toolbar
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
	OO.ui.Toolbar.super.call( this, config );

	// Mixin constructors
	OO.EventEmitter.call( this );
	OO.ui.GroupElement.call( this, config );

	// Properties
	this.toolFactory = toolFactory;
	this.toolGroupFactory = toolGroupFactory;
	this.groups = [];
	this.tools = {};
	this.$bar = $( '<div>' );
	this.$actions = $( '<div>' );
	this.initialized = false;

	// Events
	this.$element
		.add( this.$bar ).add( this.$group ).add( this.$actions )
		.on( 'mousedown touchstart', this.onPointerDown.bind( this ) );

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
OO.mixinClass( OO.ui.Toolbar, OO.ui.GroupElement );

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
 * Get the tool group factory.
 *
 * @return {OO.Factory} Tool group factory
 */
OO.ui.Toolbar.prototype.getToolGroupFactory = function () {
	return this.toolGroupFactory;
};

/**
 * Handles mouse down events.
 *
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
 * Sets up handles and preloads required information for the toolbar to work.
 * This must be called after it is attached to a visible document and before doing anything else.
 */
OO.ui.Toolbar.prototype.initialize = function () {
	this.initialized = true;
};

/**
 * Setup toolbar.
 *
 * Tools can be specified in the following ways:
 *
 * - A specific tool: `{ name: 'tool-name' }` or `'tool-name'`
 * - All tools in a group: `{ group: 'group-name' }`
 * - All tools: `'*'` - Using this will make the group a list with a "More" label by default
 *
 * @param {Object.<string,Array>} groups List of tool group configurations
 * @param {Array|string} [groups.include] Tools to include
 * @param {Array|string} [groups.exclude] Tools to exclude
 * @param {Array|string} [groups.promote] Tools to promote to the beginning
 * @param {Array|string} [groups.demote] Tools to demote to the end
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
 * Remove all tools and groups from the toolbar.
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
 * Destroys toolbar, removing event handlers and DOM elements.
 *
 * Call this whenever you are done using a toolbar.
 */
OO.ui.Toolbar.prototype.destroy = function () {
	this.reset();
	this.$element.remove();
};

/**
 * Check if tool has not been used yet.
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
 * This is a stub that should be overridden to provide access to accelerator information.
 *
 * @param {string} name Symbolic name of tool
 * @return {string|undefined} Tool accelerator label if available
 */
OO.ui.Toolbar.prototype.getToolAccelerator = function () {
	return undefined;
};

/**
 * Collection of tools.
 *
 * Tools can be specified in the following ways:
 *
 * - A specific tool: `{ name: 'tool-name' }` or `'tool-name'`
 * - All tools in a group: `{ group: 'group-name' }`
 * - All tools: `'*'`
 *
 * @abstract
 * @class
 * @extends OO.ui.Widget
 * @mixins OO.ui.GroupElement
 *
 * @constructor
 * @param {OO.ui.Toolbar} toolbar
 * @param {Object} [config] Configuration options
 * @cfg {Array|string} [include=[]] List of tools to include
 * @cfg {Array|string} [exclude=[]] List of tools to exclude
 * @cfg {Array|string} [promote=[]] List of tools to promote to the beginning
 * @cfg {Array|string} [demote=[]] List of tools to demote to the end
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
	OO.ui.ToolGroup.super.call( this, config );

	// Mixin constructors
	OO.ui.GroupElement.call( this, config );

	// Properties
	this.toolbar = toolbar;
	this.tools = {};
	this.pressed = null;
	this.autoDisabled = false;
	this.include = config.include || [];
	this.exclude = config.exclude || [];
	this.promote = config.promote || [];
	this.demote = config.demote || [];
	this.onCapturedMouseUpHandler = this.onCapturedMouseUp.bind( this );

	// Events
	this.$element.on( {
		'mousedown touchstart': this.onPointerDown.bind( this ),
		'mouseup touchend': this.onPointerUp.bind( this ),
		mouseover: this.onMouseOver.bind( this ),
		mouseout: this.onMouseOut.bind( this )
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
OO.mixinClass( OO.ui.ToolGroup, OO.ui.GroupElement );

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
	return this.autoDisabled || OO.ui.ToolGroup.super.prototype.isDisabled.apply( this, arguments );
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
	OO.ui.ToolGroup.super.prototype.updateDisabled.apply( this, arguments );
};

/**
 * Handle mouse down events.
 *
 * @param {jQuery.Event} e Mouse down event
 */
OO.ui.ToolGroup.prototype.onPointerDown = function ( e ) {
	// e.which is 0 for touch events, 1 for left mouse button
	if ( !this.isDisabled() && e.which <= 1 ) {
		this.pressed = this.getTargetTool( e );
		if ( this.pressed ) {
			this.pressed.setActive( true );
			this.getElementDocument().addEventListener(
				'mouseup', this.onCapturedMouseUpHandler, true
			);
		}
	}
	return false;
};

/**
 * Handle captured mouse up events.
 *
 * @param {Event} e Mouse up event
 */
OO.ui.ToolGroup.prototype.onCapturedMouseUp = function ( e ) {
	this.getElementDocument().removeEventListener( 'mouseup', this.onCapturedMouseUpHandler, true );
	// onPointerUp may be called a second time, depending on where the mouse is when the button is
	// released, but since `this.pressed` will no longer be true, the second call will be ignored.
	this.onPointerUp( e );
};

/**
 * Handle mouse up events.
 *
 * @param {jQuery.Event} e Mouse up event
 */
OO.ui.ToolGroup.prototype.onPointerUp = function ( e ) {
	var tool = this.getTargetTool( e );

	// e.which is 0 for touch events, 1 for left mouse button
	if ( !this.isDisabled() && e.which <= 1 && this.pressed && this.pressed === tool ) {
		this.pressed.onSelect();
	}

	this.pressed = null;
	return false;
};

/**
 * Handle mouse over events.
 *
 * @param {jQuery.Event} e Mouse over event
 */
OO.ui.ToolGroup.prototype.onMouseOver = function ( e ) {
	var tool = this.getTargetTool( e );

	if ( this.pressed && this.pressed === tool ) {
		this.pressed.setActive( true );
	}
};

/**
 * Handle mouse out events.
 *
 * @param {jQuery.Event} e Mouse out event
 */
OO.ui.ToolGroup.prototype.onMouseOut = function ( e ) {
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
 * @param {string} name Symbolic name of tool
 */
OO.ui.ToolGroup.prototype.onToolFactoryRegister = function () {
	this.populate();
};

/**
 * Get the toolbar this group is in.
 *
 * @return {OO.ui.Toolbar} Toolbar of group
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
 * Destroy tool group.
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
 * Dialog for showing a message.
 *
 * User interface:
 * - Registers two actions by default (safe and primary).
 * - Renders action widgets in the footer.
 *
 * @class
 * @extends OO.ui.Dialog
 *
 * @constructor
 * @param {Object} [config] Configuration options
 */
OO.ui.MessageDialog = function OoUiMessageDialog( config ) {
	// Parent constructor
	OO.ui.MessageDialog.super.call( this, config );

	// Properties
	this.verticalActionLayout = null;

	// Initialization
	this.$element.addClass( 'oo-ui-messageDialog' );
};

/* Inheritance */

OO.inheritClass( OO.ui.MessageDialog, OO.ui.Dialog );

/* Static Properties */

OO.ui.MessageDialog.static.name = 'message';

OO.ui.MessageDialog.static.size = 'small';

OO.ui.MessageDialog.static.verbose = false;

/**
 * Dialog title.
 *
 * A confirmation dialog's title should describe what the progressive action will do. An alert
 * dialog's title should describe what event occurred.
 *
 * @static
 * inheritable
 * @property {jQuery|string|Function|null}
 */
OO.ui.MessageDialog.static.title = null;

/**
 * A confirmation dialog's message should describe the consequences of the progressive action. An
 * alert dialog's message should describe why the event occurred.
 *
 * @static
 * inheritable
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
	OO.ui.MessageDialog.super.prototype.setManager.call( this, manager );

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
	return OO.ui.MessageDialog.super.prototype.onActionResize.call( this, action );
};

/**
 * Handle window resized events.
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
	return OO.ui.MessageDialog.super.prototype.getActionProcess.call( this, action );
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
	return OO.ui.MessageDialog.super.prototype.getSetupProcess.call( this, data )
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
	OO.ui.MessageDialog.super.prototype.setDimensions.call( this, dim );

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
	OO.ui.MessageDialog.super.prototype.initialize.call( this );

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
	OO.ui.MessageDialog.super.prototype.attachActions.call( this );

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
 * Navigation dialog window.
 *
 * Logic:
 * - Show and hide errors.
 * - Retry an action.
 *
 * User interface:
 * - Renders header with dialog title and one action widget on either side
 *   (a 'safe' button on the left, and a 'primary' button on the right, both of
 *   which close the dialog).
 * - Displays any action widgets in the footer (none by default).
 * - Ability to dismiss errors.
 *
 * Subclass responsibilities:
 * - Register a 'safe' action.
 * - Register a 'primary' action.
 * - Add content to the dialog.
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
	OO.ui.ProcessDialog.super.call( this, config );

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
 */
OO.ui.ProcessDialog.prototype.onDismissErrorButtonClick = function () {
	this.hideErrors();
};

/**
 * Handle retry button click events.
 *
 * Hides errors and then tries again.
 */
OO.ui.ProcessDialog.prototype.onRetryButtonClick = function () {
	this.hideErrors();
	this.executeAction( this.currentAction.getAction() );
};

/**
 * @inheritdoc
 */
OO.ui.ProcessDialog.prototype.onActionResize = function ( action ) {
	if ( this.actions.isSpecial( action ) ) {
		this.fitLabel();
	}
	return OO.ui.ProcessDialog.super.prototype.onActionResize.call( this, action );
};

/**
 * @inheritdoc
 */
OO.ui.ProcessDialog.prototype.initialize = function () {
	// Parent method
	OO.ui.ProcessDialog.super.prototype.initialize.call( this );

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
OO.ui.ProcessDialog.prototype.attachActions = function () {
	var i, len, other, special, others;

	// Parent method
	OO.ui.ProcessDialog.super.prototype.attachActions.call( this );

	special = this.actions.getSpecial();
	others = this.actions.getOthers();
	if ( special.primary ) {
		this.$primaryActions.append( special.primary.$element );
		special.primary.toggleFramed( true );
	}
	for ( i = 0, len = others.length; i < len; i++ ) {
		other = others[ i ];
		this.$otherActions.append( other.$element );
		other.toggleFramed( true );
	}
	if ( special.safe ) {
		this.$safeActions.append( special.safe.$element );
		special.safe.toggleFramed( true );
	}

	this.fitLabel();
	this.$body.css( 'bottom', this.$foot.outerHeight( true ) );
};

/**
 * @inheritdoc
 */
OO.ui.ProcessDialog.prototype.executeAction = function ( action ) {
	OO.ui.ProcessDialog.super.prototype.executeAction.call( this, action )
		.fail( this.showErrors.bind( this ) );
};

/**
 * Fit label between actions.
 *
 * @chainable
 */
OO.ui.ProcessDialog.prototype.fitLabel = function () {
	var width = Math.max(
		this.$safeActions.is( ':visible' ) ? this.$safeActions.width() : 0,
		this.$primaryActions.is( ':visible' ) ? this.$primaryActions.width() : 0
	);
	this.$location.css( { paddingLeft: width, paddingRight: width } );

	return this;
};

/**
 * Handle errors that occurred during accept or reject processes.
 *
 * @param {OO.ui.Error[]} errors Errors to be handled
 */
OO.ui.ProcessDialog.prototype.showErrors = function ( errors ) {
	var i, len, $item,
		items = [],
		recoverable = true,
		warning = false;

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
		this.retryButton.clearFlags().setFlags( this.currentAction.getFlags() );
	} else {
		this.currentAction.setDisabled( true );
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
 */
OO.ui.ProcessDialog.prototype.hideErrors = function () {
	this.$errors.addClass( 'oo-ui-element-hidden' );
	this.$errorItems.remove();
	this.$errorItems = null;
};

/**
 * FieldLayouts are used with OO.ui.FieldsetLayout. Each FieldLayout requires a field-widget,
 * which is a widget that is specified by reference before any optional configuration settings.
 *
 * Field layouts can be configured with help text and/or labels. Labels are aligned in one of four ways:
 *
 * - **left**: The label is placed before the field-widget and aligned with the left margin.
 *             A left-alignment is used for forms with many fields.
 * - **right**: The label is placed before the field-widget and aligned to the right margin.
 *              A right-alignment is used for long but familiar forms which users tab through,
 *              verifying the current field with a quick glance at the label.
 * - **top**: The label is placed above the field-widget. A top-alignment is used for brief forms
 *            that users fill out from top to bottom.
 * - **inline**: The label is placed after the field-widget and aligned to the left.
                 An inline-alignment is best used with checkboxes or radio buttons.
 *
 * Help text is accessed via a help icon that appears in the upper right corner of the rendered field layout.
 * Please see the [OOjs UI documentation on MediaWiki] [1] for examples and more information.
 *
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Layouts/Fields_and_Fieldsets
 * @class
 * @extends OO.ui.Layout
 * @mixins OO.ui.LabelElement
 *
 * @constructor
 * @param {OO.ui.Widget} fieldWidget Field widget
 * @param {Object} [config] Configuration options
 * @cfg {string} [align='left'] Alignment mode, either 'left', 'right', 'top' or 'inline'
 * @cfg {string} [help] Explanatory text shown as a '?' icon.
 */
OO.ui.FieldLayout = function OoUiFieldLayout( fieldWidget, config ) {
	// Allow passing positional parameters inside the config object
	if ( OO.isPlainObject( fieldWidget ) && config === undefined ) {
		config = fieldWidget;
		fieldWidget = config.fieldWidget;
	}

	var hasInputWidget = fieldWidget instanceof OO.ui.InputWidget;

	// Configuration initialization
	config = $.extend( { align: 'left' }, config );

	// Parent constructor
	OO.ui.FieldLayout.super.call( this, config );

	// Mixin constructors
	OO.ui.LabelElement.call( this, config );

	// Properties
	this.fieldWidget = fieldWidget;
	this.$field = $( '<div>' );
	this.$body = $( '<' + ( hasInputWidget ? 'label' : 'div' ) + '>' );
	this.align = null;
	if ( config.help ) {
		this.popupButtonWidget = new OO.ui.PopupButtonWidget( {
			classes: [ 'oo-ui-fieldLayout-help' ],
			framed: false,
			icon: 'info'
		} );

		this.popupButtonWidget.getPopup().$body.append(
			$( '<div>' )
				.text( config.help )
				.addClass( 'oo-ui-fieldLayout-help-content' )
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
	this.$body.addClass( 'oo-ui-fieldLayout-body' );
	this.$field
		.addClass( 'oo-ui-fieldLayout-field' )
		.toggleClass( 'oo-ui-fieldLayout-disable', this.fieldWidget.isDisabled() )
		.append( this.fieldWidget.$element );

	this.setAlignment( config.align );
};

/* Setup */

OO.inheritClass( OO.ui.FieldLayout, OO.ui.Layout );
OO.mixinClass( OO.ui.FieldLayout, OO.ui.LabelElement );

/* Methods */

/**
 * Handle field disable events.
 *
 * @param {boolean} value Field is disabled
 */
OO.ui.FieldLayout.prototype.onFieldDisable = function ( value ) {
	this.$element.toggleClass( 'oo-ui-fieldLayout-disabled', value );
};

/**
 * Handle label mouse click events.
 *
 * @param {jQuery.Event} e Mouse click event
 */
OO.ui.FieldLayout.prototype.onLabelClick = function () {
	this.fieldWidget.simulateLabelClick();
	return false;
};

/**
 * Get the field.
 *
 * @return {OO.ui.Widget} Field widget
 */
OO.ui.FieldLayout.prototype.getField = function () {
	return this.fieldWidget;
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
 * Layout made of a field, a button, and an optional label.
 *
 * @class
 * @extends OO.ui.FieldLayout
 *
 * @constructor
 * @param {OO.ui.Widget} fieldWidget Field widget
 * @param {OO.ui.ButtonWidget} buttonWidget Button widget
 * @param {Object} [config] Configuration options
 * @cfg {string} [align='left'] Alignment mode, either 'left', 'right', 'top' or 'inline'
 * @cfg {string} [help] Explanatory text shown as a '?' icon.
 */
OO.ui.ActionFieldLayout = function OoUiActionFieldLayout( fieldWidget, buttonWidget, config ) {
	// Allow passing positional parameters inside the config object
	if ( OO.isPlainObject( fieldWidget ) && config === undefined ) {
		config = fieldWidget;
		fieldWidget = config.fieldWidget;
		buttonWidget = config.buttonWidget;
	}

	// Configuration initialization
	config = $.extend( { align: 'left' }, config );

	// Parent constructor
	OO.ui.ActionFieldLayout.super.call( this, fieldWidget, config );

	// Mixin constructors
	OO.ui.LabelElement.call( this, config );

	// Properties
	this.fieldWidget = fieldWidget;
	this.buttonWidget = buttonWidget;
	this.$button = $( '<div>' )
		.addClass( 'oo-ui-actionFieldLayout-button' )
		.append( this.buttonWidget.$element );
	this.$input = $( '<div>' )
		.addClass( 'oo-ui-actionFieldLayout-input' )
		.append( this.fieldWidget.$element );
	this.$field
		.addClass( 'oo-ui-actionFieldLayout' )
		.append( this.$input, this.$button );
};

/* Setup */

OO.inheritClass( OO.ui.ActionFieldLayout, OO.ui.FieldLayout );

/**
 * Layout made of a fieldset and optional legend.
 *
 * Just add OO.ui.FieldLayout items.
 *
 * @class
 * @extends OO.ui.Layout
 * @mixins OO.ui.IconElement
 * @mixins OO.ui.LabelElement
 * @mixins OO.ui.GroupElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {OO.ui.FieldLayout[]} [items] Items to add
 */
OO.ui.FieldsetLayout = function OoUiFieldsetLayout( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.FieldsetLayout.super.call( this, config );

	// Mixin constructors
	OO.ui.IconElement.call( this, config );
	OO.ui.LabelElement.call( this, config );
	OO.ui.GroupElement.call( this, config );

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
OO.mixinClass( OO.ui.FieldsetLayout, OO.ui.IconElement );
OO.mixinClass( OO.ui.FieldsetLayout, OO.ui.LabelElement );
OO.mixinClass( OO.ui.FieldsetLayout, OO.ui.GroupElement );

/**
 * Layout with an HTML form.
 *
 * @class
 * @extends OO.ui.Layout
 * @mixins OO.ui.GroupElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {string} [method] HTML form `method` attribute
 * @cfg {string} [action] HTML form `action` attribute
 * @cfg {string} [enctype] HTML form `enctype` attribute
 * @cfg {OO.ui.FieldsetLayout[]} [items] Items to add
 */
OO.ui.FormLayout = function OoUiFormLayout( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.FormLayout.super.call( this, config );

	// Mixin constructors
	OO.ui.GroupElement.call( this, $.extend( {}, config, { $group: this.$element } ) );

	// Events
	this.$element.on( 'submit', this.onFormSubmit.bind( this ) );

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
OO.mixinClass( OO.ui.FormLayout, OO.ui.GroupElement );

/* Events */

/**
 * @event submit
 */

/* Static Properties */

OO.ui.FormLayout.static.tagName = 'form';

/* Methods */

/**
 * Handle form submit events.
 *
 * @param {jQuery.Event} e Submit event
 * @fires submit
 */
OO.ui.FormLayout.prototype.onFormSubmit = function () {
	this.emit( 'submit' );
	return false;
};

/**
 * Layout made of proportionally sized columns and rows.
 *
 * @class
 * @extends OO.ui.Layout
 * @deprecated Use OO.ui.MenuLayout or plain CSS instead.
 *
 * @constructor
 * @param {OO.ui.PanelLayout[]} panels Panels in the grid
 * @param {Object} [config] Configuration options
 * @cfg {number[]} [widths] Widths of columns as ratios
 * @cfg {number[]} [heights] Heights of rows as ratios
 */
OO.ui.GridLayout = function OoUiGridLayout( panels, config ) {
	// Allow passing positional parameters inside the config object
	if ( OO.isPlainObject( panels ) && config === undefined ) {
		config = panels;
		panels = config.panels;
	}

	var i, len, widths;

	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.GridLayout.super.call( this, config );

	// Properties
	this.panels = [];
	this.widths = [];
	this.heights = [];

	// Initialization
	this.$element.addClass( 'oo-ui-gridLayout' );
	for ( i = 0, len = panels.length; i < len; i++ ) {
		this.panels.push( panels[ i ] );
		this.$element.append( panels[ i ].$element );
	}
	if ( config.widths || config.heights ) {
		this.layout( config.widths || [ 1 ], config.heights || [ 1 ] );
	} else {
		// Arrange in columns by default
		widths = this.panels.map( function () { return 1; } );
		this.layout( widths, [ 1 ] );
	}
};

/* Setup */

OO.inheritClass( OO.ui.GridLayout, OO.ui.Layout );

/* Events */

/**
 * @event layout
 */

/**
 * @event update
 */

/* Methods */

/**
 * Set grid dimensions.
 *
 * @param {number[]} widths Widths of columns as ratios
 * @param {number[]} heights Heights of rows as ratios
 * @fires layout
 * @throws {Error} If grid is not large enough to fit all panels
 */
OO.ui.GridLayout.prototype.layout = function ( widths, heights ) {
	var x, y,
		xd = 0,
		yd = 0,
		cols = widths.length,
		rows = heights.length;

	// Verify grid is big enough to fit panels
	if ( cols * rows < this.panels.length ) {
		throw new Error( 'Grid is not large enough to fit ' + this.panels.length + 'panels' );
	}

	// Sum up denominators
	for ( x = 0; x < cols; x++ ) {
		xd += widths[ x ];
	}
	for ( y = 0; y < rows; y++ ) {
		yd += heights[ y ];
	}
	// Store factors
	this.widths = [];
	this.heights = [];
	for ( x = 0; x < cols; x++ ) {
		this.widths[ x ] = widths[ x ] / xd;
	}
	for ( y = 0; y < rows; y++ ) {
		this.heights[ y ] = heights[ y ] / yd;
	}
	// Synchronize view
	this.update();
	this.emit( 'layout' );
};

/**
 * Update panel positions and sizes.
 *
 * @fires update
 */
OO.ui.GridLayout.prototype.update = function () {
	var x, y, panel, width, height, dimensions,
		i = 0,
		top = 0,
		left = 0,
		cols = this.widths.length,
		rows = this.heights.length;

	for ( y = 0; y < rows; y++ ) {
		height = this.heights[ y ];
		for ( x = 0; x < cols; x++ ) {
			width = this.widths[ x ];
			panel = this.panels[ i ];
			dimensions = {
				width: ( width * 100 ) + '%',
				height: ( height * 100 ) + '%',
				top: ( top * 100 ) + '%'
			};
			// If RTL, reverse:
			if ( OO.ui.Element.static.getDir( document ) === 'rtl' ) {
				dimensions.right = ( left * 100 ) + '%';
			} else {
				dimensions.left = ( left * 100 ) + '%';
			}
			// HACK: Work around IE bug by setting visibility: hidden; if width or height is zero
			if ( width === 0 || height === 0 ) {
				dimensions.visibility = 'hidden';
			} else {
				dimensions.visibility = '';
			}
			panel.$element.css( dimensions );
			i++;
			left += width;
		}
		top += height;
		left = 0;
	}

	this.emit( 'update' );
};

/**
 * Get a panel at a given position.
 *
 * The x and y position is affected by the current grid layout.
 *
 * @param {number} x Horizontal position
 * @param {number} y Vertical position
 * @return {OO.ui.PanelLayout} The panel at the given position
 */
OO.ui.GridLayout.prototype.getPanel = function ( x, y ) {
	return this.panels[ ( x * this.widths.length ) + y ];
};

/**
 * Layout with a content and menu area.
 *
 * The menu area can be positioned at the top, after, bottom or before. The content area will fill
 * all remaining space.
 *
 * @class
 * @extends OO.ui.Layout
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {number|string} [menuSize='18em'] Size of menu in pixels or any CSS unit
 * @cfg {boolean} [showMenu=true] Show menu
 * @cfg {string} [position='before'] Position of menu, either `top`, `after`, `bottom` or `before`
 * @cfg {boolean} [collapse] Collapse the menu out of view
 */
OO.ui.MenuLayout = function OoUiMenuLayout( config ) {
	var positions = this.constructor.static.menuPositions;

	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.MenuLayout.super.call( this, config );

	// Properties
	this.showMenu = config.showMenu !== false;
	this.menuSize = config.menuSize || '18em';
	this.menuPosition = positions[ config.menuPosition ] || positions.before;

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
	this.toggleMenu( this.showMenu );
	this.updateSizes();
	this.$menu
		.addClass( 'oo-ui-menuLayout-menu' )
		.css( this.menuPosition.sizeProperty, this.menuSize );
	this.$content.addClass( 'oo-ui-menuLayout-content' );
	this.$element
		.addClass( 'oo-ui-menuLayout ' + this.menuPosition.className )
		.append( this.$content, this.$menu );
};

/* Setup */

OO.inheritClass( OO.ui.MenuLayout, OO.ui.Layout );

/* Static Properties */

OO.ui.MenuLayout.static.menuPositions = {
	top: {
		sizeProperty: 'height',
		className: 'oo-ui-menuLayout-top'
	},
	after: {
		sizeProperty: 'width',
		className: 'oo-ui-menuLayout-after'
	},
	bottom: {
		sizeProperty: 'height',
		className: 'oo-ui-menuLayout-bottom'
	},
	before: {
		sizeProperty: 'width',
		className: 'oo-ui-menuLayout-before'
	}
};

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
		this.updateSizes();
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
 * Set menu size.
 *
 * @param {number|string} size Size of menu in pixels or any CSS unit
 * @chainable
 */
OO.ui.MenuLayout.prototype.setMenuSize = function ( size ) {
	this.menuSize = size;
	this.updateSizes();

	return this;
};

/**
 * Update menu and content CSS based on current menu size and visibility
 *
 * This method is called internally when size or position is changed.
 */
OO.ui.MenuLayout.prototype.updateSizes = function () {
	if ( this.showMenu ) {
		this.$menu
			.css( this.menuPosition.sizeProperty, this.menuSize )
			.css( 'overflow', '' );
		// Set offsets on all sides. CSS resets all but one with
		// 'important' rules so directionality flips are supported
		this.$content.css( {
			top: this.menuSize,
			right: this.menuSize,
			bottom: this.menuSize,
			left: this.menuSize
		} );
	} else {
		this.$menu
			.css( this.menuPosition.sizeProperty, 0 )
			.css( 'overflow', 'hidden' );
		this.$content.css( {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0
		} );
	}
};

/**
 * Get menu size.
 *
 * @return {number|string} Menu size
 */
OO.ui.MenuLayout.prototype.getMenuSize = function () {
	return this.menuSize;
};

/**
 * Set menu position.
 *
 * @param {string} position Position of menu, either `top`, `after`, `bottom` or `before`
 * @throws {Error} If position value is not supported
 * @chainable
 */
OO.ui.MenuLayout.prototype.setMenuPosition = function ( position ) {
	var positions = this.constructor.static.menuPositions;

	if ( !positions[ position ] ) {
		throw new Error( 'Cannot set position; unsupported position value: ' + position );
	}

	this.$menu.css( this.menuPosition.sizeProperty, '' );
	this.$element.removeClass( this.menuPosition.className );

	this.menuPosition = positions[ position ];

	this.updateSizes();
	this.$element.addClass( this.menuPosition.className );

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
 * Layout containing a series of pages.
 *
 * @class
 * @extends OO.ui.MenuLayout
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {boolean} [continuous=false] Show all pages, one after another
 * @cfg {boolean} [autoFocus=true] Focus on the first focusable element when changing to a page
 * @cfg {boolean} [outlined=false] Show an outline
 * @cfg {boolean} [editable=false] Show controls for adding, removing and reordering pages
 */
OO.ui.BookletLayout = function OoUiBookletLayout( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.BookletLayout.super.call( this, config );

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
 * @event set
 * @param {OO.ui.PageLayout} page Current page
 */

/**
 * @event add
 * @param {OO.ui.PageLayout[]} page Added pages
 * @param {number} index Index pages were added at
 */

/**
 * @event remove
 * @param {OO.ui.PageLayout[]} pages Removed pages
 */

/* Methods */

/**
 * Handle stack layout focus.
 *
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
 */
OO.ui.BookletLayout.prototype.focus = function () {
	var $input, page = this.stackLayout.getCurrentItem();
	if ( !page && this.outlined ) {
		this.selectFirstSelectablePage();
		page = this.stackLayout.getCurrentItem();
	}
	if ( !page ) {
		return;
	}
	// Only change the focus if is not already in the current page
	if ( !page.$element.find( ':focus' ).length ) {
		$input = page.$element.find( ':input:first' );
		if ( $input.length ) {
			$input[ 0 ].focus();
		}
	}
};

/**
 * Handle outline widget select events.
 *
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
 * @return {boolean}
 */
OO.ui.BookletLayout.prototype.isOutlined = function () {
	return this.outlined;
};

/**
 * Check if booklet has editing controls.
 *
 * @return {boolean}
 */
OO.ui.BookletLayout.prototype.isEditable = function () {
	return this.editable;
};

/**
 * Check if booklet has a visible outline.
 *
 * @return {boolean}
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
 * Get the outline widget.
 *
 * @param {OO.ui.PageLayout} page Page to be selected
 * @return {OO.ui.PageLayout|null} Closest page to another
 */
OO.ui.BookletLayout.prototype.getClosestPage = function ( page ) {
	var next, prev, level,
		pages = this.stackLayout.getItems(),
		index = $.inArray( page, pages );

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
 * @return {OO.ui.OutlineSelectWidget|null} Outline widget, or null if booklet has no outline
 */
OO.ui.BookletLayout.prototype.getOutline = function () {
	return this.outlineSelectWidget;
};

/**
 * Get the outline controls widget. If the outline is not editable, null is returned.
 *
 * @return {OO.ui.OutlineControlsWidget|null} The outline controls widget.
 */
OO.ui.BookletLayout.prototype.getOutlineControls = function () {
	return this.outlineControlsWidget;
};

/**
 * Get a page by name.
 *
 * @param {string} name Symbolic name of page
 * @return {OO.ui.PageLayout|undefined} Page, if found
 */
OO.ui.BookletLayout.prototype.getPage = function ( name ) {
	return this.pages[ name ];
};

/**
 * Get the current page
 *
 * @return {OO.ui.PageLayout|undefined} Current page, if found
 */
OO.ui.BookletLayout.prototype.getCurrentPage = function () {
	var name = this.getCurrentPageName();
	return name ? this.getPage( name ) : undefined;
};

/**
 * Get the current page name.
 *
 * @return {string|null} Current page name
 */
OO.ui.BookletLayout.prototype.getCurrentPageName = function () {
	return this.currentPageName;
};

/**
 * Add a page to the layout.
 *
 * When pages are added with the same names as existing pages, the existing pages will be
 * automatically removed before the new pages are added.
 *
 * @param {OO.ui.PageLayout[]} pages Pages to add
 * @param {number} index Index to insert pages after
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
			currentIndex = $.inArray( this.pages[ name ], stackLayoutPages );
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
 * Remove a page from the layout.
 *
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
 * Clear all pages from the layout.
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
 * Set the current page by name.
 *
 * @fires set
 * @param {string} name Symbolic name of page
 */
OO.ui.BookletLayout.prototype.setPage = function ( name ) {
	var selectedItem,
		$focused,
		page = this.pages[ name ];

	if ( name !== this.currentPageName ) {
		if ( this.outlined ) {
			selectedItem = this.outlineSelectWidget.getSelectedItem();
			if ( selectedItem && selectedItem.getData() !== name ) {
				this.outlineSelectWidget.selectItem( this.outlineSelectWidget.getItemFromData( name ) );
			}
		}
		if ( page ) {
			if ( this.currentPageName && this.pages[ this.currentPageName ] ) {
				this.pages[ this.currentPageName ].setActive( false );
				// Blur anything focused if the next page doesn't have anything focusable - this
				// is not needed if the next page has something focusable because once it is focused
				// this blur happens automatically
				if ( this.autoFocus && !page.$element.find( ':input' ).length ) {
					$focused = this.pages[ this.currentPageName ].$element.find( ':focus' );
					if ( $focused.length ) {
						$focused[ 0 ].blur();
					}
				}
			}
			this.currentPageName = name;
			this.stackLayout.setItem( page );
			page.setActive( true );
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
 * Layout that expands to cover the entire area of its parent, with optional scrolling and padding.
 *
 * @class
 * @extends OO.ui.Layout
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {boolean} [scrollable=false] Allow vertical scrolling
 * @cfg {boolean} [padded=false] Pad the content from the edges
 * @cfg {boolean} [expanded=true] Expand size to fill the entire parent element
 */
OO.ui.PanelLayout = function OoUiPanelLayout( config ) {
	// Configuration initialization
	config = $.extend( {
		scrollable: false,
		padded: false,
		expanded: true
	}, config );

	// Parent constructor
	OO.ui.PanelLayout.super.call( this, config );

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
};

/* Setup */

OO.inheritClass( OO.ui.PanelLayout, OO.ui.Layout );

/**
 * Page within an booklet layout.
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
	OO.ui.PageLayout.super.call( this, config );

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
 * @event active
 * @param {boolean} active Page is active
 */

/* Methods */

/**
 * Get page name.
 *
 * @return {string} Symbolic name of page
 */
OO.ui.PageLayout.prototype.getName = function () {
	return this.name;
};

/**
 * Check if page is active.
 *
 * @return {boolean} Page is active
 */
OO.ui.PageLayout.prototype.isActive = function () {
	return this.active;
};

/**
 * Get outline item.
 *
 * @return {OO.ui.OutlineOptionWidget|null} Outline item widget
 */
OO.ui.PageLayout.prototype.getOutlineItem = function () {
	return this.outlineItem;
};

/**
 * Set outline item.
 *
 * @localdoc Subclasses should override #setupOutlineItem instead of this method to adjust the
 *   outline item as desired; this method is called for setting (with an object) and unsetting
 *   (with null) and overriding methods would have to check the value of `outlineItem` to avoid
 *   operating on null instead of an OO.ui.OutlineOptionWidget object.
 *
 * @param {OO.ui.OutlineOptionWidget|null} outlineItem Outline item widget, null to clear
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
 * Setup outline item.
 *
 * @localdoc Subclasses should override this method to adjust the outline item as desired.
 *
 * @param {OO.ui.OutlineOptionWidget} outlineItem Outline item widget to setup
 * @chainable
 */
OO.ui.PageLayout.prototype.setupOutlineItem = function () {
	return this;
};

/**
 * Set page active state.
 *
 * @param {boolean} Page is active
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
 * Layout containing a series of mutually exclusive pages.
 *
 * @class
 * @extends OO.ui.PanelLayout
 * @mixins OO.ui.GroupElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {boolean} [continuous=false] Show all pages, one after another
 * @cfg {OO.ui.Layout[]} [items] Layouts to add
 */
OO.ui.StackLayout = function OoUiStackLayout( config ) {
	// Configuration initialization
	config = $.extend( { scrollable: true }, config );

	// Parent constructor
	OO.ui.StackLayout.super.call( this, config );

	// Mixin constructors
	OO.ui.GroupElement.call( this, $.extend( {}, config, { $group: this.$element } ) );

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
OO.mixinClass( OO.ui.StackLayout, OO.ui.GroupElement );

/* Events */

/**
 * @event set
 * @param {OO.ui.Layout|null} item Current item or null if there is no longer a layout shown
 */

/* Methods */

/**
 * Get the current item.
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
 * Add items.
 *
 * Adding an existing item (by value) will move it.
 *
 * @param {OO.ui.Layout[]} items Items to add
 * @param {number} [index] Index to insert items after
 * @chainable
 */
OO.ui.StackLayout.prototype.addItems = function ( items, index ) {
	// Update the visibility
	this.updateHiddenState( items, this.currentItem );

	// Mixin method
	OO.ui.GroupElement.prototype.addItems.call( this, items, index );

	if ( !this.currentItem && items.length ) {
		this.setItem( items[ 0 ] );
	}

	return this;
};

/**
 * Remove items.
 *
 * Items will be detached, not removed, so they can be used later.
 *
 * @param {OO.ui.Layout[]} items Items to remove
 * @chainable
 * @fires set
 */
OO.ui.StackLayout.prototype.removeItems = function ( items ) {
	// Mixin method
	OO.ui.GroupElement.prototype.removeItems.call( this, items );

	if ( $.inArray( this.currentItem, items ) !== -1 ) {
		if ( this.items.length ) {
			this.setItem( this.items[ 0 ] );
		} else {
			this.unsetCurrentItem();
		}
	}

	return this;
};

/**
 * Clear all items.
 *
 * Items will be detached, not removed, so they can be used later.
 *
 * @chainable
 * @fires set
 */
OO.ui.StackLayout.prototype.clearItems = function () {
	this.unsetCurrentItem();
	OO.ui.GroupElement.prototype.clearItems.call( this );

	return this;
};

/**
 * Show item.
 *
 * Any currently shown item will be hidden.
 *
 * FIXME: If the passed item to show has not been added in the items list, then
 * this method drops it and unsets the current item.
 *
 * @param {OO.ui.Layout} item Item to show
 * @chainable
 * @fires set
 */
OO.ui.StackLayout.prototype.setItem = function ( item ) {
	if ( item !== this.currentItem ) {
		this.updateHiddenState( this.items, item );

		if ( $.inArray( item, this.items ) !== -1 ) {
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
 * Horizontal bar layout of tools as icon buttons.
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
	OO.ui.BarToolGroup.super.call( this, toolbar, config );

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
 * Popup list of tools with an icon and optional label.
 *
 * @abstract
 * @class
 * @extends OO.ui.ToolGroup
 * @mixins OO.ui.IconElement
 * @mixins OO.ui.IndicatorElement
 * @mixins OO.ui.LabelElement
 * @mixins OO.ui.TitledElement
 * @mixins OO.ui.ClippableElement
 *
 * @constructor
 * @param {OO.ui.Toolbar} toolbar
 * @param {Object} [config] Configuration options
 * @cfg {string} [header] Text to display at the top of the pop-up
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
	OO.ui.PopupToolGroup.super.call( this, toolbar, config );

	// Mixin constructors
	OO.ui.IconElement.call( this, config );
	OO.ui.IndicatorElement.call( this, config );
	OO.ui.LabelElement.call( this, config );
	OO.ui.TitledElement.call( this, config );
	OO.ui.ClippableElement.call( this, $.extend( {}, config, { $clippable: this.$group } ) );

	// Properties
	this.active = false;
	this.dragging = false;
	this.onBlurHandler = this.onBlur.bind( this );
	this.$handle = $( '<span>' );

	// Events
	this.$handle.on( {
		'mousedown touchstart': this.onHandlePointerDown.bind( this ),
		'mouseup touchend': this.onHandlePointerUp.bind( this )
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
OO.mixinClass( OO.ui.PopupToolGroup, OO.ui.IconElement );
OO.mixinClass( OO.ui.PopupToolGroup, OO.ui.IndicatorElement );
OO.mixinClass( OO.ui.PopupToolGroup, OO.ui.LabelElement );
OO.mixinClass( OO.ui.PopupToolGroup, OO.ui.TitledElement );
OO.mixinClass( OO.ui.PopupToolGroup, OO.ui.ClippableElement );

/* Static Properties */

/* Methods */

/**
 * @inheritdoc
 */
OO.ui.PopupToolGroup.prototype.setDisabled = function () {
	// Parent method
	OO.ui.PopupToolGroup.super.prototype.setDisabled.apply( this, arguments );

	if ( this.isDisabled() && this.isElementAttached() ) {
		this.setActive( false );
	}
};

/**
 * Handle focus being lost.
 *
 * The event is actually generated from a mouseup, so it is not a normal blur event object.
 *
 * @param {jQuery.Event} e Mouse up event
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
OO.ui.PopupToolGroup.prototype.onPointerUp = function ( e ) {
	// e.which is 0 for touch events, 1 for left mouse button
	// Only close toolgroup when a tool was actually selected
	// FIXME: this duplicates logic from the parent class
	if ( !this.isDisabled() && e.which <= 1 && this.pressed && this.pressed === this.getTargetTool( e ) ) {
		this.setActive( false );
	}
	return OO.ui.PopupToolGroup.super.prototype.onPointerUp.call( this, e );
};

/**
 * Handle mouse up events.
 *
 * @param {jQuery.Event} e Mouse up event
 */
OO.ui.PopupToolGroup.prototype.onHandlePointerUp = function () {
	return false;
};

/**
 * Handle mouse down events.
 *
 * @param {jQuery.Event} e Mouse down event
 */
OO.ui.PopupToolGroup.prototype.onHandlePointerDown = function ( e ) {
	// e.which is 0 for touch events, 1 for left mouse button
	if ( !this.isDisabled() && e.which <= 1 ) {
		this.setActive( !this.active );
	}
	return false;
};

/**
 * Switch into active mode.
 *
 * When active, mouseup events anywhere in the document will trigger deactivation.
 */
OO.ui.PopupToolGroup.prototype.setActive = function ( value ) {
	value = !!value;
	if ( this.active !== value ) {
		this.active = value;
		if ( value ) {
			this.getElementDocument().addEventListener( 'mouseup', this.onBlurHandler, true );

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
		} else {
			this.getElementDocument().removeEventListener( 'mouseup', this.onBlurHandler, true );
			this.$element.removeClass(
				'oo-ui-popupToolGroup-active oo-ui-popupToolGroup-left  oo-ui-popupToolGroup-right'
			);
			this.toggleClipping( false );
		}
	}
};

/**
 * Drop down list layout of tools as labeled icon buttons.
 *
 * This layout allows some tools to be collapsible, controlled by a "More" / "Fewer" option at the
 * bottom of the main list. These are not automatically positioned at the bottom of the list; you
 * may want to use the 'promote' and 'demote' configuration options to achieve this.
 *
 * @class
 * @extends OO.ui.PopupToolGroup
 *
 * @constructor
 * @param {OO.ui.Toolbar} toolbar
 * @param {Object} [config] Configuration options
 * @cfg {Array} [allowCollapse] List of tools that can be collapsed. Remaining tools will be always
 *  shown.
 * @cfg {Array} [forceExpand] List of tools that *may not* be collapsed. All remaining tools will be
 *  allowed to be collapsed.
 * @cfg {boolean} [expanded=false] Whether the collapsible tools are expanded by default
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
	OO.ui.ListToolGroup.super.call( this, toolbar, config );

	// Initialization
	this.$element.addClass( 'oo-ui-listToolGroup' );
};

/* Setup */

OO.inheritClass( OO.ui.ListToolGroup, OO.ui.PopupToolGroup );

/* Static Properties */

OO.ui.ListToolGroup.static.accelTooltips = true;

OO.ui.ListToolGroup.static.name = 'list';

/* Methods */

/**
 * @inheritdoc
 */
OO.ui.ListToolGroup.prototype.populate = function () {
	var i, len, allowCollapse = [];

	OO.ui.ListToolGroup.super.prototype.populate.call( this );

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
	if ( this.expandCollapseTool === undefined ) {
		var ExpandCollapseTool = function () {
			ExpandCollapseTool.super.apply( this, arguments );
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
OO.ui.ListToolGroup.prototype.onPointerUp = function ( e ) {
	var ret = OO.ui.ListToolGroup.super.prototype.onPointerUp.call( this, e );

	// Do not close the popup when the user wants to show more/fewer tools
	if ( $( e.target ).closest( '.oo-ui-tool-name-more-fewer' ).length ) {
		// Prevent the popup list from being hidden
		this.setActive( true );
	}

	return ret;
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
 * Drop down menu layout of tools as selectable menu items.
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
	OO.ui.MenuToolGroup.super.call( this, toolbar, config );

	// Events
	this.toolbar.connect( this, { updateState: 'onUpdateState' } );

	// Initialization
	this.$element.addClass( 'oo-ui-menuToolGroup' );
};

/* Setup */

OO.inheritClass( OO.ui.MenuToolGroup, OO.ui.PopupToolGroup );

/* Static Properties */

OO.ui.MenuToolGroup.static.accelTooltips = true;

OO.ui.MenuToolGroup.static.name = 'menu';

/* Methods */

/**
 * Handle the toolbar state being updated.
 *
 * When the state changes, the title of each active item in the menu will be joined together and
 * used as a label for the group. The label will be empty if none of the items are active.
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
 * Tool that shows a popup when selected.
 *
 * @abstract
 * @class
 * @extends OO.ui.Tool
 * @mixins OO.ui.PopupElement
 *
 * @constructor
 * @param {OO.ui.Toolbar} toolbar
 * @param {Object} [config] Configuration options
 */
OO.ui.PopupTool = function OoUiPopupTool( toolbar, config ) {
	// Allow passing positional parameters inside the config object
	if ( OO.isPlainObject( toolbar ) && config === undefined ) {
		config = toolbar;
		toolbar = config.toolbar;
	}

	// Parent constructor
	OO.ui.PopupTool.super.call( this, toolbar, config );

	// Mixin constructors
	OO.ui.PopupElement.call( this, config );

	// Initialization
	this.$element
		.addClass( 'oo-ui-popupTool' )
		.append( this.popup.$element );
};

/* Setup */

OO.inheritClass( OO.ui.PopupTool, OO.ui.Tool );
OO.mixinClass( OO.ui.PopupTool, OO.ui.PopupElement );

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
 * Mixin for OO.ui.Widget subclasses to provide OO.ui.GroupElement.
 *
 * Use together with OO.ui.ItemWidget to make disabled state inheritable.
 *
 * @abstract
 * @class
 * @extends OO.ui.GroupElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 */
OO.ui.GroupWidget = function OoUiGroupWidget( config ) {
	// Parent constructor
	OO.ui.GroupWidget.super.call( this, config );
};

/* Setup */

OO.inheritClass( OO.ui.GroupWidget, OO.ui.GroupElement );

/* Methods */

/**
 * Set the disabled state of the widget.
 *
 * This will also update the disabled state of child widgets.
 *
 * @param {boolean} disabled Disable widget
 * @chainable
 */
OO.ui.GroupWidget.prototype.setDisabled = function ( disabled ) {
	var i, len;

	// Parent method
	// Note: Calling #setDisabled this way assumes this is mixed into an OO.ui.Widget
	OO.ui.Widget.prototype.setDisabled.call( this, disabled );

	// During construction, #setDisabled is called before the OO.ui.GroupElement constructor
	if ( this.items ) {
		for ( i = 0, len = this.items.length; i < len; i++ ) {
			this.items[ i ].updateDisabled();
		}
	}

	return this;
};

/**
 * Mixin for widgets used as items in widgets that inherit OO.ui.GroupWidget.
 *
 * Item widgets have a reference to a OO.ui.GroupWidget while they are attached to the group. This
 * allows bidirectional communication.
 *
 * Use together with OO.ui.GroupWidget to make disabled state inheritable.
 *
 * @abstract
 * @class
 *
 * @constructor
 */
OO.ui.ItemWidget = function OoUiItemWidget() {
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
OO.ui.ItemWidget.prototype.isDisabled = function () {
	return this.disabled ||
		( this.elementGroup instanceof OO.ui.Widget && this.elementGroup.isDisabled() );
};

/**
 * Set group element is in.
 *
 * @param {OO.ui.GroupElement|null} group Group element, null if none
 * @chainable
 */
OO.ui.ItemWidget.prototype.setElementGroup = function ( group ) {
	// Parent method
	// Note: Calling #setElementGroup this way assumes this is mixed into an OO.ui.Element
	OO.ui.Element.prototype.setElementGroup.call( this, group );

	// Initialize item disabled states
	this.updateDisabled();

	return this;
};

/**
 * Mixin that adds a menu showing suggested values for a text input.
 *
 * Subclasses must handle `select` and `choose` events on #lookupMenu to make use of selections.
 *
 * Subclasses that set the value of #lookupInput from their `choose` or `select` handler should
 * be aware that this will cause new suggestions to be looked up for the new value. If this is
 * not desired, disable lookups with #setLookupsDisabled, then set the value, then re-enable lookups.
 *
 * @class
 * @abstract
 * @deprecated Use OO.ui.LookupElement instead.
 *
 * @constructor
 * @param {OO.ui.TextInputWidget} input Input widget
 * @param {Object} [config] Configuration options
 * @cfg {jQuery} [$overlay] Overlay for dropdown; defaults to relative positioning
 * @cfg {jQuery} [$container=input.$element] Element to render menu under
 */
OO.ui.LookupInputWidget = function OoUiLookupInputWidget( input, config ) {
	// Allow passing positional parameters inside the config object
	if ( OO.isPlainObject( input ) && config === undefined ) {
		config = input;
		input = config.input;
	}

	// Configuration initialization
	config = config || {};

	// Properties
	this.lookupInput = input;
	this.$overlay = config.$overlay || this.$element;
	this.lookupMenu = new OO.ui.TextInputMenuSelectWidget( this, {
		input: this.lookupInput,
		$container: config.$container
	} );
	this.lookupCache = {};
	this.lookupQuery = null;
	this.lookupRequest = null;
	this.lookupsDisabled = false;
	this.lookupInputFocused = false;

	// Events
	this.lookupInput.$input.on( {
		focus: this.onLookupInputFocus.bind( this ),
		blur: this.onLookupInputBlur.bind( this ),
		mousedown: this.onLookupInputMouseDown.bind( this )
	} );
	this.lookupInput.connect( this, { change: 'onLookupInputChange' } );
	this.lookupMenu.connect( this, { toggle: 'onLookupMenuToggle' } );

	// Initialization
	this.$element.addClass( 'oo-ui-lookupWidget' );
	this.lookupMenu.$element.addClass( 'oo-ui-lookupWidget-menu' );
	this.$overlay.append( this.lookupMenu.$element );
};

/* Methods */

/**
 * Handle input focus event.
 *
 * @param {jQuery.Event} e Input focus event
 */
OO.ui.LookupInputWidget.prototype.onLookupInputFocus = function () {
	this.lookupInputFocused = true;
	this.populateLookupMenu();
};

/**
 * Handle input blur event.
 *
 * @param {jQuery.Event} e Input blur event
 */
OO.ui.LookupInputWidget.prototype.onLookupInputBlur = function () {
	this.closeLookupMenu();
	this.lookupInputFocused = false;
};

/**
 * Handle input mouse down event.
 *
 * @param {jQuery.Event} e Input mouse down event
 */
OO.ui.LookupInputWidget.prototype.onLookupInputMouseDown = function () {
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
 * @param {string} value New input value
 */
OO.ui.LookupInputWidget.prototype.onLookupInputChange = function () {
	if ( this.lookupInputFocused ) {
		this.populateLookupMenu();
	}
};

/**
 * Handle the lookup menu being shown/hidden.
 * @param {boolean} visible Whether the lookup menu is now visible.
 */
OO.ui.LookupInputWidget.prototype.onLookupMenuToggle = function ( visible ) {
	if ( !visible ) {
		// When the menu is hidden, abort any active request and clear the menu.
		// This has to be done here in addition to closeLookupMenu(), because
		// MenuSelectWidget will close itself when the user presses Esc.
		this.abortLookupRequest();
		this.lookupMenu.clearItems();
	}
};

/**
 * Get lookup menu.
 *
 * @return {OO.ui.TextInputMenuSelectWidget}
 */
OO.ui.LookupInputWidget.prototype.getLookupMenu = function () {
	return this.lookupMenu;
};

/**
 * Disable or re-enable lookups.
 *
 * When lookups are disabled, calls to #populateLookupMenu will be ignored.
 *
 * @param {boolean} disabled Disable lookups
 */
OO.ui.LookupInputWidget.prototype.setLookupsDisabled = function ( disabled ) {
	this.lookupsDisabled = !!disabled;
};

/**
 * Open the menu. If there are no entries in the menu, this does nothing.
 *
 * @chainable
 */
OO.ui.LookupInputWidget.prototype.openLookupMenu = function () {
	if ( !this.lookupMenu.isEmpty() ) {
		this.lookupMenu.toggle( true );
	}
	return this;
};

/**
 * Close the menu, empty it, and abort any pending request.
 *
 * @chainable
 */
OO.ui.LookupInputWidget.prototype.closeLookupMenu = function () {
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
 * @chainable
 */
OO.ui.LookupInputWidget.prototype.populateLookupMenu = function () {
	var widget = this,
		value = this.lookupInput.getValue();

	if ( this.lookupsDisabled ) {
		return;
	}

	// If the input is empty, clear the menu
	if ( value === '' ) {
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
 * Select and highlight the first selectable item in the menu.
 *
 * @chainable
 */
OO.ui.LookupInputWidget.prototype.initializeLookupMenuSelection = function () {
	if ( !this.lookupMenu.getSelectedItem() ) {
		this.lookupMenu.selectItem( this.lookupMenu.getFirstSelectableItem() );
	}
	this.lookupMenu.highlightItem( this.lookupMenu.getSelectedItem() );
};

/**
 * Get lookup menu items for the current query.
 *
 * @return {jQuery.Promise} Promise object which will be passed menu items as the first argument
 * of the done event. If the request was aborted to make way for a subsequent request,
 * this promise will not be rejected: it will remain pending forever.
 */
OO.ui.LookupInputWidget.prototype.getLookupMenuItems = function () {
	var widget = this,
		value = this.lookupInput.getValue(),
		deferred = $.Deferred(),
		ourRequest;

	this.abortLookupRequest();
	if ( Object.prototype.hasOwnProperty.call( this.lookupCache, value ) ) {
		deferred.resolve( this.getLookupMenuItemsFromData( this.lookupCache[ value ] ) );
	} else {
		this.lookupInput.pushPending();
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
				widget.lookupInput.popPending();
			} )
			.done( function ( data ) {
				// If this is an old request (and aborting it somehow caused it to still succeed),
				// ignore its success completely
				if ( ourRequest === widget.lookupRequest ) {
					widget.lookupQuery = null;
					widget.lookupRequest = null;
					widget.lookupCache[ value ] = widget.getLookupCacheItemFromData( data );
					deferred.resolve( widget.getLookupMenuItemsFromData( widget.lookupCache[ value ] ) );
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
 */
OO.ui.LookupInputWidget.prototype.abortLookupRequest = function () {
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
 * @abstract
 * @return {jQuery.Promise} jQuery AJAX object, or promise object with an .abort() method
 */
OO.ui.LookupInputWidget.prototype.getLookupRequest = function () {
	// Stub, implemented in subclass
	return null;
};

/**
 * Get a list of menu item widgets from the data stored by the lookup request's done handler.
 *
 * @abstract
 * @param {Mixed} data Cached result data, usually an array
 * @return {OO.ui.MenuOptionWidget[]} Menu items
 */
OO.ui.LookupInputWidget.prototype.getLookupMenuItemsFromData = function () {
	// Stub, implemented in subclass
	return [];
};

/**
 * Get lookup cache item from server response data.
 *
 * @abstract
 * @param {Mixed} data Response from server
 * @return {Mixed} Cached result data
 */
OO.ui.LookupInputWidget.prototype.getLookupCacheItemFromData = function () {
	// Stub, implemented in subclass
	return [];
};

/**
 * Set of controls for an OO.ui.OutlineSelectWidget.
 *
 * Controls include moving items up and down, removing items, and adding different kinds of items.
 *
 * @class
 * @extends OO.ui.Widget
 * @mixins OO.ui.GroupElement
 * @mixins OO.ui.IconElement
 *
 * @constructor
 * @param {OO.ui.OutlineSelectWidget} outline Outline to control
 * @param {Object} [config] Configuration options
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
	OO.ui.OutlineControlsWidget.super.call( this, config );

	// Mixin constructors
	OO.ui.GroupElement.call( this, config );
	OO.ui.IconElement.call( this, config );

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
};

/* Setup */

OO.inheritClass( OO.ui.OutlineControlsWidget, OO.ui.Widget );
OO.mixinClass( OO.ui.OutlineControlsWidget, OO.ui.GroupElement );
OO.mixinClass( OO.ui.OutlineControlsWidget, OO.ui.IconElement );

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
 * Handle outline change events.
 */
OO.ui.OutlineControlsWidget.prototype.onOutlineChange = function () {
	var i, len, firstMovable, lastMovable,
		items = this.outline.getItems(),
		selectedItem = this.outline.getSelectedItem(),
		movable = selectedItem && selectedItem.isMovable(),
		removable = selectedItem && selectedItem.isRemovable();

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
 * Mixin for widgets with a boolean on/off state.
 *
 * @abstract
 * @class
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {boolean} [value=false] Initial value
 */
OO.ui.ToggleWidget = function OoUiToggleWidget( config ) {
	// Configuration initialization
	config = config || {};

	// Properties
	this.value = null;

	// Initialization
	this.$element.addClass( 'oo-ui-toggleWidget' );
	this.setValue( !!config.value );
};

/* Events */

/**
 * @event change
 * @param {boolean} value Changed value
 */

/* Methods */

/**
 * Get the value of the toggle.
 *
 * @return {boolean}
 */
OO.ui.ToggleWidget.prototype.getValue = function () {
	return this.value;
};

/**
 * Set the value of the toggle.
 *
 * @param {boolean} value New value
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
 *         label : 'Select a category',
 *         icon : 'menu',
 *         popup : {
 *             $content: $( '<p>List of categories...</p>' ),
 *             padded: true,
 *             align: 'left'
 *         }
 *     } );
 *     var button2 = new OO.ui.ButtonWidget( {
 *         label : 'Add item'
 *     });
 *     var buttonGroup = new OO.ui.ButtonGroupWidget( {
 *         items: [button1, button2]
 *     } );
 *     $('body').append(buttonGroup.$element);
 *
 * @class
 * @extends OO.ui.Widget
 * @mixins OO.ui.GroupElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {OO.ui.ButtonWidget[]} [items] Buttons to add
 */
OO.ui.ButtonGroupWidget = function OoUiButtonGroupWidget( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.ButtonGroupWidget.super.call( this, config );

	// Mixin constructors
	OO.ui.GroupElement.call( this, $.extend( {}, config, { $group: this.$element } ) );

	// Initialization
	this.$element.addClass( 'oo-ui-buttonGroupWidget' );
	if ( Array.isArray( config.items ) ) {
		this.addItems( config.items );
	}
};

/* Setup */

OO.inheritClass( OO.ui.ButtonGroupWidget, OO.ui.Widget );
OO.mixinClass( OO.ui.ButtonGroupWidget, OO.ui.GroupElement );

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
 *         label : 'Button with Icon',
 *         icon : 'remove',
 *         iconTitle : 'Remove'
 *     } );
 *     $( 'body' ).append( button.$element );
 *
 * NOTE: HTML form buttons should use the OO.ui.ButtonInputWidget class.
 *
 * @class
 * @extends OO.ui.Widget
 * @mixins OO.ui.ButtonElement
 * @mixins OO.ui.IconElement
 * @mixins OO.ui.IndicatorElement
 * @mixins OO.ui.LabelElement
 * @mixins OO.ui.TitledElement
 * @mixins OO.ui.FlaggedElement
 * @mixins OO.ui.TabIndexedElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {string} [href] Hyperlink to visit when the button is clicked.
 * @cfg {string} [target] The frame or window in which to open the hyperlink.
 * @cfg {boolean} [noFollow] Search engine traversal hint (default: true)
 */
OO.ui.ButtonWidget = function OoUiButtonWidget( config ) {
	// Configuration initialization
	// FIXME: The `nofollow` alias is deprecated and will be removed (T89767)
	config = $.extend( { noFollow: config && config.nofollow }, config );

	// Parent constructor
	OO.ui.ButtonWidget.super.call( this, config );

	// Mixin constructors
	OO.ui.ButtonElement.call( this, config );
	OO.ui.IconElement.call( this, config );
	OO.ui.IndicatorElement.call( this, config );
	OO.ui.LabelElement.call( this, config );
	OO.ui.TitledElement.call( this, $.extend( {}, config, { $titled: this.$button } ) );
	OO.ui.FlaggedElement.call( this, config );
	OO.ui.TabIndexedElement.call( this, $.extend( {}, config, { $tabIndexed: this.$button } ) );

	// Properties
	this.href = null;
	this.target = null;
	this.noFollow = false;
	this.isHyperlink = false;

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
OO.mixinClass( OO.ui.ButtonWidget, OO.ui.ButtonElement );
OO.mixinClass( OO.ui.ButtonWidget, OO.ui.IconElement );
OO.mixinClass( OO.ui.ButtonWidget, OO.ui.IndicatorElement );
OO.mixinClass( OO.ui.ButtonWidget, OO.ui.LabelElement );
OO.mixinClass( OO.ui.ButtonWidget, OO.ui.TitledElement );
OO.mixinClass( OO.ui.ButtonWidget, OO.ui.FlaggedElement );
OO.mixinClass( OO.ui.ButtonWidget, OO.ui.TabIndexedElement );

/* Methods */

/**
 * @inheritdoc
 */
OO.ui.ButtonWidget.prototype.onMouseDown = function ( e ) {
	if ( !this.isDisabled() ) {
		// Remove the tab-index while the button is down to prevent the button from stealing focus
		this.$button.removeAttr( 'tabindex' );
	}

	return OO.ui.ButtonElement.prototype.onMouseDown.call( this, e );
};

/**
 * @inheritdoc
 */
OO.ui.ButtonWidget.prototype.onMouseUp = function ( e ) {
	if ( !this.isDisabled() ) {
		// Restore the tab-index after the button is up to restore the button's accessibility
		this.$button.attr( 'tabindex', this.tabIndex );
	}

	return OO.ui.ButtonElement.prototype.onMouseUp.call( this, e );
};

/**
 * @inheritdoc
 */
OO.ui.ButtonWidget.prototype.onClick = function ( e ) {
	var ret = OO.ui.ButtonElement.prototype.onClick.call( this, e );
	if ( this.isHyperlink ) {
		return true;
	}
	return ret;
};

/**
 * @inheritdoc
 */
OO.ui.ButtonWidget.prototype.onKeyPress = function ( e ) {
	var ret = OO.ui.ButtonElement.prototype.onKeyPress.call( this, e );
	if ( this.isHyperlink ) {
		return true;
	}
	return ret;
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

	if ( href !== this.href ) {
		this.href = href;
		if ( href !== null ) {
			this.$button.attr( 'href', href );
			this.isHyperlink = true;
		} else {
			this.$button.removeAttr( 'href' );
			this.isHyperlink = false;
		}
	}

	return this;
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
 * of the actions. Please see the [OOjs UI documentation on MediaWiki] [1] for more information
 * and examples.
 *
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Windows/Process_Dialogs#Action_sets
 *
 * @class
 * @extends OO.ui.ButtonWidget
 * @mixins OO.ui.PendingElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {string} [action] Symbolic action name
 * @cfg {string[]} [modes] Symbolic mode names
 * @cfg {boolean} [framed=false] Render button with a frame
 */
OO.ui.ActionWidget = function OoUiActionWidget( config ) {
	// Configuration initialization
	config = $.extend( { framed: false }, config );

	// Parent constructor
	OO.ui.ActionWidget.super.call( this, config );

	// Mixin constructors
	OO.ui.PendingElement.call( this, config );

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
OO.mixinClass( OO.ui.ActionWidget, OO.ui.PendingElement );

/* Events */

/**
 * @event resize
 */

/* Methods */

/**
 * Check if action is available in a certain mode.
 *
 * @param {string} mode Name of mode
 * @return {boolean} Has mode
 */
OO.ui.ActionWidget.prototype.hasMode = function ( mode ) {
	return this.modes.indexOf( mode ) !== -1;
};

/**
 * Get symbolic action name.
 *
 * @return {string}
 */
OO.ui.ActionWidget.prototype.getAction = function () {
	return this.action;
};

/**
 * Get symbolic action name.
 *
 * @return {string}
 */
OO.ui.ActionWidget.prototype.getModes = function () {
	return this.modes.slice();
};

/**
 * Emit a resize event if the size has changed.
 *
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
	OO.ui.IconElement.prototype.setIcon.apply( this, arguments );
	this.propagateResize();

	return this;
};

/**
 * @inheritdoc
 */
OO.ui.ActionWidget.prototype.setLabel = function () {
	// Mixin method
	OO.ui.LabelElement.prototype.setLabel.apply( this, arguments );
	this.propagateResize();

	return this;
};

/**
 * @inheritdoc
 */
OO.ui.ActionWidget.prototype.setFlags = function () {
	// Mixin method
	OO.ui.FlaggedElement.prototype.setFlags.apply( this, arguments );
	this.propagateResize();

	return this;
};

/**
 * @inheritdoc
 */
OO.ui.ActionWidget.prototype.clearFlags = function () {
	// Mixin method
	OO.ui.FlaggedElement.prototype.clearFlags.apply( this, arguments );
	this.propagateResize();

	return this;
};

/**
 * Toggle visibility of button.
 *
 * @param {boolean} [show] Show button, omit to toggle visibility
 * @chainable
 */
OO.ui.ActionWidget.prototype.toggle = function () {
	// Parent method
	OO.ui.ActionWidget.super.prototype.toggle.apply( this, arguments );
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
 *             align: 'left'
 *         }
 *     } );
 *     // Append the button to the DOM.
 *     $( 'body' ).append( popupButton.$element );
 *
 * @class
 * @extends OO.ui.ButtonWidget
 * @mixins OO.ui.PopupElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 */
OO.ui.PopupButtonWidget = function OoUiPopupButtonWidget( config ) {
	// Parent constructor
	OO.ui.PopupButtonWidget.super.call( this, config );

	// Mixin constructors
	OO.ui.PopupElement.call( this, config );

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
OO.mixinClass( OO.ui.PopupButtonWidget, OO.ui.PopupElement );

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
 * Button that toggles on and off.
 *
 * @class
 * @extends OO.ui.ButtonWidget
 * @mixins OO.ui.ToggleWidget
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {boolean} [value=false] Initial value
 */
OO.ui.ToggleButtonWidget = function OoUiToggleButtonWidget( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.ToggleButtonWidget.super.call( this, config );

	// Mixin constructors
	OO.ui.ToggleWidget.call( this, config );

	// Events
	this.connect( this, { click: 'onAction' } );

	// Initialization
	this.$element.addClass( 'oo-ui-toggleButtonWidget' );
};

/* Setup */

OO.inheritClass( OO.ui.ToggleButtonWidget, OO.ui.ButtonWidget );
OO.mixinClass( OO.ui.ToggleButtonWidget, OO.ui.ToggleWidget );

/* Methods */

/**
 * Handle the button action being triggered.
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
		this.$button.attr( 'aria-pressed', value.toString() );
		this.setActive( value );
	}

	// Parent method (from mixin)
	OO.ui.ToggleWidget.prototype.setValue.call( this, value );

	return this;
};

/**
 * DropdownWidgets are not menus themselves, rather they contain a menu of options created with
 * OO.ui.MenuOptionWidget. The DropdownWidget takes care of opening and displaying the menu so that
 * users can interact with it.
 *
 *     @example
 *     // Example: A DropdownWidget with a menu that contains three options
 *     var dropDown=new OO.ui.DropdownWidget( {
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
 *     $('body').append(dropDown.$element);
 *
 * For more information, please see the [OOjs UI documentation on MediaWiki] [1].
 *
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Widgets/Selects_and_Options#Menu_selects_and_options
 *
 * @class
 * @extends OO.ui.Widget
 * @mixins OO.ui.IconElement
 * @mixins OO.ui.IndicatorElement
 * @mixins OO.ui.LabelElement
 * @mixins OO.ui.TitledElement
 * @mixins OO.ui.TabIndexedElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {Object} [menu] Configuration options to pass to menu widget
 */
OO.ui.DropdownWidget = function OoUiDropdownWidget( config ) {
	// Configuration initialization
	config = $.extend( { indicator: 'down' }, config );

	// Parent constructor
	OO.ui.DropdownWidget.super.call( this, config );

	// Properties (must be set before TabIndexedElement constructor call)
	this.$handle = this.$( '<span>' );

	// Mixin constructors
	OO.ui.IconElement.call( this, config );
	OO.ui.IndicatorElement.call( this, config );
	OO.ui.LabelElement.call( this, config );
	OO.ui.TitledElement.call( this, $.extend( {}, config, { $titled: this.$label } ) );
	OO.ui.TabIndexedElement.call( this, $.extend( {}, config, { $tabIndexed: this.$handle } ) );

	// Properties
	this.menu = new OO.ui.MenuSelectWidget( $.extend( { widget: this }, config.menu ) );

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
		.append( this.$handle, this.menu.$element );
};

/* Setup */

OO.inheritClass( OO.ui.DropdownWidget, OO.ui.Widget );
OO.mixinClass( OO.ui.DropdownWidget, OO.ui.IconElement );
OO.mixinClass( OO.ui.DropdownWidget, OO.ui.IndicatorElement );
OO.mixinClass( OO.ui.DropdownWidget, OO.ui.LabelElement );
OO.mixinClass( OO.ui.DropdownWidget, OO.ui.TitledElement );
OO.mixinClass( OO.ui.DropdownWidget, OO.ui.TabIndexedElement );

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
	if ( !this.isDisabled() && ( e.which === OO.ui.Keys.SPACE || e.which === OO.ui.Keys.ENTER ) ) {
		this.menu.toggle();
	}
	return false;
};

/**
 * IconWidget is a generic widget for {@link OO.ui.IconElement icons}. In general, IconWidgets should be used with OO.ui.LabelWidget,
 * which creates a label that identifies the icon’s function. See the [OOjs UI documentation on MediaWiki] [1]
 * for a list of icons included in the library.
 *
 *     @example
 *     // An icon widget with a label
 *     var myIcon = new OO.ui.IconWidget({
 *         icon: 'help',
 *         iconTitle: 'Help'
 *      });
 *      // Create a label.
 *      var iconLabel = new OO.ui.LabelWidget({
 *          label: 'Help'
 *      });
 *      $('body').append(myIcon.$element, iconLabel.$element);
 *
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Widgets/Icons,_Indicators,_and_Labels#Icons
 *
 * @class
 * @extends OO.ui.Widget
 * @mixins OO.ui.IconElement
 * @mixins OO.ui.TitledElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 */
OO.ui.IconWidget = function OoUiIconWidget( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.IconWidget.super.call( this, config );

	// Mixin constructors
	OO.ui.IconElement.call( this, $.extend( {}, config, { $icon: this.$element } ) );
	OO.ui.TitledElement.call( this, $.extend( {}, config, { $titled: this.$element } ) );

	// Initialization
	this.$element.addClass( 'oo-ui-iconWidget' );
};

/* Setup */

OO.inheritClass( OO.ui.IconWidget, OO.ui.Widget );
OO.mixinClass( OO.ui.IconWidget, OO.ui.IconElement );
OO.mixinClass( OO.ui.IconWidget, OO.ui.TitledElement );

/* Static Properties */

OO.ui.IconWidget.static.tagName = 'span';

/**
 * Indicator widget.
 *
 * See OO.ui.IndicatorElement for more information.
 *
 * @class
 * @extends OO.ui.Widget
 * @mixins OO.ui.IndicatorElement
 * @mixins OO.ui.TitledElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 */
OO.ui.IndicatorWidget = function OoUiIndicatorWidget( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.IndicatorWidget.super.call( this, config );

	// Mixin constructors
	OO.ui.IndicatorElement.call( this, $.extend( {}, config, { $indicator: this.$element } ) );
	OO.ui.TitledElement.call( this, $.extend( {}, config, { $titled: this.$element } ) );

	// Initialization
	this.$element.addClass( 'oo-ui-indicatorWidget' );
};

/* Setup */

OO.inheritClass( OO.ui.IndicatorWidget, OO.ui.Widget );
OO.mixinClass( OO.ui.IndicatorWidget, OO.ui.IndicatorElement );
OO.mixinClass( OO.ui.IndicatorWidget, OO.ui.TitledElement );

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
 * @mixins OO.ui.FlaggedElement
 * @mixins OO.ui.TabIndexedElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {string} [name=''] HTML input name
 * @cfg {string} [value=''] Input value
 * @cfg {Function} [inputFilter] Filter function to apply to the input. Takes a string argument and returns a string.
 */
OO.ui.InputWidget = function OoUiInputWidget( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.InputWidget.super.call( this, config );

	// Properties
	this.$input = this.getInputElement( config );
	this.value = '';
	this.inputFilter = config.inputFilter;

	// Mixin constructors
	OO.ui.FlaggedElement.call( this, config );
	OO.ui.TabIndexedElement.call( this, $.extend( {}, config, { $tabIndexed: this.$input } ) );

	// Events
	this.$input.on( 'keydown mouseup cut paste change input select', this.onEdit.bind( this ) );

	// Initialization
	this.$input
		.attr( 'name', config.name )
		.prop( 'disabled', this.isDisabled() );
	this.$element.addClass( 'oo-ui-inputWidget' ).append( this.$input, $( '<span>' ) );
	this.setValue( config.value );
};

/* Setup */

OO.inheritClass( OO.ui.InputWidget, OO.ui.Widget );
OO.mixinClass( OO.ui.InputWidget, OO.ui.FlaggedElement );
OO.mixinClass( OO.ui.InputWidget, OO.ui.TabIndexedElement );

/* Events */

/**
 * @event change
 * @param {string} value
 */

/* Methods */

/**
 * Get input element.
 *
 * Subclasses of OO.ui.InputWidget use the `config` parameter to produce different elements in
 * different circumstances. The element must have a `value` property (like form elements).
 *
 * @private
 * @param {Object} config Configuration options
 * @return {jQuery} Input element
 */
OO.ui.InputWidget.prototype.getInputElement = function () {
	return $( '<input>' );
};

/**
 * Handle potentially value-changing events.
 *
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
 * Sets the direction of the current input, either RTL or LTR
 *
 * @param {boolean} isRTL
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
 * Simulate the behavior of clicking on a label bound to this input.
 */
OO.ui.InputWidget.prototype.simulateLabelClick = function () {
	if ( !this.isDisabled() ) {
		if ( this.$input.is( ':checkbox,:radio' ) ) {
			this.$input.click();
		} else if ( this.$input.is( ':input' ) ) {
			this.$input[ 0 ].focus();
		}
	}
};

/**
 * @inheritdoc
 */
OO.ui.InputWidget.prototype.setDisabled = function ( state ) {
	OO.ui.InputWidget.super.prototype.setDisabled.call( this, state );
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
 * @mixins OO.ui.ButtonElement
 * @mixins OO.ui.IconElement
 * @mixins OO.ui.IndicatorElement
 * @mixins OO.ui.LabelElement
 * @mixins OO.ui.TitledElement
 * @mixins OO.ui.FlaggedElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {string} [type='button'] HTML tag `type` attribute, may be 'button', 'submit' or 'reset'
 * @cfg {boolean} [useInputTag=false] Whether to use `<input/>` rather than `<button/>`. Only useful
 *  if you need IE 6 support in a form with multiple buttons. If you use this option, icons and
 *  indicators will not be displayed, it won't be possible to have a non-plaintext label, and it
 *  won't be possible to set a value (which will internally become identical to the label).
 */
OO.ui.ButtonInputWidget = function OoUiButtonInputWidget( config ) {
	// Configuration initialization
	config = $.extend( { type: 'button', useInputTag: false }, config );

	// Properties (must be set before parent constructor, which calls #setValue)
	this.useInputTag = config.useInputTag;

	// Parent constructor
	OO.ui.ButtonInputWidget.super.call( this, config );

	// Mixin constructors
	OO.ui.ButtonElement.call( this, $.extend( {}, config, { $button: this.$input } ) );
	OO.ui.IconElement.call( this, config );
	OO.ui.IndicatorElement.call( this, config );
	OO.ui.LabelElement.call( this, config );
	OO.ui.TitledElement.call( this, $.extend( {}, config, { $titled: this.$input } ) );
	OO.ui.FlaggedElement.call( this, config );

	// Initialization
	if ( !config.useInputTag ) {
		this.$input.append( this.$icon, this.$label, this.$indicator );
	}
	this.$element.addClass( 'oo-ui-buttonInputWidget' );
};

/* Setup */

OO.inheritClass( OO.ui.ButtonInputWidget, OO.ui.InputWidget );
OO.mixinClass( OO.ui.ButtonInputWidget, OO.ui.ButtonElement );
OO.mixinClass( OO.ui.ButtonInputWidget, OO.ui.IconElement );
OO.mixinClass( OO.ui.ButtonInputWidget, OO.ui.IndicatorElement );
OO.mixinClass( OO.ui.ButtonInputWidget, OO.ui.LabelElement );
OO.mixinClass( OO.ui.ButtonInputWidget, OO.ui.TitledElement );
OO.mixinClass( OO.ui.ButtonInputWidget, OO.ui.FlaggedElement );

/* Methods */

/**
 * @inheritdoc
 * @private
 */
OO.ui.ButtonInputWidget.prototype.getInputElement = function ( config ) {
	var html = '<' + ( config.useInputTag ? 'input' : 'button' ) + ' type="' + config.type + '">';
	return $( html );
};

/**
 * Set label value.
 *
 * Overridden to support setting the 'value' of `<input/>` elements.
 *
 * @param {jQuery|string|Function|null} label Label nodes; text; a function that returns nodes or
 *  text; or null for no label
 * @chainable
 */
OO.ui.ButtonInputWidget.prototype.setLabel = function ( label ) {
	OO.ui.LabelElement.prototype.setLabel.call( this, label );

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
 * Overridden to disable for `<input/>` elements, which have value identical to the label.
 *
 * @param {string} value New value
 * @chainable
 */
OO.ui.ButtonInputWidget.prototype.setValue = function ( value ) {
	if ( !this.useInputTag ) {
		OO.ui.ButtonInputWidget.super.prototype.setValue.call( this, value );
	}
	return this;
};

/**
 * Checkbox input widget.
 *
 * @class
 * @extends OO.ui.InputWidget
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {boolean} [selected=false] Whether the checkbox is initially selected
 */
OO.ui.CheckboxInputWidget = function OoUiCheckboxInputWidget( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.CheckboxInputWidget.super.call( this, config );

	// Initialization
	this.$element.addClass( 'oo-ui-checkboxInputWidget' );
	this.setSelected( config.selected !== undefined ? config.selected : false );
};

/* Setup */

OO.inheritClass( OO.ui.CheckboxInputWidget, OO.ui.InputWidget );

/* Methods */

/**
 * @inheritdoc
 * @private
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
 * @param {boolean} state Whether the checkbox is selected
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
 * A OO.ui.DropdownWidget synchronized with a `<input type=hidden>` for form submission. Intended to
 * be used within a OO.ui.FormLayout.
 *
 * @class
 * @extends OO.ui.InputWidget
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {Object[]} [options=[]] Array of menu options in the format `{ data: …, label: … }`
 */
OO.ui.DropdownInputWidget = function OoUiDropdownInputWidget( config ) {
	// Configuration initialization
	config = config || {};

	// Properties (must be done before parent constructor which calls #setDisabled)
	this.dropdownWidget = new OO.ui.DropdownWidget();

	// Parent constructor
	OO.ui.DropdownInputWidget.super.call( this, config );

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

/* Methods */

/**
 * @inheritdoc
 * @private
 */
OO.ui.DropdownInputWidget.prototype.getInputElement = function () {
	return $( '<input type="hidden">' );
};

/**
 * Handles menu select events.
 *
 * @param {OO.ui.MenuOptionWidget} item Selected menu item
 */
OO.ui.DropdownInputWidget.prototype.onMenuSelect = function ( item ) {
	this.setValue( item.getData() );
};

/**
 * @inheritdoc
 */
OO.ui.DropdownInputWidget.prototype.setValue = function ( value ) {
	var item = this.dropdownWidget.getMenu().getItemFromData( value );
	if ( item ) {
		this.dropdownWidget.getMenu().selectItem( item );
	}
	OO.ui.DropdownInputWidget.super.prototype.setValue.call( this, value );
	return this;
};

/**
 * @inheritdoc
 */
OO.ui.DropdownInputWidget.prototype.setDisabled = function ( state ) {
	this.dropdownWidget.setDisabled( state );
	OO.ui.DropdownInputWidget.super.prototype.setDisabled.call( this, state );
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

	// Rebuild the dropdown menu
	this.dropdownWidget.getMenu()
		.clearItems()
		.addItems( options.map( function ( opt ) {
			return new OO.ui.MenuOptionWidget( {
				data: opt.data,
				label: opt.label !== undefined ? opt.label : opt.data
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
 * Radio input widget.
 *
 * Radio buttons only make sense as a set, and you probably want to use the OO.ui.RadioSelectWidget
 * class instead of using this class directly.
 *
 * @class
 * @extends OO.ui.InputWidget
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {boolean} [selected=false] Whether the radio button is initially selected
 */
OO.ui.RadioInputWidget = function OoUiRadioInputWidget( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.RadioInputWidget.super.call( this, config );

	// Initialization
	this.$element.addClass( 'oo-ui-radioInputWidget' );
	this.setSelected( config.selected !== undefined ? config.selected : false );
};

/* Setup */

OO.inheritClass( OO.ui.RadioInputWidget, OO.ui.InputWidget );

/* Methods */

/**
 * @inheritdoc
 * @private
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
 * @param {boolean} state Whether the button is selected
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
 * Input widget with a text field.
 *
 * @class
 * @extends OO.ui.InputWidget
 * @mixins OO.ui.IconElement
 * @mixins OO.ui.IndicatorElement
 * @mixins OO.ui.PendingElement
 * @mixins OO.ui.LabelElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {string} [type='text'] HTML tag `type` attribute
 * @cfg {string} [placeholder] Placeholder text
 * @cfg {boolean} [autofocus=false] Ask the browser to focus this widget, using the 'autofocus' HTML
 *  attribute
 * @cfg {boolean} [readOnly=false] Prevent changes
 * @cfg {number} [maxLength] Maximum allowed number of characters to input
 * @cfg {boolean} [multiline=false] Allow multiple lines of text
 * @cfg {boolean} [autosize=false] Automatically resize to fit content
 * @cfg {boolean} [maxRows=10] Maximum number of rows to make visible when autosizing
 * @cfg {string} [labelPosition='after'] Label position, 'before' or 'after'
 * @cfg {boolean} [required=false] Mark the field as required
 * @cfg {RegExp|string} [validate] Regular expression to validate against (or symbolic name referencing
 *  one, see #static-validationPatterns)
 */
OO.ui.TextInputWidget = function OoUiTextInputWidget( config ) {
	// Configuration initialization
	config = $.extend( {
		type: 'text',
		labelPosition: 'after',
		maxRows: 10
	}, config );

	// Parent constructor
	OO.ui.TextInputWidget.super.call( this, config );

	// Mixin constructors
	OO.ui.IconElement.call( this, config );
	OO.ui.IndicatorElement.call( this, config );
	OO.ui.PendingElement.call( this, config );
	OO.ui.LabelElement.call( this, config );

	// Properties
	this.readOnly = false;
	this.multiline = !!config.multiline;
	this.autosize = !!config.autosize;
	this.maxRows = config.maxRows;
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
		blur: this.setValidityFlag.bind( this )
	} );
	this.$element.on( 'DOMNodeInsertedIntoDocument', this.onElementAttach.bind( this ) );
	this.$icon.on( 'mousedown', this.onIconMouseDown.bind( this ) );
	this.$indicator.on( 'mousedown', this.onIndicatorMouseDown.bind( this ) );
	this.on( 'labelChange', this.updatePosition.bind( this ) );

	// Initialization
	this.$element
		.addClass( 'oo-ui-textInputWidget' )
		.append( this.$icon, this.$indicator );
	this.setReadOnly( !!config.readOnly );
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
		this.$input.attr( 'required', 'true' );
	}
};

/* Setup */

OO.inheritClass( OO.ui.TextInputWidget, OO.ui.InputWidget );
OO.mixinClass( OO.ui.TextInputWidget, OO.ui.IconElement );
OO.mixinClass( OO.ui.TextInputWidget, OO.ui.IndicatorElement );
OO.mixinClass( OO.ui.TextInputWidget, OO.ui.PendingElement );
OO.mixinClass( OO.ui.TextInputWidget, OO.ui.LabelElement );

/* Static properties */

OO.ui.TextInputWidget.static.validationPatterns = {
	'non-empty': /.+/,
	integer: /^\d+$/
};

/* Events */

/**
 * User presses enter inside the text box.
 *
 * Not called if input is multiline.
 *
 * @event enter
 */

/**
 * User clicks the icon.
 *
 * @deprecated Fundamentally not accessible. Make the icon focusable, associate a label or tooltip,
 *  and handle click/keypress events on it manually.
 * @event icon
 */

/**
 * User clicks the indicator.
 *
 * @deprecated Fundamentally not accessible. Make the indicator focusable, associate a label or
 *  tooltip, and handle click/keypress events on it manually.
 * @event indicator
 */

/* Methods */

/**
 * Handle icon mouse down events.
 *
 * @param {jQuery.Event} e Mouse down event
 * @fires icon
 */
OO.ui.TextInputWidget.prototype.onIconMouseDown = function ( e ) {
	if ( e.which === 1 ) {
		this.$input[ 0 ].focus();
		this.emit( 'icon' );
		return false;
	}
};

/**
 * Handle indicator mouse down events.
 *
 * @param {jQuery.Event} e Mouse down event
 * @fires indicator
 */
OO.ui.TextInputWidget.prototype.onIndicatorMouseDown = function ( e ) {
	if ( e.which === 1 ) {
		this.$input[ 0 ].focus();
		this.emit( 'indicator' );
		return false;
	}
};

/**
 * Handle key press events.
 *
 * @param {jQuery.Event} e Key press event
 * @fires enter If enter key is pressed and input is not multiline
 */
OO.ui.TextInputWidget.prototype.onKeyPress = function ( e ) {
	if ( e.which === OO.ui.Keys.ENTER && !this.multiline ) {
		this.emit( 'enter', e );
	}
};

/**
 * Handle element attach events.
 *
 * @param {jQuery.Event} e Element attach event
 */
OO.ui.TextInputWidget.prototype.onElementAttach = function () {
	// Any previously calculated size is now probably invalid if we reattached elsewhere
	this.valCache = null;
	this.adjustSize();
	this.positionLabel();
};

/**
 * @inheritdoc
 */
OO.ui.TextInputWidget.prototype.onEdit = function () {
	this.adjustSize();

	// Parent method
	return OO.ui.TextInputWidget.super.prototype.onEdit.call( this );
};

/**
 * @inheritdoc
 */
OO.ui.TextInputWidget.prototype.setValue = function ( value ) {
	// Parent method
	OO.ui.TextInputWidget.super.prototype.setValue.call( this, value );

	this.setValidityFlag();
	this.adjustSize();
	return this;
};

/**
 * Check if the widget is read-only.
 *
 * @return {boolean}
 */
OO.ui.TextInputWidget.prototype.isReadOnly = function () {
	return this.readOnly;
};

/**
 * Set the read-only state of the widget.
 *
 * This should probably change the widget's appearance and prevent it from being used.
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
 * Automatically adjust the size of the text input.
 *
 * This only affects multi-line inputs that are auto-sized.
 *
 * @chainable
 */
OO.ui.TextInputWidget.prototype.adjustSize = function () {
	var scrollHeight, innerHeight, outerHeight, maxInnerHeight, measurementError, idealHeight;

	if ( this.multiline && this.autosize && this.$input.val() !== this.valCache ) {
		this.$clone
			.val( this.$input.val() )
			.attr( 'rows', '' )
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
 * @private
 */
OO.ui.TextInputWidget.prototype.getInputElement = function ( config ) {
	return config.multiline ? $( '<textarea>' ) : $( '<input type="' + config.type + '" />' );
};

/**
 * Check if input supports multiple lines.
 *
 * @return {boolean}
 */
OO.ui.TextInputWidget.prototype.isMultiline = function () {
	return !!this.multiline;
};

/**
 * Check if input automatically adjusts its size.
 *
 * @return {boolean}
 */
OO.ui.TextInputWidget.prototype.isAutosizing = function () {
	return !!this.autosize;
};

/**
 * Select the contents of the input.
 *
 * @chainable
 */
OO.ui.TextInputWidget.prototype.select = function () {
	this.$input.select();
	return this;
};

/**
 * Sets the validation pattern to use.
 * @param {RegExp|string|null} validate Regular expression (or symbolic name referencing
 *  one, see #static-validationPatterns)
 */
OO.ui.TextInputWidget.prototype.setValidation = function ( validate ) {
	if ( validate instanceof RegExp ) {
		this.validate = validate;
	} else {
		this.validate = this.constructor.static.validationPatterns[ validate ] || /.*/;
	}
};

/**
 * Sets the 'invalid' flag appropriately.
 */
OO.ui.TextInputWidget.prototype.setValidityFlag = function () {
	var widget = this;
	this.isValid().done( function ( valid ) {
		widget.setFlags( { invalid: !valid } );
	} );
};

/**
 * Returns whether or not the current value is considered valid, according to the
 * supplied validation pattern.
 *
 * @return {jQuery.Deferred}
 */
OO.ui.TextInputWidget.prototype.isValid = function () {
	return $.Deferred().resolve( !!this.getValue().match( this.validate ) ).promise();
};

/**
 * Set the position of the inline label.
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
 * @chainable
 */
OO.ui.TextInputWidget.prototype.updatePosition = function () {
	var after = this.labelPosition === 'after';

	this.$element
		.toggleClass( 'oo-ui-textInputWidget-labelPosition-after', !!this.label && after )
		.toggleClass( 'oo-ui-textInputWidget-labelPosition-before', !!this.label && !after );

	if ( this.label ) {
		this.positionLabel();
	}

	return this;
};

/**
 * Position the label by setting the correct padding on the input.
 *
 * @chainable
 */
OO.ui.TextInputWidget.prototype.positionLabel = function () {
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

	var after = this.labelPosition === 'after',
		rtl = this.$element.css( 'direction' ) === 'rtl',
		property = after === rtl ? 'padding-left' : 'padding-right';

	this.$input.css( property, this.$label.outerWidth( true ) );

	return this;
};

/**
 * Text input with a menu of optional values.
 *
 * @class
 * @extends OO.ui.Widget
 * @mixins OO.ui.TabIndexedElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {Object} [menu] Configuration options to pass to menu widget
 * @cfg {Object} [input] Configuration options to pass to input widget
 * @cfg {jQuery} [$overlay] Overlay layer; defaults to relative positioning
 */
OO.ui.ComboBoxWidget = function OoUiComboBoxWidget( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.ComboBoxWidget.super.call( this, config );

	// Properties (must be set before TabIndexedElement constructor call)
	this.$indicator = this.$( '<span>' );

	// Mixin constructors
	OO.ui.TabIndexedElement.call( this, $.extend( {}, config, { $tabIndexed: this.$indicator } ) );

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
	this.menu = new OO.ui.TextInputMenuSelectWidget( this.input, $.extend(
		{
			widget: this,
			input: this.input,
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
OO.mixinClass( OO.ui.ComboBoxWidget, OO.ui.TabIndexedElement );

/* Methods */

/**
 * Get the combobox's menu.
 * @return {OO.ui.TextInputMenuSelectWidget} Menu widget
 */
OO.ui.ComboBoxWidget.prototype.getMenu = function () {
	return this.menu;
};

/**
 * Handle input change events.
 *
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
 * @param {jQuery.Event} e Key press event
 */
OO.ui.ComboBoxWidget.prototype.onKeyPress = function ( e ) {
	if ( !this.isDisabled() && ( e.which === OO.ui.Keys.SPACE || e.which === OO.ui.Keys.ENTER ) ) {
		this.menu.toggle();
		this.input.$input[ 0 ].focus();
	}
	return false;
};

/**
 * Handle input enter events.
 */
OO.ui.ComboBoxWidget.prototype.onInputEnter = function () {
	if ( !this.isDisabled() ) {
		this.menu.toggle( false );
	}
};

/**
 * Handle menu choose events.
 *
 * @param {OO.ui.OptionWidget} item Chosen item
 */
OO.ui.ComboBoxWidget.prototype.onMenuChoose = function ( item ) {
	if ( item ) {
		this.input.setValue( item.getData() );
	}
};

/**
 * Handle menu item change events.
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
	OO.ui.ComboBoxWidget.super.prototype.setDisabled.call( this, disabled );

	if ( this.input ) {
		this.input.setDisabled( this.isDisabled() );
	}
	if ( this.menu ) {
		this.menu.setDisabled( this.isDisabled() );
	}

	return this;
};

/**
 * Label widget.
 *
 * @class
 * @extends OO.ui.Widget
 * @mixins OO.ui.LabelElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {OO.ui.InputWidget} [input] Input widget this label is for
 */
OO.ui.LabelWidget = function OoUiLabelWidget( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.LabelWidget.super.call( this, config );

	// Mixin constructors
	OO.ui.LabelElement.call( this, $.extend( {}, config, { $label: this.$element } ) );
	OO.ui.TitledElement.call( this, config );

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
OO.mixinClass( OO.ui.LabelWidget, OO.ui.LabelElement );
OO.mixinClass( OO.ui.LabelWidget, OO.ui.TitledElement );

/* Static Properties */

OO.ui.LabelWidget.static.tagName = 'span';

/* Methods */

/**
 * Handles label mouse click events.
 *
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
 * @mixins OO.ui.LabelElement
 * @mixins OO.ui.FlaggedElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 */
OO.ui.OptionWidget = function OoUiOptionWidget( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.OptionWidget.super.call( this, config );

	// Mixin constructors
	OO.ui.ItemWidget.call( this );
	OO.ui.LabelElement.call( this, config );
	OO.ui.FlaggedElement.call( this, config );

	// Properties
	this.selected = false;
	this.highlighted = false;
	this.pressed = false;

	// Initialization
	this.$element
		.data( 'oo-ui-optionWidget', this )
		.attr( 'role', 'option' )
		.addClass( 'oo-ui-optionWidget' )
		.append( this.$label );
};

/* Setup */

OO.inheritClass( OO.ui.OptionWidget, OO.ui.Widget );
OO.mixinClass( OO.ui.OptionWidget, OO.ui.ItemWidget );
OO.mixinClass( OO.ui.OptionWidget, OO.ui.LabelElement );
OO.mixinClass( OO.ui.OptionWidget, OO.ui.FlaggedElement );

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
	return this.constructor.static.selectable && !this.isDisabled();
};

/**
 * Check if the option can be highlighted. A highlight indicates that the option
 * may be selected when a user presses enter or clicks. Disabled items cannot
 * be highlighted.
 *
 * @return {boolean} Item is highlightable
 */
OO.ui.OptionWidget.prototype.isHighlightable = function () {
	return this.constructor.static.highlightable && !this.isDisabled();
};

/**
 * Check if the option can be pressed. The pressed state occurs when a user mouses
 * down on an item, but has not yet let go of the mouse.
 *
 * @return {boolean} Item is pressable
 */
OO.ui.OptionWidget.prototype.isPressable = function () {
	return this.constructor.static.pressable && !this.isDisabled();
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
 * Option widget with an option icon and indicator.
 *
 * Use together with OO.ui.SelectWidget.
 *
 * @class
 * @extends OO.ui.OptionWidget
 * @mixins OO.ui.IconElement
 * @mixins OO.ui.IndicatorElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 */
OO.ui.DecoratedOptionWidget = function OoUiDecoratedOptionWidget( config ) {
	// Parent constructor
	OO.ui.DecoratedOptionWidget.super.call( this, config );

	// Mixin constructors
	OO.ui.IconElement.call( this, config );
	OO.ui.IndicatorElement.call( this, config );

	// Initialization
	this.$element
		.addClass( 'oo-ui-decoratedOptionWidget' )
		.prepend( this.$icon )
		.append( this.$indicator );
};

/* Setup */

OO.inheritClass( OO.ui.DecoratedOptionWidget, OO.ui.OptionWidget );
OO.mixinClass( OO.ui.OptionWidget, OO.ui.IconElement );
OO.mixinClass( OO.ui.OptionWidget, OO.ui.IndicatorElement );

/**
 * ButtonOptionWidget is a special type of {@link OO.ui.ButtonElement button element} that
 * can be selected and configured with data. The class is
 * used with OO.ui.ButtonSelectWidget to create a selection of button options. Please see the
 * [OOjs UI documentation on MediaWiki] [1] for more information.
 *
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Widgets/Selects_and_Options#Button_selects_and_options
 *
 * @class
 * @extends OO.ui.DecoratedOptionWidget
 * @mixins OO.ui.ButtonElement
 * @mixins OO.ui.TabIndexedElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 */
OO.ui.ButtonOptionWidget = function OoUiButtonOptionWidget( config ) {
	// Configuration initialization
	config = $.extend( { tabIndex: -1 }, config );

	// Parent constructor
	OO.ui.ButtonOptionWidget.super.call( this, config );

	// Mixin constructors
	OO.ui.ButtonElement.call( this, config );
	OO.ui.TabIndexedElement.call( this, $.extend( {}, config, { $tabIndexed: this.$button } ) );

	// Initialization
	this.$element.addClass( 'oo-ui-buttonOptionWidget' );
	this.$button.append( this.$element.contents() );
	this.$element.append( this.$button );
};

/* Setup */

OO.inheritClass( OO.ui.ButtonOptionWidget, OO.ui.DecoratedOptionWidget );
OO.mixinClass( OO.ui.ButtonOptionWidget, OO.ui.ButtonElement );
OO.mixinClass( OO.ui.ButtonOptionWidget, OO.ui.TabIndexedElement );

/* Static Properties */

// Allow button mouse down events to pass through so they can be handled by the parent select widget
OO.ui.ButtonOptionWidget.static.cancelButtonMouseDownEvents = false;

OO.ui.ButtonOptionWidget.static.highlightable = false;

/* Methods */

/**
 * @inheritdoc
 */
OO.ui.ButtonOptionWidget.prototype.setSelected = function ( state ) {
	OO.ui.ButtonOptionWidget.super.prototype.setSelected.call( this, state );

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
	OO.ui.RadioOptionWidget.super.call( this, config );

	// Initialization
	this.$element
		.addClass( 'oo-ui-radioOptionWidget' )
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
 * @inheritdoc
 */
OO.ui.RadioOptionWidget.prototype.setSelected = function ( state ) {
	OO.ui.RadioOptionWidget.super.prototype.setSelected.call( this, state );

	this.radio.setSelected( state );

	return this;
};

/**
 * @inheritdoc
 */
OO.ui.RadioOptionWidget.prototype.setDisabled = function ( disabled ) {
	OO.ui.RadioOptionWidget.super.prototype.setDisabled.call( this, disabled );

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
	OO.ui.MenuOptionWidget.super.call( this, config );

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
 * Section to group one or more items in a OO.ui.MenuSelectWidget.
 *
 * @class
 * @extends OO.ui.DecoratedOptionWidget
 *
 * @constructor
 * @param {Object} [config] Configuration options
 */
OO.ui.MenuSectionOptionWidget = function OoUiMenuSectionOptionWidget( config ) {
	// Parent constructor
	OO.ui.MenuSectionOptionWidget.super.call( this, config );

	// Initialization
	this.$element.addClass( 'oo-ui-menuSectionOptionWidget' );
};

/* Setup */

OO.inheritClass( OO.ui.MenuSectionOptionWidget, OO.ui.DecoratedOptionWidget );

/* Static Properties */

OO.ui.MenuSectionOptionWidget.static.selectable = false;

OO.ui.MenuSectionOptionWidget.static.highlightable = false;

/**
 * Items for an OO.ui.OutlineSelectWidget.
 *
 * @class
 * @extends OO.ui.DecoratedOptionWidget
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {number} [level] Indentation level
 * @cfg {boolean} [movable] Allow modification from outline controls
 */
OO.ui.OutlineOptionWidget = function OoUiOutlineOptionWidget( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.OutlineOptionWidget.super.call( this, config );

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
 * Movability is used by outline controls.
 *
 * @return {boolean} Item is movable
 */
OO.ui.OutlineOptionWidget.prototype.isMovable = function () {
	return this.movable;
};

/**
 * Check if item is removable.
 *
 * Removability is used by outline controls.
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
 * Movability is used by outline controls.
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
 * Removability is used by outline controls.
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
 * Container for content that is overlaid and positioned absolutely.
 *
 * @class
 * @extends OO.ui.Widget
 * @mixins OO.ui.LabelElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {number} [width=320] Width of popup in pixels
 * @cfg {number} [height] Height of popup, omit to use automatic height
 * @cfg {boolean} [anchor=true] Show anchor pointing to origin of popup
 * @cfg {string} [align='center'] Alignment of popup to origin
 * @cfg {jQuery} [$container] Container to prevent popup from rendering outside of
 * @cfg {number} [containerPadding=10] How much padding to keep between popup and container
 * @cfg {jQuery} [$content] Content to append to the popup's body
 * @cfg {boolean} [autoClose=false] Popup auto-closes when it loses focus
 * @cfg {jQuery} [$autoCloseIgnore] Elements to not auto close when clicked
 * @cfg {boolean} [head] Show label and close button at the top
 * @cfg {boolean} [padded] Add padding to the body
 */
OO.ui.PopupWidget = function OoUiPopupWidget( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.PopupWidget.super.call( this, config );

	// Properties (must be set before ClippableElement constructor call)
	this.$body = $( '<div>' );

	// Mixin constructors
	OO.ui.LabelElement.call( this, config );
	OO.ui.ClippableElement.call( this, $.extend( {}, config, { $clippable: this.$body } ) );

	// Properties
	this.$popup = $( '<div>' );
	this.$head = $( '<div>' );
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
	this.align = config.align || 'center';
	this.closeButton = new OO.ui.ButtonWidget( { framed: false, icon: 'close' } );
	this.onMouseDownHandler = this.onMouseDown.bind( this );

	// Events
	this.closeButton.connect( this, { click: 'onCloseButtonClick' } );

	// Initialization
	this.toggleAnchor( config.anchor === undefined || config.anchor );
	this.$body.addClass( 'oo-ui-popupWidget-body' );
	this.$anchor.addClass( 'oo-ui-popupWidget-anchor' );
	this.$head
		.addClass( 'oo-ui-popupWidget-head' )
		.append( this.$label, this.closeButton.$element );
	if ( !config.head ) {
		this.$head.addClass( 'oo-ui-element-hidden' );
	}
	this.$popup
		.addClass( 'oo-ui-popupWidget-popup' )
		.append( this.$head, this.$body );
	this.$element
		.addClass( 'oo-ui-popupWidget' )
		.append( this.$popup, this.$anchor );
	// Move content, which was added to #$element by OO.ui.Widget, to the body
	if ( config.$content instanceof jQuery ) {
		this.$body.append( config.$content );
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
OO.mixinClass( OO.ui.PopupWidget, OO.ui.LabelElement );
OO.mixinClass( OO.ui.PopupWidget, OO.ui.ClippableElement );

/* Methods */

/**
 * Handles mouse down events.
 *
 * @param {jQuery.Event} e Mouse down event
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
 */
OO.ui.PopupWidget.prototype.bindMouseDownListener = function () {
	// Capture clicks outside popup
	this.getElementWindow().addEventListener( 'mousedown', this.onMouseDownHandler, true );
};

/**
 * Handles close button click events.
 */
OO.ui.PopupWidget.prototype.onCloseButtonClick = function () {
	if ( this.isVisible() ) {
		this.toggle( false );
	}
};

/**
 * Unbind mouse down listener.
 */
OO.ui.PopupWidget.prototype.unbindMouseDownListener = function () {
	this.getElementWindow().removeEventListener( 'mousedown', this.onMouseDownHandler, true );
};

/**
 * Set whether to show a anchor.
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
 * Check if showing a anchor.
 *
 * @return {boolean} anchor is visible
 */
OO.ui.PopupWidget.prototype.hasAnchor = function () {
	return this.anchor;
};

/**
 * @inheritdoc
 */
OO.ui.PopupWidget.prototype.toggle = function ( show ) {
	show = show === undefined ? !this.isVisible() : !!show;

	var change = show !== this.isVisible();

	// Parent method
	OO.ui.PopupWidget.super.prototype.toggle.call( this, show );

	if ( change ) {
		if ( show ) {
			if ( this.autoClose ) {
				this.bindMouseDownListener();
			}
			this.updateDimensions();
			this.toggleClipping( true );
		} else {
			this.toggleClipping( false );
			if ( this.autoClose ) {
				this.unbindMouseDownListener();
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
 * @param {number} width Width
 * @param {number} height Height
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

	// Compute initial popupOffset based on alignment
	popupOffset = this.width * ( { left: 0, center: -0.5, right: -1 } )[ this.align ];

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
 * Progress bar widget.
 *
 * @class
 * @extends OO.ui.Widget
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {number|boolean} [progress=false] Initial progress percent or false for indeterminate
 */
OO.ui.ProgressBarWidget = function OoUiProgressBarWidget( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.ProgressBarWidget.super.call( this, config );

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
 * Get progress percent
 *
 * @return {number} Progress percent
 */
OO.ui.ProgressBarWidget.prototype.getProgress = function () {
	return this.progress;
};

/**
 * Set progress percent
 *
 * @param {number|boolean} progress Progress percent or false for indeterminate
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
 * Search widget.
 *
 * Search widgets combine a query input, placed above, and a results selection widget, placed below.
 * Results are cleared and populated each time the query is changed.
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
	OO.ui.SearchWidget.super.call( this, config );

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
	this.results.connect( this, {
		highlight: 'onResultsHighlight',
		select: 'onResultsSelect'
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

/* Events */

/**
 * @event highlight
 * @param {Object|null} item Item data or null if no item is highlighted
 */

/**
 * @event select
 * @param {Object|null} item Item data or null if no item is selected
 */

/* Methods */

/**
 * Handle query key down events.
 *
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
 * @param {string} value New value
 */
OO.ui.SearchWidget.prototype.onQueryChange = function () {
	// Reset
	this.results.clearItems();
};

/**
 * Handle select widget enter key events.
 *
 * Selects highlighted item.
 *
 * @param {string} value New value
 */
OO.ui.SearchWidget.prototype.onQueryEnter = function () {
	// Reset
	this.results.selectItem( this.results.getHighlightedItem() );
};

/**
 * Handle select widget highlight events.
 *
 * @param {OO.ui.OptionWidget} item Highlighted item
 * @fires highlight
 */
OO.ui.SearchWidget.prototype.onResultsHighlight = function ( item ) {
	this.emit( 'highlight', item ? item.getData() : null );
};

/**
 * Handle select widget select events.
 *
 * @param {OO.ui.OptionWidget} item Selected item
 * @fires select
 */
OO.ui.SearchWidget.prototype.onResultsSelect = function ( item ) {
	this.emit( 'select', item ? item.getData() : null );
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
 * Get the results list.
 *
 * @return {OO.ui.SelectWidget} Select list
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
 * This class should be used together with OO.ui.OptionWidget.
 *
 * For more information, please see the [OOjs UI documentation on MediaWiki][1].
 *
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Widgets/Selects_and_Options
 *
 * @class
 * @extends OO.ui.Widget
 * @mixins OO.ui.GroupElement
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
	OO.ui.SelectWidget.super.call( this, config );

	// Mixin constructors
	OO.ui.GroupWidget.call( this, $.extend( {}, config, { $group: this.$element } ) );

	// Properties
	this.pressed = false;
	this.selecting = null;
	this.onMouseUpHandler = this.onMouseUp.bind( this );
	this.onMouseMoveHandler = this.onMouseMove.bind( this );
	this.onKeyDownHandler = this.onKeyDown.bind( this );

	// Events
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
OO.mixinClass( OO.ui.SelectWidget, OO.ui.GroupElement );
OO.mixinClass( OO.ui.SelectWidget, OO.ui.GroupWidget );

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
 * @param {OO.ui.OptionWidget|null} item Chosen item
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
			this.getElementDocument().addEventListener(
				'mouseup',
				this.onMouseUpHandler,
				true
			);
			this.getElementDocument().addEventListener(
				'mousemove',
				this.onMouseMoveHandler,
				true
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

	this.getElementDocument().removeEventListener(
		'mouseup',
		this.onMouseUpHandler,
		true
	);
	this.getElementDocument().removeEventListener(
		'mousemove',
		this.onMouseMoveHandler,
		true
	);

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
				nextItem = this.getRelativeSelectableItem( currentItem, -1 );
				handled = true;
				break;
			case OO.ui.Keys.DOWN:
			case OO.ui.Keys.RIGHT:
				nextItem = this.getRelativeSelectableItem( currentItem, 1 );
				handled = true;
				break;
			case OO.ui.Keys.ESCAPE:
			case OO.ui.Keys.TAB:
				if ( currentItem && currentItem.constructor.static.highlightable ) {
					currentItem.setHighlighted( false );
				}
				this.unbindKeyDownListener();
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
 */
OO.ui.SelectWidget.prototype.bindKeyDownListener = function () {
	this.getElementWindow().addEventListener( 'keydown', this.onKeyDownHandler, true );
};

/**
 * Unbind key down listener.
 */
OO.ui.SelectWidget.prototype.unbindKeyDownListener = function () {
	this.getElementWindow().removeEventListener( 'keydown', this.onKeyDownHandler, true );
};

/**
 * Get the closest item to a jQuery.Event.
 *
 * @private
 * @param {jQuery.Event} e
 * @return {OO.ui.OptionWidget|null} Outline item widget, `null` if none was found
 */
OO.ui.SelectWidget.prototype.getTargetItem = function ( e ) {
	var $item = $( e.target ).closest( '.oo-ui-optionWidget' );
	if ( $item.length ) {
		return $item.data( 'oo-ui-optionWidget' );
	}
	return null;
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
 * Identical to #selectItem, but may vary in subclasses that want to take additional action when
 * an item is selected using the keyboard or mouse.
 *
 * @param {OO.ui.OptionWidget} item Item to choose
 * @fires choose
 * @chainable
 */
OO.ui.SelectWidget.prototype.chooseItem = function ( item ) {
	this.selectItem( item );
	this.emit( 'choose', item );

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
 * @return {OO.ui.OptionWidget|null} Item at position, `null` if there are no items in the select
 */
OO.ui.SelectWidget.prototype.getRelativeSelectableItem = function ( item, direction ) {
	var currentIndex, nextIndex, i,
		increase = direction > 0 ? 1 : -1,
		len = this.items.length;

	if ( item instanceof OO.ui.OptionWidget ) {
		currentIndex = $.inArray( item, this.items );
		nextIndex = ( currentIndex + increase + len ) % len;
	} else {
		// If no item is selected and moving forward, start at the beginning.
		// If moving backward, start at the end.
		nextIndex = direction > 0 ? 0 : len - 1;
	}

	for ( i = 0; i < len; i++ ) {
		item = this.items[ nextIndex ];
		if ( item instanceof OO.ui.OptionWidget && item.isSelectable() ) {
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
	OO.ui.GroupWidget.prototype.addItems.call( this, items, index );

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
	OO.ui.GroupWidget.prototype.removeItems.call( this, items );

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
	OO.ui.GroupWidget.prototype.clearItems.call( this );

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
 *         title:'Button option 1'
 *     } );
 *
 *     var option2 = new OO.ui.ButtonOptionWidget( {
 *         data: 2,
 *         label: 'Option 2',
 *         title:'Button option 2'
 *     } );
 *
 *     var option3 = new OO.ui.ButtonOptionWidget( {
 *         data: 3,
 *         label: 'Option 3',
 *         title:'Button option 3'
 *     } );
 *
 *     var buttonSelect=new OO.ui.ButtonSelectWidget( {
 *         items: [option1, option2, option3]
 *     } );
 *     $('body').append(buttonSelect.$element);
 *
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Widgets/Selects_and_Options
 *
 * @class
 * @extends OO.ui.SelectWidget
 * @mixins OO.ui.TabIndexedElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 */
OO.ui.ButtonSelectWidget = function OoUiButtonSelectWidget( config ) {
	// Parent constructor
	OO.ui.ButtonSelectWidget.super.call( this, config );

	// Mixin constructors
	OO.ui.TabIndexedElement.call( this, config );

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
OO.mixinClass( OO.ui.ButtonSelectWidget, OO.ui.TabIndexedElement );

/**
 * RadioSelectWidget is a {@link OO.ui.SelectWidget select widget} that contains radio
 * options and is used together with OO.ui.RadioOptionWidget. The RadioSelectWidget provides
 * an interface for adding, removing and selecting options.
 * Please see the [OOjs UI documentation on MediaWiki][1] for more information.
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
 *         items: [option1, option2]
 *      } );
 *
 *     // Select 'option 1' using the RadioSelectWidget's selectItem() method.
 *     radioSelect.selectItem( option1 );
 *
 *     $('body').append(radioSelect.$element);
 *
 * [1]: https://www.mediawiki.org/wiki/OOjs_UI/Widgets/Selects_and_Options

 *
 * @class
 * @extends OO.ui.SelectWidget
 * @mixins OO.ui.TabIndexedElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 */
OO.ui.RadioSelectWidget = function OoUiRadioSelectWidget( config ) {
	// Parent constructor
	OO.ui.RadioSelectWidget.super.call( this, config );

	// Mixin constructors
	OO.ui.TabIndexedElement.call( this, config );

	// Events
	this.$element.on( {
		focus: this.bindKeyDownListener.bind( this ),
		blur: this.unbindKeyDownListener.bind( this )
	} );

	// Initialization
	this.$element.addClass( 'oo-ui-radioSelectWidget' );
};

/* Setup */

OO.inheritClass( OO.ui.RadioSelectWidget, OO.ui.SelectWidget );
OO.mixinClass( OO.ui.RadioSelectWidget, OO.ui.TabIndexedElement );

/**
 * MenuSelectWidget is a {@link OO.ui.SelectWidget select widget} that contains options and
 * is used together with OO.ui.MenuOptionWidget. See {@link OO.ui.DropdownWidget DropdownWidget} and
 * {@link OO.ui.ComboBoxWidget ComboBoxWidget} for examples of interfaces that contain menus.
 * MenuSelectWidgets themselves are not designed to be instantiated directly, rather subclassed
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
 * @mixins OO.ui.ClippableElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {OO.ui.TextInputWidget} [input] Input to bind keyboard handlers to
 * @cfg {OO.ui.Widget} [widget] Widget to bind mouse handlers to
 * @cfg {boolean} [autoHide=true] Hide the menu when the mouse is pressed outside the menu
 */
OO.ui.MenuSelectWidget = function OoUiMenuSelectWidget( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.MenuSelectWidget.super.call( this, config );

	// Mixin constructors
	OO.ui.ClippableElement.call( this, $.extend( {}, config, { $clippable: this.$group } ) );

	// Properties
	this.newItems = null;
	this.autoHide = config.autoHide === undefined || !!config.autoHide;
	this.$input = config.input ? config.input.$input : null;
	this.$widget = config.widget ? config.widget.$element : null;
	this.onDocumentMouseDownHandler = this.onDocumentMouseDown.bind( this );

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
OO.mixinClass( OO.ui.MenuSelectWidget, OO.ui.ClippableElement );

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
					OO.ui.MenuSelectWidget.super.prototype.onKeyDown.call( this, e );
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
				OO.ui.MenuSelectWidget.super.prototype.onKeyDown.call( this, e );
				return;
		}
	}
};

/**
 * @inheritdoc
 */
OO.ui.MenuSelectWidget.prototype.bindKeyDownListener = function () {
	if ( this.$input ) {
		this.$input.on( 'keydown', this.onKeyDownHandler );
	} else {
		OO.ui.MenuSelectWidget.super.prototype.bindKeyDownListener.call( this );
	}
};

/**
 * @inheritdoc
 */
OO.ui.MenuSelectWidget.prototype.unbindKeyDownListener = function () {
	if ( this.$input ) {
		this.$input.off( 'keydown', this.onKeyDownHandler );
	} else {
		OO.ui.MenuSelectWidget.super.prototype.unbindKeyDownListener.call( this );
	}
};

/**
 * Choose an item.
 *
 * This will close the menu, unlike #selectItem which only changes selection.
 *
 * @param {OO.ui.OptionWidget} item Item to choose
 * @chainable
 */
OO.ui.MenuSelectWidget.prototype.chooseItem = function ( item ) {
	OO.ui.MenuSelectWidget.super.prototype.chooseItem.call( this, item );
	this.toggle( false );
	return this;
};

/**
 * @inheritdoc
 */
OO.ui.MenuSelectWidget.prototype.addItems = function ( items, index ) {
	var i, len, item;

	// Parent method
	OO.ui.MenuSelectWidget.super.prototype.addItems.call( this, items, index );

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
	OO.ui.MenuSelectWidget.super.prototype.removeItems.call( this, items );

	// Reevaluate clipping
	this.clip();

	return this;
};

/**
 * @inheritdoc
 */
OO.ui.MenuSelectWidget.prototype.clearItems = function () {
	// Parent method
	OO.ui.MenuSelectWidget.super.prototype.clearItems.call( this );

	// Reevaluate clipping
	this.clip();

	return this;
};

/**
 * @inheritdoc
 */
OO.ui.MenuSelectWidget.prototype.toggle = function ( visible ) {
	visible = ( visible === undefined ? !this.visible : !!visible ) && !!this.items.length;

	var i, len,
		change = visible !== this.isVisible();

	// Parent method
	OO.ui.MenuSelectWidget.super.prototype.toggle.call( this, visible );

	if ( change ) {
		if ( visible ) {
			this.bindKeyDownListener();

			if ( this.newItems && this.newItems.length ) {
				for ( i = 0, len = this.newItems.length; i < len; i++ ) {
					this.newItems[ i ].fitLabel();
				}
				this.newItems = null;
			}
			this.toggleClipping( true );

			// Auto-hide
			if ( this.autoHide ) {
				this.getElementDocument().addEventListener(
					'mousedown', this.onDocumentMouseDownHandler, true
				);
			}
		} else {
			this.unbindKeyDownListener();
			this.getElementDocument().removeEventListener(
				'mousedown', this.onDocumentMouseDownHandler, true
			);
			this.toggleClipping( false );
		}
	}

	return this;
};

/**
 * Menu for a text input widget.
 *
 * This menu is specially designed to be positioned beneath a text input widget. The menu's position
 * is automatically calculated and maintained when the menu is toggled or the window is resized.
 *
 * @class
 * @extends OO.ui.MenuSelectWidget
 *
 * @constructor
 * @param {OO.ui.TextInputWidget} inputWidget Text input widget to provide menu for
 * @param {Object} [config] Configuration options
 * @cfg {jQuery} [$container=input.$element] Element to render menu under
 */
OO.ui.TextInputMenuSelectWidget = function OoUiTextInputMenuSelectWidget( inputWidget, config ) {
	// Allow passing positional parameters inside the config object
	if ( OO.isPlainObject( inputWidget ) && config === undefined ) {
		config = inputWidget;
		inputWidget = config.inputWidget;
	}

	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.TextInputMenuSelectWidget.super.call( this, config );

	// Properties
	this.inputWidget = inputWidget;
	this.$container = config.$container || this.inputWidget.$element;
	this.onWindowResizeHandler = this.onWindowResize.bind( this );

	// Initialization
	this.$element.addClass( 'oo-ui-textInputMenuSelectWidget' );
};

/* Setup */

OO.inheritClass( OO.ui.TextInputMenuSelectWidget, OO.ui.MenuSelectWidget );

/* Methods */

/**
 * Handle window resize event.
 *
 * @param {jQuery.Event} e Window resize event
 */
OO.ui.TextInputMenuSelectWidget.prototype.onWindowResize = function () {
	this.position();
};

/**
 * @inheritdoc
 */
OO.ui.TextInputMenuSelectWidget.prototype.toggle = function ( visible ) {
	visible = visible === undefined ? !this.isVisible() : !!visible;

	var change = visible !== this.isVisible();

	if ( change && visible ) {
		// Make sure the width is set before the parent method runs.
		// After this we have to call this.position(); again to actually
		// position ourselves correctly.
		this.position();
	}

	// Parent method
	OO.ui.TextInputMenuSelectWidget.super.prototype.toggle.call( this, visible );

	if ( change ) {
		if ( this.isVisible() ) {
			this.position();
			$( this.getElementWindow() ).on( 'resize', this.onWindowResizeHandler );
		} else {
			$( this.getElementWindow() ).off( 'resize', this.onWindowResizeHandler );
		}
	}

	return this;
};

/**
 * Position the menu.
 *
 * @chainable
 */
OO.ui.TextInputMenuSelectWidget.prototype.position = function () {
	var $container = this.$container,
		pos = OO.ui.Element.static.getRelativePosition( $container, this.$element.offsetParent() );

	// Position under input
	pos.top += $container.height();
	this.$element.css( pos );

	// Set width
	this.setIdealSize( $container.width() );
	// We updated the position, so re-evaluate the clipping state
	this.clip();

	return this;
};

/**
 * Structured list of items.
 *
 * Use with OO.ui.OutlineOptionWidget.
 *
 * @class
 * @extends OO.ui.SelectWidget
 * @mixins OO.ui.TabIndexedElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 */
OO.ui.OutlineSelectWidget = function OoUiOutlineSelectWidget( config ) {
	// Parent constructor
	OO.ui.OutlineSelectWidget.super.call( this, config );

	// Mixin constructors
	OO.ui.TabIndexedElement.call( this, config );

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
OO.mixinClass( OO.ui.OutlineSelectWidget, OO.ui.TabIndexedElement );

/**
 * Switch that slides on and off.
 *
 * @class
 * @extends OO.ui.Widget
 * @mixins OO.ui.ToggleWidget
 * @mixins OO.ui.TabIndexedElement
 *
 * @constructor
 * @param {Object} [config] Configuration options
 * @cfg {boolean} [value=false] Initial value
 */
OO.ui.ToggleSwitchWidget = function OoUiToggleSwitchWidget( config ) {
	// Parent constructor
	OO.ui.ToggleSwitchWidget.super.call( this, config );

	// Mixin constructors
	OO.ui.ToggleWidget.call( this, config );
	OO.ui.TabIndexedElement.call( this, config );

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

OO.inheritClass( OO.ui.ToggleSwitchWidget, OO.ui.Widget );
OO.mixinClass( OO.ui.ToggleSwitchWidget, OO.ui.ToggleWidget );
OO.mixinClass( OO.ui.ToggleSwitchWidget, OO.ui.TabIndexedElement );

/* Methods */

/**
 * Handle mouse click events.
 *
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
 * @param {jQuery.Event} e Key press event
 */
OO.ui.ToggleSwitchWidget.prototype.onKeyPress = function ( e ) {
	if ( !this.isDisabled() && ( e.which === OO.ui.Keys.SPACE || e.which === OO.ui.Keys.ENTER ) ) {
		this.setValue( !this.value );
	}
	return false;
};

}( OO ) );
