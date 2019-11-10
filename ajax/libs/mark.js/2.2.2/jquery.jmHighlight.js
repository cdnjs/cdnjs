/*!***************************************************
 * jmHighlight
 * Version 2.2.2
 * Copyright (c) 2014-2015, Julian Motz
 * For the full copyright and license information, 
 * please view the LICENSE file that was distributed 
 * with this source code.
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
	 * Default options
	 */
	var _defaults = {
		"debug": false,
		"element": "span",
		"className": "highlight",
		"filter": [],
		"separateWordSearch": false
	};
	
	/**
	 * Init the highlighting component
	 * 
	 * @param string keyword_
	 * @param jquery-object $context_
	 * @param object options_
	 * @return bool
	 */
	function initHighlight(keyword_, $context_, options_){
		
		if($context_ instanceof $ == false || typeof keyword_ !== "string"
			|| keyword_ == ""
		){
			return false;
		}
		
		// Merge defaults with options
		options_ = $.extend({}, _defaults, options_);
		
		// Get all nodes inside the context, but do not search in nodes
		// that were already highlighted
		var $contextElements = $context_.find("*:not([data-jmHighlight])");
		
		// Filter elements if filter is defined
		if(typeof options_ === "object" && typeof options_["filter"] === "object"){
			var tmp = filter($contextElements, options_["filter"]);
			if(tmp != false){
				$contextElements = tmp;
			}
		}
		
		// Highlight elements
		return highlight(keyword_, $contextElements, options_);
		
	}
	
	/**
	 * Init the remove highlighting component
	 * 
	 * @param jquery-object $context_
	 * @param string keyword_ (optional)
	 */
	function initRemoveHighlight($context_, options_, keyword_){
		
		if(typeof $context_ === "undefined" || $context_ instanceof $ == false){
			return false;
		}
		
		// Merge defaults with options
		options_ = $.extend({}, _defaults, options_);
		
		// Get all nodes inside the context
		var $contextElements = $context_.find("*:not([data-jmHighlight])");
		
		// Filter elements if filter is defined
		if(typeof options_ === "object" && typeof options_["filter"] === "object"){
			var tmp = filter($contextElements, options_["filter"]);
			if(tmp != false){
				$contextElements = tmp;
			}
		}
		
		// Remove highlight
		return removeHighlight($contextElements, options_, keyword_);
		
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
			|| typeof keyword_ !== "string" || keyword_ == ""
		){
			return false;
		}
		
		// If there are multiple keywords and separate word search
		// is configured then highlight them
		// all separately
		if(typeof options_["separateWordSearch"] === "boolean"
			&& options_["separateWordSearch"]
		){
			var spl = keyword_.split(" ");
			if(spl.length > 1){
				if(options_["debug"]){
					console.log("Highlighting keywords separately");
				}
				for(var i = 0, length = spl.length; i < length; i++){
					// Call the highlight function for each
					// separate keyword.
					// Don't highlight in already highlighted
					// terms.
					if(highlight(
							spl[i],
							$elements_.filter("*:not([data-jmHighlight])"),
							options_
						) == false){
						return false;
					}
				}
				return true;
			}
		}
		
		if(options_["debug"]){
			console.log("Highlighting keyword '" + keyword_ + "' in elements:");
			console.log($elements_);
		}
		
		// Iterate over all text nodes and replace
		// the search keyword after finding (case insensitive)
		forEachTextNodes($elements_, function(node_){
			
			var node = node_;
			if(typeof node !== "object" || typeof node.nodeValue !== "string"){
				return;
			}
			if(node.nodeValue.toLowerCase().indexOf(keyword_.toLowerCase()) == -1){
				return true;
			}
			if(options_["debug"]){
				console.log(node);
			}
			var tagO = "<" + options_["element"] + " class='" + options_["className"] +
						"' data-jmHighlight='true'>";
			var tagC = "</" + options_["element"] + ">";
			if(node.parentNode != null){
				// Don't search inside HTML tags (e.g. keyword "data"
				// would match because of data-xyz inside HTML tag).
				// Replace it with the original match, e.g. if the 
				// search keyword is "g" replace it with "g" and not "G"
				var regex = new RegExp("((?![^<]*>)" + keyword_ + ")", "gim");
				node.parentNode.innerHTML = node.parentNode.innerHTML.replace(
					regex,
					tagO + "$1" + tagC
				);
			}
			
		});
		
		return true;
		
	}
	
	/**
	 * Removes the highlighting in a stack of elements. The keyword
	 * is optional. If none is defined, all keywords will be removed.
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
		
		if(options_["debug"]){
			if(typeof keyword_ === "string" && keyword_ != ""){
				console.log("Remove highlight with keyword: '" + keyword_ + "'");
			} else {
				console.log("Remove highlight");
			}
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
					// Remove element with this text
					// @notice: When removing the HTML node
					// with just the text, it will remain a separate
					// text node for the replaced text. Because
					// the highlighting finds only text nodes
					// with the whole keyword inside, we need
					// to append the next text node with the text. That will
					// avoid having separate text nodes.
					if($highlightEl.length > 0 
						&& typeof $highlightEl[0] !== "undefined"
						&& $highlightEl[0] != null 
						&& typeof $highlightEl[0].nextSibling !== "undefined"
						&& $highlightEl[0].nextSibling != null 
						&& typeof $highlightEl[0].nextSibling.nodeValue !== "undefined"
						&& $highlightEl[0].nextSibling.nodeValue != null
					){
						$highlightEl[0].nextSibling.nodeValue = $highlightEl.text() +
							$highlightEl[0].nextSibling.nodeValue;
						$highlightEl.remove();
					} else {
						// Just a fallback (it's ok to remain a separate
						// text node if there is no next text node).
						$highlightEl.replaceWith($highlightEl.text());
					}
				}
				
			});
			
		});
		
		return true;
		
	}
	
	/**
	 * Filters elements defined in an array
	 * 
	 * @param jquery-object $elements_
	 * @param array filter_
	 * @return jquery-object or false
	 */
	function filter($elements_, filter_){
		
		// Filter elements if defined
		if(typeof filter_ !== "object" || $elements_ instanceof $ == false
			|| Object.prototype.toString.call(filter_) != '[object Array]'
		){
			return false;
		}
		var $contextElements = $elements_;
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
	 * Highlighting component exposure for jQuery
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



