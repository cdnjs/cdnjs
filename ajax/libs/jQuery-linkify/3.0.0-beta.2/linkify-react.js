var Linkify = (function (React, linkify) {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var Options = linkify.options.Options; // Given a string, converts to an array of valid React components
  // (which may include strings)

  function stringToElements(str, opts) {
    var tokens = linkify.tokenize(str);
    var elements = [];
    var linkId = 0;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (token.t === 'nl' && opts.nl2br) {
        elements.push(React.createElement('br', {
          key: "linkified-".concat(++linkId)
        }));
        continue;
      } else if (!token.isLink || !opts.check(token)) {
        // Regular text
        elements.push(token.toString());
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

      var props = {
        key: "linkified-".concat(++linkId),
        href: formattedHref
      };

      if (className) {
        props.className = className;
      }

      if (target) {
        props.target = target;
      }

      if (rel) {
        props.rel = rel;
      } // Build up additional attributes
      // Support for events via attributes hash


      if (attributes) {
        for (var attr in attributes) {
          props[attr] = attributes[attr];
        }
      }

      elements.push(React.createElement(tagName, props, formatted));
    }

    return elements;
  } // Recursively linkify the contents of the given React Element instance


  function linkifyReactElement(element, opts) {
    var elementId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    if (React.Children.count(element.props.children) === 0) {
      // No need to clone if the element had no children
      return element;
    }

    var children = [];
    React.Children.forEach(element.props.children, function (child) {
      if (typeof child === 'string') {
        // ensure that we always generate unique element IDs for keys
        elementId = elementId + 1;
        children.push.apply(children, _toConsumableArray(stringToElements(child, opts)));
      } else if (React.isValidElement(child)) {
        if (typeof child.type === 'string' && opts.ignoreTags.indexOf(child.type.toUpperCase()) >= 0) {
          // Don't linkify this element
          children.push(child);
        } else {
          children.push(linkifyReactElement(child, opts, ++elementId));
        }
      } else {
        // Unknown element type, just push
        children.push(child);
      }
    }); // Set a default unique key, copy over remaining props

    var newProps = {
      key: "linkified-element-".concat(elementId)
    };

    for (var prop in element.props) {
      newProps[prop] = element.props[prop];
    }

    return React.cloneElement(element, newProps, children);
  }
  /**
   * @class Linkify
   */


  var Linkify = /*#__PURE__*/function (_React$Component) {
    _inherits(Linkify, _React$Component);

    var _super = _createSuper(Linkify);

    function Linkify() {
      _classCallCheck(this, Linkify);

      return _super.apply(this, arguments);
    }

    _createClass(Linkify, [{
      key: "render",
      value: function render() {
        // Copy over all non-linkify-specific props
        var newProps = {
          key: 'linkified-element-0'
        };

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
    }]);

    return Linkify;
  }(React.Component);

  return Linkify;

}(React, linkify));
