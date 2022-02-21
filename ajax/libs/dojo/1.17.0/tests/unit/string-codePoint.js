/*
Copyright Mathias Bynens <https://mathiasbynens.be/>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/*
Tests adapted from:
https://github.com/mathiasbynens/String.prototype.codePointAt
https://github.com/mathiasbynens/String.fromCodePoint
*/

define([
	'intern/chai!assert',
	'../../string'
], function (assert, string) {
	return {
		// https://github.com/mathiasbynens/String.prototype.codePointAt/blob/15e01b62e9afcf36c9b945359872d3f6640bfc63/tests/tests.js
		codePointAt: {
			'String that starts with a BMP symbol': function () {
				assert.equal(string.codePointAt('abc\uD834\uDF06def', -1), undefined);
				assert.equal(string.codePointAt('abc\uD834\uDF06def', -0), 0x61);
				assert.equal(string.codePointAt('abc\uD834\uDF06def', 0), 0x61);
				assert.equal(string.codePointAt('abc\uD834\uDF06def', 3), 0x1D306);
				assert.equal(string.codePointAt('abc\uD834\uDF06def', 4), 0xDF06);
				assert.equal(string.codePointAt('abc\uD834\uDF06def', 5), 0x64);
				assert.equal(string.codePointAt('abc\uD834\uDF06def', 42), undefined);
			},

			'String that starts with a BMP symbol - cast position': function () {
				assert.equal(string.codePointAt('abc\uD834\uDF06def', ''), 0x61);
				assert.equal(string.codePointAt('abc\uD834\uDF06def', '_'), 0x61);
				assert.equal(string.codePointAt('abc\uD834\uDF06def'), 0x61);
				assert.equal(string.codePointAt('abc\uD834\uDF06def', -Infinity), undefined);
				assert.equal(string.codePointAt('abc\uD834\uDF06def', Infinity), undefined);
				assert.equal(string.codePointAt('abc\uD834\uDF06def', Infinity), undefined);
				assert.equal(string.codePointAt('abc\uD834\uDF06def', NaN), 0x61);
				assert.equal(string.codePointAt('abc\uD834\uDF06def', false), 0x61);
				assert.equal(string.codePointAt('abc\uD834\uDF06def', null), 0x61);
				assert.equal(string.codePointAt('abc\uD834\uDF06def', undefined), 0x61);
			},

			'String that starts with an astral symbol': function () {
				assert.equal(string.codePointAt('\uD834\uDF06def', -1), undefined);
				assert.equal(string.codePointAt('\uD834\uDF06def', -0), 0x1D306);
				assert.equal(string.codePointAt('\uD834\uDF06def', 0), 0x1D306);
				assert.equal(string.codePointAt('\uD834\uDF06def', 1), 0xDF06);
				assert.equal(string.codePointAt('\uD834\uDF06def', 42), undefined);
			},

			'String that starts with an astral symbol - cast position': function () {
				assert.equal(string.codePointAt('\uD834\uDF06def', ''), 0x1D306);
				assert.equal(string.codePointAt('\uD834\uDF06def', '1'), 0xDF06);
				assert.equal(string.codePointAt('\uD834\uDF06def', '_'), 0x1D306);
				assert.equal(string.codePointAt('\uD834\uDF06def'), 0x1D306);
				assert.equal(string.codePointAt('\uD834\uDF06def', false), 0x1D306);
				assert.equal(string.codePointAt('\uD834\uDF06def', null), 0x1D306);
				assert.equal(string.codePointAt('\uD834\uDF06def', undefined), 0x1D306);
			},

			'Lone high surrogates': function () {
				assert.equal(string.codePointAt('\uD834abc', -1), undefined);
				assert.equal(string.codePointAt('\uD834abc', -0), 0xD834);
				assert.equal(string.codePointAt('\uD834abc', 0), 0xD834);
			},

			'Lone high surrogates - cast position': function () {
				assert.equal(string.codePointAt('\uD834abc', ''), 0xD834);
				assert.equal(string.codePointAt('\uD834abc', '_'), 0xD834);
				assert.equal(string.codePointAt('\uD834abc'), 0xD834);
				assert.equal(string.codePointAt('\uD834abc', false), 0xD834);
				assert.equal(string.codePointAt('\uD834abc', NaN), 0xD834);
				assert.equal(string.codePointAt('\uD834abc', null), 0xD834);
				assert.equal(string.codePointAt('\uD834abc', undefined), 0xD834);
			},

			'Lone low surrogates': function () {
				assert.equal(string.codePointAt('\uDF06abc', -1), undefined);
				assert.equal(string.codePointAt('\uDF06abc', -0), 0xDF06);
				assert.equal(string.codePointAt('\uDF06abc', 0), 0xDF06);
			},

			'Lone low surrogates - cast position': function () {
				assert.equal(string.codePointAt('\uDF06abc', ''), 0xDF06);
				assert.equal(string.codePointAt('\uDF06abc', '_'), 0xDF06);
				assert.equal(string.codePointAt('\uDF06abc'), 0xDF06);
				assert.equal(string.codePointAt('\uDF06abc', false), 0xDF06);
				assert.equal(string.codePointAt('\uDF06abc', NaN), 0xDF06);
				assert.equal(string.codePointAt('\uDF06abc', null), 0xDF06);
				assert.equal(string.codePointAt('\uDF06abc', undefined), 0xDF06);
			},

			'bad string': function () {
				"use strict";

				var supportsStrictMode = (function () { return typeof this === 'undefined'; }());

				if (!supportsStrictMode) {
					this.skip('strict mode test');
				}
				assert.throws(function () { return string.codePointAt(undefined, 'a'); }, TypeError, 'undefined');
				assert.throws(function () { return string.codePointAt(null, 'a'); }, TypeError, 'null');
			},

			'cast value': function () {
				assert.equal(string.codePointAt(42, 0), 0x34);
				assert.equal(string.codePointAt(42, 1), 0x32);
				assert.equal(string.codePointAt({
					toString: function() {
						return 'abc';
					}
				}, 2), 0x63);

				var tmp = 0;
				assert.equal(string.codePointAt({
					toString: function() {
						++tmp;
						return String(tmp);
					}
				}, 0), 0x31);
				assert.equal(tmp, 1);
			}
		},

		// https://github.com/mathiasbynens/String.fromCodePoint/blob/112cd81e9c40bac701fcd657c986962b293c1109/tests/tests.js
		fromCodePoint: {
			'no arguments': function () {
				assert.equal(string.fromCodePoint(), '');
			},

			'cast to 0': function () {
				assert.equal(string.fromCodePoint(''), '\0');
				assert.equal(string.fromCodePoint(-0), '\0');
				assert.equal(string.fromCodePoint(0), '\0');
				assert.equal(string.fromCodePoint(false), '\0');
				assert.equal(string.fromCodePoint(null), '\0');
			},

			'astral code points': function () {
				assert.equal(string.fromCodePoint(0x1D306), '\uD834\uDF06');
				assert.equal(string.fromCodePoint(0x1D306, 0x61, 0x1D307), '\uD834\uDF06a\uD834\uDF07');
				assert.equal(string.fromCodePoint(0x61, 0x62, 0x1D307), 'ab\uD834\uDF07');
			},

			'invalid code points': function () {
				assert.throws(function() { string.fromCodePoint('_'); }, RangeError);
				assert.throws(function() { string.fromCodePoint('+Infinity'); }, RangeError);
				assert.throws(function() { string.fromCodePoint('-Infinity'); }, RangeError);
				assert.throws(function() { string.fromCodePoint(-1); }, RangeError);
				assert.throws(function() { string.fromCodePoint(0x10FFFF + 1); }, RangeError);
				assert.throws(function() { string.fromCodePoint(3.14); }, RangeError);
				assert.throws(function() { string.fromCodePoint(3e-2); }, RangeError);
				assert.throws(function() { string.fromCodePoint(-Infinity); }, RangeError);
				assert.throws(function() { string.fromCodePoint(+Infinity); }, RangeError);
				assert.throws(function() { string.fromCodePoint(NaN); }, RangeError);
				assert.throws(function() { string.fromCodePoint(undefined); }, RangeError);
				assert.throws(function() { string.fromCodePoint({}); }, RangeError);
				assert.throws(function() { string.fromCodePoint(/./); }, RangeError);
			},

			'cast code point': function () {
				var tmp = 0x60;
				assert.equal(string.fromCodePoint({
					'valueOf': function() {
						++tmp;
						return tmp;
					}
				}), 'a');
				assert.equal(tmp, 0x61);
			},

			'long arguments list': function () {
				var counter = Math.pow(2, 15) * 3 / 2;
				var result = [];
				while (--counter >= 0) {
					result.push(0); // one code unit per symbol
				}
				assert.doesNotThrow(function () {
					string.fromCodePoint.apply(null, result);
				});

				counter = Math.pow(2, 15) * 3 / 2;
				result = [];
				while (--counter >= 0) {
					result.push(0xFFFF + 1); // two code units per symbol
				}
				assert.doesNotThrow(function () {
					string.fromCodePoint.apply(null, result);
				});
			}
		}
	};
});
