'use strict';

;(function (window, linkify) {
	var linkifyString = function (linkify) {
		'use strict';

		/**
  	Convert strings of text into linkable HTML text
  */

		var tokenize = linkify.tokenize;
		var options = linkify.options;
		var Options = options.Options;


		function escapeText(text) {
			return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
		}

		function escapeAttr(href) {
			return href.replace(/"/g, '&quot;');
		}

		function attributesToString(attributes) {
			if (!attributes) {
				return '';
			}
			var result = [];

			for (var attr in attributes) {
				var val = attributes[attr] + '';
				result.push(attr + '="' + escapeAttr(val) + '"');
			}
			return result.join(' ');
		}

		function linkifyStr(str) {
			var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

			opts = new Options(opts);

			var tokens = tokenize(str);
			var result = [];

			for (var i = 0; i < tokens.length; i++) {
				var token = tokens[i];

				if (token.type === 'nl' && opts.nl2br) {
					result.push('<br>\n');
					continue;
				} else if (!token.isLink || !opts.check(token)) {
					result.push(escapeText(token.toString()));
					continue;
				}

				var _opts$resolve = opts.resolve(token);

				var formatted = _opts$resolve.formatted;
				var formattedHref = _opts$resolve.formattedHref;
				var tagName = _opts$resolve.tagName;
				var className = _opts$resolve.className;
				var target = _opts$resolve.target;
				var attributes = _opts$resolve.attributes;


				var link = '<' + tagName + ' href="' + escapeAttr(formattedHref) + '"';

				if (className) {
					link += ' class="' + escapeAttr(className) + '"';
				}

				if (target) {
					link += ' target="' + escapeAttr(target) + '"';
				}

				if (attributes) {
					link += ' ' + attributesToString(attributes);
				}

				link += '>' + escapeText(formatted) + '</' + tagName + '>';
				result.push(link);
			}

			return result.join('');
		}

		if (!String.prototype.linkify) {
			String.prototype.linkify = function (opts) {
				return linkifyStr(this, opts);
			};
		}

		return linkifyStr;
	}(linkify);
	window.linkifyStr = linkifyString;
})(window, linkify);