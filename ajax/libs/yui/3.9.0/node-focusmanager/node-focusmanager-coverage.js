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
_yuitest_coverage["build/node-focusmanager/node-focusmanager.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/node-focusmanager/node-focusmanager.js",
    code: []
};
_yuitest_coverage["build/node-focusmanager/node-focusmanager.js"].code=["YUI.add('node-focusmanager', function (Y, NAME) {","","/**","* <p>The Focus Manager Node Plugin makes it easy to manage focus among","* a Node's descendants.  Primarily intended to help with widget development,","* the Focus Manager Node Plugin can be used to improve the keyboard","* accessibility of widgets.</p>","*","* <p>","* When designing widgets that manage a set of descendant controls (i.e. buttons","* in a toolbar, tabs in a tablist, menuitems in a menu, etc.) it is important to","* limit the number of descendants in the browser's default tab flow.  The fewer","* number of descendants in the default tab flow, the easier it is for keyboard","* users to navigate between widgets by pressing the tab key.  When a widget has","* focus it should provide a set of shortcut keys (typically the arrow keys)","* to move focus among its descendants.","* </p>","*","* <p>","* To this end, the Focus Manager Node Plugin makes it easy to define a Node's","* focusable descendants, define which descendant should be in the default tab","* flow, and define the keys that move focus among each descendant.","* Additionally, as the CSS","* <a href=\"http://www.w3.org/TR/CSS21/selector.html#x38\"><code>:focus</code></a>","* pseudo class is not supported on all elements in all","* <a href=\"http://developer.yahoo.com/yui/articles/gbs/\">A-Grade browsers</a>,","* the Focus Manager Node Plugin provides an easy, cross-browser means of","* styling focus.","* </p>","*","","DEPRECATED: The FocusManager Node Plugin has been deprecated as of YUI 3.9.0. This module will be removed from the library in a future version. If you require functionality similar to the one provided by this  module, consider taking a look at the various modules in the YUI Gallery <http://yuilibrary.com/gallery/>. ","","* @module node-focusmanager","* @deprecated 3.9.0","*/","","	//	Frequently used strings","","var ACTIVE_DESCENDANT = \"activeDescendant\",","	ID = \"id\",","	DISABLED = \"disabled\",","	TAB_INDEX = \"tabIndex\",","	FOCUSED = \"focused\",","	FOCUS_CLASS = \"focusClass\",","	CIRCULAR = \"circular\",","	UI = \"UI\",","	KEY = \"key\",","	ACTIVE_DESCENDANT_CHANGE = ACTIVE_DESCENDANT + \"Change\",","	HOST = \"host\",","","	//	Collection of keys that, when pressed, cause the browser viewport","	//	to scroll.","	scrollKeys = {","		37: true,","		38: true,","		39: true,","		40: true","	},","","	clickableElements = {","		\"a\": true,","		\"button\": true,","		\"input\": true,","		\"object\": true","	},","","	//	Library shortcuts","","	Lang = Y.Lang,"," 	UA = Y.UA,","","	/**","	* The NodeFocusManager class is a plugin for a Node instance.  The class is used","	* via the <a href=\"Node.html#method_plug\"><code>plug</code></a> method of Node","	* and should not be instantiated directly.","	* @namespace plugin","	* @class NodeFocusManager","	*/","	NodeFocusManager = function () {","","		NodeFocusManager.superclass.constructor.apply(this, arguments);","","	};","","","NodeFocusManager.ATTRS = {","","	/**","	* Boolean indicating that one of the descendants is focused.","	*","	* @attribute focused","	* @readOnly","	* @default false","	* @type boolean","	*/","	focused: {","","		value: false,","		readOnly: true","","	},","","","	/**","	* String representing the CSS selector used to define the descendant Nodes","	* whose focus should be managed.","	*","	* @attribute descendants","	* @type Y.NodeList","	*/","	descendants: {","","		getter: function (value) {","			","			return this.get(HOST).all(value);","","		}","","	},","","","	/**","	* <p>Node, or index of the Node, representing the descendant that is either","	* focused or is focusable (<code>tabIndex</code> attribute is set to 0).","	* The value cannot represent a disabled descendant Node.  Use a value of -1","	* to remove all descendant Nodes from the default tab flow.","	* If no value is specified, the active descendant will be inferred using","	* the following criteria:</p>","	* <ol>","	* <li>Examining the <code>tabIndex</code> attribute of each descendant and","	* using the first descendant whose <code>tabIndex</code> attribute is set","	* to 0</li>","	* <li>If no default can be inferred then the value is set to either 0 or","	* the index of the first enabled descendant.</li>","	* </ol>","	*","	* @attribute activeDescendant","	* @type Number","	*/","	activeDescendant: {","","		setter: function (value) {","","			var isNumber = Lang.isNumber,","				INVALID_VALUE = Y.Attribute.INVALID_VALUE,","				descendantsMap = this._descendantsMap,","				descendants = this._descendants,","				nodeIndex,","				returnValue,","				oNode;","","","			if (isNumber(value)) {","				nodeIndex = value;","				returnValue = nodeIndex;","			}","			else if ((value instanceof Y.Node) && descendantsMap) {","","				nodeIndex = descendantsMap[value.get(ID)];","","				if (isNumber(nodeIndex)) {","					returnValue = nodeIndex;","				}","				else {","","					//	The user passed a reference to a Node that wasn't one","					//	of the descendants.","					returnValue = INVALID_VALUE;","","				}","","			}","			else {","				returnValue = INVALID_VALUE;","			}","","","			if (descendants) {","","				oNode = descendants.item(nodeIndex);","","				if (oNode && oNode.get(\"disabled\")) {","","					//	Setting the \"activeDescendant\" attribute to the index","					//	of a disabled descendant is invalid.","					returnValue = INVALID_VALUE;","","				}","","			}","","			","			return returnValue;","","		}","","	},","","","	/**","	* Object literal representing the keys to be used to navigate between the","	* next/previous descendant.  The format for the attribute's value is","	* <code>{ next: \"down:40\", previous: \"down:38\" }</code>.  The value for the","	* \"next\" and \"previous\" properties are used to attach","	* <a href=\"event/#keylistener\"><code>key</code></a> event listeners. See","	* the <a href=\"event/#keylistener\">Using the key Event</a> section of","	* the Event documentation for more information on \"key\" event listeners.","	*","	* @attribute keys","	* @type Object","	*/","	keys: {","","		value: {","","			next: null,","			previous: null","","		}","","","	},","","","	/**","	* String representing the name of class applied to the focused active","	* descendant Node.  Can also be an object literal used to define both the","	* class name, and the Node to which the class should be applied.  If using","	* an object literal, the format is:","	* <code>{ className: \"focus\", fn: myFunction }</code>.  The function","	* referenced by the <code>fn</code> property in the object literal will be","	* passed a reference to the currently focused active descendant Node.","	*","	* @attribute focusClass","	* @type String|Object","	*/","	focusClass: { },","","","	/**","	* Boolean indicating if focus should be set to the first/last descendant","	* when the end or beginning of the descendants has been reached.","	*","	* @attribute circular","	* @type Boolean","	* @default true","	*/","	circular: {","		value: true","	}","","};","","Y.extend(NodeFocusManager, Y.Plugin.Base, {","","	//	Protected properties","","	//	Boolean indicating if the NodeFocusManager is active.","	_stopped: true,","","	//	NodeList representing the descendants selected via the","	//	\"descendants\" attribute.","	_descendants: null,","","	//	Object literal mapping the IDs of each descendant to its index in the","	//	\"_descendants\" NodeList.","	_descendantsMap: null,","","	//	Reference to the Node instance to which the focused class (defined","	//	by the \"focusClass\" attribute) is currently applied.","	_focusedNode: null,","","	//	Number representing the index of the last descendant Node.","	_lastNodeIndex: 0,","","	//	Array of handles for event handlers used for a NodeFocusManager instance.","	_eventHandlers: null,","","","","	//	Protected methods","","	/**","	* @method _initDescendants","	* @description Sets the <code>tabIndex</code> attribute of all of the","	* descendants to -1, except the active descendant, whose","	* <code>tabIndex</code> attribute is set to 0.","	* @protected","	*/","	_initDescendants: function () {","","		var descendants = this.get(\"descendants\"),","			descendantsMap = {},","			nFirstEnabled = -1,","			nDescendants,","			nActiveDescendant = this.get(ACTIVE_DESCENDANT),","			oNode,","			sID,","			i = 0;","","","","		if (Lang.isUndefined(nActiveDescendant)) {","			nActiveDescendant = -1;","		}","","","		if (descendants) {","","			nDescendants = descendants.size();","","","            for (i = 0; i < nDescendants; i++) {","","                oNode = descendants.item(i);","","                if (nFirstEnabled === -1 && !oNode.get(DISABLED)) {","                    nFirstEnabled = i;","                }","","","                //	If the user didn't specify a value for the","                //	\"activeDescendant\" attribute try to infer it from","                //	the markup.","","                //	Need to pass \"2\" when using \"getAttribute\" for IE to get","                //	the attribute value as it is set in the markup.","                //	Need to use \"parseInt\" because IE always returns the","                //	value as a number, whereas all other browsers return","                //	the attribute as a string when accessed","                //	via \"getAttribute\".","","                if (nActiveDescendant < 0 &&","                        parseInt(oNode.getAttribute(TAB_INDEX, 2), 10) === 0) {","","                    nActiveDescendant = i;","","                }","","                if (oNode) {","                    oNode.set(TAB_INDEX, -1);","                }","","                sID = oNode.get(ID);","","                if (!sID) {","                    sID = Y.guid();","                    oNode.set(ID, sID);","                }","","                descendantsMap[sID] = i;","","            }","","","            //	If the user didn't specify a value for the","            //	\"activeDescendant\" attribute and no default value could be","            //	determined from the markup, then default to 0.","","            if (nActiveDescendant < 0) {","                nActiveDescendant = 0;","            }","","","            oNode = descendants.item(nActiveDescendant);","","            //	Check to make sure the active descendant isn't disabled,","            //	and fall back to the first enabled descendant if it is.","","            if (!oNode || oNode.get(DISABLED)) {","                oNode = descendants.item(nFirstEnabled);","                nActiveDescendant = nFirstEnabled;","            }","","            this._lastNodeIndex = nDescendants - 1;","            this._descendants = descendants;","            this._descendantsMap = descendantsMap;","","            this.set(ACTIVE_DESCENDANT, nActiveDescendant);","","            //	Need to set the \"tabIndex\" attribute here, since the","            //	\"activeDescendantChange\" event handler used to manage","            //	the setting of the \"tabIndex\" attribute isn't wired up yet.","","            if (oNode) {","                oNode.set(TAB_INDEX, 0);","            }","","		}","","	},","","","	/**","	* @method _isDescendant","	* @description Determines if the specified Node instance is a descendant","	* managed by the Focus Manager.","	* @param node {Node} Node instance to be checked.","	* @return {Boolean} Boolean indicating if the specified Node instance is a","	* descendant managed by the Focus Manager.","	* @protected","	*/","	_isDescendant: function (node) {","","		return (node.get(ID) in this._descendantsMap);","","	},","","","	/**","	* @method _removeFocusClass","	* @description Removes the class name representing focus (as specified by","	* the \"focusClass\" attribute) from the Node instance to which it is","	* currently applied.","	* @protected","	*/","	_removeFocusClass: function () {","","		var oFocusedNode = this._focusedNode,","			focusClass = this.get(FOCUS_CLASS),","			sClassName;","","		if (focusClass) {","			sClassName = Lang.isString(focusClass) ?","				focusClass : focusClass.className;","		}","","		if (oFocusedNode && sClassName) {","			oFocusedNode.removeClass(sClassName);","		}","","	},","","","	/**","	* @method _detachKeyHandler","	* @description Detaches the \"key\" event handlers used to support the \"keys\"","	* attribute.","	* @protected","	*/","	_detachKeyHandler: function () {","","		var prevKeyHandler = this._prevKeyHandler,","			nextKeyHandler = this._nextKeyHandler;","","		if (prevKeyHandler) {","			prevKeyHandler.detach();","		}","","		if (nextKeyHandler) {","			nextKeyHandler.detach();","		}","","	},","","","	/**","	* @method _preventScroll","	* @description Prevents the viewport from scolling when the user presses","	* the up, down, left, or right key.","	* @protected","	*/","	_preventScroll: function (event) {","","		if (scrollKeys[event.keyCode] && this._isDescendant(event.target)) {","			event.preventDefault();","		}","","	},","","","	/**","	* @method _fireClick","	* @description Fires the click event if the enter key is pressed while","	* focused on an HTML element that is not natively clickable.","	* @protected","	*/","	_fireClick: function (event) {","","		var oTarget = event.target,","			sNodeName = oTarget.get(\"nodeName\").toLowerCase();","","		if (event.keyCode === 13 && (!clickableElements[sNodeName] ||","				(sNodeName === \"a\" && !oTarget.getAttribute(\"href\")))) {","","","			oTarget.simulate(\"click\");","","		}","","	},","","","	/**","	* @method _attachKeyHandler","	* @description Attaches the \"key\" event handlers used to support the \"keys\"","	* attribute.","	* @protected","	*/","	_attachKeyHandler: function () {","","		this._detachKeyHandler();","","		var sNextKey = this.get(\"keys.next\"),","			sPrevKey = this.get(\"keys.previous\"),","			oNode = this.get(HOST),","			aHandlers = this._eventHandlers;","","		if (sPrevKey) {"," 			this._prevKeyHandler =","				Y.on(KEY, Y.bind(this._focusPrevious, this), oNode, sPrevKey);","		}","","		if (sNextKey) {"," 			this._nextKeyHandler =","				Y.on(KEY, Y.bind(this._focusNext, this), oNode, sNextKey);","		}","","","		//	In Opera it is necessary to call the \"preventDefault\" method in","		//	response to the user pressing the arrow keys in order to prevent","		//	the viewport from scrolling when the user is moving focus among","		//	the focusable descendants.","","		if (UA.opera) {","			aHandlers.push(oNode.on(\"keypress\", this._preventScroll, this));","		}","","","		//	For all browsers except Opera: HTML elements that are not natively","		//	focusable but made focusable via the tabIndex attribute don't","		//	fire a click event when the user presses the enter key.  It is","		//	possible to work around this problem by simplying dispatching a","		//	click event in response to the user pressing the enter key.","","		if (!UA.opera) {","			aHandlers.push(oNode.on(\"keypress\", this._fireClick, this));","		}","","	},","","","	/**","	* @method _detachEventHandlers","	* @description Detaches all event handlers used by the Focus Manager.","	* @protected","	*/","	_detachEventHandlers: function () {","","		this._detachKeyHandler();","","		var aHandlers = this._eventHandlers;","","		if (aHandlers) {","","			Y.Array.each(aHandlers, function (handle) {","				handle.detach();","			});","","			this._eventHandlers = null;","","		}","","	},","","","	/**","	* @method _detachEventHandlers","	* @description Attaches all event handlers used by the Focus Manager.","	* @protected","	*/","	_attachEventHandlers: function () {","","		var descendants = this._descendants,","			aHandlers,","			oDocument,","			handle;","","		if (descendants && descendants.size()) {","","			aHandlers = this._eventHandlers || [];","			oDocument = this.get(HOST).get(\"ownerDocument\");","","","			if (aHandlers.length === 0) {","","","				aHandlers.push(oDocument.on(\"focus\", this._onDocFocus, this));","","				aHandlers.push(oDocument.on(\"mousedown\",","					this._onDocMouseDown, this));","","				aHandlers.push(","						this.after(\"keysChange\", this._attachKeyHandler));","","				aHandlers.push(","						this.after(\"descendantsChange\", this._initDescendants));","","				aHandlers.push(","						this.after(ACTIVE_DESCENDANT_CHANGE,","								this._afterActiveDescendantChange));","","","				//	For performance: defer attaching all key-related event","				//	handlers until the first time one of the specified","				//	descendants receives focus.","","				handle = this.after(\"focusedChange\", Y.bind(function (event) {","","					if (event.newVal) {","","","						this._attachKeyHandler();","","						//	Detach this \"focusedChange\" handler so that the","						//	key-related handlers only get attached once.","","						handle.detach();","","					}","","				}, this));","","				aHandlers.push(handle);","","			}","","","			this._eventHandlers = aHandlers;","","		}","","	},","","","	//	Protected event handlers","","	/**","	* @method _onDocMouseDown","	* @description \"mousedown\" event handler for the owner document of the","	* Focus Manager's Node.","	* @protected","	* @param event {Object} Object representing the DOM event.","	*/","	_onDocMouseDown: function (event) {","","		var oHost = this.get(HOST),","			oTarget = event.target,","			bChildNode = oHost.contains(oTarget),","			node,","","			getFocusable = function (node) {","","				var returnVal = false;","","				if (!node.compareTo(oHost)) {","","					returnVal = this._isDescendant(node) ? node :","									getFocusable.call(this, node.get(\"parentNode\"));","","				}","","				return returnVal;","","			};","","","		if (bChildNode) {","","			//	Check to make sure that the target isn't a child node of one","			//	of the focusable descendants.","","			node = getFocusable.call(this, oTarget);","","			if (node) {","				oTarget = node;","			}","			else if (!node && this.get(FOCUSED)) {","","				//	The target was a non-focusable descendant of the root","				//	node, so the \"focused\" attribute should be set to false.","","	 			this._set(FOCUSED, false);","	 			this._onDocFocus(event);","","			}","","		}","","","		if (bChildNode && this._isDescendant(oTarget)) {","","			//	Fix general problem in Webkit: mousing down on a button or an","			//	anchor element doesn't focus it.","","			//	For all browsers: makes sure that the descendant that","			//	was the target of the mousedown event is now considered the","			//	active descendant.","","			this.focus(oTarget);","		}","		else if (UA.webkit && this.get(FOCUSED) &&","			(!bChildNode || (bChildNode && !this._isDescendant(oTarget)))) {","","			//	Fix for Webkit:","","			//	Document doesn't receive focus in Webkit when the user mouses","			//	down on it, so the \"focused\" attribute won't get set to the","			//	correct value.","","			//	The goal is to force a blur if the user moused down on","			//	either: 1) A descendant node, but not one that managed by","			//	the FocusManager, or 2) an element outside of the","			//	FocusManager",""," 			this._set(FOCUSED, false);"," 			this._onDocFocus(event);","","		}","","	},","","","	/**","	* @method _onDocFocus","	* @description \"focus\" event handler for the owner document of the","	* Focus Manager's Node.","	* @protected","	* @param event {Object} Object representing the DOM event.","	*/","	_onDocFocus: function (event) {","","		var oTarget = this._focusTarget || event.target,","			bFocused = this.get(FOCUSED),","			focusClass = this.get(FOCUS_CLASS),","			oFocusedNode = this._focusedNode,","			bInCollection;","","		if (this._focusTarget) {","			this._focusTarget = null;","		}","","","		if (this.get(HOST).contains(oTarget)) {","","			//	The target is a descendant of the root Node.","","			bInCollection = this._isDescendant(oTarget);","","			if (!bFocused && bInCollection) {","","				//	The user has focused a focusable descendant.","","				bFocused = true;","","			}","			else if (bFocused && !bInCollection) {","","				//	The user has focused a child of the root Node that is","				//	not one of the descendants managed by this Focus Manager","				//	so clear the currently focused descendant.","","				bFocused = false;","","			}","","		}","		else {","","			// The target is some other node in the document.","","			bFocused = false;","","		}","","","		if (focusClass) {","","			if (oFocusedNode && (!oFocusedNode.compareTo(oTarget) || !bFocused)) {","				this._removeFocusClass();","			}","","			if (bInCollection && bFocused) {","","				if (focusClass.fn) {","					oTarget = focusClass.fn(oTarget);","					oTarget.addClass(focusClass.className);","				}","				else {","					oTarget.addClass(focusClass);","				}","","				this._focusedNode = oTarget;","","			}","","		}","","","		this._set(FOCUSED, bFocused);","","	},","","","	/**","	* @method _focusNext","	* @description Keydown event handler that moves focus to the next","	* enabled descendant.","	* @protected","	* @param event {Object} Object representing the DOM event.","	* @param activeDescendant {Number} Number representing the index of the","	* next descendant to be focused","	*/","	_focusNext: function (event, activeDescendant) {","","		var nActiveDescendant = activeDescendant || this.get(ACTIVE_DESCENDANT),","			oNode;","","","		if (this._isDescendant(event.target) &&","			(nActiveDescendant <= this._lastNodeIndex)) {","","			nActiveDescendant = nActiveDescendant + 1;","","			if (nActiveDescendant === (this._lastNodeIndex + 1) &&","				this.get(CIRCULAR)) {","","				nActiveDescendant = 0;","","			}","","			oNode = this._descendants.item(nActiveDescendant);","","            if (oNode) {","","                if (oNode.get(\"disabled\")) {","                    this._focusNext(event, nActiveDescendant);","                }","                else {","                    this.focus(nActiveDescendant);","                }","","            }","","		}","","		this._preventScroll(event);","","	},","","","	/**","	* @method _focusPrevious","	* @description Keydown event handler that moves focus to the previous","	* enabled descendant.","	* @protected","	* @param event {Object} Object representing the DOM event.","	* @param activeDescendant {Number} Number representing the index of the","	* next descendant to be focused.","	*/","	_focusPrevious: function (event, activeDescendant) {","","		var nActiveDescendant = activeDescendant || this.get(ACTIVE_DESCENDANT),","			oNode;","","		if (this._isDescendant(event.target) && nActiveDescendant >= 0) {","","			nActiveDescendant = nActiveDescendant - 1;","","			if (nActiveDescendant === -1 && this.get(CIRCULAR)) {","				nActiveDescendant = this._lastNodeIndex;","			}","","            oNode = this._descendants.item(nActiveDescendant);","","            if (oNode) {","","                if (oNode.get(\"disabled\")) {","                    this._focusPrevious(event, nActiveDescendant);","                }","                else {","                    this.focus(nActiveDescendant);","                }","","            }","","		}","","		this._preventScroll(event);","","	},","","","	/**","	* @method _afterActiveDescendantChange","	* @description afterChange event handler for the","	* \"activeDescendant\" attribute.","	* @protected","	* @param event {Object} Object representing the change event.","	*/","	_afterActiveDescendantChange: function (event) {","","		var oNode = this._descendants.item(event.prevVal);","","		if (oNode) {","			oNode.set(TAB_INDEX, -1);","		}","","		oNode = this._descendants.item(event.newVal);","","		if (oNode) {","			oNode.set(TAB_INDEX, 0);","		}","","	},","","","","	//	Public methods","","    initializer: function (config) {","		this.start();","","    },","","	destructor: function () {","		","		this.stop();","		this.get(HOST).focusManager = null;","","    },","","","	/**","	* @method focus","	* @description Focuses the active descendant and sets the","	* <code>focused</code> attribute to true.","	* @param index {Number} Optional. Number representing the index of the","	* descendant to be set as the active descendant.","	* @param index {Node} Optional. Node instance representing the","	* descendant to be set as the active descendant.","	*/","	focus: function (index) {","		","		if (Lang.isUndefined(index)) {","			index = this.get(ACTIVE_DESCENDANT);","		}","","		this.set(ACTIVE_DESCENDANT, index, { src: UI });","","		var oNode = this._descendants.item(this.get(ACTIVE_DESCENDANT));","","		if (oNode) {","","			oNode.focus();","","			//	In Opera focusing a <BUTTON> element programmatically","			//	will result in the document-level focus event handler","			//	\"_onDocFocus\" being called, resulting in the handler","			//	incorrectly setting the \"focused\" Attribute to false.  To fix","			//	this, set a flag (\"_focusTarget\") that the \"_onDocFocus\" method","			//	can look for to properly handle this edge case.","","			if (UA.opera && oNode.get(\"nodeName\").toLowerCase() === \"button\") {","				this._focusTarget = oNode;","			}","","		}","","	},","","","	/**","	* @method blur","	* @description Blurs the current active descendant and sets the","	* <code>focused</code> attribute to false.","	*/","	blur: function () {","		","		var oNode;","		","		if (this.get(FOCUSED)) {","","			oNode = this._descendants.item(this.get(ACTIVE_DESCENDANT));","","			if (oNode) {","","				oNode.blur();","","				//	For Opera and Webkit:  Blurring an element in either browser","				//	doesn't result in another element (such as the document)","				//	being focused.  Therefore, the \"_onDocFocus\" method","				//	responsible for managing the application and removal of the","				//	focus indicator class name is never called.","","				this._removeFocusClass();","","			}","","			this._set(FOCUSED, false, { src: UI });","		}","","	},","","","	/**","	* @method start","	* @description Enables the Focus Manager.","	*/","	start: function () {","		","		if (this._stopped) {","","			this._initDescendants();","			this._attachEventHandlers();","","			this._stopped = false;","","		}","","	},","","","	/**","	* @method stop","	* @description Disables the Focus Manager by detaching all event handlers.","	*/","	stop: function () {","		","		if (!this._stopped) {","","			this._detachEventHandlers();","","			this._descendants = null;","			this._focusedNode = null;","			this._lastNodeIndex = 0;","			this._stopped = true;","","		}","","	},","","","	/**","	* @method refresh","	* @description Refreshes the Focus Manager's descendants by re-executing the","	* CSS selector query specified by the <code>descendants</code> attribute.","	*/","	refresh: function () {","		","		this._initDescendants();","","		if (!this._eventHandlers) {","			this._attachEventHandlers();","		}","","	}","","});","","","NodeFocusManager.NAME = \"nodeFocusManager\";","NodeFocusManager.NS = \"focusManager\";","","Y.namespace(\"Plugin\");","Y.Plugin.NodeFocusManager = NodeFocusManager;","","","}, '@VERSION@', {\"requires\": [\"attribute\", \"node\", \"plugin\", \"node-event-simulate\", \"event-key\", \"event-focus\"]});"];
_yuitest_coverage["build/node-focusmanager/node-focusmanager.js"].lines = {"1":0,"40":0,"82":0,"87":0,"116":0,"145":0,"154":0,"155":0,"156":0,"158":0,"160":0,"162":0,"163":0,"169":0,"175":0,"179":0,"181":0,"183":0,"187":0,"194":0,"255":0,"293":0,"304":0,"305":0,"309":0,"311":0,"314":0,"316":0,"318":0,"319":0,"334":0,"337":0,"341":0,"342":0,"345":0,"347":0,"348":0,"349":0,"352":0,"361":0,"362":0,"366":0,"371":0,"372":0,"373":0,"376":0,"377":0,"378":0,"380":0,"386":0,"387":0,"406":0,"420":0,"424":0,"425":0,"429":0,"430":0,"444":0,"447":0,"448":0,"451":0,"452":0,"466":0,"467":0,"481":0,"484":0,"488":0,"503":0,"505":0,"510":0,"511":0,"515":0,"516":0,"526":0,"527":0,"537":0,"538":0,"551":0,"553":0,"555":0,"557":0,"558":0,"561":0,"575":0,"580":0,"582":0,"583":0,"586":0,"589":0,"591":0,"594":0,"597":0,"600":0,"609":0,"611":0,"614":0,"619":0,"625":0,"630":0,"648":0,"655":0,"657":0,"659":0,"664":0,"669":0,"674":0,"676":0,"677":0,"679":0,"684":0,"685":0,"692":0,"701":0,"703":0,"717":0,"718":0,"734":0,"740":0,"741":0,"745":0,"749":0,"751":0,"755":0,"758":0,"764":0,"773":0,"778":0,"780":0,"781":0,"784":0,"786":0,"787":0,"788":0,"791":0,"794":0,"801":0,"817":0,"821":0,"824":0,"826":0,"829":0,"833":0,"835":0,"837":0,"838":0,"841":0,"848":0,"864":0,"867":0,"869":0,"871":0,"872":0,"875":0,"877":0,"879":0,"880":0,"883":0,"890":0,"904":0,"906":0,"907":0,"910":0,"912":0,"913":0,"923":0,"929":0,"930":0,"946":0,"947":0,"950":0,"952":0,"954":0,"956":0,"965":0,"966":0,"981":0,"983":0,"985":0,"987":0,"989":0,"997":0,"1001":0,"1013":0,"1015":0,"1016":0,"1018":0,"1031":0,"1033":0,"1035":0,"1036":0,"1037":0,"1038":0,"1052":0,"1054":0,"1055":0,"1063":0,"1064":0,"1066":0,"1067":0};
_yuitest_coverage["build/node-focusmanager/node-focusmanager.js"].functions = {"NodeFocusManager:80":0,"getter:114":0,"setter:143":0,"_initDescendants:291":0,"_isDescendant:404":0,"_removeFocusClass:418":0,"_detachKeyHandler:442":0,"_preventScroll:464":0,"_fireClick:479":0,"_attachKeyHandler:501":0,"(anonymous 2):557":0,"_detachEventHandlers:549":0,"(anonymous 3):609":0,"_attachEventHandlers:573":0,"getFocusable:653":0,"_onDocMouseDown:646":0,"_onDocFocus:732":0,"_focusNext:815":0,"_focusPrevious:862":0,"_afterActiveDescendantChange:902":0,"initializer:922":0,"destructor:927":0,"focus:944":0,"blur:979":0,"start:1011":0,"stop:1029":0,"refresh:1050":0,"(anonymous 1):1":0};
_yuitest_coverage["build/node-focusmanager/node-focusmanager.js"].coveredLines = 199;
_yuitest_coverage["build/node-focusmanager/node-focusmanager.js"].coveredFunctions = 28;
_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 1);
YUI.add('node-focusmanager', function (Y, NAME) {

/**
* <p>The Focus Manager Node Plugin makes it easy to manage focus among
* a Node's descendants.  Primarily intended to help with widget development,
* the Focus Manager Node Plugin can be used to improve the keyboard
* accessibility of widgets.</p>
*
* <p>
* When designing widgets that manage a set of descendant controls (i.e. buttons
* in a toolbar, tabs in a tablist, menuitems in a menu, etc.) it is important to
* limit the number of descendants in the browser's default tab flow.  The fewer
* number of descendants in the default tab flow, the easier it is for keyboard
* users to navigate between widgets by pressing the tab key.  When a widget has
* focus it should provide a set of shortcut keys (typically the arrow keys)
* to move focus among its descendants.
* </p>
*
* <p>
* To this end, the Focus Manager Node Plugin makes it easy to define a Node's
* focusable descendants, define which descendant should be in the default tab
* flow, and define the keys that move focus among each descendant.
* Additionally, as the CSS
* <a href="http://www.w3.org/TR/CSS21/selector.html#x38"><code>:focus</code></a>
* pseudo class is not supported on all elements in all
* <a href="http://developer.yahoo.com/yui/articles/gbs/">A-Grade browsers</a>,
* the Focus Manager Node Plugin provides an easy, cross-browser means of
* styling focus.
* </p>
*

DEPRECATED: The FocusManager Node Plugin has been deprecated as of YUI 3.9.0. This module will be removed from the library in a future version. If you require functionality similar to the one provided by this  module, consider taking a look at the various modules in the YUI Gallery <http://yuilibrary.com/gallery/>. 

* @module node-focusmanager
* @deprecated 3.9.0
*/

	//	Frequently used strings

_yuitest_coverfunc("build/node-focusmanager/node-focusmanager.js", "(anonymous 1)", 1);
_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 40);
var ACTIVE_DESCENDANT = "activeDescendant",
	ID = "id",
	DISABLED = "disabled",
	TAB_INDEX = "tabIndex",
	FOCUSED = "focused",
	FOCUS_CLASS = "focusClass",
	CIRCULAR = "circular",
	UI = "UI",
	KEY = "key",
	ACTIVE_DESCENDANT_CHANGE = ACTIVE_DESCENDANT + "Change",
	HOST = "host",

	//	Collection of keys that, when pressed, cause the browser viewport
	//	to scroll.
	scrollKeys = {
		37: true,
		38: true,
		39: true,
		40: true
	},

	clickableElements = {
		"a": true,
		"button": true,
		"input": true,
		"object": true
	},

	//	Library shortcuts

	Lang = Y.Lang,
 	UA = Y.UA,

	/**
	* The NodeFocusManager class is a plugin for a Node instance.  The class is used
	* via the <a href="Node.html#method_plug"><code>plug</code></a> method of Node
	* and should not be instantiated directly.
	* @namespace plugin
	* @class NodeFocusManager
	*/
	NodeFocusManager = function () {

		_yuitest_coverfunc("build/node-focusmanager/node-focusmanager.js", "NodeFocusManager", 80);
_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 82);
NodeFocusManager.superclass.constructor.apply(this, arguments);

	};


