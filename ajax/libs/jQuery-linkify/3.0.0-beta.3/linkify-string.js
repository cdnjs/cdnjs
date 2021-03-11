var linkifyStr = (function (linkify) {
	'use strict';

	/**
		Convert strings of text into linkable HTML text
	*/
	var Options = linkify.options.Options;

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
	    result.push("".concat(attr, "=\"").concat(escapeAttr(val), "\""));
	  }

	  return result.join(' ');
	}
	/**
	 * Convert a plan text string to an HTML string with links. Expects that the
	 * given strings does not contain any HTML entities. Use the linkify-html
	 * interface if you need to parse HTML entities.
	 *
	 * @param {string} str string to linkify
	 * @param {object} [opts] overridable options
	 * @returns {string}
	 */


	function linkifyStr(str) {
	  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  opts = new Options(opts);
	  var tokens = linkify.tokenize(str);
	  var result = [];

	  for (var i = 0; i < tokens.length; i++) {
	    var token = tokens[i];

	    if (token.t === 'nl' && opts.nl2br) {
	      result.push('<br>\n');
	      continue;
	    } else if (!token.isLink || !opts.check(token)) {
	      result.push(escapeText(token.toString()));
	      continue;
	    }

	    var _opts$resolve = opts.resolve(token),
	        formatted = _opts$resolve.formatted,
	        formattedHref = _opts$resolve.formattedHref,
	        tagName = _opts$resolve.tagName,
	        className = _opts$resolve.className,
	        target = _opts$resolve.target,
	        rel = _opts$resolve.rel,
	        attributes = _opts$resolve.attributes;

	    var link = ["<".concat(tagName, " href=\"").concat(escapeAttr(formattedHref), "\"")];

	    if (className) {
	      link.push(" class=\"".concat(escapeAttr(className), "\""));
	    }

	    if (target) {
	      link.push(" target=\"".concat(escapeAttr(target), "\""));
	    }

	    if (rel) {
	      link.push(" rel=\"".concat(escapeAttr(rel), "\""));
	    }

	    if (attributes) {
	      link.push(" ".concat(attributesToString(attributes)));
	    }

	    link.push(">".concat(escapeText(formatted), "</").concat(tagName, ">"));
	    result.push(link.join(''));
	  }

	  return result.join('');
	}

	if (!String.prototype.linkify) {
	  Object.defineProperty(String.prototype, 'linkify', {
	    writable: false,
	    value: function linkify(options) {
	      return linkifyStr(this, options);
	    }
	  });
	}

	return linkifyStr;

}(linkify));
