/**
 * Globalize v1.0.0-alpha.18
 *
 * http://github.com/jquery/globalize
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-03-17T20:37Z
 */
/*!
 * Globalize v1.0.0-alpha.18 2015-03-17T20:37Z Released under the MIT license
 * http://git.io/TrdQbw
 */
(function( root, factory ) {

	// UMD returnExports
	if ( typeof define === "function" && define.amd ) {

		// AMD
		define([
			"cldr",
			"../globalize",
			"cldr/event",
			"cldr/supplemental"
		], factory );
	} else if ( typeof exports === "object" ) {

		// Node, CommonJS
		module.exports = factory( require( "cldrjs" ), require( "globalize" ) );
	} else {

		// Global
		factory( root.Cldr, root.Globalize );
	}
}(this, function( Cldr, Globalize ) {

var validateCldr = Globalize._validateCldr,
	validateDefaultLocale = Globalize._validateDefaultLocale,
	validateParameterPresence = Globalize._validateParameterPresence,
	validateParameterType = Globalize._validateParameterType;
/**
 * make-plural.js -- https://github.com/eemeli/make-plural.js/
 * Copyright (c) 2014 by Eemeli Aro <eemeli@gmail.com>
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * The software is provided "as is" and the author disclaims all warranties
 * with regard to this software including all implied warranties of
 * merchantability and fitness. In no event shall the author be liable for
 * any special, direct, indirect, or consequential damages or any damages
 * whatsoever resulting from loss of use, data or profits, whether in an
 * action of contract, negligence or other tortious action, arising out of
 * or in connection with the use or performance of this software.
 */

var MakePlural;
/* jshint ignore:start */
MakePlural = (function() {

function parse(cond, symbols) {
	if (cond == 'i = 0 or n = 1') return 'n >= 0 && n <= 1';
	if (cond == 'i = 0,1') return 'n >= 0 && n < 2';
	if (cond == 'i = 1 and v = 0') {
		symbols['v0'] = 1;
		return 'n == 1 && v0';
	}
	return cond
		.replace(/([tv]) (!?)= 0/g, function(m, sym, noteq) {
			var sn = sym + '0';
			symbols[sn] = 1;
			return noteq ? '!' + sn : sn;
		})
		.replace(/\b[fintv]\b/g, function(m) {
			symbols[m] = 1;
			return m;
		})
		.replace(/([fin]) % (10+)/g, function(m, sym, num) {
			var sn = sym + num;
			symbols[sn] = 1;
			return sn;
		})
		.replace(/n10+ = 0/g, 't0 && $&')
		.replace(/(\w+ (!?)= )([0-9.]+,[0-9.,]+)/g, function(m, se, noteq, x) {
			if (m == 'n = 0,1') return '(n == 0 || n == 1)';
			if (noteq) return se + x.split(',').join(' && ' + se);
			return '(' + se + x.split(',').join(' || ' + se) + ')';
		})
		.replace(/(\w+) (!?)= ([0-9]+)\.\.([0-9]+)/g, function(m, sym, noteq, x0, x1) {
			if (Number(x0) + 1 == Number(x1)) {
				if (noteq) return sym + ' != ' + x0 + ' && ' + sym + ' != ' + x1;
				return '(' + sym + ' == ' + x0 + ' || ' + sym + ' == ' + x1 + ')';
			}
			if (noteq) return '(' + sym + ' < '  + x0 + ' || ' + sym + ' > '  + x1 + ')';
			if (sym == 'n') { symbols['t0'] = 1; return '(t0 && n >= ' + x0 + ' && n <= ' + x1 + ')'; }
			return '(' + sym + ' >= ' + x0 + ' && ' + sym + ' <= ' + x1 + ')';
		})
		.replace(/ and /g, ' && ')
		.replace(/ or /g, ' || ')
		.replace(/ = /g, ' == ');
}

function vars(symbols) {
	var vars = [];
	if (symbols['i']) vars.push("i = s[0]");
	if (symbols['f'] || symbols['v']) vars.push("f = s[1] || ''");
	if (symbols['t']) vars.push("t = (s[1] || '').replace(/0+$/, '')");
	if (symbols['v']) vars.push("v = f.length")
	if (symbols['v0']) vars.push("v0 = !s[1]");
	if (symbols['t0'] || symbols['n10'] || symbols['n100']) vars.push("t0 = Number(s[0]) == n");
	for (var k in symbols) if (/^.10+$/.test(k)) {
		var k0 = (k[0] == 'n') ? 't0 && s[0]' : k[0];
		vars.push(k + ' = ' + k0 + '.substr(-' + k.substr(2).length + ')');
	}
	if (vars.length) {
		vars.unshift("s = String(n).split('.')");
		return 'var ' + vars.join(', ') + ';';
	}
	return '';
}

function build(lc, opt, tests) {
	var	lines = [], symbols = {},
		_fold = function(l) { return l.replace(/(.{1,72})( \|\| |$) ?/gm, '$1\n         $2').replace(/\s+$/gm, ''); },
		_compile = function(type, req) {
			var cases = [];
			
			if (MakePlural.rules[type][lc]) {
				for (var r in MakePlural.rules[type][lc]) {
					var	key = r.replace('pluralRule-count-', ''),
						parts = MakePlural.rules[type][lc][r].split(/@\w*/),
						cond = parts.shift().trim();
					if (cond) cases.push([parse(cond, symbols), key]);
					tests[type][key] = parts.join(' ')
						.replace(/^[ ,]+|[ ,…]+$/g, '')
						.replace(/(0\.[0-9])~(1\.[1-9])/g, '$1 1.0 $2')
						.split(/[ ,~…]+/);
				}
			} else if (req) {
				if (!opt['quiet']) console.error('Locale "' + lc + '" ' + type + ' rules not found');
				return false;
			}
			if (!cases.length) return "'other'";
			if (cases.length == 1) return "(" + cases[0][0] + ") ? '" + cases[0][1] + "' : 'other'";
			return cases.map(function(c) { return "(" + c[0] + ") ? '" + c[1] + "'"; }).concat("'other'").join('\n      : ');
		};

	if (opt['ordinals']) {
		if (opt['no_cardinals']) {
			var l = _compile('ordinal', true);
			if (!l) return null;
			lines.push(_fold('  return ' + l + ';'));
		} else {
			lines.push(_fold('  if (ord) return ' + _compile('ordinal', false) + ';'));
		}
	}
	if (!opt['no_cardinals']) {
		var l = _compile('cardinal', true);
		if (!l) return null;
		lines.push(_fold('  return ' + l + ';'));
	}
	var fn_vars = vars(symbols).replace(/(.{1,78})(,|$) ?/g, '\n      $1$2').trim();
	if (fn_vars) lines.unshift('  ' + fn_vars);
	return lines.join('\n');
}






var MakePlural = function(lc, opt) {
	if (typeof lc == 'object') { opt = lc; lc = opt.lc; }
	else {
		if (!opt) opt = MakePlural.opt;
		if (!lc) lc = opt.lc;
	}
	var	tests = { 'ordinal':{}, 'cardinal':{} },
		fn_body = build(lc, opt, tests),
		fn = opt['ordinals'] && !opt['no_cardinals']
			? new Function('n', 'ord', fn_body)
			: new Function('n', fn_body);
	fn.toString = function(name) {
		var s = Function.prototype.toString.call(fn);
		return s.replace(/^function( \w+)?/, name ? 'function ' + name : 'function');
	};
	return fn_body && (opt['no_tests'] || test(lc, fn, tests, opt)) ? fn : null;
};

MakePlural.opt = {};
MakePlural.rules = {};




return MakePlural;
}());
/* jshint ignore:end */


var validateParameterTypeNumber = function( value, name ) {
	validateParameterType(
		value,
		name,
		value === undefined || typeof value === "number",
		"Number"
	);
};




/**
 * .plural( value )
 *
 * @value [Number]
 *
 * Return the corresponding form (zero | one | two | few | many | other) of a
 * value given locale.
 */
Globalize.plural =
Globalize.prototype.plural = function( value ) {
	validateParameterPresence( value, "value" );
	validateParameterTypeNumber( value, "value" );
	return this.pluralGenerator()( value );
};

/**
 * .pluralGenerator()
 *
 * Return a plural function (of the form below).
 *
 * fn( value )
 *
 * @value [Number]
 *
 * Return the corresponding form (zero | one | two | few | many | other) of a value given the
 * default/instance locale.
 */
Globalize.pluralGenerator =
Globalize.prototype.pluralGenerator = function() {
	var cldr, plural;

	cldr = this.cldr;

	validateDefaultLocale( cldr );

	cldr.on( "get", validateCldr );
	cldr.supplemental( "plurals-type-cardinal/{language}" );
	cldr.off( "get", validateCldr );

	// Set CLDR data
	MakePlural.rules = {
		cardinal: cldr.supplemental( "plurals-type-cardinal" )
	};

	plural = MakePlural( cldr.attributes.language, { "no_tests": true } );

	return function( value ) {
		validateParameterPresence( value, "value" );
		validateParameterTypeNumber( value, "value" );

		return plural( value );
	};
};

return Globalize;




}));
