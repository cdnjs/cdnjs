var linkifyElement = (function (linkify) {
  'use strict';

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

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;

    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = o[Symbol.iterator]();
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  var Options = linkify.options.Options;
  var HTML_NODE = 1,
      TXT_NODE = 3;
  /**
   * @param {HTMLElement} parent
   * @param {Text | HTMLElement} oldChild
   * @param {Array<Text | HTMLElement>} newChildren
   */

  function replaceChildWithChildren(parent, oldChild, newChildren) {
    var lastNewChild = newChildren[newChildren.length - 1];
    parent.replaceChild(lastNewChild, oldChild);

    for (var i = newChildren.length - 2; i >= 0; i--) {
      parent.insertBefore(newChildren[i], lastNewChild);
      lastNewChild = newChildren[i];
    }
  }
  /**
   * @param {Array<MultiToken>} tokens
   * @param {Object} opts
   * @param {Document} doc A
   * @returns {Array<Text | HTMLElement>}
   */


  function tokensToNodes(tokens, opts, doc) {
    var result = [];

    var _iterator = _createForOfIteratorHelper(tokens),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var token = _step.value;

        if (token.t === 'nl' && opts.nl2br) {
          result.push(doc.createElement('br'));
          continue;
        } else if (!token.isLink || !opts.check(token)) {
          result.push(doc.createTextNode(token.toString()));
          continue;
        }

        var _opts$resolve = opts.resolve(token),
            formatted = _opts$resolve.formatted,
            formattedHref = _opts$resolve.formattedHref,
            tagName = _opts$resolve.tagName,
            className = _opts$resolve.className,
            target = _opts$resolve.target,
            rel = _opts$resolve.rel,
            events = _opts$resolve.events,
            attributes = _opts$resolve.attributes; // Build the link


        var link = doc.createElement(tagName);
        link.setAttribute('href', formattedHref);

        if (className) {
          link.setAttribute('class', className);
        }

        if (target) {
          link.setAttribute('target', target);
        }

        if (rel) {
          link.setAttribute('rel', rel);
        } // Build up additional attributes


        if (attributes) {
          for (var attr in attributes) {
            link.setAttribute(attr, attributes[attr]);
          }
        }

        if (events) {
          for (var event in events) {
            if (link.addEventListener) {
              link.addEventListener(event, events[event]);
            } else if (link.attachEvent) {
              link.attachEvent('on' + event, events[event]);
            }
          }
        }

        link.appendChild(doc.createTextNode(formatted));
        result.push(link);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return result;
  }
  /**
   * Requires document.createElement
   * @param {HTMLElement} element
   * @param {Object} opts
   * @param {Document} doc
   * @returns {HTMLElement}
   */


  function linkifyElementHelper(element, opts, doc) {
    // Can the element be linkified?
    if (!element || element.nodeType !== HTML_NODE) {
      throw new Error("Cannot linkify ".concat(element, " - Invalid DOM Node type"));
    }

    var ignoreTags = opts.ignoreTags; // Is this element already a link?

    if (element.tagName === 'A' || ignoreTags.indexOf(element.tagName) >= 0) {
      // No need to linkify
      return element;
    }

    var childElement = element.firstChild;

    while (childElement) {
      var str = void 0,
          tokens = void 0,
          nodes = void 0;

      switch (childElement.nodeType) {
        case HTML_NODE:
          linkifyElementHelper(childElement, opts, doc);
          break;

        case TXT_NODE:
          {
            str = childElement.nodeValue;
            tokens = linkify.tokenize(str);

            if (tokens.length === 0 || tokens.length === 1 && tokens[0].t === 'text') {
              // No node replacement required
              break;
            }

            nodes = tokensToNodes(tokens, opts, doc); // Swap out the current child for the set of nodes

            replaceChildWithChildren(element, childElement, nodes); // so that the correct sibling is selected next

            childElement = nodes[nodes.length - 1];
            break;
          }
      }

      childElement = childElement.nextSibling;
    }

    return element;
  }
  /**
   * Recursively traverse the given DOM node, find all links in the text and
   * convert them to anchor tags.
   *
   * @param {HTMLElement} element A DOM node to linkify
   * @param {Object} opts linkify options
   * @param {Document} [doc] window.document implementation, if differs from global
   * @returns {HTMLElement}
   */


  function linkifyElement(element, opts) {
    var doc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    try {
      doc = doc || document || window && window.document || global && global.document;
    } catch (e) {
      /* do nothing for now */
    }

    if (!doc) {
      throw new Error('Cannot find document implementation. ' + 'If you are in a non-browser environment like Node.js, ' + 'pass the document implementation as the third argument to linkifyElement.');
    }

    opts = new Options(opts);
    return linkifyElementHelper(element, opts, doc);
  } // Maintain reference to the recursive helper to cache option-normalization


  linkifyElement.helper = linkifyElementHelper;

  linkifyElement.normalize = function (opts) {
    return new Options(opts);
  };

  return linkifyElement;

}(linkify));