_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 87);
NodeFocusManager.ATTRS = {

	/**
	* Boolean indicating that one of the descendants is focused.
	*
	* @attribute focused
	* @readOnly
	* @default false
	* @type boolean
	*/
	focused: {

		value: false,
		readOnly: true

	},


	/**
	* String representing the CSS selector used to define the descendant Nodes
	* whose focus should be managed.
	*
	* @attribute descendants
	* @type Y.NodeList
	*/
	descendants: {

		getter: function (value) {
			
			_yuitest_coverfunc("build/node-focusmanager/node-focusmanager.js", "getter", 114);
_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 116);
return this.get(HOST).all(value);

		}

	},


	/**
	* <p>Node, or index of the Node, representing the descendant that is either
	* focused or is focusable (<code>tabIndex</code> attribute is set to 0).
	* The value cannot represent a disabled descendant Node.  Use a value of -1
	* to remove all descendant Nodes from the default tab flow.
	* If no value is specified, the active descendant will be inferred using
	* the following criteria:</p>
	* <ol>
	* <li>Examining the <code>tabIndex</code> attribute of each descendant and
	* using the first descendant whose <code>tabIndex</code> attribute is set
	* to 0</li>
	* <li>If no default can be inferred then the value is set to either 0 or
	* the index of the first enabled descendant.</li>
	* </ol>
	*
	* @attribute activeDescendant
	* @type Number
	*/
	activeDescendant: {

		setter: function (value) {

			_yuitest_coverfunc("build/node-focusmanager/node-focusmanager.js", "setter", 143);
_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 145);
var isNumber = Lang.isNumber,
				INVALID_VALUE = Y.Attribute.INVALID_VALUE,
				descendantsMap = this._descendantsMap,
				descendants = this._descendants,
				nodeIndex,
				returnValue,
				oNode;


			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 154);
