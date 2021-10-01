this.primereact = this.primereact || {};
this.primereact.core = (function (exports, PrimeReact, React, ReactDOM, reactTransitionGroup) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var PrimeReact__default = /*#__PURE__*/_interopDefaultLegacy(PrimeReact);
  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _arrayLikeToArray$2(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  function _unsupportedIterableToArray$2(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray$2(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen);
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$2(arr, i) || _nonIterableRest();
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function classNames() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (args) {
      var classes = [];

      for (var i = 0; i < args.length; i++) {
        var className = args[i];
        if (!className) continue;

        var type = _typeof(className);

        if (type === 'string' || type === 'number') {
          classes.push(className);
        } else if (type === 'object') {
          var _classes = Array.isArray(className) ? className : Object.entries(className).map(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                key = _ref2[0],
                value = _ref2[1];

            return !!value ? key : null;
          });

          classes = _classes.length ? classes.concat(_classes.filter(function (c) {
            return !!c;
          })) : classes;
        }
      }

      return classes.join(' ');
    }

    return undefined;
  }

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

  function _createForOfIteratorHelper$1(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

  function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }

  function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
      key: "alignOverlay",
      value: function alignOverlay(overlay, target, appendTo) {
        if (overlay && target) {
          if (appendTo === 'self') {
            this.relativePosition(overlay, target);
          } else {
            overlay.style.minWidth = DomHandler.getOuterWidth(target) + 'px';
            this.absolutePosition(overlay, target);
          }
        }
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
      }
    }, {
      key: "getHiddenElementOuterHeight",
      value: function getHiddenElementOuterHeight(element) {
        if (element) {
          element.style.visibility = 'hidden';
          element.style.display = 'block';
          var elementHeight = element.offsetHeight;
          element.style.display = '';
          element.style.visibility = '';
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
          element.style.display = '';
          element.style.visibility = '';
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
          element.style.display = '';
          element.style.visibility = '';
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
      value: function fadeOut(element, duration) {
        if (element) {
          var opacity = 1,
              interval = 50,
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
      key: "isTouchDevice",
      value: function isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
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

        var _iterator3 = _createForOfIteratorHelper$1(focusableElements),
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
    }, {
      key: "getCursorOffset",
      value: function getCursorOffset(el, prevText, nextText, currentText) {
        if (el) {
          var style = getComputedStyle(el);
          var ghostDiv = document.createElement('div');
          ghostDiv.style.position = 'absolute';
          ghostDiv.style.top = '0px';
          ghostDiv.style.left = '0px';
          ghostDiv.style.visibility = 'hidden';
          ghostDiv.style.pointerEvents = 'none';
          ghostDiv.style.overflow = style.overflow;
          ghostDiv.style.width = style.width;
          ghostDiv.style.height = style.height;
          ghostDiv.style.padding = style.padding;
          ghostDiv.style.border = style.border;
          ghostDiv.style.overflowWrap = style.overflowWrap;
          ghostDiv.style.whiteSpace = style.whiteSpace;
          ghostDiv.style.lineHeight = style.lineHeight;
          ghostDiv.innerHTML = prevText.replace(/\r\n|\r|\n/g, '<br />');
          var ghostSpan = document.createElement('span');
          ghostSpan.textContent = currentText;
          ghostDiv.appendChild(ghostSpan);
          var text = document.createTextNode(nextText);
          ghostDiv.appendChild(text);
          document.body.appendChild(ghostDiv);
          var offsetLeft = ghostSpan.offsetLeft,
              offsetTop = ghostSpan.offsetTop,
              clientHeight = ghostSpan.clientHeight;
          document.body.removeChild(ghostDiv);
          return {
            left: Math.abs(offsetLeft - el.scrollLeft),
            top: Math.abs(offsetTop - el.scrollTop) + clientHeight
          };
        }

        return {
          top: 'auto',
          left: 'auto'
        };
      }
    }]);

    return DomHandler;
  }();

  var ConnectedOverlayScrollHandler = /*#__PURE__*/function () {
    function ConnectedOverlayScrollHandler(element) {
      var listener = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

      _classCallCheck(this, ConnectedOverlayScrollHandler);

      this.element = element;
      this.listener = listener;
    }

    _createClass(ConnectedOverlayScrollHandler, [{
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

  function EventBus () {
    var allHandlers = new Map();
    return {
      on: function on(type, handler) {
        var handlers = allHandlers.get(type);
        if (!handlers) handlers = [handler];else handlers.push(handler);
        allHandlers.set(type, handlers);
      },
      off: function off(type, handler) {
        var handlers = allHandlers.get(type);
        handlers && handlers.splice(handlers.indexOf(handler) >>> 0, 1);
      },
      emit: function emit(type, evt) {
        var handlers = allHandlers.get(type);
        handlers && handlers.slice().forEach(function (handler) {
          return handler(evt);
        });
      }
    };
  }

  var ObjectUtils = /*#__PURE__*/function () {
    function ObjectUtils() {
      _classCallCheck(this, ObjectUtils);
    }

    _createClass(ObjectUtils, null, [{
      key: "equals",
      value: function equals(obj1, obj2, field) {
        if (field && obj1 && _typeof(obj1) === 'object' && obj2 && _typeof(obj2) === 'object') return this.resolveFieldData(obj1, field) === this.resolveFieldData(obj2, field);else return this.deepEquals(obj1, obj2);
      }
    }, {
      key: "deepEquals",
      value: function deepEquals(a, b) {
        if (a === b) return true;

        if (a && b && _typeof(a) == 'object' && _typeof(b) == 'object') {
          var arrA = Array.isArray(a),
              arrB = Array.isArray(b),
              i,
              length,
              key;

          if (arrA && arrB) {
            length = a.length;
            if (length !== b.length) return false;

            for (i = length; i-- !== 0;) {
              if (!this.deepEquals(a[i], b[i])) return false;
            }

            return true;
          }

          if (arrA !== arrB) return false;
          var dateA = a instanceof Date,
              dateB = b instanceof Date;
          if (dateA !== dateB) return false;
          if (dateA && dateB) return a.getTime() === b.getTime();
          var regexpA = a instanceof RegExp,
              regexpB = b instanceof RegExp;
          if (regexpA !== regexpB) return false;
          if (regexpA && regexpB) return a.toString() === b.toString();
          var keys = Object.keys(a);
          length = keys.length;
          if (length !== Object.keys(b).length) return false;

          for (i = length; i-- !== 0;) {
            if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
          }

          for (i = length; i-- !== 0;) {
            key = keys[i];
            if (!this.deepEquals(a[key], b[key])) return false;
          }

          return true;
        }
        /*eslint no-self-compare: "off"*/


        return a !== a && b !== b;
      }
    }, {
      key: "resolveFieldData",
      value: function resolveFieldData(data, field) {
        if (data && Object.keys(data).length && field) {
          if (this.isFunction(field)) {
            return field(data);
          } else if (field.indexOf('.') === -1) {
            return data[field];
          } else {
            var fields = field.split('.');
            var value = data;

            for (var i = 0, len = fields.length; i < len; ++i) {
              if (value == null) {
                return null;
              }

              value = value[fields[i]];
            }

            return value;
          }
        } else {
          return null;
        }
      }
    }, {
      key: "isFunction",
      value: function isFunction(obj) {
        return !!(obj && obj.constructor && obj.call && obj.apply);
      }
    }, {
      key: "findDiffKeys",
      value: function findDiffKeys(obj1, obj2) {
        if (!obj1 || !obj2) {
          return {};
        }

        return Object.keys(obj1).filter(function (key) {
          return !obj2.hasOwnProperty(key);
        }).reduce(function (result, current) {
          result[current] = obj1[current];
          return result;
        }, {});
      }
    }, {
      key: "reorderArray",
      value: function reorderArray(value, from, to) {
        var target;

        if (value && from !== to) {
          if (to >= value.length) {
            target = to - value.length;

            while (target-- + 1) {
              value.push(undefined);
            }
          }

          value.splice(to, 0, value.splice(from, 1)[0]);
        }
      }
    }, {
      key: "findIndexInList",
      value: function findIndexInList(value, list, dataKey) {
        var _this = this;

        if (list) {
          return dataKey ? list.findIndex(function (item) {
            return _this.equals(item, value, dataKey);
          }) : list.findIndex(function (item) {
            return item === value;
          });
        }

        return -1;
      }
    }, {
      key: "getJSXElement",
      value: function getJSXElement(obj) {
        for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          params[_key - 1] = arguments[_key];
        }

        return this.isFunction(obj) ? obj.apply(void 0, params) : obj;
      }
    }, {
      key: "removeAccents",
      value: function removeAccents(str) {
        if (str && str.search(/[\xC0-\xFF]/g) > -1) {
          str = str.replace(/[\xC0-\xC5]/g, "A").replace(/[\xC6]/g, "AE").replace(/[\xC7]/g, "C").replace(/[\xC8-\xCB]/g, "E").replace(/[\xCC-\xCF]/g, "I").replace(/[\xD0]/g, "D").replace(/[\xD1]/g, "N").replace(/[\xD2-\xD6\xD8]/g, "O").replace(/[\xD9-\xDC]/g, "U").replace(/[\xDD]/g, "Y").replace(/[\xDE]/g, "P").replace(/[\xE0-\xE5]/g, "a").replace(/[\xE6]/g, "ae").replace(/[\xE7]/g, "c").replace(/[\xE8-\xEB]/g, "e").replace(/[\xEC-\xEF]/g, "i").replace(/[\xF1]/g, "n").replace(/[\xF2-\xF6\xF8]/g, "o").replace(/[\xF9-\xFC]/g, "u").replace(/[\xFE]/g, "p").replace(/[\xFD\xFF]/g, "y");
        }

        return str;
      }
    }, {
      key: "isEmpty",
      value: function isEmpty(value) {
        return value === null || value === undefined || value === '' || Array.isArray(value) && value.length === 0 || _typeof(value) === 'object' && Object.keys(value).length === 0;
      }
    }, {
      key: "isNotEmpty",
      value: function isNotEmpty(value) {
        return !this.isEmpty(value);
      }
    }]);

    return ObjectUtils;
  }();

  function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  var FilterUtils = /*#__PURE__*/function () {
    function FilterUtils() {
      _classCallCheck(this, FilterUtils);
    }

    _createClass(FilterUtils, null, [{
      key: "filter",
      value: function filter(value, fields, filterValue, filterMatchMode, filterLocale) {
        var filteredItems = [];
        var filterText = ObjectUtils.removeAccents(filterValue).toLocaleLowerCase(filterLocale);

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
                  var fieldValue = ObjectUtils.removeAccents(String(ObjectUtils.resolveFieldData(item, field))).toLocaleLowerCase(filterLocale);

                  if (FilterUtils[filterMatchMode](fieldValue, filterText, filterLocale)) {
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
      }
    }, {
      key: "startsWith",
      value: function startsWith(value, filter, filterLocale) {
        if (filter === undefined || filter === null || filter.trim() === '') {
          return true;
        }

        if (value === undefined || value === null) {
          return false;
        }

        var filterValue = ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
        var stringValue = ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
        return stringValue.slice(0, filterValue.length) === filterValue;
      }
    }, {
      key: "contains",
      value: function contains(value, filter, filterLocale) {
        if (filter === undefined || filter === null || typeof filter === 'string' && filter.trim() === '') {
          return true;
        }

        if (value === undefined || value === null) {
          return false;
        }

        var filterValue = ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
        var stringValue = ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
        return stringValue.indexOf(filterValue) !== -1;
      }
    }, {
      key: "endsWith",
      value: function endsWith(value, filter, filterLocale) {
        if (filter === undefined || filter === null || filter.trim() === '') {
          return true;
        }

        if (value === undefined || value === null) {
          return false;
        }

        var filterValue = ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
        var stringValue = ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
        return stringValue.indexOf(filterValue, stringValue.length - filterValue.length) !== -1;
      }
    }, {
      key: "equals",
      value: function equals(value, filter, filterLocale) {
        if (filter === undefined || filter === null || typeof filter === 'string' && filter.trim() === '') {
          return true;
        }

        if (value === undefined || value === null) {
          return false;
        }

        if (value.getTime && filter.getTime) return value.getTime() === filter.getTime();else return ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale) === ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
      }
    }, {
      key: "notEquals",
      value: function notEquals(value, filter, filterLocale) {
        if (filter === undefined || filter === null || typeof filter === 'string' && filter.trim() === '') {
          return false;
        }

        if (value === undefined || value === null) {
          return true;
        }

        if (value.getTime && filter.getTime) return value.getTime() !== filter.getTime();else return ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale) !== ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
      }
    }, {
      key: "in",
      value: function _in(value, filter, filterLocale) {
        if (filter === undefined || filter === null || filter.length === 0) {
          return true;
        }

        if (value === undefined || value === null) {
          return false;
        }

        for (var i = 0; i < filter.length; i++) {
          if (ObjectUtils.equals(value, filter[i])) {
            return true;
          }
        }

        return false;
      }
    }, {
      key: "lt",
      value: function lt(value, filter, filterLocale) {
        if (filter === undefined || filter === null || filter.trim && filter.trim().length === 0) {
          return true;
        }

        if (value === undefined || value === null) {
          return false;
        }

        if (value.getTime && filter.getTime) return value.getTime() < filter.getTime();else return value < parseFloat(filter);
      }
    }, {
      key: "lte",
      value: function lte(value, filter, filterLocale) {
        if (filter === undefined || filter === null || filter.trim && filter.trim().length === 0) {
          return true;
        }

        if (value === undefined || value === null) {
          return false;
        }

        if (value.getTime && filter.getTime) return value.getTime() <= filter.getTime();else return value <= parseFloat(filter);
      }
    }, {
      key: "gt",
      value: function gt(value, filter, filterLocale) {
        if (filter === undefined || filter === null || filter.trim && filter.trim().length === 0) {
          return true;
        }

        if (value === undefined || value === null) {
          return false;
        }

        if (value.getTime && filter.getTime) return value.getTime() > filter.getTime();else return value > parseFloat(filter);
      }
    }, {
      key: "gte",
      value: function gte(value, filter, filterLocale) {
        if (filter === undefined || filter === null || filter.trim && filter.trim().length === 0) {
          return true;
        }

        if (value === undefined || value === null) {
          return false;
        }

        if (value.getTime && filter.getTime) return value.getTime() >= filter.getTime();else return value >= parseFloat(filter);
      }
    }]);

    return FilterUtils;
  }();

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
  function mask(el, options) {
    var defaultOptions = {
      mask: null,
      slotChar: '_',
      autoClear: true,
      unmask: false,
      readOnly: false,
      onComplete: null,
      onChange: null,
      onFocus: null,
      onBlur: null
    };
    options = _objectSpread$2(_objectSpread$2({}, defaultOptions), options);
    var tests, partialPosition, len, firstNonMaskPos, defs, androidChrome, lastRequiredNonMaskPos, oldVal, focusText, caretTimeoutId, buffer, defaultBuffer;

    var caret = function caret(first, last) {
      var range, begin, end;

      if (!el.offsetParent || el !== document.activeElement) {
        return;
      }

      if (typeof first === 'number') {
        begin = first;
        end = typeof last === 'number' ? last : begin;

        if (el.setSelectionRange) {
          el.setSelectionRange(begin, end);
        } else if (el['createTextRange']) {
          range = el['createTextRange']();
          range.collapse(true);
          range.moveEnd('character', end);
          range.moveStart('character', begin);
          range.select();
        }
      } else {
        if (el.setSelectionRange) {
          begin = el.selectionStart;
          end = el.selectionEnd;
        } else if (document['selection'] && document['selection'].createRange) {
          range = document['selection'].createRange();
          begin = 0 - range.duplicate().moveStart('character', -100000);
          end = begin + range.text.length;
        }

        return {
          begin: begin,
          end: end
        };
      }
    };

    var isCompleted = function isCompleted() {
      for (var i = firstNonMaskPos; i <= lastRequiredNonMaskPos; i++) {
        if (tests[i] && buffer[i] === getPlaceholder(i)) {
          return false;
        }
      }

      return true;
    };

    var getPlaceholder = function getPlaceholder(i) {
      if (i < options.slotChar.length) {
        return options.slotChar.charAt(i);
      }

      return options.slotChar.charAt(0);
    };

    var getValue = function getValue() {
      return options.unmask ? getUnmaskedValue() : el && el.value;
    };

    var seekNext = function seekNext(pos) {
      while (++pos < len && !tests[pos]) {
      }

      return pos;
    };

    var seekPrev = function seekPrev(pos) {
      while (--pos >= 0 && !tests[pos]) {
      }

      return pos;
    };

    var shiftL = function shiftL(begin, end) {
      var i, j;

      if (begin < 0) {
        return;
      }

      for (i = begin, j = seekNext(end); i < len; i++) {
        if (tests[i]) {
          if (j < len && tests[i].test(buffer[j])) {
            buffer[i] = buffer[j];
            buffer[j] = getPlaceholder(j);
          } else {
            break;
          }

          j = seekNext(j);
        }
      }

      writeBuffer();
      caret(Math.max(firstNonMaskPos, begin));
    };

    var shiftR = function shiftR(pos) {
      var i, c, j, t;

      for (i = pos, c = getPlaceholder(pos); i < len; i++) {
        if (tests[i]) {
          j = seekNext(i);
          t = buffer[i];
          buffer[i] = c;

          if (j < len && tests[j].test(t)) {
            c = t;
          } else {
            break;
          }
        }
      }
    };

    var handleAndroidInput = function handleAndroidInput(e) {
      var curVal = el.value;
      var pos = caret();

      if (oldVal && oldVal.length && oldVal.length > curVal.length) {
        // a deletion or backspace happened
        checkVal(true);

        while (pos.begin > 0 && !tests[pos.begin - 1]) {
          pos.begin--;
        }

        if (pos.begin === 0) {
          while (pos.begin < firstNonMaskPos && !tests[pos.begin]) {
            pos.begin++;
          }
        }

        caret(pos.begin, pos.begin);
      } else {
        checkVal(true);

        while (pos.begin < len && !tests[pos.begin]) {
          pos.begin++;
        }

        caret(pos.begin, pos.begin);
      }

      if (options.onComplete && isCompleted()) {
        options.onComplete({
          originalEvent: e,
          value: getValue()
        });
      }
    };

    var onBlur = function onBlur(e) {
      checkVal();
      updateModel(e);

      if (options.onBlur) {
        options.onBlur(e);
      }

      if (el.value !== focusText) {
        var event = document.createEvent('HTMLEvents');
        event.initEvent('change', true, false);
        el.dispatchEvent(event);
      }
    };

    var onKeyDown = function onKeyDown(e) {
      if (options.readOnly) {
        return;
      }

      var k = e.which || e.keyCode,
          pos,
          begin,
          end;
      var iPhone = /iphone/i.test(DomHandler.getUserAgent());
      oldVal = el.value; //backspace, delete, and escape get special treatment

      if (k === 8 || k === 46 || iPhone && k === 127) {
        pos = caret();
        begin = pos.begin;
        end = pos.end;

        if (end - begin === 0) {
          begin = k !== 46 ? seekPrev(begin) : end = seekNext(begin - 1);
          end = k === 46 ? seekNext(end) : end;
        }

        clearBuffer(begin, end);
        shiftL(begin, end - 1);
        updateModel(e);
        e.preventDefault();
      } else if (k === 13) {
        // enter
        onBlur(e);
        updateModel(e);
      } else if (k === 27) {
        // escape
        el.value = focusText;
        caret(0, checkVal());
        updateModel(e);
        e.preventDefault();
      }
    };

    var onKeyPress = function onKeyPress(e) {
      if (options.readOnly) {
        return;
      }

      var k = e.which || e.keyCode,
          pos = caret(),
          p,
          c,
          next,
          completed;

      if (e.ctrlKey || e.altKey || e.metaKey || k < 32) {
        //Ignore
        return;
      } else if (k && k !== 13) {
        if (pos.end - pos.begin !== 0) {
          clearBuffer(pos.begin, pos.end);
          shiftL(pos.begin, pos.end - 1);
        }

        p = seekNext(pos.begin - 1);

        if (p < len) {
          c = String.fromCharCode(k);

          if (tests[p].test(c)) {
            shiftR(p);
            buffer[p] = c;
            writeBuffer();
            next = seekNext(p);

            if (/android/i.test(DomHandler.getUserAgent())) {
              //Path for CSP Violation on FireFox OS 1.1
              var proxy = function proxy() {
                caret(next);
              };

              setTimeout(proxy, 0);
            } else {
              caret(next);
            }

            if (pos.begin <= lastRequiredNonMaskPos) {
              completed = isCompleted();
            }
          }
        }

        e.preventDefault();
      }

      updateModel(e);

      if (options.onComplete && completed) {
        options.onComplete({
          originalEvent: e,
          value: getValue()
        });
      }
    };

    var clearBuffer = function clearBuffer(start, end) {
      var i;

      for (i = start; i < end && i < len; i++) {
        if (tests[i]) {
          buffer[i] = getPlaceholder(i);
        }
      }
    };

    var writeBuffer = function writeBuffer() {
      el.value = buffer.join('');
    };

    var checkVal = function checkVal(allow) {
      //try to place characters where they belong
      var test = el.value,
          lastMatch = -1,
          i,
          c,
          pos;

      for (i = 0, pos = 0; i < len; i++) {
        if (tests[i]) {
          buffer[i] = getPlaceholder(i);

          while (pos++ < test.length) {
            c = test.charAt(pos - 1);

            if (tests[i].test(c)) {
              buffer[i] = c;
              lastMatch = i;
              break;
            }
          }

          if (pos > test.length) {
            clearBuffer(i + 1, len);
            break;
          }
        } else {
          if (buffer[i] === test.charAt(pos)) {
            pos++;
          }

          if (i < partialPosition) {
            lastMatch = i;
          }
        }
      }

      if (allow) {
        writeBuffer();
      } else if (lastMatch + 1 < partialPosition) {
        if (options.autoClear || buffer.join('') === defaultBuffer) {
          // Invalid value. Remove it and replace it with the
          // mask, which is the default behavior.
          if (el.value) el.value = '';
          clearBuffer(0, len);
        } else {
          // Invalid value, but we opt to show the value to the
          // user and allow them to correct their mistake.
          writeBuffer();
        }
      } else {
        writeBuffer();
        el.value = el.value.substring(0, lastMatch + 1);
      }

      return partialPosition ? i : firstNonMaskPos;
    };

    var onFocus = function onFocus(e) {
      if (options.readOnly) {
        return;
      }

      clearTimeout(caretTimeoutId);
      var pos;
      focusText = el.value;
      pos = checkVal();
      caretTimeoutId = setTimeout(function () {
        if (el !== document.activeElement) {
          return;
        }

        writeBuffer();

        if (pos === options.mask.replace("?", "").length) {
          caret(0, pos);
        } else {
          caret(pos);
        }
      }, 10);

      if (options.onFocus) {
        options.onFocus(e);
      }
    };

    var onInput = function onInput(event) {
      if (androidChrome) handleAndroidInput(event);else handleInputChange(event);
    };

    var handleInputChange = function handleInputChange(e) {
      if (options.readOnly) {
        return;
      }

      var pos = checkVal(true);
      caret(pos);
      updateModel(e);

      if (options.onComplete && isCompleted()) {
        options.onComplete({
          originalEvent: e,
          value: getValue()
        });
      }
    };

    var getUnmaskedValue = function getUnmaskedValue() {
      var unmaskedBuffer = [];

      for (var i = 0; i < buffer.length; i++) {
        var c = buffer[i];

        if (tests[i] && c !== getPlaceholder(i)) {
          unmaskedBuffer.push(c);
        }
      }

      return unmaskedBuffer.join('');
    };

    var updateModel = function updateModel(e) {
      if (options.onChange) {
        var val = getValue().replace(options.slotChar, '');
        options.onChange({
          originalEvent: e,
          value: defaultBuffer !== val ? val : ''
        });
      }
    };

    var bindEvents = function bindEvents() {
      el.addEventListener('focus', onFocus);
      el.addEventListener('blur', onBlur);
      el.addEventListener('keydown', onKeyDown);
      el.addEventListener('keypress', onKeyPress);
      el.addEventListener('input', onInput);
      el.addEventListener('paste', handleInputChange);
    };

    var unbindEvents = function unbindEvents() {
      el.removeEventListener('focus', onFocus);
      el.removeEventListener('blur', onBlur);
      el.removeEventListener('keydown', onKeyDown);
      el.removeEventListener('keypress', onKeyPress);
      el.removeEventListener('input', onInput);
      el.removeEventListener('paste', handleInputChange);
    };

    var init = function init() {
      tests = [];
      partialPosition = options.mask.length;
      len = options.mask.length;
      firstNonMaskPos = null;
      defs = {
        '9': '[0-9]',
        'a': '[A-Za-z]',
        '*': '[A-Za-z0-9]'
      };
      var ua = DomHandler.getUserAgent();
      androidChrome = /chrome/i.test(ua) && /android/i.test(ua);
      var maskTokens = options.mask.split('');

      for (var i = 0; i < maskTokens.length; i++) {
        var c = maskTokens[i];

        if (c === '?') {
          len--;
          partialPosition = i;
        } else if (defs[c]) {
          tests.push(new RegExp(defs[c]));

          if (firstNonMaskPos === null) {
            firstNonMaskPos = tests.length - 1;
          }

          if (i < partialPosition) {
            lastRequiredNonMaskPos = tests.length - 1;
          }
        } else {
          tests.push(null);
        }
      }

      buffer = [];

      for (var _i = 0; _i < maskTokens.length; _i++) {
        var _c = maskTokens[_i];

        if (_c !== '?') {
          if (defs[_c]) buffer.push(getPlaceholder(_i));else buffer.push(_c);
        }
      }

      defaultBuffer = buffer.join('');
    };

    if (el && options.mask) {
      init();
      bindEvents();
    }

    return {
      init: init,
      bindEvents: bindEvents,
      unbindEvents: unbindEvents,
      updateModel: updateModel,
      getValue: getValue
    };
  }

  var lastId = 0;
  function UniqueComponentId () {
    var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'pr_id_';
    lastId++;
    return "".concat(prefix).concat(lastId);
  }

  function handler() {
    var zIndexes = [];

    var generateZIndex = function generateZIndex(key, baseZIndex) {
      baseZIndex = baseZIndex || getBaseZIndex(key);
      var lastZIndex = getLastZIndex(key, baseZIndex);
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

    var getBaseZIndex = function getBaseZIndex(key) {
      return PrimeReact__default['default'].zIndex[key] || 999;
    };

    var getCurrentZIndex = function getCurrentZIndex(key) {
      return getLastZIndex(key).value;
    };

    var getLastZIndex = function getLastZIndex(key) {
      var baseZIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return (zIndexes || []).reverse().find(function (obj) {
        return PrimeReact__default['default'].autoZIndex ? true : obj.key === key;
      }) || {
        key: key,
        value: baseZIndex
      };
    };

    return {
      get: function get(el) {
        return el ? parseInt(el.style.zIndex, 10) || 0 : 0;
      },
      set: function set(key, el, baseZIndex) {
        if (el) {
          el.style.zIndex = String(generateZIndex(key, baseZIndex));
        }
      },
      clear: function clear(el) {
        if (el) {
          revertZIndex(ZIndexUtils.get(el));
          el.style.zIndex = '';
        }
      },
      getBase: function getBase(key) {
        return getBaseZIndex(key);
      },
      getCurrent: function getCurrent(key) {
        return getCurrentZIndex(key);
      }
    };
  }

  var ZIndexUtils = handler();

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
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

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var Ripple = /*#__PURE__*/function (_Component) {
    _inherits(Ripple, _Component);

    var _super = _createSuper$3(Ripple);

    function Ripple(props) {
      var _this;

      _classCallCheck(this, Ripple);

      _this = _super.call(this, props);
      _this.onMouseDown = _this.onMouseDown.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(Ripple, [{
      key: "getTarget",
      value: function getTarget() {
        return this.ink && this.ink.parentElement;
      }
    }, {
      key: "bindEvents",
      value: function bindEvents() {
        if (this.target) {
          this.target.addEventListener('mousedown', this.onMouseDown);
        }
      }
    }, {
      key: "unbindEvents",
      value: function unbindEvents() {
        if (this.target) {
          this.target.removeEventListener('mousedown', this.onMouseDown);
        }
      }
    }, {
      key: "onMouseDown",
      value: function onMouseDown(event) {
        if (!this.ink || getComputedStyle(this.ink, null).display === 'none') {
          return;
        }

        DomHandler.removeClass(this.ink, 'p-ink-active');

        if (!DomHandler.getHeight(this.ink) && !DomHandler.getWidth(this.ink)) {
          var d = Math.max(DomHandler.getOuterWidth(this.target), DomHandler.getOuterHeight(this.target));
          this.ink.style.height = d + 'px';
          this.ink.style.width = d + 'px';
        }

        var offset = DomHandler.getOffset(this.target);
        var x = event.pageX - offset.left + document.body.scrollTop - DomHandler.getWidth(this.ink) / 2;
        var y = event.pageY - offset.top + document.body.scrollLeft - DomHandler.getHeight(this.ink) / 2;
        this.ink.style.top = y + 'px';
        this.ink.style.left = x + 'px';
        DomHandler.addClass(this.ink, 'p-ink-active');
      }
    }, {
      key: "onAnimationEnd",
      value: function onAnimationEnd(event) {
        DomHandler.removeClass(event.currentTarget, 'p-ink-active');
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        if (this.ink) {
          this.target = this.getTarget();
          this.bindEvents();
        }
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
        if (this.ink && !this.target) {
          this.target = this.getTarget();
          this.bindEvents();
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        if (this.ink) {
          this.target = null;
          this.unbindEvents();
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        return PrimeReact__default['default'].ripple && /*#__PURE__*/React__default['default'].createElement("span", {
          ref: function ref(el) {
            return _this2.ink = el;
          },
          className: "p-ink",
          onAnimationEnd: this.onAnimationEnd
        });
      }
    }]);

    return Ripple;
  }(React.Component);

  var KeyFilter = /*#__PURE__*/function () {
    function KeyFilter() {
      _classCallCheck(this, KeyFilter);
    }

    _createClass(KeyFilter, null, [{
      key: "isNavKeyPress",
      value:
      /* eslint-disable */

      /* eslint-enable */
      function isNavKeyPress(e) {
        var k = e.keyCode;
        k = DomHandler.getBrowser().safari ? KeyFilter.SAFARI_KEYS[k] || k : k;
        return k >= 33 && k <= 40 || k === KeyFilter.KEYS.RETURN || k === KeyFilter.KEYS.TAB || k === KeyFilter.KEYS.ESC;
      }
    }, {
      key: "isSpecialKey",
      value: function isSpecialKey(e) {
        var k = e.keyCode;
        return k === 9 || k === 13 || k === 27 || k === 16 || k === 17 || k >= 18 && k <= 20 || DomHandler.getBrowser().opera && !e.shiftKey && (k === 8 || k >= 33 && k <= 35 || k >= 36 && k <= 39 || k >= 44 && k <= 45);
      }
    }, {
      key: "getKey",
      value: function getKey(e) {
        var k = e.keyCode || e.charCode;
        return DomHandler.getBrowser().safari ? KeyFilter.SAFARI_KEYS[k] || k : k;
      }
    }, {
      key: "getCharCode",
      value: function getCharCode(e) {
        return e.charCode || e.keyCode || e.which;
      }
    }, {
      key: "onKeyPress",
      value: function onKeyPress(e, keyfilter, validateOnly) {
        if (validateOnly) {
          return;
        }

        var regex = KeyFilter.DEFAULT_MASKS[keyfilter] ? KeyFilter.DEFAULT_MASKS[keyfilter] : keyfilter;
        var browser = DomHandler.getBrowser();

        if (e.ctrlKey || e.altKey) {
          return;
        }

        var k = this.getKey(e);

        if (browser.mozilla && (this.isNavKeyPress(e) || k === KeyFilter.KEYS.BACKSPACE || k === KeyFilter.KEYS.DELETE && e.charCode === 0)) {
          return;
        }

        var c = this.getCharCode(e);
        var cc = String.fromCharCode(c);

        if (browser.mozilla && (this.isSpecialKey(e) || !cc)) {
          return;
        }

        if (!regex.test(cc)) {
          e.preventDefault();
        }
      }
    }, {
      key: "validate",
      value: function validate(e, keyfilter) {
        var value = e.target.value,
            validatePattern = true;

        if (value && !keyfilter.test(value)) {
          validatePattern = false;
        }

        return validatePattern;
      }
    }]);

    return KeyFilter;
  }();

  _defineProperty(KeyFilter, "DEFAULT_MASKS", {
    pint: /[\d]/,
    int: /[\d\-]/,
    pnum: /[\d\.]/,
    money: /[\d\.\s,]/,
    num: /[\d\-\.]/,
    hex: /[0-9a-f]/i,
    email: /[a-z0-9_\.\-@]/i,
    alpha: /[a-z_]/i,
    alphanum: /[a-z0-9_]/i
  });

  _defineProperty(KeyFilter, "KEYS", {
    TAB: 9,
    RETURN: 13,
    ESC: 27,
    BACKSPACE: 8,
    DELETE: 46
  });

  _defineProperty(KeyFilter, "SAFARI_KEYS", {
    63234: 37,
    // left
    63235: 39,
    // right
    63232: 38,
    // up
    63233: 40,
    // down
    63276: 33,
    // page up
    63277: 34,
    // page down
    63272: 46,
    // delete
    63273: 36,
    // home
    63275: 35 // end

  });

  function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var Portal = /*#__PURE__*/function (_Component) {
    _inherits(Portal, _Component);

    var _super = _createSuper$2(Portal);

    function Portal(props) {
      var _this;

      _classCallCheck(this, Portal);

      _this = _super.call(this, props);
      _this.state = {
        mounted: props.visible
      };
      return _this;
    }

    _createClass(Portal, [{
      key: "hasDOM",
      value: function hasDOM() {
        return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        if (this.hasDOM() && !this.state.mounted) {
          this.setState({
            mounted: true
          }, this.props.onMounted);
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.props.onUnmounted && this.props.onUnmounted();
      }
    }, {
      key: "render",
      value: function render() {
        if (this.props.element && this.state.mounted) {
          var appendTo = this.props.appendTo || PrimeReact__default['default'].appendTo || document.body;
          return appendTo === 'self' ? this.props.element : /*#__PURE__*/ReactDOM__default['default'].createPortal(this.props.element, appendTo);
        }

        return null;
      }
    }]);

    return Portal;
  }(React.Component);

  _defineProperty(Portal, "defaultProps", {
    element: null,
    appendTo: null,
    visible: false,
    onMounted: null,
    onUnmounted: null
  });

  function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
  function tip(props) {
    var appendTo = props.appendTo || document.body;
    var tooltipWrapper = document.createDocumentFragment();
    DomHandler.appendChild(tooltipWrapper, appendTo);
    props = _objectSpread$1(_objectSpread$1({}, props), props.options);
    var tooltipEl = /*#__PURE__*/React__default['default'].createElement(Tooltip, props);
    ReactDOM__default['default'].render(tooltipEl, tooltipWrapper);

    var updateTooltip = function updateTooltip(newProps) {
      props = _objectSpread$1(_objectSpread$1({}, props), newProps);
      ReactDOM__default['default'].render( /*#__PURE__*/React__default['default'].cloneElement(tooltipEl, props), tooltipWrapper);
    };

    return {
      destroy: function destroy() {
        ReactDOM__default['default'].unmountComponentAtNode(tooltipWrapper);
      },
      updateContent: function updateContent(newContent) {
        console.warn("The 'updateContent' method has been deprecated on Tooltip. Use update(newProps) method.");
        updateTooltip({
          content: newContent
        });
      },
      update: function update(newProps) {
        updateTooltip(newProps);
      }
    };
  }
  var Tooltip = /*#__PURE__*/function (_Component) {
    _inherits(Tooltip, _Component);

    var _super = _createSuper$1(Tooltip);

    function Tooltip(props) {
      var _this;

      _classCallCheck(this, Tooltip);

      _this = _super.call(this, props);
      _this.state = {
        visible: false,
        position: _this.props.position
      };
      _this.show = _this.show.bind(_assertThisInitialized(_this));
      _this.hide = _this.hide.bind(_assertThisInitialized(_this));
      _this.onMouseEnter = _this.onMouseEnter.bind(_assertThisInitialized(_this));
      _this.onMouseLeave = _this.onMouseLeave.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(Tooltip, [{
      key: "isTargetContentEmpty",
      value: function isTargetContentEmpty(target) {
        return !(this.props.content || this.getTargetOption(target, 'tooltip'));
      }
    }, {
      key: "isContentEmpty",
      value: function isContentEmpty(target) {
        return !(this.props.content || this.getTargetOption(target, 'tooltip') || this.props.children);
      }
    }, {
      key: "isMouseTrack",
      value: function isMouseTrack(target) {
        return this.getTargetOption(target, 'mousetrack') || this.props.mouseTrack;
      }
    }, {
      key: "isDisabled",
      value: function isDisabled(target) {
        return this.getTargetOption(target, 'disabled') === 'true' || this.hasTargetOption(target, 'disabled') || this.props.disabled;
      }
    }, {
      key: "isAutoHide",
      value: function isAutoHide() {
        return this.getTargetOption(this.currentTarget, 'autohide') || this.props.autoHide;
      }
    }, {
      key: "getTargetOption",
      value: function getTargetOption(target, option) {
        if (this.hasTargetOption(target, "data-pr-".concat(option))) {
          return target.getAttribute("data-pr-".concat(option));
        }

        return null;
      }
    }, {
      key: "hasTargetOption",
      value: function hasTargetOption(target, option) {
        return target && target.hasAttribute(option);
      }
    }, {
      key: "getEvents",
      value: function getEvents(target) {
        var showEvent = this.getTargetOption(target, 'showevent') || this.props.showEvent;
        var hideEvent = this.getTargetOption(target, 'hideevent') || this.props.hideEvent;

        if (this.isMouseTrack(target)) {
          showEvent = 'mousemove';
          hideEvent = 'mouseleave';
        } else {
          var event = this.getTargetOption(target, 'event') || this.props.event;

          if (event === 'focus') {
            showEvent = 'focus';
            hideEvent = 'blur';
          }
        }

        return {
          showEvent: showEvent,
          hideEvent: hideEvent
        };
      }
    }, {
      key: "getPosition",
      value: function getPosition(target) {
        return this.getTargetOption(target, 'position') || this.state.position;
      }
    }, {
      key: "getMouseTrackPosition",
      value: function getMouseTrackPosition(target) {
        var top = this.getTargetOption(target, 'mousetracktop') || this.props.mouseTrackTop;
        var left = this.getTargetOption(target, 'mousetrackleft') || this.props.mouseTrackLeft;
        return {
          top: top,
          left: left
        };
      }
    }, {
      key: "updateText",
      value: function updateText(target, callback) {
        if (this.tooltipTextEl) {
          var content = this.getTargetOption(target, 'tooltip') || this.props.content;

          if (content) {
            this.tooltipTextEl.innerHTML = ''; // remove children

            this.tooltipTextEl.appendChild(document.createTextNode(content));
            callback();
          } else if (this.props.children) {
            callback();
          }
        }
      }
    }, {
      key: "show",
      value: function show(e) {
        var _this2 = this;

        this.currentTarget = e.currentTarget;

        if (this.isContentEmpty(this.currentTarget) || this.isDisabled(this.currentTarget)) {
          return;
        }

        var updateTooltipState = function updateTooltipState() {
          _this2.updateText(_this2.currentTarget, function () {
            if (_this2.props.autoZIndex && !ZIndexUtils.get(_this2.containerEl)) {
              ZIndexUtils.set('tooltip', _this2.containerEl, _this2.props.baseZIndex);
            }

            _this2.containerEl.style.left = '';
            _this2.containerEl.style.top = '';

            if (_this2.isMouseTrack(_this2.currentTarget) && !_this2.containerSize) {
              _this2.containerSize = {
                width: DomHandler.getOuterWidth(_this2.containerEl),
                height: DomHandler.getOuterHeight(_this2.containerEl)
              };
            }

            _this2.align(_this2.currentTarget, {
              x: e.pageX,
              y: e.pageY
            });
          });
        };

        if (this.state.visible) {
          this.applyDelay('updateDelay', updateTooltipState);
        } else {
          this.sendCallback(this.props.onBeforeShow, {
            originalEvent: e,
            target: this.currentTarget
          });
          this.applyDelay('showDelay', function () {
            _this2.setState({
              visible: true,
              position: _this2.getPosition(_this2.currentTarget)
            }, function () {
              updateTooltipState();

              _this2.sendCallback(_this2.props.onShow, {
                originalEvent: e,
                target: _this2.currentTarget
              });
            });

            _this2.bindDocumentResizeListener();

            _this2.bindScrollListener();

            DomHandler.addClass(_this2.currentTarget, _this2.getTargetOption(_this2.currentTarget, 'classname'));
          });
        }
      }
    }, {
      key: "hide",
      value: function hide(e) {
        var _this3 = this;

        this.clearTimeouts();

        if (this.state.visible) {
          DomHandler.removeClass(this.currentTarget, this.getTargetOption(this.currentTarget, 'classname'));
          this.sendCallback(this.props.onBeforeHide, {
            originalEvent: e,
            target: this.currentTarget
          });
          this.applyDelay('hideDelay', function () {
            ZIndexUtils.clear(_this3.containerEl);
            DomHandler.removeClass(_this3.containerEl, 'p-tooltip-active');

            if (!_this3.isAutoHide() && _this3.allowHide === false) {
              return;
            }

            _this3.setState({
              visible: false,
              position: _this3.props.position
            }, function () {
              if (_this3.tooltipTextEl) {
                ReactDOM__default['default'].unmountComponentAtNode(_this3.tooltipTextEl);
              }

              _this3.unbindDocumentResizeListener();

              _this3.unbindScrollListener();

              _this3.currentTarget = null;
              _this3.scrollHandler = null;
              _this3.containerSize = null;
              _this3.allowHide = true;

              _this3.sendCallback(_this3.props.onHide, {
                originalEvent: e,
                target: _this3.currentTarget
              });
            });
          });
        }
      }
    }, {
      key: "align",
      value: function align(target, coordinate) {
        var _this4 = this;

        var left = 0,
            top = 0;

        if (this.isMouseTrack(target) && coordinate) {
          var containerSize = {
            width: DomHandler.getOuterWidth(this.containerEl),
            height: DomHandler.getOuterHeight(this.containerEl)
          };
          left = coordinate.x;
          top = coordinate.y;

          var _this$getMouseTrackPo = this.getMouseTrackPosition(target),
              mouseTrackTop = _this$getMouseTrackPo.top,
              mouseTrackLeft = _this$getMouseTrackPo.left;

          switch (this.state.position) {
            case 'left':
              left -= containerSize.width + mouseTrackLeft;
              top -= containerSize.height / 2 - mouseTrackTop;
              break;

            case 'right':
              left += mouseTrackLeft;
              top -= containerSize.height / 2 - mouseTrackTop;
              break;

            case 'top':
              left -= containerSize.width / 2 - mouseTrackLeft;
              top -= containerSize.height + mouseTrackTop;
              break;

            case 'bottom':
              left -= containerSize.width / 2 - mouseTrackLeft;
              top += mouseTrackTop;
              break;
          }

          if (left <= 0 || this.containerSize.width > containerSize.width) {
            this.containerEl.style.left = '0px';
            this.containerEl.style.right = window.innerWidth - containerSize.width - left + 'px';
          } else {
            this.containerEl.style.right = '';
            this.containerEl.style.left = left + 'px';
          }

          this.containerEl.style.top = top + 'px';
          DomHandler.addClass(this.containerEl, 'p-tooltip-active');
        } else {
          var pos = DomHandler.findCollisionPosition(this.state.position);
          var my = this.getTargetOption(target, 'my') || this.props.my || pos.my;
          var at = this.getTargetOption(target, 'at') || this.props.at || pos.at;
          this.containerEl.style.padding = '0px';
          DomHandler.flipfitCollision(this.containerEl, target, my, at, function (currentPosition) {
            var _currentPosition$at = currentPosition.at,
                atX = _currentPosition$at.x,
                atY = _currentPosition$at.y;
            var myX = currentPosition.my.x;
            var position = _this4.props.at ? atX !== 'center' && atX !== myX ? atX : atY : currentPosition.at["".concat(pos.axis)];
            _this4.containerEl.style.padding = '';

            _this4.setState({
              position: position
            }, function () {
              _this4.updateContainerPosition();

              DomHandler.addClass(_this4.containerEl, 'p-tooltip-active');
            });
          });
        }
      }
    }, {
      key: "updateContainerPosition",
      value: function updateContainerPosition() {
        if (this.containerEl) {
          var style = getComputedStyle(this.containerEl);
          if (this.state.position === 'left') this.containerEl.style.left = parseFloat(style.left) - parseFloat(style.paddingLeft) * 2 + 'px';else if (this.state.position === 'top') this.containerEl.style.top = parseFloat(style.top) - parseFloat(style.paddingTop) * 2 + 'px';
        }
      }
    }, {
      key: "onMouseEnter",
      value: function onMouseEnter() {
        if (!this.isAutoHide()) {
          this.allowHide = false;
        }
      }
    }, {
      key: "onMouseLeave",
      value: function onMouseLeave(e) {
        if (!this.isAutoHide()) {
          this.allowHide = true;
          this.hide(e);
        }
      }
    }, {
      key: "bindDocumentResizeListener",
      value: function bindDocumentResizeListener() {
        var _this5 = this;

        this.documentResizeListener = function (e) {
          if (!DomHandler.isAndroid()) {
            _this5.hide(e);
          }
        };

        window.addEventListener('resize', this.documentResizeListener);
      }
    }, {
      key: "unbindDocumentResizeListener",
      value: function unbindDocumentResizeListener() {
        if (this.documentResizeListener) {
          window.removeEventListener('resize', this.documentResizeListener);
          this.documentResizeListener = null;
        }
      }
    }, {
      key: "bindScrollListener",
      value: function bindScrollListener() {
        var _this6 = this;

        if (!this.scrollHandler) {
          this.scrollHandler = new ConnectedOverlayScrollHandler(this.currentTarget, function (e) {
            if (_this6.state.visible) {
              _this6.hide(e);
            }
          });
        }

        this.scrollHandler.bindScrollListener();
      }
    }, {
      key: "unbindScrollListener",
      value: function unbindScrollListener() {
        if (this.scrollHandler) {
          this.scrollHandler.unbindScrollListener();
        }
      }
    }, {
      key: "bindTargetEvent",
      value: function bindTargetEvent(target) {
        if (target) {
          var _this$getEvents = this.getEvents(target),
              showEvent = _this$getEvents.showEvent,
              hideEvent = _this$getEvents.hideEvent;

          target.addEventListener(showEvent, this.show);
          target.addEventListener(hideEvent, this.hide);
        }
      }
    }, {
      key: "unbindTargetEvent",
      value: function unbindTargetEvent(target) {
        if (target) {
          var _this$getEvents2 = this.getEvents(target),
              showEvent = _this$getEvents2.showEvent,
              hideEvent = _this$getEvents2.hideEvent;

          target.removeEventListener(showEvent, this.show);
          target.removeEventListener(hideEvent, this.hide);
        }
      }
    }, {
      key: "applyDelay",
      value: function applyDelay(delayProp, callback) {
        this.clearTimeouts();
        var delay = this.getTargetOption(this.currentTarget, delayProp.toLowerCase()) || this.props[delayProp];

        if (!!delay) {
          this["".concat(delayProp, "Timeout")] = setTimeout(function () {
            return callback();
          }, delay);
        } else {
          callback();
        }
      }
    }, {
      key: "sendCallback",
      value: function sendCallback(callback) {
        if (callback) {
          for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            params[_key - 1] = arguments[_key];
          }

          callback.apply(void 0, params);
        }
      }
    }, {
      key: "clearTimeouts",
      value: function clearTimeouts() {
        clearTimeout(this.showDelayTimeout);
        clearTimeout(this.updateDelayTimeout);
        clearTimeout(this.hideDelayTimeout);
      }
    }, {
      key: "updateTargetEvents",
      value: function updateTargetEvents(target) {
        this.unloadTargetEvents(target);
        this.loadTargetEvents(target);
      }
    }, {
      key: "loadTargetEvents",
      value: function loadTargetEvents(target) {
        this.setTargetEventOperations(target || this.props.target, 'bindTargetEvent');
      }
    }, {
      key: "unloadTargetEvents",
      value: function unloadTargetEvents(target) {
        this.setTargetEventOperations(target || this.props.target, 'unbindTargetEvent');
      }
    }, {
      key: "setTargetEventOperations",
      value: function setTargetEventOperations(target, operation) {
        var _this7 = this;

        if (target) {
          if (DomHandler.isElement(target)) {
            this[operation](target);
          } else {
            var setEvent = function setEvent(target) {
              var element = DomHandler.find(document, target);
              element.forEach(function (el) {
                _this7[operation](el);
              });
            };

            if (target instanceof Array) {
              target.forEach(function (t) {
                setEvent(t);
              });
            } else {
              setEvent(target);
            }
          }
        }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        if (this.props.target) {
          this.loadTargetEvents();
        }
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps, prevState) {
        var _this8 = this;

        if (prevProps.target !== this.props.target) {
          this.unloadTargetEvents(prevProps.target);
          this.loadTargetEvents();
        }

        if (this.state.visible) {
          if (prevProps.content !== this.props.content) {
            this.applyDelay('updateDelay', function () {
              _this8.updateText(_this8.currentTarget, function () {
                _this8.align(_this8.currentTarget);
              });
            });
          }

          if (this.currentTarget && this.isDisabled(this.currentTarget)) {
            this.hide();
          }
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.clearTimeouts();
        this.unbindDocumentResizeListener();
        this.unloadTargetEvents();

        if (this.scrollHandler) {
          this.scrollHandler.destroy();
          this.scrollHandler = null;
        }

        ZIndexUtils.clear(this.containerEl);
      }
    }, {
      key: "renderElement",
      value: function renderElement() {
        var _this9 = this;

        var tooltipClassName = classNames('p-tooltip p-component', _defineProperty({}, "p-tooltip-".concat(this.state.position), true), this.props.className);
        var isTargetContentEmpty = this.isTargetContentEmpty(this.currentTarget);
        return /*#__PURE__*/React__default['default'].createElement("div", {
          id: this.props.id,
          ref: function ref(el) {
            return _this9.containerEl = el;
          },
          className: tooltipClassName,
          style: this.props.style,
          role: "tooltip",
          "aria-hidden": this.state.visible,
          onMouseEnter: this.onMouseEnter,
          onMouseLeave: this.onMouseLeave
        }, /*#__PURE__*/React__default['default'].createElement("div", {
          className: "p-tooltip-arrow"
        }), /*#__PURE__*/React__default['default'].createElement("div", {
          ref: function ref(el) {
            return _this9.tooltipTextEl = el;
          },
          className: "p-tooltip-text"
        }, isTargetContentEmpty && this.props.children));
      }
    }, {
      key: "render",
      value: function render() {
        if (this.state.visible) {
          var element = this.renderElement();
          return /*#__PURE__*/React__default['default'].createElement(Portal, {
            element: element,
            appendTo: this.props.appendTo,
            visible: true
          });
        }

        return null;
      }
    }]);

    return Tooltip;
  }(React.Component);

  _defineProperty(Tooltip, "defaultProps", {
    id: null,
    target: null,
    content: null,
    disabled: false,
    className: null,
    style: null,
    appendTo: null,
    position: 'right',
    my: null,
    at: null,
    event: null,
    showEvent: 'mouseenter',
    hideEvent: 'mouseleave',
    autoZIndex: true,
    baseZIndex: 0,
    mouseTrack: false,
    mouseTrackTop: 5,
    mouseTrackLeft: 5,
    showDelay: 0,
    updateDelay: 0,
    hideDelay: 0,
    autoHide: true,
    onBeforeShow: null,
    onBeforeHide: null,
    onShow: null,
    onHide: null
  });

  var OverlayService = EventBus();

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var CSSTransition = /*#__PURE__*/function (_Component) {
    _inherits(CSSTransition, _Component);

    var _super = _createSuper(CSSTransition);

    function CSSTransition(props) {
      var _this;

      _classCallCheck(this, CSSTransition);

      _this = _super.call(this, props);
      _this.onEnter = _this.onEnter.bind(_assertThisInitialized(_this));
      _this.onEntering = _this.onEntering.bind(_assertThisInitialized(_this));
      _this.onEntered = _this.onEntered.bind(_assertThisInitialized(_this));
      _this.onExit = _this.onExit.bind(_assertThisInitialized(_this));
      _this.onExiting = _this.onExiting.bind(_assertThisInitialized(_this));
      _this.onExited = _this.onExited.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(CSSTransition, [{
      key: "onEnter",
      value: function onEnter(node, isAppearing) {
        this.props.onEnter && this.props.onEnter(node, isAppearing); // component

        this.props.options && this.props.options.onEnter && this.props.options.onEnter(node, isAppearing); // user option
      }
    }, {
      key: "onEntering",
      value: function onEntering(node, isAppearing) {
        this.props.onEntering && this.props.onEntering(node, isAppearing); // component

        this.props.options && this.props.options.onEntering && this.props.options.onEntering(node, isAppearing); // user option
      }
    }, {
      key: "onEntered",
      value: function onEntered(node, isAppearing) {
        this.props.onEntered && this.props.onEntered(node, isAppearing); // component

        this.props.options && this.props.options.onEntered && this.props.options.onEntered(node, isAppearing); // user option
      }
    }, {
      key: "onExit",
      value: function onExit(node) {
        this.props.onExit && this.props.onExit(node); // component

        this.props.options && this.props.options.onExit && this.props.options.onExit(node); // user option
      }
    }, {
      key: "onExiting",
      value: function onExiting(node) {
        this.props.onExiting && this.props.onExiting(node); // component

        this.props.options && this.props.options.onExiting && this.props.options.onExiting(node); // user option
      }
    }, {
      key: "onExited",
      value: function onExited(node) {
        this.props.onExited && this.props.onExited(node); // component

        this.props.options && this.props.options.onExited && this.props.options.onExited(node); // user option
      }
    }, {
      key: "render",
      value: function render() {
        var immutableProps = {
          nodeRef: this.props.nodeRef,
          in: this.props.in,
          onEnter: this.onEnter,
          onEntering: this.onEntering,
          onEntered: this.onEntered,
          onExit: this.onExit,
          onExiting: this.onExiting,
          onExited: this.onExited
        };
        var mutableProps = {
          classNames: this.props.classNames,
          timeout: this.props.timeout,
          unmountOnExit: this.props.unmountOnExit
        };

        var props = _objectSpread(_objectSpread(_objectSpread({}, mutableProps), this.props.options || {}), immutableProps);

        return /*#__PURE__*/React__default['default'].createElement(reactTransitionGroup.CSSTransition, props, this.props.children);
      }
    }]);

    return CSSTransition;
  }(React.Component);

  exports.CSSTransition = CSSTransition;
  exports.ConnectedOverlayScrollHandler = ConnectedOverlayScrollHandler;
  exports.DomHandler = DomHandler;
  exports.EventBus = EventBus;
  exports.FilterUtils = FilterUtils;
  exports.KeyFilter = KeyFilter;
  exports.ObjectUtils = ObjectUtils;
  exports.OverlayService = OverlayService;
  exports.Portal = Portal;
  exports.Ripple = Ripple;
  exports.Tooltip = Tooltip;
  exports.UniqueComponentId = UniqueComponentId;
  exports.ZIndexUtils = ZIndexUtils;
  exports.classNames = classNames;
  exports.mask = mask;
  exports.tip = tip;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}, primereact.api, React, ReactDOM, ReactTransitionGroup));
