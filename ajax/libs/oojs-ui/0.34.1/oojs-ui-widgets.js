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
 * @return {OO.ui.IndexLayout} The layout, for chaining
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
 * @return {OO.ui.IndexLayout} The layout, for chaining
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
 * @return {OO.ui.IndexLayout} The layout, for chaining
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
 * @return {OO.ui.IndexLayout} The layout, for chaining
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
 * @static
 * @inheritdoc
 */
OO.ui.TabOptionWidget.static.scrollIntoViewOnSelect = true;

/**
 * Center tab horizontally after selecting on mobile
 *
 * @param {Object} [config] Configuration options
 * @return {jQuery.Promise} Promise which resolves when the scroll is complete
 */
OO.ui.TabOptionWidget.prototype.scrollElementIntoView = function ( config ) {
	var padding;
	if ( !OO.ui.isMobile() || !this.getElementGroup() ) {
		// Parent method
		return OO.ui.TabOptionWidget.super.prototype.scrollElementIntoView.call( this );
	} else {
		padding = Math.max( (
			this.getElementGroup().$element[ 0 ].clientWidth - this.$element[ 0 ].clientWidth
		) / 2, 0 );
		// Parent method
		return OO.ui.TabOptionWidget.super.prototype.scrollElementIntoView.call( this, $.extend(
			{
				padding: {
					left: padding,
					right: padding
				}
			},
			config
		) );
	}
};

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
 * Perform an action responding to the Backspace key on the input
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
 * @cfg {OO.ui.InputWidget} [input] {@link OO.ui.InputWidget Input widget} for search. Defaults
 *  to a {@link OO.ui.SearchInputWidget search input widget} if not provided.
 */
OO.ui.SearchWidget = function OoUiSearchWidget( config ) {
	// Configuration initialization
	config = config || {};

	// Parent constructor
	OO.ui.SearchWidget.parent.call( this, config );

	// Properties
	this.query = config.input || new OO.ui.SearchInputWidget( {
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