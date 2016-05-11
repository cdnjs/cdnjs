/**
 * jQuery plugin wrapper for TinySort
 * Does not use the first argument in tinysort.js since that is handled internally by the jQuery selector.
 * Sub-selections (option.selector) do not use the jQuery selector syntax but regular CSS3 selector syntax.
 * @summary jQuery plugin wrapper for TinySort
 * @version 2.3.6
 * @requires tinysort
 * @license MIT/GPL
 * @author Ron Valstar (http://www.sjeiti.com/)
 * @copyright Ron Valstar <ron@ronvalstar.nl>
 */
(function (factory) {
	'use strict';
	if (typeof define==='function'&&define.amd) {
		define(['jquery','tinysort'],factory);
	} else if (jQuery && !jQuery.fn.tsort) {
		factory(jQuery,tinysort);
	}
}(function ($,tinysort) {
	'use strict';
	$.tinysort = { defaults: tinysort.defaults	};
	$.fn.extend({
		tinysort: function() {
			var aArg = Array.prototype.slice.call(arguments)
				,aSorted,iSorted;
			aArg.unshift(this);
			aSorted = tinysort.apply(null,aArg);
			iSorted = aSorted.length;
			for (var i=0,l=this.length;i<l;i++) {
				if (i<iSorted) this[i] = aSorted[i];
				else delete this[i];
			}
			this.length = iSorted;
			return this;
		}
	});
	$.fn.tsort = $.fn.tinysort;
}));