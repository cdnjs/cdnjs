/*! Parser: ignoreArticles - updated 9/15/2014 (v2.17.8) *//*
 * This parser will remove "The", "A" and "An" from the beginning of a book
 * or movie title, so it sorts by the second word or number
 * Demo: http://jsfiddle.net/Mottie/abkNM/5/
 */
/*jshint browser: true, jquery:true, unused:false */
;(function($){
"use strict";

var ts = $.tablesorter;

	// basic list from http://en.wikipedia.org/wiki/Article_%28grammar%29
	ts.ignoreArticles = {
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

	ts.addParser({
		id: 'ignoreArticles',
		is: function() {
			return false;
		},
		format: function(s, table, cell, cellIndex) {
			var art, ignore, lang,
				c = table.config,
				str = s || '';
			if ( !(c.headers && c.headers[cellIndex] && c.headers[cellIndex].ignoreArticlesRegex) ) {
				// initialize - save regex in c.headers[cellIndex].ignoreArticlesRegex
				if (!c.headers) { c.headers = {}; }
				if (!c.headers[cellIndex]) { c.headers[cellIndex] = {}; }
				lang = ts.getData( c.$headers.eq(cellIndex), ts.getColumnData( table, c.headers, cellIndex ), 'ignoreArticles' );
				art = (ts.ignoreArticles[lang] || "the, a, an" ) + "";
				c.headers[cellIndex].ignoreArticlesRegex = new RegExp('^(' + $.trim( art.split(/\s*\,\s*/).join('\\s|') + "\\s" ).replace("_\\s","") + ')', 'i');
				// exception regex stored in c.headers[cellIndex].ignoreArticlesRegex2
				ignore = ts.getData( c.$headers.eq(cellIndex), ts.getColumnData( table, c.headers, cellIndex ), 'ignoreArticlesExcept' );
				c.headers[cellIndex].ignoreArticlesRegex2 = ignore !== '' ? new RegExp('^(' + ignore.replace(/\s/g, "\\s") + ')', 'i') : '';
			}
			art = c.headers[cellIndex].ignoreArticlesRegex;
			if (art.test(str)) {
				ignore = c.headers[cellIndex].ignoreArticlesRegex2;
				if ( !(ignore && ignore.test(str)) ) {
					return str.replace(art, '');
				}
			}
			return str;
		},
		type: 'text'
	});

})(jQuery);
