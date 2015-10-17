/*!
 * jquery.fancytree.js
 * Dynamic tree view control, with support for lazy loading of branches.
 * https://github.com/mar10/fancytree/
 *
 * Copyright (c) 2008-2015, Martin Wendt (http://wwWendt.de)
 * Released under the MIT license
 * https://github.com/mar10/fancytree/wiki/LicenseInfo
 *
 * @version 2.8.1
 * @date 2015-03-01T20:28
 */

/** Core Fancytree module.
 */


// Start of local namespace
;(function($, window, document, undefined) {
"use strict";

// prevent duplicate loading
if ( $.ui && $.ui.fancytree ) {
	$.ui.fancytree.warn("Fancytree: ignored duplicate include");
	return;
}


/* *****************************************************************************
 * Private functions and variables
 */

function _assert(cond, msg){
	// TODO: see qunit.js extractStacktrace()
	if(!cond){
		msg = msg ? ": " + msg : "";
		// consoleApply("assert", [!!cond, msg]);
		$.error("Fancytree assertion failed" + msg);
	}
}

_assert($.ui, "Fancytree requires jQuery UI (http://jqueryui.com)");

function consoleApply(method, args){
	var i, s,
		fn = window.console ? window.console[method] : null;

	if(fn){
		try{
			fn.apply(window.console, args);
		} catch(e) {
			// IE 8?
			s = "";
			for( i=0; i<args.length; i++){
				s += args[i];
			}
			fn(s);
		}
	}
}

/*Return true if x is a FancytreeNode.*/
function _isNode(x){
	return !!(x.tree && x.statusNodeType !== undefined);
}

/** Return true if dotted version string is equal or higher than requested version.
 *
 * See http://jsfiddle.net/mar10/FjSAN/
 */
function isVersionAtLeast(dottedVersion, major, minor, patch){
	var i, v, t,
		verParts = $.map($.trim(dottedVersion).split("."), function(e){ return parseInt(e, 10); }),
		testParts = $.map(Array.prototype.slice.call(arguments, 1), function(e){ return parseInt(e, 10); });

	for( i = 0; i < testParts.length; i++ ){
		v = verParts[i] || 0;
		t = testParts[i] || 0;
		if( v !== t ){
			return ( v > t );
		}
	}
	return true;
}

/** Return a wrapper that calls sub.methodName() and exposes
 *  this        : tree
 *  this._local : tree.ext.EXTNAME
 *  this._super : base.methodName()
 */
function _makeVirtualFunction(methodName, tree, base, extension, extName){
	// $.ui.fancytree.debug("_makeVirtualFunction", methodName, tree, base, extension, extName);
	// if(rexTestSuper && !rexTestSuper.test(func)){
	//     // extension.methodName() doesn't call _super(), so no wrapper required
	//     return func;
	// }
	// Use an immediate function as closure
	var proxy = (function(){
		var prevFunc = tree[methodName],      // org. tree method or prev. proxy
			baseFunc = extension[methodName], //
			_local = tree.ext[extName],
			_super = function(){
				return prevFunc.apply(tree, arguments);
			},
			_superApply = function(args){
				return prevFunc.apply(tree, args);
			};

		// Return the wrapper function
		return function(){
			var prevLocal = tree._local,
				prevSuper = tree._super,
				prevSuperApply = tree._superApply;

			try{
				tree._local = _local;
				tree._super = _super;
				tree._superApply = _superApply;
				return  baseFunc.apply(tree, arguments);
			}finally{
				tree._local = prevLocal;
				tree._super = prevSuper;
				tree._superApply = prevSuperApply;
			}
		};
	})(); // end of Immediate Function
	return proxy;
}

/**
 * Subclass `base` by creating proxy functions
 */
function _subclassObject(tree, base, extension, extName){
	// $.ui.fancytree.debug("_subclassObject", tree, base, extension, extName);
	for(var attrName in extension){
		if(typeof extension[attrName] === "function"){
			if(typeof tree[attrName] === "function"){
				// override existing method
				tree[attrName] = _makeVirtualFunction(attrName, tree, base, extension, extName);
			}else if(attrName.charAt(0) === "_"){
				// Create private methods in tree.ext.EXTENSION namespace
				tree.ext[extName][attrName] = _makeVirtualFunction(attrName, tree, base, extension, extName);
			}else{
				$.error("Could not override tree." + attrName + ". Use prefix '_' to create tree." + extName + "._" + attrName);
			}
		}else{
			// Create member variables in tree.ext.EXTENSION namespace
			if(attrName !== "options"){
				tree.ext[extName][attrName] = extension[attrName];
			}
		}
	}
}


function _getResolvedPromise(context, argArray){
	if(context === undefined){
		return $.Deferred(function(){this.resolve();}).promise();
	}else{
		return $.Deferred(function(){this.resolveWith(context, argArray);}).promise();
	}
}


function _getRejectedPromise(context, argArray){
	if(context === undefined){
		return $.Deferred(function(){this.reject();}).promise();
	}else{
		return $.Deferred(function(){this.rejectWith(context, argArray);}).promise();
	}
}


function _makeResolveFunc(deferred, context){
	return function(){
		deferred.resolveWith(context);
	};
}


function _getElementDataAsDict($el){
	// Evaluate 'data-NAME' attributes with special treatment for 'data-json'.
	var d = $.extend({}, $el.data()),
		json = d.json;
	delete d.fancytree; // added to container by widget factory
	if( json ) {
		delete d.json;
		// <li data-json='...'> is already returned as object (http://api.jquery.com/data/#data-html5)
		d = $.extend(d, json);
	}
	return d;
}


// TODO: use currying
function _makeNodeTitleMatcher(s){
	s = s.toLowerCase();
	return function(node){
		return node.title.toLowerCase().indexOf(s) >= 0;
	};
}


function _makeNodeTitleStartMatcher(s){
	var reMatch = new RegExp("^" + s, "i");
	return function(node){
		return reMatch.test(node.title);
	};
}

var i,
	FT = null, // initialized below
	ENTITY_MAP = {"&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;", "/": "&#x2F;"},
	IGNORE_KEYCODES = { 16: true, 17: true, 18: true },
	SPECIAL_KEYCODES = {
		8: "backspace", 9: "tab", 10: "return", 13: "return",
		// 16: null, 17: null, 18: null, // ignore shift, ctrl, alt
		19: "pause", 20: "capslock", 27: "esc", 32: "space", 33: "pageup",
		34: "pagedown", 35: "end", 36: "home", 37: "left", 38: "up",
		39: "right", 40: "down", 45: "insert", 46: "del", 59: ";", 61: "=",
		96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6",
		103: "7", 104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".",
		111: "/", 112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5",
		117: "f6", 118: "f7", 119: "f8", 120: "f9", 121: "f10", 122: "f11",
		123: "f12", 144: "numlock", 145: "scroll", 173: "-", 186: ";", 187: "=",
		188: ",", 189: "-", 190: ".", 191: "/", 192: "`", 219: "[", 220: "\\",
		221: "]", 222: "'"},
	MOUSE_BUTTONS = { 0: "", 1: "left", 2: "middle", 3: "right" },
	//boolean attributes that can be set with equivalent class names in the LI tags
	CLASS_ATTRS = "active expanded focus folder hideCheckbox lazy selected unselectable".split(" "),
	CLASS_ATTR_MAP = {},
	//	Top-level Fancytree node attributes, that can be set by dict
	NODE_ATTRS = "expanded extraClasses folder hideCheckbox key lazy refKey selected title tooltip unselectable".split(" "),
	NODE_ATTR_MAP = {},
	// Attribute names that should NOT be added to node.data
	NONE_NODE_DATA_MAP = {"active": true, "children": true, "data": true, "focus": true};

for(i=0; i<CLASS_ATTRS.length; i++){ CLASS_ATTR_MAP[CLASS_ATTRS[i]] = true; }
for(i=0; i<NODE_ATTRS.length; i++){ NODE_ATTR_MAP[NODE_ATTRS[i]] = true; }


/* *****************************************************************************
 * FancytreeNode
 */


/**
 * Creates a new FancytreeNode
 *
 * @class FancytreeNode
 * @classdesc A FancytreeNode represents the hierarchical data model and operations.
 *
 * @param {FancytreeNode} parent
 * @param {NodeData} obj
 *
 * @property {Fancytree} tree The tree instance
 * @property {FancytreeNode} parent The parent node
 * @property {string} key Node id (must be unique inside the tree)
 * @property {string} title Display name (may contain HTML)
 * @property {object} data Contains all extra data that was passed on node creation
 * @property {FancytreeNode[] | null | undefined} children Array of child nodes.<br>
 *     For lazy nodes, null or undefined means 'not yet loaded'. Use an empty array
 *     to define a node that has no children.
 * @property {boolean} expanded Use isExpanded(), setExpanded() to access this property.
 * @property {string} extraClasses Addtional CSS classes, added to the node's `&lt;span>`
 * @property {boolean} folder Folder nodes have different default icons and click behavior.<br>
 *     Note: Also non-folders may have children.
 * @property {string} statusNodeType null or type of temporarily generated system node like 'loading', or 'error'.
 * @property {boolean} lazy True if this node is loaded on demand, i.e. on first expansion.
 * @property {boolean} selected Use isSelected(), setSelected() to access this property.
 * @property {string} tooltip Alternative description used as hover banner
 */
function FancytreeNode(parent, obj){
	var i, l, name, cl;

	this.parent = parent;
	this.tree = parent.tree;
	this.ul = null;
	this.li = null;  // <li id='key' ftnode=this> tag
	this.statusNodeType = null; // if this is a temp. node to display the status of its parent
	this._isLoading = false;    // if this node itself is loading
	this._error = null;         // {message: '...'} if a load error occured
	this.data = {};

	// TODO: merge this code with node.toDict()
	// copy attributes from obj object
	for(i=0, l=NODE_ATTRS.length; i<l; i++){
		name = NODE_ATTRS[i];
		this[name] = obj[name];
	}
	// node.data += obj.data
	if(obj.data){
		$.extend(this.data, obj.data);
	}
	// copy all other attributes to this.data.NAME
	for(name in obj){
		if(!NODE_ATTR_MAP[name] && !$.isFunction(obj[name]) && !NONE_NODE_DATA_MAP[name]){
			// node.data.NAME = obj.NAME
			this.data[name] = obj[name];
		}
	}

	// Fix missing key
	if( this.key == null ){ // test for null OR undefined
		if( this.tree.options.defaultKey ) {
			this.key = this.tree.options.defaultKey(this);
			_assert(this.key, "defaultKey() must return a unique key");
		} else {
			this.key = "_" + (FT._nextNodeKey++);
		}
	} else {
		this.key = "" + this.key; // Convert to string (#217)
	}

	// Fix tree.activeNode
	// TODO: not elegant: we use obj.active as marker to set tree.activeNode
	// when loading from a dictionary.
	if(obj.active){
		_assert(this.tree.activeNode === null, "only one active node allowed");
		this.tree.activeNode = this;
	}
	if( obj.selected ){ // #186
		this.tree.lastSelectedNode = this;
	}
	// TODO: handle obj.focus = true
	// Create child nodes
	this.children = null;
	cl = obj.children;
	if(cl && cl.length){
		this._setChildren(cl);
	}
	// Add to key/ref map (except for root node)
//	if( parent ) {
	this.tree._callHook("treeRegisterNode", this.tree, true, this);
//	}
}


FancytreeNode.prototype = /** @lends FancytreeNode# */{
	/* Return the direct child FancytreeNode with a given key, index. */
	_findDirectChild: function(ptr){
		var i, l,
			cl = this.children;

		if(cl){
			if(typeof ptr === "string"){
				for(i=0, l=cl.length; i<l; i++){
					if(cl[i].key === ptr){
						return cl[i];
					}
				}
			}else if(typeof ptr === "number"){
				return this.children[ptr];
			}else if(ptr.parent === this){
				return ptr;
			}
		}
		return null;
	},
	// TODO: activate()
	// TODO: activateSilently()
	/* Internal helper called in recursive addChildren sequence.*/
	_setChildren: function(children){
		_assert(children && (!this.children || this.children.length === 0), "only init supported");
		this.children = [];
		for(var i=0, l=children.length; i<l; i++){
			this.children.push(new FancytreeNode(this, children[i]));
		}
	},
	/**
	 * Append (or insert) a list of child nodes.
	 *
	 * @param {NodeData[]} children array of child node definitions (also single child accepted)
	 * @param {FancytreeNode | string | Integer} [insertBefore] child node (or key or index of such).
	 *     If omitted, the new children are appended.
	 * @returns {FancytreeNode} first child added
	 *
	 * @see FancytreeNode#applyPatch
	 */
	addChildren: function(children, insertBefore){
		var i, l, pos,
			firstNode = null,
			nodeList = [];

		if($.isPlainObject(children) ){
			children = [children];
		}
		if(!this.children){
			this.children = [];
		}
		for(i=0, l=children.length; i<l; i++){
			nodeList.push(new FancytreeNode(this, children[i]));
		}
		firstNode = nodeList[0];
		if(insertBefore == null){
			this.children = this.children.concat(nodeList);
		}else{
			insertBefore = this._findDirectChild(insertBefore);
			pos = $.inArray(insertBefore, this.children);
			_assert(pos >= 0, "insertBefore must be an existing child");
			// insert nodeList after children[pos]
			this.children.splice.apply(this.children, [pos, 0].concat(nodeList));
		}
		if( !this.parent || this.parent.ul || this.tr ){
			// render if the parent was rendered (or this is a root node)
			this.render();
		}
		if( this.tree.options.selectMode === 3 ){
			this.fixSelection3FromEndNodes();
		}
		return firstNode;
	},
	/**
	 * Append or prepend a node, or append a child node.
	 *
	 * This a convenience function that calls addChildren()
	 *
	 * @param {NodeData} node node definition
	 * @param {string} [mode=child] 'before', 'after', 'firstChild', or 'child' ('over' is a synonym for 'child')
	 * @returns {FancytreeNode} new node
	 */
	addNode: function(node, mode){
		if(mode === undefined || mode === "over"){
			mode = "child";
		}
		switch(mode){
		case "after":
			return this.getParent().addChildren(node, this.getNextSibling());
		case "before":
			return this.getParent().addChildren(node, this);
		case "firstChild":
			// Insert before the first child if any
			var insertBefore = (this.children ? this.children[0] : null);
			return this.addChildren(node, insertBefore);
		case "child":
		case "over":
			return this.addChildren(node);
		}
		_assert(false, "Invalid mode: " + mode);
	},
	/**
	 * Append new node after this.
	 *
	 * This a convenience function that calls addNode(node, 'after')
	 *
	 * @param {NodeData} node node definition
	 * @returns {FancytreeNode} new node
	 */
	appendSibling: function(node){
		return this.addNode(node, "after");
	},
	/**
	 * Modify existing child nodes.
	 *
	 * @param {NodePatch} patch
	 * @returns {$.Promise}
	 * @see FancytreeNode#addChildren
	 */
	applyPatch: function(patch) {
		// patch [key, null] means 'remove'
		if(patch === null){
			this.remove();
			return _getResolvedPromise(this);
		}
		// TODO: make sure that root node is not collapsed or modified
		// copy (most) attributes to node.ATTR or node.data.ATTR
		var name, promise, v,
			IGNORE_MAP = { children: true, expanded: true, parent: true }; // TODO: should be global

		for(name in patch){
			v = patch[name];
			if( !IGNORE_MAP[name] && !$.isFunction(v)){
				if(NODE_ATTR_MAP[name]){
					this[name] = v;
				}else{
					this.data[name] = v;
				}
			}
		}
		// Remove and/or create children
		if(patch.hasOwnProperty("children")){
			this.removeChildren();
			if(patch.children){ // only if not null and not empty list
				// TODO: addChildren instead?
				this._setChildren(patch.children);
			}
			// TODO: how can we APPEND or INSERT child nodes?
		}
		if(this.isVisible()){
			this.renderTitle();
			this.renderStatus();
		}
		// Expand collapse (final step, since this may be async)
		if(patch.hasOwnProperty("expanded")){
			promise = this.setExpanded(patch.expanded);
		}else{
			promise = _getResolvedPromise(this);
		}
		return promise;
	},
	/** Collapse all sibling nodes.
	 * @returns {$.Promise}
	 */
	collapseSiblings: function() {
		return this.tree._callHook("nodeCollapseSiblings", this);
	},
	/** Copy this node as sibling or child of `node`.
	 *
	 * @param {FancytreeNode} node source node
	 * @param {string} [mode=child] 'before' | 'after' | 'child'
	 * @param {Function} [map] callback function(NodeData) that could modify the new node
	 * @returns {FancytreeNode} new
	 */
	copyTo: function(node, mode, map) {
		return node.addNode(this.toDict(true, map), mode);
	},
	/** Count direct and indirect children.
	 *
	 * @param {boolean} [deep=true] pass 'false' to only count direct children
	 * @returns {int} number of child nodes
	 */
	countChildren: function(deep) {
		var cl = this.children, i, l, n;
		if( !cl ){
			return 0;
		}
		n = cl.length;
		if(deep !== false){
			for(i=0, l=n; i<l; i++){
				n += cl[i].countChildren();
			}
		}
		return n;
	},
	// TODO: deactivate()
	/** Write to browser console if debugLevel >= 2 (prepending node info)
	 *
	 * @param {*} msg string or object or array of such
	 */
	debug: function(msg){
		if( this.tree.options.debugLevel >= 2 ) {
			Array.prototype.unshift.call(arguments, this.toString());
			consoleApply("log", arguments);
		}
	},
	/** Deprecated.
	 * @deprecated since 2014-02-16. Use resetLazy() instead.
	 */
	discard: function(){
		this.warn("FancytreeNode.discard() is deprecated since 2014-02-16. Use .resetLazy() instead.");
		return this.resetLazy();
	},
	// TODO: expand(flag)
	/**Find all nodes that contain `match` in the title.
	 *
	 * @param {string | function(node)} match string to search for, of a function that
	 * returns `true` if a node is matched.
	 * @returns {FancytreeNode[]} array of nodes (may be empty)
	 * @see FancytreeNode#findAll
	 */
	findAll: function(match) {
		match = $.isFunction(match) ? match : _makeNodeTitleMatcher(match);
		var res = [];
		this.visit(function(n){
			if(match(n)){
				res.push(n);
			}
		});
		return res;
	},
	/**Find first node that contains `match` in the title (not including self).
	 *
	 * @param {string | function(node)} match string to search for, of a function that
	 * returns `true` if a node is matched.
	 * @returns {FancytreeNode} matching node or null
	 * @example
	 * <b>fat</b> text
	 */
	findFirst: function(match) {
		match = $.isFunction(match) ? match : _makeNodeTitleMatcher(match);
		var res = null;
		this.visit(function(n){
			if(match(n)){
				res = n;
				return false;
			}
		});
		return res;
	},
	/* Apply selection state (internal use only) */
	_changeSelectStatusAttrs: function (state) {
		var changed = false;

		switch(state){
		case false:
			changed = ( this.selected || this.partsel );
			this.selected = false;
			this.partsel = false;
			break;
		case true:
			changed = ( !this.selected || !this.partsel );
			this.selected = true;
			this.partsel = true;
			break;
		case undefined:
			changed = ( this.selected || !this.partsel );
			this.selected = false;
			this.partsel = true;
			break;
		default:
			_assert(false, "invalid state: " + state);
		}
		// this.debug("fixSelection3AfterLoad() _changeSelectStatusAttrs()", state, changed);
		if( changed ){
			this.renderStatus();
		}
		return changed;
	},
	/**
	 * Fix selection status, after this node was (de)selected in multi-hier mode.
	 * This includes (de)selecting all children.
	 */
	fixSelection3AfterClick: function() {
		var flag = this.isSelected();

//		this.debug("fixSelection3AfterClick()");

		this.visit(function(node){
			node._changeSelectStatusAttrs(flag);
		});
		this.fixSelection3FromEndNodes();
	},
	/**
	 * Fix selection status for multi-hier mode.
	 * Only end-nodes are considered to update the descendants branch and parents.
	 * Should be called after this node has loaded new children or after
	 * children have been modified using the API.
	 */
	fixSelection3FromEndNodes: function() {
//		this.debug("fixSelection3FromEndNodes()");
		_assert(this.tree.options.selectMode === 3, "expected selectMode 3");

		// Visit all end nodes and adjust their parent's `selected` and `partsel`
		// attributes. Return selection state true, false, or undefined.
		function _walk(node){
			var i, l, child, s, state, allSelected,someSelected,
				children = node.children;

			if( children && children.length ){
				// check all children recursively
				allSelected = true;
				someSelected = false;

				for( i=0, l=children.length; i<l; i++ ){
					child = children[i];
					// the selection state of a node is not relevant; we need the end-nodes
					s = _walk(child);
					if( s !== false ) {
						someSelected = true;
					}
					if( s !== true ) {
						allSelected = false;
					}
				}
				state = allSelected ? true : (someSelected ? undefined : false);
			}else{
				// This is an end-node: simply report the status
//				state = ( node.unselectable ) ? undefined : !!node.selected;
				state = !!node.selected;
			}
			node._changeSelectStatusAttrs(state);
			return state;
		}
		_walk(this);

		// Update parent's state
		this.visitParents(function(node){
			var i, l, child, state,
				children = node.children,
				allSelected = true,
				someSelected = false;

			for( i=0, l=children.length; i<l; i++ ){
				child = children[i];
				// When fixing the parents, we trust the sibling status (i.e.
				// we don't recurse)
				if( child.selected || child.partsel ) {
					someSelected = true;
				}
				if( !child.unselectable && !child.selected ) {
					allSelected = false;
				}
			}
			state = allSelected ? true : (someSelected ? undefined : false);
			node._changeSelectStatusAttrs(state);
		});
	},
	// TODO: focus()
	/**
	 * Update node data. If dict contains 'children', then also replace
	 * the hole sub tree.
	 * @param {NodeData} dict
	 *
	 * @see FancytreeNode#addChildren
	 * @see FancytreeNode#applyPatch
	 */
	fromDict: function(dict) {
		// copy all other attributes to this.data.xxx
		for(var name in dict){
			if(NODE_ATTR_MAP[name]){
				// node.NAME = dict.NAME
				this[name] = dict[name];
			}else if(name === "data"){
				// node.data += dict.data
				$.extend(this.data, dict.data);
			}else if(!$.isFunction(dict[name]) && !NONE_NODE_DATA_MAP[name]){
				// node.data.NAME = dict.NAME
				this.data[name] = dict[name];
			}
		}
		if(dict.children){
			// recursively set children and render
			this.removeChildren();
			this.addChildren(dict.children);
		}
		this.renderTitle();
/*
		var children = dict.children;
		if(children === undefined){
			this.data = $.extend(this.data, dict);
			this.render();
			return;
		}
		dict = $.extend({}, dict);
		dict.children = undefined;
		this.data = $.extend(this.data, dict);
		this.removeChildren();
		this.addChild(children);
*/
	},
	/** Return the list of child nodes (undefined for unexpanded lazy nodes).
	 * @returns {FancytreeNode[] | undefined}
	 */
	getChildren: function() {
		if(this.hasChildren() === undefined){ // TODO: only required for lazy nodes?
			return undefined; // Lazy node: unloaded, currently loading, or load error
		}
		return this.children;
	},
	/** Return the first child node or null.
	 * @returns {FancytreeNode | null}
	 */
	getFirstChild: function() {
		return this.children ? this.children[0] : null;
	},
	/** Return the 0-based child index.
	 * @returns {int}
	 */
	getIndex: function() {
//		return this.parent.children.indexOf(this);
		return $.inArray(this, this.parent.children); // indexOf doesn't work in IE7
	},
	/** Return the hierarchical child index (1-based, e.g. '3.2.4').
	 * @returns {string}
	 */
	getIndexHier: function(separator) {
		separator = separator || ".";
		var res = [];
		$.each(this.getParentList(false, true), function(i, o){
			res.push(o.getIndex() + 1);
		});
		return res.join(separator);
	},
	/** Return the parent keys separated by options.keyPathSeparator, e.g. "id_1/id_17/id_32".
	 * @param {boolean} [excludeSelf=false]
	 * @returns {string}
	 */
	getKeyPath: function(excludeSelf) {
		var path = [],
			sep = this.tree.options.keyPathSeparator;
		this.visitParents(function(n){
			if(n.parent){
				path.unshift(n.key);
			}
		}, !excludeSelf);
		return sep + path.join(sep);
	},
	/** Return the last child of this node or null.
	 * @returns {FancytreeNode | null}
	 */
	getLastChild: function() {
		return this.children ? this.children[this.children.length - 1] : null;
	},
	/** Return node depth. 0: System root node, 1: visible top-level node, 2: first sub-level, ... .
	 * @returns {int}
	 */
	getLevel: function() {
		var level = 0,
			dtn = this.parent;
		while( dtn ) {
			level++;
			dtn = dtn.parent;
		}
		return level;
	},
	/** Return the successor node (under the same parent) or null.
	 * @returns {FancytreeNode | null}
	 */
	getNextSibling: function() {
		// TODO: use indexOf, if available: (not in IE6)
		if( this.parent ){
			var i, l,
				ac = this.parent.children;

			for(i=0, l=ac.length-1; i<l; i++){ // up to length-2, so next(last) = null
				if( ac[i] === this ){
					return ac[i+1];
				}
			}
		}
		return null;
	},
	/** Return the parent node (null for the system root node).
	 * @returns {FancytreeNode | null}
	 */
	getParent: function() {
		// TODO: return null for top-level nodes?
		return this.parent;
	},
	/** Return an array of all parent nodes (top-down).
	 * @param {boolean} [includeRoot=false] Include the invisible system root node.
	 * @param {boolean} [includeSelf=false] Include the node itself.
	 * @returns {FancytreeNode[]}
	 */
	getParentList: function(includeRoot, includeSelf) {
		var l = [],
			dtn = includeSelf ? this : this.parent;
		while( dtn ) {
			if( includeRoot || dtn.parent ){
				l.unshift(dtn);
			}
			dtn = dtn.parent;
		}
		return l;
	},
	/** Return the predecessor node (under the same parent) or null.
	 * @returns {FancytreeNode | null}
	 */
	getPrevSibling: function() {
		if( this.parent ){
			var i, l,
				ac = this.parent.children;

			for(i=1, l=ac.length; i<l; i++){ // start with 1, so prev(first) = null
				if( ac[i] === this ){
					return ac[i-1];
				}
			}
		}
		return null;
	},
	/** Return true if node has children. Return undefined if not sure, i.e. the node is lazy and not yet loaded).
	 * @returns {boolean | undefined}
	 */
	hasChildren: function() {
		if(this.lazy){
			if(this.children == null ){
				// null or undefined: Not yet loaded
				return undefined;
			}else if(this.children.length === 0){
				// Loaded, but response was empty
				return false;
			}else if(this.children.length === 1 && this.children[0].isStatusNode() ){
				// Currently loading or load error
				return undefined;
			}
			return true;
		}
		return !!( this.children && this.children.length );
	},
	/** Return true if node has keyboard focus.
	 * @returns {boolean}
	 */
	hasFocus: function() {
		return (this.tree.hasFocus() && this.tree.focusNode === this);
	},
	/** Write to browser console if debugLevel >= 1 (prepending node info)
	 *
	 * @param {*} msg string or object or array of such
	 */
	info: function(msg){
		if( this.tree.options.debugLevel >= 1 ) {
			Array.prototype.unshift.call(arguments, this.toString());
			consoleApply("info", arguments);
		}
	},
	/** Return true if node is active (see also FancytreeNode#isSelected).
	 * @returns {boolean}
	 */
	isActive: function() {
		return (this.tree.activeNode === this);
	},
	/** Return true if node is a direct child of otherNode.
	 * @param {FancytreeNode} otherNode
	 * @returns {boolean}
	 */
	isChildOf: function(otherNode) {
		return (this.parent && this.parent === otherNode);
	},
	/** Return true, if node is a direct or indirect sub node of otherNode.
	 * @param {FancytreeNode} otherNode
	 * @returns {boolean}
	 */
	isDescendantOf: function(otherNode) {
		if(!otherNode || otherNode.tree !== this.tree){
			return false;
		}
		var p = this.parent;
		while( p ) {
			if( p === otherNode ){
				return true;
			}
			p = p.parent;
		}
		return false;
	},
	/** Return true if node is expanded.
	 * @returns {boolean}
	 */
	isExpanded: function() {
		return !!this.expanded;
	},
	/** Return true if node is the first node of its parent's children.
	 * @returns {boolean}
	 */
	isFirstSibling: function() {
		var p = this.parent;
		return !p || p.children[0] === this;
	},
	/** Return true if node is a folder, i.e. has the node.folder attribute set.
	 * @returns {boolean}
	 */
	isFolder: function() {
		return !!this.folder;
	},
	/** Return true if node is the last node of its parent's children.
	 * @returns {boolean}
	 */
	isLastSibling: function() {
		var p = this.parent;
		return !p || p.children[p.children.length-1] === this;
	},
	/** Return true if node is lazy (even if data was already loaded)
	 * @returns {boolean}
	 */
	isLazy: function() {
		return !!this.lazy;
	},
	/** Return true if node is lazy and loaded. For non-lazy nodes always return true.
	 * @returns {boolean}
	 */
	isLoaded: function() {
		return !this.lazy || this.hasChildren() !== undefined; // Also checks if the only child is a status node
	},
	/** Return true if children are currently beeing loaded, i.e. a Ajax request is pending.
	 * @returns {boolean}
	 */
	isLoading: function() {
		return !!this._isLoading;
	},
	/**
	 * @deprecated since v2.4.0:  Use isRootNode() instead
	 */
	isRoot: function() {
		return this.isRootNode();
	},
	/** Return true if this is the (invisible) system root node.
	 * @returns {boolean}
	 */
	isRootNode: function() {
		return (this.tree.rootNode === this);
	},
	/** Return true if node is selected, i.e. has a checkmark set (see also FancytreeNode#isActive).
	 * @returns {boolean}
	 */
	isSelected: function() {
		return !!this.selected;
	},
	/** Return true if this node is a temporarily generated system node like
	 * 'loading', or 'error' (node.statusNodeType contains the type).
	 * @returns {boolean}
	 */
	isStatusNode: function() {
		return !!this.statusNodeType;
	},
	/** Return true if this a top level node, i.e. a direct child of the (invisible) system root node.
	 * @returns {boolean}
	 */
	isTopLevel: function() {
		return (this.tree.rootNode === this.parent);
	},
	/** Return true if node is lazy and not yet loaded. For non-lazy nodes always return false.
	 * @returns {boolean}
	 */
	isUndefined: function() {
		return this.hasChildren() === undefined; // also checks if the only child is a status node
	},
	/** Return true if all parent nodes are expanded. Note: this does not check
	 * whether the node is scrolled into the visible part of the screen.
	 * @returns {boolean}
	 */
	isVisible: function() {
		var i, l,
			parents = this.getParentList(false, false);

		for(i=0, l=parents.length; i<l; i++){
			if( ! parents[i].expanded ){ return false; }
		}
		return true;
	},
	/** Deprecated.
	 * @deprecated since 2014-02-16: use load() instead.
	 */
	lazyLoad: function(discard) {
		this.warn("FancytreeNode.lazyLoad() is deprecated since 2014-02-16. Use .load() instead.");
		return this.load(discard);
	},
	/**
	 * Load all children of a lazy node if neccessary. The *expanded* state is maintained.
	 * @param {boolean} [forceReload=false] Pass true to discard any existing nodes before.
	 * @returns {$.Promise}
	 */
	load: function(forceReload) {
		var res, source,
			that = this;

		_assert( this.isLazy(), "load() requires a lazy node" );
		// _assert( forceReload || this.isUndefined(), "Pass forceReload=true to re-load a lazy node" );
		if( !forceReload && !this.isUndefined() ) {
			return _getResolvedPromise(this);
		}
		if( this.isLoaded() ){
			this.resetLazy(); // also collapses
		}
		// This method is also called by setExpanded() and loadKeyPath(), so we
		// have to avoid recursion.
		source = this.tree._triggerNodeEvent("lazyLoad", this);
		if( source === false ) { // #69
			return _getResolvedPromise(this);
		}
		_assert(typeof source !== "boolean", "lazyLoad event must return source in data.result");
		res = this.tree._callHook("nodeLoadChildren", this, source);
		if( this.expanded ) {
			res.always(function(){
				that.render();
			});
		}
		return res;
	},
	/** Expand all parents and optionally scroll into visible area as neccessary.
	 * Promise is resolved, when lazy loading and animations are done.
	 * @param {object} [opts] passed to `setExpanded()`.
	 *     Defaults to {noAnimation: false, noEvents: false, scrollIntoView: true}
	 * @returns {$.Promise}
	 */
	makeVisible: function(opts) {
		var i,
			that = this,
			deferreds = [],
			dfd = new $.Deferred(),
			parents = this.getParentList(false, false),
			len = parents.length,
			effects = !(opts && opts.noAnimation === true),
			scroll = !(opts && opts.scrollIntoView === false);

		// Expand bottom-up, so only the top node is animated
		for(i = len - 1; i >= 0; i--){
			// that.debug("pushexpand" + parents[i]);
			deferreds.push(parents[i].setExpanded(true, opts));
		}
		$.when.apply($, deferreds).done(function(){
			// All expands have finished
			// that.debug("expand DONE", scroll);
			if( scroll ){
				that.scrollIntoView(effects).done(function(){
					// that.debug("scroll DONE");
					dfd.resolve();
				});
			} else {
				dfd.resolve();
			}
		});
		return dfd.promise();
	},
	/** Move this node to targetNode.
	 *  @param {FancytreeNode} targetNode
	 *  @param {string} mode <pre>
	 *      'child': append this node as last child of targetNode.
	 *               This is the default. To be compatble with the D'n'd
	 *               hitMode, we also accept 'over'.
	 *      'before': add this node as sibling before targetNode.
	 *      'after': add this node as sibling after targetNode.</pre>
	 *  @param {function} [map] optional callback(FancytreeNode) to allow modifcations
	 */
	moveTo: function(targetNode, mode, map) {
		if(mode === undefined || mode === "over"){
			mode = "child";
		}
		var pos,
			prevParent = this.parent,
			targetParent = (mode === "child") ? targetNode : targetNode.parent;

		if(this === targetNode){
			return;
		}else if( !this.parent  ){
			throw "Cannot move system root";
		}else if( targetParent.isDescendantOf(this) ){
			throw "Cannot move a node to its own descendant";
		}
		// Unlink this node from current parent
		if( this.parent.children.length === 1 ) {
			if( this.parent === targetParent ){
				return; // #258
			}
			this.parent.children = this.parent.lazy ? [] : null;
			this.parent.expanded = false;
		} else {
			pos = $.inArray(this, this.parent.children);
			_assert(pos >= 0);
			this.parent.children.splice(pos, 1);
		}
		// Remove from source DOM parent
//		if(this.parent.ul){
//			this.parent.ul.removeChild(this.li);
//		}

		// Insert this node to target parent's child list
		this.parent = targetParent;
		if( targetParent.hasChildren() ) {
			switch(mode) {
			case "child":
				// Append to existing target children
				targetParent.children.push(this);
				break;
			case "before":
				// Insert this node before target node
				pos = $.inArray(targetNode, targetParent.children);
				_assert(pos >= 0);
				targetParent.children.splice(pos, 0, this);
				break;
			case "after":
				// Insert this node after target node
				pos = $.inArray(targetNode, targetParent.children);
				_assert(pos >= 0);
				targetParent.children.splice(pos+1, 0, this);
				break;
			default:
				throw "Invalid mode " + mode;
			}
		} else {
			targetParent.children = [ this ];
		}
		// Parent has no <ul> tag yet:
//		if( !targetParent.ul ) {
//			// This is the parent's first child: create UL tag
//			// (Hidden, because it will be
//			targetParent.ul = document.createElement("ul");
//			targetParent.ul.style.display = "none";
//			targetParent.li.appendChild(targetParent.ul);
//		}
//		// Issue 319: Add to target DOM parent (only if node was already rendered(expanded))
//		if(this.li){
//			targetParent.ul.appendChild(this.li);
//		}^

		// Let caller modify the nodes
		if( map ){
			targetNode.visit(map, true);
		}
		// Handle cross-tree moves
		if( this.tree !== targetNode.tree ) {
			// Fix node.tree for all source nodes
//			_assert(false, "Cross-tree move is not yet implemented.");
			this.warn("Cross-tree moveTo is experimantal!");
			this.visit(function(n){
				// TODO: fix selection state and activation, ...
				n.tree = targetNode.tree;
			}, true);
		}

		// A collaposed node won't re-render children, so we have to remove it manually
		// if( !targetParent.expanded ){
		//   prevParent.ul.removeChild(this.li);
		// }

		// Update HTML markup
		if( !prevParent.isDescendantOf(targetParent)) {
			prevParent.render();
		}
		if( !targetParent.isDescendantOf(prevParent) && targetParent !== prevParent) {
			targetParent.render();
		}
		// TODO: fix selection state
		// TODO: fix active state

/*
		var tree = this.tree;
		var opts = tree.options;
		var pers = tree.persistence;


		// Always expand, if it's below minExpandLevel
//		tree.logDebug ("%s._addChildNode(%o), l=%o", this, ftnode, ftnode.getLevel());
		if ( opts.minExpandLevel >= ftnode.getLevel() ) {
//			tree.logDebug ("Force expand for %o", ftnode);
			this.bExpanded = true;
		}

		// In multi-hier mode, update the parents selection state
		// DT issue #82: only if not initializing, because the children may not exist yet
//		if( !ftnode.data.isStatusNode() && opts.selectMode==3 && !isInitializing )
//			ftnode._fixSelectionState();

		// In multi-hier mode, update the parents selection state
		if( ftnode.bSelected && opts.selectMode==3 ) {
			var p = this;
			while( p ) {
				if( !p.hasSubSel )
					p._setSubSel(true);
				p = p.parent;
			}
		}
		// render this node and the new child
		if ( tree.bEnableUpdate )
			this.render();

		return ftnode;

*/
	},
	/** Set focus relative to this node and optionally activate.
	 *
	 * @param {number} where The keyCode that would normally trigger this move,
	 *		e.g. `$.ui.keyCode.LEFT` would collapse the node if it
	 *      is expanded or move to the parent oterwise.
	 * @param {boolean} [activate=true]
	 * @returns {$.Promise}
	 */
	// navigate: function(where, activate) {
	// 	console.time("navigate")
	// 	this._navigate(where, activate)
	// 	console.timeEnd("navigate")
	// },
	navigate: function(where, activate) {
		var i, parents,
			handled = true,
			KC = $.ui.keyCode,
			sib = null;

		// Navigate to node
		function _goto(n){
			if( n ){
				try { n.makeVisible(); } catch(e) {} // #272
				// Node may still be hidden by a filter
				if( ! $(n.span).is(":visible") ) {
					n.debug("Navigate: skipping hidden node");
					n.navigate(where, activate);
					return;
				}
				return activate === false ? n.setFocus() : n.setActive();
			}
		}

		switch( where ) {
			case KC.BACKSPACE:
				if( this.parent && this.parent.parent ) {
					_goto(this.parent);
				}
				break;
			case KC.LEFT:
				if( this.expanded ) {
					this.setExpanded(false);
					_goto(this);
				} else if( this.parent && this.parent.parent ) {
					_goto(this.parent);
				}
				break;
			case KC.RIGHT:
				if( !this.expanded && (this.children || this.lazy) ) {
					this.setExpanded();
					_goto(this);
				} else if( this.children && this.children.length ) {
					_goto(this.children[0]);
				}
				break;
			case KC.UP:
				sib = this.getPrevSibling();
				// #359: skip hidden sibling nodes, preventing a _goto() recursion
				while( sib && !$(sib.span).is(":visible") ) {
					sib = sib.getPrevSibling();
				}
				while( sib && sib.expanded && sib.children && sib.children.length ) {
					sib = sib.children[sib.children.length - 1];
				}
				if( !sib && this.parent && this.parent.parent ){
					sib = this.parent;
				}
				_goto(sib);
				break;
			case KC.DOWN:
				if( this.expanded && this.children && this.children.length ) {
					sib = this.children[0];
				} else {
					parents = this.getParentList(false, true);
					for(i=parents.length-1; i>=0; i--) {
						sib = parents[i].getNextSibling();
						// #359: skip hidden sibling nodes, preventing a _goto() recursion
						while( sib && !$(sib.span).is(":visible") ) {
							sib = sib.getNextSibling();
						}
						if( sib ){ break; }
					}
				}
				_goto(sib);
				break;
			default:
				handled = false;
		}
	},
	/**
	 * Remove this node (not allowed for system root).
	 */
	remove: function() {
		return this.parent.removeChild(this);
	},
	/**
	 * Remove childNode from list of direct children.
	 * @param {FancytreeNode} childNode
	 */
	removeChild: function(childNode) {
		return this.tree._callHook("nodeRemoveChild", this, childNode);
	},
	/**
	 * Remove all child nodes and descendents. This converts the node into a leaf.<br>
	 * If this was a lazy node, it is still considered 'loaded'; call node.resetLazy()
	 * in order to trigger lazyLoad on next expand.
	 */
	removeChildren: function() {
		return this.tree._callHook("nodeRemoveChildren", this);
	},
	/**
	 * This method renders and updates all HTML markup that is required
	 * to display this node in its current state.<br>
	 * Note:
	 * <ul>
	 * <li>It should only be neccessary to call this method after the node object
	 *     was modified by direct access to its properties, because the common
	 *     API methods (node.setTitle(), moveTo(), addChildren(), remove(), ...)
	 *     already handle this.
	 * <li> {@link FancytreeNode#renderTitle} and {@link FancytreeNode#renderStatus}
	 *     are implied. If changes are more local, calling only renderTitle() or
	 *     renderStatus() may be sufficient and faster.
	 * <li>If a node was created/removed, node.render() must be called <i>on the parent</i>.
	 * </ul>
	 *
	 * @param {boolean} [force=false] re-render, even if html markup was already created
	 * @param {boolean} [deep=false] also render all descendants, even if parent is collapsed
	 */
	render: function(force, deep) {
		return this.tree._callHook("nodeRender", this, force, deep);
	},
	/** Create HTML markup for the node's outer <span> (expander, checkbox, icon, and title).
	 * @see Fancytree_Hooks#nodeRenderTitle
	 */
	renderTitle: function() {
		return this.tree._callHook("nodeRenderTitle", this);
	},
	/** Update element's CSS classes according to node state.
	 * @see Fancytree_Hooks#nodeRenderStatus
	 */
	renderStatus: function() {
		return this.tree._callHook("nodeRenderStatus", this);
	},
	/**
	 * Remove all children, collapse, and set the lazy-flag, so that the lazyLoad
	 * event is triggered on next expand.
	 */
	resetLazy: function() {
		this.removeChildren();
		this.expanded = false;
		this.lazy = true;
		this.children = undefined;
		this.renderStatus();
	},
	/** Schedule activity for delayed execution (cancel any pending request).
	 *  scheduleAction('cancel') will only cancel a pending request (if any).
	 * @param {string} mode
	 * @param {number} ms
	 */
	scheduleAction: function(mode, ms) {
		if( this.tree.timer ) {
			clearTimeout(this.tree.timer);
//            this.tree.debug("clearTimeout(%o)", this.tree.timer);
		}
		this.tree.timer = null;
		var self = this; // required for closures
		switch (mode) {
		case "cancel":
			// Simply made sure that timer was cleared
			break;
		case "expand":
			this.tree.timer = setTimeout(function(){
				self.tree.debug("setTimeout: trigger expand");
				self.setExpanded(true);
			}, ms);
			break;
		case "activate":
			this.tree.timer = setTimeout(function(){
				self.tree.debug("setTimeout: trigger activate");
				self.setActive(true);
			}, ms);
			break;
		default:
			throw "Invalid mode " + mode;
		}
//        this.tree.debug("setTimeout(%s, %s): %s", mode, ms, this.tree.timer);
	},
	/**
	 *
	 * @param {boolean | PlainObject} [effects=false] animation options.
	 * @param {object} [options=null] {topNode: null, effects: ..., parent: ...} this node will remain visible in
	 *     any case, even if `this` is outside the scroll pane.
	 * @returns {$.Promise}
	 */
	scrollIntoView: function(effects, options) {
		if( options !== undefined && _isNode(options) ) {
			this.warn("scrollIntoView() with 'topNode' option is deprecated since 2014-05-08. Use 'options.topNode' instead.");
			options = {topNode: options};
		}
		// this.$scrollParent = (this.options.scrollParent === "auto") ? $ul.scrollParent() : $(this.options.scrollParent);
		// this.$scrollParent = this.$scrollParent.length ? this.$scrollParent || this.$container;

		var topNodeY, nodeY, horzScrollbarHeight, containerOffsetTop,
			opts = $.extend({
				effects: (effects === true) ? {duration: 200, queue: false} : effects,
				scrollOfs: this.tree.options.scrollOfs,
				scrollParent: this.tree.options.scrollParent || this.tree.$container,
				topNode: null
			}, options),
			dfd = new $.Deferred(),
			that = this,
			nodeHeight = $(this.span).height(),
			$container = $(opts.scrollParent),
			topOfs = opts.scrollOfs.top || 0,
			bottomOfs = opts.scrollOfs.bottom || 0,
			containerHeight = $container.height(),// - topOfs - bottomOfs,
			scrollTop = $container.scrollTop(),
			$animateTarget = $container,
			isParentWindow = $container[0] === window,
			topNode = opts.topNode || null,
			newScrollTop = null;

		// this.debug("scrollIntoView(), scrollTop=", scrollTop, opts.scrollOfs);
//		_assert($(this.span).is(":visible"), "scrollIntoView node is invisible"); // otherwise we cannot calc offsets
		if( !$(this.span).is(":visible") ) {
			// We cannot calc offsets for hidden elements
			this.warn("scrollIntoView(): node is invisible.");
			return _getResolvedPromise();
		}
		if( isParentWindow ) {
			nodeY = $(this.span).offset().top;
			topNodeY = (topNode && topNode.span) ? $(topNode.span).offset().top : 0;
			$animateTarget = $("html,body");

		} else {
			_assert($container[0] !== document && $container[0] !== document.body, "scrollParent should be an simple element or `window`, not document or body.");

			containerOffsetTop = $container.offset().top,
			nodeY = $(this.span).offset().top - containerOffsetTop + scrollTop; // relative to scroll parent
			topNodeY = topNode ? $(topNode.span).offset().top - containerOffsetTop  + scrollTop : 0;
			horzScrollbarHeight = Math.max(0, ($container.innerHeight() - $container[0].clientHeight));
			containerHeight -= horzScrollbarHeight;
		}

		// this.debug("    scrollIntoView(), nodeY=", nodeY, "containerHeight=", containerHeight);
		if( nodeY < (scrollTop + topOfs) ){
			// Node is above visible container area
			newScrollTop = nodeY - topOfs;
			// this.debug("    scrollIntoView(), UPPER newScrollTop=", newScrollTop);

		}else if((nodeY + nodeHeight) > (scrollTop + containerHeight - bottomOfs)){
			newScrollTop = nodeY + nodeHeight - containerHeight + bottomOfs;
			// this.debug("    scrollIntoView(), LOWER newScrollTop=", newScrollTop);
			// If a topNode was passed, make sure that it is never scrolled
			// outside the upper border
			if(topNode){
				_assert(topNode.isRoot() || $(topNode.span).is(":visible"), "topNode must be visible");
				if( topNodeY < newScrollTop ){
					newScrollTop = topNodeY - topOfs;
					// this.debug("    scrollIntoView(), TOP newScrollTop=", newScrollTop);
				}
			}
		}

		if(newScrollTop !== null){
			// this.debug("    scrollIntoView(), SET newScrollTop=", newScrollTop);
			if(opts.effects){
				opts.effects.complete = function(){
					dfd.resolveWith(that);
				};
				$animateTarget.stop(true).animate({
					scrollTop: newScrollTop
				}, opts.effects);
			}else{
				$animateTarget[0].scrollTop = newScrollTop;
				dfd.resolveWith(this);
			}
		}else{
			dfd.resolveWith(this);
		}
		return dfd.promise();
	},

	/**Activate this node.
	 * @param {boolean} [flag=true] pass false to deactivate
	 * @param {object} [opts] additional options. Defaults to {noEvents: false}
	 * @returns {$.Promise}
	 */
	setActive: function(flag, opts){
		return this.tree._callHook("nodeSetActive", this, flag, opts);
	},
	/**Expand or collapse this node. Promise is resolved, when lazy loading and animations are done.
	 * @param {boolean} [flag=true] pass false to collapse
	 * @param {object} [opts] additional options. Defaults to {noAnimation: false, noEvents: false}
	 * @returns {$.Promise}
	 */
	setExpanded: function(flag, opts){
		return this.tree._callHook("nodeSetExpanded", this, flag, opts);
	},
	/**Set keyboard focus to this node.
	 * @param {boolean} [flag=true] pass false to blur
	 * @see Fancytree#setFocus
	 */
	setFocus: function(flag){
		return this.tree._callHook("nodeSetFocus", this, flag);
	},
	/**Select this node, i.e. check the checkbox.
	 * @param {boolean} [flag=true] pass false to deselect
	 */
	setSelected: function(flag){
		return this.tree._callHook("nodeSetSelected", this, flag);
	},
	/**Mark a lazy node as 'error', 'loading', or 'ok'.
	 * @param {string} status 'error', 'ok'
	 * @param {string} [message]
	 * @param {string} [details]
	 */
	setStatus: function(status, message, details){
		return this.tree._callHook("nodeSetStatus", this, status, message, details);
	},
	/**Rename this node.
	 * @param {string} title
	 */
	setTitle: function(title){
		this.title = title;
		this.renderTitle();
	},
	/**Sort child list by title.
	 * @param {function} [cmp] custom compare function(a, b) that returns -1, 0, or 1 (defaults to sort by title).
	 * @param {boolean} [deep=false] pass true to sort all descendant nodes
	 */
	sortChildren: function(cmp, deep) {
		var i,l,
			cl = this.children;

		if( !cl ){
			return;
		}
		cmp = cmp || function(a, b) {
			var x = a.title.toLowerCase(),
				y = b.title.toLowerCase();
			return x === y ? 0 : x > y ? 1 : -1;
			};
		cl.sort(cmp);
		if( deep ){
			for(i=0, l=cl.length; i<l; i++){
				if( cl[i].children ){
					cl[i].sortChildren(cmp, "$norender$");
				}
			}
		}
		if( deep !== "$norender$" ){
			this.render();
		}
	},
	/** Convert node (or whole branch) into a plain object.
	 *
	 * The result is compatible with node.addChildren().
	 *
	 * @param {boolean} [recursive=false] include child nodes
	 * @param {function} [callback] callback(dict) is called for every node, in order to allow modifications
	 * @returns {NodeData}
	 */
	toDict: function(recursive, callback) {
		var i, l, node,
			dict = {},
			self = this;

		$.each(NODE_ATTRS, function(i, a){
			if(self[a] || self[a] === false){
				dict[a] = self[a];
			}
		});
		if(!$.isEmptyObject(this.data)){
			dict.data = $.extend({}, this.data);
			if($.isEmptyObject(dict.data)){
				delete dict.data;
			}
		}
		if( callback ){
			callback(dict);
		}
		if( recursive ) {
			if(this.hasChildren()){
				dict.children = [];
				for(i=0, l=this.children.length; i<l; i++ ){
					node = this.children[i];
					if( !node.isStatusNode() ){
						dict.children.push(node.toDict(true, callback));
					}
				}
			}else{
//                dict.children = null;
			}
		}
		return dict;
	},
	/** Flip expanded status.  */
	toggleExpanded: function(){
		return this.tree._callHook("nodeToggleExpanded", this);
	},
	/** Flip selection status.  */
	toggleSelected: function(){
		return this.tree._callHook("nodeToggleSelected", this);
	},
	toString: function() {
		return "<FancytreeNode(#" + this.key + ", '" + this.title + "')>";
	},
	/** Call fn(node) for all child nodes.<br>
	 * Stop iteration, if fn() returns false. Skip current branch, if fn() returns "skip".<br>
	 * Return false if iteration was stopped.
	 *
	 * @param {function} fn the callback function.
	 *     Return false to stop iteration, return "skip" to skip this node and
	 *     its children only.
	 * @param {boolean} [includeSelf=false]
	 * @returns {boolean}
	 */
	visit: function(fn, includeSelf) {
		var i, l,
			res = true,
			children = this.children;

		if( includeSelf === true ) {
			res = fn(this);
			if( res === false || res === "skip" ){
				return res;
			}
		}
		if(children){
			for(i=0, l=children.length; i<l; i++){
				res = children[i].visit(fn, true);
				if( res === false ){
					break;
				}
			}
		}
		return res;
	},
	/** Call fn(node) for all child nodes and recursively load lazy children.<br>
	 * <b>Note:</b> If you need this method, you probably should consider to review
	 * your architecture! Recursivley loading nodes is a perfect way for lazy
	 * programmers to flood the server with requests ;-)
	 *
	 * @param {function} [fn] optional callback function.
	 *     Return false to stop iteration, return "skip" to skip this node and
	 *     its children only.
	 * @param {boolean} [includeSelf=false]
	 * @returns {$.Promise}
	 */
	visitAndLoad: function(fn, includeSelf, _recursion) {
		var dfd, res, loaders,
			node = this;

		// node.debug("visitAndLoad");
		if( fn && includeSelf === true ) {
			res = fn(node);
			if( res === false || res === "skip" ) {
				return _recursion ? res : _getResolvedPromise();
			}
		}
		if( !node.children && !node.lazy ) {
			return _getResolvedPromise();
		}
		dfd = new $.Deferred();
		loaders = [];
		// node.debug("load()...");
		node.load().done(function(){
			// node.debug("load()... done.");
			for(var i=0, l=node.children.length; i<l; i++){
				res = node.children[i].visitAndLoad(fn, true, true);
				if( res === false ) {
					dfd.reject();
					break;
				} else if ( res !== "skip" ) {
					loaders.push(res); // Add promise to the list
				}
			}
			$.when.apply(this, loaders).then(function(){
				dfd.resolve();
			});
		});
		return dfd.promise();
	},
	/** Call fn(node) for all parent nodes, bottom-up, including invisible system root.<br>
	 * Stop iteration, if fn() returns false.<br>
	 * Return false if iteration was stopped.
	 *
	 * @param {function} fn the callback function.
	 *     Return false to stop iteration, return "skip" to skip this node and children only.
	 * @param {boolean} [includeSelf=false]
	 * @returns {boolean}
	 */
	visitParents: function(fn, includeSelf) {
		// Visit parent nodes (bottom up)
		if(includeSelf && fn(this) === false){
			return false;
		}
		var p = this.parent;
		while( p ) {
			if(fn(p) === false){
				return false;
			}
			p = p.parent;
		}
		return true;
	},
	/** Write warning to browser console (prepending node info)
	 *
	 * @param {*} msg string or object or array of such
	 */
	warn: function(msg){
		Array.prototype.unshift.call(arguments, this.toString());
		consoleApply("warn", arguments);
	}
};


/* *****************************************************************************
 * Fancytree
 */
/**
 * Construct a new tree object.
 *
 * @class Fancytree
 * @classdesc The controller behind a fancytree.
 * This class also contains 'hook methods': see {@link Fancytree_Hooks}.
 *
 * @param {Widget} widget
 *
 * @property {FancytreeOptions} options
 * @property {FancytreeNode} rootNode
 * @property {FancytreeNode} activeNode
 * @property {FancytreeNode} focusNode
 * @property {jQueryObject} $div
 * @property {object} widget
 * @property {object} ext
 * @property {object} data
 * @property {object} options
 * @property {string} _id
 * @property {string} statusClassPropName
 * @property {string} ariaPropName
 * @property {string} nodeContainerAttrName
 * @property {string} $container
 * @property {FancytreeNode} lastSelectedNode
 */
function Fancytree(widget) {
	this.widget = widget;
	this.$div = widget.element;
	this.options = widget.options;
	if( this.options ) {
		if(  $.isFunction(this.options.lazyload ) && !$.isFunction(this.options.lazyLoad) ) {
			this.options.lazyLoad = function() {
				FT.warn("The 'lazyload' event is deprecated since 2014-02-25. Use 'lazyLoad' (with uppercase L) instead.");
				return widget.options.lazyload.apply(this, arguments);
			};
		}
		if( $.isFunction(this.options.loaderror) ) {
			$.error("The 'loaderror' event was renamed since 2014-07-03. Use 'loadError' (with uppercase E) instead.");
		}
		if( this.options.fx !== undefined ) {
			FT.warn("The 'fx' options was replaced by 'toggleEffect' since 2014-11-30.");
		}
	}
	this.ext = {}; // Active extension instances
	// allow to init tree.data.foo from <div data-foo=''>
	this.data = _getElementDataAsDict(this.$div);
	this._id = $.ui.fancytree._nextId++;
	this._ns = ".fancytree-" + this._id; // append for namespaced events
	this.activeNode = null;
	this.focusNode = null;
	this._hasFocus = null;
	this.lastSelectedNode = null;
	this.systemFocusElement = null;
	this.lastQuicksearchTerm = "";
	this.lastQuicksearchTime = 0;

	this.statusClassPropName = "span";
	this.ariaPropName = "li";
	this.nodeContainerAttrName = "li";

	// Remove previous markup if any
	this.$div.find(">ul.fancytree-container").remove();

	// Create a node without parent.
	var fakeParent = { tree: this },
		$ul;
	this.rootNode = new FancytreeNode(fakeParent, {
		title: "root",
		key: "root_" + this._id,
		children: null,
		expanded: true
	});
	this.rootNode.parent = null;

	// Create root markup
	$ul = $("<ul>", {
		"class": "ui-fancytree fancytree-container"
	}).appendTo(this.$div);
	this.$container = $ul;
	this.rootNode.ul = $ul[0];

	if(this.options.debugLevel == null){
		this.options.debugLevel = FT.debugLevel;
	}
	// Add container to the TAB chain
	// See http://www.w3.org/TR/wai-aria-practices/#focus_activedescendant
	this.$container.attr("tabindex", this.options.tabbable ? "0" : "-1");
	if(this.options.aria){
		this.$container
			.attr("role", "tree")
			.attr("aria-multiselectable", true);
	}
}


Fancytree.prototype = /** @lends Fancytree# */{
	/* Return a context object that can be re-used for _callHook().
	 * @param {Fancytree | FancytreeNode | EventData} obj
	 * @param {Event} originalEvent
	 * @param {Object} extra
	 * @returns {EventData}
	 */
	_makeHookContext: function(obj, originalEvent, extra) {
		var ctx, tree;
		if(obj.node !== undefined){
			// obj is already a context object
			if(originalEvent && obj.originalEvent !== originalEvent){
				$.error("invalid args");
			}
			ctx = obj;
		}else if(obj.tree){
			// obj is a FancytreeNode
			tree = obj.tree;
			ctx = { node: obj, tree: tree, widget: tree.widget, options: tree.widget.options, originalEvent: originalEvent };
		}else if(obj.widget){
			// obj is a Fancytree
			ctx = { node: null, tree: obj, widget: obj.widget, options: obj.widget.options, originalEvent: originalEvent };
		}else{
			$.error("invalid args");
		}
		if(extra){
			$.extend(ctx, extra);
		}
		return ctx;
	},
	/* Trigger a hook function: funcName(ctx, [...]).
	 *
	 * @param {string} funcName
	 * @param {Fancytree|FancytreeNode|EventData} contextObject
	 * @param {any}  [_extraArgs] optional additional arguments
	 * @returns {any}
	 */
	_callHook: function(funcName, contextObject, _extraArgs) {
		var ctx = this._makeHookContext(contextObject),
			fn = this[funcName],
			args = Array.prototype.slice.call(arguments, 2);
		if(!$.isFunction(fn)){
			$.error("_callHook('" + funcName + "') is not a function");
		}
		args.unshift(ctx);
//		this.debug("_hook", funcName, ctx.node && ctx.node.toString() || ctx.tree.toString(), args);
		return fn.apply(this, args);
	},
	/* Check if current extensions dependencies are met and throw an error if not.
	 *
	 * This method may be called inside the `treeInit` hook for custom extensions.
	 *
	 * @param {string} extension name of the required extension
	 * @param {boolean} [required=true] pass `false` if the extension is optional, but we want to check for order if it is present
	 * @param {boolean} [before] `true` if `name` must be included before this, `false` otherwise (use `null` if order doesn't matter)
	 * @param {string} [message] optional error message (defaults to a descriptve error message)
	 */
	_requireExtension: function(name, required, before, message) {
		before = !!before;
		var thisName = this._local.name,
			extList = this.options.extensions,
			isBefore = $.inArray(name, extList) < $.inArray(thisName, extList),
			isMissing = required && this.ext[name] == null,
			badOrder = !isMissing && before != null && (before !== isBefore);

		_assert(thisName && thisName !== name);

		if( isMissing || badOrder ){
			if( !message ){
				if( isMissing || required ){
					message = "'" + thisName + "' extension requires '" + name + "'";
					if( badOrder ){
						message += " to be registered " + (before ? "before" : "after") + " itself";
					}
				}else{
					message = "If used together, `" + name + "` must be registered " + (before ? "before" : "after") + " `" + thisName + "`";
				}
			}
			$.error(message);
			return false;
		}
		return true;
	},
	/** Activate node with a given key and fire focus and activate events.
	 *
	 * A prevously activated node will be deactivated.
	 * If activeVisible option is set, all parents will be expanded as necessary.
	 * Pass key = false, to deactivate the current node only.
	 * @param {string} key
	 * @returns {FancytreeNode} activated node (null, if not found)
	 */
	activateKey: function(key) {
		var node = this.getNodeByKey(key);
		if(node){
			node.setActive();
		}else if(this.activeNode){
			this.activeNode.setActive(false);
		}
		return node;
	},
	/** (experimental)
	 *
	 * @param {Array} patchList array of [key, NodePatch] arrays
	 * @returns {$.Promise} resolved, when all patches have been applied
	 * @see TreePatch
	 */
	applyPatch: function(patchList) {
		var dfd, i, p2, key, patch, node,
			patchCount = patchList.length,
			deferredList = [];

		for(i=0; i<patchCount; i++){
			p2 = patchList[i];
			_assert(p2.length === 2, "patchList must be an array of length-2-arrays");
			key = p2[0];
			patch = p2[1];
			node = (key === null) ? this.rootNode : this.getNodeByKey(key);
			if(node){
				dfd = new $.Deferred();
				deferredList.push(dfd);
				node.applyPatch(patch).always(_makeResolveFunc(dfd, node));
			}else{
				this.warn("could not find node with key '" + key + "'");
			}
		}
		// Return a promise that is resolved, when ALL patches were applied
		return $.when.apply($, deferredList).promise();
	},
	/* TODO: implement in dnd extension
	cancelDrag: function() {
		var dd = $.ui.ddmanager.current;
		if(dd){
			dd.cancel();
		}
	},
   */
   /** Return the number of nodes.
	* @returns {integer}
	*/
	count: function() {
		return this.rootNode.countChildren();
	},
	/** Write to browser console if debugLevel >= 2 (prepending tree name)
	 *
	 * @param {*} msg string or object or array of such
	 */
	debug: function(msg){
		if( this.options.debugLevel >= 2 ) {
			Array.prototype.unshift.call(arguments, this.toString());
			consoleApply("log", arguments);
		}
	},
	// TODO: disable()
	// TODO: enable()
	// TODO: enableUpdate()

	/** Find the next visible node that starts with `match`, starting at `startNode`
	 * and wrap-around at the end.
	 *
	 * @param {string|function} match
	 * @param {FancytreeNode} [startNode] defaults to first node
	 * @returns {FancytreeNode} matching node or null
	 */
	findNextNode: function(match, startNode, visibleOnly) {
		var stopNode = null,
			parentChildren = startNode.parent.children,
			matchingNode = null,
			walkVisible = function(parent, idx, fn) {
				var i, grandParent,
					parentChildren = parent.children,
					siblingCount = parentChildren.length,
					node = parentChildren[idx];
				// visit node itself
				if( node && fn(node) === false ) {
					return false;
				}
				// visit descendants
				if( node && node.children && node.expanded ) {
					if( walkVisible(node, 0, fn) === false ) {
						return false;
					}
				}
				// visit subsequent siblings
				for( i = idx + 1; i < siblingCount; i++ ) {
					if( walkVisible(parent, i, fn) === false ) {
						return false;
					}
				}
				// visit parent's subsequent siblings
				grandParent = parent.parent;
				if( grandParent ) {
					return walkVisible(grandParent, grandParent.children.indexOf(parent) + 1, fn);
				} else {
					// wrap-around: restart with first node
					return walkVisible(parent, 0, fn);
				}
			};

		match = (typeof match === "string") ? _makeNodeTitleStartMatcher(match) : match;
		startNode = startNode || this.getFirstChild();

		walkVisible(startNode.parent, parentChildren.indexOf(startNode), function(node){
			// Stop iteration if we see the start node a second time
			if( node === stopNode ) {
				return false;
			}
			stopNode = stopNode || node;
			// Ignore nodes hidden by a filter
			if( ! $(node.span).is(":visible") ) {
				node.debug("quicksearch: skipping hidden node");
				return;
			}
			// Test if we found a match, but search for a second match if this
			// was the currently active node
			if( match(node) ) {
				// node.debug("quicksearch match " + node.title, startNode);
				matchingNode = node;
				if( matchingNode !== startNode ) {
					return false;
				}
			}
		});
		return matchingNode;
	},
	// TODO: fromDict
	/**
	 * Generate INPUT elements that can be submitted with html forms.
	 *
	 * In selectMode 3 only the topmost selected nodes are considered, unless
	 * `opts.stopOnParents: false` is passed.
	 *
	 * @param {boolean | string} [selected=true] Pass false to disable, pass a string to overide the field name (default: 'ft_ID[]')
	 * @param {boolean | string} [active=true] Pass false to disable, pass a string to overide the field name (default: 'ft_ID_active')
	 * @param {object} [opts] default { stopOnParents: true }
	 */
	generateFormElements: function(selected, active, opts) {
		// TODO: test case
		opts = opts || {};

		var nodeList,
			selectedName = (typeof selected === "string") ? selected : "ft_" + this._id + "[]",
			activeName = (typeof active === "string") ? active : "ft_" + this._id + "_active",
			id = "fancytree_result_" + this._id,
			$result = $("#" + id),
			stopOnParents = this.options.selectMode === 3 && opts.stopOnParents !== false;

		if($result.length){
			$result.empty();
		}else{
			$result = $("<div>", {
				id: id
			}).hide().insertAfter(this.$container);
		}
		if(selected !== false){
			nodeList = this.getSelectedNodes(stopOnParents);
			$.each(nodeList, function(idx, node){
				$result.append($("<input>", {
					type: "checkbox",
					name: selectedName,
					value: node.key,
					checked: true
				}));
			});
		}
		if(active !== false && this.activeNode){
			$result.append($("<input>", {
				type: "radio",
				name: activeName,
				value: this.activeNode.key,
				checked: true
			}));
		}
	},
	/**
	 * Return the currently active node or null.
	 * @returns {FancytreeNode}
	 */
	getActiveNode: function() {
		return this.activeNode;
	},
	/** Return the first top level node if any (not the invisible root node).
	 * @returns {FancytreeNode | null}
	 */
	getFirstChild: function() {
		return this.rootNode.getFirstChild();
	},
	/**
	 * Return node that has keyboard focus or null.
	 * @returns {FancytreeNode}
	 */
	getFocusNode: function() {
		return this.focusNode;
	},
	/**
	 * Return node with a given key or null if not found.
	 * @param {string} key
	 * @param {FancytreeNode} [searchRoot] only search below this node
	 * @returns {FancytreeNode | null}
	 */
	getNodeByKey: function(key, searchRoot) {
		// Search the DOM by element ID (assuming this is faster than traversing all nodes).
		// $("#...") has problems, if the key contains '.', so we use getElementById()
		var el, match;
		if(!searchRoot){
			el = document.getElementById(this.options.idPrefix + key);
			if( el ){
				return el.ftnode ? el.ftnode : null;
			}
		}
		// Not found in the DOM, but still may be in an unrendered part of tree
		// TODO: optimize with specialized loop
		// TODO: consider keyMap?
		searchRoot = searchRoot || this.rootNode;
		match = null;
		searchRoot.visit(function(node){
//            window.console.log("getNodeByKey(" + key + "): ", node.key);
			if(node.key === key) {
				match = node;
				return false;
			}
		}, true);
		return match;
	},
	/** Return the invisible system root node.
	 * @returns {FancytreeNode}
	 */
	getRootNode: function() {
		return this.rootNode;
	},
	/**
	 * Return an array of selected nodes.
	 * @param {boolean} [stopOnParents=false] only return the topmost selected
	 *     node (useful with selectMode 3)
	 * @returns {FancytreeNode[]}
	 */
	getSelectedNodes: function(stopOnParents) {
		var nodeList = [];
		this.rootNode.visit(function(node){
			if( node.selected ) {
				nodeList.push(node);
				if( stopOnParents === true ){
					return "skip"; // stop processing this branch
				}
			}
		});
		return nodeList;
	},
	/** Return true if the tree control has keyboard focus
	 * @returns {boolean}
	 */
	hasFocus: function(){
		return !!this._hasFocus;
	},
	/** Write to browser console if debugLevel >= 1 (prepending tree name)
	 * @param {*} msg string or object or array of such
	 */
	info: function(msg){
		if( this.options.debugLevel >= 1 ) {
			Array.prototype.unshift.call(arguments, this.toString());
			consoleApply("info", arguments);
		}
	},
/*
	TODO: isInitializing: function() {
		return ( this.phase=="init" || this.phase=="postInit" );
	},
	TODO: isReloading: function() {
		return ( this.phase=="init" || this.phase=="postInit" ) && this.options.persist && this.persistence.cookiesFound;
	},
	TODO: isUserEvent: function() {
		return ( this.phase=="userEvent" );
	},
*/

	/**
	 * Make sure that a node with a given ID is loaded, by traversing - and
	 * loading - its parents. This method is ment for lazy hierarchies.
	 * A callback is executed for every node as we go.
	 * @example
	 * tree.loadKeyPath("/_3/_23/_26/_27", function(node, status){
	 *   if(status === "loaded") {
	 *     console.log("loaded intermiediate node " + node);
	 *   }else if(status === "ok") {
	 *     node.activate();
	 *   }
	 * });
	 *
	 * @param {string | string[]} keyPathList one or more key paths (e.g. '/3/2_1/7')
	 * @param {function} callback callback(node, status) is called for every visited node ('loading', 'loaded', 'ok', 'error')
	 * @returns {$.Promise}
	 */
	loadKeyPath: function(keyPathList, callback, _rootNode) {
		var deferredList, dfd, i, path, key, loadMap, node, root, segList,
			sep = this.options.keyPathSeparator,
			self = this;

		if(!$.isArray(keyPathList)){
			keyPathList = [keyPathList];
		}
		// Pass 1: handle all path segments for nodes that are already loaded
		// Collect distinct top-most lazy nodes in a map
		loadMap = {};

		for(i=0; i<keyPathList.length; i++){
			root = _rootNode || this.rootNode;
			path = keyPathList[i];
			// strip leading slash
			if(path.charAt(0) === sep){
				path = path.substr(1);
			}
			// traverse and strip keys, until we hit a lazy, unloaded node
			segList = path.split(sep);
			while(segList.length){
				key = segList.shift();
//                node = _findDirectChild(root, key);
				node = root._findDirectChild(key);
				if(!node){
					this.warn("loadKeyPath: key not found: " + key + " (parent: " + root + ")");
					callback.call(this, key, "error");
					break;
				}else if(segList.length === 0){
					callback.call(this, node, "ok");
					break;
				}else if(!node.lazy || (node.hasChildren() !== undefined )){
					callback.call(this, node, "loaded");
					root = node;
				}else{
					callback.call(this, node, "loaded");
//                    segList.unshift(key);
					if(loadMap[key]){
						loadMap[key].push(segList.join(sep));
					}else{
						loadMap[key] = [segList.join(sep)];
					}
					break;
				}
			}
		}
//        alert("loadKeyPath: loadMap=" + JSON.stringify(loadMap));
		// Now load all lazy nodes and continue itearation for remaining paths
		deferredList = [];
		// Avoid jshint warning 'Don't make functions within a loop.':
		function __lazyload(key, node, dfd){
			callback.call(self, node, "loading");
			node.load().done(function(){
				self.loadKeyPath.call(self, loadMap[key], callback, node).always(_makeResolveFunc(dfd, self));
			}).fail(function(errMsg){
				self.warn("loadKeyPath: error loading: " + key + " (parent: " + root + ")");
				callback.call(self, node, "error");
				dfd.reject();
			});
		}
		for(key in loadMap){
			node = root._findDirectChild(key);
//            alert("loadKeyPath: lazy node(" + key + ") = " + node);
			dfd = new $.Deferred();
			deferredList.push(dfd);
			__lazyload(key, node, dfd);
		}
		// Return a promise that is resolved, when ALL paths were loaded
		return $.when.apply($, deferredList).promise();
	},
	/** Re-fire beforeActivate and activate events. */
	reactivate: function(setFocus) {
		var res,
			node = this.activeNode;

		if( !node ) {
			return _getResolvedPromise();
		}
		this.activeNode = null; // Force re-activating
		res = node.setActive();
		if( setFocus ){
			node.setFocus();
		}
		return res;
	},
	/** Reload tree from source and return a promise.
	 * @param [source] optional new source (defaults to initial source data)
	 * @returns {$.Promise}
	 */
	reload: function(source) {
		this._callHook("treeClear", this);
		return this._callHook("treeLoad", this, source);
	},
	/**Render tree (i.e. create DOM elements for all top-level nodes).
	 * @param {boolean} [force=false] create DOM elemnts, even is parent is collapsed
	 * @param {boolean} [deep=false]
	 */
	render: function(force, deep) {
		return this.rootNode.render(force, deep);
	},
	// TODO: selectKey: function(key, select)
	// TODO: serializeArray: function(stopOnParents)
	/**
	 * @param {boolean} [flag=true]
	 */
	setFocus: function(flag) {
		return this._callHook("treeSetFocus", this, flag);
	},
	/**
	 * Return all nodes as nested list of {@link NodeData}.
	 *
	 * @param {boolean} [includeRoot=false] Returns the hidden system root node (and its children)
	 * @param {function} [callback(node)] Called for every node
	 * @returns {Array | object}
	 * @see FancytreeNode#toDict
	 */
	toDict: function(includeRoot, callback){
		var res = this.rootNode.toDict(true, callback);
		return includeRoot ? res : res.children;
	},
	/* Implicitly called for string conversions.
	 * @returns {string}
	 */
	toString: function(){
		return "<Fancytree(#" + this._id + ")>";
	},
	/* _trigger a widget event with additional node ctx.
	 * @see EventData
	 */
	_triggerNodeEvent: function(type, node, originalEvent, extra) {
//		this.debug("_trigger(" + type + "): '" + ctx.node.title + "'", ctx);
		var ctx = this._makeHookContext(node, originalEvent, extra),
			res = this.widget._trigger(type, originalEvent, ctx);
		if(res !== false && ctx.result !== undefined){
			return ctx.result;
		}
		return res;
	},
	/* _trigger a widget event with additional tree data. */
	_triggerTreeEvent: function(type, originalEvent, extra) {
//		this.debug("_trigger(" + type + ")", ctx);
		var ctx = this._makeHookContext(this, originalEvent, extra),
			res = this.widget._trigger(type, originalEvent, ctx);

		if(res !== false && ctx.result !== undefined){
			return ctx.result;
		}
		return res;
	},
	/** Call fn(node) for all nodes.
	 *
	 * @param {function} fn the callback function.
	 *     Return false to stop iteration, return "skip" to skip this node and children only.
	 * @returns {boolean} false, if the iterator was stopped.
	 */
	visit: function(fn) {
		return this.rootNode.visit(fn, false);
	},
	/** Write warning to browser console (prepending tree info)
	 *
	 * @param {*} msg string or object or array of such
	 */
	warn: function(msg){
		Array.prototype.unshift.call(arguments, this.toString());
		consoleApply("warn", arguments);
	}
};

/**
 * These additional methods of the {@link Fancytree} class are 'hook functions'
 * that can be used and overloaded by extensions.
 * (See <a href="https://github.com/mar10/fancytree/wiki/TutorialExtensions">writing extensions</a>.)
 * @mixin Fancytree_Hooks
 */
$.extend(Fancytree.prototype,
	/** @lends Fancytree_Hooks# */
	{
	/** Default handling for mouse click events.
	 *
	 * @param {EventData} ctx
	 */
	nodeClick: function(ctx) {
//      this.tree.logDebug("ftnode.onClick(" + event.type + "): ftnode:" + this + ", button:" + event.button + ", which: " + event.which);
		var activate, expand,
			// event = ctx.originalEvent,
			targetType = ctx.targetType,
			node = ctx.node;

		// TODO: use switch
		// TODO: make sure clicks on embedded <input> doesn't steal focus (see table sample)
		if( targetType === "expander" ) {
			// Clicking the expander icon always expands/collapses
			this._callHook("nodeToggleExpanded", ctx);

		} else if( targetType === "checkbox" ) {
			// Clicking the checkbox always (de)selects
			this._callHook("nodeToggleSelected", ctx);
			if( ctx.options.focusOnSelect ) { // #358
				this._callHook("nodeSetFocus", ctx, true);
			}

		} else {
			// Honor `clickFolderMode` for
			expand = false;
			activate = true;
			if( node.folder ) {
				switch( ctx.options.clickFolderMode ) {
				case 2: // expand only
					expand = true;
					activate = false;
					break;
				case 3: // expand and activate
					activate = true;
					expand = true; //!node.isExpanded();
					break;
				// else 1 or 4: just activate
				}
			}
			if( activate ) {
				this.nodeSetFocus(ctx);
				this._callHook("nodeSetActive", ctx, true);
			}
			if( expand ) {
				if(!activate){
//                    this._callHook("nodeSetFocus", ctx);
				}
//				this._callHook("nodeSetExpanded", ctx, true);
				this._callHook("nodeToggleExpanded", ctx);
			}
		}
		// Make sure that clicks stop, otherwise <a href='#'> jumps to the top
		// if(event.target.localName === "a" && event.target.className === "fancytree-title"){
		// 	event.preventDefault();
		// }
		// TODO: return promise?
	},
	/** Collapse all other  children of same parent.
	 *
	 * @param {EventData} ctx
	 * @param {object} callOpts
	 */
	nodeCollapseSiblings: function(ctx, callOpts) {
		// TODO: return promise?
		var ac, i, l,
			node = ctx.node;

		if( node.parent ){
			ac = node.parent.children;
			for (i=0, l=ac.length; i<l; i++) {
				if ( ac[i] !== node && ac[i].expanded ){
					this._callHook("nodeSetExpanded", ac[i], false, callOpts);
				}
			}
		}
	},
	/** Default handling for mouse douleclick events.
	 * @param {EventData} ctx
	 */
	nodeDblclick: function(ctx) {
		// TODO: return promise?
		if( ctx.targetType === "title" && ctx.options.clickFolderMode === 4) {
//			this.nodeSetFocus(ctx);
//			this._callHook("nodeSetActive", ctx, true);
			this._callHook("nodeToggleExpanded", ctx);
		}
		// TODO: prevent text selection on dblclicks
		if( ctx.targetType === "title" ) {
			ctx.originalEvent.preventDefault();
		}
	},
	/** Default handling for mouse keydown events.
	 *
	 * NOTE: this may be called with node == null if tree (but no node) has focus.
	 * @param {EventData} ctx
	 */
	nodeKeydown: function(ctx) {
		// TODO: return promise?
		var matchNode, stamp, res,
			event = ctx.originalEvent,
			node = ctx.node,
			tree = ctx.tree,
			opts = ctx.options,
			which = event.which,
			whichChar = String.fromCharCode(which),
			clean = !(event.altKey || event.ctrlKey || event.metaKey || event.shiftKey),
			$target = $(event.target),
			handled = true,
			activate = !(event.ctrlKey || !opts.autoActivate );

//		(node || FT).debug("ftnode.nodeKeydown(" + event.type + "): ftnode:" + this + ", charCode:" + event.charCode + ", keyCode: " + event.keyCode + ", which: " + event.which);
//		FT.debug("eventToString", which, '"' + String.fromCharCode(which) + '"', '"' + FT.eventToString(event) + '"');

		// Set focus to active (or first node) if no other node has the focus yet
		if( !node ){
			(this.getActiveNode() || this.getFirstChild()).setFocus();
			node = ctx.node = this.focusNode;
			node.debug("Keydown force focus on active node");
		}

		if( opts.quicksearch && clean && /\w/.test(whichChar) && !$target.is(":input:enabled") ) {
			// Allow to search for longer streaks if typed in quickly
			stamp = new Date().getTime();
			if( stamp - tree.lastQuicksearchTime > 500 ) {
				tree.lastQuicksearchTerm = "";
			}
			tree.lastQuicksearchTime = stamp;
			tree.lastQuicksearchTerm += whichChar;
			// tree.debug("quicksearch find", tree.lastQuicksearchTerm);
			matchNode = tree.findNextNode(tree.lastQuicksearchTerm, tree.getActiveNode());
			if( matchNode ) {
				matchNode.setActive();
			}
			event.preventDefault();
			return;
		}
		switch( FT.eventToString(event) ) {
			case "+":
			case "=": // 187: '+' @ Chrome, Safari
				tree.nodeSetExpanded(ctx, true);
				break;
			case "-":
				tree.nodeSetExpanded(ctx, false);
				break;
			case "space":
				if(opts.checkbox){
					tree.nodeToggleSelected(ctx);
				}else{
					tree.nodeSetActive(ctx, true);
				}
				break;
			case "enter":
				tree.nodeSetActive(ctx, true);
				break;
			case "backspace":
			case "left":
			case "right":
			case "up":
			case "down":
				res = node.navigate(event.which, activate);
				break;
			default:
				handled = false;
		}
		if(handled){
			event.preventDefault();
		}
	},


	// /** Default handling for mouse keypress events. */
	// nodeKeypress: function(ctx) {
	//     var event = ctx.originalEvent;
	// },

	// /** Trigger lazyLoad event (async). */
	// nodeLazyLoad: function(ctx) {
	//     var node = ctx.node;
	//     if(this._triggerNodeEvent())
	// },
	/** Load child nodes (async).
	 *
	 * @param {EventData} ctx
	 * @param {object[]|object|string|$.Promise|function} source
	 * @returns {$.Promise} The deferred will be resolved as soon as the (ajax)
	 *     data was rendered.
	 */
	nodeLoadChildren: function(ctx, source) {
		var ajax, delay, dfd,
			tree = ctx.tree,
			node = ctx.node;

		if($.isFunction(source)){
			source = source();
		}
		// TOTHINK: move to 'ajax' extension?
		if(source.url){
			// `source` is an Ajax options object
			ajax = $.extend({}, ctx.options.ajax, source);
			if(ajax.debugDelay){
				// simulate a slow server
				delay = ajax.debugDelay;
				if($.isArray(delay)){ // random delay range [min..max]
					delay = delay[0] + Math.random() * (delay[1] - delay[0]);
				}

				node.debug("nodeLoadChildren waiting debug delay " + Math.round(delay) + "ms");
				ajax.debugDelay = false;
				dfd = $.Deferred(function (dfd) {
					setTimeout(function () {
						$.ajax(ajax)
							.done(function () {	dfd.resolveWith(this, arguments); })
							.fail(function () {	dfd.rejectWith(this, arguments); });
					}, delay);
				});
			}else{
				dfd = $.ajax(ajax);
			}

			// Defer the deferred: we want to be able to reject, even if ajax
			// resolved ok.
			source = new $.Deferred();
			dfd.done(function (data, textStatus, jqXHR) {
				var errorObj, res;
				if(typeof data === "string"){
					$.error("Ajax request returned a string (did you get the JSON dataType wrong?).");
				}
				// postProcess is similar to the standard ajax dataFilter hook,
				// but it is also called for JSONP
				if( ctx.options.postProcess ){
					res = tree._triggerNodeEvent("postProcess", ctx, ctx.originalEvent, {response: data, error: null, dataType: this.dataType});
					if( res.error ) {
						errorObj = $.isPlainObject(res.error) ? res.error : {message: res.error};
						errorObj = tree._makeHookContext(node, null, errorObj);
						source.rejectWith(this, [errorObj]);
						return;
					}
					data = $.isArray(res) ? res : data;

				} else if (data && data.hasOwnProperty("d") && ctx.options.enableAspx ) {
					// Process ASPX WebMethod JSON object inside "d" property
					data = (typeof data.d === "string") ? $.parseJSON(data.d) : data.d;
				}
				source.resolveWith(this, [data]);
			}).fail(function (jqXHR, textStatus, errorThrown) {
				var errorObj = tree._makeHookContext(node, null, {
					error: jqXHR,
					args: Array.prototype.slice.call(arguments),
					message: errorThrown,
					details: jqXHR.status + ": " + errorThrown
				});
				source.rejectWith(this, [errorObj]);
			});
		}
		// #383: accept and convert ECMAScript 6 Promise
		if( $.isFunction(source.then) && $.isFunction(source["catch"]) ) {
			dfd = source;
			source = new $.Deferred();
			dfd.then(function(value){
				source.resolve(value);
			}, function(reason){
				source.reject(reason);
			});
		}
		if($.isFunction(source.promise)){
			// `source` is a deferred, i.e. ajax request
			_assert(!node.isLoading());
			// node._isLoading = true;
			tree.nodeSetStatus(ctx, "loading");

			source.done(function (children) {
				tree.nodeSetStatus(ctx, "ok");
			}).fail(function(error){
				var ctxErr;
				if (error.node && error.error && error.message) {
					// error is already a context object
					ctxErr = error;
				} else {
					ctxErr = tree._makeHookContext(node, null, {
						error: error, // it can be jqXHR or any custom error
						args: Array.prototype.slice.call(arguments),
						message: error ? (error.message || error.toString()) : ""
					});
				}
				if( tree._triggerNodeEvent("loadError", ctxErr, null) !== false ) {
					tree.nodeSetStatus(ctx, "error", ctxErr.message, ctxErr.details);
				}
			});
		}
		// $.when(source) resolves also for non-deferreds
		return $.when(source).done(function(children){
			var metaData;

			if( $.isPlainObject(children) ){
				// We got {foo: 'abc', children: [...]}
				// Copy extra properties to tree.data.foo
				_assert($.isArray(children.children), "source must contain (or be) an array of children");
				_assert(node.isRoot(), "source may only be an object for root nodes");
				metaData = children;
				children = children.children;
				delete metaData.children;
				$.extend(tree.data, metaData);
			}
			_assert($.isArray(children), "expected array of children");
			node._setChildren(children);
			// trigger fancytreeloadchildren
			tree._triggerNodeEvent("loadChildren", node);
		// }).always(function(){
		// 	node._isLoading = false;
		});
	},
	/** [Not Implemented]  */
	nodeLoadKeyPath: function(ctx, keyPathList) {
		// TODO: implement and improve
		// http://code.google.com/p/dynatree/issues/detail?id=222
	},
	/**
	 * Remove a single direct child of ctx.node.
	 * @param {EventData} ctx
	 * @param {FancytreeNode} childNode dircect child of ctx.node
	 */
	nodeRemoveChild: function(ctx, childNode) {
		var idx,
			node = ctx.node,
			opts = ctx.options,
			subCtx = $.extend({}, ctx, {node: childNode}),
			children = node.children;

		// FT.debug("nodeRemoveChild()", node.toString(), childNode.toString());

		if( children.length === 1 ) {
			_assert(childNode === children[0]);
			return this.nodeRemoveChildren(ctx);
		}
		if( this.activeNode && (childNode === this.activeNode || this.activeNode.isDescendantOf(childNode))){
			this.activeNode.setActive(false); // TODO: don't fire events
		}
		if( this.focusNode && (childNode === this.focusNode || this.focusNode.isDescendantOf(childNode))){
			this.focusNode = null;
		}
		// TODO: persist must take care to clear select and expand cookies
		this.nodeRemoveMarkup(subCtx);
		this.nodeRemoveChildren(subCtx);
		idx = $.inArray(childNode, children);
		_assert(idx >= 0);
		// Unlink to support GC
		childNode.visit(function(n){
			n.parent = null;
		}, true);
		this._callHook("treeRegisterNode", this, false, childNode);
		if ( opts.removeNode ){
			opts.removeNode.call(ctx.tree, {type: "removeNode"}, subCtx);
		}
		// remove from child list
		children.splice(idx, 1);
	},
	/**Remove HTML markup for all descendents of ctx.node.
	 * @param {EventData} ctx
	 */
	nodeRemoveChildMarkup: function(ctx) {
		var node = ctx.node;

		// FT.debug("nodeRemoveChildMarkup()", node.toString());
		// TODO: Unlink attr.ftnode to support GC
		if(node.ul){
			if( node.isRoot() ) {
				$(node.ul).empty();
			} else {
				$(node.ul).remove();
				node.ul = null;
			}
			node.visit(function(n){
				n.li = n.ul = null;
			});
		}
	},
	/**Remove all descendants of ctx.node.
	* @param {EventData} ctx
	*/
	nodeRemoveChildren: function(ctx) {
		var subCtx,
			tree = ctx.tree,
			node = ctx.node,
			children = node.children,
			opts = ctx.options;

		// FT.debug("nodeRemoveChildren()", node.toString());
		if(!children){
			return;
		}
		if( this.activeNode && this.activeNode.isDescendantOf(node)){
			this.activeNode.setActive(false); // TODO: don't fire events
		}
		if( this.focusNode && this.focusNode.isDescendantOf(node)){
			this.focusNode = null;
		}
		// TODO: persist must take care to clear select and expand cookies
		this.nodeRemoveChildMarkup(ctx);
		// Unlink children to support GC
		// TODO: also delete this.children (not possible using visit())
		subCtx = $.extend({}, ctx);
		node.visit(function(n){
			n.parent = null;
			tree._callHook("treeRegisterNode", tree, false, n);
			if ( opts.removeNode ){
				subCtx.node = n;
				opts.removeNode.call(ctx.tree, {type: "removeNode"}, subCtx);
			}
		});
		if( node.lazy ){
			// 'undefined' would be interpreted as 'not yet loaded' for lazy nodes
			node.children = [];
		} else{
			node.children = null;
		}
		this.nodeRenderStatus(ctx);
	},
	/**Remove HTML markup for ctx.node and all its descendents.
	 * @param {EventData} ctx
	 */
	nodeRemoveMarkup: function(ctx) {
		var node = ctx.node;
		// FT.debug("nodeRemoveMarkup()", node.toString());
		// TODO: Unlink attr.ftnode to support GC
		if(node.li){
			$(node.li).remove();
			node.li = null;
		}
		this.nodeRemoveChildMarkup(ctx);
	},
	/**
	 * Create `&lt;li>&lt;span>..&lt;/span> .. &lt;/li>` tags for this node.
	 *
	 * This method takes care that all HTML markup is created that is required
	 * to display this node in it's current state.
	 *
	 * Call this method to create new nodes, or after the strucuture
	 * was changed (e.g. after moving this node or adding/removing children)
	 * nodeRenderTitle() and nodeRenderStatus() are implied.
	 *
	 * Note: if a node was created/removed, nodeRender() must be called for the
	 *       parent.
	 * <code>
	 * <li id='KEY' ftnode=NODE>
	 *     <span class='fancytree-node fancytree-expanded fancytree-has-children fancytree-lastsib fancytree-exp-el fancytree-ico-e'>
	 *         <span class="fancytree-expander"></span>
	 *         <span class="fancytree-checkbox"></span> // only present in checkbox mode
	 *         <span class="fancytree-icon"></span>
	 *         <a href="#" class="fancytree-title"> Node 1 </a>
	 *     </span>
	 *     <ul> // only present if node has children
	 *         <li id='KEY' ftnode=NODE> child1 ... </li>
	 *         <li id='KEY' ftnode=NODE> child2 ... </li>
	 *     </ul>
	 * </li>
	 * </code>
	 *
	 * @param {EventData} ctx
	 * @param {boolean} [force=false] re-render, even if html markup was already created
	 * @param {boolean} [deep=false] also render all descendants, even if parent is collapsed
	 * @param {boolean} [collapsed=false] force root node to be collapsed, so we can apply animated expand later
	 */
	nodeRender: function(ctx, force, deep, collapsed, _recursive) {
		/* This method must take care of all cases where the current data mode
		 * (i.e. node hierarchy) does not match the current markup.
		 *
		 * - node was not yet rendered:
		 *   create markup
		 * - node was rendered: exit fast
		 * - children have been added
		 * - childern have been removed
		 */
		var childLI, childNode1, childNode2, i, l, next, subCtx,
			node = ctx.node,
			tree = ctx.tree,
			opts = ctx.options,
			aria = opts.aria,
			firstTime = false,
			parent = node.parent,
			isRootNode = !parent,
			children = node.children;
		// FT.debug("nodeRender(" + !!force + ", " + !!deep + ")", node.toString());

		if( ! isRootNode && ! parent.ul ) {
			// Calling node.collapse on a deep, unrendered node
			return;
		}
		_assert(isRootNode || parent.ul, "parent UL must exist");

		// Render the node
		if( !isRootNode ){
			// Discard markup on force-mode, or if it is not linked to parent <ul>
			if(node.li && (force || (node.li.parentNode !== node.parent.ul) ) ){
				if(node.li.parentNode !== node.parent.ul){
					// May happen, when a top-level node was dropped over another
					this.debug("Unlinking " + node + " (must be child of " + node.parent + ")");
				}
//	            this.debug("nodeRemoveMarkup...");
				this.nodeRemoveMarkup(ctx);
			}
			// Create <li><span /> </li>
//			node.debug("render...");
			if( !node.li ) {
//	            node.debug("render... really");
				firstTime = true;
				node.li = document.createElement("li");
				node.li.ftnode = node;
				if(aria){
					// TODO: why doesn't this work:
//					node.li.role = "treeitem";
//                    $(node.li).attr("role", "treeitem")
//                    .attr("aria-labelledby", "ftal_" + node.key);
				}
				if( node.key && opts.generateIds ){
					node.li.id = opts.idPrefix + node.key;
				}
				node.span = document.createElement("span");
				node.span.className = "fancytree-node";
				if(aria){
					$(node.span).attr("aria-labelledby", "ftal_" + node.key);
				}
				node.li.appendChild(node.span);

				// Create inner HTML for the <span> (expander, checkbox, icon, and title)
				this.nodeRenderTitle(ctx);

				// Allow tweaking and binding, after node was created for the first time
				if ( opts.createNode ){
					opts.createNode.call(tree, {type: "createNode"}, ctx);
				}
			}else{
//				this.nodeRenderTitle(ctx);
				this.nodeRenderStatus(ctx);
			}
			// Allow tweaking after node state was rendered
			if ( opts.renderNode ){
				opts.renderNode.call(tree, {type: "renderNode"}, ctx);
			}
		}

		// Visit child nodes
		if( children ){
			if( isRootNode || node.expanded || deep === true ) {
				// Create a UL to hold the children
				if( !node.ul ){
					node.ul = document.createElement("ul");
					if((collapsed === true && !_recursive) || !node.expanded){
						// hide top UL, so we can use an animation to show it later
						node.ul.style.display = "none";
					}
					if(aria){
						$(node.ul).attr("role", "group");
					}
					if ( node.li ) { // issue #67
						node.li.appendChild(node.ul);
					} else {
						node.tree.$div.append(node.ul);
					}
				}
				// Add child markup
				for(i=0, l=children.length; i<l; i++) {
					subCtx = $.extend({}, ctx, {node: children[i]});
					this.nodeRender(subCtx, force, deep, false, true);
				}
				// Remove <li> if nodes have moved to another parent
				childLI = node.ul.firstChild;
				while( childLI ){
					childNode2 = childLI.ftnode;
					if( childNode2 && childNode2.parent !== node ) {
						node.debug("_fixParent: remove missing " + childNode2, childLI);
						next = childLI.nextSibling;
						childLI.parentNode.removeChild(childLI);
						childLI = next;
					}else{
						childLI = childLI.nextSibling;
					}
				}
				// Make sure, that <li> order matches node.children order.
				childLI = node.ul.firstChild;
				for(i=0, l=children.length-1; i<l; i++) {
					childNode1 = children[i];
					childNode2 = childLI.ftnode;
					if( childNode1 !== childNode2 ) {
						// node.debug("_fixOrder: mismatch at index " + i + ": " + childNode1 + " != " + childNode2);
						node.ul.insertBefore(childNode1.li, childNode2.li);
					} else {
						childLI = childLI.nextSibling;
					}
				}
			}
		}else{
			// No children: remove markup if any
			if( node.ul ){
//				alert("remove child markup for " + node);
				this.warn("remove child markup for " + node);
				this.nodeRemoveChildMarkup(ctx);
			}
		}
		if( !isRootNode ){
			// Update element classes according to node state
			// this.nodeRenderStatus(ctx);
			// Finally add the whole structure to the DOM, so the browser can render
			if(firstTime){
				parent.ul.appendChild(node.li);
			}
		}
	},
	/** Create HTML for the node's outer <span> (expander, checkbox, icon, and title).
	 *
	 * nodeRenderStatus() is implied.
	 * @param {EventData} ctx
	 * @param {string} [title] optinal new title
	 */
	nodeRenderTitle: function(ctx, title) {
		// set node connector images, links and text
		var id, iconSpanClass, nodeTitle, role, tabindex, tooltip,
			node = ctx.node,
			tree = ctx.tree,
			opts = ctx.options,
			aria = opts.aria,
			level = node.getLevel(),
			ares = [],
			iconSrc = node.data.icon;

		if(title !== undefined){
			node.title = title;
		}
		if(!node.span){
			// Silently bail out if node was not rendered yet, assuming
			// node.render() will be called as the node becomes visible
			return;
		}
		// connector (expanded, expandable or simple)
		// TODO: optimize this if clause
		if( level < opts.minExpandLevel ) {
			if( !node.lazy ) {
				node.expanded = true;
			}
			if(level > 1){
				if(aria){
					ares.push("<span role='button' class='fancytree-expander fancytree-expander-fixed'></span>");
				}else{
					ares.push("<span class='fancytree-expander fancytree-expander-fixed''></span>");
				}
			}
			// .. else (i.e. for root level) skip expander/connector alltogether
		} else {
			if(aria){
				ares.push("<span role='button' class='fancytree-expander'></span>");
			}else{
				ares.push("<span class='fancytree-expander'></span>");
			}
		}
		// Checkbox mode
		if( opts.checkbox && node.hideCheckbox !== true && !node.isStatusNode() ) {
			if(aria){
				ares.push("<span role='checkbox' class='fancytree-checkbox'></span>");
			}else{
				ares.push("<span class='fancytree-checkbox'></span>");
			}
		}
		// folder or doctype icon
		role = aria ? " role='img'" : "";
		if( iconSrc === true || (iconSrc !== false && opts.icons !== false) ) {
			// opts.icons defines the default behavior, node.icon == true/false can override this
			if ( iconSrc && typeof iconSrc === "string" ) {
				// node.icon is an image url
				iconSrc = (iconSrc.charAt(0) === "/") ? iconSrc : ((opts.imagePath || "") + iconSrc);
				ares.push("<img src='" + iconSrc + "' class='fancytree-icon' alt='' />");
			} else {
				// See if node.iconClass or opts.iconClass() define a class name
				iconSpanClass = (opts.iconClass && opts.iconClass.call(tree, node, ctx)) || node.data.iconclass || null;
				if( iconSpanClass ) {
					ares.push("<span " + role + " class='fancytree-custom-icon " + iconSpanClass +  "'></span>");
				} else {
					ares.push("<span " + role + " class='fancytree-icon'></span>");
				}
			}
		}

		// node title
		nodeTitle = "";
		if ( opts.renderTitle ){
			nodeTitle = opts.renderTitle.call(tree, {type: "renderTitle"}, ctx) || "";
		}
		if(!nodeTitle){
			tooltip = node.tooltip ? " title='" + FT.escapeHtml(node.tooltip) + "'" : "";
			id = aria ? " id='ftal_" + node.key + "'" : "";
			role = aria ? " role='treeitem'" : "";
			tabindex = opts.titlesTabbable ? " tabindex='0'" : "";

			nodeTitle = "<span " + role + " class='fancytree-title'" + id + tooltip + tabindex + ">" + node.title + "</span>";
		}
		ares.push(nodeTitle);
		// Note: this will trigger focusout, if node had the focus
		//$(node.span).html(ares.join("")); // it will cleanup the jQuery data currently associated with SPAN (if any), but it executes more slowly
		node.span.innerHTML = ares.join("");
		// Update CSS classes
		this.nodeRenderStatus(ctx);
	},
	/** Update element classes according to node state.
	 * @param {EventData} ctx
	 */
	nodeRenderStatus: function(ctx) {
		// Set classes for current status
		var node = ctx.node,
			tree = ctx.tree,
			opts = ctx.options,
//			nodeContainer = node[tree.nodeContainerAttrName],
			hasChildren = node.hasChildren(),
			isLastSib = node.isLastSibling(),
			aria = opts.aria,
//            $ariaElem = aria ? $(node[tree.ariaPropName]) : null,
			$ariaElem = $(node.span).find(".fancytree-title"),
			cn = opts._classNames,
			cnList = [],
			statusElem = node[tree.statusClassPropName];

		if( !statusElem ){
			// if this function is called for an unrendered node, ignore it (will be updated on nect render anyway)
			return;
		}
		// Build a list of class names that we will add to the node <span>
		cnList.push(cn.node);
		if( tree.activeNode === node ){
			cnList.push(cn.active);
//			$(">span.fancytree-title", statusElem).attr("tabindex", "0");
//			tree.$container.removeAttr("tabindex");
		// }else{
//			$(">span.fancytree-title", statusElem).removeAttr("tabindex");
//			tree.$container.attr("tabindex", "0");
		}
		if( tree.focusNode === node ){
			cnList.push(cn.focused);
			if(aria){
//              $(">span.fancytree-title", statusElem).attr("tabindex", "0");
//                $(">span.fancytree-title", statusElem).attr("tabindex", "-1");
				// TODO: is this the right element for this attribute?
				$ariaElem
					.attr("aria-activedescendant", true);
//					.attr("tabindex", "-1");
			}
		}else if(aria){
//			$(">span.fancytree-title", statusElem).attr("tabindex", "-1");
			$ariaElem
				.removeAttr("aria-activedescendant");
//				.removeAttr("tabindex");
		}
		if( node.expanded ){
			cnList.push(cn.expanded);
			if(aria){
				$ariaElem.attr("aria-expanded", true);
			}
		}else if(aria){
			$ariaElem.removeAttr("aria-expanded");
		}
		if( node.folder ){
			cnList.push(cn.folder);
		}
		if( hasChildren !== false ){
			cnList.push(cn.hasChildren);
		}
		// TODO: required?
		if( isLastSib ){
			cnList.push(cn.lastsib);
		}
		if( node.lazy && node.children == null ){
			cnList.push(cn.lazy);
		}
		if( node.partsel ){
			cnList.push(cn.partsel);
		}
		if( node.unselectable ){
			cnList.push(cn.unselectable);
		}
		if( node._isLoading ){
			cnList.push(cn.loading);
		}
		if( node._error ){
			cnList.push(cn.error);
		}
		if( node.selected ){
			cnList.push(cn.selected);
			if(aria){
				$ariaElem.attr("aria-selected", true);
			}
		}else if(aria){
			$ariaElem.attr("aria-selected", false);
		}
		if( node.extraClasses ){
			cnList.push(node.extraClasses);
		}
		// IE6 doesn't correctly evaluate multiple class names,
		// so we create combined class names that can be used in the CSS
		if( hasChildren === false ){
			cnList.push(cn.combinedExpanderPrefix + "n" +
					(isLastSib ? "l" : "")
					);
		}else{
			cnList.push(cn.combinedExpanderPrefix +
					(node.expanded ? "e" : "c") +
					(node.lazy && node.children == null ? "d" : "") +
					(isLastSib ? "l" : "")
					);
		}
		cnList.push(cn.combinedIconPrefix +
				(node.expanded ? "e" : "c") +
				(node.folder ? "f" : "")
				);
//        node.span.className = cnList.join(" ");
		statusElem.className = cnList.join(" ");

		// TODO: we should not set this in the <span> tag also, if we set it here:
		// Maybe most (all) of the classes should be set in LI instead of SPAN?
		if(node.li){
			node.li.className = isLastSib ? cn.lastsib : "";
		}
	},
	/** Activate node.
	 * flag defaults to true.
	 * If flag is true, the node is activated (must be a synchronous operation)
	 * If flag is false, the node is deactivated (must be a synchronous operation)
	 * @param {EventData} ctx
	 * @param {boolean} [flag=true]
	 * @param {object} [opts] additional options. Defaults to {noEvents: false, noFocus: false}
	 * @returns {$.Promise}
	 */
	nodeSetActive: function(ctx, flag, callOpts) {
		// Handle user click / [space] / [enter], according to clickFolderMode.
		callOpts = callOpts || {};
		var subCtx,
			node = ctx.node,
			tree = ctx.tree,
			opts = ctx.options,
			noEvents = (callOpts.noEvents === true),
			noFocus = (callOpts.noFocus === true),
			isActive = (node === tree.activeNode);

		// flag defaults to true
		flag = (flag !== false);
		// node.debug("nodeSetActive", flag);

		if(isActive === flag){
			// Nothing to do
			return _getResolvedPromise(node);
		}else if(flag && !noEvents && this._triggerNodeEvent("beforeActivate", node, ctx.originalEvent) === false ){
			// Callback returned false
			return _getRejectedPromise(node, ["rejected"]);
		}
		if(flag){
			if(tree.activeNode){
				_assert(tree.activeNode !== node, "node was active (inconsistency)");
				subCtx = $.extend({}, ctx, {node: tree.activeNode});
				tree.nodeSetActive(subCtx, false);
				_assert(tree.activeNode === null, "deactivate was out of sync?");
			}
			if(opts.activeVisible){
				// tree.nodeMakeVisible(ctx);
				node.makeVisible({scrollIntoView: false}); // nodeSetFocus will scroll
			}
			tree.activeNode = node;
			tree.nodeRenderStatus(ctx);
			if( !noFocus ) {
				tree.nodeSetFocus(ctx);
			}
			if( !noEvents ) {
				tree._triggerNodeEvent("activate", node, ctx.originalEvent);
			}
		}else{
			_assert(tree.activeNode === node, "node was not active (inconsistency)");
			tree.activeNode = null;
			this.nodeRenderStatus(ctx);
			if( !noEvents ) {
				ctx.tree._triggerNodeEvent("deactivate", node, ctx.originalEvent);
			}
		}
	},
	/** Expand or collapse node, return Deferred.promise.
	 *
	 * @param {EventData} ctx
	 * @param {boolean} [flag=true]
	 * @param {object} [opts] additional options. Defaults to {noAnimation: false, noEvents: false}
	 * @returns {$.Promise} The deferred will be resolved as soon as the (lazy)
	 *     data was retrieved, rendered, and the expand animation finshed.
	 */
	nodeSetExpanded: function(ctx, flag, callOpts) {
		callOpts = callOpts || {};
		var _afterLoad, dfd, i, l, parents, prevAC,
			node = ctx.node,
			tree = ctx.tree,
			opts = ctx.options,
			noAnimation = (callOpts.noAnimation === true),
			noEvents = (callOpts.noEvents === true);

		// flag defaults to true
		flag = (flag !== false);

		// node.debug("nodeSetExpanded(" + flag + ")");

		if((node.expanded && flag) || (!node.expanded && !flag)){
			// Nothing to do
			// node.debug("nodeSetExpanded(" + flag + "): nothing to do");
			return _getResolvedPromise(node);
		}else if(flag && !node.lazy && !node.hasChildren() ){
			// Prevent expanding of empty nodes
			// return _getRejectedPromise(node, ["empty"]);
			return _getResolvedPromise(node);
		}else if( !flag && node.getLevel() < opts.minExpandLevel ) {
			// Prevent collapsing locked levels
			return _getRejectedPromise(node, ["locked"]);
		}else if ( !noEvents && this._triggerNodeEvent("beforeExpand", node, ctx.originalEvent) === false ){
			// Callback returned false
			return _getRejectedPromise(node, ["rejected"]);
		}
		// If this node inside a collpased node, no animation and scrolling is needed
		if( !noAnimation && !node.isVisible() ) {
			noAnimation = callOpts.noAnimation = true;
		}

		dfd = new $.Deferred();

		// Auto-collapse mode: collapse all siblings
		if( flag && !node.expanded && opts.autoCollapse ) {
			parents = node.getParentList(false, true);
			prevAC = opts.autoCollapse;
			try{
				opts.autoCollapse = false;
				for(i=0, l=parents.length; i<l; i++){
					// TODO: should return promise?
					this._callHook("nodeCollapseSiblings", parents[i], callOpts);
				}
			}finally{
				opts.autoCollapse = prevAC;
			}
		}
		// Trigger expand/collapse after expanding
		dfd.done(function(){
			if( flag && opts.autoScroll && !noAnimation ) {
				// Scroll down to last child, but keep current node visible
				node.getLastChild().scrollIntoView(true, {topNode: node}).always(function(){
					if( !noEvents ) {
						ctx.tree._triggerNodeEvent(flag ? "expand" : "collapse", ctx);
					}
				});
			} else {
				if( !noEvents ) {
					ctx.tree._triggerNodeEvent(flag ? "expand" : "collapse", ctx);
				}
			}
		});
		// vvv Code below is executed after loading finished:
		_afterLoad = function(callback){
			var isVisible, isExpanded,
				effect = opts.toggleEffect;

			node.expanded = flag;
			// Create required markup, but make sure the top UL is hidden, so we
			// can animate later
			tree._callHook("nodeRender", ctx, false, false, true);

			// If the currently active node is now hidden, deactivate it
			// if( opts.activeVisible && this.activeNode && ! this.activeNode.isVisible() ) {
			//     this.activeNode.deactivate();
			// }

			// Expanding a lazy node: set 'loading...' and call callback
			// if( bExpand && this.data.isLazy && this.childList === null && !this._isLoading ) {
			//     this._loadContent();
			//     return;
			// }
			// Hide children, if node is collapsed
			if( node.ul ) {
				isVisible = (node.ul.style.display !== "none");
				isExpanded = !!node.expanded;
				if ( isVisible === isExpanded ) {
					node.warn("nodeSetExpanded: UL.style.display already set");

				} else if ( !effect || noAnimation ) {
					node.ul.style.display = ( node.expanded || !parent ) ? "" : "none";

				} else {
					// The UI toggle() effect works with the ext-wide extension,
					// while jQuery.animate() has problems when the title span
					// has positon: absolute

					// duration = opts.fx.duration || 200;
					// easing = opts.fx.easing;
					// $(node.ul).animate(opts.fx, duration, easing, function(){

					// node.debug("nodeSetExpanded: animate start...");
					$(node.ul).toggle(effect.effect, effect.options, effect.duration, function(){
						// node.debug("nodeSetExpanded: animate done");
						callback();
					});
					return;
				}
			}
			callback();
		};
		// ^^^ Code above is executed after loading finshed.

		// Load lazy nodes, if any. Then continue with _afterLoad()
		if(flag && node.lazy && node.hasChildren() === undefined){
			// node.debug("nodeSetExpanded: load start...");
			node.load().done(function(){
				// node.debug("nodeSetExpanded: load done");
				if(dfd.notifyWith){ // requires jQuery 1.6+
					dfd.notifyWith(node, ["loaded"]);
				}
				_afterLoad(function () { dfd.resolveWith(node); });
			}).fail(function(errMsg){
				_afterLoad(function () { dfd.rejectWith(node, ["load failed (" + errMsg + ")"]); });
			});
/*
			var source = tree._triggerNodeEvent("lazyLoad", node, ctx.originalEvent);
			_assert(typeof source !== "boolean", "lazyLoad event must return source in data.result");
			node.debug("nodeSetExpanded: load start...");
			this._callHook("nodeLoadChildren", ctx, source).done(function(){
				node.debug("nodeSetExpanded: load done");
				if(dfd.notifyWith){ // requires jQuery 1.6+
					dfd.notifyWith(node, ["loaded"]);
				}
				_afterLoad.call(tree);
			}).fail(function(errMsg){
				dfd.rejectWith(node, ["load failed (" + errMsg + ")"]);
			});
*/
		}else{
			_afterLoad(function () { dfd.resolveWith(node); });
		}
		// node.debug("nodeSetExpanded: returns");
		return dfd.promise();
	},
	/** Focus or blur this node.
	 * @param {EventData} ctx
	 * @param {boolean} [flag=true]
	 */
	nodeSetFocus: function(ctx, flag) {
		// ctx.node.debug("nodeSetFocus(" + flag + ")");
		var ctx2,
			tree = ctx.tree,
			node = ctx.node;

		flag = (flag !== false);

		// Blur previous node if any
		if(tree.focusNode){
			if(tree.focusNode === node && flag){
				// node.debug("nodeSetFocus(" + flag + "): nothing to do");
				return;
			}
			ctx2 = $.extend({}, ctx, {node: tree.focusNode});
			tree.focusNode = null;
			this._triggerNodeEvent("blur", ctx2);
			this._callHook("nodeRenderStatus", ctx2);
		}
		// Set focus to container and node
		if(flag){
			if( !this.hasFocus() ){
				node.debug("nodeSetFocus: forcing container focus");
				this._callHook("treeSetFocus", ctx, true, {calledByNode: true});
			}
			node.makeVisible({scrollIntoView: false});
			tree.focusNode = node;
//			node.debug("FOCUS...");
//			$(node.span).find(".fancytree-title").focus();
			this._triggerNodeEvent("focus", ctx);
//          if(ctx.options.autoActivate){
//              tree.nodeSetActive(ctx, true);
//          }
			if(ctx.options.autoScroll){
				node.scrollIntoView();
			}
			this._callHook("nodeRenderStatus", ctx);
		}
	},
	/** (De)Select node, return new status (sync).
	 *
	 * @param {EventData} ctx
	 * @param {boolean} [flag=true]
	 */
	nodeSetSelected: function(ctx, flag) {
		var node = ctx.node,
			tree = ctx.tree,
			opts = ctx.options;
		// flag defaults to true
		flag = (flag !== false);

		node.debug("nodeSetSelected(" + flag + ")", ctx);
		if( node.unselectable){
			return;
		}
		// TODO: !!node.expanded is nicer, but doesn't pass jshint
		// https://github.com/jshint/jshint/issues/455
//        if( !!node.expanded === !!flag){
		if((node.selected && flag) || (!node.selected && !flag)){
			return !!node.selected;
		}else if ( this._triggerNodeEvent("beforeSelect", node, ctx.originalEvent) === false ){
			return !!node.selected;
		}
		if(flag && opts.selectMode === 1){
			// single selection mode
			if(tree.lastSelectedNode){
				tree.lastSelectedNode.setSelected(false);
			}
		}else if(opts.selectMode === 3){
			// multi.hier selection mode
			node.selected = flag;
//			this._fixSelectionState(node);
			node.fixSelection3AfterClick();
		}
		node.selected = flag;
		this.nodeRenderStatus(ctx);
		tree.lastSelectedNode = flag ? node : null;
		tree._triggerNodeEvent("select", ctx);
	},
	/** Show node status (ok, loading, error) using styles and a dummy child node.
	 *
	 * @param {EventData} ctx
	 * @param status
	 * @param message
	 * @param details
	 */
	nodeSetStatus: function(ctx, status, message, details) {
		var node = ctx.node,
			tree = ctx.tree;
			// cn = ctx.options._classNames;

		function _clearStatusNode() {
			// Remove dedicated dummy node, if any
			var firstChild = ( node.children ? node.children[0] : null );
			if ( firstChild && firstChild.isStatusNode() ) {
				try{
					// I've seen exceptions here with loadKeyPath...
					if(node.ul){
						node.ul.removeChild(firstChild.li);
						firstChild.li = null; // avoid leaks (DT issue 215)
					}
				}catch(e){}
				if( node.children.length === 1 ){
					node.children = [];
				}else{
					node.children.shift();
				}
			}
		}
		function _setStatusNode(data, type) {
			// Create/modify the dedicated dummy node for 'loading...' or
			// 'error!' status. (only called for direct child of the invisible
			// system root)
			var firstChild = ( node.children ? node.children[0] : null );
			if ( firstChild && firstChild.isStatusNode() ) {
				$.extend(firstChild, data);
				// tree._callHook("nodeRender", firstChild);
				tree._callHook("nodeRenderTitle", firstChild);
			} else {
				data.key = "_statusNode";
				node._setChildren([data]);
				node.children[0].statusNodeType = type;
				tree.render();
			}
			return node.children[0];
		}

		switch( status ){
		case "ok":
			_clearStatusNode();
			// $(node.span).removeClass(cn.loading).removeClass(cn.error);
			node._isLoading = false;
			node._error = null;
			node.renderStatus();
			break;
		case "loading":
			// $(node.span).removeClass(cn.error).addClass(cn.loading);
			if( !node.parent ) {
				_setStatusNode({
					title: tree.options.strings.loading + (message ? " (" + message + ") " : ""),
					tooltip: details,
					extraClasses: "fancytree-statusnode-wait"
				}, status);
			}
			node._isLoading = true;
			node._error = null;
			node.renderStatus();
			break;
		case "error":
			// $(node.span).removeClass(cn.loading).addClass(cn.error);
			_setStatusNode({
				title: tree.options.strings.loadError + (message ? " (" + message + ") " : ""),
				tooltip: details,
				extraClasses: "fancytree-statusnode-error"
			}, status);
			node._isLoading = false;
			node._error = { message: message, details: details };
			node.renderStatus();
			break;
		default:
			$.error("invalid node status " + status);
		}
	},
	/**
	 *
	 * @param {EventData} ctx
	 */
	nodeToggleExpanded: function(ctx) {
		return this.nodeSetExpanded(ctx, !ctx.node.expanded);
	},
	/**
	 * @param {EventData} ctx
	 */
	nodeToggleSelected: function(ctx) {
		return this.nodeSetSelected(ctx, !ctx.node.selected);
	},
	/** Remove all nodes.
	 * @param {EventData} ctx
	 */
	treeClear: function(ctx) {
		var tree = ctx.tree;
		tree.activeNode = null;
		tree.focusNode = null;
		tree.$div.find(">ul.fancytree-container").empty();
		// TODO: call destructors and remove reference loops
		tree.rootNode.children = null;
	},
	/** Widget was created (called only once, even it re-initialized).
	 * @param {EventData} ctx
	 */
	treeCreate: function(ctx) {
	},
	/** Widget was destroyed.
	 * @param {EventData} ctx
	 */
	treeDestroy: function(ctx) {
	},
	/** Widget was (re-)initialized.
	 * @param {EventData} ctx
	 */
	treeInit: function(ctx) {
		//this.debug("Fancytree.treeInit()");
		this.treeLoad(ctx);
	},
	/** Parse Fancytree from source, as configured in the options.
	 * @param {EventData} ctx
	 * @param {object} [source] optional new source (use last data otherwise)
	 */
	treeLoad: function(ctx, source) {
		var type, $ul,
			tree = ctx.tree,
			$container = ctx.widget.element,
			dfd,
			// calling context for root node
			rootCtx = $.extend({}, ctx, {node: this.rootNode});

		if(tree.rootNode.children){
			this.treeClear(ctx);
		}
		source = source || this.options.source;

		if(!source){
			type = $container.data("type") || "html";
			switch(type){
			case "html":
				$ul = $container.find(">ul:first");
				$ul.addClass("ui-fancytree-source ui-helper-hidden");
				source = $.ui.fancytree.parseHtml($ul);
				// allow to init tree.data.foo from <ul data-foo=''>
				this.data = $.extend(this.data, _getElementDataAsDict($ul));
				break;
			case "json":
	//            $().addClass("ui-helper-hidden");
				source = $.parseJSON($container.text());
				if(source.children){
					if(source.title){tree.title = source.title;}
					source = source.children;
				}
				break;
			default:
				$.error("Invalid data-type: " + type);
			}
		}else if(typeof source === "string"){
			// TODO: source is an element ID
			$.error("Not implemented");
		}

		// $container.addClass("ui-widget ui-widget-content ui-corner-all");
		// Trigger fancytreeinit after nodes have been loaded
		dfd = this.nodeLoadChildren(rootCtx, source).done(function(){
			tree.render();
			if( ctx.options.selectMode === 3 ){
				tree.rootNode.fixSelection3FromEndNodes();
			}
			tree._triggerTreeEvent("init", null, { status: true });
		}).fail(function(){
			tree.render();
			tree._triggerTreeEvent("init", null, { status: false });
		});
		return dfd;
	},
	/** Node was inserted into or removed from the tree.
	 * @param {EventData} ctx
	 * @param {boolean} add
	 * @param {FancytreeNode} node
	 */
	treeRegisterNode: function(ctx, add, node) {
	},
	/** Widget got focus.
	 * @param {EventData} ctx
	 * @param {boolean} [flag=true]
	 */
	treeSetFocus: function(ctx, flag, callOpts) {
		flag = (flag !== false);

		// this.debug("treeSetFocus(" + flag + "), callOpts: " + callOpts);
		// this.debug("    focusNode: " + this.focusNode);
		// this.debug("    activeNode: " + this.activeNode);
		if( flag !== this.hasFocus() ){
			this._hasFocus = flag;
			if( !flag && this.focusNode ) {
				// Node also looses focus if widget blurs
				this.focusNode.setFocus(false);
			}
			this.$container.toggleClass("fancytree-treefocus", flag);
			this._triggerTreeEvent(flag ? "focusTree" : "blurTree");
		}
	}
});


/* ******************************************************************************
 * jQuery UI widget boilerplate
 */

/**
 * The plugin (derrived from <a href=" http://api.jqueryui.com/jQuery.widget/">jQuery.Widget</a>).<br>
 * This constructor is not called directly. Use `$(selector).fancytree({})`
 * to initialize the plugin instead.<br>
 * <pre class="sh_javascript sunlight-highlight-javascript">// Access widget methods and members:
 * var tree = $("#tree").fancytree("getTree");
 * var node = $("#tree").fancytree("getActiveNode", "1234");
 * </pre>
 *
 * @mixin Fancytree_Widget
 */

$.widget("ui.fancytree",
	/** @lends Fancytree_Widget# */
	{
	/**These options will be used as defaults
	 * @type {FancytreeOptions}
	 */
	options:
	{
		activeVisible: true,
		ajax: {
			type: "GET",
			cache: false, // false: Append random '_' argument to the request url to prevent caching.
//          timeout: 0, // >0: Make sure we get an ajax error if server is unreachable
			dataType: "json" // Expect json format and pass json object to callbacks.
		},  //
		aria: false, // TODO: default to true
		autoActivate: true,
		autoCollapse: false,
//      autoFocus: false,
		autoScroll: false,
		checkbox: false,
		/**defines click behavior*/
		clickFolderMode: 4,
		debugLevel: null, // 0..2 (null: use global setting $.ui.fancytree.debugInfo)
		disabled: false, // TODO: required anymore?
		enableAspx: true, // TODO: document
		extensions: [],
		// fx: { height: "toggle", duration: 200 },
		// toggleEffect: { effect: "drop", options: {direction: "left"}, duration: 200 },
		// toggleEffect: { effect: "slide", options: {direction: "up"}, duration: 200 },
		toggleEffect: { effect: "blind", options: {direction: "vertical", scale: "box"}, duration: 200 },
		generateIds: false,
		icons: true,
		idPrefix: "ft_",
		focusOnSelect: false,
		keyboard: true,
		keyPathSeparator: "/",
		minExpandLevel: 1,
		quicksearch: false,
		scrollOfs: {top: 0, bottom: 0},
		scrollParent: null,
		selectMode: 2,
		strings: {
			loading: "Loading&#8230;",
			loadError: "Load error!"
		},
		tabbable: true,
		titlesTabbable: false,
		_classNames: {
			node: "fancytree-node",
			folder: "fancytree-folder",
			combinedExpanderPrefix: "fancytree-exp-",
			combinedIconPrefix: "fancytree-ico-",
			hasChildren: "fancytree-has-children",
			active: "fancytree-active",
			selected: "fancytree-selected",
			expanded: "fancytree-expanded",
			lazy: "fancytree-lazy",
			focused: "fancytree-focused",
			partsel: "fancytree-partsel",
			unselectable: "fancytree-unselectable",
			lastsib: "fancytree-lastsib",
			loading: "fancytree-loading",
			error: "fancytree-error"
		},
		// events
		lazyLoad: null,
		postProcess: null
	},
	/* Set up the widget, Called on first $().fancytree() */
	_create: function() {
		this.tree = new Fancytree(this);

		this.$source = this.source || this.element.data("type") === "json" ? this.element
			: this.element.find(">ul:first");
		// Subclass Fancytree instance with all enabled extensions
		var extension, extName, i,
			extensions = this.options.extensions,
			base = this.tree;

		for(i=0; i<extensions.length; i++){
			extName = extensions[i];
			extension = $.ui.fancytree._extensions[extName];
			if(!extension){
				$.error("Could not apply extension '" + extName + "' (it is not registered, did you forget to include it?)");
			}
			// Add extension options as tree.options.EXTENSION
//			_assert(!this.tree.options[extName], "Extension name must not exist as option name: " + extName);
			this.tree.options[extName] = $.extend(true, {}, extension.options, this.tree.options[extName]);
			// Add a namespace tree.ext.EXTENSION, to hold instance data
			_assert(this.tree.ext[extName] === undefined, "Extension name must not exist as Fancytree.ext attribute: '" + extName + "'");
//			this.tree[extName] = extension;
			this.tree.ext[extName] = {};
			// Subclass Fancytree methods using proxies.
			_subclassObject(this.tree, base, extension, extName);
			// current extension becomes base for the next extension
			base = extension;
		}
		//
		this.tree._callHook("treeCreate", this.tree);
		// Note: 'fancytreecreate' event is fired by widget base class
//        this.tree._triggerTreeEvent("create");
	},

	/* Called on every $().fancytree() */
	_init: function() {
		this.tree._callHook("treeInit", this.tree);
		// TODO: currently we call bind after treeInit, because treeInit
		// might change tree.$container.
		// It would be better, to move ebent binding into hooks altogether
		this._bind();
	},

	/* Use the _setOption method to respond to changes to options */
	_setOption: function(key, value) {
		var callDefault = true,
			rerender = false;
		switch( key ) {
		case "aria":
		case "checkbox":
		case "icons":
		case "minExpandLevel":
		case "tabbable":
//		case "nolink":
			this.tree._callHook("treeCreate", this.tree);
			rerender = true;
			break;
		case "source":
			callDefault = false;
			this.tree._callHook("treeLoad", this.tree, value);
			break;
		}
		this.tree.debug("set option " + key + "=" + value + " <" + typeof(value) + ">");
		if(callDefault){
			// In jQuery UI 1.8, you have to manually invoke the _setOption method from the base widget
			$.Widget.prototype._setOption.apply(this, arguments);
			// TODO: In jQuery UI 1.9 and above, you use the _super method instead
//          this._super( "_setOption", key, value );
		}
		if(rerender){
			this.tree.render(true, false);  // force, not-deep
		}
	},

	/** Use the destroy method to clean up any modifications your widget has made to the DOM */
	destroy: function() {
		this._unbind();
		this.tree._callHook("treeDestroy", this.tree);
		// this.element.removeClass("ui-widget ui-widget-content ui-corner-all");
		this.tree.$div.find(">ul.fancytree-container").remove();
		this.$source && this.$source.removeClass("ui-helper-hidden");
		// In jQuery UI 1.8, you must invoke the destroy method from the base widget
		$.Widget.prototype.destroy.call(this);
		// TODO: delete tree and nodes to make garbage collect easier?
		// TODO: In jQuery UI 1.9 and above, you would define _destroy instead of destroy and not call the base method
	},

	// -------------------------------------------------------------------------

	/* Remove all event handlers for our namespace */
	_unbind: function() {
		var ns = this.tree._ns;
		this.element.unbind(ns);
		this.tree.$container.unbind(ns);
		$(document).unbind(ns);
	},
	/* Add mouse and kyboard handlers to the container */
	_bind: function() {
		var that = this,
			opts = this.options,
			tree = this.tree,
			ns = tree._ns
			// selstartEvent = ( $.support.selectstart ? "selectstart" : "mousedown" )
			;

		// Remove all previuous handlers for this tree
		this._unbind();

		//alert("keydown" + ns + "foc=" + tree.hasFocus() + tree.$container);
		// tree.debug("bind events; container: ", tree.$container);
		tree.$container.on("focusin" + ns + " focusout" + ns, function(event){
			var node = FT.getNode(event),
				flag = (event.type === "focusin");
			// tree.debug("Tree container got event " + event.type, node, event);
			// tree.treeOnFocusInOut.call(tree, event);
			if(node){
				// For example clicking into an <input> that is part of a node
				tree._callHook("nodeSetFocus", node, flag);
			}else{
				tree._callHook("treeSetFocus", tree, flag);
			}
		}).on("selectstart" + ns, "span.fancytree-title", function(event){
			// prevent mouse-drags to select text ranges
			// tree.debug("<span title> got event " + event.type);
			event.preventDefault();
		}).on("keydown" + ns, function(event){
			// TODO: also bind keyup and keypress
			// tree.debug("got event " + event.type + ", hasFocus:" + tree.hasFocus());
			// if(opts.disabled || opts.keyboard === false || !tree.hasFocus() ){
			if(opts.disabled || opts.keyboard === false ){
				return true;
			}
			var res,
				node = tree.focusNode, // node may be null
				ctx = tree._makeHookContext(node || tree, event),
				prevPhase = tree.phase;

			try {
				tree.phase = "userEvent";
				// If a 'fancytreekeydown' handler returns false, skip the default
				// handling (implemented by tree.nodeKeydown()).
				if(node){
					res = tree._triggerNodeEvent("keydown", node, event);
				}else{
					res = tree._triggerTreeEvent("keydown", event);
				}
				if ( res === "preventNav" ){
					res = true; // prevent keyboard navigation, but don't prevent default handling of embedded input controls
				} else if ( res !== false ){
					res = tree._callHook("nodeKeydown", ctx);
				}
				return res;
			} finally {
				tree.phase = prevPhase;
			}
		}).on("click" + ns + " dblclick" + ns, function(event){
			if(opts.disabled){
				return true;
			}
			var ctx,
				et = FT.getEventTarget(event),
				node = et.node,
				tree = that.tree,
				prevPhase = tree.phase;

			if( !node ){
				return true;  // Allow bubbling of other events
			}
			ctx = tree._makeHookContext(node, event);
//			that.tree.debug("event(" + event.type + "): node: ", node);
			try {
				tree.phase = "userEvent";
				switch(event.type) {
				case "click":
					ctx.targetType = et.type;
					return ( tree._triggerNodeEvent("click", ctx, event) === false ) ? false : tree._callHook("nodeClick", ctx);
				case "dblclick":
					ctx.targetType = et.type;
					return ( tree._triggerNodeEvent("dblclick", ctx, event) === false ) ? false : tree._callHook("nodeDblclick", ctx);
				}
//             } catch(e) {
// //                var _ = null; // DT issue 117 // TODO
//                 $.error(e);
			} finally {
				tree.phase = prevPhase;
			}
		});
	},
	/** Return the active node or null.
	 * @returns {FancytreeNode}
	 */
	getActiveNode: function() {
		return this.tree.activeNode;
	},
	/** Return the matching node or null.
	 * @param {string} key
	 * @returns {FancytreeNode}
	 */
	getNodeByKey: function(key) {
		return this.tree.getNodeByKey(key);
	},
	/** Return the invisible system root node.
	 * @returns {FancytreeNode}
	 */
	getRootNode: function() {
		return this.tree.rootNode;
	},
	/** Return the current tree instance.
	 * @returns {Fancytree}
	 */
	getTree: function() {
		return this.tree;
	}
});

// $.ui.fancytree was created by the widget factory. Create a local shortcut:
FT = $.ui.fancytree;

/**
 * Static members in the `$.ui.fancytree` namespace.<br>
 * <br>
 * <pre class="sh_javascript sunlight-highlight-javascript">// Access static members:
 * var node = $.ui.fancytree.getNode(element);
 * alert($.ui.fancytree.version);
 * </pre>
 *
 * @mixin Fancytree_Static
 */
$.extend($.ui.fancytree,
	/** @lends Fancytree_Static# */
	{
	/** @type {string} */
	version: "2.8.1",      // Set to semver by 'grunt release'
	/** @type {string} */
	buildType: "production", // Set to 'production' by 'grunt build'
	/** @type {int} */
	debugLevel: 1,            // Set to 1 by 'grunt build'
							  // Used by $.ui.fancytree.debug() and as default for tree.options.debugLevel

	_nextId: 1,
	_nextNodeKey: 1,
	_extensions: {},
	// focusTree: null,

	/** Expose class object as $.ui.fancytree._FancytreeClass */
	_FancytreeClass: Fancytree,
	/** Expose class object as $.ui.fancytree._FancytreeNodeClass */
	_FancytreeNodeClass: FancytreeNode,
	/* Feature checks to provide backwards compatibility */
	jquerySupports: {
		// http://jqueryui.com/upgrade-guide/1.9/#deprecated-offset-option-merged-into-my-and-at
		positionMyOfs: isVersionAtLeast($.ui.version, 1, 9)
		},
	/** Throw an error if condition fails (debug method).
	 * @param {boolean} cond
	 * @param {string} msg
	 */
	assert: function(cond, msg){
		return _assert(cond, msg);
	},
	/** Return a function that executes *fn* at most every *timeout* ms.
	 * @param {integer} timeout
	 * @param {function} fn
	 * @param {boolean} [invokeAsap=false]
	 * @param {any} [ctx]
	 */
	debounce: function(timeout, fn, invokeAsap, ctx) {
		var timer;
		if(arguments.length === 3 && typeof invokeAsap !== "boolean") {
			ctx = invokeAsap;
			invokeAsap = false;
		}
		return function() {
			var args = arguments;
			ctx = ctx || this;
			invokeAsap && !timer && fn.apply(ctx, args);
			clearTimeout(timer);
			timer = setTimeout(function() {
				invokeAsap || fn.apply(ctx, args);
				timer = null;
			}, timeout);
		};
	},
	/** Write message to console if debugLevel >= 2
	 * @param {string} msg
	 */
	debug: function(msg){
		/*jshint expr:true */
		($.ui.fancytree.debugLevel >= 2) && consoleApply("log", arguments);
	},
	/** Write error message to console.
	 * @param {string} msg
	 */
	error: function(msg){
		consoleApply("error", arguments);
	},
	/** Convert &lt;, &gt;, &amp;, &quot;, &#39;, &#x2F; to the equivalent entitites.
	 *
	 * @param {string} s
	 * @returns {string}
	 */
	escapeHtml: function(s){
		return ("" + s).replace(/[&<>"'\/]/g, function (s) {
			return ENTITY_MAP[s];
		});
	},
	/** Make jQuery.position() arguments backwards compatible, i.e. if
	 * jQuery UI version <= 1.8, convert
	 *   { my: "left+3 center", at: "left bottom", of: $target }
	 * to
	 *   { my: "left center", at: "left bottom", of: $target, offset: "3  0" }
	 *
	 * See http://jqueryui.com/upgrade-guide/1.9/#deprecated-offset-option-merged-into-my-and-at
	 * and http://jsfiddle.net/mar10/6xtu9a4e/
	 */
	fixPositionOptions: function(opts) {
		if( opts.offset || ("" + opts.my + opts.at ).indexOf("%") >= 0 ) {
		   $.error("expected new position syntax (but '%' is not supported)");
		}
		if( ! $.ui.fancytree.jquerySupports.positionMyOfs ) {
			var // parse 'left+3 center' into ['left+3 center', 'left', '+3', 'center', undefined]
				myParts = /(\w+)([+-]?\d+)?\s+(\w+)([+-]?\d+)?/.exec(opts.my),
				atParts = /(\w+)([+-]?\d+)?\s+(\w+)([+-]?\d+)?/.exec(opts.at),
				// convert to numbers
				dx = (myParts[2] ? (+myParts[2]) : 0) + (atParts[2] ? (+atParts[2]) : 0),
				dy = (myParts[4] ? (+myParts[4]) : 0) + (atParts[4] ? (+atParts[4]) : 0);

			opts = $.extend({}, opts, { // make a copy and overwrite
				my: myParts[1] + " " + myParts[3],
				at: atParts[1] + " " + atParts[3]
			});
			if( dx || dy ) {
				opts.offset = "" + dx + " " + dy;
			}
		}
		return opts;
	},
	/** Return a {node: FancytreeNode, type: TYPE} object for a mouse event.
	 *
	 * @param {Event} event Mouse event, e.g. click, ...
	 * @returns {string} 'title' | 'prefix' | 'expander' | 'checkbox' | 'icon' | undefined
	 */
	getEventTargetType: function(event){
		return this.getEventTarget(event).type;
	},
	/** Return a {node: FancytreeNode, type: TYPE} object for a mouse event.
	 *
	 * @param {Event} event Mouse event, e.g. click, ...
	 * @returns {object} Return a {node: FancytreeNode, type: TYPE} object
	 *     TYPE: 'title' | 'prefix' | 'expander' | 'checkbox' | 'icon' | undefined
	 */
	getEventTarget: function(event){
		var tcn = event && event.target ? event.target.className : "",
			res = {node: this.getNode(event.target), type: undefined};
		// We use a fast version of $(res.node).hasClass()
		// See http://jsperf.com/test-for-classname/2
		if( /\bfancytree-title\b/.test(tcn) ){
			res.type = "title";
		}else if( /\bfancytree-expander\b/.test(tcn) ){
			res.type = (res.node.hasChildren() === false ? "prefix" : "expander");
		}else if( /\bfancytree-checkbox\b/.test(tcn) || /\bfancytree-radio\b/.test(tcn) ){
			res.type = "checkbox";
		}else if( /\bfancytree-icon\b/.test(tcn) ){
			res.type = "icon";
		}else if( /\bfancytree-node\b/.test(tcn) ){
			// Somewhere near the title
			res.type = "title";
		}else if( event && event.target && $(event.target).closest(".fancytree-title").length ) {
			// #228: clicking an embedded element inside a title
			res.type = "title";
		}
		return res;
	},
	/** Return a FancytreeNode instance from element.
	 *
	 * @param {Element | jQueryObject | Event} el
	 * @returns {FancytreeNode} matching node or null
	 */
	getNode: function(el){
		if(el instanceof FancytreeNode){
			return el; // el already was a FancytreeNode
		}else if(el.selector !== undefined){
			el = el[0]; // el was a jQuery object: use the DOM element
		}else if(el.originalEvent !== undefined){
			el = el.target; // el was an Event
		}
		while( el ) {
			if(el.ftnode) {
				return el.ftnode;
			}
			el = el.parentNode;
		}
		return null;
	},
	/* Return a Fancytree instance from element.
	* TODO: this function could help to get around the data('fancytree') / data('ui-fancytree') problem
	* @param {Element | jQueryObject | Event} el
	* @returns {Fancytree} matching tree or null
	* /
	getTree: function(el){
		if(el instanceof Fancytree){
			return el; // el already was a Fancytree
		}else if(el.selector !== undefined){
			el = el[0]; // el was a jQuery object: use the DOM element
		}else if(el.originalEvent !== undefined){
			el = el.target; // el was an Event
		}
		...
		return null;
	},
	*/
	/** Write message to console if debugLevel >= 1
	 * @param {string} msg
	 */
	info: function(msg){
		/*jshint expr:true */
		($.ui.fancytree.debugLevel >= 1) && consoleApply("info", arguments);
	},
	/** Convert a keydown or mouse event to a canonical string like 'ctrl+a', 'ctrl+shift+f2', 'shift+leftdblclick'.
	 * This is especially handy for switch-statements in event handlers.
	 * @param {event}
	 * @returns {string}
	 */
	eventToString: function(event) {
		// Poor-man's hotkeys. See here for a complete implementation:
		//   https://github.com/jeresig/jquery.hotkeys
		var which = event.which,
			et = event.type,
			s = [];

		if( event.altKey ) { s.push("alt"); }
		if( event.ctrlKey ) { s.push("ctrl"); }
		if( event.metaKey ) { s.push("meta"); }
		if( event.shiftKey ) { s.push("shift"); }

		if( et === "click" || et === "dblclick" ) {
			s.push(MOUSE_BUTTONS[event.button] + et);
		} else {
			if( !IGNORE_KEYCODES[which] ) {
				s.push( SPECIAL_KEYCODES[which] || String.fromCharCode(which).toLowerCase() );
			}
		}
		return s.join("+");
	},
	/* @deprecated: use eventToString(event) instead.
	 */
	keyEventToString: function(event) {
		this.warn("keyEventToString() is deprecated: use eventToString()");
		return this.eventToString(event);
	},
	/**
	 * Parse tree data from HTML <ul> markup
	 *
	 * @param {jQueryObject} $ul
	 * @returns {NodeData[]}
	 */
	parseHtml: function($ul) {
		// TODO: understand this:
		/*jshint validthis:true */
		var extraClasses, i, l, iPos, tmp, tmp2, classes, className,
			$children = $ul.find(">li"),
			children = [];

		$children.each(function() {
			var allData,
				$li = $(this),
				$liSpan = $li.find(">span:first", this),
				$liA = $liSpan.length ? null : $li.find(">a:first"),
				d = { tooltip: null, data: {} };

			if( $liSpan.length ) {
				d.title = $liSpan.html();

			} else if( $liA && $liA.length ) {
				// If a <li><a> tag is specified, use it literally and extract href/target.
				d.title = $liA.html();
				d.data.href = $liA.attr("href");
				d.data.target = $liA.attr("target");
				d.tooltip = $liA.attr("title");

			} else {
				// If only a <li> tag is specified, use the trimmed string up to
				// the next child <ul> tag.
				d.title = $li.html();
				iPos = d.title.search(/<ul/i);
				if( iPos >= 0 ){
					d.title = d.title.substring(0, iPos);
				}
			}
			d.title = $.trim(d.title);

			// Make sure all fields exist
			for(i=0, l=CLASS_ATTRS.length; i<l; i++){
				d[CLASS_ATTRS[i]] = undefined;
			}
			// Initialize to `true`, if class is set and collect extraClasses
			classes = this.className.split(" ");
			extraClasses = [];
			for(i=0, l=classes.length; i<l; i++){
				className = classes[i];
				if(CLASS_ATTR_MAP[className]){
					d[className] = true;
				}else{
					extraClasses.push(className);
				}
			}
			d.extraClasses = extraClasses.join(" ");

			// Parse node options from ID, title and class attributes
			tmp = $li.attr("title");
			if( tmp ){
				d.tooltip = tmp; // overrides <a title='...'>
			}
			tmp = $li.attr("id");
			if( tmp ){
				d.key = tmp;
			}
			// Add <li data-NAME='...'> as node.data.NAME
			allData = _getElementDataAsDict($li);
			if(allData && !$.isEmptyObject(allData)) {
				// #56: Allow to set special node.attributes from data-...
				for(i=0, l=NODE_ATTRS.length; i<l; i++){
					tmp = NODE_ATTRS[i];
					tmp2 = allData[tmp];
					if( tmp2 != null ) {
						delete allData[tmp];
						d[tmp] = tmp2;
					}
				}
				// All other data-... goes to node.data...
				$.extend(d.data, allData);
			}
			// Recursive reading of child nodes, if LI tag contains an UL tag
			$ul = $li.find(">ul:first");
			if( $ul.length ) {
				d.children = $.ui.fancytree.parseHtml($ul);
			}else{
				d.children = d.lazy ? undefined : null;
			}
			children.push(d);
//            FT.debug("parse ", d, children);
		});
		return children;
	},
	/** Add Fancytree extension definition to the list of globally available extensions.
	 *
	 * @param {object} definition
	 */
	registerExtension: function(definition){
		_assert(definition.name != null, "extensions must have a `name` property.");
		_assert(definition.version != null, "extensions must have a `version` property.");
		$.ui.fancytree._extensions[definition.name] = definition;
	},
	/** Inverse of escapeHtml().
	 *
	 * @param {string} s
	 * @returns {string}
	 */
	unescapeHtml: function(s){
		var e = document.createElement("div");
		e.innerHTML = s;
		return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
	},
	/** Write warning message to console.
	 * @param {string} msg
	 */
	warn: function(msg){
		consoleApply("warn", arguments);
	}
});

}(jQuery, window, document));

