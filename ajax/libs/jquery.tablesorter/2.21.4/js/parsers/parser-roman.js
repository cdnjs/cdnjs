/*! Parser: roman - updated 6/28/MMXIV (v2.17.3) *//*
 * code modified from both:
 * Steven Levithan @ http://blog.stevenlevithan.com/archives/javascript-roman-numeral-converter
 * Jonathan Snook comment @ http://blog.stevenlevithan.com/archives/javascript-roman-numeral-converter#comment-16140
 */
/*jshint jquery:true, unused:false */
;(function($){
"use strict";

	// allow lower case roman numerals, since lists use i, ii, iii, etc.
	var validator = /^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/i,
		matcher = /\b([MCDLXVI]+\b)/gi,
		lookup = { I:1, V:5, X:10, L:50, C:100, D:500, M:1000 };

	$.tablesorter.addParser({
		id: 'roman',
		is: function(){
			return false;
		},
		format: function(s) {
			var val,
				roman = s.toUpperCase().split(''),
				num = 0;

			// roman numerals not found!
			if ( !(s && validator.test(s)) ) {
				return s;
			}

			while (roman.length) {
				val = lookup[roman.shift()];
				num += val * (val < lookup[roman[0]] ? -1 : 1);
			}

			return num;
		},
		type: "numeric"
	});

	$.tablesorter.addParser({
		id: 'roman-ignore',
		is: function(){
			return false;
		},
		format: function(s, table, cell, column) {
			var val, orig,
				c = table.config,
				ignore = $.isArray(c.roman_ignore) ? c.roman_ignore[column] : 0,
				// find roman numerals
				roman = ( isNaN(ignore) ?
					// ignore can be a regex or string
					$.trim( s.replace(ignore, '') ) :
					// or a number to ignore the last x letters...
					$.trim( s.substring(0, s.length - ignore) )
				).match(matcher),
				v = validator.test(roman),
				num = 0;

			// roman numerals not found!
			if ( !(v) ) {
				return s;
			}

			// save roman numeral for replacement
			orig = roman[0];
			roman = orig.toUpperCase().split('');

			while (roman.length) {
				val = lookup[roman.shift()];
				// ignore non-roman numerals
				if (val) {
					num += val * (val < lookup[roman[0]] ? -1 : 1);
				}
			}

			return num ? s.replace(orig, num) : s;
		},
		type: "text"
	});

	$.tablesorter.addParser({
		id: 'roman-extract',
		is: function(){
			return false;
		},
		format: function(s) {
			var val,
				// find roman numerals
				roman = $.grep(s.split(/\b/), function(v, i){
					return validator.test(v) ? v : '';
				}).join('').match(matcher),

				v = roman ? validator.test(roman) : 0,
				num = 0;

			// roman numerals not found!
			if ( !(v) ) {
				return s;
			}

			// save roman numeral for replacement
			roman = roman[0].toUpperCase().split('');

			while (roman.length) {
				val = lookup[roman.shift()];
				// ignore non-roman numerals
				if (val) {
					num += val * (val < lookup[roman[0]] ? -1 : 1);
				}
			}

			return num ? num : s;
		},
		type: "numeric"
	});

})(jQuery);
