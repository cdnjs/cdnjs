/*!***************************************************
 * jmHighlight
 * Version 2.0.0
 * Copyright (c) 2015, Julian Motz
 * Released under the MIT license
 *****************************************************/
(function (global, factory) {
	'use strict';
	if(typeof define === 'function' && define.amd) {
		// RequireJS. Register as an anonymous module.
		define(['jquery'], function(jQuery) {
			return factory(jQuery, global);
		});
	} else if (typeof exports === 'object') {
		 // Node/CommonJS
		 factory(require('jquery'), global);
	} else {
		// Browser globals
		factory(global.jQuery, global);
	}
})(this, function (jQuery, global_) {
	"use strict";
	
	/**
	 * Map jQuery
	 */
	var $ = jQuery;
	
	/**
	 * For debug purposes
	 */
	var _debug = true;
	
	/**
	 * Default options
	 */
	var defaults = {
		"element": "span",
		"className": "highlight"
	};
	
	/**
	 * Inits the highlight component
	 * 
	 * @param string keyword_
	 * @param jquery-object $context_
	 * @param object options_
	 * @return bool
	 */
	function initHighlight(keyword_, $context_, options_){
		
		if($context_ instanceof $ == false || typeof keyword_ !== "string"
			|| keyword_ == ""){
			return false;
		}
		
		// Get all nodes inside the context, but do not search in nodes
		// that were already highlighted
		var $contextElements = $context_.find("*:not([data-jmHighlight])");
		
		// Filter elements
		if(typeof options_["filter"] !== "undefined"){
			var tmp = filter($contextElements, options_["filter"]);
			if(tmp != false){
				$contextElements = tmp;
			}
		}
		
		// Highlight elements
		highlight(keyword_, $contextElements, options_);
		
		return true;
		
	}
	
	/**
	 * Inits the remove highlight component
	 * 
	 * @param jquery-object $context_
	 * @param string keyword_ (optional)
	 */
	function initRemoveHighlight($context_, options_, keyword_){
		
		if(typeof $context_ === "undefined" || $context_ instanceof $ == false){
			return false;
		}
		
		// Get all nodes inside the context
		var $contextElements = $context_.find("*:not([data-jmHighlight])");
		
		// Filter elements
		if(typeof options_["filter"] !== "undefined"){
			var tmp = filter($contextElements, options_["filter"]);
			if(tmp != false){
				$contextElements = tmp;
			}
		}
		
		// Remove highlight
		removeHighlight($contextElements, options_, keyword_);
		
		return true;
		
	}
	
	/**
	 * Highlights a keyword in a stack of elements
	 * 
	 * @param string keyword_
	 * @param jquery-object $elements_
	 * @param object options
	 * 			* element
	 * 			* className
	 * @return bool
	 */
	function highlight(keyword_, $elements_, options_){
		
		if($elements_ instanceof $ == false || $elements_.length == 0
			|| typeof keyword_ !== "string" || keyword_ == ""){
			return false;
		}
		
		if(_debug){
			console.log("Highlighting keyword '" + keyword_ + "' in elements:");
			console.log($elements_);
		}
		
		if(typeof options_ !== "object"){
			options_ = {};
		}
		if(typeof options_["element"] !== "string"){
			options_["element"] = defaults["element"];
		}
		if(typeof options_["className"] !== "string"){
			options_["className"] = defaults["highlight"];
		}
		
		// Iterate over all text nodes and replace
		// the search keyword after finding (case insensitive)
		forEachTextNodes($elements_, function(node_){
			
			var node = node_;
			if(node.nodeValue.toLowerCase().indexOf(keyword_.toLowerCase()) == -1){
				return true;
			}
			var tagO = "<" + options_["element"] + " class='" + options_["className"] +
						"' data-jmHighlight='true'>";
			var tagC = "</" + options_["element"] + ">";
			if(node.parentNode != null){
				var regex = new RegExp(keyword_, "gi");
				// Save the original keyword before replacing since
				// the original keyword may contain some letters upper/lower-case.
				// The keyword maybe not.
				var originalKeyword = regex.exec(node.parentNode.innerHTML)[0];
				node.parentNode.innerHTML = node.parentNode.innerHTML.replace(
					regex,
					tagO + originalKeyword + tagC
				);
			}
			
		});
		
		return true;
		
	}
	
	/**
	 * Removes the highlight in a stack of elements. The keyword
	 * is optional. If none is defined, every keywords will be removed.
	 * 
	 * @param jquery-object $elements_
	 * @param object options
	 * 			* element
	 * 			* className
	 * @param string keyword_
	 * @return bool
	 */
	function removeHighlight($elements_, options_, keyword_){
		
		if($elements_ instanceof $ == false || $elements_.length == 0){
			return false;
		}
		
		if(_debug){
			console.log("Remove highlight");
			if(typeof keyword_ === "string" && keyword_ != ""){
				console.log("with keyword: '" + keyword_ + "'");
			}
		}
		
		if(typeof options_ !== "object"){
			options_ = {};
		}
		if(typeof options_["element"] !== "string"){
			options_["element"] = defaults["element"];
		}
		if(typeof options_["className"] !== "string"){
			options_["className"] = defaults["highlight"];
		}
		
		// Iterate over all text nodes
		$elements_.each(function(){
			
			var $this = $(this);
			var $highlightElements = $this.find(
				options_["element"] + "." + options_["className"]
			);
			$highlightElements.each(function(){
				
				var $highlightEl = $(this);
				if(typeof keyword_ === "string" && keyword_ != "" &&
					$highlightEl.text().toLowerCase().indexOf(keyword_.toLowerCase()) == -1){
					return;
				} else {
					// Remove element with his text
					$highlightEl.replaceWith($highlightEl.text());
				}
				
			});
			
		});
		
		return true;
		
	}
	
	/**
	 * Filters elements defined in a array
	 * 
	 * @param jquery-object $elements_
	 * @param array filter_
	 * @return jquery-object or false
	 */
	function filter($elements_, filter_){
		
		// Filter elements if defined
		if(typeof filter_ !== "object" || $elements_ instanceof $ == false){
			return false;
		}
		var $contextElements = $elements_;
		if(Object.prototype.toString.call(filter_) === '[object Array]'){
			$contextElements = $contextElements.filter(function(){
				
				var $this = $(this);
				var filterArr = filter_;
				
				// Check if match in element itself
				var foundInElement = false;
				filterArr.forEach(function(filter){
					// We use is() instead of hasClass() to
					// support complex selectors
					if($this.is(filter)){
						foundInElement = true;
						return;
					}
				});
				if(foundInElement){
					// Delete entry
					return false;
				} else {
					// Remain entry
					return true;
				}
			});
		}
		return $contextElements;
		
	}
	
	/**
	 * Gets non recursive nodes of an element and calls
	 * the callback function on each text node
	 * 
	 * @param jquery-object $elements_
	 * @return boolean
	 */
	function forEachTextNodes($elements_, callbackFn_){
		
		if(typeof $elements_ === "undefined" || $elements_ instanceof $ == false){
			return false;
		}
		if(typeof callbackFn_ !== "function"){
			return false;
		}
		
		// Iterate over all items in the stack
		var $tmp = $elements_.each(function(){
			
			var $this = $(this);
			
			// Get all text nodes of this element (not recursive!)
			var $nodes = $this.contents().filter(function(){
				if(this.nodeType == 3){
					return true;
				} else {
					return false;
				}
			});
			
			// Iterate over that text nodes and call callback
			$nodes.each(function(){
				
				callbackFn_(this);
				
			});
			
		});
		return true;
		
	}
		
	/**
	 * Highlight component for jQuery
	 * 
	 * @return boolean
	 */
	jQuery.fn.jmHighlight = function(keyword_, options_){
		
		return initHighlight(keyword_, $(this), options_);
		
	};
	jQuery.fn.jmRemoveHighlight = function(options_, keyword_){
		
		return initRemoveHighlight($(this), options_, keyword_);
		
	};
	
	
});



