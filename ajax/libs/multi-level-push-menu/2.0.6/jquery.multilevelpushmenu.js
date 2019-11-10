/**
 * jquery.multilevelpushmenu.js v2.0.6
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Make IT d.o.o.
 * http://multi-level-push-menu.make.rs
 * https://github.com/adgsm/multi-level-push-menu
 */
(function ( $ ) {
	$.fn.multilevelpushmenu = function( options ) {
		var args = arguments;
			returnValue = null;
		
		this.each(function(){
			var instance = this,
				$this = $( this ),
				$container = ( $this.context != undefined ) ? $this : $( 'body' ),
				menu = ( options.menu != undefined ) ? options.menu : $this.find( 'nav' ),
				eventType = mobileCheck() ? 'touchstart' : 'click';

			// Settings
			var settings = $.extend({
				container: $container,
				containersToPush: null,
				menuID: ( ( $container.prop( 'id' ) != undefined && $container.prop( 'id' ) != '' ) ? $container.prop( 'id' ) : this.nodeName.toLowerCase() ) + "_multilevelpushmenu",
				wrapperClass: 'multilevelpushmenu_wrapper',
				menuInactiveClass: 'multilevelpushmenu_inactive',
				menu: menu,
				menuWidth: 0,
				menuHeight: 0,
				collapsed: false,
				backText: 'Back',
				backItemClass: 'backItemClass',
				backItemIcon: 'fa fa-angle-right',
				groupIcon: 'fa fa-angle-left',
				mode: 'overlap',
				overlapWidth: 40,
				preventItemClick: true,
				preventGroupItemClick: true,
				onCollapseMenuStart: function() {},
				onCollapseMenuEnd: function() {},
				onExpandMenuStart: function() {},
				onExpandMenuEnd: function() {},
				onGroupItemClick: function() {},
				onItemClick: function() {},
				onTitleItemClick: function() {},
				onBackItemClick: function() {}
			}, options );

			// Store a settings reference withint the element's data
			if (!$.data(instance, 'plugin_multilevelpushmenu')) {
				$.data(instance, 'plugin_multilevelpushmenu', settings);
				instance.settings = $.data(instance, 'plugin_multilevelpushmenu');
			}

			// Exposed methods
			var methods = {
				// Initialize menu
				init: function () {
					return initialize.apply(this, Array.prototype.slice.call(arguments));
				},
				// Collapse menu
				collapse: function () {
					return collapseMenu.apply(this, Array.prototype.slice.call(arguments));
				},
				// Expand menu
				expand: function () {
					return expandMenu.apply(this, Array.prototype.slice.call(arguments));
				},
				// Menu expanded
				menuexpanded: function () {
					return menuExpanded.apply(this, Array.prototype.slice.call(arguments));
				},
				// Active menu
				activemenu: function () {
					return activeMenu.apply(this, Array.prototype.slice.call(arguments));
				},
				// Find menu(s) by title
				findmenusbytitle: function () {
					return findMenusByTitle.apply(this, Array.prototype.slice.call(arguments));
				},
				// Find item(s) by name
				finditemsbyname: function () {
					return findItemsByName.apply(this, Array.prototype.slice.call(arguments));
				},
				// Find path to root menu collection
				pathtoroot: function () {
					return pathToRoot.apply(this, Array.prototype.slice.call(arguments));
				},
				// Find shared path to root of two menus
				comparepaths: function () {
					return comparePaths.apply(this, Array.prototype.slice.call(arguments));
				},
				// Get/Set settings options
				option: function () {
					return manageOptions.apply(this, Array.prototype.slice.call(arguments));
				},
				// Add item(s)
				additems: function () {
					return addItems.apply(this, Array.prototype.slice.call(arguments));
				},
				// Remove item(s)
				removeitems: function () {
					return removeItems.apply(this, Array.prototype.slice.call(arguments));
				}
			};

			// IE 8 and modern browsers, prevent event propagation
			function stopEventPropagation( e ){
				if ( e.stopPropagation && e.preventDefault ) {
					e.stopPropagation();
					e.preventDefault();
				}
				else {
					e.cancelBubble = true;
					e.returnValue = false;
				}
			}

			// Create DOM structure if it does not already exist within the container (input: array)
			function createDOMStructure() {
				var $mainWrapper = $( "<nav />" )
				    .prop( { "id" : instance.settings.menuID, "className" : instance.settings.wrapperClass } )
				    .appendTo( instance.settings.container );
				createNestedDOMStructure( instance.settings.menu, $mainWrapper );
			}
			function createNestedDOMStructure( menus, $wrapper ){
				if( menus.level == undefined ) menus.level = 0;
				$.each( menus, function(){
					var $levelHolder = $( "<div />" )
					    .attr( { "class" : "levelHolderClass", "data-level" : menus.level, "style" : "margin-left: " + (( menus.level == 0 && !instance.settings.collapsed ) ? 0 : "-200%") } )
					    .appendTo( $wrapper ),
					    extWidth = ( isValidDim( instance.settings.menuWidth ) || ( isInt( instance.settings.menuWidth ) && instance.settings.menuWidth > 0 ) );
					if( extWidth ) $levelHolder.width(instance.settings.menuWidth);
					var $title = $( "<h2 />" )
					    .text( this.title )
					    .appendTo( $levelHolder ),
					    $titleIcon = $( "<i />" )
					    .prop( { "class" : "floatRight cursorPointer " + this.icon } )
					    .prependTo( $title );
					$titleIcon.bind( eventType ,  function(e){
						titleIconClick(e, $levelHolder, menus);
					});
					if( menus.level > 0 ) createBackItem( $levelHolder );
					var $itemGroup = $( "<ul />" )
					    .appendTo( $levelHolder );
					$.each(this.items, function(){
						createItem( this, $levelHolder , -1 );
					})
				});
			}

			// Update DOM structure if it already exists in container (input: HTML markup)
			function updateDOMStructure() {
				var $mainWrapper = ( instance.settings.container.find( 'nav' ).length > 0 ) ? instance.settings.container.find( 'nav' ) : instance.settings.menu;
				if( $mainWrapper.length == 0 ) return false;
				$mainWrapper.prop( { "id" : instance.settings.menuID, "className" : instance.settings.wrapperClass } );
				updateNestedDOMStructure( $mainWrapper );
			}
			function updateNestedDOMStructure( $wrapper ){
				if( $wrapper.level == undefined ) $wrapper.level = 0;
				$.each( $wrapper, function(){
					var $levelHolder = $( "<div />" )
					    .attr( { "class" : "levelHolderClass", "data-level" : $wrapper.level, "style" : "margin-left: " + (( $wrapper.level == 0 && !instance.settings.collapsed ) ? 0 : "-200%") } )
					    .appendTo( $wrapper ),
					    extWidth = ( isValidDim( instance.settings.menuWidth ) || ( isInt( instance.settings.menuWidth ) && instance.settings.menuWidth > 0 ) );
					if( extWidth ) $levelHolder.width(instance.settings.menuWidth);
					var $title = $wrapper.children( 'h2' );
					$title.appendTo( $levelHolder );
					var $titleIcon = $title.children( 'i' );
					$titleIcon.addClass( "floatRight cursorPointer" );
					$titleIcon.bind( eventType , function(e){
						titleIconClick(e, $levelHolder, $wrapper);
					});
					if( $wrapper.level > 0 ) createBackItem( $levelHolder );
					var $itemGroup = $wrapper.children( 'ul' );
					$itemGroup.appendTo( $levelHolder );
					$.each($itemGroup.children( 'li' ), function(){
						var $item = $( this );
						var $itemAnchor = $item.children( 'a' );
						var $itemIcon = $itemAnchor.children( 'i' );
						$itemIcon.addClass( 'floatRight' );
						if($item.children( 'ul' ).length > 0) {
							$itemAnchor.bind( eventType , function(e){
								itemGroupAnchorClick( e, $levelHolder, $item );
							});
							createItemGroupIcon( $itemAnchor );
							$item.level = $wrapper.level + 1;
							updateNestedDOMStructure($item);
						} else {
							$itemAnchor.bind( eventType , function(e){
								itemAnchorClick( e, $levelHolder, $item );
							});
						}
					})
				});
			}

			// Click event for title icon
			function titleIconClick( e, $levelHolder, menus ) {
				if( $(instance).find( 'div.levelHolderClass' ).is(':animated') ) return false;
				instance.settings.onTitleItemClick.apply(this, Array.prototype.slice.call([e, $levelHolder, instance.settings]));
				stopEventPropagation(e);
				if( menus.level == 0 && parseInt( $levelHolder.css( 'margin-left' ) ) < 0) {
					expandMenu();
				}
				else {
					var $nextLevelHolders = instance.settings.container
						.find( '#' + instance.settings.menuID + ' div.levelHolderClass' )
						.filter(function(){
							return (($( this ).attr( 'data-level' ) > $levelHolder.attr( 'data-level' )) && (parseInt( $( this ).css( 'margin-left' ) ) >= 0) );
						}),
						$prevLevelHolders = instance.settings.container
						.find( '#' + instance.settings.menuID + ' div.levelHolderClass' )
						.filter(function(){
							return (($( this ).attr( 'data-level' ) <= $levelHolder.attr( 'data-level' )) && (parseInt( $( this ).css( 'margin-left' ) ) >= 0) );
						}),
						fullCollapse = ( $nextLevelHolders.length == 0 && $prevLevelHolders.length == 1 ) ? collapseMenu() : collapseMenu( parseInt( $levelHolder.attr( 'data-level' ) ) );
				}
				$levelHolder.css( 'visibility' , 'visible' );
				$levelHolder.find( '.' + instance.settings.backItemClass ).css( 'visibility' , 'visible' );
				$levelHolder.find( 'ul' ).css( 'visibility' , 'visible' );
				$levelHolder.removeClass( instance.settings.menuInactiveClass );
			}

			// Create Back item DOM elements
			function createBackItem( $levelHolder ) {
				var $backItem = $( "<div />" )
				    .attr( { "class" : instance.settings.backItemClass } )
				    .appendTo( $levelHolder ),
				    $backItemAnchor = $( "<a />" )
				    .prop( { "href" : "#" } )
				    .text( instance.settings.backText )
				    .appendTo( $backItem ),
				    $backItemIcon = $( "<i />" )
				    .prop( { "class" : "floatRight " + instance.settings.backItemIcon } )
				    .prependTo( $backItemAnchor );
				$backItemAnchor.bind( eventType , function(e){
					backItemAnchorClick(e, $levelHolder);
				});
			}

			// Click event for back item
			function backItemAnchorClick( e, $levelHolder ) {
				if( $(instance).find( 'div.levelHolderClass' ).is(':animated') ) return false;
				instance.settings.onBackItemClick.apply(this, Array.prototype.slice.call([e, $levelHolder, instance.settings]));
				stopEventPropagation(e);
				collapseMenu( parseInt( $levelHolder.attr( 'data-level' ) - 1 ) );
			}

			// Click event for group items
			function itemGroupAnchorClick( e, $levelHolder, $item ) {
				if( $(instance).find( 'div.levelHolderClass' ).is(':animated') ) return false;
				instance.settings.onGroupItemClick.apply(this, Array.prototype.slice.call([e, $levelHolder, $item, instance.settings]));
				expandMenu( $item.find( 'div:first' ) );
				if( instance.settings.preventGroupItemClick ) stopEventPropagation(e);
			}

			// Create item group DOM element
			function createItemGroupIcon( $itemAnchor ) {
				var $itemGroupIcon = $( "<i />" )
					.prop( { "class" : "iconSpacing " + instance.settings.groupIcon } )
					.prependTo( $itemAnchor );
			}

			// Create item DOM element
			function createItem() {
				var item = arguments[0],
					$levelHolder = arguments[1],
					position = arguments[2],
					$itemGroup = $levelHolder.find( 'ul:first' ),
					$item = $( "<li />" );
					( position < ( $itemGroup.find( 'li' ).length ) && position >= 0 ) ? 
						$item.insertBefore( $itemGroup.find( 'li' ).eq( position ) ) : $item.appendTo( $itemGroup );
				    var $itemAnchor = $( "<a />" )
				    .prop( { "href" : item.link } )
				    .text( item.name )
				    .appendTo( $item ),
				    $itemIcon = $( "<i />" )
				    .prop( { "class" : "floatRight " + item.icon } )
				    .prependTo( $itemAnchor );
				if(item.items) {
					$itemAnchor.bind( eventType , function(e){
						itemGroupAnchorClick( e, $levelHolder, $item );
					});
					createItemGroupIcon( $itemAnchor );
					item.items.level = parseInt( $levelHolder.attr( 'data-level' ), 10 ) + 1;
					createNestedDOMStructure(item.items, $item);
				} else {
					$itemAnchor.bind( eventType , function(e){
						itemAnchorClick( e, $levelHolder, $item );
					});
				}
			}

			// Click event for items
			function itemAnchorClick( e, $levelHolder, $item ) {
				instance.settings.onItemClick.apply(this, Array.prototype.slice.call([e, $levelHolder, $item, instance.settings]));
				if( instance.settings.preventItemClick ) stopEventPropagation(e);
			}

			// Sizing DOM elements per creation/update
			function sizeDOMelements() {
				var forceWidth = arguments[0],
					forceHeight = arguments[1],
					filter = arguments[2],
					ieShadowFilterDistortion = ($('#' + instance.settings.menuID + ' div.levelHolderClass').first().css('filter').match(/DXImageTransform\.Microsoft\.Shadow/)) ? $('#' + instance.settings.menuID + ' div.levelHolderClass').first().get(0).filters.item("DXImageTransform.Microsoft.Shadow").strength : 0,
					maxWidth = ( forceWidth == undefined ) ? Math.max.apply( null,
				        $('#' + instance.settings.menuID + ' div.levelHolderClass').map(function(){ return $(this).width(); }).get() ) : forceWidth,
					maxLevel = Math.max.apply( null,
				        $('#' + instance.settings.menuID + ' div.levelHolderClass').map(function(){ return $(this).attr( 'data-level' ); }).get() ),
					maxExtWidth = maxWidth + maxLevel * ( instance.settings.overlapWidth + ieShadowFilterDistortion ),
					maxHeight = ( forceHeight == undefined ) ? Math.max.apply( null,
				        $('#' + instance.settings.menuID + ' div.levelHolderClass').map(function(){ return $(this).height(); }).get() ) : forceHeight,
					extWidth = ( isValidDim( instance.settings.menuWidth ) || ( isInt( instance.settings.menuWidth ) && instance.settings.menuWidth > 0 ) ),
					extHeight = ( isValidDim( instance.settings.menuHeight ) || ( isInt( instance.settings.menuHeight ) && instance.settings.menuHeight > 0 ) ),
					$objects = ( filter == undefined ) ? $('#' + instance.settings.menuID + ' div.levelHolderClass' ) : filter; 
				( extWidth ) ? $objects.width(instance.settings.menuWidth) : $objects.width( maxWidth );
				( extHeight ) ? $('#' + instance.settings.menuID).height(instance.settings.menuHeight) : $('#' + instance.settings.menuID).height( maxHeight );
				$container.width( maxExtWidth );
				$container.height( maxHeight );
				fixLazyBrowsers();
				instance.settings.menuWidth = maxWidth;
				instance.settings.menuHeight = maxHeight;
			}

			// Hide wrappers in browsers that
			// does not understand negative margin in %
			// before DOM element got its dimensions
			function fixLazyBrowsers() {
				var $baseLevelHolder = $('#' + instance.settings.menuID + ' div.levelHolderClass:first'),
				$hiddenLevelHolders = instance.settings.container
					.find( '#' + instance.settings.menuID + ' div.levelHolderClass' )
					.filter(function(){
						return ( ( $( this ).position().left < 0 || parseInt( $( this ).css( 'margin-left' ) ) < 0 ) && $( this ).attr( 'data-level' ) > $baseLevelHolder.attr( 'data-level' ) );
					});
				$hiddenLevelHolders.each(function(){
					$( this ).css( 'margin-left' , (( $( this ).attr( 'data-level' ) == 0 && !instance.settings.collapsed ) ? 0 : (-2)*$( this ).width()) );
				});
			}

			// Is integer
			function isInt( n ) {
				return typeof n === 'number' && parseFloat( n ) == parseInt( n, 10 ) && !isNaN( n );
			}

			// Is Valid CSS dimension
			function isValidDim( s ) {
				return typeof s === 'string' && ( s.indexOf( '%' ) != -1 || s.indexOf( 'px' ) != -1 || s.indexOf( 'em' ) != -1 );
			}

			// Initialize menu level push menu
			function initialize(){
				var execute = ( options.menu != undefined ) ? createDOMStructure() : updateDOMStructure();
				sizeDOMelements();
				startMode( instance.settings.collapsed );
				return $this;
			}

			// Initialize menu in collapsed/expanded mode 
			function startMode( mode ) {
				if( mode ) {
					$baseLevelHolder = $('#' + instance.settings.menuID + ' div.levelHolderClass:first');
					$baseLevelHolder.find( 'ul' ).hide();
					$baseLevelHolder.addClass( instance.settings.menuInactiveClass );
					$baseLevelHolder.stop().animate({
						marginLeft : (( -1 ) * $baseLevelHolder.width() + instance.settings.overlapWidth)
					});
				}
			}

			// Push container(s) of choice
			function pushContainers( absMove ) {
				if( instance.settings.containersToPush == null ) return false;
				$.each( instance.settings.containersToPush, function() {
					$( this ).stop().animate({
						marginLeft: $( this ).offset().left - $( this ).position().left + absMove
					});
				});
			}

			// Collapse menu
			function collapseMenu() {
				if( $(instance).find( 'div.levelHolderClass' ).is(':animated') ) return false;
				instance.settings.onCollapseMenuStart.apply(this, Array.prototype.slice.call([instance.settings]));
				var level = arguments[0],
					callbacks = arguments[1],
					collapingObjects = {},
					ieShadowFilterDistortion,lwidth, lpush,
					$baseLevelHolder = $('#' + instance.settings.menuID + ' div.levelHolderClass:first'),
					fullCollapse = ( level == undefined ) ? true : false;
				collapingObjects[ 'collapsingEnded' ] = false;
				if( typeof level == 'object' ) {
					level = level.attr( 'data-level' );
				}
				else if( typeof level == 'string' ){
					var $selectedLevelHolder = findMenusByTitle( level );
					if( $selectedLevelHolder && $selectedLevelHolder.length == 1 ) {
						level = $selectedLevelHolder.attr( 'data-level' );
					}
					else {
						level = $baseLevelHolder.attr( 'data-level' );
					}
				}
				else if( level == undefined || !isInt( level ) || level < 0 ) {
					level = $baseLevelHolder.attr( 'data-level' );
				}
				if( callbacks == undefined && typeof callbacks != 'object' ) {
					callbacks = [ { 'method' : instance.settings.onCollapseMenuEnd, 'args' : [instance.settings] } ];
				} else {
					$.merge(callbacks, [ { 'method' : instance.settings.onCollapseMenuEnd, 'args' : [instance.settings] } ]);
				}
				var $nextLevelHolders = instance.settings.container
					.find( '#' + instance.settings.menuID + ' div.levelHolderClass' )
					.filter(function(){
						return (($( this ).attr( 'data-level' ) > level) && (parseInt( $( this ).css( 'margin-left' ) ) >= 0 && $( this ).position().left >= 0 ) );
					}),
					$prevLevelHolders = instance.settings.container
					.find( '#' + instance.settings.menuID + ' div.levelHolderClass' )
					.filter(function(){
						return (($( this ).attr( 'data-level' ) <= level) && (parseInt( $( this ).css( 'margin-left' ) ) >= 0 && $( this ).position().left >= 0 ) );
					});
				if( $prevLevelHolders.length > 0 ) {
					collapingObjects[ 'prevAnimEnded' ] = false;
					$nextLevelHolders.each(function( key, val ){
						ieShadowFilterDistortion = ($( val ).css('filter').match(/DXImageTransform\.Microsoft\.Shadow/)) ? $( val ).get(0).filters.item("DXImageTransform.Microsoft.Shadow").strength : 0;
						lwidth = ( instance.settings.mode == 'overlap' ) ? $( val ).width() - ( $nextLevelHolders.length + $prevLevelHolders.length - $( val ).attr( 'data-level' ) - 1) * ( instance.settings.overlapWidth + ieShadowFilterDistortion ) - ieShadowFilterDistortion : $( val ).width() - ieShadowFilterDistortion
						$( val ).stop().animate({
							marginLeft : ((-1) * lwidth),
							width: lwidth
						});
					});
					collapingObjects[ 'nextAnimEnded' ] = ( $nextLevelHolders.length > 0 ) ? false : true ;
					$nextLevelHolders.last().queue(function(){
						collapingObjects[ 'nextAnimEnded' ] = true;
						animatedEventCallback( collapingObjects , callbacks );
					});
					$prevLevelHolders.each(function( key, val ){
						ieShadowFilterDistortion = ($( val ).css('filter').match(/DXImageTransform\.Microsoft\.Shadow/)) ? $( val ).get(0).filters.item("DXImageTransform.Microsoft.Shadow").strength : 0;
						var $makeLevelHolderVisible = $prevLevelHolders.filter(function(){
							return $( this ).attr( 'data-level' ) == level;
						});
						$makeLevelHolderVisible.css( 'visibility' , 'visible' );
						$makeLevelHolderVisible.find( '.' + instance.settings.backItemClass ).css( 'visibility' , 'visible' );
						$makeLevelHolderVisible.find( 'ul' ).css( 'visibility' , 'visible' );
						$makeLevelHolderVisible.removeClass( instance.settings.menuInactiveClass );
						lwidth = ( instance.settings.mode == 'overlap' ) ? $( val ).width() - $nextLevelHolders.length * ( instance.settings.overlapWidth + ieShadowFilterDistortion ) - ieShadowFilterDistortion : $( val ).width() - ieShadowFilterDistortion
						$( val ).stop().animate({
							width: lwidth,
							marginLeft : ( $( val ).attr( 'data-level' ) == $baseLevelHolder.attr( 'data-level' ) && fullCollapse ) ? (( -1 ) * $( val ).width() + ($nextLevelHolders.length + 1)*instance.settings.overlapWidth) : 0
						}, function(){
							if( $( val ).attr( 'data-level' ) == $baseLevelHolder.attr( 'data-level' ) && fullCollapse ){
								$baseLevelHolder.find( 'ul' ).hide(500, function(){
									$baseLevelHolder.addClass( instance.settings.menuInactiveClass );
								});
							}
						});
						lpush = ( instance.settings.mode == 'overlap' ) ? ( (-1) * ( $nextLevelHolders.length * ( instance.settings.overlapWidth + ieShadowFilterDistortion ) ) ) : 0 ;
						if( $( val ).attr( 'data-level' ) == $baseLevelHolder.attr( 'data-level' ) && fullCollapse ){
							pushContainers( ( -1 ) * ( $baseLevelHolder.width() - ieShadowFilterDistortion ) + instance.settings.overlapWidth );
						}
						else {
							pushContainers( lpush );
						}
					});
					$prevLevelHolders.last().queue(function(){
						collapingObjects[ 'prevAnimEnded' ] = true;
						animatedEventCallback( collapingObjects , callbacks );
					});
				}
				collapingObjects[ 'collapsingEnded' ] = true;
				animatedEventCallback( collapingObjects , callbacks );
				return $this;
			}

			// Expand Menu helper
			function expandMenuActions() {
				if( $(instance).find( 'div.levelHolderClass' ).is(':animated') ) return false;
				instance.settings.onExpandMenuStart.apply(this, Array.prototype.slice.call([instance.settings]));
				var menuTitle = arguments[0],
					callbacks = arguments[1],
					ieShadowFilterDistortion, lwidth, lpush,
					expandingObjects = {},
					$baseLevelHolder = $('#' + instance.settings.menuID + ' div.levelHolderClass:first'),
					baseLevelHolderCollapsed = parseInt( $baseLevelHolder.css( 'margin-left' ), 10 ) < 0 || $baseLevelHolder.position().left < 0,
					baseExpand = ( menuTitle == undefined ) ? true : false;
				expandingObjects[ 'expandingEnded' ] = false;
				if( callbacks == undefined && typeof callbacks != 'object' ) {
					callbacks = [ { 'method' : instance.settings.onExpandMenuEnd, 'args' : [instance.settings] } ];
				} else {
					$.merge(callbacks, [ { 'method' : instance.settings.onExpandMenuEnd, 'args' : [instance.settings] } ]);
				}
				if( baseExpand ) {
					expandingObjects[ 'baseAnimEnded' ] = false;
					$baseLevelHolder.removeClass( instance.settings.menuInactiveClass );
					$baseLevelHolder.stop().animate({
						marginLeft : 0
					},function(){
						$baseLevelHolder.find( 'ul' ).show(500).last().queue(function(){
							expandingObjects[ 'baseAnimEnded' ] = true;
							animatedEventCallback( expandingObjects , callbacks );
						});
					});
					var pushbm = ( !menuExpanded( $baseLevelHolder ) ) ? pushContainers( $baseLevelHolder.width() - instance.settings.overlapWidth ) : null;
				} else {
					if( typeof menuTitle == 'object' ) {
						$selectedLevelHolder = menuTitle;
					}
					else if( typeof menuTitle == 'string' ){
						$selectedLevelHolder = findMenusByTitle( menuTitle );
					}
					else {
						$selectedLevelHolder = null;
						$.error( 'Provided menu selector is not valid' );
					}
					if( $selectedLevelHolder && $selectedLevelHolder.length == 1 ) {
						var $activeLevelHolder = activeMenu(),
							activeLevel = ( $activeLevelHolder.length == 1 ) ? $activeLevelHolder.attr( 'data-level' ) : 0,
							baseWidth = $selectedLevelHolder.width();
						expandingObjects[ 'setToOpenAnimEnded' ] = false;
						if( setToOpenHolders = pathToRoot( $selectedLevelHolder ) ) {
							var parentLevelHoldersLen = $( setToOpenHolders ).length - 1;
							$baseLevelHolder.find( 'ul' ).show(0);
							$( setToOpenHolders ).find( 'ul' ).css( 'visibility' , 'hidden' );
							$( setToOpenHolders ).find( 'div' ).css( 'visibility' , 'visible' );
							$( setToOpenHolders ).find( '.' + instance.settings.backItemClass ).css( 'visibility' , 'hidden' );
							$( setToOpenHolders ).each( function( key, val ) {
								ieShadowFilterDistortion = ($( val ).css('filter').match(/DXImageTransform\.Microsoft\.Shadow/)) ? $( val ).get(0).filters.item("DXImageTransform.Microsoft.Shadow").strength : 0;
								lwidth = baseWidth - ieShadowFilterDistortion + ( parentLevelHoldersLen - $( val ).attr( 'data-level' ) ) * ( instance.settings.overlapWidth + ieShadowFilterDistortion );
								$( val ).stop().animate({
									marginLeft: 0,
									width: ( instance.settings.mode == 'overlap' ) ? lwidth : baseWidth - ieShadowFilterDistortion
								}, function(){
									$( val ).addClass( instance.settings.menuInactiveClass );
								});
							});
							$( setToOpenHolders ).last().queue(function(){
								$( this ).removeClass( instance.settings.menuInactiveClass );
								expandingObjects[ 'setToOpenAnimEnded' ] = true;
								animatedEventCallback( expandingObjects , callbacks );
							});
							if( baseLevelHolderCollapsed )
								pushContainers( $baseLevelHolder.width() - instance.settings.overlapWidth );
							if( instance.settings.mode == 'overlap' ){
								lpush = ( ( baseLevelHolderCollapsed ) ? ( baseWidth + ( parentLevelHoldersLen - 1 ) * ( instance.settings.overlapWidth + ieShadowFilterDistortion ) ) : ( ( parentLevelHoldersLen - activeLevel ) * ( instance.settings.overlapWidth + ieShadowFilterDistortion ) ) );
								pushContainers( lpush );
							}
							$selectedLevelHolder.css( 'visibility' , 'visible' );
							$selectedLevelHolder.find( '.' + instance.settings.backItemClass ).css( 'visibility' , 'visible' );
							$selectedLevelHolder.find( 'ul' ).css( 'visibility' , 'visible' );
							$selectedLevelHolder.removeClass( instance.settings.menuInactiveClass );
						}
						else {
							$.error( 'Invalid menu object provided' );
						}
					}
					else {
						$.error( 'No or too many menus named ' + menuTitle );
					}
				}
				expandingObjects[ 'expandingEnded' ] = true;
				animatedEventCallback( expandingObjects , callbacks );
			}

			// Expand menu
			function expandMenu() {
				var menu = arguments[0],
					$expandLevelHolder,
					$activeLevelHolder = activeMenu(),
					$sharedLevelHolders, collapseLevel, $searchRes;
				if( typeof menu == 'object' ) {
					$expandLevelHolder = menu;
				}
				else if( typeof menu == 'string' ){
					$searchRes = findMenusByTitle( menu );
					if($searchRes) {
						$expandLevelHolder = $searchRes.eq( 0 );
					}
					else {
						$.error( menu + ' menu level does not exist!' );
					}
				}
				else {
					$expandLevelHolder = $('#' + instance.settings.menuID + ' div.levelHolderClass:first');
				}
				$sharedLevelHolders = comparePaths( $expandLevelHolder , $activeLevelHolder, true );
				collapseLevel = ( $sharedLevelHolders.length > 0 ) ? Math.max.apply( null,
				        $sharedLevelHolders.map(function(){ return $(this).attr( 'data-level' ); }).get() ) : 0;
				if( collapseLevel < $activeLevelHolder.attr( 'data-level' ) ) {
					collapseMenu( collapseLevel , [ { 'method' : expandMenuActions, 'args' : arguments } ] );
				}
				else {
					expandMenuActions.apply( this, Array.prototype.slice.call( arguments ) );
				}
				return $this;
			}

			// Find menu(s) by Title text
			function findMenusByTitle() {
				var menuTitle = arguments[0],
					response,
					$selectedLevelHolders = instance.settings.container
					.find( '#' + instance.settings.menuID + ' div.levelHolderClass' )
					.filter(function(){
						return ( ($( this ).children( 'h2' ).text() == menuTitle ) );
					});
				if( $selectedLevelHolders.length > 0 ) {
					returnValue = $selectedLevelHolders;
					response = returnValue;
				}
				else {
					returnValue = false;
					response = returnValue;
				}
				return response;
			}

			// Find item(s) by Name
			function findItemsByName() {
				var itemName = arguments[0],
					response,
					$selectedItems = instance.settings.container
					.find( '#' + instance.settings.menuID + ' div.levelHolderClass li' )
					.filter(function(){
						return ( ($( this ).children( 'a' ).text() == itemName ) );
					});
				if( $selectedItems.length > 0 ) {
					returnValue = $selectedItems;
					response = returnValue;
				}
				else {
					returnValue = false;
					response = returnValue;
				}
				return response;
			}

			// Find pathToRoot for provided menu
			function pathToRoot() {
				var $selectedLevelHolder = arguments[0],
					$parentLevelHolders, setToOpenHolders, response;
				if( $selectedLevelHolder == undefined || $selectedLevelHolder.length != 1 ) {
					returnValue = false;
					return returnValue;
				};
				$parentLevelHolders = $selectedLevelHolder.parents( 'div.levelHolderClass' );
				setToOpenHolders = $.merge( $parentLevelHolders.get().reverse(), $selectedLevelHolder.get() );
				returnValue = setToOpenHolders;
				return returnValue;
			}

			// Finds the same part of the path to root of two provided menus 
			function comparePaths() {
				var $levelHolder0 = arguments[0],
					$levelHolder1 = arguments[1],
					mode = ( arguments[2] != undefined ) ? arguments[2] : false,
					$parentLevelHolders0, $parentLevelHolders1, setParents0, setParents1, lPath, sPath, comparePath, response;
				if( $levelHolder0 == undefined || $levelHolder1 == undefined ) {
					returnValue = false;
					return returnValue;
				};
				$parentLevelHolders0 = ( $levelHolder0.length == 1 ) ? $levelHolder0.parents( 'div.levelHolderClass' ) : null;
				$parentLevelHolders1 = ( $levelHolder1.length == 1 ) ? $levelHolder1.parents( 'div.levelHolderClass' ) : null;
				setParents0 = ( $parentLevelHolders0 != null ) ? $.merge( $parentLevelHolders0.get().reverse(), $levelHolder0.get() ) : [];
				setParents1 = ( $parentLevelHolders1 != null ) ? $.merge( $parentLevelHolders1.get().reverse(), $levelHolder1.get() ) : [];
				lPath = ( setParents0.length >= setParents1.length  ) ? setParents0 : setParents1;
				sPath = ( lPath === setParents0  ) ? setParents1 : setParents0;
				comparePath = $( lPath ).filter(function() {
					return ( mode ) ? ( $.inArray( this, sPath ) != -1 ) : ( $.inArray( this, sPath ) == -1 );
				});
				returnValue = comparePath;
				return returnValue;
			}

			// Active menu
			function activeMenu() {
				var $activeLevelHolders = instance.settings.container
					.find( '#' + instance.settings.menuID + ' div.levelHolderClass' )
					.filter(function(){
						return ((parseInt( $( this ).css( 'margin-left' ) ) >= 0 && $( this ).position().left >= 0 ) );
					}),
					maxLevel = Math.max.apply( null,
				        $activeLevelHolders.map(function(){ return $(this).attr( 'data-level' ); }).get() );
				$activeLevelHolder = $activeLevelHolders.filter(function(){
					return $( this ).attr( 'data-level' ) == maxLevel;
				});
				returnValue = $activeLevelHolder;
				return returnValue;
			}

			// Menu expanded
			function menuExpanded() {
				var $levelHolder = arguments[0],
					returnValue = false;
				if( $levelHolder == undefined ) return returnValue;
				if( parseInt( $levelHolder.css( 'margin-left' ) ) >= 0 && $levelHolder.position().left >= 0 ) {
					returnValue = true;
				}
				return returnValue;
			}

			// Add item(s)
			function addItems() {
				var items = arguments[0],
					$levelHolder = arguments[1],
					position = arguments[2];
				if( $levelHolder == undefined || typeof items != 'object' ) return false;
				if( items.level == undefined ) items.level = parseInt( $levelHolder.attr( 'data-level' ) , 10 );
				if( position == undefined ) position = 0;
				var $itemGroup = $levelHolder.find( 'ul:first' );
				$.each(items, function() {
					if( this.name != undefined )
						createItem( this, $levelHolder, position );
				});
				sizeDOMelements( instance.settings.menuWidth , undefined , $levelHolder.find( 'div.levelHolderClass' ) );
				return $this;
			}

			// Remove item(s)
			function removeItems() {
				var $items = arguments[0];
				if( $items == undefined || typeof $items != 'object' || $items.length == 0 ) return false;
				$items.remove();
				var $activeMenu = activeMenu();
				if( $activeMenu.length == 1 ) {
					$activeMenu.css( 'visibility' , 'visible' );
					$activeMenu.find( '.' + instance.settings.backItemClass ).css( 'visibility' , 'visible' );
					$activeMenu.find( 'ul' ).css( 'visibility' , 'visible' );
					$activeMenu.removeClass( instance.settings.menuInactiveClass );
					var widthDiff = $activeMenu.width() - instance.settings.menuWidth;
					if( widthDiff != 0 ) {
						var $visibleLevelHolders = instance.settings.container
							.find( '#' + instance.settings.menuID + ' div.levelHolderClass' )
							.filter(function(){
								return ( $( this ).position().left >= 0 && parseInt( $( this ).css( 'margin-left' ) ) >= 0 );
							});
						$visibleLevelHolders.each(function(){
							$( this ).width( $( this ).width() - widthDiff );
						});
					}
				}
				return $this;
			}

			// Manage multiple animated events and associated callbacks
			function animatedEventCallback( animatedObjects, callbacks ) {
				var doCallBack = true;
				$.each( animatedObjects, function( key, val ){
					doCallBack = doCallBack && val;
				});
				if( doCallBack )
					window.setTimeout(function(){
						$.each( callbacks, function( key, val ){
							val['method'].apply( this, Array.prototype.slice.call( val['args'] ) );
						});
					}, 1);
			}

			// Get/set settings options
			function manageOptions() {
				var response = false;
				if( instance.settings[arguments[0]] != undefined ) {
					if( arguments[1] != undefined )
						instance.settings[arguments[0]] = arguments[1];
					response = instance.settings[arguments[0]];
				} else {
					$.error('No option ' + arguments[0] + ' found in jQuery.multilevelpushmenu');
				}
				return response;
			}
			
			// Mobile check
			// http://coveroverflow.com/a/11381730/989439
			function mobileCheck() {
				var check = false;
				(function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
				return check;
			}

			// Invoke called method or init
			if ( methods[options] ) {
				returnValue = methods[options].apply(this, Array.prototype.slice.call(args, 1));
				return returnValue;
			} else if (typeof options === 'object' || !options) {
				returnValue = methods.init.apply(this, arguments);
				return returnValue;
			} else {
				$.error('No ' + options + ' method found in jQuery.multilevelpushmenu');
			}

			// Return object instance or option value
			if (!returnValue) {
				returnValue = this;
			}
		});
		return returnValue;
	}
}( jQuery ));