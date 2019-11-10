/*
 *  Linkify - v1.0.1
 *  Find URLs in plain text and return HTML for discovered links.
 *  https://github.com/HitSend/jQuery-linkify/
 *
 *  Made by SoapBox Innovations, Inc.
 *  Under MIT License
 */
;(function ($, window, document, undefined) {

	// Create the defaults once
	var pluginName = 'linkify',
		defaults = {
			tagName: 'a',
			newLine: '\n',
			target: '_blank',
			linkClass: null,
			linkClasses: ['linkified'],
			linkAttributes: null
		};

	/**
		A Linkified object contains a DOM node (or just plain text) whose
		inner text is replaced by HTML containing `<a>` links to URLs
		discovered in that text. Call with

			new Linkified(element, options)

		Here are some the available options and their defaults

			{
				tagName: 'a',
				newLine: '\n',
				target: '_blank',
				linkClass: null,
				linkClasses: ['linkified'],
				linkAttributes: null
			}

		@class Linkified
	*/
	function Linkified(element, options) {

		this.element = element;

		// Setup settings
		this.settings = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;

		this.init();
	}

	Linkified.prototype = {

		constructor: Linkified,

		/**
			Initialized
			@method	init
		*/
		init: function () {
			this.settings.linkClasses = this.settings.linkClasses || [];
			this.linkify();
		},

		/**
			Linkify the contained element
			@method	linkify
			@return	{String} html
		*/
		linkify: function (options) {

			if (options) {
				$.extend(this.settings, options);
			}

			var attr,
				linkClass = this.settings.linkClass,
				linkClasses = this.settings.linkClasses || [],
				linkReplace = [],
				text = typeof this.element === 'object' && this.element.textContent ?
					this.element.textContent :
					this.element.toString() || '';

			// Normalize class names
			if (linkClass && $.inArray(linkClass, linkClasses) < 0) {
				linkClasses.push(linkClass);
				this.settings.linkClass = undefined;
			}

			// Get rid of tags and HTML-structure,
			// Duplicate whitespace in preparation for linking
			text = text
				.replace(/</g, '&lt;')
				.replace(/(\s)/g, '$1$1');

			// Build up the replacement string

			linkReplace.push(
				'$1<' + this.settings.tagName,
				'href="http://$2$4$5$6"'
			);

			// Add classes
			if (linkClasses.length > 0) {
				linkReplace.push('class="' + linkClasses.join(' ') + '"');
			}

			// Add target
			if (this.settings.target) {
				linkReplace.push('target="' + this.settings.target + '"');
			}

			// Add other (normalized) attributes
			for (attr in this.settings.linkAttributes) {
				linkReplace.push([
					attr,
					'="',
					this.settings.linkAttributes[attr]
						.replace(/\"/g, '&quot;')
						.replace(/\$/g, '&#36;'),
					'"'
				].join(''));
			}

			// Finish off
			linkReplace.push('>$2$3$4$5$6</' + this.settings.tagName + '>$7');

			// Create the link
			text = text.replace(this.constructor.linkMatch, linkReplace.join(' '));

			// The previous line added `http://` to emails. Replace that with `mailto:`
			text = text.replace(this.constructor.emailLinkMatch, '$1mailto:$3');

			// Revert whitespace characters back to a single character
			text = text.replace(/(\s){2}/g, '$1');

			// Trim and account for new lines
			text = text
				.replace(/^\s+|\s+$/g, '')
				.replace(/\n/g, this.settings.newLine);

			if (typeof this.element === 'object') {

				// Set the HTML on the element to the newly linkified text
				this.element.innerHTML = text;
			}

			this.html = text;

			return text;
		},

		/**
			Returns the HTML of the linkified element.
			@method	toString
			@return	{String} html
		*/
		toString: function () {

			// Returned the linkified HTML
			return this.html || '';
		}

	};

	/**
		The url-matching regular expression for double-spaced text
		@property	linkMatch
		@static
		@type		RegExp
	*/
	Linkified.linkMatch = new RegExp([

		// The groups
		'(', // 1. Character before the link
		'\\s|[^a-zA-Z0-9.\\+_\\/"\\>\\-]|^',
		')(?:', //Main group
		'(', // 2. Email address (optional)
		'[a-zA-Z0-9\\+_\\-]+',
		'(?:',
		'\\.[a-zA-Z0-9\\+_\\-]+',
		')*@',
		')?(', // 3. Protocol (optional)
		'http:\\/\\/|https:\\/\\/|ftp:\\/\\/',
		')?(', // 4. Domain & Subdomains
		'(?:(?:[a-z0-9][a-z0-9_%\\-_+]*\\.)+)',
		')(', // 5. Top-level domain - http://en.wikipedia.org/wiki/List_of_Internet_top-level_domains
		'(?:com|ca|co|edu|gov|net|org|dev|biz|cat|int|pro|tel|mil|aero|asia|coop|info|jobs|mobi|museum|name|post|travel|local|[a-z]{2})',
		')(', // 6. Query string (optional)
		'(?:',
		'[\\/|\\?]',
		'(?:',
		'[\\-a-zA-Z0-9_%#*&+=~!?,;:.\\/]*',
		')*',
		')',
		'[\\-\\/a-zA-Z0-9_%#*&+=~]',
		'|',
		'\\/?',
		')?',
		')(', // 7. Character after the link
		'[^a-zA-Z0-9\\+_\\/"\\<\\-]|$',
		')'
	].join(''), 'g');

	/**
		The regular expression of matching email links after the
		application of the initial link matcher.

		@property	emailLinkMatch
		@static
		@type		RegExp
	*/
	Linkified.emailLinkMatch = /(<[a-z]+ href=\")(http:\/\/)([a-zA-Z0-9\+_\-]+(?:\.[a-zA-Z0-9\+_\-]+)*@)/g;


	// Plugin definition
	$.fn[pluginName] = function (options) {
		return this.each(function () {
			if (!$.data(this, 'plugin-' + pluginName)) {
				$.data(this, 'plugin-' + pluginName, new Linkified(this, options));
			} else {
				$.data(this, 'plugin-' + pluginName).linkify(options);
			}
		});
	};

	// Maintain access to the constructor from the plugin
	$.fn[pluginName].Constructor = Linkified;

	// DOM data- API setup
	$(window).on('load', function () {
		$('[data-linkify]').each(function () {
			var $this = $(this),
				$target,
				target = $this.attr('data-linkify'),
				options = {
					tagName: $this.attr('data-linkify-tagname') || undefined,
					newLine: $this.attr('data-linkify-newline') || undefined,
					target: $this.attr('data-linkify-target') || undefined,
					linkClass: $this.attr('data-linkify-linkclass') || undefined
				};

			$target = target === 'this' ? $this : $this.find(target);
			$target.linkify(options);

		});
	});

	// Setup click events for linkified elements
	$('body').on('click', '.linkified', function () {
		var $link = $(this),
			url = $link.attr('href'),
			isEmail = url.substr(0, 7) === 'mailto:',
			target = $link.attr('target');

		if (isEmail) {

			// mailto links ignore the target
			window.location.href = url;

		} else {
			window.open(url, target);
		}

		return false;
	});

})(jQuery, window, document);