if (isNumber(value)) {
				_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 155);
nodeIndex = value;
				_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 156);
returnValue = nodeIndex;
			}
			else {_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 158);
if ((value instanceof Y.Node) && descendantsMap) {

				_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 160);
nodeIndex = descendantsMap[value.get(ID)];

				_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 162);
if (isNumber(nodeIndex)) {
					_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 163);
returnValue = nodeIndex;
				}
				else {

					//	The user passed a reference to a Node that wasn't one
					//	of the descendants.
					_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 169);
returnValue = INVALID_VALUE;

				}

			}
			else {
				_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 175);
returnValue = INVALID_VALUE;
			}}


			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 179);
if (descendants) {

				_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 181);
oNode = descendants.item(nodeIndex);

				_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 183);
if (oNode && oNode.get("disabled")) {

					//	Setting the "activeDescendant" attribute to the index
					//	of a disabled descendant is invalid.
					_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 187);
returnValue = INVALID_VALUE;

				}

			}

			
			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 194);
return returnValue;

		}

	},


	/**
	* Object literal representing the keys to be used to navigate between the
	* next/previous descendant.  The format for the attribute's value is
	* <code>{ next: "down:40", previous: "down:38" }</code>.  The value for the
	* "next" and "previous" properties are used to attach
	* <a href="event/#keylistener"><code>key</code></a> event listeners. See
	* the <a href="event/#keylistener">Using the key Event</a> section of
	* the Event documentation for more information on "key" event listeners.
	*
	* @attribute keys
	* @type Object
	*/
	keys: {

		value: {

			next: null,
			previous: null

		}


	},


	/**
	* String representing the name of class applied to the focused active
	* descendant Node.  Can also be an object literal used to define both the
	* class name, and the Node to which the class should be applied.  If using
	* an object literal, the format is:
	* <code>{ className: "focus", fn: myFunction }</code>.  The function
	* referenced by the <code>fn</code> property in the object literal will be
	* passed a reference to the currently focused active descendant Node.
	*
	* @attribute focusClass
	* @type String|Object
	*/
	focusClass: { },


	/**
	* Boolean indicating if focus should be set to the first/last descendant
	* when the end or beginning of the descendants has been reached.
	*
	* @attribute circular
	* @type Boolean
	* @default true
	*/
	circular: {
		value: true
	}

};

