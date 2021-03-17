"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _PrimeReact = _interopRequireDefault(require("../api/PrimeReact"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DomHandler = /*#__PURE__*/function () {
  function DomHandler() {
    _classCallCheck(this, DomHandler);
  }

  _createClass(DomHandler, null, [{
    key: "innerWidth",
    value: function innerWidth(el) {
      if (el) {
        var width = el.offsetWidth;
        var style = getComputedStyle(el);
        width += parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
        return width;
      }

      return 0;
    }
  }, {
    key: "width",
    value: function width(el) {
      if (el) {
        var width = el.offsetWidth;
        var style = getComputedStyle(el);
        width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
        return width;
      }

      return 0;
    }
  }, {
    key: "getWindowScrollTop",
    value: function getWindowScrollTop() {
      var doc = document.documentElement;
      return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    }
  }, {
    key: "getWindowScrollLeft",
    value: function getWindowScrollLeft() {
      var doc = document.documentElement;
      return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    }
  }, {
    key: "getOuterWidth",
    value: function getOuterWidth(el, margin) {
      if (el) {
        var width = el.offsetWidth;

        if (margin) {
          var style = getComputedStyle(el);
          width += parseFloat(style.marginLeft) + parseFloat(style.marginRight);
        }

        return width;
      }

      return 0;
    }
  }, {
    key: "getOuterHeight",
    value: function getOuterHeight(el, margin) {
      if (el) {
        var height = el.offsetHeight;

        if (margin) {
          var style = getComputedStyle(el);
          height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
        }

        return height;
      }

      return 0;
    }
  }, {
    key: "getClientHeight",
    value: function getClientHeight(el, margin) {
      if (el) {
        var height = el.clientHeight;

        if (margin) {
          var style = getComputedStyle(el);
          height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
        }

        return height;
      }

      return 0;
    }
  }, {
    key: "getViewport",
    value: function getViewport() {
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
    }
  }, {
    key: "getOffset",
    value: function getOffset(el) {
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
    }
  }, {
    key: "generateZIndex",
    value: function generateZIndex() {
      this.zIndex = this.zIndex || _PrimeReact.default.zIndex;
      return ++this.zIndex;
    }
  }, {
    key: "revertZIndex",
    value: function revertZIndex() {
      this.zIndex = _PrimeReact.default.zIndex < this.zIndex ? --this.zIndex : _PrimeReact.default.zIndex;
    }
  }, {
    key: "getCurrentZIndex",
    value: function getCurrentZIndex() {
      return this.zIndex;
    }
  }, {
    key: "index",
    value: function index(element) {
      if (element) {
        var children = element.parentNode.childNodes;
        var num = 0;

        for (var i = 0; i < children.length; i++) {
          if (children[i] === element) return num;
          if (children[i].nodeType === 1) num++;
        }
      }

      return -1;
    }
  }, {
    key: "addMultipleClasses",
    value: function addMultipleClasses(element, className) {
      if (element && className) {
        if (element.classList) {
          var styles = className.split(' ');

          for (var i = 0; i < styles.length; i++) {
            element.classList.add(styles[i]);
          }
        } else {
          var _styles = className.split(' ');

          for (var _i = 0; _i < _styles.length; _i++) {
            element.className += ' ' + _styles[_i];
          }
        }
      }
    }
  }, {
    key: "addClass",
    value: function addClass(element, className) {
      if (element && className) {
        if (element.classList) element.classList.add(className);else element.className += ' ' + className;
      }
    }
  }, {
    key: "removeClass",
    value: function removeClass(element, className) {
      if (element && className) {
        if (element.classList) element.classList.remove(className);else element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
      }
    }
  }, {
    key: "hasClass",
    value: function hasClass(element, className) {
      if (element) {
        if (element.classList) return element.classList.contains(className);else return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
      }
    }
  }, {
    key: "find",
    value: function find(element, selector) {
      return element ? Array.from(element.querySelectorAll(selector)) : [];
    }
  }, {
    key: "findSingle",
    value: function findSingle(element, selector) {
      if (element) {
        return element.querySelector(selector);
      }

      return null;
    }
  }, {
    key: "getHeight",
    value: function getHeight(el) {
      if (el) {
        var height = el.offsetHeight;
        var style = getComputedStyle(el);
        height -= parseFloat(style.paddingTop) + parseFloat(style.paddingBottom) + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
        return height;
      }

      return 0;
    }
  }, {
    key: "getWidth",
    value: function getWidth(el) {
      if (el) {
        var width = el.offsetWidth;
        var style = getComputedStyle(el);
        width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight) + parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
        return width;
      }

      return 0;
    }
  }, {
    key: "absolutePosition",
    value: function absolutePosition(element, target) {
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
        var top, left;

        if (targetOffset.top + targetOuterHeight + elementOuterHeight > viewport.height) {
          top = targetOffset.top + windowScrollTop - elementOuterHeight;

          if (top < 0) {
            top = windowScrollTop;
          }

          element.style.transformOrigin = 'bottom';
        } else {
          top = targetOuterHeight + targetOffset.top + windowScrollTop;
          element.style.transformOrigin = 'top';
        }

        if (targetOffset.left + targetOuterWidth + elementOuterWidth > viewport.width) left = Math.max(0, targetOffset.left + windowScrollLeft + targetOuterWidth - elementOuterWidth);else left = targetOffset.left + windowScrollLeft;
        element.style.top = top + 'px';
        element.style.left = left + 'px';
      }
    }
  }, {
    key: "relativePosition",
    value: function relativePosition(element, target) {
      if (element) {
        var elementDimensions = element.offsetParent ? {
          width: element.offsetWidth,
          height: element.offsetHeight
        } : this.getHiddenElementDimensions(element);
        var targetHeight = target.offsetHeight;
        var targetOffset = target.getBoundingClientRect();
        var viewport = this.getViewport();
        var top, left;

        if (targetOffset.top + targetHeight + elementDimensions.height > viewport.height) {
          top = -1 * elementDimensions.height;

          if (targetOffset.top + top < 0) {
            top = -1 * targetOffset.top;
          }

          element.style.transformOrigin = 'bottom';
        } else {
          top = targetHeight;
          element.style.transformOrigin = 'top';
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
      }
    }
  }, {
    key: "flipfitCollision",
    value: function flipfitCollision(element, target) {
      var _this = this;

      var my = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'left top';
      var at = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'left bottom';
      var callback = arguments.length > 4 ? arguments[4] : undefined;
      var targetOffset = target.getBoundingClientRect();
      var viewport = this.getViewport();
      var myArr = my.split(' ');
      var atArr = at.split(' ');

      var getPositionValue = function getPositionValue(arr, isOffset) {
        return isOffset ? +arr.substring(arr.search(/(\+|-)/g)) || 0 : arr.substring(0, arr.search(/(\+|-)/g)) || arr;
      };

      var position = {
        my: {
          x: getPositionValue(myArr[0]),
          y: getPositionValue(myArr[1] || myArr[0]),
          offsetX: getPositionValue(myArr[0], true),
          offsetY: getPositionValue(myArr[1] || myArr[0], true)
        },
        at: {
          x: getPositionValue(atArr[0]),
          y: getPositionValue(atArr[1] || atArr[0]),
          offsetX: getPositionValue(atArr[0], true),
          offsetY: getPositionValue(atArr[1] || atArr[0], true)
        }
      };
      var myOffset = {
        left: function left() {
          var totalOffset = position.my.offsetX + position.at.offsetX;
          return totalOffset + targetOffset.left + (position.my.x === 'left' ? 0 : -1 * (position.my.x === 'center' ? _this.getOuterWidth(element) / 2 : _this.getOuterWidth(element)));
        },
        top: function top() {
          var totalOffset = position.my.offsetY + position.at.offsetY;
          return totalOffset + targetOffset.top + (position.my.y === 'top' ? 0 : -1 * (position.my.y === 'center' ? _this.getOuterHeight(element) / 2 : _this.getOuterHeight(element)));
        }
      };
      var alignWithAt = {
        count: {
          x: 0,
          y: 0
        },
        left: function left() {
          var left = myOffset.left();
          var scrollLeft = DomHandler.getWindowScrollLeft();
          element.style.left = left + scrollLeft + 'px';

          if (this.count.x === 2) {
            element.style.left = scrollLeft + 'px';
            this.count.x = 0;
          } else if (left < 0) {
            this.count.x++;
            position.my.x = 'left';
            position.at.x = 'right';
            position.my.offsetX *= -1;
            position.at.offsetX *= -1;
            this.right();
          }
        },
        right: function right() {
          var left = myOffset.left() + DomHandler.getOuterWidth(target);
          var scrollLeft = DomHandler.getWindowScrollLeft();
          element.style.left = left + scrollLeft + 'px';

          if (this.count.x === 2) {
            element.style.left = viewport.width - DomHandler.getOuterWidth(element) + scrollLeft + 'px';
            this.count.x = 0;
          } else if (left + DomHandler.getOuterWidth(element) > viewport.width) {
            this.count.x++;
            position.my.x = 'right';
            position.at.x = 'left';
            position.my.offsetX *= -1;
            position.at.offsetX *= -1;
            this.left();
          }
        },
        top: function top() {
          var top = myOffset.top();
          var scrollTop = DomHandler.getWindowScrollTop();
          element.style.top = top + scrollTop + 'px';

          if (this.count.y === 2) {
            element.style.left = scrollTop + 'px';
            this.count.y = 0;
          } else if (top < 0) {
            this.count.y++;
            position.my.y = 'top';
            position.at.y = 'bottom';
            position.my.offsetY *= -1;
            position.at.offsetY *= -1;
            this.bottom();
          }
        },
        bottom: function bottom() {
          var top = myOffset.top() + DomHandler.getOuterHeight(target);
          var scrollTop = DomHandler.getWindowScrollTop();
          element.style.top = top + scrollTop + 'px';

          if (this.count.y === 2) {
            element.style.left = viewport.height - DomHandler.getOuterHeight(element) + scrollTop + 'px';
            this.count.y = 0;
          } else if (top + DomHandler.getOuterHeight(target) > viewport.height) {
            this.count.y++;
            position.my.y = 'bottom';
            position.at.y = 'top';
            position.my.offsetY *= -1;
            position.at.offsetY *= -1;
            this.top();
          }
        },
        center: function center(axis) {
          if (axis === 'y') {
            var top = myOffset.top() + DomHandler.getOuterHeight(target) / 2;
            element.style.top = top + DomHandler.getWindowScrollTop() + 'px';

            if (top < 0) {
              this.bottom();
            } else if (top + DomHandler.getOuterHeight(target) > viewport.height) {
              this.top();
            }
          } else {
            var left = myOffset.left() + DomHandler.getOuterWidth(target) / 2;
            element.style.left = left + DomHandler.getWindowScrollLeft() + 'px';

            if (left < 0) {
              this.left();
            } else if (left + DomHandler.getOuterWidth(element) > viewport.width) {
              this.right();
            }
          }
        }
      };
      alignWithAt[position.at.x]('x');
      alignWithAt[position.at.y]('y');

      if (this.isFunction(callback)) {
        callback(position);
      }
    }
  }, {
    key: "findCollisionPosition",
    value: function findCollisionPosition(position) {
      if (position) {
        var isAxisY = position === 'top' || position === 'bottom';
        var myXPosition = position === 'left' ? 'right' : 'left';
        var myYPosition = position === 'top' ? 'bottom' : 'top';

        if (isAxisY) {
          return {
            axis: 'y',
            my: "center ".concat(myYPosition),
            at: "center ".concat(position)
          };
        }

        return {
          axis: 'x',
          my: "".concat(myXPosition, " center"),
          at: "".concat(position, " center")
        };
      }
    }
  }, {
    key: "getParents",
    value: function getParents(element) {
      var parents = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      return element['parentNode'] === null ? parents : this.getParents(element.parentNode, parents.concat([element.parentNode]));
    }
  }, {
    key: "getScrollableParents",
    value: function getScrollableParents(element) {
      var scrollableParents = [];

      if (element) {
        var parents = this.getParents(element);
        var overflowRegex = /(auto|scroll)/;

        var overflowCheck = function overflowCheck(node) {
          var styleDeclaration = window['getComputedStyle'](node, null);
          return overflowRegex.test(styleDeclaration.getPropertyValue('overflow')) || overflowRegex.test(styleDeclaration.getPropertyValue('overflowX')) || overflowRegex.test(styleDeclaration.getPropertyValue('overflowY'));
        };

        var _iterator = _createForOfIteratorHelper(parents),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var parent = _step.value;
            var scrollSelectors = parent.nodeType === 1 && parent.dataset['scrollselectors'];

            if (scrollSelectors) {
              var selectors = scrollSelectors.split(',');

              var _iterator2 = _createForOfIteratorHelper(selectors),
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
    }
  }, {
    key: "getHiddenElementOuterHeight",
    value: function getHiddenElementOuterHeight(element) {
      if (element) {
        element.style.visibility = 'hidden';
        element.style.display = 'block';
        var elementHeight = element.offsetHeight;
        element.style.display = 'none';
        element.style.visibility = 'visible';
        return elementHeight;
      }

      return 0;
    }
  }, {
    key: "getHiddenElementOuterWidth",
    value: function getHiddenElementOuterWidth(element) {
      if (element) {
        element.style.visibility = 'hidden';
        element.style.display = 'block';
        var elementWidth = element.offsetWidth;
        element.style.display = 'none';
        element.style.visibility = 'visible';
        return elementWidth;
      }

      return 0;
    }
  }, {
    key: "getHiddenElementDimensions",
    value: function getHiddenElementDimensions(element) {
      var dimensions = {};

      if (element) {
        element.style.visibility = 'hidden';
        element.style.display = 'block';
        dimensions.width = element.offsetWidth;
        dimensions.height = element.offsetHeight;
        element.style.display = 'none';
        element.style.visibility = 'visible';
      }

      return dimensions;
    }
  }, {
    key: "fadeIn",
    value: function fadeIn(element, duration) {
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
    }
  }, {
    key: "fadeOut",
    value: function fadeOut(element, ms) {
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
    }
  }, {
    key: "getUserAgent",
    value: function getUserAgent() {
      return navigator.userAgent;
    }
  }, {
    key: "isIOS",
    value: function isIOS() {
      return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window['MSStream'];
    }
  }, {
    key: "isAndroid",
    value: function isAndroid() {
      return /(android)/i.test(navigator.userAgent);
    }
  }, {
    key: "isFunction",
    value: function isFunction(obj) {
      return !!(obj && obj.constructor && obj.call && obj.apply);
    }
  }, {
    key: "appendChild",
    value: function appendChild(element, target) {
      if (this.isElement(target)) target.appendChild(element);else if (target.el && target.el.nativeElement) target.el.nativeElement.appendChild(element);else throw new Error('Cannot append ' + target + ' to ' + element);
    }
  }, {
    key: "removeChild",
    value: function removeChild(element, target) {
      if (this.isElement(target)) target.removeChild(element);else if (target.el && target.el.nativeElement) target.el.nativeElement.removeChild(element);else throw new Error('Cannot remove ' + element + ' from ' + target);
    }
  }, {
    key: "isElement",
    value: function isElement(obj) {
      return (typeof HTMLElement === "undefined" ? "undefined" : _typeof(HTMLElement)) === "object" ? obj instanceof HTMLElement : obj && _typeof(obj) === "object" && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === "string";
    }
  }, {
    key: "scrollInView",
    value: function scrollInView(container, item) {
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
    }
  }, {
    key: "clearSelection",
    value: function clearSelection() {
      if (window.getSelection) {
        if (window.getSelection().empty) {
          window.getSelection().empty();
        } else if (window.getSelection().removeAllRanges && window.getSelection().rangeCount > 0 && window.getSelection().getRangeAt(0).getClientRects().length > 0) {
          window.getSelection().removeAllRanges();
        }
      } else if (document['selection'] && document['selection'].empty) {
        try {
          document['selection'].empty();
        } catch (error) {//ignore IE bug
        }
      }
    }
  }, {
    key: "calculateScrollbarWidth",
    value: function calculateScrollbarWidth(el) {
      if (el) {
        var style = getComputedStyle(el);
        return el.offsetWidth - el.clientWidth - parseFloat(style.borderLeftWidth) - parseFloat(style.borderRightWidth);
      } else {
        if (this.calculatedScrollbarWidth != null) return this.calculatedScrollbarWidth;
        var scrollDiv = document.createElement("div");
        scrollDiv.className = "p-scrollbar-measure";
        document.body.appendChild(scrollDiv);
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
        this.calculatedScrollbarWidth = scrollbarWidth;
        return scrollbarWidth;
      }
    }
  }, {
    key: "getBrowser",
    value: function getBrowser() {
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
    }
  }, {
    key: "resolveUserAgent",
    value: function resolveUserAgent() {
      var ua = navigator.userAgent.toLowerCase();
      var match = /(chrome)[ ]([\w.]+)/.exec(ua) || /(webkit)[ ]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ ]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
      return {
        browser: match[1] || "",
        version: match[2] || "0"
      };
    }
  }, {
    key: "isVisible",
    value: function isVisible(element) {
      return element && element.offsetParent != null;
    }
  }, {
    key: "getFocusableElements",
    value: function getFocusableElements(element) {
      var focusableElements = DomHandler.find(element, "button:not([tabindex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden]),\n                [href][clientHeight][clientWidth]:not([tabindex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden]),\n                input:not([tabindex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden]), select:not([tabindex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden]),\n                textarea:not([tabindex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden]), [tabIndex]:not([tabIndex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden]),\n                [contenteditable]:not([tabIndex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden])");
      var visibleFocusableElements = [];

      var _iterator3 = _createForOfIteratorHelper(focusableElements),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var focusableElement = _step3.value;
          if (getComputedStyle(focusableElement).display !== "none" && getComputedStyle(focusableElement).visibility !== "hidden") visibleFocusableElements.push(focusableElement);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      return visibleFocusableElements;
    }
  }, {
    key: "getFirstFocusableElement",
    value: function getFirstFocusableElement(element) {
      var focusableElements = DomHandler.getFocusableElements(element);
      return focusableElements.length > 0 ? focusableElements[0] : null;
    }
  }, {
    key: "getLastFocusableElement",
    value: function getLastFocusableElement(element) {
      var focusableElements = DomHandler.getFocusableElements(element);
      return focusableElements.length > 0 ? focusableElements[focusableElements.length - 1] : null;
    }
  }]);

  return DomHandler;
}();

exports.default = DomHandler;