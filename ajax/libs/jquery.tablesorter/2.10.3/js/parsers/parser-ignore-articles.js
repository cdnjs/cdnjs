/*! Title parser
 * This parser will remove "The", "A" and "An" from the beginning of a book
 * or movie title, so it sorts by the second word or number
 * Demo: http://jsfiddle.net/Mottie/abkNM/5/
 */
/*global jQuery: false */
;(function($){
"use strict";

	// basic list from http://en.wikipedia.org/wiki/Article_%28grammar%29
	$.tablesorter.ignoreArticles = {
		"en" : "the, a, an",
		"de" : "der, die, das, des, dem, den, ein, eine, einer, eines, einem, einen",
		"nl" : "de, het, de, een",
		"es" : "el, la, lo, los, las, un, una, unos, unas",
		"pt" : "o, a, os, as, um, uma, uns, umas",
		"fr" : "le, la, l'_, les, un, une, des",
		"it" : "il, lo, la, l'_, i, gli, le, un', uno, una, un",
		"hu" : "a, az, egy"
	};

	// To add a custom parser, define:
	// $.tablesorter.ignoreArticles['xx'] = "A, B, C";
	// and then set the language id 'xx' in the headers option
	// ignoreArticles : 'xx'

	$.tablesorter.addParser({
		id: 'ignoreArticles',
		is: function() {
			return false;
		},
		format: function(s, table, cell, cellIndex) {
			var c = table.config, art, lang;
			if ( !(c.headers && c.headers[cellIndex] && c.headers[cellIndex].ignoreArticlesRegex) ) {
				// initialize - save regex in c.headers[cellIndex].ignoreArticles
				if (!c.headers) { c.headers = {}; }
				if (!c.headers[cellIndex]) { c.headers[cellIndex] = {}; }
				lang = $.tablesorter.getData(c.$headers.eq(cellIndex), c.headers[cellIndex], 'ignoreArticles');
				art = ($.tablesorter.ignoreArticles[lang] || "the, a, an" ) + "";
				c.headers[cellIndex].ignoreArticlesRegex = new RegExp('^(' + $.trim( art.split(/\s*\,\s*/).join('\\s|') + "\\s" ).replace("_\\s","") + ')', 'i');
			}
			return (s || '').replace(c.headers[cellIndex].ignoreArticlesRegex, '');
		},
		type: 'text'
	});

})(jQuery);