_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 255);
Y.extend(NodeFocusManager, Y.Plugin.Base, {

	//	Protected properties

	//	Boolean indicating if the NodeFocusManager is active.
	_stopped: true,

	//	NodeList representing the descendants selected via the
	//	"descendants" attribute.
	_descendants: null,

	//	Object literal mapping the IDs of each descendant to its index in the
	//	"_descendants" NodeList.
	_descendantsMap: null,

	//	Reference to the Node instance to which the focused class (defined
	//	by the "focusClass" attribute) is currently applied.
	_focusedNode: null,

	//	Number representing the index of the last descendant Node.
	_lastNodeIndex: 0,

	//	Array of handles for event handlers used for a NodeFocusManager instance.
	_eventHandlers: null,



	//	Protected methods

	/**
	* @method _initDescendants
	* @description Sets the <code>tabIndex</code> attribute of all of the
	* descendants to -1, except the active descendant, whose
	* <code>tabIndex</code> attribute is set to 0.
	* @protected
	*/
	_initDescendants: function () {

		_yuitest_coverfunc("build/node-focusmanager/node-focusmanager.js", "_initDescendants", 291);
_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 293);
var descendants = this.get("descendants"),
			descendantsMap = {},
			nFirstEnabled = -1,
			nDescendants,
			nActiveDescendant = this.get(ACTIVE_DESCENDANT),
			oNode,
			sID,
			i = 0;



		_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 304);
if (Lang.isUndefined(nActiveDescendant)) {
			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 305);
nActiveDescendant = -1;
		}


		_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 309);
