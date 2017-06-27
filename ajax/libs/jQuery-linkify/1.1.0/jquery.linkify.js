/*
 *  Linkify - v1.1.0
 *  Find URLs in plain text and return HTML for discovered links.
 *  https://github.com/HitSend/jQuery-linkify/
 *
 *  Made by SoapBox Innovations, Inc.
 *  Under MIT License
 */

;(function ($, window, document, undefined) {
"use strict";
/**
	A Linkified object contains a DOM node (or just plain text) whose
	inner text is replaced by HTML containing `<a>` links to URLs
	discovered in that text. Call with

		new Linkified(text, options)

	Here are some the available options and their defaults

		{
			tagName: 'a',
			newLine: '\n',
			target: '_blank',
			linkClass: null,
			linkClasses: [],
			linkAttributes: null
		}

	@class Linkified
*/

var defaults = {
	tagName: 'a',
	newLine: '\n',
	target: '_blank',
	linkClass: null,
	linkClasses: [],
	linkAttributes: null
};

function Linkified(element, options) {

	// Setup
	this._defaults = defaults;
	this.element = element;
	this.setOptions(options);
	this.init();
}

Linkified.prototype = {

	constructor: Linkified,

	/**
		Initializer
		@method	init
	*/
	init: function () {
		if (this.element.nodeType === 1) {
			Linkified.linkifyNode.call(this, this.element);
		} else {
			this.element = Linkified.linkify.apply(
				this,
				this.element.toString()
			);
		}
	},

	/**
		Used to reset the options for this plugin
		@method	setOptions
		@param	{Object} options
	*/
	setOptions: function (options) {
		this.settings = Linkified.extendSettings(options, this.settings);
	},

	/**
		Returns the HTML of the linkified text.
		@method	toString
		@return	{String} html
	*/
	toString: function () {

		// Returned the linkified HTML
		return this.element.toString();
	}


};

/**
	Create an extended settings object using the default options.
	Include a second hash to use those as defaults instead.
	@method	extendSettings
	@static
	@param	{Object} options Hash of options to use for extending
	@param	{Object} settings Existing settings object to extend from. If undefined, the defaults will be used
*/
Linkified.extendSettings = function (options, settings) {
	var prop;

	settings = settings || {};

	for (prop in defaults) {
		if (!settings[prop]) {
			settings[prop] = defaults[prop];
		}
	}

	for (prop in options) {
		settings[prop] = options[prop];
	}
	return settings;
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


/**
	Linkify the given text
	@method	linkify
	@param	{String} text Plain text to linkify
	@param	{Options} options to linkify with, in addition to the defaults for the context
	@return	{String} html
*/
Linkified.linkify = function (text, options) {

	var attr,
		settings,
		linkClasses,
		linkReplace = [];

	if (this.constructor === Linkified && this.settings) {

		// Called from an instance of Linkified
		settings = this.settings;
		if (options) {
			settings = Linkified.extendSettings(options, settings);
		}

	} else {
		settings = Linkified.extendSettings(options);
	}

	// Normalize class names
	if (settings.linkClass) {
		linkClasses = settings.linkClass.split(/\s+/);
	} else {
		linkClasses = [];
	}

	linkClasses.push.apply(linkClasses, settings.linkClasses);


	// Get rid of tags and HTML-structure,
	// Duplicate whitespace in preparation for linking
	text = text
		.replace(/</g, '&lt;')
		.replace(/(\s)/g, '$1$1');

	// Build up the replacement string

	linkReplace.push(
		'$1<' + settings.tagName,
		'href="http://$2$4$5$6"'
	);

	// Add classes
	linkReplace.push(
		'class="linkified' +
		(linkClasses.length > 0 ? ' ' + linkClasses.join(' ') : '') +
		'"'
	);

	// Add target
	if (settings.target) {
		linkReplace.push('target="' + settings.target + '"');
	}

	// Add other (normalized) attributes
	for (attr in settings.linkAttributes) {
		linkReplace.push([
			attr,
			'="',
			settings.linkAttributes[attr]
				.replace(/\"/g, '&quot;')
				.replace(/\$/g, '&#36;'),
			'"'
		].join(''));
	}

	// Finish off
	linkReplace.push('>$2$3$4$5$6</' + settings.tagName + '>$7');

	// Create the link
	text = text.replace(Linkified.linkMatch, linkReplace.join(' '));

	// The previous line added `http://` to emails. Replace that with `mailto:`
	text = text.replace(Linkified.emailLinkMatch, '$1mailto:$3');

	// Revert whitespace characters back to a single character
	text = text.replace(/(\s){2}/g, '$1');

	// Trim and account for new lines
	text = text.replace(/\n/g, settings.newLine);

	return text;

};

/**
	Given an HTML DOM node, linkify its contents
	@method	linkifyNode
	@static
	@param	{Element} node The HTML node to find URLs in
	@return {Element} node
*/
Linkified.linkifyNode = function (node) {

	var children,
		childNode,
		childCount,
		dummyElement,
		i;

	// Don't linkify anchor tags or tags that have the .linkified class
	if (node &&
		typeof node === 'object' &&
		node.nodeType === 1 &&
		node.tagName.toLowerCase() !== 'a' &&
		!/[^\s]linkified[\s$]/.test(node.className)
	) {

		children = [];
		dummyElement = Linkified._dummyElement ||
			document.createElement('div');

		childNode = node.firstChild;
		childCount = node.childElementCount;

		while (childNode) {

			if (childNode.nodeType === 3) {

				/*
					Cleanup dummy node. This is to make sure that
					existing nodes don't get improperly removed
				*/
				while (dummyElement.firstChild) {
					dummyElement.removeChild(dummyElement.firstChild);
				}

				/*
					Linkify the text node, set the result to the
					dummy's contents
				*/
				dummyElement.innerHTML = Linkified.linkify.call(
					this,
					childNode.textContent || childNode.innerText
				);

				/*
					Parse the linkified text and append it to the
					new children
				*/
				children.push.apply(
					children,
					dummyElement.childNodes
				);

				// Clean up the dummy again?
				while (dummyElement.firstChild) {
					dummyElement.removeChild(dummyElement.firstChild);
				}

			} else if (childNode.nodeType === 1) {

				// This is an HTML node, linkify it and add it
				children.push(Linkified.linkifyNode(childNode));

			} else {

				// This is some other kind of node, just push it
				children.push(childNode);
			}

			childNode = childNode.nextSibling;
		}


		// Remove all existing nodes.
		while (node.firstChild) {
			node.removeChild(node.firstChild);
		}

		// Replace with all the new nodes
		for (i = 0; i < children.length; i++) {
			node.appendChild(children[i]);
		}

	}
	return node;
},

Linkified._dummyElement = document.createElement('div');

// Plugin definition
$.fn.linkify = function (options) {
	return this.each(function () {

		var linkified;

		if (linkified = $.data(this, 'plugin-linkify')) {

			// Relinkify
			linkified.setOptions(options);
			linkified.init();

		} else {

			// Linkify
			$.data(
				this,
				'plugin-linkify',
				new Linkified(this, options)
			);

		}
	});
};

// Maintain access to the constructor from the plugin
$.fn.linkify.Constructor = Linkified;

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
		isEmail = /^mailto:/i.test(url),
		target = $link.attr('target');

	if (isEmail) {

		// mailto links ignore the target
		window.location.href = url;

	} else {
		window.open(url, target);
	}

	return false;
});


})(jQuery, window, document)
