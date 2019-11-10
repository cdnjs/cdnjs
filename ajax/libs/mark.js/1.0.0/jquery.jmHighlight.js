/**
jmHighlight v1.0

Fork of
highlight v5

Highlights arbitrary terms.

<http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-jquery-plugin.html>

MIT license.

Modified by julmot to allow custom css classes.
<https://github.com/julmot>

Johann Burkard
<http://johannburkard.de>
<mailto:jb@eaio.com>
*/
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
	jQuery.fn.highlight = function(pat, cssClass_) {
		function innerHighlight(node, pat) {
			var skip = 0;
			if (node.nodeType == 3) {
				var pos = node.data.toUpperCase().indexOf(pat);
				pos -= (node.data.substr(0, pos).toUpperCase().length - node.data
						.substr(0, pos).length);
				if (pos >= 0) {
					var spannode = document.createElement('span');
					if(typeof cssClass_ === "string"){
						spannode.className = cssClass_;
					} else {
						spannode.className = 'highlight';
					}
					var middlebit = node.splitText(pos);
					var endbit = middlebit.splitText(pat.length);
					var middleclone = middlebit.cloneNode(true);
					spannode.appendChild(middleclone);
					middlebit.parentNode.replaceChild(spannode, middlebit);
					skip = 1;
				}
			} else if (node.nodeType == 1 && node.childNodes
						&& !/(script|style)/i.test(node.tagName)) {
				for (var i = 0; i < node.childNodes.length; ++i) {
					i += innerHighlight(node.childNodes[i], pat);
				}
			}
			return skip;
		}
		return this.length && pat && pat.length ? this.each(function() {
			innerHighlight(this, pat.toUpperCase());
		}) : this;
	};
	jQuery.fn.jmHighlight = function(){
		jQuery.fn.highlight.apply(this, arguments);
	};
	jQuery.fn.removeHighlight = function(cssClass_) {
		if(typeof cssClass_ === "string"){
			var c = cssClass_;
		} else {
			var c = "highlight";
		}
		return this.find("span." + c).each(function() {
			this.parentNode.firstChild.nodeName;
			with(this.parentNode) {
				replaceChild(this.firstChild, this);
				normalize();
			}
		}).end();
	};
	jQuery.fn.jmRemoveHighlight = function(){
		jQuery.fn.removeHighlight.apply(this, arguments);
	};
});