if (descendants) {

			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 311);
nDescendants = descendants.size();


            _yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 314);
for (i = 0; i < nDescendants; i++) {

                _yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 316);
oNode = descendants.item(i);

                _yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 318);
if (nFirstEnabled === -1 && !oNode.get(DISABLED)) {
                    _yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 319);
nFirstEnabled = i;
                }


                //	If the user didn't specify a value for the
                //	"activeDescendant" attribute try to infer it from
                //	the markup.

                //	Need to pass "2" when using "getAttribute" for IE to get
                //	the attribute value as it is set in the markup.
                //	Need to use "parseInt" because IE always returns the
                //	value as a number, whereas all other browsers return
                //	the attribute as a string when accessed
                //	via "getAttribute".

                _yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 334);
if (nActiveDescendant < 0 &&
                        parseInt(oNode.getAttribute(TAB_INDEX, 2), 10) === 0) {

                    _yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 337);
nActiveDescendant = i;

                }

                _yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 341);
if (oNode) {
                    _yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 342);
oNode.set(TAB_INDEX, -1);
                }

                _yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 345);
sID = oNode.get(ID);

                _yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 347);
if (!sID) {
                    _yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 348);
sID = Y.guid();
                    _yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 349);
oNode.set(ID, sID);
                }

                _yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 352);