// Extending Fancytree
// ===================
//
// See also the [live demo](http://wwwendt.de/tech/fancytree/demo/sample-ext-childcounter.html) of this code.
//
// Every extension should have a comment header containing some information
// about the author, copyright and licensing. Also a pointer to the latest
// source code.
// Prefix with `/*!` so the comment is not removed by the minifier.

/*!
 * jquery.fancytree.childcounter.js
 *
 * Add a child counter bubble to tree nodes.
 * (Extension module for jquery.fancytree.js: https://github.com/mar10/fancytree/)
 *
 * Copyright (c) 2008-2015, Martin Wendt (http://wwWendt.de)
 *
 * Released under the MIT license
 * https://github.com/mar10/fancytree/wiki/LicenseInfo
 *
 * @version 2.8.1
 * @date 2015-03-01T20:28
 */

// To keep the global namespace clean, we wrap everything in a closure

;(function($, undefined) {

// Consider to use [strict mode](http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/)
"use strict";

// The [coding guidelines](http://contribute.jquery.org/style-guide/js/)
// require jshint compliance.
// But for this sample, we want to allow unused variables for demonstration purpose.

/*jshint unused:false */


// Adding methods
// --------------

// New member functions can be added to the `Fancytree` class.
// This function will be available for every tree instance.
//
//     var tree = $("#tree").fancytree("getTree");
//     tree.countSelected(false);

$.ui.fancytree._FancytreeClass.prototype.countSelected = function(topOnly){
	var tree = this,
		treeOptions = tree.options;
	return tree.getSelectedNodes(topOnly).length;
};


// The `FancytreeNode` class can also be easily extended. This would be called
// like
//
//     node.toUpper();

$.ui.fancytree._FancytreeNodeClass.prototype.toUpper = function(){
	var node = this;
	return node.setTitle(node.title.toUpperCase());
};


// Finally, we can extend the widget API and create functions that are called
// like so:
//
//     $("#tree").fancytree("widgetMethod1", "abc");

$.ui.fancytree.prototype.widgetMethod1 = function(arg1){
	var tree = this.tree;
	return arg1;
};


// Register a Fancytree extension
// ------------------------------
// A full blown extension, extension is available for all trees and can be
// enabled like so (see also the [live demo](http://wwwendt.de/tech/fancytree/demo/sample-ext-childcounter.html)):
//
//    <script src="../src/jquery.fancytree.js" type="text/javascript"></script>
//    <script src="../src/jquery.fancytree.childcounter.js" type="text/javascript"></script>
//    ...
//
//     $("#tree").fancytree({
//         extensions: ["childcounter"],
//         childcounter: {
//             hideExpanded: true
//         },
//         ...
//     });
//


/* 'childcounter' extension */
$.ui.fancytree.registerExtension({
// Every extension must be registered by a unique name.
	name: "childcounter",
// Version information should be compliant with [semver](http://semver.org)
	version: "1.0.0",

// Extension specific options and their defaults.
// This options will be available as `tree.options.childcounter.hideExpanded`

	options: {
		deep: true,
		hideZeros: true,
		hideExpanded: false
	},

// Attributes other than `options` (or functions) can be defined here, and
// will be added to the tree.ext.EXTNAME namespace, in this case `tree.ext.childcounter.foo`.
// They can also be accessed as `this._local.foo` from within the extension
// methods.
	foo: 42,

// Local functions are prefixed with an underscore '_'.
// Callable as `this._local._appendCounter()`.

	_appendCounter: function(bar){
		var tree = this;
	},

// **Override virtual methods for this extension.**
//
// Fancytree implements a number of 'hook methods', prefixed by 'node...' or 'tree...'.
// with a `ctx` argument (see [EventData](http://www.wwwendt.de/tech/fancytree/doc/jsdoc/global.html#EventData)
// for details) and an extended calling context:<br>
// `this`       : the Fancytree instance<br>
// `this._local`: the namespace that contains extension attributes and private methods (same as this.ext.EXTNAME)<br>
// `this._super`: the virtual function that was overridden (member of previous extension or Fancytree)
//
// See also the [complete list of available hook functions](http://www.wwwendt.de/tech/fancytree/doc/jsdoc/Fancytree_Hooks.html).

	/* Init */
// `treeInit` is triggered when a tree is initalized. We can set up classes or
// bind event handlers here...
	treeInit: function(ctx){
		var tree = this, // same as ctx.tree,
			opts = ctx.options,
			extOpts = ctx.options.childcounter;
// Optionally check for dependencies with other extensions
		/* this._requireExtension("glyph", false, false); */
// Call the base implementation
		this._superApply(arguments);
// Add a class to the tree container
		this.$container.addClass("fancytree-ext-childcounter");
	},

// Destroy this tree instance (we only call the default implementation, so
// this method could as well be omitted).

	treeDestroy: function(ctx){
		this._superApply(arguments);
	},

// Overload the `renderTitle` hook, to append a counter badge
	nodeRenderTitle: function(ctx, title) {
		var node = ctx.node,
			extOpts = ctx.options.childcounter,
			count = (node.data.childCounter == null) ? node.countChildren(extOpts.deep) : +node.data.childCounter;
// Let the base implementation render the title
		this._superApply(arguments);
// Append a counter badge
		if( (count || ! extOpts.hideZeros) && (!node.isExpanded() || !extOpts.hideExpanded) ){
			$("span.fancytree-icon", node.span).append($("<span class='fancytree-childcounter'/>").text(count));
		}
	},
// Overload the `setExpanded` hook, so the counters are updated
	nodeSetExpanded: function(ctx, flag, opts) {
		var tree = ctx.tree,
			node = ctx.node;
// Let the base implementation expand/collapse the node, then redraw the title
// after the animation has finished
		return this._superApply(arguments).always(function(){
			tree.nodeRenderTitle(ctx);
		});
	}

// End of extension definition
});
// End of namespace closure
}(jQuery));

