if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/node-menunav/node-menunav.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/node-menunav/node-menunav.js",
    code: []
};
_yuitest_coverage["build/node-menunav/node-menunav.js"].code=["YUI.add('node-menunav', function (Y, NAME) {","","/**","* <p>The MenuNav Node Plugin makes it easy to transform existing list-based ","* markup into traditional, drop down navigational menus that are both accessible ","* and easy to customize, and only require a small set of dependencies.</p>","* ","* ","* <p>To use the MenuNav Node Plugin, simply pass a reference to the plugin to a ","* Node instance's <code>plug</code> method.</p>","* ","* <p>","* <code>","* &#60;script type=\"text/javascript\"&#62; <br>","* <br>","* 		//	Call the \"use\" method, passing in \"node-menunav\".  This will <br>","* 		//	load the script and CSS for the MenuNav Node Plugin and all of <br>","* 		//	the required dependencies. <br>","* <br>","* 		YUI().use(\"node-menunav\", function(Y) { <br>","* <br>","* 			//	Use the \"contentready\" event to initialize the menu when <br>","* 			//	the subtree of element representing the root menu <br>","* 			//	(&#60;div id=\"menu-1\"&#62;) is ready to be scripted. <br>","* <br>","* 			Y.on(\"contentready\", function () { <br>","* <br>","* 				//	The scope of the callback will be a Node instance <br>","* 				//	representing the root menu (&#60;div id=\"menu-1\"&#62;). <br>","* 				//	Therefore, since \"this\" represents a Node instance, it <br>","* 				//	is possible to just call \"this.plug\" passing in a <br>","*				//	reference to the MenuNav Node Plugin. <br>","* <br>","* 				this.plug(Y.Plugin.NodeMenuNav); <br>","* <br>","* 			}, \"#menu-1\"); <br>","* <br>		","* 		}); <br>","* <br>	","* 	&#60;/script&#62; <br>","* </code>","* </p>","*","* <p>The MenuNav Node Plugin has several configuration properties that can be ","* set via an object literal that is passed as a second argument to a Node ","* instance's <code>plug</code> method.","* </p>","*","* <p>","* <code>","* &#60;script type=\"text/javascript\"&#62; <br>","* <br>","* 		//	Call the \"use\" method, passing in \"node-menunav\".  This will <br>","* 		//	load the script and CSS for the MenuNav Node Plugin and all of <br>","* 		//	the required dependencies. <br>","* <br>","* 		YUI().use(\"node-menunav\", function(Y) { <br>","* <br>","* 			//	Use the \"contentready\" event to initialize the menu when <br>","* 			//	the subtree of element representing the root menu <br>","* 			//	(&#60;div id=\"menu-1\"&#62;) is ready to be scripted. <br>","* <br>","* 			Y.on(\"contentready\", function () { <br>","* <br>","* 				//	The scope of the callback will be a Node instance <br>","* 				//	representing the root menu (&#60;div id=\"menu-1\"&#62;). <br>","* 				//	Therefore, since \"this\" represents a Node instance, it <br>","* 				//	is possible to just call \"this.plug\" passing in a <br>","*				//	reference to the MenuNav Node Plugin. <br>","* <br>","* 				this.plug(Y.Plugin.NodeMenuNav, { mouseOutHideDelay: 1000 });","* <br><br>","* 			}, \"#menu-1\"); <br>","* <br>		","* 		}); <br>","* <br>	","* 	&#60;/script&#62; <br>","* </code>","* </p>","* ","DEPRECATED. The MenuNav Node Plugin has been deprecated as of YUI 3.9.0. This module will be removed from the library in a future version. If you require functionality similar to the one provided by this module, consider taking a look at the various modules in the YUI Gallery <http://yuilibrary.com/gallery/>. ","","@module node-menunav","@deprecated 3.9.0","*/","","","	//	Util shortcuts","","var UA = Y.UA,","	later = Y.later,","	getClassName = Y.ClassNameManager.getClassName,","","","","	//	Frequently used strings","","	MENU = \"menu\",","	MENUITEM = \"menuitem\",","	HIDDEN = \"hidden\",","	PARENT_NODE = \"parentNode\",","	CHILDREN = \"children\",","	OFFSET_HEIGHT = \"offsetHeight\",","	OFFSET_WIDTH = \"offsetWidth\",","	PX = \"px\",","	ID = \"id\",","	PERIOD = \".\",","	HANDLED_MOUSEOUT = \"handledMouseOut\",","	HANDLED_MOUSEOVER = \"handledMouseOver\",","	ACTIVE = \"active\",","	LABEL = \"label\",","	LOWERCASE_A = \"a\",","	MOUSEDOWN = \"mousedown\",","	KEYDOWN = \"keydown\",","	CLICK = \"click\",","	EMPTY_STRING = \"\",","	FIRST_OF_TYPE = \"first-of-type\",","	ROLE = \"role\",","	PRESENTATION = \"presentation\",","	DESCENDANTS = \"descendants\",","	UI = \"UI\",","	ACTIVE_DESCENDANT = \"activeDescendant\",","	USE_ARIA = \"useARIA\",","	ARIA_HIDDEN = \"aria-hidden\",","	CONTENT = \"content\",","	HOST = \"host\",","	ACTIVE_DESCENDANT_CHANGE = ACTIVE_DESCENDANT + \"Change\",","","","	//	Attribute keys","	","	AUTO_SUBMENU_DISPLAY = \"autoSubmenuDisplay\",","	MOUSEOUT_HIDE_DELAY = \"mouseOutHideDelay\",","","","	//	CSS class names","","	CSS_MENU = getClassName(MENU),","	CSS_MENU_HIDDEN = getClassName(MENU, HIDDEN),","	CSS_MENU_HORIZONTAL = getClassName(MENU, \"horizontal\"),","	CSS_MENU_LABEL = getClassName(MENU, LABEL),","	CSS_MENU_LABEL_ACTIVE = getClassName(MENU, LABEL, ACTIVE),","	CSS_MENU_LABEL_MENUVISIBLE = getClassName(MENU, LABEL, (MENU + \"visible\")),","	CSS_MENUITEM = getClassName(MENUITEM),","	CSS_MENUITEM_ACTIVE = getClassName(MENUITEM, ACTIVE),","","","	//	CSS selectors","	","	MENU_SELECTOR = PERIOD + CSS_MENU,","	MENU_TOGGLE_SELECTOR = (PERIOD + getClassName(MENU, \"toggle\")),","    MENU_CONTENT_SELECTOR = PERIOD + getClassName(MENU, CONTENT),","    MENU_LABEL_SELECTOR = PERIOD + CSS_MENU_LABEL,","","	STANDARD_QUERY = \">\" + MENU_CONTENT_SELECTOR + \">ul>li>a\",","	EXTENDED_QUERY = \">\" + MENU_CONTENT_SELECTOR + \">ul>li>\" + MENU_LABEL_SELECTOR + \">a:first-child\";","","//	Utility functions","","","var getPreviousSibling = function (node) {","","	var oPrevious = node.previous(),","		oChildren;","","	if (!oPrevious) {","		oChildren = node.get(PARENT_NODE).get(CHILDREN);","		oPrevious = oChildren.item(oChildren.size() - 1);","	}","	","	","	return oPrevious;","","};","","","var getNextSibling = function (node) {","","	var oNext = node.next();","","	if (!oNext) {","		oNext = node.get(PARENT_NODE).get(CHILDREN).item(0);		","	}","	","	return oNext;","","};","","","var isAnchor = function (node) {","	","	var bReturnVal = false;","	","	if (node) {","		bReturnVal = node.get(\"nodeName\").toLowerCase() === LOWERCASE_A;","	}","	","	return bReturnVal;","	","};","","","var isMenuItem = function (node) {","	","	return node.hasClass(CSS_MENUITEM);","","};","","","var isMenuLabel = function (node) {","	","	return node.hasClass(CSS_MENU_LABEL);","","};","","","var isHorizontalMenu = function (menu) {","	","	return menu.hasClass(CSS_MENU_HORIZONTAL);","","};","","","var hasVisibleSubmenu = function (menuLabel) {","	","	return menuLabel.hasClass(CSS_MENU_LABEL_MENUVISIBLE);","","};","","","var getItemAnchor = function (node) {","	","	return isAnchor(node) ? node : node.one(LOWERCASE_A);","","};","","","var getNodeWithClass = function (node, className, searchAncestors) {","	","	var oItem;","	","	if (node) {","		","		if (node.hasClass(className)) {","			oItem = node;","		}","		","		if (!oItem && searchAncestors) {","			oItem = node.ancestor((PERIOD + className));","		}","	","	}","	","	return oItem;","","};","","","var getParentMenu = function (node) {","	","	return node.ancestor(MENU_SELECTOR);","	","};","","","var getMenu = function (node, searchAncestors) {","	","	return getNodeWithClass(node, CSS_MENU, searchAncestors);","","};","","","var getMenuItem = function (node, searchAncestors) {","","	var oItem;","	","	if (node) {","		oItem = getNodeWithClass(node, CSS_MENUITEM, searchAncestors);","	}","	","	return oItem;","","};","","","var getMenuLabel = function (node, searchAncestors) {","","	var oItem;","	","	if (node) {","	","		if (searchAncestors) {","			oItem = getNodeWithClass(node, CSS_MENU_LABEL, searchAncestors);","		}","		else {","			oItem = getNodeWithClass(node, CSS_MENU_LABEL) || ","				node.one((PERIOD + CSS_MENU_LABEL));","		}","		","	}","	","	return oItem;","","};","","","var getItem = function (node, searchAncestors) {","","	var oItem;","	","	if (node) {","		oItem = getMenuItem(node, searchAncestors) || ","			getMenuLabel(node, searchAncestors);","	}","	","	return oItem;	","","};","","","var getFirstItem = function (menu) {","	","	return getItem(menu.one(\"li\"));","","};","","","var getActiveClass = function (node) {","	","	return isMenuItem(node) ? CSS_MENUITEM_ACTIVE : CSS_MENU_LABEL_ACTIVE;","","};","","","var handleMouseOverForNode = function (node, target) {","	","	return node && !node[HANDLED_MOUSEOVER] && ","		(node.compareTo(target) || node.contains(target));","","};","","","var handleMouseOutForNode = function (node, relatedTarget) {","	","	return node && !node[HANDLED_MOUSEOUT] && ","		(!node.compareTo(relatedTarget) && !node.contains(relatedTarget));","","};","","/**","* The NodeMenuNav class is a plugin for a Node instance.  The class is used via  ","* the <a href=\"Node.html#method_plug\"><code>plug</code></a> method of Node and ","* should not be instantiated directly.","* @namespace plugin","* @class NodeMenuNav","*/","var NodeMenuNav = function () {","","	NodeMenuNav.superclass.constructor.apply(this, arguments);","","};","","NodeMenuNav.NAME = \"nodeMenuNav\";","NodeMenuNav.NS = \"menuNav\";","","","/** ","* @property SHIM_TEMPLATE_TITLE","* @description String representing the value for the <code>title</code> ","* attribute for the shim used to prevent <code>&#60;select&#62;</code> elements ","* from poking through menus in IE 6.","* @default \"Menu Stacking Shim\"","* @type String","*/","NodeMenuNav.SHIM_TEMPLATE_TITLE = \"Menu Stacking Shim\";","","","/** ","* @property SHIM_TEMPLATE","* @description String representing the HTML used to create the ","* <code>&#60;iframe&#62;</code> shim used to prevent ","* <code>&#60;select&#62;</code> elements from poking through menus in IE 6.","* @default &#34;&#60;iframe frameborder=&#34;0&#34; tabindex=&#34;-1&#34; ","* class=&#34;yui-shim&#34; title=&#34;Menu Stacking Shim&#34; ","* src=&#34;javascript:false;&#34;&#62;&#60;/iframe&#62;&#34;","* @type String","*/","","//	<iframe> shim notes:","//","//	1) Need to set the \"frameBorder\" property to 0 to suppress the default ","//	<iframe> border in IE.  (Setting the CSS \"border\" property alone doesn't  ","//	suppress it.) ","//","//	2) The \"src\" attribute of the <iframe> is set to \"javascript:false;\" so ","//	that it won't load a page inside it, preventing the secure/nonsecure ","//	warning in IE when using HTTPS.","//","//	3) Since the role of the <iframe> shim is completely presentational, its ","//	\"tabindex\" attribute is set to \"-1\" and its title attribute is set to ","//	\"Menu Stacking Shim\".  Both strategies help users of screen readers to ","//	avoid mistakenly interacting with the <iframe> shim.","","NodeMenuNav.SHIM_TEMPLATE = '<iframe frameborder=\"0\" tabindex=\"-1\" class=\"' + ","							getClassName(\"shim\") + ","							'\" title=\"' + NodeMenuNav.SHIM_TEMPLATE_TITLE + ","							'\" src=\"javascript:false;\"></iframe>';","","","NodeMenuNav.ATTRS = {","","	/**","	* Boolean indicating if use of the WAI-ARIA Roles and States should be ","	* enabled for the menu.","	*","	* @attribute useARIA","	* @readOnly","	* @writeOnce	","	* @default true","	* @type boolean","	*/","	useARIA: {","		","		value: true,","		writeOnce: true,","		lazyAdd: false,","		setter: function (value) {","","			var oMenu = this.get(HOST),","				oMenuLabel,","				oMenuToggle,","				oSubmenu,","				sID;","","			if (value) {","","				oMenu.set(ROLE, MENU);","","				oMenu.all(\"ul,li,\" + MENU_CONTENT_SELECTOR).set(ROLE, PRESENTATION);","","				oMenu.all((PERIOD + getClassName(MENUITEM, CONTENT))).set(ROLE, MENUITEM);","","				oMenu.all((PERIOD + CSS_MENU_LABEL)).each(function (node) {","","					oMenuLabel = node;","					oMenuToggle = node.one(MENU_TOGGLE_SELECTOR);","","					if (oMenuToggle) {","						oMenuToggle.set(ROLE, PRESENTATION);","						oMenuLabel = oMenuToggle.previous();","					}","","					oMenuLabel.set(ROLE, MENUITEM);","					oMenuLabel.set(\"aria-haspopup\", true);","","					oSubmenu = node.next();","","					if (oSubmenu) {","","						oSubmenu.set(ROLE, MENU);","","						oMenuLabel = oSubmenu.previous();","						oMenuToggle = oMenuLabel.one(MENU_TOGGLE_SELECTOR);","","						if (oMenuToggle) {","							oMenuLabel = oMenuToggle;","						}","","						sID = Y.stamp(oMenuLabel);","","						if (!oMenuLabel.get(ID)) {","							oMenuLabel.set(ID, sID);","						}","","						oSubmenu.set(\"aria-labelledby\", sID);","						oSubmenu.set(ARIA_HIDDEN, true);","						","					}","","				});","				","			}","","		}","		","	},","","","	/**","	* Boolean indicating if submenus are automatically made visible when the ","	* user mouses over the menu's items.","	*","	* @attribute autoSubmenuDisplay","	* @readOnly","	* @writeOnce	","	* @default true","	* @type boolean","	*/	","	autoSubmenuDisplay: {","		","		value: true,","		writeOnce: true","		","	},","","","	/**","	* Number indicating the time (in milliseconds) that should expire before a ","	* submenu is made visible when the user mouses over the menu's label.","	*","	* @attribute submenuShowDelay","	* @readOnly","	* @writeOnce	","	* @default 250","	* @type Number","	*/","	submenuShowDelay: {","		","		value: 250,","		writeOnce: true","		","	},","","","	/**","	* Number indicating the time (in milliseconds) that should expire before a ","	* submenu is hidden when the user mouses out of a menu label heading in the ","	* direction of a submenu.  ","	*","	* @attribute submenuHideDelay","	* @readOnly","	* @writeOnce	","	* @default 250","	* @type Number","	*/","	submenuHideDelay: {","		","		value: 250,","		writeOnce: true","		","	},","","","	/**","	* Number indicating the time (in milliseconds) that should expire before a ","	* submenu is hidden when the user mouses out of it.","	* ","	* @attribute mouseOutHideDelay","	* @readOnly","	* @writeOnce	","	* @default 750","	* @type Number","	*/	","	mouseOutHideDelay: {","		","		value: 750,","		writeOnce: true","		","	}","","};","","","Y.extend(NodeMenuNav, Y.Plugin.Base, {","","	//	Protected properties","","	/** ","	* @property _rootMenu","	* @description Node instance representing the root menu in the menu.","	* @default null","	* @protected","	* @type Node","	*/","	_rootMenu: null,	","","","	/** ","	* @property _activeItem","	* @description Node instance representing the menu's active descendent: ","	* the menuitem or menu label the user is currently interacting with.","	* @default null","	* @protected","	* @type Node","	*/","	_activeItem: null, ","","","	/** ","	* @property _activeMenu","	* @description Node instance representing the menu that is the parent of ","	* the menu's active descendent.","	* @default null","	* @protected","	* @type Node","	*/","	_activeMenu: null,","","","	/** ","	* @property _hasFocus","	* @description Boolean indicating if the menu has focus.","	* @default false","	* @protected","	* @type Boolean","	*/","	_hasFocus: false,","","","	//	In gecko-based browsers a mouseover and mouseout event will fire even ","	//	if a DOM element moves out from under the mouse without the user ","	//	actually moving the mouse.  This bug affects NodeMenuNav because the  ","	//	user can hit the Esc key to hide a menu, and if the mouse is over the  ","	//	menu when the user presses Esc, the _onMenuMouseOut handler will be ","	//	called.  To fix this bug the following flag (_blockMouseEvent) is used ","	// to block the code in the _onMenuMouseOut handler from executing.","","	/** ","	* @property _blockMouseEvent","	* @description Boolean indicating whether or not to handle the ","	* \"mouseover\" event.","	* @default false","	* @protected","	* @type Boolean","	*/","	_blockMouseEvent: false,","","","	/** ","	* @property _currentMouseX","	* @description Number representing the current x coordinate of the mouse ","	* inside the menu.","	* @default 0","	* @protected","	* @type Number","	*/","	_currentMouseX: 0,","","","	/** ","	* @property _movingToSubmenu","	* @description Boolean indicating if the mouse is moving from a menu ","	* label to its corresponding submenu.","	* @default false","	* @protected","	* @type Boolean","	*/","	_movingToSubmenu: false,","","","	/** ","	* @property _showSubmenuTimer","	* @description Timer used to show a submenu.","	* @default null","	* @protected","	* @type Object","	*/","	_showSubmenuTimer: null,","","","	/** ","	* @property _hideSubmenuTimer","	* @description Timer used to hide a submenu.","	* @default null","	* @protected","	* @type Object","	*/","	_hideSubmenuTimer: null,","","","	/** ","	* @property _hideAllSubmenusTimer","	* @description Timer used to hide a all submenus.","	* @default null","	* @protected","	* @type Object","	*/","	_hideAllSubmenusTimer: null,","","","	/** ","	* @property _firstItem","	* @description Node instance representing the first item (menuitem or menu ","	* label) in the root menu of a menu.","	* @default null","	* @protected","	* @type Node","	*/","	_firstItem: null,","","","	//	Public methods","","","    initializer: function (config) {","","		var menuNav = this,","			oRootMenu = this.get(HOST),","			aHandlers = [],","			oDoc;","","","		if (oRootMenu) {","","			menuNav._rootMenu = oRootMenu;","","			oRootMenu.all(\"ul:first-child\").addClass(FIRST_OF_TYPE);","","			//	Hide all visible submenus","","			oRootMenu.all(MENU_SELECTOR).addClass(CSS_MENU_HIDDEN);","","","			//	Wire up all event handlers","","			aHandlers.push(oRootMenu.on(\"mouseover\", menuNav._onMouseOver, menuNav));","			aHandlers.push(oRootMenu.on(\"mouseout\", menuNav._onMouseOut, menuNav));","			aHandlers.push(oRootMenu.on(\"mousemove\", menuNav._onMouseMove, menuNav));","			aHandlers.push(oRootMenu.on(MOUSEDOWN, menuNav._toggleSubmenuDisplay, menuNav));","			aHandlers.push(Y.on(\"key\", menuNav._toggleSubmenuDisplay, oRootMenu, \"down:13\", menuNav));","			aHandlers.push(oRootMenu.on(CLICK, menuNav._toggleSubmenuDisplay, menuNav));","			aHandlers.push(oRootMenu.on(\"keypress\", menuNav._onKeyPress, menuNav));","			aHandlers.push(oRootMenu.on(KEYDOWN, menuNav._onKeyDown, menuNav));","","			oDoc = oRootMenu.get(\"ownerDocument\");","","		    aHandlers.push(oDoc.on(MOUSEDOWN, menuNav._onDocMouseDown, menuNav));","			aHandlers.push(oDoc.on(\"focus\", menuNav._onDocFocus, menuNav));","","			this._eventHandlers = aHandlers;","","			menuNav._initFocusManager();","","		}","		","","    },","","	destructor: function () {","","		var aHandlers = this._eventHandlers;","","		if (aHandlers) {","","			Y.Array.each(aHandlers, function (handle) {","				handle.detach();","			});","","			this._eventHandlers = null;","","		}","		","		this.get(HOST).unplug(\"focusManager\");","		","    },","","","","	//	Protected methods","","	/**","	* @method _isRoot","	* @description Returns a boolean indicating if the specified menu is the ","	* root menu in the menu.","	* @protected","	* @param {Node} menu Node instance representing a menu.","	* @return {Boolean} Boolean indicating if the specified menu is the root ","	* menu in the menu.","	*/","	_isRoot: function (menu) {","","		return this._rootMenu.compareTo(menu);","","	},","","","	/**","	* @method _getTopmostSubmenu","	* @description Returns the topmost submenu of a submenu hierarchy.","	* @protected","	* @param {Node} menu Node instance representing a menu.","	* @return {Node} Node instance representing a menu.","	*/","	_getTopmostSubmenu: function (menu) {","	","		var menuNav = this,","			oMenu = getParentMenu(menu),","			returnVal;","","","		if (!oMenu) {","			returnVal = menu;","		}","		else if (menuNav._isRoot(oMenu)) {","			returnVal = menu;","		}","		else {","			returnVal = menuNav._getTopmostSubmenu(oMenu);","		}","	","		return returnVal;","	","	},","","","	/**","	* @method _clearActiveItem","	* @description Clears the menu's active descendent.","	* @protected","	*/","	_clearActiveItem: function () {","","		var menuNav = this,","			oActiveItem = menuNav._activeItem;","		","		if (oActiveItem) {","			oActiveItem.removeClass(getActiveClass(oActiveItem));","		}","","		menuNav._activeItem = null;","	","	},","","","	/**","	* @method _setActiveItem","	* @description Sets the specified menuitem or menu label as the menu's ","	* active descendent.","	* @protected","	* @param {Node} item Node instance representing a menuitem or menu label.","	*/","	_setActiveItem: function (item) {","","		var menuNav = this;","	","		if (item) {","			","			menuNav._clearActiveItem();","	","			item.addClass(getActiveClass(item));","			","			menuNav._activeItem = item;","		","		}","	","	},","","","	/**","	* @method _focusItem","	* @description Focuses the specified menuitem or menu label.","	* @protected","	* @param {Node} item Node instance representing a menuitem or menu label.","	*/","	_focusItem: function (item) {","	","		var menuNav = this,","			oMenu,","			oItem;","	","		if (item && menuNav._hasFocus) {","","			oMenu = getParentMenu(item);","			oItem = getItemAnchor(item);","","			if (oMenu && !oMenu.compareTo(menuNav._activeMenu)) {","				menuNav._activeMenu = oMenu;","				menuNav._initFocusManager();","			}","		","			menuNav._focusManager.focus(oItem);","","		}","	","	},","","","	/**","	* @method _showMenu","	* @description Shows the specified menu.","	* @protected","	* @param {Node} menu Node instance representing a menu.","	*/","	_showMenu: function (menu) {","","		var oParentMenu = getParentMenu(menu),","			oLI = menu.get(PARENT_NODE),","			aXY = oLI.getXY();","","","		if (this.get(USE_ARIA)) {","			menu.set(ARIA_HIDDEN, false);","		}","","","		if (isHorizontalMenu(oParentMenu)) {","			aXY[1] = aXY[1] + oLI.get(OFFSET_HEIGHT);","		}","		else {","			aXY[0] = aXY[0] + oLI.get(OFFSET_WIDTH);","		}","		","		menu.setXY(aXY);","","		if (UA.ie < 8) {","","			if (UA.ie === 6 && !menu.hasIFrameShim) {","	","				menu.appendChild(Y.Node.create(NodeMenuNav.SHIM_TEMPLATE));","				menu.hasIFrameShim = true;","","			}","","			//	Clear previous values for height and width","","			menu.setStyles({ height: EMPTY_STRING, width: EMPTY_STRING });","","			//	Set the width and height of the menu's bounding box - this is ","			//	necessary for IE 6 so that the CSS for the <iframe> shim can ","			//	simply set the <iframe>'s width and height to 100% to ensure ","			//	that dimensions of an <iframe> shim are always sync'd to the ","			//	that of its parent menu.  Specifying a width and height also ","			//	helps when positioning decorator elements (for creating effects ","			//	like rounded corners) inside a menu's bounding box in IE 7.","			","			menu.setStyles({ ","				height: (menu.get(OFFSET_HEIGHT) + PX), ","				width: (menu.get(OFFSET_WIDTH) + PX) });","","		}","","		menu.previous().addClass(CSS_MENU_LABEL_MENUVISIBLE);","		menu.removeClass(CSS_MENU_HIDDEN);","","	},","	","","	/**","	* @method _hideMenu ","	* @description Hides the specified menu.","	* @protected","	* @param {Node} menu Node instance representing a menu.","	* @param {Boolean} activateAndFocusLabel Boolean indicating if the label ","	* for the specified ","	* menu should be focused and set as active.","	*/","	_hideMenu: function (menu, activateAndFocusLabel) {","","		var menuNav = this,","			oLabel = menu.previous(),","			oActiveItem;","","		oLabel.removeClass(CSS_MENU_LABEL_MENUVISIBLE);","","","		if (activateAndFocusLabel) {","			menuNav._focusItem(oLabel);","			menuNav._setActiveItem(oLabel);			","		}","","		oActiveItem = menu.one((PERIOD + CSS_MENUITEM_ACTIVE));","","		if (oActiveItem) {","			oActiveItem.removeClass(CSS_MENUITEM_ACTIVE);","		}","","		//	Clear the values for top and left that were set by the call to ","		//	\"setXY\" when the menu was shown so that the hidden position ","		//	specified in the core CSS file will take affect.","","		menu.setStyles({ left: EMPTY_STRING, top: EMPTY_STRING });","		","		menu.addClass(CSS_MENU_HIDDEN);","","		if (menuNav.get(USE_ARIA)) {","			menu.set(ARIA_HIDDEN, true);","		}	","		","	},","","","	/**","	* @method _hideAllSubmenus","	* @description Hides all submenus of the specified menu.","	* @protected","	* @param {Node} menu Node instance representing a menu.","	*/","	_hideAllSubmenus: function (menu) {","","		var menuNav = this;","","		menu.all(MENU_SELECTOR).each(Y.bind(function (submenuNode) {","		","			menuNav._hideMenu(submenuNode);","		","		}, menuNav));","	","	},","","","	/**","	* @method _cancelShowSubmenuTimer","	* @description Cancels the timer used to show a submenu.","	* @protected","	*/","	_cancelShowSubmenuTimer: function () {","","		var menuNav = this,","			oShowSubmenuTimer = menuNav._showSubmenuTimer;","","		if (oShowSubmenuTimer) {","			oShowSubmenuTimer.cancel();","			menuNav._showSubmenuTimer = null;","		}","	","	},","","","	/**","	* @method _cancelHideSubmenuTimer","	* @description Cancels the timer used to hide a submenu.","	* @protected","	*/","	_cancelHideSubmenuTimer: function () {","","		var menuNav = this,","			oHideSubmenuTimer = menuNav._hideSubmenuTimer;","","","		if (oHideSubmenuTimer) {","			oHideSubmenuTimer.cancel();","			menuNav._hideSubmenuTimer = null;","		}","	","	},","","","	/**","	* @method _initFocusManager","	* @description Initializes and updates the Focus Manager so that is is ","	* always managing descendants of the active menu.","	* @protected","	*/","	_initFocusManager: function () {","","		var menuNav = this,","			oRootMenu = menuNav._rootMenu,","			oMenu = menuNav._activeMenu || oRootMenu,","			sSelectorBase = ","				menuNav._isRoot(oMenu) ? EMPTY_STRING : (\"#\" + oMenu.get(\"id\")),","			oFocusManager = menuNav._focusManager,","			sKeysVal,","			sDescendantSelector,","			sQuery;","","		if (isHorizontalMenu(oMenu)) {","","			sDescendantSelector = sSelectorBase + STANDARD_QUERY + \",\" + ","				sSelectorBase + EXTENDED_QUERY;","			","			sKeysVal = { next: \"down:39\", previous: \"down:37\" };","			","		}","		else {","","			sDescendantSelector = sSelectorBase + STANDARD_QUERY;","			sKeysVal = { next: \"down:40\", previous: \"down:38\" };","","		}","","","		if (!oFocusManager) {","","			oRootMenu.plug(Y.Plugin.NodeFocusManager, { ","				descendants: sDescendantSelector,","				keys: sKeysVal,","				circular: true","			});","","			oFocusManager = oRootMenu.focusManager;","","			sQuery = \"#\" + oRootMenu.get(\"id\") + MENU_SELECTOR + \" a,\" + ","							MENU_TOGGLE_SELECTOR;","","			oRootMenu.all(sQuery).set(\"tabIndex\", -1);","","			oFocusManager.on(ACTIVE_DESCENDANT_CHANGE, ","				this._onActiveDescendantChange, oFocusManager, this);","","			oFocusManager.after(ACTIVE_DESCENDANT_CHANGE, ","				this._afterActiveDescendantChange, oFocusManager, this);","			","			menuNav._focusManager = oFocusManager;","			","		}","		else {","","			oFocusManager.set(ACTIVE_DESCENDANT, -1);","			oFocusManager.set(DESCENDANTS, sDescendantSelector);","			oFocusManager.set(\"keys\", sKeysVal);","			","		}","","	},","","","	//	Event handlers for discrete pieces of pieces of the menu","","","	/**","	* @method _onActiveDescendantChange","	* @description \"activeDescendantChange\" event handler for menu's ","	* Focus Manager.","	* @protected","	* @param {Object} event Object representing the Attribute change event.","	* @param {NodeMenuNav} menuNav Object representing the NodeMenuNav instance.","	*/","	_onActiveDescendantChange: function (event, menuNav) {","","		if (event.src === UI && menuNav._activeMenu && ","				!menuNav._movingToSubmenu) {","","			menuNav._hideAllSubmenus(menuNav._activeMenu);","","		}","		","	},","","","	/**","	* @method _afterActiveDescendantChange","	* @description \"activeDescendantChange\" event handler for menu's ","	* Focus Manager.","	* @protected","	* @param {Object} event Object representing the Attribute change event.","	* @param {NodeMenuNav} menuNav Object representing the NodeMenuNav instance.","	*/","	_afterActiveDescendantChange: function (event, menuNav) {","","		var oItem;","","		if (event.src === UI) {","			oItem = getItem(this.get(DESCENDANTS).item(event.newVal), true);","			menuNav._setActiveItem(oItem);","		}","	","	},","","","	/**","	* @method _onDocFocus","	* @description \"focus\" event handler for the owner document of the MenuNav.","	* @protected","	* @param {Object} event Object representing the DOM event.","	*/","	_onDocFocus: function (event) {","	","		var menuNav = this,","			oActiveItem = menuNav._activeItem,","			oTarget = event.target,","			oMenu;","	","","		if (menuNav._rootMenu.contains(oTarget)) {	//	The menu has focus","","			if (menuNav._hasFocus) {	","","				oMenu = getParentMenu(oTarget);","","				//	If the element that was focused is a descendant of the ","				//	root menu, but is in a submenu not currently being ","				//	managed by the Focus Manager, update the Focus Manager so ","				//	that it is now managing the submenu that is the parent of  ","				//	the element that was focused.","				","				if (!menuNav._activeMenu.compareTo(oMenu)) {","","					menuNav._activeMenu = oMenu;","					menuNav._initFocusManager();","					menuNav._focusManager.set(ACTIVE_DESCENDANT, oTarget);","					menuNav._setActiveItem(getItem(oTarget, true));","					","				}","			","			}","			else { //	Initial focus","","				//	First time the menu has been focused, need to setup focused ","				//	state and established active active descendant","	","				menuNav._hasFocus = true;","	","				oActiveItem = getItem(oTarget, true);","	","				if (oActiveItem) {	","					menuNav._setActiveItem(oActiveItem);","				}","				","			}","		","		}","		else {	//	The menu has lost focus","","			menuNav._clearActiveItem();","","			menuNav._cancelShowSubmenuTimer();","			menuNav._hideAllSubmenus(menuNav._rootMenu);","","			menuNav._activeMenu = menuNav._rootMenu;","			menuNav._initFocusManager();","			","			menuNav._focusManager.set(ACTIVE_DESCENDANT, 0);","			","			menuNav._hasFocus = false;","","		}","	","	},","","","	/**","	* @method _onMenuMouseOver","	* @description \"mouseover\" event handler for a menu.","	* @protected","	* @param {Node} menu Node instance representing a menu.","	* @param {Object} event Object representing the DOM event.","	*/","	_onMenuMouseOver: function (menu, event) {","","		var menuNav = this,","			oHideAllSubmenusTimer = menuNav._hideAllSubmenusTimer;","","		if (oHideAllSubmenusTimer) {","			oHideAllSubmenusTimer.cancel();","			menuNav._hideAllSubmenusTimer = null;","		}","","		menuNav._cancelHideSubmenuTimer();","","		//	Need to update the FocusManager in advance of focus a new ","		//	Menu in order to avoid the FocusManager thinking that ","		//	it has lost focus","		","		if (menu && !menu.compareTo(menuNav._activeMenu)) {","			menuNav._activeMenu = menu;","","			if (menuNav._hasFocus) {","				menuNav._initFocusManager();","			}","","		}","","		if (menuNav._movingToSubmenu && isHorizontalMenu(menu)) {","			menuNav._movingToSubmenu = false;","		}","","	},","","","	/**","	* @method _hideAndFocusLabel","	* @description Hides all of the submenus of the root menu and focuses the ","	* label of the topmost submenu","	* @protected","	*/","	_hideAndFocusLabel: function () {","","		var	menuNav = this,","			oActiveMenu = menuNav._activeMenu,","			oSubmenu;","	","		menuNav._hideAllSubmenus(menuNav._rootMenu);","","		if (oActiveMenu) {","","			//	Focus the label element for the topmost submenu","			oSubmenu = menuNav._getTopmostSubmenu(oActiveMenu);","			menuNav._focusItem(oSubmenu.previous());","","		}","	","	},","","","	/**","	* @method _onMenuMouseOut","	* @description \"mouseout\" event handler for a menu.","	* @protected","	* @param {Node} menu Node instance representing a menu.","	* @param {Object} event Object representing the DOM event.","	*/","	_onMenuMouseOut: function (menu, event) {","","		var menuNav = this,","			oActiveMenu = menuNav._activeMenu,","			oRelatedTarget = event.relatedTarget,","			oActiveItem = menuNav._activeItem,","			oParentMenu,","			oMenu;","","","		if (oActiveMenu && !oActiveMenu.contains(oRelatedTarget)) {","		","			oParentMenu = getParentMenu(oActiveMenu);","			","","			if (oParentMenu && !oParentMenu.contains(oRelatedTarget)) {","","				if (menuNav.get(MOUSEOUT_HIDE_DELAY) > 0) {","","					menuNav._cancelShowSubmenuTimer();","","					menuNav._hideAllSubmenusTimer = ","","						later(menuNav.get(MOUSEOUT_HIDE_DELAY), ","							menuNav, menuNav._hideAndFocusLabel);","						","				}","			","			}","			else {","			","				if (oActiveItem) {","				","					oMenu = getParentMenu(oActiveItem);","","					if (!menuNav._isRoot(oMenu)) { ","						menuNav._focusItem(oMenu.previous());","					}","				","				}","			","			}","","		}","","	},","","","	/**","	* @method _onMenuLabelMouseOver","	* @description \"mouseover\" event handler for a menu label.","	* @protected","	* @param {Node} menuLabel Node instance representing a menu label.","	* @param {Object} event Object representing the DOM event.","	*/","	_onMenuLabelMouseOver: function (menuLabel, event) {","","		var menuNav = this,","			oActiveMenu = menuNav._activeMenu,","			bIsRoot = menuNav._isRoot(oActiveMenu),","			bUseAutoSubmenuDisplay = ","				(menuNav.get(AUTO_SUBMENU_DISPLAY) && bIsRoot || !bIsRoot),","            submenuShowDelay = menuNav.get(\"submenuShowDelay\"),	","			oSubmenu;","				","","        var showSubmenu = function (delay) {","","			menuNav._cancelHideSubmenuTimer();","			menuNav._cancelShowSubmenuTimer();","","			if (!hasVisibleSubmenu(menuLabel)) {","","				oSubmenu = menuLabel.next();","","				if (oSubmenu) {","					menuNav._hideAllSubmenus(oActiveMenu);","					menuNav._showSubmenuTimer = later(delay, menuNav, menuNav._showMenu, oSubmenu);","				}","","			}","            ","        };","","","		menuNav._focusItem(menuLabel);","		menuNav._setActiveItem(menuLabel);","","","		if (bUseAutoSubmenuDisplay) {","	","	        if (menuNav._movingToSubmenu) {","	            ","	            //  If the user is moving diagonally from a submenu to ","	            //  another submenu and they then stop and pause on a","	            //  menu label for an amount of time equal to the amount of ","	            //  time defined for the display of a submenu then show the ","	            //  submenu immediately.","	            //  http://yuilibrary.com/projects/yui3/ticket/2528316","	            ","	            //Y.message(\"Pause path\");","	            ","	            menuNav._hoverTimer = later(submenuShowDelay, menuNav, function () {","                    showSubmenu(0);","	            });","	            ","	        }","	        else {","                showSubmenu(submenuShowDelay);","	        }","		","		}","","	},","","","	/**","	* @method _onMenuLabelMouseOut","	* @description \"mouseout\" event handler for a menu label.","	* @protected","	* @param {Node} menuLabel Node instance representing a menu label.","	* @param {Object} event Object representing the DOM event.","	*/","	_onMenuLabelMouseOut: function (menuLabel, event) {","","		var menuNav = this,","			bIsRoot = menuNav._isRoot(menuNav._activeMenu),","			bUseAutoSubmenuDisplay = ","				(menuNav.get(AUTO_SUBMENU_DISPLAY) && bIsRoot || !bIsRoot),","","			oRelatedTarget = event.relatedTarget,","			oSubmenu = menuLabel.next(),","			hoverTimer = menuNav._hoverTimer;","","        if (hoverTimer) {","            hoverTimer.cancel();","        }","","		menuNav._clearActiveItem();","","		if (bUseAutoSubmenuDisplay) {","","			if (menuNav._movingToSubmenu && ","					!menuNav._showSubmenuTimer && oSubmenu) {","","				//	If the mouse is moving diagonally toward the submenu and ","				//	another submenu isn't in the process of being displayed ","				//	(via a timer), then hide the submenu via a timer to give","				//	the user some time to reach the submenu.","			","				menuNav._hideSubmenuTimer = ","					later(menuNav.get(\"submenuHideDelay\"), menuNav, ","						menuNav._hideMenu, oSubmenu);","			","			}","			else if (!menuNav._movingToSubmenu && oSubmenu && (!oRelatedTarget || ","			        (oRelatedTarget && ","			            !oSubmenu.contains(oRelatedTarget) && ","			            !oRelatedTarget.compareTo(oSubmenu)))) {","","				//	If the mouse is not moving toward the submenu, cancel any ","				//	submenus that might be in the process of being displayed ","				//	(via a timer) and hide this submenu immediately.","","				menuNav._cancelShowSubmenuTimer();","","				menuNav._hideMenu(oSubmenu);","","			}","","		}","","	},","	","","	/**","	* @method _onMenuItemMouseOver","	* @description \"mouseover\" event handler for a menuitem.","	* @protected","	* @param {Node} menuItem Node instance representing a menuitem.","	* @param {Object} event Object representing the DOM event.","	*/","	_onMenuItemMouseOver: function (menuItem, event) {","","		var menuNav = this,","			oActiveMenu = menuNav._activeMenu,","			bIsRoot = menuNav._isRoot(oActiveMenu),","			bUseAutoSubmenuDisplay = ","				(menuNav.get(AUTO_SUBMENU_DISPLAY) && bIsRoot || !bIsRoot);","","","		menuNav._focusItem(menuItem);","		menuNav._setActiveItem(menuItem);","","","		if (bUseAutoSubmenuDisplay && !menuNav._movingToSubmenu) {","","			menuNav._hideAllSubmenus(oActiveMenu);","","		}","","	},","	","","	/**","	* @method _onMenuItemMouseOut","	* @description \"mouseout\" event handler for a menuitem.","	* @protected","	* @param {Node} menuItem Node instance representing a menuitem.","	* @param {Object} event Object representing the DOM event.","	*/","	_onMenuItemMouseOut: function (menuItem, event) {","","		this._clearActiveItem();","","	},","","","	/**","	* @method _onVerticalMenuKeyDown","	* @description \"keydown\" event handler for vertical menus.","	* @protected","	* @param {Object} event Object representing the DOM event.","	*/","	_onVerticalMenuKeyDown: function (event) {","","		var menuNav = this,","			oActiveMenu = menuNav._activeMenu,","			oRootMenu = menuNav._rootMenu,","			oTarget = event.target,","			bPreventDefault = false,","			nKeyCode = event.keyCode,","			oSubmenu,","			oParentMenu,","			oLI,","			oItem;","","","		switch (nKeyCode) {","","			case 37:	//	left arrow","","				oParentMenu = getParentMenu(oActiveMenu);","","				if (oParentMenu && isHorizontalMenu(oParentMenu)) {","				","					menuNav._hideMenu(oActiveMenu);","					oLI = getPreviousSibling(oActiveMenu.get(PARENT_NODE));","					oItem = getItem(oLI);","					","					if (oItem) {","","						if (isMenuLabel(oItem)) {	//	Menu label","						","							oSubmenu = oItem.next();","						","","							if (oSubmenu) {","","								menuNav._showMenu(oSubmenu);","								menuNav._focusItem(getFirstItem(oSubmenu));","								menuNav._setActiveItem(getFirstItem(oSubmenu));","","							}","							else {","	","								menuNav._focusItem(oItem);","								menuNav._setActiveItem(oItem);","	","							}","						","						}","						else {	//	MenuItem","","							menuNav._focusItem(oItem);","							menuNav._setActiveItem(oItem);","","						}","					","					}","","				}","				else if (!menuNav._isRoot(oActiveMenu)) {","					menuNav._hideMenu(oActiveMenu, true);","				}","","","				bPreventDefault = true;","","			break;","","			case 39:	//	right arrow","","				if (isMenuLabel(oTarget)) {","					","					oSubmenu = oTarget.next();","","					if (oSubmenu) {","","						menuNav._showMenu(oSubmenu);","						menuNav._focusItem(getFirstItem(oSubmenu));","						menuNav._setActiveItem(getFirstItem(oSubmenu));","","					}","				","				}","				else if (isHorizontalMenu(oRootMenu)) {","","					oSubmenu = menuNav._getTopmostSubmenu(oActiveMenu);","					oLI = getNextSibling(oSubmenu.get(PARENT_NODE));","					oItem = getItem(oLI);","","					menuNav._hideAllSubmenus(oRootMenu);","","					if (oItem) {","","						if (isMenuLabel(oItem)) {	//	Menu label","","							oSubmenu = oItem.next();","","							if (oSubmenu) {","","								menuNav._showMenu(oSubmenu);","								menuNav._focusItem(getFirstItem(oSubmenu));","								menuNav._setActiveItem(getFirstItem(oSubmenu));","","							}","							else {","","								menuNav._focusItem(oItem);","								menuNav._setActiveItem(oItem);	","","							}","						","						}","						else {	//	MenuItem","","							menuNav._focusItem(oItem);","							menuNav._setActiveItem(oItem);","","						}							","","					}","				","				}","","				bPreventDefault = true;","","			break;","","		}	","","","		if (bPreventDefault) {","","			//	Prevent the browser from scrolling the window","","			event.preventDefault();			","","		}","	","	},","	","","	/**","	* @method _onHorizontalMenuKeyDown","	* @description \"keydown\" event handler for horizontal menus.","	* @protected","	* @param {Object} event Object representing the DOM event.","	*/","	_onHorizontalMenuKeyDown: function (event) {","","		var menuNav = this,","			oActiveMenu = menuNav._activeMenu,","			oTarget = event.target,","			oFocusedItem = getItem(oTarget, true),","			bPreventDefault = false,","			nKeyCode = event.keyCode,","			oSubmenu;","","","		if (nKeyCode === 40) {","","			menuNav._hideAllSubmenus(oActiveMenu);","","			if (isMenuLabel(oFocusedItem)) {","			","				oSubmenu = oFocusedItem.next();","","				if (oSubmenu) {","","					menuNav._showMenu(oSubmenu);","					menuNav._focusItem(getFirstItem(oSubmenu));","					menuNav._setActiveItem(getFirstItem(oSubmenu));","","				}","","				bPreventDefault = true;","			","			}","","		}		","","","		if (bPreventDefault) {","","			//	Prevent the browser from scrolling the window","","			event.preventDefault();			","","		}","	","	},","","","	//	Generic DOM Event handlers","","","	/**","	* @method _onMouseMove","	* @description \"mousemove\" event handler for the menu.","	* @protected","	* @param {Object} event Object representing the DOM event.","	*/","	_onMouseMove: function (event) {","","		var menuNav = this;","","		//	Using a timer to set the value of the \"_currentMouseX\" property ","		//	helps improve the reliability of the calculation used to set the ","		//	value of the \"_movingToSubmenu\" property - especially in Opera.","","		later(10, menuNav, function () {","","			menuNav._currentMouseX = event.pageX;","		","		});","	","	},","","","	/**","	* @method _onMouseOver","	* @description \"mouseover\" event handler for the menu.","	* @protected","	* @param {Object} event Object representing the DOM event.","	*/","	_onMouseOver: function (event) {","","		var menuNav = this,","			oTarget,","			oMenu,","			oMenuLabel,","			oParentMenu,","			oMenuItem;","","","		if (menuNav._blockMouseEvent) {","			menuNav._blockMouseEvent = false;","		}","		else {","","			oTarget = event.target;","			oMenu = getMenu(oTarget, true);","			oMenuLabel = getMenuLabel(oTarget, true);","			oMenuItem = getMenuItem(oTarget, true);","","","			if (handleMouseOverForNode(oMenu, oTarget)) {","","				menuNav._onMenuMouseOver(oMenu, event);","","				oMenu[HANDLED_MOUSEOVER] = true;","				oMenu[HANDLED_MOUSEOUT] = false;","","				oParentMenu = getParentMenu(oMenu);","","				if (oParentMenu) {","","					oParentMenu[HANDLED_MOUSEOUT] = true;","					oParentMenu[HANDLED_MOUSEOVER] = false;","		","				}","			","			}","","			if (handleMouseOverForNode(oMenuLabel, oTarget)) {","","				menuNav._onMenuLabelMouseOver(oMenuLabel, event);","","				oMenuLabel[HANDLED_MOUSEOVER] = true;","				oMenuLabel[HANDLED_MOUSEOUT] = false;","	","			}","","			if (handleMouseOverForNode(oMenuItem, oTarget)) {","	","				menuNav._onMenuItemMouseOver(oMenuItem, event);","","				oMenuItem[HANDLED_MOUSEOVER] = true;","				oMenuItem[HANDLED_MOUSEOUT] = false;","				","			}","","		}","","	},","","","	/**","	* @method _onMouseOut","	* @description \"mouseout\" event handler for the menu.","	* @protected","	* @param {Object} event Object representing the DOM event.","	*/","	_onMouseOut: function (event) {","			","		var menuNav = this,","			oActiveMenu = menuNav._activeMenu,","			bMovingToSubmenu = false,","			oTarget,","			oRelatedTarget,","			oMenu,","			oMenuLabel,","			oSubmenu,","			oMenuItem;","","","		menuNav._movingToSubmenu = ","					(oActiveMenu && !isHorizontalMenu(oActiveMenu) && ","						((event.pageX - 5) > menuNav._currentMouseX));","		","		oTarget = event.target;","		oRelatedTarget = event.relatedTarget;","		oMenu = getMenu(oTarget, true);","		oMenuLabel = getMenuLabel(oTarget, true);","		oMenuItem = getMenuItem(oTarget, true);","","","		if (handleMouseOutForNode(oMenuLabel, oRelatedTarget)) {","","			menuNav._onMenuLabelMouseOut(oMenuLabel, event);","","			oMenuLabel[HANDLED_MOUSEOUT] = true;","			oMenuLabel[HANDLED_MOUSEOVER] = false;","","		}","","		if (handleMouseOutForNode(oMenuItem, oRelatedTarget)) {","","			menuNav._onMenuItemMouseOut(oMenuItem, event);","","			oMenuItem[HANDLED_MOUSEOUT] = true;","			oMenuItem[HANDLED_MOUSEOVER] = false;","			","		}","","","		if (oMenuLabel) {","","			oSubmenu = oMenuLabel.next();","","			if (oSubmenu && oRelatedTarget && ","				(oRelatedTarget.compareTo(oSubmenu) || ","					oSubmenu.contains(oRelatedTarget))) {","","				bMovingToSubmenu = true;","","			}","		","		}","		","","		if (handleMouseOutForNode(oMenu, oRelatedTarget) || bMovingToSubmenu) {","","			menuNav._onMenuMouseOut(oMenu, event);				","","			oMenu[HANDLED_MOUSEOUT] = true;","			oMenu[HANDLED_MOUSEOVER] = false;","		","		}","	","	},","","","	/**","	* @method _toggleSubmenuDisplay","	* @description \"mousedown,\" \"keydown,\" and \"click\" event handler for the ","	* menu used to toggle the display of a submenu.","	* @protected","	* @param {Object} event Object representing the DOM event.","	*/","	_toggleSubmenuDisplay: function (event) {","","		var menuNav = this,","			oTarget = event.target,","			oMenuLabel = getMenuLabel(oTarget, true),","			sType = event.type,","			oAnchor,","			oSubmenu,","			sHref,","			nHashPos,","			nLen,","			sId;","","","		if (oMenuLabel) {","","			oAnchor = isAnchor(oTarget) ? oTarget : oTarget.ancestor(isAnchor);","			","","			if (oAnchor) {","","				//	Need to pass \"2\" as a second argument to \"getAttribute\" for ","				//	IE otherwise IE will return a fully qualified URL for the ","				//	value of the \"href\" attribute.","				//	http://msdn.microsoft.com/en-us/library/ms536429(VS.85).aspx","","				sHref = oAnchor.getAttribute(\"href\", 2);","				nHashPos = sHref.indexOf(\"#\");","				nLen = sHref.length;","","				if (nHashPos === 0 && nLen > 1) {","","					sId = sHref.substr(1, nLen);","					oSubmenu = oMenuLabel.next();","","					if (oSubmenu && (oSubmenu.get(ID) === sId)) {","","						if (sType === MOUSEDOWN || sType === KEYDOWN) {","							","							if ((UA.opera || UA.gecko || UA.ie) && sType === KEYDOWN && !menuNav._preventClickHandle) {","","								//	Prevent the browser from following the URL of ","								//	the anchor element","","								menuNav._preventClickHandle = menuNav._rootMenu.on(\"click\", function (event) {","","									event.preventDefault();","","									menuNav._preventClickHandle.detach();","									menuNav._preventClickHandle = null;","","								});","","							}","							","							if (sType == MOUSEDOWN) {","","								//	Prevent the target from getting focused by ","								//	default, since the element to be focused will","								//	be determined by weather or not the submenu","								//	is visible.","								event.preventDefault();","","								//	FocusManager will attempt to focus any ","								//	descendant that is the target of the mousedown","								//	event.  Since we want to explicitly control ","	 							//	where focus is going, we need to call ","								//	\"stopImmediatePropagation\" to stop the ","								//	FocusManager from doing its thing.","								event.stopImmediatePropagation();	","","								//	The \"_focusItem\" method relies on the ","								//	\"_hasFocus\" property being set to true.  The","								//	\"_hasFocus\" property is normally set via a ","								//	\"focus\" event listener, but since we've ","								//	blocked focus from happening, we need to set ","								//	this property manually.","								menuNav._hasFocus = true;","","							}","","								","							if (menuNav._isRoot(getParentMenu(oTarget))) {	//	Event target is a submenu label in the root menu","							","								//	Menu label toggle functionality","							","								if (hasVisibleSubmenu(oMenuLabel)) {","							","									menuNav._hideMenu(oSubmenu);","									menuNav._focusItem(oMenuLabel);	","									menuNav._setActiveItem(oMenuLabel);","									","								}","								else {","							","									menuNav._hideAllSubmenus(menuNav._rootMenu);","									menuNav._showMenu(oSubmenu);","","									menuNav._focusItem(getFirstItem(oSubmenu));","									menuNav._setActiveItem(getFirstItem(oSubmenu));","									","								}","							","							}","							else {	//	Event target is a submenu label within a submenu","							","								if (menuNav._activeItem == oMenuLabel) {","							","									menuNav._showMenu(oSubmenu);","									menuNav._focusItem(getFirstItem(oSubmenu));","									menuNav._setActiveItem(getFirstItem(oSubmenu));										","							","								}","								else {","							","									if (!oMenuLabel._clickHandle) {","","										oMenuLabel._clickHandle = oMenuLabel.on(\"click\", function () {","","											menuNav._hideAllSubmenus(menuNav._rootMenu);","","											menuNav._hasFocus = false;","											menuNav._clearActiveItem();","","","											oMenuLabel._clickHandle.detach();","											","											oMenuLabel._clickHandle = null;","","										});","										","									}","									","								}","								","							}","","						}","","","						if (sType === CLICK) {","						","							//	Prevent the browser from following the URL of ","							//	the anchor element","							","							event.preventDefault();","						","						}","					","					}","				","				}				","","","			}","		","		}","	","	},","	","","	/**","	* @method _onKeyPress","	* @description \"keypress\" event handler for the menu.","	* @protected","	* @param {Object} event Object representing the DOM event.","	*/","	_onKeyPress: function (event) {","	","		switch (event.keyCode) {","","			case 37:	//	left arrow","			case 38:	//	up arrow","			case 39:	//	right arrow","			case 40:	//	down arrow","","				//	Prevent the browser from scrolling the window","","				event.preventDefault();","","			break;","","		}						","","	},	","","","	/**","	* @method _onKeyDown","	* @description \"keydown\" event handler for the menu.","	* @protected","	* @param {Object} event Object representing the DOM event.","	*/","	_onKeyDown: function (event) {","","		var menuNav = this,","			oActiveItem = menuNav._activeItem,","			oTarget = event.target,","			oActiveMenu = getParentMenu(oTarget),","			oSubmenu;","","		if (oActiveMenu) {","","			menuNav._activeMenu = oActiveMenu;","","			if (isHorizontalMenu(oActiveMenu)) {","				menuNav._onHorizontalMenuKeyDown(event);","			}","			else {","				menuNav._onVerticalMenuKeyDown(event);","			}","","","			if (event.keyCode === 27) {","","				if (!menuNav._isRoot(oActiveMenu)) {","","					if (UA.opera) {","						later(0, menuNav, function () {","							menuNav._hideMenu(oActiveMenu, true);","						});						","					}","					else {","						menuNav._hideMenu(oActiveMenu, true);						","					}","","					event.stopPropagation();","					menuNav._blockMouseEvent = UA.gecko ? true : false;","","				}","				else if (oActiveItem) {","","					if (isMenuLabel(oActiveItem) && ","							hasVisibleSubmenu(oActiveItem)) {","					","						oSubmenu = oActiveItem.next();","","						if (oSubmenu) {","							menuNav._hideMenu(oSubmenu);","						}","","					}","					else {","","						menuNav._focusManager.blur();","","						//	This is necessary for Webkit since blurring the ","						//	active menuitem won't result in the document ","						//	gaining focus, meaning the that _onDocFocus ","						//	listener won't clear the active menuitem.","","						menuNav._clearActiveItem();	","						","						menuNav._hasFocus = false;","","					}","","				}","			","			}","		","		}","	","	},","	","	/**","	* @method _onDocMouseDown","	* @description \"mousedown\" event handler for the owner document of ","	* the menu.","	* @protected","	* @param {Object} event Object representing the DOM event.","	*/","	_onDocMouseDown: function (event) {","","		var menuNav = this,","			oRoot = menuNav._rootMenu,","			oTarget = event.target;","","","		if (!(oRoot.compareTo(oTarget) || oRoot.contains(oTarget))) {","","			menuNav._hideAllSubmenus(oRoot);","","			//	Document doesn't receive focus in Webkit when the user mouses ","			//	down on it, so the \"_hasFocus\" property won't get set to the ","			//	correct value.  The following line corrects the problem.","","			if (UA.webkit) {","				menuNav._hasFocus = false;","				menuNav._clearActiveItem();","			}","","		}","","	}","	","});","","","Y.namespace('Plugin');","","Y.Plugin.NodeMenuNav = NodeMenuNav;","","","}, '@VERSION@', {\"requires\": [\"node\", \"classnamemanager\", \"plugin\", \"node-focusmanager\"], \"skinnable\": true});"];
_yuitest_coverage["build/node-menunav/node-menunav.js"].lines = {"1":0,"90":0,"161":0,"163":0,"166":0,"167":0,"168":0,"172":0,"177":0,"179":0,"181":0,"182":0,"185":0,"190":0,"192":0,"194":0,"195":0,"198":0,"203":0,"205":0,"210":0,"212":0,"217":0,"219":0,"224":0,"226":0,"231":0,"233":0,"238":0,"240":0,"242":0,"244":0,"245":0,"248":0,"249":0,"254":0,"259":0,"261":0,"266":0,"268":0,"273":0,"275":0,"277":0,"278":0,"281":0,"286":0,"288":0,"290":0,"292":0,"293":0,"296":0,"302":0,"307":0,"309":0,"311":0,"312":0,"316":0,"321":0,"323":0,"328":0,"330":0,"335":0,"337":0,"343":0,"345":0,"357":0,"359":0,"363":0,"364":0,"375":0,"404":0,"410":0,"429":0,"435":0,"437":0,"439":0,"441":0,"443":0,"445":0,"446":0,"448":0,"449":0,"450":0,"453":0,"454":0,"456":0,"458":0,"460":0,"462":0,"463":0,"465":0,"466":0,"469":0,"471":0,"472":0,"475":0,"476":0,"564":0,"697":0,"703":0,"705":0,"707":0,"711":0,"716":0,"717":0,"718":0,"719":0,"720":0,"721":0,"722":0,"723":0,"725":0,"727":0,"728":0,"730":0,"732":0,"741":0,"743":0,"745":0,"746":0,"749":0,"753":0,"772":0,"786":0,"791":0,"792":0,"794":0,"795":0,"798":0,"801":0,"813":0,"816":0,"817":0,"820":0,"834":0,"836":0,"838":0,"840":0,"842":0,"857":0,"861":0,"863":0,"864":0,"866":0,"867":0,"868":0,"871":0,"886":0,"891":0,"892":0,"896":0,"897":0,"900":0,"903":0,"905":0,"907":0,"909":0,"910":0,"916":0,"926":0,"932":0,"933":0,"949":0,"953":0,"956":0,"957":0,"958":0,"961":0,"963":0,"964":0,"971":0,"973":0,"975":0,"976":0,"990":0,"992":0,"994":0,"1008":0,"1011":0,"1012":0,"1013":0,"1026":0,"1030":0,"1031":0,"1032":0,"1046":0,"1056":0,"1058":0,"1061":0,"1066":0,"1067":0,"1072":0,"1074":0,"1080":0,"1082":0,"1085":0,"1087":0,"1090":0,"1093":0,"1098":0,"1099":0,"1100":0,"1120":0,"1123":0,"1140":0,"1142":0,"1143":0,"1144":0,"1158":0,"1164":0,"1166":0,"1168":0,"1176":0,"1178":0,"1179":0,"1180":0,"1181":0,"1191":0,"1193":0,"1195":0,"1196":0,"1204":0,"1206":0,"1207":0,"1209":0,"1210":0,"1212":0,"1214":0,"1230":0,"1233":0,"1234":0,"1235":0,"1238":0,"1244":0,"1245":0,"1247":0,"1248":0,"1253":0,"1254":0,"1268":0,"1272":0,"1274":0,"1277":0,"1278":0,"1294":0,"1302":0,"1304":0,"1307":0,"1309":0,"1311":0,"1313":0,"1323":0,"1325":0,"1327":0,"1328":0,"1349":0,"1358":0,"1360":0,"1361":0,"1363":0,"1365":0,"1367":0,"1368":0,"1369":0,"1377":0,"1378":0,"1381":0,"1383":0,"1394":0,"1395":0,"1400":0,"1417":0,"1426":0,"1427":0,"1430":0,"1432":0,"1434":0,"1442":0,"1447":0,"1456":0,"1458":0,"1476":0,"1483":0,"1484":0,"1487":0,"1489":0,"1505":0,"1518":0,"1530":0,"1534":0,"1536":0,"1538":0,"1539":0,"1540":0,"1542":0,"1544":0,"1546":0,"1549":0,"1551":0,"1552":0,"1553":0,"1558":0,"1559":0,"1566":0,"1567":0,"1574":0,"1575":0,"1579":0,"1581":0,"1585":0,"1587":0,"1589":0,"1591":0,"1592":0,"1593":0,"1598":0,"1600":0,"1601":0,"1602":0,"1604":0,"1606":0,"1608":0,"1610":0,"1612":0,"1614":0,"1615":0,"1616":0,"1621":0,"1622":0,"1629":0,"1630":0,"1638":0,"1640":0,"1645":0,"1649":0,"1664":0,"1673":0,"1675":0,"1677":0,"1679":0,"1681":0,"1683":0,"1684":0,"1685":0,"1689":0,"1696":0,"1700":0,"1718":0,"1724":0,"1726":0,"1741":0,"1749":0,"1750":0,"1754":0,"1755":0,"1756":0,"1757":0,"1760":0,"1762":0,"1764":0,"1765":0,"1767":0,"1769":0,"1771":0,"1772":0,"1778":0,"1780":0,"1782":0,"1783":0,"1787":0,"1789":0,"1791":0,"1792":0,"1809":0,"1820":0,"1824":0,"1825":0,"1826":0,"1827":0,"1828":0,"1831":0,"1833":0,"1835":0,"1836":0,"1840":0,"1842":0,"1844":0,"1845":0,"1850":0,"1852":0,"1854":0,"1858":0,"1865":0,"1867":0,"1869":0,"1870":0,"1886":0,"1898":0,"1900":0,"1903":0,"1910":0,"1911":0,"1912":0,"1914":0,"1916":0,"1917":0,"1919":0,"1921":0,"1923":0,"1928":0,"1930":0,"1932":0,"1933":0,"1939":0,"1945":0,"1953":0,"1961":0,"1966":0,"1970":0,"1972":0,"1973":0,"1974":0,"1979":0,"1980":0,"1982":0,"1983":0,"1990":0,"1992":0,"1993":0,"1994":0,"1999":0,"2001":0,"2003":0,"2005":0,"2006":0,"2009":0,"2011":0,"2024":0,"2029":0,"2053":0,"2062":0,"2064":0,"2079":0,"2085":0,"2087":0,"2089":0,"2090":0,"2093":0,"2097":0,"2099":0,"2101":0,"2102":0,"2103":0,"2107":0,"2110":0,"2111":0,"2114":0,"2116":0,"2119":0,"2121":0,"2122":0,"2128":0,"2135":0,"2137":0,"2158":0,"2163":0,"2165":0,"2171":0,"2172":0,"2173":0,"2183":0,"2185":0};
_yuitest_coverage["build/node-menunav/node-menunav.js"].functions = {"getPreviousSibling:161":0,"getNextSibling:177":0,"isAnchor:190":0,"isMenuItem:203":0,"isMenuLabel:210":0,"isHorizontalMenu:217":0,"hasVisibleSubmenu:224":0,"getItemAnchor:231":0,"getNodeWithClass:238":0,"getParentMenu:259":0,"getMenu:266":0,"getMenuItem:273":0,"getMenuLabel:286":0,"getItem:307":0,"getFirstItem:321":0,"getActiveClass:328":0,"handleMouseOverForNode:335":0,"handleMouseOutForNode:343":0,"NodeMenuNav:357":0,"(anonymous 2):443":0,"setter:427":0,"initializer:695":0,"(anonymous 3):745":0,"destructor:739":0,"_isRoot:770":0,"_getTopmostSubmenu:784":0,"_clearActiveItem:811":0,"_setActiveItem:832":0,"_focusItem:855":0,"_showMenu:884":0,"_hideMenu:947":0,"(anonymous 4):992":0,"_hideAllSubmenus:988":0,"_cancelShowSubmenuTimer:1006":0,"_cancelHideSubmenuTimer:1024":0,"_initFocusManager:1044":0,"_onActiveDescendantChange:1118":0,"_afterActiveDescendantChange:1138":0,"_onDocFocus:1156":0,"_onMenuMouseOver:1228":0,"_hideAndFocusLabel:1266":0,"_onMenuMouseOut:1292":0,"showSubmenu:1358":0,"(anonymous 5):1394":0,"_onMenuLabelMouseOver:1347":0,"_onMenuLabelMouseOut:1415":0,"_onMenuItemMouseOver:1474":0,"_onMenuItemMouseOut:1503":0,"_onVerticalMenuKeyDown:1516":0,"_onHorizontalMenuKeyDown:1662":0,"(anonymous 6):1724":0,"_onMouseMove:1716":0,"_onMouseOver:1739":0,"_onMouseOut:1807":0,"(anonymous 7):1928":0,"(anonymous 8):2001":0,"_toggleSubmenuDisplay:1884":0,"_onKeyPress:2051":0,"(anonymous 9):2102":0,"_onKeyDown:2077":0,"_onDocMouseDown:2156":0,"(anonymous 1):1":0};
_yuitest_coverage["build/node-menunav/node-menunav.js"].coveredLines = 472;
_yuitest_coverage["build/node-menunav/node-menunav.js"].coveredFunctions = 62;
_yuitest_coverline("build/node-menunav/node-menunav.js", 1);
YUI.add('node-menunav', function (Y, NAME) {

/**
* <p>The MenuNav Node Plugin makes it easy to transform existing list-based 
* markup into traditional, drop down navigational menus that are both accessible 
* and easy to customize, and only require a small set of dependencies.</p>
* 
* 
* <p>To use the MenuNav Node Plugin, simply pass a reference to the plugin to a 
* Node instance's <code>plug</code> method.</p>
* 
* <p>
* <code>
* &#60;script type="text/javascript"&#62; <br>
* <br>
* 		//	Call the "use" method, passing in "node-menunav".  This will <br>
* 		//	load the script and CSS for the MenuNav Node Plugin and all of <br>
* 		//	the required dependencies. <br>
* <br>
* 		YUI().use("node-menunav", function(Y) { <br>
* <br>
* 			//	Use the "contentready" event to initialize the menu when <br>
* 			//	the subtree of element representing the root menu <br>
* 			//	(&#60;div id="menu-1"&#62;) is ready to be scripted. <br>
* <br>
* 			Y.on("contentready", function () { <br>
* <br>
* 				//	The scope of the callback will be a Node instance <br>
* 				//	representing the root menu (&#60;div id="menu-1"&#62;). <br>
* 				//	Therefore, since "this" represents a Node instance, it <br>
* 				//	is possible to just call "this.plug" passing in a <br>
*				//	reference to the MenuNav Node Plugin. <br>
* <br>
* 				this.plug(Y.Plugin.NodeMenuNav); <br>
* <br>
* 			}, "#menu-1"); <br>
* <br>		
* 		}); <br>
* <br>	
* 	&#60;/script&#62; <br>
* </code>
* </p>
*
* <p>The MenuNav Node Plugin has several configuration properties that can be 
* set via an object literal that is passed as a second argument to a Node 
* instance's <code>plug</code> method.
* </p>
*
* <p>
* <code>
* &#60;script type="text/javascript"&#62; <br>
* <br>
* 		//	Call the "use" method, passing in "node-menunav".  This will <br>
* 		//	load the script and CSS for the MenuNav Node Plugin and all of <br>
* 		//	the required dependencies. <br>
* <br>
* 		YUI().use("node-menunav", function(Y) { <br>
* <br>
* 			//	Use the "contentready" event to initialize the menu when <br>
* 			//	the subtree of element representing the root menu <br>
* 			//	(&#60;div id="menu-1"&#62;) is ready to be scripted. <br>
* <br>
* 			Y.on("contentready", function () { <br>
* <br>
* 				//	The scope of the callback will be a Node instance <br>
* 				//	representing the root menu (&#60;div id="menu-1"&#62;). <br>
* 				//	Therefore, since "this" represents a Node instance, it <br>
* 				//	is possible to just call "this.plug" passing in a <br>
*				//	reference to the MenuNav Node Plugin. <br>
* <br>
* 				this.plug(Y.Plugin.NodeMenuNav, { mouseOutHideDelay: 1000 });
* <br><br>
* 			}, "#menu-1"); <br>
* <br>		
* 		}); <br>
* <br>	
* 	&#60;/script&#62; <br>
* </code>
* </p>
* 
DEPRECATED. The MenuNav Node Plugin has been deprecated as of YUI 3.9.0. This module will be removed from the library in a future version. If you require functionality similar to the one provided by this module, consider taking a look at the various modules in the YUI Gallery <http://yuilibrary.com/gallery/>. 

@module node-menunav
@deprecated 3.9.0
*/


	//	Util shortcuts

_yuitest_coverfunc("build/node-menunav/node-menunav.js", "(anonymous 1)", 1);
_yuitest_coverline("build/node-menunav/node-menunav.js", 90);
var UA = Y.UA,
	later = Y.later,
	getClassName = Y.ClassNameManager.getClassName,



	//	Frequently used strings

	MENU = "menu",
	MENUITEM = "menuitem",
	HIDDEN = "hidden",
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
	ROLE = "role",
	PRESENTATION = "presentation",
	DESCENDANTS = "descendants",
	UI = "UI",
	ACTIVE_DESCENDANT = "activeDescendant",
	USE_ARIA = "useARIA",
	ARIA_HIDDEN = "aria-hidden",
	CONTENT = "content",
	HOST = "host",
	ACTIVE_DESCENDANT_CHANGE = ACTIVE_DESCENDANT + "Change",


	//	Attribute keys
	
	AUTO_SUBMENU_DISPLAY = "autoSubmenuDisplay",
	MOUSEOUT_HIDE_DELAY = "mouseOutHideDelay",


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
	
	MENU_SELECTOR = PERIOD + CSS_MENU,
	MENU_TOGGLE_SELECTOR = (PERIOD + getClassName(MENU, "toggle")),
    MENU_CONTENT_SELECTOR = PERIOD + getClassName(MENU, CONTENT),
    MENU_LABEL_SELECTOR = PERIOD + CSS_MENU_LABEL,

	STANDARD_QUERY = ">" + MENU_CONTENT_SELECTOR + ">ul>li>a",
	EXTENDED_QUERY = ">" + MENU_CONTENT_SELECTOR + ">ul>li>" + MENU_LABEL_SELECTOR + ">a:first-child";

//	Utility functions


_yuitest_coverline("build/node-menunav/node-menunav.js", 161);
var getPreviousSibling = function (node) {

	_yuitest_coverfunc("build/node-menunav/node-menunav.js", "getPreviousSibling", 161);
_yuitest_coverline("build/node-menunav/node-menunav.js", 163);
var oPrevious = node.previous(),
		oChildren;

	_yuitest_coverline("build/node-menunav/node-menunav.js", 166);
if (!oPrevious) {
		_yuitest_coverline("build/node-menunav/node-menunav.js", 167);
oChildren = node.get(PARENT_NODE).get(CHILDREN);
		_yuitest_coverline("build/node-menunav/node-menunav.js", 168);
oPrevious = oChildren.item(oChildren.size() - 1);
	}
	
	
	_yuitest_coverline("build/node-menunav/node-menunav.js", 172);
return oPrevious;

};


_yuitest_coverline("build/node-menunav/node-menunav.js", 177);
var getNextSibling = function (node) {

	_yuitest_coverfunc("build/node-menunav/node-menunav.js", "getNextSibling", 177);
_yuitest_coverline("build/node-menunav/node-menunav.js", 179);
var oNext = node.next();

	_yuitest_coverline("build/node-menunav/node-menunav.js", 181);
if (!oNext) {
		_yuitest_coverline("build/node-menunav/node-menunav.js", 182);
oNext = node.get(PARENT_NODE).get(CHILDREN).item(0);		
	}
	
	_yuitest_coverline("build/node-menunav/node-menunav.js", 185);
return oNext;

};


_yuitest_coverline("build/node-menunav/node-menunav.js", 190);
var isAnchor = function (node) {
	
	_yuitest_coverfunc("build/node-menunav/node-menunav.js", "isAnchor", 190);
_yuitest_coverline("build/node-menunav/node-menunav.js", 192);
var bReturnVal = false;
	
	_yuitest_coverline("build/node-menunav/node-menunav.js", 194);
if (node) {
		_yuitest_coverline("build/node-menunav/node-menunav.js", 195);
bReturnVal = node.get("nodeName").toLowerCase() === LOWERCASE_A;
	}
	
	_yuitest_coverline("build/node-menunav/node-menunav.js", 198);
return bReturnVal;
	
};


_yuitest_coverline("build/node-menunav/node-menunav.js", 203);
var isMenuItem = function (node) {
	
	_yuitest_coverfunc("build/node-menunav/node-menunav.js", "isMenuItem", 203);
_yuitest_coverline("build/node-menunav/node-menunav.js", 205);
return node.hasClass(CSS_MENUITEM);

};


_yuitest_coverline("build/node-menunav/node-menunav.js", 210);
var isMenuLabel = function (node) {
	
	_yuitest_coverfunc("build/node-menunav/node-menunav.js", "isMenuLabel", 210);
_yuitest_coverline("build/node-menunav/node-menunav.js", 212);
return node.hasClass(CSS_MENU_LABEL);

};


_yuitest_coverline("build/node-menunav/node-menunav.js", 217);
var isHorizontalMenu = function (menu) {
	
	_yuitest_coverfunc("build/node-menunav/node-menunav.js", "isHorizontalMenu", 217);
_yuitest_coverline("build/node-menunav/node-menunav.js", 219);
return menu.hasClass(CSS_MENU_HORIZONTAL);

};


_yuitest_coverline("build/node-menunav/node-menunav.js", 224);
var hasVisibleSubmenu = function (menuLabel) {
	
	_yuitest_coverfunc("build/node-menunav/node-menunav.js", "hasVisibleSubmenu", 224);
_yuitest_coverline("build/node-menunav/node-menunav.js", 226);
return menuLabel.hasClass(CSS_MENU_LABEL_MENUVISIBLE);

};


_yuitest_coverline("build/node-menunav/node-menunav.js", 231);
var getItemAnchor = function (node) {
	
	_yuitest_coverfunc("build/node-menunav/node-menunav.js", "getItemAnchor", 231);
_yuitest_coverline("build/node-menunav/node-menunav.js", 233);
return isAnchor(node) ? node : node.one(LOWERCASE_A);

};


_yuitest_coverline("build/node-menunav/node-menunav.js", 238);
var getNodeWithClass = function (node, className, searchAncestors) {
	
	_yuitest_coverfunc("build/node-menunav/node-menunav.js", "getNodeWithClass", 238);
_yuitest_coverline("build/node-menunav/node-menunav.js", 240);
var oItem;
	
	_yuitest_coverline("build/node-menunav/node-menunav.js", 242);
if (node) {
		
		_yuitest_coverline("build/node-menunav/node-menunav.js", 244);
if (node.hasClass(className)) {
			_yuitest_coverline("build/node-menunav/node-menunav.js", 245);
oItem = node;
		}
		
		_yuitest_coverline("build/node-menunav/node-menunav.js", 248);
if (!oItem && searchAncestors) {
			_yuitest_coverline("build/node-menunav/node-menunav.js", 249);
oItem = node.ancestor((PERIOD + className));
		}
	
	}
	
	_yuitest_coverline("build/node-menunav/node-menunav.js", 254);
return oItem;

};


_yuitest_coverline("build/node-menunav/node-menunav.js", 259);
var getParentMenu = function (node) {
	
	_yuitest_coverfunc("build/node-menunav/node-menunav.js", "getParentMenu", 259);
_yuitest_coverline("build/node-menunav/node-menunav.js", 261);
return node.ancestor(MENU_SELECTOR);
	
};


_yuitest_coverline("build/node-menunav/node-menunav.js", 266);
var getMenu = function (node, searchAncestors) {
	
	_yuitest_coverfunc("build/node-menunav/node-menunav.js", "getMenu", 266);
_yuitest_coverline("build/node-menunav/node-menunav.js", 268);
return getNodeWithClass(node, CSS_MENU, searchAncestors);

};


_yuitest_coverline("build/node-menunav/node-menunav.js", 273);
var getMenuItem = function (node, searchAncestors) {

	_yuitest_coverfunc("build/node-menunav/node-menunav.js", "getMenuItem", 273);
_yuitest_coverline("build/node-menunav/node-menunav.js", 275);
var oItem;
	
	_yuitest_coverline("build/node-menunav/node-menunav.js", 277);
if (node) {
		_yuitest_coverline("build/node-menunav/node-menunav.js", 278);
oItem = getNodeWithClass(node, CSS_MENUITEM, searchAncestors);
	}
	
	_yuitest_coverline("build/node-menunav/node-menunav.js", 281);
return oItem;

};


_yuitest_coverline("build/node-menunav/node-menunav.js", 286);
var getMenuLabel = function (node, searchAncestors) {

	_yuitest_coverfunc("build/node-menunav/node-menunav.js", "getMenuLabel", 286);
_yuitest_coverline("build/node-menunav/node-menunav.js", 288);
var oItem;
	
	_yuitest_coverline("build/node-menunav/node-menunav.js", 290);
if (node) {
	
		_yuitest_coverline("build/node-menunav/node-menunav.js", 292);
if (searchAncestors) {
			_yuitest_coverline("build/node-menunav/node-menunav.js", 293);
oItem = getNodeWithClass(node, CSS_MENU_LABEL, searchAncestors);
		}
		else {
			_yuitest_coverline("build/node-menunav/node-menunav.js", 296);
oItem = getNodeWithClass(node, CSS_MENU_LABEL) || 
				node.one((PERIOD + CSS_MENU_LABEL));
		}
		
	}
	
	_yuitest_coverline("build/node-menunav/node-menunav.js", 302);
return oItem;

};


_yuitest_coverline("build/node-menunav/node-menunav.js", 307);
var getItem = function (node, searchAncestors) {

	_yuitest_coverfunc("build/node-menunav/node-menunav.js", "getItem", 307);
_yuitest_coverline("build/node-menunav/node-menunav.js", 309);
var oItem;
	
	_yuitest_coverline("build/node-menunav/node-menunav.js", 311);
if (node) {
		_yuitest_coverline("build/node-menunav/node-menunav.js", 312);
oItem = getMenuItem(node, searchAncestors) || 
			getMenuLabel(node, searchAncestors);
	}
	
	_yuitest_coverline("build/node-menunav/node-menunav.js", 316);
return oItem;	

};


_yuitest_coverline("build/node-menunav/node-menunav.js", 321);
var getFirstItem = function (menu) {
	
	_yuitest_coverfunc("build/node-menunav/node-menunav.js", "getFirstItem", 321);
_yuitest_coverline("build/node-menunav/node-menunav.js", 323);
return getItem(menu.one("li"));

};


_yuitest_coverline("build/node-menunav/node-menunav.js", 328);
var getActiveClass = function (node) {
	
	_yuitest_coverfunc("build/node-menunav/node-menunav.js", "getActiveClass", 328);
_yuitest_coverline("build/node-menunav/node-menunav.js", 330);
return isMenuItem(node) ? CSS_MENUITEM_ACTIVE : CSS_MENU_LABEL_ACTIVE;

};


_yuitest_coverline("build/node-menunav/node-menunav.js", 335);
var handleMouseOverForNode = function (node, target) {
	
	_yuitest_coverfunc("build/node-menunav/node-menunav.js", "handleMouseOverForNode", 335);
_yuitest_coverline("build/node-menunav/node-menunav.js", 337);
return node && !node[HANDLED_MOUSEOVER] && 
		(node.compareTo(target) || node.contains(target));

};


_yuitest_coverline("build/node-menunav/node-menunav.js", 343);
var handleMouseOutForNode = function (node, relatedTarget) {
	
	_yuitest_coverfunc("build/node-menunav/node-menunav.js", "handleMouseOutForNode", 343);
_yuitest_coverline("build/node-menunav/node-menunav.js", 345);
return node && !node[HANDLED_MOUSEOUT] && 
		(!node.compareTo(relatedTarget) && !node.contains(relatedTarget));

};

/**
* The NodeMenuNav class is a plugin for a Node instance.  The class is used via  
* the <a href="Node.html#method_plug"><code>plug</code></a> method of Node and 
* should not be instantiated directly.
* @namespace plugin
* @class NodeMenuNav
*/
_yuitest_coverline("build/node-menunav/node-menunav.js", 357);
var NodeMenuNav = function () {

	_yuitest_coverfunc("build/node-menunav/node-menunav.js", "NodeMenuNav", 357);
_yuitest_coverline("build/node-menunav/node-menunav.js", 359);
NodeMenuNav.superclass.constructor.apply(this, arguments);

};

_yuitest_coverline("build/node-menunav/node-menunav.js", 363);
NodeMenuNav.NAME = "nodeMenuNav";
_yuitest_coverline("build/node-menunav/node-menunav.js", 364);
NodeMenuNav.NS = "menuNav";


/** 
* @property SHIM_TEMPLATE_TITLE
* @description String representing the value for the <code>title</code> 
* attribute for the shim used to prevent <code>&#60;select&#62;</code> elements 
* from poking through menus in IE 6.
* @default "Menu Stacking Shim"
* @type String
*/
_yuitest_coverline("build/node-menunav/node-menunav.js", 375);
NodeMenuNav.SHIM_TEMPLATE_TITLE = "Menu Stacking Shim";


/** 
* @property SHIM_TEMPLATE
* @description String representing the HTML used to create the 
* <code>&#60;iframe&#62;</code> shim used to prevent 
* <code>&#60;select&#62;</code> elements from poking through menus in IE 6.
* @default &#34;&#60;iframe frameborder=&#34;0&#34; tabindex=&#34;-1&#34; 
* class=&#34;yui-shim&#34; title=&#34;Menu Stacking Shim&#34; 
* src=&#34;javascript:false;&#34;&#62;&#60;/iframe&#62;&#34;
* @type String
*/

//	<iframe> shim notes:
//
//	1) Need to set the "frameBorder" property to 0 to suppress the default 
//	<iframe> border in IE.  (Setting the CSS "border" property alone doesn't  
//	suppress it.) 
//
//	2) The "src" attribute of the <iframe> is set to "javascript:false;" so 
//	that it won't load a page inside it, preventing the secure/nonsecure 
//	warning in IE when using HTTPS.
//
//	3) Since the role of the <iframe> shim is completely presentational, its 
//	"tabindex" attribute is set to "-1" and its title attribute is set to 
//	"Menu Stacking Shim".  Both strategies help users of screen readers to 
//	avoid mistakenly interacting with the <iframe> shim.

_yuitest_coverline("build/node-menunav/node-menunav.js", 404);
NodeMenuNav.SHIM_TEMPLATE = '<iframe frameborder="0" tabindex="-1" class="' + 
							getClassName("shim") + 
							'" title="' + NodeMenuNav.SHIM_TEMPLATE_TITLE + 
							'" src="javascript:false;"></iframe>';


_yuitest_coverline("build/node-menunav/node-menunav.js", 410);
NodeMenuNav.ATTRS = {

	/**
	* Boolean indicating if use of the WAI-ARIA Roles and States should be 
	* enabled for the menu.
	*
	* @attribute useARIA
	* @readOnly
	* @writeOnce	
	* @default true
	* @type boolean
	*/
	useARIA: {
		
		value: true,
		writeOnce: true,
		lazyAdd: false,
		setter: function (value) {

			_yuitest_coverfunc("build/node-menunav/node-menunav.js", "setter", 427);
_yuitest_coverline("build/node-menunav/node-menunav.js", 429);
var oMenu = this.get(HOST),
				oMenuLabel,
				oMenuToggle,
				oSubmenu,
				sID;

			_yuitest_coverline("build/node-menunav/node-menunav.js", 435);
if (value) {

				_yuitest_coverline("build/node-menunav/node-menunav.js", 437);
oMenu.set(ROLE, MENU);

				_yuitest_coverline("build/node-menunav/node-menunav.js", 439);
oMenu.all("ul,li," + MENU_CONTENT_SELECTOR).set(ROLE, PRESENTATION);

				_yuitest_coverline("build/node-menunav/node-menunav.js", 441);
oMenu.all((PERIOD + getClassName(MENUITEM, CONTENT))).set(ROLE, MENUITEM);

				_yuitest_coverline("build/node-menunav/node-menunav.js", 443);
oMenu.all((PERIOD + CSS_MENU_LABEL)).each(function (node) {

					_yuitest_coverfunc("build/node-menunav/node-menunav.js", "(anonymous 2)", 443);
_yuitest_coverline("build/node-menunav/node-menunav.js", 445);
oMenuLabel = node;
					_yuitest_coverline("build/node-menunav/node-menunav.js", 446);
oMenuToggle = node.one(MENU_TOGGLE_SELECTOR);

					_yuitest_coverline("build/node-menunav/node-menunav.js", 448);
if (oMenuToggle) {
						_yuitest_coverline("build/node-menunav/node-menunav.js", 449);
oMenuToggle.set(ROLE, PRESENTATION);
						_yuitest_coverline("build/node-menunav/node-menunav.js", 450);
oMenuLabel = oMenuToggle.previous();
					}

					_yuitest_coverline("build/node-menunav/node-menunav.js", 453);
oMenuLabel.set(ROLE, MENUITEM);
					_yuitest_coverline("build/node-menunav/node-menunav.js", 454);
oMenuLabel.set("aria-haspopup", true);

					_yuitest_coverline("build/node-menunav/node-menunav.js", 456);
oSubmenu = node.next();

					_yuitest_coverline("build/node-menunav/node-menunav.js", 458);
if (oSubmenu) {

						_yuitest_coverline("build/node-menunav/node-menunav.js", 460);
oSubmenu.set(ROLE, MENU);

						_yuitest_coverline("build/node-menunav/node-menunav.js", 462);
oMenuLabel = oSubmenu.previous();
						_yuitest_coverline("build/node-menunav/node-menunav.js", 463);
oMenuToggle = oMenuLabel.one(MENU_TOGGLE_SELECTOR);

						_yuitest_coverline("build/node-menunav/node-menunav.js", 465);
if (oMenuToggle) {
							_yuitest_coverline("build/node-menunav/node-menunav.js", 466);
oMenuLabel = oMenuToggle;
						}

						_yuitest_coverline("build/node-menunav/node-menunav.js", 469);
sID = Y.stamp(oMenuLabel);

						_yuitest_coverline("build/node-menunav/node-menunav.js", 471);
if (!oMenuLabel.get(ID)) {
							_yuitest_coverline("build/node-menunav/node-menunav.js", 472);
oMenuLabel.set(ID, sID);
						}

						_yuitest_coverline("build/node-menunav/node-menunav.js", 475);
oSubmenu.set("aria-labelledby", sID);
						_yuitest_coverline("build/node-menunav/node-menunav.js", 476);
oSubmenu.set(ARIA_HIDDEN, true);
						
					}

				});
				
			}

		}
		
	},


	/**
	* Boolean indicating if submenus are automatically made visible when the 
	* user mouses over the menu's items.
	*
	* @attribute autoSubmenuDisplay
	* @readOnly
	* @writeOnce	
	* @default true
	* @type boolean
	*/	
	autoSubmenuDisplay: {
		
		value: true,
		writeOnce: true
		
	},


	/**
	* Number indicating the time (in milliseconds) that should expire before a 
	* submenu is made visible when the user mouses over the menu's label.
	*
	* @attribute submenuShowDelay
	* @readOnly
	* @writeOnce	
	* @default 250
	* @type Number
	*/
	submenuShowDelay: {
		
		value: 250,
		writeOnce: true
		
	},


	/**
	* Number indicating the time (in milliseconds) that should expire before a 
	* submenu is hidden when the user mouses out of a menu label heading in the 
	* direction of a submenu.  
	*
	* @attribute submenuHideDelay
	* @readOnly
	* @writeOnce	
	* @default 250
	* @type Number
	*/
	submenuHideDelay: {
		
		value: 250,
		writeOnce: true
		
	},


	/**
	* Number indicating the time (in milliseconds) that should expire before a 
	* submenu is hidden when the user mouses out of it.
	* 
	* @attribute mouseOutHideDelay
	* @readOnly
	* @writeOnce	
	* @default 750
	* @type Number
	*/	
	mouseOutHideDelay: {
		
		value: 750,
		writeOnce: true
		
	}

};


_yuitest_coverline("build/node-menunav/node-menunav.js", 564);
Y.extend(NodeMenuNav, Y.Plugin.Base, {

	//	Protected properties

	/** 
	* @property _rootMenu
	* @description Node instance representing the root menu in the menu.
	* @default null
	* @protected
	* @type Node
	*/
	_rootMenu: null,	


	/** 
	* @property _activeItem
	* @description Node instance representing the menu's active descendent: 
	* the menuitem or menu label the user is currently interacting with.
	* @default null
	* @protected
	* @type Node
	*/
	_activeItem: null, 


	/** 
	* @property _activeMenu
	* @description Node instance representing the menu that is the parent of 
	* the menu's active descendent.
	* @default null
	* @protected
	* @type Node
	*/
	_activeMenu: null,


	/** 
	* @property _hasFocus
	* @description Boolean indicating if the menu has focus.
	* @default false
	* @protected
	* @type Boolean
	*/
	_hasFocus: false,


	//	In gecko-based browsers a mouseover and mouseout event will fire even 
	//	if a DOM element moves out from under the mouse without the user 
	//	actually moving the mouse.  This bug affects NodeMenuNav because the  
	//	user can hit the Esc key to hide a menu, and if the mouse is over the  
	//	menu when the user presses Esc, the _onMenuMouseOut handler will be 
	//	called.  To fix this bug the following flag (_blockMouseEvent) is used 
	// to block the code in the _onMenuMouseOut handler from executing.

	/** 
	* @property _blockMouseEvent
	* @description Boolean indicating whether or not to handle the 
	* "mouseover" event.
	* @default false
	* @protected
	* @type Boolean
	*/
	_blockMouseEvent: false,


	/** 
	* @property _currentMouseX
	* @description Number representing the current x coordinate of the mouse 
	* inside the menu.
	* @default 0
	* @protected
	* @type Number
	*/
	_currentMouseX: 0,


	/** 
	* @property _movingToSubmenu
	* @description Boolean indicating if the mouse is moving from a menu 
	* label to its corresponding submenu.
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
	* @description Node instance representing the first item (menuitem or menu 
	* label) in the root menu of a menu.
	* @default null
	* @protected
	* @type Node
	*/
	_firstItem: null,


	//	Public methods


    initializer: function (config) {

		_yuitest_coverfunc("build/node-menunav/node-menunav.js", "initializer", 695);
_yuitest_coverline("build/node-menunav/node-menunav.js", 697);
var menuNav = this,
			oRootMenu = this.get(HOST),
			aHandlers = [],
			oDoc;


		_yuitest_coverline("build/node-menunav/node-menunav.js", 703);
if (oRootMenu) {

			_yuitest_coverline("build/node-menunav/node-menunav.js", 705);
menuNav._rootMenu = oRootMenu;

			_yuitest_coverline("build/node-menunav/node-menunav.js", 707);
oRootMenu.all("ul:first-child").addClass(FIRST_OF_TYPE);

			//	Hide all visible submenus

			_yuitest_coverline("build/node-menunav/node-menunav.js", 711);
oRootMenu.all(MENU_SELECTOR).addClass(CSS_MENU_HIDDEN);


			//	Wire up all event handlers

			_yuitest_coverline("build/node-menunav/node-menunav.js", 716);
aHandlers.push(oRootMenu.on("mouseover", menuNav._onMouseOver, menuNav));
			_yuitest_coverline("build/node-menunav/node-menunav.js", 717);
aHandlers.push(oRootMenu.on("mouseout", menuNav._onMouseOut, menuNav));
			_yuitest_coverline("build/node-menunav/node-menunav.js", 718);
aHandlers.push(oRootMenu.on("mousemove", menuNav._onMouseMove, menuNav));
			_yuitest_coverline("build/node-menunav/node-menunav.js", 719);
aHandlers.push(oRootMenu.on(MOUSEDOWN, menuNav._toggleSubmenuDisplay, menuNav));
			_yuitest_coverline("build/node-menunav/node-menunav.js", 720);
aHandlers.push(Y.on("key", menuNav._toggleSubmenuDisplay, oRootMenu, "down:13", menuNav));
			_yuitest_coverline("build/node-menunav/node-menunav.js", 721);
aHandlers.push(oRootMenu.on(CLICK, menuNav._toggleSubmenuDisplay, menuNav));
			_yuitest_coverline("build/node-menunav/node-menunav.js", 722);
aHandlers.push(oRootMenu.on("keypress", menuNav._onKeyPress, menuNav));
			_yuitest_coverline("build/node-menunav/node-menunav.js", 723);
aHandlers.push(oRootMenu.on(KEYDOWN, menuNav._onKeyDown, menuNav));

			_yuitest_coverline("build/node-menunav/node-menunav.js", 725);
oDoc = oRootMenu.get("ownerDocument");

		    _yuitest_coverline("build/node-menunav/node-menunav.js", 727);
aHandlers.push(oDoc.on(MOUSEDOWN, menuNav._onDocMouseDown, menuNav));
			_yuitest_coverline("build/node-menunav/node-menunav.js", 728);
aHandlers.push(oDoc.on("focus", menuNav._onDocFocus, menuNav));

			_yuitest_coverline("build/node-menunav/node-menunav.js", 730);
this._eventHandlers = aHandlers;

			_yuitest_coverline("build/node-menunav/node-menunav.js", 732);
menuNav._initFocusManager();

		}
		

    },

	destructor: function () {

		_yuitest_coverfunc("build/node-menunav/node-menunav.js", "destructor", 739);
_yuitest_coverline("build/node-menunav/node-menunav.js", 741);
var aHandlers = this._eventHandlers;

		_yuitest_coverline("build/node-menunav/node-menunav.js", 743);
if (aHandlers) {

			_yuitest_coverline("build/node-menunav/node-menunav.js", 745);
Y.Array.each(aHandlers, function (handle) {
				_yuitest_coverfunc("build/node-menunav/node-menunav.js", "(anonymous 3)", 745);
_yuitest_coverline("build/node-menunav/node-menunav.js", 746);
handle.detach();
			});

			_yuitest_coverline("build/node-menunav/node-menunav.js", 749);
this._eventHandlers = null;

		}
		
		_yuitest_coverline("build/node-menunav/node-menunav.js", 753);
this.get(HOST).unplug("focusManager");
		
    },



	//	Protected methods

	/**
	* @method _isRoot
	* @description Returns a boolean indicating if the specified menu is the 
	* root menu in the menu.
	* @protected
	* @param {Node} menu Node instance representing a menu.
	* @return {Boolean} Boolean indicating if the specified menu is the root 
	* menu in the menu.
	*/
	_isRoot: function (menu) {

		_yuitest_coverfunc("build/node-menunav/node-menunav.js", "_isRoot", 770);
_yuitest_coverline("build/node-menunav/node-menunav.js", 772);
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
	
		_yuitest_coverfunc("build/node-menunav/node-menunav.js", "_getTopmostSubmenu", 784);
_yuitest_coverline("build/node-menunav/node-menunav.js", 786);
var menuNav = this,
			oMenu = getParentMenu(menu),
			returnVal;


		_yuitest_coverline("build/node-menunav/node-menunav.js", 791);
if (!oMenu) {
			_yuitest_coverline("build/node-menunav/node-menunav.js", 792);
returnVal = menu;
		}
		else {_yuitest_coverline("build/node-menunav/node-menunav.js", 794);
if (menuNav._isRoot(oMenu)) {
			_yuitest_coverline("build/node-menunav/node-menunav.js", 795);
returnVal = menu;
		}
		else {
			_yuitest_coverline("build/node-menunav/node-menunav.js", 798);
returnVal = menuNav._getTopmostSubmenu(oMenu);
		}}
	
		_yuitest_coverline("build/node-menunav/node-menunav.js", 801);
return returnVal;
	
	},


	/**
	* @method _clearActiveItem
	* @description Clears the menu's active descendent.
	* @protected
	*/
	_clearActiveItem: function () {

		_yuitest_coverfunc("build/node-menunav/node-menunav.js", "_clearActiveItem", 811);
_yuitest_coverline("build/node-menunav/node-menunav.js", 813);
var menuNav = this,
			oActiveItem = menuNav._activeItem;
		
		_yuitest_coverline("build/node-menunav/node-menunav.js", 816);
if (oActiveItem) {
			_yuitest_coverline("build/node-menunav/node-menunav.js", 817);
oActiveItem.removeClass(getActiveClass(oActiveItem));
		}

		_yuitest_coverline("build/node-menunav/node-menunav.js", 820);
menuNav._activeItem = null;
	
	},


	/**
	* @method _setActiveItem
	* @description Sets the specified menuitem or menu label as the menu's 
	* active descendent.
	* @protected
	* @param {Node} item Node instance representing a menuitem or menu label.
	*/
	_setActiveItem: function (item) {

		_yuitest_coverfunc("build/node-menunav/node-menunav.js", "_setActiveItem", 832);
_yuitest_coverline("build/node-menunav/node-menunav.js", 834);
var menuNav = this;
	
		_yuitest_coverline("build/node-menunav/node-menunav.js", 836);
if (item) {
			
			_yuitest_coverline("build/node-menunav/node-menunav.js", 838);
menuNav._clearActiveItem();
	
			_yuitest_coverline("build/node-menunav/node-menunav.js", 840);
item.addClass(getActiveClass(item));
			
			_yuitest_coverline("build/node-menunav/node-menunav.js", 842);
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
	
		_yuitest_coverfunc("build/node-menunav/node-menunav.js", "_focusItem", 855);
_yuitest_coverline("build/node-menunav/node-menunav.js", 857);
var menuNav = this,
			oMenu,
			oItem;
	
		_yuitest_coverline("build/node-menunav/node-menunav.js", 861);
if (item && menuNav._hasFocus) {

			_yuitest_coverline("build/node-menunav/node-menunav.js", 863);
oMenu = getParentMenu(item);
			_yuitest_coverline("build/node-menunav/node-menunav.js", 864);
oItem = getItemAnchor(item);

			_yuitest_coverline("build/node-menunav/node-menunav.js", 866);
if (oMenu && !oMenu.compareTo(menuNav._activeMenu)) {
				_yuitest_coverline("build/node-menunav/node-menunav.js", 867);
menuNav._activeMenu = oMenu;
				_yuitest_coverline("build/node-menunav/node-menunav.js", 868);
menuNav._initFocusManager();
			}
		
			_yuitest_coverline("build/node-menunav/node-menunav.js", 871);
menuNav._focusManager.focus(oItem);

		}
	
	},


	/**
	* @method _showMenu
	* @description Shows the specified menu.
	* @protected
	* @param {Node} menu Node instance representing a menu.
	*/
	_showMenu: function (menu) {

		_yuitest_coverfunc("build/node-menunav/node-menunav.js", "_showMenu", 884);
_yuitest_coverline("build/node-menunav/node-menunav.js", 886);
var oParentMenu = getParentMenu(menu),
			oLI = menu.get(PARENT_NODE),
			aXY = oLI.getXY();


		_yuitest_coverline("build/node-menunav/node-menunav.js", 891);
if (this.get(USE_ARIA)) {
			_yuitest_coverline("build/node-menunav/node-menunav.js", 892);
menu.set(ARIA_HIDDEN, false);
		}


		_yuitest_coverline("build/node-menunav/node-menunav.js", 896);
if (isHorizontalMenu(oParentMenu)) {
			_yuitest_coverline("build/node-menunav/node-menunav.js", 897);
aXY[1] = aXY[1] + oLI.get(OFFSET_HEIGHT);
		}
		else {
			_yuitest_coverline("build/node-menunav/node-menunav.js", 900);
aXY[0] = aXY[0] + oLI.get(OFFSET_WIDTH);
		}
		
		_yuitest_coverline("build/node-menunav/node-menunav.js", 903);
menu.setXY(aXY);

		_yuitest_coverline("build/node-menunav/node-menunav.js", 905);
if (UA.ie < 8) {

			_yuitest_coverline("build/node-menunav/node-menunav.js", 907);
if (UA.ie === 6 && !menu.hasIFrameShim) {
	
				_yuitest_coverline("build/node-menunav/node-menunav.js", 909);
menu.appendChild(Y.Node.create(NodeMenuNav.SHIM_TEMPLATE));
				_yuitest_coverline("build/node-menunav/node-menunav.js", 910);
menu.hasIFrameShim = true;

			}

			//	Clear previous values for height and width

			_yuitest_coverline("build/node-menunav/node-menunav.js", 916);
menu.setStyles({ height: EMPTY_STRING, width: EMPTY_STRING });

			//	Set the width and height of the menu's bounding box - this is 
			//	necessary for IE 6 so that the CSS for the <iframe> shim can 
			//	simply set the <iframe>'s width and height to 100% to ensure 
			//	that dimensions of an <iframe> shim are always sync'd to the 
			//	that of its parent menu.  Specifying a width and height also 
			//	helps when positioning decorator elements (for creating effects 
			//	like rounded corners) inside a menu's bounding box in IE 7.
			
			_yuitest_coverline("build/node-menunav/node-menunav.js", 926);
menu.setStyles({ 
				height: (menu.get(OFFSET_HEIGHT) + PX), 
				width: (menu.get(OFFSET_WIDTH) + PX) });

		}

		_yuitest_coverline("build/node-menunav/node-menunav.js", 932);
menu.previous().addClass(CSS_MENU_LABEL_MENUVISIBLE);
		_yuitest_coverline("build/node-menunav/node-menunav.js", 933);
menu.removeClass(CSS_MENU_HIDDEN);

	},
	

	/**
	* @method _hideMenu 
	* @description Hides the specified menu.
	* @protected
	* @param {Node} menu Node instance representing a menu.
	* @param {Boolean} activateAndFocusLabel Boolean indicating if the label 
	* for the specified 
	* menu should be focused and set as active.
	*/
	_hideMenu: function (menu, activateAndFocusLabel) {

		_yuitest_coverfunc("build/node-menunav/node-menunav.js", "_hideMenu", 947);
_yuitest_coverline("build/node-menunav/node-menunav.js", 949);
var menuNav = this,
			oLabel = menu.previous(),
			oActiveItem;

		_yuitest_coverline("build/node-menunav/node-menunav.js", 953);
oLabel.removeClass(CSS_MENU_LABEL_MENUVISIBLE);


		_yuitest_coverline("build/node-menunav/node-menunav.js", 956);
if (activateAndFocusLabel) {
			_yuitest_coverline("build/node-menunav/node-menunav.js", 957);
menuNav._focusItem(oLabel);
			_yuitest_coverline("build/node-menunav/node-menunav.js", 958);
menuNav._setActiveItem(oLabel);			
		}

		_yuitest_coverline("build/node-menunav/node-menunav.js", 961);
oActiveItem = menu.one((PERIOD + CSS_MENUITEM_ACTIVE));

		_yuitest_coverline("build/node-menunav/node-menunav.js", 963);
if (oActiveItem) {
			_yuitest_coverline("build/node-menunav/node-menunav.js", 964);
oActiveItem.removeClass(CSS_MENUITEM_ACTIVE);
		}

		//	Clear the values for top and left that were set by the call to 
		//	"setXY" when the menu was shown so that the hidden position 
		//	specified in the core CSS file will take affect.

		_yuitest_coverline("build/node-menunav/node-menunav.js", 971);
menu.setStyles({ left: EMPTY_STRING, top: EMPTY_STRING });
		
		_yuitest_coverline("build/node-menunav/node-menunav.js", 973);
menu.addClass(CSS_MENU_HIDDEN);

		_yuitest_coverline("build/node-menunav/node-menunav.js", 975);
if (menuNav.get(USE_ARIA)) {
			_yuitest_coverline("build/node-menunav/node-menunav.js", 976);
menu.set(ARIA_HIDDEN, true);
		}	
		
	},


	/**
	* @method _hideAllSubmenus
	* @description Hides all submenus of the specified menu.
	* @protected
	* @param {Node} menu Node instance representing a menu.
	*/
	_hideAllSubmenus: function (menu) {

		_yuitest_coverfunc("build/node-menunav/node-menunav.js", "_hideAllSubmenus", 988);
_yuitest_coverline("build/node-menunav/node-menunav.js", 990);
var menuNav = this;

		_yuitest_coverline("build/node-menunav/node-menunav.js", 992);
menu.all(MENU_SELECTOR).each(Y.bind(function (submenuNode) {
		
			_yuitest_coverfunc("build/node-menunav/node-menunav.js", "(anonymous 4)", 992);
_yuitest_coverline("build/node-menunav/node-menunav.js", 994);
menuNav._hideMenu(submenuNode);
		
		}, menuNav));
	
	},


	/**
	* @method _cancelShowSubmenuTimer
	* @description Cancels the timer used to show a submenu.
	* @protected
	*/
	_cancelShowSubmenuTimer: function () {

		_yuitest_coverfunc("build/node-menunav/node-menunav.js", "_cancelShowSubmenuTimer", 1006);
_yuitest_coverline("build/node-menunav/node-menunav.js", 1008);
var menuNav = this,
			oShowSubmenuTimer = menuNav._showSubmenuTimer;

		_yuitest_coverline("build/node-menunav/node-menunav.js", 1011);
if (oShowSubmenuTimer) {
			_yuitest_coverline("build/node-menunav/node-menunav.js", 1012);
oShowSubmenuTimer.cancel();
			_yuitest_coverline("build/node-menunav/node-menunav.js", 1013);
menuNav._showSubmenuTimer = null;
		}
	
	},


	/**
	* @method _cancelHideSubmenuTimer
	* @description Cancels the timer used to hide a submenu.
	* @protected
	*/
	_cancelHideSubmenuTimer: function () {

		_yuitest_coverfunc("build/node-menunav/node-menunav.js", "_cancelHideSubmenuTimer", 1024);
_yuitest_coverline("build/node-menunav/node-menunav.js", 1026);
var menuNav = this,
			oHideSubmenuTimer = menuNav._hideSubmenuTimer;


		_yuitest_coverline("build/node-menunav/node-menunav.js", 1030);
if (oHideSubmenuTimer) {
			_yuitest_coverline("build/node-menunav/node-menunav.js", 1031);
oHideSubmenuTimer.cancel();
			_yuitest_coverline("build/node-menunav/node-menunav.js", 1032);
menuNav._hideSubmenuTimer = null;
		}
	
	},


	/**
	* @method _initFocusManager
	* @description Initializes and updates the Focus Manager so that is is 
	* always managing descendants of the active menu.
	* @protected
	*/
	_initFocusManager: function () {

		_yuitest_coverfunc("build/node-menunav/node-menunav.js", "_initFocusManager", 1044);
_yuitest_coverline("build/node-menunav/node-menunav.js", 1046);
var menuNav = this,
			oRootMenu = menuNav._rootMenu,
			oMenu = menuNav._activeMenu || oRootMenu,
			sSelectorBase = 
				menuNav._isRoot(oMenu) ? EMPTY_STRING : ("#" + oMenu.get("id")),
			oFocusManager = menuNav._focusManager,
			sKeysVal,
			sDescendantSelector,
			sQuery;

		_yuitest_coverline("build/node-menunav/node-menunav.js", 1056);
if (isHorizontalMenu(oMenu)) {

			_yuitest_coverline("build/node-menunav/node-menunav.js", 1058);
sDescendantSelector = sSelectorBase + STANDARD_QUERY + "," + 
				sSelectorBase + EXTENDED_QUERY;
			
			_yuitest_coverline("build/node-menunav/node-menunav.js", 1061);
sKeysVal = { next: "down:39", previous: "down:37" };
			
		}
		else {

			_yuitest_coverline("build/node-menunav/node-menunav.js", 1066);
sDescendantSelector = sSelectorBase + STANDARD_QUERY;
			_yuitest_coverline("build/node-menunav/node-menunav.js", 1067);
sKeysVal = { next: "down:40", previous: "down:38" };

		}


		_yuitest_coverline("build/node-menunav/node-menunav.js", 1072);
if (!oFocusManager) {

			_yuitest_coverline("build/node-menunav/node-menunav.js", 1074);
oRootMenu.plug(Y.Plugin.NodeFocusManager, { 
				descendants: sDescendantSelector,
				keys: sKeysVal,
				circular: true
			});

			_yuitest_coverline("build/node-menunav/node-menunav.js", 1080);
oFocusManager = oRootMenu.focusManager;

			_yuitest_coverline("build/node-menunav/node-menunav.js", 1082);
sQuery = "#" + oRootMenu.get("id") + MENU_SELECTOR + " a," + 
							MENU_TOGGLE_SELECTOR;

			_yuitest_coverline("build/node-menunav/node-menunav.js", 1085);
oRootMenu.all(sQuery).set("tabIndex", -1);

			_yuitest_coverline("build/node-menunav/node-menunav.js", 1087);
oFocusManager.on(ACTIVE_DESCENDANT_CHANGE, 
				this._onActiveDescendantChange, oFocusManager, this);

			_yuitest_coverline("build/node-menunav/node-menunav.js", 1090);
oFocusManager.after(ACTIVE_DESCENDANT_CHANGE, 
				this._afterActiveDescendantChange, oFocusManager, this);
			
			_yuitest_coverline("build/node-menunav/node-menunav.js", 1093);
menuNav._focusManager = oFocusManager;
			
		}
		else {

			_yuitest_coverline("build/node-menunav/node-menunav.js", 1098);
oFocusManager.set(ACTIVE_DESCENDANT, -1);
			_yuitest_coverline("build/node-menunav/node-menunav.js", 1099);
oFocusManager.set(DESCENDANTS, sDescendantSelector);
			_yuitest_coverline("build/node-menunav/node-menunav.js", 1100);
oFocusManager.set("keys", sKeysVal);
			
		}

	},


	//	Event handlers for discrete pieces of pieces of the menu


	/**
	* @method _onActiveDescendantChange
	* @description "activeDescendantChange" event handler for menu's 
	* Focus Manager.
	* @protected
	* @param {Object} event Object representing the Attribute change event.
	* @param {NodeMenuNav} menuNav Object representing the NodeMenuNav instance.
	*/
	_onActiveDescendantChange: function (event, menuNav) {

		_yuitest_coverfunc("build/node-menunav/node-menunav.js", "_onActiveDescendantChange", 1118);
_yuitest_coverline("build/node-menunav/node-menunav.js", 1120);
if (event.src === UI && menuNav._activeMenu && 
				!menuNav._movingToSubmenu) {

			_yuitest_coverline("build/node-menunav/node-menunav.js", 1123);
menuNav._hideAllSubmenus(menuNav._activeMenu);

		}
		
	},


	/**
	* @method _afterActiveDescendantChange
	* @description "activeDescendantChange" event handler for menu's 
	* Focus Manager.
	* @protected
	* @param {Object} event Object representing the Attribute change event.
	* @param {NodeMenuNav} menuNav Object representing the NodeMenuNav instance.
	*/
	_afterActiveDescendantChange: function (event, menuNav) {

		_yuitest_coverfunc("build/node-menunav/node-menunav.js", "_afterActiveDescendantChange", 1138);
_yuitest_coverline("build/node-menunav/node-menunav.js", 1140);
var oItem;

		_yuitest_coverline("build/node-menunav/node-menunav.js", 1142);
if (event.src === UI) {
			_yuitest_coverline("build/node-menunav/node-menunav.js", 1143);
oItem = getItem(this.get(DESCENDANTS).item(event.newVal), true);
			_yuitest_coverline("build/node-menunav/node-menunav.js", 1144);
menuNav._setActiveItem(oItem);
		}
	
	},


	/**
	* @method _onDocFocus
	* @description "focus" event handler for the owner document of the MenuNav.
	* @protected
	* @param {Object} event Object representing the DOM event.
	*/
	_onDocFocus: function (event) {
	
		_yuitest_coverfunc("build/node-menunav/node-menunav.js", "_onDocFocus", 1156);
_yuitest_coverline("build/node-menunav/node-menunav.js", 1158);
var menuNav = this,
			oActiveItem = menuNav._activeItem,
			oTarget = event.target,
			oMenu;
	

		_yuitest_coverline("build/node-menunav/node-menunav.js", 1164);
if (menuNav._rootMenu.contains(oTarget)) {	//	The menu has focus

			_yuitest_coverline("build/node-menunav/node-menunav.js", 1166);
if (menuNav._hasFocus) {	

				_yuitest_coverline("build/node-menunav/node-menunav.js", 1168);
oMenu = getParentMenu(oTarget);

				//	If the element that was focused is a descendant of the 
				//	root menu, but is in a submenu not currently being 
				//	managed by the Focus Manager, update the Focus Manager so 
				//	that it is now managing the submenu that is the parent of  
				//	the element that was focused.
				
				_yuitest_coverline("build/node-menunav/node-menunav.js", 1176);
if (!menuNav._activeMenu.compareTo(oMenu)) {

					_yuitest_coverline("build/node-menunav/node-menunav.js", 1178);
menuNav._activeMenu = oMenu;
					_yuitest_coverline("build/node-menunav/node-menunav.js", 1179);
menuNav._initFocusManager();
					_yuitest_coverline("build/node-menunav/node-menunav.js", 1180);
menuNav._focusManager.set(ACTIVE_DESCENDANT, oTarget);
					_yuitest_coverline("build/node-menunav/node-menunav.js", 1181);
menuNav._setActiveItem(getItem(oTarget, true));
					
				}
			
			}
			else { //	Initial focus

				//	First time the menu has been focused, need to setup focused 
				//	state and established active active descendant
	
				_yuitest_coverline("build/node-menunav/node-menunav.js", 1191);
menuNav._hasFocus = true;
	
				_yuitest_coverline("build/node-menunav/node-menunav.js", 1193);
oActiveItem = getItem(oTarget, true);
	
				_yuitest_coverline("build/node-menunav/node-menunav.js", 1195);
if (oActiveItem) {	
					_yuitest_coverline("build/node-menunav/node-menunav.js", 1196);
menuNav._setActiveItem(oActiveItem);
				}
				
			}
		
		}
		else {	//	The menu has lost focus

			_yuitest_coverline("build/node-menunav/node-menunav.js", 1204);
menuNav._clearActiveItem();

			_yuitest_coverline("build/node-menunav/node-menunav.js", 1206);
menuNav._cancelShowSubmenuTimer();
			_yuitest_coverline("build/node-menunav/node-menunav.js", 1207);
menuNav._hideAllSubmenus(menuNav._rootMenu);

			_yuitest_coverline("build/node-menunav/node-menunav.js", 1209);
menuNav._activeMenu = menuNav._rootMenu;
			_yuitest_coverline("build/node-menunav/node-menunav.js", 1210);
menuNav._initFocusManager();
			
			_yuitest_coverline("build/node-menunav/node-menunav.js", 1212);
menuNav._focusManager.set(ACTIVE_DESCENDANT, 0);
			
			_yuitest_coverline("build/node-menunav/node-menunav.js", 1214);
menuNav._hasFocus = false;

		}
	
	},


	/**
	* @method _onMenuMouseOver
	* @description "mouseover" event handler for a menu.
	* @protected
	* @param {Node} menu Node instance representing a menu.
	* @param {Object} event Object representing the DOM event.
	*/
	_onMenuMouseOver: function (menu, event) {

		_yuitest_coverfunc("build/node-menunav/node-menunav.js", "_onMenuMouseOver", 1228);
_yuitest_coverline("build/node-menunav/node-menunav.js", 1230);
var menuNav = this,
			oHideAllSubmenusTimer = menuNav._hideAllSubmenusTimer;

		_yuitest_coverline("build/node-menunav/node-menunav.js", 1233);
if (oHideAllSubmenusTimer) {
			_yuitest_coverline("build/node-menunav/node-menunav.js", 1234);
oHideAllSubmenusTimer.cancel();
			_yuitest_coverline("build/node-menunav/node-menunav.js", 1235);
menuNav._hideAllSubmenusTimer = null;
		}

		_yuitest_coverline("build/node-menunav/node-menunav.js", 1238);
menuNav._cancelHideSubmenuTimer();

		//	Need to update the FocusManager in advance of focus a new 
		//	Menu in order to avoid the FocusManager thinking that 
		//	it has lost focus
		
		_yuitest_coverline("build/node-menunav/node-menunav.js", 1244);
if (menu && !menu.compareTo(menuNav._activeMenu)) {
			_yuitest_coverline("build/node-menunav/node-menunav.js", 1245);
menuNav._activeMenu = menu;

			_yuitest_coverline("build/node-menunav/node-menunav.js", 1247);
if (menuNav._hasFocus) {
				_yuitest_coverline("build/node-menunav/node-menunav.js", 1248);
menuNav._initFocusManager();
			}

		}

		_yuitest_coverline("build/node-menunav/node-menunav.js", 1253);
if (menuNav._movingToSubmenu && isHorizontalMenu(menu)) {
			_yuitest_coverline("build/node-menunav/node-menunav.js", 1254);
menuNav._movingToSubmenu = false;
		}

	},


	/**
	* @method _hideAndFocusLabel
	* @description Hides all of the submenus of the root menu and focuses the 
	* label of the topmost submenu
	* @protected
	*/
	_hideAndFocusLabel: function () {

		_yuitest_coverfunc("build/node-menunav/node-menunav.js", "_hideAndFocusLabel", 1266);
_yuitest_coverline("build/node-menunav/node-menunav.js", 1268);
var	menuNav = this,
			oActiveMenu = menuNav._activeMenu,
			oSubmenu;
	
		_yuitest_coverline("build/node-menunav/node-menunav.js", 1272);
menuNav._hideAllSubmenus(menuNav._rootMenu);

		_yuitest_coverline("build/node-menunav/node-menunav.js", 1274);
if (oActiveMenu) {

			//	Focus the label element for the topmost submenu
			_yuitest_coverline("build/node-menunav/node-menunav.js", 1277);
oSubmenu = menuNav._getTopmostSubmenu(oActiveMenu);
			_yuitest_coverline("build/node-menunav/node-menunav.js", 1278);
menuNav._focusItem(oSubmenu.previous());

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

		_yuitest_coverfunc("build/node-menunav/node-menunav.js", "_onMenuMouseOut", 1292);
_yuitest_coverline("build/node-menunav/node-menunav.js", 1294);
var menuNav = this,
			oActiveMenu = menuNav._activeMenu,
			oRelatedTarget = event.relatedTarget,
			oActiveItem = menuNav._activeItem,
			oParentMenu,
			oMenu;


		_yuitest_coverline("build/node-menunav/node-menunav.js", 1302);
if (oActiveMenu && !oActiveMenu.contains(oRelatedTarget)) {
		
			_yuitest_coverline("build/node-menunav/node-menunav.js", 1304);
oParentMenu = getParentMenu(oActiveMenu);
			

			_yuitest_coverline("build/node-menunav/node-menunav.js", 1307);
if (oParentMenu && !oParentMenu.contains(oRelatedTarget)) {

				_yuitest_coverline("build/node-menunav/node-menunav.js", 1309);
if (menuNav.get(MOUSEOUT_HIDE_DELAY) > 0) {

					_yuitest_coverline("build/node-menunav/node-menunav.js", 1311);
menuNav._cancelShowSubmenuTimer();

					_yuitest_coverline("build/node-menunav/node-menunav.js", 1313);
menuNav._hideAllSubmenusTimer = 

						later(menuNav.get(MOUSEOUT_HIDE_DELAY), 
							menuNav, menuNav._hideAndFocusLabel);
						
				}
			
			}
			else {
			
				_yuitest_coverline("build/node-menunav/node-menunav.js", 1323);
if (oActiveItem) {
				
					_yuitest_coverline("build/node-menunav/node-menunav.js", 1325);
oMenu = getParentMenu(oActiveItem);

					_yuitest_coverline("build/node-menunav/node-menunav.js", 1327);
if (!menuNav._isRoot(oMenu)) { 
						_yuitest_coverline("build/node-menunav/node-menunav.js", 1328);
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

		_yuitest_coverfunc("build/node-menunav/node-menunav.js", "_onMenuLabelMouseOver", 1347);
_yuitest_coverline("build/node-menunav/node-menunav.js", 1349);
var menuNav = this,
			oActiveMenu = menuNav._activeMenu,
			bIsRoot = menuNav._isRoot(oActiveMenu),
			bUseAutoSubmenuDisplay = 
				(menuNav.get(AUTO_SUBMENU_DISPLAY) && bIsRoot || !bIsRoot),
            submenuShowDelay = menuNav.get("submenuShowDelay"),	
			oSubmenu;
				

        _yuitest_coverline("build/node-menunav/node-menunav.js", 1358);
var showSubmenu = function (delay) {

			_yuitest_coverfunc("build/node-menunav/node-menunav.js", "showSubmenu", 1358);
_yuitest_coverline("build/node-menunav/node-menunav.js", 1360);
menuNav._cancelHideSubmenuTimer();
			_yuitest_coverline("build/node-menunav/node-menunav.js", 1361);
menuNav._cancelShowSubmenuTimer();

			_yuitest_coverline("build/node-menunav/node-menunav.js", 1363);
if (!hasVisibleSubmenu(menuLabel)) {

				_yuitest_coverline("build/node-menunav/node-menunav.js", 1365);
oSubmenu = menuLabel.next();

				_yuitest_coverline("build/node-menunav/node-menunav.js", 1367);
if (oSubmenu) {
					_yuitest_coverline("build/node-menunav/node-menunav.js", 1368);
menuNav._hideAllSubmenus(oActiveMenu);
					_yuitest_coverline("build/node-menunav/node-menunav.js", 1369);
menuNav._showSubmenuTimer = later(delay, menuNav, menuNav._showMenu, oSubmenu);
				}

			}
            
        };


		_yuitest_coverline("build/node-menunav/node-menunav.js", 1377);
menuNav._focusItem(menuLabel);
		_yuitest_coverline("build/node-menunav/node-menunav.js", 1378);
menuNav._setActiveItem(menuLabel);


		_yuitest_coverline("build/node-menunav/node-menunav.js", 1381);
if (bUseAutoSubmenuDisplay) {
	
	        _yuitest_coverline("build/node-menunav/node-menunav.js", 1383);
if (menuNav._movingToSubmenu) {
	            
	            //  If the user is moving diagonally from a submenu to 
	            //  another submenu and they then stop and pause on a
	            //  menu label for an amount of time equal to the amount of 
	            //  time defined for the display of a submenu then show the 
	            //  submenu immediately.
	            //  http://yuilibrary.com/projects/yui3/ticket/2528316
	            
	            //Y.message("Pause path");
	            
	            _yuitest_coverline("build/node-menunav/node-menunav.js", 1394);
menuNav._hoverTimer = later(submenuShowDelay, menuNav, function () {
                    _yuitest_coverfunc("build/node-menunav/node-menunav.js", "(anonymous 5)", 1394);
_yuitest_coverline("build/node-menunav/node-menunav.js", 1395);
showSubmenu(0);
	            });
	            
	        }
	        else {
                _yuitest_coverline("build/node-menunav/node-menunav.js", 1400);
showSubmenu(submenuShowDelay);
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

		_yuitest_coverfunc("build/node-menunav/node-menunav.js", "_onMenuLabelMouseOut", 1415);
_yuitest_coverline("build/node-menunav/node-menunav.js", 1417);
var menuNav = this,
			bIsRoot = menuNav._isRoot(menuNav._activeMenu),
			bUseAutoSubmenuDisplay = 
				(menuNav.get(AUTO_SUBMENU_DISPLAY) && bIsRoot || !bIsRoot),

			oRelatedTarget = event.relatedTarget,
			oSubmenu = menuLabel.next(),
			hoverTimer = menuNav._hoverTimer;

        _yuitest_coverline("build/node-menunav/node-menunav.js", 1426);
if (hoverTimer) {
            _yuitest_coverline("build/node-menunav/node-menunav.js", 1427);
hoverTimer.cancel();
        }

		_yuitest_coverline("build/node-menunav/node-menunav.js", 1430);
menuNav._clearActiveItem();

		_yuitest_coverline("build/node-menunav/node-menunav.js", 1432);
if (bUseAutoSubmenuDisplay) {

			_yuitest_coverline("build/node-menunav/node-menunav.js", 1434);
if (menuNav._movingToSubmenu && 
					!menuNav._showSubmenuTimer && oSubmenu) {

				//	If the mouse is moving diagonally toward the submenu and 
				//	another submenu isn't in the process of being displayed 
				//	(via a timer), then hide the submenu via a timer to give
				//	the user some time to reach the submenu.
			
				_yuitest_coverline("build/node-menunav/node-menunav.js", 1442);
menuNav._hideSubmenuTimer = 
					later(menuNav.get("submenuHideDelay"), menuNav, 
						menuNav._hideMenu, oSubmenu);
			
			}
			else {_yuitest_coverline("build/node-menunav/node-menunav.js", 1447);
if (!menuNav._movingToSubmenu && oSubmenu && (!oRelatedTarget || 
			        (oRelatedTarget && 
			            !oSubmenu.contains(oRelatedTarget) && 
			            !oRelatedTarget.compareTo(oSubmenu)))) {

				//	If the mouse is not moving toward the submenu, cancel any 
				//	submenus that might be in the process of being displayed 
				//	(via a timer) and hide this submenu immediately.

				_yuitest_coverline("build/node-menunav/node-menunav.js", 1456);
menuNav._cancelShowSubmenuTimer();

				_yuitest_coverline("build/node-menunav/node-menunav.js", 1458);
menuNav._hideMenu(oSubmenu);

			}}

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

		_yuitest_coverfunc("build/node-menunav/node-menunav.js", "_onMenuItemMouseOver", 1474);
_yuitest_coverline("build/node-menunav/node-menunav.js", 1476);
var menuNav = this,
			oActiveMenu = menuNav._activeMenu,
			bIsRoot = menuNav._isRoot(oActiveMenu),
			bUseAutoSubmenuDisplay = 
				(menuNav.get(AUTO_SUBMENU_DISPLAY) && bIsRoot || !bIsRoot);


		_yuitest_coverline("build/node-menunav/node-menunav.js", 1483);
menuNav._focusItem(menuItem);
		_yuitest_coverline("build/node-menunav/node-menunav.js", 1484);
menuNav._setActiveItem(menuItem);


		_yuitest_coverline("build/node-menunav/node-menunav.js", 1487);
if (bUseAutoSubmenuDisplay && !menuNav._movingToSubmenu) {

			_yuitest_coverline("build/node-menunav/node-menunav.js", 1489);
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

		_yuitest_coverfunc("build/node-menunav/node-menunav.js", "_onMenuItemMouseOut", 1503);
_yuitest_coverline("build/node-menunav/node-menunav.js", 1505);
this._clearActiveItem();

	},


	/**
	* @method _onVerticalMenuKeyDown
	* @description "keydown" event handler for vertical menus.
	* @protected
	* @param {Object} event Object representing the DOM event.
	*/
	_onVerticalMenuKeyDown: function (event) {

		_yuitest_coverfunc("build/node-menunav/node-menunav.js", "_onVerticalMenuKeyDown", 1516);
_yuitest_coverline("build/node-menunav/node-menunav.js", 1518);
var menuNav = this,
			oActiveMenu = menuNav._activeMenu,
			oRootMenu = menuNav._rootMenu,
			oTarget = event.target,
			bPreventDefault = false,
			nKeyCode = event.keyCode,
			oSubmenu,
			oParentMenu,
			oLI,
			oItem;


		_yuitest_coverline("build/node-menunav/node-menunav.js", 1530);
switch (nKeyCode) {

			case 37:	//	left arrow

				_yuitest_coverline("build/node-menunav/node-menunav.js", 1534);
oParentMenu = getParentMenu(oActiveMenu);

				_yuitest_coverline("build/node-menunav/node-menunav.js", 1536);
if (oParentMenu && isHorizontalMenu(oParentMenu)) {
				
					_yuitest_coverline("build/node-menunav/node-menunav.js", 1538);
menuNav._hideMenu(oActiveMenu);
					_yuitest_coverline("build/node-menunav/node-menunav.js", 1539);
oLI = getPreviousSibling(oActiveMenu.get(PARENT_NODE));
					_yuitest_coverline("build/node-menunav/node-menunav.js", 1540);
oItem = getItem(oLI);
					
					_yuitest_coverline("build/node-menunav/node-menunav.js", 1542);
if (oItem) {

						_yuitest_coverline("build/node-menunav/node-menunav.js", 1544);
if (isMenuLabel(oItem)) {	//	Menu label
						
							_yuitest_coverline("build/node-menunav/node-menunav.js", 1546);
oSubmenu = oItem.next();
						

							_yuitest_coverline("build/node-menunav/node-menunav.js", 1549);
if (oSubmenu) {

								_yuitest_coverline("build/node-menunav/node-menunav.js", 1551);
menuNav._showMenu(oSubmenu);
								_yuitest_coverline("build/node-menunav/node-menunav.js", 1552);
menuNav._focusItem(getFirstItem(oSubmenu));
								_yuitest_coverline("build/node-menunav/node-menunav.js", 1553);
menuNav._setActiveItem(getFirstItem(oSubmenu));

							}
							else {
	
								_yuitest_coverline("build/node-menunav/node-menunav.js", 1558);
menuNav._focusItem(oItem);
								_yuitest_coverline("build/node-menunav/node-menunav.js", 1559);
menuNav._setActiveItem(oItem);
	
							}
						
						}
						else {	//	MenuItem

							_yuitest_coverline("build/node-menunav/node-menunav.js", 1566);
menuNav._focusItem(oItem);
							_yuitest_coverline("build/node-menunav/node-menunav.js", 1567);
menuNav._setActiveItem(oItem);

						}
					
					}

				}
				else {_yuitest_coverline("build/node-menunav/node-menunav.js", 1574);
if (!menuNav._isRoot(oActiveMenu)) {
					_yuitest_coverline("build/node-menunav/node-menunav.js", 1575);
menuNav._hideMenu(oActiveMenu, true);
				}}


				_yuitest_coverline("build/node-menunav/node-menunav.js", 1579);
bPreventDefault = true;

			_yuitest_coverline("build/node-menunav/node-menunav.js", 1581);
break;

			case 39:	//	right arrow

				_yuitest_coverline("build/node-menunav/node-menunav.js", 1585);
if (isMenuLabel(oTarget)) {
					
					_yuitest_coverline("build/node-menunav/node-menunav.js", 1587);
oSubmenu = oTarget.next();

					_yuitest_coverline("build/node-menunav/node-menunav.js", 1589);
if (oSubmenu) {

						_yuitest_coverline("build/node-menunav/node-menunav.js", 1591);
menuNav._showMenu(oSubmenu);
						_yuitest_coverline("build/node-menunav/node-menunav.js", 1592);
menuNav._focusItem(getFirstItem(oSubmenu));
						_yuitest_coverline("build/node-menunav/node-menunav.js", 1593);
menuNav._setActiveItem(getFirstItem(oSubmenu));

					}
				
				}
				else {_yuitest_coverline("build/node-menunav/node-menunav.js", 1598);
if (isHorizontalMenu(oRootMenu)) {

					_yuitest_coverline("build/node-menunav/node-menunav.js", 1600);
oSubmenu = menuNav._getTopmostSubmenu(oActiveMenu);
					_yuitest_coverline("build/node-menunav/node-menunav.js", 1601);
oLI = getNextSibling(oSubmenu.get(PARENT_NODE));
					_yuitest_coverline("build/node-menunav/node-menunav.js", 1602);
oItem = getItem(oLI);

					_yuitest_coverline("build/node-menunav/node-menunav.js", 1604);
menuNav._hideAllSubmenus(oRootMenu);

					_yuitest_coverline("build/node-menunav/node-menunav.js", 1606);
if (oItem) {

						_yuitest_coverline("build/node-menunav/node-menunav.js", 1608);
if (isMenuLabel(oItem)) {	//	Menu label

							_yuitest_coverline("build/node-menunav/node-menunav.js", 1610);
oSubmenu = oItem.next();

							_yuitest_coverline("build/node-menunav/node-menunav.js", 1612);
if (oSubmenu) {

								_yuitest_coverline("build/node-menunav/node-menunav.js", 1614);
menuNav._showMenu(oSubmenu);
								_yuitest_coverline("build/node-menunav/node-menunav.js", 1615);
menuNav._focusItem(getFirstItem(oSubmenu));
								_yuitest_coverline("build/node-menunav/node-menunav.js", 1616);
menuNav._setActiveItem(getFirstItem(oSubmenu));

							}
							else {

								_yuitest_coverline("build/node-menunav/node-menunav.js", 1621);
menuNav._focusItem(oItem);
								_yuitest_coverline("build/node-menunav/node-menunav.js", 1622);
menuNav._setActiveItem(oItem);	

							}
						
						}
						else {	//	MenuItem

							_yuitest_coverline("build/node-menunav/node-menunav.js", 1629);
menuNav._focusItem(oItem);
							_yuitest_coverline("build/node-menunav/node-menunav.js", 1630);
menuNav._setActiveItem(oItem);

						}							

					}
				
				}}

				_yuitest_coverline("build/node-menunav/node-menunav.js", 1638);
bPreventDefault = true;

			_yuitest_coverline("build/node-menunav/node-menunav.js", 1640);
break;

		}	


		_yuitest_coverline("build/node-menunav/node-menunav.js", 1645);
if (bPreventDefault) {

			//	Prevent the browser from scrolling the window

			_yuitest_coverline("build/node-menunav/node-menunav.js", 1649);
event.preventDefault();			

		}
	
	},
	

	/**
	* @method _onHorizontalMenuKeyDown
	* @description "keydown" event handler for horizontal menus.
	* @protected
	* @param {Object} event Object representing the DOM event.
	*/
	_onHorizontalMenuKeyDown: function (event) {

		_yuitest_coverfunc("build/node-menunav/node-menunav.js", "_onHorizontalMenuKeyDown", 1662);
_yuitest_coverline("build/node-menunav/node-menunav.js", 1664);
var menuNav = this,
			oActiveMenu = menuNav._activeMenu,
			oTarget = event.target,
			oFocusedItem = getItem(oTarget, true),
			bPreventDefault = false,
			nKeyCode = event.keyCode,
			oSubmenu;


		_yuitest_coverline("build/node-menunav/node-menunav.js", 1673);
if (nKeyCode === 40) {

			_yuitest_coverline("build/node-menunav/node-menunav.js", 1675);
menuNav._hideAllSubmenus(oActiveMenu);

			_yuitest_coverline("build/node-menunav/node-menunav.js", 1677);
if (isMenuLabel(oFocusedItem)) {
			
				_yuitest_coverline("build/node-menunav/node-menunav.js", 1679);
oSubmenu = oFocusedItem.next();

				_yuitest_coverline("build/node-menunav/node-menunav.js", 1681);
if (oSubmenu) {

					_yuitest_coverline("build/node-menunav/node-menunav.js", 1683);
menuNav._showMenu(oSubmenu);
					_yuitest_coverline("build/node-menunav/node-menunav.js", 1684);
menuNav._focusItem(getFirstItem(oSubmenu));
					_yuitest_coverline("build/node-menunav/node-menunav.js", 1685);
menuNav._setActiveItem(getFirstItem(oSubmenu));

				}

				_yuitest_coverline("build/node-menunav/node-menunav.js", 1689);
bPreventDefault = true;
			
			}

		}		


		_yuitest_coverline("build/node-menunav/node-menunav.js", 1696);
if (bPreventDefault) {

			//	Prevent the browser from scrolling the window

			_yuitest_coverline("build/node-menunav/node-menunav.js", 1700);
event.preventDefault();			

		}
	
	},


	//	Generic DOM Event handlers


	/**
	* @method _onMouseMove
	* @description "mousemove" event handler for the menu.
	* @protected
	* @param {Object} event Object representing the DOM event.
	*/
	_onMouseMove: function (event) {

		_yuitest_coverfunc("build/node-menunav/node-menunav.js", "_onMouseMove", 1716);
_yuitest_coverline("build/node-menunav/node-menunav.js", 1718);
var menuNav = this;

		//	Using a timer to set the value of the "_currentMouseX" property 
		//	helps improve the reliability of the calculation used to set the 
		//	value of the "_movingToSubmenu" property - especially in Opera.

		_yuitest_coverline("build/node-menunav/node-menunav.js", 1724);
later(10, menuNav, function () {

			_yuitest_coverfunc("build/node-menunav/node-menunav.js", "(anonymous 6)", 1724);
_yuitest_coverline("build/node-menunav/node-menunav.js", 1726);
menuNav._currentMouseX = event.pageX;
		
		});
	
	},


	/**
	* @method _onMouseOver
	* @description "mouseover" event handler for the menu.
	* @protected
	* @param {Object} event Object representing the DOM event.
	*/
	_onMouseOver: function (event) {

		_yuitest_coverfunc("build/node-menunav/node-menunav.js", "_onMouseOver", 1739);
_yuitest_coverline("build/node-menunav/node-menunav.js", 1741);
var menuNav = this,
			oTarget,
			oMenu,
			oMenuLabel,
			oParentMenu,
			oMenuItem;


		_yuitest_coverline("build/node-menunav/node-menunav.js", 1749);
if (menuNav._blockMouseEvent) {
			_yuitest_coverline("build/node-menunav/node-menunav.js", 1750);
menuNav._blockMouseEvent = false;
		}
		else {

			_yuitest_coverline("build/node-menunav/node-menunav.js", 1754);
oTarget = event.target;
			_yuitest_coverline("build/node-menunav/node-menunav.js", 1755);
oMenu = getMenu(oTarget, true);
			_yuitest_coverline("build/node-menunav/node-menunav.js", 1756);
oMenuLabel = getMenuLabel(oTarget, true);
			_yuitest_coverline("build/node-menunav/node-menunav.js", 1757);
oMenuItem = getMenuItem(oTarget, true);


			_yuitest_coverline("build/node-menunav/node-menunav.js", 1760);
if (handleMouseOverForNode(oMenu, oTarget)) {

				_yuitest_coverline("build/node-menunav/node-menunav.js", 1762);
menuNav._onMenuMouseOver(oMenu, event);

				_yuitest_coverline("build/node-menunav/node-menunav.js", 1764);
oMenu[HANDLED_MOUSEOVER] = true;
				_yuitest_coverline("build/node-menunav/node-menunav.js", 1765);
oMenu[HANDLED_MOUSEOUT] = false;

				_yuitest_coverline("build/node-menunav/node-menunav.js", 1767);
oParentMenu = getParentMenu(oMenu);

				_yuitest_coverline("build/node-menunav/node-menunav.js", 1769);
if (oParentMenu) {

					_yuitest_coverline("build/node-menunav/node-menunav.js", 1771);
oParentMenu[HANDLED_MOUSEOUT] = true;
					_yuitest_coverline("build/node-menunav/node-menunav.js", 1772);
oParentMenu[HANDLED_MOUSEOVER] = false;
		
				}
			
			}

			_yuitest_coverline("build/node-menunav/node-menunav.js", 1778);
if (handleMouseOverForNode(oMenuLabel, oTarget)) {

				_yuitest_coverline("build/node-menunav/node-menunav.js", 1780);
menuNav._onMenuLabelMouseOver(oMenuLabel, event);

				_yuitest_coverline("build/node-menunav/node-menunav.js", 1782);
oMenuLabel[HANDLED_MOUSEOVER] = true;
				_yuitest_coverline("build/node-menunav/node-menunav.js", 1783);
oMenuLabel[HANDLED_MOUSEOUT] = false;
	
			}

			_yuitest_coverline("build/node-menunav/node-menunav.js", 1787);
if (handleMouseOverForNode(oMenuItem, oTarget)) {
	
				_yuitest_coverline("build/node-menunav/node-menunav.js", 1789);
menuNav._onMenuItemMouseOver(oMenuItem, event);

				_yuitest_coverline("build/node-menunav/node-menunav.js", 1791);
oMenuItem[HANDLED_MOUSEOVER] = true;
				_yuitest_coverline("build/node-menunav/node-menunav.js", 1792);
oMenuItem[HANDLED_MOUSEOUT] = false;
				
			}

		}

	},


	/**
	* @method _onMouseOut
	* @description "mouseout" event handler for the menu.
	* @protected
	* @param {Object} event Object representing the DOM event.
	*/
	_onMouseOut: function (event) {
			
		_yuitest_coverfunc("build/node-menunav/node-menunav.js", "_onMouseOut", 1807);
_yuitest_coverline("build/node-menunav/node-menunav.js", 1809);
var menuNav = this,
			oActiveMenu = menuNav._activeMenu,
			bMovingToSubmenu = false,
			oTarget,
			oRelatedTarget,
			oMenu,
			oMenuLabel,
			oSubmenu,
			oMenuItem;


		_yuitest_coverline("build/node-menunav/node-menunav.js", 1820);
menuNav._movingToSubmenu = 
					(oActiveMenu && !isHorizontalMenu(oActiveMenu) && 
						((event.pageX - 5) > menuNav._currentMouseX));
		
		_yuitest_coverline("build/node-menunav/node-menunav.js", 1824);
oTarget = event.target;
		_yuitest_coverline("build/node-menunav/node-menunav.js", 1825);
oRelatedTarget = event.relatedTarget;
		_yuitest_coverline("build/node-menunav/node-menunav.js", 1826);
oMenu = getMenu(oTarget, true);
		_yuitest_coverline("build/node-menunav/node-menunav.js", 1827);
oMenuLabel = getMenuLabel(oTarget, true);
		_yuitest_coverline("build/node-menunav/node-menunav.js", 1828);
oMenuItem = getMenuItem(oTarget, true);


		_yuitest_coverline("build/node-menunav/node-menunav.js", 1831);
if (handleMouseOutForNode(oMenuLabel, oRelatedTarget)) {

			_yuitest_coverline("build/node-menunav/node-menunav.js", 1833);
menuNav._onMenuLabelMouseOut(oMenuLabel, event);

			_yuitest_coverline("build/node-menunav/node-menunav.js", 1835);
oMenuLabel[HANDLED_MOUSEOUT] = true;
			_yuitest_coverline("build/node-menunav/node-menunav.js", 1836);
oMenuLabel[HANDLED_MOUSEOVER] = false;

		}

		_yuitest_coverline("build/node-menunav/node-menunav.js", 1840);
if (handleMouseOutForNode(oMenuItem, oRelatedTarget)) {

			_yuitest_coverline("build/node-menunav/node-menunav.js", 1842);
menuNav._onMenuItemMouseOut(oMenuItem, event);

			_yuitest_coverline("build/node-menunav/node-menunav.js", 1844);
oMenuItem[HANDLED_MOUSEOUT] = true;
			_yuitest_coverline("build/node-menunav/node-menunav.js", 1845);
oMenuItem[HANDLED_MOUSEOVER] = false;
			
		}


		_yuitest_coverline("build/node-menunav/node-menunav.js", 1850);
if (oMenuLabel) {

			_yuitest_coverline("build/node-menunav/node-menunav.js", 1852);
oSubmenu = oMenuLabel.next();

			_yuitest_coverline("build/node-menunav/node-menunav.js", 1854);
if (oSubmenu && oRelatedTarget && 
				(oRelatedTarget.compareTo(oSubmenu) || 
					oSubmenu.contains(oRelatedTarget))) {

				_yuitest_coverline("build/node-menunav/node-menunav.js", 1858);
bMovingToSubmenu = true;

			}
		
		}
		

		_yuitest_coverline("build/node-menunav/node-menunav.js", 1865);
if (handleMouseOutForNode(oMenu, oRelatedTarget) || bMovingToSubmenu) {

			_yuitest_coverline("build/node-menunav/node-menunav.js", 1867);
menuNav._onMenuMouseOut(oMenu, event);				

			_yuitest_coverline("build/node-menunav/node-menunav.js", 1869);
oMenu[HANDLED_MOUSEOUT] = true;
			_yuitest_coverline("build/node-menunav/node-menunav.js", 1870);
oMenu[HANDLED_MOUSEOVER] = false;
		
		}
	
	},


	/**
	* @method _toggleSubmenuDisplay
	* @description "mousedown," "keydown," and "click" event handler for the 
	* menu used to toggle the display of a submenu.
	* @protected
	* @param {Object} event Object representing the DOM event.
	*/
	_toggleSubmenuDisplay: function (event) {

		_yuitest_coverfunc("build/node-menunav/node-menunav.js", "_toggleSubmenuDisplay", 1884);
_yuitest_coverline("build/node-menunav/node-menunav.js", 1886);
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


		_yuitest_coverline("build/node-menunav/node-menunav.js", 1898);
if (oMenuLabel) {

			_yuitest_coverline("build/node-menunav/node-menunav.js", 1900);
oAnchor = isAnchor(oTarget) ? oTarget : oTarget.ancestor(isAnchor);
			

			_yuitest_coverline("build/node-menunav/node-menunav.js", 1903);
if (oAnchor) {

				//	Need to pass "2" as a second argument to "getAttribute" for 
				//	IE otherwise IE will return a fully qualified URL for the 
				//	value of the "href" attribute.
				//	http://msdn.microsoft.com/en-us/library/ms536429(VS.85).aspx

				_yuitest_coverline("build/node-menunav/node-menunav.js", 1910);
sHref = oAnchor.getAttribute("href", 2);
				_yuitest_coverline("build/node-menunav/node-menunav.js", 1911);
nHashPos = sHref.indexOf("#");
				_yuitest_coverline("build/node-menunav/node-menunav.js", 1912);
nLen = sHref.length;

				_yuitest_coverline("build/node-menunav/node-menunav.js", 1914);
if (nHashPos === 0 && nLen > 1) {

					_yuitest_coverline("build/node-menunav/node-menunav.js", 1916);
sId = sHref.substr(1, nLen);
					_yuitest_coverline("build/node-menunav/node-menunav.js", 1917);
oSubmenu = oMenuLabel.next();

					_yuitest_coverline("build/node-menunav/node-menunav.js", 1919);
if (oSubmenu && (oSubmenu.get(ID) === sId)) {

						_yuitest_coverline("build/node-menunav/node-menunav.js", 1921);
if (sType === MOUSEDOWN || sType === KEYDOWN) {
							
							_yuitest_coverline("build/node-menunav/node-menunav.js", 1923);
if ((UA.opera || UA.gecko || UA.ie) && sType === KEYDOWN && !menuNav._preventClickHandle) {

								//	Prevent the browser from following the URL of 
								//	the anchor element

								_yuitest_coverline("build/node-menunav/node-menunav.js", 1928);
menuNav._preventClickHandle = menuNav._rootMenu.on("click", function (event) {

									_yuitest_coverfunc("build/node-menunav/node-menunav.js", "(anonymous 7)", 1928);
_yuitest_coverline("build/node-menunav/node-menunav.js", 1930);
event.preventDefault();

									_yuitest_coverline("build/node-menunav/node-menunav.js", 1932);
menuNav._preventClickHandle.detach();
									_yuitest_coverline("build/node-menunav/node-menunav.js", 1933);
menuNav._preventClickHandle = null;

								});

							}
							
							_yuitest_coverline("build/node-menunav/node-menunav.js", 1939);
if (sType == MOUSEDOWN) {

								//	Prevent the target from getting focused by 
								//	default, since the element to be focused will
								//	be determined by weather or not the submenu
								//	is visible.
								_yuitest_coverline("build/node-menunav/node-menunav.js", 1945);
event.preventDefault();

								//	FocusManager will attempt to focus any 
								//	descendant that is the target of the mousedown
								//	event.  Since we want to explicitly control 
	 							//	where focus is going, we need to call 
								//	"stopImmediatePropagation" to stop the 
								//	FocusManager from doing its thing.
								_yuitest_coverline("build/node-menunav/node-menunav.js", 1953);
event.stopImmediatePropagation();	

								//	The "_focusItem" method relies on the 
								//	"_hasFocus" property being set to true.  The
								//	"_hasFocus" property is normally set via a 
								//	"focus" event listener, but since we've 
								//	blocked focus from happening, we need to set 
								//	this property manually.
								_yuitest_coverline("build/node-menunav/node-menunav.js", 1961);
menuNav._hasFocus = true;

							}

								
							_yuitest_coverline("build/node-menunav/node-menunav.js", 1966);
if (menuNav._isRoot(getParentMenu(oTarget))) {	//	Event target is a submenu label in the root menu
							
								//	Menu label toggle functionality
							
								_yuitest_coverline("build/node-menunav/node-menunav.js", 1970);
if (hasVisibleSubmenu(oMenuLabel)) {
							
									_yuitest_coverline("build/node-menunav/node-menunav.js", 1972);
menuNav._hideMenu(oSubmenu);
									_yuitest_coverline("build/node-menunav/node-menunav.js", 1973);
menuNav._focusItem(oMenuLabel);	
									_yuitest_coverline("build/node-menunav/node-menunav.js", 1974);
menuNav._setActiveItem(oMenuLabel);
									
								}
								else {
							
									_yuitest_coverline("build/node-menunav/node-menunav.js", 1979);
menuNav._hideAllSubmenus(menuNav._rootMenu);
									_yuitest_coverline("build/node-menunav/node-menunav.js", 1980);
menuNav._showMenu(oSubmenu);

									_yuitest_coverline("build/node-menunav/node-menunav.js", 1982);
menuNav._focusItem(getFirstItem(oSubmenu));
									_yuitest_coverline("build/node-menunav/node-menunav.js", 1983);
menuNav._setActiveItem(getFirstItem(oSubmenu));
									
								}
							
							}
							else {	//	Event target is a submenu label within a submenu
							
								_yuitest_coverline("build/node-menunav/node-menunav.js", 1990);
if (menuNav._activeItem == oMenuLabel) {
							
									_yuitest_coverline("build/node-menunav/node-menunav.js", 1992);
menuNav._showMenu(oSubmenu);
									_yuitest_coverline("build/node-menunav/node-menunav.js", 1993);
menuNav._focusItem(getFirstItem(oSubmenu));
									_yuitest_coverline("build/node-menunav/node-menunav.js", 1994);
menuNav._setActiveItem(getFirstItem(oSubmenu));										
							
								}
								else {
							
									_yuitest_coverline("build/node-menunav/node-menunav.js", 1999);
if (!oMenuLabel._clickHandle) {

										_yuitest_coverline("build/node-menunav/node-menunav.js", 2001);
oMenuLabel._clickHandle = oMenuLabel.on("click", function () {

											_yuitest_coverfunc("build/node-menunav/node-menunav.js", "(anonymous 8)", 2001);
_yuitest_coverline("build/node-menunav/node-menunav.js", 2003);
menuNav._hideAllSubmenus(menuNav._rootMenu);

											_yuitest_coverline("build/node-menunav/node-menunav.js", 2005);
menuNav._hasFocus = false;
											_yuitest_coverline("build/node-menunav/node-menunav.js", 2006);
menuNav._clearActiveItem();


											_yuitest_coverline("build/node-menunav/node-menunav.js", 2009);
oMenuLabel._clickHandle.detach();
											
											_yuitest_coverline("build/node-menunav/node-menunav.js", 2011);
oMenuLabel._clickHandle = null;

										});
										
									}
									
								}
								
							}

						}


						_yuitest_coverline("build/node-menunav/node-menunav.js", 2024);
if (sType === CLICK) {
						
							//	Prevent the browser from following the URL of 
							//	the anchor element
							
							_yuitest_coverline("build/node-menunav/node-menunav.js", 2029);
event.preventDefault();
						
						}
					
					}
				
				}				


			}
		
		}
	
	},
	

	/**
	* @method _onKeyPress
	* @description "keypress" event handler for the menu.
	* @protected
	* @param {Object} event Object representing the DOM event.
	*/
	_onKeyPress: function (event) {
	
		_yuitest_coverfunc("build/node-menunav/node-menunav.js", "_onKeyPress", 2051);
_yuitest_coverline("build/node-menunav/node-menunav.js", 2053);
switch (event.keyCode) {

			case 37:	//	left arrow
			case 38:	//	up arrow
			case 39:	//	right arrow
			case 40:	//	down arrow

				//	Prevent the browser from scrolling the window

				_yuitest_coverline("build/node-menunav/node-menunav.js", 2062);
event.preventDefault();

			_yuitest_coverline("build/node-menunav/node-menunav.js", 2064);
break;

		}						

	},	


	/**
	* @method _onKeyDown
	* @description "keydown" event handler for the menu.
	* @protected
	* @param {Object} event Object representing the DOM event.
	*/
	_onKeyDown: function (event) {

		_yuitest_coverfunc("build/node-menunav/node-menunav.js", "_onKeyDown", 2077);
_yuitest_coverline("build/node-menunav/node-menunav.js", 2079);
var menuNav = this,
			oActiveItem = menuNav._activeItem,
			oTarget = event.target,
			oActiveMenu = getParentMenu(oTarget),
			oSubmenu;

		_yuitest_coverline("build/node-menunav/node-menunav.js", 2085);
if (oActiveMenu) {

			_yuitest_coverline("build/node-menunav/node-menunav.js", 2087);
menuNav._activeMenu = oActiveMenu;

			_yuitest_coverline("build/node-menunav/node-menunav.js", 2089);
if (isHorizontalMenu(oActiveMenu)) {
				_yuitest_coverline("build/node-menunav/node-menunav.js", 2090);
menuNav._onHorizontalMenuKeyDown(event);
			}
			else {
				_yuitest_coverline("build/node-menunav/node-menunav.js", 2093);
menuNav._onVerticalMenuKeyDown(event);
			}


			_yuitest_coverline("build/node-menunav/node-menunav.js", 2097);
if (event.keyCode === 27) {

				_yuitest_coverline("build/node-menunav/node-menunav.js", 2099);
if (!menuNav._isRoot(oActiveMenu)) {

					_yuitest_coverline("build/node-menunav/node-menunav.js", 2101);
if (UA.opera) {
						_yuitest_coverline("build/node-menunav/node-menunav.js", 2102);
later(0, menuNav, function () {
							_yuitest_coverfunc("build/node-menunav/node-menunav.js", "(anonymous 9)", 2102);
_yuitest_coverline("build/node-menunav/node-menunav.js", 2103);
menuNav._hideMenu(oActiveMenu, true);
						});						
					}
					else {
						_yuitest_coverline("build/node-menunav/node-menunav.js", 2107);
menuNav._hideMenu(oActiveMenu, true);						
					}

					_yuitest_coverline("build/node-menunav/node-menunav.js", 2110);
event.stopPropagation();
					_yuitest_coverline("build/node-menunav/node-menunav.js", 2111);
menuNav._blockMouseEvent = UA.gecko ? true : false;

				}
				else {_yuitest_coverline("build/node-menunav/node-menunav.js", 2114);
if (oActiveItem) {

					_yuitest_coverline("build/node-menunav/node-menunav.js", 2116);
if (isMenuLabel(oActiveItem) && 
							hasVisibleSubmenu(oActiveItem)) {
					
						_yuitest_coverline("build/node-menunav/node-menunav.js", 2119);
oSubmenu = oActiveItem.next();

						_yuitest_coverline("build/node-menunav/node-menunav.js", 2121);
if (oSubmenu) {
							_yuitest_coverline("build/node-menunav/node-menunav.js", 2122);
menuNav._hideMenu(oSubmenu);
						}

					}
					else {

						_yuitest_coverline("build/node-menunav/node-menunav.js", 2128);
menuNav._focusManager.blur();

						//	This is necessary for Webkit since blurring the 
						//	active menuitem won't result in the document 
						//	gaining focus, meaning the that _onDocFocus 
						//	listener won't clear the active menuitem.

						_yuitest_coverline("build/node-menunav/node-menunav.js", 2135);
menuNav._clearActiveItem();	
						
						_yuitest_coverline("build/node-menunav/node-menunav.js", 2137);
menuNav._hasFocus = false;

					}

				}}
			
			}
		
		}
	
	},
	
	/**
	* @method _onDocMouseDown
	* @description "mousedown" event handler for the owner document of 
	* the menu.
	* @protected
	* @param {Object} event Object representing the DOM event.
	*/
	_onDocMouseDown: function (event) {

		_yuitest_coverfunc("build/node-menunav/node-menunav.js", "_onDocMouseDown", 2156);
_yuitest_coverline("build/node-menunav/node-menunav.js", 2158);
var menuNav = this,
			oRoot = menuNav._rootMenu,
			oTarget = event.target;


		_yuitest_coverline("build/node-menunav/node-menunav.js", 2163);
if (!(oRoot.compareTo(oTarget) || oRoot.contains(oTarget))) {

			_yuitest_coverline("build/node-menunav/node-menunav.js", 2165);
menuNav._hideAllSubmenus(oRoot);

			//	Document doesn't receive focus in Webkit when the user mouses 
			//	down on it, so the "_hasFocus" property won't get set to the 
			//	correct value.  The following line corrects the problem.

			_yuitest_coverline("build/node-menunav/node-menunav.js", 2171);
if (UA.webkit) {
				_yuitest_coverline("build/node-menunav/node-menunav.js", 2172);
menuNav._hasFocus = false;
				_yuitest_coverline("build/node-menunav/node-menunav.js", 2173);
menuNav._clearActiveItem();
			}

		}

	}
	
});


_yuitest_coverline("build/node-menunav/node-menunav.js", 2183);
Y.namespace('Plugin');

_yuitest_coverline("build/node-menunav/node-menunav.js", 2185);
Y.Plugin.NodeMenuNav = NodeMenuNav;


}, '@VERSION@', {"requires": ["node", "classnamemanager", "plugin", "node-focusmanager"], "skinnable": true});