descendantsMap[sID] = i;

            }


            //	If the user didn't specify a value for the
            //	"activeDescendant" attribute and no default value could be
            //	determined from the markup, then default to 0.

            _yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 361);
if (nActiveDescendant < 0) {
                _yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 362);
nActiveDescendant = 0;
            }


            _yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 366);
oNode = descendants.item(nActiveDescendant);

            //	Check to make sure the active descendant isn't disabled,
            //	and fall back to the first enabled descendant if it is.

            _yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 371);
if (!oNode || oNode.get(DISABLED)) {
                _yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 372);
oNode = descendants.item(nFirstEnabled);
                _yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 373);
nActiveDescendant = nFirstEnabled;
            }

            _yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 376);
this._lastNodeIndex = nDescendants - 1;
            _yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 377);
this._descendants = descendants;
            _yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 378);
this._descendantsMap = descendantsMap;

            _yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 380);
this.set(ACTIVE_DESCENDANT, nActiveDescendant);

            //	Need to set the "tabIndex" attribute here, since the
            //	"activeDescendantChange" event handler used to manage
            //	the setting of the "tabIndex" attribute isn't wired up yet.

            _yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 386);
if (oNode) {
                _yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 387);
oNode.set(TAB_INDEX, 0);
            }

		}

	},


	/**
	* @method _isDescendant
	* @description Determines if the specified Node instance is a descendant
	* managed by the Focus Manager.
	* @param node {Node} Node instance to be checked.
	* @return {Boolean} Boolean indicating if the specified Node instance is a
	* descendant managed by the Focus Manager.
	* @protected
	*/
	_isDescendant: function (node) {

		_yuitest_coverfunc("build/node-focusmanager/node-focusmanager.js", "_isDescendant", 404);
_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 406);
return (node.get(ID) in this._descendantsMap);

	},


	/**
	* @method _removeFocusClass
	* @description Removes the class name representing focus (as specified by
	* the "focusClass" attribute) from the Node instance to which it is
	* currently applied.
	* @protected
	*/
	_removeFocusClass: function () {

		_yuitest_coverfunc("build/node-focusmanager/node-focusmanager.js", "_removeFocusClass", 418);
_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 420);
var oFocusedNode = this._focusedNode,
			focusClass = this.get(FOCUS_CLASS),
			sClassName;

		_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 424);
if (focusClass) {
			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 425);
sClassName = Lang.isString(focusClass) ?
				focusClass : focusClass.className;
		}

		_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 429);
if (oFocusedNode && sClassName) {
			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 430);
oFocusedNode.removeClass(sClassName);
		}

	},


	/**
	* @method _detachKeyHandler
	* @description Detaches the "key" event handlers used to support the "keys"
	* attribute.
	* @protected
	*/
	_detachKeyHandler: function () {

		_yuitest_coverfunc("build/node-focusmanager/node-focusmanager.js", "_detachKeyHandler", 442);
_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 444);
var prevKeyHandler = this._prevKeyHandler,
			nextKeyHandler = this._nextKeyHandler;

		_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 447);
if (prevKeyHandler) {
			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 448);
prevKeyHandler.detach();
		}

		_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 451);
if (nextKeyHandler) {
			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 452);
nextKeyHandler.detach();
		}

	},


	/**
	* @method _preventScroll
	* @description Prevents the viewport from scolling when the user presses
	* the up, down, left, or right key.
	* @protected
	*/
	_preventScroll: function (event) {

		_yuitest_coverfunc("build/node-focusmanager/node-focusmanager.js", "_preventScroll", 464);
_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 466);
if (scrollKeys[event.keyCode] && this._isDescendant(event.target)) {
			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 467);
event.preventDefault();
		}

	},


	/**
	* @method _fireClick
	* @description Fires the click event if the enter key is pressed while
	* focused on an HTML element that is not natively clickable.
	* @protected
	*/
	_fireClick: function (event) {

		_yuitest_coverfunc("build/node-focusmanager/node-focusmanager.js", "_fireClick", 479);
_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 481);
var oTarget = event.target,
			sNodeName = oTarget.get("nodeName").toLowerCase();

		_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 484);
if (event.keyCode === 13 && (!clickableElements[sNodeName] ||
				(sNodeName === "a" && !oTarget.getAttribute("href")))) {


			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 488);
oTarget.simulate("click");

		}

	},


	/**
	* @method _attachKeyHandler
	* @description Attaches the "key" event handlers used to support the "keys"
	* attribute.
	* @protected
	*/
	_attachKeyHandler: function () {

		_yuitest_coverfunc("build/node-focusmanager/node-focusmanager.js", "_attachKeyHandler", 501);
_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 503);
this._detachKeyHandler();

		_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 505);
var sNextKey = this.get("keys.next"),
			sPrevKey = this.get("keys.previous"),
			oNode = this.get(HOST),
			aHandlers = this._eventHandlers;

		_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 510);
if (sPrevKey) {
 			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 511);
this._prevKeyHandler =
				Y.on(KEY, Y.bind(this._focusPrevious, this), oNode, sPrevKey);
		}

		_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 515);
if (sNextKey) {
 			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 516);
this._nextKeyHandler =
				Y.on(KEY, Y.bind(this._focusNext, this), oNode, sNextKey);
		}


		//	In Opera it is necessary to call the "preventDefault" method in
		//	response to the user pressing the arrow keys in order to prevent
		//	the viewport from scrolling when the user is moving focus among
		//	the focusable descendants.

		_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 526);
if (UA.opera) {
			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 527);
