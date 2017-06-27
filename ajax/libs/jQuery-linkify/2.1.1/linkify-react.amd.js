define('linkify-react', ['module', 'exports', 'react', './linkify'], function (module, exports, _react, _linkify) {
	'use strict';

	try { try { Object.defineProperty(exports, "__esModule", {
		value: true
	}); } catch (e) { exports['__esModule'] = true; } } catch (e) { exports['__esModule'] = true; }

	var _react2 = _interopRequireDefault(_react);

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

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			'default': obj
		};
	}

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
				elements.push(_react2['default'].createElement('br', { key: 'linkified-' + ++linkId }));
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

			elements.push(_react2['default'].createElement(tagName, props, formatted));
		}

		return elements;
	}

	// Recursively linkify the contents of the given React Element instance
	function linkifyReactElement(element, opts) {
		var elementId = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

		if (_react2['default'].Children.count(element.props.children) === 0) {
			// No need to clone if the element had no children
			return element;
		}

		var children = [];

		_react2['default'].Children.forEach(element.props.children, function (child) {
			if (typeof child === 'string') {
				children.push.apply(children, stringToElements(child, opts));
			} else if (_react2['default'].isValidElement(child)) {
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

		return _react2['default'].cloneElement(element, newProps, children);
	}

	var Linkify = _react2['default'].createClass({
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
			var element = _react2['default'].createElement(tagName, newProps);

			return linkifyReactElement(element, opts, 0);
		}
	});

	exports['default'] = Linkify;
	module.exports = exports['default'];
});