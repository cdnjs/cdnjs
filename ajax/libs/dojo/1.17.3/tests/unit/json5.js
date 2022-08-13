/*
Adapted from https://github.com/json5/json5/blob/32bb2cdae4864b2ac80a6d9b4045efc4cc54f47a/test/parse.js
LICENSE: ../../json5/LICENSE.md
See also: ../../json5/README.md
*/

define([
	'intern!object',
	'intern/chai!assert',
	'../../json5',
	'sinon'
], function (registerSuite, assert, json5, sinon) {
	registerSuite({
		name: 'dojo/json5',

		'.parse': {
			text: {
				'parses empty objects': function () {
					assert.deepEqual(json5.parse('{}'), {});
				},

				'parses double string property names': function () {
					assert.deepEqual(json5.parse('{"a":1}'), {a: 1});
				},

				'parses single string property names': function () {
					assert.deepEqual(json5.parse("{'a':1}"), {a: 1});
				},

				'parses unquoted property names': function () {
					assert.deepEqual(json5.parse('{a:1}'), {a: 1});
				},

				'parses special character property names': function () {
					assert.deepEqual(json5.parse('{$_:1,_$:2,a\u200C:3}'), {$_: 1, _$: 2, 'a\u200C': 3});
				},

				'parses unicode property names': function () {
					assert.deepEqual(json5.parse('{ùńîċõďë:9}'), {'ùńîċõďë': 9});
				},

				'parses escaped property names': function () {
					assert.deepEqual(
						json5.parse('{\\u0061\\u0062:1,\\u0024\\u005F:2,\\u005F\\u0024:3}'),
						{ab: 1, $_: 2, _$: 3}
					);
				},

				'parses multiple properties': function () {
					assert.deepEqual(json5.parse('{abc:1,def:2}'), {abc: 1, def: 2});
				},

				'parses nested objects': function () {
					assert.deepEqual(json5.parse('{a:{b:2}}'), {a: {b: 2}});
				}
			},

			arrays: {
				'parses empty arrays': function () {
					assert.deepEqual(json5.parse('[]'), []);
				},

				'parses array values': function () {
					assert.deepEqual(json5.parse('[1]'), [1]);
				},

				'parses multiple array values': function () {
					assert.deepEqual(json5.parse('[1,2]'), [1, 2]);
				},

				'parses nested arrays': function () {
					assert.deepEqual(json5.parse('[1,[2,3]]'), [1, [2, 3]]);
				}
			},

			'parses nulls': function () {
				assert.equal(json5.parse('null'), null);
			},

			Booleans: {
				'parses true': function () {
					assert.equal(json5.parse('true'), true);
				},

				'parses false': function () {
					assert.equal(json5.parse('false'), false);
				}
			},

			numbers: {
				'parses leading zeroes': function () {
					assert.deepEqual(json5.parse('[0,0.,0e0]'), [0, 0, 0])
				},

				'parses integers': function () {
					assert.deepEqual(json5.parse('[1,23,456,7890]'), [1, 23, 456, 7890]);
				},

				'parses signed numbers': function () {
					assert.deepEqual(json5.parse('[-1,+2,-.1,-0]'), [-1, +2, -0.1, -0]);
				},

				'parses leading decimal points': function () {
					assert.deepEqual(json5.parse('[.1,.23]'), [0.1, 0.23]);
				},

				'parses fractional numbers': function () {
					assert.deepEqual(json5.parse('[1.0,1.23]'), [1, 1.23]);
				},

				'parses exponents': function () {
					assert.deepEqual(json5.parse('[1e0,1e1,1e01,1.e0,1.1e0,1e-1,1e+1]'), [1, 10, 10, 1, 1.1, 0.1, 10]);
				},

				'parses hexadecimal numbers': function () {
					assert.deepEqual(json5.parse('[0x1,0x10,0xff,0xFF]'), [1, 16, 255, 255]);
				},

				'parses signed and unsigned Infinity': function () {
					assert.deepEqual(json5.parse('[Infinity,-Infinity]'), [Infinity, -Infinity]);
				},

				'parses NaN': function () {
					console.dir(assert);
					assert(isNaN(json5.parse('NaN')));
				},

				'parses signed NaN': function () {
					assert(isNaN(json5.parse('-NaN')));
				},

				'parses 1': function () {
					assert.equal(json5.parse('1'), 1);
				},

				'parses +1.23e100': function () {
					assert.equal(json5.parse('+1.23e100'), 1.23e100);
				},

				'parses bare hexadecimal number': function () {
					assert.equal(json5.parse('0x1'), 0x1);
				},

				'parses bare long hexadecimal number': function () {
					assert.deepEqual(json5.parse('-0x0123456789abcdefABCDEF'), -0x0123456789abcdefABCDEF);
				}
			},

			strings: {
				'parses double quoted strings': function () {
					assert.equal(json5.parse('"abc"'), 'abc');
				},

				'parses single quoted strings': function () {
					assert.equal(json5.parse("'abc'"), 'abc');
				},

				'parses quotes in strings': function () {
					assert.deepEqual(json5.parse('[\'"\',"\'"]'), ['"', "'"]);
				},

				'parses escaped characters': function () {
					assert.equal(
						json5.parse("'\\b\\f\\n\\r\\t\\v\\0\\x0f\\u01fF\\\n\\\r\n\\\r\\\u2028\\\u2029\\a\\'\\\"'"),
						'\b\f\n\r\t\v\0\x0f\u01FF\a\'"'
					);
				},

				'parses line and paragraph separators with a warning': function () {
					var mock = sinon.mock(console);
					mock.expects('warn')
						.twice()
						.calledWithMatch('not valid ECMAScript');

					assert.deepEqual(json5.parse("'\u2028\u2029'"), '\u2028\u2029');

					mock.verify();
					mock.restore();
				}
			},

			comments: {
				'parses single-line comments': function () {
					assert.deepEqual(json5.parse('{//comment\n}'), {});
				},

				'parses single-line comments at end of input': function () {
					assert.deepEqual(json5.parse('{}//comment'), {});
				},

				'parses multi-line comments': function () {
					assert.deepEqual(json5.parse('{/*comment\n** */}'), {});
				}
			},

			'parses whitespace': function () {
				assert.deepEqual(json5.parse('{\t\v\f \u00A0\uFEFF\n\r\u2028\u2029\u2003}'), {});
			},

			reviver: {
				'modifies property values': function () {
					function revive (k, v) {
						return k === 'a' ? 'revived' : v;
					}

					assert.deepEqual(
						json5.parse('{a:1,b:2}', revive),
						{a: 'revived', b: 2}
					);
				},

				'modifies nested object property values': function () {
					function revive (k, v) {
						return k === 'b' ? 'revived': v;
					}

					assert.deepEqual(
						json5.parse('{a:{b:2}}', revive),
						{a: {b: 'revived'}}
					);
				},

				'deletes property values': function () {
					function revive (k, v) {
						return k === 'a' ? undefined : v;
					}

					assert.deepEqual(
						json5.parse('{a:1,b:2}', revive),
						{b: 2}
					);
				},

				'modifies array values': function () {
					function revive (k, v) {
						return k === '1' ? 'revived': v;
					}

					assert.deepEqual(
						json5.parse('[0,1,2]', revive),
						[0, 'revived', 2]
					);
				},

				'modifies nested array values': function () {
					function revive (k, v) {
						return k === '2' ? 'revived' : v;
					}

					assert.deepEqual(
						json5.parse('[0,[1,2,3]]', revive),
						[0, [1, 2, 'revived']]
					);
				},

				'deletes array values': function () {
					function revive (k, v) {
						return k === '1' ? undefined : v;
					}

					assert.deepEqual(
						json5.parse('[0,1,2]', revive),
						/* jshint -W128 */
						[0, , 2]
					);
				},

				'modifies the root value': function () {
					function revive (k, v) {
						return k === '' ? 'revived' : v;
					}

					assert.equal(
						json5.parse('1', revive),
						'revived'
					);
				},

				'sets `this` to the parent value': function () {
					function revive (k, v) {
						return (k === 'b' && this.b) ? 'revived' : v;
					}

					assert.deepEqual(
						json5.parse('{a:{b:2}}', revive),
						{a: {b: 'revived'}}
					);
				}
			}
		}
	});
});
