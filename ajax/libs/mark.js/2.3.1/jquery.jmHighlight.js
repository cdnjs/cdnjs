/*!***************************************************
 * jmHighlight
 * Version 2.3.1
 * Copyright (c) 2014-2015, Julian Motz
 * For the full copyright and license information, 
 * please view the LICENSE file that was distributed 
 * with this source code.
 *****************************************************/
(function (global, factory) {
	"use strict";
	if(typeof define === "function" && define.amd) {
		// RequireJS. Register as an anonymous module.
		define(["jquery"], function(jQuery) {
			return factory(jQuery, global);
		});
	} else if (typeof exports === "object") {
		 // Node/CommonJS
		 factory(require("jquery"), global);
	} else {
		// Browser globals
		factory(global.jQuery, global);
	}
})(this, function (jQuery) {
	"use strict";
	
	/**
	 * Map jQuery
	 */
	var $ = jQuery;
	
	/**
	 * Instance initialization
	 * 
	 * @return this
	 */
	function jmHighlight($context_, keyword_, options_){
		// Initialize options
		this.options = $.extend({}, {
			"debug": false,
			"element": "span",
			"className": "highlight",
			"filter": [],
			"separateWordSearch": false,
			"diacritics": true
		}, options_);
		// Initialize keyword
		this.keyword = typeof keyword_ === "string" ? keyword_: "";
		// Initialize elements
		this.$elements = $();
		if($context_ instanceof $ && $context_.length > 0){
			this.$elements = $context_.add($context_.find("*"));
			// Filter elements if filter is defined
			var tmp = this.getFilteredElements();
			if(tmp != false){
				this.$elements = tmp;
			}
		}
		return this;
	}
	
	/**
	 * Diacritic symbols
	 * for multilanguage purposes
	 */
	jmHighlight.prototype.diacritics = [
		"aÀÁÂÃÄÅàáâãäåĀāąĄ",
		"cÇçćĆčČ",
		"dđĐďĎ",
		"eÈÉÊËèéêëěĚĒēęĘ",
		"iÌÍÎÏìíîïĪī",
		"lłŁ",
		"nÑñňŇńŃ",
		"oÒÓÔÕÕÖØòóôõöøŌō",
		"rřŘ",
		"sŠšśŚ",
		"tťŤ",
		"uÙÚÛÜùúûüůŮŪū",
		"yŸÿýÝ",
		"zŽžżŻźŹ"
	];
	
	/**
	 * Filters elements based on the
	 * defined filter and saves the result
	 * in the elements variable
	 * 
	 * @return jquery-object
	 */
	jmHighlight.prototype.getFilteredElements = function(){
		var filterArr = this.options["filter"];
		if(typeof filterArr !== "object" || this.$elements instanceof $ == false
			|| Object.prototype.toString.call(filterArr) != '[object Array]'
		){
			return false;
		}
		var $contextElements = this.$elements;
		$contextElements = $contextElements.filter(function(){
			var $this = $(this);
			// Check if match in element itself
			var foundInElement = false;
			for(var i = 0, ilength = filterArr.length; i < ilength; i++){
				var filter = filterArr[i];
				// Use is() instead of hasClass() to
				// support complex selectors
				if($this.is(filter)){
					foundInElement = true;
					continue;
				}
			}
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
	 * Gets non recursive nodes of an element and returns
	 * it as an array
	 * 
	 * @param jquery-object $elements_
	 * @return array
	 */
	jmHighlight.prototype.getTextNodes = function($elements_){
		var arr = [];
		if($elements_ instanceof $ == false || $elements_.length == 0){
			return arr;
		}
		// Iterate over all items in the stack
		$elements_.each(function(){
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
				arr.push(this);
			});
		});
		return arr;
	}
	
	/**
	 * Creates a regular expression
	 * based on the current keyword
	 * and includes the diacritics
	 * if defined
	 * 
	 * @param string keyword_ (optional if you don't want to use this.keyword)
	 * @return string
	 */
	jmHighlight.prototype.getKeywordRegexp = function(keyword_){
		var keyword = typeof keyword_ !== "string" ? this.keyword: keyword_;
		if(typeof keyword !== "string" || keyword == ""){
			return keyword;
		}
		var regexp = keyword;
		// If diacritics is defined we need to phrase
		// the regexp to match also diacritic characters
		if(this.options["diacritics"]){
			var charArr = keyword.split('');
			var handled = [];
			for(var k = 0, klength = charArr.length; k < klength; k++){
				var ch = charArr[k];
				for(var j = 0, jlength = this.diacritics.length; j < jlength; j++){
					var diacritic = this.diacritics[j];
					if(diacritic.indexOf(ch) != -1){
						if(handled.indexOf(diacritic) > -1){// check if already handled
							continue;
						}
						// Match found. Now replace all
						// characters in this diacritic-list
						// with the regex expression
						// (replace all characters in a diacritic-list
						// since all characters in that list will not get
						// handled anymore)
						regexp = regexp.replace(
							new RegExp("[" + diacritic + "]", "gmi"),
							"[" + diacritic + "]"
						);
						handled.push(diacritic);
					}
				}
			}
		}
		return regexp;
	}
	
	/**
	 * Highlighting
	 * 
	 * @param string keyword_ (optional, will be used for recursive calls)
	 * @return bool
	 */
	jmHighlight.prototype.highlight = function(keyword_){
		var keyword = typeof keyword_ !== "string" ? this.keyword: keyword_;
		if(this.$elements.length == 0 || keyword == ""){
			return false;
		}
		
		// Filter all elements that were already highlighted
		// (e.g. if separateWordSearch is true)
		this.$elements = this.$elements.filter("*:not([data-jmHighlight])");
		
		// If there are multiple keywords and separate word search
		// is configured then highlight them
		// all separately
		var sepWS = this.options["separateWordSearch"];
		if(typeof sepWS === "boolean" && sepWS){
			var spl = keyword.split(" ");
			if(spl.length > 1){
				if(this.options["debug"]){
					console.log("Highlighting keywords separately");
				}
				for(var j = 0, jlength = spl.length; j < jlength; j++){
					// Call the highlight function for each
					// separate keyword.
					if(!this.highlight(spl[j])){
						return false;
					}
				}
				return true;
			}
		}
		
		if(this.options["debug"]){
			console.log("Highlighting keyword '" + keyword + "' in elements:");
			console.log(this.$elements);
		}
		
		// Iterate over all text nodes and replace
		// the search keyword after finding (case insensitive)
		var regexp = this.getKeywordRegexp(keyword);
		var testRegex = new RegExp(regexp, "gmi");
		var textNodes = this.getTextNodes(this.$elements);
		for(var i = 0, length = textNodes.length; i < length; i++){
			var node = textNodes[i];
			if(typeof node !== "object" || typeof node.nodeValue !== "string" 
				|| node.nodeValue.trim() == ""
			){
				continue;
			}
			if(!testRegex.test(node.nodeValue)){
				continue;
			}
			if(this.options["debug"]){
				console.log(regexp, node.nodeValue);
			}
			var tagO = "<" + this.options["element"] + " class='" + this.options["className"] +
						"' data-jmHighlight='true'>";
			var tagC = "</" + this.options["element"] + ">";
			if(node.parentNode != null){
				// Don't search inside HTML tags (e.g. keyword "data"
				// would match because of data-xyz inside HTML tag).
				// Replace it with the original match, e.g. if the 
				// search keyword is "g" replace it with "g" and not "G"
				var regex = new RegExp("((?![^<]*>)" + regexp + ")", "gim");
				node.parentNode.innerHTML = node.parentNode.innerHTML.replace(
					regex,
					tagO + "$1" + tagC
				);
			}
		}
		return true;
	};
	
	/**
	 * Highlighting removal
	 * 
	 * @return bool
	 */
	jmHighlight.prototype.removeHighlight = function(){
		if(this.$elements.length == 0){
			return false;
		}
		if(this.options["debug"]){
			if(typeof this.keyword === "string" && this.keyword != ""){
				console.log("Removing highlighting with keyword: '" + this.keyword + "'");
			} else {
				console.log("Removing highlighting");
			}
		}
		var regex = new RegExp(this.getKeywordRegexp(), "gmi");
		var find = this.options["element"] + "[data-jmHighlight]." + this.options["className"];
		var parentScope = this;
		var $stack = this.$elements.filter(find);
		if(this.options["debug"]){
			console.log(find);
			console.log($stack);
		}
		$stack.each(function(){
			var $this = $(this);
			if(!regex.test($this.text())){
				return true;
			} else {
				// Remove element with this text
				// @notice: When removing the HTML node
				// with just the text, it will remain a separate
				// text node for the replaced text. Because
				// the highlighting finds only text nodes
				// with the whole keyword inside, we need
				// to append the next text node with the text. That will
				// avoid having separate text nodes.
				parentScope.appendTextNodes($this, $stack);
			}
		});
		return true;
	};
	
	/**
	 * Will append the domElement with previous
	 * or next elements if they are text nodes
	 * or also highlighting elements. This prevents
	 * that the highlight removal will split text nodes.
	 * 
	 * @param jquery-object $domElement
	 * @param jquery-object $stack
	 * @return bool
	 */
	jmHighlight.prototype.appendTextNodes = function($domElement, $stack){
		if($domElement instanceof $ == false || $domElement.length == 0){
			return false;
		}
		
		var domElement = $domElement.first()[0];
		var prevSibling = domElement.previousSibling;
		var nextSibling = domElement.nextSibling;
		var $prevSibling = $(prevSibling);
		var $nextSibling = $(nextSibling);
		
		var handled = false;
		// Check if there is a previous text node or
		// highlight element. If so, append those two elements
		// with the text content
		if($prevSibling.length > 0){
			if(prevSibling.nodeType == 3){
				// It's a text node
				prevSibling.nodeValue = prevSibling.nodeValue + $domElement.text();
				$domElement.remove();
			} else if($stack instanceof $ && $stack.length > 0 && $stack.is($prevSibling)){
				// It's another highlighting element
				$prevSibling.replaceWith($domElement.text() + $prevSibling.text());
				$domElement.remove();
			} else {
				$domElement.replaceWith($domElement.text());
			}
			handled = true;
		}
		
		// Check if there is a next text node or
		// highlight element. If so, append those two elements
		// with the text node
		if($nextSibling.length > 0){
			if(nextSibling.nodeType == 3){
				if($prevSibling.length == 0){
					nextSibling.nodeValue = $domElement.text() + nextSibling.nodeValue;
					$domElement.remove();
				} else {
					nextSibling.nodeValue = $prevSibling.text() + nextSibling.nodeValue;
					$prevSibling.remove();
				}
			} else if($stack instanceof $ && $stack.length > 0 && $stack.is($nextSibling)){
				if($prevSibling.length == 0){
					$nextSibling.replaceWith($nextSibling.text() + $domElement.text());
					$domElement.remove();
				} else {
					$nextSibling.replaceWith($prevSibling.text() + $nextSibling.text());
					$prevSibling.remove();
				}
			} else {
				if($prevSibling.length == 0){
					$domElement.replaceWith($domElement.text());
				}
			}
			handled = true;
		}
		
		// If there is no next or prev element
		// simply remove the element with it's content
		if(handled == false){
			$domElement.replaceWith($domElement.text());
		}
		
		return true;
	};
		
	/**
	 * jmHighlight component exposure for jQuery
	 * 
	 * @return boolean
	 */
	$.fn.jmHighlight = function(keyword_, options_){
		var highlightInstance = new jmHighlight($(this), keyword_, options_);
		return highlightInstance.highlight();
	};
	$.fn.jmRemoveHighlight = function(options_, keyword_){
		var highlightInstance = new jmHighlight($(this), keyword_, options_);
		return highlightInstance.removeHighlight();
	};
	
});