aHandlers.push(oNode.on("keypress", this._preventScroll, this));
		}


		//	For all browsers except Opera: HTML elements that are not natively
		//	focusable but made focusable via the tabIndex attribute don't
		//	fire a click event when the user presses the enter key.  It is
		//	possible to work around this problem by simplying dispatching a
		//	click event in response to the user pressing the enter key.

		_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 537);
if (!UA.opera) {
			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 538);
aHandlers.push(oNode.on("keypress", this._fireClick, this));
		}

	},


	/**
	* @method _detachEventHandlers
	* @description Detaches all event handlers used by the Focus Manager.
	* @protected
	*/
	_detachEventHandlers: function () {

		_yuitest_coverfunc("build/node-focusmanager/node-focusmanager.js", "_detachEventHandlers", 549);
_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 551);
this._detachKeyHandler();

		_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 553);
var aHandlers = this._eventHandlers;

		_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 555);
if (aHandlers) {

			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 557);
Y.Array.each(aHandlers, function (handle) {
				_yuitest_coverfunc("build/node-focusmanager/node-focusmanager.js", "(anonymous 2)", 557);
_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 558);
handle.detach();
			});

			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 561);
this._eventHandlers = null;

		}

	},


	/**
	* @method _detachEventHandlers
	* @description Attaches all event handlers used by the Focus Manager.
	* @protected
	*/
	_attachEventHandlers: function () {

		_yuitest_coverfunc("build/node-focusmanager/node-focusmanager.js", "_attachEventHandlers", 573);
_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 575);
var descendants = this._descendants,
			aHandlers,
			oDocument,
			handle;

		_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 580);
if (descendants && descendants.size()) {

			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 582);
aHandlers = this._eventHandlers || [];
			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 583);
oDocument = this.get(HOST).get("ownerDocument");


			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 586);
if (aHandlers.length === 0) {


				_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 589);
aHandlers.push(oDocument.on("focus", this._onDocFocus, this));

				_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 591);
aHandlers.push(oDocument.on("mousedown",
					this._onDocMouseDown, this));

				_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 594);
aHandlers.push(
						this.after("keysChange", this._attachKeyHandler));

				_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 597);
aHandlers.push(
						this.after("descendantsChange", this._initDescendants));

				_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 600);
aHandlers.push(
						this.after(ACTIVE_DESCENDANT_CHANGE,
								this._afterActiveDescendantChange));


				//	For performance: defer attaching all key-related event
				//	handlers until the first time one of the specified
				//	descendants receives focus.

				_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 609);
handle = this.after("focusedChange", Y.bind(function (event) {

					_yuitest_coverfunc("build/node-focusmanager/node-focusmanager.js", "(anonymous 3)", 609);
_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 611);
if (event.newVal) {


						_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 614);
this._attachKeyHandler();

						//	Detach this "focusedChange" handler so that the
						//	key-related handlers only get attached once.

						_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 619);
handle.detach();

					}

				}, this));

				_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 625);
aHandlers.push(handle);

			}


			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 630);
this._eventHandlers = aHandlers;

		}

	},


	//	Protected event handlers

	/**
	* @method _onDocMouseDown
	* @description "mousedown" event handler for the owner document of the
	* Focus Manager's Node.
	* @protected
	* @param event {Object} Object representing the DOM event.
	*/
	_onDocMouseDown: function (event) {

		_yuitest_coverfunc("build/node-focusmanager/node-focusmanager.js", "_onDocMouseDown", 646);
_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 648);
var oHost = this.get(HOST),
			oTarget = event.target,
			bChildNode = oHost.contains(oTarget),
			node,

			getFocusable = function (node) {

				_yuitest_coverfunc("build/node-focusmanager/node-focusmanager.js", "getFocusable", 653);
_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 655);
var returnVal = false;

				_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 657);
if (!node.compareTo(oHost)) {

					_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 659);
returnVal = this._isDescendant(node) ? node :
									getFocusable.call(this, node.get("parentNode"));

				}

				_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 664);
return returnVal;

			};


		_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 669);
if (bChildNode) {

			//	Check to make sure that the target isn't a child node of one
			//	of the focusable descendants.

			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 674);
node = getFocusable.call(this, oTarget);

			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 676);
if (node) {
				_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 677);
oTarget = node;
			}
			else {_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 679);
if (!node && this.get(FOCUSED)) {

				//	The target was a non-focusable descendant of the root
				//	node, so the "focused" attribute should be set to false.

	 			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 684);
this._set(FOCUSED, false);
	 			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 685);
this._onDocFocus(event);

			}}

		}


		_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 692);
if (bChildNode && this._isDescendant(oTarget)) {

			//	Fix general problem in Webkit: mousing down on a button or an
			//	anchor element doesn't focus it.

			//	For all browsers: makes sure that the descendant that
			//	was the target of the mousedown event is now considered the
			//	active descendant.

			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 701);
this.focus(oTarget);
		}
		else {_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 703);
if (UA.webkit && this.get(FOCUSED) &&
			(!bChildNode || (bChildNode && !this._isDescendant(oTarget)))) {

			//	Fix for Webkit:

			//	Document doesn't receive focus in Webkit when the user mouses
			//	down on it, so the "focused" attribute won't get set to the
			//	correct value.

			//	The goal is to force a blur if the user moused down on
			//	either: 1) A descendant node, but not one that managed by
			//	the FocusManager, or 2) an element outside of the
			//	FocusManager

 			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 717);
this._set(FOCUSED, false);
 			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 718);
this._onDocFocus(event);

		}}

	},


	/**
	* @method _onDocFocus
	* @description "focus" event handler for the owner document of the
	* Focus Manager's Node.
	* @protected
	* @param event {Object} Object representing the DOM event.
	*/
	_onDocFocus: function (event) {

		_yuitest_coverfunc("build/node-focusmanager/node-focusmanager.js", "_onDocFocus", 732);
_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 734);
var oTarget = this._focusTarget || event.target,
			bFocused = this.get(FOCUSED),
			focusClass = this.get(FOCUS_CLASS),
			oFocusedNode = this._focusedNode,
			bInCollection;

		_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 740);
if (this._focusTarget) {
			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 741);
this._focusTarget = null;
		}


		_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 745);
if (this.get(HOST).contains(oTarget)) {

			//	The target is a descendant of the root Node.

			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 749);
bInCollection = this._isDescendant(oTarget);

			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 751);
if (!bFocused && bInCollection) {

				//	The user has focused a focusable descendant.

				_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 755);
bFocused = true;

			}
			else {_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 758);
if (bFocused && !bInCollection) {

				//	The user has focused a child of the root Node that is
				//	not one of the descendants managed by this Focus Manager
				//	so clear the currently focused descendant.

				_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 764);
bFocused = false;

			}}

		}
		else {

			// The target is some other node in the document.

			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 773);
bFocused = false;

		}


		_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 778);
if (focusClass) {

			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 780);
if (oFocusedNode && (!oFocusedNode.compareTo(oTarget) || !bFocused)) {
				_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 781);
this._removeFocusClass();
			}

			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 784);
if (bInCollection && bFocused) {

				_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 786);
if (focusClass.fn) {
					_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 787);
oTarget = focusClass.fn(oTarget);
					_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 788);
oTarget.addClass(focusClass.className);
				}
				else {
					_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 791);
oTarget.addClass(focusClass);
				}

				_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 794);
this._focusedNode = oTarget;

			}

		}


		_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 801);