/*!
 *
 * jquery.fancytree.clones.js
 * Support faster lookup of nodes by key and shared ref-ids.
 * (Extension module for jquery.fancytree.js: https://github.com/mar10/fancytree/)
 *
 * Copyright (c) 2008-2015, Martin Wendt (http://wwWendt.de)
 *
 * Released under the MIT license
 * https://github.com/mar10/fancytree/wiki/LicenseInfo
 *
 * @version 2.8.1
 * @date 2015-03-01T20:28
 */

;(function($, window, document, undefined) {

"use strict";

/*******************************************************************************
 * Private functions and variables
 */
function _assert(cond, msg){
	// TODO: see qunit.js extractStacktrace()
	if(!cond){
		msg = msg ? ": " + msg : "";
		$.error("Assertion failed" + msg);
	}
}


/* Return first occurrence of member from array. */
function _removeArrayMember(arr, elem) {
	// TODO: use Array.indexOf for IE >= 9
	var i;
	for (i = arr.length - 1; i >= 0; i--) {
		if (arr[i] === elem) {
			arr.splice(i, 1);
			return true;
		}
	}
	return false;
}


// /**
//  * Calculate a 32 bit FNV-1a hash
//  * Found here: https://gist.github.com/vaiorabbit/5657561
//  * Ref.: http://isthe.com/chongo/tech/comp/fnv/
//  *
//  * @param {string} str the input value
//  * @param {boolean} [asString=false] set to true to return the hash value as
//  *     8-digit hex string instead of an integer
//  * @param {integer} [seed] optionally pass the hash of the previous chunk
//  * @returns {integer | string}
//  */
// function hashFnv32a(str, asString, seed) {
// 	/*jshint bitwise:false */
// 	var i, l,
// 		hval = (seed === undefined) ? 0x811c9dc5 : seed;

// 	for (i = 0, l = str.length; i < l; i++) {
// 		hval ^= str.charCodeAt(i);
// 		hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
// 	}
// 	if( asString ){
// 		// Convert to 8 digit hex string
// 		return ("0000000" + (hval >>> 0).toString(16)).substr(-8);
// 	}
// 	return hval >>> 0;
// }


/**
 * JS Implementation of MurmurHash3 (r136) (as of May 20, 2011)
 *
 * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
 * @see http://github.com/garycourt/murmurhash-js
 * @author <a href="mailto:aappleby@gmail.com">Austin Appleby</a>
 * @see http://sites.google.com/site/murmurhash/
 *
 * @param {string} key ASCII only
 * @param {boolean} [asString=false]
 * @param {number} seed Positive integer only
 * @return {number} 32-bit positive integer hash
 */
function hashMurmur3(key, asString, seed) {
	/*jshint bitwise:false */
	var h1b, k1,
		remainder = key.length & 3,
		bytes = key.length - remainder,
		h1 = seed,
		c1 = 0xcc9e2d51,
		c2 = 0x1b873593,
		i = 0;

	while (i < bytes) {
		k1 =
			((key.charCodeAt(i) & 0xff)) |
			((key.charCodeAt(++i) & 0xff) << 8) |
			((key.charCodeAt(++i) & 0xff) << 16) |
			((key.charCodeAt(++i) & 0xff) << 24);
		++i;

		k1 = ((((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16))) & 0xffffffff;
		k1 = (k1 << 15) | (k1 >>> 17);
		k1 = ((((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16))) & 0xffffffff;

		h1 ^= k1;
		h1 = (h1 << 13) | (h1 >>> 19);
		h1b = ((((h1 & 0xffff) * 5) + ((((h1 >>> 16) * 5) & 0xffff) << 16))) & 0xffffffff;
		h1 = (((h1b & 0xffff) + 0x6b64) + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16));
	}

	k1 = 0;

	switch (remainder) {
		/*jshint -W086:true */
		case 3: k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
		case 2: k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
		case 1: k1 ^= (key.charCodeAt(i) & 0xff);

		k1 = (((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff;
		k1 = (k1 << 15) | (k1 >>> 17);
		k1 = (((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff;
		h1 ^= k1;
	}

	h1 ^= key.length;

	h1 ^= h1 >>> 16;
	h1 = (((h1 & 0xffff) * 0x85ebca6b) + ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) & 0xffffffff;
	h1 ^= h1 >>> 13;
	h1 = ((((h1 & 0xffff) * 0xc2b2ae35) + ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16))) & 0xffffffff;
	h1 ^= h1 >>> 16;

	if( asString ){
		// Convert to 8 digit hex string
		return ("0000000" + (h1 >>> 0).toString(16)).substr(-8);
	}
	return h1 >>> 0;
}

// console.info(hashMurmur3("costarring"));
// console.info(hashMurmur3("costarring", true));
// console.info(hashMurmur3("liquid"));
// console.info(hashMurmur3("liquid", true));


/*
 * Return a unique key for node by calculationg the hash of the parents refKey-list
 */
function calcUniqueKey(node) {
	var key,
		path = $.map(node.getParentList(false, true), function(e){ return e.refKey || e.key; });
	path = path.join("/");
	key = "id_" + hashMurmur3(path, true);
	// node.debug(path + " -> " + key);
	return key;
}


/**
 * [ext-clones] Return a list of clone-nodes or null.
 * @param {boolean} [includeSelf=false]
 * @returns {FancytreeNode[] | null}
 *
 * @alias FancytreeNode#getCloneList
 * @requires jquery.fancytree.clones.js
 */
$.ui.fancytree._FancytreeNodeClass.prototype.getCloneList = function(includeSelf){
	var key,
		tree = this.tree,
		refList = tree.refMap[this.refKey] || null,
		keyMap = tree.keyMap;

	if( refList ) {
		key = this.key;
		// Convert key list to node list
		if( includeSelf ) {
			refList = $.map(refList, function(val){ return keyMap[val]; });
		} else {
			refList = $.map(refList, function(val){ return val === key ? null : keyMap[val]; });
			if( refList.length < 1 ) {
				refList = null;
			}
		}
	}
	return refList;
};


/**
 * [ext-clones] Return true if this node has at least another clone with same refKey.
 * @returns {boolean}
 *
 * @alias FancytreeNode#isClone
 * @requires jquery.fancytree.clones.js
 */
$.ui.fancytree._FancytreeNodeClass.prototype.isClone = function(){
	var refKey = this.refKey || null,
		refList = refKey && this.tree.refMap[refKey] || null;
	return !!(refList && refList.length > 1);
};


/**
 * [ext-clones] Update key and/or refKey for an existing node.
 * @param {string} key
 * @param {string} refKey
 * @returns {boolean}
 *
 * @alias FancytreeNode#reRegister
 * @requires jquery.fancytree.clones.js
 */
$.ui.fancytree._FancytreeNodeClass.prototype.reRegister = function(key, refKey){
	key = (key == null) ? null :  "" + key;
	refKey = (refKey == null) ? null :  "" + refKey;
	// this.debug("reRegister", key, refKey);

	var tree = this.tree,
		prevKey = this.key,
		prevRefKey = this.refKey,
		keyMap = tree.keyMap,
		refMap = tree.refMap,
		refList = refMap[prevRefKey] || null,
//		curCloneKeys = refList ? node.getCloneList(true),
		modified = false;

	// Key has changed: update all references
	if( key != null && key !== this.key ) {
		if( keyMap[key] ) {
			$.error("[ext-clones] reRegister(" + key + "): already exists: " + this);
		}
		// Update keyMap
		delete keyMap[prevKey];
		keyMap[key] = this;
		// Update refMap
		if( refList ) {
			refMap[prevRefKey] = $.map(refList, function(e){
				return e === prevKey ? key : e;
			});
		}
		this.key = key;
		modified = true;
	}

	// refKey has changed
	if( refKey != null && refKey !== this.refKey ) {
		// Remove previous refKeys
		if( refList ){
			if( refList.length === 1 ){
				delete refMap[prevRefKey];
			}else{
				refMap[prevRefKey] = $.map(refList, function(e){
					return e === prevKey ? null : e;
				});
			}
		}
		// Add refKey
		if( refMap[refKey] ) {
			refMap[refKey].append(key);
		}else{
			refMap[refKey] = [ this.key ];
		}
		this.refKey = refKey;
		modified = true;
	}
	return modified;
};


/**
 * [ext-clones] Return all nodes with a given refKey (null if not found).
 * @param {string} refKey
 * @param {FancytreeNode} [rootNode] optionally restrict results to descendants of this node
 * @returns {FancytreeNode[] | null}
 * @alias Fancytree#getNodesByRef
 * @requires jquery.fancytree.clones.js
 */
$.ui.fancytree._FancytreeClass.prototype.getNodesByRef = function(refKey, rootNode){
	var keyMap = this.keyMap,
		refList = this.refMap[refKey] || null;

	if( refList ) {
		// Convert key list to node list
		if( rootNode ) {
			refList = $.map(refList, function(val){
				var node = keyMap[val];
				return node.isDescendantOf(rootNode) ? node : null;
			});
		}else{
			refList = $.map(refList, function(val){ return keyMap[val]; });
		}
		if( refList.length < 1 ) {
			refList = null;
		}
	}
	return refList;
};


/**
 * [ext-clones] Replace a refKey with a new one.
 * @param {string} oldRefKey
 * @param {string} newRefKey
 * @alias Fancytree#changeRefKey
 * @requires jquery.fancytree.clones.js
 */
$.ui.fancytree._FancytreeClass.prototype.changeRefKey = function(oldRefKey, newRefKey) {
	var i, node,
		keyMap = this.keyMap,
		refList = this.refMap[oldRefKey] || null;

	if (refList) {
		for (i = 0; i < refList.length; i++) {
			node = keyMap[refList[i]];
			node.refKey = newRefKey;
		}
		delete this.refMap[oldRefKey];
		this.refMap[newRefKey] = refList;
	}
};


/*******************************************************************************
 * Extension code
 */
$.ui.fancytree.registerExtension({
	name: "clones",
	version: "0.0.3",
	// Default options for this extension.
	options: {
		highlightActiveClones: true, // set 'fancytree-active-clone' on active clones and all peers
		highlightClones: false       // set 'fancytree-clone' class on any node that has at least one clone
	},

	treeCreate: function(ctx){
		this._superApply(arguments);
		ctx.tree.refMap = {};
		ctx.tree.keyMap = {};
	},
	treeInit: function(ctx){
		this.$container.addClass("fancytree-ext-clones");
		_assert(ctx.options.defaultKey == null);
		// Generate unique / reproducible default keys
		ctx.options.defaultKey = function(node){
			return calcUniqueKey(node);
		};
		// The default implementation loads initial data
		this._superApply(arguments);
	},
	treeClear: function(ctx){
		ctx.tree.refMap = {};
		ctx.tree.keyMap = {};
		return this._superApply(arguments);
	},
	treeRegisterNode: function(ctx, add, node) {
		var refList, len,
			tree = ctx.tree,
			keyMap = tree.keyMap,
			refMap = tree.refMap,
			key = node.key,
			refKey = (node && node.refKey != null) ? "" + node.refKey : null;

//		ctx.tree.debug("clones.treeRegisterNode", add, node);

		if( key === "_statusNode" ){
			return this._superApply(arguments);
		}

		if( add ) {
			if( keyMap[node.key] != null ) {
				$.error("clones.treeRegisterNode: node.key already exists: " + node);
			}
			keyMap[key] = node;
			if( refKey ) {
				refList = refMap[refKey];
				if( refList ) {
					refList.push(key);
					if( refList.length === 2 && ctx.options.clones.highlightClones ) {
						// Mark peer node, if it just became a clone (no need to
						// mark current node, since it will be rendered later anyway)
						keyMap[refList[0]].renderStatus();
					}
				} else {
					refMap[refKey] = [key];
				}
				// node.debug("clones.treeRegisterNode: add clone =>", refMap[refKey]);
			}
		}else {
			if( keyMap[key] == null ) {
				$.error("clones.treeRegisterNode: node.key not registered: " + node.key);
			}
			delete keyMap[key];
			if( refKey ) {
				refList = refMap[refKey];
				// node.debug("clones.treeRegisterNode: remove clone BEFORE =>", refMap[refKey]);
				if( refList ) {
					len = refList.length;
					if( len <= 1 ){
						_assert(len === 1);
						_assert(refList[0] === key);
						delete refMap[refKey];
					}else{
						_removeArrayMember(refList, key);
						// Unmark peer node, if this was the only clone
						if( len === 2 && ctx.options.clones.highlightClones ) {
//							node.debug("clones.treeRegisterNode: last =>", node.getCloneList());
							keyMap[refList[0]].renderStatus();
						}
					}
					// node.debug("clones.treeRegisterNode: remove clone =>", refMap[refKey]);
				}
			}
		}
		return this._superApply(arguments);
	},
	nodeRenderStatus: function(ctx) {
		var $span, res,
			node = ctx.node;

		res = this._superApply(arguments);

		if( ctx.options.clones.highlightClones ) {
			$span = $(node[ctx.tree.statusClassPropName]);
			// Only if span already exists
			if( $span.length && node.isClone() ){
//				node.debug("clones.nodeRenderStatus: ", ctx.options.clones.highlightClones);
				$span.addClass("fancytree-clone");
			}
		}
		return res;
	},
	nodeSetActive: function(ctx, flag) {
		var res,
			scpn = ctx.tree.statusClassPropName,
			node = ctx.node;

		res = this._superApply(arguments);

		if( ctx.options.clones.highlightActiveClones && node.isClone() ) {
			$.each(node.getCloneList(true), function(idx, n){
				// n.debug("clones.nodeSetActive: ", flag !== false);
				$(n[scpn]).toggleClass("fancytree-active-clone", flag !== false);
			});
		}
		return res;
	}
});
}(jQuery, window, document));

/*!
 * jquery.fancytree.dnd.js
 *
 * Drag-and-drop support.
 * (Extension module for jquery.fancytree.js: https://github.com/mar10/fancytree/)
 *
 * Copyright (c) 2008-2015, Martin Wendt (http://wwWendt.de)
 *
 * Released under the MIT license
 * https://github.com/mar10/fancytree/wiki/LicenseInfo
 *
 * @version 2.8.1
 * @date 2015-03-01T20:28
 */

;(function($, window, document, undefined) {

"use strict";

/* *****************************************************************************
 * Private functions and variables
 */
var didRegisterDnd = false;

/* Convert number to string and prepend +/-; return empty string for 0.*/
function offsetString(n){
	return n === 0 ? "" : (( n > 0 ) ? ("+" + n) : ("" + n));
}

/* *****************************************************************************
 * Drag and drop support
 */
function _initDragAndDrop(tree) {
	var dnd = tree.options.dnd || null;
	// Register 'connectToFancytree' option with ui.draggable
	if( dnd ) {
		_registerDnd();
	}
	// Attach ui.draggable to this Fancytree instance
	if(dnd && dnd.dragStart ) {
		tree.widget.element.draggable($.extend({
			addClasses: false,
			// DT issue 244: helper should be child of scrollParent:
			appendTo: tree.$container,
//			appendTo: "body",
			containment: false,
			delay: 0,
			distance: 4,
			revert: false,
			scroll: true, // to disable, also set css 'position: inherit' on ul.fancytree-container
			scrollSpeed: 7,
			scrollSensitivity: 10,
			// Delegate draggable.start, drag, and stop events to our handler
			connectToFancytree: true,
			// Let source tree create the helper element
			helper: function(event) {
				var $helper,
					sourceNode = $.ui.fancytree.getNode(event.target),
					$nodeTag = $(sourceNode.span);
				if(!sourceNode){
					// DT issue 211: might happen, if dragging a table *header*
					return "<div>ERROR?: helper requested but sourceNode not found</div>";
				}
				// Only event and node argument is available
				$helper = $("<div class='fancytree-drag-helper'><span class='fancytree-drag-helper-img' /></div>")
					.css({zIndex: 3, position: "relative"}) // so it appears above ext-wide selection bar
					.append($nodeTag.find("span.fancytree-title").clone());

				// Attach node reference to helper object
				$helper.data("ftSourceNode", sourceNode);
				// we return an unconnected element, so `draggable` will add this
				// to the parent specified as `appendTo` option
				return $helper;
			},
			start: function(event, ui) {
				var sourceNode = ui.helper.data("ftSourceNode");
				return !!sourceNode; // Abort dragging if no node could be found
			}
		}, tree.options.dnd.draggable));
	}
	// Attach ui.droppable to this Fancytree instance
	if(dnd && dnd.dragDrop) {
		tree.widget.element.droppable($.extend({
			addClasses: false,
			tolerance: "intersect",
			greedy: false
/*
			activate: function(event, ui) {
				tree.debug("droppable - activate", event, ui, this);
			},
			create: function(event, ui) {
				tree.debug("droppable - create", event, ui);
			},
			deactivate: function(event, ui) {
				tree.debug("droppable - deactivate", event, ui);
			},
			drop: function(event, ui) {
				tree.debug("droppable - drop", event, ui);
			},
			out: function(event, ui) {
				tree.debug("droppable - out", event, ui);
			},
			over: function(event, ui) {
				tree.debug("droppable - over", event, ui);
			}
*/
		}, tree.options.dnd.droppable));
	}
}

//--- Extend ui.draggable event handling --------------------------------------

function _registerDnd() {
	if(didRegisterDnd){
		return;
	}

	// Register proxy-functions for draggable.start/drag/stop

	$.ui.plugin.add("draggable", "connectToFancytree", {
		start: function(event, ui) {
			// 'draggable' was renamed to 'ui-draggable' since jQueryUI 1.10
			var draggable = $(this).data("ui-draggable") || $(this).data("draggable"),
				sourceNode = ui.helper.data("ftSourceNode") || null;

			if(sourceNode) {
				// Adjust helper offset, so cursor is slightly outside top/left corner
				draggable.offset.click.top = -2;
				draggable.offset.click.left = + 16;
				// Trigger dragStart event
				// TODO: when called as connectTo..., the return value is ignored(?)
				return sourceNode.tree.ext.dnd._onDragEvent("start", sourceNode, null, event, ui, draggable);
			}
		},
		drag: function(event, ui) {
			var isHelper, logObject,
				// 'draggable' was renamed to 'ui-draggable' since jQueryUI 1.10
				draggable = $(this).data("ui-draggable") || $(this).data("draggable"),
				sourceNode = ui.helper.data("ftSourceNode") || null,
				prevTargetNode = ui.helper.data("ftTargetNode") || null,
				targetNode = $.ui.fancytree.getNode(event.target);

			if(event.target && !targetNode){
				// We got a drag event, but the targetNode could not be found
				// at the event location. This may happen,
				// 1. if the mouse jumped over the drag helper,
				// 2. or if a non-fancytree element is dragged
				// We ignore it:
				isHelper = $(event.target).closest("div.fancytree-drag-helper,#fancytree-drop-marker").length > 0;
				if(isHelper){
					logObject = sourceNode || prevTargetNode || $.ui.fancytree;
					logObject.debug("Drag event over helper: ignored.");
					return;
				}
			}
			ui.helper.data("ftTargetNode", targetNode);
			// Leaving a tree node
			if(prevTargetNode && prevTargetNode !== targetNode ) {
				prevTargetNode.tree.ext.dnd._onDragEvent("leave", prevTargetNode, sourceNode, event, ui, draggable);
			}
			if(targetNode){
				if(!targetNode.tree.options.dnd.dragDrop) {
					// not enabled as drop target
				} else if(targetNode === prevTargetNode) {
					// Moving over same node
					targetNode.tree.ext.dnd._onDragEvent("over", targetNode, sourceNode, event, ui, draggable);
				}else{
					// Entering this node first time
					targetNode.tree.ext.dnd._onDragEvent("enter", targetNode, sourceNode, event, ui, draggable);
				}
			}
			// else go ahead with standard event handling
		},
		stop: function(event, ui) {
			// 'draggable' was renamed to 'ui-draggable' since jQueryUI 1.10
			var logObject,
				draggable = $(this).data("ui-draggable") || $(this).data("draggable"),
				sourceNode = ui.helper.data("ftSourceNode") || null,
				targetNode = ui.helper.data("ftTargetNode") || null,
//				mouseDownEvent = draggable._mouseDownEvent,
				eventType = event.type,
				dropped = (eventType === "mouseup" && event.which === 1);

			if(!dropped){
				logObject = sourceNode || targetNode || $.ui.fancytree;
				logObject.debug("Drag was cancelled");
			}
			if(targetNode) {
				if(dropped){
					targetNode.tree.ext.dnd._onDragEvent("drop", targetNode, sourceNode, event, ui, draggable);
				}
				targetNode.tree.ext.dnd._onDragEvent("leave", targetNode, sourceNode, event, ui, draggable);
			}
			if(sourceNode){
				sourceNode.tree.ext.dnd._onDragEvent("stop", sourceNode, null, event, ui, draggable);
			}
		}
	});

	didRegisterDnd = true;
}


/* *****************************************************************************
 *
 */

$.ui.fancytree.registerExtension({
	name: "dnd",
	version: "0.1.0",
	// Default options for this extension.
	options: {
		// Make tree nodes accept draggables
		autoExpandMS: 1000,  // Expand nodes after n milliseconds of hovering.
		draggable: null,     // Additional options passed to jQuery draggable
		droppable: null,     // Additional options passed to jQuery droppable
		focusOnClick: false, // Focus, although draggable cancels mousedown event (#270)
//      helper: null,        // Callback
//		helperParent: null,  // jQuery object (defaults to Fancytree container)
		preventVoidMoves: true, // Prevent dropping nodes 'before self', etc.
		preventRecursiveMoves: true, // Prevent dropping nodes on own descendants
		// Events (drag support)
		dragStart: null,  // Callback(sourceNode, data), return true, to enable dnd
		dragStop: null,   // Callback(sourceNode, data)
		// Events (drop support)
		dragEnter: null,  // Callback(targetNode, data)
		dragOver: null,   // Callback(targetNode, data)
		dragDrop: null,   // Callback(targetNode, data)
		dragLeave: null   // Callback(targetNode, data)
	},

	treeInit: function(ctx){
		var tree = ctx.tree;
		this._superApply(arguments);
		// issue #270: draggable eats mousedown events
		if( tree.options.dnd.dragStart ){
			tree.$container.on("mousedown", function(event){
				if( !tree.hasFocus() && ctx.options.dnd.focusOnClick ) {
					var node = $.ui.fancytree.getNode(event);
					node.debug("Re-enable focus that was prevented by jQuery UI draggable.");
					// node.setFocus();
					// $(node.span).closest(":tabbable").focus();
					// $(event.target).trigger("focus");
					// $(event.target).closest(":tabbable").trigger("focus");
					setTimeout(function() { // #300
						$(event.target).closest(":tabbable").focus();
					}, 10);
				}
			});
		}
		_initDragAndDrop(tree);
	},
	/* Override key handler in order to cancel dnd on escape.*/
	nodeKeydown: function(ctx) {
		var event = ctx.originalEvent;
		if( event.which === $.ui.keyCode.ESCAPE) {
			this._local._cancelDrag();
		}
		return this._superApply(arguments);
	},
	nodeClick: function(ctx) {
		// if( ctx.options.dnd.dragStart ){
		// 	ctx.tree.$container.focus();
		// }
		return this._superApply(arguments);
	},
	/* Display drop marker according to hitMode ('after', 'before', 'over', 'out', 'start', 'stop'). */
	_setDndStatus: function(sourceNode, targetNode, helper, hitMode, accept) {
		var markerOffsetX = 0,
			markerAt = "center",
			instData = this._local,
			$source = sourceNode ? $(sourceNode.span) : null,
			$target = $(targetNode.span);

		if( !instData.$dropMarker ) {
			instData.$dropMarker = $("<div id='fancytree-drop-marker'></div>")
				.hide()
				.css({"z-index": 1000})
				.prependTo($(this.$div).parent());
//                .prependTo("body");
		}
//      this.$dropMarker.attr("class", hitMode);
		if(hitMode === "after" || hitMode === "before" || hitMode === "over"){
//          $source && $source.addClass("fancytree-drag-source");

//          $target.addClass("fancytree-drop-target");

			switch(hitMode){
			case "before":
				instData
				.$dropMarker.removeClass("fancytree-drop-after fancytree-drop-over")
					.addClass("fancytree-drop-before");
				markerAt = "top";
				break;
			case "after":
				instData.$dropMarker.removeClass("fancytree-drop-before fancytree-drop-over")
					.addClass("fancytree-drop-after");
				markerAt = "bottom";
				break;
			default:
				instData.$dropMarker.removeClass("fancytree-drop-after fancytree-drop-before")
					.addClass("fancytree-drop-over");
				$target.addClass("fancytree-drop-target");
				markerOffsetX = 8;
			}

			instData.$dropMarker
				.show()
				.position($.ui.fancytree.fixPositionOptions({
					my: "left" + offsetString(markerOffsetX) + " center",
					at: "left " + markerAt,
					of: $target
					}));
//          helper.addClass("fancytree-drop-hover");
		} else {
//          $source && $source.removeClass("fancytree-drag-source");
			$target.removeClass("fancytree-drop-target");
			instData.$dropMarker.hide();
//          helper.removeClass("fancytree-drop-hover");
		}
		if(hitMode === "after"){
			$target.addClass("fancytree-drop-after");
		} else {
			$target.removeClass("fancytree-drop-after");
		}
		if(hitMode === "before"){
			$target.addClass("fancytree-drop-before");
		} else {
			$target.removeClass("fancytree-drop-before");
		}
		if(accept === true){
			if($source){
				$source.addClass("fancytree-drop-accept");
			}
			$target.addClass("fancytree-drop-accept");
			helper.addClass("fancytree-drop-accept");
		}else{
			if($source){
				$source.removeClass("fancytree-drop-accept");
			}
			$target.removeClass("fancytree-drop-accept");
			helper.removeClass("fancytree-drop-accept");
		}
		if(accept === false){
			if($source){
				$source.addClass("fancytree-drop-reject");
			}
			$target.addClass("fancytree-drop-reject");
			helper.addClass("fancytree-drop-reject");
		}else{
			if($source){
				$source.removeClass("fancytree-drop-reject");
			}
			$target.removeClass("fancytree-drop-reject");
			helper.removeClass("fancytree-drop-reject");
		}
	},

	/*
	 * Handles drag'n'drop functionality.
	 *
	 * A standard jQuery drag-and-drop process may generate these calls:
	 *
	 * draggable helper():
	 *     _onDragEvent("helper", sourceNode, null, event, null, null);
	 * start:
	 *     _onDragEvent("start", sourceNode, null, event, ui, draggable);
	 * drag:
	 *     _onDragEvent("leave", prevTargetNode, sourceNode, event, ui, draggable);
	 *     _onDragEvent("over", targetNode, sourceNode, event, ui, draggable);
	 *     _onDragEvent("enter", targetNode, sourceNode, event, ui, draggable);
	 * stop:
	 *     _onDragEvent("drop", targetNode, sourceNode, event, ui, draggable);
	 *     _onDragEvent("leave", targetNode, sourceNode, event, ui, draggable);
	 *     _onDragEvent("stop", sourceNode, null, event, ui, draggable);
	 */
	_onDragEvent: function(eventName, node, otherNode, event, ui, draggable) {
		if(eventName !== "over"){
			this.debug("tree.ext.dnd._onDragEvent(%s, %o, %o) - %o", eventName, node, otherNode, this);
		}
		var /*$helper, $helperParent,*/ nodeOfs, relPos, relPos2,
			enterResponse, hitMode, r,
			opts = this.options,
			dnd = opts.dnd,
			ctx = this._makeHookContext(node, event, {otherNode: otherNode, ui: ui, draggable: draggable}),
			res = null,
			$nodeTag = $(node.span);

		switch (eventName) {
// 		case "helper":
// 			// Only event and node argument is available
// 			$helper = $("<div class='fancytree-drag-helper'><span class='fancytree-drag-helper-img' /></div>")
// 				.css({zIndex: 3, position: "relative"}) // so it appears above ext-wide selection bar
// 				.append($nodeTag.find("span.fancytree-title").clone());
// 			// #345: helper parent is now set using draggable.appendTo
// //			$helperParent = dnd.helperParent || $("ul.fancytree-container", node.tree.$div);
// 			// DT issue 244: helper should be child of scrollParent
// //			$helperParent.append($helper);
// 			// Attach node reference to helper object
// 			$helper.data("ftSourceNode", node);
// 			// this.debug("helper=%o", $helper);
// 			// this.debug("helper.sourceNode=%o", $helper.data("ftSourceNode"));
// 			res = $helper;
// 			break;

		case "start":
			if( node.isStatusNode() ) {
				res = false;
			} else if(dnd.dragStart) {
				res = dnd.dragStart(node, ctx);
			}
			if(res === false) {
				this.debug("tree.dragStart() cancelled");
				//draggable._clear();
				// NOTE: the return value seems to be ignored (drag is not canceled, when false is returned)
				// TODO: call this._cancelDrag()?
				ui.helper.trigger("mouseup")
					.hide();
			} else {
				$nodeTag.addClass("fancytree-drag-source");
			}
			break;

		case "enter":
			if(dnd.preventRecursiveMoves && node.isDescendantOf(otherNode)){
				r = false;
			}else{
				r = dnd.dragEnter ? dnd.dragEnter(node, ctx) : null;
			}
			if(!r){
				// convert null, undefined, false to false
				res = false;
			}else if ( $.isArray(r) ) {
				// TODO: also accept passing an object of this format directly
				res = {
					over: ($.inArray("over", r) >= 0),
					before: ($.inArray("before", r) >= 0),
					after: ($.inArray("after", r) >= 0)
				};
			}else{
				res = {
					over: ((r === true) || (r === "over")),
					before: ((r === true) || (r === "before")),
					after: ((r === true) || (r === "after"))
				};
			}
			ui.helper.data("enterResponse", res);
			this.debug("helper.enterResponse: %o", res);
			break;

		case "over":
			enterResponse = ui.helper.data("enterResponse");
			hitMode = null;
			if(enterResponse === false){
				// Don't call dragOver if onEnter returned false.
//                break;
			} else if(typeof enterResponse === "string") {
				// Use hitMode from onEnter if provided.
				hitMode = enterResponse;
			} else {
				// Calculate hitMode from relative cursor position.
				nodeOfs = $nodeTag.offset();
				relPos = { x: event.pageX - nodeOfs.left,
						   y: event.pageY - nodeOfs.top };
				relPos2 = { x: relPos.x / $nodeTag.width(),
							y: relPos.y / $nodeTag.height() };

				if( enterResponse.after && relPos2.y > 0.75 ){
					hitMode = "after";
				} else if(!enterResponse.over && enterResponse.after && relPos2.y > 0.5 ){
					hitMode = "after";
				} else if(enterResponse.before && relPos2.y <= 0.25) {
					hitMode = "before";
				} else if(!enterResponse.over && enterResponse.before && relPos2.y <= 0.5) {
					hitMode = "before";
				} else if(enterResponse.over) {
					hitMode = "over";
				}
				// Prevent no-ops like 'before source node'
				// TODO: these are no-ops when moving nodes, but not in copy mode
				if( dnd.preventVoidMoves ){
					if(node === otherNode){
						this.debug("    drop over source node prevented");
						hitMode = null;
					}else if(hitMode === "before" && otherNode && node === otherNode.getNextSibling()){
						this.debug("    drop after source node prevented");
						hitMode = null;
					}else if(hitMode === "after" && otherNode && node === otherNode.getPrevSibling()){
						this.debug("    drop before source node prevented");
						hitMode = null;
					}else if(hitMode === "over" && otherNode && otherNode.parent === node && otherNode.isLastSibling() ){
						this.debug("    drop last child over own parent prevented");
						hitMode = null;
					}
				}
//                this.debug("hitMode: %s - %s - %s", hitMode, (node.parent === otherNode), node.isLastSibling());
				ui.helper.data("hitMode", hitMode);
			}
			// Auto-expand node (only when 'over' the node, not 'before', or 'after')
			if(hitMode === "over" && dnd.autoExpandMS && node.hasChildren() !== false && !node.expanded) {
				node.scheduleAction("expand", dnd.autoExpandMS);
			}
			if(hitMode && dnd.dragOver){
				// TODO: http://code.google.com/p/dynatree/source/detail?r=625
				ctx.hitMode = hitMode;
				res = dnd.dragOver(node, ctx);
			}
			// DT issue 332
//			this._setDndStatus(otherNode, node, ui.helper, hitMode, res!==false);
			this._local._setDndStatus(otherNode, node, ui.helper, hitMode, res!==false && hitMode !== null);
			break;

		case "drop":
			hitMode = ui.helper.data("hitMode");
			if(hitMode && dnd.dragDrop){
				ctx.hitMode = hitMode;
				dnd.dragDrop(node, ctx);
			}
			break;

		case "leave":
			// Cancel pending expand request
			node.scheduleAction("cancel");
			ui.helper.data("enterResponse", null);
			ui.helper.data("hitMode", null);
			this._local._setDndStatus(otherNode, node, ui.helper, "out", undefined);
			if(dnd.dragLeave){
				dnd.dragLeave(node, ctx);
			}
			break;

		case "stop":
			$nodeTag.removeClass("fancytree-drag-source");
			if(dnd.dragStop){
				dnd.dragStop(node, ctx);
			}
			break;

		default:
			$.error("Unsupported drag event: " + eventName);
		}
		return res;
	},

	_cancelDrag: function() {
		 var dd = $.ui.ddmanager.current;
		 if(dd){
			 dd.cancel();
		 }
	}
});
}(jQuery, window, document));

/*!
 * jquery.fancytree.edit.js
 *
 * Make node titles editable.
 * (Extension module for jquery.fancytree.js: https://github.com/mar10/fancytree/)
 *
 * Copyright (c) 2008-2015, Martin Wendt (http://wwWendt.de)
 *
 * Released under the MIT license
 * https://github.com/mar10/fancytree/wiki/LicenseInfo
 *
 * @version 2.8.1
 * @date 2015-03-01T20:28
 */

;(function($, window, document, undefined) {

"use strict";


/*******************************************************************************
 * Private functions and variables
 */

var isMac = /Mac/.test(navigator.platform),
	escapeHtml = $.ui.fancytree.escapeHtml,
	unescapeHtml = $.ui.fancytree.unescapeHtml;

/**
 * [ext-edit] Start inline editing of current node title.
 *
 * @alias FancytreeNode#editStart
 * @requires Fancytree
 */
$.ui.fancytree._FancytreeNodeClass.prototype.editStart = function(){
	var $input,
		node = this,
		tree = this.tree,
		local = tree.ext.edit,
		instOpts = tree.options.edit,
		$title = $(".fancytree-title", node.span),
		eventData = {
			node: node,
			tree: tree,
			options: tree.options,
			isNew: $(node.span).hasClass("fancytree-edit-new"),
			orgTitle: node.title,
			input: null,
			dirty: false
			};

	// beforeEdit may want to modify the title before editing
	if( instOpts.beforeEdit.call(node, {type: "beforeEdit"}, eventData) === false ) {
		return false;
	}
	$.ui.fancytree.assert(!local.currentNode, "recursive edit");
	local.currentNode = this;
	local.eventData = eventData;

	// Disable standard Fancytree mouse- and key handling
	tree.widget._unbind();
	// #116: ext-dnd prevents the blur event, so we have to catch outer clicks
	$(document).on("mousedown.fancytree-edit", function(event){
		if( ! $(event.target).hasClass("fancytree-edit-input") ){
			node.editEnd(true, event);
		}
	});

	// Replace node with <input>
	$input = $("<input />", {
		"class": "fancytree-edit-input",
		type: "text",
		value: unescapeHtml(eventData.orgTitle)
	});
	local.eventData.input = $input;
	if ( instOpts.adjustWidthOfs != null ) {
		$input.width($title.width() + instOpts.adjustWidthOfs);
	}
	if ( instOpts.inputCss != null ) {
		$input.css(instOpts.inputCss);
	}

	$title.html($input);

	// Focus <input> and bind keyboard handler
	$input
		.focus()
		.change(function(event){
			$input.addClass("fancytree-edit-dirty");
		}).keydown(function(event){
			switch( event.which ) {
			case $.ui.keyCode.ESCAPE:
				node.editEnd(false, event);
				break;
			case $.ui.keyCode.ENTER:
				node.editEnd(true, event);
				return false; // so we don't start editmode on Mac
			}
			event.stopPropagation();
		}).blur(function(event){
			return node.editEnd(true, event);
		});

	instOpts.edit.call(node, {type: "edit"}, eventData);
};


/**
 * [ext-edit] Stop inline editing.
 * @param {Boolean} [applyChanges=false] false: cancel edit, true: save (if modified)
 * @alias FancytreeNode#editEnd
 * @requires jquery.fancytree.edit.js
 */
$.ui.fancytree._FancytreeNodeClass.prototype.editEnd = function(applyChanges, _event){
	var newVal,
		node = this,
		tree = this.tree,
		local = tree.ext.edit,
		eventData = local.eventData,
		instOpts = tree.options.edit,
		$title = $(".fancytree-title", node.span),
		$input = $title.find("input.fancytree-edit-input");

	// eventData.isNew = $(node.span).hasClass("fancytree-edit-new");

	if( instOpts.trim ) {
		$input.val($.trim($input.val()));
	}
	newVal = $input.val();
	// eventData.dirty = $input.hasClass("fancytree-edit-dirty") || ;
	eventData.dirty = ( newVal !== node.title );

	// Find out, if saving is required
	if( applyChanges === false ) {
		// If true/false was passed, honor this (except in rename mode, if unchanged)
		eventData.save = false;
	} else if( eventData.isNew ) {
		// In create mode, we save everyting, except for empty text
		eventData.save = (newVal !== "");
	} else {
		// In rename mode, we save everyting, except for empty or unchanged text
		eventData.save = eventData.dirty && (newVal !== "");
	}
	// Allow to break (keep editor open), modify input, or re-define data.save
	if( instOpts.beforeClose.call(node, {type: "beforeClose"}, eventData) === false){
		return false;
	}
	if( eventData.save && instOpts.save.call(node, {type: "save"}, eventData) === false){
		return false;
	}
	$input
		.removeClass("fancytree-edit-dirty")
		.unbind();
	// Unbind outer-click handler
	$(document).off(".fancytree-edit");

	if( eventData.save ) {
		node.setTitle( escapeHtml(newVal) );
		// $(node.span).removeClass("fancytree-edit-new");
		node.setFocus();
	}else{
		if( eventData.isNew ) {
			node.remove();
			node = eventData.node = null;
			local.relatedNode.setFocus();
		} else {
			node.renderTitle();
			node.setFocus();
		}
	}
	local.eventData = null;
	local.currentNode = null;
	local.relatedNode = null;
	// Re-enable mouse and keyboard handling
	tree.widget._bind();
	// Set keyboard focus, even if setFocus() claims 'nothing to do'
	$(tree.$container).focus();
	eventData.input = null;
	instOpts.close.call(node, {type: "close"}, eventData);
	return true;
};


/**
* [ext-edit] Create a new child or sibling node and start edit mode.
*
* @param {String} [mode='child'] 'before', 'after', or 'child'
* @param {Object} [init] NodeData (or simple title string)
* @alias FancytreeNode#editCreateNode
* @requires jquery.fancytree.edit.js
*/
$.ui.fancytree._FancytreeNodeClass.prototype.editCreateNode = function(mode, init){
	var newNode,
		self = this;

	mode = mode || "child";
	if( init == null ) {
		init = { title: "" };
	} else if( typeof init === "string" ) {
		init = { title: init };
	} else {
		$.ui.fancytree.assert($.isPlainObject(init));
	}
	// Make sure node is expanded (and loaded) in 'child' mode
	if( mode === "child" && !this.isExpanded() && this.hasChildren() !== false ) {
		this.setExpanded().done(function(){
			self.editCreateNode(mode, init);
		});
		return;
	}
	newNode = this.addNode(init, mode);
	newNode.makeVisible(/*{noAnimation: true}*/).done(function(){
		$(newNode.span).addClass("fancytree-edit-new");
		self.tree.ext.edit.relatedNode = self;
		newNode.editStart();
	});
};


/**
 * [ext-edit] Check if any node in this tree  in edit mode.
 *
 * @returns {FancytreeNode | null}
 * @alias Fancytree#isEditing
 * @requires jquery.fancytree.edit.js
 */
$.ui.fancytree._FancytreeClass.prototype.isEditing = function(){
	return this.ext.edit.currentNode;
};


/**
 * [ext-edit] Check if this node is in edit mode.
 * @returns {Boolean} true if node is currently beeing edited
 * @alias FancytreeNode#isEditing
 * @requires jquery.fancytree.edit.js
 */
$.ui.fancytree._FancytreeNodeClass.prototype.isEditing = function(){
	return this.tree.ext.edit.currentNode === this;
};


/*******************************************************************************
 * Extension code
 */
$.ui.fancytree.registerExtension({
	name: "edit",
	version: "0.2.0",
	// Default options for this extension.
	options: {
		adjustWidthOfs: 4,   // null: don't adjust input size to content
		allowEmpty: false,   // Prevent empty input
		inputCss: {minWidth: "3em"},
		triggerCancel: ["esc", "tab", "click"],
		// triggerStart: ["f2", "dblclick", "shift+click", "mac+enter"],
		triggerStart: ["f2", "shift+click", "mac+enter"],
		trim: true,          // Trim whitespace before save
		// Events:
		beforeClose: $.noop, // Return false to prevent cancel/save (data.input is available)
		beforeEdit: $.noop,  // Return false to prevent edit mode
		close: $.noop,       // Editor was removed
		edit: $.noop,        // Editor was opened (available as data.input)
//		keypress: $.noop,    // Not yet implemented
		save: $.noop         // Save data.input.val() or return false to keep editor open
	},
	// Local attributes
	currentNode: null,

	treeInit: function(ctx){
		this._superApply(arguments);
		this.$container.addClass("fancytree-ext-edit");
	},
	nodeClick: function(ctx) {
		if( $.inArray("shift+click", ctx.options.edit.triggerStart) >= 0 ){
			if( ctx.originalEvent.shiftKey ){
				ctx.node.editStart();
				return false;
			}
		}
		return this._superApply(arguments);
	},
	nodeDblclick: function(ctx) {
		if( $.inArray("dblclick", ctx.options.edit.triggerStart) >= 0 ){
			ctx.node.editStart();
			return false;
		}
		return this._superApply(arguments);
	},
	nodeKeydown: function(ctx) {
		switch( ctx.originalEvent.which ) {
		case 113: // [F2]
			if( $.inArray("f2", ctx.options.edit.triggerStart) >= 0 ){
				ctx.node.editStart();
				return false;
			}
			break;
		case $.ui.keyCode.ENTER:
			if( $.inArray("mac+enter", ctx.options.edit.triggerStart) >= 0 && isMac ){
				ctx.node.editStart();
				return false;
			}
			break;
		}
		return this._superApply(arguments);
	}
});
}(jQuery, window, document));

/*!
 * jquery.fancytree.filter.js
 *
 * Remove or highlight tree nodes, based on a filter.
 * (Extension module for jquery.fancytree.js: https://github.com/mar10/fancytree/)
 *
 * Copyright (c) 2008-2015, Martin Wendt (http://wwWendt.de)
 *
 * Released under the MIT license
 * https://github.com/mar10/fancytree/wiki/LicenseInfo
 *
 * @version 2.8.1
 * @date 2015-03-01T20:28
 */

;(function($, window, document, undefined) {

"use strict";


/*******************************************************************************
 * Private functions and variables
 */

function _escapeRegex(str){
	/*jshint regexdash:true */
	return (str + "").replace(/([.?*+\^\$\[\]\\(){}|-])/g, "\\$1");
}

$.ui.fancytree._FancytreeClass.prototype._applyFilterImpl = function(filter, branchMode, leavesOnly){
	var match, re,
		count = 0,
		hideMode = this.options.filter.mode === "hide";
		// leavesOnly = !branchMode && this.options.filter.leavesOnly;
	leavesOnly = !!leavesOnly && !branchMode;

	// Default to 'match title substring (not case sensitive)'
	if(typeof filter === "string"){
		match = _escapeRegex(filter); // make sure a '.' is treated literally
		re = new RegExp(".*" + match + ".*", "i");
		filter = function(node){
			return !!re.exec(node.title);
		};
	}

	this.enableFilter = true;
	this.lastFilterArgs = arguments;

	this.$div.addClass("fancytree-ext-filter");
	if( hideMode ){
		this.$div.addClass("fancytree-ext-filter-hide");
	} else {
		this.$div.addClass("fancytree-ext-filter-dimm");
	}
	// Reset current filter
	this.visit(function(node){
		delete node.match;
		delete node.subMatch;
	});
	// Adjust node.hide, .match, .subMatch flags
	this.visit(function(node){
		if ((!leavesOnly || node.children == null) && filter(node)) {
			count++;
			node.match = true;
			node.visitParents(function(p){
				p.subMatch = true;
			});
			if( branchMode ) {
				node.visit(function(p){
					p.match = true;
				});
				return "skip";
			}
		}
	});
	// Redraw
	this.render();
	return count;
};

/**
 * [ext-filter] Dimm or hide nodes.
 *
 * @param {function | string} filter
 * @param {boolean} [leavesOnly=false]
 * @returns {integer} count
 * @alias Fancytree#filterNodes
 * @requires jquery.fancytree.filter.js
 */
$.ui.fancytree._FancytreeClass.prototype.filterNodes = function(filter, leavesOnly){
	return this._applyFilterImpl(filter, false, leavesOnly);
};

/**
 * @deprecated
 */
$.ui.fancytree._FancytreeClass.prototype.applyFilter = function(filter){
	this.warn("Fancytree.applyFilter() is deprecated since 2014-05-10. Use .filterNodes() instead.");
	return this.filterNodes.apply(this, arguments);
};

/**
 * [ext-filter] Dimm or hide whole branches.
 *
 * @param {function | string} filter
 * @returns {integer} count
 * @alias Fancytree#filterBranches
 * @requires jquery.fancytree.filter.js
 */
$.ui.fancytree._FancytreeClass.prototype.filterBranches = function(filter){
	return this._applyFilterImpl(filter, true, null);
};


/**
 * [ext-filter] Reset the filter.
 *
 * @alias Fancytree#clearFilter
 * @requires jquery.fancytree.filter.js
 */
$.ui.fancytree._FancytreeClass.prototype.clearFilter = function(){
	this.visit(function(node){
		delete node.match;
		delete node.subMatch;
	});
	this.enableFilter = false;
	this.lastFilterArgs = null;
	this.$div.removeClass("fancytree-ext-filter fancytree-ext-filter-dimm fancytree-ext-filter-hide");
	this.render();
};


/*******************************************************************************
 * Extension code
 */
$.ui.fancytree.registerExtension({
	name: "filter",
	version: "0.3.0",
	// Default options for this extension.
	options: {
		autoApply: true, // re-apply last filter if lazy data is loaded
		mode: "dimm"
	},
	treeInit: function(ctx){
		this._superApply(arguments);
	},
	nodeLoadChildren: function(ctx, source) {
		return this._superApply(arguments).done(function() {
			if( ctx.tree.enableFilter && ctx.tree.lastFilterArgs && ctx.options.filter.autoApply ) {
				ctx.tree._applyFilterImpl.apply(ctx.tree, ctx.tree.lastFilterArgs);
			}
		});
	},
	nodeRenderStatus: function(ctx) {
		// Set classes for current status
		var res,
			node = ctx.node,
			tree = ctx.tree,
			$span = $(node[tree.statusClassPropName]);

		res = this._superApply(arguments);
		// nothing to do, if node was not yet rendered
		if( !$span.length || !tree.enableFilter ) {
			return res;
		}
		$span
			.toggleClass("fancytree-match", !!node.match)
			.toggleClass("fancytree-submatch", !!node.subMatch)
			.toggleClass("fancytree-hide", !(node.match || node.subMatch));

		return res;
	}
});
}(jQuery, window, document));

/*!
 * jquery.fancytree.glyph.js
 *
 * Use glyph fonts as instead of icon sprites.
 * (Extension module for jquery.fancytree.js: https://github.com/mar10/fancytree/)
 *
 * Copyright (c) 2008-2015, Martin Wendt (http://wwWendt.de)
 *
 * Released under the MIT license
 * https://github.com/mar10/fancytree/wiki/LicenseInfo
 *
 * @version 2.8.1
 * @date 2015-03-01T20:28
 */

;(function($, window, document, undefined) {

"use strict";

/* *****************************************************************************
 * Private functions and variables
 */

function _getIcon(opts, type){
	return opts.map[type];
}

$.ui.fancytree.registerExtension({
	name: "glyph",
	version: "0.2.0",
	// Default options for this extension.
	options: {
		map: {
			checkbox: "icon-check-empty",
			checkboxSelected: "icon-check",
			checkboxUnknown: "icon-check icon-muted",
			error: "icon-exclamation-sign",
			expanderClosed: "icon-caret-right",
			expanderLazy: "icon-angle-right",
			expanderOpen: "icon-caret-down",
			doc: "icon-file-alt",
			noExpander: "",
			// Default node icons.
			// (Use tree.options.iconClass(node) callback to define custom icons
			// based on node data)
			docOpen: "icon-file-alt",
			loading: "icon-refresh icon-spin",
			folder: "icon-folder-close-alt",
			folderOpen: "icon-folder-open-alt"
		}
	},

	treeInit: function(ctx){
		var tree = ctx.tree;
		this._superApply(arguments);
		tree.$container.addClass("fancytree-ext-glyph");
	},
	nodeRenderStatus: function(ctx) {
		var icon, span,
			node = ctx.node,
			$span = $(node.span),
			opts = ctx.options.glyph,
			// callback = opts.icon,
			map = opts.map
			// $span = $(node.span)
			;

		this._superApply(arguments);

		if( node.isRoot() ){
			return;
		}
		span = $span.children("span.fancytree-expander").get(0);
		if( span ){
			if( node.isLoading() ){
				icon = "loading";
			}else if( node.expanded ){
				icon = "expanderOpen";
			}else if( node.isUndefined() ){
				icon = "expanderLazy";
			}else if( node.hasChildren() ){
				icon = "expanderClosed";
			}else{
				icon = "noExpander";
			}
			span.className = "fancytree-expander " + map[icon];
		}

		if( node.tr ){
			span = $("td", node.tr).children("span.fancytree-checkbox").get(0);
		}else{
			span = $span.children("span.fancytree-checkbox").get(0);
		}
		if( span ){
			icon = node.selected ? "checkboxSelected" : (node.partsel ? "checkboxUnknown" : "checkbox");
			span.className = "fancytree-checkbox " + map[icon];
		}

		// Icon (note that this does not match .fancytree-custom-icon, that might
		// be set by opts.iconClass)
		span = $span.children("span.fancytree-icon").get(0);
		if( span ){
			if( node.folder ){
				icon = node.expanded ? _getIcon(opts, "folderOpen") : _getIcon(opts, "folder");
			}else{
				icon = node.expanded ? _getIcon(opts, "docOpen") : _getIcon(opts, "doc");
			}
			span.className = "fancytree-icon " + icon;
		}
	},
	nodeSetStatus: function(ctx, status, message, details) {
		var span,
			opts = ctx.options.glyph,
			node = ctx.node;

		this._superApply(arguments);

		if(node.parent){
			span = $("span.fancytree-expander", node.span).get(0);
		}else{
			span = $(".fancytree-statusnode-wait, .fancytree-statusnode-error", node[this.nodeContainerAttrName])
				.find("span.fancytree-expander").get(0);
		}
		if( status === "loading"){
			// $("span.fancytree-expander", ctx.node.span).addClass(_getIcon(opts, "loading"));
			span.className = "fancytree-expander " + _getIcon(opts, "loading");
		}else if( status === "error"){
			span.className = "fancytree-expander " + _getIcon(opts, "error");
		}
	}
});
}(jQuery, window, document));

/*!
 * jquery.fancytree.gridnav.js
 *
 * Support keyboard navigation for trees with embedded input controls.
 * (Extension module for jquery.fancytree.js: https://github.com/mar10/fancytree/)
 *
 * Copyright (c) 2008-2015, Martin Wendt (http://wwWendt.de)
 *
 * Released under the MIT license
 * https://github.com/mar10/fancytree/wiki/LicenseInfo
 *
 * @version 2.8.1
 * @date 2015-03-01T20:28
 */

;(function($, window, document, undefined) {

"use strict";


/*******************************************************************************
 * Private functions and variables
 */

// Allow these navigation keys even when input controls are focused

var	KC = $.ui.keyCode,
	// which keys are *not* handled by embedded control, but passed to tree
	// navigation handler:
	NAV_KEYS = {
		"text": [KC.UP, KC.DOWN],
		"checkbox": [KC.UP, KC.DOWN, KC.LEFT, KC.RIGHT],
		"radiobutton": [KC.UP, KC.DOWN, KC.LEFT, KC.RIGHT],
		"select-one": [KC.LEFT, KC.RIGHT],
		"select-multiple": [KC.LEFT, KC.RIGHT]
	};


/* Calculate TD column index (considering colspans).*/
function getColIdx($tr, $td) {
	var colspan,
		td = $td.get(0),
		idx = 0;

	$tr.children().each(function () {
		if( this === td ) {
			return false;
		}
		colspan = $(this).prop("colspan");
		idx += colspan ? colspan : 1;
	});
	return idx;
}


/* Find TD at given column index (considering colspans).*/
function findTdAtColIdx($tr, colIdx) {
	var colspan,
		res = null,
		idx = 0;

	$tr.children().each(function () {
		if( idx >= colIdx ) {
			res = $(this);
			return false;
		}
		colspan = $(this).prop("colspan");
		idx += colspan ? colspan : 1;
	});
	return res;
}


/* Find adjacent cell for a given direction. Skip empty cells and consider merged cells */
function findNeighbourTd($target, keyCode){
	var $tr, colIdx,
		$td = $target.closest("td"),
		$tdNext = null;

	switch( keyCode ){
		case KC.LEFT:
			$tdNext = $td.prev();
			break;
		case KC.RIGHT:
			$tdNext = $td.next();
			break;
		case KC.UP:
		case KC.DOWN:
			$tr = $td.parent();
			colIdx = getColIdx($tr, $td);
			while( true ) {
				$tr = (keyCode === KC.UP) ? $tr.prev() : $tr.next();
				if( !$tr.length ) {
					break;
				}
				// Skip hidden rows
				if( $tr.is(":hidden") ) {
					continue;
				}
				// Find adjacent cell in the same column
				$tdNext = findTdAtColIdx($tr, colIdx);
				// Skip cells that don't conatain a focusable element
				if( $tdNext && $tdNext.find(":input").length ) {
					break;
				}
			}
			break;
	}
	return $tdNext;
}


/*******************************************************************************
 * Extension code
 */
$.ui.fancytree.registerExtension({
	name: "gridnav",
	version: "0.0.1",
	// Default options for this extension.
	options: {
		autofocusInput:   false,  // Focus first embedded input if node gets activated
		handleCursorKeys: true   // Allow UP/DOWN in inputs to move to prev/next node
	},

	treeInit: function(ctx){
		// gridnav requires the table extension to be loaded before itself
		this._requireExtension("table", true, true);
		this._superApply(arguments);

		this.$container.addClass("fancytree-ext-gridnav");

		// Activate node if embedded input gets focus (due to a click)
		this.$container.on("focusin", function(event){
			var ctx2,
				node = $.ui.fancytree.getNode(event.target);

			if( node && !node.isActive() ){
				// Call node.setActive(), but also pass the event
				ctx2 = ctx.tree._makeHookContext(node, event);
				ctx.tree._callHook("nodeSetActive", ctx2, true);
			}
		});
	},
	nodeSetActive: function(ctx, flag) {
		var $outer,
			opts = ctx.options.gridnav,
			node = ctx.node,
			event = ctx.originalEvent || {},
			triggeredByInput = $(event.target).is(":input");

		flag = (flag !== false);

		this._superApply(arguments);

		if( flag ){
			if( ctx.options.titlesTabbable ){
				if( !triggeredByInput ) {
					$(node.span).find("span.fancytree-title").focus();
					node.setFocus();
				}
				// If one node is tabbable, the container no longer needs to be
				ctx.tree.$container.attr("tabindex", "-1");
				// ctx.tree.$container.removeAttr("tabindex");
			} else if( opts.autofocusInput && !triggeredByInput ){
				// Set focus to input sub input (if node was clicked, but not
				// when TAB was pressed )
				$outer = $(node.tr || node.span);
				$outer.find(":input:enabled:first").focus();
			}
		}
	},
	nodeKeydown: function(ctx) {
		var inputType, handleKeys, $td,
			opts = ctx.options.gridnav,
			event = ctx.originalEvent,
			$target = $(event.target);

		// jQuery
		inputType = $target.is(":input:enabled") ? $target.prop("type") : null;
//		ctx.tree.debug("ext-gridnav nodeKeydown", event, inputType);

		if( inputType && opts.handleCursorKeys ){
			handleKeys = NAV_KEYS[inputType];
			if( handleKeys && $.inArray(event.which, handleKeys) >= 0 ){
				$td = findNeighbourTd($target, event.which);
				// ctx.node.debug("ignore keydown in input", event.which, handleKeys);
				if( $td && $td.length ) {
					$td.find(":input:enabled").focus();
					// Prevent Fancytree default navigation
					return false;
				}
			}
			return true;
		}
		// ctx.tree.debug("ext-gridnav NOT HANDLED", event, inputType);
		return this._superApply(arguments);
	}
});
}(jQuery, window, document));

/*!
 * jquery.fancytree.persist.js
 *
 * Persist tree status in cookiesRemove or highlight tree nodes, based on a filter.
 * (Extension module for jquery.fancytree.js: https://github.com/mar10/fancytree/)
 *
 * @depends: jquery.cookie.js
 *
 * Copyright (c) 2008-2015, Martin Wendt (http://wwWendt.de)
 *
 * Released under the MIT license
 * https://github.com/mar10/fancytree/wiki/LicenseInfo
 *
 * @version 2.8.1
 * @date 2015-03-01T20:28
 */

;(function($, window, document, undefined) {

"use strict";


/*******************************************************************************
 * Private functions and variables
 */
var _assert = $.ui.fancytree.assert,
	ACTIVE = "active",
	EXPANDED = "expanded",
	FOCUS = "focus",
	SELECTED = "selected";


/* Recursively load lazy nodes
 * @param {string} mode 'load', 'expand', false
 */
function _loadLazyNodes(tree, local, keyList, mode, dfd) {
	var i, key, l, node,
		foundOne = false,
		deferredList = [],
		missingKeyList = [];

	keyList = keyList || [];
	dfd = dfd || $.Deferred();

	for( i=0, l=keyList.length; i<l; i++ ) {
		key = keyList[i];
		node = tree.getNodeByKey(key);
		if( node ) {
			if( mode && node.isUndefined() ) {
				foundOne = true;
				tree.debug("_loadLazyNodes: " + node + " is lazy: loading...");
				if( mode === "expand" ) {
					deferredList.push(node.setExpanded());
				} else {
					deferredList.push(node.load());
				}
			} else {
				tree.debug("_loadLazyNodes: " + node + " already loaded.");
				node.setExpanded();
			}
		} else {
			missingKeyList.push(key);
			tree.debug("_loadLazyNodes: " + node + " was not yet found.");
		}
	}

	$.when.apply($, deferredList).always(function(){
		// All lazy-expands have finished
		if( foundOne && missingKeyList.length > 0 ) {
			// If we read new nodes from server, try to resolve yet-missing keys
			_loadLazyNodes(tree, local, missingKeyList, mode, dfd);
		} else {
			if( missingKeyList.length ) {
				tree.warn("_loadLazyNodes: could not load those keys: ", missingKeyList);
				for( i=0, l=missingKeyList.length; i<l; i++ ) {
					key = keyList[i];
					local._appendKey(EXPANDED, keyList[i], false);
				}
			}
			dfd.resolve();
		}
	});
	return dfd;
}


/**
 * [ext-persist] Remove persistence cookies of the given type(s).
 * Called like
 *     $("#tree").fancytree("getTree").clearCookies("active expanded focus selected");
 *
 * @alias Fancytree#clearCookies
 * @requires jquery.fancytree.persist.js
 */
$.ui.fancytree._FancytreeClass.prototype.clearCookies = function(types){
	var local = this.ext.persist,
		prefix = local.cookiePrefix;

	types = types || "active expanded focus selected";
	if(types.indexOf(ACTIVE) >= 0){
		local._data(prefix + ACTIVE, null);
	}
	if(types.indexOf(EXPANDED) >= 0){
		local._data(prefix + EXPANDED, null);
	}
	if(types.indexOf(FOCUS) >= 0){
		local._data(prefix + FOCUS, null);
	}
	if(types.indexOf(SELECTED) >= 0){
		local._data(prefix + SELECTED, null);
	}
};


/**
 * [ext-persist] Return persistence information from cookies
 *
 * Called like
 *     $("#tree").fancytree("getTree").getPersistData();
 *
 * @alias Fancytree#getPersistData
 * @requires jquery.fancytree.persist.js
 */
$.ui.fancytree._FancytreeClass.prototype.getPersistData = function(){
	var local = this.ext.persist,
		prefix = local.cookiePrefix,
		delim = local.cookieDelimiter,
		res = {};

	res[ACTIVE] = local._data(prefix + ACTIVE);
	res[EXPANDED] = (local._data(prefix + EXPANDED) || "").split(delim);
	res[SELECTED] = (local._data(prefix + SELECTED) || "").split(delim);
	res[FOCUS] = local._data(prefix + FOCUS);
	return res;
};


/* *****************************************************************************
 * Extension code
 */
$.ui.fancytree.registerExtension({
	name: "persist",
	version: "0.3.0",
	// Default options for this extension.
	options: {
		cookieDelimiter: "~",
		cookiePrefix: undefined, // 'fancytree-<treeId>-' by default
		cookie: {
			raw: false,
			expires: "",
			path: "",
			domain: "",
			secure: false
		},
		expandLazy: false,     // true: recursively expand and load lazy nodes
		overrideSource: true,  // true: cookie takes precedence over `source` data attributes.
		store: "auto",         // 'cookie': force cookie, 'local': force localStore, 'session': force sessionStore
		types: "active expanded focus selected"
	},

	/* Generic read/write string data to cookie, sessionStorage or localStorage. */
	_data: function(key, value){
		var ls = this._local.localStorage; // null, sessionStorage, or localStorage

		if( value === undefined ) {
			return ls ? ls.getItem(key) : $.cookie(key);
		} else if ( value === null ) {
			if( ls ) {
				ls.removeItem(key);
			} else {
				$.removeCookie(key);
			}
		} else {
			if( ls ) {
				ls.setItem(key, value);
			} else {
				$.cookie(key, value, this.options.persist.cookie);
			}
		}
	},

	/* Append `key` to a cookie. */
	_appendKey: function(type, key, flag){
		key = "" + key; // #90
		var local = this._local,
			instOpts = this.options.persist,
			delim = instOpts.cookieDelimiter,
			cookieName = local.cookiePrefix + type,
			data = local._data(cookieName),
			keyList = data ? data.split(delim) : [],
			idx = $.inArray(key, keyList);
		// Remove, even if we add a key,  so the key is always the last entry
		if(idx >= 0){
			keyList.splice(idx, 1);
		}
		// Append key to cookie
		if(flag){
			keyList.push(key);
		}
		local._data(cookieName, keyList.join(delim));
	},

	treeInit: function(ctx){
		var tree = ctx.tree,
			opts = ctx.options,
			local = this._local,
			instOpts = this.options.persist;

		// For 'auto' or 'cookie' mode, the cookie plugin must be available
		_assert(instOpts.store === "localStore" || $.cookie, "Missing required plugin for 'persist' extension: jquery.cookie.js");

		local.cookiePrefix = instOpts.cookiePrefix || ("fancytree-" + tree._id + "-");
		local.storeActive = instOpts.types.indexOf(ACTIVE) >= 0;
		local.storeExpanded = instOpts.types.indexOf(EXPANDED) >= 0;
		local.storeSelected = instOpts.types.indexOf(SELECTED) >= 0;
		local.storeFocus = instOpts.types.indexOf(FOCUS) >= 0;
		if( instOpts.store === "cookie" || !window.localStorage ) {
			local.localStorage = null;
		} else {
			local.localStorage = (instOpts.store === "local") ? window.localStorage : window.sessionStorage;
		}

		// Bind init-handler to apply cookie state
		tree.$div.bind("fancytreeinit", function(event){
			var cookie, dfd, i, keyList, node,
				prevFocus = local._data(local.cookiePrefix + FOCUS); // record this before node.setActive() overrides it;

			// tree.debug("document.cookie:", document.cookie);

			cookie = local._data(local.cookiePrefix + EXPANDED);
			keyList = cookie && cookie.split(instOpts.cookieDelimiter);

			if( local.storeExpanded ) {
				// Recursively load nested lazy nodes if expandLazy is 'expand' or 'load'
				// Also remove expand-cookies for unmatched nodes
				dfd = _loadLazyNodes(tree, local, keyList, instOpts.expandLazy ? "expand" : false , null);
			} else {
				// nothing to do
				dfd = new $.Deferred().resolve();
			}

			dfd.done(function(){
				if(local.storeSelected){
					cookie = local._data(local.cookiePrefix + SELECTED);
					if(cookie){
						keyList = cookie.split(instOpts.cookieDelimiter);
						for(i=0; i<keyList.length; i++){
							node = tree.getNodeByKey(keyList[i]);
							if(node){
								if(node.selected === undefined || instOpts.overrideSource && (node.selected === false)){
//									node.setSelected();
									node.selected = true;
									node.renderStatus();
								}
							}else{
								// node is no longer member of the tree: remove from cookie also
								local._appendKey(SELECTED, keyList[i], false);
							}
						}
					}
					// In selectMode 3 we have to fix the child nodes, since we
					// only stored the selected *top* nodes
					if( tree.options.selectMode === 3 ){
						tree.visit(function(n){
							if( n.selected ) {
								n.fixSelection3AfterClick();
								return "skip";
							}
						});
					}
				}
				if(local.storeActive){
					cookie = local._data(local.cookiePrefix + ACTIVE);
					if(cookie && (opts.persist.overrideSource || !tree.activeNode)){
						node = tree.getNodeByKey(cookie);
						if(node){
							node.debug("persist: set active", cookie);
							// We only want to set the focus if the container
							// had the keyboard focus before
							node.setActive(true, {noFocus: true});
						}
					}
				}
				if(local.storeFocus && prevFocus){
					node = tree.getNodeByKey(prevFocus);
					if(node){
						// node.debug("persist: set focus", cookie);
						if( tree.options.titlesTabbable ) {
							$(node.span).find(".fancytree-title").focus();
						} else {
							$(tree.$container).focus();
						}
						// node.setFocus();
					}
				}
				tree._triggerTreeEvent("restore", null, {});
			});
		});
		// Init the tree
		return this._superApply(arguments);
	},
	nodeSetActive: function(ctx, flag, opts) {
		var res,
			local = this._local;

		flag = (flag !== false);
		res = this._superApply(arguments);

		if(local.storeActive){
			local._data(local.cookiePrefix + ACTIVE, this.activeNode ? this.activeNode.key : null);
		}
		return res;
	},
	nodeSetExpanded: function(ctx, flag, opts) {
		var res,
			node = ctx.node,
			local = this._local;

		flag = (flag !== false);
		res = this._superApply(arguments);

		if(local.storeExpanded){
			local._appendKey(EXPANDED, node.key, flag);
		}
		return res;
	},
	nodeSetFocus: function(ctx, flag) {
		var res,
			local = this._local;

		flag = (flag !== false);
		res = this._superApply(arguments);

		if( local.storeFocus ) {
			local._data(local.cookiePrefix + FOCUS, this.focusNode ? this.focusNode.key : null);
		}
		return res;
	},
	nodeSetSelected: function(ctx, flag) {
		var res, selNodes,
			tree = ctx.tree,
			node = ctx.node,
			local = this._local;

		flag = (flag !== false);
		res = this._superApply(arguments);

		if(local.storeSelected){
			if( tree.options.selectMode === 3 ){
				// In selectMode 3 we only store the the selected *top* nodes.
				// De-selecting a node may also de-select some parents, so we
				// calculate the current status again
				selNodes = $.map(tree.getSelectedNodes(true), function(n){
					return n.key;
				});
				selNodes = selNodes.join(ctx.options.persist.cookieDelimiter);
				local._data(local.cookiePrefix + SELECTED, selNodes);
			} else {
				local._appendKey(SELECTED, node.key, flag);
			}
		}
		return res;
	}
});
}(jQuery, window, document));

/*!
 * jquery.fancytree.table.js
 *
 * Render tree as table (aka 'treegrid', 'tabletree').
 * (Extension module for jquery.fancytree.js: https://github.com/mar10/fancytree/)
 *
 * Copyright (c) 2008-2015, Martin Wendt (http://wwWendt.de)
 *
 * Released under the MIT license
 * https://github.com/mar10/fancytree/wiki/LicenseInfo
 *
 * @version 2.8.1
 * @date 2015-03-01T20:28
 */

;(function($, window, document, undefined) {

"use strict";

/* *****************************************************************************
 * Private functions and variables
 */
function _assert(cond, msg){
	msg = msg || "";
	if(!cond){
		$.error("Assertion failed " + msg);
	}
}

function insertSiblingAfter(referenceNode, newNode) {
	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

/* Show/hide all rows that are structural descendants of `parent`. */
function setChildRowVisibility(parent, flag) {
	parent.visit(function(node){
		var tr = node.tr;
		// currentFlag = node.hide ? false : flag; // fix for ext-filter
		if(tr){
			tr.style.display = (node.hide || !flag) ? "none" : "";
		}
		if(!node.expanded){
			return "skip";
		}
	});
}

/* Find node that is rendered in previous row. */
function findPrevRowNode(node){
	var i, last, prev,
		parent = node.parent,
		siblings = parent ? parent.children : null;

	if(siblings && siblings.length > 1 && siblings[0] !== node){
		// use the lowest descendant of the preceeding sibling
		i = $.inArray(node, siblings);
		prev = siblings[i - 1];
		_assert(prev.tr);
		// descend to lowest child (with a <tr> tag)
		while(prev.children){
			last = prev.children[prev.children.length - 1];
			if(!last.tr){
				break;
			}
			prev = last;
		}
	}else{
		// if there is no preceding sibling, use the direct parent
		prev = parent;
	}
	return prev;
}


$.ui.fancytree.registerExtension({
	name: "table",
	version: "0.2.1",
	// Default options for this extension.
	options: {
		checkboxColumnIdx: null, // render the checkboxes into the this column index (default: nodeColumnIdx)
		customStatus: false,	 // true: generate renderColumns events for status nodes
		indentation: 16,         // indent every node level by 16px
		nodeColumnIdx: 0         // render node expander, icon, and title to this column (default: #0)
	},
	// Overide virtual methods for this extension.
	// `this`       : is this extension object
	// `this._super`: the virtual function that was overriden (member of prev. extension or Fancytree)
	treeInit: function(ctx){
		var i, $row, tdRole,
			tree = ctx.tree,
			$table = tree.widget.element;

		$table.addClass("fancytree-container fancytree-ext-table");
		tree.tbody = $table.find("> tbody")[0];
		tree.columnCount = $("thead >tr >th", $table).length;
		$(tree.tbody).empty();

		tree.rowFragment = document.createDocumentFragment();
		$row = $("<tr />");
		tdRole = "";
		if(ctx.options.aria){
			$row.attr("role", "row");
			tdRole = " role='gridcell'";
		}
		for(i=0; i<tree.columnCount; i++) {
			if(ctx.options.table.nodeColumnIdx === i){
				$row.append("<td" + tdRole + "><span class='fancytree-node' /></td>");
			}else{
				$row.append("<td" + tdRole + " />");
			}
		}
		tree.rowFragment.appendChild($row.get(0));

		// Make sure that status classes are set on the node's <tr> elements
		tree.statusClassPropName = "tr";
		tree.ariaPropName = "tr";
		this.nodeContainerAttrName = "tr";

		this._superApply(arguments);

		// standard Fancytree created a root UL
		$(tree.rootNode.ul).remove();
		tree.rootNode.ul = null;
		tree.$container = $table;
		// Add container to the TAB chain
		this.$container.attr("tabindex", this.options.tabbable ? "0" : "-1");
		if(this.options.aria){
			tree.$container
				.attr("role", "treegrid")
				.attr("aria-readonly", true);
		}
	},
	/* Called by nodeRender to sync node order with tag order.*/
//    nodeFixOrder: function(ctx) {
//    },
	nodeRemoveChildMarkup: function(ctx) {
		var node = ctx.node;
//		node.debug("nodeRemoveChildMarkup()");
		node.visit(function(n){
			if(n.tr){
				$(n.tr).remove();
				n.tr = null;
			}
		});
	},
	nodeRemoveMarkup: function(ctx) {
		var node = ctx.node;
//		node.debug("nodeRemoveMarkup()");
		if(node.tr){
			$(node.tr).remove();
			node.tr = null;
		}
		this.nodeRemoveChildMarkup(ctx);
	},
	/* Override standard render. */
	nodeRender: function(ctx, force, deep, collapsed, _recursive) {
		var children, firstTr, i, l, newRow, prevNode, prevTr, subCtx,
			tree = ctx.tree,
			node = ctx.node,
			opts = ctx.options,
			isRootNode = !node.parent;

		if( !_recursive ){
			ctx.hasCollapsedParents = node.parent && !node.parent.expanded;
		}
		// $.ui.fancytree.debug("*** nodeRender " + node + ", isRoot=" + isRootNode, "tr=" + node.tr, "hcp=" + ctx.hasCollapsedParents, "parent.tr=" + (node.parent && node.parent.tr));
		if( !isRootNode ){
			if(!node.tr){
				if( ctx.hasCollapsedParents /*&& !node.parent.tr*/ ) {
					// #166: we assume that the parent will be (recursively) rendered
					// later anyway.
					node.debug("nodeRender ignored due to unrendered parent");
					return;
				}
				// Create new <tr> after previous row
				newRow = tree.rowFragment.firstChild.cloneNode(true);
				prevNode = findPrevRowNode(node);
				// $.ui.fancytree.debug("*** nodeRender " + node + ": prev: " + prevNode.key);
				_assert(prevNode);
				if(collapsed === true && _recursive){
					// hide all child rows, so we can use an animation to show it later
					newRow.style.display = "none";
				}else if(deep && ctx.hasCollapsedParents){
					// also hide this row if deep === true but any parent is collapsed
					newRow.style.display = "none";
//					newRow.style.color = "red";
				}
				if(!prevNode.tr){
					_assert(!prevNode.parent, "prev. row must have a tr, or is system root");
					tree.tbody.appendChild(newRow);
				}else{
					insertSiblingAfter(prevNode.tr, newRow);
				}
				node.tr = newRow;
				if( node.key && opts.generateIds ){
					node.tr.id = opts.idPrefix + node.key;
				}
				node.tr.ftnode = node;
				if(opts.aria){
					// TODO: why doesn't this work:
//                  node.li.role = "treeitem";
					$(node.tr).attr("aria-labelledby", "ftal_" + node.key);
				}
				node.span = $("span.fancytree-node", node.tr).get(0);
				// Set icon, link, and title (normally this is only required on initial render)
				this.nodeRenderTitle(ctx);
				// Allow tweaking, binding, after node was created for the first time
//				tree._triggerNodeEvent("createNode", ctx);
				if ( opts.createNode ){
					opts.createNode.call(tree, {type: "createNode"}, ctx);
				}
			} else {
				if( force ) {
					// Set icon, link, and title (normally this is only required on initial render)
					this.nodeRenderTitle(ctx); // triggers renderColumns()
				} else {
					// Update element classes according to node state
					this.nodeRenderStatus(ctx);
				}
			}
		}
		// Allow tweaking after node state was rendered
//		tree._triggerNodeEvent("renderNode", ctx);
		if ( opts.renderNode ){
			opts.renderNode.call(tree, {type: "renderNode"}, ctx);
		}
		// Visit child nodes
		// Add child markup
		children = node.children;
		if(children && (isRootNode || deep || node.expanded)){
			for(i=0, l=children.length; i<l; i++) {
				subCtx = $.extend({}, ctx, {node: children[i]});
				subCtx.hasCollapsedParents = subCtx.hasCollapsedParents || !node.expanded;
				this.nodeRender(subCtx, force, deep, collapsed, true);
			}
		}
		// Make sure, that <tr> order matches node.children order.
		if(children && !_recursive){ // we only have to do it once, for the root branch
			prevTr = node.tr || null;
			firstTr = tree.tbody.firstChild;
			// Iterate over all descendants
			node.visit(function(n){
				if(n.tr){
					if(!n.parent.expanded && n.tr.style.display !== "none"){
						// fix after a node was dropped over a collapsed
						n.tr.style.display = "none";
						setChildRowVisibility(n, false);
					}
					if(n.tr.previousSibling !== prevTr){
						node.debug("_fixOrder: mismatch at node: " + n);
						var nextTr = prevTr ? prevTr.nextSibling : firstTr;
						tree.tbody.insertBefore(n.tr, nextTr);
					}
					prevTr = n.tr;
				}
			});
		}
		// Update element classes according to node state
		// if(!isRootNode){
		// 	this.nodeRenderStatus(ctx);
		// }
	},
	nodeRenderTitle: function(ctx, title) {
		var $cb,
			node = ctx.node,
			opts = ctx.options;

		this._superApply(arguments);
		// Move checkbox to custom column
		if(opts.checkbox && opts.table.checkboxColumnIdx != null ){
			$cb = $("span.fancytree-checkbox", node.span).detach();
			$(node.tr).find("td").eq(+opts.table.checkboxColumnIdx).html($cb);
		}
		// Update element classes according to node state
		if( ! node.isRoot() ){
			this.nodeRenderStatus(ctx);
		}
		if( !opts.table.customStatus && node.isStatusNode() ) {
			// default rendering for status node: leave other cells empty
		} else if ( opts.renderColumns ) {
			// Let user code write column content
			opts.renderColumns.call(ctx.tree, {type: "renderColumns"}, ctx);
		}
	},
	nodeRenderStatus: function(ctx) {
		var indent,
			node = ctx.node,
			opts = ctx.options;

		this._superApply(arguments);

		$(node.tr).removeClass("fancytree-node");
		// indent
		indent = (node.getLevel() - 1) * opts.table.indentation;
		$(node.span).css({marginLeft: indent + "px"});
	 },
	/* Expand node, return Deferred.promise. */
	nodeSetExpanded: function(ctx, flag, opts) {
		var dfd = new $.Deferred(),
			subOpts = $.extend({}, opts, {noEvents: true, noAnimation: true});

		opts = opts || {};

		function _afterExpand(ok) {
			flag = (flag !== false);
			setChildRowVisibility(ctx.node, flag);
			if( ok ) {
				if( flag && ctx.options.autoScroll && !opts.noAnimation && ctx.node.hasChildren() ) {
					// Scroll down to last child, but keep current node visible
					ctx.node.getLastChild().scrollIntoView(true, {topNode: ctx.node}).always(function(){
						if( !opts.noEvents ) {
							ctx.tree._triggerNodeEvent(flag ? "expand" : "collapse", ctx);
						}
						dfd.resolveWith(ctx.node);
					});
				} else {
					if( !opts.noEvents ) {
						ctx.tree._triggerNodeEvent(flag ? "expand" : "collapse", ctx);
					}
					dfd.resolveWith(ctx.node);
				}
			} else {
				if( !opts.noEvents ) {
					ctx.tree._triggerNodeEvent(flag ? "expand" : "collapse", ctx);
				}
				dfd.rejectWith(ctx.node);
			}
		}
		// Call base-expand with disabled  events and animation
		this._super(ctx, flag, subOpts).done(function () {
			_afterExpand(true);
		}).fail(function () {
			_afterExpand(false);
		});
		return dfd.promise();
	},
	nodeSetStatus: function(ctx, status, message, details) {
		if(status === "ok"){
			var node = ctx.node,
				firstChild = ( node.children ? node.children[0] : null );
			if ( firstChild && firstChild.isStatusNode() ) {
				$(firstChild.tr).remove();
			}
		}
		return this._superApply(arguments);
	},
	treeClear: function(ctx) {
		this.nodeRemoveChildMarkup(this._makeHookContext(this.rootNode));
		return this._superApply(arguments);
	}
	/*,
	treeSetFocus: function(ctx, flag) {
//	        alert("treeSetFocus" + ctx.tree.$container);
		ctx.tree.$container.focus();
		$.ui.fancytree.focusTree = ctx.tree;
	}*/
});
}(jQuery, window, document));

/*!
 * jquery.fancytree.themeroller.js
 *
 * Enable jQuery UI ThemeRoller styles.
 * (Extension module for jquery.fancytree.js: https://github.com/mar10/fancytree/)
 *
 * @see http://jqueryui.com/themeroller/
 *
 * Copyright (c) 2008-2015, Martin Wendt (http://wwWendt.de)
 *
 * Released under the MIT license
 * https://github.com/mar10/fancytree/wiki/LicenseInfo
 *
 * @version 2.8.1
 * @date 2015-03-01T20:28
 */

;(function($, window, document, undefined) {

"use strict";

/*******************************************************************************
 * Extension code
 */
$.ui.fancytree.registerExtension({
	name: "themeroller",
	version: "0.0.1",
	// Default options for this extension.
	options: {
		activeClass: "ui-state-active",
		foccusClass: "ui-state-focus",
		hoverClass: "ui-state-hover",
		selectedClass: "ui-state-highlight"
	},

	treeInit: function(ctx){
		this._superApply(arguments);
		var $el = ctx.widget.element;

		if($el[0].nodeName === "TABLE"){
			$el.addClass("ui-widget ui-corner-all");
			$el.find(">thead tr").addClass("ui-widget-header");
			$el.find(">tbody").addClass("ui-widget-conent");
		}else{
			$el.addClass("ui-widget ui-widget-content ui-corner-all");
		}

		$el.delegate(".fancytree-node", "mouseenter mouseleave", function(event){
			var node = $.ui.fancytree.getNode(event.target),
				flag = (event.type === "mouseenter");
			node.debug("hover: " + flag);
			$(node.span).toggleClass("ui-state-hover ui-corner-all", flag);
		});
	},
	treeDestroy: function(ctx){
		this._superApply(arguments);
		ctx.widget.element.removeClass("ui-widget ui-widget-content ui-corner-all");
	},
	nodeRenderStatus: function(ctx){
		var node = ctx.node,
			$el = $(node.span);
		this._superApply(arguments);
/*
		.ui-state-highlight: Class to be applied to highlighted or selected elements. Applies "highlight" container styles to an element and its child text, links, and icons.
		.ui-state-error: Class to be applied to error messaging container elements. Applies "error" container styles to an element and its child text, links, and icons.
		.ui-state-error-text: An additional class that applies just the error text color without background. Can be used on form labels for instance. Also applies error icon color to child icons.

		.ui-state-default: Class to be applied to clickable button-like elements. Applies "clickable default" container styles to an element and its child text, links, and icons.
		.ui-state-hover: Class to be applied on mouseover to clickable button-like elements. Applies "clickable hover" container styles to an element and its child text, links, and icons.
		.ui-state-focus: Class to be applied on keyboard focus to clickable button-like elements. Applies "clickable hover" container styles to an element and its child text, links, and icons.
		.ui-state-active: Class to be applied on mousedown to clickable button-like elements. Applies "clickable active" container styles to an element and its child text, links, and icons.
*/
		$el.toggleClass("ui-state-active", node.isActive());
		$el.toggleClass("ui-state-focus", node.hasFocus());
		$el.toggleClass("ui-state-highlight", node.isSelected());
//		node.debug("ext-themeroller.nodeRenderStatus: ", node.span.className);
	}
});
}(jQuery, window, document));

/*!
 * jquery.fancytree.wide.js
 * Support for 100% wide selection bars.
 * (Extension module for jquery.fancytree.js: https://github.com/mar10/fancytree/)
 *
 * Copyright (c) 2008-2015, Martin Wendt (http://wwWendt.de)
 *
 * Released under the MIT license
 * https://github.com/mar10/fancytree/wiki/LicenseInfo
 *
 * @version 2.8.1
 * @date 2015-03-01T20:28
 */

;(function($, window, document, undefined) {

"use strict";

var reNumUnit = /^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/; // split "1.5em" to ["1.5", "em"]

/*******************************************************************************
 * Private functions and variables
 */
// var _assert = $.ui.fancytree.assert;

/* Calculate inner width without scrollbar */
// function realInnerWidth($el) {
// 	// http://blog.jquery.com/2012/08/16/jquery-1-8-box-sizing-width-csswidth-and-outerwidth/
// //	inst.contWidth = parseFloat(this.$container.css("width"), 10);
// 	// 'Client width without scrollbar' - 'padding'
// 	return $el[0].clientWidth - ($el.innerWidth() -  parseFloat($el.css("width"), 10));
// }

/* Create a global embedded CSS style for the tree. */
function defineHeadStyleElement(id, cssText) {
	id = "fancytree-style-" + id;
	var $headStyle = $("#" + id);

	if( !cssText ) {
		$headStyle.remove();
		return null;
	}
	if( !$headStyle.length ) {
		$headStyle = $("<style />")
			.attr("id", id)
			.addClass("fancytree-style")
			.prop("type", "text/css")
			.appendTo("head");
	}
	try {
		$headStyle.html(cssText);
	} catch ( e ) {
		// fix for IE 6-8
		$headStyle[0].styleSheet.cssText = cssText;
	}
	return $headStyle;
}

/* Calculate the CSS rules that indent title spans. */
function renderLevelCss(containerId, depth, levelOfs, lineOfs, measureUnit) {
	var i,
		prefix = "#" + containerId + " span.fancytree-level-",
		rules = [];

	for(i = 0; i < depth; i++) {
		rules.push(prefix + (i + 1) + " span.fancytree-title { padding-left: " +
			(i * levelOfs + lineOfs) + measureUnit + "; }");
	}
	// Some UI animations wrap the UL inside a DIV and set position:relative on both.
	// This breaks the left:0 and padding-left:nn settings of the title
	rules.push("#" + containerId +
		" div.ui-effects-wrapper ul li span.fancytree-title " +
		"{ padding-left: 3px; position: static; width: auto; }");
	return rules.join("\n");
}


// /**
//  * [ext-wide] Recalculate the width of the selection bar after the tree container
//  * was resized.<br>
//  * May be called explicitly on container resize, since there is no resize event
//  * for DIV tags.
//  *
//  * @alias Fancytree#wideUpdate
//  * @requires jquery.fancytree.wide.js
//  */
// $.ui.fancytree._FancytreeClass.prototype.wideUpdate = function(){
// 	var inst = this.ext.wide,
// 		prevCw = inst.contWidth,
// 		prevLo = inst.lineOfs;

// 	inst.contWidth = realInnerWidth(this.$container);
// 	// Each title is precceeded by 2 or 3 icons (16px + 3 margin)
// 	//     + 1px title border and 3px title padding
// 	// TODO: use code from treeInit() below
// 	inst.lineOfs = (this.options.checkbox ? 3 : 2) * 19;
// 	if( prevCw !== inst.contWidth || prevLo !== inst.lineOfs ) {
// 		this.debug("wideUpdate: " + inst.contWidth);
// 		this.visit(function(node){
// 			node.tree._callHook("nodeRenderTitle", node);
// 		});
// 	}
// };

/*******************************************************************************
 * Extension code
 */
$.ui.fancytree.registerExtension({
	name: "wide",
	version: "0.0.3",
	// Default options for this extension.
	options: {
		iconWidth: null,  // Adjust this if @fancy-icon-width != "16px"
		iconSpacing: null, // Adjust this if @fancy-icon-spacing != "3px"
		levelOfs: null    // Adjust this if ul padding != "16px"
	},

	treeCreate: function(ctx){
		this._superApply(arguments);
		this.$container.addClass("fancytree-ext-wide");

		var containerId, cssText, iconSpacingUnit, iconWidthUnit, levelOfsUnit,
			instOpts = ctx.options.wide,
			// css sniffing
			$dummyLI = $("<li id='fancytreeTemp'><span class='fancytree-node'><span class='fancytree-icon' /><span class='fancytree-title' /></span><ul />")
				.appendTo(ctx.tree.$container),
			$dummyIcon = $dummyLI.find(".fancytree-icon"),
			$dummyUL = $dummyLI.find("ul"),
			// $dummyTitle = $dummyLI.find(".fancytree-title"),
			iconSpacing = instOpts.iconSpacing || $dummyIcon.css("margin-left"),
			iconWidth = instOpts.iconWidth || $dummyIcon.css("width"),
			levelOfs = instOpts.levelOfs || $dummyUL.css("padding-left");

		$dummyLI.remove();

		iconSpacingUnit = iconSpacing.match(reNumUnit)[2];
		iconSpacing = parseFloat(iconSpacing, 10);
		iconWidthUnit = iconWidth.match(reNumUnit)[2];
		iconWidth = parseFloat(iconWidth, 10);
		levelOfsUnit = levelOfs.match(reNumUnit)[2];
		if( iconSpacingUnit !== iconWidthUnit || levelOfsUnit !== iconWidthUnit ) {
			$.error("iconWidth, iconSpacing, and levelOfs must have the same css measure unit");
		}
		this._local.measureUnit = iconWidthUnit;
		this._local.levelOfs = parseFloat(levelOfs);
		this._local.lineOfs = (ctx.options.checkbox ? 3 : 2) * (iconWidth + iconSpacing) + iconSpacing;
		this._local.maxDepth = 10;

		// Get/Set a unique Id on the container (if not already exists)
		containerId = this.$container.uniqueId().attr("id");
		// Generated css rules for some levels (extended on demand)
		cssText = renderLevelCss(containerId, this._local.maxDepth,
			this._local.levelOfs, this._local.lineOfs, this._local.measureUnit);
		defineHeadStyleElement(containerId, cssText);
	},
	treeDestroy: function(ctx){
		// Remove generated css rules
		defineHeadStyleElement(this.$container.attr("id"), null);
		return this._superApply(arguments);
	},
	nodeRenderStatus: function(ctx) {
		var containerId, cssText, res,
			node = ctx.node,
			level = node.getLevel();

		res = this._superApply(arguments);
		// Generate some more level-n rules if required
		if( level > this._local.maxDepth ) {
			containerId = this.$container.attr("id");
			this._local.maxDepth *= 2;
			node.debug("Define global ext-wide css up to level " + this._local.maxDepth);
			cssText = renderLevelCss(containerId, this._local.maxDepth,
				this._local.levelOfs, this._local.lineOfs, this._local.measureUnit);
			defineHeadStyleElement(containerId, cssText);
		}
		// Add level-n class to apply indentation padding.
		// (Setting element style would not work, since it cannot easily be
		// overriden while animations run)
		$(node.span).addClass("fancytree-level-" + level);
		return res;
	}
});
}(jQuery, window, document));
