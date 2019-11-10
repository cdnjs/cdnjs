/*!
 * OOUI v0.34.1-pre (3913589098)
 * https://www.mediawiki.org/wiki/OOUI
 *
 * Copyright 2011–2019 OOUI Team and other contributors.
 * Released under the MIT license
 * http://oojs.mit-license.org
 *
 * Date: 2019-09-10T23:46:03Z
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
 *         {
 *           action: 'continue',
 *           modes: 'edit',
 *           label: 'Continue',
 *           flags: [ 'primary', 'progressive' ]
 *         },
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
 * promise (jQuery, native, or any other “thenable”), or a function:
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
			if ( result && typeof result.then === 'function' ) {
				// Use a promise generated from the result
				return $.when( result ).promise();
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
	if ( typeof step === 'number' || typeof step.then === 'function' ) {
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
						manager.togglePreventIosScrolling( true );
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
		manager.togglePreventIosScrolling( false );
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
 * Prevent scrolling of the document on iOS devices that don't respect `body { overflow: hidden; }`.
 *
 * This function is called when the window is opened (ready), and so the background is covered up,
 * and the user won't see that we're doing weird things to the scroll position.
 *
 * @private
 * @param {boolean} on
 * @chainable
 * @return {OO.ui.WindowManager} The manager, for chaining
 */
OO.ui.WindowManager.prototype.togglePreventIosScrolling = function ( on ) {
	var
		isIos = /ipad|iphone|ipod/i.test( navigator.userAgent ),
		$body = $( this.getElementDocument().body ),
		scrollableRoot = OO.ui.Element.static.getRootScrollableElement( $body[ 0 ] ),
		stackDepth = $body.data( 'windowManagerGlobalEvents' ) || 0;

	// Only if this is the first/last WindowManager (see #toggleGlobalEvents)
	if ( !isIos || stackDepth !== 1 ) {
		return this;
	}

	if ( on ) {
		// We can't apply this workaround for non-fullscreen dialogs, because the user would see the
		// scroll position change. If they have content that needs scrolling, you're out of luck…
		// Always remember the scroll position in case dialog is closed with different size.
		this.iosOrigScrollPosition = scrollableRoot.scrollTop;
		if ( this.getCurrentWindow().getSize() === 'full' ) {
			$body.add( $body.parent() ).addClass( 'oo-ui-windowManager-ios-modal-ready' );
		}
	} else {
		// Always restore ability to scroll in case dialog was opened with different size.
		$body.add( $body.parent() ).removeClass( 'oo-ui-windowManager-ios-modal-ready' );
		if ( this.getCurrentWindow().getSize() === 'full' ) {
			scrollableRoot.scrollTop = this.iosOrigScrollPosition;
		}
	}
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

	config = $.extend( { framed: true }, config );
	if ( checkFlag( 'close' ) ) {
		// Change close buttons to icon only.
		$.extend( config, {
			icon: 'close',
			invisibleLabel: true
		} );
	} else if ( checkFlag( 'back' ) ) {
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

	safeWidth = this.$safeActions.width();
	primaryWidth = this.$primaryActions.width();
	biggerWidth = Math.max( safeWidth, primaryWidth );

	labelWidth = this.title.$element.width();

	if ( !OO.ui.isMobile() && 2 * biggerWidth + labelWidth < navigationWidth ) {
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