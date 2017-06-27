'use strict';

;(function (window, React, linkify) {
	var linkifyReact = function (React, linkify) {
		'use strict';

		React = 'default' in React ? React['default'] : React;

		var options = linkify.options;
		var Options = options.Options;

		// Given a string, converts to an array of valid React components
		// (which may include strings)

		function stringToElements(str, opts) {

			var tokens = linkify.tokenize(str);
			var elements = [];
			var linkId = 0;

			for (var i = 0; i < tokens.length; i++) {
				var token = tokens[i];

				if (token.type === 'nl' && opts.nl2br) {
					elements.push(React.createElement('br', { key: 'linkified-' + ++linkId }));
					continue;
				} else if (!token.isLink || !opts.check(token)) {
					// Regular text
					elements.push(token.toString());
					continue;
				}

				var _opts$resolve = opts.resolve(token);

				var href = _opts$resolve.href;
				var formatted = _opts$resolve.formatted;
				var formattedHref = _opts$resolve.formattedHref;
				var tagName = _opts$resolve.tagName;
				var className = _opts$resolve.className;
				var target = _opts$resolve.target;
				var attributes = _opts$resolve.attributes;
				var events = _opts$resolve.events;


				var props = {
					key: 'linkified-' + ++linkId,
					href: formattedHref
				};

				if (className) {
					props.className = className;
				}

				if (target) {
					props.target = target;
				}

				// Build up additional attributes
				// Support for events via attributes hash
				if (attributes) {
					for (var attr in attributes) {
						props[attr] = attributes[attr];
					}
				}

				elements.push(React.createElement(tagName, props, formatted));
			}

			return elements;
		}

		// Recursively linkify the contents of the given React Element instance
		function linkifyReactElement(element, opts) {
			var elementId = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

			if (React.Children.count(element.props.children) === 0) {
				// No need to clone if the element had no children
				return element;
			}

			var children = [];

			React.Children.forEach(element.props.children, function (child) {
				if (typeof child === 'string') {
					children.push.apply(children, stringToElements(child, opts));
				} else if (React.isValidElement(child)) {
					if (typeof child.type === 'string' && options.contains(opts.ignoreTags, child.type.toUpperCase())) {
						// Don't linkify this element
						children.push(child);
					} else {
						children.push(linkifyReactElement(child, opts, ++elementId));
					}
				} else {
					// Unknown element type, just push
					children.push(child);
				}
			});

			// Set a default unique key, copy over remaining props
			var newProps = { key: 'linkified-element-' + elementId };
			for (var prop in element.props) {
				newProps[prop] = element.props[prop];
			}

			return React.cloneElement(element, newProps, children);
		}

		var Linkify = React.createClass({
			render: function render() {
				// Copy over all non-linkify-specific props
				var newProps = { key: 'linkified-element-0' };
				for (var prop in this.props) {
					if (prop !== 'options' && prop !== 'tagName') {
						newProps[prop] = this.props[prop];
					}
				}

				var opts = new Options(this.props.options);
				var tagName = this.props.tagName || 'span';
				var element = React.createElement(tagName, newProps);

				return linkifyReactElement(element, opts, 0);
			}
		});

		return Linkify;
	}(React, linkify);
	window.Linkify = window.LinkifyReact = linkifyReact;
})(window, React, linkify);