YUI.add('node-menunav', function(Y) {

/**
* <p>The MenuNav Node Plugin makes it easy to transform existing list-based markup into traditional, 
* drop down navigational menus that are both accessible and easy to customize, and only require 
* a small set of dependencies.</p>
* <p>To use the MenuNav Node Plugin, simply pass a reference to the plugin to a Node instance's 
* <code>plug</code> method.</p>
* 
* <p>
* <code>
* &#60;script type="text/javascript"&#62;<br>
* <br>
* 		//	Call the "use" method, passing in "node-menunav".  This will load the <br>
* 		//	script and CSS for the MenuNav Node Plugin and all of the required <br>
* 		//	dependencies.<br>
* <br>
* 		YUI().use("node-menunav", function(Y) {<br>
* <br>
* 			//	Use the "contentready" event to initialize the menu when the subtree of <br>
* 			//	element representing the root menu (&#60;div id="menu-1"&#62;) is ready to <br>
* 			//	be scripted.<br>
* <br>
* 			Y.on("contentready", function () {<br>
* <br>
* 				//	The scope of the callback will be a Node instance representing <br>
* 				//	the root menu (&#60;div id="menu-1"&#62;).  Therefore, since "this"<br>
* 				//	represents a Node instance, it is possible to just call "this.plug"<br>
* 				//	passing in a reference to the MenuNav Node Plugin.<br>
* <br>
* 				this.plug(Y.plugin.NodeMenuNav);<br>
* <br>
* 			}, "#menu-1");<br>
* <br>		
* 		}); <br>
* <br>	
* 	&#60;/script&#62;<br>
* </code>
* </p>
*
* <p>The MenuNav Node Plugin has several configuration properties that can be set via an 
* object literal that is passed as a second argument to a Node instance's <code>plug</code> method.
* </p>
*
* <p>
* <code>
* &#60;script type="text/javascript"&#62;<br>
* <br>
* 		//	Call the "use" method, passing in "node-menunav".  This will load the <br>
* 		//	script and CSS for the MenuNav Node Plugin and all of the required <br>
* 		//	dependencies.<br>
* <br>
* 		YUI().use("node-menunav", function(Y) {<br>
* <br>
* 			//	Use the "contentready" event to initialize the menu when the subtree of <br>
* 			//	element representing the root menu (&#60;div id="menu-1"&#62;) is ready to <br>
* 			//	be scripted.<br>
* <br>
* 			Y.on("contentready", function () {<br>
* <br>
* 				//	The scope of the callback will be a Node instance representing <br>
* 				//	the root menu (&#60;div id="menu-1"&#62;).  Therefore, since "this"<br>
* 				//	represents a Node instance, it is possible to just call "this.plug"<br>
* 				//	passing in a reference to the MenuNav Node Plugin.<br>
* <br>
* 				this.plug(Y.plugin.NodeMenuNav, { mouseOutHideDelay: 1000 });<br>
* <br>
* 			}, "#menu-1");<br>
* <br>		
* 		}); <br>
* <br>	
* 	&#60;/script&#62;<br>
* </code>
* </p>
* 
* <p> The complete list of the MenuNav Node Plugin configuration properties are:</p>
* <dl>
* 	<dt>useARIA</dt>
* 		<dd>Boolean indicating if use of the WAI-ARIA Roles and States should be enabled for the 
* 		MenuNav.  Set to true by default for Firefox 3 and Internet Explorer 8 as currently only 
* 		these browsers have support for ARIA, and are supported by several screen readers for 
* 		Windows that also offer support for ARIA.</dd>
* 
* 	<dt>autoSubmenuDisplay</dt>
* 		<dd>Boolean indicating if submenus are automatically made visible when the user mouses over 
* 		the menu's items.  Set to true by default.</dd>
* 
* 	<dt>submenuShowDelay</dt>
* 		<dd>Number indicating the time (in milliseconds) that should expire before a submenu is 
* 		made visible when the user mouses over the menu's label.  Set to 250 by default.</dd>
* 
* 	<dt>submenuHideDelay</dt>
* 		<dd>Number indicating the time (in milliseconds) that should expire before a submenu is 
* 		hidden when the user mouses out of a menu label heading in the direction of a submenu.  
* 		Set to 250 by default.</dd>
* 
* 	<dt>mouseOutHideDelay</dt>
* 		<dd>Number indicating the time (in milliseconds) that should expire before a submenu is 
* 		hidden when the user mouses out of it.  Set to 750 by default.</dd>
* </dl>
* 
* @module node-menunav
*/

	//	Util shortcuts

var UA = Y.UA,
	Lang = Y.Lang,
	later = Y.later,
	getClassName = Y.ClassNameManager.getClassName,



	//	Frequently used strings

	MENU = "menu",
	MENUITEM = "menuitem",
	HIDDEN = "hidden",
	TAB_INDEX = "tabIndex",		
	PARENT_NODE = "parentNode",
	CHILDREN = "children",
	OFFSET_HEIGHT = "offsetHeight",
	OFFSET_WIDTH = "offsetWidth",
	PX = "px",
	ID = "id",
	PERIOD = ".",
	HANDLED_MOUSEOUT = "handledMouseOut",
	HANDLED_MOUSEOVER = "handledMouseOver",
	ACTIVE = "active",
	LABEL = "label",
	LOWERCASE_A = "a",
	MOUSEDOWN = "mousedown",
	KEYDOWN = "keydown",
	CLICK = "click",
	EMPTY_STRING = "",
	FIRST_OF_TYPE = "first-of-type",


	//	CSS class names

	CSS_MENU = getClassName(MENU),
	CSS_MENU_HIDDEN = getClassName(MENU, HIDDEN),
	CSS_MENU_HORIZONTAL = getClassName(MENU, "horizontal"),
	CSS_MENU_LABEL = getClassName(MENU, LABEL),
	CSS_MENU_LABEL_ACTIVE = getClassName(MENU, LABEL, ACTIVE),
	CSS_MENU_LABEL_MENUVISIBLE = getClassName(MENU, LABEL, (MENU + "visible")),
	CSS_MENUITEM = getClassName(MENUITEM),
	CSS_MENUITEM_ACTIVE = getClassName(MENUITEM, ACTIVE),


	//	CSS selectors
	
	MENU_SELECTOR = PERIOD + CSS_MENU;


//	Utility functions


//	TO DO: Remove once Node implements circular functionality
var getPreviousSibling = function (node) {

	var oPrevious = node.previous(),
		oParentNode,
		oChildren,
		oULs,
		oUL;
	

	if (!oPrevious) {
	
		oParentNode = node.get(PARENT_NODE);
		oULs = oParentNode.get(PARENT_NODE).get(CHILDREN);

		if (oULs.size() > 1) {
			
			oUL = oParentNode.previous();
			
			if (oUL) {
				oChildren = oUL.get(CHILDREN);
			}
			else {
				oChildren = oULs.item(oULs.size() - 1).get(CHILDREN);
			}
			
		}
		else {
			oChildren = oParentNode.get(CHILDREN);
		}

		oPrevious = oChildren.item(oChildren.size() - 1);
		
	}
	
	return oPrevious;

};


//	TO DO: Remove once Node implements circular functionality
var getNextSibling = function (node) {

	var oNext = node.next(),
		oParentNode,
		oChildren,
		oULs,
		oUL;
	

	if (!oNext) {

		oParentNode = node.get(PARENT_NODE);
		oULs = oParentNode.get(PARENT_NODE).get(CHILDREN);

		if (oULs.size() > 1) {
			
			oUL = oParentNode.next();
			
			if (oUL) {
				oChildren = oUL.get(CHILDREN);
			}
			else {
				oChildren = oULs.item(0).get(CHILDREN);
			}
			
		}		
		else {
			oChildren = node.get(PARENT_NODE).get(CHILDREN);
		}

		oNext = oChildren.item(0);		

	}
	
	return oNext;

};


var setARIARole = function (node, role) {

	node.setAttribute("role", role);

};


var setARIAProperty = function (node, property, value) {

	node.setAttribute(("aria-" + property), value);

};


var setARIAPresentation = function (node) {

	setARIARole(node, "presentation");

};


var removeFromTabIndex = function (node) {

	node.set(TAB_INDEX, -1);

};


var placeInDefaultTabIndex = function (node) {

	node.set(TAB_INDEX, 0);

};


var isAnchor = function (node) {
	
	var bReturnVal = false;
	
	if (node) {
		bReturnVal = node.get("nodeName").toLowerCase() === LOWERCASE_A;
	}
	
	return bReturnVal;
	
};


var isMenuItem = function (node) {

	return node.hasClass(CSS_MENUITEM);

};


var isMenuLabel = function (node) {

	return node.hasClass(CSS_MENU_LABEL);

};


var isHorizontalMenu = function (menu) {

	return menu.hasClass(CSS_MENU_HORIZONTAL);

};


var hasVisibleSubmenu = function (menuLabel) {

	return menuLabel.hasClass(CSS_MENU_LABEL_MENUVISIBLE);

};


var getItemAnchor = function (node) {

	return isAnchor(node) ? node : node.query(LOWERCASE_A);

};


var getNodeWithClass = function (node, className, searchAncestors) {

	var oItem;
	
	if (node) {
		
		if (node.hasClass(className)) {
			oItem = node;
		}
		
		if (!oItem && searchAncestors) {
			oItem = node.ancestor((PERIOD + className));
		}
	
	}
	
	return oItem;

};


var getParentMenu = function (node) {

	return node.ancestor(MENU_SELECTOR);
	
};


var getMenu = function (node, searchAncestors) {

	return getNodeWithClass(node, CSS_MENU, searchAncestors);

};


var getMenuItem = function (node, searchAncestors) {

	var oItem;
	
	if (node) {
		oItem = getNodeWithClass(node, CSS_MENUITEM, searchAncestors);
	}
	
	return oItem;

};


var getMenuLabel = function (node, searchAncestors) {

	var oItem;
	
	if (node) {
	
		if (searchAncestors) {
			oItem = getNodeWithClass(node, CSS_MENU_LABEL, searchAncestors);
		}
		else {
			oItem = getNodeWithClass(node, CSS_MENU_LABEL) || node.query((PERIOD + CSS_MENU_LABEL));
		}
		
	}
	
	return oItem;

};


var getItem = function (node, searchAncestors) {

	var oItem;
	
	if (node) {
		oItem = getMenuItem(node, searchAncestors) || getMenuLabel(node, searchAncestors);
	}
	
	return oItem;	

};


var getNextItem = function (item, previous) {

	var oItemLI,
		oNextLI,
		oNextItem;
	

	if (item) {

		oItemLI = isMenuItem(item) ? item : item.get(PARENT_NODE);

		oNextLI = previous ? getPreviousSibling(oItemLI) : getNextSibling(oItemLI);

		oNextItem = getItem(oNextLI);
	
	}
	
	return oNextItem;
	
};


var getPreviousItem = function (item) {

	return getNextItem(item, true);

};


var getFirstItem = function (menu) {
	
	return getItem(menu.query("li"));

};


var getActiveClass = function (node) {

	return isMenuItem(node) ? CSS_MENUITEM_ACTIVE : CSS_MENU_LABEL_ACTIVE;

};


var blurItem = function (item) {

	var oAnchor;

	if (item) {

		oAnchor = getItemAnchor(item);

		//	TO DO:  Remove once implemented in Node
		try {
			oAnchor.blur();
		}
		catch (ex) { }

	}

};
	

var focusItem = function (item) {

	var oAnchor;

	if (item) {

		oAnchor = getItemAnchor(item);
	
		//	TO DO:  Remove once implemented in Node
		try {
			oAnchor.focus();
		}
		catch (ex) { }
	
	}

};


var handleMouseOverForNode = function (node, target) {

	return node && !node[HANDLED_MOUSEOVER] && (node === target || node.contains(target));

};


var handleMouseOutForNode = function (node, relatedTarget) {

	return node && !node[HANDLED_MOUSEOUT] && 
		(node !== relatedTarget && !node.contains(relatedTarget));

};


/**
* The NodeMenuNav class is a plugin for a Node instance.  The class is used via the 
* <a href="Node.html#method_plug"><code>plug</code></a> method of Node and should not be 
* instantiated directly.
* @namespace plugin
* @class NodeMenuNav
*/
var MenuNav = function (config) {

	var menuNav = this,
		oRootMenu = config.owner,
		oDocument,
		bUseARIA,
		bAutoSubmenuDisplay,
		nMouseOutHideDelay,
		oMenuNodes,
		oFirstItem,
		oULs;
		

	if (oRootMenu) {

		bUseARIA = config.useARIA;
		bAutoSubmenuDisplay = config.autoSubmenuDisplay;
		nMouseOutHideDelay = config.mouseOutHideDelay;
		

		//	Enable ARIA for Firefox 3 and IE 8 by default since those are the two browsers 
		//	that current support ARIA

		menuNav._useARIA = Lang.isBoolean(bUseARIA) ? 
						bUseARIA : ((UA.gecko && UA.gecko >= 1.9) || (UA.ie && UA.ie >= 8));


		menuNav._autoSubmenuDisplay = 
					Lang.isBoolean(bAutoSubmenuDisplay) ? bAutoSubmenuDisplay : true;

		menuNav._submenuShowDelay = config.submenuShowDelay || 250;
		menuNav._submenuHideDelay = config.submenuHideDelay || 250;

		menuNav._mouseOutHideDelay = Lang.isNumber(nMouseOutHideDelay) ? nMouseOutHideDelay : 750;


		//	Hide all visible submenus

		oMenuNodes = oRootMenu.queryAll(MENU_SELECTOR);

		if (oMenuNodes) {
			oMenuNodes.addClass(CSS_MENU_HIDDEN);
		}


		oULs = oRootMenu.queryAll("ul:" + FIRST_OF_TYPE);

		if (oULs) {
			oULs.addClass(FIRST_OF_TYPE);
		}


		//	Wire up all event handlers


		oRootMenu.on("mouseover", menuNav._onMouseOver, menuNav);
		oRootMenu.on("mouseout", menuNav._onMouseOut, menuNav);
		oRootMenu.on("mousemove", menuNav._onMouseMove, menuNav);
		oRootMenu.on(MOUSEDOWN, menuNav._toggleSubmenuDisplay, menuNav);
		oRootMenu.on(KEYDOWN, menuNav._toggleSubmenuDisplay, menuNav);
		oRootMenu.on(CLICK, menuNav._toggleSubmenuDisplay, menuNav);
		oRootMenu.on("keypress", menuNav._onKeyPress, menuNav);
		oRootMenu.on(KEYDOWN, menuNav._onKeyDown, menuNav);

		oDocument = oRootMenu.get("ownerDocument");

		oDocument.on(MOUSEDOWN, menuNav._onDocMouseDown, menuNav);

		Y.on("focus", Y.bind(menuNav._onDocFocus, menuNav), oDocument);

		menuNav._rootMenu = oRootMenu;


		if (menuNav._useARIA) {

			menuNav._applyARIA(oRootMenu);

			oFirstItem = getFirstItem(oRootMenu);
	
			if (oFirstItem) {
	
				placeInDefaultTabIndex(getItemAnchor(oFirstItem));
	
				menuNav._firstItem = oFirstItem;
	
			}		
		
		}

	}

};


MenuNav.NS = "MenuNav";


/** 
* @property NodeMenuNav.SHIM_TEMPLATE_TITLE
* @description String representing the value for the <code>title</code> attribute for the shim used
* to prevent <code>&#60;select&#62;</code> elements from poking through menus in IE 6.
* @default "Menu Stacking Shim"
* @type String
*/
MenuNav.SHIM_TEMPLATE_TITLE = "Menu Stacking Shim";


/** 
* @property NodeMenuNav.SHIM_TEMPLATE
* @description String representing the HTML used to create the <code>&#60;iframe&#62;</code> shim 
* used to prevent <code>&#60;select&#62;</code> elements from poking through menus in IE 6.
* @default &#34;&#60;iframe frameborder=&#34;0&#34; tabindex=&#34;-1&#34; 
* class=&#34;yui-shim&#34; title=&#34;Menu Stacking Shim&#34; 
* src=&#34;javascript:false;&#34;&#62;&#60;/iframe&#62;&#34;
* @type String
*/

//	<iframe> shim notes:
//
//	1) Need to set the "frameBorder" property to 0 to suppress the default <iframe> border in IE.  
//	(Setting the CSS "border" property alone doesn't suppress it.)  
//
//	2) The "src" attribute of the <iframe> is set to "javascript:false;" so that it won't load a 
//	page inside it, preventing the secure/nonsecure warning in IE when using HTTPS.
//
//	3) Since the role of the <iframe> shim is completely presentational, its "tabindex" attribute
//	is set to "-1" and its title attribute is set to "Menu Stacking Shim".  Both strategies help
//	users of screen readers to avoid mistakenly interacting with the <iframe> shim.

MenuNav.SHIM_TEMPLATE	=	'<iframe frameborder="0" tabindex="-1" class="' + 
							getClassName("shim") + 
							'" title="' + MenuNav.SHIM_TEMPLATE_TITLE + 
							'" src="javascript:false;"></iframe>';


MenuNav.prototype = {

	//	Protected properties

	/** 
	* @property _rootMenu
	* @description Node instance representing the root menu in the MenuNav.
	* @default null
	* @protected
	* @type Node
	*/
	_rootMenu: null,	


	/** 
	* @property _activeItem
	* @description Node instance representing the MenuNav's active descendent - the menuitem or 
	* menu label the user is currently interacting with.
	* @default null
	* @protected
	* @type Node
	*/
	_activeItem: null, 


	/** 
	* @property _activeMenu
	* @description Node instance representing the menu that is the parent of the MenuNav's 
	* active descendent.
	* @default null
	* @protected
	* @type Node
	*/
	_activeMenu: null,


	/** 
	* @property _hasFocus
	* @description Boolean indicating if the MenuNav has focus.
	* @default false
	* @protected
	* @type Boolean
	*/
	_hasFocus: false,


	//	In gecko-based browsers a mouseover and mouseout event will fire even 
	//	if a DOM element moves out from under the mouse without the user actually
	//	moving the mouse.  This bug affects MenuNav because the user can hit the 
	//	Esc key to hide a menu, and if the mouse is over the menu when the 
	//	user presses Esc, the _onMenuMouseOut handler will be called.  To fix this 
	//	bug the following flag (_blockMouseEvent) is used to block the code in the 
	//	_onMenuMouseOut handler from executing.

	/** 
	* @property _blockMouseEvent
	* @description Boolean indicating whether or not to handle the "mouseover" event.
	* @default false
	* @protected
	* @type Boolean
	*/
	_blockMouseEvent: false,


	/** 
	* @property _currentMouseX
	* @description Number representing the current x coordinate of the mouse inside the MenuNav.
	* @default 0
	* @protected
	* @type Number
	*/
	_currentMouseX: 0,


	/** 
	* @property _movingToSubmenu
	* @description Boolean indicating if the mouse is moving from a menu label to its 
	* corresponding submenu.
	* @default false
	* @protected
	* @type Boolean
	*/
	_movingToSubmenu: false,


	/** 
	* @property _showSubmenuTimer
	* @description Timer used to show a submenu.
	* @default null
	* @protected
	* @type Object
	*/
	_showSubmenuTimer: null,


	/** 
	* @property _hideSubmenuTimer
	* @description Timer used to hide a submenu.
	* @default null
	* @protected
	* @type Object
	*/
	_hideSubmenuTimer: null,


	/** 
	* @property _hideAllSubmenusTimer
	* @description Timer used to hide a all submenus.
	* @default null
	* @protected
	* @type Object
	*/
	_hideAllSubmenusTimer: null,


	/** 
	* @property _firstItem
	* @description Node instance representing the first item (menuitem or menu label) in the root 
	* menu of a MenuNav.
	* @default null
	* @protected
	* @type Node
	*/
	_firstItem: null,


	/** 
	* @property _autoSubmenuDisplay
    * @description Boolean indicating if submenus are automatically made visible when the user 
    * mouses over the menu's items.
    * @default true
	* @protected
    * @type Boolean
	*/
	_autoSubmenuDisplay: true,



	//	Protected methods

	/**
	* @method _isRoot
	* @description Returns a boolean indicating if the specified menu is the root menu in 
	* the MenuNav.
	* @protected
	* @param {Node} menu Node instance representing a menu.
	* @return {Boolean} Boolean indicating if the specified menu is the root menu in the MenuNav.	
	*/
	_isRoot: function (menu) {

		return this._rootMenu.compareTo(menu);

	},


	/**
	* @method _getTopmostSubmenu
	* @description Returns the topmost submenu of a submenu hierarchy.
	* @protected
	* @param {Node} menu Node instance representing a menu.
	* @return {Node} Node instance representing a menu.
	*/
	_getTopmostSubmenu: function (menu) {
	
		var menuNav = this,
			oMenu = getParentMenu(menu),
			returnVal;


		if (!oMenu) {
			returnVal = menu;
		}
		else if (menuNav._isRoot(oMenu)) {
			returnVal = menu;
		}
		else {
			returnVal = menuNav._getTopmostSubmenu(oMenu);
		}
	
		return returnVal;
	
	},


	/**
	* @method _clearActiveItem
	* @description Clears the MenuNav's active descendent.
	* @protected
	*/
	_clearActiveItem: function () {

		var menuNav = this,
			oActiveItem = menuNav._activeItem;
		
		if (oActiveItem) {

			oActiveItem.removeClass(getActiveClass(oActiveItem));

			if (menuNav._useARIA) {
				removeFromTabIndex(getItemAnchor(oActiveItem));
			}

		}

		menuNav._activeItem = null;
	
	},


	/**
	* @method _setActiveItem
	* @description Sets the specified menuitem or menu label as the MenuNav's active descendent.
	* @protected
	* @param {Node} item Node instance representing a menuitem or menu label.
	*/
	_setActiveItem: function (item) {

		var menuNav = this;
	
		if (item) {
			
			menuNav._clearActiveItem();
	
			item.addClass(getActiveClass(item));
	
			if (menuNav._useARIA) {
				placeInDefaultTabIndex(getItemAnchor(item));
			}
			
			menuNav._activeItem = item;
		
		}
	
	},


	/**
	* @method _focusItem
	* @description Focuses the specified menuitem or menu label.
	* @protected
	* @param {Node} item Node instance representing a menuitem or menu label.
	*/
	_focusItem: function (item) {
	
		if (item && this._hasFocus) {
		
			//	Need to focus using a zero-second timeout to get Apple's VoiceOver to 
			//	recognize that the focused item has changed

			later(0, null, focusItem, item);

		}
	
	},


	/**
	* @method _applyARIA
	* @description Applies the ARIA Roles, States and Properties to the supplied menu.
	* @protected
	* @param {Node} menu Node instance representing a menu.
	*/
	_applyARIA: function (menu) {

		var menuNav = this,
			bIsRoot = menuNav._isRoot(menu),
			oMenuLabel,
			oMenuToggle,
			oListNodes,
			oMenuItemContentNodes,
			oMenuLabelNodes,
			oSubmenu,
			sID;


		setARIARole(menu, (bIsRoot && isHorizontalMenu(menu) ? "menubar" : MENU));

		if (!bIsRoot) {

			oMenuLabel = menu.previous();
			oMenuToggle = oMenuLabel.query(PERIOD + getClassName(MENU, "toggle"));
			
			if (oMenuToggle) {
				oMenuLabel = oMenuToggle;
			}
			
			sID = oMenuLabel.get(ID);
			
			if (!sID) {
				sID = Y.guid();
				oMenuLabel.set(ID, sID);
			}

			setARIAProperty(menu, "labelledby", sID);
			setARIAProperty(menu, HIDDEN, true);
		
		}


		oListNodes = menu.queryAll("ul,li");
		
		if (oListNodes) {

			oListNodes.each(function (node) {
			
				setARIAPresentation(node);
			
			});

		}
		

		oMenuItemContentNodes = menu.queryAll((PERIOD + getClassName(MENUITEM, "content")));

		if (oMenuItemContentNodes) {

			oMenuItemContentNodes.each(function (node) {

				removeFromTabIndex(node);
				setARIARole(node, MENUITEM);

			});

		}
		

		oMenuLabelNodes = menu.queryAll((PERIOD + CSS_MENU_LABEL));

		if (oMenuLabelNodes) {

			oMenuLabelNodes.each(function (node) {

				oMenuLabel = node;
				oMenuToggle = node.query((PERIOD + getClassName(MENU, "toggle")));
				
				if (oMenuToggle) {

					setARIAPresentation(oMenuToggle);
					removeFromTabIndex(oMenuToggle);
					
					oMenuLabel = oMenuToggle.previous();
				
				}

				setARIARole(oMenuLabel, MENUITEM);
				setARIAProperty(oMenuLabel, "haspopup", true);
				removeFromTabIndex(oMenuLabel);
				
				oSubmenu = node.next();
				
				if (oSubmenu) {
					menuNav._applyARIA(oSubmenu);
				}
				
			});
		
		}
	
	},


	/**
	* @method _showMenu
	* @description Shows the specified menu.
	* @protected
	* @param {Node} menu Node instance representing a menu.
	*/
	_showMenu: function (menu) {

		var menuNav = this,
			oParentMenu = getParentMenu(menu),
			oLI = menu.get(PARENT_NODE),
			aXY = oLI.getXY(),
			oItem;

		if (menuNav._useARIA) {
			setARIAProperty(menu, HIDDEN, false);
		}

		if (isHorizontalMenu(oParentMenu)) {
			aXY[1] = aXY[1] + oLI.get(OFFSET_HEIGHT);
		}
		else {
			aXY[0] = aXY[0] + oLI.get(OFFSET_WIDTH);
		}
		
		menu.setXY(aXY);

		if (UA.ie < 8) {

			if (UA.ie === 6 && !menu.hasIFrameShim) {
	
				menu.appendChild(Y.Node.create(MenuNav.SHIM_TEMPLATE));
				menu.hasIFrameShim = true;

			}

			//	Clear previous values for height and width

			menu.setStyles({ height: EMPTY_STRING, width: EMPTY_STRING });

			//	Set the width and height of the menu's bounding box - this is necessary for IE 6
			//	so that the CSS for the <iframe> shim can simply set the <iframe>'s width and height 
			//	to 100% to ensure that dimensions of an <iframe> shim are always sync'd to the 
			//	that of its parent menu.  Specifying a width and height also helps when positioning
			//	decorator elements (for creating effects like rounded corners) inside a menu's 
			//	bounding box in IE 7.
			
			menu.setStyles({ 
				height: (menu.get(OFFSET_HEIGHT) + PX), 
				width: (menu.get(OFFSET_WIDTH) + PX) });

		}

		menu.previous().addClass(CSS_MENU_LABEL_MENUVISIBLE);
		menu.removeClass(CSS_MENU_HIDDEN);

		oItem = getFirstItem(menu);

		menuNav._focusItem(oItem);

	},
	

	/**
	* @method _hideMenu 
	* @description Hides the specified menu.
	* @protected
	* @param {Node} menu Node instance representing a menu.
	* @param {Boolean} activateAndFocusLabel Boolean indicating if the label for the specified 
	* menu should be focused and set as active.
	*/
	_hideMenu: function (menu, activateAndFocusLabel) {

		var menuNav = this,
			oLabel = menu.previous(),
			oActiveItem;

		oLabel.removeClass(CSS_MENU_LABEL_MENUVISIBLE);


		if (activateAndFocusLabel) {
			menuNav._setActiveItem(oLabel);
			menuNav._focusItem(oLabel);
		}

		oActiveItem = menu.query((PERIOD + CSS_MENUITEM_ACTIVE));

		if (oActiveItem) {
			oActiveItem.removeClass(CSS_MENUITEM_ACTIVE);
		}

		//	Clear the values for top and left that were set by the call to "setXY" when the menu
		//	was shown so that the hidden position specified in the core CSS file will take affect.

		menu.setStyles({ left: EMPTY_STRING, top: EMPTY_STRING });
		
		menu.addClass(CSS_MENU_HIDDEN);
		setARIAProperty(menu, HIDDEN, true);
		
	},


	/**
	* @method _hideAllSubmenus
	* @description Hides all submenus of the specified menu.
	* @protected
	* @param {Node} menu Node instance representing a menu.
	*/
	_hideAllSubmenus: function (menu) {

		var menuNav = this,
			oSubmenus = menu.queryAll(MENU_SELECTOR);

		if (oSubmenus) {

			oSubmenus.each(Y.bind(function (submenuNode) {
			
				menuNav._hideMenu(submenuNode);
			
			}, menuNav));
		
		}
	
	},


	/**
	* @method _cancelShowSubmenuTimer
	* @description Cancels the timer used to show a submenu.
	* @protected
	*/
	_cancelShowSubmenuTimer: function () {

		var menuNav = this,
			oShowSubmenuTimer = menuNav._showSubmenuTimer;

		if (oShowSubmenuTimer) {
			oShowSubmenuTimer.cancel();
			menuNav._showSubmenuTimer = null;
		}
	
	},


	/**
	* @method _cancelHideSubmenuTimer
	* @description Cancels the timer used to hide a submenu.
	* @protected
	*/
	_cancelHideSubmenuTimer: function () {

		var menuNav = this,
			oHideSubmenuTimer = menuNav._hideSubmenuTimer;


		if (oHideSubmenuTimer) {
			oHideSubmenuTimer.cancel();
			menuNav._hideSubmenuTimer = null;
		}
	
	},



	//	Event handlers for discrete pieces of pieces of the menu


	/**
	* @method _onMenuMouseOver
	* @description "mouseover" event handler for a menu.
	* @protected
	* @param {Node} menu Node instance representing a menu.
	* @param {Object} event Object representing the DOM event.
	*/
	_onMenuMouseOver: function (menu, event) {

		var menuNav = this,
			oHideAllSubmenusTimer = menuNav._hideAllSubmenusTimer;

		if (oHideAllSubmenusTimer) {
			oHideAllSubmenusTimer.cancel();
			menuNav._hideAllSubmenusTimer = null;
		}

		menuNav._cancelHideSubmenuTimer();

		menuNav._activeMenu = menu;


		if (menuNav._movingToSubmenu && isHorizontalMenu(menu)) {
			menuNav._movingToSubmenu = false;
		}

	},


	/**
	* @method _onMenuMouseOut
	* @description "mouseout" event handler for a menu.
	* @protected
	* @param {Node} menu Node instance representing a menu.
	* @param {Object} event Object representing the DOM event.
	*/
	_onMenuMouseOut: function (menu, event) {

		var menuNav = this,
			oActiveMenu = menuNav._activeMenu,
			oRelatedTarget = event.relatedTarget,
			oActiveItem = menuNav._activeItem,
			oParentMenu,
			oMenu;


		if (oActiveMenu && !oActiveMenu.contains(oRelatedTarget)) {
		
			oParentMenu = getParentMenu(oActiveMenu);
			

			if (oParentMenu && !oParentMenu.contains(oRelatedTarget)) {

				if (menuNav._mouseOutHideDelay > 0) {

					menuNav._cancelShowSubmenuTimer();

					menuNav._hideAllSubmenusTimer = 

							later(menuNav._mouseOutHideDelay, menuNav, function () {

								var	oSubmenu;

								oActiveMenu = menuNav._activeMenu;
							
								menuNav._hideAllSubmenus(menuNav._rootMenu);
						
								if (oActiveMenu) {
						
									//	Focus the label element for the topmost submenu
									oSubmenu = menuNav._getTopmostSubmenu(oActiveMenu);
									menuNav._focusItem(oSubmenu.previous());
						
								}
							
							});
						
				}
			
			}
			else {
			
				if (oActiveItem) {
				
					oMenu = getParentMenu(oActiveItem);

					if (!menuNav._isRoot(oMenu)) { 
						menuNav._focusItem(oMenu.previous());
					}
				
				}
			
			}

		}

	},


	/**
	* @method _onMenuLabelMouseOver
	* @description "mouseover" event handler for a menu label.
	* @protected
	* @param {Node} menuLabel Node instance representing a menu label.
	* @param {Object} event Object representing the DOM event.
	*/
	_onMenuLabelMouseOver: function (menuLabel, event) {

		var menuNav = this,
			oActiveMenu = menuNav._activeMenu,
			bIsRoot = menuNav._isRoot(oActiveMenu),
			bUseAutoSubmenuDisplay = (menuNav._autoSubmenuDisplay && bIsRoot || !bIsRoot),
			oSubmenu;


		menuNav._setActiveItem(menuLabel);
		menuNav._focusItem(menuLabel);
		

		if (bUseAutoSubmenuDisplay && !menuNav._movingToSubmenu) {
	
			menuNav._cancelHideSubmenuTimer();
			menuNav._cancelShowSubmenuTimer();


			if (!hasVisibleSubmenu(menuLabel)) {

				oSubmenu = menuLabel.next();
	

				if (oSubmenu) {
					
					menuNav._hideAllSubmenus(oActiveMenu);

					menuNav._showSubmenuTimer = 
									later(menuNav._submenuShowDelay, menuNav, 
											menuNav._showMenu, oSubmenu);
				
				}
			
			}
		
		}

	},


	/**
	* @method _onMenuLabelMouseOut
	* @description "mouseout" event handler for a menu label.
	* @protected
	* @param {Node} menuLabel Node instance representing a menu label.
	* @param {Object} event Object representing the DOM event.
	*/
	_onMenuLabelMouseOut: function (menuLabel, event) {

		var menuNav = this,
			bIsRoot = menuNav._isRoot(menuNav._activeMenu),
			bUseAutoSubmenuDisplay = (menuNav._autoSubmenuDisplay && bIsRoot || !bIsRoot),
			oRelatedTarget = event.relatedTarget,
			oSubmenu = menuLabel.next();

		menuNav._clearActiveItem();

		if (bUseAutoSubmenuDisplay) {

			if (menuNav._movingToSubmenu && !menuNav._showSubmenuTimer && oSubmenu) {

				//	If the mouse is moving diagonally toward the submenu and another submenu 
				//	isn't in the process of being displayed (via a timer), then hide the submenu 
				//	via a timer to give the user some time to reach the submenu.
			
				menuNav._hideSubmenuTimer = later(menuNav._submenuHideDelay, menuNav, 
															menuNav._hideMenu, oSubmenu);
			
			}
			else if (!menuNav._movingToSubmenu && oSubmenu && 
				!oSubmenu.contains(oRelatedTarget) && oRelatedTarget !== oSubmenu) {

				//	If the mouse is not moving toward the submenu, cancel any submenus that 
				//	might be in the process of being displayed (via a timer) and hide this 
				//	submenu immediately.

				menuNav._cancelShowSubmenuTimer();

				menuNav._hideMenu(oSubmenu);

			}

		}

	},
	

	/**
	* @method _onMenuItemMouseOver
	* @description "mouseover" event handler for a menuitem.
	* @protected
	* @param {Node} menuItem Node instance representing a menuitem.
	* @param {Object} event Object representing the DOM event.
	*/
	_onMenuItemMouseOver: function (menuItem, event) {

		var menuNav = this,
			oActiveMenu = menuNav._activeMenu,
			bIsRoot = menuNav._isRoot(oActiveMenu),
			bUseAutoSubmenuDisplay = (menuNav._autoSubmenuDisplay && bIsRoot || !bIsRoot);


		menuNav._setActiveItem(menuItem);
		menuNav._focusItem(menuItem);


		if (bUseAutoSubmenuDisplay && !menuNav._movingToSubmenu) {

			menuNav._hideAllSubmenus(oActiveMenu);

		}

	},
	

	/**
	* @method _onMenuItemMouseOut
	* @description "mouseout" event handler for a menuitem.
	* @protected
	* @param {Node} menuItem Node instance representing a menuitem.
	* @param {Object} event Object representing the DOM event.
	*/
	_onMenuItemMouseOut: function (menuItem, event) {

		this._clearActiveItem();

	},


	/**
	* @method _onVerticalMenuKeyDown
	* @description "keydown" event handler for vertical menus of a MenuNav.
	* @protected
	* @param {Object} event Object representing the DOM event.
	*/
	_onVerticalMenuKeyDown: function (event) {

		var menuNav = this,
			oActiveMenu = menuNav._activeMenu,
			oRootMenu = menuNav._rootMenu,
			oTarget = event.target,
			oFocusedItem = getItem(oTarget, true),
			bPreventDefault = false,
			nKeyCode = event.keyCode,
			oSubmenu,
			oParentMenu,
			oLI,
			oNextItem,
			oItem;


		switch (nKeyCode) {

			case 37:	//	left arrow

				oParentMenu = getParentMenu(oActiveMenu);

				if (oParentMenu && isHorizontalMenu(oParentMenu)) {
				
					menuNav._hideMenu(oActiveMenu);
					oLI = getPreviousSibling(oActiveMenu.get(PARENT_NODE));
					oItem = getItem(oLI);
					
					if (oItem) {

						if (isMenuLabel(oItem)) {	//	Menu label
						
							oSubmenu = oItem.next();
						

							if (oSubmenu) {

								menuNav._showMenu(oSubmenu);
								menuNav._setActiveItem(getFirstItem(oSubmenu));

							}
							else {
	
								menuNav._setActiveItem(oItem);
								focusItem(oItem);
	
							}
						
						}
						else {	//	MenuItem

							menuNav._setActiveItem(oItem);
							focusItem(oItem);

						}
					
					}

				}
				else if (!menuNav._isRoot(oActiveMenu)) {
					menuNav._hideMenu(oActiveMenu, true);
				}


				bPreventDefault = true;

			break;

			case 39:	//	right arrow

				if (isMenuLabel(oTarget)) {
					
					oSubmenu = oTarget.next();

					if (oSubmenu) {
						menuNav._showMenu(oSubmenu);
						menuNav._setActiveItem(getFirstItem(oSubmenu));
					}
				
				}
				else if (isHorizontalMenu(oRootMenu)) {

					oSubmenu = menuNav._getTopmostSubmenu(oActiveMenu);
					oLI = getNextSibling(oSubmenu.get(PARENT_NODE));
					oItem = getItem(oLI);

					menuNav._hideAllSubmenus(oRootMenu);

					if (oItem) {

						if (isMenuLabel(oItem)) {	//	Menu label

							oSubmenu = oItem.next();

							if (oSubmenu) {

								menuNav._showMenu(oSubmenu);
								menuNav._setActiveItem(getFirstItem(oSubmenu));

							}
							else {
	
								menuNav._setActiveItem(oItem);
								focusItem(oItem);
	
							}
						
						}
						else {	//	MenuItem

							menuNav._setActiveItem(oItem);
							focusItem(oItem);

						}							

					}
				
				}

				bPreventDefault = true;

			break;

			case 38:	//	up arrow
			case 40:	//	down arrow

				menuNav._hideAllSubmenus(oActiveMenu);

				oNextItem = nKeyCode === 38 ? 
								getPreviousItem(oFocusedItem) : getNextItem(oFocusedItem);

				menuNav._setActiveItem(oNextItem);
				focusItem(oNextItem);

				bPreventDefault = true;

			break;

		}	


		if (bPreventDefault) {

			//	Prevent the browser from scrolling the window

			event.preventDefault();			

		}
	
	},
	

	/**
	* @method _onHorizontalMenuKeyDown
	* @description "keydown" event handler for horizontal menus of a MenuNav.
	* @protected
	* @param {Object} event Object representing the DOM event.
	*/
	_onHorizontalMenuKeyDown: function (event) {

		var menuNav = this,
			oActiveMenu = menuNav._activeMenu,
			oTarget = event.target,
			oFocusedItem = getItem(oTarget, true),
			bPreventDefault = false,
			nKeyCode = event.keyCode,
			oNextItem,
			oSubmenu;

		switch (nKeyCode) {

			case 37:	//	left arrow
			case 39:	//	right arrow

				menuNav._hideAllSubmenus(oActiveMenu);

				oNextItem = nKeyCode === 37 ? 
								getPreviousItem(oFocusedItem) : getNextItem(oFocusedItem);

				menuNav._setActiveItem(oNextItem);
				focusItem(oNextItem);

				bPreventDefault = true;

			break;

			case 40:	//	down arrow

				menuNav._hideAllSubmenus(oActiveMenu);

				if (isMenuLabel(oFocusedItem)) {
				
					oSubmenu = oFocusedItem.next();

					if (oSubmenu) {
						menuNav._showMenu(oSubmenu);
						menuNav._setActiveItem(getFirstItem(oSubmenu));
					}

					bPreventDefault = true;
				
				}

			break;

		}		


		if (bPreventDefault) {

			//	Prevent the browser from scrolling the window

			event.preventDefault();			

		}
	
	},


	//	Generic DOM Event handlers


	/**
	* @method _onMouseMove
	* @description "mousemove" event handler for the MenuNav.
	* @protected
	* @param {Object} event Object representing the DOM event.
	*/
	_onMouseMove: function (event) {

		var menuNav = this;

		//	Using a timer to set the value of the "_currentMouseX" property helps improve the 
		//	reliability of the calculation used to set the value of the "_movingToSubmenu"
		//	property - especially in Opera.

		later(10, menuNav, function () {

			menuNav._currentMouseX = event.pageX;
		
		});
	
	},


	/**
	* @method _onMouseOver
	* @description "mouseover" event handler for the MenuNav.
	* @protected
	* @param {Object} event Object representing the DOM event.
	*/
	_onMouseOver: function (event) {

		var menuNav = this,
			oTarget,
			oMenu,
			oMenuLabel,
			oParentMenu,
			oMenuItem;


		if (menuNav._blockMouseEvent) {
			menuNav._blockMouseEvent = false;
		}
		else {

			oTarget = event.target;
			oMenu = getMenu(oTarget, true);
			oMenuLabel = getMenuLabel(oTarget, true);
			oMenuItem = getMenuItem(oTarget, true);


			if (handleMouseOverForNode(oMenu, oTarget)) {

				menuNav._onMenuMouseOver(oMenu, event);

				oMenu[HANDLED_MOUSEOVER] = true;
				oMenu[HANDLED_MOUSEOUT] = false;

				oParentMenu = getParentMenu(oMenu);

				if (oParentMenu) {

					oParentMenu[HANDLED_MOUSEOUT] = true;
					oParentMenu[HANDLED_MOUSEOVER] = false;
		
				}
			
			}

			if (handleMouseOverForNode(oMenuLabel, oTarget)) {

				menuNav._onMenuLabelMouseOver(oMenuLabel, event);

				oMenuLabel[HANDLED_MOUSEOVER] = true;
				oMenuLabel[HANDLED_MOUSEOUT] = false;
	
			}

			if (handleMouseOverForNode(oMenuItem, oTarget)) {
	
				menuNav._onMenuItemMouseOver(oMenuItem, event);

				oMenuItem[HANDLED_MOUSEOVER] = true;
				oMenuItem[HANDLED_MOUSEOUT] = false;
				
			}

		}

	},


	/**
	* @method _onMouseOut
	* @description "mouseout" event handler for the MenuNav.
	* @protected
	* @param {Object} event Object representing the DOM event.
	*/
	_onMouseOut: function (event) {
			
		var menuNav = this,
			oActiveMenu = menuNav._activeMenu,
			bMovingToSubmenu = false,
			oTarget,
			oRelatedTarget,
			oMenu,
			oMenuLabel,
			oSubmenu,
			oMenuItem;


		menuNav._movingToSubmenu = (oActiveMenu && !isHorizontalMenu(oActiveMenu) && 
											((event.pageX - 5) > menuNav._currentMouseX));
		
		oTarget = event.target;
		oRelatedTarget = event.relatedTarget;
		oMenu = getMenu(oTarget, true);
		oMenuLabel = getMenuLabel(oTarget, true);
		oMenuItem = getMenuItem(oTarget, true);


		if (handleMouseOutForNode(oMenuLabel, oRelatedTarget)) {

			menuNav._onMenuLabelMouseOut(oMenuLabel, event);

			oMenuLabel[HANDLED_MOUSEOUT] = true;
			oMenuLabel[HANDLED_MOUSEOVER] = false;

		}

		if (handleMouseOutForNode(oMenuItem, oRelatedTarget)) {

			menuNav._onMenuItemMouseOut(oMenuItem, event);

			oMenuItem[HANDLED_MOUSEOUT] = true;
			oMenuItem[HANDLED_MOUSEOVER] = false;
			
		}


		if (oMenuLabel) {

			oSubmenu = oMenuLabel.next();

			if (oSubmenu && (oRelatedTarget === oSubmenu || oSubmenu.contains(oRelatedTarget))) {

				bMovingToSubmenu = true;

			}
		
		}
		

		if (handleMouseOutForNode(oMenu, oRelatedTarget) || bMovingToSubmenu) {

			menuNav._onMenuMouseOut(oMenu, event);				

			oMenu[HANDLED_MOUSEOUT] = true;
			oMenu[HANDLED_MOUSEOVER] = false;
		
		}
	
	},


	/**
	* @method _toggleSubmenuDisplay
	* @description "mousedown," "keydown," and "click" event handler for the MenuNav used to 
	* toggle the display of a submenu.
	* @protected
	* @param {Object} event Object representing the DOM event.
	*/
	_toggleSubmenuDisplay: function (event) {

		var menuNav = this,
			oTarget = event.target,
			oMenuLabel = getMenuLabel(oTarget, true),
			sType = event.type,
			oAnchor,
			oSubmenu,
			sHref,
			nHashPos,
			nLen,
			sId;


		if (oMenuLabel) {

			oAnchor = isAnchor(oTarget) ? oTarget : oTarget.ancestor(isAnchor);
			

			if (oAnchor) {

				//	Need to pass "2" as a second argument to "getAttribute" for IE otherwise IE 
				//	will return a fully qualified URL for the value of the "href" attribute.
				//	http://msdn.microsoft.com/en-us/library/ms536429(VS.85).aspx

				sHref = oAnchor.getAttribute("href", 2);
				nHashPos = sHref.indexOf("#");
				nLen = sHref.length;

				if (nHashPos === 0 && nLen > 1) {

					sId = sHref.substr(1, nLen);
					oSubmenu = oMenuLabel.next();

					if (oSubmenu && (oSubmenu.get(ID) === sId)) {


						if (sType === MOUSEDOWN || (sType === KEYDOWN && event.keyCode === 13)) {

							//	The call to "preventDefault" below results in the element 
							//	serving as the menu's label to not receive focus in Webkit, 
							//	therefore the "_hasFocus" flag never gets set to true, meaning the 
							//	first item in the submenu isn't focused when the submenu is 
							//	displayed.  To fix this issue, it is necessary to set the 
							//	"_hasFocus" flag to true.
	
							if (UA.webkit && !menuNav._hasFocus) {
								menuNav._hasFocus = true;
							}


							if (hasVisibleSubmenu(oMenuLabel)) {
								menuNav._hideMenu(oSubmenu);
								focusItem(oMenuLabel);
							}
							else {
								menuNav._hideAllSubmenus(menuNav._rootMenu);
								menuNav._showMenu(oSubmenu);
							}
						
						}


						if (sType === CLICK) {

							//	Prevent the browser from following the URL of the anchor element
							
							event.preventDefault();
						
						}
					
					}
				
				}				


			}
		
		}
	
	},
	

	/**
	* @method _onKeyPress
	* @description "keypress" event handler for the MenuNav.
	* @protected
	* @param {Object} event Object representing the DOM event.
	*/
	_onKeyPress: function (event) {
	
		switch (event.keyCode) {

			case 37:	//	left arrow
			case 38:	//	up arrow
			case 39:	//	right arrow
			case 40:	//	down arrow

				//	Prevent the browser from scrolling the window

				event.preventDefault();

			break;

		}						

	},	


	/**
	* @method _onKeyDown
	* @description "keydown" event handler for the MenuNav.
	* @protected
	* @param {Object} event Object representing the DOM event.
	*/
	_onKeyDown: function (event) {

		var menuNav = this,
			oActiveItem = menuNav._activeItem,
			oTarget = event.target,
			oActiveMenu = getParentMenu(oTarget),
			oSubmenu;

		if (oActiveMenu) {

			menuNav._activeMenu = oActiveMenu;

			if (isHorizontalMenu(oActiveMenu)) {
				menuNav._onHorizontalMenuKeyDown(event);
			}
			else {
				menuNav._onVerticalMenuKeyDown(event);
			}


			if (event.keyCode === 27) {

				if (!menuNav._isRoot(oActiveMenu)) {

					menuNav._hideMenu(oActiveMenu, true);
					event.stopPropagation();
					menuNav._blockMouseEvent = UA.gecko ? true : false;

				}
				else if (oActiveItem) {

					if (isMenuLabel(oActiveItem) && hasVisibleSubmenu(oActiveItem)) {
					
						oSubmenu = oActiveItem.next();

						if (oSubmenu) {
							menuNav._hideMenu(oSubmenu);
						}

					}
					else {

						blurItem(oTarget);
						menuNav._clearActiveItem();
					
					}

				}
			
			}
		
		}
	
	},


	/**
	* @method _onDocMouseDown
	* @description "mousedown" event handler for the owner document of the MenuNav.
	* @protected
	* @param {Object} event Object representing the DOM event.
	*/
	_onDocMouseDown: function (event) {
	
		var menuNav = this,
			oRoot = menuNav._rootMenu,
			oTarget = event.target;


		if (!oRoot.compareTo(oTarget) && !oRoot.contains(oTarget)) {
		
			menuNav._hideAllSubmenus(oRoot);


			//	Document doesn't receive focus in Webkit when the user mouses down on it, 
			//	so the "_hasFocus" property won't get set to the correct value.  The 
			//	following line corrects the problem.

			if (UA.webkit) {
				menuNav._hasFocus = false;
				menuNav._clearActiveItem();
			}
		
		}
	
	},


	/**
	* @method _onDocFocus
	* @description "focus" event handler for the owner document of the MenuNav.
	* @protected
	* @param {Object} event Object representing the DOM event.
	*/
	_onDocFocus: function (event) {
	
		var menuNav = this,
			bUseARIA = menuNav._useARIA,
			oFirstItem = menuNav._firstItem,
			oActiveItem = menuNav._activeItem,
			oTarget = event.target;

		
		if (menuNav._rootMenu.contains(oTarget)) {	//	The menu has focus

			if (!menuNav._hasFocus) {	//	Initial focus

				//	First time the menu has been focused, need to setup focused state and  
				//	established active active descendant
	
				menuNav._hasFocus = true;
	
				oActiveItem = getItem(oTarget, true);
	
				if (oActiveItem) {	
					menuNav._setActiveItem(oActiveItem);
				}
			
			}
		
		}
		else {	//	The menu has lost focus

			menuNav._clearActiveItem();
			
			menuNav._hasFocus = false;


			if (oFirstItem && bUseARIA) {
			
				placeInDefaultTabIndex(getItemAnchor(oFirstItem));

			}

		}
	
	}

};


Y.namespace('plugin');

Y.plugin.NodeMenuNav = MenuNav;


}, '@VERSION@' ,{requires:['node', 'classnamemanager']});
