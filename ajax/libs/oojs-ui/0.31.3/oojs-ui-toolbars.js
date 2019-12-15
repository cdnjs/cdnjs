/*!
 * OOUI v0.31.3
 * https://www.mediawiki.org/wiki/OOUI
 *
 * Copyright 2011–2019 OOUI Team and other contributors.
 * Released under the MIT license
 * http://oojs.mit-license.org
 *
 * Date: 2019-04-04T19:10:48Z
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
 * @return {undefined/boolean} False to prevent default if event is handled
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
		if ( groupConfig.name ) {
			this.groupsByName[ groupConfig.name ] = toolGroup;
		} else {
			// Groups without name are deprecated
			OO.ui.warnDeprecation( 'Toolgroups must have a \'name\' property' );
		}
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
 * @return {undefined/boolean} False to prevent default if event is handled
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
 * @return {undefined/boolean} False to prevent default if event is handled
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
 * @return {undefined/boolean} False to prevent default if event is handled
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