this._set(FOCUSED, bFocused);

	},


	/**
	* @method _focusNext
	* @description Keydown event handler that moves focus to the next
	* enabled descendant.
	* @protected
	* @param event {Object} Object representing the DOM event.
	* @param activeDescendant {Number} Number representing the index of the
	* next descendant to be focused
	*/
	_focusNext: function (event, activeDescendant) {

		_yuitest_coverfunc("build/node-focusmanager/node-focusmanager.js", "_focusNext", 815);
_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 817);
var nActiveDescendant = activeDescendant || this.get(ACTIVE_DESCENDANT),
			oNode;


		_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 821);
if (this._isDescendant(event.target) &&
			(nActiveDescendant <= this._lastNodeIndex)) {

			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 824);
nActiveDescendant = nActiveDescendant + 1;

			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 826);
if (nActiveDescendant === (this._lastNodeIndex + 1) &&
				this.get(CIRCULAR)) {

				_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 829);
nActiveDescendant = 0;

			}

			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 833);
oNode = this._descendants.item(nActiveDescendant);

            _yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 835);
if (oNode) {

                _yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 837);
if (oNode.get("disabled")) {
                    _yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 838);
this._focusNext(event, nActiveDescendant);
                }
                else {
                    _yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 841);
this.focus(nActiveDescendant);
                }

            }

		}

		_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 848);
this._preventScroll(event);

	},


	/**
	* @method _focusPrevious
	* @description Keydown event handler that moves focus to the previous
	* enabled descendant.
	* @protected
	* @param event {Object} Object representing the DOM event.
	* @param activeDescendant {Number} Number representing the index of the
	* next descendant to be focused.
	*/
	_focusPrevious: function (event, activeDescendant) {

		_yuitest_coverfunc("build/node-focusmanager/node-focusmanager.js", "_focusPrevious", 862);
_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 864);
var nActiveDescendant = activeDescendant || this.get(ACTIVE_DESCENDANT),
			oNode;

		_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 867);
if (this._isDescendant(event.target) && nActiveDescendant >= 0) {

			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 869);
nActiveDescendant = nActiveDescendant - 1;

			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 871);
if (nActiveDescendant === -1 && this.get(CIRCULAR)) {
				_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 872);
nActiveDescendant = this._lastNodeIndex;
			}

            _yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 875);
oNode = this._descendants.item(nActiveDescendant);

            _yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 877);
if (oNode) {

                _yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 879);
if (oNode.get("disabled")) {
                    _yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 880);
this._focusPrevious(event, nActiveDescendant);
                }
                else {
                    _yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 883);
this.focus(nActiveDescendant);
                }

            }

		}

		_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 890);
this._preventScroll(event);

	},


	/**
	* @method _afterActiveDescendantChange
	* @description afterChange event handler for the
	* "activeDescendant" attribute.
	* @protected
	* @param event {Object} Object representing the change event.
	*/
	_afterActiveDescendantChange: function (event) {

		_yuitest_coverfunc("build/node-focusmanager/node-focusmanager.js", "_afterActiveDescendantChange", 902);
_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 904);
var oNode = this._descendants.item(event.prevVal);

		_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 906);
if (oNode) {
			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 907);
oNode.set(TAB_INDEX, -1);
		}

		_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 910);
oNode = this._descendants.item(event.newVal);

		_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 912);
if (oNode) {
			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 913);
oNode.set(TAB_INDEX, 0);
		}

	},



	//	Public methods

    initializer: function (config) {
		_yuitest_coverfunc("build/node-focusmanager/node-focusmanager.js", "initializer", 922);
_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 923);
this.start();

    },

	destructor: function () {
		
		_yuitest_coverfunc("build/node-focusmanager/node-focusmanager.js", "destructor", 927);
_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 929);
this.stop();
		_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 930);
this.get(HOST).focusManager = null;

    },


	/**
	* @method focus
	* @description Focuses the active descendant and sets the
	* <code>focused</code> attribute to true.
	* @param index {Number} Optional. Number representing the index of the
	* descendant to be set as the active descendant.
	* @param index {Node} Optional. Node instance representing the
	* descendant to be set as the active descendant.
	*/
	focus: function (index) {
		
		_yuitest_coverfunc("build/node-focusmanager/node-focusmanager.js", "focus", 944);
_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 946);
if (Lang.isUndefined(index)) {
			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 947);
index = this.get(ACTIVE_DESCENDANT);
		}

		_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 950);
this.set(ACTIVE_DESCENDANT, index, { src: UI });

		_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 952);
var oNode = this._descendants.item(this.get(ACTIVE_DESCENDANT));

		_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 954);
if (oNode) {

			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 956);
oNode.focus();

			//	In Opera focusing a <BUTTON> element programmatically
			//	will result in the document-level focus event handler
			//	"_onDocFocus" being called, resulting in the handler
			//	incorrectly setting the "focused" Attribute to false.  To fix
			//	this, set a flag ("_focusTarget") that the "_onDocFocus" method
			//	can look for to properly handle this edge case.

			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 965);
if (UA.opera && oNode.get("nodeName").toLowerCase() === "button") {
				_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 966);
this._focusTarget = oNode;
			}

		}

	},


	/**
	* @method blur
	* @description Blurs the current active descendant and sets the
	* <code>focused</code> attribute to false.
	*/
	blur: function () {
		
		_yuitest_coverfunc("build/node-focusmanager/node-focusmanager.js", "blur", 979);
_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 981);
var oNode;
		
		_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 983);
if (this.get(FOCUSED)) {

			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 985);
oNode = this._descendants.item(this.get(ACTIVE_DESCENDANT));

			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 987);
if (oNode) {

				_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 989);
oNode.blur();

				//	For Opera and Webkit:  Blurring an element in either browser
				//	doesn't result in another element (such as the document)
				//	being focused.  Therefore, the "_onDocFocus" method
				//	responsible for managing the application and removal of the
				//	focus indicator class name is never called.

				_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 997);
this._removeFocusClass();

			}

			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 1001);
this._set(FOCUSED, false, { src: UI });
		}

	},


	/**
	* @method start
	* @description Enables the Focus Manager.
	*/
	start: function () {
		
		_yuitest_coverfunc("build/node-focusmanager/node-focusmanager.js", "start", 1011);
_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 1013);
if (this._stopped) {

			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 1015);
this._initDescendants();
			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 1016);
this._attachEventHandlers();

			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 1018);
this._stopped = false;

		}

	},


	/**
	* @method stop
	* @description Disables the Focus Manager by detaching all event handlers.
	*/
	stop: function () {
		
		_yuitest_coverfunc("build/node-focusmanager/node-focusmanager.js", "stop", 1029);
_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 1031);
if (!this._stopped) {

			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 1033);
this._detachEventHandlers();

			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 1035);
this._descendants = null;
			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 1036);
this._focusedNode = null;
			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 1037);
this._lastNodeIndex = 0;
			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 1038);
this._stopped = true;

		}

	},


	/**
	* @method refresh
	* @description Refreshes the Focus Manager's descendants by re-executing the
	* CSS selector query specified by the <code>descendants</code> attribute.
	*/
	refresh: function () {
		
		_yuitest_coverfunc("build/node-focusmanager/node-focusmanager.js", "refresh", 1050);
_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 1052);
this._initDescendants();

		_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 1054);
if (!this._eventHandlers) {
			_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 1055);
this._attachEventHandlers();
		}

	}

});


_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 1063);
NodeFocusManager.NAME = "nodeFocusManager";
_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 1064);
NodeFocusManager.NS = "focusManager";

_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 1066);
Y.namespace("Plugin");
_yuitest_coverline("build/node-focusmanager/node-focusmanager.js", 1067);
Y.Plugin.NodeFocusManager = NodeFocusManager;


}, '@VERSION@', {"requires": ["attribute", "node", "plugin", "node-event-simulate", "event-key", "event-focus"]});
