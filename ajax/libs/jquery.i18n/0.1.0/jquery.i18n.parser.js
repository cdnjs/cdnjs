/**
 * jQuery Internationalization library
 *
 * Copyright (C) 2012 Santhosh Thottingal
 *
 * jquery.i18n is dual licensed GPLv2 or later and MIT. You don't
 * have to do anything special to choose one license or the other and you don't
 * have to notify anyone which license you are using. You are free to use
 * UniversalLanguageSelector in commercial projects as long as the copyright
 * header is left intact. See files GPL-LICENSE and MIT-LICENSE for details.
 *
 * @licence GNU General Public Licence 2.0 or later
 * @licence MIT License
 */
(function($) {
	"use strict";

	var MessageParser = function(options) {
		this.options = $.extend({}, $.i18n.parser.defaults, options);
		this.language = $.i18n.languages[$.i18n().locale];
		this.emitter = $.i18n.parser.emitter;
	};

	MessageParser.prototype = {

		constructor : MessageParser,

		simpleParse : function(message, parameters) {
			return message.replace(/\$(\d+)/g, function(str, match) {
				var index = parseInt(match, 10) - 1;
				return parameters[index] !== undefined ? parameters[index] : '$' + match;
			});
		},

		parse : function(message, replacements) {
			if (message.indexOf('{{') < 0) {
				return this.simpleParse(message, replacements);
			}
			this.emitter.language = $.i18n.languages[$.i18n().locale]|| $.i18n.languages['default'];
			return this.emitter.emit(this.ast(message), replacements);
		},

		ast : function(message) {
			var pos = 0;
			var digits = makeRegexParser(/^\d+/);
			var regularLiteral = makeRegexParser(/^[^{}[\]$\\]/);
			var regularLiteralWithoutBar = makeRegexParser(/^[^{}[\]$\\|]/);
			var regularLiteralWithoutSpace = makeRegexParser(/^[^{}[\]$\s]/);
			var backslash = makeStringParser("\\");
			var anyCharacter = makeRegexParser(/^./);
			var dollar = makeStringParser('$');

			// Try parsers until one works, if none work return null
			function choice(parserSyntax) {
				return function() {
					for (var i = 0; i < parserSyntax.length; i++) {
						var result = parserSyntax[i]();
						if (result !== null) {
							return result;
						}
					}
					return null;
				};
			}

			// Try several parserSyntax-es in a row.
			// All must succeed; otherwise, return null.
			// This is the only eager one.
			function sequence(parserSyntax) {
				var originalPos = pos;
				var result = [];
				for (var i = 0; i < parserSyntax.length; i++) {
					var res = parserSyntax[i]();
					if (res === null) {
						pos = originalPos;
						return null;
					}
					result.push(res);
				}
				return result;
			}

			// Run the same parser over and over until it fails.
			// Must succeed a minimum of n times; otherwise, return null.
			function nOrMore(n, p) {
				return function() {
					var originalPos = pos;
					var result = [];
					var parsed = p();
					while (parsed !== null) {
						result.push(parsed);
						parsed = p();
					}
					if (result.length < n) {
						pos = originalPos;
						return null;
					}
					return result;
				};
			}

			// Helpers -- just make parserSyntax out of simpler JS builtin types

			function makeStringParser(s) {
				var len = s.length;
				return function() {
					var result = null;
					if (message.substr(pos, len) === s) {
						result = s;
						pos += len;
					}
					return result;
				};
			}

			var pipe = makeStringParser('|');
			var colon = makeStringParser(':');

			function makeRegexParser(regex) {
				return function() {
					var matches = message.substr(pos).match(regex);
					if (matches === null) {
						return null;
					}
					pos += matches[0].length;
					return matches[0];
				};
			}

			// There is a general pattern -- parse a thing, if that worked, apply transform, otherwise return null.
			// But using this as a combinator seems to cause problems when combined with nOrMore().
			// May be some scoping issue
			function transform(p, fn) {
				return function() {
					var result = p();
					return result === null ? null : fn(result);
				};
			}

			var escapedOrLiteralWithoutSpace = choice([escapedLiteral, regularLiteralWithoutSpace]);
			var escapedOrLiteralWithoutBar = choice([escapedLiteral, regularLiteralWithoutBar]);
			var escapedOrRegularLiteral = choice([escapedLiteral, regularLiteral]);

			// Used to define "literals" without spaces, in space-delimited situations
			function literalWithoutSpace() {
				var result = nOrMore( 1, escapedOrLiteralWithoutSpace )();
				return result === null ? null : result.join('');
			}

			// Used to define "literals" within template parameters. The pipe character is the parameter delimeter, so by default
			// it is not a literal in the parameter
			function literalWithoutBar() {
				var result = nOrMore( 1, escapedOrLiteralWithoutBar )();
				return result === null ? null : result.join('');
			}

			function literal() {
				var result = nOrMore( 1, escapedOrRegularLiteral )();
				return result === null ? null : result.join('');
			}

			function escapedLiteral() {
				var result = sequence([backslash, anyCharacter]);
				return result === null ? null : result[1];
			}

			var paramExpression = choice([template, replacement, literalWithoutBar]);

			function replacement() {
				var result = sequence([dollar, digits]);
				if (result === null) {
					return null;
				}
				return ['REPLACE', parseInt(result[1], 10) - 1];
			}

			var templateName = transform(
				// see $wgLegalTitleChars
				// not allowing : due to the need to catch "PLURAL:$1"
				makeRegexParser(/^[ !"$&'()*,.\/0-9;=?@A-Z\^_`a-z~\x80-\xFF+-]+/),
				function(result) {
					return result.toString();
				}
			);

			function templateParam() {
				var result = sequence([pipe, nOrMore(0, paramExpression)]);
				if (result === null) {
					return null;
				}
				var expr = result[1];
				// use a "CONCAT" operator if there are multiple nodes, otherwise return the first node, raw.
				return expr.length > 1 ? ["CONCAT"].concat(expr) : expr[0];
			}

			function templateWithReplacement() {
				var result = sequence([templateName, colon, replacement]);
				return result === null ? null : [result[0], result[2]];
			}

			function templateWithOutReplacement() {
				var result = sequence([templateName, colon, paramExpression]);
				return result === null ? null : [result[0], result[2]];
			}



			var templateContents = choice([
				function() {
					var res = sequence([
						// templates can have placeholders for dynamic replacement eg: {{PLURAL:$1|one car|$1 cars}}
						// or no placeholders eg: {{GRAMMAR:genitive|{{SITENAME}}}
						choice([templateWithReplacement, templateWithOutReplacement]),
						nOrMore(0, templateParam)
					]);

					return res === null ? null : res[0].concat(res[1]);
				},
				function() {
					var res = sequence([
						templateName,
						nOrMore(0, templateParam)
					]);

					if (res === null) {
						return null;
					}

					return [res[0]].concat(res[1]);
				}
			]);

			var openTemplate = makeStringParser('{{');

			var closeTemplate = makeStringParser('}}');


			var expression = choice([template, replacement, literal]);

			function template() {
				var result = sequence([openTemplate, templateContents, closeTemplate]);
				return result === null ? null : result[1];
			}

			function start() {
				var result = nOrMore( 0, expression )();

				if (result === null) {
					return null;
				}

				return ["CONCAT"].concat(result);
			}

			var result = start();
			return result;
		}

	};

	$.extend( $.i18n.parser, new MessageParser() );

} )(jQuery);
