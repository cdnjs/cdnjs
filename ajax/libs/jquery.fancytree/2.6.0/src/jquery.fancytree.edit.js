/*!
 * jquery.fancytree.edit.js
 *
 * Make node titles editable.
 * (Extension module for jquery.fancytree.js: https://github.com/mar10/fancytree/)
 *
 * Copyright (c) 2014, Martin Wendt (http://wwWendt.de)
 *
 * Released under the MIT license
 * https://github.com/mar10/fancytree/wiki/LicenseInfo
 *
 * @version 2.6.0
 * @date 2014-11-29T08:33
 */

;(function($, window, document, undefined) {

"use strict";


/*******************************************************************************
 * Private functions and variables
 */

var isMac = /Mac/.test(navigator.platform),
	escapeHtml = $.ui.fancytree.escapeHtml,
	unescapeHtml = $.ui.fancytree.unescapeHtml;
	// modifiers = {shift: "shiftKey", ctrl: "ctrlKey", alt: "altKey", meta: "metaKey"},
	// specialKeys = {
	// 	8: "backspace", 9: "tab", 10: "return", 13: "return", 16: "shift", 17: "ctrl", 18: "alt", 19: "pause",
	// 	20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home",
	// 	37: "left", 38: "up", 39: "right", 40: "down", 45: "insert", 46: "del",
	// 	96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7",
	// 	104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111 : "/",
	// 	112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8",
	// 	120: "f9", 121: "f10", 122: "f11", 123: "f12", 144: "numlock", 145: "scroll", 186: ";", 191: "/",
	// 	220: "\\", 222: "'", 224: "meta"
	// },
	// shiftNums = {
	// 	"`": "~", "1": "!", "2": "@", "3": "#", "4": "$", "5": "%", "6": "^", "7": "&",
	// 	"8": "*", "9": "(", "0": ")", "-": "_", "=": "+", ";": ": ", "'": "\"", ",": "<",
	// 	".": ">",  "/": "?",  "\\": "|"
	// };


// $.ui.fancytree.isKeydownEvent = function(e, code){
// 	var i, part, partmap, partlist = code.split("+"), len = parts.length;
// 	var c = String.fromCharCode(e.which).toLowerCase();
// 	for( i = 0; i < len; i++ ) {
// 	}
// 	alert (parts.unshift());
// 	alert (parts.unshift());
// 	alert (parts.unshift());
// };


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


// $.ui.fancytree._FancytreeNodeClass.prototype.startEdit = function(){
// 	this.warn("FancytreeNode.startEdit() is deprecated since 2014-01-04. Use .editStart() instead.");
// 	return this.editStart.apply(this, arguments);
// };


// $.ui.fancytree._FancytreeNodeClass.prototype.endEdit = function(){
// 	this.warn("FancytreeNode.endEdit() is deprecated since 2014-01-04. Use .editEnd() instead.");
// 	return this.editEnd.apply(this, arguments);
// };


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
		that = this;

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
			that.editCreateNode(mode, init);
		});
		return;
	}
	newNode = this.addNode(init, mode);
	newNode.makeVisible();
	$(newNode.span).addClass("fancytree-edit-new");
	this.tree.ext.edit.relatedNode = this;
	newNode.editStart();
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
		this._super(ctx);
		this.$container.addClass("fancytree-ext-edit");
	},
	nodeClick: function(ctx) {
		if( $.inArray("shift+click", ctx.options.edit.triggerStart) >= 0 ){
			if( ctx.originalEvent.shiftKey ){
				ctx.node.editStart();
				return false;
			}
		}
		return this._super(ctx);
	},
	nodeDblclick: function(ctx) {
		if( $.inArray("dblclick", ctx.options.edit.triggerStart) >= 0 ){
			ctx.node.editStart();
			return false;
		}
		return this._super(ctx);
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
		return this._super(ctx);
	}
});
}(jQuery, window, document));
