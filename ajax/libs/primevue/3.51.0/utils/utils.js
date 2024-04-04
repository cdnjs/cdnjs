this.primevue = this.primevue || {};
this.primevue.utils = (function (exports) {
    'use strict';

    function _createForOfIteratorHelper$1(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$3(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
    function _toConsumableArray$3(arr) { return _arrayWithoutHoles$3(arr) || _iterableToArray$3(arr) || _unsupportedIterableToArray$3(arr) || _nonIterableSpread$3(); }
    function _nonIterableSpread$3() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
    function _iterableToArray$3(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
    function _arrayWithoutHoles$3(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$3(arr); }
    function _typeof$3(o) { "@babel/helpers - typeof"; return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$3(o); }
    function _slicedToArray$1(arr, i) { return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$3(arr, i) || _nonIterableRest$1(); }
    function _nonIterableRest$1() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
    function _unsupportedIterableToArray$3(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$3(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3(o, minLen); }
    function _arrayLikeToArray$3(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
    function _iterableToArrayLimit$1(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
    function _arrayWithHoles$1(arr) { if (Array.isArray(arr)) return arr; }
    var DomHandler = {
      innerWidth: function innerWidth(el) {
        if (el) {
          var width = el.offsetWidth;
          var style = getComputedStyle(el);
          width += parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
          return width;
        }
        return 0;
      },
      width: function width(el) {
        if (el) {
          var width = el.offsetWidth;
          var style = getComputedStyle(el);
          width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
          return width;
        }
        return 0;
      },
      getWindowScrollTop: function getWindowScrollTop() {
        var doc = document.documentElement;
        return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
      },
      getWindowScrollLeft: function getWindowScrollLeft() {
        var doc = document.documentElement;
        return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
      },
      getOuterWidth: function getOuterWidth(el, margin) {
        if (el) {
          var width = el.offsetWidth;
          if (margin) {
            var style = getComputedStyle(el);
            width += parseFloat(style.marginLeft) + parseFloat(style.marginRight);
          }
          return width;
        }
        return 0;
      },
      getOuterHeight: function getOuterHeight(el, margin) {
        if (el) {
          var height = el.offsetHeight;
          if (margin) {
            var style = getComputedStyle(el);
            height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
          }
          return height;
        }
        return 0;
      },
      getClientHeight: function getClientHeight(el, margin) {
        if (el) {
          var height = el.clientHeight;
          if (margin) {
            var style = getComputedStyle(el);
            height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
          }
          return height;
        }
        return 0;
      },
      getViewport: function getViewport() {
        var win = window,
          d = document,
          e = d.documentElement,
          g = d.getElementsByTagName('body')[0],
          w = win.innerWidth || e.clientWidth || g.clientWidth,
          h = win.innerHeight || e.clientHeight || g.clientHeight;
        return {
          width: w,
          height: h
        };
      },
      getOffset: function getOffset(el) {
        if (el) {
          var rect = el.getBoundingClientRect();
          return {
            top: rect.top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0),
            left: rect.left + (window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0)
          };
        }
        return {
          top: 'auto',
          left: 'auto'
        };
      },
      index: function index(element) {
        if (element) {
          var _this$getParentNode;
          var children = (_this$getParentNode = this.getParentNode(element)) === null || _this$getParentNode === void 0 ? void 0 : _this$getParentNode.childNodes;
          var num = 0;
          for (var i = 0; i < children.length; i++) {
            if (children[i] === element) return num;
            if (children[i].nodeType === 1) num++;
          }
        }
        return -1;
      },
      addMultipleClasses: function addMultipleClasses(element, classNames) {
        var _this = this;
        if (element && classNames) {
          [classNames].flat().filter(Boolean).forEach(function (cNames) {
            return cNames.split(' ').forEach(function (className) {
              return _this.addClass(element, className);
            });
          });
        }
      },
      removeMultipleClasses: function removeMultipleClasses(element, classNames) {
        var _this2 = this;
        if (element && classNames) {
          [classNames].flat().filter(Boolean).forEach(function (cNames) {
            return cNames.split(' ').forEach(function (className) {
              return _this2.removeClass(element, className);
            });
          });
        }
      },
      addClass: function addClass(element, className) {
        if (element && className && !this.hasClass(element, className)) {
          if (element.classList) element.classList.add(className);else element.className += ' ' + className;
        }
      },
      removeClass: function removeClass(element, className) {
        if (element && className) {
          if (element.classList) element.classList.remove(className);else element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
      },
      hasClass: function hasClass(element, className) {
        if (element) {
          if (element.classList) return element.classList.contains(className);else return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
        }
        return false;
      },
      addStyles: function addStyles(element) {
        var styles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        if (element) {
          Object.entries(styles).forEach(function (_ref) {
            var _ref2 = _slicedToArray$1(_ref, 2),
              key = _ref2[0],
              value = _ref2[1];
            return element.style[key] = value;
          });
        }
      },
      find: function find(element, selector) {
        return this.isElement(element) ? element.querySelectorAll(selector) : [];
      },
      findSingle: function findSingle(element, selector) {
        return this.isElement(element) ? element.querySelector(selector) : null;
      },
      createElement: function createElement(type) {
        var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        if (type) {
          var element = document.createElement(type);
          this.setAttributes(element, attributes);
          for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            children[_key - 2] = arguments[_key];
          }
          element.append.apply(element, children);
          return element;
        }
        return undefined;
      },
      setAttribute: function setAttribute(element) {
        var attribute = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var value = arguments.length > 2 ? arguments[2] : undefined;
        if (this.isElement(element) && value !== null && value !== undefined) {
          element.setAttribute(attribute, value);
        }
      },
      setAttributes: function setAttributes(element) {
        var _this3 = this;
        var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        if (this.isElement(element)) {
          var computedStyles = function computedStyles(rule, value) {
            var _element$$attrs, _element$$attrs2;
            var styles = element !== null && element !== void 0 && (_element$$attrs = element.$attrs) !== null && _element$$attrs !== void 0 && _element$$attrs[rule] ? [element === null || element === void 0 || (_element$$attrs2 = element.$attrs) === null || _element$$attrs2 === void 0 ? void 0 : _element$$attrs2[rule]] : [];
            return [value].flat().reduce(function (cv, v) {
              if (v !== null && v !== undefined) {
                var type = _typeof$3(v);
                if (type === 'string' || type === 'number') {
                  cv.push(v);
                } else if (type === 'object') {
                  var _cv = Array.isArray(v) ? computedStyles(rule, v) : Object.entries(v).map(function (_ref3) {
                    var _ref4 = _slicedToArray$1(_ref3, 2),
                      _k = _ref4[0],
                      _v = _ref4[1];
                    return rule === 'style' && (!!_v || _v === 0) ? "".concat(_k.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(), ":").concat(_v) : !!_v ? _k : undefined;
                  });
                  cv = _cv.length ? cv.concat(_cv.filter(function (c) {
                    return !!c;
                  })) : cv;
                }
              }
              return cv;
            }, styles);
          };
          Object.entries(attributes).forEach(function (_ref5) {
            var _ref6 = _slicedToArray$1(_ref5, 2),
              key = _ref6[0],
              value = _ref6[1];
            if (value !== undefined && value !== null) {
              var matchedEvent = key.match(/^on(.+)/);
              if (matchedEvent) {
                element.addEventListener(matchedEvent[1].toLowerCase(), value);
              } else if (key === 'p-bind') {
                _this3.setAttributes(element, value);
              } else {
                value = key === 'class' ? _toConsumableArray$3(new Set(computedStyles('class', value))).join(' ').trim() : key === 'style' ? computedStyles('style', value).join(';').trim() : value;
                (element.$attrs = element.$attrs || {}) && (element.$attrs[key] = value);
                element.setAttribute(key, value);
              }
            }
          });
        }
      },
      getAttribute: function getAttribute(element, name) {
        if (this.isElement(element)) {
          var value = element.getAttribute(name);
          if (!isNaN(value)) {
            return +value;
          }
          if (value === 'true' || value === 'false') {
            return value === 'true';
          }
          return value;
        }
        return undefined;
      },
      isAttributeEquals: function isAttributeEquals(element, name, value) {
        return this.isElement(element) ? this.getAttribute(element, name) === value : false;
      },
      isAttributeNotEquals: function isAttributeNotEquals(element, name, value) {
        return !this.isAttributeEquals(element, name, value);
      },
      getHeight: function getHeight(el) {
        if (el) {
          var height = el.offsetHeight;
          var style = getComputedStyle(el);
          height -= parseFloat(style.paddingTop) + parseFloat(style.paddingBottom) + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
          return height;
        }
        return 0;
      },
      getWidth: function getWidth(el) {
        if (el) {
          var width = el.offsetWidth;
          var style = getComputedStyle(el);
          width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight) + parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
          return width;
        }
        return 0;
      },
      absolutePosition: function absolutePosition(element, target) {
        var gutter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        if (element) {
          var elementDimensions = element.offsetParent ? {
            width: element.offsetWidth,
            height: element.offsetHeight
          } : this.getHiddenElementDimensions(element);
          var elementOuterHeight = elementDimensions.height;
          var elementOuterWidth = elementDimensions.width;
          var targetOuterHeight = target.offsetHeight;
          var targetOuterWidth = target.offsetWidth;
          var targetOffset = target.getBoundingClientRect();
          var windowScrollTop = this.getWindowScrollTop();
          var windowScrollLeft = this.getWindowScrollLeft();
          var viewport = this.getViewport();
          var top,
            left,
            origin = 'top';
          if (targetOffset.top + targetOuterHeight + elementOuterHeight > viewport.height) {
            top = targetOffset.top + windowScrollTop - elementOuterHeight;
            origin = 'bottom';
            if (top < 0) {
              top = windowScrollTop;
            }
          } else {
            top = targetOuterHeight + targetOffset.top + windowScrollTop;
          }
          if (targetOffset.left + elementOuterWidth > viewport.width) left = Math.max(0, targetOffset.left + windowScrollLeft + targetOuterWidth - elementOuterWidth);else left = targetOffset.left + windowScrollLeft;
          element.style.top = top + 'px';
          element.style.left = left + 'px';
          element.style.transformOrigin = origin;
          gutter && (element.style.marginTop = origin === 'bottom' ? 'calc(var(--p-anchor-gutter) * -1)' : 'calc(var(--p-anchor-gutter))');
        }
      },
      relativePosition: function relativePosition(element, target) {
        var gutter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        if (element) {
          var elementDimensions = element.offsetParent ? {
            width: element.offsetWidth,
            height: element.offsetHeight
          } : this.getHiddenElementDimensions(element);
          var targetHeight = target.offsetHeight;
          var targetOffset = target.getBoundingClientRect();
          var viewport = this.getViewport();
          var top,
            left,
            origin = 'top';
          if (targetOffset.top + targetHeight + elementDimensions.height > viewport.height) {
            top = -1 * elementDimensions.height;
            origin = 'bottom';
            if (targetOffset.top + top < 0) {
              top = -1 * targetOffset.top;
            }
          } else {
            top = targetHeight;
          }
          if (elementDimensions.width > viewport.width) {
            // element wider then viewport and cannot fit on screen (align at left side of viewport)
            left = targetOffset.left * -1;
          } else if (targetOffset.left + elementDimensions.width > viewport.width) {
            // element wider then viewport but can be fit on screen (align at right side of viewport)
            left = (targetOffset.left + elementDimensions.width - viewport.width) * -1;
          } else {
            // element fits on screen (align with target)
            left = 0;
          }
          element.style.top = top + 'px';
          element.style.left = left + 'px';
          element.style.transformOrigin = origin;
          gutter && (element.style.marginTop = origin === 'bottom' ? 'calc(var(--p-anchor-gutter) * -1)' : 'calc(var(--p-anchor-gutter))');
        }
      },
      nestedPosition: function nestedPosition(element, level) {
        if (element) {
          var parentItem = element.parentElement;
          var elementOffset = this.getOffset(parentItem);
          var viewport = this.getViewport();
          var sublistWidth = element.offsetParent ? element.offsetWidth : this.getHiddenElementOuterWidth(element);
          var itemOuterWidth = this.getOuterWidth(parentItem.children[0]);
          var left;
          if (parseInt(elementOffset.left, 10) + itemOuterWidth + sublistWidth > viewport.width - this.calculateScrollbarWidth()) {
            if (parseInt(elementOffset.left, 10) < sublistWidth) {
              // for too small screens
              if (level % 2 === 1) {
                left = parseInt(elementOffset.left, 10) ? '-' + parseInt(elementOffset.left, 10) + 'px' : '100%';
              } else if (level % 2 === 0) {
                left = viewport.width - sublistWidth - this.calculateScrollbarWidth() + 'px';
              }
            } else {
              left = '-100%';
            }
          } else {
            left = '100%';
          }
          element.style.top = '0px';
          element.style.left = left;
        }
      },
      getParentNode: function getParentNode(element) {
        var parent = element === null || element === void 0 ? void 0 : element.parentNode;
        if (parent && parent instanceof ShadowRoot && parent.host) {
          parent = parent.host;
        }
        return parent;
      },
      getParents: function getParents(element) {
        var parents = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var parent = this.getParentNode(element);
        return parent === null ? parents : this.getParents(parent, parents.concat([parent]));
      },
      getScrollableParents: function getScrollableParents(element) {
        var scrollableParents = [];
        if (element) {
          var parents = this.getParents(element);
          var overflowRegex = /(auto|scroll)/;
          var overflowCheck = function overflowCheck(node) {
            try {
              var styleDeclaration = window['getComputedStyle'](node, null);
              return overflowRegex.test(styleDeclaration.getPropertyValue('overflow')) || overflowRegex.test(styleDeclaration.getPropertyValue('overflowX')) || overflowRegex.test(styleDeclaration.getPropertyValue('overflowY'));
            } catch (err) {
              return false;
            }
          };
          var _iterator = _createForOfIteratorHelper$1(parents),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var parent = _step.value;
              var scrollSelectors = parent.nodeType === 1 && parent.dataset['scrollselectors'];
              if (scrollSelectors) {
                var selectors = scrollSelectors.split(',');
                var _iterator2 = _createForOfIteratorHelper$1(selectors),
                  _step2;
                try {
                  for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                    var selector = _step2.value;
                    var el = this.findSingle(parent, selector);
                    if (el && overflowCheck(el)) {
                      scrollableParents.push(el);
                    }
                  }
                } catch (err) {
                  _iterator2.e(err);
                } finally {
                  _iterator2.f();
                }
              }
              if (parent.nodeType !== 9 && overflowCheck(parent)) {
                scrollableParents.push(parent);
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
        return scrollableParents;
      },
      getHiddenElementOuterHeight: function getHiddenElementOuterHeight(element) {
        if (element) {
          element.style.visibility = 'hidden';
          element.style.display = 'block';
          var elementHeight = element.offsetHeight;
          element.style.display = 'none';
          element.style.visibility = 'visible';
          return elementHeight;
        }
        return 0;
      },
      getHiddenElementOuterWidth: function getHiddenElementOuterWidth(element) {
        if (element) {
          element.style.visibility = 'hidden';
          element.style.display = 'block';
          var elementWidth = element.offsetWidth;
          element.style.display = 'none';
          element.style.visibility = 'visible';
          return elementWidth;
        }
        return 0;
      },
      getHiddenElementDimensions: function getHiddenElementDimensions(element) {
        if (element) {
          var dimensions = {};
          element.style.visibility = 'hidden';
          element.style.display = 'block';
          dimensions.width = element.offsetWidth;
          dimensions.height = element.offsetHeight;
          element.style.display = 'none';
          element.style.visibility = 'visible';
          return dimensions;
        }
        return 0;
      },
      fadeIn: function fadeIn(element, duration) {
        if (element) {
          element.style.opacity = 0;
          var last = +new Date();
          var opacity = 0;
          var tick = function tick() {
            opacity = +element.style.opacity + (new Date().getTime() - last) / duration;
            element.style.opacity = opacity;
            last = +new Date();
            if (+opacity < 1) {
              window.requestAnimationFrame && requestAnimationFrame(tick) || setTimeout(tick, 16);
            }
          };
          tick();
        }
      },
      fadeOut: function fadeOut(element, ms) {
        if (element) {
          var opacity = 1,
            interval = 50,
            duration = ms,
            gap = interval / duration;
          var fading = setInterval(function () {
            opacity -= gap;
            if (opacity <= 0) {
              opacity = 0;
              clearInterval(fading);
            }
            element.style.opacity = opacity;
          }, interval);
        }
      },
      getUserAgent: function getUserAgent() {
        return navigator.userAgent;
      },
      appendChild: function appendChild(element, target) {
        if (this.isElement(target)) target.appendChild(element);else if (target.el && target.elElement) target.elElement.appendChild(element);else throw new Error('Cannot append ' + target + ' to ' + element);
      },
      isElement: function isElement(obj) {
        return (typeof HTMLElement === "undefined" ? "undefined" : _typeof$3(HTMLElement)) === 'object' ? obj instanceof HTMLElement : obj && _typeof$3(obj) === 'object' && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === 'string';
      },
      scrollInView: function scrollInView(container, item) {
        var borderTopValue = getComputedStyle(container).getPropertyValue('borderTopWidth');
        var borderTop = borderTopValue ? parseFloat(borderTopValue) : 0;
        var paddingTopValue = getComputedStyle(container).getPropertyValue('paddingTop');
        var paddingTop = paddingTopValue ? parseFloat(paddingTopValue) : 0;
        var containerRect = container.getBoundingClientRect();
        var itemRect = item.getBoundingClientRect();
        var offset = itemRect.top + document.body.scrollTop - (containerRect.top + document.body.scrollTop) - borderTop - paddingTop;
        var scroll = container.scrollTop;
        var elementHeight = container.clientHeight;
        var itemHeight = this.getOuterHeight(item);
        if (offset < 0) {
          container.scrollTop = scroll + offset;
        } else if (offset + itemHeight > elementHeight) {
          container.scrollTop = scroll + offset - elementHeight + itemHeight;
        }
      },
      clearSelection: function clearSelection() {
        if (window.getSelection) {
          if (window.getSelection().empty) {
            window.getSelection().empty();
          } else if (window.getSelection().removeAllRanges && window.getSelection().rangeCount > 0 && window.getSelection().getRangeAt(0).getClientRects().length > 0) {
            window.getSelection().removeAllRanges();
          }
        } else if (document['selection'] && document['selection'].empty) {
          try {
            document['selection'].empty();
          } catch (error) {
            //ignore IE bug
          }
        }
      },
      getSelection: function getSelection() {
        if (window.getSelection) return window.getSelection().toString();else if (document.getSelection) return document.getSelection().toString();else if (document['selection']) return document['selection'].createRange().text;
        return null;
      },
      calculateScrollbarWidth: function calculateScrollbarWidth() {
        if (this.calculatedScrollbarWidth != null) return this.calculatedScrollbarWidth;
        var scrollDiv = document.createElement('div');
        this.addStyles(scrollDiv, {
          width: '100px',
          height: '100px',
          overflow: 'scroll',
          position: 'absolute',
          top: '-9999px'
        });
        document.body.appendChild(scrollDiv);
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
        this.calculatedScrollbarWidth = scrollbarWidth;
        return scrollbarWidth;
      },
      calculateBodyScrollbarWidth: function calculateBodyScrollbarWidth() {
        return window.innerWidth - document.documentElement.offsetWidth;
      },
      getBrowser: function getBrowser() {
        if (!this.browser) {
          var matched = this.resolveUserAgent();
          this.browser = {};
          if (matched.browser) {
            this.browser[matched.browser] = true;
            this.browser['version'] = matched.version;
          }
          if (this.browser['chrome']) {
            this.browser['webkit'] = true;
          } else if (this.browser['webkit']) {
            this.browser['safari'] = true;
          }
        }
        return this.browser;
      },
      resolveUserAgent: function resolveUserAgent() {
        var ua = navigator.userAgent.toLowerCase();
        var match = /(chrome)[ ]([\w.]+)/.exec(ua) || /(webkit)[ ]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ ]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf('compatible') < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
        return {
          browser: match[1] || '',
          version: match[2] || '0'
        };
      },
      isVisible: function isVisible(element) {
        return element && element.offsetParent != null;
      },
      invokeElementMethod: function invokeElementMethod(element, methodName, args) {
        element[methodName].apply(element, args);
      },
      isExist: function isExist(element) {
        return !!(element !== null && typeof element !== 'undefined' && element.nodeName && this.getParentNode(element));
      },
      isClient: function isClient() {
        return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
      },
      focus: function focus(el, options) {
        el && document.activeElement !== el && el.focus(options);
      },
      isFocusableElement: function isFocusableElement(element) {
        var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        return this.isElement(element) ? element.matches("button:not([tabindex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden])".concat(selector, ",\n                [href][clientHeight][clientWidth]:not([tabindex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden])").concat(selector, ",\n                input:not([tabindex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden])").concat(selector, ",\n                select:not([tabindex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden])").concat(selector, ",\n                textarea:not([tabindex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden])").concat(selector, ",\n                [tabIndex]:not([tabIndex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden])").concat(selector, ",\n                [contenteditable]:not([tabIndex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden])").concat(selector)) : false;
      },
      getFocusableElements: function getFocusableElements(element) {
        var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var focusableElements = this.find(element, "button:not([tabindex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden])".concat(selector, ",\n                [href][clientHeight][clientWidth]:not([tabindex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden])").concat(selector, ",\n                input:not([tabindex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden])").concat(selector, ",\n                select:not([tabindex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden])").concat(selector, ",\n                textarea:not([tabindex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden])").concat(selector, ",\n                [tabIndex]:not([tabIndex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden])").concat(selector, ",\n                [contenteditable]:not([tabIndex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden])").concat(selector));
        var visibleFocusableElements = [];
        var _iterator3 = _createForOfIteratorHelper$1(focusableElements),
          _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var focusableElement = _step3.value;
            if (getComputedStyle(focusableElement).display != 'none' && getComputedStyle(focusableElement).visibility != 'hidden') visibleFocusableElements.push(focusableElement);
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
        return visibleFocusableElements;
      },
      getFirstFocusableElement: function getFirstFocusableElement(element, selector) {
        var focusableElements = this.getFocusableElements(element, selector);
        return focusableElements.length > 0 ? focusableElements[0] : null;
      },
      getLastFocusableElement: function getLastFocusableElement(element, selector) {
        var focusableElements = this.getFocusableElements(element, selector);
        return focusableElements.length > 0 ? focusableElements[focusableElements.length - 1] : null;
      },
      getNextFocusableElement: function getNextFocusableElement(container, element, selector) {
        var focusableElements = this.getFocusableElements(container, selector);
        var index = focusableElements.length > 0 ? focusableElements.findIndex(function (el) {
          return el === element;
        }) : -1;
        var nextIndex = index > -1 && focusableElements.length >= index + 1 ? index + 1 : -1;
        return nextIndex > -1 ? focusableElements[nextIndex] : null;
      },
      getPreviousElementSibling: function getPreviousElementSibling(element, selector) {
        var previousElement = element.previousElementSibling;
        while (previousElement) {
          if (previousElement.matches(selector)) {
            return previousElement;
          } else {
            previousElement = previousElement.previousElementSibling;
          }
        }
        return null;
      },
      getNextElementSibling: function getNextElementSibling(element, selector) {
        var nextElement = element.nextElementSibling;
        while (nextElement) {
          if (nextElement.matches(selector)) {
            return nextElement;
          } else {
            nextElement = nextElement.nextElementSibling;
          }
        }
        return null;
      },
      isClickable: function isClickable(element) {
        if (element) {
          var targetNode = element.nodeName;
          var parentNode = element.parentElement && element.parentElement.nodeName;
          return targetNode === 'INPUT' || targetNode === 'TEXTAREA' || targetNode === 'BUTTON' || targetNode === 'A' || parentNode === 'INPUT' || parentNode === 'TEXTAREA' || parentNode === 'BUTTON' || parentNode === 'A' || !!element.closest('.p-button, .p-checkbox, .p-radiobutton') // @todo Add [data-pc-section="button"]
          ;
        }
        return false;
      },
      applyStyle: function applyStyle(element, style) {
        if (typeof style === 'string') {
          element.style.cssText = style;
        } else {
          for (var prop in style) {
            element.style[prop] = style[prop];
          }
        }
      },
      isIOS: function isIOS() {
        return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window['MSStream'];
      },
      isAndroid: function isAndroid() {
        return /(android)/i.test(navigator.userAgent);
      },
      isTouchDevice: function isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
      },
      hasCSSAnimation: function hasCSSAnimation(element) {
        if (element) {
          var style = getComputedStyle(element);
          var animationDuration = parseFloat(style.getPropertyValue('animation-duration') || '0');
          return animationDuration > 0;
        }
        return false;
      },
      hasCSSTransition: function hasCSSTransition(element) {
        if (element) {
          var style = getComputedStyle(element);
          var transitionDuration = parseFloat(style.getPropertyValue('transition-duration') || '0');
          return transitionDuration > 0;
        }
        return false;
      },
      exportCSV: function exportCSV(csv, filename) {
        var blob = new Blob([csv], {
          type: 'application/csv;charset=utf-8;'
        });
        if (window.navigator.msSaveOrOpenBlob) {
          navigator.msSaveOrOpenBlob(blob, filename + '.csv');
        } else {
          var link = document.createElement('a');
          if (link.download !== undefined) {
            link.setAttribute('href', URL.createObjectURL(blob));
            link.setAttribute('download', filename + '.csv');
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } else {
            csv = 'data:text/csv;charset=utf-8,' + csv;
            window.open(encodeURI(csv));
          }
        }
      },
      blockBodyScroll: function blockBodyScroll() {
        var className = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'p-overflow-hidden';
        document.body.style.setProperty('--scrollbar-width', this.calculateBodyScrollbarWidth() + 'px');
        this.addClass(document.body, className);
      },
      unblockBodyScroll: function unblockBodyScroll() {
        var className = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'p-overflow-hidden';
        document.body.style.removeProperty('--scrollbar-width');
        this.removeClass(document.body, className);
      }
    };

    function _typeof$2(o) { "@babel/helpers - typeof"; return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$2(o); }
    function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
    function _defineProperties$1(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey$1(descriptor.key), descriptor); } }
    function _createClass$1(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$1(Constructor.prototype, protoProps); if (staticProps) _defineProperties$1(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
    function _toPropertyKey$1(t) { var i = _toPrimitive$1(t, "string"); return "symbol" == _typeof$2(i) ? i : String(i); }
    function _toPrimitive$1(t, r) { if ("object" != _typeof$2(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$2(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
    var ConnectedOverlayScrollHandler = /*#__PURE__*/function () {
      function ConnectedOverlayScrollHandler(element) {
        var listener = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
        _classCallCheck$1(this, ConnectedOverlayScrollHandler);
        this.element = element;
        this.listener = listener;
      }
      _createClass$1(ConnectedOverlayScrollHandler, [{
        key: "bindScrollListener",
        value: function bindScrollListener() {
          this.scrollableParents = DomHandler.getScrollableParents(this.element);
          for (var i = 0; i < this.scrollableParents.length; i++) {
            this.scrollableParents[i].addEventListener('scroll', this.listener);
          }
        }
      }, {
        key: "unbindScrollListener",
        value: function unbindScrollListener() {
          if (this.scrollableParents) {
            for (var i = 0; i < this.scrollableParents.length; i++) {
              this.scrollableParents[i].removeEventListener('scroll', this.listener);
            }
          }
        }
      }, {
        key: "destroy",
        value: function destroy() {
          this.unbindScrollListener();
          this.element = null;
          this.listener = null;
          this.scrollableParents = null;
        }
      }]);
      return ConnectedOverlayScrollHandler;
    }();

    function primebus() {
      var allHandlers = new Map();
      return {
        on: function on(type, handler) {
          var handlers = allHandlers.get(type);
          if (!handlers) handlers = [handler];else handlers.push(handler);
          allHandlers.set(type, handlers);
        },
        off: function off(type, handler) {
          var handlers = allHandlers.get(type);
          if (handlers) {
            handlers.splice(handlers.indexOf(handler) >>> 0, 1);
          }
        },
        emit: function emit(type, evt) {
          var handlers = allHandlers.get(type);
          if (handlers) {
            handlers.slice().map(function (handler) {
              handler(evt);
            });
          }
        }
      };
    }

    function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$2(arr, i) || _nonIterableRest(); }
    function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
    function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
    function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
    function _toConsumableArray$2(arr) { return _arrayWithoutHoles$2(arr) || _iterableToArray$2(arr) || _unsupportedIterableToArray$2(arr) || _nonIterableSpread$2(); }
    function _nonIterableSpread$2() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
    function _iterableToArray$2(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
    function _arrayWithoutHoles$2(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$2(arr); }
    function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$2(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
    function _unsupportedIterableToArray$2(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$2(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen); }
    function _arrayLikeToArray$2(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
    function _typeof$1(o) { "@babel/helpers - typeof"; return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$1(o); }
    var ObjectUtils = {
      equals: function equals(obj1, obj2, field) {
        if (field) return this.resolveFieldData(obj1, field) === this.resolveFieldData(obj2, field);else return this.deepEquals(obj1, obj2);
      },
      deepEquals: function deepEquals(a, b) {
        if (a === b) return true;
        if (a && b && _typeof$1(a) == 'object' && _typeof$1(b) == 'object') {
          var arrA = Array.isArray(a),
            arrB = Array.isArray(b),
            i,
            length,
            key;
          if (arrA && arrB) {
            length = a.length;
            if (length != b.length) return false;
            for (i = length; i-- !== 0;) if (!this.deepEquals(a[i], b[i])) return false;
            return true;
          }
          if (arrA != arrB) return false;
          var dateA = a instanceof Date,
            dateB = b instanceof Date;
          if (dateA != dateB) return false;
          if (dateA && dateB) return a.getTime() == b.getTime();
          var regexpA = a instanceof RegExp,
            regexpB = b instanceof RegExp;
          if (regexpA != regexpB) return false;
          if (regexpA && regexpB) return a.toString() == b.toString();
          var keys = Object.keys(a);
          length = keys.length;
          if (length !== Object.keys(b).length) return false;
          for (i = length; i-- !== 0;) if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
          for (i = length; i-- !== 0;) {
            key = keys[i];
            if (!this.deepEquals(a[key], b[key])) return false;
          }
          return true;
        }
        return a !== a && b !== b;
      },
      resolveFieldData: function resolveFieldData(data, field) {
        if (!data || !field) {
          // short circuit if there is nothing to resolve
          return null;
        }
        try {
          var value = data[field];
          if (this.isNotEmpty(value)) return value;
        } catch (_unused) {
          // Performance optimization: https://github.com/primefaces/primereact/issues/4797
          // do nothing and continue to other methods to resolve field data
        }
        if (Object.keys(data).length) {
          if (this.isFunction(field)) {
            return field(data);
          } else if (field.indexOf('.') === -1) {
            return data[field];
          } else {
            var fields = field.split('.');
            var _value = data;
            for (var i = 0, len = fields.length; i < len; ++i) {
              if (_value == null) {
                return null;
              }
              _value = _value[fields[i]];
            }
            return _value;
          }
        }
        return null;
      },
      getItemValue: function getItemValue(obj) {
        for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          params[_key - 1] = arguments[_key];
        }
        return this.isFunction(obj) ? obj.apply(void 0, params) : obj;
      },
      filter: function filter(value, fields, filterValue) {
        var filteredItems = [];
        if (value) {
          var _iterator = _createForOfIteratorHelper(value),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var item = _step.value;
              var _iterator2 = _createForOfIteratorHelper(fields),
                _step2;
              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  var field = _step2.value;
                  if (String(this.resolveFieldData(item, field)).toLowerCase().indexOf(filterValue.toLowerCase()) > -1) {
                    filteredItems.push(item);
                    break;
                  }
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
        return filteredItems;
      },
      reorderArray: function reorderArray(value, from, to) {
        if (value && from !== to) {
          if (to >= value.length) {
            to %= value.length;
            from %= value.length;
          }
          value.splice(to, 0, value.splice(from, 1)[0]);
        }
      },
      findIndexInList: function findIndexInList(value, list) {
        var index = -1;
        if (list) {
          for (var i = 0; i < list.length; i++) {
            if (list[i] === value) {
              index = i;
              break;
            }
          }
        }
        return index;
      },
      contains: function contains(value, list) {
        if (value != null && list && list.length) {
          var _iterator3 = _createForOfIteratorHelper(list),
            _step3;
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var val = _step3.value;
              if (this.equals(value, val)) return true;
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        }
        return false;
      },
      insertIntoOrderedArray: function insertIntoOrderedArray(item, index, arr, sourceArr) {
        if (arr.length > 0) {
          var injected = false;
          for (var i = 0; i < arr.length; i++) {
            var currentItemIndex = this.findIndexInList(arr[i], sourceArr);
            if (currentItemIndex > index) {
              arr.splice(i, 0, item);
              injected = true;
              break;
            }
          }
          if (!injected) {
            arr.push(item);
          }
        } else {
          arr.push(item);
        }
      },
      removeAccents: function removeAccents(str) {
        if (str && str.search(/[\xC0-\xFF]/g) > -1) {
          str = str.replace(/[\xC0-\xC5]/g, 'A').replace(/[\xC6]/g, 'AE').replace(/[\xC7]/g, 'C').replace(/[\xC8-\xCB]/g, 'E').replace(/[\xCC-\xCF]/g, 'I').replace(/[\xD0]/g, 'D').replace(/[\xD1]/g, 'N').replace(/[\xD2-\xD6\xD8]/g, 'O').replace(/[\xD9-\xDC]/g, 'U').replace(/[\xDD]/g, 'Y').replace(/[\xDE]/g, 'P').replace(/[\xE0-\xE5]/g, 'a').replace(/[\xE6]/g, 'ae').replace(/[\xE7]/g, 'c').replace(/[\xE8-\xEB]/g, 'e').replace(/[\xEC-\xEF]/g, 'i').replace(/[\xF1]/g, 'n').replace(/[\xF2-\xF6\xF8]/g, 'o').replace(/[\xF9-\xFC]/g, 'u').replace(/[\xFE]/g, 'p').replace(/[\xFD\xFF]/g, 'y');
        }
        return str;
      },
      getVNodeProp: function getVNodeProp(vnode, prop) {
        if (vnode) {
          var props = vnode.props;
          if (props) {
            var kebabProp = prop.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
            var propName = Object.prototype.hasOwnProperty.call(props, kebabProp) ? kebabProp : prop;
            return vnode.type["extends"].props[prop].type === Boolean && props[propName] === '' ? true : props[propName];
          }
        }
        return null;
      },
      toFlatCase: function toFlatCase(str) {
        // convert snake, kebab, camel and pascal cases to flat case
        return this.isString(str) ? str.replace(/(-|_)/g, '').toLowerCase() : str;
      },
      toKebabCase: function toKebabCase(str) {
        // convert snake, camel and pascal cases to kebab case
        return this.isString(str) ? str.replace(/(_)/g, '-').replace(/[A-Z]/g, function (c, i) {
          return i === 0 ? c : '-' + c.toLowerCase();
        }).toLowerCase() : str;
      },
      toCapitalCase: function toCapitalCase(str) {
        return this.isString(str, {
          empty: false
        }) ? str[0].toUpperCase() + str.slice(1) : str;
      },
      isEmpty: function isEmpty(value) {
        return value === null || value === undefined || value === '' || Array.isArray(value) && value.length === 0 || !(value instanceof Date) && _typeof$1(value) === 'object' && Object.keys(value).length === 0;
      },
      isNotEmpty: function isNotEmpty(value) {
        return !this.isEmpty(value);
      },
      isFunction: function isFunction(value) {
        return !!(value && value.constructor && value.call && value.apply);
      },
      isObject: function isObject(value) {
        var empty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        return value instanceof Object && value.constructor === Object && (empty || Object.keys(value).length !== 0);
      },
      isDate: function isDate(value) {
        return value instanceof Date && value.constructor === Date;
      },
      isArray: function isArray(value) {
        var empty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        return Array.isArray(value) && (empty || value.length !== 0);
      },
      isString: function isString(value) {
        var empty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        return typeof value === 'string' && (empty || value !== '');
      },
      isPrintableCharacter: function isPrintableCharacter() {
        var _char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        return this.isNotEmpty(_char) && _char.length === 1 && _char.match(/\S| /);
      },
      /**
       * Firefox-v103 does not currently support the "findLast" method. It is stated that this method will be supported with Firefox-v104.
       * https://caniuse.com/mdn-javascript_builtins_array_findlast
       */
      findLast: function findLast(arr, callback) {
        var item;
        if (this.isNotEmpty(arr)) {
          try {
            item = arr.findLast(callback);
          } catch (_unused2) {
            item = _toConsumableArray$2(arr).reverse().find(callback);
          }
        }
        return item;
      },
      /**
       * Firefox-v103 does not currently support the "findLastIndex" method. It is stated that this method will be supported with Firefox-v104.
       * https://caniuse.com/mdn-javascript_builtins_array_findlastindex
       */
      findLastIndex: function findLastIndex(arr, callback) {
        var index = -1;
        if (this.isNotEmpty(arr)) {
          try {
            index = arr.findLastIndex(callback);
          } catch (_unused3) {
            index = arr.lastIndexOf(_toConsumableArray$2(arr).reverse().find(callback));
          }
        }
        return index;
      },
      sort: function sort(value1, value2) {
        var order = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        var comparator = arguments.length > 3 ? arguments[3] : undefined;
        var nullSortOrder = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
        var result = this.compare(value1, value2, comparator, order);
        var finalSortOrder = order;

        // nullSortOrder == 1 means Excel like sort nulls at bottom
        if (this.isEmpty(value1) || this.isEmpty(value2)) {
          finalSortOrder = nullSortOrder === 1 ? order : nullSortOrder;
        }
        return finalSortOrder * result;
      },
      compare: function compare(value1, value2, comparator) {
        var order = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
        var result = -1;
        var emptyValue1 = this.isEmpty(value1);
        var emptyValue2 = this.isEmpty(value2);
        if (emptyValue1 && emptyValue2) result = 0;else if (emptyValue1) result = order;else if (emptyValue2) result = -order;else if (typeof value1 === 'string' && typeof value2 === 'string') result = comparator(value1, value2);else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
        return result;
      },
      localeComparator: function localeComparator() {
        //performance gain using Int.Collator. It is not recommended to use localeCompare against large arrays.
        return new Intl.Collator(undefined, {
          numeric: true
        }).compare;
      },
      nestedKeys: function nestedKeys() {
        var _this = this;
        var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var parentKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        return Object.entries(obj).reduce(function (o, _ref) {
          var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];
          var currentKey = parentKey ? "".concat(parentKey, ".").concat(key) : key;
          _this.isObject(value) ? o = o.concat(_this.nestedKeys(value, currentKey)) : o.push(currentKey);
          return o;
        }, []);
      },
      stringify: function stringify(value) {
        var _this2 = this;
        var indent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
        var currentIndent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var currentIndentStr = ' '.repeat(currentIndent);
        var nextIndentStr = ' '.repeat(currentIndent + indent);
        if (this.isArray(value)) {
          return '[' + value.map(function (v) {
            return _this2.stringify(v, indent, currentIndent + indent);
          }).join(', ') + ']';
        } else if (this.isDate(value)) {
          return value.toISOString();
        } else if (this.isFunction(value)) {
          return value.toString();
        } else if (this.isObject(value)) {
          return '{\n' + Object.entries(value).map(function (_ref3) {
            var _ref4 = _slicedToArray(_ref3, 2),
              k = _ref4[0],
              v = _ref4[1];
            return "".concat(nextIndentStr).concat(k, ": ").concat(_this2.stringify(v, indent, currentIndent + indent));
          }).join(',\n') + "\n".concat(currentIndentStr) + '}';
        } else {
          return JSON.stringify(value);
        }
      }
    };

    function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
    function _toConsumableArray$1(arr) { return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread$1(); }
    function _nonIterableSpread$1() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
    function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }
    function _iterableToArray$1(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
    function _arrayWithoutHoles$1(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$1(arr); }
    function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
    function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
    function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
    function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
    function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
    var _default = /*#__PURE__*/function () {
      function _default(_ref) {
        var init = _ref.init,
          type = _ref.type;
        _classCallCheck(this, _default);
        _defineProperty(this, "helpers", void 0);
        _defineProperty(this, "type", void 0);
        this.helpers = new Set(init);
        this.type = type;
      }
      _createClass(_default, [{
        key: "add",
        value: function add(instance) {
          this.helpers.add(instance);
        }
      }, {
        key: "update",
        value: function update() {
          // @todo
        }
      }, {
        key: "delete",
        value: function _delete(instance) {
          this.helpers["delete"](instance);
        }
      }, {
        key: "clear",
        value: function clear() {
          this.helpers.clear();
        }
      }, {
        key: "get",
        value: function get(parentInstance, slots) {
          var children = this._get(parentInstance, slots);
          var computed = children ? this._recursive(_toConsumableArray$1(this.helpers), children) : null;
          return ObjectUtils.isNotEmpty(computed) ? computed : null;
        }
      }, {
        key: "_isMatched",
        value: function _isMatched(instance, key) {
          var _parent$vnode;
          var parent = instance === null || instance === void 0 ? void 0 : instance.parent;
          return (parent === null || parent === void 0 || (_parent$vnode = parent.vnode) === null || _parent$vnode === void 0 ? void 0 : _parent$vnode.key) === key || parent && this._isMatched(parent, key) || false;
        }
      }, {
        key: "_get",
        value: function _get(parentInstance, slots) {
          var _ref2, _ref2$default;
          return ((_ref2 = slots || (parentInstance === null || parentInstance === void 0 ? void 0 : parentInstance.$slots)) === null || _ref2 === void 0 || (_ref2$default = _ref2["default"]) === null || _ref2$default === void 0 ? void 0 : _ref2$default.call(_ref2)) || null;
        }
      }, {
        key: "_recursive",
        value: function _recursive() {
          var _this = this;
          var helpers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
          var children = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
          var components = [];
          children.forEach(function (child) {
            if (child.children instanceof Array) {
              components = components.concat(_this._recursive(components, child.children));
            } else if (child.type.name === _this.type) {
              components.push(child);
            } else if (ObjectUtils.isNotEmpty(child.key)) {
              components = components.concat(helpers.filter(function (c) {
                return _this._isMatched(c, child.key);
              }).map(function (c) {
                return c.vnode;
              }));
            }
          });
          return components;
        }
      }]);
      return _default;
    }();

    var lastId = 0;
    function UniqueComponentId () {
      var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'pv_id_';
      lastId++;
      return "".concat(prefix).concat(lastId);
    }

    function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
    function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
    function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
    function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
    function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
    function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
    function handler() {
      var zIndexes = [];
      var generateZIndex = function generateZIndex(key, autoZIndex) {
        var baseZIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 999;
        var lastZIndex = getLastZIndex(key, autoZIndex, baseZIndex);
        var newZIndex = lastZIndex.value + (lastZIndex.key === key ? 0 : baseZIndex) + 1;
        zIndexes.push({
          key: key,
          value: newZIndex
        });
        return newZIndex;
      };
      var revertZIndex = function revertZIndex(zIndex) {
        zIndexes = zIndexes.filter(function (obj) {
          return obj.value !== zIndex;
        });
      };
      var getCurrentZIndex = function getCurrentZIndex(key, autoZIndex) {
        return getLastZIndex(key, autoZIndex).value;
      };
      var getLastZIndex = function getLastZIndex(key, autoZIndex) {
        var baseZIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        return _toConsumableArray(zIndexes).reverse().find(function (obj) {
          return autoZIndex ? true : obj.key === key;
        }) || {
          key: key,
          value: baseZIndex
        };
      };
      var getZIndex = function getZIndex(el) {
        return el ? parseInt(el.style.zIndex, 10) || 0 : 0;
      };
      return {
        get: getZIndex,
        set: function set(key, el, baseZIndex) {
          if (el) {
            el.style.zIndex = String(generateZIndex(key, true, baseZIndex));
          }
        },
        clear: function clear(el) {
          if (el) {
            revertZIndex(getZIndex(el));
            el.style.zIndex = '';
          }
        },
        getCurrent: function getCurrent(key) {
          return getCurrentZIndex(key, true);
        }
      };
    }
    var ZIndexUtils = handler();

    exports.ConnectedOverlayScrollHandler = ConnectedOverlayScrollHandler;
    exports.DomHandler = DomHandler;
    exports.EventBus = primebus;
    exports.HelperSet = _default;
    exports.ObjectUtils = ObjectUtils;
    exports.UniqueComponentId = UniqueComponentId;
    exports.ZIndexUtils = ZIndexUtils;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({});
