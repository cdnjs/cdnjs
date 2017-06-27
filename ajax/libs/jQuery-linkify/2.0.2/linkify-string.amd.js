define('linkify-string', ['module', 'exports', './linkify'], function (module, exports, _linkify) {
	'use strict';

	try { Object.defineProperty(exports, "__esModule", {
		value: true
	}); } catch (e) { exports['__esModule'] = true; }

	var linkify = _interopRequireWildcard(_linkify);

	function _interopRequireWildcard(obj) {
		if (obj && obj.__esModule) {
			return obj;
		} else {
			var newObj = {};

			if (obj != null) {
				for (var key in obj) {
					if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
				}
			}

			newObj['default'] = obj;
			return newObj;
		}
	}

	var tokenize = linkify.tokenize; /**
                                  	Convert strings of text into linkable HTML text
                                  */

	var options = linkify.options;

	function escapeText(text) {
		return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	}

	function escapeAttr(href) {
		return href.replace(/"/g, '&quot;');
	}

	function attributesToString(attributes) {

		if (!attributes) return '';
		var result = [];

		for (var attr in attributes) {
			var val = (attributes[attr] + '').replace(/"/g, '&quot;');
			result.push(attr + '="' + escapeAttr(val) + '"');
		}
		return result.join(' ');
	}

	function linkifyStr(str) {
		var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];


		opts = options.normalize(opts);

		var tokens = tokenize(str),
		    result = [];

		for (var i = 0; i < tokens.length; i++) {
			var token = tokens[i];
			var validated = token.isLink && options.resolve(opts.validate, token.toString(), token.type);

			if (token.isLink && validated) {

				var href = token.toHref(opts.defaultProtocol),
				    formatted = options.resolve(opts.format, token.toString(), token.type),
				    formattedHref = options.resolve(opts.formatHref, href, token.type),
				    attributesHash = options.resolve(opts.attributes, href, token.type),
				    tagName = options.resolve(opts.tagName, href, token.type),
				    linkClass = options.resolve(opts.linkClass, href, token.type),
				    target = options.resolve(opts.target, href, token.type);

				var link = '<' + tagName + ' href="' + escapeAttr(formattedHref) + '" class="' + escapeAttr(linkClass) + '"';
				if (target) {
					link += ' target="' + escapeAttr(target) + '"';
				}

				if (attributesHash) {
					link += ' ' + attributesToString(attributesHash);
				}

				link += '>' + escapeText(formatted) + '</' + tagName + '>';
				result.push(link);
			} else if (token.type === 'nl' && opts.nl2br) {
				if (opts.newLine) {
					result.push(opts.newLine);
				} else {
					result.push('<br>\n');
				}
			} else {
				result.push(escapeText(token.toString()));
			}
		}

		return result.join('');
	}

	if (!String.prototype.linkify) {
		String.prototype.linkify = function (options) {
			return linkifyStr(this, options);
		};
	}

	exports['default'] = linkifyStr;
	module.exports = exports['default'];
});